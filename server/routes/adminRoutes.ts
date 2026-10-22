import { Router, type Response } from 'express';
import { type AuthenticatedRequest, requireAuth, requireRole } from '../auth.ts';
import { getDb, saveDb, addAuditLog, computeStatistics } from '../db.ts';
import type { Article, UserRole, LanguageCode } from '../../src/types/index.ts';

export const adminRouter = Router();

// Require authorized roles for all admin endpoints
adminRouter.use(requireAuth);
adminRouter.use(requireRole(['super_admin', 'admin', 'historical_editor', 'research_reviewer', 'translator', 'community_moderator']));

// Admin Overview
adminRouter.get('/overview', (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const stats = computeStatistics();
  const pendingSubmissions = db.submissions.filter(s => s.status === 'pending' || s.status === 'in_review').length;
  const recentLogs = db.audit_logs.slice(0, 15);

  res.json({
    statistics: stats,
    pending_submissions: pendingSubmissions,
    total_users: db.users.length,
    recent_logs: recentLogs
  });
});

// Users Management
adminRouter.get('/users', requireRole(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const userList = db.users.map(u => {
    const profile = db.profiles.find(p => p.user_id === u.id);
    return {
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.status,
      email_verified: u.email_verified,
      created_at: u.created_at,
      full_name: profile?.full_name || 'N/A',
      country: profile?.country || 'N/A',
      state: profile?.state_or_province || 'N/A',
      district: profile?.district || 'N/A'
    };
  });
  res.json({ users: userList });
});

// Update User Role
adminRouter.put('/users/:id/role', requireRole(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  const admin = req.user!;
  const targetId = req.params.id;
  const { role } = req.body as { role: UserRole };

  if (targetId === admin.id) {
    return res.status(400).json({ error: 'Cannot alter your own role.' });
  }

  const db = getDb();
  const target = db.users.find(u => u.id === targetId);
  if (!target) return res.status(404).json({ error: 'User not found.' });

  const oldRole = target.role;
  target.role = role;
  saveDb(db);

  addAuditLog(admin.id, admin.email, 'UPDATE_USER_ROLE', 'users', targetId, `Changed role from ${oldRole} to ${role}`);
  res.json({ message: 'User role updated successfully.', user: target });
});

// Update User Status (Suspend/Reactivate)
adminRouter.put('/users/:id/status', requireRole(['super_admin', 'admin']), (req: AuthenticatedRequest, res: Response) => {
  const admin = req.user!;
  const targetId = req.params.id;
  const { status } = req.body as { status: 'active' | 'suspended' };

  if (targetId === admin.id) {
    return res.status(400).json({ error: 'Cannot alter your own account status.' });
  }

  const db = getDb();
  const target = db.users.find(u => u.id === targetId);
  if (!target) return res.status(404).json({ error: 'User not found.' });

  target.status = status;
  saveDb(db);

  addAuditLog(admin.id, admin.email, 'UPDATE_USER_STATUS', 'users', targetId, `Changed status to ${status}`);
  res.json({ message: `User status changed to ${status}.`, user: target });
});

// Submissions Moderation Queue
adminRouter.get('/submissions', (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json({ submissions: db.submissions });
});

