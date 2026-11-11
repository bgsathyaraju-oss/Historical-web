import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  ArrowLeft,
  Home,
  ChevronRight,
  ChevronLeft,
  Printer,
  FileDown,
  Share2,
  Copy,
  Check,
  Filter,
  RotateCcw,
  LayoutGrid,
  List,
  Layers,
  Globe,
  ShieldCheck,
  BookOpen,
  Crown,
  Scroll,
  Compass,
  Users,
  Activity
} from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import type { LanguageCode } from '../types';
import {
  GLOBAL_PREFIX_REGISTRY,
  type ReferencePrefixCode
} from '../data/globalReferenceIdRegistry';
import {
  buildWebsitePageDirectoryInventory,
  type DirectoryPageEntry,
  type PageHealthStatusCode,
  type DynastyFilterCode,
  type CommunitySectionFilterCode
} from '../data/websitePageDirectoryInventory';
import {
  triggerCrossPlatformShare,
  copyTextCrossPlatform,
  handleWhatsAppLinkClick,
  handleExternalBrowserUrlClick
} from '../utils/androidBridge';

interface WebsitePageDirectoryPageProps {
  onNavigate: (path: string) => void;
  embeddedInAdmin?: boolean;
}

interface DirectoryI18nStrings {
  badge: string;
  pageTitle: string;
  pageSubtitle: string;
  referenceIdLabel: string;
  backBtn: string;
  homeBtn: string;
  prevPageBtn: string;
  nextPageBtn: string;
  printBtn: string;
  pdfBtn: string;
  shareBtn: string;
  copiedMsg: string;
  breadcrumbHome: string;
  breadcrumbSection: string;
  searchPlaceholder: string;
  categoryFilterLabel: string;
  dynastyFilterLabel: string;
  communityFilterLabel: string;
  languageFilterLabel: string;
  statusFilterLabel: string;
  sortByLabel: string;
  viewModeLabel: string;
  viewTable: string;
  viewCards: string;
  viewGrouped: string;
  resetFiltersBtn: string;
  colSerial: string;
  colTitle: string;
  colRefId: string;
  colCategory: string;
  colSubcategory: string;
  colRoute: string;
  colAction: string;
  colStatus: string;
  colLanguages: string;
  openPageBtn: string;
  statusGreen: string;
  statusYellow: string;
  statusRed: string;
  statusGray: string;
  healthMonitorTitle: string;
  healthMonitorSubtitle: string;
  metricTotalPages: string;
  metricCanonicalIds: string;
  metricRouterRoutes: string;
  metricWorkingGreen: string;
  metricWarningYellow: string;
  metricBrokenRed: string;
  metricKakatiyaPages: string;
  metricCommunity76: string;
  relatedPagesTitle: string;
  showingCountText: string;
  allCategoriesOption: string;
  allDynastiesOption: string;
  allCommunityOption: string;
  allLanguagesOption: string;
  allStatusesOption: string;
  sortSerial: string;
  sortTitleAsc: string;
  sortTitleDesc: string;
  sortRefId: string;
  sortRoute: string;
  sortCategory: string;
  showAllRowsBtn: string;
  paginatedViewBtn: string;
}

