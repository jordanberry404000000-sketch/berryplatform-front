import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function ChainOfCustody() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "definition", text: "What is Chain-of-Custody?" },
    { id: "principles", text: "Core Principles" },
    { id: "events", text: "Custody Events" },
    { id: "structure", text: "Custody Record Structure" },
    { id: "hashing", text: "Hashing & Integrity" },
    { id: "timeline", text: "Custody Timeline Rules" },
    { id: "verification", text: "Verification Process" },
    { id: "anomalies", text: "Anomaly Detection" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Chain-of-Custody — Berry Platform™</h1>
      <p>
        Chain-of-custody is the foundation of Berry’s forensic truth model. It
        ensures that every asset, event, and interaction can be traced,
        verified, and reproduced without ambiguity. This document defines the
        standards required for all systems Powered by Berry™.
      </p>

      <h2 id="definition">1. What is Chain-of-Custody?</h2>
      <p>
        Chain-of-custody is a chronological, tamper-evident record of every
        event in an asset’s lifecycle. It provides:
      </p>
      <ul>
        <li>verifiable provenance</li>
        <li>event-level accountability</li>
        <li>cryptographic integrity</li>
        <li>forensic reproducibility</li>
      </ul>

      <h2 id="principles">2. Core Principles</h2>
      <p>Berry enforces the following principles:</p>
      <ul>
        <li><strong>Completeness</strong> — no missing events</li>
        <li><strong>Order</strong> — events must be sequential</li>
        <li><strong>Integrity</strong> — each event must be hashed</li>
        <li><strong>Reproducibility</strong> — custody must be reconstructable</li>
        <li><strong>Transparency</strong> — custody must be inspectable</li>
      </ul>

      <h2 id="events">3. Custody Events</h2>
      <p>Every asset must track the following event types:</p>
      <ul>
        <li><strong>Mint Event</strong> — creation of the asset</li>
        <li><strong>Transfer Event</strong> — ownership changes</li>
        <li><strong>Metadata Update</strong> — integrity-bound changes</li>
        <li><strong>Interaction Event</strong> — world or system interactions</li>
        <li><strong>Governance Action</strong> — administrative or policy actions</li>
      </ul>

      <h2 id="structure">4. Custody Record Structure</h2>
      <p>Each custody event must include:</p>
      <ul>
        <li>event type</li>
        <li>timestamp (UTC)</li>
        <li>actor (wallet, system, or governance)</li>
        <li>event payload</li>
        <li>event hash</li>
        <li>previous event hash</li>
      </ul>
      <p>
        These fields form a cryptographic chain similar to a blockchain, but
        optimized for forensic inspection.
      </p>

      <h2 id="hashing">5. Hashing & Integrity</h2>
      <p>
        Each event must be hashed using Berry’s approved hashing standards. The
        event hash must include:
      </p>
      <ul>
        <li>normalized event payload</li>
        <li>timestamp</li>
        <li>actor</li>
        <li>previous event hash</li>
      </ul>
      <p>
        This ensures that any modification to the event or its order is
        immediately detectable.
      </p>

      <h2 id="timeline">6. Custody Timeline Rules</h2>
      <p>The custody timeline must follow these rules:</p>
      <ul>
        <li>events must be strictly sequential</li>
        <li>no gaps or missing entries</li>
        <li>no retroactive insertion</li>
        <li>no deletion or overwriting</li>
        <li>timestamps must be monotonic</li>
      </ul>

      <h2 id="verification">7. Verification Process</h2>
      <p>
        Berry’s forensic engine verifies chain-of-custody using the following
        steps:
      </p>
      <ul>
        <li>reconstruct event sequence</li>
        <li>validate event hashes</li>
        <li>validate previous-hash linkage</li>
        <li>validate metadata integrity</li>
        <li>validate actor signatures</li>
        <li>detect anomalies</li>
      </ul>

      <h2 id="anomalies">8. Anomaly Detection</h2>
      <p>Berry flags anomalies when:</p>
      <ul>
        <li>an event hash does not match its expected value</li>
        <li>a previous-hash link is broken</li>
        <li>timestamps are out of order</li>
        <li>metadata drift is detected</li>
        <li>an event type is missing</li>
      </ul>

      <h2 id="examples">9. Examples</h2>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "16px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
{`Mint Event:
{
  "type": "mint",
  "timestamp": "2025-11-04T14:22:00Z",
  "actor": "0x1234...abcd",
  "payload": {
    "metadataHash": "0xFAKE123HASH"
  },
  "prevHash": null,
  "eventHash": "0xMINT_EVENT_HASH"
}

Transfer Event:
{
  "type": "transfer",
  "timestamp": "2025-11-05T09:10:00Z",
  "actor": "0x9876...4321",
  "payload": {
    "from": "0x1234...abcd",
    "to": "0x9876...4321"
  },
  "prevHash": "0xMINT_EVENT_HASH",
  "eventHash": "0xTRANSFER_EVENT_HASH"
}
`}
      </pre>

      <p>
        All Powered by Berry™ systems must implement full chain-of-custody to
        maintain forensic integrity and verifiable truth.
      </p>
    </DocsLayout>
  );
}