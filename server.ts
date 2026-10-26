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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

function determinePort(): number {
  const portIndex = process.argv.indexOf('--port');
  if (portIndex !== -1 && process.argv[portIndex + 1]) {
    const p = parseInt(process.argv[portIndex + 1], 10);
    if (!isNaN(p)) return p;
  }
  // In development, the dev server must always bind to port 3000
  if (process.env.npm_lifecycle_event === 'dev' || process.env.NODE_ENV === 'development') {
    return 3000;
  }
  // In production outside of dev supervisor, use process.env.PORT
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
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(cookieParser());
app.use(authMiddleware);

// Serve static uploaded documents and photos securely
app.use('/uploads', express.static(path.resolve(__dirname, 'data', 'uploads')));

// Security Headers
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
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

// Full-stack Vite mounting
async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));
  
  // Production mode detection (never production if running dev script)
  const isProduction =
    process.env.npm_lifecycle_event !== 'dev' &&
    (process.env.NODE_ENV === 'production' ||
     process.env.npm_lifecycle_event === 'start' ||
     Boolean(process.env.K_SERVICE));

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
        hmr: false,
        watch: null,
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);

    // Fallback to transformIndexHtml for SPA routing in development
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        if (fs.existsSync(indexPath)) {
          let template = fs.readFileSync(indexPath, 'utf-8');
          template = await vite.transformIndexHtml(url, template);
          res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
          return;
        }
        next();
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SURYAVAMSHA PORTAL] Server running in ${isProduction ? 'production' : 'development'} mode on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
