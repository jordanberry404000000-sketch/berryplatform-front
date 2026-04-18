import React from "react";

export default function DocsRightPane({ headings = [] }) {
  return (
    <aside
      style={{
        width: "260px",
        borderLeft: "1px solid #e5e5e5",
        padding: "24px",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        background: "#ffffff",
      }}
    >
      {/* Page TOC */}
      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>On This Page</h3>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
        {headings.map((h, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <a
              href={`#${h.id}`}
              style={{
                color: "#333",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>

      {/* Quick Actions */}
      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Quick Actions</h3>
      <div style={{ marginBottom: "24px" }}>
        <button style={buttonStyle}>Copy Code</button>
        <button style={buttonStyle}>Open API Reference</button>
        <button style={buttonStyle}>View SDK Example</button>
        <button style={buttonStyle}>Report Issue</button>
      </div>

      {/* Metadata */}
      <h3 style={{ fontSize: "16px", marginBottom: "12px" }}>Document Info</h3>
      <p style={metaStyle}><strong>Version:</strong> 1.0.0</p>
      <p style={metaStyle}><strong>Updated:</strong> Today</p>
      <p style={metaStyle}><strong>API Level:</strong> Stable</p>

      {/* Governance Signals */}
      <h3 style={{ fontSize: "16px", marginTop: "24px", marginBottom: "12px" }}>
        Governance Signals
      </h3>
      <p style={metaStyle}><strong>Integrity Requirement:</strong> High</p>
      <p style={metaStyle}><strong>Chain-of-Custody:</strong> Required</p>
      <p style={metaStyle}><strong>Reproducibility:</strong> Mandatory</p>

      {/* Related Docs */}
      <h3 style={{ fontSize: "16px", marginTop: "24px", marginBottom: "12px" }}>
        Related Docs
      </h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><a href="/docs/api/minting" style={relatedLink}>Minting API</a></li>
        <li><a href="/docs/subsystems/forensic-engine" style={relatedLink}>Forensic Engine</a></li>
        <li><a href="/docs/forensics/hashing" style={relatedLink}>Hashing Standards</a></li>
        <li><a href="/docs/pbb/overview" style={relatedLink}>Powered by Berry Integration</a></li>
      </ul>
    </aside>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "8px",
  backgroundColor: "#222",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "600",
};

const metaStyle = {
  fontSize: "13px",
  color: "#555",
  marginBottom: "6px",
};

const relatedLink = {
  display: "block",
  padding: "6px 0",
  color: "#333",
  textDecoration: "none",
  fontSize: "14px",
};