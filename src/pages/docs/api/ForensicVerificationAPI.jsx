import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function ForensicVerificationAPI() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "base", text: "Base URL & Authentication" },
    { id: "endpoints", text: "Endpoints" },
    { id: "verifyAsset", text: "GET /verify/asset/:assetId" },
    { id: "verifyMetadata", text: "POST /verify/metadata" },
    { id: "verifyCustody", text: "GET /verify/custody/:assetId" },
    { id: "responses", text: "Response Format" },
    { id: "errors", text: "Error Codes" },
    { id: "bestpractices", text: "Best Practices" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Forensic Verification API — Berry Platform™</h1>
      <p>
        The Forensic Verification API allows you to verify the integrity,
        metadata, and chain-of-custody of any asset minted through Berry
        Platform™. This is the primary interface for proving that an asset is
        authentic, unchanged, and fully traceable.
      </p>

      <h2 id="base">1. Base URL & Authentication</h2>
      <p><strong>Base URL (example):</strong></p>
      <pre style={codeStyle}>
{`https://api.berryplatform.io/v1`}
      </pre>
      <p><strong>Authentication:</strong> Bearer token</p>
      <pre style={codeStyle}>
{`Authorization: Bearer YOUR_API_KEY`}
      </pre>

      <h2 id="endpoints">2. Endpoints</h2>
      <ul>
        <li><code>GET /verify/asset/:assetId</code> — full asset verification</li>
        <li><code>POST /verify/metadata</code> — verify metadata against a hash</li>
        <li><code>GET /verify/custody/:assetId</code> — verify chain-of-custody</li>
      </ul>

      <h2 id="verifyAsset">3. GET /verify/asset/:assetId</h2>
      <p>Performs a full forensic verification of an asset.</p>
      <p><strong>Request:</strong></p>
      <pre style={codeStyle}>
{`GET /verify/asset/genesisworld:character:0001
Authorization: Bearer YOUR_API_KEY`}
      </pre>
      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "assetId": "genesisworld:character:0001",
  "integrity": "verified",
  "metadata": "valid",
  "custody": "complete",
  "anomalies": [],
  "summary": {
    "hashMatch": true,
    "custodyChainIntact": true,
    "approvedAlgorithms": true
  }
}`}
      </pre>

      <h2 id="verifyMetadata">4. POST /verify/metadata</h2>
      <p>Verifies a metadata object against a known hash.</p>
      <p><strong>Request:</strong></p>
      <pre style={codeStyle}>
{`POST /verify/metadata
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "expectedHash": "0xABC123...",
  "metadata": {
    "name": "Astra",
    "type": "character",
    "origin": "GenesisWorld",
    "attributes": [
      { "trait": "rarity", "value": "Rare" },
      { "trait": "alignment", "value": "Neutral" }
    ],
    "metadataVersion": "1.0.0"
  }
}`}
      </pre>
      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "hashMatch": true,
  "computedHash": "0xABC123...",
  "expectedHash": "0xABC123...",
  "algorithm": "SHA-256"
}`}
      </pre>

      <h2 id="verifyCustody">5. GET /verify/custody/:assetId</h2>
      <p>Verifies the chain-of-custody for an asset.</p>
      <p><strong>Request:</strong></p>
      <pre style={codeStyle}>
{`GET /verify/custody/genesisworld:character:0001
Authorization: Bearer YOUR_API_KEY`}
      </pre>
      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "assetId": "genesisworld:character:0001",
  "custody": "complete",
  "events": [
    {
      "type": "mint",
      "timestamp": "2025-11-04T14:22:00Z",
      "eventHash": "0xMINT_HASH",
      "prevHash": null
    }
  ],
  "anomalies": []
}`}
      </pre>

      <h2 id="responses">6. Response Format</h2>
      <p>Most verification responses include:</p>
      <ul>
        <li><strong>integrity</strong> — verified / failed / unknown</li>
        <li><strong>metadata</strong> — valid / invalid / missing</li>
        <li><strong>custody</strong> — complete / partial / broken</li>
        <li><strong>anomalies</strong> — list of detected issues (if any)</li>
      </ul>

      <h2 id="errors">7. Error Codes</h2>
      <ul>
        <li><strong>400</strong> — invalid request (bad assetId or payload)</li>
        <li><strong>401</strong> — unauthorized</li>
        <li><strong>404</strong> — asset not found</li>
        <li><strong>409</strong> — integrity conflict detected</li>
        <li><strong>500</strong> — internal error</li>
      </ul>

      <h2 id="bestpractices">8. Best Practices</h2>
      <ul>
        <li>verify assets at read time, not just at mint time</li>
        <li>surface verification status in your UI (green/amber/red)</li>
        <li>log anomalies for later investigation</li>
        <li>treat verification responses as forensic evidence</li>
      </ul>

      <p>
        The Forensic Verification API is what makes Berry more than a minting
        platform — it makes Berry a source of verifiable digital truth.
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