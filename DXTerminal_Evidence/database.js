import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../../db/app.db");

const db = new Database(dbPath);

// Logs table
db.exec(`
  CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );
`);

// Secrets table
db.exec(`
  CREATE TABLE IF NOT EXISTS secrets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );
`);
db.prepare(`
  CREATE TABLE IF NOT EXISTS bb_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    address TEXT,
    source TEXT,
    timestamp TEXT
  )
`).run();

// Vault table
db.exec(`
  CREATE TABLE IF NOT EXISTS vault (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL,
    name TEXT NOT NULL,
    value TEXT NOT NULL,
    version INTEGER NOT NULL,
    timestamp TEXT NOT NULL
  );
`);

export default db;
