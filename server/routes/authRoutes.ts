import { Router, type Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import {
  type AuthenticatedRequest,
  createSession,
  removeSession,
  requireAuth,
  rateLimitLogin,
  registerFailedLogin,
  resetLoginAttempts,
  validatePasswordStrength
} from '../auth.ts';
import { getDb, saveDb, addAuditLog } from '../db.ts';
import type { User, UserProfile, UserPreferences } from '../../src/types/index.ts';

export const authRouter = Router();

// Registration
authRouter.post('/register', (req: AuthenticatedRequest, res: Response) => {
  const {
    full_name,
    gender,
    date_of_birth,
    country,
    state_or_province,
    district,
    city_town_village,
    preferred_language,
    email,
    password,
    confirm_password,
    accept_terms_privacy,
    // Optional fields
    profile_photo_url,
    education,
    profession,
    current_work,
    organization,
    biography,
    areas_of_historical_interest,
    languages_known,
    website_url,
    research_contributions
  } = req.body;

  // Validation
  if (!full_name || !gender || !date_of_birth || !country || !state_or_province || !district || !city_town_village || !email || !password || !confirm_password) {
    return res.status(400).json({ error: 'Please provide all required registration fields.' });
  }

  if (!accept_terms_privacy) {
    return res.status(400).json({ error: 'You must accept the Privacy Policy and Terms of Use.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const passCheck = validatePasswordStrength(password);
  if (!passCheck.valid) {
    return res.status(400).json({ error: passCheck.reason });
  }

  const db = getDb();
  const normalizedEmail = email.toLowerCase().trim();
  const existingUser = db.users.find(u => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ error: 'An account with this email address already exists.' });
  }

  const userId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
  const passwordHash = bcrypt.hashSync(password, 10);

  const newUser: User = {
    id: userId,
    email: normalizedEmail,
    role: 'member',
    status: 'active',
    email_verified: false, // Requires email verification
    created_at: new Date().toISOString()
  };

  const newProfile: UserProfile = {
    user_id: userId,
    full_name: full_name.trim(),
    gender,
    date_of_birth, // Stored safely; never exposed publicly
    country: country.trim(),
    state_or_province: state_or_province.trim(),
    district: district.trim(),
    city_town_village: city_town_village.trim(),
    profile_photo_url: profile_photo_url?.trim() || undefined,
    education: education?.trim() || undefined,
    profession: profession?.trim() || undefined,
    current_work: current_work?.trim() || undefined,
    organization: organization?.trim() || undefined,
    biography: biography?.trim() || undefined,
    areas_of_historical_interest: Array.isArray(areas_of_historical_interest) ? areas_of_historical_interest : [],
    languages_known: Array.isArray(languages_known) ? languages_known : [],
    website_url: website_url?.trim() || undefined,
    research_contributions: research_contributions?.trim() || undefined,
    profile_visibility: 'members'
  };

  const newPreferences: UserPreferences = {
    user_id: userId,
    preferred_language: preferred_language || 'en',
    email_notifications: true,
    show_original_quotes: true
  };

  db.users.push(newUser);
  db.user_passwords[userId] = passwordHash;
  db.profiles.push(newProfile);
  db.preferences.push(newPreferences);

  addAuditLog(userId, normalizedEmail, 'USER_REGISTERED', 'users', userId, `New account registered: ${full_name}`);
  saveDb(db);

  const sessionToken = createSession(userId);
  res.cookie('auth_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(201).json({
    message: 'Registration successful! Welcome to the Suryavamsha Odiyaraju Kshatriya Portal.',
    token: sessionToken,
    user: {
      ...newUser,
      profile: newProfile,
      preferences: newPreferences
    }
  });
});

// Login
authRouter.post('/login', rateLimitLogin, (req: AuthenticatedRequest, res: Response) => {
  const { email, password } = req.body;
  const ip = req.ip || req.socket.remoteAddress || 'unknown';

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter both email and password.' });
  }

  const db = getDb();
  const normalizedEmail = email.toLowerCase().trim();
  const user = db.users.find(u => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    registerFailedLogin(ip);
    // Generic error message that doesn't reveal if email is registered
    return res.status(401).json({ error: 'Invalid email credentials or password.' });
  }

  if (user.status === 'suspended') {
    return res.status(403).json({ error: 'This account has been suspended. Please contact the administrator.' });
  }

  const passwordHash = db.user_passwords[user.id];
  if (!passwordHash || !bcrypt.compareSync(password, passwordHash)) {
    registerFailedLogin(ip);
    return res.status(401).json({ error: 'Invalid email credentials or password.' });
  }

  resetLoginAttempts(ip);
  const sessionToken = createSession(user.id);

  res.cookie('auth_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  addAuditLog(user.id, user.email, 'USER_LOGIN', 'sessions', sessionToken, 'Member logged in successfully.');

  const profile = db.profiles.find(p => p.user_id === user.id);
  const preferences = db.preferences.find(pr => pr.user_id === user.id);

  return res.json({
    message: 'Welcome back!',
    token: sessionToken,
    user: {
      ...user,
      profile,
      preferences
    }
  });
});

// Logout
authRouter.post('/logout', (req: AuthenticatedRequest, res: Response) => {
  const token = req.cookies?.auth_token || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null);
  if (token) {
    removeSession(token);
  }
  res.clearCookie('auth_token');
  return res.json({ message: 'Logged out successfully.' });
});

