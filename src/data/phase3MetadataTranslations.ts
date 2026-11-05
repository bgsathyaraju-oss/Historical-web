import type { LanguageCode } from '../types/index.ts';

export interface TimelineMetadataEnrichment {
  year_text: string;
  primary_sources: string;
}

export interface GalleryMetadataEnrichment {
  period: string;
  location: string;
  creator_photographer: string;
  source: string;
  copyright_license: string;
  verification_status: string;
  alt_text: string;
}

export interface DocumentMetadataEnrichment {
  copyright_license: string;
  verification_status: string;
}

export const REVIEWED_STATUS_BY_LANG: Record<LanguageCode, string> = {
  en: 'Reviewed',
  hi: 'समीक्षित एवं सत्यापित',
  te: 'సమీక్షించబడినది & ధృవీకరించబడినది',
  kn: 'ಪರಿಶೀಲಿಸಲಾಗಿದೆ ಮತ್ತು ದೃಢೀಕರಿಸಲಾಗಿದೆ',
  ta: 'மதிப்பாய்வு செய்யப்பட்டு உறுதிப்படுத்தப்பட்டது',
  mr: 'पुनरावलोकन आणि सत्यापित',
  or: 'ସମୀକ୍ଷିତ ଓ ପ୍ରମାଣିତ',
  bn: 'পর্যালোচিত ও যাচাইকৃত'
};

export const CLAIM_STATUS_BY_LANG: Record<string, Record<LanguageCode, string>> = {
  'Verified Supported': {
    en: 'Verified Supported',
    hi: 'शिलालेखीय एवं अभिलेखीय साक्ष्यों द्वारा समर्थित',
    te: 'శాసన & పురావస్తు ఆధారాలచే ధృవీకరించబడింది',
    kn: 'ಶಾಸನ ಮತ್ತು ಪತ್ರಾಗಾರ ಪುರಾವೆಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ',
    ta: 'கல்வெட்டு மற்றும் ஆவணச் சான்றுகளால் உறுதிப்படுத்தப்பட்டது',
    mr: 'शिलालेख व अभिलेखीय पुराव्यांद्वारे समर्थित',
    or: 'ଶିଳାଲେଖ ଓ ଅଭିଲେଖୀୟ ପ୍ରମାଣ ଦ୍ୱାରା ସମର୍ଥିତ',
    bn: 'শিলালিপি ও আর্কাইভাল প্রমাণ দ্বারা সমর্থিত'
  },
  'Contested Interpretation': {
    en: 'Contested Interpretation',
    hi: 'विवेचनात्मक ऐतिहासिक व्याख्या (साहित्यिक बनाम अभिलेखीय)',
    te: 'చారిత్రక-సాహిత్య విశ్లేషణాత్మక వ్యాఖ్యానం',
    kn: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ವ್ಯಾಖ್ಯಾನ',
    ta: 'வரலாற்று மற்றும் இலக்கியப் பகுப்பாய்வு விளக்கம்',
    mr: 'ऐतिहासिक व साहित्यिक विश्लेषणात्मक व्याख्या',
    or: 'ଐତିହାସିକ ଓ ସାହିତ୍ୟିକ ବିଶ୍ଳେଷଣାତ୍ମକ ବ୍ୟାଖ୍ୟା',
    bn: 'ঐতিহাসিক ও সাহিত্যিক বিশ্লেষণাত্মক ব্যাখ্যা'
  }
};

export const TIMELINE_METADATA_ENRICHMENTS: Record<
  string,
  Partial<Record<LanguageCode, TimelineMetadataEnrichment>>
