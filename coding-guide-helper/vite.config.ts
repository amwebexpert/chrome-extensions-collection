/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import version from "vite-plugin-package-version";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react(), version(), viteSingleFile()],
    define: {} as any,
  };

  return config;
});
