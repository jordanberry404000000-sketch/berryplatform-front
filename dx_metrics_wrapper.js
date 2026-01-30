const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("Running Terminal Metrics core script...");
  execSync("node dx_terminal_metrics.js", { stdio: "inherit" });

  fs.writeFileSync(
    "DX_TERMINAL_METRICS_HEARTBEAT.json",
    JSON.stringify({ timestamp: new Date().toISOString(), status: "success" }, null, 2)
  );

  console.log("Terminal Metrics wrapper completed.");
} catch (err) {
  console.error("Terminal Metrics wrapper error:", err.message);
}
