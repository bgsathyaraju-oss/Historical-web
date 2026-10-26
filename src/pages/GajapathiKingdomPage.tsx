import React, { useState, useEffect, useMemo } from 'react';
import {
  Crown,
  ShieldCheck,
  MapPin,
  Landmark,
  BookOpen,
  Scroll,
  ArrowRight,
  Sparkles,
  FileText
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DOCUMENTED_FIGURES_REPO, DocumentedFigureData } from '../data/documentedFiguresRepository';
import { getAllArticles } from '../data/articlesRepository';
import { getCanonicalInscriptions } from '../data/archivalSeedData';
import { DYNASTY_TRANSLATIONS } from '../../server/contentTranslations';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { LanguageCode } from '../types';

interface GajapathiKingdomPageProps {
  onNavigate: (path: string) => void;
  initialItemId?: string | null;
}

type ModalTarget =
  | { type: 'monarch'; id: string }
  | { type: 'dossier'; id: string }
  | { type: 'article'; id: string }
  | { type: 'inscription'; id: string }
  | { type: 'dynasty'; id: string };

interface LocalizedDossier {
  id: string;
  tab: 'administration' | 'military' | 'culture';
  era: Record<LanguageCode, string>;
  badge: Record<LanguageCode, string>;
  title: Record<LanguageCode, string>;
  subtitle: Record<LanguageCode, string>;
  summary: Record<LanguageCode, string>;
  content: Record<LanguageCode, string>;
  highlights?: Record<LanguageCode, string[]>;
  sources: string[];
}

const LEGACY_FIGURE_ID_MAP: Record<string, string> = {
  'fig-kapilendra': 'fig_kapilendra_deva',
  'fig-purushottama': 'fig_purushottama_deva',
  'fig-prataparudra': 'fig_prataparudra_deva',
  'fig-hamvira': 'fig_hamvira_deva',
  'fig-mukunda': 'fig_mukunda_deva',
  'fig-chodaganga': 'fig_anantavarman_chodaganga',
  'fig-narasimha': 'fig_langula_narasimha_deva'
};

const PAGE_UI_LABELS: Record<
  LanguageCode,
  {
    monarchsHeading: string;
    monarchsSubheading: string;
    viewProfileBtn: string;
    viewRecordBtn: string;
    readArticleBtn: string;
    viewInscriptionBtn: string;
    dynastiesHeading: string;
    dynastiesSubheading: string;
    articlesHeading: string;
    articlesSubheading: string;
    inscriptionsHeading: string;
    inscriptionsSubheading: string;
    adminIntroTitle: string;
    adminIntroDesc: string;
    militaryIntroTitle: string;
    militaryIntroDesc: string;
    militaryFindspotsLabel: string;
    militaryFindspotsText: string;
    cultureIntroTitle: string;
    cultureIntroDesc: string;
    titlesSectionLabel: string;
    eventsSectionLabel: string;
    placesSectionLabel: string;
    dynastyMetaLabel: string;
    reignMetaLabel: string;
    datesMetaLabel: string;
    capitalMetaLabel: string;
    regionMetaLabel: string;
  }