> = {
  ev_kharavela_1st_bce: {
    hi: {
      year_text: 'लगभग प्रथम शताब्दी ईसा पूर्व (c. 1st Century BCE)',
      primary_sources: 'एपिग्राफिया इंडिका (Epigraphia Indica), खंड XX; हाथीगुम्फा शिलालेख — संपादन: के.पी. जायसवाल एवं आर.डी. बनर्जी।'
    },
    te: {
      year_text: 'సుమారు క్రీ.పూ. 1వ శతాబ్దం (c. 1st Century BCE)',
      primary_sources: 'ఎపిగ్రాఫియా ఇండికా (Epigraphia Indica), సంపుటి XX; హాథీగుంఫా శిలాశాసనం — సంపాదకులు: కె.పి. జయస్వాల్ & ఆర్.డి. బెనర్జీ.'
    },
    kn: {
      year_text: 'ಸುಮಾರು ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನ (c. 1st Century BCE)',
      primary_sources: 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ (Epigraphia Indica), ಸಂಪುಟ XX; ಹಾಥಿಗುಂಫಾ ಶಾಸನ — ಸಂಪಾದಕರು: ಕೆ.ಪಿ. ಜಯಸ್ವಾಲ್ ಮತ್ತು ಆರ್.ಡಿ. ಬ್ಯಾನರ್ಜಿ.'
    },
    ta: {
      year_text: 'சுமார் பொ.ஊ.மு. 1-ஆம் நூற்றாண்டு (c. 1st Century BCE)',
      primary_sources: 'எபிகிராஃபியா இண்டிகா (Epigraphia Indica), தொகுதி XX; ஹாதிகும்பா கல்வெட்டு — பதிப்பாசிரியர்கள்: கே.பி. ஜெய்ஸ்வால் & ஆர்.டி. பானர்ஜி.'
    },
    mr: {
      year_text: 'सुमारे इ.स.पू. पहिले शतक (c. 1st Century BCE)',
      primary_sources: 'एपिग्राफिया इंडिका (Epigraphia Indica), खंड XX; हाथीगुम्फा शिलालेख — संपादक: के.पी. जायसवाल आणि आर.डी. बॅनर्जी.'
    },
    or: {
      year_text: 'ପ୍ରାୟ ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ ଶତାବ୍ଦୀ (c. 1st Century BCE)',
      primary_sources: 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା (Epigraphia Indica), ଖଣ୍ଡ XX; ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ — ସମ୍ପାଦନା: କେ.ପି. ଜୟସ୍ୱାଲ ଓ ଆର୍.ଡି. ବାନାର୍ଜୀ।'
    },
    bn: {
      year_text: 'আনুমানিক খ্রিস্টপূর্ব ১ম শতাব্দী (c. 1st Century BCE)',
      primary_sources: 'এপিগ্রাফিয়া ইন্ডিকা (Epigraphia Indica), খণ্ড XX; হাতিগুম্ফা শিলালিপি — সম্পাদনা: কে.পি. জয়সোয়াল ও আর.ডি. ব্যানার্জি।'
    }
  },
  ev_jasma_devi_1120: {
    hi: {
      year_text: 'लगभग 1120 ईस्वी (c. 1120 CE)',
      primary_sources: 'गुजरात राज्य गजेटियर; प्रबंधचिंतामणि (मेरुतुंग रचित); ओड-राजपूत पारंपरिक मौखिक लोकगाथाएं।'
    },
    te: {
      year_text: 'సుమారు క్రీ.శ. 1120 (c. 1120 CE)',
      primary_sources: 'గుజరాత్ స్టేట్ గెజిటీర్; ప్రబంధచింతామణి (మేరుతుంగ); ఓడ్-రాజ్‌పుత్ సాంప్రదాయ జానపద వీరగాథలు.'
    },
    kn: {
      year_text: 'ಸುಮಾರು ಕ್ರಿ.ಶ. 1120 (c. 1120 CE)',
      primary_sources: 'ಗುಜರಾತ್ ರಾಜ್ಯ ಗೆಜೆಟಿಯರ್; ಪ್ರಬಂಧಚಿಂತಾಮಣಿ (ಮೇರುತುಂಗ); ಓಡ್-ರಜಪೂತ್ ಸಾಂಪ್ರದಾಯಿಕ ಲಾವಣಿಗಳು.'
    },
    ta: {
      year_text: 'சுமார் பொ.ஊ. 1120 (c. 1120 CE)',
      primary_sources: 'குஜராத் மாநில விவரச்சுவடி (Gazetteer); பிரபந்தசிந்தாமணி; ஓட்-ராஜபுத் மரபுவழி நாட்டுப்புறக் கதைப்பாடல்கள்.'
    },
    mr: {
      year_text: 'सुमारे इ.स. ११२० (c. 1120 CE)',
      primary_sources: 'गुजरात राज्य गॅझेटियर; प्रबंधचिंतामणी (मेरुतुंग); ओड-राजपूत पारंपरिक मौखिक लोकगाथा.'
    },
    or: {
      year_text: 'ପ୍ରାୟ ୧୧୨୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ (c. 1120 CE)',
      primary_sources: 'ଗୁଜରାଟ ରାଜ୍ୟ ଗେଜେଟିୟର୍; ପ୍ରବନ୍ଧଚିନ୍ତାମଣି (ମେରୁତୁଙ୍ଗ); ଓଡ଼-ରାଜପୁତ ପାରମ୍ପରିକ ଲୋକଗାଥା।'
    },
    bn: {
      year_text: 'আনুমানিক ১১২০ খ্রিস্টাব্দ (c. 1120 CE)',
      primary_sources: 'গুজরাট স্টেট গেজেটিয়ার; প্রবন্ধচিন্তামণি (মেরুতুঙ্গ); ওড-রাজপুত ঐতিহ্যবাহী লোকগাথা।'
    }
  },
  ev_siddharameshwara_1150: {
    hi: {
      year_text: 'लगभग 1150 ईस्वी (c. 1150 CE)',
      primary_sources: 'महाकवि राघवांक रचित सिद्धराम चरित्र (लगभग 1200 ई.); एपिग्राफिया कर्नाटिका; सोलापुर जिला गजेटियर।'
    },
    te: {
      year_text: 'సుమారు క్రీ.శ. 1150 (c. 1150 CE)',
      primary_sources: 'మహాకవి రాఘవాంకుని సిద్ధరామ చరిత్ర (క్రీ.శ. 1200); ఎపిగ్రాఫియా కర్ణాటికా; సోలాపూర్ గెజిటీర్.'
    },
    kn: {
      year_text: 'ಸುಮಾರು ಕ್ರಿ.ಶ. 1150 (c. 1150 CE)',
      primary_sources: 'ಮಹಾಕವಿ ರಾಘವಾಂಕನ ಸಿದ್ಧರಾಮ ಚರಿತ್ರೆ (ಕ್ರಿ.ಶ. 1200); ಎಪಿಗ್ರಾಫಿಯಾ ಕರ್ನಾಟಿಕಾ; ಸೊಲ್ಲಾಪುರ ಗೆಜೆಟಿಯರ್.'
    },
    ta: {
      year_text: 'சுமார் பொ.ஊ. 1150 (c. 1150 CE)',
      primary_sources: 'கவிஞர் ராகவாங்கரின் சித்தராம சரித்திரம் (பொ.ஊ. 1200); எபிகிராஃபியா கர்நாடிகா; சோலாப்பூர் விவரச்சுவடி.'
    },
    mr: {
      year_text: 'सुमारे इ.स. ११५० (c. 1150 CE)',
      primary_sources: 'महाकवी राघवांक रचित सिद्धराम चरित्र (इ.स. १२००); एपिग्राफिया कर्नाटिका; सोलापूर जिल्हा गॅझेटियर.'
    },
    or: {
      year_text: 'ପ୍ରାୟ ୧୧୫୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ (c. 1150 CE)',
      primary_sources: 'ମହାକବି ରାଘବାଙ୍କଙ୍କ ସିଦ୍ଧରାମ ଚରିତ୍ର (୧୨୦୦ ଖ୍ରୀ.); ଏପିଗ୍ରାଫିଆ କର୍ଣ୍ଣାଟିକା; ସୋଲାପୁର ଗେଜେଟିୟର୍।'
    },
    bn: {
      year_text: 'আনুমানিক ১১৫০ খ্রিস্টাব্দ (c. 1150 CE)',
      primary_sources: 'মহাকবি রাঘবাঙ্কের সিদ্ধরাম চরিত্র (১২০০ খ্রি.); এপিগ্রাফিয়া কর্ণাটিকা; সোলাপুর গেজেটিয়ার।'
    }
  },
  ev_1434: {
    hi: {
      year_text: '1434 ईस्वी (1434 CE)',
      primary_sources: 'भुवनेश्वर लिंगराज मंदिर शिलालेख; मादला पांजी (राजभोग खंड, पुरी जगन्नाथ मंदिर इतिवृत्त)।'
    },
    te: {
      year_text: 'క్రీ.శ. 1434 (1434 CE)',
      primary_sources: 'భువనేశ్వర్ లింగరాజ ఆలయ శాసనం; మాదళ పంజి (రాజభోగ విభాగం, పూరి జగన్నాథ ఆలయ చరిత్ర).'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1434 (1434 CE)',
      primary_sources: 'ಭುವನೇಶ್ವರ ಲಿಂಗರಾಜ ದೇವಾಲಯದ ಶಾಸನ; ಮಾದಲಾ ಪಂಜಿ (ರಾಜಭೋಗ ವಿಭಾಗ, ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ವೃತ್ತಾಂತ).'
    },
    ta: {
      year_text: 'பொ.ஊ. 1434 (1434 CE)',
      primary_sources: 'புவனேஸ்வர் லிங்கராஜர் கோயில் கல்வெட்டு; மாதளா பஞ்சி (ராஜபோகப் பிரிவு, புரி ஜெகந்நாதர் கோயில் வரலாறு).'
    },
    mr: {
      year_text: 'इ.स. १४३४ (1434 CE)',
      primary_sources: 'भुवनेश्वर लिंगराज मंदिर शिलालेख; मादला पांजी (राजभोग विभाग, पुरी जगन्नाथ मंदिर बखर).'
    },
    or: {
      year_text: '୧୪୩୪ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1434 CE)',
      primary_sources: 'ଭୁବନେଶ୍ୱର ଲିଙ୍ଗରାଜ ମନ୍ଦିର ଶିଳାଲେଖ; ମାଦଳା ପାଞ୍ଜି (ରାଜଭୋଗ ଖଣ୍ଡ, ପୁରୀ ଶ୍ରୀମନ୍ଦିର ଇତିବୃତ୍ତ)।'
    },
    bn: {
      year_text: '১৪৩৪ খ্রিস্টাব্দ (1434 CE)',
      primary_sources: 'ভুবনেশ্বর লিঙ্গরাজ মন্দির শিলালিপি; মাদলা পাঞ্জি (রাজভোগ খণ্ড, পুরী জগন্নাথ মন্দির ইতিবৃত্ত)।'
    }
  },
  ev_1448: {
    hi: {
      year_text: '1448 ईस्वी (1448 CE)',
      primary_sources: 'साउथ इंडियन इंस्क्रिप्शन्स (दक्षिण भारतीय शिलालेख संग्रह — SII), खंड IV एवं X।'
    },
    te: {
      year_text: 'క్రీ.శ. 1448 (1448 CE)',
      primary_sources: 'సౌత్ ఇండియన్ ఇన్‌స్క్రిప్షన్స్ (దక్షిణ భారత శాసన సంపుటాలు — SII), సంపుటి IV & X.'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1448 (1448 CE)',
      primary_sources: 'ಸೌತ್ ಇಂಡಿಯನ್ ಇನ್ಸ್‌ಕ್ರಿಪ್ಷನ್ಸ್ (ದಕ್ಷಿಣ ಭಾರತೀಯ ಶಾಸನ ಸಂಪುಟಗಳು — SII), ಸಂಪುಟ IV ಮತ್ತು X.'
    },
    ta: {
      year_text: 'பொ.ஊ. 1448 (1448 CE)',
      primary_sources: 'தென்னிந்தியக் கல்வெட்டுத் தொகுதிகள் (South Indian Inscriptions — SII), தொகுதி IV & X.'
    },
    mr: {
      year_text: 'इ.स. १४४८ (1448 CE)',
      primary_sources: 'साउथ इंडियन इन्स्क्रिप्शन्स (दक्षिण भारतीय शिलालेख खंड — SII), खंड IV आणि X.'
    },
    or: {
      year_text: '୧୪୪୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1448 CE)',
      primary_sources: 'ସାଉଥ୍ ଇଣ୍ଡିଆନ୍ ଇନସ୍କ୍ରିପସନ୍ସ (ଦକ୍ଷିଣ ଭାରତୀୟ ଶିଳାଲେଖ ସଂକଳନ — SII), ଖଣ୍ଡ IV ଓ X।'
    },
    bn: {
      year_text: '১৪৪৮ খ্রিস্টাব্দ (1448 CE)',
      primary_sources: 'সাউথ ইন্ডিয়ান ইনস্ক্রিপশনস (দক্ষিণ ভারতীয় শিলালিপি সংকলন — SII), খণ্ড IV ও X।'
    }
  },
  ev_kolletikota_gajapathi_garrison: {
    hi: {
      year_text: 'लगभग 1450 ईस्वी (c. 1450 CE)',
      primary_sources: 'मैकेंज़ी पांडुलिपियां (कोल्लेटिकोटा एवं कैकलूरु कैफियत); साउथ इंडियन इंस्क्रिप्शन्स खंड X; इंपीरियल गजेटियर।'
    },
    te: {
      year_text: 'సుమారు క్రీ.శ. 1450 (c. 1450 CE)',
      primary_sources: 'మెకెంజీ తాళపత్ర ప్రతులు (కొల్లేటికోట & కైకలూరు కైఫియత్‌లు); సౌత్ ఇండియన్ ఇన్‌స్క్రిప్షన్స్ సంపుటి X; ఇంపీరియల్ గెజిటీర్.'
    },
    kn: {
      year_text: 'ಸುಮಾರು ಕ್ರಿ.ಶ. 1450 (c. 1450 CE)',
      primary_sources: 'ಮೆಕೆಂಜಿ ಹಸ್ತಪ್ರತಿಗಳು (ಕೊಲ್ಲೇಟಿಕೋಟ ಮತ್ತು ಕೈಕಲೂರು ಕೈಫಿಯತ್‌ಗಳು); ಸೌತ್ ಇಂಡಿಯನ್ ಇನ್ಸ್‌ಕ್ರಿಪ್ಷನ್ಸ್ ಸಂಪುಟ X; ಇಂಪೀರಿಯಲ್ ಗೆಜೆಟಿಯರ್.'
    },
    ta: {
      year_text: 'சுமார் பொ.ஊ. 1450 (c. 1450 CE)',
      primary_sources: 'மெக்கன்சி சுவடிகள் (கொல்லேட்டிகோட்டா & கைகலூரு கைஃபியத்துகள்); தென்னிந்தியக் கல்வெட்டுகள் தொகுதி X; இம்பீரியல் கெசட்டியர்.'
    },
    mr: {
      year_text: 'सुमारे इ.स. १४५० (c. 1450 CE)',
      primary_sources: 'मॅकेंझी हस्तलिखिते (कोल्लेतिकोटा व कैकलुरू कैफियत); साउथ इंडियन इन्स्क्रिप्शन्स खंड X; इम्पीरियल गॅझेटियर.'
    },
    or: {
      year_text: 'ପ୍ରାୟ ୧୪୫୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ (c. 1450 CE)',
      primary_sources: 'ମାକେଞ୍ଜି ପୋଥି (କୋଲ୍ଲେତିକୋଟା ଓ କୈକଲୁରୁ କୈଫିୟତ); ସାଉଥ୍ ଇଣ୍ଡିଆନ୍ ଇନସ୍କ୍ରିପସନ୍ସ ଖଣ୍ଡ X; ଇମ୍ପେରିଆଲ୍ ଗେଜେଟିୟର୍।'
    },
    bn: {
      year_text: 'আনুমানিক ১৪৫০ খ্রিস্টাব্দ (c. 1450 CE)',
      primary_sources: 'ম্যাকেঞ্জি পাণ্ডুলিপি (কোল্লেতিকোটা ও কৈকলুরু কৈফিয়ত); সাউথ ইন্ডিয়ান ইনস্ক্রিপশনস খণ্ড X; ইম্পেরিয়াল গেজেটিয়ার।'
    }
  },
  ev_1458: {
    hi: {
      year_text: '1458 ईस्वी (1458 CE)',
      primary_sources: 'एपिग्राफिया इंडिका (Epigraphia Indica), खंड XXXIII — संपादक: डॉ. डी.सी. सरकार (D.C. Sircar)।'
    },
    te: {
      year_text: 'క్రీ.శ. 1458 (1458 CE)',
      primary_sources: 'ఎపిగ్రాఫియా ఇండికా (Epigraphia Indica), సంపుటి XXXIII — సంపాదకులు: డా. డి.సి. సర్కార్ (D.C. Sircar).'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1458 (1458 CE)',
      primary_sources: 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ (Epigraphia Indica), ಸಂಪುಟ XXXIII — ಸಂಪಾದಕರು: ಡಾ. ಡಿ.ಸಿ. ಸರ್ಕಾರ್ (D.C. Sircar).'
    },
    ta: {
      year_text: 'பொ.ஊ. 1458 (1458 CE)',
      primary_sources: 'எபிகிராஃபியா இண்டிகா (Epigraphia Indica), தொகுதி XXXIII — பதிப்பாசிரியர்: டாக்டர் டி.சி. சர்க்கார் (D.C. Sircar).'
    },
    mr: {
      year_text: 'इ.स. १४५८ (1458 CE)',
      primary_sources: 'एपिग्राफिया इंडिका (Epigraphia Indica), खंड XXXIII — संपादक: डॉ. डी.सी. सरकार (D.C. Sircar).'
    },
    or: {
      year_text: '୧୪୫୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1458 CE)',
      primary_sources: 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା (Epigraphia Indica), ଖଣ୍ଡ XXXIII — ସମ୍ପାଦକ: ଡ. ଡି.ସି. ସରକାର (D.C. Sircar)।'
    },
    bn: {
      year_text: '১৪৫৮ খ্রিস্টাব্দ (1458 CE)',
      primary_sources: 'এপিগ্রাফিয়া ইন্ডিকা (Epigraphia Indica), খণ্ড XXXIII — সম্পাদক: ড. ডি.সি. সরকার (D.C. Sircar)।'
    }
  },
  ev_1464: {
    hi: {
      year_text: '1464 ईस्वी (1464 CE)',
      primary_sources: 'भारतीय पुरालेख पर वार्षिक रिपोर्ट (Annual Report on Indian Epigraphy — ARIE) 1937–38, शिलालेख सं. 312।'
    },
    te: {
      year_text: 'క్రీ.శ. 1464 (1464 CE)',
      primary_sources: 'భారతీయ శాసన వార్షిక నివేదిక (Annual Report on Indian Epigraphy — ARIE) 1937–38, శాసన సంఖ్య 312.'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1464 (1464 CE)',
      primary_sources: 'ಭಾರತೀಯ ಶಾಸನಗಳ ವಾರ್ಷಿಕ ವರದಿ (Annual Report on Indian Epigraphy — ARIE) 1937–38, ಶಾಸನ ಸಂಖ್ಯೆ 312.'
    },
    ta: {
      year_text: 'பொ.ஊ. 1464 (1464 CE)',
      primary_sources: 'இந்தியக் கல்வெட்டு ஆண்டறிக்கை (Annual Report on Indian Epigraphy — ARIE) 1937–38, கல்வெட்டு எண் 312.'
    },
    mr: {
      year_text: 'इ.स. १४६४ (1464 CE)',
      primary_sources: 'भारतीय शिलालेख वार्षिक अहवाल (Annual Report on Indian Epigraphy — ARIE) १९३७–३८, शिलालेख क्र. ३१२.'
    },
    or: {
      year_text: '୧୪୬୪ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1464 CE)',
      primary_sources: 'ଭାରତୀୟ ଶିଳାଲେଖ ବାର୍ଷିକ ରିପୋର୍ଟ (Annual Report on Indian Epigraphy — ARIE) ୧୯୩୭–୩୮, ଶିଳାଲେଖ ସଂଖ୍ୟା ୩୧୨।'
    },
    bn: {
      year_text: '১৪৬৪ খ্রিস্টাব্দ (1464 CE)',
      primary_sources: 'ভারতীয় প্রত্নলিপি বার্ষিক প্রতিবেদন (Annual Report on Indian Epigraphy — ARIE) ১৯৩৭–৩৮, শিলালিপি নং ৩১২।'
    }
  },
  ev_1489: {
    hi: {
      year_text: '1489 ईस्वी (1489 CE)',
      primary_sources: 'एपिग्राफिया इंडिका (Epigraphia Indica); बलराम दास एवं पुरुषोत्तम दास रचित कांची-कावेरी पारंपरिक काव्य।'
    },
    te: {
      year_text: 'క్రీ.శ. 1489 (1489 CE)',
      primary_sources: 'ఎపిగ్రాఫియా ఇండికా (Epigraphia Indica); బలరామ దాసు రచించిన కాంచీ-కావేరీ సాంప్రదాయ కావ్యం.'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1489 (1489 CE)',
      primary_sources: 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ (Epigraphia Indica); ಬಲರಾಮ ದಾಸ ರಚಿತ ಕಾಂಚಿ-ಕಾವೇರಿ ಸಾಂಪ್ರದಾಯಿಕ ಕಾವ್ಯ.'
    },
    ta: {
      year_text: 'பொ.ஊ. 1489 (1489 CE)',
      primary_sources: 'எபிகிராஃபியா இண்டிகா (Epigraphia Indica); பலராம தாசர் இயற்றிய காஞ்சி-காவேரி மரபுக் காவியம்.'
    },
    mr: {
      year_text: 'इ.स. १४८९ (1489 CE)',
      primary_sources: 'एपिग्राफिया इंडिका (Epigraphia Indica); बलराम दास रचित कांची-कावेरी पारंपरिक काव्य.'
    },
    or: {
      year_text: '୧୪୮୯ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1489 CE)',
      primary_sources: 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା (Epigraphia Indica); ବଳରାମ ଦାସ ଓ ପୁରୁଷୋତ୍ତମ ଦାସଙ୍କ ରଚିତ କାଞ୍ଚି-କାବେରୀ ପାରମ୍ପରିକ କାବ୍ୟ।'
    },
    bn: {
      year_text: '১৪৮৯ খ্রিস্টাব্দ (1489 CE)',
      primary_sources: 'এপিগ্রাফিয়া ইন্ডিকা (Epigraphia Indica); বলরাম দাস রচিত কাঞ্চী-কাবেরী ঐতিহ্যবাহী কাব্য।'
    }
  },
  ev_1515: {
    hi: {
      year_text: '1515–1519 ईस्वी (1515–1519 CE)',
      primary_sources: 'रायवाचकमु; सरस्वती विलास; हम्पी एवं सिंहाचलम के समकालीन शिलालेख।'
    },
    te: {
      year_text: 'క్రీ.శ. 1515–1519 (1515–1519 CE)',
      primary_sources: 'రాయవాచకము; సరస్వతీ విలాసం; హంపి మరియు సింహాచలం సమకాలీన శిలాశాసనాలు.'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1515–1519 (1515–1519 CE)',
      primary_sources: 'ರಾಯವಾಚಕಮು; ಸರಸ್ವತೀ ವಿಲಾಸ; ಹಂಪಿ ಮತ್ತು ಸಿಂಹಾಚಲಂನ ಸಮಕಾಲೀನ ಶಾಸನಗಳು.'
    },
    ta: {
      year_text: 'பொ.ஊ. 1515–1519 (1515–1519 CE)',
      primary_sources: 'ராயவாசகமு; சரஸ்வதி விலாசம்; ஹம்பி மற்றும் சிம்மாசலம் கோயில் கல்வெட்டுகள்.'
    },
    mr: {
      year_text: 'इ.स. १५१५–१५१९ (1515–1519 CE)',
      primary_sources: 'रायवाचकमु; सरस्वती विलास; हम्पी आणि सिंहाचलम येथील समकालीन शिलालेख.'
    },
    or: {
      year_text: '୧୫୧୫–୧୫୧୯ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1515–1519 CE)',
      primary_sources: 'ରାୟବାଚକମୁ; ସରସ୍ୱତୀ ବିଳାସ; ହମ୍ପି ଓ ସିଂହାଚଳମର ସମକାଳୀନ ଶିଳାଲେଖ।'
    },
    bn: {
      year_text: '১৫১৫–১৫১৯ খ্রিস্টাব্দ (1515–1519 CE)',
      primary_sources: 'রায়বাচকমু; সরস্বতী বিলাস; হাম্পি ও সিংহাচলমের সমকালীন শিলালিপি।'
    }
  },
  ev_1568: {
    hi: {
      year_text: '1568 ईस्वी (1568 CE)',
      primary_sources: 'अकबरनामा (अबुल फज़ल); मादला पांजी; रियाज़-उस-सलातीन।'
    },
    te: {
      year_text: 'క్రీ.శ. 1568 (1568 CE)',
      primary_sources: 'అక్బర్‌నామా (అబుల్ ఫజల్); మాదళ పంజి; రియాజ్-ఉస్-సలాతీన్.'
    },
    kn: {
      year_text: 'ಕ್ರಿ.ಶ. 1568 (1568 CE)',
      primary_sources: 'ಅಕ್ಬರ್‌ನಾಮಾ (ಅಬುಲ್ ಫಜಲ್); ಮಾದಲಾ ಪಂಜಿ; ರಿಯಾಜ್-ಉಸ್-ಸಲಾತೀನ್.'
    },
    ta: {
      year_text: 'பொ.ஊ. 1568 (1568 CE)',
      primary_sources: 'அக்பர்நாமா (அபுல் ஃபசல்); மாதளா பஞ்சி; ரியாஸ்-உஸ்-சலாதீன்.'
    },
    mr: {
      year_text: 'इ.स. १५६८ (1568 CE)',
      primary_sources: 'अकबरनामा (अबुल फजल); मादला पांजी; रियाझ-उस-सलातीन.'
    },
    or: {
      year_text: '୧୫୬୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ (1568 CE)',
      primary_sources: 'ଆକବରନାମା (ଅବୁଲ ଫଜଲ); ମାଦଳା ପାଞ୍ଜି; ରିୟାଜ-ଉସ-ସଲାତିନ।'
    },
    bn: {
      year_text: '১৫৬৮ খ্রিস্টাব্দ (1568 CE)',
      primary_sources: 'আকবরনামা (আবুল ফজল); মাদলা পাঞ্জি; রিয়াজ-উস-সালাতিন।'
    }
  }
};

