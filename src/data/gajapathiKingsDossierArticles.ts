import type { Article, LanguageCode, SourceReference } from '../types/index.ts';
import type { ArticleStructuredMetadata } from './sevenCategoriesExpansionData.ts';
import {
  GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_ARTICLES,
  GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_METADATA,
  GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_TRANSLATIONS,
  getProfessionalHeritageCategoriesForArticle
} from './gajapathiMonarchsAndInscriptionsArticles.ts';
import {
  SPECIFIC_METADATA_8LANG_MAP,
  COMMUNITY_RELATIONSHIP_TRANSLATIONS_8LANG,
  buildNativeSummaryForArticle,
  buildNative10ChapterContentForArticle,
  localizeAuthorName,
  localizeSourcesList
} from './gajapathiCompleteMultilingual10ChapterTranslations.ts';

const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

/**
 * COMPLETE SCHOLARLY MONOGRAPH ARTICLES FOR GAJAPATHI-KINGS ROYAL DYNASTY
 * & IMPERIAL ADMINISTRATION / MILITARY / CULTURAL DOSSIER RECORDS
 *
 * Strictly preserves existing Record IDs & Reference IDs:
 * - RD-0014: dyn_suryavamsha_gajapathi
 * - RD-0015: dyn_eastern_ganga
 * - RD-0016: dyn_bhoi_mukunda
 * - RD-0017: dyn_traditional_suryavamsha_lineages
 * - RD-0018: admin-mahapatras
 * - RD-0019: admin-nayakas
 * - RD-0020: military-gajasena
 * - RD-0021: culture-renaissance
 * - KD-0023: dyn_kakatiya_orugallu
 */

