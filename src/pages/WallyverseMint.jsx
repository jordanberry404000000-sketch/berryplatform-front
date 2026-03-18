import React, { useState } from "react";

export default function WallyverseMint() {
  const [status, setStatus] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    setIsMinting(true);
    setStatus("Preparing mint request…");

    // Placeholder for future Web3 integration
    setTimeout(() => {
      setStatus("Character minted successfully (simulation).");
      setIsMinting(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>WALLYVERSE — CHARACTER MINTING</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
Mint your Wallyverse character — a verifiable identity with a forensic-grade chain-of-custody.

Every character minted through Wallyverse is:
- created on-chain
- bound to cryptographic metadata
- tracked through Berry’s forensic engine
- preserved with full provenance

This is not a collectible.
This is a character with truth behind it.
        `}
      </div>

      {/* Character Preview Box */}
      <div
        style={{
          marginTop: "32px",
          padding: "24px",
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          background: "#fafafa",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "12px" }}>Character Preview</h2>
        <div
          style={{
            width: "200px",
            height: "200px",
            margin: "0 auto 16px",
            background: "#ddd",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#555",
            fontSize: "14px",
          }}
        >
          Preview Image
        </div>

        <p style={{ fontSize: "14px", color: "#666" }}>
          Your character will be generated with a unique identity and metadata hash.
        </p>
      </div>

      {/* Mint Button */}
      <div style={{ marginTop: "32px", textAlign: "center" }}>
        <button
          onClick={handleMint}
          disabled={isMinting}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: isMinting ? "#999" : "#222",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: isMinting ? "not-allowed" : "pointer",
            transition: "opacity 0.2s ease",
          }}
        >
          {isMinting ? "Minting…" : "Mint Character"}
        </button>
      </div>

      {/* Status Message */}
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
    </div>
  );
}