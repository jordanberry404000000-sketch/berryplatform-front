// nodes/dexNode.js
// DX Terminal — DEX Node Handler
// Tracks swap activity, liquidity, and price signals.

import fetch from "node-fetch";

export async function runDexNode(node) {
  const timestamp = new Date().toISOString();

  const chain = node.meta?.chain || "unknown";
  const rpcUrl = node.meta?.rpc || process.env.DEFAULT_RPC;
  const pool = node.meta?.pool || null;        // liquidity pool address
  const token0 = node.meta?.token0 || null;    // token0 address
  const token1 = node.meta?.token1 || null;    // token1 address

  const result = {
    nodeId: node.nodeId,
    label: node.label,
    type: node.type,
    timestamp,
    chain,
    dex: {},
    status: "healthy"
  };

  if (!rpcUrl) {
    result.status = "error";
    result.error = "No RPC URL provided";
    return result;
  }

  try {
    // ----------------------------------------------------
    // 1. Latest Block
    // ----------------------------------------------------
    const blockHex = await rpcCall(rpcUrl, "eth_blockNumber", []);
    const latestBlock = parseInt(blockHex, 16);
    result.dex.latestBlock = latestBlock;

    // ----------------------------------------------------
    // 2. Swap Activity (last 500 blocks)
    // ----------------------------------------------------
    if (pool) {
      const fromBlock = "0x" + (latestBlock - 500).toString(16);
      const toBlock = blockHex;

      const logs = await rpcCall(rpcUrl, "eth_getLogs", [{
        address: pool,
        fromBlock,
        toBlock
      }]);

      result.dex.swapEvents = logs.length;
    } else {
      result.dex.swapEvents = null;
      result.dex.warning = "No pool address provided";
    }

    // ----------------------------------------------------
    // 3. Liquidity (token reserves)
    // ----------------------------------------------------
    if (pool) {
      const reserveData = await rpcCall(rpcUrl, "eth_call", [{
        to: pool,
        data: "0x0902f1ac" // getReserves()
      }, "latest"]);

      // reserveData is a hex blob: reserve0 (32 bytes) + reserve1 (32 bytes)
      const reserve0 = parseInt(reserveData.slice(2, 66), 16);
      const reserve1 = parseInt(reserveData.slice(66, 130), 16);

      result.dex.reserve0 = reserve0;
      result.dex.reserve1 = reserve1;

      // ----------------------------------------------------
      // 4. Price (simple ratio)
      // ----------------------------------------------------
      if (reserve1 > 0) {
        result.dex.price = reserve0 / reserve1;
      } else {
        result.dex.price = null;
      }
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