> = {
  en: {
    monarchsHeading: 'Sovereign Gajapathi & Imperial Odishan Monarchs',
    monarchsSubheading:
      'Click any monarch card or button below to open their complete multilingual biographical dossier, regnal milestones, imperial titles, and primary epigraphic citations.',
    viewProfileBtn: 'View Full Profile',
    viewRecordBtn: 'View Full Record',
    readArticleBtn: 'Read Full Historical Study',
    viewInscriptionBtn: 'View Epigraphic Charter',
    dynastiesHeading: 'Imperial Dynastic Lineages of Odra & Kalinga',
    dynastiesSubheading:
      'Documented dynastic succession from the Eastern Gangas and Suryavamsha Gajapathis to regional Kshatriya principalities.',
    articlesHeading: 'Gajapathi Historical Monographs & Research Articles',
    articlesSubheading:
      'Peer-reviewed historical studies on the Suryavamsha Gajapathi Empire, military campaigns, and epigraphic records.',
    inscriptionsHeading: 'Primary Royal Copper-Plate & Temple Inscriptions',
    inscriptionsSubheading:
      'Contemporary epigraphic charters corroborating Gajapathi regnal years, titles, and administrative endowments.',
    adminIntroTitle: 'Imperial Administration & Military Feudal Structure',
    adminIntroDesc:
      'The Suryavamshi state was administered through a hierarchical feudal-military apparatus. The emperor held supreme authority as Rautaraya (deputy of Lord Jagannatha), uniting sacred legitimacy with imperial governance across Dandapatas (provinces).',
    militaryIntroTitle: 'Military Organisation & The Gajasena (War Elephant Corps)',
    militaryIntroDesc:
      'The Gajapathi armies were renowned across medieval India for maintaining one of the largest and most formidable war-elephant divisions in the subcontinent, numbering between 1,000 and 2,500 combat elephants supported by Paika and Od-Kshatriya infantry divisions.',
    militaryFindspotsLabel: 'Epigraphic Findspots:',
    militaryFindspotsText:
      'Verified Gajapathi military inscriptions stretch continuously from the banks of the Hooghly in Bengal, through coastal Odisha, down to Draksharama, Kondavidu, Srisailam, Simhachalam, and Srirangam in the Kaveri River basin.',
    cultureIntroTitle: 'Cultural, Literary & Architectural Renaissance under the Gajapathis',
    cultureIntroDesc:
      'The Suryavamsha period witnessed the golden crystallization of classical Odia literature, Sanskrit legal digests, and monumental temple fortifications from Puri to Simhachalam.',
    titlesSectionLabel: 'Imperial Titles & Prasastis',
    eventsSectionLabel: 'Chronologically Documented Milestones',
    placesSectionLabel: 'Associated Capitals, Fortresses & Sacred Kshetrams',
    dynastyMetaLabel: 'Royal Dynasty',
    reignMetaLabel: 'Reign Period',
    datesMetaLabel: 'Historical Dates',
    capitalMetaLabel: 'Imperial Capital',
    regionMetaLabel: 'Core Territory'
  },
  hi: {
    monarchsHeading: 'सार्वभौम सूर्यवंशी गजपति एवं ओडिशा के सम्राट',
    monarchsSubheading:
      'किसी भी सम्राट की संपूर्ण जीवनी, शासनकाल की घटनाएं, राजकीय उपाधियां और प्रामाणिक शिलालेखीय संदर्भ देखने के लिए कार्ड या बटन पर क्लिक करें।',
    viewProfileBtn: 'संपूर्ण विवरण देखें',
    viewRecordBtn: 'संपूर्ण अभिलेख देखें',
    readArticleBtn: 'संपूर्ण शोध लेख पढ़ें',
    viewInscriptionBtn: 'शिलालेख विवरण देखें',
    dynastiesHeading: 'ओड्र एवं कलिंग के साम्राज्यवादी राजवंश',
    dynastiesSubheading:
      'पूर्वी गंग और सूर्यवंशी गजपतियों से लेकर क्षेत्रीय क्षत्रिय संस्थानों तक का प्रामाणिक राजवंशीय इतिहास।',
    articlesHeading: 'गजपति ऐतिहासिक शोध-ग्रंथ एवं लेख',
    articlesSubheading:
      'सूर्यवंशी गजपति साम्राज्य, सैन्य अभियानों और ताम्रपत्र अभिलेखों पर विस्तृत ऐतिहासिक अध्ययन।',
    inscriptionsHeading: 'प्रमुख राजकीय ताम्रपत्र एवं मंदिर शिलालेख',
    inscriptionsSubheading:
      'गजपति सम्राटों के शासन वर्ष, उपाधियों और भूमिदान को प्रमाणित करने वाले समकालीन शिलालेख।',
    adminIntroTitle: 'साम्राज्यिक प्रशासन एवं सैन्य-सामंती संरचना',
    adminIntroDesc:
      'सूर्यवंशी राज्य का संचालन एक सुगठित सैन्य-सामंती व्यवस्था के माध्यम से होता था। सम्राट स्वयं को भगवान जगन्नाथ का सेवक-प्रतिनिधि (राउतराय) मानते हुए दंडपाटों (प्रांतों) का संचालन करते थे।',
    militaryIntroTitle: 'सैन्य संगठन एवं गजसेना (युद्ध हस्ति दल)',
    militaryIntroDesc:
      'गजपति सेना मध्यकालीन भारत में अपनी अजेय गजसेना (1,000 से 2,500 युद्ध हाथी) तथा पराक्रमी ओड-क्षत्रिय और पाइक पदाति सेना के लिए विख्यात थी।',
    militaryFindspotsLabel: 'शिलालेख प्राप्ति-स्थल:',
    militaryFindspotsText:
      'गजपति सैन्य शिलालेख बंगाल में हुगली नदी के तट से लेकर तटीय ओडिशा, द्राक्षाराम, कोंडावीडु, श्रीशैलम, सिंहाचलम और कावेरी तट के श्रीरंगम तक प्राप्त हुए हैं।',
    cultureIntroTitle: 'गजपति काल में सांस्कृतिक, साहित्यिक एवं स्थापत्य पुनर्जागरण',
    cultureIntroDesc:
      'सूर्यवंशी गजपति काल में शास्त्रीय ओडिया साहित्य, संस्कृत धर्मशास्त्र (सरस्वती विलास) और पुरी से सिंहाचलम तक भव्य मंदिर स्थापत्य का स्वर्ण युग देखा गया।',
    titlesSectionLabel: 'राजकीय उपाधियां एवं प्रशस्तियां',
    eventsSectionLabel: 'कालक्रमानुसार ऐतिहासिक घटनाएं',
    placesSectionLabel: 'संबंधित राजधानियां, दुर्ग एवं पवित्र क्षेत्र',
    dynastyMetaLabel: 'राजवंश',
    reignMetaLabel: 'शासनकाल',
    datesMetaLabel: 'ऐतिहासिक काल',
    capitalMetaLabel: 'राजधानी',
    regionMetaLabel: 'मूल क्षेत्र'
  },
  te: {
    monarchsHeading: 'సార్వభౌమ సూర్యవంశ గజపతి & ఒడిశా చక్రవర్తులు',
    monarchsSubheading:
      'ఏ చక్రవర్తి పూర్తి జీవిత చరిత్ర, పరిపాలనా ఘట్టాలు, రాజ బిరుదులు మరియు శాసన ఆధారాలనైనా వీక్షించడానికి ఆ కార్డు లేదా బటన్‌పై క్లిక్ చేయండి.',
    viewProfileBtn: 'పూర్తి చరిత్ర చూడండి',
    viewRecordBtn: 'పూర్తి వివరాలు చూడండి',
    readArticleBtn: 'పూర్తి పరిశోధనా వ్యాసం చదవండి',
    viewInscriptionBtn: 'శాసన వివరాలు చూడండి',
    dynastiesHeading: 'ఓడ్ర & కళింగ సామ్రాజ్య రాజవంశాలు',
    dynastiesSubheading:
      'తూర్పు గాంగులు మరియు సూర్యవంశ గజపతుల నుండి దక్షిణ క్షత్రియ సంస్థానాల వరకు ప్రమాణబద్ధ రాజవంశ క్రమం.',
    articlesHeading: 'గజపతి చారిత్రక పరిశోధనా వ్యాసాలు & మోనోగ్రాఫ్‌లు',
    articlesSubheading:
      'సూర్యవంశ గజపతి సామ్రాజ్యం, దక్షిణ దిగ్విజయ యాత్రలు మరియు శాసన ఆధారాలపై సమగ్ర పరిశోధనా పత్రాలు.',
    inscriptionsHeading: 'ప్రధాన రాజ తామ్రశాసనాలు & ఆలయ శిలాశాసనాలు',
    inscriptionsSubheading:
      'గజపతి చక్రవర్తుల పరిపాలనా కాలం, బిరుదులు మరియు అగ్రహార దానాలను ధృవీకరించే ప్రాథమిక శాసనాలు.',
    adminIntroTitle: 'సామ్రాజ్య పరిపాలన & సైనిక-సామంత వ్యవస్థ',
    adminIntroDesc:
      'సూర్యవంశ గజపతి సామ్రాజ్యం పటిష్టమైన సైనిక-పరిపాలనా వ్యవస్థ ద్వారా పాలించబడింది. చక్రవర్తి శ్రీ జగన్నాథ స్వామికి ప్రతినిధిగా (రౌతరాయ) దండపాటలు (రాష్ట్రాలు) మరియు దుర్గాలను పరిపాలించారు.',
    militaryIntroTitle: 'సైనిక వ్యవస్థ & గజసేన (యుద్ధ ఏనుగుల దళం)',
    militaryIntroDesc:
      'మధ్యయుగ భారతదేశంలో 1,000 నుండి 2,500 యుద్ధ ఏనుగులతో కూడిన అజేయ గజసేన మరియు శౌర్యవంతమైన ఒడియరాజు క్షత్రియ, పైక పదాతి దళాలకు గజపతి సైన్యం ప్రసిద్ధి చెందింది.',
    militaryFindspotsLabel: 'శాసన ఆధార ప్రదేశాలు:',
    militaryFindspotsText:
      'గజపతుల సైనిక శాసనాలు బెంగాల్‌లోని హుగ్లీ నది ఒడ్డు నుండి ఒడిశా, ద్రాక్షారామం, కొండవీడు, శ్రీశైలం, సింహాచలం మరియు కావేరీ తీరంలోని శ్రీరంగం వరకు విస్తరించి ఉన్నాయి.',
    cultureIntroTitle: 'గజపతుల కాలంలో సాంస్కృతిక, సాహిత్య & వాస్తు శిల్ప వికాసం',
    cultureIntroDesc:
      'సూర్యవంశ గజపతుల కాలంలో సారళా దాసు మహాభారతం, సంస్కృత న్యాయశాస్త్ర గ్రంథం సరస్వతీ విలాసం మరియు పూరి మేఘనాద పాచేరి వంటి మహా నిర్మాణాలు వెలిశాయి.',
    titlesSectionLabel: 'రాజ బిరుదులు & ప్రశస్తులు',
    eventsSectionLabel: 'చారిత్రక ఘట్టాలు & విజయాలు',
    placesSectionLabel: 'సంబంధిత రాజధానులు, కోటలు & పుణ్యక్షేత్రాలు',
    dynastyMetaLabel: 'రాజవంశం',
    reignMetaLabel: 'పరిపాలనా కాలం',
    datesMetaLabel: 'చారిత్రక తేదీలు',
    capitalMetaLabel: 'రాజధాని',
    regionMetaLabel: 'ప్రధాన ప్రాంతం'
  },
  kn: {
    monarchsHeading: 'ಸಾರ್ವಭೌಮ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಮತ್ತು ಒಡಿಶಾದ ಚಕ್ರವರ್ತಿಗಳು',
    monarchsSubheading:
      'ಯಾವುದೇ ಚಕ್ರವರ್ತಿಯ ಸಂಪೂರ್ಣ ಜೀವನ ಚರಿತ್ರೆ, ಆಳ್ವಿಕೆಯ ಘಟನೆಗಳು, ಬಿರುದುಗಳು ಮತ್ತು ಶಾಸನ ಆಧಾರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಕಾರ್ಡ್ ಅಥವಾ ಬಟನ್ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.',
    viewProfileBtn: 'ಸಂಪೂರ್ಣ ವಿವರ ನೋಡಿ',
    viewRecordBtn: 'ಸಂಪೂರ್ಣ ದಾಖಲೆ ನೋಡಿ',
    readArticleBtn: 'ಸಂಪೂರ್ಣ ಸಂಶೋಧನಾ ಲೇಖನ ಓದಿ',
    viewInscriptionBtn: 'ಶಾಸನ ವಿವರ ನೋಡಿ',
    dynastiesHeading: 'ಓಡ್ರ ಮತ್ತು ಕಳಿಂಗದ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶಗಳು',
    dynastiesSubheading:
      'ಪೂರ್ವ ಗಂಗರು ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳಿಂದ ದಕ್ಷಿಣದ ಕ್ಷತ್ರಿಯ ಸಂಸ್ಥಾನಗಳವರೆಗಿನ ದಾಖಲಿತ ರಾಜವಂಶ ಪರಂಪರೆ.',
    articlesHeading: 'ಗಜಪತಿ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಲೇಖನಗಳು',
    articlesSubheading:
      'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ, ದಕ್ಷಿಣ ದಿಗ್ವಿಜಯ ಮತ್ತು ಶಾಸನಗಳ ಕುರಿತಾದ ಸಂಶೋಧನಾ ಲೇಖನಗಳು.',
    inscriptionsHeading: 'ಪ್ರಮುಖ ತಾಮ್ರಶಾಸನಗಳು ಮತ್ತು ದೇವಾಲಯ ಶಾಸನಗಳು',
    inscriptionsSubheading:
      'ಗಜಪತಿ ಅರಸರ ಆಳ್ವಿಕೆ, ಬಿರುದುಗಳು ಮತ್ತು ದಾನಗಳನ್ನು ದೃಢೀಕರಿಸುವ ಪ್ರಾಥಮಿಕ ಶಾಸನಗಳು.',
    adminIntroTitle: 'ಸಾಮ್ರಾಜ್ಯದ ಆಡಳಿತ ಮತ್ತು ಸೇನಾ ವ್ಯವಸ್ಥೆ',
    adminIntroDesc:
      'ಸೂರ್ಯವಂಶಿ ರಾಜ್ಯವು ಸುಭದ್ರ ಸೇನಾ-ಆಡಳಿತ ವ್ಯವಸ್ಥೆಯಿಂದ ಕೂಡಿತ್ತು. ಚಕ್ರವರ್ತಿಯು ಜಗನ್ನಾಥನ ಸೇವಕನಾಗಿ (ರೌತರಾಯ) ದಂಡಪಾಟಗಳನ್ನು (ಪ್ರಾಂತ್ಯಗಳನ್ನು) ಆಳುತ್ತಿದ್ದನು.',
    militaryIntroTitle: 'ಸೇನಾ ಸಂಘಟನೆ ಮತ್ತು ಗಜಸೇನೆ (ಯುದ್ಧ ಆನೆಗಳ ಪಡೆ)',
    militaryIntroDesc:
      'ಗಜಪತಿ ಸೈನ್ಯವು ಮಧ್ಯಯುಗೀನ ಭಾರತದಲ್ಲಿ 1,000 ದಿಂದ 2,500 ಯುದ್ಧ ಆನೆಗಳ ಬೃಹತ್ ಗಜಸೇನೆ ಮತ್ತು ವೀರ ಪದಾತಿ ದಳಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿತ್ತು.',
    militaryFindspotsLabel: 'ಶಾಸನ ದೊರೆತ ಸ್ಥಳಗಳು:',
    militaryFindspotsText:
      'ಗಜಪತಿ ಶಾಸನಗಳು ಬಂಗಾಳದ ಹೂಗ್ಲಿ ನದಿಯಿಂದ ಒಡಿಶಾ, ದ್ರಾಕ್ಷಾರಾಮ, ಕೊಂಡವೀಡು, ಶ್ರೀಶೈಲ, ಸಿಂಹಾಚಲಂ ಮತ್ತು ಕಾವೇರಿ ತೀರದ ಶ್ರೀರಂಗಂವರೆಗೆ ಹಬ್ಬಿವೆ.',
    cultureIntroTitle: 'ಗಜಪತಿಗಳ ಕಾಲದ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಪುನರುಜ್ಜೀವನ',
    cultureIntroDesc:
      'ಸೂರ್ಯವಂಶದ ಕಾಲದಲ್ಲಿ ಸಾರಲಾ ದಾಸರ ಒಡಿಯಾ ಮಹಾಭಾರತ, ಸರಸ್ವತೀ ವಿಲಾಸ ಗ್ರಂಥ ಮತ್ತು ಪುರಿ ಮೇಘನಾದ ಪಾಚೇರಿಯಂತಹ ಭವ್ಯ ನಿರ್ಮಾಣಗಳು ರೂಪುಗೊಂಡವು.',
    titlesSectionLabel: 'ರಾಜ ಬಿರುದುಗಳು ಮತ್ತು ಪ್ರಶಸ್ತಿಗಳು',
    eventsSectionLabel: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಘಟನೆಗಳು',
    placesSectionLabel: 'ಸಂಬಂಧಿತ ಕೋಟೆಗಳು ಮತ್ತು ಕ್ಷೇತ್ರಗಳು',
    dynastyMetaLabel: 'ರಾಜವಂಶ',
    reignMetaLabel: 'ಆಳ್ವಿಕೆಯ ಕಾಲ',
    datesMetaLabel: 'ಐತಿಹಾಸಿಕ ಕಾಲ',
    capitalMetaLabel: 'ರಾಜಧಾನಿ',
    regionMetaLabel: 'ಮೂಲ ಪ್ರದೇಶ'
  },
  ta: {
    monarchsHeading: 'சூரியவம்ச கஜபதி மற்றும் ஒடிசா பேரரசர்கள்',
    monarchsSubheading:
      'எந்தவொரு பேரரசரின் முழுமையான வாழ்க்கை வரலாறு, ஆட்சிக் கால நிகழ்வுகள், பட்டங்கள் மற்றும் கல்வெட்டுச் சான்றுகளைக் காண கார்டு அல்லது பொத்தானைக் கிளிக் செய்யவும்.',
    viewProfileBtn: 'முழு விவரம் காண்க',
    viewRecordBtn: 'முழு ஆவணம் காண்க',
    readArticleBtn: 'முழு ஆய்வுக் கட்டுரையைப் படிக்க',
    viewInscriptionBtn: 'கல்வெட்டு விவரம் காண்க',
    dynastiesHeading: 'ஒட்ர மற்றும் கலிங்கப் பேரரசு வம்சங்கள்',
    dynastiesSubheading:
      'கிழக்கு கங்கர்கள் மற்றும் சூரியவம்ச கஜபதிகள் முதல் தென்னக சத்திரிய மரபுகள் வரையிலான வரலாற்றுத் தொடர்ச்சி.',
    articlesHeading: 'கஜபதி வரலாற்று ஆய்வுக் கட்டுரைகள்',
    articlesSubheading:
      'சூரியவம்ச கஜபதி பேரரசு, தென்னகப் படையெடுப்புகள் மற்றும் கல்வெட்டுகள் குறித்த ஆய்வுக் கட்டுரைகள்.',
    inscriptionsHeading: 'முதன்மை செப்பேடுகள் மற்றும் கோயில் கல்வெட்டுகள்',
    inscriptionsSubheading:
      'கஜபதி மன்னர்களின் ஆட்சி ஆண்டுகள் மற்றும் கொடைகளை உறுதிப்படுத்தும் கல்வெட்டுச் சான்றுகள்.',
    adminIntroTitle: 'பேரரசு நிர்வாகம் மற்றும் ராணுவக் கட்டமைப்பு',
    adminIntroDesc:
      'சூரியவம்ச அரசு தண்டபாடங்கள் (மாகாணங்கள்) மற்றும் மலைக்கோட்டைகள் மூலம் நிர்வகிக்கப்பட்டது. மன்னர் தம்மை ஜெகந்நாதரின் பிரதிநிதியாக (ராவுத்தராயர்) கருதி ஆட்சி புரிந்தார்.',
    militaryIntroTitle: 'ராணுவ அமைப்பு மற்றும் கஜசேனை (போர் யானைப்படை)',
    militaryIntroDesc:
      'கஜபதி படைகள் 1,000 முதல் 2,500 போர் யானைகள் கொண்ட மாபெரும் கஜசேனை மற்றும் வீரம் செறிந்த காலாட்படைக்குப் பெயர் பெற்றவை.',
    militaryFindspotsLabel: 'கல்வெட்டு இடங்கள்:',
    militaryFindspotsText:
      'வங்காளத்தின் ஹூக்ளி நதி முதல் ஒடிசா, திராட்சாராமம், கொண்டவீடு, ஸ்ரீசைலம், சிம்மாசலம் மற்றும் காவிரி கரையின் ஸ்ரீரங்கம் வரை கஜபதி கல்வெட்டுகள் உள்ளன.',
    cultureIntroTitle: 'கஜபதிகள் காலத்து கலை மற்றும் இலக்கிய மறுமலர்ச்சி',
    cultureIntroDesc:
      'சாரளா தாசரின் மகாபாரதம், சரஸ்வதி விலாசம் சட்ட நூல் மற்றும் புரி கோயில் மதில் சுவர் ஆகியவை இக்காலத்தில் உருவாக்கப்பட்டன.',
    titlesSectionLabel: 'அரச பட்டங்கள் மற்றும் விருதுகள்',
    eventsSectionLabel: 'வரலாற்று நிகழ்வுகள்',
    placesSectionLabel: 'தொடர்புடைய கோட்டைகள் மற்றும் தலங்கள்',
    dynastyMetaLabel: 'வம்சம்',
    reignMetaLabel: 'ஆட்சிக் காலம்',
    datesMetaLabel: 'வரலாற்றுக் காலம்',
    capitalMetaLabel: 'தலைநகரம்',
    regionMetaLabel: 'முதன்மைப் பகுதி'
  },
  mr: {
    monarchsHeading: 'सार्वभौम सूर्यवंशी गजपती आणि ओडिशाचे सम्राट',
    monarchsSubheading:
      'कोणत्याही सम्राटाचे संपूर्ण चरित्र, कारकीर्द, राजकीय पदव्या आणि शिलालेखीय पुरावे पाहण्यासाठी कार्ड किंवा बटणावर क्लिक करा.',
    viewProfileBtn: 'संपूर्ण माहिती पहा',
    viewRecordBtn: 'संपूर्ण नोंद पहा',
    readArticleBtn: 'संपूर्ण संशोधन लेख वाचा',
    viewInscriptionBtn: 'शिलालेख माहिती पहा',
    dynastiesHeading: 'ओड्र आणि कलिंगाचे साम्राज्यवादी राजवंश',
    dynastiesSubheading:
      'पूर्व गंग आणि सूर्यवंशी गजपतींपासून दक्षिणेकडील क्षत्रिय घराण्यांपर्यंतचा ऐतिहासिक वारसा.',
    articlesHeading: 'गजपती ऐतिहासिक संशोधन लेख व ग्रंथ',
    articlesSubheading:
      'सूर्यवंशी गजपती साम्राज्य, लष्करी मोहिमा आणि ताम्रपटांवरील सखोल ऐतिहासिक अभ्यास.',
    inscriptionsHeading: 'प्रमुख राजकीय ताम्रपट आणि मंदिर शिलालेख',
    inscriptionsSubheading:
      'गजपती सम्राटांची कारकीर्द, पदव्या आणि भूमिदानाची साक्ष देणारे मूळ शिलालेख.',
    adminIntroTitle: 'साम्राज्य प्रशासन आणि लष्करी-सरंजामशाही रचना',
    adminIntroDesc:
      'सूर्यवंशी राज्याचा कारभार दंडपाट (प्रांत) आणि अभेद्य किल्ल्यांच्या माध्यमातून चालवला जात असे. सम्राट स्वतःला भगवान जगन्नाथाचे सेवक (राउतराय) मानून राज्य करत.',
    militaryIntroTitle: 'लष्करी संघटन आणि गजसेना (युद्ध हत्ती दल)',
    militaryIntroDesc:
      'मध्ययुगीन भारतात १,००० ते २,५०० युद्ध हत्तींचे विशाल गजदल आणि पराक्रमी पायदळासाठी गजपती सैन्य प्रसिद्ध होते.',
    militaryFindspotsLabel: 'शिलालेख प्राप्ती स्थळे:',
    militaryFindspotsText:
      'बंगालमधील हुगळी नदीपासून ओडिशा, द्राक्षाराम, कोंडावीडु, श्रीशैलम, सिंहाचलम आणि कावेरीकाठच्या श्रीरंगमपर्यंत गजपती शिलालेख आढळतात.',
    cultureIntroTitle: 'गजपती काळातील सांस्कृतिक आणि साहित्यिक पुनर्जागरण',
    cultureIntroDesc:
      'या काळात सारला दास यांचे ओडिया महाभारत, सरस्वती विलास हा विधी ग्रंथ आणि पुरी मंदिराची मेघनाद पाचेरी तटबंदी निर्माण झाली.',
    titlesSectionLabel: 'राजकीय पदव्या आणि प्रशस्ती',
    eventsSectionLabel: 'ऐतिहासिक घडामोडी',
    placesSectionLabel: 'संबंधित किल्ले आणि पवित्र स्थळे',
    dynastyMetaLabel: 'राजवंश',
    reignMetaLabel: 'शासनकाळ',
    datesMetaLabel: 'ऐतिहासिक काळ',
    capitalMetaLabel: 'राजधानी',
    regionMetaLabel: 'मूळ प्रदेश'
  },
  or: {
    monarchsHeading: 'ସାର୍ବଭୌମ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ଓ ଓଡ଼ିଶାର ସମ୍ରାଟবৃନ୍ଦ',
    monarchsSubheading:
      'ଯেকୌଣସି ସମ୍ରାଟଙ୍କ ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନୀ, ଶାସନ କାଳର ଘଟଣାବଳୀ, ରାଜକୀୟ ଉପାଧି ଏବଂ ଶିଳାଲେଖ ପ୍ରମାଣ ଦେଖିବା ପାଇଁ କାର୍ଡ ବା ବଟନ୍ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
    viewProfileBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ଦେଖନ୍ତୁ',
    viewRecordBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଅଭିଲେଖ ଦେଖନ୍ତୁ',
    readArticleBtn: 'ସମ୍ପୂର୍ଣ୍ଣ ଗବେଷଣା প্রବନ୍ଧ ପଢ଼ନ୍ତୁ',
    viewInscriptionBtn: 'ଶିଳାଲେଖ ବିବରଣୀ ଦେଖନ୍ତୁ',
    dynastiesHeading: 'ଓଡ଼୍ର ଓ କଳିଙ୍ଗର ସାମ୍ରାଜ୍ୟବାଦୀ ରାଜବଂଶ',
    dynastiesSubheading:
      'ପୂର୍ବ ଗଙ୍ଗ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଙ୍କଠାରୁ ଆରମ୍ଭ କରି କ୍ଷତ୍ରିୟ ରାଜବଂଶ ପର୍ଯ୍ୟନ୍ତ ପ୍ରାମାଣିକ ଇତିହାସ।',
    articlesHeading: 'ଗଜପତି ଐତିହାସିକ ଗବେଷଣା ପ୍ରବନ୍ଧ ଓ ମୋନୋଗ୍ରାଫ୍',
    articlesSubheading:
      'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ, ଦକ୍ଷିଣ ଦିଗ୍‌ବିଜୟ ଓ ତାମ୍ରଶାସନ ଉପରେ ବିସ୍ତୃତ ଗବେଷଣା।',
    inscriptionsHeading: 'ପ୍ରମୁଖ ରାଜକୀୟ ତାମ୍ରଶାସନ ଓ ମନ୍ଦିର ଶିଳାଲେଖ',
    inscriptionsSubheading:
      'ଗଜପତି ସମ୍ରାଟମାନଙ୍କର ଶାସନ ବର୍ଷ, ଉପାଧି ଓ ଦାନକୁ ପ୍ରମାଣିତ କରୁଥିବା ମୌଳିକ ଅଭିଲେଖ।',
    adminIntroTitle: 'ସାମ୍ରାଜ୍ୟ ପ୍ରଶାସନ ଓ ସାମରିକ-ସାମନ୍ତ ବ୍ୟବସ୍ଥା',
    adminIntroDesc:
      'ସୂର୍ଯ୍ୟବଂଶୀ ରାଷ୍ଟ୍ର ଏକ ସୁসংଗଠିତ ଦଣ୍ଡপাଟ (ପ୍ରଦେଶ) ଓ ଦୁର୍ଗ ବ୍ୟବସ୍ଥା ମାଧ୍ୟମରେ ପରିଚାଳିତ ହେଉଥିଲା। ସମ୍ରାଟ ମହାପ୍ରଭୁ ଶ୍ରୀଜଗନ୍ନାଥଙ୍କ ରାଉତ (ପ୍ରତିନିଧି) ଭାବେ ଶାସନ କରୁଥିଲେ।',
    militaryIntroTitle: 'ସାମରିକ ସଂଗଠନ ଓ ଗଜସେନା (ଯୁଦ୍ଧ ହସ୍ତୀ ବାହିନୀ)',
    militaryIntroDesc:
      'ଗଜପତି ସେନା ମଧ୍ୟଯୁଗୀୟ ଭାରତରେ ୧,୦୦୦ ରୁ ୨,୫୦୦ ଯୁଦ୍ଧ ହସ୍ତୀ বিশিଷ୍ଟ ଅജେୟ ଗଜସେନା ଏବଂ ବୀର ପାଇକ ଓ ଓଡ଼ିଆ କ୍ଷତ୍ରିୟ ବାହିନୀ ପାଇଁ ପ୍ରସିଦ୍ଧ ଥିଲା।',
    militaryFindspotsLabel: 'ଶିଳାଲେଖ ପ୍ରାପ୍ତି ସ୍ଥାନ:',
    militaryFindspotsText:
      'ବଙ୍ଗର ହୁଗୁଳି ନଦୀ କୂଳରୁ ଓଡ଼ିଶା, ଦ୍ରାକ୍ଷାରାମ, କୋଣ୍ଡାଭିଡୁ, ଶ୍ରୀଶୈଳମ, ସିଂହାଚଳମ ଏବଂ କାବେରୀ ତଟସ୍ଥ ଶ୍ରୀରଙ୍ଗମ ପର୍ଯ୍ୟନ୍ତ ଗଜପତି ଶିଳାଲେଖ ବିସ୍ତୃତ।',
    cultureIntroTitle: 'ଗଜପତି ଯୁଗରେ ସାଂସ୍କୃତିକ, ସାହିତ୍ୟିକ ଓ ସ୍ଥାପତ୍ୟ ଜାଗରଣ',
    cultureIntroDesc:
      'ସୂର୍ଯ୍ୟବଂଶୀ ଶାସନ କାଳରେ ଆଦିକବି ସାରଳା ଦାସଙ୍କ ଓଡ଼ିଆ ମହାଭାରତ, ସରସ୍ୱତୀ ବିଳାସ ଗ୍ରନ୍ଥ ଓ ପୁରୀ ଶ୍ରୀମନ୍ଦିରର ମେଘନାଦ ପାଚେରୀ ନିର୍ମିତ ହୋଇଥିଲା।',
    titlesSectionLabel: 'ରାଜକୀୟ ଉପାଧି ଓ ପ୍ରଶସ୍ତି',
    eventsSectionLabel: 'କାଳକ୍ରମିକ ଐତିହାସିକ ଘଟଣାବଳୀ',
    placesSectionLabel: 'ସম্পୃକ୍ତ ରାଜଧାନୀ, ଦୁର୍ଗ ଓ ପବିତ୍ର କ୍ଷେତ୍ର',
    dynastyMetaLabel: 'ରାଜବଂଶ',
    reignMetaLabel: 'ଶାସନ କାଳ',
    datesMetaLabel: 'ଐତିହାସିକ ସମୟ',
    capitalMetaLabel: 'ରାଜଧାନୀ',
    regionMetaLabel: 'ମୂଳ କ୍ଷେତ୍ର'
  },
  bn: {
    monarchsHeading: 'সার্বভৌম সূর্যবংশীয় গজপতি ও উড়িষ্যার সম্রাটবৃন্দ',
    monarchsSubheading:
      'যেকোনো সম্রাটের সম্পূর্ণ জীবনী, রাজত্বকালের ঘটনা, রাজকীয় উপাধি এবং শিলালিপি প্রমাণ দেখতে কার্ড বা বোতামে ক্লিক করুন।',
    viewProfileBtn: 'সম্পূর্ণ বিবরণ দেখুন',
    viewRecordBtn: 'সম্পূর্ণ নথি দেখুন',
    readArticleBtn: 'সম্পূর্ণ গবেষণা প্রবন্ধ পড়ুন',
    viewInscriptionBtn: 'শিলালিপি বিবরণ দেখুন',
    dynastiesHeading: 'ওড্র ও কলিঙ্গের সাম্রাজ্যবাদী রাজবংশ',
    dynastiesSubheading:
      'পূর্ব গঙ্গ ও সূর্যবংশীয় গজপতি থেকে শুরু করে আঞ্চলিক ক্ষত্রিয় রাজবংশের প্রামাণ্য ইতিহাস।',
    articlesHeading: 'গজপতি ঐতিহাসিক গবেষণা প্রবন্ধ ও মনোগ্রাফ',
    articlesSubheading:
      'সূর্যবংশীয় গজপতি সাম্রাজ্য, সামরিক অভিযান ও তাম্রশাসনের ওপর বিস্তারিত গবেষণা।',
    inscriptionsHeading: 'প্রধান রাজকীয় তাম্রশাসন ও মন্দির শিলালিপি',
    inscriptionsSubheading:
      'গজপতি সম্রাটদের রাজত্বকাল, উপাধি ও ভূমিদান প্রমাণকারী মৌলিক শিলালিপি।',
    adminIntroTitle: 'সাম্রাজ্যিক প্রশাসন ও সামরিক-সামন্ত কাঠামো',
    adminIntroDesc:
      'সূর্যবংশীয় রাষ্ট্র দণ্ডপাট (প্রদেশ) ও দুর্গের মাধ্যমে পরিচালিত হতো। সম্রাট নিজেকে প্রভু জগন্নাথের সেবক-প্রতিনিধি (রাউতরায়) রূপে গণ্য করে শাসন পরিচালনা করতেন।',
    militaryIntroTitle: 'সামরিক সংগঠন ও গজসেনা (যুদ্ধহস্তী বাহিনী)',
    militaryIntroDesc:
      'মধ্যযুগীয় ভারতে ১,০০০ থেকে ২,৫০০ যুদ্ধহস্তীর বিশাল গজসেনা এবং বীর পাইক ও ওড্র-ক্ষত্রিয় পদাতিক বাহিনীর জন্য গজপতি সেনাবাহিনী সুবিখ্যাত ছিল।',
    militaryFindspotsLabel: 'শিলালিপি প্রাপ্তিস্থান:',
    militaryFindspotsText:
      'বাংলার হুগলি নদীর তীর থেকে উড়িষ্যা, দ্রাক্ষারাম, কোন্ডাভিডু, শ্রীশৈলম, সিংহাচলম এবং কাবেরী তীরের শ্রীরঙ্গম পর্যন্ত গজপতি শিলালিপি বিস্তৃত।',
    cultureIntroTitle: 'গজপতি যুগে সাংস্কৃতিক, সাহিত্যিক ও স্থাপত্য নবজাগরণ',
    cultureIntroDesc:
      'সূর্যবংশীয় যুগে সারলা দাসের ওড়িয়া মহাভারত, সরস্বতী বিলাস আইনগ্রন্থ এবং পুরী মন্দিরের মেঘনাদ প্রাচীর নির্মিত হয়।',
    titlesSectionLabel: 'রাজকীয় উপাধি ও প্রশস্তি',
    eventsSectionLabel: 'কালানুক্রমিক ঐতিহাসিক ঘটনা',
    placesSectionLabel: 'সংশ্লিষ্ট রাজধানী, দুর্গ ও পবিত্র ক্ষেত্র',
    dynastyMetaLabel: 'রাজবংশ',
    reignMetaLabel: 'রাজত্বকাল',
    datesMetaLabel: 'ঐতিহাসিক সময়কাল',
    capitalMetaLabel: 'রাজধানী',
    regionMetaLabel: 'মূল অঞ্চল'
  }
};

