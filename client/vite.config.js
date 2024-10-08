import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get the current working directory
const currentWorkingDirectory = new URL(".", import.meta.url).pathname;
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
    port: 3004,
  },

  resolve: {
    alias: {
      "@": `${currentWorkingDirectory}/src`, // Set the base directory for your project
      "@styles": `${currentWorkingDirectory}/src/styles`,
      "@images": `${currentWorkingDirectory}/src/assets/images`,
      "@utils": `${currentWorkingDirectory}/src/utils`,
      "@api": `${currentWorkingDirectory}/src/api`,
      "@data": `${currentWorkingDirectory}/src/data`,
      "@context": `${currentWorkingDirectory}/src/context`,
      "@hooks": `${currentWorkingDirectory}/src/hooks`,
      "@provider": `${currentWorkingDirectory}/src/provider`,
      "@features": `${currentWorkingDirectory}/src/components/features`,
      "@reusable": `${currentWorkingDirectory}/src/components/reusable`,
      "@common": `${currentWorkingDirectory}/src/components/common`,
      "@auth": `${currentWorkingDirectory}/src/components/auth`,
      "@pages": `${currentWorkingDirectory}/src/pages`,
    },
  },
});
