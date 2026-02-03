// nodeExecutor.js
// DX Terminal — Node Executor
// Routes nodes to the correct handler and writes artefacts.

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { runMetricsNode } from "./Nodes/metricsNode.js";
import { runScannerNode } from "./Nodes/scannerNode.js";
import { runDexNode } from "./Nodes/dexNode.js";
import { runCertNode } from "./Nodes/certNodes.js";
import { runHeartbeatNode } from "./Nodes/heartbeatNode.js";
import { runOrchestratorNode } from "./Nodes/orchestratorNode.js";
import { runMovementNode } from "./Nodes/movementNode.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "output");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export async function executeNode(node) {
  const startedAt = new Date().toISOString();
  let result = {
    nodeId: node.nodeId,
    type: node.type,
    label: node.label,
    timestamp: startedAt,
    status: "error",
    data: {},
  };

  try {
    switch (node.type) {
      case "metrics-node":
        result = await runMetricsNode(node);
        break;
      case "scanner-node":
        result = await runScannerNode(node);
        break;
      case "dex-node":
        result = await runDexNode(node);
        break;
      case "cert-node":
        result = await runCertNode(node);
        break;
      case "heartbeat":
        result = await runHeartbeatNode(node);
        break;
      case "orchestrator":
        result = await runOrchestratorNode(node);
        break;
      case "movement":
        result = await runMovementNode(node);
        break;
      default:
        result.status = "error";
        result.error = `Unknown node type: ${node.type}`;
    }
  } catch (err) {
    result.status = "error";
    result.error = err.message || String(err);
  }

  // Ensure minimal shape
  if (!result.nodeId) result.nodeId = node.nodeId;
  if (!result.type) result.type = node.type;
  if (!result.timestamp) result.timestamp = startedAt;

  const safeNodeId = result.nodeId.replace(/[^a-zA-Z0-9-_]/g, "_");
  const fileName = `${safeNodeId}-${Date.now()}.json`;
  const filePath = path.join(OUTPUT_DIR, fileName);

  try {
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf8");
  } catch (err) {
    console.error("Failed to write artefact:", err.message);
  }

  console.log(
    `[EXECUTOR] ${result.nodeId} (${result.type}) → ${result.status} @ ${result.timestamp}`
  );

  return result;
}