export const GAJAPATHI_KINGS_DOSSIER_ARTICLES: Article[] = [
  // ==========================================================================
  // 1. RD-0014: dyn_suryavamsha_gajapathi
  // ==========================================================================
  {
    id: 'dyn_suryavamsha_gajapathi',
    slug: 'suryavamsha-gajapathi-imperial-dynasty-1434-1541-ce',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0014 | Suryavamsha Gajapathi Imperial Dynasty (1434–1541 CE): Epigraphic Sovereign History, Tri-Kalinga Polity & Theocratic Statecraft',
    summary:
      'Comprehensive dynastic dossier of the Suryavamsha Gajapathi Empire (1434–1541 CE) at Abhinava Varanasi Kataka (Cuttack), examining its rise under Samrat Kapilendra Deva, territorial zenith from the Hooghly River to the Kaveri delta, Jagannatha Rauta statecraft, Dandapata administration, and two-way Community-Heritage linkages.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('kapilendra_deva_lingaraja.jpg'),
    tags: [
      'RD-0014',
      'Suryavamsha Gajapathi',
      'Kapilendra Deva',
      'Purushottama Deva',
      'Prataparudra Deva',
      'Kataka',
      'Navakoti Karnata Kalavaragesvara',
      'Odiyaraju',
      'Odra-Khanda'
    ],
    sources: [
      {
        id: 'src_rd14_01',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Dr. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University',
        year_or_era: '1957',
        citation_details: 'Chapters II–VII (Reigns of Kapilendra, Purushottama, and Prataparudra Deva)',
        verified: true
      },
      {
        id: 'src_rd14_02',
        source_type: 'Inscription',
        title: 'Veligalani Copper-Plate Grant of Kapilendra Deva (Saka 1380 / 1458 CE)',
        author_or_authority: 'D.C. Sircar (ed.), Epigraphia Indica, Vol. XXXIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1458 CE',
        citation_details: 'pp. 275–292; Trilingual Sanskrit, Odia, and Telugu imperial charter',
        verified: true
      },
      {
        id: 'src_rd14_03',
        source_type: 'Scholarly Book',
        title: 'The History of the Gajapati Kings of Orissa and Their Successors',
        author_or_authority: 'Prof. Prabhat Mukherjee',
        publication_or_location: 'Cuttack: Kitab Mahal',
        year_or_era: '1981',
        citation_details: 'pp. 18–112 (Chronology, inscriptions, and administrative organization)',
        verified: true
      },
      {
        id: 'src_rd14_04',
        source_type: 'Scholarly Book',
        title: 'The Cult of Jagannath and the Regional Tradition of Orissa',
        author_or_authority: 'Hermann Kulke & Anncharlott Eschmann (eds.)',
        publication_or_location: 'New Delhi: Manohar',
        year_or_era: '1978',
        citation_details: 'pp. 199–228 (Jagannatha Rauta statecraft under the Suryavamsha emperors)',
        verified: true
      }
    ],
    original_content: `1. Introduction & Epigraphic Foundation of the Suryavamsha Gajapathis
Reference ID: RD-0014 | Record ID: dyn_suryavamsha_gajapathi | Period: 1434–1541 CE | Capital: Abhinava Varanasi Kataka (Cuttack, Odisha).
The Suryavamsha Gajapathi Imperial Dynasty (1434–1541 CE) represents the zenith of medieval Odia-Kalinga imperial sovereignty. Founded by Samrat Kapilendra Deva (1434–1466 CE) at Kataka (Abhinava Varanasi Kataka, modern Cuttack) following the extinguishment of the Later Eastern Ganga line under Bhanudeva IV, the dynasty unified the eastern littoral of the Indian subcontinent into a cohesive military and cultural empire. Across a century of sovereign rule under Kapilendra Deva, Purushottama Deva (1466–1497 CE), Prataparudra Deva (1497–1540 CE), and Kakharua Deva (1540–1541 CE), the Suryavamsha monarchs transformed Kalinga-Utkala into a trans-regional power stretching from the Hooghly River (Ganga) in the north to the Pennar and Kaveri river basins (Setu) in the south.

2. Origins, Lineage Nomenclature & Epigraphic Titulature
In primary Sanskrit, Odia, and Telugu inscriptions—most notably the Gopinathpur Temple inscription, the Veligalani copper-plate grant (1458 CE), and the Jagannatha Temple proclamations at Puri—Kapilendra Deva traces his descent to the solar lineage (Suryavamsha) while noting his early service as a senior military commander (Mahasenapati / Nayaka) under the Eastern Ganga court. Upon assuming the throne in 1434 CE, he adopted the unprecedented tri-imperial titulature: "Gajapati Gaudesvara Navakoti Karnata Kalavaragesvara" (Lord of the Elephant Forces, Sovereign of Gauda/Bengal, Master of Nine Crores of Karnata and Kalaburagi/Gulbarga). Each component of this titulature corresponded to documented military victories over the Bengal Sultanate, the Vijayanagara Empire, and the Bahmani Sultanate.

3. Chronological Development of the Four Imperial Reigns (1434–1541 CE)
The chronological trajectory of the dynasty unfolds across four distinct phases:
- Imperial Expansion under Kapilendra Deva (1434–1466 CE): Consolidation of northern Utkala, defeat of the Reddi Kingdom of Rajahmundry and Kondavidu (by 1448–1454 CE), capture of Warangal and Khammamet (1458 CE), and southern expeditions under Prince Hamvira Deva reaching Udayagiri, Kanchipuram, and Srirangam (1464 CE).
- Dynastic Reconquest under Purushottama Deva (1466–1497 CE): Following a succession dispute with his elder brother Hamvira Deva, Purushottama Deva systematically recovered the Rajahmundry, Kondavidu, and Udayagiri Rajyas by 1484–1489 CE and patronized classical Sanskrit and Odia literature.
- Cultural Florescence & Tri-Front Defense under Prataparudra Deva (1497–1540 CE): Confronted by the seven-year Kalinga campaign (1512–1519 CE) of Vijayanagara Emperor Krishnadevaraya and repeated incursions from Husain Shah of Bengal and Quli Qutb-ul-Mulk of Golconda, Prataparudra Deva preserved the Mahanadi-Godavari heartland while presiding over the Panchasakha literary movement and Sri Chaitanya Mahaprabhu's eighteen-year residence at Puri.
- Terminal Crisis under Kalua Deva & Kakharua Deva (1540–1541 CE): Internal ministerial factionalism culminated in the coup of General Govinda Vidyadhara in 1541 CE, establishing the Bhoi dynasty.

4. Important Personalities, Princes & Military Commanders
Beyond the reigning emperors, the administrative and military vitality of the Suryavamsha empire rested upon an elite cadre of princes (Parikshas) and commanders (Mahapatras and Nayakas):
- Mahamandalesvara Hamvira Deva: Eldest son of Kapilendra Deva, leader of the southern campaigns to Warangal (1458 CE), Kanchi, and Srirangam (1464 CE).
- Kumara Mahapatra Dakshina Kapilesvara: Son of Hamvira Deva, appointed Pariksha (Viceroy) of Kondavidu, Kondapalli, Addanki, and Padaidu in 1464 CE.
- Raghudeva Narendra Mahapatra: Nephew of Kapilendra Deva and Viceroy of Rajahmundry Rajya, donor of the Raghudevapura grant (1456 CE).
- Gopinatha Mahapatra: Minister and commander under Kapilendra Deva, builder of the Jagannatha temple at Gopinathpur.
- Raya Ramananda Pattanayak: Scholar-governor (Pariksha) of Rajahmundry under Prataparudra Deva, author of the Sanskrit drama Jagannatha Vallabha Nataka.

5. Kingdoms, Dandapatas & Geographical Context
At its territorial maximum (c. 1464 CE), the Suryavamsha Gajapathi realm encompassed three macro-geographical zones:
- The Northern Zone (Uttara-Khanda): Extending from the Subarnarekha and Hooghly rivers (Mandaran fort) through Midnapore, Jaleswar, Soro, Remuna, and Bhadrak to Jajpur (Viraja Kshetra).
- The Central Core (Mahanadi-Chilika Heartland): Anchored at Barabati Fort in Kataka, Khurda, Puri (Srikshetra), and Konark.
- The Southern Viceroyalties (Dakshina-Rajyas): Divided into Kalinga Dandapata (Kalinganagara/Mukhalingam), Rajamahendravaram Rajya (Godavari delta), Kondavidu Rajya (Guntur-Krishna region with Kondapalli and Bellamkonda forts), and Udayagiri Rajya (Nellore-Pennar frontier).

6. Political & Administrative History: The Jagannatha Rauta Theory
A defining political innovation of the Suryavamsha Gajapathis was the formalization of the "Rauta" (Deputy) state ideology. Continuing and intensifying the tradition initiated by the Later Eastern Gangas, Kapilendra Deva declared Lord Jagannatha of Puri the supreme juridical sovereign (Samrajya-Adhipati) of the empire, positioning the emperor as the deity's "First Servant" (Adya-Sevaka / Rauta). Royal edicts (Rahasyas) were engraved directly on the Jaya-Vijaya doorway of the Puri Jagannatha Temple, remitting unjust taxes (such as the salt and cowrie levies) and warning provincial Mahapatras that disobedience to royal decrees constituted treason (Droha) against Lord Jagannatha Himself.

7. Archaeological Monuments & Inscriptional Corpus
The dynasty's material archive survives in major fortifications and over a hundred copper-plate and stone inscriptions:
- Fortifications: Expansion of Barabati Fort (Kataka), Raibania Fort (Balasore), Potagarh, Kondapalli Fort, Kondavidu Fort, and Udayagiri Fort.
- Sacred Architecture: Construction of the outer Meghanada Prachira fortification wall and Kapotesvara shrines at Puri, the Gopinathpur temple in Cuttack district, and restorations at Simhachalam (Visakhapatnam) and Srikurmam (Srikakulam).
- Key Epigraphs: Veligalani Copper-Plate Grant (1458 CE, trilingual Sanskrit-Odia-Telugu), Warangal Fort Gate Inscription (1458 CE), Srirangam Ranganathaswamy Inscription of Dakshina Kapilesvara (1464 CE), and Prataparudra Deva's Puri Jagannatha Temple linguistic edict (1499 CE).

8. Cultural, Literary & Linguistic Contributions
The Suryavamsha century catalyzed the classical golden age of Odia literature and Vaishnava theology. Under Kapilendra Deva, Sarala Dasa (Siddhesvara Parida) composed the Odia Mahabharata, Vilanka Ramayana, and Chandi Purana in indigenous Dandi Vrutti meter, democratizing scriptural knowledge for agrarian and martial communities. Purushottama Deva authored the Abhinava Gitagovinda and Nama Malika, while Prataparudra Deva compiled the comprehensive Hindu legal digest Sarasvativilasa and patronized the Panchasakha mystic poets—Balarama Dasa, Jagannatha Dasa (author of the Odia Bhagabata), Achyutananda Dasa, Yasovanta Dasa, and Ananta Dasa.

9. Historiographical Analysis: Facts, Traditions & Community Continuity
Modern historiography rigorously distinguishes between primary epigraphic facts and later chronicle traditions:
- Documented Epigraphic Facts: The chronology (1434–1541 CE), military conquests, and administrative hierarchy of the Suryavamsha Gajapathis are verified by dated contemporary stone and copper-plate inscriptions across Odisha, Andhra Pradesh, Telangana, and Tamil Nadu.
- Traditional Chronicle Accounts: The Madala Panji (Puri temple chronicle) and Katakarajavamsavali preserve vivid narrative accounts of Kapilendra's youth and Purushottama's Kanchi-Kaveri expedition; while culturally foundational, their narrative embellishments are cross-checked against epigraphic dates.
- Community-Heritage Continuity: Following the fragmentation of the southern Gajapathi viceroyalties (Rajahmundry, Kondavidu, Udayagiri) in the 16th century, garrisons, fortress engineers, and administrative lineages deriving from the Odra-Kalinga military apparatus remained settled across Andhra, Rayalaseema, Telangana, and Karnataka, preserving ethnonyms such as Odiyaraju (CH-0048), Odderajulu (CH-0006), Vadderarajulu (CH-0013), Gajapathirajulu (CH-0005), and Kalingarajulu (CH-0004).

10. Conclusion & Enduring Imperial Legacy
The Suryavamsha Gajapathi Imperial Dynasty stands as the culminating sovereign architecture of pre-modern Odra-Kalinga civilization. By integrating military excellence (the Gajasena elephant corps and Giri-Durga hill fortress network), multilingual administrative governance (Sanskrit, Odia, and Telugu charters), and vernacular literary patronage, the Suryavamsha monarchs forged a durable civilizational identity that continues to anchor both academic historiography and living Community-Heritage traditions across peninsular India.`
  },

  // ==========================================================================
  // 2. RD-0015: dyn_eastern_ganga
  // ==========================================================================
  {
    id: 'dyn_eastern_ganga',
    slug: 'imperial-eastern-ganga-chodaganga-dynasty-498-1434-ce',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0015 | Imperial Eastern Ganga (Chodaganga) Dynasty (498–1434 CE): Kalinganagara to Kataka, Temple Monumentalism & Tri-Kalinga Statecraft',
    summary:
      'Complete dynastic dossier of the Eastern Ganga (Chodaganga) Empire (498–1434 CE), tracing the 936-year Gangeya era from Kalinganagara (Mukhalingam) to Abhinava Varanasi Kataka (Cuttack), the construction of the Puri Jagannatha and Konark Sun Temples, and two-way Community-Heritage linkages.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
    tags: [
      'RD-0015',
      'Eastern Ganga Dynasty',
      'Anantavarman Chodaganga Deva',
      'Narasimhadeva I',
      'Konark Sun Temple',
      'Puri Jagannatha',
      'Kalinganagara',
      'Trikalingadhipati'
    ],
    sources: [
      {
        id: 'src_rd15_01',
        source_type: 'Inscription',
        title: 'Korni Copper-Plate Grant of Anantavarman Chodaganga Deva (Saka 1034 / 1112 CE)',
        author_or_authority: 'G.V. Ramamurti (ed.), Journal of the Andhra Historical Research Society',
        publication_or_location: 'Rajahmundry: AHRS Vol. I',
        year_or_era: '1112 CE',
        citation_details: 'Vol. I, Part 2, pp. 40–48',
        verified: true
      },
      {
        id: 'src_rd15_02',
        source_type: 'Inscription',
        title: 'Kendupatna Copper-Plate Inscription of Narasimhadeva II (Saka 1217 / 1295 CE)',
        author_or_authority: 'D.C. Sircar (ed.), Epigraphia Indica, Vol. XXVIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1295 CE',
        citation_details: 'pp. 185–195; records the construction of the Konark Sun Temple by Narasimhadeva I',
        verified: true
      },
      {
        id: 'src_rd15_03',
        source_type: 'Scholarly Book',
        title: 'Inscriptions of Orissa, Vols. III & IV',
        author_or_authority: 'Satyanarayan Rajaguru',
        publication_or_location: 'Bhubaneswar: Odisha State Museum',
        year_or_era: '1960–1972',
        citation_details: 'Comprehensive epigraphic corpus of Early and Imperial Eastern Gangas',
        verified: true
      },
      {
        id: 'src_rd15_04',
        source_type: 'Scholarly Book',
        title: 'Hindu Temple Art of Orissa (3 Vols.)',
        author_or_authority: 'Thomas E. Donaldson',
        publication_or_location: 'Leiden: E.J. Brill',
        year_or_era: '1985–1987',
        citation_details: 'Vol. I, pp. 385–640 (Mukhalingam, Puri, and Konark architectural evolution)',
        verified: true
      }
    ],
    original_content: `1. Introduction: Nearly a Millennium of Kalinga-Utkala Sovereignty
Reference ID: RD-0015 | Record ID: dyn_eastern_ganga | Period: 498–1434 CE | Capitals: Kalinganagara (Mukhalingam) & Abhinava Varanasi Kataka (Cuttack).
The Eastern Ganga Dynasty (c. 498–1434 CE) was one of the longest-reigning royal houses in world history, governing Kalinga and later unified Utkala-Odra for over nine centuries. Established at the end of the 5th century CE with the inauguration of the Gangeya Era (Ganga Samvat, 498 CE) by Indravarman I at Dantapura and Kalinganagara (modern Mukhalingam in Srikakulam district, Andhra Pradesh), the dynasty evolved from a regional Kalinga kingdom into an all-Orissan imperial power under Anantavarman Chodaganga Deva (1077–1147 CE). It laid the institutional, military, architectural, and territorial foundations upon which the Suryavamsha Gajapathis subsequently built their empire.

2. Origins, Western Ganga Kinship & The Gokarnasvamin Cult
Copper-plate charters of the Early Eastern Gangas—including the Jirjingi plates of Indravarman I (Gangeya Year 39) and the Korni plates of Anantavarman Chodaganga—trace the dynasty's ancestry to the Atreya Gotra and the lunar lineage (Chandravamsha / Gangavamsha), sharing ancestral origins with the Western Gangas of Talakad (Gangavadi, southern Karnataka). Early Ganga founders migrated eastward across the Deccan and established their tutelary shrine to Lord Gokarnasvamin (Siva) atop Mahendragiri Peak in the Eastern Ghats, adopting the sovereign title "Trikalingadhipati" (Lord of the Three Kalingas: Kalinga proper, Kongoda, and Utkala/South Kosala).

3. Chronological Evolution: From Kalinganagara to Abhinava Varanasi Kataka
Historians divide the Eastern Ganga trajectory into two major eras:
- The Early & Pre-Imperial Eastern Gangas of Kalinganagara (498–1077 CE): From Indravarman I through Vajrahasta V (1038–1070 CE) and Rajaraja Devendravarman (1070–1077 CE), the dynasty consolidated northern coastal Andhra and southern Odisha, erecting the Madhukesvara, Bhimesvara, and Somesvara temples at Mukhalingam.
- The Imperial Chodaganga Line of Kataka (1077–1434 CE): Anantavarman Chodaganga Deva (born of Ganga king Rajaraja I and Chola princess Rajasundari, daughter of Virarajendra Chola) annexed the Somavamshi kingdom of Utkala around 1110–1112 CE and shifted the imperial capital northward to Abhinava Varanasi Kataka (Cuttack) on the Mahanadi River. His successors—Anangabhima Deva III (1211–1238 CE), Narasimhadeva I (1238–1264 CE), and Bhanudeva I–IV—defended Odisha against the Delhi and Bengal Sultanates for over two centuries.

4. Major Sovereigns & Historical Personalities
- Indravarman I (c. 498–537 CE): Founder of the Gangeya Era and first epigraphically attested Trikalingadhipati.
- Vajrahasta Anantavarman V (1038–1070 CE): Revived independent imperial status and initiated large-scale stone temple construction at Mukhalingam.
- Anantavarman Chodaganga Deva (1077–1147 CE): Ruled for 70 years; unified Kalinga and Utkala from the Ganga (Hooghly) to the Godavari; initiated the monumental reconstruction of the Sri Jagannatha Temple at Puri.
- Anangabhima Deva III (1211–1238 CE): Repulsed Ghiyasuddin Iwaz Khalji of Bengal and formally dedicated the empire to Lord Purushottama-Jagannatha in 1230 CE.
- Langula Narasimhadeva I (1238–1264 CE): Launched offensive campaigns into Lakhnauti (Bengal) against Tughral Tughan Khan (1243–1245 CE); first monarch to assume the title "Gajapati" in the Kapilas inscription (1246 CE); builder of the Konark Sun Temple.

5. Territorial Geography & Provincial Mandala Administration
The Imperial Ganga state integrated two distinct ecological and linguistic zones: the Vamsadhara-Nagavali-Godavari river plains of northern Andhra (Kalinga Dandapata) and the Mahanadi-Brahmani-Baitarani delta of Odisha (Utkala-Odra). The empire was partitioned into provincial Mandalas and Dandapatas governed by Mahamandalesvaras, Parikshas, and Samantas, supported by specialized record-keepers (Kayasthas / Karanas) and fortress commanders (Nayakas).

6. Political & Administrative Institutions: Origin of the Gajapati Title
The Eastern Gangas pioneered the two defining political institutions of medieval Odisha:
- The Jagannatha Rauta Ideology: In 1230 CE, Anangabhima Deva III renounced his personal royal coronation (Abhisheka) in favor of Lord Jagannatha, styling himself "Purushottama-Putra" and "Rauta".
- The Gajapati Titulature: First recorded in the Kapilas inscription of Narasimhadeva I (1246 CE), reflecting the state's command over vast forest elephant reserves in the Eastern Ghats and Mahanadi hinterland.

7. Archaeological & Epigraphic Masterpieces
The Eastern Ganga architectural corpus represents the pinnacle of the Kalinga school of Nagara temple architecture (Rekha Deula, Pidha Deula, and Khakhara Deula):
- Mukhalingam Temples (8th–11th century CE): Madhukesvara, Somesvara, and Bhimesvara complexes.
- Sri Jagannatha Temple, Puri (12th century CE): Rising 214 feet, serving as the sacred axis of the empire.
- Sun Temple (Padmakshetra), Konark (mid-13th century CE): Conceived by Narasimhadeva I and master architect Bisu Maharana as the 24-wheeled stone solar chariot of Surya Deva.
- Simhachalam Varaha Lakshmi Narasimha Temple & Srikurmam Temple: Extensively rebuilt and endowed with hundreds of bilingual Sanskrit-Telugu and Odia inscriptions.

8. Cultural, Linguistic & Agrarian Legacy
During the Imperial Ganga period, both proto-Odia and medieval Telugu epigraphy flourished side by side. The Urajam plates (1051 CE) preserve the earliest dated proto-Odia royal inscription, while Simhachalam and Srikurmam preserve a vast bilingual archive. The state constructed massive hydraulic tanks (Sagaras), such as Chodaganga Sagara and Anangabhima Sagara, employing specialized stone-quarrying, earthwork, and masonry guilds.

9. Historiographical Synthesis & Community-Heritage Linkages
- Documented Epigraphic Facts: The 498 CE Gangeya epoch, the Chola-Ganga marital alliances, and the 13th-century Bengal campaigns are established through dated copper-plate grants (Korni, Vizagapatam, Kendupatna, Nagari plates) and Islamic chronicles (Minhaj-i-Siraj's Tabaqat-i-Nasiri).
- Community-Heritage Linkages: The massive temple-building programs at Mukhalingam, Puri, Simhachalam, and Konark, alongside frontier fortress construction, relied upon hereditary master builders, lithic quarrymen, and martial Nayaka clans of the Odra-Kalinga corridor—ancestral populations documented in the Community-Heritage registry as Kalingarajulu (CH-0004), Vaddera (CH-0001), Odiyaraju (CH-0048), and Vadderarajulu (CH-0013).

10. Conclusion
By preserving political independence for four centuries after the fall of neighboring north Indian kingdoms and bequeathing an unmatched architectural heritage at Puri, Konark, Mukhalingam, and Simhachalam, the Imperial Eastern Ganga Dynasty forged the geopolitical and cultural matrix from which the Suryavamsha Gajapathi Empire directly emerged in 1434 CE.`
  },

  // ==========================================================================
  // 3. RD-0016: dyn_bhoi_mukunda
  // ==========================================================================
  {
    id: 'dyn_bhoi_mukunda',
    slug: 'chalukya-gajapathi-bhoi-successor-lineages-1541-1568-ce',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0016 | Chalukya-Gajapathi & Bhoi Successor Lineages (1541–1568 CE): Govinda Vidyadhara, Mukunda Deva & The Khurda Royal Continuation',
    summary:
      'Scholarly examination of the Bhoi (1541–1559 CE) and Chalukya-Gajapathi (1559–1568 CE) successor dynasties at Kataka, Emperor Mukunda Deva Harichandana, Mughal-Gajapathi diplomacy, the Battle of Gohiratikiri (1568 CE), and the Khurda Gajapathi continuation.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('barabati_fort_ruins.jpg'),
    tags: [
      'RD-0016',
      'Bhoi Dynasty',
      'Chalukya-Gajapathi',
      'Govinda Vidyadhara',
      'Mukunda Deva',
      'Gohiratikiri',
      'Khurda Gajapathi',
      'Kataka'
    ],
    sources: [
      {
        id: 'src_rd16_01',
        source_type: 'Scholarly Book',
        title: 'The History of the Gajapati Kings of Orissa and Their Successors',
        author_or_authority: 'Prof. Prabhat Mukherjee',
        publication_or_location: 'Cuttack: Kitab Mahal',
        year_or_era: '1981',
        citation_details: 'Chapters VI–VIII (Govinda Vidyadhara, Mukunda Deva, and Ramachandra Deva I)',
        verified: true
      },
      {
        id: 'src_rd16_02',
        source_type: 'Primary Source',
        title: 'Akbarnama & Ain-i-Akbari (Diplomatic Embassies with Maharaja Mukunda Deva of Orissa)',
        author_or_authority: 'Abul Fazl Allami (trans. H. Beveridge)',
        publication_or_location: 'Calcutta: Asiatic Society of Bengal',
        year_or_era: 'c. 1595 CE',
        citation_details: 'Vol. II, pp. 381–384 (1565–1566 CE Mughal-Orissa embassy exchanges)',
        verified: true
      },
      {
        id: 'src_rd16_03',
        source_type: 'Inscription',
        title: 'Draksharama Bhimesvara Temple Inscription of Mukunda Deva',
        author_or_authority: 'South Indian Inscriptions (SII), Vol. IV',
        publication_or_location: 'Madras: Archaeological Survey of India',
        year_or_era: 'c. 1562 CE',
        citation_details: 'Records Mukunda Deva’s campaign to the Godavari and remission of marriage taxes',
        verified: true
      },
      {
        id: 'src_rd16_04',
        source_type: 'Scholarly Book',
        title: 'Kings and Cults: State Formation and Legitimation in India and Southeast Asia',
        author_or_authority: 'Hermann Kulke',
        publication_or_location: 'New Delhi: Manohar',
        year_or_era: '1993',
        citation_details: 'pp. 51–92 (Khurda Rajya and the Abhinava Indradyumna renewal)',
        verified: true
      }
    ],
    original_content: `1. Introduction: The Post-Suryavamsha Transition (1541–1568 CE)
Reference ID: RD-0016 | Record ID: dyn_bhoi_mukunda | Period: 1541–1568 CE (with post-1568 Khurda continuation) | Capitals: Kataka (Cuttack) & Khurda.
Following the death of Suryavamsha Emperor Prataparudra Deva in 1540 CE, the imperial throne at Kataka (Cuttack) experienced rapid ministerial coups that produced two successor dynasties before the Afghan conquest of 1568 CE: the Bhoi Dynasty (1541–1559 CE), founded by General Govinda Vidyadhara, and the Chalukya-Gajapathi Dynasty (1559–1568 CE), led by Maharaja Mukunda Deva Harichandana—the last independent medieval sovereign of unified Odisha. Despite the loss of Cuttack in 1568 CE, the Gajapathi institution was reconstituted at Khurda by Ramachandra Deva I (c. 1568/1572 CE), preserving the ritual sovereignty of the Puri Jagannatha Temple into the modern era.

2. The Bhoi Dynasty under Govinda Vidyadhara & Chakra Pratap (1541–1559 CE)
Govinda Vidyadhara, who served as Bhoi-Mula (Chief Accountant and Prime Minister) under Prataparudra Deva, seized power in 1541 CE after eliminating the young Suryavamsha princes Kalua Deva and Kakharua Deva. Assuming the royal title Suvarna Kesari Govinda Vidyadhara (1541–1549 CE), he sought to stabilize the Godavari frontier by concluding a treaty with Sultan Quli Qutb Shah of Golconda, fixing the Godavari River as the boundary between Odisha and Golconda. His reign is attested by inscriptions at Simhachalam, Srikurmam, and the Jagannatha Temple at Puri. He was succeeded by his son Chakra Pratap (1549–1557 CE), whose unpopular rule provoked a palace coup led by Minister Danai Vidyadhara and General Mukunda Harichandana.

3. Rise of Maharaja Mukunda Deva (Chalukya-Gajapathi, 1559–1568 CE)
Mukunda Deva Harichandana belonged to the Eastern Chalukya (Saluki/Chalukya) princely lineage settled in Kalinga-Dandapata (attributed in epigraphs as the son of Sarvaraju and grandson of Singaraju). Distinguishing himself as commander of the strategic Barabati Fort in Kataka, Mukunda Deva overthrew the usurper Raghurama Chhotaray in 1559 CE and ascended the Gajapathi throne. In inscriptions at Draksharama, Simhachalam, and Puri, he claimed the full imperial Gajapathi titulature while proudly identifying his Chalukya-vamsa heritage.

4. Geopolitics, Mughal Diplomacy & The Northern Campaign to Triveni
Recognizing the existential threat posed by Sulaiman Khan Karrani, the Afghan Sultan of Bengal, Mukunda Deva pursued a sophisticated trans-continental diplomatic strategy:
- He granted sanctuary to Ibrahim Khan Sur, rival of the Bengal Sultan.
- In 1565–1566 CE, he exchanged embassies with Mughal Emperor Akbar—receiving the Mughal envoys Hasan Khan Khazanchi and Bhatta Mahapatra at Cuttack and dispatching his own ambassador, Paramananda Ray, to Agra—to coordinate a two-front alliance against Bengal.
- Advancing northward with the Gajapathi army, Mukunda Deva reached the Hooghly River at Satgaon and constructed the famous bathing ghat (Mukunda Ghat) at Triveni.

5. The Siege of Kotsimul, Rebellion of Ramachandra Bhanja & Gohiratikiri (1568 CE)
In late 1567 and early 1568 CE, while Mughal Emperor Akbar was preoccupied with the Siege of Chittorgarh, Sulaiman Karrani invaded Odisha in two columns led by his son Bayazid and general Kalapahar. Besieged at Kotsimul fort on the Damodar frontier, Mukunda Deva was forced to rush southward when Ramachandra Bhanja, the feudal commander of Sarangagarh, proclaimed himself king at Cuttack. Although Mukunda Deva defeated one rebel faction, he fell fighting against Ramachandra Bhanja's forces on the battlefield of Gohiratikiri (near Jajpur, Bhadrak district) in 1568 CE—marking the end of independent medieval rule over Cuttack.

6. The Khurda Gajapathi Continuation (Post-1568 CE to Modern Puri)
Shortly after the turmoil of 1568 CE, Ramachandra Deva I (son of Danai Vidyadhara of the Bhoi lineage) established a fortified regional capital at Khurda (at the foot of Barunei Hill) and re-installed the sacred Daru-Brahma images of Lord Jagannatha at Puri, earning the title "Abhinava Indradyumna". In 1592 CE, Mughal general Raja Man Singh formally recognized Ramachandra Deva I of Khurda as the hereditary Gajapathi and Superintendent of the Puri Jagannatha Temple—a lineage that continues today as the titular Gajapathi Maharajas of Puri.

7. Archaeological & Epigraphic Evidence
- Draksharama Bhimesvara Temple Inscription of Mukunda Deva: Records his reconquest of the Godavari delta up to Rajahmundry and remission of marriage taxes.
- Barabati Fort (Nine-Storeyed Palace): Described by Abul Fazl in the Ain-i-Akbari as a nine-storeyed stone and masonry citadel built by Mukunda Deva within Barabati Fort.
- Triveni Ghat (Hooghly, West Bengal): Architectural testimony to Mukunda Deva's northernmost military camp on the Bhagirathi-Hooghly.

8. Cultural Patronage & Foreign Accounts
Mukunda Deva's court is documented not only in Sanskrit and Odia texts (such as the Madala Panji) and Mughal chronicles (Akbarnama, Tabaqat-i-Akbari), but also by the Venetian traveler Cesare Federici, who visited Orissa shortly after 1568 CE and praised the kingdom's prosperous ports, fortified cities, and disciplined military governance.

9. Historiographical & Community-Heritage Significance
The Chalukya-Gajapathi synthesis under Mukunda Deva illustrates the deep interweaving of Odia and Telugu martial lineages (Chalukya-Odiyaraju and Kalinga-Nayaka houses). Following the fall of Kataka in 1568 CE, significant contingents of royal soldiers, fortress builders, and Paika/Nayaka retainers migrated into the southern uplands of Andhra, Telangana, and Karnataka, reinforcing the Odiyaraju (CH-0048), Odderajulu (CH-0006), Gajapathirajulu (CH-0005), and Vadderarajulu (CH-0013) community settlements.

10. Conclusion
Though brief, the Bhoi and Chalukya-Gajapathi era (1541–1568 CE) demonstrated remarkable military resilience and institutional adaptability, bridging the classical Suryavamsha Empire with the enduring Khurda-Puri Gajapathi tradition.`
  },

  // ==========================================================================
  // 4. RD-0017: dyn_traditional_suryavamsha_lineages
  // ==========================================================================
  {
    id: 'dyn_traditional_suryavamsha_lineages',
    slug: 'southern-suryavamsha-odiyaraju-vaddera-oddar-nayaka-lineages',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0017 | Southern Suryavamsha Odiyaraju / Vaddera / Oddar Nayaka Lineages (14th–18th Century CE): Fortress Polities, Hydraulic Engineering & Historiographical Verification',
    summary:
      'Critical historiographical and ethnographic dossier on the Southern Suryavamsha Odiyaraju, Odderajulu, Vadderarajulu, and Oddar Nayaka lineages across Andhra, Telangana, Karnataka, and Tamil Nadu (14th–18th Century CE), strictly distinguishing primary epigraphy from Mackenzie Kaifiyats, colonial gazetteers, and community Vamsavalis.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'scholarly_interpretation',
    featured_image: ARCHIVE_IMG('kondavidu_fort_ramparts.jpg'),
    tags: [
      'RD-0017',
      'Odiyaraju',
      'Vadderarajulu',
      'Odderajulu',
      'Southern Suryavamsha',
      'Palegar Polities',
      'Giri-Durga Engineering',
      'Odra-Khanda Migration'
    ],
    sources: [
      {
        id: 'src_rd17_01',
        source_type: 'Primary Source',
        title: 'The Mackenzie Manuscripts: Local Tracts and Kaifiyats of Andhra and Carnatic',
        author_or_authority: 'Col. Colin Mackenzie & Kavali Venkata Borayya',
        publication_or_location: 'Madras: Government Oriental Manuscripts Library (GOML)',
        year_or_era: '1800–1821 CE',
        citation_details: 'Kaifiyats of Kondavidu, Udayagiri, and Rayalaseema Palegar forts',
        verified: true
      },
      {
        id: 'src_rd17_02',
        source_type: 'Scholarly Book',
        title: 'Castes and Tribes of Southern India, Vol. V (Odde / Vodda / Oddar)',
        author_or_authority: 'Edgar Thurston & K. Rangachari',
        publication_or_location: 'Madras: Government Press',
        year_or_era: '1909',
        citation_details: 'Vol. V, pp. 422–435 (Ethnographic record of Odra/Orissa royal origin traditions)',
        verified: true
      },
      {
        id: 'src_rd17_03',
        source_type: 'Scholarly Book',
        title: 'Precolonial India in Practice: Society, Region, and Identity in Medieval Andhra',
        author_or_authority: 'Prof. Cynthia Talbot',
        publication_or_location: 'New York: Oxford University Press',
        year_or_era: '2001',
        citation_details: 'pp. 145–198 (Nayaka martial mobility, frontier fortresses, and tank construction)',
        verified: true
      },
      {
        id: 'src_rd17_04',
        source_type: 'Official Publication',
        title: 'Mysore Gazetteer & Ethnographic Survey of Mysore (Vodda / Woddar)',
        author_or_authority: 'C. Hayavadana Rao & H.V. Nanjundayya',
        publication_or_location: 'Bangalore: Government Press',
        year_or_era: '1915–1931',
        citation_details: 'Vol. IV (Kallu-Vodda, Mannu-Vodda, and Boya-Vodda traditions in Karnataka)',
        verified: true
      }
    ],
    original_content: `1. Introduction: The Southern Corridor of Odra-Kalinga Lineages
Reference ID: RD-0017 | Record ID: dyn_traditional_suryavamsha_lineages | Period: 14th–18th Century CE | Region: Andhra Pradesh, Telangana, Karnataka & Tamil Nadu.
Between the 14th and 18th centuries CE, the geopolitical expansion of the Eastern Ganga, Kakatiya, Suryavamsha Gajapathi, and Vijayanagara empires triggered large-scale southward movements of martial commanders, fortress engineers, stone-carvers, and hydraulic specialists originating from Odra-Desha (Odisha and Kalinga). Across Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu, these communities preserved a shared historical consciousness linking their ancestral origins to the Suryavamsha Gajapathi and Odra-Kalinga polities, recorded under regional ethnonyms including Odiyaraju, Odderajulu, Vadderarajulu, Boya-Vaddera, Kallu-Vaddera, and Mannu-Vaddera.

2. Etymological & Epigraphic Roots of the Odra / Odda / Vadda Identity
Linguistic and epigraphic evidence demonstrates a direct phonological continuum from Sanskrit "Audra / Odra-visaya" (attested in the Soro copper plates and Somavamshi/Ganga charters) to Prakrit/Telugu/Kannada "Odda / Vodda / Vadda" and Tamil "Ottar / Oddar". In medieval South Indian inscriptions, "Odda-vadi" and "Odda-dandam" explicitly denote the territory and military armies of the Odisha Gajapathi kings—most famously during the 15th-century Odda campaigns into Kondavidu, Udayagiri, Kanchipuram, and Srirangam.

3. Historical Phases of Southward Deployment (12th–18th Century CE)
Four historical waves shaped the settlement of Odra-linked martial and engineering clans across the southern peninsula:
- Kakatiya & Chola-Ganga Era (11th–14th Century CE): Deployment of master stone-masons and tank-builders (Cheruvu construction guilds) during the reigns of Ganapatideva, Rudramadevi, and Prataparudradeva across Telangana and Rayalaseema.
- Suryavamsha Gajapathi Southern Viceroyalties (1448–1519 CE): Under Kapilendra Deva, Prince Hamvira Deva, and Dakshina Kapilesvara Mahapatra, Odia-Kalinga garrisons held the hill forts of Kondapalli, Kondavidu, Bellamkonda, Vinukonda, Addanki, and Udayagiri for over half a century.
- Vijayanagara & Nayaka Integration (16th–17th Century CE): Following Krishnadevaraya's capture of Udayagiri (1514 CE) and Kondavidu (1515 CE), specialist fortress engineers, quarrymen, and martial retainers were integrated into the Amara-Nayaka and Palegar defense systems of Vijayanagara, Chitradurga, Keladi, Madurai, and Thanjavur.
- Early Modern Regional Chieftaincies (17th–18th Century CE): Local Palegar and Samsthanam lineages in Rayalaseema, coastal Andhra, and the Mysore plateau maintained autonomous fortresses and hydraulic networks prior to British colonial pacification.

4. Giri-Durga (Hill Fortress) & Jala-Durga (Hydraulic) Specialization
Across the Deccan plateau, these lineages held a near-monopoly on two critical military-economic technologies:
- Lithic Fortress Architecture (Kallu-Woddar / Shilpi Guilds): Quarrying monolithic granite blocks by thermal-wedge fracturing to construct cyclopean ramparts at Gooty, Gandikota, Penukonda, Chandragiri, Chitradurga, and Gingee.
- Sovereign Tank & Canal Engineering (Mannu-Woddar / Hydraulic Guilds): Designing earthen embankments, stone sluices (Tumu), and stepped wells (Kalyanis / Baoris) that sustained wet-rice agriculture across semi-arid Rayalaseema, Telangana, and Gangavadi.

5. Historiographical Methodology: Epigraphy vs. Kaifiyats & Vamsavalis
In strict compliance with historical audit standards, this archive separates three tiers of evidence regarding Southern Suryavamsha lineages:
- Primary Epigraphic Evidence: Copper-plate and stone inscriptions (such as the Veligalani grant of 1458 CE, the Munnur and Srirangam inscriptions of 1464 CE, and Kondavidu/Udayagiri records) verify the historical rule of Gajapathi viceroys and Odra military contingents in Andhra and Tamil Nadu.
- Early Modern Archival Sources (Mackenzie Kaifiyats & Colonial Ethnographies): Village Kaifiyats compiled by Colin Mackenzie's surveyors (1800–1821) and ethnographic surveys by Edgar Thurston (1909), C. Hayavadana Rao, and Syed Siraj ul Hassan (1920) document that Odde/Vodda/Odiyaraju communities universally preserved oral traditions of royal Kalinga/Orissa origin, Suryavamsha descent, and former rulership before the fall of their northern kingdom.
- Traditional Community Genealogies (Vamsavalis): Community narratives celebrating legendary ancestral figures (such as King Odda Raju, Veerabhadra lineages, and regional Samsthanam chiefs) represent vital cultural memory and socio-political heritage, preserved with full transparency alongside epigraphic records.

6. Regional Distribution & The 76-Name Community-Heritage Matrix
Through centuries of linguistic adaptation across five major language zones (Odia, Telugu, Kannada, Tamil, and Marathi/Hindi), the historical Odra-Suryavamsha diaspora diversified into the 16 primary Community Directory groups and 76 documented ethnographic names preserved in the Master Reference Registry (CH-0048 through CH-0123)—including Odiyaraju, Odderajulu, Vadderarajulu, Kalingarajulu, Gajapathirajulu, Boya, Beldar, Sagar, and Woddar.

7. Socio-Religious Traditions & Martial Ethos
Southern Suryavamsha lineages retained distinctive royal and martial customs, including devotion to Lord Jagannatha, Narasimha (Simhachalam/Ahobilam), Venkateswara (Tirupati), Yellamma-Renuka, and Peddintlamma (Kolletikota), alongside traditional insignia such as the Panchavarna flag, solar emblems, and heroic Viragal (hero-stone) commemoration.

8. Impact of British Colonial Reclassification (19th–20th Century)
The British East India Company's dismantling of the South Indian Palegar system (1800–1805 CE) and the subsequent demilitarization of native fortress garrisons displaced hereditary fort-builders and martial retainers. Colonial census administrators frequently reclassified displaced military-engineering lineages strictly as occupational earthwork or stone-working castes, obscuring their pre-colonial administrative and military status in medieval state formation.

9. Two-Way Cross-Reference with the Community-Heritage Archive
This dossier (RD-0017) serves as the primary historiographical bridge between the Royal Dynasties archive (/gajapathi-kings) and the Community-Heritage archive (/community-heritage), linking directly to Odiyaraju (CH-0048), Odderajulu (CH-0006), Vadderarajulu (CH-0013), and the Royal Dynasties & Sovereign Heritage category (CH-0024).

10. Conclusion
By evaluating epigraphic charters, Mackenzie Kaifiyats, architectural monuments, and community Vamsavalis within a rigorous comparative framework, historians can trace the continuous 600-year historical arc connecting the Suryavamsha Gajapathi Empire of Odra-Kalinga with the living Odiyaraju, Vaddera, and Oddar heritage communities of peninsular India.`
  },

  // ==========================================================================
  // 5. RD-0018: admin-mahapatras
  // ==========================================================================
  {
    id: 'admin-mahapatras',
    slug: 'mahapatras-provincial-ministers-dandapata-system',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0018 | Mahapatras & Provincial Ministers (Dandapata System): Imperial Governance, Pariksha Viceroyalties & Fiscal Administration of the Gajapathi State',
    summary:
      'Institutional monograph on the Gajapathi imperial bureaucracy, examining the Council of Sixteen Mahapatras, the Dandapata and Rajya provincial system, Pariksha viceroys, Bhoi/Karana revenue administration, and trilingual chancery charters.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('copper_plate_charter.jpg'),
    tags: [
      'RD-0018',
      'Mahapatra',
      'Dandapata System',
      'Pariksha',
      'Rajahmundry Rajya',
      'Kondavidu Rajya',
      'Udayagiri Rajya',
      'Gajapathi Administration'
    ],
    sources: [
      {
        id: 'src_rd18_01',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa (Chapter VII: Administrative Organization)',
        author_or_authority: 'Dr. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University',
        year_or_era: '1957',
        citation_details: 'pp. 142–174 (Dandapatas, Rajyas, Parikshas, and revenue administration)',
        verified: true
      },
      {
        id: 'src_rd18_02',
        source_type: 'Scholarly Book',
        title: 'The State and the Statecraft in Medieval Orissa under the Later Eastern Gangas and Suryavamsi Gajapatis',
        author_or_authority: 'Dr. S.K. Panda',
        publication_or_location: 'Calcutta: K.P. Bagchi & Co.',
        year_or_era: '1995',
        citation_details: 'pp. 65–138 (Bureaucratic offices, Mahapatras, and fiscal tenures)',
        verified: true
      },
      {
        id: 'src_rd18_03',
        source_type: 'Inscription',
        title: 'Veligalani Copper-Plate Grant of Kapilendra Deva (Saka 1380 / 1458 CE)',
        author_or_authority: 'D.C. Sircar (ed.), Epigraphia Indica, Vol. XXXIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1458 CE',
        citation_details: 'pp. 275–292; Trilingual administrative charter in Sanskrit, Odia, and Telugu',
        verified: true
      }
    ],
    original_content: `1. Introduction: The Bureaucratic Spine of the Gajapathi Empire
Reference ID: RD-0018 | Record ID: admin-mahapatras | Period: 12th–16th Century CE | Administrative Seat: Abhinava Varanasi Kataka (Cuttack).
Governing an empire that stretched over 1,200 kilometers from the Hooghly River in Bengal to the Pennar and Kaveri basins in South India required a sophisticated, multi-tiered administrative machinery. Inheriting the institutional framework of the Imperial Eastern Gangas and adapting it to wartime mobilization, the Suryavamsha Gajapathis organized their state around a central Council of Ministers (Patra-Samantas / Sixteen Mahapatras) and a provincial grid of Dandapatas and Rajyas governed by imperial viceroys (Parikshas).

2. The Central Council of Ministers (Patra-Samantas & Mahapatras)
At the imperial capital of Abhinava Varanasi Kataka (Cuttack), the sovereign presided over an executive council of high ministers bearing composite civil-military titles:
- Mantri-Sreni-Siromani / Rajaguru: Chief constitutional and religious advisor.
- Senapati / Mahasenapati: Supreme commander of the imperial armed forces.
- Sandhivigrahika Mahapatra: Minister of Foreign Affairs, War, and Peace, responsible for drafting royal copper-plate charters (Tamrasasanas).
- Bhoi-Mula / Sri-Karana: Head of the central exchequer, land-revenue registers (Bhians), and state secretariat.
- Rahasya-Adhikari: Private secretary to the Emperor, recording direct oral decrees (Rahasyas) issued before Lord Jagannatha.

3. The Dandapata & Rajya Provincial System
The empire was divided into large revenue-cum-military provinces known as Dandapatas in the northern and central core, and Rajyas in the southern Telugu and Tamil territories:
- Northern & Central Dandapatas: Jaleswar, Remuna, Soro, Bhadrak, Jajpur, Kataka, Khurda, Chabiskud (Puri), and Kalinga Dandapata (Mukhalingam/Srikakulam).
- Southern Imperial Rajyas: Rajamahendravaram (Rajahmundry) Rajya, Kondavidu Rajya (comprising Kondapalli, Bellamkonda, Vinukonda, Addanki, and Ammanabrolu), and Udayagiri Rajya.

4. Role of the Pariksha (Imperial Viceroy) & Royal Princes
Each Dandapata or Rajya was placed under a Pariksha (also styled Mahamandalesvara or Behera-Mahapatra), who exercised combined civil, judicial, and military authority. For strategic frontier Rajyas such as Kondavidu and Rajahmundry, the emperor frequently appointed princes of the royal blood—such as Raghudeva Narendra Mahapatra (Viceroy of Rajahmundry, 1456 CE) and Dakshina Kapilesvara Kumara Mahapatra (Viceroy of Kondavidu, 1464 CE)—or trusted scholar-statesmen like Raya Ramananda Pattanayak.

5. Sub-Provincial Divisions: Bisa, Khanda & Grama
Below the Dandapata level, administrative authority cascaded through three local tiers:
- Bisa / Bhumi / Sima: Sub-districts administered by a Bisoyi or Khandadhipati, assisted by a chief accountant (Khandapati / Bhoi-Mula).
- Khanda / Kottam: Clusters of fortified villages and agricultural estates maintained by martial Nayakas and Paika Dalabeheras.
- Grama (Village): Governed by the village headman (Pradhana / Reddy) and village accountant (Karana / Karanam), alongside temple committees (Sthana-patis).

6. Fiscal Administration, Land Tenures & Tax Remissions
Land revenue formed the fiscal foundation of the empire, measured in standard units such as Vati (approximately 20 Manas in Odisha) and Putti or Kuncham in the Andhra provinces. Lands were classified into royal demesne (Kotha-bhumi), military service tenures (Nayankara / Jagir), tax-free scholarly endowments (Agraharas / Sasanas), and temple endowments (Amrita-manohi for Lord Jagannatha, Lord Simhadrinatha, and local shrines). Kapilendra Deva's Puri inscriptions famously abolished oppressive salt and cowrie taxes to relieve agrarian producers during wartime.

7. Trilingual Chancery Practice (Sanskrit, Odia & Telugu)
A hallmark of Mahapatra administration was its multilingual administrative inclusivity. Royal charters like the Veligalani grant of Kapilendra Deva (1458 CE) were composed simultaneously in Sanskrit, Odia, and Telugu so that provincial officials, Brahmana donees, and local agrarian communities in every corner of the empire could verify royal grants in their own script and language.

8. Judicial Administration & The Sarasvativilasa Legal Code
Under Emperor Prataparudra Deva, imperial jurisprudence was codified in the monumental Sanskrit legal treatise Sarasvativilasa, which synthesized Mitakshara and Dayabhaga legal traditions for civil inheritance, contract law, and royal adjudication across the empire.

9. Historiographical & Community-Heritage Connections
The administrative integration of Dandapatas from Midnapore to Nellore created enduring institutional links between Odia Mahapatra/Pattanayak administrators and southern Odiyaraju (CH-0048), Kalingarajulu (CH-0004), and Vadderarajulu (CH-0013) revenue-military families who staffed the provincial courts and fortresses.

10. Conclusion
The Dandapata and Mahapatra administrative system provided the institutional resilience that enabled the Gajapathi Empire to mobilize armies of hundreds of thousands while sustaining temple economies, irrigation works, and multilingual scholarship for over three centuries.`
  },

  // ==========================================================================
  // 6. RD-0019: admin-nayakas
  // ==========================================================================
  {
    id: 'admin-nayakas',
    slug: 'nayakas-fortress-commanders-giri-durga-jala-durga-system',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0019 | Nayakas & Fortress Commanders (Giri-Durga & Jala-Durga System): Defensive Architecture, Paika Garrisons & Frontier Strategy',
    summary:
      'Comprehensive military-architectural monograph on the Gajapathi Nayaka and Durgapati system, examining the network of 160+ Giri-Durga (hill), Jala-Durga (water), and Vana-Durga (forest) fortresses from Raibania and Barabati to Kondapalli, Kondavidu, and Udayagiri.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('kondavidu_fort_ramparts.jpg'),
    tags: [
      'RD-0019',
      'Nayaka System',
      'Giri-Durga',
      'Jala-Durga',
      'Barabati Fort',
      'Kondapalli Fort',
      'Kondavidu Fort',
      'Udayagiri Fort',
      'Odiyaraju'
    ],
    sources: [
      {
        id: 'src_rd19_01',
        source_type: 'Scholarly Book',
        title: 'A Forgotten Empire (Vijayanagar): Accounts of Domingo Paes and Fernao Nuniz',
        author_or_authority: 'Robert Sewell',
        publication_or_location: 'London: Swan Sonnenschein & Co.',
        year_or_era: '1900',
        citation_details: 'pp. 316–322 (Sieges of Udayagiri, Kondavidu, and Kondapalli forts)',
        verified: true
      },
      {
        id: 'src_rd19_02',
        source_type: 'Scholarly Book',
        title: 'Further Sources of Vijayanagara History (3 Vols.)',
        author_or_authority: 'K.A. Nilakanta Sastri & N. Venkataramanayya',
        publication_or_location: 'Madras: University of Madras',
        year_or_era: '1946',
        citation_details: 'Vol. I, pp. 185–210 (Gajapathi Durgapatis and Nayaka fortress defenses)',
        verified: true
      },
      {
        id: 'src_rd19_03',
        source_type: 'Peer-Reviewed Research',
        title: 'Forts and Fortifications in Medieval Orissa',
        author_or_authority: 'Prof. K.S. Behera',
        publication_or_location: 'Bhubaneswar: Odisha Historical Research Journal',
        year_or_era: '1999',
        citation_details: 'Architectural survey of Barabati, Raibania, Sarangagarh, and Khurda forts',
        verified: true
      }
    ],
    original_content: `1. Introduction: The Fortress Spine of the Eastern Ghats
Reference ID: RD-0019 | Record ID: admin-nayakas | Period: 12th–16th Century CE | Scope: 160+ Imperial Citadels from Bengal to the Pennar Basin.
The geopolitical survival and southward expansion of the Eastern Ganga and Suryavamsha Gajapathi empires rested upon a formidable chain of over 160 interconnected fortresses (Durgas / Garhs) stretching along the Eastern Ghats and coastal deltas from Mandaran and Raibania in the north to Udayagiri in the south. Commanded by hereditary and imperial fortress governors styled Durgapatis, Dalapatis, and Nayakas, these citadels functioned simultaneously as military garrison hubs, royal treasuries, granaries, and provincial administrative capitals.

2. Classical Typology of Gajapathi Fortifications (Durga-Vinyasa)
Following the Arthasastra and Silpasastra canons adapted to the topography of Odisha and Andhra, Gajapathi engineers constructed four interlocking classes of fortifications:
- Giri-Durga (Mountain/Hill Fortresses): Built atop steep granite inselbergs of the Eastern Ghats—exemplified by Kondavidu, Kondapalli, Bellamkonda, Vinukonda, Udayagiri, and Dhenkanal.
- Jala-Durga (Water/Riverine Island Fortresses): Surrounded by perennial rivers, crocodile-filled moats, or expansive wetlands—exemplified by Barabati Fort (flanked by the Mahanadi and Kathajodi rivers) and Kolletikota (inside Kolleru Lake).
- Vana-Durga (Dense Forest Fortresses): Protected by impenetrable bamboo thickets (Sal/Bansa-garh) and jungle defiles—exemplified by Khurda (Barunei), Athagarh, and Sarangagarh.
- Sthala-Durga (Plains Masonry Citadels): Multi-bastioned laterite and granite forts guarding coastal highways—exemplified by Raibania, Sisupalgarh-Kataka, and Potagarh.

3. The Northern & Central Citadels: Mandaran, Raibania & Barabati
- Mandaran & Raibania Forts: Guarded the northern Bengal frontier along the Subarnarekha and Hooghly corridors against the Iliyas Shahi, Husain Shahi, and Afghan sultanates.
- Barabati Fort (Abhinava Varanasi Kataka): The supreme imperial citadel on the Mahanadi bifurcation, encircled by a double stone wall and a 200-foot-wide moat, housing the imperial arsenal, elephant stables, and Mukunda Deva's nine-storeyed palace.

4. The Southern Quadrangle: Rajahmundry, Kondapalli, Kondavidu & Udayagiri
In the southern Telugu provinces, four massive fortress complexes anchored Gajapathi rule for over six decades:
- Rajamahendravaram (Rajahmundry): Commanded the apex of the Godavari delta and riverine trade.
- Kondapalli Fort: A triple-walled granite mountain fortress near Vijayawada where Praharaju Siraschandana Mahapatra and Prince Virabhadra Deva commanded the southern Gajapathi field headquarters.
- Kondavidu Fort: Ringed by 21 miles of dry-stone granite ramparts atop a 1,700-foot ridge in Guntur district, governing the Krishna-Guntur plains.
- Udayagiri Fort: A virtually impregnable sheer-cliff citadel in Nellore district accessible only through rock-cut defiles, guarding the southern frontier against Vijayanagara.

5. Duties, Tenures & Autonomy of the Nayakas and Durgapatis
Under the Gajapathi Nayankara system, fortress commanders (Nayakas, Khandayats, and Dalabeheras) were granted revenue assignments (Jagirs / Nayankara estates) in the surrounding countryside in exchange for maintaining fixed quotas of foot-soldiers (Paikas), cavalry, war elephants, and stone-masons, and keeping the fort's water reservoirs and granaries stocked for multi-year sieges.

6. Lithic & Hydraulic Engineering Inside Hill Citadels
Every Gajapathi Giri-Durga was a masterpiece of hydraulic self-sufficiency. Specialist rock-cutters and tank engineers excavated perennial rainwater reservoirs (such as the Muthyalammapadu, Vedullacheruvu, and Putalamma tanks atop Kondavidu) directly into the granite summit, channeled mountain runoff through stone sluices, and dressed megalithic curtain walls without mortar.

7. Historical Sieges & Epigraphic Records (1454–1519 CE)
Portuguese chroniclers Domingo Paes and Fernao Nuniz, alongside Krishnadevaraya's Amuktamalyada and Tirumala inscriptions, provide vivid eyewitness accounts of how fiercely Gajapathi Nayakas defended these forts. At Udayagiri (1513–1514 CE), Tirumala Rautaraya held out for eighteen months until Vijayanagara engineers had to cut new roads through solid boulders to breach the summit.

8. Role of Odra, Vaddera & Odiyaraju Fortress Guilds
The construction, maintenance, and defense of this vast network of hill and water forts relied directly upon hereditary guilds of stone-masons (Kallu-Vaddera / Shilpis), earthwork engineers (Mannu-Vaddera), and martial Odiyaraju (CH-0048), Odderajulu (CH-0006), and Vadderarajulu (CH-0013) Nayaka garrisons who accompanied the Gajapathi armies from Odisha into the Deccan and Carnatic.

9. Legacy in the Deccan & South Indian Palegar Polities
After the Treaty of 1519 CE and the reorganization of the southern provinces, many Gajapathi fortress commanders and engineering clans were retained in situ by the Vijayanagara, Qutb Shahi, and regional Nayaka courts, transmitting Kalinga-Gajapathi fortification science across southern India.

10. Conclusion
The Giri-Durga and Jala-Durga system administered by the Gajapathi Nayakas represents one of pre-modern Asia's most sophisticated defensive landscapes, uniting military strategy, lithic engineering, and community martial heritage.`
  },

  // ==========================================================================
  // 7. RD-0020: military-gajasena
  // ==========================================================================
  {
    id: 'military-gajasena',
    slug: 'military-organisation-gajasena-war-elephant-corps',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0020 | Military Organisation & The Gajasena (War Elephant Corps): Chaturanga-Bala, Paika Infantry & Strategic Warfare of the Gajapathi Empire',
    summary:
      'Comprehensive military monograph on the imperial armed forces of the Eastern Ganga and Suryavamsha Gajapathi empires, focusing on the Gajasena (Armored War Elephant Corps), Gajasastra veterinary and tactical sciences, Paika Akhada infantry regiments, and pioneer siege-engineering guilds.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('konark_war_elephant.jpg'),
    tags: [
      'RD-0020',
      'Gajasena',
      'War Elephants',
      'Paika Infantry',
      'Gajapati Military',
      'Kalinga Warfare',
      'Kapilendra Deva',
      'Narasimhadeva I'
    ],
    sources: [
      {
        id: 'src_rd20_01',
        source_type: 'Scholarly Book',
        title: 'Elephants and Kings: An Environmental History',
        author_or_authority: 'Prof. Thomas R. Trautmann',
        publication_or_location: 'Chicago: University of Chicago Press',
        year_or_era: '2015',
        citation_details: 'pp. 182–225 (Forest elephant ecology of Odisha and the Gajapati title)',
        verified: true
      },
      {
        id: 'src_rd20_02',
        source_type: 'Primary Source',
        title: 'Harihara Chaturanga of Godavara Misra (Minister of Prataparudra Deva)',
        author_or_authority: 'Godavara Misra (ed. S.K. Ramanatha Sastri)',
        publication_or_location: 'Madras: Government Oriental Manuscripts Series',
        year_or_era: 'c. 1515 CE (Published 1950)',
        citation_details: 'Books I–IV (Gaja-lakshana, war elephant armor, and Paika formations)',
        verified: true
      },
      {
        id: 'src_rd20_03',
        source_type: 'Inscription',
        title: 'Kapilas Stone Inscription of Langula Narasimhadeva I (1246 CE)',
        author_or_authority: 'Epigraphia Indica, Vol. XXXIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1246 CE',
        citation_details: 'Earliest epigraphic record of the imperial title "Gajapati"',
        verified: true
      }
    ],
    original_content: `1. Introduction: Why the Emperors of Odisha Were Styled "Gajapati"
Reference ID: RD-0020 | Record ID: military-gajasena | Period: 12th–16th Century CE | Scope: Imperial Chaturanga-Bala & Gajasena War Elephant Corps.
Throughout medieval Indian and Islamic historiography—from Minhaj-i-Siraj's Tabaqat-i-Nasiri and Ziauddin Barani's Tarikh-i-Firuz Shahi to Firishta, Nizamuddin Ahmad, and Portuguese traveler Fernao Nuniz—the sovereigns of Odisha (Jajnagar / Utkala) were universally recognized as the masters of the largest and most formidable war-elephant force in Asia. This strategic monopoly gave rise to the imperial title "Gajapati" (Lord of the Elephant Forces), first adopted epigraphically by Eastern Ganga Emperor Narasimhadeva I in 1246 CE and elevated into a dynastic cognomen by the Suryavamsha emperors (1434–1541 CE).

2. Ecological Foundations & Royal Elephant Forests (Gaja-Vana)
The moist deciduous forests of the Mahanadi valley, Similipal, Dhenkanal, Angul, Baudh, Kalahandi, and the Mahendragiri-Papikonda ranges of the Eastern Ghats formed the richest wild elephant habitat in peninsular India. The Gajapathi state maintained strict royal jurisdiction over these elephant forests (Hasti-vana), prohibiting unauthorized hunting and operating specialized Khedda capture and training departments overseen by the Gaja-Sahani (Master of the Imperial Elephant Stables).

3. Gajasastra: Scientific Classification & Armor of the Gajasena
Drawing upon classical treatises such as Palakapya's Hastyayurveda and the Harihara Chaturanga of Godavara Misra (composed under Prataparudra Deva), war elephants were graded into Bhadra, Mandra, and Mriga classes based on stature, temperament, and endurance. In battle, premier tusker elephants were fitted with laminated iron and hardened-leather plate armor (Gaja-kavacha), steel tusk-swords (Danta-khadga), and fortified wooden towers (Howdahs) carrying four to six elite archers and javelin throwers.

4. Quantitative Scale of the Imperial Armed Forces
Contemporary chronicles and inscriptions record the staggering scale of the Gajapathi military machine at its 15th-century zenith:
- War Elephants (Gajasena): Between 1,000 and 2,000 battle-ready armored elephants in active field deployment, with larger reserves in provincial Dandapatas.
- Cavalry (Asvasena): 20,000 to 50,000 warhorses imported via coastal ports and inland trade routes.
- Infantry (Padati / Paika-Bala): 200,000 to 500,000 disciplined foot-soldiers organized into hereditary martial guilds.

5. The Paika Infantry & Akhada Martial Training System
Complementing the Gajasena was the legendary Paika (Padatika) infantry—peasant-militia and hereditary martial regiments maintained in every Khanda and village across Odisha and Kalinga. Trained from youth in village martial gymnasiums (Paika Akhadas) in swordsmanship (Khanda), buckler defense, archery (Dhanurveda), spear combat, and acrobatic close-quarters warfare, the Paikas served as the shock infantry protecting the flanks of the war elephants.

6. Sappers, Quarrymen & Siege Engineering Corps
Long-distance campaigns from the Hooghly to the Kaveri required specialized engineering logistics. Hereditary guilds of pioneer earthworkers, road-cutters, bridge-builders, and stone-masons (historically drawn from Odra/Vaddera/Odiyaraju military-engineering clans) marched ahead of the Gajasena to clear mountain passes across the Eastern Ghats, construct earthen siege ramps (Pashebs), and breach enemy stone fortifications.

7. Major Tri-Front Military Campaigns (13th–16th Century CE)
- Lakhnauti Campaigns (1243–1245 CE): Narasimhadeva I's offensive into Bengal, routing Tughral Tughan Khan at Katasin and advancing to Lakhnauti.
- Defeat of the Bahmani Sultanate (1457–1461 CE): Kapilendra Deva and Prince Hamvira Deva routed Humayun Shah Bahmani at Devarkonda and marched toward Bidar.
- Southern Expedition to Kanchi & Srirangam (1463–1464 CE): Projection of Gajapathi power across the entire Coromandel coast.

8. Sculptural Depictions at Konark, Puri & Simhachalam
The lower basement friezes (Upana and Pabhaga) of the Konark Sun Temple alone feature over 1,700 exquisitely carved stone elephants depicting every phase of Khedda capture, training, royal procession, and battlefield shock combat—serving as a permanent lithic manual of the Eastern Ganga and Gajapathi Gajasena.

9. Historiographical Evaluation & Community-Heritage Legacy
The Harihara Chaturanga of Godavara Misra (minister of Prataparudra Deva) provides primary textual verification of Gajapathi military doctrine, while the martial Paika, Khandayat, Odiyaraju (CH-0048), Vadderarajulu (CH-0013), and Oddar/Vaddera (CH-0001) traditions preserve the living cultural memory of these imperial regiments.

10. Conclusion
The Gajasena and Paika military organization enabled the Eastern Ganga and Suryavamsha Gajapathi empires to stand as an unconquered bulwark on India's eastern coast for over four centuries, shaping the geopolitics of medieval South Asia.`
  },

  // ==========================================================================
  // 8. RD-0021: culture-renaissance
  // ==========================================================================
  {
    id: 'culture-renaissance',
    slug: 'cultural-literary-architectural-renaissance-gajapathis',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'RD-0021 | Cultural, Literary & Architectural Renaissance under the Gajapathis: Sarala Dasa, Panchasakha Literature, Jagannatha Dharma & Kalinga Temple Art',
    summary:
      'Comprehensive cultural monograph on the literary, philosophical, musical, and architectural renaissance under the Eastern Ganga and Suryavamsha Gajapathi empires, from Jayadeva and Adikavi Sarala Dasa to the Panchasakha saint-poets, Gitagovinda Seva, and Kalinga temple architecture.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('puri_jagannatha_temple.jpg'),
    tags: [
      'RD-0021',
      'Gajapathi Cultural Renaissance',
      'Sarala Dasa',
      'Panchasakha',
      'Jagannatha Dharma',
      'Odissi Music',
      'Kalinga Architecture',
      'Raya Ramananda'
    ],
    sources: [
      {
        id: 'src_rd21_01',
        source_type: 'Scholarly Book',
        title: 'History of Oriya Literature',
        author_or_authority: 'Dr. Mayadhar Mansinha',
        publication_or_location: 'New Delhi: Sahitya Akademi',
        year_or_era: '1962',
        citation_details: 'Chapters IV–VII (Age of Sarala Dasa and the Panchasakha Movement)',
        verified: true
      },
      {
        id: 'src_rd21_02',
        source_type: 'Inscription',
        title: 'Puri Jagannatha Temple Jaya-Vijaya Doorway Inscription of Prataparudra Deva (July 1499 CE)',
        author_or_authority: 'K.B. Tripathi, The Evolution of Oriya Language and Script',
        publication_or_location: 'Cuttack: Utkal University',
        year_or_era: '1499 CE (Published 1962)',
        citation_details: 'pp. 298–301; Royal mandate regulating Gitagovinda musical and dance seva',
        verified: true
      },
      {
        id: 'src_rd21_03',
        source_type: 'Scholarly Book',
        title: 'The Cult of Jagannath and the Regional Tradition of Orissa',
        author_or_authority: 'Anncharlott Eschmann, Hermann Kulke & G.C. Tripathi (eds.)',
        publication_or_location: 'New Delhi: Manohar',
        year_or_era: '1978',
        citation_details: 'pp. 31–118 (Theological synthesis, Chaitanya movement, and temple rituals)',
        verified: true
      }
    ],
    original_content: `1. Introduction: The Civilizational Efflorescence of the Gajapathi Era
Reference ID: RD-0021 | Record ID: culture-renaissance | Period: 12th–16th Century CE | Cultural Centers: Srikshetra Puri, Kataka, Jhankada, Konark, Simhachalam & Rajahmundry.
While the Eastern Ganga and Suryavamsha Gajapathi empires are celebrated for their military reach from the Ganga to the Kaveri, their most enduring achievement was a profound cultural, literary, philosophical, and architectural renaissance. Between the 12th and 16th centuries CE, the royal courts of Kataka, Puri, and Rajahmundry fostered a unique cosmopolitan synthesis where classical Sanskrit erudition, democratic vernacular Odia literature, and southern Telugu scholarship flourished together under the spiritual canopy of Sri Jagannatha Dharma.

2. Adikavi Sarala Dasa & The Birth of Classical Odia Epic Literature
During the reign of Samrat Kapilendra Deva (1434–1466 CE), Siddhesvara Parida—immortalized as Adikavi Sarala Dasa after the goddess Sarala Chandi of Jhankada—composed three foundational monuments of Odia literature: the Odia Mahabharata (comprising 18 Parvas in indigenous Dandi Vrutti meter), the Vilanka Ramayana, and the Chandi Purana. Rather than producing a word-for-word translation, Sarala Dasa indigenized the Sanskrit epic into the landscape, river systems, historical memory, and ethical worldview of 15th-century Odisha.

3. The Panchasakha Movement & Vernacular Spiritual Democracy
Under Emperor Prataparudra Deva (1497–1540 CE), five visionary saint-poets—collectively revered as the Panchasakha (Five Comrades)—transformed the religious and literary landscape of eastern India:
- Balarama Dasa: Composed the Jagamohana Ramayana (Dandi Ramayana) and the Lakshmi Purana, which championed social equality and rejected caste and gender exclusion centuries ahead of its time.
- Atibadi Jagannatha Dasa: Translated the Srimad Bhagavata Purana into mellifluous nine-syllable (Navakshari) Odia verse, establishing the Bhagabata Tungi (village scripture reading hall) in every Odia village.
- Achyutananda Dasa, Yasovanta Dasa, and Ananta Dasa: Authored hundreds of philosophical treatises, Bhajans, and Malikas blending Sunya-Samhita yoga, Buddhist-Tantric wisdom, and Vaishnava Bhakti.

4. Royal Scholar-Monarchs & Sanskrit Erudition
The Gajapathi emperors were themselves accomplished Sanskrit authors and patrons:
- Kapilendra Deva authored the Sanskrit one-act play Parasurama Vijaya.
- Purushottama Deva composed the Abhinava Gitagovinda, Nama Malika, Mukti Chintamani, and lexical dictionaries (Trikanda Sesha and Haravali), while patronizing Kavidindima Jivadeva Acharya.
- Prataparudra Deva presided over the compilation of the Sarasvativilasa (law), Kautuka Chintamani, and Godavara Misra's Harihara Chaturanga, while his viceroy Raya Ramananda Pattanayak authored the Jagannatha Vallabha Nataka.

5. Sri Chaitanya Mahaprabhu & The Jagannatha Theological Synthesis
In 1510 CE, the Bengali Vaishnava reformer Sri Chaitanya Mahaprabhu arrived at Puri and spent the final eighteen years of his life under the respectful patronage of Prataparudra Deva and Raya Ramananda. At Puri, Jagannatha Dharma synthesized Shaiva, Shakta, Vaishnava, Sauriya, and tribal Savara (Visvavasu) traditions into an inclusive spiritual commonwealth centered on Mahaprasada brotherhood.

6. Performing Arts: Gitagovinda Seva, Mahari Dance & Odissi Music
In 1499 CE, Prataparudra Deva issued his famous Jagannatha Temple inscription mandating the exclusive singing and Mahari (Devadasi) and Gotipua performance of Jayadeva's Gitagovinda and the Abhinava Gitagovinda during the deity's evening Badasinghara ritual—codifying the classical ragas, talas, and mudras that evolved into classical Odissi music and dance.

7. Kalinga Temple Architecture & Shilpi Craft Guilds
Building upon the monumental Rekha and Pidha Deula traditions of Lingaraja, Puri, and Konark, Gajapathi master architects (Sutradharas and Silpis) constructed the massive Meghanada Prachira outer fortification wall, Kurma Bedha, and Natamandapa enhancements at Puri, the Gopinathpur temple, the Kapilesvara temple additions at Bhubaneswar, and extensive mandapas at Simhachalam and Srikurmam.

8. Multilingual Literary Exchange across the Kalinga-Andhra Corridor
Through the southern viceroyalties of Rajahmundry and Kondavidu, the Gajapathi court actively patronized Telugu poets and Sanskrit scholars from coastal Andhra, fostering deep cultural cross-pollination with the Vijayanagara literary sphere.

9. Community-Heritage Continuity in Sacred Art & Craftsmanship
The monumental temple complexes, stone sculptures, stepped tanks, and festival traditions of the Gajapathi renaissance were physically built and sustained by hereditary Shilpi, stone-carving, and martial communities—preserving a direct bridge to the Vaddera (CH-0001), Odiyaraju (CH-0048), Gajapathirajulu (CH-0005), and Kalingarajulu (CH-0004) heritage documented across the Community-Heritage archive.

10. Conclusion
The cultural renaissance under the Gajapathi Emperors bequeathed a timeless legacy—the Odia Mahabharata, the Odia Bhagabata, classical Odissi performing arts, and the living spiritual democracy of Puri Srikshetra.`
  },

  // ==========================================================================
  // 9. KD-0023: dyn_kakatiya_orugallu
  // ==========================================================================
  {
    id: 'dyn_kakatiya_orugallu',
    slug: 'kakatiya-imperial-dynasty-anumakonda-orugallu-dossier',
    category: 'Royal Dynasties',
    original_language: 'en',
    original_title:
      'KD-0023 | Kakatiya Imperial Dynasty of Anumakonda & Orugallu (c. 956–1323 CE): Sovereign Statecraft, Nayankara Institutions & Hydraulic Monumentalism',
    summary:
      'Royal Dynasty Dossier on the Kakatiya Empire of Anumakonda and Orugallu/Warangal (c. 956–1323 CE), examining its Durjaya-Suryavamsha epigraphic claims, Nayankara military system, chain-tank irrigation network, UNESCO Ramappa Temple, and historical interconnections with the Gajapathi Empire.',
    author_name: 'Editorial & Historical Research Board',
    publication_date: '2026-03-01',
    verification_status: 'Published',
    evidence_category: 'verified_archaeological',
    featured_image: ARCHIVE_IMG('warangal_kirti_torana.jpg'),
    tags: [
      'KD-0023',
      'Kakatiya Dynasty',
      'Orugallu',
      'Warangal',
      'Ganapatideva',
      'Rani Rudramadevi',
      'Prataparudra II',
      'Ramappa Temple',
      'Swayambhu Siva'
    ],
    sources: [
      {
        id: 'src_kd23_01',
        source_type: 'Scholarly Book',
        title: 'The Kakatiyas of Warangal',
        author_or_authority: 'Dr. P.V. Parabrahma Sastry',
        publication_or_location: 'Hyderabad: Government of Andhra Pradesh',
        year_or_era: '1978',
        citation_details: 'Chapters III–IX (Chronology, epigraphy, Nayankara administration, and irrigation)',
        verified: true
      },
      {
        id: 'src_kd23_02',
        source_type: 'Scholarly Book',
        title: 'Precolonial India in Practice: Society, Region, and Identity in Medieval Andhra',
        author_or_authority: 'Prof. Cynthia Talbot',
        publication_or_location: 'New York: Oxford University Press',
        year_or_era: '2001',
        citation_details: 'pp. 48–172 (Inscriptional corpus of Ganapatideva, Rudramadevi, and Prataparudra II)',
        verified: true
      },
      {
        id: 'src_kd23_03',
        source_type: 'Inscription',
        title: 'Hanamkonda Thousand Pillar Temple Inscription of Rudradeva (Saka 1084 / 1163 CE)',
        author_or_authority: 'J.F. Fleet (ed.), Indian Antiquary, Vol. XI / Corpus of Telingana Inscriptions',
        publication_or_location: 'Hyderabad: Archaeological Department',
        year_or_era: '1163 CE',
        citation_details: 'Proclamation of full Kakatiya imperial sovereignty',
        verified: true
      },
      {
        id: 'src_kd23_04',
        source_type: 'Inscription',
        title: 'Motupalli Pillar Inscription (Abhaya Sasana) of Ganapatideva (1244 CE)',
        author_or_authority: 'E. Hultzsch (ed.), Epigraphia Indica, Vol. XII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1244 CE',
        citation_details: 'pp. 188–197; Maritime trade security charter',
        verified: true
      }
    ],
    original_content: `1. Introduction: The Sovereign Unification of Andhradesa & Telangana
Reference ID: KD-0023 | Record ID: dyn_kakatiya_orugallu | Period: c. 956–1323 CE | Capitals: Anumakonda (Hanamkonda) & Orugallu (Warangal).
The Kakatiya Imperial Dynasty of Anumakonda (Hanamkonda) and Orugallu (Warangal) reigned from c. 956 to 1323 CE as the premier indigenous sovereign power of medieval Telangana and Andhra Pradesh. Rising from early Rashtrakuta and Western Chalukya feudatory chiefs (Samantas) to full imperial sovereigns under Rudradeva (Prataparudra I, 1158–1195 CE), Ganapatideva (1199–1262 CE), Rani Rudramadevi (1262–1289 CE), and Prataparudra II (1289–1323 CE), the Kakatiyas forged the political, linguistic, architectural, and agrarian unity of the Telugu-speaking world ("Trilinga Desha") and deeply influenced the administrative and fortress architecture later adopted by both the Vijayanagara and Suryavamsha Gajapathi empires.

2. Origins, Durjaya Lineage & Suryavamsha Epigraphic Claims
The Bayyaram Tank Inscription of Mailama (sister of Ganapatideva) and the Kazipet and Malkapuram inscriptions trace the early Kakatiya progenitors—Gundaya Rashtrakuta, Betaraja I, Prola I, Betaraja II, and Prola II—to the illustrious Durjaya clan and connect their royal genealogy with the Karikala Chola / Ikshvaku solar lineage (Suryavamsha). Their dynastic name derived from the worship of the goddess Kakati (Durga) at Kakati-pura, while Lord Swayambhu Siva of Orugallu served as their supreme state tutelary deity.

3. Chronological Evolution: Feudatory Samantas to Sovereign Emperors
- Early Feudatory Phase at Anumakonda (c. 956–1158 CE): Betaraja I, Prola I, Betaraja II, and Prola II expanded their domain across Sabbinadu and Anumakonda-vishaya under Western Chalukya suzerainty, constructing early Trikuta shrines and the Kesamudram and Jagatkesari tanks.
- Proclamation of Imperial Sovereignty under Rudradeva (1158–1195 CE): Author of the Thousand Pillar Temple (Rudresvara) inscription at Hanamkonda (1163 CE) and builder of the new concentric fortress capital at Orugallu (Ekasilapuri / Warangal).
- Imperial Zenith under Ganapatideva (1199–1262 CE): Over a 63-year reign, Ganapatideva unified coastal Andhra (Vengi), Velanadu, Nellore, and Kalinga borderlands with the Telangana plateau, issuing the famous Motupalli Abhaya Sasana (1244 CE) to guarantee maritime security for international merchants.
- Heroic Reign of Rani Rudramadevi (1262–1289 CE): Designated male co-regent and successor under the royal title "Rudradeva Maharaja", she crushed internal Kayastha rebellions, defeated the Yadava invasion of Mahadeva of Devagiri, completed the triple fortifications of Orugallu, and died on the battlefield at Chandupatla in November 1289 CE.
- Terminal Defense under Prataparudra II (1289–1323 CE): Reorganized the empire into 77 Nayankara fiefs and withstood repeated invasions by the Delhi Sultanate (1303, 1309, 1318, and 1323 CE) before the fall of Orugallu to Ulugh Khan (Muhammad bin Tughluq) in 1323 CE.

4. The Concentric Citadel of Orugallu (Ekasilapuri)
Orugallu Fort stood as one of medieval India's greatest feats of military engineering, encircled by three concentric lines of defense: an outer earthen rampart (Matti-kota) 12.5 kilometers in diameter surrounded by a deep moat, a massive middle wall constructed of cyclopean granite blocks (Kallu-kota) fitted without mortar and protected by 45 rectangular bastions, and an inner citadel housing the Swayambhu Siva temple and four monumental carved stone gateways (Kirti Toranas).

5. The Nayankara System & Administrative Innovation
Rani Rudramadevi and Prataparudra II institutionalized the Nayankara administrative-military system: assigning fixed revenue districts (Sthalas and Nadus) to 77 trusted military commanders (Nayakas) who maintained standing armies for the imperial crown. After 1323 CE, this exact Nayankara institution became the administrative blueprint for the Musunuri Nayakas, the Reddi Kingdoms, the Vijayanagara Empire, and the southern Gajapathi Rajyas.

6. Hydraulic Engineering: The Chain-Tank (Golusu-Kattu Cheruvu) Revolution
Transforming the semi-arid granite uplands of Telangana into a prosperous agricultural heartland, the Kakatiya sovereigns and their feudatories (Recherla Rudra, Malyala Chaunda, and Ganapamba) constructed thousands of interconnected irrigation reservoirs—including Ramappa Cheruvu, Pakhal Lake, Lakhnavaram Lake, Ghanpur Tank, and Bayyaram Tank—linked in hydrological cascades (Golusu-Kattu Cheruvulu).

7. UNESCO World Heritage Architecture: Ramappa & Rudresvara Temples
Consecrated in 1213 CE by General Recherla Rudra under Ganapatideva, the Rudresvara (Ramappa) Temple at Palampet—inscribed as a UNESCO World Heritage Site—exemplifies Kakatiya engineering mastery: sandbox earthquake-resistant foundations, ultra-lightweight floating porous bricks (neredu/spongy bricks) in the Vimana, and mirror-polished black dolerite bracket figures (Madanikas) inspired by Jayapa Senani's Nrittaratnavali.

8. Historical Interconnections with the Eastern Gangas & Gajapathis
The Kakatiyas and the sovereigns of Odisha shared over two centuries of diplomatic, marital, and military interaction along the Godavari-Kalinga frontier. Later, in February 1458 CE, Suryavamsha Gajapathi Emperor Kapilendra Deva and Prince Hamvira Deva liberated Orugallu (Warangal) Fort, engraving their triumphant victory inscription directly upon the southern gateway of the Kakatiya citadel.

9. Historiographical Classification & Community-Heritage Cross-References
- Primary Epigraphy: Verified by over 1,000 Sanskrit and Telugu stone and copper-plate inscriptions (Hanamkonda 1163 CE, Palampet 1213 CE, Motupalli 1244 CE, Malkapuram 1261 CE, Chandupatla 1289 CE).
- Community-Heritage Linkages: The excavation of thousands of irrigation tanks, quarrying of granite fortifications at Orugallu, and defense of the 77 Nayankara forts relied heavily upon specialist stone-cutting (Kallu-Vaddera / Shilpi), earthwork (Mannu-Vaddera), and martial Odiyaraju (CH-0048), Vadderarajulu (CH-0013), and Vaddera (CH-0001) communities documented across the Community-Heritage archive.

10. Conclusion
The Kakatiya Imperial Dynasty bequeathed an indelible civilizational legacy—expressed in the iconic Warangal Kirti Toranas, the UNESCO Ramappa Temple, the life-giving chain-tanks of Telangana, and the enduring Nayaka and Odiyaraju/Vaddera engineering heritage of the Deccan.`
  },
  ...GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_ARTICLES
];

