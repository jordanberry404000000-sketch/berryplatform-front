import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function SubsystemMap() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "overview", text: "Subsystem Overview" },
    { id: "forensic", text: "Forensic Processing Engine" },
    { id: "metadata", text: "Metadata Integrity Layer" },
    { id: "minting", text: "NFT Minting Engine" },
    { id: "logging", text: "Logging & Monitoring" },
    { id: "governance", text: "Governance Enforcement Layer" },
    { id: "interaction", text: "User Interaction Layer" },
    { id: "relationships", text: "Subsystem Relationships" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Subsystem Map — Berry Platform™</h1>
      <p>
        This document provides a structured map of the core subsystems that make
        up Berry Platform™. Each subsystem has a clear responsibility, defined
        interfaces, and a role in Berry’s forensic integrity model.
      </p>

      <h2 id="overview">1. Subsystem Overview</h2>
      <p>Berry’s core subsystems are:</p>
      <ul>
        <li>Forensic Processing Engine</li>
        <li>Metadata Integrity Layer</li>
        <li>NFT Minting Engine</li>
        <li>Logging & Monitoring</li>
        <li>Governance Enforcement Layer</li>
        <li>User Interaction Layer</li>
      </ul>

      <h2 id="forensic">2. Forensic Processing Engine</h2>
      <p>
        The Forensic Processing Engine is the core truth engine of Berry. It:
      </p>
      <ul>
        <li>validates hashes and metadata integrity</li>
        <li>reconstructs chain-of-custody</li>
        <li>performs anomaly detection</li>
        <li>serves verification requests from tools and APIs</li>
      </ul>

      <h2 id="metadata">3. Metadata Integrity Layer</h2>
      <p>
        The Metadata Integrity Layer enforces Berry’s metadata and hashing
        standards. It:
      </p>
      <ul>
        <li>normalizes and serializes metadata</li>
        <li>computes and stores metadata hashes</li>
        <li>prevents metadata drift</li>
        <li>provides metadata integrity proofs</li>
      </ul>

      <h2 id="minting">4. NFT Minting Engine</h2>
      <p>
        The NFT Minting Engine is responsible for creating on-chain assets. It:
      </p>
      <ul>
        <li>mints characters, artefacts, and world objects</li>
        <li>binds assets to metadata hashes</li>
        <li>emits mint events into chain-of-custody</li>
        <li>integrates with external worlds and apps</li>
      </ul>

      <h2 id="logging">5. Logging & Monitoring</h2>
      <p>
        The Logging & Monitoring subsystem provides operational and forensic
        observability. It:
      </p>
      <ul>
        <li>records system events and errors</li>
        <li>tracks subsystem health and status</li>
        <li>feeds the System Status dashboard</li>
        <li>supports audit and incident review</li>
      </ul>

      <h2 id="governance">6. Governance Enforcement Layer</h2>
      <p>
        The Governance Enforcement Layer applies the Berry Standard™ across all
        subsystems. It:
      </p>
      <ul>
        <li>controls access to minting and verification</li>
        <li>enforces forensic and metadata standards</li>
        <li>applies policies for Powered by Berry™ systems</li>
        <li>supports future compliance frameworks (e.g., ISO 27001)</li>
      </ul>

      <h2 id="interaction">7. User Interaction Layer</h2>
      <p>
        The User Interaction Layer is how humans experience Berry. It includes:
      </p>
      <ul>
        <li>Wallyverse portals and minting UIs</li>
        <li>NFT Forensic Viewer and Artefact Viewer</li>
        <li>System Status dashboard</li>
        <li>Developer Docs and governance pages</li>
      </ul>

      <h2 id="relationships">8. Subsystem Relationships</h2>
      <p>At a high level:</p>
      <ul>
        <li>User Interaction Layer calls Minting Engine and Forensic Engine</li>
        <li>Minting Engine relies on Metadata Integrity Layer</li>
        <li>All subsystems emit events to Logging & Monitoring</li>
        <li>Governance Enforcement Layer sits across all subsystems</li>
        <li>Forensic Engine reads from custody logs and metadata store</li>
      </ul>
      <p>
        Together, these subsystems form a coherent, forensic-grade platform for
        verifiable digital truth.
      </p>
    </DocsLayout>
  );
}