async function loadJSON(path) {
    try {
        const response = await fetch(path);
        return await response.json();
    } catch (e) {
        return { error: "Unable to load " + path };
    }
}

async function updateDashboard() {
    // 1) NODE STATUS
    const nodeStatus = await loadJSON("BERRY_PLATFORM_NODE_STATUS.json");
    document.getElementById("node-status").innerHTML = `
        <div class="panel">
            <h2>Node Status</h2>
            <pre>${JSON.stringify(nodeStatus, null, 2)}</pre>
        </div>
    `;

    // 2) CONTRACT STATE
    const contractFiles = await loadJSON("DX_TERMINAL_CONTRACT_STATE_2026-01-29T22-46-26-355Z.json");
    document.getElementById("contract-state").innerHTML = `
        <div class="panel">
            <h2>Contract State</h2>
            <pre>${JSON.stringify(contractFiles, null, 2)}</pre>
        </div>
    `;

    // 3) WALLET HEALTH
    const walletFiles = await loadJSON("DX_TERMINAL_WALLET_HEALTH_2026-01-29T22-46-22-279Z.json");
    document.getElementById("wallet-health").innerHTML = `
        <div class="panel">
            <h2>Wallet Health</h2>
            <pre>${JSON.stringify(walletFiles, null, 2)}</pre>
        </div>
    `;

    // 4) DEX ACTIVITY
    const dexFiles = await loadJSON("DX_TERMINAL_DEX_ACTIVITY_2026-01-29T22-51-43-050Z.json");
    document.getElementById("dex-activity").innerHTML = `
        <div class="panel">
            <h2>DEX Activity</h2>
            <pre>${JSON.stringify(dexFiles, null, 2)}</pre>
        </div>
    `;
}

updateDashboard();
setInterval(updateDashboard, 10000);