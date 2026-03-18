import React, { useState, useEffect } from "react";

export default function SystemStatus() {
  const [statusData, setStatusData] = useState(null);

  useEffect(() => {
    // Simulated system status fetch
    setTimeout(() => {
      setStatusData({
        overall: "Operational",
        subsystems: [
          { name: "Forensic Processing Engine", status: "Operational" },
          { name: "Metadata Integrity Layer", status: "Operational" },
          { name: "NFT Minting Engine", status: "Operational" },
          { name: "Logging & Monitoring", status: "Degraded Performance" },
          { name: "Governance Enforcement Layer", status: "Operational" },
          { name: "User Interaction Layer", status: "Operational" },
        ],
        lastUpdated: "Just now",
      });
    }, 1200);
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>BERRY PLATFORM™ — SYSTEM STATUS</h1>

      <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
        {`
Real-time operational transparency for all Berry Platform™ subsystems.

This page reflects Berry’s commitment to:
- visibility
- accountability
- forensic integrity
- zero-trust monitoring
- operational governance

If something breaks, Berry does not hide it.
Berry exposes it.
        `}
      </div>

      {/* Loading State */}
      {!statusData && (
        <div
          style={{
            marginTop: "32px",
            padding: "16px",
            background: "#f4f4f4",
            borderRadius: "6px",
            fontSize: "14px",
            color: "#333",
          }}
        >
          Retrieving live system status…
        </div>
      )}

      {/* Status Panel */}
      {statusData && (
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            border: "1px solid #e5e5e5",
            borderRadius: "8px",
            background: "#fafafa",
          }}
        >
          <h2>Overall System Status</h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color:
                statusData.overall === "Operational"
                  ? "green"
                  : statusData.overall === "Degraded Performance"
                  ? "#d98c00"
                  : "red",
            }}
          >
            {statusData.overall}
          </p>

          <h3 style={{ marginTop: "24px" }}>Subsystem Status</h3>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {statusData.subsystems.map((sub, index) => (
              <li
                key={index}
                style={{
                  padding: "12px 0",
                  borderBottom: "1px solid #e5e5e5",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{sub.name}</span>
                <span
                  style={{
                    fontWeight: "600",
                    color:
                      sub.status === "Operational"
                        ? "green"
                        : sub.status === "Degraded Performance"
                        ? "#d98c00"
                        : "red",
                  }}
                >
                  {sub.status}
                </span>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: "24px", fontSize: "12px", color: "#666" }}>
            Last updated: {statusData.lastUpdated}
          </p>
        </div>
      )}
    </div>
  );
}