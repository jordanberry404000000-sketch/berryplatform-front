const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const VAULT = "/mnt/chromeos/removable/Berry02";

async function main() {
  const rpcUrl = process.env.RPC_URL;
  const primaryWallet = process.env.PRIMARY_WALLET;

  if (!rpcUrl || !primaryWallet) {
    throw new Error("RPC_URL or PRIMARY_WALLET not set");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const latest = await provider.getBlockNumber();

  // naive scan of last N blocks for this address (cheap starter version)
  const lookback = 1000;
  let txCount = 0;

  for (let i = latest; i > latest - lookback && i >= 0; i--) {
    const block = await provider.getBlock(i, true);
    if (!block || !block.transactions) continue;

    for (const tx of block.transactions) {
      if (
        (tx.from && tx.from.toLowerCase() === primaryWallet.toLowerCase()) ||
        (tx.to && tx.to.toLowerCase() === primaryWallet.toLowerCase())
      ) {
        txCount++;
      }
    }
  }

  const data = {
    timestamp: new Date().toISOString(),
    network: "ethereum-mainnet",
    wallet: primaryWallet,
    scannedBlocks: lookback,
    recentTxCount: txCount,
  };

  const filename = `DX_TERMINAL_DEX_ACTIVITY_${data.timestamp.replace(/[:.]/g, "-")}.json`;
  const outPath = path.join(VAULT, filename);

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log("DX Terminal DEX Activity written:", outPath);
}

main().catch((err) => {
  console.error("DX Terminal DEX Activity error:", err);
  process.exit(1);
});
