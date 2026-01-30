const fs = require("fs");
const path = require("path");

const HEARTBEAT = "/mnt/chromeos/removable/Berry02/DX_TERMINAL_HEARTBEAT.json";

function updateHeartbeat(file, hash) {
  const hb = {
    node: "DX_TERMINAL_METRICS",
    lastRun: new Date().toISOString(),
    lastHash: hash,
    lastFile: file,
    status: "healthy"
  };

  fs.writeFileSync(HEARTBEAT, JSON.stringify(hb, null, 2));
}

module.exports = { updateHeartbeat };