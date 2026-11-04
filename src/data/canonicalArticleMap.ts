/**
 * Centralized Canonical Article Mapping & Duplicate Consolidation Registry
 * Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal
 *
 * Implements Phase 1–7 of the Website-Wide Duplicate Article Audit, Content Consolidation,
 * and Canonical Full Article Linking architecture.
 */

export interface CanonicalArticleMappingEntry {
  /** Short or duplicate article/item ID */
  duplicateId: string;
  /** Short or duplicate article title */
  duplicateTitle: string;
  /** Original route or URL pattern of the short/duplicate entry */
  duplicateUrl: string;
  /** Category of the duplicate entry */
  duplicateCategory: 'Monograph Chapter Summary' | 'Community Synonym Summary' | 'Historical Personage Summary' | 'Legacy Article Alias';
  /** Matched comprehensive canonical article/dossier ID */
  canonicalId: string;
  /** Matched comprehensive canonical article/dossier title */
  canonicalTitle: string;
  /** Canonical full article route/URL */
  canonicalUrl: string;
  /** Matching confidence based on subject, person, dynasty, location, chronology, and references */
  confidence: 'High (100% Exact Subject & Epigraphic Match)' | 'High (98% Direct Chronological & Subject Match)' | 'Manual Review (Distinct Regional / Lineage Designation Preserved)';
  /** Action taken during consolidation */
  actionTaken: 'Consolidated & Redirected to Canonical Full Article' | 'Preserved as Distinct Entry (No Consolidation)';
  /** Brief scholarly verification note */
  verificationNote: string;
}

/**
 * 1. Short Monograph Section IDs (`/community-heritage?tab=history`, `HISTORICAL_MONOGRAPH_SECTIONS`)
 *    mapped to their Comprehensive Full Articles in `CANONICAL_ARTICLES` (`/documentary?article=<id>`).
 */
export const MONO_SECTION_TO_CANONICAL_ARTICLE_MAP: Record<string, string> = {
  mono_part_1_primordial: 'art_surya_vamsa_sagara_rama',
  mono_part_2_kharavela: 'art_epigraphic_evolution_odra',
  mono_part_3_synonyms: 'art_oad_rajputh_od_history',
  mono_part_4_jasma_siddharama: 'art_oad_rajputh_od_history',
  mono_part_5_gajapathi_diaspora: 'art_gajapathi_kapilendra',
  mono_part_6_geographical_map: 'art_oad_rajputh_od_history',
  mono_part_7_kolletikota: 'art_kolletikota_peddintlamma_lake',
  mono_part_8_epigraphic_evolution: 'art_epigraphic_evolution_odra',
};

/**
 * 2. Short Community Synonym IDs (`COMMUNITY_SYNONYMS` in `/community-heritage?tab=synonyms`)
 *    that are exact duplicates of Comprehensive 11-Section Directory Articles (`COMMUNITY_DIRECTORY_ITEMS` /
 *    `COMMUNITY_HERITAGE_DETAILED_ARTICLES`).
 *
 *    Note:
 *    - `syn_odde_vadde` and `syn_odderajulu` already possess full 9-chapter monographs in
 *      `SYNONYM_COMPREHENSIVE_MONOGRAPHS` and are preserved as comprehensive articles.
 *    - 7 distinct regional/lineage designations (`syn_suryavamshi`, `syn_sagaravamshi`, `syn_raghuvamshi`,
 *      `syn_odisha_kshatriya`, `syn_odiyaraju_karnataka`, `syn_ottar`, `syn_odda_nayakkar_tn`) cover distinct
 *      lineages or regional nomenclature without a 1:1 duplicate in `comm_dir_*` and are preserved unchanged.
 */
