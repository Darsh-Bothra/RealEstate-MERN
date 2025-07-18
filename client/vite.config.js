import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,
        secure: false,
      },
    },
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this is set
  },
});