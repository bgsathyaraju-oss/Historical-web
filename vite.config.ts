import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS === 'true' ? '/Historical-web/' : '/'),
    // Tailwind v4 plugin MUST precede @vitejs/plugin-react
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: [
        {
          find: /^@\/src\/(.*)/,
          replacement: path.resolve(import.meta.dirname || process.cwd(), 'src/$1'),
        },
        {
          find: /^@\/server\/(.*)/,
          replacement: path.resolve(import.meta.dirname || process.cwd(), 'server/$1'),
        },
        {
          find: /^@\/(.*)/,
          replacement: path.resolve(import.meta.dirname || process.cwd(), 'src/$1'),
        },
        {
          find: '@',
          replacement: path.resolve(import.meta.dirname || process.cwd(), 'src'),
        },
      ],
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 2500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase';
              }
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
