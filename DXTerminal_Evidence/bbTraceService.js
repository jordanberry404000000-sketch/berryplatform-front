import EventEmitter from "events";
import db from "../db/database.js";

export const bbEmitter = new EventEmitter();

// Detect BB or 81BB suffix
export function detectBB(address) {
  if (!address) return false;

  const normalized = address.toLowerCase();

  return (
    normalized.endsWith("bb") ||
    normalized.endsWith("81bb")
  );
}

// Log + emit event
export function recordBBEvent(address, source) {
  const timestamp = new Date().toISOString();

  db.prepare(`
    INSERT INTO bb_events (address, source, timestamp)
    VALUES (?, ?, ?)
  `).run(address, source, timestamp);

  bbEmitter.emit("bb-hit", { address, source, timestamp });
}

// List historical events
export function listBBEvents() {
  return db.prepare(`
    SELECT id, address, source, timestamp
    FROM bb_events
    ORDER BY id DESC
  `).all();
}
