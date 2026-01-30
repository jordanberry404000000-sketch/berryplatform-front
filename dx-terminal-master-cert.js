const https = require("https");
const fs = require("fs");
const path = require("path");

// ---------- CONFIG ----------

const OPENSEA_URL =
  "https://api.opensea.io/api/v2/collections/dx-terminal/stats";

const BASESCAN_API_KEY = "IMFKJXJSPUYPQSM7RQSDZWZAIZCZ1R76JC";
const BASESCAN_BASE_URL = "https://api.basescan.org/api";

const DX_TERMINAL_NFT_CONTRACT = "0x41dc69132cce31fcbf6755c84538ca268520246f";

const DX_TERMINAL_TREASURY_COUNTERPARTY =
  "0xf8f5f4EB7C3d1b7A150109B2d9B0888fEc9f11E2";

const SESSION_WALLET = "0xEb8447eeeEDaE9715F0c7600983BDa8e335fB256";
const ENS_NAME = "berry1984second.cb.id";
const OPERATOR_NAME = "Bez";

const EXEMPLAR_TOKEN_ID = "27770";
const EXEMPLAR_NAME = "EDIReject";

// ---------- HELPERS ----------

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

function basescanUrl(params) {
  const query = new URLSearchParams({
    ...params,
    apikey: BASESCAN_API_KEY
  });
  return `${BASESCAN_BASE_URL}?${query.toString()}`;
}
/* ---------- OPENSEA (MARKET) ---------- */

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

/* ---------- BASESCAN (ON-CHAIN NFT + TREASURY FLOW) ---------- */

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

