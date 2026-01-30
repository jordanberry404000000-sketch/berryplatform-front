// nodes/orchestratorNode.js
// DX Terminal — Orchestrator Node Handler
// Aggregates all node outputs into a global system summary.

import fs from "fs";
import path from "path";

export async function runOrchestratorNode(node) {
  const timestamp = new Date().toISOString();
  const outputDir = "./output";

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    summary: {
      totalNodes: 0,
      healthy: 0,
      degraded: 0,
      error: 0
    },
    nodes: [],
    status: "healthy"
  };

  try {
    // ----------------------------------------------------
    // 1. Read all output files
    // ----------------------------------------------------
    if (!fs.existsSync(outputDir)) {
      result.status = "degraded";
      result.summary.warning = "Output directory missing";
      return result;
    }

    const files = fs.readdirSync(outputDir).filter(f => f.endsWith(".json"));

    if (files.length === 0) {
      result.status = "degraded";
      result.summary.warning = "No node artefacts found";
      return result;
    }

    // ----------------------------------------------------
    // 2. Load and parse each artefact
    // ----------------------------------------------------
    for (const file of files) {
      try {
        const fullPath = path.join(outputDir, file);
        const raw = fs.readFileSync(fullPath, "utf8");
        const json = JSON.parse(raw);

        // Extract node status
        const nodeStatus = json.status || "unknown";

        result.nodes.push({
          nodeId: json.nodeId || "unknown",
          type: json.type || "unknown",
          status: nodeStatus,
          timestamp: json.timestamp || null,
          file
        });

        // Update summary counters
        result.summary.totalNodes++;

        if (nodeStatus === "healthy") result.summary.healthy++;
        else if (nodeStatus === "degraded") result.summary.degraded++;
        else if (nodeStatus === "error") result.summary.error++;

      } catch (err) {
        // If a file is corrupted, count it as an error node
        result.summary.totalNodes++;
        result.summary.error++;

        result.nodes.push({
          nodeId: "unknown",
          type: "unknown",
          status: "error",
          timestamp: null,
          file,
          error: "Failed to parse JSON"
        });
      }
    }

    // ----------------------------------------------------
    // 3. Determine orchestrator health
    // ----------------------------------------------------
    if (result.summary.error > 0) {
      result.status = "error";
    } else if (result.summary.degraded > 0) {
      result.status = "degraded";
    } else {
      result.status = "healthy";
    }

  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  return result;
}