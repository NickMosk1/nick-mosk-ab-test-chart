import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/nick-mosk-ab-test-chart/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@/shared": path.resolve(__dirname, "src/shared"),
      "@/modules": path.resolve(__dirname, "src/modules"),
    },
  },
});
