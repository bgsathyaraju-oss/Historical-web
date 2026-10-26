import React, { useState, useMemo } from 'react';
import {
  Crown,
  Search,
  Shield,
  Users,
  MapPin,
  Sparkles,
  ArrowLeft,
  ScrollText,
  X,
  Languages,
  Hash,
} from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import {
  SOUTH_INDIAN_SURNAME_ENTRIES,
  ALPHABET_LETTERS,
  CommunitySurnameEntry,
} from '../data/communitySurnamesData';

interface CommunitySurnamesPageProps {
  onNavigate?: (path: string) => void;
}

const UI_TEXT: Record<
  string,
  {
    pageBadge: string;
    categoryLabel: string;
    subtitle: string;
    searchPlaceholder: string;
    allLetters: string;
    totalCountLabel: string;
    showingCountLabel: string;
    originalSpellingLabel: string;
    transliterationLabel: string;
    historicalNoteTitle: string;
    historicalNoteBody: string;
    backToHeritage: string;
    noResults: string;
    clearFilters: string;
    alphabetNavLabel: string;
    languageSwitchLabel: string;
  }
> = {
  en: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'Alphabetical archival directory of South-Indian surnames (Intiperlu / Mane Hesarugalu / Kulam Names) of the Suryavamsham VadiyaRaja (Odiyaraju) Kshatriya community. Every surname is preserved in its exact spelling and sequence.',
    searchPlaceholder: 'Search surname by spelling or script...',
    allLetters: 'All (A–Z)',
    totalCountLabel: 'Total Recorded Surnames',
    showingCountLabel: 'Displaying',
    originalSpellingLabel: 'Original Spelling',
    transliterationLabel: 'Script Transliteration',
    historicalNoteTitle: 'Archival & Orthographic Preservation Note',
    historicalNoteBody:
      'All surnames are displayed in their exact traditional spelling and sequence without alteration. When an Indian regional language is selected, phonetic script transliterations are shown alongside the preserved English spelling.',
    backToHeritage: 'Back to Community Heritage',
    noResults: 'No surnames matched your current search or letter filter.',
    clearFilters: 'Reset Search & Filter',
    alphabetNavLabel: 'Alphabetical Navigation (A–Z)',
    languageSwitchLabel: 'Script / Language Transliteration',
  },
  hi: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'सूर्यवंशम वडियाराजा (ओडियाराजु) क्षत्रिय समुदाय के दक्षिण-भारतीय उपनामों (Surnames) की वर्णक्रमानुसार निर्देशिका। प्रत्येक उपनाम की मूल वर्तनी और क्रम सुरक्षित रखा गया है।',
    searchPlaceholder: 'उपनाम खोजें (अंग्रेजी या देवनागरी लिपि)...',
    allLetters: 'सभी (A–Z)',
    totalCountLabel: 'कुल सूचीबद्ध उपनाम',
    showingCountLabel: 'प्रदर्शित',
    originalSpellingLabel: 'मूल वर्तनी (English)',
    transliterationLabel: 'हिन्दी लिप्यंतरण',
    historicalNoteTitle: 'वंशावली और वर्तनी संरक्षण टिप्पणी',
    historicalNoteBody:
      'प्रत्येक उपनाम को बिना किसी बदलाव के उसके मूल रूप और क्रम में रखा गया है। चयनित भाषा में केवल ध्वन्यात्मक लिप्यंतरण (Transliteration) प्रदर्शित किया जाता है।',
    backToHeritage: 'सामुदायिक विरासत पृष्ठ पर लौटें',
    noResults: 'आपकी खोज या अक्षर फ़िल्टर से कोई उपनाम मेल नहीं खाता।',
    clearFilters: 'खोज और फ़िल्टर रीसेट करें',
    alphabetNavLabel: 'वर्णमाला नेविगेशन (A–Z)',
    languageSwitchLabel: 'लिपि / भाषा चयन',
  },
  te: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'సూర్యవంశం వడియరాజ (ఒడియరాజు) క్షత్రియ సమాజం యొక్క దక్షిణ భారత ఇంటిపేర్ల (Surnames) అక్షరక్రమ జాబితా. ప్రతి ఇంటిపేరు దాని అసలు స్పెల్లింగ్ మరియు వరుస క్రమంలో భద్రపరచబడింది.',
    searchPlaceholder: 'ఇంటిపేరును వెతకండి (English లేదా తెలుగు)...',
    allLetters: 'అన్నీ (A–Z)',
    totalCountLabel: 'మొత్తం నమోదైన ఇంటిపేర్లు',
    showingCountLabel: 'చూపిస్తున్నవి',
    originalSpellingLabel: 'అసలు స్పెల్లింగ్ (English)',
    transliterationLabel: 'తెలుగు లిప్యంతరీకరణ',
    historicalNoteTitle: 'వంశావళి & అక్షర క్రమ పరిరక్షణ గమనిక',
    historicalNoteBody:
      'అన్ని ఇంటిపేర్లు ఎటువంటి మార్పు లేకుండా వాటి అసలు స్పెల్లింగ్ మరియు క్రమంలోనే ఉంచబడ్డాయి. ఎంచుకున్న భాషలో ఖచ్చితమైన లిప్యంతరీకరణ (Transliteration) మాత్రమే చూపబడుతుంది.',
    backToHeritage: 'కమ్యూనిటీ హెరిటేజ్ పేజీకి తిరిగి వెళ్ళండి',
    noResults: 'మీ శోధన లేదా అక్షర ఫిల్టర్‌కు సరిపోయే ఇంటిపేర్లు కనుగొనబడలేదు.',
    clearFilters: 'ఫిల్టర్ రీసెట్ చేయండి',
    alphabetNavLabel: 'అక్షరక్రమ నావిగేషన్ (A–Z)',
    languageSwitchLabel: 'లిపి / భాష ఎంపిక',
  },
  kn: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'ಸೂರ್ಯವಂಶಂ ವಡಿಯರಾಜ (ಒಡಿಯರಾಜು) ಕ್ಷತ್ರಿಯ ಸಮುದಾಯದ ದಕ್ಷಿಣ ಭಾರತೀಯ ಉಪನಾಮಗಳ (ಮನೆ ಹೆಸರುಗಳು / Surnames) ವರ್ಣಮಾಲೆಯ ಪಟ್ಟಿ. ಪ್ರತಿಯೊಂದು ಉಪನಾಮದ ಮೂಲ ಕಾಗುಣಿತ ಮತ್ತು ಕ್ರಮವನ್ನು ಹಾಗೆಯೇ ಉಳಿಸಲಾಗಿದೆ.',
    searchPlaceholder: 'ಉಪನಾಮವನ್ನು ಹುಡುಕಿ (English ಅಥವಾ ಕನ್ನಡ)...',
    allLetters: 'ಎಲ್ಲಾ (A–Z)',
    totalCountLabel: 'ಒಟ್ಟು ದಾಖಲಾದ ಉಪನಾಮಗಳು',
    showingCountLabel: 'ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತಿದೆ',
    originalSpellingLabel: 'ಮೂಲ ಕಾಗುಣಿತ (English)',
    transliterationLabel: 'ಕನ್ನಡ ಲಿಪ್ಯಂತರಣ',
    historicalNoteTitle: 'ವಂಶಾವಳಿ ಮತ್ತು ಕಾಗುಣಿತ ಸಂರಕ್ಷಣಾ ಟಿಪ್ಪಣಿ',
    historicalNoteBody:
      'ಎಲ್ಲಾ ಉಪನಾಮಗಳನ್ನು ಯಾವುದೇ ಬದಲಾವಣೆಯಿಲ್ಲದೆ ಅವುಗಳ ಮೂಲ ಕಾಗುಣಿತ ಮತ್ತು ಅನುಕ್ರಮದಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲಾಗಿದೆ. ಆಯ್ದ ಭಾಷೆಯಲ್ಲಿ ನಿಖರವಾದ ಲಿಪ್ಯಂತರಣವನ್ನು (Transliteration) ನೀಡಲಾಗಿದೆ.',
    backToHeritage: 'ಸಮುದಾಯ ಪರಂಪರೆ ಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
    noResults: 'ನಿಮ್ಮ ಹುಡುಕಾಟ ಅಥವಾ ಅಕ್ಷರ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಉಪನಾಮಗಳು ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ.',
    clearFilters: 'ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ',
    alphabetNavLabel: 'ವರ್ಣಮಾಲೆ ನ್ಯಾವಿಗೇಷನ್ (A–Z)',
    languageSwitchLabel: 'ಲಿಪಿ / ಭಾಷೆ ಆಯ್ಕೆ',
  },
  ta: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'சூர்யவம்சம் வடியராஜா (ஒடியராஜு) சத்திரிய சமூகத்தின் தென்னிந்திய குடும்பப் பெயர்களின் (Surnames) அகரவரிசைப் பட்டியல். ஒவ்வொரு பெயரின் அசல் எழுத்துக்கூட்டலும் வரிசையும் பாதுகாக்கப்பட்டுள்ளது.',
    searchPlaceholder: 'குடும்பப் பெயரைத் தேடுங்கள் (English அல்லது தமிழ்)...',
    allLetters: 'அனைத்தும் (A–Z)',
    totalCountLabel: 'மொத்த குடும்பப் பெயர்கள்',
    showingCountLabel: 'காட்டப்படுபவை',
    originalSpellingLabel: 'அசல் எழுத்துக்கூட்டல் (English)',
    transliterationLabel: 'தமிழ் ஒலிபெயர்ப்பு',
    historicalNoteTitle: 'வம்சாவளி மற்றும் எழுத்துக்கூட்டல் பாதுகாப்பு குறிப்பு',
    historicalNoteBody:
      'அனைத்து குடும்பப் பெயர்களும் எந்த மாற்றமும் இன்றி அவற்றின் அசல் வடிவத்திலும் வரிசையிலும் காட்டப்படுகின்றன. தேர்ந்தெடுக்கப்பட்ட மொழியில் துல்லியமான ஒலிபெயர்ப்பு (Transliteration) வழங்கப்படுகிறது.',
    backToHeritage: 'சமூக பாரம்பரியப் பக்கத்திற்குத் திரும்பு',
    noResults: 'உங்கள் தேடல் அல்லது எழுத்து வடிகட்டிக்குப் பொருந்தும் பெயர்கள் எதுவும் இல்லை.',
    clearFilters: 'வடிகட்டியை மீட்டமை',
    alphabetNavLabel: 'அகரவரிசை வழிசெலுத்தல் (A–Z)',
    languageSwitchLabel: 'எழுத்து / மொழித் தேர்வு',
  },
  mr: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'सूर्यवंशम वडियाराजा (ओडियाराजू) क्षत्रिय समाजातील दक्षिण-भारतीय आडनावांची (Surnames) वर्णानुक्रमे यादी. प्रत्येक आडनावाचे मूळ स्पेलिंग आणि क्रम जतन केला आहे.',
    searchPlaceholder: 'आडनाव शोधा (English किंवा मराठी)...',
    allLetters: 'सर्व (A–Z)',
    totalCountLabel: 'एकूण नोंदणीकृत आडनावे',
    showingCountLabel: 'दर्शवित आहे',
    originalSpellingLabel: 'मूळ स्पेलिंग (English)',
    transliterationLabel: 'मराठी लिप्यंतरण',
    historicalNoteTitle: 'वंशावळ आणि स्पेलिंग जतन नोंद',
    historicalNoteBody:
      'सर्व आडनावे कोणताही बदल न करता त्यांच्या मूळ स्पेलिंग आणि क्रमात दर्शविली आहेत. निवडलेल्या भाषेत अचूक ध्वन्यात्मक लिप्यंतरण (Transliteration) दिले आहे.',
    backToHeritage: 'समुदाय वारसा पृष्ठावर परत जा',
    noResults: 'तुमच्या शोध किंवा अक्षर फिल्टरशी कोणतेही आडनाव जुळले नाही.',
    clearFilters: 'फिल्टर रीसेट करा',
    alphabetNavLabel: 'वर्णमाला नेव्हिगेशन (A–Z)',
    languageSwitchLabel: 'लिपी / भाषा निवड',
  },
  or: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'ସୂର୍ଯ୍ୟବଂଶମ୍ ବଡ଼ିୟରାଜା (ଓଡ଼ିଆରାଜୁ) କ୍ଷତ୍ରିୟ ସମ୍ପ୍ରଦାୟର ଦକ୍ଷିଣ-ଭାରତୀୟ ସାଙ୍ଗିଆଗୁଡ଼ିକର (Surnames) ବର୍ଣ୍ଣାନୁକ୍ରମିକ ତାଲିକା। ପ୍ରତ୍ୟେକ ସାଙ୍ଗିଆର ମୂଳ ବନାନ ଏବଂ କ୍ରମ ସଂରକ୍ଷିତ ହୋଇଛି।',
    searchPlaceholder: 'ସାଙ୍ଗିଆ ଖୋଜନ୍ତୁ (English କିମ୍ବା ଓଡ଼ିଆ)...',
    allLetters: 'ସମସ୍ତ (A–Z)',
    totalCountLabel: 'ମୋଟ ଲିପିବଦ୍ଧ ସାଙ୍ଗିଆ',
    showingCountLabel: 'ପ୍ରଦର୍ଶିତ',
    originalSpellingLabel: 'ମୂଳ ବନାନ (English)',
    transliterationLabel: 'ଓଡ଼ିଆ ଲିପ୍ୟନ୍ତର',
    historicalNoteTitle: 'ବଂଶାବଳୀ ଏବଂ ବନାନ ସଂରକ୍ଷଣ ଟିପ୍ପଣୀ',
    historicalNoteBody:
      'ସମସ୍ତ ସାଙ୍ଗିଆ କୌଣସି ପରିବର୍ତ୍ତନ ବିନା ସେମାନଙ୍କର ମୂଳ ବନାନ ଏବଂ କ୍ରମରେ ପ୍ରଦର୍ଶିତ ହୋଇଛି। ମନୋନୀତ ଭାଷାରେ ସଠିକ୍ ଲିପ୍ୟନ୍ତର (Transliteration) ଦିଆଯାଇଛି।',
    backToHeritage: 'ସମ୍ପ୍ରଦାୟ ଐତିହ୍ୟ ପୃଷ୍ଠାକୁ ଫେରନ୍ତୁ',
    noResults: 'ଆପଣଙ୍କ ସନ୍ଧାନ କିମ୍ବା ଅକ୍ଷର ଫିଲ୍ଟର ସହିତ କୌଣସି ସାଙ୍ଗିଆ ମେଳ ଖାଉ ନାହିଁ।',
    clearFilters: 'ଫିଲ୍ଟର ରିସେଟ୍ କରନ୍ତୁ',
    alphabetNavLabel: 'ବର୍ଣ୍ଣমাଳା ନେଭିଗେସନ୍ (A–Z)',
    languageSwitchLabel: 'ଲିପି / ଭାଷା ଚୟନ',
  },
  bn: {
    pageBadge: 'Community-Surnames',
    categoryLabel: 'Category: South-Indian',
    subtitle:
      'সূর্যবংশম ভাদিয়ারাজা (ওডিয়ারাজু) ক্ষত্রিয় সম্প্রদায়ের দক্ষিণ-ভারতীয় পদবিগুলোর (Surnames) বর্ণানুক্রমিক তালিকা। প্রতিটি পদবির মূল বানান এবং ক্রম অক্ষুণ্ণ রাখা হয়েছে।',
    searchPlaceholder: 'পদবি অনুসন্ধান করুন (English বা বাংলা)...',
    allLetters: 'সকল (A–Z)',
    totalCountLabel: 'মোট নথিভুক্ত পদবি',
    showingCountLabel: 'প্রদর্শিত হচ্ছে',
    originalSpellingLabel: 'মূল বানান (English)',
    transliterationLabel: 'বাংলা প্রতিবর্ণীকরণ',
    historicalNoteTitle: 'বংশাবলী ও বানান সংরক্ষণ নোট',
    historicalNoteBody:
      'সকল পদবি কোনো পরিবর্তন ছাড়াই তাদের মূল বানান এবং ক্রমানুসারে প্রদর্শিত হয়েছে। নির্বাচিত ভাষায় সঠিক ধ্বনিগত প্রতিবর্ণীকরণ (Transliteration) দেখানো হয়েছে।',
    backToHeritage: 'কমিউনিটি হেরিটেজ পৃষ্ঠায় ফিরে যান',
    noResults: 'আপনার অনুসন্ধান বা অক্ষর ফিল্টারের সাথে কোনো পদবি মেলেনি।',
    clearFilters: 'ফিল্টার রিসেট করুন',
    alphabetNavLabel: 'বর্ণানুক্রমিক নেভিগেশন (A–Z)',
    languageSwitchLabel: 'লিপি / ভাষা নির্বাচন',
  },
};

