import React, { useState } from "react";

export default function NFTArtefactViewer() {
  const [tokenId, setTokenId] = useState("");
  const [status, setStatus] = useState("");
  const [artefact, setArtefact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    if (!tokenId.trim()) {
      setStatus("Please enter a valid Token ID.");
      return;
    }

    setIsLoading(true);
    setStatus("Retrieving artefact data…");

    // Placeholder for future Berry backend + blockchain integration
    setTimeout(() => {
      setArtefact({
        tokenId,
        name: "Wallyverse Artefact — Prototype",
        type: "Lore Item",
        mintedAt: "2025-11-04 14:22 UTC",
        metadataHash: "0xFAKE_HASH_ABCDEF123456",
        description:
          "A narrative artefact from the early Wallyverse timeline. Bound to cryptographic metadata and preserved with full chain-of-custody integrity.",
        attributes: [
          { trait: "Rarity", value: "Epic" },
          { trait: "Origin", value: "Genesis Zone" },
          { trait: "Lore Weight", value: "High" },
        ],
        chainOfCustody: [
          "Mint event recorded",
          "Metadata bound",
          "Evidence anchored",
          "Integrity verified",
        ],
        integrityStatus: "Verified — No anomalies detected",
      });

      setStatus("Artefact data retrieved successfully.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>NFT ARTEFACT VIEWER — BERRY PLATFORM™</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
Inspect any NFT artefact minted through Berry Platform™ or any Powered by Berry™ world.

This tool provides:
- artefact metadata inspection
- attribute breakdown
- chain-of-custody reconstruction
- integrity verification
- provenance analysis
- narrative context (for Wallyverse items)

Berry treats artefacts as evidence, not collectibles.
        `}
      </div>

      {/* Input */}
      <div style={{ marginTop: "32px" }}>
        <label style={{ fontWeight: "600", fontSize: "14px" }}>
          Enter Token ID
        </label>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="e.g., 2048"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "8px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Lookup Button */}
      <div style={{ marginTop: "24px" }}>
        <button
          onClick={handleLookup}
          disabled={isLoading}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: isLoading ? "#999" : "#222",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "opacity 0.2s ease",
          }}
        >
          {isLoading ? "Retrieving…" : "View Artefact"}
        </button>
      </div>

      {/* Status */}
      {status && (
        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            background: "#f4f4f4",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
          }}
        >
          {status}
        </div>
      )}

      {/* Artefact Panel */}
      {artefact && (
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h2>Artefact Details</h2>

          <p><strong>Name:</strong> {artefact.name}</p>
          <p><strong>Type:</strong> {artefact.type}</p>
          <p><strong>Token ID:</strong> {artefact.tokenId}</p>
          <p><strong>Minted At:</strong> {artefact.mintedAt}</p>
          <p><strong>Metadata Hash:</strong> {artefact.metadataHash}</p>
          <p><strong>Integrity Status:</strong> {artefact.integrityStatus}</p>

          <h3 style={{ marginTop: "20px" }}>Description</h3>
          <p>{artefact.description}</p>

          <h3 style={{ marginTop: "20px" }}>Attributes</h3>
          <ul>
            {artefact.attributes.map((attr, index) => (
              <li key={index}>
                <strong>{attr.trait}:</strong> {attr.value}
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "20px" }}>Chain of Custody</h3>
          <ul>
            {artefact.chainOfCustody.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}