import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function androidWebViewCssCompatPlugin(): Plugin {
  return {
    name: 'android-webview-css-compat',
    enforce: 'post',
    generateBundle(_options, bundle) {
      for (const fileName of Object.keys(bundle)) {
        const asset = bundle[fileName];
        if (asset.type === 'asset' && fileName.endsWith('.css') && typeof asset.source === 'string') {
          // Remove 'in oklab' from Tailwind v4 gradient positions so Android WebViews < Chrome 111
          // do not drop linear-gradient() and make bg-clip-text headings invisible.
          asset.source = asset.source.replace(/\s+in\s+oklab\b/g, '');
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS === 'true' ? '/Historical-web/' : '/'),
    // Tailwind v4 plugin MUST precede @vitejs/plugin-react
    plugins: [tailwindcss(), react(), androidWebViewCssCompatPlugin()],
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
      target: ['es2020', 'chrome80', 'safari14'],
      cssTarget: ['chrome80', 'safari14'],
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
