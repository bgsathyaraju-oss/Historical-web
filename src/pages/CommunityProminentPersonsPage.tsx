import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Crown,
  Scroll,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Share2,
  Copy,
  Check,
  X,
  Shield,
  Landmark,
  MapPin,
  Calendar,
  Sparkles,
  Phone,
  Swords,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';
import {
  PROMINENT_PERSONS,
  ALL_COMMUNITY_BRANCHES,
  CommunityBranch,
  ProminentPerson,
  ProminentRoleCategory,
  ProminentStateRegion,
  getPersonClassificationMetadata
} from '../data/communityProminentPersonsData';
import { WhatsAppIcon } from '../components/PublisherCreditCard';

type CategoryFilter = 'all' | 'Royal Sovereignty' | 'Martial Guardians' | 'Civic & Builders' | 'Classical Realms';

interface CommunityProminentPersonsPageProps {
  onNavigate: (path: string) => void;
  initialBranch?: CommunityBranch | 'all';
  initialPersonId?: string | null;
}

export const CommunityProminentPersonsPage: React.FC<CommunityProminentPersonsPageProps> = ({
  onNavigate,
  initialBranch = 'all',
  initialPersonId
}) => {
  const { language, t } = useLanguage();
  const currentLang = (language as LanguageCode) || 'en';

  const [selectedBranch, setSelectedBranch] = useState<CommunityBranch | 'all'>(initialBranch);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedRoleCategory, setSelectedRoleCategory] = useState<ProminentRoleCategory | 'all'>('all');
  const [selectedStateRegion, setSelectedStateRegion] = useState<ProminentStateRegion | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPerson, setActiveModalPerson] = useState<ProminentPerson | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const targetId =
      initialPersonId ||
      new URLSearchParams(window.location.search).get('figure') ||
      new URLSearchParams(window.location.search).get('id');
    if (targetId) {
      const found = PROMINENT_PERSONS.find(p => p.id === targetId);
      if (found) {
        setActiveModalPerson(found);
      }
    }
  }, [initialPersonId]);

  useEffect(() => {
    if (!activeModalPerson) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalPerson(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalPerson]);

  // Localized UI Labels for the page header and controls across all 8 languages
  const pageLabels = useMemo(() => {
    const dict: Record<
      LanguageCode,
      {
        pageTitle: string;
        pageSubtitle: string;
        allBranches: string;
        searchPlaceholder: string;
        activeFilter: string;
        showingCount: (count: number, total: number) => string;
        readFullBio: string;
        historicalEvidence: string;
        associatedBranches: string;
        keyContributions: string;
        closeModal: string;
        shareLink: string;
        linkCopied: string;
        consultPublisher: string;
        emptyStateTitle: string;
        emptyStateDesc: string;
        clearFilters: string;
        accuracyHeading: string;
        accuracyBody: string;
        roleFilterLabel: string;
        stateFilterLabel: string;
        roleCategories: Record<ProminentRoleCategory | 'all', string>;
        stateRegions: Record<ProminentStateRegion | 'all', string>;
        verificationBadges: Record<string, string>;
        categories: {
          all: string;
          royal: string;
          martial: string;
          civic: string;
          realms: string;
        };
      }
    > = {
      en: {
        pageTitle: 'Community Prominent Persons & Sovereigns',
        pageSubtitle:
          'Documented historical monarchs, military commanders, scholars, saints, civic hydraulic architects, and community leaders associated with Odisha, Karnataka, Andhra Pradesh, Tamil Nadu, and pan-Indian Suryavamsha Kshatriya / Odiyaraju / Vadde-GajapathiRajulu / Od-Kshatriya lineages.',
        allBranches: 'All 32 Lineages & Branches',
        searchPlaceholder: 'Search by person name, title, branch, era, region, or keywords...',
        activeFilter: 'Active Community Branch',
        showingCount: (c, tot) => `Showing ${c} of ${tot} Prominent Persons`,
        readFullBio: 'View Full Archival Biography & Sources',
        historicalEvidence: 'Primary Epigraphic & Archival Evidence',
        associatedBranches: 'Connected Lineages & Community Branches',
        keyContributions: 'Key Historical Contributions & Feats',
        closeModal: 'Close Window',
        shareLink: 'Share Link',
        linkCopied: 'Link Copied to Clipboard!',
        consultPublisher: 'Discuss with Dr G.Sathyanarayana Raju (+91 9480112897)',
        emptyStateTitle: 'No prominent persons match your search criteria',
        emptyStateDesc: 'Try adjusting your branch, category, regional filter, or search keywords to view historical records.',
        clearFilters: 'Reset All Filters',
        accuracyHeading: 'Historical Verification & Epistemic Distinction',
        accuracyBody:
          'Each profile below distinguishes documented historical and epigraphic associations (attested in stone inscriptions, copper plates, and state archives across Odisha, Karnataka, Andhra Pradesh, and Tamil Nadu) from revered Puranic progenitors and traditional community ballad chronicles.',
        roleFilterLabel: 'Role Category:',
        stateFilterLabel: 'Regional Association:',
        roleCategories: {
          all: 'All Categories',
          'Historical Rulers & Sovereigns': 'Historical Rulers & Sovereigns',
          'Military Commanders & Martial Figures': 'Military Commanders & Martial Figures',
          'Scholars, Saints & Cultural Figures': 'Scholars, Saints & Cultural Figures',
          'Civic Engineers & Community Leaders': 'Civic Engineers & Community Leaders'
        },
        stateRegions: {
          all: 'All States & Regions',
          Odisha: 'Odisha',
          Karnataka: 'Karnataka',
          'Andhra Pradesh': 'Andhra Pradesh',
          'Tamil Nadu': 'Tamil Nadu',
          'Deccan, Maharashtra & North': 'Deccan, Maharashtra & North'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'Documented Historical & Epigraphic Record',
          'Community Tradition, Puranic & Ballad Chronicle': 'Community Tradition & Ballad Chronicle',
          'Contemporary Archival & Community Leadership': 'Contemporary Archival & Community Leader'
        },
        categories: {
          all: 'All Lineages',
          royal: 'Royal Sovereignty & Rajulu',
          martial: 'Martial Guardians & Paikas',
          civic: 'Civic, Hydraulic & Agrarian Masters',
          realms: 'Classical Empires & Realms'
        }
      },
      hi: {
        pageTitle: 'समुदाय के प्रमुख व्यक्तित्व एवं छत्रपति',
        pageSubtitle:
          'ओडिशा, कर्नाटक, आंध्र प्रदेश, तमिलनाडु और अखिल भारतीय सूर्यवंश क्षत्रिय / ओडियाराजू / वड्डे-गजपतिराजुलु / ओड-क्षत्रिय परंपराओं से संबद्ध प्रमाणित ऐतिहासिक सम्राट, सेनापति, विद्वान, संत, जल-स्थापत्यविद् एवं जननायक।',
        allBranches: 'सभी 32 कुल एवं शाखाएं',
        searchPlaceholder: 'नाम, उपाधि, शाखा, कालखंड या क्षेत्र से खोजें...',
        activeFilter: 'चयनित समुदाय शाखा',
        showingCount: (c, tot) => `${tot} में से ${c} प्रमुख व्यक्तित्व प्रदर्शित`,
        readFullBio: 'विस्तृत जीवनी व ऐतिहासिक प्रमाण देखें',
        historicalEvidence: 'प्राथमिक शिलालेख एवं पुरातात्विक साक्ष्य',
        associatedBranches: 'संबद्ध कुल एवं समुदाय शाखाएं',
        keyContributions: 'प्रमुख ऐतिहासिक योगदान एवं उपलब्धियां',
        closeModal: 'खिड़की बंद करें',
        shareLink: 'लिंक साझा करें',
        linkCopied: 'लिंक कॉपी हो गया!',
        consultPublisher: 'डॉ. जी. सत्यनारायण राजू जी से संपर्क करें (+91 9480112897)',
        emptyStateTitle: 'आपके खोज मानदंडों के अनुसार कोई परिणाम नहीं मिला',
        emptyStateDesc: 'कृपया शाखा, श्रेणी, राज्य फिल्टर या खोज शब्दों में परिवर्तन करें।',
        clearFilters: 'सभी फिल्टर हटाएं',
        accuracyHeading: 'ऐतिहासिक सत्यापन एवं साक्ष्य वर्गीकरण',
        accuracyBody:
          'नीचे दिए गए प्रत्येक परिचय में प्रमाणित ऐतिहासिक व शिलालेखीय संबंधों (ओडिशा, कर्नाटक, आंध्र प्रदेश और तमिलनाडु के शिलालेखों व ताम्रपत्रों में दर्ज) को पौराणिक पूर्वजों और पारंपरिक सामुदायिक वीरगाथाओं से स्पष्ट रूप से अलग दर्शाया गया है।',
        roleFilterLabel: 'भूमिका श्रेणी:',
        stateFilterLabel: 'क्षेत्रीय संबद्धता:',
        roleCategories: {
          all: 'सभी श्रेणियाँ',
          'Historical Rulers & Sovereigns': 'ऐतिहासिक शासक एवं सम्राट',
          'Military Commanders & Martial Figures': 'सैन्य कमांडर एवं सामरिक नायक',
          'Scholars, Saints & Cultural Figures': 'विद्वान, संत एवं सांस्कृतिक विभूतियाँ',
          'Civic Engineers & Community Leaders': 'जल-स्थापत्यविद् एवं समाज नायक'
        },
        stateRegions: {
          all: 'सभी राज्य व क्षेत्र',
          Odisha: 'ओडिशा (Odisha)',
          Karnataka: 'कर्नाटक (Karnataka)',
          'Andhra Pradesh': 'आंध्र प्रदेश (Andhra Pradesh)',
          'Tamil Nadu': 'तमिलनाडु (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'दक्कन, महाराष्ट्र एवं उत्तर भारत'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'प्रमाणित ऐतिहासिक एवं शिलालेखीय साक्ष्य',
          'Community Tradition, Puranic & Ballad Chronicle': 'सामुदायिक परंपरा एवं वीरगाथा आख्यान',
          'Contemporary Archival & Community Leadership': 'समकालीन अभिलेखीय शोध एवं समाज नेतृत्व'
        },
        categories: {
          all: 'सभी कुल',
          royal: 'राजकीय संप्रभुता व राजुलु',
          martial: 'पाइका व खंडायत योद्धा',
          civic: 'जल-स्थापत्य व ओडा-चासा शिल्पी',
          realms: 'प्राचीन साम्राज्य व क्षेत्र'
        }
      },
      te: {
        pageTitle: 'సముదాయ ప్రముఖ వ్యక్తులు & చక్రవర్తులు',
        pageSubtitle:
          'ఒడిశా, కర్ణాటక, ఆంధ్రప్రదేశ్, తమిళనాడు మరియు అఖిల భారత సూర్యవంశ క్షత్రియ / ఒడియారాజు / వడ్డే-గజపతిరాజులు / ఓడ్-క్షత్రియ వారసత్వంతో సంబంధం ఉన్న చారిత్రక చక్రవర్తులు, సేనాపతులు, పండితులు, సాధువులు, జల-నిర్మాణ శిల్పులు మరియు సమాజ నాయకులు.',
        allBranches: 'మొత్తం 32 వంశాలు & శాఖలు',
        searchPlaceholder: 'పేరు, బిరుదు, శాఖ, కాలం, ప్రాంతం ద్వారా శోధించండి...',
        activeFilter: 'ఎంచుకున్న సముదాయ శాఖ',
        showingCount: (c, tot) => `${tot} మంది ప్రముఖులలో ${c} మంది చూపబడుతున్నారు`,
        readFullBio: 'పూర్తి చారిత్రక జీవిత విశేషాలు & శాసనాధారాలు',
        historicalEvidence: 'ప్రాథమిక శిలాశాసన & పురావస్తు ఆధారాలు',
        associatedBranches: 'అనుబంధ వంశాలు & సముదాయ శాఖలు',
        keyContributions: 'ముఖ్య చారిత్రక విజయాలు & సేవలు',
        closeModal: 'విండో మూసివేయి',
        shareLink: 'లింక్ షేర్ చేయండి',
        linkCopied: 'లింక్ క్లిప్‌బోర్డ్‌కు కాపీ చేయబడింది!',
        consultPublisher: 'డాక్టర్ జి. సత్యనారాయణ రాజు గారితో చర్చించండి (+91 9480112897)',
        emptyStateTitle: 'మీ శోధనకు తగిన ప్రముఖుల వివరాలు కనుగొనబడలేదు',
        emptyStateDesc: 'దయచేసి మీ శోధన పదాలను లేదా ప్రాంతీయ/వర్గ ఎంపికను మార్చండి.',
        clearFilters: 'అన్ని ఫిల్టర్‌లను రీసెట్ చేయండి',
        accuracyHeading: 'చారిత్రక ప్రామాణికత & ఆధారాల వర్గీకరణ',
        accuracyBody:
          'ఈ పుటలోని ప్రతి ప్రముఖుని వివరాలలో శాసన మరియు చారిత్రక ఆధారాలతో రుజువైన అంశాలను (ఒడిశా, కర్ణాటక, ఆంధ్రప్రదేశ్, తమిళనాడు శిలాశాసనాలు, తామ్రపత్రాలు) పురాణ గాథలు మరియు సామాజిక వీరగాథా సంప్రదాయాల నుండి స్పష్టంగా వేరు చేసి చూపడమైనది.',
        roleFilterLabel: 'పాత్ర వర్గం:',
        stateFilterLabel: 'ప్రాంతీయ అనుబంధం:',
        roleCategories: {
          all: 'అన్ని వర్గాలు',
          'Historical Rulers & Sovereigns': 'చారిత్రక పాలకులు & చక్రవర్తులు',
          'Military Commanders & Martial Figures': 'సేనాపతులు & యోధులు',
          'Scholars, Saints & Cultural Figures': 'పండితులు, సాధువులు & సాంస్కృతిక ప్రముఖులు',
          'Civic Engineers & Community Leaders': 'జల-నిర్మాణ శిల్పులు & సమాజ నాయకులు'
        },
        stateRegions: {
          all: 'అన్ని రాష్ట్రాలు & ప్రాంతాలు',
          Odisha: 'ఒడిశా (Odisha)',
          Karnataka: 'కర్ణాటక (Karnataka)',
          'Andhra Pradesh': 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)',
          'Tamil Nadu': 'తమిళనాడు (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'దక్కన్, మహారాష్ట్ర & ఉత్తర భారత్'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'శాసన & చారిత్రక ఆధారిత నమోదు',
          'Community Tradition, Puranic & Ballad Chronicle': 'సామాజిక సంప్రదాయం & వీరగాథా చరిత్ర',
          'Contemporary Archival & Community Leadership': 'సమకాలీన పురావస్తు పరిశోధన & సమాజ నాయకత్వం'
        },
        categories: {
          all: 'అన్ని వంశాలు',
          royal: 'రాజసార్వభౌమత్వం & రాజులు',
          martial: 'పైకా & ఖండాయత్ యోధులు',
          civic: 'జల-శిల్ప & ఓడా-చాసా ఆద్యులు',
          realms: 'ప్రాచీన సామ్రాజ్యాలు & దేశాలు'
        }
      },
      kn: {
        pageTitle: 'ಸಮುದಾಯದ ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು ಚಕ್ರವರ್ತಿಗಳು',
        pageSubtitle:
          'ಒಡಿಶಾ, ಕರ್ನಾಟಕ, ಆಂಧ್ರಪ್ರದೇಶ, ತಮಿಳುನಾಡು ಮತ್ತು ಅಖಿಲ ಭಾರತ ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯ / ಒಡಿಯರಾಜು / ವಡ್ಡೇ-ಗಜಪತಿರಾಜುಲು ಪರಂಪರೆಗೆ ಸಂಬಂಧಿಸಿದ ಐತಿಹಾಸಿಕ ಅರಸರು, ದಂಡನಾಯಕರು, ವಿದ್ವಾಂಸರು, ಸಂತರು ಮತ್ತು ಸಮುದಾಯ ನಾಯಕರು.',
        allBranches: 'ಎಲ್ಲಾ ೩೨ ಶಾಖೆಗಳು',
        searchPlaceholder: 'ಹೆಸರು, ಬಿರುದು, ಶಾಖೆ, ಕಾಲ ಅಥವಾ ಸ್ಥಳದಿಂದ ಹುಡುಕಿ...',
        activeFilter: 'ಆಯ್ದ ಸಮುದಾಯ ಶಾಖೆ',
        showingCount: (c, tot) => `${tot} ರಲ್ಲಿ ${c} ಪ್ರಮುಖ ವ್ಯಕ್ತಿಗಳು`,
        readFullBio: 'ಸಂಪೂರ್ಣ ಜೀವನ ಚರಿತ್ರೆ ಮತ್ತು ಶಾಸನಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        historicalEvidence: 'ಪ್ರಾಥಮಿಕ ಶಾಸನಾಧಾರಗಳು',
        associatedBranches: 'ಸಂಬಂಧಿತ ಸಮುದಾಯ ಶಾಖೆಗಳು',
        keyContributions: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಕೊಡುಗೆಗಳು',
        closeModal: 'ಕಿಟಕಿ ಮುಚ್ಚಿ',
        shareLink: 'ಲಿಂಕ್ ಹಂಚಿಕೊಳ್ಳಿ',
        linkCopied: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
        consultPublisher: 'ಡಾ. ಜಿ. ಸತ್ಯನಾರಾಯಣ ರಾಜು ಅವರನ್ನು ಸಂಪರ್ಕಿಸಿ (+91 9480112897)',
        emptyStateTitle: 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
        emptyStateDesc: 'ದಯವಿಟ್ಟು ಹುಡುಕಾಟದ ಪದಗಳನ್ನು ಅಥವಾ ಫಿಲ್ಟರ್ ಬದಲಾಯಿಸಿ.',
        clearFilters: 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
        accuracyHeading: 'ಐತಿಹಾಸಿಕ ದೃಢೀಕರಣ ಮತ್ತು ಆಕರಗಳ ವರ್ಗೀಕರಣ',
        accuracyBody:
          'ಇಲ್ಲಿನ ಪ್ರತಿಯೊಂದು ವ್ಯಕ್ತಿಚಿತ್ರದಲ್ಲಿ ದೃಢೀಕೃತ ಶಾಸನ ಮತ್ತು ಐತಿಹಾಸಿಕ ದಾಖಲೆಗಳನ್ನು (ಒಡಿಶಾ, ಕರ್ನಾಟಕ, ಆಂಧ್ರಪ್ರದೇಶ ಮತ್ತು ತಮಿಳುನಾಡಿನ ಶಾಸನಗಳು) ಪುರಾಣ ಪರಂಪರೆ ಹಾಗೂ ಜಾನಪದ ವೀರಗಾಥೆಗಳಿಂದ ಸ್ಪಷ್ಟವಾಗಿ ಪ್ರತ್ಯೇಕಿಸಲಾಗಿದೆ.',
        roleFilterLabel: 'ಪಾತ್ರ ವರ್ಗ:',
        stateFilterLabel: 'ಪ್ರಾದೇಶಿಕ ಸಂಬಂಧ:',
        roleCategories: {
          all: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
          'Historical Rulers & Sovereigns': 'ಐತಿಹಾಸಿಕ ಅರಸರು ಮತ್ತು ಚಕ್ರವರ್ತಿಗಳು',
          'Military Commanders & Martial Figures': 'ಸೇನಾ ದಂಡನಾಯಕರು ಮತ್ತು ವೀರರು',
          'Scholars, Saints & Cultural Figures': 'ವಿದ್ವಾಂಸರು, ಸಂತರು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ವ್ಯಕ್ತಿಗಳು',
          'Civic Engineers & Community Leaders': 'ಜಲತಂತ್ರಜ್ಞರು ಮತ್ತು ಸಮುದಾಯ ನಾಯಕರು'
        },
        stateRegions: {
          all: 'ಎಲ್ಲಾ ರಾಜ್ಯಗಳು ಮತ್ತು ಪ್ರದೇಶಗಳು',
          Odisha: 'ಒಡಿಶಾ (Odisha)',
          Karnataka: 'ಕರ್ನಾಟಕ (Karnataka)',
          'Andhra Pradesh': 'ಆಂಧ್ರಪ್ರದೇಶ (Andhra Pradesh)',
          'Tamil Nadu': 'ತಮಿಳುನಾಡು (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'ದಖನ್, ಮಹಾರಾಷ್ಟ್ರ ಮತ್ತು ಉತ್ತರ ಭಾರತ'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'ದೃಢೀಕೃತ ಐತಿಹಾಸಿಕ ಮತ್ತು ಶಾಸನ ದಾಖಲೆ',
          'Community Tradition, Puranic & Ballad Chronicle': 'ಸಮುದಾಯ ಸಂಪ್ರದಾಯ ಮತ್ತು ವೀರಗಾಥೆ ಪರಂಪರೆ',
          'Contemporary Archival & Community Leadership': 'ಸಮಕಾಲೀನ ಸಂಶೋಧನೆ ಮತ್ತು ಸಮುದಾಯ ನಾಯಕತ್ವ'
        },
        categories: {
          all: 'ಎಲ್ಲಾ ಶಾಖೆಗಳು',
          royal: 'ರಾಜವಂಶ ಮತ್ತು ರಾಜುಲು',
          martial: 'ಪೈಕ ಮತ್ತು ಯೋಧರು',
          civic: 'ಶಿಲ್ಪ ಮತ್ತು ಜಲತಜ್ಞರು',
          realms: 'ಪ್ರಾಚೀನ ಸಾಮ್ರಾಜ್ಯಗಳು'
        }
      },
      ta: {
        pageTitle: 'சமூகத்தின் முக்கிய பிரமுகர்கள் மற்றும் பேரரசர்கள்',
        pageSubtitle:
          'ஒடிசா, கர்நாடகா, ஆந்திரப் பிரதேசம், தமிழ்நாடு மற்றும் அகில இந்திய சூர்யவம்ச க்ஷத்திரிய / ஒடியராஜு / வட்டே-கஜபதிராஜுலு மரபுகளுடன் தொடர்புடைய வரலாற்று மன்னர்கள், படைத்தளபதிகள், புலவர்கள், புனிதர்கள் மற்றும் சமூகத் தலைவர்கள்.',
        allBranches: 'அனைத்து 32 கிளைகள்',
        searchPlaceholder: 'பெயர், பட்டம், கிளை, காலம் மூலம் தேடுங்கள்...',
        activeFilter: 'தேர்ந்தெடுக்கப்பட்ட சமூகக் கிளை',
        showingCount: (c, tot) => `${tot} இல் ${c} முக்கிய பிரமுகர்கள்`,
        readFullBio: 'முழு வாழ்க்கை வரலாறு மற்றும் கல்வெட்டுகளைக் காண்க',
        historicalEvidence: 'முதன்மை கல்வெட்டு மற்றும் தொல்பொருள் சான்றுகள்',
        associatedBranches: 'தொடர்புடைய சமூகக் கிளைகள்',
        keyContributions: 'முக்கிய வரலாற்றுப் பங்களிப்புகள்',
        closeModal: 'மூடுக',
        shareLink: 'பகிர்',
        linkCopied: 'இணைப்பு நகலெடுக்கப்பட்டது!',
        consultPublisher: 'டாக்டர் ஜி. சத்யநாராயண ராஜுவைத் தொடர்பு கொள்ள (+91 9480112897)',
        emptyStateTitle: 'முடிவுகள் எதுவும் கிடைக்கவில்லை',
        emptyStateDesc: 'தயவுசெய்து தேடல் சொற்களை அல்லது வடிகட்டிகளை மாற்றி முயற்சிக்கவும்.',
        clearFilters: 'வடிகட்டிகளை மீட்டமைக்க',
        accuracyHeading: 'வரலாற்றுச் சரிபார்ப்பு மற்றும் ஆதார வகைப்பாடு',
        accuracyBody:
          'ஒடிசா, கர்நாடகா, ஆந்திரப் பிரதேசம் மற்றும் தமிழ்நாட்டின் கல்வெட்டுகள் மற்றும் செப்பேடுகளில் உறுதிப்படுத்தப்பட்ட வரலாற்று ஆளுமைகள், புராண முன்னோடிகள் மற்றும் சமூக வீரகாவிய மரபுகளிலிருந்து தெளிவாக வேறுபடுத்தி காட்டப்பட்டுள்ளன.',
        roleFilterLabel: 'பங்கு வகை:',
        stateFilterLabel: 'பிராந்தியத் தொடர்பு:',
        roleCategories: {
          all: 'அனைத்து வகைகள்',
          'Historical Rulers & Sovereigns': 'வரலாற்று மன்னர்கள் & பேரரசர்கள்',
          'Military Commanders & Martial Figures': 'படைத்தளபதிகள் & வீரர்கள்',
          'Scholars, Saints & Cultural Figures': 'புலவர்கள், புனிதர்கள் & பண்பாட்டு ஆளுமைகள்',
          'Civic Engineers & Community Leaders': 'நீரியல் கலைஞர்கள் & சமூகத் தலைவர்கள்'
        },
        stateRegions: {
          all: 'அனைத்து மாநிலங்கள்',
          Odisha: 'ஒடிசா (Odisha)',
          Karnataka: 'கர்நாடகா (Karnataka)',
          'Andhra Pradesh': 'ஆந்திரப் பிரதேசம் (Andhra Pradesh)',
          'Tamil Nadu': 'தமிழ்நாடு (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'தக்காணம், மகாராஷ்டிரா & வட இந்தியா'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'ஆவணப்படுத்தப்பட்ட கல்வெட்டு & வரலாற்றுப் பதிவு',
          'Community Tradition, Puranic & Ballad Chronicle': 'சமூக மரபு & வீரகாவிய வரலாறு',
          'Contemporary Archival & Community Leadership': 'தற்கால ஆவண ஆய்வு & சமூகத் தலைமை'
        },
        categories: {
          all: 'அனைத்து கிளைகள்',
          royal: 'அரச மரபினர் மற்றும் ராஜுலு',
          martial: 'பைகா மற்றும் கண்டாயத் படை',
          civic: 'நீரியல் மற்றும் கட்டிடக் கலைஞர்',
          realms: 'பண்டைய சாம்ராஜ்யங்கள்'
        }
      },
      mr: {
        pageTitle: 'समाजातील प्रमुख व्यक्तिमत्त्वे आणि चक्रवर्ती',
        pageSubtitle:
          'ओडिशा, कर्नाटक, आंध्र प्रदेश, तमिळनाडू आणि अखिल भारतीय सूर्यवंश क्षत्रिय / ओडियाराजू / वड्डे-गजपतीराजुलू परंपरेशी संबंधित ऐतिहासिक सम्राट, सेनापती, विद्वान, संत, जल-स्थापत्यकार व समाज नेते.',
        allBranches: 'सर्व ३२ शाखा',
        searchPlaceholder: 'नाव, पदवी, शाखा, काळ किंवा ठिकाणावरून शोधा...',
        activeFilter: 'निवडलेली समाज शाखा',
        showingCount: (c, tot) => `${tot} पैकी ${c} प्रमुख व्यक्तिमत्त्वे`,
        readFullBio: 'संपूर्ण जीवनचरित्र व ऐतिहासिक संदर्भ पहा',
        historicalEvidence: 'प्राथमिक शिलालेख व ऐतिहासिक पुरावे',
        associatedBranches: 'संबंधित समाज शाखा',
        keyContributions: 'प्रमुख ऐतिहासिक योगदान',
        closeModal: 'बंद करा',
        shareLink: 'लिंक शेअर करा',
        linkCopied: 'लिंक कॉपी झाली!',
        consultPublisher: 'डॉ. जी. सत्यनारायण राजू यांच्याशी चर्चा करा (+91 9480112897)',
        emptyStateTitle: 'कोणतेही निकाल आढळले नाहीत',
        emptyStateDesc: 'कृपया शोध शब्द किंवा फिल्टर तपासा.',
        clearFilters: 'फिल्टर रीसेट करा',
        accuracyHeading: 'ऐतिहासिक पडताळणी आणि पुरावा वर्गीकरण',
        accuracyBody:
          'येथील प्रत्येक चरित्रात ओडिशा, कर्नाटक, आंध्र प्रदेश आणि तमिळनाडूतील शिलालेख व ताम्रपटांमध्ये नोंदवलेले ऐतिहासिक संबंध आणि पौराणिक व पारंपरिक वीरगाथा यांमधील फरक स्पष्टपणे दर्शविला आहे.',
        roleFilterLabel: 'भूमिका वर्ग:',
        stateFilterLabel: 'प्रादेशिक संबंध:',
        roleCategories: {
          all: 'सर्व वर्ग',
          'Historical Rulers & Sovereigns': 'ऐतिहासिक शासक व सम्राट',
          'Military Commanders & Martial Figures': 'सेनापती व लढाऊ व्यक्तिमत्त्वे',
          'Scholars, Saints & Cultural Figures': 'विद्वान, संत व सांस्कृतिक विभूती',
          'Civic Engineers & Community Leaders': 'जल-अभियंते व समाज नेते'
        },
        stateRegions: {
          all: 'सर्व राज्ये व प्रदेश',
          Odisha: 'ओडिशा (Odisha)',
          Karnataka: 'कर्नाटक (Karnataka)',
          'Andhra Pradesh': 'आंध्र प्रदेश (Andhra Pradesh)',
          'Tamil Nadu': 'तमिळनाडू (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'दख्खन, महाराष्ट्र व उत्तर भारत'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'प्रमाणित शिलालेख व ऐतिहासिक नोंद',
          'Community Tradition, Puranic & Ballad Chronicle': 'सामाजिक परंपरा व वीरगाथा इतिहास',
          'Contemporary Archival & Community Leadership': 'समकालीन संशोधन व समाज नेतृत्व'
        },
        categories: {
          all: 'सर्व शाखा',
          royal: 'राजघराणी व राजुलू',
          martial: 'पाईक व खंडायत सैनिक',
          civic: 'पाषाण-जलसंधारण व ओडा-चासा',
          realms: 'प्राचीन साम्राज्ये व देश'
        }
      },
      or: {
        pageTitle: 'ସମୁଦାୟର ପ୍ରମୁଖ ବ୍ୟକ୍ତିବିଶେଷ ଓ ସମ୍ରାଟ',
        pageSubtitle:
          'ଓଡ଼ିଶା, କର୍ଣ୍ଣାଟକ, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, ତାମିଲନାଡୁ ଓ ସର୍ବଭାରତୀୟ ସୂର୍ଯ୍ୟବଂଶ କ୍ଷତ୍ରିୟ / ଓଡ଼ିଆରାଜୁ / ଭଡ୍ଡେ-ଗଜପତିରାଜୁଲୁ ପରମ୍ପରା ସହ ସମ୍ପୃକ୍ତ ଐତିହାସିକ ସମ୍ରାଟ, ସେନାପତି, ପଣ୍ଡିତ, ସନ୍ଥ ଓ ସମାଜ ନେତା।',
        allBranches: 'ସମସ୍ତ ୩୨ଟି ଶାଖା',
        searchPlaceholder: 'ନାମ, ଉପାଧି, ଶାଖା, କାଳ କିମ୍ବା ଅଞ୍ଚଳ ଦ୍ୱାରା ଖୋଜନ୍ତୁ...',
        activeFilter: 'ଚୟନିତ ସମୁଦାୟ ଶାଖା',
        showingCount: (c, tot) => `${tot} ଜଣଙ୍କ ମଧ୍ୟରୁ ${c} ଜଣ ପ୍ରମୁଖ ବ୍ୟକ୍ତିତ୍ୱ ପ୍ରଦର୍ଶିତ`,
        readFullBio: 'ସମ୍ପୂର୍ଣ୍ଣ ଜୀବନୀ ଓ ଶିଳାଲେଖ ପ୍ରମାଣ ଦେଖନ୍ତୁ',
        historicalEvidence: 'ପ୍ରାଥମିକ ଶିଳାଲେଖ ଓ ଐତିହାସିକ ପ୍ରମାଣ',
        associatedBranches: 'ସମ୍ପୃକ୍ତ ସମୁଦାୟ ଶାଖା',
        keyContributions: 'ମୁଖ୍ୟ ଐତିହାସିକ ଅବଦାନ',
        closeModal: 'ବନ୍ଦ କରନ୍ତୁ',
        shareLink: 'ଲିଙ୍କ୍ ସେୟାର୍ କରନ୍ତୁ',
        linkCopied: 'ଲିଙ୍କ୍ କପି ହୋଇଗଲା!',
        consultPublisher: 'ଡକ୍ଟର ଜି. ସତ୍ୟନାରାୟଣ ରାଜୁଙ୍କ ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ (+91 9480112897)',
        emptyStateTitle: 'କୌଣସି ତଥ୍ୟ ମିଳିଲା ନାହିଁ',
        emptyStateDesc: 'ଦୟାକରି ଖୋଜିବା ଶବ୍ଦ ବା ଫିଲ୍ଟର୍ ପରିବର୍ତ୍ତନ କରନ୍ତୁ।',
        clearFilters: 'ସମସ୍ତ ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ',
        accuracyHeading: 'ଐତିହାସିକ ପ୍ରମାଣ ଓ ବର୍ଗୀକରଣ ସୂଚନା',
        accuracyBody:
          'ଏଠାରେ ପ୍ରଦত্ত ପ୍ରତ୍ୟେକ ଜୀବନୀରେ ଓଡ଼ିଶା, କର୍ଣ୍ଣାଟକ, ଆନ୍ଧ୍ର ପ୍ରଦେଶ ଓ ତାମିଲନାଡୁର ଶିଳାଲେଖ ଏବଂ ତାମ୍ରଫଳକରେ ପ୍ରମାଣିତ ଐତିହାସିକ ତଥ୍ୟକୁ ପୌରାଣିକ ଓ ପାରମ୍ପରିକ ବୀରଗାଥାଠାରୁ ସ୍ପଷ୍ଟ ଭାବେ ପୃଥକ କରାଯାଇଛି।',
        roleFilterLabel: 'ଭୂମିକା ବର୍ଗ:',
        stateFilterLabel: 'ଆଞ୍ଚଳିକ ସମ୍ପର୍କ:',
        roleCategories: {
          all: 'ସମସ୍ତ ବର୍ଗ',
          'Historical Rulers & Sovereigns': 'ଐତିହାସିକ ଶାସକ ଓ ସମ୍ରାଟ',
          'Military Commanders & Martial Figures': 'ସେନାପତି ଓ ସାମରିକ ବୀର',
          'Scholars, Saints & Cultural Figures': 'ପଣ୍ଡିତ, ସନ୍ଥ ଓ ସାଂସ୍କୃତିକ ବ୍ୟକ୍ତିତ୍ୱ',
          'Civic Engineers & Community Leaders': 'ଜଳ-ଶିଳ୍ପୀ ଓ ସମାଜ ନେତା'
        },
        stateRegions: {
          all: 'ସମସ୍ତ ରାଜ୍ୟ ଓ ଅଞ୍ଚଳ',
          Odisha: 'ଓଡ଼ିଶା (Odisha)',
          Karnataka: 'କର୍ଣ୍ଣାଟକ (Karnataka)',
          'Andhra Pradesh': 'ଆନ୍ଧ୍ର ପ୍ରଦେଶ (Andhra Pradesh)',
          'Tamil Nadu': 'ତାମିଲନାଡୁ (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'ଦାକ୍ଷିଣାତ୍ୟ, ମହାରାଷ୍ଟ୍ର ଓ ଉତ୍ତର ଭାରତ'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'ପ୍ରମାଣିତ ଐତିହାସିକ ଓ ଶିଳାଲେଖ ତଥ୍ୟ',
          'Community Tradition, Puranic & Ballad Chronicle': 'ସାମୁଦାୟିକ ପରମ୍ପରା ଓ ବୀରଗାଥା',
          'Contemporary Archival & Community Leadership': 'ସମକାଳୀନ ଗବେଷଣା ଓ ସମାଜ ନେତୃତ୍ୱ'
        },
        categories: {
          all: 'ସମସ୍ତ ଶାଖା',
          royal: 'ରାଜକୀୟ ସାର୍ବଭୌମତ୍ୱ ଓ ରାଜୁଲୁ',
          martial: 'ପାଇକ ଓ ଖଣ୍ଡାୟତ ଯୋଦ୍ଧା',
          civic: 'ଶିଳ୍ପ, ଜଳାଶୟ ଓ ଓଡ଼ା-ଚାଷୀ',
          realms: 'ପ୍ରାଚୀନ ସାମ୍ରାଜ୍ୟ ଓ ଦେଶ'
        }
      },
      bn: {
        pageTitle: 'সমাজের বিশিষ্ট ব্যক্তিত্ব ও চক্রবর্তী সম্রাটগণ',
        pageSubtitle:
          'ওড়িশা, কর্ণাটক, অন্ধ্রপ্রদেশ, তামিলনাড়ু ও সর্বভারতীয় সূর্যবংশ ক্ষত্রিয় / ওডিয়ারাজু / ভড্ডে-গজপতিরাজুলু ঐতিহ্যের সাথে যুক্ত ঐতিহাসিক সম্রাট, সেনাপতি, পণ্ডিত, সন্ত, জল-স্থপতি ও সমাজ নেতাগণ।',
        allBranches: 'সকল ৩২টি শাখা ও বংশ',
        searchPlaceholder: 'নাম, উপাধি, শাখা, সময়কাল বা অঞ্চল দিয়ে খুঁজুন...',
        activeFilter: 'নির্বাচিত সমাজ শাখা',
        showingCount: (c, tot) => `${tot} জনের মধ্যে ${c} জন বিশিষ্ট ব্যক্তিত্ব`,
        readFullBio: 'সম্পূর্ণ জীবনী ও শিলালিপি প্রমাণ দেখুন',
        historicalEvidence: 'প্রাথমিক শিলালিপি ও ঐতিহাসিক তথ্যসূত্র',
        associatedBranches: 'সংশ্লিষ্ট সমাজ শাখাসমূহ',
        keyContributions: 'প্রধান ঐতিহাসিক অবদান',
        closeModal: 'বন্ধ করুন',
        shareLink: 'লিঙ্ক শেয়ার করুন',
        linkCopied: 'লিঙ্ক কপি হয়েছে!',
        consultPublisher: 'ডক্টর জি. সত্যনারায়ণ রাজুর সাথে যোগাযোগ করুন (+91 9480112897)',
        emptyStateTitle: 'কোনো ফলাফল পাওয়া যায়নি',
        emptyStateDesc: 'অনুগ্রহ করে অনুসন্ধান শব্দ বা ফিল্টার পরিবর্তন করুন।',
        clearFilters: 'ফিল্টার রিসেট করুন',
        accuracyHeading: 'ঐতিহাসিক প্রামাণ্যতা ও তথ্যসূত্রের শ্রেণীবিন্যাস',
        accuracyBody:
          'নিচের প্রতিটি জীবনীতে ওড়িশা, কর্ণাটক, অন্ধ্রপ্রদেশ ও তামিলনাড়ুর শিলালিপি এবং তাম্রশাসনে প্রত্যয়িত ঐতিহাসিক তথ্যকে পৌরাণিক ও ঐতিহ্যবাহী বীরগাথা থেকে স্পষ্টভাবে পৃথক করে দেখানো হয়েছে।',
        roleFilterLabel: 'ভূমিকা বিভাগ:',
        stateFilterLabel: 'আঞ্চলিক সংযোগ:',
        roleCategories: {
          all: 'সকল বিভাগ',
          'Historical Rulers & Sovereigns': 'ঐতিহাসিক শাসক ও সম্রাট',
          'Military Commanders & Martial Figures': 'সেনাপতি ও সামরিক বীর',
          'Scholars, Saints & Cultural Figures': 'পণ্ডিত, সন্ত ও সাংস্কৃতিক ব্যক্তিত্ব',
          'Civic Engineers & Community Leaders': 'জল-স্থপতি ও সমাজ নেতা'
        },
        stateRegions: {
          all: 'সকল রাজ্য ও অঞ্চল',
          Odisha: 'ওড়িশা (Odisha)',
          Karnataka: 'কর্ণাটক (Karnataka)',
          'Andhra Pradesh': 'অন্ধ্রপ্রদেশ (Andhra Pradesh)',
          'Tamil Nadu': 'তামিলনাড়ু (Tamil Nadu)',
          'Deccan, Maharashtra & North': 'দাক্ষিণাত্য, মহারাষ্ট্র ও উত্তর ভারত'
        },
        verificationBadges: {
          'Documented Historical & Epigraphic Record': 'প্রত্যয়িত ঐতিহাসিক ও শিলালিপি নথি',
          'Community Tradition, Puranic & Ballad Chronicle': 'সামাজিক ঐতিহ্য ও বীরগাথা আখ্যান',
          'Contemporary Archival & Community Leadership': 'সমকালীন গবেষণা ও সমাজ নেতৃত্ব'
        },
        categories: {
          all: 'সকল শাখা',
          royal: 'রাজকীয় সার্বভৌমত্ব ও রাজুলু',
          martial: 'পাইক ও খণ্ডায়ত যোদ্ধা',
          civic: 'জল-স্থাপত্য ও ওডা-চাষা',
          realms: 'প্রাচীন সাম্রাজ্য ও ভূখণ্ড'
        }
      }
    };
    return dict[currentLang] || dict.en;
  }, [currentLang]);

  // Filtered branches based on category selection
  const displayedBranches = useMemo(() => {
    if (selectedCategory === 'all') return ALL_COMMUNITY_BRANCHES;
    return ALL_COMMUNITY_BRANCHES.filter(b => b.category === selectedCategory);
  }, [selectedCategory]);

  // Filter persons based on selected branch, category, role category, state region, and search query
  const filteredPersons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return PROMINENT_PERSONS.filter(person => {
      const meta = getPersonClassificationMetadata(person.id);

      // 1. Branch match
      if (selectedBranch !== 'all' && !person.branches.includes(selectedBranch)) {
        return false;
      }

      // 2. Category match (if branch is 'all' but category is chosen)
      if (selectedBranch === 'all' && selectedCategory !== 'all') {
        const categoryBranches = ALL_COMMUNITY_BRANCHES.filter(b => b.category === selectedCategory).map(b => b.key);
        const hasCategoryBranch = person.branches.some(b => categoryBranches.includes(b));
        if (!hasCategoryBranch) return false;
      }

      // 3. Role Category match
      if (selectedRoleCategory !== 'all' && meta.roleCategory !== selectedRoleCategory) {
        return false;
      }

      // 4. Regional State match
      if (selectedStateRegion !== 'all' && !meta.regionalStates.includes(selectedStateRegion)) {
        return false;
      }

      // 5. Search query match across multiple languages and tags
      if (!q) return true;

      const nameMatch = Object.values(person.name).some(val => val.toLowerCase().includes(q));
      const titlesMatch = Object.values(person.titles).some(val => val.toLowerCase().includes(q));
      const eraMatch = Object.values(person.era).some(val => val.toLowerCase().includes(q));
      const regionMatch = Object.values(person.region).some(val => val.toLowerCase().includes(q));
      const summaryMatch = Object.values(person.summary).some(val => val.toLowerCase().includes(q));
      const branchMatch = person.branches.some(b => b.toLowerCase().includes(q));
      const stateMatch = meta.regionalStates.some(s => s.toLowerCase().includes(q));

      return nameMatch || titlesMatch || eraMatch || regionMatch || summaryMatch || branchMatch || stateMatch;
    });
  }, [selectedBranch, selectedCategory, selectedRoleCategory, selectedStateRegion, searchQuery]);

  const handleShare = (person: ProminentPerson) => {
    const shareUrl = `${window.location.origin}/community-prominent-persons?figure=${encodeURIComponent(person.id)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-stone-200">
      {/* Decorative Royal Banner Header */}
      <div className="relative border-b border-[#c99738]/30 bg-gradient-to-b from-[#21020b] via-[#101420] to-[#07090e] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          {/* Top Breadcrumb & Status */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => onNavigate('/')}
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#d4af37] transition-colors cursor-pointer"
            >
              <span>←</span>
              <span>{t.nav?.home || 'Home'}</span>
              <span>/</span>
              <span className="text-[#d4af37]">{t.nav?.communityProminentPersons || 'Community Prominent Persons'}</span>
            </button>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#580014]/70 border border-[#c99738]/40 text-[#fcedc7] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>32 Recognized Sovereign & Martial Lineages</span>
            </span>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#580014]/70 border border-[#d4af37]/40 text-[#fae29c] text-xs font-bold uppercase tracking-widest font-royal-heading">
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Historical Legacy & Sovereign Lineages</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-royal-heading text-transparent bg-clip-text bg-gradient-to-r from-[#fae29c] via-[#d4af37] to-[#e8c872] leading-tight">
              {pageLabels.pageTitle}
            </h1>

            <p className="max-w-4xl text-xs sm:text-sm lg:text-base text-stone-300 leading-relaxed">
              {pageLabels.pageSubtitle}
            </p>
          </div>

          {/* Role Category Filter Bar (Rulers, Military Commanders, Scholars/Saints, Civic/Community Leaders) */}
          <div className="pt-3 border-t border-stone-800/80 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] mr-1 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#d4af37]" /> {pageLabels.roleFilterLabel}
              </span>
              {(
                [
                  'all',
                  'Historical Rulers & Sovereigns',
                  'Military Commanders & Martial Figures',
                  'Scholars, Saints & Cultural Figures',
                  'Civic Engineers & Community Leaders'
                ] as const
              ).map(roleKey => (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRoleCategory(roleKey)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedRoleCategory === roleKey
                      ? 'bg-[#580014] text-[#fae29c] border border-[#d4af37] shadow-md'
                      : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800'
                  }`}
                >
                  {pageLabels.roleCategories[roleKey]}
                </button>
              ))}
            </div>

            {/* Regional State Association Filter Bar (Odisha, Karnataka, Andhra Pradesh, Tamil Nadu) */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" /> {pageLabels.stateFilterLabel}
              </span>
              {(
                [
                  'all',
                  'Odisha',
                  'Karnataka',
                  'Andhra Pradesh',
                  'Tamil Nadu',
                  'Deccan, Maharashtra & North'
                ] as const
              ).map(stateKey => (
                <button
                  key={stateKey}
                  onClick={() => setSelectedStateRegion(stateKey)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    selectedStateRegion === stateKey
                      ? 'bg-[#d4af37] text-[#20050c] font-bold shadow-md'
                      : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800'
                  }`}
                >
                  {pageLabels.stateRegions[stateKey]}
                </button>
              ))}
            </div>
          </div>

          {/* Lineage Classification Category Tabs */}
          <div className="pt-2 border-t border-stone-800/80">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#d4af37]" /> Filter Group:
              </span>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBranch('all');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#d4af37] text-[#20050c] shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#151a28] hover:bg-[#20283d] text-stone-300 border border-stone-800'
                }`}
              >
                {pageLabels.categories.all}
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Royal Sovereignty');
                  setSelectedBranch('all');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Royal Sovereignty'
                    ? 'bg-[#d4af37] text-[#20050c] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{pageLabels.categories.royal}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Martial Guardians');
                  setSelectedBranch('all');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Martial Guardians'
                    ? 'bg-[#d4af37] text-[#20050c] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800'
                }`}
              >
                <Swords className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{pageLabels.categories.martial}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Classical Realms');
                  setSelectedBranch('all');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Classical Realms'
                    ? 'bg-[#d4af37] text-[#20050c] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{pageLabels.categories.realms}</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Civic & Builders');
                  setSelectedBranch('all');
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === 'Civic & Builders'
                    ? 'bg-[#d4af37] text-[#20050c] font-bold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>{pageLabels.categories.civic}</span>
              </button>
            </div>
          </div>

          {/* Quick Branch Directory Badges */}
          <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#d4af37]" /> Lineages:
            </span>
            <button
              onClick={() => setSelectedBranch('all')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedBranch === 'all'
                  ? 'bg-[#d4af37] text-[#20050c] shadow-lg shadow-[#d4af37]/20 font-bold'
                  : 'bg-[#151a28] hover:bg-[#20283d] text-stone-300 border border-stone-800'
              }`}
            >
              {pageLabels.allBranches} ({PROMINENT_PERSONS.length})
            </button>
            {displayedBranches.map(branch => {
              const count = PROMINENT_PERSONS.filter(p => p.branches.includes(branch.key)).length;
              const isSelected = selectedBranch === branch.key;
              return (
                <button
                  key={branch.key}
                  onClick={() => setSelectedBranch(branch.key)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#d4af37] text-[#20050c] font-bold shadow-md shadow-[#d4af37]/20'
                      : 'bg-[#121622] hover:bg-[#1a2133] text-stone-300 border border-stone-800/80 hover:border-[#c99738]/50'
                  }`}
                >
                  <span>{branch.label[currentLang] || branch.key}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-[#580014] text-[#fae29c]' : 'bg-stone-800 text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Historical Accuracy & Epistemic Distinction Banner */}
        <div className="bg-gradient-to-r from-[#22050f] via-[#121726] to-[#1a0811] border border-[#c99738]/40 rounded-2xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h2 className="text-xs sm:text-sm font-bold text-[#fae29c] uppercase tracking-wider">
                {pageLabels.accuracyHeading}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {pageLabels.accuracyBody}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar & Result Counters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e121c] p-4 rounded-xl border border-stone-800">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={pageLabels.searchPlaceholder}
              className="w-full bg-[#161c2b] border border-stone-700/80 rounded-lg pl-10 pr-9 py-2 text-xs sm:text-sm text-stone-100 placeholder-stone-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 text-xs text-stone-300 w-full sm:w-auto justify-between sm:justify-end">
            <span className="font-medium text-[#fae29c]">
              {pageLabels.showingCount(filteredPersons.length, PROMINENT_PERSONS.length)}
            </span>
            {(selectedBranch !== 'all' ||
              selectedCategory !== 'all' ||
              selectedRoleCategory !== 'all' ||
              selectedStateRegion !== 'all' ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSelectedBranch('all');
                  setSelectedCategory('all');
                  setSelectedRoleCategory('all');
                  setSelectedStateRegion('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#d4af37] hover:underline cursor-pointer"
              >
                {pageLabels.clearFilters}
              </button>
            )}
          </div>
        </div>

        {/* Empty state if no persons match search */}
        {filteredPersons.length === 0 && (
          <div className="bg-[#121622] rounded-2xl border border-stone-800 p-12 text-center space-y-4">
            <Users className="w-12 h-12 text-stone-500 mx-auto" />
            <h3 className="text-lg font-bold text-stone-200">{pageLabels.emptyStateTitle}</h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">{pageLabels.emptyStateDesc}</p>
            <button
              onClick={() => {
                setSelectedBranch('all');
                setSelectedCategory('all');
                setSelectedRoleCategory('all');
                setSelectedStateRegion('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#580014] text-[#fae29c] hover:bg-[#72001a] text-xs font-semibold cursor-pointer"
            >
              {pageLabels.clearFilters}
            </button>
          </div>
        )}

        {/* Categorized Sections of Prominent Persons */}
        {(
          [
            'Historical Rulers & Sovereigns',
            'Military Commanders & Martial Figures',
            'Scholars, Saints & Cultural Figures',
            'Civic Engineers & Community Leaders'
          ] as const
        ).map(roleGroup => {
          const groupPersons = filteredPersons.filter(
            p => getPersonClassificationMetadata(p.id).roleCategory === roleGroup
          );
          if (groupPersons.length === 0) return null;

          return (
            <div key={roleGroup} className="space-y-4 pt-2">
              <div className="border-l-4 border-[#d4af37] pl-4 py-1.5 bg-[#0f1420]/80 rounded-r-xl flex items-center justify-between pr-4">
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <h2 className="text-lg sm:text-xl font-bold font-royal-heading text-[#fae29c]">
                    {pageLabels.roleCategories[roleGroup]}
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#580014] text-[#fcedc7] border border-[#d4af37]/40 font-semibold">
                  {groupPersons.length}
                </span>
              </div>

              {/* Cards Grid: 1-column on mobile, 2 on lg */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupPersons.map(person => {
                  const localizedName = person.name[currentLang] || person.name.en;
                  const localizedTitles = person.titles[currentLang] || person.titles.en;
                  const localizedEra = person.era[currentLang] || person.era.en;
                  const localizedRegion = person.region[currentLang] || person.region.en;
                  const localizedSummary = person.summary[currentLang] || person.summary.en;
                  const meta = getPersonClassificationMetadata(person.id);
                  const verificationLabel =
                    pageLabels.verificationBadges[meta.verificationBasis] || meta.verificationBasis;
                  const isDocumented = meta.verificationBasis === 'Documented Historical & Epigraphic Record';

                  return (
                    <div
                      key={person.id}
                      onClick={() => setActiveModalPerson(person)}
                      className="bg-[#0f1420] border border-stone-800/90 hover:border-[#c99738]/60 rounded-2xl p-5 sm:p-6 transition-all shadow-lg hover:shadow-2xl hover:shadow-[#580014]/20 flex flex-col justify-between space-y-5 group cursor-pointer"
                    >
                      <div className="space-y-4">
                        {/* Top Bar: Badge, Verification Basis & Era */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#580014]/80 text-[#fae29c] border border-[#d4af37]/40">
                              <Crown className="w-3 h-3 text-[#d4af37]" />
                              <span>{person.badge}</span>
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                isDocumented
                                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/40'
                                  : 'bg-amber-950/60 text-amber-300 border-amber-600/40'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5 shrink-0" />
                              <span>{verificationLabel}</span>
                            </span>
                          </div>

                          <span className="text-[11px] font-medium text-stone-400 flex items-center gap-1 shrink-0">
                            <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>{localizedEra}</span>
                          </span>
                        </div>

                        {/* Header: Photo / Emblem & Names */}
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-[#c99738]/50 shrink-0 bg-[#161a29] shadow-md group-hover:border-[#d4af37] transition-all">
                            <img
                              src={person.imageUrl}
                              alt={localizedName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={e => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </div>

                          <div className="space-y-1">
                            <h3 className="text-lg sm:text-xl font-bold font-royal-heading text-[#fae29c] leading-snug group-hover:text-[#fde68a] transition-colors">
                              {localizedName}
                            </h3>
                            <p className="text-xs text-stone-400 font-medium leading-relaxed">
                              {localizedTitles}
                            </p>
                            <div className="flex items-center gap-1 text-[11px] text-stone-300 pt-0.5">
                              <MapPin className="w-3 h-3 text-[#d4af37] shrink-0" />
                              <span>{localizedRegion}</span>
                            </div>
                          </div>
                        </div>

                        {/* Regional State Badges */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          {meta.regionalStates.map(st => (
                            <button
                              key={st}
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedStateRegion(st);
                              }}
                              className={`text-[10px] px-2 py-0.5 rounded font-semibold border cursor-pointer transition-colors ${
                                selectedStateRegion === st
                                  ? 'bg-[#d4af37] text-black border-[#d4af37]'
                                  : 'bg-stone-900/90 text-[#fae29c] border-[#c99738]/30 hover:border-[#d4af37]'
                              }`}
                            >
                              📍 {pageLabels.stateRegions[st]}
                            </button>
                          ))}
                        </div>

                        {/* Branch Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {person.branches.map(branchKey => {
                            const branchObj = ALL_COMMUNITY_BRANCHES.find(b => b.key === branchKey);
                            const branchText = branchObj?.label[currentLang] || branchKey;
                            const isBranchActive = selectedBranch === branchKey;
                            return (
                              <button
                                key={branchKey}
                                onClick={e => {
                                  e.stopPropagation();
                                  setSelectedBranch(branchKey);
                                }}
                                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                                  isBranchActive
                                    ? 'bg-[#d4af37] text-black font-bold'
                                    : 'bg-[#182030] text-stone-300 hover:bg-[#222c42] hover:text-[#fae29c] border border-stone-700/60'
                                }`}
                                title={`Filter by ${branchText}`}
                              >
                                {branchText}
                              </button>
                            );
                          })}
                        </div>

                        {/* 8-Language Translated Summary */}
                        <div className="bg-[#141a27] rounded-xl p-4 border border-stone-800/80 space-y-2">
                          <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider block">
                            Historical Summary ({currentLang.toUpperCase()} Translation)
                          </span>
                          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                            {localizedSummary}
                          </p>
                          <p className="text-[11px] text-stone-400 border-t border-stone-800 pt-2 leading-relaxed">
                            {meta.epistemicNote[currentLang] || meta.epistemicNote.en}
                          </p>
                        </div>

                        {/* Major Contributions Bullet Preview */}
                        <div className="space-y-1.5 text-xs text-stone-300">
                          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                            {pageLabels.keyContributions}:
                          </span>
                          <ul className="space-y-1 list-disc list-inside text-stone-300 pl-1">
                            {person.majorContributions.slice(0, 2).map((contrib, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {contrib[currentLang] || contrib.en}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Footer Controls */}
                      <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveModalPerson(person)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#580014] hover:bg-[#78001c] text-[#fcedc7] text-xs font-bold transition-all shadow-md cursor-pointer"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                            <span>{pageLabels.readFullBio}</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleShare(person);
                            }}
                            className="p-2 rounded-lg bg-[#151c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 text-xs transition-colors cursor-pointer"
                            title={pageLabels.shareLink}
                          >
                            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                          </button>

                          <a
                            onClick={e => e.stopPropagation()}
                            href={`https://wa.me/919480112897?text=${encodeURIComponent(
                              `Namaste Dr G. Sathyanarayana Raju ji, I am reading about ${localizedName} (${person.branches.slice(0, 4).join(
                                ', '
                              )}) on the Suryavamsha Heritage Portal and would like to learn more.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-2 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] text-xs font-semibold border border-[#25D366]/40 transition-colors"
                            title="Contact Dr. G. Sathyanarayana Raju on WhatsApp"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Bottom Epistemic & Community Cross-Navigation */}
        <div className="mt-12 bg-gradient-to-r from-[#1b030a] via-[#101420] to-[#1b030a] border border-[#c99738]/40 rounded-2xl p-6 sm:p-8 space-y-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
                Archival Inscriptions & Primary Research
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-royal-heading text-[#fae29c]">
                Explore Verified Inscriptions & Royal Genealogy
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                Every prominent figure documented above is grounded in epigraphical inscriptions, copper plates,
                temple chronicles, and colonial gazetteers curated by Dr G.Sathyanarayana Raju.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('/inscriptions')}
                className="px-4 py-2.5 rounded-xl bg-[#580014] hover:bg-[#72001a] text-[#fcedc7] text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Scroll className="w-4 h-4 text-[#d4af37]" />
                <span>{t.nav?.inscriptions || 'Inscriptions & Archaeology'}</span>
              </button>
              <button
                onClick={() => onNavigate('/kings-queens')}
                className="px-4 py-2.5 rounded-xl bg-[#141a27] hover:bg-[#1e273a] text-stone-200 border border-stone-700 hover:border-[#c99738] text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Crown className="w-4 h-4 text-[#d4af37]" />
                <span>{t.nav?.documentedFigures || 'Documented Figures'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Modal: Full Archival Biography, Contributions, and Primary Sources */}
      {activeModalPerson && (
        <div
          onClick={() => setActiveModalPerson(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-[#0e121c] border-2 border-[#c99738] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-stone-200"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalPerson(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
              title={pageLabels.closeModal}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-stone-800 pb-5 pr-10">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#d4af37] shrink-0 bg-[#161a29]">
                <img
                  src={activeModalPerson.imageUrl}
                  alt={activeModalPerson.name[currentLang] || activeModalPerson.name.en}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 uppercase tracking-wider">
                    {activeModalPerson.badge}
                  </span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-600/40">
                    {pageLabels.verificationBadges[
                      getPersonClassificationMetadata(activeModalPerson.id).verificationBasis
                    ] || getPersonClassificationMetadata(activeModalPerson.id).verificationBasis}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-royal-heading text-[#fae29c]">
                  {activeModalPerson.name[currentLang] || activeModalPerson.name.en}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300">
                  {activeModalPerson.titles[currentLang] || activeModalPerson.titles.en}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    {activeModalPerson.era[currentLang] || activeModalPerson.era.en}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                    {activeModalPerson.region[currentLang] || activeModalPerson.region.en}
                  </span>
                </div>
              </div>
            </div>

            {/* Epistemic Verification Note */}
            <div className="bg-[#18101c] border border-[#d4af37]/40 rounded-xl p-4 text-xs text-stone-200 leading-relaxed">
              <strong className="text-[#fae29c] block mb-1">{pageLabels.accuracyHeading}:</strong>
              {getPersonClassificationMetadata(activeModalPerson.id).epistemicNote[currentLang] ||
                getPersonClassificationMetadata(activeModalPerson.id).epistemicNote.en}
            </div>

            {/* Branches represented */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block">
                {pageLabels.associatedBranches}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeModalPerson.branches.map(branchKey => {
                  const bObj = ALL_COMMUNITY_BRANCHES.find(b => b.key === branchKey);
                  return (
                    <span
                      key={branchKey}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#182030] text-[#fae29c] border border-[#c99738]/40"
                    >
                      {bObj?.label[currentLang] || branchKey}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Detailed Translated Biography */}
            <div className="space-y-2 bg-[#141a27] p-5 rounded-xl border border-stone-800">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#d4af37]" /> Archival Biography & Historical Chronicle
              </span>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                {activeModalPerson.biography[currentLang] || activeModalPerson.biography.en}
              </p>
            </div>

            {/* Major Contributions */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider block">
                {pageLabels.keyContributions}:
              </span>
              <div className="space-y-2">
                {activeModalPerson.majorContributions.map((contrib, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#101420] border border-stone-800/80 text-xs sm:text-sm text-stone-300 flex items-start gap-2.5"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#d4af37] mt-1.5 shrink-0" />
                    <span>{contrib[currentLang] || contrib.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Evidence Sources */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5">
                <Scroll className="w-4 h-4 text-[#d4af37]" /> {pageLabels.historicalEvidence}
              </span>
              <ul className="space-y-1.5 text-xs text-stone-400 bg-[#0a0d14] p-4 rounded-xl border border-stone-800">
                {activeModalPerson.evidenceSources.map((source, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#d4af37] font-bold">•</span>
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Bottom Controls */}
            <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`https://wa.me/919480112897?text=${encodeURIComponent(
                  `Namaste Dr G. Sathyanarayana Raju ji, regarding prominent person: ${
                    activeModalPerson.name[currentLang] || activeModalPerson.name.en
                  }`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20ba5a] text-[#052e16] transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>{pageLabels.consultPublisher}</span>
              </a>

              <button
                onClick={() => setActiveModalPerson(null)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold cursor-pointer"
              >
                {pageLabels.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
