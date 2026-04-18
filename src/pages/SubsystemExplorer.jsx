import React from "react";

export default function SubsystemExplorer() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>BERRY PLATFORM™ — SUBSYSTEM EXPLORER</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
BERRY PLATFORM™ — SUBSYSTEM EXPLORER

A Living Map of the Berry Architecture

---

Subsystems

1. Data Ingestion Subsystem
Purpose: Collect and normalize blockchain data.
Forensic Role: Establishes chain‑of‑custody.

2. Forensic Processing Engine
Purpose: Transform raw data into evidence.
Forensic Role: Ensures reproducibility.

3. Metadata Integrity Layer
Purpose: Secure and validate metadata.
Forensic Role: Guarantees immutability.

4. NFT Minting & Evidence Binding
Purpose: Mint NFTs and bind evidence.
Forensic Role: Verifiable chain‑of‑custody.

5. Logging & Monitoring
Purpose: Capture every action.
Forensic Role: Immutable audit trail.

6. Governance Enforcement Layer
Purpose: Enforce policies and controls.
Forensic Role: Prevent unauthorized actions.

7. User Interaction Layer
Purpose: Dashboards, minting, forensic views.
Forensic Role: Verified data only.

---

Closed Loop
Every subsystem logs, hashes, validates, and preserves evidence.
        `}
      </div>
    </div>
  );
}