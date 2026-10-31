import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  List,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Printer,
  Download,
  Home,
  X,
  Crown,
  Scroll,
  Landmark,
  FileText,
  Clock,
  CheckCircle2,
  Tag,
  Hash
} from 'lucide-react';
import { Article, SourceReference, LanguageCode } from '../types';
import { EvidenceBadge } from './EvidenceBadge';
import { TranslationMatrixBadge } from './TranslationMatrixBadge';
import { PublisherCreditCard } from './PublisherCreditCard';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import {
  downloadArticleAsPdf,
  triggerArticlePrintWithTitle,
  generateArticlePdfFilename,
  PDF_EXPORT_UI_LABELS
} from '../utils/pdfExport';
import { getAllDocumentedFigures } from '../data/documentedFiguresRepository';
import {
  getCanonicalInscriptions,
  getCanonicalDocuments,
  getCanonicalMonuments,
  getCanonicalTimelineEvents
} from '../data/archivalSeedData';

export interface ArticleDetailViewProps {
  article: Article;
  onBack?: () => void;
  onNavigate?: (path: string) => void;
  onSelectArticle?: (article: Article) => void;
  onTagClick?: (tag: string) => void;
  allArticles?: Article[];
  showLanguageSwitcher?: boolean;
  basePath?: string;
}

interface TocItem {
  id: string;
  title: string;
}

export interface MonographEnrichment {
  historicalPeriod: Record<LanguageCode, string>;
  subjectCategories: string[];
  figureIds: string[];
  inscriptionIds: string[];
  documentIds: string[];
  timelineIds: string[];
}

export const MONOGRAPH_ENRICHMENT_MAP: Record<string, MonographEnrichment> = {
  art_odra_desha_history: {
    historicalPeriod: {
      en: 'Classical Antiquity to 16th Century CE (c. 3rd Century BCE – 1568 CE)',
      hi: 'शास्त्रीय प्राचीन काल से 16वीं शताब्दी ई. (लगभग तीसरी शताब्दी ई.पू. – 1568 ई.)',
      te: 'ప్రాచీన కాలం నుండి 16వ శతాబ్దం వరకు (క్రీ.పూ. 3వ శతాబ్దం – క్రీ.శ. 1568)',
      kn: 'ಪ್ರಾಚೀನ ಕಾಲದಿಂದ 16ನೇ ಶತಮಾನದವರೆಗೆ (ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ – ಕ್ರಿ.ಶ. 1568)',
      ta: 'பண்டைய காலம் முதல் 16-ஆம் நூற்றாண்டு வரை (பொ.ஊ.மு. 3-ஆம் நூற்றாண்டு – பொ.ஊ. 1568)',
      mr: 'प्राचीन काळापासून १६ व्या शतकापर्यंत (इ.स.पू. ३ रे शतक – इ.स. १५६८)',
      or: 'ପ୍ରାଚୀନ କାଳରୁ ୧୬ଶ ଶତାବ୍ଦୀ (ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀ – ଖ୍ରୀ.ଅ. ୧୫୬୮)',
      bn: 'প্রাচীন কাল থেকে ১৬শ শতাব্দী (খ্রি.পূ. ৩য় শতাব্দী – ১৫৬৮ খ্রি.)'
    },
    subjectCategories: ['Odra Desha & Regional History', 'Historical Geography', 'Epigraphy & Territorial Borders'],
    figureIds: ['fig_king_kharavela', 'fig_anantavarman_chodaganga', 'fig_kapilendra_deva', 'fig_mukunda_deva'],
    inscriptionIds: ['insc_hathigumpha_kharavela', 'insc_korni_copper_plates', 'insc_veligalani_1458'],
    documentIds: ['doc_veligalani_grant', 'doc_madala_panji'],
    timelineIds: ['evt_01', 'evt_02', 'evt_03', 'evt_04']
  },
  art_gajapathi_kapilendra: {
    historicalPeriod: {
      en: 'Imperial Suryavamsha Gajapathi Era (1434 – 1466 CE)',
      hi: 'साम्राज्यिक सूर्यवंश गजपति युग (1434 – 1466 ई.)',
      te: 'సూర్యవంశ గజపతి సామ్రాజ్య యుగం (క్రీ.శ. 1434 – 1466)',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಯುಗ (ಕ್ರಿ.ಶ. 1434 – 1466)',
      ta: 'சூர்யவம்ச கஜபதி பேரரசு காலம் (பொ.ஊ. 1434 – 1466)',
      mr: 'सूर्यवंश गजपती साम्राज्य काळ (इ.स. १४३४ – १४६६)',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଯୁଗ (୧୪୩୪ – ୧୪୬୬ ଖ୍ରୀ.ଅ.)',
      bn: 'সূর্যবংশী গজপতি সাম্রাজ্য যুগ (১৪৩৪ – ১৪৬৬ খ্রি.)'
    },
    subjectCategories: ['Gajapathi Kingdom & Empire', 'Military Campaigns & Fortresses', 'Suryavamsha Epigraphy'],
    figureIds: ['fig_kapilendra_deva', 'fig_hamvira_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva'],
    inscriptionIds: ['insc_veligalani_1458', 'insc_lingaraja_1452', 'insc_simhachalam_1459', 'insc_srirangam_1464'],
    documentIds: ['doc_veligalani_grant', 'doc_madala_panji', 'doc_sarasvati_vilasa'],
    timelineIds: ['evt_03', 'evt_04', 'evt_05', 'evt_06', 'evt_07']
  },
  art_genealogy_methodology: {
    historicalPeriod: {
      en: 'Ancient Solar Lineage to Post-Medieval Vamsavalis (Vedic Era – 19th Century CE)',
      hi: 'प्राचीन सूर्यवंश से मध्यकालीन वंशावली तक (वैदिक काल – 19वीं शताब्दी ई.)',
      te: 'ప్రాచీన సూర్యవంశం నుండి ఆధునిక వంశావళి పరిశోధన వరకు (వేద కాలం – 19వ శతాబ్దం)',
      kn: 'ಪ್ರಾಚೀನ ಸೂರ್ಯವಂಶದಿಂದ ವಂಶಾವಳಿ ಸಂಶೋಧನೆಯವರೆಗೆ (ವೇದ ಕಾಲ – 19ನೇ ಶತಮಾನ)',
      ta: 'பண்டைய சூர்யவம்சம் முதல் வம்சாவளி ஆய்வு வரை (வேத காலம் – 19-ஆம் நூற்றாண்டு)',
      mr: 'प्राचीन सूर्यवंशापासून वंशावळ संशोधनापर्यंत (वैदिक काळ – १९ वे शतक)',
      or: 'ପ୍ରାଚୀନ ସୂର୍ଯ୍ୟବଂଶରୁ ବଂଶାବଳୀ ଗବେଷଣା ପର୍ଯ୍ୟନ୍ତ (ବୈଦିକ କାଳ – ୧୯ଶ ଶତାବ୍ଦୀ)',
      bn: 'প্রাচীন সূর্যবংশ থেকে বংশাবলী গবেষণা পর্যন্ত (বৈদিক কাল – ১৯শ শতাব্দী)'
    },
    subjectCategories: ['Dynasties and Genealogy', 'Historiographical Methodology', 'Primary Epigraphy vs. Vamsavalis'],
    figureIds: ['fig_kapilendra_deva', 'fig_purushottama_deva', 'fig_prataparudra_deva', 'fig_samrat_sagara'],
    inscriptionIds: ['insc_veligalani_1458', 'insc_lingaraja_1452', 'insc_simhachalam_prataparudra'],
    documentIds: ['doc_veligalani_grant', 'doc_madala_panji', 'doc_sarasvati_vilasa'],
    timelineIds: ['evt_03', 'evt_05', 'evt_08', 'evt_09']
  },
  art_oad_rajputh_od_history: {
    historicalPeriod: {
      en: 'Classical Antiquity to Modern Diaspora (c. 2nd Century BCE – Present)',
      hi: 'प्राचीन काल से आधुनिक विस्तार तक (लगभग दूसरी शताब्दी ई.पू. – वर्तमान)',
      te: 'ప్రాచీన కాలం నుండి ఆధునిక విస్తరణ వరకు (క్రీ.పూ. 2వ శతాబ్దం – నేటి వరకు)',
      kn: 'ಪ್ರಾಚೀನ ಕಾಲದಿಂದ ಆಧುನಿಕ ವಿಸ್ತರಣೆಯವರೆಗೆ (ಕ್ರಿ.ಪೂ. 2ನೇ ಶತಮಾನ – ಪ್ರಸ್ತುತ)',
      ta: 'பண்டைய காலம் முதல் தற்காலம் வரை (பொ.ஊ.மு. 2-ஆம் நூற்றாண்டு – நிகழ்காலம்)',
      mr: 'प्राचीन काळापासून आधुनिक विस्तारापर्यंत (इ.स.पू. २ रे शतक – वर्तमान)',
      or: 'ପ୍ରାଚୀନ କାଳରୁ ଆଧୁନିକ ଯୁଗ ପର୍ଯ୍ୟନ୍ତ (ଖ୍ରୀ.ପୂ. ୨ୟ ଶତାବ୍ଦୀ – ବର୍ତ୍ତମାନ)',
      bn: 'প্রাচীন কাল থেকে আধুনিক যুগ পর্যন্ত (খ্রি.পূ. ২য় শতাব্দী – বর্তমান)'
    },
    subjectCategories: ['Culture & Heritage', 'Oad-Rajput & Od-Kshatriya Lineage', 'Regional Synonyms & Hydraulic Engineering'],
    figureIds: ['fig_samrat_sagara', 'fig_maharshi_bhagiratha', 'fig_king_kharavela', 'fig_goddess_jasma', 'fig_shivayogi_siddharama'],
    inscriptionIds: ['insc_hathigumpha_kharavela', 'insc_veligalani_1458', 'insc_srirangam_1464'],
    documentIds: ['doc_veligalani_grant', 'doc_madala_panji'],
    timelineIds: ['evt_01', 'evt_04', 'evt_06', 'evt_07']
  },
  art_surya_vamsa_sagara_rama: {
    historicalPeriod: {
      en: 'Treta Yuga Epic Antiquity to 1st Century BCE (Ikshvaku Solar Lineage & Kharavela Era)',
      hi: 'त्रेता युग पौराणिक काल से प्रथम शताब्दी ई.पू. (इक्ष्वाकु सूर्यवंश एवं खारवेल युग)',
      te: 'త్రేతాయుగ పురాణ కాలం నుండి క్రీ.పూ. 1వ శతాబ్దం వరకు (ఇక్ష్వాకు సూర్యవంశం & ఖారవేలుని యుగం)',
      kn: 'ತ್ರೇತಾಯುಗದ ಪುರಾಣ ಕಾಲದಿಂದ ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನದವರೆಗೆ (ಇಕ್ಷ್ವಾಕು ಸೂರ್ಯವಂಶ ಮತ್ತು ಖಾರವೇಲ ಯುಗ)',
      ta: 'திரேதா யுக புராண காலம் முதல் பொ.ஊ.மு. 1-ஆம் நூற்றாண்டு வரை (இக்ஷ்வாகு சூர்யவம்சம் & காரவேலர் காலம்)',
      mr: 'त्रेतायुग पौराणिक काळापासून इ.स.पू. १ ल्या शतकापर्यंत (इक्ष्वाकू सूर्यवंश आणि खारवेल युग)',
      or: 'ତ୍ରେତୟା ଯୁଗ ପୌରାଣିକ କାଳରୁ ଖ୍ରୀ.ପୂ. ୧ମ ଶତାବ୍ଦୀ (ଇକ୍ଷ୍ୱାକୁ ସୂର୍ଯ୍ୟବଂଶ ଓ ଖାରବେଳ ଯୁଗ)',
      bn: 'ত্রেতাযুগ পৌরাণিক কাল থেকে খ্রি.পূ. ১ম শতাব্দী (ইক্ষ্বাকু সূর্যবংশ ও খারবেল যুগ)'
    },
    subjectCategories: ['Kings and Queens', 'Suryavamsha Progenitors', 'Sacred & Epigraphic Continuity'],
    figureIds: ['fig_samrat_sagara', 'fig_maharshi_bhagiratha', 'fig_sri_rama', 'fig_king_kharavela'],
    inscriptionIds: ['insc_hathigumpha_kharavela', 'insc_veligalani_1458'],
    documentIds: ['doc_veligalani_grant'],
    timelineIds: ['evt_01', 'evt_03', 'evt_05']
  },
  art_kolletikota_peddintlamma_lake: {
    historicalPeriod: {
      en: 'Medieval Gajapathi Garrison Era to Living Tradition (c. 11th – 16th Century CE & Present)',
      hi: 'मध्यकालीन गजपति दुर्ग काल से जीवंत परंपरा तक (11वीं – 16वीं शताब्दी ई. एवं वर्तमान)',
      te: 'మధ్యయుగ గజపతి జలదుర్గ కాలం నుండి నేటి సజీవ సంప్రదాయం వరకు (11వ – 16వ శతాబ్దం & వర్తమానం)',
      kn: 'ಮಧ್ಯಕಾಲೀನ ಗಜಪತಿ ಜಲದುರ್ಗ ಕಾಲದಿಂದ ಜೀವಂತ ಸಂಪ್ರದಾಯದವರೆಗೆ (11ನೇ – 16ನೇ ಶತಮಾನ ಮತ್ತು ಪ್ರಸ್ತುತ)',
      ta: 'இடைக்கால கஜபதி நீர்க்கோட்டை காலம் முதல் வாழும் மரபு வரை (11 – 16-ஆம் நூற்றாண்டு & நிகழ்காலம்)',
      mr: 'मध्ययुगीन गजपती जलदुर्ग काळापासून जिवंत परंपरेपर्यंत (११ वे – १६ वे शतक आणि वर्तमान)',
      or: 'ମଧ୍ୟଯୁଗୀୟ ଗଜପତି ଜଳଦୁର୍ଗ କାଳରୁ ଜୀବନ୍ତ ପରମ୍ପରା ପର୍ଯ୍ୟନ୍ତ (୧୧ଶ – ୧୬ଶ ଶତାବ୍ଦୀ ଓ ବର୍ତ୍ତମାନ)',
      bn: 'মধ্যযুগীয় গজপতি জলদুর্গ কাল থেকে জীবন্ত ঐতিহ্য পর্যন্ত (১১শ – ১৬শ শতাব্দী ও বর্তমান)'
    },
    subjectCategories: ['Culture & Heritage', 'Kolletikota Aquatic Citadel (Jala Durga)', 'Sri Peddintlamma Thalli'],
    figureIds: ['fig_kolletikota_peddintlamma', 'fig_kapilendra_deva', 'fig_hamvira_deva', 'fig_prataparudra_deva'],
    inscriptionIds: ['insc_veligalani_1458', 'insc_potavaram_1489', 'insc_kondapalli_1519'],
    documentIds: ['doc_veligalani_grant', 'doc_madala_panji'],
    timelineIds: ['evt_04', 'evt_06', 'evt_08', 'evt_09']
  },
  art_epigraphic_evolution_odra: {
    historicalPeriod: {
      en: 'Two Millennia of Paleography & Royal Charters (c. 3rd Century BCE – 16th Century CE)',
      hi: 'दो सहस्राब्दियों का पुरालेख एवं राजपत्र इतिहास (लगभग तीसरी शताब्दी ई.पू. – 16वीं शताब्दी ई.)',
      te: 'రెండు సహస్రాబ్దాల శాసన & లిపి పరిణామ చరిత్ర (క్రీ.పూ. 3వ శతాబ్దం – క్రీ.శ. 16వ శతాబ్దం)',
      kn: 'ಎರಡು সহಸ್ರಮಾನಗಳ ಶಾಸನ ಮತ್ತು ಲಿಪಿ ವಿಕಾಸ (ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ – ಕ್ರಿ.ಶ. 16ನೇ ಶತಮಾನ)',
      ta: 'இரண்டாயிரம் ஆண்டுகால கல்வெட்டு மற்றும் எழுத்துமுறை வரலாறு (பொ.ஊ.மு. 3-ஆம் நூற்றாண்டு – பொ.ஊ. 16-ஆம் நூற்றாண்டு)',
      mr: 'दोन सहस्रकांचा शिलालेख आणि लिपी विकास (इ.स.पू. ३ रे शतक – इ.स. १६ वे शतक)',
      or: 'ଦୁଇ ସହସ୍ରାବ୍ଦର ଶିଳାଲେଖ ଓ ଲିପି ବିବର୍ତ୍ତନ (ଖ୍ରୀ.ପୂ. ୩ୟ ଶତାବ୍ଦୀ – ଖ୍ରୀ.ଅ. ୧୬ଶ ଶତାବ୍ଦୀ)',
      bn: 'দুই সহস্রাব্দের শিলালিপি ও লিপি বিবর্তন (খ্রি.পূ. ৩য় শতাব্দী – ১৬শ শতাব্দী)'
    },
    subjectCategories: ['Inscriptions and Archaeological Evidence', 'Brahmi, Sanskrit & Odia Paleography', 'Royal Copper-Plate Grants'],
    figureIds: ['fig_king_kharavela', 'fig_anantavarman_chodaganga', 'fig_langula_narasimha_deva', 'fig_kapilendra_deva', 'fig_prataparudra_deva'],
    inscriptionIds: ['insc_hathigumpha_kharavela', 'insc_korni_copper_plates', 'insc_kendupatna_plates', 'insc_veligalani_1458', 'insc_lingaraja_1452'],
    documentIds: ['doc_veligalani_grant', 'doc_madala_panji', 'doc_sarasvati_vilasa'],
    timelineIds: ['evt_01', 'evt_02', 'evt_03', 'evt_05', 'evt_06', 'evt_09']
  }
};

