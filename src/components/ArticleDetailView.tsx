import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  User,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  ChevronRight,
  List,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Bookmark,
  Printer,
  Globe
} from 'lucide-react';
import { Article, SourceReference, LanguageCode } from '../types';
import { EvidenceBadge } from './EvidenceBadge';
import { TranslationMatrixBadge } from './TranslationMatrixBadge';
import { useLanguage } from '../context/LanguageContext';

interface ArticleDetailViewProps {
  article: Article;
  onBack?: () => void;
  onSelectArticle?: (article: Article) => void;
  allArticles?: Article[];
  showLanguageSwitcher?: boolean;
}

interface TocItem {
  id: string;
  title: string;
}

const ARTICLE_DETAIL_UI: Record<
  LanguageCode,
  {
    intro: string;
    copyLink: string;
    linkCopied: string;
    share: string;
    authorLabel: string;
    publishedLabel: string;
    statusLabel: string;
    artifactLabel: string;
    execIntroHeading: string;
    tocHeading: (count: number) => string;
    factsHeading: string;
    epigraphicHorizonTitle: string;
    epigraphicHorizonDesc: string;
    archivalClassTitle: string;
    archivalClassDesc: (cat: string) => string;
    conclusionHeading: string;
    conclusionDesc: string;
    sourcesHeading: (count: number) => string;
    sourcesNote: string;
    verifiedSource: string;
    relatedHeading: string;
    readArticleBtn: string;
    articleIdLabel: string;
    returnToTop: string;
  }
