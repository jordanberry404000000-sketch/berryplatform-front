import React from "react";
import { useWarpTransition } from "../hooks/useWarpTransition";
import warpSoundFile from "../assets/warp.mp3";

export default function NeonWarpButton({ to, children, style = {} }) {
  const warpSound = new Audio(warpSoundFile);
  const navigateWithWarp = useWarpTransition(warpSound);

  return (
    <button
      onClick={() => navigateWithWarp(to)}
      className="neon-warp-button"
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        background: "#00eaff",
        color: "#000",
        fontSize: "16px",
        cursor: "pointer",
        boxShadow: "0 0 12px #00eaff",
        border: "none",
        transition: "0.2s ease",
        ...style
      }}
    >
      {children}
    </button>
  );
}