import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App.jsx";
import Guidance from "../components/Guidance.jsx";
import MyRelic from "./MyRelic.jsx";

export default function Dashboard() {
  const { account } = useContext(Web3Context);
  const isConnected = !!account;

  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("Failed to fetch dashboard status:", err);
      }
    }

    if (isConnected) fetchStatus();
  }, [isConnected]);

  return (
    <div className="neon-panel pulse">
      <h1 style={{ fontSize: "36px", color: "#7df9ff" }}>BERRY DASHBOARD</h1>

      {isConnected ? (
        <p style={{ fontSize: "14px", opacity: 0.7 }}>
          Connected as: <span style={{ color: "#7df9ff" }}>{account}</span>
        </p>
      ) : (
        <p style={{ fontSize: "14px", opacity: 0.7 }}>No wallet connected.</p>
      )}

      <Guidance state={isConnected ? "dashboard" : "noWallet"} />

      {isConnected && (
        <>
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ color: "#00eaff" }}>Your Relic</h2>
            <MyRelic />
          </div>

          {status && (
            <div style={{ marginTop: "40px", padding: "20px", background: "#111", borderRadius: "12px" }}>
              <h3 style={{ color: "#7df9ff" }}>System Status</h3>
              <p>Latest Cert Hash: <code>{status.certHash}</code></p>
              <p>Node Health: {status.nodeStatus}</p>
              <p>Last Movement Echo: {status.lastEcho}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}