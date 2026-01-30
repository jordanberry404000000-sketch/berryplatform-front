const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const VAULT = "/mnt/chromeos/removable/Berry02";
const LOGFILE = "/tmp/dx_terminal_orchestrator.log";
const SUBSYSTEM_HEARTBEAT = path.join(VAULT, "DX_TERMINAL_SUBSYSTEM_HEARTBEAT.json");

// Adjust these to your actual script locations
const NODES = [
  {
    id: "DX_TERMINAL_NFT_METRICS",
    label: "DX Terminal NFT Metrics",
    script: "/path/to/dx_terminal_nft_metrics.js",
    lockfile: "/tmp/dx_terminal_nft_metrics.lock",
    timeoutMs: 1000 * 60 * 3
  },
  {
    id: "DX_TERMINAL_METRICS",
    label: "DX Terminal Market Metrics",
    script: "/path/to/dx_terminal_metrics.js",
    lockfile: "/tmp/dx_terminal_metrics.lock",
    timeoutMs: 1000 * 60 * 3
  },
  {
    id: "DX_TERMINAL_MASTER_CERT",
    label: "DX Terminal Master Cert",
    script: "/path/to/dx_terminal_master_cert.js",
    lockfile: "/tmp/dx_terminal_master_cert.lock",
    timeoutMs: 1000 * 60 * 5
  }
  // Add DEX_CORRIDOR_DXTERMINAL here later if you want
];

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOGFILE, line);
  console.log(line.trim());
}

function runNode(node) {
  return new Promise((resolve) => {
    const { id, label, script, lockfile, timeoutMs } = node;

    log(`Starting node: ${id} (${label})`);

    // If lock exists, skip
    if (fs.existsSync(lockfile)) {
      log(`SKIP ${id}: lockfile present (${lockfile})`);
      return resolve({ id, status: "skipped-lock" });
    }

    // Create lock
    fs.writeFileSync(lockfile, String(process.pid));

    let finished = false;

    const timer = setTimeout(() => {
      if (finished) return;
      finished = true;
      log(`TIMEOUT ${id}: exceeded ${timeoutMs}ms, killing process.`);
      try { fs.unlinkSync(lockfile); } catch {}
      resolve({ id, status: "timeout" });
    }, timeoutMs);

    const child = exec(`node ${script}`, (err, stdout, stderr) => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);

      if (stdout) log(`[${id}] STDOUT: ${stdout.trim()}`);
      if (stderr) log(`[${id}] STDERR: ${stderr.trim()}`);

      if (err) {
        log(`ERROR ${id}: ${err.message}`);
        try { fs.unlinkSync(lockfile); } catch {}
        return resolve({ id, status: "error" });
      }

      log(`SUCCESS ${id}`);
      try { fs.unlinkSync(lockfile); } catch {}
      resolve({ id, status: "success" });
    });
  });
}

function updateSubsystemHeartbeat(results) {
  const now = new Date().toISOString();

  const summary = {
    totalNodes: results.length,
    success: results.filter(r => r.status === "success").length,
    error: results.filter(r => r.status === "error").length,
    timeout: results.filter(r => r.status === "timeout").length,
    skippedLock: results.filter(r => r.status === "skipped-lock").length
  };

  const hb = {
    subsystem: "DX_TERMINAL",
    label: "DX Terminal Collection Subsystem",
    lastRun: now,
    results,
    summary
  };

  fs.writeFileSync(SUBSYSTEM_HEARTBEAT, JSON.stringify(hb, null, 2));
  log(`Updated subsystem heartbeat: ${SUBSYSTEM_HEARTBEAT}`);
}

async function run() {
  log("DX_TERMINAL_ORCHESTRATOR: start");

  const results = [];
  for (const node of NODES) {
    // Run nodes sequentially to avoid USB contention
    // and to keep lineage ordering clean
    // (NFT metrics → market metrics → master cert)
    // If you ever want parallel, we can revisit.
    // For now: discipline > speed.
    // eslint-disable-next-line no-await-in-loop
    const result = await runNode(node);
    results.push(result);
  }

  updateSubsystemHeartbeat(results);
  log("DX_TERMINAL_ORCHESTRATOR: complete");
}

run().catch((err) => {
  log(`FATAL orchestrator error: ${err.message}`);
});