import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function JavascriptSdkOverview() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "install", text: "Installation" },
    { id: "init", text: "Initialization" },
    { id: "worlds", text: "Worlds API" },
    { id: "minting", text: "Minting API" },
    { id: "verification", text: "Forensic Verification" },
    { id: "metadata", text: "Metadata & Updates" },
    { id: "status", text: "System Status" },
    { id: "types", text: "TypeScript Support" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">JavaScript / TypeScript SDK — Berry Platform™</h1>
      <p>
        The Berry JavaScript / TypeScript SDK provides a convenient, typed
        interface for interacting with Berry Platform™ from Node.js and browser
        environments. It wraps the core APIs (worlds, minting, verification,
        governance, status) in a developer-friendly client.
      </p>

      <h2 id="install">Installation</h2>
      <p>Install via npm:</p>
      <pre style={codeStyle}>
{`npm install @berry/sdk`}
      </pre>
      <p>or yarn:</p>
      <pre style={codeStyle}>
{`yarn add @berry/sdk`}
      </pre>

      <h2 id="init">Initialization</h2>
      <p>Initialize the client with your API key:</p>
      <pre style={codeStyle}>
{`import { Berry } from "@berry/sdk";

const berry = new Berry({
  apiKey: process.env.BERRY_API_KEY,
  baseUrl: "https://api.berryplatform.io/v1" // optional override
});`}
      </pre>

      <h2 id="worlds">Worlds API</h2>
      <p>Register and fetch worlds.</p>
      <pre style={codeStyle}>
{`// Register a world
await berry.worlds.register({
  worldId: "genesisworld",
  name: "Genesis World",
  description: "A foundational world built on Berry.",
  metadataVersion: "1.0.0"
});

// Get a world
const world = await berry.worlds.get("genesisworld");

// List worlds
const worlds = await berry.worlds.list();`}
      </pre>

      <h2 id="minting">Minting API</h2>
      <p>Mint characters, artefacts, and generic assets.</p>
      <pre style={codeStyle}>
{`// Mint a character
const character = await berry.mint.character({
  worldId: "genesisworld",
  name: "Astra",
  origin: "GenesisWorld",
  attributes: [
    { trait: "rarity", value: "Rare" },
    { trait: "alignment", value: "Neutral" }
  ],
  metadataVersion: "1.0.0"
});

// Mint an artefact
const artefact = await berry.mint.artefact({
  worldId: "genesisworld",
  name: "Genesis Relic",
  origin: "GenesisWorld",
  attributes: [
    { trait: "rarity", value: "Epic" },
    { trait: "loreWeight", value: "High" }
  ],
  metadataVersion: "1.0.0"
});`}
      </pre>

      <h2 id="verification">Forensic Verification</h2>
      <p>Verify assets, metadata, and custody.</p>
      <pre style={codeStyle}>
{`// Full asset verification
const verification = await berry.verify.asset("genesisworld:character:0001");

// Verify metadata against a hash
const metadataCheck = await berry.verify.metadata({
  expectedHash: "0xABC123...",
  metadata: {
    name: "Astra",
    type: "character",
    origin: "GenesisWorld",
    attributes: [
      { trait: "rarity", value: "Rare" },
      { trait: "alignment", value: "Neutral" }
    ],
    metadataVersion: "1.0.0"
  }
});

// Verify custody
const custody = await berry.verify.custody("genesisworld:character:0001");`}
      </pre>

      <h2 id="metadata">Metadata & Updates</h2>
      <p>Apply controlled metadata updates following the Metadata Update Protocol.</p>
      <pre style={codeStyle}>
{`const updated = await berry.metadata.update({
  assetId: "genesisworld:character:0001",
  metadata: {
    name: "Astra",
    type: "character",
    origin: "GenesisWorld",
    attributes: [
      { trait: "rarity", value: "Rare" },
      { trait: "alignment", value: "Good" }
    ],
    metadataVersion: "1.0.1"
  }
});`}
      </pre>

      <h2 id="status">System Status</h2>
      <p>Check platform and subsystem health.</p>
      <pre style={codeStyle}>
{`const platformStatus = await berry.status.platform();
const subsystems = await berry.status.subsystems();
const forensicStatus = await berry.status.forensic();`}
      </pre>

      <h2 id="types">TypeScript Support</h2>
      <p>
        The SDK ships with full TypeScript typings. You can import types directly:
      </p>
      <pre style={codeStyle}>
{`import type {
  BerryConfig,
  WorldRegistrationRequest,
  MintCharacterRequest,
  VerificationResult
} from "@berry/sdk";`}
      </pre>

      <p>
        Using TypeScript is recommended for production integrations to ensure
        schema correctness and long-term maintainability.
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