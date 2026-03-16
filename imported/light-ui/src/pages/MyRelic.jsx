import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App.jsx";

export default function MyRelic() {
  const { account, contract } = useContext(Web3Context);
  const [tokenId, setTokenId] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRelic = async () => {
      if (!account || !contract) return;
      try {
        setLoading(true);

        const total = await contract.methods.totalSupply().call();
        let found = null;

        for (let i = 1; i <= Number(total); i++) {
          const owner = await contract.methods.ownerOf(i).call();
          if (owner.toLowerCase() === account.toLowerCase()) {
            found = i;
            break;
          }
        }

        if (!found) {
          setTokenId(null);
          setMetadata(null);
          return;
        }

        setTokenId(found);
        const uri = await contract.methods.tokenURI(found).call();
        const httpUri = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        const res = await fetch(httpUri);
        const json = await res.json();
        setMetadata(json);
      } catch (err) {
        console.error("Failed to load relic:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRelic();
  }, [account, contract]);

  if (!account) {
    return <p style={{ fontSize: "14px", color: "#aaa" }}>Connect your wallet to view your relic.</p>;
  }

  if (loading) {
    return <p style={{ fontSize: "14px", color: "#aaa" }}>Loading your relic…</p>;
  }

  if (!tokenId) {
    return <p style={{ fontSize: "14px", color: "#aaa" }}>No relic found for this wallet.</p>;
  }

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        borderRadius: "16px",
        border: "1px solid #333",
        background: "#0b0b18"
      }}
    >
      <p style={{ fontSize: "14px", color: "#ccc" }}>Token ID: {tokenId}</p>
      {metadata && (
        <>
          <h3 style={{ marginTop: "8px" }}>{metadata.name}</h3>
          {metadata.image && (
            <img
              src={metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
              alt={metadata.name}
              style={{ marginTop: "12px", maxWidth: "100%", borderRadius: "12px" }}
            />
          )}
          {metadata.description && (
            <p style={{ marginTop: "12px", fontSize: "14px", color: "#aaa" }}>
              {metadata.description}
            </p>
          )}
        </>
      )}
    </div>
  );
}