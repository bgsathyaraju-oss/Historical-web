/**
 * ============================================================================
 * GLOBAL REFERENCE ID ARCHITECTURE & MASTER CONTENT REGISTER (SURYA-ROYAL-8)
 * ============================================================================
 * Single source of truth for permanent, Page-Title-derived Reference IDs
 * across the entire Suryavamsha Odiyaraju Kshatriya Historical Heritage Portal.
 *
 * Rules Enforced:
 * 1. Format: PREFIX-0001, PREFIX-0002, ... (uppercase English alphabetical prefix
 *    derived from the actual English Page Title / Category Title).
 * 2. Every content item and website page has exactly one globally unique Reference ID.
 * 3. Each category prefix maintains its own deterministic sequential numbering.
 * 4. Reference IDs are permanent and never translated across the 8 supported languages
 *    (English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, Bengali).
 * 5. Original internal database / repository primary keys are 100% preserved.
 */

import type { LanguageCode } from '../types/index.ts';
import { getAllArticles } from './articlesRepository.ts';
import { DOCUMENTED_FIGURES_REPO } from './documentedFiguresRepository.ts';
import {
  CANONICAL_TIMELINE_EVENTS,
  CANONICAL_INSCRIPTIONS,
  CANONICAL_MONUMENTS,
  CANONICAL_LOCATIONS,
  CANONICAL_DOCUMENTS,
  CANONICAL_GALLERY,
  CANONICAL_GENEALOGY,
  CANONICAL_CLAIMS,
  CANONICAL_COMMUNITY_EVENTS
} from './archivalSeedData.ts';
import {
  PROMINENT_PERSONS,
  ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES
} from './communityProminentPersonsData.ts';
import {
  COMMUNITY_DIRECTORY_ITEMS,
  COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES
} from './communityHeritageDirectoryData.ts';
import {
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS
} from './historyContent.ts';
import { MASTER_70_REFERENCE_REGISTRY } from './communityReference70Registry.ts';
import { SOUTH_INDIAN_SURNAME_ENTRIES } from './communitySurnamesData.ts';
import { NORTH_INDIAN_SURNAME_ENTRIES } from './northIndianSurnamesData.ts';
import { KALINGA_WAR_CONTENT } from './kalingaWarData.ts';
import {
  SEVEN_HISTORICAL_CATEGORIES,
  MYTHOLOGY_TO_HISTORY_STAGES,
  getPermanentReferenceNumber
} from './sevenCategoriesExpansionData.ts';
import { ARTICLE_STRUCTURED_METADATA_MAP } from './expandedDynastiesAndCategoriesArticles.ts';
import {
  COMMUNITY_HERITAGE_DETAILED_ARTICLES,
  SYNONYM_COMPREHENSIVE_MONOGRAPHS
} from './communityHeritageArticlesData.ts';
import {
  KAKATIYA_REFERENCE_ID_MAP,
  KAKATIYA_INSCRIPTIONS,
  KAKATIYA_DYNASTY_RECORD
} from './kakatiyaDynastyData.ts';

export type ReferencePrefixCode =
  | 'HT'
  | 'IA'
  | 'RD'
  | 'KM'
  | 'HD'
  | 'HG'
  | 'HF'
  | 'TM'
  | 'DOC'
  | 'RG'
  | 'OD'
  | 'KW'
  | 'CPP'
  | 'CH'
  | 'CSS'
  | 'CSN'
  | 'CT'
  | 'LP'
  | 'HR'
  | 'CA'
  | 'EN'
  | 'WP'
  | 'KD';

export interface PrefixRegistryEntry {
  prefix: ReferencePrefixCode;
  englishPageTitle: string;
  categoryTitle: string;
  canonicalRoute: string;
  derivationRule: string;
  idFormatExample: string;
  description: string;
}

export interface GlobalReferenceRecord {
  newReferenceId: string;
  previousReferenceId: string | null;
  englishPageTitle: string;
  contentTitle: string;
  contentCategory: string;
  internalRecordId: string;
  dataSourceFile: string;
  availableLanguages: LanguageCode[];
  relatedContentIds: string[];
  creationDate: string;
  lastUpdatedDate: string;
  recordStatus:
    | 'Active & Verified'
    | 'Active — Scholarly Synthesis'
    | 'Active — Traditional Lineage Record'
    | 'Active — Archival Research Scope';
  canonicalRoute: string;
  prefix: ReferencePrefixCode;
}

export const ALL_EIGHT_LANGUAGES: LanguageCode[] = [
  'en',
  'hi',
  'te',
  'kn',
  'ta',
  'mr',
  'or',
  'bn'
];

/**
 * PHASE 2 – CENTRALIZED PAGE-TITLE-BASED PREFIX REGISTRY
 * Every prefix is derived directly from the actual English Page Title / Category Title
 * with deterministic collision resolution (e.g., HD = Historical Documentary vs.
 * DOC = Digitized Historical Documents; CSS = Community Surnames [South-Indian] vs.
 * CSN = Community Surnames [North-Indian]).
 */
export const GLOBAL_PREFIX_REGISTRY: Record<ReferencePrefixCode, PrefixRegistryEntry> = {
  HT: {
    prefix: 'HT',
    englishPageTitle: 'Historical Timeline',
    categoryTitle: '1. Historical Timeline',
    canonicalRoute: '/timeline',
    derivationRule: 'H(istorical) T(imeline)',
    idFormatExample: 'HT-0001',
    description: 'Chronological methodology monographs, 8-stage Mythology-to-History epochs, and dated historical timeline events.'
  },
  IA: {
    prefix: 'IA',
    englishPageTitle: 'Inscriptions & Archaeology',
    categoryTitle: '2. Inscriptions & Archaeology',
    canonicalRoute: '/inscriptions',
    derivationRule: 'I(nscriptions) & A(rchaeology)',
    idFormatExample: 'IA-0001',
    description: 'Epigraphic monographs, stone edicts, and royal copper-plate grants.'
  },
  RD: {
    prefix: 'RD',
    englishPageTitle: 'Royal Dynasties',
    categoryTitle: '3. Royal Dynasties',
    canonicalRoute: '/gajapathi-kings',
    derivationRule: 'R(oyal) D(ynasties)',
    idFormatExample: 'RD-0001',
    description: 'Documented royal dynasties, branches, lineage classifications, and Gajapathi imperial administration dossiers.'
  },
  KM: {
    prefix: 'KM',
    englishPageTitle: 'Kingdoms & Maps',
    categoryTitle: '4. Kingdoms & Maps',
    canonicalRoute: '/maps',
    derivationRule: 'K(ingdoms) & M(aps)',
    idFormatExample: 'KM-0001',
    description: 'Historical geography monographs, fortified citadels (Giri & Jala Durgas), locations, and cartographic reconstructions.'
  },
  HD: {
    prefix: 'HD',
    englishPageTitle: 'Historical Documentary',
    categoryTitle: '5. Historical Documentary',
    canonicalRoute: '/documentary',
    derivationRule: 'H(istorical) D(ocumentary)',
    idFormatExample: 'HD-0001',
    description: 'Comprehensive documentary synthesis monographs and 8-part documentary chapters.'
  },
  HG: {
    prefix: 'HG',
    englishPageTitle: 'Historical Gallery',
    categoryTitle: '6. Historical Gallery',
    canonicalRoute: '/gallery',
    derivationRule: 'H(istorical) G(allery)',
    idFormatExample: 'HG-0001',
    description: 'Visual provenance monographs and curated archival gallery plates.'
  },
  HF: {
    prefix: 'HF',
    englishPageTitle: 'Historical Figures (Documented Historical Figures / Kings & Queens)',
    categoryTitle: '7. Historical Figures',
    canonicalRoute: '/kings-queens',
    derivationRule: 'H(istorical) F(igures)',
    idFormatExample: 'HF-0001',
    description: 'Sovereign biographical dossiers of ancient emperors, progenitors, kings, queens, and sacred guardians.'
  },
  TM: {
    prefix: 'TM',
    englishPageTitle: 'Temples & Monuments',
    categoryTitle: 'Temples & Monuments',
    canonicalRoute: '/temples-monuments',
    derivationRule: 'T(emples) & M(onuments)',
    idFormatExample: 'TM-0001',
    description: 'Sacred Kalinga-Odra architectural monuments, sun temples, and fortified island shrines.'
  },
  DOC: {
    prefix: 'DOC',
    englishPageTitle: 'Digitized Historical Documents & Royal Chronicles',
    categoryTitle: 'Historical Documents',
    canonicalRoute: '/documents',
    derivationRule: 'DOC(uments) — disambiguated from HD (Historical Documentary)',
    idFormatExample: 'DOC-0001',
    description: 'Digitized palm-leaf chronicles (Madala Panji) and Sanskrit legal codices (Sarasvati Vilasa).'
  },
  RG: {
    prefix: 'RG',
    englishPageTitle: 'Royal Genealogy',
    categoryTitle: 'Royal Genealogy',
    canonicalRoute: '/genealogy',
    derivationRule: 'R(oyal) G(enealogy)',
    idFormatExample: 'RG-0001',
    description: 'Solar dynasty genealogical nodes and epistemic lineage verification claims.'
  },
  OD: {
    prefix: 'OD',
    englishPageTitle: 'Odra Desha',
    categoryTitle: 'Odra Desha Regional History',
    canonicalRoute: '/odra-desha',
    derivationRule: 'O(dra) D(esha)',
    idFormatExample: 'OD-0001',
    description: 'Territorial provinces of Odra, Utkala, Kalinga, Trikalinga, and epigraphic evolution dossiers.'
  },
  KW: {
    prefix: 'KW',
    englishPageTitle: 'The Kalinga War (261 BCE)',
    categoryTitle: 'The Kalinga War (261 BCE)',
    canonicalRoute: '/kalinga-war',
    derivationRule: 'K(alinga) W(ar)',
    idFormatExample: 'KW-0001',
    description: 'Historiographical sections and Dhauli/Jaugada epigraphic scenes of the Kalinga War (c. 261 BCE).'
  },
  CPP: {
    prefix: 'CPP',
    englishPageTitle: 'Community Prominent Persons',
    categoryTitle: 'Community Prominent Persons',
    canonicalRoute: '/community-prominent-persons',
    derivationRule: 'C(ommunity) P(rominent) P(ersons)',
    idFormatExample: 'CPP-0001',
    description: 'Chronologically indexed directory of 24 prominent sovereigns, commanders, saints, builders, and 8 research scope dossiers.'
  },
  CH: {
    prefix: 'CH',
    englishPageTitle: 'Community Heritage',
    categoryTitle: 'Community Heritage & 76-Name Nomenclature Directory',
    canonicalRoute: '/community-heritage',
    derivationRule: 'C(ommunity) H(eritage)',
    idFormatExample: 'CH-0001',
    description: '16 Community Directory dossiers, 9 Professional Shilpa-Shastra categories, 15 Synonyms, 7 Regional Spreads, and all 76 Community References.'
  },
  CSS: {
    prefix: 'CSS',
    englishPageTitle: 'Community Surnames [South-Indian-Oad-Community]',
    categoryTitle: 'Community Surnames (South-Indian)',
    canonicalRoute: '/community-surnames',
    derivationRule: 'C(ommunity) S(urnames) S(outh-Indian)',
    idFormatExample: 'CSS-0001',
    description: '260 documented South-Indian Odiyaraju / Vaddera / Oddar surnames (Intiperlu / Mane Hesarugalu / Kulam names).'
  },
  CSN: {
    prefix: 'CSN',
    englishPageTitle: 'Community Surnames [North-Indian-Oad-Community]',
    categoryTitle: 'Community Surnames (North-Indian)',
    canonicalRoute: '/community-surnames-north-indian-oad-community',
    derivationRule: 'C(ommunity) S(urnames) N(orth-Indian)',
    idFormatExample: 'CSN-0001',
    description: '90 documented North-Indian Suryavamshi Oad-Rajpoot clans, Gotras, and surnames.'
  },
  CT: {
    prefix: 'CT',
    englishPageTitle: 'Culture & Traditions',
    categoryTitle: 'Culture & Traditions',
    canonicalRoute: '/culture-traditions',
    derivationRule: 'C(ulture) & T(raditions)',
    idFormatExample: 'CT-0001',
    description: 'Kshatriya Dharma, Surya Narayana & Peddintlamma veneration, martial Akhadas, and temple servitorship.'
  },
  LP: {
    prefix: 'LP',
    englishPageTitle: 'Literature & Publications',
    categoryTitle: 'Literature & Publications',
    canonicalRoute: '/literature',
    derivationRule: 'L(iterature) & P(ublications)',
    idFormatExample: 'LP-0001',
    description: 'Classical Sanskrit and Odia literature patronized by the Suryavamsha Gajapathi court.'
  },
  HR: {
    prefix: 'HR',
    englishPageTitle: 'Historical References',
    categoryTitle: 'Historical References & Scholarly Bibliography',
    canonicalRoute: '/references',
    derivationRule: 'H(istorical) R(eferences)',
    idFormatExample: 'HR-0001',
    description: 'Catalogued Epigraphia Indica volumes, ASI reports, scholarly monographs, and archival chronicles.'
  },
  CA: {
    prefix: 'CA',
    englishPageTitle: 'Community Activities',
    categoryTitle: 'Community Activities',
    canonicalRoute: '/community-activities',
    derivationRule: 'C(ommunity) A(ctivities)',
    idFormatExample: 'CA-0001',
    description: 'Manuscript preservation, research fellowships, heritage expeditions, and fraternal forums.'
  },
  EN: {
    prefix: 'EN',
    englishPageTitle: 'Events & Notices',
    categoryTitle: 'Events & Notices',
    canonicalRoute: '/events',
    derivationRule: 'E(vents) & N(otices)',
    idFormatExample: 'EN-0001',
    description: 'Conferences, epigraphic symposiums, and community heritage gatherings.'
  },
  WP: {
    prefix: 'WP',
    englishPageTitle: 'Website Pages & Category Hubs',
    categoryTitle: 'Website Architecture & Navigation Pages',
    canonicalRoute: '/',
    derivationRule: 'W(ebsite) P(ages)',
    idFormatExample: 'WP-0001',
    description: 'Permanent Reference IDs for all 31 application page routes and 7 canonical category hubs.'
  },
  KD: {
    prefix: 'KD',
    englishPageTitle: 'Kakatiya Dynasty (Royal Dynasties — Anumakonda & Orugallu)',
    categoryTitle: '3. Royal Dynasties — Kakatiya Dynasty',
    canonicalRoute: '/gajapathi-kings?id=dyn_kakatiya_orugallu',
    derivationRule: 'K(akatiya) D(ynasty)',
    idFormatExample: 'KD-0001',
    description: 'Comprehensive Kakatiya Dynasty monograph (KD-0001), 9 Kakatiya rulers (KD-0002..KD-0010), 4 temples & monuments (KD-0011..KD-0014), 4 historical locations (KD-0015..KD-0018), 4 primary inscriptions (KD-0019..KD-0022), royal dynasty record (KD-0023), gallery plate (KD-0024), genealogy node (KD-0025), and 8 dated timeline events (KD-0026..KD-0033).'
  }
};