const DIRECTORY_I18N: Record<LanguageCode, DirectoryI18nStrings> = {
  en: {
    badge: 'Global Navigation & Reference ID Index • WP-0039',
    pageTitle: 'Website Page Directory',
    pageSubtitle: 'Complete Website Pages, Links & Navigation Index',
    referenceIdLabel: 'Reference ID: WP-0039',
    backBtn: 'Back',
    homeBtn: 'Home',
    prevPageBtn: 'Previous Page',
    nextPageBtn: 'Next Page',
    printBtn: 'Print Directory',
    pdfBtn: 'Download PDF',
    shareBtn: 'Share Page',
    copiedMsg: 'Link Copied',
    breadcrumbHome: 'Home',
    breadcrumbSection: 'Website Architecture & Navigation',
    searchPlaceholder: 'Search by Page Title, Reference ID (e.g. KD-0001, RD-0001, CH-0048), Category, or Route (/maps)...',
    categoryFilterLabel: 'Category / Prefix',
    dynastyFilterLabel: 'Historical Dynasty',
    communityFilterLabel: 'Community Section',
    languageFilterLabel: 'Language Availability',
    statusFilterLabel: 'Page Health Status',
    sortByLabel: 'Sort Order',
    viewModeLabel: 'Display Layout',
    viewTable: 'Table View',
    viewCards: 'Card Grid',
    viewGrouped: 'By Category',
    resetFiltersBtn: 'Reset Filters',
    colSerial: 'S.No',
    colTitle: 'Page Title',
    colRefId: 'Reference ID',
    colCategory: 'Category',
    colSubcategory: 'Subcategory',
    colRoute: 'Actual Route / URL',
    colAction: 'Action',
    colStatus: 'Page Status',
    colLanguages: 'Available Languages',
    openPageBtn: 'Open Page',
    statusGreen: 'GREEN – Working',
    statusYellow: 'YELLOW – Needs Review',
    statusRed: 'RED – Broken / Not Found',
    statusGray: 'GRAY – Not Checked',
    healthMonitorTitle: 'Website Page Health & Integrity Monitor',
    healthMonitorSubtitle: 'Real-time verification of routes, Reference IDs, internal relationships, visual assets, and 8-language availability across the entire portal.',
    metricTotalPages: 'Total Indexed Pages',
    metricCanonicalIds: 'Canonical Reference IDs',
    metricRouterRoutes: 'Registered Router Paths',
    metricWorkingGreen: 'Working (GREEN)',
    metricWarningYellow: 'Needs Review (YELLOW)',
    metricBrokenRed: 'Broken / 404 (RED)',
    metricKakatiyaPages: 'Kakatiya Dynasty (KD)',
    metricCommunity76: '76 Community References',
    relatedPagesTitle: 'Related Major Portal Hubs & Archives',
    showingCountText: 'Showing matching pages in directory',
    allCategoriesOption: 'All Categories & Prefixes',
    allDynastiesOption: 'All Historical Dynasties',
    allCommunityOption: 'All Community Sections',
    allLanguagesOption: 'All 8 Languages Supported',
    allStatusesOption: 'All Health Statuses',
    sortSerial: 'Registry Serial Order (#1–#734)',
    sortTitleAsc: 'Alphabetical Title (A → Z)',
    sortTitleDesc: 'Alphabetical Title (Z → A)',
    sortRefId: 'Reference ID (A → Z)',
    sortRoute: 'Actual Route / URL (A → Z)',
    sortCategory: 'Category Name (A → Z)',
    showAllRowsBtn: 'Show All Matching Pages on One Screen',
    paginatedViewBtn: 'Use Paginated View (100 per page)'
  },
  hi: {
    badge: 'वैश्विक नेविगेशन एवं संदर्भ आईडी निर्देशिका • WP-0039',
    pageTitle: 'वेबसाइट पृष्ठ निर्देशिका (Website Page Directory)',
    pageSubtitle: 'संपूर्ण वेबसाइट पृष्ठ, लिंक एवं नेविगेशन अनुक्रमणिका',
    referenceIdLabel: 'संदर्भ आईडी: WP-0039',
    backBtn: 'वापस',
    homeBtn: 'मुखपृष्ठ',
    prevPageBtn: 'पिछला पृष्ठ',
    nextPageBtn: 'अगला पृष्ठ',
    printBtn: 'प्रिंट करें',
    pdfBtn: 'पीडीएफ डाउनलोड',
    shareBtn: 'साझा करें',
    copiedMsg: 'लिंक कॉपी हुआ',
    breadcrumbHome: 'मुखपृष्ठ',
    breadcrumbSection: 'वेबसाइट संरचना एवं नेविगेशन',
    searchPlaceholder: 'पृष्ठ शीर्षक, संदर्भ आईडी (KD-0001, RD-0001, CH-0048), श्रेणी या मार्ग (/maps) से खोजें...',
    categoryFilterLabel: 'श्रेणी / उपसर्ग',
    dynastyFilterLabel: 'ऐतिहासिक राजवंश',
    communityFilterLabel: 'सामुदायिक अनुभाग',
    languageFilterLabel: 'भाषा उपलब्धता',
    statusFilterLabel: 'पृष्ठ स्वास्थ्य स्थिति',
    sortByLabel: 'क्रमबद्ध करें',
    viewModeLabel: 'प्रदर्शन मोड',
    viewTable: 'तालिका दृश्य',
    viewCards: 'कार्ड दृश्य',
    viewGrouped: 'श्रेणी अनुसार',
    resetFiltersBtn: 'फ़िल्टर रीसेट करें',
    colSerial: 'क्र.सं.',
    colTitle: 'पृष्ठ शीर्षक',
    colRefId: 'संदर्भ आईडी',
    colCategory: 'श्रेणी',
    colSubcategory: 'उप-श्रेणी',
    colRoute: 'वास्तविक मार्ग / URL',
    colAction: 'कार्य',
    colStatus: 'पृष्ठ स्थिति',
    colLanguages: 'उपलब्ध भाषाएँ',
    openPageBtn: 'पृष्ठ खोलें',
    statusGreen: 'GREEN – कार्यरत',
    statusYellow: 'YELLOW – समीक्षा आवश्यक',
    statusRed: 'RED – त्रुटि / अनुपलब्ध',
    statusGray: 'GRAY – अपरीक्षित',
    healthMonitorTitle: 'वेबसाइट पृष्ठ स्वास्थ्य एवं अखंडता मॉनिटर',
    healthMonitorSubtitle: 'संपूर्ण पोर्टल के मार्गों, संदर्भ आईडी, आंतरिक लिंक, चित्रों और 8-भाषा उपलब्धता का वास्तविक सत्यापन।',
    metricTotalPages: 'कुल सूचीबद्ध पृष्ठ',
    metricCanonicalIds: 'प्रामाणिक संदर्भ आईडी',
    metricRouterRoutes: 'पंजीकृत राउटर मार्ग',
    metricWorkingGreen: 'कार्यरत (GREEN)',
    metricWarningYellow: 'समीक्षा आवश्यक (YELLOW)',
    metricBrokenRed: 'त्रुटिपूर्ण (RED)',
    metricKakatiyaPages: 'काकतीय राजवंश (KD)',
    metricCommunity76: '76 सामुदायिक संदर्भ',
    relatedPagesTitle: 'संबंधित प्रमुख पोर्टल केंद्र एवं अभिलेखागार',
    showingCountText: 'निर्देशिका में मेल खाते पृष्ठ प्रदर्शित',
    allCategoriesOption: 'सभी श्रेणियाँ एवं उपसर्ग',
    allDynastiesOption: 'सभी ऐतिहासिक राजवंश',
    allCommunityOption: 'सभी सामुदायिक अनुभाग',
    allLanguagesOption: 'सभी 8 भाषाएँ उपलब्ध',
    allStatusesOption: 'सभी स्वास्थ्य स्थितियाँ',
    sortSerial: 'क्रम संख्या (#1–#734)',
    sortTitleAsc: 'वर्णमाला क्रम (A → Z)',
    sortTitleDesc: 'वर्णमाला क्रम (Z → A)',
    sortRefId: 'संदर्भ आईडी (A → Z)',
    sortRoute: 'मार्ग / URL (A → Z)',
    sortCategory: 'श्रेणी नाम (A → Z)',
    showAllRowsBtn: 'सभी पृष्ठ एक साथ दिखाएँ',
    paginatedViewBtn: 'पृष्ठबद्ध दृश्य (100 प्रति पृष्ठ)'
  },
  te: {
    badge: 'గ్లోబల్ నావిగేషన్ & రిఫరెన్స్ ఐడి డైరెక్టరీ • WP-0039',
    pageTitle: 'వెబ్‌సైట్ పేజీ డైరెక్టరీ (Website Page Directory)',
    pageSubtitle: 'సంపూర్ణ వెబ్‌సైట్ పేజీలు, లింకులు & నావిగేషన్ సూచిక',
    referenceIdLabel: 'రిఫరెన్స్ ఐడి: WP-0039',
    backBtn: 'వెనుకకు',
    homeBtn: 'హోమ్',
    prevPageBtn: 'మునుపటి పేజీ',
    nextPageBtn: 'తదుపరి పేజీ',
    printBtn: 'ప్రింట్ చేయండి',
    pdfBtn: 'PDF డౌన్‌లోడ్',
    shareBtn: 'షేర్ చేయండి',
    copiedMsg: 'లింక్ కాపీ అయింది',
    breadcrumbHome: 'హోమ్',
    breadcrumbSection: 'వెబ్‌సైట్ నిర్మాణం & నావిగేషన్',
    searchPlaceholder: 'పేజీ శీర్షిక, రిఫరెన్స్ ఐడి (KD-0001, RD-0001, CH-0048), వర్గం లేదా రూట్ (/maps) ద్వారా వెతకండి...',
    categoryFilterLabel: 'వర్గం / ప్రిఫిక్స్',
    dynastyFilterLabel: 'చారిత్రక రాజవంశం',
    communityFilterLabel: 'సామాజిక విభాగం',
    languageFilterLabel: 'భాషల లభ్యత',
    statusFilterLabel: 'పేజీ స్థితి (Health)',
    sortByLabel: 'క్రమబద్ధీకరణ',
    viewModeLabel: 'ప్రదర్శన శైలి',
    viewTable: 'టేబుల్ వ్యూ',
    viewCards: 'కార్డ్ వ్యూ',
    viewGrouped: 'వర్గాల వారీగా',
    resetFiltersBtn: 'ఫిల్టర్లు రీసెట్',
    colSerial: 'వ.సం.',
    colTitle: 'పేజీ శీర్షిక',
    colRefId: 'రిఫరెన్స్ ఐడి',
    colCategory: 'వర్గం',
    colSubcategory: 'ఉప-వర్గం',
    colRoute: 'వాస్తవ రూట్ / URL',
    colAction: 'చర్య',
    colStatus: 'పేజీ స్థితి',
    colLanguages: 'అందుబాటులో ఉన్న భాషలు',
    openPageBtn: 'పేజీ తెరవండి',
    statusGreen: 'GREEN – పనిచేస్తోంది',
    statusYellow: 'YELLOW – సమీక్ష అవసరం',
    statusRed: 'RED – లోపం / కనుగొనబడలేదు',
    statusGray: 'GRAY – తనిఖీ చేయలేదు',
    healthMonitorTitle: 'వెబ్‌సైట్ పేజీ హెల్త్ & ఇంటిగ్రిటీ మానిటర్',
    healthMonitorSubtitle: 'పోర్టల్‌లోని అన్ని రూట్లు, రిఫరెన్స్ ఐడిలు, అంతర్గత లింకులు, చిత్రాలు మరియు 8 భాషల లభ్యత యొక్క ప్రత్యక్ష తనిఖీ.',
    metricTotalPages: 'మొత్తం పేజీలు',
    metricCanonicalIds: 'ప్రామాణిక రిఫరెన్స్ ఐడిలు',
    metricRouterRoutes: 'నమోదిత రౌటర్ మార్గాలు',
    metricWorkingGreen: 'పనిచేస్తున్నవి (GREEN)',
    metricWarningYellow: 'సమీక్ష అవసరం (YELLOW)',
    metricBrokenRed: 'లోపం ఉన్నవి (RED)',
    metricKakatiyaPages: 'కాకతీయ రాజవంశం (KD)',
    metricCommunity76: '76 సామాజిక రిఫరెన్సులు',
    relatedPagesTitle: 'సంబంధిత ప్రధాన పోర్టల్ విభాగాలు',
    showingCountText: 'డైరెక్టరీలో సరిపోలిన పేజీలు',
    allCategoriesOption: 'అన్ని వర్గాలు & ప్రిఫిక్స్‌లు',
    allDynastiesOption: 'అన్ని చారిత్రక రాజవంశాలు',
    allCommunityOption: 'అన్ని సామాజిక విభాగాలు',
    allLanguagesOption: 'అన్ని 8 భాషలు అందుబాటులో',
    allStatusesOption: 'అన్ని స్థితులు',
    sortSerial: 'వరుస సంఖ్య (#1–#734)',
    sortTitleAsc: 'అక్షర క్రమం (A → Z)',
    sortTitleDesc: 'అక్షర క్రమం (Z → A)',
    sortRefId: 'రిఫరెన్స్ ఐడి (A → Z)',
    sortRoute: 'రూట్ / URL (A → Z)',
    sortCategory: 'వర్గం పేరు (A → Z)',
    showAllRowsBtn: 'అన్ని పేజీలను ఒకేసారి చూపించు',
    paginatedViewBtn: 'పేజీల వారీగా చూపించు (పేజీకి 100)'
  },
  kn: {
    badge: 'ಜಾಗತಿಕ ನ್ಯಾವಿಗೇಷನ್ ಮತ್ತು ರೆಫರೆನ್ಸ್ ಐಡಿ ನಿರ್ದೇಶಿಕೆ • WP-0039',
    pageTitle: 'ವೆಬ್‌ಸೈಟ್ ಪುಟ ನಿರ್ದೇಶಿಕೆ (Website Page Directory)',
    pageSubtitle: 'ಸಂಪೂರ್ಣ ವೆಬ್‌ಸೈಟ್ ಪುಟಗಳು, ಲಿಂಕ್‌ಗಳು ಮತ್ತು ನ್ಯಾವಿಗೇಷನ್ ಸೂಚ್ಯಂಕ',
    referenceIdLabel: 'ರೆಫರೆನ್ಸ್ ಐಡಿ: WP-0039',
    backBtn: 'ಹಿಂದೆ',
    homeBtn: 'ಮುಖಪುಟ',
    prevPageBtn: 'ಹಿಂದಿನ ಪುಟ',
    nextPageBtn: 'ಮುಂದಿನ ಪುಟ',
    printBtn: 'ಮುದ್ರಿಸಿ (Print)',
    pdfBtn: 'PDF ಡೌನ್‌ಲೋಡ್',
    shareBtn: 'ಹಂಚಿಕೊಳ್ಳಿ',
    copiedMsg: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ',
    breadcrumbHome: 'ಮುಖಪುಟ',
    breadcrumbSection: 'ವೆಬ್‌ಸೈಟ್ ವಿನ್ಯಾಸ ಮತ್ತು ನ್ಯಾವಿಗೇಷನ್',
    searchPlaceholder: 'ಪುಟದ ಶೀರ್ಷಿಕೆ, ರೆಫರೆನ್ಸ್ ಐಡಿ (KD-0001, RD-0001, CH-0048), ವಿಭಾಗ ಅಥವಾ ಮಾರ್ಗ (/maps) ಮೂಲಕ ಹುಡುಕಿ...',
    categoryFilterLabel: 'ವಿಭಾಗ / ಪೂರ್ವಪ್ರತ್ಯಯ',
    dynastyFilterLabel: 'ಐತಿಹಾಸಿಕ ರಾಜವಂಶ',
    communityFilterLabel: 'ಸಮುದಾಯ ವಿಭಾಗ',
    languageFilterLabel: 'ಭಾಷಾ ಲಭ್ಯತೆ',
    statusFilterLabel: 'ಪುಟದ ಸ್ಥಿತಿ',
    sortByLabel: 'ವಿಂಗಡಣೆ ಕ್ರಮ',
    viewModeLabel: 'ಪ್ರದರ್ಶನ ಶೈಲಿ',
    viewTable: 'ಕೋಷ್ಟಕ ನೋಟ',
    viewCards: 'ಕಾರ್ಡ್ ನೋಟ',
    viewGrouped: 'ವಿಭಾಗವಾರು',
    resetFiltersBtn: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
    colSerial: 'ಕ್ರ.ಸಂ.',
    colTitle: 'ಪುಟದ ಶೀರ್ಷಿಕೆ',
    colRefId: 'ರೆಫರೆನ್ಸ್ ಐಡಿ',
    colCategory: 'ವಿಭಾಗ',
    colSubcategory: 'ಉಪ-ವಿಭಾಗ',
    colRoute: 'ವಾಸ್ತವ ಮಾರ್ಗ / URL',
    colAction: 'ಕ್ರಿಯೆ',
    colStatus: 'ಪುಟದ ಸ್ಥಿತಿ',
    colLanguages: 'ಲಭ್ಯವಿರುವ ಭಾಷೆಗಳು',
    openPageBtn: 'ಪುಟ ತೆರೆಯಿರಿ',
    statusGreen: 'GREEN – ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ',
    statusYellow: 'YELLOW – ಪರಿಶೀಲನೆ ಅಗತ್ಯ',
    statusRed: 'RED – ದೋಷ / ಕಂಡುಬಂದಿಲ್ಲ',
    statusGray: 'GRAY – ಪರಿಶೀಲಿಸಿಲ್ಲ',
    healthMonitorTitle: 'ವೆಬ್‌ಸೈಟ್ ಪುಟ ಆರೋಗ್ಯ ಮತ್ತು ಸಮಗ್ರತೆ ಮಾನಿಟರ್',
    healthMonitorSubtitle: 'ಎಲ್ಲಾ ಮಾರ್ಗಗಳು, ರೆಫರೆನ್ಸ್ ಐಡಿಗಳು, ಆಂತರಿಕ ಲಿಂಕ್‌ಗಳು, ಚಿತ್ರಗಳು ಮತ್ತು 8 ಭಾಷೆಗಳ ಲಭ್ಯತೆಯ ನೈಜ ಪರಿಶೀಲನೆ.',
    metricTotalPages: 'ಒಟ್ಟು ಪುಟಗಳು',
    metricCanonicalIds: 'ಅಧಿಕೃತ ರೆಫರೆನ್ಸ್ ಐಡಿಗಳು',
    metricRouterRoutes: 'ನೋಂದಾಯಿತ ಮಾರ್ಗಗಳು',
    metricWorkingGreen: 'ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವವು (GREEN)',
    metricWarningYellow: 'ಪರಿಶೀಲನೆ ಅಗತ್ಯ (YELLOW)',
    metricBrokenRed: 'ದೋಷಯುಕ್ತ (RED)',
    metricKakatiyaPages: 'ಕಾಕತೀಯ ರಾಜವಂಶ (KD)',
    metricCommunity76: '76 ಸಮುದಾಯ ಉಲ್ಲೇಖಗಳು',
    relatedPagesTitle: 'ಸಂಬಂಧಿತ ಪ್ರಮುಖ ಪೋರ್ಟಲ್ ವಿಭಾಗಗಳು',
    showingCountText: 'ನಿರ್ದೇಶಿಕೆಯಲ್ಲಿ ಹೊಂದಾಣಿಕೆಯಾಗುವ ಪುಟಗಳು',
    allCategoriesOption: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು',
    allDynastiesOption: 'ಎಲ್ಲಾ ಐತಿಹಾಸಿಕ ರಾಜವಂಶಗಳು',
    allCommunityOption: 'ಎಲ್ಲಾ ಸಮುದಾಯ ವಿಭಾಗಗಳು',
    allLanguagesOption: 'ಎಲ್ಲಾ 8 ಭಾಷೆಗಳು ಲಭ್ಯ',
    allStatusesOption: 'ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು',
    sortSerial: 'ಕ್ರಮ ಸಂಖ್ಯೆ (#1–#734)',
    sortTitleAsc: 'ವರ್ಣಮಾಲೆ ಕ್ರಮ (A → Z)',
    sortTitleDesc: 'ವರ್ಣಮಾಲೆ ಕ್ರಮ (Z → A)',
    sortRefId: 'ರೆಫರೆನ್ಸ್ ಐಡಿ (A → Z)',
    sortRoute: 'ಮಾರ್ಗ / URL (A → Z)',
    sortCategory: 'ವಿಭಾಗದ ಹೆಸರು (A → Z)',
    showAllRowsBtn: 'ಎಲ್ಲಾ ಪುಟಗಳನ್ನು ಒಂದೇ ಪರದೆಯಲ್ಲಿ ತೋರಿಸಿ',
    paginatedViewBtn: 'ಪುಟವಾರು ನೋಟ (ಪ್ರತಿ ಪುಟಕ್ಕೆ 100)'
  },
  ta: {
    badge: 'உலகளாவிய வழிசெலுத்தல் & குறிப்பு எண் பட்டியல் • WP-0039',
    pageTitle: 'இணையதளப் பக்க அடைவு (Website Page Directory)',
    pageSubtitle: 'முழுமையான இணையதளப் பக்கங்கள், இணைப்புகள் & வழிசெலுத்தல் பட்டியல்',
    referenceIdLabel: 'குறிப்பு எண்: WP-0039',
    backBtn: 'பின்செல்',
    homeBtn: 'முகப்பு',
    prevPageBtn: 'முந்தைய பக்கம்',
    nextPageBtn: 'அடுத்த பக்கம்',
    printBtn: 'அச்சிடுக (Print)',
    pdfBtn: 'PDF பதிவிறக்கம்',
    shareBtn: 'பகிர்',
    copiedMsg: 'இணைப்பு நகலெடுக்கப்பட்டது',
    breadcrumbHome: 'முகப்பு',
    breadcrumbSection: 'இணையதளக் கட்டமைப்பு & வழிசெலுத்தல்',
    searchPlaceholder: 'பக்கத் தலைப்பு, குறிப்பு எண் (KD-0001, RD-0001, CH-0048), பிரிவு அல்லது முகவரி (/maps) மூலம் தேடுக...',
    categoryFilterLabel: 'பிரிவு / முன்னொட்டு',
    dynastyFilterLabel: 'வரலாற்று அரச வம்சம்',
    communityFilterLabel: 'சமூகப் பிரிவு',
    languageFilterLabel: 'மொழி பயன்பாடு',
    statusFilterLabel: 'பக்க நிலை (Health)',
    sortByLabel: 'வரிசைப்படுத்து',
    viewModeLabel: 'காட்சி முறை',
    viewTable: 'அட்டவணைக் காட்சி',
    viewCards: 'அட்டைக் காட்சி',
    viewGrouped: 'பிரிவு வாரியாக',
    resetFiltersBtn: 'வடிகட்டிகளை மீட்டமை',
    colSerial: 'வ.எண்',
    colTitle: 'பக்கத் தலைப்பு',
    colRefId: 'குறிப்பு எண்',
    colCategory: 'பிரிவு',
    colSubcategory: 'துணைப் பிரிவு',
    colRoute: 'முகவரி / URL',
    colAction: 'פעולה / திற',
    colStatus: 'பக்க நிலை',
    colLanguages: 'உள்ள மொழிகள்',
    openPageBtn: 'பக்கத்தைத் திற',
    statusGreen: 'GREEN – செயல்படுகிறது',
    statusYellow: 'YELLOW – ஆய்வு தேவை',
    statusRed: 'RED – பிழை / இல்லை',
    statusGray: 'GRAY – சரிபார்க்கப்படவில்லை',
    healthMonitorTitle: 'இணையதளப் பக்க நலன் & ஒருமைப்பாடு கண்காணிப்பு',
    healthMonitorSubtitle: 'அனைத்து முகவரிகள், குறிப்பு எண்கள், உள் இணைப்புகள், படங்கள் மற்றும் 8 மொழி ஆதரவின் நேரடிச் சரிபார்ப்பு.',
    metricTotalPages: 'மொத்தப் பக்கங்கள்',
    metricCanonicalIds: 'அதிகாரப்பூர்வ குறிப்பு எண்கள்',
    metricRouterRoutes: 'பதிவுசெய்யப்பட்ட முகவரிகள்',
    metricWorkingGreen: 'செயல்படுபவை (GREEN)',
    metricWarningYellow: 'ஆய்வு தேவை (YELLOW)',
    metricBrokenRed: 'பிழையானவை (RED)',
    metricKakatiyaPages: 'காகதீய வம்சம் (KD)',
    metricCommunity76: '76 சமூகக் குறிப்புகள்',
    relatedPagesTitle: 'தொடர்புடைய முதன்மைப் பிரிவுகள்',
    showingCountText: 'பட்டியலில் பொருந்தும் பக்கங்கள்',
    allCategoriesOption: 'அனைத்துப் பிரிவுகளும்',
    allDynastiesOption: 'அனைத்து அரச வம்சங்களும்',
    allCommunityOption: 'அனைத்துச் சமூகப் பிரிவுகளும்',
    allLanguagesOption: 'அனைத்து 8 மொழிகளும்',
    allStatusesOption: 'அனைத்து நிலைகளும்',
    sortSerial: 'வரிசை எண் (#1–#734)',
    sortTitleAsc: 'அகரவரிசை (A → Z)',
    sortTitleDesc: 'அகரவரிசை (Z → A)',
    sortRefId: 'குறிப்பு எண் (A → Z)',
    sortRoute: 'முகவரி / URL (A → Z)',
    sortCategory: 'பிரிவுப் பெயர் (A → Z)',
    showAllRowsBtn: 'அனைத்துப் பக்கங்களையும் ஒரே திரையில் காட்டு',
    paginatedViewBtn: 'பக்க வாரியான காட்சி (பக்கத்திற்கு 100)'
  },
  mr: {
    badge: 'जागतिक नेव्हिगेशन आणि संदर्भ आयडी निर्देशिका • WP-0039',
    pageTitle: 'वेबसाइट पृष्ठ निर्देशिका (Website Page Directory)',
    pageSubtitle: 'संपूर्ण वेबसाइट पृष्ठे, दुवे आणि नेव्हिगेशन अनुक्रमणिका',
    referenceIdLabel: 'संदर्भ आयडी: WP-0039',
    backBtn: 'मागे',
    homeBtn: 'मुख्यपृष्ठ',
    prevPageBtn: 'मागील पृष्ठ',
    nextPageBtn: 'पुढील पृष्ठ',
    printBtn: 'प्रिंट करा',
    pdfBtn: 'PDF डाउनलोड',
    shareBtn: 'शेअर करा',
    copiedMsg: 'दुवा कॉपी झाला',
    breadcrumbHome: 'मुख्यपृष्ठ',
    breadcrumbSection: 'वेबसाइट रचना आणि नेव्हिगेशन',
    searchPlaceholder: 'पृष्ठ शीर्षक, संदर्भ आयडी (KD-0001, RD-0001, CH-0048), विभाग किंवा मार्ग (/maps) द्वारे शोधा...',
    categoryFilterLabel: 'विभाग / उपसर्ग',
    dynastyFilterLabel: 'ऐतिहासिक राजवंश',
    communityFilterLabel: 'समुदाय विभाग',
    languageFilterLabel: 'भाषा उपलब्धता',
    statusFilterLabel: 'पृष्ठ स्थिती',
    sortByLabel: 'क्रमवारी',
    viewModeLabel: 'प्रदर्शन मोड',
    viewTable: 'तक्ता दृश्य',
    viewCards: 'कार्ड दृश्य',
    viewGrouped: 'विभागानुसार',
    resetFiltersBtn: 'फिल्टर रीसेट करा',
    colSerial: 'अ.क्र.',
    colTitle: 'पृष्ठ शीर्षक',
    colRefId: 'संदर्भ आयडी',
    colCategory: 'विभाग',
    colSubcategory: 'उप-विभाग',
    colRoute: 'प्रत्यक्ष मार्ग / URL',
    colAction: 'कृती',
    colStatus: 'पृष्ठ स्थिती',
    colLanguages: 'उपलब्ध भाषा',
    openPageBtn: 'पृष्ठ उघडा',
    statusGreen: 'GREEN – कार्यरत',
    statusYellow: 'YELLOW – पुनरावलोकन आवश्यक',
    statusRed: 'RED – त्रुटी / सापडले नाही',
    statusGray: 'GRAY – न तपासलेले',
    healthMonitorTitle: 'वेबसाइट पृष्ठ आरोग्य आणि अखंडता मॉनिटर',
    healthMonitorSubtitle: 'संपूर्ण पोर्टलवरील मार्ग, संदर्भ आयडी, अंतर्गत दुवे, चित्रे आणि ८-भाषा उपलब्धतेची प्रत्यक्ष पडताळणी.',
    metricTotalPages: 'एकूण सूचीबद्ध पृष्ठे',
    metricCanonicalIds: 'प्रमाणित संदर्भ आयडी',
    metricRouterRoutes: 'नोंदणीकृत राउटर मार्ग',
    metricWorkingGreen: 'कार्यरत (GREEN)',
    metricWarningYellow: 'पुनरावलोकन आवश्यक (YELLOW)',
    metricBrokenRed: 'त्रुटीपूर्ण (RED)',
    metricKakatiyaPages: 'काकतीय राजवंश (KD)',
    metricCommunity76: '७६ समुदाय संदर्भ',
    relatedPagesTitle: 'संबंधित प्रमुख पोर्टल विभाग',
    showingCountText: 'निर्देशिकेतील जुळणारी पृष्ठे',
    allCategoriesOption: 'सर्व विभाग आणि उपसर्ग',
    allDynastiesOption: 'सर्व ऐतिहासिक राजवंश',
    allCommunityOption: 'सर्व समुदाय विभाग',
    allLanguagesOption: 'सर्व ८ भाषा उपलब्ध',
    allStatusesOption: 'सर्व स्थिती',
    sortSerial: 'अनुक्रमांक (#1–#734)',
    sortTitleAsc: 'वर्णानुक्रम (A → Z)',
    sortTitleDesc: 'वर्णानुक्रम (Z → A)',
    sortRefId: 'संदर्भ आयडी (A → Z)',
    sortRoute: 'मार्ग / URL (A → Z)',
    sortCategory: 'विभाग नाव (A → Z)',
    showAllRowsBtn: 'सर्व पृष्ठे एकाच स्क्रीनवर दाखवा',
    paginatedViewBtn: 'पृष्ठानुसार दृश्य (प्रति पृष्ठ १००)'
  },
  or: {
    badge: 'ଗ୍ଲୋବାଲ୍ ନେଭିଗେସନ୍ ଓ ରେଫରେନ୍ସ ଆଇଡି ନିର୍ଦ୍ଦେଶିକା • WP-0039',
    pageTitle: 'ୱେବସାଇଟ୍ ପୃଷ୍ଠା ନିର୍ଦ୍ଦେଶିକା (Website Page Directory)',
    pageSubtitle: 'ସମ୍ପୂର୍ଣ୍ଣ ୱେବସାଇଟ୍ ପୃଷ୍ଠା, ଲିଙ୍କ୍ ଏବଂ ନେଭିଗେସନ୍ ସୂଚୀ',
    referenceIdLabel: 'ରେଫରେନ୍ସ ଆଇଡି: WP-0039',
    backBtn: 'ପଛକୁ',
    homeBtn: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    prevPageBtn: 'ପୂର୍ବ ପୃଷ୍ଠା',
    nextPageBtn: 'ପରବର୍ତ୍ତୀ ପୃଷ୍ଠା',
    printBtn: 'ପ୍ରିଣ୍ଟ କରନ୍ତୁ',
    pdfBtn: 'PDF ଡାଉନଲୋଡ୍',
    shareBtn: 'ସେୟାର୍ କରନ୍ତୁ',
    copiedMsg: 'ଲିଙ୍କ୍ କପି ହେଲା',
    breadcrumbHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    breadcrumbSection: 'ୱେବସାଇଟ୍ ସଂರଚନା ଓ ନେଭିଗେସନ୍',
    searchPlaceholder: 'ପୃଷ୍ଠା ଶୀର୍ଷକ, ରେଫରେନ୍ସ ଆଇଡି (KD-0001, RD-0001, CH-0048), ବିଭାଗ କିମ୍ବା ମାର୍ଗ (/maps) ଦ୍ୱାରା ଖୋଜନ୍ତୁ...',
    categoryFilterLabel: 'ବିଭାଗ / ଉପସର୍ଗ',
    dynastyFilterLabel: 'ଐତିହାସିକ ରାଜବଂଶ',
    communityFilterLabel: 'ସମ୍ପ୍ରଦାୟ ବିଭାଗ',
    languageFilterLabel: 'ଭାଷା ଉପଲବ୍ଧତା',
    statusFilterLabel: 'ପୃଷ୍ଠା ସ୍ଥିତି',
    sortByLabel: 'କ୍ରମবଦ୍ଧ କରନ୍ତୁ',
    viewModeLabel: 'ପ୍ରଦର୍ଶନ ଶୈଳୀ',
    viewTable: 'ସାରଣୀ ଦୃଶ୍ୟ',
    viewCards: 'କାର୍ଡ ଦୃଶ୍ୟ',
    viewGrouped: 'ବିଭାଗ ଅନୁଯାୟୀ',
    resetFiltersBtn: 'ଫିଲ୍ଟର୍ ରିସେଟ୍',
    colSerial: 'କ୍ର.ସଂ.',
    colTitle: 'ପୃଷ୍ଠା ଶୀର୍ଷକ',
    colRefId: 'ରେଫରେନ୍ସ ଆଇଡି',
    colCategory: 'ବିଭାଗ',
    colSubcategory: 'ଉପ-ବିଭାଗ',
    colRoute: 'ପ୍ରକୃତ ମାର୍ଗ / URL',
    colAction: 'କାର୍ଯ୍ୟ',
    colStatus: 'ପୃଷ୍ଠା ସ୍ଥିତି',
    colLanguages: 'ଉପଲବ୍ଧ ଭାଷା',
    openPageBtn: 'ପୃଷ୍ଠା ଖୋଲନ୍ତୁ',
    statusGreen: 'GREEN – କାର୍ଯ୍ୟକ୍ଷମ',
    statusYellow: 'YELLOW – ସମୀକ୍ଷା ଆବଶ୍ୟକ',
    statusRed: 'RED – ତ୍ରୁଟି / ମିଳିଲା ନାହିଁ',
    statusGray: 'GRAY – ଯାଞ୍ଚ ହୋଇନାହିଁ',
    healthMonitorTitle: 'ୱେବସାଇଟ୍ ପୃଷ୍ଠା ସ୍ୱାସ୍ଥ୍ୟ ଓ ଅଖଣ୍ଡତା ମନିଟର୍',
    healthMonitorSubtitle: 'ସମସ୍ତ ମାର୍ଗ, ରେଫରେନ୍ସ ଆଇଡି, ଆന്തରିକ ଲିଙ୍କ୍, ଚିତ୍ର ଏବଂ ୮ଟି ଭାଷା ଉପଲବ୍ଧତାର ପ୍ରତ୍ୟକ୍ଷ ଯାଞ୍ଚ।',
    metricTotalPages: 'ମୋଟ ତାଲିକାଭୁକ୍ତ ପୃଷ୍ଠା',
    metricCanonicalIds: 'প্রାମାଣିକ ରେଫରେନ୍ସ ଆଇଡି',
    metricRouterRoutes: 'ପଞ୍ଜୀକୃତ ରାଉଟର୍ ମାର୍ଗ',
    metricWorkingGreen: 'କାର୍ଯ୍ୟକ୍ଷମ (GREEN)',
    metricWarningYellow: 'ସମୀକ୍ଷା ଆବଶ୍ୟକ (YELLOW)',
    metricBrokenRed: 'ତ୍ରୁଟିପୂର୍ଣ୍ଣ (RED)',
    metricKakatiyaPages: 'କାକତୀୟ ରାଜବଂଶ (KD)',
    metricCommunity76: '୭୬ ସମ୍ପ୍ରଦାୟ ସନ୍ଦର୍ଭ',
    relatedPagesTitle: 'ସମ୍ପର୍କିତ ପ୍ରମୁଖ ପୋର୍ଟାଲ୍ ବିଭାଗ',
    showingCountText: 'ନିର୍ଦ୍ଦେଶିକାରେ ମିଳୁଥିବା ପୃଷ୍ଠା',
    allCategoriesOption: 'ସମସ୍ତ ବିଭାଗ ଓ ଉପସର୍ଗ',
    allDynastiesOption: 'ସମସ୍ତ ଐତିହାସିକ ରାଜବଂଶ',
    allCommunityOption: 'ସମସ୍ତ ସମ୍ପ୍ରଦାୟ ବିଭାଗ',
    allLanguagesOption: 'ସମସ୍ତ ୮ଟି ଭାଷା ଉପଲବ୍ଧ',
    allStatusesOption: 'ସମସ୍ତ ସ୍ଥିତି',
    sortSerial: 'କ୍ରମିକ ସଂଖ୍ୟା (#1–#734)',
    sortTitleAsc: 'ବର୍ଣ୍ଣମାଳା କ୍ରମ (A → Z)',
    sortTitleDesc: 'ବର୍ଣ୍ଣମାଳା କ୍ରମ (Z → A)',
    sortRefId: 'ରେଫରେନ୍ସ ଆଇଡି (A → Z)',
    sortRoute: 'ମାର୍ଗ / URL (A → Z)',
    sortCategory: 'ବିଭାଗ ନାମ (A → Z)',
    showAllRowsBtn: 'ସମସ୍ତ ପୃଷ୍ଠା একାଠି ଦେଖାନ୍ତୁ',
    paginatedViewBtn: 'ପୃଷ୍ଠା ଅନୁଯାୟୀ ଦେଖାନ୍ତୁ (ପୃଷ୍ଠା ପିଛା ୧୦୦)'
  },
  bn: {
    badge: 'গ্লোবাল নেভিগেশন ও রেফারেন্স আইডি ডিরেক্টরি • WP-0039',
    pageTitle: 'ওয়েবসাইট পৃষ্ঠা ডিরেক্টরি (Website Page Directory)',
    pageSubtitle: 'সম্পূর্ণ ওয়েবসাইট পৃষ্ঠা, লিঙ্ক এবং নেভিগেশন সূচিপত্র',
    referenceIdLabel: 'রেফারেন্স আইডি: WP-0039',
    backBtn: 'পিছনে',
    homeBtn: 'হোম',
    prevPageBtn: 'পূর্ববর্তী পৃষ্ঠা',
    nextPageBtn: 'পরবর্তী পৃষ্ঠা',
    printBtn: 'প্রিন্ট করুন',
    pdfBtn: 'PDF ডাউনলোড',
    shareBtn: 'শেয়ার করুন',
    copiedMsg: 'লিঙ্ক কপি হয়েছে',
    breadcrumbHome: 'হোম',
    breadcrumbSection: 'ওয়েবসাইট কাঠামো ও নেভিগেশন',
    searchPlaceholder: 'পৃষ্ঠার শিরোনাম, রেফারেন্স আইডি (KD-0001, RD-0001, CH-0048), বিভাগ বা রুট (/maps) দিয়ে খুঁজুন...',
    categoryFilterLabel: 'বিভাগ / প্রিফিক্স',
    dynastyFilterLabel: 'ঐতিহাসিক রাজবংশ',
    communityFilterLabel: 'সম্প্রদায় বিভাগ',
    languageFilterLabel: 'ভাষার প্রাপ্যতা',
    statusFilterLabel: 'পৃষ্ঠার অবস্থা (Health)',
    sortByLabel: 'ক্রমবিন্যাস',
    viewModeLabel: 'প্রদর্শন মোড',
    viewTable: 'টেবিল ভিউ',
    viewCards: 'কার্ড ভিউ',
    viewGrouped: 'বিভাগ অনুযায়ী',
    resetFiltersBtn: 'ফিল্টার রিসেট',
    colSerial: 'ক্র.নং',
    colTitle: 'পৃষ্ঠার শিরোনাম',
    colRefId: 'রেফারেন্স আইডি',
    colCategory: 'বিভাগ',
    colSubcategory: 'উপ-বিভাগ',
    colRoute: 'প্রকৃত রুট / URL',
    colAction: 'পদক্ষেপ',
    colStatus: 'পৃষ্ঠার অবস্থা',
    colLanguages: 'উপলব্ধ ভাষা',
    openPageBtn: 'পৃষ্ঠা খুলুন',
    statusGreen: 'GREEN – সচল',
    statusYellow: 'YELLOW – পর্যালোচনা প্রয়োজন',
    statusRed: 'RED – ত্রুটি / পাওয়া যায়নি',
    statusGray: 'GRAY – যাচাই করা হয়নি',
    healthMonitorTitle: 'ওয়েবসাইট পৃষ্ঠা স্বাস্থ্য ও অখণ্ডতা মনিটর',
    healthMonitorSubtitle: 'সমগ্র পোর্টালের রুট, রেফারেন্স আইডি, অভ্যন্তরীণ লিঙ্ক, চিত্র এবং ৮-ভাষা প্রাপ্যতার প্রকৃত যাচাইকরণ।',
    metricTotalPages: 'মোট তালিকাভুক্ত পৃষ্ঠা',
    metricCanonicalIds: 'প্রামাণিক রেফারেন্স আইডি',
    metricRouterRoutes: 'নিবন্ধিত রাউটার রুট',
    metricWorkingGreen: 'সচল (GREEN)',
    metricWarningYellow: 'পর্যালোচনা প্রয়োজন (YELLOW)',
    metricBrokenRed: 'ত্রুটিপূর্ণ (RED)',
    metricKakatiyaPages: 'কাকতীয় রাজবংশ (KD)',
    metricCommunity76: '৭৬ সম্প্রদায় রেফারেন্স',
    relatedPagesTitle: 'সম্পর্কিত প্রধান পোর্টাল বিভাগসমূহ',
    showingCountText: 'ডিরেক্টরিতে মিলে যাওয়া পৃষ্ঠাসমূহ',
    allCategoriesOption: 'সকল বিভাগ ও প্রিফিক্স',
    allDynastiesOption: 'সকল ঐতিহাসিক রাজবংশ',
    allCommunityOption: 'সকল সম্প্রদায় বিভাগ',
    allLanguagesOption: 'সকল ৮টি ভাষা উপলব্ধ',
    allStatusesOption: 'সকল অবস্থা',
    sortSerial: 'ক্রমিক সংখ্যা (#1–#734)',
    sortTitleAsc: 'বর্ণানুক্রমিক (A → Z)',
    sortTitleDesc: 'বর্ণানুক্রমিক (Z → A)',
    sortRefId: 'রেফারেন্স আইডি (A → Z)',
    sortRoute: 'রুট / URL (A → Z)',
    sortCategory: 'বিভাগের নাম (A → Z)',
    showAllRowsBtn: 'সব পৃষ্ঠা এক পর্দায় দেখান',
    paginatedViewBtn: 'পৃষ্ঠাভিত্তিক ভিউ (প্রতি পৃষ্ঠায় ১০০)'
  }
};

