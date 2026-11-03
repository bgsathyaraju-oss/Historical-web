import { Router, type Request, type Response } from 'express';
import path from 'node:path';
import fs from 'node:fs';

export const exportRouter = Router();

const ROOT_DIR = process.cwd();

const ANDROID_SETUP_GUIDE = `# Running Suryavamsha Portal on an Android Phone (Free & Complete)

This guide shows you step-by-step how to run this full-stack portal on any Android phone using Termux, or how to push it to GitHub for free cloud hosting.

---

## Method 1: Run Locally on Android via Termux

Termux is a free, open-source Linux terminal emulator for Android that can run Node.js and Express locally without root access.

### Step 1: Install Termux
1. Download and install **Termux** from **F-Droid** (recommended: https://f-droid.org/packages/com.termux/) or GitHub Releases. (Avoid outdated Play Store versions).
2. Open Termux on your Android phone.

### Step 2: Install Node.js & Git
Run these commands in Termux:
\`\`\`bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
\`\`\`
Verify installation:
\`\`\`bash
node -v
npm -v
\`\`\`

### Step 3: Extract the Project ZIP
1. When you download the ZIP file on your phone, it usually saves in your \`/sdcard/Download\` folder.
2. Grant Termux storage permission:
\`\`\`bash
termux-setup-storage
\`\`\`
3. Create a project folder and copy the ZIP file:
\`\`\`bash
mkdir -p ~/suryavamsha-portal
cd ~/suryavamsha-portal
cp /sdcard/Download/suryavamsha-odiyaraju-kshatriya-portal.zip .
unzip suryavamsha-odiyaraju-kshatriya-portal.zip
\`\`\`

### Step 4: Install Dependencies & Boot
\`\`\`bash
npm install
npm run dev
\`\`\`
The portal will start on \`http://localhost:3000\`.

### Step 5: Open in Mobile Browser
Open Chrome, Firefox, or Samsung Internet on your Android phone and navigate to:
\`\`\`
http://localhost:3000
\`\`\`
The full portal—with all 8 languages, historical monographs, genealogy viewer, inscriptions, and member directory—will run directly on your phone!

---

## Method 2: Export & Host Free on GitHub & Cloud Run / Render / Vercel

### Step 1: Create a Free GitHub Repository
1. Log in to [GitHub](https://github.com) on your phone or computer.
2. Tap **New repository**, name it \`suryavamsha-portal\`, and select **Public** or **Private**.
3. Do not check "Add README".

### Step 2: Push Your Code to GitHub
In Termux or on your computer terminal:
\`\`\`bash
git init
git add .
git commit -m "Initial commit of Suryavamsha Odiyaraju Kshatriya Portal"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/suryavamsha-portal.git
git push -u origin main
\`\`\`

### Step 3: Free 1-Click Hosting Options
- **Render.com / Railway.app**: Connect your GitHub repo, set Build Command to \`npm install && npm run build\`, and Start Command to \`npm start\`.
- **Vercel / Netlify**: Build frontend using standard Vite SPA configuration.
`;

const SETUP_INSTRUCTIONS = `# SURYAVAMSHA ODIYARAJU KSHATRIYA PORTAL
## Quickstart & Setup Instructions (PC / Mac / Linux / Cloud)

### Prerequisites
- Node.js (version 20 or higher recommended)
- npm or bun

### Step 1: Installation
\`\`\`bash
npm install
\`\`\`

### Step 2: Run Database Migration
Initialize tables and pre-seeded research records:
\`\`\`bash
npm run migrate
\`\`\`

### Step 3: Launch Full-Stack Server
\`\`\`bash
npm run dev
\`\`\`
Access the application at \`http://localhost:3000\`.

### Step 4: Run Automated Verification Tests
Validate authentication, RBAC, 8-language translations, epigraphs, and privacy rules:
\`\`\`bash
npm test
\`\`\`

### Pre-Seeded Accounts for Testing:
- **Super Administrator**: \`admin@suryavamsha-heritage.org\` / \`Heritage@2026\`
- **Historical Editor**: \`historian.editor@suryavamsha-heritage.org\` / \`Heritage@2026\`
- **Registered Member**: \`researcher.odra@suryavamsha-heritage.org\` / \`Heritage@2026\`
`;

// GET /api/export/project-zip - Streams complete project ZIP package
export const exportZipHandler = async (_req: Request, res: Response) => {
  try {
    const archiverMod: any = await import('archiver');
    const ZipArchive = archiverMod.ZipArchive || archiverMod.default;
    const archive = new ZipArchive({
      zlib: { level: 9 } // Maximum compression
    });

    const zipFilename = `suryavamsha-odiyaraju-kshatriya-portal.zip`;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${zipFilename}"`);

    archive.on('error', (err: any) => {
      console.error('Archiving error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Failed to generate ZIP archive.' });
      }
    });

    archive.pipe(res);

    // Append documentation files generated dynamically
    archive.append(ANDROID_SETUP_GUIDE, { name: 'ANDROID_SETUP_GUIDE.md' });
    archive.append(SETUP_INSTRUCTIONS, { name: 'SETUP_INSTRUCTIONS.md' });

    // Files to include from root
    const rootFiles = [
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'index.html',
      'metadata.json',
      '.env.example',
      'README.md',
      'server.ts'
    ];

    for (const file of rootFiles) {
      const fullPath = path.resolve(ROOT_DIR, file);
      if (fs.existsSync(fullPath)) {
        archive.file(fullPath, { name: file });
      }
    }

    // Folders to include
    const foldersToInclude = [
      'src',
      'server',
      'tests',
      'data'
    ];

    for (const folder of foldersToInclude) {
      const fullFolderPath = path.resolve(ROOT_DIR, folder);
      if (fs.existsSync(fullFolderPath)) {
        archive.directory(fullFolderPath, folder, (entry: any) => {
          // Skip node_modules or large temporary cache files if any
          if (entry.name && (entry.name.includes('node_modules') || entry.name.endsWith('.log'))) {
            return false;
          }
          return entry;
        });
      }
    }

    archive.finalize();
  } catch (err) {
    console.error('ZIP export initialization error:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'ZIP export service unavailable.' });
    }
  }
};

