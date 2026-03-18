import React from "react";

export default function DeveloperDocs() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>DEVELOPER DOCUMENTATION — BERRY PLATFORM™</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
Welcome to the Berry Platform™ Developer Documentation Portal.

This is the technical gateway into Berry’s forensic-grade architecture.  
Here, developers, builders, auditors, and ecosystem partners can learn how to integrate with Berry, build Powered by Berry™ systems, and understand the internal mechanics that make Berry a platform of truth.

This portal is designed to be:
- clear
- structured
- transparent
- institutional
- developer-friendly

Berry is not a black box.  
Berry is an inspectable system.

---

1. Getting Started

Start here if you're new to Berry.

- What is Berry Platform™?
- Core principles & the Berry Standard™
- Architecture overview
- Subsystem map
- Powered by Berry™ ecosystem

This section gives you the conceptual foundation needed to understand how Berry works.

---

2. Subsystems (Technical Deep Dives)

Each subsystem is documented with:
- purpose
- responsibilities
- data flows
- cryptographic guarantees
- chain-of-custody role
- integration points

Subsystems include:
- Forensic Processing Engine
- Metadata Integrity Layer
- NFT Minting Engine
- Logging & Monitoring
- Governance Enforcement Layer
- User Interaction Layer

These documents explain Berry’s internal machinery.

---

3. APIs & SDKs

Learn how to interact with Berry programmatically.

Includes:
- REST API endpoints
- Authentication
- Minting flows
- Metadata retrieval
- Forensic verification
- Chain-of-custody reconstruction
- Error codes
- Rate limits

SDKs:
- JavaScript SDK (coming soon)
- Node utilities
- CLI tools

This is where builders start building.

---

4. Powered by Berry™ Integration

For creators, developers, and world-builders.

Learn how to:
- build a Powered by Berry™ world
- mint characters
- mint artefacts
- bind metadata
- verify assets
- maintain forensic integrity
- follow governance requirements

This is the blueprint for building your own Wallyverse-style universe.

---

5. Forensic Standards & Best Practices

Berry enforces strict forensic rules.

This section covers:
- hashing standards
- metadata structure
- reproducibility requirements
- evidence preservation
- chain-of-custody expectations
- anomaly detection
- audit readiness

This is where Berry’s institutional discipline becomes developer guidance.

---

6. Tutorials & Examples

Hands-on guides for developers:
- Mint your first NFT
- Verify an NFT’s metadata
- Reconstruct chain-of-custody
- Build a simple Powered by Berry™ app
- Integrate the forensic engine
- Create a world with character minting

These examples accelerate onboarding.

---

7. Roadmap for Developers

A forward-looking view of:
- upcoming APIs
- SDK releases
- new subsystems
- future integrations
- multi-world support
- developer tools

Berry grows — and developers grow with it.

---

8. Governance & Compliance

Documentation for:
- governance structure
- access control
- audit requirements
- transparency commitments
- ISO alignment
- Powered by Berry™ certification

This section ensures developers build responsibly.

---

The Developer Docs Portal is a living system.

As Berry evolves, this portal will expand with:
- new subsystems
- new APIs
- new worlds
- new tools
- new standards

Welcome to the Berry developer ecosystem.  
Build with integrity.  
Build with evidence.  
Build with Berry™.
        `}
      </div>
    </div>
  );
}