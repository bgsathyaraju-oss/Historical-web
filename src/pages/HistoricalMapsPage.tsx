import React, { useState, useEffect } from 'react';
import { HistoricalLocation, LanguageCode } from '../types';
import { Compass, MapPin, Landmark, ShieldCheck, Info, ExternalLink, Layers, Navigation, ArrowRight } from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';
import {
  GEOGRAPHICAL_SPREAD,
  GeographicalSpreadRegion
} from '../data/historyContent';
import { getCanonicalLocations } from '../data/archivalSeedData';

interface HistoricalMapsPageProps {
  onNavigate: (path: string) => void;
}

const MAPS_MODAL_UI: Record<
  LanguageCode,
  {
    ancientNameLabel: string;
    historicalRegionLabel: string;
    modernDistrictStateLabel: string;
    frontierBadgeSuffix: string;
    verificationStatusSite: string;
    geographySignificanceLabel: string;
    archaeologicalFindingsHeading: string;
    inscriptionsHeading: string;
    statesTerritoriesLabel: string;
    migrationEpochLabel: string;
    keyCitiesLabel: string;
    verificationStatusCorridor: string;
    regionalOverviewLabel: string;
    citadelsFortsHeading: string;
    sacredCentersHeading: string;
    communitySynonymsHeading: string;
    bannerTitle: string;
    bannerSubtitle: string;
    bannerBadge: string;
    bannerVerification: string;
    northernFrontierLabel: string;
    northernFrontierVal: string;
    imperialCoreLabel: string;
    imperialCoreVal: string;
    southernFrontierLabel: string;
    southernFrontierVal: string;
    bannerFullText: string;
    bannerFullTextLabel: string;
  }
