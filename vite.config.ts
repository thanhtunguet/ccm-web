import {defineConfig} from "vite";
import path from "path";
import ts from "vite-plugin-ts";
import tsNameof from "vite-plugin-ts-nameof";

export default defineConfig({
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "src"),
      "package.json": path.resolve(__dirname, "package.json"),
    },
  },
  plugins: [
    ts(),
    tsNameof(),
  ],
  server: {
    proxy: {
      // Using the proxy instance
      "/api": {
        // target: "http://localhost:3000",
        target: "https://ccm-dev.thanhtunguet.info",
        changeOrigin: true,
      },
      "/swagger": {
        // target: "http://localhost:3000",
        target: "https://ccm-dev.thanhtunguet.info",
        changeOrigin: true,
      },
    },
  },
});
