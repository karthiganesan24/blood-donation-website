import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import { resolve } from "path";

function ssgPlugin(): Plugin {
  return {
    name: "ssg",
    // Runs after the client build writes index.html to dist/
    async closeBundle() {
      // Only run during the client build (not SSR sub-build)
      if ((this as { meta?: { watchMode?: boolean } }).meta?.watchMode) return;

      const { createServer } = await import("vite");
      const { readFileSync, writeFileSync } = await import("fs");

      const root = resolve(process.cwd());
      const vite = await createServer({
        root,
        server: { middlewareMode: true },
        appType: "custom",
      });

      try {
        const { render } = (await vite.ssrLoadModule(
          "/src/entry-server.tsx"
        )) as { render: () => string };

        const appHtml = render();
        const template = readFileSync(resolve(root, "dist/index.html"), "utf-8");
        const result = template.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );
        writeFileSync(resolve(root, "dist/index.html"), result, "utf-8");
        console.log("\x1b[32m✓\x1b[0m SSG pre-render complete.");
      } finally {
        await vite.close();
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), ssgPlugin()],
});
