// nodes/metricsNode.js
// DX Terminal — Metrics Node Handler
// Measures RPC latency, block height, gas price, and filesystem health.

import fs from "fs";
import { performance } from "perf_hooks";
import fetch from "node-fetch";

export async function runMetricsNode(node) {
  const timestamp = new Date().toISOString();

  const chain = node.meta?.chain || "unknown";
  const rpcUrl = node.meta?.rpc || process.env.DEFAULT_RPC;

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    chain,
    metrics: {},
    status: "healthy"
  };

  try {
    // -----------------------------
    // 1. RPC Latency
    // -----------------------------
    if (rpcUrl) {
      const start = performance.now();
      const rpcResponse = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "eth_blockNumber",
          params: []
        })
      });

      const end = performance.now();
      const latency = end - start;

      result.metrics.rpcLatencyMs = latency;

      const json = await rpcResponse.json();
      result.metrics.latestBlock = parseInt(json.result, 16);
    } else {
      result.metrics.rpcLatencyMs = null;
      result.metrics.latestBlock = null;
      result.status = "degraded";
      result.metrics.warning = "No RPC URL provided";
    }

    // -----------------------------
    // 2. Gas Price (if RPC available)
    // -----------------------------
    if (rpcUrl) {
      const gasResponse = await fetch(rpcUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 2,
          method: "eth_gasPrice",
          params: []
        })
      });

      const gasJson = await gasResponse.json();
      result.metrics.gasPriceWei = gasJson.result;
    }

    // -----------------------------
    // 3. Filesystem Health
    // -----------------------------
    const outputDir = "./output";
    const files = fs.existsSync(outputDir) ? fs.readdirSync(outputDir) : [];

    result.metrics.filesystem = {
      outputDirExists: fs.existsSync(outputDir),
      outputFileCount: files.length
    };

  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  return result;
}