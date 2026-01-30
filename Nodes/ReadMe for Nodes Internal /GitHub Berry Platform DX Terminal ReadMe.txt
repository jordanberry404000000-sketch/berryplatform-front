# Berry Platform — DX Terminal

The DX Terminal is a modular monitoring engine designed to track blockchain activity, system health, and movement lineage across the Berry Platform ecosystem.

It is built around a flexible node architecture where each subsystem (metrics, scanner, DEX, certs, heartbeat, orchestrator, movement) runs independently and produces timestamped JSON artefacts.

These artefacts are aggregated into a global system summary that powers dashboards, analytics, and internal tooling.

---

## 🚀 Features

- **Modular Node Architecture**  
  Each node type (metrics, scanner, dex, cert, heartbeat, movement) runs independently.

- **Scheduler + Executor Pipeline**  
  Nodes run on cron-style schedules and produce structured JSON outputs.

- **Cert Lineage System**  
  Every artefact can be hashed and added to an append-only cert ledger.

- **Movement Awareness**  
  The system tracks relic lineage, artefact production, and platform health.

- **Chain-Agnostic**  
  Works with Base, Ethereum, and any EVM-compatible chain.

---

## 📁 Folder Structure

`
Nodes/
│
├── nodeExecutor.js          # Routes execution to correct handler
├── orchestratorNode.js      # Aggregates all node outputs
├── heartbeatNode.js         # Engine/contract/wallet heartbeat
├── metricsNode.js           # RPC latency, block height, gas price
├── scannerNode.js           # Block, event, contract, wallet scanner
├── dexNode.js               # Swap activity, liquidity, price
├── movementNode.js          # Relic lineage + platform health
├── certNodes.js             # Cert hashing +
integrity logic
└── ...
`

---

🧩 Node Types

- Metrics Nodes — RPC health, gas price, block height  
- Scanner Nodes — contract state, wallet balance, event logs  
- DEX Nodes — liquidity, swaps, price ratios  
- Cert Nodes — SHA-256 hashing, integrity checks, ledger updates  
- Heartbeat Nodes — engine, contract, and wallet reachability  
- Orchestrator Nodes — global system summary  
- Movement Nodes — artefact lineage and platform health

🛠 How It Works

1. The registry defines all nodes  
2. The scheduler triggers them on intervals  
3. The executor runs each node  
4. Nodes write JSON artefacts  
5. Cert nodes hash artefacts  
6. Orchestrator builds a global summary  
7. Movement node interprets system health  

---

🧬 Philosophy

The DX Terminal is more than a monitoring tool.  
It is a forensic engine, a movement ledger, and a cultural heartbeat for the Berry Platform.
Every artefact is a timestamp.  
Every cert is a proof.  
Every node is a ritual.

---

📄 License

MIT 