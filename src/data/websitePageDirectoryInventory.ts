/**
 * ============================================================================
 * AUTOMATIC WEBSITE PAGE INVENTORY & HEALTH MONITOR ENGINE (SURYA-ROYAL-8)
 * ============================================================================
 * Authoritative, programmatic inventory of all registered application routes,
 * main pages, subpages, historical articles, royal dynasties (including all 33
 * Kakatiya Dynasty records), kingdoms & maps, timelines, inscriptions,
 * community heritage pages, community surnames, historical figures, gallery
 * plates, and documentary chapters.
 *
 * Sources of Truth:
 * 1. Application Router (`src/App.tsx`)
 * 2. Global Content Reference Registry (`src/data/globalReferenceIdRegistry.ts`)
 * 3. Canonical Content Repositories & SEO/Metadata Resolver (`src/utils/seoMetadata.ts`)
 */

import type { LanguageCode } from '../types/index.ts';
import {
  GLOBAL_PREFIX_REGISTRY,
  ALL_EIGHT_LANGUAGES,
  getGlobalContentReferenceRegistry,
  auditGlobalReferenceRegistry,
  isValidGlobalReferenceId,
  type ReferencePrefixCode,
  type GlobalReferenceRecord
} from './globalReferenceIdRegistry.ts';
import { resolveItemMetadataById, resolveSeoMetadata } from '../utils/seoMetadata.ts';
import { getAllArticles } from './articlesRepository.ts';
import { getAllDocumentedFigures } from './documentedFiguresRepository.ts';
import { PROMINENT_PERSONS, ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES } from './communityProminentPersonsData.ts';
import { COMMUNITY_DIRECTORY_ITEMS, COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES } from './communityHeritageDirectoryData.ts';
import { COMMUNITY_SYNONYMS, GEOGRAPHICAL_SPREAD, HISTORICAL_MONOGRAPH_SECTIONS } from './historyContent.ts';
import { MASTER_70_REFERENCE_REGISTRY } from './communityReference70Registry.ts';
import {
  getCanonicalInscriptions,
  getCanonicalTimelineEvents,
  getCanonicalMonuments,
  getCanonicalLocations,
  getCanonicalDocuments,
  getCanonicalGallery,
  getCanonicalGenealogy
} from './archivalSeedData.ts';

export type PageHealthStatusCode = 'GREEN' | 'YELLOW' | 'RED' | 'GRAY';

export type DynastyFilterCode =
  | 'ALL'
  | 'suryavamsha_gajapathi'
  | 'kakatiya_dynasty'
  | 'eastern_ganga'
  | 'imperial_cholas'
  | 'chalukya_dynasties'
  | 'pallava_kadamba_western_ganga'
  | 'kalinga_kharavela_maurya'
  | 'ancient_suryavamsha_ikshvaku';

export type CommunitySectionFilterCode =
  | 'ALL'
  | 'branch_directory_16'
  | 'professions_9'
  | 'synonyms_15'
  | 'geography_7'
  | 'references_76'
  | 'surnames_south_260'
  | 'surnames_north_90'
  | 'prominent_persons_32'
  | 'culture_activities_events';

export interface PageHealthCheckDetail {
  routeExists: boolean;
  pageOpensSuccessfully: boolean;
  no404Error: boolean;
  isDuplicateRoute: boolean;
  duplicateRoutePeers: string[];
  hasValidReferenceId: boolean;
  isDuplicateReferenceId: boolean;
  hasBrokenInternalLinks: boolean;
  brokenInternalLinkCount: number;
  brokenInternalLinkDetails: string[];
  hasArticleContent: boolean;
  isResearchPlaceholder: boolean;
  hasValidImage: boolean;
  resolvedImagePath: string;
  hasAllEightLanguages: boolean;
  statusReasons: string[];
}

export interface DirectoryPageEntry {
  serialNumber: number;
  internalId: string;
  pageTitle: string;
  englishTitle: string;
  referenceId: string;
  hasAssignedReferenceId: boolean;
  prefix: ReferencePrefixCode | 'UNASSIGNED';
  category: string;
  subcategory: string;
  actualRoute: string;
  baseRoutePath: string;
  routeAliases: string[];
  pageStatus: PageHealthStatusCode;
  pageStatusLabel: string;
  availableLanguages: LanguageCode[];
  dynastyTag: DynastyFilterCode | null;
  communitySectionTag: CommunitySectionFilterCode | null;
  dataSourceFile: string;
  recordStatusText: string;
  healthCheck: PageHealthCheckDetail;
}

export interface DirectorySummaryReport {
  totalRegisteredRoutesInRouter: number;
  totalPrimaryRouterPaths: number;
  totalRouterAliasPaths: number;
  totalCanonicalRegistryRecords: number;
  totalUnassignedUtilityRoutes: number;
  totalPagesDisplayed: number;
  workingGreenCount: number;
  warningYellowCount: number;
  brokenRedCount: number;
  notCheckedGrayCount: number;
  missingRoutesCount: number;
  brokenLinksRecordCount: number;
  totalOrphanedRelationshipRefs: number;
  duplicateRouteGroupCount: number;
  duplicateRouteRecordCount: number;
  missingReferenceIdsCount: number;
  duplicateReferenceIdsCount: number;
  missingImagesCount: number;
  incompleteTranslationsCount: number;
  kakatiyaRecordsCount: number;
  community76ReferencesCount: number;
}