export function CommunitySurnamesPage({ onNavigate }: CommunitySurnamesPageProps) {
  const { language, setLanguage } = useLanguage();
  const ui = UI_TEXT[language] || UI_TEXT.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  // Count how many surnames exist per letter (A-Z) in the complete list
  const letterCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const letter of ALPHABET_LETTERS) {
      counts[letter] = 0;
    }
    for (const entry of SOUTH_INDIAN_SURNAME_ENTRIES) {
      counts[entry.letter] = (counts[entry.letter] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter entries preserving exact original order and intentional duplicates
  const filteredEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SOUTH_INDIAN_SURNAME_ENTRIES.filter((entry) => {
      const matchesLetter = selectedLetter === 'ALL' || entry.letter === selectedLetter;
      if (!matchesLetter) return false;
      if (!q) return true;

      const localizedScript = entry.transliterations[language] || entry.surname;
      return (
        entry.surname.toLowerCase().includes(q) ||
        localizedScript.toLowerCase().includes(q) ||
        Object.values(entry.transliterations).some((val) =>
          val.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery, selectedLetter, language]);

  // Group filtered entries by starting letter while preserving exact array order within each letter
  const groupedByLetter = useMemo(() => {
    const groups: { letter: string; items: CommunitySurnameEntry[] }[] = [];
    const map = new Map<string, CommunitySurnameEntry[]>();

    for (const entry of filteredEntries) {
      const existing = map.get(entry.letter);
      if (existing) {
        existing.push(entry);
      } else {
        const arr = [entry];
        map.set(entry.letter, arr);
        groups.push({ letter: entry.letter, items: arr });
      }
    }
    return groups;
  }, [filteredEntries]);

  return (
    <div className="min-h-screen bg-[#0b0d14] text-[#f5f3ed] pb-24">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-[#c99738]/30 bg-gradient-to-b from-[#1a1018] via-[#111522] to-[#0b0d14] pt-10 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Top Navigation & Category Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#221016] text-[#e8c872] border border-[#d4af37]/40">
                <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                {ui.pageBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#121826] text-[#fae29c] border border-[#c99738]/40">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                {ui.categoryLabel}
              </span>
            </div>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate('/community-heritage')}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#e8c872] hover:text-[#fae29c] bg-stone-900/80 hover:bg-stone-800/80 border border-[#c99738]/30 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{ui.backToHeritage}</span>
              </button>
            )}
          </div>

          {/* Required Page Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fae29c] via-[#e8c872] to-[#c99738] font-royal-heading leading-tight mb-4">
            Suryavamsham VadiyaRaja Kshatriya&apos;s Surnames
          </h1>

          <p className="text-sm sm:text-base text-stone-300 max-w-3xl leading-relaxed">
            {ui.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {/* Control Panel: Search, 8-Language Transliteration Selector & Alphabetical Navigation */}
        <div className="bg-[#121622] border border-[#c99738]/30 rounded-xl p-4 sm:p-5 shadow-xl space-y-5">
          {/* Top Row: Search Input & Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7 relative">
              <Search className="w-4 h-4 text-[#d4af37] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={ui.searchPlaceholder}
                aria-label={ui.searchPlaceholder}
                className="w-full pl-10 pr-10 py-2.5 bg-[#0b0d14] border border-stone-700/80 focus:border-[#d4af37] rounded-lg text-sm text-[#f5f3ed] placeholder-stone-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-wrap items-center justify-between lg:justify-end gap-3 text-xs text-stone-300">
              <div className="flex items-center gap-2 bg-[#0b0d14] px-3 py-2 rounded-lg border border-stone-800">
                <Users className="w-4 h-4 text-[#d4af37]" />
                <span>
                  {ui.showingCountLabel}:{' '}
                  <strong className="text-[#fae29c]">{filteredEntries.length}</strong> /{' '}
                  <span>{SOUTH_INDIAN_SURNAME_ENTRIES.length}</span>
                </span>
              </div>
              <span className="px-3 py-2 rounded-lg bg-[#221016] text-[#e8c872] border border-[#c99738]/40 font-semibold">
                South-Indian
              </span>
            </div>
          </div>

          {/* 8-Language Script Selector */}
          <div className="pt-3 border-t border-stone-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#e8c872] mb-2.5">
              <Languages className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{ui.languageSwitchLabel}:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUPPORTED_LANGUAGES.map((langOpt) => {
                const active = language === langOpt.code;
                return (
                  <button
                    key={langOpt.code}
                    type="button"
                    onClick={() => setLanguage(langOpt.code)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      active
                        ? 'bg-[#580014] text-[#fae29c] border-[#d4af37] shadow-sm font-bold'
                        : 'bg-[#0b0d14] text-stone-300 border-stone-800 hover:border-[#c99738]/50 hover:text-[#fae29c]'
                    }`}
                  >
                    <span>{langOpt.nativeName}</span>
                    <span className="text-[10px] text-stone-400 ml-1">({langOpt.label})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Alphabetical A-Z Navigation Bar */}
          <div className="pt-3 border-t border-stone-800/80">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-semibold text-[#e8c872]">
                {ui.alphabetNavLabel}
              </span>
              {(selectedLetter !== 'ALL' || searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedLetter('ALL');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#d4af37] hover:text-[#fae29c] underline cursor-pointer"
                >
                  {ui.clearFilters}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedLetter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                  selectedLetter === 'ALL'
                    ? 'bg-[#d4af37] text-[#1a080c] border-[#fae29c] shadow-sm'
                    : 'bg-[#0b0d14] text-stone-300 border-stone-800 hover:border-[#c99738]/50'
                }`}
              >
                {ui.allLetters}
              </button>

              {ALPHABET_LETTERS.map((letter) => {
                const count = letterCounts[letter] || 0;
                const isSelected = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    type="button"
                    onClick={() => setSelectedLetter(isSelected ? 'ALL' : letter)}
                    className={`min-w-[2.25rem] px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-[#d4af37] text-[#1a080c] border-[#fae29c] shadow-sm'
                        : count > 0
                        ? 'bg-[#0b0d14] text-[#fae29c] border-stone-700 hover:border-[#d4af37]'
                        : 'bg-[#0b0d14]/50 text-stone-600 border-stone-800/60 hover:border-stone-700'
                    }`}
                    title={`${letter} (${count})`}
                  >
                    <span>{letter}</span>
                    {count > 0 && (
                      <span
                        className={`text-[10px] px-1 rounded ${
                          isSelected
                            ? 'bg-[#1a080c]/20 text-[#1a080c]'
                            : 'bg-stone-800 text-[#e8c872]'
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Surnames Directory Content */}
        {groupedByLetter.length === 0 ? (
          <div className="bg-[#121622] border border-stone-800 rounded-xl p-10 text-center space-y-3">
            <p className="text-sm text-stone-300">{ui.noResults}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedLetter('ALL');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#580014] text-[#fae29c] border border-[#d4af37]/50 hover:bg-[#78001b] cursor-pointer"
            >
              {ui.clearFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedByLetter.map((group) => (
              <section
                key={group.letter}
                id={`letter-${group.letter}`}
                className="space-y-3"
              >
                {/* Letter Section Header */}
                <div className="flex items-center gap-3 border-b border-[#c99738]/30 pb-2">
                  <div className="w-9 h-9 rounded-lg bg-[#221016] border border-[#d4af37]/50 flex items-center justify-center text-base font-bold text-[#fae29c] font-royal-heading shadow">
                    {group.letter}
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[#fae29c] font-royal-heading">
                      {group.letter} — South-Indian Surnames
                    </h2>
                    <p className="text-xs text-stone-400">
                      {group.items.length}{' '}
                      {group.items.length === 1 ? 'surname' : 'surnames'}
                    </p>
                  </div>
                </div>

                {/* Responsive Surname Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {group.items.map((item) => {
                    const scriptText = item.transliterations[language] || item.surname;
                    const showRegionalScript =
                      language !== 'en' && scriptText !== item.surname;

                    return (
                      <article
                        key={item.id}
                        className="bg-[#121622] border border-[#c99738]/30 hover:border-[#d4af37]/70 rounded-xl p-4 transition-all shadow-md flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-mono text-stone-400 bg-[#0b0d14] px-2 py-0.5 rounded border border-stone-800">
                                <Hash className="w-2.5 h-2.5 text-[#d4af37]" />
                                {String(item.orderIndex).padStart(3, '0')}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#221016] text-[#e8c872] border border-[#d4af37]/30">
                                {item.category}
                              </span>
                            </div>

                            {/* Primary Display: Preserved Exact English Reference Spelling */}
                            <h3 className="text-base sm:text-lg font-bold text-[#fae29c] font-royal-heading break-words">
                              {item.surname}
                            </h3>

                            {/* Regional Script Display when a non-English language is selected */}
                            {showRegionalScript && (
                              <p
                                lang={language}
                                className="mt-1.5 pt-1.5 border-t border-stone-800/80 text-base sm:text-lg font-bold text-[#e8c872] break-words leading-snug"
                              >
                                {scriptText}
                              </p>
                            )}
                          </div>

                          <Shield className="w-4 h-4 text-[#d4af37]/80 shrink-0 mt-1" />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Archival Context Note */}
        <div className="bg-gradient-to-r from-[#1a121b] via-[#121622] to-[#121622] border border-[#c99738]/40 rounded-xl p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <ScrollText className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#fae29c] mb-1.5 flex items-center gap-2">
                <span>{ui.historicalNoteTitle}</span>
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                {ui.historicalNoteBody}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
