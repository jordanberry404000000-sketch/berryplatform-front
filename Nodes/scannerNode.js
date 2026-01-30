// nodes/scannerNode.js
// DX Terminal — Scanner Node Handler
// Handles block scanning, event scanning, contract state, and wallet balance.

import fetch from "node-fetch";

export async function runScannerNode(node) {
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
    scanner: {},
    status: "healthy"
  };

  if (!rpcUrl) {
    result.status = "error";
    result.error = "No RPC URL provided";
    return result;
  }

  try {
    // -----------------------------------------
    // 1. Latest Block
    // -----------------------------------------
    const blockRes = await rpcCall(rpcUrl, "eth_blockNumber", []);
    result.scanner.latestBlock = parseInt(blockRes, 16);

    // -----------------------------------------
    // 2. Contract State (if contract provided)
    // -----------------------------------------
    if (contract) {
      const supplyRes = await rpcCall(rpcUrl, "eth_call", [{
        to: contract,
        data: "0x18160ddd" // totalSupply()
      }, "latest"]);

      result.scanner.totalSupply = parseInt(supplyRes, 16);
    }

    // -----------------------------------------
    // 3. Wallet Balance (if wallet provided)
    // -----------------------------------------
    if (wallet) {
      const balanceRes = await rpcCall(rpcUrl, "eth_getBalance", [wallet, "latest"]);
      result.scanner.walletBalanceWei = balanceRes;
      result.scanner.walletBalance = parseInt(balanceRes, 16) / 1e18;
    }

    // -----------------------------------------
    // 4. Event Scanner (placeholder)
    // -----------------------------------------
    result.scanner.events = "Event scanning not implemented yet";

  } catch (err) {
    result.status = "error";
    result.error = err.message;
  }

  return result;
}

// -----------------------------------------
// Helper: RPC Call
// -----------------------------------------
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