/**
 * DX Terminal Metrics Node — Hardened Edition
 * OpenSea + BaseScan (IPv4 forced)
 * Safe for ChromeOS USB paths (Berry02)
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// CONFIG
const OPENSEA_URL = "https://api.opensea.io/api/v2/collections/dx-terminal/stats";
const BASESCAN_API_KEY = "IMFKJXJSPUYPQSM7RQSDZWZAIZCZ1R76JC";
const BASESCAN_BASE_URL = "https://api.basescan.org/api";
const DX_TERMINAL_CONTRACT = "0xc4a2cafbf82c723628d10054b5b11c5f0ceedc0e";
const SAVE_DIR = "/mnt/chromeos/removable/Berry02";
const ENABLE_CACHE = true;

// Utility: sleep
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Utility: SHA256
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// IPv4-safe fetch with retries + timeout
async function fetchJSON(url, retries = 3, timeoutMs = 8000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const data = await new Promise((resolve, reject) => {
        const req = https.get(url, { family: 4, timeout: timeoutMs }, (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () => {
            try {
              resolve(JSON.parse(body));
            } catch (err) {
              reject(err);
            }
          });
        });

        req.on("error", reject);
        req.on("timeout", () => {
          req.destroy();
          reject(new Error("Timeout"));
        });
      });

      return data;
    } catch (err) {
      console.error(`Fetch error (attempt ${attempt}):`, err.message);
      if (attempt < retries) {
        await wait(500 * attempt); // exponential backoff
      }
    }
  }

  return null; // graceful failure
}

// BaseScan URL builder
function basescanUrl(params) {
  const query = new URLSearchParams({ ...params, apikey: BASESCAN_API_KEY });
  return `${BASESCAN_BASE_URL}?${query.toString()}`;
}

// Optional caching layer
function loadCache(key) {
  if (!ENABLE_CACHE) return null;
  const cachePath = path.join(SAVE_DIR, `cache_${key}.json`);
  if (fs.existsSync(cachePath)) {
    try {
      return JSON.parse(fs.readFileSync(cachePath, "utf8"));
    } catch {
      return null;
    }
  }
  return null;
}

function saveCache(key, data) {
  if (!ENABLE_CACHE) return;
  const cachePath = path.join(SAVE_DIR, `cache_${key}.json`);
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
}

// Fetchers (hardened)
async function fetchOpenSeaStats() {
  const cache = loadCache("opensea");
  if (cache) return cache;

  const stats = await fetchJSON(OPENSEA_URL);
  const out = stats?.stats
    ? {
        floorPriceEth: stats.stats.floor_price ?? null,
        topOfferEth: stats.stats.top_bid ?? null,
        volume24hEth: stats.stats.one_day_volume ?? null,
        totalVolumeEth: stats.stats.total_volume ?? null,
        items: stats.stats.count ?? 36647
      }
    : {
        floorPriceEth: null,
        topOfferEth: null,
        volume24hEth: null,
        totalVolumeEth: null,
        items: 36647
      };

  saveCache("opensea", out);
  return out;
}

async function fetchTokenInfo() {
  const cache = loadCache("tokeninfo");
  if (cache) return cache;

  const url = basescanUrl({
    module: "token",
    action: "tokeninfo",
    contractaddress: DX_TERMINAL_CONTRACT
  });

  const res = await fetchJSON(url);
  const info = Array.isArray(res?.result) ? res.result[0] : res?.result || {};

  const out = {
    name: info.tokenName || null,
    symbol: info.tokenSymbol || null,
    decimals: info.tokenDecimal ? Number(info.tokenDecimal) : null,
    totalSupplyRaw: info.totalSupply || null
  };

  saveCache("tokeninfo", out);
  return out;
}

async function fetchContractCreation() {
  const cache = loadCache("creation");
  if (cache) return cache;

  const url = basescanUrl({
    module: "contract",
    action: "getcontractcreation",
    contractaddresses: DX_TERMINAL_CONTRACT
  });

  const res = await fetchJSON(url);
  const first = Array.isArray(res?.result) ? res.result[0] : res?.result || {};

  const timestamp = first.timeStamp ? Number(first.timeStamp) : null;
  let createdAtIso = null;
  let ageDays = null;

  if (timestamp) {
    const createdDate = new Date(timestamp * 1000);
    createdAtIso = createdDate.toISOString();
    ageDays = Math.floor((Date.now() - createdDate.getTime()) / 86400000);
  }

  const out = {
    creationTx: first.txHash || null,
    createdAt: createdAtIso,
    ageDays
  };

  saveCache("creation", out);
  return out;
}

async function fetchTransferStats() {
  const url = basescanUrl({
    module: "account",
    action: "tokentx",
    contractaddress: DX_TERMINAL_CONTRACT,
    page: "1",
    offset: "10",
    sort: "asc"
  });

  const res = await fetchJSON(url);
  const list = Array.isArray(res?.result) ? res.result : [];

  return {
    hasTransfers: list.length > 0,
    sampleTransferCount: list.length
  };
}

async function fetchVerificationStatus() {
  const cache = loadCache("verification");
  if (cache) return cache;

  const url = basescanUrl({
    module: "contract",
    action: "getsourcecodeFileSync(cachePath",
    address: DX, JSON.stringify(data, null, 2));
}

// Fetchers (_TERMINAL_CONTRACThardened)
async function fetchOpenSeaStats() {
  const cache = loadCache("opensea");
  if (cache) return cache;


  });

  const res  const stats = await = await fetchJSON fetchJSON(OPENSE(url);
  const firstA_URL);
  const out = Array.isArray(res?.result) ? res = stats?.stats
    ? {
        floor.result[0] : res?.result || {};

PriceEth: stats.stats  const out = {
.floor_price ?? null    verified:
      first.ABI &&
     ,
        topOffer typeof first.ABIEth: stats.stats === "string" &&
.top_bid ?? null      first.ABI !==,
        volume "Contract source24hEth: stats.stats code not verified.one_day_volume ??",
    contractName null,
        totalVolumeEth: stats: first.ContractName || null,
   .stats.total_volume ?? null,
        compilerVersion items: stats.stats: first.Compiler.count ?? 36647
Version || null
  };

  saveCache("verification",      }
    : {
 out);
  return out        floorPriceEth: null,
        topOfferEth: null,
        volume24hEth: null,
        totalVolumeEth: null,
        items: 36647
      };

  saveCache("opensea", out);
  return out;
}

async function fetchTokenInfo();
}

async function {
  const cache fetchTopHolders = loadCache("tokeninfo");
  if (cache) return cache;

() {
  const url = basescanUrl({
    module: "token  const url = basescanUrl({
    module: "token",
    action: "tokeninfo",
    contractaddress: DX_TERMINAL_CONTRACT
  });

  const res = await fetchJSON(url);
  const info = Array.isArray(res?.result) ? res.result[0",
    action: "] : res?.result || {};

  const out = {
    name: info.tokenName || null,
    symbol: info.tokenSymbol || null,
    decimals: infotokenholderlist",
.tokenDecimal ? Number(info.tokenDecimal) : null,
    totalSupplyRaw: info.totalSupply || null
  };

  saveCache("tokeninfo", out);
  return out;
}

async function fetchContractCreation() {
  const cache = loadCache("creation");
  if (cache) return cache;

  const url = basescanUrl({
    module: "contract",
       contractaddress action: "getcontract: DX_TERMINAL_CONcreation",
    contractaddresses: DX_TERMINAL_CONTRACT
  });

  const res = await fetchJSON(url);
  const first = Array.isArray(res?.result) ? res.result[0] : res?.result || {};

  const timestamp = first.timeStamp ? Number(first.timeTRACT,
    page:Stamp) : null;
  "1",
    offset let createdAtIso = null;
  let age: "10",
    sort: "desc"
  });

Days = null;

  if  const res = await (timestamp) {
    const createdDate = new Date(timestamp fetchJSON(url);
 * 1000);
    created  const list = ArrayAtIso = createdDate.isArray(res?.result.toISOString();
    ageDays = Math) ? res.result :.floor((Date.now [];

  return list() - createdDate.map((h) => ({
    address: h.Token.getTime()) / 86400000);
  }

  constHolderAddress || out = {
    creation null,
    balanceTx: first.txHashRaw: h.TokenHolder || null,
    createdQuantity || nullAt: createdAtIso
  }));
}

// MAIN,
    ageDays
  };


async function run  saveCache("creation() {
  console.log("Starting hardened", out);
  return DX Terminal metrics out;
}

async function snapshot...");

 fetchTransferStats  const [
    op() {
  const url = basescanUrl({
ensea,
    token    module: "accountInfo,
    creation",
    action: ",
    transfers,
tokentx",
    contract    verificationaddress: DX_TERMIN,
    topHoldersAL_CONTRACT,
   
  ] = await Promise page: "1",
    offset.all([
    fetch: "10",
    sortOpenSeaStats(),
: "asc"
  });

  const res = await    fetchTokenInfo(),
    fetchContractCreation(),
    fetch fetchJSON(url);
  const list = ArrayTransferStats(),
    fetchVerification.isArray(res?.resultStatus(),
    fetch) ? res.result :TopHolders()
  ]);

 [];

  return {
  let topSharePercent    hasTransfers = null;

  if (: list.length > tokenInfo.totalSupply0,
    sampleTransferRaw && tokenInfoCount: list.length.decimals != null
  };
}

async function && topHolders.length fetchVerification > 0) {
    constStatus() {
  const supply = Number cache = loadCache(tokenInfo.total("verification");
SupplyRaw) / Math  if (cache) return.pow(10, tokenInfo cache;

  const.decimals);
    const url = basescanUrl topSum = topHolders({
    module: ".reduce((acc, h)contract",
    action => {
      const: "getsourcecode bal = Number(h.balance",
    address: DXRaw || "0") / Math_TERMINAL_CONTRACT
  });

  const res.pow(10, tokenInfo = await fetchJSON.decimals);
      return acc + bal(url);
  const first;
    }, 0);
    = Array.isArray if (supply > 0)(res?.result) ? res.result[0] : res {
      topShare?.result || {};

Percent = (topSum / supply) * 100  const out = {
;
    }
  }

  const    verified:
      first.ABI &&
      now = new Date().toISOString();
  typeof first.ABI const filename = === "string" &&
 `DX_TERMINAL_MET      first.ABI !==RICS_${now.replace "Contract source(/[:.]/g, "-")}. code not verifiedjson`;
  const savePath = path.join(SAVE_DIR, filename",
    contractName: first.Contract);

  const outputName || null,
    compilerVersion = {
    timestamp: first.CompilerVersion || null
  };

  saveCache("verification", out);
  return out;
}

async function fetchTopHolders() {
  const url: now,
    collection = basescanUrl({
    module: "token",
    action: "tokenholderlist",
    contractaddress: DX_TERMINAL_CONTRACT,
    page: "1",
    offset: "10",
    sort: "desc"
  });

  const res = await fetchJSON(url);
  const list = Array.isArray(res?.result) ? res.result :: "DX Terminal",
 [];

  return list.map((h) => ({
    address: h.TokenHolderAddress || null,
    balanceRaw: h.TokenHolder    chain: "BaseQuantity || null
  }));
}

// MAIN",
    contract:
async function run() {
  console.log("Starting hardened DX_TERMINAL_CON DX Terminal metrics snapshot...");

  const [
    opTRACT,
    marketensea,
    tokenInfo,
    creation,
    transfers,
    verification,
    topHolders: opensea,
    token
  ] = await Promise.all([
    fetchOpenSeaStats(),
: tokenInfo,
    contractInfo: {
    fetchTokenInfo      ...creation(),
    fetchContract,
      ...verificationCreation(),
    fetch
    },
    onChainTransferStats(),
Activity: transfers    fetchVerification,
    holders: {
Status(),
    fetch      topHolders,
      topHoldersTopHolders()
  ]);

  let topSharePercent = null;

  if (SharePercent: toptokenInfo.totalSupplySharePercent
   Raw && tokenInfo.decimals != null },
    notes: " && topHolders.lengthHardened DX Terminal > 0) {
    const supply = Number(tokenInfo.total metrics snapshotSupplyRaw) / Math (OpenSea + Base.pow(10, tokenInfoScan, IPv4-safe)"
.decimals);
    const  };

  const json topSum = topHolders = JSON.stringify(output, null, 2.reduce((acc, h));
  const hash = => {
      const bal = Number(h.balance sha256(json);

Raw || "0") / Math  fs.writeFileSync.pow(10, tokenInfo(savePath, json);
.decimals);
       console.log("Saved return acc + bal:", savePath);
 ;
    }, 0);
    console.log("SHA if (supply > 0)256:", hash);
}

 {
      topSharerun();