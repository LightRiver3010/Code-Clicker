// cloud.js - connects Code Clicker to the FastAPI backend (Step 5).
// Load it AFTER your game script, as a module:
//   <script type="module" src="cloud.js"></script>
// While testing locally, open the game at http://localhost:PORT (not 127.0.0.1),
// so the game and the API count as the same site and the cookie is sent.

// --- Hooks to actual game ---
const hooks = {
  getSaveData: () => {
    const [ppc, multiplier, upgrades, managers, won, lifetimePPC] = get_data();
    return { ppc, multiplier, upgrades, managers, won, lifetimePPC };
  },
  applySaveData: (data) => {
    ppc = data.ppc;
    multiplier = data.multiplier;
    won = data.won;
    lifetimePPC = data.lifetimePPC;
    copyInto(upgrades, data.upgrades);
    copyInto(managers, data.managers);
    update();
  },
  pauseGame: () => {
    stopGameLoop();
  },
  resumeGame: () => {
    startGameLoop();
  },
  getHeadlineStat: (data) => { // "Headline stat aka lifetime bits"
    return data.lifetimePPC;
  },
  // used for logging out; clear imported save data
  clearLocalSave: () => {
    localStorage.removeItem('clickerData');
  },
};

function copyInto(target, saved) { // Copy items to prevent pointer errors with old saves
    if (!saved) return;

    for (const key of Object.keys(saved)) {
        if (target[key] == null || saved[key] == null) {
            continue;
        }

        Object.assign(target[key], saved[key]);
    }
}


const API_URL =
  location.hostname === "localhost"
    ? "http://localhost:5500"
    : "https://api.savaryn.me";
const META_KEY = "cloud_meta"; // where we remember how this device relates to the cloud
const AUTOSAVE_MS = 60 * 1000; // upload about once a minute
const MAX_KEEPALIVE_CHARS = 60000; // browsers cap "closing-tab" requests at 64 KiB

// "unknown" = haven't managed to ask the server yet (e.g. offline)
// "guest"   = server says we're not logged in
// "ready"   = logged in and the first load/compare has finished
let state = "unknown";
let playerId = null;
let uploading = false;

const el = (id) => document.getElementById(id);
const fmt = (n) => Number(n).toLocaleString();

// --- Talking to server ---
// Sends one request and always returns { status, data }. 
// Status 0 means it couldn't reach the server
async function api(path, method = "GET", body) {
  try {
    const res = await fetch(API_URL + path, {
      method,
      credentials: "include", // lets the browser send/receive the login cookie
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body:
        body === undefined
          ? undefined
          : typeof body === "string"
            ? body
            : JSON.stringify(body),
    });
    let data = null;
    try {
      data = await res.json();
    } catch {
      /* some replies have no JSON body */
    }
    return { status: res.status, data };
  } catch {
    return { status: 0, data: null };
  }
}

function renderLeaderboard(entries) {
  const list = el("leaderboard-list");
  const status = el("leaderboard-status");
  list.replaceChildren();

  if (!entries.length) {
    status.textContent = "No saved scores yet.";
    return;
  }

  status.textContent = "";
  for (const entry of entries) {
    const row = document.createElement("li");
    row.className = "leaderboard-entry";

    const username = document.createElement("span");
    username.textContent = entry.username;

    const score = document.createElement("span");
    score.className = "leaderboard-score";
    score.textContent = fmt(entry.lifetimePPC) + " bits";

    row.append(username, score);
    list.appendChild(row);
  }
}

async function loadLeaderboard() {
  const status = el("leaderboard-status");
  status.textContent = "Loading...";
  const result = await api("/leaderboard");

  if (result.status !== 200 || !result.data || !Array.isArray(result.data.leaderboard)) {
    status.textContent = errorText(result);
    el("leaderboard-list").replaceChildren();
    return;
  }

  renderLeaderboard(result.data.leaderboard);
}

const leaderboardButton = el("leaderboard-button");
const leaderboardMenu = el("leaderboard-menu");
leaderboardButton.addEventListener("click", function () {
  this.classList.toggle("clicked");
  leaderboardMenu.classList.toggle("hidden");
  if (!leaderboardMenu.classList.contains("hidden")) {
    loadLeaderboard();
  }
});

