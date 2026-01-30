const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("Running NFT Metrics core script...");
  execSync("node dx_terminal_nft_metrics.js", { stdio: "inherit" });

  fs.writeFileSync(
    "DX_TERMINAL_NFT_METRICS_HEARTBEAT.json",
    JSON.stringify({ timestamp: new Date().toISOString(), status: "success" }, null, 2)
  );

  console.log("NFT Metrics wrapper completed.");
} catch (err) {
  console.error("NFT Metrics wrapper error:", err.message);
}
