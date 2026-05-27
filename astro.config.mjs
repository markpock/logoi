import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import remarkDirective from "remark-directive";
import rehypeKatex from "rehype-katex";
import remarkCallouts from "./src/markdown/remarkCallouts.mjs";
import { BASE_PATH, SITE_URL } from "./src/site.config.mjs";

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "github-dark",
      langs: ["astro", "bash", "css", "html", "javascript", "json", "markdown", "python", "typescript"],
      langAlias: {
        js: "javascript",
        py: "python",
        sh: "bash",
        ts: "typescript",
      },
    },
    gfm: true,
    remarkPlugins: [remarkMath, remarkDirective, remarkCallouts],
    rehypePlugins: [rehypeKatex],
  },
});
