import { Router, type Response } from 'express';
import { type AuthenticatedRequest, requireAuth } from '../auth.ts';
import { getDb, saveDb, addAuditLog } from '../db.ts';
import type { CommunitySubmission } from '../../src/types/index.ts';

export const communityRouter = Router();

// Public Member Directory (Strict Privacy Filtering)
communityRouter.get('/directory', (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const isAuth = !!req.user;
  const { search, state, country, profession, language } = req.query;

  // Filter profiles based on visibility
  const visibleProfiles = db.profiles.filter(p => {
    if (p.profile_visibility === 'private') return false;
    if (p.profile_visibility === 'members' && !isAuth) return false;
    return true;
  });

  let filtered = visibleProfiles.map(p => {
    // Sanitized profile: exclude date_of_birth, precise contact
    return {
      user_id: p.user_id,
      full_name: p.full_name,
      gender: p.gender,
      country: p.country,
      state_or_province: p.state_or_province,
      district: p.district,
      city_town_village: p.city_town_village,
      profile_photo_url: p.profile_photo_url,
      education: p.education,
      profession: p.profession,
      current_work: p.current_work,
      organization: p.organization,
      biography: p.biography,
      areas_of_historical_interest: p.areas_of_historical_interest || [],
      languages_known: p.languages_known || [],
      website_url: p.website_url,
      research_contributions: p.research_contributions,
      profile_visibility: p.profile_visibility
    };
  });

  if (search && typeof search === 'string') {
    const s = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.full_name.toLowerCase().includes(s) ||
      p.district.toLowerCase().includes(s) ||
      (p.profession && p.profession.toLowerCase().includes(s)) ||
      (p.biography && p.biography.toLowerCase().includes(s))
    );
  }

  if (state && typeof state === 'string' && state !== 'All') {
    filtered = filtered.filter(p => p.state_or_province.toLowerCase() === state.toLowerCase());
  }

  if (country && typeof country === 'string' && country !== 'All') {
    filtered = filtered.filter(p => p.country.toLowerCase() === country.toLowerCase());
  }

  if (profession && typeof profession === 'string') {
    filtered = filtered.filter(p => p.profession && p.profession.toLowerCase().includes(profession.toLowerCase()));
  }

  if (language && typeof language === 'string') {
    filtered = filtered.filter(p => p.languages_known.some(l => l.toLowerCase() === language.toLowerCase()));
  }

  res.json({ members: filtered });
});

// Community Events
communityRouter.get('/events', (req: AuthenticatedRequest, res: Response) => {
  const db = getDb();
  const userId = req.user?.id;

  const eventsWithStatus = db.community_events.map(ev => {
    const isRegistered = userId ? db.event_registrations.some(r => r.event_id === ev.id && r.user_id === userId) : false;
    return {
      ...ev,
      is_registered: isRegistered
    };
  });

  res.json({ events: eventsWithStatus });
});

// Register for an Event
communityRouter.post('/events/:id/register', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const eventId = req.params.id;
  const db = getDb();

  const event = db.community_events.find(e => e.id === eventId);
  if (!event) return res.status(404).json({ error: 'Event not found.' });

  const existing = db.event_registrations.find(r => r.event_id === eventId && r.user_id === user.id);
  if (existing) {
    return res.status(400).json({ error: 'You are already registered for this event.' });
  }

  if (event.registered_count >= event.max_attendees) {
    return res.status(400).json({ error: 'Event registration is at capacity.' });
  }

  db.event_registrations.push({
    event_id: eventId,
    user_id: user.id,
    registered_at: new Date().toISOString()
  });
  event.registered_count += 1;

  saveDb(db);
  addAuditLog(user.id, user.email, 'EVENT_REGISTRATION', 'community_events', eventId, `Registered for: ${event.title}`);

  res.json({ message: 'Successfully registered for event!', event });
});

// Submit Research / Material
communityRouter.post('/submissions', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const { submission_type, title, description, content_data, source_citations, copyright_agreed } = req.body;

  if (!submission_type || !title || !description || !content_data || !source_citations) {
    return res.status(400).json({ error: 'Please fill in all required submission fields.' });
  }

  if (!copyright_agreed) {
    return res.status(400).json({
      error: 'You must declare that you hold the necessary rights or copyright permission for this material.'
    });
  }

  const db = getDb();
  const profile = db.profiles.find(p => p.user_id === user.id);

  const newSub: CommunitySubmission = {
    id: 'sub_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    user_id: user.id,
    author_name: profile?.full_name || user.email,
    submission_type,
    title: title.trim(),
    description: description.trim(),
    content_data: content_data.trim(),
    source_citations: source_citations.trim(),
    copyright_agreed: true,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  db.submissions.unshift(newSub);
  saveDb(db);

  addAuditLog(user.id, user.email, 'SUBMISSION_CREATED', 'community_submissions', newSub.id, `Submitted research: ${title}`);

  res.status(201).json({
    message: 'Your research material has been submitted to the Editorial Board for peer review and provenance check.',
    submission: newSub
  });
});

// Get User's Own Submissions
communityRouter.get('/submissions/my', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const db = getDb();
  const mySubs = db.submissions.filter(s => s.user_id === user.id);
  res.json({ submissions: mySubs });
});

// Bookmarks
communityRouter.get('/bookmarks', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const db = getDb();
  const marks = db.bookmarks.filter(b => b.user_id === user.id);
  res.json({ bookmarks: marks });
});

communityRouter.post('/bookmarks', requireAuth, (req: AuthenticatedRequest, res: Response) => {
  const user = req.user!;
  const { item_id, item_type } = req.body;
  if (!item_id || !item_type) return res.status(400).json({ error: 'item_id and item_type are required.' });

  const db = getDb();
  const existingIdx = db.bookmarks.findIndex(b => b.user_id === user.id && b.item_id === item_id);

  if (existingIdx !== -1) {
    // Remove bookmark (toggle)
    db.bookmarks.splice(existingIdx, 1);
    saveDb(db);
    return res.json({ bookmarked: false, message: 'Bookmark removed.' });
  }

  db.bookmarks.push({
    user_id: user.id,
    item_id,
    item_type,
    created_at: new Date().toISOString()
  });
  saveDb(db);
  return res.json({ bookmarked: true, message: 'Bookmark added to your dashboard.' });
});
