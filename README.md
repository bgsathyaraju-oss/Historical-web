# SURYAVAMSHA ODIYARAJU KSHATRIYA
## Historical Documentary, Royal Heritage & Global Community Portal
### Secondary Title: SURYAVAMSHI ODIYA GAJAPATHI RAJULU — HISTORICAL DOCUMENTARY & COMMUNITY HERITAGE PORTAL

---

## 1. Project Overview & Role Mandate

This application is a production-grade, secure, multilingual historical documentary platform and global community archive dedicated to researching, transcribing, verifying, and preserving the history, inscriptions, literature, and living community traditions of:

- **Suryavamsha Odiyaraju Kshatriya**
- **Suryavamshi Odiya Rajput Kshatriya**
- **Odiya Gajapathi Rajulu**
- **Odra Desha** and the historical Odra region
- **Gajapathi Rulers** (Kapilendra Deva, Purushottama Deva, Prataparudra Deva)
- Corroborated historical connections across Odra, Kalinga, Utkala, and Trikalinga

### Historiographical Standard & Epistemic Demarcation
In accordance with professional historical standards, unverified traditions, royal genealogies, or community claims are **never** presented as established historical facts. The platform explicitly and visually distinguishes:
1. **Verified Epigraphic / Primary Evidence** (Copper-plate grants, stone pillar inscriptions from *Epigraphia Indica* and *South Indian Inscriptions*).
2. **Scholarly Academic Interpretations** (Peer-reviewed historical monographs and archaeological findings).
3. **Traditional Chronicles & Vamsavalis** (Madala Panji, Mackenzie manuscripts, family palm-leaf genealogies).
4. **Oral History & Regional Memory** (Migration traditions across the Deccan and South).
5. **Living Community Heritage** (Sacred observances, martial arts, solar rituals).

---

## 2. 8-Language Multilingual Support

The portal provides an internationalization framework covering eight major Indian languages:
1. **English (en)** — Default
2. **Hindi (hi)** — हिन्दी (Devanagari script)
3. **Telugu (te)** — తెలుగు (Telugu script)
4. **Kannada (kn)** — ಕನ್ನಡ (Kannada script)
5. **Tamil (ta)** — தமிழ் (Tamil script)
6. **Marathi (mr)** — मराठी (Devanagari script)
7. **Odia (or)** — ଓଡ଼ିଆ (Odia script)
8. **Bengali (bn)** — বাংলা (Bengali script)

The language switcher in the header enables seamless switching without resetting the page state. Language preferences are preserved in local storage and synced with member preferences.

---

## 3. Technology Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons.
- **Backend API**: Express server running with TypeScript (`tsx server.ts`).
- **Database & Storage**: Atomic transactional JSON persistence engine (`server/db.ts`) with normalized tables, relational indexes, foreign key enforcement, and audit logs.
- **Authentication**: Bcrypt password hashing (10 salt rounds), secure session cookies, tokenized password recovery, rate-limiting protection against brute-force attacks.
- **Role-Based Access Control (RBAC)**:
  - Super Administrator
  - Website Administrator
  - Historical Editor
  - Research Reviewer
  - Translator
  - Community Moderator
  - Registered Member
  - Public Visitor

---

## 4. Pre-Seeded Accounts for Testing

For immediate evaluation, the database comes pre-seeded with three verified accounts:

| Role | Email | Password | Privileges |
|------|-------|----------|------------|
| **Super Admin** | `admin@suryavamsha-heritage.org` | `Heritage@2026` | Full administrative control, user role management, system audit log |
| **Historical Editor** | `historian.editor@suryavamsha-heritage.org` | `Heritage@2026` | Moderation queue review, research article publishing, translation review |
| **Registered Member** | `researcher.odra@suryavamsha-heritage.org` | `Heritage@2026` | Profile editing, research contribution submission, bookmarks, event registration |

---

## 5. Required Pages Implemented (30+ Complete Pages)

