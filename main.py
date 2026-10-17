import os
import oracledb
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()

app = FastAPI()

# Connecting to the Oracle DB
pool = oracledb.create_pool(
    user=os.environ["DB_USER"],
    password=os.environ["DB_PASSWORD"],
    dsn=os.environ["DB_DSN"],
    min=1, max=4,
)

@app.get("/health")
def health():
    with pool.acquire() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT 1 FROM dual")
            return {"status": "ok", "db": cur.fetchone()[0]}