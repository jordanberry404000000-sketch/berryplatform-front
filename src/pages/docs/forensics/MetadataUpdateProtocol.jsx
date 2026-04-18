import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function MetadataUpdateProtocol() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of the Update Protocol" },
    { id: "principles", text: "Core Principles" },
    { id: "whenAllowed", text: "When Metadata Updates Are Allowed" },
    { id: "process", text: "Update Process" },
    { id: "hashing", text: "Re-Hashing Rules" },
    { id: "custody", text: "Chain-of-Custody Requirements" },
    { id: "governance", text: "Governance Enforcement" },
    { id: "validation", text: "Validation & Verification" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Metadata Update Protocol — Berry Platform™</h1>
      <p>
        Metadata in Berry Platform™ is immutable by default. However, certain
        worlds and systems require controlled evolution of metadata over time.
        The Metadata Update Protocol defines how metadata may change while
        preserving forensic integrity, reproducibility, and full chain-of-custody.
      </p>

      <h2 id="purpose">1. Purpose of the Update Protocol</h2>
      <p>
        The protocol ensures that all metadata updates are:
      </p>
      <ul>
        <li>authorized</li>
        <li>deterministic</li>
        <li>fully logged</li>
        <li>cryptographically bound</li>
        <li>verifiable at any time</li>
      </ul>

      <h2 id="principles">2. Core Principles</h2>
      <p>Metadata updates must follow these principles:</p>
      <ul>
        <li><strong>Immutability by Default</strong> — updates are exceptions, not the norm</li>
        <li><strong>Deterministic Structure</strong> — updated metadata must follow the same schema</li>
        <li><strong>Integrity Preservation</strong> — every update generates a new metadata hash</li>
        <li><strong>Full Traceability</strong> — updates must be logged in chain-of-custody</li>
        <li><strong>Governance Enforcement</strong> — updates require explicit permissions</li>
      </ul>

      <h2 id="whenAllowed">3. When Metadata Updates Are Allowed</h2>
      <p>Metadata updates are only allowed when:</p>
      <ul>
        <li>the world explicitly supports metadata evolution</li>
        <li>the actor has <code>metadata:update</code> permission</li>
        <li>the update does not break schema or hashing rules</li>
        <li>the update does not alter historical truth</li>
      </ul>

      <p>Examples of allowed updates:</p>
      <ul>
        <li>adding new attributes</li>
        <li>updating lore or narrative fields</li>
        <li>correcting factual errors</li>
        <li>adding versioned metadata extensions</li>
      </ul>

      <h2 id="process">4. Update Process</h2>
      <p>The update process follows these steps:</p>
      <ol>
        <li>Client submits updated metadata object</li>
        <li>Metadata Integrity Layer normalizes and validates structure</li>
        <li>Governance Layer checks update permissions</li>
        <li>New metadata hash is computed</li>
        <li>Chain-of-custody logs a <strong>Metadata Update</strong> event</li>
        <li>Updated metadata is stored and indexed</li>
      </ol>

      <h2 id="hashing">5. Re-Hashing Rules</h2>
      <p>Updated metadata must be re-hashed using Berry’s hashing standards:</p>
      <ul>
        <li>keys sorted alphabetically</li>
        <li>no dynamic fields</li>
        <li>consistent serialization</li>
        <li>SHA-256 or SHA-512 (depending on world policy)</li>
      </ul>

      <p>
        The new hash becomes the authoritative fingerprint for the updated
        metadata.
      </p>

      <h2 id="custody">6. Chain-of-Custody Requirements</h2>
      <p>Every metadata update must create a custody event containing:</p>
      <ul>
        <li>event type: <strong>metadata_update</strong></li>
        <li>timestamp (UTC)</li>
        <li>actor</li>
        <li>previous metadata hash</li>
        <li>new metadata hash</li>
        <li>event hash</li>
      </ul>

      <p>
        This ensures that metadata evolution is fully traceable and tamper-evident.
      </p>

      <h2 id="governance">7. Governance Enforcement</h2>
      <p>
        The Governance Enforcement Layer validates all metadata updates before
        they are applied. It checks:
      </p>
      <ul>
        <li>actor permissions</li>
        <li>world-level policies</li>
        <li>schema compliance</li>
        <li>hashing rules</li>
        <li>custody completeness</li>
      </ul>

      <h2 id="validation">8. Validation & Verification</h2>
      <p>After an update, the Forensic Engine verifies:</p>
      <ul>
        <li>metadata hash matches expected value</li>
        <li>custody chain is intact</li>
        <li>no anomalies were introduced</li>
        <li>previous metadata versions remain accessible</li>
      </ul>

      <h2 id="examples">9. Examples</h2>
      <pre style={codeStyle}>
{`Example Update Request:

POST /metadata/update
Authorization: Bearer YOUR_API_KEY

{
  "assetId": "genesisworld:character:0001",
  "metadata": {
    "name": "Astra",
    "type": "character",
    "origin": "GenesisWorld",
    "attributes": [
      { "trait": "rarity", "value": "Rare" },
      { "trait": "alignment", "value": "Good" }   ← updated
    ],
    "metadataVersion": "1.0.1"
  }
}

Result:
- New metadata hash generated
- Metadata Update custody event created
- Asset remains fully verifiable`}
      </pre>

      <p>
        The Metadata Update Protocol ensures that worlds can evolve while
        preserving Berry’s forensic guarantees.
      </p>
    </DocsLayout>
  );
}

const codeStyle = {
  background: "#f4f4f4",
  padding: "16px",
  borderRadius: "6px",
  fontSize: "14px",
  overflowX: "auto",
};