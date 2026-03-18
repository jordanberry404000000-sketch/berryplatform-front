import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
  style={{
    padding: "48px 24px",
    background: "#080812",
    borderTop: "1px solid #1a1a1f",
    marginTop: "48px",
    color: "#d0d0d0",
    fontSize: "14px"
  }}
>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "40px",
      marginBottom: "40px"
    }}
  >
    {/** Column 1 */}
    <div>
      <h4 style={{ color: "#fff", marginBottom: "12px", fontSize: "16px" }}>
        Berry Platform™
      </h4>
      <Link to="/ethos" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Our Ethos</Link>
      <Link to="/founder" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Founder Statement</Link>
      <Link to="/berry-standard" style={{ color: "#999", display: "block", marginBottom: "6px" }}>The Berry Standard</Link>
    </div>

    {/** Column 2 */}
    <div>
      <h4 style={{ color: "#fff", marginBottom: "12px", fontSize: "16px" }}>
        Documentation
      </h4>
      <Link to="/whitepaper" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Whitepaper</Link>
      <Link to="/architecture" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Architecture Summary</Link>
      <Link to="/explorer" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Subsystem Explorer</Link>
      <Link to="/roadmap" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Public Roadmap</Link>
    </div>

    {/** Column 3 */}
    <div>
      <h4 style={{ color: "#fff", marginBottom: "12px", fontSize: "16px" }}>
        Governance & Trust
      </h4>
      <Link to="/isms" style={{ color: "#999", display: "block", marginBottom: "6px" }}>ISMS Public Library</Link>
      <Link to="/security" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Security Overview</Link>
      <Link to="/risk" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Risk Management</Link>
      <Link to="/compliance" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Compliance & Standards</Link>
    </div>

    {/** Column 4 */}
    <div>
      <h4 style={{ color: "#fff", marginBottom: "12px", fontSize: "16px" }}>
        Transparency
      </h4>
      <Link to="/transparency/data" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Data Handling</Link>
      <Link to="/transparency/crypto" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Cryptography Summary</Link>
      <Link to="/transparency/logging" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Logging & Monitoring</Link>
      <Link to="/transparency/ir" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Incident Response</Link>
    </div>

    {/** Column 5 */}
    <div>
      <h4 style={{ color: "#fff", marginBottom: "12px", fontSize: "16px" }}>
        Legal
      </h4>
      <Link to="/legal/terms" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Terms of Use</Link>
      <Link to="/legal/privacy" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Privacy Notice</Link>
      <Link to="/legal/cookies" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Cookie Policy</Link>

      <h4 style={{ color: "#fff", margin: "20px 0 12px", fontSize: "16px" }}>
        Contact
      </h4>
      <Link to="/contact/support" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Support</Link>
      <Link to="/contact/partnerships" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Partnerships</Link>
      <Link to="/contact/press" style={{ color: "#999", display: "block", marginBottom: "6px" }}>Press & Media</Link>
    </div>
  </div>

  <div
    style={{
      borderTop: "1px solid #1a1a1f",
      paddingTop: "16px",
      display: "flex",
      justifyContent: "space-between",
      color: "#666",
      fontSize: "13px"
    }}
  >
    <span>© {new Date().getFullYear()} Berry Platform™</span>
    <Link to="/status" style={{ color: "#999" }}>System Status</Link>
  </div>
</footer>