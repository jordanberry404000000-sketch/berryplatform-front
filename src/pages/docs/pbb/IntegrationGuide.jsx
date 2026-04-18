import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function IntegrationGuide() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "requirements", text: "Requirements for Integration" },
    { id: "architecture", text: "Understanding the Architecture" },
    { id: "minting", text: "Minting Characters & Artefacts" },
    { id: "metadata", text: "Metadata Binding & Integrity" },
    { id: "custody", text: "Chain-of-Custody Integration" },
    { id: "verification", text: "Verification & Forensics" },
    { id: "governance", text: "Governance Requirements" },
    { id: "launch", text: "Preparing for Launch" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Powered by Berry™ Integration Guide</h1>
      <p>
        This guide explains how to integrate your world, application, or system
        with Berry Platform™. The Powered by Berry™ designation is not a badge —
        it is a commitment to forensic integrity, cryptographic truth, and
        transparent governance.
      </p>

      <h2 id="requirements">1. Requirements for Integration</h2>
      <p>
        Any system that wishes to be Powered by Berry™ must meet the following
        requirements:
      </p>
      <ul>
        <li>Use Berry’s minting engine for all on-chain assets</li>
        <li>Bind metadata using Berry’s integrity layer</li>
        <li>Preserve chain-of-custody for all interactions</li>
        <li>Expose transparent logs for auditability</li>
        <li>Follow the Berry Standard™ for reproducibility</li>
      </ul>

      <h2 id="architecture">2. Understanding the Architecture</h2>
      <p>
        Berry provides a modular architecture designed for forensic-grade
        systems. Your integration will interact with:
      </p>
      <ul>
        <li><strong>Forensic Processing Engine</strong> — validates all events</li>
        <li><strong>Metadata Integrity Layer</strong> — binds metadata hashes</li>
        <li><strong>NFT Minting Engine</strong> — creates characters & artefacts</li>
        <li><strong>Logging & Monitoring</strong> — records all actions</li>
        <li><strong>Governance Enforcement Layer</strong> — ensures compliance</li>
      </ul>

      <h2 id="minting">3. Minting Characters & Artefacts</h2>
      <p>
        All assets in a Powered by Berry™ system must be minted through Berry’s
        minting engine. This ensures:
      </p>
      <ul>
        <li>deterministic creation</li>
        <li>cryptographic metadata binding</li>
        <li>verifiable provenance</li>
        <li>tamper-evident history</li>
      </ul>
      <p>
        You can mint:
      </p>
      <ul>
        <li>Characters (identity-based assets)</li>
        <li>Artefacts (lore or functional items)</li>
        <li>World objects (environmental or systemic assets)</li>
      </ul>

      <h2 id="metadata">4. Metadata Binding & Integrity</h2>
      <p>
        Metadata must be bound using Berry’s integrity layer. This ensures:
      </p>
      <ul>
        <li>metadata cannot drift</li>
        <li>all updates are logged</li>
        <li>hashes match the original record</li>
        <li>forensic verification is possible</li>
      </ul>

      <h2 id="custody">5. Chain-of-Custody Integration</h2>
      <p>
        Every Powered by Berry™ system must maintain a complete chain-of-custody
        for all assets. This includes:
      </p>
      <ul>
        <li>mint events</li>
        <li>ownership transfers</li>
        <li>metadata updates</li>
        <li>interaction logs</li>
        <li>governance actions</li>
      </ul>

      <h2 id="verification">6. Verification & Forensics</h2>
      <p>
        All assets must be verifiable through Berry’s forensic engine. This
        allows:
      </p>
      <ul>
        <li>metadata integrity checks</li>
        <li>ownership lineage reconstruction</li>
        <li>event history inspection</li>
        <li>anomaly detection</li>
      </ul>

      <h2 id="governance">7. Governance Requirements</h2>
      <p>
        Powered by Berry™ systems must follow the Berry Standard™:
      </p>
      <ul>
        <li>transparency</li>
        <li>reproducibility</li>
        <li>evidence-first design</li>
        <li>zero-trust architecture</li>
        <li>audit readiness</li>
      </ul>

      <h2 id="launch">8. Preparing for Launch</h2>
      <p>
        Before launching your Powered by Berry™ system, ensure:
      </p>
      <ul>
        <li>all assets are minted through Berry</li>
        <li>metadata is integrity-bound</li>
        <li>chain-of-custody is complete</li>
        <li>forensic verification passes</li>
        <li>governance documentation is published</li>
      </ul>

      <p>
        Once approved, your system will be listed in the Powered by Berry™
        ecosystem and gain access to future integrations, tools, and
        institutional support.
      </p>
    </DocsLayout>
  );
}