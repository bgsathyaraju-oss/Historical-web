import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { getDb, saveDb, addAuditLog } from './db.ts';
import type { User, UserRole } from '../src/types/index.ts';

const sessions: Map<string, { user_id: string; expires_at: number }> = new Map();
const loginAttempts: Map<string, { count: number; last_attempt: number }> = new Map();

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export function validatePasswordStrength(password: string): { valid: boolean; reason?: string } {
  if (!password || password.length < 8) {
    return { valid: false, reason: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: 'Password must include at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: 'Password must include at least one lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, reason: 'Password must include at least one digit.' };
  }
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    return { valid: false, reason: 'Password must include at least one special symbol (!@#$%...).' };
  }
  return { valid: true };
}

export function createSession(userId: string): string {
  const token = 'sess_' + crypto.randomBytes(32).toString('hex');
  const expires_at = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  sessions.set(token, { user_id: userId, expires_at });
  return token;
}

export function removeSession(token: string) {
  sessions.delete(token);
}

export function getSessionUser(token: string): User | null {
  const sess = sessions.get(token);
  if (!sess) return null;
  if (Date.now() > sess.expires_at) {
    sessions.delete(token);
    return null;
  }
  const db = getDb();
  const user = db.users.find(u => u.id === sess.user_id);
  if (!user || user.status === 'suspended') return null;

  const profile = db.profiles.find(p => p.user_id === user.id);
  const preferences = db.preferences.find(pr => pr.user_id === user.id);
  return { ...user, profile, preferences };
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies?.auth_token;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (cookieToken) {
    token = cookieToken;
  }

  if (token) {
    const user = getSessionUser(token);
    if (user) {
      req.user = user;
    }
  }

  next();
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required to access this resource.' });
  }
  next();
}

export function requireRole(allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (req.user.role === 'super_admin') {
      return next(); // Super admin has universal access
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access forbidden: Insufficient administrative privileges.' });
    }
    next();
  };
}

export function rateLimitLogin(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    if (now - record.last_attempt < 15 * 60 * 1000) { // 15 minute window
      if (record.count >= 8) {
        return res.status(429).json({
          error: 'Too many failed login attempts. For security, please wait 15 minutes before retrying.'
        });
      }
    } else {
      // Reset after window
      loginAttempts.delete(ip);
    }
  }

  next();
}

export function registerFailedLogin(ip: string) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, last_attempt: now };
  record.count += 1;
  record.last_attempt = now;
  loginAttempts.set(ip, record);
}

export function resetLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}