> = {
  en: {
    ancientNameLabel: 'Ancient Nomenclature',
    historicalRegionLabel: 'Historical Region',
    modernDistrictStateLabel: 'Modern District & State',
    frontierBadgeSuffix: 'Frontier & Citadel',
    verificationStatusSite: 'Archaeological & Epigraphic Site',
    geographySignificanceLabel: 'Historical Geography & Strategic Significance',
    archaeologicalFindingsHeading: 'Archaeological Survey & Structural Findings',
    inscriptionsHeading: 'Corroborating Inscriptions Discovered at Site',
    statesTerritoriesLabel: 'States & Territories',
    migrationEpochLabel: 'Migration Epoch & Corridor',
    keyCitiesLabel: 'Key Cities & Districts',
    verificationStatusCorridor: 'Documented Historical Corridor',
    regionalOverviewLabel: 'Regional Overview & Historical Trajectory',
    citadelsFortsHeading: 'Historical Citadels, Forts & Hydraulic Landmarks',
    sacredCentersHeading: 'Key Sacred Centers & Kshetrams',
    communitySynonymsHeading: 'Predominant Community Synonyms & Sub-Castes',
    bannerTitle: 'Territorial Extent of Suryavamsha Gajapathi Empire (c. 1465 CE)',
    bannerSubtitle: 'Ganges to Kaveri Hegemony (Zenith under Emperor Kapilendra Deva)',
    bannerBadge: 'Corroborated Cartographic Reconstruction',
    bannerVerification: 'Epigraphic Boundary Model',
    northernFrontierLabel: 'Northern Frontier',
    northernFrontierVal: 'Hooghly / Mandaran (Lower Bengal)',
    imperialCoreLabel: 'Imperial Core',
    imperialCoreVal: 'Varanasi Kataka (Cuttack) & Srikshetra Puri',
    southernFrontierLabel: 'Southern Frontier',
    southernFrontierVal: 'Srirangam & Tiruchirappalli (Kaveri Basin)',
    bannerFullText:
      'Based on the corroborated findspots of the Veligalani copper-plate grant (1458 CE), Lingaraja temple proclamations (1452 CE), Draksharama and Simhachalam pillar inscriptions, Kondavidu and Udayagiri fortress bastions, and Kumara Hamvira Deva’s Srirangam donations (1464 CE), the Suryavamsha Gajapathi Empire at its zenith extended from the Bhagirathi-Hooghly in the north to the Kaveri River in the south.',
    bannerFullTextLabel: 'Cartographic Methodology & Epigraphic Findspot Synthesis'
  },
  hi: {
    ancientNameLabel: 'प्राचीन नामकरण',
    historicalRegionLabel: 'ऐतिहासिक क्षेत्र',
    modernDistrictStateLabel: 'आधुनिक जिला एवं राज्य',
    frontierBadgeSuffix: 'सीमांत एवं दुर्ग',
    verificationStatusSite: 'पुरातात्विक एवं अभिलेखीय स्थल',
    geographySignificanceLabel: 'ऐतिहासिक भूगोल एवं सामरिक महत्त्व',
    archaeologicalFindingsHeading: 'पुरातात्विक सर्वेक्षण एवं संरचनात्मक साक्ष्य',
    inscriptionsHeading: 'स्थल पर प्राप्त पुष्टिकारक शिलालेख',
    statesTerritoriesLabel: 'राज्य एवं क्षेत्र',
    migrationEpochLabel: 'प्रवास युग एवं गलियारा',
    keyCitiesLabel: 'प्रमुख नगर एवं जिले',
    verificationStatusCorridor: 'प्रमाणित ऐतिहासिक गलियारा',
    regionalOverviewLabel: 'क्षेत्रीय अवलोकन एवं ऐतिहासिक विकासक्रम',
    citadelsFortsHeading: 'ऐतिहासिक दुर्ग, किले एवं जल-संरचनाएं',
    sacredCentersHeading: 'प्रमुख पवित्र केंद्र एवं क्षेत्रम',
    communitySynonymsHeading: 'प्रमुख सामुदायिक पर्याय एवं उप-शाखाएं',
    bannerTitle: 'सूर्यवंश गजपति साम्राज्य का क्षेत्रीय विस्तार (लगभग १४६५ ईस्वी)',
    bannerSubtitle: 'गंगा से कावेरी तक आधिपत्य (सम्राट कपिलेन्द्र देव के अधीन उत्कर्ष)',
    bannerBadge: 'सत्यापित मानचित्रीय पुनर्निर्माण',
    bannerVerification: 'अभिलेखीय सीमा प्रतिमान',
    northernFrontierLabel: 'उत्तरी सीमांत',
    northernFrontierVal: 'हुगली / मंदारन (निम्न बंगाल)',
    imperialCoreLabel: 'साम्राज्यिक केंद्र',
    imperialCoreVal: 'वाराणसी कटक एवं श्रीक्षेत्र पुरी',
    southernFrontierLabel: 'दक्षिणी सीमांत',
    southernFrontierVal: 'श्रीरंगम एवं तिरुचिरापल्ली (कावेरी बेसिन)',
    bannerFullText:
      'वेलिगलानि ताम्रपत्र अनुदान (१४५८ ईस्वी), लिंगराज मंदिर उद्घोषणाओं (१४५२ ईस्वी), द्राक्षाराम तथा सिंहाचलम स्तंभ अभिलेखों, कोंडवीडु एवं उदयगिरि दुर्ग प्राचीरों और कुमार हम्वीर देव के श्रीरंगम दान-अभिलेख (१४६४ ईस्वी) के सत्यापित प्राप्ति-स्थलों के आधार पर सूर्यवंश गजपति साम्राज्य अपने चरमोत्कर्ष पर उत्तर में भागीरथी-हुगली से लेकर दक्षिण में कावेरी नदी तक विस्तृत था।',
    bannerFullTextLabel: 'मानचित्रीय कार्यप्रणाली एवं अभिलेखीय प्राप्ति-स्थल संश्लेषण'
  },
  te: {
    ancientNameLabel: 'ప్రాచీన నామధేయం',
    historicalRegionLabel: 'చారిత్రక ప్రాంతం',
    modernDistrictStateLabel: 'ఆధునిక జిల్లా & రాష్ట్రం',
    frontierBadgeSuffix: 'సరిహద్దు & దుర్గం',
    verificationStatusSite: 'పురావస్తు & శాసన ప్రదేశం',
    geographySignificanceLabel: 'చారిత్రక భూగోళం & వ్యూహాత్మక ప్రాముఖ్యత',
    archaeologicalFindingsHeading: 'పురావస్తు సర్వే & నిర్మాణ ఆధారాలు',
    inscriptionsHeading: 'ఈ ప్రదేశంలో లభించిన ధృవీకరణ శాసనాలు',
    statesTerritoriesLabel: 'రాష్ట్రాలు & ప్రాంతాలు',
    migrationEpochLabel: 'వలస యుగం & మార్గం',
    keyCitiesLabel: 'ప్రధాన నగరాలు & జిల్లాలు',
    verificationStatusCorridor: 'ధృవీకరించబడిన చారిత్రక మార్గం',
    regionalOverviewLabel: 'ప్రాంతీయ అవలోకనం & చారిత్రక ప్రస్థానం',
    citadelsFortsHeading: 'చారిత్రక దుర్గాలు, కోటలు & జల నిర్మాణాలు',
    sacredCentersHeading: 'ప్రధాన పవిత్ర కేంద్రాలు & క్షేత్రాలు',
    communitySynonymsHeading: 'ప్రధాన సామాజిక పర్యాయపదాలు & ఉప-శాఖలు',
    bannerTitle: 'సూర్యవంశ గజపతి సామ్రాజ్య భౌగోళిక విస్తరణ (సుమారు క్రీ.శ. 1465)',
    bannerSubtitle: 'గంగ నుండి కావేరి వరకు ఆధిపత్యం (చక్రవర్తి కపిలేంద్ర దేవుని స్వర్ణయుగం)',
    bannerBadge: 'శాసన ఆధారిత పట పునర్నిర్మాణం',
    bannerVerification: 'శాసన సరిహద్దు నమూనా',
    northernFrontierLabel: 'ఉత్తర సరిహద్దు',
    northernFrontierVal: 'హుగ్లీ / మందారన్ (దిగువ బెంగాల్)',
    imperialCoreLabel: 'సామ్రాజ్య కేంద్రం',
    imperialCoreVal: 'వారణాసి కటకం (కటక్) & శ్రీక్షేత్ర పూరీ',
    southernFrontierLabel: 'దక్షిణ సరిహద్దు',
    southernFrontierVal: 'శ్రీరంగం & తిరుచిరాపల్లి (కావేరి లోయ)',
    bannerFullText:
      'వెలిగలాని తామ్రశాసనం (క్రీ.శ. 1458), లింగరాజ ఆలయ శాసనాలు (క్రీ.శ. 1452), ద్రాక్షారామ మరియు సింహాచలం స్తంభ శాసనాలు, కొండవీడు మరియు ఉదయగిరి కోట బురుజులు, కుమార హంవీర దేవుని శ్రీరంగం దానాలు (క్రీ.శ. 1464) ఆధారంగా సూర్యవంశ గజపతి సామ్రాజ్యం ఉత్తరాన భాగీరథీ-హుగ్లీ నుండి దక్షిణాన కావేరి నది వరకు విస్తరించింది.',
    bannerFullTextLabel: 'పట నిర్మాణ పద్ధతి & శాసన ఆధారాల సమన్వయం'
  },
  kn: {
    ancientNameLabel: 'ಪ್ರಾಚೀನ ಹೆಸರು',
    historicalRegionLabel: 'ಐತಿಹಾಸಿಕ ಪ್ರದೇಶ',
    modernDistrictStateLabel: 'ಆಧುನಿಕ ಜಿಲ್ಲೆ ಮತ್ತು ರಾಜ್ಯ',
    frontierBadgeSuffix: 'ಗಡಿ ಮತ್ತು ಕೋಟೆ',
    verificationStatusSite: 'ಪುರಾತತ್ವ ಮತ್ತು ಶಾಸನ ತಾಣ',
    geographySignificanceLabel: 'ಐತಿಹಾಸಿಕ ಭೂಗೋಳ ಮತ್ತು ಆಯಕಟ್ಟಿನ ಮಹತ್ವ',
    archaeologicalFindingsHeading: 'ಪುರಾತತ್ವ ಸಮೀಕ್ಷೆ ಮತ್ತು ರಚನಾತ್ಮಕ ಸಂಶೋಧನೆಗಳು',
    inscriptionsHeading: 'ಈ ತಾಣದಲ್ಲಿ ದೊರೆತ ದೃಢೀಕರಣ ಶಾಸನಗಳು',
    statesTerritoriesLabel: 'ರಾಜ್ಯಗಳು ಮತ್ತು ಪ್ರದೇಶಗಳು',
    migrationEpochLabel: 'ವಲಸೆ ಯುಗ ಮತ್ತು ಮಾರ್ಗ',
    keyCitiesLabel: 'ಪ್ರಮುಖ ನಗರಗಳು ಮತ್ತು ಜಿಲ್ಲೆಗಳು',
    verificationStatusCorridor: 'ದಾಖಲಿತ ಐತಿಹಾಸಿಕ ಮಾರ್ಗ',
    regionalOverviewLabel: 'ಪ್ರಾದೇಶಿಕ ಅವಲೋಕನ ಮತ್ತು ಐತಿಹಾಸಿಕ ಪಥ',
    citadelsFortsHeading: 'ಐತಿಹಾಸಿಕ ಕೋಟೆಗಳು, ದುರ್ಗಗಳು ಮತ್ತು ಜಲ ನಿರ್ಮಾಣಗಳು',
    sacredCentersHeading: 'ಪ್ರಮುಖ ಪವಿತ್ರ ಕೇಂದ್ರಗಳು ಮತ್ತು ಕ್ಷೇತ್ರಗಳು',
    communitySynonymsHeading: 'ಪ್ರಮುಖ ಸಮುದಾಯ ಪರ್ಯಾಯ ನಾಮಗಳು ಮತ್ತು ಉಪ-ಪಂಗಡಗಳು',
    bannerTitle: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯದ ಭೌಗೋಳಿಕ ವಿಸ್ತಾರ (ಸು. ಸಾಮಾನ್ಯ ಶಕ 1465)',
    bannerSubtitle: 'ಗಂಗೆಯಿಂದ ಕಾವೇರಿಯವರೆಗೆ ಸಾರ್ವಭೌಮತ್ವ (ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವನ ಕಾಲದ ಉತ್ತುಂಗ)',
    bannerBadge: 'ಶಾಸನಾಧಾರಿತ ನಕ್ಷೆಯ ಪುನರ್ನಿರ್ಮಾಣ',
    bannerVerification: 'ಶಾಸನ ಗಡಿ ಮಾದರಿ',
    northernFrontierLabel: 'ಉತ್ತರ ಗಡಿ',
    northernFrontierVal: 'ಹೂಗ್ಲಿ / ಮಂದಾರನ್ (ಕೆಳ ಬಂಗಾಳ)',
    imperialCoreLabel: 'ಸಾಮ್ರಾಜ್ಯದ ಕೇಂದ್ರ',
    imperialCoreVal: 'ವಾರಣಾಸಿ ಕಟಕ (ಕಟಕ್) ಮತ್ತು ಶ್ರೀಕ್ಷೇತ್ರ ಪುರಿ',
    southernFrontierLabel: 'ದಕ್ಷಿಣ ಗಡಿ',
    southernFrontierVal: 'ಶ್ರೀರಂಗಂ ಮತ್ತು ತಿರುಚಿರಾಪಳ್ಳಿ (ಕಾವೇರಿ ಕಣಿವೆ)',
    bannerFullText:
      'ವೆಲಿಗಲಾನಿ ತಾಮ್ರಶಾಸನ (ಸಾ.ಶ. 1458), ಲಿಂಗರಾಜ ದೇವಾಲಯದ ಘೋಷಣೆಗಳು (ಸಾ.ಶ. 1452), ದ್ರಾಕ್ಷಾರಾಮ ಮತ್ತು ಸಿಂಹಾಚಲಂ ಸ್ತಂಭ ಶಾಸನಗಳು, ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ಕೋಟೆ ಕೊತ್ತಲಗಳು ಹಾಗೂ ಕುಮಾರ ಹಂವೀರ ದೇವನ ಶ್ರೀರಂಗಂ ದಾನ ಶಾಸನಗಳ (ಸಾ.ಶ. 1464) ಆಧಾರದ ಮೇಲೆ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯವು ಉತ್ತರದ ಭಾಗೀರಥಿ-ಹೂಗ್ಲಿಯಿಂದ ದಕ್ಷಿಣದ ಕಾವೇರಿ ನದಿಯವರೆಗೆ ವಿಸ್ತರಿಸಿತ್ತು.',
    bannerFullTextLabel: 'ನಕ್ಷೆ ವಿಧಾನ ಮತ್ತು ಶಾಸನ ದೊರೆತ ಸ್ಥಳಗಳ ಸಮನ್ವಯ'
  },
  ta: {
    ancientNameLabel: 'பண்டைய பெயர்',
    historicalRegionLabel: 'வரலாற்றுப் பகுதி',
    modernDistrictStateLabel: 'நவீன மாவட்டம் மற்றும் மாநிலம்',
    frontierBadgeSuffix: 'எல்லை மற்றும் கோட்டை',
    verificationStatusSite: 'தொல்லியல் மற்றும் கல்வெட்டுத் தளம்',
    geographySignificanceLabel: 'வரலாற்றுப் புவியியல் மற்றும் மூலோபாய முக்கியத்துவம்',
    archaeologicalFindingsHeading: 'தொல்லியல் ஆய்வு மற்றும் கட்டுமானக் கண்டுபிடிப்புகள்',
    inscriptionsHeading: 'இவ்விடத்தில் கண்டெடுக்கப்பட்ட கல்வெட்டு சான்றுகள்',
    statesTerritoriesLabel: 'மாநிலங்கள் மற்றும் பிரதேசங்கள்',
    migrationEpochLabel: 'இடப்பெயர்வு சகாப்தம் மற்றும் பாதை',
    keyCitiesLabel: 'முக்கிய நகரங்கள் மற்றும் மாவட்டங்கள்',
    verificationStatusCorridor: 'ஆவணப்படுத்தப்பட்ட வரலாற்றுப் பாதை',
    regionalOverviewLabel: 'பிராந்தியக் கண்ணோட்டம் மற்றும் வரலாற்றுப் போக்கு',
    citadelsFortsHeading: 'வரலாற்றுக் கோட்டைகள், அரண்கள் மற்றும் நீரியல் சின்னங்கள்',
    sacredCentersHeading: 'முக்கிய புனிதத் தலங்கள் மற்றும் சேத்திரங்கள்',
    communitySynonymsHeading: 'முக்கிய சமூகப் பெயர்கள் மற்றும் உட்பிரிவுகள்',
    bannerTitle: 'சூரியவம்ச கஜபதி பேரரசின் நிலப்பரப்பு விரிவாக்கம் (கி.பி. 1465)',
    bannerSubtitle: 'கங்கை முதல் காவிரி வரை மேலாதிக்கம் (பேரரசர் கபிலேந்திர தேவரின் உச்சக்கட்டம்)',
    bannerBadge: 'கல்வெட்டு ஆதார வரைபட மீள்கட்டமைப்பு',
    bannerVerification: 'கல்வெட்டு எல்லை மாதிரி',
    northernFrontierLabel: 'வடக்கு எல்லை',
    northernFrontierVal: 'ஹூக்ளி / மந்தாரன் (கீழ் வங்காளம்)',
    imperialCoreLabel: 'பேரரசின் மையம்',
    imperialCoreVal: 'வாரணாசி கட்டக் மற்றும் ஸ்ரீஷேத்திர புரி',
    southernFrontierLabel: 'தெற்கு எல்லை',
    southernFrontierVal: 'ஸ்ரீரங்கம் மற்றும் திருச்சிராப்பள்ளி (காவிரிப் படுகை)',
    bannerFullText:
      'வெலிகலானி செப்பேடு (கி.பி. 1458), லிங்கராஜ கோயில் கல்வெட்டுகள் (கி.பி. 1452), திராட்சாராமம் மற்றும் சிம்மாச்சலம் தூண் கல்வெட்டுகள், கொண்டவீடு மற்றும் உதயகிரி கோட்டைகள் மற்றும் குமார ஹம்வீர தேவரின் ஸ்ரீரங்கம் கொடைக் கல்வெட்டு (கி.பி. 1464) ஆகியவற்றின் அடிப்படையில் சூரியவம்ச கஜபதி பேரரசு வடக்கே பாகீரதி-ஹூக்ளி முதல் தெற்கே காவிரி ஆறு வரை பரவியிருந்தது.',
    bannerFullTextLabel: 'வரைபட முறைமை மற்றும் கல்வெட்டு இடங்களின் தொகுப்பு'
  },
  mr: {
    ancientNameLabel: 'प्राचीन नाव',
    historicalRegionLabel: 'ऐतिहासिक प्रदेश',
    modernDistrictStateLabel: 'आधुनिक जिल्हा आणि राज्य',
    frontierBadgeSuffix: 'सीमा आणि दुर्ग',
    verificationStatusSite: 'पुरातत्त्वीय आणि शिलालेखीय स्थळ',
    geographySignificanceLabel: 'ऐतिहासिक भूगोल आणि सामरिक महत्त्व',
    archaeologicalFindingsHeading: 'पुरातत्त्वीय सर्वेक्षण आणि स्थापत्य निष्कर्ष',
    inscriptionsHeading: 'स्थळावर सापडलेले पुष्टीकारक शिलालेख',
    statesTerritoriesLabel: 'राज्ये आणि प्रदेश',
    migrationEpochLabel: 'स्थलांतर युग आणि मार्ग',
    keyCitiesLabel: 'प्रमुख शहरे आणि जिल्हे',
    verificationStatusCorridor: 'दस्तऐवजीकृत ऐतिहासिक मार्ग',
    regionalOverviewLabel: 'प्रादेशिक आढावा आणि ऐतिहासिक वाटचाल',
    citadelsFortsHeading: 'ऐतिहासिक किल्ले, दुर्ग आणि जल-स्थापत्य',
    sacredCentersHeading: 'प्रमुख पवित्र केंद्रे आणि क्षेत्रे',
    communitySynonymsHeading: 'प्रमुख समुदाय पर्यायी नावे आणि पोटशाखा',
    bannerTitle: 'सूर्यवंश गजपती साम्राज्याचा प्रादेशिक विस्तार (इ.स. १४६५)',
    bannerSubtitle: 'गंगा ते कावेरी अधिपत्य (सम्राट कपिलेन्द्र देव यांच्या काळातील उत्कर्ष)',
    bannerBadge: 'सत्यापित नकाशाशास्त्रीय पुनर्रचना',
    bannerVerification: 'शिलालेखीय सीमा प्रारूप',
    northernFrontierLabel: 'उत्तरेकडील सीमा',
    northernFrontierVal: 'हुगळी / मंदारन (दक्षिण बंगाल)',
    imperialCoreLabel: 'साम्राज्याचे केंद्र',
    imperialCoreVal: 'वाराणसी कटक आणि श्रीक्षेत्र पुरी',
    southernFrontierLabel: 'दक्षिणेकडील सीमा',
    southernFrontierVal: 'श्रीरंगम आणि तिरुचिरापल्ली (कावेरी खोरे)',
    bannerFullText:
      'वेलिगलानी ताम्रपट (इ.स. १४५८), लिंगराज मंदिर शिलालेख (इ.स. १४५२), द्राक्षाराम आणि सिंहाचलम स्तंभलेख, कोंडवीडू आणि उदयगिरी किल्ले आणि कुमार हम्वीर देव यांच्या श्रीरंगम दानलेखाच्या (इ.स. १४६४) आधारे सूर्यवंश गजपती साम्राज्य उत्तरेस भागीरथी-हुगळीपासून दक्षिणेस कावेरी नदीपर्यंत पसरलेले होते.',
    bannerFullTextLabel: 'नकाशाशास्त्रीय कार्यपद्धती आणि शिलालेखीय प्राप्तीस्थळ संकलन'
  },
  or: {
    ancientNameLabel: 'ପ୍ରାଚୀନ ନାମକରଣ',
    historicalRegionLabel: 'ଐତିହାସିକ ଅଞ୍ଚଳ',
    modernDistrictStateLabel: 'ଆଧୁନିକ ଜିଲ୍ଲା ଓ ରାଜ୍ୟ',
    frontierBadgeSuffix: 'ସୀମାନ୍ତ ଓ ଦୁର୍ଗ',
    verificationStatusSite: 'ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଓ ଶିଳାଲେଖ ସ୍ଥଳ',
    geographySignificanceLabel: 'ଐତିହାସିକ ଭୂଗୋଳ ଓ ସାମରିକ ମହତ୍ତ୍ୱ',
    archaeologicalFindingsHeading: 'ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ସର୍ବେକ୍ଷଣ ଓ ସ୍ଥାପତ୍ୟ ନିଦର୍ଶନ',
    inscriptionsHeading: 'ଏହି ସ୍ଥଳରୁ ମିଳିଥିବା ପ୍ରମାଣିତ ଶିଳାଲେଖ',
    statesTerritoriesLabel: 'ରାଜ୍ୟ ଓ ଅଞ୍ଚଳ',
    migrationEpochLabel: 'ପ୍ରବାସ ଯୁଗ ଓ ମାର୍ଗ',
    keyCitiesLabel: 'ପ୍ରମୁଖ ସହର ଓ ଜିଲ୍ଲା',
    verificationStatusCorridor: 'ପ୍ରମାଣିତ ଐତିହାସିକ ମାର୍ଗ',
    regionalOverviewLabel: 'ଆଞ୍ଚଳିକ ସମୀକ୍ଷା ଓ ଐତିହାସିକ ଗତିପଥ',
    citadelsFortsHeading: 'ଐତିହାସିକ ଦୁର୍ଗ, ଗଡ଼ ଓ ଜଳ-ସ୍ଥାପତ୍ୟ',
    sacredCentersHeading: 'ପ୍ରମୁଖ ପବିତ୍ର କେନ୍ଦ୍ର ଓ କ୍ଷେତ୍ର',
    communitySynonymsHeading: 'ପ୍ରମୁଖ ସାମାଜିକ ପର୍ଯ୍ୟାୟ ଓ ଉପ-ଶାଖା',
    bannerTitle: 'ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ସାମ୍ରାଜ୍ୟର ଭୌଗୋଳିକ ବିସ୍ତାର (ପ୍ରାୟ ୧୪୬୫ ଖ୍ରୀଷ୍ଟାବ୍ଦ)',
    bannerSubtitle: 'ଗଙ୍ଗାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ଆଧିପତ୍ୟ (ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଶାସନର ଶୀର୍ଷକାଳ)',
    bannerBadge: 'ପ୍ରମାଣିତ ମାନଚିତ୍ର ପୁନର୍നിର୍ମାଣ',
    bannerVerification: 'ଶିଳାଲେଖ ସୀମା ମଡେଲ',
    northernFrontierLabel: 'ଉତ୍ତର ସୀମାନ୍ତ',
    northernFrontierVal: 'ହୁଗୁଳି / ମନ୍ଦାରନ (ନିମ୍ନ ବଙ୍ଗ)',
    imperialCoreLabel: 'ସାମ୍ରାଜ୍ୟର କେନ୍ଦ୍ର',
    imperialCoreVal: 'ବାରାଣସୀ କଟକ ଓ ଶ୍ରୀକ୍ଷେତ୍ର ପୁରୀ',
    southernFrontierLabel: 'ଦକ୍ଷିଣ ସୀମାନ୍ତ',
    southernFrontierVal: 'ଶ୍ରୀରଙ୍ଗମ ଓ ତିରୁଚିରାପଲ୍ଲୀ (କାବେରୀ ଉପତ୍ୟକା)',
    bannerFullText:
      'ବେଲିଗଲାନି ତାମ୍ରପତ୍ର (୧୪୫୮ ଖ୍ରୀଷ୍ଟାବ୍ଦ), ଲିଙ୍ଗରାଜ ମନ୍ଦିର ଶିଳାଲେଖ (୧୪୫୨ ଖ୍ରୀଷ୍ଟାବ୍ଦ), ଦ୍ରାକ୍ଷାରାମ ଓ ସିଂହାଚଳମ ସ୍ତମ୍ଭ ଲେଖ, କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି ଦୁର୍ଗ ଏବଂ କୁମାର ହମ୍ବୀର ଦେବଙ୍କ ଶ୍ରୀରଙ୍ଗମ ଦାନ ଅଭିଲେଖ (୧୪୬୪ ଖ୍ରୀଷ୍ଟାବ୍ଦ) ଆଧାରରେ ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ସାମ୍ରାଜ୍ୟ ଉତ୍ତରରେ ଭାଗୀରଥୀ-ହୁଗୁଳିରୁ ଦକ୍ଷିଣରେ କାବେରୀ ନଦୀ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ ଥିଲା।',
    bannerFullTextLabel: 'ମାନଚିତ୍ର ପ୍ରଣାଳୀ ଓ ଶିଳାଲେଖ ପ୍ରାପ୍ତିସ୍ଥଳ ସମନ୍ୱୟ'
  },
  bn: {
    ancientNameLabel: 'প্রাচীন নামকরণ',
    historicalRegionLabel: 'ঐতিহাসিক অঞ্চল',
    modernDistrictStateLabel: 'আধুনিক জেলা ও রাজ্য',
    frontierBadgeSuffix: 'সীমান্ত ও দুর্গ',
    verificationStatusSite: 'প্রত্নতাত্ত্বিক ও শিলালিপি স্থল',
    geographySignificanceLabel: 'ঐতিহাসিক ভূগোল ও কৌশলগত গুরুত্ব',
    archaeologicalFindingsHeading: 'প্রত্নতাত্ত্বিক জরিপ ও স্থাপত্য নিদর্শন',
    inscriptionsHeading: 'স্থলে প্রাপ্ত প্রামাণ্য শিলালিপি',
    statesTerritoriesLabel: 'রাজ্য ও অঞ্চলসমূহ',
    migrationEpochLabel: 'অভিবাসন যুগ ও করিডোর',
    keyCitiesLabel: 'প্রধান শহর ও জেলা',
    verificationStatusCorridor: 'নথিভুক্ত ঐতিহাসিক করিডোর',
    regionalOverviewLabel: 'আঞ্চলিক পর্যালোচনা ও ঐতিহাসিক গতিপথ',
    citadelsFortsHeading: 'ঐতিহাসিক দুর্গ, গড় ও জল-স্থাপত্য',
    sacredCentersHeading: 'প্রধান পবিত্র কেন্দ্র ও ক্ষেত্রসমূহ',
    communitySynonymsHeading: 'প্রধান সম্প্রদায়গত সমার্থক নাম ও উপ-শাখা',
    bannerTitle: 'সূর্যবংশ গজপতি সাম্রাজ্যের ভৌগোলিক বিস্তার (আনুমানিক ১৪৬৫ খ্রিস্টাব্দ)',
    bannerSubtitle: 'গঙ্গা থেকে কাবেরী পর্যন্ত আধিপত্য (সম্রাট কপিলেন্দ্র দেবের আমলে শীর্ষবিন্দু)',
    bannerBadge: 'প্রামাণ্য মানচিত্র পুনর্গঠন',
    bannerVerification: 'শিলালিপিভিত্তিক সীমানা মডেল',
    northernFrontierLabel: 'উত্তর সীমান্ত',
    northernFrontierVal: 'হুগলি / মান্দারন (নিম্ন বঙ্গ)',
    imperialCoreLabel: 'সাম্রাজ্যের কেন্দ্র',
    imperialCoreVal: 'বারাণসী কটক ও শ্রীক্ষেত্র পুরী',
    southernFrontierLabel: 'দক্ষিণ সীমান্ত',
    southernFrontierVal: 'শ্রীরঙ্গম ও তিরুচিরাপল্লী (কাবেরী অববাহিকা)',
    bannerFullText:
      'ভেলিগলানি তাম্রশাসন (১৪৫৮ খ্রিস্টাব্দ), লিঙ্গরাজ মন্দিরের ঘোষণা (১৪৫২ খ্রিস্টাব্দ), দ্রাক্ষারাম ও সিংহাচলম স্তম্ভলিপি, কোন্ডাভিড়ু ও উদয়গিরি দুর্গপ্রাচীর এবং কুমার হম্বীর দেবের শ্রীরঙ্গম দানলিপি (১৪৬৪ খ্রিস্টাব্দ) অনুসারে সূর্যবংশ গজপতি সাম্রাজ্য উত্তরে ভাগীরথী-হুগলি থেকে দক্ষিণে কাবেরী নদী পর্যন্ত বিস্তৃত ছিল।',
    bannerFullTextLabel: 'মানচিত্র পদ্ধতি ও শিলালিপি প্রাপ্তিস্থান সংশ্লেষণ'
  }
};

