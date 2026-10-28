import React, { useState, useEffect } from 'react';
import {
  Users,
  Crown,
  MapPin,
  Sparkles,
  BookOpen,
  Scroll,
  Shield,
  Search,
  ExternalLink,
  ChevronRight,
  Flame,
  Droplets,
  Landmark,
  X,
  Compass,
  Building,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS,
  HistoricalFigureSummary,
  CommunitySynonym,
  GeographicalSpreadRegion
} from '../data/historyContent';
import { LanguageCode } from '../types';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import {
  COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES,
  COMMUNITY_DIRECTORY_ITEMS,
  ARTICLE_SECTION_HEADINGS,
  STEP2_DIRECTORY_UI_LABELS,
  KEYWORD_TRANSLATIONS,
  CommunityDirectoryEntry,
  ProfessionalHeritageCategoryArticle
} from '../data/communityHeritageDirectoryData';
import {
  COMMUNITY_HERITAGE_DETAILED_ARTICLES,
  STEP3_ARTICLE_UI_LABELS,
  STEP4_VISUAL_ASSET_REGISTRY,
  STEP4_VISUAL_UI_LABELS,
  STEP5_PAGE_UI_TRANSLATIONS,
  SYNONYM_COMPREHENSIVE_MONOGRAPHS,
  SYNONYM_MONOGRAPH_SECTION_HEADINGS
} from '../data/communityHeritageArticlesData';

interface CommunityHeritagePageProps {
  onNavigate: (path: string) => void;
  initialTab?: 'synonyms' | 'professions' | 'figures' | 'geography' | 'history';
  initialItemId?: string | null;
}

