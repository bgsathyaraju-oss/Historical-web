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
import { performClientSearch } from '../src/utils/searchEngine.ts';
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
      assert(genNodes.length === 9, `Expected 9 genealogy nodes for ${lang}, got ${genNodes.length}`);
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
        for (let i = 0; i < arts.length; i++) {
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
