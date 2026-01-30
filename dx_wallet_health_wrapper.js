const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("Running Wallet Health core script...");
  execSync("node dx_terminal_wallet_health.js", { stdio: "inherit" });

  fs.writeFileSync(
    "DX_TERMINAL_WALLET_HEALTH_HEARTBEAT.json",
    JSON.stringify({ timestamp: new Date().toISOString(), status: "success" }, null, 2)
  );

  console.log("Wallet Health wrapper completed.");
} catch (err) {
  console.error("Wallet Health wrapper error:", err.message);
}