const COMMON_CAT_NAME: Record<LanguageCode, string> = {
  en: 'Royal Dynasties',
  hi: 'राजवंश एवं साम्राज्यिक विरासत',
  te: 'రాజవంశాలు & సామ్రాజ్య వారసత్వం',
  kn: 'ರಾಜವಂಶಗಳು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯ ಪರಂಪರೆ',
  ta: 'அரச வம்சங்கள் & பேரரசு மரபு',
  mr: 'राजवंश आणि साम्राज्य वारसा',
  or: 'ରାଜବଂଶ ଓ ସାମ୍ରାଜ୍ୟ ଐତିହ୍ୟ',
  bn: 'রাজবংশ ও সাম্রাজ্যিক ঐতিহ্য'
};

function make8LangText(enText: string): Record<LanguageCode, string> {
  return {
    en: enText,
    hi: enText,
    te: enText,
    kn: enText,
    ta: enText,
    mr: enText,
    or: enText,
    bn: enText
  };
}

export const GAJAPATHI_KINGS_DOSSIER_STRUCTURED_METADATA: Record<string, ArticleStructuredMetadata> = {
  dyn_suryavamsha_gajapathi: {
    refNumber: 'RD-0014',
    articleId: 'dyn_suryavamsha_gajapathi',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Suryavamsha Gajapathi Imperial Dynasty (1434–1541 CE)'),
    historicalPeriod: make8LangText('Late Medieval Imperial Era (1434–1541 CE)'),
    approxDateRange: make8LangText('1434 CE – 1541 CE (107 Years)'),
    geographicalLocation: make8LangText('Abhinava Varanasi Kataka (Cuttack), Puri, Kalinga, Rajahmundry, Kondavidu & Udayagiri'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Suryavamsha Gajapathi Imperial Seal & Epigraphic Monument',
      caption: 'Archival representation of Samrat Kapilendra Deva and the Suryavamsha Gajapathi imperial court at Kataka.',
      period: '15th–16th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India / Odisha State Museum Epigraphic Archives',
      credit: 'Archival Historical Documentation',
      altText: 'Suryavamsha Gajapathi royal monument and epigraphic record',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_05_gajapathirajulu',
        canonicalTerm: 'GajapathiRajulu (CH-0005)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th Century CE to Present',
        relationshipSummary: make8LangText(
          'Direct dynastic and titular heritage derived from the Suryavamsha Gajapathi imperial house of Kataka and Kalinga.'
        ),
        supportingRef: '[src_rd14_01] R. Subrahmanyam (1957); [src_rd14_02] Veligalani Plates (1458 CE)',
        targetRoute: '/community-heritage?article=comm_dir_05_gajapathirajulu'
      },
      {
        communityId: 'syn_odiyaraju_karnataka',
        canonicalTerm: 'Odiyaraju / Odra-Raju (CH-0048)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 19th Century CE',
        relationshipSummary: make8LangText(
          'Southern martial and administrative lineages deployed across the Gajapathi viceroyalties of Rajahmundry, Kondavidu, and Udayagiri.'
        ),
        supportingRef: '[src_rd14_01] R. Subrahmanyam (1957); Edgar Thurston (1909)',
        targetRoute: '/community-heritage?article=syn_odiyaraju_karnataka'
      },
      {
        communityId: 'comm_dir_13_vadderarajulu',
        canonicalTerm: 'Vadderarajulu / Odderajulu (CH-0013)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 19th Century CE',
        relationshipSummary: make8LangText(
          'Fortress-building, hydraulic engineering, and martial Nayaka communities of the Odra-Suryavamsha southern corridor.'
        ),
        supportingRef: '[src_rd14_02] Veligalani Grant (1458 CE); Mackenzie Kaifiyats',
        targetRoute: '/community-heritage?article=comm_dir_13_vadderarajulu'
      }
    ],
    relatedArticleIds: [
      'art_gajapathi_kapilendra',
      'dyn_eastern_ganga',
      'dyn_bhoi_mukunda',
      'dyn_traditional_suryavamsha_lineages',
      'admin-mahapatras',
      'admin-nayakas',
      'military-gajasena',
      'culture-renaissance'
    ],
    relatedFigureIds: [
      'fig_kapilendra_deva',
      'fig_purushottama_deva',
      'fig_prataparudra_deva',
      'fig_hamvira_deva',
      'fig_sarala_dasa'
    ],
    relatedDynastyNames: [
      'Suryavamsha Gajapathi Dynasty',
      'Eastern Ganga Dynasty',
      'Bhoi & Chalukya-Gajapathi Successors'
    ]
  },

  dyn_eastern_ganga: {
    refNumber: 'RD-0015',
    articleId: 'dyn_eastern_ganga',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Imperial Eastern Ganga (Chodaganga) Dynasty (498–1434 CE)'),
    historicalPeriod: make8LangText('Classical to Medieval Imperial Era (498–1434 CE)'),
    approxDateRange: make8LangText('498 CE – 1434 CE (936 Years)'),
    geographicalLocation: make8LangText('Kalinganagara (Mukhalingam), Mahendragiri, Abhinava Varanasi Kataka, Puri & Konark'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Konark Sun Temple & Mukhalingam Imperial Ganga Architecture',
      caption: '13th-century stone solar chariot wheel at Konark commissioned by Eastern Ganga Emperor Narasimhadeva I.',
      period: '11th–13th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India (UNESCO World Heritage Site Archive)',
      credit: 'Archival Architectural Photography',
      altText: 'Carved stone chariot wheel of Konark Sun Temple',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_04_kalingarajulu',
        canonicalTerm: 'Kalingarajulu (CH-0004)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '6th – 16th Century CE',
        relationshipSummary: make8LangText(
          'Direct historical continuity with the Kalinganagara (Mukhalingam) and Kalinga Dandapata military-administrative aristocracy.'
        ),
        supportingRef: '[src_rd15_01] Korni Plates (1112 CE); [src_rd15_03] S.N. Rajaguru (1960)',
        targetRoute: '/community-heritage?article=comm_dir_04_kalingarajulu'
      },
      {
        communityId: 'comm_dir_01_vaddera',
        canonicalTerm: 'Vaddera / Oddar Shilpi & Hydraulic Guilds (CH-0001)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '11th – 15th Century CE',
        relationshipSummary: make8LangText(
          'Hereditary lithic quarrymen, temple sculptors, and Sagar-tank builders deployed across Mukhalingam, Puri, Konark, and Simhachalam.'
        ),
        supportingRef: '[src_rd15_02] Kendupatna Plates (1295 CE); [src_rd15_04] T.E. Donaldson (1985)',
        targetRoute: '/community-heritage?article=comm_dir_01_vaddera'
      }
    ],
    relatedArticleIds: [
      'art_dyn_eastern_gangas',
      'art_dyn_western_gangas',
      'dyn_suryavamsha_gajapathi',
      'art_gajapathi_kapilendra',
      'culture-renaissance'
    ],
    relatedFigureIds: ['fig_chodaganga_deva', 'fig_narasimha_deva_i', 'fig_kapilendra_deva'],
    relatedDynastyNames: ['Eastern Ganga Dynasty', 'Western Ganga Dynasty', 'Suryavamsha Gajapathi Dynasty']
  },

  dyn_bhoi_mukunda: {
    refNumber: 'RD-0016',
    articleId: 'dyn_bhoi_mukunda',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Chalukya-Gajapathi & Bhoi Successor Lineages (1541–1568 CE)'),
    historicalPeriod: make8LangText('16th Century CE & Post-1568 Khurda Continuation'),
    approxDateRange: make8LangText('1541 CE – 1568 CE (and Khurda Rajya from 1568 CE)'),
    geographicalLocation: make8LangText('Barabati Fort (Kataka), Triveni Ghat (Hooghly), Draksharama & Khurda Fort'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Barabati Fort Citadel & Gateway at Kataka (Cuttack)',
      caption: 'Imperial citadel of Barabati where Maharaja Mukunda Deva erected the nine-storeyed palace described in the Ain-i-Akbari.',
      period: '16th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Bhubaneswar Circle',
      credit: 'Archival Monument Photography',
      altText: 'Stone gateway and moat of Barabati Fort in Cuttack',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'syn_odiyaraju_karnataka',
        canonicalTerm: 'Odiyaraju / Chalukya-Gajapathi Lineages (CH-0048)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '16th – 19th Century CE',
        relationshipSummary: make8LangText(
          'Synthesis of Eastern Chalukya and Gajapathi martial lineages under Emperor Mukunda Deva and subsequent southward dispersion after 1568 CE.'
        ),
        supportingRef: '[src_rd16_01] P. Mukherjee (1981); [src_rd16_03] Draksharama Inscription',
        targetRoute: '/community-heritage?article=syn_odiyaraju_karnataka'
      },
      {
        communityId: 'comm_dir_05_gajapathirajulu',
        canonicalTerm: 'GajapathiRajulu & Khurda Royal Lineages (CH-0005)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '16th Century CE to Present',
        relationshipSummary: make8LangText(
          'Preservation of the Gajapathi sovereign title and Sri Jagannatha stewardship under the Khurda Rajya.'
        ),
        supportingRef: '[src_rd16_04] H. Kulke (1993)',
        targetRoute: '/community-heritage?article=comm_dir_05_gajapathirajulu'
      }
    ],
    relatedArticleIds: [
      'dyn_suryavamsha_gajapathi',
      'art_gajapathi_kapilendra',
      'art_dyn_vengi_chalukyas',
      'dyn_traditional_suryavamsha_lineages'
    ],
    relatedFigureIds: ['fig_prataparudra_deva', 'fig_kapilendra_deva'],
    relatedDynastyNames: ['Bhoi Dynasty', 'Chalukya-Gajapathi Dynasty', 'Khurda Gajapathi Line']
  },

  dyn_traditional_suryavamsha_lineages: {
    refNumber: 'RD-0017',
    articleId: 'dyn_traditional_suryavamsha_lineages',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Southern Suryavamsha Odiyaraju / Vaddera / Oddar Nayaka Lineages'),
    historicalPeriod: make8LangText('Late Medieval to Early Modern Era (14th–18th Century CE)'),
    approxDateRange: make8LangText('c. 1350 CE – 1805 CE'),
    geographicalLocation: make8LangText('Coastal Andhra, Rayalaseema, Telangana, Karnataka (Chitradurga/Mysore) & Tamil Nadu'),
    epistemicClassification: 'Scholarly Historiographical Synthesis',
    imageProvenance: {
      title: 'Cyclopean Granite Ramparts of Kondavidu & Southern Giri-Durga Citadels',
      caption: 'Mountain fortress ramparts garrisoned and engineered by Odra/Odiyaraju/Vaddera Nayaka lineages in southern India.',
      period: '15th–18th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Southern Circle Archives',
      credit: 'Archival Fortress Documentation',
      altText: 'Granite hill fortress ramparts and bastions in the Eastern Ghats',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'syn_odiyaraju_karnataka',
        canonicalTerm: 'Odiyaraju (CH-0048)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th Century CE to Present',
        relationshipSummary: make8LangText(
          'Primary southern Suryavamsha community lineage preserving explicit ethnonyms and oral histories of Odra-Gajapathi royal origin.'
        ),
        supportingRef: '[src_rd17_01] Mackenzie Kaifiyats; [src_rd17_02] E. Thurston (1909)',
        targetRoute: '/community-heritage?article=syn_odiyaraju_karnataka'
      },
      {
        communityId: 'syn_odderajulu',
        canonicalTerm: 'Odderajulu (CH-0006)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th Century CE to Present',
        relationshipSummary: make8LangText(
          'Regional Telugu-speaking martial and fortress-engineering lineage settled around Rajahmundry, Kondapalli, Kondavidu, and Udayagiri.'
        ),
        supportingRef: '[src_rd17_02] E. Thurston (1909), Vol. V, pp. 422–435',
        targetRoute: '/community-heritage?article=syn_odderajulu'
      },
      {
        communityId: 'comm_dir_13_vadderarajulu',
        canonicalTerm: 'Vadderarajulu (CH-0013)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '14th Century CE to Present',
        relationshipSummary: make8LangText(
          'Sovereign infrastructure, Giri-Durga masonry, and martial Samsthanam lineage across Andhra, Telangana, and Rayalaseema.'
        ),
        supportingRef: '[src_rd17_03] C. Talbot (2001); [src_rd17_04] Mysore Gazetteer',
        targetRoute: '/community-heritage?article=comm_dir_13_vadderarajulu'
      }
    ],
    relatedArticleIds: [
      'dyn_suryavamsha_gajapathi',
      'art_gajapathi_kapilendra',
      'art_odra_desha_history',
      'art_epigraphic_evolution_odra',
      'art_genealogy_methodology',
      'admin-nayakas'
    ],
    relatedFigureIds: ['fig_kapilendra_deva', 'fig_hamvira_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Southern Odiyaraju / Vaddera Nayaka Polities']
  },

  'admin-mahapatras': {
    refNumber: 'RD-0018',
    articleId: 'admin-mahapatras',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Imperial Administration: Mahapatras, Parikshas & The Dandapata System'),
    historicalPeriod: make8LangText('Imperial Ganga & Suryavamsha Gajapathi Era (12th–16th Century CE)'),
    approxDateRange: make8LangText('c. 1112 CE – 1568 CE'),
    geographicalLocation: make8LangText('Northern & Central Dandapatas (Odisha) and Southern Rajyas (Rajahmundry, Kondavidu, Udayagiri)'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Trilingual Royal Copper-Plate Charter (Tamrasasana) of the Gajapathi Chancery',
      caption: 'Engraved copper-plate grant illustrating the trilingual Sanskrit, Odia, and Telugu administrative governance of the Mahapatras.',
      period: '15th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Epigraphy Branch',
      credit: 'Archival Epigraphic Facsimile',
      altText: 'Engraved royal copper-plate charter with ring seal',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_04_kalingarajulu',
        canonicalTerm: 'Kalingarajulu & Provincial Administrative Lineages (CH-0004)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '12th – 16th Century CE',
        relationshipSummary: make8LangText(
          'Provincial administrators, Bisoyis, and Samantas of the Kalinga and Rajahmundry Dandapatas.'
        ),
        supportingRef: '[src_rd18_01] R. Subrahmanyam (1957); [src_rd18_03] Veligalani Plates (1458 CE)',
        targetRoute: '/community-heritage?article=comm_dir_04_kalingarajulu'
      },
      {
        communityId: 'syn_odiyaraju_karnataka',
        canonicalTerm: 'Odiyaraju Lineages (CH-0048)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 18th Century CE',
        relationshipSummary: make8LangText(
          'Southern administrative and military families serving in the Gajapathi Rajyas of Kondavidu and Udayagiri.'
        ),
        supportingRef: '[src_rd18_01] R. Subrahmanyam (1957)',
        targetRoute: '/community-heritage?article=syn_odiyaraju_karnataka'
      }
    ],
    relatedArticleIds: [
      'dyn_suryavamsha_gajapathi',
      'art_gajapathi_kapilendra',
      'admin-nayakas',
      'military-gajasena',
      'culture-renaissance'
    ],
    relatedFigureIds: ['fig_kapilendra_deva', 'fig_prataparudra_deva', 'fig_hamvira_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty']
  },

  'admin-nayakas': {
    refNumber: 'RD-0019',
    articleId: 'admin-nayakas',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Military Architecture: Nayakas, Durgapatis & The Giri-Durga / Jala-Durga Network'),
    historicalPeriod: make8LangText('Imperial Ganga & Suryavamsha Gajapathi Era (12th–16th Century CE)'),
    approxDateRange: make8LangText('c. 1135 CE – 1568 CE'),
    geographicalLocation: make8LangText('Barabati, Raibania, Potagarh, Rajahmundry, Kondapalli, Kondavidu, Kolletikota & Udayagiri'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Giri-Durga Mountain Fortress Ramparts of Kondavidu & Udayagiri',
      caption: 'Cyclopean dry-stone granite bastion and summit water reservoir of a southern Gajapathi Giri-Durga citadel.',
      period: '15th–16th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Fortress Survey',
      credit: 'Archival Architectural Photography',
      altText: 'Mountain fortress stone ramparts and bastion',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_13_vadderarajulu',
        canonicalTerm: 'Vadderarajulu / Kallu-Vaddera Fortress Builders (CH-0013)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '14th – 18th Century CE',
        relationshipSummary: make8LangText(
          'Hereditary lithic engineers and Durgapati retainers who quarried and constructed Giri-Durga ramparts and summit tanks.'
        ),
        supportingRef: '[src_rd19_01] R. Sewell (1900); [src_rd19_02] Sastri & Venkataramanayya (1946)',
        targetRoute: '/community-heritage?article=comm_dir_13_vadderarajulu'
      },
      {
        communityId: 'syn_odderajulu',
        canonicalTerm: 'Odderajulu & Odiyaraju Nayakas (CH-0006)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 18th Century CE',
        relationshipSummary: make8LangText(
          'Martial garrison lineages stationed in the southern Gajapathi hill and water forts.'
        ),
        supportingRef: '[src_rd19_02] Further Sources of Vijayanagara History (1946)',
        targetRoute: '/community-heritage?article=syn_odderajulu'
      }
    ],
    relatedArticleIds: [
      'dyn_suryavamsha_gajapathi',
      'admin-mahapatras',
      'military-gajasena',
      'dyn_traditional_suryavamsha_lineages',
      'art_kolletikota_peddintlamma_lake'
    ],
    relatedFigureIds: ['fig_kapilendra_deva', 'fig_hamvira_deva', 'fig_prataparudra_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty', 'Kakatiya Dynasty']
  },

  'military-gajasena': {
    refNumber: 'RD-0020',
    articleId: 'military-gajasena',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Imperial Military Organisation: The Gajasena War Elephant Corps & Paika Infantry'),
    historicalPeriod: make8LangText('Imperial Ganga & Suryavamsha Gajapathi Era (13th–16th Century CE)'),
    approxDateRange: make8LangText('1246 CE – 1568 CE'),
    geographicalLocation: make8LangText('Mahanadi & Eastern Ghats Elephant Reserves; Battlefields from Lakhnauti to Kanchipuram'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: '13th-Century Sculptured War Elephant Frieze from Konark Sun Temple',
      caption: 'Monolithic stone sculpture of an armored war elephant from the royal Gajasena of Narasimhadeva I at Konark.',
      period: '13th Century CE',
      sourceOrProvenance: 'Konark Sun Temple / Archaeological Survey of India',
      credit: 'Archival Sculpture Photography',
      altText: 'Stone sculpture of a royal war elephant at Konark',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_01_vaddera',
        canonicalTerm: 'Vaddera / Oddar Pioneer & Siege Engineering Corps (CH-0001)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '13th – 18th Century CE',
        relationshipSummary: make8LangText(
          'Hereditary military pioneers, mountain-pass cutters, and siege-ramp builders marching ahead of the imperial Gajasena.'
        ),
        supportingRef: '[src_rd20_01] T.R. Trautmann (2015); [src_rd20_02] Harihara Chaturanga',
        targetRoute: '/community-heritage?article=comm_dir_01_vaddera'
      },
      {
        communityId: 'syn_odiyaraju_karnataka',
        canonicalTerm: 'Odiyaraju & Paika-Nayaka Martial Lineages (CH-0048)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th – 18th Century CE',
        relationshipSummary: make8LangText(
          'Commanders and shock infantry regiments of the southern Gajapathi expeditions.'
        ),
        supportingRef: '[src_rd20_02] Godavara Misra’s Harihara Chaturanga',
        targetRoute: '/community-heritage?article=syn_odiyaraju_karnataka'
      }
    ],
    relatedArticleIds: [
      'dyn_suryavamsha_gajapathi',
      'dyn_eastern_ganga',
      'admin-nayakas',
      'admin-mahapatras',
      'art_gajapathi_kapilendra'
    ],
    relatedFigureIds: ['fig_narasimha_deva_i', 'fig_kapilendra_deva', 'fig_hamvira_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty']
  },

  'culture-renaissance': {
    refNumber: 'RD-0021',
    articleId: 'culture-renaissance',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Cultural, Literary & Architectural Renaissance under the Gajapathis'),
    historicalPeriod: make8LangText('12th–16th Century CE (Golden Age of Odia Literature & Kalinga Architecture)'),
    approxDateRange: make8LangText('c. 1135 CE – 1540 CE'),
    geographicalLocation: make8LangText('Srikshetra Puri, Abhinava Varanasi Kataka, Jhankada, Konark, Simhachalam & Rajahmundry'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Sri Jagannatha Temple Complex & Meghanada Prachira at Puri',
      caption: 'Sacred epicenter of the Gajapathi literary, musical, and architectural renaissance at Srikshetra Puri.',
      period: '12th–15th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India / Puri Temple Archives',
      credit: 'Archival Temple Photography',
      altText: 'Sri Jagannatha Temple vimana and Meghanada Prachira enclosure at Puri',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_01_vaddera',
        canonicalTerm: 'Vaddera / Oddar Shilpi & Temple Artisan Guilds (CH-0001)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '12th – 16th Century CE',
        relationshipSummary: make8LangText(
          'Master stone-quarrymen and structural masons who erected the monumental stone enclosures, mandapas, and stepped tanks at Puri, Konark, and Simhachalam.'
        ),
        supportingRef: '[src_rd21_03] Eschmann, Kulke & Tripathi (1978)',
        targetRoute: '/community-heritage?article=comm_dir_01_vaddera'
      },
      {
        communityId: 'comm_dir_05_gajapathirajulu',
        canonicalTerm: 'GajapathiRajulu & Odiyaraju Cultural Patronage (CH-0005)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '15th Century CE to Present',
        relationshipSummary: make8LangText(
          'Preservation of Sri Jagannatha, Narasimha, and solar dynastic cultural traditions across Kalinga and Andhra.'
        ),
        supportingRef: '[src_rd21_01] M. Mansinha (1962); [src_rd21_02] Puri Inscription (1499 CE)',
        targetRoute: '/community-heritage?article=comm_dir_05_gajapathirajulu'
      }
    ],
    relatedArticleIds: [
      'dyn_suryavamsha_gajapathi',
      'dyn_eastern_ganga',
      'art_gajapathi_kapilendra',
      'admin-mahapatras'
    ],
    relatedFigureIds: ['fig_sarala_dasa', 'fig_purushottama_deva', 'fig_prataparudra_deva', 'fig_kapilendra_deva'],
    relatedDynastyNames: ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty']
  },

  dyn_kakatiya_orugallu: {
    refNumber: 'KD-0023',
    articleId: 'dyn_kakatiya_orugallu',
    categoryCode: 'RD',
    categoryName: COMMON_CAT_NAME,
    subcategoryName: make8LangText('Kakatiya Imperial Dynasty of Anumakonda & Orugallu (c. 956–1323 CE)'),
    historicalPeriod: make8LangText('Medieval Deccan Imperial Era (c. 956–1323 CE)'),
    approxDateRange: make8LangText('c. 956 CE – 1323 CE'),
    geographicalLocation: make8LangText('Anumakonda (Hanamkonda), Orugallu (Warangal), Palampet (Ramappa), Motupalli & Andhradesa'),
    epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
    imageProvenance: {
      title: 'Kakatiya Kala Toranam (Kirti Torana) of Orugallu Fort & UNESCO Ramappa Temple',
      caption: 'Monumental carved granite gateway of the Swayambhu Siva Temple inside Warangal Fort.',
      period: '12th–13th Century CE',
      sourceOrProvenance: 'Archaeological Survey of India Hyderabad Circle',
      credit: 'Archival Monument Photography',
      altText: 'Monolithic stone Kirti Torana gateway at Warangal Fort',
      visualType: 'Archival Photograph / Epigraphic Facsimile'
    },
    communityCrossReferences: [
      {
        communityId: 'comm_dir_01_vaddera',
        canonicalTerm: 'Vaddera / Oddar Hydraulic & Fortress Engineering Guilds (CH-0001)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '11th – 14th Century CE',
        relationshipSummary: make8LangText(
          'Master stone-quarrymen and earthwork engineers who excavated Telangana’s chain-tanks (Pakhal, Ramappa, Lakhnavaram) and dressed the cyclopean granite ramparts of Orugallu Fort.'
        ),
        supportingRef: '[src_kd23_01] P.V. Parabrahma Sastry (1978); [src_kd23_02] C. Talbot (2001)',
        targetRoute: '/community-heritage?article=comm_dir_01_vaddera'
      },
      {
        communityId: 'comm_dir_13_vadderarajulu',
        canonicalTerm: 'Vadderarajulu & Odiyaraju Nayaka Lineages (CH-0013)',
        associationType: 'Documented Epigraphic / Gazetteer Association',
        historicalPeriod: '12th – 16th Century CE',
        relationshipSummary: make8LangText(
          'Martial Nayaka and Durgapati families serving under the Kakatiya 77-Nayaka system and the 1458 CE Gajapathi liberation of Warangal.'
        ),
        supportingRef: '[src_kd23_01] P.V. Parabrahma Sastry (1978)',
        targetRoute: '/community-heritage?article=comm_dir_13_vadderarajulu'
      }
    ],
    relatedArticleIds: [
      'art_dyn_kakatiya_orugallu',
      'dyn_suryavamsha_gajapathi',
      'art_gajapathi_kapilendra',
      'admin-nayakas',
      'dyn_traditional_suryavamsha_lineages'
    ],
    relatedFigureIds: ['fig_ganapatideva', 'fig_rudramadevi', 'fig_prataparudra_ii', 'fig_hamvira_deva'],
    relatedDynastyNames: ['Kakatiya Dynasty', 'Suryavamsha Gajapathi Dynasty']
  },
  ...GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_METADATA
};

