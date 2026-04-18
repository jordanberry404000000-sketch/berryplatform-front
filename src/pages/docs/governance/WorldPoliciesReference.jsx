import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function WorldPoliciesReference() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of World Policies" },
    { id: "policyTypes", text: "Types of Policies" },
    { id: "metadata", text: "Metadata Policies" },
    { id: "hashing", text: "Hashing Policies" },
    { id: "custody", text: "Chain-of-Custody Policies" },
    { id: "minting", text: "Minting Policies" },
    { id: "governance", text: "Governance Policies" },
    { id: "registration", text: "World Registration Requirements" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">World Policies Reference — Berry Platform™</h1>
      <p>
        World Policies define the rules, constraints, and standards that govern
        how a Powered by Berry™ world operates. These policies ensure that every
        world maintains forensic integrity, follows platform standards, and
        integrates cleanly with Berry’s minting, metadata, and custody systems.
      </p>

      <h2 id="purpose">1. Purpose of World Policies</h2>
      <p>World Policies exist to:</p>
      <ul>
        <li>enforce consistent metadata structure</li>
        <li>define allowed hashing algorithms</li>
        <li>control minting behavior</li>
        <li>govern metadata updates</li>
        <li>ensure custody completeness</li>
        <li>provide world-level governance</li>
      </ul>

      <h2 id="policyTypes">2. Types of Policies</h2>
      <p>Each world may define the following policy categories:</p>
      <ul>
        <li><strong>Metadata Policies</strong></li>
        <li><strong>Hashing Policies</strong></li>
        <li><strong>Custody Policies</strong></li>
        <li><strong>Minting Policies</strong></li>
        <li><strong>Governance Policies</strong></li>
      </ul>

      <h2 id="metadata">3. Metadata Policies</h2>
      <p>Metadata policies define how metadata must be structured and updated.</p>
      <ul>
        <li><strong>metadataVersion</strong> — required schema version</li>
        <li><strong>allowMetadataUpdates</strong> — whether updates are allowed</li>
        <li><strong>requiredAttributes</strong> — traits that must exist</li>
        <li><strong>allowedTypes</strong> — character, artefact, worldObject, etc.</li>
      </ul>

      <h2 id="hashing">4. Hashing Policies</h2>
      <p>Hashing policies define how metadata is fingerprinted.</p>
      <ul>
        <li><strong>hashAlgorithm</strong> — SHA-256 or SHA-512</li>
        <li><strong>normalizeKeys</strong> — enforce alphabetical sorting</li>
        <li><strong>strictSerialization</strong> — enforce deterministic JSON</li>
      </ul>

      <h2 id="custody">5. Chain-of-Custody Policies</h2>
      <p>Custody policies define how events must be logged.</p>
      <ul>
        <li><strong>requireCustodyEvents</strong> — enforce event logging</li>
        <li><strong>allowedEventTypes</strong> — mint, transfer, metadata_update</li>
        <li><strong>timestampPrecision</strong> — required timestamp format</li>
      </ul>

      <h2 id="minting">6. Minting Policies</h2>
      <p>Minting policies define how assets may be created.</p>
      <ul>
        <li><strong>maxAssets</strong> — optional cap on total assets</li>
        <li><strong>allowedAssetTypes</strong> — character, artefact, etc.</li>
        <li><strong>requireOrigin</strong> — enforce origin field</li>
        <li><strong>mintingPermissions</strong> — who can mint</li>
      </ul>

      <h2 id="governance">7. Governance Policies</h2>
      <p>Governance policies define world-level control rules.</p>
      <ul>
        <li><strong>adminAddresses</strong> — world-level administrators</li>
        <li><strong>allowedUpdateActors</strong> — who can update metadata</li>
        <li><strong>enforceLeastPrivilege</strong> — restrict permissions</li>
      </ul>

      <h2 id="registration">8. World Registration Requirements</h2>
      <p>When registering a world, the following fields may be defined:</p>
      <pre style={codeStyle}>
{`{
  "worldId": "genesisworld",
  "name": "Genesis World",
  "metadataVersion": "1.0.0",
  "policies": {
    "allowMetadataUpdates": true,
    "hashAlgorithm": "SHA-256",
    "requiredAttributes": ["rarity"],
    "allowedTypes": ["character", "artefact"],
    "mintingPermissions": ["0x1234...abcd"]
  }
}`}
      </pre>

      <h2 id="examples">9. Examples</h2>
      <pre style={codeStyle}>
{`Example: Strict World Policy

{
  "policies": {
    "allowMetadataUpdates": false,
    "hashAlgorithm": "SHA-512",
    "requiredAttributes": ["rarity", "alignment"],
    "allowedTypes": ["character"],
    "requireCustodyEvents": true,
    "mintingPermissions": ["0xADMIN"],
    "adminAddresses": ["0xADMIN"]
  }
}`}
      </pre>

      <p>
        World Policies ensure that every Powered by Berry™ world operates with
        clarity, consistency, and forensic integrity.
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