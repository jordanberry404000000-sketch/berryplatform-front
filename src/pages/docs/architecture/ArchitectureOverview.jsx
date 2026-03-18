import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function ArchitectureOverview() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "layers", text: "High-Level Architecture Layers" },
    { id: "subsystems", text: "Core Subsystems" },
    { id: "dataflow", text: "Data Flow Overview" },
    { id: "forensics", text: "Forensic Integrity Model" },
    { id: "governance", text: "Governance & Control Plane" },
    { id: "worlds", text: "Worlds & Powered by Berry™ Systems" },
    { id: "extensibility", text: "Extensibility & Future Growth" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Architecture Overview — Berry Platform™</h1>
      <p>
        Berry Platform™ is designed as a forensic-grade, modular architecture.
        It is not a single app or contract, but a coordinated set of subsystems
        that work together to preserve truth, enforce integrity, and enable
        worlds and applications to be Powered by Berry™.
      </p>

      <h2 id="layers">1. High-Level Architecture Layers</h2>
      <p>At a high level, Berry is composed of the following layers:</p>
      <ul>
        <li>
          <strong>Interaction Layer</strong> — UIs, portals, and tools (Wallyverse,
          forensic viewers, developer docs)
        </li>
        <li>
          <strong>Application Layer</strong> — minting flows, verification flows,
          world logic, governance actions
        </li>
        <li>
          <strong>Forensic Layer</strong> — hashing, chain-of-custody, metadata
          integrity, anomaly detection
        </li>
        <li>
          <strong>Infrastructure Layer</strong> — blockchain, storage, logging,
          monitoring, compute
        </li>
        <li>
          <strong>Governance Layer</strong> — policies, standards, enforcement,
          auditability
        </li>
      </ul>

      <h2 id="subsystems">2. Core Subsystems</h2>
      <p>Berry’s architecture is built around modular subsystems:</p>
      <ul>
        <li>
          <strong>Forensic Processing Engine</strong> — validates events, hashes
          data, verifies custody
        </li>
        <li>
          <strong>Metadata Integrity Layer</strong> — enforces metadata structure
          and hashing standards
        </li>
        <li>
          <strong>NFT Minting Engine</strong> — mints characters, artefacts, and
          world objects
        </li>
        <li>
          <strong>Logging & Monitoring</strong> — records operational and forensic
          events
        </li>
        <li>
          <strong>Governance Enforcement Layer</strong> — applies Berry Standard™
          rules
        </li>
        <li>
          <strong>User Interaction Layer</strong> — portals, viewers, dashboards,
          docs
        </li>
      </ul>

      <h2 id="dataflow">3. Data Flow Overview</h2>
      <p>Typical flow for an asset (e.g., a Wallyverse artefact):</p>
      <ul>
        <li>world or app requests mint via Minting Engine</li>
        <li>metadata is structured and normalized</li>
        <li>metadata is hashed via Metadata Integrity Layer</li>
        <li>mint event is created and logged in chain-of-custody</li>
        <li>asset is written to blockchain / storage</li>
        <li>forensic engine indexes the asset for verification</li>
        <li>viewers and tools read from forensic + storage layers</li>
      </ul>

      <h2 id="forensics">4. Forensic Integrity Model</h2>
      <p>Berry’s forensic model is built on three pillars:</p>
      <ul>
        <li><strong>Hashing Standards</strong> — deterministic, approved algorithms</li>
        <li><strong>Metadata Structure</strong> — strict schema and normalization</li>
        <li><strong>Chain-of-Custody</strong> — event-level, tamper-evident history</li>
      </ul>
      <p>
        These are enforced by the Forensic Processing Engine and validated on
        every read, not just at write time.
      </p>

      <h2 id="governance">5. Governance & Control Plane</h2>
      <p>
        Governance is a first-class part of the architecture, not an afterthought.
        The Governance Enforcement Layer:
      </p>
      <ul>
        <li>applies Berry Standard™ rules to all subsystems</li>
        <li>controls access to minting and verification flows</li>
        <li>defines policies for Powered by Berry™ systems</li>
        <li>supports future ISO 27001 alignment</li>
      </ul>

      <h2 id="worlds">6. Worlds & Powered by Berry™ Systems</h2>
      <p>
        Worlds (like Wallyverse) and external systems integrate with Berry via
        defined APIs and standards:
      </p>
      <ul>
        <li>use Berry’s minting engine</li>
        <li>follow metadata and hashing standards</li>
        <li>implement full chain-of-custody</li>
        <li>expose assets to Berry’s forensic tools</li>
      </ul>
      <p>
        This allows multiple worlds to share a common forensic backbone while
        retaining their own narratives and logic.
      </p>

      <h2 id="extensibility">7. Extensibility & Future Growth</h2>
      <p>Berry’s architecture is designed to grow over time:</p>
      <ul>
        <li>new subsystems can be added without breaking existing ones</li>
        <li>new worlds can plug into the same forensic core</li>
        <li>new APIs and SDKs can expose deeper capabilities</li>
        <li>governance rules can evolve while preserving history</li>
      </ul>
      <p>
        The goal is simple: Berry becomes the institutional backbone for
        verifiable digital truth — across worlds, apps, and ecosystems.
      </p>
    </DocsLayout>
  );
}