async function fetchTotalSupply() {
  console.log("Fetching NFT total supply via BaseScan proxy...");
  const url = basescanUrl({
    module: "proxy",
    action: "eth_call",
    to: DX_TERMINAL_NFT_CONTRACT,
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

async function fetchTreasuryFlowSample() {
  console.log("Fetching internal txs for treasury flow sample...");
  const url = basescanUrl({
    module: "account",
    action: "txlistinternal",
    address: DX_TERMINAL_NFT_CONTRACT,
    page: "1",
    offset: "50",
    sort: "asc"
  });

  try {
    const res = await fetchJSON(url);
    const list = Array.isArray(res.result) ? res.result : [];

    const filtered = list.filter((tx) => {
      const from = (tx.from || "").toLowerCase();
      const to = (tx.to || "").toLowerCase();
      return (
        from === DX_TERMINAL_NFT_CONTRACT.toLowerCase() &&
        to === DX_TERMINAL_TREASURY_COUNTERPARTY.toLowerCase()
      );
    });

    const sample = filtered.slice(0, 10).map((tx) => {
      const valueWei = tx.value ? BigInt(tx.value) : 0n;
      const valueEth = Number(valueWei) / 1e18;
      const ts = tx.timeStamp ? Number(tx.timeStamp) : null;

      return {
        txHash: tx.hash || tx.transactionHash || null,
        blockNumber: tx.blockNumber ? Number(tx.blockNumber) : null,
        timeStamp: ts,
        from: tx.from || null,
        to: tx.to || null,
        amountEth: valueEth
      };
    });

    return {
      treasuryAddress: DX_TERMINAL_TREASURY_COUNTERPARTY,
      mintRevenueFlow: "contract -> treasury_counterparty",
      internalTxSample: sample
    };
  } catch (err) {
    console.error("BaseScan txlistinternal error:", err.message);
    return {
      treasuryAddress: DX_TERMINAL_TREASURY_COUNTERPARTY,
      mintRevenueFlow: "contract -> treasury_counterparty",
      internalTxSample: []
    };
  }
}
/* ---------- MASTER CERT BUILD ---------- */

async function run() {
  try {
    console.log("Starting DX Terminal MASTER CERT snapshot...");

    const [
      opensea,
      creation,
      verification,
      transfers,
      supply,
      treasuryFlow
    ] = await Promise.all([
      fetchOpenSeaStats(),
      fetchContractCreation(),
      fetchVerificationStatus(),
      fetchNftTransferSample(),
      fetchTotalSupply(),
      fetchTreasuryFlowSample()
    ]);

    const now = new Date().toISOString();
    const filename = `DX_TERMINAL_MASTER_CERT_${now.replace(/[:.]/g, "-")}.json`;

    const masterCert = {
      certId: "CERT_DX_TERMINAL_MASTER_2025Q4",
      type: "master-collection",
      operator: OPERATOR_NAME,
      chain: "Base",
      collection: {
        name: "DX Terminal",
        slug: "dx-terminal",
        creator: "DXTERMINAL",
        verified: verification.verified === true,
        category: "Gaming",
        contract: DX_TERMINAL_NFT_CONTRACT,
        items: opensea.items,
        totalSupply: supply.totalSupply
      },
      market: {
        floorPriceEth: opensea.floorPriceEth,
        topOfferEth: opensea.topOfferEth,
        volume24hEth: opensea.volume24hEth,
        totalVolumeEth: opensea.totalVolumeEth,
        oneDayFloorChangePercent: -5,
        observationTimestamp: now
      },
      session: {
        userHandle: "Berry1984",
        wallet: SESSION_WALLET,
        ens: ENS_NAME,
        context:
          "OpenSea / Base DX Terminal viewing context for Berry1984 identity and session wallet"
      },
      onChain: {
        contract: DX_TERMINAL_NFT_CONTRACT,
        treasuryCounterparty: treasuryFlow.treasuryAddress,
        treasuryOwnership: "unknown_third_party",
        mintRevenueFlow: treasuryFlow.mintRevenueFlow,
        internalTxSample: treasuryFlow.internalTxSample,
        contractInfo: {
          creationTx: creation.creationTx,
          createdAt: creation.createdAt,
          ageDays: creation.ageDays,
          verified: verification.verified,
          contractName: verification.contractName,
          compilerVersion: verification.compilerVersion
        },
        nftActivity: {
          sampleTransferCount: transfers.sampleCount,
          approxDistinctHoldersFromSample:
            transfers.approxDistinctHoldersFromSample,
          sampleTransfers: transfers.sampleTransfers
        },
        notes:
          "On-chain data describes DX Terminal NFT contract behavior and its counterparty treasury flows; no custody claim over treasury."
      },
      itemExemplar: {
        certId: "CERT_DX_ITEM_EDIREJECT_27770",
        tokenId: EXEMPLAR_TOKEN_ID,
        name: EXEMPLAR_NAME,
        floorPriceEth: opensea.floorPriceEth,
        lastSaleEth: opensea.floorPriceEth,
        status: "tradeable",
        anchors: {
          marketplace: "OpenSea",
          screenshotRef:
            "OPENSEA_DX_TERMINAL_EDIREJECT_27770_2025-12-30"
        }
      },
      slotMap: {
        DX_TERMINAL_SESSION: SESSION_WALLET,
        DX_TERMINAL_COLLECTION: "DX_TERMINAL_BASE",
        ETH_PRIMARY: "0x76837828D0Fff13998B2e28E74D191f96781220e",
        RABBY_1: "0x74df2c...a63a24"
      },
      sources: {
        nodeSnapshot: filename,
        collectionCert: "CERT_DX_TERMINAL_COLLECTION_2025Q4",
        identityCert: "CERT_DX_TERMINAL_IDENTITY_LINK",
        itemCert: "CERT_DX_ITEM_EDIREJECT_27770"
      },
      status: "active",
      notes:
        "Unified DX Terminal ledger object combining market data, on-chain flows (with third-party treasury), identity context, and exemplar item."
    };

    const savePath = path.join(
      "/mnt/chromeos/removable/Berry02",
      filename
    );

    fs.writeFileSync(savePath, JSON.stringify(masterCert, null, 2));

    console.log("Saved MASTER CERT:", savePath);
  } catch (err) {
    console.error("Fatal error:", err.message);
  }
}

run();