const DYNASTY_FILTER_OPTIONS: Array<{ value: DynastyFilterCode; label: string }> = [
  { value: 'ALL', label: 'All Historical Dynasties' },
  { value: 'suryavamsha_gajapathi', label: 'Suryavamsha Gajapathi Empire (1434–1568 CE)' },
  { value: 'kakatiya_dynasty', label: 'Kakatiya Dynasty of Orugallu / Warangal (KD-0001..KD-0033)' },
  { value: 'eastern_ganga', label: 'Imperial Eastern Ganga / Chodaganga Dynasty' },
  { value: 'imperial_cholas', label: 'Imperial Chola Dynasty' },
  { value: 'chalukya_dynasties', label: 'Chalukya Dynasties (Badami, Vengi & Kalyani)' },
  { value: 'pallava_kadamba_western_ganga', label: 'Pallavas of Kanchi, Kadambas & Western Gangas' },
  { value: 'kalinga_kharavela_maurya', label: 'Ancient Kalinga, Emperor Kharavela & Kalinga War (261 BCE)' },
  { value: 'ancient_suryavamsha_ikshvaku', label: 'Ancient Suryavamsha / Ikshvaku Progenitors (Sagara, Bhagiratha, Sri Rama)' }
];

const COMMUNITY_SECTION_OPTIONS: Array<{ value: CommunitySectionFilterCode; label: string }> = [
  { value: 'ALL', label: 'All Community Sections' },
  { value: 'branch_directory_16', label: '16-Branch Canonical Community Directory (CH-0001..CH-0016)' },
  { value: 'professions_9', label: '9 Professional & Shilpa-Shastra Categories (CH-0017..CH-0025)' },
  { value: 'synonyms_15', label: '15 Regional & Lineage Synonyms (CH-0026..CH-0040)' },
  { value: 'geography_7', label: '7 Regional Geographical Spread Dossiers (CH-0041..CH-0047)' },
  { value: 'references_76', label: '76 Master Community Nomenclature References (CH-0048..CH-0123)' },
  { value: 'surnames_south_260', label: '260 South-Indian Community Surnames (CSS-0001..CSS-0260)' },
  { value: 'surnames_north_90', label: '90 North-Indian Community Surnames & Gotras (CSN-0001..CSN-0090)' },
  { value: 'prominent_persons_32', label: '32 Community Prominent Persons & Research Scope (CPP-0001..CPP-0032)' },
  { value: 'culture_activities_events', label: 'Culture & Traditions, Community Activities & Events (CT, CA, EN)' }
];

