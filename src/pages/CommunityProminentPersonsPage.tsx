import React, { useState, useMemo } from 'react';
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
  ProminentPerson
} from '../data/communityProminentPersonsData';
import { WhatsAppIcon } from '../components/PublisherCreditCard';

type CategoryFilter = 'all' | 'Royal Sovereignty' | 'Martial Guardians' | 'Civic & Builders' | 'Classical Realms';

interface CommunityProminentPersonsPageProps {
  onNavigate: (path: string) => void;
  initialBranch?: CommunityBranch | 'all';
}

export const CommunityProminentPersonsPage: React.FC<CommunityProminentPersonsPageProps> = ({
  onNavigate,
  initialBranch = 'all'
}) => {
  const { language, t } = useLanguage();
  const currentLang = (language as LanguageCode) || 'en';

  const [selectedBranch, setSelectedBranch] = useState<CommunityBranch | 'all'>(initialBranch);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalPerson, setActiveModalPerson] = useState<ProminentPerson | null>(null);
  const [copied, setCopied] = useState(false);

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
          'Documented historical monarchs, spiritual masters, civic hydraulic architects, and leaders of Suryavamsha Kshatriya, Suryavamshi Kshatriya, Suryavamsham Rajulu, Kshatriya Rajulu, OddeRajulu, VaddeRajulu, Od-Khandayaths, Oda-Chasa, Paikas, OddeRazulu, Odar, Wadar, Ottar, OddaNayakkar, Kalinga, Utkala, Trikalinga, Gajapathi RauthRai, and associated historical lineages.',
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
        emptyStateDesc: 'Try adjusting your branch filter or search keywords to view historical records.',
        clearFilters: 'Reset All Filters',
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
          'सूर्यवंश क्षत्रिय, सूर्यवंशी क्षत्रिय, सूर्यवंशम राजुलु, क्षत्रिय राजुलु, ओड्डेराजुलु, वड्डेराजुलु, ओड-खंडायत, ओडा-चासा, पाइका, ओड्डेराजुलू, ओडार, वाडार, ओट्टार, ओड्डा नायक्कर, कलिंग, उत्कल, त्रिकलिंग एवं गजपति राउताराय समाजों के ऐतिहासिक सम्राट, सेनापति व जननायक।',
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
        emptyStateDesc: 'कृपया शाखा फिल्टर या खोज शब्दों में परिवर्तन करें।',
        clearFilters: 'सभी फिल्टर हटाएं',
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
          'సూర్యవంశ క్షత్రియ, సూర్యవంశీ క్షత్రియ, సూర్యవంశం రాజులు, క్షత్రియ రాజులు, ఒడ్డేరాజులు, వడ్డేరాజులు, ఒడ్-ఖండాయత్, ఓడా-చాసా, పైకా యోధులు, ఒడ్డేరాజ్జులు, ఒడార్, వాడార్, ఒట్టార్, ఒడ్డా నాయక్కర్, కళింగ, ఉత్కళ, త్రికళింగ, గజపతి రౌత్‌రాయ్ మరియు అనుబంధ వంశాల చారిత్రక చక్రవర్తులు, మహాదండనాయకులు.',
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
        emptyStateDesc: 'దయచేసి మీ శోధన పదాలను లేదా శాఖ ఎంపికను మార్చండి.',
        clearFilters: 'అన్ని ఫిల్టర్‌లను రీసెట్ చేయండి',
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
          'ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯ, ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯ, ಸೂರ್ಯವಂಶಂ ರಾಜುಲು, ಕ್ಷತ್ರಿಯ ರಾಜುಲು, ಒಡ್ಡೇರಾಜುಲು, ವಡ್ಡೇರಾಜುಲು, ಒಡ್-ಖಂಡಾಯತ್, ಓಡಾ-ಚಾಸಾ, ಪೈಕ, ಒಡ್ಡೇರಾಜುಲು, ಒಡಾರ್, ವಾಡಾರ್, ಒಟ್ಟಾರ್, ಒಡ್ಡಾ ನಾಯಕರ್, ಕಳಿಂಗ, ಉತ್ಕಳ, ತ್ರಿಕಳಿಂಗ, ಗಜಪತಿ ರೌತರಾಯ ಸಮಾಜಗಳ ಐತಿಹಾಸಿಕ ದೊರೆಗಳು.',
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
        emptyStateDesc: 'ದಯವಿಟ್ಟು ಹುಡುಕಾಟದ ಪದಗಳನ್ನು ಬದಲಾಯಿಸಿ.',
        clearFilters: 'ಎಲ್ಲಾ ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
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
          'சூர்யவம்ச க்ஷத்திரிய, சூர்யவம்ஷி க்ஷத்திரிய, சூர்யவம்சம் ராஜுலு, க்ஷத்திரிய ராஜுலு, ஒட்டேராஜுலு, வட்டேராஜுலு, ஒட்-கண்டாயத், ஓடா-சாசா, பைகா, ஒட்டேராசுலு, ஒடார், வாடார், ஒட்டார், ஒட்டா நாயக்கர், கலிங்கம், உத்கலம், திரிகலிங்கம், கஜபதி ராவூத்ராய் மரபுகளின் வரலாற்றுத் தலைவர்கள்.',
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
        emptyStateDesc: 'தயவுசெய்து தேடல் சொற்களை மாற்றி முயற்சிக்கவும்.',
        clearFilters: 'வடிகட்டிகளை மீட்டமைக்க',
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
          'सूर्यवंश क्षत्रिय, सूर्यवंशी क्षत्रिय, सूर्यवंशम राजुलू, क्षत्रिय राजुलू, ओड्डेराजुलू, वड्डेराजुलू, ओड-खंडायत, ओडा-चासा, पाईक, ओडार, वाडार, ओट्टार, ओड्डा नायक, कलिंग, उत्कल, त्रिकलिंग व गजपती राऊतराय घराण्यांचे राजे व सेनापती.',
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
        emptyStateDesc: 'कृपया शोध शब्द किंवा शाखा फिल्टर तपासा.',
        clearFilters: 'फिल्टर रीसेट करा',
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
          'ସୂର୍ଯ୍ୟବଂଶ କ୍ଷତ୍ରିୟ, ସୂର୍ଯ୍ୟବଂଶୀ କ୍ଷତ୍ରିୟ, ସୂର୍ଯ୍ୟବଂଶମ୍ ରାଜୁଲୁ, କ୍ଷତ୍ରିୟ ରାଜୁଲୁ, ଓଡ୍ଡେରାଜୁଲୁ, ଭଡ୍ଡେରାଜୁଲୁ, ଓଡ଼-ଖଣ୍ଡାୟତ, ଓଡ଼ା-ଚାଷୀ, ପାଇକ ବୀର, ଓଡ଼ାର, ଭାଦାର, ଓଟ୍ଟାର, ଓଡ୍ଡା ନାୟକ୍କର, କଳିଙ୍ଗ, ଉତ୍କଳ, ତ୍ରିକଳିଙ୍ଗ ଓ ଗଜପତି ରାଉତରାୟ ସମାଜର ଐତିହାସିକ ନାୟକ ଓ ସମ୍ରାଟ।',
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
        emptyStateDesc: 'ଦୟାକରି ଖୋଜିବା ଶବ୍ଦ ବା ଶାଖା ପରିବର୍ତ୍ତନ କରନ୍ତୁ।',
        clearFilters: 'ସମସ୍ତ ଫିଲ୍ଟର୍ ରିସେଟ୍ କରନ୍ତୁ',
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
          'সূর্যবংশ ক্ষত্রিয়, সূর্যবংশী ক্ষত্রিয়, সূর্যবংশম রাজুলু, ক্ষত্রিয় রাজুলু, ওড্ডেরাজুলু, ভাড্ডেরাজুলু, ওড-খণ্ডায়ত, ওডা-চাষা, পাইক, ওডার, ওয়াদার, ওট্টার, ওড্ডা নায়ক্কর, কলিঙ্গ, উৎকল, ত্রিকলিঙ্গ ও গজপতি রাউতরায় সমাজের ঐতিহাসিক শাসক, সেনাপতি ও দিকপালগণ।',
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
        emptyStateDesc: 'অনুগ্রহ করে অনুসন্ধান শব্দ বা শাখা ফিল্টার পরিবর্তন করুন।',
        clearFilters: 'ফিল্টার রিসেট করুন',
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

  // Filter persons based on selected branch, category, and search query
  const filteredPersons = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return PROMINENT_PERSONS.filter(person => {
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

      // 3. Search query match across multiple languages and tags
      if (!q) return true;

      const nameMatch = Object.values(person.name).some(val => val.toLowerCase().includes(q));
      const titlesMatch = Object.values(person.titles).some(val => val.toLowerCase().includes(q));
      const eraMatch = Object.values(person.era).some(val => val.toLowerCase().includes(q));
      const regionMatch = Object.values(person.region).some(val => val.toLowerCase().includes(q));
      const summaryMatch = Object.values(person.summary).some(val => val.toLowerCase().includes(q));
      const branchMatch = person.branches.some(b => b.toLowerCase().includes(q));

      return nameMatch || titlesMatch || eraMatch || regionMatch || summaryMatch || branchMatch;
    });
  }, [selectedBranch, selectedCategory, searchQuery]);

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
            {(selectedBranch !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedBranch('all');
                  setSelectedCategory('all');
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
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#580014] text-[#fae29c] hover:bg-[#72001a] text-xs font-semibold cursor-pointer"
            >
              {pageLabels.clearFilters}
            </button>
          </div>
        )}

        {/* Cards Grid: 1-column on mobile, 2 on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredPersons.map(person => {
            const localizedName = person.name[currentLang] || person.name.en;
            const localizedTitles = person.titles[currentLang] || person.titles.en;
            const localizedEra = person.era[currentLang] || person.era.en;
            const localizedRegion = person.region[currentLang] || person.region.en;
            const localizedSummary = person.summary[currentLang] || person.summary.en;

            return (
              <div
                key={person.id}
                className="bg-[#0f1420] border border-stone-800/90 hover:border-[#c99738]/60 rounded-2xl p-5 sm:p-6 transition-all shadow-lg hover:shadow-2xl hover:shadow-[#580014]/20 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Badge & Era */}
                  <div className="flex items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#580014]/80 text-[#fae29c] border border-[#d4af37]/40">
                      <Crown className="w-3 h-3 text-[#d4af37]" />
                      <span>{person.badge}</span>
                    </span>

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
                      <h2 className="text-lg sm:text-xl font-bold font-royal-heading text-[#fae29c] leading-snug group-hover:text-[#fde68a] transition-colors">
                        {localizedName}
                      </h2>
                      <p className="text-xs text-stone-400 font-medium leading-relaxed">
                        {localizedTitles}
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-stone-400 pt-0.5">
                        <MapPin className="w-3 h-3 text-[#d4af37] shrink-0" />
                        <span className="truncate">{localizedRegion}</span>
                      </div>
                    </div>
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
                          onClick={() => setSelectedBranch(branchKey)}
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
                  <div className="bg-[#141a27] rounded-xl p-4 border border-stone-800/80">
                    <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider block mb-1">
                      Historical Summary ({currentLang.toUpperCase()} Translation)
                    </span>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                      {localizedSummary}
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
                      onClick={() => handleShare(person)}
                      className="p-2 rounded-lg bg-[#151c2a] hover:bg-[#20293d] text-stone-300 hover:text-white border border-stone-700 text-xs transition-colors cursor-pointer"
                      title={pageLabels.shareLink}
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    </button>

                    <a
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0e121c] border-2 border-[#c99738] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative text-stone-200">
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
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#580014] text-[#fae29c] border border-[#d4af37]/40 uppercase tracking-wider">
                  {activeModalPerson.badge}
                </span>
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
