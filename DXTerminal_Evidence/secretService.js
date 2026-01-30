import db from "../db/database.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export function saveSecret(name, value) {
  const encrypted = encrypt(value);

  const stmt = db.prepare(`
    INSERT INTO secrets (name, value, timestamp)
    VALUES (?, ?, ?)
  `);

  stmt.run(name, encrypted, new Date().toISOString());
}

export function getSecret(name) {
  const stmt = db.prepare(`
    SELECT value FROM secrets WHERE name = ? ORDER BY id DESC LIMIT 1
  `);

  const row = stmt.get(name);
  if (!row) return null;

  return decrypt(row.value);
}

export function listSecrets() {
  const stmt = db.prepare(`
    SELECT id, name, timestamp FROM secrets ORDER BY id DESC
  `);

  return stmt.all();
}

export function listAllSecrets() {
  return listSecrets();
}