1. **Homepage** (`/`): Royal hero banner, core pillars, interactive timeline, featured research, gallery showcase, live computed statistics.
2. **About the Project** (`/about`): Methodological integrity guidelines, non-fabrication rule, editorial board.
3. **Historical Documentary** (`/documentary`): 6-category structured knowledge repository with article reader and source citations.
4. **Historical Timeline** (`/timeline`): Interactive chronological milestone stream with primary sources and uncertainty notes.
5. **Odra Desha** (`/odra-desha`): Classical Audra geography, Xuanzang accounts, territorial evolution.
6. **Gajapathi Kingdom** (`/gajapathi-kings`): Imperial golden age, military administration (Gajasena), Nayakas and Mahapatras.
7. **Kings & Queens** (`/kings-queens`): Biographical dossiers for Kapilendra Deva, Purushottama Deva, Prataparudra Deva, Hamvira Deva.
8. **Royal Genealogy** (`/genealogy`): Interactive family tree with documented epigraphic links vs traditional vamsavali lines.
9. **Historical Maps** (`/maps`): Cartographic reconstructions of the empire (c. 1465 CE) and archaeological locations.
10. **Inscriptions & Archaeology** (`/inscriptions`): Veligalani plates, Lingaraja stone record, Simhachalam pillars with transcripts and translations.
11. **Temples & Monuments** (`/temples-monuments`): Meghanada Pacheri at Puri, Konark, Barabati citadel.
12. **Historical Documents** (`/documents`): Madala Panji, Sarasvati Vilasa, palm-leaf manuscript preservation.
13. **Research Articles** (`/research`): Peer-reviewed studies on medieval Odra history and epigraphy.
14. **Historical Gallery** (`/gallery`): High-resolution imagery with lightbox viewer, attribution, and license details.
15. **Culture & Traditions** (`/culture-traditions`): Solar worship, martial traditions, and Jagannatha servitorship.
16. **Literature & Publications** (`/literature`): Sarala Mahabharata, Sarasvati Vilasa, Abhinava Gitagovinda.
17. **Historical References** (`/references`): Bibliographical catalog of primary epigraphs and secondary monographs.
18. **Community Heritage** (`/community-heritage`): Historical diaspora settlements across Andhra, Karnataka, and Tamil Nadu.
19. **Community Activities** (`/community-activities`): Educational scholarships, manuscript preservation drives, heritage caravans.
20. **Events & Announcements** (`/events`): Gatherings with live seat registration.
21. **Public Member Directory** (`/directory`): Searchable directory with privacy protection (dates of birth and private contact strictly hidden).
22. **Member Registration** (`/register`): 12 mandatory required fields + 10 optional fields (22 total fields) with password strength checking.
23. **Member Login** (`/login`): Rate-limited secure login with quick test credentials.
24. **Password Recovery** (`/password-recovery`): Tokenized password reset flow.
25. **Member Dashboard** (`/dashboard`): Profile overview, submissions queue, bookmarks, password change, account deletion request.
26. **Edit Profile** (`/edit-profile`): Update personal details and directory visibility (Public, Members Only, Private).
27. **Submit Historical Research** (`/submit-research`): Submission form for articles, manuscripts, old photos, and inscriptions with copyright declaration.
28. **Contact Us** (`/contact`): Editorial board communication and archival donation desk.
29. **Privacy Policy** (`/privacy`): Full data rights, encryption standards, right to be forgotten.
30. **Terms & Conditions** (`/terms`): Non-commercial educational usage terms and conduct rules.
31. **Copyright & Permissions** (`/copyright`): Public domain epigraphy notice and Creative Commons image licensing.
32. **Accessibility Statement** (`/accessibility`): WCAG 2.1 AA compliance and multi-script typography.
33. **Administrator Dashboard** (`/admin`): Metrics, user role management, account suspension, moderation queue, translation manager, audit logs.

---

## 6. How to Run, Test & Verify

### 1. Database Migration & Schema Verification
Before running or deploying the app, initialize the tables, directories, and pre-seeded accounts:
```bash
npm run migrate
```

### 2. Start Development Server
```bash
npm run dev
```
The server will run on port 3000, serving the Express backend and mounting Vite middleware.

### 3. Run Automated Verification Test Suite
The comprehensive automated test suite validates:
- Registration field validation & privilege escalation prevention
- Password strength rules and hashing
- Login authentication & rate-limiting protection
- File upload security (MIME validation, size restriction, profile photo association)
- Email verification flow (token issuance and verification)
- Password recovery (forgot-password token & reset-password)
- Role-based access control (RBAC) preventing unauthorized access to administrative endpoints
- Privacy protection in Member Directory (exclusion of dates of birth and private profiles)
- 8-language translations retrieval across English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, and Bengali
- Historical epigraphic citations and primary sources integrity

To run the test suite:
```bash
npm test
```

### 4. Code Quality & Type Checking
```bash
npm run lint
```

---

## 7. Production Deployment Instructions

### Production Build
1. Build the frontend client bundle:
   ```bash
   npm run build
   ```
2. Start the production server with Node:
   ```bash
   npm run start
   ```
   In production (`NODE_ENV=production`), `server.ts` statically serves the optimized production assets from `dist/` and handles API requests and secure file uploads.

### Container & Cloud Run Deployment
- **Port Binding**: The app binds to `process.env.PORT || 3000` on `0.0.0.0`.
- **Persistent Volume**: Mount `/data` as a persistent volume (or Cloud Storage bucket) to preserve `data/database.json` and `data/uploads/` across container restarts.
- **Security Headers**: HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, and `X-XSS-Protection` are enabled by default on all routes.
- **Cookie Security**: Authentication session tokens are stored in `httpOnly`, `SameSite=Lax` cookies with `secure: true` in production mode.
