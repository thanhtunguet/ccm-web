import path from "path";
import { defineConfig } from "vite";
import Markdown from "vite-plugin-react-markdown";
import ts from "vite-plugin-ts";
import tsNameof from "vite-plugin-ts-nameof";

const proxyConfig = {
  target: "http://localhost:5231",
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
    Markdown(),
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