// Enrich all dossier structured metadata entries with 8-language localized fields, community relationship summaries, and 9 professional heritage categories
for (const [id, meta] of Object.entries(GAJAPATHI_KINGS_DOSSIER_STRUCTURED_METADATA)) {
  const m8 = SPECIFIC_METADATA_8LANG_MAP[id];
  if (m8) {
    meta.subcategoryName = m8.subcategoryName;
    meta.historicalPeriod = m8.historicalPeriod;
    meta.approxDateRange = m8.approxDateRange;
    meta.geographicalLocation = m8.geographicalLocation;
  }
  if (meta.communityCrossReferences) {
    for (const comm of meta.communityCrossReferences) {
      const rel8 = COMMUNITY_RELATIONSHIP_TRANSLATIONS_8LANG[comm.communityId];
      if (rel8) {
        comm.relationshipSummary = {
          ...rel8,
          en: comm.relationshipSummary?.en || rel8.en
        };
      }
    }
  }
}

const DOSSIER_TITLE_MAP: Record<
  string,
  Record<'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn', string>
> = {
  dyn_suryavamsha_gajapathi: {
    hi: 'RD-0014 | सूर्यवंश गजपति साम्राज्य राजवंश (१४३४–१५४१ ई.): अभिलेखीय सार्वभौम इतिहास एवं त्रिकलिंग राज्यव्यवस्था',
    te: 'RD-0014 | సూర్యవంశ గజపతి సామ్రాజ్య రాజవంశం (1434–1541 CE): శాసన సార్వభౌమ చరిత్ర మరియు త్రికళింగ రాజనీతి',
    kn: 'RD-0014 | ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ರಾಜವಂಶ (1434–1541 CE): ಶಾಸನ ಸಾರ್ವಭೌಮ ಇತಿಹಾಸ ಮತ್ತು ತ್ರಿಕಳಿಂಗ ರಾಜ್ಯವ್ಯವಸ್ಥೆ',
    ta: 'RD-0014 | சூர்யவம்ச கஜபதி பேரரசு வம்சம் (1434–1541 CE): கல்வெட்டு இறையாண்மை வரலாறு மற்றும் திரிகலிங்க ஆட்சிமுறை',
    mr: 'RD-0014 | सूर्यवंश गजपती साम्राज्य राजवंश (१४३४–१५४१ ई.): शिलालेखीय सार्वभौम इतिहास आणि त्रिकलिंग राज्यव्यवस्था',
    or: 'RD-0014 | ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ସାମ୍ରାଜ୍ୟ ରାଜବଂଶ (୧୪୩୪–୧୫୪୧ ଖ୍ରୀ.ଅ.): ଅଭିଲେଖୀୟ ସାର୍ବଭୌମ ଇତିହାସ ଓ ତ୍ରିକଳିଙ୍ଗ ରାଜ୍ୟବ୍ୟବସ୍ଥା',
    bn: 'RD-0014 | সূর্যবংশ গজপতি সাম্রাজ্যিক রাজবংশ (১৪৩৪–১৫৪১ খ্রি.): লিপিতাত্ত্বিক সার্বভৌম ইতিহাস ও ত্রিকলিঙ্গ রাষ্ট্রব্যবস্থা'
  },
  dyn_eastern_ganga: {
    hi: 'RD-0015 | साम्राज्यिक पूर्वी गंग (चोडगंग) राजवंश (४९८–१४३४ ई.): कलिंगनगर से कटक, पुरी एवं कोणार्क मंदिर स्थापत्य',
    te: 'RD-0015 | సామ్రాజ్య తూర్పు గంగ (చోడగంగ) రాజవంశం (498–1434 CE): కళింగనగరం నుండి కటకం, పూరీ మరియు కోణార్క్ దేవాలయ వాస్తుశిల్పం',
    kn: 'RD-0015 | ಸಾಮ್ರಾಜ್ಯ ಪೂರ್ವ ಗಂಗ (ಚೋಡಗಂಗ) ರಾಜವಂಶ (498–1434 CE): ಕಳಿಂಗನಗರದಿಂದ ಕಟಕ, ಪುರಿ ಮತ್ತು ಕೋಣಾರ್ಕ್ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ',
    ta: 'RD-0015 | பேரரசு கீழைக் கங்க (சோடகங்க) வம்சம் (498–1434 CE): கலிங்கநகரிலிருந்து கட்டாக், பூரி மற்றும் கோனார்க் கோயில் கட்டடக்கலை',
    mr: 'RD-0015 | साम्राज्यिक पूर्व गंग (चोडगंग) राजवंश (४९८–१४३४ ई.): कलिंगनगर ते कटक, पुरी आणि कोणार्क मंदिर स्थापत्य',
    or: 'RD-0015 | ସାମ୍ରାଜ୍ୟିକ ପୂର୍ବ ଗଙ୍ଗ (ଚୋଡ଼ଗଙ୍ଗ) ରାଜବଂଶ (୪୯୮–୧୪୩୪ ଖ୍ରୀ.ଅ.): କଳିଙ୍ଗନଗରରୁ କଟକ, ପୁରୀ ଓ କୋଣାର୍କ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ',
    bn: 'RD-0015 | সাম্রাজ্যিক পূর্ব গঙ্গ (চোড়গঙ্গ) রাজবংশ (৪৯৮–১৪৩৪ খ্রি.): কলিঙ্গনগর থেকে কটক, পুরী ও কোনার্ক মন্দির স্থাপত্য'
  },
  dyn_bhoi_mukunda: {
    hi: 'RD-0016 | चालुक्य-गजपति एवं भोई उत्तराधिकारी राजवंश (१५४१–१५६८ ई.): गोविंद विद्याधर, सम्राट मुकुंद देव एवं खुर्दा राजवंश',
    te: 'RD-0016 | చాళుక్య-గజపతి మరియు భోయీ వారసత్వ రాజవంశాలు (1541–1568 CE): గోవింద విద్యాధర, ముకుంద దేవ మరియు ఖుర్దా గజపతి కొనసాగింపు',
    kn: 'RD-0016 | ಚಾಲುಕ್ಯ-ಗಜಪತಿ ಮತ್ತು ಭೋಯಿ ಉತ್ತರಾಧಿಕಾರಿ ವಂಶಗಳು (1541–1568 CE): ಗೋವಿಂದ ವಿದ್ಯಾಧರ, ಮುಕುಂದ ದೇವ ಮತ್ತು ಖುರ್ದಾ ಗಜಪತಿ ಪರಂಪರೆ',
    ta: 'RD-0016 | சாளுக்கிய-கஜபதி மற்றும் போயி வாரிசு வம்சங்கள் (1541–1568 CE): கோவிந்த வித்யாதரர், முகுந்த தேவர் மற்றும் குர்தா கஜபதி மரபு',
    mr: 'RD-0016 | चालुक्य-गजपती आणि भोई उत्तराधिकारी राजवंश (१५४१–१५६८ ई.): गोविंद विद्याधर, सम्राट मुकुंद देव आणि खुर्दा गजपती परंपरा',
    or: 'RD-0016 | ଚାଲୁକ୍ୟ-ଗଜପତି ଓ ଭୋଇ ଉତ୍ତରାଧିକାରୀ ରାଜବଂଶ (୧୫୪୧–୧୫୬୮ ଖ୍ରୀ.ଅ.): ଗୋବିନ୍ଦ ବିଦ୍ୟାଧର, ସମ୍ରାଟ ମୁକୁନ୍ଦ ଦେବ ଓ ଖୋର୍ଦ୍ଧା ଗଜପତି ପରମ୍ପରା',
    bn: 'RD-0016 | চালুক্য-গজপতি ও ভোই উত্তরাধিকারী রাজবংশ (১৫৪১–১৫৬৮ খ্রি.): গোবিন্দ বিদ্যাধর, সম্রাট মুকুন্দ দেব ও খোর্ধা গজপতি ধারা'
  },
  dyn_traditional_suryavamsha_lineages: {
    hi: 'RD-0017 | दक्षिणी सूर्यवंश ओडियाराजु / वड्डेरा / ओड्डर नायक वंश (१४वीं–१८वीं शताब्दी ई.): गिरि-दुर्ग एवं जलोत्सारण अभियांत्रिकी',
    te: 'RD-0017 | దక్షిణ సూర్యవంశ ఒడియరాజు / వడ్డెర / ఒడ్డర్ నాయక వంశాలు (14వ–18వ శతాబ్దం CE): గిరి-దుర్గాలు మరియు జలవనరుల ఇంజనీరింగ్',
    kn: 'RD-0017 | ದಕ್ಷಿಣ ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು / ವಡ್ಡರ / ಒಡ್ಡರ್ ನಾಯಕ ವಂಶಗಳು (14–18ನೇ ಶತಮಾನ CE): ಗಿರಿ-ದುರ್ಗ ಮತ್ತು ಜಲಾವರಣ ಇಂಜಿನಿಯರಿಂಗ್',
    ta: 'RD-0017 | தெற்கு சூர்யவம்ச ஒடியராஜு / வட்டெர / ஒட்டர் நாயக்க வம்சங்கள் (14–18 ஆம் நூற்றாண்டு CE): மலைக்கோட்டைகள் மற்றும் நீர்ப்பாசனப் பொறியியல்',
    mr: 'RD-0017 | दक्षिणी सूर्यवंश ओडियाराजू / वड्डेरा / ओड्डर नायक घराणी (१४वे–१८वे शतक ई.): गिरि-दुर्ग आणि जलव्यवस्थापन अभियांत्रिकी',
    or: 'RD-0017 | ଦକ୍ଷିଣ ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ / ଭଦ୍ଦେରା / ଓଡ଼ର ନାୟକ ବଂଶଧାରା (୧୪ଶ–୧୮ଶ ଶତାବ୍ଦୀ): ଗିରି-ଦୁର୍ଗ ଓ ଜଳସେଚନ ସ୍ଥାପତ୍ୟ',
    bn: 'RD-0017 | দক্ষিণ সূর্যবংশ ওড়িয়ারাজু / ভদ্দেরা / ওড্ডর নায়ক বংশধারা (১৪শ–১৮শ শতাব্দী): গিরিদুর্গ ও জলসেচ প্রকৌশল'
  },
  'admin-mahapatras': {
    hi: 'RD-0018 | महापात्र एवं प्रांतीय मंत्री (दंडपाट प्रणाली): गजपति साम्राज्य का प्रशासन, परीक्षा वायसराय एवं राजस्व व्यवस्था',
    te: 'RD-0018 | మహాపాత్రులు మరియు ప్రాంతీయ మంత్రులు (దండపాట వ్యవస్థ): గజపతి సామ్రాజ్య పాలన, పరీక్ష వైస్రాయ్‌లు మరియు రెవెన్యూ వ్యవస్థ',
    kn: 'RD-0018 | ಮಹಾಪಾತ್ರರು ಮತ್ತು ಪ್ರಾಂತೀಯ ಮಂತ್ರಿಗಳು (ದಂಡಪಾಟ ವ್ಯವಸ್ಥೆ): ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಆಡಳಿತ, ಪರೀಕ್ಷಾ ವೈಸ್‌ರಾಯ್‌ಗಳು ಮತ್ತು ಕಂದಾಯ ವ್ಯವಸ್ಥೆ',
    ta: 'RD-0018 | மகாபாத்திரர்கள் மற்றும் மாகாண அமைச்சர்கள் (தண்டபாட முறை): கஜபதி பேரரசு நிர்வாகம், பரீக்ஷா ஆளுநர்கள் மற்றும் வருவாய் முறை',
    mr: 'RD-0018 | महापात्र आणि प्रांतीय मंत्री (दंडपाट पद्धती): गजपती साम्राज्य प्रशासन, परीक्षा प्रांतपाल आणि महसूल व्यवस्था',
    or: 'RD-0018 | ମହାପାତ୍ର ଓ ପ୍ରାଦେଶିକ ମନ୍ତ୍ରୀମଣ୍ଡଳ (ଦଣ୍ଡପାଟ ପ୍ରଣାଳୀ): ଗଜପତି ସାମ୍ରାଜ୍ୟ ପ୍ରଶାସନ, ପରୀକ୍ଷା ଶାସନକର୍ତ୍ତା ଓ ରାଜସ୍ୱ ବ୍ୟବସ୍ଥା',
    bn: 'RD-0018 | মহাপাত্র ও প্রাদেশিক মন্ত্রীপরিষদ (দণ্ডপাট প্রথা): গজপতি সাম্রাজ্য প্রশাসন, পরীক্ষা শাসনকর্তা ও রাজস্ব ব্যবস্থা'
  },
  'admin-nayakas': {
    hi: 'RD-0019 | नायक एवं दुर्गपति (गिरि-दुर्ग एवं जल-दुर्ग प्रणाली): १६०+ किलों का रक्षा स्थापत्य एवं पाइक सैन्य गढ़',
    te: 'RD-0019 | నాయకులు మరియు దుర్గాధిపతులు (గిరి-దుర్గ & జల-దుర్గ వ్యవస్థ): 160+ కోటల రక్షణ వాస్తుశిల్పం మరియు పైకా సైనిక దళాలు',
    kn: 'RD-0019 | ನಾಯಕರು ಮತ್ತು ದುರ್ಗಾಪತಿಗಳು (ಗಿರಿ-ದುರ್ಗ ಮತ್ತು ಜಲ-ದುರ್ಗ ವ್ಯವಸ್ಥೆ): 160+ ಕೋಟೆಗಳ ರಕ್ಷಣಾ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಪೈಕಾ ಸೇನಾ ನೆಲೆಗಳು',
    ta: 'RD-0019 | நாயக்கர்கள் மற்றும் துர்க்காதிபதிகள் (கிரி-துர்க்கம் & ஜல-துர்க்கம் முறை): 160+ கோட்டைகளின் பாதுகாப்பு கட்டடக்கலை மற்றும் பைக்கா படைகள்',
    mr: 'RD-0019 | नायक आणि दुर्गपती (गिरि-दुर्ग व जल-दुर्ग पद्धती): १६०+ किल्ल्यांचे संरक्षण स्थापत्य आणि पाइक लष्करी ठाणी',
    or: 'RD-0019 | ନାୟକ ଓ ଦୁର୍ଗପତି (ଗିରି-ଦୁର୍ଗ ଓ ଜଳ-ଦୁର୍ଗ ପ୍ରଣାଳୀ): ୧୬୦+ ଦୁର୍ଗର ପ୍ରତିରକ୍ଷା ସ୍ଥାପତ୍ୟ ଓ ପାଇକ ସୈନ୍ୟ ଘାଟି',
    bn: 'RD-0019 | নায়ক ও দুর্গপতি (গিরি-দুর্গ ও জল-দুর্গ প্রথা): ১৬০+ দুর্গের প্রতিরক্ষা স্থাপত্য ও পাইক সেনা ঘাঁটি'
  },
  'military-gajasena': {
    hi: 'RD-0020 | सैन्य संगठन एवं गजसेना (युद्ध हाथी वाहिनी): चतुरंग-बल, पाइक पैदल सेना एवं सामरिक युद्धकला',
    te: 'RD-0020 | సైనిక వ్యవస్థ మరియు గజసేన (యుద్ధ గజ దళం): చతురంగ బలం, పైకా పదాతిదళం మరియు గజపతి యుద్ధ తంత్రం',
    kn: 'RD-0020 | ಸೇನಾ ಸಂಘಟನೆ ಮತ್ತು ಗಜಸೇನಾ (ಯುದ್ಧ ಆನೆ ಪಡೆ): ಚತುರಂಗ ಬಲ, ಪೈಕಾ ಪದಾತಿದಳ ಮತ್ತು ಗಜಪತಿ ಯುದ್ಧತಂತ್ರ',
    ta: 'RD-0020 | ராணுவ அமைப்பு மற்றும் கஜசேனா (போர் யானைப் படை): சதுரங்க பலம், பைக்கா காலாட்படை மற்றும் போர் உத்தி',
    mr: 'RD-0020 | लष्करी संघटना आणि गजसेना (युद्ध हत्ती दल): चतुरंग-बल, पाइक पायदळ आणि सामरिक युद्धनीती',
    or: 'RD-0020 | ସାମରିକ ସଂଗଠନ ଓ ଗଜସେନା (ଯୁଦ୍ଧ ହସ୍ତୀ ବାହିନୀ): ଚତୁରଙ୍ଗ-ବଳ, ପାଇକ ପଦାତିକ ବାହିନୀ ଓ ରଣକୌଶଳ',
    bn: 'RD-0020 | সামরিক সংগঠন ও গজসেনা (যুদ্ধহস্তী বাহিনী): চতুরঙ্গ-বল, পাইক পদাতিক বাহিনী ও রণকৌশল'
  },
  'culture-renaissance': {
    hi: 'RD-0021 | गजपति काल में सांस्कृतिक, साहित्यिक एवं स्थापत्य पुनर्जागरण: सारला दास, पंचसखा साहित्य एवं जगन्नाथ धर्म',
    te: 'RD-0021 | గజపతుల కాలంలో సాంస్కృతిక, సాహిత్య మరియు వాస్తుశిల్ప పునరుజ్జీవనం: సారళా దాస్, పంచసఖ సాహిత్యం మరియు జగన్నాథ ధర్మం',
    kn: 'RD-0021 | ಗಜಪತಿಗಳ ಕಾಲದ ಸಾಂಸ್ಕೃತಿಕ, ಸಾಹಿತ್ಯಿಕ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಪುನರುಜ್ಜೀವನ: ಸಾರಲಾ ದಾಸ್, ಪಂಚಸಖ ಸಾಹಿತ್ಯ ಮತ್ತು ಜಗನ್ನಾಥ ಧರ್ಮ',
    ta: 'RD-0021 | கஜபதிகள் காலப் பண்பாட்டு, இலக்கிய மற்றும் கட்டடக்கலை மறுமலர்ச்சி: சரளா தாஸ், பஞ்சசகா இலக்கியம் மற்றும் ஜெகந்நாத தர்மம்',
    mr: 'RD-0021 | गजपती काळातील सांस्कृतिक, साहित्यिक आणि स्थापत्य पुनर्जागरण: सारला दास, पंचसखा साहित्य आणि जगन्नाथ धर्म',
    or: 'RD-0021 | ଗଜପତି ଯୁଗରେ ସାଂସ୍କୃତିକ, ସାହିତ୍ୟିକ ଓ ସ୍ଥାପତ୍ୟ ନବଜାଗରଣ: ଆଦିକବି ସାରଳା ଦାସ, ପଞ୍ଚସଖା ସାହିତ୍ୟ ଓ ଜଗନ୍ନାଥ ଧର୍ମ',
    bn: 'RD-0021 | গজপতি যুগে সাংস্কৃতিক, সাহিত্যিক ও স্থাপত্য নবজাগরণ: আদিকবি সারলা দাস, পঞ্চসখা সাহিত্য ও জগন্নাথ ধর্ম'
  },
  dyn_kakatiya_orugallu: {
    hi: 'KD-0023 | अनमकोंडा एवं ओरुगल्लु (वारंगल) का काकतीय साम्राज्य राजवंश (९५६–१३२३ ई.): नायंकर राज्यव्यवस्था एवं जल-अभियांत्रिकी',
    te: 'KD-0023 | అనుమకొండ మరియు ఓరుగల్లు (వరంగల్) కాకతీయ సామ్రాజ్య రాజవంశం (956–1323 CE): నాయంకర పాలనా వ్యవస్థ మరియు గొలుసుకట్టు చెరువుల ఇంజనీరింగ్',
    kn: 'KD-0023 | ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು (ವರಂಗಲ್) ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯ ರಾಜವಂಶ (956–1323 CE): ನಾಯಂಕರ ಆಡಳಿತ ಮತ್ತು ಜಲಾವರಣ ಇಂಜಿನಿಯರಿಂಗ್',
    ta: 'KD-0023 | அனுமகொண்டா மற்றும் ஓருகல்லு (வாரங்கல்) காகதீய பேரரசு வம்சம் (956–1323 CE): நாயங்கர ஆட்சிமுறை மற்றும் ஏரிப் பாசனப் பொறியியல்',
    mr: 'KD-0023 | अनमकोंडा आणि ओरुगल्लु (वारंगल) चे काकतीय साम्राज्य राजवंश (९५६–१३२३ ई.): नायंकर राज्यपद्धती आणि जल-अभियांत्रिकी',
    or: 'KD-0023 | ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ)ର କାକତୀୟ ସାମ୍ରାଜ୍ୟ ରାଜବଂଶ (୯୫୬–୧୩୨୩ ଖ୍ରୀ.ଅ.): ନାୟଙ୍କର ପ୍ରଶାସନ ଓ ଜଳସେଚନ ସ୍ଥାପତ୍ୟ',
    bn: 'KD-0023 | অনুমকোণ্ডা ও ওরুর্গল্লু (ওয়ারঙ্গল)-এর কাকতীয় সাম্রাজ্যিক রাজবংশ (৯৫৬–১৩২৩ খ্রি.): নায়ঙ্কর রাষ্ট্রব্যবস্থা ও জলসেচ প্রকৌশল'
  }
};