export const DUP_SYNONYM_TO_CANONICAL_DIR_MAP: Record<string, string> = {
  syn_od_oad_odra: 'comm_dir_01_od',
  syn_oad_rajputh: 'comm_dir_02_od_rajputh',
  syn_od_kshatriya: 'comm_dir_03_odra_kshatriya',
  syn_waddar_vaddar: 'comm_dir_15_voddar',
  syn_oddar: 'comm_dir_16_oddaru',
  syn_vadde_gajapathirajulu: 'comm_dir_14_gajapathulu',
};

/** Set of short duplicate synonym IDs removed from active duplicate listing cards */
export const CONSOLIDATED_SHORT_SYNONYM_IDS = new Set<string>(
  Object.keys(DUP_SYNONYM_TO_CANONICAL_DIR_MAP)
);

/**
 * 3. Legacy / Alias Article IDs mapped to their authoritative `CANONICAL_ARTICLES` ID.
 */
export const LEGACY_ARTICLE_ID_ALIASES: Record<string, string> = {
  art_kolletikota_gajapathi_forts: 'art_kolletikota_peddintlamma_lake',
  art_kolletikota_sacred_citadel: 'art_kolletikota_peddintlamma_lake',
  art_oad_rajputh_history: 'art_oad_rajputh_od_history',
  art_suryavamsha_lineage: 'art_surya_vamsa_sagara_rama',
  art_epigraphic_tradition_odra: 'art_epigraphic_evolution_odra',
  art_odra_migration_south: 'art_oad_rajputh_od_history',
  curated_kalinga_war_261bce: 'art_odra_desha_history',
  ...MONO_SECTION_TO_CANONICAL_ARTICLE_MAP,
};

/**
 * 4. Short Heritage Progenitor Cards (`HISTORICAL_FIGURES` in `/community-heritage?tab=figures` or `/historical-persons`)
 *    mapped to their Comprehensive 10-Section Biographical Dossiers in `DOCUMENTED_FIGURES_REPO` (`/kings-queens?figure=<id>`).
 */
export const HERITAGE_FIGURE_TO_CANONICAL_BIO_MAP: Record<string, string> = {
  fig_samrat_sagara: 'fig_samrat_sagara',
  fig_maharshi_bhagiratha: 'fig_maharshi_bhagiratha',
  fig_sri_rama: 'fig_sri_rama',
  fig_king_kharavela: 'fig_king_kharavela',
  fig_goddess_jasma: 'fig_goddess_jasma',
  fig_shivayogi_siddharama: 'fig_shivayogi_siddharama',
  fig_kolletikota_peddintlamma: 'fig_kolletikota_peddintlamma',
};

/**
 * 5. Cross-Collection Personage Deduplication Map (`PROMINENT_PERSONS` ID -> `DOCUMENTED_FIGURES_REPO` ID)
 *    Used by the global search engine so searching for a monarch/progenitor returns the canonical
 *    comprehensive biographical dossier first without redundant duplicate cards.
 */
export const PROMINENT_PERSON_TO_CANONICAL_FIGURE_MAP: Record<string, string> = {
  sagara_chakravarti: 'fig_samrat_sagara',
  maharshi_bhagiratha: 'fig_maharshi_bhagiratha',
  bhagavan_sri_rama: 'fig_sri_rama',
  emperor_kharavela: 'fig_king_kharavela',
  mata_jasma_devi: 'fig_goddess_jasma',
  shivayogi_siddharameshwara: 'fig_shivayogi_siddharama',
  kolletikota_peddintlamma: 'fig_kolletikota_peddintlamma',
  kapilendra_deva: 'fig_kapilendra_deva',
  purushottama_deva: 'fig_purushottama_deva',
  prataparudra_deva: 'fig_prataparudra_deva',
  anantavarman_chodaganga: 'fig_chodaganga_deva',
  narasimha_deva_i: 'fig_langula_narasimha',
  mukunda_deva: 'fig_mukunda_deva',
  hamvira_deva: 'fig_hamvira_deva',
};

/**
 * Resolves any article ID, legacy alias, or short monograph section ID to its canonical full article ID.
 */
