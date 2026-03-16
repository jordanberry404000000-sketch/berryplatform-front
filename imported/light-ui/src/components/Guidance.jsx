import React from "react";

export default function Guidance({ state }) {
  let message = "";

  if (state === "noWallet") {
    message = "Connect your wallet to awaken your relic.";
  } else if (state === "mint") {
    message = "Mint your first relic. This is your proof you made it here.";
  } else if (state === "dashboard") {
    message = "This is your hub. Your relic, your progress, your next move.";
  } else if (state === "lesson1") {
    message = "Lesson 1 binds your relic to meaning, not just minting.";
  } else {
    message = "Stay in motion. The relic remembers.";
  }

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "12px 16px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #1b1b2f, #241b2f)",
        fontSize: "14px",
        color: "#ddd"
      }}
    >
      {message}
    </div>
  );
}