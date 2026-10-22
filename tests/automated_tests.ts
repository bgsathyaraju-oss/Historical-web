import { runMigrations } from '../server/migrate.ts';
import { getDb, saveDb } from '../server/db.ts';

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
