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
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Globe,
  Flame,
  Droplets,
  Landmark,
  X,
  Compass,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft,
  Home,
  Printer,
  Download,
  Share2,
  Copy,
  Check,
  Link2,
  Clock,
  Award,
  AlertCircle
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { WhatsAppIcon, PublisherCreditCard } from '../components/PublisherCreditCard';
import { useLanguage } from '../context/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../i18n/translations';
import {
  downloadArticleAsPdf,
  triggerArticlePrintWithTitle,
  generateArticlePdfFilename,
  PDF_EXPORT_UI_LABELS
} from '../utils/pdfExport';
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
import {
  MASTER_70_REFERENCE_REGISTRY,
  REFERENCE_70_UI_LABELS,
  CLASSIFICATION_ORDER,
  ReferenceTermClassification,
  Reference70Entry,
  matchReference70Terms,
  getRelated70TermsForHeritageItem
} from '../data/communityReference70Registry';

const hasAppInventorBridge = (): boolean => {
  if (typeof window === 'undefined') return false;
  const win = window as unknown as {
    AppInventor?: {
      setWebViewString?: (val: string) => void;
    };
  };
  return Boolean(win.AppInventor && typeof win.AppInventor.setWebViewString === 'function');
};

const isAndroidWebViewEnvironment = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  if (hasAppInventorBridge()) return true;
  const ua = navigator.userAgent || '';
  return /;\s*wv\)|Version\/\d+\.\d+\s+Chrome\/\d+.*Mobile|AppInventor/i.test(ua);
};

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
  const [ref70ClassFilter, setRef70ClassFilter] = useState<ReferenceTermClassification | 'all'>('all');

  // Article Detail View Print, Share, and Scroll-Restoration States
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [isActionsMenuOpen, setIsActionsMenuOpen] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<'none' | 'link' | 'title_link'>('none');
  const [isPrintFallbackOpen, setIsPrintFallbackOpen] = useState(false);
  const [printUrlCopied, setPrintUrlCopied] = useState(false);
  const [hasInternalArticleHistory, setHasInternalArticleHistory] = useState(false);

  const savedListingScrollYRef = React.useRef<number>(0);
  const shouldRestoreScrollRef = React.useRef<boolean>(false);
  const shareFeedbackTimerRef = React.useRef<number | null>(null);
  const printFallbackTimerRef = React.useRef<number | null>(null);
  const autoPrintTriggeredRef = React.useRef<string | null>(null);

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

  const HERITAGE_PHRASE_TRANSLATIONS: Record<string, Record<LanguageCode, string>> = {
    'Odisha': { en: 'Odisha', hi: 'ओडिशा', te: 'ఒడిశా', kn: 'ಒಡಿಶಾ', ta: 'ஒடிசா', mr: 'ओडिशा', or: 'ଓଡ଼ିଶା', bn: 'ওড়িশা' },
    'Andhra Pradesh': { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश', te: 'ఆంధ్రప్రదేశ్', kn: 'ಆಂಧ್ರಪ್ರದೇಶ', ta: 'ஆந்திரப் பிரதேசம்', mr: 'आंध्र प्रदेश', or: 'ଆନ୍ଧ୍ରପ୍ରଦେଶ', bn: 'অন্ধ্রপ্রদেশ' },
    'Telangana': { en: 'Telangana', hi: 'तेलंगाना', te: 'తెలంగాణ', kn: 'ತೆಲಂಗಾಣ', ta: 'தெலுங்கானா', mr: 'तेलंगणा', or: 'ତେଲେଙ୍ଗାନା', bn: 'তেলেঙ্গানা' },
    'Karnataka': { en: 'Karnataka', hi: 'कर्नाटक', te: 'కర్ణాటక', kn: 'ಕರ್ನಾಟಕ', ta: 'கர்நாடகா', mr: 'कर्नाटक', or: 'କର୍ଣ୍ଣାଟକ', bn: 'কর্ণাটক' },
    'Tamil Nadu': { en: 'Tamil Nadu', hi: 'तमिलनाडु', te: 'తమిళనాడు', kn: 'ತಮಿಳುನಾಡು', ta: 'தமிழ்நாடு', mr: 'तामिळनाडू', or: 'ତାମିଲନାଡୁ', bn: 'তামিলনাড়ু' },
    'Maharashtra': { en: 'Maharashtra', hi: 'महाराष्ट्र', te: 'మహారాష్ట్ర', kn: 'ಮಹಾರಾಷ್ಟ್ರ', ta: 'மகாராஷ்டிரா', mr: 'महाराष्ट्र', or: 'ମହାରାଷ୍ଟ୍ର', bn: 'মহারাষ্ট্র' },
    'Gujarat': { en: 'Gujarat', hi: 'गुजरात', te: 'గుజరాత్', kn: 'ಗುಜರಾತ್', ta: 'குஜராத்', mr: 'गुजरात', or: 'ଗୁଜରାଟ', bn: 'গুজরাট' },
    'Rajasthan': { en: 'Rajasthan', hi: 'राजस्थान', te: 'రాజస్థాన్', kn: 'ರಾಜಸ್ಥಾನ', ta: 'ராஜஸ்தான்', mr: 'राजस्थान', or: 'ରାଜସ୍ଥାନ', bn: 'রাজস্থান' },
    'Punjab': { en: 'Punjab', hi: 'पंजाब', te: 'పంజాబ్', kn: 'ಪಂಜಾಬ್', ta: 'பஞ்சாப்', mr: 'पंजाब', or: 'ପଞ୍ଜାବ', bn: 'পাঞ্জাব' },
    'Haryana': { en: 'Haryana', hi: 'हरियाणा', te: 'హర్యానా', kn: 'ಹರಿಯಾಣ', ta: 'ஹரியானா', mr: 'हरियाणा', or: 'ହରିୟାଣା', bn: 'হরিয়ানা' },
    'Delhi NCR': { en: 'Delhi NCR', hi: 'दिल्ली एनसीआर', te: 'ఢిల్లీ ఎన్.సి.ఆర్', kn: 'ದೆಹಲಿ ಎನ್‌ಸಿಆರ್', ta: 'டெல்லி என்.சி.ஆர்', mr: 'दिल्ली एनसीआर', or: 'ଦିଲ୍ଲୀ ଏନ୍.ସି.ଆର୍', bn: 'দিল্লি এনসিআর' },
    'Sindh (Historical)': { en: 'Sindh (Historical)', hi: 'सिंध (ऐतिहासिक)', te: 'సింధ్ (చారిత్రక)', kn: 'ಸಿಂಧ್ (ಐತಿಹಾಸಿಕ)', ta: 'சிந்து (வரலாற்று)', mr: 'सिंध (ऐतिहासिक)', or: 'ସିନ୍ଧୁ (ଐତିହାସିକ)', bn: 'সিন্ধু (ঐতিহাসিক)' },
    'Western Uttar Pradesh': { en: 'Western Uttar Pradesh', hi: 'पश्चिमी उत्तर प्रदेश', te: 'పశ్చిమ ఉత్తర ప్రదేశ్', kn: 'ಪಶ್ಚಿಮ ಉತ್ತರ ಪ್ರದೇಶ', ta: 'மேற்கு உத்தரப் பிரதேசம்', mr: 'पश्चिम उत्तर प्रदेश', or: 'ପଶ୍ଚିମ ଉତ୍ତର ପ୍ରଦେଶ', bn: 'পশ্চিম উত্তরপ্রদেশ' },
    'Madhya Pradesh': { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', te: 'మధ్యప్రదేశ్', kn: 'ಮಧ್ಯಪ್ರದೇಶ', ta: 'மத்தியப் பிரதேசம்', mr: 'मध्य प्रदेश', or: 'ମଧ୍ୟପ୍ରଦେଶ', bn: 'মধ্যপ্রদেশ' },
    'West Bengal': { en: 'West Bengal', hi: 'पश्चिम बंगाल', te: 'పశ్చిమ బెంగాల్', kn: 'ಪಶ್ಚಿಮ ಬಂಗಾಳ', ta: 'மேற்கு வங்காளம்', mr: 'पश्चिम बंगाल', or: 'ପଶ୍ଚିମବଙ୍ଗ', bn: 'পশ্চিমবঙ্গ' },
    'Jharkhand': { en: 'Jharkhand', hi: 'झारखंड', te: 'జార్ఖండ్', kn: 'ಜಾರ್ಖಂಡ್', ta: 'ஜார்க்கண்ட்', mr: 'झारखंड', or: 'ଝାଡ଼ଖଣ୍ଡ', bn: 'ঝাড়খণ্ড' },
    'Kerala': { en: 'Kerala', hi: 'केरल', te: 'కేరళ', kn: 'ಕೇರಳ', ta: 'கேரளா', mr: 'केरळ', or: 'କେରଳ', bn: 'কেরালা' },
    'Goa': { en: 'Goa', hi: 'गोवा', te: 'గోవా', kn: 'ಗೋವಾ', ta: 'கோவா', mr: 'गोवा', or: 'ଗୋଆ', bn: 'গোয়া' },
    'Puducherry': { en: 'Puducherry', hi: 'पुदुच्चेरी', te: 'పుదుచ్చేరి', kn: 'ಪುದುಚೇರಿ', ta: 'புதுச்சேரி', mr: 'पुदुच्चेरी', or: 'ପୁଦୁଚେରୀ', bn: 'পুদুচেরি' },
    'Eastern Karnataka': { en: 'Eastern Karnataka', hi: 'पूर्वी कर्नाटक', te: 'తూర్పు కర్ణాటక', kn: 'ಪೂರ್ವ ಕರ್ನಾಟಕ', ta: 'கிழக்கு கர்நாடகா', mr: 'पूर्व कर्नाटक', or: 'ପୂର୍ବ କର୍ଣ୍ଣାଟକ', bn: 'পূর্ব কর্ণাটক' },
    'Southern Andhra': { en: 'Southern Andhra', hi: 'दक्षिणी आंध्र', te: 'దక్షిణ ఆంధ్ర', kn: 'ದಕ್ಷಿಣ ಆಂಧ್ರ', ta: 'தெற்கு ஆந்திரா', mr: 'दक्षिण आंध्र', or: 'ଦକ୍ଷିଣ ଆନ୍ଧ୍ର', bn: 'দক্ষিণ অন্ধ্র' },
    'Northern Andhra borders': { en: 'Northern Andhra borders', hi: 'उत्तरी आंध्र सीमांत', te: 'ఉత్తరాంధ్ర సరిహద్దులు', kn: 'ಉತ್ತರ ಆಂಧ್ರ ಗಡಿಗಳು', ta: 'வடக்கு ஆந்திர எல்லைகள்', mr: 'उत्तर आंध्र सीमा', or: 'ଉତ୍ତର ଆନ୍ଧ୍ର ସୀମାନ୍ତ', bn: 'উত্তর অন্ধ্র সীমান্ত' },
    'Karnataka borderlands': { en: 'Karnataka borderlands', hi: 'कर्नाटक सीमांत क्षेत्र', te: 'కర్ణాటక సరిహద్దు ప్రాంతాలు', kn: 'ಕರ್ನಾಟಕ ಗಡಿ ಪ್ರದೇಶಗಳು', ta: 'கர்நாடக எல்லைப் பகுதிகள்', mr: 'कर्नाटक सीमावर्ती भाग', or: 'କର୍ଣ୍ଣାଟକ ସୀମାନ୍ତ ଅଞ୍ଚଳ', bn: 'কর্ণাটক সীমান্ত অঞ্চল' },
    'All Indian States (Pan-Indian)': { en: 'All Indian States (Pan-Indian)', hi: 'सभी भारतीय राज्य (अखिल भारतीय)', te: 'అన్ని భారతీయ రాష్ట్రాలు (పాన్-ఇండియన్)', kn: 'ಎಲ್ಲಾ ಭಾರತೀಯ ರಾಜ್ಯಗಳು (ಪ್ಯಾನ್-ಇಂಡಿಯನ್)', ta: 'அனைத்து இந்திய மாநிலங்கள் (பான்-இந்தியன்)', mr: 'सर्व भारतीय राज्ये (अखिल भारतीय)', or: 'ସମସ୍ତ ଭାରତୀୟ ରାଜ୍ୟ (ସର୍ବଭାରତୀୟ)', bn: 'সকল ভারতীয় রাজ্য (সর্বভারতীয়)' },
    'All Indian States & Trans-Indus Diaspora': { en: 'All Indian States & Trans-Indus Diaspora', hi: 'सभी भारतीय राज्य एवं सिंधु-पार प्रवासी क्षेत्र', te: 'అన్ని భారతీయ రాష్ట్రాలు & సింధు-ఆవల విస్తరణ', kn: 'ಎಲ್ಲಾ ಭಾರತೀಯ ರಾಜ್ಯಗಳು ಮತ್ತು ಸಿಂಧೂ-ಆಚೆಗಿನ ವಲಸೆ', ta: 'அனைத்து இந்திய மாநிலங்கள் & சிந்து-கடந்த புலம்பெயர் பகுதிகள்', mr: 'सर्व भारतीय राज्ये आणि सिंधू-पार विस्तार', or: 'ସମସ୍ତ ଭାରତୀୟ ରାଜ୍ୟ ଓ ସିନ୍ଧୁ-ପାର ପ୍ରବାସ', bn: 'সকল ভারতীয় রাজ্য ও সিন্ধু-পার প্রবাস' },
    'Epigraphic Record': { en: 'Epigraphic Record', hi: 'शिलालेखीय अभिलेख', te: 'శాసన ఆధారం', kn: 'ಶಾಸನ ದಾಖಲೆ', ta: 'கல்வெட்டு ஆவணம்', mr: 'शिलालेखीय नोंद', or: 'ଶିଳାଲେଖ ଦସ୍ତାବିଜ', bn: 'শিলালিপি নথি' },
    'Colonial Gazetteer / Census': { en: 'Colonial Gazetteer / Census', hi: 'औपनिवेशिक गजेटियर / जनगणना', te: 'కలోనియల్ గెజిటీర్ / జనాభా లెక్కలు', kn: 'ವಸಾಹತುಶಾಹಿ ಗೆಜೆಟಿಯರ್ / ಜನಗಣತಿ', ta: 'காலனித்துவ கெசட்டியர் / மக்கள்தொகை கணக்கெடுப்பு', mr: 'वसाहतकालीन गॅझेटियर / जनगणना', or: 'ଔପନିବେଶିକ ଗେଜେଟିୟର / ଜନଗଣନା', bn: 'ঔপনিবেশিক গেজেটিয়ার / আদমশুমারি' },
    'Archaeological & Regional Gazetteer Record': { en: 'Archaeological & Regional Gazetteer Record', hi: 'पुरातत्त्वीय एवं क्षेत्रीय गजेटियर अभिलेख', te: 'పురావస్తు & ప్రాంతీయ గెజిటీర్ ఆధారం', kn: 'ಪುರಾತತ್ವ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಗೆಜೆಟಿಯರ್ ದಾಖಲೆ', ta: 'தொல்லியல் & பிராந்திய கெசட்டியர் ஆவணம்', mr: 'पुरातत्त्वीय व प्रादेशिक गॅझेटियर नोंद', or: 'ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଓ ଆଞ୍ଚଳିକ ଗେଜେଟିୟର ଦସ୍ତାବିଜ', bn: 'প্রত্নতাত্ত্বিক ও আঞ্চলিক গেজেটিয়ার নথি' },
    'Archival Visual & Monument Record': { en: 'Archival Visual & Monument Record', hi: 'अभिलेखीय दृश्य एवं स्मारक प्रमाण', te: 'పురాతన చిత్ర & స్మారక ఆధారం', kn: 'ಪತ್ರಾಗಾರ ದೃಶ್ಯ ಮತ್ತು ಸ್ಮಾರಕ ದಾಖಲೆ', ta: 'ஆவணக் காட்சி & நினைவுச்சின்னப் பதிவு', mr: 'अभिलेखीय दृश्य व स्मारक नोंद', or: 'ଅଭିଲେଖୀୟ ଦୃଶ୍ୟ ଓ ସ୍ମାରକୀ ଦସ୍ତାବିଜ', bn: 'আর্কাইভাল দৃশ্য ও স্মৃতিস্তম্ভ নথি' },
    'Archival & Epigraphic Dossier': { en: 'Archival & Epigraphic Dossier', hi: 'अभिलेखीय एवं शिलालेखीय डोजियर', te: 'పురాతన & శాసన పరిశోధన పత్రం', kn: 'ಪತ್ರಾಗಾರ ಮತ್ತು ಶಾಸನ ದಾಖಲೆ ಸಂಗ್ರಹ', ta: 'ஆவண & கல்வெட்டுத் தொகுப்பு', mr: 'अभिलेखीय व शिलालेखीय संचिका', or: 'ଅଭିଲେଖ ଓ ଶିଳାଲେଖ ଦସ୍ତାବିଜ', bn: 'আর্কাইভাল ও শিলালিপি ডসিয়ার' },
    'Classical Sanskrit / Epic Text': { en: 'Classical Sanskrit / Epic Text', hi: 'शास्त्रीय संस्कृत / महाकाव्य ग्रंथ', te: 'శాస్త్రీయ సంస్కృత / ఇతిహాస గ్రంథం', kn: 'ಶಾಸ್ತ್ರೀಯ ಸಂಸ್ಕೃತ / ಮಹಾಕಾವ್ಯ ಗ್ರಂಥ', ta: 'செவ்வியல் சமஸ்கிருத / இதிகாச நூல்', mr: 'अभिजात संस्कृत / महाकाव्य ग्रंथ', or: 'ଶାସ୍ତ୍ରୀୟ ସଂସ୍କୃତ / ମହାକାବ୍ୟ ଗ୍ରନ୍ଥ', bn: 'ধ্রুপদী সংস্কৃত / মহাকাব্য গ্রন্থ' },
    'Historical Monograph': { en: 'Historical Monograph', hi: 'ऐतिहासिक शोध-प्रबंध (मोनोग्राफ)', te: 'చారిత్రక పరిశోధనా గ్రంథం (మోనోగ్రాఫ్)', kn: 'ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಗ್ರಂಥ (ಮೊನೊಗ್ರಾಫ್)', ta: 'வரலாற்று ஆய்வு நூல்', mr: 'ऐतिहासिक शोधग्रंथ (मोनोग्राफ)', or: 'ଐତିହାସିକ ଗବେଷଣା ଗ୍ରନ୍ଥ', bn: 'ঐতিহাসিক গবেষণা গ্রন্থ (মনোগ্রাফ)' },
    'Regional Historical Chronicle': { en: 'Regional Historical Chronicle', hi: 'क्षेत्रीय ऐतिहासिक इतिवृत्त', te: 'ప్రాంతీయ చారిత్రక వృత్తాంతం', kn: 'ಪ್ರಾದೇಶಿಕ ಐತಿಹಾಸಿಕ ವೃತ್ತಾಂತ', ta: 'பிராந்திய வரலாற்று ஆவணம்', mr: 'प्रादेशिक ऐतिहासिक बखर / इतिवृत्त', or: 'ଆଞ୍ଚଳିକ ଐତିହାସିକ ଇତିବୃତ୍ତ', bn: 'আঞ্চলিক ঐতিহাসিক ইতিবৃত্ত' },
    'Vachana Sahitya / Literary & Epigraphic Record': { en: 'Vachana Sahitya / Literary & Epigraphic Record', hi: 'वचन साहित्य / साहित्यिक एवं शिलालेखीय प्रमाण', te: 'వచన సాహిత్యం / సాహిత్య & శాసన ఆధారం', kn: 'ವಚನ ಸಾಹಿತ್ಯ / ಸಾಹಿತ್ಯಿಕ ಮತ್ತು ಶಾಸನ ದಾಖಲೆ', ta: 'வசன இலக்கியம் / இலக்கிய & கல்வெட்டு ஆவணம்', mr: 'वचन साहित्य / साहित्यिक व शिलालेखीय नोंद', or: 'ବଚନ ସାହିତ୍ୟ / ସାହିତ୍ୟିକ ଓ ଶିଳାଲେଖ ଦସ୍ତାବିଜ', bn: 'বচন সাহিত্য / সাহিত্যিক ও শিলালিপি নথি' },
    'Folkloric & Architectural Chronicle': { en: 'Folkloric & Architectural Chronicle', hi: 'लोक-ऐतिहासिक एवं स्थापत्य इतिवृत्त', te: 'జానపద-చారిత్రక & వాస్తుశిల్ప వృత్తాంతం', kn: 'ಜಾನಪದ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ವೃತ್ತಾಂತ', ta: 'நாட்டுப்புற & கட்டிடக்கலை வரலாற்று ஆவணம்', mr: 'लोक-ऐतिहासिक व स्थापत्य इतिवृत्त', or: 'ଲୋକ-ଐତିହାସିକ ଓ ସ୍ଥାପତ୍ୟ ଇତିବୃତ୍ତ', bn: 'লোক-ঐতিহাসিক ও স্থাপত্য ইতিবৃত্ত' }
  };

  const localizeHeritagePhrase = (text: string): string => {
    if (!text || language === 'en') return text;
    const trimmed = text.trim();
    if (HERITAGE_PHRASE_TRANSLATIONS[trimmed]?.[language]) {
      return HERITAGE_PHRASE_TRANSLATIONS[trimmed][language];
    }
    if (KEYWORD_TRANSLATIONS[trimmed]?.[language]) {
      return KEYWORD_TRANSLATIONS[trimmed][language];
    }
    let result = text;
    for (const [engKey, langMap] of Object.entries(HERITAGE_PHRASE_TRANSLATIONS)) {
      if (result.includes(engKey) && langMap[language]) {
        result = result.split(engKey).join(langMap[language]);
      }
    }
    return result;
  };

  const localizeHeritageList = (items: string[]): string[] =>
    items.map(item => localizeHeritagePhrase(item));

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
    'Od-Rajputh': 'comm_dir_02_od_rajputh',
    'OD-Community': 'comm_dir_01_od',
    'Od': 'comm_dir_01_od',
    'Oad Patel (Artisan Title)': 'syn_oad_rajputh',
    'Waddar': 'syn_waddar_vaddar',
    'Wadar': 'syn_waddar_vaddar',
    'Vaddar': 'comm_dir_15_voddar',
    'Voddar': 'comm_dir_15_voddar',
    'Woddar': 'comm_dir_15_voddar',
    'Vadar': 'syn_waddar_vaddar',
    'Od-Kshatriya': 'syn_od_kshatriya',
    'Odra-Kshatriya': 'comm_dir_03_odra_kshatriya',
    'Odra-Kshtriya': 'comm_dir_03_odra_kshatriya',
    'Odisha-Kshatriya': 'syn_odisha_kshatriya',
    'Odde': 'syn_odde_vadde',
    'Vadde': 'syn_odde_vadde',
    'vadde': 'syn_odde_vadde',
    'Vaddera': 'comm_dir_10_vaddera',
    'Vaddelu': 'comm_dir_11_vaddeelu',
    'Vaddeelu': 'comm_dir_11_vaddeelu',
    'Vaddi': 'comm_dir_09_vaddi',
    'Vaddi Rajulu': 'comm_dir_12_vaddirajulu',
    'VaddiRajulu': 'comm_dir_12_vaddirajulu',
    'Vaddera Rajulu': 'comm_dir_13_vadderarajulu',
    'VadderaRajulu': 'comm_dir_13_vadderarajulu',
    'OddeRajulu': 'syn_odderajulu',
    'OddeRazulu': 'syn_odderajulu',
    'VaddeRajulu': 'comm_dir_13_vadderarajulu',
    'Vadiyarajulu': 'comm_dir_12_vaddirajulu',
    'Odiyaraju': 'syn_odiyaraju_karnataka',
    'Odiyarajulu': 'syn_odiyaraju_karnataka',
    'Oddar': 'syn_oddar',
    'Odar': 'syn_oddar',
    'Oddaru': 'comm_dir_16_oddaru',
    'Oddaru / Odra communities': 'comm_dir_16_oddaru',
    'Odan': 'comm_dir_08_odan',
    'Ottar': 'syn_ottar',
    'OddaNayakkar': 'syn_odda_nayakkar_tn',
    'OttaNayakkar': 'syn_odda_nayakkar_tn',
    'BoyaNayakkar': 'syn_odda_nayakkar_tn',
    'Boyar': 'syn_ottar',
    'Pawar': 'comm_dir_02_od_rajputh',
    'Bhoi': 'comm_dir_07_od_paika',
    'Bhoyudu': 'comm_dir_10_vaddera',
    'Bhoyilu': 'comm_dir_10_vaddera',
    'Boyidu': 'comm_dir_10_vaddera',
    'Boyilu': 'comm_dir_10_vaddera',
    'Pedda-Bhoyudu': 'comm_dir_10_vaddera',
    'Oddarasa': 'syn_odiyaraju_karnataka',
    'OddeDora': 'syn_odderajulu',
    'VaddeDoralu': 'comm_dir_13_vadderarajulu',
    'Kshatriya Kings': 'prof_cat_8_royal_dynasties',
    'Oddan-Arasa': 'syn_odda_nayakkar_tn',
    'Ottan-Arasa': 'syn_ottar',
    'Kallu Oddar': 'prof_cat_3_construction_hydraulic',
    'Mannu Oddar': 'prof_cat_3_construction_hydraulic',
    'Bandi Oddar': 'prof_cat_3_construction_hydraulic',
    'Girini Oddar': 'prof_cat_6_lokashilpi',
    'Uppu Oddar': 'prof_cat_9_other_professions',
    'Shilpi Oddar': 'prof_cat_4_shilpi',
    'Odra': 'comm_dir_03_odra_kshatriya',
    'Kalinga': 'comm_dir_04_kalingarajulu',
    'Utkala': 'comm_dir_03_odra_kshatriya',
    'Trikalinga': 'comm_dir_04_kalingarajulu',
    'Gajapathis': 'comm_dir_14_gajapathulu',
    'Gajapathulu': 'comm_dir_14_gajapathulu',
    'Gajapathi RauthRai': 'comm_dir_14_gajapathulu',
    'paikas': 'comm_dir_07_od_paika',
    'Od-Paika': 'comm_dir_07_od_paika',
    'Od-Khandayaths': 'comm_dir_05_od_khandayath',
    'Od-Khandayath': 'comm_dir_05_od_khandayath',
    'Oda-Chasa': 'comm_dir_06_oda_chassa',
    'Oda-Chassa': 'comm_dir_06_oda_chassa',
    'Suryavamshi Odiyaraju': 'syn_suryavamshi',
    'Suryavamshi communities': 'syn_suryavamshi',
    'Sagara Vamshi traditions': 'syn_sagaravamshi',
    'Bhagiratha Vamshi traditions': 'syn_sagaravamshi',
    'Raghu Vamshi traditions': 'syn_raghuvamshi'
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
    const ref70Matches = matchReference70Terms(trimmed);
    if (ref70Matches.length > 0 && ref70Matches[0].relatedHeritageIds.length > 0) {
      return ref70Matches[0].relatedHeritageIds[0];
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

  const recordScrollBeforeOpen = () => {
    if (typeof window === 'undefined') return;
    if (!selectedModalRef && !selectedFigure) {
      savedListingScrollYRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    }
    setHasInternalArticleHistory(true);
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  const openSynonymModal = (item: CommunitySynonym) => {
    recordScrollBeforeOpen();
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'synonym', id: item.id });
    syncUrlParams('synonyms', item.id);
  };

  const openCommunityDirModal = (item: CommunityDirectoryEntry) => {
    recordScrollBeforeOpen();
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'community_dir', id: item.id });
    syncUrlParams('synonyms', item.id);
  };

  const openProfessionModal = (cat: ProfessionalHeritageCategoryArticle) => {
    recordScrollBeforeOpen();
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'profession_cat', id: cat.id });
    syncUrlParams('professions', cat.id);
  };

  const openFigureModal = (fig: HistoricalFigureSummary) => {
    recordScrollBeforeOpen();
    setSelectedModalRef(null);
    setSelectedFigure(fig);
    syncUrlParams('figures', fig.id);
  };

  const openRegionModal = (reg: GeographicalSpreadRegion) => {
    recordScrollBeforeOpen();
    setSelectedRegionId(reg.id);
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'region', id: reg.id });
    syncUrlParams('geography', reg.id, reg.id);
  };

  const openMonographModal = (secId: string) => {
    recordScrollBeforeOpen();
    setSelectedFigure(null);
    setSelectedModalRef({ type: 'monograph', id: secId });
    syncUrlParams('history', secId);
  };

  const closeActiveArticle = React.useCallback(() => {
    shouldRestoreScrollRef.current = hasInternalArticleHistory;
    setSelectedFigure(null);
    setSelectedModalRef(null);
    syncUrlParams(activeTab, null);
  }, [hasInternalArticleHistory, activeTab, syncUrlParams]);

  const handleBackFromArticle = () => {
    if (hasInternalArticleHistory && typeof window !== 'undefined' && window.history.length > 1) {
      try {
        shouldRestoreScrollRef.current = true;
        window.history.back();
        return;
      } catch {
        // Fallback to closing article if history API is restricted in embedded WebView
      }
    }
    closeActiveArticle();
  };

  useEffect(() => {
    if (!selectedModalRef && !selectedFigure && shouldRestoreScrollRef.current && typeof window !== 'undefined') {
      const targetScrollY = savedListingScrollYRef.current;
      shouldRestoreScrollRef.current = false;
      const rafId = window.requestAnimationFrame(() => {
        try {
          window.scrollTo({ top: targetScrollY, left: 0, behavior: 'auto' });
        } catch {
          window.scrollTo(0, targetScrollY);
        }
      });
      return () => window.cancelAnimationFrame(rafId);
    }
  }, [selectedModalRef, selectedFigure]);

  const handleNavigateRelatedId = (targetId: string) => {
    recordScrollBeforeOpen();
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

  const resolveRelatedCardPreview = (
    targetId: string
  ): {
    id: string;
    title: string;
    categoryBadge: string;
    eraOrRegion: string;
    summary: string;
    imageUrl: string;
  } | null => {
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const vis = STEP4_VISUAL_ASSET_REGISTRY[targetId];
    const commItem = COMMUNITY_DIRECTORY_ITEMS.find(c => c.id === targetId);
    if (commItem) {
      const detailed = COMMUNITY_HERITAGE_DETAILED_ARTICLES.find(a => a.id === commItem.id);
      return {
        id: commItem.id,
        title: `#${commItem.orderNumber} ${commItem.localizedName[language] || commItem.canonicalName}`,
        categoryBadge: commItem.localizedCategoryGroup[language] || commItem.localizedCategoryGroup.en,
        eraOrRegion: commItem.geographicalSpread[language] || commItem.geographicalSpread.en,
        summary: commItem.overview[language] || commItem.overview.en,
        imageUrl: vis?.imageUrl || detailed?.imageUrl || fallbackArchiveImg
      };
    }
    const profItem = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.id === targetId);
    if (profItem) {
      const primaryVis = profItem.visualAssets && profItem.visualAssets.length > 0 ? profItem.visualAssets[0] : undefined;
      return {
        id: profItem.id,
        title: profItem.title[language] || profItem.title.en,
        categoryBadge: `${step5Ui.catPrefix}${profItem.categoryNumber}`,
        eraOrRegion: `${profItem.includedSubClassifications.length} ${step2Labels.subcategoriesLabel}`,
        summary: profItem.shortSummary[language] || profItem.shortSummary.en,
        imageUrl: primaryVis?.imageUrl || `${base}kondavidu_fort_hills.jpg`
      };
    }
    const synItem = COMMUNITY_SYNONYMS.find(s => s.id === targetId);
    if (synItem) {
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[synItem.id];
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
      return {
        id: synItem.id,
        title: mono ? mono.localizedTitle[language] || mono.localizedTitle.en : synItem.title,
        categoryBadge: step5Ui.synonymCategories[synItem.category] || synItem.category,
        eraOrRegion: localizeHeritagePhrase(translateText(synItem.geographical_association)),
        summary: synItem.historical_role[language] || synItem.historical_role.en,
        imageUrl: vis?.imageUrl || synImgMap[synItem.id] || fallbackArchiveImg
      };
    }
    const regItem = GEOGRAPHICAL_SPREAD.find(r => r.id === targetId);
    if (regItem) {
      const regImgMap: Record<string, string> = {
        geo_rajasthan_sindh_punjab: `${base}oad_hydraulic_stepwell.jpg`,
        geo_gujarat: `${base}jasma_devi_sahasralinga.jpg`,
        geo_maharashtra: `${base}shivayogi_siddharama_solapur.jpg`,
        geo_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
        geo_andhra_telangana: `${base}kondavidu_fort_hills.jpg`,
        geo_tamil_nadu: `${base}srirangam_temple.jpg`,
        geo_odisha: `${base}barabati_fort_gateway.jpg`
      };
      return {
        id: regItem.id,
        title: regItem.localized_region[language] || regItem.region_name,
        categoryBadge: step5Ui.geographyTab.spotlightPanelBadge,
        eraOrRegion: localizeHeritageList(regItem.states_and_territories).join(' • '),
        summary: regItem.regional_overview[language] || regItem.regional_overview.en,
        imageUrl: vis?.imageUrl || regImgMap[regItem.id] || fallbackArchiveImg
      };
    }
    const monoItem = HISTORICAL_MONOGRAPH_SECTIONS.find(m => m.id === targetId);
    if (monoItem) {
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[monoItem.id];
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
      return {
        id: monoItem.id,
        title: mono ? mono.localizedTitle[language] || mono.localizedTitle.en : monoItem.section_title[language] || monoItem.section_title.en,
        categoryBadge: step5Ui.monographTab.badge,
        eraOrRegion: step5Ui.monographTab.heading,
        summary: mono ? mono.executiveSummaryAndScope[language] || mono.executiveSummaryAndScope.en : monoItem.content[language] || monoItem.content.en,
        imageUrl: vis?.imageUrl || monoImgMap[monoItem.id] || fallbackArchiveImg
      };
    }
    const figItem = HISTORICAL_FIGURES.find(f => f.id === targetId);
    if (figItem) {
      return {
        id: figItem.id,
        title: figItem.localized_name[language] || figItem.canonical_name,
        categoryBadge: step5Ui.figuresTab.epigraphicStatus[figItem.epigraphic_status] || figItem.epigraphic_status,
        eraOrRegion: localizeHeritagePhrase(translateText(figItem.reign_or_dates)),
        summary: figItem.summary[language] || figItem.summary.en,
        imageUrl: figItem.image_url || fallbackArchiveImg
      };
    }
    return null;
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

  // Canonical URL, Print, and Share Helpers for Community-Heritage Articles
  const activeArticleId = selectedFigure ? selectedFigure.id : selectedModalRef ? selectedModalRef.id : null;

  useEffect(() => {
    setShareFeedback('none');
    setIsShareMenuOpen(false);
    setIsActionsMenuOpen(false);
    setIsPrintFallbackOpen(false);
    setPrintUrlCopied(false);
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-article-reading', activeArticleId ? 'true' : 'false');
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.setAttribute('data-article-reading', 'false');
      }
      if (shareFeedbackTimerRef.current !== null && typeof window !== 'undefined') {
        window.clearTimeout(shareFeedbackTimerRef.current);
      }
      if (printFallbackTimerRef.current !== null && typeof window !== 'undefined') {
        window.clearTimeout(printFallbackTimerRef.current);
      }
    };
  }, [activeArticleId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const langParam = params.get('lang') as LanguageCode | null;
      if (
        langParam &&
        ['en', 'hi', 'te', 'kn', 'ta', 'mr', 'or', 'bn'].includes(langParam) &&
        langParam !== language
      ) {
        setLanguage(langParam);
      }
      const autoPrint = params.get('autoprint');
      const targetId = params.get('id') || params.get('figure') || params.get('article') || activeArticleId;
      if (autoPrint === '1' && targetId) {
        if (isAndroidWebViewEnvironment()) {
          setIsPrintFallbackOpen(true);
        } else if (autoPrintTriggeredRef.current !== `${targetId}-${langParam || language}`) {
          autoPrintTriggeredRef.current = `${targetId}-${langParam || language}`;
          const timer = window.setTimeout(() => {
            try {
              const cleanParams = new URLSearchParams(window.location.search);
              cleanParams.delete('autoprint');
              const newQuery = cleanParams.toString();
              const cleanUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}${window.location.hash || ''}`;
              window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
            } catch {
              // Ignore history replaceState errors
            }
            if (typeof window.print === 'function') {
              window.print();
            }
          }, 550);
          return () => window.clearTimeout(timer);
        }
      }
    } catch {
      // Ignore malformed query string
    }
  }, [activeArticleId, language, setLanguage]);

  const getCanonicalHeritageUrl = (itemId: string): string => {
    const fallbackHttpsOrigin = 'https://historical-web.web.app';
    if (typeof window === 'undefined') {
      return `${fallbackHttpsOrigin}/community-heritage?tab=${encodeURIComponent(activeTab)}&id=${encodeURIComponent(itemId)}`;
    }
    const rawOrigin = window.location.origin || '';
    const isLocalDev = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(rawOrigin);
    let safeOrigin = fallbackHttpsOrigin;
    if (rawOrigin.startsWith('https://') || isLocalDev) {
      safeOrigin = rawOrigin;
    } else if (rawOrigin.startsWith('http://')) {
      safeOrigin = rawOrigin.replace(/^http:\/\//i, 'https://');
    }
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
    return `${safeOrigin}${basePath}/community-heritage?tab=${encodeURIComponent(activeTab)}&id=${encodeURIComponent(itemId)}`;
  };

  const getExternalPrintHeritageUrl = (itemId: string, langCode: LanguageCode = language): string => {
    const baseCanonical = getCanonicalHeritageUrl(itemId);
    return `${baseCanonical}&lang=${encodeURIComponent(langCode)}&autoprint=1`;
  };

  const copyTextToClipboard = async (textToCopy: string): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } catch {
        // Fall through to textarea copy fallback
      }
    }
    if (typeof document !== 'undefined') {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        const copied = document.execCommand('copy');
        document.body.removeChild(textArea);
        return copied;
      } catch {
        return false;
      }
    }
    return false;
  };

  const showTemporaryShareFeedback = (type: 'link' | 'title_link') => {
    setShareFeedback(type);
    if (shareFeedbackTimerRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(shareFeedbackTimerRef.current);
    }
    if (typeof window !== 'undefined') {
      shareFeedbackTimerRef.current = window.setTimeout(() => {
        setShareFeedback('none');
      }, 3500);
    }
  };

  const sendArticleUrlToAppInventor = (articleUrl: string): boolean => {
    if (typeof window === 'undefined') return false;
    const trimmedUrl = (articleUrl || '').trim();
    if (!trimmedUrl || !/^https?:\/\/.+\/community-heritage\?/i.test(trimmedUrl)) {
      return false;
    }
    if (!hasAppInventorBridge()) {
      return false;
    }
    try {
      const win = window as unknown as {
        AppInventor: {
          setWebViewString: (val: string) => void;
        };
      };
      win.AppInventor.setWebViewString(trimmedUrl);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopyPrintHeritageUrl = async (itemId: string) => {
    const externalUrl = getExternalPrintHeritageUrl(itemId, language);
    await copyTextToClipboard(externalUrl);
    setPrintUrlCopied(true);
    if (printFallbackTimerRef.current !== null && typeof window !== 'undefined') {
      window.clearTimeout(printFallbackTimerRef.current);
    }
    if (typeof window !== 'undefined') {
      printFallbackTimerRef.current = window.setTimeout(() => {
        setPrintUrlCopied(false);
      }, 3500);
    }
  };

  const handleExternalBrowserLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    articleUrl: string
  ) => {
    const sentViaBridge = sendArticleUrlToAppInventor(articleUrl);
    if (sentViaBridge) {
      e.preventDefault();
    }
  };

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadResult, setPdfDownloadResult] = useState<{
    filename: string;
    downloadUrl?: string;
  } | null>(null);
  const pdfUi = PDF_EXPORT_UI_LABELS[language] || PDF_EXPORT_UI_LABELS.en;

  const handleDownloadHeritagePdf = async (articleTitle: string) => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setPdfDownloadResult(null);
    try {
      const result = await downloadArticleAsPdf({
        articleTitle,
        language
      });
      setPdfDownloadResult({
        filename: result.filename,
        downloadUrl: result.downloadUrl
      });
    } catch (err) {
      console.error('Heritage PDF export failed:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrintHeritageArticle = (articleTitle?: string) => {
    setIsShareMenuOpen(false);
    if (!activeArticleId) return;

    const inAndroidWebView = isAndroidWebViewEnvironment();
    const canCallWindowPrint = typeof window !== 'undefined' && typeof window.print === 'function';

    if (inAndroidWebView || !canCallWindowPrint) {
      setIsPrintFallbackOpen(true);
      return;
    }

    let printDialogStarted = false;
    const onBeforePrintOrBlur = () => {
      printDialogStarted = true;
    };

    window.addEventListener('beforeprint', onBeforePrintOrBlur, { once: true });
    window.addEventListener('blur', onBeforePrintOrBlur, { once: true });

    try {
      triggerArticlePrintWithTitle(articleTitle || 'Community_Heritage_Article');
    } catch {
      setIsPrintFallbackOpen(true);
    }

    if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent || '')) {
      window.setTimeout(() => {
        window.removeEventListener('beforeprint', onBeforePrintOrBlur);
        window.removeEventListener('blur', onBeforePrintOrBlur);
        if (!printDialogStarted) {
          setIsPrintFallbackOpen(true);
        }
      }, 500);
    } else {
      window.removeEventListener('beforeprint', onBeforePrintOrBlur);
      window.removeEventListener('blur', onBeforePrintOrBlur);
    }
  };

  const handleCopyHeritageLink = async (itemId: string) => {
    const canonicalUrl = getCanonicalHeritageUrl(itemId);
    await copyTextToClipboard(canonicalUrl);
    showTemporaryShareFeedback('link');
  };

  const handleCopyHeritageTitleAndLink = async (itemId: string, articleTitle: string) => {
    const canonicalUrl = getCanonicalHeritageUrl(itemId);
    const combined = `${articleTitle} — ${canonicalUrl}`;
    await copyTextToClipboard(combined);
    showTemporaryShareFeedback('title_link');
  };

  const handleShareHeritageArticle = async (itemId: string, articleTitle: string, articleSummary: string) => {
    const canonicalUrl = getCanonicalHeritageUrl(itemId);
    setIsShareMenuOpen(prev => !prev);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: articleTitle,
          text: `${articleTitle} — ${articleSummary}`,
          url: canonicalUrl
        });
      } catch {
        // User cancelled native share sheet or browser restricted share in iframe
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
        subtitle: `${localizeSynonymGroup(item.designation_group)} • ${localizeHeritagePhrase(translateText(item.geographical_association))}`,
        badge: synonymSectionLabels.epistemicClasses[item.epistemic_classification] || item.epistemic_classification,
        location: localizeHeritagePhrase(translateText(item.geographical_association)),
        imageUrl: vis?.imageUrl || synImgMap[item.id] || `${base}barabati_fort_gateway.jpg`,
        imageCaption: vis ? (vis.caption[language] || vis.caption.en) : undefined,
        imageLayout: 'banner',
        summaryLabel: mono ? monoHeadings.summaryLabel : undefined,
        summary: mono ? mono.executiveSummaryAndScope[language] || mono.executiveSummaryAndScope.en : undefined,
        content: `${item.historical_role[language] || item.historical_role.en}\n\n${synonymSectionLabels.epistemicLabel} ${epistemicText}`,
        metadata: [
          { label: synonymSectionLabels.colCategory, value: localizeSynonymGroup(item.designation_group) },
          { label: synonymSectionLabels.colGeography, value: localizeHeritagePhrase(translateText(item.geographical_association)) },
          { label: synonymSectionLabels.colEpistemic, value: synonymSectionLabels.epistemicClasses[item.epistemic_classification] || item.epistemic_classification },
          { label: step5Ui.synonymModal.linguisticOrigin, value: localizeHeritagePhrase(translateText(item.linguistic_origin)) },
          { label: step5Ui.synonymModal.primaryRegions, value: localizeHeritageList(item.primary_regions).join(', ') },
          { label: step5Ui.synonymModal.prominentStates, value: localizeHeritageList(item.prominent_states).join(', ') }
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
            items: Array.from(new Set(item.sacred_associations)).map(sa => localizeHeritagePhrase(translateText(sa)))
          },
          ...(mono && mono.references.length > 0
            ? [
                {
                  heading: step3Labels.referencesHeading,
                  type: 'list' as const,
                  items: mono.references.map(r => `${r.citation} [${localizeHeritagePhrase(r.type)}]`)
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
            : []),
          ...(() => {
            const rel70 = getRelated70TermsForHeritageItem(item.id);
            const rUi = REFERENCE_70_UI_LABELS[language] || REFERENCE_70_UI_LABELS.en;
            if (rel70.length === 0) return [];
            return [
              {
                heading: `${rUi.sectionTitle} (${rel70.length})`,
                type: 'tags' as const,
                items: rel70.map(
                  r =>
                    `${r.localizedLabel[language] || r.canonicalTerm} [${
                      rUi.classifications[r.classification] || r.classification
                    }] (${r.canonicalTerm})`
                )
              }
            ];
          })()
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
        subtitle: localizeHeritageList(activeReg.states_and_territories).join(' • '),
        badge: step5Ui.geographyTab.spotlightPanelBadge,
        era: step5Ui.geographyTab.migrationEpochs[activeReg.id] || activeReg.migration_epoch_and_corridor,
        location: localizeHeritageList(activeReg.prominent_cities_districts).join(', '),
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
            items: Array.from(new Set(activeReg.historical_forts_and_landmarks)).map(f => localizeHeritagePhrase(translateText(f)))
          },
          {
            heading: step5Ui.geographyTab.sacredCentersLabel,
            type: 'list',
            items: Array.from(new Set(activeReg.sacred_centers)).map(sc => localizeHeritagePhrase(translateText(sc)))
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
                  items: mono.references.map(r => `${r.citation} [${localizeHeritagePhrase(r.type)}]`)
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
          { label: synonymSectionLabels.statesLabel, value: localizeHeritageList(entry.prominentStates).join(', ') }
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
                  items: detailed.references.map(r => `${r.citation} [${localizeHeritagePhrase(r.type)}]`)
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
            : []),
          ...(() => {
            const rel70 = getRelated70TermsForHeritageItem(entry.id);
            const rUi = REFERENCE_70_UI_LABELS[language] || REFERENCE_70_UI_LABELS.en;
            if (rel70.length === 0) return [];
            return [
              {
                heading: `${rUi.sectionTitle} (${rel70.length})`,
                type: 'tags' as const,
                items: rel70.map(
                  r =>
                    `${r.localizedLabel[language] || r.canonicalTerm} [${
                      rUi.classifications[r.classification] || r.classification
                    }] (${r.canonicalTerm})`
                )
              }
            ];
          })()
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
                  items: cat.references.map(r => `${r.citation} [${localizeHeritagePhrase(r.type)}]`)
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
            : []),
          ...(() => {
            const rel70 = getRelated70TermsForHeritageItem(cat.id);
            const rUi = REFERENCE_70_UI_LABELS[language] || REFERENCE_70_UI_LABELS.en;
            if (rel70.length === 0) return [];
            return [
              {
                heading: `${rUi.sectionTitle} (${rel70.length})`,
                type: 'tags' as const,
                items: rel70.map(
                  r =>
                    `${r.localizedLabel[language] || r.canonicalTerm} [${
                      rUi.classifications[r.classification] || r.classification
                    }] (${r.canonicalTerm})`
                )
              }
            ];
          })()
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

  const matched70SearchEntries = React.useMemo(
    () => (searchTerm.trim() ? matchReference70Terms(searchTerm) : []),
    [searchTerm]
  );

  const matched70HeritageIds = React.useMemo(
    () => new Set(matched70SearchEntries.flatMap(entry => entry.relatedHeritageIds)),
    [matched70SearchEntries]
  );

  // Filtered 16-Community Directory Items
  const filteredCommunityDirectory = COMMUNITY_DIRECTORY_ITEMS.filter(item => {
    const term = searchTerm.toLowerCase();
    const locName = (item.localizedName[language] || item.localizedName.en).toLowerCase();
    const locOverview = (item.overview[language] || item.overview.en).toLowerCase();
    const locGeo = (item.geographicalSpread[language] || item.geographicalSpread.en).toLowerCase();

    const matchesSearch =
      !term ||
      matched70HeritageIds.has(item.id) ||
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
      matched70HeritageIds.has(cat.id) ||
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
      !term ||
      matched70HeritageIds.has(s.id) ||
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

  const articleDetailUi = React.useMemo(() => {
    const dict: Record<
      LanguageCode,
      {
        backButton: string;
        homeButton: string;
        printButton: string;
        shareButton: string;
        closeButton: string;
        copyLinkButton: string;
        copyTitleAndLinkButton: string;
        whatsappShareButton: string;
        linkCopiedMessage: string;
        titleAndLinkCopiedMessage: string;
        webViewPrintFallbackNotice: string;
        openInExternalBrowserButton: string;
        copyPrintUrlButton: string;
        printHeaderTitle: string;
        canonicalUrlLabel: string;
        executiveSummaryHeading: string;
        completeHistoricalContentHeading: string;
        subjectAnalysisHeading: string;
        analysisVerifiedCoreTitle: string;
        analysisCulturalContextTitle: string;
        analysisEpistemicScopeTitle: string;
        chronologicalTimelineHeading: string;
        chronologicalTimelineSub: string;
        inscriptionsEvidenceHeading: string;
        inscriptionsEvidenceSub: string;
        sourceReferencesHeading: string;
        sourceReferencesSub: string;
        relatedContextHeading: string;
        relatedArticlesHeading: string;
        relatedArticlesSub: string;
        readFullArticleBtn: string;
        relatedKeywordsHeading: string;
        relatedKeywordsSub: string;
        hashtagsHeading: string;
        hashtagsSub: string;
        previousArticleLabel: string;
        nextArticleLabel: string;
        consultPublisherLabel: string;
        verifiedSourceBadge: string;
        epigraphicEraBadge: string;
        historicalPeriodBadge: string;
        traditionalChronologyBadge: string;
        actionsMenuLabel: string;
        civicWaterLegacyHeading: string;
      }
    > = {
      en: {
        backButton: 'Back',
        homeButton: 'Home',
        printButton: 'Print / PDF',
        shareButton: 'Share',
        closeButton: '✕ Close',
        copyLinkButton: 'Copy Direct Link',
        copyTitleAndLinkButton: 'Copy Title & Link',
        whatsappShareButton: 'Share on WhatsApp',
        linkCopiedMessage: 'Direct Article Link Copied!',
        titleAndLinkCopiedMessage: 'Article Title & Link Copied!',
        webViewPrintFallbackNotice:
          'To print or save this historical article as a PDF from the mobile app, open it in your external browser or copy the print link below:',
        openInExternalBrowserButton: 'Open in External Browser to Print',
        copyPrintUrlButton: 'Copy Print URL',
        printHeaderTitle: 'Suryavamsha Odiyaraju Kshatriya — Community Heritage Archival Dossier',
        canonicalUrlLabel: 'Canonical Archival URL',
        executiveSummaryHeading: 'Executive Historical Summary & Scope',
        completeHistoricalContentHeading: 'Complete Historical Account & Archival Text',
        subjectAnalysisHeading: 'Detailed Subject Analysis & Epistemic Classification',
        analysisVerifiedCoreTitle: '1. Verified Epigraphic, Archaeological & Gazetteer Core',
        analysisCulturalContextTitle: '2. Cultural, Linguistic & Occupational Significance',
        analysisEpistemicScopeTitle: '3. Epistemic Distinction & Non-Conflation Research Note',
        chronologicalTimelineHeading: 'Chronological Timeline & Historical Milestones',
        chronologicalTimelineSub:
          'Key chronological epochs, epigraphic attestations, and historical transitions associated with this heritage dossier.',
        inscriptionsEvidenceHeading: 'Verified Inscriptions, Monuments & Archaeological Evidence',
        inscriptionsEvidenceSub:
          'Documented stone inscriptions, copper-plate charters, hero stones, fortresses, hydraulic works, and sacred monuments.',
        sourceReferencesHeading: 'Historical Source References & Scholarly Citations',
        sourceReferencesSub:
          'Primary epigraphic records, colonial gazetteers, archaeological reports, and scholarly monographs.',
        relatedContextHeading: 'Related Historical Context & 74-Name Master Reference Mapping',
        relatedArticlesHeading: 'Related Heritage Articles',
        relatedArticlesSub: 'Click any related article card below to open its full historical dossier.',
        readFullArticleBtn: 'Read Full Article',
        relatedKeywordsHeading: 'Related Keywords & Research Topics',
        relatedKeywordsSub: 'Select any keyword to search or navigate to connected historical records.',
        hashtagsHeading: 'Relevant Archival Hashtags',
        hashtagsSub: 'Indexed topic hashtags for quick cross-referencing.',
        previousArticleLabel: 'Previous Article in Section',
        nextArticleLabel: 'Next Article in Section',
        consultPublisherLabel: 'Discuss with Dr.G Sathyanarayana Raju (+91 9480112897)',
        verifiedSourceBadge: 'Documented Reference',
        epigraphicEraBadge: 'Verified Epigraphic / Primary Era',
        historicalPeriodBadge: 'Documented Historical Period',
        traditionalChronologyBadge: 'Puranic / Ancestral Tradition',
        actionsMenuLabel: 'Print / Share',
        civicWaterLegacyHeading: 'Civil & Water-Engineering Legacy'
      },
      hi: {
        backButton: 'वापस',
        homeButton: 'मुख्य पृष्ठ',
        printButton: 'प्रिंट / PDF',
        shareButton: 'साझा करें',
        closeButton: '✕ बंद करें',
        copyLinkButton: 'सीधा लिंक कॉपी करें',
        copyTitleAndLinkButton: 'शीर्षक व लिंक कॉपी करें',
        whatsappShareButton: 'WhatsApp पर साझा करें',
        linkCopiedMessage: 'लेख का लिंक कॉपी हो गया!',
        titleAndLinkCopiedMessage: 'शीर्षक और लिंक कॉपी हो गया!',
        webViewPrintFallbackNotice:
          'मोबाइल ऐप से इस ऐतिहासिक लेख को प्रिंट या PDF के रूप में सहेजने के लिए इसे बाहरी ब्राउज़र में खोलें या नीचे दिया गया लिंक कॉपी करें:',
        openInExternalBrowserButton: 'प्रिंट करने के लिए बाहरी ब्राउज़र में खोलें',
        copyPrintUrlButton: 'प्रिंट लिंक कॉपी करें',
        printHeaderTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय — सामुदायिक विरासत अभिलेख',
        canonicalUrlLabel: 'अभिलेखीय लिंक',
        executiveSummaryHeading: 'ऐतिहासिक सारांश एवं विषय-क्षेत्र',
        completeHistoricalContentHeading: 'संपूर्ण ऐतिहासिक विवरण एवं मूल पाठ',
        subjectAnalysisHeading: 'विस्तृत विषय विश्लेषण एवं ऐतिहासिक वर्गीकरण',
        analysisVerifiedCoreTitle: '1. प्रमाणित शिलालेख, पुरातात्विक एवं गजेटियर साक्ष्य',
        analysisCulturalContextTitle: '2. सांस्कृतिक, भाषाई एवं व्यावसायिक महत्व',
        analysisEpistemicScopeTitle: '3. ऐतिहासिक प्रामाणिकता एवं गैर-समीकरण टिप्पणी',
        chronologicalTimelineHeading: 'कालानुक्रमिक समयरेखा एवं प्रमुख ऐतिहासिक पड़ाव',
        chronologicalTimelineSub: 'इस विषय से संबंधित प्रमुख ऐतिहासिक कालखंड, शिलालेख प्रमाण और क्रमिक विकास।',
        inscriptionsEvidenceHeading: 'प्रमाणित शिलालेख, स्मारक एवं पुरातात्विक साक्ष्य',
        inscriptionsEvidenceSub: 'शिलालेख, ताम्रपत्र, वीरगल, दुर्ग, जल-स्थापत्य और पवित्र मंदिर प्रमाण।',
        sourceReferencesHeading: 'ऐतिहासिक स्रोत संदर्भ एवं प्रामाणिक उद्धरण',
        sourceReferencesSub: 'प्राथमिक अभिलेखीय स्रोत, गजेटियर, पुरातत्व रिपोर्ट एवं शोध ग्रंथ।',
        relatedContextHeading: 'संबंधित ऐतिहासिक संदर्भ एवं 74-नाम संदर्भ सूची मानचित्रण',
        relatedArticlesHeading: 'संबंधित विरासत लेख',
        relatedArticlesSub: 'पूर्ण ऐतिहासिक विवरण पढ़ने के लिए किसी भी संबंधित लेख कार्ड पर क्लिक करें।',
        readFullArticleBtn: 'पूरा लेख पढ़ें',
        relatedKeywordsHeading: 'संबंधित मुख्य शब्द (Keywords)',
        relatedKeywordsSub: 'संबंधित ऐतिहासिक अभिलेख खोजने के लिए किसी भी शब्द पर क्लिक करें।',
        hashtagsHeading: 'संबंधित हैशटैग (Hashtags)',
        hashtagsSub: 'त्वरित संदर्भ के लिए अनुक्रमित विषय हैशटैग।',
        previousArticleLabel: 'पिछला लेख',
        nextArticleLabel: 'अगला लेख',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (डॉ. जी. सत्यनारायण राजू) जी से संपर्क करें (+91 9480112897)',
        verifiedSourceBadge: 'प्रमाणित संदर्भ',
        epigraphicEraBadge: 'प्रमाणित अभिलेखीय कालखंड',
        historicalPeriodBadge: 'दस्तावेजी ऐतिहासिक काल',
        traditionalChronologyBadge: 'पौराणिक / वंश परंपरा काल',
        actionsMenuLabel: 'प्रिंट / साझा',
        civicWaterLegacyHeading: 'नागरिक एवं जल-अभियांत्रिकी विरासत'
      },
      te: {
        backButton: 'వెనుకకు',
        homeButton: 'హోమ్',
        printButton: 'ప్రింట్ / PDF',
        shareButton: 'షేర్',
        closeButton: '✕ మూసివేయండి',
        copyLinkButton: 'లింక్ కాపీ చేయండి',
        copyTitleAndLinkButton: 'శీర్షిక & లింక్ కాపీ',
        whatsappShareButton: 'WhatsApp లో షేర్ చేయండి',
        linkCopiedMessage: 'వ్యాస లింక్ కాపీ చేయబడింది!',
        titleAndLinkCopiedMessage: 'శీర్షిక & లింక్ కాపీ చేయబడింది!',
        webViewPrintFallbackNotice:
          'ఈ చారిత్రక వ్యాసాన్ని ప్రింట్ చేయడానికి లేదా PDF గా సేవ్ చేయడానికి బాహ్య బ్రౌజర్‌లో తెరవండి లేదా క్రింది లింక్‌ను కాపీ చేయండి:',
        openInExternalBrowserButton: 'ప్రింట్ కోసం బాహ్య బ్రౌజర్‌లో తెరవండి',
        copyPrintUrlButton: 'ప్రింట్ URL కాపీ చేయండి',
        printHeaderTitle: 'సూర్యవంశ ఒడియరాజు క్షత్రియ — సామాజిక వారసత్వ చారిత్రక పత్రం',
        canonicalUrlLabel: 'చారిత్రక లింక్',
        executiveSummaryHeading: 'చారిత్రక సారాంశం & పరిధి',
        completeHistoricalContentHeading: 'పూర్తి చారిత్రక కథనం & పురాతన పాఠం',
        subjectAnalysisHeading: 'వివరణాత్మక విషయ విశ్లేಷణ & చారిత్రక వర్గీకరణ',
        analysisVerifiedCoreTitle: '1. ధృవీకరించబడిన శాసన, పురావస్తు & గెజిటీర్ ఆధారాలు',
        analysisCulturalContextTitle: '2. సాంస్కృతిక, భాషా & వృత్తిపరమైన ప్రాముఖ్యత',
        analysisEpistemicScopeTitle: '3. చారిత్రక ప్రామాణికత & పరిశోధనా పరిధి గమనిక',
        chronologicalTimelineHeading: 'కాలక్రమానుసార కాలరేఖ & చారిత్రక ఘట్టాలు',
        chronologicalTimelineSub: 'ఈ అంశానికి సంబంధించిన ప్రధాన చారిత్రక యుగాలు, శాసన ఆధారాలు మరియు పరిణామ క్రమం.',
        inscriptionsEvidenceHeading: 'ధృవీకరించబడిన శాసనాలు, కోటలు & పురావస్తు ఆధారాలు',
        inscriptionsEvidenceSub: 'శిలాశాసనాలు, తామ్రశాసనాలు, వీరగల్లులు, కోటలు, జలాశయాలు మరియు పవిత్ర దేవాలయాలు.',
        sourceReferencesHeading: 'చారిత్రక ఆధారాలు & గ్రంథ సూచిక (Citations)',
        sourceReferencesSub: 'ప్రాథమిక శాసన ఆధారాలు, గెజిటీర్లు, పురావస్తు నివేదికలు మరియు పరిశోధనా గ్రంథాలు.',
        relatedContextHeading: 'సంబంధిత చారిత్రక సందర్భం & 74-పేర్ల రిఫరెన్స్ మ్యాపింగ్',
        relatedArticlesHeading: 'సంబంధిత వారసత్వ వ్యాసాలు (Related Articles)',
        relatedArticlesSub: 'పూర్తి వ్యాసాన్ని చదవడానికి క్రింది సంబంధిత కార్డుపై క్లిక్ చేయండి.',
        readFullArticleBtn: 'పూర్తి వ్యాసం చదవండి',
        relatedKeywordsHeading: 'సంబంధిత కీలక పదాలు (Related Keywords)',
        relatedKeywordsSub: 'సంబంధిత చారిత్రక వివరాలను వెతకడానికి ఏదైనా కీలక పదంపై నొక్కండి.',
        hashtagsHeading: 'సంబంధిత హ్యాష్‌ట్యాగ్‌లు (Hashtags)',
        hashtagsSub: 'శీఘ్ర శోధన కోసం చారిత్రక హ్యాష్‌ట్యాగ్‌లు.',
        previousArticleLabel: 'మునుపటి వ్యాసం',
        nextArticleLabel: 'తదుపరి వ్యాసం',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (డా. జి. సత్యనారాయణ రాజు) గారితో చర్చించండి (+91 9480112897)',
        verifiedSourceBadge: 'ధృవీకరించబడిన ఆధారం',
        epigraphicEraBadge: 'శాసన / ప్రాథమిక ఆధార యుగం',
        historicalPeriodBadge: 'చారిత్రక కాలం',
        traditionalChronologyBadge: 'పురాణ / వంశావళి సంప్రదాయం',
        actionsMenuLabel: 'ప్రింట్ / షేర్',
        civicWaterLegacyHeading: 'పౌర & జల-ఇంజనీరింగ్ వారసత్వం'
      },
      kn: {
        backButton: 'ಹಿಂದೆ',
        homeButton: 'ಮುಖಪುಟ',
        printButton: 'ಮುದ್ರಿಸಿ / PDF',
        shareButton: 'ಹಂಚಿಕೊಳ್ಳಿ',
        closeButton: '✕ ಮುಚ್ಚಿ',
        copyLinkButton: 'ನೇರ ಲಿಂಕ್ ನಕಲಿಸಿ',
        copyTitleAndLinkButton: 'ಶೀರ್ಷಿಕೆ ಮತ್ತು ಲಿಂಕ್ ನಕಲಿಸಿ',
        whatsappShareButton: 'WhatsApp ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ',
        linkCopiedMessage: 'ಲೇಖನದ ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
        titleAndLinkCopiedMessage: 'ಶೀರ್ಷಿಕೆ ಮತ್ತು ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
        webViewPrintFallbackNotice:
          'ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ನಿಂದ ಈ ಐತಿಹಾಸಿಕ ಲೇಖನವನ್ನು ಮುದ್ರಿಸಲು ಅಥವಾ PDF ಆಗಿ ಉಳಿಸಲು ಬಾಹ್ಯ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ:',
        openInExternalBrowserButton: 'ಮುದ್ರಿಸಲು ಬಾಹ್ಯ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ',
        copyPrintUrlButton: 'ಪ್ರಿಂಟ್ ಲಿಂಕ್ ನಕಲಿಸಿ',
        printHeaderTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ — ಸಮುದಾಯ ಪರಂಪರೆಯ ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
        canonicalUrlLabel: 'ಐತಿಹಾಸಿಕ ಲಿಂಕ್',
        executiveSummaryHeading: 'ಐತಿಹಾಸಿಕ ಸಾರಾಂಶ ಮತ್ತು ವ್ಯಾಪ್ತಿ',
        completeHistoricalContentHeading: 'ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ವಿವರಣೆ ಮತ್ತು ಮೂಲ ಪಠ್ಯ',
        subjectAnalysisHeading: 'ವಿವರವಾದ ವಿಷಯ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಐತಿಹಾಸಿಕ ವರ್ಗೀಕರಣ',
        analysisVerifiedCoreTitle: '1. ದೃಢೀಕೃತ ಶಾಸನ, ಪುರಾತತ್ವ ಮತ್ತು ಗೆಜೆಟಿಯರ್ ಆಧಾರಗಳು',
        analysisCulturalContextTitle: '2. ಸಾಂಸ್ಕೃತಿಕ, ಭಾಷಿಕ ಮತ್ತು ವೃತ್ತಿಪರ ಮಹತ್ವ',
        analysisEpistemicScopeTitle: '3. ಐತಿಹಾಸಿಕ ನಿಖರತೆ ಮತ್ತು ಸಂಶೋಧನಾ ವ್ಯಾಪ್ತಿ ಸೂಚನೆ',
        chronologicalTimelineHeading: 'ಕಾಲಾನುಕ್ರಮಣಿಕೆ ಮತ್ತು ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಘಟ್ಟಗಳು',
        chronologicalTimelineSub: 'ಈ ವಿಷಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಕಾಲಘಟ್ಟಗಳು ಮತ್ತು ಶಾಸನ ದಾಖಲೆಗಳು.',
        inscriptionsEvidenceHeading: 'ದೃಢೀಕೃತ ಶಾಸನಗಳು, ಸ್ಮಾರಕಗಳು ಮತ್ತು ಪುರಾತತ್ವ ಸಾಕ್ಷ್ಯಗಳು',
        inscriptionsEvidenceSub: 'ಶಿಲಾಶಾಸನಗಳು, ತಾಮ್ರಪಟಗಳು, ವೀರಗಲ್ಲುಗಳು, ಕೋಟೆಗಳು, ಜಲಾಶಯಗಳು ಮತ್ತು ದೇವಾಲಯಗಳು.',
        sourceReferencesHeading: 'ಐತಿಹಾಸಿಕ ಆಕರಗಳು ಮತ್ತು ಉಲ್ಲೇಖಗಳು (Citations)',
        sourceReferencesSub: 'ಪ್ರಾಥಮಿಕ ಶಾಸನ ದಾಖಲೆಗಳು, ಗೆಜೆಟಿಯರ್‌ಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು.',
        relatedContextHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ ಮತ್ತು 74-ಹೆಸರುಗಳ ಉಲ್ಲೇಖ ಪಟ್ಟಿ',
        relatedArticlesHeading: 'ಸಂಬಂಧಿತ ಪರಂಪರೆಯ ಲೇಖನಗಳು',
        relatedArticlesSub: 'ಸಂಪೂರ್ಣ ಲೇಖನವನ್ನು ಓದಲು ಕೆಳಗಿನ ಯಾವುದೇ ಕಾರ್ಡ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
        readFullArticleBtn: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ',
        relatedKeywordsHeading: 'ಸಂಬಂಧಿತ ಮುಖ್ಯ ಪದಗಳು (Keywords)',
        relatedKeywordsSub: 'ಸಂಬಂಧಿತ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಲು ಯಾವುದೇ ಮುಖ್ಯ ಪದವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
        hashtagsHeading: 'ಸಂಬಂಧಿತ ಹ್ಯಾಶ್‌ಟ್ಯಾಗ್‌ಗಳು (Hashtags)',
        hashtagsSub: 'ತ್ವರಿತ ಉಲ್ಲೇಖಕ್ಕಾಗಿ ವಿಷಯ ಹ್ಯಾಶ್‌ಟ್ಯಾಗ್‌ಗಳು.',
        previousArticleLabel: 'ಹಿಂದಿನ ಲೇಖನ',
        nextArticleLabel: 'ಮುಂದಿನ ಲೇಖನ',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (ಡಾ. ಜಿ. ಸತ್ಯನಾರಾಯಣ ರಾಜು) ಅವರೊಂದಿಗೆ ಚರ್ಚಿಸಿ (+91 9480112897)',
        verifiedSourceBadge: 'ದೃಢೀಕೃತ ಆಕರ',
        epigraphicEraBadge: 'ದೃಢೀಕೃತ ಶಾಸನ ಕಾಲಘಟ್ಟ',
        historicalPeriodBadge: 'ಐತಿಹಾಸಿಕ ಕಾಲಘಟ್ಟ',
        traditionalChronologyBadge: 'ಪುರಾಣ / ವಂಶಾವಳಿ ಪರಂಪರೆ',
        actionsMenuLabel: 'ಮುದ್ರಿಸಿ / ಹಂಚಿಕೊಳ್ಳಿ',
        civicWaterLegacyHeading: 'ನಾಗರಿಕ ಮತ್ತು ಜಲ-ಇಂಜಿನಿಯರಿಂಗ್ ಪರಂಪರೆ'
      },
      ta: {
        backButton: 'பின்செல்',
        homeButton: 'முகப்பு',
        printButton: 'அச்சிடு / PDF',
        shareButton: 'பகிர்',
        closeButton: '✕ மூடுக',
        copyLinkButton: 'இணைப்பை நகலெடு',
        copyTitleAndLinkButton: 'தலைப்பு & இணைப்பு நகலெடு',
        whatsappShareButton: 'WhatsApp இல் பகிர்',
        linkCopiedMessage: 'கட்டுரை இணைப்பு நகலெடுக்கப்பட்டது!',
        titleAndLinkCopiedMessage: 'தலைப்பு மற்றும் இணைப்பு நகலெடுக்கப்பட்டது!',
        webViewPrintFallbackNotice:
          'இந்த வரலாற்றுக் கட்டுரையை அச்சிட அல்லது PDF ஆகச் சேமிக்க வெளிப்புற உலாவியில் திறக்கவும்:',
        openInExternalBrowserButton: 'அச்சிட வெளிப்புற உலாவியில் திறக்கவும்',
        copyPrintUrlButton: 'அச்சு இணைப்பை நகலெடு',
        printHeaderTitle: 'சூரியவம்ச ஒடியராஜு க்ஷத்ரிய — சமூக பாரம்பரிய வரலாற்று ஆவணம்',
        canonicalUrlLabel: 'ஆவண இணைப்பு',
        executiveSummaryHeading: 'வரலாற்றுச் சுருக்கம் மற்றும் நோக்கம்',
        completeHistoricalContentHeading: 'முழுமையான வரலாற்று விவரம் மற்றும் ஆவண உரை',
        subjectAnalysisHeading: 'விரிவான பொருள் பகுப்பாய்வு மற்றும் வரலாற்று வகைப்பாடு',
        analysisVerifiedCoreTitle: '1. கல்வெட்டு, தொல்லியல் மற்றும் அரசிதழ் சான்றுகள்',
        analysisCulturalContextTitle: '2. பண்பாட்டு, மொழி மற்றும் தொழில்முறை முக்கியத்துவம்',
        analysisEpistemicScopeTitle: '3. வரலாற்றுத் துல்லியம் மற்றும் ஆய்வுக் குறிப்பு',
        chronologicalTimelineHeading: 'காலவரிசை மற்றும் முக்கிய வரலாற்று நிகழ்வுகள்',
        chronologicalTimelineSub: 'இத்தலைப்புடன் தொடர்புடைய முக்கிய வரலாற்றுக் காலங்கள் மற்றும் கல்வெட்டுச் சான்றுகள்.',
        inscriptionsEvidenceHeading: 'சரிபார்க்கப்பட்ட கல்வெட்டுகள் மற்றும் தொல்லியல் சான்றுகள்',
        inscriptionsEvidenceSub: 'கல்வெட்டுகள், செப்பேடுகள், நடுகற்கள், கோட்டைகள், நீர்நிலைகள் மற்றும் திருக்கோயில்கள்.',
        sourceReferencesHeading: 'வரலாற்று ஆதாரங்கள் மற்றும் மேற்கோள்கள் (Citations)',
        sourceReferencesSub: 'முதன்மைக் கல்வெட்டுப் பதிவுகள், அரசிதழ்கள் மற்றும் ஆய்வு நூல்கள்.',
        relatedContextHeading: 'தொடர்புடைய வரலாற்றுச் சூழல் & 74-பெயர்கள் குறிப்புப் பட்டியல்',
        relatedArticlesHeading: 'தொடர்புடைய பாரம்பரியக் கட்டுரைகள்',
        relatedArticlesSub: 'முழுக் கட்டுரையையும் படிக்க கீழே உள்ள எந்தவொரு அட்டையையும் சொடுக்கவும்.',
        readFullArticleBtn: 'முழுக் கட்டுரையைப் படிக்க',
        relatedKeywordsHeading: 'தொடர்புடைய முக்கியச் சொற்கள் (Keywords)',
        relatedKeywordsSub: 'தொடர்புடைய வரலாற்றுப் பதிவுகளைத் தேட எந்தவொரு சொல்லையும் தேர்ந்தெடுக்கவும்.',
        hashtagsHeading: 'தொடர்புடைய ஹேஷ்டேக்குகள் (Hashtags)',
        hashtagsSub: 'விரைவான தேடலுக்கான தலைப்பு ஹேஷ்டேக்குகள்.',
        previousArticleLabel: 'முந்தைய கட்டுரை',
        nextArticleLabel: 'அடுத்த கட்டுரை',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (டாக்டர் ஜி. சத்யநாராயண ராஜு) அவர்களுடன் உரையாட (+91 9480112897)',
        verifiedSourceBadge: 'சரிபார்க்கப்பட்ட ஆதாரம்',
        epigraphicEraBadge: 'கல்வெட்டு / முதன்மை ஆதார காலம்',
        historicalPeriodBadge: 'ஆவணப்படுத்தப்பட்ட வரலாற்றுக் காலம்',
        traditionalChronologyBadge: 'புராண / வம்சாவளி மரபு',
        actionsMenuLabel: 'அச்சிடு / பகிர்',
        civicWaterLegacyHeading: 'குடிமை மற்றும் நீர்-பொறியியல் மரபு'
      },
      mr: {
        backButton: 'मागे',
        homeButton: 'मुख्यपृष्ठ',
        printButton: 'प्रिंट / PDF',
        shareButton: 'शेअर',
        closeButton: '✕ बंद करा',
        copyLinkButton: 'थेट लिंक कॉपी करा',
        copyTitleAndLinkButton: 'शीर्षक आणि लिंक कॉपी करा',
        whatsappShareButton: 'WhatsApp वर शेअर करा',
        linkCopiedMessage: 'लेखाची लिंक कॉपी झाली!',
        titleAndLinkCopiedMessage: 'शीर्षक आणि लिंक कॉपी झाले!',
        webViewPrintFallbackNotice:
          'मोबाईल अ‍ॅपमधून हा ऐतिहासिक लेख प्रिंट करण्यासाठी किंवा PDF म्हणून सेव्ह करण्यासाठी बाह्य ब्राउझरमध्ये उघडा:',
        openInExternalBrowserButton: 'प्रिंटसाठी बाह्य ब्राउझरमध्ये उघडा',
        copyPrintUrlButton: 'प्रिंट लिंक कॉपी करा',
        printHeaderTitle: 'सूर्यवंश ओडियाराजू क्षत्रिय — सामाजिक वारसा ऐतिहासिक दस्तऐवज',
        canonicalUrlLabel: 'अभिलेख लिंक',
        executiveSummaryHeading: 'ऐतिहासिक सारांश आणि व्याप्ती',
        completeHistoricalContentHeading: 'संपूर्ण ऐतिहासिक वृत्तांत आणि मूळ मजकूर',
        subjectAnalysisHeading: 'सविस्तर विषय विश्लेषण आणि ऐतिहासिक वर्गीकरण',
        analysisVerifiedCoreTitle: '1. प्रमाणित शिलालेख, पुरातत्त्वीय आणि गॅझेटिअर पुरावे',
        analysisCulturalContextTitle: '2. सांस्कृतिक, भाषिक आणि व्यावसायिक महत्त्व',
        analysisEpistemicScopeTitle: '3. ऐतिहासिक अचूकता आणि संशोधन व्याप्ती टीप',
        chronologicalTimelineHeading: 'कालानुक्रमिक कालरेषा आणि ऐतिहासिक टप्पे',
        chronologicalTimelineSub: 'या विषयाशी संबंधित प्रमुख ऐतिहासिक कालखंड, शिलालेख संदर्भ आणि स्थित्यंतरे.',
        inscriptionsEvidenceHeading: 'प्रमाणित शिलालेख, स्मारके आणि पुरातत्त्वीय पुरावे',
        inscriptionsEvidenceSub: 'शिलालेख, ताम्रपट, वीरगळ, किल्ले, जल-स्थापत्य आणि पवित्र मंदिरे.',
        sourceReferencesHeading: 'ऐतिहासिक स्रोत संदर्भ आणि उद्धरणे (Citations)',
        sourceReferencesSub: 'प्राथमिक शिलालेख नोंदी, गॅझेटिअर्स आणि संशोधन ग्रंथ.',
        relatedContextHeading: 'संबंधित ऐतिहासिक संदर्भ आणि 74-नावे संदर्भ सूची',
        relatedArticlesHeading: 'संबंधित वारसा लेख (Related Articles)',
        relatedArticlesSub: 'संपूर्ण लेख वाचण्यासाठी खालील कोणत्याही संबंधित कार्डवर क्लिक करा.',
        readFullArticleBtn: 'संपूर्ण लेख वाचा',
        relatedKeywordsHeading: 'संबंधित मुख्य शब्द (Keywords)',
        relatedKeywordsSub: 'संबंधित ऐतिहासिक नोंदी शोधण्यासाठी कोणत्याही शब्दावर क्लिक करा.',
        hashtagsHeading: 'संबंधित हॅशटॅग (Hashtags)',
        hashtagsSub: 'जलद संदर्भासाठी विषय हॅशटॅग.',
        previousArticleLabel: 'मागील लेख',
        nextArticleLabel: 'पुढील लेख',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (डॉ. जी. सत्यनारायण राजू) यांच्याशी संपर्क साधा (+91 9480112897)',
        verifiedSourceBadge: 'प्रमाणित संदर्भ',
        epigraphicEraBadge: 'प्रमाणित शिलालेख कालखंड',
        historicalPeriodBadge: 'दस्तऐवजी ऐतिहासिक कालखंड',
        traditionalChronologyBadge: 'पौराणिक / वंशावळ परंपरा',
        actionsMenuLabel: 'प्रिंट / शेअर',
        civicWaterLegacyHeading: 'नागरी व जल-अभियांत्रिकी वारसा'
      },
      or: {
        backButton: 'ପଛକୁ',
        homeButton: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
        printButton: 'ପ୍ରିଣ୍ଟ / PDF',
        shareButton: 'ସେୟାର',
        closeButton: '✕ ବନ୍ଦ କରନ୍ତୁ',
        copyLinkButton: 'ସିଧା ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
        copyTitleAndLinkButton: 'ଶୀର୍ଷକ ଓ ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
        whatsappShareButton: 'WhatsApp ରେ ସେୟାର କରନ୍ତୁ',
        linkCopiedMessage: 'ଲେଖାର ଲିଙ୍କ୍ କପି ହୋଇଛି!',
        titleAndLinkCopiedMessage: 'ଶୀର୍ଷକ ଓ ଲିଙ୍କ୍ କପି ହୋଇଛି!',
        webViewPrintFallbackNotice:
          'ମୋବାଇଲ୍ ଆପ୍ ରୁ ଏହି ଐତିହାସିକ ଲେଖାକୁ ପ୍ରିଣ୍ଟ ବା PDF ଭାବେ ସେଭ୍ କରିବା ପାଇଁ ବାହ୍ୟ ବ୍ରାଉଜରରେ ଖୋଲନ୍ତୁ:',
        openInExternalBrowserButton: 'ପ୍ରିଣ୍ଟ ପାଇଁ ବାହ୍ୟ ବ୍ରାଉଜରରେ ଖୋଲନ୍ତୁ',
        copyPrintUrlButton: 'ପ୍ରିଣ୍ଟ ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
        printHeaderTitle: 'ସୂର୍ଯ୍ୟବଂଶ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ — ସାମୁଦାୟିକ ଐତିହ୍ୟ ଦଲିଲ',
        canonicalUrlLabel: 'ଅଭିଲେଖ ଲିଙ୍କ୍',
        executiveSummaryHeading: 'ଐତିହାସିକ ସାରାଂଶ ଓ ପରିସର',
        completeHistoricalContentHeading: 'ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ବିବରଣୀ ଓ ମୂଳ ପାଠ',
        subjectAnalysisHeading: 'ବିସ୍ତୃତ ବିଷୟ ବିଶ୍ଳେଷଣ ଓ ଐତିହାସିକ ବର୍ଗୀକରଣ',
        analysisVerifiedCoreTitle: '1. ପ୍ରମାଣିତ ଶିଳାଲେଖ, ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଓ ଗେଜେଟିୟର ପ୍ରମାଣ',
        analysisCulturalContextTitle: '2. ସାଂସ୍କୃତିକ, ଭାଷାଗତ ଓ ବୃତ୍ତିଗତ ମହତ୍ତ୍ୱ',
        analysisEpistemicScopeTitle: '3. ଐତିହାସିକ ସତ୍ୟତା ଓ ଗବେଷଣା ପରିସର ଟିପ୍ପଣୀ',
        chronologicalTimelineHeading: 'କାଳାନୁକ୍ରମିକ ସମୟରେଖା ଓ ଐତିହାସିକ ପର୍ଯ୍ୟାୟ',
        chronologicalTimelineSub: 'ଏହି ବିଷୟ ସହିତ ଜଡ଼ିତ ପ୍ରମୁଖ ଐତିହାସିକ କାଳଖଣ୍ଡ ଓ ଶିଳାଲେଖ ପ୍ରମାଣ।',
        inscriptionsEvidenceHeading: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ, ଦୁର୍ଗ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ',
        inscriptionsEvidenceSub: 'ଶିଳାଲେଖ, ତାମ୍ରପଟ୍ଟା, ବୀରସ୍ତମ୍ଭ, ଦୁର୍ଗ, ଜଳାଶୟ ଓ ପବିତ୍ର ମନ୍ଦିର।',
        sourceReferencesHeading: 'ଐତିହାସିକ ଉତ୍ସ ଓ ଗ୍ରନ୍ଥ ସନ୍ଦର୍ଭ (Citations)',
        sourceReferencesSub: 'ପ୍ରାଥମିକ ଶିଳାଲେଖ ତଥ୍ୟ, ଗେଜେଟିୟର ଓ ଗବେଷଣା ଗ୍ରନ୍ଥ।',
        relatedContextHeading: 'ସମ୍ପୃକ୍ତ ଐତିହାସିକ ପ୍ରସଙ୍ଗ ଓ 74-ନାମ ସନ୍ଦର୍ଭ ତାଲିକା',
        relatedArticlesHeading: 'ସମ୍ପୃକ୍ତ ଐତିହ୍ୟ ଲେଖା (Related Articles)',
        relatedArticlesSub: 'ସମ୍ପୂର୍ଣ୍ଣ ଲେଖା ପଢ଼ିବା ପାଇଁ ତଳେ ଥିବା ଯେକୌଣସି କାର୍ଡ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
        readFullArticleBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଲେଖା ପଢ଼ନ୍ତୁ',
        relatedKeywordsHeading: 'ସମ୍ପୃକ୍ତ ମୁଖ୍ୟ ଶବ୍ଦ (Keywords)',
        relatedKeywordsSub: 'ସମ୍ପୃକ୍ତ ଐତିହାସିକ ତଥ୍ୟ ଖୋଜିବା ପାଇଁ ଯେକୌଣସି ଶବ୍ଦ ବାଛନ୍ତୁ।',
        hashtagsHeading: 'ସମ୍ପୃକ୍ତ ହ୍ୟାଶଟ୍ୟାଗ୍ (Hashtags)',
        hashtagsSub: 'ଦ୍ରୁତ ସନ୍ଧାନ ପାଇଁ ବିଷୟ ହ୍ୟାଶଟ୍ୟାଗ୍।',
        previousArticleLabel: 'ପୂର୍ବବର୍ତ୍ତୀ ଲେଖା',
        nextArticleLabel: 'ପରବର୍ତ୍ତୀ ଲେଖା',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (ଡ. ଜି. ସତ୍ୟନାରାୟଣ ରାଜୁ)ଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ (+91 9480112897)',
        verifiedSourceBadge: 'ପ୍ରମାଣିତ ସନ୍ଦର୍ଭ',
        epigraphicEraBadge: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ କାଳଖଣ୍ଡ',
        historicalPeriodBadge: 'ଐତିହାସିକ କାଳଖଣ୍ଡ',
        traditionalChronologyBadge: 'ପୌରାଣିକ / ବଂଶ ପରମ୍ପରା',
        actionsMenuLabel: 'ପ୍ରିଣ୍ଟ / ସେୟାର',
        civicWaterLegacyHeading: 'ନାଗରିକ ଓ ଜଳ-ଯାନ୍ତ୍ରିକ ଐତିହ୍ୟ'
      },
      bn: {
        backButton: 'পিছনে',
        homeButton: 'হোম',
        printButton: 'প্রিন্ট / PDF',
        shareButton: 'শেয়ার',
        closeButton: '✕ বন্ধ করুন',
        copyLinkButton: 'সরাসরি লিঙ্ক কপি করুন',
        copyTitleAndLinkButton: 'শিরোনাম ও লিঙ্ক কপি করুন',
        whatsappShareButton: 'WhatsApp-এ শেয়ার করুন',
        linkCopiedMessage: 'নিবন্ধের লিঙ্ক কপি হয়েছে!',
        titleAndLinkCopiedMessage: 'শিরোনাম ও লিঙ্ক কপি হয়েছে!',
        webViewPrintFallbackNotice:
          'মোবাইল অ্যাপ থেকে এই ঐতিহাসিক নিবন্ধটি প্রিন্ট বা PDF হিসেবে সংরক্ষণ করতে বাহ্যিক ব্রাউজারে খুলুন:',
        openInExternalBrowserButton: 'প্রিন্ট করতে বাহ্যিক ব্রাউজারে খুলুন',
        copyPrintUrlButton: 'প্রিন্ট লিঙ্ক কপি করুন',
        printHeaderTitle: 'সূর্যবংশ ওডিয়ারাজু ক্ষত্রিয় — সম্প্রদায় ঐতিহ্য আর্কাইভ দলিল',
        canonicalUrlLabel: 'আর্কাইভ লিঙ্ক',
        executiveSummaryHeading: 'ঐতিহাসিক সারাংশ ও পরিধি',
        completeHistoricalContentHeading: 'সম্পূর্ণ ঐতিহাসিক বিবরণ ও মূল পাঠ',
        subjectAnalysisHeading: 'বিস্তারিত বিষয় বিশ্লেষণ ও ঐতিহাসিক শ্রেণীবিন্যাস',
        analysisVerifiedCoreTitle: '১. প্রত্যয়িত শিলালিপি, প্রত্নতাত্ত্বিক ও গেজেটিয়ার প্রমাণ',
        analysisCulturalContextTitle: '২. সাংস্কৃতিক, ভাষাগত ও পেশাগত গুরুত্ব',
        analysisEpistemicScopeTitle: '৩. ঐতিহাসিক প্রামাণ্যতা ও গবেষণা পরিধি নোট',
        chronologicalTimelineHeading: 'কালানুক্রমিক সময়রেখা ও ঐতিহাসিক মাইলফলক',
        chronologicalTimelineSub: 'এই বিষয়ের সাথে যুক্ত প্রধান ঐতিহাসিক কালখণ্ড ও শিলালিপি প্রমাণ।',
        inscriptionsEvidenceHeading: 'প্রত্যয়িত শিলালিপি, দুর্গ ও প্রত্নতাত্ত্বিক প্রমাণ',
        inscriptionsEvidenceSub: 'শিলালিপি, তাম্রশাসন, বীরস্তম্ভ, দুর্গ, জলাশয় ও পবিত্র মন্দির।',
        sourceReferencesHeading: 'ঐতিহাসিক তথ্যসূত্র ও উদ্ধৃতি (Citations)',
        sourceReferencesSub: 'প্রাথমিক শিলালিপি নথি, গেজেটিয়ার ও গবেষণা গ্রন্থ।',
        relatedContextHeading: 'সংশ্লিষ্ট ঐতিহাসিক প্রেক্ষাপট ও ৭৪-নাম রেফারেন্স তালিকা',
        relatedArticlesHeading: 'সংশ্লিষ্ট ঐতিহ্য নিবন্ধ (Related Articles)',
        relatedArticlesSub: 'সম্পূর্ণ নিবন্ধটি পড়তে নিচের যেকোনো সম্পর্কিত কার্ডে ক্লিক করুন।',
        readFullArticleBtn: 'সম্পূর্ণ নিবন্ধ পড়ুন',
        relatedKeywordsHeading: 'সংশ্লিষ্ট মূল শব্দ (Keywords)',
        relatedKeywordsSub: 'সম্পর্কিত ঐতিহাসিক নথি খুঁজতে যেকোনো শব্দে ক্লিক করুন।',
        hashtagsHeading: 'সংশ্লিষ্ট হ্যাশট্যাগ (Hashtags)',
        hashtagsSub: 'দ্রুত অনুসন্ধানের জন্য বিষয়ভিত্তিক হ্যাশট্যাগ।',
        previousArticleLabel: 'পূর্ববর্তী নিবন্ধ',
        nextArticleLabel: 'পরবর্তী নিবন্ধ',
        consultPublisherLabel: 'Dr.G Sathyanarayana Raju (ড. জি. সত্যনারায়ণ রাজু)-এর সাথে আলোচনা করুন (+91 9480112897)',
        verifiedSourceBadge: 'প্রত্যয়িত তথ্যসূত্র',
        epigraphicEraBadge: 'প্রত্যয়িত শিলালিপি কালখণ্ড',
        historicalPeriodBadge: 'ঐতিহাসিক সময়কাল',
        traditionalChronologyBadge: 'পৌরাণিক / বংশ পরম্পরা',
        actionsMenuLabel: 'প্রিন্ট / শেয়ার',
        civicWaterLegacyHeading: 'নাগরিক ও জল-প্রকৌশল ঐতিহ্য'
      }
    };
    return dict[language] || dict.en;
  }, [language]);

  // Unified Full Article Detail Dossier Builder (covers all 6 collections: community_dir, synonym, profession_cat, figure, region, monograph)
  const fullArticleData = React.useMemo(() => {
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const toHashtagToken = (raw: string): string => {
      const withoutParens = raw.replace(/\([^)]*\)/g, ' ').trim();
      const cleaned = withoutParens
        .split(/[\s,./·—–-]+/)
        .map(part => part.replace(/[^\p{L}\p{N}\p{M}]/gu, ''))
        .filter(Boolean)
        .slice(0, 4)
        .join('');
      return cleaned ? `#${cleaned}` : '';
    };

    // Case A: Historical Figure selected
    if (selectedFigure) {
      const fig = selectedFigure;
      const figTitle = fig.localized_name[language] || fig.canonical_name;
      const figSubtitle = fig.titles[language] || fig.titles.en;
      const figSummary = fig.summary[language] || fig.summary.en;
      const figNarrative = fig.detailed_narrative[language] || fig.detailed_narrative.en;
      const figCivic = fig.engineering_and_civic_legacy[language] || fig.engineering_and_civic_legacy.en;
      const figDynasty = localizeHeritagePhrase(translateText(fig.dynasty_lineage));
      const figReignDates = localizeHeritagePhrase(translateText(fig.reign_or_dates));
      const figPlaces = fig.associated_places.map(p => localizeHeritagePhrase(translateText(p)));
      const epigraphicBadge =
        step5Ui.figuresTab.epigraphicStatus[fig.epigraphic_status] || fig.epigraphic_status;
      const isEpigraphic =
        fig.epigraphic_status.toLowerCase().includes('epigraphic') ||
        fig.epigraphic_status.toLowerCase().includes('inscript');

      const figIdx = HISTORICAL_FIGURES.findIndex(f => f.id === fig.id);
      const prevFig = figIdx > 0 ? HISTORICAL_FIGURES[figIdx - 1] : null;
      const nextFig = figIdx >= 0 && figIdx < HISTORICAL_FIGURES.length - 1 ? HISTORICAL_FIGURES[figIdx + 1] : null;

      const candidateRelIds: string[] = [
        ...HISTORICAL_FIGURES.filter(f => f.id !== fig.id).slice(0, 3).map(f => f.id),
        'syn_suryavamshi',
        'comm_dir_03_odra_kshatriya',
        'prof_cat_8_royal_dynasties'
      ];
      const relatedCards = Array.from(new Set(candidateRelIds))
        .map(id => resolveRelatedCardPreview(id))
        .filter((v): v is NonNullable<typeof v> => Boolean(v))
        .slice(0, 6);

      const keywords = Array.from(
        new Set([
          figTitle,
          fig.canonical_name,
          ...fig.alternate_names,
          figDynasty,
          ...figPlaces
        ])
      ).slice(0, 12);

      const hashtags = Array.from(
        new Set(keywords.map(k => toHashtagToken(translateKeyword(k))).filter(tkn => tkn.length >= 3))
      ).slice(0, 10);

      return {
        id: fig.id,
        collectionType: 'figure' as const,
        title: figTitle,
        subtitle: figSubtitle,
        badge: epigraphicBadge,
        epistemicBadge: epigraphicBadge,
        isEpigraphic,
        eraOrPeriod: figReignDates,
        location: figPlaces.join(', '),
        imageUrl: fig.image_url || fallbackArchiveImg,
        imageCaption: `${figTitle} — ${figSubtitle} (${figReignDates})`,
        visualClassLabel: epigraphicBadge,
        companionMap: undefined as
          | { url: string; title: string; caption: string; disclaimer: string }
          | undefined,
        nativeScripts: fig.alternate_names,
        metadata: [
          { label: step5Ui.figuresTab.modalDynasty, value: figDynasty },
          { label: '⏳', value: figReignDates },
          { label: step5Ui.figuresTab.modalSacredGeo, value: figPlaces.join(', ') },
          { label: synonymSectionLabels.colEpistemic, value: epigraphicBadge }
        ],
        summaryLabel: articleDetailUi.executiveSummaryHeading,
        summary: figSummary,
        content: `${figNarrative}\n\n■ ${articleDetailUi.civicWaterLegacyHeading}:\n${figCivic}`,
        sections: [] as NonNullable<ContentDetailItem['sections']>,
        subjectAnalysis: {
          verifiedCore: `${epigraphicBadge} — ${figDynasty} (${figReignDates}). ${figSummary}`,
          culturalContext: figCivic,
          epistemicScope: synonymSectionLabels.accuracyBody
        },
        timelineEvents: [
          {
            period: figReignDates,
            certainty: isEpigraphic ? articleDetailUi.epigraphicEraBadge : articleDetailUi.traditionalChronologyBadge,
            isVerified: isEpigraphic,
            title: `${figTitle} (${figDynasty})`,
            description: figSummary
          },
          {
            period: figPlaces.slice(0, 2).join(' • '),
            certainty: articleDetailUi.historicalPeriodBadge,
            isVerified: true,
            title: articleDetailUi.civicWaterLegacyHeading,
            description: figCivic
          }
        ],
        inscriptionsAndArchaeology: [
          ...fig.canonical_sources.map(src => ({
            title: localizeHeritagePhrase(translateText(src)),
            badge: epigraphicBadge,
            details: `${figTitle} — ${figPlaces.join(', ')}`
          }))
        ],
        references: fig.canonical_sources.map(src => ({
          citation: localizeHeritagePhrase(translateText(src)),
          type: epigraphicBadge
        })),
        related70Entries: getRelated70TermsForHeritageItem(fig.id),
        relatedCards,
        keywords,
        hashtags,
        prevItem: prevFig
          ? {
              id: prevFig.id,
              title: prevFig.localized_name[language] || prevFig.canonical_name,
              onClick: () => openFigureModal(prevFig)
            }
          : null,
        nextItem: nextFig
          ? {
              id: nextFig.id,
              title: nextFig.localized_name[language] || nextFig.canonical_name,
              onClick: () => openFigureModal(nextFig)
            }
          : null,
        actionButton: undefined as ContentDetailItem['actionButton']
      };
    }

    // Case B: Any modalItem (synonym, community_dir, profession_cat, region, monograph)
    if (!modalItem || !selectedModalRef) return null;
    const vis = STEP4_VISUAL_ASSET_REGISTRY[modalItem.id];
    const visClassLabel = vis ? step4VisualLabels.visualClasses[vis.visualClass] : modalItem.badge || '';
    const companionMap =
      vis && vis.companionMapUrl && vis.companionMapTitle && vis.companionMapCaption
        ? {
            url: vis.companionMapUrl,
            title: vis.companionMapTitle[language] || vis.companionMapTitle.en,
            caption: vis.companionMapCaption[language] || vis.companionMapCaption.en,
            disclaimer: step4VisualLabels.mapDisclaimerText
          }
        : undefined;

    // Extract related article IDs, keywords, and references according to selectedModalRef.type
    let rawRelatedIds: string[] = [];
    let rawKeywords: string[] = [];
    let rawReferences: Array<{ citation: string; type: string }> = [];
    let nativeScriptPills: string[] = [];
    let verifiedCoreText = '';
    let culturalContextText = '';
    let epistemicScopeText = '';
    let eraOrPeriodText = modalItem.era || modalItem.datesOrEra || modalItem.period || '';
    let timelineEvents: Array<{
      period: string;
      certainty: string;
      isVerified: boolean;
      title: string;
      description: string;
    }> = [];
    let inscriptionsList: Array<{ title: string; badge: string; details: string }> = [];
    let prevItem: { id: string; title: string; onClick: () => void } | null = null;
    let nextItem: { id: string; title: string; onClick: () => void } | null = null;

    if (selectedModalRef.type === 'synonym') {
      const item = COMMUNITY_SYNONYMS.find(s => s.id === selectedModalRef.id);
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[selectedModalRef.id];
      const idx = COMMUNITY_SYNONYMS.findIndex(s => s.id === selectedModalRef.id);
      if (idx > 0) {
        const p = COMMUNITY_SYNONYMS[idx - 1];
        const pMono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[p.id];
        prevItem = {
          id: p.id,
          title: pMono ? pMono.localizedTitle[language] || pMono.localizedTitle.en : p.title,
          onClick: () => openSynonymModal(p)
        };
      }
      if (idx >= 0 && idx < COMMUNITY_SYNONYMS.length - 1) {
        const n = COMMUNITY_SYNONYMS[idx + 1];
        const nMono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[n.id];
        nextItem = {
          id: n.id,
          title: nMono ? nMono.localizedTitle[language] || nMono.localizedTitle.en : n.title,
          onClick: () => openSynonymModal(n)
        };
      }
      if (item) {
        nativeScriptPills = Object.entries(item.native_scripts).map(([k, v]) => `${k}: ${v}`);
        eraOrPeriodText = localizeSynonymGroup(item.designation_group);
        verifiedCoreText = mono
          ? mono.epigraphicAndDocumentaryEvidence[language] || mono.epigraphicAndDocumentaryEvidence.en
          : item.historical_role[language] || item.historical_role.en;
        culturalContextText = mono
          ? mono.culturalAndSocialTraditions[language] || mono.culturalAndSocialTraditions.en
          : item.sacred_associations.map(sa => localizeHeritagePhrase(translateText(sa))).join(' • ');
        epistemicScopeText = mono
          ? mono.epistemicEvaluationAndResearchGaps[language] || mono.epistemicEvaluationAndResearchGaps.en
          : item.epistemic_note[language] || item.epistemic_note.en;

        if (mono) {
          rawRelatedIds = mono.relatedArticleIds;
          rawKeywords = mono.relatedKeywords;
          rawReferences = mono.references.map(r => ({
            citation: r.citation,
            type: localizeHeritagePhrase(r.type)
          }));
          timelineEvents = [
            {
              period: localizeHeritagePhrase(translateText(item.linguistic_origin)),
              certainty: articleDetailUi.epigraphicEraBadge,
              isVerified: true,
              title: SYNONYM_MONOGRAPH_SECTION_HEADINGS[language]?.sec2_linguistics || 'Terminology & Linguistic Origin',
              description: mono.terminologyAndLinguisticAnalysis[language] || mono.terminologyAndLinguisticAnalysis.en
            },
            {
              period: localizeHeritagePhrase(translateText(item.geographical_association)),
              certainty: articleDetailUi.historicalPeriodBadge,
              isVerified: true,
              title: SYNONYM_MONOGRAPH_SECTION_HEADINGS[language]?.sec3_chronology || 'Chronological History',
              description: mono.chronologicalHistory[language] || mono.chronologicalHistory.en
            },
            {
              period: localizeHeritageList(item.prominent_states).join(' • '),
              certainty: articleDetailUi.historicalPeriodBadge,
              isVerified: true,
              title: SYNONYM_MONOGRAPH_SECTION_HEADINGS[language]?.sec4_geography || 'Geographical & Settlement Analysis',
              description: mono.geographicalAndSettlementAnalysis[language] || mono.geographicalAndSettlementAnalysis.en
            }
          ];
          inscriptionsList = [
            {
              title: SYNONYM_MONOGRAPH_SECTION_HEADINGS[language]?.sec7_evidence || 'Epigraphic & Documentary Evidence',
              badge: modalItem.badge || '',
              details: mono.epigraphicAndDocumentaryEvidence[language] || mono.epigraphicAndDocumentaryEvidence.en
            },
            ...(vis
              ? [
                  {
                    title: vis.title[language] || vis.title.en,
                    badge: vis.sourceAttribution,
                    details: vis.caption[language] || vis.caption.en
                  }
                ]
              : [])
          ];
        }
      }
    } else if (selectedModalRef.type === 'community_dir') {
      const entry = COMMUNITY_DIRECTORY_ITEMS.find(c => c.id === selectedModalRef.id);
      const detailed = COMMUNITY_HERITAGE_DETAILED_ARTICLES.find(a => a.id === selectedModalRef.id);
      const idx = COMMUNITY_DIRECTORY_ITEMS.findIndex(c => c.id === selectedModalRef.id);
      if (idx > 0) {
        const p = COMMUNITY_DIRECTORY_ITEMS[idx - 1];
        prevItem = {
          id: p.id,
          title: `#${p.orderNumber} ${p.localizedName[language] || p.canonicalName}`,
          onClick: () => openCommunityDirModal(p)
        };
      }
      if (idx >= 0 && idx < COMMUNITY_DIRECTORY_ITEMS.length - 1) {
        const n = COMMUNITY_DIRECTORY_ITEMS[idx + 1];
        nextItem = {
          id: n.id,
          title: `#${n.orderNumber} ${n.localizedName[language] || n.canonicalName}`,
          onClick: () => openCommunityDirModal(n)
        };
      }
      if (entry) {
        nativeScriptPills = Object.entries(entry.nativeScripts).map(([k, v]) => `${k}: ${v}`);
        eraOrPeriodText = entry.localizedCategoryGroup[language] || entry.localizedCategoryGroup.en;
        verifiedCoreText = detailed
          ? detailed.historicalAnalysis[language] || detailed.historicalAnalysis.en
          : entry.overview[language] || entry.overview.en;
        culturalContextText = detailed
          ? `${detailed.culturalBackground[language] || detailed.culturalBackground.en}\n\n${
              detailed.professionalHeritageSummary[language] || detailed.professionalHeritageSummary.en
            }`
          : entry.overview[language] || entry.overview.en;
        epistemicScopeText = detailed
          ? detailed.epistemicDistinctionNote[language] || detailed.epistemicDistinctionNote.en
          : entry.epistemicClassification[language] || entry.epistemicClassification.en;

        if (detailed) {
          rawRelatedIds = detailed.relatedArticleIds;
          rawKeywords = detailed.relatedKeywords;
          rawReferences = detailed.references.map(r => ({
            citation: r.citation,
            type: localizeHeritagePhrase(r.type)
          }));
          timelineEvents = [
            {
              period: entry.localizedCategoryGroup[language] || entry.localizedCategoryGroup.en,
              certainty: articleDetailUi.epigraphicEraBadge,
              isVerified: true,
              title: step3Labels.historicalAnalysisHeading,
              description: detailed.historicalAnalysis[language] || detailed.historicalAnalysis.en
            },
            {
              period: entry.geographicalSpread[language] || entry.geographicalSpread.en,
              certainty: articleDetailUi.historicalPeriodBadge,
              isVerified: true,
              title: step3Labels.documentedExamplesHeading,
              description: detailed.documentedExamples[language] || detailed.documentedExamples.en
            },
            {
              period: localizeHeritageList(entry.prominentStates).join(' • '),
              certainty: articleDetailUi.historicalPeriodBadge,
              isVerified: true,
              title: step3Labels.professionalHeritageHeading,
              description: detailed.professionalHeritageSummary[language] || detailed.professionalHeritageSummary.en
            }
          ];
          inscriptionsList = [
            {
              title: step3Labels.documentedExamplesHeading,
              badge: entry.epistemicClassification[language] || entry.epistemicClassification.en,
              details: detailed.documentedExamples[language] || detailed.documentedExamples.en
            },
            ...(vis
              ? [
                  {
                    title: vis.title[language] || vis.title.en,
                    badge: vis.sourceAttribution,
                    details: vis.caption[language] || vis.caption.en
                  }
                ]
              : [])
          ];
        }
      }
    } else if (selectedModalRef.type === 'profession_cat') {
      const cat = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.find(p => p.id === selectedModalRef.id);
      const idx = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.findIndex(p => p.id === selectedModalRef.id);
      if (idx > 0) {
        const p = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES[idx - 1];
        prevItem = {
          id: p.id,
          title: p.title[language] || p.title.en,
          onClick: () => openProfessionModal(p)
        };
      }
      if (idx >= 0 && idx < COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES.length - 1) {
        const n = COMPLETE_PROFESSIONAL_HERITAGE_CATEGORIES[idx + 1];
        nextItem = {
          id: n.id,
          title: n.title[language] || n.title.en,
          onClick: () => openProfessionModal(n)
        };
      }
      if (cat) {
        const primaryVis = cat.visualAssets && cat.visualAssets.length > 0 ? cat.visualAssets[0] : undefined;
        eraOrPeriodText = `${step5Ui.catPrefix}${cat.categoryNumber} • ${cat.includedSubClassifications.length} ${step2Labels.subcategoriesLabel}`;
        rawRelatedIds = cat.relatedArticles.map(r => r.targetIdOrPath);
        rawKeywords = cat.relatedKeywords;
        rawReferences = cat.references.map(r => ({
          citation: r.citation,
          type: localizeHeritagePhrase(r.type)
        }));
        verifiedCoreText = `${cat.historicalBackground[language] || cat.historicalBackground.en}\n\n${
          cat.documentedHistoricalExamples[language] || cat.documentedHistoricalExamples.en
        }`;
        culturalContextText = `${cat.culturalAndRegionalSignificance[language] || cat.culturalAndRegionalSignificance.en}\n\n${
          cat.toolsMaterialsAndTechniques[language] || cat.toolsMaterialsAndTechniques.en
        }`;
        epistemicScopeText = `${
          cat.communitySpecificConnectionsAndDistinctions[language] ||
          cat.communitySpecificConnectionsAndDistinctions.en
        }\n\n${cat.epistemicAndMethodologicalNote[language] || cat.epistemicAndMethodologicalNote.en}`;

        timelineEvents = [
          {
            period: getHeading('secC'),
            certainty: articleDetailUi.epigraphicEraBadge,
            isVerified: true,
            title: cat.title[language] || cat.title.en,
            description: cat.historicalBackground[language] || cat.historicalBackground.en
          },
          {
            period: getHeading('secO'),
            certainty: articleDetailUi.historicalPeriodBadge,
            isVerified: true,
            title: getHeading('secO'),
            description: cat.documentedHistoricalExamples[language] || cat.documentedHistoricalExamples.en
          }
        ];
        inscriptionsList = [
          {
            title: getHeading('secO'),
            badge: step2Labels.profCategoriesBadge,
            details: cat.documentedHistoricalExamples[language] || cat.documentedHistoricalExamples.en
          },
          ...(primaryVis
            ? [
                {
                  title: primaryVis.title[language] || primaryVis.title.en,
                  badge: primaryVis.sourceAttribution,
                  details: primaryVis.caption[language] || primaryVis.caption.en
                }
              ]
            : [])
        ];
      }
    } else if (selectedModalRef.type === 'region') {
      const reg = GEOGRAPHICAL_SPREAD.find(r => r.id === selectedModalRef.id);
      const idx = GEOGRAPHICAL_SPREAD.findIndex(r => r.id === selectedModalRef.id);
      if (idx > 0) {
        const p = GEOGRAPHICAL_SPREAD[idx - 1];
        prevItem = {
          id: p.id,
          title: p.localized_region[language] || p.region_name,
          onClick: () => openRegionModal(p)
        };
      }
      if (idx >= 0 && idx < GEOGRAPHICAL_SPREAD.length - 1) {
        const n = GEOGRAPHICAL_SPREAD[idx + 1];
        nextItem = {
          id: n.id,
          title: n.localized_region[language] || n.region_name,
          onClick: () => openRegionModal(n)
        };
      }
      if (reg) {
        const locForts = reg.historical_forts_and_landmarks.map(f => localizeHeritagePhrase(translateText(f)));
        const locSacred = reg.sacred_centers.map(sc => localizeHeritagePhrase(translateText(sc)));
        const locStates = localizeHeritageList(reg.states_and_territories);
        rawRelatedIds = REGION_RELATED_ARTICLE_IDS[reg.id] || [];
        rawKeywords = [
          ...reg.predominant_community_synonyms,
          ...locStates,
          ...reg.prominent_cities_districts.slice(0, 4).map(c => localizeHeritagePhrase(translateText(c)))
        ];
        rawReferences = [
          {
            citation: `${reg.localized_region[language] || reg.region_name} — ${locForts.join('; ')}`,
            type: localizeHeritagePhrase('Archaeological & Regional Gazetteer Record')
          },
          ...(vis
            ? [
                {
                  citation: vis.sourceAttribution,
                  type: localizeHeritagePhrase('Archival Visual & Monument Record')
                }
              ]
            : [])
        ];
        verifiedCoreText = reg.regional_overview[language] || reg.regional_overview.en;
        culturalContextText = `${step5Ui.geographyTab.landmarkFortsLabel}: ${locForts.join(
          ' • '
        )}\n${step5Ui.geographyTab.sacredCentersLabel}: ${locSacred.join(' • ')}`;
        epistemicScopeText = synonymSectionLabels.accuracyBody;
        timelineEvents = [
          {
            period: step5Ui.geographyTab.migrationEpochs[reg.id] || reg.migration_epoch_and_corridor,
            certainty: articleDetailUi.historicalPeriodBadge,
            isVerified: true,
            title: reg.localized_region[language] || reg.region_name,
            description: reg.regional_overview[language] || reg.regional_overview.en
          }
        ];
        inscriptionsList = locForts.map(fort => ({
          title: fort,
          badge: locStates.join(' • '),
          details: `${step5Ui.geographyTab.sacredCentersLabel}: ${locSacred.join(' • ')}`
        }));
      }
    } else if (selectedModalRef.type === 'monograph') {
      const sec = HISTORICAL_MONOGRAPH_SECTIONS.find(s => s.id === selectedModalRef.id);
      const mono = SYNONYM_COMPREHENSIVE_MONOGRAPHS[selectedModalRef.id];
      const idx = HISTORICAL_MONOGRAPH_SECTIONS.findIndex(s => s.id === selectedModalRef.id);
      if (idx > 0) {
        const p = HISTORICAL_MONOGRAPH_SECTIONS[idx - 1];
        prevItem = {
          id: p.id,
          title: p.section_title[language] || p.section_title.en,
          onClick: () => openMonographModal(p.id)
        };
      }
      if (idx >= 0 && idx < HISTORICAL_MONOGRAPH_SECTIONS.length - 1) {
        const n = HISTORICAL_MONOGRAPH_SECTIONS[idx + 1];
        nextItem = {
          id: n.id,
          title: n.section_title[language] || n.section_title.en,
          onClick: () => openMonographModal(n.id)
        };
      }
      if (sec) {
        rawRelatedIds = mono ? mono.relatedArticleIds : ['comm_dir_01_od', 'syn_suryavamshi', 'fig_king_kharavela'];
        rawKeywords = mono ? mono.relatedKeywords : step5Ui.monographTab.chapterKeyPoints[sec.id] || sec.key_points;
        rawReferences = mono
          ? mono.references.map(r => ({
              citation: r.citation,
              type: localizeHeritagePhrase(r.type)
            }))
          : vis
          ? [{ citation: vis.sourceAttribution, type: localizeHeritagePhrase('Archival & Epigraphic Dossier') }]
          : [];
        verifiedCoreText = mono
          ? mono.epigraphicAndDocumentaryEvidence[language] || mono.epigraphicAndDocumentaryEvidence.en
          : sec.content[language] || sec.content.en;
        culturalContextText = mono
          ? mono.culturalAndSocialTraditions[language] || mono.culturalAndSocialTraditions.en
          : (step5Ui.monographTab.chapterKeyPoints[sec.id] || sec.key_points).join(' • ');
        epistemicScopeText = mono
          ? mono.epistemicEvaluationAndResearchGaps[language] || mono.epistemicEvaluationAndResearchGaps.en
          : synonymSectionLabels.accuracyBody;
        timelineEvents = [
          {
            period: step5Ui.monographTab.badge,
            certainty: articleDetailUi.epigraphicEraBadge,
            isVerified: true,
            title: sec.section_title[language] || sec.section_title.en,
            description: mono
              ? mono.chronologicalHistory[language] || mono.chronologicalHistory.en
              : sec.content[language] || sec.content.en
          }
        ];
        inscriptionsList = [
          ...(mono
            ? [
                {
                  title: SYNONYM_MONOGRAPH_SECTION_HEADINGS[language]?.sec7_evidence || 'Epigraphic & Documentary Evidence',
                  badge: step5Ui.monographTab.badge,
                  details: mono.epigraphicAndDocumentaryEvidence[language] || mono.epigraphicAndDocumentaryEvidence.en
                }
              ]
            : []),
          ...(vis
            ? [
                {
                  title: vis.title[language] || vis.title.en,
                  badge: vis.sourceAttribution,
                  details: vis.caption[language] || vis.caption.en
                }
              ]
            : [])
        ];
      }
    }

    const relatedCards = Array.from(new Set(rawRelatedIds))
      .filter(id => id !== modalItem.id)
      .map(id => resolveRelatedCardPreview(id))
      .filter((v): v is NonNullable<typeof v> => Boolean(v))
      .slice(0, 6);

    const cleanKeywords = Array.from(new Set(rawKeywords)).slice(0, 14);
    const hashtags = Array.from(
      new Set(
        [modalItem.title, ...cleanKeywords]
          .map(k => toHashtagToken(translateKeyword(k)))
          .filter(tkn => tkn.length >= 3)
      )
    ).slice(0, 12);

    return {
      id: modalItem.id,
      collectionType: selectedModalRef.type,
      title: modalItem.title,
      subtitle: modalItem.subtitle || '',
      badge: modalItem.badge || step5Ui.heroBadge,
      epistemicBadge: modalItem.badge || step5Ui.heroBadge,
      isEpigraphic: true,
      eraOrPeriod: eraOrPeriodText,
      location: modalItem.location || '',
      imageUrl: modalItem.imageUrl || fallbackArchiveImg,
      imageCaption: modalItem.imageCaption || (vis ? vis.caption[language] || vis.caption.en : modalItem.title),
      visualClassLabel: visClassLabel,
      companionMap,
      nativeScripts: nativeScriptPills,
      metadata: modalItem.metadata || [],
      summaryLabel: modalItem.summaryLabel || articleDetailUi.executiveSummaryHeading,
      summary: modalItem.summary || '',
      content: modalItem.content || '',
      sections: (modalItem.sections || []).filter(
        sec =>
          sec.heading !== step3Labels.relatedArticlesHeading &&
          sec.heading !== step3Labels.relatedKeywordsHeading &&
          sec.heading !== step3Labels.referencesHeading &&
          sec.heading !== getHeading('secS')
      ),
      subjectAnalysis: {
        verifiedCore: verifiedCoreText,
        culturalContext: culturalContextText,
        epistemicScope: epistemicScopeText
      },
      timelineEvents,
      inscriptionsAndArchaeology: inscriptionsList,
      references: rawReferences,
      related70Entries: getRelated70TermsForHeritageItem(modalItem.id),
      relatedCards,
      keywords: cleanKeywords,
      hashtags,
      prevItem,
      nextItem,
      actionButton: modalItem.actionButton
    };
  }, [
    selectedFigure,
    modalItem,
    selectedModalRef,
    language,
    articleDetailUi,
    step2Labels,
    step3Labels,
    step4VisualLabels,
    step5Ui,
    synonymSectionLabels
  ]);

  // ============================================================================
  // DEDICATED FULL ARTICLE DETAIL VIEW (Mobile-First, Non-Overlapping Reading View)
  // ============================================================================
  if (fullArticleData) {
    const canonicalArticleUrl = getCanonicalHeritageUrl(fullArticleData.id);
    const externalPrintArticleUrl = getExternalPrintHeritageUrl(fullArticleData.id, language);
    const r70Ui = REFERENCE_70_UI_LABELS[language] || REFERENCE_70_UI_LABELS.en;

    return (
      <div className="min-h-screen bg-[#07090e] text-stone-200 print-article-wrapper">
        {/* Full Structured Article Container — Natural Vertical Scrolling, No Sticky Overlays */}
        <article className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-7 print-article-container">
          {/* Print-Only Website Identification Masthead */}
          <div className="print-only border-b-2 border-stone-800 pb-3 mb-4">
            <p className="text-xs font-bold uppercase tracking-wider">
              Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal — {articleDetailUi.printHeaderTitle}
            </p>
            <p className="text-[11px] font-semibold mt-0.5">
              Research, Documentation & Compilation by Dr.G Sathyanarayana Raju • Founder & Historical Documentation Contributor
            </p>
            <p className="text-[10px] mt-0.5">
              {articleDetailUi.canonicalUrlLabel}: {canonicalArticleUrl}
            </p>
          </div>

          {/* ====================================================================
              SECTION 1 — COMPACT NAVIGATION BAR, ARTICLE TITLE, LEAD IMAGE & METADATA
              ==================================================================== */}
          <header className="print-article-header bg-[#0e131f] border border-[#c99738]/40 rounded-2xl p-4 sm:p-7 shadow-2xl space-y-4 sm:space-y-5">
            {/* Compact Non-Sticky Top Navigation & Collapsible Actions Bar */}
            <div className="no-print pb-3 border-b border-stone-800/90 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                {/* Left: Compact Back, Home & Section Breadcrumb */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleBackFromArticle}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141a29] hover:bg-[#1e273d] text-stone-100 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{articleDetailUi.backButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('/')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#182135] hover:bg-[#23304d] text-[#fae29c] border border-[#c99738]/40 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Home className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{t.nav?.home || articleDetailUi.homeButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={closeActiveArticle}
                    className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#121826] hover:bg-[#1a2236] text-stone-300 hover:text-[#d4af37] border border-stone-800 text-xs font-medium transition-colors cursor-pointer max-w-[200px] truncate"
                  >
                    <span className="truncate">{activeReferenceOption.label}</span>
                  </button>
                </div>

                {/* Right: Compact Language Selector + Collapsible Article Actions + Close */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <label className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#121826] border border-[#c99738]/45 text-xs font-semibold text-[#fae29c]">
                    <Globe className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <select
                      aria-label="Select Article Language"
                      value={language}
                      onChange={e => setLanguage(e.target.value as LanguageCode)}
                      className="bg-transparent text-[#fae29c] font-bold text-xs focus:outline-none cursor-pointer pr-1"
                    >
                      {SUPPORTED_LANGUAGES.map(langObj => (
                        <option
                          key={langObj.code}
                          value={langObj.code}
                          className="bg-[#0e131f] text-stone-100"
                        >
                          {langObj.nativeName} ({langObj.label})
                        </option>
                      ))}
                    </select>
                  </label>

                  <button
                    type="button"
                    onClick={() => handleDownloadHeritagePdf(fullArticleData.title)}
                    disabled={isDownloadingPdf}
                    title={`${pdfUi.downloadPdfBtn} (${generateArticlePdfFilename(fullArticleData.title)})`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#c99738] hover:bg-[#dfb04c] text-[#290106] border border-[#f5d78e] text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>{isDownloadingPdf ? pdfUi.generatingPdfBtn : pdfUi.downloadPdfBtn}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsActionsMenuOpen(prev => !prev)}
                    aria-expanded={isActionsMenuOpen}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                      isActionsMenuOpen || isPrintFallbackOpen || shareFeedback !== 'none'
                        ? 'bg-[#580014] text-[#fae29c] border-[#d4af37]'
                        : 'bg-[#1a2438] hover:bg-[#253350] text-[#fae29c] border-[#c99738]/50'
                    }`}
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{articleDetailUi.actionsMenuLabel}</span>
                    {isActionsMenuOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[#d4af37]" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={closeActiveArticle}
                    title={articleDetailUi.closeButton}
                    className="inline-flex items-center justify-center px-2.5 py-1.5 rounded-lg bg-[#6e0018] hover:bg-[#8f0020] text-[#fff3d1] border border-[#d4af37] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <span>{articleDetailUi.closeButton}</span>
                  </button>
                </div>
              </div>

              {/* Collapsible Article Actions Drawer (Download PDF, Print, Share, Copy Link, WhatsApp) */}
              {(isActionsMenuOpen ||
                isPrintFallbackOpen ||
                shareFeedback !== 'none' ||
                pdfDownloadResult) && (
                <div className="p-3 rounded-xl bg-[#121826] border border-[#c99738]/40 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDownloadHeritagePdf(fullArticleData.title)}
                      disabled={isDownloadingPdf}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c99738] hover:bg-[#dfb04c] text-[#290106] border border-[#f5d78e] text-xs font-bold transition-colors cursor-pointer disabled:opacity-60"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>{isDownloadingPdf ? pdfUi.generatingPdfBtn : pdfUi.downloadPdfBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handlePrintHeritageArticle(fullArticleData.title)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a2438] hover:bg-[#253350] text-[#fae29c] border border-[#c99738]/50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{pdfUi.printBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleShareHeritageArticle(
                          fullArticleData.id,
                          fullArticleData.title,
                          fullArticleData.summary || fullArticleData.subtitle
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a2438] hover:bg-[#253350] text-[#fae29c] border border-[#c99738]/50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{articleDetailUi.shareButton}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopyHeritageLink(fullArticleData.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141c2e] hover:bg-[#1f2b46] text-[#fae29c] border border-[#c99738]/40 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Link2 className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{articleDetailUi.copyLinkButton}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyHeritageTitleAndLink(fullArticleData.id, fullArticleData.title)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141c2e] hover:bg-[#1f2b46] text-stone-200 hover:text-[#fae29c] border border-stone-700 hover:border-[#c99738]/40 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{articleDetailUi.copyTitleAndLinkButton}</span>
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${fullArticleData.title} — ${canonicalArticleUrl}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>{articleDetailUi.whatsappShareButton}</span>
                    </a>

                    {shareFeedback !== 'none' && (
                      <span
                        role="status"
                        aria-live="polite"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-600/50 text-xs font-bold"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>
                          {shareFeedback === 'link'
                            ? articleDetailUi.linkCopiedMessage
                            : articleDetailUi.titleAndLinkCopiedMessage}
                        </span>
                      </span>
                    )}
                  </div>

                  {pdfDownloadResult && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold flex items-center gap-1.5 break-all">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{pdfUi.pdfSavedNotice(pdfDownloadResult.filename)}</span>
                      </span>
                      {pdfDownloadResult.downloadUrl && (
                        <a
                          href={pdfDownloadResult.downloadUrl}
                          download={pdfDownloadResult.filename}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#c99738] text-[#290106] font-bold text-[11px]"
                        >
                          <Download className="w-3 h-3" />
                          <span>{pdfUi.directDownloadLinkLabel}</span>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Android WebViewer Print Fallback Banner */}
                  {isPrintFallbackOpen && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="p-3 rounded-xl bg-[#161f33] border border-[#d4af37]/60 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs text-[#fcedc7] leading-relaxed">
                          {articleDetailUi.webViewPrintFallbackNotice}
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsPrintFallbackOpen(false)}
                          className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 shrink-0 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={externalPrintArticleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => handleExternalBrowserLinkClick(e, externalPrintArticleUrl)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6e0018] hover:bg-[#8f0020] text-[#fff3d1] border border-[#d4af37] text-xs font-bold transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>{articleDetailUi.openInExternalBrowserButton}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyPrintHeritageUrl(fullArticleData.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141c2e] hover:bg-[#1f2b46] text-[#fae29c] border border-[#c99738]/40 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {printUrlCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                          )}
                          <span>
                            {printUrlCopied
                              ? articleDetailUi.linkCopiedMessage
                              : articleDetailUi.copyPrintUrlButton}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Article Badges, Main Title & Subtitle — Placed First for Immediate Mobile Readability */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{fullArticleData.badge}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-600/40">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{fullArticleData.epistemicBadge}</span>
                </span>

                {fullArticleData.eraOrPeriod && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#151c2c] text-[#fae29c] border border-stone-700">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{fullArticleData.eraOrPeriod}</span>
                  </span>
                )}
              </div>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-royal-heading text-[#fae29c] leading-snug break-words">
                {fullArticleData.title}
              </h1>

              {fullArticleData.subtitle && (
                <p className="text-sm sm:text-base text-[#e8c872] font-medium leading-relaxed break-words">
                  {fullArticleData.subtitle}
                </p>
              )}
            </div>

            {/* Lead Article Image & Quick Reference Metadata */}
            <div className="flex flex-col md:flex-row items-start gap-5 sm:gap-7 pt-1">
              {/* Lead Thumbnail / Historical Visual Record */}
              <div className="w-full md:w-80 shrink-0 space-y-2">
                <figure className="print-lead-figure relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 bg-stone-950 shadow-xl">
                  <img
                    src={fullArticleData.imageUrl}
                    alt={fullArticleData.title}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    onError={handleImgError}
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                  {fullArticleData.visualClassLabel && (
                    <span className="no-print absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-black/80 text-[#fae29c] border border-[#d4af37]/50 text-[10px] font-bold backdrop-blur-sm">
                      {fullArticleData.visualClassLabel}
                    </span>
                  )}
                </figure>
                {fullArticleData.imageCaption && (
                  <p className="text-xs text-stone-300 leading-relaxed bg-[#121826] p-3 rounded-xl border border-stone-800/80">
                    {fullArticleData.imageCaption}
                  </p>
                )}
              </div>

              {/* Native Script Attestations & Quick Reference Metadata Grid */}
              <div className="flex-1 min-w-0 w-full space-y-4">
                {/* Native Script Attestations / Alternative Names */}
                {fullArticleData.nativeScripts.length > 0 && (
                  <div className="bg-[#121826] border border-stone-800/90 rounded-xl p-3.5 space-y-1.5">
                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                      {step5Ui.nativeScriptAttestations}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {fullArticleData.nativeScripts.map((ns, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#182135] text-[#fcedc7] border border-[#c99738]/30"
                        >
                          {ns}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metadata Grid */}
                {fullArticleData.metadata.length > 0 && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {fullArticleData.metadata.map((m, idx) => (
                      <div
                        key={idx}
                        className="bg-[#141a29] p-3 rounded-xl border border-stone-800/80 space-y-1"
                      >
                        <dt className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                          {m.label}
                        </dt>
                        <dd className="text-stone-100 font-semibold leading-snug break-words">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>

            {/* Companion Historical Reference Map (if available) */}
            {fullArticleData.companionMap && (
              <figure className="rounded-2xl overflow-hidden border border-[#c99738]/40 bg-stone-950 grid grid-cols-1 md:grid-cols-3">
                <div className="md:col-span-1 h-48 md:h-auto overflow-hidden">
                  <img
                    src={fullArticleData.companionMap.url}
                    alt={fullArticleData.companionMap.title}
                    onError={handleImgError}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="md:col-span-2 p-4 sm:p-5 space-y-1.5 flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37]">
                    {step4VisualLabels.companionMapHeading}
                  </span>
                  <div className="text-sm sm:text-base font-bold text-[#fae29c]">
                    {fullArticleData.companionMap.title}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {fullArticleData.companionMap.caption}
                  </p>
                  <p className="text-[11px] text-amber-300/90">
                    {fullArticleData.companionMap.disclaimer}
                  </p>
                </figcaption>
              </figure>
            )}
          </header>

          {/* ====================================================================
              SECTION 2 — EXECUTIVE HISTORICAL SUMMARY
              ==================================================================== */}
          {fullArticleData.summary && (
            <section className="bg-gradient-to-r from-[#20050c]/80 via-[#141926] to-[#121622] border-l-4 border-[#d4af37] border-y border-r border-stone-800 rounded-2xl p-6 space-y-2.5 shadow-lg">
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>{fullArticleData.summaryLabel}</span>
              </h2>
              <p className="text-sm sm:text-base text-[#fcedc7]/95 font-royal-serif leading-relaxed whitespace-pre-line">
                {fullArticleData.summary}
              </p>
            </section>
          )}

          {/* ====================================================================
              SECTION 3 — COMPLETE EXISTING HISTORICAL CONTENT & MONOGRAPH SECTIONS
              ==================================================================== */}
          {fullArticleData.content && (
            <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2 border-b border-stone-800 pb-3">
                <BookOpen className="w-4 h-4 text-[#d4af37]" />
                <span>{articleDetailUi.completeHistoricalContentHeading}</span>
              </h2>
              <div className="text-sm sm:text-base text-stone-200 font-royal-serif leading-relaxed whitespace-pre-line bg-[#111623] p-5 sm:p-6 rounded-xl border border-stone-800/80">
                {fullArticleData.content}
              </div>

              {fullArticleData.sections.length > 0 && (
                <div className="space-y-5 pt-2">
                  {fullArticleData.sections.map((sec, sIdx) => {
                    const hasContent = Boolean(sec.content && sec.content.trim());
                    const hasItems = Boolean(sec.items && sec.items.length > 0);
                    if (!hasContent && !hasItems) return null;
                    const secHeading = sec.title || sec.heading || '';
                    return (
                      <div key={sIdx} className="space-y-2.5">
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-2">
                          <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
                          <span>{secHeading}</span>
                        </h3>
                        {sec.content && (
                          <div className="p-4 sm:p-5 rounded-xl bg-[#121724] border border-stone-800 text-xs sm:text-sm text-stone-200 font-royal-serif leading-relaxed whitespace-pre-line">
                            {sec.content}
                          </div>
                        )}
                        {sec.type === 'tags' && sec.items && (
                          <div className="flex flex-wrap gap-2">
                            {sec.items.map((tagItem, tIdx) => (
                              <button
                                key={tIdx}
                                type="button"
                                onClick={() => handleModalTagClick(tagItem)}
                                className="px-3 py-1 rounded-lg bg-[#182030] hover:bg-[#580014] border border-stone-700 hover:border-[#d4af37] text-xs text-[#fae29c] hover:text-white font-medium transition-colors cursor-pointer text-left"
                              >
                                {tagItem}
                              </button>
                            ))}
                          </div>
                        )}
                        {(!sec.type || sec.type === 'list') && sec.items && (
                          <div className="space-y-2">
                            {sec.items.map((listItem, lIdx) => (
                              <div
                                key={lIdx}
                                className="p-3.5 rounded-xl bg-[#141926] border border-stone-800/80 text-xs sm:text-sm text-stone-200 flex items-start gap-2.5"
                              >
                                <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                                <span>{listItem}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* ====================================================================
              SECTION 4 — DETAILED SUBJECT ANALYSIS & EPISTEMIC CLASSIFICATION
              ==================================================================== */}
          <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#d4af37]" />
                <span>{articleDetailUi.subjectAnalysisHeading}</span>
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-600/40">
                <Check className="w-3 h-3 shrink-0" />
                <span>{fullArticleData.epistemicBadge}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/20 border border-emerald-700/40 rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{articleDetailUi.analysisVerifiedCoreTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                  {fullArticleData.subjectAnalysis.verifiedCore}
                </p>
              </div>

              <div className="bg-[#141a29] border border-[#c99738]/40 rounded-xl p-4 sm:p-5 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#fae29c] flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>{articleDetailUi.analysisCulturalContextTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                  {fullArticleData.subjectAnalysis.culturalContext}
                </p>
              </div>
            </div>

            <div className="bg-amber-950/20 border border-amber-600/40 rounded-xl p-4 sm:p-5 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{articleDetailUi.analysisEpistemicScopeTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                {fullArticleData.subjectAnalysis.epistemicScope}
              </p>
            </div>
          </section>

          {/* ====================================================================
              SECTION 5 — CHRONOLOGICAL TIMELINE & HISTORICAL MILESTONES
              ==================================================================== */}
          {fullArticleData.timelineEvents.length > 0 && (
            <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="border-b border-stone-800 pb-3 space-y-1">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#d4af37]" />
                  <span>{articleDetailUi.chronologicalTimelineHeading}</span>
                </h2>
                <p className="text-xs text-stone-400">{articleDetailUi.chronologicalTimelineSub}</p>
              </div>

              <div className="space-y-3">
                {fullArticleData.timelineEvents.map((ev, idx) => (
                  <div
                    key={idx}
                    className="bg-[#121725] border border-stone-800/90 rounded-xl p-4 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="sm:w-64 shrink-0 space-y-1.5">
                      <span className="inline-block text-xs font-extrabold text-[#fae29c] bg-[#1a2236] px-3 py-1 rounded-lg border border-[#c99738]/40">
                        {ev.period}
                      </span>
                      <div>
                        <span
                          className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                            ev.isVerified
                              ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600/40'
                              : 'bg-amber-950/70 text-amber-300 border-amber-600/40'
                          }`}
                        >
                          {ev.certainty}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-xs sm:text-sm font-bold text-[#fae29c] leading-snug">
                        {ev.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                        {ev.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ====================================================================
              SECTION 6 — VERIFIED INSCRIPTIONS & ARCHAEOLOGICAL EVIDENCE
              ==================================================================== */}
          {fullArticleData.inscriptionsAndArchaeology.length > 0 && (
            <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="border-b border-stone-800 pb-3 space-y-1">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#d4af37]" />
                  <span>{articleDetailUi.inscriptionsEvidenceHeading}</span>
                </h2>
                <p className="text-xs text-stone-400">{articleDetailUi.inscriptionsEvidenceSub}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {fullArticleData.inscriptionsAndArchaeology.map((ins, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-[#121826] border border-stone-800/90 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-[#fae29c] flex items-center gap-2">
                        <Scroll className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                        <span>{ins.title}</span>
                      </h3>
                      {ins.badge && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                          {ins.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                      {ins.details}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ====================================================================
              SECTION 7 — HISTORICAL SOURCE REFERENCES & CITATIONS
              ==================================================================== */}
          {fullArticleData.references.length > 0 && (
            <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="border-b border-stone-800 pb-3 space-y-1">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                  <Scroll className="w-4 h-4 text-[#d4af37]" />
                  <span>
                    {articleDetailUi.sourceReferencesHeading} ({fullArticleData.references.length})
                  </span>
                </h2>
                <p className="text-xs text-stone-400">{articleDetailUi.sourceReferencesSub}</p>
              </div>

              <div className="space-y-3">
                {fullArticleData.references.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#121826] border border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#1d263b] text-[#d4af37] border border-[#c99738]/40">
                          {ref.type}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-600/40">
                          <Check className="w-2.5 h-2.5 shrink-0" />
                          <span>{articleDetailUi.verifiedSourceBadge}</span>
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 font-medium leading-relaxed">
                        {ref.citation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ====================================================================
              SECTION 8 — RELATED HISTORICAL CONTEXT & 70-NAME REFERENCE MAPPING
              ==================================================================== */}
          {fullArticleData.related70Entries.length > 0 && (
            <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="border-b border-stone-800 pb-3 space-y-1">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#d4af37]" />
                  <span>
                    {articleDetailUi.relatedContextHeading} ({fullArticleData.related70Entries.length})
                  </span>
                </h2>
                <p className="text-xs text-stone-400">{r70Ui.nonConflationDisclaimer}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {fullArticleData.related70Entries.map(entry70 => {
                  const locLabel = entry70.localizedLabel[language] || entry70.canonicalTerm;
                  const clsLabel =
                    r70Ui.classifications[entry70.classification] || entry70.classification;
                  const noteText =
                    entry70.historicalContextNote[language] || entry70.historicalContextNote.en;
                  return (
                    <div
                      key={entry70.id}
                      className={`p-3.5 rounded-xl border space-y-1.5 ${
                        entry70.requiresVerification
                          ? 'bg-[#17121e] border-amber-500/40'
                          : 'bg-[#121826] border-stone-800'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-[#fae29c]">
                          #{entry70.order}/{MASTER_70_REFERENCE_REGISTRY.length} {locLabel}{' '}
                          {locLabel !== entry70.canonicalTerm ? `(${entry70.canonicalTerm})` : ''}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#580014] text-[#fae29c] text-[10px] font-semibold border border-[#d4af37]/40">
                          {clsLabel}
                        </span>
                      </div>
                      {entry70.requiresVerification && (
                        <div className="text-[10px] font-semibold text-amber-300">
                          ⚠ {r70Ui.requiresVerificationBadge}
                        </div>
                      )}
                      <p className="text-xs text-stone-300 leading-relaxed">{noteText}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ====================================================================
              SECTION 9 — ARTICLE FOOTER: RELATED ARTICLES (WITH SMALL THUMBNAILS),
              RELATED KEYWORDS, HASHTAGS, AND BACK / HOME / PRINT / SHARE CONTROLS
              ==================================================================== */}
          {fullArticleData.relatedCards.length > 0 && (
            <section className="bg-[#0e131f] border border-[#c99738]/35 rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <div className="border-b border-stone-800 pb-3 space-y-1">
                <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>{articleDetailUi.relatedArticlesHeading}</span>
                </h2>
                <p className="text-xs text-stone-400">{articleDetailUi.relatedArticlesSub}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fullArticleData.relatedCards.map(relCard => (
                  <div
                    key={relCard.id}
                    onClick={() => handleNavigateRelatedId(relCard.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNavigateRelatedId(relCard.id);
                      }
                    }}
                    className="group bg-[#121826] hover:bg-[#172033] border border-stone-800 hover:border-[#c99738]/60 rounded-xl p-3.5 sm:p-4 flex items-start gap-3.5 transition-all cursor-pointer shadow-md"
                  >
                    <img
                      src={relCard.imageUrl}
                      alt={relCard.title}
                      loading="lazy"
                      onError={handleImgError}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#d4af37]/50 shrink-0 bg-stone-950 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#580014]/80 text-[#fae29c] border border-[#c99738]/30 truncate max-w-full">
                          {relCard.categoryBadge}
                        </span>
                        {relCard.eraOrRegion && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1a2234] text-[#d4af37] border border-stone-700 truncate max-w-[180px]">
                            {relCard.eraOrRegion}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#fae29c] group-hover:text-[#ffd966] transition-colors line-clamp-1 font-royal-heading">
                        {relCard.title}
                      </h3>
                      <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                        {relCard.summary}
                      </p>
                      <div className="pt-0.5 flex items-center justify-end">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#d4af37] group-hover:text-[#fae29c] transition-colors">
                          <span>{articleDetailUi.readFullArticleBtn}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Related Keywords & Relevant Hashtags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fullArticleData.keywords.length > 0 && (
              <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-lg">
                <div className="border-b border-stone-800 pb-2.5 space-y-0.5">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{articleDetailUi.relatedKeywordsHeading}</span>
                  </h2>
                  <p className="text-[11px] text-stone-400">{articleDetailUi.relatedKeywordsSub}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {fullArticleData.keywords.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchTerm(kw);
                        closeActiveArticle();
                      }}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#141a29] hover:bg-[#1f2940] text-stone-200 hover:text-[#fae29c] border border-stone-700/80 hover:border-[#c99738]/60 transition-colors cursor-pointer text-left"
                    >
                      {translateKeyword(kw)}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {fullArticleData.hashtags.length > 0 && (
              <section className="bg-[#0e131f] border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-3.5 shadow-lg">
                <div className="border-b border-stone-800 pb-2.5 space-y-0.5">
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{articleDetailUi.hashtagsHeading}</span>
                  </h2>
                  <p className="text-[11px] text-stone-400">{articleDetailUi.hashtagsSub}</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {fullArticleData.hashtags.map((ht, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleModalTagClick(ht)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#21020b]/60 hover:bg-[#580014] text-[#d4af37] hover:text-[#fae29c] border border-[#c99738]/35 hover:border-[#d4af37] transition-colors cursor-pointer"
                    >
                      {ht}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Bottom Article Navigation Controls (Prev/Next + Back, Home, Print, Share) */}
          <div className="no-print space-y-4 pt-2">
            {(fullArticleData.prevItem || fullArticleData.nextItem) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {fullArticleData.prevItem ? (
                  <button
                    type="button"
                    onClick={fullArticleData.prevItem.onClick}
                    className="p-4 rounded-xl bg-[#0f1420] hover:bg-[#161d2e] border border-stone-800 hover:border-[#c99738]/60 text-left transition-all flex items-center gap-3 cursor-pointer group"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#d4af37] shrink-0 group-hover:-translate-x-0.5 transition-transform" />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        {articleDetailUi.previousArticleLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#fae29c] truncate block">
                        {fullArticleData.prevItem.title}
                      </span>
                    </div>
                  </button>
                ) : (
                  <div />
                )}

                {fullArticleData.nextItem ? (
                  <button
                    type="button"
                    onClick={fullArticleData.nextItem.onClick}
                    className="p-4 rounded-xl bg-[#0f1420] hover:bg-[#161d2e] border border-stone-800 hover:border-[#c99738]/60 text-right transition-all flex items-center justify-end gap-3 cursor-pointer group"
                  >
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        {articleDetailUi.nextArticleLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#fae29c] truncate block">
                        {fullArticleData.nextItem.title}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#d4af37] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <div />
                )}
              </div>
            )}

            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleBackFromArticle}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141a29] hover:bg-[#1e273d] text-stone-100 border border-stone-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
                  <span>{articleDetailUi.backButton}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#182135] hover:bg-[#23304d] text-[#fae29c] border border-[#c99738]/40 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Home className="w-4 h-4 text-[#d4af37]" />
                  <span>{t.nav?.home || articleDetailUi.homeButton}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrintHeritageArticle}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a2438] hover:bg-[#253350] text-[#fae29c] border border-[#c99738]/50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#d4af37]" />
                  <span>{articleDetailUi.printButton}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleShareHeritageArticle(
                      fullArticleData.id,
                      fullArticleData.title,
                      fullArticleData.summary || fullArticleData.subtitle
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a2438] hover:bg-[#253350] text-[#fae29c] border border-[#c99738]/50 text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-[#d4af37]" />
                  <span>{articleDetailUi.shareButton}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyHeritageLink(fullArticleData.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#141c2e] hover:bg-[#1f2b46] text-[#fae29c] border border-[#c99738]/40 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Link2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{articleDetailUi.copyLinkButton}</span>
                </button>

                {fullArticleData.actionButton && (
                  <button
                    type="button"
                    onClick={() => {
                      closeActiveArticle();
                      fullArticleData.actionButton?.onClick();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#182030] hover:bg-[#20293d] text-[#fae29c] border border-[#c99738]/40 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{fullArticleData.actionButton.label}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={closeActiveArticle}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6e0018] hover:bg-[#8f0020] text-[#fff3d1] border-2 border-[#d4af37] text-xs sm:text-sm font-extrabold transition-all shadow-md cursor-pointer"
                >
                  <span>{articleDetailUi.closeButton}</span>
                </button>
              </div>

              <a
                href={`https://wa.me/919480112897?text=${encodeURIComponent(
                  `Namaste Dr.G Sathyanarayana Raju ji, regarding Community Heritage article: ${fullArticleData.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>{articleDetailUi.consultPublisherLabel}</span>
              </a>
            </div>
          </div>

          {/* Author Profile & Print/PDF Attribution */}
          <div className="pt-2">
            <PublisherCreditCard variant="article-profile" />
          </div>
        </article>
      </div>
    );
  }

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
                          <figure className="relative h-40 w-full overflow-hidden bg-stone-950 border-b border-stone-800/80">
                            <img
                              src={vis ? vis.imageUrl : fallbackArchiveImg}
                              alt={vis ? vis.altText[language] || vis.altText.en : item.title}
                              loading="lazy"
                              onError={handleImgError}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/30" />
                            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 text-[#fae29c] border border-[#d4af37]/40 text-[9px] font-semibold backdrop-blur-sm">
                              {vis ? step4VisualLabels.visualClasses[vis.visualClass] : epistemicLabel}
                            </span>
                            {mono && (
                              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-[#580014]/90 text-[#fcedc7] border border-[#d4af37]/40 text-[9px] font-semibold backdrop-blur-sm">
                                {mono.references.length} {step3Labels.referencesHeading.split(' ')[0]}
                              </span>
                            )}
                            <figcaption className="absolute bottom-1.5 left-3 right-3 text-[10px] text-stone-200 font-medium line-clamp-1">
                              {vis ? vis.title[language] || vis.title.en : item.geographical_association}
                            </figcaption>
                          </figure>
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
                        {localizeHeritagePhrase(translateText(item.geographical_association))}
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

          {/* ==================================================================== */}
          {/* STAGE 2: 74-NAME MASTER REFERENCE & SEARCH ALIAS CROSS-REFERENCE INDEX */}
          {/* ==================================================================== */}
          {(() => {
            const refUi = REFERENCE_70_UI_LABELS[language] || REFERENCE_70_UI_LABELS.en;
            const visible70Entries = (searchTerm.trim() ? matched70SearchEntries : MASTER_70_REFERENCE_REGISTRY).filter(
              entry => ref70ClassFilter === 'all' || entry.classification === ref70ClassFilter
            );
            const origCount = MASTER_70_REFERENCE_REGISTRY.filter(e => e.datasetGroup === 'original_45').length;
            const suppCount = MASTER_70_REFERENCE_REGISTRY.length - origCount;

            return (
              <div className="bg-[#111522] border border-[#c99738]/45 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-stone-800 pb-5">
                  <div className="space-y-1.5">
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>
                        {refUi.original45Badge} ({origCount}) + {refUi.supplementary25Badge} ({suppCount}) = {MASTER_70_REFERENCE_REGISTRY.length}
                      </span>
                    </div>
                    <h3 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7]">
                      {refUi.sectionTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                      {refUi.sectionSubtitle}
                    </p>
                  </div>

                  {/* 6-Classification Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setRef70ClassFilter('all')}
                      className={`px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                        ref70ClassFilter === 'all'
                          ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                          : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                      }`}
                    >
                      {refUi.allClassifications} ({MASTER_70_REFERENCE_REGISTRY.length})
                    </button>
                    {CLASSIFICATION_ORDER.map(cls => {
                      const clsCount = MASTER_70_REFERENCE_REGISTRY.filter(
                        e => e.classification === cls
                      ).length;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setRef70ClassFilter(ref70ClassFilter === cls ? 'all' : cls)}
                          className={`px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                            ref70ClassFilter === cls
                              ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                              : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                          }`}
                        >
                          {refUi.classifications[cls]} ({clsCount})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Non-Conflation Historical Disclaimer */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#240610] via-[#141929] to-[#1a0912] border border-[#d4af37]/40 text-xs text-stone-200 leading-relaxed flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{refUi.nonConflationDisclaimer}</span>
                </div>

                {/* Categorized 74-Name Cross-Reference Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible70Entries.map((refEntry: Reference70Entry) => {
                    const locLabel = refEntry.localizedLabel[language] || refEntry.localizedLabel.en;
                    const locNote =
                      refEntry.historicalContextNote[language] || refEntry.historicalContextNote.en;
                    const classLabel =
                      refUi.classifications[refEntry.classification] || refEntry.classification;
                    const primaryHeritageId = refEntry.relatedHeritageIds[0];
                    const primaryProminentLabelId = refEntry.relatedProminentLabelIds[0];

                    return (
                      <div
                        key={refEntry.id}
                        className={`rounded-2xl p-4 flex flex-col justify-between gap-3 border transition-all ${
                          refEntry.requiresVerification
                            ? 'bg-[#17121e] border-amber-500/40 hover:border-amber-400'
                            : 'bg-[#141928] border-[#c99738]/30 hover:border-[#d4af37]'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                refEntry.datasetGroup === 'original_45'
                                  ? 'bg-[#580014] text-[#fae29c] border-[#d4af37]/40'
                                  : 'bg-[#1a253a] text-cyan-200 border-cyan-500/30'
                              }`}
                            >
                              #{refEntry.order}/{MASTER_70_REFERENCE_REGISTRY.length} •{' '}
                              {refEntry.datasetGroup === 'original_45'
                                ? refUi.original45Badge
                                : refUi.supplementary25Badge}
                            </span>

                            <span className="px-2 py-0.5 rounded bg-stone-900 text-[10px] font-semibold text-[#d4af37] border border-stone-700">
                              {classLabel}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-royal-heading font-bold text-base text-[#fae29c]">
                              {locLabel}
                            </h4>
                            {locLabel !== refEntry.canonicalTerm && (
                              <div className="text-[11px] font-semibold text-[#d4af37]">
                                {refEntry.canonicalTerm}
                              </div>
                            )}
                          </div>

                          {refEntry.requiresVerification && (
                            <div className="px-2.5 py-1 rounded-lg bg-amber-950/70 border border-amber-500/40 text-[10px] font-semibold text-amber-200">
                              ⚠ {refUi.requiresVerificationBadge}
                            </div>
                          )}

                          <p className="text-xs text-stone-300 leading-relaxed">{locNote}</p>
                        </div>

                        <div className="pt-2.5 border-t border-stone-800/80 space-y-2">
                          {/* Related Heritage Articles Links */}
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[10px] font-bold text-[#d4af37]">
                              {refUi.relatedTopicsLabel}:
                            </span>
                            {refEntry.relatedHeritageIds.slice(0, 3).map(hId => (
                              <button
                                key={hId}
                                type="button"
                                onClick={() => handleNavigateRelatedId(hId)}
                                className="px-2 py-0.5 rounded bg-stone-900 hover:bg-[#580014] text-[10px] text-stone-200 hover:text-[#fae29c] border border-stone-700 transition-colors cursor-pointer"
                              >
                                ⇄ {resolveRelatedLabel(hId)}
                              </button>
                            ))}
                          </div>

                          {/* Keywords */}
                          <div className="flex flex-wrap gap-1">
                            {refEntry.relatedTopicsAndKeywords.slice(0, 4).map(kw => (
                              <button
                                key={kw}
                                type="button"
                                onClick={() => setSearchTerm(kw)}
                                className="px-1.5 py-0.5 rounded bg-stone-950 hover:bg-stone-800 text-[9px] text-amber-200/90 border border-stone-800 cursor-pointer"
                              >
                                #{translateKeyword(kw)}
                              </button>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                            {primaryHeritageId && (
                              <button
                                type="button"
                                onClick={() => handleNavigateRelatedId(primaryHeritageId)}
                                className="px-2.5 py-1 rounded-lg bg-[#580014] hover:bg-[#78001c] text-[11px] font-semibold text-[#fae29c] border border-[#d4af37]/40 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>{refUi.openLinkedArticleLabel}</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                            {primaryProminentLabelId && (
                              <button
                                type="button"
                                onClick={() =>
                                  onNavigate(
                                    `/community-prominent-persons?label=${encodeURIComponent(
                                      primaryProminentLabelId
                                    )}&alias=${encodeURIComponent(refEntry.canonicalTerm)}`
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-[11px] font-semibold text-[#d4af37] border border-stone-700 transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <span>{refUi.viewProminentFiguresLabel}</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
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
                    <figure className="relative h-48 w-full overflow-hidden bg-stone-950 border-b border-stone-800/80">
                      <img
                        src={primaryVis ? primaryVis.imageUrl : fallbackArchiveImg}
                        alt={primaryVis ? primaryVis.altText[language] || primaryVis.altText.en : titleText}
                        loading="lazy"
                        onError={handleImgError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-black/30" />
                      {primaryVis && (
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/75 text-[#fae29c] border border-[#d4af37]/40 text-[10px] font-semibold backdrop-blur-sm">
                          {step5Ui.visualTypeLabels[primaryVis.visualType] || primaryVis.visualType}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-[#580014]/90 text-[#fcedc7] border border-[#d4af37]/40 text-[10px] font-semibold backdrop-blur-sm">
                        {cat.references.length} {step3Labels.referencesHeading.split(' ')[0]}
                      </span>
                      {primaryVis && (
                        <figcaption className="absolute bottom-2 left-4 right-4 text-[11px] text-stone-200 font-medium line-clamp-1">
                          {primaryVis.title[language] || primaryVis.title.en} •{' '}
                          <span className="text-stone-400">{primaryVis.sourceAttribution}</span>
                        </figcaption>
                      )}
                    </figure>

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
                  onClick={() => openFigureModal(fig)}
                  className="bg-[#121624] border border-[#c99738]/30 hover:border-[#d4af37] rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(201,151,56,0.2)]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                    <img
                      src={fig.image_url || fallbackArchiveImg}
                      alt={`${displayName} — ${displayTitle}`}
                      loading="lazy"
                      onError={handleImgError}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#580014]/90 text-[#fcedc7] border border-[#d4af37]/40 backdrop-blur-sm">
                        {step5Ui.figuresTab.epigraphicStatus[fig.epigraphic_status] || fig.epigraphic_status}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/75 text-[#fae29c] border border-stone-700 backdrop-blur-sm">
                        {fig.canonical_sources.length} {step3Labels.referencesHeading.split(' ')[0]}
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

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-stone-400">
                        <span>⏳ {fig.reign_or_dates}</span>
                        {fig.dynasty_lineage && (
                          <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300 truncate max-w-[200px]">
                            👑 {fig.dynasty_lineage}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                        {displaySummary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400 truncate max-w-[160px]">
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
                const regVis = STEP4_VISUAL_ASSET_REGISTRY[reg.id];

                return (
                  <div
                    key={reg.id}
                    onClick={() => openRegionModal(reg)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#201520] border-[#d4af37] shadow-lg shadow-[#580014]/20'
                        : 'bg-[#121624] border-stone-800 hover:border-stone-700 hover:bg-[#161b2e]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <img
                        src={regVis ? regVis.imageUrl : fallbackArchiveImg}
                        alt={regTitle}
                        loading="lazy"
                        onError={handleImgError}
                        className="w-14 h-14 rounded-xl object-cover border border-[#d4af37]/40 shrink-0 bg-stone-950"
                      />
                      <div className="space-y-1.5 min-w-0 pr-1 flex-1">
                        <h4 className={`text-sm font-bold leading-snug ${isSelected ? 'text-[#fae29c]' : 'text-stone-200'}`}>
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
                  onClick={() => openRegionModal(activeReg)}
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
                  onClick={() => openMonographModal(sec.id)}
                  className="space-y-4 pb-6 border-b border-stone-800/60 last:border-0 cursor-pointer p-4 -mx-4 rounded-2xl hover:bg-stone-900/40 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] group-hover:text-white transition-colors">
                      {secTitle}
                    </h3>
                    <span className="px-3 py-1 rounded-lg bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 text-xs font-sans font-semibold shrink-0 inline-flex items-center gap-1">
                      <span>{step5Ui.monographTab.openChapterBtn}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