> = {
  en: {
    intro: 'Introduction',
    copyLink: 'Copy Link',
    linkCopied: 'Link Copied!',
    share: 'Share',
    authorLabel: 'Author / Compiler:',
    publishedLabel: 'Published:',
    statusLabel: 'Peer-Reviewed Status:',
    artifactLabel: 'Corroborated Historical Artifact / Location:',
    execIntroHeading: 'Executive Introduction & Historical Scope',
    tocHeading: count => `Table of Contents (${count} Sections)`,
    factsHeading: 'Historical Facts & Timeline Corroboration',
    epigraphicHorizonTitle: 'Epigraphic Horizon',
    epigraphicHorizonDesc: 'Corroborated by copper plates, lithic temple inscriptions, and primary bilingual royal charters of eastern and southern India.',
    archivalClassTitle: 'Archival Classification',
    archivalClassDesc: cat => `Documented under ${cat} with verified primary evidence status and full scholarly bibliographic references.`,
    conclusionHeading: 'Historiographical Conclusion',
    conclusionDesc: 'The records preserved in this documentary demonstrate the enduring civilizational continuity of the Suryavamsha Odiyaraju Kshatriya heritage, uniting classical Vedic solar lineages, imperial Gajapathi sovereignty, and living community institutions across India.',
    sourcesHeading: count => `Primary Sources & Scholarly Citations (${count})`,
    sourcesNote: 'All sources cataloged by archival authority',
    verifiedSource: 'Verified Source',
    relatedHeading: 'Related Historical Monographs',
    readArticleBtn: 'Read Article',
    articleIdLabel: 'Article ID:',
    returnToTop: '↑ Return to Top'
  },
  hi: {
    intro: 'परिचय',
    copyLink: 'लिंक कॉपी करें',
    linkCopied: 'लिंक कॉपी हो गया!',
    share: 'साझा करें',
    authorLabel: 'लेखक / संकलनकर्ता:',
    publishedLabel: 'प्रकाशित:',
    statusLabel: 'समीक्षा स्थिति:',
    artifactLabel: 'प्रमाणित ऐतिहासिक कलाकृति / स्थान:',
    execIntroHeading: 'कार्यकारी परिचय एवं ऐतिहासिक परिधि',
    tocHeading: count => `विषय-सूची (${count} अनुभाग)`,
    factsHeading: 'ऐतिहासिक तथ्य एवं कालानुक्रमिक पुष्टिकरण',
    epigraphicHorizonTitle: 'अभिलेखीय आधार',
    epigraphicHorizonDesc: 'पूर्वी और दक्षिणी भारत के ताम्रपत्रों, मंदिर शिलालेखों और द्विभाषी राजकीय चार्टरों द्वारा प्रमाणित।',
    archivalClassTitle: 'अभिलेखीय वर्गीकरण',
    archivalClassDesc: cat => `प्रामाणिक प्राथमिक साक्ष्य और विद्वत्तापूर्ण संदर्भों के साथ ${cat} के अंतर्गत प्रलेखित।`,
    conclusionHeading: 'ऐतिहासिक निष्कर्ष',
    conclusionDesc: 'इस शोध-प्रबंध में संरक्षित अभिलेख सूर्यवंशी ओडियाराजु क्षत्रिय विरासत की अटूट सभ्यतागत निरंतरता को प्रमाणित करते हैं, जो वैदिक सूर्यवंश, गजपति साम्राज्य और जीवंत सामुदायिक संस्थाओं को जोड़ते हैं।',
    sourcesHeading: count => `प्राथमिक स्रोत एवं विद्वत्तापूर्ण उद्धरण (${count})`,
    sourcesNote: 'सभी स्रोत अभिलेखीय प्राधिकरण द्वारा सूचीबद्ध',
    verifiedSource: 'सत्यापित स्रोत',
    relatedHeading: 'संबंधित ऐतिहासिक शोध-ग्रंथ',
    readArticleBtn: 'लेख पढ़ें',
    articleIdLabel: 'लेख क्रमांक:',
    returnToTop: '↑ शीर्ष पर लौटें'
  },
  te: {
    intro: 'పరిచయం',
    copyLink: 'లింక్ కాపీ చేయండి',
    linkCopied: 'లింక్ కాపీ చేయబడింది!',
    share: 'షేర్ చేయండి',
    authorLabel: 'రచయిత / సంకలనకర్త:',
    publishedLabel: 'ప్రచురణ తేదీ:',
    statusLabel: 'పరిశోధన స్థితి:',
    artifactLabel: 'ధృవీకరించబడిన చారిత్రక ప్రదేశం / ఆధారం:',
    execIntroHeading: 'ప్రధాన పరిచయం & చారిత్రక పరిధి',
    tocHeading: count => `విషయ సూచిక (${count} విభాగాలు)`,
    factsHeading: 'చారిత్రక వాస్తవాలు & శాసన ధృవీకరణ',
    epigraphicHorizonTitle: 'శాసన ఆధార పరిధి',
    epigraphicHorizonDesc: 'తూర్పు మరియు దక్షిణ భారతదేశంలోని తామ్రశాసనాలు, ఆలయ శిలాశాసనాలు మరియు రాజ శాసనాల ద్వారా ధృవీకరించబడింది.',
    archivalClassTitle: 'పురాతన వర్గీకరణ',
    archivalClassDesc: cat => `ప్రాథమిక ఆధారాలు మరియు పరిశోధన గ్రంథ సూచికలతో ${cat} విభాగంలో నమోదు చేయబడింది.`,
    conclusionHeading: 'చారిత్రక ముగింపు',
    conclusionDesc: 'ఈ డాక్యుమెంటరీలో భద్రపరచబడిన ఆధారాలు సూర్యవంశ ఓడియరాజు క్షత్రియ వారసత్వపు అవిచ్ఛిన్న నాగరికతను, గజపతి సామ్రాజ్య వైభవాన్ని మరియు దేశవ్యాప్త సమాజ సంస్థల ఐక్యతను చాటిచెబుతున్నాయి.',
    sourcesHeading: count => `ప్రాథమిక ఆధారాలు & పరిశోధన గ్రంథ సూచిక (${count})`,
    sourcesNote: 'పురావస్తు ప్రమాణాల ప్రకారం జాబితా చేయబడిన ఆధారాలు',
    verifiedSource: 'ధృవీకరించబడిన ఆధారం',
    relatedHeading: 'సంబంధిత చారిత్రక పరిశోధనా వ్యాసాలు',
    readArticleBtn: 'వ్యాసం చదవండి',
    articleIdLabel: 'వ్యాస సంఖ్య:',
    returnToTop: '↑ పైకి వెళ్ళండి'
  },
  kn: {
    intro: 'ಪರಿಚಯ',
    copyLink: 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    linkCopied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
    share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    authorLabel: 'ಲೇಖಕರು / ಸಂಕಲನಕಾರರು:',
    publishedLabel: 'ಪ್ರಕಟಣೆ:',
    statusLabel: 'ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ:',
    artifactLabel: 'ದೃಢೀಕೃತ ಐತಿಹಾಸಿಕ ಸ್ಥಳ / ಸ್ಮಾರಕ:',
    execIntroHeading: 'ಮುಖ್ಯ ಪರಿಚಯ ಮತ್ತು ಐತಿಹಾಸಿಕ ವ್ಯಾಪ್ತಿ',
    tocHeading: count => `ವಿಷಯ ಸೂಚಿ (${count} ವಿಭಾಗಗಳು)`,
    factsHeading: 'ಐತಿಹಾಸಿಕ ಸತ್ಯಗಳು ಮತ್ತು ಶಾಸನ ದೃಢೀಕರಣ',
    epigraphicHorizonTitle: 'ಶಾಸನ ಆಧಾರ ವ್ಯಾಪ್ತಿ',
    epigraphicHorizonDesc: 'ಪೂರ್ವ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ತಾಮ್ರಶಾಸನಗಳು ಮತ್ತು ದೇವಾಲಯ ಶಾಸನಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.',
    archivalClassTitle: 'ದಾಖಲೆ ವರ್ಗೀಕರಣ',
    archivalClassDesc: cat => `ಪ್ರಾಥಮಿಕ ಆಧಾರಗಳು ಮತ್ತು ಗ್ರಂథಸೂಚಿಗಳೊಂದಿಗೆ ${cat} ಅಡಿಯಲ್ಲಿ ದಾಖಲಿಸಲಾಗಿದೆ.`,
    conclusionHeading: 'ಐತಿಹಾಸಿಕ ತೀರ್ಮಾನ',
    conclusionDesc: 'ಈ ದಾಖಲೆಯಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾದ ಆಧಾರಗಳು ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆಯ ನಿರಂತರತೆ ಮತ್ತು ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಹಿರಿಮೆಯನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತವೆ.',
    sourcesHeading: count => `ಪ್ರಾಥಮಿಕ ಆಕರಗಳು ಮತ್ತು ವಿದ್ವತ್ ಉಲ್ಲೇಖಗಳು (${count})`,
    sourcesNote: 'ಪತ್ರಾಗಾರ ಪ್ರಾಧಿಕಾರದಿಂದ ಪಟ್ಟಿ ಮಾಡಲಾದ ಆಕರಗಳು',
    verifiedSource: 'ದೃಢೀಕೃತ ಆಕರ',
    relatedHeading: 'ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಲೇಖನಗಳು',
    readArticleBtn: 'ಲೇಖನ ಓದಿ',
    articleIdLabel: 'ಲೇಖನ ಸಂಖ್ಯೆ:',
    returnToTop: '↑ ಮೇಲಕ್ಕೆ ಹಿಂತಿರುಗಿ'
  },
  ta: {
    intro: 'அறிமுகம்',
    copyLink: 'இணைப்பை நகலெடு',
    linkCopied: 'நகலெடுக்கப்பட்டது!',
    share: 'பகிர்',
    authorLabel: 'ஆசிரியர் / தொகுப்பாளர்:',
    publishedLabel: 'வெளியீடு:',
    statusLabel: 'ஆய்வு நிலை:',
    artifactLabel: 'சரிபார்க்கப்பட்ட வரலாற்றுச் சின்னம் / இடம்:',
    execIntroHeading: 'முதன்மை அறிமுகம் மற்றும் வரலாற்று எல்லை',
    tocHeading: count => `பொருளடக்கம் (${count} பிரிவுகள்)`,
    factsHeading: 'வரலாற்று உண்மைகள் மற்றும் கல்வெட்டுச் சான்றுகள்',
    epigraphicHorizonTitle: 'கல்வெட்டு ஆதார எல்லை',
    epigraphicHorizonDesc: 'கிழக்கு மற்றும் தென்னிந்திய செப்பேடுகள் மற்றும் கோயில் கல்வெட்டுகளால் உறுதிப்படுத்தப்பட்டது.',
    archivalClassTitle: 'ஆவண வகைப்பாடு',
    archivalClassDesc: cat => `முதன்மைச் சான்றுகள் மற்றும் நூற்பட்டியலுடன் ${cat} பிரிவில் ஆவணப்படுத்தப்பட்டுள்ளது.`,
    conclusionHeading: 'வரலாற்று முடிவுரை',
    conclusionDesc: 'இத்தொகுப்பில் உள்ள ஆவணங்கள் சூரியவம்ச ஒடியராஜு சத்திரிய மரபின் தொடர்ச்சியையும் கஜபதி பேரரசின் சிறப்பையும் எடுத்துக்காட்டுகின்றன.',
    sourcesHeading: count => `முதன்மை ஆதாரங்கள் மற்றும் மேற்கோள்கள் (${count})`,
    sourcesNote: 'ஆவணக் காப்பகத்தால் பட்டியலிடப்பட்ட ஆதாரங்கள்',
    verifiedSource: 'சரிபார்க்கப்பட்ட ஆதாரம்',
    relatedHeading: 'தொடர்புடைய வரலாற்றுக் கட்டுரைகள்',
    readArticleBtn: 'கட்டுரை படிக்க',
    articleIdLabel: 'கட்டுரை எண்:',
    returnToTop: '↑ மேலே செல்ல'
  },
  mr: {
    intro: 'परिचय',
    copyLink: 'लिंक कॉपी करा',
    linkCopied: 'लिंक कॉपी झाली!',
    share: 'शेअर करा',
    authorLabel: 'लेखक / संकलक:',
    publishedLabel: 'प्रकाशित:',
    statusLabel: 'परीक्षण स्थिती:',
    artifactLabel: 'प्रमाणित ऐतिहासिक वास्तू / ठिकाण:',
    execIntroHeading: 'मुख्य प्रस्तावना आणि ऐतिहासिक व्याप्ती',
    tocHeading: count => `अनुक्रमणिका (${count} विभाग)`,
    factsHeading: 'ऐतिहासिक तथ्ये आणि शिलालेखीय पुष्टी',
    epigraphicHorizonTitle: 'शिलालेखीय आधार',
    epigraphicHorizonDesc: 'पूर्व आणि दक्षिण भारतातील ताम्रपट आणि मंदिर शिलालेखांद्वारे प्रमाणित.',
    archivalClassTitle: 'अभिलेख वर्गीकरण',
    archivalClassDesc: cat => `प्राथमिक पुरावे आणि ग्रंथसूचीसह ${cat} अंतर्गत नोंदणीकृत.`,
    conclusionHeading: 'ऐतिहासिक निष्कर्ष',
    conclusionDesc: 'या दस्तऐवजात जतन केलेल्या नोंदी सूर्यवंशी ओडियाराजु क्षत्रिय वारशाचे सातत्य आणि गजपती साम्राज्याचे वैभव सिद्ध करतात.',
    sourcesHeading: count => `प्राथमिक स्रोत आणि संदर्भ (${count})`,
    sourcesNote: 'अभिलेख प्राधिकरणाद्वारे सूचीबद्ध स्रोत',
    verifiedSource: 'प्रमाणित स्रोत',
    relatedHeading: 'संबंधित ऐतिहासिक शोधनिबंध',
    readArticleBtn: 'लेख वाचा',
    articleIdLabel: 'लेख क्रमांक:',
    returnToTop: '↑ वर जा'
  },
  or: {
    intro: 'ପରିଚୟ',
    copyLink: 'ଲିଙ୍କ୍ କପି କରନ୍ତୁ',
    linkCopied: 'ଲିଙ୍କ୍ କପି ହୋଇଛି!',
    share: 'ସେୟାର କରନ୍ତୁ',
    authorLabel: 'ଲେଖକ / ସଂକଳକ:',
    publishedLabel: 'ପ୍ରକାଶିତ:',
    statusLabel: 'ସମୀକ୍ଷା ସ୍ଥିତି:',
    artifactLabel: 'ପ୍ରମାଣିତ ଐତିହାସିକ କীর୍ତ୍ତି / ସ୍ଥାନ:',
    execIntroHeading: 'ମୁଖ୍ୟ ପରିଚୟ ଓ ଐତିହାସିକ ପରିସର',
    tocHeading: count => `ବିଷୟ ସୂଚୀ (${count} ବିଭାଗ)`,
    factsHeading: 'ଐତିହାସିକ ତଥ୍ୟ ଓ ଶିଳାଲେଖ ପ୍ରମାଣ',
    epigraphicHorizonTitle: 'ଶିଳାଲେଖ ଆଧାର',
    epigraphicHorizonDesc: 'ପୂର୍ବ ଓ ଦକ୍ଷିଣ ଭାରତର ତାମ୍ରଶାସନ ଏବଂ ମନ୍ଦିର ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
    archivalClassTitle: 'ଅଭିଲେଖ ବର୍ଗୀକରଣ',
    archivalClassDesc: cat => `ମୌଳିକ ପ୍ରମାଣ ଓ ଗ୍ରନ୍ଥସୂଚୀ ସହିତ ${cat} ଅଧୀନରେ ନথিଭୁକ୍ତ।`,
    conclusionHeading: 'ଐତିହାସିକ ସିଦ୍ଧାନ୍ତ',
    conclusionDesc: 'ଏହି ଦଲିଲରେ ସଂରକ୍ଷିତ ପ୍ରମାଣ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟର ଅବିଚ୍ଛିନ୍ନ ଧାରା ଏବଂ ଗଜପତି ସାମ୍ରାଜ୍ୟର ଗୌରବକୁ ପ୍ରତିପାଦিত କରେ।',
    sourcesHeading: count => `ପ୍ରାଥମିକ ଉତ୍ସ ଓ ଗବେଷଣା ପ୍ରମାଣ (${count})`,
    sourcesNote: 'ଅଭିଲେଖ କର୍ତ୍ତୃପକ୍ଷଙ୍କ ଦ୍ୱାରା ତାଲିକାଭୁକ୍ତ ଉତ୍ସ',
    verifiedSource: 'ପ୍ରମାଣିତ ଉତ୍ସ',
    relatedHeading: 'ସମ୍ପୃକ୍ତ ଐତିହାସିକ ପ୍ରବନ୍ଧ',
    readArticleBtn: 'ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ',
    articleIdLabel: 'ପ୍ରବନ୍ଧ କ୍ରମାଙ୍କ:',
    returnToTop: '↑ ଉପରକୁ ଫେରନ୍ତୁ'
  },
  bn: {
    intro: 'ভূমিকা',
    copyLink: 'লিঙ্ক কপি করুন',
    linkCopied: 'লিঙ্ক কপি হয়েছে!',
    share: 'শেয়ার করুন',
    authorLabel: 'লেখক / সংকলক:',
    publishedLabel: 'প্রকাশিত:',
    statusLabel: 'পর্যালোচনা স্থিতি:',
    artifactLabel: 'প্রমাণিত ঐতিহাসিক নিদর্শন / স্থান:',
    execIntroHeading: 'কার্যনির্বাহী ভূমিকা ও ঐতিহাসিক পরিধি',
    tocHeading: count => `সূচিপত্র (${count} বিভাগ)`,
    factsHeading: 'ঐতিহাসিক তথ্য ও শিলালিপি প্রমাণ',
    epigraphicHorizonTitle: 'শিলালিপি ভিত্তি',
    epigraphicHorizonDesc: 'পূর্ব ও দক্ষিণ ভারতের তাম্রশাসন এবং মন্দির শিলালিপি দ্বারা প্রমাণিত।',
    archivalClassTitle: 'আর্কাইভাল শ্রেণীবিন্যাস',
    archivalClassDesc: cat => `প্রাথমিক প্রমাণ ও গ্রন্থপঞ্জিসহ ${cat} বিভাগে নথিভুক্ত।`,
    conclusionHeading: 'ঐতিহাসিক উপসংহার',
    conclusionDesc: 'এই নথিতে সংরক্ষিত প্রমাণসমূহ সূর্যবংশীয় ওড়িয়ারাজু ক্ষত্রিয় ঐতিহ্যের অবিচ্ছিন্ন ধারাবাহিকতা এবং গজপতি সাম্রাজ্যের গৌরব তুলে ধরে।',
    sourcesHeading: count => `প্রাথমিক উৎস ও গবেষণা উদ্ধৃতি (${count})`,
    sourcesNote: 'আর্কাইভ কর্তৃপক্ষ কর্তৃক তালিকাভুক্ত উৎস',
    verifiedSource: 'যাচাইকৃত উৎস',
    relatedHeading: 'সংশ্লিষ্ট ঐতিহাসিক প্রবন্ধ',
    readArticleBtn: 'প্রবন্ধ পড়ুন',
    articleIdLabel: 'প্রবন্ধ নম্বর:',
    returnToTop: '↑ উপরে ফিরে যান'
  }
};

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles = [],
  showLanguageSwitcher = true
}) => {
  const { language, t, getArticleContent, getMetadataLabel } = useLanguage();
  const ui = ARTICLE_DETAIL_UI[language] || ARTICLE_DETAIL_UI.en;
  const [copied, setCopied] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>('');

  const { title: displayTitle, summary: displaySummary, content: displayContent } = getArticleContent(article);
  const localizedCat = getMetadataLabel('category', article.category) || article.category;

  // Auto-generate Table of Contents from headings / section dividers in content
  const contentLines = (displayContent || '').split('\n');
  const sections: { id: string; title: string; lines: string[] }[] = [];
  let currentSecTitle = ui.intro;
  let currentSecLines: string[] = [];

  contentLines.forEach((line) => {
    const trimmed = line.trim();
    const isHeader =
      (trimmed.endsWith(':') && trimmed.length < 120 && !trimmed.includes('http')) ||
      /^(\d+|[०-९]+|[౦-౯]+|[೦-೯]+|[୦-୯]+|[০-৯]+)\.?\s+\S/.test(trimmed) ||
      /^\#{1,4}\s+\S/.test(trimmed);

    if (isHeader) {
      if (currentSecLines.length > 0) {
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

  if (currentSecLines.length > 0) {
    sections.push({
      id: `sec-${sections.length}`,
      title: currentSecTitle,
      lines: currentSecLines
    });
  }

  const tocList: TocItem[] = sections.map((s) => ({ id: s.id, title: s.title }));

  // Related articles (matching category or shared tags, excluding current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .filter((a) => a.category === article.category || a.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?article=${encodeURIComponent(article.id)}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?article=${encodeURIComponent(article.id)}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: displayTitle,
          text: displaySummary,
          url: shareUrl
        });
      } catch {
        // User cancelled or share not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const scrollToSection = (id: string) => {
    setActiveTocId(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="rounded-3xl bg-[#111520] border border-[#c99738]/40 p-5 sm:p-8 md:p-10 space-y-8 shadow-2xl transition-all">
      {/* 11. Accessible Back-to-Articles Navigation & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-900 hover:bg-[#580014] text-stone-200 hover:text-[#fae29c] border border-stone-700 hover:border-[#d4af37] transition-all cursor-pointer shadow-sm active:scale-95"
              title={t.common?.backToHome || 'Back to Archive'}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.common?.backToHome || 'Back to Archive'}</span>
            </button>
          )}

          <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] bg-stone-950 px-3 py-1 rounded-full border border-stone-800">
            {localizedCat}
          </span>
          <EvidenceBadge category={article.evidence_category} size="sm" />
        </div>

        {/* 10. Share, Copy Link, and Reading Tools */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#161c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 transition-all cursor-pointer"
            title={ui.copyLink}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#d4af37]" />}
            <span>{copied ? ui.linkCopied : ui.copyLink}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#580014] hover:bg-[#78001b] text-[#fcedc7] border border-[#d4af37]/50 transition-all cursor-pointer shadow-sm"
            title={ui.share}
          >
            <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">{ui.share}</span>
          </button>
        </div>
      </div>

      {/* 1. Article Title & Metadata Banner */}
      <header className="space-y-4">
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#fcedc7] leading-tight tracking-wide">
          {displayTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400">
          <span className="flex items-center gap-1.5 text-stone-300">
            <User className="w-4 h-4 text-[#d4af37]" />
            <span>{ui.authorLabel} <strong className="text-[#fae29c]">{article.author_name}</strong></span>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>{ui.publishedLabel} {article.publication_date}</span>
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>{ui.statusLabel} {article.verification_status}</span>
          </span>
        </div>

        {/* 9. Language Selector & Translation Coverage */}
        {showLanguageSwitcher && (
          <div className="pt-2">
            <TranslationMatrixBadge article={article} />
          </div>
        )}
      </header>

      {/* Featured Image with Verified Historical Caption */}
      {article.featured_image && (
        <figure className="relative rounded-2xl overflow-hidden border border-[#c99738]/30 group shadow-lg">
          <img
            src={article.featured_image}
            alt={displayTitle}
            className="w-full h-64 sm:h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent p-4 text-xs text-stone-300">
            <span className="text-[#d4af37] font-semibold">{ui.artifactLabel}</span> {displayTitle} ({localizedCat})
          </figcaption>
        </figure>
      )}

      {/* 2. Short Introduction Callout */}
      <section aria-label="Article Introduction" className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#20050c]/80 via-[#180309]/80 to-[#121622] border-l-4 border-[#d4af37] border-y border-r border-stone-800/80 text-stone-200 shadow-inner">
        <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37] mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{ui.execIntroHeading}</span>
        </div>
        <p className="font-royal-serif text-sm sm:text-base leading-relaxed text-[#fcedc7]/95">
          {displaySummary}
        </p>
      </section>

      {/* 3. Table of Contents (for structured reading) */}
      {tocList.length > 1 && (
        <nav aria-label="Table of Contents" className="p-4 sm:p-5 rounded-2xl bg-[#0e121d] border border-stone-800">
          <div className="text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-3 flex items-center gap-2">
            <List className="w-4 h-4" />
            <span>{ui.tocHeading(tocList.length)}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {tocList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-left p-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer border ${
                  activeTocId === item.id
                    ? 'bg-[#580014]/60 text-[#fae29c] border-[#d4af37]'
                    : 'bg-[#141926] text-stone-300 border-stone-800 hover:border-stone-700 hover:text-white hover:bg-[#1a2133]'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-stone-900 text-[#d4af37] text-[10px] font-bold flex items-center justify-center shrink-0 border border-stone-700">
                  {idx + 1}
                </span>
                <span className="truncate">{item.title}</span>
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* 4. Complete Article Content (Never Truncated) */}
      <section aria-label="Complete Article Content" className="space-y-6">
        {sections.map((sec) => (
          <div key={sec.id} id={sec.id} className="scroll-mt-24 space-y-3">
            {sec.title && sec.title !== ui.intro && (
              <h2 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] border-b border-stone-800/80 pb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <span>{sec.title}</span>
              </h2>
            )}
            <div className="space-y-3 font-royal-serif text-sm sm:text-base text-stone-300 leading-relaxed">
              {sec.lines.map((p, pIdx) => {
                const trimmed = p.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                  return (
                    <li key={pIdx} className="ml-4 list-disc text-stone-300 marker:text-[#d4af37]">
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

      {/* 5. Important Facts and Historical Timeline */}
      <section aria-label="Key Historical Chronology" className="p-5 sm:p-6 rounded-2xl bg-[#0c0f17] border border-stone-800 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span>{ui.factsHeading}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-[#141926] border border-stone-800/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#d4af37]">{ui.epigraphicHorizonTitle}</span>
            <p className="text-stone-300">
              {ui.epigraphicHorizonDesc}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#141926] border border-stone-800/80 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#d4af37]">{ui.archivalClassTitle}</span>
            <p className="text-stone-300">
              {ui.archivalClassDesc(localizedCat)}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Detailed Conclusion and Summary */}
      <section aria-label="Conclusion and Summary" className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#121622] to-[#1c0810] border border-[#d4af37]/30 space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#fae29c] font-royal-heading flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#d4af37]" />
          <span>{ui.conclusionHeading}</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
          {ui.conclusionDesc}
        </p>
      </section>

      {/* 7. Sources and References */}
      {article.sources && article.sources.length > 0 && (
        <section aria-label="Sources and References" className="p-5 sm:p-6 rounded-2xl bg-[#0e121d] border border-stone-800 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading flex items-center justify-between">
            <span>{ui.sourcesHeading(article.sources.length)}</span>
            <span className="text-[10px] text-stone-400 font-normal">{ui.sourcesNote}</span>
          </h3>
          <div className="space-y-2.5">
            {article.sources.map((src: SourceReference, i: number) => (
              <div
                key={src.id || i}
                className="p-3.5 rounded-xl bg-[#141926] border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-[#d4af37] uppercase bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                      {src.source_type}
                    </span>
                    <h4 className="font-bold text-stone-200">{src.title}</h4>
                  </div>
                  <p className="text-stone-400 text-[11px]">
                    {src.author_or_authority} • {src.publication_or_location} ({src.year_or_era}) — {src.citation_details}
                  </p>
                </div>
                {src.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                    <Check className="w-3 h-3" /> {ui.verifiedSource}
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Related Articles */}
      {relatedArticles.length > 0 && (
        <section aria-label="Related Articles" className="space-y-3 pt-4 border-t border-stone-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#d4af37] font-royal-heading">
            {ui.relatedHeading}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedArticles.map((rel) => {
              const { title: relTitle, summary: relSummary } = getArticleContent(rel);
              return (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle && onSelectArticle(rel)}
                  className="p-3.5 rounded-xl bg-[#141926] border border-stone-800 hover:border-[#c99738] hover:bg-[#1a2133] transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#d4af37] uppercase">
                      {getMetadataLabel('category', rel.category) || rel.category}
                    </span>
                    <h4 className="font-royal-heading font-bold text-xs text-stone-200 group-hover:text-[#fae29c] line-clamp-2">
                      {relTitle}
                    </h4>
                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      {relSummary}
                    </p>
                  </div>
                  <div className="mt-2 text-[10px] text-[#d4af37] font-medium flex items-center gap-1">
                    <span>{ui.readArticleBtn}</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Action Footer with Back to Top */}
      <footer className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
        <span>{ui.articleIdLabel} <code className="text-stone-300 bg-stone-900 px-1.5 py-0.5 rounded">{article.id}</code></span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[#d4af37] hover:underline cursor-pointer"
        >
          {ui.returnToTop}
        </button>
      </footer>
    </article>
  );
};
