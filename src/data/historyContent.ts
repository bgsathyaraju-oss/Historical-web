import type { LanguageCode } from '../types/index.ts';

export interface MultilingualText {
  en: string;
  hi?: string;
  te?: string;
  kn?: string;
  ta?: string;
  mr?: string;
  or?: string;
  bn?: string;
}

export interface HistoricalFigureSummary {
  id: string;
  canonical_name: string;
  localized_name: MultilingualText;
  alternate_names: string[];
  dynasty_lineage: string;
  era: string;
  reign_or_dates: string;
  epigraphic_status: 'Documented Primary Epigraphy' | 'Traditional Lineage Record' | 'Living Sacred Tradition';
  image_url: string;
  titles: MultilingualText;
  summary: MultilingualText;
  detailed_narrative: MultilingualText;
  engineering_and_civic_legacy: MultilingualText;
  associated_places: string[];
  canonical_sources: string[];
}

export type DesignationGroup =
  | 'Dynastic and lineage designations'
  | 'Regional community designations'
  | 'Historical, martial, and traditional titles';

export type EpistemicClassification =
  | 'Documented Epigraphic & Historical Designation'
  | 'Regional Ethnonym & Gazetteer Record'
  | 'Community Tradition & Lineage Claim';

export interface CommunitySynonym {
  id: string;
  title: string;
  native_scripts: Record<string, string>;
  category: 'Royal Nobility' | 'Kshatriya Martial' | 'Civic & Water Engineering' | 'Regional Dialectal Shift' | 'Classical Epigraphic Root';
  designation_group: DesignationGroup;
  geographical_association: string;
  epistemic_classification: EpistemicClassification;
  epistemic_note: MultilingualText;
  primary_regions: string[];
  prominent_states: string[];
  linguistic_origin: string;
  historical_role: MultilingualText;
  sacred_associations: string[];
}

export interface GeographicalSpreadRegion {
  id: string;
  region_name: string;
  localized_region: MultilingualText;
  states_and_territories: string[];
  prominent_cities_districts: string[];
  predominant_community_synonyms: string[];
  migration_epoch_and_corridor: string;
  historical_forts_and_landmarks: string[];
  sacred_centers: string[];
  regional_overview: MultilingualText;
}

export interface HistoricalMonographSection {
  id: string;
  order: number;
  section_title: MultilingualText;
  content: MultilingualText;
  key_points: string[];
}

