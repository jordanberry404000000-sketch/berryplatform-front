import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function HashingStandards() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of Hashing in Berry" },
    { id: "algorithms", text: "Approved Hashing Algorithms" },
    { id: "metadata", text: "Metadata Hashing Rules" },
    { id: "assets", text: "Asset Hashing Requirements" },
    { id: "reproducibility", text: "Reproducibility Requirements" },
    { id: "custody", text: "Chain-of-Custody Hashing" },
    { id: "anomalies", text: "Anomaly Detection" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Hashing Standards — Berry Platform™</h1>
      <p>
        Hashing is the foundation of forensic integrity within Berry Platform™.
        Every asset, metadata object, event, and chain-of-custody entry is bound
        to a cryptographic fingerprint. These standards ensure that all systems
        Powered by Berry™ maintain verifiable truth.
      </p>

      <h2 id="purpose">1. Purpose of Hashing in Berry</h2>
      <p>Berry uses hashing to guarantee:</p>
      <ul>
        <li>metadata integrity</li>
        <li>tamper-evident records</li>
        <li>reproducible outputs</li>
        <li>chain-of-custody preservation</li>
        <li>forensic verification</li>
      </ul>

      <h2 id="algorithms">2. Approved Hashing Algorithms</h2>
      <p>
        Berry enforces strict hashing standards to ensure long-term
        cryptographic reliability.
      </p>
      <ul>
        <li><strong>SHA-256</strong> — primary hashing algorithm</li>
        <li><strong>SHA-512</strong> — optional for high-integrity systems</li>
        <li><strong>Keccak-256</strong> — used for blockchain compatibility</li>
      </ul>
      <p>
        MD5, SHA-1, and other deprecated algorithms are strictly prohibited.
      </p>

      <h2 id="metadata">3. Metadata Hashing Rules</h2>
      <p>
        All metadata must be hashed before minting and must follow these rules:
      </p>
      <ul>
        <li>metadata must be serialized consistently</li>
        <li>keys must be sorted alphabetically</li>
        <li>whitespace must be normalized</li>
        <li>no dynamic fields may be included</li>
        <li>hash must be stored on-chain or in Berry’s integrity layer</li>
      </ul>

      <h2 id="assets">4. Asset Hashing Requirements</h2>
      <p>All assets minted through Berry must include:</p>
      <ul>
        <li>a metadata hash</li>
        <li>a content hash (if applicable)</li>
        <li>a mint event hash</li>
        <li>a chain-of-custody root hash</li>
      </ul>

      <h2 id="reproducibility">5. Reproducibility Requirements</h2>
      <p>
        Berry enforces reproducibility to ensure that any asset can be
        re-verified at any time.
      </p>
      <ul>
        <li>hashing inputs must be deterministic</li>
        <li>metadata must be reconstructable from source</li>
        <li>no hidden fields or dynamic timestamps</li>
        <li>all transformations must be documented</li>
      </ul>

      <h2 id="custody">6. Chain-of-Custody Hashing</h2>
      <p>
        Every event in an asset’s lifecycle must be hashed and appended to its
        chain-of-custody log.
      </p>
      <ul>
        <li>mint event hash</li>
        <li>transfer event hash</li>
        <li>metadata update hash</li>
        <li>governance action hash</li>
      </ul>
      <p>
        These hashes form a verifiable timeline that cannot be altered without
        detection.
      </p>

      <h2 id="anomalies">7. Anomaly Detection</h2>
      <p>
        Berry automatically flags anomalies when:
      </p>
      <ul>
        <li>a hash does not match its expected value</li>
        <li>metadata drift is detected</li>
        <li>chain-of-custody entries are missing</li>
        <li>non-approved algorithms are used</li>
      </ul>

      <h2 id="examples">8. Examples</h2>
      <p>Example metadata hashing flow:</p>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "16px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
{`{
  "name": "Wallyverse Character",
  "origin": "Genesis Zone",
  "rarity": "Epic"
}

→ Normalize JSON
→ Sort keys
→ Serialize
→ SHA-256 hash

Result:
0xABC123FAKEHASH987654321
`}
      </pre>

      <p>
        All Powered by Berry™ systems must follow these hashing standards to
        maintain forensic integrity and ensure verifiable truth.
      </p>
    </DocsLayout>
  );
}