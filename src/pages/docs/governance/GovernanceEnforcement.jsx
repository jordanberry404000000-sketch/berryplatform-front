import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function GovernanceEnforcement() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of Governance Enforcement" },
    { id: "principles", text: "Core Principles" },
    { id: "controls", text: "Governance Controls" },
    { id: "permissions", text: "Permission Model" },
    { id: "policies", text: "Enforced Policies" },
    { id: "compliance", text: "Compliance & Auditability" },
    { id: "integration", text: "Integration with Subsystems" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Governance Enforcement Layer — Berry Platform™</h1>
      <p>
        The Governance Enforcement Layer is the control plane of Berry Platform™.
        It ensures that all subsystems, worlds, and Powered by Berry™ integrations
        follow the Berry Standard™. Governance is not optional — it is the
        foundation of Berry’s institutional integrity.
      </p>

      <h2 id="purpose">1. Purpose of Governance Enforcement</h2>
      <p>
        Governance exists to ensure that all actions taken within Berry are:
      </p>
      <ul>
        <li>authorized</li>
        <li>compliant</li>
        <li>auditable</li>
        <li>forensically sound</li>
        <li>aligned with platform standards</li>
      </ul>

      <h2 id="principles">2. Core Principles</h2>
      <p>Berry’s governance model is built on five principles:</p>
      <ul>
        <li><strong>Least Privilege</strong> — only required permissions are granted</li>
        <li><strong>Separation of Duties</strong> — no single actor controls all steps</li>
        <li><strong>Traceability</strong> — all actions are logged and verifiable</li>
        <li><strong>Policy Enforcement</strong> — rules are applied consistently</li>
        <li><strong>Auditability</strong> — every decision is reviewable</li>
      </ul>

      <h2 id="controls">3. Governance Controls</h2>
      <p>The Governance Enforcement Layer provides the following controls:</p>
      <ul>
        <li><strong>Minting Control</strong> — who can mint, what, and where</li>
        <li><strong>Metadata Control</strong> — who can update metadata</li>
        <li><strong>Custody Control</strong> — who can initiate transfers</li>
        <li><strong>World Registration Control</strong> — who can create worlds</li>
        <li><strong>Policy Enforcement</strong> — ensures all actions follow standards</li>
      </ul>

      <h2 id="permissions">4. Permission Model</h2>
      <p>Permissions are assigned at three levels:</p>
      <ul>
        <li><strong>Platform Level</strong> — global permissions (Berry internal)</li>
        <li><strong>World Level</strong> — permissions scoped to a world</li>
        <li><strong>Asset Level</strong> — permissions scoped to a specific asset</li>
      </ul>

      <p>Common permission types include:</p>
      <ul>
        <li><strong>mint:character</strong></li>
        <li><strong>mint:artefact</strong></li>
        <li><strong>metadata:update</strong></li>
        <li><strong>custody:transfer</strong></li>
        <li><strong>world:register</strong></li>
      </ul>

      <h2 id="policies">5. Enforced Policies</h2>
      <p>Governance enforces the following policies across all subsystems:</p>
      <ul>
        <li>Metadata Structure Standard</li>
        <li>Hashing Standards</li>
        <li>Chain-of-Custody Requirements</li>
        <li>Minting Rules</li>
        <li>World Registration Requirements</li>
        <li>Integrity Verification Rules</li>
      </ul>

      <h2 id="compliance">6. Compliance & Auditability</h2>
      <p>
        Every governance action is logged and can be audited. This includes:
      </p>
      <ul>
        <li>who performed the action</li>
        <li>when it occurred</li>
        <li>what subsystem was affected</li>
        <li>what policy was enforced</li>
        <li>the resulting custody event</li>
      </ul>

      <p>
        This ensures Berry is ready for future compliance frameworks such as ISO
        27001 and SOC 2.
      </p>

      <h2 id="integration">7. Integration with Subsystems</h2>
      <p>Governance sits above all subsystems and enforces rules at runtime:</p>
      <ul>
        <li>Minting Engine — checks permissions before minting</li>
        <li>Metadata Layer — validates update permissions</li>
        <li>Forensic Engine — enforces verification policies</li>
        <li>Custody System — validates transfer permissions</li>
        <li>World Registry — enforces world creation rules</li>
      </ul>

      <h2 id="examples">8. Examples</h2>
      <pre style={codeStyle}>
{`Example: Minting Permission Check

Request:
POST /mint/character
Actor: 0x1234...abcd

Governance Check:
- Does actor have mint:character permission? YES
- Is world approved? YES
- Does metadata follow structure standard? YES

Result:
Mint allowed → custody event created → asset minted`}
      </pre>

      <p>
        The Governance Enforcement Layer ensures that Berry remains a trusted,
        verifiable, and institution-grade platform for digital truth.
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