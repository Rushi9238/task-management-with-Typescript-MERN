import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
   server: {
    proxy: {
      '/api': {
        target: 'https://task-management-i91p.onrender.com',
        changeOrigin: true,
      },
    },
  },
    build: {
    outDir: 'dist',
    sourcemap: false
  },
  base: './' // Important for proper asset loading in production
});