// ---------------------------------------------------------------------------
// 1. PROGENITORS & HISTORICAL FIGURES REPOSITORY
// ---------------------------------------------------------------------------
export const HISTORICAL_FIGURES: HistoricalFigureSummary[] = [
  {
    id: 'fig_samrat_sagara',
    canonical_name: 'King Samrat Sagara',
    localized_name: {
      en: 'King Samrat Sagara',
      hi: 'चक्रवर्ती सम्राट सगर',
      te: 'చక్రవర్తి సగరుడు',
      kn: 'ಸಾಮ್ರಾಟ್ ಸಗರ ರಾಜ',
      ta: 'பேரரசர் சாகரன்',
      mr: 'चक्रवर्ती सम्राट सगर',
      or: 'ସମ୍ରାଟ ସଗର',
      bn: 'সম্রাট সগর'
    },
    alternate_names: ['Emperor Sagara', 'Chakravartin Sagara', 'Raja Sagara', 'Sagara Maharaju'],
    dynasty_lineage: 'Ikshvaku Suryavamsha (Solar Dynasty of Ayodhya)',
    era: 'Treta Yuga / Vedic Puranic Antiquity',
    reign_or_dates: 'Primordial Epic Era',
    epigraphic_status: 'Traditional Lineage Record',
    image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Chakravartin Emperor of Ayodhya • Primordial Excavator of the Ocean (Sagara) • Suryavamshi Progenitor',
      hi: 'अयोध्या के चक्रवर्ती सम्राट • महासागर के आद्य खनक • सूर्यवंशी क्षत्रिय आदि-पुरुष',
      te: 'అయోధ్య చక్రవర్తి సామ్రాట్ • సముద్ర ఖనన ఆది ప్రవర్తకుడు • సూర్యవంశ ఆద్య పితామహుడు',
      kn: 'ಅಯೋಧ್ಯೆಯ ಚಕ್ರವರ್ತಿ ಸಾಮ್ರಾಟ್ • ಸಾಗರ ನಿರ್ಮಾಣದ ಆದಿ ಪಿತಾಮಹ • ಸೂರ್ಯವಂಶಿ ಕುಲದೀಪಕ',
      ta: 'அயோத்தியின் சக்கரவர்த்தி பேரரசர் • சமுத்திர அகழ்வாராய்ச்சியின் ஆதி மன்னர்',
      mr: 'अयोध्या नगरीचे चक्रवर्ती सम्राट • सागर निर्मितीचे आद्य जनक • सूर्यवंशी कुलदीपक',
      or: 'ଅଯୋଧ୍ୟାର ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ • ମହାସାଗର ଖନନର ପ୍ରେରଣା • ସୂର୍ଯ୍ୟବଂଶୀ ଆଦ୍ୟ ପୁରୁଷ',
      bn: 'অযোধ্যার চক্রবর্তী সম্রাট • পৌরাণিক সাগর খননের আদি পিতা'
    },
    summary: {
      en: 'Samrat Sagara was the celebrated Chakravartin emperor of Ayodhya belonging to the Ikshvaku Solar race. Famed in the Ramayana, Mahabharata, and Vishnu Purana for performing 99 Ashvamedha sacrifices, his sixty thousand sons excavated immense oceanic basins, giving the sea its name "Sagara". The Oad-Rajput, Od-Kshatriya, and VaddeRajulu communities venerate King Sagara as their primordial royal solar progenitor whose descendants inherited the sacred calling of vast earth sculpting, canal excavation, and righteous sovereignty.',
      hi: 'सम्राट सगर अयोध्या के प्रख्यात सूर्यवंशी चक्रवर्ती सम्राट थे। रामायण, महाभारत और विष्णु पुराण के अनुसार उन्होंने 99 अश्वमेध यज्ञ संपन्न किए। उनके साठ हजार पुत्रों ने यज्ञ के अश्व की खोज में संपूर्ण पृथ्वी और महासागर की खुदाई की, जिससे समुद्र का नाम "सागर" पड़ा। ओड-राजपूत, ओड-क्षत्रिय और वड्डेराजुलु समाज सम्राट सगर को अपना आदि पूर्वज मानता है।',
      te: 'చక్రవర్తి సగరుడు ప్రాచీన అయోధ్య ఇక్ష్వాకు సూర్యవంశ చక్రవర్తి. రామాయణ, మహాభారత పురాణాల ప్రకారం 99 అశ్వమేధ యజ్ఞాలు నిర్వహించారు. ఆయన అరవై వేల మంది కుమారులు అశ్వాన్ని వెతుకుతూ మహాసముద్ర పరివాహక నేలను తవ్వడం వల్ల సముద్రానికి "సాగరం" అనే పేరు వచ్చింది. ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ మరియు వడ్డెరాజుల వంశాలు సగరుని తమ ఆద్య మూలపురుషుడిగా కీర్తిస్తాయి.',
      kn: 'ಸಾಮ್ರಾಟ್ ಸಗರನು ಅಯೋಧ್ಯೆಯ ಶ್ರೇಷ್ಠ ಸೂರ್ಯವಂಶಿ ಚಕ್ರವರ್ತಿಯಾಗಿದ್ದು, ೯೯ ಅಶ್ವಮೇಧ ಯಾಗಗಳನ್ನು ಕೈಗೊಂಡನು. ಯಾಗಾಶ್ವವನ್ನು ಹುಡುಕುತ್ತಾ ಅವನ ಪುತ್ರರು ಭೂಮಿಯನ್ನು ಅಗಿದು ಸಾಗರವನ್ನು ಸೃಷ್ಟಿಸಿದರು. ಒಡ್ಡರ್, ವಡ್ಡಾರ ಮತ್ತು ವಡ್ಡೇರಾಜುಲು ಸಮಾಜವು ಸಾಮ್ರಾಟ್ ಸಗರನನ್ನು ತಮ್ಮ ಆದ್ಯ ಕ್ಷತ್ರಿಯ ಪಿತಾಮಹನೆಂದು ಗೌರವಿಸುತ್ತದೆ.',
      ta: 'அயோத்தியின் புகழ்பெற்ற சூரியவம்ச சக்கரவர்த்தி சாகரன். இவரது புதல்வர்கள் பூமியைத் தோண்டி சமுத்திரத்தை உருவாக்கியதால் கடலுக்கு சாகரம் என்ற பெயர் உண்டானது. ஓட் மற்றும் சத்திரிய மரபினர் இவரை முன்னோடியாக வணங்குகின்றனர்.',
      mr: 'सम्राट सगर हे अयोध्या नगरीचे प्रख्यात सूर्यवंशी चक्रवर्ती सम्राट होते. त्यांनी ९९ अश्वमेध यज्ञ केले. त्यांच्या पुत्रांनी समुद्राचे विशाल खनन केले. ओड-राजपूत आणि वडार समाज त्यांना आपले आद्य पूज्य पूर्वज मानतो.',
      or: 'ସମ୍ରାଟ ସଗର ଅଯୋଧ୍ୟାର ପ୍ରାଚୀନ ସୂର୍ଯ୍ୟବଂଶୀ ଚକ୍ରବର୍ତ୍ତୀ ଥିଲେ। ୯୯ଟି ଅଶ୍ୱମେଧ ଯଜ୍ଞ ଓ ମହାସାଗର ଖନନର ପୌରାଣିକ ଆଦ୍ୟ ପ୍ରବର୍ତ୍ତକ। ଓଡ଼-କ୍ଷତ୍ରିୟ ସମାଜ ତାଙ୍କୁ କୁଳଗୌରବ ଭାବେ ପୂଜା କରେ।',
      bn: 'সম্রাট সগর অযোধ্যার প্রখ্যাত সূর্যবংশীয় চক্রবর্তী নরপতি। তিনি ৯৯টি অশ্বমেধ যজ্ঞ করেন এবং তাঁর পুত্ররা মহাসাগর খনন করেন। ওড-রাজপুত ও সমগোত্রীয় সমাজের আদি পূর্বপুরুষ।'
    },
    detailed_narrative: {
      en: 'In epic literature (Valmiki Ramayana, Balakanda, Sargas 38–41), King Sagara brought prosperity, law, and universal righteousness to Ayodhya. When the consecrated sacrificial horse for his hundredth Ashvamedha was abducted by Indra, Sagara directed his sons to systematically excavate the surface of the earth until they discovered it at the hermitage of sage Kapila. The collective memory of this monumental subterranean excavation became intertwined with the dynastic memory of builder and warrior clans tasked with earthwork, moat digging, and canal building.',
      hi: 'वाल्मीकि रामायण के बालकांड के अनुसार, सम्राट सगर ने अयोध्या में धर्म-राज्य की स्थापना की। सौवें अश्वमेध के अश्व की खोज में सगर-पुत्रों द्वारा किए गए विराट भूमि-खनन ने भारतीय जनमानस में भू-अभियांत्रिकी और दृढ़ संकल्प की एक अमर गाथा स्थापित की, जो ओड समाज की स्थापत्य व शौर्य स्मृति का मूलाधार है।',
      te: 'వాల్మీకి రామాయణ బాలకాండ ప్రకారం సగర చక్రవర్తి ధర్మపాలనకు ప్రతిరూపం. అశ్వమేధ యజ్ఞ క్రతువులో భూమిని తవ్విన వృత్తాంతం ప్రాచీన భారతదేశంలో జల, దుర్గ నిర్మాణ పరంపరకు పౌరాణిక ప్రతీకగా నిలిచింది.',
      kn: 'ವಾಲ್ಮೀಕಿ ರಾಮಾಯಣದ ಪ್ರಕಾರ ಸಗರ ರಾಜನ ಧರ್ಮಪಾಲನೆ ಹಾಗೂ ಭೂಮಿ ಅಗಿಯುವಿಕೆಯ ಕಥೆಯು ಕಾಲುವೆ ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣದ ಕ್ಷತ್ರಿಯ ಕಾಯಕಕ್ಕೆ ಪೌರಾಣಿಕ ಪ್ರೇರಣೆಯಾಗಿದೆ.',
      ta: 'வால்மீகி ராமாயணத்தில் சகர மன்னனின் அஸ்வமேத யாகமும் சமுத்திர உருவாக்கமும் விரிவாக விவரிக்கப்பட்டுள்ளன.',
      mr: 'वाल्मीकि रामायणातील बालकांडानुसार सम्राट सगरांच्या पुत्रांचे पृथ्वी-खनन हे भू-अभियांत्रिकी आणि शौर्याचे अमर प्रतीक मानले जाते.',
      or: 'ବାଲ୍ମୀକି ରାମାୟଣ ଅନୁଯାୟୀ ସମ୍ରାଟ ସଗରଙ୍କ ଧର୍ମରାଜ୍ୟ ଓ ପୃଥିବୀ ଖନନର ଇତିହାସ ଓଡ଼ ସମାଜର ମୂଳ ସ୍ମୃତିରେ ଅନ୍ତର୍ନିହିତ।',
      bn: 'বাল্মীকি রামায়ণের বালকাণ্ডে বর্ণিত সম্রাট সগরের কীর্তি ও ভূমি খনন ওড সমাজের ঐতিহ্যবাহী স্মৃতির অন্যতম ভিত্তি।'
    },
    engineering_and_civic_legacy: {
      en: 'Regarded as the archetypal originator of earth-shifting, deep water containment, and imperial boundary defense in ancient Indian lore.',
      hi: 'प्राचीन भारतीय परंपरा में विशाल भू-खनन, जल-संग्रहण एवं सामरिक सीमा-सुरक्षा के आद्य प्रवर्तक।',
      te: 'భూఖననం, బృహత్ జలాశయాల నిర్మాణం మరియు సామ్రాజ్య రక్షణకు పౌరాణిక ఆద్య రూపం.',
      kn: 'ವಿಶಾಲ ಭೂ-ಅಗೆಯುವಿಕೆ, ಜಲಸಂಗ್ರಹ ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣದ ಪೌರಾಣಿಕ ಮೂಲಪುರುಷ.',
      ta: 'மண் அகழ்வாராய்ச்சி மற்றும் நீர்நிலை பாதுகாப்பின் முன்னோடி.',
      mr: 'विशाल भू-खनन, तलाव निर्मिती आणि सीमारक्षणाचे पौराणिक जनक.',
      or: 'ବିଶାଳ ଜଳାଶୟ ଖନନ ଓ ଦୁର୍ଗ ରକ୍ଷାର ପୌରାଣିକ ପ୍ରତୀକ।',
      bn: 'বিশাল জলাধার খনন ও দুর্গ প্রতিরক্ষা ব্যবস্থার পৌরাণিক পথপ্রদর্শক।'
    },
    associated_places: ['Ayodhya', 'Kapila Ashrama', 'Gangasagar', 'Patala Ganga'],
    canonical_sources: ['Valmiki Ramayana (Balakanda Sarga 38-41)', 'Vishnu Purana (Book IV Ch 4)', 'Mahabharata (Vana Parva)']
  },
  {
    id: 'fig_maharshi_bhagiratha',
    canonical_name: 'Maharshi Raja Bhagiratha',
    localized_name: {
      en: 'Maharshi Raja Bhagiratha',
      hi: 'महर्षि राजर्षि भगीरथ',
      te: 'మహర్షి రాజ భగీరథుడు',
      kn: 'ಮಹರ್ಷಿ ರಾಜ ಭಗೀರಥ',
      ta: 'மகரிஷி பகீரதன்',
      mr: 'महर्षी राजर्षी भगीरथ',
      or: 'ମହର୍ଷି ରାଜା ଭଗୀରଥ',
      bn: 'মহর্ষি রাজা ভগীরথ'
    },
    alternate_names: ['King Bhagiratha', 'Rajarshi Bhagiratha', 'Bhagiratha Maharaju', 'Bhagirathji'],
    dynasty_lineage: 'Ikshvaku Suryavamsha (Great-grandson of Samrat Sagara)',
    era: 'Treta Yuga Antiquity',
    reign_or_dates: 'Puranic Antiquity',
    epigraphic_status: 'Traditional Lineage Record',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Rajarshi of Ayodhya • Bringer of the Sacred Ganga • Patron of Water Engineering & Perseverance',
      hi: 'अयोध्या के राजर्षि • मां गंगा के भू-अवतारी • जल-अभियांत्रिकी एवं अडिग संकल्प के आदि प्रतीक',
      te: 'అయోధ్య రాజర్షి • గంగా అవతారకుడు • జల ఇంజనీరింగ్ మరియు అకుంఠిత సంకల్ప ఆరాధ్య దైవం',
      kn: 'ಅಯೋಧ್ಯೆಯ ರಾಜರ್ಷಿ • ಗಂಗಾವತಾರಕ • ಜಲತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಅಪ್ರತಿಮ ಪರಿಶ್ರಮದ ಪಿತಾಮಹ',
      ta: 'அயோத்தியின் ராஜரிஷி • கங்கையை புவிக்கு கொணர்ந்தவர் • நீர்ப்பாசனத்தின் ஆதி வழிகாட்டி',
      mr: 'अयोध्या नगरीचे राजर्षी • गंगा-अवतारी • जलव्यवस्थापन आणि दृढनिश्चयाचे कुलदैवत',
      or: 'ଅଯୋଧ୍ୟାର ରାଜର୍ଷି • ଗଙ୍ଗାବତାରକ • ଜଳ-ପ୍ରକଳ୍ପ ଓ ଅଦମ୍ୟ ସଂକଳ୍ପର ପ୍ରେରଣା',
      bn: 'অযোধ্যার রাজর্ষি • মর্ত্যে গঙ্গা আনয়নকারী • জল-প্রকৌশলের মূল পথপ্রদর্শক'
    },
    summary: {
      en: 'Rajarshi Bhagiratha was the illustrious king of Ayodhya whose single-minded penance brought the sacred river Ganga down from the heavens to the earth to liberate his ancestors. His monumental feat gave rise to the universal idiom "Bhagiratha Prayathna" (unrelenting superhuman effort). The Oad-Rajput, Odde, Waddar, and VaddeRajulu communities hold Bhagiratha in supreme reverence as their great civil-engineering, reservoir-excavating, and canal-building royal ancestor.',
      hi: 'राजर्षि भगीरथ अयोध्या के सूर्यवंशी राजा थे। उनके अदम्य तप और पुरुषार्थ से स्वर्ग की पावन गंगा पृथ्वी पर अवतरित हुई, जिससे सगर के साठ हजार पुत्रों का उद्धार हुआ। उनके इसी अद्वितीय परिश्रम से "भगीरथ प्रयास" मुहावरा जन्मा। ओड-राजपूत, ओड्डे, वड्डार और वड्डेराजुलु समुदाय भगीरथ को अपने जल-प्रबंधन, कूप-तड़ाग खनन और अटूट संकल्प का पूज्य जनक मानते हैं।',
      te: 'రాజర్షి భగీరథుడు సగర చక్రవర్తి ప్రపౌత్రుడు. తన అకుంఠిత తపస్సుతో ఆకాశ గంగను భువికి దించి అరవై వేల మంది పితృదేవతలకు సద్గతి కల్పించారు. ఆయన అసాధ్య సాధన నుండే "భగీరథ ప్రయత్నం" అనే నానుడి పుట్టింది. ఓడ్-రాజ్‌పుత్, ఒడ్డె, వడ్డార్, వడ్డెరాజుల వర్గాలు భగీరథుని తమ పవిత్ర జల నిర్మాణ ఆరాధ్య పితామహుడిగా కొలుస్తారు.',
      kn: 'ಮಹರ್ಷಿ ಭಗೀರಥನು ಕಠೋರ ತಪಸ್ಸಿನಿಂದ ಗಂಗೆಯನ್ನು ಧರೆಗಿಳಿಸಿದ ಶ್ರೇಷ್ಠ ರಾಜ. ಇವನ ಅಪ್ರತಿಮ ಸಾಹಸದಿಂದಲೇ "ಭಗೀರಥ ಪ್ರಯತ್ನ" ಎಂಬ ನಾಣ್ಣುಡಿ ಹುಟ್ಟಿತು. ವಡ್ಡಾರ, ಒಡ್ಡರ್ ಮತ್ತು ವಡ್ಡೇರಾಜುಲು ಸಮಾಜವು ಭಗೀರಥನನ್ನು ತಮ್ಮ ಜಲ ಕಾಯಕದ ದೈವಿಕ ಸಂಕೇತವೆಂದು ಆರಾಧಿಸುತ್ತದೆ.',
      ta: 'பகீரதன் தனது மாபெரும் தவத்தின் மூலமாக தேவ கங்கையை பூமிக்குக் கொண்டு வந்து சாகர புதல்வர்களுக்கு முக்தி அளித்தார். நீர்ப்பாசன மற்றும் ஏரி அமைப்பாளர்களுக்கு இவர் மூலக் கடவுள்.',
      mr: 'राजर्षी भगीरथांच्या अथांग तपश्चर्येमुळे गंगा नदी पृथ्वीवर अवतरली. यावरून "भगीरथ प्रयत्न" हा वाक्प्रचार रूढ झाला. वडार व ओड-राजपूत समाज त्यांना जलसंधारणाचे आद्य दैवत मानतो.',
      or: 'ରାଜର୍ଷି ଭଗୀରଥଙ୍କ କଠୋର ତପସ୍ୟା ଯୋଗୁଁ ସ୍ୱର୍ଗରୁ ଗଙ୍ଗା ମର୍ତ୍ତ୍ୟକୁ ଆସିଥିଲେ। ଏଥିରୁ "ଭଗୀରଥ ପ୍ରୟାସ" କଥାର ସୃଷ୍ଟି। ଓଡ଼ ଓ ୱଡ୍ଡାର ସମାଜ ତାଙ୍କୁ ଜଳ-କାରିଗରୀର ଆଦ୍ୟଗୁରୁ ମାନନ୍ତି।',
      bn: 'মহর্ষি ভগীরথ তাঁর কঠোর তপস্যার মাধ্যমে পুণ্যতোয়া গঙ্গাকে মর্ত্যে নিয়ে আসেন। তাঁর এই কীর্তি থেকেই "ভগীরথ প্রচেষ্টা" প্রবাদের উৎপত্তি। ওড সমাজের জলসেচ প্রেরণা।'
    },
    detailed_narrative: {
      en: 'According to the Valmiki Ramayana (Balakanda Sargas 42–44), Bhagiratha left royal comforts to perform rigorous austerities in the Himalayas. He obtained Lord Shiva’s grace to cushion the torrential descent of Ganga in His matted hair, then guided the majestic river across northern and eastern plains all the way to Gangasagar. This archetypal narrative of channel excavation, water redirection, and public welfare represents the spiritual ethos of the Oad-Rajput and Waddar clans who specialized in cutting canals through rocky terrains and building reservoirs across India.',
      hi: 'वाल्मीकि रामायण के अनुसार, भगीरथ ने हिमालय में कठोर तपस्या कर भगवान शिव को प्रसन्न किया ताकि गंगा के वेग को उनकी जटाओं में नियंत्रित किया जा सके। तत्पश्चात वे गंगा को समतल मैदानों से होते हुए पूर्व में सागर तक ले गए। यह जल-नहर निर्माण और लोक-कल्याण का शाश्वत आदर्श है जिसे ओड समाज ने युगों-युगों तक दुर्गों और तालाबों के निर्माण में साकार किया।',
      te: 'హిమాలయాలలో శివుని మెప్పించి గంగను భూమిపైకి తెచ్చిన భగీరథుని గాథ జల ప్రవాహాల మళ్లింపునకు, కాలువల నిర్మాణానికి ఆద్య నమూనాగా నిలుస్తుంది.',
      kn: 'ಶಿವನ ಜಟೆಯಿಂದ ಗಂಗೆಯನ್ನು ಕರೆತಂದು ದೇಶದಾದ್ಯಂತ ಕಾಲುವೆ ಹರಿಸಿದ ಭಗೀರಥನ ಕಥೆಯು ಒಡ್ಡರ್ ಕುಲಸ್ಥರ ಕಲ್ಲಿನ ಕೆರೆ, ಬಾವಿ ಮತ್ತು ಜಲಾಶಯಗಳ ನಿರ್ಮಾಣಕ್ಕೆ ಆಧ್ಯಾತ್ಮಿಕ ಶಕ್ತಿಯಾಗಿದೆ.',
      ta: 'இமயமலையில் தவமிருந்து கங்கையை பூமிக்கு வழிநடத்திய பகீரதனின் வரலாறு நீர் மேலாண்மையின் உன்னத எடுத்துக்காட்டாகும்.',
      mr: 'गंगेचा मार्ग तयार करून तिला सागरापर्यंत नेणारे भगीरथ हे कालवे व जलव्यवस्थापनाचे आद्य प्रेरक मानले जातात.',
      or: 'ଗଙ୍ଗାଙ୍କୁ ପୃଥିବୀରେ ପ୍ରବାହିତ କରି ସାଗର ସଙ୍ଗମ ପର୍ଯ୍ୟନ୍ତ ନେବାର ଐତିହାସିକ ଗାଥା ଓଡ଼୍ର କାରିଗରୀର ଆଧ୍ୟାତ୍ମିକ ଭିତ୍ତିଭୂମି।',
      bn: 'হিমালয় থেকে গঙ্গাকে প্রবাহিত করে সাগরে নিয়ে আসার ভগীরথের এই কাহিনী ওড সমাজের ঐতিহ্যবাহী খাল খনন ও জল সুরক্ষার মূল ভিত্তি।'
    },
    engineering_and_civic_legacy: {
      en: 'The universal civilizational symbol of trans-basin water diversion, perennial canal engineering, and unbending human determination.',
      hi: 'नदी-जल मोड़ने, विशाल नहर निर्माण एवं मानव संकल्प की पराकाष्ठा के सार्वभौमिक प्रतीक।',
      te: 'నదీ జలాల మళ్లింపు, బృహత్ కాలువ తవ్వకం మరియు అకుంఠిత మానవ సంకల్పానికి విశ్వజనీన ప్రతీక.',
      kn: 'ನದಿಯ ನೀರನ್ನು ತಿರುಗಿಸಿ ಕಾಲುವೆ ನಿರ್ಮಿಸುವ ಮತ್ತು ಜಲಕ್ರಾಂತಿಯ ಸಾರ್ವಕಾಲಿಕ ಸಂಕೇತ.',
      ta: 'நதிநீர் இணைப்பு மற்றும் கால்வாய் பாசனத்தின் காலத்தால் அழியாத அடையாளம்.',
      mr: 'नदीजोड, कालवे निर्मिती आणि मानवी संकल्पाचे वैश्विक प्रतीक.',
      or: 'ନଦୀର ଜଳପଥ ପରିବର୍ତ୍ତନ ଓ ଜଳସେଚନ କେନାଲ୍ ନିର୍ମାଣର ଚିରନ୍ତନ ଆଦର୍ଶ।',
      bn: 'নদী অববাহিকা সংযোগ ও অবিরত খাল খনন প্রকৌশলের প্রতীক।'
    },
    associated_places: ['Gangotri', 'Gaumukh', 'Haridwar', 'Prayagraj', 'Varanasi', 'Gangasagar'],
    canonical_sources: ['Valmiki Ramayana (Balakanda Sarga 42-44)', 'Shrimad Bhagavatam (Canto 9 Ch 9)', 'Kalidasa Raghuvamsha']
  },
  {
    id: 'fig_sri_rama',
    canonical_name: 'Maryada Purushottama Sri Rama',
    localized_name: {
      en: 'Maryada Purushottama Sri Rama',
      hi: 'मर्यादा पुरुषोत्तम श्री राम',
      te: 'మర్యాదా పురుషోత్తమ శ్రీ రామచంద్రుడు',
      kn: 'ಮರ್ಯಾದಾ ಪುರುಷೋತ್ತಮ ಶ್ರೀ ರಾಮ',
      ta: 'மரியாதா புருஷோத்தமர் ஸ்ரீ ராமர்',
      mr: 'मर्यादा पुरुषोत्तम श्री राम',
      or: 'ମର୍ଯ୍ୟାଦା ପୁରୁଷୋତ୍ତମ ଶ୍ରୀରାମଚନ୍ଦ୍ର',
      bn: 'মর্যাদা পুরুষোত্তম শ্রী রামচন্দ্র'
    },
    alternate_names: ['Ramachandra', 'Sri Rama Maharaju', 'Kodanda Rama', 'Raghunatha', 'Ayodhya-pati'],
    dynasty_lineage: 'Ikshvaku Suryavamsha (Solar Dynasty of Ayodhya)',
    era: 'Treta Yuga',
    reign_or_dates: 'Epic Antiquity',
    epigraphic_status: 'Traditional Lineage Record',
    image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Maryada Purushottama • Supreme Exemplar of Kshatriya Dharma • Ikshvaku Kula Tilaka',
      hi: 'मर्यादा पुरुषोत्तम • क्षत्रिय धर्म के परम आदर्श • इक्ष्वाकु कुल तिलक • अयोध्याधिपति',
      te: 'మర్యాదా పురుషోత్తమ • క్షత్రియ ధర్మ శిఖరం • ఇక్ష్వాకు కుల తిలక • సూర్యవంశ ఆరాధ్య చక్రవర్తి',
      kn: 'ಮರ್ಯಾದಾ ಪುರುಷೋತ್ತಮ • ಕ್ಷಾತ್ರಧರ್ಮದ ಪರಮ ಶಿಖರ • ಇಕ್ಷ್ವಾಕು ಕುಲ ತಿಲಕ • ಶ್ರೀರಾಮಚಂದ್ರ',
      ta: 'மரியாதா புருஷோத்தமர் • சத்திரிய அறத்தின் சிகரம் • அயோத்தியின் மாமன்னர்',
      mr: 'मर्यादा पुरुषोत्तम • क्षत्रिय धर्माचे सर्वोच्च आदर्श • इक्ष्वाकु कुल भूषण',
      or: 'ମର୍ଯ୍ୟାଦା ପୁରୁଷୋତ୍ତମ • କ୍ଷାତ୍ରଧର୍ମର ପରମ ଆଦର୍ଶ • ଇକ୍ଷ୍ୱାକୁ କୁଳ ତିଳକ',
      bn: 'মর্যাদা পুরুষোত্তম • ক্ষত্রিয় ধর্মের পরম আদর্শ • ইক্ষ্বাকু কুল চূড়ামণি'
    },
    summary: {
      en: 'Sri Rama, seventh avatar of Lord Vishnu and peerless scion of the Ikshvaku Solar race, personifies absolute truth (Satya), righteousness (Dharma), and benevolent sovereign rule (Rama Rajya). Revered by all Suryavamsha Odiyaraju Kshatriyas, Oad-Rajputs, and VaddeRajulu as the supreme divine progenitor and moral ideal of Kshatriya chivalry, whose radiant Golden Sun emblem is proudly displayed upon royal seals and community banners.',
      hi: 'मर्यादा पुरुषोत्तम भगवान श्री राम इक्ष्वाकु सूर्यवंश के मुकुटमणि हैं। उन्होंने सत्य, धर्म और न्यायपूर्ण शासन (राम-राज्य) का अमर आदर्श प्रस्तुत किया। समस्त सूर्यवंशी ओडियाराजू क्षत्रिय, ओड-राजपूत और वड्डेराजुलु भगवान श्री राम को अपना परम आराध्य, कुल-गौरव और क्षत्रिय धर्म का मूलाधार मानते हैं। उनके कुल का स्वर्णिम सूर्य-प्रतीक समाज के ध्वजों और मुहरों पर अंकित रहता है।',
      te: 'శ్రీరామచంద్రుడు సూర్యవంశ పరమోన్నత ఆదర్శ పురుషుడు. సత్యం, ధర్మం, ప్రజా సంక్షేమ పాలనతో "రామరాజ్య" స్థాపన చేశారు. సూర్యవంశి ఒడియరాజు, ఓడ్-రాజ్‌పుత్ మరియు వడ్డెరాజులు శ్రీరాముని తమ కులదైవంగా, సూర్యవంశ క్షత్రియ శౌర్యానికి మూలస్తంభంగా ఆరాధిస్తారు.',
      kn: 'ಶ್ರೀರಾಮಚಂದ್ರನು ಸೂರ್ಯವಂಶದ ಪರಮ ಆದರ್ಶ ಪುರುಷ. ಧರ್ಮ, ಸತ್ಯ ಮತ್ತು ಕ್ಷಾತ್ರಧರ್ಮದ ಸಂಕೇತವಾದ ರಾಮನ ಸೂರ್ಯ ಲಾಂಛನವನ್ನು ಓಡ್-ರಜಪೂತ್, ಸೂರ್ಯವಂಶಿ ಒಡಿಯರಾಜು ಮತ್ತು ವಡ್ಡೇರಾಜುಲು ಕುಲಸ್ಥರು ತಮ್ಮ ಬಾವುಟಗಳಲ್ಲಿ ರಕ್ಷಿಸಿಕೊಂಡು ಬಂದಿದ್ದಾರೆ.',
      ta: 'சூரியவம்சத்தின் முதன்மை மாமன்னர் ஸ்ரீராமர். அறநெறி மற்றும் சத்திரிய வீரத்தின் வடிவமான இவரை ஒடியாராஜு மற்றும் சத்திரிய மரபினர் குலதெய்வமாக வழிபடுகின்றனர்.',
      mr: 'मर्यादा पुरुषोत्तम श्री राम हे सूर्यवंशाचे सर्वोच्च भूषण आहेत. ओडियाराजू, ओड-राजपूत व वडार समाज त्यांना आपला कुलदेव आणि क्षत्रिय तेजाचा मूळ स्रोत मानतो.',
      or: 'ପ୍ରଭୁ ଶ୍ରୀରାମଚନ୍ଦ୍ର ସୂର୍ଯ୍ୟବଂଶର ପରମ ଆରାଧ୍ୟ ଦେବତା। ସମସ୍ତ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ ଓ ଓଡ଼-କ୍షତ୍ରିୟ ତାଙ୍କୁ ଧର୍ମ ଓ କ୍ଷାତ୍ରତେଜର ଆଦର୍ଶ ମାନନ୍ତି।',
      bn: 'মর্যাদা পুরুষোত্তম শ্রীরামচন্দ্র সূর্যবংশের সর্বোত্তম আদর্শ। ওড-রাজপুত ও ক্ষত্রিয় সমাজের পরম পূজ্য আরাধ্য কুলদেবতা।'
    },
    detailed_narrative: {
      en: 'Sri Rama’s historic journey across Dandakaranya, the Godavari basin (Bhadrachalam), and the southern peninsula forged lasting spiritual bonds with indigenous builder, artisan, and warrior lineages. The construction of the monumental stone causeway across the ocean—Rama Setu—engineered under Nala and Nila, remains the supreme architectural and civil engineering metaphor celebrated in community folklore and architecture.',
      hi: 'भगवान श्री राम का दंडकारण्य, गोदावरी कछार (भद्राचलम) और दक्षिण भारत का प्रवास स्थानीय योद्धाओं व शिल्पी समाजों के साथ गहरा संबंध स्थापित करता है। नल और नील के मार्गदर्शन में निर्मित "राम सेतु" प्राचीन भारत के पाषाण व सेतु स्थापत्य का अमर गौरव है।',
      te: 'దండకారణ్యం, గోదావరి లోయ మరియు దక్షిణ తీరంలో శ్రీరాముని సంచారం, నల-నీలుల నేతృత్వంలో సముద్రంపై నిర్మితమైన "రామసేతు" ప్రాచీన రాతి మరియు వంతెన నిర్మాణ నైపుణ్యానికి పవిత్ర ప్రతీక.',
      kn: 'ದಂಡಕಾರಣ್ಯ, ಭದ್ರಾಚಲಂ ಹಾಗೂ ದಕ್ಷಿಣ ಭಾರತದ ಶ್ರೀರಾಮನ ಸಂಚಾರ ಮತ್ತು ರಾಮಸೇತುವೆಯ ನಿರ್ಮಾಣವು ಕಲ್ಲಿನ ಸೇತುವೆ ಎಂಜಿನಿಯರಿಂಗ್‌ಗೆ ದೈವಿಕ ಉದಾಹರಣೆಯಾಗಿದೆ.',
      ta: 'நளன் மற்றும் நீலன் தலைமையில் கட்டப்பட்ட ராமசேது பாலம் பண்டைய பாறை மற்றும் அணை கட்டமைப்புக்கு சிறந்த சான்றாகும்.',
      mr: 'राम सेतूची निर्मिती हे प्राचीन भारतातील पाषाण आणि जलसेतू स्थापत्याचे सर्वोच्च आध्यात्मिक उदाहरण मानले जाते.',
      or: 'ଦଣ୍ଡକାରଣ୍ୟ ପରିଭ୍ରମଣ ଓ ନଳ-ନୀଳଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ରାମସେତୁ ପ୍ରାଚୀନ ଶିଳ୍ପ ଓ ସେତୁ ନିର୍ମାଣର ପବିତ୍ର ପ୍ରତୀକ।',
      bn: 'শ্রীরামচন্দ্রের নির্দেশনায় রামসেতু নির্মাণ প্রাচীন ভারতের প্রস্তর ও জলসেতু প্রকৌশলের চিরন্তন নিদর্শন।'
    },
    engineering_and_civic_legacy: {
      en: 'The divine patron of bridge-building (Rama Setu), oceanic stone engineering, and righteous governance (Rama Rajya).',
      hi: 'राम सेतु के सेतु-स्थापत्य, पाषाण-अभियांत्रिकी एवं धर्म-सम्मत शासन के दिव्य अधिष्ठाता।',
      te: 'రామసేతు వారధి నిర్మాణం, రాతి శిల్ప కళ మరియు ధర్మపాలనకు దైవిక ఆదర్శం.',
      kn: 'ಸೇತುಬಂಧ, ಕಲ್ಲಿನ ರಚನೆಗಳು ಮತ್ತು ರಾಮರಾಜ್ಯದ ನ್ಯಾಯಪಾಲನೆಯ ದೈವಿಕ ಸಂಕೇತ.',
      ta: 'சேது பாலம் மற்றும் தர்ம ஆட்சியின் தெய்வீக வழிகாட்டி.',
      mr: 'रामसेतू पाषाण रचना आणि न्याय्य प्रशासनाचे दैवी प्रतीक.',
      or: 'ରାମସେତୁ ପଥର ସେତୁ ନିର୍ମାଣ ଓ ନ୍ୟାୟପୂର୍ଣ୍ଣ ପ୍ରଶାସନର ଦିବ୍ୟ ପ୍ରେରଣା।',
      bn: 'রামসেতু নির্মাণ এবং ন্যায়পরায়ণ রামরাজ্যের ঐশ্বরিক আদর্শ।'
    },
    associated_places: ['Ayodhya', 'Janakpur', 'Chitrakoot', 'Dandakaranya', 'Bhadrachalam', 'Kishkindha', 'Rameswaram'],
    canonical_sources: ['Valmiki Ramayana', 'Kamban Ramayanam', 'Ranganatha Ramayanam (Telugu)', 'Sarala Dasa Vilanka Ramayana']
  },
  {
    id: 'fig_king_kharavela',
    canonical_name: 'Mahameghavahana Emperor Kharavela',
    localized_name: {
      en: 'Mahameghavahana Emperor Kharavela',
      hi: 'महामेघवाहन सम्राट खारवेल',
      te: 'మహామేఘవాహన చక్రవర్తి ఖారవేలుడు',
      kn: 'ಮಹಾಮೇಘವಾಹನ ಸಾಮ್ರಾಟ್ ಖಾರವೇಲ',
      ta: 'மகாமேகவாகன பேரரசர் காரவேலன்',
      mr: 'महामेघवाहन सम्राट खारवेल',
      or: 'ମହାମେଘବାହନ ସମ୍ରାଟ ଖାରବେଳ',
      bn: 'মহামেঘবাহন সম্রাট খারবেল'
    },
    alternate_names: ['Kharavela Deva', 'Bhikshu Raja', 'Chakravartin of Kalinga-Odra', 'Chedi-raja'],
    dynasty_lineage: 'Mahameghavahana (Chedi) Dynasty of Kalinga & Ancient Odra',
    era: 'c. 2nd – 1st Century BCE',
    reign_or_dates: 'c. 193 – 170 BCE (or 1st Century BCE)',
    epigraphic_status: 'Documented Primary Epigraphy',
    image_url: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Kalingadhipati • Mahameghavahana • Chakravartin • Master of Canal Engineering & Rock Excavation',
      hi: 'कलिंगाधिपति • महामेघवाहन • चक्रवर्ती • नहर-विस्तार एवं शैल-खनन के सम्राट',
      te: 'కళింగాధిపతి • మహామేఘవాహన • చక్రవర్తి • కాలువ పునరుద్ధరణ మరియు కొండ గుహల నిర్మాణ సార్వభౌముడు',
      kn: 'ಕಳಿಂಗಾಧಿಪತಿ • ಮಹಾಮೇಘವಾಹನ • ಚಕ್ರವರ್ತಿ • ಕಾಲುವೆ ಮತ್ತು ಗವಿ-ದೇವಾಲಯಗಳ ನಿರ್ಮಾತೃ',
      ta: 'கலிங்காதிபதி • சக்கரவர்த்தி • கால்வாய் மற்றும் குடைவரைக் கோயில்களின் பேரரசர்',
      mr: 'कलिंगाधिपती • महामेघवाहन • चक्रवर्ती • कालवे आणि लेणी स्थापत्याचे सम्राट',
      or: 'କଳିଙ୍ଗାଧିପତି • ମହାମେଘବାହନ • ଚକ୍ରବର୍ତ୍ତୀ • କେନାଲ୍ ଖନନ ଓ ଗୁମ୍ଫା ନିର୍ମାଣର ମହାନାୟକ',
      bn: 'কলিঙ্গাধিপতি • মহামেঘবাহন • চক্রবর্তী • প্রাচীন খাল সম্প্রসারণ ও গুহা নির্মাতা'
    },
    summary: {
      en: 'Emperor Kharavela of Kalinga and the Odra littoral was one of ancient India’s greatest imperial conquerors and master civic engineers. His monumental 17-line Hathigumpha inscription, engraved in Brahmi script in Prakrit upon the Udayagiri hill near Bhubaneswar, provides an authentic regnal chronicle. In his fifth regnal year, he extended the canal constructed by King Nanda 300 years earlier straight into his capital Kalinganagari, exemplifying grand hydraulic and earthwork mastery. He also excavated hundreds of rock shelters for ascetics and led campaigns from Magadha to the Pandya south.',
      hi: 'प्राचीन कलिंग एवं ओड्र के सम्राट खारवेल भारत के महानतम चक्रवर्ती विजेताओं एवं लोक-कल्याणकारी वास्तुकारों में से थे। भुवनेश्वर के निकट उदयगिरि की हाथीगुंफा में ब्राह्मी लिपि और प्राकृत भाषा में उत्कीर्ण उनका 17 पंक्तियों का अभिलेख इतिहास का अमूल्य दस्तावेज है। अपने 5वें शासन-वर्ष में उन्होंने नंदराज द्वारा 300 वर्ष पूर्व खुदवाई गई तिवसचल नहर का विस्तार अपनी राजधानी कलिंगनगरी तक करवाया तथा सैकड़ों शैल-गुफाओं का निर्माण करवाया।',
      te: 'ప్రాచీన కళింగ-ఓడ్ర చక్రవర్తి ఖారవేలుడు అజేయ సైనిక విజేత మరియు బృహత్ ప్రజా నిర్మాణకారుడు. భువనేశ్వర్ సమీపంలోని ఉదయగిరి కొండపై ఉన్న 17 పంక్తుల ప్రసిద్ధ హాథీగుంఫా బ్రాహ్మీ శాసనం దీనికి తిరుగులేని నిదర్శనం. తన 5వ పరిపాలనా సంవత్సరంలో నందరాజు తవ్వించిన 300 ఏళ్ల నాటి పురాతన కాలువను రాజధాని వరకు విస్తరించి నీటి కొరతను తీర్చారు.',
      kn: 'ಕಳಿಂಗ ಮತ್ತು ಓಡ್ರದ ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನು ಭಾರತದ ಮಹಾನ್ ವಿಜೇತ ದೊರೆ. ಉದಯಗಿರಿಯ ಹಾಥೀಗುಂಫಾ ಶಾಸನದಲ್ಲಿ ನಂದರಾಜನು ನಿರ್ಮಿಸಿದ ಕಾಲುವೆಯನ್ನು ರಾಜಧಾನಿಯೊಳಗೆ ವಿಸ್ತರಿಸಿದ ಮತ್ತು ಕೋಟೆಗಳನ್ನು ಭದ್ರಪಡಿಸಿದ ಸುವರ್ಣ ಚರಿತ್ರೆಯಿದೆ.',
      ta: 'கலிங்கத்தின் பேரரசர் காரவேலன். ஹாத்திகும்பா கல்வெட்டில் இவரது கால்வாய் விரிவாக்கம், பாறை குடைவரை குகைகள் மற்றும் தென்னக படையெடுப்புகள் பதிவாகியுள்ளன.',
      mr: 'कलिंग आणि ओड्रचे सम्राट खारवेल यांनी उदयगिरीच्या हाथीगुंफा शिलालेखात आपल्या जलव्यवस्थापन, ३०० वर्षे जुन्या कालव्याचा विस्तार आणि लेण्यांच्या निर्मितीचा इतिहास कोरून ठेवला आहे.',
      or: 'ସମ୍ରାଟ ଖାରବେଳ ପ୍ରାଚୀନ ଓଡ଼ିଶାର ଶ୍ରେଷ୍ଠ ଦିଗ୍ବିଜୟୀ ରାଜା ଥିଲେ। ଉଦୟଗିରି ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖରେ ତାଙ୍କର କେନାଲ୍ ସଂପ୍ରସାରଣ, ଦୁର୍ଗ ପୁନରୁଦ୍ଧାର ଓ ଦିଗ୍ବିଜୟର ବିସ୍ତୃତ ପ୍ରମାଣ ରହିଛି।',
      bn: 'সম্রাট খারবেল প্রাচীন কলিঙ্গ ও ওড্রের পরাক্রমশালী চক্রবর্তী ছিলেন। উদয়গিরির হাতিগুম্ফা শিলালিপিতে নন্দরাজের খাল সম্প্রসারণ ও দুর্গ প্রাচীর সংস্কারের বিবরণ সংরক্ষিত।'
    },
    detailed_narrative: {
      en: 'The Hathigumpha inscription confirms that in his first regnal year, Kharavela repaired the storm-damaged gates, battlements, and reservoirs of Kalinganagari at the cost of 3.5 million coins. In his fifth year, he channeled the ancient canal of the Nandarajas into the heart of the metropolis. In subsequent years, he retrieved the sacred Kalinga Jina image from Magadha and received tributes from the Deccan and Tamil confederacy. His reign proves the synthesis of Kshatriya military sovereignty with monumental hydraulic engineering.',
      hi: 'हाथीगुंफा अभिलेख के अनुसार, प्रथम वर्ष में 35 लाख मुद्राएं व्यय कर तूफान से क्षतिग्रस्त कलिंगनगरी के परकोटों, द्वारों और जलाशयों की मरम्मत करवाई गई। पांचवें वर्ष में प्राचीन तिवसचल नहर का पानी राजधानी में लाया गया। खारवेल का शासन क्षत्रिय शौर्य और जल-स्थापत्य के समन्वय का ऐतिहासिक प्रमाण है।',
      te: 'తొలి సంవత్సరంలో తుఫాను ధ్వంసం చేసిన నగర ద్వారాలు, ప్రాకారాలను 35 లక్షల నాణేలతో బాగుచేయించారు. ఐదవ ఏట కాలువను రాజధానిలోకి తీసుకువచ్చారు. ఓడ్ర-కళింగ ప్రజల శిల్ప, జల నిర్మాణ నైపుణ్యానికి ఖారవేలుని పాలన ప్రతీక.',
      kn: 'ಮೊದಲ ವರ್ಷದಲ್ಲಿ ರಾಜಧಾನಿಯ ಕೋಟೆ ಮತ್ತು ಜಲಾಶಯಗಳನ್ನು ದುರಸ್ತಿಗೊಳಿಸಿದನು. ಐದನೇ ವರ್ಷದಲ್ಲಿ ಪ್ರಾಚೀನ ಕಾಲುವೆಯನ್ನು ನಗರಕ್ಕೆ ತಂದನು.',
      ta: 'புயலினால் பாழான தலைநகரின் மதில்களை சீரமைத்து, கால்வாய்களை நகருக்குள் கொண்டு வந்த வரலாற்று பெருமைக்குரியவர்.',
      mr: 'पहिल्याच वर्षी तटबंदीची पुनर्बांधणी आणि पाचव्या वर्षी कालव्याचा विस्तार करून त्यांनी प्रजेचे जीवन सुखकर केले.',
      or: 'ପ୍ରଥମ ବର୍ଷରେ ୩୫ ଲକ୍ଷ ମୁଦ୍ରା ବ୍ୟୟରେ ଦୁର୍ଗ ପ୍ରାଚୀର ମରାମତି ଓ ପଞ୍ଚମ ବର୍ଷରେ ନହର ଖନନ ତାଙ୍କ ପ୍ରଜାହିତୈଷୀ ଶାସନର ପ୍ରମାଣ।',
      bn: 'প্রথম বছরে ঝড়ে বিধ্বস্ত রাজধানীর প্রাচীর সংস্কার এবং পঞ্চম বছরে ঐতিহাসিক খাল সম্প্রসারণ তাঁর সুশাসনের নিদর্শন।'
    },
    engineering_and_civic_legacy: {
      en: 'Primary epigraphic benchmark of urban canal extension, cyclopean defense masonry, and rock-cut cave excavation in ancient India.',
      hi: 'प्राचीन भारत में नगरीय नहर विस्तार, विशाल दुर्ग प्राचीर एवं शैल-कर्तित गुफा स्थापत्य का प्राथमिक अभिलेखीय प्रमाण।',
      te: 'నగర కాలువల విస్తరణ, బృహత్ దుర్గ ప్రాకారాలు మరియు రాతి గుహల నిర్మాణానికి ప్రాథమిక శాసన ఆధారం.',
      kn: 'ನಗರದ ಕಾಲುವೆ ವಿಸ್ತರಣೆ, ಕಲ್ಲಿನ ಕೋಟೆ ನಿರ್ಮಾಣ ಮತ್ತು ಗವಿ-ಶಿಲ್ಪಕಲೆಗೆ ಶಾಸನಬದ್ಧ ಉದಾಹರಣೆ.',
      ta: 'நகர்ப்புற கால்வாய் பாசனம் மற்றும் பாறை குடைவரைக் கலைக்கு கல்வெட்டு ஆதாரம்.',
      mr: 'शहरी कालवा विस्तार, अभेद्य तटबंदी आणि शैल-गुहा स्थापत्याचा प्राथमिक शिलालेखीय पुरावा.',
      or: 'ନଗର କେନାଲ୍ ସଂପ୍ରସାରଣ ଓ ପଥର ଖୋଦେଇ ଗୁମ୍ଫା ନିର୍ମାଣର ଐତିହାସିକ ପ୍ରମାଣ।',
      bn: 'নগর খাল সম্প্রসারণ, দুর্ভেদ্য দুর্গ প্রাচীর ও শিলালিপি খোদিত গুহা স্থাপত্যের প্রামাণ্য ভিত্তি।'
    },
    associated_places: ['Udayagiri (Hathigumpha)', 'Khandagiri', 'Sisupalgarh (Kalinganagari)', 'Bhubaneswar', 'Rajagriha'],
    canonical_sources: ['Epigraphia Indica Vol. XX (Hathigumpha Inscription)', 'D.C. Sircar Select Inscriptions', 'B.M. Barua Old Brahmi Inscriptions']
  },
  {
    id: 'fig_goddess_jasma',
    canonical_name: 'Goddess Jasma Odan (Jasma Devi)',
    localized_name: {
      en: 'Goddess Jasma Odan (Jasma Devi)',
      hi: 'माता जस्मा देवी (जस्मा ओडन)',
      te: 'మాతా జస్మా దేవి (జస్మా ఓడన్)',
      kn: 'ಮಾತಾ ಜಸ್ಮಾ ದೇವಿ (ಜಸ್ಮಾ ಓಡನ್)',
      ta: 'மாதா ஜஸ்மா தேவி (ஜஸ்மா ஓடன்)',
      mr: 'माता जस्मा देवी (जस्मा ओडण)',
      or: 'ମାତା ଜସ୍ମା ଦେବୀ (ଜସ୍ମା ଓଡ଼ନ)',
      bn: 'মাতা জসমা দেবী (জসমা ওড়ন)'
    },
    alternate_names: ['Mata Jasma Devi', 'Sati Jasma Odan', 'Jasma Rani', 'Pavitra Pativrata Jasma'],
    dynasty_lineage: 'Traditional Oad-Rajput Lineage (Solanki Era of Gujarat)',
    era: '11th – 12th Century CE',
    reign_or_dates: 'c. 1090 – 1140 CE (Reign of Siddharaja Jaisinh of Gujarat)',
    epigraphic_status: 'Living Sacred Tradition',
    image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Kuladevi of Oad / Od-Rajput Community • Emblem of Marital Chastity • Patron Goddess of Dignity & Truth',
      hi: 'ओड / ओड-राजपूत समाज की कुलदेवी • पातिव्रत्य एवं क्षत्रिय स्वाभिमान की अधिष्ठात्री • सती माता',
      te: 'ఓడ్ / ఓడ్-రాజ్‌పుత్ సమాజ కులదేవత • పాతివ్రత్య, క్షత్రియ ఆత్మగౌరవ ప్రతీక • పవిత్ర సతీమాత',
      kn: 'ಓಡ್ ಮತ್ತು ರಜಪೂತ್ ಸಮುದಾಯದ ಕುಲದೇವಿ • ಪಾತಿವ್ರತ್ಯ ಮತ್ತು ಸ್ವಾಭಿಮಾನದ ಶಕ್ತಿ • ಸತೀ ಮಾತಾ',
      ta: 'ஓட் சமூகத்தின் குலதெய்வம் • கற்பு மற்றும் சத்திரிய மானத்தின் காவல் தெய்வம்',
      mr: 'ओड-राजपूत समाजाची कुलदैवत • पातिव्रत्य आणि क्षत्रिय स्वाभिमानाचे दैवत • सती माता',
      or: 'ଓଡ଼-ରାଜପୁତ ସମୁଦାୟର କୁଳଦେବୀ • ପତିବ୍ରତା ଓ ଆତ୍ମସମ୍ମାନର ପ୍ରତୀକ • ସତୀ ମାତା',
      bn: 'ওড সমাজের পরম আরাধ্যা কুলদেবী • সতীত্ব ও আত্মমর্যাদার প্রতীক'
    },
    summary: {
      en: 'Goddess Jasma Odan is the revered folk deity and sacred heroine of the Oad / Od / Oad-Rajput community, celebrated across Gujarat, Rajasthan, and western India. Married to the Oad master-builder Rooda (Rupa), she belonged to the skilled clan invited by Solanki King Siddharaja Jaisinh to excavate the famed Sahastralinga Talav in Patan. Renowned for her radiant beauty and staunch virtue, she fearlessly repulsed the king’s illicit advances, defended her marital honor, and immolated herself. Deified as Mata Jasma, she is worshipped as the supreme Kuladevi protecting truth, modesty, and community dignity.',
      hi: 'माता जस्मा ओडन गुजरात, राजस्थान और संपूर्ण पश्चिम भारत में ओड / ओड-राजपूत समाज की आराध्य कुलदेवी हैं। ओड समुदाय के मुखिया रूड़ा की धर्मपत्नी जस्मा उस कुशल शिल्पी समूह का हिस्सा थीं जिन्हें सोलंकी राजा सिद्धराज जयसिंह ने पाटन के विशाल सहस्रलिंग तालाब की खुदाई के लिए आमंत्रित किया था। राजा के अनुचित प्रस्ताव को ठुकराकर उन्होंने अपने पातिव्रत्य और क्षत्रिय मान की रक्षा हेतु सरस्वती नदी तट पर आत्मोत्सर्ग कर दिया। वे सत्य, शील और समाज की रक्षा करने वाली कुलदेवी के रूप में पूज्य हैं।',
      te: 'మాతా జస్మా దేవి ఓడ్ / ఓడ్-రాజ్‌పుత్ సమాజానికి పరమ పవిత్ర కులదేవత. గుజరాత్ పటాన్‌లోని సహస్రలింగ తటాక నిర్మాణంలో పనిచేస్తూ, సిద్ధరాజ జయసింహ రాజు నుండి తన పాతివ్రత్యాన్ని, ఆత్మగౌరవాన్ని కాపాడుకోవడానికి అగ్నిప్రవేశం చేసిన వీరవనిత. గుజరాత్, రాజస్థాన్‌లలో ఆమెను సతీమాతగా భక్తిశ్రద్ధలతో కొలుస్తారు.',
      kn: 'ಮಾತಾ ಜಸ್ಮಾ ಓಡನ್ ಓಡ್-ರಜಪೂತ್ ಸಮಾಜದ ಪೂಜ್ಯ ಕುಲದೇವತೆ. ಪಾಠಣದ ಸಹಸ್ರಲಿಂಗ ಕೆರೆ ನಿರ್ಮಾಣದಲ್ಲಿ ರಾಜನ ದುರಾಸೆಯನ್ನು ವಿರೋಧಿಸಿ ತನ್ನ ಪಾತಿವ್ರತ್ಯವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ಆತ್ಮಾರ್ಪಣೆ ಮಾಡಿದ ಮಹಾಸತಿ.',
      ta: 'பாடன் சகஸ்ரலிங்க ஏரி கட்டுமானத்தில் பணியாற்றிய போது தன் கற்பைக் காக்க உயிர்த்தியாகம் செய்த ஜஸ்மா தேவி, ஓட் சமூகத்தினரின் குலதெய்வமாக வழிபடப்படுகிறார்.',
      mr: 'पाटनच्या सहस्रलिंग तलावाच्या कामावेळी राजा सिद्धराज जयसिंहाच्या मोहाला बळी न पडता पतिव्रता धर्मासाठी आत्मसमर्पण करणाऱ्या माता जस्मा ओडण या संपूर्ण समाजाच्या कुलदेवी आहेत.',
      or: 'ପାଟଣର ସହସ୍ରଲିଙ୍ଗ ଜଳାଶୟ ଖନନ ବେଳେ ଆତ୍ମସମ୍ମାନ ଓ ପତିବ୍ରତା ଧର୍ମ ରକ୍ଷା ପାଇଁ ଆତ୍ମବଳିଦାନ ଦେଇଥିବା ମାତା ଜସ୍ମା ଓଡ଼ନ ସମାଜର ପୂଜ୍ୟ କୁଳଦେବୀ।',
      bn: 'পাটনের সহস্রলিঙ্গ জলাশয় খননের সময় সতীত্ব ও আত্মমর্যাদা রক্ষার জন্য আত্মাহুতি দেওয়া মাতা জসমা দেবী ওড সমাজের পরম আরাধ্যা দেবী।'
    },
    detailed_narrative: {
      en: 'The legendary saga of Jasma Odan is immortalized in Gujarati folklore and the medieval Bhavai theatre tradition established by Asaita Thakar in the 14th century. Her sacrifice demonstrates the inviolable dignity of labor, wherein sovereign kings were held morally accountable to the artisan-warriors whose toil carved royal monuments. Shrines dedicated to Jasma Devi stand near Patan, Vadodara, and throughout Rajasthan, drawing thousands of pilgrims annually.',
      hi: 'जस्मा ओडन की अमर कथा 14वीं सदी के असाइत ठाकर द्वारा रचित भवई लोकनाट्य और लोकगीतों में अमर है। यह गाथा श्रम के स्वाभिमान और अन्यायी सत्ता के विरुद्ध आत्मबल का प्रतीक है। पाटन, वडोदरा और राजस्थान में उनके पवित्र मंदिर स्थित हैं।',
      te: '14వ శతాబ్దపు భావై నాటక సంప్రదాయం ద్వారా జస్మా దేవి కథ అజరామరమైంది. శ్రమజీవుల ఆత్మగౌరవం మరియు అన్యాయంపై నైతిక విజయానికి ఇది నిదర్శనం.',
      kn: '೧೪ನೇ ಶತಮಾನದ ಭವಾಯಿ ಜನಪದ ಕಲೆಯ ಮೂಲಕ ಪ್ರಸಿದ್ಧವಾದ ಜಸ್ಮಾ ದೇವಿಯ ಚರಿತ್ರೆಯು ಶ್ರಮದ ಸ್ವಾಭಿಮಾನಕ್ಕೆ ನಿದರ್ಶನವಾಗಿದೆ.',
      ta: '14ஆம் நூற்றாண்டின் நாட்டுப்புற நாடகங்களில் இவளது தியாகம் இன்றும் போற்றிப் பாடப்படுகிறது.',
      mr: '१४ व्या शतकातील भवाई लोकनाट्यातून जस्मा ओडण यांची कथा अमर झाली आहे. श्रमाचा सन्मान आणि स्वाभिमानाचे हे मूर्तिमंत प्रतीक आहे.',
      or: 'ଚତୁର୍ଦ୍ଦଶ ଶତାବ୍ଦୀର ଭବାଇ ଲୋକନାଟକରେ ଜସ୍ମା ଓଡ଼ନଙ୍କ ଆତ୍ମବଳିଦାନର ଗୌରବଗାଥା ଚିରସ୍ମରଣୀୟ ହୋଇ ରହିଛି।',
      bn: 'চতুর্দশ শতাব্দীর ভবাই লোকনাট্যে অমর জসমা ওড়নের কাহিনী শ্রমের মর্যাদা ও আত্মসম্মানের শ্রেষ্ঠ প্রতীক।'
    },
    engineering_and_civic_legacy: {
      en: 'Sacred symbol of the collective dignity, chastity, and civic integrity of reservoir-excavating and fort-building communities.',
      hi: 'तड़ाग-खनन एवं दुर्ग-स्थापत्य में संलग्न समाज की अस्मिता, पातिव्रत्य एवं लोक-प्रतिष्ठा की अमर प्रतीक।',
      te: 'జలాశయాల నిర్మాణం మరియు కోటల శిల్పుల ఆత్మగౌరవం, పవిత్రతలకు సజీవ సంకేతం.',
      kn: 'ಕೆರೆ ನಿರ್ಮಾಣಕಾರರ ಸ್ವಾಭಿಮಾನ ಮತ್ತು ನೈತಿಕ ಶಕ್ತಿಯ ಪರಮ ಪವಿತ್ರ ಸಂಕೇತ.',
      ta: 'ஏரி அமைப்பாளர்களின் மானம் மற்றும் தியாகத்தின் புனித அடையாளம்.',
      mr: 'जलव्यवस्थापन करणाऱ्या कारागिरांच्या स्वाभिमान आणि त्यागाचे पवित्र प्रतीक.',
      or: 'ଜଳାଶୟ ଖନନକାରୀ ଶିଳ୍ପୀମାନଙ୍କ ଆତ୍ମମର୍ଯ୍ୟାଦା ଓ ପବିତ୍ରତାର ଅମର ପ୍ରତୀକ।',
      bn: 'জলাশয় খননকারী সমাজের আত্মমর্যাদা ও চারিত্রিক দৃঢ়তার প্রতীক।'
    },
    associated_places: ['Patan (Gujarat)', 'Sahastralinga Talav', 'Saraswati River Bank', 'Vadodara', 'Malwa', 'Rajasthan'],
    canonical_sources: ['Alexander Kinloch Forbes Ras Mala (1856)', 'M.R. Majmudar Cultural History of Gujarat', 'Asaita Thakar Bhavai Play: Jasma Odan']
  },
  {
    id: 'fig_shivayogi_siddharama',
    canonical_name: 'Shivayogi Siddharameshwara of Solapur',
    localized_name: {
      en: 'Shivayogi Siddharameshwara of Solapur',
      hi: 'सोलापुर के शिवयोगी सिद्धरामेश्वर महाराज',
      te: 'సోలాపూర్ శివయోగి సిద్ధరామేశ్వరుడు',
      kn: 'ಸೋಲಾಪುರದ ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರ',
      ta: 'சோலாப்பூர் சிவயோகி சித்தராமேஸ்வரர்',
      mr: 'सोलापूरचे शिवयोगी सिद्धरामेश्वर महाराज',
      or: 'ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର (ସୋଲାପୁର)',
      bn: 'সোলাপুরের শিবযোগী সিদ্ধরামেশ্বর'
    },
    alternate_names: ['Siddharama', 'Siddharameshwar', 'Solapur Siddharama', 'Shivayogi Siddharamaiah', 'Karmayogi Siddharama'],
    dynasty_lineage: '12th-Century Kalyana Sharana Spiritual Tradition',
    era: '12th Century CE',
    reign_or_dates: 'c. 1125 – 1190 CE',
    epigraphic_status: 'Documented Primary Epigraphy',
    image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Karmayogi • Master of Civic Water Harvesting • Gramadevata of Solapur • Patron Saint of Waddar / Vaddar Community',
      hi: 'कर्मयोगी • लोक-कल्याणकारी जल-संरक्षण के संत • सोलापुर के ग्रामदैवत • वड्डार / वडार समाज के संरक्षक',
      te: 'కర్మయోగి • జల సంరక్షణ ఆది ప్రవర్తకుడు • సోలాపూర్ గ్రామదేవత • వడ్డార్ / ఒడ్డె సమాజ పరమ రక్షకుడు',
      kn: 'ಕಾಯಕಯೋಗಿ • ಜಲಕ್ರಾಂತಿಯ ಹರಿಕಾರ • ಸೋಲಾಪುರದ ಗ್ರಾಮದೇವತೆ • ವಡ್ಡಾರ ಸಮಾಜದ ಆರಾಧ್ಯ ದೈವ',
      ta: 'கர்மயோகி • நீர் மேலாண்மை புனிதர் • சோலாப்பூர் காவல் தெய்வம் • வட்டார் சமூகத்தின் அருள் வழிகாட்டி',
      mr: 'कर्मयोगी • सोलापूरचे आराध्य ग्रामदैवत • जलक्रांतीचे प्रणेते • वडार समाजाचे परम संरक्षक संत',
      or: 'କର୍ମଯୋଗୀ • ଜଳସଂରକ୍ଷଣର ମହାନ୍ ସନ୍ଥ • ସୋଲାପୁର ଗ୍ରାମଦେବତା • ୱଡ୍ଡାର ସମୁଦାୟର ପରମ ରକ୍ଷକ',
      bn: 'কর্মযোগী • জল সংরক্ষণের মহান সাধক • সোলাপুরের আরাধ্য দেবতা • বড্ডার সমাজের প্রধান অভিভাবক'
    },
    summary: {
      en: 'Shivayogi Siddharameshwara was a profound 12th-century Shaiva mystic, philosopher, and visionary civic engineer of the Sharana spiritual movement led by Basaveshwara and Allama Prabhu. Hailing from Sonnalige (modern Solapur), Siddharameshwara dedicated his life to public welfare (Kayakave Kailasa), championing drought relief by excavating massive public lakes, wells, and consecrating 68 Shivalingas. Working shoulder-to-shoulder with Waddar / Vaddar stone masons and earth excavators, he treated them with the highest spiritual reverence, establishing an unbreakable bond as their patron saint.',
      hi: 'शिवयोगी सिद्धरामेश्वर 12वीं शताब्दी के कल्याण शरण आंदोलन के महान दार्शनिक, शिवयोगी एवं लोक-इंजीनियर थे। सोनलीगे (आधुनिक सोलापुर) में उन्होंने अकाल और जल-संकट को समाप्त करने के लिए सैकड़ों एकड़ का विशाल सरोवर खुदवाया और 68 शिवलिंगों की स्थापना की। उन्होंने वड्डार / वडार समुदाय के पाषाण-शिल्पियों और श्रमिकों के साथ मिलकर कंधे से कंधा मिलाकर कार्य किया। वड्डार समाज उन्हें अपना परम रक्षक संत मानता है।',
      te: 'శివయోగి సిద్ధరామేశ్వరుడు 12వ శతాబ్దపు కళ్యాణ శరణ ఉద్యమ మహా తాత్వికుడు, కర్మయోగి. సోలాపూర్‌లో కరువును పారద్రోలడానికి వందలాది ఎకరాల విస్తీర్ణంలో మహాతటాకాన్ని తవ్వించి, 68 పవిత్ర శివలింగాలను ప్రతిష్ఠించారు. వడ్డార్ / ఒడ్డె శిల్పులతో కలిసి పనిచేస్తూ, వారి శ్రమను దైవంగా భావించారు. కర్ణాటక, మహారాష్ట్ర, ఆంధ్ర ప్రాంతాలలోని వడ్డార్ సమూహాలకు సిద్ధరామేశ్వరుడే ముఖ్య ఆరాధ్య సంతుడు.',
      kn: 'ಸೊನ್ನಲಿಗೆಯ (ಸೋಲಾಪುರ) ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರನು ಬಸವಣ್ಣ ಮತ್ತು ಅಲ್ಲಮಪ್ರಭುಗಳ ಸಮಕಾಲೀನ ಶರಣ. ಕಾಯಕವೇ ಕೈಲಾಸವೆಂದು ನಂಬಿ, ವಡ್ಡಾರ ಜನರೊಂದಿಗೆ ಸೇರಿ ವಿಶಾಲ ಕೆರೆ, ಬಾವಿಗಳನ್ನು ತೋಡಿಸಿ ೬೮ ಶಿವಲಿಂಗಗಳನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿದನು. ವಡ್ಡಾರ ಸಮಾಜಕ್ಕೆ ಇವನೇ ಪರಮ ಪೂಜ್ಯ ಮಾರ್ಗದರ್ಶಕ.',
      ta: 'சோலாப்பூரில் வறட்சியைப் போக்க பிரம்மாண்ட ஏரியை வெட்டி 68 சிவலிங்கங்களை அமைத்த சிவயோகி சித்தராமேஸ்வரர், வட்டார் மக்களின் அருள் குருவாக விளங்குகிறார்.',
      mr: 'सोलापूरचे ग्रामदैवत सिद्धरामेश्वर महाराजांनी दुष्काळ निवारणासाठी वडार बांधवांच्या साहाय्याने भव्य तलाव आणि ६८ शिवलिंगे स्थापन केली. वडार समाजाचे ते कुलदैवत आहेत.',
      or: 'ଦ୍ୱାଦଶ ଶତାବ୍ଦୀର ଶରଣ ସନ୍ଥ ସିଦ୍ଧରାମେଶ୍ୱର ୱଡ୍ଡାର କାରିଗରମାନଙ୍କ ସହଯୋଗରେ ସୋଲାପୁର ହ୍ରଦ ଓ ୬୮ଟି ଶିବଲିଙ୍ଗ ନିର୍ମାଣ କରି ଜଳ-ବିପ୍ଳବ ଆଣିଥିଲେ।',
      bn: 'দ্বাদশ শতাব্দীর মহান শৈব সাধক সিদ্ধরামেশ্বর সোলাপুরে বিশাল হ্রদ ও ৬৮টি শিবলিঙ্গ স্থাপন করেন। বড্ডার সমাজের পরম অভিভাবক।'
    },
    detailed_narrative: {
      en: 'The Old Kannada epic "Siddharama Charite" composed by Raghavanka (c. 1200 CE) documents how Siddharameshwara elevated civic masonry and reservoir excavation to the level of supreme spiritual worship. Millions of devotees, prominently including Waddar community delegations carrying sacred decorated Nandi-flags (Kathi), participate in the historic annual Gadda Yatra chariot festival at Solapur every Makara Sankranti.',
      hi: 'महाकवि राघवांक द्वारा रचित कन्नड़ महाकाव्य "सिद्धराम चरिते" (लगभग 1200 ई.) में वर्णित है कि सिद्धरामेश्वर ने जन-कल्याणकारी निर्माण को ही ईश्वर-सेवा माना। सोलापुर में प्रतिवर्ष मकर संक्रांति पर आयोजित होने वाली ऐतिहासिक गड्डा यात्रा में लाखों श्रद्धालु और वड्डार समाज की नंदी-ध्वज मंडलियां भाग लेती हैं।',
      te: 'కవి రాఘవాంక రచించిన "సిద్ధరామ చరితె" ప్రకారం ప్రజాహిత జల నిర్మాణాలను దైవసేవగా మలిచిన మహనీయుడు. ప్రతి సంక్రాంతికి సోలాపూర్‌లో జరిగే గడ్డా యాత్రలో వడ్డార్ల నంది ధ్వజాల ఊరేగింపు ప్రధాన ఆకర్షణ.',
      kn: 'ರಾಘವಾಂಕನ "ಸಿದ್ಧರಾಮ ಚರಿತೆ" ಕಾವ್ಯದಲ್ಲಿ ದಾಖಲಾಗಿರುವಂತೆ, ಪ್ರತಿ ಮಕರ ಸಂಕ್ರಾಂತಿಗೆ ಸೋಲಾಪುರದಲ್ಲಿ ನಡೆಯುವ ಸಿದ್ಧರಾಮೇಶ್ವರ ಗಡ್ಡಾ ಜಾತ್ರೆಯಲ್ಲಿ ವಡ್ಡಾರ ಸಮಾಜದ ನಂದಿಕೋಲು ಮೆರವಣಿಗೆ ಮುಖ್ಯ ಆಚರಣೆಯಾಗಿದೆ.',
      ta: 'ராகவாங்கரின் காவியத்தில் இவர்தம் நீர் மேலாண்மை பணிகள் சிறப்பிக்கப்பட்டுள்ளன. சோலாப்பூர் ரத திருவிழாவில் சமுதாய மக்கள் பெருமளவில் கூடுகின்றனர்.',
      mr: 'कवी राघवांकांच्या "सिद्धराम चरिते"मध्ये त्यांच्या कार्याचा गौरव आहे. मकर संक्रांतीच्या सोलापूर गड्डा यात्रेत मानाच्या काठ्या घेऊन वडार समाज अग्रभागी असतो.',
      or: 'ରାଘବାଙ୍କଙ୍କ "ସିଦ୍ଧରାମ ଚରିତେ" ଗ୍ରନ୍ଥରେ ତାଙ୍କର ଜନସେବା ବର୍ଣ୍ଣିତ। ସୋଲାପୁରର ଗଡ୍ଡା ଯାତ୍ରାରେ ୱଡ୍ଡାର ସମୁଦାୟ ପ୍ରମୁଖ ଭୂମିକା ଗ୍ରହଣ କରେ।',
      bn: 'রাঘবাঙ্কের প্রাচীন কন্নড় কাব্যে তাঁর কীর্তি বিধৃত। প্রতি মকর সংক্রান্তিতে সোলাপুরের ঐতিহাসিক গাড্ডা উৎসবে বড্ডার সম্প্রদায়ের উপস্থিতি বিশেষ তাৎপর্যপূর্ণ।'
    },
    engineering_and_civic_legacy: {
      en: 'Pioneer of egalitarian community-driven watershed management, desilting, and massive civic stone embankment engineering.',
      hi: 'सामुदायिक जल-संरक्षण, विशाल पाषाण-तटबंध एवं जन-सहभागिता आधारित जल-अभियांत्रिकी के अग्रदूत।',
      te: 'ప్రజా భాగస్వామ్య జల సంరక్షణ, రాతి కట్టడాల నిర్మాణం మరియు చెరువుల తవ్వకంలో మార్గదర్శకుడు.',
      kn: 'ಸಮುದಾಯ ಆಧಾರಿತ ಕೆರೆ ನಿರ್ಮಾಣ, ಕಲ್ಲಿನ ಏರಿ ಕಟ್ಟುವುದು ಮತ್ತು ಜಲಕಾಯಕದ ಪ್ರವರ್ತಕ.',
      ta: 'மக்கள் பங்களிப்புடன் கூடிய ஏரி மற்றும் கல் தடுப்பணை கட்டமைப்பின் முன்னோடி.',
      mr: 'लोकसहभागातून जलसंधारण आणि भव्य दगडी बंधारे उभारणीचे आद्य प्रणेते.',
      or: 'ଲୋକ-ସହଭାଗିତାରେ ଜଳସଂରକ୍ଷଣ ଓ ପଥର ବନ୍ଧ ନିର୍ମାଣର ପ୍ରଥମ ପ୍ରବର୍ତ୍ତକ।',
      bn: 'জনঅংশগ্রহণে জলাশয় খনন ও প্রস্তর বাঁধ নির্মাণ প্রকৌশলের অগ্রদূত।'
    },
    associated_places: ['Solapur (Sonnalige)', 'Basavakalyan', 'Srisailam', 'Barsi', 'Deccan borderlands'],
    canonical_sources: ['Raghavanka Siddharama Charite (c. 1200 CE)', 'Kamil Zvelebil The Vachanas of Siddharama', 'Epigraphia Carnatica & Solapur Gazetteer']
  },
  {
    id: 'fig_kolletikota_peddintlamma',
    canonical_name: 'Sri Kolletikota Peddintlamma Thalli',
    localized_name: {
      en: 'Sri Kolletikota Peddintlamma Thalli (Kolleru Lake Warrior Goddess)',
      hi: 'श्री कोल्लेतिकोटा पेद्दिंटलम्मा तल्ली (कोल्लेरु झील वीरांगना माता)',
      te: 'శ్రీ కొల్లేటికోట పెద్దింట్లమ్మ తల్లి (కొల్లేటి సరస్సు కోట వీరశక్తి)',
      kn: 'ಶ್ರೀ ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ (ಕೊಲ್ಲೇರು ಸರೋವರ ದುರ್ಗದೇವತೆ)',
      ta: 'ஸ்ரீ கொல்லேட்டிகோட்டை பெத்திண்ட்லம்மா தாய் (கொல்லேறு ஏரி வீரசக்தி)',
      mr: 'श्री कोल्लेतिकोटा पेद्दिंटलम्मा माता (कोल्लेरू तलाव दुर्गदेवी)',
      or: 'ଶ୍ରୀ କୋଲ୍ଲେତିକୋଟା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ଠାକୁରାଣୀ (କୋଲ୍ଲେରୁ ହ୍ରଦ ଜଳଦୁର୍ଗ ଦେବୀ)',
      bn: 'শ্রী কোল্লেতিকোটা পেদ্দিন্টলাম্মা মাতা (কোল্লেরু হ্রদ জলদুর্গ দেবী)'
    },
    alternate_names: [
      'Peddintlamma Ammavaru',
      'Kolletikota Peddintlamma',
      'Kolleti Peddintlamma',
      'Goddess of Kolleti Kota Water Citadel',
      'Grama Devatha & Fort Guardian of Kolleru'
    ],
    dynasty_lineage: 'Sacred Fort Protector & Kuladevatha of Gajapathi-Odiyaraju & Coastal Kshatriya Garrisons',
    era: 'Medieval Era (c. 11th–16th Century CE & Living Sacred Tradition)',
    reign_or_dates: 'Timeless Sacred Living Tradition (Documented Inscriptions & Kaifiyats)',
    epigraphic_status: 'Living Sacred Tradition',
    image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80',
    titles: {
      en: 'Presiding Warrior Deity of Kolletikota • Guardian of the Kolleti Sarasu (Kolleru Lake) Aquatic Citadel • Mother of the Royal Elder House',
      hi: 'कोल्लेतिकोटा जलदुर्ग की अधिष्ठात्री कुलदेवी • कोल्लेरु झील की रक्षा-शक्ति • राजवंशीय ज्येष्ठ सदन की माता (पेद्दिंटलम्मा)',
      te: 'కొల్లేటికోట జలదుర్గ అధిష్ఠాత్రి • కొల్లేటి సరస్సు రక్షక దైవం • పెద్ద ఇల్లు (రాజవంశ పెద్దరికం) కాపాడే వీరమాత',
      kn: 'ಕೊಲ್ಲೇಟಿಕೋಟೆ ಜಲದುರ್ಗದ ಅಧಿದೇವತೆ • ಕೊಲ್ಲೇರು ಸರೋವರ ರಕ್ಷಕ ಮಹಾಶಕ್ತಿ • ರಾಜಮನೆತನದ ಹಿರಿಯ ಮನೆ ರಕ್ಷಕಿ',
      ta: 'கொல்லேட்டிகோட்டை நீர் அரணின் காவல் தெய்வம் • கொல்லேறு ஏரி பாதுகாப்பு சக்தி • அரண்மனை மூத்த தாய்',
      mr: 'कोल्लेतिकोटा जलदुर्गाची रक्षक कुलस्वामिनी • कोल्लेरू सरोवराची दैवी शक्ती • राजघराण्याची ज्येष्ठ माता',
      or: 'କୋଲ୍ଲେତିକୋଟା ଜଳଦୁର୍ଗର ଅଧିଷ୍ଠାତ୍ରୀ ଦେବୀ • କୋଲ୍ଲେରୁ ହ୍ରଦ ରକ୍ଷାକର୍ତ୍ତ୍ରୀ ମାତା • ରାଜକୁଳର ଜ୍ୟେଷ୍ଠ ସୁରକ୍ଷାଦାତ୍ରୀ',
      bn: 'কোল্লেতিকোটা জলদুর্গের অধিষ্ঠাত্রী দেবী • কোল্লেরু হ্রদের রক্ষাকর্ত্রী মা • রাজপরিবারের জ্যেষ্ঠ মাতাদেবী'
    },
    summary: {
      en: 'Sri Kolletikota Peddintlamma Thalli is the revered warrior-mother goddess presiding over the island fortress of Kolletikota located in the heart of Kolleti Sarasu (Kolleru Lake), Andhra Pradesh. Venerated for centuries by Gajapathi royal commanders, Odiyaraju/Kshatriya warriors, and lake communities as the invincible guardian of the water citadel ("Jala Durga"), she protected the island fortress against foreign sieges through the treacherous, reed-filled waterways of Kolleru. Her annual Jatara (Theertham) during Phalguna Purnima draws hundreds of thousands of pilgrims who traverse the lake by boat to seek her fierce maternal protection.',
      hi: 'श्री कोल्लेतिकोटा पेद्दिंटलम्मा तल्ली आंध्र प्रदेश की प्रसिद्ध कोल्लेरु झील (कोल्लेति सरसु) के मध्य स्थित कोल्लेतिकोटा द्वीप-जलदुर्ग की आराध्या और रक्षक देवी हैं। गजपति सेनापतियों, ओडियाराजु/क्षत्रिय योद्धाओं और स्थानीय नौका समुदाय द्वारा शताब्दियों से पूजित, यह देवी जलदुर्ग को आक्रांताओं के घेराबंदी से अभेद्य सुरक्षा प्रदान करने वाली मानी जाती हैं। फाल्गुन पूर्णिमा के पावन अवसर पर आयोजित होने वाली वार्षिक पेद्दिंटलम्मा जतारा (तीर्थम) में लाखों भक्त नौकाओं से द्वीप पर पहुंचकर दर्शन करते हैं।',
      te: 'శ్రీ కొల్లేటికోట పెద్దింట్లమ్మ తల్లి ఆంధ్రప్రదేశ్ ఏలూరు/కృష్ణా జిల్లాల మధ్య విస్తరించిన కొల్లేటి సరస్సు నడిబొడ్డున గల కొల్లేటికోట ద్వీప జలదుర్గానికి ఆరాధ్య రక్షక దేవత. శతాబ్దాలుగా గజపతి చక్రవర్తులు, ఒడ్డేరాజులు, క్షత్రియ వీరులు, మరియు స్థానిక కొల్లేటి ప్రజలచే ఈ తల్లి కోటను శత్రు దుర్భేద్యంగా కాపాడిన వీరశక్తిగా పూజలందుకుంటోంది. ఫాల్గుణ శుద్ధ పౌర్ణమి నాడు జరిగే వార్షిక కొల్లేటికోట పెద్దింట్లమ్మ జాతర (తీర్థం) రాష్ట్రవ్యాప్తంగా లక్షలాది భక్తులను విశేషంగా ఆకర్షిస్తుంది.',
      kn: 'ಶ್ರೀ ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿಯು ಆಂಧ್ರಪ್ರದೇಶದ ಕೊಲ್ಲೇರು ಸರೋವರದ (ಕೊಲ್ಲೇಟಿ ಸರಸು) ಮಧ್ಯಭಾಗದಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಕೊಲ್ಲೇಟಿಕೋಟೆ ಜಲದುರ್ಗದ ರಕ್ಷಕ ದೇವತೆಯಾಗಿದ್ದಾರೆ. ಗಜಪತಿ ರಾಜರು, ಒಡ್ಡೇರಾಜುಲು ಕ್ಷತ್ರಿಯ ವೀರರು ಹಾಗೂ ದ್ವೀಪ ಸಮುದಾಯಗಳು ಶತಮಾನಗಳಿಂದ ಈ ತಾಯಿಯನ್ನು ಆರಾಧಿಸುತ್ತಿದ್ದಾರೆ. ಫಾಲ್ಗುಣ ಹುಣ್ಣಿಮೆಯಂದು ನಡೆಯುವ ವಾರ್ಷಿಕ ಜಾತ್ರೆಗೆ ಅಪಾರ ಭಕ್ತರು ದೋಣಿಗಳ ಮೂಲಕ ಆಗಮಿಸುತ್ತಾರೆ.',
      ta: 'ஸ்ரீ கொல்லேட்டிகோட்டை பெத்திண்ட்லம்மா தாய் ஆந்திரப் பிரதேசத்தின் கொல்லேறு ஏரியின் மத்தியில் அமைந்துள்ள கொல்லேட்டிகோட்டை தீவு நீர் அரணின் காவல் தெய்வமாவார். கஜபதி அரசர்கள் மற்றும் ஒட்டியராஜு சத்திரிய வீரர்களால் போற்றப்பட்ட இவர், ஏரியின் நீர் அரணைக் காத்த வீர சக்தியாக வணங்கப்படுகிறார்.',
      mr: 'श्री कोल्लेतिकोटा पेद्दिंटलम्मा माता आंध्र प्रदेशातील कोल्लेरू तलावाच्या मध्यभागी असलेल्या कोल्लेतिकोटा जलदुर्गाची रक्षक देवी आहे. गजपती राजे, ओडियाराजू क्षत्रिय योद्धे आणि स्थानिक बांधव शतकानुशतके या देवतेची कुलस्वामिनी म्हणून पूजा करतात.',
      or: 'ଶ୍ରୀ କୋଲ୍ଲେତିକୋଟା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ଠାକୁରାଣୀ ଆନ୍ଧ୍ରପ୍ରଦେଶର ପ୍ରସିଦ୍ଧ କୋଲ୍ଲେରୁ ହ୍ରଦ (କୋଲ୍ଲେତି ସରସୁ) ମଧ୍ୟସ୍ଥ କୋଲ୍ଲେତିକୋଟା ଜଳଦୁର୍ଗର ଅଧିଷ୍ଠାତ୍ରୀ ଦେବୀ। ଗଜପତି ସେନାପତି ଓ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟମାନେ ଏହି ଦେବୀଙ୍କୁ ଦୁର୍ଗ ରକ୍ଷାକର୍ତ୍ତ୍ରୀ ଭାବେ ପୂଜା କରିଆସୁଛନ୍ତି।',
      bn: 'শ্রী কোল্লেতিকোটা পেদ্দিন্টলাম্মা মাতা অন্ধ্রপ্রদেশের কোল্লেরু হ্রদের মধ্যবর্তী কোল্লেতিকোটা দ্বীপ জলদুর্গের মহাশক্তি দেবী। শত শত বছর ধরে গজপতি রাজা ও ওডিয়ারাজু ক্ষত্রিয় যোদ্ধাদের দ্বারা পূজিত এই দেবী জলদুর্গের অমর রক্ষাকর্ত্রী হিসেবে সুবিখ্যাত।'
    },
    detailed_narrative: {
      en: 'Kolleti Sarasu (Kolleru Lake), spanning between the Krishna and Godavari deltas, has served since ancient times as a colossal natural moat and strategic waterway. In the heart of this lake lies the island citadel of Kolletikota, known historically as an impregnable "Jala Durga" (water fortress). During the southern campaigns of Emperor Kapilendra Deva and his son Kumara Hamvira Deva in the 15th century, Gajapathi garrison detachments and Suryavamsha Odiyaraju Kshatriyas fortified Kolletikota to defend coastal Andhra routes against Bahmani and regional incursions. The island fortress could only be reached through labyrinthine boat channels and shallow marsh reeds known only to native water-pilots.\\n\\nAccording to regional Kaifiyats and living oral traditions, the defenders looked to Sri Peddintlamma Thalli ("Mother of the Grand Royal House") as their celestial commander. Legend recounts that during an enemy naval encirclement, the Goddess blinded the invaders through the dense misty vapors of Kolleru lake and revealed navigable secret channels to the defending warriors, securing victory. Beside her sacred shrine stands the ancient Gokarneshwara Swamy temple, forming a consecrated Shakthi-Shiva shield for the fortress. Today, the annual Peddintlamma Theertham during Phalguna Purnima remains one of Coastal Andhra’s most vibrant cultural festivals.',
      hi: 'कृष्णा और गोदावरी डेल्टा के मध्य स्थित कोल्लेरु झील (कोल्लेति सरसु) प्राचीन काल से ही एक अभेद्य प्राकृतिक खाई और सामरिक जलमार्ग रही है। इस झील के मध्य स्थित कोल्लेतिकोटा को ऐतिहासिक रूप से "जल दुर्ग" कहा जाता था। 15वीं सदी में महाराजा कपिलेंद्र देव और हम्मीर देव गजपति के दक्षिण विजय अभियानों के समय ओडियाराजु क्षत्रिय योद्धाओं ने इस द्वीप को एक सुदृढ़ नौसैनिक छावनी बनाया। विदेशी आक्रमणों के समय श्री पेद्दिंटलम्मा तल्ली ने रक्षा-कवच बनकर योद्धाओं का मार्गदर्शन किया। उनके साथ गोकर्णेश्वर स्वामी का प्राचीन शिव मंदिर भी द्वीप पर विद्यमान है।',
      te: 'కృష్ణా-గోదావరి డెల్టాల నడుమ వెలసిన కొల్లేటి సరస్సు (కొల్లేరు) ప్రాచీన కాలం నుండి అద్భుతమైన సహజ జలదుర్గంగా విలసిల్లింది. ఈ సరస్సు నడిబొడ్డున గల కొల్లేటికోట గజపతుల కాలంలో అత్యంత కీలకమైన సైనిక రక్షణ కేంద్రంగా మారింది. కపిలేంద్ర దేవ గజపతి, కుమార హంవీర దేవుల దక్షిణ విజయ యాత్రల సమయంలో ఒడ్డేరాజులు, సూర్యవంశ క్షత్రియులు ఈ జలదుర్గంలో స్థావరాలు ఏర్పాటు చేసుకున్నారు. శత్రువులు సరస్సు దాటి కోటను ముట్టడించలేకపోయారు. పెద్దింట్లమ్మ తల్లిని తమ కులదేవతగా, విజయప్రదాయినిగా భావించి పూజించారు. ఈ కోటలో వెలసిన గోకర్ణేశ్వర స్వామి మరియు పెద్దింట్లమ్మ ఆలయాలు చారిత్రక, ఆధ్యాత్మిక వైభవానికి ప్రతీకలు.',
      kn: 'ಕೃಷ್ಣಾ ಮತ್ತು ಗೋದಾವರಿ ನದಿಗಳ ನಡುವಿನ ಕೊಲ್ಲೇರು ಸರೋವರವು ನೈಸರ್ಗಿಕ ಜಲದುರ್ಗವಾಗಿತ್ತು. ಕೊಲ್ಲೇಟಿಕೋಟೆಯು ಗಜಪತಿ ಸೈನ್ಯ ಮತ್ತು ಒಡ್ಡೇರಾಜುಲು ಯೋಧರ ಪ್ರಮುಖ ರಕ್ಷಣಾ ನೆಲೆಯಾಗಿತ್ತು. ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿಯು ಆ ಜಲದುರ್ಗದ ರಕ್ಷಕ ದೇವತೆಯಾಗಿ ವಿರಾಜಮಾನಳಾಗಿದ್ದಾಳೆ.',
      ta: 'கிருஷ்ணா-கோதாவரி டெல்டாவில் உள்ள கொல்லேறு ஏரி இயற்கையான நீர் அரணாக செயல்பட்டது. கொல்லேட்டிகோட்டை நீர் கோட்டையின் காவல் தெய்வமாக பெத்திண்ட்லம்மா தாய் போற்றப்படுகிறார்.',
      mr: 'कोल्लेरू तलावातील कोल्लेतिकोटा जलदुर्ग हा गजपती सैन्याचा अभेद्य बालेकिल्ला होता. या दुर्गीची कुलस्वामिनी माता पेद्दिंटलम्मा भक्तांचे आणि सैनिकांचे रक्षण करणारी मानली जाते.',
      or: 'କୋଲ୍ଲେରୁ ହ୍ରଦ ମଧ୍ୟରେ ଅବସ୍ଥିତ କୋଲ୍ଲେତିକୋଟା ଜଳଦୁର୍ଗ ଗଜପତି ସେନାପତିମାନଙ୍କର ପ୍ରମୁଖ ଘାଟି ଥିଲା। ମାତା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ଏହି ଦୁର୍ଗର ଅଭେଦ୍ୟ ରକ୍ଷାକର୍ତ୍ତ୍ରୀ ଭାବେ ପୂଜିତା।',
      bn: 'কোল্লেরু হ্রদের মাঝে কোল্লেতিকোটা জলদুর্গ ছিল ঐতিহাসিক গজপতি যোদ্ধাদের অন্যতম প্রধান সামরিক ঘাঁটি। পেদ্দিন্টলাম্মা মাতা এই দুর্গের জাগ্রত মহাশক্তি।'
    },
    engineering_and_civic_legacy: {
      en: 'Mastery of aquatic fortifications (Jala Durga), including hidden submerged palisades, canal boat networks (Dony lu / Sangam rafts), reed barriers, and ecological preservation of the freshwater wetland basin.',
      hi: 'जल-दुर्ग स्थापत्य कला, गुप्त नौसैनिक जलमार्ग, दलदली सुरक्षा प्राचीर एवं मीठे पानी की विशाल झील का जल-पर्यावरणीय संरक्षण।',
      te: 'జలదుర్గ నిర్మాణ కౌశలం, రహస్య నావికా మార్గాలు, దోనెలు-పడవల రక్షణ వలయం మరియు కొల్లేటి మంచినీటి సరస్సు పర్యావరణ పరిరక్షణ.',
      kn: 'ಜಲದುರ್ಗ ನಿರ್ಮಾಣ ಕಲೆ, ರಹಸ್ಯ ದೋಣಿ ಮಾರ್ಗಗಳು ಮತ್ತು ಕೊಲ್ಲೇರು ಸರೋವರದ ಜಲ-ಸಂರಕ್ಷಣಾ ಪರಂಪರೆ.',
      ta: 'நீர் அரண் கட்டமைப்பு, ரகசிய படகுப் பாதைகள் மற்றும் கொல்லேறு ஏரியின் நீர் மேலாண்மை மரபு.',
      mr: 'जलदुर्ग संरक्षण रचना, छुपे जलमार्ग आणि कोल्लेरू सरोवराचे जलव्यवस्थापन.',
      or: 'ଜଳଦୁର୍ଗ ନିର୍ମାଣ ଶୈଳୀ, ଗୁପ୍ତ ନୌକା ପଥ ଏବଂ କୋଲ୍ଲେରୁ ହ୍ରଦର ଜଳ ସଂରକ୍ଷଣ।',
      bn: 'জলদুর্গ নির্মাণ কৌশল, গুপ্ত নৌপথ ও কোল্লেরু হ্রদের পরিবেশগত জলসংরক্ষণ।'
    },
    associated_places: [
      'Kolletikota (Kaikaluru, Eluru District, Andhra Pradesh)',
      'Kolleti Sarasu (Kolleru Freshwater Lake)',
      'Sri Gokarneshwara Swamy Temple (Kolletikota)',
      'Kondapalli & Kondavidu Defense Perimeter'
    ],
    canonical_sources: [
      'Mackenzie Manuscripts & Local Kaifiyats (Kolletikota & Kaikaluru Kaifiyats)',
      'South Indian Inscriptions (SII), Vol. X (Eastern Chalukya and Gajapathi Delta Inscriptions)',
      'Imperial Gazetteer of India, Vol. XV (Entries on Kolleru Lake & Kolletikota Fort)',
      'Andhra Pradesh State Archaeology & Endowments Department Archival Reports'
    ]
  }
];