export function getMonographPeriod(article: Article, lang: LanguageCode): string {
  const enrichment = MONOGRAPH_ENRICHMENT_MAP[article.id];
  if (enrichment) {
    return enrichment.historicalPeriod[lang] || enrichment.historicalPeriod.en;
  }
  return article.publication_date || 'Classical & Medieval Era';
}

export function getMonographCategories(article: Article, localizedPrimaryCategory: string): string[] {
  const enrichment = MONOGRAPH_ENRICHMENT_MAP[article.id];
  if (enrichment) {
    return Array.from(new Set([localizedPrimaryCategory, ...enrichment.subjectCategories.slice(1)]));
  }
  return Array.from(new Set([localizedPrimaryCategory, ...(article.tags || []).slice(0, 2)]));
}

const ARTICLE_DETAIL_UI: Record<
  LanguageCode,
  {
    intro: string;
    backToList: string;
    returnHome: string;
    printBtn: string;
    copyLink: string;
    linkCopied: string;
    share: string;
    closeBtn: string;
    authorLabel: string;
    publishedLabel: string;
    periodLabel: string;
    statusLabel: string;
    artifactLabel: string;
    execIntroHeading: string;
    tocHeading: (count: number) => string;
    chaptersHeading: string;
    epistemicHeading: string;
    epistemicVerifiedTitle: string;
    epistemicVerifiedDesc: string;
    epistemicTradTitle: string;
    epistemicTradDesc: string;
    epistemicScholarTitle: string;
    epistemicScholarDesc: string;
    chronologyHeading: string;
    kingdomsPersonalitiesHeading: string;
    inscriptionsEvidenceHeading: string;
    conclusionHeading: string;
    conclusionDesc: string;
    sourcesHeading: (count: number) => string;
    sourcesNote: string;
    verifiedSource: string;
    relatedHeading: string;
    relatedKingdomsHeading: string;
    keywordsHeading: string;
    hashtagsHeading: string;
    prevMonograph: string;
    nextMonograph: string;
    readArticleBtn: string;
    articleIdLabel: string;
    returnToTop: string;
  }
