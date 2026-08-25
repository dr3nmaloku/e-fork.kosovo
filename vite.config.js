import { resolve } from "node:path";
import { defineConfig } from "vite";

const productPages = [
  "linya-cpd-40-3t-lithium",
  "linya-best-value-electric-forklift",
  "linya-fast-delivery-lithium-3t-5t",
  "linya-china-factory-sale-15t-4t",
  "linya-fast-delivery-60v-mini",
  "linya-professional-manufacturer-1t-4t"
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