/**
 * PHASE 3 – PERMANENT INTERNAL-ID TO REFERENCE-ID ASSIGNMENT MAP
 * Every content record across the entire website has a permanent, deterministic
 * PREFIX-NNNN Reference ID.
 */
export const PERMANENT_GLOBAL_REFERENCE_ID_MAP: Record<string, string> = {
  // ==========================================================================
  // 1. HISTORICAL TIMELINE (HT-0001 to HT-0020) — Page: "Historical Timeline"
  // ==========================================================================
  art_ht_chronological_methodology: 'HT-0001',
  stage_01_mythological: 'HT-0002',
  stage_02_ancient_civilizations: 'HT-0003',
  stage_03_early_historical: 'HT-0004',
  stage_04_ancient_kingdoms: 'HT-0005',
  stage_05_medieval_kingdoms: 'HT-0006',
  stage_06_imperial_dynasties: 'HT-0007',
  stage_07_late_medieval: 'HT-0008',
  stage_08_modern_historical: 'HT-0009',
  ev_kharavela_1st_bce: 'HT-0010',
  ev_jasma_devi_1120: 'HT-0011',
  ev_siddharameshwara_1150: 'HT-0012',
  ev_1434: 'HT-0013',
  ev_1448: 'HT-0014',
  ev_kolletikota_gajapathi_garrison: 'HT-0015',
  ev_1458: 'HT-0016',
  ev_1464: 'HT-0017',
  ev_1489: 'HT-0018',
  ev_1515: 'HT-0019',
  ev_1568: 'HT-0020',

  // ==========================================================================
  // 2. INSCRIPTIONS & ARCHAEOLOGY (IA-0001 to IA-0012) — Page: "Inscriptions & Archaeology"
  // ==========================================================================
  art_epigraphic_evolution_odra: 'IA-0001',
  art_ia_south_indian_epigraphy_corpus: 'IA-0002',
  insc_hathigumpha_kharavela: 'IA-0003',
  insc_hathigumpha: 'IA-0003',
  insc_korni_copper_plates: 'IA-0004',
  insc_kendupatna_plates: 'IA-0005',
  insc_lingaraja_1452: 'IA-0006',
  insc_veligalani_1458: 'IA-0007',
  insc_simhachalam_1459: 'IA-0008',
  insc_srirangam_1464: 'IA-0009',
  insc_potavaram_1489: 'IA-0010',
  insc_simhachalam_prataparudra: 'IA-0011',
  insc_kondapalli_1519: 'IA-0012',

  // ==========================================================================
  // 3. ROYAL DYNASTIES (RD-0001 to RD-0021) — Page: "Royal Dynasties"
  // ==========================================================================
  art_gajapathi_kapilendra: 'RD-0001',
  art_dyn_eastern_gangas: 'RD-0002',
  art_dyn_western_gangas: 'RD-0003',
  art_dyn_imperial_cholas: 'RD-0004',
  art_dyn_chalukya_synthesis: 'RD-0005',
  art_dyn_pallavas_kanchi: 'RD-0006',
  art_dyn_kadambas_banavasi: 'RD-0007',
  art_dyn_badami_chalukyas: 'RD-0008',
  art_dyn_vengi_chalukyas: 'RD-0009',
  art_dyn_siddhini_kings_verification: 'RD-0010',
  art_lin_suryavamshi_kshatriyas: 'RD-0011',
  art_lin_chandravamshi_kshatriyas: 'RD-0012',
  art_genealogy_methodology: 'RD-0013',
  dyn_suryavamsha_gajapathi: 'RD-0014',
  dyn_eastern_ganga: 'RD-0015',
  dyn_bhoi_mukunda: 'RD-0016',
  dyn_traditional_suryavamsha_lineages: 'RD-0017',
  'admin-mahapatras': 'RD-0018',
  'admin-nayakas': 'RD-0019',
  'military-gajasena': 'RD-0020',
  'culture-renaissance': 'RD-0021',

  // ==========================================================================
  // 4. KINGDOMS & MAPS (KM-0001 to KM-0010) — Page: "Kingdoms & Maps"
  // ==========================================================================
  art_odra_desha_history: 'KM-0001',
  art_kolletikota_peddintlamma_lake: 'KM-0002',
  art_km_deccan_corridors_forts: 'KM-0003',
  loc_barabati_fort: 'KM-0004',
  loc_puri_jagannatha: 'KM-0005',
  loc_kondavidu_fort: 'KM-0006',
  loc_simhachalam: 'KM-0007',
  loc_udayagiri_fort: 'KM-0008',
  loc_kolleti_sarasu_fort: 'KM-0009',
  map_1465_zenith: 'KM-0010',

  // ==========================================================================
  // 5. HISTORICAL DOCUMENTARY (HD-0001 to HD-0010) — Page: "Historical Documentary"
  // ==========================================================================
  art_oad_rajputh_od_history: 'HD-0001',
  art_hd_archival_manuscripts_kaifiyats: 'HD-0002',
  mono_part_1_primordial: 'HD-0003',
  mono_part_2_kharavela: 'HD-0004',
  mono_part_3_synonyms: 'HD-0005',
  mono_part_4_jasma_siddharama: 'HD-0006',
  mono_part_5_gajapathi_diaspora: 'HD-0007',
  mono_part_6_geographical_map: 'HD-0008',
  mono_part_7_kolletikota: 'HD-0009',
  mono_part_8_epigraphic_evolution: 'HD-0010',

  // ==========================================================================
  // 6. HISTORICAL GALLERY (HG-0001 to HG-0008) — Page: "Historical Gallery"
  // ==========================================================================
  art_hg_architectural_emblems_provenance: 'HG-0001',
  gal_01: 'HG-0002',
  gal_02: 'HG-0003',
  gal_03: 'HG-0004',
  gal_04: 'HG-0005',
  gal_05: 'HG-0006',
  gal_06: 'HG-0007',
  gal_kolletikota: 'HG-0008',

  // ==========================================================================
  // 7. HISTORICAL FIGURES (HF-0001 to HF-0017) — Page: "Historical Figures" / "Kings & Queens"
  // ==========================================================================
  art_surya_vamsa_sagara_rama: 'HF-0001',
  fig_samrat_sagara: 'HF-0002',
  fig_maharshi_bhagiratha: 'HF-0003',
  fig_sri_rama: 'HF-0004',
  fig_king_kharavela: 'HF-0005',
  fig_goddess_jasma: 'HF-0006',
  fig_shivayogi_siddharama: 'HF-0007',
  fig_kolletikota_peddintlamma: 'HF-0008',
  fig_anantavarman_chodaganga: 'HF-0009',
  fig_chodaganga_deva: 'HF-0009',
  fig_langula_narasimha_deva: 'HF-0010',
  fig_langula_narasimha: 'HF-0010',
  fig_kapilendra_deva: 'HF-0011',
  fig_hamvira_deva: 'HF-0012',
  fig_purushottama_deva: 'HF-0013',
  fig_prataparudra_deva: 'HF-0014',
  art_lin_suryavamshi_kings: 'HF-0015',
  art_lin_chandravamshi_kings: 'HF-0016',
  fig_mukunda_deva: 'HF-0017',

  // ==========================================================================
  // 8. TEMPLES & MONUMENTS (TM-0001 to TM-0004) — Page: "Temples & Monuments"
  // ==========================================================================
  mon_meghanada_pacheri: 'TM-0001',
  mon_konark_sun: 'TM-0002',
  mon_draksharama_mandapa: 'TM-0003',
  mon_kolletikota_peddintlamma: 'TM-0004',

  // ==========================================================================
  // 9. HISTORICAL DOCUMENTS (DOC-0001 to DOC-0002) — Page: "Digitized Historical Documents"
  // ==========================================================================
  doc_madala_panji: 'DOC-0001',
  doc_sarasvati_vilasa: 'DOC-0002',

  // ==========================================================================
  // 10. ROYAL GENEALOGY (RG-0001 to RG-0012) — Page: "Royal Genealogy"
  // ==========================================================================
  gen_samrat_sagara: 'RG-0001',
  gen_maharshi_bhagiratha: 'RG-0002',
  gen_sri_rama: 'RG-0003',
  gen_kapilendra: 'RG-0004',
  gen_hamvira: 'RG-0005',
  gen_purushottama: 'RG-0006',
  gen_prataparudra: 'RG-0007',
  gen_virabhadra: 'RG-0008',
  gen_dakshina_branch: 'RG-0009',
  clm_01: 'RG-0010',
  clm_02: 'RG-0011',
  clm_03: 'RG-0012',

  // ==========================================================================
  // 11. ODRA DESHA (OD-0001 to OD-0005) — Page: "Odra Desha"
  // ==========================================================================
  'region-odra': 'OD-0001',
  'region-utkala': 'OD-0002',
  'region-kalinga': 'OD-0003',
  'region-trikalinga': 'OD-0004',
  'odra-epigraphic-evolution': 'OD-0005',

  // ==========================================================================
  // 12. THE KALINGA WAR (261 BCE) (KW-0001 to KW-0012) — Page: "The Kalinga War (261 BCE)"
  // ==========================================================================
  kw_section_background: 'KW-0001',
  kw_section_battle: 'KW-0002',
  kw_section_tragedy: 'KW-0003',
  kw_section_remorse: 'KW-0004',
  kw_section_legacy: 'KW-0005',
  scene_1_ancient_kalinga: 'KW-0006',
  scene_2_mauryan_campaign: 'KW-0007',
  scene_3_the_battle: 'KW-0008',
  scene_4_human_cost: 'KW-0009',
  scene_5_ashoka_remorse: 'KW-0010',
  scene_6_ashokan_rock_edicts: 'KW-0011',
  scene_7_message_of_peace: 'KW-0012',

  // ==========================================================================
  // 13. COMMUNITY PROMINENT PERSONS (CPP-0001 to CPP-0032) — Page: "Community Prominent Persons"
  // ==========================================================================
  kapilendra_deva_gajapathi: 'CPP-0001',
  kumara_hamvira_deva: 'CPP-0002',
  baxi_jagabandhu_paika_general: 'CPP-0003',
  jayee_rajguru_preceptor: 'CPP-0004',
  anantavarman_chodaganga_trikalinga: 'CPP-0005',
  purushottama_deva_gajapathi: 'CPP-0006',
  prataparudra_deva_gajapathi: 'CPP-0007',
  maharshi_raja_bhagiratha: 'CPP-0008',
  samrat_sagara: 'CPP-0009',
  mata_jasma_devi: 'CPP-0010',
  shivayogi_siddharameshwara: 'CPP-0011',
  emperor_kharavela: 'CPP-0012',
  kolletikota_peddintlamma: 'CPP-0013',
  kolani_rudra_deva: 'CPP-0014',
  raja_mukunda_deva: 'CPP-0015',
  langula_narasimha_deva: 'CPP-0016',
  rani_balanagamma: 'CPP-0017',
  raja_bhoja_paramara: 'CPP-0018',
  balavaddiraju: 'CPP-0019',
  dr_g_sathyanarayana_raju: 'CPP-0020',
  virabhadra_deva_gajapathi: 'CPP-0021',
  mahakavi_sarala_dasa: 'CPP-0022',
  sri_rama_suryavamsha: 'CPP-0023',
  raja_od_odra_nareshudu: 'CPP-0024',
  research_placeholder_traditional_artists: 'CPP-0025',
  research_placeholder_cinema_actors: 'CPP-0026',
  research_placeholder_film_producers_directors: 'CPP-0027',
  research_placeholder_film_directors_only: 'CPP-0028',
  research_placeholder_music_singers_dancers: 'CPP-0029',
  research_placeholder_singers_dancers_scientists: 'CPP-0030',
  research_placeholder_singers_musicians_only: 'CPP-0031',
  research_placeholder_dancers_classical_folk_only: 'CPP-0032',

  // ==========================================================================
  // 14. COMMUNITY HERITAGE (CH-0001 to CH-0123) — Page: "Community Heritage"
  //     - CH-0001 .. CH-0016: 16 Canonical Community Directory Dossiers
  //     - CH-0017 .. CH-0025: 9 Professional & Shilpa-Shastra Categories
  //     - CH-0026 .. CH-0040: 15 Community Synonym Records
  //     - CH-0041 .. CH-0047: 7 Regional Geographical Distribution Dossiers
  //     - CH-0048 .. CH-0123: 76 Master Community Nomenclature References
  // ==========================================================================
  comm_dir_01_od: 'CH-0001',
  comm_dir_02_od_rajputh: 'CH-0002',
  comm_dir_03_odra_kshatriya: 'CH-0003',
  comm_dir_04_kalingarajulu: 'CH-0004',
  comm_dir_05_od_khandayath: 'CH-0005',
  comm_dir_06_oda_chassa: 'CH-0006',
  comm_dir_07_od_paika: 'CH-0007',
  comm_dir_08_odan: 'CH-0008',
  comm_dir_09_vaddi: 'CH-0009',
  comm_dir_10_vaddera: 'CH-0010',
  comm_dir_11_vaddeelu: 'CH-0011',
  comm_dir_12_vaddirajulu: 'CH-0012',
  comm_dir_13_vadderarajulu: 'CH-0013',
  comm_dir_14_gajapathulu: 'CH-0014',
  comm_dir_15_voddar: 'CH-0015',
  comm_dir_16_oddaru: 'CH-0016',
  prof_cat_1_warriors: 'CH-0017',
  prof_cat_2_agriculture: 'CH-0018',
  prof_cat_3_construction_engineering: 'CH-0019',
  prof_cat_4_shilpi: 'CH-0020',
  prof_cat_5_vasthushilpi: 'CH-0021',
  prof_cat_6_lokashilpi: 'CH-0022',
  prof_cat_7_vishwashilpi: 'CH-0023',
  prof_cat_8_royal_heritage: 'CH-0024',
  prof_cat_9_other_professions: 'CH-0025',
  syn_suryavamshi: 'CH-0026',
  syn_sagaravamshi: 'CH-0027',
  syn_raghuvamshi: 'CH-0028',
  syn_od_oad_odra: 'CH-0029',
  syn_odisha_kshatriya: 'CH-0030',
  syn_odiyaraju_karnataka: 'CH-0031',
  syn_ottar: 'CH-0032',
  syn_od_kshatriya: 'CH-0033',
  syn_odde_vadde: 'CH-0034',
  syn_waddar_vaddar: 'CH-0035',
  syn_oddar: 'CH-0036',
  syn_vadde_gajapathirajulu: 'CH-0037',
  syn_odda_nayakkar_tn: 'CH-0038',
  syn_oad_rajputh: 'CH-0039',
  syn_odderajulu: 'CH-0040',
  geo_rajasthan_sindh_punjab: 'CH-0041',
  geo_gujarat: 'CH-0042',
  geo_maharashtra: 'CH-0043',
  geo_karnataka: 'CH-0044',
  geo_andhra_telangana: 'CH-0045',
  geo_tamil_nadu: 'CH-0046',
  geo_odisha: 'CH-0047',

  // ==========================================================================
  // 17. CULTURE & TRADITIONS (CT-0001 to CT-0003) — Page: "Culture & Traditions"
  // ==========================================================================
  'culture-solar-veneration': 'CT-0001',
  'culture-martial-akhadas': 'CT-0002',
  'culture-jagannatha-servitorship': 'CT-0003',

  // ==========================================================================
  // 18. LITERATURE & PUBLICATIONS (LP-0001 to LP-0003) — Page: "Literature & Publications"
  // ==========================================================================
  'lit-sarasvati-vilasa': 'LP-0001',
  'lit-sarala-mahabharata': 'LP-0002',
  'lit-abhinava-gitagovinda': 'LP-0003',

  // ==========================================================================
  // 19. HISTORICAL REFERENCES (HR-0001 to HR-0003) — Page: "Historical References"
  // ==========================================================================
  'ref-epigraphic': 'HR-0001',
  'ref-monographs': 'HR-0002',
  'ref-chronicles': 'HR-0003',

  // ==========================================================================
  // 20. COMMUNITY ACTIVITIES (CA-0001 to CA-0004) — Page: "Community Activities"
  // ==========================================================================
  'act-manuscript-preservation': 'CA-0001',
  'act-research-fellowships': 'CA-0002',
  'act-heritage-tours': 'CA-0003',
  'act-fraternal-forums': 'CA-0004',

  // ==========================================================================
  // 21. EVENTS & NOTICES (EN-0001 to EN-0003) — Page: "Events & Notices"
  // ==========================================================================
  evt_001: 'EN-0001',
  evt_002: 'EN-0002',
  evt_003: 'EN-0003',

  // ==========================================================================
  // 22. WEBSITE PAGES & CATEGORY HUBS (WP-0001 to WP-0038)
  // ==========================================================================
  page_home: 'WP-0001',
  page_about: 'WP-0002',
  page_documentary: 'WP-0003',
  page_odra_desha: 'WP-0004',
  page_kalinga_war: 'WP-0005',
  page_gajapathi_kings: 'WP-0006',
  page_kings_queens: 'WP-0007',
  page_community_prominent_persons: 'WP-0008',
  page_genealogy: 'WP-0009',
  page_maps: 'WP-0010',
  page_timeline: 'WP-0011',
  page_inscriptions: 'WP-0012',
  page_temples_monuments: 'WP-0013',
  page_documents: 'WP-0014',
  page_research: 'WP-0015',
  page_gallery: 'WP-0016',
  page_culture_traditions: 'WP-0017',
  page_literature: 'WP-0018',
  page_references: 'WP-0019',
  page_community_heritage: 'WP-0020',
  page_community_surnames_south: 'WP-0021',
  page_community_surnames_north: 'WP-0022',
  page_community_activities: 'WP-0023',
  page_events: 'WP-0024',
  page_directory: 'WP-0025',
  page_register: 'WP-0026',
  page_login: 'WP-0027',
  page_password_recovery: 'WP-0028',
  page_dashboard: 'WP-0029',
  page_submit_research: 'WP-0030',
  page_admin: 'WP-0031',
  cat_historical_timeline: 'WP-0032',
  cat_inscriptions_archaeology: 'WP-0033',
  cat_royal_dynasties: 'WP-0034',
  cat_kingdoms_maps: 'WP-0035',
  cat_historical_documentary: 'WP-0036',
  cat_historical_gallery: 'WP-0037',
  cat_historical_figures: 'WP-0038',
  page_website_directory: 'WP-0039',

  // 23. Kakatiya Dynasty (KD-0001 to KD-0033)
  ...KAKATIYA_REFERENCE_ID_MAP
};

