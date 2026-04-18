import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function DeveloperQuickstart() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "prereqs", text: "Prerequisites" },
    { id: "install", text: "1. Install the SDK" },
    { id: "auth", text: "2. Authenticate" },
    { id: "registerWorld", text: "3. Register Your First World" },
    { id: "mintCharacter", text: "4. Mint Your First Character" },
    { id: "verifyAsset", text: "5. Verify the Asset" },
    { id: "nextSteps", text: "Next Steps" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Developer Quickstart — Berry Platform™</h1>
      <p>
        Welcome to Berry Platform™. This quickstart guide will take you from zero
        to minting and verifying your first asset in just a few minutes. Berry is
        designed to be forensic, deterministic, and developer-friendly — and this
        guide shows you exactly how to get started.
      </p>

      <h2 id="prereqs">Prerequisites</h2>
      <ul>
        <li>Node.js 18+</li>
        <li>A Berry API key</li>
        <li>Basic familiarity with JSON</li>
      </ul>

      <h2 id="install">1. Install the SDK</h2>
      <p>Install the Berry JavaScript SDK:</p>
      <pre style={codeStyle}>
{`npm install @berry/sdk`}
      </pre>

      <h2 id="auth">2. Authenticate</h2>
      <p>Initialize the SDK with your API key:</p>
      <pre style={codeStyle}>
{`import { Berry } from "@berry/sdk";

const berry = new Berry({
  apiKey: process.env.BERRY_API_KEY
});`}
      </pre>

      <h2 id="registerWorld">3. Register Your First World</h2>
      <p>Create a world called <strong>GenesisWorld</strong>:</p>
      <pre style={codeStyle}>
{`await berry.worlds.register({
  worldId: "genesisworld",
  name: "Genesis World",
  description: "A foundational world built on Berry.",
  metadataVersion: "1.0.0"
});`}
      </pre>

      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "success": true,
  "worldId": "genesisworld",
  "status": "registered"
}`}
      </pre>

      <h2 id="mintCharacter">4. Mint Your First Character</h2>
      <p>Mint a character named <strong>Astra</strong>:</p>
      <pre style={codeStyle}>
{`const asset = await berry.mint.character({
  worldId: "genesisworld",
  name: "Astra",
  origin: "GenesisWorld",
  attributes: [
    { trait: "rarity", value: "Rare" },
    { trait: "alignment", value: "Neutral" }
  ],
  metadataVersion: "1.0.0"
});`}
      </pre>

      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "assetId": "genesisworld:character:0001",
  "tokenId": "2048",
  "metadataHash": "0xABC123...",
  "custodyRoot": "0xROOT123..."
}`}
      </pre>

      <h2 id="verifyAsset">5. Verify the Asset</h2>
      <p>Use the Forensic Verification API to confirm integrity:</p>
      <pre style={codeStyle}>
{`const verification = await berry.verify.asset("genesisworld:character:0001");`}
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
        <li>Read the <strong>Build Your First World</strong> tutorial</li>
        <li>Explore the <strong>Minting API</strong></li>
        <li>Integrate the <strong>Forensic Viewer</strong> into your UI</li>
        <li>Define world policies and governance rules</li>
        <li>Publish your world to the Powered by Berry™ ecosystem</li>
      </ul>

      <p>
        You’ve now created a world, minted an asset, and verified it using Berry’s
        forensic engine. You’re officially building on Berry Platform™.
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