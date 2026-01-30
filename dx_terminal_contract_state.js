const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const BoundlessBerriesABI = require("./BoundlessBerriesABI.json");

const VAULT = "/mnt/chromeos/removable/Berry02";

async function main() {
  const rpcUrl = process.env.RPC_URL;
  const contractAddress = process.env.BOUNDBLESS_BERRIES_ADDRESS;

  if (!rpcUrl || !contractAddress) {
    throw new Error("RPC_URL or BOUNDBLESS_BERRIES_ADDRESS not set");
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const contract = new ethers.Contract(contractAddress, BoundlessBerriesABI, provider);

  const [totalSupply, ownerOfGenesis] = await Promise.all([
    contract.totalSupply().catch(() => null),
    contract.ownerOf(506781).catch(() => null),
  ]);

  const data = {
    timestamp: new Date().toISOString(),
    network: "ethereum-mainnet",
    contract: contractAddress,
    totalSupply: totalSupply ? Number(totalSupply) : null,
    ownerOf_506781: ownerOfGenesis || null,
  };

  const filename = `DX_TERMINAL_CONTRACT_STATE_${data.timestamp.replace(/[:.]/g, "-")}.json`;
  const outPath = path.join(VAULT, filename);

  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log("DX Terminal Contract State written:", outPath);
}

main().catch((err) => {
  console.error("DX Terminal Contract State error:", err);
  process.exit(1);
});
