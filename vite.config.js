import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ethers5: "ethers", // Map ethers5 to ethers
    },
  },
  build: {
    rollupOptions: {
      external: ["ethers"], // Explicitly mark ethers as an external dependency
    },
  },
});