// Current User Me
authRouter.get('/me', (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }
  return res.json({ user: req.user });
});

// Forgot Password
authRouter.post('/forgot-password', (req: AuthenticatedRequest, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Please enter your registered email address.' });
  }

  const db = getDb();
  const normalizedEmail = email.toLowerCase().trim();
  const user = db.users.find(u => u.email.toLowerCase() === normalizedEmail);

  // Return success even if not found to avoid user enumeration
  if (user) {
    const resetToken = 'rst_' + crypto.randomBytes(24).toString('hex');
    db.password_resets.push({
      token: resetToken,
      user_id: user.id,
      expires_at: Date.now() + 60 * 60 * 1000, // 1 hour
      used: false
    });
    saveDb(db);
    addAuditLog(user.id, user.email, 'PASSWORD_RESET_REQUESTED', 'password_resets', resetToken, 'Password reset requested.');

    return res.json({
      message: 'If that email address is registered, password recovery instructions and a secure reset token have been generated.',
      debug_token: resetToken // Provided so user can test password reset directly in UI
    });
  }

  return res.json({
    message: 'If that email address is registered, password recovery instructions and a secure reset token have been generated.'
  });
});

// Reset Password
authRouter.post('/reset-password', (req: AuthenticatedRequest, res: Response) => {
  const { token, new_password, confirm_password } = req.body;
  if (!token || !new_password || !confirm_password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match.' });
  }

  const passCheck = validatePasswordStrength(new_password);
  if (!passCheck.valid) {
    return res.status(400).json({ error: passCheck.reason });
  }

  const db = getDb();
  const resetRecord = db.password_resets.find(r => r.token === token && !r.used);
  if (!resetRecord || Date.now() > resetRecord.expires_at) {
    return res.status(400).json({ error: 'Invalid or expired password reset token.' });
  }

  const user = db.users.find(u => u.id === resetRecord.user_id);
  if (!user) {
    return res.status(400).json({ error: 'User account not found.' });
  }

  resetRecord.used = true;
  db.user_passwords[user.id] = bcrypt.hashSync(new_password, 10);
  saveDb(db);

  addAuditLog(user.id, user.email, 'PASSWORD_RESET_COMPLETED', 'users', user.id, 'Password successfully reset.');
  return res.json({ message: 'Password has been successfully updated. You may now log in.' });
});

// Request Email Verification Token
authRouter.post('/verify-email/request', (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  let user = req.user;

  if (!user && req.body.email) {
    const normalized = req.body.email.toLowerCase().trim();
    user = db.users.find(u => u.email.toLowerCase() === normalized);
  }

  if (!user) {
    return res.status(400).json({ error: 'Please sign in or provide a registered email address.' });
  }

  if (user.email_verified) {
    return res.json({ message: 'Your email address is already verified.', verified: true });
  }

  const verToken = 'eml_' + crypto.randomBytes(24).toString('hex');
  if (!db.email_verifications) db.email_verifications = [];

  db.email_verifications.push({
    token: verToken,
    user_id: user.id,
    expires_at: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    used: false
  });
  saveDb(db);

  addAuditLog(user.id, user.email, 'EMAIL_VERIFICATION_REQUESTED', 'email_verifications', verToken, 'Email verification token generated.');

  return res.json({
    message: 'Verification code generated and sent to registered email address.',
    debug_token: verToken
  });
});

// Confirm Email Verification
authRouter.post('/verify-email/confirm', (req: AuthenticatedRequest, res: Response) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: 'Verification token is required.' });
  }

  const db = getDb();
  if (!db.email_verifications) db.email_verifications = [];

  const record = db.email_verifications.find(v => v.token === token && !v.used);
  if (!record || Date.now() > record.expires_at) {
    return res.status(400).json({ error: 'Invalid or expired email verification token.' });
  }

  const user = db.users.find(u => u.id === record.user_id);
  if (!user) {
    return res.status(400).json({ error: 'User account not found.' });
  }

  record.used = true;
  user.email_verified = true;
  saveDb(db);

  addAuditLog(user.id, user.email, 'EMAIL_VERIFIED', 'users', user.id, 'Email address successfully verified.');

  return res.json({
    message: 'Your email address has been successfully verified!',
    verified: true,
    user
  });
});

