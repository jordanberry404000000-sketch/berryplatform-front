const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("Running DEX Activity core script...");
  execSync("node dx_terminal_dex_activity.js", { stdio: "inherit" });

  fs.writeFileSync(
    "DX_TERMINAL_DEX_ACTIVITY_HEARTBEAT.json",
    JSON.stringify({ timestamp: new Date().toISOString(), status: "success" }, null, 2)
  );

  console.log("DEX Activity wrapper completed.");
} catch (err) {
  console.error("DEX Activity wrapper error:", err.message);
}
