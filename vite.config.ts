import {defineConfig} from "vite";
import path from "path";
import ts from "vite-plugin-ts";
import tsNameof from "vite-plugin-ts-nameof";

const proxyConfig = {
  // target: "http://localhost:5231",
  target: "https://ccm-dev.thanhtunguet.info",
  changeOrigin: true,
};

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
      "/api": proxyConfig,
      "/swagger": proxyConfig,
    },
  },
});
