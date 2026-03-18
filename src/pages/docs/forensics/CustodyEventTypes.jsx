import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function CustodyEventTypes() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of Custody Events" },
    { id: "eventTypes", text: "Event Types" },
    { id: "mint", text: "Mint Event" },
    { id: "transfer", text: "Transfer Event" },
    { id: "metadataUpdate", text: "Metadata Update Event" },
    { id: "governance", text: "Governance Action Event" },
    { id: "interaction", text: "Interaction Event" },
    { id: "structure", text: "Event Structure" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Custody Event Types — Berry Platform™</h1>
      <p>
        Custody events are the atomic units of Berry’s forensic truth model. Each
        event represents a verifiable, immutable action in an asset’s lifecycle.
        This reference defines all event types recognized by Berry Platform™ and
        the structure required for each.
      </p>

      <h2 id="purpose">1. Purpose of Custody Events</h2>
      <p>Custody events ensure:</p>
      <ul>
        <li>complete historical traceability</li>
        <li>tamper-evident sequencing</li>
        <li>cryptographic integrity</li>
        <li>forensic reproducibility</li>
        <li>auditable world and asset behavior</li>
      </ul>

      <h2 id="eventTypes">2. Event Types</h2>
      <p>Berry recognizes the following custody event types:</p>
      <ul>
        <li><strong>mint</strong> — asset creation</li>
        <li><strong>transfer</strong> — ownership change</li>
        <li><strong>metadata_update</strong> — metadata evolution</li>
        <li><strong>governance_action</strong> — policy or permission change</li>
        <li><strong>interaction</strong> — world or system interaction</li>
      </ul>

      <h2 id="mint">3. Mint Event</h2>
      <p>The first event in every asset’s custody chain.</p>
      <ul>
        <li><strong>type:</strong> mint</li>
        <li><strong>payload:</strong> metadata hash, worldId, asset type</li>
        <li><strong>prevHash:</strong> null</li>
      </ul>

      <h2 id="transfer">4. Transfer Event</h2>
      <p>Represents a change in ownership or control.</p>
      <ul>
        <li><strong>type:</strong> transfer</li>
        <li><strong>payload:</strong> from, to</li>
        <li><strong>prevHash:</strong> hash of previous event</li>
      </ul>

      <h2 id="metadataUpdate">5. Metadata Update Event</h2>
      <p>Represents a controlled evolution of metadata.</p>
      <ul>
        <li><strong>type:</strong> metadata_update</li>
        <li><strong>payload:</strong> oldHash, newHash</li>
        <li><strong>prevHash:</strong> previous event hash</li>
      </ul>

      <h2 id="governance">6. Governance Action Event</h2>
      <p>Represents a governance-level change affecting the asset or world.</p>
      <ul>
        <li><strong>type:</strong> governance_action</li>
        <li><strong>payload:</strong> action, actor, policy</li>
        <li><strong>prevHash:</strong> previous event hash</li>
      </ul>

      <h2 id="interaction">7. Interaction Event</h2>
      <p>Represents a world or system interaction involving the asset.</p>
      <ul>
        <li><strong>type:</strong> interaction</li>
        <li><strong>payload:</strong> interactionType, data</li>
        <li><strong>prevHash:</strong> previous event hash</li>
      </ul>

      <h2 id="structure">8. Event Structure</h2>
      <p>All custody events follow this structure:</p>
      <pre style={codeStyle}>
{`{
  "type": "event_type",
  "timestamp": "ISO-UTC",
  "actor": "wallet_or_system",
  "payload": { ... },
  "prevHash": "0xPREVIOUS_EVENT_HASH",
  "eventHash": "0xTHIS_EVENT_HASH"
}`}
      </pre>

      <h2 id="examples">9. Examples</h2>
      <pre style={codeStyle}>
{`Mint Event:
{
  "type": "mint",
  "timestamp": "2025-11-04T14:22:00Z",
  "actor": "0x1234...abcd",
  "payload": {
    "metadataHash": "0xFAKE123HASH",
    "worldId": "genesisworld",
    "assetType": "character"
  },
  "prevHash": null,
  "eventHash": "0xMINT_EVENT_HASH"
}

Metadata Update Event:
{
  "type": "metadata_update",
  "timestamp": "2025-11-05T10:00:00Z",
  "actor": "0xADMIN",
  "payload": {
    "oldHash": "0xOLDHASH",
    "newHash": "0xNEWHASH"
  },
  "prevHash": "0xMINT_EVENT_HASH",
  "eventHash": "0xUPDATE_EVENT_HASH"
}`}
      </pre>

      <p>
        Custody events form the backbone of Berry’s forensic truth model. Every
        asset, every world, every action — fully traceable, fully verifiable.
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