import { Router, type Request, type Response } from 'express';
import { getDb } from '../db.ts';
import type { AuthenticatedRequest } from '../auth.ts';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS
} from '../../src/data/historyContent.ts';
import {
  ARTICLE_TRANSLATIONS,
  FIGURE_TRANSLATIONS,
  INSCRIPTION_TRANSLATIONS,
  MONUMENT_TRANSLATIONS
} from '../contentTranslations.ts';
import type { LanguageCode } from '../../src/types/index.ts';

export const searchRouter = Router();

// Cross-browser Unicode NFC string normalizer
function norm(str?: string | null): string {
  if (!str) return '';
  return str.normalize('NFC').trim().toLowerCase();
}

// Check if any multilingual text field matches the normalized query
function matchMultiText(obj?: Record<string, string | undefined> | null, query?: string): boolean {
  if (!obj || !query) return false;
  return Object.values(obj).some(val => val && norm(val).includes(query));
}

// Get preferred localized string with fallback
function getLocalized(obj?: Record<string, string | undefined> | null, preferredLang = 'en', fallback = ''): string {
  if (!obj) return fallback;
  return obj[preferredLang] || obj['en'] || Object.values(obj).find(v => !!v) || fallback;
}

searchRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const rawQ = typeof req.query.q === 'string' ? req.query.q : '';
  const query = norm(rawQ);
  const filterType = typeof req.query.type === 'string' ? req.query.type.toLowerCase().trim() : 'all';
  const userLang = (typeof req.query.lang === 'string' ? req.query.lang.trim().toLowerCase() : 'en') as LanguageCode;

  if (!query) {
    return res.json({ results: [], query: '', total: 0 });
  }

  const db = getDb();
  const results: any[] = [];
  const isAuth = !!req.user;

  // 1. Search Articles (with full 8-language translations)
  if (filterType === 'all' || filterType === 'articles') {
    db.articles.forEach(art => {
      const artTrans = ARTICLE_TRANSLATIONS[art.id] || {};
      const matchesOrigTitle = norm(art.original_title).includes(query);
      const matchesOrigSummary = norm(art.summary).includes(query);
      const matchesCategory = norm(art.category).includes(query);
      const matchesAuthor = norm(art.author_name).includes(query);
      const matchesTags = art.tags.some(t => norm(t).includes(query));

      let matchedTransLang: LanguageCode | null = null;
      let transMatch = false;

      for (const [lKey, tData] of Object.entries(artTrans)) {
        if (!tData) continue;
        if (
          norm(tData.title).includes(query) ||
          norm(tData.summary).includes(query) ||
          norm(tData.content).includes(query)
        ) {
          transMatch = true;
          matchedTransLang = lKey as LanguageCode;
          break;
        }
      }

      if (matchesOrigTitle || matchesOrigSummary || matchesCategory || matchesAuthor || matchesTags || transMatch) {
        const preferred = (artTrans[userLang] ? userLang : matchedTransLang) || userLang;
        const transObj = artTrans[preferred];
        const displayTitle = transObj?.title || art.original_title;
        const displaySummary = transObj?.summary || art.summary;

        results.push({
          type: 'Article',
          id: art.id,
          slug: art.slug,
          title: displayTitle,
          subtitle: `${art.category} • ${art.publication_date}`,
          snippet: displaySummary,
          verification_status: art.verification_status,
          link: `/documentary?article=${art.id}`,
          category: art.category,
          article_id: art.id
        });
      }
    });
  }

  // 2. Search Historical Figures & Royal Progenitors (with full 8-language translations)
  if (filterType === 'all' || filterType === 'figures') {
    db.figures.forEach(fig => {
      const figTrans = FIGURE_TRANSLATIONS[fig.id] || {};
      const matchesOrig =
        norm(fig.name).includes(query) ||
        fig.alternate_names.some(a => norm(a).includes(query)) ||
        fig.known_titles.some(t => norm(t).includes(query)) ||
        norm(fig.biography).includes(query) ||
        norm(fig.dynasty_name).includes(query);

      let figTransMatch = false;
      let matchedFigLang: LanguageCode | null = null;
      for (const [lKey, tData] of Object.entries(figTrans)) {
        if (!tData) continue;
        if (
          (tData.name && norm(tData.name).includes(query)) ||
          (tData.biography && norm(tData.biography).includes(query)) ||
          (tData.known_titles && tData.known_titles.some(t => norm(t).includes(query)))
        ) {
          figTransMatch = true;
          matchedFigLang = lKey as LanguageCode;
          break;
        }
      }

      if (matchesOrig || figTransMatch) {
        const preferred = (figTrans[userLang] ? userLang : matchedFigLang) || userLang;
        const tObj = figTrans[preferred];
        results.push({
          type: 'Historical Figure',
          id: fig.id,
          title: tObj?.name || fig.name,
          subtitle: `${fig.dynasty_name} (${fig.reign_period})`,
          snippet: (tObj?.biography || fig.biography).substring(0, 160) + '...',
          verification_status: fig.evidence_status,
          link: `/kings-queens?figure=${fig.id}`
        });
      }
    });

    // Foundational Sovereign & Sacred Progenitors
    HISTORICAL_FIGURES.forEach(fig => {
      const match =
        norm(fig.canonical_name).includes(query) ||
        fig.alternate_names.some(a => norm(a).includes(query)) ||
        norm(fig.dynasty_lineage).includes(query) ||
        fig.associated_places.some(p => norm(p).includes(query)) ||
        matchMultiText(fig.localized_name as any, query) ||
        matchMultiText(fig.titles as any, query) ||
        matchMultiText(fig.summary as any, query) ||
        matchMultiText(fig.detailed_narrative as any, query);

      if (match) {
        const title = getLocalized(fig.localized_name as any, userLang, fig.canonical_name);
        const subtitle = `${fig.dynasty_lineage} • ${fig.era}`;
        const snippet = getLocalized(fig.summary as any, userLang, fig.summary.en).substring(0, 160) + '...';

        results.push({
          type: 'Sacred Progenitor',
          id: fig.id,
          title,
          subtitle,
          snippet,
          verification_status: fig.epigraphic_status,
          link: `/community-heritage?tab=figures&figure=${fig.id}`
        });
      }
    });
  }

  // 3. Search Community Synonyms & Sub-Castes (native scripts + translations)
  if (filterType === 'all' || filterType === 'community' || filterType === 'synonyms') {
    COMMUNITY_SYNONYMS.forEach(syn => {
      const match =
        norm(syn.title).includes(query) ||
        norm(syn.category).includes(query) ||
        syn.primary_regions.some(r => norm(r).includes(query)) ||
        syn.prominent_states.some(st => norm(st).includes(query)) ||
        (syn.native_scripts && Object.values(syn.native_scripts).some(ns => norm(ns).includes(query))) ||
        matchMultiText(syn.historical_role as any, query);

      if (match) {
        const snippet = getLocalized(syn.historical_role as any, userLang, syn.historical_role.en).substring(0, 160) + '...';
        results.push({
          type: 'Community Synonym',
          id: syn.id,
          title: syn.title,
          subtitle: `${syn.category} • ${syn.prominent_states.slice(0, 3).join(', ')}`,
          snippet,
          verification_status: 'Documented Community Title',
          link: `/community-heritage?tab=synonyms`
        });
      }
    });
  }

  // 4. Search Pan-Indian Geographical Spread & Corridors
  if (filterType === 'all' || filterType === 'geography' || filterType === 'locations') {
    GEOGRAPHICAL_SPREAD.forEach(reg => {
      const match =
        norm(reg.region_name).includes(query) ||
        matchMultiText(reg.localized_region as any, query) ||
        reg.states_and_territories.some(st => norm(st).includes(query)) ||
        reg.prominent_cities_districts.some(c => norm(c).includes(query)) ||
        reg.predominant_community_synonyms.some(s => norm(s).includes(query)) ||
        matchMultiText(reg.regional_overview as any, query);

      if (match) {
        const title = getLocalized(reg.localized_region as any, userLang, reg.region_name);
        const snippet = getLocalized(reg.regional_overview as any, userLang, reg.regional_overview.en).substring(0, 160) + '...';
        results.push({
          type: 'Geographical Corridor',
          id: reg.id,
          title,
          subtitle: `${reg.states_and_territories.join(', ')}`,
          snippet,
          verification_status: 'Pan-Indian Historical Corridor',
          link: `/community-heritage?tab=geography&region=${reg.id}`
        });
      }
    });
  }

  // 5. Search Historical Monograph Sections
  if (filterType === 'all' || filterType === 'articles' || filterType === 'monographs') {
    HISTORICAL_MONOGRAPH_SECTIONS.forEach(sec => {
      const match =
        matchMultiText(sec.section_title as any, query) ||
        matchMultiText(sec.content as any, query) ||
        sec.key_points.some(kp => norm(kp).includes(query));

      if (match) {
        const title = getLocalized(sec.section_title as any, userLang, sec.section_title.en);
        const snippet = getLocalized(sec.content as any, userLang, sec.content.en).substring(0, 160) + '...';
        results.push({
          type: 'Historical Monograph',
          id: sec.id,
          title,
          subtitle: `Monograph Section ${sec.order}`,
          snippet,
          verification_status: 'Primary Monographic Research',
          link: `/odra-desha`
        });
      }
    });
  }

  // 6. Search Inscriptions (with translations)
  if (filterType === 'all' || filterType === 'inscriptions') {
    db.inscriptions.forEach(insc => {
      const inscTrans = INSCRIPTION_TRANSLATIONS[insc.id] || {};
      const matchOrig =
        norm(insc.name).includes(query) ||
        norm(insc.location_found).includes(query) ||
        norm(insc.ruler).includes(query) ||
        norm(insc.historical_context).includes(query);

      let transMatch = false;
      let matchedLang: LanguageCode | null = null;
      for (const [lKey, tData] of Object.entries(inscTrans)) {
        if (!tData) continue;
        if (
          (tData.name && norm(tData.name).includes(query)) ||
          (tData.location && norm(tData.location).includes(query)) ||
          (tData.summary && norm(tData.summary).includes(query)) ||
          (tData.ruler && norm(tData.ruler).includes(query))
        ) {
          transMatch = true;
          matchedLang = lKey as LanguageCode;
          break;
        }
      }

      if (matchOrig || transMatch) {
        const preferred = (inscTrans[userLang] ? userLang : matchedLang) || userLang;
        const tObj = inscTrans[preferred];
        results.push({
          type: 'Inscription',
          id: insc.id,
          title: tObj?.name || insc.name,
          subtitle: `${tObj?.ruler || insc.ruler} • ${tObj?.location || insc.location_found}`,
          snippet: (tObj?.summary || insc.historical_context).substring(0, 160) + '...',
          verification_status: insc.verification_status,
          link: `/inscriptions?id=${insc.id}`
        });
      }
    });
  }

  // 7. Search Temples & Monuments (with translations)
  if (filterType === 'all' || filterType === 'monuments') {
    db.monuments.forEach(mon => {
      const monTrans = MONUMENT_TRANSLATIONS[mon.id] || {};
      const matchOrig =
        norm(mon.name).includes(query) ||
        norm(mon.location).includes(query) ||
        norm(mon.patron_ruler).includes(query) ||
        norm(mon.historical_significance).includes(query);

      let transMatch = false;
      let matchedLang: LanguageCode | null = null;
      for (const [lKey, tData] of Object.entries(monTrans)) {
        if (!tData) continue;
        if (
          norm(tData.name).includes(query) ||
          norm(tData.location).includes(query) ||
          norm(tData.historical_significance).includes(query)
        ) {
          transMatch = true;
          matchedLang = lKey as LanguageCode;
          break;
        }
      }

      if (matchOrig || transMatch) {
        const preferred = (monTrans[userLang] ? userLang : matchedLang) || userLang;
        const tObj = monTrans[preferred];
        results.push({
          type: 'Temple / Monument',
          id: mon.id,
          title: tObj?.name || mon.name,
          subtitle: `${tObj?.location || mon.location}, ${mon.state} • ${mon.century}`,
          snippet: (tObj?.historical_significance || mon.historical_significance).substring(0, 160) + '...',
          link: `/temples-monuments`
        });
      }
    });
  }

  // 8. Search Historical Locations
  if (filterType === 'all' || filterType === 'locations') {
    db.locations.forEach(loc => {
      if (
        norm(loc.name).includes(query) ||
        norm(loc.ancient_name).includes(query) ||
        norm(loc.summary).includes(query) ||
        norm(loc.region).includes(query)
      ) {
        results.push({
          type: 'Historical Location',
          id: loc.id,
          title: loc.name,
          subtitle: `Ancient Name: ${loc.ancient_name} • Region: ${loc.region}`,
          snippet: loc.summary.substring(0, 160) + '...',
          link: `/maps`
        });
      }
    });
  }

  // 9. Search Documents
  if (filterType === 'all' || filterType === 'documents') {
    db.documents.forEach(doc => {
      if (
        norm(doc.title).includes(query) ||
        norm(doc.author_authority).includes(query) ||
        norm(doc.research_notes).includes(query)
      ) {
        results.push({
          type: 'Historical Document',
          id: doc.id,
          title: doc.title,
          subtitle: `${doc.author_authority} • ${doc.approximate_date}`,
          snippet: doc.research_notes.substring(0, 160) + '...',
          link: `/documents`
        });
      }
    });
  }

  // 10. Search Public Members (Strict Privacy check)
  if (filterType === 'all' || filterType === 'members') {
    db.profiles.forEach(p => {
      if (p.profile_visibility === 'private') return;
      if (p.profile_visibility === 'members' && !isAuth) return;

      if (
        norm(p.full_name).includes(query) ||
        norm(p.district).includes(query) ||
        (p.profession && norm(p.profession).includes(query)) ||
        (p.areas_of_historical_interest && p.areas_of_historical_interest.some(i => norm(i).includes(query)))
      ) {
        results.push({
          type: 'Community Member',
          id: p.user_id,
          title: p.full_name,
          subtitle: `${p.district}, ${p.state_or_province} • ${p.profession || 'Member'}`,
          snippet: p.biography ? p.biography.substring(0, 120) + '...' : 'Verified community member',
          link: `/directory?id=${p.user_id}`
        });
      }
    });
  }

  res.json({
    query,
    total: results.length,
    results
  });
});

