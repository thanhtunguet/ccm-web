import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import path from "path";
import tsNameof from "vite-plugin-ts-nameof";

export default defineConfig({
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "src"),
      "package.json": path.resolve(__dirname, "package.json"),
    },
  },
  plugins: [
    tsNameof(),
    babel({
      babelConfig: {
        babelrc: false,
        configFile: false,
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            {
              loose: true,
              decoratorsBeforeExport: true,
            },
          ],
        ],
      },
    }),
  ],
  server: {
    proxy: {
      // Using the proxy instance
      "/api": {
        target: "http://localhost:3000",
        // target: "https://ccm-dev.thanhtunguet.info",
        changeOrigin: true,
      },
    },
  },
});
