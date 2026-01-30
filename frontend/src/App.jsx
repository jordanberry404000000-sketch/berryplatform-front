import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Web3 from "web3";
import { BERRY_CONTRACT_ADDRESS, CHAIN_ID_HEX } from "./config.js";
import abiJson from "../../contracts/out/BoundlessBerriesABI.json";
import Mint from "./pages/Mint.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MyRelic from "./pages/MyRelic.jsx";
import Lesson1 from "./pages/Lesson1.jsx";

export const Web3Context = React.createContext(null);

export default function App() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask required");
      return;
    }
    const provider = window.ethereum;
    const chainId = await provider.request({ method: "eth_chainId" });
    if (chainId !== CHAIN_ID_HEX) {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN_ID_HEX }]
      });
    }
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    const w3 = new Web3(provider);
    const c = new w3.eth.Contract(abiJson.abi, BERRY_CONTRACT_ADDRESS);
    setAccount(accounts[0]);
    setWeb3(w3);
    setContract(c);
  };

  const ctx = { account, web3, contract, connectWallet };

  return (
    <Web3Context.Provider value={ctx}>
      <div style={{ minHeight: "100vh", background: "#050510", color: "#f5f5f5" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            borderBottom: "1px solid #222"
          }}
        >
          <div>
            <Link to="/" style={{ color: "#f5f5f5", textDecoration: "none", fontWeight: 700 }}>
              Berry Platform
            </Link>
          </div>
          <nav style={{ display: "flex", gap: "16px", fontSize: "14px" }}>
            <Link to="/mint" style={{ color: "#aaa", textDecoration: "none" }}>Mint</Link>
            <Link to="/dashboard" style={{ color: "#aaa", textDecoration: "none" }}>Dashboard</Link>
            <Link to="/myrelic" style={{ color: "#aaa", textDecoration: "none" }}>My Relic</Link>
          </nav>
          <button
            onClick={connectWallet}
            style={{
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid #ff4b8b",
              background: account ? "#ff4b8b" : "transparent",
              color: "#f5f5f5",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </button>
        </header>

        <main style={{ padding: "24px" }}>
          <Routes>
            <Route path="/" element={<Mint />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myrelic" element={<MyRelic />} />
            <Route path="/lesson1" element={<Lesson1 />} />
          </Routes>
        </main>
      </div>
    </Web3Context.Provider>
  );
}