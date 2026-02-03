import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App.jsx";

export default function MyRelic() {
  const { account } = useContext(Web3Context);
  const isConnected = !!account;

  const [relic, setRelic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRelic() {
      if (!isConnected) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/relic/${account}`);
        const data = await res.json();

        if (!data || !data.tokenId) {
          setError("No relic found for this wallet.");
          return;
        }

        setRelic(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load relic.");
      } finally {
        setLoading(false);
      }
    }

    fetchRelic();
  }, [isConnected, account]);

  if (!isConnected) {
    return <p style={{ opacity: 0.7 }}>Connect your wallet to view your relic.</p>;
  }

  if (loading) {
    return <p style={{ color: "#7df9ff" }}>Loading your relic...</p>;
  }

  if (error) {
    return <p style={{ color: "#ff6b6b" }}>{error}</p>;
  }

  if (!relic) {
    return null;
  }

  return (
    <div className="neon-panel pulse">
      <h3 className="neon-heading">Your Relic</h3>

      <p>
        Token ID: <strong style={{ color: "#7df9ff" }}>{relic.tokenId}</strong>
      </p>

      {relic.image && (
        <img
          src={relic.image}
          alt="Relic"
          style={{
            width: "100%",
            maxWidth: "300px",
            borderRadius: "12px",
            marginTop: "10px",
            boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)",
          }}
        />
      )}

      <div style={{ marginTop: "20px" }}>
       <p>
  Cert Hash: <code className="neon-hash">{relic.certHash}</code>
</p>

        <p>
          Integrity:{" "}
          <span style={{ color: relic.integrity === "valid" ? "#00ff9d" : "#ff6b6b" }}>
            {relic.integrity}
          </span>
        </p>

        {relic.lastMovement && (
          <p style={{ opacity: 0.7 }}>
            Last Movement: {relic.lastMovement}
          </p>
        )}
      </div>
    </div>
  );
}