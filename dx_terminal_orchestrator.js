/**
 * DX Terminal Orchestrator — Six‑Node Engine
 * Berry Platform — 2026
 */

const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

// Root directory
const ROOT = process.env.HOME + "/BerryPlatform";

// Node definitions (simple + clean)
const nodes = [
  { name: "DX_TERMINAL_NFT_METRICS", script: "dx_nft_metrics_entrypoint.sh" },
  { name: "DX_TERMINAL_METRICS", script: "dx_metrics_entrypoint.sh" },
  { name: "DX_TERMINAL_MASTER_CERT", script: "dx_master_cert_entrypoint.sh" },
  { name: "DX_TERMINAL_WALLET_HEALTH", script: "dx_wallet_health_entrypoint.sh" },
  { name: "DX_TERMINAL_CONTRACT_STATE", script: "dx_contract_state_entrypoint.sh" },
  { name: "DX_TERMINAL_DEX_ACTIVITY", script: "dx_dex_activity_entrypoint.sh" },
];

// Log file
const LOGFILE = "/tmp/dx_terminal_orchestrator.log";

// Utility: write to log
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOGFILE, line);
  console.log(line.trim());
}

// Utility: auto heartbeat writer
function writeHeartbeat(nodeName, status) {
  const heartbeatFile = `${nodeName}_HEARTBEAT.json`;
  const heartbeatPath = path.join(ROOT, heartbeatFile);

  const data = {
    timestamp: new Date().toISOString(),
    status: status,
  };

  fs.writeFileSync(heartbeatPath, JSON.stringify(data, null, 2));
}

// Utility: run entrypoint
function runEntrypoint(node) {
  const entryPath = path.join(ROOT, node.script);

  try {
    log(`Running node: ${node.name}`);
    execSync(`bash ${entryPath}`, { stdio: "inherit" });

    writeHeartbeat(node.name, "success");
    log(`Node completed: ${node.name}`);

  } catch (err) {
    writeHeartbeat(node.name, "error");
    log(`ERROR in node ${node.name}: ${err.message}`);
  }
}

// Utility: feed dashboard aggregator
function updateDashboard() {
  const aggregator = path.join(ROOT, "node_status_aggregator.js");

  if (fs.existsSync(aggregator)) {
    try {
      log("Updating dashboard aggregator...");
      execSync(`node ${aggregator}`, { stdio: "inherit" });
      log("Dashboard updated.");
    } catch (err) {
      log("Dashboard aggregator error: " + err.message);
    }
  } else {
    log("Dashboard aggregator missing — skipping.");
  }
}

// MAIN ORCHESTRATION LOOP
function main() {
  log("=== DX TERMINAL ORCHESTRATOR START ===");

  for (const node of nodes) {
    runEntrypoint(node);
  }

  updateDashboard();

  log("=== DX TERMINAL ORCHESTRATOR END ===");
}

main();
