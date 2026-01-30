const { execSync } = require("child_process");
const fs = require("fs");

try {
  console.log("Running Master Cert core script...");
  execSync("node dx_terminal_master_cert.js", { stdio: "inherit" });

  fs.writeFileSync(
    "DX_TERMINAL_MASTER_HEARTBEAT.json",
    JSON.stringify({ timestamp: new Date().toISOString(), status: "success" }, null, 2)
  );

  console.log("Master Cert wrapper completed.");
} catch (err) {
  console.error("Master Cert wrapper error:", err.message);
}