exportRouter.get('/project-zip', exportZipHandler);

// GET /api/export/instructions - Get markdown instructions
exportRouter.get('/instructions', (_req: Request, res: Response) => {
  res.json({
    android_guide: ANDROID_SETUP_GUIDE,
    setup_guide: SETUP_INSTRUCTIONS
  });
});

interface CachedPdfEntry {
  buffer: Buffer;
  filename: string;
  createdAt: number;
}

const pdfDownloadCache = new Map<string, CachedPdfEntry>();
const PDF_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes for reliable Android WebView -> Chrome handoff

function cleanupPdfCache() {
  const now = Date.now();
  for (const [key, entry] of pdfDownloadCache.entries()) {
    if (now - entry.createdAt > PDF_CACHE_TTL_MS) {
      pdfDownloadCache.delete(key);
    }
  }
  // Cap maximum entries to 60
  if (pdfDownloadCache.size > 60) {
    const oldestKey = pdfDownloadCache.keys().next().value;
    if (oldestKey) pdfDownloadCache.delete(oldestKey);
  }
}

function buildContentDispositionHeader(filename: string): string {
  const cleanName = (filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
    .replace(/[\r\n"]/g, '')
    .trim();
  const baseWithoutExt = cleanName.replace(/\.pdf$/i, '');

  // Strip non-ASCII characters to check if a meaningful ASCII-only name exists
  const asciiCandidateBase = baseWithoutExt
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/["\\<>:|?*]+/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[\-_.\s]+|[\-_.\s]+$/g, '');

  // Only use asciiCandidateBase if it contains at least 3 ASCII letters (never allow bare digits like "3.pdf" or "_-_.pdf")
  const asciiLettersCount = (asciiCandidateBase.match(/[A-Za-z]/g) || []).length;
  const safeAscii =
    asciiLettersCount >= 3
      ? `${asciiCandidateBase}.pdf`
      : 'Suryavamsha-Historical-Article.pdf';

  const encodedUtf8 = encodeURIComponent(cleanName)
    .replace(/['()]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)
    .replace(/\*/g, '%2A');

  // If the filename is pure ASCII with letters, both filename and filename* match;
  // if it contains Kannada/Indic script characters, filename*=UTF-8'' carries the full native script title
  // while filename="..." never falls back to a broken numeric fragment like "3.pdf".
  return `attachment; filename="${safeAscii}"; filename*=UTF-8''${encodedUtf8}`;
}

// POST /api/export/prepare-pdf - Stores generated PDF binary for native browser / Android Download Manager saving
exportRouter.post('/prepare-pdf', (req: Request, res: Response) => {
  try {
    cleanupPdfCache();
    const { pdfBase64, filename } = req.body || {};
    if (!pdfBase64 || typeof pdfBase64 !== 'string') {
      res.status(400).json({ error: 'Missing pdfBase64 payload.' });
      return;
    }

    const rawBase64 = pdfBase64.replace(/^data:application\/pdf[^,]*,/, '');
    const buffer = Buffer.from(rawBase64, 'base64');
    if (buffer.length === 0) {
      res.status(400).json({ error: 'Empty PDF payload.' });
      return;
    }

    const rawTrimmed = typeof filename === 'string' ? filename.trim() : '';
    const hasValidLetters = /[A-Za-z\u0900-\u0DFF]/.test(rawTrimmed.replace(/\.pdf$/i, ''));
    const safeFilename =
      rawTrimmed && hasValidLetters
        ? rawTrimmed.endsWith('.pdf')
          ? rawTrimmed
          : `${rawTrimmed}.pdf`
        : 'Suryavamsha-Historical-Article.pdf';

    const token = `pdf_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    pdfDownloadCache.set(token, {
      buffer,
      filename: safeFilename,
      createdAt: Date.now()
    });

    res.status(200).json({
      token,
      filename: safeFilename,
      downloadUrl: `/api/export/download-pdf/${encodeURIComponent(token)}/${encodeURIComponent(safeFilename)}`
    });
  } catch (err) {
    console.error('[PDF EXPORT] Failed to prepare PDF download:', err);
    res.status(500).json({ error: 'Failed to prepare PDF download.' });
  }
});

// GET /api/export/download-pdf/:token/:filename - Streams the PDF binary as a file attachment
exportRouter.get('/download-pdf/:token/:filename?', (req: Request, res: Response) => {
  cleanupPdfCache();
  const { token, filename: paramFilename } = req.params;
  const entry = pdfDownloadCache.get(token);
  if (!entry) {
    res.status(404).send('PDF download link has expired. Please click Download PDF again.');
    return;
  }

  const effectiveFilename =
    paramFilename && /[A-Za-z\u0900-\u0DFF]/.test(paramFilename.replace(/\.pdf$/i, ''))
      ? paramFilename
      : entry.filename;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', String(entry.buffer.length));
  res.setHeader('Content-Disposition', buildContentDispositionHeader(effectiveFilename));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'private, max-age=1800');
  res.status(200).send(entry.buffer);
});

