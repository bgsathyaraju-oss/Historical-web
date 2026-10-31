import React, { useState } from 'react';
import { Compass, Landmark, Scroll, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';

interface OdraDeshaPageProps {
  onNavigate: (path: string) => void;
}

const ODRA_DEEP_DIVE: Record<string, {
  utkalaCore: string;
  kalingaCore: string;
  trikalingaCore: string;
  evolutionTitle: string;
  evolutionBadge: string;
  p1: string;
  p2: string;
  p3: string;
  mapsBtn: string;
  inscriptionsBtn: string;
}> = {
  en: {
    utkalaCore: 'Core Centers: Jajpur, Balasore coastal strip',
    kalingaCore: 'Core Centers: Kalinganagara, Srikakulam, Simhachalam',
    trikalingaCore: 'Core Centers: Kalahandi, Koraput, Sambalpur',
    evolutionTitle: 'Epigraphic Evolution of the Odra Identity',
    evolutionBadge: 'Verified Epigraphic & Classical Chronicle',
    p1: 'The earliest historical attestations of the Odra people occur in classical Indian literature, including the Mahabharata, the Natyashastra of Bharata Muni (which distinguishes the Odra-Magadhi style of theatre and dance), and the Puranas. Pliny the Elder in his 1st-century CE Naturalis Historia identifies the Oretes inhabiting the country near Mount Maleus.',
    p2: 'In 639 CE, the celebrated Chinese Buddhist pilgrim Xuanzang (Hiuen Tsang) traversed the realm of Wu-T’u (Odra). He recorded that the climate was temperate, the people tall and intrepid with dark complexions, and noted the famous port city of Charitra (Che-li-ta-lo) on the southeastern shore, from which merchant vessels departed for Sinhala (Sri Lanka) and the South Seas.',
    p3: 'By the 15th century, during the reign of Kapilendra Deva Gajapathi, "Odra-Rajya" had transformed into the sovereign core of a subcontinent-wide empire. Kapilendra Deva’s copper-plate grants, such as the Veligalani charter (1458 CE), refer explicitly to the administration of Odra officers across the southern military forts of Kondavidu, Vinukonda, and Udayagiri.',
    mapsBtn: 'Explore Historical Maps of Odra Desha',
    inscriptionsBtn: 'View Odra Inscription Records'
  },
  hi: {
    utkalaCore: 'प्रमुख केंद्र: जाजपुर, बालासोर तटीय पट्टी',
    kalingaCore: 'प्रमुख केंद्र: कलिंगनगर, श्रीकाकुलम, सिंहाचलम',
    trikalingaCore: 'प्रमुख केंद्र: कालाहांडी, कोरापुट, संबलपुर',
    evolutionTitle: 'ओड्र पहचान का अभिलेखीय एवं ऐतिहासिक विकास',
    evolutionBadge: 'प्रमाणित अभिलेखीय एवं शास्त्रीय इतिवृत्त',
    p1: 'ओड्र जनसमूह के प्राचीनतम ऐतिहासिक प्रमाण महाभारत, भरत मुनि के नाट्यशास्त्र (ओड्र-मागधी शैली) और पुराणों में मिलते हैं। प्रथम शताब्दी ईस्वी में रोमन इतिहासकार प्लिनी ने माउंट मालेउस के निकट ओरेतेस (ओड्र) निवासियों का उल्लेख किया है।',
    p2: '639 ईस्वी में प्रसिद्ध चीनी यात्री ह्वेनसांग (युआन च्वांग) ने वू-तू (ओड्र देश) की यात्रा की। उन्होंने यहां की समृद्ध कृषि, विद्या केंद्रों और दक्षिण-पूर्वी तट पर स्थित प्रसिद्ध बंदरगाह चरित्रपुर (चे-ली-ता-लो) का वर्णन किया, जहां से श्रीलंका और दक्षिण-पूर्व एशिया के लिए जहाज चलते थे।',
    p3: '15वीं शताब्दी में सम्राट कपिलेंद्र देव गजपति के शासनकाल में "ओड्र-राज्य" एक विशाल साम्राज्य का केंद्र बन गया। वेलिगलनी ताम्रपत्र (1458 ई.) सहित कई अभिलेखों में कोंडावीडु, विनुकोंडा और उदयगिरि के दुर्गों में ओड्र सेनापतियों के प्रशासन का स्पष्ट उल्लेख है।',
    mapsBtn: 'ओड्र देश के ऐतिहासिक मानचित्र देखें',
    inscriptionsBtn: 'ओड्र शिलालेख अभिलेख देखें'
  },
  te: {
    utkalaCore: 'ప్రధాన కేంద్రాలు: జాజ్‌పూర్, బాలాసోర్ తీర ప్రాంతం',
    kalingaCore: 'ప్రధాన కేంద్రాలు: కళింగనగరం, శ్రీకాకుళం, సింహాచలం',
    trikalingaCore: 'ప్రధాన కేంద్రాలు: కలహండి, కోరాపుట్, సంబల్‌పూర్',
    evolutionTitle: 'ఓడ్ర చారిత్రక గుర్తింపు యొక్క శాసన పరిణామ క్రమం',
    evolutionBadge: 'ధృవీకరించబడిన శాసన & చారిత్రక ఆధారం',
    p1: 'మహాభారతం, భరతముని నాట్యశాస్త్రం (ఓడ్ర-మాగధి శైలి) మరియు పురాణాలలో ఓడ్ర ప్రజల గురించిన ప్రాచీన చారిత్రక ఆధారాలు లభిస్తాయి. క్రీ.శ. 1వ శతాబ్దంలో ప్లినీ తన నేచురలిస్ హిస్టోరియాలో ఓరెటెస్ (ఓడ్రులు) ప్రజలను పేర్కొన్నారు.',
    p2: 'క్రీ.శ. 639లో ప్రముఖ చైనా బౌద్ధ యాత్రికుడు హ్యూయెన్ త్సాంగ్ వు-తు (ఓడ్ర దేశం) లో పర్యటించారు. సారవంతమైన భూమి, విద్యా కేంద్రాలు మరియు ఆగ్నేయ తీరంలోని ప్రసిద్ధ నౌకాశ్రయ నగరం చరిత్రపురం (చే-లి-తా-లో) గురించి ఆయన నమోదు చేశారు.',
    p3: '15వ శతాబ్దంలో కపిలేంద్ర దేవ గజపతి పాలనలో "ఓడ్ర-రాజ్యం" ఉపఖండ స్థాయి సామ్రాజ్యానికి కేంద్రబిందువుగా మారింది. వెలిగలని తామ్రశాసనం (1458 CE) వంటి శాసనాలు కొండవీడు, వినుకొండ, ఉదయగిరి దుర్గాలలో ఓడ్ర సేనానుల పాలనను స్పష్టంగా పేర్కొంటున్నాయి.',
    mapsBtn: 'ఓడ్ర దేశ చారిత్రక పటాలను చూడండి',
    inscriptionsBtn: 'ఓడ్ర శాసన రికార్డులను చూడండి'
  },
  kn: {
    utkalaCore: 'ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು: ಜಾಜ್‌ಪುರ, ಬಾಲಾಸೋರ್ ಕರಾವಳಿ',
    kalingaCore: 'ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು: ಕಳಿಂಗನಗರ, ಶ್ರೀಕಾಕುಳಂ, ಸಿಂಹಾಚಲಂ',
    trikalingaCore: 'ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು: ಕಲಹಂಡಿ, ಕೋರಾಪುಟ್, ಸಂಬಲ್‌ಪುರ',
    evolutionTitle: 'ಓಡ್ರ ಗುರುತಿನ ಶಾಸನಾತ್ಮಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ವಿಕಾಸ',
    evolutionBadge: 'ದೃಢೀಕೃತ ಶಾಸನ ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ದಾಖಲೆ',
    p1: 'ಮಹಾಭಾರತ, ಭರತಮುನಿಯ ನಾಟ್ಯಶಾಸ್ತ್ರ (ಓಡ್ರ-ಮಾಗಧಿ ಶೈಲಿ) ಮತ್ತು ಪುರಾಣಗಳಲ್ಲಿ ಓಡ್ರ ಜನರ ಪ್ರಾಚೀನ ಉಲ್ಲೇಖಗಳಿವೆ. ಕ್ರಿ.ಶ. 1ನೇ ಶತಮಾನದ ಪ್ಲಿನಿಯ ಬರಹಗಳಲ್ಲಿ ಓಡ್ರರ ಉಲ್ಲೇಖವಿದೆ.',
    p2: 'ಕ್ರಿ.ಶ. 639ರಲ್ಲಿ ಚೀನೀ ಯಾತ್ರಿಕ ಹ್ಯೂಯೆನ್ ತ್ಸಾಂಗ್ ಓಡ್ರ ದೇಶಕ್ಕೆ (ವು-ತು) ಭೇಟಿ ನೀಡಿ, ಇಲ್ಲಿನ ಸಮೃದ್ಧ ಕೃಷಿ, ವಿದ್ಯಾಕೇಂದ್ರಗಳು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಚರಿತ್ರಪುರ ಬಂದರಿನ ಬಗ್ಗೆ ದಾಖಲಿಸಿದ್ದಾನೆ.',
    p3: '15ನೇ ಶತಮಾನದಲ್ಲಿ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿಯ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಓಡ್ರ-ರಾಜ್ಯವು ಬೃಹತ್ ಸಾಮ್ರಾಜ್ಯದ ಕೇಂದ್ರವಾಯಿತು. ವೆಲಿಗಲನಿ ತಾಮ್ರಶಾಸನವು (1458 CE) ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ಕೋಟೆಗಳಲ್ಲಿ ಓಡ್ರ ಸೇನಾಪತಿಗಳ ಆಡಳಿತವನ್ನು ದೃಢಪಡಿಸುತ್ತದೆ.',
    mapsBtn: 'ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    inscriptionsBtn: 'ಓಡ್ರ ಶಾಸನ ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ'
  },
  ta: {
    utkalaCore: 'முக்கிய மையங்கள்: ஜாஜ்பூர், பாலாசோர் கடற்கரை',
    kalingaCore: 'முக்கிய மையங்கள்: கலிங்கநகரம், ஸ்ரீகாகுளம், சிம்மாசலம்',
    trikalingaCore: 'முக்கிய மையங்கள்: கலஹண்டி, கோராபுட், சம்பல்பூர்',
    evolutionTitle: 'ஒட்ர அடையாளத்தின் கல்வெட்டு மற்றும் வரலாற்று பரிணாமம்',
    evolutionBadge: 'சரிபார்க்கப்பட்ட கல்வெட்டு ஆவணம்',
    p1: 'மகாபாரதம், பரத முனிவரின் நாட்டிய சாஸ்திரம் மற்றும் புராணங்களில் ஒட்ர மக்களின் பண்டைய வரலாற்றுக் குறிப்புகள் உள்ளன. கி.பி. 1ஆம் நூற்றாண்டில் பிளினி ஒட்ர மக்களைக் குறிப்பிடுகிறார்.',
    p2: 'கி.பி. 639இல் சீனப் பயணி யுவான் சுவாங் ஒட்ர தேசத்திற்கு (வு-து) வருகை தந்து, அதன் வளமான வேளாண்மை மற்றும் சரித்திரபுரா துறைமுகத்தை விவரித்துள்ளார்.',
    p3: '15ஆம் நூற்றாண்டில் கபிலேந்திர தேவ கஜபதியின் ஆட்சியில் ஒட்ர ராஜ்யம் பேரரசின் மையமாக விளங்கியது. வெலிகலானி செப்பேடுகள் (கி.பி. 1458) கொண்டவீடு மற்றும் உதயகிரி கோட்டைகளில் ஒட்ர தளபதிகளின் நிர்வாகத்தைக் குறிப்பிடுகின்றன.',
    mapsBtn: 'ஒட்ர தேசத்தின் வரலாற்று வரைபடங்களைக் காண்க',
    inscriptionsBtn: 'ஒட்ர கல்வெட்டு ஆவணங்களைக் காண்க'
  },
  mr: {
    utkalaCore: 'प्रमुख केंद्रे: जाजपूर, बालासोर किनारपट्टी',
    kalingaCore: 'प्रमुख केंद्रे: कलिंगनगर, श्रीकाकुलम, सिंहाचलम',
    trikalingaCore: 'प्रमुख केंद्रे: कालाहांडी, कोरापुट, संबलपूर',
    evolutionTitle: 'ओड्र अस्मितेचा शिलालेखीय आणि ऐतिहासिक विकास',
    evolutionBadge: 'प्रमाणित शिलालेख आणि ऐतिहासिक नोंद',
    p1: 'महाभारत, भरतमुनींचे नाट्यशास्त्र आणि पुराणांमध्ये ओड्र लोकांचे प्राचीन उल्लेख आढळतात. पहिल्या शतकातील प्लिनीच्या ग्रंथातही ओड्र लोकांचा उल्लेख आहे.',
    p2: 'इ.स. ६३९ मध्ये चिनी प्रवासी ह्युएन त्सांगने ओड्र देशाला (वू-तू) भेट दिली आणि येथील समृद्ध शेती व चरित्रपूर बंदराचे वर्णन केले.',
    p3: '१५ व्या शतकात सम्राट कपिलेंद्र देव गजपतीच्या काळात ओड्र-राज्य एका महासाम्राज्याचे केंद्र बनले. वेलिगलनी ताम्रपटात (१४५८ ई.) कोंडावीडु आणि उदयगिरी किल्ल्यांवरील ओड्र अधिकाऱ्यांच्या प्रशासनाची नोंद आहे.',
    mapsBtn: 'ओड्र देशाचे ऐतिहासिक नकाशे पहा',
    inscriptionsBtn: 'ओड्र शिलालेख नोंदी पहा'
  },
  or: {
    utkalaCore: 'ମୁଖ୍ୟ କେନ୍ଦ୍ର: ଯାଜପୁର, ବାଲେଶ୍ୱର ଉପକୂଳ',
    kalingaCore: 'ମୁଖ୍ୟ କେନ୍ଦ୍ର: କଳିଙ୍ଗନଗର, ଶ୍ରୀକାକୁଲମ, ସିଂହାଚଳମ',
    trikalingaCore: 'ମୁଖ୍ୟ କେନ୍ଦ୍ର: କଳାହାଣ୍ଡି, କୋରାପୁଟ, ସମ୍ବଲପୁର',
    evolutionTitle: 'ଓଡ଼୍ର ପରିଚୟର ଶିଳାଲେଖ ଓ ଐତିହାସିକ କ୍ରମବିକାଶ',
    evolutionBadge: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ଶାସ୍ତ୍ରୀୟ ଇତିବୃତ୍ତ',
    p1: 'ମହାଭାରତ, ଭରତ ମୁନିଙ୍କ ନାଟ୍ୟଶାସ୍ତ୍ର (ଓଡ଼୍ର-ମାଗଧୀ ରୀତି) ଏବଂ ପୁରାଣରେ ଓଡ଼୍ର জাতির ପ୍ରାଚୀନତମ ଉଲ୍ଲେଖ ମିଳେ। ପ୍ରଥମ ଶତାବ୍ଦୀରେ ପ୍ଲିନି ଓଡ଼୍ର ଅଧିବାସୀଙ୍କ ବିଷୟରେ ଲେଖିଥିଲେ।',
    p2: '୬୩୯ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ଚୀନ ପରିବ୍ରାଜକ ହୁଏନସାଂ ଓଡ଼୍ର ଦେଶ (ୱୁ-ତୁ) ଭ୍ରମଣ କରି ଏখানକାର ସମୃଦ୍ଧ କୃଷି, ବିଦ୍ୟାକେନ୍ଦ୍ର ଓ ପ୍ରସିଦ୍ଧ ଚରିତ୍ରପୁର ବନ୍ଦର ବିଷୟରେ ବର୍ଣ୍ଣନା କରିଥିଲେ।',
    p3: 'ପଞ୍ଚଦଶ ଶତାବ୍ଦୀରେ ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତିଙ୍କ ଶାସନ କାଳରେ "ଓଡ଼୍ର-ରାଜ୍ୟ" ଏକ ବିଶାଳ ସାମ୍ରାଜ୍ୟର କେନ୍ଦ୍ରଭୂମି ପାଲଟିଥିଲା। ଭେଲିଗାଲାନି ତାମ୍ରଶାସନ (୧୪୫୮ ଖ୍ରୀ.) କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି ଦୁର୍ଗରେ ଓଡ଼୍ର ସେନାପତିଙ୍କ ଶାସନକୁ ପ୍ରମାଣିତ କରେ।',
    mapsBtn: 'ଓଡ଼୍ର ଦେଶର ଐତିହାସିକ ମାନଚିତ୍ର ଦେଖନ୍ତୁ',
    inscriptionsBtn: 'ଓଡ଼୍ର ଶିଳାଲେଖ ଅଭିଲେଖ ଦେଖନ୍ତୁ'
  },
  bn: {
    utkalaCore: 'প্রধান কেন্দ্র: জাজপুর, বালেশ্বর উপকূল',
    kalingaCore: 'প্রধান কেন্দ্র: কলিঙ্গনগর, শ্রীকাকুলাম, সিংহাচলম',
    trikalingaCore: 'প্রধান কেন্দ্র: কালাহান্ডি, কোরাপুট, সম্বলপুর',
    evolutionTitle: 'ওড্র পরিচয়ের শিলালিপি ও ঐতিহাসিক বিবর্তন',
    evolutionBadge: 'প্রমাণিত শিলালিপি ও ধ্রুপদী ইতিবৃত্ত',
    p1: 'মহাভারত, ভরত মুনির নাট্যশাস্ত্র (ওড্র-মাগধী রীতি) এবং পুরাণে ওড্র জনগোষ্ঠীর প্রাচীনতম উল্লেখ পাওয়া যায়। প্রথম শতাব্দীতে প্লিনি ওড্র অধিবাসীদের কথা উল্লেখ করেছেন।',
    p2: '৬৩৯ খ্রিস্টাব্দে চীনা পরিব্রাজক হিউয়েন সাং ওড্র দেশ (উ-তু) ভ্রমণ করে এখানকার সমৃদ্ধ কৃষি, শিক্ষাকেন্দ্র ও চরিত্রপুর বন্দরের বিবরণ দিয়েছেন।',
    p3: 'পঞ্চদশ শতাব্দীতে সম্রাট কপিলেন্দ্র দেব গজপতির শাসনকালে "ওড্র-রাজ্য" এক বিশাল সাম্রাজ্যের কেন্দ্রে পরিণত হয়। ভেলিগালানি তাম্রশাসনে (১৪৫৮ খ্রি.) কোন্ডাভিডু ও উদয়গিরি দুর্গে ওড্র সেনাপতিদের প্রশাসনের উল্লেখ রয়েছে।',
    mapsBtn: 'ওড্র দেশের ঐতিহাসিক মানচিত্র দেখুন',
    inscriptionsBtn: 'ওড্র শিলালিপি নথি দেখুন'
  }
};

export const OdraDeshaPage: React.FC<OdraDeshaPageProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();
  const loc = ODRA_DEEP_DIVE[language] || ODRA_DEEP_DIVE.en;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const regionalItems = [
    {
      id: 'region-odra',
      icon: Compass,
      iconStyle: 'bg-[#580014] text-[#d4af37]',
      title: t.odraDesha.odraTitle,
      desc: t.odraDesha.odraDesc,
      core: t.odraDesha.coreRulers,
      fullText: `${t.odraDesha.odraDesc}\n\n${loc.p3}`,
      sources: [
        { title: 'Xuanzang (Hiuen Tsang), Si-Yu-Ki: Buddhist Records of the Western World (639 CE)' },
        { title: 'Veligalani Copper Plate Grant of Kapilendra Deva (1458 CE)' }
      ]
    },
    {
      id: 'region-utkala',
      icon: Landmark,
      iconStyle: 'bg-stone-800 text-stone-300',
      title: t.odraDesha.utkalaTitle,
      desc: t.odraDesha.utkalaDesc,
      core: loc.utkalaCore,
      fullText: `${t.odraDesha.utkalaDesc}\n\n${loc.p1}`,
      sources: [
        { title: 'Bhauma-Kara & Somavamshi Copper-Plate Grants of Viraja (Jajpur)' },
        { title: 'N.K. Sahu, History of Orissa, Utkal University Press' }
      ]
    },
    {
      id: 'region-kalinga',
      icon: ShieldCheck,
      iconStyle: 'bg-stone-800 text-stone-300',
      title: t.odraDesha.kalingaTitle,
      desc: t.odraDesha.kalingaDesc,
      core: loc.kalingaCore,
      fullText: `${t.odraDesha.kalingaDesc}\n\n${loc.p2}`,
      sources: [
        { title: 'Hathigumpha Inscription of Emperor Kharavela (Udayagiri)' },
        { title: 'South Indian Inscriptions (SII), Simhachalam & Srikurmam Records' }
      ]
    },
    {
      id: 'region-trikalinga',
      icon: Scroll,
      iconStyle: 'bg-stone-800 text-stone-300',
      title: t.odraDesha.trikalingaTitle,
      desc: t.odraDesha.trikalingaDesc,
      core: loc.trikalingaCore,
      fullText: `${t.odraDesha.trikalingaDesc}\n\n${loc.p3}`,
      sources: [
        { title: 'Epigraphia Indica: Trikalingadhipati Royal Titles in Eastern Ganga & Gajapathi Charters' }
      ]
    }
  ];

  const modalItem: ContentDetailItem | null = (() => {
    if (!selectedId) return null;
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    if (selectedId === 'odra-epigraphic-evolution') {
      return {
        id: 'odra-epigraphic-evolution',
        title: loc.evolutionTitle,
        subtitle: t.odraDesha.title,
        badge: loc.evolutionBadge,
        era: '1st Century CE – 16th Century CE',
        imageUrl: `${base}hathigumpha_inscription.jpg`,
        imageLayout: 'banner',
        content: `${loc.p1}\n\n${loc.p2}\n\n${loc.p3}`,
        sources: [
          { title: 'Natyashastra of Bharata Muni & Mahabharata Bhishma Parva' },
          { title: 'Xuanzang, Si-Yu-Ki (639 CE)' },
          { title: 'Veligalani Copper-Plate Grant of Kapilendra Deva (1458 CE), Epigraphia Indica Vol. XXXIII' }
        ]
      };
    }
    const reg = regionalItems.find(r => r.id === selectedId);
    if (!reg) return null;
    const regionImgMap: Record<string, string> = {
      'region-odra': `${base}barabati_fort_gateway.jpg`,
      'region-utkala': `${base}puri_jagannatha_temple.jpg`,
      'region-kalinga': `${base}simhachalam_temple.jpg`,
      'region-trikalinga': `${base}odra_kalinga_map.jpg`
    };
    return {
      id: reg.id,
      title: reg.title,
      subtitle: t.odraDesha.regionsTitle,
      badge: t.odraDesha.badge,
      location: reg.core,
      imageUrl: regionImgMap[reg.id] || `${base}odra_kalinga_map.jpg`,
      imageLayout: 'banner',
      summary: reg.desc,
      content: reg.fullText,
      sources: reg.sources
    };
  })();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#170910] via-[#240e18] to-[#111624] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40">
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.odraDesha.badge}</span>
          </div>
          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            {t.odraDesha.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {t.odraDesha.subtitle}
          </p>
        </div>
      </div>

      {/* Nomenclature and Distinction of Historical Regions */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-royal-heading font-bold text-2xl sm:text-3xl text-[#fcedc7]">
            {t.odraDesha.regionsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-2xl mx-auto">
            {t.odraDesha.regionsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionalItems.map(reg => {
            const Icon = reg.icon;
            const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
            const regionImgMap: Record<string, string> = {
              'region-odra': `${base}barabati_fort_gateway.jpg`,
              'region-utkala': `${base}puri_jagannatha_temple.jpg`,
              'region-kalinga': `${base}simhachalam_temple.jpg`,
              'region-trikalinga': `${base}odra_kalinga_map.jpg`
            };
            const thumbUrl = regionImgMap[reg.id] || `${base}odra_kalinga_map.jpg`;
            return (
              <div
                key={reg.id}
                onClick={() => setSelectedId(reg.id)}
                className="rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738] overflow-hidden cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 w-full overflow-hidden relative bg-stone-950 border-b border-stone-800/80">
                    <img
                      src={thumbUrl}
                      alt={reg.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fallback) {
                          target.dataset.fallback = '1';
                          target.src = `${base}barabati_fort_gateway.jpg`;
                        }
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />
                    <div className={`absolute top-3 left-3 p-2 rounded-lg ${reg.iconStyle}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-5 pb-3 space-y-2.5">
                    <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#fae29c] transition-colors">
                      {reg.title}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {reg.desc}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 text-[11px] text-[#e8c872] font-semibold">
                  {reg.core}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Historical Narrative */}
      <div
        onClick={() => setSelectedId('odra-epigraphic-evolution')}
        className="rounded-3xl bg-[#111520] border border-[#c99738]/40 hover:border-[#c99738] overflow-hidden cursor-pointer transition-all group"
      >
        <div className="h-52 w-full overflow-hidden relative bg-stone-950 border-b border-stone-800/80">
          <img
            src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/hathigumpha_inscription.jpg`}
            alt={loc.evolutionTitle}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111520] via-transparent to-transparent" />
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {loc.evolutionTitle}
          </h3>
          <div className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed space-y-4">
            <p>{loc.p1}</p>
            <p>{loc.p2}</p>
            <p>{loc.p3}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
            <button
              onClick={e => {
                e.stopPropagation();
                onNavigate('/maps');
              }}
              className="text-xs font-semibold text-[#e8c872] hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <span>{loc.mapsBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                onNavigate('/inscriptions');
              }}
              className="text-xs font-semibold text-[#e8c872] hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <span>{loc.inscriptionsBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <ContentDetailModal item={modalItem} onClose={() => setSelectedId(null)} />
    </div>
  );
};


