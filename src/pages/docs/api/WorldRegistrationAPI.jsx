import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function WorldRegistrationAPI() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of World Registration" },
    { id: "base", text: "Base URL & Authentication" },
    { id: "endpoints", text: "Endpoints" },
    { id: "registerWorld", text: "POST /worlds/register" },
    { id: "getWorld", text: "GET /worlds/:worldId" },
    { id: "listWorlds", text: "GET /worlds" },
    { id: "responses", text: "Response Format" },
    { id: "errors", text: "Error Codes" },
    { id: "bestpractices", text: "Best Practices" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">World Registration API — Berry Platform™</h1>
      <p>
        The World Registration API allows developers to create and manage worlds
        within Berry Platform™. A registered world becomes eligible to mint
        assets, enforce metadata standards, and participate in the Powered by
        Berry™ ecosystem.
      </p>

      <h2 id="purpose">1. Purpose of World Registration</h2>
      <p>World registration ensures:</p>
      <ul>
        <li>unique world identifiers</li>
        <li>governance policy assignment</li>
        <li>metadata schema versioning</li>
        <li>minting permissions and access control</li>
        <li>forensic integration readiness</li>
      </ul>

      <h2 id="base">2. Base URL & Authentication</h2>
      <p><strong>Base URL (example):</strong></p>
      <pre style={codeStyle}>
{`https://api.berryplatform.io/v1`}
      </pre>

      <p><strong>Authentication:</strong> Bearer token</p>
      <pre style={codeStyle}>
{`Authorization: Bearer YOUR_API_KEY`}
      </pre>

      <h2 id="endpoints">3. Endpoints</h2>
      <ul>
        <li><code>POST /worlds/register</code> — register a new world</li>
        <li><code>GET /worlds/:worldId</code> — retrieve world details</li>
        <li><code>GET /worlds</code> — list all registered worlds</li>
      </ul>

      <h2 id="registerWorld">4. POST /worlds/register</h2>
      <p>Registers a new world in Berry Platform™.</p>

      <p><strong>Request:</strong></p>
      <pre style={codeStyle}>
{`POST /worlds/register
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  "worldId": "genesisworld",
  "name": "Genesis World",
  "description": "A foundational world built on Berry.",
  "metadataVersion": "1.0.0",
  "policies": {
    "allowMetadataUpdates": true,
    "hashAlgorithm": "SHA-256"
  }
}`}
      </pre>

      <p><strong>Response:</strong></p>
      <pre style={codeStyle}>
{`{
  "success": true,
  "worldId": "genesisworld",
  "status": "registered",
  "policies": {
    "allowMetadataUpdates": true,
    "hashAlgorithm": "SHA-256"
  }
}`}
      </pre>

      <h2 id="getWorld">5. GET /worlds/:worldId</h2>
      <p>Retrieve details about a specific world.</p>

      <pre style={codeStyle}>
{`GET /worlds/genesisworld
Authorization: Bearer YOUR_API_KEY

{
  "worldId": "genesisworld",
  "name": "Genesis World",
  "description": "A foundational world built on Berry.",
  "metadataVersion": "1.0.0",
  "policies": {
    "allowMetadataUpdates": true,
    "hashAlgorithm": "SHA-256"
  },
  "status": "registered"
}`}
      </pre>

      <h2 id="listWorlds">6. GET /worlds</h2>
      <p>List all registered worlds.</p>

      <pre style={codeStyle}>
{`GET /worlds
Authorization: Bearer YOUR_API_KEY

{
  "worlds": [
    {
      "worldId": "genesisworld",
      "name": "Genesis World",
      "status": "registered"
    },
    {
      "worldId": "wallyverse",
      "name": "Wallyverse",
      "status": "registered"
    }
  ]
}`}
      </pre>

      <h2 id="responses">7. Response Format</h2>
      <p>All world responses include:</p>
      <ul>
        <li><strong>worldId</strong> — unique identifier</li>
        <li><strong>name</strong> — human-readable name</li>
        <li><strong>metadataVersion</strong> — schema version</li>
        <li><strong>policies</strong> — governance rules</li>
        <li><strong>status</strong> — registered / pending / disabled</li>
      </ul>

      <h2 id="errors">8. Error Codes</h2>
      <ul>
        <li><strong>400</strong> — invalid worldId or payload</li>
        <li><strong>401</strong> — unauthorized</li>
        <li><strong>403</strong> — insufficient permissions</li>
        <li><strong>409</strong> — worldId already exists</li>
        <li><strong>500</strong> — internal error</li>
      </ul>

      <h2 id="bestpractices">9. Best Practices</h2>
      <ul>
        <li>use lowercase, hyphenated worldIds (e.g., <code>mythic-realms</code>)</li>
        <li>assign metadataVersion intentionally</li>
        <li>define clear world policies early</li>
        <li>treat world registration as a governance event</li>
        <li>log world creation in your own system</li>
      </ul>

      <p>
        The World Registration API is the gateway into the Powered by Berry™
        ecosystem. Once a world is registered, it becomes a first-class citizen
        of Berry’s forensic architecture.
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