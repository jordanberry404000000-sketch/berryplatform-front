import db from "../db/database.js";
import { encrypt, decrypt } from "../utils/crypto.js";

// Save a vault entry
export function saveVaultEntry(category, name, value) {
  const encrypted = encrypt(value);

  const stmt = db.prepare(`
    INSERT INTO vault (category, name, value, version, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(
    category,
    name,
    encrypted,
    Date.now(),
    new Date().toISOString()
  );
}

// Get latest vault entry
export function getVaultEntry(category, name) {
  const stmt = db.prepare(`
    SELECT value FROM vault
    WHERE category = ? AND name = ?
    ORDER BY version DESC
    LIMIT 1
  `);
  const row = stmt.get(category, name);
  if (!row) return null;

  return decrypt(row.value);
}

// List vault entries (optionally by category)
export function listVaultEntries(category = null) {
  if (category) {
    return db.prepare(`
      SELECT id, category, name, version, timestamp
      FROM vault
      WHERE category = ?
      ORDER BY id DESC
    `).all(category);
  }

  return db.prepare(`
    SELECT id, category, name, version, timestamp
    FROM vault
    ORDER BY id DESC
  `).all();
}

// Alias for metrics + unified server
export function listAllVaultEntries() {
  return listVaultEntries();
}
