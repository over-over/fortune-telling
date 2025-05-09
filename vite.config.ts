import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "fortune-telling",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
