import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { authMiddleware } from './server/auth.ts';
import { authRouter } from './server/routes/authRoutes.ts';
import { contentRouter } from './server/routes/contentRoutes.ts';
import { communityRouter } from './server/routes/communityRoutes.ts';
import { adminRouter } from './server/routes/adminRoutes.ts';
import { searchRouter } from './server/routes/searchRoutes.ts';
import { uploadRouter } from './server/routes/uploadRoutes.ts';
import { exportRouter } from './server/routes/exportRoutes.ts';
import { getDb } from './server/db.ts';
import { runMigrations } from './server/migrate.ts';
import {
  resolveSeoMetadata,
  injectSeoMetadataIntoHtml
} from './src/utils/seoMetadata.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function getRequestPublicOrigin(req: express.Request): string {
  const forwardedHost = (req.headers['x-forwarded-host'] as string | undefined)?.split(',')[0]?.trim();
  const host = forwardedHost || req.headers.host || '';
  if (!host) {
    return process.env.APP_URL || 'https://historical-web.web.app';
  }
  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(host)) {
    return `http://${host.replace(/^0\.0\.0\.0/, 'localhost')}`;
  }
  return `https://${host}`;
}

function determinePort(): number {
  const portIndex = process.argv.indexOf('--port');
  if (portIndex !== -1 && process.argv[portIndex + 1]) {
    const p = parseInt(process.argv[portIndex + 1], 10);
    if (!isNaN(p)) return p;
  }
  // When running behind the AI Studio nginx + control-plane proxy, nginx owns 8080 and proxies to 3000
  if (
    process.env.npm_lifecycle_event === 'dev' ||
    process.env.NODE_ENV === 'development' ||
    fs.existsSync('/app/control-plane-api/control-plane-api')
  ) {
    return 3000;
  }
  if (process.env.PORT) {
    const p = parseInt(process.env.PORT, 10);
    if (!isNaN(p)) return p;
  }
  return 3000;
}

const PORT = determinePort();

// Initialize database & run migrations on boot
try {
  runMigrations();
  getDb();
} catch (initErr) {
  console.error('[SURYAVAMSHA PORTAL] Initialization warning:', initErr);
}

// Middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(authMiddleware);

// Serve static uploaded documents, photos, and OG preview images with crawler-friendly CORS & caching headers
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, 'data', 'uploads'), {
    setHeaders: res => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  })
);

app.use(
  '/assets',
  express.static(path.resolve(__dirname, 'public', 'assets'), {
    setHeaders: res => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  })
);

// Security Headers (Note: do not set X-Frame-Options: SAMEORIGIN so AI Studio preview iframe works seamlessly)
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/content', contentRouter);
app.use('/api/community', communityRouter);
app.use('/api/admin', adminRouter);
app.use('/api/search', searchRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/export', exportRouter);

// Dynamic Social Sharing Preview & Open Graph Metadata Inspection Endpoint
app.get('/api/seo/preview', (req, res) => {
  try {
    const rawTargetUrl = (req.query.url as string | undefined) || '/';
    let pathname = rawTargetUrl;
    let search = '';
    if (rawTargetUrl.startsWith('http://') || rawTargetUrl.startsWith('https://')) {
      const parsed = new URL(rawTargetUrl);
      pathname = parsed.pathname;
      search = parsed.search;
    } else if (rawTargetUrl.includes('?')) {
      const qIdx = rawTargetUrl.indexOf('?');
      pathname = rawTargetUrl.slice(0, qIdx) || '/';
      search = rawTargetUrl.slice(qIdx);
    } else if (req.query.lang && !rawTargetUrl.includes('lang=')) {
      search = `?lang=${encodeURIComponent(String(req.query.lang))}`;
    }

    const dbArticles = getDb()?.articles || [];
    const origin = getRequestPublicOrigin(req);
    const meta = resolveSeoMetadata({
      pathname,
      search,
      origin,
      extraArticles: dbArticles
    });
    res.status(200).json(meta);
  } catch (err) {
    res.status(500).json({ error: 'Failed to resolve SEO metadata', detail: String(err) });
  }
});

// Health check endpoints for Cloud Run / Kubernetes probes
app.get(['/api/health', '/health', '/healthz', '/_health'], (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    project: 'Suryavamsha Odiyaraju Kshatriya Portal',
    timestamp: new Date().toISOString()
  });
});