const LANG_SUMMARY_PREFIX: Record<'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn', string> = {
  hi: 'यह प्रामाणिक शोध मोनोग्राफ मूल अभिलेखीय साक्ष्यों (संस्कृत, ओड़िया एवं तेलुगु शिलालेखों), पुरातात्विक स्मारकों तथा सामुदायिक-विरासत संदर्भों का संपूर्ण ऐतिहासिक विश्लेषण प्रस्तुत करता है।',
  te: 'ఈ ప్రామాణిక పరిశోధనా మోనోగ్రాఫ్ సంస్కృత, ఒడియా మరియు తెలుగు తామ్రశాసనాలు, శిలాశాసనాలు, కోటల వాస్తుశిల్పం మరియు కమ్యూనిటీ-హెరిటేజ్ సంబంధాలను సమగ్రంగా వివరిస్తుంది.',
  kn: 'ಈ ಅಧಿಕೃತ ಸಂಶೋಧನಾ ಪ್ರಬಂಧವು ಪ್ರಾಥಮಿಕ ಶಾಸನಗಳು, ಕೋಟೆ ಮತ್ತು ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಹಾಗೂ ಸಮುದಾಯ-ಪರಂಪರೆಯ ದ್ವಿಮುಖ ದಾಖಲೆಗಳನ್ನು ಸಮಗ್ರವಾಗಿ ವಿಶ್ಲೇಷಿಸುತ್ತದೆ.',
  ta: 'இந்த அதிகாரப்பூர்வ வரலாற்று ஆய்வுக் கட்டுரை முதன்மைச் செப்பேடுகள், கல்வெட்டுகள், கோட்டைக் கட்டடக்கலை மற்றும் சமூக-பாரம்பரியத் தொடர்புகளை விரிவாக ஆராய்கிறது.',
  mr: 'हा प्रमाणित ऐतिहासिक शोधनिबंध मूळ ताम्रपट, शिलालेख, दुर्ग स्थापत्य आणि समुदाय-वारसा संदर्भांचे सखोल विश्लेषण सादर करतो.',
  or: 'ଏହି ପ୍ରାମାଣିକ ଗବେଷଣା ନିବନ୍ଧ ମୂଳ ତାମ୍ରଶାସନ, ଶିଳାଲେଖ, ଦୁର୍ଗ ଓ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ତଥା ସମ୍ପ୍ରଦାୟ-ଐତିହ୍ୟ ସମ୍ପର୍କର ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ବିଶ୍ଳେଷଣ ପ୍ରଦାନ କରେ।',
  bn: 'এই প্রামাণিক গবেষণা নিবন্ধটি মৌলিক তাম্রশাসন, শিলালিপি, দুর্গ ও মন্দির স্থাপত্য এবং সম্প্রদায়-ঐতিহ্য সংযোগের সম্পূর্ণ ঐতিহাসিক বিশ্লেষণ উপস্থাপন করে।'
};

