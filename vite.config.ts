import { resolve } from "path";
import { defineConfig } from "vitest/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  base: "./",
  build: {
    // docs: https://rollupjs.org/configuration-options/
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    outDir: "build",
  },
  resolve: {
    // Keep these in sync with "compilerOptions.paths" in tsconfig.json
    alias: {
      "@poc--typescript-web-game-framework": resolve(
        __dirname,
        "../poc--typescript-web-game-framework/src"
      ),
    },
  },
  test: {
    include: [],
    // docs: https://vitest.dev/guide/in-source.html#setup
    includeSource: ["src/**/*.ts"],
    passWithNoTests: true,
  },
  define: {
    // docs: https://vitest.dev/guide/in-source.html#production-build
    "import.meta.vitest": "undefined",
  },
});
