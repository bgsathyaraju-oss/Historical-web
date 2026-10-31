import { CANONICAL_ARTICLES } from '../data/articlesRepository';
import {
  PROMINENT_PERSONS,
  EXTENDED_PERSON_DIRECTORY_META,
  SEARCHABLE_COMMUNITY_LABELS
} from '../data/communityProminentPersonsData';
import { DOCUMENTED_FIGURES_REPO } from '../data/documentedFiguresRepository';
import { HISTORICAL_FIGURES, COMMUNITY_SYNONYMS } from '../data/historyContent';
import {
  COMMUNITY_DIRECTORY_ITEMS,
  COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES
} from '../data/communityHeritageDirectoryData';
import { COMMUNITY_HERITAGE_DETAILED_ARTICLES } from '../data/communityHeritageArticlesData';
import {
  MASTER_70_REFERENCE_REGISTRY,
  REFERENCE_70_UI_LABELS,
  matchReference70Terms
} from '../data/communityReference70Registry';
import {
  ARTICLE_TRANSLATIONS,
  FIGURE_TRANSLATIONS,
  INSCRIPTION_TRANSLATIONS
} from '../../server/contentTranslations';
import { KALINGA_WAR_CONTENT } from '../data/kalingaWarData';
import type { LanguageCode } from '../types';

export interface SearchResultItem {
  type: 'Article' | 'Historical Monarch' | 'Community Prominent Person' | 'Royal Progenitor' | 'Community Lineage' | 'Epigraphic Inscription' | 'Directory';
  id: string;
  title: string;
  subtitle: string;
  snippet: string;
  verification_status?: string;
  link: string;
  category?: string;
  article_id?: string;
}

// Unicode NFC normalizer
function norm(str?: string | null): string {
  if (!str) return '';
  return str.normalize('NFC').trim().toLowerCase();
}

// Extract contextual snippet around query match
function extractSnippet(content: string, query: string, fallback: string): string {
  if (!content) return fallback;
  const nContent = norm(content);
  const nQuery = norm(query);
  const idx = nContent.indexOf(nQuery);
  if (idx === -1) {
    return content.length > 170 ? content.substring(0, 170).trim() + '...' : content;
  }
  const start = Math.max(0, idx - 45);
  const end = Math.min(content.length, idx + nQuery.length + 95);
  let snippet = content.substring(start, end).trim();
  if (start > 0) snippet = '...' + snippet;
  if (end < content.length) snippet = snippet + '...';
  return snippet;
}

