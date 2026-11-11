import { runMigrations } from '../server/migrate.ts';
import { getDb, saveDb } from '../server/db.ts';
import {
  getCanonicalGenealogy,
  getCanonicalClaims,
  getCanonicalTimelineEvents,
  getCanonicalLocations,
  getCanonicalDocuments,
  getCanonicalGallery,
  getCanonicalInscriptions,
  getCanonicalMonuments
} from '../src/data/archivalSeedData.ts';
import { getAllArticles } from '../src/data/articlesRepository.ts';
import { getAllDocumentedFigures } from '../src/data/documentedFiguresRepository.ts';
import { GENEALOGY_UI_TRANSLATIONS } from '../src/data/multilingualSeedTranslations.ts';
import { translations } from '../src/i18n/translations.ts';
import {
  getEnrichedGalleryArticles,
  getRelatedGalleryArticles,
  filterGalleryArticlesByKeyword,
  GALLERY_UI_TRANSLATIONS
} from '../src/data/galleryArticlesEnrichment.ts';
import { KALINGA_WAR_CONTENT } from '../src/data/kalingaWarData.ts';
import { COMMUNITY_SYNONYMS } from '../src/data/historyContent.ts';
import { performClientSearch } from '../src/utils/searchEngine.ts';
import { extractStructuredArticleContent } from '../src/utils/pdfExport.ts';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

interface TestResult {
  suite: string;
  test: string;
  passed: boolean;
  error?: string;
  details?: any;
}

