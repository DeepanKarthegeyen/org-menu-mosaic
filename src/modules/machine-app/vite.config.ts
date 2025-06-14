
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'machineApp',
      filename: 'remoteEntry.js',
      exposes: {
        './MachineModule': './src/modules/machine-app/src/index.ts',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.3.1' },
        'react-dom': { singleton: true, requiredVersion: '^18.3.1' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../'),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist/machine-app',
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  server: {
    port: 3005,
    host: '::',
  },
});