export const CommunityHeritagePage: React.FC<CommunityHeritagePageProps> = ({
  onNavigate,
  initialTab,
  initialItemId
}) => {
  const { t, language, setLanguage, translateText, getMetadataLabel } = useLanguage();
  const [activeTab, setActiveTab] = useState<'synonyms' | 'professions' | 'figures' | 'geography' | 'history'>(() => {
    if (initialTab) return initialTab;
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (
      tabParam === 'figures' ||
      tabParam === 'synonyms' ||
      tabParam === 'professions' ||
      tabParam === 'geography' ||
      tabParam === 'history'
    ) {
      return tabParam;
    }
    return 'synonyms';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigureSummary | null>(null);
  const [selectedModalRef, setSelectedModalRef] = useState<{
    type: 'synonym' | 'region' | 'monograph' | 'community_dir' | 'profession_cat';
    id: string;
  } | null>(null);
  const [synonymCategoryFilter, setSynonymCategoryFilter] = useState<string>('all');
  const [directoryGroupFilter, setDirectoryGroupFilter] = useState<string>('all');
  const [selectedProfessionCatNumber, setSelectedProfessionCatNumber] = useState<number | 'all'>('all');

  const referenceMenuRef = React.useRef<HTMLDivElement | null>(null);
  const targetContentRef = React.useRef<HTMLDivElement | null>(null);

  const syncUrlParams = React.useCallback(
    (
      nextTab: 'synonyms' | 'professions' | 'figures' | 'geography' | 'history',
      nextItemId?: string | null,
      nextRegionId?: string | null
    ) => {
      if (typeof window === 'undefined') return;
      const params = new URLSearchParams(window.location.search);
      params.set('tab', nextTab);
      if (nextItemId) {
        params.set('id', nextItemId);
      } else {
        params.delete('id');
        params.delete('figure');
        params.delete('article');
      }
      if (nextRegionId !== undefined) {
        if (nextRegionId) {
          params.set('region', nextRegionId);
        } else {
          params.delete('region');
        }
      }
      const queryStr = params.toString();
      const newUrl = `${window.location.pathname}${queryStr ? `?${queryStr}` : ''}`;
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (newUrl !== currentUrl) {
        window.history.pushState(
          { path: newUrl, tab: nextTab, id: nextItemId || null, region: nextRegionId || null },
          '',
          newUrl
        );
      }
    },
    []
  );

  const scrollToTargetSection = React.useCallback(() => {
    setTimeout(() => {
      if (targetContentRef.current) {
        targetContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }, []);

  const handleSelectReferenceOption = React.useCallback(
    (nextTab: 'synonyms' | 'professions' | 'figures' | 'geography' | 'history') => {
      setSearchTerm('');
      setSelectedRegionId(null);
      setSynonymCategoryFilter('all');
      setDirectoryGroupFilter('all');
      setSelectedProfessionCatNumber('all');
      setSelectedModalRef(null);
      setSelectedFigure(null);
      setActiveTab(nextTab);
      syncUrlParams(nextTab, null, null);
      scrollToTargetSection();
    },
    [syncUrlParams, scrollToTargetSection]
  );

  const step2Labels = STEP2_DIRECTORY_UI_LABELS[language] || STEP2_DIRECTORY_UI_LABELS.en;
  const step3Labels = STEP3_ARTICLE_UI_LABELS[language] || STEP3_ARTICLE_UI_LABELS.en;
  const step4VisualLabels = STEP4_VISUAL_UI_LABELS[language] || STEP4_VISUAL_UI_LABELS.en;
  const step5Ui = STEP5_PAGE_UI_TRANSLATIONS[language] || STEP5_PAGE_UI_TRANSLATIONS.en;
  const fallbackArchiveImg = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_gateway.jpg`;
  const getHeading = (key: string) =>
    ARTICLE_SECTION_HEADINGS[key]?.[language] || ARTICLE_SECTION_HEADINGS[key]?.en || key;
  const translateKeyword = (kw: string) =>
    KEYWORD_TRANSLATIONS[kw]?.[language] || KEYWORD_TRANSLATIONS[kw]?.en || kw;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src !== fallbackArchiveImg) {
      target.src = fallbackArchiveImg;
    }
  };

  const buildVisualDocSection = (articleId: string) => {
    const vis = STEP4_VISUAL_ASSET_REGISTRY[articleId];
    if (!vis) return [];
    const vTitle = vis.title[language] || vis.title.en;
    const vCap = vis.caption[language] || vis.caption.en;
    const vClass = step4VisualLabels.visualClasses[vis.visualClass];
    const items: string[] = [
      `${step4VisualLabels.imageTitleLabel}: ${vTitle}`,
      `${step4VisualLabels.visualTypeLabel}: ${vClass}`,
      `${step4VisualLabels.imageCaptionLabel}: ${vCap}`,
      `${step4VisualLabels.sourceAttributionLabel}: ${vis.sourceAttribution}`
    ];
    if (vis.visualClass === 'reconstructed_map') {
      items.push(step4VisualLabels.mapDisclaimerText);
    }
    if (vis.visualClass === 'artistic_illustration') {
      items.push(step4VisualLabels.illustrationDisclaimerText);
    }
    if (vis.companionMapUrl && vis.companionMapTitle && vis.companionMapCaption) {
      items.push(
        `${step4VisualLabels.companionMapHeading}: ${
          vis.companionMapTitle[language] || vis.companionMapTitle.en
        } — ${vis.companionMapCaption[language] || vis.companionMapCaption.en}`
      );
      items.push(step4VisualLabels.mapDisclaimerText);
    }
    return [
      {
        heading: step4VisualLabels.visualDocumentationHeading,
        type: 'list' as const,
        items: Array.from(new Set(items))
      }
    ];
  };

  const DESIGNATION_TO_ARTICLE_ID: Record<string, string> = {
    'Oad-Rajputh': 'syn_oad_rajputh',
    'Oad': 'syn_od_oad_odra',
    'Od-Rajput': 'comm_dir_02_od_rajputh',
    'Od': 'comm_dir_01_od',
    'Oad Patel (Artisan Title)': 'syn_oad_rajputh',
    'Waddar': 'syn_waddar_vaddar',
    'Vaddar': 'comm_dir_15_voddar',
    'Vadar': 'syn_waddar_vaddar',
    'Od-Kshatriya': 'syn_od_kshatriya',
    'Odde': 'syn_odde_vadde',
    'Vadde': 'syn_odde_vadde',
    'OddeRajulu': 'syn_odderajulu',
    'VaddeRajulu': 'comm_dir_13_vadderarajulu',
    'Vadiyarajulu': 'comm_dir_12_vaddirajulu',
    'Oddar': 'syn_oddar',
    'Odra': 'comm_dir_03_odra_kshatriya',
    'Suryavamshi Odiyaraju': 'syn_suryavamshi'
  };

  const REGION_RELATED_ARTICLE_IDS: Record<string, string[]> = {
    geo_rajasthan_sindh_punjab: [
      'comm_dir_02_od_rajputh',
      'comm_dir_01_od',
      'syn_oad_rajputh',
      'syn_od_oad_odra',
      'syn_sagaravamshi',
      'fig_maharshi_bhagiratha',
      'mono_part_6_geographical_map'
    ],
    geo_gujarat: [
      'comm_dir_02_od_rajputh',
      'comm_dir_01_od',
      'syn_oad_rajputh',
      'fig_mata_jasma_devi',
      'mono_part_4_jasma_siddharama',
      'mono_part_6_geographical_map'
    ],
    geo_maharashtra: [
      'comm_dir_15_voddar',
      'syn_waddar_vaddar',
      'syn_od_kshatriya',
      'fig_siddharameshwara',
      'mono_part_4_jasma_siddharama',
      'mono_part_6_geographical_map'
    ],
    geo_karnataka: [
      'comm_dir_15_voddar',
      'syn_waddar_vaddar',
      'syn_odiyaraju_karnataka',
      'syn_odde_vadde',
      'fig_siddharameshwara',
      'fig_prince_balavaddiraju',
      'mono_part_6_geographical_map'
    ],
    geo_andhra_telangana: [
      'syn_odde_vadde',
      'syn_odderajulu',
      'comm_dir_09_vaddi',
      'comm_dir_10_vaddera',
      'comm_dir_11_vaddeelu',
      'comm_dir_12_vaddirajulu',
      'comm_dir_13_vadderarajulu',
      'syn_vadde_gajapathirajulu',
      'fig_kapilendra_deva',
      'mono_part_5_gajapathi_diaspora'
    ],
    geo_tamil_nadu: [
      'comm_dir_08_odan',
      'comm_dir_16_oddaru',
      'syn_oddar',
      'syn_ottar',
      'syn_odda_nayakkar_tn',
      'syn_odde_vadde',
      'mono_part_5_gajapathi_diaspora'
    ],
    geo_odisha: [
      'comm_dir_01_od',
      'comm_dir_03_odra_kshatriya',
      'comm_dir_04_kalingarajulu',
      'comm_dir_05_od_khandayath',
      'comm_dir_06_oda_chassa',
      'comm_dir_07_od_paika',
      'comm_dir_14_gajapathulu',
      'syn_od_kshatriya',
      'syn_odisha_kshatriya',
      'syn_suryavamshi',
      'fig_king_kharavela',
      'fig_kapilendra_deva',
      'mono_part_2_kharavela'
    ]
  };

  const resolveDesignationTargetId = (designation: string): string => {
    if (DESIGNATION_TO_ARTICLE_ID[designation]) {
      return DESIGNATION_TO_ARTICLE_ID[designation];
    }
    const trimmed = designation.trim();
    if (DESIGNATION_TO_ARTICLE_ID[trimmed]) {
      return DESIGNATION_TO_ARTICLE_ID[trimmed];
    }
    const commMatch = COMMUNITY_DIRECTORY_ITEMS.find(
      c =>
        c.canonicalName.toLowerCase() === trimmed.toLowerCase() ||
        Object.values(c.localizedName).some(v => v?.toLowerCase() === trimmed.toLowerCase())
    );
    if (commMatch) return commMatch.id;
    const synMatch = COMMUNITY_SYNONYMS.find(
      s =>
        s.title.toLowerCase().includes(trimmed.toLowerCase()) ||
        trimmed.toLowerCase().includes(s.title.toLowerCase())
    );
    if (synMatch) return synMatch.id;
    return 'syn_od_oad_odra';
  };

  const openSynonymModal = (item: CommunitySynonym) => {
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'synonym', id: item.id });
    syncUrlParams('synonyms', item.id);
  };

  const openCommunityDirModal = (item: CommunityDirectoryEntry) => {
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'community_dir', id: item.id });
    syncUrlParams('synonyms', item.id);
  };

  const openProfessionModal = (cat: ProfessionalHeritageCategoryArticle) => {
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'profession_cat', id: cat.id });
    syncUrlParams('professions', cat.id);
  };

  const handleNavigateRelatedId = (targetId: string) => {
    const commItem = COMMUNITY_DIRECTORY_ITEMS.find(c => c.id === targetId);
    if (commItem) {
      setSelectedFigure(null);
      setActiveTab('synonyms');
      setSelectedModalRef({ type: 'community_dir', id: commItem.id });
      syncUrlParams('synonyms', commItem.id);
      return;
    }
    const profItem = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.id === targetId);
    if (profItem) {
      setSelectedFigure(null);
      setActiveTab('professions');
      setSelectedModalRef({ type: 'profession_cat', id: profItem.id });
      syncUrlParams('professions', profItem.id);
      return;
    }
    const synItem = COMMUNITY_SYNONYMS.find(s => s.id === targetId);
    if (synItem) {
      setSelectedFigure(null);
      setActiveTab('synonyms');
      setSelectedModalRef({ type: 'synonym', id: synItem.id });
      syncUrlParams('synonyms', synItem.id);
      return;
    }
    const regItem = GEOGRAPHICAL_SPREAD.find(r => r.id === targetId);
    if (regItem) {
      setSelectedFigure(null);
      setActiveTab('geography');
      setSelectedRegionId(regItem.id);
      setSelectedModalRef({ type: 'region', id: regItem.id });
      syncUrlParams('geography', regItem.id, regItem.id);
      return;
    }
    const monoItem = HISTORICAL_MONOGRAPH_SECTIONS.find(m => m.id === targetId);
    if (monoItem) {
      setSelectedFigure(null);
      setActiveTab('history');
      setSelectedModalRef({ type: 'monograph', id: monoItem.id });
      syncUrlParams('history', monoItem.id);
      return;
    }
    const figItem = HISTORICAL_FIGURES.find(f => f.id === targetId);
    if (figItem) {
      setSelectedModalRef(null);
      setActiveTab('figures');
      setSelectedFigure(figItem);
      syncUrlParams('figures', figItem.id);
    }
  };

  const resolveRelatedLabel = (targetId: string): string => {
    const commItem = COMMUNITY_DIRECTORY_ITEMS.find(c => c.id === targetId);
    if (commItem) {
      return `#${commItem.orderNumber} ${commItem.localizedName[language] || commItem.canonicalName}`;
    }
    const profItem = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.id === targetId);
    if (profItem) {
      return `${step5Ui.catPrefix}${profItem.categoryNumber}: ${profItem.title[language] || profItem.title.en}`;
    }
    const synItem = COMMUNITY_SYNONYMS.find(s => s.id === targetId);
    if (synItem) {
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[synItem.id];
      return mono ? mono.localizedTitle[language] || mono.localizedTitle.en : synItem.title;
    }
    const regItem = GEOGRAPHICAL_SPREAD.find(r => r.id === targetId);
    if (regItem) {
      return regItem.localized_region[language] || regItem.region_name;
    }
    const monoItem = HISTORICAL_MONOGRAPH_SECTIONS.find(m => m.id === targetId);
    if (monoItem) {
      return monoItem.section_title[language] || monoItem.section_title.en;
    }
    const figItem = HISTORICAL_FIGURES.find(f => f.id === targetId);
    if (figItem) {
      return figItem.localized_name[language] || figItem.canonical_name;
    }
    return targetId;
  };

  const handleModalTagClick = (tagItem: string) => {
    const rawTrimmed = tagItem.startsWith('#') ? tagItem.slice(1).trim() : tagItem.trim();
    const parenMatch = rawTrimmed.match(/\(([^)]+)\)$/);
    const candidateKeys = [
      tagItem,
      rawTrimmed,
      ...(parenMatch ? [parenMatch[1].trim()] : [])
    ];
    for (const key of candidateKeys) {
      if (DESIGNATION_TO_ARTICLE_ID[key]) {
        handleNavigateRelatedId(DESIGNATION_TO_ARTICLE_ID[key]);
        return;
      }
    }
    const allIds = [
      ...COMMUNITY_DIRECTORY_ITEMS.map(c => c.id),
      ...COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.map(p => p.id),
      ...COMMUNITY_SYNONYMS.map(s => s.id),
      ...GEOGRAPHICAL_SPREAD.map(r => r.id),
      ...HISTORICAL_MONOGRAPH_SECTIONS.map(m => m.id),
      ...HISTORICAL_FIGURES.map(f => f.id)
    ];
    const matchedId = allIds.find(id =>
      candidateKeys.some(k => resolveRelatedLabel(id) === k || id === k)
    );
    if (matchedId) {
      handleNavigateRelatedId(matchedId);
      return;
    }
    for (const key of candidateKeys) {
      const fallbackId = resolveDesignationTargetId(key);
      if (fallbackId) {
        handleNavigateRelatedId(fallbackId);
        return;
      }
    }
  };

  const synonymSectionLabels = React.useMemo(() => {
    const dict: Record<
      LanguageCode,
      {
        sectionTitle: string;
        sectionSubtitle: string;
        accuracyHeading: string;
        accuracyBody: string;
        filterAll: string;
        groupDynastic: string;
        groupDynasticDesc: string;
        groupRegional: string;
        groupRegionalDesc: string;
        groupTitles: string;
        groupTitlesDesc: string;
        tableHeading: string;
        tableSubheading: string;
        colDesignation: string;
        colCategory: string;
        colGeography: string;
        colEpistemic: string;
        colSummary: string;
        geoLabel: string;
        statesLabel: string;
        rootLabel: string;
        epistemicLabel: string;
        regionsBtn: string;
        detailsBtn: string;
        epistemicClasses: Record<string, string>;
      }
    > = {
      en: {
        sectionTitle: 'Synonyms, Regional Designations & Martial Titles',
        sectionSubtitle:
          'Categorized overview of dynastic lineages, regional community designations, and traditional martial titles across Odisha, Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and pan-Indian corridors.',
        accuracyHeading: 'Historical Accuracy & Methodological Note',
        accuracyBody:
          'The designations below are presented as community-associated names, regional ethnonyms, or traditional titles according to their historical context. They are not claimed to be exact linguistic synonyms or to share a single uniform origin in every region; documented epigraphic and gazetteer records are explicitly distinguished from community traditions and ancestral lineage claims.',
        filterAll: 'All Designations',
        groupDynastic: 'Dynastic and lineage designations',
        groupDynasticDesc:
          'Ancestral solar-race (Suryavamsha) and classical Odra lineage identities invoked in royal inscriptions, Puranic traditions, and community genealogies.',
        groupRegional: 'Regional community designations',
        groupRegionalDesc:
          'Geographically anchored community designations documented across Odisha, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Maharashtra.',
        groupTitles: 'Historical, martial, and traditional titles',
        groupTitlesDesc:
          'Honorific martial, fortress-command, and chieftaincy titles preserved in regional histories, inscriptions, and community traditions.',
        tableHeading: 'Structured Classification & Geographical Reference Table',
        tableSubheading: 'Tap any row or card to open the full multilingual archival window with script attestations and sources.',
        colDesignation: 'Name / Designation (Exact Spelling)',
        colCategory: 'Category',
        colGeography: 'Geographical Association',
        colEpistemic: 'Historical Basis',
        colSummary: 'Historical & Traditional Context',
        geoLabel: 'Geographical Association:',
        statesLabel: 'States:',
        rootLabel: 'Linguistic Root:',
        epistemicLabel: 'Historical Basis:',
        regionsBtn: 'Regions',
        detailsBtn: 'Details',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'Documented Epigraphic / Historical Record',
          'Regional Ethnonym & Gazetteer Record': 'Regional Ethnonym & Gazetteer Record',
          'Community Tradition & Lineage Claim': 'Community Tradition & Lineage Claim'
        }
      },
      hi: {
        sectionTitle: 'पर्यायवाची नाम, क्षेत्रीय पहचान एवं सामरिक उपाधियाँ',
        sectionSubtitle:
          'ओडिशा, आंध्र प्रदेश, तेलंगाना, कर्नाटक, तमिलनाडु और अखिल भारतीय क्षेत्रों में प्रचलित राजवंशीय नामों, क्षेत्रीय समुदाय संज्ञाओं और पारंपरिक सामरिक उपाधियों का वर्गीकृत विवरण।',
        accuracyHeading: 'ऐतिहासिक प्रामाणिकता एवं कार्यप्रणाली टिप्पणी',
        accuracyBody:
          'नीचे दिए गए नाम उनके ऐतिहासिक संदर्भ के अनुसार समुदाय-संबद्ध नामों, क्षेत्रीय संज्ञाओं या पारंपरिक उपाधियों के रूप में प्रस्तुत किए गए हैं। प्रत्येक नाम को पूर्णतः समानार्थी या एक ही उत्पत्ति का मानने का दावा नहीं किया जाता; प्रमाणित शिलालेखों व गजेटियर साक्ष्यों को सामुदायिक परंपराओं और वंश-दावों से स्पष्ट रूप से अलग दर्शाया गया है।',
        filterAll: 'सभी नाम व उपाधियाँ',
        groupDynastic: 'राजवंशीय एवं वंश-परंपरा संज्ञाएँ (Dynastic and lineage designations)',
        groupDynasticDesc:
          'राजकीय अभिलेखों, पौराणिक परंपराओं और सामुदायिक वंशावलियों में उल्लिखित सूर्यवंशी एवं प्राचीन ओड्र वंश पहचान।',
        groupRegional: 'क्षेत्रीय समुदाय संज्ञाएँ (Regional community designations)',
        groupRegionalDesc:
          'ओडिशा, कर्नाटक, तमिलनाडु, आंध्र प्रदेश, तेलंगाना और महाराष्ट्र में भौगोलिक रूप से प्रचलित क्षेत्रीय समुदाय नाम।',
        groupTitles: 'ऐतिहासिक, सामरिक एवं पारंपरिक उपाधियाँ (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'क्षेत्रीय इतिहास, अभिलेखों और सामुदायिक परंपराओं में संरक्षित दुर्ग-रक्षा, नायकत्व एवं सम्मानजनक क्षत्रिय उपाधियाँ।',
        tableHeading: 'वर्गीकृत एवं भौगोलिक संदर्भ तालिका',
        tableSubheading: 'पूर्ण बहुभाषी विवरण और ऐतिहासिक स्रोत देखने के लिए किसी भी पंक्ति या कार्ड पर टैप करें।',
        colDesignation: 'नाम / उपाधि (मूल वर्तनी)',
        colCategory: 'श्रेणी',
        colGeography: 'भौगोलिक संबद्धता',
        colEpistemic: 'ऐतिहासिक आधार',
        colSummary: 'ऐतिहासिक एवं पारंपरिक संदर्भ',
        geoLabel: 'भौगोलिक संबद्धता:',
        statesLabel: 'प्रमुख राज्य:',
        rootLabel: 'भाषाई मूल:',
        epistemicLabel: 'ऐतिहासिक आधार:',
        regionsBtn: 'क्षेत्र',
        detailsBtn: 'विवरण',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'प्रमाणित अभिलेखीय / ऐतिहासिक साक्ष्य',
          'Regional Ethnonym & Gazetteer Record': 'क्षेत्रीय संज्ञा एवं गजेटियर अभिलेख',
          'Community Tradition & Lineage Claim': 'सामुदायिक परंपरा एवं वंश दावा'
        }
      },
      te: {
        sectionTitle: 'పర్యాయ నామాలు, ప్రాంతీయ గుర్తింపులు & వీర బిరుదులు',
        sectionSubtitle:
          'ఒడిశా, ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక, తమిళనాడు మరియు అఖిల భారత స్థాయిలో ఉన్న వంశ నామాలు, ప్రాంతీయ సామాజిక నామాలు మరియు సాంప్రదాయ వీర బిరుదుల వర్గీకృత వివరణ.',
        accuracyHeading: 'చారిత్రక ప్రామాణికత & పరిశోధనా గమనిక',
        accuracyBody:
          'ఈ క్రింది నామాలు వాటి చారిత్రక సందర్భాన్ని బట్టి సమాజ అనుబంధ నామాలు, ప్రాంతీయ గుర్తింపులు లేదా సాంప్రదాయ బిరుదులుగా అందించబడ్డాయి. ప్రతి పేరు పూర్తిగా ఒకే అర్థం గల పర్యాయపదమని లేదా ప్రతి సమూహానికి ఒకే మూలం ఉందని యాంత్రికంగా నిర్ధారించబడలేదు; శాసన మరియు గెజిటీర్ ఆధారాలను సామాజిక సంప్రదాయాలు మరియు వంశావళి విశ్వాసాల నుండి స్పష్టంగా వేరు చేసి చూపడమైనది.',
        filterAll: 'అన్ని నామాలు & బిరుదులు',
        groupDynastic: 'వంశ మరియు కుల-పరంపర నామాలు (Dynastic and lineage designations)',
        groupDynasticDesc:
          'రాజ శాసనాలు, పురాణ గాథలు మరియు సామాజిక వంశావళులలో పేర్కొనబడిన సూర్యవంశ మరియు ప్రాచీన ఓడ్ర వంశ గుర్తింపులు.',
        groupRegional: 'ప్రాంతీయ సామాజిక నామాలు (Regional community designations)',
        groupRegionalDesc:
          'ఒడిశా, కర్ణాటక, తమిళనాడు, ఆంధ్రప్రదేశ్, తెలంగాణ మరియు మహారాష్ట్రలలో భౌగోళికంగా స్థిరపడిన ప్రాంతీయ సామాజిక నామాలు.',
        groupTitles: 'చారిత్రక, సైనిక మరియు సాంప్రదాయ బిరుదులు (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'ప్రాంతీయ చరిత్రలు, శాసనాలు మరియు సామాజిక సంప్రదాయాలలో నిలిచి ఉన్న దుర్గ రక్షణ, నాయకత్వ మరియు గౌరవ క్షత్రియ బిరుదులు.',
        tableHeading: 'వర్గీకృత & భౌగోళిక సూచిక పట్టిక',
        tableSubheading: 'పూర్తి బహుభాషా చారిత్రక వివరాలను చూడటానికి ఏదైనా వరుస లేదా కార్డుపై నొక్కండి.',
        colDesignation: 'పేరు / బిరుదు (మూల స్పెల్లింగ్)',
        colCategory: 'వర్గం',
        colGeography: 'భౌగోళిక అనుబంధం',
        colEpistemic: 'చారిత్రక ఆధారం',
        colSummary: 'చారిత్రక & సాంప్రదాయ వివరణ',
        geoLabel: 'భౌగోళిక అనుబంధం:',
        statesLabel: 'రాష్ట్రాలు:',
        rootLabel: 'భాషా మూలం:',
        epistemicLabel: 'చారిత్రక ఆధారం:',
        regionsBtn: 'ప్రాంతాలు',
        detailsBtn: 'వివరాలు',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'శాసన / చారిత్రక ఆధారిత నామం',
          'Regional Ethnonym & Gazetteer Record': 'ప్రాంతీయ నామం & గెజిటీర్ నమోదు',
          'Community Tradition & Lineage Claim': 'సామాజిక సంప్రదాయం & వంశావళి గుర్తింపు'
        }
      },
      kn: {
        sectionTitle: 'ಪರ್ಯಾಯ ನಾಮಗಳು, ಪ್ರಾದೇಶಿಕ ಹೆಸರುಗಳು ಮತ್ತು ವೀರ ಬಿರುದುಗಳು',
        sectionSubtitle:
          'ಒಡಿಶಾ, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ, ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಮಟ್ಟದಲ್ಲಿರುವ ವಂಶನಾಮಗಳು, ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯ ಹೆಸರುಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ವೀರ ಬಿರುದುಗಳ ವರ್ಗೀಕೃತ ವಿವರಣೆ.',
        accuracyHeading: 'ಐತಿಹಾಸಿಕ ನಿಖರತೆ ಮತ್ತು ಸಂಶೋಧನಾ ಸೂಚನೆ',
        accuracyBody:
          'ಇಲ್ಲಿ ನೀಡಲಾದ ಹೆಸರುಗಳನ್ನು ಅವುಗಳ ಐತಿಹಾಸಿಕ ಸಂದರ್ಭಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸಮುದಾಯ-ಸಂಬಂಧಿತ ನಾಮಗಳು, ಪ್ರಾದೇಶಿಕ ಹೆಸರುಗಳು ಅಥವಾ ಸಾಂಪ್ರದಾಯಿಕ ಬಿರುದುಗಳಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸಲಾಗಿದೆ. ಪ್ರತಿಯೊಂದು ಹೆಸರೂ ಯಾಂತ್ರಿಕವಾಗಿ ಒಂದೇ ಸಮಾನಾರ್ಥಕ ಪದವೆಂದು ಹೇಳದೆ, ದೃಢೀಕೃತ ಶಾಸನ/ಗೆಜೆಟಿಯರ್ ದಾಖಲೆಗಳನ್ನು ಸಮುದಾಯದ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ವಂಶಾವಳಿ ನಂಬಿಕೆಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
        filterAll: 'ಎಲ್ಲಾ ಹೆಸರುಗಳು',
        groupDynastic: 'ರಾಜವಂಶ ಮತ್ತು ಪರಂಪರೆಯ ಹೆಸರುಗಳು (Dynastic and lineage designations)',
        groupDynasticDesc:
          'ರಾಜ ಶಾಸನಗಳು, ಪುರಾಣ ಪರಂಪರೆ ಮತ್ತು ಸಮುದಾಯದ ವಂಶಾವಳಿಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾದ ಸೂರ್ಯವಂಶ ಮತ್ತು ಪ್ರಾಚೀನ ಓಡ್ರ ಪರಂಪರೆಯ ಹೆಸರುಗಳು.',
        groupRegional: 'ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯದ ಹೆಸರುಗಳು (Regional community designations)',
        groupRegionalDesc:
          'ಒಡಿಶಾ, ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರಗಳಲ್ಲಿ ಗುರುತಿಸಲ್ಪಟ್ಟ ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯ ನಾಮಗಳು.',
        groupTitles: 'ಐತಿಹಾಸಿಕ, ಸೇನಾ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಬಿರುದುಗಳು (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'ಪ್ರಾದೇಶಿಕ ಇತಿಹಾಸ, ಶಾಸನಗಳು ಮತ್ತು ಸಮುದಾಯದ ಸಂಪ್ರದಾಯಗಳಲ್ಲಿ ಉಳಿದುಬಂದಿರುವ ಕೋಟೆ ರಕ್ಷಣೆ, ನಾಯಕತ್ವ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಬಿರುದುಗಳು.',
        tableHeading: 'ವರ್ಗೀಕೃತ ಮತ್ತು ಭೌಗೋಳಿಕ ಉಲ್ಲೇಖ ಕೋಷ್ಟಕ',
        tableSubheading: 'ಸಂಪೂರ್ಣ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ಸಾಲು ಅಥವಾ ಕಾರ್ಡ್ ಮೇಲೆ ಟ್ಯಾಪ್ ಮಾಡಿ.',
        colDesignation: 'ಹೆಸರು / ಬಿರುದು (ಮೂಲ ಕಾಗುಣಿತ)',
        colCategory: 'ವರ್ಗ',
        colGeography: 'ಭೌಗೋಳಿಕ ಸಂಬಂಧ',
        colEpistemic: 'ಐತಿಹಾಸಿಕ ಆಧಾರ',
        colSummary: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಹಿನ್ನೆಲೆ',
        geoLabel: 'ಭೌಗೋಳಿಕ ಸಂಬಂಧ:',
        statesLabel: 'ರಾಜ್ಯಗಳು:',
        rootLabel: 'ಭಾಷಾ ಮೂಲ:',
        epistemicLabel: 'ಐತಿಹಾಸಿಕ ಆಧಾರ:',
        regionsBtn: 'ಪ್ರದೇಶಗಳು',
        detailsBtn: 'ವಿವರಗಳು',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'ದೃಢೀಕೃತ ಶಾಸನ / ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
          'Regional Ethnonym & Gazetteer Record': 'ಪ್ರಾದೇಶಿಕ ಹೆಸರು ಮತ್ತು ಗೆಜೆಟಿಯರ್ ದಾಖಲೆ',
          'Community Tradition & Lineage Claim': 'ಸಮುದಾಯ ಸಂಪ್ರದಾಯ ಮತ್ತು ವಂಶ ಪರಂಪರೆ'
        }
      },
      ta: {
        sectionTitle: 'இணைப் பெயர்கள், பிராந்தியப் பெயர்கள் & வீரப் பட்டங்கள்',
        sectionSubtitle:
          'ஒடிசா, ஆந்திரப் பிரதேசம், தெலுங்கானா, கர்நாடகா, தமிழ்நாடு மற்றும் அகில இந்திய அளவில் வழங்கப்படும் வம்சப் பெயர்கள், பிராந்திய சமூகப் பெயர்கள் மற்றும் பாரம்பரிய வீரப் பட்டங்களின் வகைப்படுத்தப்பட்ட தொகுப்பு.',
        accuracyHeading: 'வரலாற்றுத் துல்லியம் மற்றும் ஆய்வுக் குறிப்பு',
        accuracyBody:
          'கீழே உள்ள பெயர்கள் அவற்றின் வரலாற்றுச் சூழலுக்கு ஏற்ப சமூகத் தொடர்புடைய பெயர்கள், பிராந்தியப் பெயர்கள் அல்லது பாரம்பரியப் பட்டங்களாக வழங்கப்பட்டுள்ளன. ஒவ்வொரு பெயரும் முற்றிலும் ஒரே பொருள் கொண்டவை என்றோ ஒரே தோற்றம் கொண்டவை என்றோ கருதாமல், கல்வெட்டு மற்றும் அரசிதழ் சான்றுகள் சமூக மரபுகள் மற்றும் வம்சாவளி உரிமைகோரல்களிலிருந்து தெளிவாக வேறுபடுத்தப்பட்டுள்ளன.',
        filterAll: 'அனைத்துப் பெயர்கள் & பட்டங்கள்',
        groupDynastic: 'வம்ச மற்றும் மரபுப் பெயர்கள் (Dynastic and lineage designations)',
        groupDynasticDesc:
          'அரச கல்வெட்டுகள், புராண மரபுகள் மற்றும் சமூக வம்சாவளிகளில் போற்றப்படும் சூரிய வம்ச மற்றும் பண்டைய ஒட்ர மரபுப் பெயர்கள்.',
        groupRegional: 'பிராந்திய சமூகப் பெயர்கள் (Regional community designations)',
        groupRegionalDesc:
          'ஒடிசா, கர்நாடகா, தமிழ்நாடு, ஆந்திரா, தெலுங்கானா மற்றும் மகாராஷ்டிராவில் வழங்கப்படும் பிராந்திய சமூகப் பெயர்கள்.',
        groupTitles: 'வரலாற்று, மறவர் மற்றும் பாரம்பரியப் பட்டங்கள் (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'பிராந்திய வரலாறு, கல்வெட்டுகள் மற்றும் சமூக மரபுகளில் பாதுகாக்கப்பட்டுள்ள கோட்டைத் தலைமை மற்றும் வீரப் பட்டங்கள்.',
        tableHeading: 'வகைப்படுத்தப்பட்ட & புவியியல் குறிப்பு அட்டவணை',
        tableSubheading: 'முழு விவரங்களையும் காண எந்தவொரு வரிசையையோ அல்லது அட்டையையோ தொடவும்.',
        colDesignation: 'பெயர் / பட்டம் (மூல எழுத்து வடிவம்)',
        colCategory: 'வகை',
        colGeography: 'புவியியல் தொடர்பு',
        colEpistemic: 'வரலாற்று அடிப்படை',
        colSummary: 'வரலாற்று மற்றும் பாரம்பரியச் சுருக்கம்',
        geoLabel: 'புவியியல் தொடர்பு:',
        statesLabel: 'மாநிலங்கள்:',
        rootLabel: 'மொழி மூலம்:',
        epistemicLabel: 'வரலாற்று அடிப்படை:',
        regionsBtn: 'பகுதிகள்',
        detailsBtn: 'விவரங்கள்',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'கல்வெட்டு / வரலாற்று ஆவணப் பதிவு',
          'Regional Ethnonym & Gazetteer Record': 'பிராந்தியப் பெயர் & அரசிதழ் பதிவு',
          'Community Tradition & Lineage Claim': 'சமூக மரபு & வம்சாவளி நம்பிக்கை'
        }
      },
      mr: {
        sectionTitle: 'पर्यायी नावे, प्रादेशिक ओळख आणि लढाऊ पदव्या',
        sectionSubtitle:
          'ओडिशा, आंध्र प्रदेश, तेलंगणा, कर्नाटक, तमिळनाडू आणि अखिल भारतीय स्तरावरील राजवंशीय नावे, प्रादेशिक समाज संज्ञा आणि पारंपरिक लढाऊ पदव्यांची वर्गीकृत मांडणी.',
        accuracyHeading: 'ऐतिहासिक अचूकता आणि संशोधन टीप',
        accuracyBody:
          'खालील नावे त्यांच्या ऐतिहासिक संदर्भानुसार समाज-संबंधित नावे, प्रादेशिक संज्ञा किंवा पारंपरिक पदव्या म्हणून मांडली आहेत. प्रत्येक नाव तंतोतंत समानार्थी आहे किंवा सर्व गटांचा उगम एकच आहे असा दावा न करता, शिलालेख व गॅझेटिअरमधील ऐतिहासिक पुरावे आणि समाजाच्या पारंपरिक वंशावळी यांतील फरक स्पष्टपणे दर्शविला आहे.',
        filterAll: 'सर्व नावे व पदव्या',
        groupDynastic: 'राजवंश आणि वंश-परंपरा दर्शक नावे (Dynastic and lineage designations)',
        groupDynasticDesc:
          'राजकीय शिलालेख, पौराणिक संदर्भ आणि समाजाच्या वंशावळीत आढळणारी सूर्यवंशी व प्राचीन ओड्र वंश ओळख.',
        groupRegional: 'प्रादेशिक समाज नावे (Regional community designations)',
        groupRegionalDesc:
          'ओडिशा, कर्नाटक, तमिळनाडू, आंध्र प्रदेश, तेलंगणा आणि महाराष्ट्रात प्रचलित असलेली प्रादेशिक समाज नावे.',
        groupTitles: 'ऐतिहासिक, लढाऊ आणि पारंपरिक पदव्या (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'प्रादेशिक इतिहास, शिलालेख आणि सामाजिक परंपरेत जतन केलेल्या दुर्गप्रमुख, नायक व क्षत्रिय पदव्या.',
        tableHeading: 'वर्गीकृत आणि भौगोलिक संदर्भ तक्ता',
        tableSubheading: 'संपूर्ण बहुभाषिक माहिती पाहण्यासाठी कोणत्याही ओळीवर किंवा कार्डवर टॅप करा.',
        colDesignation: 'नाव / पदवी (मूळ स्पेलिंग)',
        colCategory: 'वर्ग',
        colGeography: 'भौगोलिक संबंध',
        colEpistemic: 'ऐतिहासिक आधार',
        colSummary: 'ऐतिहासिक व पारंपरिक संदर्भ',
        geoLabel: 'भौगोलिक संबंध:',
        statesLabel: 'राज्ये:',
        rootLabel: 'भाषिक मूळ:',
        epistemicLabel: 'ऐतिहासिक आधार:',
        regionsBtn: 'प्रदेश',
        detailsBtn: 'तपशील',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'प्रमाणित शिलालेख / ऐतिहासिक नोंद',
          'Regional Ethnonym & Gazetteer Record': 'प्रादेशिक संज्ञा व गॅझेटिअर नोंद',
          'Community Tradition & Lineage Claim': 'सामाजिक परंपरा व वंश दावा'
        }
      },
      or: {
        sectionTitle: 'ପର୍ଯ୍ୟାୟବାଚୀ ନାମ, ଆଞ୍ଚଳିକ ପରିଚୟ ଓ ସାମରିକ ଉପାଧି',
        sectionSubtitle:
          'ଓଡ଼ିଶା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା, କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ ଓ ସର୍ବଭାରତୀୟ ସ୍ତରରେ ପ୍ରଚଳିତ ରାଜବଂଶୀୟ ନାମ, ଆଞ୍ଚଳିକ ସମୁଦାୟ ପରିଚୟ ଏବଂ ପାରମ୍ପରିକ ସାମରିକ ଉପାଧିର ବର୍ଗୀକୃତ ବିବରଣୀ।',
        accuracyHeading: 'ଐତିହାସିକ ସତ୍ୟতা ଓ ଗବେଷଣା ଟିପ୍ପଣୀ',
        accuracyBody:
          'ନିମ୍ନলিଖିତ ନାମଗୁଡ଼ିକ ସେମାନଙ୍କର ଐତିହାସିକ ପ୍ରସଙ୍ଗ ଅନୁযାୟୀ ସମୁଦାୟ-ସମ୍ପୃକ୍ତ ନାମ, ଆଞ୍ଚଳିକ ପରିଚୟ ବା ପାରମ୍ପରିକ ଉପାଧି ଭାବରେ ଉପସ୍ଥାପିତ ହୋଇଛି। ପ୍ରତ୍ୟେକ ନାମ ସମ୍ପୂର୍ଣ୍ଣ ସମାନାର୍ଥକ ବା ଗୋଟିଏ ମାତ୍ର ଉତ୍ପତ୍ତିର ବୋଲି ଦାବି ନକରି, ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ଗେଜେଟିୟର ତଥ୍ୟକୁ ସାମୁଦାୟିକ ପରମ୍ପରା ଓ ବଂଶ-ଦାବିଠାରୁ ସ୍ପଷ୍ଟ ଭାବେ ପୃଥକ କରାଯାଇଛି।',
        filterAll: 'ସମସ୍ତ ନାମ ଓ ଉପାଧି',
        groupDynastic: 'ରାଜବଂଶ ଓ ବଂଶ-ପରମ୍ପରା ସୂଚକ ନାମ (Dynastic and lineage designations)',
        groupDynasticDesc:
          'ରାଜକୀୟ ଶିଳାଲେଖ, ପୌରାଣିକ ପରମ୍ପରା ଓ ସାମୁଦାୟିକ ବଂଶାବଳୀରେ ଉଲ୍ଲେଖିତ ସୂର୍ଯ୍ୟବଂଶୀ ଏବଂ ପ୍ରାଚୀନ ଓଡ଼୍ର ବଂଶ ପରିଚୟ।',
        groupRegional: 'ଆଞ୍ଚଳିକ ସମୁଦାୟ ନାମ (Regional community designations)',
        groupRegionalDesc:
          'ଓଡ଼ିଶା, କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା ଓ ମହାରାଷ୍ଟ୍ରରେ ପ୍ରଚଳିତ ଆଞ୍ଚଳିକ ସମୁଦାୟ ପରିଚୟ।',
        groupTitles: 'ଐତିହାସିକ, ସାମରିକ ଓ ପାରମ୍ପରିକ ଉପାଧି (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'ଆଞ୍ଚଳିକ ଇତିହାସ, ଶିଳାଲେଖ ଓ ସାମୁଦାୟିକ ପରମ୍ପରାରେ ସଂରକ୍ଷିତ ଦୁର୍ଗ-ରକ୍ଷা, ନାୟକତ୍ୱ ଓ କ୍ଷତ୍ରିୟ ଉପାଧି।',
        tableHeading: 'ବର୍ଗୀକୃତ ଓ ଭୌଗୋଳିକ ସୂଚୀ ସାରଣୀ',
        tableSubheading: 'ସମ୍ପୂର୍ଣ୍ଣ ବହୁଭାଷୀ ବିବରଣୀ ଦେଖିବା ପାଇଁ ଯେକୌଣସି ଧାଡ଼ି ବା କାର୍ଡ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
        colDesignation: 'ନାମ / ଉପାଧି (ମୂଳ ବନାନ)',
        colCategory: 'ବର୍ଗ',
        colGeography: 'ଭୌଗୋଳିକ ସମ୍ପର୍କ',
        colEpistemic: 'ଐତିହାସିକ ଆଧାର',
        colSummary: 'ଐତିହାସିକ ଓ ପାରମ୍ପରିକ ପ୍ରସଙ୍ଗ',
        geoLabel: 'ଭୌଗୋଳିକ ସମ୍ପର୍କ:',
        statesLabel: 'ରାଜ୍ୟ:',
        rootLabel: 'ଭାଷାଗତ ମୂଳ:',
        epistemicLabel: 'ଐତିହାସିକ ଆଧାର:',
        regionsBtn: 'ଅଞ୍ଚଳ',
        detailsBtn: 'ବିବରଣୀ',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'ପ୍ରମାଣିତ ଶିଳାଲେଖ / ଐତିହାସିକ ତଥ୍ୟ',
          'Regional Ethnonym & Gazetteer Record': 'ଆଞ୍ଚଳିକ ନାମ ଓ ଗେଜେଟିୟର ଦସ୍ତାବିଜ',
          'Community Tradition & Lineage Claim': 'ସାମୁଦାୟିକ ପରମ୍ପରା ଓ ବଂଶ ଦାବି'
        }
      },
      bn: {
        sectionTitle: 'সমার্থক নাম, আঞ্চলিক পরিচয় ও সামরিক উপাধি',
        sectionSubtitle:
          'ওড়িশা, অন্ধ্রপ্রদেশ, তেলেঙ্গানা, কর্ণাটক, তামিলনাড়ু ও সর্বভারতীয় স্তরে প্রচলিত রাজবংশীয় নাম, আঞ্চলিক সম্প্রদায়গত পরিচয় এবং ঐতিহ্যবাহী সামরিক উপাধির শ্রেণীবদ্ধ বিবরণ।',
        accuracyHeading: 'ঐতিহাসিক প্রামাণ্যতা ও পদ্ধতিগত নোট',
        accuracyBody:
          'নিম্নলিখিত নামগুলো তাদের ঐতিহাসিক প্রেক্ষাপট অনুযায়ী সম্প্রদায়-সংশ্লিষ্ট নাম, আঞ্চলিক পরিচয় বা ঐতিহ্যবাহী উপাধি হিসেবে উপস্থাপিত হয়েছে। প্রতিটি নাম হুবহু সমার্থক বা একই উৎসজাত বলে দাবি না করে, প্রত্যয়িত শিলালিপি ও গেজেটিয়ার তথ্যকে সামাজিক ঐতিহ্য ও বংশগত দাবি থেকে স্পষ্টভাবে পৃথক করা হয়েছে।',
        filterAll: 'সকল নাম ও উপাধি',
        groupDynastic: 'রাজবংশ ও বংশ-পরম্পরা সূচক নাম (Dynastic and lineage designations)',
        groupDynasticDesc:
          'রাজকীয় শিলালিপি, পৌরাণিক ঐতিহ্য এবং বংশলতিকায় উল্লেখিত সূর্যবংশীয় ও প্রাচীন ওড্র বংশ পরিচয়।',
        groupRegional: 'আঞ্চলিক সম্প্রদায়গত নাম (Regional community designations)',
        groupRegionalDesc:
          'ওড়িশা, কর্ণাটক, তামিলনাড়ু, অন্ধ্রপ্রদেশ, তেলেঙ্গানা ও মহারাষ্ট্রে প্রচলিত আঞ্চলিক সম্প্রদায়গত নাম।',
        groupTitles: 'ঐতিহাসিক, সামরিক ও ঐতিহ্যবাহী উপাধি (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'আঞ্চলিক ইতিহাস, শিলালিপি ও সামাজিক পরম্পরায় সংরক্ষিত দুর্গ-রক্ষা, নায়কত্ব ও ক্ষত্রিয় উপাধি।',
        tableHeading: 'শ্রেণীবদ্ধ ও ভৌগোলিক রেফারেন্স টেবিল',
        tableSubheading: 'সম্পূর্ণ বহুভাষিক বিবরণ ও তথ্যসূত্র দেখতে যেকোনো সারি বা কার্ডে ট্যাপ করুন।',
        colDesignation: 'নাম / উপাধি (মূল বানান)',
        colCategory: 'বিভাগ',
        colGeography: 'ভৌগোলিক সংযোগ',
        colEpistemic: 'ঐতিহাসিক ভিত্তি',
        colSummary: 'ঐতিহাসিক ও ঐতিহ্যবাহী প্রেক্ষাপট',
        geoLabel: 'ভৌগোলিক সংযোগ:',
        statesLabel: 'রাজ্যসমূহ:',
        rootLabel: 'ভাষাগত মূল:',
        epistemicLabel: 'ঐতিহাসিক ভিত্তি:',
        regionsBtn: 'অঞ্চল',
        detailsBtn: 'বিস্তারিত',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'প্রত্যয়িত শিলালিপি / ঐতিহাসিক নথি',
          'Regional Ethnonym & Gazetteer Record': 'আঞ্চলিক নাম ও গেজেটিয়ার নথি',
          'Community Tradition & Lineage Claim': 'সামাজিক ঐতিহ্য ও বংশগত দাবি'
        }
      }
    };
    return dict[language] || dict.en;
  }, [language]);

  const localizeSynonymGroup = (grp: string): string => {
    if (grp === 'Dynastic and lineage designations') {
      return synonymSectionLabels.groupDynastic.split(' (')[0];
    }
    if (grp === 'Regional community designations') {
      return synonymSectionLabels.groupRegional.split(' (')[0];
    }
    if (grp === 'Historical, martial, and traditional titles') {
      return synonymSectionLabels.groupTitles.split(' (')[0];
    }
    return grp;
  };

  const modalItem: ContentDetailItem | null = React.useMemo(() => {
    if (!selectedModalRef) return null;
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    if (selectedModalRef.type === 'synonym') {
      const item = COMMUNITY_SYNONYMS.find(s => s.id === selectedModalRef.id);
      if (!item) return null;
      const vis = STEP4_VISUAL_ASSET_REGISTRY[item.id];
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[item.id];
      const monoHeadings = SYNONYM_MONOGRAPH_SECTION_HEADINGS[language] || SYNONYM_MONOGRAPH_SECTION_HEADINGS.en;
      const epistemicText = item.epistemic_note[language] || item.epistemic_note.en;
      const synImgMap: Record<string, string> = {
        syn_suryavamshi: `${base}surya_konark_sculpture.jpg`,
        syn_sagaravamshi: `${base}samrat_sagara_surya.jpg`,
        syn_raghuvamshi: `${base}sri_rama_sculpture.jpg`,
        syn_od_oad_odra: `${base}hathigumpha_inscription.jpg`,
        syn_odisha_kshatriya: `${base}barabati_fort_gateway.jpg`,
        syn_odiyaraju_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
        syn_ottar: `${base}srirangam_temple.jpg`,
        syn_od_kshatriya: `${base}puri_jagannatha_temple.jpg`,
        syn_odde_vadde: `${base}kondavidu_fort_hills.jpg`,
        syn_waddar_vaddar: `${base}shivayogi_siddharama_solapur.jpg`,
        syn_oddar: `${base}srirangam_temple.jpg`,
        syn_vadde_gajapathirajulu: `${base}kapilendra_deva_portrait.jpg`,
        syn_odda_nayakkar_tn: `${base}kumara_hamvira_warangal_srirangam.jpg`,
        syn_oad_rajputh: `${base}oad_hydraulic_stepwell.jpg`,
        syn_odderajulu: `${base}kolleru_lake_citadel.jpg`
      };
      const monographSections = mono
        ? [
            {
              heading: monoHeadings.sec2_linguistics,
              type: 'text' as const,
              content: mono.terminologyAndLinguisticAnalysis[language] || mono.terminologyAndLinguisticAnalysis.en
            },
            {
              heading: monoHeadings.sec3_chronology,
              type: 'text' as const,
              content: mono.chronologicalHistory[language] || mono.chronologicalHistory.en
            },
            {
              heading: monoHeadings.sec4_geography,
              type: 'text' as const,
              content: mono.geographicalAndSettlementAnalysis[language] || mono.geographicalAndSettlementAnalysis.en
            },
            {
              heading: monoHeadings.sec5_culture,
              type: 'text' as const,
              content: mono.culturalAndSocialTraditions[language] || mono.culturalAndSocialTraditions.en
            },
            {
              heading: monoHeadings.sec6_professions,
              type: 'text' as const,
              content: mono.occupationalAndProfessionalHeritage[language] || mono.occupationalAndProfessionalHeritage.en
            },
            {
              heading: monoHeadings.sec7_evidence,
              type: 'text' as const,
              content: mono.epigraphicAndDocumentaryEvidence[language] || mono.epigraphicAndDocumentaryEvidence.en
            },
            {
              heading: monoHeadings.sec8_epistemic,
              type: 'text' as const,
              content: mono.epistemicEvaluationAndResearchGaps[language] || mono.epistemicEvaluationAndResearchGaps.en
            },
            {
              heading: monoHeadings.sec9_conclusion,
              type: 'text' as const,
              content: mono.conclusionAndSynthesis[language] || mono.conclusionAndSynthesis.en
            }
          ]
        : [];
      return {
        id: item.id,
        title: mono ? mono.localizedTitle[language] || mono.localizedTitle.en : item.title,
        subtitle: `${localizeSynonymGroup(item.designation_group)} • ${item.geographical_association}`,
        badge: synonymSectionLabels.epistemicClasses[item.epistemic_classification] || item.epistemic_classification,
        location: item.geographical_association,
        imageUrl: vis?.imageUrl || synImgMap[item.id] || `${base}barabati_fort_gateway.jpg`,
        imageCaption: vis ? (vis.caption[language] || vis.caption.en) : undefined,
        imageLayout: 'banner',
        summaryLabel: mono ? monoHeadings.summaryLabel : undefined,
        summary: mono ? mono.executiveSummaryAndScope[language] || mono.executiveSummaryAndScope.en : undefined,
        content: `${item.historical_role[language] || item.historical_role.en}\n\n${synonymSectionLabels.epistemicLabel} ${epistemicText}`,
        metadata: [
          { label: synonymSectionLabels.colCategory, value: localizeSynonymGroup(item.designation_group) },
          { label: synonymSectionLabels.colGeography, value: item.geographical_association },
          { label: synonymSectionLabels.colEpistemic, value: synonymSectionLabels.epistemicClasses[item.epistemic_classification] || item.epistemic_classification },
          { label: step5Ui.synonymModal.linguisticOrigin, value: item.linguistic_origin },
          { label: step5Ui.synonymModal.primaryRegions, value: item.primary_regions.join(', ') },
          { label: step5Ui.synonymModal.prominentStates, value: item.prominent_states.join(', ') }
        ],
        sections: [
          ...monographSections,
          ...buildVisualDocSection(item.id),
          {
            heading: step5Ui.nativeScriptAttestations,
            type: 'tags',
            items: Object.entries(item.native_scripts).map(([k, v]) => `${k}: ${v}`)
          },
          {
            heading: step5Ui.synonymModal.sacredAssociations,
            type: 'list',
            items: Array.from(new Set(item.sacred_associations))
          },
          ...(mono && mono.references.length > 0
            ? [
                {
                  heading: step3Labels.referencesHeading,
                  type: 'list' as const,
                  items: mono.references.map(r => `${r.citation} [${r.type}]`)
                }
              ]
            : []),
          ...(mono && mono.relatedArticleIds.length > 0
            ? [
                {
                  heading: step3Labels.relatedArticlesHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(mono.relatedArticleIds)).map((id: string) => resolveRelatedLabel(id))
                }
              ]
            : []),
          ...(mono && mono.relatedKeywords.length > 0
            ? [
                {
                  heading: step3Labels.relatedKeywordsHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(mono.relatedKeywords)).map((kw: string) => {
                    const tr = translateKeyword(kw);
                    return tr !== kw ? `#${tr} (${kw})` : `#${kw}`;
                  })
                }
              ]
            : [])
        ]
      };
    }
    if (selectedModalRef.type === 'region') {
      const activeReg = GEOGRAPHICAL_SPREAD.find(r => r.id === selectedModalRef.id);
      if (!activeReg) return null;
      const vis = STEP4_VISUAL_ASSET_REGISTRY[activeReg.id];
      const regTitle = activeReg.localized_region[language] || activeReg.region_name;
      const regOverview = activeReg.regional_overview[language] || activeReg.regional_overview.en;
      const regImgMap: Record<string, string> = {
        geo_rajasthan_sindh_punjab: `${base}oad_hydraulic_stepwell.jpg`,
        geo_gujarat: `${base}jasma_devi_sahasralinga.jpg`,
        geo_maharashtra: `${base}shivayogi_siddharama_solapur.jpg`,
        geo_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
        geo_andhra_telangana: `${base}kondavidu_fort_hills.jpg`,
        geo_tamil_nadu: `${base}srirangam_temple.jpg`,
        geo_odisha: `${base}barabati_fort_gateway.jpg`
      };
      const relatedIds = REGION_RELATED_ARTICLE_IDS[activeReg.id] || [];
      return {
        id: activeReg.id,
        title: regTitle,
        subtitle: activeReg.states_and_territories.join(' • '),
        badge: step5Ui.geographyTab.spotlightPanelBadge,
        era: step5Ui.geographyTab.migrationEpochs[activeReg.id] || activeReg.migration_epoch_and_corridor,
        location: activeReg.prominent_cities_districts.join(', '),
        imageUrl: vis?.imageUrl || regImgMap[activeReg.id] || `${base}odra_kalinga_map.jpg`,
        imageCaption: vis ? (vis.caption[language] || vis.caption.en) : undefined,
        imageLayout: 'banner',
        content: regOverview,
        sections: [
          ...buildVisualDocSection(activeReg.id),
          {
            heading: step5Ui.geographyTab.predominantDesignationsLabel,
            type: 'tags',
            items: Array.from(new Set(activeReg.predominant_community_synonyms))
          },
          {
            heading: step5Ui.geographyTab.landmarkFortsLabel,
            type: 'list',
            items: Array.from(new Set(activeReg.historical_forts_and_landmarks))
          },
          {
            heading: step5Ui.geographyTab.sacredCentersLabel,
            type: 'list',
            items: Array.from(new Set(activeReg.sacred_centers))
          },
          ...(relatedIds.length > 0
            ? [
                {
                  heading: step3Labels.relatedArticlesHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(relatedIds)).map(id => resolveRelatedLabel(id))
                }
              ]
            : [])
        ],
        actionButton: {
          label: step5Ui.geographyTab.filterSynonymsBtn,
          onClick: () => {
            setSelectedRegionId(activeReg.id);
            setSearchTerm('');
            setDirectoryGroupFilter('all');
            setSynonymCategoryFilter('all');
            setActiveTab('synonyms');
            syncUrlParams('synonyms', null, activeReg.id);
            scrollToTargetSection();
          }
        }
      };
    }
    if (selectedModalRef.type === 'monograph') {
      const sec = HISTORICAL_MONOGRAPH_SECTIONS.find(s => s.id === selectedModalRef.id);
      if (!sec) return null;
      const vis = STEP4_VISUAL_ASSET_REGISTRY[sec.id];
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[sec.id];
      const monoHeadings = SYNONYM_MONOGRAPH_SECTION_HEADINGS[language] || SYNONYM_MONOGRAPH_SECTION_HEADINGS.en;
      const secTitle = mono
        ? mono.localizedTitle[language] || mono.localizedTitle.en
        : sec.section_title[language] || sec.section_title.en;
      const secContent = sec.content[language] || sec.content.en;
      const localizedKeyPoints = step5Ui.monographTab.chapterKeyPoints[sec.id] || sec.key_points;
      const monoImgMap: Record<string, string> = {
        mono_part_1_primordial: `${base}surya_konark_sculpture.jpg`,
        mono_part_2_kharavela: `${base}emperor_kharavela_udayagiri.jpg`,
        mono_part_3_synonyms: `${base}copper_plate_charter.jpg`,
        mono_part_4_jasma_siddharama: `${base}jasma_devi_sahasralinga.jpg`,
        mono_part_5_gajapathi_diaspora: `${base}kondavidu_fort_hills.jpg`,
        mono_part_6_geographical_map: `${base}gajapathi_empire_map_1465.jpg`,
        mono_part_7_kolletikota: `${base}peddintlamma_temple_kolletikota.jpg`,
        mono_part_8_epigraphic_evolution: `${base}hathigumpha_inscription.jpg`
      };
      const monographSections = mono
        ? [
            {
              heading: monoHeadings.sec2_linguistics,
              type: 'text' as const,
              content: mono.terminologyAndLinguisticAnalysis[language] || mono.terminologyAndLinguisticAnalysis.en
            },
            {
              heading: monoHeadings.sec3_chronology,
              type: 'text' as const,
              content: mono.chronologicalHistory[language] || mono.chronologicalHistory.en
            },
            {
              heading: monoHeadings.sec4_geography,
              type: 'text' as const,
              content: mono.geographicalAndSettlementAnalysis[language] || mono.geographicalAndSettlementAnalysis.en
            },
            {
              heading: monoHeadings.sec5_culture,
              type: 'text' as const,
              content: mono.culturalAndSocialTraditions[language] || mono.culturalAndSocialTraditions.en
            },
            {
              heading: monoHeadings.sec6_professions,
              type: 'text' as const,
              content: mono.occupationalAndProfessionalHeritage[language] || mono.occupationalAndProfessionalHeritage.en
            },
            {
              heading: monoHeadings.sec7_evidence,
              type: 'text' as const,
              content: mono.epigraphicAndDocumentaryEvidence[language] || mono.epigraphicAndDocumentaryEvidence.en
            },
            {
              heading: monoHeadings.sec8_epistemic,
              type: 'text' as const,
              content: mono.epistemicEvaluationAndResearchGaps[language] || mono.epistemicEvaluationAndResearchGaps.en
            },
            {
              heading: monoHeadings.sec9_conclusion,
              type: 'text' as const,
              content: mono.conclusionAndSynthesis[language] || mono.conclusionAndSynthesis.en
            }
          ]
        : [];
      return {
        id: sec.id,
        title: secTitle,
        subtitle: step5Ui.monographTab.heading,
        badge: step5Ui.monographTab.badge,
        author: 'Suryavamsha Archival Research Council',
        imageUrl: vis?.imageUrl || monoImgMap[sec.id] || `${base}barabati_fort_gateway.jpg`,
        imageCaption: vis ? (vis.caption[language] || vis.caption.en) : undefined,
        imageLayout: 'banner',
        summaryLabel: mono ? monoHeadings.summaryLabel : undefined,
        summary: mono ? (mono.executiveSummaryAndScope[language] || mono.executiveSummaryAndScope.en) : undefined,
        content: secContent,
        sections: [
          ...monographSections,
          ...buildVisualDocSection(sec.id),
          ...(localizedKeyPoints && localizedKeyPoints.length > 0
            ? [{ heading: step5Ui.monographTab.keyTakeawaysHeading, type: 'list' as const, items: localizedKeyPoints }]
            : []),
          ...(mono && mono.references.length > 0
            ? [
                {
                  heading: step3Labels.referencesHeading,
                  type: 'list' as const,
                  items: mono.references.map(r => `${r.citation} [${r.type}]`)
                }
              ]
            : []),
          ...(mono && mono.relatedArticleIds.length > 0
            ? [
                {
                  heading: step3Labels.relatedArticlesHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(mono.relatedArticleIds)).map((id: string) => resolveRelatedLabel(id))
                }
              ]
            : []),
          ...(mono && mono.relatedKeywords.length > 0
            ? [
                {
                  heading: step3Labels.relatedKeywordsHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(mono.relatedKeywords)).map((kw: string) => {
                    const tr = translateKeyword(kw);
                    return tr !== kw ? `#${tr} (${kw})` : `#${kw}`;
                  })
                }
              ]
            : [])
        ]
      };
    }
    if (selectedModalRef.type === 'community_dir') {
      const entry = COMMUNITY_DIRECTORY_ITEMS.find(c => c.id === selectedModalRef.id);
      if (!entry) return null;
      const detailed = COMMUNITY_HERITAGE_DETAILED_ARTICLES.find(a => a.id === entry.id);
      const vis = STEP4_VISUAL_ASSET_REGISTRY[entry.id];
      const linkedSyn = entry.linkedSynonymId
        ? COMMUNITY_SYNONYMS.find(s => s.id === entry.linkedSynonymId)
        : undefined;
      const locName = entry.localizedName[language] || entry.localizedName.en;
      const locGroup = entry.localizedCategoryGroup[language] || entry.localizedCategoryGroup.en;
      const locGeo = entry.geographicalSpread[language] || entry.geographicalSpread.en;
      const locEpistemic = entry.epistemicClassification[language] || entry.epistemicClassification.en;
      const locOverview = entry.overview[language] || entry.overview.en;
      const assocProfNames = entry.professionalCategoryNumbers
        .map(num => {
          const cat = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.categoryNumber === num);
          return cat ? `${cat.categoryNumber}. ${cat.title[language] || cat.title.en}` : '';
        })
        .filter(Boolean);

      const articleBlocks: string[] = [locOverview];
      if (detailed) {
        articleBlocks.push(
          `■ ${step3Labels.historicalAnalysisHeading}:\n${
            detailed.historicalAnalysis[language] || detailed.historicalAnalysis.en
          }`,
          `■ ${step3Labels.culturalBackgroundHeading}:\n${
            detailed.culturalBackground[language] || detailed.culturalBackground.en
          }`,
          `■ ${step3Labels.professionalHeritageHeading}:\n${
            detailed.professionalHeritageSummary[language] || detailed.professionalHeritageSummary.en
          }`,
          `■ ${step3Labels.documentedExamplesHeading}:\n${
            detailed.documentedExamples[language] || detailed.documentedExamples.en
          }`,
          `■ ${step3Labels.epistemicDistinctionHeading}:\n${
            detailed.epistemicDistinctionNote[language] || detailed.epistemicDistinctionNote.en
          }`
        );
      }
      if (linkedSyn) {
        articleBlocks.push(
          `■ ${step3Labels.preservedSynonymHeading} (${linkedSyn.title}):\n${
            linkedSyn.historical_role[language] || linkedSyn.historical_role.en
          }\n${synonymSectionLabels.epistemicLabel} ${
            linkedSyn.epistemic_note[language] || linkedSyn.epistemic_note.en
          }`
        );
      }

      const nonRedundantRelatedIds = detailed
        ? Array.from(new Set(detailed.relatedArticleIds.filter((id: string) => !id.startsWith('prof_cat_'))))
        : [];
      const uniqueKeywords = detailed ? Array.from(new Set(detailed.relatedKeywords)) : [];

      return {
        id: entry.id,
        title: `${entry.orderNumber}. ${locName}${locName !== entry.canonicalName ? ` (${entry.canonicalName})` : ''}`,
        subtitle: `${locGroup} • ${locGeo}`,
        badge: locEpistemic,
        location: locGeo,
        imageUrl: vis?.imageUrl || detailed?.imageUrl || `${base}barabati_fort_gateway.jpg`,
        imageCaption: vis ? (vis.caption[language] || vis.caption.en) : undefined,
        imageLayout: 'banner',
        content: articleBlocks.join('\n\n'),
        metadata: [
          {
            label: synonymSectionLabels.colDesignation,
            value: locName !== entry.canonicalName ? `${entry.canonicalName} (${locName})` : entry.canonicalName
          },
          { label: synonymSectionLabels.colCategory, value: locGroup },
          { label: synonymSectionLabels.colGeography, value: locGeo },
          { label: synonymSectionLabels.colEpistemic, value: locEpistemic },
          { label: synonymSectionLabels.statesLabel, value: entry.prominentStates.join(', ') }
        ],
        sections: [
          ...buildVisualDocSection(entry.id),
          {
            heading: step5Ui.nativeScriptAttestations,
            type: 'tags',
            items: Object.entries(entry.nativeScripts).map(([k, v]) => `${k}: ${v}`)
          },
          {
            heading: step2Labels.associatedProfessionsLabel,
            type: 'list',
            items: assocProfNames
          },
          ...(detailed && detailed.references.length > 0
            ? [
                {
                  heading: step3Labels.referencesHeading,
                  type: 'list' as const,
                  items: detailed.references.map(r => `${r.citation} [${r.type}]`)
                }
              ]
            : []),
          ...(nonRedundantRelatedIds.length > 0
            ? [
                {
                  heading: step3Labels.relatedArticlesHeading,
                  type: 'tags' as const,
                  items: nonRedundantRelatedIds.map((id: string) => resolveRelatedLabel(id))
                }
              ]
            : []),
          ...(uniqueKeywords.length > 0
            ? [
                {
                  heading: step3Labels.relatedKeywordsHeading,
                  type: 'tags' as const,
                  items: uniqueKeywords.map((kw: string) => {
                    const tr = translateKeyword(kw);
                    return tr !== kw ? `#${tr} (${kw})` : `#${kw}`;
                  })
                }
              ]
            : [])
        ]
      };
    }
    if (selectedModalRef.type === 'profession_cat') {
      const cat = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.id === selectedModalRef.id);
      if (!cat) return null;
      const primaryVis = cat.visualAssets && cat.visualAssets.length > 0 ? cat.visualAssets[0] : undefined;
      const titleText = cat.title[language] || cat.title.en;
      const subText = cat.shortSummary[language] || cat.shortSummary.en;
      const defText = cat.definitionAndExplanation[language] || cat.definitionAndExplanation.en;
      const histText = cat.historicalBackground[language] || cat.historicalBackground.en;
      const toolsText = cat.toolsMaterialsAndTechniques[language] || cat.toolsMaterialsAndTechniques.en;
      const cultText = cat.culturalAndRegionalSignificance[language] || cat.culturalAndRegionalSignificance.en;
      const exText = cat.documentedHistoricalExamples[language] || cat.documentedHistoricalExamples.en;
      const contribText = cat.contributionsToSociety[language] || cat.contributionsToSociety.en;
      const distText =
        cat.communitySpecificConnectionsAndDistinctions[language] ||
        cat.communitySpecificConnectionsAndDistinctions.en;
      const methText = cat.epistemicAndMethodologicalNote[language] || cat.epistemicAndMethodologicalNote.en;
      const combinedMonograph = [
        `■ ${getHeading('secB')}:\n${defText}`,
        `■ ${getHeading('secC')}:\n${histText}`,
        `■ ${getHeading('secJ')}:\n${toolsText}`,
        `■ ${getHeading('secF')}:\n${cultText}`,
        `■ ${getHeading('secO')}:\n${exText}`,
        `■ ${getHeading('secP')}:\n${contribText}`,
        `■ ${getHeading('secQ')}:\n${distText}`,
        `■ ${getHeading('secR')}:\n${methText}`
      ].join('\n\n');
      return {
        id: cat.id,
        title: titleText,
        subtitle: subText,
        badge: step2Labels.profCategoriesBadge,
        imageUrl: primaryVis ? primaryVis.imageUrl : `${base}kondavidu_fort_hills.jpg`,
        imageCaption: primaryVis ? (primaryVis.caption[language] || primaryVis.caption.en) : undefined,
        imageLayout: 'banner',
        content: combinedMonograph,
        sections: [
          ...(primaryVis
            ? [
                {
                  heading: step4VisualLabels.visualDocumentationHeading,
                  type: 'list' as const,
                  items: Array.from(
                    new Set([
                      `${step4VisualLabels.imageTitleLabel}: ${primaryVis.title[language] || primaryVis.title.en}`,
                      `${step4VisualLabels.visualTypeLabel}: ${
                        step5Ui.visualTypeLabels[primaryVis.visualType] || primaryVis.visualType
                      }`,
                      `${step4VisualLabels.imageCaptionLabel}: ${primaryVis.caption[language] || primaryVis.caption.en}`,
                      `${step4VisualLabels.sourceAttributionLabel}: ${primaryVis.sourceAttribution}`,
                      ...(primaryVis.mapDisclaimer
                        ? [primaryVis.mapDisclaimer[language] || primaryVis.mapDisclaimer.en]
                        : [])
                    ])
                  )
                }
              ]
            : []),
          {
            heading: step2Labels.subcategoriesLabel,
            type: 'list',
            items: cat.includedSubClassifications.map(
              sub => `${sub.name[language] || sub.name.en} — ${sub.description[language] || sub.description.en}`
            )
          },
          ...(cat.references && cat.references.length > 0
            ? [
                {
                  heading: getHeading('secS'),
                  type: 'list' as const,
                  items: cat.references.map(r => `${r.citation} [${r.type}]`)
                }
              ]
            : []),
          ...(cat.relatedArticles && cat.relatedArticles.length > 0
            ? [
                {
                  heading: step3Labels.relatedArticlesHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(cat.relatedArticles.map(rel => rel.label[language] || rel.label.en)))
                }
              ]
            : []),
          ...(cat.relatedKeywords && cat.relatedKeywords.length > 0
            ? [
                {
                  heading: step3Labels.relatedKeywordsHeading,
                  type: 'tags' as const,
                  items: Array.from(new Set(cat.relatedKeywords)).map((kw: string) => {
                    const tr = translateKeyword(kw);
                    return tr !== kw ? `#${tr} (${kw})` : `#${kw}`;
                  })
                }
              ]
            : [])
        ]
      };
    }
    return null;
  }, [selectedModalRef, language, synonymSectionLabels, step2Labels, step3Labels, step4VisualLabels, step5Ui]);

  const applyUrlTargetState = React.useCallback(
    (explicitItemId?: string | null) => {
      if (typeof window === 'undefined') return;
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      const regionParam = urlParams.get('region');
      const urlItemId = urlParams.get('id') || urlParams.get('figure') || urlParams.get('article');
      const targetId = urlItemId || (!tabParam ? explicitItemId : null);

      if (regionParam && GEOGRAPHICAL_SPREAD.some(r => r.id === regionParam)) {
        setSelectedRegionId(regionParam);
      }

      if (
        tabParam === 'figures' ||
        tabParam === 'synonyms' ||
        tabParam === 'professions' ||
        tabParam === 'geography' ||
        tabParam === 'history'
      ) {
        setActiveTab(tabParam);
      } else if (initialTab) {
        setActiveTab(initialTab);
      }

      if (!targetId) {
        setSelectedFigure(null);
        setSelectedModalRef(null);
        return;
      }

      const foundFig = HISTORICAL_FIGURES.find(f => f.id === targetId);
      if (foundFig) {
        setActiveTab('figures');
        setSelectedModalRef(null);
        setSelectedFigure(foundFig);
        return;
      }

      const foundSyn = COMMUNITY_SYNONYMS.find(s => s.id === targetId);
      if (foundSyn) {
        setActiveTab('synonyms');
        setSelectedFigure(null);
        setSelectedModalRef({ type: 'synonym', id: foundSyn.id });
        return;
      }

      const foundComm = COMMUNITY_DIRECTORY_ITEMS.find(c => c.id === targetId);
      if (foundComm) {
        setActiveTab('synonyms');
        setSelectedFigure(null);
        setSelectedModalRef({ type: 'community_dir', id: foundComm.id });
        return;
      }

      const foundProf = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.id === targetId);
      if (foundProf) {
        setActiveTab('professions');
        setSelectedFigure(null);
        setSelectedModalRef({ type: 'profession_cat', id: foundProf.id });
        return;
      }

      const foundReg = GEOGRAPHICAL_SPREAD.find(r => r.id === targetId);
      if (foundReg) {
        setActiveTab('geography');
        setSelectedRegionId(foundReg.id);
        setSelectedFigure(null);
        setSelectedModalRef({ type: 'region', id: foundReg.id });
        return;
      }

      const foundMono = HISTORICAL_MONOGRAPH_SECTIONS.find(m => m.id === targetId);
      if (foundMono) {
        setActiveTab('history');
        setSelectedFigure(null);
        setSelectedModalRef({ type: 'monograph', id: foundMono.id });
      }
    },
    [initialTab]
  );

  useEffect(() => {
    applyUrlTargetState(initialItemId);
  }, [initialItemId, initialTab, applyUrlTargetState]);

  useEffect(() => {
    const handlePopState = () => {
      applyUrlTargetState(undefined);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [applyUrlTargetState]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFigure(null);
        setSelectedModalRef(null);
        syncUrlParams(activeTab, null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, syncUrlParams]);

  // Helper to check if a state list or article ID belongs to a selected region
  const doesItemMatchRegion = (itemId: string, itemStates: string[], regionId: string | null): boolean => {
    if (!regionId) return true;
    const reg = GEOGRAPHICAL_SPREAD.find(g => g.id === regionId);
    if (!reg) return true;
    if ((REGION_RELATED_ARTICLE_IDS[regionId] || []).includes(itemId)) {
      return true;
    }
    const mappedSynonymIds = reg.predominant_community_synonyms.map(syn => resolveDesignationTargetId(syn));
    if (mappedSynonymIds.includes(itemId)) {
      return true;
    }
    return itemStates.some(st => {
      const stLower = st.toLowerCase();
      if (stLower.includes('all indian states') || stLower.includes('pan-indian')) return true;
      return reg.states_and_territories.some(regSt => {
        const regStLower = regSt.toLowerCase();
        return regStLower.includes(stLower) || stLower.includes(regStLower);
      });
    });
  };

  // Filtered 16-Community Directory Items
  const filteredCommunityDirectory = COMMUNITY_DIRECTORY_ITEMS.filter(item => {
    const term = searchTerm.toLowerCase();
    const locName = (item.localizedName[language] || item.localizedName.en).toLowerCase();
    const locOverview = (item.overview[language] || item.overview.en).toLowerCase();
    const locGeo = (item.geographicalSpread[language] || item.geographicalSpread.en).toLowerCase();

    const matchesSearch =
      !term ||
      item.canonicalName.toLowerCase().includes(term) ||
      locName.includes(term) ||
      locOverview.includes(term) ||
      locGeo.includes(term) ||
      item.prominentStates.some(st => st.toLowerCase().includes(term));

    const matchesGroup = directoryGroupFilter === 'all' || item.categoryGroup === directoryGroupFilter;

    const matchesRegion = doesItemMatchRegion(item.id, item.prominentStates, selectedRegionId);

    return matchesSearch && matchesGroup && matchesRegion;
  });

  // Filtered 9 Professional Heritage Categories
  const filteredProfessions = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.filter(cat => {
    const term = searchTerm.toLowerCase();
    const title = (cat.title[language] || cat.title.en).toLowerCase();
    const sub = (cat.shortSummary[language] || cat.shortSummary.en).toLowerCase();
    const def = (cat.definitionAndExplanation[language] || cat.definitionAndExplanation.en).toLowerCase();
    const matchesSearch =
      !term ||
      title.includes(term) ||
      sub.includes(term) ||
      def.includes(term) ||
      cat.includedSubClassifications.some(
        sc =>
          (sc.name[language] || sc.name.en).toLowerCase().includes(term) ||
          (sc.description[language] || sc.description.en).toLowerCase().includes(term)
      );

    const matchesNumber =
      selectedProfessionCatNumber === 'all' || cat.categoryNumber === selectedProfessionCatNumber;

    return matchesSearch && matchesNumber;
  });

  // Filtered Synonyms
  const filteredSynonyms = COMMUNITY_SYNONYMS.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(term) ||
      s.geographical_association.toLowerCase().includes(term) ||
      s.designation_group.toLowerCase().includes(term) ||
      s.primary_regions.some(r => r.toLowerCase().includes(term)) ||
      s.prominent_states.some(st => st.toLowerCase().includes(term)) ||
      (s.historical_role[language] || s.historical_role.en).toLowerCase().includes(term) ||
      (s.epistemic_note[language] || s.epistemic_note.en).toLowerCase().includes(term);

    const matchesCategory =
      synonymCategoryFilter === 'all' ||
      s.designation_group === synonymCategoryFilter ||
      s.category.toLowerCase().includes(synonymCategoryFilter.toLowerCase());

    const matchesRegion = doesItemMatchRegion(s.id, s.prominent_states, selectedRegionId);

    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Filtered Figures
  const filteredFigures = HISTORICAL_FIGURES.filter(f => {
    const term = searchTerm.toLowerCase();
    const locName = (f.localized_name[language] || f.canonical_name).toLowerCase();
    const summary = (f.summary[language] || f.summary.en).toLowerCase();
    const titles = (f.titles[language] || f.titles.en).toLowerCase();

    return (
      locName.includes(term) ||
      f.alternate_names.some(a => a.toLowerCase().includes(term)) ||
      summary.includes(term) ||
      titles.includes(term) ||
      f.associated_places.some(p => p.toLowerCase().includes(term))
    );
  });

  const refOptionsDict: Record<
    LanguageCode,
    {
      heading: string;
      seeAction: string;
      activeSectionBadge: string;
      backToOptionsBtn: string;
      synonyms: string;
      professions: string;
      figures: string;
      geography: string;
      history: string;
    }
  > = {
    en: {
      heading: '👇Select a Topic and See👇',
      seeAction: '👈 See',
      activeSectionBadge: 'Currently Viewing Reference Section',
      backToOptionsBtn: '↑ Reference Options',
      synonyms: '1. 16-Community Directory & Synonyms',
      professions: '2. 9 Professional Heritage Categories',
      figures: '3. Foundational Sovereign & Sacred Figures',
      geography: '4. Pan-Indian Geographical Spreading',
      history: '5. Documentary History & Monograph Chapters'
    },
    hi: {
      heading: '👇एक विषय चुनें और देखें👇',
      seeAction: '👈 देखें',
      activeSectionBadge: 'वर्तमान में चयनित संदर्भ अनुभाग',
      backToOptionsBtn: '↑ संदर्भ विकल्प',
      synonyms: '1. 16-समुदाय निर्देशिका और पर्यायवाची नाम',
      professions: '2. 9 व्यावसायिक विरासत श्रेणियाँ',
      figures: '3. संस्थापक संप्रभु और पवित्र विभूतियाँ',
      geography: '4. अखिल भारतीय भौगोलिक विस्तार',
      history: '5. दस्तावेजी इतिहास और मोनोग्राफ अध्याय'
    },
    te: {
      heading: '👇ఒక అంశాన్ని ఎంచుకుని చూడండి👇',
      seeAction: '👈 చూడండి',
      activeSectionBadge: 'ప్రస్తుతం చూస్తున్న రిఫరెన్స్ విభాగం',
      backToOptionsBtn: '↑ రిఫరెన్స్ ఎంపికలు',
      synonyms: '1. 16-సమాజ డైరెక్టరీ & పర్యాయపదాలు',
      professions: '2. 9 వృత్తిపరమైన వారసత్వ విభాగాలు',
      figures: '3. మూల సార్వభౌమ & పవిత్ర మూర్తులు',
      geography: '4. పాన్-ఇండియన్ భౌగోళిక విస్తరణ',
      history: '5. డాక్యుమెంటరీ చరిత్ర & మోనోగ్రాఫ్ అధ్యాయాలు'
    },
    kn: {
      heading: '👇ಒಂದು ವಿಷಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ನೋಡಿ👇',
      seeAction: '👈 ನೋಡಿ',
      activeSectionBadge: 'ಪ್ರಸ್ತುತ ವೀಕ್ಷಿಸುತ್ತಿರುವ ಉಲ್ಲೇಖ ವಿಭಾಗ',
      backToOptionsBtn: '↑ ಉಲ್ಲೇಖ ಆಯ್ಕೆಗಳು',
      synonyms: '1. 16-ಸಮುದಾಯ ನಿರ್ದೇಶಿಕೆ ಮತ್ತು ಸಮಾನಾರ್ಥಕ ನಾಮಗಳು',
      professions: '2. 9 ವೃತ್ತಿಪರ ಪರಂಪರೆಯ ವಿಭಾಗಗಳು',
      figures: '3. ಮೂಲ ಸಾರ್ವಭೌಮ ಮತ್ತು ಪವಿತ್ರ ವ್ಯಕ್ತಿಗಳು',
      geography: '4. ಅಖಿಲ ಭಾರತ ಭೌಗೋಳಿಕ ವಿಸ್ತರಣೆ',
      history: '5. ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಇತಿಹಾಸ ಮತ್ತು ಮೊನೊಗ್ರಾಫ್ ಅಧ್ಯಾಯಗಳು'
    },
    ta: {
      heading: '👇ஒரு தலைப்பைத் தேர்ந்தெடுத்துப் பார்க்கவும்👇',
      seeAction: '👈 பார்க்க',
      activeSectionBadge: 'தற்போது பார்க்கும் குறிப்புப் பிரிவு',
      backToOptionsBtn: '↑ குறிப்பு விருப்பங்கள்',
      synonyms: '1. 16-சமூக அடைவு மற்றும் மாற்றுப் பெயர்கள்',
      professions: '2. 9 தொழில்முறை பாரம்பரியப் பிரிவுகள்',
      figures: '3. அடிப்படை இறையான்மை மற்றும் புனித ஆளுமைகள்',
      geography: '4. அகில இந்திய புவியியல் பரவல்',
      history: '5. ஆவண வரலாறு மற்றும் தனிக்கட்டுரை அத்தியாயங்கள்'
    },
    mr: {
      heading: '👇एक विषय निवडा आणि पहा👇',
      seeAction: '👈 पहा',
      activeSectionBadge: 'सध्या पाहत असलेला संदर्भ विभाग',
      backToOptionsBtn: '↑ संदर्भ पर्याय',
      synonyms: '1. 16-समुदाय निर्देशिका आणि समानार्थी नावे',
      professions: '2. 9 व्यावसायिक वारसा श्रेणी',
      figures: '3. मूळ सार्वभौम आणि पवित्र विभूती',
      geography: '4. अखिल भारतीय भौगोलिक विस्तार',
      history: '5. दस्तऐवजी इतिहास आणि मोनोग्राफ प्रकरणे'
    },
    or: {
      heading: '👇ଏକ ବିଷୟ ବାଛନ୍ତୁ ଏବଂ ଦେଖନ୍ତୁ👇',
      seeAction: '👈 ଦେଖନ୍ତୁ',
      activeSectionBadge: 'ବର୍ତ୍ତମାନ ଦେଖୁଥିବା ସନ୍ଦର୍ଭ ବିଭାଗ',
      backToOptionsBtn: '↑ ସନ୍ଦର୍ଭ ବିକଳ୍ପ',
      synonyms: '1. 16-ସମ୍ପ୍ରଦାୟ ନିର୍ଦ୍ଦେଶିକା ଓ ପର୍ଯ୍ୟାୟବାଚୀ ନାମ',
      professions: '2. 9 ବୃତ୍ତିଗତ ଐତିହ୍ୟ ବର୍ଗ',
      figures: '3. ମୂଳ ସାର୍ବଭୌମ ଓ ପବିତ୍ର ବ୍ୟକ୍ତିତ୍ୱ',
      geography: '4. ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ବିସ୍ତାର',
      history: '5. ପ୍ରାମାଣିକ ଇତିହାସ ଓ ମନୋଗ୍ରାଫ୍ ଅଧ୍ୟାୟ'
    },
    bn: {
      heading: '👇একটি বিষয় নির্বাচন করুন এবং দেখুন👇',
      seeAction: '👈 দেখুন',
      activeSectionBadge: 'বর্তমানে প্রদর্শিত রেফারেন্স বিভাগ',
      backToOptionsBtn: '↑ রেফারেন্স বিকল্প',
      synonyms: '1. 16-সম্প্রদায় ডিরেক্টরি ও সমার্থক নাম',
      professions: '2. 9 পেশাগত ঐতিহ্য বিভাগ',
      figures: '3. আদি সার্বভৌম ও পবিত্র ব্যক্তিত্ব',
      geography: '4. সর্বভারতীয় ভৌগোলিক বিস্তার',
      history: '5. প্রামাণ্য ইতিহাস ও মনোগ্রাফ অধ্যায়'
    }
  };

  const refText = refOptionsDict[language] || refOptionsDict.en;

  const referenceTabs: Array<{
    id: 'synonyms' | 'professions' | 'figures' | 'geography' | 'history';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    { id: 'synonyms', label: refText.synonyms, icon: Users },
    { id: 'professions', label: refText.professions, icon: Shield },
    { id: 'figures', label: refText.figures, icon: Crown },
    { id: 'geography', label: refText.geography, icon: MapPin },
    { id: 'history', label: refText.history, icon: BookOpen }
  ];

  const activeReferenceOption =
    referenceTabs.find(tab => tab.id === activeTab) || referenceTabs[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2a0614] via-[#1c1224] to-[#0c101c] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{step5Ui.heroBadge}</span>
          </div>

          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            {language === 'te'
              ? 'వంశావళి, ఆరాధ్య పితామహులు & అఖిల భారత భౌగోళిక విస్తరణ'
              : language === 'or'
              ? 'ବଂଶାବଳୀ, ପୂଜ୍ୟ ପୂର୍ବପୁରୁଷ ଓ ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ବିସ୍ତାର'
              : language === 'hi'
              ? 'वंशावली, पूज्य आदि-पुरुष एवं अखिल भारतीय भौगोलिक प्रसार'
              : language === 'kn'
              ? 'ವಂಶಾವಳಿ, ಆದ್ಯ ಪಿತಾಮಹರು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಭೌಗೋಳಿಕ ಹರಡುವಿಕೆ'
              : language === 'ta'
              ? 'வம்சாவளி, புனித முன்னோடிகள் மற்றும் அகில இந்திய புவியியல் பரவல்'
              : language === 'mr'
              ? 'वंशावळ, पूज्य पूर्वज आणि अखिल भारतीय भौगोलिक विस्तार'
              : language === 'bn'
              ? 'বংশলতিকা, পূজ্য আদি পুরুষ ও সর্বভারতীয় ভৌগোলিক বিস্তার'
              : 'Lineage, Sacred Progenitors & Pan-Indian Geographical Spreading'}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {language === 'te'
              ? 'ప్రాచీన సూర్యవంశ చక్రవర్తులు (సగరుడు, భగీరథుడు, శ్రీరాముడు), కళింగ-ఓడ్ర సమ్రాట్ ఖారవేలుడు నుండి పవిత్ర రక్షకులు (మాతా జస్మా దేవి, సిద్ధరామేశ్వరుడు) వరకు — ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ, ఒడ్డే, వడ్డెరాజులు మరియు వడ్డార్ సమాజాల చారిత్రక ప్రస్థానం.'
              : language === 'hi'
              ? 'प्राचीन सूर्यवंशी चक्रवर्ती सम्राटों (सगर, भगीरथ, श्रीराम) एवं कलिंग-ओड्र सम्राट खारवेल से लेकर पवित्र रक्षकों (माता जस्मा देवी, संत सिद्धरामेश्वर) तक — ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु, वड्डार और ओड्डार समाज का गौरवशाली इतिहास।'
              : language === 'or'
              ? 'ପ୍ରାଚୀନ ସୂର୍ଯ୍ୟବଂଶୀ ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ (ସଗର, ଭଗୀରଥ, ଶ୍ରୀରାମ) ଓ କଳିଙ୍ଗ-ଓଡ଼୍ର ସମ୍ରାଟ ଖାରବେଳଙ୍କଠାରୁ ଆରମ୍ଭ କରି ପବିତ୍ର ରକ୍ଷକ (ମାତା ଜସ୍ମା ଦେବୀ, ସନ୍ଥ ସିଦ୍ଧରାମେଶ୍ୱର) ପର୍ଯ୍ୟନ୍ତ — ଓଡ଼-ରାଜପୁତ, ଓଡ଼-କ୍ଷତ୍ରିୟ, ଓଡ଼ିଆରାଜୁ ଓ ୱଡ୍ଡାର ସମାଜର ଗୌରବমୟ ଇତିହାସ।'
              : language === 'kn'
              ? 'ಪ್ರಾಚೀನ ಸೂರ್ಯವಂಶ ಚಕ್ರವರ್ತಿಗಳು (ಸಗರ, ಭಗೀರಥ, ಶ್ರೀರಾಮ) ಮತ್ತು ಕಳಿಂಗ-ಓಡ್ರ ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನಿಂದ ಪವಿತ್ರ ರಕ್ಷಕರಾದ (ಮಾತಾ ಜಸ್ಮಾ ದೇವಿ, ಸಂತ ಸಿದ್ಧರಾಮೇಶ್ವರ) ವರೆಗೆ — ಓಡ್-ರಜಪೂತ್, ಓಡ್-ಕ್ಷತ್ರಿಯ, ಒಡ್ಡೇ, ವಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡ್ಡರ್ ಸಮುದಾಯಗಳ ಐತಿಹಾಸಿಕ ಪಯಣ.'
              : language === 'ta'
              ? 'பண்டைய சூர்யவம்ச சக்கரவர்த்திகள் (சகரர், பகீரதன், ஸ்ரீராமர்) மற்றும் கலிங்க-ஒட்டர பேரரசர் காரவேலன் முதல் புனித பாதுகாவலர்கள் (மாதா ஜஸ்மா தேவி, சித்தராமேஸ்வரர்) வரை — ஓட்-ராஜ்புத், ஓட்-க்ஷத்ரிய, ஒட்டே, வட்டேராஜுலு மற்றும் ஒட்டர் சமூகங்களின் வரலாற்றுப் பயணம்.'
              : language === 'mr'
              ? 'प्राचीन सूर्यवंशी चक्रवर्ती सम्राट (सगर, भगीरथ, श्रीराम) आणि कलिंग-ओड्र सम्राट खारवेल यांच्यापासून पवित्र रक्षकांपर्यंत (माता जस्मा देवी, संत सिद्धरामेश्वर) — ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु आणि वड्डार समाजाचा गौरवशाली इतिहास.'
              : language === 'bn'
              ? 'প্রাচীন সূর্যবংশী চক্রবর্তী সম্রাট (সগর, ভগীরথ, শ্রীরাম) এবং কলিঙ্গ-ওড্র সম্রাট খারবেল থেকে শুরু করে পবিত্র রক্ষক (মাতা জস্মা দেবী, সন্ত সিদ্ধরামেশ্বর) পর্যন্ত — ওড-রাজপুত, ওড-ক্ষত্রিয়, ওড্ডেরাজুলু এবং ওড্ডার সমাজের গৌরবময় ইতিহাস।'
              : 'Documenting the epic civilizational journey of the Oad-Rajput, Od-Kshatriya, OddeRajulu, VaddeRajulu, and Waddar communities across 8 major Indian geographical corridors, linking classical epigraphy with living sacred tradition.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#580014]/60 border border-[#d4af37]/30 text-[#fcedc7] flex items-center gap-1.5">
              <Crown className="w-3 h-3 text-[#d4af37]" /> {step5Ui.heroChips[0]}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Droplets className="w-3 h-3 text-cyan-400" /> {step5Ui.heroChips[1]}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-amber-400" /> {step5Ui.heroChips[2]}
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-emerald-400" /> {step5Ui.heroChips[3]}
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation — Vertical Reference Options */}
      <div
        id="reference-options-menu"
        ref={referenceMenuRef}
        className="scroll-mt-24 bg-[#121624] border border-[#c99738]/40 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl"
      >
        <h2 className="font-royal-heading font-bold text-sm sm:text-base md:text-lg text-[#fae29c] text-center tracking-wide pb-2 border-b border-stone-800">
          {refText.heading}
        </h2>
        <div className="flex flex-col gap-3">
          {referenceTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-expanded={isActive}
                aria-controls={`section-${tab.id}`}
                onClick={() => handleSelectReferenceOption(tab.id)}
                className={`w-full px-4 py-3.5 rounded-xl text-xs sm:text-sm md:text-base font-semibold flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#580014] to-[#78001c] text-[#fae29c] border border-[#d4af37] shadow-lg shadow-[#580014]/40'
                    : 'bg-stone-900/80 text-stone-200 hover:text-[#fae29c] hover:bg-stone-800/90 border border-stone-800 hover:border-[#c99738]/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 ${isActive ? 'text-[#d4af37]' : 'text-[#c99738]'}`} />
                  <span className="leading-snug break-words">{tab.label}</span>
                </div>
                <span
                  className={`shrink-0 px-3 py-1 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-[#d4af37]/20 text-[#fae29c] border border-[#d4af37]/50'
                      : 'bg-[#1a2130] text-[#dfab43] border border-[#c99738]/30'
                  }`}
                >
                  {refText.seeAction}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Content Scroll Anchor & Active Reference Banner */}
      <div
        id="heritage-target-content"
        ref={targetContentRef}
        className="scroll-mt-24 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#260713] via-[#151a2b] to-[#121624] px-4 py-3.5 rounded-2xl border border-[#d4af37]/50 shadow-lg">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-[#580014] border border-[#d4af37]/40 shrink-0">
              {(() => {
                const ActiveIcon = activeReferenceOption.icon;
                return <ActiveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />;
              })()}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wider font-bold text-[#d4af37]">
                {refText.activeSectionBadge}
              </div>
              <div className="font-royal-heading font-bold text-sm sm:text-base text-[#fae29c] break-words">
                {activeReferenceOption.label}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              referenceMenuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="self-start sm:self-auto shrink-0 px-3 py-1.5 rounded-xl bg-stone-900/90 hover:bg-[#580014] text-xs font-semibold text-[#fae29c] border border-[#d4af37]/40 transition-colors cursor-pointer"
          >
            {refText.backToOptionsBtn}
          </button>
        </div>

        {/* Universal Search & Quick Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121624] p-4 rounded-2xl border border-stone-800">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={translateText('search_placeholder', 'Search communities, professions, figures, regions...')}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-900/90 border border-stone-700/80 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
              >
                {step5Ui.clearBtn}
              </button>
            )}
          </div>

          {/* Region filter badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-stone-400 text-[11px] whitespace-nowrap flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#d4af37]" /> {step5Ui.regionLabel}
            </span>
            <button
              onClick={() => setSelectedRegionId(null)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedRegionId === null
                  ? 'bg-[#c99738] text-[#300207] font-bold'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {step5Ui.allRegionsBtn}
            </button>
            {GEOGRAPHICAL_SPREAD.map(reg => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegionId(selectedRegionId === reg.id ? null : reg.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedRegionId === reg.id
                    ? 'bg-[#c99738] text-[#300207] font-bold shadow'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                }`}
              >
                {(reg.localized_region[language] || reg.region_name).split(' (')[0].split(',')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 1: 16-COMMUNITY DIRECTORY & EXISTING COMMUNITY SYNONYMS */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'synonyms' && (
        <div id="section-synonyms" className="space-y-10 scroll-mt-24">
          {/* STEP 2A: ORGANIZED 16-COMMUNITY DIRECTORY */}
          <div className="bg-[#111522] border border-[#c99738]/40 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-800 pb-5">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                  <Users className="w-3.5 h-3.5" />
                  <span>{step2Labels.directorySectionBadge}</span>
                </div>
                <h2 className="font-royal-heading font-bold text-2xl sm:text-3xl text-[#fcedc7]">
                  {step2Labels.directoryHeading}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                  {step2Labels.directorySubheading}
                </p>
              </div>

              {/* Group Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  { key: 'all', label: step2Labels.filterAllGroups },
                  { key: 'Odra-Kalinga Core', label: step5Ui.directoryGroups['Odra-Kalinga Core'] },
                  { key: 'Rajput & Martial Lineages', label: step5Ui.directoryGroups['Rajput & Martial'] },
                  { key: 'Deccan & Southern Designations', label: step5Ui.directoryGroups['Deccan & South'] },
                  { key: 'Dynastic & Royal Lineages', label: step5Ui.directoryGroups['Dynastic & Royal'] }
                ].map(grp => (
                  <button
                    key={grp.key}
                    onClick={() => setDirectoryGroupFilter(grp.key)}
                    className={`px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                      directoryGroupFilter === grp.key
                        ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                        : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                    }`}
                  >
                    {grp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Methodological Note */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#220711] to-[#141a29] border border-[#d4af37]/30 text-xs text-stone-300 leading-relaxed">
              {step2Labels.directoryMethodologicalNote}
            </div>

            {/* 16 Community Directory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredCommunityDirectory.map(entry => {
                const detailed = COMMUNITY_HERITAGE_DETAILED_ARTICLES.find(a => a.id === entry.id);
                const vis = STEP4_VISUAL_ASSET_REGISTRY[entry.id];
                const locName = entry.localizedName[language] || entry.localizedName.en;
                const locGroup = entry.localizedCategoryGroup[language] || entry.localizedCategoryGroup.en;
                const locGeo = entry.geographicalSpread[language] || entry.geographicalSpread.en;
                const locOverview = entry.overview[language] || entry.overview.en;
                const locEpistemic = entry.epistemicClassification[language] || entry.epistemicClassification.en;
                const visTitle = vis ? vis.title[language] || vis.title.en : locName;
                const visAlt = vis ? vis.altText[language] || vis.altText.en : `${locName} (${entry.canonicalName})`;
                const visClassLabel = vis ? step4VisualLabels.visualClasses[vis.visualClass] : '';

                return (
                  <div
                    key={entry.id}
                    onClick={() => openCommunityDirModal(entry)}
                    className="bg-[#151a2a] border border-[#c99738]/30 hover:border-[#d4af37] rounded-2xl overflow-hidden flex flex-col justify-between transition-all cursor-pointer group hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div>
                      {/* Step 4 Visual Banner with 8-Language Alt & Classification Badge */}
                      <figure className="relative h-36 sm:h-40 w-full overflow-hidden bg-stone-950 border-b border-stone-800/80">
                        <img
                          src={vis?.imageUrl || detailed?.imageUrl || fallbackArchiveImg}
                          alt={visAlt}
                          loading="lazy"
                          onError={handleImgError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#151a2a] via-transparent to-black/30" />
                        {visClassLabel && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[#fae29c] border border-[#d4af37]/40 text-[9px] font-semibold backdrop-blur-sm max-w-[90%] truncate">
                            {visClassLabel}
                          </span>
                        )}
                        <figcaption className="absolute bottom-1.5 left-2.5 right-2.5 text-[10px] text-stone-200 font-medium line-clamp-1 drop-shadow">
                          {visTitle}
                        </figcaption>
                      </figure>

                      <div className="p-4 space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 text-[10px] font-bold">
                            #{entry.orderNumber} • {entry.canonicalName}
                          </span>
                          <span className="text-[10px] text-stone-400 font-medium text-right line-clamp-1">
                            {locGroup}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-royal-heading font-bold text-base sm:text-lg text-[#fcedc7] group-hover:text-white transition-colors">
                            {locName}
                          </h3>
                          {locName !== entry.canonicalName && (
                            <p className="text-[11px] text-[#d4af37] font-semibold">
                              {entry.canonicalName}
                            </p>
                          )}
                        </div>

                      {/* Native Script Badges */}
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(entry.nativeScripts)
                          .slice(0, 3)
                          .map(([script, val]) => (
                            <span
                              key={script}
                              className="px-1.5 py-0.5 rounded bg-stone-900/90 border border-stone-800 text-[10px] text-stone-300"
                            >
                              {val}
                            </span>
                          ))}
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                        {locOverview}
                      </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 space-y-2 pt-2 border-t border-stone-800/80">
                      <div className="text-[10px] text-stone-400 line-clamp-1">
                        📍 {locGeo}
                      </div>
                      <div className="text-[10px] text-[#d4af37]/90 line-clamp-1 font-medium">
                        ✓ {locEpistemic}
                      </div>

                      {/* Quick links to associated Professional Heritage Categories & Related Community Articles */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {entry.professionalCategoryNumbers.slice(0, 3).map(catNum => {
                          const profCat = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(
                            p => p.categoryNumber === catNum
                          );
                          if (!profCat) return null;
                          return (
                            <button
                              key={catNum}
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                openProfessionModal(profCat);
                              }}
                              className="px-1.5 py-0.5 rounded bg-[#1e2538] hover:bg-[#580014] text-[10px] text-amber-200 border border-amber-500/20 transition-colors cursor-pointer"
                              title={profCat.title[language] || profCat.title.en}
                            >
                              {step5Ui.catPrefix}{catNum}
                            </button>
                          );
                        })}
                        {detailed?.relatedArticleIds
                          .filter((relId: string) => !relId.startsWith('prof_cat_'))
                          .slice(0, 2)
                          .map((relId: string) => (
                            <button
                              key={relId}
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                handleNavigateRelatedId(relId);
                              }}
                              className="px-1.5 py-0.5 rounded bg-stone-900/90 hover:bg-[#580014] text-[10px] text-stone-300 hover:text-amber-200 border border-stone-700/70 transition-colors cursor-pointer truncate max-w-[110px]"
                              title={resolveRelatedLabel(relId)}
                            >
                              ⇄ {resolveRelatedLabel(relId)}
                            </button>
                          ))}
                      </div>

                      {/* Multilingual Keyword Tags */}
                      {detailed && detailed.relatedKeywords.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-0.5">
                          {Array.from(new Set(detailed.relatedKeywords))
                            .slice(0, 3)
                            .map(kw => (
                              <button
                                key={kw}
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  setSearchTerm(kw);
                                }}
                                className="px-1.5 py-0.5 rounded bg-[#111522] hover:bg-stone-800 text-[9px] text-amber-200/80 border border-stone-800 cursor-pointer"
                              >
                                #{translateKeyword(kw)}
                              </button>
                            ))}
                        </div>
                      )}

                      <div className="pt-1 flex items-center justify-end text-[11px] font-semibold text-[#d4af37] group-hover:translate-x-0.5 transition-transform">
                        {step2Labels.exploreCommunityBtn} <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredCommunityDirectory.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-stone-900/50 border border-stone-800 space-y-1">
                <div className="text-sm font-bold text-[#fae29c]">{step5Ui.emptyStateTitle}</div>
                <div className="text-xs text-stone-400">{step5Ui.emptyStateDesc}</div>
              </div>
            )}
          </div>

          {/* Section Title & Category Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                <Layers className="w-3.5 h-3.5" />
                <span>{synonymSectionLabels.sectionTitle}</span>
              </div>
              <h2 className="font-royal-heading font-bold text-2xl sm:text-3xl text-[#fcedc7]">
                {synonymSectionLabels.sectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                {synonymSectionLabels.sectionSubtitle}
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { key: 'all', label: synonymSectionLabels.filterAll },
                { key: 'Dynastic and lineage designations', label: synonymSectionLabels.groupDynastic.split(' (')[0] },
                { key: 'Regional community designations', label: synonymSectionLabels.groupRegional.split(' (')[0] },
                { key: 'Historical, martial, and traditional titles', label: synonymSectionLabels.groupTitles.split(' (')[0] }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSynonymCategoryFilter(cat.key)}
                  className={`px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                    synonymCategoryFilter === cat.key
                      ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                      : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Epistemic & Historical Accuracy Banner */}
          <div className="bg-gradient-to-r from-[#240610] via-[#141929] to-[#1a0912] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#fae29c] uppercase tracking-wider">
                  {synonymSectionLabels.accuracyHeading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {synonymSectionLabels.accuracyBody}
                </p>
              </div>
            </div>
          </div>

          {/* Categorized Cards Display (3 Distinct Historical Categories) */}
          {(
            [
              {
                groupKey: 'Dynastic and lineage designations',
                heading: synonymSectionLabels.groupDynastic,
                description: synonymSectionLabels.groupDynasticDesc,
                icon: Crown
              },
              {
                groupKey: 'Regional community designations',
                heading: synonymSectionLabels.groupRegional,
                description: synonymSectionLabels.groupRegionalDesc,
                icon: MapPin
              },
              {
                groupKey: 'Historical, martial, and traditional titles',
                heading: synonymSectionLabels.groupTitles,
                description: synonymSectionLabels.groupTitlesDesc,
                icon: Shield
              }
            ] as const
          ).map(group => {
            const groupItems = filteredSynonyms.filter(item => item.designation_group === group.groupKey);
            if (groupItems.length === 0) return null;
            const GroupIcon = group.icon;

            return (
              <div key={group.groupKey} className="space-y-4 pt-2">
                <div className="border-l-4 border-[#d4af37] pl-4 py-1 bg-[#121624]/60 rounded-r-xl">
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c]">
                      {group.heading}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#580014] text-[#fcedc7] border border-[#d4af37]/40 font-semibold">
                      {groupItems.length}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{group.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupItems.map(item => {
                    const vis = STEP4_VISUAL_ASSET_REGISTRY[item.id];
                    const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[item.id];
                    const epistemicLabel =
                      synonymSectionLabels.epistemicClasses[item.epistemic_classification] ||
                      item.epistemic_classification;
                    const isEpigraphic =
                      item.epistemic_classification === 'Documented Epigraphic & Historical Designation';
                    const isRegional =
                      item.epistemic_classification === 'Regional Ethnonym & Gazetteer Record';

                    return (
                      <div
                        key={item.id}
                        onClick={() => openSynonymModal(item)}
                        className="bg-[#121624] border border-[#c99738]/35 rounded-2xl overflow-hidden hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-lg group hover:shadow-[0_0_20px_rgba(201,151,56,0.18)] cursor-pointer"
                      >
                        <div>
                          {vis && (
                            <figure className="relative h-40 w-full overflow-hidden bg-stone-950 border-b border-stone-800/80">
                              <img
                                src={vis.imageUrl}
                                alt={vis.altText[language] || vis.altText.en}
                                loading="lazy"
                                onError={handleImgError}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/30" />
                              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-[#fae29c] border border-[#d4af37]/40 text-[9px] font-semibold backdrop-blur-sm">
                                {step4VisualLabels.visualClasses[vis.visualClass]}
                              </span>
                              <figcaption className="absolute bottom-1.5 left-3 right-3 text-[10px] text-stone-200 font-medium line-clamp-1">
                                {vis.title[language] || vis.title.en}
                              </figcaption>
                            </figure>
                          )}
                          <div className="p-5 sm:p-6 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors">
                                {mono ? mono.localizedTitle[language] || mono.localizedTitle.en : item.title}
                              </h4>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {Object.entries(item.native_scripts).map(([scriptName, scriptVal]) => (
                                  <span
                                    key={scriptName}
                                    className="text-[11px] font-mono text-[#d4af37] bg-stone-900/90 px-2 py-0.5 rounded border border-stone-800"
                                    title={scriptName}
                                  >
                                    {scriptVal}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-1 rounded bg-[#580014] text-[#fcedc7] font-semibold border border-[#d4af37]/30 whitespace-nowrap shrink-0">
                              {step5Ui.synonymCategories[item.category] || item.category}
                            </span>
                          </div>

                          {/* Epistemic Distinction Pill */}
                          <div>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                                isEpigraphic
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40'
                                  : isRegional
                                  ? 'bg-amber-950/60 text-amber-300 border-amber-600/40'
                                  : 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span>{epistemicLabel}</span>
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-stone-300 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                            <div className="flex items-start gap-1.5 text-stone-300">
                              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-[#fae29c]">{synonymSectionLabels.geoLabel}</strong>{' '}
                                <span className="font-semibold text-white">{item.geographical_association}</span>
                              </div>
                            </div>

                            <div className="text-stone-400 text-[11px]">
                              <strong className="text-stone-300">{synonymSectionLabels.rootLabel}</strong>{' '}
                              {item.linguistic_origin}
                            </div>
                          </div>

                          <p className="text-xs text-stone-200 leading-relaxed pt-1">
                            {item.historical_role[language] || item.historical_role.en}
                          </p>

                          <div className="text-[11px] text-stone-400 bg-[#0d101b] p-2.5 rounded-lg border border-stone-800/70 leading-relaxed">
                            <strong className="text-[#d4af37]">{synonymSectionLabels.epistemicLabel}</strong>{' '}
                            {item.epistemic_note[language] || item.epistemic_note.en}
                          </div>

                          {mono && (
                            <div className="pt-1.5 space-y-2 border-t border-stone-800/60">
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-[10px] font-bold text-[#d4af37] mr-1">
                                  {step3Labels.relatedArticlesHeading}:
                                </span>
                                {mono.relatedArticleIds.slice(0, 5).map(relId => (
                                  <button
                                    key={relId}
                                    type="button"
                                    onClick={e => {
                                      e.stopPropagation();
                                      handleNavigateRelatedId(relId);
                                    }}
                                    className="px-2 py-0.5 rounded bg-stone-900 hover:bg-[#580014] text-[10px] text-stone-300 hover:text-amber-200 border border-stone-700/70 transition-colors cursor-pointer"
                                  >
                                    ⇄ {resolveRelatedLabel(relId)}
                                  </button>
                                ))}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {mono.relatedKeywords.slice(0, 5).map(kw => (
                                  <span
                                    key={kw}
                                    className="text-[9px] px-1.5 py-0.5 rounded bg-stone-950/90 text-stone-400 border border-stone-800/80"
                                  >
                                    #{translateKeyword(kw)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          </div>
                        </div>

                        <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                          <span className="text-stone-400 truncate max-w-[180px]">
                            🙏 {item.sacred_associations.slice(0, 2).join(' • ')}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                const matchedRegion =
                                  GEOGRAPHICAL_SPREAD.find(reg =>
                                    doesItemMatchRegion(item.id, item.prominent_states, reg.id)
                                  ) || GEOGRAPHICAL_SPREAD[0];
                                setSelectedRegionId(matchedRegion.id);
                                setSearchTerm('');
                                setActiveTab('geography');
                                syncUrlParams('geography', null, matchedRegion.id);
                                scrollToTargetSection();
                              }}
                              className="text-stone-400 hover:text-[#d4af37] hover:underline font-medium cursor-pointer"
                            >
                              {synonymSectionLabels.regionsBtn}
                            </button>
                            <span className="text-[#d4af37] font-semibold flex items-center gap-0.5">
                              {synonymSectionLabels.detailsBtn} <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Structured Reference Table (Responsive on Android Mobile & Desktop) */}
          <div className="bg-[#121624] border border-[#c99738]/40 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#260713] to-[#121624] border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7]">
                  {synonymSectionLabels.tableHeading}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">{synonymSectionLabels.tableSubheading}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 self-start sm:self-auto">
                {filteredSynonyms.length} {step5Ui.designationsCountLabel}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-stone-900/90 border-b border-stone-800 text-[11px] uppercase tracking-wider text-[#d4af37]">
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colDesignation}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colCategory}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colGeography}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colEpistemic}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colSummary}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/80 text-xs">
                  {filteredSynonyms.map(item => (
                    <tr
                      key={`row_${item.id}`}
                      onClick={() => openSynonymModal(item)}
                      className="hover:bg-stone-900/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 align-top font-bold text-[#fae29c] group-hover:text-white whitespace-nowrap">
                        <div>{item.title}</div>
                        <div className="text-[11px] font-normal text-stone-400 mt-0.5">
                          {Object.values(item.native_scripts).slice(0, 2).join(' • ')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 align-top text-stone-300">
                        <span className="inline-block px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[11px] text-stone-200">
                          {localizeSynonymGroup(item.designation_group)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 align-top font-semibold text-stone-200">
                        {item.geographical_association}
                      </td>
                      <td className="py-3.5 px-4 align-top text-stone-300">
                        <span className="text-[11px] text-[#d4af37] font-medium">
                          {synonymSectionLabels.epistemicClasses[item.epistemic_classification] ||
                            item.epistemic_classification}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 align-top text-stone-300 max-w-md leading-relaxed">
                        {item.historical_role[language] || item.historical_role.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* STEP 2B: 9 PROFESSIONAL HERITAGE CATEGORIES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'professions' && (
        <div id="section-professions" className="space-y-8 scroll-mt-24">
          {/* Header & Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                <Shield className="w-3.5 h-3.5" />
                <span>{step2Labels.profCategoriesBadge}</span>
              </div>
              <h2 className="font-royal-heading font-bold text-2xl sm:text-3xl text-[#fcedc7]">
                {step2Labels.profCategoriesHeading}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                {step2Labels.profCategoriesSubheading}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <button
                onClick={() => setSelectedProfessionCatNumber('all')}
                className={`px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                  selectedProfessionCatNumber === 'all'
                    ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                    : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {step2Labels.allNineCategoriesLabel}
              </button>
              {COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedProfessionCatNumber(cat.categoryNumber)}
                  className={`px-2.5 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                    selectedProfessionCatNumber === cat.categoryNumber
                      ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                      : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  #{cat.categoryNumber}
                </button>
              ))}
            </div>
          </div>

          {/* Methodological Banner */}
          <div className="bg-gradient-to-r from-[#240610] via-[#141929] to-[#1a0912] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {step2Labels.profMethodologicalNote}
              </p>
            </div>
          </div>

          {/* 9 Professional Heritage Category Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProfessions.map(cat => {
              const primaryVis = cat.visualAssets && cat.visualAssets.length > 0 ? cat.visualAssets[0] : undefined;
              const titleText = cat.title[language] || cat.title.en;
              const subText = cat.shortSummary[language] || cat.shortSummary.en;
              const defText = cat.definitionAndExplanation[language] || cat.definitionAndExplanation.en;
              const distText =
                cat.communitySpecificConnectionsAndDistinctions[language] ||
                cat.communitySpecificConnectionsAndDistinctions.en;

              return (
                <div
                  key={cat.id}
                  onClick={() => openProfessionModal(cat)}
                  className="bg-[#121624] border border-[#c99738]/40 hover:border-[#d4af37] rounded-3xl overflow-hidden flex flex-col justify-between shadow-xl transition-all cursor-pointer group hover:-translate-y-0.5"
                >
                  <div>
                    {primaryVis && (
                      <figure className="relative h-48 w-full overflow-hidden bg-stone-950 border-b border-stone-800/80">
                        <img
                          src={primaryVis.imageUrl}
                          alt={primaryVis.altText[language] || primaryVis.altText.en}
                          loading="lazy"
                          onError={handleImgError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/30" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 text-[#fae29c] border border-[#d4af37]/40 text-[10px] font-semibold backdrop-blur-sm">
                          {step5Ui.visualTypeLabels[primaryVis.visualType] || primaryVis.visualType}
                        </span>
                        <figcaption className="absolute bottom-2 left-4 right-4 text-[11px] text-stone-200 font-medium line-clamp-1">
                          {primaryVis.title[language] || primaryVis.title.en} •{' '}
                          <span className="text-stone-400">{primaryVis.sourceAttribution}</span>
                        </figcaption>
                      </figure>
                    )}

                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <span className="px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 text-xs font-bold">
                          {(cat.title[language] || cat.title.en).split(':')[0] || cat.codeLabel}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {cat.includedSubClassifications.length} {step2Labels.subcategoriesLabel}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7] group-hover:text-white transition-colors">
                          {titleText}
                        </h3>
                        <p className="text-xs text-[#d4af37] font-semibold mt-1">
                          {subText}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-4">
                        {defText}
                      </p>

                      {/* Subcategories Pills */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                          {step2Labels.subcategoriesLabel}:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.includedSubClassifications.map(sub => (
                            <span
                              key={sub.id}
                              className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-800 text-[11px] text-stone-200"
                            >
                              • {sub.name[language] || sub.name.en}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-stone-800/80 space-y-3">
                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      {distText}
                    </p>
                    {cat.relatedArticles && cat.relatedArticles.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1">
                        {cat.relatedArticles.slice(0, 4).map(rel => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              handleNavigateRelatedId(rel.targetIdOrPath);
                            }}
                            className="px-2 py-0.5 rounded bg-stone-900/90 hover:bg-[#580014] text-[10px] text-stone-300 hover:text-amber-200 border border-stone-700/70 transition-colors cursor-pointer"
                          >
                            ⇄ {rel.label[language] || rel.label.en}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex flex-wrap gap-1">
                        {Array.from(new Set(cat.relatedKeywords))
                          .slice(0, 4)
                          .map(kw => (
                            <button
                              key={kw}
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                setSearchTerm(kw);
                              }}
                              className="px-2 py-0.5 rounded bg-[#1b2234] hover:bg-stone-800 text-amber-200/90 text-[10px] cursor-pointer"
                            >
                              #{translateKeyword(kw)}
                            </button>
                          ))}
                      </div>
                      <span className="text-[#d4af37] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform shrink-0">
                        {step2Labels.exploreCategoryBtn} <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredProfessions.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-stone-900/50 border border-stone-800 space-y-1">
              <div className="text-sm font-bold text-[#fae29c]">{step5Ui.emptyStateTitle}</div>
              <div className="text-xs text-stone-400">{step5Ui.emptyStateDesc}</div>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 2: SACRED PROGENITORS & HISTORICAL FIGURES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'figures' && (
        <div id="section-figures" className="space-y-6 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
                {step5Ui.figuresTab.heading}
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                {step5Ui.figuresTab.subtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFigures.map(fig => {
              const displayName = fig.localized_name[language] || fig.canonical_name;
              const displaySummary = fig.summary[language] || fig.summary.en;
              const displayTitle = fig.titles[language] || fig.titles.en;

              return (
                <div
                  key={fig.id}
                  onClick={() => {
                    setSelectedFigure(fig);
                    syncUrlParams('figures', fig.id);
                  }}
                  className="bg-[#121624] border border-[#c99738]/30 hover:border-[#d4af37] rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(201,151,56,0.2)]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                    <img
                      src={fig.image_url}
                      alt={`${displayName} — ${displayTitle}`}
                      loading="lazy"
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#580014]/90 text-[#fcedc7] border border-[#d4af37]/40 backdrop-blur-sm">
                        {step5Ui.figuresTab.epigraphicStatus[fig.epigraphic_status] || fig.epigraphic_status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors">
                          {displayName}
                        </h3>
                        <p className="text-[11px] text-[#d4af37] font-semibold leading-snug line-clamp-2">
                          {displayTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-stone-400">
                        <span>⏳ {fig.reign_or_dates}</span>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                        {displaySummary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400">
                        📍 {fig.associated_places[0]}
                      </span>
                      <span className="text-[#d4af37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {step5Ui.figuresTab.exploreProfile} <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filteredFigures.length === 0 && (
            <div className="p-8 text-center rounded-2xl bg-stone-900/50 border border-stone-800 space-y-1">
              <div className="text-sm font-bold text-[#fae29c]">{step5Ui.emptyStateTitle}</div>
              <div className="text-xs text-stone-400">{step5Ui.emptyStateDesc}</div>
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 3: PAN-INDIAN GEOGRAPHICAL SPREADING */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'geography' && (
        <div id="section-geography" className="space-y-6 scroll-mt-24">
          <div>
            <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
              {step5Ui.geographyTab.heading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              {step5Ui.geographyTab.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Region List */}
            <div className="lg:col-span-1 space-y-3">
              {GEOGRAPHICAL_SPREAD.map(reg => {
                const isSelected = (selectedRegionId || GEOGRAPHICAL_SPREAD[0].id) === reg.id;
                const regTitle = reg.localized_region[language] || reg.region_name;

                return (
                  <div
                    key={reg.id}
                    onClick={() => {
                      setSelectedRegionId(reg.id);
                      setSelectedFigure(null);
                      setSelectedModalRef({ type: 'region', id: reg.id });
                      syncUrlParams('geography', reg.id, reg.id);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#201520] border-[#d4af37] shadow-lg shadow-[#580014]/20'
                        : 'bg-[#121624] border-stone-800 hover:border-stone-700 hover:bg-[#161b2e]'
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0 pr-2">
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-[#fae29c]' : 'text-stone-200'}`}>
                        {regTitle}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {reg.predominant_community_synonyms.map(syn => {
                          const targetId = resolveDesignationTargetId(syn);
                          return (
                            <button
                              key={syn}
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedRegionId(reg.id);
                                handleNavigateRelatedId(targetId);
                              }}
                              className="px-1.5 py-0.5 rounded bg-stone-900/90 hover:bg-[#580014] text-[10px] text-stone-300 hover:text-[#fcedc7] border border-stone-800 hover:border-[#d4af37]/50 transition-colors cursor-pointer"
                              title={resolveRelatedLabel(targetId)}
                            >
                              {syn}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#d4af37]' : 'text-stone-600'}`} />
                  </div>
                );
              })}
            </div>

            {/* Region Detailed Card */}
            {(() => {
              const activeReg =
                GEOGRAPHICAL_SPREAD.find(r => r.id === (selectedRegionId || GEOGRAPHICAL_SPREAD[0].id)) ||
                GEOGRAPHICAL_SPREAD[0];
              const vis = STEP4_VISUAL_ASSET_REGISTRY[activeReg.id];
              const regTitle = activeReg.localized_region[language] || activeReg.region_name;
              const regOverview = activeReg.regional_overview[language] || activeReg.regional_overview.en;
              const relatedIds = REGION_RELATED_ARTICLE_IDS[activeReg.id] || [];

              return (
                <div
                  onClick={() => {
                    setSelectedFigure(null);
                    setSelectedModalRef({ type: 'region', id: activeReg.id });
                    syncUrlParams('geography', activeReg.id, activeReg.id);
                  }}
                  className="lg:col-span-2 bg-[#121624] border border-[#c99738]/40 hover:border-[#c99738] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl cursor-pointer transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                        {step5Ui.geographyTab.spotlightModalBadge}
                      </span>
                      <h3 className="font-royal-heading font-extrabold text-2xl text-[#fcedc7]">
                        {regTitle}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeReg.predominant_community_synonyms.map(syn => {
                        const targetId = resolveDesignationTargetId(syn);
                        return (
                          <button
                            key={syn}
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              handleNavigateRelatedId(targetId);
                            }}
                            className="px-2.5 py-1 rounded bg-[#580014] hover:bg-[#73001b] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors cursor-pointer"
                            title={resolveRelatedLabel(targetId)}
                          >
                            {syn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4 Regional Monument Visual & Reconstructed Historical Reference Map */}
                  {vis && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <figure className="rounded-xl overflow-hidden border border-[#c99738]/30 bg-stone-950 flex flex-col justify-between">
                        <div className="relative h-44 w-full overflow-hidden">
                          <img
                            src={vis.imageUrl}
                            alt={vis.altText[language] || vis.altText.en}
                            loading="lazy"
                            onError={handleImgError}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[#fae29c] border border-[#d4af37]/40 text-[9px] font-semibold">
                            {step4VisualLabels.visualClasses[vis.visualClass]}
                          </span>
                        </div>
                        <figcaption className="p-3 space-y-1 text-[11px] bg-stone-950/90 border-t border-stone-800">
                          <div className="font-bold text-[#fcedc7]">{vis.title[language] || vis.title.en}</div>
                          <p className="text-stone-300 leading-snug">{vis.caption[language] || vis.caption.en}</p>
                          <div className="text-[10px] text-[#d4af37]">{vis.sourceAttribution}</div>
                        </figcaption>
                      </figure>

                      {vis.companionMapUrl && vis.companionMapTitle && vis.companionMapCaption && (
                        <figure className="rounded-xl overflow-hidden border border-[#c99738]/30 bg-stone-950 flex flex-col justify-between">
                          <div className="relative h-44 w-full overflow-hidden">
                            <img
                              src={vis.companionMapUrl}
                              alt={vis.companionMapTitle[language] || vis.companionMapTitle.en}
                              loading="lazy"
                              onError={handleImgError}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#580014]/90 text-[#fae29c] border border-[#d4af37]/40 text-[9px] font-semibold">
                              {step4VisualLabels.visualClasses.reconstructed_map}
                            </span>
                          </div>
                          <figcaption className="p-3 space-y-1 text-[11px] bg-stone-950/90 border-t border-stone-800">
                            <div className="font-bold text-[#fcedc7]">
                              {vis.companionMapTitle[language] || vis.companionMapTitle.en}
                            </div>
                            <p className="text-stone-300 leading-snug">
                              {vis.companionMapCaption[language] || vis.companionMapCaption.en}
                            </p>
                            <div className="text-[10px] text-amber-300/90">
                              {step4VisualLabels.mapDisclaimerText}
                            </div>
                          </figcaption>
                        </figure>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-stone-200 font-royal-serif leading-relaxed">
                    {regOverview}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <MapPin className="w-4 h-4" />
                        <span>{step5Ui.geographyTab.keyCitiesLabel}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.prominent_cities_districts.join(', ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Building className="w-4 h-4" />
                        <span>{step5Ui.geographyTab.landmarkFortsLabel}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.historical_forts_and_landmarks.join(' • ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Sparkles className="w-4 h-4" />
                        <span>{step5Ui.geographyTab.sacredCentersLabel}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.sacred_centers.join(' • ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>{step5Ui.geographyTab.migrationContextLabel}</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {step5Ui.geographyTab.migrationEpochs[activeReg.id] || activeReg.migration_epoch_and_corridor}
                      </p>
                    </div>
                  </div>

                  {/* Related Articles for this Regional Corridor */}
                  {relatedIds.length > 0 && (
                    <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 space-y-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>{step3Labels.relatedArticlesHeading}:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {relatedIds.map(relId => (
                          <button
                            key={relId}
                            type="button"
                            onClick={e => {
                              e.stopPropagation();
                              handleNavigateRelatedId(relId);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#161c2d] hover:bg-[#580014] text-xs text-[#fae29c] hover:text-white border border-stone-700 hover:border-[#d4af37] transition-colors cursor-pointer"
                          >
                            ⇄ {resolveRelatedLabel(relId)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-stone-800 text-xs">
                    <span className="text-stone-400">
                      {step5Ui.geographyTab.statesLabel} {activeReg.states_and_territories.join(', ')}
                    </span>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedRegionId(activeReg.id);
                        setSearchTerm('');
                        setDirectoryGroupFilter('all');
                        setSynonymCategoryFilter('all');
                        setActiveTab('synonyms');
                        syncUrlParams('synonyms', null, activeReg.id);
                        scrollToTargetSection();
                      }}
                      className="text-[#d4af37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {step5Ui.geographyTab.filterSynonymsBtn} <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 4: COMPLETE HISTORICAL MONOGRAPH */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'history' && (
        <article id="section-history" className="bg-[#121624] border border-[#c99738]/40 rounded-3xl p-6 sm:p-12 space-y-10 shadow-2xl scroll-mt-24">
          <div className="border-b border-stone-800 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] text-xs font-semibold">
              <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{step5Ui.monographTab.badge}</span>
            </div>
            <h2 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
              {step5Ui.monographTab.heading}
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              {step5Ui.monographTab.subtitle}
            </p>
          </div>

          <div className="space-y-8 font-royal-serif text-stone-200 text-sm sm:text-base leading-relaxed">
            {HISTORICAL_MONOGRAPH_SECTIONS.map(sec => {
              const vis = STEP4_VISUAL_ASSET_REGISTRY[sec.id];
              const secTitle = sec.section_title[language] || sec.section_title.en;
              const secContent = sec.content[language] || sec.content.en;
              const localizedKeyPoints = step5Ui.monographTab.chapterKeyPoints[sec.id] || sec.key_points;

              return (
                <section
                  key={sec.id}
                  onClick={() => {
                    setSelectedModalRef({ type: 'monograph', id: sec.id });
                    syncUrlParams('history', sec.id);
                  }}
                  className="space-y-4 pb-6 border-b border-stone-800/60 last:border-0 cursor-pointer p-4 -mx-4 rounded-2xl hover:bg-stone-900/40 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] group-hover:text-white transition-colors">
                      {secTitle}
                    </h3>
                    <span className="text-xs font-sans font-semibold text-[#d4af37] shrink-0">
                      {step5Ui.monographTab.openChapterBtn}
                    </span>
                  </div>

                  {vis && (
                    <figure className="rounded-2xl overflow-hidden border border-[#c99738]/35 bg-stone-950 font-sans">
                      <div className="relative h-52 sm:h-64 w-full overflow-hidden">
                        <img
                          src={vis.imageUrl}
                          alt={vis.altText[language] || vis.altText.en}
                          loading="lazy"
                          onError={handleImgError}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 text-[#fae29c] border border-[#d4af37]/40 text-[10px] font-semibold">
                          {step4VisualLabels.visualClasses[vis.visualClass]}
                        </span>
                      </div>
                      <figcaption className="p-3.5 bg-stone-950/95 border-t border-stone-800 space-y-1 text-xs">
                        <div className="font-bold text-[#fcedc7]">{vis.title[language] || vis.title.en}</div>
                        <p className="text-stone-300">{vis.caption[language] || vis.caption.en}</p>
                        <div className="text-[11px] text-[#d4af37]">{vis.sourceAttribution}</div>
                        {vis.visualClass === 'reconstructed_map' && (
                          <div className="text-[11px] text-amber-300/90 pt-0.5">
                            {step4VisualLabels.mapDisclaimerText}
                          </div>
                        )}
                        {vis.visualClass === 'artistic_illustration' && (
                          <div className="text-[11px] text-amber-300/90 pt-0.5">
                            {step4VisualLabels.illustrationDisclaimerText}
                          </div>
                        )}
                      </figcaption>
                    </figure>
                  )}

                  <div className="whitespace-pre-line text-stone-300">
                    {secContent}
                  </div>
                  {localizedKeyPoints && localizedKeyPoints.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans">
                      {localizedKeyPoints.map((kp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-stone-900 text-stone-400 border border-stone-800"
                        >
                          ✓ {kp}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </article>
      )}

      <ContentDetailModal
        item={modalItem}
        onTagClick={handleModalTagClick}
        onClose={() => {
          setSelectedModalRef(null);
          syncUrlParams(activeTab, null);
        }}
      />

      {/* ---------------------------------------------------------------------- */}
      {/* DETAILED HISTORICAL FIGURE MODAL DIALOG */}
      {/* ---------------------------------------------------------------------- */}
      {selectedFigure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#101420] border-2 border-[#d4af37] rounded-3xl overflow-y-auto shadow-2xl shadow-[#580014]/50 p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                    {step5Ui.figuresTab.epigraphicStatus[selectedFigure.epigraphic_status] ||
                      selectedFigure.epigraphic_status}
                  </span>
                  <span className="text-xs text-stone-400">⏳ {selectedFigure.reign_or_dates}</span>
                </div>
                <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
                  {selectedFigure.localized_name[language] || selectedFigure.canonical_name}
                </h3>
                <p className="text-xs text-[#d4af37] font-semibold">
                  {selectedFigure.titles[language] || selectedFigure.titles.en}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedFigure(null);
                  syncUrlParams(activeTab, null);
                }}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                title={translateText('close_modal', 'Close Profile')}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Figure Image & Alternate Names */}
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <figure className="w-full sm:w-52 rounded-2xl overflow-hidden border border-[#d4af37]/50 shrink-0 shadow-lg bg-stone-950">
                <img
                  src={selectedFigure.image_url}
                  alt={`${selectedFigure.localized_name[language] || selectedFigure.canonical_name} — ${
                    selectedFigure.titles[language] || selectedFigure.titles.en
                  }`}
                  onError={handleImgError}
                  className="w-full h-48 object-cover"
                />
                <figcaption className="p-2 bg-stone-950 border-t border-stone-800 text-[10px] text-stone-300 leading-snug">
                  <div className="font-semibold text-[#fae29c]">
                    {selectedFigure.localized_name[language] || selectedFigure.canonical_name}
                  </div>
                  <div className="text-stone-400">
                    {step5Ui.figuresTab.epigraphicStatus[selectedFigure.epigraphic_status] ||
                      selectedFigure.epigraphic_status}
                  </div>
                </figcaption>
              </figure>
              <div className="space-y-3 text-xs w-full">
                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">{step5Ui.figuresTab.modalAltNames}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFigure.alternate_names.map(alt => (
                      <span key={alt} className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">{step5Ui.figuresTab.modalDynasty}</span>
                  <p className="text-stone-200 font-semibold">{selectedFigure.dynasty_lineage}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">{step5Ui.figuresTab.modalSacredGeo}</span>
                  <p className="text-stone-300">📍 {selectedFigure.associated_places.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Detailed Narrative */}
            <div className="space-y-3 border-t border-stone-800 pt-4">
              <h4 className="font-royal-heading font-bold text-base text-[#fae29c] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d4af37]" /> {translateText('detailed_narrative', 'Historical & Sacred Chronicle')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed whitespace-pre-line">
                {selectedFigure.detailed_narrative[language] || selectedFigure.detailed_narrative.en}
              </p>
            </div>

            {/* Civil & Water Engineering Legacy Spotlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201018] to-[#121c28] border border-[#d4af37]/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <Droplets className="w-4 h-4 text-cyan-400" /> {translateText('civic_and_water_legacy', 'Civil & Water-Engineering Legacy')}
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-royal-serif">
                {selectedFigure.engineering_and_civic_legacy[language] ||
                  selectedFigure.engineering_and_civic_legacy.en}
              </p>
            </div>

            {/* Canonical Sources */}
            <div className="space-y-2 border-t border-stone-800 pt-4 text-xs">
              <span className="text-stone-400 font-semibold flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-[#d4af37]" /> {translateText('canonical_sources', 'Primary Epigraphs & Scholarly References')}:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-stone-300">
                {selectedFigure.canonical_sources.map((src, idx) => (
                  <li key={idx}>{src}</li>
                ))}
              </ul>
            </div>

            {/* Footer Close Button */}
            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedFigure(null);
                  syncUrlParams(activeTab, null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer shadow-md"
              >
                {translateText('close_modal', 'Close Profile')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Directory and Registration CTA */}
      <div className="p-8 rounded-3xl bg-[#141824] border border-[#c99738]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {step5Ui.bottomCta.heading}
          </h3>
          <p className="text-xs text-stone-400">
            {step5Ui.bottomCta.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/directory')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer shadow-md"
          >
            {step5Ui.bottomCta.exploreDirectoryBtn}
          </button>
          <button
            onClick={() => onNavigate('/register')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1a2130] text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
          >
            {step5Ui.bottomCta.registerMemberBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
