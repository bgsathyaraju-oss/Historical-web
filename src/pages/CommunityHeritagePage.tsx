import React, { useState, useEffect } from 'react';
import {
  Users,
  Crown,
  MapPin,
  Sparkles,
  BookOpen,
  Scroll,
  Shield,
  Search,
  ExternalLink,
  ChevronRight,
  Flame,
  Droplets,
  Landmark,
  X,
  Compass,
  Building,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { EvidenceBadge } from '../components/EvidenceBadge';
import { useLanguage } from '../context/LanguageContext';
import {
  HISTORICAL_FIGURES,
  COMMUNITY_SYNONYMS,
  GEOGRAPHICAL_SPREAD,
  HISTORICAL_MONOGRAPH_SECTIONS,
  HistoricalFigureSummary,
  CommunitySynonym,
  GeographicalSpreadRegion
} from '../data/historyContent';
import { LanguageCode } from '../types';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';

interface CommunityHeritagePageProps {
  onNavigate: (path: string) => void;
  initialTab?: 'synonyms' | 'figures' | 'geography' | 'history';
  initialItemId?: string | null;
}

export const CommunityHeritagePage: React.FC<CommunityHeritagePageProps> = ({
  onNavigate,
  initialTab,
  initialItemId
}) => {
  const { t, language, setLanguage, translateText, getMetadataLabel } = useLanguage();
  const [activeTab, setActiveTab] = useState<'synonyms' | 'figures' | 'geography' | 'history'>(() => {
    if (initialTab) return initialTab;
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam === 'figures' || tabParam === 'synonyms' || tabParam === 'geography' || tabParam === 'history') {
      return tabParam;
    }
    return 'synonyms';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigureSummary | null>(null);
  const [selectedModalRef, setSelectedModalRef] = useState<{ type: 'synonym' | 'region' | 'monograph'; id: string } | null>(null);
  const [synonymCategoryFilter, setSynonymCategoryFilter] = useState<string>('all');

  const openSynonymModal = (item: CommunitySynonym) => {
    setSelectedModalRef({ type: 'synonym', id: item.id });
  };

  const synonymSectionLabels = React.useMemo(() => {
    const dict: Record<
      LanguageCode,
      {
        sectionTitle: string;
        sectionSubtitle: string;
        accuracyHeading: string;
        accuracyBody: string;
        filterAll: string;
        groupDynastic: string;
        groupDynasticDesc: string;
        groupRegional: string;
        groupRegionalDesc: string;
        groupTitles: string;
        groupTitlesDesc: string;
        tableHeading: string;
        tableSubheading: string;
        colDesignation: string;
        colCategory: string;
        colGeography: string;
        colEpistemic: string;
        colSummary: string;
        geoLabel: string;
        statesLabel: string;
        rootLabel: string;
        epistemicLabel: string;
        regionsBtn: string;
        detailsBtn: string;
        epistemicClasses: Record<string, string>;
      }
    > = {
      en: {
        sectionTitle: 'Synonyms, Regional Designations & Martial Titles',
        sectionSubtitle:
          'Categorized overview of dynastic lineages, regional community designations, and traditional martial titles across Odisha, Andhra Pradesh, Telangana, Karnataka, Tamil Nadu, and pan-Indian corridors.',
        accuracyHeading: 'Historical Accuracy & Methodological Note',
        accuracyBody:
          'The designations below are presented as community-associated names, regional ethnonyms, or traditional titles according to their historical context. They are not claimed to be exact linguistic synonyms or to share a single uniform origin in every region; documented epigraphic and gazetteer records are explicitly distinguished from community traditions and ancestral lineage claims.',
        filterAll: 'All Designations',
        groupDynastic: 'Dynastic and lineage designations',
        groupDynasticDesc:
          'Ancestral solar-race (Suryavamsha) and classical Odra lineage identities invoked in royal inscriptions, Puranic traditions, and community genealogies.',
        groupRegional: 'Regional community designations',
        groupRegionalDesc:
          'Geographically anchored community designations documented across Odisha, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, and Maharashtra.',
        groupTitles: 'Historical, martial, and traditional titles',
        groupTitlesDesc:
          'Honorific martial, fortress-command, and chieftaincy titles preserved in regional histories, inscriptions, and community traditions.',
        tableHeading: 'Structured Classification & Geographical Reference Table',
        tableSubheading: 'Tap any row or card to open the full multilingual archival window with script attestations and sources.',
        colDesignation: 'Name / Designation (Exact Spelling)',
        colCategory: 'Category',
        colGeography: 'Geographical Association',
        colEpistemic: 'Historical Basis',
        colSummary: 'Historical & Traditional Context',
        geoLabel: 'Geographical Association:',
        statesLabel: 'States:',
        rootLabel: 'Linguistic Root:',
        epistemicLabel: 'Historical Basis:',
        regionsBtn: 'Regions',
        detailsBtn: 'Details',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'Documented Epigraphic / Historical Record',
          'Regional Ethnonym & Gazetteer Record': 'Regional Ethnonym & Gazetteer Record',
          'Community Tradition & Lineage Claim': 'Community Tradition & Lineage Claim'
        }
      },
      hi: {
        sectionTitle: 'पर्यायवाची नाम, क्षेत्रीय पहचान एवं सामरिक उपाधियाँ',
        sectionSubtitle:
          'ओडिशा, आंध्र प्रदेश, तेलंगाना, कर्नाटक, तमिलनाडु और अखिल भारतीय क्षेत्रों में प्रचलित राजवंशीय नामों, क्षेत्रीय समुदाय संज्ञाओं और पारंपरिक सामरिक उपाधियों का वर्गीकृत विवरण।',
        accuracyHeading: 'ऐतिहासिक प्रामाणिकता एवं कार्यप्रणाली टिप्पणी',
        accuracyBody:
          'नीचे दिए गए नाम उनके ऐतिहासिक संदर्भ के अनुसार समुदाय-संबद्ध नामों, क्षेत्रीय संज्ञाओं या पारंपरिक उपाधियों के रूप में प्रस्तुत किए गए हैं। प्रत्येक नाम को पूर्णतः समानार्थी या एक ही उत्पत्ति का मानने का दावा नहीं किया जाता; प्रमाणित शिलालेखों व गजेटियर साक्ष्यों को सामुदायिक परंपराओं और वंश-दावों से स्पष्ट रूप से अलग दर्शाया गया है।',
        filterAll: 'सभी नाम व उपाधियाँ',
        groupDynastic: 'राजवंशीय एवं वंश-परंपरा संज्ञाएँ (Dynastic and lineage designations)',
        groupDynasticDesc:
          'राजकीय अभिलेखों, पौराणिक परंपराओं और सामुदायिक वंशावलियों में उल्लिखित सूर्यवंशी एवं प्राचीन ओड्र वंश पहचान।',
        groupRegional: 'क्षेत्रीय समुदाय संज्ञाएँ (Regional community designations)',
        groupRegionalDesc:
          'ओडिशा, कर्नाटक, तमिलनाडु, आंध्र प्रदेश, तेलंगाना और महाराष्ट्र में भौगोलिक रूप से प्रचलित क्षेत्रीय समुदाय नाम।',
        groupTitles: 'ऐतिहासिक, सामरिक एवं पारंपरिक उपाधियाँ (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'क्षेत्रीय इतिहास, अभिलेखों और सामुदायिक परंपराओं में संरक्षित दुर्ग-रक्षा, नायकत्व एवं सम्मानजनक क्षत्रिय उपाधियाँ।',
        tableHeading: 'वर्गीकृत एवं भौगोलिक संदर्भ तालिका',
        tableSubheading: 'पूर्ण बहुभाषी विवरण और ऐतिहासिक स्रोत देखने के लिए किसी भी पंक्ति या कार्ड पर टैप करें।',
        colDesignation: 'नाम / उपाधि (मूल वर्तनी)',
        colCategory: 'श्रेणी',
        colGeography: 'भौगोलिक संबद्धता',
        colEpistemic: 'ऐतिहासिक आधार',
        colSummary: 'ऐतिहासिक एवं पारंपरिक संदर्भ',
        geoLabel: 'भौगोलिक संबद्धता:',
        statesLabel: 'प्रमुख राज्य:',
        rootLabel: 'भाषाई मूल:',
        epistemicLabel: 'ऐतिहासिक आधार:',
        regionsBtn: 'क्षेत्र',
        detailsBtn: 'विवरण',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'प्रमाणित अभिलेखीय / ऐतिहासिक साक्ष्य',
          'Regional Ethnonym & Gazetteer Record': 'क्षेत्रीय संज्ञा एवं गजेटियर अभिलेख',
          'Community Tradition & Lineage Claim': 'सामुदायिक परंपरा एवं वंश दावा'
        }
      },
      te: {
        sectionTitle: 'పర్యాయ నామాలు, ప్రాంతీయ గుర్తింపులు & వీర బిరుదులు',
        sectionSubtitle:
          'ఒడిశా, ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక, తమిళనాడు మరియు అఖిల భారత స్థాయిలో ఉన్న వంశ నామాలు, ప్రాంతీయ సామాజిక నామాలు మరియు సాంప్రదాయ వీర బిరుదుల వర్గీకృత వివరణ.',
        accuracyHeading: 'చారిత్రక ప్రామాణికత & పరిశోధనా గమనిక',
        accuracyBody:
          'ఈ క్రింది నామాలు వాటి చారిత్రక సందర్భాన్ని బట్టి సమాజ అనుబంధ నామాలు, ప్రాంతీయ గుర్తింపులు లేదా సాంప్రదాయ బిరుదులుగా అందించబడ్డాయి. ప్రతి పేరు పూర్తిగా ఒకే అర్థం గల పర్యాయపదమని లేదా ప్రతి సమూహానికి ఒకే మూలం ఉందని యాంత్రికంగా నిర్ధారించబడలేదు; శాసన మరియు గెజిటీర్ ఆధారాలను సామాజిక సంప్రదాయాలు మరియు వంశావళి విశ్వాసాల నుండి స్పష్టంగా వేరు చేసి చూపడమైనది.',
        filterAll: 'అన్ని నామాలు & బిరుదులు',
        groupDynastic: 'వంశ మరియు కుల-పరంపర నామాలు (Dynastic and lineage designations)',
        groupDynasticDesc:
          'రాజ శాసనాలు, పురాణ గాథలు మరియు సామాజిక వంశావళులలో పేర్కొనబడిన సూర్యవంశ మరియు ప్రాచీన ఓడ్ర వంశ గుర్తింపులు.',
        groupRegional: 'ప్రాంతీయ సామాజిక నామాలు (Regional community designations)',
        groupRegionalDesc:
          'ఒడిశా, కర్ణాటక, తమిళనాడు, ఆంధ్రప్రదేశ్, తెలంగాణ మరియు మహారాష్ట్రలలో భౌగోళికంగా స్థిరపడిన ప్రాంతీయ సామాజిక నామాలు.',
        groupTitles: 'చారిత్రక, సైనిక మరియు సాంప్రదాయ బిరుదులు (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'ప్రాంతీయ చరిత్రలు, శాసనాలు మరియు సామాజిక సంప్రదాయాలలో నిలిచి ఉన్న దుర్గ రక్షణ, నాయకత్వ మరియు గౌరవ క్షత్రియ బిరుదులు.',
        tableHeading: 'వర్గీకృత & భౌగోళిక సూచిక పట్టిక',
        tableSubheading: 'పూర్తి బహుభాషా చారిత్రక వివరాలను చూడటానికి ఏదైనా వరుస లేదా కార్డుపై నొక్కండి.',
        colDesignation: 'పేరు / బిరుదు (మూల స్పెల్లింగ్)',
        colCategory: 'వర్గం',
        colGeography: 'భౌగోళిక అనుబంధం',
        colEpistemic: 'చారిత్రక ఆధారం',
        colSummary: 'చారిత్రక & సాంప్రదాయ వివరణ',
        geoLabel: 'భౌగోళిక అనుబంధం:',
        statesLabel: 'రాష్ట్రాలు:',
        rootLabel: 'భాషా మూలం:',
        epistemicLabel: 'చారిత్రక ఆధారం:',
        regionsBtn: 'ప్రాంతాలు',
        detailsBtn: 'వివరాలు',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'శాసన / చారిత్రక ఆధారిత నామం',
          'Regional Ethnonym & Gazetteer Record': 'ప్రాంతీయ నామం & గెజిటీర్ నమోదు',
          'Community Tradition & Lineage Claim': 'సామాజిక సంప్రదాయం & వంశావళి గుర్తింపు'
        }
      },
      kn: {
        sectionTitle: 'ಪರ್ಯಾಯ ನಾಮಗಳು, ಪ್ರಾದೇಶಿಕ ಹೆಸರುಗಳು ಮತ್ತು ವೀರ ಬಿರುದುಗಳು',
        sectionSubtitle:
          'ಒಡಿಶಾ, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ, ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಮಟ್ಟದಲ್ಲಿರುವ ವಂಶನಾಮಗಳು, ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯ ಹೆಸರುಗಳು ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ವೀರ ಬಿರುದುಗಳ ವರ್ಗೀಕೃತ ವಿವರಣೆ.',
        accuracyHeading: 'ಐತಿಹಾಸಿಕ ನಿಖರತೆ ಮತ್ತು ಸಂಶೋಧನಾ ಸೂಚನೆ',
        accuracyBody:
          'ಇಲ್ಲಿ ನೀಡಲಾದ ಹೆಸರುಗಳನ್ನು ಅವುಗಳ ಐತಿಹಾಸಿಕ ಸಂದರ್ಭಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಸಮುದಾಯ-ಸಂಬಂಧಿತ ನಾಮಗಳು, ಪ್ರಾದೇಶಿಕ ಹೆಸರುಗಳು ಅಥವಾ ಸಾಂಪ್ರದಾಯಿಕ ಬಿರುದುಗಳಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸಲಾಗಿದೆ. ಪ್ರತಿಯೊಂದು ಹೆಸರೂ ಯಾಂತ್ರಿಕವಾಗಿ ಒಂದೇ ಸಮಾನಾರ್ಥಕ ಪದವೆಂದು ಹೇಳದೆ, ದೃಢೀಕೃತ ಶಾಸನ/ಗೆಜೆಟಿಯರ್ ದಾಖಲೆಗಳನ್ನು ಸಮುದಾಯದ ಸಂಪ್ರದಾಯಗಳು ಮತ್ತು ವಂಶಾವಳಿ ನಂಬಿಕೆಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
        filterAll: 'ಎಲ್ಲಾ ಹೆಸರುಗಳು',
        groupDynastic: 'ರಾಜವಂಶ ಮತ್ತು ಪರಂಪರೆಯ ಹೆಸರುಗಳು (Dynastic and lineage designations)',
        groupDynasticDesc:
          'ರಾಜ ಶಾಸನಗಳು, ಪುರಾಣ ಪರಂಪರೆ ಮತ್ತು ಸಮುದಾಯದ ವಂಶಾವಳಿಗಳಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾದ ಸೂರ್ಯವಂಶ ಮತ್ತು ಪ್ರಾಚೀನ ಓಡ್ರ ಪರಂಪರೆಯ ಹೆಸರುಗಳು.',
        groupRegional: 'ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯದ ಹೆಸರುಗಳು (Regional community designations)',
        groupRegionalDesc:
          'ಒಡಿಶಾ, ಕರ್ನಾಟಕ, ತಮಿಳುನಾಡು, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರಗಳಲ್ಲಿ ಗುರುತಿಸಲ್ಪಟ್ಟ ಪ್ರಾದೇಶಿಕ ಸಮುದಾಯ ನಾಮಗಳು.',
        groupTitles: 'ಐತಿಹಾಸಿಕ, ಸೇನಾ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಬಿರುದುಗಳು (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'ಪ್ರಾದೇಶಿಕ ಇತಿಹಾಸ, ಶಾಸನಗಳು ಮತ್ತು ಸಮುದಾಯದ ಸಂಪ್ರದಾಯಗಳಲ್ಲಿ ಉಳಿದುಬಂದಿರುವ ಕೋಟೆ ರಕ್ಷಣೆ, ನಾಯಕತ್ವ ಮತ್ತು ಕ್ಷತ್ರಿಯ ಬಿರುದುಗಳು.',
        tableHeading: 'ವರ್ಗೀಕೃತ ಮತ್ತು ಭೌಗೋಳಿಕ ಉಲ್ಲೇಖ ಕೋಷ್ಟಕ',
        tableSubheading: 'ಸಂಪೂರ್ಣ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಯಾವುದೇ ಸಾಲು ಅಥವಾ ಕಾರ್ಡ್ ಮೇಲೆ ಟ್ಯಾಪ್ ಮಾಡಿ.',
        colDesignation: 'ಹೆಸರು / ಬಿರುದು (ಮೂಲ ಕಾಗುಣಿತ)',
        colCategory: 'ವರ್ಗ',
        colGeography: 'ಭೌಗೋಳಿಕ ಸಂಬಂಧ',
        colEpistemic: 'ಐತಿಹಾಸಿಕ ಆಧಾರ',
        colSummary: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಹಿನ್ನೆಲೆ',
        geoLabel: 'ಭೌಗೋಳಿಕ ಸಂಬಂಧ:',
        statesLabel: 'ರಾಜ್ಯಗಳು:',
        rootLabel: 'ಭಾಷಾ ಮೂಲ:',
        epistemicLabel: 'ಐತಿಹಾಸಿಕ ಆಧಾರ:',
        regionsBtn: 'ಪ್ರದೇಶಗಳು',
        detailsBtn: 'ವಿವರಗಳು',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'ದೃಢೀಕೃತ ಶಾಸನ / ಐತಿಹಾಸಿಕ ದಾಖಲೆ',
          'Regional Ethnonym & Gazetteer Record': 'ಪ್ರಾದೇಶಿಕ ಹೆಸರು ಮತ್ತು ಗೆಜೆಟಿಯರ್ ದಾಖಲೆ',
          'Community Tradition & Lineage Claim': 'ಸಮುದಾಯ ಸಂಪ್ರದಾಯ ಮತ್ತು ವಂಶ ಪರಂಪರೆ'
        }
      },
      ta: {
        sectionTitle: 'இணைப் பெயர்கள், பிராந்தியப் பெயர்கள் & வீரப் பட்டங்கள்',
        sectionSubtitle:
          'ஒடிசா, ஆந்திரப் பிரதேசம், தெலுங்கானா, கர்நாடகா, தமிழ்நாடு மற்றும் அகில இந்திய அளவில் வழங்கப்படும் வம்சப் பெயர்கள், பிராந்திய சமூகப் பெயர்கள் மற்றும் பாரம்பரிய வீரப் பட்டங்களின் வகைப்படுத்தப்பட்ட தொகுப்பு.',
        accuracyHeading: 'வரலாற்றுத் துல்லியம் மற்றும் ஆய்வுக் குறிப்பு',
        accuracyBody:
          'கீழே உள்ள பெயர்கள் அவற்றின் வரலாற்றுச் சூழலுக்கு ஏற்ப சமூகத் தொடர்புடைய பெயர்கள், பிராந்தியப் பெயர்கள் அல்லது பாரம்பரியப் பட்டங்களாக வழங்கப்பட்டுள்ளன. ஒவ்வொரு பெயரும் முற்றிலும் ஒரே பொருள் கொண்டவை என்றோ ஒரே தோற்றம் கொண்டவை என்றோ கருதாமல், கல்வெட்டு மற்றும் அரசிதழ் சான்றுகள் சமூக மரபுகள் மற்றும் வம்சாவளி உரிமைகோரல்களிலிருந்து தெளிவாக வேறுபடுத்தப்பட்டுள்ளன.',
        filterAll: 'அனைத்துப் பெயர்கள் & பட்டங்கள்',
        groupDynastic: 'வம்ச மற்றும் மரபுப் பெயர்கள் (Dynastic and lineage designations)',
        groupDynasticDesc:
          'அரச கல்வெட்டுகள், புராண மரபுகள் மற்றும் சமூக வம்சாவளிகளில் போற்றப்படும் சூரிய வம்ச மற்றும் பண்டைய ஒட்ர மரபுப் பெயர்கள்.',
        groupRegional: 'பிராந்திய சமூகப் பெயர்கள் (Regional community designations)',
        groupRegionalDesc:
          'ஒடிசா, கர்நாடகா, தமிழ்நாடு, ஆந்திரா, தெலுங்கானா மற்றும் மகாராஷ்டிராவில் வழங்கப்படும் பிராந்திய சமூகப் பெயர்கள்.',
        groupTitles: 'வரலாற்று, மறவர் மற்றும் பாரம்பரியப் பட்டங்கள் (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'பிராந்திய வரலாறு, கல்வெட்டுகள் மற்றும் சமூக மரபுகளில் பாதுகாக்கப்பட்டுள்ள கோட்டைத் தலைமை மற்றும் வீரப் பட்டங்கள்.',
        tableHeading: 'வகைப்படுத்தப்பட்ட & புவியியல் குறிப்பு அட்டவணை',
        tableSubheading: 'முழு விவரங்களையும் காண எந்தவொரு வரிசையையோ அல்லது அட்டையையோ தொடவும்.',
        colDesignation: 'பெயர் / பட்டம் (மூல எழுத்து வடிவம்)',
        colCategory: 'வகை',
        colGeography: 'புவியியல் தொடர்பு',
        colEpistemic: 'வரலாற்று அடிப்படை',
        colSummary: 'வரலாற்று மற்றும் பாரம்பரியச் சுருக்கம்',
        geoLabel: 'புவியியல் தொடர்பு:',
        statesLabel: 'மாநிலங்கள்:',
        rootLabel: 'மொழி மூலம்:',
        epistemicLabel: 'வரலாற்று அடிப்படை:',
        regionsBtn: 'பகுதிகள்',
        detailsBtn: 'விவரங்கள்',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'கல்வெட்டு / வரலாற்று ஆவணப் பதிவு',
          'Regional Ethnonym & Gazetteer Record': 'பிராந்தியப் பெயர் & அரசிதழ் பதிவு',
          'Community Tradition & Lineage Claim': 'சமூக மரபு & வம்சாவளி நம்பிக்கை'
        }
      },
      mr: {
        sectionTitle: 'पर्यायी नावे, प्रादेशिक ओळख आणि लढाऊ पदव्या',
        sectionSubtitle:
          'ओडिशा, आंध्र प्रदेश, तेलंगणा, कर्नाटक, तमिळनाडू आणि अखिल भारतीय स्तरावरील राजवंशीय नावे, प्रादेशिक समाज संज्ञा आणि पारंपरिक लढाऊ पदव्यांची वर्गीकृत मांडणी.',
        accuracyHeading: 'ऐतिहासिक अचूकता आणि संशोधन टीप',
        accuracyBody:
          'खालील नावे त्यांच्या ऐतिहासिक संदर्भानुसार समाज-संबंधित नावे, प्रादेशिक संज्ञा किंवा पारंपरिक पदव्या म्हणून मांडली आहेत. प्रत्येक नाव तंतोतंत समानार्थी आहे किंवा सर्व गटांचा उगम एकच आहे असा दावा न करता, शिलालेख व गॅझेटिअरमधील ऐतिहासिक पुरावे आणि समाजाच्या पारंपरिक वंशावळी यांतील फरक स्पष्टपणे दर्शविला आहे.',
        filterAll: 'सर्व नावे व पदव्या',
        groupDynastic: 'राजवंश आणि वंश-परंपरा दर्शक नावे (Dynastic and lineage designations)',
        groupDynasticDesc:
          'राजकीय शिलालेख, पौराणिक संदर्भ आणि समाजाच्या वंशावळीत आढळणारी सूर्यवंशी व प्राचीन ओड्र वंश ओळख.',
        groupRegional: 'प्रादेशिक समाज नावे (Regional community designations)',
        groupRegionalDesc:
          'ओडिशा, कर्नाटक, तमिळनाडू, आंध्र प्रदेश, तेलंगणा आणि महाराष्ट्रात प्रचलित असलेली प्रादेशिक समाज नावे.',
        groupTitles: 'ऐतिहासिक, लढाऊ आणि पारंपरिक पदव्या (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'प्रादेशिक इतिहास, शिलालेख आणि सामाजिक परंपरेत जतन केलेल्या दुर्गप्रमुख, नायक व क्षत्रिय पदव्या.',
        tableHeading: 'वर्गीकृत आणि भौगोलिक संदर्भ तक्ता',
        tableSubheading: 'संपूर्ण बहुभाषिक माहिती पाहण्यासाठी कोणत्याही ओळीवर किंवा कार्डवर टॅप करा.',
        colDesignation: 'नाव / पदवी (मूळ स्पेलिंग)',
        colCategory: 'वर्ग',
        colGeography: 'भौगोलिक संबंध',
        colEpistemic: 'ऐतिहासिक आधार',
        colSummary: 'ऐतिहासिक व पारंपरिक संदर्भ',
        geoLabel: 'भौगोलिक संबंध:',
        statesLabel: 'राज्ये:',
        rootLabel: 'भाषिक मूळ:',
        epistemicLabel: 'ऐतिहासिक आधार:',
        regionsBtn: 'प्रदेश',
        detailsBtn: 'तपशील',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'प्रमाणित शिलालेख / ऐतिहासिक नोंद',
          'Regional Ethnonym & Gazetteer Record': 'प्रादेशिक संज्ञा व गॅझेटिअर नोंद',
          'Community Tradition & Lineage Claim': 'सामाजिक परंपरा व वंश दावा'
        }
      },
      or: {
        sectionTitle: 'ପର୍ଯ୍ୟାୟବାଚୀ ନାମ, ଆଞ୍ଚଳିକ ପରିଚୟ ଓ ସାମରିକ ଉପାଧି',
        sectionSubtitle:
          'ଓଡ଼ିଶା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା, କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ ଓ ସର୍ବଭାରତୀୟ ସ୍ତରରେ ପ୍ରଚଳିତ ରାଜବଂଶୀୟ ନାମ, ଆଞ୍ଚଳିକ ସମୁଦାୟ ପରିଚୟ ଏବଂ ପାରମ୍ପରିକ ସାମରିକ ଉପାଧିର ବର୍ଗୀକୃତ ବିବରଣୀ।',
        accuracyHeading: 'ଐତିହାସିକ ସତ୍ୟতা ଓ ଗବେଷଣା ଟିପ୍ପଣୀ',
        accuracyBody:
          'ନିମ୍ନলিଖିତ ନାମଗୁଡ଼ିକ ସେମାନଙ୍କର ଐତିହାସିକ ପ୍ରସଙ୍ଗ ଅନୁযାୟୀ ସମୁଦାୟ-ସମ୍ପୃକ୍ତ ନାମ, ଆଞ୍ଚଳିକ ପରିଚୟ ବା ପାରମ୍ପରିକ ଉପାଧି ଭାବରେ ଉପସ୍ଥାପିତ ହୋଇଛି। ପ୍ରତ୍ୟେକ ନାମ ସମ୍ପୂର୍ଣ୍ଣ ସମାନାର୍ଥକ ବା ଗୋଟିଏ ମାତ୍ର ଉତ୍ପତ୍ତିର ବୋଲି ଦାବି ନକରି, ପ୍ରମାଣିତ ଶିଳାଲେଖ ଓ ଗେଜେଟିୟର ତଥ୍ୟକୁ ସାମୁଦାୟିକ ପରମ୍ପରା ଓ ବଂଶ-ଦାବିଠାରୁ ସ୍ପଷ୍ଟ ଭାବେ ପୃଥକ କରାଯାଇଛି।',
        filterAll: 'ସମସ୍ତ ନାମ ଓ ଉପାଧି',
        groupDynastic: 'ରାଜବଂଶ ଓ ବଂଶ-ପରମ୍ପରା ସୂଚକ ନାମ (Dynastic and lineage designations)',
        groupDynasticDesc:
          'ରାଜକୀୟ ଶିଳାଲେଖ, ପୌରାଣିକ ପରମ୍ପରା ଓ ସାମୁଦାୟିକ ବଂଶାବଳୀରେ ଉଲ୍ଲେଖିତ ସୂର୍ଯ୍ୟବଂଶୀ ଏବଂ ପ୍ରାଚୀନ ଓଡ଼୍ର ବଂଶ ପରିଚୟ।',
        groupRegional: 'ଆଞ୍ଚଳିକ ସମୁଦାୟ ନାମ (Regional community designations)',
        groupRegionalDesc:
          'ଓଡ଼ିଶା, କର୍ଣ୍ଣାଟକ, ତାମିଲନାଡୁ, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା ଓ ମହାରାଷ୍ଟ୍ରରେ ପ୍ରଚଳିତ ଆଞ୍ଚଳିକ ସମୁଦାୟ ପରିଚୟ।',
        groupTitles: 'ଐତିହାସିକ, ସାମରିକ ଓ ପାରମ୍ପରିକ ଉପାଧି (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'ଆଞ୍ଚଳିକ ଇତିହାସ, ଶିଳାଲେଖ ଓ ସାମୁଦାୟିକ ପରମ୍ପରାରେ ସଂରକ୍ଷିତ ଦୁର୍ଗ-ରକ୍ଷা, ନାୟକତ୍ୱ ଓ କ୍ଷତ୍ରିୟ ଉପାଧି।',
        tableHeading: 'ବର୍ଗୀକୃତ ଓ ଭୌଗୋଳିକ ସୂଚୀ ସାରଣୀ',
        tableSubheading: 'ସମ୍ପୂର୍ଣ୍ଣ ବହୁଭାଷୀ ବିବରଣୀ ଦେଖିବା ପାଇଁ ଯେକୌଣସି ଧାଡ଼ି ବା କାର୍ଡ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ।',
        colDesignation: 'ନାମ / ଉପାଧି (ମୂଳ ବନାନ)',
        colCategory: 'ବର୍ଗ',
        colGeography: 'ଭୌଗୋଳିକ ସମ୍ପର୍କ',
        colEpistemic: 'ଐତିହାସିକ ଆଧାର',
        colSummary: 'ଐତିହାସିକ ଓ ପାରମ୍ପରିକ ପ୍ରସଙ୍ଗ',
        geoLabel: 'ଭୌଗୋଳିକ ସମ୍ପର୍କ:',
        statesLabel: 'ରାଜ୍ୟ:',
        rootLabel: 'ଭାଷାଗତ ମୂଳ:',
        epistemicLabel: 'ଐତିହାସିକ ଆଧାର:',
        regionsBtn: 'ଅଞ୍ଚଳ',
        detailsBtn: 'ବିବରଣୀ',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'ପ୍ରମାଣିତ ଶିଳାଲେଖ / ଐତିହାସିକ ତଥ୍ୟ',
          'Regional Ethnonym & Gazetteer Record': 'ଆଞ୍ଚଳିକ ନାମ ଓ ଗେଜେଟିୟର ଦସ୍ତାବିଜ',
          'Community Tradition & Lineage Claim': 'ସାମୁଦାୟିକ ପରମ୍ପରା ଓ ବଂଶ ଦାବି'
        }
      },
      bn: {
        sectionTitle: 'সমার্থক নাম, আঞ্চলিক পরিচয় ও সামরিক উপাধি',
        sectionSubtitle:
          'ওড়িশা, অন্ধ্রপ্রদেশ, তেলেঙ্গানা, কর্ণাটক, তামিলনাড়ু ও সর্বভারতীয় স্তরে প্রচলিত রাজবংশীয় নাম, আঞ্চলিক সম্প্রদায়গত পরিচয় এবং ঐতিহ্যবাহী সামরিক উপাধির শ্রেণীবদ্ধ বিবরণ।',
        accuracyHeading: 'ঐতিহাসিক প্রামাণ্যতা ও পদ্ধতিগত নোট',
        accuracyBody:
          'নিম্নলিখিত নামগুলো তাদের ঐতিহাসিক প্রেক্ষাপট অনুযায়ী সম্প্রদায়-সংশ্লিষ্ট নাম, আঞ্চলিক পরিচয় বা ঐতিহ্যবাহী উপাধি হিসেবে উপস্থাপিত হয়েছে। প্রতিটি নাম হুবহু সমার্থক বা একই উৎসজাত বলে দাবি না করে, প্রত্যয়িত শিলালিপি ও গেজেটিয়ার তথ্যকে সামাজিক ঐতিহ্য ও বংশগত দাবি থেকে স্পষ্টভাবে পৃথক করা হয়েছে।',
        filterAll: 'সকল নাম ও উপাধি',
        groupDynastic: 'রাজবংশ ও বংশ-পরম্পরা সূচক নাম (Dynastic and lineage designations)',
        groupDynasticDesc:
          'রাজকীয় শিলালিপি, পৌরাণিক ঐতিহ্য এবং বংশলতিকায় উল্লেখিত সূর্যবংশীয় ও প্রাচীন ওড্র বংশ পরিচয়।',
        groupRegional: 'আঞ্চলিক সম্প্রদায়গত নাম (Regional community designations)',
        groupRegionalDesc:
          'ওড়িশা, কর্ণাটক, তামিলনাড়ু, অন্ধ্রপ্রদেশ, তেলেঙ্গানা ও মহারাষ্ট্রে প্রচলিত আঞ্চলিক সম্প্রদায়গত নাম।',
        groupTitles: 'ঐতিহাসিক, সামরিক ও ঐতিহ্যবাহী উপাধি (Historical, martial, and traditional titles)',
        groupTitlesDesc:
          'আঞ্চলিক ইতিহাস, শিলালিপি ও সামাজিক পরম্পরায় সংরক্ষিত দুর্গ-রক্ষা, নায়কত্ব ও ক্ষত্রিয় উপাধি।',
        tableHeading: 'শ্রেণীবদ্ধ ও ভৌগোলিক রেফারেন্স টেবিল',
        tableSubheading: 'সম্পূর্ণ বহুভাষিক বিবরণ ও তথ্যসূত্র দেখতে যেকোনো সারি বা কার্ডে ট্যাপ করুন।',
        colDesignation: 'নাম / উপাধি (মূল বানান)',
        colCategory: 'বিভাগ',
        colGeography: 'ভৌগোলিক সংযোগ',
        colEpistemic: 'ঐতিহাসিক ভিত্তি',
        colSummary: 'ঐতিহাসিক ও ঐতিহ্যবাহী প্রেক্ষাপট',
        geoLabel: 'ভৌগোলিক সংযোগ:',
        statesLabel: 'রাজ্যসমূহ:',
        rootLabel: 'ভাষাগত মূল:',
        epistemicLabel: 'ঐতিহাসিক ভিত্তি:',
        regionsBtn: 'অঞ্চল',
        detailsBtn: 'বিস্তারিত',
        epistemicClasses: {
          'Documented Epigraphic & Historical Designation': 'প্রত্যয়িত শিলালিপি / ঐতিহাসিক নথি',
          'Regional Ethnonym & Gazetteer Record': 'আঞ্চলিক নাম ও গেজেটিয়ার নথি',
          'Community Tradition & Lineage Claim': 'সামাজিক ঐতিহ্য ও বংশগত দাবি'
        }
      }
    };
    return dict[language] || dict.en;
  }, [language]);

  const modalItem: ContentDetailItem | null = React.useMemo(() => {
    if (!selectedModalRef) return null;
    const base = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
    if (selectedModalRef.type === 'synonym') {
      const item = COMMUNITY_SYNONYMS.find(s => s.id === selectedModalRef.id);
      if (!item) return null;
      const epistemicText = item.epistemic_note[language] || item.epistemic_note.en;
      const synImgMap: Record<string, string> = {
        syn_suryavamshi: `${base}surya_konark_sculpture.jpg`,
        syn_sagaravamshi: `${base}samrat_sagara_surya.jpg`,
        syn_raghuvamshi: `${base}sri_rama_sculpture.jpg`,
        syn_od_oad_odra: `${base}hathigumpha_inscription.jpg`,
        syn_odisha_kshatriya: `${base}barabati_fort_gateway.jpg`,
        syn_odiyaraju_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
        syn_ottar: `${base}srirangam_temple.jpg`,
        syn_od_kshatriya: `${base}puri_jagannatha_temple.jpg`,
        syn_odde_vadde: `${base}kondavidu_fort_hills.jpg`,
        syn_waddar_vaddar: `${base}shivayogi_siddharama_solapur.jpg`,
        syn_oddar: `${base}srirangam_temple.jpg`,
        syn_vadde_gajapathirajulu: `${base}kapilendra_deva_portrait.jpg`,
        syn_odda_nayakkar_tn: `${base}kumara_hamvira_warangal_srirangam.jpg`,
        syn_oad_rajputh: `${base}oad_hydraulic_stepwell.jpg`,
        syn_odderajulu: `${base}kolleru_lake_citadel.jpg`
      };
      return {
        id: item.id,
        title: item.title,
        subtitle: `${item.designation_group} • ${item.geographical_association}`,
        badge: synonymSectionLabels.epistemicClasses[item.epistemic_classification] || item.epistemic_classification,
        location: item.geographical_association,
        imageUrl: synImgMap[item.id] || `${base}barabati_fort_gateway.jpg`,
        imageLayout: 'banner',
        content: `${item.historical_role[language] || item.historical_role.en}\n\n${synonymSectionLabels.epistemicLabel} ${epistemicText}`,
        metadata: [
          { label: synonymSectionLabels.colCategory, value: item.designation_group },
          { label: synonymSectionLabels.colGeography, value: item.geographical_association },
          { label: synonymSectionLabels.colEpistemic, value: synonymSectionLabels.epistemicClasses[item.epistemic_classification] || item.epistemic_classification },
          { label: 'Linguistic Origin', value: item.linguistic_origin },
          { label: 'Primary Regions', value: item.primary_regions.join(', ') },
          { label: 'Prominent States', value: item.prominent_states.join(', ') }
        ],
        sections: [
          {
            heading: 'Native Script Attestations',
            type: 'tags',
            items: Object.entries(item.native_scripts).map(([k, v]) => `${k}: ${v}`)
          },
          {
            heading: 'Sacred Associations & Patron Deities',
            type: 'list',
            items: item.sacred_associations
          }
        ]
      };
    }
    if (selectedModalRef.type === 'region') {
      const activeReg = GEOGRAPHICAL_SPREAD.find(r => r.id === selectedModalRef.id);
      if (!activeReg) return null;
      const regTitle = activeReg.localized_region[language] || activeReg.region_name;
      const regOverview = activeReg.regional_overview[language] || activeReg.regional_overview.en;
      const regImgMap: Record<string, string> = {
        geo_rajasthan_sindh_punjab: `${base}oad_hydraulic_stepwell.jpg`,
        geo_gujarat: `${base}jasma_devi_sahasralinga.jpg`,
        geo_maharashtra: `${base}shivayogi_siddharama_solapur.jpg`,
        geo_karnataka: `${base}balavaddiraju_hero_stone.jpg`,
        geo_andhra_telangana: `${base}kondavidu_fort_hills.jpg`,
        geo_tamil_nadu: `${base}srirangam_temple.jpg`,
        geo_odisha: `${base}barabati_fort_gateway.jpg`
      };
      return {
        id: activeReg.id,
        title: regTitle,
        subtitle: activeReg.states_and_territories.join(' • '),
        badge: 'Regional Corridor Spotlight',
        era: activeReg.migration_epoch_and_corridor,
        location: activeReg.prominent_cities_districts.join(', '),
        imageUrl: regImgMap[activeReg.id] || `${base}odra_kalinga_map.jpg`,
        imageLayout: 'banner',
        content: regOverview,
        sections: [
          {
            heading: 'Predominant Community Designations',
            type: 'tags',
            items: activeReg.predominant_community_synonyms
          },
          {
            heading: 'Landmark Forts & Reservoirs',
            type: 'list',
            items: activeReg.historical_forts_and_landmarks
          },
          {
            heading: 'Sacred Centers & Shrines',
            type: 'list',
            items: activeReg.sacred_centers
          }
        ]
      };
    }
    if (selectedModalRef.type === 'monograph') {
      const sec = HISTORICAL_MONOGRAPH_SECTIONS.find(s => s.id === selectedModalRef.id);
      if (!sec) return null;
      const secTitle = sec.section_title[language] || sec.section_title.en;
      const secContent = sec.content[language] || sec.content.en;
      const monoImgMap: Record<string, string> = {
        mono_part_1_primordial: `${base}surya_konark_sculpture.jpg`,
        mono_part_2_kharavela: `${base}emperor_kharavela_udayagiri.jpg`,
        mono_part_3_synonyms: `${base}copper_plate_charter.jpg`,
        mono_part_4_jasma_siddharama: `${base}jasma_devi_sahasralinga.jpg`,
        mono_part_5_gajapathi_diaspora: `${base}kondavidu_fort_hills.jpg`,
        mono_part_6_geographical_map: `${base}gajapathi_empire_map_1465.jpg`,
        mono_part_7_kolletikota: `${base}peddintlamma_temple_kolletikota.jpg`,
        mono_part_8_epigraphic_evolution: `${base}hathigumpha_inscription.jpg`
      };
      return {
        id: sec.id,
        title: secTitle,
        subtitle: 'The Civilizational Odyssey of Oad-Rajput & Od-Kshatriya Communities',
        badge: 'Peer-Reviewed Archival Monograph',
        author: 'Suryavamsha Archival Research Council',
        imageUrl: monoImgMap[sec.id] || `${base}barabati_fort_gateway.jpg`,
        imageLayout: 'banner',
        content: secContent,
        sections:
          sec.key_points && sec.key_points.length > 0
            ? [{ heading: 'Key Historical Takeaways', type: 'list', items: sec.key_points }]
            : []
      };
    }
    return null;
  }, [selectedModalRef, language, synonymSectionLabels]);

  useEffect(() => {
    const targetId =
      initialItemId ||
      new URLSearchParams(window.location.search).get('id') ||
      new URLSearchParams(window.location.search).get('figure');
    if (!targetId) return;

    const foundFig = HISTORICAL_FIGURES.find(f => f.id === targetId);
    if (foundFig) {
      setActiveTab('figures');
      setSelectedFigure(foundFig);
      return;
    }

    const foundSyn = COMMUNITY_SYNONYMS.find(s => s.id === targetId);
    if (foundSyn) {
      setActiveTab('synonyms');
      openSynonymModal(foundSyn);
    }
  }, [initialItemId, language]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'figures' || tabParam === 'synonyms' || tabParam === 'geography' || tabParam === 'history') {
        setActiveTab(tabParam);
      }
    }
  }, [initialTab]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedFigure(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered Synonyms
  const filteredSynonyms = COMMUNITY_SYNONYMS.filter(s => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(term) ||
      s.geographical_association.toLowerCase().includes(term) ||
      s.designation_group.toLowerCase().includes(term) ||
      s.primary_regions.some(r => r.toLowerCase().includes(term)) ||
      s.prominent_states.some(st => st.toLowerCase().includes(term)) ||
      (s.historical_role[language] || s.historical_role.en).toLowerCase().includes(term) ||
      (s.epistemic_note[language] || s.epistemic_note.en).toLowerCase().includes(term);

    const matchesCategory =
      synonymCategoryFilter === 'all' ||
      s.designation_group === synonymCategoryFilter ||
      s.category.toLowerCase().includes(synonymCategoryFilter.toLowerCase());

    const matchesRegion =
      !selectedRegionId ||
      s.prominent_states.some(st => {
        const reg = GEOGRAPHICAL_SPREAD.find(g => g.id === selectedRegionId);
        return reg?.states_and_territories.includes(st);
      });

    return matchesSearch && matchesCategory && matchesRegion;
  });

  // Filtered Figures
  const filteredFigures = HISTORICAL_FIGURES.filter(f => {
    const term = searchTerm.toLowerCase();
    const locName = (f.localized_name[language] || f.canonical_name).toLowerCase();
    const summary = (f.summary[language] || f.summary.en).toLowerCase();
    const titles = (f.titles[language] || f.titles.en).toLowerCase();

    return (
      locName.includes(term) ||
      f.alternate_names.some(a => a.toLowerCase().includes(term)) ||
      summary.includes(term) ||
      titles.includes(term) ||
      f.associated_places.some(p => p.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2a0614] via-[#1c1224] to-[#0c101c] border border-[#c99738]/50 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40 shadow-sm">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Suryavamsha Odiyaraju Kshatriya & Oad-Rajput Heritage Archive</span>
          </div>

          <h1 className="font-royal-heading font-extrabold text-3xl sm:text-5xl text-[#fcedc7] leading-tight">
            {language === 'te'
              ? 'వంశావళి, ఆరాధ్య పితామహులు & అఖిల భారత భౌగోళిక విస్తరణ'
              : language === 'or'
              ? 'ବଂଶାବଳୀ, ପୂଜ୍ୟ ପୂର୍ବପୁରୁଷ ଓ ସର୍ବଭାରତୀୟ ଭୌଗୋଳିକ ବିସ୍ତାର'
              : language === 'hi'
              ? 'वंशावली, पूज्य आदि-पुरुष एवं अखिल भारतीय भौगोलिक प्रसार'
              : language === 'kn'
              ? 'ವಂಶಾವಳಿ, ಆದ್ಯ ಪಿತಾಮಹರು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಭೌಗೋಳಿಕ ಹರಡುವಿಕೆ'
              : language === 'ta'
              ? 'வம்சாவளி, புனித முன்னோடிகள் மற்றும் அகில இந்திய புவியியல் பரவல்'
              : language === 'mr'
              ? 'वंशावळ, पूज्य पूर्वज आणि अखिल भारतीय भौगोलिक विस्तार'
              : language === 'bn'
              ? 'বংশলতিকা, পূজ্য আদি পুরুষ ও সর্বভারতীয় ভৌগোলিক বিস্তার'
              : 'Lineage, Sacred Progenitors & Pan-Indian Geographical Spreading'}
          </h1>

          <p className="text-sm sm:text-base text-stone-300 font-royal-serif leading-relaxed">
            {language === 'te'
              ? 'ప్రాచీన సూర్యవంశ చక్రవర్తులు (సగరుడు, భగీరథుడు, శ్రీరాముడు), కళింగ-ఓడ్ర సమ్రాట్ ఖారవేలుడు నుండి పవిత్ర రక్షకులు (మాతా జస్మా దేవి, సిద్ధరామేశ్వరుడు) వరకు — ఓడ్-రాజ్‌పుత్, ఓడ్-క్షత్రియ, ఒడ్డే, వడ్డెరాజులు మరియు వడ్డార్ సమాజాల చారిత్రక ప్రస్థానం.'
              : language === 'hi'
              ? 'प्राचीन सूर्यवंशी चक्रवर्ती सम्राटों (सगर, भगीरथ, श्रीराम) एवं कलिंग-ओड्र सम्राट खारवेल से लेकर पवित्र रक्षकों (माता जस्मा देवी, संत सिद्धरामेश्वर) तक — ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु, वड्डार और ओड्डार समाज का गौरवशाली इतिहास।'
              : language === 'or'
              ? 'ପ୍ରାଚୀନ ସୂର୍ଯ୍ୟବଂଶୀ ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ (ସଗର, ଭଗୀରଥ, ଶ୍ରୀରାମ) ଓ କଳିଙ୍ଗ-ଓଡ଼୍ର ସମ୍ରାଟ ଖାରବେଳଙ୍କଠାରୁ ଆରମ୍ଭ କରି ପବିତ୍ର ରକ୍ଷକ (ମାତା ଜସ୍ମା ଦେବୀ, ସନ୍ଥ ସିଦ୍ଧରାମେଶ୍ୱର) ପର୍ଯ୍ୟନ୍ତ — ଓଡ଼-ରାଜପୁତ, ଓଡ଼-କ୍ଷତ୍ରିୟ, ଓଡ଼ିଆରାଜୁ ଓ ୱଡ୍ଡାର ସମାଜର ଗୌରବমୟ ଇତିହାସ।'
              : language === 'kn'
              ? 'ಪ್ರಾಚೀನ ಸೂರ್ಯವಂಶ ಚಕ್ರವರ್ತಿಗಳು (ಸಗರ, ಭಗೀರಥ, ಶ್ರೀರಾಮ) ಮತ್ತು ಕಳಿಂಗ-ಓಡ್ರ ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನಿಂದ ಪವಿತ್ರ ರಕ್ಷಕರಾದ (ಮಾತಾ ಜಸ್ಮಾ ದೇವಿ, ಸಂತ ಸಿದ್ಧರಾಮೇಶ್ವರ) ವರೆಗೆ — ಓಡ್-ರಜಪೂತ್, ಓಡ್-ಕ್ಷತ್ರಿಯ, ಒಡ್ಡೇ, ವಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡ್ಡರ್ ಸಮುದಾಯಗಳ ಐತಿಹಾಸಿಕ ಪಯಣ.'
              : language === 'ta'
              ? 'பண்டைய சூர்யவம்ச சக்கரவர்த்திகள் (சகரர், பகீரதன், ஸ்ரீராமர்) மற்றும் கலிங்க-ஒட்டர பேரரசர் காரவேலன் முதல் புனித பாதுகாவலர்கள் (மாதா ஜஸ்மா தேவி, சித்தராமேஸ்வரர்) வரை — ஓட்-ராஜ்புத், ஓட்-க்ஷத்ரிய, ஒட்டே, வட்டேராஜுலு மற்றும் ஒட்டர் சமூகங்களின் வரலாற்றுப் பயணம்.'
              : language === 'mr'
              ? 'प्राचीन सूर्यवंशी चक्रवर्ती सम्राट (सगर, भगीरथ, श्रीराम) आणि कलिंग-ओड्र सम्राट खारवेल यांच्यापासून पवित्र रक्षकांपर्यंत (माता जस्मा देवी, संत सिद्धरामेश्वर) — ओड-राजपूत, ओड-क्षत्रिय, वड्डेराजुलु आणि वड्डार समाजाचा गौरवशाली इतिहास.'
              : language === 'bn'
              ? 'প্রাচীন সূর্যবংশী চক্রবর্তী সম্রাট (সগর, ভগীরথ, শ্রীরাম) এবং কলিঙ্গ-ওড্র সম্রাট খারবেল থেকে শুরু করে পবিত্র রক্ষক (মাতা জস্মা দেবী, সন্ত সিদ্ধরামেশ্বর) পর্যন্ত — ওড-রাজপুত, ওড-ক্ষত্রিয়, ওড্ডেরাজুলু এবং ওড্ডার সমাজের গৌরবময় ইতিহাস।'
              : 'Documenting the epic civilizational journey of the Oad-Rajput, Od-Kshatriya, OddeRajulu, VaddeRajulu, and Waddar communities across 8 major Indian geographical corridors, linking classical epigraphy with living sacred tradition.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#580014]/60 border border-[#d4af37]/30 text-[#fcedc7] flex items-center gap-1.5">
              <Crown className="w-3 h-3 text-[#d4af37]" /> Suryavamsha Solar Race
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Droplets className="w-3 h-3 text-cyan-400" /> Master Hydraulic & Canal Engineers
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-amber-400" /> Gajapathi Military Garrisons
            </span>
            <span className="px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700 text-stone-300 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-emerald-400" /> 7 Pan-Indian Corridors
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-stone-800 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'synonyms', label: translateText('synonyms_and_variants', '1. Community Synonyms & Titles'), icon: Users },
          { id: 'figures', label: translateText('key_historical_figures', '2. Sacred Progenitors & Figures'), icon: Crown },
          { id: 'geography', label: translateText('pan_india_spread', '3. Pan-Indian Geographical Spreading'), icon: MapPin },
          { id: 'history', label: translateText('historical_monographs', '4. Complete Historical Monograph'), icon: BookOpen }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-[#580014] to-[#78001c] text-[#fae29c] border border-[#d4af37] shadow-lg shadow-[#580014]/40'
                  : 'bg-stone-900/60 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#d4af37]' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Universal Search & Quick Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121624] p-4 rounded-2xl border border-stone-800">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={translateText('search_placeholder', 'Search synonyms, figures, regions, states...')}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-900/90 border border-stone-700/80 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#d4af37]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Region filter badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none text-xs">
          <span className="text-stone-400 text-[11px] whitespace-nowrap flex items-center gap-1">
            <Compass className="w-3 h-3 text-[#d4af37]" /> Region:
          </span>
          <button
            onClick={() => setSelectedRegionId(null)}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              selectedRegionId === null
                ? 'bg-[#c99738] text-[#300207] font-bold'
                : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
            }`}
          >
            All Regions
          </button>
          {GEOGRAPHICAL_SPREAD.map(reg => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegionId(selectedRegionId === reg.id ? null : reg.id)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedRegionId === reg.id
                  ? 'bg-[#c99738] text-[#300207] font-bold shadow'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {reg.region_name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 1: COMMUNITY SYNONYMS & TITLES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'synonyms' && (
        <div className="space-y-8">
          {/* Section Title & Category Filter Pills */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37]">
                <Layers className="w-3.5 h-3.5" />
                <span>Synonyms, Regional Designations & Martial Titles</span>
              </div>
              <h2 className="font-royal-heading font-bold text-2xl sm:text-3xl text-[#fcedc7]">
                {synonymSectionLabels.sectionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
                {synonymSectionLabels.sectionSubtitle}
              </p>
            </div>

            {/* Category filter pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { key: 'all', label: synonymSectionLabels.filterAll },
                { key: 'Dynastic and lineage designations', label: synonymSectionLabels.groupDynastic.split(' (')[0] },
                { key: 'Regional community designations', label: synonymSectionLabels.groupRegional.split(' (')[0] },
                { key: 'Historical, martial, and traditional titles', label: synonymSectionLabels.groupTitles.split(' (')[0] }
              ].map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSynonymCategoryFilter(cat.key)}
                  className={`px-3 py-1.5 rounded-xl font-semibold cursor-pointer transition-all ${
                    synonymCategoryFilter === cat.key
                      ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                      : 'bg-stone-900/90 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Epistemic & Historical Accuracy Banner */}
          <div className="bg-gradient-to-r from-[#240610] via-[#141929] to-[#1a0912] border border-[#d4af37]/40 rounded-2xl p-4 sm:p-5 shadow-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#fae29c] uppercase tracking-wider">
                  {synonymSectionLabels.accuracyHeading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {synonymSectionLabels.accuracyBody}
                </p>
              </div>
            </div>
          </div>

          {/* Categorized Cards Display (3 Distinct Historical Categories) */}
          {(
            [
              {
                groupKey: 'Dynastic and lineage designations',
                heading: synonymSectionLabels.groupDynastic,
                description: synonymSectionLabels.groupDynasticDesc,
                icon: Crown
              },
              {
                groupKey: 'Regional community designations',
                heading: synonymSectionLabels.groupRegional,
                description: synonymSectionLabels.groupRegionalDesc,
                icon: MapPin
              },
              {
                groupKey: 'Historical, martial, and traditional titles',
                heading: synonymSectionLabels.groupTitles,
                description: synonymSectionLabels.groupTitlesDesc,
                icon: Shield
              }
            ] as const
          ).map(group => {
            const groupItems = filteredSynonyms.filter(item => item.designation_group === group.groupKey);
            if (groupItems.length === 0) return null;
            const GroupIcon = group.icon;

            return (
              <div key={group.groupKey} className="space-y-4 pt-2">
                <div className="border-l-4 border-[#d4af37] pl-4 py-1 bg-[#121624]/60 rounded-r-xl">
                  <div className="flex items-center gap-2">
                    <GroupIcon className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c]">
                      {group.heading}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#580014] text-[#fcedc7] border border-[#d4af37]/40 font-semibold">
                      {groupItems.length}
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">{group.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {groupItems.map(item => {
                    const epistemicLabel =
                      synonymSectionLabels.epistemicClasses[item.epistemic_classification] ||
                      item.epistemic_classification;
                    const isEpigraphic =
                      item.epistemic_classification === 'Documented Epigraphic & Historical Designation';
                    const isRegional =
                      item.epistemic_classification === 'Regional Ethnonym & Gazetteer Record';

                    return (
                      <div
                        key={item.id}
                        onClick={() => openSynonymModal(item)}
                        className="bg-[#121624] border border-[#c99738]/35 rounded-2xl p-5 sm:p-6 space-y-4 hover:border-[#d4af37] transition-all flex flex-col justify-between shadow-lg group hover:shadow-[0_0_20px_rgba(201,151,56,0.18)] cursor-pointer"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors">
                                {item.title}
                              </h4>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {Object.entries(item.native_scripts).map(([scriptName, scriptVal]) => (
                                  <span
                                    key={scriptName}
                                    className="text-[11px] font-mono text-[#d4af37] bg-stone-900/90 px-2 py-0.5 rounded border border-stone-800"
                                    title={scriptName}
                                  >
                                    {scriptVal}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] px-2 py-1 rounded bg-[#580014] text-[#fcedc7] font-semibold border border-[#d4af37]/30 whitespace-nowrap shrink-0">
                              {item.category}
                            </span>
                          </div>

                          {/* Epistemic Distinction Pill */}
                          <div>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                                isEpigraphic
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40'
                                  : isRegional
                                  ? 'bg-amber-950/60 text-amber-300 border-amber-600/40'
                                  : 'bg-purple-950/60 text-purple-300 border-purple-500/40'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                              <span>{epistemicLabel}</span>
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-stone-300 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                            <div className="flex items-start gap-1.5 text-stone-300">
                              <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-[#fae29c]">{synonymSectionLabels.geoLabel}</strong>{' '}
                                <span className="font-semibold text-white">{item.geographical_association}</span>
                              </div>
                            </div>

                            <div className="text-stone-400 text-[11px]">
                              <strong className="text-stone-300">{synonymSectionLabels.rootLabel}</strong>{' '}
                              {item.linguistic_origin}
                            </div>
                          </div>

                          <p className="text-xs text-stone-200 leading-relaxed pt-1">
                            {item.historical_role[language] || item.historical_role.en}
                          </p>

                          <div className="text-[11px] text-stone-400 bg-[#0d101b] p-2.5 rounded-lg border border-stone-800/70 leading-relaxed">
                            <strong className="text-[#d4af37]">{synonymSectionLabels.epistemicLabel}</strong>{' '}
                            {item.epistemic_note[language] || item.epistemic_note.en}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px]">
                          <span className="text-stone-400 truncate max-w-[180px]">
                            🙏 {item.sacred_associations.slice(0, 2).join(' • ')}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                setActiveTab('geography');
                                setSearchTerm(item.prominent_states[0] || '');
                              }}
                              className="text-stone-400 hover:text-[#d4af37] hover:underline font-medium cursor-pointer"
                            >
                              {synonymSectionLabels.regionsBtn}
                            </button>
                            <span className="text-[#d4af37] font-semibold flex items-center gap-0.5">
                              {synonymSectionLabels.detailsBtn} <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Structured Reference Table (Responsive on Android Mobile & Desktop) */}
          <div className="bg-[#121624] border border-[#c99738]/40 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-6 bg-gradient-to-r from-[#260713] to-[#121624] border-b border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fcedc7]">
                  {synonymSectionLabels.tableHeading}
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">{synonymSectionLabels.tableSubheading}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 self-start sm:self-auto">
                {filteredSynonyms.length} Designations
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-stone-900/90 border-b border-stone-800 text-[11px] uppercase tracking-wider text-[#d4af37]">
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colDesignation}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colCategory}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colGeography}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colEpistemic}</th>
                    <th className="py-3.5 px-4 font-bold">{synonymSectionLabels.colSummary}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/80 text-xs">
                  {filteredSynonyms.map(item => (
                    <tr
                      key={`row_${item.id}`}
                      onClick={() => openSynonymModal(item)}
                      className="hover:bg-stone-900/70 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 align-top font-bold text-[#fae29c] group-hover:text-white whitespace-nowrap">
                        <div>{item.title}</div>
                        <div className="text-[11px] font-normal text-stone-400 mt-0.5">
                          {Object.values(item.native_scripts).slice(0, 2).join(' • ')}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 align-top text-stone-300">
                        <span className="inline-block px-2 py-0.5 rounded bg-stone-900 border border-stone-700 text-[11px] text-stone-200">
                          {item.designation_group}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 align-top font-semibold text-stone-200">
                        {item.geographical_association}
                      </td>
                      <td className="py-3.5 px-4 align-top text-stone-300">
                        <span className="text-[11px] text-[#d4af37] font-medium">
                          {synonymSectionLabels.epistemicClasses[item.epistemic_classification] ||
                            item.epistemic_classification}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 align-top text-stone-300 max-w-md leading-relaxed">
                        {item.historical_role[language] || item.historical_role.en}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 2: SACRED PROGENITORS & HISTORICAL FIGURES */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'figures' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
                Sacred Progenitors, Emperors & Divine Guardians
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                Click on any figure to view the complete detailed historical narrative, civil engineering legacy, and canonical sources.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFigures.map(fig => {
              const displayName = fig.localized_name[language] || fig.canonical_name;
              const displaySummary = fig.summary[language] || fig.summary.en;
              const displayTitle = fig.titles[language] || fig.titles.en;

              return (
                <div
                  key={fig.id}
                  onClick={() => setSelectedFigure(fig)}
                  className="bg-[#121624] border border-[#c99738]/30 hover:border-[#d4af37] rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col justify-between group cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(201,151,56,0.2)]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-stone-950">
                    <img
                      src={fig.image_url}
                      alt={fig.canonical_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121624] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#580014]/90 text-[#fcedc7] border border-[#d4af37]/40 backdrop-blur-sm">
                        {fig.epigraphic_status}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h3 className="font-royal-heading font-bold text-lg text-[#fae29c] group-hover:text-white transition-colors">
                          {displayName}
                        </h3>
                        <p className="text-[11px] text-[#d4af37] font-semibold leading-snug line-clamp-2">
                          {displayTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-stone-400">
                        <span>⏳ {fig.reign_or_dates}</span>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                        {displaySummary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-stone-400">
                        📍 {fig.associated_places[0]}
                      </span>
                      <span className="text-[#d4af37] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore Profile <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 3: PAN-INDIAN GEOGRAPHICAL SPREADING */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'geography' && (
        <div className="space-y-6">
          <div>
            <h2 className="font-royal-heading font-bold text-2xl text-[#fcedc7]">
              Pan-Indian Geographical Spreading & Historical Corridors
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Examining the 7 major regional corridors where the community established fort defenses, irrigation networks, and sacred shrines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Region List */}
            <div className="lg:col-span-1 space-y-3">
              {GEOGRAPHICAL_SPREAD.map(reg => {
                const isSelected = (selectedRegionId || GEOGRAPHICAL_SPREAD[0].id) === reg.id;
                const regTitle = reg.localized_region[language] || reg.region_name;

                return (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedRegionId(reg.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#201520] border-[#d4af37] shadow-lg shadow-[#580014]/20'
                        : 'bg-[#121624] border-stone-800 hover:border-stone-700 hover:bg-[#161b2e]'
                    }`}
                  >
                    <div className="space-y-1">
                      <h4 className={`text-sm font-bold ${isSelected ? 'text-[#fae29c]' : 'text-stone-200'}`}>
                        {regTitle}
                      </h4>
                      <p className="text-[11px] text-stone-400 truncate max-w-[220px]">
                        {reg.predominant_community_synonyms.join(' • ')}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-[#d4af37]' : 'text-stone-600'}`} />
                  </div>
                );
              })}
            </div>

            {/* Region Detailed Card */}
            {(() => {
              const activeReg =
                GEOGRAPHICAL_SPREAD.find(r => r.id === (selectedRegionId || GEOGRAPHICAL_SPREAD[0].id)) ||
                GEOGRAPHICAL_SPREAD[0];
              const regTitle = activeReg.localized_region[language] || activeReg.region_name;
              const regOverview = activeReg.regional_overview[language] || activeReg.regional_overview.en;

              return (
                <div
                  onClick={() => setSelectedModalRef({ type: 'region', id: activeReg.id })}
                  className="lg:col-span-2 bg-[#121624] border border-[#c99738]/40 hover:border-[#c99738] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl cursor-pointer transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#d4af37] uppercase tracking-wider">
                        Regional Corridor Spotlight (Click to Open Full Modal)
                      </span>
                      <h3 className="font-royal-heading font-extrabold text-2xl text-[#fcedc7]">
                        {regTitle}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeReg.predominant_community_synonyms.map(syn => (
                        <span
                          key={syn}
                          className="px-2.5 py-1 rounded bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/30"
                        >
                          {syn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-stone-200 font-royal-serif leading-relaxed">
                    {regOverview}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <MapPin className="w-4 h-4" />
                        <span>Key Cities & Districts</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.prominent_cities_districts.join(', ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Building className="w-4 h-4" />
                        <span>Landmark Forts & Reservoirs</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.historical_forts_and_landmarks.join(' • ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Sparkles className="w-4 h-4" />
                        <span>Sacred Centers & Shrines</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.sacred_centers.join(' • ')}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37] font-semibold">
                        <Calendar className="w-4 h-4" />
                        <span>Migration Context</span>
                      </div>
                      <p className="text-stone-300 leading-relaxed">
                        {activeReg.migration_epoch_and_corridor}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-800 text-xs">
                    <span className="text-stone-400">
                      States: {activeReg.states_and_territories.join(', ')}
                    </span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveTab('synonyms');
                        setSearchTerm(activeReg.predominant_community_synonyms[0] || '');
                      }}
                      className="text-[#d4af37] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      Filter Synonyms for this Region <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------------- */}
      {/* TAB 4: COMPLETE HISTORICAL MONOGRAPH */}
      {/* ---------------------------------------------------------------------- */}
      {activeTab === 'history' && (
        <article className="bg-[#121624] border border-[#c99738]/40 rounded-3xl p-6 sm:p-12 space-y-10 shadow-2xl">
          <div className="border-b border-stone-800 pb-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#580014] text-[#fae29c] text-xs font-semibold">
              <Scroll className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Peer-Reviewed Archival Monograph</span>
            </div>
            <h2 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
              The Civilizational Odyssey of Oad-Rajput & Od-Kshatriya Communities
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              Authored by the Suryavamsha Archival Research Council • Click any chapter below to open in focused reader modal
            </p>
          </div>

          <div className="space-y-8 font-royal-serif text-stone-200 text-sm sm:text-base leading-relaxed">
            {HISTORICAL_MONOGRAPH_SECTIONS.map(sec => {
              const secTitle = sec.section_title[language] || sec.section_title.en;
              const secContent = sec.content[language] || sec.content.en;

              return (
                <section
                  key={sec.id}
                  onClick={() => setSelectedModalRef({ type: 'monograph', id: sec.id })}
                  className="space-y-3 pb-6 border-b border-stone-800/60 last:border-0 cursor-pointer p-4 -mx-4 rounded-2xl hover:bg-stone-900/40 transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-[#fae29c] group-hover:text-white transition-colors">
                      {secTitle}
                    </h3>
                    <span className="text-xs font-sans font-semibold text-[#d4af37] shrink-0">Open Chapter →</span>
                  </div>
                  <div className="whitespace-pre-line text-stone-300">
                    {secContent}
                  </div>
                  {sec.key_points && sec.key_points.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2 text-xs font-sans">
                      {sec.key_points.map((kp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-stone-900 text-stone-400 border border-stone-800"
                        >
                          ✓ {kp}
                        </span>
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </article>
      )}

      <ContentDetailModal item={modalItem} onClose={() => setSelectedModalRef(null)} />

      {/* ---------------------------------------------------------------------- */}
      {/* DETAILED HISTORICAL FIGURE MODAL DIALOG */}
      {/* ---------------------------------------------------------------------- */}
      {selectedFigure && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#101420] border-2 border-[#d4af37] rounded-3xl overflow-y-auto shadow-2xl shadow-[#580014]/50 p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40">
                    {selectedFigure.epigraphic_status}
                  </span>
                  <span className="text-xs text-stone-400">⏳ {selectedFigure.reign_or_dates}</span>
                </div>
                <h3 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#fcedc7]">
                  {selectedFigure.localized_name[language] || selectedFigure.canonical_name}
                </h3>
                <p className="text-xs text-[#d4af37] font-semibold">
                  {selectedFigure.titles[language] || selectedFigure.titles.en}
                </p>
              </div>
              <button
                onClick={() => setSelectedFigure(null)}
                className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-700 transition-colors cursor-pointer"
                title="Close Profile (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Figure Image & Alternate Names */}
            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden border border-[#d4af37]/50 shrink-0 shadow-lg bg-stone-950">
                <img
                  src={selectedFigure.image_url}
                  alt={selectedFigure.canonical_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3 text-xs w-full">
                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">Alternate Historical Names:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFigure.alternate_names.map(alt => (
                      <span key={alt} className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">Dynasty & Lineage:</span>
                  <p className="text-stone-200 font-semibold">{selectedFigure.dynasty_lineage}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-stone-400 text-[11px] font-semibold">Associated Sacred Geography:</span>
                  <p className="text-stone-300">📍 {selectedFigure.associated_places.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* Detailed Narrative */}
            <div className="space-y-3 border-t border-stone-800 pt-4">
              <h4 className="font-royal-heading font-bold text-base text-[#fae29c] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#d4af37]" /> {translateText('detailed_narrative', 'Historical & Sacred Chronicle')}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-royal-serif leading-relaxed whitespace-pre-line">
                {selectedFigure.detailed_narrative[language] || selectedFigure.detailed_narrative.en}
              </p>
            </div>

            {/* Civil & Water Engineering Legacy Spotlight */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#201018] to-[#121c28] border border-[#d4af37]/40 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                <Droplets className="w-4 h-4 text-cyan-400" /> {translateText('civic_and_water_legacy', 'Civil & Water-Engineering Legacy')}
              </div>
              <p className="text-xs text-stone-200 leading-relaxed font-royal-serif">
                {selectedFigure.engineering_and_civic_legacy[language] ||
                  selectedFigure.engineering_and_civic_legacy.en}
              </p>
            </div>

            {/* Canonical Sources */}
            <div className="space-y-2 border-t border-stone-800 pt-4 text-xs">
              <span className="text-stone-400 font-semibold flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-[#d4af37]" /> {translateText('canonical_sources', 'Primary Epigraphs & Scholarly References')}:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-stone-300">
                {selectedFigure.canonical_sources.map((src, idx) => (
                  <li key={idx}>{src}</li>
                ))}
              </ul>
            </div>

            {/* Footer Close Button */}
            <div className="pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setSelectedFigure(null)}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer shadow-md"
              >
                {translateText('close_modal', 'Close Profile')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Community Directory and Registration CTA */}
      <div className="p-8 rounded-3xl bg-[#141824] border border-[#c99738]/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-royal-heading font-bold text-xl text-[#fcedc7]">
            Connect with Fellow Members Across the Nation
          </h3>
          <p className="text-xs text-stone-400">
            Join the verified public member directory and preserve your family vamsavali with strict privacy safeguards.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/directory')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer shadow-md"
          >
            Explore Directory
          </button>
          <button
            onClick={() => onNavigate('/register')}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#1a2130] text-stone-200 border border-stone-700 hover:border-[#c99738] transition-all cursor-pointer"
          >
            Register as Member
          </button>
        </div>
      </div>
    </div>
  );
};
