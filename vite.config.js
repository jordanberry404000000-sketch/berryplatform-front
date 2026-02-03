import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
  allowedHosts: [
    "uzsse-151-228-200-224.a.free.pinggy.link"
  ]
}