> = {
  en: {
    intro: 'Introduction & Historical Context',
    backToList: 'Back to Monographs',
    returnHome: 'Home',
    printBtn: 'Print Monograph',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied!',
    share: 'Share',
    closeBtn: 'Close',
    authorLabel: 'Author / Research Authority:',
    publishedLabel: 'Archival Publication Date:',
    periodLabel: 'Historical Period Covered:',
    statusLabel: 'Verification Status:',
    artifactLabel: 'Corroborated Historical Artifact / Location:',
    execIntroHeading: 'Short Introduction & Historical Scope',
    tocHeading: count => `Complete Monograph Chapters & Sections (${count})`,
    chaptersHeading: 'Complete Monograph Chapters & Detailed Historical Analysis',
    epistemicHeading: 'Epistemic Distinction: Verified Evidence, Traditional Accounts & Scholarly Analysis',
    epistemicVerifiedTitle: '1. Verified Epigraphic & Archaeological Evidence',
    epistemicVerifiedDesc: 'Corroborated directly by dated copper-plate charters, lithic temple edicts, and surveyed fortification remains.',
    epistemicTradTitle: '2. Traditional Chronicles & Community Accounts',
    epistemicTradDesc: 'Preserved in Puranic genealogies, royal Vamsavalis, Madala Panji annals, local Kaifiyats, and living community traditions.',
    epistemicScholarTitle: '3. Scholarly Historiographical Interpretations',
    epistemicScholarDesc: 'Evaluated through peer-reviewed critical editions (Epigraphia Indica, ASI, and university monographs) without conflating myth and epigraphy.',
    chronologyHeading: 'Chronological Events & Historical Timeline',
    kingdomsPersonalitiesHeading: 'Kingdoms, Dynasties & Historical Personalities Involved',
    inscriptionsEvidenceHeading: 'Available Inscriptions, Archaeological Records & Documentary Evidence',
    conclusionHeading: 'Historical Analysis & Conclusions',
    conclusionDesc: 'The primary epigraphic, literary, and archaeological records synthesized in this monograph demonstrate the historical continuity of Odra Desha, the imperial administration of the Suryavamsha Gajapathi monarchs, and the enduring heritage of the community across eastern, northern, western, and southern India.',
    sourcesHeading: count => `Source References & Scholarly Citations (${count})`,
    sourcesNote: 'Cataloged with primary epigraphic and bibliographic provenance',
    verifiedSource: 'Verified Source',
    relatedHeading: 'Related Historical Monographs & Articles',
    relatedKingdomsHeading: 'Related Kingdoms, Dynasties & Archival Portals',
    keywordsHeading: 'Relevant Keywords & Subject Index',
    hashtagsHeading: 'Research Hashtags',
    prevMonograph: 'Previous Historical Monograph',
    nextMonograph: 'Next Historical Monograph',
    readArticleBtn: 'Read Complete Monograph',
    articleIdLabel: 'Monograph ID:',
    returnToTop: '↑ Return to Top'
  },
  hi: {
    intro: 'परिचय एवं ऐतिहासिक संदर्भ',
    backToList: 'मोनोग्राफ सूची पर वापस जाएँ',
    returnHome: 'मुख्य पृष्ठ',
    printBtn: 'प्रिंट करें',
    copyLink: 'लिंक कॉपी करें',
    linkCopied: 'लिंक कॉपी हो गया!',
    share: 'साझा करें',
    closeBtn: 'बंद करें',
    authorLabel: 'लेखक / अनुसंधान प्राधिकरण:',
    publishedLabel: 'प्रकाशन तिथि:',
    periodLabel: 'ऐतिहासिक कालखंड:',
    statusLabel: 'सत्यापन स्थिति:',
    artifactLabel: 'प्रमाणित ऐतिहासिक कलाकृति / स्थान:',
    execIntroHeading: 'संक्षिप्त परिचय एवं ऐतिहासिक परिधि',
    tocHeading: count => `संपूर्ण अध्याय एवं अनुभाग (${count})`,
    chaptersHeading: 'संपूर्ण मोनोग्राफ अध्याय एवं विस्तृत ऐतिहासिक व्याख्या',
    epistemicHeading: 'साक्ष्य वर्गीकरण: प्रमाणित साक्ष्य, पारंपरिक आख्यान एवं विद्वत विश्लेषण',
    epistemicVerifiedTitle: '1. प्रमाणित शिलालेख एवं पुरातात्विक साक्ष्य',
    epistemicVerifiedDesc: 'तिथियुक्त ताम्रपत्रों, मंदिर शिलालेखों और पुरातात्विक स्मारकों द्वारा प्रत्यक्ष रूप से पुष्ट।',
    epistemicTradTitle: '2. पारंपरिक वृत्तांत एवं सामुदायिक विरासत',
    epistemicTradDesc: 'पौराणिक वंशावलियों, राजवंशीय वंशावली, मादला पंजी और कैफियतों में संरक्षित।',
    epistemicScholarTitle: '3. विद्वानों की ऐतिहासिक व्याख्याएँ',
    epistemicScholarDesc: 'आधुनिक समीक्षात्मक संस्करणों (एपिग्राफिया इंडिका, एएसआई) के माध्यम से विश्लेषित।',
    chronologyHeading: 'कालानुक्रमिक घटनाएँ एवं ऐतिहासिक समयरेखा',
    kingdomsPersonalitiesHeading: 'संबद्ध साम्राज्य, राजवंश एवं ऐतिहासिक विभूतियाँ',
    inscriptionsEvidenceHeading: 'उपलब्ध शिलालेख, पुरातात्विक अभिलेख एवं दस्तावेजी साक्ष्य',
    conclusionHeading: 'ऐतिहासिक विश्लेषण एवं निष्कर्ष',
    conclusionDesc: 'इस शोध-प्रबंध में संकलित प्राथमिक शिलालेख, साहित्यिक और पुरातात्विक प्रमाण ओड्र देश की ऐतिहासिक निरंतरता, सूर्यवंशी गजपति सम्राटों के प्रशासन और सामुदायिक विरासत को प्रमाणित करते हैं।',
    sourcesHeading: count => `स्रोत संदर्भ एवं विद्वत उद्धरण (${count})`,
    sourcesNote: 'सभी स्रोत अभिलेखीय प्राधिकरण द्वारा सूचीबद्ध',
    verifiedSource: 'सत्यापित स्रोत',
    relatedHeading: 'संबंधित ऐतिहासिक मोनोग्राफ एवं लेख',
    relatedKingdomsHeading: 'संबंधित साम्राज्य, राजवंश एवं अभिलेख पोर्टल',
    keywordsHeading: 'प्रासंगिक कीवर्ड एवं विषय',
    hashtagsHeading: 'अनुसंधान हैशटैग',
    prevMonograph: 'पिछला ऐतिहासिक मोनोग्राफ',
    nextMonograph: 'अगला ऐतिहासिक मोनोग्राफ',
    readArticleBtn: 'संपूर्ण मोनोग्राफ पढ़ें',
    articleIdLabel: 'मोनोग्राफ क्रमांक:',
    returnToTop: '↑ शीर्ष पर लौटें'
  },
  te: {
    intro: 'పరిచయం & చారిత్రక సందర్భం',
    backToList: 'మోనోగ్రాఫ్ జాబితాకు తిరిగి వెళ్ళండి',
    returnHome: 'హోమ్',
    printBtn: 'ప్రింట్',
    copyLink: 'లింక్ కాపీ చేయండి',
    linkCopied: 'లింక్ కాపీ చేయబడింది!',
    share: 'షేర్',
    closeBtn: 'మూసివేయండి',
    authorLabel: 'రచయిత / పరిశోధనా సంస్థ:',
    publishedLabel: 'ప్రచురణ తేదీ:',
    periodLabel: 'చారిత్రక కాలం:',
    statusLabel: 'పరిశోధన స్థితి:',
    artifactLabel: 'ధృవీకరించబడిన చారిత్రక ప్రదేశం / ఆధారం:',
    execIntroHeading: 'సంక్షిప్త పరిచయం & చారిత్రక పరిధి',
    tocHeading: count => `పూర్తి అధ్యాయాలు & విభాగాలు (${count})`,
    chaptersHeading: 'పూర్తి మోనోగ్రాఫ్ అధ్యాయాలు & సమగ్ర చారిత్రక వివరణ',
    epistemicHeading: 'ఆధారాల విశ్లేషణ: ధృవీకరించబడిన సాక్ష్యాలు, సాంప్రదాయ కథనాలు & పరిశోధన',
    epistemicVerifiedTitle: '1. ధృవీకరించబడిన శాసన & పురావస్తు ఆధారాలు',
    epistemicVerifiedDesc: 'తామ్రపత్ర శాసనాలు, ఆలయ శిలాశాసనాలు మరియు కోటల పురావస్తు ఆధారాలతో నిర్ధారించబడినవి.',
    epistemicTradTitle: '2. సాంప్రదాయ వంశావళులు & సామాజిక కథనాలు',
    epistemicTradDesc: 'పురాణ వంశావళులు, మాదలా పంజీ, కైఫియత్తులు మరియు తరతరాల సామాజిక వారసత్వంలో భద్రపరచబడినవి.',
    epistemicScholarTitle: '3. చరిత్రకారుల పరిశోధనా విశ్లేషణలు',
    epistemicScholarDesc: 'ఆధునిక పురావస్తు పరిశోధనలు (Epigraphia Indica, ASI) ఆధారంగా విశ్లేషించబడినవి.',
    chronologyHeading: 'కాలక్రమ సంఘటనలు & చారిత్రక కాలరేఖ',
    kingdomsPersonalitiesHeading: 'సంబంధిత రాజ్యాలు, రాజవంశాలు & చారిత్రక వ్యక్తులు',
    inscriptionsEvidenceHeading: 'అందుబాటులో ఉన్న శాసనాలు, పురావస్తు రికార్డులు & పత్ర ఆధారాలు',
    conclusionHeading: 'చారిత్రక విశ్లేషణ & ముగింపు',
    conclusionDesc: 'ఈ మోనోగ్రాఫ్‌లో పొందుపరిచిన ప్రాథమిక శాసన, సాహిత్య మరియు పురావస్తు ఆధారాలు ఓడ్ర దేశ చారిత్రక కొనసాగింపును, సూర్యవంశ గజపతి సామ్రాజ్య వైభవాన్ని మరియు సమాజ వారసత్వాన్ని చాటిచెబుతున్నాయి.',
    sourcesHeading: count => `మూల ఆధారాలు & పరిశోధనా సూచనలు (${count})`,
    sourcesNote: 'పురావస్తు ప్రమాణాల ప్రకారం జాబితా చేయబడిన ఆధారాలు',
    verifiedSource: 'ధృవీకరించబడిన ఆధారం',
    relatedHeading: 'సంబంధిత చారిత్రక మోనోగ్రాఫ్‌లు & వ్యాసాలు',
    relatedKingdomsHeading: 'సంబంధిత రాజ్యాలు, రాజవంశాలు & చారిత్రక విభాగాలు',
    keywordsHeading: 'సంబంధిత కీవర్డ్‌లు',
    hashtagsHeading: 'పరిశోధనా హ్యాష్‌ట్యాగ్‌లు',
    prevMonograph: 'మునుపటి చారిత్రక మోనోగ్రాఫ్',
    nextMonograph: 'తదుపరి చారిత్రక మోనోగ్రాఫ్',
    readArticleBtn: 'పూర్తి మోనోగ్రాఫ్ చదవండి',
    articleIdLabel: 'మోనోగ్రాఫ్ సంఖ్య:',
    returnToTop: '↑ పైకి వెళ్ళండి'
  },
  kn: {
    intro: 'ಪರಿಚಯ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಂದರ್ಭ',
    backToList: 'ಮೊನೊಗ್ರಾಫ್ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ',
    returnHome: 'ಮುಖಪುಟ',
    printBtn: 'ಮುದ್ರಿಸಿ',
    copyLink: 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    linkCopied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    closeBtn: 'ಮುಚ್ಚಿ',
    authorLabel: 'ಲೇಖಕರು / ಸಂಶೋಧನಾ ಪ್ರಾಧಿಕಾರ:',
    publishedLabel: 'ಪ್ರಕಟಣೆ ದಿನಾಂಕ:',
    periodLabel: 'ಐತಿಹಾಸಿಕ ಕಾಲಘಟ್ಟ:',
    statusLabel: 'ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ:',
    artifactLabel: 'ದೃಢೀಕೃತ ಐತಿಹಾಸಿಕ ಸ್ಥಳ / ಸ್ಮಾರಕ:',
    execIntroHeading: 'ಸಂಕ್ಷಿಪ್ತ ಪರಿಚಯ ಮತ್ತು ಐತಿಹಾಸಿಕ ವ್ಯಾಪ್ತಿ',
    tocHeading: count => `ಸಂಪೂರ್ಣ ಅಧ್ಯಾಯಗಳು ಮತ್ತು ವಿಭಾಗಗಳು (${count})`,
    chaptersHeading: 'ಸಂಪೂರ್ಣ ಮೊನೊಗ್ರಾಫ್ ಅಧ್ಯಾಯಗಳು ಮತ್ತು ವಿವರವಾದ ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆ',
    epistemicHeading: 'ಸಾಕ್ಷ್ಯ ವರ್ಗೀಕರಣ: ದೃಢೀಕೃತ ಸಾಕ್ಷ್ಯ, ಸಂಪ್ರದಾಯ ಮತ್ತು ವಿದ್ವತ್ ವಿಶ್ಲೇಷಣೆ',
    epistemicVerifiedTitle: '1. ದೃಢೀಕೃತ ಶಾಸನ ಮತ್ತು ಪುರಾತತ್ವ ಸಾಕ್ಷ್ಯ',
    epistemicVerifiedDesc: 'ತಾಮ್ರಪತ್ರಗಳು, ದೇವಾಲಯದ ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ ಸ್ಮಾರಕಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.',
    epistemicTradTitle: '2. ಸಾಂಪ್ರದಾಯಿಕ ವಂಶಾವಳಿ ಮತ್ತು ಸಮುದಾಯ ಖಾತೆಗಳು',
    epistemicTradDesc: 'ಪುರಾಣ ವಂಶಾವಳಿಗಳು, ಮಾದಲಾ ಪಂಜಿ, ಕೈಫಿಯತ್ತುಗಳು ಮತ್ತು ಸಮುದಾಯ ಪರಂಪರೆಯಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ.',
    epistemicScholarTitle: '3. ವಿದ್ವಾಂಸರ ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆಗಳು',
    epistemicScholarDesc: 'ಆಧುನಿಕ ಶಾಸನ ಸಂಶೋಧನೆಗಳ (Epigraphia Indica, ASI) ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ.',
    chronologyHeading: 'ಕಾಲಾನುಕ್ರಮದ ಘಟನೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ',
    kingdomsPersonalitiesHeading: 'ಸಂಬಂಧಿತ ಸಾಮ್ರಾಜ್ಯಗಳು, ರಾಜವಂಶಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
    inscriptionsEvidenceHeading: 'ಲಭ್ಯವಿರುವ ಶಾಸನಗಳು, ಪುರಾತತ್ವ ದಾಖಲೆಗಳು ಮತ್ತು ಸಾಕ್ಷ್ಯಾಧಾರಗಳು',
    conclusionHeading: 'ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ತೀರ್ಮಾನ',
    conclusionDesc: 'ಈ ಮೊನೊಗ್ರಾಫ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ಶಾಸನ, ಸಾಹಿತ್ಯ ಮತ್ತು ಪುರಾತತ್ವ ಆಧಾರಗಳು ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ನಿರಂತರತೆ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಹಿರಿಮೆಯನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತವೆ.',
    sourcesHeading: count => `ಮೂಲ ಆಧಾರಗಳು ಮತ್ತು ವಿದ್ವತ್ ಉಲ್ಲೇಖಗಳು (${count})`,
    sourcesNote: 'ಪತ್ರಾಗಾರ ಪ್ರಾಧಿಕಾರದಿಂದ ಪಟ್ಟಿ ಮಾಡಲಾದ ಆಕರಗಳು',
    verifiedSource: 'ದೃಢೀಕೃತ ಆಕರ',
    relatedHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಮೊನೊಗ್ರಾಫ್‌ಗಳು ಮತ್ತು ಲೇಖನಗಳು',
    relatedKingdomsHeading: 'ಸಂಬಂಧಿತ ಸಾಮ್ರಾಜ್ಯಗಳು ಮತ್ತು ರಾಜವಂಶಗಳು',
    keywordsHeading: 'ಸಂಬಂಧಿತ ಕೀವರ್ಡ್‌ಗಳು',
    hashtagsHeading: 'ಸಂಶೋಧನಾ ಹ್ಯಾಶ್‌ಟ್ಯಾಗ್‌ಗಳು',
    prevMonograph: 'ಹಿಂದಿನ ಐತಿಹಾಸಿಕ ಮೊನೊಗ್ರಾಫ್',
    nextMonograph: 'ಮುಂದಿನ ಐತಿಹಾಸಿಕ ಮೊನೊಗ್ರಾಫ್',
    readArticleBtn: 'ಪೂರ್ಣ ಮೊನೊಗ್ರಾಫ್ ಓದಿ',
    articleIdLabel: 'ಮೊನೊಗ್ರಾಫ್ ಸಂಖ್ಯೆ:',
    returnToTop: '↑ ಮೇಲಕ್ಕೆ ಹಿಂತಿರುಗಿ'
  },
  ta: {
    intro: 'அறிமுகம் & வரலாற்றுப் பின்னணி',
    backToList: 'ஆய்வுக் கட்டுரைப் பட்டியலுக்குத் திரும்பு',
    returnHome: 'முகப்பு',
    printBtn: 'அச்சிடு',
    copyLink: 'இணைப்பை நகலெடு',
    linkCopied: 'நகலெடுக்கப்பட்டது!',
    share: 'பகிர்',
    closeBtn: 'மூடு',
    authorLabel: 'ஆசிரியர் / ஆராய்ச்சி குழு:',
    publishedLabel: 'வெளியீடு:',
    periodLabel: 'வரலாற்றுக் காலம்:',
    statusLabel: 'ஆய்வு நிலை:',
    artifactLabel: 'சரிபார்க்கப்பட்ட வரலாற்றுச் சின்னம் / இடம்:',
    execIntroHeading: 'சுருக்கமான அறிமுகம் மற்றும் வரலாற்று எல்லை',
    tocHeading: count => `முழு அத்தியாயங்கள் மற்றும் பிரிவுகள் (${count})`,
    chaptersHeading: 'முழு ஆய்வுக் கட்டுரை அத்தியாயங்கள் மற்றும் விரிவான வரலாற்று விளக்கம்',
    epistemicHeading: 'சான்று வகைப்பாடு: கல்வெட்டுச் சான்றுகள், மரபு மற்றும் அறிஞர் ஆய்வு',
    epistemicVerifiedTitle: '1. உறுதிப்படுத்தப்பட்ட கல்வெட்டு & தொல்லியல் சான்றுகள்',
    epistemicVerifiedDesc: 'செப்பேடுகள், கோயில் கல்வெட்டுகள் மற்றும் தொல்லியல் சின்னங்களால் உறுதிப்படுத்தப்பட்டவை.',
    epistemicTradTitle: '2. பாரம்பரிய வம்சாவளி மற்றும் சமூக வரலாறுகள்',
    epistemicTradDesc: 'புராண வம்சாவளிகள், மாதளா பஞ்சி, கைஃபியத்துகள் மற்றும் சமூக மரபில் பாதுகாக்கப்பட்டவை.',
    epistemicScholarTitle: '3. அறிஞர்களின் வரலாற்று ஆய்வுகள்',
    epistemicScholarDesc: 'நவீன கல்வெட்டு ஆய்வுகள் (Epigraphia Indica, ASI) மூலம் பகுப்பாய்வு செய்யப்பட்டவை.',
    chronologyHeading: 'காலவரிசை நிகழ்வுகள் மற்றும் வரலாற்றுக் காலக்கோடு',
    kingdomsPersonalitiesHeading: 'தொடர்புடைய பேரரசுகள், அரச வம்சங்கள் மற்றும் வரலாற்று ஆளுமைகள்',
    inscriptionsEvidenceHeading: 'கல்வெட்டுகள், தொல்லியல் பதிவுகள் மற்றும் ஆவணச் சான்றுகள்',
    conclusionHeading: 'வரலாற்றுப் பகுப்பாய்வு மற்றும் முடிவுரை',
    conclusionDesc: 'இத்தொகுப்பில் உள்ள கல்வெட்டு, இலக்கிய மற்றும் தொல்லியல் ஆவணங்கள் ஒட்ர தேசத்தின் வரலாற்றுத் தொடர்ச்சியையும் சூர்யவம்ச கஜபதி பேரரசின் சிறப்பையும் எடுத்துக்காட்டுகின்றன.',
    sourcesHeading: count => `முதன்மை ஆதாரங்கள் மற்றும் மேற்கோள்கள் (${count})`,
    sourcesNote: 'ஆவணக் காப்பகத்தால் பட்டியலிடப்பட்ட ஆதாரங்கள்',
    verifiedSource: 'சரிபார்க்கப்பட்ட ஆதாரம்',
    relatedHeading: 'தொடர்புடைய வரலாற்று ஆய்வுக் கட்டுரைகள்',
    relatedKingdomsHeading: 'தொடர்புடைய பேரரசுகள் மற்றும் அரச வம்சங்கள்',
    keywordsHeading: 'முக்கிய வார்த்தைகள்',
    hashtagsHeading: 'ஆராய்ச்சி ஹேஷ்டேக்குகள்',
    prevMonograph: 'முந்தைய ஆய்வுக் கட்டுரை',
    nextMonograph: 'அடுத்த ஆய்வுக் கட்டுரை',
    readArticleBtn: 'முழு கட்டுரையைப் படிக்க',
    articleIdLabel: 'கட்டுரை எண்:',
    returnToTop: '↑ மேலே செல்ல'
  },
  mr: {
    intro: 'परिचय आणि ऐतिहासिक संदर्भ',
    backToList: 'मोनोग्राफ यादीकडे परत जा',
    returnHome: 'मुख्य पृष्ठ',
    printBtn: 'प्रिंट करा',
    copyLink: 'लिंक कॉपी करा',
    linkCopied: 'लिंक कॉपी झाली!',
    share: 'शेअर करा',
    closeBtn: 'बंद करा',
    authorLabel: 'लेखक / संशोधन प्राधिकरण:',
    publishedLabel: 'प्रकाशन तारीख:',
    periodLabel: 'ऐतिहासिक कालखंड:',
    statusLabel: 'परीक्षण स्थिती:',
    artifactLabel: 'प्रमाणित ऐतिहासिक वास्तू / ठिकाण:',
    execIntroHeading: 'संक्षिप्त प्रस्तावना आणि ऐतिहासिक व्याप्ती',
    tocHeading: count => `संपूर्ण प्रकरणे आणि विभाग (${count})`,
    chaptersHeading: 'संपूर्ण मोनोग्राफ प्रकरणे आणि सविस्तर ऐतिहासिक विश्लेषण',
    epistemicHeading: 'पुरावा वर्गीकरण: प्रमाणित पुरावे, परंपरा आणि संशोधन विश्लेषण',
    epistemicVerifiedTitle: '१. प्रमाणित शिलालेख आणि पुरातत्त्वीय पुरावे',
    epistemicVerifiedDesc: 'ताम्रपट, मंदिर शिलालेख आणि किल्ल्यांच्या पुरातत्त्वीय अवशेषांद्वारे पुष्टी केलेले.',
    epistemicTradTitle: '२. पारंपारिक वंशावळी आणि सामुदायिक आख्यायिका',
    epistemicTradDesc: 'पौराणिक वंशावळी, मादला पंजी, कैफियत आणि सामुदायिक वारशात जतन केलेले.',
    epistemicScholarTitle: '३. विद्वानांचे ऐतिहासिक विश्लेषण',
    epistemicScholarDesc: 'आधुनिक शिलालेख संशोधनाद्वारे (Epigraphia Indica, ASI) विश्लेषित.',
    chronologyHeading: 'कालानुक्रमिक घटना आणि ऐतिहासिक कालरेषा',
    kingdomsPersonalitiesHeading: 'संबंधित साम्राज्ये, राजवंश आणि ऐतिहासिक विभूती',
    inscriptionsEvidenceHeading: 'उपलब्ध शिलालेख, पुरातत्त्वीय नोंदी आणि दस्तऐवजी पुरावे',
    conclusionHeading: 'ऐतिहासिक विश्लेषण आणि निष्कर्ष',
    conclusionDesc: 'या मोनोग्राफमध्ये संकलित केलेले शिलालेख, साहित्यिक आणि पुरातत्त्वीय पुरावे ओड्र देशाचे ऐतिहासिक सातत्य आणि सूर्यवंशी गजपती साम्राज्याचे वैभव सिद्ध करतात.',
    sourcesHeading: count => `स्रोत संदर्भ आणि उद्धरणे (${count})`,
    sourcesNote: 'अभिलेख प्राधिकरणाद्वारे सूचीबद्ध स्रोत',
    verifiedSource: 'प्रमाणित स्रोत',
    relatedHeading: 'संबंधित ऐतिहासिक मोनोग्राफ आणि शोधनिबंध',
    relatedKingdomsHeading: 'संबंधित साम्राज्ये आणि राजवंश',
    keywordsHeading: 'संबंधित कीवर्ड',
    hashtagsHeading: 'संशोधन हॅशटॅग',
    prevMonograph: 'मागील ऐतिहासिक मोनोग्राफ',
    nextMonograph: 'पुढील ऐतिहासिक मोनोग्राफ',
    readArticleBtn: 'संपूर्ण मोनोग्राफ वाचा',
    articleIdLabel: 'मोनोग्राफ क्रमांक:',
    returnToTop: '↑ वर जा'
  },
  or: {
    intro: 'ପରିଚୟ ଓ ଐତିହାସିକ ପ୍ରସଙ୍ଗ',
    backToList: 'ମୋନୋଗ୍ରାଫ୍ ତାଲିକାକୁ ଫେରନ୍ତୁ',
    returnHome: 'ମୁଖ୍ୟ ପୃଷ୍ଠା',
    printBtn: 'ପ୍ରିଣ୍ଟ କରନ୍ତୁ',
    copyLink: 'ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    linkCopied: 'ଲିଙ୍କ୍ କପି ହୋଇଛି!',
    share: 'ସେୟାର କରନ୍ତୁ',
    closeBtn: 'ବନ୍ଦ କରନ୍ତୁ',
    authorLabel: 'ଲେଖକ / ଗବେଷଣା ପରିଷଦ:',
    publishedLabel: 'ପ୍ରକାଶନ ତାରିଖ:',
    periodLabel: 'ଐତିହାସିକ କାଳଖଣ୍ଡ:',
    statusLabel: 'ସମୀକ୍ଷା ସ୍ଥିତି:',
    artifactLabel: 'ପ୍ରମାଣିତ ଐତିହାସିକ କীর୍ତ୍ତି / ସ୍ଥାନ:',
    execIntroHeading: 'ସଂକ୍ଷିପ୍ତ ପରିଚୟ ଓ ଐତିହାସିକ ପରିସର',
    tocHeading: count => `ସମ୍ପୂର୍ଣ୍ଣ ଅଧ୍ୟାୟ ଓ ବିଭାଗ (${count})`,
    chaptersHeading: 'ସମ୍ପୂର୍ଣ୍ଣ ମୋନୋଗ୍ରାଫ୍ ଅଧ୍ୟାୟ ଓ ବିସ୍ତୃତ ଐତିହାସିକ ବ୍ୟାଖ୍ୟା',
    epistemicHeading: 'ପ୍ରମାଣ ବର୍ଗୀକରଣ: ପ୍ରମାଣିତ ସାକ୍ଷ୍ୟ, ପରମ୍ପରା ଓ ଗବେଷଣା ବିଶ୍ଳେଷଣ',
    epistemicVerifiedTitle: '୧. ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସାକ୍ଷ୍ୟ',
    epistemicVerifiedDesc: 'ତାମ୍ରଶାସନ, ମନ୍ଦିର ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସ୍ମାରକୀ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
    epistemicTradTitle: '୨. ପାରମ୍ପରିକ ବଂଶାବଳୀ ଓ ସାମୁଦାୟିକ ବିବରଣୀ',
    epistemicTradDesc: 'ପୌରାଣିକ ବଂଶାବଳୀ, ମାଦଳା ପାଞ୍ଜି ଓ ସାମୁଦାୟିକ ଐତିହ୍ୟରେ ସଂରକ୍ଷିତ।',
    epistemicScholarTitle: '୩. ଐତିହାସିକ ଗବେଷଣା ଓ ବିଶ୍ଳେଷଣ',
    epistemicScholarDesc: 'ଆଧୁନିକ ଶିଳାଲେଖ ଗବେଷଣା (Epigraphia Indica, ASI) ମାଧ୍ୟମରେ ବିଶ୍ଳେଷିତ।',
    chronologyHeading: 'କାଳାନୁକ୍ରମିକ ଘଟଣାବଳୀ ଓ ଐତିହାସିକ ସମୟরেଖା',
    kingdomsPersonalitiesHeading: 'ସମ୍ପୃକ୍ତ ସାମ୍ରାଜ୍ୟ, ରାଜବଂଶ ଓ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
    inscriptionsEvidenceHeading: 'ଉପଲବ୍ଧ ଶିଳାଲେଖ, ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖ ଓ ଦଲିଲ ପ୍ରମାଣ',
    conclusionHeading: 'ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଓ ସିଦ୍ଧାନ୍ତ',
    conclusionDesc: 'ଏହି ମୋନୋଗ୍ରାଫରେ ସଂକଳିତ ପ୍ରാଥମିକ ଶିଳାଲେଖ, ସାହିତ୍ୟିକ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ ଓଡ଼୍ର ଦେଶର ଐତିହାସିକ ଧାରା ଏବଂ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ଗୌରବକୁ ପ୍ରତିପାଦିତ କରେ।',
    sourcesHeading: count => `ମୌଳିକ ଉତ୍ସ ଓ ଗବେଷଣା ପ୍ରମାଣ (${count})`,
    sourcesNote: 'ଅଭିଲେଖ କର୍ତ୍ତୃପକ୍ଷଙ୍କ ଦ୍ୱାରା ତାଲିକାଭୁକ୍ତ ଉତ୍ସ',
    verifiedSource: 'ପ୍ରମାଣିତ ଉତ୍ସ',
    relatedHeading: 'ସମ୍ପୃକ୍ତ ଐତିହାସିକ ମୋନୋଗ୍ରାଫ୍ ଓ ପ୍ରବନ୍ଧ',
    relatedKingdomsHeading: 'ସମ୍ପୃକ୍ତ ସାମ୍ରାଜ୍ୟ ଓ ରାଜବଂଶ',
    keywordsHeading: 'ସମ୍ପୃକ୍ତ କିୱାର୍ଡ',
    hashtagsHeading: 'ଗବେଷଣା ହ୍ୟାଶଟ୍ୟାଗ୍',
    prevMonograph: 'ପୂର୍ବବର୍ତ୍ତୀ ଐତିହାସିକ ମୋନୋଗ୍ରାଫ୍',
    nextMonograph: 'ପରବର୍ତ୍ତୀ ଐତିହାସିକ ମୋନୋଗ୍ରାଫ୍',
    readArticleBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ମୋନୋଗ୍ରାଫ୍ ପଢ଼ନ୍ତୁ',
    articleIdLabel: 'ମୋନୋଗ୍ରାଫ୍ କ୍ରମାଙ୍କ:',
    returnToTop: '↑ ଉପରକୁ ଫେରନ୍ତୁ'
  },
  bn: {
    intro: 'ভূমিকা ও ঐতিহাসিক প্রেক্ষাপট',
    backToList: 'মনোগ্রাফ তালিকায় ফিরে যান',
    returnHome: 'হোম পেজ',
    printBtn: 'প্রিন্ট করুন',
    copyLink: 'লিঙ্ক কপি করুন',
    linkCopied: 'লিঙ্ক কপি হয়েছে!',
    share: 'শেয়ার করুন',
    closeBtn: 'বন্ধ করুন',
    authorLabel: 'লেখক / গবেষণা কর্তৃপক্ষ:',
    publishedLabel: 'প্রকাশের তারিখ:',
    periodLabel: 'ঐতিহাসিক কালপর্ব:',
    statusLabel: 'পর্যালোচনা স্থিতি:',
    artifactLabel: 'প্রমাণিত ঐতিহাসিক নিদর্শন / স্থান:',
    execIntroHeading: 'সংক্ষিপ্ত ভূমিকা ও ঐতিহাসিক পরিধি',
    tocHeading: count => `সম্পূর্ণ অধ্যায় ও বিভাগ (${count})`,
    chaptersHeading: 'সম্পূর্ণ মনোগ্রাফ অধ্যায় ও বিস্তারিত ঐতিহাসিক বিশ্লেষণ',
    epistemicHeading: 'প্রমাণ শ্রেণীবিন্যাস: প্রমাণিত সাক্ষ্য, ঐতিহ্য ও গবেষণা বিশ্লেষণ',
    epistemicVerifiedTitle: '১. প্রমাণিত শিলালিপি ও প্রত্নতাত্ত্বিক সাক্ষ্য',
    epistemicVerifiedDesc: 'তাম্রশাসন, মন্দির শিলালিপি ও প্রত্নতাত্ত্বিক নিদর্শন দ্বারা প্রমাণিত।',
    epistemicTradTitle: '২. ঐতিহ্যবাহী বংশাবলী ও সম্প্রদায়গত বিবরণী',
    epistemicTradDesc: 'পৌরাণিক বংশাবলী, মাদলা পাঁজি ও সম্প্রদায়গত ঐতিহ্যে সংরক্ষিত।',
    epistemicScholarTitle: '৩. ঐতিহাসিক গবেষণা ও বিশ্লেষণ',
    epistemicScholarDesc: 'আধুনিক লিপিতত্ত্ব গবেষণা (Epigraphia Indica, ASI) দ্বারা বিশ্লেষিত।',
    chronologyHeading: 'কালানুক্রমিক ঘটনাবলী ও ঐতিহাসিক সময়রেখা',
    kingdomsPersonalitiesHeading: 'সম্পর্কিত সাম্রাজ্য, রাজবংশ ও ঐতিহাসিক ব্যক্তিত্ব',
    inscriptionsEvidenceHeading: 'উপলব্ধ শিলালিপি, প্রত্নতাত্ত্বিক নথি ও প্রামাণ্য দলিল',
    conclusionHeading: 'ঐতিহাসিক বিশ্লেষণ ও উপসংহার',
    conclusionDesc: 'এই মনোগ্রাফে সংকলিত প্রাথমিক শিলালিপি, সাহিত্যিক ও প্রত্নতাত্ত্বিক প্রমাণসমূহ ওড্র দেশের ঐতিহাসিক ধারাবাহিকতা এবং সূর্যবংশী গজপতি সাম্রাজ্যের গৌরব তুলে ধরে।',
    sourcesHeading: count => `প্রাথমিক উৎস ও গবেষণা উদ্ধৃতি (${count})`,
    sourcesNote: 'আর্কাইভ কর্তৃপক্ষ কর্তৃক তালিকাভুক্ত উৎস',
    verifiedSource: 'যাচাইকৃত উৎস',
    relatedHeading: 'সংশ্লিষ্ট ঐতিহাসিক মনোগ্রাফ ও প্রবন্ধ',
    relatedKingdomsHeading: 'সম্পর্কিত সাম্রাজ্য ও রাজবংশ',
    keywordsHeading: 'প্রাসঙ্গিক কিওয়ার্ড',
    hashtagsHeading: 'গবেষণা হ্যাশট্যাগ',
    prevMonograph: 'পূর্ববর্তী ঐতিহাসিক মনোগ্রাফ',
    nextMonograph: 'পরবর্তী ঐতিহাসিক মনোগ্রাফ',
    readArticleBtn: 'সম্পূর্ণ মনোগ্রাফ পড়ুন',
    articleIdLabel: 'মনোগ্রাফ নম্বর:',
    returnToTop: '↑ উপরে ফিরে যান'
  }
};

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onNavigate,
  onSelectArticle,
  onTagClick,
  allArticles = [],
  showLanguageSwitcher = true,
  basePath = '/documentary'
}) => {
  const { language, setLanguage, getArticleContent, getMetadataLabel } = useLanguage();
  const ui = ARTICLE_DETAIL_UI[language] || ARTICLE_DETAIL_UI.en;
  const [copied, setCopied] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  const { title: displayTitle, summary: displaySummary, content: displayContent } = getArticleContent(article);
  const localizedCat = getMetadataLabel('category', article.category) || article.category;
  const historicalPeriod = getMonographPeriod(article, language);
  const subjectCategories = getMonographCategories(article, localizedCat);
  const enrichment = MONOGRAPH_ENRICHMENT_MAP[article.id];

  // Support automatic print when opened in external browser with ?autoprint=1
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autoprint') === '1') {
        const timer = setTimeout(() => {
          window.print();
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore
    }
  }, [article.id]);

  // Parse complete monograph chapters and sections (never truncating or omitting any line)
  const contentLines = (displayContent || '').split('\n');
  const sections: { id: string; title: string; lines: string[] }[] = [];
  let currentSecTitle = ui.intro;
  let currentSecLines: string[] = [];

  contentLines.forEach(line => {
    const trimmed = line.trim();
    const isHeader =
      (trimmed.endsWith(':') && trimmed.length < 120 && !trimmed.includes('http')) ||
      /^(\d+|[०-९]+|[౦-౯]+|[೦-೯]+|[୦-୯]+|[০-৯]+)\.?\s+\S/.test(trimmed) ||
      /^\#{1,4}\s+\S/.test(trimmed);

    if (isHeader) {
      if (currentSecLines.some(l => l.trim().length > 0)) {
        sections.push({
          id: `sec-${sections.length}`,
          title: currentSecTitle,
          lines: currentSecLines
        });
        currentSecLines = [];
      }
      currentSecTitle = trimmed.replace(/^[\#\d०-९౦-౯೦-೯୦-୯০-৯\.\s]+/, '').replace(/:$/, '');
    } else {
      currentSecLines.push(line);
    }
  });

  if (currentSecLines.some(l => l.trim().length > 0)) {
    sections.push({
      id: `sec-${sections.length}`,
      title: currentSecTitle,
      lines: currentSecLines
    });
  }

  const tocList: TocItem[] = sections.map(s => ({ id: s.id, title: s.title }));

  // Cross-reference Historical Personalities involved in this Monograph
  const allFigures = getAllDocumentedFigures(language);
  const involvedFigures = enrichment
    ? enrichment.figureIds
        .map(fid => allFigures.find(f => f.id === fid))
        .filter((f): f is NonNullable<typeof f> => Boolean(f))
    : allFigures.slice(0, 4);

  // Cross-reference Corroborating Inscriptions
  const allInscriptions = getCanonicalInscriptions(language);
  const involvedInscriptions = enrichment
    ? enrichment.inscriptionIds
        .map(iid => allInscriptions.find(i => i.id === iid))
        .filter((i): i is NonNullable<typeof i> => Boolean(i))
    : allInscriptions.slice(0, 3);

  // Cross-reference Digitized Archival Documents
  const allDocuments = getCanonicalDocuments(language);
  const involvedDocuments = enrichment
    ? enrichment.documentIds
        .map(did => allDocuments.find(d => d.id === did))
        .filter((d): d is NonNullable<typeof d> => Boolean(d))
    : allDocuments.slice(0, 2);

  // Cross-reference Temples & Monuments
  const allMonuments = getCanonicalMonuments(language);
  const involvedMonuments = allMonuments.slice(0, 2);

  // Cross-reference Chronological Timeline Events
  const allTimelineEvents = getCanonicalTimelineEvents(language);
  const involvedTimelineEvents = enrichment
    ? enrichment.timelineIds
        .map(tid => allTimelineEvents.find(e => e.id === tid))
        .filter((e): e is NonNullable<typeof e> => Boolean(e))
    : allTimelineEvents.slice(0, 4);

  // Related Articles (with small thumbnails)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id)
    .sort((a, b) => {
      const aMatch = a.category === article.category || a.tags.some(t => article.tags.includes(t)) ? 1 : 0;
      const bMatch = b.category === article.category || b.tags.some(t => article.tags.includes(t)) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 3);

  // Previous / Next Monograph navigation
  const currentIdx = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIdx > 0 ? allArticles[currentIdx - 1] : null;
  const nextArticle = currentIdx >= 0 && currentIdx < allArticles.length - 1 ? allArticles[currentIdx + 1] : null;

  // Keywords & Hashtags
  const monographKeywords = Array.from(
    new Set([localizedCat, ...subjectCategories, ...(article.tags || [])])
  );
  const monographHashtags = (article.tags || []).map(
    tag => `#${tag.replace(/[^a-zA-Z0-9]/g, '')}`
  );
  if (!monographHashtags.includes('#OdraKshatriyaHeritage')) {
    monographHashtags.push('#OdraKshatriyaHeritage', '#SuryavamshaMonographs');
  }

  const getDirectMonographUrl = (autoPrint = false): string => {
    try {
      const url = new URL(window.location.origin + basePath);
      url.searchParams.set('article', article.id);
      if (autoPrint) url.searchParams.set('autoprint', '1');
      return url.toString();
    } catch {
      return `${window.location.origin}${basePath}?article=${encodeURIComponent(article.id)}`;
    }
  };

  const handleCopyLink = (includeTitle = false) => {
    const shareUrl = getDirectMonographUrl(false);
    const textToCopy = includeTitle ? `${displayTitle} — ${shareUrl}` : shareUrl;
    navigator.clipboard?.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const articleRef = useRef<HTMLElement | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloadResult, setPdfDownloadResult] = useState<{
    filename: string;
    downloadUrl?: string;
  } | null>(null);
  const pdfUi = PDF_EXPORT_UI_LABELS[language] || PDF_EXPORT_UI_LABELS.en;

  const handleDownloadPdf = async () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setPdfDownloadResult(null);
    try {
      const result = await downloadArticleAsPdf({
        articleTitle: displayTitle,
        language,
        containerElement: articleRef.current
      });
      setPdfDownloadResult({
        filename: result.filename,
        downloadUrl: result.downloadUrl
      });
    } catch (err) {
      console.error('Monograph PDF export failed:', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handlePrint = () => {
    const ua = navigator.userAgent || '';
    const isEmbeddedWebView = /wv|WebView|Android.*Version\/[0-9]/i.test(ua);
    if (isEmbeddedWebView) {
      const printUrl = getDirectMonographUrl(true);
      window.open(printUrl, '_system');
      return;
    }
    triggerArticlePrintWithTitle(displayTitle);
  };

  const handleShare = async () => {
    const shareUrl = getDirectMonographUrl(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayTitle,
          text: displaySummary,
          url: shareUrl
        });
        return;
      } catch {
        // User cancelled or share unsupported
      }
    }
    setShareMenuOpen(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    setActiveTocId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const fallbackBanner = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_gateway.jpg`;

  return (
    <article
      ref={articleRef}
      className="print-article-container rounded-3xl bg-[#111520] border border-[#c99738]/40 overflow-hidden print:overflow-visible shadow-2xl print:shadow-none transition-all text-stone-200"
    >
      {/* STICKY TOP NAVIGATION & ACTION TOOLBAR */}
      <div className="no-print sticky top-0 z-30 bg-[#0d1019]/95 backdrop-blur-md border-b border-[#c99738]/30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-2 sm:gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#580014] hover:bg-[#74001b] text-[#fae29c] border border-[#d4af37]/60 transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{ui.backToList}</span>
            </button>
          )}

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 transition-all cursor-pointer"
            >
              <Home className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">{ui.returnHome}</span>
            </button>
          )}
        </div>

        {/* Right Action Controls: 8-Language Selector, Download PDF, Print, Share, Copy Link, Close */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {showLanguageSwitcher && (
            <div className="hidden xl:flex items-center bg-black/40 border border-stone-800 rounded-xl p-1 gap-0.5">
              {SUPPORTED_LANGUAGES.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    language === l.code
                      ? 'bg-[#c99738] text-[#290106] shadow-sm'
                      : 'text-stone-400 hover:text-white hover:bg-white/10'
                  }`}
                  title={l.label}
                >
                  {l.nativeName}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#c99738] hover:bg-[#dfb04c] text-[#290106] border border-[#f5d78e] transition-all cursor-pointer disabled:opacity-60 shadow-sm"
            title={`${pdfUi.downloadPdfBtn} (${generateArticlePdfFilename(displayTitle)})`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{isDownloadingPdf ? pdfUi.generatingPdfBtn : pdfUi.downloadPdfBtn}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#161c2a] hover:bg-[#20293d] text-stone-200 border border-stone-700 transition-all cursor-pointer"
            title={pdfUi.printBtn}
          >
            <Printer className="w-4 h-4 text-[#d4af37]" />
            <span className="hidden sm:inline">{pdfUi.printBtn}</span>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#580014] hover:bg-[#78001b] text-[#fcedc7] border border-[#d4af37]/50 transition-all cursor-pointer shadow-sm"
              title={ui.share}
            >
              <Share2 className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">{ui.share}</span>
            </button>

            {shareMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#151a28] border border-[#c99738]/50 shadow-2xl p-2 z-50 text-xs text-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    handleCopyLink(false);
                    setShareMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center gap-2.5 font-semibold cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-[#d4af37]" />
                  <span>Copy Direct Monograph Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleCopyLink(true);
                    setShareMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center gap-2.5 font-semibold cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#d4af37]" />
                  <span>Copy Title & Link</span>
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `${displayTitle} — ${getDirectMonographUrl(false)}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShareMenuOpen(false)}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 flex items-center gap-2.5 font-semibold text-emerald-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Share via WhatsApp</span>
                </a>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleCopyLink(false)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#161c2a] hover:bg-[#20293d] text-stone-200 border border-stone-700 transition-all cursor-pointer"
            title={ui.copyLink}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#d4af37]" />}
            <span>{copied ? ui.linkCopied : ui.copyLink}</span>
          </button>

          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/40 text-rose-200 text-xs font-bold transition-all cursor-pointer"
              title={ui.closeBtn}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {pdfDownloadResult && (
        <div className="no-print mx-5 sm:mx-8 mt-4 p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs text-emerald-200 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <span className="font-semibold flex items-center gap-1.5 break-all">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{pdfUi.pdfSavedNotice(pdfDownloadResult.filename)}</span>
          </span>
          {pdfDownloadResult.downloadUrl && (
            <a
              href={pdfDownloadResult.downloadUrl}
              download={pdfDownloadResult.filename}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#c99738] text-[#290106] font-bold text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{pdfUi.directDownloadLinkLabel}</span>
            </a>
          )}
        </div>
      )}

      {/* MAIN MONOGRAPH CONTENT CONTAINER */}
      <div className="p-5 sm:p-8 md:p-10 space-y-10">
        {/* PRINT-ONLY ARCHIVAL MASTHEAD */}
        <div className="hidden print:block border-b-2 border-stone-800 pb-3 mb-4 text-black">
          <p className="text-[11px] font-bold uppercase tracking-widest text-stone-800">
            Suryavamsha Odiyaraju Kshatriya Historical Documentary & Royal Heritage Portal
          </p>
          <p className="text-[11px] font-semibold text-stone-700 mt-0.5">
            Research, Documentation & Compilation by Dr.G Sathyanarayana Raju • Founder & Historical Documentation Contributor
          </p>
          <p className="text-[10px] text-stone-600 break-all mt-0.5">
            {getDirectMonographUrl(false)}
          </p>
        </div>

        {/* 1. MONOGRAPH HEADER, HISTORICAL PERIOD & SUBJECT CATEGORIES */}
        <header className="print-article-header space-y-5 border-b border-stone-800 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            {subjectCategories.map((cat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#1a1308] px-3 py-1 rounded-full border border-[#c99738]/40"
              >
                {cat}
              </span>
            ))}
            <EvidenceBadge category={article.evidence_category} size="sm" />
          </div>

          <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#fcedc7] leading-tight tracking-wide">
            {displayTitle}
          </h1>

          {/* Historical Period, Author & Verification Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl bg-[#161c2a] border border-stone-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{ui.periodLabel}</span>
              </div>
              <div className="text-stone-100 font-bold mt-1">{historicalPeriod}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161c2a] border border-stone-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{ui.authorLabel}</span>
              </div>
              <div className="text-[#fae29c] font-bold mt-1">{article.author_name}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#161c2a] border border-stone-800">
              <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{ui.statusLabel}</span>
              </div>
              <div className="text-emerald-400 font-bold mt-1">
                {article.verification_status} ({article.publication_date})
              </div>
            </div>
          </div>

          {showLanguageSwitcher && (
            <div className="pt-1">
              <TranslationMatrixBadge article={article} />
            </div>
          )}
        </header>

        {/* 2. FEATURED HISTORICAL IMAGE */}
        {article.featured_image && (
          <figure className="print-lead-figure relative rounded-2xl overflow-hidden print:overflow-visible border border-[#c99738]/40 group shadow-xl bg-stone-950">
            <div className="print-lead-figure-box">
              <img
                src={article.featured_image}
                alt={displayTitle}
                loading="eager"
                onError={e => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = fallbackBanner;
                  }
                }}
                className="print-lead-image w-full h-64 sm:h-80 md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
            <figcaption className="bg-gradient-to-t from-stone-950 via-stone-950/90 to-transparent p-4 text-xs text-stone-300 border-t border-stone-800">
              <span className="text-[#d4af37] font-bold mr-1.5">{ui.artifactLabel}</span>
              {displayTitle} — <span className="text-amber-200/90">{historicalPeriod}</span>
            </figcaption>
          </figure>
        )}

        {/* 3. SHORT INTRODUCTION & EXECUTIVE HISTORICAL SCOPE */}
        <section
          aria-label="Monograph Introduction"
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#20050c]/85 via-[#180309]/85 to-[#121622] border-l-4 border-[#d4af37] border-y border-r border-stone-800 text-stone-200 shadow-inner"
        >
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>{ui.execIntroHeading}</span>
          </div>
          <p className="font-royal-serif text-sm sm:text-base md:text-lg leading-relaxed text-[#fcedc7]/95">
            {displaySummary}
          </p>
        </section>

        {/* 4. TABLE OF CONTENTS (COMPLETE MONOGRAPH CHAPTERS & SECTIONS) */}
        {tocList.length > 0 && (
          <nav aria-label="Table of Contents" className="p-5 sm:p-6 rounded-2xl bg-[#0e121d] border border-stone-800">
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d4af37] mb-4 flex items-center gap-2">
              <List className="w-4 h-4" />
              <span>{ui.tocHeading(tocList.length)}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {tocList.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left p-2.5 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer border ${
                    activeTocId === item.id
                      ? 'bg-[#580014]/60 text-[#fae29c] border-[#d4af37]'
                      : 'bg-[#141926] text-stone-300 border-stone-800 hover:border-[#c99738]/60 hover:text-white hover:bg-[#1a2133]'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-stone-900 text-[#d4af37] text-[11px] font-bold flex items-center justify-center shrink-0 border border-stone-700">
                    {idx + 1}
                  </span>
                  <span className="font-semibold line-clamp-1">{item.title}</span>
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* 5. COMPLETE MONOGRAPH CHAPTERS & DETAILED HISTORICAL EXPLANATIONS */}
        <section aria-label="Complete Monograph Chapters" className="space-y-8">
          <div className="border-b border-stone-800 pb-3 flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#d4af37]" />
            <h2 className="font-royal-heading font-bold text-lg sm:text-2xl text-[#fcedc7]">
              {ui.chaptersHeading}
            </h2>
          </div>

          {sections.map((sec, sIdx) => (
            <div
              key={sec.id}
              id={sec.id}
              className="scroll-mt-24 rounded-2xl bg-[#141926]/90 border border-stone-800/90 p-5 sm:p-7 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-stone-800 pb-3">
                <span className="px-2.5 py-1 rounded-lg bg-[#580014] text-[#fae29c] border border-[#d4af37]/50 text-xs font-bold">
                  Chapter {sIdx + 1}
                </span>
                <h3 className="font-royal-heading font-bold text-base sm:text-xl text-[#fae29c]">
                  {sec.title}
                </h3>
              </div>

              <div className="space-y-3.5 font-royal-serif text-sm sm:text-base text-stone-200 leading-relaxed">
                {sec.lines.map((p, pIdx) => {
                  const trimmed = p.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                    return (
                      <li
                        key={pIdx}
                        className="ml-5 list-disc text-stone-200 marker:text-[#d4af37] pl-1 leading-relaxed"
                      >
                        {trimmed.replace(/^[-•]\s*/, '')}
                      </li>
                    );
                  }
                  return (
                    <p key={pIdx} className="leading-relaxed">
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* 6. THREE-PILLAR EPISTEMIC DISTINCTION */}
        <section
          aria-label="Epistemic Distinction"
          className="p-5 sm:p-7 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-5"
        >
          <h2 className="font-royal-heading font-bold text-base sm:text-xl text-[#fcedc7] flex items-center gap-2.5 border-b border-stone-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
            <span>{ui.epistemicHeading}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-700/50 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{ui.epistemicVerifiedTitle}</span>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">{ui.epistemicVerifiedDesc}</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-700/50 space-y-2">
              <div className="font-bold text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{ui.epistemicTradTitle}</span>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">{ui.epistemicTradDesc}</p>
            </div>

            <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-700/50 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{ui.epistemicScholarTitle}</span>
              </div>
              <p className="text-stone-300 text-xs leading-relaxed">{ui.epistemicScholarDesc}</p>
            </div>
          </div>
        </section>

        {/* 7. CHRONOLOGICAL EVENTS & HISTORICAL TIMELINE */}
        {involvedTimelineEvents.length > 0 && (
          <section
            aria-label="Chronological Events and Timelines"
            className="p-5 sm:p-7 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-5"
          >
            <h2 className="font-royal-heading font-bold text-base sm:text-xl text-[#fcedc7] flex items-center gap-2.5 border-b border-stone-800 pb-3">
              <Clock className="w-5 h-5 text-[#d4af37]" />
              <span>{ui.chronologyHeading}</span>
            </h2>

            <div className="relative pl-6 border-l-2 border-[#c99738]/50 space-y-4">
              {involvedTimelineEvents.map(ev => (
                <div
                  key={ev.id}
                  onClick={() => onNavigate && onNavigate(`/timeline?id=${ev.id}`)}
                  className="relative p-4 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group"
                >
                  <div className="absolute -left-[31px] top-5 w-3.5 h-3.5 rounded-full bg-[#d4af37] border-2 border-[#0e121d]" />
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded bg-[#580014]/70 text-[#fae29c] border border-[#d4af37]/40 text-[11px] font-bold">
                      {ev.year_text} • {ev.period}
                    </span>
                    <span className="text-[11px] text-[#d4af37] font-semibold inline-flex items-center gap-1">
                      <span>Inspect Chronology Record</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                  <h3 className="font-royal-heading font-bold text-sm sm:text-base text-stone-100 group-hover:text-[#fae29c]">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 leading-relaxed">{ev.political_development}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. KINGDOMS, DYNASTIES & HISTORICAL PERSONALITIES INVOLVED */}
        <section
          aria-label="Kingdoms, Dynasties and Personalities Involved"
          className="p-5 sm:p-7 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-6"
        >
          <h2 className="font-royal-heading font-bold text-base sm:text-xl text-[#fcedc7] flex items-center gap-2.5 border-b border-stone-800 pb-3">
            <Crown className="w-5 h-5 text-[#d4af37]" />
            <span>{ui.kingdomsPersonalitiesHeading}</span>
          </h2>

          {/* Historical Personalities Cards */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
              Documented Monarchs, Emperors & Sacred Guardians Involved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {involvedFigures.map(fig => (
                <div
                  key={fig.id}
                  onClick={() => onNavigate && onNavigate(`/kings-queens?figure=${fig.id}`)}
                  className="p-3 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-center gap-3"
                >
                  <img
                    src={fig.image_url}
                    alt={fig.name}
                    className="w-14 h-14 rounded-lg object-cover object-top border border-[#c99738]/40 shrink-0"
                    onError={e => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/kapilendra_deva_coronation.jpg`;
                    }}
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold text-[#d4af37] truncate">{fig.reign_period}</div>
                    <div className="text-xs font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c] truncate">
                      {fig.name}
                    </div>
                    <div className="text-[10px] text-stone-400 truncate">{fig.dynasty_name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kingdoms & Dynasties Cards */}
          <div className="pt-3 border-t border-stone-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
              Associated Kingdoms, Dynasties & Territorial Realms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div
                onClick={() => onNavigate && onNavigate('/gajapathi-kings')}
                className="p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-center gap-3"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/gajapathi_empire_map_1465.jpg`}
                  alt="Suryavamsha Gajapathi Empire"
                  className="w-14 h-14 rounded-lg object-cover border border-stone-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-[#d4af37] uppercase">Imperial Dynasty</div>
                  <div className="text-xs font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c]">
                    Suryavamsha Gajapathi Kingdom & Empire
                  </div>
                </div>
              </div>

              <div
                onClick={() => onNavigate && onNavigate('/odra-desha')}
                className="p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-center gap-3"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/odra_kalinga_map.jpg`}
                  alt="Odra Desha & Kalinga"
                  className="w-14 h-14 rounded-lg object-cover border border-stone-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-[#d4af37] uppercase">Sovereign Territory</div>
                  <div className="text-xs font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c]">
                    Ancient Odra Desha, Utkala & Kalinga
                  </div>
                </div>
              </div>

              <div
                onClick={() => onNavigate && onNavigate('/genealogy')}
                className="p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-center gap-3"
              >
                <img
                  src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/odia_palm_leaf_manuscript.jpg`}
                  alt="Royal Dynastic Genealogy"
                  className="w-14 h-14 rounded-lg object-cover border border-stone-700 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-[#d4af37] uppercase">Royal Succession</div>
                  <div className="text-xs font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c]">
                    Suryavamsha & Odra Dynastic Genealogy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. AVAILABLE INSCRIPTIONS, ARCHAEOLOGICAL RECORDS & DOCUMENTARY EVIDENCE */}
        <section
          aria-label="Inscriptions and Documentary Evidence"
          className="p-5 sm:p-7 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-6"
        >
          <h2 className="font-royal-heading font-bold text-base sm:text-xl text-[#fcedc7] flex items-center gap-2.5 border-b border-stone-800 pb-3">
            <Scroll className="w-5 h-5 text-[#d4af37]" />
            <span>{ui.inscriptionsEvidenceHeading}</span>
          </h2>

          {/* Inscriptions */}
          {involvedInscriptions.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3">
                Corroborating Stone Inscriptions & Copper-Plate Charters ({involvedInscriptions.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {involvedInscriptions.map(insc => (
                  <div
                    key={insc.id}
                    onClick={() => onNavigate && onNavigate(`/inscriptions?id=${insc.id}`)}
                    className="p-4 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#580014]/60 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
                      <Scroll className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-bold text-[#d4af37]">
                        {insc.era_or_date} • {insc.language}
                      </div>
                      <h4 className="text-xs sm:text-sm font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c] mt-0.5">
                        {insc.name}
                      </h4>
                      <p className="text-xs text-stone-400 mt-1 line-clamp-2">{insc.historical_context}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Archival Documents & Monuments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {involvedDocuments.map(doc => (
              <div
                key={doc.id}
                onClick={() => onNavigate && onNavigate(`/documents?id=${doc.id}`)}
                className="p-4 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-700 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-[#d4af37]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase text-[#d4af37]">
                    Archival Manuscript • {doc.approximate_date}
                  </div>
                  <h4 className="text-xs sm:text-sm font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c] mt-0.5">
                    {doc.title}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{doc.translation_excerpt}</p>
                </div>
              </div>
            ))}

            {involvedMonuments.map(mon => (
              <div
                key={mon.id}
                onClick={() => onNavigate && onNavigate('/temples-monuments')}
                className="p-4 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] transition-all cursor-pointer group flex items-start gap-3.5"
              >
                {mon.image_url && (
                  <img
                    src={mon.image_url}
                    alt={mon.name}
                    className="w-14 h-14 rounded-lg object-cover border border-stone-700 shrink-0"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-bold uppercase text-[#d4af37]">
                    Archaeological Monument • {mon.century}
                  </div>
                  <h4 className="text-xs sm:text-sm font-royal-heading font-bold text-stone-100 group-hover:text-[#fae29c] mt-0.5">
                    {mon.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{mon.historical_significance}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. HISTORICAL ANALYSIS & CONCLUSIONS */}
        <section
          aria-label="Conclusion and Summary"
          className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-[#121622] to-[#1c0810] border border-[#d4af37]/40 space-y-2.5"
        >
          <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#d4af37]" />
            <span>{ui.conclusionHeading}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 font-royal-serif leading-relaxed">
            {ui.conclusionDesc}
          </p>
        </section>

        {/* 11. SOURCE REFERENCES & SCHOLARLY CITATIONS */}
        {article.sources && article.sources.length > 0 && (
          <section
            aria-label="Sources and References"
            className="p-5 sm:p-7 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
                {ui.sourcesHeading(article.sources.length)}
              </h2>
              <span className="text-[11px] text-stone-400">{ui.sourcesNote}</span>
            </div>

            <div className="space-y-3">
              {article.sources.map((src: SourceReference, i: number) => (
                <div
                  key={src.id || i}
                  className="p-4 rounded-xl bg-[#141926] border border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold text-[#d4af37] uppercase bg-stone-900 px-2.5 py-0.5 rounded border border-stone-700">
                        #{i + 1} • {src.source_type}
                      </span>
                      <h4 className="font-bold text-stone-100 text-xs sm:text-sm">{src.title}</h4>
                    </div>
                    <p className="text-stone-400 text-xs">
                      {src.author_or_authority} • {src.publication_or_location} ({src.year_or_era}) —{' '}
                      <span className="text-stone-300 italic">{src.citation_details}</span>
                    </p>
                  </div>
                  {src.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800 px-2.5 py-1 rounded-full shrink-0">
                      <Check className="w-3 h-3" /> {ui.verifiedSource}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. RELATED MONOGRAPHS, KEYWORDS, HASHTAGS & FOOTER NAVIGATION */}
        <footer className="print-article-footer space-y-8 pt-6 border-t border-stone-800">
          {/* Related Historical Monographs with Small Thumbnails */}
          {relatedArticles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-2">
                <Landmark className="w-4 h-4" />
                <span>{ui.relatedHeading}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map(rel => {
                  const { title: relTitle, summary: relSummary } = getArticleContent(rel);
                  return (
                    <div
                      key={rel.id}
                      onClick={() => onSelectArticle && onSelectArticle(rel)}
                      className="p-3.5 rounded-2xl bg-[#141926] border border-stone-800 hover:border-[#c99738] hover:bg-[#1a2133] transition-all cursor-pointer group flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={rel.featured_image || fallbackBanner}
                          alt={relTitle}
                          onError={e => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = '1';
                              target.src = fallbackBanner;
                            }
                          }}
                          className="w-16 h-16 rounded-xl object-cover border border-[#c99738]/40 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-[#d4af37] uppercase block truncate">
                            {getMetadataLabel('category', rel.category) || rel.category}
                          </span>
                          <h4 className="font-royal-heading font-bold text-xs sm:text-sm text-stone-100 group-hover:text-[#fae29c] line-clamp-2 mt-0.5">
                            {relTitle}
                          </h4>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-400 line-clamp-2">{relSummary}</p>
                      <div className="text-[11px] text-[#d4af37] font-bold flex items-center gap-1">
                        <span>{ui.readArticleBtn}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Keywords & Hashtags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-800/80">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                <span>{ui.keywordsHeading}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {monographKeywords.map((kw, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (onTagClick) onTagClick(kw);
                      else if (onBack) onBack();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#161c2a] hover:bg-[#580014] text-stone-300 hover:text-[#fae29c] border border-stone-700 hover:border-[#d4af37]/50 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-2.5 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                <span>{ui.hashtagsHeading}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {monographHashtags.map((ht, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#1a1308] text-[#fae29c] border border-[#c99738]/40 text-xs font-semibold"
                  >
                    {ht}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sequential Previous / Next Monograph Navigation */}
          {(prevArticle || nextArticle) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-800/80 print:hidden">
              {prevArticle ? (
                <button
                  type="button"
                  onClick={() => onSelectArticle && onSelectArticle(prevArticle)}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] text-left transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-[#d4af37] shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.prevMonograph}
                    </div>
                    <div className="text-xs sm:text-sm font-royal-heading font-bold text-stone-100 truncate">
                      {getArticleContent(prevArticle).title}
                    </div>
                  </div>
                </button>
              ) : (
                <div />
              )}

              {nextArticle ? (
                <button
                  type="button"
                  onClick={() => onSelectArticle && onSelectArticle(nextArticle)}
                  className="flex items-center justify-end gap-3 p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] text-right transition-all cursor-pointer"
                >
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                      {ui.nextMonograph}
                    </div>
                    <div className="text-xs sm:text-sm font-royal-heading font-bold text-stone-100 truncate">
                      {getArticleContent(nextArticle).title}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#d4af37] shrink-0" />
                </button>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Bottom Action Bar: Back, Home, Print, Share, Copy Link & Return to Top */}
          <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs print:hidden">
            <div className="flex flex-wrap items-center gap-2">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#580014] hover:bg-[#74001b] text-[#fae29c] border border-[#d4af37]/60 font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{ui.backToList}</span>
                </button>
              )}
              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold transition-all cursor-pointer"
                >
                  <Home className="w-4 h-4 text-[#d4af37]" />
                  <span>{ui.returnHome}</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#161c2a] hover:bg-[#20293d] text-stone-200 border border-stone-700 font-bold transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#d4af37]" />
                <span>{ui.printBtn}</span>
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#161c2a] hover:bg-[#20293d] text-stone-200 border border-stone-700 font-bold transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#d4af37]" />
                <span>{ui.share}</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopyLink(false)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#c99738] hover:bg-[#b88628] text-[#290106] font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? ui.linkCopied : ui.copyLink}</span>
              </button>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3 py-2.5 text-[#d4af37] hover:underline font-bold cursor-pointer"
              >
                {ui.returnToTop}
              </button>
            </div>
          </div>

          {/* Author Profile & Print/PDF Attribution */}
          <div className="pt-6 border-t border-stone-800 print:border-stone-300">
            <PublisherCreditCard variant="article-profile" />
          </div>
        </footer>
      </div>
    </article>
  );
};