export function performClientSearch(
  rawQuery: string,
  filterType: 'all' | 'articles' | 'figures' | 'community' | 'inscriptions' | 'members' = 'all',
  currentLang: LanguageCode = 'en'
): SearchResultItem[] {
  const query = norm(rawQuery);
  if (!query) return [];

  const terms = query.split(/\s+/).filter(Boolean);
  const results: SearchResultItem[] = [];
  const matched70Entries = matchReference70Terms(rawQuery);
  const matchedProminentLabelIds = new Set(
    matched70Entries.flatMap(entry => entry.relatedProminentLabelIds)
  );
  const matchedHeritageIds = new Set(
    matched70Entries.flatMap(entry => entry.relatedHeritageIds)
  );
  const refUi = REFERENCE_70_UI_LABELS[currentLang] || REFERENCE_70_UI_LABELS.en;

  const matchesAny = (...texts: (string | null | undefined)[]): boolean => {
    return texts.some(txt => {
      if (!txt) return false;
      const n = norm(txt);
      if (n.includes(query)) return true;
      return terms.length > 1 && terms.every(t => n.includes(t));
    });
  };

  // 0. 74-Name Master Reference & Search Alias Cross-Reference Index (45 Original + 29 Supplementary)
  if (filterType === 'all' || filterType === 'community' || filterType === 'articles') {
    matched70Entries.forEach(refEntry => {
      const displayLabel = refEntry.localizedLabel[currentLang] || refEntry.localizedLabel.en;
      const classLabel =
        refUi.classifications[refEntry.classification] || refEntry.classification;
      const datasetBadge =
        refEntry.datasetGroup === 'original_45'
          ? refUi.original45Badge
          : refUi.supplementary25Badge;
      const contextText =
        refEntry.historicalContextNote[currentLang] || refEntry.historicalContextNote.en;

      results.push({
        type: 'Community Lineage',
        id: refEntry.id,
        title: `${displayLabel}${displayLabel !== refEntry.canonicalTerm ? ` (${refEntry.canonicalTerm})` : ''}`,
        subtitle: `${classLabel} • ${datasetBadge} (#${refEntry.order}/${MASTER_70_REFERENCE_REGISTRY.length})`,
        snippet: contextText,
        verification_status: refEntry.requiresVerification
          ? refUi.requiresVerificationBadge
          : refEntry.verificationStatus,
        link: refEntry.primaryTargetLink,
        category: refEntry.classification
      });
    });
  }

  // 1. Articles & Monographs (includes all titles, headings, and full text in 8 languages)
  if (filterType === 'all' || filterType === 'articles') {
    CANONICAL_ARTICLES.forEach(art => {
      const artTrans = ARTICLE_TRANSLATIONS[art.id] || {};
      
      const origMatch = matchesAny(
        art.original_title,
        art.summary,
        art.original_content,
        art.category,
        art.author_name,
        ...(art.tags || [])
      );

      let transMatch = false;
      let matchedLang: LanguageCode | null = null;
      let matchedSnippet = '';

      for (const [lKey, tData] of Object.entries(artTrans)) {
        if (!tData) continue;
        if (matchesAny(tData.title, tData.summary, tData.content)) {
          transMatch = true;
          matchedLang = lKey as LanguageCode;
          if (matchesAny(tData.content)) {
            matchedSnippet = extractSnippet(tData.content, query, tData.summary);
          }
          break;
        }
      }

      if (origMatch || transMatch) {
        const preferredLang = (artTrans[currentLang] ? currentLang : matchedLang) || currentLang;
        const transObj = artTrans[preferredLang];
        const displayTitle = transObj?.title || art.original_title;
        const fallbackSummary = transObj?.summary || art.summary;
        const displaySnippet = matchedSnippet || extractSnippet(art.original_content, query, fallbackSummary);

        results.push({
          type: 'Article',
          id: art.id,
          title: displayTitle,
          subtitle: `${art.category} • ${art.publication_date}`,
          snippet: displaySnippet,
          verification_status: art.verification_status,
          link: `/documentary?article=${art.id}`,
          category: art.category,
          article_id: art.id
        });
      }
    });

    // Kalinga War Documentary Page (all 8 languages)
    const kwCurrent = KALINGA_WAR_CONTENT[currentLang] || KALINGA_WAR_CONTENT.en;
    const kwAllTexts = Object.values(KALINGA_WAR_CONTENT).flatMap(kw => [
      kw.pageTitle,
      kw.subtitle,
      kw.introParagraph,
      kw.sections.background.title,
      kw.sections.background.p1,
      kw.sections.battle.title,
      kw.sections.tragedy.title,
      kw.sections.remorse.title,
      kw.sections.legacy.title,
      ...kw.scenes.map(s => `${s.title} ${s.narrative}`)
    ]);
    if (matchesAny('kalinga war', 'ashoka', 'dhauli', 'jaugada', '261 bce', 'rock edict xiii', ...kwAllTexts)) {
      results.push({
        type: 'Article',
        id: 'kalinga_war_261_bce',
        title: kwCurrent.pageTitle,
        subtitle: kwCurrent.badge,
        snippet: extractSnippet(kwCurrent.introParagraph, query, kwCurrent.subtitle),
        verification_status: 'Published',
        link: '/kalinga-war',
        category: 'Ancient Kalinga'
      });
    }
  }

  // 2. Community Prominent Persons (all 20 historical figures across 32 branches, 45 community labels, and 70-name aliases)
  if (filterType === 'all' || filterType === 'figures' || filterType === 'community') {
    PROMINENT_PERSONS.forEach(p => {
      const extMeta = EXTENDED_PERSON_DIRECTORY_META[p.id];
      const allNames = Object.values(p.name);
      const allTitles = Object.values(p.titles);
      const allSummaries = Object.values(p.summary);
      const allBios = Object.values(p.biography);
      const branchesStr = p.branches.join(' ');
      const eraStr = Object.values(p.era).join(' ');
      const regionStr = Object.values(p.region).join(' ');
      const altNames = extMeta?.alternativeNames || [];
      const commLabels = (extMeta?.communityLabels || []).flatMap(lblId => {
        const foundLbl = SEARCHABLE_COMMUNITY_LABELS.find(l => l.id === lblId);
        return foundLbl ? [foundLbl.canonicalName, ...Object.values(foundLbl.label)] : [];
      });

      const isAliasMatch = Boolean(
        extMeta?.communityLabels.some(lblId => matchedProminentLabelIds.has(lblId))
      );

      const isMatch =
        isAliasMatch ||
        matchesAny(
          ...allNames,
          ...altNames,
          ...commLabels,
          ...allTitles,
          ...allSummaries,
          ...allBios,
          branchesStr,
          eraStr,
          regionStr,
          p.badge,
          ...(p.evidenceSources || [])
        );

      if (isMatch) {
        const displayName = p.name[currentLang] || p.name.en;
        const displayTitle = p.titles[currentLang] || p.titles.en;
        const displayBio = p.biography[currentLang] || p.biography.en;
        const displaySummary = p.summary[currentLang] || p.summary.en;

        results.push({
          type: 'Community Prominent Person',
          id: p.id,
          title: displayName,
          subtitle: `${displayTitle} • ${p.era[currentLang] || p.era.en}`,
          snippet: extractSnippet(displayBio, query, displaySummary),
          verification_status: 'Documented Primary Heritage',
          link: `/community-prominent-persons?id=${p.id}`
        });
      }
    });
  }

  // 3. Documented Historical Figures (Gajapathi Rulers, Kings & Queens)
  if (filterType === 'all' || filterType === 'figures') {
    DOCUMENTED_FIGURES_REPO.forEach(fig => {
      const figTrans = FIGURE_TRANSLATIONS[fig.id] || {};
      const allNames = Object.values(fig.name);
      const allTitles = Object.values(fig.known_titles).flat();
      const allDynasties = Object.values(fig.dynasty_name);
      const allReigns = Object.values(fig.reign_period);
      const allBios = Object.values(fig.biography);
      const allSignificances = Object.values(fig.historical_significance);

      const origMatch = matchesAny(
        ...allNames,
        ...(fig.alternate_names || []),
        ...allTitles,
        ...allDynasties,
        ...allReigns,
        ...allBios,
        ...allSignificances
      );

      let transMatch = false;
      let matchedLang: LanguageCode | null = null;
      for (const [lKey, tData] of Object.entries(figTrans)) {
        if (!tData) continue;
        if (
          matchesAny(
            tData.name,
            tData.biography,
            tData.dynasty_name,
            tData.summary,
            tData.historical_significance,
            ...(tData.known_titles || [])
          )
        ) {
          transMatch = true;
          matchedLang = lKey as LanguageCode;
          break;
        }
      }

      if (origMatch || transMatch) {
        const preferredLang = (figTrans[currentLang] ? currentLang : matchedLang) || currentLang;
        const tObj = figTrans[preferredLang];
        const displayTitle = tObj?.name || fig.name[currentLang] || fig.name.en;
        const displayBio = tObj?.biography || fig.biography[currentLang] || fig.biography.en;
        const displayDynasty = tObj?.dynasty_name || fig.dynasty_name[currentLang] || fig.dynasty_name.en;
        const displayReign = fig.reign_period[currentLang] || fig.reign_period.en;

        results.push({
          type: 'Historical Monarch',
          id: fig.id,
          title: displayTitle,
          subtitle: `${displayDynasty} (${displayReign})`,
          snippet: extractSnippet(displayBio, query, displayBio.substring(0, 160) + '...'),
          verification_status: fig.evidence_status || 'Documented Epigraphy',
          link: `/kings-queens?figure=${fig.id}`
        });
      }
    });

    // 4. Foundational Sacred Progenitors
    HISTORICAL_FIGURES.forEach(fig => {
      const allNames = Object.values(fig.localized_name || {});
      const allTitles = Object.values(fig.titles || {});
      const allSummaries = Object.values(fig.summary || {});
      const allNarratives = Object.values(fig.detailed_narrative || {});

      const isMatch = matchesAny(
        fig.canonical_name,
        ...(fig.alternate_names || []),
        fig.dynasty_lineage,
        ...(fig.associated_places || []),
        ...allNames,
        ...allTitles,
        ...allSummaries,
        ...allNarratives
      );

      if (isMatch) {
        const name = fig.localized_name?.[currentLang] || fig.canonical_name;
        const summary = fig.summary?.[currentLang] || fig.summary?.en || '';
        const narrative = fig.detailed_narrative?.[currentLang] || fig.detailed_narrative?.en || summary;

        results.push({
          type: 'Royal Progenitor',
          id: fig.id,
          title: name,
          subtitle: `${fig.dynasty_lineage} (${fig.reign_or_dates || fig.era})`,
          snippet: extractSnippet(narrative, query, summary),
          verification_status: fig.epigraphic_status,
          link: `/historical-persons?figure=${fig.id}`
        });
      }
    });
  }

  // 5. Community Directory (16 Items), Synonyms (15 Items) & Professional Heritage Categories (9 Items)
  if (filterType === 'all' || filterType === 'community' || filterType === 'articles') {
    COMMUNITY_DIRECTORY_ITEMS.forEach(entry => {
      const detailed = COMMUNITY_HERITAGE_DETAILED_ARTICLES.find(a => a.id === entry.id);
      const allLocNames = Object.values(entry.localizedName || {});
      const allOverviews = Object.values(entry.overview || {});
      const allGeo = Object.values(entry.geographicalSpread || {});
      const allScripts = Object.values(entry.nativeScripts || {});
      const allKeywords = detailed?.relatedKeywords || [];

      const isMatch =
        matchedHeritageIds.has(entry.id) ||
        matchesAny(
          entry.canonicalName,
          entry.categoryGroup,
          ...allLocNames,
          ...allOverviews,
          ...allGeo,
          ...allScripts,
          ...entry.prominentStates,
          ...allKeywords
        );

      if (isMatch) {
        const locName = entry.localizedName[currentLang] || entry.localizedName.en;
        const locGroup = entry.localizedCategoryGroup[currentLang] || entry.localizedCategoryGroup.en;
        const locOverview = entry.overview[currentLang] || entry.overview.en;
        const locEpistemic = entry.epistemicClassification[currentLang] || entry.epistemicClassification.en;

        results.push({
          type: 'Community Lineage',
          id: entry.id,
          title: `#${entry.orderNumber} ${locName}${locName !== entry.canonicalName ? ` (${entry.canonicalName})` : ''}`,
          subtitle: `${locGroup} • ${entry.geographicalSpread[currentLang] || entry.geographicalSpread.en}`,
          snippet: extractSnippet(locOverview, query, locOverview),
          verification_status: locEpistemic,
          link: `/community-heritage?tab=synonyms&id=${entry.id}`
        });
      }
    });

    COMMUNITY_SYNONYMS.forEach(syn => {
      const allScripts = Object.values(syn.native_scripts || {});
      const allRoles = Object.values(syn.historical_role || {});
      
      const isMatch =
        matchedHeritageIds.has(syn.id) ||
        matchesAny(
          syn.title,
          ...allScripts,
          syn.category,
          ...(syn.primary_regions || []),
          ...(syn.prominent_states || []),
          syn.linguistic_origin,
          ...allRoles,
          ...(syn.sacred_associations || [])
        );

      if (isMatch) {
        const roleDesc = syn.historical_role?.[currentLang] || syn.historical_role?.en || syn.primary_regions.join(', ');
        results.push({
          type: 'Community Lineage',
          id: syn.id,
          title: syn.title,
          subtitle: `${syn.category} • ${syn.linguistic_origin}`,
          snippet: extractSnippet(roleDesc, query, roleDesc),
          verification_status: 'Verified Epigraphic Form',
          link: `/community-heritage?tab=synonyms&id=${syn.id}`
        });
      }
    });

    COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.forEach(cat => {
      const allTitles = Object.values(cat.title || {});
      const allSummaries = Object.values(cat.shortSummary || {});
      const allDefs = Object.values(cat.definitionAndExplanation || {});
      const allSubNames = cat.includedSubClassifications.flatMap(sc => [
        ...Object.values(sc.name || {}),
        ...Object.values(sc.description || {})
      ]);

      const isMatch =
        matchedHeritageIds.has(cat.id) ||
        matchesAny(
          ...allTitles,
          ...allSummaries,
          ...allDefs,
          ...allSubNames,
          ...(cat.relatedKeywords || [])
        );

      if (isMatch) {
        const displayTitle = cat.title[currentLang] || cat.title.en;
        const displaySummary = cat.shortSummary[currentLang] || cat.shortSummary.en;
        results.push({
          type: 'Directory',
          id: cat.id,
          title: `${cat.categoryNumber}. ${displayTitle}`,
          subtitle: 'Professional & Traditional Heritage Category',
          snippet: extractSnippet(displaySummary, query, displaySummary),
          verification_status: 'Documented Ethnographic & Historical Heritage',
          link: `/community-heritage?tab=professions&id=${cat.id}`
        });
      }
    });
  }

  // 6. Epigraphic Inscriptions
  if (filterType === 'all' || filterType === 'inscriptions') {
    for (const [inscrId, transMap] of Object.entries(INSCRIPTION_TRANSLATIONS)) {
      if (!transMap) continue;
      const tObj = transMap[currentLang] || transMap.en;
      if (!tObj) continue;

      const title = tObj.title || tObj.name || inscrId;
      const desc = tObj.summary || tObj.biography || tObj.historical_significance || '';
      const ruler = tObj.ruler || tObj.patron_ruler || 'Royal Inscription';
      const loc = tObj.location || '';

      const isMatch = matchesAny(
        inscrId,
        title,
        desc,
        ruler,
        loc
      );

      if (isMatch) {
        results.push({
          type: 'Epigraphic Inscription',
          id: inscrId,
          title,
          subtitle: `${ruler}${loc ? ' • ' + loc : ''}`,
          snippet: extractSnippet(desc, query, desc.substring(0, 160) + '...'),
          verification_status: 'Primary Epigraphic Proof',
          link: `/inscriptions?id=${inscrId}`
        });
      }
    }
  }

  // Deduplicate results by id and type
  const seen = new Set<string>();
  const uniqueResults: SearchResultItem[] = [];
  for (const item of results) {
    const key = `${item.type}:${item.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueResults.push(item);
    }
  }

  return uniqueResults;
}