// Review Submission
adminRouter.put('/submissions/:id', (req: AuthenticatedRequest, res: Response) => {
  const reviewer = req.user!;
  const subId = req.params.id;
  const { status, reviewer_notes } = req.body;

  const db = getDb();
  const sub = db.submissions.find(s => s.id === subId);
  if (!sub) return res.status(404).json({ error: 'Submission not found.' });

  sub.status = status;
  if (reviewer_notes) sub.reviewer_notes = reviewer_notes;
  sub.updated_at = new Date().toISOString();

  // If approved and type is article, optionally publish as draft/under-research article
  if (status === 'approved' && sub.submission_type === 'article') {
    const slug = sub.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newArt: Article = {
      id: 'art_' + Date.now(),
      slug: slug || `article-${Date.now()}`,
      category: 'Research Articles',
      original_language: 'en',
      original_title: sub.title,
      original_content: sub.content_data,
      summary: sub.description,
      author_name: sub.author_name,
      publication_date: new Date().toISOString().split('T')[0],
      verification_status: 'Reviewed',
      evidence_category: 'scholarly_interpretation',
      sources: [
        {
          id: 'src_' + Date.now(),
          source_type: 'Peer-Reviewed Research',
          title: sub.source_citations,
          author_or_authority: sub.author_name,
          publication_or_location: 'Community Contributed Archive',
          year_or_era: 'Contemporary Study',
          citation_details: sub.source_citations,
          verified: true
        }
      ],
      tags: ['Community Research', 'Archival Submission']
    };
    db.articles.push(newArt);
  }

  saveDb(db);
  addAuditLog(reviewer.id, reviewer.email, 'MODERATE_SUBMISSION', 'community_submissions', subId, `Status updated to ${status}. Notes: ${reviewer_notes || 'None'}`);

  res.json({ message: `Submission updated to ${status}.`, submission: sub });
});

// Create Research Article
adminRouter.post('/articles', requireRole(['super_admin', 'admin', 'historical_editor']), (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const {
    title,
    category,
    summary,
    content,
    sources,
    verification_status,
    evidence_category,
    tags,
    featured_image
  } = req.body;

  if (!title || !category || !content) {
    return res.status(400).json({ error: 'Title, category, and content are required.' });
  }

  const db = getDb();
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const newArticle: Article = {
    id: 'art_' + Date.now(),
    slug: slug || `article-${Date.now()}`,
    category,
    original_language: 'en',
    original_title: title.trim(),
    original_content: content.trim(),
    summary: summary?.trim() || content.substring(0, 160) + '...',
    author_name: user.profile?.full_name || user.email,
    publication_date: new Date().toISOString().split('T')[0],
    verification_status: verification_status || 'Draft',
    evidence_category: evidence_category || 'scholarly_interpretation',
    sources: Array.isArray(sources) ? sources : [],
    featured_image: featured_image?.trim() || undefined,
    tags: Array.isArray(tags) ? tags : [category]
  };

  db.articles.unshift(newArticle);
  saveDb(db);

  addAuditLog(user.id, user.email, 'CREATE_ARTICLE', 'articles', newArticle.id, `Created article: ${title}`);
  res.status(201).json({ message: 'Historical research article created successfully.', article: newArticle });
});

// Update Translation for an Article
adminRouter.post('/translations', requireRole(['super_admin', 'admin', 'historical_editor', 'translator']), (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const { article_id, language, title, content, summary, status } = req.body as {
    article_id: string;
    language: LanguageCode;
    title: string;
    content: string;
    summary: string;
    status: 'pending' | 'reviewed';
  };

  if (!article_id || !language || !title || !content) {
    return res.status(400).json({ error: 'Article ID, target language, translated title, and content are required.' });
  }

  const db = getDb();
  const article = db.articles.find(a => a.id === article_id);
  if (!article) return res.status(404).json({ error: 'Article not found.' });

  if (!article.translations) {
    article.translations = {} as any;
  }
  const translations = article.translations!;
  translations[language] = {
    title: title.trim(),
    content: content.trim(),
    summary: summary?.trim() || content.substring(0, 160) + '...',
    status: status || 'pending',
    translator_name: user.profile?.full_name || user.email,
    last_updated: new Date().toISOString()
  };

  saveDb(db);
  addAuditLog(user.id, user.email, 'UPDATE_TRANSLATION', 'articles', article_id, `Updated ${language} translation (Status: ${status})`);

  res.json({ message: `Translation for language '${language}' saved successfully.`, article });
});

// View Audit Logs
adminRouter.get('/audit-logs', requireRole(['super_admin', 'admin']), (_req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  res.json({ logs: db.audit_logs });
});
