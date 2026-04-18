import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function BuildYourFirstWorld() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "concepts", text: "Core Concepts" },
    { id: "createWorld", text: "1. Create Your World" },
    { id: "defineMetadata", text: "2. Define Metadata Structure" },
    { id: "mintCharacter", text: "3. Mint Your First Character" },
    { id: "mintArtefact", text: "4. Mint Your First Artefact" },
    { id: "custody", text: "5. Chain-of-Custody Integration" },
    { id: "verification", text: "6. Verify Your World Assets" },
    { id: "nextSteps", text: "Next Steps" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Build Your First World — Powered by Berry™</h1>
      <p>
        This tutorial walks you through creating your first Powered by Berry™
        world. You will define your world, mint your first character and
        artefact, bind metadata, and verify your assets using Berry’s forensic
        engine.
      </p>

      <h2 id="concepts">Core Concepts</h2>
      <p>Before you begin, you should understand:</p>
      <ul>
        <li><strong>World</strong> — a narrative or functional environment</li>
        <li><strong>Character</strong> — identity-based asset</li>
        <li><strong>Artefact</strong> — item or object with traits</li>
        <li><strong>Metadata</strong> — structured truth describing the asset</li>
        <li><strong>Chain-of-Custody</strong> — event-level history</li>
        <li><strong>Integrity</strong> — cryptographic verification</li>
      </ul>

      <h2 id="createWorld">1. Create Your World</h2>
      <p>
        A world is defined by a unique ID and a set of rules. For this tutorial,
        we’ll create a world called <strong>“GenesisWorld”</strong>.
      </p>

      <pre style={codeStyle}>
{`POST /worlds/create
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "worldId": "genesisworld",
  "name": "Genesis World",
  "description": "A foundational world built on Berry.",
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "success": true,
  "worldId": "genesisworld",
  "status": "registered"
}`}
      </pre>

      <h2 id="defineMetadata">2. Define Metadata Structure</h2>
      <p>
        Metadata must follow Berry’s Metadata Structure Standard. Here’s a simple
        example for a character:
      </p>

      <pre style={codeStyle}>
{`{
  "name": "Astra",
  "type": "character",
  "origin": "GenesisWorld",
  "attributes": [
    { "trait": "rarity", "value": "Rare" },
    { "trait": "alignment", "value": "Neutral" }
  ],
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <p>
        This metadata will be normalized, serialized, and hashed automatically by
        Berry’s integrity layer.
      </p>

      <h2 id="mintCharacter">3. Mint Your First Character</h2>
      <p>Use the Minting API to create your first character.</p>

      <pre style={codeStyle}>
{`POST /mint/character
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "worldId": "genesisworld",
  "name": "Astra",
  "origin": "GenesisWorld",
  "attributes": [
    { "trait": "rarity", "value": "Rare" },
    { "trait": "alignment", "value": "Neutral" }
  ],
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "success": true,
  "assetId": "genesisworld:character:0001",
  "tokenId": "2048",
  "metadataHash": "0xABC123...",
  "custodyRoot": "0xROOT123..."
}`}
      </pre>

      <h2 id="mintArtefact">4. Mint Your First Artefact</h2>
      <p>Now mint an artefact for your world.</p>

      <pre style={codeStyle}>
{`POST /mint/artefact
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "worldId": "genesisworld",
  "name": "Genesis Relic",
  "origin": "GenesisWorld",
  "attributes": [
    { "trait": "rarity", "value": "Epic" },
    { "trait": "loreWeight", "value": "High" }
  ],
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <h2 id="custody">5. Chain-of-Custody Integration</h2>
      <p>
        Every mint event automatically creates a chain-of-custody entry. You can
        retrieve it using:
      </p>

      <pre style={codeStyle}>
{`GET /custody/asset/genesisworld:character:0001`}
      </pre>

      <p>This returns:</p>

      <pre style={codeStyle}>
{`[
  {
    "type": "mint",
    "timestamp": "2025-11-04T14:22:00Z",
    "actor": "0x1234...abcd",
    "eventHash": "0xMINT_HASH",
    "prevHash": null
  }
]`}
      </pre>

      <h2 id="verification">6. Verify Your World Assets</h2>
      <p>Use the forensic engine to verify metadata and custody integrity.</p>

      <pre style={codeStyle}>
{`GET /verify/asset/genesisworld:character:0001`}
      </pre>

      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "integrity": "verified",
  "metadata": "valid",
  "custody": "complete",
  "anomalies": []
}`}
      </pre>

      <h2 id="nextSteps">Next Steps</h2>
      <ul>
        <li>Build a minting UI for your world</li>
        <li>Create more characters and artefacts</li>
        <li>Integrate the Forensic Viewer</li>
        <li>Publish your world in the Powered by Berry™ ecosystem</li>
      </ul>

      <p>
        You’ve now created a fully forensic, verifiable, Powered by Berry™ world.
        This is the foundation for building entire universes on Berry.
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