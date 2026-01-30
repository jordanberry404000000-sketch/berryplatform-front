// nodes/movementNode.js
// DX Terminal — Movement Node Handler
// Tracks relic lineage, Berry Platform health, and movement artefact stats.

import fs from "fs";
import path from "path";

export async function runMovementNode(node) {
  const timestamp = new Date().toISOString();
  const outputDir = "./output";
  const certDir = "./certs";

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    movement: {
      relics: {},
      platform: {},
      artefacts: {},
      certs: {}
    },
    status: "healthy"
  };

  try {
    // ----------------------------------------------------
    // 1. Artefact stats (JSON outputs)
    // ----------------------------------------------------
    const outputExists = fs.existsSync(outputDir);
    const outputFiles = outputExists
      ? fs.readdirSync(outputDir).filter(f => f.endsWith(".json"))
      : [];

    result.movement.artefacts = {
      outputDirExists: outputExists,
      totalArtefacts: outputFiles.length
    };

    // ----------------------------------------------------
    // 2. Cert lineage stats
    // ----------------------------------------------------
    const ledgerFile = path.join(certDir, "cert-ledger.json");
    let ledger = [];

    if (fs.existsSync(ledgerFile)) {
      try {
        ledger = JSON.parse(fs.readFileSync(ledgerFile, "utf8"));
      } catch {
        ledger = [];
      }
    }

    result.movement.certs = {
      certDirExists: fs.existsSync(certDir),
      totalCerts: ledger.length,
      lastCert: ledger.length > 0 ? ledger[ledger.length - 1] : null
    };

    // ----------------------------------------------------
    // 3. Relic lineage (placeholder, file-based)
    // ----------------------------------------------------
    const relicFile = path.join(outputDir, "relic-lineage.json");
    if (fs.existsSync(relicFile)) {
      try {
        const relicJson = JSON.parse(fs.readFileSync(relicFile, "utf8"));
        result.movement.relics = {
          enabled: true,
          summary: relicJson.summary || null,
          totalRelics: relicJson.totalRelics || null,
          lastRelic: relicJson.lastRelic || null
        };
      } catch {
        result.movement.relics = {
          enabled: true,
          error: "Failed to parse relic-lineage.json"
        };
      }
    } else {
      result.movement.relics = {
        enabled: false,
        info: "No relic-lineage.json found yet"
      };
    }

    // ----------------------------------------------------
    // 4. Berry Platform health (derived)
    // ----------------------------------------------------
    const healthyThreshold = 1; // at least 1 artefact + 1 cert = alive

    const artefactScore = outputFiles.length > 0 ? 1 : 0;
    const certScore = ledger.length > 0 ? 1 : 0;

    const movementScore = artefactScore + certScore;

    result.movement.platform = {
      artefactScore,
      certScore,
      movementScore,
      status:
        movementScore >= healthyThreshold
          ? "alive"
          : outputFiles.length === 0 && ledger.length === 0
          ? "dormant"
          : "booting"
    };

    // ----------------------------------------------------
    // 5. Node status derived from movement status
    // ----------------------------------------------------
    if (result.movement.platform.status === "alive") {
      result.status = "healthy";
    } else if (result.movement.platform.status === "booting") {
      result.status = "degraded";
    } else {
      result.status = "degraded";
    }

  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  return result;
}