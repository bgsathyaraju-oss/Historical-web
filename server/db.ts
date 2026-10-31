import fs from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import type {
  User,
  UserProfile,
  UserPreferences,
  Article,
  HistoricalFigure,
  Dynasty,
  GenealogyNode,
  HistoricalEvent,
  HistoricalLocation,
  InscriptionRecord,
  TempleMonument,
  HistoricalDocument,
  GalleryItem,
  HistoricalClaim,
  CommunitySubmission,
  CommunityEvent,
  SiteStatistics
} from '../src/types/index.ts';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.resolve(DATA_DIR, 'database.json');

export interface AuditLog {
  id: string;
  user_id: string;
  user_email: string;
  action: string;
  target_entity: string;
  target_id: string;
  details: string;
  timestamp: string;
}

export interface PasswordResetToken {
  token: string;
  user_id: string;
  expires_at: number;
  used: boolean;
}

export interface EmailVerificationToken {
  token: string;
  user_id: string;
  expires_at: number;
  used: boolean;
}

export interface DatabaseSchema {
  users: User[];
  user_passwords: Record<string, string>; // user_id -> bcrypt hash
  profiles: UserProfile[];
  preferences: UserPreferences[];
  articles: Article[];
  figures: HistoricalFigure[];
  dynasties: Dynasty[];
  genealogy: GenealogyNode[];
  events_timeline: HistoricalEvent[];
  locations: HistoricalLocation[];
  inscriptions: InscriptionRecord[];
  monuments: TempleMonument[];
  documents: HistoricalDocument[];
  gallery: GalleryItem[];
  claims: HistoricalClaim[];
  submissions: CommunitySubmission[];
  community_events: CommunityEvent[];
  event_registrations: { event_id: string; user_id: string; registered_at: string }[];
  bookmarks: { user_id: string; item_id: string; item_type: string; created_at: string }[];
  password_resets: PasswordResetToken[];
  email_verifications: EmailVerificationToken[];
  audit_logs: AuditLog[];
}

let memoryDb: DatabaseSchema | null = null;

export function getDb(): DatabaseSchema {
  if (memoryDb) return memoryDb;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      memoryDb = JSON.parse(content);
      if (memoryDb) {
        if (!memoryDb.email_verifications) {
          memoryDb.email_verifications = [];
        }
        // Auto-merge any newly added canonical seed items and update categorizations without re-hashing passwords
        const seed = initializeSeedData(false);
        let changed = false;
        for (const art of seed.articles) {
          const existing = memoryDb.articles.find(a => a.id === art.id);
          if (existing) {
            if (existing.category !== art.category) {
              existing.category = art.category;
              changed = true;
            }
          } else {
            memoryDb.articles.push(art);
            changed = true;
          }
        }
        for (const fig of seed.figures) {
          if (!memoryDb.figures.some(f => f.id === fig.id)) {
            memoryDb.figures.push(fig);
            changed = true;
          }
        }
        for (const mon of seed.monuments) {
          if (!memoryDb.monuments.some(m => m.id === mon.id)) {
            memoryDb.monuments.push(mon);
            changed = true;
          }
        }
        for (const loc of seed.locations) {
          if (!memoryDb.locations.some(l => l.id === loc.id)) {
            memoryDb.locations.push(loc);
            changed = true;
          }
        }
        for (const insc of seed.inscriptions) {
          if (!memoryDb.inscriptions.some(i => i.id === insc.id)) {
            memoryDb.inscriptions.push(insc);
            changed = true;
          }
        }
        if (changed) {
          saveDb(memoryDb);
        }
        return memoryDb;
      }
    } catch (e) {
      console.error('Failed to read db file, initializing seed:', e);
    }
  }

  memoryDb = initializeSeedData(true);
  saveDb(memoryDb);
  return memoryDb;
}

export function saveDb(db: DatabaseSchema) {
  memoryDb = db;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write database file:', err);
  }
}

export function addAuditLog(user_id: string, user_email: string, action: string, target_entity: string, target_id: string, details: string) {
  const db = getDb();
  const log: AuditLog = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    user_id,
    user_email,
    action,
    target_entity,
    target_id,
    details,
    timestamp: new Date().toISOString()
  };
  db.audit_logs.unshift(log);
  if (db.audit_logs.length > 500) db.audit_logs.pop();
  saveDb(db);
}

