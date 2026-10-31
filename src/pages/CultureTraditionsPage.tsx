import React, { useState } from 'react';
import { HeartHandshake, Shield, Sun, Award } from 'lucide-react';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';

const CULTURE_DATA: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  readMore: string;
  pillars: { id: string; title: string; badge: string; summary: string; content: string; sources: { title: string }[] }[];
}> = {
  en: {
    badge: 'Living Traditions & Sacred Practices',
    title: 'Culture, Martial Heritage & Living Traditions',
    subtitle: 'Preserving the unbroken spiritual, martial, and royal ceremonial traditions that characterize the Suryavamsha Odiyaraju Kshatriya heritage, from the Jagannatha temple rituals to traditional martial akhadas.',
    readMore: 'Read More →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'Solar Dynastic Veneration',
        badge: 'Living Cultural Heritage',
        summary: 'Adoration of the Sun God (Surya) as the primordial progenitor of the Suryavamsha lineage. Observed through traditional morning Aditya Hridaya recitations and sacred rituals on Samba Dashami and Ratha Saptami.',
        content: 'Adoration of the Sun God (Surya) as the primordial progenitor of the Suryavamsha lineage is observed across Odiyaraju Kshatriya, Oad-Rajput, and Suryavamshi families.\n\nTraditional households observe morning Arghya (water oblations to the rising sun), recitations of the Aditya Hridaya Stotra, and annual solar festivals including Ratha Saptami (Magha Shukla Saptami) and Samba Dashami in coastal Odisha. The Konark Sun Temple (Arka-Kshetra) stands as the supreme architectural monument to this ancestral solar devotion.',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita (Sacred Geography of Arka-Kshetra)' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'Martial Akhadas & Weapon Traditions',
        badge: 'Martial Living Tradition',
        summary: 'The traditional military discipline of the Kshatriya warrior clans. Maintained through Khanda (sword) worship during Vijayadashami, archery practices, and the defensive training traditions preserved in regional garrison villages.',
        content: 'The traditional military discipline of the Suryavamshi Kshatriya, Od-Khandayat, and Paika warrior clans has been preserved through rural martial gymnasiums (Paika Akhadas / Garhs) and hereditary fort settlements.\n\nDuring Durga Puja and Vijayadashami (Dussehra), families perform Ayudha Puja and Khanda Puja (veneration of ancestral swords, shields, and martial insignia), commemorating the seasonal mobilization of the imperial Gajapathi armies.',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'Servitorship to Jagannatha',
        badge: 'Documented Royal Ritual',
        summary: 'The supreme theological distinction of Gajapathi sovereignty: ruling as the "First Servitor" (Adya Sevaka) of Lord Jagannatha. Kings performed the Chera Panhara (sweeping the chariots with a golden broom) to symbolize that temporal power is subordinate to the Divine.',
        content: 'The supreme theological distinction of Gajapathi sovereignty is ruling as the Rautaraya (viceroy) and Adya Sevaka (First Servitor) of Lord Jagannatha of Puri.\n\nDuring the annual Ratha Yatra festival, the Gajapathi monarch ascends the three sacred chariots and performs the Chera Panhara ritual—sweeping the chariot decks with a golden-handled broom and sprinkling sandalwood water—affirming that even the mightiest emperor is a humble servant before the Lord of the Universe.',
        sources: [{ title: 'Madala Panji (Temple Chronicle of Sri Jagannatha Temple, Puri)' }, { title: 'Hermann Kulke, Kings and Cults: State Formation and Legitimation in India (1993)' }]
      }
    ]
  },
  hi: {
    badge: 'जीवंत परंपराएं एवं पवित्र अनुष्ठान',
    title: 'संस्कृति, क्षत्रिय शौर्य एवं जीवंत परंपराएं',
    subtitle: 'जगन्नाथ मंदिर के राजकीय अनुष्ठानों से लेकर पारंपरिक पाइक अखाड़ों तक, सूर्यवंशी ओडियाराजु क्षत्रिय विरासत की आध्यात्मिक और सामरिक परंपराओं का संरक्षण।',
    readMore: 'विस्तार से पढ़ें →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'सूर्यवंश कुल-उपासना',
        badge: 'जीवंत सांस्कृतिक विरासत',
        summary: 'सूर्यवंश के आदि-पुरुष भगवान सूर्य की आराधना। प्रातःकालीन अर्घ्य, आदित्य हृदय स्तोत्र पाठ तथा रथ सप्तमी एवं सांब दशमी के पर्वों का आयोजन।',
        content: 'सूर्यवंशी क्षत्रिय, ओडियाराजु और ओड-राजपूत परिवारों में भगवान सूर्य को कुल के आदि-प्रवर्तक के रूप में पूजा जाता है। प्रातः सूर्य अर्घ्य, आदित्य हृदय स्तोत्र और रथ सप्तमी व सांब दशमी के अनुष्ठान इस परंपरा के प्रतीक हैं। कोणार्क का सूर्य मंदिर इसी सौर भक्ति का सर्वोच्च स्मारक है।',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'सामरिक अखाड़े एवं शस्त्र पूजन परंपरा',
        badge: 'क्षत्रिय सामरिक परंपरा',
        summary: 'विजयादशमी पर खड्ग (तलवार) पूजन, धनुर्विद्या और क्षेत्रीय गढ़-अखाड़ों में संरक्षित क्षत्रिय योद्धा कुलों का पारंपरिक सैन्य अनुशासन।',
        content: 'सूर्यवंशी क्षत्रिय एवं पाइक-खंडायत कुलों की सैन्य परंपरा ग्रामीण अखाड़ों (पाइक अखाड़ा) और दुर्ग बस्तियों में सुरक्षित रही है। दुर्गा पूजा और विजयादशमी पर पैतृक शस्त्रों और खड्ग का पूजन गजपति सेनाओं के ऐतिहासिक विजय अभियानों की स्मृति दिलाता है।',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'महाप्रभु जगन्नाथ की आद्य-सेवा (छेरा पंहरा)',
        badge: 'प्रमाणित राजकीय अनुष्ठान',
        summary: 'गजपति संप्रभुता की सर्वोच्च आध्यात्मिक विशेषता: भगवान जगन्नाथ के "प्रथम सेवक" (आद्य सेवक) के रूप में शासन करना और रथ यात्रा में स्वर्ण झाड़ू से छेरा पंहरा सेवा करना।',
        content: 'गजपति सम्राट स्वयं को भगवान जगन्नाथ का "राउतराय" (प्रतिनिधि) और "आद्य सेवक" मानते थे। वार्षिक रथ यात्रा में राजा द्वारा स्वर्ण झाड़ू से रथों की सफाई (छेरा पंहरा) यह दर्शाती है कि सर्वोच्च सम्राट भी ईश्वर के समक्ष विनम्र सेवक है।',
        sources: [{ title: 'Madala Panji (Temple Chronicle of Sri Jagannatha Temple, Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  },
  te: {
    badge: 'సజీవ సంప్రదాయాలు & పవిత్ర ఆచారాలు',
    title: 'సంస్కృతి, క్షత్రియ శౌర్యం & సజీవ సంప్రదాయాలు',
    subtitle: 'పూరి జగన్నాథ ఆలయ రాజ లాంఛనాల నుండి సాంప్రదాయ క్షత్రియ ఆయుధ పూజల వరకు సూర్యవంశ ఓడియరాజు క్షత్రియ వారసత్వపు ఆధ్యాత్మిక, వీర సాంప్రదాయాలు.',
    readMore: 'పూర్తిగా చదవండి →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'సూర్యవంశ ఆదిత్య ఆరాధన',
        badge: 'సజీవ సాంస్కృతిక వారసత్వం',
        summary: 'సూర్యవంశానికి మూలపురుషుడైన సూర్య భగవానుని ఆరాధన. ఉదయ సూర్య అర్ఘ్యం, ఆదిత్య హృదయ పారాయణం, రథ సప్తమి మరియు సాంబ దశమి వేడుకలు.',
        content: 'సూర్యవంశ ఓడియరాజు క్షత్రియ మరియు ఓడ్-రాజ్‌పుత్ కుటుంబాలలో సూర్య భగవానుని ఆది పితామహుడిగా ఆరాధిస్తారు. రథ సప్తమి, సాంబ దశమి పండుగలు మరియు కోణార్క్ సూర్య దేవాలయం ఈ సౌర భక్తికి శాశ్వత ప్రతీకలు.',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'క్షత్రియ అఖాడాలు & ఆయుధ పూజా సంప్రదాయం',
        badge: 'క్షత్రియ వీర సంప్రదాయం',
        summary: 'విజయదశమి నాడు ఖడ్గ పూజ, ధనుర్విద్య మరియు కోట గ్రామాలలో సంరక్షించబడిన క్షత్రియ యోధుల సాంప్రదాయ సైనిక శిక్షణ.',
        content: 'సూర్యవంశ క్షత్రియ మరియు పైక యోధుల సైనిక క్రమశిక్షణ అఖాడాలు మరియు దుర్గ గ్రామాలలో నేటికీ సజీవంగా ఉంది. దసరా విజయదశమి నాడు పూర్వీకుల కత్తులు, డాలులకు ఆయుధ పూజ నిర్వహించడం గజపతి సైన్యాల జైత్రయాత్రలకు గుర్తుగా నిలుస్తుంది.',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'జగన్నాథ స్వామి ఆద్య సేవకత్వం (ఛేరా పన్హరా)',
        badge: 'చారిత్రక రాజ ఆచారం',
        summary: 'జగన్నాథ స్వామికి "మొదటి సేవకునిగా" (ఆద్య సేవక) పాలించడం గజపతి చక్రవర్తుల విశిష్టత. రథయాత్రలో బంగారు చీపురుతో రథాలను ఊడ్చే ఛేరా పన్హరా సేవ.',
        content: 'గజపతి చక్రవర్తులు తమను పూరి జగన్నాథ స్వామికి ఆద్య సేవకులుగా భావించారు. రథయాత్రలో మహారాజు స్వయంగా బంగారు చీపురుతో రథాలను శుభ్రపరిచే ఛేరా పన్హరా ఆచారం దైవ సన్నిధిలో చక్రవర్తి కూడా వినయపూర్వక సేవకుడేనని చాటుతుంది.',
        sources: [{ title: 'Madala Panji (Temple Chronicle of Sri Jagannatha Temple, Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  },
  kn: {
    badge: 'ಜೀವಂತ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ಪವಿತ್ರ ಆಚರಣೆಗಳು',
    title: 'ಸಂಸ್ಕೃತಿ, ಕ್ಷತ್ರಿಯ ಪರಂಪರೆ ಮತ್ತು ಜೀವಂತ ಸಂಪ್ರದಾಯಗಳು',
    subtitle: 'ಜಗನ್ನಾಥ ದೇವಾಲಯದ ರಾಜ ವಿಧಿಗಳಿಂದ ಹಿಡಿದು ಸಾಂಪ್ರದಾಯಿಕ ಸಮರ ಅಖಾಡಗಳವರೆಗೆ ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಪರಂಪರೆಯ ಆಧ್ಯಾತ್ಮಿಕ ಮತ್ತು ವೀರ ಸಂಪ್ರದಾಯಗಳು.',
    readMore: 'ಇನ್ನಷ್ಟು ಓದಿ →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'ಸೂರ್ಯವಂಶದ ಆದಿತ್ಯ ಆರಾಧನೆ',
        badge: 'ಜೀವಂತ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ',
        summary: 'ಸೂರ್ಯವಂಶದ ಮೂಲಪುರುಷ ಸೂರ್ಯದೇವನ ಆರಾಧನೆ. ಆದಿತ್ಯ ಹೃದಯ ಪಠಣ, ರಥ ಸಪ್ತಮಿ ಮತ್ತು ಸಾಂಬ ದಶಮಿ ಆಚರಣೆಗಳು.',
        content: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಕುಟುಂಬಗಳಲ್ಲಿ ಸೂರ್ಯದೇವನನ್ನು ಕುಲದ ಆದಿ ಮೂಲಪುರುಷನಾಗಿ ಪೂಜಿಸಲಾಗುತ್ತದೆ. ರಥ ಸಪ್ತಮಿ, ಸಾಂಬ ದಶಮಿ ಮತ್ತು ಕೋಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯವು ಈ ಭಕ್ತಿಯ ಪ್ರತೀಕಗಳಾಗಿವೆ.',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'ಸಮರ ಅಖಾಡಗಳು ಮತ್ತು ಆಯುಧ ಪೂಜಾ ಸಂಪ್ರದಾಯ',
        badge: 'ಕ್ಷತ್ರಿಯ ವೀರ ಸಂಪ್ರದಾಯ',
        summary: 'ವಿಜಯದಶಮಿಯಂದು ಖಡ್ಗ ಪೂಜೆ, ಧನುರ್ವಿದ್ಯೆ ಮತ್ತು ಕೋಟೆ ಗ್ರಾಮಗಳಲ್ಲಿ ಉಳಿದುಕೊಂಡಿರುವ ಕ್ಷತ್ರಿಯ ಯೋಧರ ಸಾಂಪ್ರದಾಯಿಕ ಸಮರ ಕಲೆ.',
        content: 'ದಸರಾ ವಿಜಯದಶಮಿಯಂದು ಪೂರ್ವಜರ ಖಡ್ಗ ಮತ್ತು ಗುರಾಣಿಗಳಿಗೆ ಆಯುಧ ಪೂಜೆ ಸಲ್ಲಿಸುವ ಮೂಲಕ ಗಜಪತಿ ಸೈನ್ಯದ ವಿಜಯಯಾತ್ರೆಗಳನ್ನು ಸ್ಮರಿಸಲಾಗುತ್ತದೆ.',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'ಜಗನ್ನಾಥನ ಆದ್ಯ ಸೇವಕತ್ವ (ಛೇರಾ ಪನ್ಹರಾ)',
        badge: 'ದಾಖಲಿತ ರಾಜ ವಿಧಿ',
        summary: 'ಪುರಿ ಜಗನ್ನಾಥನ ಮೊದಲ ಸೇವಕನಾಗಿ (ಆದ್ಯ ಸೇವಕ) ಆಳ್ವಿಕೆ ನಡೆಸುವುದು ಮತ್ತು ರಥಯಾತ್ರೆಯಲ್ಲಿ ಚಿನ್ನದ ಪೊರಕೆಯಿಂದ ರಥವನ್ನು ಗುಡಿಸುವ ಛೇರಾ ಪನ್ಹರಾ ಸೇವೆ.',
        content: 'ಗಜಪತಿ ಚಕ್ರವರ್ತಿಗಳು ಜಗನ್ನಾಥನ ಆದ್ಯ ಸೇವಕರಾಗಿ ರಥಯಾತ್ರೆಯಲ್ಲಿ ಛೇರಾ ಪನ್ಹರಾ ಸೇವೆ ಸಲ್ಲಿಸುವ ಮೂಲಕ ದೈವದ ಮುಂದೆ ಸಾಮ್ರಾಟನೂ ವಿನಮ್ರ ಸೇವಕ ಎಂಬುದನ್ನು ಸಾರಿದರು.',
        sources: [{ title: 'Madala Panji (Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  },
  ta: {
    badge: 'வாழும் மரபுகள் மற்றும் புனித சடங்குகள்',
    title: 'பண்பாடு, மறவர் பாரம்பரியம் மற்றும் வாழும் மரபுகள்',
    subtitle: 'புரி ஜெகந்நாதர் கோயில் சடங்குகள் முதல் பாரம்பரிய போர்க்கலை கூடங்கள் வரை சூரியவம்ச ஒடியாராஜு சத்திரிய பாரம்பரியம்.',
    readMore: 'மேலும் படிக்க →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'சூரியவம்ச சூரிய வழிபாடு',
        badge: 'வாழும் பண்பாட்டு மரபு',
        summary: 'சூரியவம்சத்தின் ஆதி முதல்வரான சூரிய பகவான் வழிபாடு. ஆதித்ய ஹ்ருதய பாராயணம், ரத சப்தமி மற்றும் சாம்ப தசமி விழாக்கள்.',
        content: 'சூரியவம்ச ஒடியாராஜு சத்திரிய குடும்பங்களில் சூரிய பகவான் குல முதல்வராக வணங்கப்படுகிறார். ரத சப்தமி மற்றும் கொனார்க் சூரியக் கோயில் இதற்குச் சான்றாகும்.',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'போர்க்கலைக் கூடங்கள் மற்றும் ஆயுத பூஜை மரபு',
        badge: 'மறவர் மரபு',
        summary: 'விஜயதசமியின் போது வாள் வழிபாடு (கட்க பூஜை) மற்றும் பாரம்பரிய போர்ப்பயிற்சி முறைகள்.',
        content: 'விஜயதசமி திருநாளில் முன்னோர்களின் வாள்கள் மற்றும் கேடயங்களுக்கு ஆயுத பூஜை செய்து கஜபதி படைகளின் வீர மரபு போற்றப்படுகிறது.',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'ஜெகந்நாதரின் முதல் சேவகர் (சேரா பன்ஹரா)',
        badge: 'அரச சடங்கு ஆவணம்',
        summary: 'ஜெகந்நாதரின் முதல் சேவகராக (ஆத்ய சேவகர்) ஆட்சி செய்து, ரத யாத்திரையில் தங்கத் துடைப்பத்தால் தேரைத் தூய்மை செய்யும் சேரா பன்ஹரா சடங்கு.',
        content: 'ரத யாத்திரையின் போது கஜபதி மன்னர் தங்கத் துடைப்பத்தால் தேரைப் பெருக்கும் சேரா பன்ஹரா சடங்கு இறைவனுக்கு முன் பேரரசரும் தொண்டரே என்பதை உணர்த்துகிறது.',
        sources: [{ title: 'Madala Panji (Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  },
  mr: {
    badge: 'जिवंत परंपरा आणि पवित्र विधी',
    title: 'संस्कृती, क्षत्रिय शौर्य आणि जिवंत परंपरा',
    subtitle: 'जगन्नाथ मंदिराच्या राजकीय विधींपासून ते पारंपरिक आखाड्यांपर्यंत सूर्यवंशी ओडियाराजू क्षत्रिय वारशाच्या आध्यात्मिक आणि लष्करी परंपरा.',
    readMore: 'अधिक वाचा →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'सूर्यवंश कुल-उपासना',
        badge: 'जिवंत सांस्कृतिक वारसा',
        summary: 'सूर्यवंशाचे आदि-पुरुष भगवान सूर्याची उपासना. आदित्य हृदय स्तोत्र पठण, रथसप्तमी आणि सांब दशमी उत्सव.',
        content: 'सूर्यवंशी ओडियाराजू क्षत्रिय आणि ओड-राजपूत घराण्यांमध्ये सूर्याला मूळ पुरुष मानून पूजले जाते. रथसप्तमी आणि कोणार्क सूर्य मंदिर या परंपरेचे प्रतीक आहे.',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'सामरिक आखाडे आणि शस्त्रपूजन परंपरा',
        badge: 'क्षत्रिय सामरिक परंपरा',
        summary: 'विजयादशमीला खड्ग (तलवार) पूजन, धनुर्विद्या आणि गड-किल्ल्यांच्या गावांमध्ये जपलेली लष्करी परंपरा.',
        content: 'दसऱ्याला (विजयादशमी) पूर्वजांच्या तलवारी व शस्त्रांचे पूजन करून गजपती सैन्याच्या शौर्याचे स्मरण केले जाते.',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'भगवान जगन्नाथाची आद्य-सेवा (छेरा पंहरा)',
        badge: 'प्रमाणित राजकीय विधी',
        summary: 'जगन्नाथाचे "प्रथम सेवक" (आद्य सेवक) म्हणून राज्य करणे आणि रथयात्रेत सुवर्ण झाडूने छेरा पंहरा सेवा करणे.',
        content: 'रथयात्रेदरम्यान गजपती सम्राट स्वतः सुवर्ण झाडूने रथांची स्वच्छता (छेरा पंहरा) करतात, जे दर्शवते की सम्राटही परमेश्वराचा नम्र सेवक आहे.',
        sources: [{ title: 'Madala Panji (Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  },
  or: {
    badge: 'ଜୀବନ୍ତ ପରମ୍ପରା ଓ ପବିତ୍ର ରୀତିନୀତି',
    title: 'ସଂସ୍କୃତି, କ୍ଷତ୍ରିୟ ଶୌର୍ଯ୍ୟ ଓ ଜୀବନ୍ତ ପରମ୍ପରା',
    subtitle: 'ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିରର ରାଜକୀୟ ନୀତିଠାରୁ ଆରମ୍ଭ କରି ପାରମ୍ପରିକ ପାଇକ ଆଖଡ଼ା ପର୍ଯ୍ୟନ୍ତ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଐତିହ୍ୟର ସଂରକ୍ଷଣ।',
    readMore: 'ଅଧିକ ପଢ଼ନ୍ତୁ →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'ସୂର୍ଯ୍ୟବଂଶୀୟ ଆଦିତ୍ୟ ଉପାସନା',
        badge: 'ଜୀବନ୍ତ ସାଂସ୍କୃତିକ ଐତିହ୍ୟ',
        summary: 'ସୂର୍ଯ୍ୟବଂଶର ଆଦି-ପୁରୁଷ ଭଗବାନ ସୂର୍ଯ୍ୟଙ୍କ ଆରାଧନା। ଆଦିତ୍ୟ ହୃଦୟ ପାଠ, ରଥ ସପ୍ତମୀ ଓ ଶାମ୍ବ ଦଶମୀ ପର୍ବ ପାଳନ।',
        content: 'ସୂର୍ଯ୍ୟବଂଶୀ କ୍ଷତ୍ରିୟ ଓ ଓଡ଼ିଆରାଜୁ ପରିବାରରେ ଭଗବାନ ସୂର୍ଯ୍ୟଙ୍କୁ କୁଳର ଆଦି-ପୁରୁଷ ରୂପେ ପୂଜା କରାଯାଏ। ଶାମ୍ବ ଦଶମୀ, ରଥ ସପ୍ତମୀ ଏବଂ କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଏହି ଭକ୍ତିର ପ୍ରତୀକ।',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'ସାମରିକ ପାଇକ ଆଖଡ଼ା ଓ ଅସ୍ତ୍ର ପୂଜା ପରମ୍ପରା',
        badge: 'କ୍ଷତ୍ରିୟ ବୀର ପରମ୍ପରା',
        summary: 'ବିଜୟାଦଶମୀରେ ଖଣ୍ଡା ପୂଜା, ଧନୁର୍ବିଦ୍ୟା ଏବଂ ଗଡ଼ଜାତ ଗ୍ରାମମାନଙ୍କରେ ସଂରକ୍ଷିତ କ୍ଷତ୍ରିୟ ଯୋଦ୍ଧାମାନଙ୍କର ସାମରିକ ଅନୁଶାସନ।',
        content: 'ଦୁର୍ଗାପୂଜା ଓ ବିଜୟାଦଶମୀରେ ପୂର୍ବପୁରୁଷଙ୍କ ଖଣ୍ଡା, ଢାଲ ଓ ଅସ୍ତ୍ରశସ୍ତ୍ର ପୂଜା (ଆୟୁଧ ପୂଜା) ଗଜପତି ସେନାର ଐତିହାସିକ ବିଜୟ ଅଭିଯାନର ସ୍ମୃତି ବହନ କରେ।',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'ମହାପ୍ରଭୁ ଜଗନ୍ନାଥଙ୍କ ଆଦ୍ୟ-ସେବକତ୍ୱ (ଛେରା ପହଁରା)',
        badge: 'ପ୍ରମାଣିତ ରାଜକୀୟ ନୀତି',
        summary: 'ମହାପ୍ରଭୁ ଜଗନ୍ନାଥଙ୍କ "ଆଦ୍ୟ ସେବକ" ଭାବେ ଶାସନ କରିବା ଏବଂ ରଥଯାତ୍ରାରେ ସୁବର୍ଣ୍ଣ ଖଡ଼িকାରେ ଛେରା ପହଁରା ନୀତି ସମ୍ପାଦନ।',
        content: 'ରଥଯାତ୍ରା ସମୟରେ ଗଜପତି ମହାରାଜା ତିନି ରଥ ଉପରେ ସୁବର୍ଣ୍ଣ ଖଡ଼ିକାରେ ଛେରା ପହଁରା ସେବା କରନ୍ତି, ଯାହା ପ୍ରମାଣ କରେ ଯେ ମହାପ୍ରଭୁଙ୍କ ସମ୍ମୁଖରେ ସମ୍ରାଟ ମଧ୍ୟ ଜଣେ ବିନম୍ର ସେବକ।',
        sources: [{ title: 'Madala Panji (Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  },
  bn: {
    badge: 'জীবন্ত ঐতিহ্য ও পবিত্র আচার',
    title: 'সংস্কৃতি, ক্ষত্রিয় শৌর্য ও জীবন্ত ঐতিহ্য',
    subtitle: 'পুরীর জগন্নাথ মন্দিরের রাজকীয় আচার থেকে শুরু করে ঐতিহ্যবাহী পাইক আখড়া পর্যন্ত সূর্যবংশীয় ওডিয়ারাজু ক্ষত্রিয় ঐতিহ্যের সংরক্ষণ।',
    readMore: 'বিস্তারিত পড়ুন →',
    pillars: [
      {
        id: 'culture-solar-veneration',
        title: 'সূর্যবংশীয় আদিত্য উপাসনা',
        badge: 'জীবন্ত সাংস্কৃতিক ঐতিহ্য',
        summary: 'সূর্যবংশের আদি-পুরুষ ভগবান সূর্যের আরাধনা। আদিত্য হৃদয় স্তোত্র পাঠ, রথ সপ্তমী ও শাম্ব দশমী উদযাপন।',
        content: 'সূর্যবংশীয় ক্ষত্রিয় ও ওডিয়ারাজু পরিবারে ভগবান সূর্যকে বংশের আদি-পুরুষ হিসেবে পূজা করা হয়। রথ সপ্তমী, শাম্ব দশমী এবং কোণার্ক সূর্য মন্দির এই ভক্তির চিরন্তন নিদর্শন।',
        sources: [{ title: 'Konark Sun Temple Epigraphic & Architectural Records' }, { title: 'Samba Purana & Kapila Samhita' }]
      },
      {
        id: 'culture-martial-akhadas',
        title: 'সামরিক আখড়া ও অস্ত্র পূজা পরম্পরা',
        badge: 'ক্ষত্রিয় সামরিক ঐতিহ্য',
        summary: 'বিজয়াদশমীতে খড়্গ পূজা, ধনুর্বিদ্যা এবং দুর্গ-গ্রামে সংরক্ষিত ক্ষত্রিয় যোদ্ধাদের সামরিক অনুশাসন।',
        content: 'দুর্গাপূজা ও বিজয়াদশমীতে পূর্বপুরুষদের তরবারি ও ঢাল পূজা (আয়ুধ পূজা) গজপতি সেনাবাহিনীর ঐতিহাসিক বিজয় অভিযানের স্মৃতি বহন করে।',
        sources: [{ title: 'Paika Akhada Martial Traditions of Khurda & Kalinga' }, { title: 'Sarasvati Vilasa & Medieval Odra Military Manuals' }]
      },
      {
        id: 'culture-jagannatha-servitorship',
        title: 'মহাপ্রভু জগন্নাথের আদ্য-সেবকত্ব (ছেরা পহঁরা)',
        badge: 'প্রমাণিত রাজকীয় আচার',
        summary: 'মহাপ্রভু জগন্নাথের "প্রথম সেবক" (আদ্য সেবক) হিসেবে শাসন করা এবং রথযাত্রায় স্বর্ণ ঝাড়ু দিয়ে ছেরা পহঁরা সেবা সম্পাদন।',
        content: 'বার্ষিক রথযাত্রায় গজপতি সম্রাট তিনটি রথে আরোহণ করে স্বর্ণ ঝাড়ু দিয়ে রথ পরিষ্কার (ছেরা পহঁরা) করেন, যা প্রমাণ করে যে বিশ্বনাথের সামনে সম্রাটও একজন বিনম্র সেবক।',
        sources: [{ title: 'Madala Panji (Puri)' }, { title: 'Hermann Kulke, Kings and Cults (1993)' }]
      }
    ]
  }
};

const PILLAR_ICONS = [Sun, Shield, Award];
const PILLAR_STYLES = ['bg-[#580014] text-[#d4af37]', 'bg-stone-800 text-stone-300', 'bg-stone-800 text-stone-300'];

export const CultureTraditionsPage: React.FC = () => {
  const { language } = useLanguage();
  const loc = CULTURE_DATA[language] || CULTURE_DATA.en;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPillar = selectedId ? loc.pillars.find(p => p.id === selectedId) || null : null;
  const archiveBase = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
  const pillarImgMap: Record<string, string> = {
    'culture-solar-veneration': `${archiveBase}surya_konark_sculpture.jpg`,
    'culture-martial-akhadas': `${archiveBase}virabhadra_deva_archer.jpg`,
    'culture-jagannatha-servitorship': `${archiveBase}puri_jagannatha_temple.jpg`
  };
  const modalItem: ContentDetailItem | null = selectedPillar
    ? {
        id: selectedPillar.id,
        title: selectedPillar.title,
        subtitle: loc.title,
        badge: selectedPillar.badge,
        imageUrl: pillarImgMap[selectedPillar.id] || `${archiveBase}surya_konark_sculpture.jpg`,
        imageLayout: 'banner',
        summary: selectedPillar.summary,
        content: selectedPillar.content,
        sources: selectedPillar.sources
      }
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#220710] via-[#1a1122] to-[#111728] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40">
            <HeartHandshake className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{loc.badge}</span>
          </div>
          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            {loc.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {loc.subtitle}
          </p>
        </div>
      </div>

      {/* Core Cultural Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loc.pillars.map((p, idx) => {
          const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
          const iconStyle = PILLAR_STYLES[idx % PILLAR_STYLES.length];
          const thumbUrl = pillarImgMap[p.id] || `${archiveBase}surya_konark_sculpture.jpg`;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className="rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] overflow-hidden shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full overflow-hidden relative bg-stone-950 border-b border-stone-800/80">
                  <img
                    src={thumbUrl}
                    alt={p.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallback) {
                        target.dataset.fallback = '1';
                        target.src = `${archiveBase}barabati_fort_gateway.jpg`;
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121622] via-transparent to-transparent" />
                  <div className={`absolute top-3 left-3 p-2.5 rounded-xl ${iconStyle}`}>
                    <Icon className="w-5 h-5 text-[#d4af37]" />
                  </div>
                </div>
                <div className="p-6 pb-3 space-y-3">
                  <h3 className="font-royal-heading font-bold text-lg text-stone-100 group-hover:text-[#fae29c] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 text-xs text-[#e8c872] font-semibold flex items-center justify-between">
                <span>{p.badge}</span>
                <span>{loc.readMore}</span>
              </div>
            </div>
          );
        })}
      </div>

      <ContentDetailModal item={modalItem} onClose={() => setSelectedId(null)} />
    </div>
  );
};


