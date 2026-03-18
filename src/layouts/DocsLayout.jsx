import React from "react";
import DocsSidebar from "../components/DocsSidebar";
import DocsRightPane from "../components/DocsRightPane";

export default function DocsLayout({ children, headings = [] }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        background: "#ffffff",
      }}
    >
      {/* Left Navigation */}
      <DocsSidebar />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: "40px 48px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>

      {/* Right Utility Pane */}
      <DocsRightPane headings={headings} />
    </div>
  );
}