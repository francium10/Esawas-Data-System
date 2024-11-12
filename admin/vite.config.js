import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the Express server
      "/api": "http://localhost:8000",
    },
  },
});