export const GALLERY_METADATA_ENRICHMENTS: Record<
  string,
  Partial<Record<LanguageCode, GalleryMetadataEnrichment>>
> = {
  gal_01: {
    hi: {
      period: '15वीं शताब्दी ईस्वी (15th Century CE)',
      location: 'कटक, ओडिशा',
      creator_photographer: 'भारतीय पुरातत्व सर्वेक्षण (ASI) अभिलेखागार',
      source: 'भारतीय पुरातत्व सर्वेक्षण छायाचित्र संग्रह (ASI OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / मुक्त शैक्षणिक उपयोग',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'कटक में बाराबती दुर्ग की तराशी हुई बलुआ पत्थर की प्राचीरें और गहरी रक्षात्मक खाई'
    },
    te: {
      period: 'క్రీ.శ. 15వ శతాబ్దం (15th Century CE)',
      location: 'కటక్, ఒడిశా',
      creator_photographer: 'భారత పురావస్తు సర్వే సంస్థ (ASI) భాండాగారం',
      source: 'ASI ఛాయాచిత్ర సేకరణ (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / విద్యాపరమైన ఉచిత వినియోగం',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'కటక్‌లోని బారాబతి కోట యొక్క రాతి బురుజులు మరియు లోతైన రక్షణ కందకం'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 15ನೇ ಶತಮಾನ (15th Century CE)',
      location: 'ಕಟಕ್, ಒಡಿಶಾ',
      creator_photographer: 'ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI) ಪತ್ರಾಗಾರ',
      source: 'ASI ಛಾಯಾಚಿತ್ರ ಸಂಗ್ರಹ (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / ಮುಕ್ತ ಶೈಕ್ಷಣಿಕ ಬಳಕೆ',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ಕಟಕ್‌ನ ಬಾರಾಬತಿ ಕೋಟೆಯ ಕೆತ್ತಿದ ಮರಳುಗಲ್ಲಿನ ಗೋಡೆಗಳು ಮತ್ತು ಆಳವಾದ ಕಂದಕ'
    },
    ta: {
      period: 'பொ.ஊ. 15-ஆம் நூற்றாண்டு (15th Century CE)',
      location: 'கட்டக், ஒடிசா',
      creator_photographer: 'இந்தியத் தொல்லியல் துறையின் (ASI) ஆவணக் காப்பகம்',
      source: 'ASI புகைப்படத் தொகுப்பு (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / கல்விப் பயன்பாட்டு உரிமம்',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'கட்டக்கில் உள்ள பாராபதி கோட்டையின் மணற்கல் மதிற்சுவர்கள் மற்றும் ஆழமான அகழி'
    },
    mr: {
      period: 'इ.स. १५ वे शतक (15th Century CE)',
      location: 'कटक, ओडिशा',
      creator_photographer: 'भारतीय पुरातत्त्व सर्वेक्षण (ASI) अभिलेखागार',
      source: 'ASI छायाचित्र संग्रह (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / मुक्त शैक्षणिक वापर',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'कटक येथील बाराबती किल्ल्याची घडीव दगडी तटबंदी आणि खोल खंदक'
    },
    or: {
      period: '୧୫ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ (15th Century CE)',
      location: 'କଟକ, ଓଡ଼ିଶା',
      creator_photographer: 'ଭାରତୀୟ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ (ASI) ଅଭିଲେଖାଗାର',
      source: 'ASI ଫଟୋଚିତ୍ର ସଂଗ୍ରହ (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / ମୁକ୍ତ ଶିକ୍ଷାଗତ ବ୍ୟବହାର',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'କଟକସ୍ଥିତ ବାରବାଟୀ ଦୁର୍ଗର ପଥର ପ୍ରାଚୀର ଏବଂ ଗଭୀର ପ୍ରତିରକ୍ଷା ଖାଇ'
    },
    bn: {
      period: '১৫শ শতাব্দী খ্রিস্টাব্দ (15th Century CE)',
      location: 'কটক, ওড়িশা',
      creator_photographer: 'ভারতীয় প্রত্নতাত্ত্বিক জরিপ (ASI) আর্কাইভ',
      source: 'ASI আলোকচিত্র সংগ্রহ (OD-CTK-14)',
      copyright_license: 'CC BY-SA 4.0 / উন্মুক্ত শিক্ষামূলক ব্যবহার',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'কটকের বারবাটি দুর্গের পাথরের প্রাচীর এবং গভীর প্রতিরক্ষামূলক পরিখা'
    }
  },
  gal_02: {
    hi: {
      period: 'लगभग 1448 ईस्वी (c. 1448 CE)',
      location: 'पुरी, ओडिशा',
      creator_photographer: 'ओड्र विरासत प्रलेखन परियोजना (Odra Heritage Documentation Project)',
      source: 'पुरी अभिलेखीय सर्वेक्षण 2024',
      copyright_license: 'क्रिएटिव कॉमन्स एट्रिब्यूशन 4.0 (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'पुरी जगन्नाथ मंदिर के चारों ओर कपिलेंद्र देव द्वारा निर्मित विशाल किलेबंद पत्थर की प्राचीर (मेघनाद पचेरी)'
    },
    te: {
      period: 'సుమారు క్రీ.శ. 1448 (c. 1448 CE)',
      location: 'పూరి, ఒడిశా',
      creator_photographer: 'ఓడ్ర వారసత్వ డాక్యుమెంటేషన్ ప్రాజెక్ట్',
      source: 'పూరి పురాతత్వ సర్వే 2024',
      copyright_license: 'క్రియేటివ్ కామన్స్ అట్రిబ్యూషన్ 4.0 (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'పూరి జగన్నాథ ఆలయం చుట్టూ కపిలేంద్ర దేవుడు నిర్మించిన రక్షణ రాతి ప్రాకారం (మేఘనాద పచేరి)'
    },
    kn: {
      period: 'ಸುಮಾರು ಕ್ರಿ.ಶ. 1448 (c. 1448 CE)',
      location: 'ಪುರಿ, ಒಡಿಶಾ',
      creator_photographer: 'ಓಡ್ರ ಪರಂಪರೆ ದಾಖಲಾತಿ ಯೋಜನೆ',
      source: 'ಪುರಿ ಪತ್ರಾಗಾರ ಸಮೀಕ್ಷೆ 2024',
      copyright_license: 'ಕ್ರಿಯೇಟಿವ್ ಕಾಮನ್ಸ್ ಅಟ್ರಿಬ್ಯೂಷನ್ 4.0 (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಸುತ್ತ ಕಪಿಲೇಂದ್ರ ದೇವ ನಿರ್ಮಿಸಿದ ಭದ್ರವಾದ ಕಲ್ಲಿನ ಕೋಟೆ ಗೋಡೆ (ಮೇಘನಾದ ಪಚೇರಿ)'
    },
    ta: {
      period: 'சுமார் பொ.ஊ. 1448 (c. 1448 CE)',
      location: 'புரி, ஒடிசா',
      creator_photographer: 'ஒட்ர பாரம்பரிய ஆவணத் திட்டம்',
      source: 'புரி ஆவணக் கள ஆய்வு 2024',
      copyright_license: 'கிரியேட்டிவ் காமன்ஸ் அட்ரிபியூஷன் 4.0 (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'புரி ஜெகந்நாதர் கோயிலைச் சுற்றி கபிலேந்திர தேவரால் எழுப்பப்பட்ட மேகநாத பச்சேரி கற்கோட்டை மதில்'
    },
    mr: {
      period: 'सुमारे इ.स. १४४८ (c. 1448 CE)',
      location: 'पुरी, ओडिशा',
      creator_photographer: 'ओड्र वारसा दस्तऐवजीकरण प्रकल्प',
      source: 'पुरी अभिलेखीय सर्वेक्षण २०२४',
      copyright_license: 'क्रिएटिव्ह कॉमन्स ॲट्रिब्युशन ४.० (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'पुरी जगन्नाथ मंदिराभोवती कपिलेंद्र देवांनी उभारलेली भक्कम दगडी तटबंदी (मेघनाद पचेरी)'
    },
    or: {
      period: 'ପ୍ରାୟ ୧୪୪୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ (c. 1448 CE)',
      location: 'ପୁରୀ, ଓଡ଼ିଶା',
      creator_photographer: 'ଓଡ୍ର ଐତିହ୍ୟ ପ୍ରଲେଖନ ପ୍ରକଳ୍ପ',
      source: 'ପୁରୀ ଅଭିଲେଖୀୟ ସର୍ବେକ୍ଷଣ ୨୦୨୪',
      copyright_license: 'କ୍ରିଏଟିଭ୍ କମନ୍ସ ଆଟ୍ରିବ୍ୟୁସନ୍ ୪.୦ (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ଚାରିପାଖରେ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ସୁଦୃଢ଼ ମେଘନାଦ ପାଚେରୀ'
    },
    bn: {
      period: 'আনুমানিক ১৪৪৮ খ্রিস্টাব্দ (c. 1448 CE)',
      location: 'পুরী, ওড়িশা',
      creator_photographer: 'ওড্র ঐতিহ্য নথিকরণ প্রকল্প',
      source: 'পুরী আর্কাইভাল জরিপ ২০২৪',
      copyright_license: 'ক্রিয়েটিভ কমনস অ্যাট্রিবিউশন ৪.০ (CC BY 4.0)',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'পুরী জগন্নাথ মন্দিরের চারপাশে কপিলেন্দ্র দেব নির্মিত সুদৃঢ় পাথরের মেঘনাদ প্রাচীর'
    }
  },
  gal_03: {
    hi: {
      period: '13वीं शताब्दी ईस्वी (13th Century CE)',
      location: 'कोणार्क, ओडिशा',
      creator_photographer: 'राष्ट्रीय सांस्कृतिक विरासत मिशन (National Cultural Heritage Mission)',
      source: 'कोणार्क पुरातात्विक अभिलेख (Konark Archaeological Record)',
      copyright_license: 'सार्वजनिक डोमेन समर्पित (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'कोणार्क सूर्य मंदिर के रथ का सूक्ष्म नक्काशीदार पाषाण चक्र'
    },
    te: {
      period: 'క్రీ.శ. 13వ శతాబ్దం (13th Century CE)',
      location: 'కోణార్క్, ఒడిశా',
      creator_photographer: 'జాతీయ సాంస్కృతిక వారసత్వ మిషన్',
      source: 'కోణార్క్ పురావస్తు రికార్డు',
      copyright_license: 'పబ్లిక్ డొమైన్ అంకితం (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'కోణార్క్ సూర్య దేవాలయ రథం యొక్క సూక్ష్మ శిల్పకళా రాతి చక్రం'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 13ನೇ ಶತಮಾನ (13th Century CE)',
      location: 'ಕೊನಾರ್ಕ್, ಒಡಿಶಾ',
      creator_photographer: 'ರಾಷ್ಟ್ರೀಯ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ ಮಿಷನ್',
      source: 'ಕೊನಾರ್ಕ್ ಪುರಾತತ್ವ ದಾಖಲೆ',
      copyright_license: 'ಸಾರ್ವಜನಿಕ ವಲಯಕ್ಕೆ ಸಮರ್ಪಿತ (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ಕೊನಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ ರಥದ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಯ ಕಲ್ಲಿನ ಚಕ್ರ'
    },
    ta: {
      period: 'பொ.ஊ. 13-ஆம் நூற்றாண்டு (13th Century CE)',
      location: 'கோனார்க், ஒடிசா',
      creator_photographer: 'தேசிய கலாச்சார பாரம்பரிய இயக்கம்',
      source: 'கோனார்க் தொல்லியல் ஆவணம்',
      copyright_license: 'பொதுக் கள அர்ப்பணிப்பு (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'கோனார்க் சூரிய கோயில் தேரின் நுணுக்கமான சிற்ப வேலைப்பாடு கொண்ட கல் சக்கரம்'
    },
    mr: {
      period: 'इ.स. १३ वे शतक (13th Century CE)',
      location: 'कोणार्क, ओडिशा',
      creator_photographer: 'राष्ट्रीय सांस्कृतिक वारसा अभियान',
      source: 'कोणार्क पुरातत्त्वीय नोंद',
      copyright_license: 'सार्वजनिक डोमेन समर्पित (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'कोणार्क येथील सूर्यमंदिराच्या रथाचे कोरीव दगडी चाक'
    },
    or: {
      period: '୧୩ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ (13th Century CE)',
      location: 'କୋଣାର୍କ, ଓଡ଼ିଶା',
      creator_photographer: 'ଜାତୀୟ ସାଂସ୍କୃତିକ ଐତିହ୍ୟ ମିଶନ',
      source: 'କୋଣାର୍କ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖ',
      copyright_license: 'ସାର୍ବଜନୀନ ଡୋମେନ୍ ସମର୍ପିତ (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ରଥର ସୂକ୍ଷ୍ମ କାରୁକାର୍ଯ୍ୟପୂର୍ଣ୍ଣ ପଥର ଚକ'
    },
    bn: {
      period: '১৩শ শতাব্দী খ্রিস্টাব্দ (13th Century CE)',
      location: 'কোণার্ক, ওড়িশা',
      creator_photographer: 'জাতীয় সাংস্কৃতিক ঐতিহ্য মিশন',
      source: 'কোণার্ক প্রত্নতাত্ত্বিক নথি',
      copyright_license: 'পাবলিক ডোমেইন নিবেদিত (Public Domain Dedicated)',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'কোণার্ক সূর্য মন্দিরের রথের সূক্ষ্ম কারুকার্যময় পাথরের চাকা'
    }
  },
  gal_04: {
    hi: {
      period: '15वीं शताब्दी ईस्वी (15th Century CE)',
      location: 'पलनाडु जिला, आंध्र प्रदेश',
      creator_photographer: 'दक्कन ऐतिहासिक सर्वेक्षण (Deccan Historical Survey)',
      source: 'आंध्र प्रदेश राज्य पुरातत्व अभिलेखागार',
      copyright_license: 'क्रिएटिव कॉमन्स CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'कोंडावीडु गिरिदुर्ग की सुदृढ़ ग्रेनाइट रक्षात्मक प्राचीरें और प्रहरी बुर्ज'
    },
    te: {
      period: 'క్రీ.శ. 15వ శతాబ్దం (15th Century CE)',
      location: 'పల్నాడు జిల్లా, ఆంధ్రప్రదేశ్',
      creator_photographer: 'దక్కన్ హిస్టారికల్ సర్వే',
      source: 'ఆంధ్రప్రదేశ్ రాష్ట్ర పురావస్తు శాఖ భాండాగారం',
      copyright_license: 'క్రియేటివ్ కామన్స్ CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'కొండవీడు కొండ కోట యొక్క దృఢమైన గ్రానైట్ రక్షణ ప్రాకారాలు మరియు బురుజులు'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 15ನೇ ಶತಮಾನ (15th Century CE)',
      location: 'ಪಲ್ನಾಡು ಜಿಲ್ಲೆ, ಆಂಧ್ರಪ್ರದೇಶ',
      creator_photographer: 'ದಕ್ಕನ್ ಐತಿಹಾಸಿಕ ಸಮೀಕ್ಷೆ',
      source: 'ಆಂಧ್ರಪ್ರದೇಶ ರಾಜ್ಯ ಪುರಾತತ್ವ ಪತ್ರಾಗಾರ',
      copyright_license: 'ಕ್ರಿಯೇಟಿವ್ ಕಾಮನ್ಸ್ CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ಕೊಂಡವೀಡು ಬೆಟ್ಟದ ಕೋಟೆಯ ಬಲಿಷ್ಠ ಗ್ರಾನೈಟ್ ರಕ್ಷಣಾ ಗೋಡೆಗಳು ಮತ್ತು ಕಾವಲು ಗೋಪುರ'
    },
    ta: {
      period: 'பொ.ஊ. 15-ஆம் நூற்றாண்டு (15th Century CE)',
      location: 'பல்நாடு மாவட்டம், ஆந்திரப் பிரதேசம்',
      creator_photographer: 'தக்காண வரலாற்று ஆய்வுத் துறை',
      source: 'ஆந்திரப் பிரதேச மாநிலத் தொல்லியல் ஆவணக் காப்பகம்',
      copyright_license: 'கிரியேட்டிவ் காமன்ஸ் CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'கொண்டவீடு மலைக்கோட்டையின் வலிமையான கருங்கல் அரண்கள் மற்றும் கண்காணிப்புக் கோபுரம்'
    },
    mr: {
      period: 'इ.स. १५ वे शतक (15th Century CE)',
      location: 'पलनाडू जिल्हा, आंध्र प्रदेश',
      creator_photographer: 'दख्खन ऐतिहासिक सर्वेक्षण',
      source: 'आंध्र प्रदेश राज्य पुरातत्त्व अभिलेखागार',
      copyright_license: 'क्रिएटिव्ह कॉमन्स CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'कोंडावीडू डोंगरी किल्ल्याची भक्कम ग्रॅनाइट तटबंदी आणि टेहळणी बुरुज'
    },
    or: {
      period: '୧୫ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ (15th Century CE)',
      location: 'ପଲନାଡୁ ଜିଲ୍ଲା, ଆନ୍ଧ୍ରପ୍ରଦେଶ',
      creator_photographer: 'ଦାକ୍ଷିଣାତ୍ୟ ଐତିହାସିକ ସର୍ବେକ୍ଷଣ',
      source: 'ଆନ୍ଧ୍ରପ୍ରଦେଶ ରାଜ୍ୟ ପ୍ରତ୍ନତତ୍ତ୍ୱ ଅଭିଲେଖାଗାର',
      copyright_license: 'କ୍ରିଏଟିଭ୍ କମନ୍ସ CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'କୋଣ୍ଡାଭିଡୁ ଗିରିଦୁର୍ଗର ସୁଦୃଢ଼ ଗ୍ରାନାଇଟ୍ ପ୍ରତିରକ୍ଷା ପ୍ରାଚୀର ଓ ପ୍ରହରୀ ବୁରୁଜ'
    },
    bn: {
      period: '১৫শ শতাব্দী খ্রিস্টাব্দ (15th Century CE)',
      location: 'পলনাড়ু জেলা, অন্ধ্রপ্রদেশ',
      creator_photographer: 'দাক্ষিণাত্য ঐতিহাসিক জরিপ',
      source: 'অন্ধ্রপ্রদেশ রাজ্য প্রত্নতত্ত্ব আর্কাইভ',
      copyright_license: 'ক্রিয়েটিভ কমনস CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'কোন্ডাভিডু পাহাড়ি দুর্গের সুদৃঢ় গ্রানাইট প্রতিরক্ষা প্রাচীর ও প্রহরী বুরুজ'
    }
  },
  gal_05: {
    hi: {
      period: '16वीं शताब्दी ईस्वी (16th Century CE)',
      location: 'ओडिशा राज्य संग्रहालय, भुवनेश्वर',
      creator_photographer: 'संग्रहालय अभिलेखीय डिजिटलीकरण इकाई',
      source: 'ओडिशा राज्य अभिलेखागार विशेष संग्रह',
      copyright_license: 'शैक्षणिक उचित उपयोग / अभिलेखीय रिकॉर्ड',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'डोरी से बंधा ताड़पत्र पांडुलिपि बंडल जिस पर लोहे की लेखनी से उड़िया और संस्कृत अक्षर उत्कीर्ण हैं'
    },
    te: {
      period: 'క్రీ.శ. 16వ శతాబ్దం (16th Century CE)',
      location: 'ఒడిశా స్టేట్ మ్యూజియం, భువనేశ్వర్',
      creator_photographer: 'మ్యూజియం ఆర్కైవల్ డిజిటైజేషన్ యూనిట్',
      source: 'ఒడిశా స్టేట్ ఆర్కైవ్స్ ప్రత్యేక సేకరణ',
      copyright_license: 'విద్యాపరమైన వినియోగం / పురాతత్వ రికార్డు',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'తాడుతో కట్టబడిన తాళపత్ర గ్రంథ కట్టపై గంటంతో చెక్కబడిన ఒడియా మరియు సంస్కృత అక్షరాలు'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 16ನೇ ಶತಮಾನ (16th Century CE)',
      location: 'ಒಡಿಶಾ ರಾಜ್ಯ ವಸ್ತುಸಂಗ್ರಹಾಲಯ, ಭುವನೇಶ್ವರ',
      creator_photographer: 'ವಸ್ತುಸಂಗ್ರಹಾಲಯ ಪತ್ರಾಗಾರ ಡಿಜಿಟಲೀಕರಣ ಘಟಕ',
      source: 'ಒಡಿಶಾ ರಾಜ್ಯ ಪತ್ರಾಗಾರ ವಿಶೇಷ ಸಂಗ್ರಹ',
      copyright_license: 'ಶೈಕ್ಷಣಿಕ ನ್ಯಾಯಯುತ ಬಳಕೆ / ಪತ್ರಾಗಾರ ದಾಖಲೆ',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ದಾರದಿಂದ ಕಟ್ಟಲಾದ ತಾಳೆಗರಿಯ ಹಸ್ತಪ್ರತಿ ಕಟ್ಟಿನಲ್ಲಿ ಕಬ್ಬಿಣದ ಕಂಠದಿಂದ ಕೆತ್ತಲಾದ ಒಡಿಯಾ ಮತ್ತು ಸಂಸ್ಕೃತ ಅಕ್ಷರಗಳು'
    },
    ta: {
      period: 'பொ.ஊ. 16-ஆம் நூற்றாண்டு (16th Century CE)',
      location: 'ஒடிசா மாநில அருங்காட்சியகம், புவனேஸ்வர்',
      creator_photographer: 'அருங்காட்சியக ஆவண டிஜிட்டல்மயமாக்கல் பிரிவு',
      source: 'ஒடிசா மாநில ஆவணக் காப்பக சிறப்புத் தொகுப்பு',
      copyright_license: 'கல்விப் பயன்பாடு / ஆவணப் பதிவு',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'கயிற்றால் கட்டப்பட்ட ஓலைச்சுவடிக் கட்டில் எழுத்தாணியால் பொறிக்கப்பட்ட ஒடியா மற்றும் சமஸ்கிருத எழுத்துக்கள்'
    },
    mr: {
      period: 'इ.स. १६ वे शतक (16th Century CE)',
      location: 'ओडिशा राज्य संग्रहालय, भुवनेश्वर',
      creator_photographer: 'संग्रहालय अभिलेखीय डिजिटायझेशन विभाग',
      source: 'ओडिशा राज्य अभिलेखागार विशेष संग्रह',
      copyright_license: 'शैक्षणिक न्याय्य वापर / अभिलेखीय नोंद',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'दोरीने बांधलेला ताडपत्र हस्तलिखित संच ज्यावर लोखंडी लेखणीने कोरलेली ओडिया व संस्कृत अक्षरे आहेत'
    },
    or: {
      period: '୧୬ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ (16th Century CE)',
      location: 'ଓଡ଼ିଶା ରାଜ୍ୟ ସଂଗ୍ରହାଳୟ, ଭୁବନେଶ୍ୱର',
      creator_photographer: 'ସଂଗ୍ରହାଳୟ ଅଭିଲେଖ ଡିଜିଟାଇଜେସନ୍ ଏକକ',
      source: 'ଓଡ଼ିଶା ରାଜ୍ୟ ଅଭିଲେଖାଗାର ବିଶେଷ ସଂଗ୍ରହ',
      copyright_license: 'ଶିକ୍ଷାଗତ ଉପଯୋଗ / ଅଭିଲେଖୀୟ ରେକର୍ଡ',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'ସୂତାରେ ବନ୍ଧା ତାଳପତ୍ର ପୋଥି ଯେଉଁଥିରେ ଲୁହା ଲେଖନୀ ଦ୍ୱାରା ଓଡ଼ିଆ ଓ ସଂସ୍କୃତ ଅକ୍ଷର ଖୋଦିତ ହୋଇଛି'
    },
    bn: {
      period: '১৬শ শতাব্দী খ্রিস্টাব্দ (16th Century CE)',
      location: 'ওড়িশা রাজ্য জাদুঘর, ভুবনেশ্বর',
      creator_photographer: 'জাদুঘর আর্কাইভাল ডিজিটাইজেশন ইউনিট',
      source: 'ওড়িশা রাজ্য মহাফেজখানা বিশেষ সংগ্রহ',
      copyright_license: 'শিক্ষামূলক ব্যবহার / আর্কাইভাল নথি',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'সুতোয় বাঁধা তালপাতার পাণ্ডুলিপি যাতে লোহার লেখনী দিয়ে খোদাই করা ওড়িয়া ও সংস্কৃত লিপি রয়েছে'
    }
  },
  gal_06: {
    hi: {
      period: 'मध्य 15वीं शताब्दी ईस्वी का मानचित्रण पुनर्निर्माण',
      location: 'ऐतिहासिक भूगोल परिषद (Council for Historical Geography)',
      creator_photographer: 'डॉ. वी.जी. राजू एवं मानचित्रण इकाई',
      source: 'एपिग्राफिया इंडिका खंड XXIV से XXXV के आधार पर पुनर्निर्मित',
      copyright_license: 'क्रिएटिव कॉमन्स CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'गंगा से कावेरी तक ओड्र देश और गजपति साम्राज्य के विस्तार को दर्शाने वाला ऐतिहासिक मानचित्र'
    },
    te: {
      period: 'క్రీ.శ. 15వ శతాబ్దపు మధ్యకాల చారిత్రక పట పునర్నిర్మాణం',
      location: 'చారిత్రక భౌగోళిక మండలి (Council for Historical Geography)',
      creator_photographer: 'డా. వి.జి. రాజు & కార్టోగ్రఫీ విభాగం',
      source: 'ఎపిగ్రాఫియా ఇండికా సంపుటాలు XXIV నుండి XXXV ఆధారంగా పునర్నిర్మించబడింది',
      copyright_license: 'క్రియేటివ్ కామన్స్ CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'గంగా నది నుండి కావేరీ వరకు ఓడ్ర దేశం మరియు గజపతి సామ్రాజ్య విస్తరణను చూపే చారిత్రక పటం'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 15ನೇ ಶತಮಾನದ ಮಧ್ಯಭಾಗದ ಐತಿಹಾಸಿಕ ನಕ್ಷೆ ಮರುನಿರ್ಮಾಣ',
      location: 'ಐತಿಹಾಸಿಕ ಭೂಗೋಳ ಮಂಡಳಿ (Council for Historical Geography)',
      creator_photographer: 'ಡಾ. ವಿ.ಜಿ. ರಾಜು ಮತ್ತು ನಕ್ಷೆ ರಚನಾ ಘಟಕ',
      source: 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ಸಂಪುಟ XXIV ರಿಂದ XXXV ರ ಆಧಾರದ ಮೇಲೆ ಮರುನಿರ್ಮಿಸಲಾಗಿದೆ',
      copyright_license: 'ಕ್ರಿಯೇಟಿವ್ ಕಾಮನ್ಸ್ CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ಗಂಗೆಯಿಂದ ಕಾವೇರಿಯವರೆಗೆ ಓಡ್ರ ದೇಶ ಮತ್ತು ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ವಿಸ್ತರಣೆಯನ್ನು ತೋರಿಸುವ ಐತಿಹಾಸಿಕ ನಕ್ಷೆ'
    },
    ta: {
      period: 'பொ.ஊ. 15-ஆம் நூற்றாண்டின் நடுப்பகுதி வரைபட மீளுருவாக்கம்',
      location: 'வரலாற்றுப் புவியியல் மன்றம் (Council for Historical Geography)',
      creator_photographer: 'டாக்டர் வி.ஜி. ராஜு & நிலப்படப் பிரிவு',
      source: 'எபிகிராஃபியா இண்டிகா தொகுதிகள் XXIV முதல் XXXV அடிப்படையில் உருவாக்கப்பட்டது',
      copyright_license: 'கிரியேட்டிவ் காமன்ஸ் CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'கங்கை முதல் காவேரி வரை ஒட்ர தேசம் மற்றும் கஜபதி பேரரசின் எல்லையைக் காட்டும் வரலாற்று வரைபடம்'
    },
    mr: {
      period: 'इ.स. १५ व्या शतकाच्या मध्यातील नकाशाशास्त्रीय पुनर्निर्मिती',
      location: 'ऐतिहासिक भूगोल परिषद (Council for Historical Geography)',
      creator_photographer: 'डॉ. व्ही.जी. राजू आणि नकाशाशास्त्र विभाग',
      source: 'एपिग्राफिया इंडिका खंड XXIV ते XXXV च्या आधारे पुनर्रचित',
      copyright_license: 'क्रिएटिव्ह कॉमन्स CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'गंगेपासून कावेरीपर्यंत ओड्र देश आणि गजपती साम्राज्याचा विस्तार दर्शवणारा ऐतिहासिक नकाशा'
    },
    or: {
      period: 'ମଧ୍ୟ ୧୫ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦର ମାନଚିତ୍ର ପୁନର୍ନିର୍ମାଣ',
      location: 'ଐତିହାସିକ ଭୂଗୋଳ ପରିଷଦ (Council for Historical Geography)',
      creator_photographer: 'ଡ. ଭି.ଜି. ରାଜୁ ଓ ମାନଚିତ୍ର ବିଭାଗ',
      source: 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଖଣ୍ଡ XXIV ରୁ XXXV ଆଧାରରେ ପୁନର୍ନିର୍ମିତ',
      copyright_license: 'କ୍ରିଏଟିଭ୍ କମନ୍ସ CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'ଗଙ୍ଗାଠାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ଓଡ୍ର ଦେଶ ଓ ଗଜପତି ସାମ୍ରାଜ୍ୟର ବିସ୍ତାର ଦର୍ଶାଉଥିବା ଐତିହାସିକ ମାନଚିତ୍ର'
    },
    bn: {
      period: 'মধ্য ১৫শ শতাব্দী খ্রিস্টাব্দের মানচিত্র পুনর্নির্মাণ',
      location: 'ঐতিহাসিক ভূগোল পরিষদ (Council for Historical Geography)',
      creator_photographer: 'ড. ভি.জি. রাজু ও মানচিত্র বিভাগ',
      source: 'এপিগ্রাফিয়া ইন্ডিকা খণ্ড XXIV থেকে XXXV-এর ভিত্তিতে পুনর্নির্মিত',
      copyright_license: 'ক্রিয়েটিভ কমনস CC BY-NC 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'গঙ্গা থেকে কাবেরী পর্যন্ত ওড্র দেশ ও গজপতি সাম্রাজ্যের বিস্তার প্রদর্শনকারী ঐতিহাসিক মানচিত্র'
    }
  },
  gal_kolletikota: {
    hi: {
      period: 'मध्यकालीन युग (लगभग 15वीं शताब्दी ईस्वी से वर्तमान तक)',
      location: 'कोल्लेटिकोटा, एलुरु जिला, आंध्र प्रदेश',
      creator_photographer: 'आंध्र तटीय विरासत प्रलेखन सर्वेक्षण',
      source: 'कोल्लेरु पुरातात्विक आर्द्रभूमि सर्वेक्षण अभिलेखागार',
      copyright_license: 'क्रिएटिव कॉमन्स CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.hi,
      alt_text: 'कोल्लेटिकोटा के किलेबंद द्वीप अभयारण्य और श्री पेद्दिंट्लम्मा तल्ली मंदिर को घेरे हुए कोल्लेटि सरसु (कोल्लेरु झील) का विशाल मीठे पानी का विस्तार'
    },
    te: {
      period: 'మధ్యయుగ కాలం (క్రీ.శ. 15వ శతాబ్దం నుండి నేటి వరకు)',
      location: 'కొల్లేటికోట, ఏలూరు జిల్లా, ఆంధ్రప్రదేశ్',
      creator_photographer: 'ఆంధ్ర తీర వారసత్వ డాక్యుమెంటేషన్ సర్వే',
      source: 'కొల్లేరు పురావస్తు చిత్తడి నేలల సర్వే భాండాగారం',
      copyright_license: 'క్రియేటివ్ కామన్స్ CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.te,
      alt_text: 'కొల్లేటికోట ద్వీప జలదుర్గాన్ని చుట్టుముట్టి ఉన్న కొల్లేటి సరస్సు (కొల్లేరు సరస్సు) విశాల జలాలు'
    },
    kn: {
      period: 'ಮಧ್ಯಕಾಲೀನ ಯುಗ (ಕ್ರಿ.ಶ. 15ನೇ ಶತಮಾನದಿಂದ ಇಂದಿನವರೆಗೆ)',
      location: 'ಕೊಲ್ಲೇಟಿಕೋಟ, ಏಲೂರು ಜಿಲ್ಲೆ, ಆಂಧ್ರಪ್ರದೇಶ',
      creator_photographer: 'ಆಂಧ್ರ ಕರಾವಳಿ ಪರಂಪರೆ ದಾಖಲಾತಿ ಸಮೀಕ್ಷೆ',
      source: 'ಕೊಲ್ಲೇರು ಪುರಾತತ್ವ ಜೌಗುಪ್ರದೇಶ ಸಮೀಕ್ಷಾ ಪತ್ರಾಗಾರ',
      copyright_license: 'ಕ್ರಿಯೇಟಿವ್ ಕಾಮನ್ಸ್ CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.kn,
      alt_text: 'ಕೊಲ್ಲೇಟಿಕೋಟ ದ್ವೀಪ ಕೋಟೆಯನ್ನು ಸುತ್ತುವರೆದಿರುವ ಕೊಲ್ಲೇಟಿ ಸರಸ್ಸಿನ (ಕೊಲ್ಲೇರು ಸರೋವರ) ವಿಶಾಲ ಸಿಹಿನೀರಿನ ಜಲರಾಶಿ'
    },
    ta: {
      period: 'இடைக்காலம் (பொ.ஊ. 15-ஆம் நூற்றாண்டு முதல் இன்று வரை)',
      location: 'கொல்லேட்டிகோட்டா, ஏலூரு மாவட்டம், ஆந்திரப் பிரதேசம்',
      creator_photographer: 'ஆந்திரக் கடற்கரை பாரம்பரிய ஆவண ஆய்வு',
      source: 'கொல்லேரு தொல்லியல் ஈரநில ஆய்வு ஆவணக் காப்பகம்',
      copyright_license: 'கிரியேட்டிவ் காமன்ஸ் CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.ta,
      alt_text: 'கொல்லேட்டிகோட்டா தீவுக் கோட்டையைச் சூழ்ந்துள்ள கொல்லேட்டி சரசு (கொல்லேரு ஏரி) நன்னீர் பரப்பு'
    },
    mr: {
      period: 'मध्ययुगीन काळ (इ.स. १५ व्या शतकापासून आजपर्यंत)',
      location: 'कोल्लेतिकोटा, एलुरू जिल्हा, आंध्र प्रदेश',
      creator_photographer: 'आंध्र किनारी वारसा दस्तऐवजीकरण सर्वेक्षण',
      source: 'कोल्लेरू पुरातत्त्वीय पाणथळ सर्वेक्षण अभिलेखागार',
      copyright_license: 'क्रिएटिव्ह कॉमन्स CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.mr,
      alt_text: 'कोल्लेतिकोटा बेट जलदुर्गाला वेढलेले कोल्लेती सरसू (कोल्लेरू सरोवर) गोड्या पाण्याचे विस्तीर्ण क्षेत्र'
    },
    or: {
      period: 'ମଧ୍ୟଯୁଗୀୟ କାଳ (୧୫ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦରୁ ବର୍ତ୍ତମାନ ପର୍ଯ୍ୟନ୍ତ)',
      location: 'କୋଲ୍ଲେତିକୋଟା, ଏଲୁରୁ ଜିଲ୍ଲା, ଆନ୍ଧ୍ରପ୍ରଦେଶ',
      creator_photographer: 'ଆନ୍ଧ୍ର ଉପକୂଳ ଐତିହ୍ୟ ପ୍ରଲେଖନ ସର୍ବେକ୍ଷଣ',
      source: 'କୋଲ୍ଲେରୁ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଆର୍ଦ୍ରଭୂମି ସର୍ବେକ୍ଷଣ ଅଭିଲେଖାଗାର',
      copyright_license: 'କ୍ରିଏଟିଭ୍ କମନ୍ସ CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.or,
      alt_text: 'କୋଲ୍ଲେତିକୋଟା ଦ୍ୱୀପ ଜଳଦୁର୍ଗ ଚାରିପାଖରେ ବିସ୍ତୃତ କୋଲ୍ଲେତି ସରସୁ (କୋଲ୍ଲେରୁ ହ୍ରଦ) ର ମଧୁର ଜଳରାଶି'
    },
    bn: {
      period: 'মধ্যযুগীয় কাল (১৫শ শতাব্দী খ্রিস্টাব্দ থেকে বর্তমান পর্যন্ত)',
      location: 'কোল্লেতিকোটা, এলুরু জেলা, অন্ধ্রপ্রদেশ',
      creator_photographer: 'অন্ধ্র উপকূলীয় ঐতিহ্য নথিকরণ জরিপ',
      source: 'কোল্লেরু প্রত্নতাত্ত্বিক জলাভূমি জরিপ আর্কাইভ',
      copyright_license: 'ক্রিয়েটিভ কমনস CC BY-SA 4.0',
      verification_status: REVIEWED_STATUS_BY_LANG.bn,
      alt_text: 'কোল্লেতিকোটা দ্বীপ জলদুর্গকে ঘিরে থাকা কোল্লেতি সরসু (কোল্লেরু হ্রদ)-এর বিস্তৃত মিষ্টি জলের বিস্তার'
    }
  }
};

