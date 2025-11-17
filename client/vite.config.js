import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL,  // correct
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
  });
};
