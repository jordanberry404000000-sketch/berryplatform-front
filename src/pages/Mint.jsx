import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Context } from "../App.jsx";
import Guidance from "../components/Guidance.jsx";

export default function Mint() {
  const { account, connectWallet } = useContext(Web3Context);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);
  const navigate = useNavigate();

  const handleMint = async () => {
    if (!account) {
      await connectWallet();
      if (!account) return;
    }

    try {
      setLoading(true);
      setTxHash(null);

      const response = await fetch(
        "https://api.berryplatform.co.uk/api/mint",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: account })
        }
      );

      const data = await response.json();

      if (!data.ok) {
        console.error("Mint failed:", data.error);
        alert("Mint failed. Check console for details.");
        return;
      }

      setTxHash(data.txHash);

      setTimeout(() => {
        navigate("/lesson1");
      }, 1200);

    } catch (err) {
      console.error("Mint failed:", err);
      alert("Mint failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const isConnected = !!account;

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <h1>Mint Your Relic</h1>
      <p style={{ color: "#aaa", fontSize: "14px" }}>
        This relic is your proof of survival, discipline, and entry into the Berry OS.
      </p>

      <Guidance state={isConnected ? "mint" : "noWallet"} />

      <button
        onClick={handleMint}
        disabled={loading}
        style={{
          marginTop: "24px",
          padding: "12px 20px",
          borderRadius: "999px",
          border: "none",
          background: loading ? "#444" : "#ff4b8b",
          color: "#fff",
          fontWeight: 600,
          cursor: loading ? "default" : "pointer"
        }}
      >
        {loading ? "Minting…" : "Mint Relic"}
      </button>

      {txHash && (
        <p style={{ marginTop: "16px", fontSize: "12px", color: "#888" }}>
          Minted in tx: {txHash.slice(0, 10)}...
        </p>
      )}
    </div>
  );
}