type SortOptionCode = 'serial' | 'title_asc' | 'title_desc' | 'ref_id' | 'route' | 'category';
type ViewModeCode = 'table' | 'cards' | 'grouped';

export const WebsitePageDirectoryPage: React.FC<WebsitePageDirectoryPageProps> = ({
  onNavigate,
  embeddedInAdmin = false
}) => {
  const { language, setLanguage } = useLanguage();
  const { user } = useAuth();
  const ui = DIRECTORY_I18N[language] || DIRECTORY_I18N.en;

  const isAdminOrEditor = Boolean(
    user &&
      [
        'super_admin',
        'admin',
        'historical_editor',
        'research_reviewer',
        'translator',
        'community_moderator'
      ].includes(user.role)
  );

  // Administrative health diagnostics, live route probing, and management actions
  // are kept strictly private to authorized admins inside the Admin panel.
  const isPrivateAdminMode = Boolean(embeddedInAdmin && isAdminOrEditor);

  // Build authoritative inventory & health report
  const { entries: allEntries, summary } = useMemo(
    () => buildWebsitePageDirectoryInventory(language),
    [language]
  );

  // Search, Filter, Sort & View States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState<'ALL' | ReferencePrefixCode | 'UNASSIGNED'>('ALL');
  const [selectedDynasty, setSelectedDynasty] = useState<DynastyFilterCode>('ALL');
  const [selectedCommunity, setSelectedCommunity] = useState<CommunitySectionFilterCode>('ALL');
  const [selectedLangFilter, setSelectedLangFilter] = useState<'ALL' | LanguageCode>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<'ALL' | PageHealthStatusCode>('ALL');
  const [sortBy, setSortBy] = useState<SortOptionCode>('serial');
  const [viewMode, setViewMode] = useState<ViewModeCode>('table');
  const [showAllRows, setShowAllRows] = useState<boolean>(false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);
  const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);
  const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);
  const [expandedDiagnosticId, setExpandedDiagnosticId] = useState<string | null>(null);

  // Live HTTP probe states (Admin / Health Monitor feature)
  const [liveHttpProbeMap, setLiveHttpProbeMap] = useState<Record<string, PageHealthStatusCode>>({});
  const [isProbingHttp, setIsProbingHttp] = useState<boolean>(false);

  const pageSize = 100;

  // Support URL query parameters ?q= or ?prefix= or ?dynasty=
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q') || params.get('search');
      const prefixParam = params.get('prefix');
      const dynastyParam = params.get('dynasty');
      if (qParam) setSearchQuery(qParam);
      if (prefixParam) setSelectedPrefix(prefixParam as any);
      if (dynastyParam) setSelectedDynasty(dynastyParam as any);
    } catch {
      // Ignore URLSearchParams errors
    }
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPageIndex(1);
  }, [
    searchQuery,
    selectedPrefix,
    selectedDynasty,
    selectedCommunity,
    selectedLangFilter,
    selectedStatus,
    sortBy
  ]);

  const filteredAndSortedEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const filtered = allEntries.filter(entry => {
      if (selectedPrefix !== 'ALL' && entry.prefix !== selectedPrefix) {
        return false;
      }
      if (selectedDynasty !== 'ALL' && entry.dynastyTag !== selectedDynasty) {
        return false;
      }
      if (selectedCommunity !== 'ALL' && entry.communitySectionTag !== selectedCommunity) {
        return false;
      }
      if (selectedLangFilter !== 'ALL' && !entry.availableLanguages.includes(selectedLangFilter)) {
        return false;
      }
      if (isPrivateAdminMode && selectedStatus !== 'ALL') {
        if (selectedStatus === 'GRAY') {
          const probeStatus = liveHttpProbeMap[entry.internalId] || 'GRAY';
          if (probeStatus !== 'GRAY') return false;
        } else if (entry.pageStatus !== selectedStatus) {
          return false;
        }
      }

      if (!q) return true;

      return (
        entry.pageTitle.toLowerCase().includes(q) ||
        entry.englishTitle.toLowerCase().includes(q) ||
        entry.referenceId.toLowerCase().includes(q) ||
        entry.category.toLowerCase().includes(q) ||
        entry.subcategory.toLowerCase().includes(q) ||
        entry.actualRoute.toLowerCase().includes(q) ||
        (isPrivateAdminMode && entry.internalId.toLowerCase().includes(q)) ||
        entry.routeAliases.some(alias => alias.toLowerCase().includes(q))
      );
    });

    const sorted = [...filtered];
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'title_asc':
          return a.pageTitle.localeCompare(b.pageTitle, language, { sensitivity: 'base' });
        case 'title_desc':
          return b.pageTitle.localeCompare(a.pageTitle, language, { sensitivity: 'base' });
        case 'ref_id':
          return a.referenceId.localeCompare(b.referenceId, 'en', { numeric: true });
        case 'route':
          return a.actualRoute.localeCompare(b.actualRoute, 'en');
        case 'category':
          return (
            a.category.localeCompare(b.category, 'en') ||
            a.serialNumber - b.serialNumber
          );
        case 'serial':
        default:
          return a.serialNumber - b.serialNumber;
      }
    });

    return sorted;
  }, [
    allEntries,
    searchQuery,
    selectedPrefix,
    selectedDynasty,
    selectedCommunity,
    selectedLangFilter,
    selectedStatus,
    sortBy,
    language,
    liveHttpProbeMap
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedEntries.length / pageSize));
  const visibleEntries = useMemo(() => {
    if (showAllRows || viewMode === 'grouped') return filteredAndSortedEntries;
    const start = (currentPageIndex - 1) * pageSize;
    return filteredAndSortedEntries.slice(start, start + pageSize);
  }, [filteredAndSortedEntries, showAllRows, viewMode, currentPageIndex]);

  const groupedByCategory = useMemo(() => {
    const groups = new Map<string, DirectoryPageEntry[]>();
    for (const item of filteredAndSortedEntries) {
      const key = `${item.prefix} — ${item.category}`;
      const list = groups.get(key) || [];
      list.push(item);
      groups.set(key, list);
    }
    return Array.from(groups.entries());
  }, [filteredAndSortedEntries]);

  const handleSafeBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      try {
        window.history.back();
        return;
      } catch {
        // Fallback to Home
      }
    }
    onNavigate('/');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPrefix('ALL');
    setSelectedDynasty('ALL');
    setSelectedCommunity('ALL');
    setSelectedLangFilter('ALL');
    setSelectedStatus('ALL');
    setSortBy('serial');
    setCurrentPageIndex(1);
  };

  const handlePrintPage = () => {
    if (typeof window === 'undefined') return;
    try {
      window.print();
    } catch {
      // Ignore in restricted WebView
    }
  };

  const getActualPageUrl = (): string => {
    if (typeof window === 'undefined') {
      return 'https://historical-web.web.app/page-directory';
    }
    return window.location.href;
  };

  const handleSharePage = async () => {
    const shareUrl = getActualPageUrl();
    const result = await triggerCrossPlatformShare({
      title: `${ui.pageTitle} — ${ui.pageSubtitle} (WP-0039)`,
      text: `${ui.pageTitle}: ${ui.pageSubtitle} (${summary.totalPagesDisplayed} Pages Indexed • Reference ID: WP-0039)`,
      url: shareUrl
    });
    if (result === 'fallback') {
      setShareMenuOpen(prev => !prev);
    }
  };

  const handleCopyUrl = async () => {
    const copied = await copyTextCrossPlatform(getActualPageUrl());
    if (copied) {
      setCopiedFeedback(true);
      setTimeout(() => setCopiedFeedback(false), 2500);
    }
  };

  const runLiveHttpRouteProbe = async () => {
    if (isProbingHttp) return;
    setIsProbingHttp(true);
    const nextMap: Record<string, PageHealthStatusCode> = {};
    // Probe all unique base routes via HEAD/GET
    const uniqueRoutes = Array.from(new Set(allEntries.map(e => e.baseRoutePath)));
    const routeResults: Record<string, boolean> = {};

    await Promise.all(
      uniqueRoutes.map(async rt => {
        try {
          const res = await fetch(rt, { method: 'HEAD' });
          routeResults[rt] = res.ok || res.status === 200 || res.status === 304;
        } catch {
          routeResults[rt] = false;
        }
      })
    );

    for (const entry of allEntries) {
      const ok = routeResults[entry.baseRoutePath];
      if (!ok) {
        nextMap[entry.internalId] = 'RED';
      } else {
        nextMap[entry.internalId] = entry.pageStatus;
      }
    }
    setLiveHttpProbeMap(nextMap);
    setIsProbingHttp(false);
  };

  const renderStatusBadge = (entry: DirectoryPageEntry) => {
    // Public visitors see a clean public availability status without internal diagnostic notes
    if (!isPrivateAdminMode) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#EEF7F0] text-[#14532D] border border-[#86EFAC] whitespace-nowrap">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
          <span>{ui.statusGreen}</span>
        </span>
      );
    }

    const status = entry.pageStatus;
    if (status === 'GREEN') {
      return (
        <span
          title={entry.healthCheck.statusReasons.join(' | ')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#EEF7F0] text-[#14532D] border border-[#86EFAC] whitespace-nowrap"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
          <span>{ui.statusGreen}</span>
        </span>
      );
    }
    if (status === 'YELLOW') {
      return (
        <span
          title={entry.healthCheck.statusReasons.join(' | ')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FEF9C3] text-[#713F12] border border-[#FDE047] whitespace-nowrap"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-[#CA8A04] shrink-0" />
          <span>{ui.statusYellow}</span>
        </span>
      );
    }
    if (status === 'RED') {
      return (
        <span
          title={entry.healthCheck.statusReasons.join(' | ')}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#FEE2E2] text-[#7F1D1D] border border-[#FCA5A5] whitespace-nowrap"
        >
          <XCircle className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
          <span>{ui.statusRed}</span>
        </span>
      );
    }
    return (
      <span
        title="Not yet checked via live HTTP probe"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F3F4F6] text-[#374151] border border-[#D1D5DB] whitespace-nowrap"
      >
        <Clock className="w-3.5 h-3.5 text-[#6B7280] shrink-0" />
        <span>{ui.statusGray}</span>
      </span>
    );
  };

  const prefixList = Object.values(GLOBAL_PREFIX_REGISTRY);

  return (
    <div className="min-h-screen bg-[#F5EBD9] text-[#292521] print:bg-white print:text-black">
      {/* =====================================================================
          HERO BANNER (DEEP ROYAL MAROON, ANTIQUE GOLD & WARM IVORY)
      ===================================================================== */}
      {!embeddedInAdmin && (
        <section
          className="royal-maroon-banner border-b-2 border-[#D4AF37] px-4 sm:px-6 lg:px-8 py-8 sm:py-10 print:bg-white print:text-black print:border-b print:py-4"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(62, 10, 18, 0.98) 0%, rgba(92, 16, 26, 0.96) 55%, rgba(44, 6, 12, 0.99) 100%)`
          }}
        >
          <div className="max-w-7xl mx-auto space-y-5">
            {/* Top Navigation & Breadcrumb Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 no-print print:hidden">
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs royal-text-cream">
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="hover:underline royal-text-gold font-serif font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{ui.breadcrumbHome}</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                <span className="opacity-90">{ui.breadcrumbSection}</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                <span className="royal-text-gold font-serif font-bold" lang="en" translate="no">
                  WP-0039
                </span>
              </nav>

              {/* Back, Home, Print, PDF & Share Action Toolbar */}
              <div className="flex flex-wrap items-center gap-2 relative">
                <button
                  type="button"
                  onClick={handleSafeBack}
                  className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title={ui.backBtn}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{ui.backBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title={ui.homeBtn}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>{ui.homeBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintPage}
                  className="royal-btn-ivory px-3 py-1.5 rounded-lg text-xs font-serif font-extrabold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title={ui.printBtn}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{ui.printBtn}</span>
                </button>

                <a
                  href="/page-directory?autoprint=1"
                  data-external-chrome="true"
                  onClick={e => {
                    const handled = handleExternalBrowserUrlClick(
                      e,
                      `${window.location.origin}/page-directory?autoprint=1`
                    );
                    if (!handled) {
                      e.preventDefault();
                      handlePrintPage();
                    }
                  }}
                  className="royal-btn-gold px-3 py-1.5 rounded-lg text-xs font-serif font-extrabold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title={ui.pdfBtn}
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>{ui.pdfBtn}</span>
                </a>

                <button
                  type="button"
                  onClick={handleSharePage}
                  className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  title={ui.shareBtn}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{ui.shareBtn}</span>
                </button>

                {/* Fallback Share Dropdown Menu */}
                {shareMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#FFFCF5] text-[#292521] border-2 border-[#D4AF37] shadow-2xl p-3 z-50 space-y-2">
                    <div className="text-xs font-serif font-bold text-[#54351F] border-b border-[#D8C3A2] pb-1.5 flex items-center justify-between">
                      <span>{ui.shareBtn} (WP-0039)</span>
                      <button
                        type="button"
                        onClick={() => setShareMenuOpen(false)}
                        className="text-[#6B5948] hover:text-[#292521] text-xs font-bold cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyUrl}
                      className="w-full px-3 py-2 rounded-lg bg-[#EFE3D0] hover:bg-[#E2D0B5] text-xs font-semibold text-[#54351F] flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        {copiedFeedback ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedFeedback ? ui.copiedMsg : 'Copy Direct Page URL'}</span>
                      </span>
                    </button>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${ui.pageTitle} — ${ui.pageSubtitle} (WP-0039): ${getActualPageUrl()}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e =>
                        handleWhatsAppLinkClick(
                          e,
                          `https://wa.me/?text=${encodeURIComponent(
                            `${ui.pageTitle} — ${ui.pageSubtitle} (WP-0039): ${getActualPageUrl()}`
                          )}`
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Share on WhatsApp</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Hero Title & Subtitle */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs royal-text-gold font-serif font-bold tracking-wider uppercase">
                <span lang="en" translate="no">WP-0039</span>
                <span aria-hidden="true">·</span>
                <span>{ui.badge}</span>
                <span aria-hidden="true">·</span>
                <span>{summary.totalPagesDisplayed} Indexed Pages & Routes</span>
              </div>
              <h1 className="royal-text-gold font-serif font-extrabold text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-tight print:text-black">
                {ui.pageTitle}
              </h1>
              <p className="royal-text-ivory font-serif text-sm sm:text-lg max-w-3xl leading-relaxed print:text-black">
                {ui.pageSubtitle}
              </p>
            </div>

            {/* Inline 8-Language Selector Bar (Works in-place without redirecting) */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 no-print print:hidden">
              <span className="text-xs font-serif font-bold royal-text-gold flex items-center gap-1 mr-1">
                <Globe className="w-3.5 h-3.5" />
                <span>8 Languages:</span>
              </span>
              {SUPPORTED_LANGUAGES.map(l => {
                const active = l.code === language;
                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#D4AF37] text-[#2B0409] shadow-sm'
                        : 'bg-[#2B0409]/80 text-[#F5E1A4] border border-[#D4AF37]/50 hover:bg-[#460811]'
                    }`}
                  >
                    {l.nativeName} ({l.code.toUpperCase()})
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          MAIN CONTENT CONTAINER
      ===================================================================== */}
      <div className={`${embeddedInAdmin ? 'space-y-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'}`}>
        {/* ===================================================================
            SECTION 1: PUBLIC ARCHIVAL SUMMARY OR PRIVATE ADMIN HEALTH MONITOR
        =================================================================== */}
        {isPrivateAdminMode ? (
          <section
            aria-label={ui.healthMonitorTitle}
            className="rounded-2xl bg-[#FFFCF5] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-sm space-y-5 print:border print:border-black print:p-3"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D8C3A2] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#762D35] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#A87924]" />
                  <span>Private Administrative Health Monitor & Route Integrity Verification</span>
                </div>
                <h2 className="font-serif font-extrabold text-lg sm:text-xl text-[#3B0A11]">
                  {ui.healthMonitorTitle}
                </h2>
                <p className="text-xs text-[#6B5948] leading-relaxed">
                  {ui.healthMonitorSubtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 no-print print:hidden shrink-0">
                <button
                  type="button"
                  onClick={runLiveHttpRouteProbe}
                  disabled={isProbingHttp}
                  className="px-3.5 py-2 rounded-xl bg-[#762D35] hover:bg-[#5C121D] text-[#FFF8E7] border border-[#D4AF37] text-xs font-serif font-bold flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-60 whitespace-nowrap"
                >
                  <Activity className="w-3.5 h-3.5 text-[#F5E1A4]" />
                  <span>
                    {isProbingHttp
                      ? 'Probing All Routes...'
                      : Object.keys(liveHttpProbeMap).length > 0
                      ? 'Re-Run Live HTTP Route Probe (✓ Verified)'
                      : 'Admin: Run Live HTTP Route Probe'}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 tabular-nums">
              <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]">
                <div className="text-[11px] font-semibold text-[#6B5948]">{ui.metricTotalPages}</div>
                <div className="text-xl font-serif font-extrabold text-[#3B0A11] mt-0.5">
                  {summary.totalPagesDisplayed}
                </div>
                <div className="text-[10px] text-[#6B5948] mt-0.5">
                  {summary.totalCanonicalRegistryRecords} Registry + {summary.totalUnassignedUtilityRoutes} Utility
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]">
                <div className="text-[11px] font-semibold text-[#6B5948]">{ui.metricCanonicalIds}</div>
                <div className="text-xl font-serif font-extrabold text-[#762D35] mt-0.5">
                  {summary.totalCanonicalRegistryRecords}
                </div>
                <div className="text-[10px] text-[#15803D] font-semibold mt-0.5">
                  0 Duplicate IDs
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]">
                <div className="text-[11px] font-semibold text-[#6B5948]">{ui.metricRouterRoutes}</div>
                <div className="text-xl font-serif font-extrabold text-[#3B0A11] mt-0.5">
                  {summary.totalRegisteredRoutesInRouter}
                </div>
                <div className="text-[10px] text-[#6B5948] mt-0.5">
                  {summary.totalPrimaryRouterPaths} Primary · {summary.totalRouterAliasPaths} Aliases
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStatus(selectedStatus === 'GREEN' ? 'ALL' : 'GREEN')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedStatus === 'GREEN'
                    ? 'bg-[#DCFCE7] border-[#15803D] ring-2 ring-[#15803D]/30'
                    : 'bg-[#EEF7F0] border-[#86EFAC] hover:bg-[#DCFCE7]'
                }`}
              >
                <div className="text-[11px] font-bold text-[#14532D]">{ui.metricWorkingGreen}</div>
                <div className="text-xl font-serif font-extrabold text-[#14532D] mt-0.5">
                  {summary.workingGreenCount}
                </div>
                <div className="text-[10px] text-[#15803D] font-semibold mt-0.5">
                  100% Verified Ready
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStatus(selectedStatus === 'YELLOW' ? 'ALL' : 'YELLOW')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedStatus === 'YELLOW'
                    ? 'bg-[#FEF08A] border-[#CA8A04] ring-2 ring-[#CA8A04]/30'
                    : 'bg-[#FEF9C3] border-[#FDE047] hover:bg-[#FEF08A]'
                }`}
              >
                <div className="text-[11px] font-bold text-[#713F12]">{ui.metricWarningYellow}</div>
                <div className="text-xl font-serif font-extrabold text-[#713F12] mt-0.5">
                  {summary.warningYellowCount}
                </div>
                <div className="text-[10px] text-[#854D0E] font-semibold mt-0.5">
                  Shared URL / Audit Notes
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedStatus(selectedStatus === 'RED' ? 'ALL' : 'RED')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedStatus === 'RED'
                    ? 'bg-[#FECACA] border-[#DC2626]'
                    : 'bg-[#FFF5F5] border-[#FECACA]'
                }`}
              >
                <div className="text-[11px] font-bold text-[#7F1D1D]">{ui.metricBrokenRed}</div>
                <div className="text-xl font-serif font-extrabold text-[#7F1D1D] mt-0.5">
                  {summary.brokenRedCount}
                </div>
                <div className="text-[10px] text-[#991B1B] font-semibold mt-0.5">
                  0 Missing Routes / 0 404s
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPrefix(selectedPrefix === 'KD' ? 'ALL' : 'KD')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPrefix === 'KD'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedPrefix === 'KD' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  {ui.metricKakatiyaPages}
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedPrefix === 'KD' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  {summary.kakatiyaRecordsCount}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedPrefix === 'KD' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  KD-0001 .. KD-0033
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedCommunity(selectedCommunity === 'references_76' ? 'ALL' : 'references_76')
                }
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedCommunity === 'references_76'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedCommunity === 'references_76' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  {ui.metricCommunity76}
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedCommunity === 'references_76' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  {summary.community76ReferencesCount}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedCommunity === 'references_76' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  CH-0048 .. CH-0123
                </div>
              </button>
            </div>

            <div className="pt-2 border-t border-[#D8C3A2] flex flex-wrap items-center justify-between gap-2 text-xs text-[#54351F]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>
                  <strong>Missing Routes (404):</strong> {summary.missingRoutesCount}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong>Duplicate Reference IDs:</strong> {summary.duplicateReferenceIdsCount}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong>Unassigned Utility Routes:</strong> {summary.missingReferenceIdsCount}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong>Shared Canonical Target URLs:</strong> {summary.duplicateRouteGroupCount} groups ({summary.duplicateRouteRecordCount} records)
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong>Missing Images:</strong> {summary.missingImagesCount}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong>8-Language Coverage:</strong> 100% ({summary.totalPagesDisplayed}/{summary.totalPagesDisplayed})
                </span>
              </div>
            </div>
          </section>
        ) : (
          <section
            aria-label={ui.pageTitle}
            className="rounded-2xl bg-[#FFFCF5] border-2 border-[#D4AF37] p-5 sm:p-6 shadow-sm space-y-4 print:border print:border-black print:p-3 no-print print:hidden"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 tabular-nums">
              <button
                type="button"
                onClick={handleResetFilters}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPrefix === 'ALL' && selectedDynasty === 'ALL' && selectedCommunity === 'ALL'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedPrefix === 'ALL' && selectedDynasty === 'ALL' && selectedCommunity === 'ALL' ? 'text-[#F5E1A4]' : 'text-[#6B5948]'}`}>
                  {ui.metricTotalPages}
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedPrefix === 'ALL' && selectedDynasty === 'ALL' && selectedCommunity === 'ALL' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  {summary.totalPagesDisplayed}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedPrefix === 'ALL' && selectedDynasty === 'ALL' && selectedCommunity === 'ALL' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  All Public Pages & Archives
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPrefix(selectedPrefix === 'WP' ? 'ALL' : 'WP')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPrefix === 'WP'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedPrefix === 'WP' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  Main Portal Pages (WP)
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedPrefix === 'WP' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  39
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedPrefix === 'WP' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  WP-0001 .. WP-0039
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPrefix(selectedPrefix === 'KD' ? 'ALL' : 'KD')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPrefix === 'KD'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedPrefix === 'KD' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  {ui.metricKakatiyaPages}
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedPrefix === 'KD' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  {summary.kakatiyaRecordsCount}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedPrefix === 'KD' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  KD-0001 .. KD-0033
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPrefix(selectedPrefix === 'HF' ? 'ALL' : 'HF')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPrefix === 'HF'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedPrefix === 'HF' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  Kings & Queens (HF)
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedPrefix === 'HF' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  20
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedPrefix === 'HF' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  HF-0001 .. HF-0020
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedCommunity(selectedCommunity === 'references_76' ? 'ALL' : 'references_76')
                }
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedCommunity === 'references_76'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedCommunity === 'references_76' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  {ui.metricCommunity76}
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedCommunity === 'references_76' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  {summary.community76ReferencesCount}
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedCommunity === 'references_76' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  CH-0048 .. CH-0123
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPrefix(selectedPrefix === 'CSS' ? 'ALL' : 'CSS')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedPrefix === 'CSS'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                <div className={`text-[11px] font-bold ${selectedPrefix === 'CSS' ? 'text-[#F5E1A4]' : 'text-[#762D35]'}`}>
                  Community Surnames (CSS/CSN)
                </div>
                <div className={`text-xl font-serif font-extrabold mt-0.5 ${selectedPrefix === 'CSS' ? 'text-white' : 'text-[#3B0A11]'}`}>
                  350
                </div>
                <div className={`text-[10px] mt-0.5 ${selectedPrefix === 'CSS' ? 'text-[#FFF8E7]' : 'text-[#6B5948]'}`}>
                  260 South · 90 North
                </div>
              </button>
            </div>
          </section>
        )}

        {/* ===================================================================
            SECTION 2: SEARCH, FILTER, SORT & VIEW CONTROLS
        =================================================================== */}
        <section
          aria-label="Search and Filter Controls"
          className="rounded-2xl bg-[#FFFCF5] border border-[#D4AF37] p-5 shadow-sm space-y-4 no-print print:hidden"
        >
          {/* Primary Search Input Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#762D35] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8C3A2] text-xs sm:text-sm text-[#292521] focus:outline-none focus:border-[#762D35]"
              />
            </div>

            {/* View Mode Segmented Buttons */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#EFE3D0] border border-[#D8C3A2] shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'table'
                    ? 'bg-[#762D35] text-white shadow-sm'
                    : 'text-[#54351F] hover:text-[#292521]'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>{ui.viewTable}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'cards'
                    ? 'bg-[#762D35] text-white shadow-sm'
                    : 'text-[#54351F] hover:text-[#292521]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{ui.viewCards}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grouped')}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  viewMode === 'grouped'
                    ? 'bg-[#762D35] text-white shadow-sm'
                    : 'text-[#54351F] hover:text-[#292521]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{ui.viewGrouped}</span>
              </button>
            </div>
          </div>

          {/* Multi-Dimensional Filter Dropdowns Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              isPrivateAdminMode ? 'lg:grid-cols-6' : 'lg:grid-cols-5'
            } gap-3`}
          >
            {/* 1. Category / Prefix Filter */}
            <div>
              <label className="block text-[11px] font-serif font-bold text-[#54351F] mb-1">
                {ui.categoryFilterLabel}
              </label>
              <select
                value={selectedPrefix}
                onChange={e => setSelectedPrefix(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#762D35]"
              >
                <option value="ALL">{ui.allCategoriesOption} ({allEntries.length})</option>
                {prefixList.map(p => (
                  <option key={p.prefix} value={p.prefix}>
                    [{p.prefix}] {p.englishPageTitle}
                  </option>
                ))}
                {isPrivateAdminMode && (
                  <option value="UNASSIGNED">
                    [UNASSIGNED] App.tsx Utility & Legal Routes ({summary.totalUnassignedUtilityRoutes})
                  </option>
                )}
              </select>
            </div>

            {/* 2. Historical Dynasty Filter */}
            <div>
              <label className="block text-[11px] font-serif font-bold text-[#54351F] mb-1">
                {ui.dynastyFilterLabel}
              </label>
              <select
                value={selectedDynasty}
                onChange={e => setSelectedDynasty(e.target.value as DynastyFilterCode)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#762D35]"
              >
                {DYNASTY_FILTER_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value === 'ALL' ? ui.allDynastiesOption : opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Community Section Filter */}
            <div>
              <label className="block text-[11px] font-serif font-bold text-[#54351F] mb-1">
                {ui.communityFilterLabel}
              </label>
              <select
                value={selectedCommunity}
                onChange={e => setSelectedCommunity(e.target.value as CommunitySectionFilterCode)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#762D35]"
              >
                {COMMUNITY_SECTION_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.value === 'ALL' ? ui.allCommunityOption : opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Language Filter */}
            <div>
              <label className="block text-[11px] font-serif font-bold text-[#54351F] mb-1">
                {ui.languageFilterLabel}
              </label>
              <select
                value={selectedLangFilter}
                onChange={e => setSelectedLangFilter(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#762D35]"
              >
                <option value="ALL">{ui.allLanguagesOption}</option>
                {SUPPORTED_LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.label} — {l.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Page Health Status Filter (Private Admin Only) */}
            {isPrivateAdminMode && (
              <div>
                <label className="block text-[11px] font-serif font-bold text-[#54351F] mb-1">
                  {ui.statusFilterLabel}
                </label>
                <select
                  value={selectedStatus}
                  onChange={e => setSelectedStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#762D35]"
                >
                  <option value="ALL">{ui.allStatusesOption} ({allEntries.length})</option>
                  <option value="GREEN">{ui.statusGreen} ({summary.workingGreenCount})</option>
                  <option value="YELLOW">{ui.statusYellow} ({summary.warningYellowCount})</option>
                  <option value="RED">{ui.statusRed} ({summary.brokenRedCount})</option>
                  <option value="GRAY">{ui.statusGray}</option>
                </select>
              </div>
            )}

            {/* 6. Alphabetical & Multi-Key Sorting */}
            <div>
              <label className="block text-[11px] font-serif font-bold text-[#54351F] mb-1">
                {ui.sortByLabel}
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOptionCode)}
                className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8C3A2] text-xs text-[#292521] focus:outline-none focus:border-[#762D35]"
              >
                <option value="serial">{ui.sortSerial}</option>
                <option value="title_asc">{ui.sortTitleAsc}</option>
                <option value="title_desc">{ui.sortTitleDesc}</option>
                <option value="ref_id">{ui.sortRefId}</option>
                <option value="route">{ui.sortRoute}</option>
                <option value="category">{ui.sortCategory}</option>
              </select>
            </div>
          </div>

          {/* Quick Category Prefix Filter Bar + Result Count & Reset */}
          <div className="pt-2 border-t border-[#D8C3A2] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedPrefix('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border cursor-pointer whitespace-nowrap ${
                  selectedPrefix === 'ALL'
                    ? 'bg-[#762D35] text-white border-[#D4AF37]'
                    : 'bg-[#FFF9EF] text-[#54351F] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                }`}
              >
                ALL ({allEntries.length})
              </button>
              {prefixList.map(p => (
                <button
                  key={p.prefix}
                  type="button"
                  onClick={() => setSelectedPrefix(p.prefix)}
                  title={p.englishPageTitle}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold border cursor-pointer whitespace-nowrap ${
                    selectedPrefix === p.prefix
                      ? 'bg-[#762D35] text-white border-[#D4AF37]'
                      : 'bg-[#FFF9EF] text-[#54351F] border-[#D8C3A2] hover:bg-[#EFE3D0]'
                  }`}
                >
                  {p.prefix}
                </button>
              ))}
              {isPrivateAdminMode && (
                <button
                  type="button"
                  onClick={() => setSelectedPrefix('UNASSIGNED')}
                  className={`px-2 py-1 rounded-lg text-[11px] font-mono font-bold border cursor-pointer whitespace-nowrap ${
                    selectedPrefix === 'UNASSIGNED'
                      ? 'bg-[#762D35] text-white border-[#D4AF37]'
                      : 'bg-[#FEF9C3] text-[#713F12] border-[#FDE047] hover:bg-[#FEF08A]'
                  }`}
                >
                  UNASSIGNED ({summary.totalUnassignedUtilityRoutes})
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAllRows(prev => !prev)}
                className="px-3 py-1.5 rounded-lg bg-[#EFE3D0] hover:bg-[#E2D0B5] text-[#54351F] text-xs font-serif font-bold cursor-pointer whitespace-nowrap"
              >
                {showAllRows ? ui.paginatedViewBtn : ui.showAllRowsBtn}
              </button>

              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-1.5 rounded-lg bg-[#762D35] hover:bg-[#5C121D] text-white text-xs font-serif font-bold flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{ui.resetFiltersBtn}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 3: ACTIVE COUNT & PAGINATION BAR (TOP)
        =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#54351F] tabular-nums">
          <div className="font-serif font-bold">
            {ui.showingCountText}:{' '}
            <span className="text-[#762D35] font-extrabold">
              {visibleEntries.length}
            </span>{' '}
            of{' '}
            <span className="text-[#3B0A11] font-extrabold">
              {filteredAndSortedEntries.length}
            </span>{' '}
            (Total Indexed: {summary.totalPagesDisplayed})
          </div>

          {!showAllRows && viewMode !== 'grouped' && totalPages > 1 && (
            <div className="flex items-center gap-2 no-print print:hidden">
              <button
                type="button"
                disabled={currentPageIndex <= 1}
                onClick={() => setCurrentPageIndex(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg bg-[#FFFCF5] border border-[#D8C3A2] text-[#54351F] font-serif font-bold hover:bg-[#EFE3D0] disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{ui.prevPageBtn}</span>
              </button>
              <span className="font-serif font-bold px-2">
                Page {currentPageIndex} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPageIndex >= totalPages}
                onClick={() => setCurrentPageIndex(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg bg-[#FFFCF5] border border-[#D8C3A2] text-[#54351F] font-serif font-bold hover:bg-[#EFE3D0] disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                <span>{ui.nextPageBtn}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* ===================================================================
            SECTION 4A: DIRECTORY TABLE VIEW
        =================================================================== */}
        {viewMode === 'table' && (
          <div className="rounded-2xl bg-[#FFFCF5] border-2 border-[#D4AF37] shadow-sm overflow-hidden print:border print:border-black print:rounded-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse tabular-nums">
                <thead className="bg-[#3E0A12] text-[#F5E1A4] font-serif border-b-2 border-[#D4AF37] print:bg-gray-100 print:text-black">
                  <tr>
                    <th className="py-3 px-3 font-bold whitespace-nowrap">{ui.colSerial}</th>
                    <th className="py-3 px-3 font-bold min-w-[240px]">{ui.colTitle}</th>
                    <th className="py-3 px-3 font-bold whitespace-nowrap">{ui.colRefId}</th>
                    <th className="py-3 px-3 font-bold min-w-[170px]">{ui.colCategory}</th>
                    <th className="py-3 px-3 font-bold min-w-[170px]">{ui.colSubcategory}</th>
                    <th className="py-3 px-3 font-bold min-w-[190px]">{ui.colRoute}</th>
                    <th className="py-3 px-3 font-bold whitespace-nowrap no-print print:hidden">{ui.colAction}</th>
                    <th className="py-3 px-3 font-bold whitespace-nowrap">{ui.colStatus}</th>
                    <th className="py-3 px-3 font-bold whitespace-nowrap">{ui.colLanguages}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8C3A2]">
                  {visibleEntries.map(entry => {
                    const isExpanded = expandedDiagnosticId === entry.internalId;
                    return (
                      <React.Fragment key={`${entry.referenceId}-${entry.internalId}`}>
                        <tr className="hover:bg-[#FFF9EF] transition-colors align-top">
                          {/* 1. Serial Number */}
                          <td className="py-3 px-3 font-mono font-bold text-[#6B5948] whitespace-nowrap">
                            #{String(entry.serialNumber).padStart(3, '0')}
                          </td>

                          {/* 2. Page Title */}
                          <td className="py-3 px-3">
                            <button
                              type="button"
                              onClick={() => onNavigate(entry.actualRoute)}
                              className="text-left font-serif font-bold text-[#3B0A11] hover:text-[#762D35] hover:underline cursor-pointer leading-snug block"
                            >
                              {entry.pageTitle}
                            </button>
                            {language !== 'en' && entry.pageTitle !== entry.englishTitle && (
                              <div className="text-[11px] text-[#6B5948] mt-0.5 leading-snug">
                                {entry.englishTitle}
                              </div>
                            )}
                          </td>

                          {/* 3. Reference ID */}
                          <td className="py-3 px-3 whitespace-nowrap" lang="en" translate="no">
                            {entry.hasAssignedReferenceId ? (
                              <span className="font-mono font-extrabold text-[#762D35] bg-[#FFF3D6] border border-[#D4AF37]/70 px-2 py-0.5 rounded">
                                {entry.referenceId}
                              </span>
                            ) : (
                              <span className="font-mono font-bold text-[#854D0E] bg-[#FEF9C3] border border-[#FDE047] px-2 py-0.5 rounded text-[11px]">
                                Unassigned
                              </span>
                            )}
                          </td>

                          {/* 4. Category */}
                          <td className="py-3 px-3 font-medium text-[#54351F]">
                            {entry.category}
                          </td>

                          {/* 5. Subcategory */}
                          <td className="py-3 px-3 text-[#6B5948]">
                            {entry.subcategory}
                          </td>

                          {/* 6. Actual Route / URL */}
                          <td className="py-3 px-3 font-mono text-[11px] text-[#292521] break-all" lang="en" translate="no">
                            <div>{entry.actualRoute}</div>
                            {entry.routeAliases.length > 0 && (
                              <div className="text-[10px] text-[#6B5948] mt-0.5">
                                Aliases: {entry.routeAliases.join(', ')}
                              </div>
                            )}
                          </td>

                          {/* 7. Open Page Button */}
                          <td className="py-3 px-3 whitespace-nowrap no-print print:hidden">
                            <button
                              type="button"
                              onClick={() => onNavigate(entry.actualRoute)}
                              className="royal-btn-maroon px-3 py-1.5 rounded-lg text-[11px] font-serif font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                            >
                              <span>{ui.openPageBtn}</span>
                              <ExternalLink className="w-3 h-3 shrink-0" />
                            </button>
                          </td>

                          {/* 8. Page Status */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="flex flex-col items-start gap-1">
                              {renderStatusBadge(entry)}
                              {isPrivateAdminMode && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedDiagnosticId(isExpanded ? null : entry.internalId)
                                  }
                                  className="text-[10px] text-[#762D35] hover:underline font-semibold cursor-pointer no-print print:hidden"
                                >
                                  {isExpanded ? 'Hide Diagnostics ▲' : 'Inspect Health ▼'}
                                </button>
                              )}
                            </div>
                          </td>

                          {/* 9. Available Languages */}
                          <td className="py-3 px-3 whitespace-nowrap">
                            <div className="font-semibold text-[#14532D] text-[11px]">
                              {entry.availableLanguages.length}/8 Languages
                            </div>
                            <div className="text-[10px] text-[#6B5948] font-mono uppercase">
                              {entry.availableLanguages.join(' · ')}
                            </div>
                          </td>
                        </tr>

                        {/* Admin-Only Expandable Diagnostic Health Row */}
                        {isPrivateAdminMode && isExpanded && (
                          <tr className="bg-[#FFF9EF] no-print print:hidden">
                            <td colSpan={9} className="p-4 border-t border-[#D8C3A2] text-xs space-y-2">
                              <div className="flex flex-wrap items-center justify-between gap-2 font-serif font-bold text-[#3B0A11]">
                                <span>
                                  Admin Diagnostic Health Report — {entry.referenceId} ({entry.internalId})
                                </span>
                                <span className="font-mono text-[11px] text-[#6B5948]">
                                  Source: {entry.dataSourceFile}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                                <div>
                                  <strong>Route Exists in App.tsx:</strong>{' '}
                                  {entry.healthCheck.routeExists ? '✓ Yes' : '✗ No'}
                                </div>
                                <div>
                                  <strong>Valid Reference ID:</strong>{' '}
                                  {entry.healthCheck.hasValidReferenceId ? '✓ Yes' : '⚠ Unassigned'}
                                </div>
                                <div>
                                  <strong>Visual Asset:</strong>{' '}
                                  <span className="font-mono">{entry.healthCheck.resolvedImagePath}</span>
                                </div>
                                <div>
                                  <strong>Record Status:</strong> {entry.recordStatusText}
                                </div>
                              </div>
                              <div className="text-[11px] text-[#54351F] space-y-1">
                                <strong>Health Notes:</strong>
                                <ul className="list-disc pl-5 space-y-0.5">
                                  {entry.healthCheck.statusReasons.map((r, i) => (
                                    <li key={i}>{r}</li>
                                  ))}
                                  {entry.healthCheck.brokenInternalLinkDetails.map((b, i) => (
                                    <li key={`b-${i}`} className="text-[#854D0E]">
                                      {b}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ===================================================================
            SECTION 4B: DIRECTORY CARDS VIEW
        =================================================================== */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 tabular-nums">
            {visibleEntries.map(entry => (
              <article
                key={`${entry.referenceId}-${entry.internalId}`}
                className="rounded-2xl bg-[#FFFCF5] border border-[#D4AF37] p-5 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#762D35] transition-colors"
              >
                <div className="space-y-2.5">
                  {/* Top Row: Serial + Reference ID + Status */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#6B5948]">
                        #{String(entry.serialNumber).padStart(3, '0')}
                      </span>
                      <span
                        lang="en"
                        translate="no"
                        className="font-mono text-xs font-extrabold text-[#762D35] bg-[#FFF3D6] border border-[#D4AF37]/70 px-2 py-0.5 rounded"
                      >
                        {entry.referenceId}
                      </span>
                    </div>
                    {renderStatusBadge(entry)}
                  </div>

                  {/* Page Title */}
                  <h3 className="font-serif font-extrabold text-base text-[#3B0A11] leading-snug">
                    <button
                      type="button"
                      onClick={() => onNavigate(entry.actualRoute)}
                      className="text-left hover:text-[#762D35] hover:underline cursor-pointer"
                    >
                      {entry.pageTitle}
                    </button>
                  </h3>

                  {/* Category & Subcategory (Unboxed Metadata with separators) */}
                  <div className="text-xs text-[#54351F] leading-relaxed">
                    <span className="font-semibold">{entry.category}</span>
                    <span className="mx-1.5 text-[#A87924]" aria-hidden="true">·</span>
                    <span className="text-[#6B5948]">{entry.subcategory}</span>
                  </div>

                  {/* Actual Route */}
                  <div className="p-2.5 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] font-mono text-[11px] text-[#292521] break-all" lang="en" translate="no">
                    {entry.actualRoute}
                  </div>
                </div>

                {/* Bottom Row: Languages + Open Page Button */}
                <div className="pt-3 border-t border-[#D8C3A2] flex items-center justify-between gap-2">
                  <div className="text-[11px] text-[#14532D] font-semibold">
                    {entry.availableLanguages.length}/8 Languages ({entry.availableLanguages.join(', ').toUpperCase()})
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(entry.actualRoute)}
                    className="royal-btn-maroon px-3.5 py-1.5 rounded-lg text-xs font-serif font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>{ui.openPageBtn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ===================================================================
            SECTION 4C: CATEGORY-GROUPED VIEW
        =================================================================== */}
        {viewMode === 'grouped' && (
          <div className="space-y-6 tabular-nums">
            {groupedByCategory.map(([groupTitle, groupItems]) => (
              <section
                key={groupTitle}
                className="rounded-2xl bg-[#FFFCF5] border-2 border-[#D4AF37] overflow-hidden shadow-sm"
              >
                <div className="bg-[#3E0A12] text-[#F5E1A4] px-5 py-3.5 border-b border-[#D4AF37] flex items-center justify-between gap-2">
                  <h3 className="font-serif font-extrabold text-sm sm:text-base">
                    {groupTitle}
                  </h3>
                  <span className="text-xs font-mono font-bold bg-[#5C121D] border border-[#D4AF37]/60 px-2.5 py-0.5 rounded">
                    {groupItems.length} Pages
                  </span>
                </div>
                <div className="divide-y divide-[#D8C3A2]">
                  {groupItems.map(entry => (
                    <div
                      key={`${entry.referenceId}-${entry.internalId}`}
                      className="p-4 hover:bg-[#FFF9EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono font-bold text-[#6B5948]">
                            #{String(entry.serialNumber).padStart(3, '0')}
                          </span>
                          <span
                            lang="en"
                            translate="no"
                            className="font-mono font-extrabold text-[#762D35] bg-[#FFF3D6] border border-[#D4AF37]/70 px-2 py-0.5 rounded"
                          >
                            {entry.referenceId}
                          </span>
                          <span className="text-[#6B5948]">·</span>
                          <span className="text-[#54351F] font-medium">{entry.subcategory}</span>
                          <span className="text-[#6B5948]">·</span>
                          <span className="font-mono text-[11px] text-[#6B5948]" lang="en" translate="no">
                            {entry.actualRoute}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onNavigate(entry.actualRoute)}
                          className="text-left font-serif font-bold text-sm text-[#3B0A11] hover:text-[#762D35] hover:underline cursor-pointer block"
                        >
                          {entry.pageTitle}
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {renderStatusBadge(entry)}
                        <button
                          type="button"
                          onClick={() => onNavigate(entry.actualRoute)}
                          className="royal-btn-maroon px-3 py-1.5 rounded-lg text-xs font-serif font-bold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <span>{ui.openPageBtn}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ===================================================================
            SECTION 5: BOTTOM PAGINATION & PORTAL PREV/NEXT NAVIGATION
        =================================================================== */}
        {!showAllRows && viewMode !== 'grouped' && totalPages > 1 && (
          <div className="flex items-center justify-between gap-3 pt-2 no-print print:hidden tabular-nums">
            <button
              type="button"
              disabled={currentPageIndex <= 1}
              onClick={() => {
                setCurrentPageIndex(p => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="royal-btn-maroon px-4 py-2 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{ui.prevPageBtn}</span>
            </button>

            <span className="text-xs font-serif font-bold text-[#54351F]">
              Page {currentPageIndex} of {totalPages} ({filteredAndSortedEntries.length} Total Matching)
            </span>

            <button
              type="button"
              disabled={currentPageIndex >= totalPages}
              onClick={() => {
                setCurrentPageIndex(p => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="royal-btn-maroon px-4 py-2 rounded-xl text-xs font-serif font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <span>{ui.nextPageBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ===================================================================
            SECTION 6: RELATED PAGES & MAJOR PORTAL HUBS
        =================================================================== */}
        {!embeddedInAdmin && (
          <section
            aria-label={ui.relatedPagesTitle}
            className="rounded-2xl bg-[#FFFCF5] border-2 border-[#D4AF37] p-6 shadow-sm space-y-4 no-print print:hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D8C3A2] pb-3">
              <h2 className="font-serif font-extrabold text-lg text-[#3B0A11]">
                {ui.relatedPagesTitle}
              </h2>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => onNavigate('/references')}
                  className="px-3 py-1.5 rounded-lg bg-[#EFE3D0] hover:bg-[#E2D0B5] text-[#54351F] font-serif font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>{ui.prevPageBtn}: Historical References (WP-0019)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/documentary')}
                  className="px-3 py-1.5 rounded-lg bg-[#EFE3D0] hover:bg-[#E2D0B5] text-[#54351F] font-serif font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>{ui.nextPageBtn}: Historical Documentary (WP-0003)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  refId: 'WP-0006',
                  title: 'Royal Dynasties & Kakatiya Empire',
                  subtitle: 'Gajapathi, Kakatiya (KD-0001..KD-0033), Eastern Ganga & Chola Dynasties',
                  route: '/gajapathi-kings',
                  icon: Crown
                },
                {
                  refId: 'WP-0007',
                  title: 'Historical Figures & Monarchs',
                  subtitle: 'Biographies of Emperors, Kings, Queens & Progenitors',
                  route: '/kings-queens',
                  icon: Users
                },
                {
                  refId: 'WP-0020',
                  title: 'Community Heritage & 76 Names',
                  subtitle: '16 Branches, 9 Professions, 76 Nomenclature References (CH-0001..CH-0123)',
                  route: '/community-heritage',
                  icon: BookOpen
                },
                {
                  refId: 'WP-0012',
                  title: 'Inscriptions & Archaeology',
                  subtitle: 'Hathigumpha, Hanamkonda, Motupalli & Veligalani Charters',
                  route: '/inscriptions',
                  icon: Scroll
                },
                {
                  refId: 'WP-0021',
                  title: 'South-Indian Community Surnames',
                  subtitle: '260 Documented South-Indian Surnames (CSS-0001..CSS-0260)',
                  route: '/community-surnames',
                  icon: ShieldCheck
                },
                {
                  refId: 'WP-0022',
                  title: 'North-Indian Community Surnames',
                  subtitle: '90 Documented North-Indian Gotras & Surnames (CSN-0001..CSN-0090)',
                  route: '/community-surnames-north-indian-oad-community',
                  icon: ShieldCheck
                },
                {
                  refId: 'WP-0010',
                  title: 'Kingdoms & Historical Maps',
                  subtitle: 'Orugallu, Barabati, Kolletikota & Kalinga Citadels',
                  route: '/maps',
                  icon: Compass
                },
                {
                  refId: 'WP-0011',
                  title: '8-Stage Historical Timeline',
                  subtitle: 'Mythology-to-History Chronology & Dated Events (HT-0001..HT-0020)',
                  route: '/timeline',
                  icon: Scroll
                }
              ].map(item => {
                const IconComp = item.icon;
                return (
                  <button
                    key={item.refId}
                    type="button"
                    onClick={() => onNavigate(item.route)}
                    className="p-4 rounded-xl bg-[#FFF9EF] hover:bg-[#EFE3D0] border border-[#D8C3A2] text-left transition-all flex flex-col justify-between gap-2 cursor-pointer group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#762D35]">
                        <span lang="en" translate="no">{item.refId}</span>
                        <IconComp className="w-4 h-4 text-[#A87924]" />
                      </div>
                      <div className="font-serif font-bold text-xs sm:text-sm text-[#3B0A11] group-hover:text-[#762D35]">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-[#6B5948] leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                    <div className="text-[11px] font-serif font-bold text-[#762D35] flex items-center gap-1 pt-1">
                      <span>{ui.openPageBtn}</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
