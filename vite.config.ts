import { resolve } from "node:path";

import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ["src/"],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "index.ts"),
      name: "ReactAsyncRunner",
      formats: ["es", "umd"],
      fileName: (format) => `react-async-runner.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(packageJson.peerDependencies),
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
        },
      },
    },
  },
});
