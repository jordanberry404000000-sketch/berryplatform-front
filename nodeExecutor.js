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

  // Special case: cert node returns its own result object
  if (node.type === "cert-node") {
    return await runCertNode(node);
  }

  // Default executor result for all other node types
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
        result.data = await runMetricsNode(node);
        result.status = "healthy";
        break;

      case "scanner-node":
        result.data = await runScannerNode(node);
        result.status = "healthy";
        break;

      case "dex-node":
        result.data = await runDexNode(node);
        result.status = "healthy";
        break;

      case "heartbeat":
        result.data = await runHeartbeatNode(node);
        result.status = "healthy";
        break;

      case "orchestrator":
        result.data = await runOrchestratorNode(node);
        result.status = "healthy";
        break;

      case "movement":
        result.data = await runMovementNode(node);
        result.status = "healthy";
        break;

      default:
        result.status = "error";
        result.error = `Unknown node type: ${node.type}`;
    }
  } catch (err) {
    result.status = "error";
    result.error = err.message || String(err);
    console.error(err.stack || err);
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

  if (result.status === "error") {
    console.error(`[ERROR DETAILS] ${result.nodeId}:`, result.error);
  }

  return result;
}