// Turns a failed reply into a readable message the player can understand
function errorText(res) {
  if (res.status === 0) return "Can't reach the server. Try again later.";
  if (res.status === 429) return "Too many attempts. Wait a bit and try again.";
  if (res.status === 422)
    return "Username must be 3-30 characters and password at least 8.";
  if (res.data && typeof res.data.detail === "string") return res.data.detail;
  return "Something went wrong (" + res.status + ").";
}

// --- Connecting the player's device info to the cloud ---
// meta = { playerId, baseRevision, syncedJson }
//   baseRevision: the cloud revision this device's save was last based on
//   syncedJson:   the exact save text that matched the cloud at that moment
// If the current save text differs from syncedJson, there is progress the
// cloud hasn't seen yet ("unsynced").
function loadMeta() {
  try {
    return JSON.parse(localStorage.getItem(META_KEY));
  } catch {
    return null;
  }
}
function saveMeta(meta) {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}
function remember(revision, json) {
  saveMeta({ playerId, baseRevision: revision, syncedJson: json });
}
// Records a new base revision but keeps the "last synced" text if it is ours.
function setBase(revision) {
  const stored = loadMeta();
  const syncedJson =
    stored && stored.playerId === playerId ? stored.syncedJson : null;
  saveMeta({ playerId, baseRevision: revision, syncedJson });
}

// Turns the current game state into JSON text, or returns null if it holds a
// number that JSON can't store (Infinity / NaN), so we never upload a broken save.
function snapshot() {
  try {
    return JSON.stringify(hooks.getSaveData(), (key, value) => {
      if (typeof value === "number" && !Number.isFinite(value)) {
        throw new Error("not a finite number at '" + key + "'");
      }
      return value;
    });
  } catch (err) {
    console.warn("Cloud sync skipped:", err.message);
    return null;
  }
}

const hasProgress = () =>
  Number(hooks.getHeadlineStat(hooks.getSaveData())) > 0;

// --- Setting status for cloud bar in settings --- 
function setStatus(text) {
  el("cloud-status").textContent = text;
}
function showLoggedIn(on) {
  for (const id of ["cloud-username", "cloud-password", "cloud-login", "cloud-register"]) {
    el(id).hidden = on;
  }
  el("cloud-logout").hidden = !on;
}

// --- Actually loading/comparing save data
// This function runs immediately, each page load. It asks server (DB) for cloud save (via FastAPI/Caddy)
// Once it has that save, it decides what to do with it (implement, most of the time)
async function startSync() {
  const res = await api("/save");

  if (res.status === 401) {
    state = "guest";
    showLoggedIn(false);
    setStatus("Playing as guest - progress is saved on this device only.");
    return;
  }
  if (res.status !== 200) {
    state = "unknown"; // offline or server trouble: keep playing, retry later
    setStatus("Offline - playing from this device's save.");
    return;
  }

  const local = snapshot();
  if (local === null) {
    setStatus("Your save has an invalid number, so cloud sync is paused.");
    return;
  }

  playerId = res.data.player_id;
  showLoggedIn(true);
  await reconcile(res.data, local);
  state = "ready";
  setStatus("Logged in - progress syncs to the cloud.");
}

// Compares this device's save with the cloud's and picks one action.
async function reconcile(cloud, local) {
  const stored = loadMeta();
  const meta = stored && stored.playerId === playerId ? stored : null;
  const baseRevision = meta ? meta.baseRevision : 0;
  const unsynced = meta ? local !== meta.syncedJson : hasProgress();

  // The cloud has no save for this account yet
  if (cloud.revision === 0) {
    if (unsynced) await upload(0); // first save
    else remember(0, local);
    return;
  }
  // Same progress on both sides: nothing to decide
  if (JSON.stringify(cloud.game_state) === local) {
    remember(cloud.revision, local);
    return;
  }
  // The cloud is older than what we last saw (e.g. the database was reset)
  if (cloud.revision < baseRevision) return askWhichToKeep(cloud);

  // Nothing unsent on this device: just take the cloud's version
  if (!unsynced) return applyCloud(cloud);

  // Only this device changed things: send them up
  if (cloud.revision === baseRevision) return upload(baseRevision);

  // Both sides changed (e.g. played offline while another device saved): ask
  return askWhichToKeep(cloud);
}