export const DOCUMENT_METADATA_ENRICHMENTS: Record<
  string,
  Partial<Record<LanguageCode, DocumentMetadataEnrichment>>
> = {
  doc_madala_panji: {
    hi: {
      copyright_license: 'सार्वजनिक डोमेन / मुक्त अभिलेखीय कॉमन्स (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.hi
    },
    te: {
      copyright_license: 'పబ్లిక్ డొమైన్ / ఓపెన్ ఆర్కైవల్ కామన్స్ (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.te
    },
    kn: {
      copyright_license: 'ಸಾರ್ವಜನಿಕ ವಲಯ / ಮುಕ್ತ ಪತ್ರಾಗಾರ ಕಾಮನ್ಸ್ (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.kn
    },
    ta: {
      copyright_license: 'பொதுக் களம் / திறந்த ஆவணக் காப்பகம் (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.ta
    },
    mr: {
      copyright_license: 'सार्वजनिक डोमेन / मुक्त अभिलेखीय कॉमन्स (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.mr
    },
    or: {
      copyright_license: 'ସାର୍ବଜନୀନ ଡୋମେନ୍ / ମୁକ୍ତ ଅଭିଲେଖ କମନ୍ସ (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.or
    },
    bn: {
      copyright_license: 'পাবলিক ডোমেইন / উন্মুক্ত আর্কাইভাল কমনস (Public Domain / Open Archival Commons)',
      verification_status: REVIEWED_STATUS_BY_LANG.bn
    }
  },
  doc_sarasvati_vilasa: {
    hi: {
      copyright_license: 'सार्वजनिक डोमेन (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.hi
    },
    te: {
      copyright_license: 'పబ్లిక్ డొమైన్ (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.te
    },
    kn: {
      copyright_license: 'ಸಾರ್ವಜನಿಕ ವಲಯ (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.kn
    },
    ta: {
      copyright_license: 'பொதுக் களம் (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.ta
    },
    mr: {
      copyright_license: 'सार्वजनिक डोमेन (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.mr
    },
    or: {
      copyright_license: 'ସାର୍ବଜନୀନ ଡୋମେନ୍ (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.or
    },
    bn: {
      copyright_license: 'পাবলিক ডোমেইন (Public Domain)',
      verification_status: REVIEWED_STATUS_BY_LANG.bn
    }
  }
};

