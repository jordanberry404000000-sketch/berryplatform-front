import React, { useContext } from "react";
import { Web3Context } from "../App.jsx";
import Guidance from "../components/Guidance.jsx";
import MyRelic from "./MyRelic.jsx";

export default function Dashboard() {
  const { account } = useContext(Web3Context);
  const isConnected = !!account;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1>Dashboard</h1>

      {isConnected ? (
        <p style={{ fontSize: "14px", color: "#aaa" }}>Connected as: {account}</p>
      ) : (
        <p style={{ fontSize: "14px", color: "#aaa" }}>No wallet connected.</p>
      )}

      <Guidance state={isConnected ? "dashboard" : "noWallet"} />

      {isConnected && (
        <div style={{ marginTop: "30px" }}>
          <h2>Your Relic</h2>
          <MyRelic />
        </div>
      )}
    </div>
  );
}