const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("Running Contract State core script...");
  execSync("node dx_terminal_contract_state.js", { stdio: "inherit" });

  fs.writeFileSync(
    "DX_TERMINAL_CONTRACT_STATE_HEARTBEAT.json",
    JSON.stringify({ timestamp: new Date().toISOString(), status: "success" }, null, 2)
  );

  console.log("Contract State wrapper completed.");
} catch (err) {
  console.error("Contract State wrapper error:", err.message);
}
