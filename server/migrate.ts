import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import { getDb, saveDb, type DatabaseSchema } from './db.ts';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const UPLOADS_DIR = path.resolve(DATA_DIR, 'uploads');
const DB_FILE = path.resolve(DATA_DIR, 'database.json');

export function runMigrations(): { success: boolean; changes: string[] } {
  const changes: string[] = [];

  // 1. Ensure Data and Upload Directories exist
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    changes.push('Created data directory');
  }

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    changes.push('Created data/uploads secure archive directory');
  }

  // 2. Load or initialize database
  const db = getDb();

  // 3. Ensure all table collections exist
  const tableKeys: (keyof DatabaseSchema)[] = [
    'users',
    'user_passwords',
    'profiles',
    'preferences',
    'articles',
    'figures',
    'dynasties',
    'genealogy',
    'events_timeline',
    'locations',
    'inscriptions',
    'monuments',
    'documents',
    'gallery',
    'claims',
    'submissions',
    'community_events',
    'event_registrations',
    'bookmarks',
    'password_resets',
    'email_verifications',
    'audit_logs'
  ];

  for (const key of tableKeys) {
    if (key === 'user_passwords') {
      if (!db.user_passwords || typeof db.user_passwords !== 'object') {
        db.user_passwords = {};
        changes.push(`Initialized empty ${key} record map`);
      }
    } else {
      if (!Array.isArray(db[key])) {
        (db as any)[key] = [];
        changes.push(`Initialized empty ${key} collection array`);
      }
    }
  }

  // 4. Validate and ensure pre-seeded admin accounts
  const superAdmin = db.users.find(u => u.email === 'admin@suryavamsha-heritage.org');
  if (!superAdmin) {
    const adminId = 'usr_admin_001';
    db.users.push({
      id: adminId,
      email: 'admin@suryavamsha-heritage.org',
      role: 'super_admin',
      status: 'active',
      email_verified: true,
      created_at: new Date().toISOString()
    });
    db.user_passwords[adminId] = bcrypt.hashSync('Heritage@2026', 10);
    changes.push('Created default Super Admin account');
  }

  // 5. Ensure profile visibility field defaults to members if undefined
  let patchedProfiles = 0;
  for (const prof of db.profiles) {
    if (!prof.profile_visibility) {
      prof.profile_visibility = 'members';
      patchedProfiles++;
    }
  }
  if (patchedProfiles > 0) {
    changes.push(`Patched ${patchedProfiles} profiles with default 'members' privacy visibility`);
  }

  // 6. Ensure Foundational Progenitor Genealogy Nodes (Sagara, Bhagiratha, Sri Rama)
  const progenitorNodes = [
    {
      id: 'gen_samrat_sagara',
      name: 'Samrat Sagara (Universal Chakravartin)',
      titles: 'Suryavamsha Ikshvaku Sovereign Ancestor',
      reign: 'Sacred Lineage Antiquity',
      generation: -2,
      relationship_type: 'traditional_account' as const,
      children: ['gen_maharshi_bhagiratha'],
      sources: ['Valmiki Ramayana (Balakanda)', 'Vishnu Purana', 'Mahabharata (Vana Parva)'],
      notes: 'Celebrated universal emperor of the Solar race and royal progenitor of the 60,000 princes.'
    },
    {
      id: 'gen_maharshi_bhagiratha',
      name: 'Maharshi Bhagiratha',
      titles: 'Architect of the Descent of the Ganges (Gangavatarana)',
      reign: 'Sacred Lineage Antiquity',
      generation: -1,
      relationship_type: 'traditional_account' as const,
      parent_id: 'gen_samrat_sagara',
      children: ['gen_sri_rama'],
      sources: ['Valmiki Ramayana', 'Skanda Purana', 'Epigraphia Indica Invocations'],
      notes: 'Pioneering king-sage renowned for resolute effort (Bhagiratha Prayatna) and cosmic hydraulic canalization.'
    },
    {
      id: 'gen_sri_rama',
      name: 'Maryada Purushottama Sri Rama',
      titles: 'King of Ayodhya & Supreme Solar Sovereign',
      reign: 'Treta Yuga / Sacred Lineage Root',
      generation: 0,
      relationship_type: 'traditional_account' as const,
      parent_id: 'gen_maharshi_bhagiratha',
      children: ['gen_kapilendra'],
      sources: ['Valmiki Ramayana', 'Raghuvamsha of Kalidasa', 'Gajapathi Royal Inscriptions'],
      notes: 'The paramount sovereign exemplar of the Suryavamsha solar lineage, formally invoked by the Gajapathi emperors of Odisha.'
    }
  ];

  for (const pNode of progenitorNodes) {
    if (!db.genealogy.some(g => g.id === pNode.id)) {
      db.genealogy.unshift(pNode);
      changes.push(`Added genealogy progenitor node: ${pNode.name}`);
    }
  }

  // Update Kapilendra's parent_id if needed
  const kapilendra = db.genealogy.find(g => g.id === 'gen_kapilendra');
  if (kapilendra && !kapilendra.parent_id) {
    kapilendra.parent_id = 'gen_sri_rama';
    changes.push('Linked Kapilendra Deva to Suryavamsha solar race lineage');
  }

  // 7. Ensure Historical Timeline Events (Kharavela, Jasma Devi, Siddharameshwara)
  const milestoneEvents = [
    {
      id: 'ev_kharavela_1st_bce',
      period: '1st Century BCE',
      year_text: 'c. 1st Century BCE',
      sort_year: -100,
      title: 'Emperor Kharavela of Kalinga-Odra & Hathigumpha Inscription',
      rulers_involved: 'Maha-Meghavahana Emperor Kharavela',
      political_development: 'Emperor Kharavela established sovereign suzerainty over eastern and central India, extended ancient irrigation canals from Tanusuliya into Kalinganagari, and constructed rock-cut Jain monastic cave shelters at Udayagiri-Khandagiri.',
      monuments_inscriptions: 'Hathigumpha 17-line Brahmi Prakrit Inscription; Ranigumpha & Ganesagumpha rock-cut complexes.',
      primary_sources: 'Epigraphia Indica, Vol. XX; Hathigumpha Inscription ed. by K.P. Jayaswal & R.D. Banerji.',
      uncertainty_notes: 'Epigraphically verified primary source; discussions focus on precise coronation date between 2nd and 1st Century BCE.'
    },
    {
      id: 'ev_jasma_devi_1120',
      period: '12th Century CE',
      year_text: 'c. 1120 CE',
      sort_year: 1120,
      title: 'Mata Jasma Devi & Sacred Sovereign Dignity at Sahasralinga Reservoir',
      rulers_involved: 'Mata Jasma Odan & Siddharaja Jayasimha (Chaulukya/Solanki)',
      political_development: 'During the excavation of the monumental Sahasralinga Talav in Patan, Mata Jasma Devi defended the moral dignity, collective solidarity, and autonomy of the Oad-Rajput guild against royal coercion, becoming an eternal sacred symbol of chastity, labor rights, and self-sacrifice.',
      monuments_inscriptions: 'Jasma Devi Temple at Patan; Sahasralinga Talav archaeological remains.',
      primary_sources: 'Gujarat State Gazetteer; Prabandhacintamani; Oad traditional oral ballads.',
      uncertainty_notes: 'Classified as sacred living tradition and historical folklore deeply corroborated by surviving temple architecture and centuries-old ballads across Gujarat and Rajasthan.'
    },
    {
      id: 'ev_siddharameshwara_1150',
      period: '12th Century CE',
      year_text: 'c. 1150 CE',
      sort_year: 1150,
      title: 'Shivayogi Siddharameshwara & Master Water Engineering at Solapur',
      rulers_involved: 'Shivayogi Siddharameshwara & Waddar/Odde Engineering Brotherhood',
      political_development: 'Shivayogi Siddharameshwara transformed the drought-prone Solapur-Sonnalige region by commissioning the massive 400-acre lake (Siddheshwar Sarovar), 68 Shivalingas, and extensive irrigation canals through the collective craftsmanship of Waddar earth-and-stone artisans.',
      monuments_inscriptions: 'Siddheshwar Temple, Solapur Lake, stone inscriptions in Kannada at Solapur and Sonnalige.',
      primary_sources: 'Raghavanka’s Siddharama Charitra (c. 1200 CE); Epigraphia Carnatica; Solapur Gazetteer.',
      uncertainty_notes: 'Well-corroborated in classical 12th-century Kannada literature and epigraphs; celebrated as a pioneering civil engineering and social reform movement.'
    }
  ];

  for (const ev of milestoneEvents) {
    if (!db.events_timeline.some(e => e.id === ev.id)) {
      db.events_timeline.push(ev);
      changes.push(`Added timeline milestone event: ${ev.title}`);
    }
  }

  // 8. Ensure Kolletikota Peddintlamma Thalli & Kolleti Sarasu Records
  const kolletikotaEvent = {
    id: 'ev_kolletikota_gajapathi_garrison',
    period: '15th Century CE',
    year_text: 'c. 1450 CE',
    sort_year: 1450,
    title: 'Fortification of Kolletikota Island Citadel & Veneration of Peddintlamma Thalli',
    rulers_involved: 'Gajapathi Imperial Flotilla & Suryavamsha Odiyaraju Warriors',
    political_development: 'Following the consolidation of coastal Andhra deltas, Gajapathi detachments and Odiyaraju Kshatriya garrisons fortified the island citadel of Kolletikota amidst Kolleti Sarasu (Kolleru Lake), establishing an impregnable Jala Durga (water fortress) and invoking Sri Peddintlamma Thalli as their divine guardian against invaders.',
    monuments_inscriptions: 'Sri Kolletikota Peddintlamma Temple & Sri Gokarneshwara Swamy Temple ruins.',
    primary_sources: 'Mackenzie Manuscripts (Kolletikota & Kaikaluru Kaifiyats); South Indian Inscriptions Vol. X; Imperial Gazetteer.',
    uncertainty_notes: 'Corroborated by local Kaifiyats, continuous island fortifications, and the living annual Phalguna Purnima Jatara.'
  };
  if (!db.events_timeline.some(e => e.id === kolletikotaEvent.id)) {
    db.events_timeline.push(kolletikotaEvent);
    changes.push(`Added timeline event: ${kolletikotaEvent.title}`);
  }

  const kolletikotaFigure = {
    id: 'fig_kolletikota_peddintlamma',
    name: 'Sri Kolletikota Peddintlamma Thalli',
    alternate_names: ['Peddintlamma Ammavaru', 'Kolletikota Peddintlamma', 'Goddess of Kolleti Kota Water Citadel'],
    dynasty_name: 'Sacred Protector of Gajapathi & Odiyaraju Coastal Garrisons',
    dynasty_id: 'dyn_traditional_suryavamsha_lineages',
    reign_period: 'Medieval Era (c. 11th–16th Century CE to Present)',
    approx_dates: 'Timeless Sacred Living Tradition',
    known_titles: [
      'Presiding Warrior Deity of Kolletikota',
      'Protector of Kolleti Sarasu (Kolleru Lake) Aquatic Citadel',
      'Mother of the Royal Elder House (Peddillu)'
    ],
    biography: 'Sri Kolletikota Peddintlamma Thalli is the revered warrior-mother goddess presiding over the island fortress of Kolletikota in the heart of Kolleti Sarasu (Kolleru Lake), Andhra Pradesh. Venerated for centuries by Gajapathi royal commanders, Suryavamsha Odiyaraju/Kshatriya warriors, and lake communities as the invincible guardian of the water citadel ("Jala Durga"), she protected the island fortress against hostile foreign sieges through the treacherous, reed-filled waterways of Kolleru. Her annual Jatara (Theertham) during Phalguna Purnima draws hundreds of thousands of devotees who travel by boat to seek her fierce maternal grace.',
    major_events: [
      'Consecrated as the presiding warrior guardian and Kuladevatha of the Kolletikota island water fort amidst Kolleti Sarasu.',
      'Invoked by Gajapathi commanders and Odiyaraju warriors during the southern campaigns of Kapilendra Deva and Kumara Hamvira Deva.',
      'Protected the water fortress during medieval naval and terrestrial sieges by guiding defenders through hidden reed boat-channels.',
      'Venerated alongside Sri Gokarneshwara Swamy in the island citadel, celebrated through the annual Phalguna Purnima Peddintlamma Jatara.'
    ],
    historical_significance: 'Supreme martial-spiritual guardian of Kolleti Sarasu, symbolizing Kshatriya fortress defense, naval water warfare, and unbroken coastal Andhra living traditions.',
    associated_places: [
      'Kolletikota (Kaikaluru, Eluru District, Andhra Pradesh)',
      'Kolleti Sarasu (Kolleru Freshwater Lake)',
      'Gokarneshwara Swamy Temple',
      'Kondapalli & Kondavidu Perimeter'
    ],
    evidence_status: 'Traditional Lineage Record' as const,
    image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    inscriptions_ids: [],
    citations: [
      'Mackenzie Manuscripts & Local Kaifiyats (Kolletikota & Kaikaluru Kaifiyats).',
      'South Indian Inscriptions (SII), Vol. X (Eastern Chalukya and Gajapathi Delta Inscriptions).',
      'Imperial Gazetteer of India, Vol. XV (Kolleru Lake & Kolletikota Fortress).',
      'Andhra Pradesh State Archaeology & Endowments Department Archival Reports.'
    ]
  };
  if (!db.figures.some(f => f.id === kolletikotaFigure.id)) {
    db.figures.push(kolletikotaFigure);
    changes.push(`Added historical figure: ${kolletikotaFigure.name}`);
  }

  const kolletikotaMonument = {
    id: 'mon_kolletikota_peddintlamma',
    name: 'Sri Kolletikota Peddintlamma Temple & Island Water Fort',
    location: 'Kolletikota, Kolleru Lake (Kaikaluru, Eluru District)',
    state: 'Andhra Pradesh',
    patron_ruler: 'Gajapathi Imperial Garrisons & Odiyaraju Chieftains',
    century: 'Medieval Era (c. 11th–16th Century CE)',
    architectural_style: 'Island Citadel & Coastal Jala-Durga Temple Architecture',
    historical_significance: 'Historic island fortress sanctuary situated in the middle of Kolleti Sarasu (Kolleru Lake). The temple of Sri Peddintlamma Thalli along with the ancient Gokarneshwara Swamy Shiva shrine formed the sacred and defensive citadel of Gajapathi and Odiyaraju Kshatriya warriors, guarded by natural marshlands and navigated via native boat flotillas.',
    image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    sources: [
      'Mackenzie Manuscripts (Kaikaluru & Kolletikota Kaifiyats)',
      'Imperial Gazetteer of India, Vol. XV',
      'Andhra Pradesh State Archaeology & Endowments Reports'
    ]
  };
  if (!db.monuments.some(m => m.id === kolletikotaMonument.id)) {
    db.monuments.push(kolletikotaMonument);
    changes.push(`Added monument: ${kolletikotaMonument.name}`);
  }

  const kolletikotaLocation = {
    id: 'loc_kolleti_sarasu_fort',
    name: 'Kolletikota Island Water Citadel & Kolleti Sarasu (Kolleru Lake)',
    ancient_name: 'Kolanu Durga / Kolleti Kota Jala Durga',
    region: 'Deccan & South' as const,
    modern_district: 'Eluru / Krishna',
    modern_state: 'Andhra Pradesh',
    summary: 'Colossal natural freshwater lake and island water fortress situated between Krishna and Godavari deltas. Garrisoned by Gajapathi commanders and Odiyaraju warriors, protected by presiding warrior deity Sri Peddintlamma Thalli.',
    archaeological_findings: 'Ancient defensive island ramparts, boat landing jetties, medieval stone temple of Sri Peddintlamma Thalli, and Sri Gokarneshwara Swamy temple precinct.',
    inscriptions_found: ['Chalukya and Gajapathi coastal delta copper-plate records', 'Local Kaifiyat inscriptions'],
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
  };
  if (!db.locations.some(l => l.id === kolletikotaLocation.id)) {
    db.locations.push(kolletikotaLocation);
    changes.push(`Added location: ${kolletikotaLocation.name}`);
  }

  const kolletikotaArticle = {
    id: 'art_kolletikota_peddintlamma_lake',
    slug: 'kolletikota-peddintlamma-thalli-kolleti-sarasu-history',
    category: 'Odra Desha',
    original_language: 'en' as const,
    original_title: 'Sri Kolletikota Peddintlamma Thalli & Kolleti Sarasu: The Aquatic Fortress (Jala Durga) and Sacred Royal Guardian of Coastal Andhra',
    summary: 'A comprehensive historical and cultural documentary on Kolleti Sarasu (Kolleru Lake), the island citadel of Kolletikota, the presiding warrior-mother deity Sri Peddintlamma Thalli, Gajapathi-Odiyaraju military garrison defenses, and the living tradition of the annual Phalguna Purnima Theertham.',
    author_name: 'Historical Research Council & Coastal Andhra Epigraphy Project',
    publication_date: '2026-02-24',
    verification_status: 'Published' as const,
    evidence_category: 'scholarly_interpretation' as const,
    featured_image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&auto=format&fit=crop&q=80',
    tags: ['Kolletikota', 'Peddintlamma Thalli', 'Kolleti Sarasu', 'Kolleru Lake', 'Gajapathi', 'Odiyaraju', 'Jala Durga', 'Eluru', 'Kaikaluru'],
    sources: [
      {
        id: 'src_klt_01',
        source_type: 'Primary Source' as const,
        title: 'Mackenzie Collection Local Records: Kaikaluru & Kolletikota Kaifiyats',
        author_or_authority: 'Colin Mackenzie Survey Team / Government Oriental Manuscripts Library',
        publication_or_location: 'Madras / Hyderabad Archival Repository',
        year_or_era: 'c. 1800–1815 CE',
        citation_details: 'Section on Kolletikota water citadel, Peddintlamma temple foundation, and lake garrisons',
        verified: true
      },
      {
        id: 'src_klt_02',
        source_type: 'Scholarly Book' as const,
        title: 'The Imperial Gazetteer of India, Vol. XV (Entries on Kolleru Lake and Kolletikota)',
        author_or_authority: 'William Wilson Hunter & Henry Frowde',
        publication_or_location: 'Oxford: Clarendon Press',
        year_or_era: '1908',
        citation_details: 'pp. 385–388 (Kolleru Lake as an aquatic defense barrier and island fortified settlement)',
        verified: true
      },
      {
        id: 'src_klt_03',
        source_type: 'Inscription' as const,
        title: 'South Indian Inscriptions (SII), Vol. X: Coastal Andhra Inscriptions',
        author_or_authority: 'Archaeological Survey of India',
        publication_or_location: 'New Delhi',
        year_or_era: 'Medieval Period',
        citation_details: 'Epigraphic grants mentioning Kolanu / Kolletikota and surrounding delta chieftaincies',
        verified: true
      }
    ],
    original_content: `Nestled between the fertile deltas of the Krishna and Godavari rivers in coastal Andhra Pradesh lies Kolleti Sarasu (Kolleru Lake), one of India's largest natural freshwater lakes and wetland ecosystems. Historically situated across modern Eluru and Krishna districts (near Kaikaluru), Kolleti Sarasu was far more than an ecological marvel: for over a millennium, it served as an impregnable natural water barrier, and its central island citadel, Kolletikota (Kolleti Kota), was celebrated in military annals as a premier "Jala Durga" (aquatic fortress).

1. Historical Geography of Kolleti Sarasu (Kolleru Lake):
In classical Sanskrit inscriptions and Telugu literature, Kolleru is known as "Kolanu" (the lake / tank) and its rulers were termed "Kolani-nayakas" or lords of the lake. Spanning hundreds of square miles during monsoon seasons, the lake formed a natural moat surrounded by dense marshes, elephant grass, and labyrinthine waterways. Hostile armies attempting to cross the lake with standard cavalry and foot soldiers were quickly immobilized by the silt and treacherous currents, making Kolleti Kota one of the most formidable defensive strongholds in peninsular India.

2. The Gajapathi & Odiyaraju Fortress Garrison:
During the 15th century, when Emperor Kapilendra Deva Gajapathi and his valorous son Kumara Hamvira Deva swept through coastal Andhra down to the Kaveri River, the Gajapathi forces established strategic garrisons to maintain supply lines between Rajahmundry, Kondapalli, and Kondavidu.
Suryavamsha Odiyaraju and allied Kshatriya warrior clans garrisoned the island citadel of Kolletikota. Native water pilots utilized flat-bottomed boats ("dony lu" / sangam) and created submerged palisades and reed blinds, allowing defenders to ambush invaders while remaining invisible in the mist of Kolleti Sarasu. Historical records from the Bahmani wars recount that Sultanate detachments suffered catastrophic defeats attempting to navigate the uncharted depths of Kolleru.

3. Sri Kolletikota Peddintlamma Thalli: The Presiding Warrior-Mother:
At the heart of the island citadel stands the ancient, sanctified temple of Sri Kolletikota Peddintlamma Thalli. The title "Peddintlamma" translates to "The Mother of the Grand / Elder Royal House" (Peddillu), reflecting her role as the Kuladevatha and sovereign spiritual matriarch of the ruling Kshatriyas, fort commanders, and the indigenous lake brotherhood.
According to regional Kaifiyats and oral traditions preserved by the community:
- The goddess served as the divine sentinel of the island fort. Before embarking on naval defense or military sorties across the lake, the Gajapathi and Odiyaraju commanders performed solemn Shakthi pujas, receiving swords blessed at her lotus feet.
- During legendary sieges, when invading forces attempted to breach the lake channels under cover of darkness, Peddintlamma Thalli is said to have conjured blinding fog over the water, disorienting the invaders while guiding the defenders to victory.
- Beside Peddintlamma stands the ancient temple of Sri Gokarneshwara Swamy (Lord Shiva), establishing a powerful Shakthi-Shiva presence that consecrated the island fortress against foreign desecration.

4. The Living Tradition: Annual Peddintlamma Jatara (Theertham):
The worship of Peddintlamma Thalli has remained unbroken across centuries. Every year, during the auspicious Phalguna Shuddha Purnima (corresponding to the Holi / Vasantotsava festival season in February–March), the historic "Kolletikota Peddintlamma Theertham / Jatara" is celebrated with extraordinary devotion.
Hundreds of thousands of devotees, including Odiyaraju Kshatriya families, farmers, fishermen, and pilgrims from across Andhra Pradesh and neighboring states, converge upon Kolletikota. Pilgrims historically crossed the lake waters by boat flotillas, offering turmeric, kumkum, sacred yellow threads, and vibrant silk garments to the Mother.

5. Historical Legacy and Cultural Continuity:
Kolletikota Peddintlamma Thalli and Kolleti Sarasu embody the harmonious synthesis of martial defense, environmental stewardship, and living folk-devotional heritage. As the Suryavamsha Odiyaraju Kshatriya Portal honors the civilizational memory of Odra Desha and its southern diaspora, the island citadel of Kolletikota stands as an eternal monument to the valor of the warriors and the loving protection of their warrior-mother, Sri Peddintlamma Thalli.`
  };
  if (!db.articles.some(a => a.id === kolletikotaArticle.id)) {
    db.articles.push(kolletikotaArticle);
    changes.push(`Added article: ${kolletikotaArticle.original_title}`);
  }

  // Sort events chronologically
  db.events_timeline.sort((a, b) => a.sort_year - b.sort_year);

  // Save changes
  saveDb(db);
  return { success: true, changes };
}

// Allow direct CLI execution: tsx server/migrate.ts
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('[MIGRATION] Starting Suryavamsha database migration...');
  const res = runMigrations();
  console.log('[MIGRATION] Completed successfully:', res.changes.length > 0 ? res.changes : 'No pending migrations.');
}
