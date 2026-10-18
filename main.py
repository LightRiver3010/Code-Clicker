import json
import os
import time
from typing import Any, Dict
 
import jwt
import oracledb
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

load_dotenv()

# Settings
SECRET_KEY = os.environ["SECRET_KEY"]  # attached to cookie to help login
ALLOWED_ORIGIN = os.environ.get("ALLOWED_ORIGIN", "https://game.savaryn.me")
COOKIE_SECURE = os.environ.get("COOKIE_SECURE", "true").lower() == "true"
COOKIE_NAME = "session"
SESSION_SECONDS = 60 * 60 * 24 * 7  # a login lasts 7 days

# Oracle needs to hand back CLOB columns as Python strings; will be interpreted as a JSON
oracledb.defaults.fetch_lobs = False

# Connecting to the Oracle DB
pool = oracledb.create_pool(
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    dsn=os.environ["DB_DSN"],
    min=1, max=4,
)

hasher = PasswordHasher() #used to keep passwords secure; so professional!

# ----- App -----
# Counts the amount of times a user requests to the DB, to prevent spam
limiter = Limiter(key_func=get_remote_address)
 
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Setting up CORS such that only the game's website can call the API & send cookies
app.add_middleware(
    CORSMiddleware,
    allow_origins=[ALLOWED_ORIGIN],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT"],
    allow_headers=["Content-Type"],
)

# ----- Data Structures -----
# FastAPI compares these standards to incoming JSON to reject outliers/bad input
class Credentials(BaseModel):
    username: str = Field(min_length=3, max_length=30)
    password: str = Field(min_length=8, max_length=128)
 
 
class SaveIn(BaseModel):
    revision: int = Field(ge=0)  # the revision the game last saw (0 = new game, never saved)
    game_state: Dict[str, Any]


# ----- Login Cookie -----
# Create a cookie for users to save in their browser so they aren't required to login each time they save the game
def set_session_cookie(response: Response, player_id: int) -> None:
    token = jwt.encode(
        {"sub": str(player_id), "exp": int(time.time()) + SESSION_SECONDS},
        SECRET_KEY,
        algorithm="HS256",
    )
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        max_age=SESSION_SECONDS,
        httponly=True,  # JavaScript can't read it, so passwords can't get exposed
        secure=COOKIE_SECURE,  # HTTPS only
        samesite="strict",  
    )


def current_player(request: Request) -> int:
    """Reads the cookie and returns the player_id to query the DB, 
    or replies 401 otherwise (not logged in)."""
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=401, detail="Not logged in")
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except jwt.PyJWTError:  # fake, edited, or expired cookie
        raise HTTPException(status_code=401, detail="Not logged in")
    return int(data["sub"])

# ----- FastAPI Endpoints -----
# Used to update the DB regularly & prevent it from hibernating; does literally nothing but keeps DB active
@app.get("/health")
def health():
    with pool.acquire() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM dual")
            return {"status": "ok", "db": cur.fetchone()[0]}

@app.post("/register", status_code=201)
@limiter.limit("10/hour")  # only 10 registers from a specific IP can occur per hour
def register(request: Request, response: Response, creds: Credentials):
    username = creds.username.strip().lower()  # "Sam" and "sam" are the same account
    password_hash = hasher.hash(creds.password)
 
    with pool.acquire() as conn:
        with conn.cursor() as cur:
            new_id = cur.var(int)
            try:
                cur.execute(
                    "INSERT INTO players (username, password_hash) "
                    "VALUES (:u, :h) RETURNING player_id INTO :pid",
                    u=username,
                    h=password_hash,
                    pid=new_id,
                ) #Inserting new user data into the DB
                conn.commit()
            except oracledb.IntegrityError:  # the UNIQUE rule on username
                raise HTTPException(status_code=409, detail="Username already taken")
            player_id = int(new_id.getvalue()[0])
 
    set_session_cookie(response, player_id)  # registering also logs you in
    return {"ok": True}

@app.post("/login")
@limiter.limit("10/minute") # Again, limit spam logins
def login(request: Request, response: Response, creds: Credentials):
    username = creds.username.strip().lower()
 
    with pool.acquire() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT player_id, password_hash FROM players WHERE username = :u",
                u=username,
            ) 
            row = cur.fetchone()
 
    # Same message for "no such user" and "wrong password" for safety reasons
    if row is None:
        raise HTTPException(status_code=401, detail="Wrong username or password")
    player_id, stored_hash = int(row[0]), row[1]
    try:
        hasher.verify(stored_hash, creds.password)
    except VerifyMismatchError:
        raise HTTPException(status_code=401, detail="Wrong username or password")
 
    set_session_cookie(response, player_id) # If not facing an error, set the user's cookie so they allowed to load & save their data
    return {"ok": True}

@app.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        COOKIE_NAME, httponly=True, secure=COOKIE_SECURE, samesite="strict"
    ) # Just delete the user's cookie on logout; they'll fetch it again later with login
    return {"ok": True}

def read_save(cur, player_id: int) -> Dict[str, Any]:
    cur.execute(
        "SELECT game_state, revision FROM game_saves WHERE player_id = :p",
        p=player_id,
    ) # Select the user's game_save CLOB to import all their progress
    row = cur.fetchone()
    if row is None:
        return {"revision": 0, "game_state": None}  # "no save yet"
    return {"revision": int(row[1]), "game_state": json.loads(row[0])}

@app.get("/save")
def get_save(player_id: int = Depends(current_player)):
    with pool.acquire() as conn:
        with conn.cursor() as cur:
            result = read_save(cur, player_id)
    result["player_id"] = player_id
    return result
        
@app.put("/save") #Put-ting the user's save data into the DB
def put_save(body: SaveIn, player_id: int = Depends(current_player)):
    state_text = json.dumps(body.game_state)
 
    with pool.acquire() as conn:
        with conn.cursor() as cur:
            if body.revision == 0: # If there's never been a revision, we should INSERT rather than SET
                # First ever save: INSERT. If a row already exists, the
                # database's unique rule rejects it -> that means "conflict".
                try:
                    cur.setinputsizes(s=oracledb.DB_TYPE_CLOB)
                    cur.execute(
                        "INSERT INTO game_saves (player_id, game_state, revision) "
                        "VALUES (:p, :s, 1)",
                        p=player_id,
                        s=state_text,
                    )
                    conn.commit()
                    return {"revision": 1}
                except oracledb.IntegrityError: # Conflict if DB already has a row despite 0th revision
                    conn.rollback()
            else:
                # Check the revision AND save in together to prevent save & check interruption headaches
                cur.setinputsizes(s=oracledb.DB_TYPE_CLOB)
                cur.execute(
                    "UPDATE game_saves "
                    "SET game_state = :s, revision = revision + 1, "
                    "    updated_at = SYSTIMESTAMP "
                    "WHERE player_id = :p AND revision = :r",
                    s=state_text,
                    p=player_id,
                    r=body.revision,
                )
                if cur.rowcount == 1:
                    conn.commit()
                    return {"revision": body.revision + 1}
                conn.rollback()
 
            # If reaching here, there has been a save conflict
            # Someone must have loaded save on 2 devices, played on one, saved, then tried to save on another
            # Idk why someone would do this but we catch it anyways; this will be sent to ask the player which save they want
            return JSONResponse(status_code=409, content=read_save(cur, player_id))