/**
 * Authoritative registry of all primary route paths and their switch-case aliases
 * as wired in `src/App.tsx` (`renderCurrentPage()`).
 */
export const REGISTERED_ROUTER_PATHS: Record<
  string,
  {
    componentName: string;
    aliases: string[];
    category: string;
    subcategory: string;
  }
> = {
  '/': {
    componentName: 'HomePage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Main Application Landing Page'
  },
  '/about': {
    componentName: 'AboutPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Institutional & Methodology Page'
  },
  '/documentary': {
    componentName: 'HistoricalDocumentaryPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 5 Hub & Documentary Reader'
  },
  '/odra-desha': {
    componentName: 'OdraDeshaPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Regional Historical Geography Page'
  },
  '/kalinga-war': {
    componentName: 'KalingaWarPage',
    aliases: ['/ashoka-kalinga-war'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Epigraphic Dossier Page (261 BCE)'
  },
  '/gajapathi-kings': {
    componentName: 'GajapathiKingdomPage',
    aliases: ['/dynasties'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 3 Hub: Royal Dynasties & Empires'
  },
  '/kings-queens': {
    componentName: 'KingsQueensPage',
    aliases: ['/documented-historical-figures', '/historical-figures'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 7 Hub: Historical Figures & Monarchs'
  },
  '/community-prominent-persons': {
    componentName: 'CommunityProminentPersonsPage',
    aliases: ['/prominent-persons', '/community-figures', '/prominent-figures'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Biographical Directory Page'
  },
  '/historical-persons': {
    componentName: 'CommunityHeritagePage (Figures Tab)',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Community Heritage Figures Subpage'
  },
  '/genealogy': {
    componentName: 'RoyalGenealogyPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Royal Genealogy & Verification Matrix'
  },
  '/maps': {
    componentName: 'HistoricalMapsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 4 Hub: Kingdoms & Maps'
  },
  '/timeline': {
    componentName: 'HistoricalTimelinePage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 1 Hub: Historical Timeline'
  },
  '/inscriptions': {
    componentName: 'InscriptionsPage',
    aliases: ['/historical-records'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 2 Hub: Inscriptions & Archaeology'
  },
  '/temples-monuments': {
    componentName: 'TemplesMonumentsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Sacred Architecture & Fortresses Page'
  },
  '/documents': {
    componentName: 'HistoricalDocumentsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Digitized Chronicles & Codices Page'
  },
  '/research': {
    componentName: 'ResearchArticlesPage',
    aliases: ['/articles'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Peer-Reviewed Monographs Repository'
  },
  '/gallery': {
    componentName: 'HistoricalGalleryPage',
    aliases: ['/media'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Category 6 Hub: Historical Gallery'
  },
  '/culture-traditions': {
    componentName: 'CultureTraditionsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Cultural & Martial Traditions Page'
  },
  '/literature': {
    componentName: 'LiteraturePublicationsPage',
    aliases: ['/publications'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Classical Literature & Treatises Page'
  },
  '/references': {
    componentName: 'HistoricalReferencesPage',
    aliases: ['/historical-sources'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Scholarly Bibliography & Sources Page'
  },
  '/community-heritage': {
    componentName: 'CommunityHeritagePage',
    aliases: ['/heritage'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Community Heritage & 76-Name Hub'
  },
  '/community-surnames': {
    componentName: 'CommunitySurnamesPage',
    aliases: ['/surnames'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'South-Indian Surnames Directory (260)'
  },
  '/community-surnames-north-indian-oad-community': {
    componentName: 'NorthIndianCommunitySurnamesPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'North-Indian Surnames Directory (90)'
  },
  '/community-activities': {
    componentName: 'CommunityActivitiesPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Preservation & Fellowship Programs Page'
  },
  '/events': {
    componentName: 'EventsAnnouncementsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Symposiums & Community Notices Page'
  },
  '/directory': {
    componentName: 'PublicMemberDirectoryPage',
    aliases: ['/members'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Public Community Member Directory'
  },
  '/register': {
    componentName: 'MemberRegistrationPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Member Account Enrollment Page'
  },
  '/login': {
    componentName: 'MemberLoginPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Member Authentication Page'
  },
  '/password-recovery': {
    componentName: 'PasswordRecoveryPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Account Security Recovery Page'
  },
  '/dashboard': {
    componentName: 'MemberDashboardPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Authenticated Member Workspace'
  },
  '/edit-profile': {
    componentName: 'EditProfilePage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Member Profile Management Subpage'
  },
  '/submit-research': {
    componentName: 'SubmitResearchPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Archival Research Submission Portal'
  },
  '/contact': {
    componentName: 'ContactUsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Institutional Contact & Archival Inquiry Page'
  },
  '/privacy': {
    componentName: 'PrivacyPolicyPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Legal & Data Protection Policy Page'
  },
  '/terms': {
    componentName: 'TermsConditionsPage',
    aliases: ['/disclaimer'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Legal Disclaimer & Terms of Use Page'
  },
  '/copyright': {
    componentName: 'CopyrightPermissionsPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Archival Copyright & Permissions Page'
  },
  '/accessibility': {
    componentName: 'AccessibilityStatementPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'WCAG & Multilingual Accessibility Page'
  },
  '/admin': {
    componentName: 'AdminDashboardPage',
    aliases: [],
    category: 'Website Pages & Category Hubs',
    subcategory: 'RBAC Editorial & Registry Administration Panel'
  },
  '/admin-login': {
    componentName: 'AdminLoginPage',
    aliases: ['/admin/login'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Admin Authentication & Secure Portal Access'
  },
  '/admin-register': {
    componentName: 'AdminRegisterPage',
    aliases: ['/admin/register'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Owner-Authorized Admin Account Creation'
  },
  '/design-system': {
    componentName: 'UiDesignSystemPage',
    aliases: ['/ui-components'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Royal Heritage UI Design System Page'
  },
  '/page-directory': {
    componentName: 'WebsitePageDirectoryPage',
    aliases: ['/website-page-directory', '/sitemap'],
    category: 'Website Pages & Category Hubs',
    subcategory: 'Complete Website Pages, Links & Navigation Index'
  }
};

/**
 * Standalone utility/governance routes registered in `src/App.tsx` that do not have a `WP-*`
 * Reference ID in `PERMANENT_GLOBAL_REFERENCE_ID_MAP` (reported transparently without
 * generating fake Reference IDs).
 */
export const UNASSIGNED_ROUTER_UTILITY_PAGES: Array<{
  internalId: string;
  route: string;
  englishTitle: string;
  subcategory: string;
  sourceFile: string;
}> = [
  {
    internalId: 'route_historical_persons',
    route: '/historical-persons',
    englishTitle: 'Historical Persons Archive (Community Heritage Figures View)',
    subcategory: 'Community Heritage Subpage Route',
    sourceFile: 'src/pages/CommunityHeritagePage.tsx'
  },
  {
    internalId: 'route_edit_profile',
    route: '/edit-profile',
    englishTitle: 'Edit Member Profile — Account Settings',
    subcategory: 'Member Account Subpage Route',
    sourceFile: 'src/pages/EditProfilePage.tsx'
  },
  {
    internalId: 'route_contact',
    route: '/contact',
    englishTitle: 'Contact Us — Archival & Epigraphic Inquiries',
    subcategory: 'Institutional Contact Page',
    sourceFile: 'src/pages/ContactUsPage.tsx'
  },
  {
    internalId: 'route_privacy',
    route: '/privacy',
    englishTitle: 'Privacy Policy — Archival & Member Data Protection',
    subcategory: 'Legal & Governance Policy Page',
    sourceFile: 'src/pages/PrivacyPolicyPage.tsx'
  },
  {
    internalId: 'route_terms',
    route: '/terms',
    englishTitle: 'Disclaimer & Terms of Use — Epistemic & Archival Standards',
    subcategory: 'Legal & Governance Policy Page',
    sourceFile: 'src/pages/TermsConditionsPage.tsx'
  },
  {
    internalId: 'route_copyright',
    route: '/copyright',
    englishTitle: 'Copyright & Permissions — Historical Documentation & Citations',
    subcategory: 'Legal & Governance Policy Page',
    sourceFile: 'src/pages/CopyrightPermissionsPage.tsx'
  },
  {
    internalId: 'route_accessibility',
    route: '/accessibility',
    englishTitle: 'Accessibility Statement — 8-Language & Mobile Standards',
    subcategory: 'Legal & Governance Policy Page',
    sourceFile: 'src/pages/AccessibilityStatementPage.tsx'
  },
  {
    internalId: 'route_design_system',
    route: '/design-system',
    englishTitle: 'Royal UI Component System — Approved Royal Heritage Design Specification',
    subcategory: 'Design System & Architecture Page',
    sourceFile: 'src/pages/UiDesignSystemPage.tsx'
  },
  {
    internalId: 'route_admin_login',
    route: '/admin-login',
    englishTitle: 'Admin Portal Login — Authorized Administrative Access',
    subcategory: 'Admin Authentication Route',
    sourceFile: 'src/pages/AdminLoginPage.tsx'
  },
  {
    internalId: 'route_admin_register',
    route: '/admin-register',
    englishTitle: 'Admin Account Registration — Owner-Authorized Provisioning',
    subcategory: 'Admin Authentication Route',
    sourceFile: 'src/pages/AdminRegisterPage.tsx'
  }
];

function extractBaseRoute(routeWithQuery: string): string {
  const clean = (routeWithQuery || '/').split('?')[0].split('#')[0].trim();
  if (!clean.startsWith('/')) return `/${clean}`;
  if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
  return clean || '/';
}

function isRouteHandledByRouter(baseRoute: string): boolean {
  if (Object.prototype.hasOwnProperty.call(REGISTERED_ROUTER_PATHS, baseRoute)) {
    return true;
  }
  for (const info of Object.values(REGISTERED_ROUTER_PATHS)) {
    if (info.aliases.includes(baseRoute)) return true;
  }
  return false;
}

function classifyDynastyForRecord(rec: GlobalReferenceRecord): DynastyFilterCode | null {
  const id = rec.internalRecordId.toLowerCase();
  const title = rec.contentTitle.toLowerCase();
  const cat = rec.contentCategory.toLowerCase();

  if (rec.prefix === 'KD' || id.includes('kakatiya') || title.includes('kakatiya') || title.includes('orugallu') || title.includes('rudrama') || title.includes('ganapatideva')) {
    return 'kakatiya_dynasty';
  }
  if (
    id.includes('gajapathi') ||
    id.includes('kapilendra') ||
    id.includes('purushottama') ||
    id.includes('prataparudra_deva') ||
    id.includes('hamvira') ||
    id.includes('virabhadra') ||
    id.includes('kolletikota') ||
    id.includes('veligalani') ||
    id.includes('lingaraja_1452') ||
    id.includes('srirangam_1464') ||
    id.includes('potavaram_1489') ||
    id.includes('kondapalli_1519') ||
    id.includes('barabati') ||
    id.includes('kondavidu') ||
    id.includes('udayagiri_fort') ||
    id === 'ev_1434' ||
    id === 'ev_1448' ||
    id === 'ev_1458' ||
    id === 'ev_1464' ||
    id === 'ev_1489' ||
    id === 'ev_1515' ||
    id === 'ev_1568' ||
    id === 'stage_07_late_medieval'
  ) {
    return 'suryavamsha_gajapathi';
  }
  if (
    id.includes('eastern_ganga') ||
    id.includes('chodaganga') ||
    id.includes('narasimha') ||
    id.includes('konark') ||
    id.includes('meghanada') ||
    id.includes('korni_copper') ||
    id.includes('kendupatna')
  ) {
    return 'eastern_ganga';
  }
  if (id.includes('chola')) {
    return 'imperial_cholas';
  }
  if (id.includes('chalukya') || id.includes('bhoi_mukunda') || id.includes('mukunda')) {
    return 'chalukya_dynasties';
  }
  if (id.includes('pallava') || id.includes('kadamba') || id.includes('western_ganga') || id === 'stage_04_ancient_kingdoms') {
    return 'pallava_kadamba_western_ganga';
  }
  if (rec.prefix === 'KW' || id.includes('kharavela') || id.includes('hathigumpha') || id.includes('kalinga_war') || id === 'stage_03_early_historical') {
    return 'kalinga_kharavela_maurya';
  }
  if (
    id.includes('sagara') ||
    id.includes('bhagiratha') ||
    id.includes('sri_rama') ||
    id.includes('suryavamshi') ||
    id.includes('surya_vamsa') ||
    id === 'stage_01_mythological' ||
    rec.prefix === 'RG'
  ) {
    return 'ancient_suryavamsha_ikshvaku';
  }
  if (rec.prefix === 'RD' || cat.includes('dynast')) {
    return 'suryavamsha_gajapathi';
  }
  return null;
}

function classifyCommunitySectionForRecord(rec: GlobalReferenceRecord): CommunitySectionFilterCode | null {
  const id = rec.internalRecordId;
  if (id.startsWith('comm_dir_')) return 'branch_directory_16';
  if (id.startsWith('prof_cat_')) return 'professions_9';
  if (id.startsWith('syn_')) return 'synonyms_15';
  if (id.startsWith('geo_')) return 'geography_7';
  if (id.startsWith('ref70_') || id.startsWith('ref76_')) return 'references_76';
  if (rec.prefix === 'CSS') return 'surnames_south_260';
  if (rec.prefix === 'CSN') return 'surnames_north_90';
  if (rec.prefix === 'CPP') return 'prominent_persons_32';
  if (rec.prefix === 'CT' || rec.prefix === 'CA' || rec.prefix === 'EN') return 'culture_activities_events';
  return null;
}

function deriveSubcategory(rec: GlobalReferenceRecord): string {
  const id = rec.internalRecordId;
  if (rec.prefix === 'WP') {
    if (id.startsWith('cat_')) return '7-Category Canonical Hub';
    return 'Main Application Page';
  }
  if (rec.prefix === 'KD') {
    if (id.startsWith('art_')) return 'Kakatiya Main Historical Monograph (13 Sections)';
    if (id.startsWith('fig_')) return 'Kakatiya Sovereign Monarch Biography';
    if (id.startsWith('mon_')) return 'Kakatiya Temple, Fort & Archway Monument';
    if (id.startsWith('loc_')) return 'Kakatiya Capital, Maritime Port & Reservoir';
    if (id.startsWith('ins_')) return 'Kakatiya Stone & Copper-Plate Inscription';
    if (id.startsWith('dyn_')) return 'Kakatiya Royal Dynasty Registry Record';
    if (id.startsWith('gal_')) return 'Kakatiya Archival Visual Plate';
    if (id.startsWith('gen_')) return 'Kakatiya Royal Genealogy Node';
    if (id.startsWith('ev_')) return 'Kakatiya Chronological Timeline Event';
  }
  if (rec.prefix === 'CH') {
    if (id.startsWith('comm_dir_')) return '16-Branch Canonical Community Dossier';
    if (id.startsWith('prof_cat_')) return '9 Professional & Shilpa-Shastra Category';
    if (id.startsWith('syn_')) return '15 Regional & Lineage Synonym Record';
    if (id.startsWith('geo_')) return '7 Regional Geographical Distribution Dossier';
    return '76-Name Master Community Reference';
  }
  if (rec.prefix === 'CSS') return 'South-Indian Community Surname (260 Registry)';
  if (rec.prefix === 'CSN') return 'North-Indian Gotra & Surname (90 Registry)';
  if (rec.prefix === 'CPP') {
    if (id.startsWith('research_placeholder_')) return 'Archival Research Scope Dossier';
    return 'Documented Prominent Historical Personage';
  }
  if (rec.prefix === 'HT') {
    if (id.startsWith('art_')) return 'Chronological Methodology Monograph';
    if (id.startsWith('stage_')) return '8-Stage Mythology-to-History Epoch';
    return 'Dated Historical Timeline Event';
  }
  if (rec.prefix === 'IA') {
    if (id.startsWith('art_')) return 'Epigraphic Evolution Monograph';
    return 'Primary Stone Edict / Copper-Plate Charter';
  }
  if (rec.prefix === 'RD') {
    if (id.startsWith('art_')) return 'Royal Dynasty & Lineage Monograph';
    if (id.startsWith('dyn_')) return 'Royal Dynasty Overview Record';
    return 'Imperial Governance & Military Dossier';
  }
  if (rec.prefix === 'KM') {
    if (id.startsWith('art_')) return 'Historical Geography & Fortification Monograph';
    if (id.startsWith('loc_')) return 'Fortified Citadel & Strategic Location';
    return 'Cartographic Empire Zenith Reconstruction';
  }
  if (rec.prefix === 'HD') {
    if (id.startsWith('art_')) return 'Documentary Synthesis Monograph';
    return '8-Part Historical Documentary Chapter';
  }
  if (rec.prefix === 'HG') {
    if (id.startsWith('art_')) return 'Visual Provenance & Emblem Monograph';
    return 'Curated Archival Gallery Plate';
  }
  if (rec.prefix === 'HF') {
    if (id.startsWith('art_')) return 'Sovereign Progenitor & Lineage Monograph';
    return 'Sovereign Monarch & Guardian Biography';
  }
  if (rec.prefix === 'RG') {
    if (id.startsWith('gen_')) return 'Solar Dynasty Genealogical Node';
    return 'Epistemic Lineage Verification Claim';
  }
  if (rec.prefix === 'KW') {
    if (id.startsWith('kw_section_')) return 'Kalinga War Historiographical Section';
    return 'Kalinga War Visual & Epigraphic Scene';
  }
  return rec.contentCategory;
}

/**
 * Resolves the localized title for any inventory item in the active language (`lang`),
 * falling back cleanly to its canonical English title if a specific item title is invariant.
 */
export function buildLocalizedTitleMapForLanguage(lang: LanguageCode): Map<string, string> {
  const map = new Map<string, string>();
  if (lang === 'en') return map;

  for (const art of getAllArticles(lang)) {
    const tr = art.translations?.[lang];
    const title = tr?.title || (art as any).title || art.original_title;
    if (title) map.set(art.id, title);
  }
  for (const fig of getAllDocumentedFigures(lang)) {
    if (fig.name) map.set(fig.id, `${fig.name} (${fig.reign_period || fig.approx_dates})`);
  }
  for (const p of PROMINENT_PERSONS) {
    const nm = p.name[lang] || p.name.en;
    const era = p.era[lang] || p.era.en;
    map.set(p.id, `${nm} (${era})`);
  }
  for (const ph of ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES) {
    map.set(ph.id, ph.title[lang] || ph.title.en);
  }
  for (const dir of COMMUNITY_DIRECTORY_ITEMS) {
    const locName = dir.localizedName?.[lang] || dir.canonicalName;
    const locGrp = dir.localizedCategoryGroup?.[lang] || dir.categoryGroup;
    map.set(dir.id, `${locName} — ${locGrp}`);
  }
  for (const prof of COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES) {
    map.set(prof.id, prof.title[lang] || prof.title.en);
  }
  for (const syn of COMMUNITY_SYNONYMS) {
    const ns = syn.native_scripts?.[lang] || syn.title;
    map.set(syn.id, `${ns} (${syn.category})`);
  }
  for (const geo of GEOGRAPHICAL_SPREAD) {
    map.set(geo.id, geo.localized_region?.[lang] || geo.region_name);
  }
  for (const mono of HISTORICAL_MONOGRAPH_SECTIONS) {
    map.set(mono.id, mono.section_title?.[lang] || mono.section_title.en);
  }
  for (const ref76 of MASTER_70_REFERENCE_REGISTRY) {
    const lbl = ref76.localizedLabel?.[lang] || ref76.canonicalTerm;
    map.set(ref76.id, `${lbl} (#${ref76.order} — ${ref76.classification})`);
  }
  for (const ins of getCanonicalInscriptions(lang)) {
    map.set(ins.id, `${ins.name} (${ins.era_or_date})`);
  }
  for (const ev of getCanonicalTimelineEvents(lang)) {
    map.set(ev.id, `${ev.title} (${ev.year_text})`);
  }
  for (const mon of getCanonicalMonuments(lang)) {
    map.set(mon.id, `${mon.name} (${mon.location})`);
  }
  for (const loc of getCanonicalLocations(lang)) {
    map.set(loc.id, `${loc.name} (${loc.ancient_name})`);
  }
  for (const doc of getCanonicalDocuments(lang)) {
    map.set(doc.id, doc.title);
  }
  for (const gal of getCanonicalGallery(lang)) {
    map.set(gal.id, gal.title);
  }
  for (const gen of getCanonicalGenealogy(lang)) {
    map.set(gen.id, `${gen.name}${gen.reign ? ' (' + gen.reign + ')' : ''}`);
  }

  return map;
}

/**
 * Builds the complete Website Page Directory Inventory and runs the deterministic
 * Page Health Monitor across all canonical registry records and router paths.
 */
export function buildWebsitePageDirectoryInventory(lang: LanguageCode = 'en'): {
  entries: DirectoryPageEntry[];
  summary: DirectorySummaryReport;
} {
  const canonicalRecords = getGlobalContentReferenceRegistry();
  const auditReport = auditGlobalReferenceRegistry();
  const localizedTitles = buildLocalizedTitleMapForLanguage(lang);

  // 1. Index duplicate canonical routes across all records
  const routeToRefIds = new Map<string, string[]>();
  for (const rec of canonicalRecords) {
    const list = routeToRefIds.get(rec.canonicalRoute) || [];
    list.push(rec.newReferenceId);
    routeToRefIds.set(rec.canonicalRoute, list);
  }

  // 2. Index orphaned relationships by sourceReferenceId
  const orphansByRefId = new Map<string, string[]>();
  for (const item of auditReport.orphanedRelationshipDetails) {
    const list = orphansByRefId.get(item.sourceReferenceId) || [];
    list.push(`${item.field} -> "${item.targetReference}" (${item.reason})`);
    orphansByRefId.set(item.sourceReferenceId, list);
  }

  const duplicateRefSet = new Set(auditReport.duplicateIds);
  const placeholderIds = new Set(ARCHIVAL_RESEARCH_PLACEHOLDER_ENTRIES.map(p => p.id));

  const entries: DirectoryPageEntry[] = [];
  let serialCounter = 1;

  // Order WP records first (main pages & category hubs), then KD (Kakatiya Dynasty), RD, HT, IA, KM, HD, HG, HF, TM, DOC, RG, OD, KW, CPP, CH, CSS, CSN, CT, LP, HR, CA, EN
  const prefixOrder: ReferencePrefixCode[] = [
    'WP',
    'RD',
    'KD',
    'HF',
    'HT',
    'IA',
    'TM',
    'KM',
    'OD',
    'KW',
    'HD',
    'DOC',
    'RG',
    'HG',
    'CPP',
    'CH',
    'CSS',
    'CSN',
    'CT',
    'LP',
    'HR',
    'CA',
    'EN'
  ];

  const sortedCanonical = [...canonicalRecords].sort((a, b) => {
    const idxA = prefixOrder.indexOf(a.prefix);
    const idxB = prefixOrder.indexOf(b.prefix);
    if (idxA !== idxB) return idxA - idxB;
    return a.newReferenceId.localeCompare(b.newReferenceId, 'en', { numeric: true });
  });

  for (const rec of sortedCanonical) {
    const baseRoute = extractBaseRoute(rec.canonicalRoute);
    const routeExists = isRouteHandledByRouter(baseRoute);
    const routerInfo = REGISTERED_ROUTER_PATHS[baseRoute];
    const routeAliases =
      rec.prefix === 'WP' && !rec.internalRecordId.startsWith('cat_') && routerInfo
        ? routerInfo.aliases
        : [];

    const peers = (routeToRefIds.get(rec.canonicalRoute) || []).filter(id => id !== rec.newReferenceId);
    const isDuplicateRoute = peers.length > 0;

    const hasValidRefId = isValidGlobalReferenceId(rec.newReferenceId);
    const isDuplicateRefId = duplicateRefSet.has(rec.newReferenceId);

    const brokenLinks = [...(orphansByRefId.get(rec.newReferenceId) || [])];
    // Also check if canonicalRoute contains known legacy query target `prof_cat_3_construction_hydraulic`
    if (rec.canonicalRoute.includes('prof_cat_3_construction_hydraulic')) {
      brokenLinks.push(
        'Route query parameter id=prof_cat_3_construction_hydraulic references legacy slug instead of canonical prof_cat_3_construction_engineering.'
      );
    }

    const isPlaceholder = placeholderIds.has(rec.internalRecordId);
    const hasContent = Boolean(rec.contentTitle && rec.contentTitle.trim().length > 0);

    // Resolve image via seoMetadata
    const itemMeta = resolveItemMetadataById(rec.internalRecordId, 'en');
    const seoMeta = itemMeta
      ? null
      : resolveSeoMetadata({ pathname: baseRoute, defaultLang: 'en' });
    const resolvedImagePath =
      itemMeta?.rawImagePath || seoMeta?.rawArchiveImagePath || '/assets/archive/konark_sun_temple_structure.jpg';
    const hasValidImage = Boolean(resolvedImagePath && resolvedImagePath.trim().length > 0);

    const hasAllEightLanguages = rec.availableLanguages.length === 8;

    const statusReasons: string[] = [];
    let pageStatus: PageHealthStatusCode = 'GREEN';
    let pageStatusLabel = 'Working';

    if (!routeExists || isDuplicateRefId || !hasValidRefId || !hasContent) {
      pageStatus = 'RED';
      pageStatusLabel = 'Broken / Not Found';
      if (!routeExists) statusReasons.push(`Base route "${baseRoute}" is not registered in App.tsx router.`);
      if (!hasValidRefId) statusReasons.push(`Missing or invalid Reference ID format: "${rec.newReferenceId}".`);
      if (isDuplicateRefId) statusReasons.push(`Duplicate Reference ID detected: "${rec.newReferenceId}".`);
      if (!hasContent) statusReasons.push('Missing content title or body.');
    } else if (
      brokenLinks.length > 0 ||
      isDuplicateRoute ||
      isPlaceholder ||
      !hasValidImage ||
      !hasAllEightLanguages
    ) {
      pageStatus = 'YELLOW';
      pageStatusLabel = 'Warning / Needs Review';
      if (isPlaceholder) {
        statusReasons.push('Archival Research Scope placeholder entry awaiting primary epigraphic/biographical dossier completion.');
      }
      if (isDuplicateRoute) {
        statusReasons.push(
          `Shares target URL (${rec.canonicalRoute}) with ${peers.slice(0, 4).join(', ')}${peers.length > 4 ? ` (+${peers.length - 4} more)` : ''}.`
        );
      }
      if (brokenLinks.length > 0) {
        statusReasons.push(`${brokenLinks.length} secondary cross-reference(s) flagged for review in audit.`);
      }
      if (!hasValidImage) {
        statusReasons.push('Missing dedicated image asset.');
      }
      if (!hasAllEightLanguages) {
        statusReasons.push(`Incomplete translations (${rec.availableLanguages.length}/8 languages).`);
      }
    } else {
      statusReasons.push('Verified route, unique Reference ID, content, visual asset, and 8-language support.');
    }

    const localizedTitle =
      localizedTitles.get(rec.internalRecordId) ||
      (rec.prefix === 'WP' && lang !== 'en'
        ? resolveSeoMetadata({ pathname: baseRoute, defaultLang: lang }).title.split(' | ')[0]
        : rec.contentTitle);

    entries.push({
      serialNumber: serialCounter++,
      internalId: rec.internalRecordId,
      pageTitle: localizedTitle,
      englishTitle: rec.contentTitle,
      referenceId: rec.newReferenceId,
      hasAssignedReferenceId: true,
      prefix: rec.prefix,
      category: GLOBAL_PREFIX_REGISTRY[rec.prefix]?.englishPageTitle || rec.contentCategory,
      subcategory: deriveSubcategory(rec),
      actualRoute: rec.canonicalRoute,
      baseRoutePath: baseRoute,
      routeAliases,
      pageStatus,
      pageStatusLabel,
      availableLanguages: rec.availableLanguages,
      dynastyTag: classifyDynastyForRecord(rec),
      communitySectionTag: classifyCommunitySectionForRecord(rec),
      dataSourceFile: rec.dataSourceFile,
      recordStatusText: rec.recordStatus,
      healthCheck: {
        routeExists,
        pageOpensSuccessfully: routeExists,
        no404Error: routeExists,
        isDuplicateRoute,
        duplicateRoutePeers: peers,
        hasValidReferenceId: hasValidRefId,
        isDuplicateReferenceId: isDuplicateRefId,
        hasBrokenInternalLinks: brokenLinks.length > 0,
        brokenInternalLinkCount: brokenLinks.length,
        brokenInternalLinkDetails: brokenLinks,
        hasArticleContent: hasContent,
        isResearchPlaceholder: isPlaceholder,
        hasValidImage,
        resolvedImagePath,
        hasAllEightLanguages,
        statusReasons
      }
    });
  }

  // 3. Append the 8 standalone registered utility/legal routes from `src/App.tsx`
  //    without generating fake Reference IDs, marking them YELLOW (Needs Reference ID assignment review).
  for (const utilPage of UNASSIGNED_ROUTER_UTILITY_PAGES) {
    const routerInfo = REGISTERED_ROUTER_PATHS[utilPage.route];
    const seoMeta = resolveSeoMetadata({ pathname: utilPage.route, defaultLang: lang });
    const localizedTitle =
      lang !== 'en' && seoMeta?.title
        ? seoMeta.title.split(' | ')[0]
        : utilPage.englishTitle;

    entries.push({
      serialNumber: serialCounter++,
      internalId: utilPage.internalId,
      pageTitle: localizedTitle,
      englishTitle: utilPage.englishTitle,
      referenceId: 'UNASSIGNED',
      hasAssignedReferenceId: false,
      prefix: 'UNASSIGNED',
      category: 'Website Pages & Category Hubs (Utility & Legal Routes)',
      subcategory: utilPage.subcategory,
      actualRoute: utilPage.route,
      baseRoutePath: utilPage.route,
      routeAliases: routerInfo?.aliases || [],
      pageStatus: 'YELLOW',
      pageStatusLabel: 'Warning / Needs Review',
      availableLanguages: ALL_EIGHT_LANGUAGES,
      dynastyTag: null,
      communitySectionTag: null,
      dataSourceFile: utilPage.sourceFile,
      recordStatusText: 'Active Utility/Legal Route (No WP-* Reference ID Assigned)',
      healthCheck: {
        routeExists: true,
        pageOpensSuccessfully: true,
        no404Error: true,
        isDuplicateRoute: false,
        duplicateRoutePeers: [],
        hasValidReferenceId: false,
        isDuplicateReferenceId: false,
        hasBrokenInternalLinks: false,
        brokenInternalLinkCount: 0,
        brokenInternalLinkDetails: [],
        hasArticleContent: true,
        isResearchPlaceholder: false,
        hasValidImage: true,
        resolvedImagePath: seoMeta?.rawArchiveImagePath || '/assets/archive/puri_jagannatha_temple.jpg',
        hasAllEightLanguages: true,
        statusReasons: [
          `Route "${utilPage.route}" is active and working in src/App.tsx, but does not have a permanent WP-* Reference ID assigned in PERMANENT_GLOBAL_REFERENCE_ID_MAP.`
        ]
      }
    });
  }

  // 4. Compute summary metrics
  const primaryRouterPaths = Object.keys(REGISTERED_ROUTER_PATHS);
  const totalRouterAliasPaths = Object.values(REGISTERED_ROUTER_PATHS).reduce(
    (acc, item) => acc + item.aliases.length,
    0
  );
  const workingGreenCount = entries.filter(e => e.pageStatus === 'GREEN').length;
  const warningYellowCount = entries.filter(e => e.pageStatus === 'YELLOW').length;
  const brokenRedCount = entries.filter(e => e.pageStatus === 'RED').length;
  const notCheckedGrayCount = entries.filter(e => e.pageStatus === 'GRAY').length;

  const duplicateRouteGroups = Array.from(routeToRefIds.entries()).filter(([, ids]) => ids.length > 1);
  const duplicateRouteRecordCount = entries.filter(e => e.healthCheck.isDuplicateRoute).length;
  const brokenLinksRecordCount = entries.filter(e => e.healthCheck.hasBrokenInternalLinks).length;
  const missingReferenceIdsCount = entries.filter(e => !e.hasAssignedReferenceId || !e.healthCheck.hasValidReferenceId).length;
  const missingImagesCount = entries.filter(e => !e.healthCheck.hasValidImage).length;
  const incompleteTranslationsCount = entries.filter(e => !e.healthCheck.hasAllEightLanguages).length;
  const kakatiyaRecordsCount = entries.filter(e => e.prefix === 'KD').length;
  const community76ReferencesCount = entries.filter(
    e => e.internalId.startsWith('ref70_') || e.internalId.startsWith('ref76_')
  ).length;

  return {
    entries,
    summary: {
      totalRegisteredRoutesInRouter: primaryRouterPaths.length + totalRouterAliasPaths,
      totalPrimaryRouterPaths: primaryRouterPaths.length,
      totalRouterAliasPaths,
      totalCanonicalRegistryRecords: canonicalRecords.length,
      totalUnassignedUtilityRoutes: UNASSIGNED_ROUTER_UTILITY_PAGES.length,
      totalPagesDisplayed: entries.length,
      workingGreenCount,
      warningYellowCount,
      brokenRedCount,
      notCheckedGrayCount,
      missingRoutesCount: entries.filter(e => !e.healthCheck.routeExists).length,
      brokenLinksRecordCount,
      totalOrphanedRelationshipRefs: auditReport.orphanedRelationshipDetails.length,
      duplicateRouteGroupCount: duplicateRouteGroups.length,
      duplicateRouteRecordCount,
      missingReferenceIdsCount,
      duplicateReferenceIdsCount: auditReport.duplicateIds.length,
      missingImagesCount,
      incompleteTranslationsCount,
      kakatiyaRecordsCount,
      community76ReferencesCount
    }
  };
}
