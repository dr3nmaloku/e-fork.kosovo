import { resolve } from "node:path";
import { defineConfig } from "vite";

const productPages = [
  "electric-forklift-1-5t",
  "electric-forklift-2-0t",
  "electric-forklift-2-5t",
  "electric-forklift-3-0t",
  "electric-forklift-3-5t",
  "electric-forklift-5-0t"
];

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        ...Object.fromEntries(
          productPages.map((slug) => [slug, resolve(__dirname, `products/${slug}.html`)])
        )
      }
    }
  }
});