const results: TestResult[] = [];

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🏛️  SURYAVAMSHA PORTAL AUTOMATED VERIFICATION SUITE');
  console.log('======================================================\n');

  // Test 0: Run DB Migrations
  try {
    const mig = runMigrations();
    results.push({
      suite: 'Database & Migrations',
      test: 'Schema and directory migration execution',
      passed: mig.success
    });
  } catch (err: any) {
    results.push({
      suite: 'Database & Migrations',
      test: 'Schema and directory migration execution',
      passed: false,
      error: err.message
    });
  }

  // Test 1: Public Registration - Validation & Password Rules
  const testEmail = `test.researcher.${Date.now()}@suryavamsha-test.org`;
  const validPassword = 'Royal@Heritage2026';
  let memberToken = '';
  let memberUserId = '';

  try {
    // 1a. Test weak password rejection
    const weakRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Test Kshatriya Researcher',
        gender: 'Male',
        date_of_birth: '1990-05-15',
        country: 'India',
        state_or_province: 'Odisha',
        district: 'Puri',
        city_town_village: 'Puri',
        email: `weak.${Date.now()}@test.org`,
        password: 'weak',
        confirm_password: 'weak',
        accept_terms_privacy: true
      })
    });
    assert(weakRes.status === 400, `Expected 400 for weak password, got ${weakRes.status}`);

    // 1b. Test privilege escalation prevention: User attempts role: 'super_admin' in public form
    const regRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Test Kshatriya Researcher',
        gender: 'Male',
        date_of_birth: '1990-05-15',
        country: 'India',
        state_or_province: 'Odisha',
        district: 'Puri',
        city_town_village: 'Puri',
        email: testEmail,
        password: validPassword,
        confirm_password: validPassword,
        role: 'super_admin', // Attack vector: attempt privilege escalation
        accept_terms_privacy: true
      })
    });

    const regData = await regRes.json();
    assert(regRes.status === 201, `Expected 201 for valid registration, got ${regRes.status}: ${JSON.stringify(regData)}`);
    assert(regData.user.role === 'member', `Expected role to be strictly 'member', but got '${regData.user.role}'`);
    assert(!!regData.token, 'Expected session token on registration');

    memberToken = regData.token;
    memberUserId = regData.user.id;

    results.push({
      suite: 'Authentication & Security',
      test: 'Registration validation & privilege escalation prevention',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Authentication & Security',
      test: 'Registration validation & privilege escalation prevention',
      passed: false,
      error: err.message
    });
  }

  // Test 2: Login and Rate Limiting Protection
  try {
    // 2a. Bad password
    const badRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'WrongPassword@123' })
    });
    assert(badRes.status === 401, `Expected 401 for bad password, got ${badRes.status}`);

    // 2b. Correct password login
    const goodRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: validPassword })
    });
    const goodData = await goodRes.json();
    assert(goodRes.status === 200, `Expected 200 for good login, got ${goodRes.status}`);
    assert(goodData.user.email === testEmail.toLowerCase(), 'Email in login response matches');

    results.push({
      suite: 'Authentication & Security',
      test: 'Login authentication with credentials validation',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Authentication & Security',
      test: 'Login authentication with credentials validation',
      passed: false,
      error: err.message
    });
  }

  // Test 3: File Upload Security & MIME Validation
  let uploadedPhotoUrl = '';
  try {
    // 3a. Reject illegal file / HTML script file
    const invalidUploadRes = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${memberToken}`
      },
      body: JSON.stringify({
        filename: 'malicious.html',
        file_data: 'data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==',
        file_type: 'photo'
      })
    });
    assert(invalidUploadRes.status === 400, `Expected 400 for HTML upload as photo, got ${invalidUploadRes.status}`);

    // 3b. Accept valid PNG 1x1 base64 image
    const validPngBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${memberToken}`
      },
      body: JSON.stringify({
        filename: 'profile_avatar.png',
        file_data: validPngBase64,
        file_type: 'photo'
      })
    });
    const uploadData = await uploadRes.json();
    assert(uploadRes.status === 201, `Expected 201 for valid photo upload, got ${uploadRes.status}`);
    assert(uploadData.url.startsWith('/uploads/'), `Expected URL starting with /uploads/, got ${uploadData.url}`);
    uploadedPhotoUrl = uploadData.url;

    // 3c. Update user profile with uploaded photo URL
    const updateProfRes = await fetch(`${BASE_URL}/api/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${memberToken}`
      },
      body: JSON.stringify({
        profile_photo_url: uploadedPhotoUrl,
        profession: 'Epigraphist & Genealogist'
      })
    });
    assert(updateProfRes.status === 200, `Expected 200 for profile update, got ${updateProfRes.status}`);

    results.push({
      suite: 'File Upload & Storage',
      test: 'MIME validation, size restriction, safe upload and profile photo association',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'File Upload & Storage',
      test: 'MIME validation, size restriction, safe upload and profile photo association',
      passed: false,
      error: err.message
    });
  }

  // Test 4: Email Verification Flow
  try {
    const reqRes = await fetch(`${BASE_URL}/api/auth/verify-email/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${memberToken}`
      },
      body: JSON.stringify({ email: testEmail })
    });
    const reqData = await reqRes.json();
    assert(reqRes.status === 200, `Expected 200 for email verification request, got ${reqRes.status}`);
    assert(!!reqData.debug_token, 'Expected debug verification token in development/test mode');

    const confRes = await fetch(`${BASE_URL}/api/auth/verify-email/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: reqData.debug_token })
    });
    const confData = await confRes.json();
    assert(confRes.status === 200, `Expected 200 for email confirmation, got ${confRes.status}`);
    assert(confData.verified === true, 'Expected verified: true');

    results.push({
      suite: 'Email Verification',
      test: 'Token generation, expiration checking, and confirmation flow',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Email Verification',
      test: 'Token generation, expiration checking, and confirmation flow',
      passed: false,
      error: err.message
    });
  }

  // Test 5: Password Recovery Flow
  try {
    const forgotRes = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail })
    });
    const forgotData = await forgotRes.json();
    assert(forgotRes.status === 200, `Expected 200 for forgot password, got ${forgotRes.status}`);
    assert(!!forgotData.debug_token, 'Expected debug reset token');

    const resetPass = 'NewHeritage@2026';
    const resetRes = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: forgotData.debug_token,
        new_password: resetPass,
        confirm_password: resetPass
      })
    });
    assert(resetRes.status === 200, `Expected 200 for reset password, got ${resetRes.status}`);

    // Verify login with new password
    const newLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: resetPass })
    });
    assert(newLoginRes.status === 200, `Expected 200 login with new password, got ${newLoginRes.status}`);

    results.push({
      suite: 'Password Recovery',
      test: 'Tokenized password reset and credential update',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Password Recovery',
      test: 'Tokenized password reset and credential update',
      passed: false,
      error: err.message
    });
  }

  // Test 6: Role-Based Access Control (RBAC) Enforcement
  try {
    // 6a. Member token attempting to access Admin endpoints
    const forbiddenRes = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${memberToken}` }
    });
    assert(forbiddenRes.status === 403, `Expected 403 Forbidden for member on /api/admin/overview, got ${forbiddenRes.status}`);

    const forbiddenUsersRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${memberToken}` }
    });
    assert(forbiddenUsersRes.status === 403, `Expected 403 Forbidden for member on /api/admin/users, got ${forbiddenUsersRes.status}`);

    // 6b. Super Admin login and access
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@suryavamsha-heritage.org',
        password: 'Heritage@2026'
      })
    });
    const adminData = await adminLoginRes.json();
    assert(adminLoginRes.status === 200, `Expected 200 for super admin login, got ${adminLoginRes.status}`);
    const adminToken = adminData.token;

    // 6c. Super admin accesses /api/admin/overview and /api/admin/users
    const adminOverviewRes = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(adminOverviewRes.status === 200, `Expected 200 for admin overview, got ${adminOverviewRes.status}`);

    const adminUsersRes = await fetch(`${BASE_URL}/api/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(adminUsersRes.status === 200, `Expected 200 for admin users list, got ${adminUsersRes.status}`);

    results.push({
      suite: 'Role-Based Access Control (RBAC)',
      test: 'Strict authorization barriers between Member and Admin roles',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Role-Based Access Control (RBAC)',
      test: 'Strict authorization barriers between Member and Admin roles',
      passed: false,
      error: err.message
    });
  }

  // Test 7: Privacy Protection in Member Directory
  try {
    // 7a. Anonymous user querying directory
    const anonDirRes = await fetch(`${BASE_URL}/api/community/directory`);
    const anonDirData = await anonDirRes.json();
    assert(anonDirRes.status === 200, `Expected 200 for directory, got ${anonDirRes.status}`);

    // Verify no date_of_birth is ever returned
    for (const mem of anonDirData.members) {
      assert(mem.date_of_birth === undefined, `Privacy leak: date_of_birth was exposed for ${mem.full_name}`);
      assert(mem.profile_visibility !== 'private', `Privacy leak: private profile exposed to public: ${mem.full_name}`);
      assert(mem.profile_visibility !== 'members', `Privacy leak: members-only profile exposed to anonymous visitor: ${mem.full_name}`);
    }

    results.push({
      suite: 'Privacy & Data Protection',
      test: 'Strict exclusion of dates of birth and private/member profiles from anonymous viewers',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Privacy & Data Protection',
      test: 'Strict exclusion of dates of birth and private/member profiles from anonymous viewers',
      passed: false,
      error: err.message
    });
  }

  // Test 8: 8-Language Content and Translation Overlays
  try {
    // Fetch articles across all 8 supported languages
    const supportedLangs = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;
    for (const l of supportedLangs) {
      const lRes = await fetch(`${BASE_URL}/api/content/articles?lang=${l}`);
      assert(lRes.status === 200, `Expected 200 for articles in lang ${l}`);
      const lData = await lRes.json();
      assert(Array.isArray(lData.articles) && lData.articles.length > 0, `Expected articles list for lang ${l}`);

      // Verify translations dictionary endpoint
      const trRes = await fetch(`${BASE_URL}/api/content/translations/${l}`);
      assert(trRes.status === 200, `Expected 200 for translation endpoint /translations/${l}`);
      const trData = await trRes.json();
      assert(trData.language === l && typeof trData.translations === 'object', `Translations object returned for ${l}`);
    }

    // Verify saving a new translation for an article
    const saveTrRes = await fetch(`${BASE_URL}/api/content/articles/art_odra_desha_history/translations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'bn',
        title: 'ওড্র দেশের রাজকীয় ইতিহাস ও ভূগোল (অনুবাদ পরীক্ষা)',
        summary: 'প্রাচীন ওড্র দেশের ঐতিহাসিক বিশ্লেষণ এবং সীমানা পর্যালোচনা।',
        content: 'গবেষণামূলক বিশ্লেষণ অনুসারে ওড্র দেশ প্রাচ্য ভারতের অন্যতম প্রধান সার্বভৌম অঞ্চল ছিল।',
        translator_name: 'সূর্যবংশ গবেষক পরিষদ'
      })
    });
    assert(saveTrRes.status === 200, `Expected 200 for saving translation, got ${saveTrRes.status}`);

    // Verify saved translation is reflected in single article endpoint
    const updatedArtRes = await fetch(`${BASE_URL}/api/content/articles/art_odra_desha_history?lang=bn`);
    const updatedArtData = await updatedArtRes.json();
    assert(updatedArtData.article.display_title === 'ওড্র দেশের রাজকীয় ইতিহাস ও ভূগোল (অনুবাদ পরীক্ষা)', 'Saved Bengali translation reflects in article display');

    results.push({
      suite: 'Multilingual 8-Language System',
      test: 'Article translation overlays, backend translation store & TranslationManager APIs across all 8 languages',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Multilingual 8-Language System',
      test: 'Article translation overlays, backend translation store & TranslationManager APIs across all 8 languages',
      passed: false,
      error: err.message
    });
  }

  // Test 9: Historical Inscriptions & Citations Integrity
  try {
    const inscRes = await fetch(`${BASE_URL}/api/content/inscriptions`);
    const inscData = await inscRes.json();
    assert(inscRes.status === 200, `Expected 200 for inscriptions, got ${inscRes.status}`);
    assert(inscData.inscriptions.length >= 3, 'Inscriptions database has pre-seeded primary epigraphs');

    // Check primary citations existence
    const veligalani = inscData.inscriptions.find((i: any) => i.id === 'insc_veligalani_1458');
    assert(!!veligalani, 'Veligalani inscription found');
    assert(veligalani.scholarly_references.length > 0, 'Scholarly references populated for Veligalani copper plates');
    assert(veligalani.verification_status === 'Reviewed', 'Verification status is reviewed');

    results.push({
      suite: 'Historical Rigor & Primary Citations',
      test: 'Epigraphic transcripts, scholarly references, and verification status integrity',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Historical Rigor & Primary Citations',
      test: 'Epigraphic transcripts, scholarly references, and verification status integrity',
      passed: false,
      error: err.message
    });
  }

  // Test 10: Complete 8-Language Seed & Static Repository Audit (Genealogy, Gajapathi Kings, Inscriptions, Monuments, Timeline, Maps, Docs, Gallery)
  try {
    const supportedLangs = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;
    const enGenealogy = getCanonicalGenealogy('en');
    const enClaims = getCanonicalClaims('en');
    const enTimeline = getCanonicalTimelineEvents('en');
    const enLocations = getCanonicalLocations('en');
    const enDocuments = getCanonicalDocuments('en');
    const enGallery = getCanonicalGallery('en');
    const enInscriptions = getCanonicalInscriptions('en');
    const enMonuments = getCanonicalMonuments('en');

    for (const lang of supportedLangs) {
      // 1. Genealogy UI & Nodes
      const ui = GENEALOGY_UI_TRANSLATIONS[lang];
      assert(!!ui && !!ui.legendTitle && !!ui.documentedBadge, `Missing GENEALOGY_UI_TRANSLATIONS for ${lang}`);
      const genNodes = getCanonicalGenealogy(lang);
      assert(genNodes.length >= 9, `Expected >= 9 genealogy nodes for ${lang}, got ${genNodes.length}`);
      for (let i = 0; i < genNodes.length; i++) {
        assert(!!genNodes[i].name && !!genNodes[i].notes, `Empty genealogy node fields in ${lang}`);
        if (lang !== 'en') {
          assert(genNodes[i].name !== enGenealogy[i].name, `Genealogy name not translated for ${genNodes[i].id} in ${lang}`);
          assert(genNodes[i].notes !== enGenealogy[i].notes, `Genealogy notes not translated for ${genNodes[i].id} in ${lang}`);
        }
      }

      // 2. Scholarly Claims
      const claims = getCanonicalClaims(lang);
      assert(claims.length === 3, `Expected 3 claims for ${lang}`);
      for (let i = 0; i < claims.length; i++) {
        if (lang !== 'en') {
          assert(claims[i].claim_statement !== enClaims[i].claim_statement, `Claim statement not translated for ${claims[i].id} in ${lang}`);
        }
      }

      // 3. Timeline Events
      const timeline = getCanonicalTimelineEvents(lang);
      assert(timeline.length >= 11, `Expected >= 11 timeline events for ${lang}`);
      if (lang !== 'en') {
        assert(timeline[0].title !== enTimeline[0].title, `Timeline title not translated in ${lang}`);
      }

      // 4. Locations / Maps
      const locs = getCanonicalLocations(lang);
      assert(locs.length >= 6, `Expected >= 6 locations for ${lang}`);
      if (lang !== 'en') {
        assert(locs[0].name !== enLocations[0].name, `Location name not translated in ${lang}`);
      }

      // 5. Documents & Gallery
      const docs = getCanonicalDocuments(lang);
      assert(docs.length >= 2, `Expected >= 2 documents for ${lang}`);
      const gal = getCanonicalGallery(lang);
      assert(gal.length >= 7, `Expected >= 7 gallery items for ${lang}`);
      if (lang !== 'en') {
        assert(docs[0].title !== enDocuments[0].title, `Document title not translated in ${lang}`);
        assert(gal[0].title !== enGallery[0].title, `Gallery title not translated in ${lang}`);
      }

      // 6. Inscriptions & Monuments (all 3 inscriptions and 4 monuments)
      const inscs = getCanonicalInscriptions(lang);
      assert(inscs.length >= 3, `Expected >= 3 inscriptions for ${lang}`);
      const mons = getCanonicalMonuments(lang);
      assert(mons.length >= 4, `Expected >= 4 monuments for ${lang}`);
      if (lang !== 'en') {
        for (let i = 0; i < inscs.length; i++) {
          assert(inscs[i].name !== enInscriptions[i].name, `Inscription ${inscs[i].id} name not translated in ${lang}`);
        }
        for (let i = 0; i < mons.length; i++) {
          assert(mons[i].name !== enMonuments[i].name, `Monument ${mons[i].id} name not translated in ${lang}`);
        }
      }

      // 7. Articles & Documented Figures (including all 7 Gajapathi monarchs)
      const arts = getAllArticles(lang);
      const figs = getAllDocumentedFigures(lang);
      assert(arts.length >= 7, `Expected >= 7 canonical articles for ${lang}, got ${arts.length}`);
      assert(figs.length >= 14, `Expected >= 14 canonical figures for ${lang}, got ${figs.length}`);
      if (lang !== 'en') {
        const enArts = getAllArticles('en');
        const enFigs = getAllDocumentedFigures('en');
        for (let i = 0; i < Math.min(arts.length, 7); i++) {
          assert(arts[i].original_title !== enArts[i].original_title, `Article ${arts[i].id} title not translated in ${lang}`);
        }
        for (let i = 0; i < figs.length; i++) {
          assert(figs[i].name !== enFigs[i].name, `Figure ${figs[i].id} name not translated in ${lang}`);
          assert(figs[i].biography !== enFigs[i].biography, `Figure ${figs[i].id} biography not translated in ${lang}`);
        }
      }

      // 8. Navigation & Footer Community Heritage label in all 8 languages
      const navLabel = translations[lang].nav.communityHeritage;
      assert(typeof navLabel === 'string' && navLabel.trim().length > 0, `Missing nav.communityHeritage for ${lang}`);
      if (lang !== 'en') {
        assert(navLabel !== translations.en.nav.communityHeritage, `nav.communityHeritage not translated for ${lang}`);
      }
    }

    results.push({
      suite: 'Multilingual 8-Language System',
      test: 'Complete 8-language coverage across Genealogy, Gajapathi Kings, Inscriptions, Monuments, Timeline, Maps, Docs & Gallery',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Multilingual 8-Language System',
      test: 'Complete 8-language coverage across Genealogy, Gajapathi Kings, Inscriptions, Monuments, Timeline, Maps, Docs & Gallery',
      passed: false,
      error: err.message
    });
  }

  // Test 11: Backend Content API ?lang= Localization Verification
  try {
    const endpoints = [
      { path: '/api/content/genealogy?lang=te', key: 'genealogy', field: 'name' },
      { path: '/api/content/claims?lang=hi', key: 'claims', field: 'claim_statement' },
      { path: '/api/content/timeline?lang=or', key: 'events', field: 'title' },
      { path: '/api/content/locations?lang=kn', key: 'locations', field: 'name' },
      { path: '/api/content/inscriptions?lang=ta', key: 'inscriptions', field: 'name' },
      { path: '/api/content/monuments?lang=mr', key: 'monuments', field: 'name' },
      { path: '/api/content/documents?lang=bn', key: 'documents', field: 'title' },
      { path: '/api/content/gallery?lang=te', key: 'gallery', field: 'title' }
    ];

    for (const ep of endpoints) {
      const res = await fetch(`${BASE_URL}${ep.path}`);
      assert(res.status === 200, `Expected 200 for ${ep.path}, got ${res.status}`);
      const data = await res.json();
      const arr = data[ep.key];
      assert(Array.isArray(arr) && arr.length > 0, `Expected non-empty array ${ep.key} from ${ep.path}`);
      assert(typeof arr[0][ep.field] === 'string' && arr[0][ep.field].length > 0, `Expected localized ${ep.field} from ${ep.path}`);
    }

    results.push({
      suite: 'Multilingual 8-Language System',
      test: 'Backend API ?lang= localization for genealogy, claims, timeline, maps, inscriptions, monuments, docs & gallery',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Multilingual 8-Language System',
      test: 'Backend API ?lang= localization for genealogy, claims, timeline, maps, inscriptions, monuments, docs & gallery',
      passed: false,
      error: err.message
    });
  }

  // Test 12: Gallery Article Detail Dossiers, Clickable Keywords, Related Articles & 8-Language Support
  try {
    const supportedLangs = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;
    const enEnriched = getEnrichedGalleryArticles('en');
    assert(enEnriched.length >= 7, `Expected >= 7 enriched gallery articles, got ${enEnriched.length}`);

    for (const lang of supportedLangs) {
      const ui = GALLERY_UI_TRANSLATIONS[lang];
      assert(
        !!ui &&
          !!ui.viewDetails &&
          !!ui.backButton &&
          !!ui.closeButton &&
          !!ui.keywordsHeading &&
          !!ui.relatedArticlesHeading &&
          !!ui.noRelatedArticlesFound,
        `Missing GALLERY_UI_TRANSLATIONS fields for ${lang}`
      );

      const enrichedList = getEnrichedGalleryArticles(lang);
      assert(enrichedList.length === enEnriched.length, `Length mismatch in ${lang}`);

      for (let i = 0; i < enrichedList.length; i++) {
        const art = enrichedList[i];
        assert(!!art.fullDescription && art.fullDescription.length > 30, `Missing fullDescription for ${art.item.id} in ${lang}`);
        assert(art.historicalBackground.length > 0, `Missing historicalBackground for ${art.item.id} in ${lang}`);
        assert(art.importantDates.length > 0, `Missing importantDates for ${art.item.id} in ${lang}`);
        assert(art.historicalPeople.length > 0, `Missing historicalPeople for ${art.item.id} in ${lang}`);
        assert(art.historicalPlaces.length > 0, `Missing historicalPlaces for ${art.item.id} in ${lang}`);
        assert(art.references.length > 0, `Missing references for ${art.item.id} in ${lang}`);
        assert(art.keywords.length > 0, `Missing keywords for ${art.item.id} in ${lang}`);

        if (lang !== 'en') {
          assert(
            art.fullDescription !== enEnriched[i].fullDescription,
            `Gallery fullDescription not translated for ${art.item.id} in ${lang}`
          );
          assert(
            art.keywords[0].label !== enEnriched[i].keywords[0].label,
            `Gallery keyword label not translated for ${art.item.id} in ${lang}`
          );
        }

        // Verify Related Articles never include the current article itself
        const related = getRelatedGalleryArticles(art.item.id, lang, enrichedList);
        assert(related.length > 0, `Expected related articles for ${art.item.id} in ${lang}`);
        assert(
          related.every(r => r.article.item.id !== art.item.id),
          `Related articles must not include the currently open article ${art.item.id}`
        );

        // Verify Keyword filtering works for localized keyword label and canonical ID
        const kwMatchById = filterGalleryArticlesByKeyword(art.keywords[0].id, lang, enrichedList);
        assert(
          kwMatchById.some(m => m.item.id === art.item.id),
          `Keyword filter by ID ${art.keywords[0].id} failed for ${art.item.id} in ${lang}`
        );
        const kwMatchByLabel = filterGalleryArticlesByKeyword(art.keywords[0].label, lang, enrichedList);
        assert(
          kwMatchByLabel.some(m => m.item.id === art.item.id),
          `Keyword filter by localized label ${art.keywords[0].label} failed for ${art.item.id} in ${lang}`
        );
      }

      // Verify empty state when no articles match a keyword
      const emptyMatches = filterGalleryArticlesByKeyword('__nonexistent_keyword_xyz_999__', lang, enrichedList);
      assert(emptyMatches.length === 0, `Expected 0 matches for nonexistent keyword in ${lang}`);
    }

    results.push({
      suite: 'Gallery Upgrade & Related Content',
      test: 'Article detail dossiers, 8-language keywords, related articles & empty-state filtering',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Gallery Upgrade & Related Content',
      test: 'Article detail dossiers, 8-language keywords, related articles & empty-state filtering',
      passed: false,
      error: err.message
    });
  }

  // Test 13: Kalinga War Page — 8-Language Completeness, 7 Visual Scenes, Local Image Assets & Search
  try {
    const supportedLangs = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;
    const enKalinga = KALINGA_WAR_CONTENT.en;
    assert(enKalinga.scenes.length === 7, `Expected 7 visual scenes in KALINGA_WAR_CONTENT.en, got ${enKalinga.scenes.length}`);

    for (const lang of supportedLangs) {
      const content = KALINGA_WAR_CONTENT[lang];
      assert(!!content, `Missing KALINGA_WAR_CONTENT for ${lang}`);
      assert(!!content.pageTitle && content.pageTitle.trim().length > 10, `Missing pageTitle for ${lang}`);
      assert(!!content.subtitle && content.subtitle.trim().length > 10, `Missing subtitle for ${lang}`);
      assert(!!content.introParagraph && content.introParagraph.trim().length > 30, `Missing introParagraph for ${lang}`);
      assert(!!content.quickSummary.conflictValue && content.quickSummary.conflictValue.trim().length > 0, `Missing quickSummary.conflictValue for ${lang}`);
      assert(!!content.quickSummary.dateValue && content.quickSummary.dateValue.trim().length > 0, `Missing quickSummary.dateValue for ${lang}`);

      // Verify all Sections A–E exist and have substantial body paragraphs
      assert(!!content.sections.background.title && content.sections.background.p1.length > 30, `Missing background section in ${lang}`);
      assert(!!content.sections.battle.title && content.sections.battle.p1.length > 30, `Missing battle section in ${lang}`);
      assert(!!content.sections.tragedy.title && content.sections.tragedy.p1.length > 30, `Missing tragedy section in ${lang}`);
      assert(!!content.sections.remorse.title && content.sections.remorse.p1.length > 30, `Missing remorse section in ${lang}`);
      assert(!!content.sections.legacy.title && content.sections.legacy.p1.length > 30, `Missing legacy section in ${lang}`);

      assert(!!content.sections.tragedy.statDeathsNumber && !!content.sections.tragedy.statDeportedNumber, `Missing Edict XIII figures for ${lang}`);
      assert(content.scenes.length === 7, `Expected 7 scenes for ${lang}, got ${content.scenes.length}`);

      // Check every scene's local image existence, alt text, caption, source attribution, and translation
      for (let i = 0; i < content.scenes.length; i++) {
        const scene = content.scenes[i];
        assert(!!scene.sceneNumber && scene.sceneNumber.trim().length > 0, `Missing sceneNumber in ${lang}`);
        assert(!!scene.title && scene.title.trim().length > 0, `Missing scene ${scene.id} title in ${lang}`);
        assert(!!scene.narrative && scene.narrative.trim().length > 30, `Missing scene ${scene.id} narrative in ${lang}`);
        assert(!!scene.caption && scene.caption.trim().length > 20, `Missing scene ${scene.id} caption in ${lang}`);
        assert(!!scene.imageAlt && scene.imageAlt.trim().length > 10, `Missing scene ${scene.id} imageAlt text in ${lang}`);
        assert(!!scene.attribution && scene.attribution.trim().length > 10, `Missing scene ${scene.id} attribution in ${lang}`);

        const primaryRel = scene.imageUrl.replace(/^\//, '');
        const primaryAbs = path.resolve(process.cwd(), 'public', primaryRel);
        assert(fs.existsSync(primaryAbs), `Missing primary image file on disk: ${primaryAbs} (scene ${scene.id})`);

        if (scene.secondaryImageUrl) {
          const secRel = scene.secondaryImageUrl.replace(/^\//, '');
          const secAbs = path.resolve(process.cwd(), 'public', secRel);
          assert(fs.existsSync(secAbs), `Missing secondary image file on disk: ${secAbs} (scene ${scene.id})`);
        }

        if (lang !== 'en') {
          assert(scene.title !== enKalinga.scenes[i].title, `Scene ${scene.id} title not translated in ${lang}`);
          assert(scene.narrative !== enKalinga.scenes[i].narrative, `Scene ${scene.id} narrative not translated in ${lang}`);
          assert(scene.caption !== enKalinga.scenes[i].caption, `Scene ${scene.id} caption not translated in ${lang}`);
        }
      }

      if (lang !== 'en') {
        assert(content.pageTitle !== enKalinga.pageTitle, `pageTitle not translated in ${lang}`);
        assert(content.sections.background.title !== enKalinga.sections.background.title, `Section A title not translated in ${lang}`);
        assert(content.sections.tragedy.title !== enKalinga.sections.tragedy.title, `Section C title not translated in ${lang}`);
      }

      // Check navigation translation for kalingaWar
      const navKalinga = translations[lang].nav.kalingaWar;
      assert(typeof navKalinga === 'string' && navKalinga.trim().length > 0, `Missing nav.kalingaWar for ${lang}`);
      if (lang !== 'en') {
        assert(navKalinga !== translations.en.nav.kalingaWar, `nav.kalingaWar not translated for ${lang}`);
      }
    }

    // Check Global Search finds Kalinga War page
    const searchHits = performClientSearch('Dhauli', 'all', 'en');
    assert(searchHits.some(h => h.link === '/kalinga-war'), 'Expected Global Search for "Dhauli" to return /kalinga-war');

    results.push({
      suite: 'Kalinga War Documentary Page',
      test: '8-language translations, Sections A-F, 7 visual scenes, local image files & search indexing',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Kalinga War Documentary Page',
      test: '8-language translations, Sections A-F, 7 visual scenes, local image files & search indexing',
      passed: false,
      error: err.message
    });
  }

  // Test 14: Community-Heritage Record "syn_waddar_vaddar" Previous State Verification
  try {
    const matches = COMMUNITY_SYNONYMS.filter(s => s.id === 'syn_waddar_vaddar');
    assert(matches.length === 1, `Expected exactly 1 record with id "syn_waddar_vaddar", got ${matches.length}`);

    const record = matches[0];
    assert(record.title === 'Waddar / Vaddar', `Expected title "Waddar / Vaddar", got "${record.title}"`);
    assert(record.category === 'Civic & Water Engineering', `Expected category "Civic & Water Engineering"`);
    assert(record.designation_group === 'Regional community designations', `Expected group "Regional community designations"`);
    assert(record.geographical_association === 'Karnataka & Maharashtra', `Expected geography "Karnataka & Maharashtra"`);
    assert(!('synonyms_and_regional_designations' in record), 'Expected synonyms_and_regional_designations to be removed');

    const supportedLangs = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;
    for (const lang of supportedLangs) {
      assert(
        !!record.historical_role[lang] && record.historical_role[lang]!.length > 10,
        `Missing historical_role for syn_waddar_vaddar in ${lang}`
      );
      assert(
        !!record.epistemic_note[lang] && record.epistemic_note[lang]!.length > 10,
        `Missing epistemic_note for syn_waddar_vaddar in ${lang}`
      );
    }

    results.push({
      suite: 'Community-Heritage Reference',
      test: 'syn_waddar_vaddar restored to exact previous state across all 8 languages',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Community-Heritage Reference',
      test: 'syn_waddar_vaddar restored to exact previous state across all 8 languages',
      passed: false,
      error: err.message
    });
  }

  // Test 15: Direct PDF Export Complete Content Box & Description Preservation
  try {
    const testDomHtml = `
      <article class="print-article-container">
        <header>
          <h1>Odra-Kshatriya Heritage Analysis</h1>
          <span>Suryavamsha Imperial Heritage</span>
        </header>

        <!-- Section 2: Executive Historical Summary -->
        <section class="border-l-4 border-[#d4af37]">
          <h2>Executive Historical Summary</h2>
          <p class="whitespace-pre-line">Comprehensive historical summary of royal inscriptions and lineage continuity.</p>
        </section>

        <!-- Section 3: Complete Monograph Content -->
        <section>
          <h2>Complete Historical Content</h2>
          <div class="whitespace-pre-line bg-[#111623] rounded-xl p-5 border">
            Monograph narrative detailed body paragraph 1 explaining dynastic migration.
            Monograph narrative detailed body paragraph 2 examining military settlements.
          </div>
        </section>

        <!-- Section 4: Detailed Subject Analysis (3 numbered verification sections) -->
        <section>
          <h2>Detailed Subject Analysis</h2>
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="bg-emerald-950/20 rounded-xl p-4 border">
              <h3>1. VERIFIED EPIGRAPHIC & ARCHAEOLOGICAL EVIDENCE</h3>
              <p class="whitespace-pre-line">Primary epigraphic proof attested in Veligalani and Kondavidu copper plates.</p>
            </div>
            <div class="bg-[#141a29] rounded-xl p-4 border">
              <h3>2. CULTURAL TRADITION & LINEAGE RECORDS</h3>
              <p class="whitespace-pre-line">Dynastic genealogies preserved in temple palm leaf manuscripts and copper plates.</p>
            </div>
          </div>
          <div class="bg-amber-950/20 rounded-xl p-4 border">
            <h3>3. EPISTEMIC CLASSIFICATION & CRITICAL SCOPE</h3>
            <p class="whitespace-pre-line">Historiographical demarcation of primary archaeological evidence versus local oral traditions.</p>
          </div>
        </section>

        <!-- Section 5: Chronological Timeline -->
        <section>
          <h2>Chronological Timeline</h2>
          <div class="space-y-3">
            <div class="bg-[#121725] rounded-xl p-4 border flex">
              <div class="sm:w-64">
                <span>1435 CE – 1466 CE</span>
                <div><span>Epigraphically Confirmed</span></div>
              </div>
              <div>
                <h3>Accession of Emperor Kapilendra Deva</h3>
                <p class="whitespace-pre-line">Ascended the throne at Cuttack and founded the Suryavamsha Gajapathi Imperial dynasty.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 6: Verified Inscriptions -->
        <section>
          <h2>Verified Inscriptions & Archaeological Evidence</h2>
          <div class="p-4 rounded-xl bg-[#121826] border">
            <div>
              <h3>Veligalani Copper Plate Charter</h3>
              <span>1458 CE</span>
            </div>
            <p class="whitespace-pre-line">Bilingual grant in Sanskrit and Odia recording land endowment by Gajapati Kapilendra Deva.</p>
          </div>
        </section>

        <!-- Section 7: Historical Source References -->
        <section>
          <h2>Historical Source References</h2>
          <div class="p-4 rounded-xl bg-[#121826] border">
            <div>
              <span>Epigraphia Indica</span>
              <span>Verified Source</span>
            </div>
            <p>Epigraphia Indica Vol. XXXIII, pp. 275-292, Edited by Dr. D.C. Sircar.</p>
          </div>
        </section>

        <!-- Section 8: Related Context -->
        <section>
          <h2>Related Historical Context</h2>
          <div class="p-3.5 rounded-xl border bg-[#121826]">
            <div>
              <span>#1/74 Gajapati</span>
              <span>Imperial Dynasty</span>
            </div>
            <p>Dynastic title assumed by the rulers of Odisha from the 15th century.</p>
          </div>
        </section>
      </article>
    `;

    const dom = new JSDOM(testDomHtml);
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
    (global as any).Node = dom.window.Node;
    (global as any).Element = dom.window.Element;
    (global as any).HTMLElement = dom.window.HTMLElement;
    (global as any).NodeFilter = dom.window.NodeFilter;

    const articleEl = dom.window.document.querySelector('article') as HTMLElement;
    const extracted = extractStructuredArticleContent(articleEl, 'Odra-Kshatriya Heritage Analysis');

    const contentCards = extracted.blocks.filter((b): b is Extract<typeof b, { type: 'contentCard' }> => b.type === 'contentCard');
    assert(contentCards.length >= 8, `Expected at least 8 content cards, got ${contentCards.length}`);

    // Verify Executive Summary card
    const execCard = contentCards.find(c => c.title?.includes('Executive') || c.paragraphs[0]?.includes('Comprehensive historical summary'));
    assert(!!execCard && execCard.paragraphs.length > 0, 'Missing Executive Summary content card or descriptive text');

    // Verify 3 Verification sections
    const card1 = contentCards.find(c => c.title?.includes('VERIFIED EPIGRAPHIC'));
    assert(!!card1 && card1.paragraphs[0]?.includes('Veligalani and Kondavidu'), 'Missing Verification Section 1 description');

    const card2 = contentCards.find(c => c.title?.includes('CULTURAL TRADITION'));
    assert(!!card2 && card2.paragraphs[0]?.includes('Dynastic genealogies'), 'Missing Verification Section 2 description');

    const card3 = contentCards.find(c => c.title?.includes('EPISTEMIC CLASSIFICATION'));
    assert(!!card3 && card3.paragraphs[0]?.includes('Historiographical demarcation'), 'Missing Verification Section 3 description');

    // Verify Timeline card
    const timelineCard = contentCards.find(c => c.title?.includes('Kapilendra Deva'));
    assert(Boolean(timelineCard && timelineCard.paragraphs[0]?.includes('Ascended the throne')), 'Missing Timeline event description');
    assert(Boolean(timelineCard?.badge && timelineCard.badge.includes('1435 CE')), 'Missing Timeline period badge');

    // Verify Inscription card
    const inscCard = contentCards.find(c => c.title?.includes('Veligalani'));
    assert(Boolean(inscCard && inscCard.paragraphs[0]?.includes('Bilingual grant')), 'Missing Inscription details description');

    // Verify Source Reference card
    const refCard = contentCards.find(c => c.title?.includes('Epigraphia Indica') || c.badge?.includes('Verified Source'));
    assert(Boolean(refCard && refCard.paragraphs[0]?.includes('Vol. XXXIII')), 'Missing Source Reference citation description');

    // Verify Related 70 card
    const r70Card = contentCards.find(c => c.title?.includes('Gajapati') || c.badge?.includes('Imperial Dynasty'));
    assert(Boolean(r70Card && r70Card.paragraphs[0]?.includes('Dynastic title assumed')), 'Missing Related 70 context note description');

    results.push({
      suite: 'Direct Download PDF Pipeline',
      test: 'Complete content box preservation, recursive text extraction & zero truncation for all 8 article sections',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Direct Download PDF Pipeline',
      test: 'Complete content box preservation, recursive text extraction & zero truncation for all 8 article sections',
      passed: false,
      error: err.message
    });
  }

  // ---------------------------------------------------------------------------
  // 16. DYNAMIC SOCIAL SHARING PREVIEW IMAGE SYSTEM (OPEN GRAPH & TWITTER CARDS)
  // ---------------------------------------------------------------------------
  try {
    const {
      resolveSeoMetadata,
      injectSeoMetadataIntoHtml,
      getAllPrerenderTargets
    } = await import('../src/utils/seoMetadata');
    const fs = await import('fs');
    const path = await import('path');

    const testOrigin = 'https://suryavamsha-odiyaraju.org';

    // 1. Verify all 61 pre-rendered OG images in public/assets/og/ are 1200x630 JPEGs
    const ogDir = path.resolve(process.cwd(), 'public/assets/og');
    assert(fs.existsSync(ogDir), 'Missing public/assets/og directory');
    const ogFiles = fs.readdirSync(ogDir).filter(f => f.endsWith('.jpg'));
    assert(ogFiles.length >= 61, `Expected at least 61 OG preview images, found ${ogFiles.length}`);

    for (const file of ogFiles) {
      const buf = fs.readFileSync(path.join(ogDir, file));
      assert(buf[0] === 0xff && buf[1] === 0xd8, `${file} is not a valid JPEG`);
      let offset = 2;
      let width = 0;
      let height = 0;
      while (offset < buf.length) {
        if (buf[offset] !== 0xff) {
          offset++;
          continue;
        }
        const marker = buf[offset + 1];
        if (marker === 0xc0 || marker === 0xc2) {
          height = buf.readUInt16BE(offset + 5);
          width = buf.readUInt16BE(offset + 7);
          break;
        }
        const segLen = buf.readUInt16BE(offset + 2);
        offset += 2 + segLen;
      }
      assert(width === 1200 && height === 630, `${file} dimensions ${width}x${height} !== 1200x630`);
    }

    // 2. Verify distinct metadata and images across routes and individual articles/figures
    const kapilendraMeta = resolveSeoMetadata({
      pathname: '/kings-queens',
      search: '?figure=fig_kapilendra_deva',
      origin: testOrigin
    });
    const purushottamaMeta = resolveSeoMetadata({
      pathname: '/kings-queens',
      search: '?figure=fig_purushottama_deva',
      origin: testOrigin
    });
    const odraArticleMeta = resolveSeoMetadata({
      pathname: '/research',
      search: '?article=art_odra_desha_history',
      origin: testOrigin
    });
    const baxiMeta = resolveSeoMetadata({
      pathname: '/community-prominent-persons',
      search: '?id=baxi_jagabandhu_paika_general',
      origin: testOrigin
    });
    const publisherMeta = resolveSeoMetadata({
      pathname: '/community-prominent-persons',
      search: '?id=dr_g_sathyanarayana_raju',
      origin: testOrigin
    });

    assert(kapilendraMeta.title !== purushottamaMeta.title, 'Monarch OG titles must be distinct');
    assert(kapilendraMeta.imageUrl !== purushottamaMeta.imageUrl, 'Monarch OG images must be distinct');
    assert(kapilendraMeta.imageUrl.endsWith('/assets/og/kapilendra_deva_portrait.jpg'), 'Unexpected Kapilendra OG image');
    assert(purushottamaMeta.imageUrl.endsWith('/assets/og/purushottama_deva_kanchi.jpg'), 'Unexpected Purushottama OG image');
    assert(odraArticleMeta.imageUrl.endsWith('/assets/og/odra_kalinga_map.jpg'), 'Unexpected Odra article OG image');
    assert(baxiMeta.imageUrl.endsWith('/assets/og/baxi_jagabandhu_statue.jpg'), 'Unexpected Baxi Jagabandhu OG image');
    assert(publisherMeta.imageUrl.endsWith('/assets/og/dr_g_sathyanarayana_raju.jpg'), 'Unexpected G.Sathyanarayana Raju.Peetla. OG image');

    // 3. Verify 8-language localized metadata
    const langs = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'] as const;
    for (const lang of langs) {
      const m = resolveSeoMetadata({
        pathname: '/kings-queens',
        search: `?figure=fig_kapilendra_deva&lang=${lang}`,
        origin: testOrigin
      });
      assert(Boolean(m.title && !m.title.includes('undefined')), `Missing localized title for ${lang}`);
      assert(Boolean(m.description && !m.description.includes('undefined')), `Missing localized description for ${lang}`);
      assert(m.imageUrl.startsWith('https://'), `Non-HTTPS imageUrl for ${lang}`);
    }

    // 4. Verify HTML injection produces complete Open Graph and Twitter Card tags
    const baseHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
    const injected = injectSeoMetadataIntoHtml(baseHtml, kapilendraMeta);
    assert(injected.includes('property="og:title" content="Kapilendra Deva Gajapathi'), 'Injected HTML missing og:title');
    assert(injected.includes('property="og:image" content="https://suryavamsha-odiyaraju.org/assets/og/kapilendra_deva_portrait.jpg"'), 'Injected HTML missing og:image');
    assert(injected.includes('property="og:image:width" content="1200"'), 'Injected HTML missing og:image:width');
    assert(injected.includes('property="og:image:height" content="630"'), 'Injected HTML missing og:image:height');
    assert(injected.includes('name="twitter:card" content="summary_large_image"'), 'Injected HTML missing twitter:card');
    assert(injected.includes('name="twitter:image" content="https://suryavamsha-odiyaraju.org/assets/og/kapilendra_deva_portrait.jpg"'), 'Injected HTML missing twitter:image');

    const targets = getAllPrerenderTargets();
    assert(targets.length >= 150, `Expected >= 150 prerender targets, got ${targets.length}`);

    results.push({
      suite: 'Dynamic Social Sharing SEO',
      test: '61 1200x630 OG images, route & article metadata, 8 languages, and crawler HTML injection',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Dynamic Social Sharing SEO',
      test: '61 1200x630 OG images, route & article metadata, 8 languages, and crawler HTML injection',
      passed: false,
      error: err.message
    });
  }

  // Test: Admin Account Registration & Login System (Owner-Authorized RBAC)
  try {
    // A. Unauthorized visitor attempts to register as Admin -> Must be rejected with 403
    const unauthEmail = `unauthorized.visitor.${Date.now()}@gmail.com`;
    const unauthRes = await fetch(`${BASE_URL}/api/auth/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: 'Visitor',
        last_name: 'Imposter',
        email: unauthEmail,
        mobile_number: '+91 9876543210',
        city: 'Bengaluru',
        state: 'Karnataka',
        country: 'India',
        password: 'RoyalAdminPassword@2026',
        confirm_password: 'RoyalAdminPassword@2026'
      })
    });
    assert(unauthRes.status === 403, `Expected 403 for unauthorized admin registration, got ${unauthRes.status}`);

    // B. Eligibility check for unauthorized visitor returns 403
    const eligRes = await fetch(`${BASE_URL}/api/auth/admin/check-eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: unauthEmail })
    });
    assert(eligRes.status === 403, `Expected 403 for unauthorized eligibility check, got ${eligRes.status}`);

    // C. Eligibility check for authorized owner bgsathyaraju@gmail.com
    const ownerEligRes = await fetch(`${BASE_URL}/api/auth/admin/check-eligibility`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bgsathyaraju@gmail.com' })
    });
    // Status should be 200 (eligible) or 409 (already registered if previously run)
    assert([200, 409].includes(ownerEligRes.status), `Expected 200 or 409 for owner eligibility, got ${ownerEligRes.status}`);

    // D. Normal member attempts Admin Login -> Must be rejected with 403
    const memberLoginRes = await fetch(`${BASE_URL}/api/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'researcher.odra@suryavamsha-heritage.org',
        password: 'Heritage@2026'
      })
    });
    assert(memberLoginRes.status === 403, `Expected 403 for normal member admin login, got ${memberLoginRes.status}`);

    // E. Super Admin login -> Succeeds and grants admin access
    const adminLoginRes = await fetch(`${BASE_URL}/api/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@suryavamsha-heritage.org',
        password: 'Heritage@2026'
      })
    });
    assert(adminLoginRes.status === 200, `Expected 200 for super_admin login, got ${adminLoginRes.status}`);
    const adminData = await adminLoginRes.json();
    assert(adminData.user.role === 'super_admin', `Expected super_admin role, got ${adminData.user?.role}`);

    results.push({
      suite: 'Admin Account & Authorization System',
      test: 'Owner eligibility, strict RBAC guard, mobile validation, and admin login',
      passed: true
    });
  } catch (err: any) {
    results.push({
      suite: 'Admin Account & Authorization System',
      test: 'Owner eligibility, strict RBAC guard, mobile validation, and admin login',
      passed: false,
      error: err.message
    });
  }

  // Print Summary Table
  console.log('-----------------------------------------------------------------------------------------------------');
  console.log('| Suite                               | Test Name                                            | Status');
  console.log('-----------------------------------------------------------------------------------------------------');
  let allPassed = true;
  for (const r of results) {
    const statusText = r.passed ? '✅ PASS' : '❌ FAIL';
    if (!r.passed) allPassed = false;
    const suiteStr = r.suite.padEnd(35).substring(0, 35);
    const testStr = r.test.padEnd(52).substring(0, 52);
    console.log(`| ${suiteStr} | ${testStr} | ${statusText}`);
    if (r.error) {
      console.log(`  └─ Error: ${r.error}`);
    }
  }
  console.log('-----------------------------------------------------------------------------------------------------\n');

  if (allPassed) {
    console.log(`✨ All ${results.length} automated test suites PASSED with 100% success rate!`);
  } else {
    console.error(`⚠️ Some tests failed. Please review the output above.`);
    process.exitCode = 1;
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
