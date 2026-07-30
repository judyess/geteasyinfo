import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Proxies /api requests to the Flask backend so the frontend
// can just call fetch("/api/...") with no CORS headaches.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