// Deterministically populate CH-0048 .. CH-0123 for the 76 Master Community References
MASTER_70_REFERENCE_REGISTRY.forEach((entry, index) => {
  const seq = String(48 + index).padStart(4, '0');
  PERMANENT_GLOBAL_REFERENCE_ID_MAP[entry.id] = `CH-${seq}`;
});

// Deterministically populate CSS-0001 .. CSS-0260 for the 260 South-Indian Community Surnames
SOUTH_INDIAN_SURNAME_ENTRIES.forEach((entry, index) => {
  const seq = String(1 + index).padStart(4, '0');
  PERMANENT_GLOBAL_REFERENCE_ID_MAP[entry.id] = `CSS-${seq}`;
});

// Deterministically populate CSN-0001 .. CSN-0090 for the 90 North-Indian Community Surnames
NORTH_INDIAN_SURNAME_ENTRIES.forEach((entry, index) => {
  const seq = String(1 + index).padStart(4, '0');
  PERMANENT_GLOBAL_REFERENCE_ID_MAP[entry.id] = `CSN-${seq}`;
});

/**
 * PHASE 4 – COMPLETE OLD-ID TO NEW-ID MIGRATION MAPPING
 * Clearly separates retired chronological audit notes from active machine-lookup
 * legacy aliases while preserving all 724 historical migration entries.
 */
export const RETIRED_TIMELINE_SEQUENCE_AUDIT_NOTES: Record<string, string> = {
  'HT-0015 (old ev_1458)': 'HT-0016',
  'HT-0016 (old ev_1464)': 'HT-0017',
  'HT-0017 (retired ev_1466)': 'HT-0017',
  'HT-0018 (retired ev_1497)': 'HT-0018',
  'HT-0019 (retired ev_1510)': 'HT-0019',
  'HT-0020 (retired ev_1540)': 'HT-0019',
  'HT-0021 (old ev_1568)': 'HT-0020'
};

export const HASH_BASED_LEGACY_REFERENCE_ALIASES: Record<string, string> = {
  // Previously hash-generated Timeline Event fallbacks
  'HT-6758': 'HT-0015', // ev_kolletikota_gajapathi_garrison
  'HT-3221': 'HT-0018', // ev_1489
  'HT-3277': 'HT-0019', // ev_1515
  // Previously hash-generated Monument fallbacks (IA-xxxx -> TM-0001..TM-0004)
  'IA-6638': 'TM-0001', // mon_meghanada_pacheri
  'IA-4812': 'TM-0002', // mon_konark_sun
  'IA-2194': 'TM-0003', // mon_draksharama_mandapa
  'IA-7410': 'TM-0004', // mon_kolletikota_peddintlamma
  // Previously hash-generated Location fallbacks (KM-xxxx -> KM-0004..KM-0009)
  'KM-4102': 'KM-0004', // loc_barabati_fort
  'KM-5218': 'KM-0005', // loc_puri_jagannatha
  'KM-6304': 'KM-0006', // loc_kondavidu_fort
  'KM-7190': 'KM-0007', // loc_simhachalam
  'KM-8245': 'KM-0008', // loc_udayagiri_fort
  'KM-9012': 'KM-0009', // loc_kolleti_sarasu_fort
  // Previously hash-generated Document fallbacks (HD-xxxx -> DOC-0001..DOC-0002)
  'HD-3812': 'DOC-0001', // doc_madala_panji
  'HD-4920': 'DOC-0002', // doc_sarasvati_vilasa
  // Previously hash-generated Gallery fallbacks (HG-xxxx -> HG-0002..HG-0008)
  'HG-1101': 'HG-0002', // gal_01
  'HG-1102': 'HG-0003', // gal_02
  'HG-1103': 'HG-0004', // gal_03
  'HG-1104': 'HG-0005', // gal_04
  'HG-1105': 'HG-0006', // gal_05
  'HG-1106': 'HG-0007', // gal_06
  'HG-1107': 'HG-0008'  // gal_kolletikota
};

export const HISTORICAL_INTERNAL_ID_ALIASES: Record<string, string> = {
  insc_hathigumpha: 'IA-0003',
  fig_chodaganga_deva: 'HF-0009',
  fig_langula_narasimha: 'HF-0010'
};

/**
 * Active machine-lookup migration map (717 entries: 692 canonical internal IDs +
 * 22 hash-based legacy Reference IDs + 3 historical internal-ID aliases).
 */
export const ACTIVE_CONTENT_MIGRATION_MAP: Record<string, string> = {
  ...HASH_BASED_LEGACY_REFERENCE_ALIASES,
  ...PERMANENT_GLOBAL_REFERENCE_ID_MAP
};

/**
 * Complete historical migration registry (724 entries: all 717 active mappings +
 * 7 retired timeline sequence audit notes preserved for historical traceability).
 */
export const OLD_TO_NEW_REFERENCE_ID_MIGRATION_MAP: Record<string, string> = {
  ...RETIRED_TIMELINE_SEQUENCE_AUDIT_NOTES,
  ...ACTIVE_CONTENT_MIGRATION_MAP
};

/**
 * Variable-length uppercase alphabetical prefix followed by a 4-digit sequential number (e.g. RD-0001, CSS-0001, DOC-0001).
 */
export const REFERENCE_ID_FORMAT_REGEX = /^([A-Z]+)-(\d{4})$/;

/**
 * Validates that a Reference ID matches `PREFIX-NNNN` (with sequence >= 0001)
 * AND that its prefix is registered in `GLOBAL_PREFIX_REGISTRY`.
 */
export function isValidGlobalReferenceId(refId: string | null | undefined): boolean {
  if (!refId) return false;
  const match = refId.trim().match(REFERENCE_ID_FORMAT_REGEX);
  if (!match) return false;
  const [, prefix, digits] = match;
  if (digits === '0000') return false;
  return Object.prototype.hasOwnProperty.call(GLOBAL_PREFIX_REGISTRY, prefix);
}

/**
 * Resolves any internal record ID, article slug, legacy alias, or old Reference ID
 * into its permanent, standardized `PREFIX-NNNN` Reference ID.
 */
export function getReferenceIdByInternalId(
  itemId: string | null | undefined,
  categoryFallback?: string
): string {
  if (!itemId) return 'HD-0000';
  const trimmed = itemId.trim();

  // 1. Direct match in permanent map
  if (PERMANENT_GLOBAL_REFERENCE_ID_MAP[trimmed]) {
    return PERMANENT_GLOBAL_REFERENCE_ID_MAP[trimmed];
  }

  // 2. Already a valid standardized Reference ID or legacy hash Reference ID
  if (REFERENCE_ID_FORMAT_REGEX.test(trimmed)) {
    return ACTIVE_CONTENT_MIGRATION_MAP[trimmed] || OLD_TO_NEW_REFERENCE_ID_MIGRATION_MAP[trimmed] || trimmed;
  }

  // 3. Match by article slug
  const articles = getAllArticles('en');
  const bySlug = articles.find(a => a.slug === trimmed || a.id === trimmed);
  if (bySlug && PERMANENT_GLOBAL_REFERENCE_ID_MAP[bySlug.id]) {
    return PERMANENT_GLOBAL_REFERENCE_ID_MAP[bySlug.id];
  }

  // 4. Fallback deterministic prefix resolution for any future dynamically created Firestore records
  const clean = trimmed.toLowerCase();
  let prefix: ReferencePrefixCode = 'HD';
  if (clean.startsWith('ev_') || clean.startsWith('stage_') || categoryFallback === 'timeline' || categoryFallback === 'HT') {
    prefix = 'HT';
  } else if (clean.startsWith('insc_') || categoryFallback === 'inscriptions' || categoryFallback === 'IA') {
    prefix = 'IA';
  } else if (clean.startsWith('mon_') || categoryFallback === 'monuments' || categoryFallback === 'TM') {
    prefix = 'TM';
  } else if (clean.startsWith('doc_') || categoryFallback === 'documents' || categoryFallback === 'DOC') {
    prefix = 'DOC';
  } else if (clean.startsWith('gen_') || clean.startsWith('clm_') || categoryFallback === 'genealogy' || categoryFallback === 'RG') {
    prefix = 'RG';
  } else if (clean.startsWith('art_dyn_') || clean.startsWith('art_lin_') || clean.startsWith('dyn_') || categoryFallback === 'dynasties' || categoryFallback === 'RD') {
    prefix = 'RD';
  } else if (clean.startsWith('loc_') || clean.startsWith('map_') || clean.startsWith('art_km_') || categoryFallback === 'maps' || categoryFallback === 'KM') {
    prefix = 'KM';
  } else if (clean.startsWith('gal_') || clean.startsWith('art_hg_') || categoryFallback === 'gallery' || categoryFallback === 'HG') {
    prefix = 'HG';
  } else if (clean.startsWith('fig_') || categoryFallback === 'figures' || categoryFallback === 'HF') {
    prefix = 'HF';
  } else if (clean.startsWith('comm_') || clean.startsWith('prof_') || clean.startsWith('syn_') || clean.startsWith('geo_') || clean.startsWith('ref7') || categoryFallback === 'CH') {
    prefix = 'CH';
  } else if (clean.startsWith('north_surname_') || categoryFallback === 'CSN') {
    prefix = 'CSN';
  } else if (clean.startsWith('surname_') || categoryFallback === 'CSS') {
    prefix = 'CSS';
  }
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash * 31 + clean.charCodeAt(i)) % 8900;
  }
  const num = String(1000 + Math.abs(hash)).padStart(4, '0');
  return `${prefix}-${num}`;
}

