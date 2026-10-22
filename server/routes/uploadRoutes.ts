import { Router, type Response } from 'express';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { type AuthenticatedRequest } from '../auth.ts';
import { addAuditLog } from '../db.ts';

export const uploadRouter = Router();

const UPLOADS_DIR = path.resolve(process.cwd(), 'data', 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Allowed MIME types and extensions
const ALLOWED_PHOTO_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif'
};

const ALLOWED_DOC_TYPES: Record<string, string> = {
  ...ALLOWED_PHOTO_TYPES,
  'application/pdf': '.pdf',
  'text/plain': '.txt'
};

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_DOC_SIZE = 15 * 1024 * 1024;  // 15 MB

interface UploadPayload {
  filename?: string;
  file_data: string; // Base64 data URI (e.g., data:image/png;base64,...)
  file_type?: 'photo' | 'document';
}

uploadRouter.post('/', (req: AuthenticatedRequest, res: Response) => {
  const { filename, file_data, file_type = 'photo' } = req.body as UploadPayload;

  if (!file_data || typeof file_data !== 'string') {
    return res.status(400).json({ error: 'No file data received. Please select a valid file.' });
  }

  // Parse Data URI: data:[<mediatype>][;base64],<data>
  const matches = file_data.match(/^data:([a-zA-Z0-9/+.-]+);base64,(.+)$/);
  if (!matches) {
    return res.status(400).json({
      error: 'Invalid file format. Upload data must be a valid base64-encoded Data URL.'
    });
  }

  const mimeType = matches[1].toLowerCase();
  const base64Data = matches[2];

  const allowedTypes = file_type === 'document' ? ALLOWED_DOC_TYPES : ALLOWED_PHOTO_TYPES;
  if (!allowedTypes[mimeType]) {
    return res.status(400).json({
      error: `Unsupported file type (${mimeType}). Allowed formats: ${Object.keys(allowedTypes).join(', ')}`
    });
  }

  const fileBuffer = Buffer.from(base64Data, 'base64');
  const maxSize = file_type === 'document' ? MAX_DOC_SIZE : MAX_PHOTO_SIZE;

  if (fileBuffer.length > maxSize) {
    const maxMb = Math.round(maxSize / (1024 * 1024));
    return res.status(400).json({
      error: `File size exceeds the allowable limit of ${maxMb}MB.`
    });
  }

  const ext = allowedTypes[mimeType];
  const safeBaseName = (filename ? path.parse(filename).name : 'file')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .substring(0, 32);
  const randomSuffix = crypto.randomBytes(8).toString('hex');
  const safeFilename = `${file_type}_${safeBaseName}_${Date.now()}_${randomSuffix}${ext}`;
  const targetPath = path.resolve(UPLOADS_DIR, safeFilename);

  try {
    fs.writeFileSync(targetPath, fileBuffer);

    const publicUrl = `/uploads/${safeFilename}`;
    const userId = req.user?.id || 'anonymous_upload';
    const userEmail = req.user?.email || 'anonymous';

    addAuditLog(userId, userEmail, 'FILE_UPLOADED', 'uploads', safeFilename, `Uploaded ${file_type} (${mimeType}, ${fileBuffer.length} bytes)`);

    return res.status(201).json({
      success: true,
      url: publicUrl,
      filename: safeFilename,
      mime_type: mimeType,
      size_bytes: fileBuffer.length,
      message: 'File successfully uploaded and stored in the secure archive directory.'
    });
  } catch (err: any) {
    console.error('File write error:', err);
    return res.status(500).json({ error: 'Server error occurred while saving the uploaded file.' });
  }
});