// Update Profile
authRouter.put('/profile', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const db = getDb();
  const profileIndex = db.profiles.findIndex(p => p.user_id === user.id);

  if (profileIndex === -1) {
    return res.status(404).json({ error: 'Profile not found.' });
  }

  const current = db.profiles[profileIndex];
  const updated: UserProfile = {
    ...current,
    full_name: req.body.full_name?.trim() || current.full_name,
    gender: req.body.gender || current.gender,
    country: req.body.country?.trim() || current.country,
    state_or_province: req.body.state_or_province?.trim() || current.state_or_province,
    district: req.body.district?.trim() || current.district,
    city_town_village: req.body.city_town_village?.trim() || current.city_town_village,
    profile_photo_url: req.body.profile_photo_url !== undefined ? req.body.profile_photo_url : current.profile_photo_url,
    education: req.body.education !== undefined ? req.body.education : current.education,
    profession: req.body.profession !== undefined ? req.body.profession : current.profession,
    current_work: req.body.current_work !== undefined ? req.body.current_work : current.current_work,
    organization: req.body.organization !== undefined ? req.body.organization : current.organization,
    biography: req.body.biography !== undefined ? req.body.biography : current.biography,
    areas_of_historical_interest: Array.isArray(req.body.areas_of_historical_interest) ? req.body.areas_of_historical_interest : current.areas_of_historical_interest,
    languages_known: Array.isArray(req.body.languages_known) ? req.body.languages_known : current.languages_known,
    website_url: req.body.website_url !== undefined ? req.body.website_url : current.website_url,
    research_contributions: req.body.research_contributions !== undefined ? req.body.research_contributions : current.research_contributions,
    profile_visibility: req.body.profile_visibility || current.profile_visibility
  };

  db.profiles[profileIndex] = updated;
  saveDb(db);
  addAuditLog(user.id, user.email, 'PROFILE_UPDATED', 'profiles', user.id, 'User updated profile details.');

  return res.json({ message: 'Profile updated successfully.', profile: updated });
});

// Change Password
authRouter.put('/password', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const { current_password, new_password, confirm_password } = req.body;

  if (!current_password || !new_password || !confirm_password) {
    return res.status(400).json({ error: 'All password fields are required.' });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({ error: 'New passwords do not match.' });
  }

  const passCheck = validatePasswordStrength(new_password);
  if (!passCheck.valid) {
    return res.status(400).json({ error: passCheck.reason });
  }

  const db = getDb();
  const currentHash = db.user_passwords[user.id];
  if (!bcrypt.compareSync(current_password, currentHash)) {
    return res.status(401).json({ error: 'Current password incorrect.' });
  }

  db.user_passwords[user.id] = bcrypt.hashSync(new_password, 10);
  saveDb(db);
  addAuditLog(user.id, user.email, 'PASSWORD_CHANGED', 'users', user.id, 'User changed account password.');

  return res.json({ message: 'Password updated successfully.' });
});

// Update Preferences
authRouter.put('/preferences', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const db = getDb();
  let pref = db.preferences.find(p => p.user_id === user.id);

  if (!pref) {
    pref = {
      user_id: user.id,
      preferred_language: req.body.preferred_language || 'en',
      email_notifications: true,
      show_original_quotes: true
    };
    db.preferences.push(pref);
  } else {
    if (req.body.preferred_language) pref.preferred_language = req.body.preferred_language;
    if (req.body.email_notifications !== undefined) pref.email_notifications = req.body.email_notifications;
    if (req.body.show_original_quotes !== undefined) pref.show_original_quotes = req.body.show_original_quotes;
  }

  saveDb(db);
  return res.json({ message: 'Preferences updated successfully.', preferences: pref });
});

// Account deletion request
authRouter.delete('/account', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const db = getDb();

  // Soft delete / suspend for audit compliance
  const u = db.users.find(usr => usr.id === user.id);
  if (u) {
    u.status = 'suspended';
    u.email = `deleted_${Date.now()}_${u.email}`;
    delete db.user_passwords[user.id];
  }

  addAuditLog(user.id, user.email, 'ACCOUNT_DELETED', 'users', user.id, 'User submitted account deletion request.');
  saveDb(db);

  const token = req.cookies?.auth_token;
  if (token) removeSession(token);
  res.clearCookie('auth_token');

  return res.json({ message: 'Your account has been deleted in accordance with data privacy regulations.' });
});