const GAJAPATHI_DOSSIERS: LocalizedDossier[] = [
  {
    id: 'admin-mahapatras',
    tab: 'administration',
    era: {
      en: '1434 – 1541 CE',
      hi: '1434 – 1541 ईस्वी',
      te: '1434 – 1541 క్రీ.శ.',
      kn: '1434 – 1541 ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 1434 – 1541',
      mr: '१४३४ – १५४१ इ.स.',
      or: '୧୪୩୪ – ୧୫୪୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৪৩৪ – ১৫৪১ খ্রিস্টাব্দ'
    },
    badge: {
      en: 'Documented Administrative Record',
      hi: 'प्रामाणिक प्रशासनिक अभिलेख',
      te: 'ధృవీకరించబడిన పరిపాలనా రికార్డు',
      kn: 'ದಾಖಲಿತ ಆಡಳಿತಾತ್ಮಕ ದಾಖಲೆ',
      ta: 'ஆவணப்படுத்தப்பட்ட நிர்வாகப் பதிவு',
      mr: 'नोंदणीकृत प्रशासकीय अभिलेख',
      or: 'ପ୍ରାମାଣିକ ପ୍ରଶାସନିକ ଅଭିଲେଖ',
      bn: 'প্রামাণ্য প্রশাসনিক নথি'
    },
    title: {
      en: 'Mahapatras & Provincial Ministers (Dandapata System)',
      hi: 'महापात्र एवं प्रांतीय मंत्री (दंडपाट प्रणाली)',
      te: 'మహాపాత్రులు & ప్రాంతీయ మంత్రులు (దండపాట వ్యవస్థ)',
      kn: 'ಮಹಾಪಾತ್ರರು ಮತ್ತು ಪ್ರಾಂತೀಯ ಮಂತ್ರಿಗಳು (ದಂಡಪಾಟ ವ್ಯವಸ್ಥೆ)',
      ta: 'மகாபாத்திரர்கள் & மாகாண அமைச்சர்கள் (தண்டபாட முறை)',
      mr: 'महापात्र आणि प्रांतीय मंत्री (दंडपाट पद्धती)',
      or: 'ମହାପାତ୍ର ଓ ପ୍ରାଦେଶିକ ମନ୍ତ୍ରୀ (ଦଣ୍ଡପାଟ ପ୍ରଣାଳୀ)',
      bn: 'মহাপাত্র ও প্রাদেশিক মন্ত্রীবর্গ (দণ্ডপাট ব্যবস্থা)'
    },
    subtitle: {
      en: 'Imperial Suryavamshi Gajapathi Provincial Governance',
      hi: 'सूर्यवंशी गजपति प्रांतीय शासन व्यवस्था',
      te: 'సూర్యవంశ గజపతి సామ్రాజ్య రాష్ట్ర పరిపాలనా విధానం',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಪ್ರಾಂತೀಯ ಆಡಳಿತ ವ್ಯವಸ್ಥೆ',
      ta: 'சூரியவம்ச கஜபதி மாகாண நிர்வாக அமைப்பு',
      mr: 'सूर्यवंशी गजपती प्रांतीय शासन प्रणाली',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ପ୍ରାଦେଶିକ ଶାସନ ବ୍ୟବସ୍ଥା',
      bn: 'সূর্যবংশীয় গজপতি প্রাদেশিক শাসন ব্যবস্থা'
    },
    summary: {
      en: 'Chief administrators governing territorial provinces (Dandapata) such as Kalinga Dandapata, Kondavidu Dandapata, Rajahmundry, and Dakshina Rajya.',
      hi: 'कलिंग दंडपाट, कोंडावीडु दंडपाट, राजमहेंद्रवरम और दक्षिण राज्य जैसे विशाल प्रांतों (दंडपाट) का संचालन करने वाले सर्वोच्च मंत्री एवं प्रशासक।',
      te: 'కళింగ దండపాట, కొండవీడు దండపాట, రాజమహేంద్రవరం మరియు దక్షిణ రాజ్యాల వంటి విశాల ప్రావిన్సులను (దండపాటలను) పాలించిన ప్రధాన మంత్రులు మరియు పరిపాలకులు.',
      kn: 'ಕಳಿಂಗ ದಂಡಪಾಟ, ಕೊಂಡವೀಡು ದಂಡಪಾಟ ಮತ್ತು ದಕ್ಷಿಣ ರಾಜ್ಯದಂತಹ ಪ್ರಾಂತ್ಯಗಳನ್ನು ಆಳುತ್ತಿದ್ದ ಮುಖ್ಯ ಆಡಳಿತಾಧಿಕಾರಿಗಳು.',
      ta: 'கலிங்க தண்டபாடம், கொண்டவீடு தண்டபாடம் மற்றும் தட்சிண ராஜ்யம் ஆகிய மாகாணங்களை நிர்வகித்த முதன்மை அமைச்சர்கள்.',
      mr: 'कलिंग दंडपाट, कोंडावीडु दंडपाट आणि दक्षिण राज्य यांसारख्या प्रांतांचे प्रशासन पाहणारे मुख्य मंत्री.',
      or: 'କଳିଙ୍ଗ ଦଣ୍ଡପାଟ, କୋଣ୍ଡାଭିଡୁ ଦଣ୍ଡପାଟ, ରାଜମହେନ୍ଦ্রী ଓ ଦକ୍ଷିଣ ରାଜ୍ୟ ଭଳି ବିଶାଳ ପ୍ରଦେଶର ଶାସନ ପରିଚାଳନା କରୁଥିବା ମୁଖ୍ୟ ମନ୍ତ୍ରୀ ଓ ମହାପାତ୍ର।',
      bn: 'কলিঙ্গ দণ্ডপাট, কোন্ডাভিডু দণ্ডপাট, রাজমাহেন্দ্রী ও দক্ষিণ রাজ্যের মতো প্রদেশ শাসনকারী প্রধান মন্ত্রী ও প্রশাসক।'
    },
    content: {
      en: 'The Suryavamshi state was administered through a hierarchical feudal-military apparatus. The king held supreme authority as Rautaraya (deputy of Lord Jagannatha), ensuring that political authority derived sacred legitimacy.\n\nUnder the monarch served senior ministers bearing titles such as Mahapatra, Patra, Sandhivigrahika (Minister of War and Peace), and Pariksha. The empire was divided into large revenue-cum-military provinces known as Dandapatas or Rajyas, including Varanasi Kataka, Kalinga Dandapata, Rajahmundry Rajya, Kondavidu Dandapata, and Udayagiri Rajya. Each Dandapata was further subdivided into Bisis (districts) and Khandas (sub-taluks), with village revenue records maintained by Karanas and protected by local Paika and Kshatriya garrisons.',
      hi: 'सूर्यवंशी गजपति राज्य का प्रशासन एक सुव्यवस्थित सैन्य-प्रशासनिक ढांचे पर आधारित था। सम्राट स्वयं को भगवान जगन्नाथ का "राउतराय" (प्रतिनिधि) मानते थे।\n\nसम्राट के अधीन महापात्र, पात्र, संधिविग्रहिक (युद्ध एवं शांति मंत्री), और परीक्षा जैसे वरिष्ठ मंत्री कार्य करते थे। संपूर्ण साम्राज्य को विशाल राजस्व एवं सैन्य प्रांतों में विभाजित किया गया था जिन्हें "दंडपाट" या "राज्य" कहा जाता था—जैसे वाराणसी कटक, कलिंग दंडपाट, राजमहेंद्रवरम राज्य, कोंडावीडु दंडपाट और उदयगिरि राज्य। प्रत्येक दंडपाट को बिसी (जिला) और खंड में विभाजित किया गया था।',
      te: 'సూర్యవంశ గజపతి సామ్రాజ్యం క్రమబద్ధమైన సైనిక-పరిపాలనా వ్యవస్థ ద్వారా నడిచేది. చక్రవర్తి తనను తాను శ్రీ జగన్నాథ స్వామికి "రౌతరాయ" (ప్రతినిధి/సేవకుడు)గా ప్రకటించుకున్నారు.\n\nచక్రవర్తి క్రింద మహాపాత్ర, పాత్ర, సంధివిగ్రహిక (యుద్ధ మరియు శాంతి మంత్రి), మరియు పరీక్ష వంటి ఉన్నత మంత్రులు పనిచేసేవారు. సామ్రాజ్యాన్ని భారీ రెవెన్యూ-సైనిక రాష్ట్రాలుగా (దండపాటలు లేదా రాజ్యాలుగా) విభజించారు—వాటిలో వారణాసి కటక, కళింగ దండపాట, రాజమహేంద్రవరం రాజ్యం, కొండవీడు దండపాట మరియు ఉదయగిరి రాజ్యం ప్రముఖమైనవి.',
      kn: 'ಸೂರ್ಯವಂಶಿ ಗಜಪತಿ ರಾಜ್ಯವು ಶ್ರೇಣೀಕೃತ ಸೇನಾ-ಆಡಳಿತ ವ್ಯವಸ್ಥೆಯನ್ನು ಹೊಂದಿತ್ತು. ಸಾಮ್ರಾಟನು ಶ್ರೀ ಜಗನ್ನಾಥನ "ರೌತರಾಯ" (ಪ್ರತಿನಿಧಿ) ಆಗಿ ಪರಮೋಚ್ಚ அதிகார ಹೊಂದಿದ್ದನು. ಸಾಮ್ರಾಜ್ಯವನ್ನು ಕಟಕ್, ಕಳಿಂಗ ದಂಡಪಾಟ, ರಾಜಮಹೇಂದ್ರವರಂ, ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ರಾಜ್ಯಗಳೆಂಬ ಪ್ರಾಂತ್ಯಗಳಾಗಿ ವಿಂಗಡಿಸಲಾಗಿತ್ತು.',
      ta: 'சூரியவம்ச கஜபதி பேரரசு மகாபாத்திரர், பாத்திரர், சந்திவிக்ரஹிகர் போன்ற அமைச்சர்களால் நிர்வகிக்கப்பட்டது. பேரரசு கட்டக், கலிங்க தண்டபாடம், ராஜமகேந்திரவரம், கொண்டவீடு மற்றும் உதயகிரி ராஜ்யம் ஆகிய மாகாணங்களாகப் பிரிக்கப்பட்டிருந்தது.',
      mr: 'सूर्यवंशी गजपती राज्याचा कारभार महापात्र, पात्र, संधिविग्रहिक आणि परीक्षा यांसारख्या वरिष्ठ मंत्र्यांच्या साहाय्याने चालवला जाई. साम्राज्य कटक, कलिंग दंडपाट, राजमहेंद्रवरम, कोंडावीडु आणि उदयगिरी राज्य अशा प्रांतांत विभागलेले होते.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଷ୍ଟ୍ର ଏକ ସୁସଂଗଠିତ ସାମରିକ-ପ୍ରଶାସନିକ ବ୍ୟବସ୍ଥା ଦ୍ୱାରା ପରିଚାଳିତ ହେଉଥିଲା। ସମ୍ରାଟ ନିଜକୁ ମହାପ୍ରଭୁ ଜଗନ୍ନାଥଙ୍କ "ରାଉତରାୟ" (ସେବକ-ପ୍ରତିନିଧି) ରୂପେ ଘୋଷଣା করেছিলেন।\n\nସମ୍ରାଟଙ୍କ অধୀନରେ ମହାପାତ୍ର, ପାତ୍ର, ସନ୍ଧିବିଗ୍ରହିକ ଓ ପରୀକ୍ଷା ଆଦି ବରିଷ୍ଠ ମନ୍ତ୍ରୀ କାର୍ଯ୍ୟ କରୁଥିଲେ। ସାମ୍ରାଜ୍ୟକୁ ବାରଣାସୀ କଟକ, କଳିଙ୍ଗ ଦଣ୍ଡପାଟ, ରାଜମହେନ୍ଦ୍ରୀ, କୋଣ୍ଡାଭିଡୁ ଦଣ୍ଡପାଟ ଓ ଉଦୟଗିରି ରାଜ୍ୟରେ ବିଭକ୍ତ କରାଯାଇଥିଲା।',
      bn: 'সূর্যবংশীয় গজপতি রাষ্ট্র মহাপাত্র, পাত্র, সন্ধিবিগ্রহিক ও পরীক্ষার মতো প্রবীণ মন্ত্রীদের দ্বারা পরিচালিত হতো। সাম্রাজ্যকে বারাণসী কটক, কলিঙ্গ দণ্ডপাট, রাজমাহেন্দ্রী, কোন্ডাভিডু দণ্ডপাট এবং উদয়গিরি রাজ্যে বিভক্ত করা হয়েছিল।'
    },
    sources: [
      'Veligalani Copper Plate Grant (1458 CE), Epigraphia Indica Vol. XXXIII',
      'R. Subrahmanyam, The Suryavamsi Gajapatis of Orissa (Andhra University, 1957)'
    ]
  },
  {
    id: 'admin-nayakas',
    tab: 'administration',
    era: {
      en: '1434 – 1541 CE',
      hi: '1434 – 1541 ईस्वी',
      te: '1434 – 1541 క్రీ.శ.',
      kn: '1434 – 1541 ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 1434 – 1541',
      mr: '१४३४ – १५४१ इ.स.',
      or: '୧୪୩୪ – ୧୫୪୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৪৩৪ – ১৫৪১ খ্রিস্টাব্দ'
    },
    badge: {
      en: 'Documented Military Record',
      hi: 'प्रामाणिक सैन्य अभिलेख',
      te: 'ధృవీకరించబడిన సైనిక రికార్డు',
      kn: 'ದಾಖಲಿತ ಸೇನಾ ದಾಖಲೆ',
      ta: 'ஆவணப்படுத்தப்பட்ட ராணுவப் பதிவு',
      mr: 'नोंदणीकृत लष्करी अभिलेख',
      or: 'ପ୍ରାମାଣିକ ସାମରିକ ଅଭିଲେଖ',
      bn: 'প্রামাণ্য সামরিক নথি'
    },
    title: {
      en: 'Nayakas & Fortress Commanders (Giri-Durga & Jala-Durga System)',
      hi: 'नायक एवं दुर्ग सेनापति (गिरि-दुर्ग व जल-दुर्ग प्रणाली)',
      te: 'నాయకులు & దుర్గ సేనాపతులు (గిరి-దుర్గ & జల-దుర్గ వ్యవస్థ)',
      kn: 'ನಾಯಕರು ಮತ್ತು ಕೋಟೆ ಸೇನಾಪತಿಗಳು (ದುರ್ಗ ವ್ಯವಸ್ಥೆ)',
      ta: 'நாயக்கர்கள் & கோட்டைத் தளபதிகள் (துர்க்க முறை)',
      mr: 'नायक आणि किल्लेदार सेनापती (दुर्ग व्यवस्था)',
      or: 'ନାୟକ ଓ ଦୁର୍ଗ ସେନାପତି (గిరి-ଦୁର୍ଗ ଓ ଜଳ-ଦୁର୍ଗ ପ୍ରଣାଳୀ)',
      bn: 'নায়ক ও দুর্গ সেনাপতি (গিরিদুর্গ ও জলদুর্গ ব্যবস্থা)'
    },
    subtitle: {
      en: 'Hereditary Kshatriya Military Governors & Fort Garrisons',
      hi: 'वंशानुगत क्षत्रिय सैन्य गवर्नर एवं दुर्ग रक्षक',
      te: 'వంశపారంపర్య క్షత్రియ సైనిక గవర్నర్లు & దుర్గ రక్షకులు',
      kn: 'ವಂಶಪಾರಂಪರ್ಯ ಕ್ಷತ್ರಿಯ ಸೇನಾ ರಾಜ್ಯಪಾಲರು',
      ta: 'மரபுவழி சத்திரிய ராணுவ ஆளுநர்கள்',
      mr: 'वंशपरंपरागत क्षत्रिय लष्करी राज्यपाल व किल्लेदार',
      or: 'ବଂଶାନୁକ୍ରମିକ କ୍ଷତ୍ରିୟ ସାମରିକ ଶାସକ ଓ ଦୁର୍ଗ ରକ୍ଷକ',
      bn: 'বংশানুক্রমিক ক্ষত্রিয় সামরিক গভর্নর ও দুর্গ রক্ষক'
    },
    summary: {
      en: 'Hereditary Kshatriya military governors stationed in key mountain and water forts (Durgas) such as Barabati, Udayagiri, Kondapalli, Kondavidu, Bellamkonda, and Kolletikota.',
      hi: 'बाराबती, उदयगिरि, कोंडापल्ली, कोंडावीडु, बेल्लमकोंडा और कोल्लेतिकोटा जैसे प्रमुख पर्वतीय एवं जल दुर्गों में नियुक्त वंशानुगत क्षत्रिय सेनापति।',
      te: 'బారాబటి, ఉదయగిరి, కొండపల్లి, కొండవీడు, బెల్లంకొండ మరియు కొల్లేటికోట వంటి కీలక గిరి మరియు జల దుర్గాలలో నియమించబడిన వంశపారంపర్య క్షత్రియ దుర్గాధిపతులు.',
      kn: 'ಬಾರಾಬತಿ, ಉದಯಗಿರಿ, ಕೊಂಡپಲ್ಲಿ, ಕೊಂಡವೀಡು ಮತ್ತು ಬೆಲ್ಲಂಕೊಂಡ ಕೋಟೆಗಳಲ್ಲಿ ನೇಮಕಗೊಂಡಿದ್ದ ಕ್ಷತ್ರಿಯ ಸೇನಾಪತಿಗಳು.',
      ta: 'பாராபதி, உதயகிரி, கொண்டபல்லி, கொண்டவீடு மற்றும் பெல்லம்கொண்டா கோட்டைகளில் பணியாற்றிய சத்திரிய தளபதிகள்.',
      mr: 'बाराबती, उदयगिरी, कोंडापल्ली, कोंडावीडु आणि बेल्लमकोंडा यांसारख्या किल्ल्यांवर नियुक्त क्षत्रिय सेनापती.',
      or: 'ବାରବାଟୀ, ଉଦୟଗିରି, କୋଣ୍ଡାପଲ୍ଲୀ, କୋଣ୍ଡାଭିଡୁ, ବେଲ୍ଲମକୋଣ୍ଡା ଓ କୋଲ୍ଲେତିକୋଟା ଦୁର୍ଗରେ ନିୟୋଜିତ କ୍ଷତ୍ରିୟ ଦୁର୍ଗপতি।',
      bn: 'বারাবাটি, উদয়গিরি, কোন্ডাপল্লী, কোন্ডাভিডু, বেল্লামকোন্ডা ও কোল্লেতিকোটা দুর্গে নিযুক্ত ক্ষত্রিয় দুর্গপতি।'
    },
    content: {
      en: 'Strategic hill forts (Giri-durgas) and island aquatic forts (Jala-durgas) across Odisha, Telangana, Andhra Pradesh, and Karnataka were entrusted to royal princes (Kumara Mahapatras) and hereditary Suryavamsha Odiyaraju Kshatriya fortress commanders (Nayakas, सामंत/Samantas, and Behera-Mahapatras).\n\nMajor fortresses included Barabati (Cuttack), Kondapalli, Kondavidu, Vinukonda, Bellamkonda, Addanki, Udayagiri, Kolletikota (Kolleru Lake), and Chandragiri. These commanders maintained standing regiments of infantry, cavalry, and elephant squadrons, and after the 16th century their descendants remained prominent landholding Kshatriya families (OddeRajulu / VaddeRajulu / Odiyaraju) across the Deccan and southern India.',
      hi: 'ओडिशा, तेलंगाना, आंध्र प्रदेश और कर्नाटक के सामरिक पर्वतीय दुर्गों (गिरि-दुर्ग) और जल-दुर्गों की कमान राजकुमारों (कुमार महापात्र) और वंशानुगत सूर्यवंशी ओडियाराजू क्षत्रिय सेनापतियों (नायक और बेहेरा-महापात्र) को सौंपी गई थी।\n\nप्रमुख दुर्गों में बाराबती (कटक), कोंडापल्ली, कोंडावीडु, विनुकोंडा, बेल्लमकोंडा, अद्दंकी, उदयगिरि, कोल्लेतिकोटा और चंद्रगिरि शामिल थे। इन सेनापतियों के वंशज आगे चलकर दक्कन और दक्षिण भारत में ओडियाराजू / वड्डेराजुलु / ओड-क्षत्रिय परिवारों के रूप में स्थापित हुए।',
      te: 'ఒడిశా, తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు కర్ణాటకలోని వ్యూహాత్మక గిరి దుర్గాలు మరియు జల దుర్గాల రక్షణ బాధ్యతలను రాజకుమారులకు (కుమార మహాపాత్రులకు) మరియు వంశపారంపర్య సూర్యవంశ ఒడియరాజు క్షత్రియ సేనాపతులకు (నాయకులు, బెహెరా-మహాపాత్రులకు) అప్పగించారు.\n\nబారాబటి (కటక్), కొండపల్లి, కొండవీడు, వినుకొండ, బెల్లంకొండ, అద్దంకి, ఉదయగిరి, కొల్లేటికోట మరియు చంద్రగిరి ప్రధాన దుర్గాలుగా ఉండేవి. ఈ సేనాపతుల వారసులే దక్షిణ భారతదేశంలో ఒడియరాజులు / వడ్డేరాజులు / ఓడ్-క్షత్రియ కుటుంబాలుగా స్థిరపడ్డారు.',
      kn: 'ಒಡಿಶಾ, ಆಂಧ್ರಪ್ರದೇಶ ಮತ್ತು ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಗಿರಿ-ದುರ್ಗ ಮತ್ತು ಜಲ-ದುರ್ಗಗಳನ್ನು ರಾಜಕುಮಾರರು (ಕುಮಾರ ಮಹಾಪಾತ್ರ) ಮತ್ತು ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ಸೇನಾಪತಿಗಳು ರಕ್ಷಿಸುತ್ತಿದ್ದರು. ಬಾರಾಬತಿ, ಕೊಂಡಪಲ್ಲಿ, ಕೊಂಡವೀಡು, ಬೆಲ್ಲಂಕೊಂಡ, ಉದಯಗಿರಿ ಮತ್ತು ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪ್ರಮುಖ ಕೋಟೆಗಳಾಗಿದ್ದವು.',
      ta: 'ஒடிசா, ஆந்திரா மற்றும் தமிழக எல்லை வரையிலான மலைக்கோட்டைகள் (கிரி-துர்க்கம்) மற்றும் நீர் அரண்கள் (ஜல-துர்க்கம்) சூரியவம்ச ஒடியாராஜு சத்திரிய தளபதிகளிடம் ஒப்படைக்கப்பட்டிருந்தன. பாராபதி, கொண்டவீடு, உதயகிரி, சந்திரகிரி ஆகியவை முக்கிய கோட்டைகளாகும்.',
      mr: 'ओडिशा, आंध्र प्रदेश आणि कर्नाटकातील महत्त्वाचे गिरीदुर्ग आणि जलदुर्ग राजपुत्र (कुमार महापात्र) आणि सूर्यवंशी ओडियाराजू क्षत्रिय किल्लेदारांच्या ताब्यात होते. बाराबती, कोंडापल्ली, कोंडावीडु, उदयगिरी आणि कोल्लेतिकोटा हे प्रमुख किल्ले होते.',
      or: 'ଓଡ଼ିଶା, ଆନ୍ଧ୍ରପ୍ରଦେଶ ଓ କର୍ଣ୍ଣାଟକର ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଗିରି-ଦୁର୍ଗ ଓ ଜଳ-ଦୁର୍ଗଗୁଡ଼ିକ ରାଜକୁମାର (କୁମାର ମହାପାତ୍ର) ଏବଂ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ସେନାପତିମାନଙ୍କ ଅଧୀନରେ ଥିଲା। ବାରବାଟୀ, କୋଣ୍ଡାପଲ୍ଲୀ, କୋଣ୍ଡାଭିଡୁ, ବେଲ୍ଲମକୋଣ୍ଡା, ଉଦୟଗିରି ଓ କୋଲ୍ଲେତିକୋଟା ପ୍ରମୁଖ ଦୁର୍ଗ ଥିଲା।',
      bn: 'উড়িষ্যা, অন্ধ্রপ্রদেশ ও কর্ণাটকের কৌশলগত গিরিদুর্গ ও জলদুর্গগুলি রাজকুমার (কুমার মহাপাত্র) এবং সূর্যবংশীয় ওড়িয়ারাজু ক্ষত্রিয় সেনাপতিদের অধীনে ছিল। বারাবাটি, কোন্ডাপল্লী, কোন্ডাভিডু, উদয়গিরি ও কোল্লেতিকোটা ছিল অন্যতম প্রধান দুর্গ।'
    },
    sources: [
      'South Indian Inscriptions (SII), Vols. IV–VI & X',
      'Epigraphia Carnatica, Vol. VII (Malebennur Inscription of Prince Virabhadra Deva, 1516 CE)'
    ]
  },
  {
    id: 'military-gajasena',
    tab: 'military',
    era: {
      en: '15th – 16th Century CE',
      hi: '15वीं – 16वीं शताब्दी ईस्वी',
      te: '15వ – 16వ శతాబ్దం క్రీ.శ.',
      kn: '15ನೇ – 16ನೇ ಶತಮಾನ ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 15 – 16 ஆம் நூற்றாண்டு',
      mr: '१५ वे – १६ वे शतक इ.स.',
      or: '୧୫ଶ – ୧୬ଶ ଶତାବ୍ଦୀ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৫শ – ১৬শ শতাব্দী খ্রিস্টাব্দ'
    },
    badge: {
      en: 'Verified Epigraphic & Chronicle Record',
      hi: 'प्रमाणित शिलालेख एवं ऐतिहासिक विवरण',
      te: 'ధృవీకరించబడిన శాసన & చారిత్రక ఆధారం',
      kn: 'ದೃಢೀಕೃತ ಶಾಸನ ಮತ್ತು ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
      ta: 'உறுதிப்படுத்தப்பட்ட கல்வெட்டு மற்றும் வரலாற்று ஆவணம்',
      mr: 'प्रमाणित शिलालेख आणि ऐतिहासिक नोंद',
      or: 'ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ଐତିହାସିକ ବିବରଣୀ',
      bn: 'প্রমাণিত শিলালিপি ও ঐতিহাসিক বিবরণ'
    },
    title: {
      en: 'Military Organisation & The Gajasena (War Elephant Corps)',
      hi: 'सैन्य संगठन एवं गजसेना (युद्ध हस्ति दल)',
      te: 'సైనిక వ్యవస్థ & గజసేన (యుద్ధ ఏనుగుల దళం)',
      kn: 'ಸೇನಾ ಸಂಘಟನೆ ಮತ್ತು ಗಜಸೇನೆ (ಯುದ್ಧ ಆನೆಗಳ ಪಡೆ)',
      ta: 'ராணுவ அமைப்பு மற்றும் கஜசேனை (போர் யானைப்படை)',
      mr: 'लष्करी संघटन आणि गजसेना (युद्ध हत्ती दल)',
      or: 'ସାମରିକ ସଂଗଠନ ଓ ଗଜସେନା (ଯୁଦ୍ଧ ହସ୍ତୀ ବାହିନୀ)',
      bn: 'সামরিক সংগঠন ও গজসেনা (যুদ্ধহস্তী বাহিনী)'
    },
    subtitle: {
      en: 'Imperial Gajapathi Armed Forces from the Ganges to the Kaveri',
      hi: 'गंगा से कावेरी तक सूर्यवंशी गजपति सशस्त्र सेनाएं',
      te: 'గంగా నది నుండి కావేరి వరకు సూర్యవంశ గజపతి సాయుధ దళాలు',
      kn: 'ಗಂಗಾ ನದಿಯಿಂದ ಕಾವೇರಿವರೆಗೆ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸೇನಾ ಪಡೆಗಳು',
      ta: 'கங்கை முதல் காவிரி வரை சூரியவம்ச கஜபதி ஆயுதப்படைகள்',
      mr: 'गंगा ते कावेरीपर्यंत सूर्यवंशी गजपती सशस्त्र सेना',
      or: 'ଗଙ୍ଗାଠାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସশସ୍ତ୍ର ବାହିନୀ',
      bn: 'গঙ্গা থেকে কাবেরী পর্যন্ত সূর্যবংশীয় গজপতি সশস্ত্র বাহিনী'
    },
    summary: {
      en: 'The Gajapathi emperors commanded 1,000 to 2,500 armored war elephants supported by elite Kshatriya commanders and hundreds of thousands of Paika infantrymen.',
      hi: 'गजपति सम्राटों के पास 1,000 से 2,500 कवचधारी युद्ध हाथियों की अजेय गजसेना और लाखों प्रशिक्षित क्षत्रिय व पाइक योद्धाओं की सेना थी।',
      te: 'గజపతి చక్రవర్తులు 1,000 నుండి 2,500 కవచధారిత యుద్ధ ఏనుగుల గజసేనను మరియు లక్షలాది మంది క్షత్రియ, పైక పదాతి యోధులను కలిగి ఉండేవారు.',
      kn: 'ಗಜಪತಿ ಚಕ್ರವರ್ತಿಗಳು 1,000 ದಿಂದ 2,500 ಕವಚಧಾರಿ ಯುದ್ಧ ಆನೆಗಳು ಮತ್ತು ಲಕ್ಷಾಂತರ ವೀರ ಪದಾತಿ ಸೈನಿಕರನ್ನು ಹೊಂದಿದ್ದರು.',
      ta: 'கஜபதி பேரரசர்கள் 1,000 முதல் 2,500 கவச போர் யானைகள் மற்றும் இலட்சக்கணக்கான காலாட்படை வீரர்களைக் கொண்டிருந்தனர்.',
      mr: 'गजपती सम्राटांकडे १,००० ते २,५०० चिलखती युद्ध हत्ती आणि लाखो प्रशिक्षित क्षत्रिय व पाइक योद्ध्यांचे सैन्य होते.',
      or: 'ଗଜପତି ସମ୍ରାଟମାନଙ୍କ ଅଧୀନରେ ୧,୦୦୦ ରୁ ୨,୫୦୦ ବর্মଧାରୀ ଯୁଦ୍ଧ ହସ୍ତୀ ଏବଂ ଲକ୍ଷ ଲକ୍ଷ ବୀର କ୍ଷତ୍ରିୟ ଓ ପାଇକ ଯୋଦ୍ଧା ଥିଲେ।',
      bn: 'গজপতি সম্রাটদের অধীনে ১,০০০ থেকে ২,৫০০ বর্মধারী যুদ্ধহস্তী এবং লক্ষ লক্ষ বীর ক্ষত্রিয় ও পাইক যোদ্ধা ছিল।'
    },
    content: {
      en: 'The very title "Gajapathi" (Lord of Elephants) signified imperial supremacy over the dense elephant forests of Odra and Kalinga. Medieval Persian chronicles (such as the Burhan-i-Maasir and Tabakat-i-Akbari) and Portuguese traveler accounts (Fernao Nuniz) attest that the Gajapathi monarch fielded between 1,000 and 2,500 war elephants equipped with iron tower-howdahs and tusk-swords, backed by over 200,000 infantry archers and sword divisions.\n\nEpigraphic Findspots: Verified Gajapathi military inscriptions stretch continuously from the banks of the Hooghly in Bengal (Triveni and Mandaran), through Cuttack, Puri, and Bhubaneswar, down to Simhachalam, Draksharama, Kondapalli, Kondavidu, Srisailam, Udayagiri, and Srirangam in the Kaveri River basin.',
      hi: '"गजपति" (हाथियों के अधिपति) की उपाधि ओड्र और कलिंग के घने वनों की अजेय हस्ति-शक्ति का प्रतीक थी। मध्यकालीन फारसी इतिहासकारों (बुरहान-ए-मासिर, फरिश्ता) और पुर्तगाली यात्री फर्नाओ नूनिज़ के विवरणों के अनुसार गजपति सम्राट के पास 1,000 से 2,500 कवचधारी युद्ध हाथी और 2,00,000 से अधिक धनुर्धर व खड्गधारी योद्धा थे।\n\nशिलालेख प्राप्ति-स्थल: गजपति सैन्य शिलालेख बंगाल की हुगली नदी से लेकर कटक, पुरी, सिंहाचलम, द्राक्षाराम, कोंडापल्ली, कोंडावीडु, श्रीशैलम, उदयगिरि और कावेरी तट के श्रीरंगम मंदिर तक प्राप्त हुए हैं।',
      te: '"గజపతి" (గజసైన్యాధిపతి) అనే బిరుదు ఓడ్ర మరియు కళింగ అరణ్యాలలోని అజేయ ఏనుగుల దళాధిపత్యానికి ప్రతీక. మధ్యయుగ పర్షియన్ చరిత్రకారులు (బుర్హాన్-ఇ-మాసిర్, ఫెరిష్టా) మరియు పోర్చుగీస్ యాత్రికుడు ఫెర్నావో నునిజ్ రచనల ప్రకారం గజపతి చక్రవర్తి సైన్యంలో ఇనుప కవచాలు ధరించిన 1,000 నుండి 2,500 యుద్ధ ఏనుగులు మరియు 2,00,000 మందికి పైగా విలుకాళ్లు, ఖడ్గవీరులు ఉండేవారు.\n\nశాసన ఆధార ప్రదేశాలు: బెంగాల్‌లోని హుగ్లీ నది (త్రివేణి) నుండి కటక్, పూరి, సింహాచలం, ద్రాక్షారామం, కొండపల్లి, కొండవీడు, శ్రీశైలం, ఉదయగిరి మరియు కావేరీ నదీ తీరంలోని శ్రీరంగం వరకు గజపతుల విజయ శాసనాలు లభించాయి.',
      kn: '"ಗಜಪತಿ" (ಆನೆಗಳ ಒಡೆಯ) ಎಂಬ ಬಿರುದು ಓಡ್ರ ಮತ್ತು ಕಳಿಂಗದ ಬೃಹತ್ ಯುದ್ಧ ಆನೆಗಳ ಸೈನ್ಯದ ಸಂಕೇತವಾಗಿತ್ತು. ಪರ್ಷಿಯನ್ ಇತಿಹಾಸಕಾರರು ಮತ್ತು ಪೋರ್ಚುಗೀಸ್ ಪ್ರವಾಸಿ ಫೆರ್ನಾವೊ ನುನಿಜ್ ಪ್ರಕಾರ ಗಜಪತಿ ಸೈನ್ಯದಲ್ಲಿ 2,000 ಕ್ಕೂ ಹೆಚ್ಚು ಯುದ್ಧ ಆನೆಗಳು ಮತ್ತು ಲಕ್ಷಾಂತರ ಪದಾತಿ ಯೋಧರಿದ್ದರು. ಇವರ ಶಾಸನಗಳು ಬಂಗಾಳದಿಂದ ಕಾವೇರಿ ನದಿ ತೀರದ ಶ್ರೀರಂಗಂವರೆಗೆ ಕಂಡುಬರುತ್ತವೆ.',
      ta: '"கஜபதி" (யானைப்படையின் அதிபதி) என்ற பட்டம் ஒடிசாவின் வலிமைமிக்க போர் யானைப்படையைக் குறிக்கிறது. 1,000 முதல் 2,500 கவச யானைகள் மற்றும் இலட்சக்கணக்கான வாள் மற்றும் வில் வீரர்களைக் கொண்ட இப்படையின் வெற்றி கல்வெட்டுகள் வங்காளம் முதல் ஸ்ரீரங்கம் வரை காணப்படுகின்றன.',
      mr: '"गजपती" (हत्तींचे अधिपती) ही पदवी ओड्र आणि कलिंगातील अजिंक्य युद्ध हत्ती दलाचे प्रतीक होती. मध्ययुगीन इतिहासकारांच्या नोंदीनुसार गजपती सैन्यात १,००० ते २,५०० युद्ध हत्ती आणि दोन लाखांहून अधिक पायदळ योद्धे होते. त्यांचे विजय शिलालेख बंगालपासून कावेरीकाठच्या श्रीरंगमपर्यंत आढळतात.',
      or: '"ଗଜପତି" (ହସ୍ତୀ ବାହିନୀର ଅଧିପତି) ଉପାଧି ଓଡ଼୍ର ଓ କଳିଙ୍ଗର ଅଜେୟ ହସ୍ତୀ ଶକ୍ତିର ପ୍ରତୀକ ଥିଲା। ମଧ୍ୟଯୁଗୀୟ ଐତିହାସିକ ବିବରଣୀ ଅନୁଯାୟୀ ଗଜପତି ସମ୍ରାଟଙ୍କ ସେନାରେ ୧,୦୦୦ ରୁ ୨,୫୦୦ ଲৌହ-ବର୍ମଧାରୀ ଯୁଦ୍ଧ ହସ୍ତୀ ଏବଂ ୨ ଲକ୍ଷରୁ ଅଧିକ ପାଇକ ଓ କ୍ଷତ୍ରିୟ ଯୋଦ୍ଧା ଥିଲେ। ବଙ୍ଗର ତ୍ରିବେଣୀଠାରୁ କାବେରୀ ତଟର ଶ୍ରୀରଙ୍ଗମ ପର୍ଯ୍ୟନ୍ତ ଗଜପତିଙ୍କ ବିଜୟ ଶିଳାଲେଖ ବିଦ୍ୟମାନ।',
      bn: '"গজপতি" (হস্তীবাহিনীর অধিপতি) উপাধিটি ওড্র ও কলিঙ্গের অপরাজেয় যুদ্ধহস্তী বাহিনীর প্রতীক ছিল। মধ্যযুগীয় ঐতিহাসিক বিবরণ অনুসারে গজপতি বাহিনীতে ১,০০০ থেকে ২,৫০০ বর্মধারী যুদ্ধহস্তী এবং দুই লক্ষাধিক পদাতিক যোদ্ধা ছিল। বাংলার ত্রিবেণী থেকে কাবেরী তীরের শ্রীরঙ্গম পর্যন্ত তাঁদের বিজয় শিলালিপি বিস্তৃত।'
    },
    sources: [
      'Srirangam Ranganathaswamy Temple Inscription of Kumara Hamvira Deva (1464 CE)',
      'Veligalani Copper Plate Grant of Kapilendra Deva (1458 CE), Epigraphia Indica Vol. XXXIII',
      'Burhan-i-Maasir & Fernao Nuniz Chronicles on Gajapathi War Elephants'
    ]
  },
  {
    id: 'culture-renaissance',
    tab: 'culture',
    era: {
      en: '1434 – 1540 CE',
      hi: '1434 – 1540 ईस्वी',
      te: '1434 – 1540 క్రీ.శ.',
      kn: '1434 – 1540 ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 1434 – 1540',
      mr: '१४३४ – १५४० इ.स.',
      or: '୧୪୩୪ – ୧୫୪୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৪৩৪ – ১৫৪০ খ্রিস্টাব্দ'
    },
    badge: {
      en: 'Documented Cultural & Literary Record',
      hi: 'प्रामाणिक सांस्कृतिक एवं साहित्यिक अभिलेख',
      te: 'ధృవీకరించబడిన సాంస్కృతిక & సాహిత్య రికార్డు',
      kn: 'ದಾಖಲಿತ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ದಾಖಲೆ',
      ta: 'ஆவணப்படுத்தப்பட்ட பண்பாடு மற்றும் இலக்கியப் பதிவு',
      mr: 'नोंदणीकृत सांस्कृतिक आणि साहित्यिक अभिलेख',
      or: 'ପ୍ରାମାଣିକ ସାଂସ୍କୃତିକ ଓ ସାହିତ୍ୟିକ ଅଭିଲେଖ',
      bn: 'প্রামাণ্য সাংস্কৃতিক ও সাহিত্যিক নথি'
    },
    title: {
      en: 'Cultural, Literary & Architectural Renaissance under the Gajapathis',
      hi: 'गजपतियों के अधीन सांस्कृतिक, साहित्यिक एवं स्थापत्य पुनर्जागरण',
      te: 'గజపతుల కాలంలో సాంస్కృతిక, సాహిత్య & వాస్తు శిల్ప పునరుజ్జీవనం',
      kn: 'ಗಜಪತಿಗಳ ಕಾಲದ ಸಾಂಸ್ಕೃತಿಕ, ಸಾಹಿತ್ಯಿಕ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಪುನರುಜ್ಜೀವನ',
      ta: 'கஜபதிகள் காலத்து பண்பாடு, இலக்கியம் மற்றும் கட்டிடக்கலை மறுமலர்ச்சி',
      mr: 'गजपतींच्या काळातील सांस्कृतिक, साहित्यिक आणि स्थापत्य पुनर्जागरण',
      or: 'ଗଜପତିମାନଙ୍କ ଶାସନରେ ସାଂସ୍କୃତିକ, ସାହିତ୍ୟିକ ଓ ସ୍ଥାପତ୍ୟ ନବଜାଗରଣ',
      bn: 'গজপতিদের আমলে সাংস্কৃতিক, সাহিত্যিক ও স্থাপত্য নবজাগরণ'
    },
    subtitle: {
      en: 'Classical Odia Literature, Sanskrit Jurisprudence & Jagannatha Temple Patronage',
      hi: 'शास्त्रीय ओडिया साहित्य, संस्कृत धर्मशास्त्र एवं श्री जगन्नाथ मंदिर संरक्षण',
      te: 'ఒడియా సాహిత్యం, సంస్కృత న్యాయశాస్త్రం & శ్రీ జగన్నాథ దేవాలయ పోషణ',
      kn: 'ಒಡಿಯಾ ಸಾಹಿತ್ಯ, ಸಂಸ್ಕೃತ ಧರ್ಮಶಾಸ್ತ್ರ ಮತ್ತು ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಪೋಷಣೆ',
      ta: 'ஒடியா இலக்கியம், சமஸ்கிருத நீதி நூல்கள் & புரி ஜெகந்நாதர் கோயில் திருப்பணிகள்',
      mr: 'ओडिया साहित्य, संस्कृत विधी ग्रंथ आणि पुरी जगन्नाथ मंदिर आश्रय',
      or: 'ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଆ ସାହିତ୍ୟ, ସଂସ୍କୃତ ଧର୍ମଶାସ୍ତ୍ର ଓ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ପୃଷ୍ଠପୋଷକତା',
      bn: 'ধ্রুপদী ওড়িয়া সাহিত্য, সংস্কৃত ধর্মশাস্ত্র ও শ্রীজগন্নাথ মন্দির পৃষ্ঠপোষকতা'
    },
    summary: {
      en: 'The Suryavamsha period witnessed Sarala Dasa’s Odia Mahabharata, Purushottama Deva’s Abhinava Gitagovinda, Prataparudra Deva’s Sarasvati Vilasa, and the Meghanada Pacheri at Puri.',
      hi: 'सूर्यवंशी काल में आदिकवि सारला दास का ओडिया महाभारत, पुरुषोत्तम देव का अभिनव गीतगोविंद, प्रतापरुद्र देव का सरस्वती विलास और पुरी की मेघनाद पाचेरी निर्मित हुई।',
      te: 'సూర్యవంశ కాలంలో ఆదికవి సారళా దాసు ఒడియా మహాభారతం, పురుషోత్తమ దేవుని అభినవ గీతగోవిందం, ప్రతాపరుద్ర దేవుని సరస్వతీ విలాసం మరియు పూరి మేఘనాద పాచేరి నిర్మించబడ్డాయి.',
      kn: 'ಸೂರ್ಯವಂಶದ ಕಾಲದಲ್ಲಿ ಸಾರಲಾ ದಾಸರ ಮಹಾಭಾರತ, ಅಭಿನವ ಗೀತಗೋವಿಂದ, ಸರಸ್ವತೀ ವಿಲಾಸ ಮತ್ತು ಪುರಿಯ ಮೇಘನಾದ ಪಾಚೇರಿ ನಿರ್ಮಾಣಗೊಂಡವು.',
      ta: 'சூரியவம்ச காலத்தில் சாரளா தாசரின் மகாபாரதம், அபிநவ கீதகோவிந்தம், சரஸ்வதி விலாசம் மற்றும் புரி மேகநாத பாசேரி மதில் சுவர் ஆகியவை உருவாகின.',
      mr: 'सूर्यवंशी काळात सारला दास यांचे महाभारत, अभिनव गीतगोविंद, सरस्वती विलास आणि पुरीची मेघनाद पाचेरी तटबंदी निर्माण झाली.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଯୁଗରେ ଆଦିକବି ସାରଳା ଦାସଙ୍କ ମହାଭାରତ, ପୁରୁଷୋତ୍ତମ ଦେବଙ୍କ ଅଭିନବ ଗୀତଗୋବିନ୍ଦ, ପ୍ରତାପରୁଦ୍ର ଦେବଙ୍କ ସରସ୍ୱତୀ ବିଳାସ ଓ ପୁରୀର ମେଘନାଦ ପାଚେରୀ ନିର୍ମିତ ହୋଇଥିଲା।',
      bn: 'সূর্যবংশীয় যুগে আদিকবি সারলা দাসের মহাভারত, পুরুষোত্তম দেবের অভিনব গীতগোবিন্দ, প্রতাপরুদ্র দেবের সরস্বতী বিলাস এবং পুরীর মেঘনাদ প্রাচীর নির্মিত হয়।'
    },
    content: {
      en: 'The Suryavamsha Gajapathi era marked a golden renaissance in Indian literary and architectural history:\n\n1. Vernacular & Sanskrit Literature: Emperor Kapilendra Deva himself authored the Sanskrit play "Parashurama Vijaya" and patronized Adikavi Sarala Dasa, who composed the monumental Odia Mahabharata, Vilanka Ramayana, and Chandi Purana. Emperor Purushottama Deva composed the "Abhinava Gitagovinda" and lexicon "Nama-malika". Emperor Prataparudra Deva compiled the authoritative Sanskrit legal and civil digest "Sarasvati Vilasa" and patronized the Panchasakha saint-poets (Jagannatha Dasa, Balarama Dasa, Achyutananda Dasa, Yasovanta Dasa, and Ananta Dasa).\n\n2. Sacred Architecture & Chera Panhara: Kapilendra Deva constructed the towering Meghanada Pacheri defensive wall around the Puri Jagannatha Temple. The Gajapathi monarchs institutionalized the sacred "Chera Panhara" ritual during Ratha Yatra, where the emperor sweeps the chariots with a golden broom, proclaiming humility before the Divine.',
      hi: 'सूर्यवंशी गजपति काल भारतीय साहित्य और स्थापत्य के इतिहास में एक स्वर्णिम पुनर्जागरण था:\n\n1. साहित्य एवं धर्मशास्त्र: सम्राट कपिलेंद्र देव ने स्वयं संस्कृत नाटक "परशुराम विजय" की रचना की और आदिकवि सारला दास को संरक्षण दिया, जिन्होंने ओडिया महाभारत, विलंक रामायण और चंडी पुराण की रचना की। सम्राट पुरुषोत्तम देव ने "अभिनव गीतगोविंद" एवं "नाम-मालिका" लिखी, तथा सम्राट प्रतापरुद्र देव ने प्रसिद्ध न्याय ग्रंथ "सरस्वती विलास" का संकलन किया और पंचसखा संतों को आश्रय दिया।\n\n2. मंदिर स्थापत्य एवं छेरा पंहरा: कपिलेंद्र देव ने पुरी जगन्नाथ मंदिर के चारों ओर विशाल सुरक्षा प्राचीर "मेघनाद पाचेरी" का निर्माण करवाया। रथयात्रा में राजा द्वारा सोने की झाड़ू से रथ बुहारने की पवित्र "छेरा पंहरा" परंपरा इसी काल में सुदृढ़ हुई।',
      te: 'సూర్యవంశ గజపతుల యుగం భారతీయ సాహిత్య మరియు వాస్తు శిల్ప చరిత్రలో స్వర్ణయుగంగా నిలిచింది:\n\n1. సాహిత్యం & న్యాయశాస్త్రం: కపిలేంద్ర దేవ చక్రవర్తి స్వయంగా "పరశురామ విజయం" అనే సంస్కృత నాటకాన్ని రచించారు మరియు ఒడియా మహాభారతం, విలంక రామాయణం, చండీ పురాణం రచించిన ఆదికవి సారళా దాసును పోషించారు. పురుషోత్తమ దేవుడు "అభినవ గీతగోవిందం", "నామ-మాలిక" గ్రంథాలను రచించగా, ప్రతాపరుద్ర దేవుడు "సరస్వతీ విలాసం" అనే ప్రసిద్ధ ధర్మశాస్త్ర గ్రంథాన్ని రూపొందించారు.\n\n2. వాస్తు శిల్పం & ఛేరా పహరా: పూరి జగన్నాథ ఆలయం చుట్టూ అభేద్యమైన "మేఘనాద పాచేరి" ప్రాకారాన్ని కపిలేంద్ర దేవుడు నిర్మించారు. రథయాత్రలో చక్రవర్తి బంగారు చీపురుతో రథాన్ని ఊడ్చే పవిత్ర "ఛేరా పహరా" ఆచారం గజపతుల భక్తికి నిదర్శనం.',
      kn: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳ ಕಾಲವು ಸಾಹಿತ್ಯ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪದ ಸುವರ್ಣ ಯುಗವಾಗಿತ್ತು. ಕಪಿಲೇಂದ್ರ ದೇವನು "ಪರಶುರಾಮ ವಿಜಯ" ನಾಟಕವನ್ನು ರಚಿಸಿದನು ಮತ್ತು ಆದಿಕವಿ ಸಾರಲಾ ದಾಸರಿಗೆ ಆಶ್ರಯ ನೀಡಿದನು. ಪುರುಷೋତ୍ତಮ ದೇವನು "ಅಭಿನವ ಗೀತಗೋವಿಂದ" ಮತ್ತು ಪ್ರತಾಪರುದ್ರ ದೇವನು "ಸರಸ್ವತೀ ವಿಲಾಸ" ಧರ್ಮಶಾಸ್ತ್ರ ಗ್ರಂಥವನ್ನು ರಚಿಸಿದರು. ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಸುತ್ತಲೂ ಬೃಹತ್ "ಮೇಘನಾದ ಪಾಚೇರಿ" ಗೋಡೆಯನ್ನು ನಿರ್ಮಿಸಲಾಯಿತು.',
      ta: 'சூரியவம்ச கஜபதி காலம் இலக்கியம் மற்றும் கட்டிடக்கலையின் பொற்காலமாகத் திகழ்ந்தது. கபிலேந்திர தேவர் "பரசுராம விஜயம்" நாடகத்தை இயற்றினார் மற்றும் ஆதிகவி சாரளா தாசரை ஆதரித்தார். புருஷோத்தம தேவர் "அபிநவ கீதகோவிந்தம்" நூலையும், பிரதாபருத்ர தேவர் "சரஸ்வதி விலாசம்" சட்ட நூலையும் இயற்றினர். புரி ஜெகந்நாதர் கோயிலைச் சுற்றி "மேகநாத பாசேரி" மதில் சுவர் கட்டப்பட்டது.',
      mr: 'सूर्यवंशी गजपती काळ हा साहित्य आणि स्थापत्यकलेचा सुवर्णकाळ होता. सम्राट कपिलेंद्र देवांनी स्वतः "परशुराम विजय" नाटक लिहिले आणि आदिकवी सारला दास यांना राजाश्रय दिला. पुरुषोत्तम देवांनी "अभिनव गीतगोविंद" तर प्रतापरुद्र देवांनी "सरस्वती विलास" हा कायदेविषयक ग्रंथ रचला. पुरीच्या जगन्नाथ मंदिराभोवती भव्य "मेघनाद पाचेरी" तटबंदी बांधण्यात आली.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ଯୁଗ ଓଡ଼ିଆ ସାହିତ୍ୟ, ସଂସ୍କୃତ ଶାସ୍ତ୍ର ଓ ମନ୍ଦିର ସ୍ଥାପତ୍ୟର ସ୍ୱର୍ଣ୍ଣযୁଗ ଥିଲା:\n\n୧. ସାହିତ୍ୟ ଓ ଶାସ୍ତ୍ର: ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ସଂସ୍କୃତ নাটକ "ପରଶୁରାମ ବିଜୟ" ରଚନା କରିଥିଲେ ଏବଂ ଆଦିକବି ସାରଳା ଦାସଙ୍କ ମହାଭାରତ, ବିଳଙ୍କା ରାମାୟଣ ଓ ଚଣ୍ଡୀପୁରାଣକୁ ପ୍ରୋତ୍ସାହିତ କରିଥିଲେ। ପୁରୁଷୋତ୍ତମ ଦେବ "ଅଭିନବ ଗୀତଗୋବିନ୍ଦ" ଓ "ନାମ-ମାଳିକା" ଏବଂ ପ୍ରତାପରୁଦ୍ର ଦେବ ପ୍ରସିଦ୍ଧ ସ୍ମୃତିଶାସ୍ତ୍ର "ସରସ୍ୱତୀ ବିଳାସ" ପ୍ରଣୟନ କରିଥିଲେ।\n\n୨. ସ୍ଥାପତ୍ୟ ଓ ଛେରାପହଁରା: ପୁରୀ ଶ୍ରୀମନ୍ଦିର ଚତୁଃପାର୍ଶ୍ୱରେ କପିଳେନ୍ଦ୍ର ଦେବ ବିଶାଳ "ମେଘନାଦ ପାଚେରୀ" ନିର୍ମାଣ କରିଥିଲେ ଏବଂ ରଥଯାତ୍ରାରେ ଗଜପତି ମହାରାଜାଙ୍କ ଦ୍ୱାରା ସୁବର୍ଣ୍ଣ ଖଡ଼িকାରେ "ଛେରାପହଁରା" ସେବା ପରମ୍ପରା ସୁଦୃଢ଼ ହୋଇଥିଲା।',
      bn: 'সূর্যবংশীয় গজপতি যুগ সাহিত্য ও স্থাপত্যের স্বর্ণযুগ ছিল। সম্রাট কপিলেন্দ্র দেব সংস্কৃত নাটক "পরশুরাম বিজয়" রচনা করেন এবং আদিকবি সারলা দাসকে পৃষ্ঠপোষকতা করেন। পুরুষোত্তম দেব "অভিনব গীতগোবিন্দ" এবং প্রতাপরুদ্র দেব বিখ্যাত আইনগ্রন্থ "সরস্বতী বিলাস" রচনা করেন। পুরী জগন্নাথ মন্দিরের চারপাশে সুউচ্চ "মেঘনাদ প্রাচীর" নির্মিত হয়।'
    },
    sources: [
      'Sarasvati Vilasa of Prataparudra Deva (Critical Edition, Mysore, 1927)',
      'Sarala Mahabharata, Department of Culture, Government of Odisha',
      'Puri Jagannatha Temple Chronicles (Madala Panji) & Meghanada Pacheri Records'
    ]
  }
];

