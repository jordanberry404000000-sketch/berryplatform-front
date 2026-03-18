import React from "react";
import DocsLayout from "../../../layouts/DocsLayout";

export default function MetadataStructure() {
  const headings = [
    { id: "intro", text: "Introduction" },
    { id: "purpose", text: "Purpose of Metadata Structure" },
    { id: "principles", text: "Core Principles" },
    { id: "required", text: "Required Metadata Fields" },
    { id: "optional", text: "Optional Metadata Fields" },
    { id: "normalization", text: "Normalization Rules" },
    { id: "serialization", text: "Serialization Requirements" },
    { id: "immutability", text: "Immutability & Updates" },
    { id: "drift", text: "Preventing Metadata Drift" },
    { id: "examples", text: "Examples" },
  ];

  return (
    <DocsLayout headings={headings}>
      <h1 id="intro">Metadata Structure Standard — Berry Platform™</h1>
      <p>
        Metadata is the descriptive truth of an asset. In Berry Platform™, metadata
        is not flexible, subjective, or decorative — it is a forensic object that
        must be structured, normalized, hashed, and preserved with absolute
        integrity. This document defines the metadata structure required for all
        systems Powered by Berry™.
      </p>

      <h2 id="purpose">1. Purpose of Metadata Structure</h2>
      <p>
        The metadata structure standard ensures that all metadata:
      </p>
      <ul>
        <li>is deterministic</li>
        <li>is reproducible</li>
        <li>can be hashed consistently</li>
        <li>can be verified independently</li>
        <li>cannot drift over time</li>
      </ul>

      <h2 id="principles">2. Core Principles</h2>
      <p>Berry enforces the following metadata principles:</p>
      <ul>
        <li><strong>Determinism</strong> — same input must always produce same hash</li>
        <li><strong>Completeness</strong> — no missing required fields</li>
        <li><strong>Clarity</strong> — no ambiguous or overloaded fields</li>
        <li><strong>Immutability</strong> — metadata cannot change without a logged event</li>
        <li><strong>Reproducibility</strong> — metadata must be reconstructable from source</li>
      </ul>

      <h2 id="required">3. Required Metadata Fields</h2>
      <p>
        All assets minted through Berry must include the following fields:
      </p>
      <ul>
        <li><strong>name</strong> — human-readable identifier</li>
        <li><strong>type</strong> — character, artefact, world-object, etc.</li>
        <li><strong>origin</strong> — world or subsystem of creation</li>
        <li><strong>createdAt</strong> — ISO timestamp (UTC)</li>
        <li><strong>metadataVersion</strong> — version of metadata schema</li>
        <li><strong>attributes</strong> — structured trait/value pairs</li>
        <li><strong>integrity</strong> — metadata hash (SHA-256)</li>
      </ul>

      <h2 id="optional">4. Optional Metadata Fields</h2>
      <p>
        Optional fields may be included if they follow the same normalization and
        hashing rules:
      </p>
      <ul>
        <li><strong>description</strong></li>
        <li><strong>lore</strong> (for narrative worlds)</li>
        <li><strong>rarity</strong></li>
        <li><strong>tags</strong></li>
        <li><strong>externalUrls</strong></li>
      </ul>

      <h2 id="normalization">5. Normalization Rules</h2>
      <p>
        Metadata must be normalized before hashing. Normalization includes:
      </p>
      <ul>
        <li>alphabetical sorting of keys</li>
        <li>consistent casing (camelCase)</li>
        <li>removal of trailing whitespace</li>
        <li>consistent number formatting</li>
        <li>consistent boolean formatting</li>
        <li>no null or undefined fields</li>
      </ul>

      <h2 id="serialization">6. Serialization Requirements</h2>
      <p>
        Metadata must be serialized using the following rules:
      </p>
      <ul>
        <li>UTF-8 encoding</li>
        <li>JSON.stringify with no extra spacing</li>
        <li>no comments or non-JSON elements</li>
        <li>no dynamic fields (timestamps, random IDs)</li>
      </ul>

      <h2 id="immutability">7. Immutability & Updates</h2>
      <p>
        Metadata is immutable once hashed. Any update must:
      </p>
      <ul>
        <li>create a new metadata object</li>
        <li>generate a new metadata hash</li>
        <li>log a Metadata Update event in chain-of-custody</li>
        <li>preserve the previous metadata hash</li>
      </ul>

      <h2 id="drift">8. Preventing Metadata Drift</h2>
      <p>
        Metadata drift occurs when metadata changes without a corresponding
        custody event. Berry prevents drift by:
      </p>
      <ul>
        <li>binding metadata to a hash</li>
        <li>verifying metadata on every read</li>
        <li>logging all updates</li>
        <li>rejecting mismatched hashes</li>
      </ul>

      <h2 id="examples">9. Examples</h2>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "16px",
          borderRadius: "6px",
          fontSize: "14px",
        }}
      >
{`{
  "name": "Wallyverse Artefact",
  "type": "loreItem",
  "origin": "Genesis Zone",
  "createdAt": "2025-11-04T14:22:00Z",
  "metadataVersion": "1.0.0",
  "attributes": [
    { "trait": "rarity", "value": "Epic" },
    { "trait": "loreWeight", "value": "High" }
  ],
  "integrity": "0xABC123FAKEHASH987654321"
}`}
      </pre>

      <p>
        All Powered by Berry™ systems must follow this metadata structure to
        maintain forensic integrity and ensure verifiable truth.
      </p>
    </DocsLayout>
  );
}