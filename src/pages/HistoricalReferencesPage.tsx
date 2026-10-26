import React, { useState } from 'react';
import { Scroll } from 'lucide-react';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../types';

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
    citationsHeading: 'ତାଲିକାଭୁକ୍ତ ଉଦ୍ଧୃତି ଏବଂ ଖଣ୍ଡসমୂହ'
  },
  bn: {
    badge: 'প্রত্নলিপি গ্রন্থপঞ্জি ও আর্কাইভাল উৎস',
    title: 'ঐতিহাসিক তথ্যসূত্র ও গবেষণা গ্রন্থপঞ্জি',
    subtitle: 'এই পোর্টালের প্রতিটি বিবৃতি, রাজত্বকাল এবং সীমানা মানচিত্র প্রকাশিত প্রাথমিক শিলালিপি এবং পিয়ার-রিভিউড ঐতিহাসিক মনোগ্রাফের সাথে যাচাইকৃত।',
    inspectCorpus: 'সংগ্রহ দেখুন →',
    citationsHeading: 'তালিকাভুক্ত উদ্ধৃতি ও খণ্ডসমূহ'
  }
};

export const HistoricalReferencesPage: React.FC = () => {
  const { language } = useLanguage();
  const hdr = REF_HEADERS[language] || REF_HEADERS.en;
  const [selectedRefKey, setSelectedRefKey] = useState<string | null>(null);

  const references = [
    {
      id: 'ref-epigraphic',
      category: {
        en: 'Epigraphic Publications (Primary)',
        hi: 'पुरालेखीय प्रकाशन (प्राथमिक स्रोत)',
        te: 'శాసన ప్రచురణలు (ప్రాథమిక ఆధారాలు)',
        kn: 'ಶಾಸನ ಪ್ರಕಟಣೆಗಳು (ಪ್ರಾಥಮಿಕ ಆಕರಗಳು)',
        ta: 'கல்வெட்டு வெளியீடுகள் (முதன்மை ஆதாரங்கள்)',
        mr: 'शिलालेख प्रकाशने (प्राथमिक स्रोत)',
        or: 'ଶିଳାଲେଖ ପ୍ରକାଶନ (ପ୍ରାଥମିକ ଉତ୍ସ)',
        bn: 'প্রত্নলিপি প্রকাশনা (প্রাথমিক উৎস)'
      }[language],
      description: {
        en: 'Published volumes of the Archaeological Survey of India (ASI) and State Epigraphy Directorates containing facsimiles, Devanagari/Roman transliterations, and historical analyses of copper-plates and stone inscriptions of the Suryavamsha Gajapathi and Odra-Kalinga rulers.',
        hi: 'भारतीय पुरातत्व सर्वेक्षण (ASI) और राज्य पुरालेख निदेशालयों के प्रकाशित खंड जिनमें सूर्यवंश गजपति और ओड्र-कलिंग शासकों के ताम्रपत्रों और शिलालेखों की प्रतिकृतियां, लिप्यंतरण और ऐतिहासिक विश्लेषण शामिल हैं।',
        te: 'సూర్యవంశ గజపతి మరియు ఓడ్ర-కళింగ పాలకుల తామ్రశాసనాలు మరియు శిలాశాసనాల నకళ్లు, లిప్యంతరీకరణలు మరియు చారిత్రక విశ్లేషణలతో కూడిన ఆర్కియాలజికల్ సర్వే ఆఫ్ ఇండియా (ASI) ప్రచురిత సంపుటాలు.',
        kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಮತ್ತು ಓಡ್ರ-ಕಳಿಂಗ ಅರಸರ ತಾಮ್ರಪಟಗಳು ಮತ್ತು ಶಿಲಾಶಾಸನಗಳ ಪ್ರತಿಕೃತಿಗಳು, ಲಿಪ್ಯಂತರಣಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆಗಳನ್ನು ಒಳಗೊಂಡಿರುವ ಭಾರತೀಯ ಪುರಾತತ್ತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆಯ (ASI) ಪ್ರಕಟಿತ ಸಂಪುಟಗಳು.',
        ta: 'சூர்யவம்ச கஜபதி மற்றும் ஒட்ர-கலிங்க மன்னர்களின் செப்பேடுகள் மற்றும் கல்வெட்டுகளின் பிரதிகள், ஒலிபெயர்ப்புகள் மற்றும் வரலாற்று ஆய்வுகளைக் கொண்ட இந்தியத் தொல்லியல் துறையின் (ASI) வெளியீடுகள்.',
        mr: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI) आणि राज्य पुरालेख संचालनालयाचे प्रकाशित खंड ज्यात सूर्यवंश गजपती आणि ओड्र-कलिंग शासकांच्या ताम्रपटांचे आणि शिलालेखांचे लिप्यंतरण व ऐतिहासिक विश्लेषण समाविष्ट आहे.',
        or: 'ଭାରତୀୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ସର୍ବେକ୍ଷଣ (ASI) ଏବଂ ରାଜ୍ୟ ଶିଳାଲେଖ ନିର୍ଦ୍ଦେଶାଳୟର ପ୍ରକାଶିତ ଖଣ୍ଡସମୂହ, ଯେଉଁଥିରେ ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ଏବଂ ଓଡ୍ର-କଳିଙ୍ଗ ଶାସକମାନଙ୍କର ତାମ୍ରଫଳକ ଓ ଶିଳାଲେଖର ଲିପ୍ୟନ୍ତରଣ ଏବଂ ଐତିହାସିକ ବିଶ୍ଳେଷଣ ରହିଛି।',
        bn: 'ভারতের প্রত্নতাত্ত্বিক জরিপ (ASI) এবং রাজ্য প্রত্নলিপি অধিদপ্তরের প্রকাশিত খণ্ডসমূহ, যাতে সূর্যবংশ গজপতি ও ওড্র-কলিঙ্গ শাসকদের তাম্রশাসন ও শিলালিপির প্রতিলিপি ও ঐতিহাসিক বিশ্লেষণ রয়েছে।'
      }[language],
      items: [
        'Epigraphia Indica, Vol. XXXIII (1959–1960), pp. 275–292: "Veligalani Grant of Kapilendra Deva (Saka 1380)", edited by Dr. D.C. Sircar.',
        'South Indian Inscriptions (SII), Vol. IV, V, & VI: Epigraphs of Draksharama, Simhachalam, and Srikurmam.',
        'Epigraphia Carnatica, Vol. VII: Inscriptions relating to Prince Virabhadra Deva at Malebennur.',
        'Inscriptions of Orissa, Vol. V (Part I & II), edited by S.N. Rajaguru, Odisha State Museum, Bhubaneswar.'
      ]
    },
    {
      id: 'ref-monographs',
      category: {
        en: 'Standard Scholarly Monographs (Secondary)',
        hi: 'मानक विद्वत्तापूर्ण मोनोग्राफ (द्वितीयक स्रोत)',
        te: 'ప్రామాణిక పరిశోధన గ్రంథాలు (ద్వితీయ ఆధారాలు)',
        kn: 'ಪ್ರಮಾಣಿತ ವಿದ್ವತ್ಪೂರ್ಣ ಗ್ರಂಥಗಳು (ದ್ವಿತೀಯ ಆಕರಗಳು)',
        ta: 'தரப்படுத்தப்பட்ட ஆராய்ச்சி நூல்கள் (இரண்டாம் நிலை ஆதாரங்கள்)',
        mr: 'प्रमाणित विद्वत्तापूर्ण शोधप्रबंध (दुय्यम स्रोत)',
        or: 'ପ୍ରାମାଣିକ ଗବେଷଣା ଗ୍ରନ୍ଥ (ଦ୍ୱିତୀୟକ ଉତ୍ସ)',
        bn: 'প্রামাণ্য গবেষণা মনোগ্রাফ (দ্বিতীয় পর্যায়ের উৎস)'
      }[language],
      description: {
        en: 'Peer-reviewed academic monographs and university press publications establishing the political chronology, administrative institutions, and military history of the Suryavamshi Gajapathi Empire.',
        hi: 'सूर्यवंशी गजपति साम्राज्य के राजनीतिक कालक्रम, प्रशासनिक संस्थाओं और सैन्य इतिहास को स्थापित करने वाले सहकर्मी-समीक्षित अकादमिक मोनोग्राफ और विश्वविद्यालय प्रेस प्रकाशन।',
        te: 'సూర్యవంశ గజపతి సామ్రాజ్య రాజకీయ కాలక్రమం, పరిపాలనా సంస్థలు మరియు సైనిక చరిత్రను నిర్ధారించే విశ్వవిద్యాలయ ప్రచురణలు మరియు పరిశోధన గ్రంథాలు.',
        kn: 'ಸೂರ್ಯವಂಶಿ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಕೀಯ ಕಾಲಾನುಕ್ರಮ, ಆಡಳಿತ ಸಂಸ್ಥೆಗಳು ಮತ್ತು ಸೈನಿಕ ಇತಿಹಾಸವನ್ನು ಸ್ಥಾಪಿಸುವ ವಿಶ್ವವಿದ್ಯಾಲಯದ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ಸಂಶೋಧನಾ ಗ್ರಂಥಗಳು.',
        ta: 'சூர்யவம்ச கஜபதி பேரரசின் அரசியல் காலவரிசை, நிர்வாக நிறுவனங்கள் மற்றும் இராணுவ வரலாற்றை நிறுவும் பல்கலைக்கழக ஆய்வு நூல்கள்.',
        mr: 'सूर्यवंशी गजपती साम्राज्याचा राजकीय कालक्रम, प्रशासकीय संस्था आणि लष्करी इतिहास प्रस्थापित करणारे विद्यापीठ प्रकाशन आणि संशोधन ग्रंथ.',
        or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ରାଜନୈତିକ କାଳକ୍ରମ, ପ୍ରଶାସନିକ ଅନୁଷ୍ଠାନ ଏବଂ ସାମରିକ ଇତିହାସକୁ ପ୍ରତିଷ୍ଠିତ କରୁଥିବା ବିଶ୍ୱବିଦ୍ୟାଳୟ ପ୍ରକାଶନ ଓ ଗବେଷଣା ଗ୍ରନ୍ଥ।',
        bn: 'সূর্যবংশী গজপতি সাম্রাজ্যের রাজনৈতিক কালানুক্রম, প্রশাসনিক প্রতিষ্ঠান এবং সামরিক ইতিহাস প্রতিষ্ঠাকারী বিশ্ববিদ্যালয় প্রেস প্রকাশনা ও একাডেমিক মনোগ্রাফ।'
      }[language],
      items: [
        'Subrahmanyam, R., "The Suryavamsi Gajapatis of Orissa", Andhra University Press, Waltair, 1957.',
        'Mukherjee, Prabhat, "The History of the Gajapati Kings of Orissa and Their Successors", General Printers & Publishers, Calcutta, 1953.',
        'Sahu, N.K., "History of Orissa", Comprehensive Volumes I & II, Utkal University Press, 1981.',
        'Panigrahi, K.C., "History of Orissa (Hindu Period)", Kitab Mahal, Cuttack, 1981.',
        'Kulke, Hermann, "Kings and Cults: State Formation and Legitimation in India and Southeast Asia", Manohar, 1993.'
      ]
    },
    {
      id: 'ref-chronicles',
      category: {
        en: 'Indigenous Chronicles & Archival Catalogues',
        hi: 'स्वदेशी इतिवृत्त और अभिलेखीय सूचियाँ',
        te: 'దేశీయ వృత్తాంతాలు & పురాతన పత్రాల జాబితాలు',
        kn: 'ದೇಶೀಯ ವೃತ್ತಾಂತಗಳು ಮತ್ತು ಪತ್ರಾಗಾರ ಸೂಚಿಗಳು',
        ta: 'உள்நாட்டு வரலாற்று ஏடுகள் & ஆவணப் பட்டியல்கள்',
        mr: 'स्थानिक बखरी आणि अभिलेखीय तालिका',
        or: 'ଦେଶীয় ଇତିବୃତ୍ତ ଏବଂ ଅଭିଲେଖୀୟ ତାଲିକା',
        bn: 'দেশীয় ইতিবৃত্ত ও আর্কাইভাল ক্যাটালগ'
      }[language],
      description: {
        en: 'Traditional temple chronicles (Madala Panji), village historical registers (Kaifiyats collected by Col. Colin Mackenzie), and state manuscript catalogues.',
        hi: 'पारंपरिक मंदिर इतिवृत्त (मादला पांजी), ग्राम ऐतिहासिक रजिस्टर (कर्नल कॉलिन मैकेंज़ी द्वारा संकलित कैफियत) और राज्य पांडुलिपि सूचियाँ।',
        te: 'సాంప్రదాయ ఆలయ వృత్తాంతాలు (మాదళ పాంజి), గ్రామ చారిత్రక రిజిస్టర్లు (కల్నల్ కాలిన్ మెకెంజీ సేకరించిన కైఫియత్‌లు) మరియు రాష్ట్ర తాళపత్ర జాబితాలు.',
        kn: 'ಸಾಂಪ್ರದಾಯಿಕ ದೇವಾಲಯದ ವೃತ್ತಾಂತಗಳು (ಮಾದಲ ಪಾಂಜಿ), ಗ್ರಾಮ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು (ಕರ್ನಲ್ ಕಾಲಿನ್ ಮೆಕೆಂಜಿ ಸಂಗ್ರಹಿಸಿದ ಕೈಫಿಯತ್‌ಗಳು) ಮತ್ತು ರಾಜ್ಯ ಹಸ್ತಪ್ರತಿ ಸೂಚಿಗಳು.',
        ta: 'பாரம்பரிய கோயில் வரலாற்று ஏடுகள் (மாதல பாஞ்சி), கிராம வரலாற்றுப் பதிவேடுகள் (மெக்கன்சி கைபியத்துகள்) மற்றும் மாநில ஓலைச்சுவடிப் பட்டியல்கள்.',
        mr: 'पारंपारिक मंदिर इतिवृत्त (मादला पांजी), गावचे ऐतिहासिक रजिस्टर (कर्नल कॉलिन मॅकेंझी यांनी संकलित केलेले कैफियत) आणि राज्य हस्तलिखित तालिका.',
        or: 'ପାରମ୍ପରିକ ମନ୍ଦିର ଇତିବୃତ୍ତ (ମାଦଳା ପାଞ୍ଜି), ଗ୍ରାମ ଐତିହାସିକ ରେଜିଷ୍ଟର (କର୍ଣ୍ଣେଲ କଲିନ୍ ମାକେଞ୍ଜିଙ୍କ ଦ୍ୱାରା ସଂଗୃହୀତ କୈଫିୟତ) ଏବଂ ରାଜ୍ୟ ପୋଥି ତାଲିକା।',
        bn: 'ঐতিহ্যবাহী মন্দির ইতিবৃত্ত (মাদলা পাঞ্জি), গ্রাম্য ঐতিহাসিক নিবন্ধ (কর্নেল কলিন ম্যাকেঞ্জি সংগৃহীত কৈফিয়ত) এবং রাজ্য পাণ্ডুলিপি ক্যাটালগ।'
      }[language],
      items: [
        'Madala Panji (Prachi Edition), edited by Prof. A.B. Mohanty, Utkal University, Cuttack.',
        'Mackenzie Manuscripts (Local Kaifiyats of Coastal Andhra and Rayalaseema), Government Oriental Manuscripts Library, Chennai.',
        'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, edited by K.N. Mahapatra, State Archives, Bhubaneswar.'
      ]
    }
  ];

  let modalItem: ContentDetailItem | null = null;
  if (selectedRefKey) {
    const [secId, itemIdxStr] = selectedRefKey.split(':');
    const sec = references.find(r => r.id === secId);
    const archiveBase = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const refImgMap: Record<string, string> = {
      'ref-epigraphy': `${archiveBase}copper_plate_charter.jpg`,
      'ref-monographs': `${archiveBase}kapilendra_deva_lingaraja.jpg`,
      'ref-chronicles': `${archiveBase}odia_palm_leaf_manuscript.jpg`
    };
    const sectionImage = refImgMap[secId] || `${archiveBase}copper_plate_charter.jpg`;
    if (sec) {
      if (itemIdxStr !== undefined) {
        const idx = parseInt(itemIdxStr, 10);
        const item = sec.items[idx];
        if (item) {
          modalItem = {
            id: selectedRefKey,
            title: item.split(':')[0] || sec.category,
            subtitle: sec.category,
            badge: 'Primary / Secondary Citation',
            imageUrl: sectionImage,
            imageLayout: 'banner',
            summary: item,
            content: sec.description,
            sources: [{ title: item }]
          };
        }
      } else {
        modalItem = {
          id: sec.id,
          title: sec.category,
          subtitle: hdr.title,
          badge: 'Verified Bibliographic Corpus',
          imageUrl: sectionImage,
          imageLayout: 'banner',
          summary: sec.description,
          sections: [
            {
              heading: hdr.citationsHeading,
              type: 'list',
              items: sec.items
            }
          ]
        };
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Scroll className="w-4 h-4" />
          <span>{hdr.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {hdr.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {hdr.subtitle}
        </p>
      </div>

      <div className="space-y-8">
        {references.map((section, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedRefKey(section.id)}
            className="p-6 rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-4 shadow-lg cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="font-royal-heading font-bold text-lg text-[#fcedc7] group-hover:text-[#fae29c] transition-colors">
                {section.category}
              </h3>
              <span className="text-xs font-semibold text-[#e8c872]">{hdr.inspectCorpus}</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              {section.description}
            </p>

            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li
                  key={i}
                  onClick={e => {
                    e.stopPropagation();
                    setSelectedRefKey(`${section.id}:${i}`);
                  }}
                  className="text-xs sm:text-sm text-stone-300 hover:text-[#fae29c] flex items-start gap-3 p-1.5 rounded-lg hover:bg-stone-900/60 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ContentDetailModal item={modalItem} onClose={() => setSelectedRefKey(null)} />
    </div>
  );
};


