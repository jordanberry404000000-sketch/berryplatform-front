// nodes/heartbeatNode.js
// DX Terminal — Heartbeat Node Handler
// Confirms engine, contract, and wallet reachability.

import fetch from "node-fetch";

export async function runHeartbeatNode(node) {
  const timestamp = new Date().toISOString();

  const chain = node.meta?.chain || "unknown";
  const rpcUrl = node.meta?.rpc || process.env.DEFAULT_RPC;
  const contract = node.meta?.contract || null;
  const wallet = node.meta?.wallet || null;

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    chain,
    heartbeat: {},
    status: "healthy"
  };

  // ----------------------------------------------------
  // 1. Basic heartbeat (engine alive)
  // ----------------------------------------------------
  result.heartbeat.engine = "alive";

  // If no RPC is provided, we stop here
  if (!rpcUrl) {
    result.status = "degraded";
    result.heartbeat.warning = "No RPC URL provided";
    return result;
  }

  try {
    // ----------------------------------------------------
    // 2. Chain heartbeat (RPC reachable)
    // ----------------------------------------------------
    const blockHex = await rpcCall(rpcUrl, "eth_blockNumber", []);
    result.heartbeat.latestBlock = parseInt(blockHex, 16);

    // ----------------------------------------------------
    // 3. Contract heartbeat (if contract provided)
    // ----------------------------------------------------
    if (contract) {
      const callRes = await rpcCall(rpcUrl, "eth_call", [{
        to: contract,
        data: "0x18160ddd" // totalSupply()
      }, "latest"]);

      result.heartbeat.contractReachable = true;
      result.heartbeat.contractResponse = callRes;
    } else {
      result.heartbeat.contractReachable = null;
    }

    // ----------------------------------------------------
    // 4. Wallet heartbeat (if wallet provided)
    // ----------------------------------------------------
    if (wallet) {
      const balance = await rpcCall(rpcUrl, "eth_getBalance", [wallet, "latest"]);
      result.heartbeat.walletReachable = true;
      result.heartbeat.walletBalanceWei = balance;
    } else {
      result.heartbeat.walletReachable = null;
    }

  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  return result;
}

// ----------------------------------------------------
// Helper: RPC Call
// ----------------------------------------------------
async function rpcCall(rpcUrl, method, params) {
  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params
    })
  });

  const json = await res.json();

  if (json.error) {
    throw new Error(json.error.message);
  }

  return json.result;
}