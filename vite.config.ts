import { resolve } from "path";
import { defineConfig } from "vitest/config";

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
  define: {
    // docs: https://vitest.dev/guide/in-source.html#production-build
    "import.meta.vitest": "undefined",
  },
  test: {
    include: [],
    // docs: https://vitest.dev/guide/in-source.html#setup
    includeSource: ["src/**/*.ts"],
  },
});