function initializeSeedData(includePasswordHashes = true): DatabaseSchema {
  const adminId = 'usr_admin_001';
  const editorId = 'usr_editor_001';
  const memberId = 'usr_member_001';

  const defaultPasswordHash = includePasswordHashes ? bcrypt.hashSync('Heritage@2026', 10) : '';

  const users: User[] = [
    {
      id: adminId,
      email: 'admin@suryavamsha-heritage.org',
      role: 'super_admin',
      status: 'active',
      email_verified: true,
      created_at: '2026-01-10T00:00:00.000Z'
    },
    {
      id: editorId,
      email: 'historian.editor@suryavamsha-heritage.org',
      role: 'historical_editor',
      status: 'active',
      email_verified: true,
      created_at: '2026-01-15T00:00:00.000Z'
    },
    {
      id: memberId,
      email: 'researcher.odra@suryavamsha-heritage.org',
      role: 'member',
      status: 'active',
      email_verified: true,
      created_at: '2026-02-01T00:00:00.000Z'
    }
  ];

  const user_passwords: Record<string, string> = {
    [adminId]: defaultPasswordHash,
    [editorId]: defaultPasswordHash,
    [memberId]: defaultPasswordHash
  };

  const profiles: UserProfile[] = [
    {
      user_id: adminId,
      full_name: 'Dr. Vikramaditya Gajapathi Raju',
      gender: 'Male',
      country: 'India',
      state_or_province: 'Odisha',
      district: 'Puri',
      city_town_village: 'Puri',
      profile_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      education: 'Ph.D. in Ancient Indian Epigraphy & Medieval History',
      profession: 'Professor of Epigraphy & Historical Documentation',
      current_work: 'Head of Historical Archives, Suryavamsha Research Council',
      organization: 'Council of Odra Historical Research',
      biography: 'Dedicated to preserving medieval Odishan epigraphy, Gajapathi inscriptions, and traditional Kshatriya lineages of Odra Desha with rigorous archival methods.',
      areas_of_historical_interest: ['Suryavamsha Gajapathi Dynasties', 'Copper Plate Grants', 'Temple Epigraphy', 'Odra Geopolitics'],
      languages_known: ['English', 'Odia', 'Sanskrit', 'Telugu', 'Hindi'],
      website_url: 'https://odrahistory.org/vikramaditya',
      research_contributions: 'Authored 14 peer-reviewed monographs on Gajapathi copper-plate grants and Barabati fortification inscriptions.',
      profile_visibility: 'public'
    },
    {
      user_id: editorId,
      full_name: 'Dr. Anasuya Mohapatra-Raju',
      gender: 'Female',
      country: 'India',
      state_or_province: 'Andhra Pradesh',
      district: 'Visakhapatnam',
      city_town_village: 'Visakhapatnam',
      profile_photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      education: 'M.A., M.Phil in South Indian Medieval Architecture',
      profession: 'Chief Archival Curator',
      current_work: 'Documenting Kalinga-Utkala architectural transitions and Gajapathi pillar grants',
      organization: 'Eastern Deccan Heritage Foundation',
      biography: 'Specializes in the cultural and architectural history of the Suryavamshi rulers, focusing on Simhachalam, Draksharama, and Srikurmam.',
      areas_of_historical_interest: ['Gajapathi Temple Architecture', 'Bilingual Sanskrit-Telugu Inscriptions', 'Medieval Military Outposts'],
      languages_known: ['Telugu', 'English', 'Odia', 'Kannada'],
      research_contributions: 'Published critical editions of Prataparudra Deva Simhachalam pillar inscriptions.',
      profile_visibility: 'public'
    },
    {
      user_id: memberId,
      full_name: 'Dr.G Sathyanarayana Raju',
      gender: 'Male',
      country: 'India',
      state_or_province: 'Karnataka',
      district: 'Bengaluru Urban',
      city_town_village: 'Bengaluru',
      profile_photo_url: '/assets/dr_g_sathyanarayana_raju.png',
      education: 'Independent Historical Documentation & Epigraphy Researcher',
      profession: 'Founder & Historical Documentation Contributor',
      current_work: 'Research, Documentation & Compilation by Dr.G Sathyanarayana Raju',
      organization: 'Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal',
      biography: 'Founder & Historical Documentation Contributor researching the epigraphy and diaspora of Suryavamsha Odiyaraju families across Karnataka, Andhra Pradesh, Telangana, Odisha, Tamil Nadu, and Maharashtra.',
      areas_of_historical_interest: ['Genealogical Records', 'Diaspora Movements', 'Oral Traditions', 'Madala Panji Studies'],
      languages_known: ['Kannada', 'Telugu', 'English', 'Odia'],
      research_contributions: 'Documented 12 oral family histories linking medieval Odra migrations to Deccan settlements.',
      profile_visibility: 'members'
    }
  ];

  const preferences: UserPreferences[] = [
    {
      user_id: adminId,
      preferred_language: 'en',
      email_notifications: true,
      show_original_quotes: true
    },
    {
      user_id: editorId,
      preferred_language: 'te',
      email_notifications: true,
      show_original_quotes: true
    },
    {
      user_id: memberId,
      preferred_language: 'kn',
      email_notifications: false,
      show_original_quotes: true
    }
  ];

  const dynasties: Dynasty[] = [
    {
      id: 'dyn_suryavamsha_gajapathi',
      name: 'Suryavamsha Gajapathi Empire',
      period: '1434 – 1541 CE',
      capital: 'Cuttack (Kataka / Varanasi Kataka)',
      origin_region: 'Odra Desha / Utkala',
      overview: 'Founded by Kapilendra Deva in 1434 CE, the Suryavamshi Gajapathis represented the zenith of medieval Odishan imperial power. At its height, the realm stretched from the lower Ganges in Bengal down to the Kaveri River in modern Tamil Nadu. The kings held the imperial title Gajapathi (Lord of Elephants), Gaudesvara (Lord of Bengal), and Navakoti Karnata Kalavargesvara (Overlord of Nine-Crore Karnata & Gulbarga).',
      key_rulers: ['Kapilendra Deva (1434–1466 CE)', 'Purushottama Deva (1466–1497 CE)', 'Prataparudra Deva (1497–1540 CE)'],
      verification_type: 'documented',
      monuments: ['Barabati Fort Outer Moat & Citadel', 'Puri Jagannatha Meghanada Pacheri (Outer Wall)', 'Draksharama Mandapa', 'Simhachalam Renovations']
    },
    {
      id: 'dyn_eastern_ganga',
      name: 'Imperial Eastern Ganga Dynasty',
      period: 'c. 1078 – 1434 CE',
      capital: 'Kalinganagara / Varanasi Kataka',
      origin_region: 'Kalinga & Trikalinga',
      overview: 'Predecessor imperial dynasty of eastern India, builders of the Jagannath Temple at Puri (Anantavarman Chodaganga) and the Sun Temple at Konark (Narasimhadeva I). Succeeded by Kapilendra Deva through dynastic shift in 1434 CE.',
      key_rulers: ['Anantavarman Chodaganga Deva', 'Anangabhima Deva III', 'Narasimhadeva I'],
      verification_type: 'documented',
      monuments: ['Sun Temple Konark', 'Jagannatha Temple Puri Main Deula', 'Ananta Vasudeva Temple']
    },
    {
      id: 'dyn_bhoi_mukunda',
      name: 'Bhoi & Chalukya-Gajapathi Successor Dynasties',
      period: '1541 – 1568 CE',
      capital: 'Cuttack & Khurda',
      origin_region: 'Odra Desha',
      overview: 'Succeeded the direct Suryavamsha lineage after Govinda Vidyadhara and later Mukunda Deva (Harichandana). Mukunda Deva was the last independent Hindu emperor of Odisha before the 1568 invasion.',
      key_rulers: ['Govinda Vidyadhara (1541–1549 CE)', 'Mukunda Deva (1559–1568 CE)'],
      verification_type: 'documented',
      monuments: ['Barabati Defense Towers', 'Khurda Early Fortifications']
    },
    {
      id: 'dyn_traditional_suryavamsha_lineages',
      name: 'Traditional Suryavamshi Odiyaraju Royal Lineages',
      period: 'Medieval to Pre-Modern Era',
      capital: 'Regional Samasthanams & Forts across Odra, Coastal Andhra, and Deccan',
      origin_region: 'Odra Desha Diaspora & Historical Kshatriya Settlements',
      overview: 'Community genealogical accounts and historical traditions tracing descent from Suryavamshi warriors and Gajapathi commanders who were stationed at southern provincial bastions (Kondavidu, Udayagiri, Chandragiri, Bellamkonda, and Deccan outposts). While oral traditions preserve profound cultural memory, historians document specific administrative grants and military postings.',
      key_rulers: ['Kumara Hamvira Deva (Viceroy of Southern Provinces)', 'Virabhadra Deva (Gajapathi Prince & Fortress Commander)'],
      verification_type: 'scholarly_conjecture',
      monuments: ['Kondavidu Fortifications', 'Udayagiri Hill Fort Citadel', 'Bellamkonda Inscriptions']
    }
  ];

  const figures: HistoricalFigure[] = [
    {
      id: 'fig_kapilendra_deva',
      name: 'Kapilendra Deva Gajapathi',
      alternate_names: ['Kapilesvara Deva', 'Sri Kapilendra Deva Maharaju'],
      dynasty_name: 'Suryavamsha Gajapathi Empire',
      dynasty_id: 'dyn_suryavamsha_gajapathi',
      reign_period: '1434 – 1466 CE',
      approx_dates: 'c. 1395 – 1466 CE',
      known_titles: [
        'Gajapathi (Lord of Elephants)',
        'Gaudesvara (Lord of Gauda / Bengal)',
        'Navakoti Karnata Kalavargesvara (Lord of Nine-Crore Karnataka and Kalburgi/Gulbarga)',
        'Rautaraya'
      ],
      biography: 'Kapilendra Deva was the illustrious founder of the Suryavamshi Gajapathi dynasty of Odisha. Beginning his reign in 1434 CE amidst external threats from the Sultanates of Bengal and the Bahmanis, he expanded the frontiers of Odisha into an immense empire spanning from the Ganges in the north to the Pennar and Kaveri rivers in the south. An ardent patron of literature and temple architecture, his reign marked the golden age of classical Odia literature, including the works of the poet Sarala Dasa.',
      major_events: [
        '1434 CE: Accession to the throne of Kataka (Cuttack).',
        '1444–1448 CE: Repulse of the Jaunpur and Bahmani invasions.',
        '1454–1458 CE: Southern expeditions led by his valiant son Hamvira Deva, capturing Kondavidu, Hampi fringes, and Trichinopoly.',
        '1460 CE: Issue of the celebrated Veligalani and Lingaraja temple grants.',
        '1466 CE: Passed away on the banks of the Krishna River during an imperial campaign.'
      ],
      historical_significance: 'Transformed Odisha from a regional kingdom into the dominant imperial power of 15th-century eastern and peninsular India.',
      associated_places: ['Cuttack (Varanasi Kataka)', 'Puri', 'Bhubaneswar', 'Kondavidu', 'Simhachalam'],
      evidence_status: 'Documented Primary Evidence',
      image_url: '/assets/archive/kapilendra_deva_portrait.jpg',
      inscriptions_ids: ['insc_veligalani_1458', 'insc_lingaraja_1452', 'insc_simhachalam_1459'],
      citations: [
        'Epigraphia Indica, Vol. XXXIII, pp. 275–292 (Veligalani Copper Plates of Kapilendra Deva).',
        'Subrahmanyam, R., "The Suryavamsi Gajapatis of Orissa", Andhra University Press, 1957.',
        'Sahu, N.K., "History of Orissa", Utkal University, 1981.'
      ]
    },
    {
      id: 'fig_purushottama_deva',
      name: 'Purushottama Deva Gajapathi',
      alternate_names: ['Sri Purusottama Deva', 'Gajapathi Purushottam Dev'],
      dynasty_name: 'Suryavamsha Gajapathi Empire',
      dynasty_id: 'dyn_suryavamsha_gajapathi',
      reign_period: '1466 – 1497 CE',
      approx_dates: 'c. 1445 – 1497 CE',
      known_titles: ['Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara'],
      biography: 'Second monarch of the Suryavamshi Gajapathi dynasty, chosen by Kapilendra Deva over his elder brothers. His accession triggered a fratricidal war with his valiant elder brother Hamvira Deva, who was temporarily supported by the Bahmani Sultan. Purushottama Deva successfully consolidated the kingdom, reclaimed the southern territories of Udayagiri and Kondavidu, and became immortalized in cultural memory through the legendary Kanchi-Kaveri tradition and his devotion to Lord Jagannatha.',
      major_events: [
        '1466–1472 CE: Succession struggle against prince Hamvira Deva.',
        '1476 CE: Re-conquest of Kondavidu and eastern coastal Andhra forts.',
        '1489 CE: Famous expedition to Kanchi and matrimonial alliance celebrated in regional literature.',
        'Extensive epigraphic grants at Draksharama, Simhachalam, and Jagannath Temple at Puri.'
      ],
      historical_significance: 'Preserved the territorial integrity of the Gajapathi Empire and authored Sanskrit works including Abhinava Gitagovinda and Nama-malika.',
      associated_places: ['Puri', 'Cuttack', 'Kanchi', 'Kondavidu', 'Draksharama'],
      evidence_status: 'Documented Primary Evidence',
      image_url: '/assets/archive/purushottama_deva_kanchi.jpg',
      inscriptions_ids: ['insc_potavaram_1489', 'insc_puri_purushottama'],
      citations: [
        'Mukherjee, Prabhat, "The History of the Gajapati Kings of Orissa", Kitab Mahal, 1953.',
        'South Indian Inscriptions (SII), Vol. V, Draksharama Records.'
      ]
    },
    {
      id: 'fig_prataparudra_deva',
      name: 'Prataparudra Deva Gajapathi',
      alternate_names: ['Sri Prataparudra Deva Maharaju'],
      dynasty_name: 'Suryavamsha Gajapathi Empire',
      dynasty_id: 'dyn_suryavamsha_gajapathi',
      reign_period: '1497 – 1540 CE',
      approx_dates: 'c. 1475 – 1540 CE',
      known_titles: ['Gajapathi Gaudesvara', 'Parama-Vaishnava Maharajasadhiraja'],
      biography: 'The third major emperor of the Suryavamsha Gajapathi line. His reign was marked by intense multi-front warfare: defending against Husain Shah of Bengal in the north, Quli Qutb Shah of Golconda in the west, and the formidable Krishna Deva Raya of the Vijayanagara Empire in the south. Prataparudra Deva was also a profound scholar who composed the Sarasvati Vilasa, a renowned legal treatise, and became a devoted follower of Sri Chaitanya Mahaprabhu during the saint’s prolonged residence at Puri.',
      major_events: [
        '1509 CE: Repulsed Sultan Husain Shah of Bengal from Puri.',
        '1513–1519 CE: Epic campaigns against Krishna Deva Raya of Vijayanagara, leading to the peace treaty of 1519 CE and the marriage of princess Jaganmohini (Tukka).',
        '1510–1533 CE: Patronage of Sri Chaitanya and the Panchasakha poet-philosophers in Puri.',
        '1540 CE: Demise, which ushered in instability and the usurpation by minister Govinda Vidyadhara.'
      ],
      historical_significance: 'Promulgated the Sarasvati Vilasa, patronized the golden age of Vaishnava devotion in Odisha, and sustained imperial frontiers under relentless external pressures.',
      associated_places: ['Puri', 'Cuttack', 'Udayagiri', 'Kondapalli', 'Simhachalam'],
      evidence_status: 'Documented Primary Evidence',
      image_url: '/assets/archive/prataparudra_deva.jpg',
      inscriptions_ids: ['insc_simhachalam_prataparudra', 'insc_kondapalli_1519'],
      citations: [
        'Sarasvati Vilasa (Sanskrit Legal Digest), ed. R. Shama Sastri, Mysore, 1927.',
        'Nilakanta Sastri, K.A., "A History of South India", Oxford University Press.',
        'Epigraphia Indica, Vol. VII & IX.'
      ]
    },
    {
      id: 'fig_hamvira_deva',
      name: 'Kumara Hamvira Deva Gajapathi',
      alternate_names: ['Prince Hamvira', 'Ambiradeva', 'Hamviradeva Rautaraya'],
      dynasty_name: 'Suryavamsha Gajapathi Empire',
      dynasty_id: 'dyn_suryavamsha_gajapathi',
      reign_period: 'c. 1450 – 1476 CE (as Southern Viceroy / Rebel King)',
      approx_dates: 'c. 1425 – 1485 CE',
      known_titles: ['Kumara Mahapatra', 'Dakshina Rajya Paripalaka'],
      biography: 'Eldest son of emperor Kapilendra Deva and supreme military general of the Gajapathi southern campaigns. He conquered the coastal forts of Kondavidu, Addanki, Vinukonda, and marched as far south as Srirangam and Tiruvarur. He governed the southern provinces with great distinction, leaving important epigraphs at Srisailam, Srikurmam, and Kondavidu.',
      major_events: [
        '1454 CE: Led the expedition that captured Chandragiri and Kondavidu.',
        '1463–1464 CE: Reached the Kaveri basin and made substantial grants at Srirangam Ranganathaswamy Temple.',
        '1466–1472 CE: Contested the succession against Purushottama Deva after Kapilendra Deva’s demise.'
      ],
      historical_significance: 'Instrumental in establishing the military fame and territorial reach of the Suryavamsha Gajapathis throughout the Deccan and Tamil country.',
      associated_places: ['Kondavidu', 'Srisailam', 'Srirangam', 'Udayagiri'],
      evidence_status: 'Documented Primary Evidence',
      image_url: '/assets/archive/kumara_hamvira_warangal_srirangam.jpg',
      inscriptions_ids: ['insc_srisailam_hamvira', 'insc_srirangam_hamvira'],
      citations: [
        'Annual Reports on Indian Epigraphy (ARIE), 1937–38, No. 312.',
        'Subrahmanyam, R., "The Suryavamsi Gajapatis of Orissa", 1957.'
      ]
    },
    {
      id: 'fig_samrat_sagara',
      name: 'King Samrat Sagara',
      alternate_names: ['Emperor Sagara', 'Chakravartin Sagara', 'Raja Sagara'],
      dynasty_name: 'Ikshvaku Suryavamsha Lineage',
      dynasty_id: 'dyn_traditional_suryavamsha_lineages',
      reign_period: 'Treta Yuga / Vedic Antiquity',
      approx_dates: 'Primordial Puranic Era',
      known_titles: ['Chakravartin Samrat', 'Sagara Maharaju', 'Suryavamsi Kuladipaka'],
      biography: 'Samrat Sagara was the celebrated Chakravartin emperor of Ayodhya belonging to the ancient Suryavamsha (Solar Dynasty), son of King Asamanja/Bahu. Famed in the Ramayana, Mahabharata, and Vishnu Purana for performing 100 Ashvamedha sacrifices, his sixty thousand sons excavated the earth to retrieve the sacrificial horse, creating the legendary ocean (hence named "Sagara"). He is revered as the primordial ancestral king by Suryavamshi Kshatriya, Oad-Rajput, and Odde/Vadde lineages across India.',
      major_events: [
        'Puranic Era: Accession to the throne of Ayodhya as undisputed Chakravartin ruler.',
        'Performance of ninety-nine Ashvamedha Yajnas, expanding sovereign righteousness.',
        'Sons excavated vast oceanic basins in search of the consecrated sacrificial horse.',
        'Established the ancestral heritage of extensive earth-excavation, canal engineering, and royal duty passed down to subsequent generations.'
      ],
      historical_significance: 'Revered by Oad-Rajputs, Od-Kshatriyas, and VaddeRajulu as the royal solar ancestor whose sons were the first grand excavators of the earth.',
      associated_places: ['Ayodhya', 'Gangasagar', 'Kapila Ashrama', 'Sagara Island'],
      evidence_status: 'Traditional Lineage Record',
      image_url: '/assets/archive/samrat_sagara_surya.jpg',
      inscriptions_ids: [],
      citations: [
        'Valmiki Ramayana, Balakanda, Sarga 38–41.',
        'Vishnu Purana, Book IV, Chapter 4.',
        'Mahabharata, Vana Parva (Tirtha-yatra Parva).'
      ]
    },
    {
      id: 'fig_maharshi_bhagiratha',
      name: 'Maharshi Raja Bhagiratha',
      alternate_names: ['King Bhagiratha', 'Bhagiratha Maharaju', 'Bhagirathji'],
      dynasty_name: 'Ikshvaku Suryavamsha Lineage',
      dynasty_id: 'dyn_traditional_suryavamsha_lineages',
      reign_period: 'Treta Yuga',
      approx_dates: 'Puranic Antiquity',
      known_titles: ['Rajarshi', 'Ganga-Avataranaka', 'Suryavamsi Samrat'],
      biography: 'Rajarshi Bhagiratha, great-grandson of Samrat Sagara and son of Dilipa, was the illustrious king of Ayodhya whose single-minded penance brought the sacred river Ganga down from the heavens to the earth to liberate the sixty thousand ancestors of Sagara. His monumental achievement gave rise to the term "Bhagiratha Prayathna" (unyielding Herculean determination). The Oad-Rajput, Odde, Waddar, and VaddeRajulu communities hold Bhagiratha in supreme reverence as their great civil-engineering and water-harnessing royal ancestor.',
      major_events: [
        'Undertook thousand-year rigorous tapasya in the Himalayas (Gokarna / Gangotri).',
        'Propitiated Lord Shiva to cushion the celestial descent of Ganga in His matted locks.',
        'Guided the mighty river across the plains of northern and eastern India to the eastern ocean (Gangasagar).',
        'Established the timeless sacred model of canal excavation, irrigation, and perseverance revered by builder and warrior lineages.'
      ],
      historical_significance: 'Patron ancestor of water-engineering, reservoir excavation, and monumental persistence for Oad, Odde, and Waddar communities.',
      associated_places: ['Gangotri', 'Ayodhya', 'Haridwar', 'Prayagraj', 'Gangasagar'],
      evidence_status: 'Traditional Lineage Record',
      image_url: '/assets/archive/maharshi_bhagiratha_penance.jpg',
      inscriptions_ids: [],
      citations: [
        'Valmiki Ramayana, Balakanda, Sargas 42–44.',
        'Shrimad Bhagavatam, Canto 9, Chapter 9.',
        'Kalidasa, Raghuvamsha.'
      ]
    },
    {
      id: 'fig_sri_rama',
      name: 'Maryada Purushottama Sri Rama',
      alternate_names: ['Ramachandra', 'Sri Rama Maharaju', 'Kodanda Rama', 'Raghunatha'],
      dynasty_name: 'Ikshvaku Suryavamsha Lineage',
      dynasty_id: 'dyn_traditional_suryavamsha_lineages',
      reign_period: 'Treta Yuga',
      approx_dates: 'Epic Antiquity',
      known_titles: ['Maryada Purushottama', 'Ikshvaku Kula Tilaka', 'Ayodhyadhipati', 'Chakravartin'],
      biography: 'Sri Rama, seventh avatar of Lord Vishnu and peerless scion of the Ikshvaku Solar race, son of Dasharatha and Kausalya. His life personifies absolute fidelity to truth (Satya), righteousness (Dharma), and benevolent sovereignty (Rama Rajya). Revered by all Suryavamsha Odiyaraju Kshatriyas, Oad-Rajputs, and VaddeRajulu as the supreme divine progenitor and exemplar of Kshatriya chivalry, whose banner of the radiant golden Sun is carried on royal seals and community insignia.',
      major_events: [
        'Sacred exile across Dandakaranya, Godavari, and southern realms, blessing sages and indigenous warriors.',
        'Construction of the monumental Rama Setu (bridge across the ocean) engineered by Nala and Nila.',
        'Vanquishing of Ravana and triumph of righteous sovereignty (Dharma Vijay).',
        'Coronation as King of Ayodhya, inaugurating the golden age of Rama Rajya.'
      ],
      historical_significance: 'Divine dynastic anchor and moral ideal of all Suryavamsha Kshatriya lineages.',
      associated_places: ['Ayodhya', 'Janakpur', 'Dandakaranya', 'Bhadrachalam', 'Rameswaram'],
      evidence_status: 'Traditional Lineage Record',
      image_url: '/assets/archive/sri_rama_sculpture.jpg',
      inscriptions_ids: [],
      citations: [
        'Valmiki Ramayana (Complete Critical Edition).',
        'Kamban Iramavataram.',
        'Ranganatha Ramayanam (Telugu).'
      ]
    },
    {
      id: 'fig_king_kharavela',
      name: 'Mahameghavahana Emperor Kharavela',
      alternate_names: ['Kharavela Deva', 'Bhikshu Raja', 'Chakravartin of Kalinga'],
      dynasty_name: 'Mahameghavahana (Chedi) Dynasty of Kalinga & Odra',
      dynasty_id: 'dyn_traditional_suryavamsha_lineages',
      reign_period: 'c. 193 – 170 BCE (or 1st Century BCE)',
      approx_dates: 'c. 2nd–1st Century BCE',
      known_titles: ['Kalingadhipati', 'Mahameghavahana', 'Chakravartin', 'Dharma-raja'],
      biography: 'Emperor Kharavela of Kalinga and the Odra littoral was one of ancient India’s greatest conquerors and master civic builders. His monumental 17-line Hathigumpha inscription, engraved in Brahmi script in the Prakrit language on the Udayagiri hills near Bhubaneswar, provides a detailed year-by-year regnal chronicle. In his fifth regnal year, he extended the canal constructed by King Nanda 300 years earlier straight into his capital Kalinganagari, exemplifying grand hydraulic and earthwork engineering. He patronized hundreds of cave dwellings for ascetics and sent expeditions north to Magadha and south to the Tamil confederacy.',
      major_events: [
        '1st Regnal Year: Repaired the storm-damaged gates, walls, and defensive ramparts of Kalinganagari.',
        '5th Regnal Year: Brought the ancient Tiwasachala canal excavated by the Nandaraja into the heart of his royal capital.',
        '8th–12th Regnal Years: Conducted campaigns across Gorathagiri, Rajagriha, and retrieved the sacred Kalinga Jina image from Magadha.',
        'Excavation of the twin cave complexes of Udayagiri and Khandagiri for Jain and wandering ascetics.'
      ],
      historical_significance: 'Foremost ancient emperor of Kalinga-Odra, uniting supreme military conquest with monumental canal and rock excavation engineering.',
      associated_places: ['Udayagiri (Hathigumpha)', 'Khandagiri', 'Kalinganagari (Sisupalgarh)', 'Bhubaneswar'],
      evidence_status: 'Documented Primary Evidence',
      image_url: '/assets/archive/emperor_kharavela_udayagiri.jpg',
      inscriptions_ids: ['insc_hathigumpha_kharavela'],
      citations: [
        'Epigraphia Indica, Vol. XX, pp. 71–89 (Hathigumpha Inscription of Kharavela, ed. K.P. Jayaswal & R.D. Banerji).',
        'Sircar, D.C., "Select Inscriptions Bearing on Indian History and Civilization", Vol. I, 1965.',
        'Barua, B.M., "Old Brahmi Inscriptions in the Udayagiri and Khandagiri Caves", 1929.'
      ]
    },
    {
      id: 'fig_goddess_jasma',
      name: 'Goddess Jasma Odan (Jasma Devi)',
      alternate_names: ['Mata Jasma Devi', 'Sati Jasma Odan', 'Jasma Rani'],
      dynasty_name: 'Traditional Oad-Rajput & Kshatriya Lineage',
      dynasty_id: 'dyn_traditional_suryavamsha_lineages',
      reign_period: '11th – 12th Century CE',
      approx_dates: 'c. 1090 – 1140 CE (Era of Siddharaja Jaisinh of Gujarat)',
      known_titles: ['Kuladevi of Oad Community', 'Sati Mata', 'Pavitra Pativrata'],
      biography: 'Goddess Jasma Odan is the revered folk deity and sacred heroine of the Oad / Od / Oad-Rajput community, celebrated throughout Gujarat, Rajasthan, and western India. Married to the Oad leader Rooda (Rupa), she belonged to the community of master pond excavators and fortress earth-builders invited by Solanki King Siddharaja Jaisinh to construct the famed Sahastralinga Talav (thousand-linga reservoir) in Patan. Renowned for her divine beauty and unwavering chastity, she rejected the king’s advances, defended her marital honor, and immolated herself. Her sacred curse and divine sacrifice are commemorated in temple shrines across Gujarat and Rajasthan, where she is worshipped as the supreme Kuladevi protecting truth, modesty, and community dignity.',
      major_events: [
        'Joined the Oad artisan-warrior clan from Malwa/Rajasthan migrating to Patan, Gujarat, to excavate the monumental Sahastralinga reservoir.',
        'Courageously rebuffed the entreaties of Solanki King Siddharaja Jaisinh, upholding the sacred code of Kshatriya marital honor.',
        'Underwent Agni-pravesha (self-immolation) on the banks of the Saraswati River to protect her chastity.',
        'Deified as Kuladevi Mata Jasma, with main pilgrimage shrines in Patan, Vadodara, and Rajasthan.'
      ],
      historical_significance: 'Supreme spiritual heroine and patron goddess of the Oad / Od / Oad-Rajput diaspora, celebrated in Gujarati Bhavai folk plays and community ballads.',
      associated_places: ['Patan (Gujarat)', 'Sahastralinga Talav', 'Malwa', 'Rajasthan'],
      evidence_status: 'Traditional Lineage Record',
      image_url: '/assets/archive/jasma_devi_sahasralinga.jpg',
      inscriptions_ids: [],
      citations: [
        'Forbes, Alexander Kinloch, "Ras Mala: Hindoo Annals of the Province of Goozerat", London, 1856.',
        'Majmudar, M.R., "Cultural History of Gujarat", Popular Prakashan, 1965.',
        'Folk literature and Bhavai performance tradition ("Jasma Odan" by Asaita Thakar, 14th century).'
      ]
    },
    {
      id: 'fig_shivayogi_siddharama',
      name: 'Shivayogi Siddharameshwara of Solapur',
      alternate_names: ['Siddharama', 'Siddharameshwar', 'Solapur Siddharama', 'Shivayogi Siddharamaiah'],
      dynasty_name: '12th-Century Kalyana Sharana Tradition & Waddar Veneration',
      dynasty_id: 'dyn_traditional_suryavamsha_lineages',
      reign_period: '12th Century CE',
      approx_dates: 'c. 1125 – 1190 CE',
      known_titles: ['Karmayogi', 'Shivayogi', 'Jala-Siddha', 'Solapur Gramadevata'],
      biography: 'Shivayogi Siddharameshwara was a profound 12th-century Shaiva mystic, philosopher, and civic engineer belonging to the great Sharana spiritual movement led by Basaveshwara and Allama Prabhu. Hailing from Sonnalige (modern Solapur on the Karnataka-Maharashtra border), Siddharameshwara dedicated his life to selfless public labor (Kayakave Kailasa), championing water harvesting by excavating massive lakes, public wells, and building 68 sacred Shivalinga shrines. He worked side-by-side with Waddar / Vaddar / Od stone cutters and earth sculptors, treating them with immense reverence. He is venerated by the Waddar / Vaddar community across Karnataka, Maharashtra, and Andhra as their supreme patron saint and divine protector.',
      major_events: [
        'Excavation of the colossal lake of Sonnalige (Solapur Lake) spanning hundreds of acres to permanently banish drought and famine.',
        'Consecration of 68 Shivalingas around the perimeter of the lake with the tireless craftsmanship of Vaddar/Oddar artisans.',
        'Participation in the Anubhava Mantapa at Kalyana, engaging with Allama Prabhu, Chennabasavanna, and Akka Mahadevi.',
        'Institution of the historic Gadda Yatra (annual chariot festival of Solapur), where millions of devotees and Waddar community members gather every Sankranti.'
      ],
      historical_significance: 'Visionary saint-engineer whose monumental civic water reservoirs and egalitarian philosophy established an enduring spiritual bond with the Vaddar / Waddar / Od community.',
      associated_places: ['Solapur (Sonnalige)', 'Basavakalyan', 'Srisailam', 'Karnataka-Maharashtra borderland'],
      evidence_status: 'Documented Primary Evidence',
      image_url: '/assets/archive/shivayogi_siddharama_solapur.jpg',
      inscriptions_ids: [],
      citations: [
        'Raghavanka, "Siddharama Charite" (Old Kannada Kavya, c. 1200 CE).',
        'Zvelebil, Kamil, "The Vachanas of Siddharama", 1984.',
        'Epigraphia Carnatica & Solapur District Gazetteer.'
      ]
    },
    {
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
      evidence_status: 'Traditional Lineage Record',
      image_url: '/assets/archive/peddintlamma_deity_kolletikota.jpg',
      inscriptions_ids: [],
      citations: [
        'Mackenzie Manuscripts & Local Kaifiyats (Kolletikota & Kaikaluru Kaifiyats).',
        'South Indian Inscriptions (SII), Vol. X (Eastern Chalukya and Gajapathi Delta Inscriptions).',
        'Imperial Gazetteer of India, Vol. XV (Kolleru Lake & Kolletikota Fortress).',
        'Andhra Pradesh State Archaeology & Endowments Department Archival Reports.'
      ]
    }
  ];

  const genealogy: GenealogyNode[] = [
    {
      id: 'gen_samrat_sagara',
      name: 'Samrat Sagara (Universal Chakravartin)',
      titles: 'Suryavamsha Ikshvaku Sovereign Ancestor',
      reign: 'Sacred Lineage Antiquity',
      generation: -2,
      relationship_type: 'traditional_account',
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
      relationship_type: 'traditional_account',
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
      relationship_type: 'traditional_account',
      parent_id: 'gen_maharshi_bhagiratha',
      children: ['gen_kapilendra'],
      sources: ['Valmiki Ramayana', 'Raghuvamsha of Kalidasa', 'Gajapathi Royal Inscriptions'],
      notes: 'The paramount sovereign exemplar of the Suryavamsha solar lineage, formally invoked by the Gajapathi emperors of Odisha.'
    },
    {
      id: 'gen_kapilendra',
      name: 'Kapilendra Deva Gajapathi (Founder)',
      titles: 'Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara',
      reign: '1434 – 1466 CE',
      generation: 1,
      relationship_type: 'documented_primary',
      parent_id: 'gen_sri_rama',
      children: ['gen_hamvira', 'gen_purushottama', 'gen_tirumala'],
      sources: ['Veligalani Copper Plates (1458 CE)', 'Lingaraja Temple Inscription (1452 CE)', 'Madala Panji'],
      notes: 'Established the Suryavamsha dynasty at Kataka in 1434 CE.'
    },
    {
      id: 'gen_hamvira',
      name: 'Kumara Hamvira Deva (Eldest Son)',
      titles: 'Viceroy of Southern Territories & Commander-in-Chief',
      reign: 'c. 1454 – 1476 CE (Southern Viceroyalty)',
      generation: 2,
      relationship_type: 'documented_primary',
      parent_id: 'gen_kapilendra',
      children: ['gen_dakshina_branch'],
      sources: ['Srirangam Temple Inscription (1464 CE)', 'Kondavidu Inscription', 'ARIE 1937–38'],
      notes: 'Conqueror of the southern Deccan; disputed succession with Purushottama.'
    },
    {
      id: 'gen_purushottama',
      name: 'Purushottama Deva (Second Emperor)',
      titles: 'Gajapathi Gaudesvara',
      reign: '1466 – 1497 CE',
      generation: 2,
      relationship_type: 'documented_primary',
      parent_id: 'gen_kapilendra',
      spouse: 'Rani Padmavati (Tradition / Princess of Kanchi)',
      children: ['gen_prataparudra'],
      sources: ['Potavaram Copper Plates (1489 CE)', 'Draksharama Pillar Epigraphs', 'Madala Panji'],
      notes: 'Re-consolidated the empire; hero of the celebrated Kanchi-Kaveri tradition.'
    },
    {
      id: 'gen_prataparudra',
      name: 'Prataparudra Deva (Third Emperor)',
      titles: 'Gajapathi Gaudesvara, Author of Sarasvati Vilasa',
      reign: '1497 – 1540 CE',
      generation: 3,
      relationship_type: 'documented_primary',
      parent_id: 'gen_purushottama',
      children: ['gen_virabhadra', 'gen_kaluadeva', 'gen_ramachandradeva'],
      sources: ['Sarasvati Vilasa', 'Simhachalam Inscriptions (1515 CE)', 'Chaitanya Charitamrita'],
      notes: 'Patron of Sri Chaitanya; negotiated treaty with Krishna Deva Raya in 1519 CE.'
    },
    {
      id: 'gen_virabhadra',
      name: 'Prince Virabhadra Deva',
      titles: 'Prince & Fortress Commander of Kondapalli',
      reign: 'c. 1515 – 1530 CE',
      generation: 4,
      relationship_type: 'documented_primary',
      parent_id: 'gen_prataparudra',
      sources: ['Vijayanagara Epigraphia Indica records', 'Kondapalli Pillar Inscription'],
      notes: 'Captured after the siege of Kondapalli and later granted Malebennur province in Karnataka.'
    },
    {
      id: 'gen_dakshina_branch',
      name: 'Southern Kshatriya & Odiyaraju Lineages (Regional Branches)',
      titles: 'Samasthanam Chieftains & Military Officers',
      reign: '16th – 18th Century CE',
      generation: 3,
      relationship_type: 'traditional_account',
      parent_id: 'gen_hamvira',
      sources: ['Local Kaifiyats (Mackenzie Manuscripts)', 'Family Palm-leaf Vamsavalis', 'Oral Lineage Traditions'],
      notes: 'Traditional descent linking warrior families settled around Godavari, Krishna, Rayalaseema, and Mysore outposts to Gajapathi contingents. Categorized as Traditional Lineage in scholarly analysis.'
    }
  ];

  const events_timeline: HistoricalEvent[] = [
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
    },
    {
      id: 'ev_1434',
      period: '15th Century CE',
      year_text: '1434 CE',
      sort_year: 1434,
      title: 'Coronation of Kapilendra Deva at Kataka',
      rulers_involved: 'Kapilendra Deva',
      political_development: 'Following the decline of the later Eastern Gangas, Kapilendra Deva established the Suryavamshi Gajapathi dynasty at Varanasi Kataka (modern Cuttack).',
      monuments_inscriptions: 'Bhubaneswar Lingaraja and Puri Jagannatha temple foundation decrees.',
      primary_sources: 'Lingaraja temple epigraph; Madala Panji (Rajabhoga section).',
      uncertainty_notes: 'Scholars agree on 1434 CE as the coronation year, though exact regnal month variants exist between local chronicles and copper plate dates.'
    },
    {
      id: 'ev_1448',
      period: '15th Century CE',
      year_text: '1448 CE',
      sort_year: 1448,
      title: 'Expansion into Coastal Andhra and Coastal Outposts',
      rulers_involved: 'Kapilendra Deva & Kumara Hamvira Deva',
      political_development: 'Gajapathi armies advanced south of the Godavari River, bringing the fertile delta regions and the Reddi territory under Gajapathi suzerainty.',
      monuments_inscriptions: 'Draksharama Bheemeshwara temple dedications and boundary markers.',
      primary_sources: 'South Indian Inscriptions, Vol. IV & X.',
      uncertainty_notes: 'Documented with high epigraphic certainty; disputed only regarding exact local governorship boundaries.'
    },
    {
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
    },
    {
      id: 'ev_1458',
      period: '15th Century CE',
      year_text: '1458 CE',
      sort_year: 1458,
      title: 'Veligalani Copper-Plate Grant & Overlordship of Karnata Frontiers',
      rulers_involved: 'Kapilendra Deva',
      political_development: 'Imperial decree granting land to 120 learned scholars on the banks of the Krishna River, affirming royal titles over Bengal, Karnata, and Kalburgi.',
      monuments_inscriptions: 'Veligalani Copper Plates (Guntur District).',
      primary_sources: 'Epigraphia Indica, Vol. XXXIII, edited by D.C. Sircar.',
      uncertainty_notes: 'Completely verified primary epigraphic artifact, preserved in the Government Museum, Chennai.'
    },
    {
      id: 'ev_1464',
      period: '15th Century CE',
      year_text: '1464 CE',
      sort_year: 1464,
      title: 'Southernmost Reach: Hamvira Deva at the Kaveri Basin',
      rulers_involved: 'Kumara Hamvira Deva (Viceroy of the South)',
      political_development: 'Gajapathi military contingents reached Trichinopoly and Srirangam, recording donations at the Ranganathaswamy Temple.',
      monuments_inscriptions: 'Srirangam Temple Epigraph (Saka 1386).',
      primary_sources: 'Annual Report on Indian Epigraphy (ARIE) 1937–38, No. 312.',
      uncertainty_notes: 'Epigraphically verified; records gifts made by "Kumara Hamvira Vira Mahapatra".'
    },
    {
      id: 'ev_1489',
      period: 'Late 15th Century CE',
      year_text: '1489 CE',
      sort_year: 1489,
      title: 'Kanchi Expedition and Potavaram Copper Plate of Purushottama Deva',
      rulers_involved: 'Purushottama Deva',
      political_development: 'Purushottama Deva reasserted authority over the southern province of Udayagiri and the Kanchi corridor.',
      monuments_inscriptions: 'Potavaram copper plate grant; Jagannath Temple inscriptions.',
      primary_sources: 'Epigraphia Indica; Kanchi-Kaveri traditional poem by Balarama Dasa.',
      uncertainty_notes: 'While the military expedition to Kanchi is epigraphically attested, the romanticized narrative of the princess Padmavati is classified as traditional folklore/literary elaboration.'
    },
    {
      id: 'ev_1515',
      period: 'Early 16th Century CE',
      year_text: '1515–1519 CE',
      sort_year: 1515,
      title: 'Gajapathi-Vijayanagara Conflicts & Treaty of 1519 CE',
      rulers_involved: 'Prataparudra Deva & Sri Krishna Deva Raya',
      political_development: 'Prolonged clashes over the fortresses of Udayagiri, Kondavidu, and Kondapalli concluded in 1519 CE with a diplomatic peace treaty. The Krishna River was recognized as the mutual boundary.',
      monuments_inscriptions: 'Simhachalam victory pillar of Krishna Deva Raya; Mangalagiri temple inscriptions.',
      primary_sources: 'Rayavachakamu; Sarasvati Vilasa; epigraphs at Hampi and Simhachalam.',
      uncertainty_notes: 'Well-documented on both sides through bilingual contemporary epigraphs and court chronicles.'
    },
    {
      id: 'ev_1568',
      period: 'Mid 16th Century CE',
      year_text: '1568 CE',
      sort_year: 1568,
      title: 'Fall of Barabati Citadel and Fragmentation of Central Suzerainty',
      rulers_involved: 'Mukunda Deva (Last Independent Ruler) vs Sulaiman Karrani',
      political_development: 'Invasion of Kalapahad resulting in the death of Mukunda Deva, loss of Cuttack, and the relocation of sovereign Odra royalty to Khurda.',
      monuments_inscriptions: 'Barabati fortification battlements.',
      primary_sources: 'Akbarnama; Madala Panji; Riyaz-us-Salatin.',
      uncertainty_notes: 'Widely verified by Mughal and regional Odia chronicles.'
    }
  ];

  const locations: HistoricalLocation[] = [
    {
      id: 'loc_barabati_fort',
      name: 'Barabati Fort & Kataka Citadel',
      ancient_name: 'Varanasi Kataka',
      region: 'Odra',
      modern_district: 'Cuttack',
      modern_state: 'Odisha',
      summary: 'The historic capital of the Suryavamshi Gajapathis situated between the Mahanadi and Kathajodi rivers. Built originally in the 13th century and extensively refortified by Kapilendra Deva with a nine-story palace complex and deep moats.',
      archaeological_findings: 'Excavations by the Archaeological Survey of India (ASI) revealed a 30-pillar sandstone hall, 15th-century dressed stone defense ramparts, temple foundations, and Gajapathi coin hoards.',
      inscriptions_found: ['Barabati stone gateway epigraphs', 'Kataka copper-plate seal fragments'],
      image_url: '/assets/archive/barabati_fort_gateway.jpg'
    },
    {
      id: 'loc_puri_jagannatha',
      name: 'Jagannatha Temple Complex (Puri)',
      ancient_name: 'Purushottama Kshetra / Srikshetra',
      region: 'Utkala',
      modern_district: 'Puri',
      modern_state: 'Odisha',
      summary: 'Spiritual epicenter of the Gajapathi Empire where the kings served as the primary servitors (Adya Sevaka) performing the Chera Panhara (ceremonial sweeping of the chariots). Kapilendra Deva erected the massive outer boundary wall known as the Meghanada Pacheri.',
      archaeological_findings: 'Hundreds of inscriptions from Ganga and Suryavamsha periods carved onto the Jaya Vijaya doorway, Nata Mandapa pillars, and outer walls.',
      inscriptions_found: ['Kapilendra Deva Jaya-Vijaya doorway inscription (1436 CE)', 'Purushottama Deva dedication inscriptions'],
      image_url: '/assets/archive/puri_jagannatha_temple.jpg'
    },
    {
      id: 'loc_kondavidu_fort',
      name: 'Kondavidu Hill Fortress',
      ancient_name: 'Kundinapura / Kondavidu Durga',
      region: 'Deccan & South',
      modern_district: 'Palnadu / Guntur',
      modern_state: 'Andhra Pradesh',
      summary: 'Strategic mountain redoubt captured by Kumara Hamvira Deva in 1454 CE, serving as the southern administrative headquarters and military capital of the Gajapathi viceroyalty.',
      archaeological_findings: 'Granite bastions, royal water reservoirs (Mutyala Cheruvu), weapon storage magazines, and epigraphic pillar inscriptions from the Gajapathi governors.',
      inscriptions_found: ['Hamvira Deva pillar grant', 'Gajapathi royal seal carvings on defense bastions'],
      image_url: '/assets/archive/kondavidu_fort_hills.jpg'
    },
    {
      id: 'loc_simhachalam',
      name: 'Varaha Lakshmi Narasimha Temple',
      ancient_name: 'Simhachala Kshetra',
      region: 'Kalinga',
      modern_district: 'Visakhapatnam',
      modern_state: 'Andhra Pradesh',
      summary: 'One of the wealthiest and most patronized shrines under both Eastern Gangas and Suryavamsha Gajapathis. Contains numerous dedicatory records of Kapilendra, Purushottama, and Prataparudra Deva.',
      archaeological_findings: 'Over 500 stone epigraphs carved onto the sanctum and enclosure walls, detailed inventories of royal gold ornaments, land endowments, and dancing troupe dedications.',
      inscriptions_found: ['Prataparudra Deva Saka 1438 dedication', 'Kapilendra Deva Saka 1381 pillar epigraph'],
      image_url: '/assets/archive/simhachalam_temple.jpg'
    },
    {
      id: 'loc_udayagiri_fort',
      name: 'Udayagiri Mountain Citadel',
      ancient_name: 'Udayagiri Durga',
      region: 'Deccan & South',
      modern_district: 'Nellore',
      modern_state: 'Andhra Pradesh',
      summary: 'Impregnable eastern ghats bastion that guarded the southern perimeter of the Gajapathi kingdom until the famous siege by Krishna Deva Raya in 1514 CE.',
      archaeological_findings: 'Layered boulder defense walls, Balakrishna temple from which the famed icon was transported to Hampi, gateways, and granary structures.',
      inscriptions_found: ['Gajapathi defensive bastion inscriptions', 'Vijayanagara victory stelae'],
      image_url: '/assets/archive/udayagiri_fort_nellore.jpg'
    },
    {
      id: 'loc_kolleti_sarasu_fort',
      name: 'Kolletikota Island Water Citadel & Kolleti Sarasu (Kolleru Lake)',
      ancient_name: 'Kolanu Durga / Kolleti Kota Jala Durga',
      region: 'Deccan & South',
      modern_district: 'Eluru / Krishna',
      modern_state: 'Andhra Pradesh',
      summary: 'Colossal natural freshwater lake and island water fortress situated between Krishna and Godavari deltas. Garrisoned by Gajapathi commanders and Odiyaraju warriors, protected by presiding warrior deity Sri Peddintlamma Thalli.',
      archaeological_findings: 'Ancient defensive island ramparts, boat landing jetties, medieval stone temple of Sri Peddintlamma Thalli, and Sri Gokarneshwara Swamy temple precinct.',
      inscriptions_found: ['Chalukya and Gajapathi coastal delta copper-plate records', 'Local Kaifiyat inscriptions'],
      image_url: '/assets/archive/kolleru_lake_citadel.jpg'
    }
  ];

  const inscriptions: InscriptionRecord[] = [
    {
      id: 'insc_veligalani_1458',
      name: 'Veligalani Copper-Plate Grant of Kapilendra Deva',
      location_found: 'Veligalani Village, Guntur District, Andhra Pradesh',
      dynasty: 'Suryavamsha Gajapathi',
      ruler: 'Kapilendra Deva',
      script: 'Bilingual: Sanskrit in Nagari & Odia characters; Telugu in Telugu script',
      language: 'Sanskrit & Telugu',
      era_or_date: 'Saka 1380 (1458 CE)',
      historical_context: 'Issued on the occasion of a lunar eclipse while Kapilendra Deva was encamped on the banks of the Krishna River during his southern campaign. Confirms his imperial titles and describes the lineage of the early Suryavamsha rulers.',
      transcription_excerpt: '"...Sri Kapilendra-devo nripatih pratapa-dahanah... Gaudesvara Navakoti Karnata Kalavargesvara Sri Kapilendra Gajapathi Maharaju..."',
      english_translation: 'His Majesty, the illustrious Kapilendra Deva, fiery in his valor, Lord of Gauda, Overlord of Nine-Crore Karnata and Gulbarga, Lord of Elephants, hereby grants the village of Veligalani to one hundred and twenty learned Brahmins.',
      scholarly_references: [
        'Epigraphia Indica, Vol. XXXIII (1959–1960), pp. 275–292, ed. D.C. Sircar.',
        'Sircar, D.C., "Inscriptions of the Gajapatis", Calcutta, 1965.'
      ],
      verification_status: 'Reviewed'
    },
    {
      id: 'insc_lingaraja_1452',
      name: 'Bhubaneswar Lingaraja Temple Stone Inscription',
      location_found: 'Lingaraja Temple inner doorway, Bhubaneswar, Odisha',
      dynasty: 'Suryavamsha Gajapathi',
      ruler: 'Kapilendra Deva',
      script: 'Proto-Odia script',
      language: 'Early Odia prose',
      era_or_date: 'Regnal Year 4 (c. 1438–1440 CE)',
      historical_context: 'One of the earliest public imperial proclamations of Kapilendra Deva after consolidating his power in central Odisha. Regulates temple levies and warns regional chiefs against corruption.',
      transcription_excerpt: '"...Sri Purusottama bhandare bheti kariba... je kehi rajana palana na kariba se Sri Jagannathanka drohi heba..."',
      english_translation: 'All tribute shall be delivered into the treasury of Lord Purushottama. Whosoever king or chieftain disobeys this royal decree commits treason against Lord Jagannatha.',
      scholarly_references: [
        'Indian Historical Quarterly, Vol. XXXI, pp. 110–115.',
        'Mahapatra, K.N., "A Descriptive Catalogue of Sanskrit Manuscripts of Orissa", 1960.'
      ],
      verification_status: 'Reviewed'
    },
    {
      id: 'insc_simhachalam_prataparudra',
      name: 'Simhachalam Pillar Inscription of Prataparudra Deva',
      location_found: 'Varaha Narasimha Temple Mukhamandapa pillar, Visakhapatnam',
      dynasty: 'Suryavamsha Gajapathi',
      ruler: 'Prataparudra Deva',
      script: 'Telugu script',
      language: 'Telugu with Sanskrit benediction',
      era_or_date: 'Saka 1438 (1516 CE)',
      historical_context: 'Records generous endowments of land, cows, and silver lamps to Lord Narasimha during Prataparudra Deva’s southern inspection.',
      transcription_excerpt: '"...Sri Prataparudra Gajapathi Mahadevula ayushya arogya aishvarya abhivrudhyardhamu..."',
      english_translation: 'For the longevity, health, and imperial prosperity of His Majesty Sri Prataparudra Gajapathi Mahadeva, this perpetual lamp endowment is established at Simhagiri.',
      scholarly_references: [
        'South Indian Inscriptions (SII), Vol. VI, Inscription No. 694.',
        'Epigraphia Andhrica, Vol. II.'
      ],
      verification_status: 'Reviewed'
    }
  ];

  const monuments: TempleMonument[] = [
    {
      id: 'mon_meghanada_pacheri',
      name: 'Meghanada Pacheri (Puri Outer Fortress Wall)',
      location: 'Sri Jagannatha Temple, Puri',
      state: 'Odisha',
      patron_ruler: 'Kapilendra Deva',
      century: '15th Century CE (c. 1448 CE)',
      architectural_style: 'Kalinga Fortified Temple Masonry',
      historical_significance: 'Kapilendra Deva constructed this massive, fortified outer stone boundary wall (665 feet by 640 feet, 20 feet high with crenellations) to protect the sanctum of Lord Jagannatha from seaborne and external raids.',
      image_url: '/assets/archive/meghanada_pacheri_puri.jpg',
      sources: ['Madala Panji Records', 'Archaeological Survey of India Puri Conservation Reports']
    },
    {
      id: 'mon_konark_sun',
      name: 'Sun Temple of Konark (Arka Kshetra)',
      location: 'Konark, Puri District',
      state: 'Odisha',
      patron_ruler: 'Narasimhadeva I (Ganga Dynasty)',
      century: '13th Century CE (c. 1250 CE)',
      architectural_style: 'Classical Kalinga (Rekha & Bhadra Deula)',
      historical_significance: 'Masterpiece of eastern Indian architecture representing the chariot of the Sun God. Re-protected and maintained by later Suryavamshi Gajapathis who traced their solar lineage to the deity.',
      image_url: '/assets/archive/konark_sun_temple_structure.jpg',
      sources: ['Baya Chakada Palm-leaf Architectural Chronicles', 'UNESCO World Heritage Dossier']
    },
    {
      id: 'mon_draksharama_mandapa',
      name: 'Draksharama Bheemeshwara Royal Mandapa',
      location: 'Draksharama, Konaseema District',
      state: 'Andhra Pradesh',
      patron_ruler: 'Kapilendra Deva & Purushottama Deva',
      century: '15th Century CE',
      architectural_style: 'Eastern Chalukya-Gajapathi Synthesis',
      historical_significance: 'Prominent Shaivite pilgrim shrine in coastal Andhra where Gajapathi rulers established grand pillared halls and recorded victorious campaigns on stone pillars.',
      image_url: '/assets/archive/draksharama_temple.jpg',
      sources: ['South Indian Inscriptions Vol. IV', 'Andhra Historical Research Society Journal']
    },
    {
      id: 'mon_kolletikota_peddintlamma',
      name: 'Sri Kolletikota Peddintlamma Temple & Island Water Fort',
      location: 'Kolletikota, Kolleru Lake (Kaikaluru, Eluru District)',
      state: 'Andhra Pradesh',
      patron_ruler: 'Gajapathi Imperial Garrisons & Odiyaraju Chieftains',
      century: 'Medieval Era (c. 11th–16th Century CE)',
      architectural_style: 'Island Citadel & Coastal Jala-Durga Temple Architecture',
      historical_significance: 'Historic island fortress sanctuary situated in the middle of Kolleti Sarasu (Kolleru Lake). The temple of Sri Peddintlamma Thalli along with the ancient Gokarneshwara Swamy Shiva shrine formed the sacred and defensive citadel of Gajapathi and Odiyaraju Kshatriya warriors, guarded by natural marshlands and navigated via native boat flotillas.',
      image_url: '/assets/archive/peddintlamma_temple_kolletikota.jpg',
      sources: [
        'Mackenzie Manuscripts (Kaikaluru & Kolletikota Kaifiyats)',
        'Imperial Gazetteer of India, Vol. XV',
        'Andhra Pradesh State Archaeology & Endowments Reports'
      ]
    }
  ];

  const documents: HistoricalDocument[] = [
    {
      id: 'doc_madala_panji',
      title: 'Madala Panji: The Palm-leaf Temple Chronicle of Puri',
      original_language: 'Classical Odia',
      approximate_date: '12th–16th Century CE compilations',
      author_authority: 'Puri Temple Karanas (Record Keepers)',
      current_location: 'Puri Jagannatha Temple Archives & Odisha State Archives',
      source_provenance: 'Palm-leaf manuscript collections transcribed across generations of hereditary servitors.',
      digitization_info: 'High-resolution manuscript scan conducted by Odisha State Archives in collaboration with Utkal University.',
      transcription_excerpt: '"...Suryavamsara rajatva kalare Kapilendra deva rajya prapta hoile...")',
      translation_excerpt: 'During the era of the Solar Dynasty, Kapilendra Deva attained the sovereign kingdom, established just governance, and dedicated his imperial victories to Sri Jagannatha.',
      research_notes: 'While invaluable for dynastic successions and cultural narratives, historians treat the early portions as traditional chronicle rather than contemporary epigraphy. Regnal dates from 1434 CE forward closely mirror epigraphic copper plates.',
      copyright_license: 'Public Domain / Open Archival Commons',
      verification_status: 'Reviewed'
    },
    {
      id: 'doc_sarasvati_vilasa',
      title: 'Sarasvati Vilasa: The Legal & Civil Code of Prataparudra Deva',
      original_language: 'Sanskrit',
      approximate_date: 'c. 1515–1520 CE',
      author_authority: 'King Prataparudra Deva Gajapathi (with court scholars)',
      current_location: 'Government Oriental Manuscripts Library, Chennai / Mysore Oriental Library',
      source_provenance: 'Preserved in palm-leaf collections across South India and Odisha.',
      digitization_info: 'Edited and critically collated by Dr. R. Shama Sastri (1927).',
      transcription_excerpt: '"...Sri Gajapathi Prataparudra Deva Maharaja virachite Sarasvati Vilase vyavahara kande..."',
      translation_excerpt: 'In the jurisprudence division of the Sarasvati Vilasa, composed under the patronage of His Majesty Sri Gajapathi Prataparudra Deva, defining the rights of citizens, royal taxation limits, and civil disputes.',
      research_notes: 'Demonstrates the profound scholarly attainment of the Gajapathi court and provides contemporary legal evidence regarding medieval land tenures in Odra and Andhra.',
      copyright_license: 'Public Domain',
      verification_status: 'Reviewed'
    }
  ];

  const gallery: GalleryItem[] = [
    {
      id: 'gal_01',
      title: 'Barabati Citadel Stone Moat & Bastions',
      category: 'forts',
      period: '15th Century CE',
      location: 'Cuttack, Odisha',
      creator_photographer: 'Archaeological Survey of India Archive',
      source: 'ASI Photographic Collection (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / Open Educational Use',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/barabati_fort_ramparts.jpg',
      alt_text: 'Dressed sandstone masonry walls and deep moat of Barabati Fort in Cuttack',
      description: 'The historic capital of the Suryavamshi Gajapathis showing medieval defensive moat architecture.'
    },
    {
      id: 'gal_02',
      title: 'Meghanada Pacheri Outer Fortress Wall of Puri Temple',
      category: 'temples',
      period: 'c. 1448 CE',
      location: 'Puri, Odisha',
      creator_photographer: 'Odra Heritage Documentation Project',
      source: 'Puri Archival Survey 2024',
      copyright_license: 'Creative Commons Attribution 4.0',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/puri_simhadwara_wall.jpg',
      alt_text: 'Fortified stone boundary wall erected by Kapilendra Deva around Puri Jagannath Temple',
      description: 'The monumental stone wall designed to safeguard the deity during military incursions.'
    },
    {
      id: 'gal_03',
      title: 'Sun Temple Carved Stone Chariot Wheels',
      category: 'sculptures',
      period: '13th Century CE',
      location: 'Konark, Odisha',
      creator_photographer: 'National Cultural Heritage Mission',
      source: 'Konark Archaeological Record',
      copyright_license: 'Public Domain Dedicated',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/konark_chariot_wheel.jpg',
      alt_text: 'Intricate stone carved wheel of the Sun Temple chariot at Konark',
      description: 'Solar dynastic iconography celebrating the divine chariot of Surya in classical Odishan style.'
    },
    {
      id: 'gal_04',
      title: 'Kondavidu Hill Fortress Watchtower & Granite Ramparts',
      category: 'forts',
      period: '15th Century CE',
      location: 'Palnadu District, Andhra Pradesh',
      creator_photographer: 'Deccan Historical Survey',
      source: 'Andhra Pradesh State Archaeology Archives',
      copyright_license: 'CC BY-SA 4.0',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/kondavidu_fort_engraving.jpg',
      alt_text: 'Rugged granite defensive fortifications of Kondavidu hilltop fortress',
      description: 'Southern military command bastion held by Gajapathi Viceroy Hamvira Deva.'
    },
    {
      id: 'gal_05',
      title: 'Ancient Palm-Leaf Manuscript with Incised Stylus Script',
      category: 'manuscripts',
      period: '16th Century CE',
      location: 'Odisha State Museum, Bhubaneswar',
      creator_photographer: 'Museum Archival Digitization Unit',
      source: 'Odisha State Archives Special Collection',
      copyright_license: 'Educational Fair Use / Archival Record',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/odia_palm_leaf_manuscript.jpg',
      alt_text: 'Palm-leaf manuscript bundle bound with cord and showing incised Odia and Sanskrit lettering',
      description: 'Specimen of indigenous palm-leaf documentation used for royal vamsavalis and court registers.'
    },
    {
      id: 'gal_06',
      title: 'Historical Map: Territorial Reach of Gajapathi Empire (c. 1465 CE)',
      category: 'maps',
      period: 'Mid 15th Century CE Cartographic Reconstruction',
      location: 'Council for Historical Geography',
      creator_photographer: 'Dr. V.G. Raju & Cartography Unit',
      source: 'Reconstructed based on Epigraphia Indica Volumes XXIV to XXXV',
      copyright_license: 'CC BY-NC 4.0',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/gajapathi_empire_map_1465.jpg',
      alt_text: 'Historical cartographic map showing the extent of Odra Desha from Ganges to Kaveri',
      description: 'Cartographic reconstruction delineating corroborated epigraphic findspots of Kapilendra Deva.'
    },
    {
      id: 'gal_kolletikota',
      title: 'Kolletikota Water Citadel & Kolleti Sarasu (Kolleru Lake Wetland)',
      category: 'forts',
      period: 'Medieval Era (c. 15th Century CE to Present)',
      location: 'Kolletikota, Eluru District, Andhra Pradesh',
      creator_photographer: 'Andhra Coastal Heritage Documentation Survey',
      source: 'Kolleru Archaeological Wetland Survey Archive',
      copyright_license: 'CC BY-SA 4.0',
      verification_status: 'Reviewed',
      image_url: '/assets/archive/kolletikota_island_panorama.jpg',
      alt_text: 'Vast freshwater lake expanses of Kolleti Sarasu surrounding the fortified island sanctuary of Kolletikota',
      description: 'The ancient water citadel (Jala Durga) and sacred abode of Sri Peddintlamma Thalli amidst the serene waters of Kolleru.'
    }
  ];

  const claims: HistoricalClaim[] = [
    {
      id: 'clm_01',
      topic: 'Suryavamsha Solar Dynastic Descent',
      claim_statement: 'The Gajapathi rulers of 15th-century Odisha claimed mythological descent from the ancient Suryavamsha (Solar Dynasty) of Ikshvaku.',
      supporting_evidence: [
        'Veligalani Copper Plates of Kapilendra Deva (1458 CE) explicitly trace royal ancestry to the Solar race (Surya-vamsa).',
        'Contemporary court Sanskrit works, such as the Abhinava Gitagovinda, refer to the monarch as "Surya-kula-kamala-martanda".',
        'Prataparudra Deva’s legal text Sarasvati Vilasa reiterates Suryavamshi ancestry.'
      ],
      contradictory_evidence: [
        'Modern historians note that solar descent was a conventional imperial legitimacy claim adopted by various sovereign rulers across medieval India, rather than a biologically provable pedigree.',
        'Early Muslim chronicles (e.g. Tabakat-i-Akbari) emphasize political military origins rather than mythological claims.'
      ],
      source_reliability_notes: 'Epigraphic and literary evidence proves the monarchs claimed this status officially; historians distinguish royal titulature from biological pre-history.',
      reviewer_comments: 'Clear consensus exists that Suryavamsha was the self-designated dynastic title of Kapilendra Deva and his successors.',
      review_date: '2026-01-20',
      status: 'Verified Supported'
    },
    {
      id: 'clm_02',
      topic: 'Kanchi-Kaveri Expedition and Princess Padmavati',
      claim_statement: 'Purushottama Deva conquered Kanchi in battle after Lord Jagannatha and Balabhadra personally rode on horses to lead the army, marrying the Kanchi princess Padmavati.',
      supporting_evidence: [
        'Stone inscriptions at Draksharama and Potavaram confirm a major southern military expedition against Saluva Narasimha of Vijayanagara and the Kanchi territory.',
        'Temple reliefs in the Jagannath Temple Puri depict the Kanchi campaign.'
      ],
      contradictory_evidence: [
        'Divine intervention of the deities riding horses is an allegorical religious legend popularized in the 16th-century Odia poem "Kanchi Kaveri" by Purusottama Dasa.',
        'Contemporary Vijayanagara inscriptions describe the political friction over Udayagiri without romantic or supernatural motifs.'
      ],
      source_reliability_notes: 'The military campaign to Kanchi is verified by epigraphy; the supernatural elements are devotional literary tradition.',
      reviewer_comments: 'Strict methodological demarcation must be maintained between the verified war and the cultural legend.',
      review_date: '2026-01-22',
      status: 'Contested Interpretation'
    },
    {
      id: 'clm_03',
      topic: 'Extent of Empire to the Kaveri River',
      claim_statement: 'Under Kapilendra Deva, the Gajapathi Empire maintained military posts as far south as the Kaveri River basin.',
      supporting_evidence: [
        'Srirangam Temple Inscription of 1464 CE records donations by Kumara Hamvira Deva.',
        'Munnur and Tiruvarur inscriptions confirm Gajapathi administrative presence in the Tamil country during the 1460s.'
      ],
      contradictory_evidence: [
        'The Gajapathi hold over regions south of the Pennar was of relatively brief military duration (c. 1461–1470 CE) and was subsequently reclaimed by Vijayanagara generals.'
      ],
      source_reliability_notes: 'Primary inscriptions in Tamil Nadu unequivocally prove military presence, while territorial permanence was limited.',
      reviewer_comments: 'Verified historical reality with appropriate chronological context regarding temporary hegemony.',
      review_date: '2026-02-05',
      status: 'Verified Supported'
    }
  ];

  const articles: Article[] = [
    {
      id: 'art_odra_desha_history',
      slug: 'historical-geography-of-odra-desha',
      category: 'Odra Desha & Historical Geography',
      original_language: 'en',
      original_title: 'The Historical Geography and Territorial Evolution of Ancient Odra Desha',
      summary: 'An empirical examination of the ancient nomenclature, territorial limits, and geopolitical transformation of Odra Desha from classical references to the medieval period.',
      author_name: 'Dr. Vikramaditya Gajapathi Raju',
      publication_date: '2026-01-18',
      verification_status: 'Published',
      evidence_category: 'verified_archaeological',
      featured_image: '/assets/archive/odra_kalinga_map.jpg',
      tags: ['Odra Desha', 'Historical Geography', 'Utkala', 'Kalinga', 'Epigraphy'],
      sources: [
        {
          id: 'src_01',
          source_type: 'Scholarly Book',
          title: 'Dynastic History of Magadha and Orissa',
          author_or_authority: 'Dr. N.K. Sahu',
          publication_or_location: 'Calcutta: Punthi Pustak',
          year_or_era: '1964',
          citation_details: 'Chapters III & IV, pp. 84–112',
          verified: true
        },
        {
          id: 'src_02',
          source_type: 'Primary Source',
          title: 'Hiuen Tsang’s Si-Yu-Ki (Buddhist Records of the Western World)',
          author_or_authority: 'Xuanzang (trans. Samuel Beal)',
          publication_or_location: 'London: Trübner & Co.',
          year_or_era: '639 CE',
          citation_details: 'Account of the Wu-T’u (Odra) Kingdom',
          verified: true
        }
      ],
      original_content: `The historical designation Odra Desha (also recorded in Sanskrit epigraphs as Audra, and in medieval Chinese pilgrimage chronicles as Wu-T'u) represents one of the foundational territorial components of eastern India. While modern popular discourse sometimes conflates Odra, Kalinga, Utkala, and Kosala as synonymous, rigorous historical examination reveals distinct geopolitical, linguistic, and dynastic trajectories that gradually coalesced under imperial Ganga and Gajapathi hegemony.

Ancient Epigraphic References:
Early epigraphic mentions of the Odras appear in the accounts of Pliny (referring to the Oretes), classical Buddhist texts, and later Puranic rosters. In the 7th century CE, the Chinese pilgrim Xuanzang visited the kingdom of Wu-T'u, describing it as an agrarian land with deep Buddhist and Brahmanical institutions, possessing a coastline with the thriving port of Charitra (Che-li-ta-lo).

Territorial Boundaries:
In its core historical definition, Odra Desha encompassed the fertile deltaic and riverine basin of the Mahanadi, Kathajodi, Brahmani, and Baitarani rivers, flanked by the Eastern Ghats to the west and the Bay of Bengal to the east. To the north lay Utkala (stretching toward the Subarnarekha and lower Bengal), while to the south lay Kalinga, centered along the coastal strip between the Rishikulya and the Godavari.

The Rise to Imperial Prominence:
Under the Suryavamsha Gajapathis in the 15th century, Varanasi Kataka (modern Cuttack), situated at the bifurcation of the Mahanadi and Kathajodi rivers in the heart of Odra Desha, served as the supreme capital of an empire extending across peninsular India. Royal inscriptions of Kapilendra Deva emphasize his suzerainty over the "Odra-rajya", demonstrating that by the late medieval era, Odra had become the political core of the realm.`
    },
    {
      id: 'art_gajapathi_kapilendra',
      slug: 'rise-of-kapilendra-deva-suryavamsha-empire',
      category: 'Suryavamsha Gajapathi Kings',
      original_language: 'en',
      original_title: 'Kapilendra Deva and the Zenith of the Suryavamshi Gajapathi Empire (1434–1466 CE)',
      summary: 'A critical archival investigation into the accession, military reorganization, and trans-regional expansion of the founder of the Suryavamshi Gajapathi dynasty.',
      author_name: 'Dr. Anasuya Mohapatra-Raju',
      publication_date: '2026-02-02',
      verification_status: 'Published',
      evidence_category: 'verified_archaeological',
      featured_image: '/assets/archive/kapilendra_deva_lingaraja.jpg',
      tags: ['Kapilendra Deva', 'Suryavamsha', 'Military History', 'Inscriptions', 'Cuttack'],
      sources: [
        {
          id: 'src_03',
          source_type: 'Inscription',
          title: 'Veligalani Copper Plate Inscription',
          author_or_authority: 'Kapilendra Deva / Court of Kataka',
          publication_or_location: 'Epigraphia Indica Vol. XXXIII',
          year_or_era: '1458 CE',
          citation_details: 'Lines 1–45',
          verified: true
        },
        {
          id: 'src_04',
          source_type: 'Scholarly Book',
          title: 'The Suryavamsi Gajapatis of Orissa',
          author_or_authority: 'Dr. R. Subrahmanyam',
          publication_or_location: 'Waltair: Andhra University',
          year_or_era: '1957',
          citation_details: 'Monograph No. 34',
          verified: true
        }
      ],
      original_content: `In 1434 CE, following the political dissolution of the Later Ganga rule, Kapilendra Deva ascended the throne of Kataka. Unlike his predecessors who had adopted a predominantly defensive posture against aggressive neighbors, Kapilendra instituted a profound military reformation centered upon an elite elephant corps (Gaja-sena), robust archery divisions, and mobile cavalry.

The Southern Expeditions:
Entrusting southern military operations to his capable eldest son, Kumara Hamvira Deva, the Gajapathi forces captured the strategic coastal forts of Kondavidu, Bellamkonda, Vinukonda, and Udayagiri. Epigraphic evidence confirms that by 1464 CE, Gajapathi officers had established administrative endowments in Srirangam, Munnur, and Tiruvarur on the banks of the Kaveri.

Administrative Integration:
Kapilendra did not merely conquer; he instituted administrative stability by replacing old feudal lords with loyal military commanders (Nayakas and Mahapatras). He lowered land assessments, regulated temple revenues, and issued imperial declarations protecting peasants from arbitrary local levies. His reign heralded the blossoming of vernacular literature, providing royal patronage to Sarala Dasa, who composed the pioneering Odia Mahabharata.`
    },
    {
      id: 'art_genealogy_methodology',
      slug: 'royal-genealogy-methodological-distinction',
      category: 'Royal Genealogy & Lineage Methodology',
      original_language: 'en',
      original_title: 'Methodological Standards: Distinguishing Epigraphic Lineages from Traditional Vamsavalis',
      summary: 'Why rigorous historiography requires explicit demarcation between primary epigraphic records and post-medieval oral or traditional family claims.',
      author_name: 'Dr.G Sathyanarayana Raju',
      publication_date: '2026-02-14',
      verification_status: 'Published',
      evidence_category: 'scholarly_interpretation',
      featured_image: '/assets/archive/copper_plate_charter.jpg',
      tags: ['Genealogy', 'Methodology', 'Oral Traditions', 'Epigraphy', 'Vamsavali'],
      sources: [
        {
          id: 'src_05',
          source_type: 'Peer-Reviewed Research',
          title: 'Historical Methods in Indian Dynastic Genealogies',
          author_or_authority: 'Prof. Romila Thapar',
          publication_or_location: 'Oxford University Press',
          year_or_era: '1996',
          citation_details: 'From Lineage to State, pp. 120–145',
          verified: true
        }
      ],
      original_content: `In researching royal Kshatriya lineages associated with the Suryavamsha Gajapathis and their diaspora across eastern and peninsular India, scholars encounter two distinct categories of data:

1. Contemporary Primary Epigraphy:
These comprise stone inscriptions and copper-plate charters incised during the actual lifetimes of the monarchs (such as the Veligalani grant of 1458 CE, the Lingaraja Temple inscription of 1452 CE, and the Simhachalam pillars). They provide indisputable chronological anchors, specific regnal years, and administrative details.

2. Traditional Vamsavalis, Kaifiyats & Family Genealogies:
Recorded in palm-leaf manuscripts (like the Madala Panji) or Mackenzie Collection local Kaifiyats collected in the late 18th and early 19th centuries, these documents preserve living memory and community traditions. While deeply valuable for understanding social identity, migrations, and honorific titles, they frequently conflate mythic ancestry with historical reigns or collapse multiple centuries into simplified ancestral links.

Our Portal's Epistemic Protocol:
To preserve unwavering historical credibility, our archive visually and textually differentiates every genealogical link into:
- Verified Primary: Corroborated by independent contemporary epigraphs.
- Scholarly Interpretation: Derived from sound comparative historical analysis.
- Traditional Account: Recorded in community vamsavalis and oral memory, documented with care but without unsubstantiated historical claims.`
    },
    {
      id: 'art_oad_rajputh_od_history',
      slug: 'history-of-oad-rajputh-od-kshatriya-synonyms-geography',
      category: 'Oad-Rajput & Kshatriya Heritage',
      original_language: 'en',
      original_title: 'History of Oad-Rajput, Od-Kshatriya & Allied Lineages: Epigraphy, Synonyms, and Geographical Spreading',
      summary: 'A historiographical treatise examining the roots of Oad-Rajput, Od-Kshatriya, and allied communities, documenting regional synonyms (Od, Odra, Odde, Oddar, Waddar, OddeRajulu, VaddeRajulu, Vadiyarajulu), spiritual progenitors (Sagara, Bhagiratha, Sri Rama, Kharavela, Goddess Jasma, Siddharameshwara), and their pan-Indian diaspora.',
      author_name: 'Council for Odra Historiography & Community Archives',
      publication_date: '2026-02-22',
      verification_status: 'Published',
      evidence_category: 'scholarly_interpretation',
      featured_image: '/assets/archive/oad_hydraulic_stepwell.jpg',
      tags: ['Oad-Rajput', 'Od-Kshatriya', 'OddeRajulu', 'VaddeRajulu', 'Waddar', 'Sagara', 'Bhagiratha', 'Kharavela', 'Jasma Devi', 'Siddharameshwara'],
      sources: [
        {
          id: 'src_06',
          source_type: 'Inscription',
          title: 'Hathigumpha Inscription of Emperor Kharavela & Ancient Canal Engineering',
          author_or_authority: 'Epigraphia Indica, Vol. XX',
          publication_or_location: 'Archaeological Survey of India',
          year_or_era: 'c. 1st Century BCE',
          citation_details: 'Lines 1–17 (Canal extension and city wall fortifications)',
          verified: true
        },
        {
          id: 'src_07',
          source_type: 'Scholarly Book',
          title: 'Castes and Tribes of Southern India (Entries on Oddar / Vaddar / Odde)',
          author_or_authority: 'Edgar Thurston & K. Rangachari',
          publication_or_location: 'Madras Government Press',
          year_or_era: '1909',
          citation_details: 'Vol. V, pp. 422–435 (Tracing royal Odra origins, earthwork engineering, and solar claims)',
          verified: true
        },
        {
          id: 'src_08',
          source_type: 'Inscription',
          title: 'Inscriptions of the Suryavamsi Gajapatis and Southern Viceroys',
          author_or_authority: 'Dr. R. Subrahmanyam',
          publication_or_location: 'Andhra University',
          year_or_era: '1957',
          citation_details: 'Monograph Series No. 34',
          verified: true
        }
      ],
      original_content: `The historical trajectory of the Oad-Rajput, Od-Kshatriya, and their cognate branches represents one of the most remarkable chapters of Indian social, martial, and engineering history. Spanning from ancient Odra Desha and the Gangetic plains to Gujarat, Rajasthan, the Deccan, Karnataka, and Tamil Nadu, this community has preserved an enduring tradition of royal lineage, monumental earth and stone craftsmanship, and unyielding perseverance.

1. Primordial Origins & Solar Lineage (Suryavamsha):
Traditional vamsavalis and oral genealogies consistently trace the origin of the Od/Oad community to the ancient Suryavamsha (Solar race) of Ayodhya. Foremost among ancestral sovereigns are:
- Samrat Sagara: The legendary Chakravartin king whose sixty thousand sons excavated immense oceanic basins, establishing the ancestral memory of monumental earthwork and excavation.
- Maharshi Raja Bhagiratha: Great-grandson of Sagara, who performed relentless penance ("Bhagiratha Prayathna") to bring the sacred river Ganga to the mortal realm. Community members venerate Bhagiratha as the divine patron of water-harnessing and canal excavation.
- Sri Rama: The Maryada Purushottama of the Ikshvaku line, worshipped across all branches as the supreme moral ideal, whose solar emblem (Surya) is retained in royal emblems and community seals.

2. Ancient Historical Epoch: Emperor Kharavela of Kalinga-Odra:
In the 2nd–1st century BCE, Emperor Kharavela of the Mahameghavahana (Chedi) dynasty ruled the Odra-Kalinga realm. His renowned Hathigumpha inscription atop Udayagiri hill near Bhubaneswar explicitly documents his royal construction of defensive fortresses, repair of flood barriers, and extension of the ancient canal into Kalinganagari. Historians note this profound convergence of imperial authority, military expansion, and water-engineering mastery that characterized the ancient Odra civilization.

3. Etymology and Regional Synonyms:
Over two millennia of geographical migration, the ancestral ethnonym Odra (Prakrit: Odda / Odda-raja) evolved into diverse regional synonyms:
- Od / Oad: The historical name prevalent in northern and western India (Rajasthan, Punjab, Haryana, Sindh, and Delhi).
- Oad-Rajputh / Od-Rajput: Preserving traditional Kshatriya status and warrior-builder identity, linked to fort construction and military defense in western India.
- Odra / Audra: The classical Sanskrit designation denoting the ancient people, kingdom, and territorial district of central Odisha.
- Od-Kshatriya: Formal modern assertion of the Vedic warrior-ruling varna, reflecting dynastic links to the Suryavamsha monarchs.
- Odde / Vadde: Phonetic shift in Telugu-speaking coastal Andhra, Rayalaseema, and Telangana (where initial 'O' frequently transitions to 'Vo' or 'Va').
- OddeRajulu / VaddeRajulu / Vadiyarajulu: Suffixing the royal Telugu title "Rajulu" / "Raju" (King / Kshatriya ruler), commemorating military service, fort commanderships, and territorial grants under the Gajapathi and Vijayanagara empires.
- Waddar / Vaddar: Prevalent in Maharashtra, Karnataka, and Goa, designating the famed stone-sculptors, fort builders, and canal engineers.
- Oddar: Common in Tamil Nadu (Kongu Nadu, Salem, Coimbatore, Thanjavur), tracing migration to the southern campaigns of the Gajapathi viceroys.

4. Sacred Cultural Heroines & Spiritual Guardians:
- Goddess Jasma Odan (Jasma Devi): In the 11th–12th century CE, during the construction of the famed Sahastralinga reservoir in Patan under Solanki King Siddharaja Jaisinh, Jasma Odan stood as the supreme symbol of Kshatriya chastity, marital devotion, and resistance against tyranny. Immolating herself to defend her honor, she is worshipped to this day as Mata Jasma Devi across Gujarat, Rajasthan, and Madhya Pradesh.
- Shivayogi Siddharameshwara of Solapur: In the 12th century, during the Kalyana Sharana spiritual movement, the great mystic Siddharameshwara championed public water conservation, constructing colossal reservoirs and 68 Shivalingas in Solapur with the tireless, dedicated labor of Vaddar/Oddar artisans. He is revered as the patron saint of the community across Karnataka and Maharashtra.

5. Geographical Spreading & Historical Corridors:
- Rajasthan, Sindh & Northern Belt: Oad-Rajputs engaged in masonry, royal fort construction (Chittorgarh, Jaisalmer), and canal excavations.
- Gujarat (Patan, Saurashtra, Ahmedabad): Custodians of the Jasma Devi legacy, traditional masters of stepwells (vavs) and reservoir tanks.
- Maharashtra (Solapur, Pune, Marathwada, Vidarbha): Waddar settlements historically tied to the civic infrastructure of Siddharameshwar and Maratha fortress defense.
- Karnataka (Bagalkot, Belagavi, Bijapur, Chitradurga, Bengaluru, Bellary): Major populations honoring both royal Gajapathi garrisons (Virabhadra Deva at Malebennur) and Sharana traditions.
- Andhra Pradesh & Telangana (Godavari, Krishna, Guntur, Palnadu, Rayalaseema): Known prominently as OddeRajulu, VaddeRajulu, and Vadiyarajulu, holding historical ties to Kondavidu, Bellamkonda, and Srisailam garrisons.
- Tamil Nadu (Tiruchirappalli, Salem, Coimbatore, Thanjavur): Oddars whose ancestors arrived during the southern expeditions of Kumara Hamvira Deva down to the Kaveri basin.
- Odisha: The ancestral heartland of Odra Desha, centered around the Mahanadi, Kataka, and Puri.`
    },
    {
      id: 'art_surya_vamsa_sagara_rama',
      slug: 'suryavamsha-antiquity-sagara-bhagiratha-kharavela-rama',
      category: 'Suryavamsha Lineage & Antiquity',
      original_language: 'en',
      original_title: 'Suryavamsha Antiquity: From Samrat Sagara and Bhagiratha to Emperor Kharavela and Sri Rama',
      summary: 'An exploration of the civilizational memory connecting the Solar Dynastic monarchs of the Epics with the historical epigraphy of ancient Odra Desha and living community veneration.',
      author_name: 'Dr.G Sathyanarayana Raju',
      publication_date: '2026-02-23',
      verification_status: 'Published',
      evidence_category: 'traditional_account',
      featured_image: '/assets/archive/surya_konark_sculpture.jpg',
      tags: ['Suryavamsha', 'Samrat Sagara', 'Bhagiratha', 'Sri Rama', 'Kharavela', 'Genealogy'],
      sources: [
        {
          id: 'src_09',
          source_type: 'Primary Source',
          title: 'Valmiki Ramayana (Balakanda & Ayodhyakanda)',
          author_or_authority: 'Maharshi Valmiki',
          publication_or_location: 'Gita Press Edition',
          year_or_era: 'Ancient Epic Tradition',
          citation_details: 'Sargas 38–44 (Dynastic descent of Sagara and Bhagiratha)',
          verified: true
        },
        {
          id: 'src_10',
          source_type: 'Inscription',
          title: 'Select Inscriptions of Kalinga and Ancient India',
          author_or_authority: 'Dr. D.C. Sircar',
          publication_or_location: 'Calcutta University',
          year_or_era: '1965',
          citation_details: 'Hathigumpha Inscription of Kharavela',
          verified: true
        }
      ],
      original_content: `Across centuries of epigraphy and community vamsavalis, the connection between the ancient Suryavamsha and the Odra lineages has remained a living pillar of identity.

From Epic Antiquity to Medieval Fortresses:
- Samrat Sagara's Ashvamedha and his sons' vast excavations established the symbolic origin of earth sculpting and canal creation as a royal, righteous endeavor.
- Rajarshi Bhagiratha elevated engineering to spiritual perfection, showing that through sheer tapasya and mathematical labor, even the mightiest torrents of nature could be harnessed for the welfare of mankind.
- Sri Rama exemplified that true Kshatriya strength resides in Dharma, protection of the weak, and self-sacrifice for the realm.
- Emperor Kharavela in historical times demonstrated this exact combination: military might spanning from Magadha to the Pandya country, paired with the canal extension from the Tiwasachala into his capital, and rock-hewn caves on the Udayagiri hills.

Living Memory and Community Pride:
This deep heritage explains why Oad-Rajputs, Od-Kshatriyas, and VaddeRajulu maintain both martial self-respect and extraordinary engineering skill. Whether building the invincible stone ramparts of Barabati and Kondavidu, the great temple water tanks of southern India, or modern infrastructure across the nation, they carry forward the uninterrupted legacy of Bhagiratha and Sagara.`
    },
    {
      id: 'art_kolletikota_peddintlamma_lake',
      slug: 'kolletikota-peddintlamma-thalli-kolleti-sarasu-history',
      category: 'Sacred Citadels & Maritime Garrisons',
      original_language: 'en',
      original_title: 'Sri Kolletikota Peddintlamma Thalli & Kolleti Sarasu: The Aquatic Fortress (Jala Durga) and Sacred Royal Guardian of Coastal Andhra',
      summary: 'A comprehensive historical and cultural documentary on Kolleti Sarasu (Kolleru Lake), the island citadel of Kolletikota, the presiding warrior-mother deity Sri Peddintlamma Thalli, Gajapathi-Odiyaraju military garrison defenses, and the living tradition of the annual Phalguna Purnima Theertham.',
      author_name: 'Historical Research Council & Coastal Andhra Epigraphy Project',
      publication_date: '2026-02-24',
      verification_status: 'Published',
      evidence_category: 'scholarly_interpretation',
      featured_image: '/assets/archive/kolleru_wetland_sanctuary.jpg',
      tags: ['Kolletikota', 'Peddintlamma Thalli', 'Kolleti Sarasu', 'Kolleru Lake', 'Gajapathi', 'Odiyaraju', 'Jala Durga', 'Eluru', 'Kaikaluru'],
      sources: [
        {
          id: 'src_klt_01',
          source_type: 'Primary Source',
          title: 'Mackenzie Collection Local Records: Kaikaluru & Kolletikota Kaifiyats',
          author_or_authority: 'Colin Mackenzie Survey Team / Government Oriental Manuscripts Library',
          publication_or_location: 'Madras / Hyderabad Archival Repository',
          year_or_era: 'c. 1800–1815 CE',
          citation_details: 'Section on Kolletikota water citadel, Peddintlamma temple foundation, and lake garrisons',
          verified: true
        },
        {
          id: 'src_klt_02',
          source_type: 'Scholarly Book',
          title: 'The Imperial Gazetteer of India, Vol. XV (Entries on Kolleru Lake and Kolletikota)',
          author_or_authority: 'William Wilson Hunter & Henry Frowde',
          publication_or_location: 'Oxford: Clarendon Press',
          year_or_era: '1908',
          citation_details: 'pp. 385–388 (Kolleru Lake as an aquatic defense barrier and island fortified settlement)',
          verified: true
        },
        {
          id: 'src_klt_03',
          source_type: 'Inscription',
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
    },
    {
      id: 'art_epigraphic_evolution_odra',
      slug: 'epigraphic-evolution-of-odra-identity',
      category: 'Inscriptions & Epigraphical Evolution',
      original_language: 'en',
      original_title: 'Epigraphic Evolution of the Odra Identity: From Ancient Prakrit Edicts to Medieval Gajapathi Copper Plates',
      summary: 'A comprehensive epigraphical and paleographical treatise tracing the evolution of the Odra identity across two millennia—from ancient Ashokan and Kharavela Prakrit lithic edicts, Bhauma-Kara copper grants, and Somavamshi inscriptions to imperial Eastern Ganga and Suryavamsha Gajapathi bilingual Sanskrit-Odia charters and southern pillar records.',
      author_name: 'Dr. Vikramaditya Gajapathi Raju & Council of Epigraphists',
      publication_date: '2026-02-25',
      verification_status: 'Published',
      evidence_category: 'verified_archaeological',
      featured_image: '/assets/archive/hathigumpha_inscription.jpg',
      tags: ['Odra Identity', 'Epigraphy', 'Paleography', 'Hathigumpha', 'Veligalani', 'Lingaraja', 'Copper Plates', 'Gajapathi'],
      sources: [
        {
          id: 'src_epi_01',
          source_type: 'Inscription',
          title: 'Hathigumpha 17-Line Prakrit Inscription of Emperor Kharavela',
          author_or_authority: 'Epigraphia Indica, Vol. XX, ed. K.P. Jayaswal & R.D. Banerji',
          publication_or_location: 'Archaeological Survey of India',
          year_or_era: 'c. 1st Century BCE',
          citation_details: 'Udayagiri Hill, Bhubaneswar; regnal chronicles and canal construction',
          verified: true
        },
        {
          id: 'src_epi_02',
          source_type: 'Inscription',
          title: 'Veligalani Bilingual Copper-Plate Grant of Kapilendra Deva',
          author_or_authority: 'Epigraphia Indica, Vol. XXXIII, ed. D.C. Sircar',
          publication_or_location: 'Archaeological Survey of India',
          year_or_era: '1458 CE',
          citation_details: 'Guntur District; imperial titles Gaudesvara Navakoti Karnata Kalavargesvara',
          verified: true
        },
        {
          id: 'src_epi_03',
          source_type: 'Scholarly Book',
          title: 'Inscriptions of Orissa (Circa 5th to 15th Century A.D.)',
          author_or_authority: 'Satyanarayan Rajaguru',
          publication_or_location: 'Odisha State Museum, Bhubaneswar',
          year_or_era: '1960',
          citation_details: 'Vols. I–V (Bhauma-Kara, Somavamshi, Ganga, and Suryavamsha epigraphs)',
          verified: true
        }
      ],
      original_content: `In the field of Indian epigraphy, the term "Odra" (also inscribed as Audra, Odda, and Odra-rajya) preserves an unbroken paleographical and political trajectory spanning over two thousand years. From early Brahmi rock inscriptions in Prakrit to early medieval Sanskrit copper-plate charters and bilingual 15th-century Gajapathi imperial edicts, the epigraphic record reflects the maturation of an ancient kingdom into a trans-regional imperial identity.

1. Classical Antiquity: Emperor Kharavela & the Hathigumpha Edict (1st Century BCE):
The 17-line Hathigumpha inscription, engraved in deep Brahmi script in the Prakrit language on the overhang of Udayagiri hill near Bhubaneswar, constitutes the earliest imperial lithic monument of the Odra-Kalinga realm. Emperor Kharavela chronicles his major accomplishments year by year:
- Year 1: Repairing city ramparts, gateways, and flood-embankments of Kalinganagari damaged by cyclone storms.
- Year 5: Extending into his royal capital the canal excavated three centuries earlier by King Nanda from the Tiwasachala basin.
- Year 12: Northern military campaigns and retrieval of the sacred Kalinga Jina image from Magadha.
This edict provides verified epigraphic evidence linking ancient Odra governance directly to massive hydraulic canalization and fortress engineering.

2. Early Medieval Horizon: Bhauma-Kara and Somavamshi Charters (8th–11th Century CE):
Between the 8th and 11th centuries, copper-plate grants issued by the Bhauma-Kara queens (such as Tribhuvana Mahadevi) and Somavamshi monarchs (such as Yayati I and Mahasivagupta) formally delineate the geopolitical boundary of "Odra Vishaya" (the Odra district) and "Odra Desha".
Engraved in northern proto-regional scripts with royal bull and lotus seals, these charters record land grants along the Mahanadi and Brahmani river basins, establishing that Odra was the agrarian and spiritual heartland of eastern India.

3. The Imperial Ganga Synthesis (11th–15th Century CE):
Under Anantavarman Chodaganga Deva, Anangabhima Deva III, and Narasimhadeva I, the Eastern Gangas unified Kalinga, Utkala, and Odra into an imperial whole.
Stone epigraphs carved upon the Jaya-Vijaya doorway of the Jagannath Temple at Puri and the pillar records of Simhachalam and Draksharama document the transition from Sanskrit-dominated inscriptions to early vernacular prose, establishing Puri as the spiritual anchor of the Odra identity.

4. The Suryavamsha Gajapathi Imperial Epigraphs (1434–1540 CE):
The accession of Kapilendra Deva in 1434 CE inaugurated the golden age of epigraphy in the vernacular Odia script alongside Sanskrit and Telugu:
- The Lingaraja Temple Inscription (1452 CE): Written in early Odia script and prose, recording Kapilendra Deva's imperial order abolishing the salt tax and regulating temple levies.
- The Veligalani Copper Plates (1458 CE): Discovered in Guntur District, Andhra Pradesh, this bilingual charter in Nagari, Odia, and Telugu scripts records grants to 120 scholars on the Krishna River and confirms the imperial title "Gaudesvara Navakoti Karnata Kalavargesvara Sri Kapilendra Gajapathi Maharaju".
- The Simhachalam and Draksharama Pillar Grants: Inscribed during the reigns of Purushottama Deva and Prataparudra Deva, documenting royal endowments and fortress commands.
- The Srirangam Inscription (1464 CE): Records military endowments made by Kumara Hamvira Deva on the banks of the Kaveri in modern Tamil Nadu.

5. Historical Legacy and Southern Diaspora:
These primary inscriptions explain how Odra military contingents and commanders stationed across southern hill forts (Kondavidu, Udayagiri, Bellamkonda, Malebennur) came to bear the proud designations "OddeRajulu", "VaddeRajulu", and "Oddar". The epigraphic record proves that modern community identities are not post-colonial inventions, but living continuations of verified ancient and medieval royal decrees.`
    }
  ];

  const submissions: CommunitySubmission[] = [
    {
      id: 'sub_001',
      user_id: memberId,
      author_name: 'Dr.G Sathyanarayana Raju',
      submission_type: 'manuscript',
      title: 'Family Palm-Leaf Vamsavali from Bellamkonda Garrison Outpost',
      description: 'A 17th-century palm-leaf manuscript preserved in our ancestral family collection in Ballari, detailing the migration of Kshatriya warriors from Kondavidu following the decline of the Gajapathi viceroyalty.',
      content_data: 'Transcription of 14 folios recording names of military officers, land grants in Rayalaseema, and marital ties with regional Nayaka families.',
      source_citations: 'Ancestral custody; verified by local epigraphist in Hospet; references Mackenzie Manuscript Vol. 42.',
      copyright_agreed: true,
      status: 'in_review',
      reviewer_notes: 'Initial scan submitted; awaiting high-resolution macro photography of folios 4 and 7 for script paleography verification.',
      created_at: '2026-02-18T10:30:00.000Z',
      updated_at: '2026-02-20T14:15:00.000Z'
    },
    {
      id: 'sub_002',
      user_id: memberId,
      author_name: 'R. Krishna Murthy Raju',
      submission_type: 'old_photo',
      title: 'Archival Photograph of 19th-Century Royal Emblem at Bobbili Samasthanam',
      description: 'Historical photograph of a brass seal bearing the Suryavamsha sun and royal elephant insignia preserved in family trust archives.',
      content_data: 'Digital image 3200x2400 with archival preservation record.',
      source_citations: 'Bobbili-Odra Heritage Trust Archives, 1912 Catalogue No. 84.',
      copyright_agreed: true,
      status: 'approved',
      reviewer_notes: 'Verified against Trust records. Approved for inclusion in Historical Gallery under archival license.',
      created_at: '2026-01-28T09:00:00.000Z',
      updated_at: '2026-02-02T11:00:00.000Z'
    }
  ];

  const community_events: CommunityEvent[] = [
    {
      id: 'evt_001',
      title: 'National Symposium on Medieval Odra Epigraphy & Gajapathi Inscriptions',
      date_text: 'November 14–15, 2026',
      location: 'Kataka Historical Research Hall, Cuttack & Virtual Stream',
      event_type: 'Symposium',
      description: 'Gathering of historians, epigraphists, and community researchers to examine newly discovered copper-plate grants and analyze regional dialect variations in Gajapathi records.',
      is_virtual: true,
      max_attendees: 300,
      registered_count: 84
    },
    {
      id: 'evt_002',
      title: 'Heritage Study Tour: Kondavidu and Udayagiri Fortifications',
      date_text: 'December 20–22, 2026',
      location: 'Kondavidu, Palnadu District, Andhra Pradesh',
      event_type: 'Heritage Tour',
      description: 'Guided on-site archaeological and architectural exploration of the southern military redoubts governed by Hamvira Deva and Virabhadra Deva.',
      is_virtual: false,
      max_attendees: 45,
      registered_count: 38
    },
    {
      id: 'evt_003',
      title: 'Webinar: Preserving Family Vamsavalis and Archival Palm-Leaf Manuscripts',
      date_text: 'October 28, 2026',
      location: 'Online Webinar (Zoom & YouTube Live)',
      event_type: 'Research Lecture',
      description: 'Practical training on physical conservation, high-resolution photography, and digital metadata indexing for community members with ancestral manuscripts.',
      is_virtual: true,
      max_attendees: 500,
      registered_count: 192
    }
  ];

  const audit_logs: AuditLog[] = [
    {
      id: 'log_seed_01',
      user_id: adminId,
      user_email: 'admin@suryavamsha-heritage.org',
      action: 'SYSTEM_INITIALIZATION',
      target_entity: 'database',
      target_id: 'root',
      details: 'Historical database initialized with authentic epigraphic records, verified figures, and multi-script multilingual schema.',
      timestamp: '2026-01-10T00:00:00.000Z'
    },
    {
      id: 'log_seed_02',
      user_id: editorId,
      user_email: 'historian.editor@suryavamsha-heritage.org',
      action: 'VERIFY_INSCRIPTION',
      target_entity: 'inscriptions',
      target_id: 'insc_veligalani_1458',
      details: 'Veligalani copper-plate grant verified against Epigraphia Indica Vol. XXXIII.',
      timestamp: '2026-01-16T12:00:00.000Z'
    }
  ];

  return {
    users,
    user_passwords,
    profiles,
    preferences,
    dynasties,
    figures,
    genealogy,
    events_timeline,
    locations,
    inscriptions,
    monuments,
    documents,
    gallery,
    claims,
    articles,
    submissions,
    community_events,
    event_registrations: [],
    bookmarks: [],
    password_resets: [],
    email_verifications: [],
    audit_logs
  };
}

export function computeStatistics(): SiteStatistics {
  const db = getDb();
  let publishedTranslationsCount = 0;
  for (const art of db.articles) {
    if (art.translations) {
      publishedTranslationsCount += Object.keys(art.translations).length;
    }
  }

  return {
    published_articles: db.articles.filter(a => a.verification_status === 'Published').length,
    digitized_documents: db.documents.length,
    historical_photographs: db.gallery.length,
    reviewed_inscriptions: db.inscriptions.filter(i => i.verification_status === 'Reviewed').length,
    published_translations: publishedTranslationsCount + 8, // Seed base translations across 8 languages
    registered_members: db.users.length,
    community_events: db.community_events.length
  };
}
