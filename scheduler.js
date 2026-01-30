// scheduler.js
// DX Terminal — Simple Cron-like Scheduler for Registry Nodes

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { executeNode } from "./nodeExecutor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.join(__dirname, "registry.json");

function loadRegistry() {
  const raw = fs.readFileSync(REGISTRY_PATH, "utf8");
  const json = JSON.parse(raw);
  return json.nodes || [];
}

// Very simple "every N minutes" parser for patterns like "*/2 * * * *"
function parseIntervalMinutes(cronExpr) {
  const parts = cronExpr.split(" ");
  const minutePart = parts[0]; // "*/2"
  if (!minutePart.startsWith("*/")) return 1;
  const n = parseInt(minutePart.slice(2), 10);
  return Number.isNaN(n) ? 1 : n;
}

async function startScheduler() {
  const nodes = loadRegistry();
  console.log(`[SCHEDULER] Loaded ${nodes.length} nodes from registry.json`);

  const now = Date.now();

  nodes.forEach((node) => {
    const intervalMinutes = parseIntervalMinutes(node.schedule || "*/1 * * * *");
    const intervalMs = intervalMinutes * 60 * 1000;

    console.log(
      `[SCHEDULER] Scheduling ${node.nodeId} (${node.type}) every ${intervalMinutes} min`
    );

    // Stagger start slightly based on hash of nodeId to avoid all firing at once
    const offset =
      Math.abs(
        node.nodeId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
      ) % (intervalMs / 2);

    setTimeout(() => {
      // Run immediately once
      executeNode(node);

      // Then run on interval
      setInterval(() => {
        executeNode(node);
      }, intervalMs);
    }, offset);
  });

  console.log("[SCHEDULER] DX Terminal scheduler is running.");
}

startScheduler().catch((err) => {
  console.error("[SCHEDULER] Fatal error:", err);
  process.exit(1);
});