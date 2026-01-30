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
  const balanceWei = await provider.getBalance(primaryWallet);

  const data = {
    timestamp: new Date().toISOString(),
    network: "ethereum-mainnet",
    wallet: primaryWallet,
    ethBalanceWei: balanceWei.toString(),
    ethBalance: Number(ethers.formatEther(balanceWei)),
  };

  const filename = `DX_TERMINAL_WALLET_HEALTH_${data.timestamp.replace(/[:.]/g, "-")}.json`;
  const outPath = path.join(VAULT, filename);

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log("DX Terminal Wallet Health written:", outPath);
}

main().catch((err) => {
  console.error("DX Terminal Wallet Health error:", err);
  process.exit(1);
});
