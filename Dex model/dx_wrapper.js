const { exec } = require("child_process");
const fs = require("fs");

const LOCKFILE = "/tmp/dx_terminal_metrics.lock";
const LOGFILE = "/tmp/dx_terminal_metrics.log";
const TIMEOUT_MS = 1000 * 60 * 3; // 3 minutes

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOGFILE, line);
}

log("Wrapper start");

const timer = setTimeout(() => {
  log("ERROR: Hardened node timed out.");
  try { fs.unlinkSync(LOCKFILE); } catch {}
  process.exit(1);
}, TIMEOUT_MS);

exec("node /path/to/dx_terminal_metrics_hardened.js", (err, stdout, stderr) => {
  clearTimeout(timer);

  if (stdout) log(`STDOUT: ${stdout.trim()}`);
  if (stderr) log(`STDERR: ${stderr.trim()}`);

  if (err) {
    log(`ERROR: ${err.message}`);
  } else {
    log("Node completed successfully.");
  }

  try { fs.unlinkSync(LOCKFILE); } catch {}
  process.exit(0);
});