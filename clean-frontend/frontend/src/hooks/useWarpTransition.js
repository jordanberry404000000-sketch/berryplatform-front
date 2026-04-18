import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useWarpTransition = (warpSound) => {
  const navigate = useNavigate();

  const particleBurst = useCallback(() => {
    const count = 30;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const angle = Math.random() * Math.PI * 2;
      const distance = 200 + Math.random() * 200;

      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);

      document.body.appendChild(particle);

      setTimeout(() => particle.remove(), 600);
    }
  }, []);

  const navigateWithWarp = useCallback(
    (path) => {
      const wrapper = document.getElementById("transition-wrapper");

      warpSound.currentTime = 0;
      warpSound.play();

      particleBurst();

      wrapper.classList.add("warp-out");

      setTimeout(() => {
        navigate(path);
      }, 600);
    },
    [navigate, particleBurst, warpSound]
  );

  return navigateWithWarp;
};