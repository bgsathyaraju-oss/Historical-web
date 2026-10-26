import type {
  GenealogyNode,
  HistoricalEvent,
  HistoricalLocation,
  InscriptionRecord,
  TempleMonument,
  HistoricalDocument,
  GalleryItem,
  HistoricalClaim,
  CommunityEvent,
  UserProfile,
  SiteStatistics,
  LanguageCode
} from '../types';
import {
  INSCRIPTION_TRANSLATIONS,
  MONUMENT_TRANSLATIONS
} from '../../server/contentTranslations';
import { CANONICAL_ARTICLES } from './articlesRepository';
import {
  GENEALOGY_NODE_TRANSLATIONS,
  CLAIM_TRANSLATIONS,
  TIMELINE_EVENT_TRANSLATIONS,
  LOCATION_TRANSLATIONS,
  DOCUMENT_TRANSLATIONS,
  GALLERY_TRANSLATIONS
} from './multilingualSeedTranslations';

export const CANONICAL_GENEALOGY: GenealogyNode[] = [
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

export const CANONICAL_TIMELINE_EVENTS: HistoricalEvent[] = [
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

const ARCHIVE_IMG = (file: string) => `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

export const CANONICAL_LOCATIONS: HistoricalLocation[] = [
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
    image_url: ARCHIVE_IMG('barabati_fort_gateway.jpg')
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
    image_url: ARCHIVE_IMG('puri_jagannatha_temple.jpg')
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
    image_url: ARCHIVE_IMG('kondavidu_fort_hills.jpg')
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
    image_url: ARCHIVE_IMG('simhachalam_temple.jpg')
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
    image_url: ARCHIVE_IMG('udayagiri_fort_nellore.jpg')
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
    image_url: ARCHIVE_IMG('kolleru_lake_citadel.jpg')
  }
];

export const CANONICAL_INSCRIPTIONS: InscriptionRecord[] = [
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

export const CANONICAL_MONUMENTS: TempleMonument[] = [
  {
    id: 'mon_meghanada_pacheri',
    name: 'Meghanada Pacheri (Puri Outer Fortress Wall)',
    location: 'Sri Jagannatha Temple, Puri',
    state: 'Odisha',
    patron_ruler: 'Kapilendra Deva',
    century: '15th Century CE (c. 1448 CE)',
    architectural_style: 'Kalinga Fortified Temple Masonry',
    historical_significance: 'Kapilendra Deva constructed this massive, fortified outer stone boundary wall (665 feet by 640 feet, 20 feet high with crenellations) to protect the sanctum of Lord Jagannatha from seaborne and external raids.',
    image_url: ARCHIVE_IMG('meghanada_pacheri_puri.jpg'),
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
    image_url: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
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
    image_url: ARCHIVE_IMG('draksharama_temple.jpg'),
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
    image_url: ARCHIVE_IMG('peddintlamma_temple_kolletikota.jpg'),
    sources: [
      'Mackenzie Manuscripts (Kaikaluru & Kolletikota Kaifiyats)',
      'Imperial Gazetteer of India, Vol. XV',
      'Andhra Pradesh State Archaeology & Endowments Reports'
    ]
  }
];

export const CANONICAL_DOCUMENTS: HistoricalDocument[] = [
  {
    id: 'doc_madala_panji',
    title: 'Madala Panji: The Palm-leaf Temple Chronicle of Puri',
    original_language: 'Classical Odia',
    approximate_date: '12th–16th Century CE compilations',
    author_authority: 'Puri Temple Karanas (Record Keepers)',
    current_location: 'Puri Jagannatha Temple Archives & Odisha State Archives',
    source_provenance: 'Palm-leaf manuscript collections transcribed across generations of hereditary servitors.',
    digitization_info: 'High-resolution manuscript scan conducted by Odisha State Archives in collaboration with Utkal University.',
    transcription_excerpt: '"...Suryavamsara rajatva kalare Kapilendra deva rajya prapta hoile..."',
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

export const CANONICAL_GALLERY: GalleryItem[] = [
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
    image_url: ARCHIVE_IMG('barabati_fort_ramparts.jpg'),
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
    image_url: ARCHIVE_IMG('puri_simhadwara_wall.jpg'),
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
    image_url: ARCHIVE_IMG('konark_chariot_wheel.jpg'),
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
    image_url: ARCHIVE_IMG('kondavidu_fort_engraving.jpg'),
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
    image_url: ARCHIVE_IMG('odia_palm_leaf_manuscript.jpg'),
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
    image_url: ARCHIVE_IMG('gajapathi_empire_map_1465.jpg'),
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
    image_url: ARCHIVE_IMG('kolletikota_island_panorama.jpg'),
    alt_text: 'Vast freshwater lake expanses of Kolleti Sarasu surrounding the fortified island sanctuary of Kolletikota',
    description: 'The ancient water citadel (Jala Durga) and sacred abode of Sri Peddintlamma Thalli amidst the serene waters of Kolleru.'
  }
];

export const CANONICAL_CLAIMS: HistoricalClaim[] = [
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

export const CANONICAL_COMMUNITY_EVENTS: CommunityEvent[] = [
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
    description: 'Practical training on physical conservation, high-resolution photography, and digital metadata indexing for community members with ancestral records.',
    is_virtual: true,
    max_attendees: 500,
    registered_count: 142
  }
];

export function getCanonicalGenealogy(lang: LanguageCode = 'en'): GenealogyNode[] {
  if (lang === 'en') return CANONICAL_GENEALOGY;
  return CANONICAL_GENEALOGY.map(node => {
    const tr = GENEALOGY_NODE_TRANSLATIONS[node.id]?.[lang];
    if (!tr) return node;
    return {
      ...node,
      name: tr.name || node.name,
      titles: tr.titles || node.titles,
      reign: tr.reign || node.reign,
      spouse: tr.spouse || node.spouse,
      notes: tr.notes || node.notes,
      sources: tr.sources || node.sources
    };
  });
}

export function getCanonicalClaims(lang: LanguageCode = 'en'): HistoricalClaim[] {
  if (lang === 'en') return CANONICAL_CLAIMS;
  return CANONICAL_CLAIMS.map(claim => {
    const tr = CLAIM_TRANSLATIONS[claim.id]?.[lang];
    if (!tr) return claim;
    return {
      ...claim,
      topic: tr.topic || claim.topic,
      claim_statement: tr.claim_statement || claim.claim_statement,
      supporting_evidence: tr.supporting_evidence || claim.supporting_evidence,
      contradictory_evidence: tr.contradictory_evidence || claim.contradictory_evidence,
      source_reliability_notes: tr.source_reliability_notes || claim.source_reliability_notes,
      reviewer_comments: tr.reviewer_comments || claim.reviewer_comments
    };
  });
}

export function getCanonicalTimelineEvents(lang: LanguageCode = 'en'): HistoricalEvent[] {
  if (lang === 'en') return CANONICAL_TIMELINE_EVENTS;
  return CANONICAL_TIMELINE_EVENTS.map(ev => {
    const tr = TIMELINE_EVENT_TRANSLATIONS[ev.id]?.[lang];
    if (!tr) return ev;
    return {
      ...ev,
      period: tr.period || ev.period,
      year_text: tr.year_text || ev.year_text,
      title: tr.title || ev.title,
      rulers_involved: tr.rulers_involved || ev.rulers_involved,
      political_development: tr.political_development || ev.political_development,
      monuments_inscriptions: tr.monuments_inscriptions || ev.monuments_inscriptions,
      primary_sources: tr.primary_sources || ev.primary_sources,
      uncertainty_notes: tr.uncertainty_notes || ev.uncertainty_notes
    };
  });
}

export function getCanonicalLocations(lang: LanguageCode = 'en'): HistoricalLocation[] {
  if (lang === 'en') return CANONICAL_LOCATIONS;
  return CANONICAL_LOCATIONS.map(loc => {
    const tr = LOCATION_TRANSLATIONS[loc.id]?.[lang];
    if (!tr) return loc;
    return {
      ...loc,
      name: tr.name || loc.name,
      ancient_name: tr.ancient_name || loc.ancient_name,
      modern_district: tr.modern_district || loc.modern_district,
      modern_state: tr.modern_state || loc.modern_state,
      summary: tr.summary || loc.summary,
      archaeological_findings: tr.archaeological_findings || loc.archaeological_findings,
      inscriptions_found: tr.inscriptions_found || loc.inscriptions_found
    };
  });
}

export function getCanonicalDocuments(lang: LanguageCode = 'en'): HistoricalDocument[] {
  if (lang === 'en') return CANONICAL_DOCUMENTS;
  return CANONICAL_DOCUMENTS.map(doc => {
    const tr = DOCUMENT_TRANSLATIONS[doc.id]?.[lang];
    if (!tr) return doc;
    return {
      ...doc,
      title: tr.title || doc.title,
      original_language: tr.original_language || doc.original_language,
      approximate_date: tr.approximate_date || doc.approximate_date,
      author_authority: tr.author_authority || doc.author_authority,
      current_location: tr.current_location || doc.current_location,
      source_provenance: tr.source_provenance || doc.source_provenance,
      digitization_info: tr.digitization_info || doc.digitization_info,
      translation_excerpt: tr.translation_excerpt || doc.translation_excerpt,
      research_notes: tr.research_notes || doc.research_notes
    };
  });
}

export function getCanonicalGallery(lang: LanguageCode = 'en'): GalleryItem[] {
  if (lang === 'en') return CANONICAL_GALLERY;
  return CANONICAL_GALLERY.map(item => {
    const tr = GALLERY_TRANSLATIONS[item.id]?.[lang];
    if (!tr) return item;
    return {
      ...item,
      title: tr.title || item.title,
      period: tr.period || item.period,
      location: tr.location || item.location,
      description: tr.description || item.description
    };
  });
}

export function getCanonicalInscriptions(lang: LanguageCode = 'en'): InscriptionRecord[] {
  if (lang === 'en') return CANONICAL_INSCRIPTIONS;
  return CANONICAL_INSCRIPTIONS.map(insc => {
    const tr = INSCRIPTION_TRANSLATIONS[insc.id]?.[lang];
    if (!tr) return insc;
    return {
      ...insc,
      name: tr.name || insc.name,
      ruler: tr.ruler || insc.ruler,
      location_found: tr.location || insc.location_found,
      historical_context: tr.summary || insc.historical_context,
      english_translation: tr.summary ? `${tr.summary}\n\n[English Archival Translation]: ${insc.english_translation}` : insc.english_translation
    };
  });
}

export function getCanonicalMonuments(lang: LanguageCode = 'en'): TempleMonument[] {
  if (lang === 'en') return CANONICAL_MONUMENTS;
  return CANONICAL_MONUMENTS.map(mon => {
    const tr = MONUMENT_TRANSLATIONS[mon.id]?.[lang];
    if (!tr) return mon;
    return {
      ...mon,
      name: tr.name || mon.name,
      location: tr.location || mon.location,
      patron_ruler: tr.patron_ruler || mon.patron_ruler,
      architectural_style: tr.architectural_style || mon.architectural_style,
      historical_significance: tr.historical_significance || mon.historical_significance
    };
  });
}

export const CANONICAL_MEMBERS: UserProfile[] = [
  {
    user_id: 'usr_admin_001',
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
    user_id: 'usr_editor_001',
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
    user_id: 'usr_member_001',
    full_name: 'Sathya Narayana Raju',
    gender: 'Male',
    country: 'India',
    state_or_province: 'Karnataka',
    district: 'Bengaluru Urban',
    city_town_village: 'Bengaluru',
    profile_photo_url: `${(import.meta as any).env?.BASE_URL || '/'}assets/dr_g_sathyanarayana_raju.png`,
    education: 'B.Tech in Computer Science, Independent Genealogy Researcher',
    profession: 'Software Engineer & Genealogist',
    current_work: 'Digital preservation of community palm-leaf manuscripts and family trees',
    organization: 'Global Suryavamsha Kshatriya Heritage Forum',
    biography: 'Passionate community member researching the diaspora of Odiyaraju families across Karnataka, Andhra Pradesh, Tamil Nadu, and Maharashtra.',
    areas_of_historical_interest: ['Genealogical Records', 'Diaspora Movements', 'Oral Traditions', 'Madala Panji Studies'],
    languages_known: ['Kannada', 'Telugu', 'English', 'Odia'],
    research_contributions: 'Documented 12 oral family histories linking medieval Odra migrations to Deccan settlements.',
    profile_visibility: 'public'
  }
];

export const CANONICAL_STATISTICS: SiteStatistics = {
  published_articles: CANONICAL_ARTICLES.filter(a => a.verification_status === 'Published').length,
  digitized_documents: CANONICAL_DOCUMENTS.length,
  historical_photographs: CANONICAL_GALLERY.length,
  reviewed_inscriptions: CANONICAL_INSCRIPTIONS.filter(i => i.verification_status === 'Reviewed').length,
  published_translations: 8,
  registered_members: CANONICAL_MEMBERS.length,
  community_events: CANONICAL_COMMUNITY_EVENTS.length
};

