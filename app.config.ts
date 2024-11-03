import { defineConfig } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  ssr: false,
  server: {
    static: true
  },
  vite: {
    plugins: [
      VitePWA({
        includeAssets: ['favicon.ico'],
        devOptions: {
          enabled: true
        }
      })
    ]
  }
});