/**
 * PHASE 5 – CENTRALIZED MASTER REGISTER BUILDER
 * Builds and caches the complete Global Content Reference Registry across all
 * 22 prefixes and 692 records.
 */
let _cachedMasterRegistry: GlobalReferenceRecord[] | null = null;

export function getGlobalContentReferenceRegistry(): GlobalReferenceRecord[] {
  if (_cachedMasterRegistry) return _cachedMasterRegistry;

  const records: GlobalReferenceRecord[] = [];
  const addRecord = (rec: GlobalReferenceRecord) => {
    records.push(rec);
  };

  // 1. All 25 Canonical + Expanded Historical Articles
  const allArticles = getAllArticles('en');
  for (const art of allArticles) {
    if (art.id.startsWith('mon_') || art.id.startsWith('region-') || art.id === 'odra-epigraphic-evolution') continue;
    const refId = getReferenceIdByInternalId(art.id);
    const prefix = (refId.split('-')[0] as ReferencePrefixCode) || 'HD';
    const prefixMeta = GLOBAL_PREFIX_REGISTRY[prefix] || GLOBAL_PREFIX_REGISTRY.HD;
    addRecord({
      newReferenceId: refId,
      previousReferenceId: refId,
      englishPageTitle: prefixMeta.englishPageTitle,
      contentTitle: art.original_title,
      contentCategory: art.category || prefixMeta.categoryTitle,
      internalRecordId: art.id,
      dataSourceFile:
        art.id === 'art_dyn_kakatiya_orugallu'
          ? 'src/data/kakatiyaDynastyData.ts'
          : art.id.startsWith('art_dyn_') || art.id.startsWith('art_lin_') || art.id.startsWith('art_ht_') || art.id.startsWith('art_ia_') || art.id.startsWith('art_km_') || art.id.startsWith('art_hd_') || art.id.startsWith('art_hg_')
          ? 'src/data/expandedDynastiesAndCategoriesArticles.ts'
          : 'src/data/articlesRepository.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds:
        art.id === 'art_dyn_kakatiya_orugallu'
          ? ['comm_dir_10_vaddera', 'comm_dir_12_vaddirajulu', 'fig_kakatiya_ganapati_deva', 'fig_kakatiya_rudrama_devi', 'fig_kakatiya_prataparudra_ii']
          : [],
      creationDate: art.publication_date || '2026-01-18',
      lastUpdatedDate: '2026-11-11',
      recordStatus:
        art.evidence_category === 'verified_archaeological'
          ? 'Active & Verified'
          : art.evidence_category === 'scholarly_interpretation'
          ? 'Active — Scholarly Synthesis'
          : 'Active — Traditional Lineage Record',
      canonicalRoute: `/documentary?article=${encodeURIComponent(art.id)}`,
      prefix
    });
  }

  // 2. 8 Mythology-to-History Timeline Stages (HT-0002 .. HT-0009)
  const stageMeta: Array<{ id: string; ref: string; title: string; related: string[] }> = [
    { id: 'stage_01_mythological', ref: 'HT-0002', title: 'Stage 1: Mythological & Sacred Traditions', related: ['art_surya_vamsa_sagara_rama', 'art_lin_suryavamshi_kshatriyas'] },
    { id: 'stage_02_ancient_civilizations', ref: 'HT-0003', title: 'Stage 2: Ancient Civilizations & Proto-Historical Horizons', related: ['art_odra_desha_history'] },
    { id: 'stage_03_early_historical', ref: 'HT-0004', title: 'Stage 3: Early Historical Period — Kalinga War (261 BCE) & Emperor Kharavela', related: ['art_epigraphic_evolution_odra', 'ev_kharavela_1st_bce'] },
    { id: 'stage_04_ancient_kingdoms', ref: 'HT-0005', title: 'Stage 4: Ancient Kingdoms — Early Kadambas, Early Pallavas & Early Western Gangas', related: ['art_dyn_kadambas_banavasi', 'art_dyn_pallavas_kanchi', 'art_dyn_western_gangas'] },
    { id: 'stage_05_medieval_kingdoms', ref: 'HT-0006', title: 'Stage 5: Early Medieval Kingdoms — Badami & Vengi Chalukyas, Imperial Pallavas & Early Eastern Gangas', related: ['art_dyn_badami_chalukyas', 'art_dyn_vengi_chalukyas'] },
    { id: 'stage_06_imperial_dynasties', ref: 'HT-0007', title: 'Stage 6: High Medieval Imperial Dynasties — Imperial Cholas, Kalyani Chalukyas & Imperial Eastern Gangas', related: ['art_dyn_imperial_cholas', 'art_dyn_chalukya_synthesis', 'art_dyn_eastern_gangas'] },
    { id: 'stage_07_late_medieval', ref: 'HT-0008', title: 'Stage 7: Late Medieval Imperial & Fortress Era — Suryavamsha Gajapathis (1434–1568 CE)', related: ['art_gajapathi_kapilendra', 'art_kolletikota_peddintlamma_lake'] },
    { id: 'stage_08_modern_historical', ref: 'HT-0009', title: 'Stage 8: Early Modern, Colonial Gazetteer & Contemporary Archival Era', related: ['art_oad_rajputh_od_history', 'art_hd_archival_manuscripts_kaifiyats'] }
  ];
  for (const st of stageMeta) {
    addRecord({
      newReferenceId: st.ref,
      previousReferenceId: st.ref,
      englishPageTitle: 'Historical Timeline',
      contentTitle: st.title,
      contentCategory: '1. Historical Timeline (8-Stage Chronology)',
      internalRecordId: st.id,
      dataSourceFile: 'src/data/sevenCategoriesExpansionData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: st.related,
      creationDate: '2026-02-10',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/timeline?id=${encodeURIComponent(st.id)}`,
      prefix: 'HT'
    });
  }

  // 3. 11 Canonical Timeline Events (HT-0010 .. HT-0020)
  const prevEventRefMap: Record<string, string> = {
    ev_kharavela_1st_bce: 'HT-0010',
    ev_jasma_devi_1120: 'HT-0011',
    ev_siddharameshwara_1150: 'HT-0012',
    ev_1434: 'HT-0013',
    ev_1448: 'HT-0014',
    ev_kolletikota_gajapathi_garrison: 'HT-6758',
    ev_1458: 'HT-0015',
    ev_1464: 'HT-0016',
    ev_1489: 'HT-3221',
    ev_1515: 'HT-3277',
    ev_1568: 'HT-0021'
  };
  for (const ev of CANONICAL_TIMELINE_EVENTS) {
    const refId = getReferenceIdByInternalId(ev.id, 'HT');
    const evPrefix = (refId.split('-')[0] as ReferencePrefixCode) || 'HT';
    const isKakatiyaEv = evPrefix === 'KD';
    addRecord({
      newReferenceId: refId,
      previousReferenceId: prevEventRefMap[ev.id] || refId,
      englishPageTitle: isKakatiyaEv ? GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle : 'Historical Timeline',
      contentTitle: `${ev.title} (${ev.year_text})`,
      contentCategory: isKakatiyaEv ? '3. Royal Dynasties — Kakatiya Timeline Events' : 'Historical Timeline Events',
      internalRecordId: ev.id,
      dataSourceFile: isKakatiyaEv ? 'src/data/kakatiyaDynastyData.ts' : 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: isKakatiyaEv ? ['art_dyn_kakatiya_orugallu', 'art_ht_chronological_methodology'] : ['art_ht_chronological_methodology'],
      creationDate: isKakatiyaEv ? '2026-11-11' : '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/timeline?id=${encodeURIComponent(ev.id)}`,
      prefix: evPrefix
    });
  }

  // 4. 10 Inscriptions & Epigraphic Records (IA-0003 .. IA-0012)
  const allEpigraphicEntries: Array<{ id: string; ref: string; title: string; prev: string }> = [
    { id: 'insc_hathigumpha_kharavela', ref: 'IA-0003', title: 'Hathigumpha Праkrit Rock Inscription of Emperor Kharavela (Udayagiri, c. 1st Century BCE)', prev: 'IA-0003' },
    { id: 'insc_korni_copper_plates', ref: 'IA-0004', title: 'Korni Copper-Plate Grant of Anantavarman Chodaganga Deva (1112 CE / Saka 1034)', prev: 'IA-0004' },
    { id: 'insc_kendupatna_plates', ref: 'IA-0005', title: 'Kendupatna Copper-Plate Charter of Narasimha Deva II (1295 CE / Saka 1217)', prev: 'IA-0005' },
    { id: 'insc_lingaraja_1452', ref: 'IA-0006', title: 'Lingaraja Temple Proclamation of Emperor Kapilendra Deva (1452 CE)', prev: 'IA-0006' },
    { id: 'insc_veligalani_1458', ref: 'IA-0007', title: 'Veligalani Copper-Plate Grant of Emperor Kapilendra Deva (1458 CE / Saka 1380)', prev: 'IA-0007' },
    { id: 'insc_simhachalam_1459', ref: 'IA-0008', title: 'Simhachalam Temple Epigraph of Gajapathi Era (1459 CE)', prev: 'IA-0008' },
    { id: 'insc_srirangam_1464', ref: 'IA-0009', title: 'Srirangam Ranganathaswamy Endowment Inscription of Kumara Hamvira Deva (1464 CE / Saka 1386)', prev: 'IA-0009' },
    { id: 'insc_potavaram_1489', ref: 'IA-0010', title: 'Potavaram Copper-Plate Grant of Emperor Purushottama Deva (1489 CE / Saka 1411)', prev: 'IA-0010' },
    { id: 'insc_simhachalam_prataparudra', ref: 'IA-0011', title: 'Simhachalam Temple Inscription of Emperor Prataparudra Deva (1510 CE)', prev: 'IA-0011' },
    { id: 'insc_kondapalli_1519', ref: 'IA-0012', title: 'Kondapalli–Vijayanagara Diplomatic Epigraphic Record (1519 CE)', prev: 'IA-0012' }
  ];
  for (const ins of allEpigraphicEntries) {
    addRecord({
      newReferenceId: ins.ref,
      previousReferenceId: ins.prev,
      englishPageTitle: 'Inscriptions & Archaeology',
      contentTitle: ins.title,
      contentCategory: '2. Inscriptions & Archaeology',
      internalRecordId: ins.id,
      dataSourceFile: CANONICAL_INSCRIPTIONS.some(i => i.id === ins.id)
        ? 'src/data/archivalSeedData.ts'
        : 'src/data/sevenCategoriesExpansionData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_epigraphic_evolution_odra', 'art_ia_south_indian_epigraphy_corpus'],
      creationDate: '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/inscriptions?id=${encodeURIComponent(ins.id)}`,
      prefix: 'IA'
    });
  }
  for (const kIns of KAKATIYA_INSCRIPTIONS) {
    const refId = getReferenceIdByInternalId(kIns.id, 'KD');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: refId,
      englishPageTitle: GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle,
      contentTitle: `${kIns.name} (${kIns.era_or_date})`,
      contentCategory: '2. Inscriptions & Archaeology — Kakatiya Epigraphy',
      internalRecordId: kIns.id,
      dataSourceFile: 'src/data/kakatiyaDynastyData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_dyn_kakatiya_orugallu', 'art_ia_south_indian_epigraphy_corpus'],
      creationDate: '2026-11-11',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/inscriptions?id=${encodeURIComponent(kIns.id)}`,
      prefix: 'KD'
    });
  }

  // 5. 8 Inline Royal Dynasty & Administration Dossiers on GajapathiKingdomPage (RD-0014 .. RD-0021) + Kakatiya Dynasty Record (KD-0023)
  const rdInlineItems: Array<{ id: string; ref: string; title: string }> = [
    { id: 'dyn_suryavamsha_gajapathi', ref: 'RD-0014', title: 'Suryavamsha Gajapathi Imperial Dynasty (1434–1541 CE)' },
    { id: 'dyn_eastern_ganga', ref: 'RD-0015', title: 'Imperial Eastern Ganga (Chodaganga) Dynasty (496–1434 CE)' },
    { id: 'dyn_bhoi_mukunda', ref: 'RD-0016', title: 'Bhoi & Chalukya Mukunda Deva Transition (1541–1568 CE)' },
    { id: 'dyn_traditional_suryavamsha_lineages', ref: 'RD-0017', title: 'Southern Suryavamsha Odiyaraju / Vaddera / Oddar Nayaka Lineages' },
    { id: 'admin-mahapatras', ref: 'RD-0018', title: 'Imperial Council of Patra-Mahapatras & Parikshas' },
    { id: 'admin-nayakas', ref: 'RD-0019', title: 'Dandapata Provincial Administration & Durgadhipatis' },
    { id: 'military-gajasena', ref: 'RD-0020', title: 'Gaja-Sena (Imperial War Elephant Corps) & Paika Infantry' },
    { id: 'culture-renaissance', ref: 'RD-0021', title: 'Odia Literary Renaissance & Jagannatha Dharma Patronage' }
  ];
  for (const item of rdInlineItems) {
    addRecord({
      newReferenceId: item.ref,
      previousReferenceId: item.id,
      englishPageTitle: 'Royal Dynasties',
      contentTitle: item.title,
      contentCategory: '3. Royal Dynasties (Imperial Governance & Branches)',
      internalRecordId: item.id,
      dataSourceFile: 'src/pages/GajapathiKingdomPage.tsx',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_gajapathi_kapilendra'],
      creationDate: '2026-01-22',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/gajapathi-kings?id=${encodeURIComponent(item.id)}`,
      prefix: 'RD'
    });
  }
  addRecord({
    newReferenceId: 'KD-0023',
    previousReferenceId: 'KD-0023',
    englishPageTitle: GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle,
    contentTitle: `${KAKATIYA_DYNASTY_RECORD.name.en} (${KAKATIYA_DYNASTY_RECORD.period.en})`,
    contentCategory: '3. Royal Dynasties — Kakatiya Dynasty',
    internalRecordId: KAKATIYA_DYNASTY_RECORD.id,
    dataSourceFile: 'src/data/kakatiyaDynastyData.ts',
    availableLanguages: ALL_EIGHT_LANGUAGES,
    relatedContentIds: ['art_dyn_kakatiya_orugallu', 'fig_kakatiya_ganapati_deva', 'fig_kakatiya_rudrama_devi', 'fig_kakatiya_prataparudra_ii'],
    creationDate: '2026-11-11',
    lastUpdatedDate: '2026-11-11',
    recordStatus: 'Active & Verified',
    canonicalRoute: `/gajapathi-kings?id=${encodeURIComponent(KAKATIYA_DYNASTY_RECORD.id)}`,
    prefix: 'KD'
  });

  // 6. 6 Canonical Historical Locations + 1 Map Zenith Record (KM-0004 .. KM-0010)
  const prevLocRefMap: Record<string, string> = {
    loc_barabati_fort: 'KM-4102',
    loc_puri_jagannatha: 'KM-5218',
    loc_kondavidu_fort: 'KM-6304',
    loc_simhachalam: 'KM-7190',
    loc_udayagiri_fort: 'KM-8245',
    loc_kolleti_sarasu_fort: 'KM-9012'
  };
  for (const loc of CANONICAL_LOCATIONS) {
    const refId = getReferenceIdByInternalId(loc.id, 'KM');
    const locPrefix = (refId.split('-')[0] as ReferencePrefixCode) || 'KM';
    const isKakatiyaLoc = locPrefix === 'KD';
    addRecord({
      newReferenceId: refId,
      previousReferenceId: prevLocRefMap[loc.id] || refId,
      englishPageTitle: isKakatiyaLoc ? GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle : 'Kingdoms & Maps',
      contentTitle: `${loc.name} (${loc.ancient_name})`,
      contentCategory: isKakatiyaLoc ? '4. Kingdoms & Maps — Kakatiya Capitals, Ports & Reservoirs' : '4. Kingdoms & Maps (Historical Locations & Citadels)',
      internalRecordId: loc.id,
      dataSourceFile: isKakatiyaLoc ? 'src/data/kakatiyaDynastyData.ts' : 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: isKakatiyaLoc ? ['art_dyn_kakatiya_orugallu', 'art_km_deccan_corridors_forts'] : ['art_km_deccan_corridors_forts'],
      creationDate: isKakatiyaLoc ? '2026-11-11' : '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/maps?id=${encodeURIComponent(loc.id)}`,
      prefix: locPrefix
    });
  }
  addRecord({
    newReferenceId: 'KM-0010',
    previousReferenceId: 'map_1465_zenith',
    englishPageTitle: 'Kingdoms & Maps',
    contentTitle: 'Gajapathi Empire Territorial Zenith Map (c. 1465 CE — Ganga to Kaveri)',
    contentCategory: '4. Kingdoms & Maps (Cartographic Reconstructions)',
    internalRecordId: 'map_1465_zenith',
    dataSourceFile: 'src/pages/HistoricalMapsPage.tsx',
    availableLanguages: ALL_EIGHT_LANGUAGES,
    relatedContentIds: ['art_odra_desha_history', 'art_gajapathi_kapilendra'],
    creationDate: '2026-01-20',
    lastUpdatedDate: '2026-11-11',
    recordStatus: 'Active & Verified',
    canonicalRoute: '/maps?id=map_1465_zenith',
    prefix: 'KM'
  });

  // 7. 8 Documentary Monograph Chapters (HD-0003 .. HD-0010)
  for (const mono of HISTORICAL_MONOGRAPH_SECTIONS) {
    const refId = getReferenceIdByInternalId(mono.id, 'HD');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: mono.id,
      englishPageTitle: 'Historical Documentary',
      contentTitle: mono.section_title.en,
      contentCategory: '5. Historical Documentary (Monograph Chapters)',
      internalRecordId: mono.id,
      dataSourceFile: 'src/data/historyContent.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-01-19',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active — Scholarly Synthesis',
      canonicalRoute: `/community-heritage?tab=history&id=${encodeURIComponent(mono.id)}`,
      prefix: 'HD'
    });
  }

  // 8. 7 Canonical Gallery Visual Records (HG-0002 .. HG-0008)
  const prevGalRefMap: Record<string, string> = {
    gal_01: 'HG-1101',
    gal_02: 'HG-1102',
    gal_03: 'HG-1103',
    gal_04: 'HG-1104',
    gal_05: 'HG-1105',
    gal_06: 'HG-1106',
    gal_kolletikota: 'HG-1107'
  };
  for (const gal of CANONICAL_GALLERY) {
    const refId = getReferenceIdByInternalId(gal.id, 'HG');
    const galPrefix = (refId.split('-')[0] as ReferencePrefixCode) || 'HG';
    const isKakatiyaGal = galPrefix === 'KD';
    addRecord({
      newReferenceId: refId,
      previousReferenceId: prevGalRefMap[gal.id] || refId,
      englishPageTitle: isKakatiyaGal ? GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle : 'Historical Gallery',
      contentTitle: gal.title,
      contentCategory: isKakatiyaGal ? '6. Historical Gallery — Kakatiya Architectural Plates' : '6. Historical Gallery (Archival Visual Plates)',
      internalRecordId: gal.id,
      dataSourceFile: isKakatiyaGal ? 'src/data/kakatiyaDynastyData.ts' : 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: isKakatiyaGal ? ['art_dyn_kakatiya_orugallu', 'art_hg_architectural_emblems_provenance'] : ['art_hg_architectural_emblems_provenance'],
      creationDate: isKakatiyaGal ? '2026-11-11' : '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/gallery?id=${encodeURIComponent(gal.id)}`,
      prefix: galPrefix
    });
  }

  // 9. Documented Historical Figures in KingsQueensPage (HF-0002 .. HF-0014, HF-0017 + 9 Kakatiya Rulers KD-0002 .. KD-0010)
  for (const fig of DOCUMENTED_FIGURES_REPO) {
    const refId = getReferenceIdByInternalId(fig.id, 'HF');
    const figPrefix = (refId.split('-')[0] as ReferencePrefixCode) || 'HF';
    const isKakatiyaFig = figPrefix === 'KD';
    const figNameEn = typeof fig.name === 'string' ? fig.name : fig.name.en;
    const figReignEn = (typeof fig.reign_period === 'string' ? fig.reign_period : fig.reign_period?.en) || fig.approx_dates;
    addRecord({
      newReferenceId: refId,
      previousReferenceId: refId,
      englishPageTitle: isKakatiyaFig
        ? GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle
        : 'Historical Figures (Documented Historical Figures / Kings & Queens)',
      contentTitle: `${figNameEn} (${figReignEn})`,
      contentCategory: isKakatiyaFig
        ? '7. Historical Figures — Kakatiya Monarchs of Anumakonda & Orugallu'
        : '7. Historical Figures (Monarchs, Progenitors & Sacred Guardians)',
      internalRecordId: fig.id,
      dataSourceFile: isKakatiyaFig ? 'src/data/kakatiyaDynastyData.ts' : 'src/data/documentedFiguresRepository.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: isKakatiyaFig ? ['art_dyn_kakatiya_orugallu', ...(fig.inscriptions_ids || [])] : (fig.inscriptions_ids || []),
      creationDate: isKakatiyaFig ? '2026-11-11' : '2026-01-21',
      lastUpdatedDate: '2026-11-11',
      recordStatus:
        fig.evidence_status === 'Documented Primary Evidence' || fig.evidence_status === 'Epigraphic Record'
          ? 'Active & Verified'
          : 'Active — Traditional Lineage Record',
      canonicalRoute: `/kings-queens?figure=${encodeURIComponent(fig.id)}`,
      prefix: figPrefix
    });
  }

  // 10. Canonical Temples & Monuments (TM-0001 .. TM-0004 + 4 Kakatiya Monuments KD-0011 .. KD-0014)
  const prevMonRefMap: Record<string, string> = {
    mon_meghanada_pacheri: 'IA-6638',
    mon_konark_sun: 'IA-4812',
    mon_draksharama_mandapa: 'IA-2194',
    mon_kolletikota_peddintlamma: 'IA-7410'
  };
  for (const mon of CANONICAL_MONUMENTS) {
    const refId = getReferenceIdByInternalId(mon.id, 'TM');
    const monPrefix = (refId.split('-')[0] as ReferencePrefixCode) || 'TM';
    const isKakatiyaMon = monPrefix === 'KD';
    addRecord({
      newReferenceId: refId,
      previousReferenceId: prevMonRefMap[mon.id] || refId,
      englishPageTitle: isKakatiyaMon ? GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle : 'Temples & Monuments',
      contentTitle: `${mon.name} (${mon.location})`,
      contentCategory: isKakatiyaMon ? 'Temples & Monuments — Kakatiya Architecture' : 'Temples & Monuments',
      internalRecordId: mon.id,
      dataSourceFile: isKakatiyaMon ? 'src/data/kakatiyaDynastyData.ts' : 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: isKakatiyaMon ? ['art_dyn_kakatiya_orugallu', 'art_hg_architectural_emblems_provenance'] : ['art_hg_architectural_emblems_provenance'],
      creationDate: isKakatiyaMon ? '2026-11-11' : '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/temples-monuments?id=${encodeURIComponent(mon.id)}`,
      prefix: monPrefix
    });
  }

  // 11. 2 Canonical Digitized Historical Documents (DOC-0001 .. DOC-0002)
  const prevDocRefMap: Record<string, string> = {
    doc_madala_panji: 'HD-3812',
    doc_sarasvati_vilasa: 'HD-4920'
  };
  for (const doc of CANONICAL_DOCUMENTS) {
    const refId = getReferenceIdByInternalId(doc.id, 'DOC');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: prevDocRefMap[doc.id] || doc.id,
      englishPageTitle: 'Digitized Historical Documents & Royal Chronicles',
      contentTitle: doc.title,
      contentCategory: 'Historical Documents',
      internalRecordId: doc.id,
      dataSourceFile: 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_hd_archival_manuscripts_kaifiyats'],
      creationDate: '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/documents?id=${encodeURIComponent(doc.id)}`,
      prefix: 'DOC'
    });
  }

  // 12. Royal Genealogy Lineage Nodes + 3 Epistemic Lineage Claims (RG-0001 .. RG-0012 + Kakatiya Lineage Node KD-0025)
  for (const gen of CANONICAL_GENEALOGY) {
    const refId = getReferenceIdByInternalId(gen.id, 'RG');
    const genPrefix = (refId.split('-')[0] as ReferencePrefixCode) || 'RG';
    const isKakatiyaGen = genPrefix === 'KD';
    addRecord({
      newReferenceId: refId,
      previousReferenceId: isKakatiyaGen ? refId : gen.id,
      englishPageTitle: isKakatiyaGen ? GLOBAL_PREFIX_REGISTRY.KD.englishPageTitle : 'Royal Genealogy',
      contentTitle: `${gen.name}${gen.reign ? ' (' + gen.reign + ')' : ''}`,
      contentCategory: isKakatiyaGen ? 'Royal Genealogy — Kakatiya Durjaya-Ikshvaku Lineage' : 'Royal Genealogy (Lineage Nodes)',
      internalRecordId: gen.id,
      dataSourceFile: isKakatiyaGen ? 'src/data/kakatiyaDynastyData.ts' : 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: isKakatiyaGen ? ['art_dyn_kakatiya_orugallu', 'art_genealogy_methodology'] : ['art_genealogy_methodology'],
      creationDate: isKakatiyaGen ? '2026-11-11' : '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus:
        gen.relationship_type === 'documented_primary' || gen.relationship_type === 'epigraphic_confirmed'
          ? 'Active & Verified'
          : 'Active — Traditional Lineage Record',
      canonicalRoute: `/genealogy?id=${encodeURIComponent(gen.id)}`,
      prefix: genPrefix
    });
  }
  for (const clm of CANONICAL_CLAIMS) {
    const refId = getReferenceIdByInternalId(clm.id, 'RG');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: clm.id,
      englishPageTitle: 'Royal Genealogy',
      contentTitle: clm.topic || clm.claim_statement,
      contentCategory: 'Royal Genealogy (Epistemic Verification Claims)',
      internalRecordId: clm.id,
      dataSourceFile: 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_genealogy_methodology'],
      creationDate: '2026-01-20',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active — Scholarly Synthesis',
      canonicalRoute: `/genealogy?id=${encodeURIComponent(clm.id)}`,
      prefix: 'RG'
    });
  }

  // 13. 5 Odra Desha Territorial & Epigraphic Dossiers (OD-0001 .. OD-0005)
  const odraItems: Array<{ id: string; ref: string; title: string; related: string[] }> = [
    {
      id: 'region-odra',
      ref: 'OD-0001',
      title: 'OD-0001 | Core Odra Desha (Mahanadi–Brahmani–Baitarani Deltaic Heartland): Primordial Origins, Riverine Statecraft, and Sovereign Core of the Suryavamsha Gajapathi Empire',
      related: ['region-utkala', 'region-kalinga', 'region-trikalinga', 'odra-epigraphic-evolution', 'art_odra_desha_history', 'art_gajapathi_kapilendra']
    },
    {
      id: 'region-utkala',
      ref: 'OD-0002',
      title: 'OD-0002 | Utkala Mandala (Northern Coastal & Subarnarekha–Baitarani Corridor): Viraja Kshetra, Bhauma-Kara & Somavamshi Synthesis, and Sacred Solar Architecture',
      related: ['region-odra', 'region-kalinga', 'region-trikalinga', 'odra-epigraphic-evolution', 'mon_konark_sun', 'mon_meghanada_pacheri']
    },
    {
      id: 'region-kalinga',
      ref: 'OD-0003',
      title: 'OD-0003 | Kalinga Rashtra (Mahendragiri to Godavari Maritime Seaboard): Ancient Kalinganagari, Emperor Kharavela’s Resurgence, and Trans-Oceanic Maritime Networks',
      related: ['region-odra', 'region-utkala', 'region-trikalinga', 'odra-epigraphic-evolution', 'art_odra_desha_history', 'mon_draksharama_mandapa']
    },
    {
      id: 'region-trikalinga',
      ref: 'OD-0004',
      title: 'OD-0004 | Trikalinga & Dakshina Kosala (Western Highland & Riverine Frontier): Trikalingadhipati Imperial Sovereignty across Kalinga, Utkala, and Kosala',
      related: ['region-odra', 'region-utkala', 'region-kalinga', 'odra-epigraphic-evolution', 'art_odra_desha_history', 'art_dyn_eastern_gangas']
    },
    {
      id: 'odra-epigraphic-evolution',
      ref: 'OD-0005',
      title: 'OD-0005 | Epigraphic Evolution of the Odra Identity (Hathigumpha to Kataka Edicts): Classical Attestations, Xuanzang’s Wu-T’u Chronicle, and Gajapathi Copper-Plate Charters',
      related: ['region-odra', 'region-utkala', 'region-kalinga', 'region-trikalinga', 'art_epigraphic_evolution_odra', 'art_odra_desha_history']
    }
  ];
  for (const od of odraItems) {
    addRecord({
      newReferenceId: od.ref,
      previousReferenceId: od.id,
      englishPageTitle: 'Odra Desha',
      contentTitle: od.title,
      contentCategory: 'Odra Desha Regional History',
      internalRecordId: od.id,
      dataSourceFile: 'src/data/articlesRepository.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: od.related,
      creationDate: '2026-01-22',
      lastUpdatedDate: '2026-11-12',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/odra-desha?id=${encodeURIComponent(od.id)}`,
      prefix: 'OD'
    });
  }

  // 14. 12 Kalinga War Sections & Scenes (KW-0001 .. KW-0012)
  const kwSections: Array<{ id: string; ref: string; title: string }> = [
    { id: 'kw_section_background', ref: 'KW-0001', title: 'Kalinga War Section 1: Geopolitical Background & Maritime Sovereignty of Ancient Kalinga' },
    { id: 'kw_section_battle', ref: 'KW-0002', title: 'Kalinga War Section 2: The Campaign of 261 BCE on the Banks of the Daya River' },
    { id: 'kw_section_tragedy', ref: 'KW-0003', title: 'Kalinga War Section 3: Epigraphic Testimony of Major Rock Edict XIII (Casualties & Deportations)' },
    { id: 'kw_section_remorse', ref: 'KW-0004', title: 'Kalinga War Section 4: Ashoka’s Remorse & Transition from Chakravartin to Dhamma-Vijaya' },
    { id: 'kw_section_legacy', ref: 'KW-0005', title: 'Kalinga War Section 5: Enduring Legacy at Dhauli, Jaugada & Subsequent Kalinga Resurgence under Kharavela' }
  ];
  for (const kws of kwSections) {
    addRecord({
      newReferenceId: kws.ref,
      previousReferenceId: kws.id,
      englishPageTitle: 'The Kalinga War (261 BCE)',
      contentTitle: kws.title,
      contentCategory: 'The Kalinga War (261 BCE) — Historiographical Analysis',
      internalRecordId: kws.id,
      dataSourceFile: 'src/data/kalingaWarData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_odra_desha_history', 'insc_hathigumpha_kharavela'],
      creationDate: '2026-02-01',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/kalinga-war?id=${encodeURIComponent(kws.id)}`,
      prefix: 'KW'
    });
  }
  for (const sc of KALINGA_WAR_CONTENT.en.scenes) {
    const refId = getReferenceIdByInternalId(sc.id, 'KW');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: sc.id,
      englishPageTitle: 'The Kalinga War (261 BCE)',
      contentTitle: `${sc.sceneNumber}: ${sc.title}`,
      contentCategory: 'The Kalinga War (261 BCE) — Visual & Epigraphic Scenes',
      internalRecordId: sc.id,
      dataSourceFile: 'src/data/kalingaWarData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_odra_desha_history'],
      creationDate: '2026-02-01',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/kalinga-war?id=${encodeURIComponent(sc.id)}`,
      prefix: 'KW'
    });
  }

  // 15. 32 Community Prominent Persons & Research Placeholders (CPP-0001 .. CPP-0032)
  for (const p of PROMINENT_PERSONS) {
    const refId = getReferenceIdByInternalId(p.id, 'CPP');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: p.id,
      englishPageTitle: 'Community Prominent Persons',
      contentTitle: `${p.name.en} (${p.era.en})`,
      contentCategory: `Community Prominent Persons (${p.badge})`,
      internalRecordId: p.id,
      dataSourceFile: 'src/data/communityProminentPersonsData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: p.branches.slice(0, 4),
      creationDate: '2026-02-05',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-prominent-persons?id=${encodeURIComponent(p.id)}`,
      prefix: 'CPP'
    });
  }
  for (const ph of ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES) {
    const refId = getReferenceIdByInternalId(ph.id, 'CPP');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: ph.id,
      englishPageTitle: 'Community Prominent Persons',
      contentTitle: ph.title.en,
      contentCategory: 'Community Prominent Persons (Archival Research Scope)',
      internalRecordId: ph.id,
      dataSourceFile: 'src/data/communityProminentPersonsData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: [],
      creationDate: '2026-02-05',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active — Archival Research Scope',
      canonicalRoute: `/community-prominent-persons?id=${encodeURIComponent(ph.id)}`,
      prefix: 'CPP'
    });
  }

  // 16. 123 Community Heritage Records (CH-0001 .. CH-0123)
  // 16a. 16 Canonical Community Directory Items (CH-0001 .. CH-0016)
  for (const dirItem of COMMUNITY_DIRECTORY_ITEMS) {
    const refId = getReferenceIdByInternalId(dirItem.id, 'CH');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: dirItem.id,
      englishPageTitle: 'Community Heritage',
      contentTitle: `${dirItem.canonicalName} — ${dirItem.categoryGroup}`,
      contentCategory: 'Community Heritage (16-Branch Directory)',
      internalRecordId: dirItem.id,
      dataSourceFile: 'src/data/communityHeritageDirectoryData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-01-25',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-heritage?tab=synonyms&id=${encodeURIComponent(dirItem.id)}`,
      prefix: 'CH'
    });
  }
  // 16b. 9 Professional Heritage Categories (CH-0017 .. CH-0025)
  for (const prof of COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES) {
    const refId = getReferenceIdByInternalId(prof.id, 'CH');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: prof.id,
      englishPageTitle: 'Community Heritage',
      contentTitle: prof.title.en,
      contentCategory: 'Community Heritage (9 Professional & Shilpa-Shastra Categories)',
      internalRecordId: prof.id,
      dataSourceFile: 'src/data/communityHeritageDirectoryData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-01-25',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-heritage?tab=professions&id=${encodeURIComponent(prof.id)}`,
      prefix: 'CH'
    });
  }
  // 16c. 15 Community Synonyms (CH-0026 .. CH-0040)
  for (const syn of COMMUNITY_SYNONYMS) {
    const refId = getReferenceIdByInternalId(syn.id, 'CH');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: syn.id,
      englishPageTitle: 'Community Heritage',
      contentTitle: `${syn.title} (${syn.category})`,
      contentCategory: 'Community Heritage (Regional & Lineage Synonyms)',
      internalRecordId: syn.id,
      dataSourceFile: 'src/data/historyContent.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-01-25',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-heritage?tab=synonyms&id=${encodeURIComponent(syn.id)}`,
      prefix: 'CH'
    });
  }
  // 16d. 7 Geographical Spread Regions (CH-0041 .. CH-0047)
  for (const geo of GEOGRAPHICAL_SPREAD) {
    const refId = getReferenceIdByInternalId(geo.id, 'CH');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: geo.id,
      englishPageTitle: 'Community Heritage',
      contentTitle: geo.region_name,
      contentCategory: 'Community Heritage (Regional Geographical Distribution)',
      internalRecordId: geo.id,
      dataSourceFile: 'src/data/historyContent.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-01-25',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-heritage?tab=geography&id=${encodeURIComponent(geo.id)}`,
      prefix: 'CH'
    });
  }
  // 16e. All 76 Master Community Nomenclature References (CH-0048 .. CH-0123)
  for (const ref76 of MASTER_70_REFERENCE_REGISTRY) {
    const refId = getReferenceIdByInternalId(ref76.id, 'CH');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: ref76.id,
      englishPageTitle: 'Community Heritage',
      contentTitle: `${ref76.canonicalTerm} (#${ref76.order} — ${ref76.classification})`,
      contentCategory: 'Community Heritage (76-Name Master Reference Directory)',
      internalRecordId: ref76.id,
      dataSourceFile: 'src/data/communityReference70Registry.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds:
        ref76.relatedHeritageIds && ref76.relatedHeritageIds.length > 0
          ? ref76.relatedHeritageIds
          : ['art_oad_rajputh_od_history'],
      creationDate: '2026-02-01',
      lastUpdatedDate: '2026-11-11',
      recordStatus:
        ref76.verificationStatus === 'Verified Epigraphic / Historical Record'
          ? 'Active & Verified'
          : ref76.verificationStatus === 'Documented Gazetteer / Ethnographic Record'
          ? 'Active — Scholarly Synthesis'
          : 'Active — Traditional Lineage Record',
      canonicalRoute: ref76.primaryTargetLink || `/community-heritage?id=${encodeURIComponent(ref76.id)}`,
      prefix: 'CH'
    });
  }

  // 17. 260 South-Indian Community Surnames (CSS-0001 .. CSS-0260)
  for (const sEntry of SOUTH_INDIAN_SURNAME_ENTRIES) {
    const refId = getReferenceIdByInternalId(sEntry.id, 'CSS');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: sEntry.id,
      englishPageTitle: 'Community Surnames [South-Indian-Oad-Community]',
      contentTitle: `${sEntry.surname} (Letter ${sEntry.letter} — South-Indian Surname #${sEntry.orderIndex})`,
      contentCategory: 'Community Surnames (South-Indian Odiyaraju / Vaddera / Oddar)',
      internalRecordId: sEntry.id,
      dataSourceFile: 'src/data/communitySurnamesData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-02-08',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-surnames?letter=${encodeURIComponent(sEntry.letter)}&id=${encodeURIComponent(sEntry.id)}`,
      prefix: 'CSS'
    });
  }

  // 18. 90 North-Indian Community Surnames (CSN-0001 .. CSN-0090)
  for (const nEntry of NORTH_INDIAN_SURNAME_ENTRIES) {
    const refId = getReferenceIdByInternalId(nEntry.id, 'CSN');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: nEntry.id,
      englishPageTitle: 'Community Surnames [North-Indian-Oad-Community]',
      contentTitle: `${nEntry.surname} (Letter ${nEntry.letter} — North-Indian Gotra/Surname #${nEntry.orderIndex})`,
      contentCategory: 'Community Surnames (North-Indian Suryavamshi Oad-Rajpoot)',
      internalRecordId: nEntry.id,
      dataSourceFile: 'src/data/northIndianSurnamesData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_oad_rajputh_od_history'],
      creationDate: '2026-02-08',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-surnames-north-indian-oad-community?letter=${encodeURIComponent(nEntry.letter)}&id=${encodeURIComponent(nEntry.id)}`,
      prefix: 'CSN'
    });
  }

  // 19. 3 Culture & Traditions Dossiers (CT-0001 .. CT-0003)
  const ctItems = [
    { id: 'culture-solar-veneration', ref: 'CT-0001', title: 'Surya Narayana & Sri Kolletikota Peddintlamma Thalli Veneration' },
    { id: 'culture-martial-akhadas', ref: 'CT-0002', title: 'Paika Martial Akhadas, Fort Defense & Kshatriya Dharma' },
    { id: 'culture-jagannatha-servitorship', ref: 'CT-0003', title: 'Shree Jagannatha Temple Construction & Shilpa-Shastra Servitorship' }
  ];
  for (const ct of ctItems) {
    addRecord({
      newReferenceId: ct.ref,
      previousReferenceId: ct.id,
      englishPageTitle: 'Culture & Traditions',
      contentTitle: ct.title,
      contentCategory: 'Culture & Traditions',
      internalRecordId: ct.id,
      dataSourceFile: 'src/pages/CultureTraditionsPage.tsx',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_kolletikota_peddintlamma_lake'],
      creationDate: '2026-01-24',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/culture-traditions?id=${encodeURIComponent(ct.id)}`,
      prefix: 'CT'
    });
  }

  // 20. 3 Literature & Publications Dossiers (LP-0001 .. LP-0003)
  const lpItems = [
    { id: 'lit-sarasvati-vilasa', ref: 'LP-0001', title: 'Sarasvati Vilasa — Imperial Sanskrit Legal Digest of Emperor Prataparudra Deva' },
    { id: 'lit-sarala-mahabharata', ref: 'LP-0002', title: 'Sarala Mahabharata — Classical Odia Epic Composed under Emperor Kapilendra Deva' },
    { id: 'lit-abhinava-gitagovinda', ref: 'LP-0003', title: 'Abhinava Gitagovinda & Mukti Chintamani — Royal Court Treatises of Purushottama Deva' }
  ];
  for (const lp of lpItems) {
    addRecord({
      newReferenceId: lp.ref,
      previousReferenceId: lp.id,
      englishPageTitle: 'Literature & Publications',
      contentTitle: lp.title,
      contentCategory: 'Literature & Publications',
      internalRecordId: lp.id,
      dataSourceFile: 'src/pages/LiteraturePublicationsPage.tsx',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_gajapathi_kapilendra'],
      creationDate: '2026-01-24',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/literature?id=${encodeURIComponent(lp.id)}`,
      prefix: 'LP'
    });
  }

  // 21. 3 Historical References Corpora (HR-0001 .. HR-0003)
  const hrItems = [
    { id: 'ref-epigraphic', ref: 'HR-0001', title: 'Epigraphia Indica, South Indian Inscriptions (SII) & ASI Epigraphic Corpus' },
    { id: 'ref-monographs', ref: 'HR-0002', title: 'Peer-Reviewed Academic Monographs (Subrahmanyam 1957, Panigrahi 1981, Sahu 1964, Sircar 1960)' },
    { id: 'ref-chronicles', ref: 'HR-0003', title: 'Madala Panji Temple Chronicles, Mackenzie Kaifiyats & Imperial Gazetteers (Thurston 1909, Russell 1916)' }
  ];
  for (const hr of hrItems) {
    addRecord({
      newReferenceId: hr.ref,
      previousReferenceId: hr.id,
      englishPageTitle: 'Historical References',
      contentTitle: hr.title,
      contentCategory: 'Historical References & Scholarly Bibliography',
      internalRecordId: hr.id,
      dataSourceFile: 'src/components/HistoricalRecordDetailView.tsx',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: ['art_ia_south_indian_epigraphy_corpus', 'art_hd_archival_manuscripts_kaifiyats'],
      creationDate: '2026-01-24',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/references?id=${encodeURIComponent(hr.id)}`,
      prefix: 'HR'
    });
  }

  // 22. 4 Community Activities Programs (CA-0001 .. CA-0004)
  const caItems = [
    { id: 'act-manuscript-preservation', ref: 'CA-0001', title: 'Digital Epigraphic & Palm-Leaf Manuscript Preservation Initiative' },
    { id: 'act-research-fellowships', ref: 'CA-0002', title: 'Historiographical Research & Gazetteer Documentation Fellowships' },
    { id: 'act-heritage-tours', ref: 'CA-0003', title: 'Kalinga–Odra–Kolletikota Fort & Temple Heritage Expeditions' },
    { id: 'act-fraternal-forums', ref: 'CA-0004', title: 'Pan-Indian Suryavamsha Odiyaraju / Oad-Rajputh Cultural Integration Forums' }
  ];
  for (const ca of caItems) {
    addRecord({
      newReferenceId: ca.ref,
      previousReferenceId: ca.id,
      englishPageTitle: 'Community Activities',
      contentTitle: ca.title,
      contentCategory: 'Community Activities',
      internalRecordId: ca.id,
      dataSourceFile: 'src/pages/CommunityActivitiesPage.tsx',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: [],
      creationDate: '2026-01-26',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/community-activities?id=${encodeURIComponent(ca.id)}`,
      prefix: 'CA'
    });
  }

  // 23. 3 Events & Notices (EN-0001 .. EN-0003)
  for (const cev of CANONICAL_COMMUNITY_EVENTS) {
    const refId = getReferenceIdByInternalId(cev.id, 'EN');
    addRecord({
      newReferenceId: refId,
      previousReferenceId: cev.id,
      englishPageTitle: 'Events & Notices',
      contentTitle: `${cev.title} (${cev.date_text})`,
      contentCategory: 'Events & Notices',
      internalRecordId: cev.id,
      dataSourceFile: 'src/data/archivalSeedData.ts',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: [],
      creationDate: '2026-01-26',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: `/events?id=${encodeURIComponent(cev.id)}`,
      prefix: 'EN'
    });
  }

  // 24. 38 Website Pages & 7 Category Landing Hubs (WP-0001 .. WP-0038)
  const wpItems: Array<{ id: string; ref: string; title: string; route: string }> = [
    { id: 'page_home', ref: 'WP-0001', title: 'Home — Suryavamsha Odiyaraju Kshatriya Historical Heritage Portal', route: '/' },
    { id: 'page_about', ref: 'WP-0002', title: 'About Project — Epistemic Methodology & Archival Mission', route: '/about' },
    { id: 'page_documentary', ref: 'WP-0003', title: 'Historical Documentary & Research Index', route: '/documentary' },
    { id: 'page_odra_desha', ref: 'WP-0004', title: 'Odra Desha — Historical Geography & Territorial Evolution', route: '/odra-desha' },
    { id: 'page_kalinga_war', ref: 'WP-0005', title: 'The Kalinga War (261 BCE) — Dhauli & Jaugada Epigraphic Dossier', route: '/kalinga-war' },
    { id: 'page_gajapathi_kings', ref: 'WP-0006', title: 'Royal Dynasties & Suryavamsha Gajapathi Empire', route: '/gajapathi-kings' },
    { id: 'page_kings_queens', ref: 'WP-0007', title: 'Historical Figures — Documented Monarchs, Progenitors & Sacred Guardians', route: '/kings-queens' },
    { id: 'page_community_prominent_persons', ref: 'WP-0008', title: 'Community Prominent Persons Directory', route: '/community-prominent-persons' },
    { id: 'page_genealogy', ref: 'WP-0009', title: 'Royal Genealogy & Epistemic Verification Matrix', route: '/genealogy' },
    { id: 'page_maps', ref: 'WP-0010', title: 'Kingdoms & Maps — Strategic Citadels & Geopolitical Corridors', route: '/maps' },
    { id: 'page_timeline', ref: 'WP-0011', title: 'Historical Timeline — 8-Stage Mythology to History Chronology', route: '/timeline' },
    { id: 'page_inscriptions', ref: 'WP-0012', title: 'Inscriptions & Archaeology — Stone Edicts & Copper-Plate Grants', route: '/inscriptions' },
    { id: 'page_temples_monuments', ref: 'WP-0013', title: 'Temples & Monuments — Sacred Kalinga Architecture & Fortresses', route: '/temples-monuments' },
    { id: 'page_documents', ref: 'WP-0014', title: 'Digitized Historical Documents & Royal Chronicles', route: '/documents' },
    { id: 'page_research', ref: 'WP-0015', title: 'Research Articles & Peer-Reviewed Historical Monographs', route: '/research' },
    { id: 'page_gallery', ref: 'WP-0016', title: 'Historical Gallery — Visual Archive & Provenance Index', route: '/gallery' },
    { id: 'page_culture_traditions', ref: 'WP-0017', title: 'Culture & Traditions — Kshatriya Dharma & Sacred Festivals', route: '/culture-traditions' },
    { id: 'page_literature', ref: 'WP-0018', title: 'Literature & Publications — Classical Texts & Royal Patronage', route: '/literature' },
    { id: 'page_references', ref: 'WP-0019', title: 'Historical References — Epigraphia Indica, ASI Reports & Bibliography', route: '/references' },
    { id: 'page_community_heritage', ref: 'WP-0020', title: 'Community Heritage — 16-Branch Directory, 9 Professions & 76 References', route: '/community-heritage' },
    { id: 'page_community_surnames_south', ref: 'WP-0021', title: 'Community Surnames [South-Indian-Oad-Community] (260 Surnames)', route: '/community-surnames' },
    { id: 'page_community_surnames_north', ref: 'WP-0022', title: 'Community Surnames [North-Indian-Oad-Community] (90 Gotras & Surnames)', route: '/community-surnames-north-indian-oad-community' },
    { id: 'page_community_activities', ref: 'WP-0023', title: 'Community Activities — Preservation & Educational Programs', route: '/community-activities' },
    { id: 'page_events', ref: 'WP-0024', title: 'Events & Notices — Symposiums & Community Gatherings', route: '/events' },
    { id: 'page_directory', ref: 'WP-0025', title: 'Community Directory — Public Member Registry', route: '/directory' },
    { id: 'page_register', ref: 'WP-0026', title: 'Register Account — Community Member Enrollment', route: '/register' },
    { id: 'page_login', ref: 'WP-0027', title: 'Member Login — Portal Authentication', route: '/login' },
    { id: 'page_password_recovery', ref: 'WP-0028', title: 'Password Recovery — Account Security', route: '/password-recovery' },
    { id: 'page_dashboard', ref: 'WP-0029', title: 'Member Dashboard — Contributor Workspace', route: '/dashboard' },
    { id: 'page_submit_research', ref: 'WP-0030', title: 'Submit Research — Archival Contribution Portal', route: '/submit-research' },
    { id: 'page_admin', ref: 'WP-0031', title: 'Admin Panel — Editorial & Global Reference ID Registry Management', route: '/admin' },
    { id: 'cat_historical_timeline', ref: 'WP-0032', title: 'Category 1 Hub: Historical Timeline', route: '/timeline' },
    { id: 'cat_inscriptions_archaeology', ref: 'WP-0033', title: 'Category 2 Hub: Inscriptions & Archaeology', route: '/inscriptions' },
    { id: 'cat_royal_dynasties', ref: 'WP-0034', title: 'Category 3 Hub: Royal Dynasties', route: '/gajapathi-kings' },
    { id: 'cat_kingdoms_maps', ref: 'WP-0035', title: 'Category 4 Hub: Kingdoms & Maps', route: '/maps' },
    { id: 'cat_historical_documentary', ref: 'WP-0036', title: 'Category 5 Hub: Historical Documentary', route: '/documentary' },
    { id: 'cat_historical_gallery', ref: 'WP-0037', title: 'Category 6 Hub: Historical Gallery', route: '/gallery' },
    { id: 'cat_historical_figures', ref: 'WP-0038', title: 'Category 7 Hub: Historical Figures', route: '/kings-queens' },
    { id: 'page_website_directory', ref: 'WP-0039', title: 'Website Page Directory — Complete Website Pages, Links & Navigation Index', route: '/page-directory' }
  ];
  for (const wp of wpItems) {
    addRecord({
      newReferenceId: wp.ref,
      previousReferenceId: wp.id,
      englishPageTitle: wp.title,
      contentTitle: wp.title,
      contentCategory: 'Website Pages & Category Hubs',
      internalRecordId: wp.id,
      dataSourceFile: 'src/App.tsx',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      relatedContentIds: [],
      creationDate: '2026-01-15',
      lastUpdatedDate: '2026-11-11',
      recordStatus: 'Active & Verified',
      canonicalRoute: wp.route,
      prefix: 'WP'
    });
  }

  _cachedMasterRegistry = records;
  return records;
}

/**
 * Looks up a GlobalReferenceRecord by its new Reference ID, previous Reference ID, or internal ID.
 */
export function getRecordByReferenceId(queryId: string | null | undefined): GlobalReferenceRecord | undefined {
  if (!queryId) return undefined;
  const norm = queryId.trim().toUpperCase();
  const raw = queryId.trim();
  const registry = getGlobalContentReferenceRegistry();
  return registry.find(
    r =>
      r.newReferenceId.toUpperCase() === norm ||
      (r.previousReferenceId && r.previousReferenceId.toUpperCase() === norm) ||
      r.internalRecordId === raw ||
      r.internalRecordId.toLowerCase() === raw.toLowerCase()
  );
}

/**
 * Searches the Global Content Reference Registry by Reference ID, Content Title,
 * Internal ID, English Page Title, or Category Prefix.
 */
export function searchGlobalReferenceRegistry(
  query: string,
  prefixFilter: 'ALL' | ReferencePrefixCode = 'ALL'
): GlobalReferenceRecord[] {
  const registry = getGlobalContentReferenceRegistry();
  const q = (query || '').trim().toLowerCase();

  return registry.filter(rec => {
    if (prefixFilter !== 'ALL' && rec.prefix !== prefixFilter) {
      return false;
    }
    if (!q) return true;
    return (
      rec.newReferenceId.toLowerCase().includes(q) ||
      (rec.previousReferenceId && rec.previousReferenceId.toLowerCase().includes(q)) ||
      (rec.contentTitle || '').toLowerCase().includes(q) ||
      (rec.englishPageTitle || '').toLowerCase().includes(q) ||
      (rec.contentCategory || '').toLowerCase().includes(q) ||
      (rec.internalRecordId || '').toLowerCase().includes(q)
    );
  });
}

export type OrphanedRelationshipCategory =
  | 'relatedContentIds'
  | 'relatedArticleReferences'
  | 'categoryRelationships'
  | 'timelineEventReferences'
  | 'communityReferenceRelationships'
  | 'historicalFigureRelationships';

export interface OrphanedRelationshipFinding {
  category: OrphanedRelationshipCategory;
  sourceRecordId: string;
  sourceReferenceId: string;
  field: string;
  targetReference: string;
  reason: string;
}

export interface GlobalReferenceAuditReport {
  totalRecords: number;
  uniqueReferenceIds: number;
  duplicateIds: string[];
  missingIds: string[];
  invalidPrefixes: Array<{
    internalRecordId: string;
    referenceId: string;
    extractedPrefix: string;
  }>;
  invalidMigrationTargets: Array<{
    sourceKey: string;
    targetRefId: string;
  }>;
  displayToRegistryMismatches: Array<{
    internalRecordId: string;
    registryRefId: string;
    displayRefId: string;
  }>;
  migrationSummary: {
    totalMigrationEntries: number;
    activeLookupEntries: number;
    canonicalInternalIdEntries: number;
    hashBasedLegacyAliases: number;
    historicalInternalAliases: number;
    retiredTimelineAuditNotes: number;
  };
  orphanedRelationships: string[];
  orphanedRelationshipDetails: OrphanedRelationshipFinding[];
  orphanedCountsByCategory: Record<OrphanedRelationshipCategory, number>;
  countsByPrefix: Record<ReferencePrefixCode, number>;
}

/**
 * Diagnostic Audit Function for Phase 5 & Phase 8 Verification.
 * Dynamically calculates all counts and relationship checks from actual project data
 * without hardcoding any empty or successful results.
 */
export function auditGlobalReferenceRegistry(): GlobalReferenceAuditReport {
  const registry = getGlobalContentReferenceRegistry();
  const seenRefIds = new Set<string>();
  const validInternalIds = new Set<string>();
  const duplicateIds: string[] = [];
  const missingIds: string[] = [];
  const invalidPrefixes: Array<{
    internalRecordId: string;
    referenceId: string;
    extractedPrefix: string;
  }> = [];
  const displayToRegistryMismatches: Array<{
    internalRecordId: string;
    registryRefId: string;
    displayRefId: string;
  }> = [];
  const countsByPrefix = {} as Record<ReferencePrefixCode, number>;

  for (const prefixKey of Object.keys(GLOBAL_PREFIX_REGISTRY) as ReferencePrefixCode[]) {
    countsByPrefix[prefixKey] = 0;
  }

  // 1. Validate canonical records, prefixes, uniqueness, and display consistency
  for (const rec of registry) {
    validInternalIds.add(rec.internalRecordId);

    const formatMatch = rec.newReferenceId ? rec.newReferenceId.trim().match(REFERENCE_ID_FORMAT_REGEX) : null;
    if (!formatMatch || formatMatch[2] === '0000') {
      missingIds.push(rec.internalRecordId);
    } else {
      const extractedPrefix = formatMatch[1];
      if (
        !Object.prototype.hasOwnProperty.call(GLOBAL_PREFIX_REGISTRY, extractedPrefix) ||
        extractedPrefix !== rec.prefix
      ) {
        invalidPrefixes.push({
          internalRecordId: rec.internalRecordId,
          referenceId: rec.newReferenceId,
          extractedPrefix
        });
      }
    }

    if (seenRefIds.has(rec.newReferenceId)) {
      duplicateIds.push(rec.newReferenceId);
    }
    seenRefIds.add(rec.newReferenceId);

    if (Object.prototype.hasOwnProperty.call(GLOBAL_PREFIX_REGISTRY, rec.prefix)) {
      countsByPrefix[rec.prefix] = (countsByPrefix[rec.prefix] || 0) + 1;
    }

    const displayedRefId = getPermanentReferenceNumber(rec.internalRecordId);
    if (displayedRefId !== rec.newReferenceId) {
      displayToRegistryMismatches.push({
        internalRecordId: rec.internalRecordId,
        registryRefId: rec.newReferenceId,
        displayRefId: displayedRefId
      });
    }
  }

  // 2. Validate all migration targets against the canonical Reference ID set
  const invalidMigrationTargets: Array<{ sourceKey: string; targetRefId: string }> = [];
  for (const [sourceKey, targetRefId] of Object.entries(OLD_TO_NEW_REFERENCE_ID_MIGRATION_MAP)) {
    if (!seenRefIds.has(targetRefId)) {
      invalidMigrationTargets.push({ sourceKey, targetRefId });
    }
  }

  // Helper to check whether a referenced ID resolves to a canonical record or valid active alias
  const isResolvableReference = (targetId: string | null | undefined): boolean => {
    if (!targetId) return false;
    const trimmed = targetId.trim();
    return (
      validInternalIds.has(trimmed) ||
      seenRefIds.has(trimmed) ||
      Boolean(ACTIVE_CONTENT_MIGRATION_MAP[trimmed])
    );
  };

  const orphanedRelationshipDetails: OrphanedRelationshipFinding[] = [];
  const orphanedCountsByCategory: Record<OrphanedRelationshipCategory, number> = {
    relatedContentIds: 0,
    relatedArticleReferences: 0,
    categoryRelationships: 0,
    timelineEventReferences: 0,
    communityReferenceRelationships: 0,
    historicalFigureRelationships: 0
  };

  const recordOrphan = (finding: OrphanedRelationshipFinding) => {
    orphanedRelationshipDetails.push(finding);
    orphanedCountsByCategory[finding.category] += 1;
  };

  // 3A. Validate `relatedContentIds` on all 692 registry records
  for (const rec of registry) {
    for (const target of rec.relatedContentIds) {
      if (!isResolvableReference(target)) {
        recordOrphan({
          category: 'relatedContentIds',
          sourceRecordId: rec.internalRecordId,
          sourceReferenceId: rec.newReferenceId,
          field: 'GlobalReferenceRecord.relatedContentIds',
          targetReference: target,
          reason: 'Target string does not match any canonical internalRecordId, Reference ID, or active alias in the 692-record registry.'
        });
      }
    }
  }

  // 3B. Validate Related Article References (ARTICLE_STRUCTURED_METADATA_MAP, COMMUNITY_HERITAGE_DETAILED_ARTICLES, SYNONYM_COMPREHENSIVE_MONOGRAPHS)
  for (const [articleId, meta] of Object.entries(ARTICLE_STRUCTURED_METADATA_MAP)) {
    const sourceRefId = getPermanentReferenceNumber(articleId);
    for (const relArtId of meta.relatedArticleIds || []) {
      if (!isResolvableReference(relArtId)) {
        recordOrphan({
          category: 'relatedArticleReferences',
          sourceRecordId: articleId,
          sourceReferenceId: sourceRefId,
          field: 'ArticleStructuredMetadata.relatedArticleIds',
          targetReference: relArtId,
          reason: 'Referenced related article ID is missing from the canonical registry.'
        });
      }
    }
    for (const relFigId of meta.relatedFigureIds || []) {
      if (!isResolvableReference(relFigId)) {
        recordOrphan({
          category: 'relatedArticleReferences',
          sourceRecordId: articleId,
          sourceReferenceId: sourceRefId,
          field: 'ArticleStructuredMetadata.relatedFigureIds',
          targetReference: relFigId,
          reason: 'Referenced historical figure ID in article metadata is missing from the canonical registry.'
        });
      }
    }
  }

  for (const [itemId, detail] of Object.entries(COMMUNITY_HERITAGE_DETAILED_ARTICLES)) {
    const sourceRefId = getPermanentReferenceNumber(itemId);
    for (const relId of detail.relatedArticleIds || []) {
      if (!isResolvableReference(relId)) {
        recordOrphan({
          category: 'relatedArticleReferences',
          sourceRecordId: itemId,
          sourceReferenceId: sourceRefId,
          field: 'CommunityHeritageDetailedArticle.relatedArticleIds',
          targetReference: relId,
          reason: 'Referenced community heritage article ID is missing from the canonical registry.'
        });
      }
    }
  }

  for (const [synId, mono] of Object.entries(SYNONYM_COMPREHENSIVE_MONOGRAPHS)) {
    const sourceRefId = getPermanentReferenceNumber(synId);
    for (const relId of mono.relatedArticleIds || []) {
      if (!isResolvableReference(relId)) {
        recordOrphan({
          category: 'relatedArticleReferences',
          sourceRecordId: synId,
          sourceReferenceId: sourceRefId,
          field: 'SynonymComprehensiveMonograph.relatedArticleIds',
          targetReference: relId,
          reason: 'Referenced synonym monograph article ID is missing from the canonical registry.'
        });
      }
    }
  }

  // 3C. Validate Category Relationships (SEVEN_HISTORICAL_CATEGORIES.featuredArticleIds)
  for (const cat of SEVEN_HISTORICAL_CATEGORIES) {
    const sourceRefId = getPermanentReferenceNumber(cat.id);
    for (const featArtId of cat.featuredArticleIds || []) {
      if (!isResolvableReference(featArtId)) {
        recordOrphan({
          category: 'categoryRelationships',
          sourceRecordId: cat.id,
          sourceReferenceId: sourceRefId,
          field: 'CanonicalHistoricalCategory.featuredArticleIds',
          targetReference: featArtId,
          reason: 'Category featured article ID is missing from the canonical registry.'
        });
      }
    }
  }

  // 3D. Validate Timeline Stage & Event References (MYTHOLOGY_TO_HISTORY_STAGES.linkedArticleIds & linkedEventIds)
  for (const stage of MYTHOLOGY_TO_HISTORY_STAGES) {
    const sourceRefId = getPermanentReferenceNumber(stage.id);
    for (const lArtId of stage.linkedArticleIds || []) {
      if (!isResolvableReference(lArtId)) {
        recordOrphan({
          category: 'timelineEventReferences',
          sourceRecordId: stage.id,
          sourceReferenceId: sourceRefId,
          field: 'ChronologicalEpochStage.linkedArticleIds',
          targetReference: lArtId,
          reason: 'Timeline stage linkedArticleId is missing from the canonical registry.'
        });
      }
    }
    for (const lEvId of stage.linkedEventIds || []) {
      if (!isResolvableReference(lEvId)) {
        recordOrphan({
          category: 'timelineEventReferences',
          sourceRecordId: stage.id,
          sourceReferenceId: sourceRefId,
          field: 'ChronologicalEpochStage.linkedEventIds',
          targetReference: lEvId,
          reason: 'Timeline stage linkedEventId is missing from the canonical registry.'
        });
      }
    }
  }

  // 3E. Validate Community Reference Relationships (MASTER_70_REFERENCE_REGISTRY.relatedHeritageIds & ARTICLE_STRUCTURED_METADATA_MAP.communityCrossReferences)
  for (const ref76 of MASTER_70_REFERENCE_REGISTRY) {
    const sourceRefId = getPermanentReferenceNumber(ref76.id);
    for (const relHerId of ref76.relatedHeritageIds || []) {
      if (!isResolvableReference(relHerId)) {
        recordOrphan({
          category: 'communityReferenceRelationships',
          sourceRecordId: ref76.id,
          sourceReferenceId: sourceRefId,
          field: 'Reference70Entry.relatedHeritageIds',
          targetReference: relHerId,
          reason: 'Community reference relatedHeritageId does not match a canonical internalRecordId (e.g. legacy slug variant).'
        });
      }
    }
  }

  for (const [articleId, meta] of Object.entries(ARTICLE_STRUCTURED_METADATA_MAP)) {
    const sourceRefId = getPermanentReferenceNumber(articleId);
    for (const crossRef of meta.communityCrossReferences || []) {
      if (crossRef.communityId && !isResolvableReference(crossRef.communityId)) {
        recordOrphan({
          category: 'communityReferenceRelationships',
          sourceRecordId: articleId,
          sourceReferenceId: sourceRefId,
          field: 'ArticleStructuredMetadata.communityCrossReferences.communityId',
          targetReference: crossRef.communityId,
          reason: 'Article communityCrossReference communityId does not match a canonical internalRecordId in COMMUNITY_DIRECTORY_ITEMS.'
        });
      }
    }
  }

  // 3F. Validate Historical Figure & Genealogy Relationships (DOCUMENTED_FIGURES_REPO.inscriptions_ids & CANONICAL_GENEALOGY.children)
  for (const fig of DOCUMENTED_FIGURES_REPO) {
    const sourceRefId = getPermanentReferenceNumber(fig.id);
    for (const inscId of fig.inscriptions_ids || []) {
      if (!isResolvableReference(inscId)) {
        recordOrphan({
          category: 'historicalFigureRelationships',
          sourceRecordId: fig.id,
          sourceReferenceId: sourceRefId,
          field: 'DocumentedHistoricalFigure.inscriptions_ids',
          targetReference: inscId,
          reason: 'Figure inscription reference ID is not registered as a standalone canonical inscription record.'
        });
      }
    }
  }

  for (const gen of CANONICAL_GENEALOGY) {
    const sourceRefId = getPermanentReferenceNumber(gen.id);
    for (const childId of gen.children || []) {
      if (!isResolvableReference(childId)) {
        recordOrphan({
          category: 'historicalFigureRelationships',
          sourceRecordId: gen.id,
          sourceReferenceId: sourceRefId,
          field: 'GenealogyNode.children',
          targetReference: childId,
          reason: 'Genealogy child node ID is missing from the canonical registry.'
        });
      }
    }
  }

  const orphanedRelationships = orphanedRelationshipDetails.map(
    item =>
      `[${item.category}] ${item.sourceReferenceId} (${item.sourceRecordId}) -> ${item.field}: "${item.targetReference}"`
  );

  return {
    totalRecords: registry.length,
    uniqueReferenceIds: seenRefIds.size,
    duplicateIds,
    missingIds,
    invalidPrefixes,
    invalidMigrationTargets,
    displayToRegistryMismatches,
    migrationSummary: {
      totalMigrationEntries: Object.keys(OLD_TO_NEW_REFERENCE_ID_MIGRATION_MAP).length,
      activeLookupEntries: Object.keys(ACTIVE_CONTENT_MIGRATION_MAP).length,
      canonicalInternalIdEntries: registry.length,
      hashBasedLegacyAliases: Object.keys(HASH_BASED_LEGACY_REFERENCE_ALIASES).length,
      historicalInternalAliases: Object.keys(HISTORICAL_INTERNAL_ID_ALIASES).length,
      retiredTimelineAuditNotes: Object.keys(RETIRED_TIMELINE_SEQUENCE_AUDIT_NOTES).length
    },
    orphanedRelationships,
    orphanedRelationshipDetails,
    orphanedCountsByCategory,
    countsByPrefix
  };
}
