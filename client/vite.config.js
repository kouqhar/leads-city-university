import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  // Load env vars based on current mode (development, production, etc.)
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        // Proxy API requests
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: mode !== "development",
          rewrite: (path) => path.replace(/^\//, ""),
        },
      },
    },
  });
};
