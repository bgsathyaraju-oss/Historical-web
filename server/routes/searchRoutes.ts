import { Router, type Request, type Response } from 'express';
import { getDb } from '../db.ts';
import type { AuthenticatedRequest } from '../auth.ts';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD
} from '../../src/data/historyContent.ts';

export const searchRouter = Router();

searchRouter.get('/', (req: AuthenticatedRequest, res: Response) => {
  const query = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
  const filterType = typeof req.query.type === 'string' ? req.query.type.toLowerCase() : 'all';

  if (!query) {
    return res.json({ results: [], query: '', total: 0 });
  }

  const db = getDb();
  const results: any[] = [];
  const isAuth = !!req.user;

  // Search Articles
  if (filterType === 'all' || filterType === 'articles') {
    db.articles.forEach(art => {
      if (
        art.original_title.toLowerCase().includes(query) ||
        art.summary.toLowerCase().includes(query) ||
        art.category.toLowerCase().includes(query) ||
        art.tags.some(t => t.toLowerCase().includes(query))
      ) {
        results.push({
          type: 'Article',
          id: art.id,
          slug: art.slug,
          title: art.original_title,
          subtitle: art.category + ' • ' + art.publication_date,
          snippet: art.summary,
          verification_status: art.verification_status,
          link: `/documentary?article=${art.id}`
        });
      }
    });
  }

  // Search Historical Figures
  if (filterType === 'all' || filterType === 'figures') {
    db.figures.forEach(fig => {
      if (
        fig.name.toLowerCase().includes(query) ||
        fig.alternate_names.some(a => a.toLowerCase().includes(query)) ||
        fig.known_titles.some(t => t.toLowerCase().includes(query)) ||
        fig.biography.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'Historical Figure',
          id: fig.id,
          title: fig.name,
          subtitle: fig.dynasty_name + ' (' + fig.reign_period + ')',
          snippet: fig.biography.substring(0, 150) + '...',
          verification_status: fig.evidence_status,
          link: `/kings-queens?figure=${fig.id}`
        });
      }
    });

    // Also search Foundational Sovereign & Sacred Figures (Sagara, Bhagiratha, Rama, Jasma, Siddharameshwara, Kharavela)
    HISTORICAL_FIGURES.forEach(fig => {
      const match =
        fig.canonical_name.toLowerCase().includes(query) ||
        fig.alternate_names.some(a => a.toLowerCase().includes(query)) ||
        fig.dynasty_lineage.toLowerCase().includes(query) ||
        fig.associated_places.some(p => p.toLowerCase().includes(query)) ||
        (fig.summary.en && fig.summary.en.toLowerCase().includes(query)) ||
        (fig.titles.en && fig.titles.en.toLowerCase().includes(query));

      if (match) {
        results.push({
          type: 'Sacred Progenitor',
          id: fig.id,
          title: fig.canonical_name,
          subtitle: `${fig.dynasty_lineage} • ${fig.era}`,
          snippet: fig.summary.en.substring(0, 150) + '...',
          verification_status: fig.epigraphic_status,
          link: `/community-heritage?tab=figures&figure=${fig.id}`
        });
      }
    });
  }

  // Search Community Synonyms & Sub-Castes
  if (filterType === 'all' || filterType === 'community' || filterType === 'synonyms') {
    COMMUNITY_SYNONYMS.forEach(syn => {
      const match =
        syn.title.toLowerCase().includes(query) ||
        syn.category.toLowerCase().includes(query) ||
        syn.primary_regions.some(r => r.toLowerCase().includes(query)) ||
        syn.prominent_states.some(st => st.toLowerCase().includes(query)) ||
        (syn.historical_role.en && syn.historical_role.en.toLowerCase().includes(query));

      if (match) {
        results.push({
          type: 'Community Synonym',
          id: syn.id,
          title: syn.title,
          subtitle: `${syn.category} • ${syn.prominent_states.slice(0, 3).join(', ')}`,
          snippet: syn.historical_role.en.substring(0, 150) + '...',
          verification_status: 'Documented Community Title',
          link: `/community-heritage?tab=synonyms`
        });
      }
    });
  }

  // Search Pan-Indian Geographical Spread & Corridors
  if (filterType === 'all' || filterType === 'geography' || filterType === 'locations') {
    GEOGRAPHICAL_SPREAD.forEach(reg => {
      const match =
        reg.region_name.toLowerCase().includes(query) ||
        reg.states_and_territories.some(st => st.toLowerCase().includes(query)) ||
        reg.prominent_cities_districts.some(c => c.toLowerCase().includes(query)) ||
        reg.predominant_community_synonyms.some(s => s.toLowerCase().includes(query)) ||
        (reg.regional_overview.en && reg.regional_overview.en.toLowerCase().includes(query));

      if (match) {
        results.push({
          type: 'Geographical Corridor',
          id: reg.id,
          title: reg.region_name,
          subtitle: `${reg.states_and_territories.join(', ')}`,
          snippet: reg.regional_overview.en.substring(0, 150) + '...',
          verification_status: 'Pan-Indian Historical Corridor',
          link: `/community-heritage?tab=geography&region=${reg.id}`
        });
      }
    });
  }

  // Search Inscriptions
  if (filterType === 'all' || filterType === 'inscriptions') {
    db.inscriptions.forEach(insc => {
      if (
        insc.name.toLowerCase().includes(query) ||
        insc.location_found.toLowerCase().includes(query) ||
        insc.ruler.toLowerCase().includes(query) ||
        insc.historical_context.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'Inscription',
          id: insc.id,
          title: insc.name,
          subtitle: `${insc.ruler} • ${insc.location_found}`,
          snippet: insc.historical_context.substring(0, 150) + '...',
          verification_status: insc.verification_status,
          link: `/inscriptions?id=${insc.id}`
        });
      }
    });
  }

  // Search Monuments
  if (filterType === 'all' || filterType === 'monuments') {
    db.monuments.forEach(mon => {
      if (
        mon.name.toLowerCase().includes(query) ||
        mon.location.toLowerCase().includes(query) ||
        mon.patron_ruler.toLowerCase().includes(query) ||
        mon.historical_significance.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'Temple / Monument',
          id: mon.id,
          title: mon.name,
          subtitle: `${mon.location}, ${mon.state} • ${mon.century}`,
          snippet: mon.historical_significance.substring(0, 150) + '...',
          link: `/temples-monuments`
        });
      }
    });
  }

  // Search Historical Locations
  if (filterType === 'all' || filterType === 'locations') {
    db.locations.forEach(loc => {
      if (
        loc.name.toLowerCase().includes(query) ||
        loc.ancient_name.toLowerCase().includes(query) ||
        loc.summary.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'Historical Location',
          id: loc.id,
          title: loc.name,
          subtitle: `Ancient Name: ${loc.ancient_name} • Region: ${loc.region}`,
          snippet: loc.summary.substring(0, 150) + '...',
          link: `/maps`
        });
      }
    });
  }

  // Search Documents
  if (filterType === 'all' || filterType === 'documents') {
    db.documents.forEach(doc => {
      if (
        doc.title.toLowerCase().includes(query) ||
        doc.author_authority.toLowerCase().includes(query) ||
        doc.research_notes.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'Historical Document',
          id: doc.id,
          title: doc.title,
          subtitle: `${doc.author_authority} • ${doc.approximate_date}`,
          snippet: doc.research_notes.substring(0, 150) + '...',
          link: `/documents`
        });
      }
    });
  }

  // Search Public Members (Strict Privacy check)
  if (filterType === 'all' || filterType === 'members') {
    db.profiles.forEach(p => {
      if (p.profile_visibility === 'private') return;
      if (p.profile_visibility === 'members' && !isAuth) return;

      if (
        p.full_name.toLowerCase().includes(query) ||
        p.district.toLowerCase().includes(query) ||
        (p.profession && p.profession.toLowerCase().includes(query)) ||
        (p.areas_of_historical_interest && p.areas_of_historical_interest.some(i => i.toLowerCase().includes(query)))
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
