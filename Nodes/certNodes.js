// nodes/certNode.js
// DX Terminal — Cert Node Handler
// Produces SHA-256 hashes, verifies integrity, and updates cert lineage.

import fs from "fs";
import crypto from "crypto";
import path from "path";

export async function runCertNode(node) {
  const timestamp = new Date().toISOString();
  const outputDir = "./output";
  const certDir = "./certs";
  const ledgerFile = path.join(certDir, "cert-ledger.json");

  // Ensure cert directory exists
  if (!fs.existsSync(certDir)) {
    fs.mkdirSync(certDir);
  }

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    status: "healthy",
    cert: {}
  };

  try {
    // ----------------------------------------------------
    // 1. Find latest output file
    // ----------------------------------------------------
    const files = fs.existsSync(outputDir) ? fs.readdirSync(outputDir) : [];
    const jsonFiles = files.filter(f => f.endsWith(".json"));

    if (jsonFiles.length === 0) {
      result.status = "degraded";
      result.cert.warning = "No JSON artefacts found to certify";
      return result;
    }

    const latestFile = jsonFiles
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
    // 4. Integrity check (compare to previous hash)
    // ----------------------------------------------------
    const lastEntry = ledger.length > 0 ? ledger[ledger.length - 1] : null;

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
    const newEntry = {
      timestamp,
      file: latestFile,
      hash
    };

    ledger.push(newEntry);

    fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));

    result.cert.ledgerUpdated = true;

  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  return result;
}