// Sends this device's save to the cloud, using the revision we last saw.
async function upload(revision) {
  if (uploading) return;
  const snap = snapshot();
  if (snap === null) return;

  setBase(revision); // so a failed attempt is retried with the right revision
  uploading = true;
  const res = await api(
    "/save",
    "PUT",
    '{"revision":' + revision + ',"game_state":' + snap + "}"
  );
  uploading = false;

  if (res.status === 200) {
    remember(res.data.revision, snap);
    setStatus("Logged in - saved to the cloud.");
  } else if (res.status === 409) {
    await askWhichToKeep(res.data); // someone saved in between; the reply holds the cloud copy
  } else if (res.status === 401) {
    state = "guest";
    showLoggedIn(false);
    setStatus("You were logged out. Log in again to keep syncing.");
  } else {
    setStatus("Couldn't reach the server - will try again.");
  }
}

// Replaces this device's game with the cloud's save.
function applyCloud(cloud) {
  hooks.pauseGame(); // so the running game loop can't overwrite what we load
  hooks.applySaveData(cloud.game_state);
  hooks.resumeGame();
  remember(cloud.revision, snapshot());
}

// Shows a popup when both sides have progress and lets the player choose.
async function askWhichToKeep(cloud) {
  const mine = fmt(hooks.getHeadlineStat(hooks.getSaveData()));
  const theirs = fmt(hooks.getHeadlineStat(cloud.game_state));
  const keepThisDevice = window.confirm(
    "Your progress on this device and in the cloud don't match.\n\n" +
      "This device: " + mine + " total bits earned\n" +
      "Cloud: " + theirs + " total bits earned\n\n" +
      "OK = keep THIS DEVICE's progress (replaces the cloud)\n" +
      "Cancel = use the CLOUD's progress (replaces this device)"
  );
  if (keepThisDevice) await upload(cloud.revision);
  else applyCloud(cloud);
}



// --- Login/Logout/Registering
async function authenticate(path) {
  const username = el("cloud-username").value.trim();
  const password = el("cloud-password").value;
  if (!username || !password) return setStatus("Enter a username and password.");

  setStatus("Working...");
  const res = await api(path, "POST", { username, password });
  if (res.status === 200 || res.status === 201) {
    el("cloud-password").value = "";
    await startSync(); // logging in does NOT load progress by itself; this does
  } else {
    setStatus(errorText(res));
  }
}

async function logout() {
  if (state === "ready") {
    const meta = loadMeta();
    const snap = snapshot();
    if (!meta || snap !== meta.syncedJson) {
      await upload(meta ? meta.baseRevision : 0); // send anything unsent first
      const after = loadMeta();
      const stillUnsent = snapshot() !== (after ? after.syncedJson : null);
      if (
        stillUnsent &&
        !window.confirm(
          "Your latest progress couldn't be saved to the cloud. Log out anyway and lose it?"
        )
      ) {
        return;
      }
    }
  }
  await api("/logout", "POST");
  localStorage.removeItem(META_KEY);
  hooks.pauseGame(); // stop the game from re-saving locally right after we clear it
  hooks.clearLocalSave(); // so the next person on this browser doesn't inherit this save
  location.reload();
}



// --- Autosaving & Startup
// Runs every minute: retries the first sync if we were offline, otherwise
// uploads when there is progress the cloud hasn't seen.
async function autosaveTick() {
  if (state === "unknown") return startSync();
  if (state !== "ready") return;
  const meta = loadMeta();
  const snap = snapshot();
  if (meta && snap !== null && snap !== meta.syncedJson) {
    await upload(meta.baseRevision);
  }
}

// One extra save attempt when the tab is hidden or closed. It is best effort
// only: browsers don't guarantee it finishes, so the minute timer is the real safety net.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "hidden" || state !== "ready") return;
  const meta = loadMeta();
  const snap = snapshot();
  if (!meta || snap === null || snap === meta.syncedJson) return;
  const body =
    '{"revision":' + meta.baseRevision + ',"game_state":' + snap + "}";
  if (body.length > MAX_KEEPALIVE_CHARS) return;
  fetch(API_URL + "/save", {
    method: "PUT",
    credentials: "include",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body,
  }).catch(() => {});
});

el("cloud-login").addEventListener("click", () => authenticate("/login"));
el("cloud-register").addEventListener("click", () => authenticate("/register"));
el("cloud-logout").addEventListener("click", logout);
setInterval(autosaveTick, AUTOSAVE_MS);
// Wait for the whole page so your game has finished loading its own save first
window.addEventListener("load", startSync);