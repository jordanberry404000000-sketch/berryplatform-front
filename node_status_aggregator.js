const fs = require("fs");
const path = require("path");

const VAULT = "/mnt/chromeos/removable/Berry02";

function loadHeartbeat(file) {
  try {
    const raw = fs.readFileSync(path.join(VAULT, file), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function run() {
  const files = fs.readdirSync(VAULT);
  const heartbeats = files.filter(f => f.endsWith("_HEARTBEAT.json"));

  const nodes = [];

  for (const hbFile of heartbeats) {
    const hb = loadHeartbeat(hbFile);
    if (!hb) continue;

    nodes.push({
      nodeId: hb.node,
      status: hb.status,
      lastRun: hb.lastRun,
      lastSuccess: hb.lastSuccess || null,
      lastHash: hb.lastHash || null,
      lastFile: hb.lastFile || null,
      meta: hb.meta || {}
    });
  }

  const summary = {
    healthy: nodes.filter(n => n.status === "healthy").length,
    degraded: nodes.filter(n => n.status === "degraded").length,
    error: nodes.filter(n => n.status === "error").length,
    offline: nodes.filter(n => n.status === "offline").length
  };

  const dashboard = { nodes, summary };

  const savePath = path.join(VAULT, "BERRY_PLATFORM_NODE_STATUS.json");
  fs.writeFileSync(savePath, JSON.stringify(dashboard, null, 2));

  console.log("Node status dashboard updated:", savePath);
}

run();