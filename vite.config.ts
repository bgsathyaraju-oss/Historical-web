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
  const rawBase = process.env.VITE_BASE_PATH?.trim() || '/';
  const withLeadingSlash = rawBase.startsWith('/') ? rawBase : `/${rawBase}`;
  const normalizedBase = withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;

  return {
    base: normalizedBase,
    // Tailwind v4 plugin MUST precede @vitejs/plugin-react
    plugins: [tailwindcss(), react(), androidWebViewCssCompatPlugin()],
    resolve: {
      dedupe: ['react', 'react-dom'],
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
    optimizeDeps: {
      entries: ['index.html', 'src/**/*.{ts,tsx}'],
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'lucide-react',
        'jspdf',
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
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
      allowedHosts: true,
      // HMR is disabled in AI Studio environment to prevent port conflicts and flickering.
      hmr: false,
      watch: null,
    },
  };
});