interface CanonicalDynastyInfo {
  id: string;
  period: Record<LanguageCode, string>;
  enName: string;
  enCapital: string;
  enOrigin: string;
  enOverview: string;
  rulers: string[];
}

const CANONICAL_DYNASTIES_LIST: CanonicalDynastyInfo[] = [
  {
    id: 'dyn_suryavamsha_gajapathi',
    period: {
      en: '1434 – 1541 CE',
      hi: '1434 – 1541 ईस्वी',
      te: '1434 – 1541 క్రీ.శ.',
      kn: '1434 – 1541 ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 1434 – 1541',
      mr: '१४३४ – १५४१ इ.स.',
      or: '୧୪୩୪ – ୧୫୪୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৪৩৪ – ১৫৪১ খ্রিস্টাব্দ'
    },
    enName: 'Suryavamsha Gajapathi Empire',
    enCapital: 'Varanasi Kataka (Cuttack)',
    enOrigin: 'Odra Desha / Utkala',
    enOverview:
      'Founded by Emperor Kapilendra Deva in 1434 CE, the Suryavamsha Gajapathi Empire reached the zenith of medieval Odishan military and cultural power, stretching from the lower Ganges in Bengal to the Kaveri River in Tamil Nadu.',
    rulers: ['Kapilendra Deva', 'Purushottama Deva', 'Prataparudra Deva', 'Kumara Hamvira Deva']
  },
  {
    id: 'dyn_eastern_ganga',
    period: {
      en: '1078 – 1434 CE',
      hi: '1078 – 1434 ईस्वी',
      te: '1078 – 1434 క్రీ.శ.',
      kn: '1078 – 1434 ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 1078 – 1434',
      mr: '१०७८ – १४३४ इ.स.',
      or: '୧୦୭୮ – ୧୪୩୪ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১০৭৮ – १४৩৪ খ্রিস্টাব্দ'
    },
    enName: 'Imperial Eastern Ganga Dynasty',
    enCapital: 'Kalinganagara / Varanasi Kataka',
    enOrigin: 'Kalinga & Trikalinga',
    enOverview:
      'Unifiers of Kalinga, Utkala, and Odra Desha, celebrated globally as the monumental builders of the Puri Jagannatha Temple and the Konark Sun Temple.',
    rulers: ['Anantavarman Chodaganga Deva', 'Langula Narasimha Deva I']
  },
  {
    id: 'dyn_bhoi_mukunda',
    period: {
      en: '1541 – 1568 CE',
      hi: '1541 – 1568 ईस्वी',
      te: '1541 – 1568 క్రీ.శ.',
      kn: '1541 – 1568 ಕ್ರಿ.ಶ.',
      ta: 'கி.பி. 1541 – 1568',
      mr: '१५४१ – १५६८ इ.स.',
      or: '୧୫୪୧ – ୧୫୬୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৫৪১ – ১৫৬৮ খ্রিস্টাব্দ'
    },
    enName: 'Chalukya-Gajapathi & Bhoi Successor Lineages',
    enCapital: 'Varanasi Kataka (Cuttack) & Khurda',
    enOrigin: 'Odra Desha',
    enOverview:
      'Historical reign of Govinda Vidyadhara and the last independent Hindu sovereign emperor of medieval Odisha, Gajapathi Mukunda Deva Harichandana.',
    rulers: ['Mukunda Deva Harichandana']
  },
  {
    id: 'dyn_traditional_suryavamsha_lineages',
    period: {
      en: '15th Century CE – Present',
      hi: '15वीं शताब्दी ईस्वी – वर्तमान',
      te: '15వ శతాబ్దం క్రీ.శ. – నేటి వరకు',
      kn: '15ನೇ ಶತಮಾನ – ಪ್ರಸ್ತುತ',
      ta: '15 ஆம் நூற்றாண்டு – நிகழ்காலம்',
      mr: '१५ वे शतक – वर्तमान',
      or: '୧୫ଶ ଶତାବ୍ଦୀ – ବର୍ତ୍ତମାନ',
      bn: '১৫শ শতাব্দী – বর্তমান'
    },
    enName: 'Traditional Suryavamsha Odiyaraju Kshatriya Lineages',
    enCapital: 'Southern Fortresses & Principalities (Kondavidu, Udayagiri, Kolletikota)',
    enOrigin: 'Odra Desha Diaspora & Kshatriya Settlements',
    enOverview:
      'Documented genealogies and regional traditions of Gajapathi fortress commanders and Suryavamsha Odiyaraju Kshatriya families across Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, Maharashtra, and Odisha.',
    rulers: ['Kumara Hamvira Deva', 'Prince Virabhadra Deva', 'Kolletikota Garrisons']
  }
];

