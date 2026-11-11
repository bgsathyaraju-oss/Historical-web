import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('trust proxy', true);

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
  // In AI Studio dev server mode (npm run dev), nginx owns 8080 and proxies to 3000
  if (process.env.npm_lifecycle_event === 'dev') {
    return 3000;
  }
  // In Cloud Run production (npm start / node server.ts), listen on process.env.PORT (8080)
  if (process.env.PORT) {
    const p = parseInt(process.env.PORT, 10);
    if (!isNaN(p)) return p;
  }
  return 3000;
}

const PORT = determinePort();

// Health check endpoints registered BEFORE any async initialization so Cloud Run startup probes succeed immediately
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

async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const indexFile = path.resolve(distPath, 'index.html');
  const hasDist = fs.existsSync(indexFile);

  // Production mode whenever dist/index.html exists and we are not running `npm run dev`
  const isProduction = process.env.npm_lifecycle_event !== 'dev' && hasDist;

  // 1. Bind HTTP port IMMEDIATELY (within <30ms of process start) so Cloud Run & Nginx probes never time out
  const srv = app.listen(PORT, '0.0.0.0', () => {
    console.log(
      `[SURYAVAMSHA PORTAL] Server listening in ${isProduction ? 'production' : 'development'} mode on http://0.0.0.0:${PORT}`
    );
    // If primary port is e.g. 8080 on Cloud Run, also bind 3000 opportunistically if free
    if (PORT !== 3000 && process.argv.indexOf('--port') === -1) {
      const secondary = app.listen(3000, '0.0.0.0', () => {
        console.log('[SURYAVAMSHA PORTAL] Secondary listener active on http://0.0.0.0:3000');
      });
      secondary.on('error', () => {
        // Ignore if 3000 is already bound
      });
    }
  });

  srv.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE' && PORT !== 3000) {
      console.warn(`[SURYAVAMSHA PORTAL] Port ${PORT} in use, falling back to port 3000...`);
      app.listen(3000, '0.0.0.0', () => {
        console.log('[SURYAVAMSHA PORTAL] Server running on fallback port 3000');
      });
    } else {
      console.error('Server listen error:', err);
    }
  });

  // 2. Gate non-health requests until routes and database are initialized
  let resolveAppReady!: () => void;
  const appReadyPromise = new Promise<void>((resolve) => {
    resolveAppReady = resolve;
  });

  app.use(async (_req, _res, next) => {
    await appReadyPromise;
    next();
  });

  // 3. Load application modules and (in dev) initialize Vite in parallel for sub-second cold start
  let seoModuleCache: typeof import('./src/utils/seoMetadata.ts') | null = null;
  const getSeoModule = () => {
    if (seoModuleCache) return Promise.resolve(seoModuleCache);
    return import('./src/utils/seoMetadata.ts').then(m => {
      seoModuleCache = m;
      return m;
    });
  };

  const viteServerPromise = !isProduction
    ? import('vite').then(({ createServer: createViteServer }) =>
        createViteServer({
          server: {
            middlewareMode: true,
            host: '0.0.0.0',
            port: PORT,
            allowedHosts: true,
            hmr: false,
            watch: null
          },
          appType: 'custom'
        })
      )
    : Promise.resolve(null);

  const [
    vite,
    { authMiddleware },
    { authRouter },
    { contentRouter },
    { communityRouter },
    { adminRouter },
    { searchRouter },
    { uploadRouter },
    { exportRouter },
    { getDb },
    { runMigrations }
  ] = await Promise.all([
    viteServerPromise,
    import('./server/auth.ts'),
    import('./server/routes/authRoutes.ts'),
    import('./server/routes/contentRoutes.ts'),
    import('./server/routes/communityRoutes.ts'),
    import('./server/routes/adminRoutes.ts'),
    import('./server/routes/searchRoutes.ts'),
    import('./server/routes/uploadRoutes.ts'),
    import('./server/routes/exportRoutes.ts'),
    import('./server/db.ts'),
    import('./server/migrate.ts')
  ]);

  // Warm up SEO module asynchronously in the background after core server is ready
  setTimeout(() => {
    getSeoModule().catch(() => {});
  }, 50);

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

  // Serve static uploaded documents, photos, and OG preview images
  app.use(
    '/uploads',
    express.static(path.resolve(__dirname, 'data', 'uploads'), {
      redirect: false,
      setHeaders: res => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=86400');
      }
    })
  );

  app.use(
    '/assets',
    express.static(path.resolve(__dirname, 'public', 'assets'), {
      redirect: false,
      setHeaders: res => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
      }
    })
  );

  // Security Headers
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
  app.get('/api/seo/preview', async (req, res) => {
    try {
      const { resolveSeoMetadata } = await getSeoModule();
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

  if (!isProduction && vite) {
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          try {
            const seoMod = seoModuleCache || (await Promise.race([
              getSeoModule(),
              new Promise<null>(r => setTimeout(() => r(null), 350))
            ]));
            if (seoMod) {
              const { resolveSeoMetadata, injectSeoMetadataIntoHtml } = seoMod;
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
              template = injectSeoMetadataIntoHtml(template, seoMeta);
            }
          } catch {
            // Serve transformed template immediately if SEO metadata is still warming up
          }
          res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(template);
          return;
        }
        next();
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const cachedRawHtml = fs.readFileSync(indexFile, 'utf-8');

    app.use(
      express.static(distPath, {
        index: false,
        redirect: false,
        setHeaders: res => {
          res.setHeader('Access-Control-Allow-Origin', '*');
        }
      })
    );

    app.get('*', async (req, res) => {
      try {
        const { resolveSeoMetadata, injectSeoMetadataIntoHtml } = await getSeoModule();
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
        const injectedHtml = injectSeoMetadataIntoHtml(cachedRawHtml, seoMeta);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).send(injectedHtml);
      } catch {
        res.sendFile(indexFile);
      }
    });
  }

  resolveAppReady();
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
