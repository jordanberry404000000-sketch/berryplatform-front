import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function DocsSidebar() {
  const [open, setOpen] = useState({
    gettingStarted: true,
    architecture: true,
    subsystems: false,
    apis: false,
    sdk: false,
    poweredByBerry: false,
    forensic: false,
    tutorials: false,
    governance: false,
  });

  const toggle = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside
      style={{
        width: "260px",
        borderRight: "1px solid #e5e5e5",
        padding: "24px",
        height: "100vh",
        position: "sticky",
        top: 0,
        overflowY: "auto",
        background: "#fafafa",
      }}
    >
      <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
        Developer Docs
      </h2>

      {/* Section Helper */}
      const Section = ({ title, sectionKey, children }) => (
        <div style={{ marginBottom: "16px" }}>
          <div
            onClick={() => toggle(sectionKey)}
            style={{
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{title}</span>
            <span>{open[sectionKey] ? "−" : "+"}</span>
          </div>
          {open[sectionKey] && <div style={{ paddingLeft: "12px" }}>{children}</div>}
        </div>
      );

      return (
        <div>
          <Section title="Getting Started" sectionKey="gettingStarted">
            <Link to="/docs" style={linkStyle}>Overview</Link>
            <Link to="/docs/berry-standard" style={linkStyle}>The Berry Standard™</Link>
            <Link to="/docs/architecture" style={linkStyle}>Architecture Overview</Link>
            <Link to="/docs/ecosystem" style={linkStyle}>Powered by Berry™ Ecosystem</Link>
          </Section>

          <Section title="Architecture" sectionKey="architecture">
            <Link to="/docs/architecture/subsystems" style={linkStyle}>Subsystem Map</Link>
            <Link to="/docs/architecture/data-flow" style={linkStyle}>Data Flow</Link>
            <Link to="/docs/architecture/security" style={linkStyle}>Security Model</Link>
          </Section>

          <Section title="Subsystems" sectionKey="subsystems">
            <Link to="/docs/subsystems/forensic-engine" style={linkStyle}>Forensic Processing Engine</Link>
            <Link to="/docs/subsystems/metadata-layer" style={linkStyle}>Metadata Integrity Layer</Link>
            <Link to="/docs/subsystems/minting-engine" style={linkStyle}>NFT Minting Engine</Link>
            <Link to="/docs/subsystems/logging" style={linkStyle}>Logging & Monitoring</Link>
            <Link to="/docs/subsystems/governance" style={linkStyle}>Governance Enforcement</Link>
          </Section>

          <Section title="APIs" sectionKey="apis">
            <Link to="/docs/api/auth" style={linkStyle}>Authentication</Link>
            <Link to="/docs/api/minting" style={linkStyle}>Minting API</Link>
            <Link to="/docs/api/metadata" style={linkStyle}>Metadata API</Link>
            <Link to="/docs/api/forensics" style={linkStyle}>Forensic Verification API</Link>
            <Link to="/docs/api/status" style={linkStyle}>System Status API</Link>
          </Section>

          <Section title="SDKs" sectionKey="sdk">
            <Link to="/docs/sdk/js" style={linkStyle}>JavaScript SDK</Link>
            <Link to="/docs/sdk/node" style={linkStyle}>Node Utilities</Link>
            <Link to="/docs/sdk/cli" style={linkStyle}>CLI Tools</Link>
          </Section>

          <Section title="Powered by Berry" sectionKey="poweredByBerry">
            <Link to="/docs/pbb/overview" style={linkStyle}>Integration Overview</Link>
            <Link to="/docs/pbb/worlds" style={linkStyle}>Building Worlds</Link>
            <Link to="/docs/pbb/characters" style={linkStyle}>Character Minting</Link>
            <Link to="/docs/pbb/artefacts" style={linkStyle}>Artefact Minting</Link>
            <Link to="/docs/pbb/verification" style={linkStyle}>Verification Rules</Link>
          </Section>

          <Section title="Forensic Standards" sectionKey="forensic">
            <Link to="/docs/forensics/hashing" style={linkStyle}>Hashing Standards</Link>
            <Link to="/docs/forensics/metadata" style={linkStyle}>Metadata Structure</Link>
            <Link to="/docs/forensics/custody" style={linkStyle}>Chain of Custody</Link>
            <Link to="/docs/forensics/reproducibility" style={linkStyle}>Reproducibility</Link>
          </Section>

          <Section title="Tutorials" sectionKey="tutorials">
            <Link to="/docs/tutorials/mint-nft" style={linkStyle}>Mint Your First NFT</Link>
            <Link to="/docs/tutorials/verify" style={linkStyle}>Verify an NFT</Link>
            <Link to="/docs/tutorials/world" style={linkStyle}>Build a World</Link>
          </Section>

          <Section title="Governance" sectionKey="governance">
            <Link to="/docs/governance/structure" style={linkStyle}>Governance Structure</Link>
            <Link to="/docs/governance/policies" style={linkStyle}>Policies</Link>
            <Link to="/docs/governance/iso" style={linkStyle}>ISO Alignment</Link>
          </Section>
        </div>
      );
    </aside>
  );
}

const linkStyle = {
  display: "block",
  padding: "6px 0",
  color: "#333",
  textDecoration: "none",
  fontSize: "14px",
};