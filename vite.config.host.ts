
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { federation } from '@module-federation/vite';
import { remoteUrls } from './src/config/environmentConfig';

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
        employeeApp: remoteUrls.employeeApp,
        analyticsApp: remoteUrls.analyticsApp,
        vehicleApp: remoteUrls.vehicleApp,
        designApp: remoteUrls.designApp,
        machineApp: remoteUrls.machineApp,
        safetyApp: remoteUrls.safetyApp,
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
    outDir: 'dist/host-app',
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
