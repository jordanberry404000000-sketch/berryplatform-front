import React, { useState } from "react";

export default function NFTForensicViewer() {
  const [tokenId, setTokenId] = useState("");
  const [status, setStatus] = useState("");
  const [forensicData, setForensicData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLookup = async () => {
    if (!tokenId.trim()) {
      setStatus("Please enter a valid Token ID.");
      return;
    }

    setIsLoading(true);
    setStatus("Retrieving forensic data…");

    // Placeholder for future blockchain + Berry backend integration
    setTimeout(() => {
      setForensicData({
        tokenId,
        mintedAt: "2025-11-04 14:22 UTC",
        metadataHash: "0xFAKE_HASH_123456789",
        ownerHistory: [
          "0x1234...abcd (Minted)",
          "0x9876...4321 (Transferred)",
        ],
        integrityStatus: "Verified — No anomalies detected",
        chainOfCustody: [
          "Mint event recorded",
          "Metadata bound",
          "Evidence anchored",
          "Transfer logged",
        ],
      });

      setStatus("Forensic data retrieved successfully.");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>NFT FORENSIC VIEWER — BERRY PLATFORM™</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
Inspect any NFT minted through Berry Platform™ or any Powered by Berry™ ecosystem.

This tool provides:
- metadata integrity verification
- chain-of-custody reconstruction
- ownership lineage
- event history
- anomaly detection
- cryptographic fingerprint checks

Berry does not guess.  
Berry verifies.
        `}
      </div>

      {/* Input Box */}
      <div style={{ marginTop: "32px" }}>
        <label style={{ fontWeight: "600", fontSize: "14px" }}>
          Enter Token ID
        </label>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="e.g., 1024"
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
          {isLoading ? "Retrieving…" : "View Forensics"}
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

      {/* Forensic Data Panel */}
      {forensicData && (
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h2>Forensic Report</h2>

          <p><strong>Token ID:</strong> {forensicData.tokenId}</p>
          <p><strong>Minted At:</strong> {forensicData.mintedAt}</p>
          <p><strong>Metadata Hash:</strong> {forensicData.metadataHash}</p>
          <p><strong>Integrity Status:</strong> {forensicData.integrityStatus}</p>

          <h3 style={{ marginTop: "20px" }}>Ownership History</h3>
          <ul>
            {forensicData.ownerHistory.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>

          <h3 style={{ marginTop: "20px" }}>Chain of Custody</h3>
          <ul>
            {forensicData.chainOfCustody.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}