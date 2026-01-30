// DX Terminal NFT Metrics (OpenSea + BaseScan, IPv4-safe)
// Collection: 0x41dc69132cce31fcbf6755c84538ca268520246f (Base, ERC-721)
// Saves JSON snapshot to: /mnt/chromeos/removable/Berry02

const https = require("https");
const fs = require("fs");
const path = require("path");

// ---------- CONFIG ----------

// OpenSea DX Terminal collection stats (Base)
const OPENSEA_URL =
  "https://api.opensea.io/api/v2/collections/dx-terminal/stats";

// BaseScan
const BASESCAN_API_KEY = "IMFKJXJSPUYPQSM7RQSDZWZAIZCZ1R76JC";
const BASESCAN_BASE_URL = "https://api.basescan.org/api";

// DX Terminal NFT collection (Base, ERC-721)
const DX_TERMINAL_NFT_CONTRACT = "0x41dc69132cce31fcbf6755c84538ca268520246f";

// ---------- HELPERS ----------

// IPv4-forced HTTPS GET wrapper
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { family: 4 }, (res) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", reject);
  });
}

// Build a BaseScan API URL with params
function basescanUrl(params) {
  const query = new URLSearchParams({
    ...params,
    apikey: BASESCAN_API_KEY
  });
  return `${BASESCAN_BASE_URL}?${query.toString()}`;
}

// ---------- OPENSEA (MARKET) ----------

async function fetchOpenSeaStats() {
  console.log("Fetching OpenSea DX Terminal stats...");
  try {
    const stats = await fetchJSON(OPENSEA_URL);
    return {
      floorPriceEth: stats?.stats?.floor_price ?? null,
      topOfferEth: stats?.stats?.top_bid ?? null,
      volume24hEth: stats?.stats?.one_day_volume ?? null,
      totalVolumeEth: stats?.stats?.total_volume ?? null,
      items: stats?.stats?.count ?? null
    };
  } catch (err) {
    console.error("OpenSea error:", err.message);
    return {
      floorPriceEth: null,
      topOfferEth: null,
      volume24hEth: null,
      totalVolumeEth: null,
      items: null
    };
  }
}

// ---------- BASESCAN (ON-CHAIN NFT) ----------

// 1) Contract creation + age
async function fetchContractCreation() {
  console.log("Fetching BaseScan contract creation...");
  const url = basescanUrl({
    module: "contract",
    action: "getcontractcreation",
    contractaddresses: DX_TERMINAL_NFT_CONTRACT
  });

  try {
    const res = await fetchJSON(url);
    const first = Array.isArray(res.result) ? res.result[0] : res.result || {};
    const txHash = first.txHash || null;
    const timestamp = first.timeStamp ? Number(first.timeStamp) : null;

    let createdAtIso = null;
    let ageDays = null;
    if (timestamp) {
      const createdDate = new Date(timestamp * 1000);
      createdAtIso = createdDate.toISOString();
      const diffMs = Date.now() - createdDate.getTime();
      ageDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    }

    return {
      creationTx: txHash,
      createdAt: createdAtIso,
      ageDays
    };
  } catch (err) {
    console.error("BaseScan contract creation error:", err.message);
    return {
      creationTx: null,
      createdAt: null,
      ageDays: null
    };
  }
}

// 2) Verification status + source info
async function fetchVerificationStatus() {
  console.log("Fetching BaseScan verification status...");
  const url = basescanUrl({
    module: "contract",
    action: "getsourcecode",
    address: DX_TERMINAL_NFT_CONTRACT
  });

  try {
    const res = await fetchJSON(url);
    const first = Array.isArray(res.result) ? res.result[0] : res.result || {};
    const isVerified =
      first.ABI &&
      typeof first.ABI === "string" &&
      first.ABI !== "Contract source code not verified";

    return {
      verified: !!isVerified,
      contractName: first.ContractName || null,
      compilerVersion: first.CompilerVersion || null
    };
  } catch (err) {
    console.error("BaseScan getsourcecode error:", err.message);
    return {
      verified: null,
      contractName: null,
      compilerVersion: null
    };
  }
}

