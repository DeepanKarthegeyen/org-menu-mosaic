
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { federation } from '@module-federation/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'employeeApp',
      filename: 'remoteEntry.js',
      exposes: {
        './EmployeeModule': './src/modules/employee-app/src/index.ts',
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
    outDir: 'dist/employee-app',
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  server: {
    port: 3001,
    host: '::',
  },
});
