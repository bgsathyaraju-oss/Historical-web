import type { Article, LanguageCode } from '../types/index.ts';
import { translations as TRANSLATIONS } from '../i18n/translations.ts';
import { getAllArticles } from '../data/articlesRepository.ts';
import { getAllDocumentedFigures, DOCUMENTED_FIGURES_REPO } from '../data/documentedFiguresRepository.ts';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS
} from '../data/historyContent.ts';
import {
  PROMINENT_PERSONS,
  ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES
} from '../data/communityProminentPersonsData.ts';
import {
  COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES,
  COMMUNITY_DIRECTORY_ITEMS
} from '../data/communityHeritageDirectoryData.ts';
import {
  COMMUNITY_HERITAGE_DETAILED_ARTICLES,
  STEP4_VISUAL_ASSET_REGISTRY
} from '../data/communityHeritageArticlesData.ts';
import {
  getCanonicalInscriptions,
  getCanonicalDocuments,
  getCanonicalTimelineEvents,
  getCanonicalMonuments,
  getCanonicalLocations,
  getCanonicalGallery
} from '../data/archivalSeedData.ts';
import { getEnrichedGalleryArticles } from '../data/galleryArticlesEnrichment.ts';
import { KALINGA_WAR_CONTENT } from '../data/kalingaWarData.ts';
import { MASTER_70_REFERENCE_REGISTRY } from '../data/communityReference70Registry.ts';
import {
  LEGACY_ARTICLE_ID_ALIASES,
  DUP_SYNONYM_TO_CANONICAL_DIR_MAP
} from '../data/canonicalArticleMap.ts';

export interface ResolvedSeoMetadata {
  title: string;
  description: string;
  imagePath: string;
  imageUrl: string;
  rawArchiveImagePath: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imageType: string;
  canonicalUrl: string;
  canonicalPath: string;
  ogType: 'website' | 'article' | 'profile';
  siteName: string;
  locale: string;
  language: LanguageCode;
  section: string;
  keywords: string[];
  itemId?: string;
}

const VALID_LANGUAGES: LanguageCode[] = ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'];

const OG_LOCALE_MAP: Record<LanguageCode, string> = {
  en: 'en_IN',
  hi: 'hi_IN',
  te: 'te_IN',
  kn: 'kn_IN',
  ta: 'ta_IN',
  mr: 'mr_IN',
  or: 'or_IN',
  bn: 'bn_IN'
};

export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  home: '/assets/archive/konark_sun_temple_structure.jpg',
  heritage: '/assets/archive/oad_hydraulic_stepwell.jpg',
  personages: '/assets/archive/kapilendra_deva_portrait.jpg',
  prominent_persons: '/assets/archive/emperor_kharavela_udayagiri.jpg',
  monographs: '/assets/archive/odia_palm_leaf_manuscript.jpg',
  documentary: '/assets/archive/kapilendra_deva_lingaraja.jpg',
  inscriptions: '/assets/archive/hathigumpha_inscription.jpg',
  documents: '/assets/archive/copper_plate_charter.jpg',
  timeline: '/assets/archive/barabati_fort_gateway.jpg',
  maps: '/assets/archive/gajapathi_empire_map_1465.jpg',
  monuments: '/assets/archive/konark_chariot_wheel.jpg',
  dynasties: '/assets/archive/gajapathi_empire_map_1465.jpg',
  odra_desha: '/assets/archive/odra_kalinga_map.jpg',
  kalinga_war: '/assets/archive/kalinga_dhauli_shanti_stupa.jpg',
  genealogy: '/assets/archive/surya_konark_sculpture.jpg',
  surnames_south: '/assets/archive/barabati_fort_ramparts.jpg',
  surnames_north: '/assets/archive/jasma_devi_sahasralinga.jpg',
  gallery: '/assets/archive/puri_simhadwara_wall.jpg',
  culture: '/assets/archive/peddintlamma_temple_kolletikota.jpg',
  literature: '/assets/archive/mahakavi_sarala_dasa.jpg',
  about: '/assets/archive/puri_jagannatha_temple.jpg'
};

const PROMINENT_PERSON_ALIASES: Record<string, string> = {
  kapilendra_deva: 'kapilendra_deva_gajapathi',
  baxi_jagabandhu: 'baxi_jagabandhu_paika_general',
  jayee_rajguru: 'jayee_rajguru_preceptor',
  chodaganga_deva: 'anantavarman_chodaganga_trikalinga',
  purushottama_deva: 'purushottama_deva_gajapathi',
  prataparudra_deva: 'prataparudra_deva_gajapathi',
  raja_bhagiratha: 'maharshi_raja_bhagiratha',
  siddharameshwara: 'shivayogi_siddharameshwara',
  peddintlamma_thalli: 'kolletikota_peddintlamma',
  mukunda_deva: 'raja_mukunda_deva',
  narasimha_deva_i: 'langula_narasimha_deva',
  queen_balanagamma: 'rani_balanagamma',
  raja_bhoja_parmar: 'raja_bhoja_paramara',
  prince_balavaddiraju: 'balavaddiraju'
};

const LEGACY_FIGURE_ALIASES: Record<string, string> = {
  'fig-kapilendra': 'fig_kapilendra_deva',
  'fig-purushottama': 'fig_purushottama_deva',
  'fig-prataparudra': 'fig_prataparudra_deva',
  'fig-hamvira': 'fig_hamvira_deva',
  'fig-mukunda': 'fig_mukunda_deva',
  'fig-chodaganga': 'fig_anantavarman_chodaganga',
  'fig-narasimha': 'fig_langula_narasimha_deva'
};

export function normalizeLanguageCode(rawLang?: string | null): LanguageCode {
  if (!rawLang) return 'en';
  const cleaned = rawLang.trim().toLowerCase() as LanguageCode;
  return VALID_LANGUAGES.includes(cleaned) ? cleaned : 'en';
}