// 3) NFT transfer sample (activity + distinct holders estimate)
async function fetchNftTransferSample() {
  console.log("Fetching BaseScan NFT transfer sample...");
  const url = basescanUrl({
    module: "account",
    action: "tokennfttx",
    contractaddress: DX_TERMINAL_NFT_CONTRACT,
    page: "1",
    offset: "50",
    sort: "desc"
  });

  try {
    const res = await fetchJSON(url);
    const list = Array.isArray(res.result) ? res.result : [];

    const transfers = list.map((tx) => ({
      hash: tx.hash || tx.transactionHash || null,
      blockNumber: tx.blockNumber ? Number(tx.blockNumber) : null,
      timeStamp: tx.timeStamp ? Number(tx.timeStamp) : null,
      from: tx.from || null,
      to: tx.to || null,
      tokenId: tx.tokenID || null
    }));

    const holderSet = new Set();
    for (const tx of list) {
      if (tx.to) holderSet.add(tx.to.toLowerCase());
    }

    return {
      sampleTransfers: transfers,
      sampleCount: transfers.length,
      approxDistinctHoldersFromSample: holderSet.size
    };
  } catch (err) {
    console.error("BaseScan tokennfttx error:", err.message);
    return {
      sampleTransfers: [],
      sampleCount: 0,
      approxDistinctHoldersFromSample: null
    };
  }
}

// 4) Total supply via totalSupply() read (proxy via BaseScan)
async function fetchTotalSupply() {
  console.log("Fetching NFT total supply via BaseScan proxy...");
  const url = basescanUrl({
    module: "proxy",
    action: "eth_call",
    to: DX_TERMINAL_NFT_CONTRACT,
    // totalSupply() selector: 0x18160ddd
    data: "0x18160ddd",
    tag: "latest"
  });

  try {
    const res = await fetchJSON(url);
    const result = res.result;
    if (typeof result === "string" && result.startsWith("0x")) {
      const supply = parseInt(result, 16);
      if (!Number.isNaN(supply)) {
        return { totalSupply: supply };
      }
    }
    return { totalSupply: null };
  } catch (err) {
    console.error("BaseScan totalSupply eth_call error:", err.message);
    return { totalSupply: null };
  }
}

// ---------- MAIN ----------

async function run() {
  try {
    console.log("Starting DX Terminal NFT metrics snapshot...");

    const [
      opensea,
      creation,
      verification,
      transfers,
      supply
    ] = await Promise.all([
      fetchOpenSeaStats(),
      fetchContractCreation(),
      fetchVerificationStatus(),
      fetchNftTransferSample(),
      fetchTotalSupply()
    ]);

    const now = new Date().toISOString();
    const filename = `DX_TERMINAL_NFT_METRICS_${now.replace(/[:.]/g, "-")}.json`;

    const output = {
      timestamp: now,
      collection: "DX Terminal",
      chain: "Base",
      contract: DX_TERMINAL_NFT_CONTRACT,
      market: {
        items: opensea.items,
        floorPriceEth: opensea.floorPriceEth,
        topOfferEth: opensea.topOfferEth,
        volume24hEth: opensea.volume24hEth,
        totalVolumeEth: opensea.totalVolumeEth
      },
      contractInfo: {
        creationTx: creation.creationTx,
        createdAt: creation.createdAt,
        ageDays: creation.ageDays,
        verified: verification.verified,
        contractName: verification.contractName,
        compilerVersion: verification.compilerVersion,
        totalSupply: supply.totalSupply
      },
      nftActivity: {
        sampleTransferCount: transfers.sampleCount,
        approxDistinctHoldersFromSample:
          transfers.approxDistinctHoldersFromSample,
        sampleTransfers: transfers.sampleTransfers
      },
      notes:
        "Auto-generated DX Terminal NFT metrics snapshot (OpenSea + BaseScan, ERC-721, IPv4-safe)"
    };

    const savePath = path.join(
      "/mnt/chromeos/removable/Berry02",
      filename
    );

    fs.writeFileSync(savePath, JSON.stringify(output, null, 2));

    console.log("Saved:", savePath);
  } catch (err) {
    console.error("Fatal error:", err.message);
  }
}

run();
const crypto = require("crypto");
const { updateNftMetricsHeartbeat } = require("./dx_terminal_nft_metrics_heartbeat");

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

const json = JSON.stringify(output, null, 2);
const hash = sha256(json);

fs.writeFileSync(savePath, json);
console.log("Saved:", savePath);
console.log("SHA256:", hash);

// Update heartbeat
updateNftMetricsHeartbeat(savePath, hash);