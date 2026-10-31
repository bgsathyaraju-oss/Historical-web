import React from 'react';
import { Scroll } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../types';
import { HistoricalRecordsExplorer } from '../components/HistoricalRecordDetailView';

const REF_HEADERS: Record<SupportedLanguage, {
  badge: string;
  title: string;
  subtitle: string;
  inspectCorpus: string;
  citationsHeading: string;
}> = {
  en: {
    badge: 'Epigraphic Bibliography & Archival Sources',
    title: 'Historical References & Scholarly Bibliography',
    subtitle: 'Every statement, regnal date, and boundary map on this portal is verified against published primary epigraphic records and peer-reviewed historical monographs.',
    inspectCorpus: 'Inspect Corpus →',
    citationsHeading: 'Catalogued Citations & Volumes'
  },
  hi: {
    badge: 'पुरालेखीय ग्रंथसूची और अभिलेखीय स्रोत',
    title: 'ऐतिहासिक संदर्भ और विद्वत्तापूर्ण ग्रंथसूची',
    subtitle: 'इस पोर्टल पर प्रत्येक विवरण, शासन तिथि और सीमा मानचित्र प्रकाशित प्राथमिक शिलालेख अभिलेखों और सहकर्मी-समीक्षित ऐतिहासिक मोनोग्राफ के विरुद्ध सत्यापित है।',
    inspectCorpus: 'संग्रह देखें →',
    citationsHeading: 'सूचीबद्ध उद्धरण और खंड'
  },
  te: {
    badge: 'శాసన గ్రంథసూచి & పురాతన ఆధారాలు',
    title: 'చారిత్రక ఆధారాలు & పరిశోధన గ్రంథసూచి',
    subtitle: 'ఈ పోర్టల్‌లోని ప్రతి ప్రకటన, పాలనా తేదీ మరియు సరిహద్దు మ్యాప్ ప్రచురిత ప్రాథమిక శాసన ఆధారాలు మరియు చారిత్రక గ్రంథాలతో ధృవీకరించబడింది.',
    inspectCorpus: 'ఆధారాలను పరిశీలించండి →',
    citationsHeading: 'జాబితా చేయబడిన ఆధారాలు & సంపుటాలు'
  },
  kn: {
    badge: 'ಶಾಸನ ಗ್ರಂಥಸೂಚಿ ಮತ್ತು ಪತ್ರಾಗಾರ ಆಕರಗಳು',
    title: 'ಐತಿಹಾಸಿಕ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ವಿದ್ವತ್ಪೂರ್ಣ ಗ್ರಂಥಸೂಚಿ',
    subtitle: 'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆ, ಆಳ್ವಿಕೆಯ ದಿನಾಂಕ ಮತ್ತು ಗಡಿ ನಕ್ಷೆಯನ್ನು ಪ್ರಕಟಿತ ಪ್ರಾಥಮಿಕ ಶಾಸನ ದಾಖಲೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಗ್ರಂಥಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
    inspectCorpus: 'ಆಕರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ →',
    citationsHeading: 'ಪಟ್ಟಿ ಮಾಡಲಾದ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಸಂಪುಟಗಳು'
  },
  ta: {
    badge: 'கல்வெட்டு நூற்பட்டியல் & ஆவண ஆதாரங்கள்',
    title: 'வரலாற்று ஆதாரங்கள் & ஆராய்ச்சி நூற்பட்டியல்',
    subtitle: 'இத்தளத்தில் உள்ள ஒவ்வொரு தகவலும், ஆட்சியாண்டும் மற்றும் எல்லை வரைபடமும் பதிப்பிக்கப்பட்ட முதன்மைக் கல்வெட்டு ஆவணங்கள் மற்றும் வரலாற்று ஆய்வு நூல்களின் அடிப்படையில் சரிபார்க்கப்பட்டுள்ளன.',
    inspectCorpus: 'ஆதாரங்களைக் காண்க →',
    citationsHeading: 'பட்டியலிடப்பட்ட மேற்கோள்கள் & தொகுதிகள்'
  },
  mr: {
    badge: 'पुरालेखीय ग्रंथसूची आणि अभिलेखीय स्रोत',
    title: 'ऐतिहासिक संदर्भ आणि विद्वत्तापूर्ण ग्रंथसूची',
    subtitle: 'या पोर्टलवरील प्रत्येक विधान, शासन काळ आणि सीमा नकाशा प्रकाशित प्राथमिक शिलालेख नोंदी आणि ऐतिहासिक शोधप्रबंधांच्या आधारे सत्यापित केला आहे.',
    inspectCorpus: 'संग्रह तपासा →',
    citationsHeading: 'सूचीबद्ध संदर्भ आणि खंड'
  },
  or: {
    badge: 'ଶିଳାଲେଖ ଗ୍ରନ୍ଥସୂଚୀ ଏବଂ ଅଭିଲେଖୀୟ ଉତ୍ସ',
    title: 'ଐତିହାସିକ ସନ୍ଦର୍ଭ ଏବଂ ଗବେଷଣା ଗ୍ରନ୍ଥସୂଚୀ',
    subtitle: 'ଏହି ପୋର୍ଟାଲରେ ଥିବା ପ୍ରତ୍ୟେକ ତଥ୍ୟ, ଶାସନ କାଳ ଏବଂ ସୀମା ମାନଚିତ୍ର ପ୍ରକାଶିତ ପ୍ରାଥମିକ ଶିଳାଲେଖ ରେକର୍ଡ ଏବଂ ଐତିହାସିକ ଗ୍ରନ୍ଥ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
    inspectCorpus: 'ସଂଗ୍ରହ ଦେଖନ୍ତୁ →',
    citationsHeading: 'ତାଲିକାଭୁକ୍ତ ଉଦ୍ଧୃତି ଏବଂ ଖଣ୍ଡସମୂହ'
  },
  bn: {
    badge: 'প্রত্নলিপি গ্রন্থপঞ্জি ও আর্কাইভাল উৎস',
    title: 'ঐতিহাসিক তথ্যসূত্র ও গবেষণা গ্রন্থপঞ্জি',
    subtitle: 'এই পোর্টালের প্রতিটি বিবৃতি, রাজত্বকাল এবং সীমানা মানচিত্র প্রকাশিত প্রাথমিক শিলালিপি এবং পিয়ার-রিভিউড ঐতিহাসিক মনোগ্রাফের সাথে যাচাইকৃত।',
    inspectCorpus: 'সংগ্রহ দেখুন →',
    citationsHeading: 'তালিকাভুক্ত উদ্ধৃতি ও খণ্ডসমূহ'
  }
};

interface HistoricalReferencesPageProps {
  onNavigate?: (path: string) => void;
  initialReferenceId?: string | null;
}

export const HistoricalReferencesPage: React.FC<HistoricalReferencesPageProps> = ({ onNavigate, initialReferenceId }) => {
  const { language } = useLanguage();
  const hdr = REF_HEADERS[language] || REF_HEADERS.en;

  return (
    <HistoricalRecordsExplorer
      defaultCategory="references"
      basePath="/references"
      initialRecordId={initialReferenceId}
      onNavigate={onNavigate}
      pageBadge={hdr.badge}
      pageTitle={hdr.title}
      pageSubtitle={hdr.subtitle}
      headerIcon={<Scroll className="w-4 h-4" />}
    />
  );
};


