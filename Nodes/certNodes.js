// Nodes/certNodes.js
// DX Terminal — Cert Node Handler
// Produces SHA-256 hashes, verifies integrity, and updates cert lineage.

import fs from "fs";
import crypto from "crypto";
import path from "path";

export async function runCertNode(node) {
  const timestamp = new Date().toISOString();

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    status: "healthy",
    cert: {}
  };

  try {
    // ---------------------------------------------
    // 0. Validate meta + resolve paths
    // ---------------------------------------------
    if (!node.meta) throw new Error("Missing meta configuration");
    if (!node.meta.artefactPath) throw new Error("Missing artefactPath");
    if (!node.meta.ledgerFile) throw new Error("Missing ledgerFile");

    const outputDir = path.resolve(node.meta.artefactPath);
    const ledgerFile = path.resolve(node.meta.ledgerFile);

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // ----------------------------------------------------
    // 1. Find latest output file
    // ----------------------------------------------------
    const files = fs.readdirSync(outputDir).filter(f => f.endsWith(".json"));

    if (files.length === 0) {
      throw new Error("No JSON artefacts found to certify");
    }

    const latestFile = files
      .map(f => ({
        name: f,
        time: fs.statSync(path.join(outputDir, f)).mtime.getTime()
      }))
      .sort((a, b) => b.time - a.time)[0].name;

    const fullPath = path.join(outputDir, latestFile);
    const fileData = fs.readFileSync(fullPath);

    // ----------------------------------------------------
    // 2. Hash the file (SHA-256)
    // ----------------------------------------------------
    const hash = crypto.createHash("sha256").update(fileData).digest("hex");

    result.cert.file = latestFile;
    result.cert.hash = hash;

    // ----------------------------------------------------
    // 3. Load or create cert ledger
    // ----------------------------------------------------
    let ledger = [];

    if (fs.existsSync(ledgerFile)) {
      try {
        ledger = JSON.parse(fs.readFileSync(ledgerFile, "utf8"));
      } catch {
        ledger = [];
      }
    }

    // ----------------------------------------------------
    // 4. Integrity check
    // ----------------------------------------------------
    const lastEntry = ledger.at(-1);

    if (lastEntry && lastEntry.hash !== hash) {
      result.cert.integrity = "changed";
      result.status = "error";
      result.cert.previousHash = lastEntry.hash;
    } else {
      result.cert.integrity = "ok";
    }

    // ----------------------------------------------------
    // 5. Append new cert entry
    // ----------------------------------------------------
    ledger.push({ timestamp, file: latestFile, hash });
    fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));

    result.cert.ledgerUpdated = true;

  } catch (err) {
    console.error("CERT NODE ERROR:", err);
result.error = err?.message || String(err);
console.log("CERT NODE DEBUG:", result);
  }

  return result;
}