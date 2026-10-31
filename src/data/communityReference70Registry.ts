import { LanguageCode } from '../types';
import { SearchableCommunityLabelId } from './communityProminentPersonsData';

export type ReferenceTermClassification =
  | 'Community names'
  | 'Regional identities'
  | 'Alternate spellings'
  | 'Historical and royal titles'
  | 'Occupational or traditional subdivisions'
  | 'Unverified or uncertain associations';

export type VerificationStatusType =
  | 'Verified Epigraphic / Historical Record'
  | 'Documented Gazetteer / Ethnographic Record'
  | 'Traditional / Regional Lineage Record'
  | 'Requires Historical Verification — Do Not Conflate';

export interface Reference70Entry {
  order: number;
  id: string;
  canonicalTerm: string;
  datasetGroup: 'original_45' | 'supplementary_25';
  classification: ReferenceTermClassification;
  verificationStatus: VerificationStatusType;
  requiresVerification: boolean;
  localizedLabel: Record<LanguageCode, string>;
  multilingualSearchAliases: string[];
  historicalContextNote: Record<LanguageCode, string>;
  primaryTargetLink: string;
  relatedHeritageIds: string[];
  relatedProminentLabelIds: SearchableCommunityLabelId[];
  relatedTopicsAndKeywords: string[];
}

export const REFERENCE_70_UI_LABELS: Record<
  LanguageCode,
  {
    sectionTitle: string;
    sectionSubtitle: string;
    original45Badge: string;
    supplementary25Badge: string;
    requiresVerificationBadge: string;
    verifiedRecordBadge: string;
    gazetteerRecordBadge: string;
    lineageRecordBadge: string;
    allClassifications: string;
    classifications: Record<ReferenceTermClassification, string>;
    relatedTopicsLabel: string;
    relatedCommunitiesLabel: string;
    keywordsLabel: string;
    openLinkedArticleLabel: string;
    viewProminentFiguresLabel: string;
    nonConflationDisclaimer: string;
  }
> = {
  en: {
    sectionTitle: '74-Name Master Reference & Search Alias Cross-Reference Index',
    sectionSubtitle: 'Standardized non-destructive index of the 45 Original Community Names and 29 Supplementary Reference Terms with strict historical classification.',
    original45Badge: 'Original 45 Reference',
    supplementary25Badge: 'Supplementary 29 Alias',
    requiresVerificationBadge: 'Requires Historical Verification — Do Not Automatically Merge',
    verifiedRecordBadge: 'Verified Epigraphic / Historical Record',
    gazetteerRecordBadge: 'Documented Gazetteer / Ethnographic Record',
    lineageRecordBadge: 'Traditional / Regional Lineage Record',
    allClassifications: 'All 74 Reference Terms',
    classifications: {
      'Community names': 'Community Names',
      'Regional identities': 'Regional Identities',
      'Alternate spellings': 'Alternate Spellings',
      'Historical and royal titles': 'Historical & Royal Titles',
      'Occupational or traditional subdivisions': 'Occupational / Traditional Subdivisions',
      'Unverified or uncertain associations': 'Unverified / Uncertain Associations',
    },
    relatedTopicsLabel: 'Related Topics',
    relatedCommunitiesLabel: 'Related Communities',
    keywordsLabel: 'Search Keywords & Aliases',
    openLinkedArticleLabel: 'Open Linked Heritage Record',
    viewProminentFiguresLabel: 'View Related Prominent Figures',
    nonConflationDisclaimer: 'Historical & Epistemic Notice: Reference terms are categorized separately as community names, regional identities, alternate spellings, royal titles, occupational subdivisions, or uncertain associations. Separate communities are never automatically merged without epigraphic or ethnographic verification.',
  },
  hi: {
    sectionTitle: '74-नाम मुख्य संदर्भ और खोज उपनाम क्रॉस-रेफरेंस सूचकांक',
    sectionSubtitle: 'सख्त ऐतिहासिक वर्गीकरण के साथ 45 मूल समुदाय नामों और 29 पूरक संदर्भ शब्दों का मानकीकृत गैर-विनाशकारी सूचकांक।',
    original45Badge: 'मूल 45 संदर्भ',
    supplementary25Badge: 'पूरक 29 उपनाम',
    requiresVerificationBadge: 'ऐतिहासिक सत्यापन आवश्यक — स्वतः विलय न करें',
    verifiedRecordBadge: 'सत्यापित शिलालेख / ऐतिहासिक रिकॉर्ड',
    gazetteerRecordBadge: 'प्रलेखित गजेटियर / नृवंशविज्ञान रिकॉर्ड',
    lineageRecordBadge: 'पारंपरिक / क्षेत्रीय वंशावली रिकॉर्ड',
    allClassifications: 'सभी 74 संदर्भ शब्द',
    classifications: {
      'Community names': 'समुदाय के नाम',
      'Regional identities': 'क्षेत्रीय पहचान',
      'Alternate spellings': 'वैकल्पिक वर्तनी',
      'Historical and royal titles': 'ऐतिहासिक और शाही उपाधियाँ',
      'Occupational or traditional subdivisions': 'व्यावसायिक या पारंपरिक उपविभाग',
      'Unverified or uncertain associations': 'असत्यापित या अनिश्चित संबंध',
    },
    relatedTopicsLabel: 'संबंधित विषय',
    relatedCommunitiesLabel: 'संबंधित समुदाय',
    keywordsLabel: 'खोज कीवर्ड और उपनाम',
    openLinkedArticleLabel: 'जुड़ा हुआ विरासत लेख खोलें',
    viewProminentFiguresLabel: 'संबंधित प्रमुख व्यक्तित्व देखें',
    nonConflationDisclaimer: 'ऐतिहासिक सूचना: संदर्भ शब्दों को समुदाय नामों, क्षेत्रीय पहचानों, वैकल्पिक वर्तनी, शाही उपाधियों, व्यावसायिक उपविभागों या अनिश्चित संबंधों के रूप में अलग से वर्गीकृत किया गया है।',
  },
  te: {
    sectionTitle: '74-పేర్ల ప్రధాన రిఫరెన్స్ & సెర్చ్ అలియాస్ క్రాస్-రిఫరెన్స్ సూచిక',
    sectionSubtitle: '45 ప్రాథమిక కమ్యూనిటీ పేర్లు మరియు 29 అనుబంధ రిఫరెన్స్ పదాల ప్రామాణిక చారిత్రక వర్గీకరణ సూచిక.',
    original45Badge: 'ప్రాథమిక 45 రిఫరెన్స్',
    supplementary25Badge: 'అనుబంధ 29 అలియాస్',
    requiresVerificationBadge: 'చారిత్రక ధృవీకరణ అవసరం — స్వయంచాలకంగా విలీనం చేయవద్దు',
    verifiedRecordBadge: 'ధృవీకరించబడిన శాసన / చారిత్రక రికార్డు',
    gazetteerRecordBadge: 'గెజిటీర్ / ఎథ్నోగ్రాఫిక్ రికార్డు',
    lineageRecordBadge: 'సాంప్రదాయ / ప్రాంతీయ వంశ రికార్డు',
    allClassifications: 'మొత్తం 74 రిఫరెన్స్ పదాలు',
    classifications: {
      'Community names': 'కమ్యూనిటీ పేర్లు',
      'Regional identities': 'ప్రాంతీయ గుర్తింపులు',
      'Alternate spellings': 'ప్రత్యామ్నాయ స్పెల్లింగ్‌లు',
      'Historical and royal titles': 'చారిత్రక & రాజ బిరుదులు',
      'Occupational or traditional subdivisions': 'వృత్తిపరమైన / సాంప్రదాయ ఉపవిభాగాలు',
      'Unverified or uncertain associations': 'ధృవీకరించబడని / అనిశ్చిత సంబంధాలు',
    },
    relatedTopicsLabel: 'సంబంధిత అంశాలు',
    relatedCommunitiesLabel: 'సంబంధిత కమ్యూనిటీలు',
    keywordsLabel: 'సెర్చ్ కీవర్డ్‌లు & అలియాస్‌లు',
    openLinkedArticleLabel: 'సంబంధిత వారసత్వ వ్యాసాన్ని తెరవండి',
    viewProminentFiguresLabel: 'సంబంధిత ప్రముఖ వ్యక్తులను చూడండి',
    nonConflationDisclaimer: 'చారిత్రక గమనిక: రిఫరెన్స్ పదాలు కమ్యూనిటీ పేర్లు, ప్రాంతీయ గుర్తింపులు, ప్రత్యామ్నాయ స్పెల్లింగ్‌లు, రాజ బిరుదులు, వృత్తిపరమైన ఉపవిభాగాలు లేదా అనిశ్చిత సంబంధాలుగా వేర్వేరుగా వర్గీకరించబడ్డాయి.',
  },
  kn: {
    sectionTitle: '74-ಹೆಸರುಗಳ ಮುಖ್ಯ ಉಲ್ಲೇಖ ಮತ್ತು ಹುಡುಕಾಟ ಅಲಿಯಾಸ್ ಸೂಚ್ಯಂಕ',
    sectionSubtitle: '45 ಮೂಲ ಸಮುದಾಯ ಹೆಸರುಗಳು ಮತ್ತು 29 ಪೂರಕ ಉಲ್ಲೇಖ ಪದಗಳ ಐತಿಹಾಸಿಕ ವರ್ಗೀಕರಣ ಸೂಚ್ಯಂಕ.',
    original45Badge: 'ಮೂಲ 45 ಉಲ್ಲೇಖ',
    supplementary25Badge: 'ಪೂರಕ 29 ಅಲಿಯಾಸ್',
    requiresVerificationBadge: 'ಐತಿಹಾಸಿಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ — ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವಿಲೀನಗೊಳಿಸಬೇಡಿ',
    verifiedRecordBadge: 'ಪರಿಶೀಲಿಸಿದ ಶಾಸನ / ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
    gazetteerRecordBadge: 'ದಾಖಲಿತ ಗೆಜೆಟಿಯರ್ / ಜನಾಂಗೀಯ ದಾಖಲೆ',
    lineageRecordBadge: 'ಸಾಂಪ್ರದಾಯಿಕ / ಪ್ರಾದೇಶಿಕ ವಂಶಾವಳಿ ದಾಖಲೆ',
    allClassifications: 'ಎಲ್ಲಾ 74 ಉಲ್ಲೇಖ ಪದಗಳು',
    classifications: {
      'Community names': 'ಸಮುದಾಯದ ಹೆಸರುಗಳು',
      'Regional identities': 'ಪ್ರಾದೇಶಿಕ ಗುರುತುಗಳು',
      'Alternate spellings': 'ಪರ್ಯಾಯ ಕಾಗುಣಿತಗಳು',
      'Historical and royal titles': 'ಐತಿಹಾಸಿಕ ಮತ್ತು ರಾಜ ಬಿರುದುಗಳು',
      'Occupational or traditional subdivisions': 'ವೃತ್ತಿಪರ ಅಥವಾ ಸಾಂಪ್ರದಾಯಿಕ ಉಪವಿಭಾಗಗಳು',
      'Unverified or uncertain associations': 'ಪರಿಶೀಲಿಸದ ಅಥವಾ ಅನಿಶ್ಚಿತ ಸಂಬಂಧಗಳು',
    },
    relatedTopicsLabel: 'ಸಂಬಂಧಿತ ವಿಷಯಗಳು',
    relatedCommunitiesLabel: 'ಸಂಬಂಧಿತ ಸಮುದಾಯಗಳು',
    keywordsLabel: 'ಹುಡುಕಾಟ ಕೀವರ್ಡ್‌ಗಳು ಮತ್ತು ಅಲಿಯಾಸ್‌ಗಳು',
    openLinkedArticleLabel: 'ಸಂಬಂಧಿತ ಪರಂಪರೆಯ ಲೇಖನವನ್ನು ತೆರೆಯಿರಿ',
    viewProminentFiguresLabel: 'ಸಂಬಂಧಿತ ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    nonConflationDisclaimer: 'ಐತಿಹಾಸಿಕ ಸೂಚನೆ: ಉಲ್ಲೇಖ ಪದಗಳನ್ನು ಸಮುದಾಯದ ಹೆಸರುಗಳು, ಪ್ರಾದೇಶಿಕ ಗುರುತುಗಳು, ಪರ್ಯಾಯ ಕಾಗುಣಿತಗಳು, ರಾಜ ಬಿರುದುಗಳು, ವೃತ್ತಿಪರ ಉಪವಿಭಾಗಗಳು ಅಥವಾ ಅನಿಶ್ಚಿತ ಸಂಬಂಧಗಳಾಗಿ ಪ್ರತ್ಯೇಕವಾಗಿ ವರ್ಗೀಕರಿಸಲಾಗಿದೆ.',
  },
  ta: {
    sectionTitle: '74-பெயர்கள் முதன்மைக் குறிப்பு மற்றும் தேடல் மாற்றுப்பெயர் அட்டவணை',
    sectionSubtitle: '45 அசல் சமூகப் பெயர்கள் மற்றும் 29 கூடுதல் குறிப்புச் சொற்களின் வரலாற்று வகைப்பாட்டு அட்டவணை.',
    original45Badge: 'அசல் 45 குறிப்பு',
    supplementary25Badge: 'கூடுதல் 29 மாற்றுப்பெயர்',
    requiresVerificationBadge: 'வரலாற்றுச் சரிபார்ப்பு தேவை — தானாக இணைக்க வேண்டாம்',
    verifiedRecordBadge: 'சரிபார்க்கப்பட்ட கல்வெட்டு / வரலாற்றுப் பதிவு',
    gazetteerRecordBadge: 'ஆவணப்படுத்தப்பட்ட கெசட்டியர் / இனவரைவியல் பதிவு',
    lineageRecordBadge: 'பாரம்பரிய / பிராந்திய வம்சாவளிப் பதிவு',
    allClassifications: 'அனைத்து 74 குறிப்புச் சொற்கள்',
    classifications: {
      'Community names': 'சமூகப் பெயர்கள்',
      'Regional identities': 'பிராந்திய அடையாளங்கள்',
      'Alternate spellings': 'மாற்று எழுத்துக்கூட்டல்கள்',
      'Historical and royal titles': 'வரலாற்று மற்றும் அரச பட்டங்கள்',
      'Occupational or traditional subdivisions': 'தொழில்சார் அல்லது பாரம்பரிய உட்பிரிவுகள்',
      'Unverified or uncertain associations': 'சரிபார்க்கப்படாத அல்லது நிச்சயமற்ற தொடர்புகள்',
    },
    relatedTopicsLabel: 'தொடர்புடைய தலைப்புகள்',
    relatedCommunitiesLabel: 'தொடர்புடைய சமூகங்கள்',
    keywordsLabel: 'தேடல் முக்கிய வார்த்தைகள் & மாற்றுப்பெயர்கள்',
    openLinkedArticleLabel: 'இணைக்கப்பட்ட பாரம்பரியக் கட்டுரையைத் திறக்கவும்',
    viewProminentFiguresLabel: 'தொடர்புடைய முக்கிய ஆளுமைகளைக் காண்க',
    nonConflationDisclaimer: 'வரலாற்றுக் குறிப்பு: குறிப்புச் சொற்கள் சமூகப் பெயர்கள், பிராந்திய அடையாளங்கள், மாற்று எழுத்துக்கூட்டல்கள், அரச பட்டங்கள், தொழில்சார் உட்பிரிவுகள் அல்லது நிச்சயமற்ற தொடர்புகளாகத் தனித்தனியாக வகைப்படுத்தப்பட்டுள்ளன.',
  },
  mr: {
    sectionTitle: '74-नावे मुख्य संदर्भ आणि शोध टोपणनाव क्रॉस-रेफरन्स निर्देशांक',
    sectionSubtitle: '45 मूळ समुदाय नावे आणि 29 पूरक संदर्भ शब्दांचा ऐतिहासिक वर्गीकरण निर्देशांक.',
    original45Badge: 'मूळ 45 संदर्भ',
    supplementary25Badge: 'पूरक 29 टोपणनाव',
    requiresVerificationBadge: 'ऐतिहासिक पडताळणी आवश्यक — आपोआप एकत्र करू नका',
    verifiedRecordBadge: 'पडताळलेले शिलालेख / ऐतिहासिक नोंद',
    gazetteerRecordBadge: 'दस्तऐवजीकरण गॅझेटियर / मानववंशशास्त्रीय नोंद',
    lineageRecordBadge: 'पारंपारिक / प्रादेशिक वंशावळ नोंद',
    allClassifications: 'सर्व 74 संदर्भ शब्द',
    classifications: {
      'Community names': 'समुदाय नावे',
      'Regional identities': 'प्रादेशिक ओळख',
      'Alternate spellings': 'पर्यायी स्पेलिंग',
      'Historical and royal titles': 'ऐतिहासिक आणि शाही पदव्या',
      'Occupational or traditional subdivisions': 'व्यावसायिक किंवा पारंपारिक उपविभाग',
      'Unverified or uncertain associations': 'अप्रमाणित किंवा अनिश्चित संबंध',
    },
    relatedTopicsLabel: 'संबंधित विषय',
    relatedCommunitiesLabel: 'संबंधित समुदाय',
    keywordsLabel: 'शोध कीवर्ड आणि टोपणनावे',
    openLinkedArticleLabel: 'जोडलेला वारसा लेख उघडा',
    viewProminentFiguresLabel: 'संबंधित प्रमुख व्यक्ती पहा',
    nonConflationDisclaimer: 'ऐतिहासिक सूचना: संदर्भ शब्द समुदाय नावे, प्रादेशिक ओळख, पर्यायी स्पेलिंग, शाही पदव्या, व्यावसायिक उपविभाग किंवा अनिश्चित संबंध म्हणून स्वतंत्रपणे वर्गीकृत केले आहेत.',
  },
  or: {
    sectionTitle: '74-ନାମ ମୁଖ୍ୟ ରେଫରେନ୍ସ ଏବଂ ସର୍ଚ୍ଚ ଉପନାମ କ୍ରସ୍-ରେଫରେନ୍ସ ସୂଚୀ',
    sectionSubtitle: '45 ମୂଳ ସମ୍ପ୍ରଦାୟ ନାମ ଏବଂ 29 ଅତିରିକ୍ତ ରେଫରେନ୍ସ ଶବ୍ଦର ଐତିହାସିକ ବର୍ଗୀକରଣ ସୂଚୀ।',
    original45Badge: 'ମୂଳ 45 ରେଫରେନ୍ସ',
    supplementary25Badge: 'ଅତିରିକ୍ତ 29 ଉପନାମ',
    requiresVerificationBadge: 'ଐତିହାସିକ ଯାଞ୍ଚ ଆବଶ୍ୟକ — ସ୍ୱୟଂଚାଳିତ ଭାବେ ମିଶ୍ରଣ କରନ୍ତୁ ନାହିଁ',
    verifiedRecordBadge: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ / ଐତିହାସିକ ରେକର୍ଡ',
    gazetteerRecordBadge: 'ଗେଜେଟିୟର / ନୃବଂଶ ରେକର୍ଡ',
    lineageRecordBadge: 'ପାରମ୍ପରିକ / ଆଞ୍ଚଳିକ ବଂଶାବଳୀ ରେକର୍ଡ',
    allClassifications: 'ସମସ୍ତ 74 ରେଫରେନ୍ସ ଶବ୍ଦ',
    classifications: {
      'Community names': 'ସମ୍ପ୍ରଦାୟ ନାମ',
      'Regional identities': 'ଆଞ୍ଚଳିକ ପରିଚୟ',
      'Alternate spellings': 'ବିକଳ୍ପ ବନାନ',
      'Historical and royal titles': 'ଐତିହାସିକ ଏବଂ ରାଜକୀୟ ଉପାଧି',
      'Occupational or traditional subdivisions': 'ବୃତ୍ତିଗତ କିମ୍ବା ପାରମ୍ପରିକ ଉପବିଭାଗ',
      'Unverified or uncertain associations': 'ଅପ୍ରମାଣିତ କିମ୍ବା ଅନିଶ୍ଚିତ ସମ୍ପର୍କ',
    },
    relatedTopicsLabel: 'ସମ୍ପର୍କିତ ବିଷୟ',
    relatedCommunitiesLabel: 'ସମ୍ପର୍କିତ ସମ୍ପ୍ରଦାୟ',
    keywordsLabel: 'ସର୍ଚ୍ଚ କିୱାର୍ଡ ଏବଂ ଉପନାମ',
    openLinkedArticleLabel: 'ସଂଯୁକ୍ତ ଐତିହ୍ୟ ପ୍ରବନ୍ଧ ଖୋଲନ୍ତୁ',
    viewProminentFiguresLabel: 'ସମ୍ପର୍କିତ ବିଶିଷ୍ଟ ବ୍ୟକ୍ତିବିଶେଷ ଦେଖନ୍ତୁ',
    nonConflationDisclaimer: 'ଐତିହାସିକ ସୂଚନା: ରେଫରେନ୍ସ ଶବ୍ଦଗୁଡ଼ିକୁ ସମ୍ପ୍ରଦାୟ ନାମ, ଆଞ୍ଚଳିକ ପରିଚୟ, ବିକଳ୍ପ ବନାନ, ରାଜକୀୟ ଉପାଧି, ବୃତ୍ତିଗତ ଉପବିଭାଗ କିମ୍ବା ଅନିଶ୍ଚିତ ସମ୍ପର୍କ ଭାବେ ପୃଥକ ଭାବରେ ବର୍ଗୀକୃତ କରାଯାଇଛି।',
  },
  bn: {
    sectionTitle: '৭৪-নাম প্রধান রেফারেন্স এবং অনুসন্ধান উপনাম ক্রস-রেফারেন্স সূচী',
    sectionSubtitle: '৪৫টি মূল সম্প্রদায়ের নাম এবং ২৯টি সম্পূরক রেফারেন্স শব্দের ঐতিহাসিক শ্রেণীবিভাগ সূচী।',
    original45Badge: 'মূল ৪৫ রেফারেন্স',
    supplementary25Badge: 'সম্পূরক ২৯ উপনাম',
    requiresVerificationBadge: 'ঐতিহাসিক যাচাইকরণ প্রয়োজন — স্বয়ংক্রিয়ভাবে একত্রিত করবেন না',
    verifiedRecordBadge: 'যাচাইকৃত শিলালিপি / ঐতিহাসিক রেকর্ড',
    gazetteerRecordBadge: 'নথিভুক্ত গেজেটিয়ার / নৃতাত্ত্বিক রেকর্ড',
    lineageRecordBadge: 'ঐতিহ্যবাহী / আঞ্চলিক বংশাবলী রেকর্ড',
    allClassifications: 'সমস্ত ৭৪টি রেফারেন্স শব্দ',
    classifications: {
      'Community names': 'সম্প্রদায়ের নাম',
      'Regional identities': 'আঞ্চলিক পরিচয়',
      'Alternate spellings': 'বিকল্প বানান',
      'Historical and royal titles': 'ঐতিহাসিক ও রাজকীয় উপাধি',
      'Occupational or traditional subdivisions': 'পেশাগত বা ঐতিহ্যবাহী উপবিভাগ',
      'Unverified or uncertain associations': 'অযাচাইকৃত বা অনিশ্চিত সম্পর্ক',
    },
    relatedTopicsLabel: 'সম্পর্কিত বিষয়',
    relatedCommunitiesLabel: 'সম্পর্কিত সম্প্রদায়',
    keywordsLabel: 'অনুসন্ধান কীওয়ার্ড ও উপনাম',
    openLinkedArticleLabel: 'সংযুক্ত ঐতিহ্য নিবন্ধ খুলুন',
    viewProminentFiguresLabel: 'সম্পর্কিত বিশিষ্ট ব্যক্তিত্ব দেখুন',
    nonConflationDisclaimer: 'ঐতিহাসিক বিজ্ঞপ্তি: রেফারেন্স শব্দগুলোকে সম্প্রদায়ের নাম, আঞ্চলিক পরিচয়, বিকল্প বানান, রাজকীয় উপাধি, পেশাগত উপবিভাগ বা অনিশ্চিত সম্পর্ক হিসেবে আলাদাভাবে শ্রেণীবিভাগ করা হয়েছে।',
  },
};