export const GajapathiKingdomPage: React.FC<GajapathiKingdomPageProps> = ({
  onNavigate,
  initialItemId
}) => {
  const { t, language, getArticleContent, getMetadataLabel } = useLanguage();
  const [activeTab, setActiveTab] = useState<'chronology' | 'administration' | 'military' | 'culture'>('chronology');
  const [selectedTarget, setSelectedTarget] = useState<ModalTarget | null>(null);

  const ui = PAGE_UI_LABELS[language] || PAGE_UI_LABELS.en;
  const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

  // All 7 Gajapathi & Imperial Odishan monarchs from DOCUMENTED_FIGURES_REPO
  const gajapathiMonarchs = useMemo(
    () => DOCUMENTED_FIGURES_REPO.filter(f => f.category === 'gajapathi_monarchs'),
    []
  );

  // Relevant Gajapathi & Odra articles localized in the current language
  const gajapathiArticles = useMemo(() => {
    const all = getAllArticles(language);
    return all.filter(a =>
      [
        'art_gajapathi_kapilendra',
        'art_odra_desha_history',
        'art_epigraphic_evolution_odra',
        'art_kolletikota_peddintlamma_lake'
      ].includes(a.id)
    );
  }, [language]);

  // Primary Gajapathi inscriptions localized in the current language
  const gajapathiInscriptions = useMemo(() => {
    return getCanonicalInscriptions(language);
  }, [language]);

  // Open initial modal if navigated with ?figure=..., ?article=..., or ?id=...
  useEffect(() => {
    if (!initialItemId) return;
    const mappedFigureId = LEGACY_FIGURE_ID_MAP[initialItemId] || initialItemId;
    const foundMonarch = DOCUMENTED_FIGURES_REPO.find(f => f.id === mappedFigureId);
    if (foundMonarch) {
      setSelectedTarget({ type: 'monarch', id: foundMonarch.id });
      return;
    }
    const foundDossier = GAJAPATHI_DOSSIERS.find(d => d.id === initialItemId);
    if (foundDossier) {
      setActiveTab(foundDossier.tab);
      setSelectedTarget({ type: 'dossier', id: foundDossier.id });
      return;
    }
    const foundDynasty = CANONICAL_DYNASTIES_LIST.find(d => d.id === initialItemId);
    if (foundDynasty) {
      setSelectedTarget({ type: 'dynasty', id: foundDynasty.id });
      return;
    }
    const allArts = getAllArticles(language);
    const foundArt = allArts.find(a => a.id === initialItemId || a.slug === initialItemId);
    if (foundArt) {
      setSelectedTarget({ type: 'article', id: foundArt.id });
      return;
    }
    const foundInsc = getCanonicalInscriptions(language).find(i => i.id === initialItemId);
    if (foundInsc) {
      setSelectedTarget({ type: 'inscription', id: foundInsc.id });
    }
  }, [initialItemId, language]);

  const openMonarchModal = (figureId: string) => {
    const resolvedId = LEGACY_FIGURE_ID_MAP[figureId] || figureId;
    const fig = DOCUMENTED_FIGURES_REPO.find(f => f.id === resolvedId);
    if (!fig) return;
    setSelectedTarget({ type: 'monarch', id: fig.id });
  };

  // Dynamically compute the ContentDetailItem in the currently selected language
  const activeModalItem: ContentDetailItem | null = useMemo(() => {
    if (!selectedTarget) return null;

    if (selectedTarget.type === 'monarch') {
      const fig: DocumentedFigureData | undefined = DOCUMENTED_FIGURES_REPO.find(
        f => f.id === selectedTarget.id
      );
      if (!fig) return null;
      const name = fig.name[language] || fig.name.en;
      const reign = fig.reign_period[language] || fig.reign_period.en;
      const dynasty = fig.dynasty_name[language] || fig.dynasty_name.en;
      const bio = fig.biography[language] || fig.biography.en;
      const sig = fig.historical_significance[language] || fig.historical_significance.en;
      const titles = fig.known_titles[language] || fig.known_titles.en;
      const events = fig.major_events[language] || fig.major_events.en;
      const places = fig.associated_places[language] || fig.associated_places.en;

      return {
        id: fig.id,
        title: name,
        subtitle: titles.join(' • '),
        badge: fig.evidence_status,
        era: reign,
        dynasty,
        imageUrl: fig.image_url,
        imageAspect: 'portrait',
        summary: sig,
        summaryLabel: t.kingsQueens.biographyLabel,
        content: bio,
        fullTextLabel: t.kingsQueens.biographyLabel,
        metadata: [
          { label: ui.dynastyMetaLabel, value: dynasty },
          { label: ui.reignMetaLabel, value: reign },
          { label: ui.datesMetaLabel, value: fig.approx_dates },
          ...(fig.alternate_names?.length
            ? [{ label: t.kingsQueens.alternateSpellings, value: fig.alternate_names.join(', ') }]
            : [])
        ],
        sections: [
          {
            heading: ui.titlesSectionLabel,
            type: 'tags',
            items: titles
          },
          {
            heading: ui.eventsSectionLabel,
            type: 'list',
            items: events
          },
          {
            heading: ui.placesSectionLabel,
            type: 'tags',
            items: places
          }
        ],
        sources: (fig.citations || []).map((c: string) => ({
          title: c
        })),
        sourcesLabel: t.kingsQueens.citationsLabel,
        shareUrl: `${window.location.origin}${basePath}/gajapathi-kings?figure=${encodeURIComponent(fig.id)}`
      };
    }

    if (selectedTarget.type === 'dossier') {
      const dossier = GAJAPATHI_DOSSIERS.find(d => d.id === selectedTarget.id);
      if (!dossier) return null;
      const archiveBase = `${basePath ? basePath + '/' : '/'}assets/archive/`;
      const dossierImgMap: Record<string, string> = {
        'admin-nayankara': `${archiveBase}barabati_fort_gateway.jpg`,
        'admin-revenue': `${archiveBase}copper_plate_charter.jpg`,
        'military-gajasena': `${archiveBase}kondavidu_fort_hills.jpg`,
        'culture-renaissance': `${archiveBase}puri_jagannatha_temple.jpg`
      };
      return {
        id: dossier.id,
        title: dossier.title[language] || dossier.title.en,
        subtitle: dossier.subtitle[language] || dossier.subtitle.en,
        badge: dossier.badge[language] || dossier.badge.en,
        era: dossier.era[language] || dossier.era.en,
        dynasty:
          DYNASTY_TRANSLATIONS.dyn_suryavamsha_gajapathi?.[language]?.name ||
          'Suryavamsha Gajapathi Empire',
        imageUrl: dossierImgMap[dossier.id] || `${archiveBase}barabati_fort_gateway.jpg`,
        imageLayout: 'banner',
        summary: dossier.summary[language] || dossier.summary.en,
        content: dossier.content[language] || dossier.content.en,
        sources: dossier.sources.map(s => ({ title: s })),
        shareUrl: `${window.location.origin}${basePath}/gajapathi-kings?id=${encodeURIComponent(dossier.id)}`
      };
    }

    if (selectedTarget.type === 'dynasty') {
      const dyn = CANONICAL_DYNASTIES_LIST.find(d => d.id === selectedTarget.id);
      if (!dyn) return null;
      const tr = DYNASTY_TRANSLATIONS[dyn.id]?.[language];
      const name = tr?.name || dyn.enName;
      const capital = tr?.capital || dyn.enCapital;
      const origin = tr?.origin_region || dyn.enOrigin;
      const overview = tr?.overview || dyn.enOverview;
      const period = dyn.period[language] || dyn.period.en;
      const archiveBase = `${basePath ? basePath + '/' : '/'}assets/archive/`;
      const dynImgMap: Record<string, string> = {
        dyn_suryavamsha_gajapathi: `${archiveBase}kapilendra_deva_portrait.jpg`,
        dyn_eastern_ganga: `${archiveBase}konark_sun_temple_structure.jpg`,
        dyn_bhoi_mukunda: `${archiveBase}mukunda_deva_barabati.jpg`
      };

      return {
        id: dyn.id,
        title: name,
        subtitle: `${capital} • ${period}`,
        badge: t.gajapathi.badge,
        era: period,
        dynasty: name,
        location: capital,
        imageUrl: dynImgMap[dyn.id] || `${archiveBase}barabati_fort_gateway.jpg`,
        imageLayout: 'banner',
        summary: overview,
        content: overview,
        metadata: [
          { label: ui.capitalMetaLabel, value: capital },
          { label: ui.regionMetaLabel, value: origin },
          { label: ui.reignMetaLabel, value: period }
        ],
        sections: [
          {
            heading: ui.monarchsHeading,
            type: 'tags',
            items: dyn.rulers
          }
        ],
        shareUrl: `${window.location.origin}${basePath}/gajapathi-kings?id=${encodeURIComponent(dyn.id)}`
      };
    }

    if (selectedTarget.type === 'article') {
      const allArts = getAllArticles(language);
      const art = allArts.find(a => a.id === selectedTarget.id);
      if (!art) return null;
      const { title, summary, content } = getArticleContent(art);
      return {
        id: art.id,
        title,
        subtitle: `${art.author_name} • ${art.publication_date}`,
        badge: getMetadataLabel('category', art.category) || art.category,
        evidenceCategory: art.evidence_category,
        verificationStatus: art.verification_status,
        imageUrl: art.featured_image,
        imageLayout: 'banner',
        summary,
        content,
        metadata: [
          { label: 'Author', value: art.author_name },
          { label: t.common.period, value: art.publication_date }
        ],
        sources: (art.sources || []).map(s => ({
          title: s.title,
          author: s.author_or_authority,
          year: s.year_or_era,
          type: s.source_type,
          details: `${s.publication_or_location ? s.publication_or_location + ' — ' : ''}${s.citation_details || ''}`
        })),
        tags: art.tags,
        shareUrl: `${window.location.origin}${basePath}/gajapathi-kings?article=${encodeURIComponent(art.id)}`
      };
    }

    if (selectedTarget.type === 'inscription') {
      const insc = gajapathiInscriptions.find(i => i.id === selectedTarget.id);
      if (!insc) return null;
      const archiveBase = `${basePath ? basePath + '/' : '/'}assets/archive/`;
      const inscImgMap: Record<string, string> = {
        insc_veligalani_1458: `${archiveBase}copper_plate_charter.jpg`,
        insc_lingaraja_1452: `${archiveBase}kapilendra_deva_lingaraja.jpg`,
        insc_simhachalam_prataparudra: `${archiveBase}simhachalam_temple.jpg`
      };
      return {
        id: insc.id,
        title: insc.name,
        subtitle: `${insc.ruler} • ${insc.era_or_date}`,
        badge: insc.verification_status,
        era: insc.era_or_date,
        dynasty: insc.dynasty,
        location: insc.location_found,
        imageUrl: inscImgMap[insc.id] || `${archiveBase}copper_plate_charter.jpg`,
        imageLayout: 'banner',
        summary: insc.historical_context,
        content: `${insc.english_translation}\n\n${insc.transcription_excerpt}`,
        metadata: [
          { label: t.inscriptions.rulerLabel, value: insc.ruler },
          { label: t.inscriptions.findspotLabel, value: insc.location_found },
          { label: t.inscriptions.eraLabel, value: insc.era_or_date },
          { label: t.inscriptions.dynastyLabel, value: insc.dynasty }
        ],
        sources: (insc.scholarly_references || []).map((c: string) => ({ title: c })),
        shareUrl: `${window.location.origin}${basePath}/gajapathi-kings?id=${encodeURIComponent(insc.id)}`
      };
    }

    return null;
  }, [selectedTarget, language, t, ui, basePath, getArticleContent, getMetadataLabel, gajapathiInscriptions]);

  const adminDossiers = GAJAPATHI_DOSSIERS.filter(d => d.tab === 'administration');
  const militaryDossier = GAJAPATHI_DOSSIERS.find(d => d.id === 'military-gajasena')!;
  const cultureDossier = GAJAPATHI_DOSSIERS.find(d => d.id === 'culture-renaissance')!;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-[#20050d] via-[#151a28] to-[#0c0f17] border border-[#c99738]/50 p-6 sm:p-12 shadow-2xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{t.gajapathi.badge}</span>
          </div>
          <h1 className="font-royal-heading font-extrabold text-2xl sm:text-5xl text-[#fcedc7] leading-tight">
            {t.gajapathi.title}
          </h1>
          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {t.gajapathi.subtitle}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'chronology', label: t.gajapathi.tabChronology },
          { id: 'administration', label: t.gajapathi.tabAdministration },
          { id: 'military', label: t.gajapathi.tabMilitary },
          { id: 'culture', label: t.gajapathi.tabCulture }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#c99738] text-[#300207] shadow-md'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Monarch Chronology, Dynasties, Articles & Primary Inscriptions */}
      {activeTab === 'chronology' && (
        <div className="space-y-12">
          {/* 1A: All 7 Documented Gajapathi & Imperial Odishan Monarchs */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7] flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#d4af37]" />
                <span>{ui.monarchsHeading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">{ui.monarchsSubheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gajapathiMonarchs.map(fig => {
                const name = fig.name[language] || fig.name.en;
                const reign = fig.reign_period[language] || fig.reign_period.en;
                const dynasty = fig.dynasty_name[language] || fig.dynasty_name.en;
                const bio = fig.biography[language] || fig.biography.en;
                const titles = fig.known_titles[language] || fig.known_titles.en;

                return (
                  <div
                    key={fig.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openMonarchModal(fig.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openMonarchModal(fig.id);
                      }
                    }}
                    className="p-6 rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-3 cursor-pointer transition-all group flex flex-col justify-between shadow-lg hover:shadow-[0_4px_24px_rgba(201,151,56,0.15)]"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                          {reign}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#580014]/80 text-[#fae29c] border border-[#c99738]/40">
                          {dynasty}
                        </span>
                      </div>

                      <h3 className="font-royal-heading font-bold text-lg text-stone-100 group-hover:text-[#fae29c] transition-colors">
                        {name}
                      </h3>

                      {titles && titles.length > 0 && (
                        <p className="text-[11px] text-[#e8c872]/90 font-medium line-clamp-1">
                          {titles[0]}
                        </p>
                      )}

                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-4">
                        {bio}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        openMonarchModal(fig.id);
                      }}
                      className="text-xs font-semibold text-[#e8c872] group-hover:text-[#fae29c] flex items-center gap-1.5 pt-3 border-t border-stone-800/80 cursor-pointer w-full justify-between"
                    >
                      <span>{ui.viewProfileBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1B: Imperial Dynastic Lineages */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7] flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#d4af37]" />
                <span>{ui.dynastiesHeading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">{ui.dynastiesSubheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {CANONICAL_DYNASTIES_LIST.map(dyn => {
                const tr = DYNASTY_TRANSLATIONS[dyn.id]?.[language];
                const name = tr?.name || dyn.enName;
                const capital = tr?.capital || dyn.enCapital;
                const overview = tr?.overview || dyn.enOverview;
                const period = dyn.period[language] || dyn.period.en;

                return (
                  <div
                    key={dyn.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedTarget({ type: 'dynasty', id: dyn.id })}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedTarget({ type: 'dynasty', id: dyn.id });
                      }
                    }}
                    className="p-5 rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-2.5 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs text-[#d4af37] font-bold">
                      <span>{period}</span>
                      <span className="inline-flex items-center gap-1 text-stone-400 font-normal">
                        <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                        {capital}
                      </span>
                    </div>
                    <h3 className="font-royal-heading font-bold text-base sm:text-lg text-stone-100 group-hover:text-[#fae29c]">
                      {name}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">{overview}</p>
                    <div className="text-xs font-semibold text-[#e8c872] flex items-center gap-1 pt-1">
                      <span>{ui.viewRecordBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1C: Gajapathi Historical Monographs & Articles */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#d4af37]" />
                <span>{ui.articlesHeading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">{ui.articlesSubheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gajapathiArticles.map(art => {
                const { title, summary } = getArticleContent(art);
                return (
                  <div
                    key={art.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedTarget({ type: 'article', id: art.id })}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedTarget({ type: 'article', id: art.id });
                      }
                    }}
                    className="p-6 rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-3 cursor-pointer transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 text-[11px] text-[#d4af37] font-semibold">
                        <span>{getMetadataLabel('category', art.category) || art.category}</span>
                        <span className="text-stone-400">{art.publication_date}</span>
                      </div>
                      <h3 className="font-royal-heading font-bold text-base sm:text-lg text-stone-100 group-hover:text-[#fae29c] transition-colors">
                        {title}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                        {summary}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setSelectedTarget({ type: 'article', id: art.id });
                      }}
                      className="text-xs font-semibold text-[#e8c872] flex items-center gap-1.5 pt-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{ui.readArticleBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1D: Primary Royal Copper-Plate & Temple Inscriptions */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#fcedc7] flex items-center gap-2">
                <Scroll className="w-5 h-5 text-[#d4af37]" />
                <span>{ui.inscriptionsHeading}</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">{ui.inscriptionsSubheading}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {gajapathiInscriptions.map(insc => (
                <div
                  key={insc.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedTarget({ type: 'inscription', id: insc.id })}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedTarget({ type: 'inscription', id: insc.id });
                    }
                  }}
                  className="p-5 rounded-2xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-2.5 cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider block">
                      {insc.era_or_date} • {insc.ruler}
                    </span>
                    <h3 className="font-royal-heading font-bold text-base text-stone-100 group-hover:text-[#fae29c]">
                      {insc.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                      {insc.historical_context}
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-[#e8c872] flex items-center gap-1 pt-2">
                    <span>{ui.viewInscriptionBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Imperial Administration */}
      {activeTab === 'administration' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 space-y-6">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {ui.adminIntroTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
            {ui.adminIntroDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {adminDossiers.map(dossier => (
              <div
                key={dossier.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedTarget({ type: 'dossier', id: dossier.id })}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedTarget({ type: 'dossier', id: dossier.id });
                  }
                }}
                className="p-5 rounded-xl bg-[#0c0f17] border border-stone-800 hover:border-[#c99738] space-y-2 cursor-pointer transition-all group"
              >
                <span className="text-[11px] text-[#d4af37] font-bold uppercase tracking-wider block">
                  {dossier.era[language] || dossier.era.en}
                </span>
                <h4 className="font-bold text-base text-[#e8c872] group-hover:text-[#fae29c]">
                  {dossier.title[language] || dossier.title.en}
                </h4>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {dossier.summary[language] || dossier.summary.en}
                </p>
                <span className="text-xs text-[#d4af37] font-semibold inline-flex items-center gap-1 pt-1">
                  <span>{ui.viewRecordBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Military & Gajasena */}
      {activeTab === 'military' && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedTarget({ type: 'dossier', id: militaryDossier.id })}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedTarget({ type: 'dossier', id: militaryDossier.id });
            }
          }}
          className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-6 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
              {militaryDossier.era[language] || militaryDossier.era.en}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#580014] text-[#fae29c] border border-[#c99738]/40">
              {militaryDossier.badge[language] || militaryDossier.badge.en}
            </span>
          </div>
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {ui.militaryIntroTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
            {ui.militaryIntroDesc}
          </p>
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200 leading-relaxed">
            <strong>{ui.militaryFindspotsLabel}</strong> {ui.militaryFindspotsText}
          </div>
          <div className="text-xs font-semibold text-[#e8c872] inline-flex items-center gap-1.5">
            <span>{ui.viewRecordBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* TAB 4: Cultural Renaissance */}
      {activeTab === 'culture' && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedTarget({ type: 'dossier', id: cultureDossier.id })}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedTarget({ type: 'dossier', id: cultureDossier.id });
            }
          }}
          className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] space-y-6 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
              {cultureDossier.era[language] || cultureDossier.era.en}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#580014] text-[#fae29c] border border-[#c99738]/40">
              {cultureDossier.badge[language] || cultureDossier.badge.en}
            </span>
          </div>
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            {ui.cultureIntroTitle}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed">
            {ui.cultureIntroDesc}
          </p>
          <p className="text-xs text-stone-400 leading-relaxed">
            {cultureDossier.summary[language] || cultureDossier.summary.en}
          </p>
          <div className="text-xs font-semibold text-[#e8c872] inline-flex items-center gap-1.5">
            <span>{ui.viewRecordBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      <ContentDetailModal
        item={activeModalItem}
        onClose={() => setSelectedTarget(null)}
        closeLabel={t.common.close}
      />
    </div>
  );
};
