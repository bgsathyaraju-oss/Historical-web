import React, { useState, useEffect } from 'react';
import { Compass, Landmark, Scroll, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { ArticleDetailView } from '../components/ArticleDetailView';
import { getArticleByIdOrSlug } from '../data/articlesRepository';

interface OdraDeshaPageProps {
  onNavigate: (path: string) => void;
  initialItemId?: string | null;
}

const OD_SERIES_IDS = [
  'region-odra',
  'region-utkala',
  'region-kalinga',
  'region-trikalinga',
  'odra-epigraphic-evolution'
] as const;

const OD_RECORD_ID_MAP: Record<string, string> = {
  'region-odra': 'OD-0001',
  'region-utkala': 'OD-0002',
  'region-kalinga': 'OD-0003',
  'region-trikalinga': 'OD-0004',
  'odra-epigraphic-evolution': 'OD-0005'
};

function resolveOdraRecordId(rawParam: string | null | undefined): string | null {
  if (!rawParam) return null;
  const lower = rawParam.trim().toLowerCase();
  if (
    lower === 'od-0001' ||
    lower === 'od_0001' ||
    lower === 'region-odra' ||
    lower === 'region_odra' ||
    lower === 'core-odra-desha-mahanadi-brahmani-baitarani-heartland'
  ) {
    return 'region-odra';
  }
  if (
    lower === 'od-0002' ||
    lower === 'od_0002' ||
    lower === 'region-utkala' ||
    lower === 'region_utkala' ||
    lower === 'utkala-mandala-northern-coastal-subarnarekha-viraja-corridor'
  ) {
    return 'region-utkala';
  }
  if (
    lower === 'od-0003' ||
    lower === 'od_0003' ||
    lower === 'region-kalinga' ||
    lower === 'region_kalinga' ||
    lower === 'kalinga-rashtra-mahendragiri-godavari-maritime-seaboard'
  ) {
    return 'region-kalinga';
  }
  if (
    lower === 'od-0004' ||
    lower === 'od_0004' ||
    lower === 'region-trikalinga' ||
    lower === 'region_trikalinga' ||
    lower === 'trikalinga-dakshina-kosala-western-highland-imperial-sovereignty'
  ) {
    return 'region-trikalinga';
  }
  if (
    lower === 'od-0005' ||
    lower === 'od_0005' ||
    lower === 'odra-epigraphic-evolution' ||
    lower === 'odra_epigraphic_evolution' ||
    lower === 'epigraphic-evolution-of-odra-identity-hathigumpha-to-kataka-edicts'
  ) {
    return 'odra-epigraphic-evolution';
  }
  return null;
}

const ODRA_DEEP_DIVE: Record<string, {
  utkalaCore: string;
  kalingaCore: string;
  trikalingaCore: string;
  trikalingaDeepText: string;
  evolutionTitle: string;
  evolutionBadge: string;
  p1: string;
  p2: string;
  p3: string;
  mapsBtn: string;
  inscriptionsBtn: string;
  readArticleBtn: (refId: string) => string;
}> = {
  en: {
    utkalaCore: 'Core Centers: Jajpur (Viraja Kshetra), Balasore, Mayurbhanj coastal & riverine corridor',
    kalingaCore: 'Core Centers: Kalinganagara (Mukhalingam), Mahendragiri, Srikakulam, Simhachalam',
    trikalingaCore: 'Core Centers: Kalahandi (Asurgarh), Koraput (Pushkari), Bolangir, Sonepur (Suvarnapura), Sambalpur',
    trikalingaDeepText: 'Attested from 537 CE in Eastern Ganga King Indravarman I’s Jirjingi Copper-Plate Grant and institutionalized by the Somavamshi, Kalachuri, and Imperial Ganga-Gajapathi emperors, the sovereign title "Trikalingadhipati" signified imperial paramountcy across the western highland diamond-and-elephant corridor of Dakshina Kosala and Trikalinga (Tel and upper Mahanadi valleys) united with coastal Kalinga and Utkala.',
    evolutionTitle: 'Epigraphic Evolution of the Odra Identity',
    evolutionBadge: 'Verified Epigraphic & Classical Chronicle',
    p1: 'The earliest historical attestations of the Odra people occur in classical Indian literature, including the Mahabharata, the Natyashastra of Bharata Muni (which distinguishes the Odra-Magadhi style of theatre and dance), and the Puranas. Pliny the Elder in his 1st-century CE Naturalis Historia identifies the Oretes inhabiting the country near Mount Maleus.',
    p2: 'In 639 CE, the celebrated Chinese Buddhist pilgrim Xuanzang (Hiuen Tsang) traversed the realm of Wu-T’u (Odra). He recorded that the climate was temperate, the people tall and intrepid with dark complexions, and noted the famous port city of Charitra (Che-li-ta-lo) on the southeastern shore, from which merchant vessels departed for Sinhala (Sri Lanka) and the South Seas.',
    p3: 'By the 15th century, during the reign of Kapilendra Deva Gajapathi, "Odra-Rajya" had transformed into the sovereign core of a subcontinent-wide empire. Kapilendra Deva’s copper-plate grants, such as the Veligalani charter (1458 CE), refer explicitly to the administration of Odra officers across the southern military forts of Kondavidu, Vinukonda, and Udayagiri.',
    mapsBtn: 'Explore Historical Maps of Odra Desha',
    inscriptionsBtn: 'View Odra Inscription Records',
    readArticleBtn: (refId) => `Read Complete Historical Article [${refId}]`
  },
  hi: {
    utkalaCore: 'प्रमुख केंद्र: जाजपुर (विरजा क्षेत्र), बालासोर, मयूरभंज तटीय पट्टी',
    kalingaCore: 'प्रमुख केंद्र: कलिंगनगर (मुखलिंगम), महेंद्रगिरि, श्रीकाकुलम, सिंहाचलम',
    trikalingaCore: 'प्रमुख केंद्र: कालाहांडी (असुरगढ़), कोरापुट (पुष्करी), बोलांगीर, सोनपुर, संबलपुर',
    trikalingaDeepText: '537 ईस्वी में पूर्वी गंग सम्राट इंद्रवर्मन प्रथम के जिरजिंगी ताम्रपत्र से प्रमाणित और सोमवंशी, कलचुरि तथा गंग-गजपति सम्राटों द्वारा धारण की गई "त्रिकलिंगाधिपति" की उपाधि दक्षिण कोसल और त्रिकलिंग (तेल एवं ऊपरी महानदी घाटी) के हीरा और गज-संपन्न पठारी दुर्गों सहित कलिंग और उत्कल की एकता का प्रतीक थी।',
    evolutionTitle: 'ओड्र पहचान का अभिलेखीय एवं ऐतिहासिक विकास',
    evolutionBadge: 'प्रमाणित अभिलेखीय एवं शास्त्रीय इतिवृत्त',
    p1: 'ओड्र जनसमूह के प्राचीनतम ऐतिहासिक प्रमाण महाभारत, भरत मुनि के नाट्यशास्त्र (ओड्र-मागधी शैली) और पुराणों में मिलते हैं। प्रथम शताब्दी ईस्वी में रोमन इतिहासकार प्लिनी ने माउंट मालेउस के निकट ओरेतेस (ओड्र) निवासियों का उल्लेख किया है।',
    p2: '639 ईस्वी में प्रसिद्ध चीनी यात्री ह्वेनसांग (युआन च्वांग) ने वू-तू (ओड्र देश) की यात्रा की। उन्होंने यहां की समृद्ध कृषि, विद्या केंद्रों और दक्षिण-पूर्वी तट पर स्थित प्रसिद्ध बंदरगाह चरित्रपुर (चे-ली-ता-लो) का वर्णन किया, जहां से श्रीलंका और दक्षिण-पूर्व एशिया के लिए जहाज चलते थे।',
    p3: '15वीं शताब्दी में सम्राट कपिलेंद्र देव गजपति के शासनकाल में "ओड्र-राज्य" एक विशाल साम्राज्य का केंद्र बन गया। वेलिगलनी ताम्रपत्र (1458 ई.) सहित कई अभिलेखों में कोंडावीडु, विनुकोंडा और उदयगिरि के दुर्गों में ओड्र सेनापतियों के प्रशासन का स्पष्ट उल्लेख है।',
    mapsBtn: 'ओड्र देश के ऐतिहासिक मानचित्र देखें',
    inscriptionsBtn: 'ओड्र शिलालेख अभिलेख देखें',
    readArticleBtn: (refId) => `संपूर्ण ऐतिहासिक लेख पढ़ें [${refId}]`
  },
  te: {
    utkalaCore: 'ప్రధాన కేంద్రాలు: జాజ్‌పూర్ (విరజా క్షేత్రం), బాలాసోర్, మయూర్‌భంజ్ తీర ప్రాంతం',
    kalingaCore: 'ప్రధాన కేంద్రాలు: కళింగనగరం (ముఖలింగం), మహేంద్రగిరి, శ్రీకాకుళం, సింహాచలం',
    trikalingaCore: 'ప్రధాన కేంద్రాలు: కలహండి (అసుర్‌గఢ్), కోరాపుట్ (పుష్కరి), బోలంగీర్, సోనేపూర్, సంబల్‌పూర్',
    trikalingaDeepText: 'క్రీ.శ. 537 నాటి తూర్పు గంగ రాజు ఇంద్రవర్మన్ I యొక్క జిర్జింగి తామ్రశాసనం నుండి ధృవీకరించబడిన "త్రికళింగాధిపతి" బిరుదు—సోమవంశ, కలచురి మరియు గంగ-గజపతి చక్రవర్తులచే ధరించబడి, దక్షిణ కోసల, త్రికళింగ (తేల్ & ఎగువ మహానది లోయలు), కళింగ మరియు ఉత్కళ ప్రాంతాల సార్వభౌమ ఐక్యతకు ప్రతీకగా నిలిచింది.',
    evolutionTitle: 'ఓడ్ర చారిత్రక గుర్తింపు యొక్క శాసన పరిణామ క్రమం',
    evolutionBadge: 'ధృవీకరించబడిన శాసన & చారిత్రక ఆధారం',
    p1: 'మహాభారతం, భరతముని నాట్యశాస్త్రం (ఓడ్ర-మాగధి శైలి) మరియు పురాణాలలో ఓడ్ర ప్రజల గురించిన ప్రాచీన చారిత్రక ఆధారాలు లభిస్తాయి. క్రీ.శ. 1వ శతాబ్దంలో ప్లినీ తన నేచురలిస్ హిస్టోరియాలో ఓరెటెస్ (ఓడ్రులు) ప్రజలను పేర్కొన్నారు.',
    p2: 'క్రీ.శ. 639లో ప్రముఖ చైనా బౌద్ధ యాత్రికుడు హ్యూయెన్ త్సాంగ్ వు-తు (ఓడ్ర దేశం) లో పర్యటించారు. సారవంతమైన భూమి, విద్యా కేంద్రాలు మరియు ఆగ్నేయ తీరంలోని ప్రసిద్ధ నౌకాశ్రయ నగరం చరిత్రపురం (చే-లి-తా-లో) గురించి ఆయన నమోదు చేశారు.',
    p3: '15వ శతాబ్దంలో కపిలేంద్ర దేవ గజపతి పాలనలో "ఓడ్ర-రాజ్యం" ఉపఖండ స్థాయి సామ్రాజ్యానికి కేంద్రబిందువుగా మారింది. వెలిగలని తామ్రశాసనం (1458 CE) వంటి శాసనాలు కొండవీడు, వినుకొండ, ఉదయగిరి దుర్గాలలో ఓడ్ర సేనానుల పాలనను స్పష్టంగా పేర్కొంటున్నాయి.',
    mapsBtn: 'ఓడ్ర దేశ చారిత్రక పటాలను చూడండి',
    inscriptionsBtn: 'ఓడ్ర శాసన రికార్డులను చూడండి',
    readArticleBtn: (refId) => `పూర్తి చారిత్రక వ్యాసం చదవండి [${refId}]`
  },
  kn: {
    utkalaCore: 'ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು: ಜಾಜ್‌ಪುರ (ವಿರಜಾ ಕ್ಷೇತ್ರ), ಬಾಲಾಸೋರ್, ಮಯೂರ್‌ಭಂಜ್ ಕರಾವಳಿ',
    kalingaCore: 'ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು: ಕಳಿಂಗನಗರ (ಮುಖಲಿಂಗಂ), ಮಹೇಂದ್ರಗಿರಿ, ಶ್ರೀಕಾಕುಳಂ, ಸಿಂಹಾಚಲಂ',
    trikalingaCore: 'ಪ್ರಮುಖ ಕೇಂದ್ರಗಳು: ಕಲಹಂಡಿ (ಅಸುರ್‌ಗಢ), ಕೋರಾಪುಟ್ (ಪುಷ್ಕರಿ), ಬೋಲಂಗೀರ್, ಸೋನೆಪುರ, ಸಂಬಲ್‌ಪುರ',
    trikalingaDeepText: 'ಕ್ರಿ.ಶ. 537 ರ ಪೂರ್ವ ಗಂಗ ರಾಜ ಇಂದ್ರವರ್ಮನ್ I ರ ಜಿರ್ಜಿಂಗಿ ತಾಮ್ರಶಾಸನದಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟ "ತ್ರಿಕಳಿಂಗಾಧಿಪತಿ" ಎಂಬ ಸಾರ್ವಭೌಮ ಬಿರುದು—ಸೋಮವಂಶಿ, ಕಲಚುರಿ ಮತ್ತು ಗಂಗ-ಗಜಪತಿ ಸಾಮ್ರಾಟರಿಂದ ಧರಿಸಲ್ಪಟ್ಟು, ದಕ್ಷಿಣ ಕೋಸಲ, ತ್ರಿಕಳಿಂಗ (ತೇಲ್ ಮತ್ತು ಮೇಲ್ಮಹಾನದಿ ಕಣಿವೆ), ಕಳಿಂಗ ಮತ್ತು ಉತ್ಕಲದ ಏಕತೆಯನ್ನು ಪ್ರತಿನಿಧಿಸಿತು.',
    evolutionTitle: 'ಓಡ್ರ ಗುರುತಿನ ಶಾಸನಾತ್ಮಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ವಿಕಾಸ',
    evolutionBadge: 'ದೃಢೀಕೃತ ಶಾಸನ ಮತ್ತು ಶಾಸ್ತ್ರೀಯ ದಾಖಲೆ',
    p1: 'ಮಹಾಭಾರತ, ಭರತಮುನಿಯ ನಾಟ್ಯಶಾಸ್ತ್ರ (ಓಡ್ರ-ಮಾಗಧಿ ಶೈಲಿ) ಮತ್ತು ಪುರಾಣಗಳಲ್ಲಿ ಓಡ್ರ ಜನರ ಪ್ರಾಚೀನ ಉಲ್ಲೇಖಗಳಿವೆ. ಕ್ರಿ.ಶ. 1ನೇ ಶತಮಾನದ ಪ್ಲಿನಿಯ ಬರಹಗಳಲ್ಲಿ ಓಡ್ರರ ಉಲ್ಲೇಖವಿದೆ.',
    p2: 'ಕ್ರಿ.ಶ. 639ರಲ್ಲಿ ಚೀನೀ ಯಾತ್ರಿಕ ಹ್ಯೂಯೆನ್ ತ್ಸಾಂಗ್ ಓಡ್ರ ದೇಶಕ್ಕೆ (ವು-ತು) ಭೇಟಿ ನೀಡಿ, ಇಲ್ಲಿನ ಸಮೃದ್ಧ ಕೃಷಿ, ವಿದ್ಯಾಕೇಂದ್ರಗಳು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಚರಿತ್ರಪುರ ಬಂದರಿನ ಬಗ್ಗೆ ದಾಖಲಿಸಿದ್ದಾನೆ.',
    p3: '15ನೇ ಶತಮಾನದಲ್ಲಿ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿಯ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಓಡ್ರ-ರಾಜ್ಯವು ಬೃಹತ್ ಸಾಮ್ರಾಜ್ಯದ ಕೇಂದ್ರವಾಯಿತು. ವೆಲಿಗಲನಿ ತಾಮ್ರಶಾಸನವು (1458 CE) ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ಕೋಟೆಗಳಲ್ಲಿ ಓಡ್ರ ಸೇನಾಪತಿಗಳ ಆಡಳಿತವನ್ನು ದೃಢಪಡಿಸುತ್ತದೆ.',
    mapsBtn: 'ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    inscriptionsBtn: 'ಓಡ್ರ ಶಾಸನ ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    readArticleBtn: (refId) => `ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ಲೇಖನ ಓದಿ [${refId}]`
  },
  ta: {
    utkalaCore: 'முக்கிய மையங்கள்: ஜாஜ்பூர் (விரஜா க்ஷேத்திரம்), பாலாசோர், மயூர்பஞ்ச் கடற்கரை',
    kalingaCore: 'முக்கிய மையங்கள்: கலிங்கநகரம் (முகலிங்கம்), மகேந்திரகிரி, ஸ்ரீகாகுளம், சிம்மாசலம்',
    trikalingaCore: 'முக்கிய மையங்கள்: கலஹண்டி (அசுர்கarh), கோராபுட் (புஷ்கரி), போலங்கீர், சோன்பூர், சம்பல்பூர்',
    trikalingaDeepText: 'பொ.ஊ. 537-இல் கீழைக் கங்க மன்னன் இந்திரவர்மன் I-இன் ஜிர்ஜிங்கி செப்பேட்டில் முதன்முதலில் பதிவான "திரிகலிங்காதிபதி" என்ற பேரரசுப் பட்டம்—சோமவம்ச, கலசூரி மற்றும் கங்க-கஜபதி பேரரசர்களால் தரிக்கப்பட்டு, தட்சிண கோசலம், திரிகலிங்கம், கலிங்கம் மற்றும் உத்கலத்தின் ஒருங்கிணைந்த இறையாண்மையைக் குறித்தது.',
    evolutionTitle: 'ஒட்ர அடையாளத்தின் கல்வெட்டு மற்றும் வரலாற்று பரிணாமம்',
    evolutionBadge: 'சரிபார்க்கப்பட்ட கல்வெட்டு ஆவணம்',
    p1: 'மகாபாரதம், பரத முனிவரின் நாட்டிய சாஸ்திரம் மற்றும் புராணங்களில் ஒட்ர மக்களின் பண்டைய வரலாற்றுக் குறிப்புகள் உள்ளன. கி.பி. 1ஆம் நூற்றாண்டில் பிளினி ஒட்ர மக்களைக் குறிப்பிடுகிறார்.',
    p2: 'கி.பி. 639இல் சீனப் பயணி யுவான் சுவாங் ஒட்ர தேசத்திற்கு (வு-து) வருகை தந்து, அதன் வளமான வேளாண்மை மற்றும் சரித்திரபுரா துறைமுகத்தை விவரித்துள்ளார்.',
    p3: '15ஆம் நூற்றாண்டில் கபிலேந்திர தேவ கஜபதியின் ஆட்சியில் ஒட்ர ராஜ்யம் பேரரசின் மையமாக விளங்கியது. வெலிகலானி செப்பேடுகள் (கி.பி. 1458) கொண்டவீடு மற்றும் உதயகிரி கோட்டைகளில் ஒட்ர தளபதிகளின் நிர்வாகத்தைக் குறிப்பிடுகின்றன.',
    mapsBtn: 'ஒட்ர தேசத்தின் வரலாற்று வரைபடங்களைக் காண்க',
    inscriptionsBtn: 'ஒட்ர கல்வெட்டு ஆவணங்களைக் காண்க',
    readArticleBtn: (refId) => `முழு வரலாற்று கட்டுரையைப் படிக்க [${refId}]`
  },
  mr: {
    utkalaCore: 'प्रमुख केंद्रे: जाजपूर (विरजा क्षेत्र), बालासोर, मयूरभंज किनारपट्टी',
    kalingaCore: 'प्रमुख केंद्रे: कलिंगनगर (मुखलिंगम), महेंद्रगिरी, श्रीकाकुलम, सिंहाचलम',
    trikalingaCore: 'प्रमुख केंद्रे: कालाहांडी (असुरगड), कोरापुट (पुष्करी), बोलांगीर, सोनपूर, संबलपूर',
    trikalingaDeepText: 'इ.स. ५३७ मधील पूर्व गंग राजा इंद्रवर्मन प्रथमच्या जिरजिंगी ताम्रपटातून प्रमाणित झालेली आणि सोमवंशी, कलचुरी व गंग-गजपती सम्राटांनी धारण केलेली "त्रिकलिंगाधिपती" ही सार्वभौम पदवी दक्षिण कोसल, त्रिकलिंग (तेल आणि अप्पर महानदी खोरे), कलिंग आणि उत्कल यांच्या राजकीय एकतेचे प्रतीक होती.',
    evolutionTitle: 'ओड्र अस्मितेचा शिलालेखीय आणि ऐतिहासिक विकास',
    evolutionBadge: 'प्रमाणित शिलालेख आणि ऐतिहासिक नोंद',
    p1: 'महाभारत, भरतमुनींचे नाट्यशास्त्र आणि पुराणांमध्ये ओड्र लोकांचे प्राचीन उल्लेख आढळतात. पहिल्या शतकातील प्लिनीच्या ग्रंथातही ओड्र लोकांचा उल्लेख आहे.',
    p2: 'इ.स. ६३९ मध्ये चिनी प्रवासी ह्युएन त्सांगने ओड्र देशाला (वू-तू) भेट दिली आणि येथील समृद्ध शेती व चरित्रपूर बंदराचे वर्णन केले.',
    p3: '१५ व्या शतकात सम्राट कपिलेंद्र देव गजपतीच्या काळात ओड्र-राज्य एका महासाम्राज्याचे केंद्र बनले. वेलिगलनी ताम्रपटात (१४५८ ई.) कोंडावीडु आणि उदयगिरी किल्ल्यांवरील ओड्र अधिकाऱ्यांच्या प्रशासनाची नोंद आहे.',
    mapsBtn: 'ओड्र देशाचे ऐतिहासिक नकाशे पहा',
    inscriptionsBtn: 'ओड्र शिलालेख नोंदी पहा',
    readArticleBtn: (refId) => `संपूर्ण ऐतिहासिक लेख वाचा [${refId}]`
  },
  or: {
    utkalaCore: 'ମୁଖ୍ୟ କେନ୍ଦ୍ର: ଯାଜପୁର (ବିରଜା କ୍ଷେତ୍ର), ବାଲେଶ୍ୱର, ମୟୂରଭଞ୍ଜ ଉପକୂଳ',
    kalingaCore: 'ମୁଖ୍ୟ କେନ୍ଦ୍ର: କଳିଙ୍ଗନଗର (ମୁଖଲିଙ୍ଗମ), ମହେନ୍ଦ୍ରଗିରି, ଶ୍ରୀକାକୁଲମ, ସିଂହାଚଳମ',
    trikalingaCore: 'ମୁଖ୍ୟ କେନ୍ଦ୍ର: କଳାହାଣ୍ଡି (ଅସୁରଗଡ଼), କୋରାପୁଟ (ପୁଷ୍କରୀ), ବଲାଙ୍ଗୀର, ସୋନପୁର, ସମ୍ବଲପୁର',
    trikalingaDeepText: '୫୩୭ ଖ୍ରୀଷ୍ଟାବ୍ଦର ପୂର୍ବ ଗଙ୍ଗ ରାଜା ଇନ୍ଦ୍ରବର୍ମନ ୧ମଙ୍କ ଜିରଜିଙ୍ଗି ତାମ୍ରଶାସନରୁ ପ୍ରମାଣିତ ଏବଂ ସୋମବଂଶୀ, କଳଚୁରୀ ଓ ଗଙ୍ଗ-ଗଜପତି ସମ୍ରାଟମାନଙ୍କ ଦ୍ୱାରା ଧାରଣ କରାଯାଇଥିବା "ତ୍ରିକଳିଙ୍ଗାଧିପତି" ଉପାଧି ଦକ୍ଷିଣ କୋଶଳ, ତ୍ରିକଳିଙ୍ଗ (ତେଲ ଓ ଉପର ମହାନଦୀ ଉପତ୍ୟକା), କଳିଙ୍ଗ ଏବଂ ଉତ୍କଳର ସાર્ବଭୌମ ଏକତାର ପ୍ରତୀକ ଥିଲା।',
    evolutionTitle: 'ଓଡ଼୍ର ପରିଚୟର ଶିଳାଲେଖ ଓ ଐତିହାସିକ କ୍ରମବିକାଶ',
    evolutionBadge: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ଶାସ୍ତ୍ରୀୟ ଇତିବୃତ୍ତ',
    p1: 'ମହାଭାରତ, ଭରତ ମୁନିଙ୍କ ନାଟ୍ୟଶାସ୍ତ୍ର (ଓଡ଼୍ର-ମାଗଧୀ ରୀତି) ଏବଂ ପୁରାଣରେ ଓଡ଼୍ର ଜାତିର ପ୍ରାଚୀନତମ ଉଲ୍ଲେଖ ମିଳେ। ପ୍ରଥମ ଶତାବ୍ଦୀରେ ପ୍ଲିନି ଓଡ଼୍ର ଅଧିବାସୀଙ୍କ ବିଷୟରେ ଲେଖିଥିଲେ।',
    p2: '୬୩୯ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ଚୀନ ପରିବ୍ରାଜକ ହୁଏନସାଂ ଓଡ଼୍ର ଦେଶ (ୱୁ-ତୁ) ଭ୍ରମଣ କରି ଏখানକାର ସମୃଦ୍ଧ କୃଷି, ବିଦ୍ୟାକେନ୍ଦ୍ର ଓ ପ୍ରସିଦ୍ଧ ଚରିତ୍ରପୁର ବନ୍ଦର ବିଷୟରେ ବର୍ଣ୍ଣନା କରିଥିଲେ।',
    p3: 'ପଞ୍ଚଦଶ ଶତାବ୍ଦୀରେ ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତିଙ୍କ ଶାସନ କାଳରେ "ଓଡ଼୍ର-ରାଜ୍ୟ" ଏକ ବିଶାଳ ସାମ୍ରାଜ୍ୟର କେନ୍ଦ୍ରଭୂମି ପାଲଟିଥିଲା। ଭେଲିଗାଲାନି ତାମ୍ରଶାସନ (୧୪୫୮ ଖ୍ରୀ.) କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି ଦୁର୍ଗରେ ଓଡ଼୍ର ସେନାପତିଙ୍କ ଶାସନକୁ ପ୍ରମାଣିତ କରେ।',
    mapsBtn: 'ଓଡ଼୍ର ଦେଶର ଐତିହାସିକ ମାନଚିତ୍ର ଦେଖନ୍ତୁ',
    inscriptionsBtn: 'ଓଡ଼୍ର ଶିଳାଲେଖ ଅଭିଲେଖ ଦେଖନ୍ତୁ',
    readArticleBtn: (refId) => `ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ [${refId}]`
  },
  bn: {
    utkalaCore: 'প্রধান কেন্দ্র: জাজপুর (বিরজা ক্ষেত্র), বালেশ্বর, ময়ূরভঞ্জ উপকূল',
    kalingaCore: 'প্রধান কেন্দ্র: কলিঙ্গনগর (মুখলিঙ্গম), মহেন্দ্রগিরি, শ্রীকাকুলাম, সিংহাচলম',
    trikalingaCore: 'প্রধান কেন্দ্র: কালাহান্ডি (অসুরগড়), কোরাপুট (পুষ্করী), বলাঙ্গির, সোনপুর, সম্বলপুর',
    trikalingaDeepText: '৫৩৭ খ্রিস্টাব্দে পূর্ব গঙ্গ রাজা ইন্দ্রবর্মন ১ম-এর জিরজিঙ্গি তাম্রশাসন থেকে প্রমাণিত এবং সোমবংশী, কলচুরি ও গঙ্গ-গজপতি সম্রাটদের দ্বারা গৃহীত "ত্রিকলিঙ্গাধিপতি" উপাধিটি দক্ষিণ কোশল, ত্রিকলিঙ্গ (তেল ও উচ্চ মহানদী উপত্যকা), কলিঙ্গ এবং উৎকলের সার্বভৌম ঐক্যের প্রতীক ছিল।',
    evolutionTitle: 'ওড্র পরিচয়ের শিলালিপি ও ঐতিহাসিক বিবর্তন',
    evolutionBadge: 'প্রমাণিত শিলালিপি ও ধ্রুপদী ইতিবৃত্ত',
    p1: 'মহাভারত, ভরত মুনির নাট্যশাস্ত্র (ওড্র-মাগধী রীতি) এবং পুরাণে ওড্র জনগোষ্ঠীর প্রাচীনতম উল্লেখ পাওয়া যায়। প্রথম শতাব্দীতে প্লিনি ওড্র অধিবাসীদের কথা উল্লেখ করেছেন।',
    p2: '৬৩৯ খ্রিস্টাব্দে চীনা পরিব্রাজক হিউয়েন সাং ওড্র দেশ (উ-তু) ভ্রমণ করে এখানকার সমৃদ্ধ কৃষি, শিক্ষাকেন্দ্র ও চরিত্রপুর বন্দরের বিবরণ দিয়েছেন।',
    p3: 'পঞ্চদশ শতাব্দীতে সম্রাট কপিলেন্দ্র দেব গজপতির শাসনকালে "ওড্র-রাজ্য" এক বিশাল সাম্রাজ্যের কেন্দ্রে পরিণত হয়। ভেলিগালানি তাম্রশাসনে (১৪৫৮ খ্রি.) কোন্ডাভিডু ও উদয়গিরি দুর্গে ওড্র সেনাপতিদের প্রশাসনের উল্লেখ রয়েছে।',
    mapsBtn: 'ওড্র দেশের ঐতিহাসিক মানচিত্র দেখুন',
    inscriptionsBtn: 'ওড্র শিলালিপি নথি দেখুন',
    readArticleBtn: (refId) => `সম্পূর্ণ ঐতিহাসিক নিবন্ধ পড়ুন [${refId}]`
  }
};

export const OdraDeshaPage: React.FC<OdraDeshaPageProps> = ({ onNavigate, initialItemId }) => {
  const { t, language } = useLanguage();
  const loc = ODRA_DEEP_DIVE[language] || ODRA_DEEP_DIVE.en;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(() => {
    const fromProp = resolveOdraRecordId(initialItemId);
    if (fromProp) return fromProp;
    if (typeof window !== 'undefined') {
      try {
        const params = new URLSearchParams(window.location.search);
        return resolveOdraRecordId(params.get('id') || params.get('article'));
      } catch {
        return null;
      }
    }
    return null;
  });

  // Synchronize with initialItemId prop changes and URL query parameters (?id=region-trikalinga or ?article=OD-0004)
  useEffect(() => {
    const fromProp = resolveOdraRecordId(initialItemId);
    if (fromProp) {
      setSelectedArticleId(fromProp);
      return;
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = resolveOdraRecordId(params.get('id') || params.get('article'));
      if (fromUrl) {
        setSelectedArticleId(fromUrl);
      }
    } catch {
      // Ignore
    }
  }, [initialItemId]);

  const openOdraArticle = (articleId: string) => {
    const resolved = resolveOdraRecordId(articleId) || articleId;
    setSelectedId(null);
    setSelectedArticleId(resolved);
    try {
      const params = new URLSearchParams(window.location.search);
      params.delete('article');
      params.set('id', resolved);
      const newUrl = `${window.location.pathname}?${params.toString()}${window.location.hash || ''}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Ignore history API restrictions in embedded WebViews
    }
  };

  // All 5 OD series articles in canonical order (OD-0001 .. OD-0005) for Previous / Next monograph navigation
  const odSeriesArticles = OD_SERIES_IDS
    .map(id => getArticleByIdOrSlug(id, language))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const selectedArticle = selectedArticleId ? getArticleByIdOrSlug(selectedArticleId, language) : null;

  if (selectedArticle) {
    return (
      <ArticleDetailView
        article={selectedArticle}
        allArticles={odSeriesArticles}
        basePath="/odra-desha"
        onBack={() => {
          setSelectedArticleId(null);
          try {
            const cleanParams = new URLSearchParams(window.location.search);
            cleanParams.delete('id');
            cleanParams.delete('article');
            const cleanQuery = cleanParams.toString();
            const cleanUrl = `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${window.location.hash || ''}`;
            window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch {
            // Ignore
          }
        }}
        onSelectArticle={(nextArt) => {
          if (OD_RECORD_ID_MAP[nextArt.id]) {
            openOdraArticle(nextArt.id);
          } else if (nextArt.id.startsWith('mon_')) {
            onNavigate(`/temples-monuments?article=${encodeURIComponent(nextArt.id)}`);
          } else {
            onNavigate(`/documentary?article=${encodeURIComponent(nextArt.id)}`);
          }
        }}
        onNavigate={onNavigate}
      />
    );
  }

  const regionalItems = [
    {
      id: 'region-odra',
      refId: 'OD-0001',
      icon: Compass,
      iconStyle: 'bg-[#762D35] text-white',
      title: t.odraDesha.odraTitle,
      desc: t.odraDesha.odraDesc,
      core: t.odraDesha.coreRulers,
      fullText: `${t.odraDesha.odraDesc}\n\n${loc.p3}`,
      sources: [
        { title: 'Xuanzang (Hiuen Tsang), Si-Yu-Ki: Buddhist Records of the Western World (639 CE)' },
        { title: 'Soro Copper-Plate Grants of Somadatta & Bhanudatta (Epigraphia Indica Vol. XXIII)' },
        { title: 'Veligalani Copper Plate Grant of Kapilendra Deva (1458 CE, Epigraphia Indica Vol. XXXIII)' }
      ]
    },
    {
      id: 'region-utkala',
      refId: 'OD-0002',
      icon: Landmark,
      iconStyle: 'bg-[#EFE3D0] text-[#762D35] border border-[#D8C3A2]',
      title: t.odraDesha.utkalaTitle,
      desc: t.odraDesha.utkalaDesc,
      core: loc.utkalaCore,
      fullText: `${t.odraDesha.utkalaDesc}\n\n${loc.p1}`,
      sources: [
        { title: 'Midnapore Copper-Plate Grants of Somadatta & Subhakirti (Utkala-Desha)' },
        { title: 'Bhauma-Kara & Somavamshi Copper-Plate Grants of Viraja / Guhadevapataka (Jajpur)' },
        { title: 'N.K. Sahu, History of Orissa, Utkal University Press' }
      ]
    },
    {
      id: 'region-kalinga',
      refId: 'OD-0003',
      icon: ShieldCheck,
      iconStyle: 'bg-[#EFE3D0] text-[#762D35] border border-[#D8C3A2]',
      title: t.odraDesha.kalingaTitle,
      desc: t.odraDesha.kalingaDesc,
      core: loc.kalingaCore,
      fullText: `${t.odraDesha.kalingaDesc}\n\n${loc.p2}`,
      sources: [
        { title: 'Ashoka’s Major Rock Edict XIII & Separate Kalinga Edicts at Dhauli and Jaugada (261 BCE)' },
        { title: 'Hathigumpha Inscription of Emperor Kharavela (Udayagiri, Epigraphia Indica Vol. XX)' },
        { title: 'South Indian Inscriptions (SII Vols. V & VI), Mukhalingam, Srikurmam & Simhachalam Records' }
      ]
    },
    {
      id: 'region-trikalinga',
      refId: 'OD-0004',
      icon: Scroll,
      iconStyle: 'bg-[#EFE3D0] text-[#762D35] border border-[#D8C3A2]',
      title: t.odraDesha.trikalingaTitle,
      desc: t.odraDesha.trikalingaDesc,
      core: loc.trikalingaCore,
      fullText: `${t.odraDesha.trikalingaDesc}\n\n${loc.trikalingaDeepText}`,
      sources: [
        { title: 'Jirjingi Copper-Plate Grant of Eastern Ganga King Indravarman I (537 CE, Epigraphia Indica Vol. XXV)' },
        { title: 'Inscriptions of Orissa, Vol. IV: Somavamshi Trikalingadhipati Charters of Sonepur & Bolangir' },
        { title: 'Archaeological Excavations at Asurgarh (Kalahandi) & Maraguda Valley (Nuapada)' }
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
        badge: 'OD-0005',
        era: 'c. 261 BCE – 1568 CE',
        imageUrl: `${base}hathigumpha_inscription.jpg`,
        imageLayout: 'banner',
        content: `${loc.p1}\n\n${loc.p2}\n\n${loc.p3}`,
        sources: [
          { title: 'Natyashastra of Bharata Muni & Hathigumpha Inscription of Kharavela (EI Vol. XX)' },
          { title: 'Soro Copper Plates (EI Vol. XXIII) & Xuanzang, Si-Yu-Ki (639 CE)' },
          { title: 'Veligalani Copper-Plate Grant of Kapilendra Deva (1458 CE, Epigraphia Indica Vol. XXXIII)' }
        ],
        actionButton: {
          label: loc.readArticleBtn('OD-0005'),
          onClick: () => openOdraArticle('odra-epigraphic-evolution')
        }
      };
    }
    const reg = regionalItems.find(r => r.id === selectedId);
    if (!reg) return null;
    const regionImgMap: Record<string, string> = {
      'region-odra': `${base}heritage_odra_desha.jpg`,
      'region-utkala': `${base}heritage_utkala_kingdom.jpg`,
      'region-kalinga': `${base}heritage_kalinga_empire.jpg`,
      'region-trikalinga': `${base}heritage_trikalinga_region.jpg`
    };
    return {
      id: reg.id,
      title: reg.title,
      subtitle: t.odraDesha.regionsTitle,
      badge: reg.refId,
      location: reg.core,
      imageUrl: regionImgMap[reg.id] || `${base}odra_kalinga_map.jpg`,
      imageLayout: 'banner',
      summary: reg.desc,
      content: reg.fullText,
      sources: reg.sources,
      actionButton: {
        label: loc.readArticleBtn(reg.refId),
        onClick: () => openOdraArticle(reg.id)
      }
    };
  })();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#081530] via-[#0B1B3D] to-[#132C5E] border-2 border-[#D4AF37] p-8 sm:p-12 shadow-xl text-[#FFFCF5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#132C5E] text-[#F5E1A4] text-xs font-semibold border border-[#D4AF37]/70">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{t.odraDesha.badge}</span>
            </div>
            <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#FFF7DF] leading-tight">
              {t.odraDesha.title}
            </h1>
            <p className="text-sm sm:text-base text-[#E5DEC9] font-royal-serif leading-relaxed">
              {t.odraDesha.subtitle}
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg aspect-[16/10] bg-[#07132B]">
              <img
                src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/heritage_odra_desha.jpg`}
                alt={t.odraDesha.title}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nomenclature and Distinction of Historical Regions (OD-0001 to OD-0004) */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-royal-heading font-bold text-2xl sm:text-3xl text-[#54351F]">
            {t.odraDesha.regionsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5948] max-w-2xl mx-auto">
            {t.odraDesha.regionsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionalItems.map(reg => {
            const Icon = reg.icon;
            const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
            const regionImgMap: Record<string, string> = {
              'region-odra': `${base}heritage_odra_desha.jpg`,
              'region-utkala': `${base}heritage_utkala_kingdom.jpg`,
              'region-kalinga': `${base}heritage_kalinga_empire.jpg`,
              'region-trikalinga': `${base}heritage_trikalinga_region.jpg`
            };
            const thumbUrl = regionImgMap[reg.id] || `${base}odra_kalinga_map.jpg`;
            const articleHref = `/odra-desha?id=${encodeURIComponent(reg.id)}`;
            return (
              <div
                key={reg.id}
                onClick={() => openOdraArticle(reg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openOdraArticle(reg.id);
                  }
                }}
                className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] shadow-sm overflow-hidden cursor-pointer transition-all group flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div>
                  <div className="h-36 w-full overflow-hidden relative bg-[#EFE3D0] border-b border-[#D8C3A2]">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292521]/40 via-transparent to-transparent" />
                    <div className={`absolute top-3 left-3 p-2 rounded-lg shadow-sm ${reg.iconStyle}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#762D35] px-2.5 py-1 rounded-full border border-[#A87924] shadow-sm">
                        {reg.refId}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 pb-3 space-y-2.5">
                    <h3 className="font-royal-heading font-bold text-base text-[#54351F] group-hover:text-[#762D35] transition-colors">
                      {reg.title}
                    </h3>
                    <p className="text-xs text-[#292521] leading-relaxed">
                      {reg.desc}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-2 space-y-3">
                  <div className="text-[11px] text-[#76501F] font-semibold">
                    {reg.core}
                  </div>
                  <a
                    href={articleHref}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      openOdraArticle(reg.id);
                    }}
                    className="inline-flex items-center justify-between w-full px-3 py-2 rounded-xl bg-[#EFE3D0]/80 hover:bg-[#762D35] text-[#54351F] hover:text-white border border-[#A87924]/60 text-[11px] font-bold transition-all"
                  >
                    <span className="inline-flex items-center gap-1.5 truncate">
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{loc.readArticleBtn(reg.refId)}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Dive Historical Narrative (OD-0005) */}
      <div
        onClick={() => openOdraArticle('odra-epigraphic-evolution')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openOdraArticle('odra-epigraphic-evolution');
          }
        }}
        className="rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] shadow-md overflow-hidden cursor-pointer transition-all group"
      >
        <div className="h-52 w-full overflow-hidden relative bg-[#EFE3D0] border-b border-[#D8C3A2]">
          <img
            src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/hathigumpha_inscription.jpg`}
            alt={loc.evolutionTitle}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#292521]/40 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#762D35] px-3 py-1 rounded-full border border-[#A87924] shadow-sm">
              OD-0005
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="text-[11px] font-semibold text-[#FFFCF5] bg-[#54351F]/90 backdrop-blur-sm px-3 py-1 rounded-full border border-[#D8C3A2]/60 shadow-sm">
              {loc.evolutionBadge}
            </span>
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-royal-heading font-bold text-xl text-[#54351F] group-hover:text-[#762D35] transition-colors">
              {loc.evolutionTitle}
            </h3>
            <a
              href="/odra-desha?id=odra-epigraphic-evolution"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openOdraArticle('odra-epigraphic-evolution');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#762D35] hover:bg-[#5e2229] text-white border border-[#A87924] text-xs font-bold transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{loc.readArticleBtn('OD-0005')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="text-xs sm:text-sm text-[#292521] font-royal-serif leading-relaxed space-y-4">
            <p>{loc.p1}</p>
            <p>{loc.p2}</p>
            <p>{loc.p3}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#D8C3A2]">
            <button
              onClick={e => {
                e.stopPropagation();
                onNavigate('/maps');
              }}
              className="text-xs font-semibold text-[#76501F] hover:text-[#A87924] flex items-center gap-1.5 cursor-pointer"
            >
              <span>{loc.mapsBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                onNavigate('/inscriptions');
              }}
              className="text-xs font-semibold text-[#76501F] hover:text-[#A87924] flex items-center gap-1.5 cursor-pointer"
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


