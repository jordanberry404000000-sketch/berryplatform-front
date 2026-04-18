import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function MintingAPI() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "base", text: "Base URL & Authentication" },
    { id: "endpoints", text: "Endpoints" },
    { id: "mintCharacter", text: "POST /mint/character" },
    { id: "mintArtefact", text: "POST /mint/artefact" },
    { id: "mintGeneric", text: "POST /mint/asset" },
    { id: "responses", text: "Response Format" },
    { id: "errors", text: "Error Codes" },
    { id: "bestpractices", text: "Best Practices" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Minting API — Berry Platform™</h1>
      <p>
        The Minting API is the primary interface for creating on-chain assets
        through Berry Platform™. All Powered by Berry™ systems must use this API
        (or an equivalent Berry SDK) to mint characters, artefacts, and other
        assets to ensure forensic integrity, metadata binding, and full
        chain-of-custody.
      </p>

      <h2 id="base">1. Base URL & Authentication</h2>
      <p><strong>Base URL (example):</strong></p>
      <pre
        style={codeStyle}
      >
{`https://api.berryplatform.io/v1`}
      </pre>
      <p><strong>Authentication:</strong> Bearer token</p>
      <pre
        style={codeStyle}
      >
{`Authorization: Bearer YOUR_API_KEY`}
      </pre>

      <h2 id="endpoints">2. Endpoints</h2>
      <ul>
        <li><code>POST /mint/character</code> — mint a character asset</li>
        <li><code>POST /mint/artefact</code> — mint an artefact asset</li>
        <li><code>POST /mint/asset</code> — generic minting endpoint</li>
      </ul>

      <h2 id="mintCharacter">3. POST /mint/character</h2>
      <p>Mint a character (identity-based asset) in a Powered by Berry™ world.</p>
      <p><strong>Request:</strong></p>
      <pre
        style={codeStyle}
      >
{`POST /mint/character
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "worldId": "wallyverse",
  "name": "Wally",
  "origin": "Genesis Zone",
  "attributes": [
    { "trait": "rarity", "value": "Legendary" },
    { "trait": "role", "value": "Protagonist" }
  ],
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <h2 id="mintArtefact">4. POST /mint/artefact</h2>
      <p>Mint a narrative or functional artefact.</p>
      <p><strong>Request:</strong></p>
      <pre
        style={codeStyle}
      >
{`POST /mint/artefact
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "worldId": "wallyverse",
  "name": "Genesis Relic",
  "origin": "Genesis Zone",
  "attributes": [
    { "trait": "rarity", "value": "Epic" },
    { "trait": "loreWeight", "value": "High" }
  ],
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <h2 id="mintGeneric">5. POST /mint/asset</h2>
      <p>Generic minting endpoint for custom asset types.</p>
      <p><strong>Request:</strong></p>
      <pre
        style={codeStyle}
      >
{`POST /mint/asset
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "worldId": "wallyverse",
  "type": "worldObject",
  "name": "Genesis Gate",
  "origin": "Genesis Zone",
  "attributes": [
    { "trait": "accessLevel", "value": "Restricted" }
  ],
  "metadataVersion": "1.0.0"
}`}
      </pre>

      <h2 id="responses">6. Response Format</h2>
      <p>All minting endpoints return a consistent response structure.</p>
      <pre
        style={codeStyle}
      >
{`{
  "success": true,
  "assetId": "wallyverse:character:0001",
  "tokenId": "2048",
  "txHash": "0xONCHAIN_TX_HASH",
  "metadataHash": "0xMETADATA_HASH",
  "custodyRoot": "0xCUSTODY_ROOT_HASH"
}`}
      </pre>

      <h2 id="errors">7. Error Codes</h2>
      <ul>
        <li><strong>400</strong> — invalid payload (missing fields, bad structure)</li>
        <li><strong>401</strong> — unauthorized (invalid or missing API key)</li>
        <li><strong>403</strong> — forbidden (world not approved or not Powered by Berry™)</li>
        <li><strong>409</strong> — integrity conflict (metadata or custody violation)</li>
        <li><strong>500</strong> — internal error</li>
      </ul>

      <h2 id="bestpractices">8. Best Practices</h2>
      <ul>
        <li>always follow Metadata Structure and Hashing Standards</li>
        <li>log asset IDs and token IDs in your own system</li>
        <li>treat mint responses as evidence, not just receipts</li>
        <li>never bypass Berry’s minting engine for Powered by Berry™ assets</li>
      </ul>

      <p>
        The Minting API is the entry point into Berry’s forensic backbone.
        Everything that follows — verification, custody, integrity — starts here.
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