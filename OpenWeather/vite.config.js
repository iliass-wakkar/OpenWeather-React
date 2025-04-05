import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    basicSsl(), // This will generate a self-signed certificate
  ],
  server: {
    host: "0.0.0.0",
    port: 5174,
    strictPort: true,
    https: true, // Enable HTTPS
  },
});
