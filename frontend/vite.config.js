// import path from "path";
// import { fileURLToPath } from "url";
// import react from "@vitejs/plugin-react";
// import { defineConfig } from "vite";

// // Simulating __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
      
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// });
// export default {
//   server: {
//       proxy: {
//           '/api': {
//               target: 'http://localhost:8000',
//               changeOrigin: true,
//               rewrite: (path) => path.replace(/^\/api/, ''),
//           },
//       },
//   },
// };
// Import necessary modules
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Simulating __dirname and __filename for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export the Vite configuration
export default defineConfig(({ mode }) => {
  return {
    // Plugins section
    plugins: [react()], // Add support for React and JSX syntax

    // Path aliasing
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Use "@" as shorthand for "./src"
      },
    },

    // Server settings for development
    server: {
      // port: 3000, // Development server runs on port 3000
      proxy: {
        // Proxy API requests during development
        "/api": {
          target: "http://localhost:8000", // Backend server address
          changeOrigin: true, // Adjust the origin of the request
         // rewrite: (path) => path.replace(/^\/api/, ""), // Remove "/api" prefix if needed
        },
      },
    },

    // Build settings for production
    build: {
      sourcemap: true, // Enable source maps for easier debugging
      outDir: "dist", // Output directory for the build files
    },

    // Custom environment-specific behavior (optional)
    define: {
      __DEV__: mode === "development", // Add global variable for development mode
    },
  };
});
