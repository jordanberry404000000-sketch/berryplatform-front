import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function CustodyReconstructionSpec() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of Custody Reconstruction" },
    { id: "inputs", text: "Inputs & Assumptions" },
    { id: "algorithm", text: "Reconstruction Algorithm" },
    { id: "validation", text: "Validation Rules" },
    { id: "anomalies", text: "Anomaly Detection" },
    { id: "complex", text: "Complex Scenarios" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Custody Reconstruction Algorithm Spec — Berry Platform™</h1>
      <p>
        The Custody Reconstruction Algorithm is responsible for rebuilding the
        full chain-of-custody for any asset from its custody events. It ensures
        that the sequence of events is complete, ordered, and cryptographically
        consistent, forming the backbone of Berry’s forensic truth model.
      </p>

      <h2 id="purpose">1. Purpose of Custody Reconstruction</h2>
      <p>The algorithm exists to:</p>
      <ul>
        <li>rebuild an asset’s full event history</li>
        <li>verify event ordering and linkage</li>
        <li>detect missing or tampered events</li>
        <li>produce a deterministic custody view</li>
        <li>support verification and audit workflows</li>
      </ul>

      <h2 id="inputs">2. Inputs & Assumptions</h2>
      <p>The algorithm operates on:</p>
      <ul>
        <li>a set of custody events for a given <code>assetId</code></li>
        <li>each event containing <code>eventHash</code> and <code>prevHash</code></li>
        <li>events stored in an append-only log or index</li>
      </ul>
      <p>Assumptions:</p>
      <ul>
        <li>every asset has exactly one <strong>mint</strong> event</li>
        <li>all events form a single linear chain (no forks)</li>
        <li>event hashes are computed using Berry’s hashing standards</li>
      </ul>

      <h2 id="algorithm">3. Reconstruction Algorithm</h2>
      <p>High-level steps:</p>
      <ol>
        <li>Fetch all custody events for the assetId</li>
        <li>Index events by <code>eventHash</code> and <code>prevHash</code></li>
        <li>Identify the <strong>mint</strong> event (where <code>prevHash = null</code>)</li>
        <li>Walk forward by repeatedly finding the event whose <code>prevHash</code> matches the current <code>eventHash</code></li>
        <li>Stop when no further event is found</li>
        <li>Return the ordered list as the reconstructed custody chain</li>
      </ol>

      <h2 id="validation">4. Validation Rules</h2>
      <p>During reconstruction, the algorithm validates:</p>
      <ul>
        <li>exactly one mint event exists</li>
        <li>no gaps in the chain (every <code>prevHash</code> is satisfied)</li>
        <li>no duplicate <code>eventHash</code> values</li>
        <li>no conflicting successors for a given <code>eventHash</code></li>
      </ul>
      <p>If any rule fails, the custody status is marked as <strong>broken</strong> or <strong>partial</strong>.</p>

      <h2 id="anomalies">5. Anomaly Detection</h2>
      <p>The algorithm flags anomalies such as:</p>
      <ul>
        <li><strong>missing_event</strong> — a referenced <code>prevHash</code> is not found</li>
        <li><strong>fork_detected</strong> — multiple events reference the same <code>prevHash</code></li>
        <li><strong>hash_mismatch</strong> — recomputed event hash does not match stored hash</li>
        <li><strong>unexpected_type</strong> — invalid event type in chain</li>
      </ul>

      <h2 id="complex">6. Complex Scenarios</h2>
      <p>The algorithm must handle:</p>
      <ul>
        <li>long-running assets with many events</li>
        <li>frequent metadata updates</li>
        <li>high-volume transfer activity</li>
        <li>governance actions interleaved with other events</li>
      </ul>
      <p>
        In all cases, the output is a deterministic, ordered list of events with
        a clear integrity status.
      </p>

      <h2 id="examples">7. Examples</h2>
      <pre style={codeStyle}>
{`Input Events (unordered):

[
  { "eventHash": "H2", "prevHash": "H1", "type": "transfer" },
  { "eventHash": "H1", "prevHash": null, "type": "mint" },
  { "eventHash": "H3", "prevHash": "H2", "type": "metadata_update" }
]

Reconstructed Chain:

[
  { "eventHash": "H1", "prevHash": null, "type": "mint" },
  { "eventHash": "H2", "prevHash": "H1", "type": "transfer" },
  { "eventHash": "H3", "prevHash": "H2", "type": "metadata_update" }
]

Result:
- custody: "complete"
- anomalies: []`}
      </pre>

      <p>
        The Custody Reconstruction Algorithm is what allows Berry to turn raw
        events into a coherent, verifiable story of an asset’s life.
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