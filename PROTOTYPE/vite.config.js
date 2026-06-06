import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Front-end-only prototype. No backend, no env, no API proxy — everything is mocked
// in React memory. base: "./" keeps asset paths relative so the static build works on
// any host (Vercel, GitHub Pages, local preview).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
});