export function resolveCanonicalArticleId(idOrSlug: string | null | undefined): string {
  if (!idOrSlug) return '';
  const trimmed = idOrSlug.trim();
  if (LEGACY_ARTICLE_ID_ALIASES[trimmed]) {
    return LEGACY_ARTICLE_ID_ALIASES[trimmed];
  }
  return trimmed;
}

/**
 * Resolves any community synonym or directory ID to its canonical 11-section directory article ID
 * (if it is one of the 6 consolidated duplicate synonyms).
 */
export function resolveCanonicalSynonymId(id: string | null | undefined): string {
  if (!id) return '';
  const trimmed = id.trim();
  if (DUP_SYNONYM_TO_CANONICAL_DIR_MAP[trimmed]) {
    return DUP_SYNONYM_TO_CANONICAL_DIR_MAP[trimmed];
  }
  return trimmed;
}

/**
 * Resolves a route path and optional item ID into its canonical destination route & ID.
 */
export function resolveCanonicalNavigationTarget(rawUrl: string): string {
  if (!rawUrl) return '/';
  try {
    const dummyOrigin = 'https://suryavamsha.org';
    const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `${dummyOrigin}${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`);
    const pathname = parsed.pathname;

    // 1. Documentary or Research article links with legacy/short article IDs
    if (pathname === '/documentary' || pathname === '/research' || pathname === '/articles') {
      const articleParam = parsed.searchParams.get('article') || parsed.searchParams.get('id');
      if (articleParam) {
        const canonicalArtId = resolveCanonicalArticleId(articleParam);
        return `/documentary?article=${encodeURIComponent(canonicalArtId)}`;
      }
      return pathname;
    }

    // 2. Community Heritage tab links with short monograph or duplicate synonym IDs
    if (pathname === '/community-heritage' || pathname === '/historical-records' || pathname === '/historical-persons') {
      const tabParam = parsed.searchParams.get('tab');
      const idParam = parsed.searchParams.get('id') || parsed.searchParams.get('figure');

      // Short monograph chapter -> Canonical full documentary article
      if (idParam && MONO_SECTION_TO_CANONICAL_ARTICLE_MAP[idParam]) {
        const canonicalArtId = MONO_SECTION_TO_CANONICAL_ARTICLE_MAP[idParam];
        return `/documentary?article=${encodeURIComponent(canonicalArtId)}`;
      }

      // Short duplicate synonym -> Canonical 11-section directory article
      if (idParam && DUP_SYNONYM_TO_CANONICAL_DIR_MAP[idParam]) {
        const canonicalDirId = DUP_SYNONYM_TO_CANONICAL_DIR_MAP[idParam];
        return `/community-heritage?tab=synonyms&id=${encodeURIComponent(canonicalDirId)}`;
      }

      // Short historical figure card -> Canonical 10-section biography page in /kings-queens
      if (
        (pathname === '/historical-persons' || tabParam === 'figures') &&
        idParam &&
        HERITAGE_FIGURE_TO_CANONICAL_BIO_MAP[idParam]
      ) {
        return `/kings-queens?figure=${encodeURIComponent(HERITAGE_FIGURE_TO_CANONICAL_BIO_MAP[idParam])}`;
      }
    }

    return `${pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return rawUrl;
  }
}

/**
 * Complete Audit & Mapping Report Table (Phase 7 Deliverable)
 */
export const CANONICAL_AUDIT_REPORT_ENTRIES: CanonicalArticleMappingEntry[] = [
  // Group A: 8 Short Monograph Section Cards -> Canonical Full Documentary Monographs
  {
    duplicateId: 'mono_part_1_primordial',
    duplicateTitle: 'Part 1: Primordial Foundations in the Solar Race (Suryavamsha)',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_1_primordial',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_surya_vamsa_sagara_rama',
    canonicalTitle: 'Suryavamsha Antiquity: From Samrat Sagara and Bhagiratha to Emperor Kharavela and Sri Rama',
    canonicalUrl: '/documentary?article=art_surya_vamsa_sagara_rama',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on Ikshvaku-Sagara-Bhagiratha-Rama solar genealogy, Purana citations, and hydrological engineering.',
  },
  {
    duplicateId: 'mono_part_2_kharavela',
    duplicateTitle: 'Part 2: Emperor Kharavela and Ancient Kalinga-Odra Epigraphy',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_2_kharavela',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_epigraphic_evolution_odra',
    canonicalTitle: 'Epigraphic Evolution of the Odra-Kalinga Identity: Hathigumpha to Gajapathi Copper Plates',
    canonicalUrl: '/documentary?article=art_epigraphic_evolution_odra',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on Hathigumpha 17-line Prakrit inscription (Udayagiri, c. 1st Century BCE) and Kalinga-Odra military records.',
  },
  {
    duplicateId: 'mono_part_3_synonyms',
    duplicateTitle: 'Part 3: Linguistic Evolution of Synonyms across Indian Regions',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_3_synonyms',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_oad_rajputh_od_history',
    canonicalTitle: 'Oad-Rajputh, Od, Odra, Odiyaraju & Vadde: Pan-Indian Ethnographic & Epigraphic Synthesis',
    canonicalUrl: '/documentary?article=art_oad_rajputh_od_history',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on Indo-Aryan and Dravidian phonetic shifts (Udra -> Odra -> Oad -> Odde -> Vadde -> Odiyaraju).',
  },
  {
    duplicateId: 'mono_part_4_jasma_siddharama',
    duplicateTitle: 'Part 4: Sacred Protectors: Goddess Jasma Odan & Shivayogi Siddharameshwara',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_4_jasma_siddharama',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_oad_rajputh_od_history',
    canonicalTitle: 'Oad-Rajputh, Od, Odra, Odiyaraju & Vadde: Pan-Indian Ethnographic & Epigraphic Synthesis',
    canonicalUrl: '/documentary?article=art_oad_rajputh_od_history',
    confidence: 'High (98% Direct Chronological & Subject Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on 12th-century Solanki Gujarat (Rani Jasma Devi) and Kalyani Chalukya Solapur (Shivayogi Siddharameshwara) chapters.',
  },
  {
    duplicateId: 'mono_part_5_gajapathi_diaspora',
    duplicateTitle: 'Part 5: Gajapathi Imperial Corridors & Southern Migration',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_5_gajapathi_diaspora',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_gajapathi_kapilendra',
    canonicalTitle: 'Suryavamsha Gajapathi Empire: Emperor Kapilendra Deva and the Southern Campaigns',
    canonicalUrl: '/documentary?article=art_gajapathi_kapilendra',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on 1434–1541 CE Gajapathi campaigns from Mahanadi to Kaveri, Udayagiri, Kondapalli, and Kondavidu garrisons.',
  },
  {
    duplicateId: 'mono_part_6_geographical_map',
    duplicateTitle: 'Part 6: Pan-Indian Geographic Synthesis & Modern Heritage',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_6_geographical_map',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_oad_rajputh_od_history',
    canonicalTitle: 'Oad-Rajputh, Od, Odra, Odiyaraju & Vadde: Pan-Indian Ethnographic & Epigraphic Synthesis',
    canonicalUrl: '/documentary?article=art_oad_rajputh_od_history',
    confidence: 'High (98% Direct Chronological & Subject Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on pan-Indian state-by-state demographic distribution and imperial census classifications.',
  },
  {
    duplicateId: 'mono_part_7_kolletikota',
    duplicateTitle: 'Part 7: Kolletikota Peddintlamma Thalli & The Aquatic Fortress of Kolleti Sarasu',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_7_kolletikota',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_kolletikota_peddintlamma_lake',
    canonicalTitle: 'Kolletikota Peddintlamma & The Jaladurga Aquatic Citadel of Kolleru Lake',
    canonicalUrl: '/documentary?article=art_kolletikota_peddintlamma_lake',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Matched on Kolleru Lake Jaladurga fort, Gajapathi General Ambadeva Rayer, and Sri Peddintlamma Thalli.',
  },
  {
    duplicateId: 'mono_part_8_epigraphic_evolution',
    duplicateTitle: 'Part 8: Epigraphic Evolution of the Odra Identity: From Ancient Prakrit Edicts to Gajapathi Copper Plates',
    duplicateUrl: '/community-heritage?tab=history&id=mono_part_8_epigraphic_evolution',
    duplicateCategory: 'Monograph Chapter Summary',
    canonicalId: 'art_epigraphic_evolution_odra',
    canonicalTitle: 'Epigraphic Evolution of the Odra-Kalinga Identity: Hathigumpha to Gajapathi Copper Plates',
    canonicalUrl: '/documentary?article=art_epigraphic_evolution_odra',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Exact 1:1 title, subject, and epigraphic corpus match with canonical article art_epigraphic_evolution_odra.',
  },

  // Group B: 6 Short Duplicate Community Synonym Entries -> Canonical 11-Section Directory Articles
  {
    duplicateId: 'syn_od_oad_odra',
    duplicateTitle: 'Od / Oad / Odra (Short Synonym Card)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_od_oad_odra',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'comm_dir_01_od',
    canonicalTitle: '#1 Od — Comprehensive 11-Section Historical & Epigraphic Dossier',
    canonicalUrl: '/community-heritage?tab=synonyms&id=comm_dir_01_od',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: '167-char summary card consolidated into the 11-section comprehensive dossier comm_dir_01_od.',
  },
  {
    duplicateId: 'syn_oad_rajputh',
    duplicateTitle: 'Oad-Rajputh / Oad-Rajput (Short Synonym Card)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_oad_rajputh',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'comm_dir_02_od_rajputh',
    canonicalTitle: '#2 Od-Rajputh — Comprehensive 11-Section Historical & Epigraphic Dossier',
    canonicalUrl: '/community-heritage?tab=synonyms&id=comm_dir_02_od_rajputh',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: '178-char summary card consolidated into the 11-section comprehensive dossier comm_dir_02_od_rajputh.',
  },
  {
    duplicateId: 'syn_od_kshatriya',
    duplicateTitle: 'Od-Kshatriya / Odra Kshatriya (Short Synonym Card)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_od_kshatriya',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'comm_dir_03_odra_kshatriya',
    canonicalTitle: '#3 Odra-Kshatriya — Comprehensive 11-Section Historical & Epigraphic Dossier',
    canonicalUrl: '/community-heritage?tab=synonyms&id=comm_dir_03_odra_kshatriya',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: '175-char summary card consolidated into the 11-section comprehensive dossier comm_dir_03_odra_kshatriya.',
  },
  {
    duplicateId: 'syn_waddar_vaddar',
    duplicateTitle: 'Waddar / Vaddar (Short Synonym Card)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_waddar_vaddar',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'comm_dir_15_voddar',
    canonicalTitle: '#15 Voddar (Waddar / Vaddar) — Comprehensive 11-Section Historical & Epigraphic Dossier',
    canonicalUrl: '/community-heritage?tab=synonyms&id=comm_dir_15_voddar',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: '175-char summary card consolidated into the 11-section comprehensive dossier comm_dir_15_voddar.',
  },
  {
    duplicateId: 'syn_oddar',
    duplicateTitle: 'Oddar (Short Synonym Card)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_oddar',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'comm_dir_16_oddaru',
    canonicalTitle: '#16 Oddaru (Oddar) — Comprehensive 11-Section Historical & Epigraphic Dossier',
    canonicalUrl: '/community-heritage?tab=synonyms&id=comm_dir_16_oddaru',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: '159-char summary card consolidated into the 11-section comprehensive dossier comm_dir_16_oddaru.',
  },
  {
    duplicateId: 'syn_vadde_gajapathirajulu',
    duplicateTitle: 'Vadde-GajapathiRajulu (Short Synonym Card)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_vadde_gajapathirajulu',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'comm_dir_14_gajapathulu',
    canonicalTitle: '#14 Gajapathulu (Vadde-GajapathiRajulu) — Comprehensive 11-Section Historical & Epigraphic Dossier',
    canonicalUrl: '/community-heritage?tab=synonyms&id=comm_dir_14_gajapathulu',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: '268-char summary card consolidated into the 11-section comprehensive dossier comm_dir_14_gajapathulu.',
  },

  // Group C: 7 Short Historical Progenitor Modal Cards -> Canonical 10-Section Biographical Dossiers
  {
    duplicateId: 'fig_samrat_sagara (Heritage Summary Card)',
    duplicateTitle: 'Chakravarti Samrat Sagara (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_samrat_sagara',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_samrat_sagara',
    canonicalTitle: 'Chakravarti Samrat Sagara — Complete 10-Section Sovereign Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_samrat_sagara',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },
  {
    duplicateId: 'fig_maharshi_bhagiratha (Heritage Summary Card)',
    duplicateTitle: 'Maharshi King Bhagiratha (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_maharshi_bhagiratha',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_maharshi_bhagiratha',
    canonicalTitle: 'Maharshi King Bhagiratha — Complete 10-Section Sovereign Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_maharshi_bhagiratha',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },
  {
    duplicateId: 'fig_sri_rama (Heritage Summary Card)',
    duplicateTitle: 'Bhagavan Sri Ramachandra (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_sri_rama',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_sri_rama',
    canonicalTitle: 'Bhagavan Sri Ramachandra — Complete 10-Section Sovereign Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_sri_rama',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },
  {
    duplicateId: 'fig_king_kharavela (Heritage Summary Card)',
    duplicateTitle: 'Mahameghavahana Emperor Kharavela (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_king_kharavela',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_king_kharavela',
    canonicalTitle: 'Mahameghavahana Emperor Kharavela — Complete 10-Section Sovereign Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_king_kharavela',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },
  {
    duplicateId: 'fig_goddess_jasma (Heritage Summary Card)',
    duplicateTitle: 'Veerangana Rani Jasma Devi (Jasma Odan) (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_goddess_jasma',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_goddess_jasma',
    canonicalTitle: 'Veerangana Rani Jasma Devi (Jasma Odan) — Complete 10-Section Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_goddess_jasma',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },
  {
    duplicateId: 'fig_shivayogi_siddharama (Heritage Summary Card)',
    duplicateTitle: 'Karmayogi Shivayogi Siddharameshwara (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_shivayogi_siddharama',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_shivayogi_siddharama',
    canonicalTitle: 'Karmayogi Shivayogi Siddharameshwara — Complete 10-Section Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_shivayogi_siddharama',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },
  {
    duplicateId: 'fig_kolletikota_peddintlamma (Heritage Summary Card)',
    duplicateTitle: 'Sri Kolletikota Peddintlamma Thalli (Short Modal Bio)',
    duplicateUrl: '/community-heritage?tab=figures&id=fig_kolletikota_peddintlamma',
    duplicateCategory: 'Historical Personage Summary',
    canonicalId: 'fig_kolletikota_peddintlamma',
    canonicalTitle: 'Sri Kolletikota Peddintlamma Thalli — Complete 10-Section Biographical Dossier',
    canonicalUrl: '/kings-queens?figure=fig_kolletikota_peddintlamma',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Linked short modal card directly to the 10-section canonical biographical dossier in /kings-queens.',
  },

  // Group D: 6 Legacy Article IDs / Cross-Reference Aliases
  {
    duplicateId: 'art_epigraphic_tradition_odra',
    duplicateTitle: 'Epigraphic Tradition of Odra (Legacy Related-Article Link)',
    duplicateUrl: '/documentary?article=art_epigraphic_tradition_odra',
    duplicateCategory: 'Legacy Article Alias',
    canonicalId: 'art_epigraphic_evolution_odra',
    canonicalTitle: 'Epigraphic Evolution of the Odra-Kalinga Identity: Hathigumpha to Gajapathi Copper Plates',
    canonicalUrl: '/documentary?article=art_epigraphic_evolution_odra',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Resolved legacy related-article reference in KingsQueensPage to canonical art_epigraphic_evolution_odra.',
  },
  {
    duplicateId: 'art_odra_migration_south',
    duplicateTitle: 'Odra Southern Migration (Legacy Related-Article Link)',
    duplicateUrl: '/documentary?article=art_odra_migration_south',
    duplicateCategory: 'Legacy Article Alias',
    canonicalId: 'art_oad_rajputh_od_history',
    canonicalTitle: 'Oad-Rajputh, Od, Odra, Odiyaraju & Vadde: Pan-Indian Ethnographic & Epigraphic Synthesis',
    canonicalUrl: '/documentary?article=art_oad_rajputh_od_history',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Resolved legacy migration reference to canonical art_oad_rajputh_od_history.',
  },
  {
    duplicateId: 'art_kolletikota_gajapathi_forts',
    duplicateTitle: 'Kolletikota & Gajapathi Forts (Legacy Slug)',
    duplicateUrl: '/documentary?article=art_kolletikota_gajapathi_forts',
    duplicateCategory: 'Legacy Article Alias',
    canonicalId: 'art_kolletikota_peddintlamma_lake',
    canonicalTitle: 'Kolletikota Peddintlamma & The Jaladurga Aquatic Citadel of Kolleru Lake',
    canonicalUrl: '/documentary?article=art_kolletikota_peddintlamma_lake',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Redirected legacy Kolletikota slug to canonical full article.',
  },
  {
    duplicateId: 'art_kolletikota_sacred_citadel',
    duplicateTitle: 'Kolletikota Sacred Citadel (Legacy Slug)',
    duplicateUrl: '/documentary?article=art_kolletikota_sacred_citadel',
    duplicateCategory: 'Legacy Article Alias',
    canonicalId: 'art_kolletikota_peddintlamma_lake',
    canonicalTitle: 'Kolletikota Peddintlamma & The Jaladurga Aquatic Citadel of Kolleru Lake',
    canonicalUrl: '/documentary?article=art_kolletikota_peddintlamma_lake',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Redirected legacy Kolletikota citadel slug to canonical full article.',
  },
  {
    duplicateId: 'art_oad_rajputh_history',
    duplicateTitle: 'Oad-Rajputh History (Legacy Slug)',
    duplicateUrl: '/documentary?article=art_oad_rajputh_history',
    duplicateCategory: 'Legacy Article Alias',
    canonicalId: 'art_oad_rajputh_od_history',
    canonicalTitle: 'Oad-Rajputh, Od, Odra, Odiyaraju & Vadde: Pan-Indian Ethnographic & Epigraphic Synthesis',
    canonicalUrl: '/documentary?article=art_oad_rajputh_od_history',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Redirected legacy Oad-Rajputh slug to canonical full article.',
  },
  {
    duplicateId: 'art_suryavamsha_lineage',
    duplicateTitle: 'Suryavamsha Lineage (Legacy Slug)',
    duplicateUrl: '/documentary?article=art_suryavamsha_lineage',
    duplicateCategory: 'Legacy Article Alias',
    canonicalId: 'art_surya_vamsa_sagara_rama',
    canonicalTitle: 'Suryavamsha Antiquity: From Samrat Sagara and Bhagiratha to Emperor Kharavela and Sri Rama',
    canonicalUrl: '/documentary?article=art_surya_vamsa_sagara_rama',
    confidence: 'High (100% Exact Subject & Epigraphic Match)',
    actionTaken: 'Consolidated & Redirected to Canonical Full Article',
    verificationNote: 'Redirected legacy Suryavamsha slug to canonical full article.',
  },

  // Group E: 7 Distinct Regional / Lineage Synonym Entries Preserved (Left Unchanged per Phase 2 & 3 Rules)
  {
    duplicateId: 'syn_suryavamshi',
    duplicateTitle: 'Suryavamshi (Solar Dynasty Lineage Designation)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_suryavamshi',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_suryavamshi',
    canonicalTitle: 'Suryavamshi (Preserved Distinct Solar Lineage Entry)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_suryavamshi',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Represents overarching Solar Vamsa lineage classification; preserved without destructive merging.',
  },
  {
    duplicateId: 'syn_sagaravamshi',
    duplicateTitle: 'Sagaravamshi / Sagarवंशी (Samrat Sagara Lineage Designation)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_sagaravamshi',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_sagaravamshi',
    canonicalTitle: 'Sagaravamshi (Preserved Distinct Sagara Lineage Entry)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_sagaravamshi',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Represents specific Samrat Sagara / Bhagiratha hydrological Kshatriya lineage; preserved intact.',
  },
  {
    duplicateId: 'syn_raghuvamshi',
    duplicateTitle: 'Raghuvamshi (Raghu-Rama Lineage Designation)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_raghuvamshi',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_raghuvamshi',
    canonicalTitle: 'Raghuvamshi (Preserved Distinct Raghu Lineage Entry)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_raghuvamshi',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Represents Raghu-Ramachandra Solar sub-lineage nomenclature; preserved intact.',
  },
  {
    duplicateId: 'syn_odisha_kshatriya',
    duplicateTitle: 'Odisha Kshatriya / Oriya Kshatriya',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_odisha_kshatriya',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_odisha_kshatriya',
    canonicalTitle: 'Odisha Kshatriya / Oriya Kshatriya (Preserved Regional Designation)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_odisha_kshatriya',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Distinct regional nomenclature for Odisha/Utkala Kshatriya diaspora; preserved intact.',
  },
  {
    duplicateId: 'syn_odiyaraju_karnataka',
    duplicateTitle: 'Odiyaraju / Wodeyaraju (Karnataka-Mysore Border Designation)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_odiyaraju_karnataka',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_odiyaraju_karnataka',
    canonicalTitle: 'Odiyaraju / Wodeyaraju (Preserved Karnataka Regional Designation)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_odiyaraju_karnataka',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Distinct Karnataka/Rayalaseema royal suffix variation; preserved intact.',
  },
  {
    duplicateId: 'syn_ottar',
    duplicateTitle: 'Ottar / Boya-Oddar (Tamilakam / Kongu Regional Designation)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_ottar',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_ottar',
    canonicalTitle: 'Ottar (Preserved Tamil Phonetic Designation)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_ottar',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Distinct Tamil phonetic form (Ottar) in southern Nayaka corridors; preserved intact.',
  },
  {
    duplicateId: 'syn_odda_nayakkar_tn',
    duplicateTitle: 'Odda-Nayakkar / Odda-Raju (Madurai-Thanjavur Nayaka Designation)',
    duplicateUrl: '/community-heritage?tab=synonyms&id=syn_odda_nayakkar_tn',
    duplicateCategory: 'Community Synonym Summary',
    canonicalId: 'syn_odda_nayakkar_tn',
    canonicalTitle: 'Odda-Nayakkar (Preserved Southern Military Commander Designation)',
    canonicalUrl: '/community-heritage?tab=synonyms&id=syn_odda_nayakkar_tn',
    confidence: 'Manual Review (Distinct Regional / Lineage Designation Preserved)',
    actionTaken: 'Preserved as Distinct Entry (No Consolidation)',
    verificationNote: 'Distinct Madurai/Thanjavur Nayaka military title; preserved intact.',
  },
];
