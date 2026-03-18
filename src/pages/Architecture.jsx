import React from "react";

export default function Architecture() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>BERRY PLATFORM™ — ARCHITECTURE SUMMARY</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
BERRY PLATFORM™ — ARCHITECTURE SUMMARY

A Forensic‑Grade System
Berry is built on modular, auditable subsystems designed to preserve evidential integrity.

---

Architectural Principles
- Modularity
- Determinism
- Chain‑of‑Custody Integrity
- Zero‑Trust Segmentation

---

Core Subsystems
1. Data Ingestion
2. Forensic Processing Engine
3. Metadata Integrity Layer
4. NFT Minting & Evidence Binding
5. Logging & Monitoring
6. Governance Enforcement
7. User Interaction Layer

---

Closed, Auditable Loop
Data enters → Evidence created → Metadata secured → NFTs minted → Logs captured → Governance enforced → Users interact with verified outputs
        `}
      </div>
    </div>
  );
}