import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api':{
        // target: "http://127.0.0.1:8787",
        target: "https://atm-visualizer-server.kienthuc4701.workers.dev",
        changeOrigin:true 
      }
    }
  }
});
