import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // automatically open the app in the browser
    host: true, // expose the server to the local network
  },
  build: {
    outDir: "dist", // output directory for build
  },
});
