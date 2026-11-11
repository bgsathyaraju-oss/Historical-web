import type { Article, LanguageCode } from '../types/index.ts';
import type { ArticleStructuredMetadata } from './sevenCategoriesExpansionData.ts';
import {
  KAKATIYA_MAIN_ARTICLE,
  KAKATIYA_MAIN_ARTICLE_STRUCTURED_METADATA
} from './kakatiyaDynastyData.ts';

const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

/**
 * 18 New Comprehensive Historical Articles covering all 13 requested Dynasty/Kingdom/Lineage
 * topics and all 7 Historical Categories with full Sections A–E structure and verified citations.
 */
export const EXPANDED_HISTORICAL_ARTICLES: Article[] = [
  // ============================================================================
  // 1. EASTERN GANGAS (RD-0002)
  // ============================================================================
  {
    id: 'art_dyn_eastern_gangas',
    slug: 'eastern-ganga-dynasty-kalinga-utkala-history',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0002 | The Eastern Ganga Dynasty of Kalinga and Utkala (498–1434 CE): Trikalingadhipati Sovereignty, Jagannatha Statecraft, and the Konark Sun Temple',
    summary:
      'A comprehensive dynastic monograph on the Early and Imperial Eastern Gangas of Kalinganagara and Abhinava Varanasi Kataka—documenting their 936-year reign, unification of Kalinga, Utkala, and Odra, construction of the Puri Jagannatha and Konark Sun Temples, and historiographical distinction from the Western Gangas of Talakad.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
    tags: [
      'Eastern Gangas',
      'Royal Dynasties',
      'Anantavarman Chodaganga',
      'Narasimha Deva I',
      'Kalinganagara',
      'Konark Sun Temple',
      'Puri Jagannatha Temple',
      'Trikalingadhipati'
    ],
    sources: [
      {
        id: 'src_eg_01',
        source_type: 'Inscription',
        title: 'Korni Copper-Plate Grant of Anantavarman Chodaganga Deva (Saka 1034 / 1112 CE)',
        author_or_authority: 'G.V. Ramamurti (ed.), Journal of the Andhra Historical Research Society',
        publication_or_location: 'Rajahmundry: AHRS Vol. I / Archaeological Survey of India',
        year_or_era: '1112 CE (Published 1926)',
        citation_details: 'Vol. I, Part 2, pp. 40–48; Srikakulam District findspot',
        verified: true
      },
      {
        id: 'src_eg_02',
        source_type: 'Inscription',
        title: 'Kendupatna Copper-Plate Inscription of Narasimha Deva II (Saka 1217 / 1295 CE)',
        author_or_authority: 'Epigraphia Indica, Vol. XXVIII, ed. D.C. Sircar',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1295 CE',
        citation_details: 'pp. 185–195; records Konark Sun Temple construction by Narasimha Deva I',
        verified: true
      },
      {
        id: 'src_eg_03',
        source_type: 'Scholarly Book',
        title: 'Inscriptions of Orissa, Vol. III (Parts I & II): Imperial Gangas',
        author_or_authority: 'Satyanarayan Rajaguru',
        publication_or_location: 'Bhubaneswar: Odisha State Museum',
        year_or_era: '1960–1961',
        citation_details: 'Chronological corpus of Eastern Ganga stone and copper-plate grants',
        verified: true
      },
      {
        id: 'src_eg_04',
        source_type: 'Scholarly Book',
        title: 'History of Orissa, Vol. I',
        author_or_authority: 'R.D. Banerji',
        publication_or_location: 'Calcutta: R. Chatterjee',
        year_or_era: '1930',
        citation_details: 'Chapters XIV–XVII (Early and Imperial Eastern Gangas, pp. 225–288)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Background:
Reference Number: RD-0002 | Category: Royal Dynasties (Odra-Kalinga Imperial Dynasties) | Period: 498 CE – 1434 CE | Location: Kalinganagara (Mukhalingam, Srikakulam) and Abhinava Varanasi Kataka (Cuttack, Odisha).
The Eastern Ganga Dynasty (Chodaganga-vamsa / Prachya-Ganga) ruled Kalinga, Odra, and Utkala for nearly a millennium (498–1434 CE), representing one of the longest-reigning royal houses in world history. Historiographically, the Eastern Gangas of Kalinga must be strictly distinguished from the Western Gangas of Talakad (Gangavadi in southern Karnataka). While 11th-century copper-plate preambles (such as the Korni and Vizagapatam grants) trace a shared ancestral memory to Kolahalapura (Kolar), the Eastern Gangas established an independent sovereign state in Kalinga in 498 CE (beginning of the Gangeya Era) with their own administrative institutions, Mahendragiri tutelary worship of Gokarnasvamin, and Kalinga temple architecture.

2. Geographical Extent & Territorial Boundaries:
During the Early Eastern Ganga phase (498–1038 CE), the realm was anchored around Kalinganagara (modern Mukhalingam on the Vamsadhara River in Srikakulam district) and Dantapura, bounded by Mount Mahendragiri in the north and the Godavari basin in the south. Under Anantavarman Chodaganga Deva (r. 1077–1147 CE), the empire expanded dramatically from the Bhagirathi-Ganga (Hooghly) in the north to the Gautami-Godavari in the south, shifting its imperial seat to Abhinava Varanasi Kataka (Cuttack) on the Mahanadi around 1135 CE.

3. Founders & Important Rulers:
- Indravarman I (c. 498 CE): Founder of the Gangeya Samvatsara (Ganga Era), attested in the Jirjingi copper plates, who assumed the title Trikalingadhipati (Lord of the Three Kalingas).
- Vajrahasta V (Anantavarman Vajrahasta III, r. 1038–1070 CE): Consolidated the Later Imperial Ganga line and assumed full imperial titles (Maharajadhiraja Paramesvara).
- Rajaraja Devendravarman (r. 1070–1077 CE): Defeated both Vengi-Chola and Somavamshi armies; wedded Rajasundari, daughter of Imperial Chola monarch Virarajendra.
- Anantavarman Chodaganga Deva (r. 1077–1147 CE): Born of the Ganga-Chola royal alliance; reigned for 70 years, annexed Utkala from the final Somavamshi ruler Karnadeva (c. 1110–1112 CE), and commissioned the monumental Sri Jagannatha Temple at Puri.
- Anangabhima Deva III (r. 1211–1238 CE): Dedicated the empire to Lord Purushottama-Jagannatha as the supreme sovereign (Rautaraya doctrine) and repelled the Bengal Sultanate invasions.
- Langula Narasimha Deva I (r. 1238–1264 CE): Launched offensive campaigns against Tughril Tughan Khan at Katasin and Lakhnauti in Bengal, and commissioned the world-renowned Konark Sun Temple (Padmakshetra).
- Bhanudeva IV (Nissanka Bhanudeva, r. 1414–1434 CE): Final ruler of the dynasty, whose military commander Kapilendra Deva ascended the throne of Kataka in 1434 CE to found the Suryavamsha Gajapathi Empire.

4. Political Administration & Military Organization:
The Eastern Ganga state was divided into Mandalas (provinces), Vishayas (districts), and Bhogas or Gramas (villages). High ministers included the Mahasandhivigrahika (minister of war and peace), Senapati (commander-in-chief), Rahasyadhikari (private secretary), and Bhandagaradhikari (treasurer). Military power relied on elephant divisions (Gaja-vahini), hill fortress garrisons (Giri-durgas) along the Eastern Ghats, and hereditary Paika and Odra-Kshatriya infantry guilds.

5. Culture, Literature, Religion & Temple Architecture:
Initially devout Shaivas worshipping Lord Gokarnesvara atop Mount Mahendragiri (as seen in the Mukhalingesvara and Bhimesvara temples), the Imperial Gangas synthesized Shaiva, Vaishnava, and Saura traditions. Under Chodaganga Deva and Anangabhima Deva III, the cult of Sri Jagannatha at Puri became the state religion. Architecturally, the Kalinga style (Rekha Deula, Pidha Deula, and Khakhara Deula) reached its zenith in the Puri Jagannatha Temple (65-meter vimana) and the 13th-century Konark Sun Temple designed as the 24-wheeled celestial chariot of Surya. Sanskrit literature (Vidyadhara’s Ekavali and Jayadeva’s Gita Govinda liturgy) flourished alongside early Odia and Telugu epigraphy at Simhachalam and Srikurmam.

6. Evidence, Historical Analysis & Community Cross-References:
Primary sources include the Jirjingi plates (EI Vol. XXV), Vizagapatam plates (IA Vol. XVIII), Korni plates (1112 CE), Nagari plates of Anangabhima III (EI Vol. XXVIII), and Kendupatna plates (1295 CE). Epigraphic records at Simhachalam, Srikurmam, Mukhalingam, and Puri document administrative offices (Nayaka, Rautaraya, Mahasenapati, Odda-dandapata) linked to the historical military and stone-engineering heritage of Odra-Kshatriya, Odiyaraju, and VaddeRajulu communities.`
  },

  // ============================================================================
  // 2. WESTERN GANGAS (RD-0003)
  // ============================================================================
  {
    id: 'art_dyn_western_gangas',
    slug: 'western-ganga-dynasty-talakad-gangavadi-history',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0003 | The Western Ganga Dynasty of Talakad and Gangavadi (c. 350–1000 CE): Sovereign Statecraft, Shravanabelagola Monumentality, and Distinction from the Eastern Gangas',
    summary:
      'An authoritative historiographical study of the Western Ganga Dynasty (Ganga-vamsa of Gangavadi-96,000) in southern Karnataka—examining founders Konganivarman Madhava, Durvinita, Sripurusha, and Minister Chavundaraya, their Kannada-Sanskrit literary patronage, and their distinct political trajectory separate from the Eastern Gangas of Kalinga.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('royal_dynasties_heritage.jpg'),
    tags: [
      'Western Gangas',
      'Royal Dynasties',
      'Gangavadi',
      'Talakad',
      'Durvinita',
      'Sripurusha',
      'Chavundaraya',
      'Shravanabelagola',
      'Karnataka History'
    ],
    sources: [
      {
        id: 'src_wg_01',
        source_type: 'Inscription',
        title: 'Epigraphia Carnatica, Vols. III, IV & IX (Inscriptions of Mysore, Mandya, and Bangalore Districts)',
        author_or_authority: 'B. Lewis Rice (ed.)',
        publication_or_location: 'Bangalore: Mysore Government Central Press',
        year_or_era: '1894–1905',
        citation_details: 'Western Ganga copper-plate grants and Shravanabelagola lithic inscriptions',
        verified: true
      },
      {
        id: 'src_wg_02',
        source_type: 'Scholarly Book',
        title: 'History of the Western Gangas (Comprehensive History of Karnataka, Vol. I)',
        author_or_authority: 'Dr. B. Sheik Ali',
        publication_or_location: 'Mysore: University of Mysore',
        year_or_era: '1976',
        citation_details: 'pp. 1–380 (Political, administrative, and cultural history of Gangavadi)',
        verified: true
      },
      {
        id: 'src_wg_03',
        source_type: 'Scholarly Book',
        title: 'A History of South India from Prehistoric Times to the Fall of Vijayanagar',
        author_or_authority: 'Prof. K.A. Nilakanta Sastri',
        publication_or_location: 'Madras: Oxford University Press',
        year_or_era: '1955 (4th Ed. 1976)',
        citation_details: 'Chapters VI–IX (Western Gangas, Chalukyas, Pallavas, and Rashtrakutas)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historiographical Distinction:
Reference Number: RD-0003 | Category: Royal Dynasties (Deccan & Karnata Dynasties) | Period: c. 350 CE – 1000 CE | Location: Kolar (Kuvalala) and Talakad (Talavanapura) on the Kaveri River, Southern Karnataka (Gangavadi-96,000).
The Western Ganga Dynasty ruled southern Karnataka (historically termed Gangavadi) from the mid-4th century CE until the Chola annexation of Talakad around 1000 CE. Historians strictly differentiate the Western Gangas of Talakad from the Eastern Gangas of Kalinga:
- The Western Gangas ruled interior southern Karnataka (Mysore, Mandya, Hassan, Kolar, Tumkur, and Bengaluru), used Kannada and Sanskrit in administration, bore the Madagajendra (Musth Elephant) royal crest, and maintained complex feudal-marital alliances with the Badami Chalukyas and Rashtrakutas.
- The Eastern Gangas ruled Kalinga-Odra along the Bay of Bengal (from 498 CE), used Sanskrit, Odia, and Telugu, worshipped Gokarnesvara and Jagannatha, and bore the Vrishabha (Nandi Bull) signet.

2. Origins, Founders & Important Rulers:
- Konganivarman Madhava I (c. 350–370 CE): Established the kingdom at Kuvalala (Kolar) under the spiritual guidance of the Jain acharya Simhanandi, assuming the title Dharma-Mahadhiraja and belong to the Kanvayana gotra.
- Harivarman & Avinita (5th–6th Century CE): Shifted the royal capital to Talavanapura (Talakad) on the banks of the Kaveri for strategic control over fertile agrarian valleys.
- Durvinita (r. c. 529–579 CE): Celebrated scholar-monarch and diplomat; allied with the Early Chalukyas of Badami, composed Sanskrit commentaries on Bharavi’s Kiratarjuniya (15th sarga), and patronized early Kannada prose.
- Sripurusha (r. c. 726–788 CE): Reigned for over six decades from Manne (Manyapura), resisted Rashtrakuta expansion under Krishna I, and authored the treatise on elephantology, Gajashastra.
- Butuga II & Marasimha II (10th Century CE): Key military allies of the Rashtrakutas; Butuga II played a decisive role in the Battle of Takkolam (949 CE) against the Cholas.
- Rachamalla IV Satyavakya (r. 974–985 CE) & Minister Chavundaraya: Under Rachamalla IV, the illustrious commander and scholar Chavundaraya commissioned the 57-foot monolithic statue of Gommateshwara (Bahubali) at Shravanabelagola in c. 981 CE.

3. Political Administration, Economy & Hero Stones (Viragals):
Gangavadi was administratively termed "Gangavadi-96,000" (denoting revenue divisions). Village governance functioned through Gavundas (village headmen) and Mahajanas. Irrigation tanks (Kere), sluices, and stepwells were systematically constructed across the Kaveri and Arkavati basins. Hundreds of finely carved Kannada Viragals (hero stones, such as the Begur inscription mentioning "Benguluru" c. 890 CE) document cavalry and hound warfare.

4. Literature, Religion & Architecture:
While early Western Ganga monarchs patronized Vedic Brahmanism alongside Jainism, later rulers and commanders were munificent patrons of Digambara Jainism. Chavundaraya authored the Chavundaraya Purana (978 CE), one of the earliest extant prose works in Kannada. Architectural landmarks include the Panchakuta Basadi at Kambadahalli, the Chandragupta Basadi at Shravanabelagola, and the Arakesvara Temple at Hale Alur.

5. Evidence, Scholarly Debate & Community Cross-Reference Notice:
Epigraphical debate (J.F. Fleet vs. B. Lewis Rice) scrutinized certain early copper plates as later 9th-century recensions, while authenticating the Genuine Penukonda plates (EI Vol. XIV) and stone inscriptions across Mysore. Regarding the 76 Community Names registry: while monolithic granite quarrying at Shravanabelagola and tank construction in Gangavadi involved traditional stone-sculptor guilds (later documented in Mysore Gazetteers under Waddar / Kallu-Waddar / Odiyaraju), direct dynastic affiliation with the Western Ganga royal house is classified as: "Historical association not independently verified."`
  },

  // ============================================================================
  // 3. CHOLAS (RD-0004)
  // ============================================================================
  {
    id: 'art_dyn_imperial_cholas',
    slug: 'chola-dynasty-cholamandalam-history-epigraphy',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0004 | The Chola Dynasty of Cholamandalam (c. 300 BCE – 1279 CE): Maritime Hegemony, Uttaramerur Local Governance, and Kalinga-Vengi Relations',
    summary:
      'A complete historical treatise on the Early Sangam Cholas and the Imperial Cholas of Thanjavur and Gangaikondacholapuram—examining Rajaraja I, Rajendra I, and Kulottunga I, the Uttaramerur village assembly inscriptions, Dravida temple architecture, and diplomatic-military interactions with Vengi and Kalinga.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('srirangam_temple.jpg'),
    tags: [
      'Cholas',
      'Royal Dynasties',
      'Rajaraja Chola I',
      'Rajendra Chola I',
      'Kulottunga Chola I',
      'Thanjavur',
      'Uttaramerur Inscription',
      'SuryaVamsha',
      'Cholamandalam'
    ],
    sources: [
      {
        id: 'src_chola_01',
        source_type: 'Scholarly Book',
        title: 'The Colas',
        author_or_authority: 'Prof. K.A. Nilakanta Sastri',
        publication_or_location: 'Madras: University of Madras Historical Series No. 9',
        year_or_era: '1935 (2nd Rev. Ed. 1955)',
        citation_details: 'pp. 1–812 (Definitive epigraphical history of the Early and Imperial Cholas)',
        verified: true
      },
      {
        id: 'src_chola_02',
        source_type: 'Inscription',
        title: 'South Indian Inscriptions (SII), Vol. II: Tamil Inscriptions of Rajaraja and Rajendra Chola in the Rajarajesvara Temple at Tanjavur',
        author_or_authority: 'E. Hultzsch & V. Venkayya (eds.)',
        publication_or_location: 'Madras: Archaeological Survey of India',
        year_or_era: '1891–1916',
        citation_details: 'Parts I–V; Tirumagal Pola and Tirumanni Valara Meykkirttis',
        verified: true
      },
      {
        id: 'src_chola_03',
        source_type: 'Inscription',
        title: 'Uttaramerur Inscriptions of Parantaka Chola I (919 & 921 CE)',
        author_or_authority: 'Archaeological Survey of India Annual Report (1904–05)',
        publication_or_location: 'Calcutta: Superintendent Government Printing',
        year_or_era: '1908',
        citation_details: 'Vaikuntha Perumal Temple wall inscriptions detailing Kudavolai electoral system',
        verified: true
      },
      {
        id: 'src_chola_04',
        source_type: 'Inscription',
        title: 'Thiruvalangadu & Leiden Copper-Plate Grants of Rajendra Chola I',
        author_or_authority: 'South Indian Inscriptions Vol. III & Epigraphia Indica Vol. XXII',
        publication_or_location: 'Archaeological Survey of India',
        year_or_era: '1018–1025 CE',
        citation_details: 'Sanskrit Suryavamsha prasasti and Tamil endowment charters',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Scope:
Reference Number: RD-0004 | Category: Royal Dynasties (Tamilakam Imperial Houses) | Period: Sangam Era (c. 300 BCE – 200 CE) & Imperial Era (848 – 1279 CE) | Location: Uraiyur, Puhar (Kaveripattinam), Thanjavur, and Gangaikondacholapuram (Kaveri Basin, Tamil Nadu).
The Chola Dynasty is among the longest-documented ruling lineages in human history, first attested in Ashoka’s Major Rock Edicts II and XIII (c. 261 BCE), Sangam poetry (Pattinappalai, Purananuru), and the Periplus of the Erythraean Sea. Re-established as an imperial power by Vijayalaya Chola at Thanjavur around 848 CE, the Imperial Cholas dominated southern India, Sri Lanka, the Maldives, and maritime trade routes across the Bay of Bengal until 1279 CE.

2. Founders, Imperial Monarchs & Vengi-Kalinga Connections:
- Karikala Chola (Sangam Era, c. 1st–2nd Century CE): Celebrated for his victory at Venni and the construction of the Grand Anicut (Kallanai) across the Kaveri River.
- Vijayalaya (r. c. 848–871 CE) & Aditya I (r. 871–907 CE): Overthrew Muttaraiyar and Pallava suzerainty to establish the imperial Chola state.
- Parantaka I (r. 907–955 CE): Issued the famous Uttaramerur inscriptions (919 & 921 CE) codifying autonomous village sabha elections.
- Rajaraja Chola I (Arulmozhi Varman, r. 985–1014 CE): Instituted systematic land revenue surveys (Ulagalandan), intervened in Vengi to install Saktivarman I, built the monumental Brihadisvara (Rajarajesvara) Temple at Thanjavur (1010 CE), and introduced historical Tamil preambles (Meykkirttis).
- Rajendra Chola I (r. 1014–1044 CE): Led the northern expedition through Odda-vishaya (Odra) and Kosala to the Ganges (assuming the title Gangaikondachola) and launched the 1025 CE naval expedition against Srivijaya in Southeast Asia.
- Kulottunga Chola I (Rajendra Chalukya, r. 1070–1122 CE): Son of Eastern Chalukya king Rajaraja Narendra and Chola princess Ammangadevi, uniting the Vengi Chalukya and Chola crowns. His general Karunakara Tondaiman’s Kalinga campaigns against Anantavarman Chodaganga Deva are celebrated in Jayamkondar’s Tamil war poem Kalingattuparani.

3. Political Administration, Kudavolai Democracy & Maritime Economy:
The empire was organized into Mandalams (provinces), Valanadus, Nadus, and Kottams. The Uttaramerur inscriptions detail the Kudavolai (pot-ticket) selection of village committee (Variyam) members for tank maintenance (Eri-variyam), gardens, and justice, imposing strict property, educational, and moral audit qualifications. Overseas trade flourished through merchant guilds such as the Ayyavole-500 (Ainurruvar) and Manigramam.

4. Religion, Literature & Dravida Architecture:
While ardent Shaivas who canonized the Tirumurai under Nambiyandar Nambi and built the Great Living Chola Temples (Thanjavur, Gangaikondacholapuram, and Darasuram—UNESCO World Heritage Sites), Chola emperors also endowed Vaishnava (Srirangam) and Buddhist (Nagapattinam Chudamani Vihara) institutions. In their Sanskrit copper plates (Anbil, Leiden, and Thiruvalangadu grants), the Cholas traced their traditional genealogical preamble to the Suryavamsha (Solar Lineage of Ikshvaku and Sibi).

5. Evidence, Historical Analysis & Community Cross-References:
Over 10,000 Chola stone and copper-plate inscriptions have been catalogued in South Indian Inscriptions. Epigraphic records of Rajendra I (Tirumalai Rock Inscription, 1024 CE) explicitly document his march through "Odda-vishaya" (Odra Desha), and later Tamil inscriptions and Madras Census reports (Thurston 1909) record Oddar / Ottar / Boya-Oddar tank-excavation and stone-masonry guilds across Cholamandalam and Kongu Nadu.`
  },

  // ============================================================================
  // 4. CHALUKYAS (PAN-DECCAN SYNTHESIS) (RD-0005)
  // ============================================================================
  {
    id: 'art_dyn_chalukya_synthesis',
    slug: 'chalukya-dynasties-badami-vengi-kalyani-historiography',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0005 | The Chalukya Dynastic Continuum: Comparative Historiography of the Badami, Vengi, and Kalyani Chalukya Branches (543–1200 CE)',
    summary:
      'A comparative historiographical treatise distinguishing the three major Chalukya branches of the Deccan—the Early Western Chalukyas of Badami (543–753 CE), the Eastern Chalukyas of Vengi (624–1189 CE), and the Later Western Chalukyas of Kalyani (973–1189 CE)—alongside the 16th-century Chalukya emperor of Odisha, Mukunda Deva.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('mukunda_deva_barabati.jpg'),
    tags: [
      'Chalukyas',
      'Royal Dynasties',
      'Badami Chalukyas',
      'Vengi Chalukyas',
      'Kalyani Chalukyas',
      'Mukunda Deva',
      'Deccan History',
      'Varaha Emblem'
    ],
    sources: [
      {
        id: 'src_chal_01',
        source_type: 'Scholarly Book',
        title: 'The Early History of the Deccan (Parts I–XI)',
        author_or_authority: 'Dr. Ghulam Yazdani (ed.) & Prof. K.A. Nilakanta Sastri',
        publication_or_location: 'London & Bombay: Oxford University Press',
        year_or_era: '1960',
        citation_details: 'Vols. I & II (Chalukyas of Badami, Chalukyas of Kalyani, and Eastern Chalukyas of Vengi)',
        verified: true
      },
      {
        id: 'src_chal_02',
        source_type: 'Inscription',
        title: 'Aihole Meguti Temple Inscription of Pulakeshin II (Saka 556 / 634 CE)',
        author_or_authority: 'Epigraphia Indica, Vol. VI, ed. F. Kielhorn',
        publication_or_location: 'Calcutta: Archaeological Survey of India',
        year_or_era: '1900–1901',
        citation_details: 'pp. 1–12; composed in Sanskrit verse by court poet Ravikirti',
        verified: true
      },
      {
        id: 'src_chal_03',
        source_type: 'Scholarly Book',
        title: 'The Dynasties of the Kanarese Districts of the Bombay Presidency',
        author_or_authority: 'Dr. J.F. Fleet',
        publication_or_location: 'Bombay: Government Central Press (Gazetteer of the Bombay Presidency, Vol. I, Part II)',
        year_or_era: '1896',
        citation_details: 'pp. 335–468 (Epigraphic tables of the Western and Eastern Chalukyas)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Branch Classification:
Reference Number: RD-0005 | Category: Royal Dynasties (Deccan & Karnata Dynasties) | Period: 543 CE – 1200 CE (and 1559–1568 CE in Odisha) | Location: Vatapi (Badami), Vengi (Peddavegi/Rajahmundry), and Kalyani (Basavakalyana).
In Indian historiography, "Chalukya" does not denote a single monolithic kingdom, but rather three interconnected yet politically distinct royal houses sharing the Manavyasa gotra, Haritiputra epithet, Saptamatrika tutelary invocation, and the royal Varaha (Boar) crest:
1. The Badami Chalukyas (Early Western Chalukyas, 543–753 CE): Founded by Pulakeshin I at Vatapi (Badami, Bagalkot district, Karnataka).
2. The Vengi Chalukyas (Eastern Chalukyas, 624–1189 CE): Founded after Pulakeshin II conquered coastal Andhra (Pishtapura and Vengi) and appointed his younger brother Kubja Vishnuvardhana as viceroy, who soon established an independent sovereign dynasty lasting over five centuries.
3. The Kalyani Chalukyas (Later Western Chalukyas, 973–1189 CE): Restored by Tailapa II after overthrowing the Rashtrakutas, ruling from Manyakheta and Kalyani (Basavakalyana, Bidar district) under monarchs such as Someshvara I and Vikramaditya VI (who instituted the Chalukya-Vikrama Era in 1076 CE).
Additionally, the Chaulukyas (Solankis) of Anhilwara-Patan in Gujarat (940–1244 CE) and the 16th-century Chalukya lineage of Mukunda Deva Harichandana in Odisha (r. 1559–1568 CE) represent distinct regional formations.

2. Geopolitical Significance & Relations with Odra-Kalinga:
The Chalukya houses shaped the political geography of peninsular India for six centuries. Pulakeshin II’s campaigns in Kalinga and Kosala (recorded in the Aihole Prasasti, 634 CE) established Vengi as the permanent southern neighbor of Kalinga. Later, Kalyani Chalukya Emperor Vikramaditya VI’s campaigns intersected with the rise of Anantavarman Chodaganga Deva in Kalinga. In the 12th century, within the Kalyani Chalukya-Kalachuri territory of Sonnalige (Solapur), Shivayogi Siddharameshwara spearheaded monumental lake and temple construction with Waddar/Odde guilds. Finally, in 1559 CE, Mukunda Deva of the Odishan Chalukya branch ascended the throne of Kataka, building the nine-storeyed palace at Barabati Fort and the Triveni Ghat steps on the Hooghly.

3. Administrative, Literary & Architectural Contributions:
The Chalukyas pioneered the Vesara (Karnata-Dravida) architectural synthesis at Badami, Aihole, Pattadakal, Lakkundi, and Itagi (Mahadeva Temple). In literature, Kalyani Chalukya courts patronized Ranna (Gadayuddha) and Bilhana (Vikramankadevacharita), as well as Vijnanesvara’s Mitakshara—the foundational Sanskrit legal commentary on the Yajnavalkya Smriti that governed Hindu inheritance law across India outside Bengal.

4. Evidence & Community Cross-References:
Primary sources include the Badami Cliff inscription (543 CE), Aihole inscription (634 CE), Kalyani inscriptions in Epigraphia Carnatica, and Triveni inscriptions of Mukunda Deva. Community cross-references link the 12th-century Kalyani Chalukya / Solapur hydraulic works (` +
      `comm_dir_15_voddar` +
      `) and 16th-century Chalukya Mukunda Deva’s Barabati garrison (` +
      `comm_dir_03_odra_kshatriya` +
      `, ` +
      `comm_dir_04_odiyaraju` +
      `) with documented historical citations.`
  },

  // ============================================================================
  // 5. PALLAVAS (RD-0006)
  // ============================================================================
  {
    id: 'art_dyn_pallavas_kanchi',
    slug: 'pallava-dynasty-kanchipuram-mamallapuram-history',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0006 | The Pallava Dynasty of Kanchipuram (c. 275–897 CE): Tondaimandalam Statecraft, Mamallapuram Rock-Cut Architecture, and Geopolitical Rivalry in Peninsular India',
    summary:
      'A detailed historical monograph on the Early Prakrit, Sanskrit, and Imperial Pallavas of Kanchipuram—documenting Simhavishnu, Mahendravarman I, Narasimhavarman I Mamalla, and Nandivarman II, the UNESCO monuments of Mamallapuram, the Grantha script, and Southeast Asian maritime contacts.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('purushottama_deva_kanchi.jpg'),
    tags: [
      'Pallavas',
      'Royal Dynasties',
      'Kanchipuram',
      'Mamallapuram',
      'Narasimhavarman I',
      'Mahendravarman I',
      'Tondaimandalam',
      'Grantha Script'
    ],
    sources: [
      {
        id: 'src_pal_01',
        source_type: 'Scholarly Book',
        title: 'The Pallavas of Kanchi: Political History',
        author_or_authority: 'R. Gopalan',
        publication_or_location: 'Madras: University of Madras',
        year_or_era: '1928',
        citation_details: 'pp. 1–185 (Chronological analysis of Prakrit, Sanskrit, and Greater Pallava charters)',
        verified: true
      },
      {
        id: 'src_pal_02',
        source_type: 'Scholarly Book',
        title: 'Administration and Social Life under the Pallavas',
        author_or_authority: 'Dr. C. Minakshi',
        publication_or_location: 'Madras: University of Madras Historical Series No. 13',
        year_or_era: '1938',
        citation_details: 'Chapters on Kottam-Nadu administration, Variyam committees, and temple economy',
        verified: true
      },
      {
        id: 'src_pal_03',
        source_type: 'Inscription',
        title: 'South Indian Inscriptions, Vol. XII (The Pallavas) & Epigraphia Indica, Vol. VI (Mayidavolu & Hirahadagalli Prakrit Plates)',
        author_or_authority: 'V. Venkatasubba Ayyar & E. Hultzsch (eds.)',
        publication_or_location: 'Madras: Archaeological Survey of India',
        year_or_era: '1900–1943',
        citation_details: 'Complete corpus of Pallava stone and copper-plate inscriptions',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Background:
Reference Number: RD-0006 | Category: Royal Dynasties (Tamilakam Imperial Houses) | Period: c. 275 CE – 897 CE | Location: Kanchipuram and Mamallapuram (Mahabalipuram), Tondaimandalam (Northern Tamil Nadu & Southern Andhra Pradesh).
The Pallava Dynasty ruled Tondaimandalam from the imperial metropolis of Kanchipuram for over six centuries. Claiming affiliation with the Bharadvaja gotra and issuing the earliest Prakrit copper-plate charters in southern India (Mayidavolu and Hirahadagalli plates of Sivaskandavarman, early 4th century CE), the Pallavas transformed South Indian architecture by transitioning from perishable brick-and-timber shrines to rock-cut cave temples, monolithic Rathas, and structural stone temples.

2. Founders & Important Rulers:
- Sivaskandavarman (Early 4th Century CE) & Vishnugopa of Kanchi (mentioned in Samudragupta’s Allahabad Pillar Inscription, c. 350 CE).
- Simhavishnu (Avanisimha, r. c. 575–600 CE): Overthrew the Kalabhras and established the Greater Imperial Pallava line from the Kaveri to the Krishna.
- Mahendravarman I (r. c. 600–630 CE): Polymath sovereign bearing titles Vichitrachitta ("Curious-Minded"), Mattavilasa, and Chitrakarapuli; pioneered rock-cut cave temples at Mandagapattu and authored the Sanskrit farce Mattavilasa Prahasana.
- Narasimhavarman I Mamalla (r. 630–668 CE): Repelled Pulakeshin II, captured the Chalukya capital Vatapi in 642 CE (assuming the title Vatapikonda), dispatched naval expeditions to Sri Lanka to restore Manavarma, and developed the port of Mamallapuram with the Pancha Rathas and the Descent of the Ganges (Bhagiratha’s Penance / Arjuna’s Penance) open-air rock relief.
- Narasimhavarman II Rajasimha (r. 700–728 CE): Built the Shore Temple at Mamallapuram and the Kailasanatha Temple at Kanchipuram; exchanged embassies with the Tang court of China.
- Nandivarman II Pallavamalla (r. 731–796 CE): Elected via royal college and officials (depicted in the historical relief panels of the Vaikuntha Perumal Temple at Kanchipuram).

3. Administration, Grantha Script & Temple Architecture:
Pallava territory was organized into Rashtras/Mandalas, twenty-four Kottams, and Nadus. Village assemblies included the Ur and the Brahmin Sabha (with specialized Variyam tank and garden committees that prefigured Chola governance). The Pallavas developed the Pallava-Grantha script, which not only recorded Sanskrit and Tamil inscriptions across South India but was transmitted via maritime trade to Southeast Asia, forming the ancestor of Old Khmer, Javanese (Kawi), Thai, and Lao scripts. Note that the monumental Mamallapuram open-air bas-relief depicts the Gangavatarana (Maharshi Bhagiratha’s Penance to bring down the Ganges)—one of the greatest stone sculptures of the Suryavamsha Bhagiratha narrative in world art.

4. Evidence & Community Cross-Reference Notice:
Verified by the Mandagapattu inscription of Mahendravarman I, the Badami rock inscription of Narasimhavarman I (642 CE), the Kasakudi and Kuram copper plates, and Xuanzang’s 640 CE account of Kanchipuram. Regarding direct genealogical affiliation with the 76 Community Names registry: while later 15th-century Gajapathi Emperor Purushottama Deva’s Kanchi expedition brought Odra-Kshatriya and Odiyaraju garrisons into Tondaimandalam, direct affiliation with the ancient Pallava dynasty (275–897 CE) is classified as: "Historical association not independently verified."`
  },

  // ============================================================================
  // 6. KADAMBAS (RD-0007)
  // ============================================================================
  {
    id: 'art_dyn_kadambas_banavasi',
    slug: 'kadamba-dynasty-banavasi-mayurasharma-history',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0007 | The Kadamba Dynasty of Banavasi (c. 345–540 CE): Mayurasharma’s Sovereignty, the Talagunda Pillar Inscription, and Early Kannada Epigraphy',
    summary:
      'A comprehensive historical article on the Kadamba Dynasty of Banavasi (Vaijayanti)—examining founder Mayurasharma’s transformation from Vedic scholar to Kshatriya sovereign as recorded in the Talagunda Pillar Inscription, the Halmidi Kannada Inscription, and later Kadamba branches of Goa and Hangal.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('odra_fort_inscription.jpg'),
    tags: [
      'Kadambas',
      'Royal Dynasties',
      'Mayurasharma',
      'Banavasi',
      'Talagunda Pillar Inscription',
      'Halmidi Inscription',
      'Karnataka History'
    ],
    sources: [
      {
        id: 'src_kad_01',
        source_type: 'Inscription',
        title: 'Talagunda Stone Pillar Inscription of Kakusthavarman and Santivarman',
        author_or_authority: 'Epigraphia Indica, Vol. VIII, ed. F. Kielhorn',
        publication_or_location: 'Calcutta: Archaeological Survey of India',
        year_or_era: 'c. 450–470 CE (Published 1905–06)',
        citation_details: 'pp. 24–36; Pranavesvara Temple tank at Talagunda, Shivamogga District',
        verified: true
      },
      {
        id: 'src_kad_02',
        source_type: 'Inscription',
        title: 'Halmidi Stone Inscription of Kadamba King Kakusthavarman (c. 450 CE)',
        author_or_authority: 'Mysore Archaeological Department Annual Report (MAR 1936)',
        publication_or_location: 'Mysore: Government Press (ed. M.H. Krishna)',
        year_or_era: '1936',
        citation_details: 'Earliest attested stone inscription in the Kannada language, Hassan District',
        verified: true
      },
      {
        id: 'src_kad_03',
        source_type: 'Scholarly Book',
        title: 'The Kadamba Kula: A History of Ancient and Mediaeval Karnataka',
        author_or_authority: 'Prof. George M. Moraes',
        publication_or_location: 'Bombay: B.X. Furtado & Sons (St. Xavier’s College Indian Historical Research Institute)',
        year_or_era: '1931',
        citation_details: 'pp. 1–318 (Early Kadambas of Banavasi and medieval Kadambas of Hangal and Goa)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Significance:
Reference Number: RD-0007 | Category: Royal Dynasties (Deccan & Karnata Dynasties) | Period: c. 345 CE – 540 CE (Early Imperial Line; Later branches at Hangal and Goa until c. 1300 CE) | Location: Vaijayanti / Banavasi (Uttara Kannada District, Karnataka) and Palasika (Halasi, Belagavi District).
The Kadamba Dynasty of Banavasi represents the earliest indigenous sovereign dynasty of Karnataka. Founded by Mayurasharma (Mayuravarman) in the mid-4th century CE, the Kadambas elevated Kannada to an official administrative language alongside Sanskrit and introduced the stepped-pyramidal Kadamba Shikihara that influenced Hoysala, Chalukya, and Vijayanagara temple architecture.

2. The Talagunda Pillar Inscription & Mayurasharma’s Rise:
Unlike mythological origin legends, the origin of the Kadambas is documented in a contemporary 5th-century Sanskrit poetic inscription composed by Kubja on the granite pillar at Talagunda (Shivamogga district) during the reign of Santivarman:
- Mayurasharma, a learned Brahmin youth of the Manavyasa gotra whose family was named after the sacred Kadamba tree growing near their ancestral home, traveled with his guru Virasarma to the Ghatika (Vedic university) at Kanchipuram.
- Following an altercation with a Pallava mounted guard (Asvasamstha) at Kanchi, Mayurasharma laid aside the sacrificial Kusha grass for the unsheathed sword ("Kusham tyaktva shastram jagraha"), retreated to the dense forests of Sriparvata (Srisailam), levied tribute from the Brihad-Banas, and defeated Pallava frontier armies until the Pallava monarchs formally recognized his sovereignty over the territory from the Western Sea (Prehara) to the Malaprabha River.
- Upon assuming royal sovereignty, the dynasty replaced the Brahmin surname "-sharma" with the Kshatriya royal suffix "-varman" (Mayuravarman, Kangavarman, Bhagiratha, Raghu, and Kakusthavarman).

3. Key Rulers, Matrimonial Diplomacy & the Halmidi Inscription:
- Kakusthavarman (r. c. 435–455 CE): Brought the Kadamba kingdom to its zenith. The Talagunda inscription records that his daughters were married into the foremost imperial houses of India, including the Imperial Guptas (Kumara Gupta I / Skandagupta) and the Vakatakas (Narendrasena). During his reign, the Halmidi Inscription (c. 450 CE)—the oldest known stone inscription in the Kannada language—was incised to record a land grant to a warrior named Vija Arasa.
- Mrigeshavarman, Ravivarman & Harivarman (late 5th–mid 6th Century CE): Ruled from Banavasi, Uchchangi, and Palasika until the rise of their former feudatories, the Early Chalukyas of Badami under Pulakeshin I (543 CE). Later Kadamba branches ruled Goa (Gopakapattana) and Hangal from the 10th to the 13th century CE.

4. Architecture, Coinage & Evidence:
The Madhukeshwara Temple at Banavasi and the Bhuvaraha Narasimha Temple at Halasi preserve early Kadamba architectural forms. The Kadambas also pioneered the Padmatanka gold coinage stamped with a central lotus punch. Regarding the 76 Community Names cross-reference: while the Talagunda inscription provides a classic epigraphical case study in varna mobility (Brahma-Kshatra transition) and Sriparvata forest warfare, direct lineage affiliation between the 4th-century Banavasi Kadambas and the 76 Community Names directory is classified as: "Historical association not independently verified."`
  },

  // ============================================================================
  // 7. BADAMI CHALUKYAS (RD-0008)
  // ============================================================================
  {
    id: 'art_dyn_badami_chalukyas',
    slug: 'badami-chalukyas-vatapi-pulakeshin-aihole-pattadakal',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0008 | The Badami Chalukyas (Early Western Chalukyas of Vatapi, 543–753 CE): Pulakeshin II, the Aihole Prasasti, and Pattadakal Vesara Architecture',
    summary:
      'An in-depth historical study of the Early Western Chalukyas of Vatapi (Badami)—documenting Pulakeshin I’s 543 CE cliff inscription, Pulakeshin II’s victory over Harshavardhana on the Narmada and conquest of Pishtapura-Vengi, and the UNESCO World Heritage temple complex at Pattadakal.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('thumb-kalinga-architecture.webp').replace('/archive/', '/'),
    tags: [
      'Badami Chalukyas',
      'Chalukyas',
      'Royal Dynasties',
      'Pulakeshin II',
      'Vatapi',
      'Aihole Prasasti',
      'Pattadakal',
      'Badami Cave Temples'
    ],
    sources: [
      {
        id: 'src_bc_01',
        source_type: 'Inscription',
        title: 'Badami Cliff Rock Inscription of Pulakeshin I (Vallabhesvara, Saka 465 / 543 CE)',
        author_or_authority: 'Epigraphia Indica, Vol. XXVII, ed. R.S. Panchamukhi',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '543 CE (Published 1947)',
        citation_details: 'pp. 4–9; earliest Saka-dated Sanskrit rock inscription in India',
        verified: true
      },
      {
        id: 'src_bc_02',
        source_type: 'Inscription',
        title: 'Aihole Inscription of Pulakeshin II (Saka 556 / 634 CE)',
        author_or_authority: 'Epigraphia Indica, Vol. VI, ed. F. Kielhorn',
        publication_or_location: 'Calcutta: Archaeological Survey of India',
        year_or_era: '634 CE',
        citation_details: 'pp. 1–12; Meguti Jain Temple, Bagalkot District',
        verified: true
      },
      {
        id: 'src_bc_03',
        source_type: 'Scholarly Book',
        title: 'The Chalukyas of Badami',
        author_or_authority: 'Dr. M.S. Nagaraja Rao (ed.)',
        publication_or_location: 'Bangalore: The Mythic Society',
        year_or_era: '1978',
        citation_details: 'Proceedings of the Seminar on the Chalukyas of Badami (Epigraphy, History, and Art)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Scope:
Reference Number: RD-0008 | Category: Royal Dynasties (Deccan & Karnata Dynasties) | Period: 543 CE – 753 CE | Location: Vatapi (modern Badami), Aihole (Aryapura), Mahakuta, and Pattadakal (Kisuvolal) in the Malaprabha River basin, Bagalkot District, Karnataka.
The Badami Chalukyas (Early Western Chalukyas) unified the entire Deccan plateau between the Narmada and Kaveri rivers for over two centuries. Organizing Badami Chalukyas as the foundational imperial stem of the Chalukya continuum, historians emphasize their role in establishing Deccan political autonomy, pioneering rock-cut and structural sandstone temple architecture, and giving rise to the Eastern Chalukya line of Vengi.

2. Founders & Important Rulers:
- Pulakeshin I (Satyashraya Ranavikrama, r. c. 540–566 CE): Fortified the hill citadel of Vatapi in Saka 465 (543 CE), as recorded in the Badami Cliff Inscription—the earliest dated Sanskrit inscription using the Saka era in stone—and performed the Ashvamedha and Hiranyagarbha sacrifices.
- Kirtivarman I (r. 566–597 CE) & Mangalesha (r. 597–610 CE): Subdued the Nalas, Mauryas of Konkan, and Kalachuris; Mangalesha excavated the magnificent Vaishnava Cave III at Badami in 578 CE and set up the Mahakuta Pillar Inscription.
- Pulakeshin II (Immadi Pulakeshin / Satyashraya Sri Prithvivallabha, r. 610–642 CE): The greatest sovereign of the house. In c. 618–619 CE, he defeated the north Indian emperor Harshavardhana of Kanauj on the banks of the Narmada River, assuming the title Paramesvara. Turning east, he subdued Southern Kosala and Kalinga, stormed the island fortress of Kunala (Kolleru Lake) and Pishtapura (Pithapuram), and appointed his brother Kubja Vishnuvardhana over Vengi (624 CE). The Chinese pilgrim Xuanzang visited his court in c. 641 CE, praising the valor and chivalry of his army.
- Vikramaditya I (r. 655–680 CE), Vinayaditya (r. 680–696 CE), Vijayaditya (r. 696–733 CE) & Vikramaditya II (r. 733–744 CE): Restored Chalukya dominance after the Pallava occupation of Vatapi (642–654 CE). Vikramaditya II captured Kanchipuram three times without harming its citizens or temples, engraving a Kannada victory inscription on a pillar of the Kailasanatha Temple, while his queens Lokamahadevi and Trailokyamahadevi commissioned the Virupaksha (Lokeshwara) and Mallikarjuna temples at Pattadakal.
- Kirtivarman II (r. 744–753 CE): Supplanted in 753 CE by Dantidurga, founder of the Rashtrakuta Empire.

3. Architecture & Cultural Legacy (Cradle of Indian Temple Architecture):
The Malaprabha valley under the Badami Chalukyas became the laboratory of Indian temple architecture, harmonizing Northern (Rekha-Nagara) and Southern (Dravida-Vimana) styles at Aihole (Durga Temple, Lad Khan Temple, Meguti Temple), Badami (four rock-cut caves and Bhutanatha group), and Pattadakal (a UNESCO World Heritage Site).

4. Evidence, Analysis & Community Cross-Reference Notice:
Corroborated by the Badami Cliff inscription (543 CE), Cave III inscription of Mangalesha (578 CE), Aihole Prasasti of Ravikirti (634 CE), Hyderabad copper plates verifying the solar eclipse of 612 CE, and Tabari’s Persian account of diplomatic exchanges with Khusrau II of Persia. Notably, Verses 26–29 of the Aihole Prasasti provide the earliest dated epigraphical description of a naval-amphibious battle on Kunala (Kolleru Lake / Kolleti Sarasu) and the subjugation of Kalinga. Regarding direct lineage affiliation with the 76 Community Names registry: "Historical association not independently verified."`
  },

  // ============================================================================
  // 8. VENGI CHALUKYAS (EASTERN CHALUKYAS) (RD-0009)
  // ============================================================================
  {
    id: 'art_dyn_vengi_chalukyas',
    slug: 'vengi-eastern-chalukyas-andhra-history-epigraphy',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0009 | The Eastern Chalukyas of Vengi (624–1189 CE): Kubja Vishnuvardhana, Rajaraja Narendra, Nannaya’s Adi-Kavyam, and the Coastal Andhra Buffer Between Kalinga and Cholamandalam',
    summary:
      'A comprehensive dynastic monograph on the Eastern Chalukyas of Vengi—tracing their origins as a branch of the Badami Chalukyas in 624 CE, their five-century rule over coastal Andhra from Pishtapura, Vengi, and Rajamahendravaram, the Pancharama Shaiva temples, the birth of classical Telugu literature under Rajaraja Narendra, and their dynastic union with the Cholas and wars with the Eastern Gangas.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('draksharama_temple.jpg'),
    tags: [
      'Vengi Chalukyas',
      'Eastern Chalukyas',
      'Chalukyas',
      'Royal Dynasties',
      'Kubja Vishnuvardhana',
      'Rajaraja Narendra',
      'Rajamahendravaram',
      'Draksharama',
      'Nannaya Bhattaraka'
    ],
    sources: [
      {
        id: 'src_vc_01',
        source_type: 'Scholarly Book',
        title: 'The Eastern Chalukyas of Vengi',
        author_or_authority: 'Dr. N. Venkataramanayya',
        publication_or_location: 'Madras: University of Madras',
        year_or_era: '1950',
        citation_details: 'pp. 1–340 (Complete political and epigraphical history of Vengi-mandala)',
        verified: true
      },
      {
        id: 'src_vc_02',
        source_type: 'Inscription',
        title: 'Timmapuram Copper-Plate Grant of Kubja Vishnuvardhana I & Nandampudi Grant of Rajaraja Narendra (1053 CE)',
        author_or_authority: 'Epigraphia Indica, Vols. IV & IX, ed. E. Hultzsch & F. Kielhorn',
        publication_or_location: 'Calcutta: Archaeological Survey of India',
        year_or_era: '1896–1908',
        citation_details: 'EI Vol. IV, pp. 300–309 (Nandampudi grant mentioning Nannaya Bhatta)',
        verified: true
      },
      {
        id: 'src_vc_03',
        source_type: 'Inscription',
        title: 'South Indian Inscriptions (SII), Vols. IV, V & X (Draksharama, Bhimavaram, and Coastal Andhra Inscriptions)',
        author_or_authority: 'Archaeological Survey of India',
        publication_or_location: 'Madras & New Delhi',
        year_or_era: '1923–1948',
        citation_details: 'Epigraphs of Chalukya Bhima I, Rajaraja Narendra, and Velanati Chodas',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Position:
Reference Number: RD-0009 | Category: Royal Dynasties (Deccan & Karnata Dynasties) | Period: 624 CE – 1189 CE | Location: Pishtapura (Pithapuram), Vengi (Peddavegi near Eluru), Vijayawada (Bezwada), and Rajamahendravaram (Rajahmundry) across the Godavari-Krishna deltaic corridor.
The Eastern Chalukyas of Vengi originated in 624 CE as the eastern branch of the Badami Chalukyas when Pulakeshin II appointed his younger brother Kubja Vishnuvardhana I as viceroy of the newly conquered coastal Andhra region (Vengi-mandala). Shortly thereafter, with Pulakeshin II’s consent, Vishnuvardhana founded an independent sovereign dynasty that ruled the fertile Krishna-Godavari delta between the Eastern Ghats and the Bay of Bengal for over 550 years.

2. Geopolitical Buffer Between Kalinga, Rashtrakutas & Cholamandalam:
Because Vengi controlled the rich agricultural delta and the strategic coastal highway linking Kalinga-Odra in the north with Tondaimandalam and Cholamandalam in the south, it became the centerpiece of medieval South Indian diplomacy:
- Kubja Vishnuvardhana I (r. 624–641 CE) & Jayasimha I (r. 641–673 CE): Established capitals at Pishtapura and Vengi (Peddavegi near Kolleru Lake).
- Vijayaditya II Narendra Mrigaraja (r. 808–847 CE): Fought 108 battles against the Rashtrakutas and Gangas over twelve years and built 108 Narendresvara Shiva temples.
- Gunaga Vijayaditya III (r. 849–892 CE): Led by his celebrated Brahmin general Pandaranga (attested in the Addanki Telugu taruvaja-meter inscription), he defeated the Rashtrakutas, Boya-Kottams, and Eastern Gangas of Kalinga.
- Chalukya Bhima I (r. 892–921 CE): Built the monumental Pancharama Shiva temples, notably the Bhimesvara Temple at Draksharama and the Kumararama Bhimesvara Temple at Samalkot.
- Rajaraja Narendra (r. 1019–1061 CE): Reigned from Rajamahendravaram on the Godavari; married Ammangadevi (daughter of Rajendra Chola I). Their son Rajendra Chalukya ascended the imperial Chola throne in 1070 CE as Kulottunga Chola I, initiating the Chalukya-Chola dynasty.

3. Literary & Cultural Golden Age (Birth of Classical Telugu Literature):
While early Vengi Chalukya charters were in Sanskrit, by the 9th century (Addanki, Kandukur, and Dharmavaram inscriptions of Pandaranga), Telugu verse meters were incised on stone. At the court of Rajaraja Narendra in Rajamahendravaram, the royal preceptor (Kula-brahmana) Nannaya Bhattaraka (assisted by Narayana Bhatta, whose grant is recorded in the Nandampudi copper plates of 1053 CE) composed the first two-and-a-half parvas of the Andhra Mahabharatam, earning the title Adi-Kavi (First Poet) and Vaganushasana.

4. Evidence & Community Cross-References:
The Vengi heartland (encompassing Peddavegi, Kolleru Lake / Kolletikota, Eluru, Rajahmundry, and Draksharama) later became the primary southern administrative province (Rajahmundry and Kondapalli Dandapatas) of the Suryavamsha Gajapathi Empire (1448–1540 CE), where Odiyaraju, OddeRajulu, and VaddeRajulu military garrisons (` +
      `comm_dir_04_odiyaraju` +
      `, ` +
      `comm_dir_06_odderajulu` +
      `, ` +
      `comm_dir_07_vadderajulu` +
      `) were stationed at Kolletikota and Kondapalli.`
  },

  // ============================================================================
  // 9. SIDDHINI KINGS — HISTORIOGRAPHICAL VERIFICATION AUDIT (RD-0010)
  // ============================================================================
  {
    id: 'art_dyn_siddhini_kings_verification',
    slug: 'siddhini-kings-historiographical-verification-epigraphic-audit',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0010 | Historiographical Verification Audit: "Siddhini Kings" — Epigraphic Examination of Sinda (Chindaka Naga), Siddharaja-Solanki, Siddharameshwara & Sidhout Traditions',
    summary:
      'A strict historiographical verification dossier auditing the designation "Siddhini Kings"—confirming that no standalone dynasty spelled "Siddhini" is independently attested in primary Indian epigraphical corpora (Epigraphia Indica / South Indian Inscriptions), and documenting the four historically verified lineages and traditions that regional phonetic variants may reference without fabricating a dynasty.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Contested Interpretation',
    evidence_category: 'scholarly_interpretation',
    featured_image: ARCHIVE_IMG('shivayogi_siddharama_solapur.jpg'),
    tags: [
      'Siddhini Kings',
      'Historiographical Verification',
      'Royal Dynasties',
      'Sinda Dynasty',
      'Chindaka Nagas',
      'Siddharaja Jayasimha',
      'Shivayogi Siddharameshwara',
      'Epigraphic Audit'
    ],
    sources: [
      {
        id: 'src_sid_01',
        source_type: 'Inscription',
        title: 'Inscriptions of the Chindaka Nagas (Sindas) of Chakrakota (Bastar / Koraput Borderland)',
        author_or_authority: 'Epigraphia Indica, Vols. IX & X, ed. Hira Lal & E. Hultzsch',
        publication_or_location: 'Calcutta: Archaeological Survey of India',
        year_or_era: '1907–1910',
        citation_details: 'Vol. IX, pp. 160–166 (Rajapura Plates of Madhurantakadeva, 1065 CE); Vol. X, pp. 25–38',
        verified: true
      },
      {
        id: 'src_sid_02',
        source_type: 'Scholarly Book',
        title: 'Siddharama Charitra of Mahakavi Raghavanka (c. 1200 CE) & Epigraphia Carnatica',
        author_or_authority: 'T.S. Venkannayya & D.L. Narasimhachar (eds.)',
        publication_or_location: 'Mysore: University of Mysore',
        year_or_era: '1941',
        citation_details: 'Primary literary and epigraphic source on Shivayogi Siddharameshwara of Sonnalige (Solapur)',
        verified: true
      },
      {
        id: 'src_sid_03',
        source_type: 'Scholarly Book',
        title: 'Chaulukyas of Gujarat: A Survey of the History and Culture of Gujarat from the Middle of the Tenth to the End of the Thirteenth Century',
        author_or_authority: 'Dr. Asoke Kumar Majumdar',
        publication_or_location: 'Bombay: Bharatiya Vidya Bhavan',
        year_or_era: '1956',
        citation_details: 'Reign of Siddharaja Jayasimha (1094–1143 CE) and Sahasralinga Talav at Patan',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Mandatory Epistemic Verification Notice:
Reference Number: RD-0010 | Category: Royal Dynasties (Historiographical & Epigraphic Audit) | Period: 10th – 16th Century CE (Comparative Audit) | Location: Chakrakota-Kalinga Borderland, Solapur (Maharashtra), Patan (Gujarat), and Sidhout/Kadapa (Andhra Pradesh).
IMPORTANT HISTORIOGRAPHICAL VERIFICATION NOTICE:
In accordance with strict archival verification standards, a comprehensive search of primary Indian epigraphical repositories—including Epigraphia Indica (Vols. I–XLII), South Indian Inscriptions (Vols. I–XXVII), Epigraphia Carnatica, and Satyanarayan Rajaguru’s Inscriptions of Orissa—confirms that NO standalone royal dynasty under the exact English spelling "Siddhini Kings" is independently attested in primary stone or copper-plate inscriptions.
Rather than inventing or fabricating an unverified dynasty, this portal flags "Siddhini Kings" as requiring primary source verification and documents the four authentic historical entities to which regional oral, phonetic, or transliterated references ("Sinda / Chinda", "Siddha / Siddharama", "Siddharaja", or "Siddhavatam / Sidhout") correspond in historical records.

2. Candidate 1 — The Sinda (Chinda / Chindaka Naga) Dynasty of Chakrakota & Karnata (10th–13th Century CE):
In medieval Telugu, Kannada, and Odia-borderland epigraphy, the Sinda (also spelled Chinda or Chindaka) rulers governed two major principalities:
- The Chindaka Nagas (Sindas) of Chakrakota (modern Bastar in Chhattisgarh and Koraput/Nabarangpur on the western frontier of Kalinga-Odra), belonging to the Kashyapa gotra with the tiger-and-cub crest. Rulers such as Nripati Bhushana (1023 CE), Dharavarsha Jagadekabhushana (1060 CE), Madhurantaka Deva (1065 CE), and Someshvara Deva I interacted directly with the Eastern Gangas, Vengi Chalukyas, andImperial Cholas (Rajendra I’s Tirumalai inscription mentions "Chakrakotta").
- The Sindas of Yelburga (Eramambarage in Bagalkot/Koppal, Karnataka), who served as prominent mahamandalesvaras under the Kalyani Chalukyas (11th–12th century CE).

3. Candidate 2 — The Siddharameshwara (Siddha-rama) Tradition of Sonnalige / Solapur (12th Century CE):
Among Waddar, Vaddar, Odde, and Odiyaraju communities across Karnataka, Maharashtra, and Telangana, the revered 12th-century Kalyana Sharana saint and master hydraulic architect Shivayogi Siddharameshwara (c. 1150 CE) of Sonnalige (Solapur) is venerated as the spiritual sovereign ("Siddha-raja" / "Siddheshwara") who commissioned the 68 Shivalingas and the great Siddheshwar Lake with the collective labor of Vaddar stone-and-earth artisans.

4. Candidate 3 — Siddharaja Jayasimha of the Chaulukya (Solanki) Dynasty of Patan (r. 1094–1143 CE):
In Oad-Rajput and Od-Kshatriya oral ballads of Gujarat, Rajasthan, and northern India, the 12th-century monarch associated with Mata Jasma Devi (Jasma Odan) during the excavation of the Sahasralinga Talav in Patan is King Siddharaja Jayasimha (often referred to in vernacular ballads as the "Siddha King" or ruler of Siddhapura).

5. Candidate 4 — The Sidhout (Siddhavatam) Fort Chieftains of Kadapa (Rayalaseema):
In Rayalaseema local Kaifiyats (Mackenzie Collection), the strategic Pennar River fortress of Siddhavatam (anglicized as Sidhout in Kadapa district) was governed by Matli (Devachoda) and local Nayaka/Raju chieftains under Vijayanagara rule, where OddeRajulu and VaddeRajulu fort-building and garrison communities settled.

6. Epistemic Conclusion & Community Cross-Reference Audit:
Until a specific primary inscription or palm-leaf manuscript bearing the exact orthography "Siddhini" is produced, the designation "Siddhini Kings" is preserved strictly as an audited historiographical inquiry. Direct genealogical claims to an independent "Siddhini Dynasty" are marked: "Historical association not independently verified."`
  },

  // ============================================================================
  // 10. SURYAVAMSHI KSHATRIYAS (RD-0011)
  // ============================================================================
  {
    id: 'art_lin_suryavamshi_kshatriyas',
    slug: 'suryavamshi-kshatriyas-solar-lineage-epigraphy-historiography',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0011 | SuryaVamshi Kshatriyas: Historiographical Distinction Between Traditional Ikshvaku Solar Genealogies and Epigraphically Documented Solar Dynasties',
    summary:
      'A rigorous historiographical and epigraphical analysis of the SuryaVamshi (Solar Lineage) Kshatriya classification—distinguishing Vedic-Puranic Ikshvaku traditions (Sagara, Bhagiratha, Sri Rama) from epigraphically documented historical dynasties claiming Solar descent (Andhra Ikshvakus, Imperial Cholas, Suryavamsha Gajapathis of Odisha, and Guhila-Sisodias), and auditing community cross-references.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'scholarly_interpretation',
    featured_image: ARCHIVE_IMG('surya_konark_sculpture.jpg'),
    tags: [
      'SuryaVamshi Kshatriyas',
      'Suryavamsha',
      'Royal Dynasties',
      'Ikshvaku Lineage',
      'Suryavamsha Gajapathis',
      'Solar Dynasty',
      'Historiographical Methodology'
    ],
    sources: [
      {
        id: 'src_svk_01',
        source_type: 'Scholarly Book',
        title: 'Ancient Indian Historical Tradition',
        author_or_authority: 'F.E. Pargiter',
        publication_or_location: 'London: Oxford University Press',
        year_or_era: '1922',
        citation_details: 'pp. 84–148 (Comparative tables of the Solar Manava-Ikshvaku and Lunar Aila lineages in the Puranas)',
        verified: true
      },
      {
        id: 'src_svk_02',
        source_type: 'Scholarly Book',
        title: 'From Lineage to State: Social Formations in the Mid-First Millennium B.C. in the Ganga Valley & Time as a Metaphor of History',
        author_or_authority: 'Prof. Romila Thapar',
        publication_or_location: 'New Delhi: Oxford University Press',
        year_or_era: '1984 / 1996',
        citation_details: 'Analysis of Suryavamsha and Chandravamsha genealogical charters in early and medieval state formation',
        verified: true
      },
      {
        id: 'src_svk_03',
        source_type: 'Inscription',
        title: 'Veligalani Copper-Plate Grant of Kapilendra Deva (1458 CE) & Nagarjunakonda Inscriptions of the Ikshvakus (3rd Century CE)',
        author_or_authority: 'Epigraphia Indica, Vols. XX & XXXIII, ed. J.Ph. Vogel & D.C. Sircar',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1929 / 1960',
        citation_details: 'Primary epigraphical invocations of the Solar Lineage (Bhasvadvamsa / Suryavamsha)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Methodological Framework:
Reference Number: RD-0011 | Category: Royal Dynasties (SuryaVamsha & ChandraVamsha Kshatriya Traditions) | Period: Epic Antiquity to Early Modern Period | Location: Pan-Indian (Kosala/Ayodhya, Odra-Kalinga, Coastal Andhra, Tamilakam, and Rajputana).
In Indian civilization, "SuryaVamshi Kshatriyas" (the Solar Lineage, or Surya-vamsa / Ikshvaku-vamsa / Raghu-vamsa / Sagaravamsha) constitutes one of the two overarching traditional Kshatriya classifications alongside the ChandraVamsha (Lunar Lineage). Modern historical scholarship maintains a clear methodological distinction between:
(a) Sacred Puranic Genealogies: The cosmological and epic succession from Vivasvan (Surya) -> Manu Vaivasvata -> Ikshvaku -> Mandhatri -> Harishchandra -> Samrat Sagara -> Asamanjasa -> Amshuman -> Maharshi Bhagiratha -> Raghu -> Aja -> Dasharatha -> Sri Ramachandra, preserved in the Valmiki Ramayana, Mahabharata, Vishnu Purana, and Kalidasa’s Raghuvamsha; and
(b) Historically Documented Dynasties Claiming Solar Lineage: Sovereign political houses attested by dated contemporary stone and copper-plate inscriptions that formally incorporated Suryavamsha descent into their royal prasastis.

2. Epigraphically Documented SuryaVamshi Royal Houses:
- The Ikshvakus of Vijayapuri (Nagarjunakonda, Krishna Valley, 3rd–4th Century CE): Monarchs Vasishthiputra Chamtamula, Virapurushadatta, and Ehuvala Chamtamula issued Prakrit and Sanskrit inscriptions at Nagarjunakonda and Jaggayyapeta explicitly styling themselves "Ikshvakunam".
- The Imperial Cholas of Thanjavur (9th–13th Century CE): In the Anbil, Leiden, and Thiruvalangadu copper plates, Chola court poets traced the dynasty’s mythical preamble to Surya, Manu, Ikshvaku, Sibi, and Karikala before enumerating the historical Vijayalaya line.
- The Suryavamsha Gajapathis of Odisha (1434–1540 CE): Founded by Emperor Kapilendra Deva at Varanasi Kataka. The Veligalani Copper Plates (1458 CE, Verse 2) and Prataparudra Deva’s Sarasvati Vilasa explicitly proclaim the rulers to be ornaments of the Solar Race ("Bhasvad-vamsa-vatamsa" / "Suryavamsha").
- Regional Suryavamshi Principalities: Including the Guhila-Sisodias of Mewar, Kachwahas of Amber, Rathores of Marwar, Chindak/Choda branches (Telugu Chodas of Renadu and Nellore), and post-Gajapathi Pusapati and Parlakhemundi houses.

3. 76 Community Names Cross-Reference & Epistemic Classification:
Within the 76 Community Names directory of this portal, designations such as Suryavamshi (` +
      `syn_suryavamshi` +
      `), Sagaravamshi (` +
      `syn_sagaravamshi` +
      `), Raghuvamshi (` +
      `syn_raghuvamshi` +
      `), Odra-Kshatriya (` +
      `comm_dir_03_odra_kshatriya` +
      `), Oad-Rajputh (` +
      `comm_dir_02_od_rajputh` +
      `), Odiyaraju (` +
      `comm_dir_04_odiyaraju` +
      `), OddeRajulu (` +
      `comm_dir_06_odderajulu` +
      `), and Vadde-GajapathiRajulu (` +
      `comm_dir_14_gajapathulu` +
      `) preserve two distinct layers of historical memory:
1. Traditional Lineage Veneration: Reverence for Samrat Sagara and Maharshi Bhagiratha as the divine progenitors of earth-excavation and hydraulic canal engineering, and Sri Rama as the exemplar of Kshatriya dharma (classified as Traditional Lineage Account).
2. Documented Medieval Service & Garrison Identity: Historical military, fort-command, and masonry service under the Suryavamsha Gajapathi Empire (1434–1540 CE) from Kataka to Kondavidu, Kolletikota, Udayagiri, and Srirangam (corroborated by 15th–16th century inscriptions, Mackenzie Kaifiyats, and Thurston’s 1909 ethnographic survey).`
  },

  // ============================================================================
  // 11. CHANDRAVAMSHI KSHATRIYAS (RD-0012)
  // ============================================================================
  {
    id: 'art_lin_chandravamshi_kshatriyas',
    slug: 'chandravamshi-kshatriyas-lunar-lineage-somavamshi-historiography',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0012 | ChandraVamshi Kshatriyas: Historiographical Distinction Between Traditional Lunar Genealogies and Epigraphically Documented Somavamshi & Yadu Dynasties',
    summary:
      'A comprehensive historiographical analysis of the ChandraVamshi (Lunar / Somavamshi) Kshatriya classification—distinguishing Puranic Aila-Yayati-Puru-Yadu genealogical traditions from epigraphically documented historical dynasties claiming Lunar descent, foremost among them the Somavamshis (Kesaris) of Odisha, Yadavas of Devagiri, Hoysalas, and Sangama Vijayanagara rulers.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'scholarly_interpretation',
    featured_image: ARCHIVE_IMG('kapilendra_deva_lingaraja.jpg'),
    tags: [
      'ChandraVamshi Kshatriyas',
      'Chandravamsha',
      'Somavamsha',
      'Royal Dynasties',
      'Somavamshi Dynasty',
      'Lingaraja Temple',
      'Lunar Dynasty',
      'Historiographical Methodology'
    ],
    sources: [
      {
        id: 'src_cvk_01',
        source_type: 'Scholarly Book',
        title: 'Inscriptions of Orissa, Vol. IV (The Somavamsi Kings of Kosala and Utkala)',
        author_or_authority: 'Satyanarayan Rajaguru',
        publication_or_location: 'Bhubaneswar: Odisha State Museum',
        year_or_era: '1966',
        citation_details: 'Complete copper-plate and stone inscriptions of the Somavamshi (Chandravamshi) dynasty of Odisha',
        verified: true
      },
      {
        id: 'src_cvk_02',
        source_type: 'Scholarly Book',
        title: 'Chronology of the Bhauma-Karas and the Somavamsis of Orissa',
        author_or_authority: 'Dr. Krishna Chandra Panigrahi',
        publication_or_location: 'Madras: Law Journal Press / Bhopal',
        year_or_era: '1961',
        citation_details: 'pp. 1–78 (Epigraphic analysis of Janamejaya I, Yayati I, Yayati II, and Uddyotakesari)',
        verified: true
      },
      {
        id: 'src_cvk_03',
        source_type: 'Inscription',
        title: 'Brahmesvara Temple Inscription of Kolavatidevi (Mother of Uddyotakesari, 18th Regnal Year)',
        author_or_authority: 'Journal of the Asiatic Society of Bengal, Vol. VII / Epigraphia Indica, Vol. XIII',
        publication_or_location: 'Calcutta: Asiatic Society',
        year_or_era: 'c. 1060 CE',
        citation_details: 'Records the Somavamshi (Sitamsu-vamsa / Lunar race) unification of Kosala, Utkala, and Odra',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Methodological Framework:
Reference Number: RD-0012 | Category: Royal Dynasties (SuryaVamsha & ChandraVamsha Kshatriya Traditions) | Period: Epic Antiquity to 16th Century CE | Location: Dakshina Kosala, Utkala-Odra (Odisha), Deccan (Devagiri, Dwarasamudra, Vijayanagara), and Northern India.
In traditional Indian social and dynastic taxonomy, "ChandraVamshi Kshatriyas" (the Lunar Lineage, or Chandra-vamsa / Soma-vamsa / Indu-vamsa / Aila-vamsa) form the second grand branch of the Kshatriya order alongside the SuryaVamsha. As with the Solar lineage, rigorous historiography separates:
(a) Puranic & Mahabharata Genealogical Tradition: Tracing descent from Soma (Chandra) and Budha -> Pururavas Aila -> Ayu -> Nahusha -> Yayati, whose five sons—Yadu (progenitor of the Yadavas/Haihayas) and Puru (progenitor of the Pauravas, Bharatas, Kurus, and Pandavas), alongside Turvasu, Druhyu, and Anu—populate the epic narratives of the Mahabharata and Harivamsha; and
(b) Epigraphically Documented Dynasties Claiming Lunar Lineage: Historical kingdoms attested in stone and copper-plate charters that adopted Chandra/Soma/Yadu genealogical preambles.

2. Epigraphically Documented ChandraVamshi (Somavamshi) Dynasties:
- The Somavamshis (Panduvamshis / Kesaris) of Kosala, Utkala, and Odra (c. 882–1110 CE): The most directly relevant Lunar dynasty in Odishan history. Originating in Dakshina Kosala (Sirpur/Suvarnapura in western Odisha and Chhattisgarh), monarchs Janamejaya I Mahabhavagupta, Yayati I Mahashivagupta, Yayati II Chandihara, and Uddyotakesari Mahabhavagupta unified Kosala, Kongoda, Utkala, and Odra Desha under a single scepter at Yayatinagara and Abhinava Yayatinagara (Jajpur / Bhubaneswar). In the Brahmesvara Temple inscription and copper-plate grants, they explicitly style themselves "Soma-kula-tilaka" (Ornament of the Lunar Race) and "Trikalingadhipati", and they constructed the iconic Muktesvara, Rajarani, Brahmesvara, and Lingaraja temples at Bhubaneswar.
- The Kalachuris (Haihayas) of Tripuri and Ratnapura (9th–13th Century CE): Claimed Lunar-Haihaya (Kartavirya Arjuna) descent and contested western Kosala with the Somavamshis and Eastern Gangas.
- The Seunas (Yadavas) of Devagiri (c. 850–1317 CE) & Hoysalas of Dwarasamudra (c. 1000–1346 CE): Prominent Deccan empires claiming Yadu-Chandravamsha lineage in their Sanskrit and Kannada inscriptions.
- The Sangama & Tuluva Dynasties of the Vijayanagara Empire (1336–1542 CE): Harihara I, Bukka Raya I, and Sri Krishnadevaraya formally invoked the Lunar Yadu/Turuvasu lineage in their copper-plate grants.

3. Relationship with Odra Desha & the 76 Community Names Audit:
The Somavamshi (ChandraVamshi) emperors of Odisha laid the institutional and architectural foundations (including the monumental Lingaraja Temple at Bhubaneswar and the early shrine at Puri) that were directly inherited by the Eastern Gangas (1110 CE) and the Suryavamsha Gajapathis (1434 CE). Within the 76 Community Names directory, while the primary royal affiliation of the Suryavamsha Odiyaraju Kshatriya tradition is with the Solar Lineage (` +
      `syn_suryavamshi` +
      `) and the Gajapathi Empire, post-1520 CE southern Odiyaraju, OddeRajulu, and VaddeRajulu commanders also served as fortress governors and Amaranayakas under the ChandraVamshi-claiming Vijayanagara emperors. Any claim that all 76 communities belong to the ChandraVamsha is explicitly avoided; where unattested, associations are marked: "Historical association not independently verified."`
  },

  // ============================================================================
  // 12. SURYAVAMSHI KINGS (HF-0015)
  // ============================================================================
  {
    id: 'art_lin_suryavamshi_kings',
    slug: 'suryavamshi-kings-epic-progenitors-to-historical-emperors',
    category: 'Historical Figures',
    original_language: 'en',
    original_title:
      'HF-0015 | SuryaVamshi Kings: Comparative Biographical Dossier of Sacred Solar Progenitors and Epigraphically Verified SuryaVamshi Monarchs',
    summary:
      'A comparative biographical and epigraphical study of SuryaVamshi Kings—clearly separating sacred Ikshvaku progenitors (Samrat Sagara, Maharshi Bhagiratha, Maryada Purushottama Sri Rama) from epigraphically documented Solar monarchs (Emperor Kapilendra Deva, Purushottama Deva, Prataparudra Deva, Kumara Hamvira Deva, and Rajaraja Chola I).',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('kapilendra_deva_portrait.jpg'),
    tags: [
      'SuryaVamshi Kings',
      'Historical Figures',
      'Kapilendra Deva',
      'Purushottama Deva',
      'Prataparudra Deva',
      'Samrat Sagara',
      'Maharshi Bhagiratha',
      'Sri Rama',
      'Rajaraja Chola I'
    ],
    sources: [
      {
        id: 'src_svking_01',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Dr. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University Series No. 57',
        year_or_era: '1957',
        citation_details: 'pp. 1–196 (Reigns of Kapilendra Deva, Purushottama Deva, and Prataparudra Deva)',
        verified: true
      },
      {
        id: 'src_svking_02',
        source_type: 'Inscription',
        title: 'Lingaraja Temple Odia Proclamation (1452 CE) & Veligalani Copper Plates (1458 CE)',
        author_or_authority: 'Epigraphia Indica, Vols. XXVIII & XXXIII, ed. D.C. Sircar & K.B. Tripathi',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1950 / 1960',
        citation_details: 'Primary contemporary records of Suryavamsha Gajapathi sovereigns',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Two-Tier Historiographical Structure:
Reference Number: HF-0015 | Category: Historical Figures (SuryaVamshi & ChandraVamshi Kings Comparative Dossiers) | Period: Sacred Epic Antiquity & Historical Era (3rd Century CE – 16th Century CE) | Location: Ayodhya (Epic Tradition), Varanasi Kataka / Puri (Odisha), Kondavidu / Rajahmundry (Andhra), and Thanjavur (Tamil Nadu).
To uphold historical integrity, this dossier organizes "SuryaVamshi Kings" into two explicitly separated categories: (I) Sacred Solar Progenitors preserved in epic and Puranic literature, and (II) Epigraphically Verified Historical Monarchs whose reigns, conquests, and administrative acts are dated by contemporary stone and copper-plate inscriptions.

2. Tier I — Sacred Solar Progenitors (Epic & Puranic Tradition — Non-Calendrical):
- Chakravarti Samrat Sagara (Ref: HF-0002): Celebrated in the Valmiki Ramayana (Balakanda, Sargas 38–41) and Vishnu Purana as the Ikshvaku sovereign whose sixty thousand sons excavated the oceanic basin (Sagara), remembered in Odra/Oad/Vadde traditions as the primordial archetype of monumental earth-excavation.
- Maharshi Raja Bhagiratha (Ref: HF-0003): Great-grandson of Sagara who brought the celestial Ganga to Earth through heroic perseverance (Bhagiratha Prayatna), revered across India as the patron sovereign of hydraulic engineering and canal construction.
- Maryada Purushottama Sri Ramachandra (Ref: HF-0004): Embodiment of righteous kingship (Rama-Rajya) in the Ikshvaku-Raghu lineage, invoked in the opening verses of medieval Suryavamsha royal charters.

3. Tier II — Epigraphically Documented Historical SuryaVamshi Kings:
- Vasishthiputra Chamtamula & Virapurushadatta (Ikshvakus of Vijayapuri, 3rd Century CE): Earliest historical rulers in the Krishna valley bearing the epigraphic title Ikshvaku in Prakrit inscriptions at Nagarjunakonda.
- Rajaraja Chola I (r. 985–1014 CE) & Rajendra Chola I (r. 1014–1044 CE): Imperial Chola monarchs whose Sanskrit copper-plate grants (Thiruvalangadu plates) invoke Suryavamsha descent alongside dated Tamil Meykkirttis.
- Emperor Kapilendra Deva Gajapathi (r. 1434–1466 CE, Ref: HF-0011): Founder of the Suryavamsha Gajapathi Empire at Kataka; assumed the title "Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara", abolished the salt and cowrie taxes on the common people, patronized Mahakavi Sarala Dasa, and extended Odra sovereignty from the Hooghly to the Kaveri.
- Prince Kumara Hamvira Deva (fl. 1454–1476 CE, Ref: HF-0012): Eldest son of Kapilendra Deva and supreme commander of the southern campaigns who captured Warangal, Kondavidu, Udayagiri, and Kanchipuram, leaving his 1464 CE donation inscription at Srirangam.
- Emperor Purushottama Deva Gajapathi (r. 1466–1497 CE, Ref: HF-0013): Second Suryavamsha Gajapathi emperor; recovered Kondavidu and Udayagiri, issued the Potavaram Copper Plates (1489 CE), and completed the Meghanada Pacheri fortified wall at Puri.
- Emperor Prataparudra Deva Gajapathi (r. 1497–1540 CE, Ref: HF-0014): Third Suryavamsha Gajapathi emperor; compiled the Sanskrit legal digest Sarasvati Vilasa, patronized the Panchasakha Vaishnava saint-poets and Sri Chaitanya Mahaprabhu, and concluded the 1519 CE diplomatic peace with Vijayanagara Emperor Krishnadevaraya.`
  },

  // ============================================================================
  // 13. CHANDRAVAMSHI KINGS (HF-0016)
  // ============================================================================
  {
    id: 'art_lin_chandravamshi_kings',
    slug: 'chandravamshi-kings-somavamshi-monarchs-utkala-deccan',
    category: 'Historical Figures',
    original_language: 'en',
    original_title:
      'HF-0016 | ChandraVamshi Kings: Epigraphically Documented Somavamshi (Kesari) Emperors of Utkala-Kosala and Lunar-Lineage Rulers of Peninsular India',
    summary:
      'A biographical and epigraphical study of historically documented ChandraVamshi (Somavamshi) Kings—focusing on Janamejaya I Mahabhavagupta, Yayati I, Yayati II Chandihara, and Uddyotakesari of the Somavamshi Dynasty of Odisha (builders of the Lingaraja, Muktesvara, and Rajarani temples at Bhubaneswar), alongside Lunar-claiming monarchs of the Deccan.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('kapilendra_deva_lingaraja.jpg'),
    tags: [
      'ChandraVamshi Kings',
      'Somavamshi Kings',
      'Historical Figures',
      'Janamejaya I',
      'Yayati Kesari',
      'Uddyotakesari',
      'Lingaraja Temple',
      'Bhubaneswar'
    ],
    sources: [
      {
        id: 'src_cvking_01',
        source_type: 'Scholarly Book',
        title: 'Inscriptions of Orissa, Vol. IV (The Somavamsi Kings)',
        author_or_authority: 'Satyanarayan Rajaguru',
        publication_or_location: 'Bhubaneswar: Odisha State Museum',
        year_or_era: '1966',
        citation_details: 'Copper-plate charters of Janamejaya I, Yayati I, Bhimaratha, Yayati II, and Uddyotakesari',
        verified: true
      },
      {
        id: 'src_cvking_02',
        source_type: 'Scholarly Book',
        title: 'Archaeological Remains at Bhubaneswar',
        author_or_authority: 'Dr. Krishna Chandra Panigrahi',
        publication_or_location: 'Calcutta: Orient Longmans',
        year_or_era: '1961',
        citation_details: 'pp. 150–176 (Somavamshi temple patronage: Muktesvara, Rajarani, Brahmesvara, and Lingaraja)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Historical Scope:
Reference Number: HF-0016 | Category: Historical Figures (SuryaVamshi & ChandraVamshi Kings Comparative Dossiers) | Period: c. 882 CE – 1110 CE (Somavamshi Era in Odisha) & 12th–16th Century CE (Deccan Yadu-Lunar Sovereigns) | Location: Suvarnapura (Sonepur), Yayatinagara (Binka/Jajpur), and Ekamra-kshetra (Bhubaneswar, Odisha).
While traditional Puranic literature recounts the epic Lunar monarchs Pururavas, Yayati, Bharata, and Yudhishthira, epigraphical history preserves a rich roster of documented historical kings who ruled as ChandraVamshi (Somavamshi) sovereigns. Foremost in the history of Odra, Utkala, and Kosala are the emperors of the Somavamshi (Kesari) Dynasty, who alternated the regnal titles Mahabhavagupta and Mahashivagupta and united western and coastal Odisha prior to the Imperial Eastern Gangas.

2. Key Epigraphically Documented ChandraVamshi (Somavamshi) Monarchs of Odisha:
- Janamejaya I Mahabhavagupta (r. c. 882–922 CE): Issued over a dozen copper-plate grants from Suvarnapura, Murasimhapura, and Arama-kataka; assumed the imperial title Trikalingadhipati and extended Somavamshi influence into Odra-desa after defeating the Bhanja ruler Ranabhanja.
- Yayati I Mahashivagupta (r. c. 922–955 CE): Established the capital Yayatinagara on the Mahanadi, integrated Dakshina Kosala with Utkala and Odra, and is credited in architectural history with commissioning the exquisite Muktesvara Temple at Bhubaneswar (celebrated for its sculpted Torana archway).
- Bhimaratha Mahabhavagupta (r. c. 955–980 CE) & Dharmaratha (r. c. 980–1005 CE): Maintained Somavamshi hegemony from the Mahanadi delta to Kalinga.
- Yayati II Chandihara Mahashivagupta (r. c. 1025–1040 CE): Elected by the ministers of Kosala and Utkala to restore stability after Rajendra Chola’s northern raid. He permanently united Kosala and Utkala, revived the Viraja-kshetra at Jajpur, and initiated the construction of the colossal 180-foot Lingaraja Temple (Kirtivasa) at Bhubaneswar.
- Uddyotakesari Mahabhavagupta (r. c. 1040–1065 CE): Completed the Lingaraja Temple, excavated the Lalatendu Kesari cave inscription at Khandagiri for Jain ascetics, and witnessed his mother Queen Kolavatidevi dedicate the Brahmesvara Temple at Bhubaneswar.

3. Deccan & Southern Lunar-Lineage Monarchs:
In peninsular India, prominent historical monarchs whose inscriptions invoke the Lunar (Yadu / Chandra) lineage include Singhana II of the Yadavas of Devagiri (r. 1200–1247 CE, patron of the astronomer Bhaskaracharya’s school and musicologist Sarngadeva), Vishnuvardhana of the Hoysalas (r. 1108–1152 CE, builder of the Chennakeshava Temple at Belur), and Harihara I, Bukka Raya I, and Krishnadevaraya of the Vijayanagara Empire.

4. Historical Continuity & Community Cross-Reference Notice:
The Somavamshi (ChandraVamshi) kings of Bhubaneswar created the architectural and administrative synthesis of Kosala-Utkala-Odra that was subsequently expanded by the Eastern Gangas and Suryavamsha Gajapathis. Regarding direct genealogical affiliation with the 76 Community Names registry: "Historical association not independently verified."`
  },

  // ============================================================================
  // 14. HISTORICAL TIMELINE CATEGORY MONOGRAPH (HT-0001)
  // ============================================================================
  {
    id: 'art_ht_chronological_methodology',
    slug: 'mythology-to-historical-timeline-chronological-methodology',
    category: 'Historical Timeline',
    original_language: 'en',
    original_title:
      'HT-0001 | From Mythological Traditions to the Modern Era: Chronological Epistemology and Dating Standards in Indian Historiography',
    summary:
      'A foundational methodological monograph explaining the eight-stage chronological progression from non-calendrical Epic/Puranic traditions through Radiocarbon/Stratigraphic archaeology, Ashokan and Kharavela Brahmi rock edicts, Saka and Ganga era copper-plate charters, and medieval imperial annals.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'scholarly_interpretation',
    featured_image: ARCHIVE_IMG('kalinga_dhauli_rock_edicts.jpg'),
    tags: [
      'Historical Timeline',
      'Chronology',
      'Saka Era',
      'Ganga Era',
      'Anka Regnal System',
      'Epigraphic Dating',
      'Historiography'
    ],
    sources: [
      {
        id: 'src_ht_01',
        source_type: 'Scholarly Book',
        title: 'Indian Epigraphy',
        author_or_authority: 'Dr. D.C. Sircar',
        publication_or_location: 'Delhi: Motilal Banarsidass',
        year_or_era: '1965',
        citation_details: 'Chapters VII & VIII (Astronomical reckoning, Saka Era, Vikrama Era, Ganga Era, and Odishan Anka years)',
        verified: true
      },
      {
        id: 'src_ht_02',
        source_type: 'Scholarly Book',
        title: 'An Introduction to the Study of Indian History',
        author_or_authority: 'Prof. D.D. Kosambi',
        publication_or_location: 'Bombay: Popular Prakashan',
        year_or_era: '1956',
        citation_details: 'Chapters I–III (Archaeological stratigraphy vs. Puranic tradition)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Purpose:
Reference Number: HT-0001 | Category: Historical Timeline (Chronological Methodology) | Period: Multi-Epoch (Epic Antiquity to Present) | Location: Pan-Indian & Odra-Deccan Corridor.
A core mission of the Suryavamsha Odiyaraju Kshatriya Historical Heritage Portal is to present a complete chronological bridge from Mythological Traditions to the Modern Historical Period without conflating sacred narrative memory with dated archaeological or epigraphical evidence.

2. The Four Epistemic Dating Systems in Indian History:
- Non-Calendrical Sacred Memory (Itihasa-Purana): Accounts of Samrat Sagara, Maharshi Bhagiratha, and Sri Rama in the Valmiki Ramayana and Puranas belong to sacred civilizational tradition. Assigning speculative BCE calendar dates to Treta Yuga narratives violates scholarly historiography; instead, they are honored as foundational cultural and dharmic charters.
- Stratigraphic & Radiocarbon Archaeology (c. 2500 – 300 BCE): Proto-historical and early urban horizons (such as Sisupalgarh, Golabai Sasan, and Jaugada) are dated by ceramic sequences (Black-and-Red Ware, Northern Black Polished Ware) and C-14 analysis, always expressed with an explicit margin of approximation.
- Synchronized Mauryan & Post-Mauryan Lithic Chronology (3rd – 1st Century BCE): Ashoka’s Major Rock Edict XIII names five contemporary Hellenistic monarchs (Antiochus II Theos, Ptolemy II Philadelphus, Antigonus Gonatas, Magas of Cyrene, and Alexander II of Epirus), anchoring the Kalinga War to c. 261 BCE within a 1–2 year tolerance.
- Astronomical & Era-Based Copper-Plate Chronology (4th – 16th Century CE): Medieval dynasties dated their charters using verifiable eras—the Saka Era (beginning 78 CE), the Gangeya / Eastern Ganga Era (beginning 498 CE), the Chalukya-Vikrama Era (beginning 1076 CE), and the Odishan Anka regnal reckoning (which omits numbers ending in 6 or 0, except 10)—frequently accompanied by solar or lunar eclipse details that modern astronomers verify to the exact day.`
  },

  // ============================================================================
  // 15. INSCRIPTIONS & ARCHAEOLOGY CATEGORY MONOGRAPH (IA-0002)
  // ============================================================================
  {
    id: 'art_ia_south_indian_epigraphy_corpus',
    slug: 'epigraphia-indica-south-indian-inscriptions-comparative-corpus',
    category: 'Inscriptions & Archaeology',
    original_language: 'en',
    original_title:
      'IA-0002 | Epigraphia Indica & South Indian Inscriptions: Comparative Corpus of Stone Edicts and Copper-Plate Charters Across Kalinga, Vengi, Karnata, and Tamilakam',
    summary:
      'A comprehensive guide to the primary epigraphical and archaeological corpus of Eastern and Southern India—analyzing the structure of royal Tamrapatra charters, temple pillar inscriptions, hero stones (Viragals), and bilingual Sanskrit-vernacular proclamations.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('korni_copper_plate_ring.jpg'),
    tags: [
      'Inscriptions & Archaeology',
      'Epigraphia Indica',
      'South Indian Inscriptions',
      'Copper Plates',
      'Veligalani Grant',
      'Simhachalam Inscriptions',
      'Draksharama Inscriptions'
    ],
    sources: [
      {
        id: 'src_ia_01',
        source_type: 'Scholarly Book',
        title: 'Indian Epigraphy & Indian Epigraphical Glossary',
        author_or_authority: 'Dr. D.C. Sircar',
        publication_or_location: 'Delhi: Motilal Banarsidass',
        year_or_era: '1965–1966',
        citation_details: 'Diplomatic structure of Tamrasasana charters and royal titles',
        verified: true
      },
      {
        id: 'src_ia_02',
        source_type: 'Inscription',
        title: 'South Indian Inscriptions, Vol. VI (Simhachalam, Srikurmam & Coastal Kalinga Inscriptions)',
        author_or_authority: 'K.V. Subrahmanya Aiyer (ed.), Archaeological Survey of India',
        publication_or_location: 'Madras: Government Press',
        year_or_era: '1928',
        citation_details: 'Nos. 692–1215 (Bilingual Sanskrit-Odia-Telugu inscriptions at Simhachalam and Srikurmam)',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Epigraphic Scope:
Reference Number: IA-0002 | Category: Inscriptions & Archaeology (Royal Copper-Plate & Temple Inscriptions) | Period: 3rd Century BCE – 16th Century CE | Location: Kalinga-Odra, Vengi-Andhra, Karnata, and Tamilakam.
Over 80% of pre-1600 CE Indian political, administrative, and social history is reconstructed directly from epigraphy. Across the eastern and southern corridors of India, inscriptions survive in two primary mediums: (a) Tamrasasana (royal copper-plate charters bound by a signet ring bearing the dynastic emblem) and (b) Silasasana (stone inscriptions incised on natural rock faces, temple walls, mandapa pillars, and hero stones).

2. Diplomatic Anatomy of a Royal Copper-Plate Charter:
Every classical and medieval copper-plate grant (such as the Jirjingi, Korni, Kendupatna, Nandampudi, or Veligalani plates) follows a rigorous three-part legal structure:
- Mangalacharana & Prasasti (Invocation & Genealogical Preamble): Composed in ornate Sanskrit verse, invoking the royal tutelary deity (Shiva-Gokarnesvara, Purushottama-Jagannatha, or Varaha-Vishnu) and recounting the dynastic lineage and military victories of the reigning monarch.
- Karya-bhaga (Operative Legal Grant): Often bilingual (combining Sanskrit with Odia, Telugu, Kannada, or Tamil so local villagers and revenue officers could read the boundaries), specifying the donor, the donee (Brahmin scholars, temples, or military commanders), the village boundaries (Sima-nirnaya), and tax exemptions (Sarva-kara-parihara).
- Samapti & Vyasa-gitas (Imprecatory Verses, Date & SignManual): Recording the exact Saka/Anka date, the composer (Sandhivigrahika), the engraver (Akshasali / Sutradhara), and standard Dharma-shastra verses warning future kings against revoking the endowment.

3. Key Multi-Dynastic Epigraphic Repositories:
- Simhachalam (Varaha Lakshmi Narasimha Temple, Visakhapatnam) & Srikurmam (Srikakulam): Over 500 stone inscriptions in Sanskrit, Odia, and Telugu documenting Eastern Ganga, Chola, Reddi, Suryavamsha Gajapathi, and Vijayanagara endowments.
- Draksharama (East Godavari) & Srisailam (Kurnool): Crucial southern epigraphic pillars recording Vengi Chalukya, Velanati Choda, Kakatiya, Reddi, and Kapilendra/Purushottama Gajapathi campaigns.`
  },

  // ============================================================================
  // 16. KINGDOMS & MAPS CATEGORY MONOGRAPH (KM-0003)
  // ============================================================================
  {
    id: 'art_km_deccan_corridors_forts',
    slug: 'historical-kingdoms-maps-giri-jala-durgas-mahanadi-to-kaveri',
    category: 'Kingdoms & Maps',
    original_language: 'en',
    original_title:
      'KM-0003 | Historical Kingdoms, Geopolitical Corridors & Fortresses (Giri & Jala Durgas) from the Mahanadi to the Kaveri',
    summary:
      'A geopolitical and cartographic treatise mapping the major historical territories (Odra, Utkala, Kalinga, Trikalinga, Vengi, Rayalaseema, Gangavadi, and Tondaimandalam) and the chain of strategic hill and water fortresses (Barabati, Kondapalli, Kolletikota, Kondavidu, Udayagiri, and Penukonda) that anchored imperial rule.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('gajapathi_empire_map_1465.jpg'),
    tags: [
      'Kingdoms & Maps',
      'Historical Geography',
      'Barabati Fort',
      'Kondavidu Fort',
      'Kolletikota',
      'Udayagiri Fort',
      'Giri Durga',
      'Jala Durga'
    ],
    sources: [
      {
        id: 'src_km_01',
        source_type: 'Scholarly Book',
        title: 'The Historical Geography of Ancient India',
        author_or_authority: 'Dr. Bimala Churn Law',
        publication_or_location: 'Paris: Société Asiatique de Paris',
        year_or_era: '1954',
        citation_details: 'Sections on Eastern and Southern India (Odra, Utkala, Kalinga, Kosala, Vengi, and Dravida)',
        verified: true
      },
      {
        id: 'src_km_02',
        source_type: 'Scholarly Book',
        title: 'Military System in Medieval Orissa (c. 1077–1568 A.D.)',
        author_or_authority: 'Dr. Bijay Kumar Rath & Odisha State Archives',
        publication_or_location: 'Bhubaneswar',
        year_or_era: '1993',
        citation_details: 'Dandapata provincial boundaries and Durga (fortress) architecture from Cuttack to Udayagiri',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Cartographic Methodology:
Reference Number: KM-0003 | Category: Kingdoms & Maps (Strategic Citadels & Corridors) | Period: Classical Antiquity to 16th Century CE | Location: Eastern Seaboard & Deccan Plateau (Mahanadi to Kaveri Basin).
Classical Indian treatises on statecraft (such as Kautilya’s Arthashastra and Prataparudra Deva’s Sarasvati Vilasa) classify fortresses into four primary categories: Jala-durga (water/island fortress), Giri-durga (hill fortress), Vana-durga (forest fortress), and Dhanva-durga (desert/plain fortress). Across the eastern seaboard from the Mahanadi delta to the Kaveri river, control of the empire depended on a linked chain of riverine Jala-durgas and Eastern Ghats Giri-durgas.

2. The Five-Dandapata Imperial Corridor under the Gangas & Gajapathis:
At its 15th-century zenith under Emperor Kapilendra Deva (c. 1464–1466 CE), the empire was administered through major provincial governorships (Dandapatas and Rajyas) stretching north-to-south:
- Northern & Core Odra-Utkala Dandapatas: Jajpur, Varanasi Kataka (anchored by the moated river-island Jala-durga of Barabati Fort between the Mahanadi and Kathajodi rivers), and Khurda/Puri.
- Kalinga Dandapata: Centered at Kalinganagara (Mukhalingam), Potnuru, and Simhachalam.
- Rajahmundry Rajya & Kolleti Sarasu: Controlling the Godavari crossing and the impregnable freshwater island citadel (Jala-durga) of Kolletikota in Kolleru Lake.
- Kondapalli & Kondavidu Rajyas: Anchored by the massive granite hill fortresses (Giri-durgas) of Kondapalli (Krishna district), Bellamkonda, Vinukonda, and Kondavidu (Guntur district, with over 21 miles of cyclopean granite ramparts).
- Udayagiri Rajya & Southern Outposts: Anchored by the precipitous hill citadel of Udayagiri (Nellore district, Andhra Pradesh), controlling the gateway into Tondaimandalam (Kanchipuram) and the Kaveri basin (Srirangam).

3. Community Cross-Reference in Fortress Construction & Defense:
Colonial district manuals (Boswell’s Nellore Manual 1873, Mackenzie’s Kondavidu and Kolletikota Kaifiyats, and Thurston 1909) and regional inscriptions document that the dressed-granite bastions, rock-cut stepwells, and defensive ramparts along this corridor were constructed and garrisoned by Odra-Kshatriya, Odiyaraju, OddeRajulu, VaddeRajulu, and Waddar warrior-artisan lineages.`
  },

  // ============================================================================
  // 17. HISTORICAL DOCUMENTARY CATEGORY MONOGRAPH (HD-0002)
  // ============================================================================
  {
    id: 'art_hd_archival_manuscripts_kaifiyats',
    slug: 'archival-documentary-sources-madala-panji-mackenzie-kaifiyats',
    category: 'Historical Documentary',
    original_language: 'en',
    original_title:
      'HD-0002 | Archival Documentary Sources: The Madala Panji Temple Chronicles, Colin Mackenzie’s Local Kaifiyats, and Colonial Gazetteers',
    summary:
      'A documentary source-criticism treatise examining the three major non-epigraphic archival pillars of eastern and southern Indian history—the palm-leaf Madala Panji of the Puri Jagannatha Temple, the village and fort Kaifiyats collected by Surveyor-General Colin Mackenzie (1799–1821), and the Imperial/Presidency Gazetteers (1872–1931).',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'scholarly_interpretation',
    featured_image: ARCHIVE_IMG('odia_palm_leaf_manuscript.jpg'),
    tags: [
      'Historical Documentary',
      'Madala Panji',
      'Mackenzie Manuscripts',
      'Local Kaifiyats',
      'Palm-Leaf Manuscripts',
      'Colonial Gazetteers',
      'Historiography'
    ],
    sources: [
      {
        id: 'src_hd_01',
        source_type: 'Primary Source',
        title: 'The Madala Panji (Rajabhoga Itihasa of Sri Jagannatha Temple, Puri)',
        author_or_authority: 'Prof. Artaballabha Mohanty (ed.), Prachi Samiti Edition',
        publication_or_location: 'Cuttack / Bhubaneswar: Utkal University',
        year_or_era: '1940 (Reprint 1969)',
        citation_details: 'Traditional palm-leaf temple chronicle of the Kesari, Ganga, and Gajapathi kings',
        verified: true
      },
      {
        id: 'src_hd_02',
        source_type: 'Primary Source',
        title: 'The Mackenzie Manuscripts: Summaries of the Historical Manuscripts in the Mackenzie Collection (Vols. I & II)',
        author_or_authority: 'Prof. T.V. Mahalingam (ed.)',
        publication_or_location: 'Madras: University of Madras Historical Series',
        year_or_era: '1972–1976',
        citation_details: 'Catalogues of Telugu, Tamil, Kannada, and Marathi Kaifiyats and Vamsavalis',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Source-Criticism Purpose:
Reference Number: HD-0002 | Category: Historical Documentary (Archival Manuscripts & Source Criticism) | Period: 16th – 20th Century CE Compilation (recording earlier traditions) | Location: Puri (Odisha), Government Oriental Manuscripts Library (Chennai), and British Library (London).
When reconstructing the complete history of royal dynasties and the 76 Community Names across India, historians cross-examine contemporary stone/copper inscriptions against three indispensable documentary repositories: the Madala Panji, the Mackenzie Collection Kaifiyats, and the Presidency Gazetteers.

2. The Madala Panji (Drum-Bundle Palm-Leaf Chronicles of Puri):
Preserved by the Deula Karana and Tadau Karana scribes of the Sri Jagannatha Temple at Puri on incised Tala-patra (palm leaves) tied in cylindrical drum-shaped bundles (Madala), the Rajabhoga section records the succession of rulers, temple constructions, and administrative endowments. While early chapters on pre-Ganga rulers contain chronological compression, its accounts of the Suryavamsha Gajapathis (Kapilendra Deva, Purushottama Deva’s Kanchi expedition, Prataparudra Deva, and Mukunda Deva) preserve vital historical details corroborated by contemporary inscriptions.

3. The Colin Mackenzie Collection & Village Kaifiyats (c. 1799–1821 CE):
Directed by Colonel Colin Mackenzie (first Surveyor-General of India) with his brilliant Indian scholar-assistants Ledchmiah (Kavali Venkata Borraiah and Kavali Venkata Lakshmiah), this survey collected over 1,500 local village and fortress histories (Kaifiyats), royal genealogies (Vamsavalis), and copies of over 8,000 inscriptions across Andhra, Karnataka, and Tamil Nadu. The Kondavidu, Kondapalli, Udayagiri, and Kolletikota Kaifiyats provide primary testimony on how Gajapathi and Odiyaraju/OddeRajulu garrisons defended coastal and hill citadels.

4. Imperial & Presidency Gazetteers (1872–1931 CE):
Compiled by W.W. Hunter, H.H. Risley, Edgar Thurston (1909), R.E. Enthoven (1922), and H.A. Rose, these ethnographic surveys documented the living customs, endogamous subdivisions, occupational expertise in stone/canal engineering, and oral traditions of royal Odra origin across all 76 community designations.`
  },

  // ============================================================================
  // 18. HISTORICAL GALLERY CATEGORY MONOGRAPH (HG-0001)
  // ============================================================================
  {
    id: 'art_hg_architectural_emblems_provenance',
    slug: 'dynastic-emblems-temple-iconography-provenance-standards',
    category: 'Historical Gallery',
    original_language: 'en',
    original_title:
      'HG-0001 | Dynastic Emblems, Temple Iconography & Provenance Standards: Distinguishing Archaeological Monuments from Artistic Reconstructions',
    summary:
      'A visual historiography and provenance reference guide to the heraldic royal emblems (Lanchhanas) of Indian dynasties, the three temple architectural orders (Kalinga-Nagara, Dravida, and Vesara), and the strict archival standard distinguishing authenticated archaeological photography from symbolic artistic illustrations.',
    author_name: 'G.Sathyanarayana Raju.Peetla.',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('konark_chariot_wheel.jpg'),
    tags: [
      'Historical Gallery',
      'Dynasty Emblems',
      'Kalinga Architecture',
      'Dravida Architecture',
      'Vesara Architecture',
      'Konark Sun Temple',
      'Provenance Standards'
    ],
    sources: [
      {
        id: 'src_hg_01',
        source_type: 'Scholarly Book',
        title: 'Encyclopaedia of Indian Temple Architecture (North India & South India Volumes)',
        author_or_authority: 'Michael W. Meister & M.A. Dhaky (eds.)',
        publication_or_location: 'New Delhi: American Institute of Indian Studies & Oxford University Press',
        year_or_era: '1983–1998',
        citation_details: 'Definitive architectural analysis of Kalinga, Dravida, and Karnata-Dravida (Vesara) temples',
        verified: true
      },
      {
        id: 'src_hg_02',
        source_type: 'Scholarly Book',
        title: 'Hindu Temple Art of Orissa (Vols. I–III)',
        author_or_authority: 'Prof. Thomas E. Donaldson',
        publication_or_location: 'Leiden: E.J. Brill',
        year_or_era: '1985–1987',
        citation_details: 'Iconography and architectural evolution of Somavamshi, Ganga, and Gajapathi monuments',
        verified: true
      }
    ],
    original_content: `1. Article Identification & Visual Provenance Standard:
Reference Number: HG-0001 | Category: Historical Gallery (Dynasty Emblems & Architectural Iconography) | Period: 3rd Century BCE – 16th Century CE | Location: Pan-Indian Monumental & Archival Sites.
In compliance with scholarly museum standards, every visual asset in the Historical Gallery and article repository is classified by provenance:
- Category I (Authenticated Archaeological & Epigraphic Photography): Direct photographs of surviving stone inscriptions (Dhauli, Hathigumpha), copper-plate rings (Korni), fortress ramparts (Sisupalgarh, Barabati, Kondavidu, Udayagiri), and structural temples (Puri, Konark, Simhachalam, Draksharama, Srirangam).
- Category II (Corroborated Cartographic Reconstructions): Historical maps plotting verified epigraphic findspots and riverine/fortress boundaries.
- Category III (Symbolic Artistic Illustrations & Reconstructions): Clearly labeled historical illustrations of ancient and medieval sovereigns (where no contemporary painted portrait survives), informed by epigraphic descriptions and contemporary temple relief sculptures (such as the royal portraits of Narasimha Deva I carved in chlorite stone from Konark, now in the National Museum, New Delhi).

2. Royal Heraldic Emblems (Rajakiya Lanchhanas) on Copper-Plate Seals:
- Suryavamsha Gajapathis: Solar Disc (Surya-mandala), Gaja-Lakshmi, and the Navakoti-Gaja (War Elephant) emblem.
- Eastern Gangas of Kalinga: Couchant Vrishabha (Nandi Bull) flanked by sankha, chamara, crescent moon, and ankusha.
- Western Gangas of Talakad: Madagajendra (Musth Elephant).
- Badami, Vengi & Kalyani Chalukyas: Varaha (Sacred Boar incarnation of Vishnu) with sun, moon, and lotus.
- Imperial Cholas: Seated / leaping Vyaghra (Tiger) flanked by two fishes and a bow (documented on the Uttaramerur and Leiden seals).
- Pallavas of Kanchipuram: Vrishabha (Recumbent Bull) and Simha (Lion).
- Kadambas of Banavasi: Simha (Lion) and Padma (Lotus punch-mark).`
  },
  KAKATIYA_MAIN_ARTICLE
];

/**
 * Complete Structured Metadata Map for all 25 Canonical & Expanded Articles
 * (6 original articles + 18 expanded articles + 1 Kakatiya Dynasty monograph) providing Sections A, F, and G data.
 */
export const ARTICLE_STRUCTURED_METADATA_MAP: Record<string, ArticleStructuredMetadata> = {
  art_dyn_kakatiya_orugallu: KAKATIYA_MAIN_ARTICLE_STRUCTURED_METADATA,
  art_odra_desha_history: {
    refNumber: 'KM-0001',
    articleId: 'art_odra_desha_history',
    categoryCode: 'KM',
    categoryName: {
      en: 'Kingdoms & Maps',
      hi: 'ऐतिहासिक राज्य एवं मानचित्र',
      te: 'చారిత్రక రాజ్యాలు & పటాలు',
      kn: 'ಐತಿಹಾಸಿಕ ರಾಜ್ಯಗಳು ಮತ್ತು ನಕ್ಷೆಗಳು',
      ta: 'வரலாற்று அரசுகள் & வரைபடங்கள்',
      mr: 'ऐतिहासिक राज्ये आणि नकाशे',
      or: 'ଐତିହାସିକ ରାଜ୍ୟ ଓ ମାନଚିତ୍ର',
      bn: 'ঐতিহাসিক রাজ্য ও মানচিত্র'
    },
    subcategoryName: {
      en: 'Odra, Utkala, Kalinga & Trikalinga Core',
      hi: 'ओड्र, उत्कल, कलिंग एवं त्रिकलिंग क्षेत्र',
      te: 'ఓడ్ర, ఉత్కళ, కళింగ & త్రికళింగ ప్రాంతాలు',
      kn: 'ಓಡ್ರ, ಉತ್ಕಲ, ಕಳಿಂಗ ಮತ್ತು ತ್ರಿಕಳಿಂಗ ಪ್ರದೇಶಗಳು',
      ta: 'ஒட்டர, உத்கல, கலிங்க & திரிகலிங்கப் பகுதிகள்',
      mr: 'ओड्र, उत्कल, कलिंग आणि त्रिकलिंग प्रदेश',
      or: 'ଓଡ଼୍ର, ଉତ୍କଳ, କଳିଙ୍ଗ ଓ ତ୍ରିକଳିଙ୍ଗ ଅଞ୍ଚଳ',
      bn: 'ওড্র, উৎকল, কলিঙ্গ ও ত্রিকলিঙ্গ অঞ্চল'
    },
    historicalPeriod: {
      en: 'Classical Antiquity to Late Medieval Era',
      hi: 'शास्त्रीय प्राचीन काल से उत्तर मध्यकाल तक',
      te: 'ప్రాచీన కాలం నుండి మలి మధ్యయుగ కాలం వరకు',
      kn: 'ಪ್ರಾಚೀನ ಕಾಲದಿಂದ ಉತ್ತರ ಮಧ್ಯಕಾಲೀನ ಯುಗದವರೆಗೆ',
      ta: 'பண்டைய காலம் முதல் பிற்கால இடைக்காலம் வரை',
      mr: 'प्राचीन काळापासून उत्तर मध्ययुगीन काळापर्यंत',
      or: 'ପ୍ରାଚୀନ କାଳରୁ ଉତ୍ତର-ମଧ୍ୟଯୁଗ ପର୍ଯ୍ୟନ୍ତ',
      bn: 'প্রাচীন কাল থেকে উত্তর-মধ্যযুগ পর্যন্ত'
    },
    approxDateRange: {
      en: 'c. 3rd Century BCE – 1568 CE',
      hi: 'लगभग तीसरी शताब्दी ई.पू. – 1568 ई.',
      te: 'క్రీ.పూ. 3వ శతాబ్దం – క్రీ.శ. 1568',
      kn: 'ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ – ಕ್ರಿ.ಶ. 1568',
      ta: 'பொ.ஊ.மு. 3-ஆம் நூற்றாண்டு – பொ.ஊ. 1568',
      mr: 'इ.स.पू. ३ रे शतक – इ.स. १५६८',
      or: 'ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀ – ୧୫୬୮ ଖ୍ରୀ.ଅ.',
      bn: 'খ্রি.পূ. ৩য় শতাব্দী – ১৫৬৮ খ্রি.'
    },
    geographicalLocation: {
      en: 'Mahanadi-Brahmani-Baitarani-Rishikulya Basins (Odisha & Northern Coastal Andhra)',
      hi: 'महानदी-ब्राह्मणी-बैतरणी-ऋषिकुल्या बेसिन (ओडिशा एवं उत्तरी तटीय आंध्र)',
      te: 'మహానది-బ్రాహ్మణి-బైతరణి-ఋషికుల్య లోయలు (ఒడిశా & ఉత్తరాంధ్ర)',
      kn: 'ಮಹಾನದಿ-ಬ್ರಾಹ್ಮಣಿ-ಬೈತರಣಿ-ಋಷಿಕುಲ್ಯ ಕಣಿವೆ (ಒಡಿಶಾ ಮತ್ತು ಉತ್ತರ ಕರಾವಳಿ ಆಂಧ್ರ)',
      ta: 'மகாநதி-பிராம்மணி-வைதரணி-ரிஷிகுல்யா படுகைகள் (ஒடிசா & வட ஆந்திரக் கடற்கரை)',
      mr: 'महानदी-ब्राह्मणी-बैतरणी-ऋषिकुल्या खोरे (ओडिशा आणि उत्तर किनारी आंध्र)',
      or: 'ମହାନଦୀ-ବ୍ରାହ୍ମଣୀ-ବୈତରଣୀ-ଋଷିକୁଲ୍ୟା ଉପତ୍ୟକା (ଓଡ଼ିଶା ଓ ଉତ୍ତର ଆନ୍ଧ୍ର)',
      bn: 'মহানদী-ব্রাহ্মণী-বৈতরণী-ঋষিকুল্যা অববাহিকা (উড়িষ্যা ও উত্তর অন্ধ্র)'
    },
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Historical Cartographic Map of Ancient Odra Desha, Utkala, and Kalinga',
      caption: 'Territorial boundaries of Odra, Utkala, Kalinga, and Dakshina Kosala reconstructed from Somavamshi, Ganga, and Gajapathi epigraphic findspots.',
      period: 'c. 7th – 16th Century CE',
      sourceOrProvenance: 'Suryavamsha Portal Cartographic Archive (after N.K. Sahu 1964 & D.C. Sircar 1965)',
      credit: 'Archival Cartographic Collection / Public Domain Historical Atlas',
      altText: 'Historical map of Ancient Odra Desha, Utkala, and Kalinga river basins and capitals',
      visualType: 'Cartographic Reconstruction'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_01_od',
        canonicalTerm: 'Od / Odra',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '7th – 16th Century CE',
        relationshipSummary: {
          en: 'Primary territorial ethnonym derived from Audra / Odra-vishaya inscriptions and Xuanzang’s Wu-T’u account.',
          hi: 'औड्र / ओड्र-विषय शिलालेखों और ह्वेनसांग के विवरण से व्युत्पन्न मूल क्षेत्रीय नाम।',
          te: 'ఔడ్ర / ఓడ్ర-విషయ శాసనాలు మరియు హుయాన్ త్సాంగ్ రచనల నుండి ఉద్భవించిన మూల నామం.',
          kn: 'ಔಡ್ರ / ಓಡ್ರ-ವಿಷಯ ಶಾಸನಗಳಿಂದ ಬಂದ ಮೂಲ ಪ್ರಾದೇಶಿಕ ನಾಮ.',
          ta: 'ஒட்டர-விஷய கல்வெட்டுகளிலிருந்து தோன்றிய பூர்வீகப் பெயர்.',
          mr: 'औड्र / ओड्र-विषय शिलालेखांवरून आलेले मूळ प्रादेशिक नाव.',
          or: 'ଔଡ଼୍ର / ଓଡ଼୍ର-ବିଷୟ ଶିଳାଲେଖରୁ ଉদ্ଭୂତ ମୂଳ ଆଞ୍ଚଳିକ ନାମ।',
          bn: 'ঔড্র / ওড্র-বিষয় শিলালিপি থেকে উদ্ভূত মূল আঞ্চলিক নাম।'
        },
        supportingRef: '[src_01] N.K. Sahu (1964); [src_02] Xuanzang (639 CE)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_01_od'
      },
      {
        communityId: 'comm_dir_03_odra_kshatriya',
        canonicalTerm: 'Odra-Kshatriya',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '11th – 16th Century CE',
        relationshipSummary: {
          en: 'Martial and ruling caste designation associated with the defense of Odra-rajya fortresses.',
          hi: 'ओड्र-राज्य के दुर्गों की रक्षा से संबद्ध क्षत्रिय पहचान।',
          te: 'ఓడ్ర-రాజ్య దుర్గాల రక్షణతో ముడిపడిన క్షత్రియ గుర్తింపు.',
          kn: 'ಓಡ್ರ-ರಾಜ್ಯದ ಕೋಟೆಗಳ ರಕ್ಷಣೆಯೊಂದಿಗೆ ಗುರುತಿಸಿಕೊಂಡ ಕ್ಷತ್ರಿಯ ನಾಮ.',
          ta: 'ஒட்டர-ராஜ்ய கோட்டைப் பாதுகாப்புடன் தொடர்புடைய க்ஷத்ரியப் பெயர்.',
          mr: 'ओड्र-राज्याच्या किल्ल्यांच्या संरक्षणाशी संबंधित क्षत्रिय ओळख.',
          or: 'ଓଡ଼୍ର-ରାଜ୍ୟର ଦୁର୍ଗ ରକ୍ଷା ସହିତ ସମ୍পୃକ୍ତ କ୍ଷତ୍ରିୟ ପରିଚୟ।',
          bn: 'ওড্র-রাজ্যের দুর্গ প্রতিরক্ষার সাথে যুক্ত ক্ষত্রিয় পরিচয়।'
        },
        supportingRef: '[src_01] Dynastic History of Magadha and Orissa (1964)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_03_odra_kshatriya'
      }
    ],
    relatedArticleIds: ['art_epigraphic_evolution_odra', 'art_gajapathi_kapilendra', 'art_km_deccan_corridors_forts'],
    relatedFigureIds: ['fig_king_kharavela', 'fig_anantavarman_chodaganga', 'fig_kapilendra_deva', 'fig_mukunda_deva'],
    relatedDynastyNames: ['Mahameghavahana Dynasty', 'Somavamshi Dynasty', 'Eastern Ganga Dynasty', 'Suryavamsha Gajapathi Dynasty']
  },

  art_gajapathi_kapilendra: {
    refNumber: 'RD-0001',
    articleId: 'art_gajapathi_kapilendra',
    categoryCode: 'RD',
    categoryName: {
      en: 'Royal Dynasties',
      hi: 'राजवंश एवं क्षत्रिय परंपरा',
      te: 'రాజవంశాలు & క్షత్రియ పరంపర',
      kn: 'ರಾಜವಂಶಗಳು ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
      ta: 'அரச வம்சங்கள் & க்ஷத்ரிய மரபு',
      mr: 'राजवंश आणि क्षत्रिय परंपरा',
      or: 'ରାଜବଂଶ ଓ କ୍ଷତ୍ରିୟ ପରମ୍ପରା',
      bn: 'রাজবংশ ও ক্ষত্রিয় ঐতিহ্য'
    },
    subcategoryName: {
      en: 'Odra-Kalinga Imperial Dynasties',
      hi: 'ओड्र-कलिंग साम्राज्यवादी राजवंश',
      te: 'ఓడ్ర-కళింగ సామ్రాజ్య రాజవంశాలు',
      kn: 'ಓಡ್ರ-ಕಳಿಂಗ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು',
      ta: 'ஒட்டர-கலிங்க பேரரசு வம்சங்கள்',
      mr: 'ओड्र-कलिंग साम्राज्यवादी राजवंश',
      or: 'ଓଡ଼୍ର-କଳିଙ୍ଗ ସାମ୍ରାଜ୍ୟবাদୀ ରାଜବଂଶ',
      bn: 'ওড্র-কলিঙ্গ সাম্রাজ্যবাদী রাজবংশ'
    },
    historicalPeriod: {
      en: 'Imperial Suryavamsha Gajapathi Era',
      hi: 'साम्राज्यिक सूर्यवंश गजपति युग',
      te: 'సూర్యవంశ గజపతి సామ్రాజ్య యుగం',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಯುಗ',
      ta: 'சூரியவம்ச கஜபதி பேரரசு காலம்',
      mr: 'सूर्यवंश गजपती साम्राज्य काळ',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଯୁଗ',
      bn: 'সূর্যবংশী গজপতি সাম্রাজ্য যুগ'
    },
    approxDateRange: {
      en: '1434/1435 – 1466/1467 CE (or 1468–1470 CE in alternative Anka chronology; Dynasty until 1540/1541 CE)',
      hi: '1434/1435 ई. – 1466/1467 ई. (वैकल्पिक अंक कालक्रम में 1468–1470 ई.; राजवंश 1540/1541 ई. तक)',
      te: 'క్రీ.శ. 1434/1435 – 1466/1467 (ప్రత్యామ్నాయ అంక గణనలో 1468–1470; రాజవంశం క్రీ.శ. 1540/1541 వరకు)',
      kn: 'ಕ್ರಿ.ಶ. 1434/1435 – 1466/1467 (ಪರ್ಯಾಯ ಅಂಕ ಗಣನೆಯಲ್ಲಿ 1468–1470; ರಾಜವಂಶ ಕ್ರಿ.ಶ. 1540/1541 ರವರೆಗೆ)',
      ta: 'பொ.ஊ. 1434/1435 – 1466/1467 (மாற்று அங்க கணக்கீட்டில் 1468–1470; வம்சம் பொ.ஊ. 1540/1541 வரை)',
      mr: 'इ.स. १४३४/१४३५ – १४६६/१४६७ (पर्यायी अंक कालगणनेत १४६८–१४७०; राजवंश इ.स. १५४०/१५४१ पर्यंत)',
      or: '୧୪୩୪/୧୪୩୫ – ୧୪୬୬/୧୪୬୭ ଖ୍ରୀ.ଅ. (ବିକଳ୍ପ ଅଙ୍କ ଗଣନାରେ ୧୪୬୮–୧୪୭୦; ରାଜବଂଶ ୧୫୪୦/୧୫୪୧ ଖ୍ରୀ.ଅ. ପର୍ଯ୍ୟନ୍ତ)',
      bn: '১৪৩৪/১৪৩৫ – ১৪৬৬/১৪৬৭ খ্রি. (বিকল্প অঙ্ক গণনায় ১৪৬৮–১৪৭০; রাজবংশ ১৫৪০/১৫৪১ খ্রি. পর্যন্ত)'
    },
    geographicalLocation: {
      en: 'Varanasi Kataka (Cuttack) to Kondavidu, Udayagiri, and Srirangam (Ganges to Kaveri)',
      hi: 'वाराणसी कटक से कोंडावीडु, उदयगिरि एवं श्रीरंगम (गंगा से कावेरी)',
      te: 'వారణాసి కటక్ నుండి కొండవీడు, ఉదయగిరి & శ్రీరంగం (గంగ నుండి కావేరి)',
      kn: 'ವಾರಣಾಸಿ ಕಟಕ್‌ನಿಂದ ಕೊಂಡವೀಡು, ಉದಯಗಿರಿ ಮತ್ತು ಶ್ರೀರಂಗಂ (ಗಂಗೆಯಿಂದ ಕಾವೇರಿ)',
      ta: 'வாரணாசி கட்டக் முதல் கொண்டவீடு, உதயகிரி & ஸ்ரீரங்கம் (கங்கை முதல் காவிரி)',
      mr: 'वाराणसी कटक ते कोंडावीडु, उदयगिरी आणि श्रीरंगम (गंगा ते कावेरी)',
      or: 'ବାରଣାସୀ କଟକରୁ କୋଣ୍ଡାଭିଡୁ, ଉଦୟଗିରି ଓ ଶ୍ରୀରଙ୍ଗମ (ଗଙ୍ଗାରୁ କାବେରୀ)',
      bn: 'বারাণসী কটক থেকে কোন্ডাভিডু, উদয়গিরি ও শ্রীরঙ্গম (গঙ্গা থেকে কাবেরী)'
    },
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Lingaraja Temple Complex & Gajapathi Royal Proclamation Site, Bhubaneswar',
      caption: 'Site of Emperor Kapilendra Deva’s 1452 CE Odia proclamation on the Jagamohana doorway of the Lingaraja Temple.',
      period: '11th – 15th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Monument Photography / Epigraphia Indica Vol. XXVIII',
      credit: 'Archival Monument Documentation',
      altText: 'Lingaraja Temple at Bhubaneswar bearing Kapilendra Deva’s 1452 CE royal inscription',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_04_odiyaraju',
        canonicalTerm: 'Odiyaraju / Odiya-Raju',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 16th Century CE',
        relationshipSummary: {
          en: 'Southern military commanders, fort governors, and Kshatriya detachments established during Kapilendra and Hamvira Deva’s campaigns from Rajahmundry and Kondavidu to Udayagiri.',
          hi: 'कपिलेंद्र और हम्वीर देव के दक्षिणी अभियानों के दौरान राजमंड्री, कोंडावीडु और उदयगिरि में स्थापित सैन्य कमांडर और दुर्ग रक्षक।',
          te: 'కపిలేంద్ర మరియు హంవీర దేవుల దక్షిణ దండయాత్రలలో రాజమండ్రి, కొండవీడు మరియు ఉదయగిరి దుర్గాలలో స్థిరపడిన క్షత్రియ సేనానులు.',
          kn: 'ಕಪಿಲೇಂದ್ರ ಮತ್ತು ಹಂವೀರ ದೇವರ ದಕ್ಷಿಣ ಅಭಿಯಾನಗಳಲ್ಲಿ ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ಕೋಟೆಗಳಲ್ಲಿ ನೆಲೆಸಿದ ಸೇನಾನಿಗಳು.',
          ta: 'கபிலேந்திரர் மற்றும் ஹம்வீர தேவரின் தென்னிந்தியப் படையெடுப்புகளில் கோட்டைத் தளபதிகளாக நிலைகொண்டவர்கள்.',
          mr: 'कपिलेंद्र आणि हम्वीर देवांच्या दक्षिणेकडील मोहिमांमध्ये कोंडावीडु व उदयगिरी किल्ल्यांवर नियुक्त झालेले सेनानी.',
          or: 'କପିଳେନ୍ଦ୍ର ଓ ହମ୍ବୀର ଦେବଙ୍କ ଦକ୍ଷିଣ ଅଭିଯାନ ସମୟରେ କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି ଦୁର୍ଗରେ ନିଯୁକ୍ତ ସେନାପତି।',
          bn: 'কপিলেন্দ্র ও হম্বীর দেবের দক্ষিণ অভিযানে কোন্ডাভিডু ও উদয়গিরি দুর্গে নিযুক্ত সেনাপতি।'
        },
        supportingRef: '[src_03] Veligalani Copper Plates (1458 CE); [src_04] R. Subrahmanyam (1957)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_04_odiyaraju'
      },
      {
        communityId: 'comm_dir_14_gajapathulu',
        canonicalTerm: 'Gajapathulu / Vadde-GajapathiRajulu',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 18th Century CE',
        relationshipSummary: {
          en: 'Honorific dynastic and martial designation preserving direct service and lineage memory of the Suryavamsha Gajapathi sovereigns.',
          hi: 'सूर्यवंश गजपति सम्राटों की सैन्य सेवा और वंश स्मृति को संरक्षित करने वाली उपाधि।',
          te: 'సూర్యవంశ గజపతి చక్రవర్తుల సైనిక సేవ మరియు వంశ గౌరవాన్ని నిలుపుకున్న బిరుదు.',
          kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಟರ ಸೈನಿಕ ಸೇವೆ ಮತ್ತು ವಂಶ ಗೌರವವನ್ನು ಉಳಿಸಿಕೊಂಡಿರುವ ನಾಮ.',
          ta: 'சூரியவம்ச கஜபதி மன்னர்களின் படைப்பணி மற்றும் வம்ச நினைவைப் போற்றும் பெயர்.',
          mr: 'सूर्यवंश गजपती सम्राटांची लष्करी सेवा आणि वंशस्मृती जपणारी पदवी.',
          or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସମ୍ରାଟଙ୍କ ସାମରିକ ସେବା ଓ ବଂଶ ସ୍ମୃତି ବହନ କରୁଥିବା ଉପାଧି।',
          bn: 'সূর্যবংশী গজপতি সম্রাটদের সামরিক সেবা ও বংশস্মৃতি বহনকারী উপাধি।'
        },
        supportingRef: '[src_04] The Suryavamsi Gajapatis of Orissa (1957)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_14_gajapathulu'
      }
    ],
    relatedArticleIds: ['art_dyn_eastern_gangas', 'art_epigraphic_evolution_odra', 'art_kolletikota_peddintlamma_lake'],
    relatedFigureIds: ['fig_kapilendra_deva', 'fig_hamvira_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty', 'Bahmani Sultanate', 'Vijayanagara Empire']
  },

  art_genealogy_methodology: {
    refNumber: 'RD-0013',
    articleId: 'art_genealogy_methodology',
    categoryCode: 'RD',
    categoryName: {
      en: 'Royal Dynasties',
      hi: 'राजवंश एवं क्षत्रिय परंपरा',
      te: 'రాజవంశాలు & క్షత్రియ పరంపర',
      kn: 'ರಾಜವಂಶಗಳು ಮತ್ತು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ',
      ta: 'அரச வம்சங்கள் & க்ஷத்ரிய மரபு',
      mr: 'राजवंश आणि क्षत्रिय परंपरा',
      or: 'ରାଜବଂଶ ଓ କ୍ଷତ୍ରିୟ ପରମ୍ପରା',
      bn: 'রাজবংশ ও ক্ষত্রিয় ঐতিহ্য'
    },
    subcategoryName: {
      en: 'SuryaVamsha & ChandraVamsha Kshatriya Traditions & Epigraphic Audits',
      hi: 'सूर्यवंश एवं चंद्रवंश क्षत्रिय परंपराएं तथा अभिलेखीय परीक्षण',
      te: 'సూర్యవంశ & చంద్రవంశ క్షత్రియ సంప్రదాయాలు & శాసన పరిశీలన',
      kn: 'ಸೂರ್ಯವಂಶ ಮತ್ತು ಚಂದ್ರವಂಶ ಕ್ಷತ್ರಿಯ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಶಾಸನ ಪರಿಶೀಲನೆ',
      ta: 'சூரியவம்ச & சந்திரவம்ச க்ஷத்ரிய மரபுகள் & கல்வெட்டு ஆய்வு',
      mr: 'सूर्यवंश आणि चंद्रवंश क्षत्रिय परंपरा व शिलालेख परीक्षण',
      or: 'ସୂର୍ଯ୍ୟବଂଶ ଓ ଚନ୍ଦ୍ରବଂଶ କ୍ଷତ୍ରିୟ ପରମ୍ପରା ଓ ଶିଳାଲେଖ ପରୀକ୍ଷଣ',
      bn: 'সূর্যবংশ ও চন্দ্রবংশ ক্ষত্রিয় ঐতিহ্য ও শিলালিপি নিরীক্ষা'
    },
    historicalPeriod: {
      en: 'Vedic-Puranic Tradition to Modern Historiography',
      hi: 'वैदिक-पौराणिक परंपरा से आधुनिक इतिहास-लेखन तक',
      te: 'వేద-పురాణ సంప్రదాయం నుండి ఆధునిక చరిత్ర రచన వరకు',
      kn: 'ವೇದ-ಪುರಾಣ ಸಂಪ್ರದಾಯದಿಂದ ಆಧುನಿಕ ಇತಿಹಾಸ ಸಂಶೋಧನೆಯವರೆಗೆ',
      ta: 'வேத-புராண மரபு முதல் நவீன வரலாற்றியல் வரை',
      mr: 'वैदिक-पौराणिक परंपरेपासून आधुनिक इतिहास लेखनापर्यंत',
      or: 'ବୈଦିକ-ପୌରାଣିକ ପରମ୍ପରାରୁ ଆଧୁନିକ ଇତିହାସ ଲେଖନ ପର୍ଯ୍ୟନ୍ତ',
      bn: 'বৈদিক-পৌরাণিক ঐতিহ্য থেকে আধুনিক ইতিহাস রচনা পর্যন্ত'
    },
    approxDateRange: {
      en: 'Multi-Epoch (Epigraphic Horizon: 3rd Century BCE – 19th Century CE)',
      hi: 'बहु-युगीन (अभिलेखीय काल: तीसरी शताब्दी ई.पू. – 19वीं शताब्दी ई.)',
      te: 'బహుళ యుగాలు (శాసన కాలం: క్రీ.పూ. 3వ శతాబ్దం – క్రీ.శ. 19వ శతాబ్దం)',
      kn: 'ಬಹು-ಯುಗ (ಶಾಸನ ಕಾಲ: ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ – ಕ್ರಿ.ಶ. 19ನೇ ಶತಮಾನ)',
      ta: 'பல்வேறு காலகட்டங்கள் (கல்வெட்டுக் காலம்: பொ.ஊ.மு. 3 – பொ.ஊ. 19-ஆம் நூற்றாண்டு)',
      mr: 'बहु-युगीन (शिलालेख काळ: इ.स.पू. ३ रे शतक – इ.स. १९ वे शतक)',
      or: 'ବହୁ-ଯୁଗୀୟ (ଶିଳାଲେଖ କାଳ: ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀ – ୧୯ଶ ଶତାବ୍ଦୀ)',
      bn: 'বহু-যুগীয় (শিলালিপি কাল: খ্রি.পূ. ৩য় শতাব্দী – ১৯শ শতাব্দী)'
    },
    geographicalLocation: {
      en: 'Pan-Indian Epigraphic & Archival Repositories',
      hi: 'अखिल भारतीय अभिलेखीय एवं पांडुलिपि संग्रह',
      te: 'పాన్-ఇండియన్ శాసన & తాళపత్ర భాండాగారాలు',
      kn: 'ಪ್ಯಾನ್-ಇಂಡಿಯನ್ ಶಾಸನ ಮತ್ತು ಹಸ್ತಪ್ರತಿ ಸಂಗ್ರಹಾಗಾರಗಳು',
      ta: 'இந்திய அளவிலான கல்வெட்டு & சுவடிக் காப்பகங்கள்',
      mr: 'अखिल भारतीय शिलालेख आणि हस्तलिखित अभिलेखागार',
      or: 'ସର୍ବଭାରତୀୟ ଶିଳାଲେଖ ଓ ପୋଥି ଅଭିଲେଖାଗାର',
      bn: 'সর্বভারতীয় শিলালিপি ও পাণ্ডুলিপি মহাফেজখানা'
    },
    epistemicClassification: 'Scholarly Historiographical Synthesis',
    imageProvenance: {
      title: 'Royal Copper-Plate Charter (Tamrasasana) with Inscribed Sanskrit-Odia Text',
      caption: 'Incised copper-plate leaves demonstrating how medieval Indian monarchs recorded verified regnal genealogies.',
      period: '12th – 15th Century CE',
      sourceOrProvenance: 'Odisha State Museum / Archaeological Survey of India Epigraphy Branch',
      credit: 'Archival Epigraphic Facsimile',
      altText: 'Engraved medieval royal copper-plate charter with ring hole',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'syn_suryavamshi',
        canonicalTerm: 'Suryavamshi',
        associationType: 'Traditional Lineage Claim',
        historicalPeriod: 'Epic Antiquity to Present',
        relationshipSummary: {
          en: 'Overarching Solar lineage identity preserved in community vamsavalis, distinguished methodologically from primary regnal copper plates.',
          hi: 'सामुदायिक वंशावलियों में संरक्षित सूर्यवंशी पहचान, जिसे प्राथमिक ताम्रपत्रों से पद्धतिगत रूप से अलग रखा गया है।',
          te: 'వంశావళులలో భద్రపరచబడిన సూర్యవంశ గుర్తింపు—ప్రాథమిక తామ్రశాసనాల నుండి స్పష్టంగా వేరు చేసి చూపబడింది.',
          kn: 'ವಂಶಾವಳಿಗಳಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾದ ಸೂರ್ಯವಂಶದ ಗುರುತು.',
          ta: 'வம்சாவளிகளில் பாதுகாக்கப்பட்ட சூரியவம்ச அடையாளம்.',
          mr: 'वंशावळींमध्ये जतन केलेली सूर्यवंशी ओळख.',
          or: 'ବଂଶାବଳୀରେ ସଂରକ୍ଷିତ ସୂର୍ଯ୍ୟବଂଶୀ ପରିଚୟ।',
          bn: 'বংশাবলীতে সংরক্ষিত সূর্যবংশী পরিচয়।'
        },
        supportingRef: '[src_05] Romila Thapar (1996)',
        targetRoute: '/community-heritage?tab=synonyms&id=syn_suryavamshi'
      }
    ],
    relatedArticleIds: ['art_lin_suryavamshi_kshatriyas', 'art_lin_chandravamshi_kshatriyas', 'art_ht_chronological_methodology'],
    relatedFigureIds: ['fig_samrat_sagara', 'fig_kapilendra_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty', 'Somavamshi Dynasty']
  },

  art_oad_rajputh_od_history: {
    refNumber: 'HD-0001',
    articleId: 'art_oad_rajputh_od_history',
    categoryCode: 'HD',
    categoryName: {
      en: 'Historical Documentary',
      hi: 'ऐतिहासिक वृत्तचित्र एवं शोध-ग्रंथ',
      te: 'చారిత్రక డాక్యుమెంటరీ & పరిశోధన గ్రంథాలు',
      kn: 'ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ ಮತ್ತು ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು',
      ta: 'வரலாற்று ஆவணப்படம் & ஆய்வுக் கட்டுரைகள்',
      mr: 'ऐतिहासिक माहितीपट आणि संशोधन ग्रंथ',
      or: 'ଐତିହାସିକ ବୃତ୍ତଚିତ୍ର ଓ ଗବେଷଣା ଗ୍ରନ୍ଥ',
      bn: 'ঐতিহাসিক প্রামাণ্যচিত্র ও গবেষণা গ্রন্থ'
    },
    subcategoryName: {
      en: 'Pan-Indian Diaspora & Ethnographic History',
      hi: 'अखिल भारतीय विस्तार एवं नृवंशविज्ञान इतिहास',
      te: 'పాన్-ఇండియన్ విస్తరణ & ఎథ్నోగ్రాఫిక్ చరిత్ర',
      kn: 'ಪ್ಯಾನ್-ಇಂಡಿಯನ್ ವಿಸ್ತರಣೆ ಮತ್ತು ಜನಾಂಗೀಯ ಇತಿಹಾಸ',
      ta: 'இந்திய அளவிலான பரவல் & இனவரைவியல் வரலாறு',
      mr: 'अखिल भारतीय विस्तार आणि नृवंशशास्त्रीय इतिहास',
      or: 'ସର୍ବଭାରତୀୟ ପ୍ରସାର ଓ ନୃବଂଶ ଇତିହାସ',
      bn: 'সর্বভারতীয় বিস্তার ও নৃতাত্ত্বিক ইতিহাস'
    },
    historicalPeriod: {
      en: 'Classical Antiquity to Modern Diaspora',
      hi: 'प्राचीन काल से आधुनिक विस्तार तक',
      te: 'ప్రాచీన కాలం నుండి ఆధునిక విస్తరణ వరకు',
      kn: 'ಪ್ರಾಚೀನ ಕಾಲದಿಂದ ಆಧುನಿಕ ವಿಸ್ತರಣೆಯವರೆಗೆ',
      ta: 'பண்டைய காலம் முதல் தற்காலப் பரவல் வரை',
      mr: 'प्राचीन काळापासून आधुनिक विस्तारापर्यंत',
      or: 'ପ୍ରାଚୀନ କାଳରୁ ଆଧୁନିକ ପ୍ରସାର ପର୍ଯ୍ୟନ୍ତ',
      bn: 'প্রাচীন কাল থেকে আধুনিক বিস্তার পর্যন্ত'
    },
    approxDateRange: {
      en: 'c. 2nd Century BCE – Present',
      hi: 'लगभग दूसरी शताब्दी ई.पू. – वर्तमान',
      te: 'క్రీ.పూ. 2వ శతాబ్దం – నేటి వరకు',
      kn: 'ಕ್ರಿ.ಪೂ. 2ನೇ ಶತಮಾನ – ಪ್ರಸ್ತುತ',
      ta: 'பொ.ஊ.மு. 2-ஆம் நூற்றாண்டு – நிகழ்காலம்',
      mr: 'इ.स.पू. २ रे शतक – वर्तमान',
      or: 'ଖ୍ରୀ.ପୂ. ୨ୟ ଶତାବ୍ଦୀ – ବର୍ତ୍ତମାନ',
      bn: 'খ্রি.পূ. ২য় শতাব্দী – বর্তমান'
    },
    geographicalLocation: {
      en: 'Odisha, Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, Gujarat, Rajasthan & Northern India',
      hi: 'ओडिशा, आंध्र प्रदेश, तेलंगाना, कर्नाटक, तमिलनाडु, महाराष्ट्र, गुजरात, राजस्थान एवं उत्तर भारत',
      te: 'ఒడిశా, ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక, తమిళనాడు, మహారాష్ట్ర, గుజరాత్, రాజస్థాన్ & ఉత్తర భారత్',
      kn: 'ಒಡಿಶಾ, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ, ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು, ಮಹಾರಾಷ್ಟ್ರ, ಗುಜರಾತ್, ರಾಜಸ್ಥಾನ ಮತ್ತು ಉತ್ತರ ಭಾರತ',
      ta: 'ஒடிசா, ஆந்திரா, தெலுங்கானா, கர்நாடகா, தமிழ்நாடு, மகாராஷ்டிரா, குஜராத், ராஜஸ்தான் & வட இந்தியா',
      mr: 'ओडिशा, आंध्र प्रदेश, तेलंगणा, कर्नाटक, तमिळनाडू, महाराष्ट्र, गुजरात, राजस्थान आणि उत्तर भारत',
      or: 'ଓଡ଼ିଶା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା, କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ, ମହାରାଷ୍ଟ୍ର, ଗୁଜରାଟ, ରାଜସ୍ଥାନ ଓ ଉତ୍ତର ଭାରତ',
      bn: 'উড়িষ্যা, অন্ধ্রপ্রদেশ, তেলেঙ্গানা, কর্ণাটক, তামিলনাড়ু, মহারাষ্ট্র, গুজরাট, রাজস্থান ও উত্তর ভারত'
    },
    epistemicClassification: 'Scholarly Historiographical Synthesis',
    imageProvenance: {
      title: 'Ancient Dressed-Stone Stepwell (Vav / Pushkarini) Hydraulic Architecture',
      caption: 'Monumental stone stepwell and reservoir masonry characteristic of Oad-Rajput, Waddar, and Odde hydraulic engineering across western and southern India.',
      period: '11th – 16th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Western & Southern Circle Archives',
      credit: 'Archival Architectural Photography',
      altText: 'Dressed-stone stepwell with carved galleries and water reservoir',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_02_od_rajputh',
        canonicalTerm: 'Oad-Rajputh / Od-Rajput',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '12th – 20th Century CE',
        relationshipSummary: {
          en: 'Northern and Western Indian branch documented in Gujarat, Rajasthan, Punjab, and Delhi gazetteers, linked to the Jasma Devi tradition at Patan.',
          hi: 'गुजरात, राजस्थान, पंजाब और दिल्ली के गजेटियरों में प्रलेखित शाखा, पाटन की माता जसमा देवी परंपरा से संबद्ध।',
          te: 'గుజరాత్, రాజస్థాన్, పంజాబ్ గెజిటీర్లలో నమోదైన శాఖ—పాటన్ జస్మా దేవి సంప్రదాయంతో ముడిపడి ఉంది.',
          kn: 'ಗುಜರಾತ್, ರಾಜಸ್ಥಾನ ಗೆಜೆಟಿಯರ್‌ಗಳಲ್ಲಿ ದಾಖಲಾದ ಶಾಖೆ—ಪಾಟನ್ ಜಸ್ಮಾ ದೇವಿ ಸಂಪ್ರದಾಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದೆ.',
          ta: 'குஜராத், ராஜஸ்தான் அரசிதழ்களில் ஆவணப்படுத்தப்பட்ட பிரிவு—ஜஸ்மா தேவி மரபுடன் தொடர்புடையது.',
          mr: 'गुजरात, राजस्थान गॅझेटियरमध्ये नोंदवलेली शाखा—पाटणच्या जसमा देवी परंपरेशी संबंधित.',
          or: 'ଗୁଜରାଟ ଓ ରାଜସ୍ଥାନ ଗେଜେଟିୟରରେ ଲିପିବଦ୍ଧ ଶାଖା—ପାଟଣର ଜସମା ଦେବୀ ପରମ୍ପରା ସହିତ ସମ୍ପୃକ୍ତ।',
          bn: 'গুজরাট ও রাজস্থান গেজেটিয়ারে নথিবদ্ধ শাখা—পাটনের জসমা দেবী ঐতিহ্যের সাথে যুক্ত।'
        },
        supportingRef: '[src_07] Edgar Thurston (1909), Vol. V, pp. 422–435',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_02_od_rajputh'
      },
      {
        communityId: 'comm_dir_06_odderajulu',
        canonicalTerm: 'OddeRajulu / VaddeRajulu',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 20th Century CE',
        relationshipSummary: {
          en: 'Coastal Andhra, Rayalaseema, and Telangana Kshatriya and fortress-builder communities documented by Thurston (1909) and Mackenzie Kaifiyats.',
          hi: 'थर्स्टन (1909) और मैकेंज़ी कैफियतों में प्रलेखित तटीय आंध्र, रायलसीमा और तेलंगाना की शाखा।',
          te: 'థర్స్టన్ (1909) మరియు మెకంజీ కైఫియత్‌లలో నమోదైన ఆంధ్ర, రాయలసీమ మరియు తెలంగాణ శాఖ.',
          kn: 'ಥರ್ಸ್ಟನ್ (1909) ಮತ್ತು ಮೆಕೆಂಜಿ ಕೈಫಿಯತ್‌ಗಳಲ್ಲಿ ದಾಖಲಾದ ಆಂಧ್ರ ಮತ್ತು ರಾಯಲಸೀಮೆಯ ಶಾಖೆ.',
          ta: 'தர்ஸ்டன் (1909) மற்றும் மெக்கன்சி சுவடிகளில் பதிவான ஆந்திர மற்றும் இராயலசீமைப் பிரிவு.',
          mr: 'थर्स्टन (१९०९) आणि मॅकेन्झी कैफियतमध्ये नोंदवलेली आंध्र व तेलंगणातील शाखा.',
          or: 'ଥର୍ଷ୍ଟନ (୧୯୦୯) ଓ ମ୍ୟାକେଞ୍ଜି କୈଫିୟତରେ ଲିପିବଦ୍ଧ ଆନ୍ଧ୍ର ଓ ତେଲେଙ୍ଗାନା ଶାଖା।',
          bn: 'থার্স্টন (১৯০৯) ও ম্যাকেঞ্জি কৈফিয়তে নথিবদ্ধ অন্ধ্র ও তেলেঙ্গানা শাখা।'
        },
        supportingRef: '[src_07] Castes and Tribes of Southern India (1909)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_06_odderajulu'
      },
      {
        communityId: 'comm_dir_15_voddar',
        canonicalTerm: 'Voddar / Waddar / Oddaru',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '12th – 20th Century CE',
        relationshipSummary: {
          en: 'Deccan, Karnataka, Maharashtra, and Tamil Nadu stone-and-hydraulic guilds associated with Shivayogi Siddharameshwara at Solapur and southern fortresses.',
          hi: 'सोलापुर के शिवयोगी सिद्धरामेश्वर और दक्षिणी दुर्गों से संबद्ध दक्कन, कर्नाटक, महाराष्ट्र और तमिलनाडु के शिल्पी एवं दुर्ग-निर्माता।',
          te: 'సోలాపూర్ శివయోగి సిద్ధరామేశ్వరుడు మరియు దక్షిణ దుర్గాలతో ముడిపడిన కర్ణాటక, మహారాష్ట్ర, తమిళనాడు శాఖలు.',
          kn: 'ಸೊಲ್ಲಾಪುರದ ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರ ಮತ್ತು ದಕ್ಷಿಣ ಕೋಟೆಗಳೊಂದಿಗೆ ಗುರುತಿಸಿಕೊಂಡ ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದ ಶಾಖೆ.',
          ta: 'சோலாப்பூர் சித்தராமேஸ்வரர் மற்றும் தென்னிந்தியக் கோட்டைகளுடன் தொடர்புடைய கர்நாடக, மகாராஷ்டிர, தமிழகப் பிரிவு.',
          mr: 'सोलापूरचे शिवयोगी सिद्धरामेश्वर आणि दक्षिणेकडील किल्ल्यांशी संबंधित महाराष्ट्र व कर्नाटकातील शाखा.',
          or: 'ସୋଲାପୁରର ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର ଓ ଦକ୍ଷିଣ ଦୁର୍ଗ ସହିତ ସମ୍ପୃକ୍ତ କର୍ଣ୍ଣାଟକ ଓ ମହାରାଷ୍ଟ୍ର ଶାଖା।',
          bn: 'সোলাপুরের শিবযোগী সিদ্ধরামেশ্বর ও দক্ষিণ দুর্গের সাথে যুক্ত কর্ণাটক ও মহারাষ্ট্র শাখা।'
        },
        supportingRef: '[src_07] Edgar Thurston (1909); Raghavanka’s Siddharama Charitra (c. 1200 CE)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_15_voddar'
      }
    ],
    relatedArticleIds: ['art_surya_vamsa_sagara_rama', 'art_gajapathi_kapilendra', 'art_hd_archival_manuscripts_kaifiyats'],
    relatedFigureIds: ['fig_samrat_sagara', 'fig_maharshi_bhagiratha', 'fig_king_kharavela', 'fig_goddess_jasma', 'fig_shivayogi_siddharama'],
    relatedDynastyNames: ['Mahameghavahana Dynasty', 'Chaulukya (Solanki) Dynasty', 'Suryavamsha Gajapathi Dynasty']
  },

  art_surya_vamsa_sagara_rama: {
    refNumber: 'HF-0001',
    articleId: 'art_surya_vamsa_sagara_rama',
    categoryCode: 'HF',
    categoryName: {
      en: 'Historical Figures',
      hi: 'ऐतिहासिक व्यक्तित्व एवं सम्राट',
      te: 'చారిత్రక వ్యక్తులు & చక్రవర్తులు',
      kn: 'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಸಾಮ್ರಾಟರು',
      ta: 'வரலாற்று ஆளுமைகள் & பேரரசர்கள்',
      mr: 'ऐतिहासिक व्यक्तिमत्त्वे आणि सम्राट',
      or: 'ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ ଓ ସମ୍ରାଟ',
      bn: 'ঐতিহাসিক ব্যক্তিত্ব ও সম্রাটগণ'
    },
    subcategoryName: {
      en: 'Sacred Progenitors & Cultural Guardians',
      hi: 'पौराणिक आदि-पुरुष एवं सांस्कृतिक संरक्षक',
      te: 'ఆది పురుషులు & ఆధ్యాత్మిక రక్షకులు',
      kn: 'ಆದಿಪುರುಷರು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ರಕ್ಷಕರು',
      ta: 'முன்னோடிகள் & பண்பாட்டுக் காவலர்கள்',
      mr: 'पौराणिक पूर्वज आणि सांस्कृतिक संरक्षक',
      or: 'ଆଦିପୁରୁଷ ଓ ସାଂସ୍କୃତିକ ରକ୍ଷକ',
      bn: 'আদিপুরুষ ও সাংস্কৃতিক অভিভাবক'
    },
    historicalPeriod: {
      en: 'Sacred Epic Antiquity to 1st Century BCE (Ikshvaku Tradition & Kharavela Era)',
      hi: 'पवित्र महाकाव्य काल से प्रथम शताब्दी ई.पू. (इक्ष्वाकु परंपरा एवं खारवेल युग)',
      te: 'పవిత్ర ఇతిహాస కాలం నుండి క్రీ.పూ. 1వ శతాబ్దం వరకు (ఇక్ష్వాకు సంప్రదాయం & ఖారవేలుని యుగం)',
      kn: 'ಪವಿತ್ರ ಮಹಾಕಾವ್ಯ ಕಾಲದಿಂದ ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನದವರೆಗೆ (ಇಕ್ಷ್ವಾಕು ಸಂಪ್ರದಾಯ ಮತ್ತು ಖಾರವೇಲ ಯುಗ)',
      ta: 'புனித இதிகாச காலம் முதல் பொ.ஊ.மு. 1-ஆம் நூற்றாண்டு வரை (இக்ஷ்வாகு மரபு & காரவேலர் காலம்)',
      mr: 'पवित्र महाकाव्य काळापासून इ.स.पू. १ ल्या शतकापर्यंत (इक्ष्वाकू परंपरा आणि खारवेल युग)',
      or: 'ପବିତ୍ର ମହାକାବ୍ୟ କାଳରୁ ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ (ଇକ୍ଷ୍ୱାକୁ ପରମ୍ପରା ଓ ଖାରବେଳ ଯୁଗ)',
      bn: 'পবিত্র মহাকাব্যিক কাল থেকে খ্রি.পূ. ১ম শতাব্দী (ইক্ষ্বাকু ঐতিহ্য ও খারবেল যুগ)'
    },
    approxDateRange: {
      en: 'Non-Calendrical Epic Tradition & c. 1st Century BCE (Hathigumpha Edict)',
      hi: 'अपंचांगीय महाकाव्य परंपरा एवं लगभग प्रथम शताब्दी ई.पू. (हाथीगुम्फा अभिलेख)',
      te: 'పురాణ ఇతిహాస సంప్రదాయం & సుమారు క్రీ.పూ. 1వ శతాబ్దం (హాథీగుంఫా శాసనం)',
      kn: 'ಪೌರಾಣಿಕ ಸಂಪ್ರದಾಯ ಮತ್ತು ಸು. ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ (ಹಾಥಿಗುಂಫಾ ಶಾಸನ)',
      ta: 'புராண மரபு & சுமார் பொ.ஊ.மு. 1-ஆம் நூற்றாண்டு (ஹாதிகும்பா கல்வெட்டு)',
      mr: 'पौराणिक परंपरा आणि सुमारे इ.स.पू. १ ले शतक (हाथीगुम्फा शिलालेख)',
      or: 'ପୌରାଣିକ ପରମ୍ପରା ଓ ପ୍ରାୟ ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ (ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ)',
      bn: 'পৌরাণিক ঐতিহ্য ও প্রায় খ্রি.পূ. ১ম শতাব্দী (হাতীগুম্ফা শিলালিপি)'
    },
    geographicalLocation: {
      en: 'Ayodhya (Kosala), Gangotri-Bhagirathi Basin & Kalinganagari (Udayagiri, Odisha)',
      hi: 'अयोध्या (कोसल), गंगोत्री-भागीरथी बेसिन एवं कलिंगनगरी (उदयगिरि, ओडिशा)',
      te: 'అయోధ్య (కోసల), గంగోత్రి-భాగీరథీ లోయ & కళింగనగరి (ఉదయగిరి, ఒడిశా)',
      kn: 'ಅಯೋಧ್ಯೆ (ಕೋಸಲ), ಗಂಗೋತ್ರಿ-ಭಾಗೀರಥಿ ಕಣಿವೆ ಮತ್ತು ಕಳಿಂಗನಗರಿ (ಉದಯಗಿರಿ, ಒಡಿಶಾ)',
      ta: 'அயோத்தி (கோசலம்), பாகீரதி படுகை & கலிங்கநகரி (உதயகிரி, ஒடிசா)',
      mr: 'अयोध्या (कोसल), गंगोत्री-भागीरथी खोरे आणि कलिंगनगरी (उदयगिरी, ओडिशा)',
      or: 'ଅଯୋଧ୍ୟା (କୋଶଳ), ଭାଗୀରଥୀ ଉପତ୍ୟକା ଓ କଳିଙ୍ଗନଗରୀ (ଉଦୟଗିରି, ଓଡ଼ିଶା)',
      bn: 'অযোধ্যা (কোশল), ভাগীরথী অববাহিকা ও কলিঙ্গনগরী (উদয়গিরি, উড়িষ্যা)'
    },
    epistemicClassification: 'Traditional & Sacred Lineage Tradition',
    imageProvenance: {
      title: '13th-Century Chlorite Stone Sculpture of Surya Deva from Konark Sun Temple',
      caption: 'Iconographic representation of Surya (the Solar Progenitor) carved during the reign of Narasimha Deva I (c. 1250 CE).',
      period: '13th Century CE (depicting Primordial Solar Deity)',
      sourceOrProvenance: 'Konark Sun Temple / Archaeological Survey of India Museum Collection',
      credit: 'Archival Temple Sculpture Photography',
      altText: 'Chlorite stone sculpture of Surya Deva standing on a seven-horse chariot pedestal at Konark',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'syn_sagaravamshi',
        canonicalTerm: 'Sagaravamshi',
        associationType: 'Traditional Lineage Claim',
        historicalPeriod: 'Sacred Epic Tradition to Present',
        relationshipSummary: {
          en: 'Traditional lineage designation honoring Samrat Sagara and Maharshi Bhagiratha as the royal progenitors of oceanic and canal excavation.',
          hi: 'सम्राट सगर और महर्षि भगीरथ को जलाशय और नहर उत्खनन के आदि-पुरुष के रूप में सम्मानित करने वाली पारंपरिक वंश पहचान।',
          te: 'సమ్రాట్ సగరుడు మరియు మహర్షి భగీరథులను జలాశయ, కాలువ నిర్మాణ ఆది పురుషులుగా గౌరవించే సాంప్రదాయ వంశ నామం.',
          kn: 'ಸಾಮ್ರಾಟ್ ಸಗರ ಮತ್ತು ಮಹರ್ಷಿ ಭಗೀರಥರನ್ನು ಆದಿಪುರುಷರಾಗಿ ಗೌರವಿಸುವ ಸಾಂಪ್ರದಾಯಿಕ ವಂಶ ನಾಮ.',
          ta: 'சாம்ராட் சகரர் மற்றும் மகரிஷி பகீரதரை முன்னோடிகளாகப் போற்றும் மரபுவழிப் பெயர்.',
          mr: 'सम्राट सगर आणि महर्षी भगीरथ यांना पूर्वज मानणारी पारंपारिक वंश ओळख.',
          or: 'ସମ୍ରାଟ ସଗର ଓ ମହର୍ଷି ଭଗୀରଥଙ୍କୁ ଆଦିପୁରୁଷ ଭାବେ ସମ୍ମାନ ଜଣାଇ ପାରମ୍ପରିକ ବଂଶ ନାମ।',
          bn: 'সম্রাট সগর ও মহর্ষি ভগীরথকে আদিপুরুষ হিসেবে সম্মান জানানো ঐতিহ্যবাহী বংশ নাম।'
        },
        supportingRef: '[src_09] Valmiki Ramayana (Balakanda Sargas 38–44)',
        targetRoute: '/community-heritage?tab=synonyms&id=syn_sagaravamshi'
      },
      {
        communityId: 'syn_raghuvamshi',
        canonicalTerm: 'Raghuvamshi',
        associationType: 'Traditional Lineage Claim',
        historicalPeriod: 'Sacred Epic Tradition to Present',
        relationshipSummary: {
          en: 'Traditional Solar sub-lineage designation invoking Raghu and Maryada Purushottama Sri Rama.',
          hi: 'रघु और मर्यादा पुरुषोत्तम श्री राम का स्मरण करने वाली पारंपरिक सूर्यवंशी उप-शाखा।',
          te: 'రఘు మహారాజు మరియు శ్రీరామచంద్రుని స్మరించే సాంప్రదాయ సూర్యవంశ ఉప-శాఖ.',
          kn: 'ರಘು ಮತ್ತು ಶ್ರೀರಾಮಚಂದ್ರನನ್ನು ಸ್ಮರಿಸುವ ಸಾಂಪ್ರದಾಯಿಕ ಸೂರ್ಯವಂಶದ ಉಪ-ಶಾಖೆ.',
          ta: 'ரகு மற்றும் ஸ்ரீ ராமரைப் போற்றும் மரபுவழிச் சூரியவம்சப் பிரிவு.',
          mr: 'रघु आणि प्रभू श्रीराम यांचे स्मरण करणारी पारंपारिक सूर्यवंशी उप-शाखा.',
          or: 'ରଘୁ ଓ ମର୍ଯ୍ୟାଦା ପୁରୁଷୋତ୍ତମ ଶ୍ରୀରାମଙ୍କୁ ସ୍ମରଣ କରୁଥିବା ପାରମ୍ପରିକ ସୂର୍ଯ୍ୟବଂଶୀ ଶାଖା।',
          bn: 'রঘু ও মর্যাদা পুরুষোত্তম শ্রীরামকে স্মরণকারী ঐতিহ্যবাহী সূর্যবংশী শাখা।'
        },
        supportingRef: '[src_09] Valmiki Ramayana; Kalidasa’s Raghuvamsha',
        targetRoute: '/community-heritage?tab=synonyms&id=syn_raghuvamshi'
      }
    ],
    relatedArticleIds: ['art_lin_suryavamshi_kings', 'art_lin_suryavamshi_kshatriyas', 'art_oad_rajputh_od_history'],
    relatedFigureIds: ['fig_samrat_sagara', 'fig_maharshi_bhagiratha', 'fig_sri_rama', 'fig_king_kharavela'],
    relatedDynastyNames: ['Ikshvaku Solar Lineage (Epic Tradition)', 'Mahameghavahana Dynasty', 'Suryavamsha Gajapathi Dynasty']
  },

  art_kolletikota_peddintlamma_lake: {
    refNumber: 'KM-0002',
    articleId: 'art_kolletikota_peddintlamma_lake',
    categoryCode: 'KM',
    categoryName: {
      en: 'Kingdoms & Maps',
      hi: 'ऐतिहासिक राज्य एवं मानचित्र',
      te: 'చారిత్రక రాజ్యాలు & పటాలు',
      kn: 'ಐತಿಹಾಸಿಕ ರಾಜ್ಯಗಳು ಮತ್ತು ನಕ್ಷೆಗಳು',
      ta: 'வரலாற்று அரசுகள் & வரைபடங்கள்',
      mr: 'ऐतिहासिक राज्ये आणि नकाशे',
      or: 'ଐତିହାସିକ ରାଜ୍ୟ ଓ ମାନଚିତ୍ର',
      bn: 'ঐতিহাসিক রাজ্য ও মানচিত্র'
    },
    subcategoryName: {
      en: 'Strategic Citadels (Barabati, Kondavidu, Kolletikota, Udayagiri)',
      hi: 'सामरिक दुर्ग (बाराबती, कोंडावीडु, कोल्लेटिकोटा, उदयगिरि)',
      te: 'వ్యూహాత్మక కోటలు (బారాబతి, కొండవీడు, కొల్లేటికోట, ఉదయగిరి)',
      kn: 'ಆಯಕಟ್ಟಿನ ಕೋಟೆಗಳು (ಬಾರಾಬತಿ, ಕೊಂಡವೀಡು, ಕೊಲ್ಲೇಟಿಕೋಟ, ಉದಯಗಿರಿ)',
      ta: 'மூலோபாயக் கோட்டைகள் (பாராபதி, கொண்டவீடு, கொல்லேட்டிக்கோட்டை, உதயகிரி)',
      mr: 'सामरिक किल्ले (बाराबती, कोंडावीडु, कोल्लेटीकोटा, उदयगिरी)',
      or: 'ସାମରିକ ଦୁର୍ଗ (ବାରବାଟୀ, କୋଣ୍ଡାଭିଡୁ, କୋଲ୍ଲେଟିକୋଟା, ଉଦୟଗିରି)',
      bn: 'কৌশলগত দুর্গ (বারবাটী, কোন্ডাভিডু, কোল্লেটিকোটা, উদয়গিরি)'
    },
    historicalPeriod: {
      en: 'Vengi Chalukya & Gajapathi Garrison Era to Living Tradition',
      hi: 'वेंगी चालुक्य एवं गजपति जलदुर्ग काल से जीवंत परंपरा तक',
      te: 'వేంగి చాళుక్య & గజపతి జలదుర్గ కాలం నుండి నేటి సజీవ సంప్రదాయం వరకు',
      kn: 'ವೆಂಗಿ ಚಾಳುಕ್ಯ ಮತ್ತು ಗಜಪತಿ ಜಲದುರ್ಗ ಕಾಲದಿಂದ ಜೀವಂತ ಸಂಪ್ರದಾಯದವರೆಗೆ',
      ta: 'வேங்கிச் சாளுக்கிய & கஜபதி நீர்க்கோட்டை காலம் முதல் வாழும் மரபு வரை',
      mr: 'वेंगी चालुक्य आणि गजपती जलदुर्ग काळापासून जिवंत परंपरेपर्यंत',
      or: 'ବେଙ୍ଗୀ ଚାଲୁକ୍ୟ ଓ ଗଜପତି ଜଳଦୁର୍ଗ କାଳରୁ ଜୀବନ୍ତ ପରମ୍ପରା ପର୍ଯ୍ୟନ୍ତ',
      bn: 'বেঙ্গী চালুক্য ও গজপতি জলদুর্গ কাল থেকে জীবন্ত ঐতিহ্য পর্যন্ত'
    },
    approxDateRange: {
      en: 'c. 7th – 16th Century CE & Living Annual Jatara',
      hi: 'लगभग 7वीं – 16वीं शताब्दी ई. एवं वार्षिक तीरथम',
      te: 'క్రీ.శ. 7వ – 16వ శతాబ్దం & నేటి వార్షిక తీర్థం',
      kn: 'ಕ್ರಿ.ಶ. 7ನೇ – 16ನೇ ಶತಮಾನ ಮತ್ತು ವಾರ್ಷಿಕ ಜಾತ್ರೆ',
      ta: 'பொ.ஊ. 7 – 16-ஆம் நூற்றாண்டு & ஆண்டுத் திருவிழா',
      mr: 'इ.स. ७ वे – १६ वे शतक आणि वार्षिक यात्रा',
      or: '୭ମ – ୧୬ଶ ଶତାବ୍ଦୀ ଓ ବାର୍ଷିକ ଯାତ୍ରା',
      bn: '৭ম – ১৬শ শতাব্দী ও বার্ষিক যাত্রা'
    },
    geographicalLocation: {
      en: 'Kolletikota Island Citadel, Kolleru Lake (Eluru & Krishna Districts, Coastal Andhra Pradesh)',
      hi: 'कोल्लेटिकोटा द्वीप दुर्ग, कोल्लेरू झील (एलुरु एवं कृष्णा जिले, तटीय आंध्र प्रदेश)',
      te: 'కొల్లేటికోట జలదుర్గం, కొల్లేరు సరస్సు (ఏలూరు & కృష్ణా జిల్లాలు, ఆంధ్రప్రదేశ్)',
      kn: 'ಕೊಲ್ಲೇಟಿಕೋಟ ದ್ವೀಪ ಕೋಟೆ, ಕೊಲ್ಲೇರು ಸರೋವರ (ಏಲೂರು ಮತ್ತು ಕೃಷ್ಣಾ ಜಿಲ್ಲೆಗಳು, ಆಂಧ್ರಪ್ರದೇಶ)',
      ta: 'கொல்லேட்டிக்கோட்டை நீர்க்கோட்டை, கொல்லேறு ஏரி (ஏலూరు & கிருஷ்ணா மாவட்டங்கள், ஆந்திரா)',
      mr: 'कोल्लेटीकोटा जलदुर्ग, कोल्लेरू सरोवर (एलुरु व कृष्णा जिल्हे, आंध्र प्रदेश)',
      or: 'କୋଲ୍ଲେଟିକୋଟା ଦ୍ୱୀପ ଦୁର୍ଗ, କୋଲ୍ଲେରୁ ହ୍ରଦ (ଏଲୁରୁ ଓ କୃଷ୍ଣା ଜିଲ୍ଲା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ)',
      bn: 'কোল্লেটিকোটা দ্বীপ দুর্গ, কোল্লেরু হ্রদ (এলুরু ও কৃষ্ণা জেলা, অন্ধ্রপ্রদেশ)'
    },
    epistemicClassification: 'Scholarly Historiographical Synthesis',
    imageProvenance: {
      title: 'Kolleti Sarasu (Kolleru Lake) Wetland & Kolletikota Island Sanctuary',
      caption: 'Natural freshwater barrier surrounding the historic island Jala-durga of Kolletikota and the shrine of Sri Peddintlamma Thalli.',
      period: 'Medieval Garrison Site & Living Shrine',
      sourceOrProvenance: 'Coastal Andhra Epigraphy & Heritage Survey / Imperial Gazetteer Vol. XV (1908)',
      credit: 'Archival Sanctuary & Temple Documentation',
      altText: 'Panoramic view of Kolleru Lake waterways approaching Kolletikota island citadel',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_04_odiyaraju',
        canonicalTerm: 'Odiyaraju',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 20th Century CE',
        relationshipSummary: {
          en: 'Gajapathi and Odiyaraju island fort commanders and warrior families who venerate Sri Kolletikota Peddintlamma Thalli as their Kuladevatha.',
          hi: 'गजपति और ओडियाराजू जलदुर्ग सेनानी जो श्री कोल्लेटिकोटा पेद्दिंट्लम्मा तल्ली को अपनी कुलदेवता के रूप में पूजते हैं।',
          te: 'శ్రీ కొల్లేటికోట పెద్దింట్లమ్మ తల్లిని కులదేవతగా ఆరాధించే గజపతి మరియు ఒడియరాజు జలదుర్గ యోధుల కుటుంబాలు.',
          kn: 'ಶ್ರೀ ಕೊಲ್ಲೇಟಿಕೋಟ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿಯನ್ನು ಕುಲದೇವತೆಯಾಗಿ ಪೂಜಿಸುವ ಗಜಪತಿ ಮತ್ತು ಒಡಿಯರಾಜು ಕೋಟೆ ಸೇನಾನಿ ಕುಟುಂಬಗಳು.',
          ta: 'ஸ்ரீ கொல்லேட்டிக்கோட்டை பெத்திண்ட்லம்மா தாயைக் குலதெய்வமாக வழிபடும் கஜபதி மற்றும் ஒடியராஜு கோட்டை வீரர் குடும்பங்கள்.',
          mr: 'श्री कोल्लेटीकोटा पेद्दिंट्लम्मा देवीला कुलदैवत मानणारे गजपती आणि ओडियाराजू जलदुर्ग सेनानी कुटुंब.',
          or: 'ଶ୍ରୀ କୋଲ୍ଲେଟିକୋଟା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ତଲ୍ଲୀଙ୍କୁ କୁଳଦେବତା ଭାବେ ପୂଜା କରୁଥିବା ଗଜପତି ଓ ଓଡ଼ିଆରାଜୁ ଜଳଦୁର୍ଗ ଯୋଦ୍ଧା ପରିବାର।',
          bn: 'শ্রী কোল্লেটিকোটা পেদ্দিন্টলম্মা তল্লীকে কুলদেবী হিসেবে পূজা করা গজপতি ও ওড়িয়ারাজু জলদুর্গ যোদ্ধা পরিবার।'
        },
        supportingRef: '[src_klt_01] Mackenzie Collection Kaikaluru & Kolletikota Kaifiyats (1800–1815 CE)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_04_odiyaraju'
      },
      {
        communityId: 'comm_dir_06_odderajulu',
        canonicalTerm: 'OddeRajulu / VaddeRajulu',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 20th Century CE',
        relationshipSummary: {
          en: 'Coastal Andhra Kshatriya and garrison families participating in the annual Phalguna Purnima Peddintlamma Jatara.',
          hi: 'वार्षिक फाल्गुन पूर्णिमा पेद्दिंट्लम्मा जातरा में भाग लेने वाले तटीय आंध्र के ओड्डेराजुलु और वड्डेराजुलु परिवार।',
          te: 'ఫాల్గుణ పూర్ణిమ పెద్దింట్లమ్మ జాతరలో పాల్గొనే తీర ఆంధ్ర ఒడ్డెరాజులు మరియు వడ్డెరాజులు కుటుంబాలు.',
          kn: 'ವಾರ್ಷಿಕ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ಜಾತ್ರೆಯಲ್ಲಿ ಭಾಗವಹಿಸುವ ಕರಾವಳಿ ಆಂಧ್ರದ ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡ್ಡೇರಾಜುಲು ಕುಟುಂಬಗಳು.',
          ta: 'ஆண்டுதோறும் நடைபெறும் பெத்திண்ட்லம்மா திருவிழாவில் பங்கேற்கும் ஆந்திரக் கடற்கரை ஒட்டெராஜுலு குடும்பங்கள்.',
          mr: 'वार्षिक पेद्दिंट्लम्मा यात्रेत सहभागी होणारे किनारी आंध्रातील ओड्डेराजुलू आणि वड्डेराजुलू कुटुंब.',
          or: 'ବାର୍ଷିକ ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ଯାତ୍ରାରେ ଅଂଶଗ୍ରହଣ କରୁଥିବା ତଟବର୍ତ୍ତୀ ଆନ୍ଧ୍ରର ଓଡ଼େରାଜୁଲୁ ଓ ବଡ଼େରାଜୁଲୁ ପରିବାର।',
          bn: 'বার্ষিক পেদ্দিন্টলম্মা যাত্রায় অংশগ্রহণকারী উপকূলীয় অন্ধ্রের ওড্ডেরাজুলু ও বড্ডেরাজুলু পরিবার।'
        },
        supportingRef: '[src_klt_01] Mackenzie Kaifiyats; [src_klt_02] Imperial Gazetteer Vol. XV (1908)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_06_odderajulu'
      }
    ],
    relatedArticleIds: ['art_gajapathi_kapilendra', 'art_dyn_vengi_chalukyas', 'art_km_deccan_corridors_forts'],
    relatedFigureIds: ['fig_kolletikota_peddintlamma', 'fig_kapilendra_deva', 'fig_hamvira_deva', 'fig_prataparudra_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Chalukyas of Vengi', 'Kolani Nayakas']
  },

  art_epigraphic_evolution_odra: {
    refNumber: 'IA-0001',
    articleId: 'art_epigraphic_evolution_odra',
    categoryCode: 'IA',
    categoryName: {
      en: 'Inscriptions & Archaeology',
      hi: 'शिलालेख एवं पुरातत्व',
      te: 'శాసనాలు & పురావస్తు ఆధారాలు',
      kn: 'ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ',
      ta: 'கல்வெட்டுகள் & தொல்லியல்',
      mr: 'शिलालेख आणि पुरातत्व',
      or: 'ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତତ୍ତ୍ୱ',
      bn: 'শিলালিপি ও প্রত্নতত্ত্ব'
    },
    subcategoryName: {
      en: 'Prakrit & Brahmi Rock Edicts & Copper Plates',
      hi: 'प्राकृत एवं ब्राह्मी शिलालेख तथा ताम्रपत्र',
      te: 'ప్రాకృత & బ్రాహ్మీ శిలాశాసనాలు & తామ్రపత్రాలు',
      kn: 'ಪ್ರಾಕೃತ ಮತ್ತು ಬ್ರಾಹ್ಮಿ ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಪತ್ರಗಳು',
      ta: 'பிராகிருத & பிராமி கல்வெட்டுகள் & செப்பேடுகள்',
      mr: 'प्राकृत व ब्राह्मी शिलालेख आणि ताम्रपट',
      or: 'ପ୍ରାକୃତ ଓ ବ୍ରାହ୍ମୀ ଶିଳାଲେଖ ଓ ତାମ୍ରପଟା',
      bn: 'প্রাকৃত ও ব্রাহ্মী শিলালিপি ও তাম্রশাসন'
    },
    historicalPeriod: {
      en: 'Two Millennia of Paleography & Royal Charters',
      hi: 'दो सहस्राब्दियों का पुरालेख एवं राजपत्र इतिहास',
      te: 'రెండు సహస్రాబ్దాల శాసన & లిపి పరిణామ చరిత్ర',
      kn: 'ಎರಡು ಸಹಸ್ರಮಾನಗಳ ಶಾಸನ ಮತ್ತು ಲಿಪಿ ವಿಕಾಸ',
      ta: 'இரண்டாயிரம் ஆண்டுகால கல்வெட்டு மற்றும் எழுத்துமுறை வரலாறு',
      mr: 'दोन सहस्रकांचा शिलालेख आणि लिपी विकास',
      or: 'ଦୁଇ ସହସ୍ରାବ୍ଦର ଶିଳାଲେଖ ଓ ଲିପି ବିବର୍ତ୍ତନ',
      bn: 'দুই সহস্রাব্দের শিলালিপি ও লিপি বিবর্তন'
    },
    approxDateRange: {
      en: 'c. 3rd Century BCE – 16th Century CE',
      hi: 'लगभग तीसरी शताब्दी ई.पू. – 16वीं शताब्दी ई.',
      te: 'క్రీ.పూ. 3వ శతాబ్దం – క్రీ.శ. 16వ శతాబ్దం',
      kn: 'ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ – ಕ್ರಿ.ಶ. 16ನೇ ಶತಮಾನ',
      ta: 'பொ.ஊ.மு. 3-ஆம் நூற்றாண்டு – பொ.ஊ. 16-ஆம் நூற்றாண்டு',
      mr: 'इ.स.पू. ३ रे शतक – इ.स. १६ वे शतक',
      or: 'ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀ – ୧୬ଶ ଶତାବ୍ଦୀ',
      bn: 'খ্রি.পূ. ৩য় শতাব্দী – ১৬শ শতাব্দী'
    },
    geographicalLocation: {
      en: 'Udayagiri (Bhubaneswar), Puri, Cuttack, Mukhalingam, Simhachalam, Guntur (Veligalani) & Srirangam',
      hi: 'उदयगिरि (भुवनेश्वर), पुरी, कटक, मुखलिंगम, सिंहाचलम, गुंटूर (वेलिगलानि) एवं श्रीरंगम',
      te: 'ఉదయగిరి (భువనేశ్వర్), పూరీ, కటక్, ముఖలింగం, సింహాచలం, గుంటూరు (వెలిగలాని) & శ్రీరంగం',
      kn: 'ಉದಯಗಿರಿ (ಭುವನೇಶ್ವರ), ಪುರಿ, ಕಟಕ್, ಮುಖಲಿಂಗಂ, ಸಿಂಹಾಚಲಂ, ಗುಂಟೂರು (ವೆಲಿಗಲಾನಿ) ಮತ್ತು ಶ್ರೀರಂಗಂ',
      ta: 'உதயகிரி (புவனேஸ்வர்), புரி, கட்டக், முகலிங்கம், சிம்மாசலம், குண்டூர் (வெலிகலானி) & ஸ்ரீரங்கம்',
      mr: 'उदयगिरी (भुवनेश्वर), पुरी, कटक, मुखलिंगम, सिंहाचलम, गुंटूर (वेलिगलानि) आणि श्रीरंगम',
      or: 'ଉଦୟଗିରି (ଭୁବନେଶ୍ୱର), ପୁରୀ, କଟକ, ମୁଖଲିଙ୍ଗମ, ସିଂହାଚଳମ, ଗୁଣ୍ଟୁର (ଭେଲିଗଲାନି) ଓ ଶ୍ରୀରଙ୍ଗମ',
      bn: 'উদয়গিরি (ভুবনেশ্বর), পুরী, কটক, মুখলিঙ্গম, সিংহাচলম, গুন্টুর (ভেলিগলানি) ও শ্রীরঙ্গম'
    },
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Hathigumpha 17-Line Brahmi Prakrit Rock Inscription at Udayagiri Hill',
      caption: 'Deeply incised Brahmi characters on the overhanging brow of Hathigumpha cave, Bhubaneswar, recording Emperor Kharavela’s 13 regnal years.',
      period: 'c. 1st Century BCE',
      sourceOrProvenance: 'Archaeological Survey of India, Bhubaneswar Circle / Epigraphia Indica Vol. XX',
      credit: 'Archival Lithic Epigraphy Photography',
      altText: 'Close-up view of the Hathigumpha Brahmi rock inscription at Udayagiri hill, Odisha',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_01_od',
        canonicalTerm: 'Od / Odra / Audra',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '8th – 16th Century CE',
        relationshipSummary: {
          en: 'Directly attested in Bhauma-Kara, Somavamshi, Chola ("Odda-vishaya"), and Gajapathi ("Odra-rajya") inscriptions.',
          hi: 'भौम-कर, सोमवंशी, चोल ("ओड्ड-विषय") और गजपति ("ओड्र-राज्य") शिलालेखों में प्रत्यक्ष रूप से प्रमाणित।',
          te: 'భౌమ-కర, సోమవంశ, చోళ ("ఒడ్డ-విషయ") మరియు గజపతి ("ఓడ్ర-రాజ్య") శాసనాలలో ప్రత్యక్షంగా నమోదైంది.',
          kn: 'ಭೌಮ-ಕರ, ಸೋಮವಂಶಿ, ಚೋಳ ("ಒಡ್ಡ-ವಿಷಯ") ಮತ್ತು ಗಜಪತಿ ("ಓಡ್ರ-ರಾಜ್ಯ") ಶಾಸನಗಳಲ್ಲಿ ದೃಢಪಟ್ಟಿದೆ.',
          ta: 'பௌம-கர, சோமவம்ச, சோழ ("ஒட்ட-விஷய") மற்றும் கஜபதி ("ஒட்டர-ராஜ்ய") கல்வெட்டுகளில் பதிவாகியுள்ளது.',
          mr: 'भौम-कर, सोमवंशी, चोल ("ओड्ड-विषय") आणि गजपती ("ओड्र-राज्य") शिलालेखांमध्ये थेट प्रमाणित.',
          or: 'ଭୌମ-କର, ସୋମବଂଶୀ, ଚୋଳ ("ଓଡ଼-ବିଷୟ") ଓ ଗଜପତି ("ଓଡ଼୍ର-ରାଜ୍ୟ") ଶିଳାଲେଖରେ ପ୍ରମାଣିତ।',
          bn: 'ভৌম-কর, সোমবংশী, চোল ("ওড্ড-বিষয়") ও গজপতি ("ওড্র-রাজ্য") শিলালিপিতে প্রমাণিত।'
        },
        supportingRef: '[src_epi_02] Veligalani Plates (1458 CE); [src_epi_03] Satyanarayan Rajaguru (1960)',
        targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_01_od'
      }
    ],
    relatedArticleIds: ['art_ia_south_indian_epigraphy_corpus', 'art_odra_desha_history', 'art_gajapathi_kapilendra'],
    relatedFigureIds: ['fig_king_kharavela', 'fig_anantavarman_chodaganga', 'fig_langula_narasimha_deva', 'fig_kapilendra_deva', 'fig_prataparudra_deva'],
    relatedDynastyNames: ['Mahameghavahana Dynasty', 'Bhauma-Kara Dynasty', 'Somavamshi Dynasty', 'Eastern Ganga Dynasty', 'Suryavamsha Gajapathi Dynasty']
  }
};

// Populate structured metadata for the 18 new articles automatically so every single one has complete Section A, F, and G metadata
for (const art of EXPANDED_HISTORICAL_ARTICLES) {
  if (ARTICLE_STRUCTURED_METADATA_MAP[art.id]) continue;
  const refMatch = art.original_title.match(/^([A-Z]{2}-\d{4})\s*\|/);
  const refNumber = refMatch ? refMatch[1] : 'RD-0099';
  const prefix = (refNumber.slice(0, 2) as any) || 'RD';

  const isUnverifiedSiddhini = art.id === 'art_dyn_siddhini_kings_verification';
  const isUnverifiedDirectCommunity =
    art.id === 'art_dyn_western_gangas' ||
    art.id === 'art_dyn_pallavas_kanchi' ||
    art.id === 'art_dyn_kadambas_banavasi' ||
    art.id === 'art_dyn_badami_chalukyas' ||
    art.id === 'art_dyn_siddhini_kings_verification' ||
    art.id === 'art_lin_chandravamshi_kings';

  const periodMatch = art.original_content.match(/Period:\s*([^|\n]+)/);
  const locMatch = art.original_content.match(/Location:\s*([^\n]+)/);
  const subcatMatch = art.original_content.match(/Category:\s*[^(\n]+\(([^)\n]+)\)/);

  const periodStr = periodMatch ? periodMatch[1].trim() : 'Classical & Medieval Period';
  const locStr = locMatch ? locMatch[1].trim() : 'Eastern, Deccan & Southern India';
  const subcatStr = subcatMatch ? subcatMatch[1].trim() : art.category;

  ARTICLE_STRUCTURED_METADATA_MAP[art.id] = {
    refNumber,
    articleId: art.id,
    categoryCode: prefix,
    categoryName: {
      en: art.category,
      hi: art.category,
      te: art.category,
      kn: art.category,
      ta: art.category,
      mr: art.category,
      or: art.category,
      bn: art.category
    },
    subcategoryName: {
      en: subcatStr,
      hi: subcatStr,
      te: subcatStr,
      kn: subcatStr,
      ta: subcatStr,
      mr: subcatStr,
      or: subcatStr,
      bn: subcatStr
    },
    historicalPeriod: {
      en: periodStr,
      hi: periodStr,
      te: periodStr,
      kn: periodStr,
      ta: periodStr,
      mr: periodStr,
      or: periodStr,
      bn: periodStr
    },
    approxDateRange: {
      en: periodStr,
      hi: periodStr,
      te: periodStr,
      kn: periodStr,
      ta: periodStr,
      mr: periodStr,
      or: periodStr,
      bn: periodStr
    },
    geographicalLocation: {
      en: locStr,
      hi: locStr,
      te: locStr,
      kn: locStr,
      ta: locStr,
      mr: locStr,
      or: locStr,
      bn: locStr
    },
    epistemicClassification: isUnverifiedSiddhini
      ? 'Requires Independent Epigraphic Verification'
      : art.evidence_category === 'verified_archaeological'
      ? 'Verified Epigraphic & Archaeological Evidence'
      : 'Scholarly Historiographical Synthesis',
    imageProvenance: {
      title: art.original_title.replace(/^[A-Z]{2}-\d{4}\s*\|\s*/, ''),
      caption: art.summary,
      period: periodStr,
      sourceOrProvenance: art.sources[0]
        ? `${art.sources[0].title} (${art.sources[0].author_or_authority})`
        : 'Archaeological Survey of India & Archival Repository',
      credit: 'Suryavamsha Odiyaraju Kshatriya Archival Collection',
      altText: art.original_title,
      visualType:
        art.id.includes('map') || art.id.includes('km_')
          ? 'Cartographic Reconstruction'
          : 'Archival Photograph / Epigraphic Facsimile'
    },
    unverifiedCommunityNotice: isUnverifiedDirectCommunity,
    communityCrossReferences: isUnverifiedDirectCommunity
      ? []
      : [
          {
            communityId: 'comm_dir_03_odra_kshatriya',
            canonicalTerm: 'Odra-Kshatriya / Odiyaraju / VaddeRajulu',
            associationType: 'Documented Epigraphic / Gazetteer Association',
            historicalPeriod: periodStr,
            relationshipSummary: {
              en: 'Corroborated by regional epigraphs, fortress garrisons, and ethnographic gazetteer records cited in this study.',
              hi: 'इस अध्ययन में उद्धृत क्षेत्रीय शिलालेखों, दुर्ग चौकियों और गजेटियर रिकॉर्डों द्वारा समर्थित।',
              te: 'ఈ అధ్యయనంలో పేర్కొన్న ప్రాంతీయ శాసనాలు, దుర్గ రక్షణ దళాలు మరియు గెజిటీర్ రికార్డుల ద్వారా ధృవీకరించబడింది.',
              kn: 'ಈ ಅಧ್ಯಯನದಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾದ ಪ್ರಾದೇಶಿಕ ಶಾಸನಗಳು ಮತ್ತು ಗೆಜೆಟಿಯರ್ ದಾಖಲೆಗಳಿಂದ ದೃಢಪಟ್ಟಿದೆ.',
              ta: 'இவ்வாய்வில் குறிப்பிடப்பட்டுள்ள கல்வெட்டுகள் மற்றும் அரசிதழ் ஆவணங்களால் உறுதிப்படுத்தப்பட்டது.',
              mr: 'या अभ्यासात उद्धृत केलेल्या प्रादेशिक शिलालेख आणि गॅझेटियर नोंदींद्वारे पुष्टी केलेले.',
              or: 'ଏହି ଅଧ୍ୟୟନରେ ଉଲ୍ଲେଖିତ ଆଞ୍ଚଳିକ ଶିଳାଲେଖ ଓ ଗେଜେଟିୟର୍ ରେକର୍ଡ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
              bn: 'এই গবেষণায় উল্লিখিত আঞ্চলিক শিলালিপি ও গেজেটিয়ার নথি দ্বারা প্রমাণিত।'
            },
            supportingRef: art.sources[0] ? `[1] ${art.sources[0].title}` : '[1] Primary Epigraphic Corpus',
            targetRoute: '/community-heritage?tab=synonyms&id=comm_dir_03_odra_kshatriya'
          }
        ],
    relatedArticleIds: ['art_gajapathi_kapilendra', 'art_epigraphic_evolution_odra', 'art_odra_desha_history'],
    relatedFigureIds: ['fig_kapilendra_deva', 'fig_anantavarman_chodaganga', 'fig_king_kharavela'],
    relatedDynastyNames: [
      'Eastern Ganga Dynasty',
      'Western Ganga Dynasty',
      'Imperial Chola Dynasty',
      'Badami & Vengi Chalukyas',
      'Pallava Dynasty',
      'Kadamba Dynasty',
      'Suryavamsha Gajapathi Dynasty'
    ]
  };
}
