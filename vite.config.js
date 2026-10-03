import { resolve } from "node:path";
import { defineConfig } from "vite";

const productPages = [
  "ef-cpd40-3t-lithium",
  "best-value-electric-forklift",
  "fast-delivery-lithium-3t-5t",
  "small-electric-forklift-15t-4t",
  "fast-delivery-60v-mini",
  "professional-electric-forklift-1t-4t",
  "new-electric-forklift-3t-6m",
  "diesel-rough-terrain-3t-5t",
  "hydraulic-forklift-25t-4t",
  "warehouse-electric-1t-3t-5m",
  "60v-small-electric-2t-5t",
  "2000kg-electric-pallet-stackers",
  "full-electric-stacker-1000kg-2000kg",
  "electric-pallet-stacker-self-loading",
  "ce-walking-semi-electric-stacker",
  "full-electric-self-loading-stacker",
  "electric-reach-stacker-12t-2t",
  "mini-self-loading-electric-stacker",
  "semi-pallet-reach-forklift"
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



