import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Guidance from "../components/Guidance.jsx";
import { BERRY_BACKEND_URL } from "../config.js";

export default function Lesson1() {
  const [updating, setUpdating] = useState(false);
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const completeLesson = async () => {
    try {
      setUpdating(true);

      const tokenId = window.localStorage.getItem("berry_token_id") || 1; // placeholder

      await fetch(`${BERRY_BACKEND_URL}/api/updateMetadata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId,
          progress: ["lesson1"]
        })
      });

      setCompleted(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Lesson completion failed:", err);
      alert("Lesson completion failed. Check console.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ maxWidth: "640px", margin: "0 auto" }}>
      <h1>Lesson 1 — Relic as Proof</h1>
      <p style={{ color: "#aaa", fontSize: "14px" }}>
        This lesson binds your relic to more than a mint. It becomes your record of survival and discipline.
      </p>

      <Guidance state="lesson1" />

      {!completed && (
        <button
          onClick={completeLesson}
          disabled={updating}
          style={{
            marginTop: "24px",
            padding: "12px 20px",
            borderRadius: "999px",
            border: "none",
            background: updating ? "#444" : "#20bf6b",
            color: "#fff",
            fontWeight: 600,
            cursor: updating ? "default" : "pointer"
          }}
        >
          {updating ? "Updating your relic…" : "Complete Lesson"}
        </button>
      )}

      {completed && (
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#20bf6b" }}>
          Lesson completed — returning to dashboard…
        </p>
      )}
    </div>
  );
}