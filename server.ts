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
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

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
  
  // Production when explicitly configured or running in Cloud Run container (K_SERVICE / non-dev mode with dist present)
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.K_SERVICE) ||
    process.env.npm_lifecycle_event === 'start' ||
    (hasDist && process.env.NODE_ENV !== 'development' && !process.env.TSX_TSCONFIG_PATH);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
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
