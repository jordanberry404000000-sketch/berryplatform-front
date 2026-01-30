import db from "../db/database.js";

export function writeLog(category, message) {
  const stmt = db.prepare(`
    INSERT INTO logs (category, message, timestamp)
    VALUES (?, ?, ?)
  `);

  stmt.run(category, message, new Date().toISOString());
}

export function listLogs() {
  return db.prepare(`
    SELECT id, category, message, timestamp
    FROM logs
    ORDER BY id DESC
  `).all();
}

export function getLog(id) {
  return db.prepare(`
    SELECT id, category, message, timestamp
    FROM logs
    WHERE id = ?
  `).get(id);
}
