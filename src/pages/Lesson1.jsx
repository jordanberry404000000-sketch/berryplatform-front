import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../App.jsx";
import Guidance from "../components/Guidance.jsx";

export default function Lesson1() {
  const { account } = useContext(Web3Context);
  const isConnected = !!account;

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLesson() {
      if (!isConnected) return;

      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/lesson/1");
        const data = await res.json();

        setLesson(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Lesson 1.");
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [isConnected]);

  async function completeLesson() {
    try {
      setComplete(true);

      await fetch("/api/lesson/1/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ account })
      });

    } catch (err) {
      console.error(err);
    }
  }

  if (!isConnected) {
    return (
      <div style={{ padding: "40px", color: "#e0e0ff" }}>
        <Guidance state="noWallet" />
      </div>
    );
  }

  if (loading) {
    return <p style={{ color: "#7df9ff" }}>Loading Lesson 1...</p>;
  }

  if (error) {
    return <p style={{ color: "#ff6b6b" }}>{error}</p>;
  }

  if (!lesson) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px",
        color: "#e0e0ff",
        fontFamily: "Orbitron, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "36px", color: "#7df9ff" }}>
        LESSON 1 — ORIGIN SIGNAL
      </h1>

      <Guidance state="lesson1" />

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "rgba(0, 20, 40, 0.6)",
          borderRadius: "12px",
          boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
          backdropFilter: "blur(6px)",
        }}
      >
        <h2 style={{ color: "#00eaff" }}>{lesson.title}</h2>
        <p style={{ marginTop: "10px", opacity: 0.9 }}>{lesson.body}</p>
      </div>

      {!complete ? (
        <button
          onClick={completeLesson}
          style={{
            marginTop: "30px",
            padding: "12px 24px",
            fontSize: "18px",
            background: "#00eaff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: "#000",
            boxShadow: "0 0 12px #00eaff",
          }}
        >
          Mark Lesson Complete
        </button>
      ) : (
        <p
          style={{
            marginTop: "30px",
            color: "#00ff9d",
            textShadow: "0 0 10px #00ff9d",
          }}
        >
          Lesson Complete — Movement Logged
        </p>
      )}
    </div>
  );
}