export const GENEALOGY_SOURCES_TRANSLATIONS: Record<
  string,
  Partial<Record<LanguageCode, string[]>>
> = {
  gen_samrat_sagara: {
    hi: ['वाल्मीकि रामायण (बालकांड)', 'विष्णु पुराण', 'महाभारत (वन पर्व)'],
    te: ['వాల్మీకి రామాయణం (బాలకాండ)', 'విష్ణు పురాణం', 'మహాభారతం (వన పర్వం)'],
    kn: ['ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣ (ಬಾಲಕಾಂಡ)', 'ವಿಷ್ಣು ಪುರಾಣ', 'ಮಹಾಭಾರತ (ವನ ಪರ್ವ)'],
    ta: ['வால்மீகி இராமாயணம் (பாலகாண்டம்)', 'விஷ்ணு புராணம்', 'மகாபாரதம் (வன பருவம்)'],
    mr: ['वाल्मीकी रामायण (बालकांड)', 'विष्णू पुराण', 'महाभारत (वन पर्व)'],
    or: ['ବାଲ୍ମୀକି ରାମାୟଣ (ବାଳକାଣ୍ଡ)', 'ବିଷ୍ଣୁ ପୁରାଣ', 'ମହାଭାରତ (ବନ ପର୍ବ)'],
    bn: ['বাল্মীকি রামায়ণ (বালকাণ্ড)', 'বিষ্ণু পুরাণ', 'মহাভারত (বন পর্ব)']
  },
  gen_maharshi_bhagiratha: {
    hi: ['वाल्मीकि रामायण', 'स्कंद पुराण', 'एपिग्राफिया इंडिका मंगलाचरण शिलालेख'],
    te: ['వాల్మీకి రామాయణం', 'స్కంద పురాణం', 'ఎపిగ్రాఫియా ఇండికా మంగళాచరణ శాసనాలు'],
    kn: ['ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣ', 'ಸ್ಕಂದ ಪುರಾಣ', 'ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ಮಂಗಳಾಚರಣ ಶಾಸನಗಳು'],
    ta: ['வால்மீகி இராமாயணம்', 'ஸ்கந்த புராணம்', 'எபிகிராஃபியா இண்டிகா மங்களாசரணக் கல்வெட்டுகள்'],
    mr: ['वाल्मीकी रामायण', 'स्कंद पुराण', 'एपिग्राफिया इंडिका मंगलाचरण शिलालेख'],
    or: ['ବାଲ୍ମୀକି ରାମାୟଣ', 'ସ୍କନ୍ଦ ପୁରାଣ', 'ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ମଙ୍ଗଳାଚରଣ ଶିଳାଲେଖ'],
    bn: ['বাল্মীকি রামায়ণ', 'স্কন্দ পুরাণ', 'এপিগ্রাফিয়া ইন্ডিকা মঙ্গলাচরণ শিলালিপি']
  },
  gen_sri_rama: {
    hi: ['वाल्मीकि रामायण', 'महाकवि कालिदास रचित रघुवंशम्', 'गजपति राजकीय शिलालेख'],
    te: ['వాల్మీకి రామాయణం', 'కాళిదాసు రఘువంశం', 'గజపతి రాజుల శిలాశాసనాలు'],
    kn: ['ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣ', 'ಕಾಳಿದಾಸನ ರಘುವಂಶ', 'ಗಜಪತಿ ರಾಜಶಾಸನಗಳು'],
    ta: ['வால்மீகி இராமாயணம்', 'காளிதாசரின் இரகுவம்சம்', 'கஜபதி அரச கல்வெட்டுகள்'],
    mr: ['वाल्मीकी रामायण', 'कालिदासांचे रघुवंशम्', 'गजपती राजवंशीय शिलालेख'],
    or: ['ବାଲ୍ମୀକି ରାମାୟଣ', 'କାଳିଦାସଙ୍କ ରଘୁବଂଶମ୍', 'ଗଜପତି ରାଜକୀୟ ଶିଳାଲେଖ'],
    bn: ['বাল্মীকি রামায়ণ', 'কালিদাসের রঘুবংশম্', 'গজপতি রাজকীয় শিলালিপি']
  },
  gen_kapilendra: {
    hi: ['वेलिगालानि ताम्रपत्र (1458 ई.)', 'लिंगराज मंदिर शिलालेख (1452 ई.)', 'मादला पांजी'],
    te: ['వెలిగాలని తామ్రశాసనం (క్రీ.శ. 1458)', 'లింగరాజ ఆలయ శాసనం (క్రీ.శ. 1452)', 'మాదళ పంజి'],
    kn: ['ವೆಲಿಗಾಲನಿ ತಾಮ್ರಪಟಗಳು (ಕ್ರಿ.ಶ. 1458)', 'ಲಿಂಗರಾಜ ದೇವಾಲಯದ ಶಾಸನ (ಕ್ರಿ.ಶ. 1452)', 'ಮಾದಲಾ ಪಂಜಿ'],
    ta: ['வெலிகாலனி செப்பேடுகள் (பொ.ஊ. 1458)', 'லிங்கராஜர் கோயில் கல்வெட்டு (பொ.ஊ. 1452)', 'மாதளா பஞ்சி'],
    mr: ['वेलिगालानी ताम्रपट (इ.स. १४५८)', 'लिंगराज मंदिर शिलालेख (इ.स. १४५२)', 'मादला पांजी'],
    or: ['ଭେଲିଗାଲାନି ତାମ୍ରଶାସନ (୧୪୫୮ ଖ୍ରୀ.)', 'ଲିଙ୍ଗରାଜ ମନ୍ଦିର ଶିଳାଲେଖ (୧୪୫୨ ଖ୍ରୀ.)', 'ମାଦଳା ପାଞ୍ଜି'],
    bn: ['ভেলিগালানি তাম্রশাসন (১৪৫৮ খ্রি.)', 'লিঙ্গরাজ মন্দির শিলালিপি (১৪৫২ খ্রি.)', 'মাদলা পাঞ্জি']
  },
  gen_hamvira: {
    hi: ['श्रीरंगम मंदिर शिलालेख (1464 ई.)', 'कोंडावीडु शिलालेख', 'भारतीय पुरालेख वार्षिक रिपोर्ट (ARIE) 1937–38'],
    te: ['శ్రీరంగం ఆలయ శాసనం (క్రీ.శ. 1464)', 'కొండవీడు శాసనం', 'భారతీయ శాసన వార్షిక నివేదిక (ARIE) 1937–38'],
    kn: ['ಶ್ರೀರಂಗಂ ದೇವಾಲಯದ ಶಾಸನ (ಕ್ರಿ.ಶ. 1464)', 'ಕೊಂಡವೀಡು ಶಾಸನ', 'ಭಾರತೀಯ ಶಾಸನ ವಾರ್ಷಿಕ ವರದಿ (ARIE) 1937–38'],
    ta: ['ஸ்ரீரங்கம் கோயில் கல்வெட்டு (பொ.ஊ. 1464)', 'கொண்டவீடு கல்வெட்டு', 'இந்தியக் கல்வெட்டு ஆண்டறிக்கை (ARIE) 1937–38'],
    mr: ['श्रीरंगम मंदिर शिलालेख (इ.स. १४६४)', 'कोंडावीडू शिलालेख', 'भारतीय शिलालेख वार्षिक अहवाल (ARIE) १९३७–३८'],
    or: ['ଶ୍ରୀରଙ୍ଗମ ମନ୍ଦିର ଶିଳାଲେଖ (୧୪୬୪ ଖ୍ରୀ.)', 'କୋଣ୍ଡାଭିଡୁ ଶିଳାଲେଖ', 'ଭାରତୀୟ ଶିଳାଲେଖ ବାର୍ଷିକ ରିପୋର୍ଟ (ARIE) ୧୯୩୭–୩୮'],
    bn: ['শ্রীরঙ্গম মন্দির শিলালিপি (১৪৬৪ খ্রি.)', 'কোন্ডাভিডু শিলালিপি', 'ভারতীয় প্রত্নলিপি বার্ষিক প্রতিবেদন (ARIE) ১৯৩৭–৩৮']
  },
  gen_purushottama: {
    hi: ['पोतावरम ताम्रपत्र अनुदान (1489 ई.)', 'द्राक्षाराम स्तंभ शिलालेख', 'मादला पांजी'],
    te: ['పోతావరం తామ్రశాసనం (క్రీ.శ. 1489)', 'ద్రాక్షారామ స్తంభ శాసనాలు', 'మాదళ పంజి'],
    kn: ['ಪೋತಾವರಂ ತಾಮ್ರಪಟಗಳು (ಕ್ರಿ.ಶ. 1489)', 'ದ್ರಾಕ್ಷಾರಾಮ ಸ್ತಂಭ ಶಾಸನಗಳು', 'ಮಾದಲಾ ಪಂಜಿ'],
    ta: ['போதாவரம் செப்பேடுகள் (பொ.ஊ. 1489)', 'திராட்சாராமம் தூண் கல்வெட்டுகள்', 'மாதளா பஞ்சி'],
    mr: ['पोतावरम ताम्रपट (इ.स. १४८९)', 'द्राक्षाराम स्तंभ शिलालेख', 'मादला पांजी'],
    or: ['ପୋତାବରମ ତାମ୍ରଶାସନ (୧୪୮୯ ଖ୍ରୀ.)', 'ଦ୍ରାକ୍ଷାରାମ ସ୍ତମ୍ଭ ଶିଳାଲେଖ', 'ମାଦଳା ପାଞ୍ଜି'],
    bn: ['পোতাভরম তাম্রশাসন (১৪৮৯ খ্রি.)', 'দ্রাক্ষারাম স্তম্ভ শিলালিপি', 'মাদলা পাঞ্জি']
  },
  gen_prataparudra: {
    hi: ['सरस्वती विलास', 'सिंहाचलम मंदिर शिलालेख (1515 ई.)', 'चैतन्य चरितामृत'],
    te: ['సరస్వతీ విలాసం', 'సింహాచలం శాసనాలు (క్రీ.శ. 1515)', 'చైతన్య చరితామృతం'],
    kn: ['ಸರಸ್ವತೀ ವಿಲಾಸ', 'ಸಿಂಹಾಚಲಂ ಶಾಸನಗಳು (ಕ್ರಿ.ಶ. 1515)', 'ಚೈತನ್ಯ ಚರಿತಾಮೃತ'],
    ta: ['சரஸ்வதி விலாசம்', 'சிம்மாசலம் கல்வெட்டுகள் (பொ.ஊ. 1515)', 'சைதன்ய சரிதாம்ருதம்'],
    mr: ['सरस्वती विलास', 'सिंहाचलम शिलालेख (इ.स. १५१५)', 'चैतन्य चरितामृत'],
    or: ['ସରସ୍ୱତୀ ବିଳାସ', 'ସିଂହାଚଳମ ଶିଳାଲେଖ (୧୫୧୫ ଖ୍ରୀ.)', 'ଚୈତନ୍ୟ ଚରିତାମୃତ'],
    bn: ['সরস্বতী বিলাস', 'সিংহাচলম শিলালিপি (১৫১৫ খ্রি.)', 'চৈতন্য চরিতামৃত']
  },
  gen_virabhadra: {
    hi: ['विजयनगर एपिग्राफिया इंडिका अभिलेख', 'कोंडापल्ली स्तंभ शिलालेख'],
    te: ['విజయనగర ఎపిగ్రాఫియా ఇండికా రికార్డులు', 'కొండపల్లి స్తంభ శాసనం'],
    kn: ['ವಿಜಯನಗರ ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ದಾಖಲೆಗಳು', 'ಕೊಂಡಪಲ್ಲಿ ಸ್ತಂಭ ಶಾಸನ'],
    ta: ['விஜயநகர எபிகிராஃபியா இண்டிகா ஆவணங்கள்', 'கொண்டபல்லி தூண் கல்வெட்டு'],
    mr: ['विजयनगर एपिग्राफिया इंडिका नोंदी', 'कोंडापल्ली स्तंभ शिलालेख'],
    or: ['ବିଜୟନଗର ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଅଭିଲେଖ', 'କୋଣ୍ଡାପଲ୍ଲୀ ସ୍ତମ୍ଭ ଶିଳାଲେଖ'],
    bn: ['বিজয়নগর এপিগ্রাফিয়া ইন্ডিকা নথি', 'কোন্ডাপল্লী স্তম্ভ শিলালিপি']
  },
  gen_dakshina_branch: {
    hi: ['स्थानीय कैफियत (मैकेंज़ी पांडुलिपियां)', 'पारिवारिक ताड़पत्र वंशावलियां', 'मौखिक वंश परंपराएं'],
    te: ['స్థానిక కైఫియత్‌లు (మెకెంజీ తాళపత్ర ప్రతులు)', 'కుటుంబ తాళపత్ర వంశావళులు', 'మౌఖిక వంశ సంప్రదాయాలు'],
    kn: ['ಸ್ಥಳೀಯ ಕೈಫಿಯತ್‌ಗಳು (ಮೆಕೆಂಜಿ ಹಸ್ತಪ್ರತಿಗಳು)', 'ಕುಟುಂಬದ ತಾಳೆಗರಿ ವಂಶಾವಳಿಗಳು', 'ಮೌಖಿಕ ವಂಶ ಸಂಪ್ರದಾಯಗಳು'],
    ta: ['உள்ளூர் கைஃபியத்துகள் (மெக்கன்சி சுவடிகள்)', 'குடும்ப ஓலைச்சுவடி வம்சாவளிகள்', 'வாய்மொழி வம்ச மரபுகள்'],
    mr: ['स्थानिक कैफियत (मॅकेंझी हस्तलिखिते)', 'कौटुंबिक ताडपत्र वंशावळी', 'मौखिक वंश परंपरा'],
    or: ['ସ୍ଥାନୀୟ କୈଫିୟତ (ମାକେଞ୍ଜି ପୋଥି)', 'ପାରିବାରିକ ତାଳପତ୍ର ବଂଶାବଳୀ', 'ମୌଖିକ ବଂଶ ପରମ୍ପରା'],
    bn: ['স্থানীয় কৈফিয়ত (ম্যাকেঞ্জি পাণ্ডুলিপি)', 'পারিবারিক তালপাতার বংশাবলী', 'মৌখিক বংশ পরম্পরা']
  }
};
