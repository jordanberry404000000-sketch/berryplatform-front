import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function SystemStatusAPI() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of the Status API" },
    { id: "base", text: "Base URL & Authentication" },
    { id: "endpoints", text: "Endpoints" },
    { id: "platform", text: "GET /status/platform" },
    { id: "subsystems", text: "GET /status/subsystems" },
    { id: "forensic", text: "GET /status/forensic" },
    { id: "governance", text: "GET /status/governance" },
    { id: "responses", text: "Response Format" },
    { id: "bestpractices", text: "Best Practices" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">System Status API — Berry Platform™</h1>
      <p>
        The System Status API provides real-time operational information about
        Berry Platform™. It allows developers, worlds, and automated systems to
        check subsystem health, uptime, and readiness before performing critical
        actions such as minting, verification, or metadata updates.
      </p>

      <h2 id="purpose">1. Purpose of the Status API</h2>
      <p>The Status API ensures:</p>
      <ul>
        <li>safe minting operations</li>
        <li>forensic engine availability</li>
        <li>governance enforcement readiness</li>
        <li>subsystem uptime monitoring</li>
        <li>CI/CD integration for Powered by Berry™ systems</li>
      </ul>

      <h2 id="base">2. Base URL & Authentication</h2>
      <p><strong>Base URL (example):</strong></p>
      <pre style={codeStyle}>
{`https://api.berryplatform.io/v1`}
      </pre>

      <p><strong>Authentication:</strong></p>
      <p>
        Most status endpoints are public, but some require a Bearer token for
        deeper operational insights.
      </p>

      <h2 id="endpoints">3. Endpoints</h2>
      <ul>
        <li><code>GET /status/platform</code> — overall platform health</li>
        <li><code>GET /status/subsystems</code> — subsystem-level health</li>
        <li><code>GET /status/forensic</code> — forensic engine status</li>
        <li><code>GET /status/governance</code> — governance enforcement status</li>
      </ul>

      <h2 id="platform">4. GET /status/platform</h2>
      <p>Returns the overall health of Berry Platform™.</p>
      <pre style={codeStyle}>
{`GET /status/platform

{
  "status": "operational",
  "uptime": "99.998%",
  "subsystems": {
    "minting": "operational",
    "forensic": "operational",
    "metadata": "operational",
    "governance": "operational"
  },
  "timestamp": "2025-11-04T14:22:00Z"
}`}
      </pre>

      <h2 id="subsystems">5. GET /status/subsystems</h2>
      <p>Returns detailed health information for each subsystem.</p>
      <pre style={codeStyle}>
{`GET /status/subsystems

{
  "mintingEngine": {
    "status": "operational",
    "latencyMs": 42
  },
  "metadataIntegrity": {
    "status": "operational",
    "latencyMs": 18
  },
  "forensicEngine": {
    "status": "operational",
    "latencyMs": 33
  },
  "governanceLayer": {
    "status": "operational",
    "latencyMs": 27
  }
}`}
      </pre>

      <h2 id="forensic">6. GET /status/forensic</h2>
      <p>Checks the readiness of the Forensic Processing Engine.</p>
      <pre style={codeStyle}>
{`GET /status/forensic

{
  "status": "operational",
  "hashing": "ready",
  "custodyReconstruction": "ready",
  "anomalyDetection": "ready",
  "latencyMs": 33
}`}
      </pre>

      <h2 id="governance">7. GET /status/governance</h2>
      <p>Checks the Governance Enforcement Layer.</p>
      <pre style={codeStyle}>
{`GET /status/governance

{
  "status": "operational",
  "policyEngine": "active",
  "permissionChecks": "active",
  "worldRegistry": "active",
  "latencyMs": 27
}`}
      </pre>

      <h2 id="responses">8. Response Format</h2>
      <p>All status responses follow this structure:</p>
      <ul>
        <li><strong>status</strong> — operational / degraded / down</li>
        <li><strong>latencyMs</strong> — subsystem response time</li>
        <li><strong>components</strong> — nested subsystem statuses</li>
        <li><strong>timestamp</strong> — ISO timestamp</li>
      </ul>

      <h2 id="bestpractices">9. Best Practices</h2>
      <ul>
        <li>check system status before minting or updating metadata</li>
        <li>surface status indicators in your UI</li>
        <li>use status checks in CI/CD pipelines</li>
        <li>log degraded states for auditability</li>
      </ul>

      <p>
        The System Status API ensures that Berry remains reliable, predictable,
        and operational — even at scale.
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