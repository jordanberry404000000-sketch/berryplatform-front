import React from "react";

export default function Landing() {
  return (
    <div style={{ color: "#f5f5f5", background: "#050510", paddingBottom: "4rem" }}>

      {/* Logo Placeholder */}
      <section style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{
          display: "inline-block",
          padding: "1rem 2rem",
          border: "1px solid #ff4b8b",
          borderRadius: "12px",
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "1px"
        }}>
          BERRY
        </div>
      </section>

      {/* Identity Block */}
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>BERRY IS HERE</h1>
        <p style={{ fontSize: "1.25rem", opacity: 0.8 }}>
          Forensic systems. Transparent architecture. Built for real people.
        </p>
        <hr style={{ margin: "2rem auto", width: "60%", opacity: 0.2 }} />
      </section>

      {/* Ethos */}
      <section style={{ padding: "2rem 2rem" }}>
        <h2>The Berry Ethos</h2>
        <p>
          Berry exists to bring forensic clarity to crypto. No black boxes. No silent
          failures. Just transparent systems, modular engines, and user-first design.
        </p>
      </section>

      {/* Movement Update */}
      <section style={{ padding: "2rem 2rem", background: "#111" }}>
        <h2>Today’s Update — 20 February</h2>
        <p>
          Brand identity is now being added to the platform. The first relics, visual
          elements, and structural components are being introduced. Berry is moving
          forward exactly as planned.
        </p>
      </section>

      {/* Relic Preview */}
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Your First Relic</h2>
        <p style={{ opacity: 0.8 }}>
          Relics are coming soon — modular, inspectable, and tied to your on‑chain identity.
        </p>
        <div style={{
          margin: "2rem auto",
          width: "120px",
          height: "120px",
          borderRadius: "12px",
          border: "1px solid #444",
          background: "#0a0a15"
        }}></div>
      </section>

      {/* Roadmap Strip */}
      <section style={{ padding: "2rem", background: "#0a0a15" }}>
        <h2>What’s Coming Next</h2>
        <ul style={{ opacity: 0.8, lineHeight: "1.8" }}>
          <li>Berry Logo & Visual Identity</li>
          <li>Relic System Preview</li>
          <li>Dashboard Visual Overhaul</li>
          <li>Berry AI Integration</li>
        </ul>
      </section>

      {/* Hero */}
      <section style={{ padding: "3rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: 800 }}>
          Berry Platform
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.8, maxWidth: "600px", margin: "0 auto" }}>
          Forensic clarity. Transparent systems. Built for real people — not just developers.
        </p>
      </section>

      {/* Founder Notice */}
      <section style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>A message from the founder</h2>

        <p>
          Berry is live, stable, and moving forward. If you’ve seen the situation on X —
          yes, we’re dealing with it. No, it doesn’t affect Berry, Berry AI, or any of the
          forensic engines that power the platform.
        </p>

        <p>
          I want to personally apologise for any temporary disruption or slower‑than‑usual
          updates. I’m currently navigating an external account‑access issue with a UK
          fintech provider — the exact kind of situation that proves why platforms like
          Berry need to exist in the first place.
        </p>

        <p>
          While I handle that, the mission continues exactly as planned. Berry’s architecture,
          modules, and forensic systems remain unaffected and continue to operate as designed.
        </p>

        <p style={{ fontWeight: "bold", marginTop: "1rem" }}>
          — Jordan Berry, Founder
        </p>
      </section>

      {/* Why Berry Exists */}
      <section style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Why Berry Exists</h2>

        <p>
          Berry was created to solve a problem that shouldn’t exist in crypto: a lack of
          transparency, accountability, and user‑first design. Too many platforms hide
          behind closed systems, single‑channel support, and opaque processes.
        </p>

        <p>
          When something goes wrong, users are left stranded — unable to access their data,
          their funds, or even a human being who can help. Berry exists to be the opposite
          of that.
        </p>

        <p>
          We’re building a platform where data is forensic, support is multi‑channel,
          systems are modular and auditable, and users stay in control of their own
          information.
        </p>

        <p>
          Berry isn’t just another crypto tool. It’s a platform designed from day one to be
          trustworthy, inspectable, and built for real people. Berry AI extends that mission
          with intelligent, transparent, user‑controlled automation — never black‑box logic.
        </p>
      </section>

      {/* Subtle Explorer Link */}
<div style={{ marginTop: "4rem", textAlign: "center" }}>
  <a
    href="/Explorer"
    style={{
      color: "#888",
      fontSize: "0.9rem",
      letterSpacing: "0.5px",
      opacity: 0.6,
      textDecoration: "none",
      transition: "opacity 0.3s ease, color 0.3s ease"
    }}
    onMouseEnter={(e) => {
      e.target.style.opacity = 1;
      e.target.style.color = "#fff";
    }}
    onMouseLeave={(e) => {
      e.target.style.opacity = 0.6;
      e.target.style.color = "#888";
    }}
  >
    explore the system →
  </a>
</div>

    </div>
  );
}