function buildServerCompatibleTranslations(): Record<
  string,
  Partial<Record<LanguageCode, { title: string; summary: string; content: string; author_name?: string; sources?: SourceReference[] }>>
> {
  const langs: ('hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn')[] = [
    'hi',
    'te',
    'kn',
    'ta',
    'mr',
    'or',
    'bn'
  ];
  const out: Record<
    string,
    Partial<Record<LanguageCode, { title: string; summary: string; content: string; author_name?: string; sources?: SourceReference[] }>>
  > = {
    ...GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_TRANSLATIONS
  };

  for (const art of GAJAPATHI_KINGS_DOSSIER_ARTICLES) {
    if (out[art.id]) continue;
    out[art.id] = {};
    const refNum = GAJAPATHI_KINGS_DOSSIER_STRUCTURED_METADATA[art.id]?.refNumber || 'RD-0014';
    for (const lang of langs) {
      const title = DOSSIER_TITLE_MAP[art.id]?.[lang] || art.original_title;
      const summary = buildNativeSummaryForArticle(art.id, refNum, lang, title);
      const content = buildNative10ChapterContentForArticle(art.id, refNum, lang, title, summary);
      out[art.id][lang] = {
        title,
        summary,
        content,
        author_name: localizeAuthorName(art.author_name, lang),
        sources: localizeSourcesList(art.sources, lang)
      };
    }
  }

  return out;
}

export const GAJAPATHI_KINGS_DOSSIER_TRANSLATIONS = buildServerCompatibleTranslations();

