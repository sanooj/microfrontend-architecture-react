import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    plugins: [
      react(),
      federation({
        name: "remote_app",
        filename: "remoteEntry.js",
        inlineStyleLoader: true,
        // Expose components from the remote
        exposes: {
          "./Button": "./src/components/Button/Button",
        },
        // Shared dependencies between host and remotes
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^19.0.0",
            eager: !isProduction,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "^19.0.0",
            eager: !isProduction,
          },
        },
      }),
    ],
    css: {
      modules: {
        // Generate scoped class names for CSS modules
        generateScopedName: "[name]__[local]___[hash:base64:5]",
        // Ensure CSS modules are preserved in federation
        localsConvention: "camelCaseOnly",
      },
      // Disable extraction for better component bundling
      extract: false,
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      // Allow CSS to be properly handled
      cssCodeSplit: false,
      // Ensure CSS is included with the component
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          // Ensure proper chunking
          manualChunks: undefined,
          // Resolve name conflicts
          sanitizeFileName: (name) => {
            return name.replace(/[^\w\s]/g, "_");
          },
          // Simple asset file naming
          assetFileNames: "assets/[name]-[hash][extname]",
        },
        // External dependencies handling
        external: isProduction ? [] : ["react", "react-dom"],
      },
    },
    resolve: {
      dedupe: ["react", "react-dom"],
      extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
      alias: {
        "@": "/src",
      },
    },
  };
});
