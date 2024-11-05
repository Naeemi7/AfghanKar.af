import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get the current working directory
const currentDir = new URL(".", import.meta.url).pathname;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },

  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      "@": `${currentDir}/src`, // Set the base directory for your project
      "@styles": `${currentDir}/src/styles`,
      "@images": `${currentDir}/src/assets/images`,
      "@utils": `${currentDir}/src/utils`,
      "@api": `${currentDir}/src/api`,
      "@data": `${currentDir}/src/data`,
      "@context": `${currentDir}/src/context`,
      "@hooks": `${currentDir}/src/hooks`,
      "@provider": `${currentDir}/src/provider`,
      "@features": `${currentDir}/src/components/features`,
      "@reusable": `${currentDir}/src/components/reusable`,
      "@dashboards": `${currentDir}/src/components/dashboards`,
      "@common": `${currentDir}/src/components/common`,
      "@sidebar": `${currentDir}/src/components/sidebar`,
      "@auth": `${currentDir}/src/components/auth`,
      "@pages": `${currentDir}/src/pages`,
      "@layouts": `${currentDir}/src/layouts`,
    },
  },
});