export function cleanPlainText(input: string | undefined | null, maxLength = 220): string {
  if (!input) return '';
  const stripped = input
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_`~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (stripped.length <= maxLength) return stripped;
  const cut = stripped.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

/**
 * Converts a local archive or asset path (e.g. `/assets/archive/kapilendra_deva_portrait.jpg`)
 * into its dedicated 1200x630 Open Graph preview image path (`/assets/og/kapilendra_deva_portrait.jpg`).
 */
export function toOgPreviewImagePath(rawImagePath: string | undefined | null, fallbackCategory = 'home'): {
  ogImagePath: string;
  rawArchiveImagePath: string;
} {
  const defaultArchive = CATEGORY_FALLBACK_IMAGES[fallbackCategory] || CATEGORY_FALLBACK_IMAGES.home;
  const source = (rawImagePath || '').trim() || defaultArchive;

  // Strip leading BASE_URL prefix if present (e.g. /Historical-web/assets/archive/...)
  const normalized = source.replace(/^\/Historical-web\//i, '/');

  if (normalized.startsWith('/assets/og/')) {
    return {
      ogImagePath: normalized,
      rawArchiveImagePath: normalized.replace('/assets/og/', '/assets/archive/')
    };
  }

  const archiveMatch = normalized.match(/\/assets\/archive\/([^/?#]+)\.(jpg|jpeg|png)$/i);
  if (archiveMatch) {
    const baseName = archiveMatch[1];
    return {
      ogImagePath: `/assets/og/${baseName}.jpg`,
      rawArchiveImagePath: `/assets/archive/${baseName}.${archiveMatch[2]}`
    };
  }

  if (/\/assets\/dr_g_sathyanarayana_raju\.png$/i.test(normalized)) {
    return {
      ogImagePath: '/assets/og/dr_g_sathyanarayana_raju.jpg',
      rawArchiveImagePath: '/assets/dr_g_sathyanarayana_raju.png'
    };
  }

  if (normalized.startsWith('http://') || normalized.startsWith('https://')) {
    const httpsUrl = normalized.replace(/^http:\/\//i, 'https://');
    return {
      ogImagePath: httpsUrl,
      rawArchiveImagePath: httpsUrl
    };
  }

  const ensuredLeadingSlash = normalized.startsWith('/') ? normalized : `/${normalized}`;
  return {
    ogImagePath: ensuredLeadingSlash,
    rawArchiveImagePath: ensuredLeadingSlash
  };
}

/**
 * Builds an absolute, publicly accessible HTTPS URL for Open Graph tags and canonical URLs.
 */
export function toAbsoluteHttpsUrl(
  pathOrUrl: string,
  origin = 'https://historical-web.web.app',
  basePath = ''
): string {
  if (!pathOrUrl) return origin;
  if (/^https?:\/\//i.test(pathOrUrl)) {
    // Always enforce https:// for non-localhost URLs
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(pathOrUrl)) {
      return pathOrUrl;
    }
    return pathOrUrl.replace(/^http:\/\//i, 'https://');
  }

  let cleanOrigin = (origin || 'https://historical-web.web.app').trim().replace(/\/+$/, '');
  if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(cleanOrigin)) {
    cleanOrigin = cleanOrigin.replace(/^http:\/\//i, 'https://');
  }

  const cleanBase = basePath.replace(/^\/+|\/+$/g, '');
  const cleanRel = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;

  if (cleanBase && !cleanRel.startsWith(`/${cleanBase}/`) && cleanRel !== `/${cleanBase}`) {
    return `${cleanOrigin}/${cleanBase}${cleanRel}`;
  }
  return `${cleanOrigin}${cleanRel}`;
}

interface ItemMatchResult {
  title: string;
  description: string;
  rawImagePath: string;
  imageAlt: string;
  canonicalRoute: string;
  queryKey: string;
  itemId: string;
  ogType: 'article' | 'profile';
  section: string;
  keywords: string[];
}

/**
 * Searches across all repositories (Articles, Monarchs/Figures, Prominent Persons,
 * Community Heritage Directory, Professions, Synonyms, Geographical Regions,
 * Monograph Sections, Inscriptions, Documents, Timeline Events, Monuments,
 * Locations, Gallery, Kalinga War Scenes, 74-Reference Registry, and optional DB articles)
 * to resolve item-specific Open Graph metadata.
 */
export function resolveItemMetadataById(
  rawItemId: string,
  lang: LanguageCode,
  extraArticles?: Article[]
): ItemMatchResult | null {
  const targetId = (rawItemId || '').trim();
  if (!targetId) return null;

  // 1. Canonical + Extra Research Monographs / Articles (art_* or slug or consolidated mono_part_*)
  const resolvedArticleId = LEGACY_ARTICLE_ID_ALIASES[targetId] || targetId;
  const allArticles = [...getAllArticles(lang), ...(extraArticles || [])];
  const matchedArticle = allArticles.find(
    a => a.id === resolvedArticleId || a.slug === resolvedArticleId || a.id === targetId || a.slug === targetId
  );
  if (matchedArticle) {
    const tr = matchedArticle.translations?.[lang] || matchedArticle.translations?.en;
    const artTitle =
      tr?.title ||
      (matchedArticle as any).title ||
      matchedArticle.original_title ||
      matchedArticle.slug;
    const artSummary =
      tr?.summary ||
      matchedArticle.summary ||
      tr?.content ||
      matchedArticle.original_content ||
      '';
    return {
      title: `${artTitle} | Suryavamsha Historical Monograph`,
      description: cleanPlainText(artSummary, 220),
      rawImagePath: matchedArticle.featured_image || CATEGORY_FALLBACK_IMAGES.monographs,
      imageAlt: artTitle,
      canonicalRoute: '/research',
      queryKey: 'article',
      itemId: matchedArticle.id,
      ogType: 'article',
      section: matchedArticle.category || 'Historical Monographs',
      keywords: matchedArticle.tags || ['Suryavamsha', 'Odra Desha', 'Historical Monograph']
    };
  }

  // 2. Documented Historical Figures & Monarchs (fig_* or legacy fig-*)
  const normalizedFigId = LEGACY_FIGURE_ALIASES[targetId] || targetId;
  const allDocFigures = getAllDocumentedFigures(lang);
  const matchedDocFigure = allDocFigures.find(f => f.id === normalizedFigId);
  if (matchedDocFigure) {
    const repoFig = DOCUMENTED_FIGURES_REPO.find(r => r.id === normalizedFigId);
    const reignInfo = matchedDocFigure.reign_period ? ` (${matchedDocFigure.reign_period})` : '';
    const primaryTitle = matchedDocFigure.known_titles?.[0] || matchedDocFigure.dynasty_name;
    return {
      title: `${matchedDocFigure.name}${reignInfo} — ${matchedDocFigure.dynasty_name}`,
      description: cleanPlainText(
        `${primaryTitle}. ${matchedDocFigure.historical_significance} ${matchedDocFigure.biography}`,
        220
      ),
      rawImagePath:
        matchedDocFigure.image_url ||
        repoFig?.image_url ||
        CATEGORY_FALLBACK_IMAGES.personages,
      imageAlt: `${matchedDocFigure.name} — ${matchedDocFigure.dynasty_name}`,
      canonicalRoute: '/kings-queens',
      queryKey: 'figure',
      itemId: matchedDocFigure.id,
      ogType: 'profile',
      section: 'Historical Personages & Monarchs',
      keywords: [
        matchedDocFigure.name,
        matchedDocFigure.dynasty_name,
        ...(matchedDocFigure.known_titles || []).slice(0, 4)
      ]
    };
  }

  // 3. Historical Figures from historyContent.ts (if not already matched)
  const matchedHistFig = HISTORICAL_FIGURES.find(f => f.id === normalizedFigId);
  if (matchedHistFig) {
    const locName = matchedHistFig.localized_name?.[lang] || matchedHistFig.canonical_name;
    const locTitle = matchedHistFig.titles?.[lang] || matchedHistFig.titles?.en || matchedHistFig.dynasty_lineage;
    const locSummary = matchedHistFig.summary?.[lang] || matchedHistFig.summary?.en || '';
    return {
      title: `${locName} — ${locTitle}`,
      description: cleanPlainText(locSummary, 220),
      rawImagePath: matchedHistFig.image_url || CATEGORY_FALLBACK_IMAGES.personages,
      imageAlt: `${locName} (${locTitle})`,
      canonicalRoute: '/kings-queens',
      queryKey: 'figure',
      itemId: matchedHistFig.id,
      ogType: 'profile',
      section: 'Historical Personages',
      keywords: [locName, matchedHistFig.era, 'Suryavamsha']
    };
  }

  // 4. Community Prominent Persons (24 prominent persons + aliases)
  const resolvedPersonId = PROMINENT_PERSON_ALIASES[targetId] || targetId;
  const matchedPerson = PROMINENT_PERSONS.find(
    p => p.id === resolvedPersonId || p.id === targetId
  );
  if (matchedPerson) {
    const pName = matchedPerson.name[lang] || matchedPerson.name.en;
    const pTitles = matchedPerson.titles[lang] || matchedPerson.titles.en;
    const pSummary = matchedPerson.summary[lang] || matchedPerson.summary.en;
    const pEra = matchedPerson.era[lang] || matchedPerson.era.en;
    return {
      title: `${pName} (${pEra}) — Community Prominent Persons`,
      description: cleanPlainText(`${pTitles}. ${pSummary}`, 220),
      rawImagePath: matchedPerson.imageUrl || CATEGORY_FALLBACK_IMAGES.prominent_persons,
      imageAlt: `${pName} — ${matchedPerson.badge}`,
      canonicalRoute: '/community-prominent-persons',
      queryKey: 'id',
      itemId: matchedPerson.id,
      ogType: 'profile',
      section: 'Community Prominent Persons',
      keywords: [pName, matchedPerson.badge, ...matchedPerson.branches.slice(0, 5)]
    };
  }

  // 4b. Archival Research Placeholder Entries in Prominent Persons
  const matchedPlaceholder = ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES.find(p => p.id === targetId);
  if (matchedPlaceholder) {
    const phTitle = matchedPlaceholder.title[lang] || matchedPlaceholder.title.en;
    const phNote =
      (matchedPlaceholder as any).scopeAndVerificationNote?.[lang] ||
      (matchedPlaceholder as any).researchNote?.[lang] ||
      (matchedPlaceholder as any).researchNote?.en ||
      phTitle;
    return {
      title: `${phTitle} — Archival Research Dossier`,
      description: cleanPlainText(phNote, 220),
      rawImagePath: CATEGORY_FALLBACK_IMAGES.prominent_persons,
      imageAlt: phTitle,
      canonicalRoute: '/community-prominent-persons',
      queryKey: 'id',
      itemId: matchedPlaceholder.id,
      ogType: 'article',
      section: 'Community Prominent Persons',
      keywords: [phTitle, 'Archival Research', 'Suryavamsha']
    };
  }

  // 5. Community Heritage 16-Directory Items (comm_dir_01_od .. comm_dir_16_oddaru, plus consolidated duplicate syn_* IDs)
  const resolvedDirId = DUP_SYNONYM_TO_CANONICAL_DIR_MAP[targetId] || targetId;
  const matchedDirItem = COMMUNITY_DIRECTORY_ITEMS.find(
    item =>
      item.id === resolvedDirId ||
      item.id === targetId ||
      item.canonicalName.toLowerCase() === targetId.toLowerCase()
  );
  if (matchedDirItem) {
    const detailed = COMMUNITY_HERITAGE_DETAILED_ARTICLES.find(a => a.id === matchedDirItem.id);
    const step4Visual = STEP4_VISUAL_ASSET_REGISTRY[matchedDirItem.id];
    const locName = matchedDirItem.localizedName?.[lang] || matchedDirItem.canonicalName;
    const locGroup = matchedDirItem.localizedCategoryGroup?.[lang] || matchedDirItem.categoryGroup;
    const locSummary =
      detailed?.historicalAnalysis?.[lang] ||
      (matchedDirItem as any).shortSummary?.[lang] ||
      (matchedDirItem as any).historicalOverview?.[lang] ||
      (matchedDirItem as any).shortSummary?.en ||
      locName;
    const rawImg =
      detailed?.imageUrl ||
      step4Visual?.imageUrl ||
      CATEGORY_FALLBACK_IMAGES.heritage;
    const imgAlt =
      step4Visual?.title?.[lang] ||
      step4Visual?.title?.en ||
      `${locName} — ${locGroup}`;

    return {
      title: `${locName} (${matchedDirItem.canonicalName}) — ${locGroup} | Community Heritage`,
      description: cleanPlainText(locSummary, 220),
      rawImagePath: rawImg,
      imageAlt: imgAlt,
      canonicalRoute: '/community-heritage',
      queryKey: 'id',
      itemId: matchedDirItem.id,
      ogType: 'article',
      section: 'Community Heritage Directory',
      keywords: [
        matchedDirItem.canonicalName,
        ...(detailed?.relatedKeywords || ['Community Heritage', 'Suryavamsha'])
      ]
    };
  }

  // 6. Complete 9 Professional Heritage Categories (prof_cat_1_warriors .. prof_cat_9_other_professions)
  const matchedProf = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(
    p => p.id === targetId || p.slug === targetId
  );
  if (matchedProf) {
    const profTitle = matchedProf.title[lang] || matchedProf.title.en;
    const profSummary =
      matchedProf.shortSummary[lang] ||
      matchedProf.definitionAndExplanation[lang] ||
      matchedProf.shortSummary.en;
    const rawImg =
      matchedProf.visualAssets?.[0]?.imageUrl || CATEGORY_FALLBACK_IMAGES.heritage;
    const imgAlt =
      matchedProf.visualAssets?.[0]?.title?.[lang] ||
      matchedProf.visualAssets?.[0]?.title?.en ||
      profTitle;
    return {
      title: `${profTitle} | Professional & Shilpa-Shastra Heritage`,
      description: cleanPlainText(profSummary, 220),
      rawImagePath: rawImg,
      imageAlt: imgAlt,
      canonicalRoute: '/community-heritage',
      queryKey: 'id',
      itemId: matchedProf.id,
      ogType: 'article',
      section: 'Professional Heritage',
      keywords: matchedProf.relatedKeywords || [profTitle, 'Professional Heritage']
    };
  }

  // 7. Community Synonyms (syn_*)
  const matchedSyn = COMMUNITY_SYNONYMS.find(s => s.id === targetId);
  if (matchedSyn) {
    const step4Visual = STEP4_VISUAL_ASSET_REGISTRY[matchedSyn.id];
    const synTitle = matchedSyn.native_scripts?.[lang] || matchedSyn.title;
    const synDesc =
      matchedSyn.historical_role?.[lang] ||
      matchedSyn.epistemic_note?.[lang] ||
      matchedSyn.historical_role?.en ||
      matchedSyn.linguistic_origin;
    const rawImg = step4Visual?.imageUrl || CATEGORY_FALLBACK_IMAGES.heritage;
    return {
      title: `${synTitle} (${matchedSyn.category}) — Community Heritage Designation`,
      description: cleanPlainText(synDesc, 220),
      rawImagePath: rawImg,
      imageAlt: step4Visual?.title?.[lang] || synTitle,
      canonicalRoute: '/community-heritage',
      queryKey: 'id',
      itemId: matchedSyn.id,
      ogType: 'article',
      section: 'Community Heritage Synonyms',
      keywords: [matchedSyn.title, matchedSyn.category, matchedSyn.geographical_association]
    };
  }

  // 8. Geographical Spread Regions (geo_*)
  const matchedGeo = GEOGRAPHICAL_SPREAD.find(g => g.id === targetId);
  if (matchedGeo) {
    const step4Visual = STEP4_VISUAL_ASSET_REGISTRY[matchedGeo.id];
    const geoTitle = matchedGeo.localized_region?.[lang] || matchedGeo.region_name;
    const geoSummary =
      matchedGeo.regional_overview?.[lang] ||
      matchedGeo.regional_overview?.en ||
      matchedGeo.migration_epoch_and_corridor;
    const rawImg = step4Visual?.imageUrl || CATEGORY_FALLBACK_IMAGES.maps;
    return {
      title: `${geoTitle} — Regional Distribution & Historical Settlements`,
      description: cleanPlainText(geoSummary, 220),
      rawImagePath: rawImg,
      imageAlt: step4Visual?.title?.[lang] || geoTitle,
      canonicalRoute: '/community-heritage',
      queryKey: 'id',
      itemId: matchedGeo.id,
      ogType: 'article',
      section: 'Geographical Heritage',
      keywords: [matchedGeo.region_name, ...(matchedGeo.predominant_community_synonyms || [])]
    };
  }

  // 9. Historical Monograph Sections (mono_part_1_primordial .. mono_part_8_epigraphic_evolution)
  const matchedMono = HISTORICAL_MONOGRAPH_SECTIONS.find(m => m.id === targetId);
  if (matchedMono) {
    const step4Visual = STEP4_VISUAL_ASSET_REGISTRY[matchedMono.id];
    const monoTitle = matchedMono.section_title?.[lang] || matchedMono.section_title?.en || '';
    const monoSummary =
      matchedMono.content?.[lang] ||
      matchedMono.content?.en ||
      '';
    const rawImg = step4Visual?.imageUrl || CATEGORY_FALLBACK_IMAGES.documentary;
    return {
      title: `${monoTitle} | Historical Monograph`,
      description: cleanPlainText(monoSummary, 220),
      rawImagePath: rawImg,
      imageAlt: step4Visual?.title?.[lang] || monoTitle,
      canonicalRoute: '/community-heritage',
      queryKey: 'id',
      itemId: matchedMono.id,
      ogType: 'article',
      section: 'Historical Monograph',
      keywords: ['Suryavamsha Monograph', 'Odra Desha', 'Kalinga']
    };
  }

  // 10. Canonical Inscriptions (insc_*)
  const INSCRIPTION_IMAGE_MAP: Record<string, string> = {
    insc_veligalani_1458: '/assets/archive/copper_plate_charter.jpg',
    insc_lingaraja_1452: '/assets/archive/kapilendra_deva_lingaraja.jpg',
    insc_simhachalam_prataparudra: '/assets/archive/simhachalam_temple.jpg'
  };
  const inscriptions = getCanonicalInscriptions(lang);
  const matchedInsc = inscriptions.find(i => i.id === targetId);
  if (matchedInsc) {
    const inscTitle = matchedInsc.name || (matchedInsc as any).title || matchedInsc.id;
    const inscDate = matchedInsc.era_or_date || (matchedInsc as any).period || '';
    const inscLoc = matchedInsc.location_found || (matchedInsc as any).location || '';
    const inscBody =
      matchedInsc.historical_context ||
      matchedInsc.english_translation ||
      matchedInsc.transcription_excerpt ||
      '';
    return {
      title: `${inscTitle} (${inscDate}) — Epigraphic Record`,
      description: cleanPlainText(
        `${matchedInsc.ruler} · ${inscLoc}. ${inscBody}`,
        220
      ),
      rawImagePath:
        INSCRIPTION_IMAGE_MAP[matchedInsc.id] ||
        (matchedInsc as any).image_url ||
        CATEGORY_FALLBACK_IMAGES.inscriptions,
      imageAlt: `${inscTitle} — ${inscLoc}`,
      canonicalRoute: '/inscriptions',
      queryKey: 'id',
      itemId: matchedInsc.id,
      ogType: 'article',
      section: 'Epigraphic Inscriptions',
      keywords: [inscTitle, matchedInsc.ruler, inscLoc, 'Inscription']
    };
  }

  // 11. Canonical Documents (doc_*)
  const DOCUMENT_IMAGE_MAP: Record<string, string> = {
    doc_madala_panji: '/assets/archive/odia_palm_leaf_manuscript.jpg',
    doc_sarasvati_vilasa: '/assets/archive/copper_plate_charter.jpg'
  };
  const documents = getCanonicalDocuments(lang);
  const matchedDoc = documents.find(d => d.id === targetId);
  if (matchedDoc) {
    const docDate = matchedDoc.approximate_date || (matchedDoc as any).date_or_period || '';
    const docLoc = matchedDoc.current_location || matchedDoc.source_provenance || '';
    const docBody =
      matchedDoc.translation_excerpt ||
      matchedDoc.research_notes ||
      matchedDoc.transcription_excerpt ||
      '';
    return {
      title: `${matchedDoc.title} (${docDate}) — Archival Document`,
      description: cleanPlainText(`${docLoc}. ${docBody}`, 220),
      rawImagePath:
        DOCUMENT_IMAGE_MAP[matchedDoc.id] ||
        (matchedDoc as any).file_url ||
        CATEGORY_FALLBACK_IMAGES.documents,
      imageAlt: matchedDoc.title,
      canonicalRoute: '/documents',
      queryKey: 'id',
      itemId: matchedDoc.id,
      ogType: 'article',
      section: 'Historical Documents',
      keywords: [matchedDoc.title, matchedDoc.author_authority, docDate]
    };
  }

  // 12. Canonical Timeline Events (ev_* / evt_*)
  const events = getCanonicalTimelineEvents(lang);
  const matchedEvent = events.find(e => e.id === targetId);
  if (matchedEvent) {
    const evDesc =
      matchedEvent.political_development ||
      matchedEvent.monuments_inscriptions ||
      (matchedEvent as any).description ||
      '';
    return {
      title: `${matchedEvent.title} (${matchedEvent.year_text}) — Historical Timeline`,
      description: cleanPlainText(`${matchedEvent.rulers_involved}. ${evDesc}`, 220),
      rawImagePath: (matchedEvent as any).image_url || CATEGORY_FALLBACK_IMAGES.timeline,
      imageAlt: `${matchedEvent.title} (${matchedEvent.year_text})`,
      canonicalRoute: '/timeline',
      queryKey: 'id',
      itemId: matchedEvent.id,
      ogType: 'article',
      section: 'Historical Timeline',
      keywords: [matchedEvent.title, matchedEvent.year_text, matchedEvent.period]
    };
  }

  // 13. Canonical Temples & Monuments (mon_*)
  const MONUMENT_ALIASES: Record<string, string> = {
    mon_konark: 'mon_konark_sun',
    mon_puri: 'mon_meghanada_pacheri',
    mon_draksharama: 'mon_draksharama_mandapa',
    mon_kolletikota: 'mon_kolletikota_peddintlamma'
  };
  const resolvedMonId = MONUMENT_ALIASES[targetId] || targetId;
  const monuments = getCanonicalMonuments(lang);
  const matchedMon = monuments.find(m => m.id === resolvedMonId || m.id === targetId);
  if (matchedMon) {
    const monBuilder = matchedMon.patron_ruler || (matchedMon as any).builder || '';
    const monCentury = matchedMon.century || (matchedMon as any).period || '';
    const monSig =
      matchedMon.historical_significance ||
      (matchedMon as any).significance ||
      matchedMon.architectural_style ||
      '';
    return {
      title: `${matchedMon.name} (${matchedMon.location}) — Sacred Monument & Architecture`,
      description: cleanPlainText(
        `${monBuilder} (${monCentury}). ${monSig}`,
        220
      ),
      rawImagePath: matchedMon.image_url || CATEGORY_FALLBACK_IMAGES.monuments,
      imageAlt: `${matchedMon.name} — ${matchedMon.location}`,
      canonicalRoute: '/temples-monuments',
      queryKey: 'id',
      itemId: matchedMon.id,
      ogType: 'article',
      section: 'Temples & Monuments',
      keywords: [matchedMon.name, monBuilder, matchedMon.location]
    };
  }

  // 14. Canonical Locations / Maps (loc_*)
  const locations = getCanonicalLocations(lang);
  const matchedLoc = locations.find(l => l.id === targetId);
  if (matchedLoc) {
    return {
      title: `${matchedLoc.name} (${matchedLoc.ancient_name}) — Historical Geography`,
      description: cleanPlainText(
        `${matchedLoc.region} · ${matchedLoc.modern_state}. ${matchedLoc.summary} ${matchedLoc.archaeological_findings}`,
        220
      ),
      rawImagePath: matchedLoc.image_url || CATEGORY_FALLBACK_IMAGES.maps,
      imageAlt: `${matchedLoc.name} (${matchedLoc.ancient_name})`,
      canonicalRoute: '/maps',
      queryKey: 'id',
      itemId: matchedLoc.id,
      ogType: 'article',
      section: 'Historical Geography & Maps',
      keywords: [matchedLoc.name, matchedLoc.ancient_name, matchedLoc.region]
    };
  }

  // 15. Gallery Items (gal_*)
  const enrichedGallery = getEnrichedGalleryArticles(lang);
  const matchedEnrichedGal = enrichedGallery.find(g => g.item.id === targetId);
  if (matchedEnrichedGal) {
    const galTitle = matchedEnrichedGal.item.title;
    return {
      title: `${galTitle} — Archival Visual Monograph`,
      description: cleanPlainText(
        matchedEnrichedGal.fullDescription || matchedEnrichedGal.item.description,
        220
      ),
      rawImagePath: matchedEnrichedGal.item.image_url || CATEGORY_FALLBACK_IMAGES.gallery,
      imageAlt: matchedEnrichedGal.item.alt_text || galTitle,
      canonicalRoute: '/gallery',
      queryKey: 'id',
      itemId: matchedEnrichedGal.item.id,
      ogType: 'article',
      section: 'Archival Visual Gallery',
      keywords: matchedEnrichedGal.keywords?.map(k => k.label) || [galTitle, 'Visual Archive']
    };
  }

  const gallery = getCanonicalGallery(lang);
  const matchedGal = gallery.find(g => g.id === targetId);
  if (matchedGal) {
    return {
      title: `${matchedGal.title} (${matchedGal.period}) — Archival Visual Record`,
      description: cleanPlainText(matchedGal.description, 220),
      rawImagePath: matchedGal.image_url || CATEGORY_FALLBACK_IMAGES.gallery,
      imageAlt: matchedGal.title,
      canonicalRoute: '/gallery',
      queryKey: 'id',
      itemId: matchedGal.id,
      ogType: 'article',
      section: 'Archival Visual Gallery',
      keywords: [matchedGal.title, matchedGal.category, matchedGal.period]
    };
  }

  // 16. Kalinga War Scenes
  const kalingaData = KALINGA_WAR_CONTENT[lang] || KALINGA_WAR_CONTENT.en;
  const matchedScene = kalingaData.scenes.find(s => s.id === targetId);
  if (matchedScene) {
    return {
      title: `${matchedScene.sceneNumber}: ${matchedScene.title} — Kalinga War (c. 261 BCE)`,
      description: cleanPlainText(
        `${matchedScene.narrative} ${matchedScene.caption}`,
        220
      ),
      rawImagePath: matchedScene.imageUrl || CATEGORY_FALLBACK_IMAGES.kalinga_war,
      imageAlt: matchedScene.title,
      canonicalRoute: '/kalinga-war',
      queryKey: 'id',
      itemId: matchedScene.id,
      ogType: 'article',
      section: 'Kalinga War (c. 261 BCE)',
      keywords: ['Kalinga War', matchedScene.title, 'Emperor Ashoka', 'Dhauli']
    };
  }

  // 17. 74-Name Master Reference Registry (ref70_*)
  const matchedRef70 = MASTER_70_REFERENCE_REGISTRY.find(
    r => r.id === targetId || r.canonicalTerm.toLowerCase() === targetId.toLowerCase()
  );
  if (matchedRef70) {
    const locTerm = matchedRef70.localizedLabel[lang] || matchedRef70.canonicalTerm;
    const locNote = matchedRef70.historicalContextNote[lang] || matchedRef70.historicalContextNote.en;
    return {
      title: `${locTerm} (${matchedRef70.canonicalTerm}) — ${matchedRef70.classification}`,
      description: cleanPlainText(locNote, 220),
      rawImagePath: CATEGORY_FALLBACK_IMAGES.heritage,
      imageAlt: `${locTerm} — ${matchedRef70.classification}`,
      canonicalRoute: '/community-heritage',
      queryKey: 'id',
      itemId: matchedRef70.id,
      ogType: 'article',
      section: '74-Name Reference Index',
      keywords: [matchedRef70.canonicalTerm, ...matchedRef70.relatedTopicsAndKeywords.slice(0, 4)]
    };
  }

  return null;
}

interface RouteDefinition {
  title: (lang: LanguageCode) => string;
  description: (lang: LanguageCode) => string;
  rawImagePath: string;
  imageAlt: string;
  section: string;
  keywords: string[];
}

const ROUTE_SEO_DEFINITIONS: Record<string, RouteDefinition> = {
  '/': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.siteTitle} — ${t.siteSubtitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(`${t.hero.headline}. ${t.hero.subtitle}`, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.home,
    imageAlt: 'Konark Sun Temple & Suryavamsha Odiyaraju Kshatriya Royal Heritage Archive',
    section: 'Home',
    keywords: [
      'Suryavamsha',
      'Odiyaraju Kshatriya',
      'Gajapathi Empire',
      'Odra Desha',
      'Kalinga History',
      'Oad Rajputh',
      'Vaddera Heritage'
    ]
  },
  '/community-heritage': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.communityHeritage} — 16-Community Directory, 9 Professional Categories & Synonyms | ${t.siteTitle}`;
    },
    description: lang => {
      const labels: Record<LanguageCode, string> = {
        en: 'Comprehensive historical documentation of the 16 Suryavamsha Od/Oad/Odra/Odiyaraju/Vaddera/Waddar community designations, 9 Shilpa-Shastra & martial professional categories, and pan-Indian settlements.',
        hi: 'सूर्यवंश ओड/ओआड/ओड्र/ओडियाराजु/वड्डेरा/वाडार समुदाय की 16 प्रमुख शाखाओं, 9 व्यावसायिक एवं शिल्प-शास्त्र श्रेणियों तथा अखिल भारतीय विस्तार का प्रामाणिक अभिलेख।',
        te: 'సూర్యవంశ ఓడ్/ఓడ్ర/ఒడియరాజు/వడ్డేరా/వడ్డెరాజులు సమాజపు 16 ప్రధాన విభాగాలు, 9 శిల్ప-శాస్త్ర & క్షత్రియ వృత్తి వర్గాలు మరియు అఖిల భారత చరిత్ర సమగ్ర దర్శిని.',
        kn: 'ಸೂರ್ಯವಂಶ ಓಡ್/ಓಡ್ರ/ಒಡಿಯರಾಜು/ವಡ್ಡೇರ/ಭೋವಿ ಸಮುದಾಯದ 16 ಪ್ರಮುಖ ಶಾಖೆಗಳು, 9 ವೃತ್ತಿಪರ ಪರಂಪರೆ ವರ್ಗಗಳು ಮತ್ತು ಅಖಿಲ ಭಾರತೀಯ ಇತಿಹಾಸ ದಾಖಲೆ.',
        ta: 'சூர்யவம்ச ஓட்/ஒட்ர/ஒடியாராஜு/வட்டேரா/ஒட்டர் சமூகத்தின் 16 பிரிவுகள், 9 தொழில் பாரம்பரிய வகைகள் மற்றும் அகில இந்திய வரலாற்று ஆவணம்.',
        mr: 'सूर्यवंश ओड/ओड्र/ओडियाराजू/वाडार समाजाच्या १६ प्रमुख शाखा, ९ व्यावसायिक व शिल्पशास्त्र श्रेणी आणि अखिल भारतीय ऐतिहासिक वारसा.',
        or: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼/ଓଡ଼୍ର/ଓଡ଼ିଆରାଜୁ/ଭଦ୍देରା ସମୁଦାୟର ୧୬ଟି ପ୍ରମୁଖ ଶାଖା, ୯ଟି ବୃତ୍ତିଗତ ଓ ଶିଳ୍ପ-ଶାସ୍ତ୍ର ବର୍ଗ ଏବଂ ସର୍ବଭାରତୀୟ ଐତିହାସିକ ଅଭିଲେଖ।',
        bn: 'সূর্যবংশ ওড়/ওড্র/ওডিয়ারাজু সম্প্রদায়ের ১৬টি প্রধান শাখা, ৯টি পেশাগত ও শিল্পশাস্ত্র বিভাগ এবং সর্বভারতীয় ঐতিহাসিক আর্কাইভ।'
      };
      return cleanPlainText(labels[lang] || labels.en, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.heritage,
    imageAlt: 'Ancient Hydraulic Stepwell & Suryavamsha Community Heritage Architecture',
    section: 'Community Heritage',
    keywords: ['Community Heritage', 'Od-Rajputh', 'Odiyaraju', 'Vaddera', 'Oddaru', 'Waddar', 'Suryavamsha']
  },
  '/kings-queens': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.documentedFigures} — Monarchs, Emperors & Sacred Guardians | ${t.siteTitle}`;
    },
    description: lang => {
      const labels: Record<LanguageCode, string> = {
        en: 'Biographical dossiers, regnal timelines, imperial titles, and primary copper-plate & temple inscriptions of Kapilendra Deva, Purushottama Deva, Prataparudra Deva, Emperor Kharavela, Chodaganga Deva, and Suryavamsha progenitors.',
        hi: 'सम्राट कपिलेन्द्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, सम्राट खारवेल, अनंतवर्मन चोडगंग देव और सूर्यवंशी पूर्वजों के संपूर्ण जीवन-वृत्तांत एवं शिलालेखीय प्रमाण।',
        te: 'కపిలేంద్ర దేవ, పురుషోత్తమ దేవ, ప్రతాపరుద్ర దేవ, ఖారవేల చక్రవర్తి, అనంతవర్మ చోడగంగ దేవ మరియు సూర్యవంశ చక్రవర్తుల సమగ్ర జీవిత చరిత్రలు & శాసన ఆధారాలు.',
        kn: 'ಕಪಿಲೇಂದ್ರ ದೇವ, ಪುರುಷೋತ್ತಮ ದೇವ, ಪ್ರತಾಪರುದ্র ದೇವ, ಸಾಮ್ರಾಟ್ ಖಾರವೇಲ ಮತ್ತು ಸೂರ್ಯವಂಶದ ಚಕ್ರವರ್ತಿಗಳ ಸಂಪೂರ್ಣ ಜೀವನ ಚರಿತ್ರೆ ಹಾಗೂ ಶಾಸನ ದಾಖಲೆಗಳು.',
        ta: 'கபிலேந்திர தேவர், புருஷோத்தம தேவர், பிரதாபருத்ர தேவர், பேரரசர் காரவேலன் மற்றும் சூர்யவம்ச மன்னர்களின் முழுமையான வாழ்க்கை வரலாறு மற்றும் கல்வெட்டுச் சான்றுகள்.',
        mr: 'सम्राट कपिलेंद्र देव, पुरुषोत्तम देव, प्रतापरुद्र देव, सम्राट खारवेल आणि सूर्यवंशी सम्राटांचे संपूर्ण चरित्र व शिलालेखीय पुरावे.',
        or: 'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ, ପୁରୁଷୋତ୍ତମ ଦେବ, ପ୍ରତାପରୁଦ୍ର ଦେବ, ସମ୍ରାଟ ଖାରବେଳ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ସମ୍ରାଟମାନଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନୀ ଓ ଶିଳାଲେଖ ପ୍ରମାଣ।',
        bn: 'সম্রাট কপিলেন্দ্র দেব, পুরুষোত্তম দেব, প্রতাপরুদ্র দেব, সম্রাট খারবেল ও সূর্যবংশীয় সম্রাটদের সম্পূর্ণ জীবনী ও শিলালিপি প্রমাণ।'
      };
      return cleanPlainText(labels[lang] || labels.en, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.personages,
    imageAlt: 'Emperor Kapilendra Deva & Sovereign Monarchs of the Suryavamsha Gajapathi Empire',
    section: 'Historical Personages',
    keywords: ['Historical Personages', 'Kapilendra Deva', 'Purushottama Deva', 'Prataparudra Deva', 'Kharavela']
  },
  '/community-prominent-persons': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.communityProminentPersons} — Sovereigns, Martial Commanders, Saints & Master Builders | ${t.siteTitle}`;
    },
    description: lang => {
      const labels: Record<LanguageCode, string> = {
        en: 'Chronologically indexed directory of 24 prominent historical sovereigns, martial commanders, spiritual saints, and master builders across 32 Suryavamsha, Odra, Gajapathi, Odiyaraju, Oad-Rajputh, and Vaddera lineages.',
        hi: '32 सूर्यवंश, ओड्र, गजपति, ओडियाराजु, ओड-राजपूत और वड्डेरा शाखाओं के 24 प्रमुख ऐतिहासिक सम्राटों, सेनापतियों, संतों और महान निर्माताओं की कालानुक्रमिक निर्देशिका।',
        te: '32 సూర్యవంశ, ఓడ్ర, గజపతి, ఒడియరాజు, ఓడ్-రాజ్‌పుత్ మరియు వడ్డేరా శాఖలకు చెందిన 24 మంది చారిత్రక చక్రవర్తులు, సేనానులు, యోగులు మరియు మహా నిర్మాతల జీవిత చరిత్రలు.',
        kn: '32 ಸೂರ್ಯವಂಶ, ಓಡ್ರ, ಗಜಪತಿ, ಒಡಿಯರಾಜು, ಓಡ್-ರಜಪೂತ್ ಮತ್ತು ವಡ್ಡೇರ ಶಾಖೆಗಳ 24 ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಚಕ್ರವರ್ತಿಗಳು, ಸೇనానిಗಳು, ಸಂತರು ಮತ್ತು ನಿರ್ಮಾಪಕರ ಜೀವನ ಚರಿತ್ರೆ.',
        ta: '32 சூர்யவம்ச, ஒட்ர, கஜபதி, ஒடியாராஜு, ஓட்-ராஜ்புத் மற்றும் வட்டேரா பிரிவுகளின் 24 முக்கிய வரலாற்று மன்னர்கள், தளபதிகள் மற்றும் சான்றோர்களின் வரலாறு.',
        mr: '३२ सूर्यवंश, ओड्र, गजपती, ओडियाराजू, ओड-राजपूत आणि वाडार शाखांमधील २४ प्रमुख ऐतिहासिक सम्राट, सेनापती, संत आणि शिल्पकारांचे चरित्र.',
        or: '୩୨ଟି ସୂର୍ଯ୍ୟବଂଶ, ଓଡ଼୍ର, ଗଜପତି, ଓଡ଼ିଆରାଜୁ ଓ ଓଡ଼-ରାଜପୁତ ଶାଖାର ୨୪ ଜଣ ପ୍ରମୁଖ ଐତିହାସିକ ସମ୍ରାଟ, ସେନାପତି, ସନ୍ଥ ଓ ନିର୍ମାତାଙ୍କ ଜୀବନୀ।',
        bn: '৩২টি সূর্যবংশ, ওড্র, গজপতি, ওডিয়ারাজু ও ওড়-রাজপুত শাখার ২৪ জন বিশিষ্ট ঐতিহাসিক সম্রাট, সেনাপতি, সাধক ও নির্মাতাদের জীবনী।'
      };
      return cleanPlainText(labels[lang] || labels.en, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.prominent_persons,
    imageAlt: 'Emperor Kharavela at Udayagiri & Community Prominent Persons Archive',
    section: 'Community Prominent Persons',
    keywords: ['Community Prominent Persons', 'Emperor Kharavela', 'Kapilendra Deva', 'Baxi Jagabandhu', 'Raja Bhoja']
  },
  '/research': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.research} — Historical Monographs & Epigraphic Studies | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.documentary.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.monographs,
    imageAlt: 'Classical Odia Palm-Leaf Manuscript & Historical Monographs',
    section: 'Historical Monographs',
    keywords: ['Historical Monographs', 'Epigraphic Research', 'Odra Desha', 'Gajapathi Empire', 'Suryavamsha']
  },
  '/documentary': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.documentary.title} | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.documentary.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.documentary,
    imageAlt: 'Emperor Kapilendra Deva Lingaraja Temple Proclamation & Historical Documentary',
    section: 'Historical Documentary',
    keywords: ['Historical Documentary', 'Suryavamsha Monographs', 'Primary Sources', 'Inscriptions']
  },
  '/inscriptions': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.inscriptions.title} — Historical Records & Epigraphic Archive | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.inscriptions.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.inscriptions,
    imageAlt: 'Hathigumpha Rock Inscription & Royal Copper-Plate Charters',
    section: 'Historical Records',
    keywords: ['Historical Records', 'Inscriptions', 'Veligalani Copper Plate', 'Hathigumpha', 'Lingaraja']
  },
  '/historical-records': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `Historical Records — Inscriptions, Charters, Timeline & Archaeology | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.inscriptions.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.inscriptions,
    imageAlt: 'Hathigumpha Inscription & Primary Historical Records',
    section: 'Historical Records',
    keywords: ['Historical Records', 'Epigraphy', 'Copper-Plate Charters', 'Archaeological Monuments']
  },
  '/documents': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `Archival Documents, Chronicles & Legal Digests | ${t.siteTitle}`;
    },
    description: () =>
      'Authenticated archival documents, Madala Panji temple chronicles, Sarasvati Vilasa Sanskrit legal digests, and colonial gazetteer records.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.documents,
    imageAlt: 'Royal Copper-Plate Charter & Archival Documents',
    section: 'Historical Documents',
    keywords: ['Madala Panji', 'Sarasvati Vilasa', 'Copper Plate Charter', 'Archival Documents']
  },
  '/timeline': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.timeline.title} | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.timeline.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.timeline,
    imageAlt: 'Barabati Fort Gateway & Chronological Historical Timeline',
    section: 'Historical Timeline',
    keywords: ['Chronological Timeline', 'Odra Desha', 'Kalinga War', 'Gajapathi Empire']
  },
  '/maps': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.maps} — Historical Geography & Fortresses | ${t.siteTitle}`;
    },
    description: () =>
      'Interactive historical geography, strategic citadels, riverine corridors, and territorial boundaries of Odra Desha, Kalinga, Utkala, Trikalinga, and the Suryavamsha Gajapathi Empire.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.maps,
    imageAlt: 'Gajapathi Empire Map (1465 CE) from Ganga to Kaveri',
    section: 'Historical Maps',
    keywords: ['Gajapathi Empire Map', 'Odra Desha Map', 'Trikalinga', 'Kondavidu', 'Cuttack']
  },
  '/temples-monuments': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.monuments?.title || t.nav.temples} | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(
        t.monuments?.subtitle ||
          'Sacred Kalinga architecture, Konark Sun Temple, Jagannatha Puri Meghanada Pacheri, Simhachalam, and Kolletikota citadels.',
        220
      );
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.monuments,
    imageAlt: 'Konark Sun Temple Stone Chariot Wheel & Sacred Monuments',
    section: 'Temples & Monuments',
    keywords: ['Konark Sun Temple', 'Jagannatha Temple Puri', 'Simhachalam', 'Barabati Fort', 'Kondavidu Fort']
  },
  '/gajapathi-kings': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.gajapathi.title} — Royal Dynasties | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.gajapathi.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.dynasties,
    imageAlt: 'Suryavamsha Gajapathi Empire & Royal Dynasties of Odra-Kalinga',
    section: 'Royal Dynasties',
    keywords: ['Royal Dynasties', 'Suryavamsha Gajapathi', 'Kapilendra Deva', 'Eastern Ganga', 'Mahameghavahana']
  },
  '/odra-desha': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.odraDesha.title} | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.odraDesha.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.odra_desha,
    imageAlt: 'Historical Map of Ancient Odra Desha, Kalinga & Utkala',
    section: 'Odra Desha',
    keywords: ['Odra Desha', 'Kalinga', 'Utkala', 'Trikalinga', 'Tosali']
  },
  '/kalinga-war': {
    title: lang => {
      const kw = KALINGA_WAR_CONTENT[lang] || KALINGA_WAR_CONTENT.en;
      return `${kw.pageTitle} | Suryavamsha Historical Archive`;
    },
    description: lang => {
      const kw = KALINGA_WAR_CONTENT[lang] || KALINGA_WAR_CONTENT.en;
      return cleanPlainText(kw.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.kalinga_war,
    imageAlt: 'Dhauli Shanti Stupa & Rock Edicts of the Kalinga War (c. 261 BCE)',
    section: 'Kalinga War (c. 261 BCE)',
    keywords: ['Kalinga War', '261 BCE', 'Emperor Ashoka', 'Dhauli Rock Edicts', 'Major Rock Edict XIII']
  },
  '/genealogy': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.genealogy.title} | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.genealogy.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.genealogy,
    imageAlt: 'Surya Narayana Konark Sculpture & Suryavamsha Royal Genealogy',
    section: 'Royal Genealogy',
    keywords: ['Suryavamsha Genealogy', 'Ikshvaku', 'Samrat Sagara', 'Maharshi Bhagiratha', 'Gajapathi Lineage']
  },
  '/community-surnames': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.communitySurnames} — South-Indian Odiyaraju / Vaddera / Oddar Surnames | ${t.siteTitle}`;
    },
    description: () =>
      'Alphabetical archival directory of South-Indian surnames (Intiperlu / Mane Hesarugalu / Kulam Names) of the Suryavamsham VadiyaRaja (Odiyaraju) Kshatriya community across Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.surnames_south,
    imageAlt: 'Barabati Fort Ramparts & South-Indian Suryavamsha Community Surnames Directory',
    section: 'Community Surnames (South-Indian)',
    keywords: ['Community Surnames', 'South-Indian Oad Community', 'Odiyaraju Surnames', 'Intiperlu', 'Vaddera Surnames']
  },
  '/community-surnames-north-indian-oad-community': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.communitySurnamesNorth} — North-Indian Suryavamshi Oad-Rajpoot Gotras & Surnames | ${t.siteTitle}`;
    },
    description: () =>
      'Archival directory of 90 North-Indian surnames, clans, and sub-castes (Gotras / Nakhs) of the Suryavamshi Oad-Rajpoot community across Rajasthan, Gujarat, Haryana, Punjab, Delhi, Uttar Pradesh, and Madhya Pradesh.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.surnames_north,
    imageAlt: 'Sahasralinga Talav & North-Indian Suryavamshi Oad-Rajpoot Surnames Directory',
    section: 'Community Surnames (North-Indian)',
    keywords: ['North-Indian Oad Surnames', 'Oad-Rajpoot Gotras', 'Suryavamshi Oad', 'Community Surnames']
  },
  '/gallery': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.gallery} — Archival Photographs, Sculptures & Inscriptions | ${t.siteTitle}`;
    },
    description: () =>
      'Curated visual archive of Kalinga architecture, Suryavamsha Gajapathi royal monuments, copper-plate charters, palm-leaf manuscripts, and historical maps.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.gallery,
    imageAlt: 'Puri Jagannatha Temple Simhadwara & Archival Visual Gallery',
    section: 'Visual Gallery',
    keywords: ['Historical Gallery', 'Inscriptions', 'Fortresses', 'Sculptures', 'Maps']
  },
  '/culture-traditions': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.culture} — Kshatriya Dharma, Sacred Festivals & Shilpa-Shastra | ${t.siteTitle}`;
    },
    description: () =>
      'Sacred traditions, Jagannatha and Sri Peddintlamma Thalli worship, martial Paika heritage, and Shilpa-Shastra architectural traditions of the Suryavamsha Odiyaraju Kshatriya community.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.culture,
    imageAlt: 'Kolletikota Sri Peddintlamma Temple & Cultural Traditions',
    section: 'Culture & Traditions',
    keywords: ['Cultural Traditions', 'Peddintlamma', 'Jagannatha Worship', 'Martial Traditions']
  },
  '/literature': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.literature} — Classical Texts, Chronicles & Royal Patronage | ${t.siteTitle}`;
    },
    description: () =>
      'Classical Sanskrit and Odia literature of the Suryavamsha Gajapathi era, including Kapilendra Deva, Mahakavi Sarala Dasa, Prataparudra Deva Sarasvati Vilasa, and Madala Panji.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.literature,
    imageAlt: 'Mahakavi Sarala Dasa & Classical Literature of the Gajapathi Era',
    section: 'Literature & Publications',
    keywords: ['Sarala Dasa', 'Sarasvati Vilasa', 'Madala Panji', 'Classical Literature']
  },
  '/references': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.references} — Epigraphia Indica, ASI Reports & Bibliography | ${t.siteTitle}`;
    },
    description: () =>
      'Verified bibliography of Archaeological Survey of India (ASI) reports, Epigraphia Indica volumes, South Indian Inscriptions, colonial gazetteers, and peer-reviewed historical scholarship.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.documents,
    imageAlt: 'Epigraphia Indica Citations, Copper-Plate Charters & Primary References',
    section: 'References & Citations',
    keywords: ['Epigraphia Indica', 'Primary Sources', 'Historical Citations', 'Archaeological Survey of India']
  },
  '/about': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.about.title} | ${t.siteTitle}`;
    },
    description: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return cleanPlainText(t.about.subtitle, 220);
    },
    rawImagePath: CATEGORY_FALLBACK_IMAGES.about,
    imageAlt: 'Puri Shree Jagannatha Temple & Suryavamsha Historical Documentary Mission',
    section: 'About',
    keywords: ['About Suryavamsha Archive', 'Historical Methodology', 'Epistemic Standards']
  },
  '/historical-persons': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.historicalPersons} — Solar Dynasty Progenitors & Sovereigns | ${t.siteTitle}`;
    },
    description: () =>
      'Biographical records of Samrat Sagara, Maharshi Bhagiratha, Emperor Kharavela, Virangana Jasma Devi, Shivayogi Siddharameshwara, and Sri Peddintlamma Thalli.',
    rawImagePath: '/assets/01_samrat_sagara.webp',
    imageAlt: 'Samrat Sagara & Solar Dynasty Historical Persons',
    section: 'Historical Persons',
    keywords: ['Samrat Sagara', 'Maharshi Bhagiratha', 'Emperor Kharavela', 'Jasma Devi', 'Siddharameshwara']
  },
  '/community-activities': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.activities} | ${t.siteTitle}`;
    },
    description: () =>
      'Heritage preservation, epigraphic documentation, educational initiatives, and cultural welfare programs of the global Suryavamsha Odiyaraju Kshatriya community.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.about,
    imageAlt: 'Suryavamsha Community Welfare, Educational & Heritage Preservation Activities',
    section: 'Community Activities',
    keywords: ['Community Activities', 'Heritage Preservation', 'Educational Welfare']
  },
  '/events': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.events} | ${t.siteTitle}`;
    },
    description: () =>
      'Historical conferences, heritage symposiums, cultural commemorations, and global community announcements.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.culture,
    imageAlt: 'Suryavamsha Historical Conferences, Festivals & Community Events',
    section: 'Events',
    keywords: ['Community Events', 'Historical Conferences', 'Heritage Gatherings']
  },
  '/directory': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.directory} | ${t.siteTitle}`;
    },
    description: () =>
      'Global directory of historians, researchers, scholars, and community members of the Suryavamsha Odiyaraju Kshatriya heritage archive.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.heritage,
    imageAlt: 'Suryavamsha Community Scholars & Members Directory',
    section: 'Community Directory',
    keywords: ['Community Directory', 'Historians', 'Scholars']
  },
  '/contact': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `${t.nav.contact} | ${t.siteTitle}`;
    },
    description: () =>
      'Contact the Suryavamsha Odiyaraju Kshatriya Historical Documentary editorial board and submit primary archival records or inscriptions.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.about,
    imageAlt: 'Contact the Suryavamsha Historical Documentary Editorial Board',
    section: 'Contact',
    keywords: ['Contact Editorial Board', 'Submit Archival Records', 'Dr.G Sathyanarayana Raju']
  },
  '/copyright': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `Copyright & Archival Permissions | ${t.siteTitle}`;
    },
    description: () =>
      'Copyright notice, academic citation guidelines, and archival usage permissions for the Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.documents,
    imageAlt: 'Copyright & Archival Permissions — Suryavamsha Odiyaraju Kshatriya Portal',
    section: 'Copyright & Permissions',
    keywords: ['Copyright', 'Archival Permissions', 'Academic Citations']
  },
  '/terms': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `Disclaimer & Terms of Use | ${t.siteTitle}`;
    },
    description: () =>
      'Historical disclaimer, epistemic standards, and terms of use for the Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.documents,
    imageAlt: 'Disclaimer & Terms of Use — Suryavamsha Odiyaraju Kshatriya Portal',
    section: 'Disclaimer & Terms',
    keywords: ['Disclaimer', 'Terms of Use', 'Epistemic Standards']
  },
  '/privacy': {
    title: lang => {
      const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
      return `Privacy Policy | ${t.siteTitle}`;
    },
    description: () =>
      'Privacy policy and member directory data protection guidelines for the Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal.',
    rawImagePath: CATEGORY_FALLBACK_IMAGES.about,
    imageAlt: 'Privacy Policy — Suryavamsha Odiyaraju Kshatriya Portal',
    section: 'Privacy Policy',
    keywords: ['Privacy Policy', 'Data Protection', 'Community Directory']
  }
};

// Route aliases mapping to canonical route keys
const ROUTE_ALIASES: Record<string, string> = {
  '/test-page': '/',
  '/test_page': '/',
  '/testpage': '/',
  '/disclaimer': '/terms',
  '/historical-sources': '/references',
  '/heritage': '/community-heritage',
  '/documented-historical-figures': '/kings-queens',
  '/historical-figures': '/kings-queens',
  '/prominent-persons': '/community-prominent-persons',
  '/community-figures': '/community-prominent-persons',
  '/prominent-figures': '/community-prominent-persons',
  '/articles': '/research',
  '/dynasties': '/gajapathi-kings',
  '/ashoka-kalinga-war': '/kalinga-war',
  '/surnames': '/community-surnames',
  '/media': '/gallery',
  '/publications': '/literature',
  '/members': '/directory'
};

export interface ResolveSeoInput {
  pathname: string;
  search?: string;
  origin?: string;
  basePath?: string;
  defaultLang?: LanguageCode;
  extraArticles?: Article[];
}

/**
 * Resolves complete Open Graph, Twitter Card, and SEO metadata for any route,
 * query string (`?article=`, `?id=`, `?figure=`, `?person=`, `?lang=`), or `/share/<id>` path.
 */
export function resolveSeoMetadata(input: ResolveSeoInput): ResolvedSeoMetadata {
  const origin = input.origin || 'https://historical-web.web.app';
  const basePath = (input.basePath || '').replace(/^\/+|\/+$/g, '');

  // Strip basePath from pathname if present (e.g. /Historical-web/kings-queens -> /kings-queens)
  let rawPath = (input.pathname || '/').split('?')[0].split('#')[0];
  if (basePath && rawPath.toLowerCase().startsWith(`/${basePath.toLowerCase()}`)) {
    rawPath = rawPath.slice(basePath.length + 1) || '/';
  }
  const cleanPathname = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '');

  const searchStr = input.search || (input.pathname.includes('?') ? input.pathname.slice(input.pathname.indexOf('?')) : '');
  const params = new URLSearchParams(searchStr);

  const lang = normalizeLanguageCode(params.get('lang') || input.defaultLang || 'en');
  const siteTitle = (TRANSLATIONS[lang] || TRANSLATIONS.en).siteTitle;
  const locale = OG_LOCALE_MAP[lang] || 'en_IN';

  // Check if path is `/share/<itemId>` or `/<route>/<itemId>`
  let itemIdFromPath: string | null = null;
  let routePathname = cleanPathname;

  const shareMatch = cleanPathname.match(/^\/share\/([^/]+)$/i);
  if (shareMatch) {
    itemIdFromPath = decodeURIComponent(shareMatch[1]);
    routePathname = '/';
  } else {
    const twoSegMatch = cleanPathname.match(/^(\/[a-z0-9-]+)\/([^/]+)$/i);
    if (twoSegMatch) {
      const baseSeg = ROUTE_ALIASES[twoSegMatch[1]] || twoSegMatch[1];
      if (ROUTE_SEO_DEFINITIONS[baseSeg]) {
        routePathname = baseSeg;
        itemIdFromPath = decodeURIComponent(twoSegMatch[2]);
      }
    }
  }

  // Extract item ID from query parameters or path segment
  const candidateItemId =
    params.get('article') ||
    params.get('figure') ||
    params.get('person') ||
    params.get('id') ||
    itemIdFromPath;

  if (candidateItemId) {
    const matchedItem = resolveItemMetadataById(candidateItemId, lang, input.extraArticles);
    if (matchedItem) {
      const { ogImagePath, rawArchiveImagePath } = toOgPreviewImagePath(
        matchedItem.rawImagePath,
        'monographs'
      );
      const queryParts = [`${matchedItem.queryKey}=${encodeURIComponent(matchedItem.itemId)}`];
      if (lang !== 'en' || params.has('lang')) {
        queryParts.push(`lang=${encodeURIComponent(lang)}`);
      }
      const canonicalPath = `${matchedItem.canonicalRoute}?${queryParts.join('&')}`;
      return {
        title: matchedItem.title,
        description: matchedItem.description,
        imagePath: ogImagePath,
        imageUrl: toAbsoluteHttpsUrl(ogImagePath, origin, basePath),
        rawArchiveImagePath,
        imageAlt: matchedItem.imageAlt,
        imageWidth: 1200,
        imageHeight: 630,
        imageType: 'image/jpeg',
        canonicalPath,
        canonicalUrl: toAbsoluteHttpsUrl(canonicalPath, origin, basePath),
        ogType: matchedItem.ogType,
        siteName: siteTitle,
        locale,
        language: lang,
        section: matchedItem.section,
        keywords: matchedItem.keywords,
        itemId: matchedItem.itemId
      };
    }
  }

  // Resolve route-level metadata
  const canonicalRouteKey = ROUTE_ALIASES[routePathname] || routePathname;
  const routeDef = ROUTE_SEO_DEFINITIONS[canonicalRouteKey] || ROUTE_SEO_DEFINITIONS['/'];
  const effectiveRoutePath = ROUTE_SEO_DEFINITIONS[canonicalRouteKey] ? canonicalRouteKey : '/';

  const { ogImagePath, rawArchiveImagePath } = toOgPreviewImagePath(routeDef.rawImagePath, 'home');
  const langQuery = lang !== 'en' || params.has('lang') ? `?lang=${encodeURIComponent(lang)}` : '';
  const canonicalPath = `${effectiveRoutePath}${langQuery}`;

  return {
    title: routeDef.title(lang),
    description: routeDef.description(lang),
    imagePath: ogImagePath,
    imageUrl: toAbsoluteHttpsUrl(ogImagePath, origin, basePath),
    rawArchiveImagePath,
    imageAlt: routeDef.imageAlt,
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/jpeg',
    canonicalPath,
    canonicalUrl: toAbsoluteHttpsUrl(canonicalPath, origin, basePath),
    ogType: 'website',
    siteName: siteTitle,
    locale,
    language: lang,
    section: routeDef.section,
    keywords: routeDef.keywords
  };
}

export function escapeHtmlAttr(value: string): string {
  return (value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Injects dynamic Open Graph, Twitter Card, Canonical, Title, Description,
 * and Schema.org JSON-LD tags into an `index.html` template string.
 * Used by both `server.ts` (live SSR metadata injection) and `scripts/prerender-seo.ts` (static build generation).
 */
export function injectSeoMetadataIntoHtml(
  htmlTemplate: string,
  meta: ResolvedSeoMetadata
): string {
  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeImgUrl = escapeHtmlAttr(meta.imageUrl);
  const safeImgAlt = escapeHtmlAttr(meta.imageAlt);
  const safeCanonicalUrl = escapeHtmlAttr(meta.canonicalUrl);
  const safeSiteName = escapeHtmlAttr(meta.siteName);
  const safeKeywords = escapeHtmlAttr(meta.keywords.join(', '));

  const dynamicHeadBlock = `
    <title>${safeTitle}</title>
    <meta name="description" content="${safeDesc}" />
    <meta name="keywords" content="${safeKeywords}" />
    <link rel="canonical" href="${safeCanonicalUrl}" />

    <!-- Open Graph / WhatsApp / Facebook / Telegram / LinkedIn -->
    <meta property="og:type" content="${meta.ogType}" />
    <meta property="og:site_name" content="${safeSiteName}" />
    <meta property="og:locale" content="${meta.locale}" />
    <meta property="og:url" content="${safeCanonicalUrl}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${safeImgUrl}" />
    <meta property="og:image:secure_url" content="${safeImgUrl}" />
    <meta property="og:image:type" content="${meta.imageType}" />
    <meta property="og:image:width" content="${meta.imageWidth}" />
    <meta property="og:image:height" content="${meta.imageHeight}" />
    <meta property="og:image:alt" content="${safeImgAlt}" />

    <!-- Twitter / X Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${safeImgUrl}" />
    <meta name="twitter:image:alt" content="${safeImgAlt}" />
  `.trim();

  let updated = htmlTemplate;

  // Replace HTML lang attribute if needed
  updated = updated.replace(/<html\s+lang="[^"]*"/i, `<html lang="${meta.language}"`);

  // Remove existing title, description, keywords, canonical, og:*, and twitter:* tags so there are zero duplicates
  updated = updated
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']keywords["'][^>]*>/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '');

  // Insert our fresh block right after <meta name="viewport" ... />
  if (/<meta\s+name=["']viewport["'][^>]*>/i.test(updated)) {
    updated = updated.replace(
      /(<meta\s+name=["']viewport["'][^>]*>)/i,
      `$1\n    ${dynamicHeadBlock}`
    );
  } else {
    updated = updated.replace(/<\/head>/i, `  ${dynamicHeadBlock}\n  </head>`);
  }

  return updated;
}

/**
 * Returns all canonical routes and item IDs for static HTML prerendering during `npm run build`.
 */
export function getAllPrerenderTargets(): Array<{
  routePath: string;
  itemId?: string;
  queryKey?: string;
}> {
  const targets: Array<{ routePath: string; itemId?: string; queryKey?: string }> = [];

  // 1. All primary routes and aliases
  const allRoutes = [
    ...Object.keys(ROUTE_SEO_DEFINITIONS),
    ...Object.keys(ROUTE_ALIASES)
  ];
  for (const r of allRoutes) {
    targets.push({ routePath: r });
  }

  // 2. All canonical articles
  for (const art of getAllArticles('en')) {
    targets.push({ routePath: '/research', itemId: art.id, queryKey: 'article' });
    if (art.slug) {
      targets.push({ routePath: '/research', itemId: art.slug, queryKey: 'article' });
    }
  }

  // 3. All documented historical figures
  for (const fig of getAllDocumentedFigures('en')) {
    targets.push({ routePath: '/kings-queens', itemId: fig.id, queryKey: 'figure' });
  }

  // 4. All prominent persons + aliases
  for (const person of PROMINENT_PERSONS) {
    targets.push({ routePath: '/community-prominent-persons', itemId: person.id, queryKey: 'id' });
  }
  for (const alias of Object.keys(PROMINENT_PERSON_ALIASES)) {
    targets.push({ routePath: '/community-prominent-persons', itemId: alias, queryKey: 'id' });
  }

  // 5. All community heritage items (16 directory items, 9 professions, 15 synonyms, 7 regions, 8 monograph sections)
  for (const item of COMMUNITY_DIRECTORY_ITEMS) {
    targets.push({ routePath: '/community-heritage', itemId: item.id, queryKey: 'id' });
  }
  for (const prof of COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES) {
    targets.push({ routePath: '/community-heritage', itemId: prof.id, queryKey: 'id' });
  }
  for (const syn of COMMUNITY_SYNONYMS) {
    targets.push({ routePath: '/community-heritage', itemId: syn.id, queryKey: 'id' });
  }
  for (const geo of GEOGRAPHICAL_SPREAD) {
    targets.push({ routePath: '/community-heritage', itemId: geo.id, queryKey: 'id' });
  }
  for (const mono of HISTORICAL_MONOGRAPH_SECTIONS) {
    targets.push({ routePath: '/community-heritage', itemId: mono.id, queryKey: 'id' });
  }

  // 6. All inscriptions, documents, timeline events, monuments, locations, gallery
  for (const insc of getCanonicalInscriptions('en')) {
    targets.push({ routePath: '/inscriptions', itemId: insc.id, queryKey: 'id' });
  }
  for (const doc of getCanonicalDocuments('en')) {
    targets.push({ routePath: '/documents', itemId: doc.id, queryKey: 'id' });
  }
  for (const ev of getCanonicalTimelineEvents('en')) {
    targets.push({ routePath: '/timeline', itemId: ev.id, queryKey: 'id' });
  }
  for (const mon of getCanonicalMonuments('en')) {
    targets.push({ routePath: '/temples-monuments', itemId: mon.id, queryKey: 'id' });
  }
  for (const loc of getCanonicalLocations('en')) {
    targets.push({ routePath: '/maps', itemId: loc.id, queryKey: 'id' });
  }
  for (const gal of getCanonicalGallery('en')) {
    targets.push({ routePath: '/gallery', itemId: gal.id, queryKey: 'id' });
  }

  return targets;
}
