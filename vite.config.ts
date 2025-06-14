
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { federation } from '@module-federation/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    federation({
      name: 'host-app',
      filename: 'remoteEntry.js',
      remotes: {
        employeeApp: 'http://localhost:3001/assets/remoteEntry.js',
        analyticsApp: 'http://localhost:3002/assets/remoteEntry.js',
        vehicleApp: 'http://localhost:3003/assets/remoteEntry.js',
        designApp: 'http://localhost:3004/assets/remoteEntry.js',
        machineApp: 'http://localhost:3005/assets/remoteEntry.js',
        safetyApp: 'http://localhost:3006/assets/remoteEntry.js',
      },
      shared: {
        react: { 
          singleton: true,
          requiredVersion: '^18.3.1'
        },
        'react-dom': { 
          singleton: true,
          requiredVersion: '^18.3.1'
        },
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) => {
        // Don't bundle remote modules
        return id.includes('employeeApp') || 
               id.includes('analyticsApp') || 
               id.includes('vehicleApp') || 
               id.includes('designApp') || 
               id.includes('machineApp') || 
               id.includes('safetyApp');
      }
    }
  },
}));