// ---------------------------------------------------------------------------
// 2. COMMUNITY SYNONYMS & DESIGNATIONS REPOSITORY
// ---------------------------------------------------------------------------
export const COMMUNITY_SYNONYMS: CommunitySynonym[] = [
  // =========================================================================
  // CATEGORY A: DYNASTIC AND LINEAGE DESIGNATIONS
  // =========================================================================
  {
    id: 'syn_suryavamshi',
    title: 'Suryavamshi',
    native_scripts: {
      Devanagari: 'सूर्यवंशी',
      Telugu: 'సూర్యవంశీ / సూర్యవంశం',
      Kannada: 'ಸೂರ್ಯವಂಶಿ',
      Tamil: 'சூர்யவம்ஷி',
      Odia: 'ସୂର୍ଯ୍ୟବଂଶୀ',
      Bengali: 'সূর্যবংশী'
    },
    category: 'Royal Nobility',
    designation_group: 'Dynastic and lineage designations',
    geographical_association: 'Pan-Indian (Odisha, Andhra Pradesh, Karnataka, Tamil Nadu & Northern India)',
    epistemic_classification: 'Documented Epigraphic & Historical Designation',
    epistemic_note: {
      en: 'Documented in Gajapathi royal copper plates (Veligalani, 1458 CE) as the imperial dynasty’s lineage; invoked in community genealogies as an ancestral solar-lineage identity.',
      hi: 'गजपति ताम्रपत्रों (वेलिगलानी, 1458 ई.) में राजवंश के रूप में प्रमाणित; सामुदायिक वंशावलियों में पैतृक सूर्यवंशी पहचान के रूप में मान्य।',
      te: 'గజపతి రాజుల తామ్రపత్ర శాసనాలలో (వెలిగలని, 1458 CE) రాజవంశ నామంగా నమోదైంది; సామాజిక వంశావళి సంప్రదాయాలలో పూర్వీక సూర్యవంశ గుర్తింపుగా పేర్కొనబడుతుంది.',
      kn: 'ಗಜಪತಿ ತಾಮ್ರশಾಸನಗಳಲ್ಲಿ ರಾಜವಂಶವಾಗಿ ದಾಖಲಾಗಿದೆ; ಸಮುದಾಯದ ವಂಶಾವಳಿ ಸಂಪ್ರದಾಯಗಳಲ್ಲಿ ಪೂರ್ವಜರ ಸೂರ್ಯವಂಶ ಗುರುತಾಗಿ ಬಳಕೆಯಲ್ಲಿದೆ.',
      ta: 'கஜபதி செப்பேடுகளில் அரச வம்சமாகப் பதிவு செய்யப்பட்டுள்ளது; சமூக மரபுகளில் சூரிய வம்ச அடையாளமாகக் கருதப்படுகிறது.',
      mr: 'गजपती ताम्रपटांमध्ये राजवंश म्हणून नोंदवलेले; समाजाच्या वंशावळीत सूर्यवंशी ओळख म्हणून जपले जाते.',
      or: 'ଗଜପତି ତାମ୍ରଫଳକରେ (୧୪୫୮ খ୍ରୀ.) ରାଜବଂଶ ଭାବେ ପ୍ରମାଣିତ ଏବଂ ସାମୁଦାୟିକ ପରମ୍ପରାରେ ପୂର୍ବପୁରୁଷ ସୂର୍ଯ୍ୟବଂଶ ପରିଚୟ।',
      bn: 'গজপতি তাম্রশাসনে (১৪৫৮ খ্রি.) রাজবংশ হিসেবে নথিবদ্ধ এবং সম্প্রদায়ের বংশপরম্পরায় সূর্যবংশীয় পরিচয় হিসেবে প্রচলিত।'
    },
    primary_regions: ['Utkala-Kalinga', 'Coastal Andhra & Rayalaseema', 'Karnataka Plateau', 'Pan-Indian Corridors'],
    prominent_states: ['Odisha', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra'],
    linguistic_origin: 'Sanskrit compound "Surya" (Sun) + "Vamshi" (of the lineage/dynasty of the Solar Race).',
    historical_role: {
      en: 'Denotes affiliation with the ancient Solar Dynasty (Suryavamsha). Historically attested in the titles of the Suryavamsha Gajapathi monarchs of Odisha and preserved in community lineage traditions across peninsular and northern India.',
      hi: 'प्राचीन सूर्यवंश से संबद्धता दर्शाने वाली वंश-संज्ञा। ओडिशा के सूर्यवंशी गजपति सम्राटों के अभिलेखों में प्रमाणित तथा प्रायद्वीपीय व उत्तर भारत की सामुदायिक परंपराओं में संरक्षित।',
      te: 'ప్రాచీన సూర్యవంశానికి చెందిన వంశ నామం. ఒడిశా సూర్యవంశ గజపతి చక్రవర్తుల శాసనాలలో నమోదై, దక్షిణ మరియు ఉత్తర భారత సామాజిక సంప్రదాయాలలో కొనసాగుతున్న వారసత్వ గుర్తింపు.',
      kn: 'ಪ್ರಾಚೀನ ಸೂರ್ಯವಂಶದ ಪರಂಪರೆಯನ್ನು ಸೂಚಿಸುವ ವಂಶನಾಮ. ಒಡಿಶಾದ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಅರಸರ ಶಾಸನಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾಗಿದ್ದು ಸಮುದಾಯದ ಪರಂಪರೆಯಲ್ಲಿ ಉಳಿದುಬಂದಿದೆ.',
      ta: 'பண்டைய சூரிய வம்சத் தொடர்பைக் குறிக்கும் மரபுப் பெயர். ஒடிசாவின் சூர்யவம்ச கஜபதி மன்னர்களின் கல்வெட்டுகளிலும் சமூக வம்சாவளி மரபுகளிலும் இடம்பெறுகிறது.',
      mr: 'प्राचीन सूर्यवंशाशी संबंधित वंश-संज्ञा. ओडिशाच्या सूर्यवंशी गजपती सम्राटांच्या शिलालेखांत प्रमाणित आणि सामाजिक परंपरेत जतन केलेले नाव.',
      or: 'ପ୍ରାଚୀନ ସୂର୍ଯ୍ୟବଂଶ ସହ ସମ୍পୃକ୍ତ ବଂଶଗତ ପରିଚୟ। ଓଡ଼ିଶାର ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସମ୍ରାଟଙ୍କ ଶିଳାଲେଖରେ ପ୍ରମାଣିତ ଓ ସାମୁଦାୟିକ ପରମ୍ପରାରେ ସଂରକ୍ଷିତ।',
      bn: 'প্রাচীন সূর্যবংশের সাথে সম্পর্কিত বংশগত নাম। ওড়িশার সূর্যবংশী গজপতি সম্রাটদের শিলালিপিতে প্রত্যয়িত এবং সামাজিক ঐতিহ্যে সংরক্ষিত।'
    },
    sacred_associations: ['Surya Deva (Konark)', 'Sri Rama', 'Samrat Sagara', 'Maharshi Bhagiratha']
  },
  {
    id: 'syn_sagaravamshi',
    title: 'SagaraVamshi',
    native_scripts: {
      Devanagari: 'सगरवंशी',
      Telugu: 'సగరవంశీ',
      Kannada: 'ಸಗರವಂಶಿ',
      Tamil: 'சகரவம்ஷி',
      Odia: 'ସଗରବଂଶୀ',
      Bengali: 'সগরবংশী'
    },
    category: 'Royal Nobility',
    designation_group: 'Dynastic and lineage designations',
    geographical_association: 'Deccan, Andhra Pradesh, Telangana, Karnataka, Maharashtra & Northern Plains',
    epistemic_classification: 'Community Tradition & Lineage Claim',
    epistemic_note: {
      en: 'Grounded in Puranic cosmology (Ramayana Bala Kanda, Bhagavata Purana) and venerated in traditional community genealogies linking oceanic and hydraulic excavation traditions to Emperor Sagara.',
      hi: 'पौराणिक आख्यानों (रामायण बालकांड, भागवत पुराण) एवं पारंपरिक सामुदायिक वंशावलियों पर आधारित, जो जल-संरक्षण परंपरा को चक्रवर्ती सम्राट सगर से जोड़ती हैं।',
      te: 'పురాణ గాథలు (వాల్మీకి రామాయణం బాలకాండ) మరియు సామాజిక వంశావళి సంప్రదాయాల ఆధారంగా చక్రవర్తి సగరునితో జల-నిర్మాణ వారసత్వాన్ని అనుసంధానించే సాంప్రదాయ నామం.',
      kn: 'ಪುರಾಣ ಆಕರಗಳು (ರಾಮಾಯಣ ಬಾಲಕಾಂಡ) ಮತ್ತು ಸಮುದಾಯದ ಸಾಂಪ್ರದಾಯಿಕ ವಂಶಾವಳಿಗಳಲ್ಲಿ ಚಕ್ರವರ್ತಿ ಸಗರನಿಗೆ ಜಲ-ನಿರ್ಮಾಣ ಪರಂಪರೆಯನ್ನು ಬೆಸೆಯುವ ವಂಶನಾಮ.',
      ta: 'புராண மரபுகள் (இராமாயணம் பாலகாண்டம்) மற்றும் சக்கரவர்த்தி சகரருடன் நீரியல் மரபை இணைக்கும் சமூக வம்சாவளி நம்பிக்கைகளின் அடிப்படையிலான பெயர்.',
      mr: 'पौराणिक संदर्भ (रामायण बालकांड) आणि चक्रवर्ती सम्राट सगर यांच्याशी जल-स्थापत्य परंपरा जोडणाऱ्या पारंपरिक वंशावळीवर आधारित संज्ञा.',
      or: 'ପୌରାଣିକ ଗ୍ରନ୍ଥ (ରାମାୟଣ ବାଳକାଣ୍ଡ) ଓ ସମ୍ରାଟ ସଗରଙ୍କ ସହ ଜଳ-ଖନନ ପରମ୍ପରାକୁ ଯୋଡ଼ୁଥିବା ପାରମ୍ପରିକ ବଂଶାବଳୀ ଆଧାରିତ ପରିଚୟ।',
      bn: 'পৌরাণিক কাহিনী (রামায়ণ বালকাণ্ড) এবং সম্রাট সগরের সাথে জল-খনন ঐতিহ্যকে যুক্ত করা সম্প্রদায়ের বংশগত পরম্পরার নাম।'
    },
    primary_regions: ['Deccan Plateau', 'Krishna-Godavari Basin', 'Northern & Western Plains'],
    prominent_states: ['Andhra Pradesh', 'Telangana', 'Karnataka', 'Maharashtra', 'Rajasthan', 'Gujarat'],
    linguistic_origin: 'Sanskrit lineage name referring to descendants/followers of Solar Emperor Sagara ("Sagara" + "Vamshi").',
    historical_role: {
      en: 'Traditional lineage designation honoring Chakravarti Samrat Sagara and Maharshi Bhagiratha, whose Puranic excavation of the ocean bed (Sagara) and descent of the Ganga inspire the community’s hereditary ethos as master reservoir and canal builders.',
      hi: 'चक्रवर्ती सम्राट सगर और महर्षि भगीरथ की स्मृति में प्रयुक्त पारंपरिक वंश-संज्ञा, जिनका सागर-खनन और गंगा-अवतरण आख्यान समाज की ऐतिहासिक जलाशय व नहर निर्माण परंपरा का आदर्श माना जाता है।',
      te: 'చక్రవర్తి సగరుడు మరియు మహర్షి భగీరథుల జ్ఞాపకార్థం వ్యవహరించే సాంప్రదాయ వంశ నామం. సముద్ర తవ్వకం మరియు గంగావతరణ గాథలు ఈ సమాజపు చారిత్రక తటాక, కాలువల నిర్మాణ నైపుణ్యానికి స్ఫూర్తిగా నిలిచాయి.',
      kn: 'ಚಕ್ರವರ್ತಿ ಸಗರ ಮತ್ತು ಮಹರ್ಷಿ ಭಗೀರಥರ ಪರಂಪರೆಯನ್ನು ಸ್ಮರಿಸುವ ವಂಶನಾಮ; ಕೆರೆ, ಕಾಲುವೆ ಮತ್ತು ಜಲಾಶಯ ನಿರ್ಮಾಣ ಪರಂಪರೆಗೆ ಪ್ರೇರಣೆಯಾಗಿದೆ.',
      ta: 'சக்கரவர்த்தி சகரர் மற்றும் பகீரத முனிவரின் மரபைப் போற்றும் பாரம்பரிய வம்சப் பெயர்; ஏரிகள் மற்றும் கால்வாய்கள் அமைக்கும் வரலாற்றுப் பணிக்கு ஆதாரமாகக் கருதப்படுகிறது.',
      mr: 'चक्रवर्ती सम्राट सगर आणि महर्षि भगीरथ यांचा वारसा सांगणारी पारंपरिक वंश-संज्ञा; तलाव व कालवे उभारणीच्या ऐतिहासिक कार्याशी संबंधित.',
      or: 'ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ ସଗର ଓ ମହର୍ଷି ଭଗୀରଥଙ୍କ ସ୍ମୃତିରେ ବ୍ୟବହୃତ ପାରମ୍ପରିକ ବଂଶ ନାମ, ଯାହା ଜଳାଶୟ ଓ କେନାଲ ନିର୍ମାଣ ପରମ୍ପରାର ପ୍ରেরଣା।',
      bn: 'চক্রবর্তী সম্রাট সগর ও মহর্ষি ভগীরথের স্মৃতিবাহী ঐতিহ্যবাহী বংশনাম, যা জলাশয় ও খাল নির্মাণের ঐতিহাসিক পরম্পরার প্রেরণা।'
    },
    sacred_associations: ['Samrat Sagara', 'Maharshi Bhagiratha', 'Goddess Ganga', 'Surya Deva']
  },
  {
    id: 'syn_raghuvamshi',
    title: 'RaghuVamshi',
    native_scripts: {
      Devanagari: 'रघुवंशी',
      Telugu: 'రఘువంశీ',
      Kannada: 'ರಘುವಂಶಿ',
      Tamil: 'ரகுவம்ஷி',
      Odia: 'ରଘୁବଂଶୀ',
      Bengali: 'রঘুবংশী'
    },
    category: 'Royal Nobility',
    designation_group: 'Dynastic and lineage designations',
    geographical_association: 'Pan-Indian (Odisha, Andhra Pradesh, Karnataka & Northern India)',
    epistemic_classification: 'Community Tradition & Lineage Claim',
    epistemic_note: {
      en: 'Classical Sanskrit solar-lineage title (House of Raghu and Sri Rama) invoked in royal eulogies (Prashastis) of Suryavamsha rulers and preserved in community ancestral traditions.',
      hi: 'सूर्यवंशी शासकों की प्रशस्तियों में प्रयुक्त शास्त्रीय रघुकुल उपाधि तथा सामुदायिक कुल-परंपराओं में श्रीराम के वंश से संबद्ध पहचान।',
      te: 'సూర్యవంశ రాజుల ప్రశస్తులలో మరియు సామాజిక కుల-వంశావళి సంప్రదాయాలలో రఘుమహారాజు, శ్రీరాముని సూర్యవంశ శాఖగా పేర్కొనబడే సాంప్రదాయ నామం.',
      kn: 'ಸೂರ್ಯವಂಶದ ರಾಜಪ್ರಶಸ್ತಿಗಳಲ್ಲಿ ಮತ್ತು ಸಮುದಾಯದ ಕುಲಪರಂಪರೆಯಲ್ಲಿ ರಘುಕುಲ ಹಾಗೂ ಶ್ರೀರಾಮನ ವಂಶ ಶಾಖೆಯಾಗಿ ಗುರುತಿಸಲಾಗುವ ಹೆಸರು.',
      ta: 'சூரிய வம்ச மன்னர்களின் மெய்க்கீர்த்திகளிலும் சமூக வம்சாவளி மரபுகளிலும் இரகு குலம் மற்றும் ஸ்ரீராமரின் மரபைக் குறிக்கும் பெயர்.',
      mr: 'सूर्यवंशी राजांच्या प्रशस्तींमध्ये आणि समाजाच्या कुल-परंपरेत रघुकुल व प्रभू श्रीरामांच्या वंशाशी संबंधित मानली जाणारी संज्ञा.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଶାସକଙ୍କ ପ୍ରଶସ୍ତି ଏବଂ ସାମୁଦାୟିକ କୁଳ-ପରମ୍ପରାରେ ରଘୁକୁଳ ଓ ଶ୍ରୀରାମଙ୍କ ବଂଶଧର ଭାବେ ବ୍ୟବହୃତ ପରିଚୟ।',
      bn: 'সূর্যবংশীয় শাসকদের প্রশস্তি এবং সম্প্রদায়ের কুল-ঐতিহ্যে রঘুকুল ও শ্রীরামের বংশধারা নির্দেশক নাম।'
    },
    primary_regions: ['Utkala-Kalinga', 'Coastal Andhra', 'Deccan Plateau', 'Gangetic & Northern Belt'],
    prominent_states: ['Odisha', 'Andhra Pradesh', 'Telangana', 'Karnataka', 'Uttar Pradesh', 'Madhya Pradesh'],
    linguistic_origin: 'Sanskrit dynastic patronymic from King Raghu of the Ikshvaku/Solar dynasty, immortalized in Kalidasa’s Raghuvamsham.',
    historical_role: {
      en: 'Signifies the Raghu sub-lineage of the Suryavamsha (Solar Race) culminating in Lord Sri Rama. Invoked in Gajapathi temple endowments ("Sri Rama Rajya" ideals) and in community gotra and kula-purana traditions.',
      hi: 'सूर्यवंश की रघुकुल शाखा (प्रभु श्रीराम का वंश) का सूचक। गजपति अभिलेखों और समाज की गोत्र व कुल-पुराण परंपराओं में आदरपूर्वक प्रयुक्त।',
      te: 'సూర్యవంశంలోని రఘుకుల శాఖను (శ్రీరాముని వంశాన్ని) సూచించే నామం. గజపతి శాసన ప్రశస్తులలో మరియు సామాజిక గోత్ర, కులపురాణ సంప్రదాయాలలో గౌరవంగా వ్యవహరించబడుతుంది.',
      kn: 'ಸೂರ್ಯವಂಶದ ರಘುಕುಲ ಶಾಖೆಯನ್ನು (ಶ್ರೀರಾಮನ ವಂಶ) ಸೂಚಿಸುವ ಪದ. ಗಜಪತಿ ಶಾಸನ ಪ್ರಶಸ್ತಿಗಳಲ್ಲಿ ಮತ್ತು ಸಮುದಾಯದ ಕುಲಪುರಾಣಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾಗಿದೆ.',
      ta: 'சூரிய வம்சத்தின் இரகு குலக் கிளையைக் (ஸ்ரீராமரின் வம்சம்) குறிக்கும் பெயர். கஜபதி கல்வெட்டுப் புகழுரைகளிலும் குலபுராண மரபுகளிலும் போற்றப்படுகிறது.',
      mr: 'सूर्यवंशातील रघुकुल शाखेचे (प्रभू श्रीरामांचे कुल) निदर्शक नाव. गजपती प्रशस्ती आणि समाजाच्या कुलपुराण परंपरेत आढळते.',
      or: 'ସୂର୍ଯ୍ୟବଂଶର ରଘୁକୁଳ ଶାଖା (ପ୍ରଭୁ ଶ୍ରୀରାମଙ୍କ ବଂଶ) ସୂଚକ ନାମ, ଯାହା ଗଜପତି ପ୍ରଶସ୍ତି ଓ କୁଳ-ପୁରାଣ ପରମ୍ପରାରେ ବର୍ଣ୍ଣିତ।',
      bn: 'সূর্যবংশের রঘুকুল শাখা (প্রভু শ্রীরামের বংশ) নির্দেশক নাম, যা গজপতি প্রশস্তি ও কুলপুরাণ ঐতিহ্যে ব্যবহৃত।'
    },
    sacred_associations: ['Lord Sri Rama (Kodanda Rama)', 'King Raghu', 'Ikshvaku', 'Surya Deva']
  },
  {
    id: 'syn_od_oad_odra',
    title: 'Od / Oad / Odra',
    native_scripts: {
      Devanagari: 'ओड / ओड्र / औड्र',
      Odia: 'ଓଡ଼ / ଓଡ଼୍ର / ଔଡ୍ର',
      Telugu: 'ఓడ్ / ఓడ్ర / ఔడ్ర',
      Bengali: 'ওড / ওড্র / ঔড্র'
    },
    category: 'Classical Epigraphic Root',
    designation_group: 'Dynastic and lineage designations',
    geographical_association: 'Ancient Odra Desha (Odisha) & Pan-Indian Historical Corridors',
    epistemic_classification: 'Documented Epigraphic & Historical Designation',
    epistemic_note: {
      en: 'Attested in classical Sanskrit texts (Mahabharata, Manusmriti, Natyashastra) and medieval copper-plate charters as the historical ethnonym and territorial name of Odra Desha.',
      hi: 'महाभारत, मनुस्मृति, नाट्यशास्त्र और मध्यकालीन ताम्रपत्रों में ओड्र देश के ऐतिहासिक क्षेत्रीय व जातीय नाम के रूप में प्रमाणित।',
      te: 'మహాభారతం, మనుస్మృతి, నాట్యశాస్త్రం మరియు మధ్యయుగ తామ్రపత్ర శాసనాలలో ఓడ్ర దేశపు చారిత్రక నామంగా నిర్ధారించబడింది.',
      kn: 'ಮಹಾಭಾರತ, ಮನುಸ್ಮೃತಿ, ನಾಟ್ಯಶಾಸ್ತ್ರ ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳಲ್ಲಿ ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ಹೆಸರಾಗಿ ದಾಖಲಾಗಿದೆ.',
      ta: 'மகாபாரதம், மனுஸ்மிருதி, நாட்டியசாஸ்திரம் மற்றும் செப்பேடுகளில் ஒட்ர தேசத்தின் வரலாற்றுப் பெயராகப் பதிவு செய்யப்பட்டுள்ளது.',
      mr: 'महाभारत, मनुस्मृती, नाट्यशास्त्र आणि मध्ययुगीन ताम्रपटांमध्ये ओड्र देशाचे ऐतिहासिक नाव म्हणून प्रमाणित.',
      or: 'ମହାଭାରତ, ମନୁସ୍ମୃତି, ନାଟ୍ୟଶାସ୍ତ୍ର ଓ ମଧ୍ୟযୁଗୀୟ ତାମ୍ରଫଳକରେ ଓଡ଼୍ର ଦେଶର ଐତିହାସିକ ନାମ ଭାବେ ପ୍ରମାଣିତ।',
      bn: 'মহাভারত, মনুস্মৃতি, নাট্যশাস্ত্র ও মধ্যযুগীয় তাম্রশাসনে ওড্র দেশের ঐতিহাসিক নাম হিসেবে প্রত্যয়িত।'
    },
    primary_regions: ['Pan-Indian Civilizational Substratum', 'Gangetic Belt', 'Central India', 'Eastern Seaboard'],
    prominent_states: ['All Indian States & Trans-Indus Diaspora'],
    linguistic_origin: 'Attested in the Mahabharata, Manusmriti, Natyashastra, and Pliny the Elder’s Naturalis Historia ("Oretes").',
    historical_role: {
      en: 'The primordial civilizational root from which Odra Desha, the Odia language, and the far-reaching diaspora across the subcontinent derive their historical terminology.',
      hi: 'वह आदिम सभ्यतामूलक संज्ञा जिससे ओड्र देश, उड़िया भाषा और उपमहाद्वीप में विस्तृत संबंधित समुदाय अपनी ऐतिहासिक शब्दावली प्राप्त करते हैं।',
      te: 'మహాభారతం, ప్రాచీన శాసనాలలో పేర్కొనబడిన మూల నామం, దీని నుండే ఓడ్ర దేశం మరియు వివిధ ప్రాంతీయ నామాలు ఉద్భవించాయి.',
      kn: 'ಮಹಾಭಾರತ ಮತ್ತು ಪ್ರಾಚೀನ ಶಾಸನಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾದ ಮೂಲ ಸಂಸ್ಕೃತಿ ಹೆಸರು.',
      ta: 'பண்டைய காவியங்கள் மற்றும் கல்வெட்டுகளில் குறிப்பிடப்படும் ஆதி மூலப் பெயர்.',
      mr: 'महाभारत आणि प्राचीन शिलालेखांत उल्लेखलेली मूळ ऐतिहासिक संज्ञा.',
      or: 'ମହାଭାରତ ଓ ପ୍ରାଚୀନ ଶିଳାଲେଖରେ ବର୍ଣ୍ଣିତ ମୂଳ ପରିଚୟ ଯେଉଁଥିରୁ ଓଡ଼୍ର ଦେଶ ଓ ଭାଷାର ନାମକରଣ ହୋଇଛି।',
      bn: 'মহাভারত ও প্রাচীন শিলালিপিতে উল্লেখিত মূল ঐতিহাসিক জাতিবাচক নাম।'
    },
    sacred_associations: ['Surya (The Sun God)', 'Ganga Mata', 'Lord Jagannatha', 'Mahameghavahana Kharavela']
  },

  // =========================================================================
  // CATEGORY B: REGIONAL COMMUNITY DESIGNATIONS
  // =========================================================================
  {
    id: 'syn_odisha_kshatriya',
    title: 'Odisha Kshatriya',
    native_scripts: {
      Odia: 'ଓଡ଼ିଶା କ୍ଷତ୍ରିୟ',
      Devanagari: 'ओडिशा क्षत्रिय',
      Telugu: 'ఒడిశా క్షత్రియ',
      Kannada: 'ಒಡಿಶಾ ಕ್ಷತ್ರಿಯ',
      Tamil: 'ஒடிசா க்ஷத்திரிய',
      Bengali: 'ওড়িশা ক্ষত্রিয়'
    },
    category: 'Royal Nobility',
    designation_group: 'Regional community designations',
    geographical_association: 'Odisha',
    epistemic_classification: 'Documented Epigraphic & Historical Designation',
    epistemic_note: {
      en: 'Regional designation associated with Odisha (ancient Odra / Utkala / Kalinga), referring to martial and ruling Kshatriya lineages of the Mahanadi basin and coastal Odisha.',
      hi: 'ओडिशा (प्राचीन ओड्र / उत्कल / कलिंग) से संबद्ध क्षेत्रीय संज्ञा, जो महानदी बेसिन और तटीय ओडिशा की सामरिक व शासक क्षत्रिय परंपराओं को दर्शाती है।',
      te: 'ఒడిశా (ప్రాచీన ఓడ్ర / ఉత్కళ / కళింగ) ప్రాంతానికి చెందిన ప్రాంతీయ నామం; మహానది లోయ మరియు తీర ఒడిశా క్షత్రియ యోధ పరంపరను సూచిస్తుంది.',
      kn: 'ಒಡಿಶಾ (ಪ್ರಾಚೀನ ಓಡ್ರ / ಉತ್ಕಳ / ಕಳಿಂಗ) ಪ್ರದೇಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಾದೇಶಿಕ ನಾಮ; ಮಹಾನದಿ ಕಣಿವೆ ಮತ್ತು ಕರಾವಳಿ ಒಡಿಶಾದ ಕ್ಷತ್ರಿಯ ಪರಂಪರೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ.',
      ta: 'ஒடிசா (பண்டைய ஒட்ர / உத்கல / கலிங்க) பகுதியுடன் தொடர்புடைய பிராந்தியப் பெயர்; மகாநதி மற்றும் கடற்கரை ஒடிசாவின் சத்திரிய மரபுகளைக் குறிக்கிறது.',
      mr: 'ओडिशा (प्राचीन ओड्र / उत्कल / कलिंग) प्रदेशाशी संबंधित प्रादेशिक नाव; महानदी खोरे व किनारी ओडिशातील क्षत्रिय परंपरेचे निदर्शक.',
      or: 'ଓଡ଼ିଶା (ପ୍ରାଚୀନ ଓଡ଼୍ର / ଉତ୍କଳ / କଳିଙ୍ଗ) ଅଞ୍ଚଳ ସହ ସମ୍ପୃକ୍ତ ଆଞ୍ଚଳିକ ପରିଚୟ, ଯାହା ମହାନଦୀ ଉପତ୍ୟକା ଓ ଉପକୂଳ ଓଡ଼ିଶାର କ୍ଷତ୍ରିୟ ପରମ୍ପରାକୁ ବୁଝାଏ।',
      bn: 'ওড়িশা (প্রাচীন ওড্র / উৎকল / কলিঙ্গ) অঞ্চলের সাথে যুক্ত আঞ্চলিক নাম, যা মহানদী অববাহিকা ও উপকূলীয় ওড়িশার ক্ষত্রিয় ঐতিহ্য নির্দেশ করে।'
    },
    primary_regions: ['Coastal Odisha', 'Mahanadi Delta', 'Cuttack-Puri-Khurda Belt', 'Ganjam & Kalinga Highlands'],
    prominent_states: ['Odisha'],
    linguistic_origin: 'Regional compound combining "Odisha" (derived from Odra Vishaya) with Sanskrit "Kshatriya".',
    historical_role: {
      en: 'Represents the regional Kshatriya heritage of Odisha (Odra Desha), historically encompassing royal retainers, fort commanders (Garhjat and Kataka), and landed martial lineages (Khandayats and Paika-Kshatriya traditions) under the Eastern Ganga and Gajapathi realms.',
      hi: 'ओडिशा (ओड्र देश) की क्षेत्रीय क्षत्रिय विरासत का प्रतिनिधित्व करता है, जिसमें पूर्वी गंग और गजपति साम्राज्यों के अधीन कटक व गढ़जात दुर्गों के सैन्य नायक और सामरिक वंश शामिल रहे हैं।',
      te: 'ఒడిశా (ఓడ్ర దేశం) ప్రాంతీయ క్షత్రియ వారసత్వాన్ని సూచిస్తుంది; తూర్పు గంగ మరియు గజపతి సామ్రాజ్యాల కాలంలో కటక్ మరియు దుర్గాల సైనిక నాయకులు, క్షత్రియ యోధ వంశాలను ఇది ప్రతిబింబిస్తుంది.',
      kn: 'ಒಡಿಶಾದ (ಓಡ್ರ ದೇಶ) ಪ್ರಾದೇಶಿಕ ಕ್ಷತ್ರಿಯ ಪರಂಪರೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ; ಪೂರ್ವ ಗಂಗ ಮತ್ತು ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯಗಳ ಅಡಿಯಲ್ಲಿ ಕೋಟೆ ದಂಡನಾಯಕರು ಮತ್ತು ಯೋಧ ಪರಂಪರೆಯನ್ನು ಒಳಗೊಂಡಿದೆ.',
      ta: 'ஒடிசாவின் (ஒட்ர தேசம்) பிராந்திய சத்திரிய மரபைக் குறிக்கிறது; கீழைக் கங்கர் மற்றும் கஜபதி ஆட்சியில் கோட்டைத் தளபதிகளாகவும் படைவீரர்களாகவும் விளங்கிய மரபினர்.',
      mr: 'ओडिशाच्या (ओड्र देश) प्रादेशिक क्षत्रिय वारशाचे प्रतिनिधित्व करते; पूर्व गंग आणि गजपती राजवटीतील दुर्गप्रमुख व लढाऊ घराण्यांचा यात समावेश होतो.',
      or: 'ଓଡ଼ିଶା (ଓଡ଼୍ର ଦେଶ)ର ଆଞ୍ଚଳିକ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟର ପ୍ରତିനിଧିତ୍ୱ କରେ, ଯାହା ଗଙ୍ଗ ଓ ଗଜପତି ଶାସନ କାଳର ଦୁର୍ଗପତି ଏବଂ ସାମରିକ କ୍ଷତ୍ରିୟ ବଂଶଧରଙ୍କୁ ସୂଚାଏ।',
      bn: 'ওড়িশার (ওড্র দেশ) আঞ্চলিক ক্ষত্রিয় ঐতিহ্যের প্রতিনিধিত্ব করে, যা পূর্ব গঙ্গ ও গজপতি আমলের দুর্গাপতি এবং সামরিক ক্ষত্রিয় বংশগুলোকে নির্দেশ করে।'
    },
    sacred_associations: ['Lord Jagannatha (Puri)', 'Surya Deva (Konark)', 'Maa Biraja (Jajpur)', 'Lingaraja (Bhubaneswar)']
  },
  {
    id: 'syn_odiyaraju_karnataka',
    title: 'Odiyaraju in Karnataka',
    native_scripts: {
      Kannada: 'ಒಡಿಯರಾಜು (ಕರ್ನಾಟಕ)',
      Telugu: 'ఒడియరాజు (కర్ణాటక)',
      Devanagari: 'ओडियाराजू (कर्नाटक)',
      Tamil: 'ஒடியராஜு (கர்நாடகா)',
      Odia: 'ଓଡ଼ିଆରାଜୁ (କର୍ଣ୍ଣାଟକ)'
    },
    category: 'Royal Nobility',
    designation_group: 'Regional community designations',
    geographical_association: 'Karnataka',
    epistemic_classification: 'Regional Ethnonym & Gazetteer Record',
    epistemic_note: {
      en: 'Documented regional community designation in Karnataka; community traditions and regional histories connect this group with medieval Odra/Gajapathi military movements and fortress settlements across Karnataka.',
      hi: 'कर्नाटक में प्रचलित क्षेत्रीय समुदाय संज्ञा; सामुदायिक परंपराएं और क्षेत्रीय इतिहास इसे मध्यकालीन ओड्र/गजपति सैन्य अभियानों व दुर्ग बस्तियों से जोड़ते हैं।',
      te: 'కర్ణాటకలో గుర్తింపు పొందిన ప్రాంతీయ సామాజిక నామం; మధ్యయుగ ఓడ్ర/గజపతి సైనిక కదలికలు మరియు కోటల రక్షణ ఒప్పందాలతో ఈ సమాజం చారిత్రక అనుబంధాన్ని కలిగి ఉంది.',
      kn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಬಳಕೆಯಲ್ಲಿರುವ ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯದ ಹೆಸರು; ಮಧ್ಯಕಾಲೀನ ಓಡ್ರ/ಗಜಪತಿ ಸೈನಿಕ ಸಂಚಾರ ಮತ್ತು ಕೋಟೆ ನೆಲೆಗಳೊಂದಿಗೆ ಈ ಸಮುದಾಯದ ಪರಂಪರೆ ಗುರುತಿಸಿಕೊಂಡಿದೆ.',
      ta: 'கர்நாடகாவில் வழங்கப்படும் பிராந்திய சமூகப் பெயர்; இடைக்கால ஒட்ர/கஜபதி படை நகர்வுகள் மற்றும் கோட்டைக் குடியேற்றங்களுடன் தொடர்புடையதாகக் கருதப்படுகிறது.',
      mr: 'कर्नाटकातील प्रादेशिक समाज-संज्ञा; स्थानिक परंपरा व इतिहास या समाजाला मध्ययुगीन ओड्र/गजपती लष्करी मोहिमा आणि किल्ल्यांच्या वसाहतींशी जोडतात.',
      or: 'କର୍ଣ୍ଣାଟକରେ ପ୍ରଚଳିତ ଆଞ୍ଚଳିକ ସମୁଦାୟ ନାମ; ଆଞ୍ଚଳିକ ଇତିହାସ ଓ ପରମ୍ପରା ଏହାକୁ ମଧ୍ୟଯୁଗୀୟ ଓଡ଼୍ର/ଗଜପତି ସାମରିକ ଅଭିଯାନ ସହ ଯୋଡ଼ିଥାଏ।',
      bn: 'কর্ণাটকে প্রচলিত আঞ্চলিক সম্প্রদায়গত নাম; আঞ্চলিক ইতিহাস ও ঐতিহ্য একে মধ্যযুগীয় ওড্র/গজপতি সামরিক অভিযানের সাথে যুক্ত করে।'
    },
    primary_regions: ['Southern & Central Karnataka', 'Mysore-Mandya-Tumkur Belt', 'Chitradurga-Davanagere Corridor', 'Tungabhadra Basin'],
    prominent_states: ['Karnataka'],
    linguistic_origin: 'Kannada/Dravidian regional compound: "Odiya" (relating to Odra/Odisha) + "Raju" (royal/martial title).',
    historical_role: {
      en: 'Regional designation used in Karnataka for families preserving Kshatriya martial customs, fortress stewardship, and royal lineage traditions connected with Odra/Gajapathi historical migrations into the Karnataka plateau.',
      hi: 'कर्नाटक पठार में बसे उन परिवारों के लिए प्रयुक्त क्षेत्रीय नाम जो ओड्र/गजपति ऐतिहासिक प्रवास, दुर्ग संरक्षण और क्षत्रिय परंपराओं को सहेजे हुए हैं।',
      te: 'కర్ణాటక పీఠభూమిలో స్థిరపడి క్షత్రియ ఆచారాలు, కోటల రక్షణ మరియు ఓడ్ర/గజపతి చారిత్రక వలసల జ్ఞాపకాలను నిలుపుకున్న కుటుంబాలకు కర్ణాటకలో వాడే ప్రాంతీయ నామం.',
      kn: 'ಕರ್ನಾಟಕ ಪ್ರಸ್ಥಭೂಮಿಯಲ್ಲಿ ನೆಲೆಸಿ ಕ್ಷತ್ರಿಯ ಸಂಪ್ರದಾಯ, ಕೋಟೆ ರಕ್ಷಣೆ ಮತ್ತು ಓಡ್ರ/ಗజಪತಿ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಯನ್ನು ಉಳಿಸಿಕೊಂಡಿರುವ ಕುಟುಂಬಗಳ ಪ್ರಾದೇಶಿಕ ಹೆಸರು.',
      ta: 'கர்நாடக பீடபூமியில் குடியேறி சத்திரிய மரபுகளையும் கோட்டைப் பாதுகாப்பு வரலாற்றையும் போற்றும் சமூகத்தினரின் பிராந்தியப் பெயர்.',
      mr: 'कर्नाटक पठारावर स्थायिक झालेल्या आणि क्षत्रिय परंपरा व दुर्गसंरक्षणाचा वारसा जपणाऱ्या कुटुंबांसाठी कर्नाटकात वापरले जाणारे प्रादेशिक नाव.',
      or: 'କର୍ଣ୍ଣାଟକ ମାଳଭୂମିରେ ବସବାସ କରୁଥିବା ଏବଂ କ୍ଷତ୍ରିୟ ପରମ୍ପରା ଓ ଓଡ଼୍ର/ଗଜପତି ଐତିହାସିକ ସ୍ମୃତି ବହନ କରୁଥିବା ପରିବାରଙ୍କ ଆଞ୍ଚଳିକ ନାମ।',
      bn: 'কর্ণাটক মালভূমিতে বসবাসরত এবং ক্ষত্রিয় প্রথা ও ওড্র/গজপতি ঐতিহাসিক স্মৃতি বহনকারী পরিবারগুলোর আঞ্চলিক নাম।'
    },
    sacred_associations: ['Sri Rama', 'Chamundeshwari', 'Shivayogi Siddharameshwara', 'Lord Venkateshwara']
  },
  {
    id: 'syn_ottar',
    title: 'Ottar',
    native_scripts: {
      Tamil: 'ஒட்டர்',
      Malayalam: 'ഒട്ടർ',
      Telugu: 'ఒట్టర్',
      Kannada: 'ಒಟ್ಟರ್',
      Devanagari: 'ओट्टर'
    },
    category: 'Regional Dialectal Shift',
    designation_group: 'Regional community designations',
    geographical_association: 'Tamil Nadu',
    epistemic_classification: 'Regional Ethnonym & Gazetteer Record',
    epistemic_note: {
      en: 'Attested in Tamil inscriptions, copper plates, and Madras Presidency administrative records as the standard Tamil phonetic rendering of "Odda / Odra" in Tamil Nadu.',
      hi: 'तमिल शिलालेखों, ताम्रपत्रों और मद्रास प्रेसीडेंसी के अभिलेखों में तमिलनाडु के भीतर "ओड्डा / ओड्र" के तमिल ध्वन्यात्मक रूप के रूप में दर्ज।',
      te: 'తమిళనాడులోని శాసనాలు, తామ్రపత్రాలు మరియు మద్రాసు ప్రెసిడెన్సీ రికార్డులలో "ఒడ్డ / ఓడ్ర" శబ్దానికి తమిళ రూపంగా నమోదైన ప్రాంతీయ నామం.',
      kn: 'ತಮಿಳುನಾಡಿನ ಶಾಸನಗಳು ಮತ್ತು ಮದ್ರಾಸ್ ಪ್ರೆಸಿಡೆನ್ಸಿ ದಾಖಲೆಗಳಲ್ಲಿ "ಒಡ್ಡ / ಓಡ್ರ" ಪದದ ತಮಿಳು ರೂಪವಾಗಿ ದಾಖಲಾದ ಪ್ರಾದೇಶಿಕ ಹೆಸರು.',
      ta: 'தமிழகக் கல்வெட்டுகள், செப்பேடுகள் மற்றும் மதராஸ் மாகாண ஆவணங்களில் "ஒட்ட / ஒட்ர" என்பதன் தமிழ் வடிவமாகப் பதிவாகியுள்ள பிராந்தியப் பெயர்.',
      mr: 'तमिळनाडूतील शिलालेख आणि मद्रास प्रेसिडेन्सीच्या नोंदींमध्ये "ओड्डा / ओड्र" या शब्दाचे तमिळ रूप म्हणून नोंदवलेले नाव.',
      or: 'ତାମିଲନାଡୁର ଶିଳାଲେଖ ଓ ମାଡ୍ରାସ୍ ପ୍ରେସିଡେନ୍ସି ଦସ୍ତାବିଜରେ "ଓଡ୍ଡ / ଓଡ଼୍ର" ଶବ୍ଦର ତାମିଲ ରୂପ ଭାବେ লিପିବଦ୍ଧ ଆଞ୍ଚଳିକ ନାମ।',
      bn: 'তামিলনাড়ুর শিলালিপি ও মাদ্রাজ প্রেসিডেন্সির নথিতে "ওড্ড / ওড্র" শব্দের তামিল রূপ হিসেবে নথিবদ্ধ আঞ্চলিক নাম।'
    },
    primary_regions: ['Kongu Nadu', 'Kaveri Delta (Tiruchirappalli, Thanjavur)', 'Madurai-Dindigul-Tirunelveli Corridor', 'Tondaimandalam'],
    prominent_states: ['Tamil Nadu'],
    linguistic_origin: 'Tamil orthographical and phonological rule where voiced retroflex "dd" (Odda) is written and pronounced as "tt" (Ottar).',
    historical_role: {
      en: 'Regional community designation in Tamil Nadu. Historically associated with fortress masonry, deep stone-well excavation, tank construction, and settlements established during medieval southern campaigns and Nayaka-era infrastructure expansion across Tamil country.',
      hi: 'तमिलनाडु में प्रचलित क्षेत्रीय समुदाय नाम। मध्यकालीन दक्षिणी अभियानों और नायक काल के दौरान किलों के निर्माण, गहरे पत्थर के कुओं और सिंचाई तालाबों के खनन से ऐतिहासिक रूप से जुड़ा हुआ।',
      te: 'తమిళనాడులోని ప్రాంతీయ సామాజిక నామం. మధ్యయుగ దక్షిణ దండయాత్రలు మరియు నాయక రాజుల కాలంలో కోటల నిర్మాణం, రాతి బావులు మరియు సాగునీటి చెరువుల తవ్వకంతో చారిత్రక సంబంధం కలిగి ఉంది.',
      kn: 'ತಮಿಳುನಾಡಿನ ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯದ ಹೆಸರು. ಮಧ್ಯಕಾಲೀನ ದಕ್ಷಿಣ ದಂಡಯಾತ್ರೆಗಳು ಮತ್ತು ನಾಯಕ ಅರಸರ ಕಾಲದಲ್ಲಿ ಕೋಟೆ ನಿರ್ಮಾಣ, ಕಲ್ಲಿನ ಬಾವಿಗಳು ಮತ್ತು ಕೆರೆಗಳ ನಿರ್ಮಾಣದೊಂದಿಗೆ ಗುರುತಿಸಿಕೊಂಡಿದೆ.',
      ta: 'தமிழ்நாட்டில் வழங்கப்படும் பிராந்திய சமூகப் பெயர். இடைக்காலத் தென்னிந்தியப் படையெடுப்புகள் மற்றும் நாயக்கர் காலத்தில் கோட்டைக் கட்டுமானம், கற்கிணறுகள் மற்றும் பாசன ஏரிகள் அமைத்த வரலாற்றுடன் தொடர்புடையது.',
      mr: 'तमिळनाडूतील प्रादेशिक समाज नाव. मध्ययुगीन मोहिमा आणि नायक काळात किल्ले बांधणी, दगडी विहिरी व सिंचन तलावांच्या निर्मितीशी ऐतिहासिकदृष्ट्या संबंधित.',
      or: 'ତାମିଲନାଡୁର ଆଞ୍ଚଳିକ ସମୁଦାୟ ନାମ, ଯାହା ମଧ୍ୟଯୁଗୀୟ ଦକ୍ଷିଣ ଅଭିଯାନ ଓ ନାୟକ ଶାସନ କାଳରେ ଦୁର୍ଗ ନିର୍ମାଣ, ପଥର କୂଅ ଓ ଜଳାଶୟ ଖନନ ସହ ଜଡ଼ିତ।',
      bn: 'তামিলনাড়ুর আঞ্চলিক সম্প্রদায়গত নাম, যা মধ্যযুগীয় দক্ষিণ ভারত অভিযান ও নায়ক আমলে দুর্গ নির্মাণ, পাথরের কুয়ো ও জলাশয় খননের সাথে যুক্ত।'
    },
    sacred_associations: ['Ranganathaswamy (Srirangam)', 'Meenakshi Sundareswarar', 'Murugan', 'Karuppasamy']
  },
  {
    id: 'syn_od_kshatriya',
    title: 'Od-Kshatriya / Odra Kshatriya',
    native_scripts: {
      Odia: 'ଓଡ଼ କ୍ଷତ୍ରିୟ / ଓଡ଼୍ର କ୍ଷତ୍ରିୟ',
      Devanagari: 'ओड क्षत्रिय / ओड्र क्षत्रिय',
      Telugu: 'ఓడ్ క్షత్రియ / ఓడ్ర క్షత్రియ',
      Bengali: 'ওড ক্ষত্রিয় / ওড্র ক্ষত্রিয়'
    },
    category: 'Royal Nobility',
    designation_group: 'Regional community designations',
    geographical_association: 'Odisha, Eastern India & Pan-Indian Diaspora',
    epistemic_classification: 'Documented Epigraphic & Historical Designation',
    epistemic_note: {
      en: 'Derived from classical Sanskrit references to the Kshatriyas of Odra Desha (Manusmriti 10.44) and Eastern Ganga / Gajapathi historical traditions.',
      hi: 'ओड्र देश के क्षत्रियों के शास्त्रीय संस्कृत उल्लेखों (मनुस्मृति 10.44) और पूर्वी गंग / गजपति ऐतिहासिक परंपराओं से व्युत्पन्न।',
      te: 'ఓడ్ర దేశ క్షత్రియుల ప్రాచీన సంస్కృత ప్రస్తావనలు (మనుస్మృతి 10.44) మరియు తూర్పు గంగ / గజపతి చారిత్రక సంప్రదాయాల నుండి ఉద్భవించింది.',
      kn: 'ಓಡ್ರ ದೇಶದ ಕ್ಷತ್ರಿಯರ ಪ್ರಾಚೀನ ಸಂಸ್ಕೃತ ಉಲ್ಲೇಖಗಳು ಮತ್ತು ಪೂರ್ವ ಗಂಗ / ಗಜಪತಿ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಯಿಂದ ಬಂದಿದೆ.',
      ta: 'ஒட்ர தேசத்து சத்திரியர்கள் குறித்த பண்டைய சமஸ்கிருதக் குறிப்புகள் மற்றும் கங்க / கஜபதி வரலாற்று மரபுகளிலிருந்து தோன்றியது.',
      mr: 'ओड्र देशातील क्षत्रियांच्या प्राचीन संस्कृत संदर्भांमधून (मनुस्मृती १०.४४) आणि गंग / गजपती ऐतिहासिक परंपरेतून आलेले नाव.',
      or: 'ଓଡ଼୍ର ଦେଶର କ୍ଷତ୍ରିୟଙ୍କ ଶାସ୍ତ୍ରୀୟ ସଂସ୍କୃତ ଉଲ୍ଲେଖ (ମନୁସ୍ମୃତି ୧୦.୪୪) ଓ ଗଙ୍ଗ/ଗଜପତି ଐତିହାସିକ ପରମ୍ପରାରୁ ଉদ্ଭୂତ।',
      bn: 'ওড্র দেশের ক্ষত্রিয়দের শাস্ত্রীয় সংস্কৃত উল্লেখ (মনুস্মৃতি ১০.৪৪) এবং পূর্ব গঙ্গ / গজপতি ঐতিহাসিক পরম্পরা থেকে উদ্ভূত।'
    },
    primary_regions: ['Coastal Odisha', 'Mahanadi Basin', 'Utkala Plains', 'National Diaspora'],
    prominent_states: ['Odisha', 'Andhra Pradesh', 'West Bengal', 'Jharkhand'],
    linguistic_origin: 'Direct classical derivation from Odra Desha / Audra Vishaya in ancient Sanskrit epigraphs.',
    historical_role: {
      en: 'Heirs to the ruling martial traditions of Odra Desha, associated in historical traditions with the royal houses of Varanasi Kataka (Cuttack) and the Suryavamsha Gajapathi era.',
      hi: 'प्राचीन ओड्र देश की शासक व सामरिक परंपराओं के उत्तराधिकारी, जिनका ऐतिहासिक संबंध कटक के राजघराने और सूर्यवंशी गजपति काल से जोड़ा जाता है।',
      te: 'ప్రాచీన ఓడ్ర దేశ క్షత్రియ పాలక వర్గం, సూర్యవంశ గజపతుల వారసత్వాన్ని స్మరించే రాజ వంశీకులు.',
      kn: 'ಪ್ರಾಚೀನ ಓಡ್ರ ದೇಶದ ರಾಜಮನೆತನಗಳ ವಾರಸುದಾರರು ಮತ್ತು ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯರು.',
      ta: 'பண்டைய ஒட்ர தேசத்தின் ஆளும் சத்திரிய வம்ச வழித்தோன்றல்கள்.',
      mr: 'प्राचीन ओड्र देशाच्या शासक क्षत्रिय घराण्यांचे वारसदार.',
      or: 'ପ୍ରାଚୀନ ଓଡ଼୍ର ଦେଶର ଶାସକ କ୍ଷତ୍ରିୟ ବର୍ଣ୍ଣ ଏବଂ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଙ୍କ ଐତିହାସିକ ଦାୟାଦ।',
      bn: 'প্রাচীন ওড্র দেশের শাসক ক্ষত্রিয় বর্ণের উত্তরাধিকারী ও সূর্যবংশীয় ঐতিহ্যবাহী সমাজ।'
    },
    sacred_associations: ['Lord Jagannatha', 'Surya Deva (Konark)', 'Emperor Kharavela', 'Kapilendra Deva']
  },
  {
    id: 'syn_odde_vadde',
    title: 'Odde / Vadde',
    native_scripts: {
      Telugu: 'ఒడ్డే / వడ్డే',
      Kannada: 'ಒಡ್ಡೇ / ವಡ್ಡೇ',
      Devanagari: 'ओड्डे / वड्डे'
    },
    category: 'Civic & Water Engineering',
    designation_group: 'Regional community designations',
    geographical_association: 'Andhra Pradesh, Telangana & Eastern Karnataka',
    epistemic_classification: 'Regional Ethnonym & Gazetteer Record',
    epistemic_note: {
      en: 'Documented in Vijayanagara and Telugu stone inscriptions (e.g., Vodda-ula, Odda-rotlu) and regional gazetteers across Andhra Pradesh, Telangana, and Karnataka.',
      hi: 'विजयनगर व तेलुगु शिलालेखों तथा आंध्र प्रदेश, तेलंगाना और कर्नाटक के क्षेत्रीय गजेटियरों में प्रमाणित।',
      te: 'విజయనగర మరియు తెలుగు శిలాశాసనాలలో (ఉదా. వొడ్డ-ఉల, ఒడ్డ-రోట్లు) మరియు ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక గెజిటీర్లలో నమోదైంది.',
      kn: 'ವಿಜಯನಗರ ಮತ್ತು ತೆಲುಗು ಶಾಸನಗಳಲ್ಲಿ ಹಾಗೂ ಆಂಧ್ರ, ತೆಲಂಗಾಣ ಮತ್ತು ಕರ್ನಾಟಕದ ಗೆಜೆಟಿಯರ್‌ಗಳಲ್ಲಿ ದಾಖಲಾಗಿದೆ.',
      ta: 'விஜயநகர மற்றும் தெலுங்கு கல்வெட்டுகளிலும் ஆந்திரா, தெலுங்கானா, கர்நாடக அரசிதழ்களிலும் பதிவு செய்யப்பட்டுள்ளது.',
      mr: 'विजयनगर व तेलुगू शिलालेखांत आणि आंध्र प्रदेश, तेलंगणा व कर्नाटकातील गॅझेटिअरमध्ये नोंदवलेले.',
      or: 'ବିଜୟନଗର ଓ ତେଲୁଗୁ ଶିଳାଲେଖ ଏବଂ ଆନ୍ଧ୍ର, ତେଲେଙ୍ଗାନା ଓ କର୍ଣ୍ଣାଟକ ଗେଜେଟିୟରରେ ପ୍ରମାଣିତ।',
      bn: 'বিজয়নগর ও তেলুগু শিলালিপি এবং অন্ধ্রপ্রদেশ, তেলেঙ্গানা ও কর্ণাটকের গেজেটিয়ারে নথিবদ্ধ।'
    },
    primary_regions: ['Krishna-Godavari Inter-fluvial Plains', 'Tungabhadra Basin', 'Palar Catchment'],
    prominent_states: ['Andhra Pradesh', 'Telangana', 'Eastern Karnataka'],
    linguistic_origin: 'Dravidian phonetic shift replacing the initial Sanskrit "O" with the soft voiced labial "Vo/Va".',
    historical_role: {
      en: 'Foremost civil hydraulic architects who excavated thousands of community irrigation tanks (Cheruvulu), irrigation canals, and defensive stone ramparts across the Deccan.',
      hi: 'दक्कन के अग्रदूत जल-इंजीनियर जिन्होंने हजारों ऐतिहासिक तालाबों (चेरुवुलु), नहरों और पत्थर के सुरक्षा बांधों का निर्माण किया।',
      te: 'దక్కన్ పీఠభూమిలో వేలాది ఊర చెరువులు, కాలువలు, రాతి కట్టడాలను నిర్మించిన జల సంరక్షణా నిపుణులు.',
      kn: 'ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿಯಲ್ಲಿ ಸಾವಿರಾರು ಕೆರೆಗಳು ಮತ್ತು ಕಾಲುವೆಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಶ್ರೇಷ್ಠ ಜಲತಂತ್ರಜ್ಞರು.',
      ta: 'ஆயிரக்கணக்கான பாசன ஏரிகள் மற்றும் கால்வாய்களை வெட்டிய நீர் மேலாண்மை நிபுணர்கள்.',
      mr: 'दख्खनच्या पठारावर हजारो तलाव आणि कालवे निर्माण करणारे निष्णात जलअभियंते.',
      or: 'ଦାକ୍ଷିଣାତ୍ୟରେ ହଜାର ହଜାର ଜଳାଶୟ ଓ କେନାଲ୍ ନିର୍ମାଣ କରିଥିବା ପ୍ରବୀଣ ଜଳ-କାରିଗର।',
      bn: 'দাক্ষিণাত্যে হাজার হাজার সেচ দিঘি ও খাল খননকারী দক্ষ প্রকৌশলী সমাজ।'
    },
    sacred_associations: ['Maharshi Bhagiratha', 'Goddess Gangamma', 'Bhairava', 'Shiva']
  },
  {
    id: 'syn_waddar_vaddar',
    title: 'Waddar / Vaddar',
    native_scripts: {
      Kannada: 'ವಡ್ಡರ್ / ವಡ್ಡಾರ',
      Devanagari: 'वडार / वड्डार',
      Telugu: 'వడ్డార్'
    },
    category: 'Civic & Water Engineering',
    designation_group: 'Regional community designations',
    geographical_association: 'Karnataka & Maharashtra',
    epistemic_classification: 'Regional Ethnonym & Gazetteer Record',
    epistemic_note: {
      en: 'Attested in Kannada and Marathi historical records, Solapur Siddharameshwara chronicles, and Bombay/Mysore Presidency ethnographic surveys.',
      hi: 'कन्नड़ व मराठी ऐतिहासिक अभिलेखों, सोलापुर के संत सिद्धरामेश्वर चरित्र और बॉम्बे/मैसूर गजेटियरों में प्रमाणित।',
      te: 'కన్నడ, మరాఠీ చారిత్రక రికార్డులు, సోలాపూర్ సిద్ధరామేశ్వర చరిత్ర మరియు మైసూర్/బాంబే గెజిటీర్లలో నమోదైంది.',
      kn: 'ಕನ್ನಡ ಮತ್ತು ಮರಾಠಿ ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳು, ಸೊಲ್ಲಾಪುರ ಸಿದ್ಧರಾಮೇಶ್ವರ ಚರಿತ್ರೆ ಮತ್ತು ಮೈಸೂರು ಗೆಜೆಟಿಯರ್‌ಗಳಲ್ಲಿ ದಾಖಲಾಗಿದೆ.',
      ta: 'கன்னடம் மற்றும் மராட்டிய வரலாற்று ஆவணங்கள் மற்றும் சோலாப்பூர் சித்தராமேஸ்வரர் வரலாற்றில் பதிவு செய்யப்பட்டுள்ளது.',
      mr: 'कन्नड व मराठी ऐतिहासिक दस्तऐवज, सोलापूरचे शिवयोगी सिद्धरामेश्वर चरित्र आणि गॅझेटिअरमध्ये प्रमाणित.',
      or: 'କନ୍ନଡ଼ ଓ ମରାଠୀ ଐତିହାସିକ ଦସ୍ତାବିଜ ଏବଂ ସୋଲାପୁର ସିଦ୍ଧରାମେଶ୍ୱର ଚରିତରେ ପ୍ରମାଣିତ।',
      bn: 'কন্নড় ও মারাঠি ঐতিহাসিক নথি এবং সোলাপুর সিদ্ধরামেশ্বর চরিতে প্রত্যয়িত।'
    },
    primary_regions: ['Northern Karnataka Plateau', 'Marathwada', 'Western Ghats Foothills', 'Solapur Basin'],
    prominent_states: ['Karnataka', 'Maharashtra', 'Goa', 'Northern Andhra borders'],
    linguistic_origin: 'Kannada and Marathi evolution of the Prakrit ethnonym Odda.',
    historical_role: {
      en: 'Famed monumental stone cutters, fortress builders, well diggers, and water conservationists closely linked with Shivayogi Siddharameshwara and Deccan defensive fortifications.',
      hi: 'प्रसिद्ध पाषाण-शिल्पी, दुर्ग-निर्माता और कुआं-तालाब खनक, जिनका गहरा ऐतिहासिक संबंध सोलापुर के संत सिद्धरामेश्वर और दक्कन के किलों से है।',
      te: 'సోలాపూర్ సిద్ధరామేశ్వరుని తటాకాల నిర్మాణం, కోటలు మరియు రాతి గనుల తవ్వకంలో ప్రసిద్ధి చెందిన శిల్ప వీరులు.',
      kn: 'ಕಲ್ಲು ಒಡೆಯುವ, ಕೋಟೆ-ಕೊತ್ತಲಗಳನ್ನು ಕಟ್ಟುವ ಮತ್ತು ಸಿದ್ಧರಾಮೇಶ್ವರರ ಕೆರೆ-ಬಾವಿಗಳನ್ನು ನಿರ್ಮಿಸಿದ ಕಾಯಕಜೀವಿಗಳು.',
      ta: 'கோட்டைகள், படிக்கிணறுகள் மற்றும் பாறை சிற்பங்களை வடித்த திறமையான சிற்பிகள்.',
      mr: 'दगड खाणकाम, विहिरी-तलाव आणि छत्रपती शिवरायांच्या काळातील किल्ले बांधणीत मोलाचे योगदान देणारे निष्णात कारागीर.',
      or: 'ପ୍ରସିଦ୍ଧ ପଥର ଶିଳ୍ପୀ ଓ ଦୁର୍ଗ ନିର୍ମାତା, ଯେଉଁମାନେ ସିଦ୍ଧରାମେଶ୍ୱରଙ୍କ ଜଳ-ପ୍ରକଳ୍ପ ସହ ଜଡ଼ିତ ଥିଲେ।',
      bn: 'বিখ্যাত প্রস্তর শিল্পী, দুর্গ ও কুপ খননকারী সমাজ, যাঁরা সন্ত সিদ্ধরামেশ্বরের সাথে যুক্ত ছিলেন।'
    },
    sacred_associations: ['Shivayogi Siddharameshwara', 'Basaveshwara', 'Lord Shiva', 'Bhavani Mata']
  },
  {
    id: 'syn_oddar',
    title: 'Oddar',
    native_scripts: {
      Tamil: 'ஒட்டர் / ஒட்டன்',
      Malayalam: 'ഒడ్డർ'
    },
    category: 'Regional Dialectal Shift',
    designation_group: 'Regional community designations',
    geographical_association: 'Tamil Nadu & Kerala',
    epistemic_classification: 'Regional Ethnonym & Gazetteer Record',
    epistemic_note: {
      en: 'Recorded in South Indian inscriptions and colonial census monographs as the anglicized/Dravidian spelling alongside Tamil "Ottar".',
      hi: 'दक्षिण भारतीय अभिलेखों और जनगणना विवरणिकाओं में तमिल "ओट्टर" के समानांतर दर्ज क्षेत्रीय नाम।',
      te: 'దక్షిణ భారత శాసనాలు మరియు జనాభా గణన గ్రంథాలలో తమిళ "ఒట్టర్" తో పాటు నమోదైన ప్రాంతీయ నామం.',
      kn: 'ದಕ್ಷಿಣ ಭಾರತದ ಶಾಸನಗಳು ಮತ್ತು ಜನಗಣತಿ ದಾಖಲೆಗಳಲ್ಲಿ ತಮಿಳಿನ "ಒಟ್ಟರ್" ಜೊತೆಗೆ ದಾಖಲಾದ ಹೆಸರು.',
      ta: 'தென்னிந்தியக் கல்வெட்டுகள் மற்றும் மக்கள்தொகை ஆவணங்களில் "ஒட்டர்" என்பதன் ஆங்கில/திராவிட வடிவமாகப் பதிவான பெயர்.',
      mr: 'दक्षिण भारतीय शिलालेख आणि जनगणना अहवालांमध्ये तमिळ "ओट्टर" सोबत नोंदवलेले नाव.',
      or: 'ଦକ୍ଷିଣ ଭାରତୀୟ ଶିଳାଲେଖ ଓ ଜନଗଣନା ଦସ୍ତାବିଜରେ ତାମିଲ "ଓଟ୍ଟାର" ସହ ଲିପିବଦ୍ଧ ନାମ।',
      bn: 'দক্ষিণ ভারতীয় শিলালিপি ও জনগণনা নথিতে তামিল "ওট্টার"-এর সমান্তরালে নথিবদ্ধ নাম।'
    },
    primary_regions: ['Kongu Nadu', 'Kaveri Basin', 'Southern Carnatic'],
    prominent_states: ['Tamil Nadu', 'Kerala', 'Southern Andhra'],
    linguistic_origin: 'Tamil/Dravidian phonological rendering of the northern Prakrit ethnonym Odda.',
    historical_role: {
      en: 'Settled in the Kaveri delta and Kongu country during medieval southern military and architectural expansions, pioneering deep stone wells and irrigation tanks.',
      hi: 'मध्यकालीन दक्षिणी सैन्य और स्थापत्य विस्तार के दौरान कावेरी डेल्टा व कोंगू क्षेत्र में बसे, जिन्होंने गहरे कुओं और तालाबों का निर्माण किया।',
      te: 'మధ్యయుగ దక్షిణ భారత విస్తరణలలో భాగంగా కావేరీ డెల్టా మరియు తమిళనాడులో స్థిరపడి, బావులు, చెరువులను నిర్మించిన శాఖ.',
      kn: 'ಮಧ್ಯಕಾಲೀನ ದಕ್ಷಿಣ ಭಾರತದ ವಿಸ್ತರಣೆಯ ಸಮಯದಲ್ಲಿ ತಮಿಳುನಾಡಿನಲ್ಲಿ ನೆಲೆಸಿ ಕೃಷಿ ಜಲಾಶಯಗಳನ್ನು ನಿರ್ಮಿಸಿದವರು.',
      ta: 'காவிரி டெல்டா மற்றும் கொங்கு நாட்டில் குடியேறி ஆழமான கற்கிணறுகள் மற்றும் பாசன ஏரிகளை அமைத்தவர்கள்.',
      mr: 'कावेरी खोरे आणि कोंगू प्रदेशात स्थायिक झालेले दगडी विहिरी व तलाव निर्माते.',
      or: 'କାବେରୀ ଉପତ୍ୟକା ଓ ତାମିଲନାଡୁରେ ବସବାସ କରି ପଥର କୂଅ ଓ ଜଳାଶୟ ନିର୍ମାଣ କରିଥିବା ଶାଖା।',
      bn: 'কাবেরী বদ্বীপ ও তামিলনাড়ুতে বসতি স্থাপনকারী পাথরের কুয়ো ও জলাশয় নির্মাতা সমাজ।'
    },
    sacred_associations: ['Ranganathaswamy (Srirangam)', 'Maharshi Bhagiratha', 'Murugan', 'Mariamman']
  },

  // =========================================================================
  // CATEGORY C: HISTORICAL, MARTIAL, AND TRADITIONAL TITLES
  // =========================================================================
  {
    id: 'syn_vadde_gajapathirajulu',
    title: 'Vadde-GajapathiRajulu',
    native_scripts: {
      Telugu: 'వడ్డే-గజపతిరాజులు',
      Kannada: 'ವಡ್ಡೇ-ಗಜಪತಿರಾಜುಲು',
      Devanagari: 'वड्डे-गजपतिराजुलु',
      Tamil: 'வட்டே-கஜபதிராஜுலு',
      Odia: 'ଭଡ୍ଡେ-ଗଜପତିରାଜୁଲୁ'
    },
    category: 'Royal Nobility',
    designation_group: 'Historical, martial, and traditional titles',
    geographical_association: 'Andhra Pradesh, Telangana & Karnataka Borderlands',
    epistemic_classification: 'Community Tradition & Lineage Claim',
    epistemic_note: {
      en: 'Compound traditional and martial title preserved in Telugu and Deccan community lineages; links the regional Vadde/Odde identity with ancestral service and royal descent claims from the Suryavamsha Gajapathi era (1434–1541 CE). While Gajapathi sovereignty in Andhra forts (Kondavidu, Udayagiri) is epigraphically documented, specific family genealogies are preserved primarily through community records and oral chronicles.',
      hi: 'तेलुगु और दक्कन के सामुदायिक वंशों में संरक्षित संयुक्त पारंपरिक व सामरिक उपाधि; यह क्षेत्रीय वड्डे/ओड्डे पहचान को सूर्यवंशी गजपति काल (1434–1541 ई.) की सैन्य सेवा और वंश परंपरा से जोड़ती है। आंध्र के किलों में गजपति शासन शिलालेखों से प्रमाणित है, जबकि पारिवारिक वंशावलियाँ मुख्यतः सामुदायिक अभिलेखों में सुरक्षित हैं।',
      te: 'తెలుగు మరియు దక్కన్ ప్రాంతీయ వంశాలలో నిలిచి ఉన్న సాంప్రదాయ, వీర బిరుదు నామం; ఇది వడ్డే/ఒడ్డే ప్రాంతీయ గుర్తింపును సూర్యవంశ గజపతి కాలపు (1434–1541 CE) సైనిక దుర్గ సేవతో మరియు రాజవంశ సంప్రదాయాలతో అనుసంధానిస్తుంది. ఆంధ్ర దుర్గాలలో (కొండవీడు, ఉదయగిరి) గజపతుల పాలన శాసనాల ద్వారా రుజువైనప్పటికీ, నిర్దిష్ట కుటుంబ వంశావళులు ప్రధానంగా సామాజిక సంప్రదాయాలలో భద్రపరచబడ్డాయి.',
      kn: 'ತೆಲುಗು ಮತ್ತು ದಖನ್ ಸಮುದಾಯದ ವಂಶಗಳಲ್ಲಿ ಉಳಿದುಬಂದಿರುವ ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ವೀರ ಬಿರುದು; ವಡ್ಡೇ/ಒಡ್ಡೇ ಗುರುತನ್ನು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಕಾಲದ (1434–1541 CE) ಕೋಟೆ ಸೇನಾ ಸೇವೆ ಮತ್ತು ವಂಶ ಪರಂಪರೆಯೊಂದಿಗೆ ಬೆಸೆಯುತ್ತದೆ.',
      ta: 'தெலுங்கு மற்றும் தக்காண சமூக மரபுகளில் போற்றப்படும் பாரம்பரிய மற்றும் வீரப் பட்டம்; வட்டே/ஒட்டே அடையாளத்தை சூர்யவம்ச கஜபதி கால (கி.பி. 1434–1541) கோட்டைப் படைச் சேவை மற்றும் வம்ச மரபுகளுடன் இணைக்கிறது.',
      mr: 'तेलुगू आणि दख्खनमधील समाजात जपलेली पारंपरिक व लढाऊ पदवी; वड्डे/ओड्डे ओळखीला सूर्यवंशी गजपती काळातील (१४३४–१५४१) दुर्गसेवा आणि वंश परंपरेशी जोडते.',
      or: 'ତେଲୁଗୁ ଓ ଦାକ୍ଷିଣାତ୍ୟ ସମାଜରେ ପ୍ରଚଳିତ ପାରମ୍ପରିକ ତଥା ସାମରିକ ଉପାଧି, ଯାହା ଭଡ୍ଡେ/ଓଡ୍ଡେ ପରିଚୟକୁ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି କାଳର (୧୪୩୪–୧୫୪୧) ଦକ୍ଷିଣ ଦୁର୍ଗ ସେବା ଓ ବଂଶ ପରମ୍ପରା ସହ ଯୋଡ଼ିଥାଏ।',
      bn: 'তেলুগু ও দাক্ষিণাত্যের সমাজে প্রচলিত ঐতিহ্যবাহী ও সামরিক উপাধি, যা ভড্ডে/ওড্ডে পরিচয়কে সূর্যবংশী গজপতি আমলের (১৪৩৪–১৫৪১ খ্রি.) দুর্গ সেবা ও বংশ পরম্পরার সাথে যুক্ত করে।'
    },
    primary_regions: ['Coastal Andhra (Guntur, Krishna, Prakasam, Nellore)', 'Rayalaseema', 'Telangana', 'Eastern Karnataka'],
    prominent_states: ['Andhra Pradesh', 'Telangana', 'Karnataka'],
    linguistic_origin: 'Hyphenated Telugu-Sanskrit compound title: "Vadde" (Odra/Odde) + "Gajapathi" (Lord of Elephants) + "Rajulu" (Kshatriya Rulers/Lords).',
    historical_role: {
      en: 'Retained as an honorific martial and dynastic title by families tracing their heritage to the southern military garrisons, fort commanders, and royal detachments stationed across Kondavidu, Udayagiri, Bellamkonda, and Vinukonda during the Suryavamsha Gajapathi empire.',
      hi: 'उन परिवारों द्वारा धारित सम्मानजनक सामरिक व राजवंशीय उपाधि जो अपनी विरासत को सूर्यवंशी गजपति साम्राज्य के दौरान कोंडावीडु, उदयगिरि, बेल्लमकोंडा और विनुकोंडा में तैनात दक्षिणी सैन्य टुकड़ियों और दुर्ग नायकों से जोड़ते हैं।',
      te: 'సూర్యవంశ గజపతి సామ్రాజ్య కాలంలో కొండవీడు, ఉదయగిరి, బెల్లంకొండ, వినుకొండ దుర్గాలలో నియమితులైన సైనిక నాయకులు మరియు రాజబంధువుల వారసత్వాన్ని స్మరించుకుంటూ ఈ సమాజ కుటుంబాలు ధరించే గౌరవ క్షత్రియ బిరుదు నామం.',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಕಾಲದಲ್ಲಿ ಕೊಂಡವೀಡು, ಉದಯಗಿರಿ, ಬೆಲ್ಲಂಕೊಂಡ ಮತ್ತು ವಿನುಕೊಂಡ ಕೋಟೆಗಳಲ್ಲಿ ನಿಯೋಜಿತರಾಗಿದ್ದ ಸೇನಾ ನಾಯಕರ ಪರಂಪರೆಯನ್ನು ಸ್ಮರಿಸುವ ಗೌರವಯುತ ಕ್ಷತ್ರಿಯ ಬಿರುದು.',
      ta: 'சூர்யவம்ச கஜபதி பேரரசின் போது கொண்டவீடு, உதயகிரி, பெல்லம்கொண்டா மற்றும் வினுகொண்டா கோட்டைகளில் பணியாற்றிய படைத்தளபதிகளின் மரபைப் போற்றும் கௌரவப் பட்டம்.',
      mr: 'सूर्यवंशी गजपती साम्राज्याच्या काळात कोंडावीडू, उदयगिरी, बेल्लमकोंडा आणि विनुकोंडा किल्ल्यांवर नियुक्त सेनापतींचा वारसा सांगणारी सन्माननीय लढाऊ पदवी.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ କାଳରେ କୋଣ୍ଡାଭିଡୁ, ଉଦୟଗିରି, ବେଲ୍ଲମକୋଣ୍ଡା ଓ ବିନୁକୋଣ୍ଡା ଦୁର୍ଗରେ ନିୟୋଜିତ ସେନାପତି ଓ ରାଜবংশୀୟଙ୍କ ସ୍ମୃତି ବହନ କରୁଥିବା ସମ୍ମାନଜନକ ଉପାଧି।',
      bn: 'সূর্যবংশী গজপতি সাম্রাজ্যের সময় কোন্ডাভিডু, উদয়গিরি, বেল্লমকোন্ডা ও বিনুকোন্ডা দুর্গে নিযুক্ত সেনাপতিদের ঐতিহ্যবাহী সম্মানসূচক সামরিক উপাধি।'
    },
    sacred_associations: ['Lord Jagannatha', 'Srisailam Mallikarjuna', 'Simhachalam Narasimha', 'Kodanda Rama']
  },
  {
    id: 'syn_odda_nayakkar_tn',
    title: 'Odda-Nayakkar in Tamil Nadu',
    native_scripts: {
      Tamil: 'ஒட்ட-நாயக்கர் (தமிழ்நாடு)',
      Telugu: 'ఒడ్డ-నాయక్కర్ (తమిళనాడు)',
      Kannada: 'ಒಡ್ಡ-ನಾಯ್ಕರ್ (ತಮಿಳುನಾಡು)',
      Devanagari: 'ओड्डा-नायक्कर (तमिलनाडु)',
      Odia: 'ଓଡ୍ଡ-ନାୟକ୍କର (ତାମିଲନାଡୁ)'
    },
    category: 'Kshatriya Martial',
    designation_group: 'Historical, martial, and traditional titles',
    geographical_association: 'Tamil Nadu',
    epistemic_classification: 'Documented Epigraphic & Historical Designation',
    epistemic_note: {
      en: 'Historical martial and chieftaincy title in Tamil Nadu combining "Odda" (Odra) with "Nayakkar / Nayaka" (military commander/governor under Vijayanagara and Madurai/Tanjore Nayaka polities). Documented in South Indian historical and ethnographic records.',
      hi: 'तमिलनाडु में प्रचलित ऐतिहासिक सामरिक व नायकत्व उपाधि जो "ओड्डा" (ओड्र) को "नायक्कर / नायक" (विजयनगर एवं मदुरै/तंजावुर नायक शासन में सैन्य कमांडर) से जोड़ती है। दक्षिण भारतीय ऐतिहासिक व नृवंशविज्ञान अभिलेखों में दर्ज।',
      te: 'తమిళనాడులో "ఒడ్డ" (ఓడ్ర) మరియు "నాయక్కర్ / నాయక" (విజయనగర, మధురై/తంజావూరు నాయక పాలనలో సైనిక అధిపతి) పదాల కలయికతో ఏర్పడిన చారిత్రక సైనిక బిరుదు. దక్షిణ భారత చారిత్రక రికార్డులలో నమోదైంది.',
      kn: 'ತಮಿಳುನಾಡಿನಲ್ಲಿ "ಒಡ್ಡ" (ಓಡ್ರ) ಮತ್ತು "ನಾಯ್ಕರ್ / ನಾಯಕ" (ಸೇನಾ ನಾಯಕ/ಪಾಳೆಯಗಾರ) ಪದಗಳ ಸಂಯೋಜನೆಯ ಐತಿಹಾಸಿಕ ವೀರ ಬಿರುದು.',
      ta: 'தமிழ்நாட்டில் "ஒட்ட" (ஒட்ர) என்பதோடு "நாயக்கர் / நாயக்க" (விஜயநகர மற்றும் மதுரை/தஞ்சை நாயக்கர் காலப் படைத்தளபதி/பாளையத் தலைவர்) என்ற பட்டத்தை இணைக்கும் வரலாற்று மறவர் பட்டம்.',
      mr: 'तमिळनाडूमध्ये "ओड्डा" (ओड्र) आणि "नायक्कर / नायक" (लष्करी प्रमुख) यांचा संयोग असलेली ऐतिहासिक लढाऊ पदवी.',
      or: 'ତାମିଲନାଡୁରେ "ଓଡ୍ଡ" (ଓଡ଼୍ର) ସହିତ "ନାୟକ୍କର / ନାୟକ" (ସେନାପତି) ଯୁକ୍ତ ଐତିହାସିକ ସାମରିକ ଉପାଧି।',
      bn: 'তামিলনাড়ুতে "ওড্ড" (ওড্র) এবং "নায়ক্কর / নায়ক" (সেনাপতি/শাসক) যুক্ত ঐতিহাসিক সামরিক উপাধি।'
    },
    primary_regions: ['Madurai-Dindigul-Theni Belt', 'Kongu Nadu (Coimbatore, Erode, Tiruppur)', 'Tiruchirappalli-Thanjavur Corridor', 'Southern Tamil Nadu'],
    prominent_states: ['Tamil Nadu'],
    linguistic_origin: 'Dravidian-Sanskrit martial title: "Odda" (of Odra origin) + Tamil/Telugu honorific "Nayakkar" (from Sanskrit Nayaka, military leader).',
    historical_role: {
      en: 'Denotes the historical martial, palaiyakkarar-retainer, and fortification-commanding leadership stratum among Odda/Ottar communities in Tamil Nadu during the Gajapathi southern expeditions (1463–1464 CE) and the subsequent Vijayanagara and Madurai Nayaka periods.',
      hi: 'गजपति दक्षिणी अभियानों (1463–1464 ई.) और परवर्ती विजयनगर व मदुरै नायक काल के दौरान तमिलनाडु में दुर्ग निर्माण और सैन्य नेतृत्व करने वाले ओड्डा/ओट्टर नायकों की ऐतिहासिक उपाधि।',
      te: 'గజపతి దక్షిణ దండయాత్రలు (1463–1464 CE) మరియు ఆపై విజయనగర, మధురై నాయక రాజుల కాలంలో తమిళనాడులో కోటల రక్షణ, నిర్మాణం మరియు సైనిక నాయకత్వం వహించిన వర్గాన్ని సూచించే చారిత్రక బిరుదు.',
      kn: 'ಗಜಪತಿ ದಕ್ಷಿಣ ದಂಡಯಾತ್ರೆ (1463–1464 CE) ಮತ್ತು ನಂತರದ ವಿಜಯನಗರ ಹಾಗೂ ಮದುರೈ ನಾಯಕರ ಕಾಲದಲ್ಲಿ ತಮಿಳುನಾಡಿನಲ್ಲಿ ಕೋಟೆ ರಕ್ಷಣೆ ಮತ್ತು ಸೇನಾ ನಾಯಕತ್ವ ವಹಿಸಿದವರ ಐತಿಹಾಸಿಕ ಬಿರುದು.',
      ta: 'கஜபதி தென்னிந்தியப் படையெடுப்புகள் (கி.பி. 1463–1464) மற்றும் விஜயநகர, மதுரை நாயக்கர் காலங்களில் தமிழகத்தில் கோட்டைப் பாதுகாப்பு, படைத் தலைமை மற்றும் நீர்ப்பாசனப் பணிகளை வழிநடத்திய மரபினரின் வரலாற்றுப் பட்டம்.',
      mr: 'गजपतींच्या दक्षिणेतील मोहिमा (१४६३–१४६४) आणि त्यानंतरच्या विजयनगर व मदुरै नायक काळात तमिळनाडूत दुर्गसंरक्षण व लष्करी नेतृत्व करणाऱ्या प्रमुखांची पदवी.',
      or: 'ଗଜପତିଙ୍କ ଦକ୍ଷିଣ ଅଭିଯାନ (୧୪୬୩–୧୪୬୪ খ୍ରୀ.) ଓ ପରବର୍ତ୍ତୀ ବିଜୟନଗର ତଥା ମଦୁରାଇ ନାୟକ କାଳରେ ତାମିଲନାଡୁରେ ଦୁର୍ଗ ରକ୍ଷା ଓ ସାମରିକ ନେତୃତ୍ୱ ନେଇଥିବା ବର୍ଗଙ୍କ ଉପାଧି।',
      bn: 'গজপতিদের দক্ষিণ ভারত অভিযান (১৪৬৩–১৪৬৪ খ্রি.) এবং পরবর্তী বিজয়নগর ও মাদুরাই নায়ক আমলে তামিলনাড়ুতে দুর্গ রক্ষা ও সামরিক নেতৃত্বদানকারী গোষ্ঠীর উপাধি।'
    },
    sacred_associations: ['Ranganathaswamy (Srirangam)', 'Meenakshi Amman (Madurai)', 'Lord Murugan (Palani)', 'Jakkamma / Bommayya']
  },
  {
    id: 'syn_oad_rajputh',
    title: 'Oad-Rajputh / Oad-Rajput',
    native_scripts: {
      Devanagari: 'ओड राजपूत / ओड-राजपूत',
      Nastaliq: 'اوڈ راجپوت',
      Gurmukhi: 'ਓਡ ਰਾਜਪੂਤ',
      Gujarati: 'ઓડ રાજપૂત'
    },
    category: 'Kshatriya Martial',
    designation_group: 'Historical, martial, and traditional titles',
    geographical_association: 'Rajasthan, Gujarat, Punjab, Haryana, Delhi & Northern Plains',
    epistemic_classification: 'Community Tradition & Lineage Claim',
    epistemic_note: {
      en: 'Recorded in North-Western Indian ethnographic accounts and community chronicles linking Odra/Odda fortress engineers and martial clans with Rajput customs across Rajasthan, Gujarat, and Punjab.',
      hi: 'उत्तर-पश्चिमी भारत के नृवंशविज्ञान विवरणों और सामुदायिक इतिहास में दर्ज, जो राजस्थान, गुजरात और पंजाब में ओड दुर्ग-निर्माताओं व सामरिक कुलों को राजपूत परंपराओं से जोड़ता है।',
      te: 'రాజస్థాన్, గుజరాత్ మరియు పంజాబ్ ప్రాంతాలలో ఓడ్ దుర్గ నిర్మాతలు మరియు యోధ వంశాలను రాజపుత్ర సంప్రదాయాలతో అనుసంధానించే ఉత్తర భారత చారిత్రక, సామాజిక నామం.',
      kn: 'ರಾಜಸ್ಥಾನ, ಗುಜರಾತ್ ಮತ್ತು ಪಂಜಾಬ್ ಪ್ರದೇಶಗಳಲ್ಲಿ ಓಡ್ ಕೋಟೆ ನಿರ್ಮಾಪಕರು ಮತ್ತು ಯೋಧ ಕುಲಗಳನ್ನು ರಜಪೂತ ಸಂಪ್ರದಾಯಗಳೊಂದಿಗೆ ಬೆಸೆಯುವ ಐತಿಹಾಸಿಕ ಹೆಸರು.',
      ta: 'ராஜஸ்தான், குஜராத் மற்றும் பஞ்சாப் பகுதிகளில் ஓட் கோட்டைக் கலைஞர்கள் மற்றும் மறவர் குலங்களை ராஜபுத்திர மரபுகளுடன் இணைக்கும் பெயர்.',
      mr: 'राजस्थान, गुजरात आणि पंजाबमधील ओड दुर्ग-निर्माते आणि लढाऊ कुळांना राजपूत परंपरेशी जोडणारी ऐतिहासिक संज्ञा.',
      or: 'ରାଜସ୍ଥାନ, ଗୁଜରାଟ ଓ ପଞ୍ଜାବରେ ଓଡ଼ ଦୁର୍ଗ-ନିର୍ମାତା ଓ ସାମରିକ କୁଳଙ୍କୁ ରାଜପୁତ ପରମ୍ପରା ସହ ଯୋଡ଼ୁଥିବା ଐତିହାସିକ ଉପାଧି।',
      bn: 'রাজস্থান, গুজরাট ও পাঞ্জাবে ওড দুর্গ-নির্মাতা ও সামরিক কুলগুলোকে রাজপুত ঐতিহ্যের সাথে যুক্ত করা ঐতিহাসিক উপাধি।'
    },
    primary_regions: ['Northern Plains', 'Western Arid Zone', 'Thar Desert Fringe', 'Malwa Corridor'],
    prominent_states: ['Rajasthan', 'Gujarat', 'Punjab', 'Haryana', 'Sindh (historical)', 'Delhi NCR', 'Madhya Pradesh'],
    linguistic_origin: 'Derived from ancient Prakrit "Odda" combined with Sanskrit "Rajaputra" (Son of the King / Rajput).',
    historical_role: {
      en: 'Defenders of frontiers, hereditary master fortress and moat excavators (Chittorgarh, Mehrangarh, Jaisalmer), and preservers of martial Kshatriya customs under medieval dynasties.',
      hi: 'सीमाओं के रक्षक, ऐतिहासिक किलों व खाइयों के निर्माता (चित्तौड़गढ़, मेहरानगढ़, जैसलमेर) एवं क्षत्रिय परंपराओं के संरक्षक।',
      te: 'సరిహద్దుల రక్షకులు, చారిత్రక రాజపుత్ర దుర్గాలు, కందకాలు మరియు కోటల నిర్మాతలు.',
      kn: 'ಗಡಿ ರಕ್ಷಕರು, ಚಾರಿತ್ರಿಕ ಕೋಟೆಗಳು ಮತ್ತು ಕಂದಕಗಳ ನುರಿತ ನಿರ್ಮಾತೃಗಳು.',
      ta: 'எல்லைக் காவலர்கள் மற்றும் வரலாற்று சிறப்புமிக்க கோட்டைகளை அமைத்த சத்திரிய மரபினர்.',
      mr: 'सीमा रक्षक, ऐतिहासिक किल्ले व खंदक निर्माते आणि क्षत्रिय संस्कृतीचे रक्षक.',
      or: 'ସୀମାନ୍ତ ରକ୍ଷକ, ଐତିହାସିକ ଦୁର୍ଗ ନିର୍ମାତା ଓ କ୍ଷତ୍ରିୟ ପରମ୍ପରାର ଧାରକ।',
      bn: 'সীমান্ত রক্ষক, ঐতিহাসিক দুর্গ ও পরিখা নির্মাতা এবং ক্ষত্রিয় সংস্কৃতির ধারক।'
    },
    sacred_associations: ['Mata Jasma Devi', 'Samrat Sagara', 'Maharshi Bhagiratha', 'Sri Rama']
  },
  {
    id: 'syn_odderajulu',
    title: 'OddeRajulu / VaddeRajulu / Vadiyarajulu',
    native_scripts: {
      Telugu: 'ఒడ్డేరాజులు / వడ్డేరాజులు / వడియరాజులు',
      Kannada: 'ಒಡ್ಡೇರಾಜುಲು / ವಡ್ಡೇರಾಜುಲು',
      Devanagari: 'ओड्डेराजुलु / वड्डेराजुलु / वडियाराजुलु'
    },
    category: 'Royal Nobility',
    designation_group: 'Historical, martial, and traditional titles',
    geographical_association: 'Andhra Pradesh, Telangana & Karnataka Borderlands',
    epistemic_classification: 'Regional Ethnonym & Gazetteer Record',
    epistemic_note: {
      en: 'Documented in Andhra and Rayalaseema regional histories, C.P. Brown manuscript collections, and district gazetteers as an honorific Kshatriya-aligned title used by Odde/Vadde ruling and martial lineages.',
      hi: 'आंध्र और रायलसीमा के क्षेत्रीय इतिहास, सी.पी. ब्राउन पांडुलिपि संग्रह और जिला गजेटियरों में ओड्डे/वड्डे सामरिक व शासक वंशों की सम्मानजनक क्षत्रिय उपाधि के रूप में दर्ज।',
      te: 'ఆంధ్ర మరియు రాయలసీమ ప్రాంతీయ చరిత్రలు, సి.పి. బ్రౌన్ తాళపత్ర సేకరణలు మరియు జిల్లా గెజిటీర్లలో ఒడ్డే/వడ్డే రాజ-యోధ వంశాల గౌరవ క్షత్రియ నామంగా నమోదైంది.',
      kn: 'ಆಂಧ್ರ ಮತ್ತು ರಾಯಲಸೀಮೆ ಪ್ರಾದೇಶಿಕ ಇತಿಹಾಸ, ಸಿ.ಪಿ. ಬ್ರೌನ್ ಹಸ್ತಪ್ರತಿಗಳು ಮತ್ತು ಜಿಲ್ಲಾ ಗೆಜೆಟಿಯರ್‌ಗಳಲ್ಲಿ ದಾಖಲಾದ ಗೌರವಯುತ ಕ್ಷತ್ರಿಯ ಬಿರುದು.',
      ta: 'ஆந்திரா மற்றும் ராயலசீமா வரலாற்று ஆவணங்கள், சி.பி. பிரவுன் சுவடிகள் மற்றும் மாவட்ட அரசிதழ்களில் பதிவான கௌரவ சத்திரியப் பட்டம்.',
      mr: 'आंध्र आणि रायलसीमाच्या प्रादेशिक इतिहासात तसेच जिल्हा गॅझेटिअरमध्ये नोंदवलेली सन्माननीय क्षत्रिय पदवी.',
      or: 'ଆନ୍ଧ୍ର ଓ ରାୟଲସୀମା ଆଞ୍ଚଳିକ ଇତିହାସ, ସି.ପି. ବ୍ରାଉନ୍ ପାଣ୍ଡୁଲିପି ଓ ଜିଲ୍ଲା ଗେଜେଟିୟରରେ ଲିପିବଦ୍ଧ ସମ୍ମାନଜନକ କ୍ଷତ୍ରିୟ ଉପାଧି।',
      bn: 'অন্ধ্র ও রায়লসীমার আঞ্চলিক ইতিহাস, সি.পি. ব্রাউন পাণ্ডুলিপি এবং জেলা গেজেটিয়ারে নথিবদ্ধ সম্মানসূচক ক্ষত্রিয় উপাধি।'
    },
    primary_regions: ['Coastal Andhra Delta', 'Rayalaseema Tablelands', 'Telangana Plateau', 'Eastern Ghats Foothills'],
    prominent_states: ['Andhra Pradesh', 'Telangana', 'Karnataka borderlands'],
    linguistic_origin: 'Telugu adaptation combining "Odde / Vadde" (Odra) with the royal title "Rajulu" / "Raju" (King / Ruler).',
    historical_role: {
      en: 'Associated with Gajapathi military viceroys, garrison fort governors, and territorial commanders stationed at Kondavidu, Bellamkonda, Vinukonda, and Srisailam during medieval southern campaigns.',
      hi: 'गजपति सेना के महापात्र, दुर्ग रक्षक एवं सैन्य अधिकारी जो कोंडावीडु, बेल्लमकोंडा और श्रीशैलम जैसे सामरिक किलों में पदस्थापित थे।',
      te: 'గజపతి సామ్రాజ్య సేనాపతులు, కొండవీడు, బెల్లంకొండ, వినుకొండ, ఉదయగిరి దుర్గ రక్షకులుగా సేవలందించిన వీర వంశీకులు.',
      kn: 'ಗಜಪತಿ ಸೇನಾ ನಾಯಕರು ಮತ್ತು ದಕ್ಷಿಣದ ಪ್ರಮುಖ ಕೋಟೆಗಳ ರಕ್ಷಕರಾಗಿದ್ದ ರಾಜಮನೆತನದ ಶೂರರು.',
      ta: 'கொண்டவீடு மற்றும் உதயகிரி கோட்டைகளில் பணியாற்றிய கஜபதி படைகளின் தளபதிகள்.',
      mr: 'कोंडावीडु आणि बेल्लमकोंडा किल्ल्यांचे संरक्षण करणारे गजपतींचे शूर सेनापती.',
      or: 'ଗଜପତି ସାମ୍ରାଜ୍ୟର ଦକ୍ଷିଣ ବିଜୟ କାଳରେ କୋଣ୍ଡାଭିଡୁ ଓ ବିନୁକୋଣ୍ଡା ଦୁର୍ଗ ରକ୍ଷା କରିଥିବା ସେନାପତି।',
      bn: 'গজপতি সাম্রাজ্যের দক্ষিণ ভারত অভিযানের সেনানায়ক ও দুর্গ অধিপতি।'
    },
    sacred_associations: ['Sri Rama (Kodanda Rama)', 'Samrat Sagara', 'Srisailam Mallikarjuna', 'Narasimha Swamy']
  }
];

// ---------------------------------------------------------------------------
// 3. GEOGRAPHICAL SPREAD & CORRIDORS REPOSITORY
// ---------------------------------------------------------------------------
export const GEOGRAPHICAL_SPREAD: GeographicalSpreadRegion[] = [
  {
    id: 'geo_rajasthan_sindh_punjab',
    region_name: 'Rajasthan, Sindh, Punjab & Northern Plains',
    localized_region: {
      en: 'Rajasthan, Sindh, Punjab & Northern Plains',
      hi: 'राजस्थान, सिंध, पंजाब एवं उत्तरी मैदान',
      te: 'రాజస్థాన్, సింధ్, పంజాబ్ మరియు ఉత్తర మైదానాలు',
      kn: 'ರಾಜಸ್ಥಾನ, ಸಿಂಧ್, ಪಂಜಾಬ್ ಮತ್ತು ಉತ್ತರ ಬಯಲು ಪ್ರದೇಶ',
      ta: 'ராஜஸ்தான், சிந்து, பஞ்சாப் மற்றும் வட இந்திய சமவெளி',
      mr: 'राजस्थान, सिंध, पंजाब आणि उत्तर भारतीय मैदाने',
      or: 'ରାଜସ୍ଥାନ, ସିନ୍ଧ, ପଞ୍ଜାବ ଓ ଉତ୍ତର ଭାରତୀୟ ସମତଳ',
      bn: 'রাজস্থান, সিন্ধু, পাঞ্জাব ও উত্তর ভারতীয় সমভূমি'
    },
    states_and_territories: ['Rajasthan', 'Punjab', 'Haryana', 'Delhi NCR', 'Sindh (Historical)', 'Western Uttar Pradesh'],
    prominent_cities_districts: ['Jodhpur', 'Jaisalmer', 'Bikaner', 'Jaipur', 'Nagaur', 'Abohar', 'Hisar', 'Delhi'],
    predominant_community_synonyms: ['Oad-Rajputh', 'Oad', 'Od-Rajput', 'Od'],
    migration_epoch_and_corridor: 'Pre-medieval and medieval movement linking Malwa, Rajputana, the Indus valley, and the Yamuna corridor.',
    historical_forts_and_landmarks: [
      'Chittorgarh Defensive Moats',
      'Mehrangarh Rock Foundations',
      'Jaisalmer Golden Fort Ramparts',
      'Stepwells (Baoris) of Shekhawati'
    ],
    sacred_centers: ['Mata Jasma Devi Temples (Rajasthan & border areas)', 'Ramdevra', 'Pushkar Tirtha'],
    regional_overview: {
      en: 'In the arid and semi-arid terrain of northwestern India, Oad-Rajputs were the quintessential master earth-engineers, miners, and fortress builders. They dug deep defensive moats (Khais) surrounding royal citadels, constructed massive water harvesting stepwells (Baoris), and stood as fiercely loyal warriors in times of siege.',
      hi: 'उत्तर-पश्चिम भारत के मरुस्थलीय क्षेत्रों में ओड-राजपूतों ने जल-संरक्षण की जीवनरेखा तैयार की। उन्होंने चित्तौड़गढ़, मेहरानगढ़ और जैसलमेर जैसे किलों की गहरी खाइयों और प्राचीरों का निर्माण किया तथा बावड़ियों के माध्यम से जल संचय की मिसाल कायम की।',
      te: 'రాజస్థాన్ మరియు సింధు ప్రాంతాలలో ఓడ్-రాజ్‌పుత్‌లు కోటల కందకాలు, లోతైన బావుల నిర్మాణంలో నిపుణులుగా ఖ్యాతికెక్కారు.',
      kn: 'ರಾಜಸ್ಥಾನ ಮತ್ತು ಪಂಜಾಬ್‌ನಲ್ಲಿ ಕೋಟೆಗಳ ಕಂದಕಗಳನ್ನು ನಿರ್ಮಿಸುವಲ್ಲಿ ಮತ್ತು ಬಾವಿಗಳನ್ನು ತೋಡುವಲ್ಲಿ ಓಡ್-ರಜಪೂತರು ಪ್ರಸಿದ್ಧರಾಗಿದ್ದರು.',
      ta: 'ராஜஸ்தான் பாலைவனப் பகுதியில் கோட்டைகள் மற்றும் படிக்கிணறுகளை அமைத்த பெருமை இவர்களுடையது.',
      mr: 'राजस्थान आणि पंजाबमध्ये किल्ले आणि बारवांच्या निर्मितीत ओड-राजपूत समाज आघाडीवर होता.',
      or: 'ରାଜସ୍ଥାନ ଓ ପଞ୍ଜାବର ଦୁର୍ଗ ପରିଖା ଏବଂ ପ୍ରାଚୀନ କୂଅ ଖନନରେ ଓଡ଼-ରାଜପୁତମାନଙ୍କ ଭୂମିକା ଅନନ୍ୟ ଥିଲା।',
      bn: 'রাজস্থান ও পাঞ্জাবে প্রাচীন দুর্গের পরিখা এবং গভীর বাওলি নির্মাণে ওড-রাজপুতদের ঐতিহ্য অবিস্মরণীয়।'
    }
  },
  {
    id: 'geo_gujarat',
    region_name: 'Gujarat (Patan, Saurashtra & Ahmedabad)',
    localized_region: {
      en: 'Gujarat (Patan, Saurashtra & Ahmedabad)',
      hi: 'गुजरात (पाटन, सौराष्ट्र एवं अहमदाबाद)',
      te: 'గుజరాత్ (పటాన్, సౌరాష్ట్ర మరియు అహ్మదాబాద్)',
      kn: 'ಗುಜರಾತ್ (ಪಾಠಣ, ಸೌರಾಷ್ಟ್ರ ಮತ್ತು ಅಹಮದಾಬಾದ್)',
      ta: 'குஜராத் (பாடன், சௌராஷ்டிரா மற்றும் அகமதாபாத்)',
      mr: 'गुजरात (पाटन, सौराष्ट्र आणि अहमदाबाद)',
      or: 'ଗୁଜରାଟ (ପାଟଣ, ସୌରାଷ୍ଟ୍ର ଓ ଅହମଦାବାଦ)',
      bn: 'গুজরাত (পাটন, সৌরাষ্ট্র ও আহমেদাবাদ)'
    },
    states_and_territories: ['Gujarat'],
    prominent_cities_districts: ['Patan', 'Vadodara', 'Ahmedabad', 'Surendranagar', 'Bhavnagar', 'Mehsana'],
    predominant_community_synonyms: ['Oad-Rajput', 'Od', 'Oad Patel (Artisan Title)'],
    migration_epoch_and_corridor: '11th–12th century Solanki (Chaulukya) patronage era under King Siddharaja Jaisinh and Kumarapala.',
    historical_forts_and_landmarks: [
      'Sahastralinga Talav (Patan)',
      'Rani ki Vav Earth Excavation Site',
      'Medieval City Walls of Ahmedabad and Champaner'
    ],
    sacred_centers: ['Mata Jasma Devi Mandir (Patan)', 'Vadodara Jasma Devi Shrine', 'Somnath'],
    regional_overview: {
      en: 'Gujarat is the spiritual heartland of the Mata Jasma Devi legacy. The community was specially summoned during the 11th–12th century Solanki era for their unparalleled expertise in excavating the vast Sahastralinga lake in Patan. Today, they remain guardians of water-reservoir traditions and community cohesion.',
      hi: 'गुजरात माता जस्मा देवी की पावन भूमि है। 11वीं-12वीं शताब्दी में सोलंकी सम्राटों के काल में पाटन के सहस्रलिंग तालाब के निर्माण में इस समुदाय का योगदान अमिट है। वे आज भी अपने स्वाभिमान और जल-संस्कृति के लिए पूज्य हैं।',
      te: 'పటాన్ సహస్రలింగ తటాక నిర్మాణంతో ముడిపడిన మాతా జస్మా దేవి పవిత్ర చరిత్రకు గుజరాత్ కేంద్రం.',
      kn: 'ಪಾಠಣದ ಸಹಸ್ರಲಿಂಗ ಕೆರೆ ಮತ್ತು ಮಾತಾ ಜಸ್ಮಾ ದೇವಿಯ ಚರಿತ್ರೆಗೆ ಗುಜರಾತ್ ಸಾಕ್ಷಿಯಾಗಿದೆ.',
      ta: 'பாடன் சகஸ்ரலிங்க ஏரி மற்றும் மாதா ஜஸ்மா தேவியின் தியாக பூமி குஜராத்.',
      mr: 'पाटनचा सहस्रलिंग तलाव आणि माता जस्मा देवी यांच्या बलिदानाची ही पवित्र भूमी आहे.',
      or: 'ପାଟଣର ସହସ୍ରଲିଙ୍ଗ ଜଳାଶୟ ଓ ମାତା ଜସ୍ମା ଦେବୀଙ୍କ ପବିତ୍ର ସ୍ମୃତିଭୂମି ଗୁଜରାଟ।',
      bn: 'পাটনের ঐতিহাসিক সহস্রলিঙ্গ জলাশয় ও মাতা জসমা দেবীর আত্মত্যাগের পুণ্যভূমি গুজরাত।'
    }
  },
  {
    id: 'geo_maharashtra',
    region_name: 'Maharashtra (Solapur, Pune & Marathwada)',
    localized_region: {
      en: 'Maharashtra (Solapur, Pune & Marathwada)',
      hi: 'महाराष्ट्र (सोलापुर, पुणे एवं मराठवाड़ा)',
      te: 'మహారాష్ట్ర (సోలాపూర్, పూణే మరియు మరాఠ్వాడా)',
      kn: 'ಮಹಾರಾಷ್ಟ್ರ (ಸೋಲಾಪುರ, ಪುಣೆ ಮತ್ತು ಮರಾಠವಾಡ)',
      ta: 'மகாராஷ்டிரா (சோலாப்பூர், புனே மற்றும் மராத்வாடா)',
      mr: 'महाराष्ट्र (सोलापूर, पुणे आणि मराठवाडा)',
      or: 'ମହାରାଷ୍ଟ୍ର (ସୋଲାପୁର, ପୁଣେ ଓ ମରାଠୱାଡ଼ା)',
      bn: 'মহারাষ্ট্র (সোলাপুর, পুণে ও মারাঠওয়াড়া)'
    },
    states_and_territories: ['Maharashtra', 'Goa'],
    prominent_cities_districts: ['Solapur', 'Pune', 'Kolhapur', 'Satara', 'Latur', 'Dharashiv (Osmanabad)', 'Nagpur'],
    predominant_community_synonyms: ['Waddar', 'Vaddar', 'Vadar', 'Od-Kshatriya'],
    migration_epoch_and_corridor: '12th century Kalyana Sharana era, followed by Maratha Empire military and civil construction eras.',
    historical_forts_and_landmarks: [
      'Solapur Bhuikot Fort and Siddharameshwar Lake Embankments',
      'Maratha Hill Fort Ramparts (Sinhagad, Rajgad, Raigad stone quarrying)',
      'Historic Stepwells of Satara and Pune'
    ],
    sacred_centers: ['Siddharameshwar Temple (Solapur)', 'Tuljapur Bhavani', 'Pandharpur Vithoba'],
    regional_overview: {
      en: 'In Maharashtra, the Waddar community represents the foundation of stone construction, dam building, and quarrying. Revered for their symbiotic bond with Shivayogi Siddharameshwara at Solapur, they formed the engineering backbone behind numerous Maratha hill forts and deep stone wells.',
      hi: 'महाराष्ट्र में वडार समुदाय पाषाण-शिल्प, खदान और जल-संरक्षण की रीढ़ रहा है। सोलापुर में संत सिद्धरामेश्वर के साथ मिलकर उन्होंने ऐतिहासिक तलाबों का निर्माण किया तथा मराठा साम्राज्य के दुर्गों की पत्थर-चिनाई में अग्रणी भूमिका निभाई।',
      te: 'మహారాష్ట్రలో వడ్డార్ సమూహాలు సోలాపూర్ సిద్ధరామేశ్వరుని తటాకాల నిర్మాణం మరియు మరాఠా కోటల నిర్మాణంలో కీలక పాత్ర పోషించాయి.',
      kn: 'ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ವಡ್ಡಾರ ಸಮಾಜವು ಕಲ್ಲಿನ ಕೆಲಸ, ಕೆರೆ-ಬಾವಿ ನಿರ್ಮಾಣ ಮತ್ತು ಕೋಟೆಗಳ ರಕ್ಷಣೆಯಲ್ಲಿ ಮಹತ್ತರ ಪಾತ್ರ ವಹಿಸಿದೆ.',
      ta: 'சோலாப்பூர் ஏரி மற்றும் மராட்டிய கோட்டைகளின் கட்டுமானத்தில் வட்டார் மக்கள் முக்கிய பங்காற்றினர்.',
      mr: 'महाराष्ट्रात शिवकालीन किल्ल्यांची तटबंदी आणि सोलापूरचे सिद्धरामेश्वर तलाव उभारण्यात वडार समाजाचा ऐतिहासिक वाटा आहे.',
      or: 'ମହାରାଷ୍ଟ୍ରର ମରାଠା ଦୁର୍ଗ ନିର୍ମାଣ ଓ ସୋଲାପୁର ଜଳାଶୟ ପ୍ରତିଷ୍ଠାରେ ୱଡ୍ଡାର ସମାଜର ଭୂମିକା ଅତୁଳନୀୟ।',
      bn: 'মহারাষ্ট্রে মারাঠা দুর্গ নির্মাণ ও সোলাপুরের জলাশয় সৃষ্টিতে বড্ডার সমাজের অবদান ঐতিহাসিক।'
    }
  },
  {
    id: 'geo_karnataka',
    region_name: 'Karnataka (Northern Deccan & Southern Plateau)',
    localized_region: {
      en: 'Karnataka (Northern Deccan & Southern Plateau)',
      hi: 'कर्नाटक (उत्तरी दक्कन एवं दक्षिणी पठार)',
      te: 'కర్ణాటక (ఉత్తర దక్కన్ మరియు దక్షిణ పీఠభూమి)',
      kn: 'ಕರ್ನಾಟಕ (ಉತ್ತರ ದಖನ್ ಮತ್ತು ದಕ್ಷಿಣ ಪ್ರಸ್ಥಭೂಮಿ)',
      ta: 'கர்நாடகா (வட தக்காணம் மற்றும் தென் பீடபூமி)',
      mr: 'कर्नाटक (उत्तर दख्खन आणि दक्षिण पठार)',
      or: 'କର୍ଣ୍ଣାଟକ (ଉତ୍ତର ଦାକ୍ଷିଣାତ୍ୟ ଓ ଦକ୍ଷିଣ ମାଳଭୂମି)',
      bn: 'কর্ণাটক (উত্তর দাক্ষিণাত্য ও দক্ষিণ মালভূমি)'
    },
    states_and_territories: ['Karnataka'],
    prominent_cities_districts: ['Bagalkot', 'Belagavi', 'Vijayapura (Bijapur)', 'Chitradurga', 'Ballari', 'Bengaluru', 'Kalaburagi'],
    predominant_community_synonyms: ['Waddar', 'Vaddar', 'Odde', 'Od-Kshatriya'],
    migration_epoch_and_corridor: 'Dual trajectory: 12th-century Sharana movement along with 15th-century Gajapathi garrisons (Virabhadra Deva at Malebennur).',
    historical_forts_and_landmarks: [
      'Badami & Aihole Sandstone Quarry Works',
      'Chitradurga Stone Ramparts (Seven-Fold Fortress)',
      'Malebennur Gajapathi Pillar Grants',
      'Bengaluru Historical Lake Chains'
    ],
    sacred_centers: ['Basavakalyan', 'Kudalasangama', 'Srisailam Border Shrines', 'Malebennur Ranganatha'],
    regional_overview: {
      en: 'Karnataka possesses one of the densest populations of the Vaddar / Waddar community. They are celebrated as the master artisans who shaped the stone architecture of northern Karnataka and the massive irrigation tanks of Chitradurga, Ballari, and Bengaluru.',
      hi: 'कर्नाटक में वಡ್ಡार समुदाय का गौरवशाली इतिहास है। उन्होंने बादामी के पाषाण स्थापत्य से लेकर चित्रदुर्ग के सात-परकोटे वाले किले और बेंगलुरु की ऐतिहासिक झीलों के निर्माण में श्रम का शिखर स्थापित किया।',
      te: 'కర్ణాటకలో చిత్రదుర్గ ఏడుచుట్ల కోట, బాదామి రాతి నిర్మాణాలు, బెంగళూరు చెరువుల నిర్మాణంలో వడ్డార్ల పాత్ర జగద్విదితం.',
      kn: 'ಚಿತ್ರದುರ್ಗದ ಕಲ್ಲಿನ ಕೋಟೆ, ಬಾದಾಮಿಯ ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಬೆಂಗಳೂರಿನ ಐತಿಹಾಸಿಕ ಕೆರೆಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ ವಡ್ಡಾರರ ಕೊಡುಗೆ ಅಪಾರ.',
      ta: 'கர்நாடகாவின் சித்ரதுர்கா கோட்டை மற்றும் வரலாற்று ஏரிகளை உருவாக்கியவர்கள் வட்டார் சமூகத்தினர்.',
      mr: 'चित्रदुर्गचा किल्ला आणि कर्नाटकातील ऐतिहासिक तलावांच्या निर्मितीत वडार समाज अग्रगण್ಯ होता.',
      or: 'ଚିତ୍ରଦୁର୍ଗ ଦୁର୍ଗ ଓ ବାଦାମୀ ପଥର କାରିଗରୀରେ କର୍ଣ୍ଣାଟକର ୱଡ୍ଡାରମାନଙ୍କ ଅବଦାନ ଅମଳିନ।',
      bn: 'চিত্রদুর্গ দুর্গ এবং কর্ণাটকের ঐতিহাসিক জলাশয় নির্মাণে বড্ডার সমাজের ভূমিকা অনস্বীকার্য।'
    }
  },
  {
    id: 'geo_andhra_telangana',
    region_name: 'Andhra Pradesh & Telangana (Godavari, Krishna, Palnadu & Rayalaseema)',
    localized_region: {
      en: 'Andhra Pradesh & Telangana (Godavari, Krishna, Palnadu & Rayalaseema)',
      hi: 'आंध्र प्रदेश एवं तेलंगाना (गोदावरी, कृष्णा, पलनाडु एवं रायलसीमा)',
      te: 'ఆంధ్రప్రదేశ్ & తెలంగాణ (గోదావరి, కృష్ణా, పల్నాడు మరియు రాయలసీమ)',
      kn: 'ಆಂಧ್ರಪ್ರದೇಶ ಮತ್ತು ತೆಲಂಗಾಣ (ಗೋದಾವರಿ, ಕೃಷ್ಣಾ, ಪಲ್ನಾಡು ಮತ್ತು ರಾಯಲಸೀಮೆ)',
      ta: 'ஆந்திரப் பிரதேசம் மற்றும் தெலங்கானா (கோதாவரி, கிருஷ்ணா, பல்நாடு மற்றும் ராயலசீமா)',
      mr: 'आंध्र प्रदेश आणि तेलंगणा (गोदावरी, कृष्णा, पलनाडू आणि रायलसीमा)',
      or: 'ଆନ୍ଧ୍ରପ୍ରଦେଶ ଓ ତେଲେଙ୍ଗାନା (ଗୋଦାବରୀ, କ୍ରିଷ୍ଣା, ପଲନାଡୁ ଓ ରାୟଲସୀମା)',
      bn: 'অন্ধ্রপ্রদেশ ও তেলেঙ্গানা (গোদাবরী, কৃষ্ণা, পলনাড়ু ও রায়লসীমা)'
    },
    states_and_territories: ['Andhra Pradesh', 'Telangana'],
    prominent_cities_districts: ['Guntur', 'Palnadu', 'Vijayawada', 'Eluru (Kolleru Lake / Kolletikota)', 'Kurnool', 'Nellore', 'Warangal', 'Nalgonda', 'Khammam'],
    predominant_community_synonyms: ['OddeRajulu', 'VaddeRajulu', 'Vadiyarajulu', 'Odde', 'Vadde', 'Od-Kshatriya'],
    migration_epoch_and_corridor: '15th–16th century Gajapathi imperial expansion under Kapilendra Deva and Kumara Hamvira Deva, continuing into the Vijayanagara alliance.',
    historical_forts_and_landmarks: [
      'Kolletikota Island Water Citadel (Kolleti Sarasu / Kolleru Lake)',
      'Kondavidu Hill Fortress Citadels',
      'Bellamkonda Fort Battlements',
      'Vinukonda Gajapathi Outposts',
      'Cumbum Imperial Lake (One of Asia’s Oldest)'
    ],
    sacred_centers: [
      'Sri Kolletikota Peddintlamma Temple & Gokarneshwara Swamy (Kolleru Lake)',
      'Srisailam Mallikarjuna',
      'Simhachalam Varaha Narasimha',
      'Bhadrachalam Rama Temple',
      'Draksharama'
    ],
    regional_overview: {
      en: 'In Telugu-speaking lands, the community carries royal titles: OddeRajulu, VaddeRajulu, and Vadiyarajulu. Their ancestors were the celebrated military commanders and fortress garrisons of Kapilendra Deva and Hamvira Deva, later serving as regional governors and master canal creators throughout coastal Andhra and Rayalaseema.',
      hi: 'तेलुगु भाषी क्षेत्रों में इस समुदाय को राजसी उपाधियों—ओड्डेराजुलु, वड्डेराजुलु और वडियाराजुलु—से जाना जाता है। वे गजपति सम्राटों के सैन्य सेनापति और दुर्ग-नायक थे, जिन्होंने कोंडावीडु और बेल्लमकोंडा जैसे किलों की रक्षा की तथा सिंचाई नहरों का निर्माण किया।',
      te: 'ఆంధ్ర, తెలంగాణాలలో గజపతి సూర్యవంశ సైనిక సేనాపతులుగా, కొండవీడు, బెల్లంకొండ దుర్గాల రక్షకులుగా వచ్చిన వీరులు "ఒడ్డేరాజులు, వడ్డేరాజులు, వడియరాజులు"గా పిలువబడుతున్నారు.',
      kn: 'ಆಂಧ್ರ ಮತ್ತು ತೆಲಂಗಾಣದಲ್ಲಿ ಗಜಪತಿ ಸೈನ್ಯದ ಪ್ರಮುಖ ದಂಡನಾಯಕರಾಗಿ ಕೊಂಡವೀಡು ಕೋಟೆಯನ್ನು ರಕ್ಷಿಸಿದ ಶೂರರು ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡ್ಡೇರಾಜುಲು ಎಂದು ಪ್ರಸಿದ್ಧರಾಗಿದ್ದಾರೆ.',
      ta: 'கொண்டவீடு கோட்டை மற்றும் ஆந்திராவின் பாசன ஏரிகளை அமைத்த கஜபதி தளபதிகள் வத்தேராஜுலு என அழைக்கப்படுகின்றனர்.',
      mr: 'आंध्र व तेलंगणामध्ये या समाजाला वड्डेराजुलू म्हटले जाते, जे कोंडावीडु किल्ल्याचे रक्षक आणि गजपतींचे सेनापती होते.',
      or: 'ତେଲୁଗୁ ଅଞ୍ଚଳରେ ଏହି ସମୁଦାୟ ଓଡ୍ଡେରାଜୁଲୁ ଓ ଭଡ୍ଡେରାଜୁଲୁ ଭାବେ ପରିଚିତ, ଯେଉଁମାନେ ଗଜପତି ସାମ୍ରାଜ୍ୟର ବୀର ସେନାପତି ଥିଲେ।',
      bn: 'তেলুগু অঞ্চলে এই সমাজ বদ্দেরাজুলু নামে খ্যাত, যাঁরা গজপতি সাম্রাজ্যের সেনাপতি ও কোন্ডাভিডু দুর্গের অধিপতি ছিলেন।'
    }
  },
  {
    id: 'geo_tamil_nadu',
    region_name: 'Tamil Nadu (Kaveri Basin & Kongu Nadu)',
    localized_region: {
      en: 'Tamil Nadu (Kaveri Basin & Kongu Nadu)',
      hi: 'तमिलनाडु (कावेरी बेसिन एवं कोंगू नाडु)',
      te: 'తమిళనాడు (కావేరి పరివాహకం & కొంగు నాడు)',
      kn: 'ತಮಿಳುನಾಡು (ಕಾವೇರಿ ಜಲಾನಯನ ಮತ್ತು ಕೊಂಗು ನಾಡು)',
      ta: 'தமிழ்நாடு (காவிரி படுகை மற்றும் கொங்கு நாடு)',
      mr: 'तमिळनाडू (कावेरी खोरे आणि कोंगू नाडू)',
      or: 'ତାମିଲନାଡୁ (କାବେରୀ ଅବବାହିକା ଓ କୋଙ୍ଗୁ ନାଡୁ)',
      bn: 'তামিলনাড়ু (কাবেরী অববাহিকা ও কোঙ্গু নাড়ু)'
    },
    states_and_territories: ['Tamil Nadu', 'Puducherry'],
    prominent_cities_districts: ['Tiruchirappalli (Trichy)', 'Thanjavur', 'Salem', 'Coimbatore', 'Erode', 'Dindigul', 'Tiruppur'],
    predominant_community_synonyms: ['Oddar', 'Vaddar', 'Odde'],
    migration_epoch_and_corridor: '1463–1464 CE expedition of Gajapathi Kumara Hamvira Deva down to Srirangam, Munnur, and Tiruvarur on the Kaveri.',
    historical_forts_and_landmarks: [
      'Srirangam Temple Gajapathi Inscription Enclaves',
      'Kongu Nadu Stone Wells and Anicuts',
      'Tiruchirappalli Rockfort Water Cisterns'
    ],
    sacred_centers: ['Srirangam Ranganathaswamy', 'Tiruvannamalai', 'Palani Murugan'],
    regional_overview: {
      en: 'The presence of the Oddar community in Tamil Nadu is directly connected to the southern military campaign of Prince Hamvira Deva Gajapathi in 1464 CE. After establishing inscriptions at Srirangam, soldiers and artisan corps settled in the Kaveri delta, where their mastery over stone well sinking and anicut construction enriched the agrarian landscape.',
      hi: 'तमिलनाडु में ओड्डार समुदाय की उपस्थिति 1464 ई. में गजपति राजकुमार हम्मीर देव के कावेरी अभियान से जुड़ी है। श्रीरंगम में अभिलेख स्थापित करने के उपरांत यह योद्धा और शिल्पी वर्ग यहीं बस गया तथा कोंगू क्षेत्र में जल-स्रोतों का निर्माण किया।',
      te: '1464 లో కుమార హంవీర దేవ గజపతి కావేరీ తీరంలోని శ్రీరంగానికి చేసిన విజయ యాత్ర ద్వారా తమిళనాడులో స్థిరపడిన వీర సైనిక, శిల్ప వారసులు.',
      kn: '೧೪೬೪ರಲ್ಲಿ ಗಜಪತಿ ಹಂವೀರ ದೇವನ ಶ್ರೀರಂಗಂ ದಿಗ್ವಿಜಯದ ನಂತರ ಕಾವೇರಿ ತೀರದಲ್ಲಿ ನೆಲೆಸಿದ ಒಡ್ಡರ್ ಸಮುದಾಯವು ಪ್ರಸಿದ್ಧವಾಗಿದೆ.',
      ta: 'கி.பி. 1464-ல் கஜபதி இளவரசர் ஹம்வீர தேவர் ஸ்ரீரங்கம் வரை மேற்கொண்ட படையெடுப்பின் போது தங்கிவிட்ட வீரர்கள் மற்றும் ஏரி அமைப்பாளர்கள்.',
      mr: '१४६४ च्या हम्मीर देव गजपतींच्या स्वारीनंतर श्रीरंगम व कावेरी खोऱ्यात स्थायिक झालेले ओड्डार बांधव.',
      or: '୧୪୬୪ରେ କୁମାର ହମ୍ବୀର ଦେବଙ୍କ ଶ୍ରୀରଙ୍ଗମ ଅଭିଯାନ ସମୟରେ ତାମିଲନାଡୁରେ ସ୍ଥାୟୀ ଭାବେ ବସବାସ କରିଥିବା ଓଡ୍ଡାର ସମାଜ।',
      bn: '১৪৬৪ খ্রিষ্টাব্দে গজপতি রাজকুমার হাম্বীর দেবের শ্রীরঙ্গম অভিযানের পর কাবেরী উপত্যকায় বসতি স্থাপনকারী ওড্ডার সমাজ।'
    }
  },
  {
    id: 'geo_odisha',
    region_name: 'Odisha (Ancient Odra Desha Heartland)',
    localized_region: {
      en: 'Odisha (Ancient Odra Desha Heartland)',
      hi: 'ओडिशा (प्राचीन ओड्र देश की मूल भूमि)',
      te: 'ఒడిశా (ప్రాచీన ఓడ్ర దేశ రాజధాని కేంద్రం)',
      kn: 'ಒಡಿಶಾ (ಪ್ರಾಚೀನ ಓಡ್ರ ದೇಶದ ಹೃದಯಭಾಗ)',
      ta: 'ஒடிசா (பண்டைய ஒட்ர தேசத்தின் மைய பூமி)',
      mr: 'ओरिसा (प्राचीन ओड्र देशाची मूळ भूमी)',
      or: 'ଓଡ଼ିଶା (ପ୍ରାଚୀନ ଓଡ଼୍ର ଦେଶର କେନ୍ଦ୍ରସ୍ଥଳୀ)',
      bn: 'উড়িষ্যা (প্রাচীন ওড্র দেশের মূল ভূখণ্ড)'
    },
    states_and_territories: ['Odisha'],
    prominent_cities_districts: ['Cuttack (Varanasi Kataka)', 'Puri', 'Bhubaneswar', 'Jajpur', 'Khurda', 'Ganjam'],
    predominant_community_synonyms: ['Od-Kshatriya', 'Odra', 'Suryavamshi Odiyaraju'],
    migration_epoch_and_corridor: 'Indigenous civilizational core of Odra Desha, radiating across peninsular India across three millennia.',
    historical_forts_and_landmarks: [
      'Barabati Citadel of Cuttack (9-Story Sandstone Fortress)',
      'Meghanada Pacheri (Puri Temple Protective Rampart)',
      'Konark Sun Temple',
      'Hathigumpha & Udayagiri-Khandagiri Caves'
    ],
    sacred_centers: ['Srikshetra Jagannatha Temple (Puri)', 'Lingaraja Temple (Bhubaneswar)', 'Biraja Kshetra (Jajpur)'],
    regional_overview: {
      en: 'Odisha is the ancestral fountainhead of the entire diaspora. From the historic capital of Varanasi Kataka (modern Cuttack) situated on the Mahanadi, the Suryavamsha Gajapathis ruled an empire spanning from the Ganges to the Kaveri. All community branches—from Rajasthan to Tamil Nadu—trace their ancestral ethnonym back to ancient Odra Desha.',
      hi: 'ओडिशा संपूर्ण ओड / ओड्र समुदाय का मूल उद्गम स्थल है। महानदी तट पर स्थित कटक (वाराणसी कटक) की राजधानी से सूर्यवंशी गजपतियों ने गंगा से कावेरी तक साम्राज्य का संचालन किया। उत्तर से दक्षिण तक विस्तृत समस्त शाखाएं अपनी पहचान प्राचीन ओड्र देश से जोड़ती हैं।',
      te: 'ఒడిశా యావత్ ఓడ్ర-క్షత్రియ సమాజానికి మాతృభూమి. కటక్ రాజధానిగా గంగా నది నుండి కావేరి వరకు పాలించిన సూర్యవంశ గజపతుల మూల కేంద్రం.',
      kn: 'ಒಡಿಶಾದ ಕಟಕ್ ಮತ್ತು ಪುರಿ ಕ್ಷೇತ್ರವು ಸೂರ್ಯವಂಶಿ ಗಜಪತಿಗಳ ರಾಜಧಾನಿಯಾಗಿದ್ದು, ಸಮಸ್ತ ಓಡ್ರ ಸಮಾಜದ ಮೂಲ ನೆಲೆಯಾಗಿದೆ.',
      ta: 'கட்டக் மற்றும் புரி ஆகியவற்றை மையமாகக் கொண்ட ஒடிசா மாநிலமே அனைத்து ஒட்ர சமூகங்களின் ஆதி பிறப்பிடம்.',
      mr: 'महानदी काठचे कटक हे सूर्यवंशी गजपतींचे साम्राज्य केंद्र आणि समस्त ओड्र समाजाचे मूळ उगमस्थान आहे.',
      or: 'ଓଡ଼ିଶାର କଟକ ଓ ପୁରୀ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଙ୍କ ରାଜଧାନୀ ଥିଲା ଏବଂ ସମଗ୍ର ଓଡ଼-କ୍ଷତ୍ରିୟ ସମାଜର ଆଦି ଜନ୍ମଭୂମି।',
      bn: 'উড়িষ্যা হলো সমগ্র ওড সমাজের আদি মাতৃভূমি। কটক ও পুরী থেকেই সূর্যবংশীয় সাম্রাজ্যের বিকাশ ঘটেছিল।'
    }
  }
];

// ---------------------------------------------------------------------------
// 4. HISTORICAL MONOGRAPH TREATISE
// ---------------------------------------------------------------------------
export const HISTORICAL_MONOGRAPH_SECTIONS: HistoricalMonographSection[] = [
  {
    id: 'mono_part_1_primordial',
    order: 1,
    section_title: {
      en: 'Part 1: Primordial Foundations in the Solar Race (Suryavamsha)',
      hi: 'भाग 1: सूर्यवंश की आदि परंपरा एवं पौराणिक मूल',
      te: 'భాగం 1: సూర్యవంశ ప్రాచీన మూలాలు మరియు పౌరాణిక ప్రస్థానం',
      kn: 'ಭಾಗ ೧: ಸೂರ್ಯವಂಶದ ಪೌರಾಣಿಕ ಮೂಲ ಮತ್ತು ಆಧಾರಗಳು',
      ta: 'பகுதி 1: சூரியவம்சத்தின் ஆதி தோற்றம் மற்றும் புராண மரபுகள்',
      mr: 'भाग १: सूर्यवंशाचे मूळ आणि पौराणिक वारसा',
      or: 'ଭାଗ ୧: ସୂର୍ଯ୍ୟବଂଶର ପ୍ରାଚୀନ ମୂଳଭିତ୍ତି ଓ ପୌରାଣିକ ପରମ୍ପରା',
      bn: 'অধ্যায় ১: সূর্যবংশের পৌরাণিক উৎস ও আদি ঐতিহ্য'
    },
    content: {
      en: `Across classical Sanskrit literature, local family chronicles (Vamsavalis), and community oral traditions, the Oad-Rajput and Od-Kshatriya lineages trace their ancestral origin to the ancient Suryavamsha (Solar Dynasty) of Ayodhya.
1. Samrat Sagara: Renowned in the Valmiki Ramayana (Balakanda) and Vishnu Purana as the Chakravartin king who performed 99 Ashvamedha sacrifices. When his sixty thousand sons excavated the earth down to the waters in search of the sacrificial horse, they established the primordial ancestral memory of monumental earth-excavation.
2. Maharshi Raja Bhagiratha: Great-grandson of Sagara, whose unmatched tapasya brought Ganga from the heavens to the mortal realm. Community members venerate Bhagiratha as the divine architect of water harvesting.
3. Maryada Purushottama Sri Rama: The divine exemplar of righteousness (Dharma) whose golden sun banner is retained as the royal crest of all Suryavamsha lineages.`,
      hi: `संस्कृत साहित्य, पारंपरिक वंशावलियों और लोकस्मृति में ओड-राजपूत एवं ओड-क्षत्रिय समुदाय अपना मूल अयोध्या के सूर्यवंश से जोड़ता है। चक्रवर्ती सम्राट सगर के महासागर खनन और महर्षि भगीरथ के गंगावतरण से लेकर मर्यादा पुरुषोत्तम श्री राम के क्षत्रिय धर्म तक, यह परंपरा शौर्य और लोक-कल्याणकारी जल-अभियांत्रिकी का समन्वय है।`,
      te: 'ప్రాచీన సూర్యవంశ చక్రవర్తులు సగరుడు, భగీరథుడు మరియు శ్రీరామచంద్రుల పరంపరలో ఉద్భవించిన ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ మరియు వడ్డెరాజుల వంశాలు ధర్మ రక్షణకు, జల నిర్మాణానికి ప్రతీకగా నిలిచాయి.',
      kn: 'ಸೂರ್ಯವಂಶದ ಸಾಮ್ರಾಟ್ ಸಗರ, ಮಹರ್ಷಿ ಭಗೀರಥ ಮತ್ತು ಶ್ರೀರಾಮನ ಆದರ್ಶಗಳು ಓಡ್-ಕ್ಷತ್ರಿಯ ಕುಲದ ಜಲ ಮತ್ತು ಕೋಟೆ ನಿರ್ಮಾಣದ ಪರಂಪರೆಗೆ ಆಧಾರವಾಗಿವೆ.',
      ta: 'அயோத்தியின் சாகரன், பகீரதன் மற்றும் ஸ்ரீராமர் ஆகியோரின் சூரியவம்ச மரபில் தோன்றிய பெருமை வாய்ந்தது இச்சமூகம்.',
      mr: 'सम्राट सगर आणि भगीरथांच्या जलक्रांतीचा वारसा चालवणारा हा सूर्यवंशी क्षत्रिय समाज श्रीरामांना आपले कुलदैवत मानतो.',
      or: 'ସମ୍ରାଟ ସଗର, ରାଜର୍ଷି ଭଗୀରଥ ଓ ପ୍ରଭୁ ଶ୍ରୀରାମଙ୍କ ସୂର୍ଯ୍ୟବଂଶୀ ପରମ୍ପରାରୁ ଓଡ଼-କ୍ଷତ୍ରିୟ ସମାଜର ଉତ୍ପତ୍ତି।',
      bn: 'সম্রাট সগর, ভগীরথ ও শ্রীরামচন্দ্রের পৌরাণিক সূর্যবংশ থেকেই ওড-ক্ষত্রিয় সমাজের আদি ঐতিহ্যের বিকাশ।'
    },
    key_points: [
      'Valmiki Ramayana Balakanda lineages linking Sagara, Bhagiratha, and Rama',
      'Oceanic excavation by Sagara-putras as primordial civil-engineering memory',
      'Bhagiratha Prayathna as timeless patron ideal of water canalization'
    ]
  },
  {
    id: 'mono_part_2_kharavela',
    order: 2,
    section_title: {
      en: 'Part 2: Emperor Kharavela and Ancient Kalinga-Odra Epigraphy',
      hi: 'भाग 2: सम्राट खारवेल एवं प्राचीन कलिंग-ओड्र पुरालेख',
      te: 'భాగం 2: ఖారవేల చక్రవర్తి మరియు ప్రాచీన కళింగ-ఓడ్ర శాసన ఆధారాలు',
      kn: 'ಭಾಗ ೨: ಸಾಮ್ರಾಟ್ ಖಾರವೇಲ ಮತ್ತು ಪ್ರಾಚೀನ ಕಳಿಂಗ-ಓಡ್ರ ಶಾಸನಗಳು',
      ta: 'பகுதி 2: பேரரசர் காரவேலன் மற்றும் கலிங்க-ஒட்ர கல்வெட்டுகள்',
      mr: 'भाग २: सम्राट खारवेल आणि प्राचीन कलिंग-ओड्र शिलालेख',
      or: 'ଭାଗ ୨: ସମ୍ରାଟ ଖାରବେଳ ଓ ପ୍ରାଚୀନ କଳିଙ୍ଗ-ଓଡ଼୍ର ଶିଳାଲେଖ',
      bn: 'অধ্যায় ২: সম্রাট খারবেল ও প্রাচীন কলিঙ্গ-ওড্র শিলালিপি'
    },
    content: {
      en: `In the 2nd–1st century BCE, Emperor Kharavela of the Mahameghavahana (Chedi) dynasty ruled the Odra-Kalinga realm.
His monumental 17-line Hathigumpha inscription atop Udayagiri hill near Bhubaneswar records:
- In his 1st regnal year, repairing the city walls, gates, and embankments of Kalinganagari damaged by cyclone storms.
- In his 5th regnal year, extending the Tiwasachala canal excavated by King Nanda 300 years earlier straight into his capital.
- Excavating residential caves on Udayagiri and Khandagiri for wandering ascetics.
This verified primary epigraphy establishes the deep historical antiquity of water-engineering and civic masonry in the Odra realm.`,
      hi: 'भुवनेश्वर के हाथीगुंफा अभिलेख से प्रमाणित होता है कि सम्राट खारवेल ने कलिंगनगरी के दुर्गों की मरम्मत करवाई और 300 वर्ष पुरानी नंदराज नहर का विस्तार राजधानी तक किया, जो ओड्र स्थापत्य की ऐतिहासिक प्रामाणिकता सिद्ध करता है।',
      te: 'ఉదయగిరి హాథీగుంఫా శాసనం ద్వారా ఖారవేలుడు తుఫాను దెబ్బతిన్న కోట గోడలను పునరుద్ధరించడం మరియు నందరాజు కాలువను నగరంలోకి తీసుకురావడం చారిత్రకంగా నిరూపితమైంది.',
      kn: 'ಉದಯಗಿರಿಯ ಹಾಥೀಗುಂಫಾ ಶಾಸನವು ಖಾರವೇಲನ ಕೋಟೆ ದುರಸ್ತಿ ಮತ್ತು ಕಾಲುವೆ ವಿಸ್ತರಣೆಯ ಐತಿಹಾಸಿಕ ಸಾಕ್ಷಿಯಾಗಿದೆ.',
      ta: 'ஹாத்திகும்பா கல்வெட்டு பேரரசர் காரவேலனின் கால்வாய் விரிவாக்கம் மற்றும் கோட்டை அரண்களை உறுதிப்படுத்துகிறது.',
      mr: 'हाथीगुंफा शिलालेख हे सम्राट खारवेल यांच्या जलव्यवस्थापन आणि दुर्ग बांधणीचे ऐतिहासिक पुरावे आहेत.',
      or: 'ହାତୀଗୁମ୍ଫା ଅଭିଲେଖରୁ ପ୍ରମାଣିତ ହୁଏ ଯେ ସମ୍ରାଟ ଖାରବେଳ କେନାଲ୍ ଖନନ ଓ ଦୁର୍ଗ ନିର୍ମାଣ କରିଥିଲେ।',
      bn: 'হাতিগুম্ফা শিলালিপি সম্রাট খারবেলের খাল সম্প্রসারণ ও দুর্গ প্রাচীর সংস্কারের ঐতিহাসিক দলিল।'
    },
    key_points: [
      'Hathigumpha 17-line Prakrit Brahmi inscription atop Udayagiri hill',
      'Year 5 canal extension from Tiwasachala into Kalinganagari',
      'Synthesis of martial sovereignty and public water architecture'
    ]
  },
  {
    id: 'mono_part_3_synonyms',
    order: 3,
    section_title: {
      en: 'Part 3: Linguistic Evolution of Synonyms across Indian Regions',
      hi: 'भाग 3: भारतीय क्षेत्रों में पर्यायवाची संज्ञाओं का भाषाई विकास',
      te: 'భాగం 3: భారతీయ ప్రాంతాలలో సమానార్ధక పేర్ల పరిణామ క్రమం',
      kn: 'ಭಾಗ ೩: ಭಾರತದ ವಿವಿಧ ಪ್ರಾಂತ್ಯಗಳಲ್ಲಿ ಸಮಾನಾರ್ಥಕ ಹೆಸರುಗಳ ವಿಕಾಸ',
      ta: 'பகுதி 3: பாரத தேசத்தின் பல்வேறு பகுதிகளில் உருவான மாற்றுப் பெயர்கள்',
      mr: 'भाग ३: विविध प्रांतांमधील समानार्थी नामावलींचा भाषिक विकास',
      or: 'ଭାଗ ୩: ଭାରତର ବିଭିନ୍ନ ପ୍ରାନ୍ତରେ ଆଞ୍ଚଳିକ ପ୍ରତିଶବ୍ଦର କ୍ରମବିକାଶ',
      bn: 'অধ্যায় ৩: ভারতের বিভিন্ন অঞ্চলে আঞ্চলিক সমার্থক নামের বিবর্তন'
    },
    content: {
      en: `Over two millennia of geographical migration, the ancestral ethnonym Odra evolved into multiple phonological forms:
1. Od / Oad: The standard North-Western Hindi and Punjabi form.
2. Oad-Rajputh: Assertion of royal warrior status in Rajasthan, Sindh, and Punjab.
3. Odra / Audra: Classical Sanskrit designation in epigraphy and Puranic literature.
4. Od-Kshatriya: Formal modern designation honoring Vedic Kshatriya roots and Gajapathi links.
5. Odde / Vadde: Telugu phonetic shift where initial 'O' transitions to 'Vo' or 'Va'.
6. OddeRajulu / VaddeRajulu / Vadiyarajulu: Suffixing "Rajulu" (Kings/Rulers), commemorating military titles under the Gajapathi and Vijayanagara empires.
7. Waddar / Vaddar: Kannada and Marathi adaptation for master stone and reservoir excavators.
8. Oddar: Tamil adaptation in Kongu Nadu and the Kaveri basin.`,
      hi: 'प्राचीन संस्कृत "ओड्र" शब्द क्षेत्रीय बोलियों में परिवर्तित होकर उत्तर भारत में ओड/ओड-राजपूत, आंध्र में वड्डे/वड्डेराजुलु, महाराष्ट्र-कर्नाटक में वडार/वड्डार और तमिलनाडु में ओड्डार कहलाया।',
      te: 'సంస్కృత "ఓడ్ర" నామం ప్రాంతీయ మాండలికాలలో ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ, ఒడ్డే, వడ్డె, వడ్డెరాజులు, వడ్డార్ మరియు ఒడ్డార్‌గా రూపాంతరం చెందింది.',
      kn: 'ಸಂಸ್ಕೃತದ "ಓಡ್ರ" ಪದವು ಆಯಾ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಓಡ್-ರಜಪೂತ್, ಒಡ್ಡೇರಾಜುಲು, ವಡ್ಡಾರ ಮತ್ತು ಒಡ್ಡರ್ ಎಂದು ರೂಪಾಂತರಗೊಂಡಿತು.',
      ta: 'ஒட்ர என்ற பழந்தமிழ்ச் சொல் அந்தந்த பிராந்தியங்களில் ஓட், வத்தேராஜுலு, வட்டார் மற்றும் ஒட்டார் என மருவியது.',
      mr: 'ओड्र या मूळ शब्दापासून ओड-राजपूत, वड्डेराजुलू, वडार आणि ओड्डार अशी विविध प्रादेशिक नावे रूढ झाली.',
      or: 'ସଂସ୍କୃତ "ଓଡ଼୍ର" ଶବ୍ଦରୁ ଓଡ଼, ଓଡ଼-ରାଜପୁତ, ଭଡ୍ଡେରାଜୁଲୁ, ୱଡ୍ଡାର ଓ ଓଡ୍ଡାର ଆଦି ପ୍ରତିଶବ୍ଦର ସୃଷ୍ଟି।',
      bn: 'মূল সংস্কৃত "ওড্র" শব্দ থেকেই ওড-রাজপুত, বদ্দেরাজুলু, বড্ডার এবং ওড্ডার নামের উৎপত্তি।'
    },
    key_points: [
      'Prakrit Odda transitioning to Telugu Vo/Va labials',
      'Addition of royal titles Rajulu and Rajput signifying martial nobility',
      'All 8 regional designations sharing single civilizational root'
    ]
  },
  {
    id: 'mono_part_4_jasma_siddharama',
    order: 4,
    section_title: {
      en: 'Part 4: Sacred Protectors: Goddess Jasma Odan & Shivayogi Siddharameshwara',
      hi: 'भाग 4: पवित्र संरक्षक: माता जस्मा ओडन एवं शिवयोगी सिद्धरामेश्वर',
      te: 'భాగం 4: పవిత్ర సంరక్షకులు: మాతా జస్మా దేవి మరియు శివయోగి సిద్ధరామేశ్వరుడు',
      kn: 'ಭಾಗ ೪: ಪರಮ ಪೂಜ್ಯರು: ಮಾತಾ ಜಸ್ಮಾ ದೇವಿ ಮತ್ತು ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರ',
      ta: 'பகுதி 4: புனித வழிகாட்டிகள்: மாதா ஜஸ்மா தேவி மற்றும் சிவயோகி சித்தராமேஸ்வரர்',
      mr: 'भाग ४: पावन कुलदैवते: माता जस्मा ओडण आणि शिवयोगी सिद्धरामेश्वर',
      or: 'ଭାଗ ୪: ପବିତ୍ର ରକ୍ଷକ: ମାତା ଜସ୍ମା ଦେବୀ ଓ ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର',
      bn: 'অধ্যায় ৪: আধ্যাত্মিক পথপ্রদর্শক: মাতা জসমা দেবী ও শিবযোগী সিদ্ধরামেশ্বর'
    },
    content: {
      en: `The cultural memory of the community is anchored by two towering figures:
1. Goddess Jasma Odan (Jasma Devi): In 11th–12th century Patan, Gujarat, Jasma resisted the illicit overtures of Solanki King Siddharaja Jaisinh during the excavation of the Sahastralinga reservoir. Immolating herself to preserve her marital chastity and Kshatriya dignity, she became the supreme Kuladevi of the Oad community.
2. Shivayogi Siddharameshwara of Solapur: In 12th-century Maharashtra and Karnataka, this revered Sharana mystic constructed the massive Solapur lake and 68 Shivalingas working alongside Waddar artisans. Today, the community carries the sacred Nandi-dhwaja during the annual Gadda Yatra in his honor.`,
      hi: 'माता जस्मा देवी ने पाटन के सहस्रलिंग तालाब निर्माण के समय अपने पातिव्रत्य और क्षत्रिय सम्मान की रक्षा हेतु आत्मोत्सर्ग किया। वहीं 12वीं सदी में सोलापुर के शिवयोगी सिद्धरामेश्वर ने वडार समाज के साथ मिलकर ऐतिहासिक तालाब और 68 शिवलिंग स्थापित किए।',
      te: 'పటాన్‌లో ఆత్మగౌరవ రక్షణకై బలిదానమిచ్చిన మాతా జస్మా దేవి మరియు సోలాపూర్‌లో వడ్డార్లతో కలసి మహాతటాకాన్ని నిర్మించిన సిద్ధరామేశ్వరుడు సమాజపు ఆరాధ్య దైవాలు.',
      kn: 'ಪಾಠಣದ ಸಹಸ್ರಲಿಂಗ ಕೆರೆಯ ಬಳಿ ಆತ್ಮಾರ್ಪಣೆ ಮಾಡಿದ ಮಾತಾ ಜಸ್ಮಾ ದೇವಿ ಮತ್ತು ಸೋಲಾಪುರದ ಕೆರೆ ನಿರ್ಮಿಸಿದ ಸಿದ್ಧರಾಮೇಶ್ವರರು ಸಮಾಜದ ಪರಮ ಪೂಜ್ಯ ದೈವಗಳು.',
      ta: 'பாடன் ஏரியில் தன் கற்பைக் காத்த ஜஸ்மா தேவியும், சோலாப்பூர் ஏரியை அமைத்த சித்தராமேஸ்வரரும் சமூகத்தின் காவல் தெய்வங்கள்.',
      mr: 'पातिव्रत्यासाठी आत्मसमर्पण करणाऱ्या माता जस्मा देवी आणि सोलापूरचे ग्रामदैवत सिद्धरामेश्वर हे या समाजाचे पूज्य कुलदैवत आहेत.',
      or: 'ପାଟଣର ମାତା ଜସ୍ମା ଦେବୀ ଏବଂ ସୋଲାପୁରର ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର ସମୁଦାୟର ପରମ ଆରାଧ୍ୟ।',
      bn: 'পাটনের মাতা জসমা দেবী এবং সোলাপুরের শিবযোগী সিদ্ধরামেশ্বর এই সমাজের চিরন্তন আধ্যাত্মিক প্রেরণা।'
    },
    key_points: [
      'Patan Sahastralinga Talav history and Jasma Odan Bhavai folk plays',
      '12th-century Solapur lake excavation and 68 Shivalingas',
      'Annual Makara Sankranti Gadda Yatra in Solapur'
    ]
  },
  {
    id: 'mono_part_5_gajapathi_diaspora',
    order: 5,
    section_title: {
      en: 'Part 5: Gajapathi Imperial Corridors & Southern Migration',
      hi: 'भाग 5: गजपति साम्राज्य के अभियान एवं दक्षिणी प्रवास',
      te: 'భాగం 5: గజపతి సామ్రాజ్య దండయాత్రలు మరియు దక్షిణ ప్రాంత స్థిరనివాసాలు',
      kn: 'ಭಾಗ ೫: ಗಜಪತಿ ಸೈನ್ಯದ ದಂಡಯಾತ್ರೆಗಳು ಮತ್ತು ದಕ್ಷಿಣದ ವಲಸೆ',
      ta: 'பகுதி 5: கஜபதி சாம்ராஜ்ய படையெடுப்புகளும் தென்னக குடியேற்றமும்',
      mr: 'भाग ५: गजपतींचे दक्षिणेतील विजय आणि स्थलांतराचा इतिहास',
      or: 'ଭାଗ ୫: ଗଜପତି ସାମ୍ରାଜ୍ୟର ଦକ୍ଷିଣ ଅଭିଯାନ ଓ ବସବାସ',
      bn: 'অধ্যায় ৫: গজপতি সাম্রাজ্যের দক্ষিণ ভারত অভিযান ও বসতি স্থাপন'
    },
    content: {
      en: `Under Emperor Kapilendra Deva Gajapathi (1434–1466 CE) and his crown prince Kumara Hamvira Deva, the Gajapathi Empire reached the Kaveri river basin:
- 1454 CE: Capture of Kondavidu and Udayagiri, stationing OddeRajulu garrison commanders.
- 1464 CE: Epigraphs of Kumara Hamvira Deva at Srirangam, Munnur, and Tiruvarur in Tamil country.
- 1515–1519 CE: Treaty between Prataparudra Deva and Krishna Deva Raya, solidifying settlements of Odde commanders along the Krishna river.
These military campaigns formed the historical foundation for the modern presence of OddeRajulu, Vadde, and Oddar communities in Andhra, Karnataka, and Tamil Nadu.`,
      hi: '15वीं शताब्दी में महाराजा कपिलेंद्र देव और हम्मीर देव गजपति के दक्षिण विजय अभियानों के दौरान कोंडावीडु, उदयगिरि और कावेरी तट (श्रीरंगम) पर गजपति सेनापतियों की छावनियां स्थापित हुईं, जो वर्तमान ओड्डेराजुलु और ओड्डार समाज के विस्तार का मूल आधार हैं।',
      te: '15వ శతాబ్దంలో కపిలేంద్ర దేవ, కుమార హంవీర దేవ గజపతుల కావేరీ విజయయాత్రల ద్వారా కొండవీడు, ఉదయగిరి, శ్రీరంగం పరిసరాలలో ఒడ్డేరాజుల సైనిక స్థావరాలు ఏర్పడ్డాయి.',
      kn: 'ಕಪಿಲೇಂದ್ರ ದೇವ ಮತ್ತು ಹಂವೀರ ದೇವ ಗಜಪತಿಯ ದಕ್ಷಿಣ ಭಾರತ ವಿಜಯಗಳ ಮೂಲಕ ಕೊಂಡವೀಡು ಮತ್ತು ಶ್ರೀರಂಗಂ ತೀರದಲ್ಲಿ ಒಡ್ಡೇರಾಜುಲು ವಂಶಸ್ಥರು ನೆಲೆಸಿದರು.',
      ta: 'கபிலேந்திர தேவர் மற்றும் ஹம்வீர தேவரின் ஸ்ரீரங்கம் வரையிலான படையெடுப்புகள் தென்னகத்தில் ஒட்டார் சமூகத்தினர் குடியேற வழிகோலியது.',
      mr: '१५ व्या शतकात कपिलेंद्र देव आणि हम्मीर देव यांच्या दक्षिण दिग्विजयामुळे कोंडावीडु ते श्रीरंगमपर्यंत या समाजाचे ऐतिहासिक वास्तव्य निर्माण झाले.',
      or: 'ପଞ୍ଚଦଶ ଶତାବ୍ଦୀରେ କପିଳେନ୍ଦ୍ର ଦେବ ଓ ହମ୍ବୀର ଦେବଙ୍କ ଦକ୍ଷିଣ ବିଜୟ ଯୋଗୁଁ କୋଣ୍ଡାଭିଡୁରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ଓଡ଼ିଆରାଜୁ ବସତି ସ୍ଥାପିତ ହୋଇଥିଲା।',
      bn: 'পঞ্চদশ শতাব্দীতে কপিলেন্দ্র দেব ও হাম্বীর দেবের দক্ষিণ ভারত অভিযানের ফলেই অন্ধ্র ও তামিলনাড়ুতে এই সমাজের বসতি স্থাপিত হয়।'
    },
    key_points: [
      'Srirangam Inscription of 1464 CE by Kumara Hamvira Deva',
      'Garrison forts at Kondavidu, Bellamkonda, and Udayagiri',
      'Enduring title OddeRajulu reflecting Gajapathi military commissions'
    ]
  },
  {
    id: 'mono_part_6_geographical_map',
    order: 6,
    section_title: {
      en: 'Part 6: Pan-Indian Geographic Synthesis & Modern Heritage',
      hi: 'भाग 6: अखिल भारतीय भौगोलिक समन्वय एवं आधुनिक विरासत',
      te: 'భాగం 6: అఖిల భారత భౌగోళిక విస్తరణ మరియు ఆధునిక వారసత్వం',
      kn: 'ಭಾಗ ೬: ಅಖಿಲ ಭಾರತ ಭೌಗೋಳಿಕ ಹರಡುವಿಕೆ ಮತ್ತು ಆಧುನಿಕ ಪರಂಪರೆ',
      ta: 'பகுதி 6: அகில இந்திய புவியியல் பரவல் மற்றும் நவீன மரபு',
      mr: 'भाग ६: अखिल भारतीय भौगोलिक विस्तार आणि आधुनिक वारसा',
      or: 'ଭାଗ ୬: ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ସମନ୍ୱୟ ଓ ଆଧୁନିକ ଐତିହ୍ୟ',
      bn: 'অধ্যায় ৬: সর্বভারতীয় ভৌগোলিক মেলবন্ধন ও আধুনিক ঐতিহ্য'
    },
    content: {
      en: `Today, the Oad-Rajput, Od-Kshatriya, and allied communities form an unbroken cultural arch spanning eight major geographic corridors:
- Rajasthan, Sindh & Punjab: Oad-Rajput fort architects and guardians.
- Gujarat: Custodians of Mata Jasma Devi and reservoir architecture.
- Maharashtra: Waddar builders honoring Siddharameshwar and Maratha heritage.
- Karnataka: Vaddar artisans maintaining ancient Chalukya-Gajapathi masonry traditions.
- Andhra Pradesh & Telangana: OddeRajulu and VaddeRajulu commanders of coastal and Rayalaseema forts.
- Tamil Nadu: Oddar communities of the Kaveri basin.
- Odisha: The ancestral motherland of Odra Desha.
United by solar ancestry, engineering genius, and unyielding honor, this community continues to preserve its timeless historical legacy.`,
      hi: 'आज राजस्थान के ओड-राजपूतों से लेकर गुजरात, महाराष्ट्र के वडार, कर्नाटक के वड्डार, आंध्र-तेलंगाना के वड्डेराजुलु, तमिलनाडु के ओड्डार और ओडिशा के ओड-क्षत्रियों तक—यह समाज सूर्यवंशी गौरव, स्थापत्य प्रतिभा और अटूट स्वाभिमान की साझा डोर से बंधा है।',
      te: 'రాజస్థాన్ నుండి ఒడిశా, తమిళనాడు వరకు విస్తరించిన ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ మరియు వడ్డెరాజుల సమాజాలు సూర్యవంశ క్షత్రియ శౌర్యం, జల నిర్మాణ నైపుణ్యంతో భారతదేశ చరిత్రలో చిరస్థాయిగా నిలిచాయి.',
      kn: 'ರಾಜಸ್ಥಾನದಿಂದ ತಮಿಳುನಾಡಿನವರೆಗೆ ಹರಡಿರುವ ಓಡ್-ರಜಪೂತ್, ವಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡ್ಡಾರ ಸಮಾಜಗಳು ಸೂರ್ಯವಂಶದ ಕ್ಷಾತ್ರ ತೇಜಸ್ಸು ಮತ್ತು ಜಲ ನಿರ್ಮಾಣ ಕಾಯಕದಿಂದ ಭಾರತದ ಇತಿಹಾಸವನ್ನು ಬೆಳಗಿಸಿವೆ.',
      ta: 'ராஜஸ்தான் முதல் தமிழ்நாடு வரை பரவியுள்ள சத்திரிய சமூகத்தினர் சூரியவம்ச பெருமையையும் நீர் மேலாண்மை மரபையும் கட்டிக் காத்து வருகின்றனர்.',
      mr: 'राजस्थान ते ओरिसा आणि तमिळनाडूपर्यंत पसरलेला हा समाज सूर्यवंशी पराक्रम आणि स्थापत्य कलेचा गौरवशाली वारसा जपत आहे.',
      or: 'ରାଜସ୍ଥାନଠାରୁ ତାମିଲନାଡୁ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ ଓଡ଼-କ୍ଷତ୍ରିୟ ସମାଜ ସୂର୍ଯ୍ୟବଂଶୀ ଗୌରବ ଓ ଶିଳ୍ପ-ଚାତୁରୀର ଅନନ୍ୟ ପ୍ରତୀକ।',
      bn: 'রাজস্থান থেকে তামিলনাড়ু পর্যন্ত বিস্তৃত ওড-ক্ষত্রিয় সমাজ সূর্যবংশীয় বীরত্ব ও নির্মাণ প্রকৌশলের এক অনন্য নিদর্শন।'
    },
    key_points: [
      'Trans-Indian cultural continuity linking all 8 language regions',
      'Integration of ancient vamsavali memory with verified epigraphy',
      'Living preservation through annual yatras, clan shrines, and community archives'
    ]
  },
  {
    id: 'mono_part_7_kolletikota',
    order: 7,
    section_title: {
      en: 'Part 7: Kolletikota Peddintlamma Thalli & The Aquatic Fortress of Kolleti Sarasu (Kolleru Lake)',
      hi: 'भाग 7: कोल्लेतिकोटा पेद्दिंटलम्मा तल्ली एवं कोल्लेरु झील का ऐतिहासिक जलदुर्ग',
      te: 'భాగం 7: కొల్లేటికోట పెద్దింట్లమ్మ తల్లి మరియు కొల్లేటి సరస్సు చారిత్రక జలదుర్గం',
      kn: 'ಭಾಗ ೭: ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ ಮತ್ತು ಕೊಲ್ಲೇರು ಸರೋವರದ ಜಲದುರ್ಗ',
      ta: 'பகுதி 7: கொல்லேட்டிகோட்டை பெத்திண்ட்லம்மா தாயும் கொல்லேறு ஏரி நீர் அரணும்',
      mr: 'भाग ७: कोल्लेतिकोटा पेद्दिंटलम्मा माता आणि कोल्लेरू सरोवराचा जलदुर्ग',
      or: 'ଭାଗ ୭: କୋଲ୍ଲେତିକୋଟା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ଠାକୁରାଣୀ ଓ କୋଲ୍ଲେରୁ ହ୍ରଦର ଐତିହାସିକ ଜଳଦୁର୍ଗ',
      bn: 'অধ্যায় ৭: কোল্লেতিকোটা পেদ্দিন্টলাম্মা মাতা ও কোল্লেরু হ্রদের ঐতিহাসিক জলদুর্গ'
    },
    content: {
      en: `Kolleti Sarasu (Kolleru Lake), the historic freshwater lake nestled between the Krishna and Godavari deltas in Andhra Pradesh, served for centuries as an impregnable water defense basin. Within this lake lies the historic island fortress of Kolletikota (Kolleti Kota).
1. Imperial Military Garrison: During the 15th-century southern expeditions of Gajapathi Emperor Kapilendra Deva and his son Kumara Hamvira Deva, Suryavamsha Odiyaraju and allied Kshatriya warriors manned this island water-citadel (Jala Durga) to safeguard coastal Andhra against Bahmani and coastal raids. Native boat navigators alone knew the secret channels through the labyrinthine reeds.
2. Divine Protector Sri Peddintlamma Thalli: The defenders and royal houses consecrated Sri Peddintlamma Thalli ("Mother of the Grand Royal House") as the supreme guardian of the fortress. Historical accounts and Kaifiyats describe how the goddess protected the garrison amidst misty lake vapors, bestowing strategic victories to the warrior defenders.
3. Sacred Shakthi-Shiva Concord: Alongside Peddintlamma stands the ancient Gokarneshwara Swamy Shiva temple. The annual Peddintlamma Jatara (Theertham) during Phalguna Shuddha Purnima draws pilgrims and community members by the hundreds of thousands across water routes to honor this unbroken warrior-mother heritage.`,
      hi: 'आंध्र प्रदेश की कृष्णा-गोदावरी डेल्टा में स्थित कोल्लेरु झील (कोल्लेति सरसु) प्राचीन काल से एक अभेद्य जलदुर्ग (जल-खाई) रही है। 15वीं सदी में गजपति सम्राट कपिलेंद्र देव और हम्मीर देव के दक्षिण अभियानों के समय ओडियाराजु/क्षत्रिय योद्धाओं ने कोल्लेतिकोटा द्वीप को सामरिक जलदुर्ग बनाया। यहाँ की अधिष्ठात्री देवी श्री पेद्दिंटलम्मा तल्ली ने आक्रांताओं से दुर्ग की रक्षा की। प्रतिवर्ष फाल्गुन पूर्णिमा को आयोजित होने वाली पेद्दिंटलम्मा जतारा में लाखों श्रद्धालु नौकाओं से द्वीप पर पहुंचकर दर्शन करते हैं।',
      te: 'ఆంధ్రప్రదేశ్‌లోని కృష్ణా-గోదావరి డెల్టాల నడుమ విస్తరించిన కొల్లేటి సరస్సు (కొల్లేరు) ప్రాచీన కాలం నుండి అద్భుతమైన సహజ జలదుర్గంగా విలసిల్లింది. 15వ శతాబ్దంలో కపిలేంద్ర దేవ గజపతి, కుమార హంవీర దేవుల దక్షిణ దండయాత్రల సమయంలో సూర్యవంశ ఒడ్డేరాజులు, క్షత్రియ వీరులు కొల్లేటికోట ద్వీపంలో స్థావరాలు ఏర్పాటు చేసుకుని కోస్తా ఆంధ్రను రక్షించారు. కొల్లేటికోట పెద్దింట్లమ్మ తల్లిని తమ ఆరాధ్య కులదేవతగా పూజించి శత్రువులపై విజయాలు సాధించారు. కొల్లేటికోటలో వెలసిన గోకర్ణేశ్వర స్వామి మరియు పెద్దింట్లమ్మ అమ్మవారి వార్షిక ఫాల్గుణ పౌర్ణమి జాతర నేటికీ అత్యంత వైభవంగా జరుగుతుంది.',
      kn: 'ಕೃಷ್ಣಾ ಮತ್ತು ಗೋದಾವರಿ ನದಿಗಳ ನಡುವಿನ ಕೊಲ್ಲೇರು ಸರೋವರವು ನೈಸರ್ಗಿಕ ಜಲದುರ್ಗವಾಗಿತ್ತು. ಗಜಪತಿ ರಾಜರು ಮತ್ತು ಒಡ್ಡೇರಾಜುಲು ಕ್ಷತ್ರಿಯರು ಕೊಲ್ಲೇಟಿಕೋಟೆಯನ್ನು ಭದ್ರಪಡಿಸಿ, ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿಯನ್ನು ತಮ್ಮ ರಕ್ಷಕ ದೇವತೆಯಾಗಿ ಆರಾಧಿಸಿದರು. ಫಾಲ್ಗುಣ ಹುಣ್ಣಿಮೆಯಂದು ನಡೆಯುವ ವಾರ್ಷಿಕ ಜಾತ್ರೆ ಅಪಾರ ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.',
      ta: 'கிருஷ்ணா-கோதாவரி டெல்டாவின் கொல்லேறு ஏரியின் மத்தியில் உள்ள கொல்லேட்டிகோட்டை நீர் அரணை கஜபதி மன்னர்களும் ஒட்டியராஜு சத்திரியர்களும் காத்தனர். அவர்களின் காவல் தெய்வமான பெத்திண்ட்லம்மா தாயின் பெருமை இன்றும் போற்றப்படுகிறது.',
      mr: 'कोल्लेरू तलावाच्या मध्यभागी असलेला कोल्लेतिकोटा जलदुर्ग हा गजपती राजे आणि ओडियाराजू योद्ध्यांचा ऐतिहासिक बालेकिल्ला होता. येथील माता पेद्दिंटलम्मा ही सैनिकांचे आणि भक्तांचे रक्षण करणारी कुलस्वामिनी आहे.',
      or: 'କୋଲ୍ଲେରୁ ହ୍ରଦ ମଧ୍ୟସ୍ଥ କୋଲ୍ଲେତିକୋଟା ଜଳଦୁର୍ଗ ଗଜପତି ସେନାପତିଙ୍କ ପ୍ରମୁଖ ଘାଟି ଥିଲା। ମାତା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ଏହି ଦୁର୍ଗର ରକ୍ଷାକର୍ତ୍ତ୍ରୀ ଥିଲେ ଏବଂ ଆଜି ମଧ୍ୟ ଫାଲ୍ଗୁନ ପୂର୍ଣ୍ଣିମାରେ ତାଙ୍କର ବିରାଟ ଯାତ୍ରା ଅନୁଷ୍ଠିତ ହୁଏ।',
      bn: 'কোল্লেরু হ্রদের মাঝে কোল্লেতিকোটা দ্বীপ জলদুর্গ ছিল গজপতি সাম্রাজ্যের অন্যতম অপরাজেয় ঘাঁটি। মা পেদ্দিন্টলাম্মা এই দুর্গের রক্ষাকর্ত্রী দেবী এবং প্রতি বছর ফাল্গুন পূর্ণিমায় তাঁর বিখ্যাত মেলা অনুষ্ঠিত হয়।'
    },
    key_points: [
      'Kolletikota as medieval Jala Durga (Water Fortress) inside Kolleru Lake',
      'Gajapathi and Odiyaraju Kshatriya military garrison in coastal Andhra delta',
      'Sri Peddintlamma Thalli as divine warrior-mother guardian of the island citadel',
      'Annual Phalguna Shuddha Purnima Jatara and Gokarneshwara Swamy temple'
    ]
  },
  {
    id: 'mono_part_8_epigraphic_evolution',
    order: 8,
    section_title: {
      en: 'Part 8: Epigraphic Evolution of the Odra Identity: From Ancient Prakrit Edicts to Gajapathi Copper Plates',
      hi: 'भाग 8: ओड्र अस्मिता का पुरालेखीय विकास: प्राचीन प्राकृत अभिलेखों से मध्यकालीन गजपति ताम्रपत्रों तक',
      te: 'భాగం 8: ఓడ్ర అస్తిత్వ శాసన పరిణామ క్రమం: ప్రాచీన ప్రాకృత శిలాశాసనాల నుండి గజపతి తామ్రపత్రాల వరకు',
      kn: 'ಭಾಗ ೮: ಓಡ್ರ ಅಸ್ಮಿತೆಯ ಶಾಸನಬದ್ಧ ವಿಕಾಸ: ಪ್ರಾಚೀನ ಪ್ರಾಕೃತ ಶಾಸನಗಳಿಂದ ಗಜಪತಿ ತಾಮ್ರಪಟಗಳವರೆಗೆ',
      ta: 'பகுதி 8: ஒட்ர அடையாளத்தின் கல்வெட்டு பரிணாமம்: பண்டைய பிராகிருத சாசனங்கள் முதல் கஜபதி செப்பேடுகள் வரை',
      mr: 'भाग ८: ओड्र अस्मितेची पुराभिलेखीय उत्क्रांती: प्राचीन प्राकृत शिलालेखांपासून गजपती ताम्रपटांपर्यंत',
      or: 'ଭାଗ ୮: ଓଡ଼୍ର ଅସ୍ମିତାର ଶିଳାଲେଖୀୟ କ୍ରମବିକାଶ: ପ୍ରାଚୀନ ପ୍ରାକୃତ ଅଭିଲେଖରୁ ମଧ୍ୟଯୁଗୀୟ ଗଜପତି ତାମ୍ରଶାସନ',
      bn: 'অধ্যায় ৮: ওড্র পরিচয়ের শিলালিপিগত বিবর্তন: প্রাচীন প্রাকৃত অনুশাসন থেকে মধ্যযুগীয় গজপতি তাম্রশাসন'
    },
    content: {
      en: `The epigraphic evolution of the Odra identity represents an unbroken two-thousand-year record across lithic and metallic charters:
1. Classical Antiquity (1st Century BCE): Emperor Kharavela's 17-line Brahmi Hathigumpha inscription at Udayagiri chronicles canal extension and urban defense restoration in ancient Odra-Kalinga.
2. Early Medieval Charters (8th–11th Century CE): Copper-plate grants of the Bhauma-Kara and Somavamshi dynasties officially define "Odra Vishaya" and "Odra Desha" along the fertile Mahanadi river basin.
3. Eastern Ganga Transition (11th–15th Century CE): Epigraphs at Puri Jagannath Temple, Simhachalam, and Draksharama document the synthesis of Sanskrit with proto-regional vernacular scripts.
4. Imperial Gajapathi Charters (1434–1540 CE): Kapilendra Deva's bilingual Veligalani grant (1458 CE) recording imperial titles, the Lingaraja temple edict (1452 CE) abolishing the salt tax, and southern pillar grants at Srirangam and Kondavidu confirming OddeRajulu warrior commander garrisons.`,
      hi: 'भारतीय पुरालेखशास्त्र में ओड्र पहचान का दो सहस्राब्दियों का क्रमबद्ध इतिहास सुरक्षित है। सम्राट खारवेल के हाथीगुंफा अभिलेख (नहर निर्माण व दुर्ग जीर्णोद्धार), भौम-कर व सोमवंशी ताम्रपत्रों (ओड्र विषय सीमांकन), तथा सूर्यवंशी गजपतियों के वेलिगलनी ताम्रपत्र (1458 ई.) व श्रीरंगम स्तंभ लेखों से ओड्र और ओडियाराजु/वड्डेराजुलु क्षत्रियों का प्रत्यक्ष प्रमाण मिलता है।',
      te: 'భారతీయ శాసన శాస్త్రంలో ఓడ్ర అస్తిత్వానికి రెండు వేల సంవత్సరాల నిరంతర ఆధారాలున్నాయి. ఖారవేలుని హాథీగుంఫా శాసనం (కాలువ తవ్వకం, దుర్గ రక్షణ), భౌమ-కర మరియు సోమవంశ తామ్రపత్రాలు (ఓడ్ర విషయ సరిహద్దులు), మరియు కపిలేంద్ర గజపతి వెలిగలని తామ్రపత్రం (1458), శ్రీరంగం శాసనాలు ఒడ్డేరాజుల సైనిక నాయకత్వానికి తిరుగులేని సాక్ష్యాలు.',
      kn: 'ಖಾರವೇಲನ ಹಾಥೀಗುಂಫಾ ಶಾಸನದಿಂದ ಹಿಡಿದು ಸೂರ್ಯವಂಶಿ ಗಜಪತಿಗಳ ವೆಲಿಗಲನಿ, ಲಿಂಗರಾಜ ಮತ್ತು ಶ್ರೀರಂಗಂ ತಾಮ್ರಪಟಗಳವರೆಗೆ ಎರಡು ಸಾವಿರ ವರ್ಷಗಳ ಶಾಸನಗಳಲ್ಲಿ ಓಡ್ರ-ಒಡ್ಡೇರಾಜುಲು ಕ್ಷತ್ರಿಯರ ಇತಿಹಾಸವು ಅಚ್ಚಳಿಯದೆ ಉಳಿದುಕೊಂಡು ಬಂದಿದೆ.',
      ta: 'காரவேலனின் ஹாத்திகும்பா கல்வெட்டு முதல் கஜபதிகளின் வெலிகலானி மற்றும் ஸ்ரீரங்கம் செப்பேடுகள் வரை, இரண்டாயிரத்திற்கும் மேற்பட்ட ஆண்டுகளாக ஒட்ர மற்றும் ஒட்டியராஜு சத்திரியர்களின் வரலாறு கல்வெட்டுகளில் பதிவாகியுள்ளது.',
      mr: 'सम्राट खारवेलांच्या हाथीगुंफा शिलालेखापासून ते सूर्यवंशी गजपतींच्या वेलिगलनी ताम्रपटांपर्यंत, ओड्र अस्मिता व ओडियाराजू क्षत्रिय परंपरांचा दोन हजार वर्षांचा पुराभिलेखीय इतिहास सिद्ध होतो.',
      or: 'ସମ୍ରାଟ ଖାରବେଳଙ୍କ ହାତୀଗୁମ୍ଫା ପ୍ରାକୃତ ଅଭିଲେଖରୁ ଆରମ୍ଭ କରି କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ବେଳିଗାଲନୀ ତାମ୍ରଶାସନ ଓ ଶ୍ରୀରଙ୍ଗମ ସ୍ତମ୍ଭଲେଖ ପର୍ଯ୍ୟନ୍ତ ଓଡ଼୍ର ଅସ୍ମିତାର ଦୁଇ ହଜାର ବର୍ଷର ଗୌରବମୟ ପ୍ରମାଣ ବିଦ୍ୟମାନ।',
      bn: 'সম্রাট খারবেলের হাতিগুম্ফা শিলালিপি থেকে শুরু করে সূর্যবংশীয় গজপতিদের ভেলিগালানি ও শ্রীরঙ্গম তাম্রশাসন পর্যন্ত, ওড্র পরিচয় ও ওডিয়ারাজু ক্ষত্রিয় ঐতিহ্যের দুই সহস্রাব্দের নিরবচ্ছিন্ন দলিল সুরক্ষিত।'
    },
    key_points: [
      'Hathigumpha 17-line Prakrit lithic edict linking early Odra to civic canals and ramparts',
      'Bhauma-Kara and Somavamshi copper grants formally defining Odra Vishaya and Odra Desha',
      'Veligalani bilingual grant of 1458 CE conferring imperial Gajapathi titles',
      'Southern epigraphs at Srirangam and Kondavidu documenting OddeRajulu commanders'
    ]
  }
];

// ---------------------------------------------------------------------------
// HELPER QUERY FUNCTIONS FOR FRONTEND & BACKEND INTEGRATION
// ---------------------------------------------------------------------------

/**
 * Retrieves historical figure summary with fallback to English if requested language is absent.
 */
export function getFigureSummary(id: string, lang: LanguageCode = 'en'): HistoricalFigureSummary | undefined {
  return HISTORICAL_FIGURES.find(f => f.id === id);
}

/**
 * Retrieves localized name for a historical figure.
 */
export function getFigureLocalizedName(figure: HistoricalFigureSummary, lang: LanguageCode = 'en'): string {
  return figure.localized_name[lang] || figure.canonical_name;
}

/**
 * Retrieves localized summary for a historical figure.
 */
export function getFigureLocalizedSummary(figure: HistoricalFigureSummary, lang: LanguageCode = 'en'): string {
  return figure.summary[lang] || figure.summary.en;
}

/**
 * Retrieves community synonym by ID or name substring.
 */
export function getCommunitySynonym(query: string): CommunitySynonym | undefined {
  const q = query.toLowerCase();
  return COMMUNITY_SYNONYMS.find(
    s => s.id.toLowerCase() === q || s.title.toLowerCase().includes(q)
  );
}

/**
 * Returns all geographical spread regions formatted for a target language.
 */
export function getGeographicalRegions(lang: LanguageCode = 'en') {
  return GEOGRAPHICAL_SPREAD.map(region => ({
    ...region,
    display_name: region.localized_region[lang] || region.region_name,
    display_overview: region.regional_overview[lang] || region.regional_overview.en
  }));
}

/**
 * Returns full historical monograph sections localized to the selected language.
 */
export function getLocalizedMonograph(lang: LanguageCode = 'en') {
  return HISTORICAL_MONOGRAPH_SECTIONS.map(sec => ({
    id: sec.id,
    order: sec.order,
    title: sec.section_title[lang] || sec.section_title.en,
    content: sec.content[lang] || sec.content.en,
    key_points: sec.key_points
  }));
}
