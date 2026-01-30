const fs = require("fs");
const path = require("path");

const HEARTBEAT = "/mnt/chromeos/removable/Berry02/DX_TERMINAL_NFT_METRICS_HEARTBEAT.json";

function updateNftMetricsHeartbeat(file, hash) {
  const hb = {
    node: "DX_TERMINAL_NFT_METRICS",
    lastRun: new Date().toISOString(),
    lastSuccess: new Date().toISOString(),
    lastHash: hash,
    lastFile: path.basename(file),
    status: "healthy",
    meta: {
      chain: "Base",
      contract: "0x41dc69132cce31fcbf6755c84538ca268520246f",
      operator: "Bez"
    }
  };

  fs.writeFileSync(HEARTBEAT, JSON.stringify(hb, null, 2));
}

module.exports = { updateNftMetricsHeartbeat };