function makeLangMap(
  en: string,
  hi?: string,
  te?: string,
  kn?: string,
  ta?: string,
  mr?: string,
  or?: string,
  bn?: string
): Record<LanguageCode, string> {
  return {
    en,
    hi: hi || en,
    te: te || en,
    kn: kn || en,
    ta: ta || en,
    mr: mr || hi || en,
    or: or || en,
    bn: bn || en,
  };
}

export const MASTER_70_REFERENCE_REGISTRY: Reference70Entry[] = [
  // ============================================================================
  // PART A: ORIGINAL 45 COMMUNITY REFERENCE NAMES (1 TO 45)
  // ============================================================================
  {
    order: 1,
    id: 'ref70_01_oddaru_odra_communities',
    canonicalTerm: 'Oddaru / Odra communities',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Oddaru / Odra communities',
      'ओड्डरु / ओड्र समुदाय',
      'ఒడ్డరు / ఓడ్ర సముదాయాలు',
      'ಒಡ್ಡರು / ಓಡ್ರ ಸಮುದಾಯಗಳು',
      'ஒட்டர் / ஒட்ர சமூகங்கள்',
      'ओड्डरु / ओड्र समुदाय',
      'ଓଡ଼ରୁ / ଓଡ୍ର ସମ୍ପ୍ରଦାୟ',
      'ওড্ডরু / ওড্র সম্প্রদায়'
    ),
    multilingualSearchAliases: ['Oddaru / Odra communities', 'Oddaru', 'Odra communities', 'ओड्डरु', 'ओड्र समुदाय', 'ఒడ్డరు', 'ಒಡ್ಡರು', 'ஒட்டர்', 'ଓଡ଼ରୁ', 'ওড্ডরু'],
    historicalContextNote: makeLangMap(
      'Umbrella ethnographic and historical designation connecting Kannada/South Indian Oddaru communities with ancient Odra-desa heritage.',
      'कन्नड़/दक्षिण भारतीय ओड्डरु समुदायों को प्राचीन ओड्र-देश विरासत से जोड़ने वाला प्रमुख ऐतिहासिक और नृवंशविज्ञान पदनाम।',
      'కన్నడ/దక్షిణ భారత ఒడ్డరు సముదాయాలను ప్రాచీన ఓడ్ర-దేశ వారసత్వంతో అనుసంధానించే చారిత్రక నామం.',
      'ಕನ್ನಡ/ದಕ್ಷಿಣ ಭಾರತದ ಒಡ್ಡರು ಸಮುದಾಯಗಳನ್ನು প্রাಚೀನ ಓಡ್ರ-ದೇಶ ಪರಂಪರೆಯೊಂದಿಗೆ ಬೆಸೆಯುವ ಐತಿಹಾಸಿಕ ಹೆಸರು.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_16_oddaru',
    relatedHeritageIds: ['comm_dir_16_oddaru', 'syn_od_oad_odra', 'syn_oddar'],
    relatedProminentLabelIds: ['oddaru_odra_communities', 'branch_odra', 'branch_oddar'],
    relatedTopicsAndKeywords: ['Oddaru', 'Odra', 'Kalinga', 'Karnataka', 'South India'],
  },
  {
    order: 2,
    id: 'ref70_02_od_community',
    canonicalTerm: 'OD-Community',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'OD-Community',
      'ओड समुदाय (OD-Community)',
      'ఓడ్ కమ్యూనిటీ (OD-Community)',
      'ಓಡ್ ಸಮುದಾಯ (OD-Community)',
      'ஓட் சமூகம் (OD-Community)',
      'ओड समुदाय',
      'ଓଡ଼ ସମ୍ପ୍ରଦାୟ',
      'ওড় সম্প্রদায়'
    ),
    multilingualSearchAliases: ['OD-Community', 'Od Community', 'Oad Community', 'ओड समुदाय', 'ఓడ్ కమ్యూనిటీ', 'ಓಡ್ ಸಮುದಾಯ', 'ஓட் சமூகம்', 'ଓଡ଼ ସମ୍ପ୍ରଦାୟ', 'ওড় সম্প্রদায়'],
    historicalContextNote: makeLangMap(
      'Pan-Indian community classification representing Od / Oad populations documented across North, West, and Central India.',
      'उत्तर, पश्चिम और मध्य भारत में प्रलेखित ओड / ओद आबादी का प्रतिनिधित्व करने वाला अखिल भारतीय समुदाय वर्गीकरण।',
      'ఉత్తర, పశ్చిమ మరియు మధ్య భారతదేశంలో నమోదు చేయబడిన ఓడ్ / ఓద్ జనాభాను సూచించే కమ్యూనిటీ వర్గీకరణ.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_01_od',
    relatedHeritageIds: ['comm_dir_01_od', 'syn_od_oad_odra'],
    relatedProminentLabelIds: ['od_community', 'branch_od', 'branch_oad'],
    relatedTopicsAndKeywords: ['Od', 'Oad', 'Od-Rajputh', 'North India', 'Western India'],
  },
  {
    order: 3,
    id: 'ref70_03_od_rajputh',
    canonicalTerm: 'Od-Rajputh',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Od-Rajputh',
      'ओड-राजपूत (Od-Rajputh)',
      'ఓడ్-రాజ్‌పుత్ (Od-Rajputh)',
      'ಓಡ್-ರಜಪೂತ್ (Od-Rajputh)',
      'ஓட்-ராஜ்புத் (Od-Rajputh)',
      'ओड-राजपूत',
      'ଓଡ଼-ରାଜପୁତ',
      'ওড়-রাজপুত'
    ),
    multilingualSearchAliases: ['Od-Rajputh', 'Od Rajput', 'Oad Rajput', 'Oad-Rajputh', 'ओड-राजपूत', 'ओड राजपूत', 'ఓడ్-రాజ్‌పుత్', 'ಓಡ್-ರಜಪೂತ್', 'ଓଡ଼-ରାଜପୁତ'],
    historicalContextNote: makeLangMap(
      'North and Northwestern Indian Kshatriya/Rajput lineage identity of the Od/Oad community documented across Rajasthan, Haryana, Punjab, Delhi, and UP.',
      'राजस्थान, हरियाणा, पंजाब, दिल्ली और उत्तर प्रदेश में प्रलेखित ओड/ओद समुदाय की उत्तर और उत्तर-पश्चिमी भारतीय क्षत्रिय/राजपूत वंशावली पहचान।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_02_od_rajputh',
    relatedHeritageIds: ['comm_dir_02_od_rajputh', 'syn_oad_rajputh', 'comm_dir_01_od'],
    relatedProminentLabelIds: ['od_rajputh', 'branch_oad_rajputh', 'od_community'],
    relatedTopicsAndKeywords: ['Od-Rajputh', 'Oad-Rajputh', 'Bhagiratha Vamshi', 'Rajasthan', 'Haryana'],
  },
  {
    order: 4,
    id: 'ref70_04_vaddera_rajulu',
    canonicalTerm: 'Vaddera Rajulu',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Vaddera Rajulu',
      'वड्डेरा राजुलु (Vaddera Rajulu)',
      'వడ్డెర రాజులు (Vaddera Rajulu)',
      'ವಡ್ಡರ ರಾಜುಲು (Vaddera Rajulu)',
      'வடெர ராஜுலு (Vaddera Rajulu)',
      'वड्डेरा राजुलु',
      'ବଡ଼େରା ରାଜୁଲୁ',
      'ভাদেরা রাজুলু'
    ),
    multilingualSearchAliases: ['Vaddera Rajulu', 'VadderaRajulu', 'వడ్డెర రాజులు', 'वड्डेरा राजुलु', 'ವಡ್ಡರ ರಾಜುಲು', 'வடெர ராஜுலு', 'ବଡ଼େରା ରାଜୁଲୁ'],
    historicalContextNote: makeLangMap(
      'Telugu royal and martial lineage designation preserving memories of fort command, hydraulic statecraft, and Nayaka/Gajapati service in Andhra and Telangana.',
      'आंध्र और तेलंगाना में किला कमान, जल-अभियांत्रिकी शासन और नायक/गजपति सेवा की स्मृतियों को संरक्षित करने वाला तेलुगु शाही और सामरिक वंश पदनाम।',
      'ఆంధ్ర మరియు తెలంగాణలో కోటల రక్షణ, జలవనరుల నిర్మాణం మరియు నాయక/గజపతి సేవల చరిత్రను సూచించే వడ్డెర రాజుల వంశ నామం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_13_vadderarajulu',
    relatedHeritageIds: ['comm_dir_13_vadderarajulu', 'comm_dir_10_vaddera', 'syn_odderajulu'],
    relatedProminentLabelIds: ['vaddera_rajulu', 'branch_vadderajulu', 'branch_vaddera'],
    relatedTopicsAndKeywords: ['Vaddera Rajulu', 'VadderaRajulu', 'VaddeRajulu', 'Andhra Pradesh', 'Telangana'],
  },
  {
    order: 5,
    id: 'ref70_05_vaddi_rajulu',
    canonicalTerm: 'Vaddi Rajulu',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Vaddi Rajulu',
      'वड्डी राजुलु (Vaddi Rajulu)',
      'వడ్డి రాజులు (Vaddi Rajulu)',
      'ವಡ್ಡಿ ರಾಜುಲು (Vaddi Rajulu)',
      'வட்டி ராஜுலு (Vaddi Rajulu)',
      'वड्डी राजुलु',
      'ବଡ଼ି ରାଜୁଲୁ',
      'বড্ডি রাজুলু'
    ),
    multilingualSearchAliases: ['Vaddi Rajulu', 'VaddiRajulu', 'వడ్డి రాజులు', 'वड्डी राजुलु', 'ವಡ್ಡಿ ರಾಜುಲು', 'வட்டி ராஜுலு', 'ବଡ଼ି ରାଜୁଲୁ'],
    historicalContextNote: makeLangMap(
      'Coastal Andhra and Kalinga-border royal/chieftaincy lineage designation associated with Odra-Kalinga military and administrative nobility.',
      'तटीय आंध्र और कलिंग-सीमा का शाही/सामंती वंश पदनाम जो ओड्र-कलिंग सैन्य और प्रशासनिक कुलीनता से जुड़ा है।',
      'ఉత్తరాంధ్ర మరియు కళింగ సరిహద్దు ప్రాంతాలలో ఓడ్ర-కళింగ సైనిక మరియు పరిపాలనా వారసత్వానికి చెందిన వడ్డి రాజుల నామం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_12_vaddirajulu',
    relatedHeritageIds: ['comm_dir_12_vaddirajulu', 'comm_dir_09_vaddi', 'comm_dir_04_kalingarajulu'],
    relatedProminentLabelIds: ['vaddi_rajulu', 'vaddi', 'branch_vadiyarajulu'],
    relatedTopicsAndKeywords: ['Vaddi Rajulu', 'VaddiRajulu', 'Vaddi', 'Kalinga', 'Uttarandhra'],
  },
  {
    order: 6,
    id: 'ref70_06_vaddi',
    canonicalTerm: 'Vaddi',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Vaddi', 'वड्डी (Vaddi)', 'వడ్డి (Vaddi)', 'ವಡ್ಡಿ (Vaddi)', 'வட்டி (Vaddi)', 'वड्डी', 'ବଡ଼ି', 'বড্ডি'),
    multilingualSearchAliases: ['Vaddi', 'Vadde', 'వడ్డి', 'वड्डी', 'ವಡ್ಡಿ', 'வட்டி', 'ବଡ଼ି', 'বড্ডি'],
    historicalContextNote: makeLangMap(
      'Documented community name in Srikakulam, Vizianagaram, Visakhapatnam, and southern Odisha historically linked to Odra/Vadde lineages.',
      'श्रीकाकुलम, विजयनगरम, विशाखापत्तनम और दक्षिणी ओडिशा में प्रलेखित समुदाय नाम जो ऐतिहासिक रूप से ओड्र/वड्डे वंशों से जुड़ा है।',
      'శ్రీకాకుళం, విజయనగరం, విశాఖపట్నం మరియు దక్షిణ ఒడిశాలో చారిత్రకంగా ఓడ్ర/వడ్డె వంశాలతో ముడిపడి ఉన్న కమ్యూనిటీ పేరు.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_09_vaddi',
    relatedHeritageIds: ['comm_dir_09_vaddi', 'comm_dir_12_vaddirajulu', 'syn_odde_vadde'],
    relatedProminentLabelIds: ['vaddi', 'vaddi_rajulu', 'branch_vadde'],
    relatedTopicsAndKeywords: ['Vaddi', 'Vaddi Rajulu', 'Srikakulam', 'Vizianagaram', 'Kalinga'],
  },
  {
    order: 7,
    id: 'ref70_07_vaddelu',
    canonicalTerm: 'Vaddelu',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Vaddelu', 'वड्डेलु (Vaddelu)', 'వడ్డెలు (Vaddelu)', 'ವಡ್ಡೆಲು (Vaddelu)', 'வடெலு (Vaddelu)', 'वड्डेलु', 'ବଡ଼େଲୁ', 'ভাদেলু'),
    multilingualSearchAliases: ['Vaddelu', 'Vaddeelu', 'వడ్డెలు', 'వడ్డీలు', 'वड्डेलु', 'ವಡ್ಡೆಲು', 'வடெலு', 'ବଡ଼େଲୁ'],
    historicalContextNote: makeLangMap(
      'Plural Telugu honorific and community designation (Vaddelu / Vaddeelu) used across Rayalaseema, Telangana, and Coastal Andhra.',
      'रायलसीमा, तेलंगाना और तटीय आंध्र में प्रयुक्त बहुवचन तेलुगु सम्मानसूचक और समुदाय पदनाम (वड्डेलु / वड्डीलु)।',
      'రాయలసీమ, తెలంగాణ మరియు ఆంధ్ర ప్రాంతాలలో ఉపయోగించే వడ్డెలు / వడ్డీలు అనే బహువచన గౌరవ వాచకం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_11_vaddeelu',
    relatedHeritageIds: ['comm_dir_11_vaddeelu', 'comm_dir_10_vaddera', 'syn_odde_vadde'],
    relatedProminentLabelIds: ['vaddelu', 'branch_vadde', 'branch_vaddera'],
    relatedTopicsAndKeywords: ['Vaddelu', 'Vaddeelu', 'Vaddera', 'Vadde', 'Telugu'],
  },
  {
    order: 8,
    id: 'ref70_08_suryavamshi_communities',
    canonicalTerm: 'Suryavamshi communities',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Suryavamshi communities',
      'सूर्यवंशी समुदाय',
      'సూర్యవంశీ సముదాయాలు',
      'ಸೂರ್ಯವಂಶಿ ಸಮುದಾಯಗಳು',
      'சூர்யவம்சி சமூகங்கள்',
      'सूर्यवंशी समुदाय',
      'ସୂର୍ଯ୍ୟବଂଶୀ ସମ୍ପ୍ରଦାୟ',
      'সূর্যবংশী সম্প্রদায়'
    ),
    multilingualSearchAliases: ['Suryavamshi communities', 'Suryavamshi', 'Suryavanshi', 'Solar Dynasty', 'सूर्यवंशी', 'సూర్యవంశీ', 'ಸೂರ್ಯವಂಶಿ', 'சூர்யவம்சி', 'ସୂର୍ଯ୍ୟବଂଶୀ', 'সূর্যবংশী'],
    historicalContextNote: makeLangMap(
      'Solar dynasty (Ikshvaku / Suryavamsha) royal and martial heritage claimed by Kapilendra Deva’s Suryavamshi Gajapati dynasty and preserved across community traditions.',
      'कपिलेंद्र देव के सूर्यवंशी गजपति राजवंश द्वारा दावा की गई और सामुदायिक परंपराओं में संरक्षित सौर राजवंश (इक्ष्वाकु / सूर्यवंश) की शाही और सामरिक विरासत।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_suryavamshi',
    relatedHeritageIds: ['syn_suryavamshi', 'comm_dir_14_gajapathulu', 'prof_cat_8_royal_dynasties'],
    relatedProminentLabelIds: ['suryavamshi_communities', 'branch_suryavamsha_kshatriya', 'branch_suryavamshi_kshatriya', 'branch_suryavamsham_rajulu'],
    relatedTopicsAndKeywords: ['Suryavamshi', 'Ikshvaku', 'Suryavamshi Gajapati', 'Solar Dynasty'],
  },
  {
    order: 9,
    id: 'ref70_09_sagara_vamshi',
    canonicalTerm: 'Sagara Vamshi traditions',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Sagara Vamshi traditions',
      'सगर वंशी परंपराएं',
      'సగర వంశీ సంప్రదాయాలు',
      'ಸಗರ ವಂಶಿ ಸಂಪ್ರದಾಯಗಳು',
      'சகர வம்சி மரபுகள்',
      'सगर वंशी परंपरा',
      'ସଗର ବଂଶୀ ପରମ୍ପରା',
      'সগর বংশী ঐতিহ্য'
    ),
    multilingualSearchAliases: ['Sagara Vamshi traditions', 'Sagara Vamshi', 'Sagaravamshi', 'Chakravarti Sagara', 'सगर वंशी', 'సగర వంశీ', 'ಸಗರ ವಂಶಿ', 'சகர வம்சி', 'ସଗର ବଂଶୀ'],
    historicalContextNote: makeLangMap(
      'Puranic and traditional lineage memory tracing community hydraulic and earth-excavation mastery to Emperor Sagara and the sixty thousand Sagaraputras who excavated the ocean basin.',
      'समुदाय की जल-अभियांत्रिकी और पृथ्वी-उत्खनन निपुणता को सम्राट सगर और सागर-पुत्रों से जोड़ने वाली पौराणिक और पारंपरिक वंशावली स्मृति।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_sagaravamshi',
    relatedHeritageIds: ['syn_sagaravamshi', 'syn_suryavamshi', 'prof_cat_3_construction_hydraulic'],
    relatedProminentLabelIds: ['sagara_vamshi_label', 'bhagiratha_vamshi_label', 'suryavamshi_communities'],
    relatedTopicsAndKeywords: ['Sagara Vamshi', 'Sagaravamshi', 'Emperor Sagara', 'Hydraulic Heritage'],
  },
  {
    order: 10,
    id: 'ref70_10_bhagiratha_vamshi',
    canonicalTerm: 'Bhagiratha Vamshi traditions',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Bhagiratha Vamshi traditions',
      'भगीरथ वंशी परंपराएं',
      'భగీరథ వంశీ సంప్రదాయాలు',
      'ಭಗೀರಥ ವಂಶಿ ಸಂಪ್ರದಾಯಗಳು',
      'பகீரத வம்சி மரபுகள்',
      'भगीरथ वंशी परंपरा',
      'ଭଗୀରଥ ବଂଶୀ ପରମ୍ପରା',
      'ভগীরথ বংশী ঐতিহ্য'
    ),
    multilingualSearchAliases: ['Bhagiratha Vamshi traditions', 'Bhagiratha Vamshi', 'Bhagirathavanshi', 'Maharshi Bhagiratha', 'भगीरथ वंशी', 'భగీరథ వంశీ', 'ಭಗೀರಥ ವಂಶಿ', 'பகீரத வம்சி', 'ଭଗୀରଥ ବଂଶୀ'],
    historicalContextNote: makeLangMap(
      'Sacred lineage tradition honoring Rajarshi Bhagiratha, the legendary Solar-dynasty sovereign and pioneer of sacred river channeling and hydraulic engineering.',
      'पवित्र नदी प्रवाह और जल-अभियांत्रिकी के अग्रदूत राजर्षि भगीरथ का सम्मान करने वाली पवित्र वंशावली परंपरा।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_sagaravamshi',
    relatedHeritageIds: ['syn_sagaravamshi', 'syn_suryavamshi', 'comm_dir_02_od_rajputh', 'prof_cat_3_construction_hydraulic'],
    relatedProminentLabelIds: ['bhagiratha_vamshi_label', 'sagara_vamshi_label', 'od_rajputh'],
    relatedTopicsAndKeywords: ['Bhagiratha Vamshi', 'Rajarshi Bhagiratha', 'Ganga Avatarana', 'Hydraulic Engineering'],
  },
  {
    order: 11,
    id: 'ref70_11_raghu_vamshi',
    canonicalTerm: 'Raghu Vamshi traditions',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Raghu Vamshi traditions',
      'रघु वंशी परंपराएं',
      'రఘు వంశీ సంప్రదాయాలు',
      'ರಘು ವಂಶಿ ಸಂಪ್ರದಾಯಗಳು',
      'ரகு வம்சி மரபுகள்',
      'रघु वंशी परंपरा',
      'ରଘୁ ବଂଶୀ ପରମ୍ପରା',
      'রঘু বংশী ঐতিহ্য'
    ),
    multilingualSearchAliases: ['Raghu Vamshi traditions', 'Raghu Vamshi', 'Raghuvamshi', 'Raghukul', 'रघु वंशी', 'रघुवंशी', 'రఘు వంశీ', 'ರಘು ವಂಶಿ', 'ரகு வம்சி', 'ରଘୁ ବଂଶୀ'],
    historicalContextNote: makeLangMap(
      'Branch of the Solar dynasty (Suryavamsha) associated with King Raghu, invoked in royal genealogies and martial community traditions.',
      'राजा रघु से जुड़ी सूर्यवंश की शाखा, जिसका उल्लेख शाही वंशावलियों और सामरिक सामुदायिक परंपराओं में किया जाता है।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_raghuvamshi',
    relatedHeritageIds: ['syn_raghuvamshi', 'syn_suryavamshi'],
    relatedProminentLabelIds: ['raghu_vamshi_label', 'suryavamshi_communities'],
    relatedTopicsAndKeywords: ['Raghu Vamshi', 'Raghuvamshi', 'Suryavamsha'],
  },
  {
    order: 12,
    id: 'ref70_12_od_kayastha',
    canonicalTerm: 'Od-Kayastha',
    datasetGroup: 'original_45',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap('Od-Kayastha', 'ओड-कायस्थ (Od-Kayastha)', 'ఓడ్-కాయস্থ (Od-Kayastha)', 'ಓಡ್-ಕಾಯಸ್ಥ (Od-Kayastha)', 'ஓட்-காயஸ்தா (Od-Kayastha)', 'ओड-कायस्थ', 'ଓଡ଼-କାୟସ୍ଥ', 'ওড়-কায়স্থ'),
    multilingualSearchAliases: ['Od-Kayastha', 'Od Kayastha', 'Karana-Kayastha', 'ओड-कायस्थ', 'ఓడ్-కాయస్థ', 'ಓಡ್-ಕಾಯಸ್ಥ', 'ଓଡ଼-କାୟସ୍ଥ'],
    historicalContextNote: makeLangMap(
      'Administrative/scribal-military compound title in Odisha/Eastern India (historically overlapping with Karana/Khandayat courtly scribes). Kept distinct from general Kayastha castes pending specific archival verification.',
      'ओडिशा/पूर्वी भारत में प्रशासनिक/लेखक-सैन्य संयुक्त उपाधि। विशिष्ट अभिलेखीय सत्यापन के बिना सामान्य कायस्थ जातियों के साथ स्वतः विलय नहीं किया जाना चाहिए।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_05_od_khandayath',
    relatedHeritageIds: ['comm_dir_05_od_khandayath', 'comm_dir_03_odra_kshatriya'],
    relatedProminentLabelIds: ['od_kayastha', 'kayastha_kshatriya', 'branch_od_khandayaths'],
    relatedTopicsAndKeywords: ['Od-Kayastha', 'Kayastha-Kshatriya', 'Administrative Scribes', 'Requires Verification'],
  },
  {
    order: 13,
    id: 'ref70_13_kayastha_kshatriya',
    canonicalTerm: 'Kayastha-Kshatriya',
    datasetGroup: 'original_45',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Kayastha-Kshatriya',
      'कायस्थ-क्षत्रिय (Kayastha-Kshatriya)',
      'కాయస్థ-క్షత్రియ (Kayastha-Kshatriya)',
      'ಕಾಯಸ್ಥ-ಕ್ಷತ್ರಿಯ (Kayastha-Kshatriya)',
      'காயஸ்த-க்ஷத்ரிய (Kayastha-Kshatriya)',
      'कायस्थ-क्षत्रिय',
      'କାୟସ୍ଥ-କ୍ଷତ୍ରିୟ',
      'কায়স্থ-ক্ষত্রিয়'
    ),
    multilingualSearchAliases: ['Kayastha-Kshatriya', 'Kayastha Kshatriya', 'कायस्थ-क्षत्रिय', 'కాయస్థ-క్షత్రియ', 'ಕಾಯಸ್ಥ-ಕ್ಷತ್ರಿಯ', 'କାୟସ୍ଥ-କ୍ଷତ୍ରିୟ'],
    historicalContextNote: makeLangMap(
      'Dual administrative-martial status designation found in medieval courtly records. Requires case-by-case historical verification to distinguish Odra martial-scribal lineages from unrelated North Indian Kayastha groups.',
      'मध्यकालीन दरबारी रिकॉर्ड में पाया जाने वाला दोहरा प्रशासनिक-सामरिक पदनाम। असंबद्ध उत्तर भारतीय कायस्थ समूहों से अलग रखने के लिए ऐतिहासिक सत्यापन आवश्यक है।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_03_odra_kshatriya',
    relatedHeritageIds: ['comm_dir_03_odra_kshatriya', 'comm_dir_05_od_khandayath'],
    relatedProminentLabelIds: ['kayastha_kshatriya', 'od_kayastha'],
    relatedTopicsAndKeywords: ['Kayastha-Kshatriya', 'Od-Kayastha', 'Requires Verification'],
  },
  {
    order: 14,
    id: 'ref70_14_suryavamsha_kshatriya',
    canonicalTerm: 'Suryavamsha Kshatriya',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Suryavamsha Kshatriya',
      'सूर्यवंश क्षत्रिय',
      'సూర్యవంశ క్షత్రియ',
      'ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯ',
      'சூர்யவம்ச க்ஷத்ரிய',
      'सूर्यवंश क्षत्रिय',
      'ସୂର୍ଯ୍ୟବଂଶ କ୍ଷତ୍ରିୟ',
      'সূর্যবংশ ক্ষত্রিয়'
    ),
    multilingualSearchAliases: ['Suryavamsha Kshatriya', 'Suryavamshi Kshatriya', 'सूर्यवंश क्षत्रिय', 'సూర్యవంశ క్షత్రియ', 'ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯ', 'ସୂର୍ଯ୍ୟବଂଶ କ୍ଷତ୍ରିୟ'],
    historicalContextNote: makeLangMap(
      'Sanskritic royal and martial title attested in Gajapati and Kalinga-Andhra inscriptions denoting Solar-lineage Kshatriya sovereignty.',
      'गजपति और कलिंग-आंध्र शिलालेखों में प्रमाणित संस्कृत शाही और सामरिक उपाधि जो सूर्यवंशी क्षत्रिय संप्रभुता को दर्शाती है।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_suryavamshi',
    relatedHeritageIds: ['syn_suryavamshi', 'comm_dir_03_odra_kshatriya', 'comm_dir_14_gajapathulu'],
    relatedProminentLabelIds: ['branch_suryavamsha_kshatriya', 'branch_suryavamshi_kshatriya', 'suryavamshi_communities'],
    relatedTopicsAndKeywords: ['Suryavamsha Kshatriya', 'Suryavamshi', 'Gajapati'],
  },
  {
    order: 15,
    id: 'ref70_15_suryavamshi_kshatriya',
    canonicalTerm: 'Suryavamshi Kshatriya',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Suryavamshi Kshatriya',
      'सूर्यवंशी क्षत्रिय',
      'సూర్యవంశీ క్షత్రియ',
      'ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯ',
      'சூர்யவம்சி க்ஷத்ரிய',
      'सूर्यवंशी क्षत्रिय',
      'ସୂର୍ଯ୍ୟବଂଶୀ କ୍ଷତ୍ରିୟ',
      'সূর্যবংশী ক্ষত্রিয়'
    ),
    multilingualSearchAliases: ['Suryavamshi Kshatriya', 'Suryavanshi Kshatriya', 'सूर्यवंशी क्षत्रिय', 'సూర్యవంశీ క్షత్రియ', 'ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯ', 'ସୂର୍ଯ୍ୟବଂଶୀ କ୍ଷତ୍ରିୟ'],
    historicalContextNote: makeLangMap(
      'Vernacular and pan-Indian variant of Suryavamsha Kshatriya used across Odisha, Andhra, Telangana, Karnataka, and North India.',
      'ओडिशा, आंध्र, तेलंगाना, कर्नाटक और उत्तर भारत में प्रयुक्त सूर्यवंश क्षत्रिय का प्रचलित रूप।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_suryavamshi',
    relatedHeritageIds: ['syn_suryavamshi', 'comm_dir_03_odra_kshatriya', 'syn_od_kshatriya'],
    relatedProminentLabelIds: ['branch_suryavamshi_kshatriya', 'branch_suryavamsha_kshatriya', 'suryavamshi_communities'],
    relatedTopicsAndKeywords: ['Suryavamshi Kshatriya', 'Solar Lineage', 'Od-Kshatriya'],
  },
  {
    order: 16,
    id: 'ref70_16_suryavamsham_rajulu',
    canonicalTerm: 'Suryavamsham Rajulu',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Suryavamsham Rajulu',
      'सूर्यवंशम राजुलु',
      'సూర్యవంశం రాజులు',
      'ಸೂರ್ಯವಂಶಂ ರಾಜುಲು',
      'சூர்யவம்சம் ராஜுலு',
      'सूर्यवंशम राजुलु',
      'ସୂର୍ଯ୍ୟବଂଶମ୍ ରାଜୁଲୁ',
      'সূর্যবংশম রাজুলু'
    ),
    multilingualSearchAliases: ['Suryavamsham Rajulu', 'Suryavamsam Rajulu', 'సూర్యవంశం రాజులు', 'सूर्यवंशम राजुलु', 'ಸೂರ್ಯವಂಶಂ ರಾಜುಲು'],
    historicalContextNote: makeLangMap(
      'Telugu royal lineage title identifying Solar-dynasty Rajulu families connected to Kalinga-Andhra and Gajapati/Vaddera Rajulu traditions.',
      'कलिंग-आंध्र और गजपति/वड्डेरा राजुलु परंपराओं से जुड़े सूर्यवंशी राजुलु परिवारों की पहचान करने वाली तेलुगु शाही उपाधि।',
      'కళింగ-ఆంధ్ర మరియు గజపతి/వడ్డెర రాజుల సంప్రదాయాలతో ముడిపడి ఉన్న సూర్యవంశం రాజుల బిరుదు.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_suryavamshi',
    relatedHeritageIds: ['syn_suryavamshi', 'comm_dir_04_kalingarajulu', 'comm_dir_13_vadderarajulu'],
    relatedProminentLabelIds: ['branch_suryavamsham_rajulu', 'branch_kshatriya_rajulu', 'vaddera_rajulu'],
    relatedTopicsAndKeywords: ['Suryavamsham Rajulu', 'KalingaRajulu', 'Vaddera Rajulu'],
  },
  {
    order: 17,
    id: 'ref70_17_kshatriya_rajulu',
    canonicalTerm: 'Kshatriya Rajulu',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Kshatriya Rajulu',
      'क्षत्रिय राजुलु',
      'క్షత్రియ రాజులు',
      'ಕ್ಷತ್ರಿಯ ರಾಜುಲು',
      'க்ஷத்ரிய ராஜுலு',
      'क्षत्रिय राजुलु',
      'କ୍ଷତ୍ରିୟ ରାଜୁଲୁ',
      'ক্ষত্রিয় রাজুলু'
    ),
    multilingualSearchAliases: ['Kshatriya Rajulu', 'క్షత్రియ రాజులు', 'क्षत्रिय राजुलु', 'ಕ್ಷತ್ರಿಯ ರಾಜುಲು', 'க்ஷத்ரிய ராஜுலு', 'କ୍ଷତ୍ରିୟ ରାଜୁଲୁ'],
    historicalContextNote: makeLangMap(
      'Telugu honorific title denoting ruling and martial Kshatriya lineages among Odde/Vadde/Kalinga Rajulu families. Kept contextually distinct from unrelated coastal Raju sub-castes unless Odra/Kalinga lineage is specified.',
      'ओड्डे/वड्डे/कलिंग राजुलु परिवारों में शासक और सामरिक क्षत्रिय वंशों को दर्शाने वाली तेलुगु सम्मानसूचक उपाधि।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_12_vaddirajulu', 'comm_dir_13_vadderarajulu'],
    relatedProminentLabelIds: ['branch_kshatriya_rajulu', 'branch_odderajulu', 'vaddera_rajulu'],
    relatedTopicsAndKeywords: ['Kshatriya Rajulu', 'OddeRajulu', 'KalingaRajulu'],
  },
  {
    order: 18,
    id: 'ref70_18_odderajulu',
    canonicalTerm: 'OddeRajulu',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('OddeRajulu', 'ओड्डेराजुलु (OddeRajulu)', 'ఒడ్డెరాజులు (OddeRajulu)', 'ಒಡ್ಡೆರಾಜುಲು (OddeRajulu)', 'ஒட்டெராஜுலு (OddeRajulu)', 'ओड्डेराजुलु', 'ଓଡ଼େରାଜୁଲୁ', 'ওড্ডেরাজুলু'),
    multilingualSearchAliases: ['OddeRajulu', 'Odde Rajulu', 'Odderajulu', 'ఒడ్డెరాజులు', 'ओड्डेराजुलु', 'ಒಡ್ಡೆರಾಜುಲು', 'ଓଡ଼େରାଜୁଲୁ'],
    historicalContextNote: makeLangMap(
      'Historical Telugu designation for Odra/Odde royal and military chieftains documented in medieval Andhra, Rayalaseema, and Vijayanagara-era records.',
      'मध्यकालीन आंध्र, रायलसीमा और विजयनगर-युगीन अभिलेखों में प्रलेखित ओड्र/ओड्डे शाही और सैन्य प्रमुखों के लिए ऐतिहासिक तेलुगु पदनाम।',
      'మధ్యయుగ ఆంధ్ర, రాయలసీమ మరియు విజయనగర కాలపు రికార్డులలో నమోదైన ఒడ్డెరాజుల చారిత్రక నామం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odderajulu',
    relatedHeritageIds: ['syn_odderajulu', 'comm_dir_13_vadderarajulu', 'syn_odde_vadde'],
    relatedProminentLabelIds: ['branch_odderajulu', 'branch_odderazulu', 'branch_vadderajulu'],
    relatedTopicsAndKeywords: ['OddeRajulu', 'OddeRazulu', 'VaddeRajulu', 'Vijayanagara', 'Rayalaseema'],
  },
  {
    order: 19,
    id: 'ref70_19_vadderajulu',
    canonicalTerm: 'VaddeRajulu',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('VaddeRajulu', 'वड्डेराजुलु (VaddeRajulu)', 'వడ్డెరాజులు (VaddeRajulu)', 'ವಡ್ಡೆರಾಜುಲು (VaddeRajulu)', 'வடெராஜுலு (VaddeRajulu)', 'वड्डेराजुलु', 'ବଡ଼େରାଜୁଲୁ', 'ভাদেরাজুলু'),
    multilingualSearchAliases: ['VaddeRajulu', 'Vadde Rajulu', 'Vaddera Rajulu', 'వడ్డెరాజులు', 'वड्डेराजुलु', 'ವಡ್ಡೆರಾಜುಲು'],
    historicalContextNote: makeLangMap(
      'Compound royal-lineage variant of OddeRajulu / Vaddera Rajulu widely attested in Telugu oral histories, kaifiyats, and palaiyakkarar/poligar traditions.',
      'तेलुगु मौखिक इतिहास, कैफियतों और पालेगार परंपराओं में प्रमाणित ओड्डेराजुलु / वड्डेरा राजुलु का संयुक्त शाही-वंश रूप।',
      'తెలుగు కైఫియతులు మరియు పాలెగాళ్ల సంప్రదాయాలలో కనిపించే వడ్డెరాజులు అనే రాజవంశ నామం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_13_vadderarajulu',
    relatedHeritageIds: ['comm_dir_13_vadderarajulu', 'syn_odderajulu', 'syn_vadde_gajapathirajulu'],
    relatedProminentLabelIds: ['branch_vadderajulu', 'vaddera_rajulu', 'branch_odderajulu'],
    relatedTopicsAndKeywords: ['VaddeRajulu', 'Vaddera Rajulu', 'OddeRajulu'],
  },
  {
    order: 20,
    id: 'ref70_20_odderazulu',
    canonicalTerm: 'OddeRazulu',
    datasetGroup: 'original_45',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('OddeRazulu', 'ओड्डेराज़ुलु (OddeRazulu)', 'ఒడ్డెరాజులు (OddeRazulu)', 'ಒಡ್ಡೆರಾಜುಲು (OddeRazulu)', 'ஒட்டெராஜுலு (OddeRazulu)', 'ओड्डेराझुलु', 'ଓଡ଼େରାଜୁଲୁ', 'ওড্ডেরাজুলু'),
    multilingualSearchAliases: ['OddeRazulu', 'Odde Razulu', 'OddeRajulu', 'ఒడ్డెరాజులు', 'ओड्डेराज़ुलु'],
    historicalContextNote: makeLangMap(
      'Colonial-era Madras Presidency manual and British district gazetteer orthography (using "z" for the Telugu palatal affricate in Rajulu/Razulu) for OddeRajulu.',
      'औपनिवेशिक काल के मद्रास प्रेसीडेंसी मैनुअल और ब्रिटिश जिला गजेटियर में ओड्डेराजुलु के लिए प्रयुक्त वर्तनी (OddeRazulu)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odderajulu',
    relatedHeritageIds: ['syn_odderajulu', 'comm_dir_13_vadderarajulu'],
    relatedProminentLabelIds: ['branch_odderazulu', 'branch_odderajulu'],
    relatedTopicsAndKeywords: ['OddeRazulu', 'OddeRajulu', 'Colonial Gazetteer Spelling'],
  },
  {
    order: 21,
    id: 'ref70_21_gajapathi_rauthrai',
    canonicalTerm: 'Gajapathi RauthRai',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Gajapathi RauthRai',
      'गजपति राउतराय (Gajapathi RauthRai)',
      'గజపతి రౌత్‌రాయ్ (Gajapathi RauthRai)',
      'ಗಜಪತಿ రౌತ್‌రాయ್ (Gajapathi RauthRai)',
      'கஜபதி ரௌத்ராய் (Gajapathi RauthRai)',
      'गजपती राउतराय',
      'ଗଜପତି ରାଉତରାୟ',
      'গজপতি রাউতরায়'
    ),
    multilingualSearchAliases: ['Gajapathi RauthRai', 'Gajapati Routray', 'Rautharay', 'Routray', 'गजपति राउतराय', 'గజపతి రౌత్‌రాయ్', 'ଗଜପତି ରାଉତରାୟ'],
    historicalContextNote: makeLangMap(
      'Imperial military and princely title ("Lord of Elephants and Royal Cavalry Commander") borne by Suryavamshi Gajapati princes and commanders in Odisha and Kalinga-Andhra.',
      'ओडिशा और कलिंग-आंध्र में सूर्यवंशी गजपति राजकुमारों और सेनापतियों द्वारा धारण की जाने वाली शाही सैन्य उपाधि (गजपति राउतराय)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_14_gajapathulu',
    relatedHeritageIds: ['comm_dir_14_gajapathulu', 'syn_vadde_gajapathirajulu', 'prof_cat_8_royal_dynasties'],
    relatedProminentLabelIds: ['branch_gajapathi_rauthrai', 'branch_gajapathis'],
    relatedTopicsAndKeywords: ['Gajapathi RauthRai', 'Routray', 'Suryavamshi Gajapati'],
  },
  {
    order: 22,
    id: 'ref70_22_odiyaraju',
    canonicalTerm: 'Odiyaraju',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Odiyaraju', 'ओडियाराजु (Odiyaraju)', 'ఒడియరాజు (Odiyaraju)', 'ಒಡಿಯರಾಜು (Odiyaraju)', 'ஒடியராஜு (Odiyaraju)', 'ओडियाराजु', 'ଓଡ଼ିଆରାଜୁ', 'ওড়িয়ারাজু'),
    multilingualSearchAliases: ['Odiyaraju', 'Odiya Raju', 'Odiyarajulu', 'ಒಡಿಯರಾಜು', 'ఒడియరాజు', 'ओडियाराजु', 'ஒடியராஜு', 'ଓଡ଼ିଆରାଜୁ'],
    historicalContextNote: makeLangMap(
      'Regional royal and martial identity in Southern Karnataka, Andhra, and Tamil borderlands designating rulers and commanders of Odra/Odiya origin.',
      'दक्षिणी कर्नाटक, आंध्र और तमिल सीमावर्ती क्षेत्रों में ओड्र/ओडिया मूल के शासकों और सेनापतियों को दर्शाने वाली क्षेत्रीय शाही पहचान।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odiyaraju_karnataka',
    relatedHeritageIds: ['syn_odiyaraju_karnataka', 'comm_dir_04_kalingarajulu', 'comm_dir_16_oddaru'],
    relatedProminentLabelIds: ['branch_odiyaraju', 'branch_vadiyarajulu'],
    relatedTopicsAndKeywords: ['Odiyaraju', 'Odiyarajulu', 'Karnataka', 'Mysore', 'Odra Rulers'],
  },
  {
    order: 23,
    id: 'ref70_23_vadiyarajulu',
    canonicalTerm: 'Vadiyarajulu',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Vadiyarajulu', 'वडियाराजुलु (Vadiyarajulu)', 'వడియరాజులు (Vadiyarajulu)', 'ವಡಿಯರಾಜುಲು (Vadiyarajulu)', 'வடியராஜுலு (Vadiyarajulu)', 'वडियाराजुलु', 'ବଡ଼ିଆରାଜୁଲୁ', 'বড়িয়ারাজুলু'),
    multilingualSearchAliases: ['Vadiyarajulu', 'Vadiya Rajulu', 'Odiyarajulu', 'వడియరాజులు', 'ವಡಿಯರಾಜುಲು', 'वडियाराजुलु'],
    historicalContextNote: makeLangMap(
      'Phonetic labialized regional variant (Odiyarajulu -> Vadiyarajulu) preserved in Telugu and Kannada borderland lineages.',
      'तेलुगु और कन्नड़ सीमावर्ती वंशों में संरक्षित ओडियाराजुलु का क्षेत्रीय ध्वन्यात्मक रूप (वडियाराजुलु)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odiyaraju_karnataka',
    relatedHeritageIds: ['syn_odiyaraju_karnataka', 'comm_dir_12_vaddirajulu', 'comm_dir_13_vadderarajulu'],
    relatedProminentLabelIds: ['branch_vadiyarajulu', 'branch_odiyaraju', 'vaddi_rajulu'],
    relatedTopicsAndKeywords: ['Vadiyarajulu', 'Odiyarajulu', 'Odiyaraju'],
  },
  {
    order: 24,
    id: 'ref70_24_paikas',
    canonicalTerm: 'paikas',
    datasetGroup: 'original_45',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('paikas', 'पाइक (Paikas)', 'పైకాలు (Paikas)', 'ಪೈಕಾಗಳು (Paikas)', 'பைக்காக்கள் (Paikas)', 'पाइक', 'ପାଇକ (Paikas)', 'পাইক (Paikas)'),
    multilingualSearchAliases: ['paikas', 'Paika', 'Od-Paika', 'Padatika', 'ପାଇକ', 'पाइक', 'పైకాలు', 'ಪೈಕಾಗಳು', 'পাইক'],
    historicalContextNote: makeLangMap(
      'Historic landed peasant-militia and infantry warrior institution (from Sanskrit Padatika) of Odisha/Kalinga, renowned for the 1817 Paika Bidroha.',
      'ओडिशा/कलिंग की ऐतिहासिक पैदल सेना और योद्धा संस्था (संस्कृत पदातिक से), जो 1817 के पाइक विद्रोह के लिए प्रसिद्ध है।',
      'ఒడిశా/కళింగ ప్రాంతపు చారిత్రక పదాతిదళ యోధుల వ్యవస్థ (పైకా), 1817 పైకా తిరుగుబాటుకు ప్రసిద్ధి చెందింది.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_07_od_paika',
    relatedHeritageIds: ['comm_dir_07_od_paika', 'comm_dir_05_od_khandayath', 'prof_cat_1_warriors'],
    relatedProminentLabelIds: ['branch_paikas', 'branch_od_khandayaths'],
    relatedTopicsAndKeywords: ['Paikas', 'Od-Paika', 'Paika Bidroha', 'Buxi Jagabandhu', 'Kalinga Militia'],
  },
  {
    order: 25,
    id: 'ref70_25_od_khandayaths',
    canonicalTerm: 'Od-Khandayaths',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Od-Khandayaths',
      'ओड-खंडायत (Od-Khandayaths)',
      'ఓడ్-ఖండాయత్ (Od-Khandayaths)',
      'ಓಡ್-ಖಂಡಾಯತ್ (Od-Khandayaths)',
      'ஓட்-கண்டாயத் (Od-Khandayaths)',
      'ओड-खंडायत',
      'ଓଡ଼-ଖଣ୍ଡାୟତ',
      'ওড়-খণ্ডায়ত'
    ),
    multilingualSearchAliases: ['Od-Khandayaths', 'Od-Khandayath', 'Khandayat', 'Khandayata', 'ଓଡ଼-ଖଣ୍ଡାୟତ', 'ଖଣ୍ଡାୟତ', 'ओड-खंडायत', 'ఓడ్-ఖండాయత్'],
    historicalContextNote: makeLangMap(
      'Martial sword-wielding (Khanda) landholding warrior community of Odisha historically derived from Odra/Chasa-Paika military lineages.',
      'ओडिशा का तलवारधारी (खंडा) सामरिक और जमींदार योद्धा समुदाय जो ऐतिहासिक रूप से ओड्र/चासा-पाइक सैन्य वंशों से जुड़ा है।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_05_od_khandayath',
    relatedHeritageIds: ['comm_dir_05_od_khandayath', 'comm_dir_03_odra_kshatriya', 'comm_dir_07_od_paika', 'prof_cat_1_warriors'],
    relatedProminentLabelIds: ['branch_od_khandayaths', 'branch_paikas', 'branch_od_kshatriya'],
    relatedTopicsAndKeywords: ['Od-Khandayaths', 'Od-Khandayath', 'Khandayat', 'Odisha Martial Heritage'],
  },
  {
    order: 26,
    id: 'ref70_26_oddanayakkar',
    canonicalTerm: 'OddaNayakkar',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'OddaNayakkar',
      'ओड्डा नायक्कर (OddaNayakkar)',
      'ఒడ్డ నాయక్కర్ (OddaNayakkar)',
      'ಒಡ್ಡ ನಾಯಕ್ಕರ್ (OddaNayakkar)',
      'ஒட்ட நாயக்கர் (OddaNayakkar)',
      'ओड्डा नायक्कर',
      'ଓଡ଼ ନାୟକର',
      'ওড্ডা নায়াক্কর'
    ),
    multilingualSearchAliases: ['OddaNayakkar', 'Odda Nayakkar', 'OttaNayakkar', 'ஒட்ட நாயக்கர்', 'ఒడ్డ నాయక్కర్', 'ओड्डा नायक्कर', 'ಒಡ್ಡ ನಾಯಕ್ಕರ್'],
    historicalContextNote: makeLangMap(
      'Tamil Nadu and southern borderland honorific community identity combining Odda/Otta with the Nayakkar chieftain/military commander title.',
      'तमिलनाडु और दक्षिणी सीमावर्ती क्षेत्रों में ओड्डा/ओट्टा को नायक्कर (सैन्य कमांडर/प्रमुख) उपाधि के साथ जोड़ने वाली सम्मानसूचक पहचान।',
      'తమిళనాడు మరియు దక్షిణ సరిహద్దు ప్రాంతాలలో ఒడ్డ/ఒట్ట మరియు నాయక్కర్ బిరుదుతో ఏర్పడిన గౌరవ నామం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odda_nayakkar_tn',
    relatedHeritageIds: ['syn_odda_nayakkar_tn', 'syn_ottar', 'comm_dir_08_odan'],
    relatedProminentLabelIds: ['branch_oddanayakkar', 'branch_ottar', 'branch_oddar'],
    relatedTopicsAndKeywords: ['OddaNayakkar', 'OttaNayakkar', 'Tamil Nadu', 'Nayakkar', 'Madurai Nayak'],
  },
  {
    order: 27,
    id: 'ref70_27_od_kshatriya',
    canonicalTerm: 'Od-Kshatriya',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Od-Kshatriya',
      'ओड-क्षत्रिय (Od-Kshatriya)',
      'ఓడ్-క్షత్రియ (Od-Kshatriya)',
      'ಓಡ್-ಕ್ಷತ್ರಿಯ (Od-Kshatriya)',
      'ஓட்-க்ஷத்ரிய (Od-Kshatriya)',
      'ओड-क्षत्रिय',
      'ଓଡ଼-କ୍ଷତ୍ରିୟ',
      'ওড়-ক্ষত্রিয়'
    ),
    multilingualSearchAliases: ['Od-Kshatriya', 'Od Kshatriya', 'Odra-Kshatriya', 'ओड-क्षत्रिय', 'ఓడ్-క్షత్రియ', 'ಓಡ್-ಕ್ಷತ್ರಿಯ', 'ଓଡ଼-କ୍ଷତ୍ରିୟ'],
    historicalContextNote: makeLangMap(
      'Pan-regional Kshatriya designation linking North/West Indian Od-Rajputh and Eastern/Southern Odra-Kshatriya martial traditions.',
      'उत्तर/पश्चिम भारतीय ओड-राजपूत और पूर्वी/दक्षिणी ओड्र-क्षत्रिय सामरिक परंपराओं को जोड़ने वाला अखिल क्षेत्रीय क्षत्रिय पदनाम।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_od_kshatriya',
    relatedHeritageIds: ['syn_od_kshatriya', 'comm_dir_03_odra_kshatriya', 'comm_dir_02_od_rajputh'],
    relatedProminentLabelIds: ['branch_od_kshatriya', 'od_rajputh', 'branch_odra'],
    relatedTopicsAndKeywords: ['Od-Kshatriya', 'Odra-Kshatriya', 'Od-Rajputh'],
  },
  {
    order: 28,
    id: 'ref70_28_gajapathis',
    canonicalTerm: 'Gajapathis',
    datasetGroup: 'original_45',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Gajapathis',
      'गजपति (Gajapathis)',
      'గజపతులు (Gajapathis)',
      'ಗಜಪತಿಗಳು (Gajapathis)',
      'கஜபதிகள் (Gajapathis)',
      'गजपती',
      'ଗଜପତି (Gajapathis)',
      'গজপতি (Gajapathis)'
    ),
    multilingualSearchAliases: ['Gajapathis', 'Gajapati', 'Gajapathulu', 'Suryavamshi Gajapati', 'గజపతులు', 'गजपति', 'ಗಜಪತಿಗಳು', 'ଗଜପତି', 'গজপতি'],
    historicalContextNote: makeLangMap(
      'Imperial sovereign title ("Lord of Elephants") of the monarchs of Odra/Utkala/Kalinga, reaching its zenith under Emperor Kapilendra Deva (1434–1466 CE).',
      'ओड्र/उत्कल/कलिंग के सम्राटों की शाही उपाधि ("गजपति"), जो सम्राट कपिलेंद्र देव (1434–1466 ई.) के अधीन अपने चरम पर पहुंची।',
      'ఓడ్ర/ఉత్కళ/కళింగ చక్రవర్తుల రాజ బిరుదు (గజపతులు), కపిలేంద్ర దేవుని కాలంలో స్వర్ణయుగాన్ని చేరుకుంది.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_14_gajapathulu',
    relatedHeritageIds: ['comm_dir_14_gajapathulu', 'syn_vadde_gajapathirajulu', 'prof_cat_8_royal_dynasties'],
    relatedProminentLabelIds: ['branch_gajapathis', 'branch_gajapathi_rauthrai', 'suryavamshi_communities'],
    relatedTopicsAndKeywords: ['Gajapathis', 'Gajapathulu', 'Kapilendra Deva', 'Purushottama Deva', 'Prataparudra Deva'],
  },
  {
    order: 29,
    id: 'ref70_29_odra',
    canonicalTerm: 'Odra',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Odra', 'ओड्र (Odra)', 'ఓడ్ర (Odra)', 'ಓಡ್ರ (Odra)', 'ஒட்ர (Odra)', 'ओड्र', 'ଓଡ୍ର (Odra)', 'ওড্র (Odra)'),
    multilingualSearchAliases: ['Odra', 'Odra-desa', 'Odra Vishaya', 'ओड्र', 'ఓడ్ర', 'ಓಡ್ರ', 'ஒட்ர', 'ଓଡ୍ର', 'ওড্র'],
    historicalContextNote: makeLangMap(
      'Ancient Sanskritic and epigraphic ethnonym and territorial name (Odra / Odra-vishaya / Odra-desa) attested in the Mahabharata, Natyashastra, and early medieval copper-plate charters.',
      'महाभारत, नाट्यशास्त्र और प्रारंभिक मध्यकालीन ताम्रपत्रों में प्रमाणित प्राचीन संस्कृत और शिलालेखीय जातीय और क्षेत्रीय नाम (ओड्र / ओड्र-विषय / ओड्र-देश)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_od_oad_odra',
    relatedHeritageIds: ['syn_od_oad_odra', 'comm_dir_03_odra_kshatriya', 'comm_dir_16_oddaru'],
    relatedProminentLabelIds: ['branch_odra', 'oddaru_odra_communities', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Odra', 'Odra-desa', 'Utkala', 'Kalinga', 'Trikalinga'],
  },
  {
    order: 30,
    id: 'ref70_30_kalinga',
    canonicalTerm: 'Kalinga',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Kalinga', 'कलिंग (Kalinga)', 'కళింగ (Kalinga)', 'ಕಳಿಂಗ (Kalinga)', 'கலிங்கம் (Kalinga)', 'कलिंग', 'କଳିଙ୍ଗ (Kalinga)', 'কলিঙ্গ (Kalinga)'),
    multilingualSearchAliases: ['Kalinga', 'KalingaRajulu', 'Kalingadhipati', 'कलिंग', 'కళింగ', 'ಕಳಿಂಗ', 'கலிங்கம்', 'କଳିଙ୍ଗ', 'কলিঙ্গ'],
    historicalContextNote: makeLangMap(
      'Historic imperial territory spanning coastal Odisha and northern Andhra Pradesh, celebrated in Ashokan edicts, Hathigumpha inscription of Kharavela, and Kalinga-Gajapati charters.',
      'तटीय ओडिशा और उत्तरी आंध्र प्रदेश में फैला ऐतिहासिक साम्राज्य क्षेत्र, जो अशोक के शिलालेखों, खारवेल के हाथीगुम्फा शिलालेख और कलिंग-गजपति चार्टर में प्रसिद्ध है।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_14_gajapathulu', 'prof_cat_8_royal_dynasties'],
    relatedProminentLabelIds: ['branch_kalinga', 'branch_utkala', 'branch_trikalinga'],
    relatedTopicsAndKeywords: ['Kalinga', 'KalingaRajulu', 'Kharavela', 'Trikalinga'],
  },
  {
    order: 31,
    id: 'ref70_31_utkala',
    canonicalTerm: 'Utkala',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Utkala', 'उत्कल (Utkala)', 'ఉత్కళ (Utkala)', 'ಉತ್ಕಲ (Utkala)', 'உத்கலம் (Utkala)', 'उत्कल', 'ଉତ୍କଳ (Utkala)', 'উৎকল (Utkala)'),
    multilingualSearchAliases: ['Utkala', 'Utkal', 'उत्कल', 'ఉత్కళ', 'ಉತ್ಕಲ', 'உத்கலம்', 'ଉତ୍କଳ', 'উৎকল'],
    historicalContextNote: makeLangMap(
      'Ancient cultural and political realm of northern/coastal Odisha closely integrated with Odra and Kalinga in Somavamshi, Imperial Ganga, and Suryavamshi Gajapati statecraft.',
      'उत्तरी/तटीय ओडिशा का प्राचीन सांस्कृतिक और राजनीतिक क्षेत्र जो सोमवंशी, गंग और सूर्यवंशी गजपति शासन में ओड्र और कलिंग के साथ घनिष्ठ रूप से जुड़ा रहा।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_03_odra_kshatriya',
    relatedHeritageIds: ['comm_dir_03_odra_kshatriya', 'comm_dir_04_kalingarajulu', 'comm_dir_14_gajapathulu'],
    relatedProminentLabelIds: ['branch_utkala', 'branch_odra', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Utkala', 'Odra', 'Kalinga', 'Odisha'],
  },
  {
    order: 32,
    id: 'ref70_32_trikalinga',
    canonicalTerm: 'Trikalinga',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Trikalinga', 'त्रिकलिंग (Trikalinga)', 'త్రికళింగ (Trikalinga)', 'ತ್ರಿಕಳಿಂಗ (Trikalinga)', 'திரிகலிங்கம் (Trikalinga)', 'त्रिकलिंग', 'ତ୍ରିକଳିଙ୍ଗ (Trikalinga)', 'ত্রিকলিঙ্গ (Trikalinga)'),
    multilingualSearchAliases: ['Trikalinga', 'Trikalingadhipati', 'त्रिकलिंग', 'త్రికళింగ', 'ತ್ರಿಕಳಿಂಗ', 'திரிகலிங்கம்', 'ତ୍ରିକଳିଙ୍ଗ', 'ত্রিকলিঙ্গ'],
    historicalContextNote: makeLangMap(
      'Epigraphic imperial sovereignty realm ("Three Kalingas": Kalinga, Utkala, and Odra/Kongoda/Kosala) embodied in the royal title Trikalingadhipati.',
      'शाही उपाधि "त्रिकलिंगाधिपति" में निहित शिलालेखीय साम्राज्य क्षेत्र (कलिंग, उत्कल और ओड्र/कोंगोद/कोसल)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_14_gajapathulu', 'prof_cat_8_royal_dynasties'],
    relatedProminentLabelIds: ['branch_trikalinga', 'branch_kalinga', 'branch_utkala'],
    relatedTopicsAndKeywords: ['Trikalinga', 'Trikalingadhipati', 'Kalinga', 'Utkala', 'Odra'],
  },
  {
    order: 33,
    id: 'ref70_33_oda_chasa',
    canonicalTerm: 'Oda-Chasa',
    datasetGroup: 'original_45',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Oda-Chasa', 'ओड-चासा (Oda-Chasa)', 'ఓడ-చాసా (Oda-Chasa)', 'ಓಡ-ಚಾಸಾ (Oda-Chasa)', 'ஒட-சாசா (Oda-Chasa)', 'ओड-चासा', 'ଓଡ଼-ଚାଷା (Oda-Chasa)', 'ওড়-চাষা (Oda-Chasa)'),
    multilingualSearchAliases: ['Oda-Chasa', 'Oda-Chassa', 'Odia Chasa', 'Od-Chasa', 'ଓଡ଼-ଚାଷା', 'ओड-चासा', 'ఓడ-చాసా', 'ಓಡ-ಚಾಸಾ'],
    historicalContextNote: makeLangMap(
      'Landholding agrarian and peasant-militia branch of the Odra community in Odisha, historically supplying soldiers to the Paika/Khandayat forces during wartime and cultivating land in peacetime.',
      'ओडिशा में ओड्र समुदाय की भूमिधर कृषि और किसान-योद्धा शाखा, जो युद्ध के समय पाइक/खंडायत सेनाओं को सैनिक प्रदान करती थी और शांतिकाल में कृषि करती थी।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_06_oda_chassa',
    relatedHeritageIds: ['comm_dir_06_oda_chassa', 'comm_dir_05_od_khandayath', 'comm_dir_07_od_paika', 'prof_cat_2_agriculture'],
    relatedProminentLabelIds: ['branch_oda_chasa', 'branch_od_khandayaths', 'branch_paikas'],
    relatedTopicsAndKeywords: ['Oda-Chasa', 'Oda-Chassa', 'Agrarian Heritage', 'Odisha'],
  },
  {
    order: 34,
    id: 'ref70_34_od',
    canonicalTerm: 'Od',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Od', 'ओड (Od)', 'ఓడ్ (Od)', 'ಓಡ್ (Od)', 'ஓட் (Od)', 'ओड', 'ଓଡ଼ (Od)', 'ওড় (Od)'),
    multilingualSearchAliases: ['Od', 'Oad', 'ओड', 'ఓడ్', 'ಓಡ್', 'ஓட்', 'ଓଡ଼', 'ওড়'],
    historicalContextNote: makeLangMap(
      'Primary community ethnonym preserved across Northern, Western, Central, and Eastern India.',
      'उत्तरी, पश्चिमी, मध्य और पूर्वी भारत में संरक्षित प्राथमिक समुदाय नाम (ओड)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_01_od',
    relatedHeritageIds: ['comm_dir_01_od', 'syn_od_oad_odra', 'comm_dir_02_od_rajputh'],
    relatedProminentLabelIds: ['branch_od', 'od_community', 'branch_oad'],
    relatedTopicsAndKeywords: ['Od', 'Oad', 'Odra', 'Od-Rajputh'],
  },
  {
    order: 35,
    id: 'ref70_35_oad',
    canonicalTerm: 'Oad',
    datasetGroup: 'original_45',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Oad', 'ओद / ओड (Oad)', 'ఓద్ / ఓడ్ (Oad)', 'ಓದ್ / ಓಡ್ (Oad)', 'ஓத் / ஓட் (Oad)', 'ओद / ओड', 'ଓଡ଼ (Oad)', 'ওড় (Oad)'),
    multilingualSearchAliases: ['Oad', 'Od', 'Oad Rajput', 'ओद', 'ओड', 'ఓద్', 'ಓದ್'],
    historicalContextNote: makeLangMap(
      'Standard Romanized spelling of Od widely used in Rajasthan, Haryana, Punjab, Sindh, Gujarat, and Delhi official records.',
      'राजस्थान, हरियाणा, पंजाब, गुजरात और दिल्ली के आधिकारिक अभिलेखों में व्यापक रूप से प्रयुक्त ओड की मानक रोमन वर्तनी (Oad)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_od_oad_odra',
    relatedHeritageIds: ['syn_od_oad_odra', 'comm_dir_01_od', 'syn_oad_rajputh'],
    relatedProminentLabelIds: ['branch_oad', 'branch_od', 'branch_oad_rajputh'],
    relatedTopicsAndKeywords: ['Oad', 'Od', 'Oad-Rajputh'],
  },
  {
    order: 36,
    id: 'ref70_36_oad_rajputh',
    canonicalTerm: 'Oad-Rajputh',
    datasetGroup: 'original_45',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Oad-Rajputh', 'ओद-राजपूत (Oad-Rajputh)', 'ఓద్-రాజ్‌పుత్ (Oad-Rajputh)', 'ಓದ್-ರಜಪೂತ್ (Oad-Rajputh)', 'ஓத்-ராஜ்புத் (Oad-Rajputh)', 'ओद-राजपूत', 'ଓଡ଼-ରାଜପୁତ', 'ওড়-রাজপুত'),
    multilingualSearchAliases: ['Oad-Rajputh', 'Oad Rajput', 'Od-Rajputh', 'ओद-राजपूत', 'ओड-राजपूत', 'ఓద్-రాజ్‌పుత్'],
    historicalContextNote: makeLangMap(
      'Orthographic variant of Od-Rajputh commonly used across Northwestern India.',
      'उत्तर-पश्चिमी भारत में प्रयुक्त ओड-राजपूत का वैकल्पिक वर्तनी रूप (Oad-Rajputh)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_oad_rajputh',
    relatedHeritageIds: ['syn_oad_rajputh', 'comm_dir_02_od_rajputh'],
    relatedProminentLabelIds: ['branch_oad_rajputh', 'od_rajputh', 'branch_oad'],
    relatedTopicsAndKeywords: ['Oad-Rajputh', 'Od-Rajputh', 'Oad'],
  },
  {
    order: 37,
    id: 'ref70_37_odde',
    canonicalTerm: 'Odde',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Odde', 'ओड्डे (Odde)', 'ఒడ్డె (Odde)', 'ಒಡ್ಡೆ (Odde)', 'ஒட்டெ (Odde)', 'ओड्डे', 'ଓଡ଼େ (Odde)', 'ওড্ডে (Odde)'),
    multilingualSearchAliases: ['Odde', 'Vadde', 'ఒడ్డె', 'ओड्डे', 'ಒಡ್ಡೆ', 'ஒட்டெ', 'ଓଡ଼େ'],
    historicalContextNote: makeLangMap(
      'Direct Dravidian/Telugu/Kannada phonological adaptation of Sanskrit/Prakrit Odra -> Odda -> Odde, attested in medieval South Indian inscriptions.',
      'मध्यकालीन दक्षिण भारतीय शिलालेखों में प्रमाणित संस्कृत/प्राकृत ओड्र -> ओड्डा -> ओड्डे का प्रत्यक्ष द्रविड़/तेलुगु/कन्नड़ रूप।',
      'మధ్యయుగ దక్షిణ భారత శాసనాలలో నమోదైన ఓడ్ర -> ఒడ్డ -> ఒడ్డె అనే చారిత్రక రూపం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odde_vadde',
    relatedHeritageIds: ['syn_odde_vadde', 'comm_dir_10_vaddera', 'syn_odderajulu'],
    relatedProminentLabelIds: ['branch_odde', 'branch_vadde', 'branch_odderajulu'],
    relatedTopicsAndKeywords: ['Odde', 'Vadde', 'OddeRajulu', 'OddeDora'],
  },
  {
    order: 38,
    id: 'ref70_38_vadde',
    canonicalTerm: 'vadde',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('vadde', 'वड्डे (Vadde)', 'వడ్డె (Vadde)', 'ವಡ್ಡೆ (Vadde)', 'வடெ (Vadde)', 'वड्डे', 'ବଡ଼େ (Vadde)', 'ভাদে (Vadde)'),
    multilingualSearchAliases: ['vadde', 'Vadde', 'Odde', 'వడ్డె', 'वड्डे', 'ವಡ್ಡೆ', 'வடெ', 'ବଡ଼େ'],
    historicalContextNote: makeLangMap(
      'Labialized Telugu/Kannada form of Odde (initial O- shifting to Va-), forming the root of Vaddera, Vaddelu, and VaddeRajulu.',
      'ओड्डे का तेलुगु/कन्नड़ रूप (प्रारंभिक ओ- का व- में परिवर्तन), जो वड्डेरा, वड्डेलु और वड्डेराजुलु का मूल है।',
      'ఒడ్డె అనే పదానికి తెలుగు/కన్నడ రూపాంతరమైన వడ్డె (వడ్డెర, వడ్డెలు, వడ్డెరాజులు పదాలకు మూలం).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odde_vadde',
    relatedHeritageIds: ['syn_odde_vadde', 'comm_dir_10_vaddera', 'comm_dir_11_vaddeelu'],
    relatedProminentLabelIds: ['branch_vadde', 'branch_odde', 'branch_vaddera'],
    relatedTopicsAndKeywords: ['Vadde', 'Odde', 'Vaddera', 'Vaddelu'],
  },
  {
    order: 39,
    id: 'ref70_39_vaddera',
    canonicalTerm: 'Vaddera',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Vaddera', 'वड्डेरा (Vaddera)', 'వడ్డెర (Vaddera)', 'ವಡ್ಡರ (Vaddera)', 'வடெர (Vaddera)', 'वड्डेरा', 'ବଡ଼େରା (Vaddera)', 'ভাদেরা (Vaddera)'),
    multilingualSearchAliases: ['Vaddera', 'Vadde', 'Waddera', 'వడ్డెర', 'वड्डेरा', 'ವಡ್ಡರ', 'வடெர', 'ବଡ଼େରା'],
    historicalContextNote: makeLangMap(
      'Principal modern community name in Andhra Pradesh and Telangana, historically documented as fort builders, reservoir/tank engineers, stone sculptors, and martial defenders.',
      'आंध्र प्रदेश और तेलंगाना में प्रमुख आधुनिक समुदाय नाम, जो ऐतिहासिक रूप से किला निर्माताओं, जलाशय अभियंताओं, मूर्तिकारों और सामरिक रक्षकों के रूप में प्रलेखित है।',
      'ఆంధ్రప్రదేశ్ మరియు తెలంగాణలో ప్రధాన కమ్యూనిటీ పేరు; కోటల నిర్మాణం, చెరువుల తవ్వకం, శిల్పకళ మరియు సైనిక రక్షణ రంగాలలో చారిత్రక వారసత్వం కలిగినది.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_10_vaddera',
    relatedHeritageIds: ['comm_dir_10_vaddera', 'comm_dir_11_vaddeelu', 'comm_dir_13_vadderarajulu', 'syn_odde_vadde'],
    relatedProminentLabelIds: ['branch_vaddera', 'vaddera_rajulu', 'vaddelu', 'branch_vadde'],
    relatedTopicsAndKeywords: ['Vaddera', 'Vaddera Rajulu', 'Vaddelu', 'Andhra Pradesh', 'Telangana'],
  },
  {
    order: 40,
    id: 'ref70_40_oddar',
    canonicalTerm: 'Oddar',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Oddar', 'ओड्डर (Oddar)', 'ఒడ్డర్ (Oddar)', 'ಒಡ್ಡರ್ (Oddar)', 'ஒட்டர் (Oddar)', 'ओड्डर', 'ଓଡ଼ର (Oddar)', 'ওড্ডর (Oddar)'),
    multilingualSearchAliases: ['Oddar', 'Oddaru', 'Voddar', 'ఒడ్డర్', 'ओड्डर', 'ಒಡ್ಡರ್', 'ஒட்டர்', 'ଓଡ଼ର'],
    historicalContextNote: makeLangMap(
      'Widely documented South Indian community designation across Karnataka, Tamil Nadu, and Kerala.',
      'कर्नाटक, तमिलनाडु और केरल में व्यापक रूप से प्रलेखित दक्षिण भारतीय समुदाय पदनाम (ओड्डर)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_oddar',
    relatedHeritageIds: ['syn_oddar', 'comm_dir_16_oddaru', 'comm_dir_15_voddar'],
    relatedProminentLabelIds: ['branch_oddar', 'oddaru_odra_communities', 'branch_ottar'],
    relatedTopicsAndKeywords: ['Oddar', 'Oddaru', 'Voddar', 'Ottar'],
  },
  {
    order: 41,
    id: 'ref70_41_odar',
    canonicalTerm: 'Odar',
    datasetGroup: 'original_45',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Odar', 'ओडर (Odar)', 'ఓడర్ (Odar)', 'ಓಡರ್ (Odar)', 'ஓடர் (Odar)', 'ओडर', 'ଓଡ଼ର (Odar)', 'ওড়র (Odar)'),
    multilingualSearchAliases: ['Odar', 'Oddar', 'ओडर', 'ఓడర్', 'ಓಡರ್', 'ஓடர்'],
    historicalContextNote: makeLangMap(
      'Single-consonant orthographic variant of Oddar recorded in historical census tables and regional records.',
      'ऐतिहासिक जनगणना तालिकाओं और क्षेत्रीय अभिलेखों में दर्ज ओड्डर का वैकल्पिक वर्तनी रूप (Odar)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_oddar',
    relatedHeritageIds: ['syn_oddar', 'comm_dir_08_odan'],
    relatedProminentLabelIds: ['branch_odar', 'branch_oddar'],
    relatedTopicsAndKeywords: ['Odar', 'Oddar', 'Odan'],
  },
  {
    order: 42,
    id: 'ref70_42_vaddar',
    canonicalTerm: 'Vaddar',
    datasetGroup: 'original_45',
    classification: 'Community names',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Vaddar', 'वड्डर (Vaddar)', 'వడ్డర్ (Vaddar)', 'ವಡ್ಡರ್ (Vaddar)', 'வட்டர் (Vaddar)', 'वड्डर', 'ବଡ଼ର (Vaddar)', 'ভাদর (Vaddar)'),
    multilingualSearchAliases: ['Vaddar', 'Waddar', 'Voddar', 'ವಡ್ಡರ್', 'वड्डर', 'వడ్డర్', 'வட்டர்'],
    historicalContextNote: makeLangMap(
      'Standard community designation in Northern Karnataka, Maharashtra, and Goa.',
      'उत्तरी कर्नाटक, महाराष्ट्र और गोवा में मानक समुदाय पदनाम (वड्डर)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_waddar_vaddar',
    relatedHeritageIds: ['syn_waddar_vaddar', 'comm_dir_15_voddar', 'comm_dir_16_oddaru'],
    relatedProminentLabelIds: ['branch_vaddar', 'branch_waddar', 'branch_wadar'],
    relatedTopicsAndKeywords: ['Vaddar', 'Waddar', 'Wadar', 'Karnataka', 'Maharashtra'],
  },
  {
    order: 43,
    id: 'ref70_43_waddar',
    canonicalTerm: 'Waddar',
    datasetGroup: 'original_45',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Waddar', 'वड्डर (Waddar)', 'వడ్డర్ (Waddar)', 'ವಡ್ಡರ್ (Waddar)', 'வட்டர் (Waddar)', 'वड्डर', 'ବଡ଼ର (Waddar)', 'ওয়াদ্দার (Waddar)'),
    multilingualSearchAliases: ['Waddar', 'Vaddar', 'Wadar', 'Woddar', 'वड्डर', 'ವಡ್ಡರ್', 'వడ్డర్'],
    historicalContextNote: makeLangMap(
      'Bombay Presidency and Deccan gazetteer spelling (using "W" for labial-dental "V") corresponding to Vaddar.',
      'बॉम्बे प्रेसीडेंसी और दक्कन गजेटियर में वड्डर के लिए प्रयुक्त वर्तनी (Waddar)।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_waddar_vaddar',
    relatedHeritageIds: ['syn_waddar_vaddar', 'comm_dir_15_voddar'],
    relatedProminentLabelIds: ['branch_waddar', 'branch_vaddar', 'branch_wadar'],
    relatedTopicsAndKeywords: ['Waddar', 'Vaddar', 'Wadar', 'Deccan'],
  },
  {
    order: 44,
    id: 'ref70_44_wadar',
    canonicalTerm: 'Wadar',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Wadar', 'वडार (Wadar)', 'వడార్ (Wadar)', 'ವಡಾರ್ (Wadar)', 'வடார் (Wadar)', 'वडार (Wadar)', 'ୱାଡ଼ାର (Wadar)', 'ওয়াদার (Wadar)'),
    multilingualSearchAliases: ['Wadar', 'Vadar', 'Waddar', 'वडार', 'వడార్', 'ವಡಾರ್'],
    historicalContextNote: makeLangMap(
      'Primary Marathi regional identity (वडार / Wadar) in Maharashtra (Solapur, Kolhapur, Sangli, Pune, Marathwada, and Vidarbha).',
      'महाराष्ट्र (सोलापुर, कोल्हापुर, सांगली, पुणे, मराठवाड़ा और विदर्भ) में प्रमुख मराठी क्षेत्रीय पहचान (वडार / Wadar)।',
      'మహారాష్ట్రలో (సోలాపూర్, కొల్హాపూర్, సాంగ్లీ, పూణే) ప్రధాన మరాఠీ ప్రాంతీయ గుర్తింపు (వడార్ / Wadar).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_waddar_vaddar',
    relatedHeritageIds: ['syn_waddar_vaddar', 'comm_dir_15_voddar'],
    relatedProminentLabelIds: ['branch_wadar', 'branch_waddar', 'branch_vaddar'],
    relatedTopicsAndKeywords: ['Wadar', 'Waddar', 'Vaddar', 'Maharashtra', 'Marathi'],
  },
  {
    order: 45,
    id: 'ref70_45_ottar',
    canonicalTerm: 'Ottar',
    datasetGroup: 'original_45',
    classification: 'Regional identities',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Ottar', 'ओट्टर (Ottar)', 'ఒట్టర్ (Ottar)', 'ಒಟ್ಟರ್ (Ottar)', 'ஒட்டர் (Ottar)', 'ओट्टर', 'ଓଟ୍ଟର (Ottar)', 'ওট্টর (Ottar)'),
    multilingualSearchAliases: ['Ottar', 'Oddar', 'Odan', 'ஒட்டர்', 'ఒట్టర్', 'ओट्टर', 'ಒಟ್ಟರ್'],
    historicalContextNote: makeLangMap(
      'Classical Tamil orthographic form (ஒட்டர் / Ottar, as Tamil script represents voiced retroflex "dd" via geminated "tt") attested in Chola/Pandya/Nayak inscriptions and Tamil literature.',
      'चोल/पांड्य/नायक शिलालेखों और तमिल साहित्य में प्रमाणित शास्त्रीय तमिल रूप (ஒட்டர் / Ottar)।',
      'చోళ/పాండ్య/నాయక శాసనాలలో మరియు తమిళ సాహిత్యంలో నమోదైన తమిళ రూపం (ஒட்டர் / Ottar).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_ottar',
    relatedHeritageIds: ['syn_ottar', 'syn_odda_nayakkar_tn', 'comm_dir_08_odan'],
    relatedProminentLabelIds: ['branch_ottar', 'branch_oddanayakkar', 'branch_oddar'],
    relatedTopicsAndKeywords: ['Ottar', 'OddaNayakkar', 'OttaNayakkar', 'Odan', 'Tamil Nadu'],
  },

  // ============================================================================
  // PART B: 25 SUPPLEMENTARY REFERENCE TERMS (46 TO 70)
  // ============================================================================
  {
    order: 46,
    id: 'ref70_46_voddar',
    canonicalTerm: 'Voddar',
    datasetGroup: 'supplementary_25',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Voddar', 'वोड्डर (Voddar)', 'వొడ్డర్ (Voddar)', 'ವೊಡ್ಡರ್ (Voddar)', 'வொட்டர் (Voddar)', 'वोड्डर', 'ଭୋଡ଼ର (Voddar)', 'ভোড্ডর (Voddar)'),
    multilingualSearchAliases: ['Voddar', 'Woddar', 'Oddar', 'Vaddar', 'ವೊಡ್ಡರ್', 'వొడ్డర్', 'वोड्डर', 'வொட்டர்'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #1 (of 25): Documented Anglo-Indian and Mysore/Madras census spelling reflecting the rounded initial vowel pronunciation of Oddar/Vaddar in Kannada and Telugu border districts.',
      'पूरक संदर्भ #1 (25 में से): कन्नड़ और तेलुगु सीमावर्ती जिलों में ओड्डर/वड्डर के उच्चारण को दर्शाने वाली मैसूर/मद्रास जनगणना वर्तनी (Voddar)।',
      'అనుబంధ రిఫరెన్స్ #1: కన్నడ మరియు తెలుగు సరిహద్దు జిల్లాలలో ఒడ్డర్/వడ్డర్ ఉచ్చారణను సూచించే మైసూర్/మద్రాస్ జనాభా లెక్కల స్పెల్లింగ్ (Voddar).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_15_voddar',
    relatedHeritageIds: ['comm_dir_15_voddar', 'comm_dir_16_oddaru', 'syn_waddar_vaddar', 'syn_oddar'],
    relatedProminentLabelIds: ['branch_vaddar', 'branch_oddar', 'oddaru_odra_communities'],
    relatedTopicsAndKeywords: ['Voddar', 'Woddar', 'Oddar', 'Vaddar', 'Oddaru'],
  },
  {
    order: 47,
    id: 'ref70_47_woddar',
    canonicalTerm: 'Woddar',
    datasetGroup: 'supplementary_25',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Woddar', 'वोड्डर (Woddar)', 'వొడ్డర్ (Woddar)', 'ವೊಡ್ಡರ್ (Woddar)', 'வொட்டர் (Woddar)', 'वोड्डर', 'ୱୋଡ଼ର (Woddar)', 'ওড্ডার (Woddar)'),
    multilingualSearchAliases: ['Woddar', 'Voddar', 'Waddar', 'Vaddar', 'ವೊಡ್ಡರ್', 'वोड्डर', 'వొడ్డర్'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #2 (of 25): Colonial Bombay/Hyderabad Deccan gazetteer orthography (using initial "W") corresponding directly to Voddar / Waddar.',
      'पूरक संदर्भ #2 (25 में से): औपनिवेशिक बॉम्बे/हैदराबाद दक्कन गजेटियर वर्तनी (Woddar), जो वोड्डर / वड्डर के समान है।',
      'అనుబంధ రిఫరెన్స్ #2: బొంబాయి/హైదరాబాద్ దక్కన్ గెజిటీర్లలో వొడ్డర్ / వడ్డర్ కొరకు ఉపయోగించిన స్పెల్లింగ్ (Woddar).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_15_voddar',
    relatedHeritageIds: ['comm_dir_15_voddar', 'syn_waddar_vaddar'],
    relatedProminentLabelIds: ['branch_waddar', 'branch_vaddar', 'branch_oddar'],
    relatedTopicsAndKeywords: ['Woddar', 'Voddar', 'Waddar', 'Vaddar'],
  },
  {
    order: 48,
    id: 'ref70_48_vaddeelu',
    canonicalTerm: 'Vaddeelu',
    datasetGroup: 'supplementary_25',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Vaddeelu', 'वड्डीलु (Vaddeelu)', 'వడ్డీలు (Vaddeelu)', 'ವಡ್ಡೀಲು (Vaddeelu)', 'வடீலு (Vaddeelu)', 'वड्डीलु', 'ବଡ଼ୀଲୁ (Vaddeelu)', 'ভাদীলু (Vaddeelu)'),
    multilingualSearchAliases: ['Vaddeelu', 'Vaddelu', 'వడ్డీలు', 'వడ్డెలు', 'वड्डीलु', 'ವಡ್ಡೀಲು'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #3 (of 25): Long-vowel Telugu plural transliteration variant of Vaddelu (వడ్డీలు / వడ్డెలు), cataloged as Dedicated Directory Entry #11 on the Community Heritage page.',
      'पूरक संदर्भ #3 (25 में से): वड्डेलु (వడ్డీలు / వడ్డెలు) का दीर्घ-स्वर तेलुगु बहुवचन लिप्यंतरण रूप।',
      'అనుబంధ రిఫరెన్స్ #3: వడ్డెలు / వడ్డీలు అనే తెలుగు బహువచన నామ రూపం (Vaddeelu).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_11_vaddeelu',
    relatedHeritageIds: ['comm_dir_11_vaddeelu', 'comm_dir_10_vaddera', 'syn_odde_vadde'],
    relatedProminentLabelIds: ['vaddelu', 'branch_vadde', 'branch_vaddera'],
    relatedTopicsAndKeywords: ['Vaddeelu', 'Vaddelu', 'Vaddera', 'Vadde'],
  },
  {
    order: 49,
    id: 'ref70_49_odra_kshtriya',
    canonicalTerm: 'Odra-Kshtriya',
    datasetGroup: 'supplementary_25',
    classification: 'Alternate spellings',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Odra-Kshtriya',
      'ओड्र-क्षत्रिय (Odra-Kshtriya)',
      'ఓడ్ర-క్షత్రియ (Odra-Kshtriya)',
      'ಓಡ್ರ-ಕ್ಷತ್ರಿಯ (Odra-Kshtriya)',
      'ஒட்ர-க்ஷத்ரிய (Odra-Kshtriya)',
      'ओड्र-क्षत्रिय',
      'ଓଡ୍ର-କ୍ଷତ୍ରିୟ (Odra-Kshtriya)',
      'ওড্র-ক্ষত্রিয় (Odra-Kshtriya)'
    ),
    multilingualSearchAliases: ['Odra-Kshtriya', 'Odra-Kshatriya', 'Odra Kshatriya', 'ओड्र-क्षत्रिय', 'ఓడ్ర-క్షత్రియ', 'ಓಡ್ರ-ಕ್ಷತ್ರಿಯ', 'ଓଡ୍ର-କ୍ଷତ୍ରିୟ'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #4 (of 25): Syncopated English transliteration ("Kshtriya" for "Kshatriya") of Odra-Kshatriya, referring to the ancient martial nobility and warrior lineages of Odra-desa.',
      'पूरक संदर्भ #4 (25 में से): ओड्र-क्षत्रिय (Odra-Kshatriya) का वैकल्पिक रोमन लिप्यंतरण रूप (Odra-Kshtriya)।',
      'అనుబంధ రిఫరెన్స్ #4: ఓడ్ర-క్షత్రియ (Odra-Kshatriya) యొక్క ప్రత్యామ్నాయ ఆంగ్ల స్పెల్లింగ్ (Odra-Kshtriya).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_03_odra_kshatriya',
    relatedHeritageIds: ['comm_dir_03_odra_kshatriya', 'syn_od_kshatriya', 'syn_odisha_kshatriya'],
    relatedProminentLabelIds: ['branch_od_kshatriya', 'branch_odra', 'branch_od_khandayaths'],
    relatedTopicsAndKeywords: ['Odra-Kshtriya', 'Odra-Kshatriya', 'Odisha-Kshatriya', 'Od-Kshatriya'],
  },
  {
    order: 50,
    id: 'ref70_50_odisha_kshatriya',
    canonicalTerm: 'Odisha-Kshatriya',
    datasetGroup: 'supplementary_25',
    classification: 'Regional identities',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Odisha-Kshatriya',
      'ओडिशा-क्षत्रिय (Odisha-Kshatriya)',
      'ఒడిశా-క్షత్రియ (Odisha-Kshatriya)',
      'ಒಡಿಶಾ-ಕ್ಷತ್ರಿಯ (Odisha-Kshatriya)',
      'ஒடிசா-க்ஷத்ரிய (Odisha-Kshatriya)',
      'ओडिशा-क्षत्रिय',
      'ଓଡ଼ିଶା-କ୍ଷତ୍ରିୟ (Odisha-Kshatriya)',
      'ওড়িশা-ক্ষত্রিয় (Odisha-Kshatriya)'
    ),
    multilingualSearchAliases: ['Odisha-Kshatriya', 'Odisha Kshatriya', 'Orissa Kshatriya', 'Odra-Kshatriya', 'ओडिशा-क्षत्रिय', 'ఒడిశా-క్షత్రియ', 'ଓଡ଼ିଶା-କ୍ଷତ୍ରିୟ'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #5 (of 25): Modern geographical-historical synonym connecting the Kshatriya/Paika/Khandayat warrior lineages of Odisha with the ancient Odra-Kshatriya heritage.',
      'पूरक संदर्भ #5 (25 में से): ओडिशा के क्षत्रिय/पाइक/खंडायत योद्धा वंशों को प्राचीन ओड्र-क्षत्रिय विरासत से जोड़ने वाला आधुनिक भौगोलिक-ऐतिहासिक पर्याय।',
      'అనుబంధ రిఫరెన్స్ #5: ఒడిశా ప్రాంతపు క్షత్రియ/పైకా/ఖండాయత్ యోధ వంశాలను ప్రాచీన ఓడ్ర-క్షత్రియ వారసత్వంతో అనుసంధానించే నామం.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odisha_kshatriya',
    relatedHeritageIds: ['syn_odisha_kshatriya', 'comm_dir_03_odra_kshatriya', 'comm_dir_05_od_khandayath'],
    relatedProminentLabelIds: ['branch_od_kshatriya', 'branch_odra', 'branch_od_khandayaths'],
    relatedTopicsAndKeywords: ['Odisha-Kshatriya', 'Odra-Kshatriya', 'Od-Khandayath', 'Odisha'],
  },
  {
    order: 51,
    id: 'ref70_51_odan',
    canonicalTerm: 'Odan',
    datasetGroup: 'supplementary_25',
    classification: 'Regional identities',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('Odan', 'ओडन (Odan)', 'ఓడన్ (Odan)', 'ಓಡನ್ (Odan)', 'ஓடன் / ஒட்டன் (Odan)', 'ओडन', 'ଓଡ଼ନ୍ (Odan)', 'ওড়ন (Odan)'),
    multilingualSearchAliases: ['Odan', 'Oddan', 'Ottan', 'ஓடன்', 'ஒட்டன்', 'ఓడన్', 'ओडन', 'ಓಡನ್'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #6 (of 25): Classical Tamil and Malayalam singular masculine form (-an suffix) corresponding to plural Oddar / Ottar, documented in South Indian inscriptions and Palakkad/Kongu/Madurai records.',
      'पूरक संदर्भ #6 (25 में से): बहुवचन ओड्डर / ओट्टर के अनुरूप शास्त्रीय तमिल और मलयालम एकवचन रूप (Odan / Oddan / Ottan)।',
      'అనుబంధ రిఫరెన్స్ #6: తమిళ మరియు మలయాళ భాషలలో ఒడ్డర్ / ఒట్టర్ పదానికి ఏకవచన రూపం (Odan / Oddan / Ottan).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_08_odan',
    relatedHeritageIds: ['comm_dir_08_odan', 'syn_ottar', 'syn_odda_nayakkar_tn'],
    relatedProminentLabelIds: ['branch_ottar', 'branch_oddar', 'branch_oddanayakkar'],
    relatedTopicsAndKeywords: ['Odan', 'Oddan', 'Ottan', 'Ottar', 'Tamil Nadu', 'Kerala'],
  },
  {
    order: 52,
    id: 'ref70_52_ottanayakkar',
    canonicalTerm: 'OttaNayakkar',
    datasetGroup: 'supplementary_25',
    classification: 'Alternate spellings',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'OttaNayakkar',
      'ओट्टा नायक्कर (OttaNayakkar)',
      'ఒట్ట నాయక్కర్ (OttaNayakkar)',
      'ಒಟ್ಟ ನಾಯಕ್ಕರ್ (OttaNayakkar)',
      'ஒட்ட நாயக்கர் (OttaNayakkar)',
      'ओट्टा नायक्कर',
      'ଓଟ୍ଟ ନାୟକର',
      'ওট্টা নায়াক্কর'
    ),
    multilingualSearchAliases: ['OttaNayakkar', 'Otta Nayakkar', 'OddaNayakkar', 'ஒட்ட நாயக்கர்', 'ఒట్ట నాయక్కర్', 'ओट्टा नायक्कर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #7 (of 25): Direct Tamil-script transliteration (ஒட்ட நாயக்கர் -> OttaNayakkar) of OddaNayakkar, reflecting Tamil orthography where geminated "tt" represents both "tt" and "dd".',
      'पूरक संदर्भ #7 (25 में से): ओड्डा नायक्कर (OddaNayakkar) का प्रत्यक्ष तमिल-लिपि लिप्यंतरण रूप (ஒட்ட நாயக்கர் -> OttaNayakkar)।',
      'అనుబంధ రిఫరెన్స్ #7: తమిళ లిపిలో ఒడ్డ నాయక్కర్ (ஒட்ட நாயக்கர்) యొక్క ప్రత్యక్ష ఆంగ్ల లిప్యంతరీకరణ (OttaNayakkar).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odda_nayakkar_tn',
    relatedHeritageIds: ['syn_odda_nayakkar_tn', 'syn_ottar', 'comm_dir_08_odan'],
    relatedProminentLabelIds: ['branch_oddanayakkar', 'branch_ottar'],
    relatedTopicsAndKeywords: ['OttaNayakkar', 'OddaNayakkar', 'Ottar', 'Tamil Nadu'],
  },
  {
    order: 53,
    id: 'ref70_53_boyanayakkar',
    canonicalTerm: 'BoyaNayakkar',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'BoyaNayakkar',
      'बोया नायक्कर (BoyaNayakkar)',
      'బోయ నాయక్కర్ (BoyaNayakkar)',
      'ಬೋಯ ನಾಯಕ್ಕರ್ (BoyaNayakkar)',
      'போய நாயக்கர் (BoyaNayakkar)',
      'बोया नायक्कर',
      'ବୋୟା ନାୟକର',
      'বোয়া নায়াক্কর'
    ),
    multilingualSearchAliases: ['BoyaNayakkar', 'Boya Nayakkar', 'Boyar Nayakkar', 'போய நாயக்கர்', 'బోయ నాయక్కర్', 'बोया नायक्कर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #8 (of 25) [Historical Verification Required]: In Coimbatore, Salem, Erode, and Kongu Nadu (Tamil Nadu), some Odde/Ottar lineages and Boya/Bedar Palaiyakkarar groups shared the "Boya Nayakkar" / "Boyar" administrative umbrella in colonial census schedules. However, Telugu/Kannada Boya/Valmiki/Bedar and Odra/Odde/Vaddera have distinct historical origins and must NOT be automatically merged without family/regional verification.',
      'पूरक संदर्भ #8 (25 में से) [ऐतिहासिक सत्यापन आवश्यक]: कोयंबटूर, सलेम और कोंगु नाडु (तमिलनाडु) में कुछ ओड्डे/ओट्टर वंशों और बोया/बेदर समूहों ने औपनिवेशिक अभिलेखों में "बोया नायक्कर" नाम साझा किया, किंतु बोया/वाल्मीकि और ओड्र/वड्डेरा अलग-अलग समुदाय हैं और इन्हें बिना सत्यापन के स्वतः विलय नहीं किया जाना चाहिए।',
      'అనుబంధ రిఫరెన్స్ #8 [చారిత్రక ధృవీకరణ అవసరం]: తమిళనాడులోని కొంగు నాడు/కోయంబత్తూరు ప్రాంతాలలో కొందరు ఒట్టర్/ఒడ్డె సమూహాలు మరియు బోయ నాయక్కర్ సమూహాలు ఒకే జాబితాలో కనిపించినప్పటికీ, ఆంధ్ర/కర్ణాటక బోయ/వాల్మీకి మరియు వడ్డెర/ఓడ్ర సముదాయాలు వేర్వేరు మూలాలు కలిగినవి. వీటిని స్వయంచాలకంగా విలీనం చేయకూడదు.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odda_nayakkar_tn',
    relatedHeritageIds: ['syn_odda_nayakkar_tn', 'syn_ottar'],
    relatedProminentLabelIds: ['branch_oddanayakkar', 'branch_ottar'],
    relatedTopicsAndKeywords: ['BoyaNayakkar', 'Boyar', 'OddaNayakkar', 'Kongu Nadu', 'Requires Historical Verification'],
  },
  {
    order: 54,
    id: 'ref70_54_boyar',
    canonicalTerm: 'Boyar',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap('Boyar', 'बोयर (Boyar)', 'బోయర్ (Boyar)', 'ಬೋಯರ್ (Boyar)', 'போயர் (Boyar)', 'बोयर', 'ବୋୟର (Boyar)', 'বোয়ার (Boyar)'),
    multilingualSearchAliases: ['Boyar', 'Bhoyar', 'Boya', 'போயர்', 'బోయర్', 'बोयर', 'ಬೋಯರ್'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #9 (of 25) [Historical Verification Required]: In Tamil Nadu OBC/MBC schedules, "Boyar" is frequently listed alongside "Oddar /ulloor Oddar / Sooramari Oddar". Nevertheless, "Boyar" also refers to Telugu/Kannada Boya migrants and Central Indian Bhoyar/Pawar groups. Retained as a distinct cross-reference requiring regional verification.',
      'पूरक संदर्भ #9 (25 में से) [ऐतिहासिक सत्यापन आवश्यक]: तमिलनाडु की सूचियों में "बोयर" (Boyar) अक्सर ओड्डर के साथ सूचीबद्ध होता है, किंतु यह बोया और मध्य भारतीय भोयर समूहों को भी संदर्भित कर सकता है। इसे क्षेत्रीय सत्यापन की आवश्यकता वाले अलग संदर्भ के रूप में रखा गया है।',
      'అనుబంధ రిఫరెన్స్ #9 [చారిత్రక ధృవీకరణ అవసరం]: తమిళనాడు ప్రభుత్వ జాబితాలలో ఒడ్డర్‌తో పాటు బోయర్ (Boyar) పేరు నమోదైనప్పటికీ, బోయ మరియు భోయర్ సమూహాలతో గందరగోళం లేకుండా చారిత్రక ధృవీకరణతో మాత్రమే చూడాలి.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_ottar',
    relatedHeritageIds: ['syn_ottar', 'syn_odda_nayakkar_tn', 'syn_oddar'],
    relatedProminentLabelIds: ['branch_ottar', 'branch_oddar', 'branch_oddanayakkar'],
    relatedTopicsAndKeywords: ['Boyar', 'BoyaNayakkar', 'Ottar', 'Tamil Nadu Classification', 'Requires Historical Verification'],
  },
  {
    order: 55,
    id: 'ref70_55_pawar',
    canonicalTerm: 'Pawar',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap('Pawar', 'पवार / परमार (Pawar)', 'పవార్ (Pawar)', 'ಪವಾರ್ (Pawar)', 'பவார் (Pawar)', 'पवार (Pawar)', 'പୱାର (Pawar)', 'পাওয়ার (Pawar)'),
    multilingualSearchAliases: ['Pawar', 'Panwar', 'Parmar', 'पवार', 'परमार', 'పవార్', 'ಪವಾರ್'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #10 (of 25) [Clan Surname / Multi-Community Overlap — Do Not Conflate as Whole Community]: "Pawar / Panwar / Parmar" is a documented clan surname (gotra/atak) found among both Maharashtra Wadar families and North Indian Od-Rajputh families (referenced in the untouched Surnames registries). However, Pawar is also a major Maratha and Rajput clan name across India and must NEVER be treated as exclusively synonymous with the Od/Vaddera/Wadar community.',
      'पूरक संदर्भ #10 (25 में से) [गोत्र/उपनाम — पूरे समुदाय के रूप में स्वतः विलय न करें]: "पवार / परमार" महाराष्ट्र वडार और उत्तर भारतीय ओड-राजपूत परिवारों में पाया जाने वाला एक प्रलेखित कुलनाम/अटक है, किंतु यह मराठा और राजपूत समाज का भी प्रमुख कुलनाम है। इसे केवल संदर्भ उपनाम के रूप में रखा गया है।',
      'అనుబంధ రిఫరెన్స్ #10 [ఇంటిపేరు / గోత్ర నామం — పూర్తి కమ్యూనిటీగా విలీనం చేయవద్దు]: పవార్ (Pawar) అనేది మహారాష్ట్ర వడార్ మరియు ఉత్తర భారత ఓడ్-రాజ్‌పుత్ కుటుంబాలలో కనిపించే ఇంటిపేరు/వంశనామం. అయితే ఇది మరాఠా మరియు రాజపుత్రులలో కూడా విస్తృతంగా ఉన్నందున ప్రత్యేక కమ్యూనిటీగా పొరబడకూడదు.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_02_od_rajputh',
    relatedHeritageIds: ['comm_dir_02_od_rajputh', 'syn_waddar_vaddar', 'syn_oad_rajputh'],
    relatedProminentLabelIds: ['od_rajputh', 'branch_wadar', 'branch_oad_rajputh'],
    relatedTopicsAndKeywords: ['Pawar', 'Od-Rajputh', 'Wadar', 'Clan Surname Overlap', 'Requires Historical Verification'],
  },
  {
    order: 56,
    id: 'ref70_57_bhoi',
    canonicalTerm: 'Bhoi',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap('Bhoi', 'भोई (Bhoi)', 'భోయి (Bhoi)', 'ಭೋಯಿ (Bhoi)', 'போயி (Bhoi)', 'भोई (Bhoi)', 'ଭୋଇ (Bhoi)', 'ভোই (Bhoi)'),
    multilingualSearchAliases: ['Bhoi', 'Bhoi Dynasty', 'Govinda Vidyadhara', 'ଭୋଇ', 'भोई', 'భోయి', 'ಭೋಯಿ', 'ভোই'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #11 (of 29) [Context-Specific — Royal Dynasty vs. Separate Communities]: In Odisha history, the "Bhoi Dynasty" (founded by Govinda Vidyadhara in 1541 CE, originally from the ministerial/writer Karana-Bhoi class, later ruling Khurda and leading the 1817 Paika Rebellion under Mukunda Deva II and Buxi Jagabandhu) is deeply intertwined with Odra/Paika/Gajapati history. However, "Bhoi" as a general caste name in Odisha, Maharashtra, Assam, and Gujarat refers to distinct communities and must NOT be automatically merged.',
      'पूरक संदर्भ #11 (29 में से) [संदर्भ-विशिष्ट — भोई राजवंश बनाम अन्य समुदाय]: ओडिशा के इतिहास में "भोई राजवंश" (1541 ई. में गोविंद विद्याधर द्वारा स्थापित, और खुर्दा के राजा मुकुंद देव द्वितीय व बख्शी जगबंधु के अधीन 1817 के पाइक विद्रोह से जुड़ा) ओड्र/पाइक इतिहास से गहराई से जुड़ा है। तथापि, सामान्य जाति नाम "भोई" को स्वतः एक ही समुदाय नहीं माना जाना चाहिए।',
      'అనుబంధ రిఫరెన్స్ #11 [చారిత్రక సందర్భ వివరణ]: ఒడిశా చరిత్రలో గోవింద విద్యాధరుడు స్థాపించిన "భోయి రాజవంశం" (Bhoi Dynasty) మరియు ఖుర్దా రాజుల క్రింద జరిగిన 1817 పైకా తిరుగుబాటు ఓడ్ర/పైకా చరిత్రతో ముడిపడి ఉన్నాయి. అయితే సాధారణ "భోయి" కుల నామాన్ని స్వయంచాలకంగా విలీనం చేయకూడదు.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_07_od_paika',
    relatedHeritageIds: ['comm_dir_07_od_paika', 'comm_dir_14_gajapathulu', 'prof_cat_8_royal_dynasties'],
    relatedProminentLabelIds: ['branch_paikas', 'branch_gajapathis', 'branch_od_khandayaths'],
    relatedTopicsAndKeywords: ['Bhoi', 'Bhoi Dynasty', 'Khurda Kingdom', 'Paika Rebellion', 'Requires Historical Verification'],
  },
  {
    order: 57,
    id: 'ref70_58_oddarasa',
    canonicalTerm: 'Oddarasa',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: true,
    localizedLabel: makeLangMap('Oddarasa', 'ओड्डरसा (Oddarasa)', 'ఒడ్డరస (Oddarasa)', 'ಒಡ್ಡರಸ (Oddarasa)', 'ஒட்டரசா (Oddarasa)', 'ओड्डरसा', 'ଓଡ଼ରସା (Oddarasa)', 'ওড্ডরসা (Oddarasa)'),
    multilingualSearchAliases: ['Oddarasa', 'Odda Arasa', 'Oddan-Arasa', 'ಒಡ್ಡರಸ', 'ఒడ్డరస', 'ओड्डरसा', 'ஒட்டரசா'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #12 (of 29): Kannada/South Indian royal compound title combining "Odda" (Odra/Oddar) + "Arasa" (King/Ruler, from Sanskrit Rajan -> Kannada Arasa), denoting regional chieftains and rulers of Odra/Oddar lineage.',
      'पूरक संदर्भ #12 (29 में से): कन्नड़/दक्षिण भारतीय शाही संयुक्त उपाधि ("ओड्डा" + "अरसा" = राजा/शासक), जो ओड्र/ओड्डर वंश के क्षेत्रीय शासकों और प्रमुखों को दर्शाती है।',
      'అనుబంధ రిఫరెన్స్ #12: కన్నడ/దక్షిణ భారత రాజ బిరుదు ("ఒడ్డ" + "అరస" = రాజు/పాలకుడు), ఓడ్ర/ఒడ్డరు వంశానికి చెందిన ప్రాంతీయ పాలకులను సూచిస్తుంది.'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odiyaraju_karnataka',
    relatedHeritageIds: ['syn_odiyaraju_karnataka', 'comm_dir_16_oddaru', 'syn_odderajulu'],
    relatedProminentLabelIds: ['branch_odiyaraju', 'oddaru_odra_communities', 'branch_odderajulu'],
    relatedTopicsAndKeywords: ['Oddarasa', 'Oddan-Arasa', 'Ottan-Arasa', 'Odiyaraju', 'Kannada Royal Title'],
  },
  {
    order: 58,
    id: 'ref70_59_oddedora',
    canonicalTerm: 'OddeDora',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap('OddeDora', 'ओड्डे दोरा (OddeDora)', 'ఒడ్డె దొర (OddeDora)', 'ಒಡ್ಡೆ ದೊರ (OddeDora)', 'ஒட்டெ தொர (OddeDora)', 'ओड्डे दोरा', 'ଓଡ଼େ ଦୋରା (OddeDora)', 'ওড্ডে দোরা (OddeDora)'),
    multilingualSearchAliases: ['OddeDora', 'Odde Dora', 'VaddeDoralu', 'ఒడ్డె దొర', 'ओड्डे दोरा', 'ಒಡ್ಡೆ ದೊರ'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #13 (of 29): Historical Telugu feudal/lordship honorific ("Odde" + "Dora" meaning Lord, Chieftain, or Fort Commander) used in Telangana, Rayalaseema, and Kalinga-Andhra for Odde/Vadde chieftains and estate holders.',
      'पूरक संदर्भ #13 (29 में से): तेलंगाना, रायलसीमा और कलिंग-आंध्र में ओड्डे/वड्डे प्रमुखों और किला कमांडरों के लिए प्रयुक्त ऐतिहासिक तेलुगु सामंती सम्मानसूचक उपाधि ("ओड्डे दोरा")।',
      'అనుబంధ రిఫరెన్స్ #13: తెలంగాణ, రాయలసీమ మరియు కళింగాంధ్రలో ఒడ్డె/వడ్డె పాలెగాళ్లు మరియు కోట నాయకులకు ఉపయోగించిన గౌరవ బిరుదు (ఒడ్డె దొర / OddeDora).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odderajulu',
    relatedHeritageIds: ['syn_odderajulu', 'comm_dir_13_vadderarajulu', 'syn_odde_vadde'],
    relatedProminentLabelIds: ['branch_odderajulu', 'branch_odde', 'vaddera_rajulu'],
    relatedTopicsAndKeywords: ['OddeDora', 'VaddeDoralu', 'OddeRajulu', 'VaddeRajulu', 'Chieftain Title'],
  },
  {
    order: 59,
    id: 'ref70_60_vaddedoralu',
    canonicalTerm: 'VaddeDoralu',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'VaddeDoralu',
      'वड्डे दोरालु (VaddeDoralu)',
      'వడ్డె దొరలు (VaddeDoralu)',
      'ವಡ್ಡೆ ದೊರಲು (VaddeDoralu)',
      'வடெ தொரலு (VaddeDoralu)',
      'वड्डे दोरालु',
      'ବଡ଼େ ଦୋରାଲୁ (VaddeDoralu)',
      'ভাদে দোরালু (VaddeDoralu)'
    ),
    multilingualSearchAliases: ['VaddeDoralu', 'Vadde Doralu', 'OddeDora', 'వడ్డె దొరలు', 'वड्डे दोरालु', 'ವಡ್ಡೆ ದೊರಲು'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #14 (of 29): Plural Telugu honorific form of OddeDora ("Vadde Doralu" = Lords/Commanders of the Vadde/Vaddera lineage) preserved in regional historical ballads and kaifiyats.',
      'पूरक संदर्भ #14 (29 में से): क्षेत्रीय ऐतिहासिक गाथाओं और कैफियतों में संरक्षित ओड्डे दोरा का बहुवचन तेलुगु सम्मानसूचक रूप ("वड्डे दोरालु")।',
      'అనుబంధ రిఫరెన్స్ #14: ప్రాంతీయ చారిత్రక గాథలు మరియు కైఫియతులలో వడ్డె/వడ్డెర నాయకులను గౌరవంగా సంబోధించే బహువచన బిరుదు (వడ్డె దొరలు / VaddeDoralu).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_13_vadderarajulu',
    relatedHeritageIds: ['comm_dir_13_vadderarajulu', 'syn_odderajulu', 'comm_dir_11_vaddeelu'],
    relatedProminentLabelIds: ['vaddera_rajulu', 'branch_vadderajulu', 'branch_vadde'],
    relatedTopicsAndKeywords: ['VaddeDoralu', 'OddeDora', 'VaddeRajulu', 'Vaddera Rajulu'],
  },
  {
    order: 60,
    id: 'ref70_61_odiyarajulu',
    canonicalTerm: 'Odiyarajulu',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Odiyarajulu',
      'ओडियाराजुलु (Odiyarajulu)',
      'ఒడియరాజులు (Odiyarajulu)',
      'ಒಡಿಯರಾಜುಲು (Odiyarajulu)',
      'ஒடியராஜுலு (Odiyarajulu)',
      'ओडियाराजुलु',
      'ଓଡ଼ିଆରାଜୁଲୁ (Odiyarajulu)',
      'ওড়িয়ারাজুলু (Odiyarajulu)'
    ),
    multilingualSearchAliases: ['Odiyarajulu', 'Odiya Rajulu', 'Odiyaraju', 'Vadiyarajulu', 'ఒడియరాజులు', 'ಒಡಿಯರಾಜುಲು', 'ओडियाराजुलु', 'ଓଡ଼ିଆରାଜୁଲୁ'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #15 (of 29): Plural Telugu/Kannada royal title of Odiyaraju (ఒడియరాజులు), denoting the Odra/Odiya royal and military houses documented in South Indian inscriptions and Vijayanagara/Mysore chronicles.',
      'पूरक संदर्भ #15 (29 में से): ओडियाराजु का बहुवचन तेलुगु/कन्नड़ शाही रूप (ओडियाराजुलु), जो दक्षिण भारतीय शिलालेखों में प्रलेखित ओड्र/ओडिया राजघरानों को दर्शाता है।',
      'అనుబంధ రిఫరెన్స్ #15: దక్షిణ భారత శాసనాలలో మరియు చారిత్రక రికార్డులలో ఓడ్ర/ఒడియ రాజవంశాలను సూచించే బహువచన నామం (ఒడియరాజులు / Odiyarajulu).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odiyaraju_karnataka',
    relatedHeritageIds: ['syn_odiyaraju_karnataka', 'comm_dir_04_kalingarajulu', 'syn_odderajulu'],
    relatedProminentLabelIds: ['branch_odiyaraju', 'branch_vadiyarajulu', 'branch_odderajulu'],
    relatedTopicsAndKeywords: ['Odiyarajulu', 'Odiyaraju', 'Vadiyarajulu', 'KalingaRajulu'],
  },
  {
    order: 61,
    id: 'ref70_62_kshatriya_kings',
    canonicalTerm: 'Kshatriya Kings',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Kshatriya Kings',
      'क्षत्रिय राजा (Kshatriya Kings)',
      'క్షత్రియ రాజులు / చక్రవర్తులు (Kshatriya Kings)',
      'ಕ್ಷತ್ರಿಯ ರಾಜರು (Kshatriya Kings)',
      'க்ஷத்ரிய மன்னர்கள் (Kshatriya Kings)',
      'क्षत्रिय राजे (Kshatriya Kings)',
      'କ୍ଷତ୍ରିୟ ରାଜା (Kshatriya Kings)',
      'ক্ষত্রিয় রাজা (Kshatriya Kings)'
    ),
    multilingualSearchAliases: ['Kshatriya Kings', 'Odra Kshatriya Kings', 'Kalinga Kshatriya Kings', 'Suryavamshi Kshatriya Kings', 'క్షత్రియ రాజులు', 'क्षत्रिय राजा', 'ಕ್ಷತ್ರಿಯ ರಾಜರು'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #16 (of 29): English historiographical descriptor referring within this repository to the documented Suryavamshi Gajapati, Kalinga, Odra-Kshatriya, and regional Odde/Odiyaraju monarchs and chieftains.',
      'पूरक संदर्भ #16 (29 में से): इस संग्रह के संदर्भ में प्रलेखित सूर्यवंशी गजपति, कलिंग, ओड्र-क्षत्रिय और क्षेत्रीय ओड्डे/ओडियाराजु शासकों को संदर्भित करने वाला अंग्रेजी ऐतिहासिक पद।',
      'అనుబంధ రిఫరెన్స్ #16: ఈ చారిత్రక వేదికలో సూర్యవంశీ గజపతి, కళింగ, ఓడ్ర-క్షత్రియ మరియు ఒడ్డె/ఒడియరాజు పాలకులను సూచించే ఆంగ్ల చారిత్రక పదం (Kshatriya Kings).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_8_royal_dynasties',
    relatedHeritageIds: ['prof_cat_8_royal_dynasties', 'comm_dir_14_gajapathulu', 'comm_dir_03_odra_kshatriya', 'syn_suryavamshi'],
    relatedProminentLabelIds: ['branch_kshatriya_rajulu', 'branch_suryavamsha_kshatriya', 'branch_gajapathis'],
    relatedTopicsAndKeywords: ['Kshatriya Kings', 'Suryavamshi Gajapati', 'Odra-Kshatriya', 'Royal Dynasties'],
  },
  {
    order: 62,
    id: 'ref70_63_oddan_arasa',
    canonicalTerm: 'Oddan-Arasa',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Oddan-Arasa',
      'ओड्डन-अरसा (Oddan-Arasa)',
      'ఒడ్డన్-అరస (Oddan-Arasa)',
      'ಒಡ್ಡನ್-ಅರಸ (Oddan-Arasa)',
      'ஒட்டன்-அரசன் (Oddan-Arasa)',
      'ओड्डन-अरसा',
      'ଓଡ଼ନ୍-ଅରସା (Oddan-Arasa)',
      'ওড্ডন-অরসা (Oddan-Arasa)'
    ),
    multilingualSearchAliases: ['Oddan-Arasa', 'Oddan Arasa', 'Ottan-Arasa', 'Oddarasa', 'ஒட்டன் அரசன்', 'ಒಡ್ಡನ್ ಅರಸ', 'ఒడ్డన్ అరస'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #17 (of 29): Tamil/Kannada borderland royal/chieftaincy title ("Oddan" + "Arasa/Arasan" = Ruler/Chieftain of the Oddar/Odan lineage) preserved in Kongu, Madurai, and southern Mysore historical traditions.',
      'पूरक संदर्भ #17 (29 में से): कोंगु, मदुरै और दक्षिणी मैसूर की ऐतिहासिक परंपराओं में संरक्षित तमिल/कन्नड़ सीमावर्ती शाही/सामंती उपाधि (Oddan-Arasa)।',
      'అనుబంధ రిఫరెన్స్ #17: కొంగు, మధురై మరియు దక్షిణ మైసూర్ చారిత్రక సంప్రదాయాలలో ఒడ్డర్/ఓడన్ వంశ పాలకులను సూచించే బిరుదు (Oddan-Arasa).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_odda_nayakkar_tn',
    relatedHeritageIds: ['syn_odda_nayakkar_tn', 'comm_dir_08_odan', 'syn_odiyaraju_karnataka'],
    relatedProminentLabelIds: ['branch_oddanayakkar', 'branch_ottar', 'branch_odiyaraju'],
    relatedTopicsAndKeywords: ['Oddan-Arasa', 'Ottan-Arasa', 'Oddarasa', 'Odan', 'OddaNayakkar'],
  },
  {
    order: 63,
    id: 'ref70_64_ottan_arasa',
    canonicalTerm: 'Ottan-Arasa',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Traditional / Regional Lineage Record',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Ottan-Arasa',
      'ओट्टन-अरसा (Ottan-Arasa)',
      'ఒట్టన్-అరస (Ottan-Arasa)',
      'ಒಟ್ಟನ್-ಅರಸ (Ottan-Arasa)',
      'ஒட்டன்-அரசன் (Ottan-Arasa)',
      'ओट्टन-अरसा',
      'ଓଟ୍ଟନ୍-ଅରସା (Ottan-Arasa)',
      'ওট্টন-অরসা (Ottan-Arasa)'
    ),
    multilingualSearchAliases: ['Ottan-Arasa', 'Ottan Arasa', 'Ottan Arasan', 'Oddan-Arasa', 'ஒட்டன் அரசன்', 'ಒಟ್ಟನ್ ಅರಸ', 'ఒట్టన్ అరస'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #18 (of 29): Tamil-orthography variant of Oddan-Arasa ("Ottan" + "Arasa/Arasan"), linking Tamil Ottar/Odan chieftaincy traditions with South Indian royal titles.',
      'पूरक संदर्भ #18 (29 में से): ओड्डन-अरसा का तमिल-वर्तनी रूप ("ओट्टन-अरसा" / Ottan-Arasa), जो तमिल ओट्टर/ओडन प्रमुखों की परंपराओं को दर्शाता है।',
      'అనుబంధ రిఫరెన్స్ #18: తమిళ అక్షరక్రమంలో ఒడ్డన్-అరస యొక్క రూపాంతరం (Ottan-Arasa / ஒட்டன் அரசன்).'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=syn_ottar',
    relatedHeritageIds: ['syn_ottar', 'syn_odda_nayakkar_tn', 'comm_dir_08_odan'],
    relatedProminentLabelIds: ['branch_ottar', 'branch_oddanayakkar'],
    relatedTopicsAndKeywords: ['Ottan-Arasa', 'Oddan-Arasa', 'Oddarasa', 'Ottar'],
  },
  {
    order: 64,
    id: 'ref70_65_kallu_oddar',
    canonicalTerm: 'Kallu Oddar',
    datasetGroup: 'supplementary_25',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Kallu Oddar',
      'कल्लु ओड्डर (Kallu Oddar)',
      'కల్లు ఒడ్డర్ / రాతి వడ్డెర (Kallu Oddar)',
      'ಕಲ್ಲು ಒಡ್ಡರ್ / ಕಲ್ಲು ವಡ್ಡರು (Kallu Oddar)',
      'கல் ஒட்டர் (Kallu Oddar)',
      'कल्लु ओड्डर / दगड वडार',
      'କଲ୍ଲୁ ଓଡ଼ର (Kallu Oddar)',
      'কাল্লু ওড্ডর (Kallu Oddar)'
    ),
    multilingualSearchAliases: ['Kallu Oddar', 'Kallu Vaddar', 'Kal Oddar', 'Dagad Wadar', 'Rati Vaddera', 'ಕಲ್ಲು ಒಡ್ಡರ್', 'ಕಲ್ಲು ವಡ್ಡರು', 'கல் ஒட்டர்', 'కల్లు ఒడ్డర్', 'రాతి వడ్డెర', 'कल्लु ओड्डर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #19 (of 29): Traditional occupational endogamous/guild subdivision specializing in granite quarrying, stone dressing, temple architecture, and fortress masonry (Kannada/Telugu "Kallu" / Tamil "Kal" / Marathi "Dagad" = Stone). Documented in Thurston (1909), Enthoven (1922), and Mysore/Madras Gazetteers.',
      'पूरक संदर्भ #19 (29 में से): ग्रेनाइट उत्खनन, पत्थर तराशने, मंदिर वास्तुकला और किला निर्माण में विशेषज्ञता रखने वाला पारंपरिक व्यावसायिक उपविभाग (कन्नड़/तेलुगु "कल्लु" / तमिल "कल" / मराठी "दगड" = पत्थर)।',
      'అనుబంధ రిఫరెన్స్ #19: రాతి క్వారీయింగ్, దేవాలయ నిర్మాణం మరియు కోటల రాతి కట్టడాలలో నైపుణ్యం కలిగిన సాంప్రదాయ వృత్తిపరమైన ఉపవిభాగం (కల్లు ఒడ్డర్ / రాతి వడ్డెర).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_3_construction_hydraulic',
    relatedHeritageIds: ['prof_cat_3_construction_hydraulic', 'prof_cat_4_shilpi', 'comm_dir_16_oddaru', 'comm_dir_15_voddar'],
    relatedProminentLabelIds: ['branch_oddar', 'branch_vaddar', 'branch_vaddera', 'oddaru_odra_communities'],
    relatedTopicsAndKeywords: ['Kallu Oddar', 'Stone Masonry', 'Fortress Architecture', 'Shilpi Oddar', 'Mannu Oddar'],
  },
  {
    order: 65,
    id: 'ref70_66_mannu_oddar',
    canonicalTerm: 'Mannu Oddar',
    datasetGroup: 'supplementary_25',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Mannu Oddar',
      'मन्नु ओड्डर (Mannu Oddar)',
      'మన్ను ఒడ్డర్ / మట్టి వడ్డెర (Mannu Oddar)',
      'ಮಣ್ಣು ಒಡ್ಡರ್ / ಮಣ್ಣು ವಡ್ಡರು (Mannu Oddar)',
      'மண் ஒட்டர் (Mannu Oddar)',
      'मन्नु ओड्डर / माती वडार',
      'ମନ୍ନୁ ଓଡ଼ର (Mannu Oddar)',
      'মান্নু ওড্ডর (Mannu Oddar)'
    ),
    multilingualSearchAliases: ['Mannu Oddar', 'Mannu Vaddar', 'Man Oddar', 'Mati Wadar', 'Matti Vaddera', 'ಮಣ್ಣು ಒಡ್ಡರ್', 'ಮಣ್ಣು ವಡ್ಡರು', 'மண் ஒட்டர்', 'మన్ను ఒడ్డర్', 'మట్టి వడ్డెర', 'मन्नु ओड्डर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #20 (of 29): Traditional occupational subdivision specializing in large-scale hydraulic earthworks, irrigation tank (Kere/Cheruvu/Eri) construction, canal excavation, and earthen ramparts (Kannada/Telugu "Mannu" / Tamil "Man" / Marathi "Mati" = Earth/Soil).',
      'पूरक संदर्भ #20 (29 में से): बड़े पैमाने पर जल-अभियांत्रिकी, सिंचाई तालाब (केरे/चेरुवु/एरी) निर्माण, नहर उत्खनन और मिट्टी के प्राचीर निर्माण में विशेषज्ञता रखने वाला पारंपरिक व्यावसायिक उपविभाग (मन्नु ओड्डर / माती वडार)।',
      'అనుబంధ రిఫరెన్స్ #20: భారీ చెరువులు (కెరె/చెరువు/ఏరి), కాలువల తవ్వకం మరియు మట్టి కోటల నిర్మాణంలో నైపుణ్యం కలిగిన సాంప్రదాయ వృత్తిపరమైన ఉపవిభాగం (మన్ను ఒడ్డర్ / మట్టి వడ్డెర).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_3_construction_hydraulic',
    relatedHeritageIds: ['prof_cat_3_construction_hydraulic', 'syn_sagaravamshi', 'comm_dir_16_oddaru', 'comm_dir_10_vaddera'],
    relatedProminentLabelIds: ['branch_oddar', 'branch_vaddar', 'branch_vaddera', 'sagara_vamshi_label'],
    relatedTopicsAndKeywords: ['Mannu Oddar', 'Hydraulic Engineering', 'Tank Builders', 'Kallu Oddar', 'Bandi Oddar'],
  },
  {
    order: 66,
    id: 'ref70_67_bandi_oddar',
    canonicalTerm: 'Bandi Oddar',
    datasetGroup: 'supplementary_25',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Bandi Oddar',
      'बंडी ओड्डर (Bandi Oddar)',
      'బండి ఒడ్డర్ / బండి వడ్డెర (Bandi Oddar)',
      'ಬಂಡಿ ಒಡ್ಡರ್ / ಬಂಡಿ ವಡ್ಡರು (Bandi Oddar)',
      'வண்டி ஒட்டர் (Bandi Oddar)',
      'बंडी ओड्डर / गाडी वडार',
      'ବଣ୍ଡି ଓଡ଼ର (Bandi Oddar)',
      'বান্দি ওড্ডর (Bandi Oddar)'
    ),
    multilingualSearchAliases: ['Bandi Oddar', 'Bandi Vaddar', 'Vandi Oddar', 'Gadi Wadar', 'Bandi Vaddera', 'ಬಂಡಿ ಒಡ್ಡರ್', 'ಬಂಡಿ ವಡ್ಡರು', 'வண்டி ஒட்டர்', 'బండి ఒడ్డర్', 'గాడి వడార్', 'बंडी ओड्डर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #21 (of 29): Traditional subdivision specializing in heavy stone-cart logistics, military siege-supply transport, and monolithic stone-block haulage using specialized solid-wheeled carts (Kannada/Telugu "Bandi" / Tamil "Vandi" / Marathi "Gadi" = Cart/Wagon).',
      'पूरक संदर्भ #21 (29 में से): विशेष ठोस पहियों वाली गाड़ियों का उपयोग करके भारी पत्थर परिवहन, सैन्य रसद आपूर्ति और विशाल शिलाखंडों की ढुलाई में विशेषज्ञता रखने वाला पारंपरिक उपविभाग (बंडी ओड्डर / गाडी वडार)।',
      'అనుబంధ రిఫరెన్స్ #21: భారీ రాతి బండల రవాణా, కోటల నిర్మాణ సామగ్రి మరియు సైనిక రవాణాలో ప్రత్యేక బండ్లను ఉపయోగించే సాంప్రదాయ వృత్తిపరమైన ఉపవిభాగం (బండి ఒడ్డర్ / గాడి వడార్).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_3_construction_hydraulic',
    relatedHeritageIds: ['prof_cat_3_construction_hydraulic', 'prof_cat_9_other_professions', 'comm_dir_16_oddaru', 'syn_waddar_vaddar'],
    relatedProminentLabelIds: ['branch_oddar', 'branch_vaddar', 'branch_wadar'],
    relatedTopicsAndKeywords: ['Bandi Oddar', 'Gadi Wadar', 'Heavy Stone Transport', 'Kallu Oddar'],
  },
  {
    order: 67,
    id: 'ref70_68_girini_oddar',
    canonicalTerm: 'Girini Oddar',
    datasetGroup: 'supplementary_25',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Girini Oddar',
      'गिरिनी ओड्डर (Girini Oddar)',
      'గిరిని ఒడ్డర్ (Girini Oddar)',
      'ಗಿರಿಣಿ ಒಡ್ಡರ್ (Girini Oddar)',
      'கிரினி ஒட்டர் (Girini Oddar)',
      'गिरणी वडार / गिरिनी ओड्डर',
      'ଗିରିନି ଓଡ଼ର (Girini Oddar)',
      'গিরিনি ওড্ডর (Girini Oddar)'
    ),
    multilingualSearchAliases: ['Girini Oddar', 'Girni Wadar', 'Girini Vaddar', 'ಗಿರಿಣಿ ಒಡ್ಡರ್', 'గిరిని ఒడ్డర్', 'गिरिनी ओड्डर', 'गिरणी वडार'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #22 (of 29): Traditional occupational subdivision associated with carving millstones/grinding stones, mortar-presses (Ghani/Girini), and precision domestic/industrial stone implements across the Deccan, Karnataka, and Maharashtra.',
      'पूरक संदर्भ #22 (29 में से): दक्कन, कर्नाटक और महाराष्ट्र में चक्की के पाट (गिरणी/गिरिनी), कोल्हू और सटीक पत्थर के उपकरण बनाने से जुड़ा पारंपरिक व्यावसायिक उपविभाग।',
      'అనుబంధ రిఫరెన్స్ #22: దక్కన్, కర్ణాటక మరియు మహారాష్ట్ర ప్రాంతాలలో రాతి తిరగళ్లు, గానుగలు (గిరిని/గిర్ని) మరియు గృహోపకరణ రాతి పనిముట్ల తయారీతో ముడిపడిన ఉపవిభాగం (Girini Oddar).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_6_lokashilpi',
    relatedHeritageIds: ['prof_cat_6_lokashilpi', 'prof_cat_3_construction_hydraulic', 'syn_waddar_vaddar'],
    relatedProminentLabelIds: ['branch_oddar', 'branch_vaddar', 'branch_wadar'],
    relatedTopicsAndKeywords: ['Girini Oddar', 'Lokashilpi', 'Stone Implements', 'Deccan'],
  },
  {
    order: 68,
    id: 'ref70_69_uppu_oddar',
    canonicalTerm: 'Uppu Oddar',
    datasetGroup: 'supplementary_25',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Documented Gazetteer / Ethnographic Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Uppu Oddar',
      'उप्पु ओड्डर (Uppu Oddar)',
      'ఉప్పు ఒడ్డర్ (Uppu Oddar)',
      'ಉಪ್ಪು ಒಡ್ಡರ್ (Uppu Oddar)',
      'உப்பு ஒட்டர் (Uppu Oddar)',
      'उप्पु ओड्डर / मीठ वडार',
      'ଉପ୍ପୁ ଓଡ଼ର (Uppu Oddar)',
      'উপ্পু ওড্ডর (Uppu Oddar)'
    ),
    multilingualSearchAliases: ['Uppu Oddar', 'Uppu Vaddar', 'Uppu Vaddera', 'ಉಪ್ಪು ಒಡ್ಡರ್', 'உப்பு ஒட்டர்', 'ఉప్పు ఒడ్డర్', 'उप्पु ओड्डर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #23 (of 29): Traditional subdivision historically documented in Madras Presidency and Mysore ethnographic surveys in connection with salt-earth extraction, salt-pan earthworks, and inland salt trade/transport (Dravidian "Uppu" = Salt).',
      'पूरक संदर्भ #23 (29 में से): मद्रास प्रेसीडेंसी और मैसूर नृवंशविज्ञान सर्वेक्षणों में नमक-मिट्टी निष्कर्षण, नमक-क्यारी निर्माण और अंतर्देशीय नमक व्यापार/परिवहन के संबंध में प्रलेखित पारंपरिक उपविभाग ("उप्पु" = नमक)।',
      'అనుబంధ రిఫరెన్స్ #23: మద్రాస్ ప్రెసిడెన్సీ మరియు మైసూర్ ఎథ్నోగ్రాఫిక్ సర్వేలలో ఉప్పు మడుల నిర్మాణం మరియు ఉప్పు రవాణా/వాణిజ్యంతో ముడిపడిన సాంప్రదాయ ఉపవిభాగం (ఉప్పు ఒడ్డర్ / Uppu Oddar).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_9_other_professions',
    relatedHeritageIds: ['prof_cat_9_other_professions', 'comm_dir_16_oddaru', 'syn_oddar'],
    relatedProminentLabelIds: ['branch_oddar', 'branch_ottar', 'oddaru_odra_communities'],
    relatedTopicsAndKeywords: ['Uppu Oddar', 'Traditional Trade & Earthworks', 'Oddar Subdivisions'],
  },
  {
    order: 69,
    id: 'ref70_70_shilpi_oddar',
    canonicalTerm: 'Shilpi Oddar',
    datasetGroup: 'supplementary_25',
    classification: 'Occupational or traditional subdivisions',
    verificationStatus: 'Verified Epigraphic / Historical Record',
    requiresVerification: false,
    localizedLabel: makeLangMap(
      'Shilpi Oddar',
      'शिल्पी ओड्डर (Shilpi Oddar)',
      'శిల్పి ఒడ్డర్ / శిల్పి వడ్డెర (Shilpi Oddar)',
      'ಶಿಲ್ಪಿ ಒಡ್ಡರ್ / ಶಿಲ್ಪಿ ವಡ್ಡರು (Shilpi Oddar)',
      'சிற்பி ஒட்டர் (Shilpi Oddar)',
      'शिल्पी ओड्डर / शिल्पी वडार',
      'ଶିଳ୍ପୀ ଓଡ଼ର (Shilpi Oddar)',
      'শিল্পী ওড্ডর (Shilpi Oddar)'
    ),
    multilingualSearchAliases: ['Shilpi Oddar', 'Shilpi Vaddar', 'Shilpi Vaddera', 'Sirpi Oddar', 'ಶಿಲ್ಪಿ ಒಡ್ಡರ್', 'சிற்பி ஒட்டர்', 'శిల్పి ఒడ్డర్', 'शिल्पी ओड्डर'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #24 (of 29): Master temple sculptors, stone-carvers, and architectural artisans (Shilpi / Vasthushilpi / Vishwashilpi) of the Oddar/Vaddera/Odra tradition who carved temple pillars, mandapas, stepwells, and sacred iconography.',
      'पूरक संदर्भ #24 (29 में से): ओड्डर/वड्डेरा/ओड्र परंपरा के प्रमुख मंदिर मूर्तिकार, पत्थर-शिल्पी और वास्तुशिल्पी (शिल्पी ओड्डर), जिन्होंने मंदिर के स्तंभों, मंडपों, बावड़ियों और प्रतिमाओं का निर्माण किया।',
      'అనుబంధ రిఫరెన్స్ #24: దేవాలయ స్తంభాలు, మండపాలు, కోనేరులు మరియు శిల్పాలను చెక్కిన ఒడ్డర్/వడ్డెర/ఓడ్ర సంప్రదాయపు ప్రధాన శిల్పులు మరియు వాస్తుశిల్పులు (శిల్పి ఒడ్డర్ / Shilpi Oddar).'
    ),
    primaryTargetLink: '/community-heritage?tab=professions&id=prof_cat_4_shilpi',
    relatedHeritageIds: ['prof_cat_4_shilpi', 'prof_cat_5_vasthushilpi', 'prof_cat_7_vishwashilpi', 'comm_dir_16_oddaru'],
    relatedProminentLabelIds: ['branch_oddar', 'branch_vaddera', 'oddaru_odra_communities'],
    relatedTopicsAndKeywords: ['Shilpi Oddar', 'Shilpi', 'Vasthushilpi', 'Temple Architecture', 'Kallu Oddar'],
  },
  {
    order: 70,
    id: 'ref74_70_bhoyudu',
    canonicalTerm: 'Bhoyudu',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Bhoyudu',
      'भोयुडु (Bhoyudu)',
      'భోయుడు (Bhoyudu)',
      'ಭೋಯುಡು (Bhoyudu)',
      'போயுடு (Bhoyudu)',
      'भोयुडु (Bhoyudu)',
      'ଭୋୟୁଡ଼ୁ (Bhoyudu)',
      'ভোয়ুডু (Bhoyudu)'
    ),
    multilingualSearchAliases: ['Bhoyudu', 'భోయుడు', 'भोयुडु', 'ಭೋಯುಡು', 'போயுடு', 'ଭୋୟୁଡ଼ୁ', 'ভোয়ুডু'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #25 (of 29) [Research Required / Do Not Automatically Conflate]: Aspirated Telugu singular masculine designation (భోయుడు, with classical Telugu nominative suffix "-du") recorded in Kalinga-Andhra and coastal Andhra regional contexts. Kept strictly separate from Bhoi, Boyar, Voddar, Woddar, and Boya/Valmiki/Besta groups pending specific epigraphic or genealogical verification.',
      'पूरक संदर्भ #25 (29 में से) [ऐतिहासिक सत्यापन आवश्यक — स्वतः विलय न करें]: कलिंग-आंध्र और तटीय आंध्र के क्षेत्रीय संदर्भों में प्रयुक्त तेलुगु एकवचन पुल्लिंग पदनाम (भोयुडु / భోయుడు)। विशिष्ट अभिलेखीय या वंशावली साक्ष्य के बिना इसे भोई, बोयर, वोड्डर या अन्य समुदायों के समान नहीं माना जाना चाहिए।',
      'అనుబంధ రిఫరెన్స్ #25 [చారిత్రక ధృవీకరణ అవసరం — స్వయంచాలకంగా విలీనం చేయవద్దు]: కళింగాంధ్ర మరియు తీరాంధ్ర ప్రాంతీయ రికార్డులలో కనిపించే తెలుగు ఏకవచన నామవాచకం (భోయుడు / Bhoyudu). నిర్దిష్ట శాసన లేదా చారిత్రక ఆధారాలు లేకుండా భోయి, బోయర్, వొడ్డర్ లేదా ఇతర సమూహాలతో దీనిని స్వయంచాలకంగా విలీనం చేయకూడదు.',
      'ಪೂರಕ ಉಲ್ಲೇಖ #25 [ಐತಿಹಾಸಿಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ]: ಕಳಿಂಗ-ಆಂಧ್ರ ಪ್ರಾದೇಶಿಕ ದಾಖಲೆಗಳಲ್ಲಿ ಕಂಡುಬರುವ ತೆಲುಗು ಏಕವಚನ ನಾಮಪದ (ಭೋಯುಡು / Bhoyudu). ನಿರ್ದಿಷ್ಟ ಶಾಸನ ಅಥವಾ ಚಾರಿತ್ರಿಕ ಆಧಾರವಿಲ್ಲದೆ ಭೋಯಿ, ಬೋಯರ್, ವೊಡ್ಡರ್ ಅಥವಾ ಇತರ ಸಮುದಾಯಗಳೊಂದಿಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವಿಲೀನಗೊಳಿಸಬಾರದು.',
      'கூடுதல் குறிப்பு #25 [வரலாற்றுச் சரிபார்ப்பு தேவை]: கலிங்க-ஆந்திரப் பகுதிகளில் காணப்படும் தெலுங்கு ஒருமைப் பெயர் (போயுடு / Bhoyudu). தகுந்த ஆதாரமின்றி போயி, போயர், வொட்டர் அல்லது பிற சமூகங்களுடன் தானாக இணைக்கக் கூடாது.',
      'पूरक संदर्भ #25 [ऐतिहासिक पडताळणी आवश्यक]: कलिंग-आंध्र प्रादेशिक नोंदींमध्ये आढळणारे तेलुगू एकवचनी नाव (भोयुडु / Bhoyudu). ठोस पुराव्याशिवाय भोई, बोयर, वोड्डर किंवा इतर समाजांशी आपोआप एकत्र करू नये.',
      'ଅତିରିକ୍ତ ରେଫରେନ୍ସ #25 [ଐତିହାସିକ ଯାଞ୍ଚ ଆବଶ୍ୟକ]: କଳିଙ୍ଗ-ଆନ୍ଧ୍ର ଆଞ୍ଚଳିକ ଦସ୍ତାବିଜରେ ଦେଖାଯାଉଥିବା ତେଲୁଗୁ ଏକବଚନ ଶବ୍ଦ (ଭୋୟୁଡ଼ୁ / Bhoyudu)। ନିର୍ଦ୍ଦିଷ୍ଟ ପ୍ରମାଣ ବିନା ଭୋଇ, ବୋୟର କିମ୍ବା ଅନ୍ୟ ସମ୍ପ୍ରଦାୟ ସହ ମିଶ୍ରଣ କରାଯିବ ନାହିଁ।',
      'সম্পূরক রেফারেন্স #25 [ঐতিহাসিক যাচাইকরণ প্রয়োজন]: কলিঙ্গ-অন্ধ্র আঞ্চলিক নথিতে প্রাপ্ত তেলুগু একবচন পদ (ভোয়ুডু / Bhoyudu)। সুনির্দিষ্ট ঐতিহাসিক প্রমাণ ছাড়া ভোই, বোয়ার বা অন্য কোনো সম্প্রদায়ের সাথে স্বয়ংক্রিয়ভাবে একত্রিত করা যাবে না।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_09_vaddi'],
    relatedProminentLabelIds: ['vaddi', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Bhoyudu', 'Bhoyilu', 'Pedda-Bhoyudu', 'Kalinga-Andhra Terminology', 'Requires Historical Verification'],
  },
  {
    order: 71,
    id: 'ref74_71_bhoyilu',
    canonicalTerm: 'Bhoyilu',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Bhoyilu',
      'भोयिलु (Bhoyilu)',
      'భోయిలు (Bhoyilu)',
      'ಭೋಯಿಲು (Bhoyilu)',
      'போயிலு (Bhoyilu)',
      'भोयिलु (Bhoyilu)',
      'ଭୋଇଲୁ (Bhoyilu)',
      'ভোইলো (Bhoyilu)'
    ),
    multilingualSearchAliases: ['Bhoyilu', 'భోయిలు', 'भोयिलु', 'ಭೋಯಿಲು', 'போயிலு', 'ଭୋଇଲୁ', 'ভোইলো'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #26 (of 29) [Research Required / Do Not Automatically Conflate]: Aspirated Telugu plural/collective designation (భోయిలు, with Telugu plural suffix "-lu") corresponding to singular Bhoyudu in Kalinga-Andhra and eastern Deccan records. Maintained as a distinct reference entry requiring archival verification rather than automatic conflation with Bhoi, Boyar, or Voddar.',
      'पूरक संदर्भ #26 (29 में से) [ऐतिहासिक सत्यापन आवश्यक — स्वतः विलय न करें]: एकवचन भोयुडु से संबंधित तेलुगु बहुवचन/सामूहिक पदनाम (भोयिलु / భోయిలు)। इसे भोई, बोयर या वोड्डर के साथ स्वतः विलय किए बिना अलग संदर्भ प्रविष्टि के रूप में रखा गया है।',
      'అనుబంధ రిఫరెన్స్ #26 [చారిత్రక ధృవీకరణ అవసరం — స్వయంచాలకంగా విలీనం చేయవద్దు]: భోయుడు అనే పదానికి తెలుగు బహువచన రూపం (భోయిలు / Bhoyilu). నిర్దిష్ట చారిత్రక ఆధారాలు లేకుండా ఇతర సమూహాలతో స్వయంచాలకంగా విలీనం చేయకుండా ప్రత్యేక రిఫరెన్స్‌గా నమోదు చేయబడింది.',
      'ಪೂರಕ ಉಲ್ಲೇಖ #26 [ಐತಿಹಾಸಿಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ]: ಭೋಯುಡು ಪದದ ತೆಲುಗು ಬಹುವಚನ ರೂಪ (ಭೋಯಿಲು / Bhoyilu). ಪ್ರತ್ಯೇಕ ಉಲ್ಲೇಖವಾಗಿ ದಾಖಲಿಸಲಾಗಿದ್ದು, ಇತರ ಸಮುದಾಯಗಳೊಂದಿಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವಿಲೀನಗೊಳಿಸಬಾರದು.',
      'கூடுதல் குறிப்பு #26 [வரலாற்றுச் சரிபார்ப்பு தேவை]: போயுடு என்பதன் தெலுங்கு பன்மை வடிவம் (போயிலு / Bhoyilu). தகுந்த வரலாற்றுச் சான்றின்றி பிற சமூகங்களுடன் இணைக்கப்படாது.',
      'पूरक संदर्भ #26 [ऐतिहासिक पडताळणी आवश्यक]: भोयुडु या शब्दाचे तेलुगू बहुवचनी रूप (भोयिलु / Bhoyilu). पुराव्याशिवाय इतर कोणत्याही समाजाशी एकत्र केले जात नाही.',
      'ଅତିରିକ୍ତ ରେଫରେନ୍ସ #26 [ଐତିହାସିକ ଯାଞ୍ଚ ଆବଶ୍ୟକ]: ଭୋୟୁଡ଼ୁ ଶବ୍ଦର ତେଲୁଗୁ ବହୁବଚନ ରୂପ (ଭୋଇଲୁ / Bhoyilu)। ପ୍ରମାଣ ବିନା ଅନ୍ୟ ସମ୍ପ୍ରଦାୟ ସହ ମିଶ୍ରଣ କରାযିବ ନାହିଁ।',
      'সম্পূরক রেফারেন্স #26 [ঐতিহাসিক যাচাইকরণ প্রয়োজন]: ভোয়ুডু পদের তেলুগু বহুবচন রূপ (ভোইলো / Bhoyilu)। প্রামাণ্য তথ্য ছাড়া অন্য সম্প্রদায়ের সাথে একত্রিত করা হয় না।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_09_vaddi'],
    relatedProminentLabelIds: ['vaddi', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Bhoyilu', 'Bhoyudu', 'Pedda-Bhoyudu', 'Telugu Plural Form', 'Requires Historical Verification'],
  },
  {
    order: 72,
    id: 'ref74_72_boyidu',
    canonicalTerm: 'Boyidu',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Boyidu',
      'बोयिडु (Boyidu)',
      'బోయిడు (Boyidu)',
      'ಬೋಯಿಡು (Boyidu)',
      'போயிடு (Boyidu)',
      'बोयिडु (Boyidu)',
      'ବୋଇଡ଼ୁ (Boyidu)',
      'বোইডু (Boyidu)'
    ),
    multilingualSearchAliases: ['Boyidu', 'బోయిడు', 'बोयिडु', 'ಬೋಯಿಡು', 'போயிடு', 'ବୋଇଡ଼ୁ', 'বোইডু'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #27 (of 29) [Research Required / Do Not Automatically Conflate]: Unaspirated Telugu singular masculine variant (బోయిడు, with initial "B-" and suffix "-du"). Because unaspirated "Boya / Boyidu" forms also occur in distinct Telugu/Rayalaseema communities (such as Boya/Valmiki and Besta), this entry carries a strict methodological boundary against automatic conflation.',
      'पूरक संदर्भ #27 (29 में से) [ऐतिहासिक सत्यापन आवश्यक — स्वतः विलय न करें]: अल्पप्राण तेलुगु एकवचन पुल्लिंग रूप (बोयिडु / బోయిడు)। चूंकि यह रूप अन्य अलग तेलुगु समुदायों में भी प्रयुक्त हो सकता है, इसलिए बिना साक्ष्य के स्वतः विलय निषिद्ध है।',
      'అనుబంధ రిఫరెన్స్ #27 [చారిత్రక ధృవీకరణ అవసరం — స్వయంచాలకంగా విలీనం చేయవద్దు]: అల్పప్రాణ "బ" కారంతో కూడిన తెలుగు ఏకవచన రూపం (బోయిడు / Boyidu). బోయ/వాల్మీకి లేదా బెస్త వంటి ఇతర విభిన్న సామాజిక వర్గాలతో గందరగోళం లేకుండా, నిర్దిష్ట చారిత్రక ఆధారాలు ఉన్నప్పుడే అనుసంధానించాలి.',
      'ಪೂರಕ ಉಲ್ಲೇಖ #27 [ಐತಿಹಾಸಿಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ]: ಅಲ್ಪಪ್ರಾಣ "ಬ" ಅಕ್ಷರದ ತೆಲುಗು ಏಕವಚನ ರೂಪ (ಬೋಯಿಡು / Boyidu). ಇತರ ಸಮುದಾಯಗಳೊಂದಿಗೆ ಗೊಂದಲವಾಗದಂತೆ ಪ್ರತ್ಯೇಕವಾಗಿ ಪರಿಶೀಲಿಸಬೇಕು.',
      'கூடுதல் குறிப்பு #27 [வரலாற்றுச் சரிபார்ப்பு தேவை]: தெலுங்கு ஒருமை வடிவம் (போயிடு / Boyidu). பிற சமூகங்களுடன் குழப்பமின்றி வரலாற்று ஆதாரத்துடன் மட்டுமே அணுகப்பட வேண்டும்.',
      'पूरक संदर्भ #27 [ऐतिहासिक पडताळणी आवश्यक]: तेलुगू एकवचनी रूप (बोयिडु / Boyidu). इतर भिन्न समाजांशी गल्लत होऊ नये म्हणून स्वतंत्र पडताळणी आवश्यक आहे.',
      'ଅତିରିକ୍ତ ରେଫରେନ୍ସ #27 [ଐତିହାସିକ ଯାଞ୍ଚ ଆବଶ୍ୟକ]: ତେଲୁଗୁ ଏକବଚନ ରୂପ (ବୋଇଡ଼ୁ / Boyidu)। ଅନ୍ୟ ପୃଥକ ସମ୍ପ୍ରଦାୟ ସହ ମିଶ୍ରଣ ନ କରି ସ୍ୱତନ୍ତ୍ର ଯାଞ୍ଚ ଆବଶ୍ୟକ।',
      'সম্পূরক রেফারেন্স #27 [ঐতিহাসিক যাচাইকরণ প্রয়োজন]: তেলুগু একবচন রূপ (বোইডু / Boyidu)। অন্যান্য পৃথক সম্প্রদায়ের সাথে বিভ্রান্তি এড়াতে সুনির্দিষ্ট ঐতিহাসিক যাচাইকরণ আবশ্যক।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_09_vaddi'],
    relatedProminentLabelIds: ['vaddi', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Boyidu', 'Boyilu', 'Bhoyudu', 'Orthographic Variant', 'Requires Historical Verification'],
  },
  {
    order: 73,
    id: 'ref74_73_boyilu',
    canonicalTerm: 'Boyilu',
    datasetGroup: 'supplementary_25',
    classification: 'Unverified or uncertain associations',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Boyilu',
      'बोयिलु (Boyilu)',
      'బోయిలు (Boyilu)',
      'ಬೋಯಿಲು (Boyilu)',
      'போயிலு (Boyilu)',
      'बोयिलु (Boyilu)',
      'ବୋଇଲୁ (Boyilu)',
      'বোইলো (Boyilu)'
    ),
    multilingualSearchAliases: ['Boyilu', 'బోయిలు', 'बोयिलु', 'ಬೋಯಿಲು', 'போயிலு', 'ବୋଇଲୁ', 'বোইলো'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #28 (of 29) [Research Required / Do Not Automatically Conflate]: Unaspirated Telugu plural/collective variant (బోయిలు, with suffix "-lu") corresponding to singular Boyidu. Indexed separately with a strict non-conflation requirement so distinct regional communities are never artificially merged.',
      'पूरक संदर्भ #28 (29 में से) [ऐतिहासिक सत्यापन आवश्यक — स्वतः विलय न करें]: एकवचन बोयिडु का तेलुगु बहुवचन रूप (बोयिलु / బోయిలు)। विभिन्न क्षेत्रीय समुदायों के कृत्रिम विलय को रोकने के लिए इसे सख्त सत्यापन नियम के साथ अलग सूचीबद्ध किया गया है।',
      'అనుబంధ రిఫరెన్స్ #28 [చారిత్రక ధృవీకరణ అవసరం — స్వయంచాలకంగా విలీనం చేయవద్దు]: బోయిడు అనే పదానికి తెలుగు బహువచన రూపం (బోయిలు / Boyilu). విభిన్న సామాజిక వర్గాలను కృత్రిమంగా విలీనం చేయకుండా ఉండేందుకు ప్రత్యేక పరిశోధనా సూచనతో చేర్చబడింది.',
      'ಪೂರಕ ಉಲ್ಲೇಖ #28 [ಐತಿಹಾಸಿಕ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ]: ಬೋಯಿಡು ಪದದ ತೆಲುಗು ಬಹುವಚನ ರೂಪ (ಬೋಯಿಲು / Boyilu). ವಿಭಿನ್ನ ಸಮುದಾಯಗಳನ್ನು ಕೃತಕವಾಗಿ ವಿಲೀನಗೊಳಿಸದಂತೆ ಪ್ರತ್ಯೇಕವಾಗಿ ಇರಿಸಲಾಗಿದೆ.',
      'கூடுதல் குறிப்பு #28 [வரலாற்றுச் சரிபார்ப்பு தேவை]: போயிடு என்பதன் தெலுங்கு பன்மை வடிவம் (போயிலு / Boyilu). வெவ்வேறு சமூகங்களைத் தானாக இணைக்காமல் தனித்தனியாக ஆவணப்படுத்தப்பட்டுள்ளது.',
      'पूरक संदर्भ #28 [ऐतिहासिक पडताळणी आवश्यक]: बोयिडु या शब्दाचे तेलुगू बहुवचनी रूप (बोयिलु / Boyilu). भिन्न समाजांचे कृत्रिम एकत्रीकरण टाळण्यासाठी स्वतंत्रपणे नोंदवले आहे.',
      'ଅତିରିକ୍ତ ରେଫରେନ୍ସ #28 [ଐତିହାସିକ ଯାଞ୍ଚ ଆବଶ୍ୟକ]: ବୋଇଡ଼ୁ ଶବ୍ଦର ତେଲୁଗୁ ବହୁବଚନ ରୂପ (ବୋଇଲୁ / Boyilu)। ଭିନ୍ନ ସମ୍ପ୍ରଦାୟଗୁଡ଼ିକର କୃତ୍ରିମ ମିଶ୍ରଣ ଏଡ଼ାଇବା ପାଇଁ ପୃଥକ ଭାବେ ସୂଚୀবଦ୍ଧ।',
      'সম্পূরক রেফারেন্স #28 [ঐতিহাসিক যাচাইকরণ প্রয়োজন]: বোইডু পদের তেলুগু বহুবচন রূপ (বোইলো / Boyilu)। বিভিন্ন সম্প্রদায়ের কৃত্রিম একত্রীকরণ রোধে আলাদাভাবে নথিভুক্ত।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_09_vaddi'],
    relatedProminentLabelIds: ['vaddi', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Boyilu', 'Boyidu', 'Bhoyilu', 'Telugu Plural Variant', 'Requires Historical Verification'],
  },
  {
    order: 74,
    id: 'ref74_74_pedda_bhoyudu',
    canonicalTerm: 'Pedda-Bhoyudu',
    datasetGroup: 'supplementary_25',
    classification: 'Historical and royal titles',
    verificationStatus: 'Requires Historical Verification — Do Not Conflate',
    requiresVerification: true,
    localizedLabel: makeLangMap(
      'Pedda-Bhoyudu',
      'पेद्दा-भोयुडु (Pedda-Bhoyudu)',
      'పెద్ద-భోయుడు (Pedda-Bhoyudu)',
      'ಪೆದ್ದ-ಭೋಯುಡು (Pedda-Bhoyudu)',
      'பெத்த-போயுடு (Pedda-Bhoyudu)',
      'पेद्दा-भोयुडु (Pedda-Bhoyudu)',
      'ପେଦ୍ଦା-ଭୋୟୁଡ଼ୁ (Pedda-Bhoyudu)',
      'পেদ্দা-ভোয়ুডু (Pedda-Bhoyudu)'
    ),
    multilingualSearchAliases: ['Pedda-Bhoyudu', 'Pedda Bhoyudu', 'Peddabhoyudu', 'పెద్ద-భోయుడు', 'పెద్ద భోయుడు', 'पेद्दा-भोयुडु', 'ಪೆದ್ದ-ಭೋಯುಡು', 'பெத்த-போயுடு', 'ପେଦ୍ଦା-ଭୋୟୁଡ଼ୁ'],
    historicalContextNote: makeLangMap(
      'Supplementary Reference #29 (of 29) [Traditional Headman / Elder Title — Verification Required]: Compound Telugu honorific title combining "Pedda" (Elder, Chief, Headman, or Senior) + "Bhoyudu", denoting a traditional community headman (Kulapedda), village/guild chief, or senior local administrative officer in Kalinga-Andhra and Telugu regional usage. Requires specific regional and documentary verification before associating with any broader community.',
      'पूरक संदर्भ #29 (29 में से) [पारंपरिक मुखिया / वरिष्ठ उपाधि — सत्यापन आवश्यक]: "पेद्दा" (वरिष्ठ/मुखिया/प्रमुख) और "भोयुडु" से बनी संयुक्त तेलुगु सम्मानसूचक उपाधि (पेद्दा-भोयुडु / పెద్ద-భోయుడు), जो पारंपरिक सामुदायिक मुखिया या श्रेणी प्रमुख को दर्शाती है। किसी भी व्यापक समुदाय से जोड़ने से पूर्व क्षेत्रीय और दस्तावेजी सत्यापन आवश्यक है।',
      'అనుబంధ రిఫరెన్స్ #29 [సాంప్రదాయ పెద్ద / నాయకత్వ బిరుదు — చారిత్రక ధృవీకరణ అవసరం]: "పెద్ద" (కులపెద్ద / గ్రామ పెద్ద / నాయకుడు) మరియు "భోయుడు" కలయికతో ఏర్పడిన గౌరవ వాచకం (పెద్ద-భోయుడు / Pedda-Bhoyudu). ఇది సాంప్రదాయ పెద్దను లేదా స్థానిక నాయకుని సూచిస్తుంది; నిర్దిష్ట చారిత్రక ఆధారాలు ఉన్నప్పుడే ఇతర సమూహాలతో అనుసంధానించాలి.',
      'ಪೂರಕ ಉಲ್ಲೇಖ #29 [ಸಾಂಪ್ರದಾಯಿಕ ಮುಖ್ಯಸ್ಥರ ಬಿರುದು — ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ]: "ಪೆದ್ದ" (ಹಿರಿಯ/ಮುಖ್ಯಸ್ಥ) ಮತ್ತು "ಭೋಯುಡು" ಸೇರಿದ ಗೌರವ ಬಿರುದು (ಪೆದ್ದ-ಭೋಯುಡು / Pedda-Bhoyudu). ನಿರ್ದಿಷ್ಟ ದಾಖಲಾತಿ ಪರಿಶೀಲನೆಯಿಲ್ಲದೆ ಇತರ ಸಮುದಾಯಗಳೊಂದಿಗೆ ವಿಲೀನಗೊಳಿಸಬಾರದು.',
      'கூடுதல் குறிப்பு #29 [பாரம்பரியத் தலைவர் பட்டம் — சரிபார்ப்பு தேவை]: "பெத்த" (மூத்தவர்/தலைவர்) மற்றும் "போயுடு" இணைந்த மரியாதைப் பட்டம் (பெத்த-போயுடு / Pedda-Bhoyudu). தகுந்த ஆவணச் சரிபார்ப்பின்றி பிற சமூகங்களுடன் இணைக்கக் கூடாது.',
      'पूरक संदर्भ #29 [पारंपारिक प्रमुख पदवी — पडताळणी आवश्यक]: "पेद्दा" (वरिष्ठ/प्रमुख) आणि "भोयुडु" यांनी बनलेली सन्मानदर्शक पदवी (पेद्दा-भोयुडु / Pedda-Bhoyudu). ठोस पुराव्याशिवाय इतर समाजांशी जोडू नये.',
      'ଅତିରିକ୍ତ ରେଫରେନ୍ସ #29 [ପାରମ୍ପରିକ ମୁଖିଆ ଉପାଧି — ଯାଞ୍ଚ ଆବଶ୍ୟକ]: "ପେଦ୍ଦା" (ମୁଖିଆ/ବରିଷ୍ଠ) ଓ "ଭୋୟୁଡ଼ୁ" সংযୁକ୍ତ ସମ୍ମାନସୂଚକ ଉପାଧି (ପେଦ୍ଦା-ଭୋୟୁଡ଼ୁ / Pedda-Bhoyudu)। ପ୍ରମାଣ ବିନା ଅନ୍ୟ ସମ୍ପ୍ରଦାୟ ସହ ମିଶ୍ରଣ କରାଯିବ ନାହିଁ।',
      'সম্পূরক রেফারেন্স #29 [ঐতিহ্যবাহী প্রধান উপাধি — যাচাইকরণ প্রয়োজন]: "পেদ্দা" (প্রধান/জ্যেষ্ঠ) এবং "ভোয়ুডু" সমন্বিত সম্মানসূচক উপাধি (পেদ্দা-ভোয়ুডু / Pedda-Bhoyudu)। সুনির্দিষ্ট ঐতিহাসিক প্রমাণ ছাড়া অন্য সম্প্রদায়ের সাথে একত্রিত করা যাবে না।'
    ),
    primaryTargetLink: '/community-heritage?tab=synonyms&id=comm_dir_04_kalingarajulu',
    relatedHeritageIds: ['comm_dir_04_kalingarajulu', 'comm_dir_09_vaddi', 'comm_dir_12_vaddirajulu'],
    relatedProminentLabelIds: ['vaddi', 'vaddi_rajulu', 'branch_kalinga'],
    relatedTopicsAndKeywords: ['Pedda-Bhoyudu', 'Bhoyudu', 'Bhoyilu', 'Traditional Headman Title', 'Requires Historical Verification'],
  },
];

export const CLASSIFICATION_ORDER: ReferenceTermClassification[] = [
  'Community names',
  'Regional identities',
  'Alternate spellings',
  'Historical and royal titles',
  'Occupational or traditional subdivisions',
  'Unverified or uncertain associations',
];

export function normalizeReferenceSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[-_/.(),]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchReference70Terms(query: string): Reference70Entry[] {
  const qRaw = query.trim().toLowerCase();
  const qNorm = normalizeReferenceSearchText(query);
  if (!qNorm) return [];

  return MASTER_70_REFERENCE_REGISTRY.filter((entry) => {
    const canonicalLow = entry.canonicalTerm.toLowerCase();
    const canonicalNorm = normalizeReferenceSearchText(entry.canonicalTerm);
    if (canonicalLow.includes(qRaw) || canonicalNorm.includes(qNorm) || qNorm.includes(canonicalNorm)) {
      return true;
    }

    for (const alias of entry.multilingualSearchAliases) {
      const aliasLow = alias.toLowerCase();
      const aliasNorm = normalizeReferenceSearchText(alias);
      if (aliasLow.includes(qRaw) || aliasNorm.includes(qNorm) || (aliasNorm.length >= 3 && qNorm.includes(aliasNorm))) {
        return true;
      }
    }

    for (const kw of entry.relatedTopicsAndKeywords) {
      const kwNorm = normalizeReferenceSearchText(kw);
      if (kwNorm.includes(qNorm)) {
        return true;
      }
    }

    return false;
  });
}

export function getRelated70TermsForHeritageItem(itemId: string): Reference70Entry[] {
  return MASTER_70_REFERENCE_REGISTRY.filter((entry) => entry.relatedHeritageIds.includes(itemId));
}

export function getRelated70TermsForProminentLabel(labelId: SearchableCommunityLabelId): Reference70Entry[] {
  return MASTER_70_REFERENCE_REGISTRY.filter((entry) => entry.relatedProminentLabelIds.includes(labelId));
}