// Process signal & exception handlers for graceful container lifecycle
process.on('SIGTERM', () => {
  console.log('[SURYAVAMSHA PORTAL] Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});
process.on('SIGINT', () => {
  console.log('[SURYAVAMSHA PORTAL] Received SIGINT, shutting down gracefully...');
  process.exit(0);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[SURYAVAMSHA PORTAL] Unhandled Rejection at:', promise, 'reason:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('[SURYAVAMSHA PORTAL] Uncaught Exception thrown:', err);
});

// Full-stack Vite mounting with immediate port binding to prevent 502 warmup timeouts
async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));
  
  // Production mode detection (never production if running dev script)
  const isProduction =
    process.env.npm_lifecycle_event !== 'dev' &&
    hasDist &&
    (process.env.NODE_ENV === 'production' ||
     process.env.npm_lifecycle_event === 'start');

  // Bind HTTP port immediately so Nginx/control-plane never sees ECONNREFUSED (502 warmup)
  const srv = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SURYAVAMSHA PORTAL] Server listening in ${isProduction ? 'production' : 'development'} mode on http://0.0.0.0:${PORT}`);
  });

  srv.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE' && PORT !== 3000) {
      console.warn(`[SURYAVAMSHA PORTAL] Port ${PORT} in use, falling back to port 3000...`);
      app.listen(3000, '0.0.0.0', () => {
        console.log(`[SURYAVAMSHA PORTAL] Server running on fallback port 3000`);
      });
    } else {
      console.error('Server listen error:', err);
    }
  });

  if (!isProduction) {
    let resolveViteReady!: () => void;
    const viteReadyPromise = new Promise<void>((resolve) => {
      resolveViteReady = resolve;
    });

    app.use(async (_req, _res, next) => {
      await viteReadyPromise;
      next();
    });

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        allowedHosts: true,
        hmr: false,
        watch: null,
      },
      appType: 'custom'
    });

    app.use(vite.middlewares);

    // Dynamic SEO & Open Graph HTML injection for SPA routes and social media crawlers in development
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          const qIdx = url.indexOf('?');
          const pathname = qIdx >= 0 ? url.slice(0, qIdx) : url;
          const search = qIdx >= 0 ? url.slice(qIdx) : '';
          const origin = getRequestPublicOrigin(req);
          const dbArticles = getDb()?.articles || [];
          const seoMeta = resolveSeoMetadata({
            pathname,
            search,
            origin,
            extraArticles: dbArticles
          });
          const injectedHtml = injectSeoMetadataIntoHtml(template, seoMeta);
          res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(injectedHtml);
          return;
        }
        next();
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    resolveViteReady();
  } else {
    app.use(
      express.static(distPath, {
        index: false,
        setHeaders: res => {
          res.setHeader('Access-Control-Allow-Origin', '*');
        }
      })
    );
    app.get('*', (req, res) => {
      const indexFile = path.resolve(distPath, 'index.html');
      try {
        const rawHtml = fs.readFileSync(indexFile, 'utf-8');
        const url = req.originalUrl || req.url || '/';
        const qIdx = url.indexOf('?');
        const pathname = qIdx >= 0 ? url.slice(0, qIdx) : url;
        const search = qIdx >= 0 ? url.slice(qIdx) : '';
        const origin = getRequestPublicOrigin(req);
        const dbArticles = getDb()?.articles || [];
        const seoMeta = resolveSeoMetadata({
          pathname,
          search,
          origin,
          extraArticles: dbArticles
        });
        const injectedHtml = injectSeoMetadataIntoHtml(rawHtml, seoMeta);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(injectedHtml);
      } catch {
        res.sendFile(indexFile);
      }
    });
  }
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