export const HistoricalMapsPage: React.FC<HistoricalMapsPageProps> = ({ onNavigate }) => {
  const { language, translateText } = useLanguage();
  const ui = MAPS_MODAL_UI[language] || MAPS_MODAL_UI.en;
  const [locations, setLocations] = useState<HistoricalLocation[]>(() => getCanonicalLocations(language));
  const [activeView, setActiveView] = useState<'cartography' | 'corridors'>('cartography');
  const [activeRegion, setActiveRegion] = useState<string>('All');
  const [selectedCorridor, setSelectedCorridor] = useState<GeographicalSpreadRegion>(GEOGRAPHICAL_SPREAD[0]);
  const [activeModalTarget, setActiveModalTarget] = useState<
    | { type: 'location'; id: string }
    | { type: 'corridor'; id: string }
    | { type: 'banner' }
    | null
  >(null);

  useEffect(() => {
    setLocations(getCanonicalLocations(language));
    fetch(`/api/content/locations?lang=${language}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.locations && data.locations.length > 0) {
          setLocations(data.locations);
        }
      })
      .catch(() => {});
  }, [language]);

  const regions = ['All', 'Odra', 'Utkala', 'Kalinga', 'Deccan & South'];

  const filteredLocations = locations.filter(loc =>
    activeRegion === 'All' || loc.region.toLowerCase() === activeRegion.toLowerCase()
  );

  const buildLocationModalItem = (loc: HistoricalLocation): ContentDetailItem => ({
    id: loc.id,
    title: loc.name,
    subtitle: `${ui.ancientNameLabel}: ${loc.ancient_name} • ${loc.modern_district}, ${loc.modern_state}`,
    badge: `${loc.region} • ${ui.frontierBadgeSuffix}`,
    verificationStatus: ui.verificationStatusSite,
    imageUrl: loc.image_url,
    imageLayout: 'banner',
    metadata: [
      { label: ui.ancientNameLabel, value: loc.ancient_name },
      { label: ui.historicalRegionLabel, value: loc.region },
      { label: ui.modernDistrictStateLabel, value: `${loc.modern_district}, ${loc.modern_state}` }
    ],
    fullText: loc.summary,
    fullTextLabel: ui.geographySignificanceLabel,
    sections: [
      {
        heading: ui.archaeologicalFindingsHeading,
        type: 'text',
        content: loc.archaeological_findings
      },
      ...(loc.inscriptions_found && loc.inscriptions_found.length > 0
        ? [{
            heading: ui.inscriptionsHeading,
            type: 'list' as const,
            items: loc.inscriptions_found
          }]
        : [])
    ]
  });

  const buildCorridorModalItem = (reg: GeographicalSpreadRegion): ContentDetailItem => {
    const localizedTitle = reg.localized_region[language] || reg.region_name;
    const overview = reg.regional_overview[language] || reg.regional_overview.en;
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    const corridorImageMap: Record<string, string> = {
      geo_rajasthan_sindh_punjab: `${base}oad_hydraulic_stepwell.jpg`,
      geo_gujarat: `${base}jasma_devi_sahasralinga.jpg`,
      geo_maharashtra: `${base}shivayogi_siddharama_solapur.jpg`,
      geo_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
      geo_andhra_telangana: `${base}kondavidu_fort_hills.jpg`,
      geo_tamil_nadu: `${base}srirangam_temple.jpg`,
      geo_odisha: `${base}barabati_fort_gateway.jpg`
    };
    return {
      id: reg.id,
      title: localizedTitle,
      subtitle: `${ui.statesTerritoriesLabel}: ${reg.states_and_territories.join(', ')}`,
      badge: `${ui.migrationEpochLabel}: ${reg.migration_epoch_and_corridor}`,
      verificationStatus: ui.verificationStatusCorridor,
      imageUrl: corridorImageMap[reg.id] || `${base}odra_kalinga_map.jpg`,
      imageLayout: 'banner',
      metadata: [
        { label: ui.statesTerritoriesLabel, value: reg.states_and_territories.join(', ') },
        { label: ui.migrationEpochLabel, value: reg.migration_epoch_and_corridor },
        { label: ui.keyCitiesLabel, value: reg.prominent_cities_districts.join(', ') }
      ],
      fullText: overview,
      fullTextLabel: ui.regionalOverviewLabel,
      sections: [
        {
          heading: ui.citadelsFortsHeading,
          type: 'list',
          items: reg.historical_forts_and_landmarks
        },
        {
          heading: ui.sacredCentersHeading,
          type: 'list',
          items: reg.sacred_centers
        },
        {
          heading: ui.communitySynonymsHeading,
          type: 'tags',
          items: reg.predominant_community_synonyms
        }
      ]
    };
  };

  const buildBannerModalItem = (): ContentDetailItem => ({
    id: 'map_1465_zenith',
    title: ui.bannerTitle,
    subtitle: ui.bannerSubtitle,
    badge: ui.bannerBadge,
    verificationStatus: ui.bannerVerification,
    imageUrl: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/gajapathi_empire_map_1465.jpg`,
    imageLayout: 'banner',
    metadata: [
      { label: ui.northernFrontierLabel, value: ui.northernFrontierVal },
      { label: ui.imperialCoreLabel, value: ui.imperialCoreVal },
      { label: ui.southernFrontierLabel, value: ui.southernFrontierVal }
    ],
    fullText: ui.bannerFullText,
    fullTextLabel: ui.bannerFullTextLabel,
    sources: [
      { title: 'Epigraphia Indica, Vol. XXXIII (Veligalani Plates of Kapilendra Deva)', author: 'Dr. D.C. Sircar', year: '1458 CE', type: 'Primary Inscription' },
      { title: 'Annual Report on Indian Epigraphy (Srirangam Inscription of Hamvira Deva)', author: 'Archaeological Survey of India', year: '1464 CE', type: 'Primary Inscription' },
      { title: 'The Suryavamsi Gajapatis of Orissa', author: 'Dr. R. Subrahmanyam', year: '1957', type: 'Scholarly Monograph' }
    ]
  });

  const openLocationModal = (loc: HistoricalLocation) => setActiveModalTarget({ type: 'location', id: loc.id });
  const openCorridorModal = (reg: GeographicalSpreadRegion) => setActiveModalTarget({ type: 'corridor', id: reg.id });
  const openCartographicBannerModal = () => setActiveModalTarget({ type: 'banner' });

  const modalItem: ContentDetailItem | null = (() => {
    if (!activeModalTarget) return null;
    if (activeModalTarget.type === 'location') {
      const loc = locations.find(l => l.id === activeModalTarget.id);
      return loc ? buildLocationModalItem(loc) : null;
    }
    if (activeModalTarget.type === 'corridor') {
      const reg = GEOGRAPHICAL_SPREAD.find(r => r.id === activeModalTarget.id);
      return reg ? buildCorridorModalItem(reg) : null;
    }
    return buildBannerModalItem();
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-[#D8C3A2] pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#76501F] font-royal-heading">
          <Compass className="w-4 h-4 text-[#A87924]" />
          <span>{translateText('maps', 'Historical Cartography & Archaeological Geography')}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#54351F]">
          {language === 'te'
            ? 'చారిత్రక నక్షాలు, కోటలు మరియు అఖిల భారత భౌగోళిక విస్తరణ'
            : language === 'hi'
            ? 'ऐतिहासिक मानचित्र, दुर्ग एवं अखिल भारतीय भौगोलिक प्रसार'
            : language === 'or'
            ? 'ଐତିହାସିକ ମାନଚିତ୍ର, ଦୁର୍ଗ ଓ ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ବିସ୍ତାର'
            : language === 'kn'
            ? 'ಐತಿಹಾಸಿಕ ನಕ್ಷೆಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಅಖಿಲ ಭಾರತೀಯ ಭೌಗೋಳಿಕ ಹರಡುವಿಕೆ'
            : language === 'ta'
            ? 'வரலாற்று வரைபடங்கள், கோட்டைகள் மற்றும் அகில இந்திய புவியியல் பரவல்'
            : language === 'mr'
            ? 'ऐतिहासिक नकाशे, किल्ले आणि अखिल भारतीय भौगोलिक विस्तार'
            : language === 'bn'
            ? 'ঐতিহাসিক মানচিত্র, দুর্গ ও সর্বভারতীয় ভৌগোলিক বিস্তার'
            : 'Historical Maps, Fortresses & Pan-Indian Corridors'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948] max-w-3xl leading-relaxed">
          {language === 'te'
            ? 'శాసన ఆధారిత సరిహద్దులు మరియు ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ, ఒడ్డే, వడ్డెరాజులు, వడ్డార్ సమాజాల 7 ప్రధాన అఖిల భారత వలస మార్గాలు.'
            : language === 'hi'
            ? 'अभिलेखीय सीमाएं एवं ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु, वड्डार समाजों के ७ प्रमुख अखिल भारतीय प्रवास गलियारे।'
            : language === 'or'
            ? 'ଶିଳାଲେଖ ଆଧାରିତ ସୀମା ଏବଂ ଓଡ଼-ରାଜପୁତ, ଓଡ଼-କ୍ଷତ୍ରିୟ, ଓଡ଼ିଆରାଜୁ ଓ ୱଡ୍ଡାର ସମାଜର ୭ଟି ପ୍ରମୁଖ ସର୍ବଭାରତୀୟ ପ୍ରବାସ ମାର୍ଗ।'
            : language === 'kn'
            ? 'ಶಾಸನಾಧಾರಿತ ಗಡಿಗಳು ಮತ್ತು ಓಡ್-ರಜಪೂತ್, ಓಡ್-ಕ್ಷತ್ರಿಯ, ಒಡ್ಡೇ, ವಡ್ಡೇರಾಜುಲು, ವಡ್ಡಾರ ಸಮುದಾಯಗಳ 7 ಪ್ರಮುಖ ಅಖಿಲ ಭಾರತೀಯ ವಲಸೆ ಮಾರ್ಗಗಳು.'
            : language === 'ta'
            ? 'கல்வெட்டு எல்லைகள் மற்றும் ஓட்-ராஜபுத், ஓட்-சத்திரியர், ஒட்டே, வட்டேராஜுலு சமூகங்களின் 7 முக்கிய அகில இந்தியப் பாதைகள்.'
            : language === 'mr'
            ? 'शिलालेखीय सीमा आणि ओड-राजपूत, ओड-क्षत्रिय, ओडियाराजू, वडार समाजांचे ७ प्रमुख अखिल भारतीय प्रवास मार्ग.'
            : language === 'bn'
            ? 'শিলালিপিভিত্তিক সীমানা এবং ওড-রাজপুত, ওড-ক্ষত্রিয়, ওডিয়ারাজু ও ওয়াদ্দার সমাজের ৭টি প্রধান সর্বভারতীয় বিস্তার করিডোর।'
            : 'Epigraphic boundary models and comprehensive geographical corridors of the Oad-Rajput, Od-Kshatriya, Odde, VaddeRajulu, and Waddar communities across 7 historic regional zones.'}
        </p>
      </div>

      {/* Primary View Switcher */}
      <div className="flex items-center gap-3 border-b border-[#D8C3A2] pb-3">
        <button
          onClick={() => setActiveView('cartography')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeView === 'cartography'
              ? 'bg-[#762D35] text-white border border-[#762D35] shadow-sm'
              : 'bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2] hover:bg-[#E9D9BE]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Imperial Frontiers &amp; Citadels (1465 CE)</span>
        </button>

        <button
          onClick={() => setActiveView('corridors')}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
            activeView === 'corridors'
              ? 'bg-[#762D35] text-white border border-[#762D35] shadow-sm'
              : 'bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2] hover:bg-[#E9D9BE]'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>2. Pan-Indian Community Spreading (7 Corridors)</span>
        </button>
      </div>

      {activeView === 'cartography' ? (
        <>
          {/* Cartographic Reconstruction Display */}
          <div
            onClick={openCartographicBannerModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCartographicBannerModal();
              }
            }}
            className="rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] overflow-hidden shadow-md p-6 sm:p-8 space-y-6 cursor-pointer transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8C3A2] pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#76501F]">
                  Corroborated Reconstruction (c. 1465 CE)
                </span>
                <h2 className="font-royal-heading font-bold text-xl sm:text-2xl text-[#54351F] group-hover:text-[#762D35] transition-colors mt-0.5">
                  Territorial Extent of Suryavamsha Gajapathi Empire
                </h2>
              </div>
              <div className="p-2 px-3 rounded-lg bg-[#FFF9EF] border border-[#D8C3A2] text-xs text-[#76501F] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#A87924] shrink-0" />
                <span>Click map to inspect Epigraphic Boundary Model</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-[#0B1B3D] border-2 border-[#D4AF37]">
                <img
                  src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/gajapathi_empire_map_1465.jpg`}
                  alt="Labeled Historical Map of Suryavamsha Gajapathi Empire (1465 CE) from Ganga to Kaveri"
                  loading="eager"
                  className="w-full h-full object-contain bg-[#0B1B3D] group-hover:scale-[1.02] transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0B1B3D]/95 border border-[#D4AF37] text-[#F5E1A4] text-[10px] font-bold uppercase tracking-wider shadow">
                  Cartographic Reconstruction • Labeled Atlas
                </span>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl overflow-hidden bg-[#0B1B3D] border-2 border-[#D4AF37]/80 text-[#FFFCF5]">
                <div className="relative h-56 overflow-hidden border-b border-[#D4AF37]/50">
                  <img
                    src={`${(import.meta as any).env?.BASE_URL || '/'}assets/archive/odra_kalinga_map.jpg`}
                    alt="Museum Map of Eastern Ganga Emperor Narasimhadeva I Empire (1238-1264 CE)"
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded bg-[#762D35]/95 border border-[#D4AF37]/70 text-[#FFF8E7] text-[10px] font-bold uppercase">
                    Verified Museum Map (1238–1264 CE)
                  </span>
                </div>
                <div className="p-5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
                      Epigraphic Findspot Synthesis
                    </span>
                    <h3 className="font-royal-heading font-bold text-base sm:text-lg text-[#FFF7DF]">
                      Ganges to Kaveri Hegemony (Zenith under Kapilendra Deva)
                    </h3>
                    <p className="text-xs text-[#E5DEC9] leading-relaxed">
                      Corroborated by the Veligalani copper-plate grant (1458 CE), Lingaraja temple proclamations (1452 CE), Kondavidu and Udayagiri fortress bastions, Kolletikota Jala-Durga, and Srirangam donations (1464 CE).
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#D4AF37]/30 flex items-center justify-between text-xs font-bold text-[#F5E1A4]">
                    <span>Inspect Full Boundary Model</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Region Filter and Archaeological Locations Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-royal-heading font-bold text-xl text-[#54351F]">
                Historical Capitals, Citadels &amp; Sacred Kshetrams
              </h2>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {regions.map(r => (
                  <button
                    key={r}
                    onClick={() => setActiveRegion(r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeRegion === r
                        ? 'bg-[#762D35] text-white shadow-sm'
                        : 'bg-[#EFE3D0] text-[#54351F] border border-[#D8C3A2] hover:bg-[#E9D9BE]'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map(loc => (
                <div
                  key={loc.id}
                  onClick={() => openLocationModal(loc)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLocationModal(loc);
                    }
                  }}
                  className="rounded-2xl bg-[#FFFCF5] border border-[#D8C3A2] hover:border-[#A87924] overflow-hidden shadow-md transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="h-44 w-full overflow-hidden relative bg-[#EFE3D0] border-b border-[#D8C3A2]">
                    <img
                      src={loc.image_url}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292521]/40 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#762D35] px-2.5 py-1 rounded-full shadow-sm">
                        {loc.region}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#76501F] font-semibold">
                        Ancient: {loc.ancient_name}
                      </div>
                      <h3 className="font-royal-heading font-bold text-base text-[#54351F] group-hover:text-[#762D35] transition-colors">
                        {loc.name}
                      </h3>
                      <p className="text-xs text-[#292521] mt-2 leading-relaxed line-clamp-3">
                        {loc.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#D8C3A2] text-[11px] text-[#6B5948] flex items-center justify-between">
                      <span>{loc.modern_district}, {loc.modern_state}</span>
                      <span className="text-[#76501F] group-hover:text-[#A87924] font-semibold">Explore Citations →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Pan-Indian Geographical Spreading View */
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Corridor Selector */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-[#76501F] px-1">
                7 Major Historical Regional Corridors
              </div>
              <div className="space-y-2.5">
                {GEOGRAPHICAL_SPREAD.map((reg) => {
                  const isSelected = selectedCorridor.id === reg.id;
                  const localizedTitle = reg.localized_region[language] || reg.region_name;
                  const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
                  const corridorImageMap: Record<string, string> = {
                    geo_rajasthan_sindh_punjab: `${base}oad_hydraulic_stepwell.jpg`,
                    geo_gujarat: `${base}jasma_devi_sahasralinga.jpg`,
                    geo_maharashtra: `${base}shivayogi_siddharama_solapur.jpg`,
                    geo_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
                    geo_andhra_telangana: `${base}kondavidu_fort_hills.jpg`,
                    geo_tamil_nadu: `${base}srirangam_temple.jpg`,
                    geo_odisha: `${base}barabati_fort_gateway.jpg`
                  };
                  const thumbUrl = corridorImageMap[reg.id] || `${base}odra_kalinga_map.jpg`;
                  return (
                    <div
                      key={reg.id}
                      onClick={() => {
                        setSelectedCorridor(reg);
                        openCorridorModal(reg);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedCorridor(reg);
                          openCorridorModal(reg);
                        }
                      }}
                      className={`p-4 rounded-xl cursor-pointer border transition-all ${
                        isSelected
                          ? 'bg-[#EFE3D0] border-[#762D35] shadow-md'
                          : 'bg-[#FFFCF5] border-[#D8C3A2] hover:border-[#A87924] hover:bg-[#FFF9EF]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={thumbUrl}
                          alt={localizedTitle}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.dataset.fallback) {
                              target.dataset.fallback = '1';
                              target.src = `${base}barabati_fort_gateway.jpg`;
                            }
                          }}
                          className="w-16 h-16 rounded-xl object-cover object-center shrink-0 border border-[#D8C3A2] bg-[#EFE3D0]"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h4 className="font-royal-heading font-bold text-sm text-[#54351F] truncate">
                              {localizedTitle}
                            </h4>
                            <span className="text-[10px] text-[#54351F] bg-[#FFF9EF] px-2 py-0.5 rounded border border-[#D8C3A2] shrink-0 font-semibold">
                              {reg.states_and_territories.length} States
                            </span>
                          </div>
                          <p className="text-xs text-[#6B5948] line-clamp-1 mb-2">
                            {reg.states_and_territories.join(', ')}
                          </p>
                          <div className="flex flex-wrap gap-1 text-[10px]">
                            {reg.predominant_community_synonyms.map(syn => (
                              <span key={syn} className="px-1.5 py-0.5 rounded bg-white text-[#76501F] border border-[#D8C3A2] font-medium">
                                {syn}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed Corridor Dossier */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] space-y-6 shadow-md">
                <div className="h-52 w-full rounded-2xl overflow-hidden relative bg-[#EFE3D0] border border-[#D8C3A2]">
                  <img
                    src={
                      ({
                        geo_rajasthan_sindh_punjab: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/oad_hydraulic_stepwell.jpg`,
                        geo_gujarat: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/jasma_devi_sahasralinga.jpg`,
                        geo_maharashtra: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/shivayogi_siddharama_solapur.jpg`,
                        geo_karnataka: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/balavaddiraju_hero_stone.jpg`,
                        geo_andhra_telangana: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/kondavidu_fort_hills.jpg`,
                        geo_tamil_nadu: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/srirangam_temple.jpg`,
                        geo_odisha: `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/barabati_fort_gateway.jpg`
                      } as Record<string, string>)[selectedCorridor.id] ||
                      `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/odra_kalinga_map.jpg`
                    }
                    alt={selectedCorridor.localized_region[language] || selectedCorridor.region_name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292521]/40 via-transparent to-transparent" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#76501F]">
                    Corridor Dossier • {selectedCorridor.states_and_territories.join(', ')}
                  </span>
                  <h3
                    onClick={() => openCorridorModal(selectedCorridor)}
                    className="font-royal-heading font-extrabold text-2xl text-[#54351F] hover:text-[#762D35] cursor-pointer transition-colors mt-1"
                  >
                    {selectedCorridor.localized_region[language] || selectedCorridor.region_name}
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE3D0] border border-[#A87924]/40 text-[#762D35] text-xs font-semibold">
                    <Navigation className="w-3.5 h-3.5 text-[#A87924]" />
                    <span>Epoch: {selectedCorridor.migration_epoch_and_corridor}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-2">
                  <h4 className="text-xs font-bold uppercase text-[#54351F] tracking-wider">
                    Regional Overview &amp; Historical Trajectory
                  </h4>
                  <p className="text-xs sm:text-sm text-[#292521] leading-relaxed font-royal-serif">
                    {selectedCorridor.regional_overview[language] || selectedCorridor.regional_overview.en}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-2">
                    <span className="text-[#54351F] font-semibold flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-[#A87924]" /> Historical Citadels &amp; Forts:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-[#292521]">
                      {selectedCorridor.historical_forts_and_landmarks.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2] space-y-2">
                    <span className="text-[#54351F] font-semibold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#762D35]" /> Key Sacred Centers &amp; Kshetrams:
                    </span>
                    <ul className="list-disc pl-4 space-y-1 text-[#292521]">
                      {selectedCorridor.sacred_centers.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#EFE3D0]/60 border border-[#D8C3A2] space-y-2">
                  <span className="text-[#54351F] font-semibold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#A87924]" /> Predominant Community Synonyms &amp; Sub-Castes:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCorridor.predominant_community_synonyms.map(syn => (
                      <span key={syn} className="px-2 py-0.5 rounded bg-white text-[#54351F] border border-[#D8C3A2] text-xs font-medium">
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => openCorridorModal(selectedCorridor)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#762D35] text-white hover:bg-[#5E2229] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>Open Full Corridor Modal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Content Detail Modal */}
      <ContentDetailModal
        item={modalItem}
        onClose={() => setActiveModalTarget(null)}
        onHome={() => {
          setActiveModalTarget(null);
          onNavigate('/');
        }}
      />
    </div>
  );
};
