import { LanguageCode } from '../types';

export type CommunityBranch =
  | 'Od'
  | 'Oad'
  | 'Oad-Rajputh'
  | 'Od-Kshatriya'
  | 'Odiyaraju'
  | 'Vadiyarajulu'
  | 'Odde'
  | 'vadde'
  | 'Vaddera'
  | 'Oddar'
  | 'Vaddar'
  | 'Waddar'
  | 'Gajapathis'
  | 'Odra'
  // Newly Requested Branches & Lineages:
  | 'OddeRajulu'
  | 'VaddeRajulu'
  | 'Od-Khandayaths'
  | 'Oda-Chasa'
  | 'paikas'
  | 'OddeRazulu'
  | 'Odar'
  | 'Wadar'
  | 'Ottar'
  | 'OddaNayakkar'
  | 'Kalinga'
  | 'Utkala'
  | 'Trikalinga'
  | 'Gajapathi RauthRai'
  | 'Suryavamsha Kshatriya'
  | 'Suryavamshi Kshatriya'
  | 'Suryavamsham Rajulu'
  | 'Kshatriya Rajulu';

export interface MultilingualText {
  en: string;
  hi: string;
  te: string;
  kn: string;
  ta: string;
  mr: string;
  or: string;
  bn: string;
}

export interface ProminentPerson {
  id: string;
  name: MultilingualText;
  titles: MultilingualText;
  branches: CommunityBranch[];
  era: MultilingualText;
  region: MultilingualText;
  badge: string;
  summary: MultilingualText;
  biography: MultilingualText;
  majorContributions: MultilingualText[];
  evidenceSources: string[];
  imageUrl: string;
}

export const ALL_COMMUNITY_BRANCHES: { key: CommunityBranch; category: 'Royal Sovereignty' | 'Martial Guardians' | 'Civic & Builders' | 'Classical Realms'; label: MultilingualText }[] = [
  // Royal & Sovereign Lineages
  {
    key: 'Suryavamsha Kshatriya',
    category: 'Royal Sovereignty',
    label: {
      en: 'Suryavamsha Kshatriya',
      hi: 'सूर्यवंश क्षत्रिय (Suryavamsha Kshatriya)',
      te: 'సూర్యవంశ క్షత్రియ (Suryavamsha Kshatriya)',
      kn: 'ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯ (Suryavamsha Kshatriya)',
      ta: 'சூர்யவம்ச க்ஷத்திரிய (Suryavamsha Kshatriya)',
      mr: 'सूर्यवंश क्षत्रिय (Suryavamsha Kshatriya)',
      or: 'ସୂର୍ଯ୍ୟବଂଶ କ୍ଷତ୍ରିୟ (Suryavamsha Kshatriya)',
      bn: 'সূর্যবংশ ক্ষত্রিয় (Suryavamsha Kshatriya)'
    }
  },
  {
    key: 'Suryavamshi Kshatriya',
    category: 'Royal Sovereignty',
    label: {
      en: 'Suryavamshi Kshatriya',
      hi: 'सूर्यवंशी क्षत्रिय (Suryavamshi Kshatriya)',
      te: 'సూర్యవంశీ క్షత్రియ (Suryavamshi Kshatriya)',
      kn: 'ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯ (Suryavamshi Kshatriya)',
      ta: 'சூர்யவம்ஷி க்ஷத்திரிய (Suryavamshi Kshatriya)',
      mr: 'सूर्यवंशी क्षत्रिय (Suryavamshi Kshatriya)',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ କ୍ଷତ୍ରିୟ (Suryavamshi Kshatriya)',
      bn: 'সূর্যবংশী ক্ষত্রিয় (Suryavamshi Kshatriya)'
    }
  },
  {
    key: 'Suryavamsham Rajulu',
    category: 'Royal Sovereignty',
    label: {
      en: 'Suryavamsham Rajulu',
      hi: 'सूर्यवंशम राजुलु (Suryavamsham Rajulu)',
      te: 'సూర్యవంశం రాజులు (Suryavamsham Rajulu)',
      kn: 'ಸೂರ್ಯವಂಶಂ ರಾಜುಲು (Suryavamsham Rajulu)',
      ta: 'சூர்யவம்சம் ராஜுலு (Suryavamsham Rajulu)',
      mr: 'सूर्यवंशम राजुलू (Suryavamsham Rajulu)',
      or: 'ସୂର୍ଯ୍ୟବଂଶମ୍ ରାଜୁଲୁ (Suryavamsham Rajulu)',
      bn: 'সূর্যবংশম রাজুলু (Suryavamsham Rajulu)'
    }
  },
  {
    key: 'Kshatriya Rajulu',
    category: 'Royal Sovereignty',
    label: {
      en: 'Kshatriya Rajulu',
      hi: 'क्षत्रिय राजुलु (Kshatriya Rajulu)',
      te: 'క్షత్రియ రాజులు (Kshatriya Rajulu)',
      kn: 'ಕ್ಷತ್ರಿಯ ರಾಜುಲು (Kshatriya Rajulu)',
      ta: 'க்ஷத்திரிய ராஜுலு (Kshatriya Rajulu)',
      mr: 'क्षत्रिय राजुलू (Kshatriya Rajulu)',
      or: 'କ୍ଷତ୍ରିୟ ରାଜୁଲୁ (Kshatriya Rajulu)',
      bn: 'ক্ষত্রিয় রাজুলু (Kshatriya Rajulu)'
    }
  },
  {
    key: 'OddeRajulu',
    category: 'Royal Sovereignty',
    label: {
      en: 'OddeRajulu',
      hi: 'ओड्डेराजुलु (OddeRajulu)',
      te: 'ఒడ్డేరాజులు (OddeRajulu)',
      kn: 'ಒಡ್ಡೇರಾಜುಲು (OddeRajulu)',
      ta: 'ஒட்டேராஜுலு (OddeRajulu)',
      mr: 'ओड्डेराजुलू (OddeRajulu)',
      or: 'ଓଡ୍ଡେରାଜୁଲୁ (OddeRajulu)',
      bn: 'ওড্ডেরাজুলু (OddeRajulu)'
    }
  },
  {
    key: 'VaddeRajulu',
    category: 'Royal Sovereignty',
    label: {
      en: 'VaddeRajulu',
      hi: 'वड्डेराजुलु (VaddeRajulu)',
      te: 'వడ్డేరాజులు (VaddeRajulu)',
      kn: 'ವಡ್ಡೇರಾಜುಲು (VaddeRajulu)',
      ta: 'வட்டேராஜுலு (VaddeRajulu)',
      mr: 'वड्डेराजुलू (VaddeRajulu)',
      or: 'ଭଡ୍ଡେରାଜୁଲୁ (VaddeRajulu)',
      bn: 'ভাড্ডেরাজুলু (VaddeRajulu)'
    }
  },
  {
    key: 'OddeRazulu',
    category: 'Royal Sovereignty',
    label: {
      en: 'OddeRazulu',
      hi: 'ओड्डेराजुलू (OddeRazulu)',
      te: 'ఒడ్డేరాజ్జులు / ఒడ్డేరాజులు (OddeRazulu)',
      kn: 'ಒಡ್ಡೇರಾಜುಲು (OddeRazulu)',
      ta: 'ஒட்டேராசுலு (OddeRazulu)',
      mr: 'ओड्डेराजुलू (OddeRazulu)',
      or: 'ଓଡ୍ଡେରାଜୁଲୁ (OddeRazulu)',
      bn: 'ওড্ডেরাজুলু (OddeRazulu)'
    }
  },
  {
    key: 'Gajapathi RauthRai',
    category: 'Royal Sovereignty',
    label: {
      en: 'Gajapathi RauthRai',
      hi: 'गजपति राउताराय (Gajapathi RauthRai)',
      te: 'గజపతి రౌత్‌రాయ్ (Gajapathi RauthRai)',
      kn: 'ಗಜಪತಿ ರೌತರಾಯ (Gajapathi RauthRai)',
      ta: 'கஜபதி ராவூத்ராய் (Gajapathi RauthRai)',
      mr: 'गजपती राऊतराय (Gajapathi RauthRai)',
      or: 'ଗଜପତି ରାଉତରାୟ (Gajapathi RauthRai)',
      bn: 'গজপতি রাউতরায় (Gajapathi RauthRai)'
    }
  },
  {
    key: 'Odiyaraju',
    category: 'Royal Sovereignty',
    label: {
      en: 'Odiyaraju',
      hi: 'ओडियाराजू (Odiyaraju)',
      te: 'ఒడియారాజు (Odiyaraju)',
      kn: 'ಒಡಿಯಾರಾಜು (Odiyaraju)',
      ta: 'ஒடியாராஜு (Odiyaraju)',
      mr: 'ओडियाराजू (Odiyaraju)',
      or: 'ଓଡ଼ିଆରାଜୁ (Odiyaraju)',
      bn: 'ওডিয়ারাজু (Odiyaraju)'
    }
  },
  {
    key: 'Vadiyarajulu',
    category: 'Royal Sovereignty',
    label: {
      en: 'Vadiyarajulu',
      hi: 'वडियाराजुलु (Vadiyarajulu)',
      te: 'వడియారాజులు (Vadiyarajulu)',
      kn: 'ವಡಿಯಾರಾಜುಲು (Vadiyarajulu)',
      ta: 'வடியாராஜுலு (Vadiyarajulu)',
      mr: 'वडियाराजुलू (Vadiyarajulu)',
      or: 'ଭାଡିଆରାଜୁଲୁ (Vadiyarajulu)',
      bn: 'ভাডিয়ারাজুলু (Vadiyarajulu)'
    }
  },

  // Martial Guardians & Historical Defenders
  {
    key: 'paikas',
    category: 'Martial Guardians',
    label: {
      en: 'Paikas (Martial Regiments)',
      hi: 'पाइका योद्धा (Paikas)',
      te: 'పైకా యోధులు (Paikas)',
      kn: 'ಪೈಕ ಯೋಧರು (Paikas)',
      ta: 'பைகா வீரர்கள் (Paikas)',
      mr: 'पाईक सैनिक (Paikas)',
      or: 'ପାଇକ ବୀର (Paikas)',
      bn: 'পাইক যোদ্ধা (Paikas)'
    }
  },
  {
    key: 'Od-Khandayaths',
    category: 'Martial Guardians',
    label: {
      en: 'Od-Khandayaths',
      hi: 'ओड-खंडायत (Od-Khandayaths)',
      te: 'ఒడ్-ఖండాయత్ (Od-Khandayaths)',
      kn: 'ಒಡ್-ಖಂಡಾಯತ್ (Od-Khandayaths)',
      ta: 'ஒட்-கண்டாயத் (Od-Khandayaths)',
      mr: 'ओड-खंडायत (Od-Khandayaths)',
      or: 'ଓଡ଼-ଖଣ୍ଡାୟତ (Od-Khandayaths)',
      bn: 'ওড-খণ্ডায়ত (Od-Khandayaths)'
    }
  },
  {
    key: 'OddaNayakkar',
    category: 'Martial Guardians',
    label: {
      en: 'OddaNayakkar',
      hi: 'ओड्डा नायक्कर (OddaNayakkar)',
      te: 'ఒడ్డా నాయక్కర్ (OddaNayakkar)',
      kn: 'ಒಡ್ಡಾ ನಾಯಕರ್ (OddaNayakkar)',
      ta: 'ஒட்டா நாயக்கர் (OddaNayakkar)',
      mr: 'ओड्डा नायक (OddaNayakkar)',
      or: 'ଓଡ୍ଡା ନାୟକ୍କର (OddaNayakkar)',
      bn: 'ওড্ডা নায়ক্কর (OddaNayakkar)'
    }
  },
  {
    key: 'Od-Kshatriya',
    category: 'Martial Guardians',
    label: {
      en: 'Od-Kshatriya',
      hi: 'ओड-क्षत्रिय (Od-Kshatriya)',
      te: 'ఒడ్-క్షత్రియ (Od-Kshatriya)',
      kn: 'ಒಡ್-ಕ್ಷತ್ರಿಯ (Od-Kshatriya)',
      ta: 'ஒட்-க்ஷத்திரிய (Od-Kshatriya)',
      mr: 'ओड-क्षत्रिय (Od-Kshatriya)',
      or: 'ଓଡ୍-କ୍ଷତ୍ରିୟ (Od-Kshatriya)',
      bn: 'ওড-ক্ষত্রিয় (Od-Kshatriya)'
    }
  },

  // Classical Realms & Dynastic Empires
  {
    key: 'Gajapathis',
    category: 'Classical Realms',
    label: {
      en: 'Gajapathis',
      hi: 'गजपति राजवंश (Gajapathis)',
      te: 'గజపతులు (Gajapathis)',
      kn: 'ಗಜಪತಿಗಳು (Gajapathis)',
      ta: 'கஜபதிகள் (Gajapathis)',
      mr: 'गजपती घराणे (Gajapathis)',
      or: 'ଗଜପତି ସାମ୍ରାଜ୍ୟ (Gajapathis)',
      bn: 'গজপতি সাম্রাজ্য (Gajapathis)'
    }
  },
  {
    key: 'Odra',
    category: 'Classical Realms',
    label: {
      en: 'Odra',
      hi: 'ओड्र देश (Odra)',
      te: 'ఓడ్ర దేశం (Odra)',
      kn: 'ಓಡ್ರ ದೇಶ (Odra)',
      ta: 'ஓட்ர தேசம் (Odra)',
      mr: 'ओड्र देश (Odra)',
      or: 'ଓଡ଼୍ର ଦେଶ (Odra)',
      bn: 'ওড্র দেশ (Odra)'
    }
  },
  {
    key: 'Kalinga',
    category: 'Classical Realms',
    label: {
      en: 'Kalinga',
      hi: 'कलिंग साम्राज्य (Kalinga)',
      te: 'కళింగ సామ్రాజ్యం (Kalinga)',
      kn: 'ಕಳಿಂಗ ಸಾಮ್ರಾಜ್ಯ (Kalinga)',
      ta: 'கலிங்க சாம்ராஜ்யம் (Kalinga)',
      mr: 'कलिंग साम्राज्य (Kalinga)',
      or: 'କଳିଙ୍ଗ ସାମ୍ରାଜ୍ୟ (Kalinga)',
      bn: 'কলিঙ্গ সাম্রাজ্য (Kalinga)'
    }
  },
  {
    key: 'Utkala',
    category: 'Classical Realms',
    label: {
      en: 'Utkala',
      hi: 'उत्कल देश (Utkala)',
      te: 'ఉత్కళ దేశం (Utkala)',
      kn: 'ಉತ್ಕಳ ದೇಶ (Utkala)',
      ta: 'உத்கல தேசம் (Utkala)',
      mr: 'उत्कल देश (Utkala)',
      or: 'ଉତ୍କଳ ଦେଶ (Utkala)',
      bn: 'উৎকল দেশ (Utkala)'
    }
  },
  {
    key: 'Trikalinga',
    category: 'Classical Realms',
    label: {
      en: 'Trikalinga',
      hi: 'त्रिकलिंग अधिराज्य (Trikalinga)',
      te: 'త్రికళింగ అధిరాజ్యం (Trikalinga)',
      kn: 'ತ್ರಿಕಳಿಂಗ ಸಾಮ್ರಾಜ್ಯ (Trikalinga)',
      ta: 'திரிகலிங்கம் (Trikalinga)',
      mr: 'त्रिकलिंग साम्राज्य (Trikalinga)',
      or: 'ତ୍ରିକଳିଙ୍ଗ ସାମ୍ରାଜ୍ୟ (Trikalinga)',
      bn: 'ত্রিকলিঙ্গ সাম্রাজ্য (Trikalinga)'
    }
  },

  // Civic, Agrarian, Engineering & Hydraulic Masters
  {
    key: 'Oda-Chasa',
    category: 'Civic & Builders',
    label: {
      en: 'Oda-Chasa',
      hi: 'ओडा-चासा (Oda-Chasa)',
      te: 'ఓడా-చాసా (Oda-Chasa)',
      kn: 'ಓಡಾ-ಚಾಸಾ (Oda-Chasa)',
      ta: 'ஓடா-சாசா (Oda-Chasa)',
      mr: 'ओडा-चासा (Oda-Chasa)',
      or: 'ଓଡ଼ା-ଚାଷୀ (Oda-Chasa)',
      bn: 'ওডা-চাষা (Oda-Chasa)'
    }
  },
  {
    key: 'Od',
    category: 'Civic & Builders',
    label: {
      en: 'Od',
      hi: 'ओड (Od)',
      te: 'ఒడ్ (Od)',
      kn: 'ಒಡ್ (Od)',
      ta: 'ஒட் (Od)',
      mr: 'ओड (Od)',
      or: 'ଓଡ୍ (Od)',
      bn: 'ওড (Od)'
    }
  },
  {
    key: 'Oad',
    category: 'Civic & Builders',
    label: {
      en: 'Oad',
      hi: 'ओआड (Oad)',
      te: 'ఓడ్ / ఓఆడ్ (Oad)',
      kn: 'ಓಡ್ / ಓಆಡ್ (Oad)',
      ta: 'ஓட் (Oad)',
      mr: 'ओआड (Oad)',
      or: 'ଓଆଡ୍ (Oad)',
      bn: 'ওআড (Oad)'
    }
  },
  {
    key: 'Oad-Rajputh',
    category: 'Civic & Builders',
    label: {
      en: 'Oad-Rajputh',
      hi: 'ओआड-राजपूत (Oad-Rajputh)',
      te: 'ఓడ్-రాజపుత్ (Oad-Rajputh)',
      kn: 'ಓಡ್-ರಾಜಪೂತ್ (Oad-Rajputh)',
      ta: 'ஓட்-ராஜபுத் (Oad-Rajputh)',
      mr: 'ओआड-राजपूत (Oad-Rajputh)',
      or: 'ଓଆଡ୍-ରାଜପୁତ (Oad-Rajputh)',
      bn: 'ওআড-রাজপুত (Oad-Rajputh)'
    }
  },
  {
    key: 'Odde',
    category: 'Civic & Builders',
    label: {
      en: 'Odde',
      hi: 'ओड्डे (Odde)',
      te: 'ఒడ్డే (Odde)',
      kn: 'ಒಡ್ಡೆ (Odde)',
      ta: 'ஒட்டே (Odde)',
      mr: 'ओड्डे (Odde)',
      or: 'ଓଡ୍ଡେ (Odde)',
      bn: 'ওড্ডে (Odde)'
    }
  },
  {
    key: 'vadde',
    category: 'Civic & Builders',
    label: {
      en: 'Vadde',
      hi: 'वड्डे (Vadde)',
      te: 'వడ్డే (Vadde)',
      kn: 'ವಡ್ಡೆ (Vadde)',
      ta: 'வட்டே (Vadde)',
      mr: 'वड्डे (Vadde)',
      or: 'ଭଡ୍ଡେ (Vadde)',
      bn: 'ভাড্ডে (Vadde)'
    }
  },
  {
    key: 'Vaddera',
    category: 'Civic & Builders',
    label: {
      en: 'Vaddera',
      hi: 'वद्देरा (Vaddera)',
      te: 'వడ్డెర (Vaddera)',
      kn: 'ವಡ್ಡೇರ (Vaddera)',
      ta: 'வட்டேரா (Vaddera)',
      mr: 'वद्देरा (Vaddera)',
      or: 'ଭଦ୍ଦେରା (Vaddera)',
      bn: 'ভাদ্দেরা (Vaddera)'
    }
  },
  {
    key: 'Oddar',
    category: 'Civic & Builders',
    label: {
      en: 'Oddar',
      hi: 'ओड्डार (Oddar)',
      te: 'ఒడ్డార్ (Oddar)',
      kn: 'ಒಡ್ಡಾರ್ (Oddar)',
      ta: 'ஒட்டர் (Oddar)',
      mr: 'ओड्डार (Oddar)',
      or: 'ଓଡ୍ଡାର (Oddar)',
      bn: 'ওড্ডার (Oddar)'
    }
  },
  {
    key: 'Odar',
    category: 'Civic & Builders',
    label: {
      en: 'Odar',
      hi: 'ओडार (Odar)',
      te: 'ఒడార్ (Odar)',
      kn: 'ಒಡಾರ್ (Odar)',
      ta: 'ஒடார் (Odar)',
      mr: 'ओडार (Odar)',
      or: 'ଓଡ଼ାର (Odar)',
      bn: 'ওডার (Odar)'
    }
  },
  {
    key: 'Vaddar',
    category: 'Civic & Builders',
    label: {
      en: 'Vaddar',
      hi: 'वड्डार (Vaddar)',
      te: 'వడ్డార్ (Vaddar)',
      kn: 'ವಡ್ಡಾರ್ (Vaddar)',
      ta: 'வட்டார் (Vaddar)',
      mr: 'वड्डार (Vaddar)',
      or: 'ଭଦ୍ଦାର (Vaddar)',
      bn: 'ভাদ্দার (Vaddar)'
    }
  },
  {
    key: 'Waddar',
    category: 'Civic & Builders',
    label: {
      en: 'Waddar',
      hi: 'वड्डार (Waddar)',
      te: 'వడ్డార్ (Waddar)',
      kn: 'ವಡ್ಡಾರ್ (Waddar)',
      ta: 'வாட்டார் (Waddar)',
      mr: 'वड्डार (Waddar)',
      or: 'ଭଦ୍ଦାର୍ (Waddar)',
      bn: 'ওয়াদ্দার (Waddar)'
    }
  },
  {
    key: 'Wadar',
    category: 'Civic & Builders',
    label: {
      en: 'Wadar',
      hi: 'वादार (Wadar)',
      te: 'వాడార్ (Wadar)',
      kn: 'ವಾಡಾರ್ (Wadar)',
      ta: 'வாடார் (Wadar)',
      mr: 'वाडार (Wadar)',
      or: 'ଭାଦାର (Wadar)',
      bn: 'ওয়াদার (Wadar)'
    }
  },
  {
    key: 'Ottar',
    category: 'Civic & Builders',
    label: {
      en: 'Ottar',
      hi: 'ओट्टार (Ottar)',
      te: 'ఒట్టార్ (Ottar)',
      kn: 'ಒಟ್ಟಾರ್ (Ottar)',
      ta: 'ஒட்டார் (Ottar)',
      mr: 'ओट्टार (Ottar)',
      or: 'ଓଟ୍ଟାର (Ottar)',
      bn: 'ওট্টার (Ottar)'
    }
  }
];

export const PROMINENT_PERSONS: ProminentPerson[] = [
  // 1. Emperor Kapilendra Deva Routray Gajapathi
  {
    id: 'kapilendra_deva_gajapathi',
    name: {
      en: 'Emperor Kapilendra Deva Routray Gajapathi',
      hi: 'सम्राट कपिलेंद्र देव राउताराय गजपति',
      te: 'చక్రవర్తి కపిలేంద్ర దేవ రౌత్‌రాయ్ గజపతి',
      kn: 'ಚಕ್ರವರ್ತಿ ಕಪಿಲೇಂದ್ರ ದೇವ ರೌತರಾಯ ಗಜಪತಿ',
      ta: 'பேரரசர் கபிலேந்திர தேவ ராவூத்ராய் கஜபதி',
      mr: 'सम्राट कपिलेंद्र देव राऊतराय गजपती',
      or: 'ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ରାଉତରାୟ ଗଜପତି',
      bn: 'সম্রাট কপিলেন্দ্র দেব রাউতরায় গজপতি'
    },
    titles: {
      en: 'Sri Sri Pratapa Kapilendra Routray, Founder of Suryavamsha Gajapathi Empire, Gaudesvara Navakoti Karnata Kalaburagesvara',
      hi: 'श्री श्री प्रतापकपिलेंद्र राउताराय, सूर्यवंशी गजपति साम्राज्य के संस्थापक, गौडेश्वर नवकोटि कर्णाट कलबुर्गीश्वर',
      te: 'శ్రీ శ్రీ ప్రతాప కపిలేంద్ర రౌత్‌రాయ్ గజపతి, సూర్యవంశ సామ్రాజ్య స్థాపకుడు, గౌడేశ్వర నవకోటి కర్ణాట కలబుర్గీశ్వర',
      kn: 'ಶ್ರೀ ಶ್ರೀ ಪ್ರತಾಪ ಕಪಿಲೇಂದ್ರ ರೌತರಾಯ, ಸೂರ್ಯವಂಶ ಸಂಸ್ಥಾಪಕ, ಗೌಡೇಶ್ವರ ನವಕೋಟಿ ಕರ್ಣಾಟ ಕಲಬುರ್ಗೀಶ್ವರ',
      ta: 'ஸ்ரீ ஸ்ரீ பிரதாப கபிலேந்திர ராவூத்ராய், சூர்யவம்ச நிறுவனர், நவக கோடி கர்ணாட கல்பர்கீஸ்வரர்',
      mr: 'श्री श्री प्रतापकपिलेंद्र राऊतराय, सूर्यवंशी गजपती साम्राज्य संस्थापक, नवकोटी कर्णाट कलबुर्गीश्वर',
      or: 'ଶ୍ରୀ ଶ୍ରୀ ପ୍ରତାପ କପିଳେନ୍ଦ୍ର ରାଉତରାୟ, ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ ପ୍ରତିଷ୍ଠାତା, ଗୌଡ଼େଶ୍ୱର ନବକୋଟି କର୍ଣ୍ଣାଟ କଲବୁର୍ଗେଶ୍ୱର',
      bn: 'শ্রী শ্রী প্রতাপ কপিলেন্দ্র রাউতরায়, সূর্যবংশীয় সাম্রাজ্য প্রতিষ্ঠাতা, গৌড়েশ্বর নবকোটি কর্ণাট কলবুরগেশ্বর'
    },
    branches: [
      'Gajapathi RauthRai',
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddeRajulu',
      'OddeRazulu',
      'Kalinga',
      'Utkala',
      'Trikalinga',
      'Gajapathis',
      'Odra',
      'Od-Kshatriya',
      'Odiyaraju',
      'Od'
    ],
    era: {
      en: '1434 – 1466 CE',
      hi: '1434 – 1466 ईस्वी',
      te: 'సా.శ. 1434 – 1466',
      kn: 'ಕ್ರಿ.ಶ. 1434 – 1466',
      ta: 'பொ.ஆ. 1434 – 1466',
      mr: 'इ.स. १४३४ – १४६६',
      or: 'ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୪୩୪ – ୧୪୬୬',
      bn: '১৪৩৪ – ১৪৬৬ খ্রিস্টাব্দ'
    },
    region: {
      en: 'Odra Desha, Utkala, Kalinga, Trikalinga, Andhra, & Southern Frontiers (Ganges to Kaveri)',
      hi: 'ओड्र देश, उत्कल, कलिंग, त्रिकलिंग, आंध्र और दक्षिणी सीमाएं (गंगा से कावेरी तक)',
      te: 'ఓడ్ర దేశం, ఉత్కళ, కళింగ, త్రికళింగ, ఆంధ్ర మరియు దక్షిణ సరిహద్దులు (గంగ నుండి కావేరి వరకు)',
      kn: 'ಓಡ್ರ ದೇಶ, ಉತ್ಕಳ, ಕಳಿಂಗ, ತ್ರಿಕಳಿಂಗ, ಆಂಧ್ರ ಮತ್ತು ದಕ್ಷಿಣ ಪ್ರಾಂತ್ಯಗಳು',
      ta: 'ஓட்ர தேசம், உத்கலம், கலிங்கம், திரிகலிங்கம், ஆந்திரா மற்றும் காவிரிப் படுகை',
      mr: 'ओड्र देश, उत्कल, कलिंग, त्रिकलिंग, आंध्र व दक्षिण सीमा (गंगा ते कावेरी)',
      or: 'ଓଡ଼୍ର ଦେଶ, ଉତ୍କଳ, କଳିଙ୍ଗ, ତ୍ରିକଳିଙ୍ଗ, ଆନ୍ଧ୍ର ତଥା ଦକ୍ଷିଣ ସୀମାନ୍ତ (ଗଙ୍ଗାଠାରୁ କାବେରୀ)',
      bn: 'ওড্র দেশ, উৎকল, কলিঙ্গ, ত্রিকলিঙ্গ, অন্ধ্র ও দক্ষিণাঞ্চল (গঙ্গা থেকে কাবেরী)'
    },
    badge: 'Imperial Sovereign & Progenitor',
    summary: {
      en: 'Imperial founding sovereign of the Suryavamsha Gajapathi Empire. Originally recorded in royal epigraphs as Kapilendra Routray (RauthRai), he united Kalinga, Utkala, and Trikalinga, spearheaded the OddeRajulu and Kshatriya Rajulu military vanguards, and extended the sovereign realm from the Ganges to the Kaveri.',
      hi: 'सूर्यवंश गजपति साम्राज्य के सर्वोच्च संस्थापक सम्राट। शिलालेखों में मूलतः कपिलेंद्र राउताराय (राउतराय) के रूप में अंकित, उन्होंने कलिंग, उत्कल और त्रिकलिंग को एकीकृत किया, ओड्डेराजुलु व क्षत्रिय राजुलु सेनाओं का नेतृत्व किया और साम्राज्य का विस्तार गंगा से कावेरी तक किया।',
      te: 'సూర్యవంశ గజపతి మహాసామ్రాజ్య స్థాపకుడు. ప్రాథమిక శాసనాలలో కపిలేంద్ర రౌత్‌రాయ్ (రావుతరాయ్) గా కీర్తించబడిన ఈ చక్రవర్తి కళింగ, ఉత్కళ, త్రికళింగ భూములను ఏకఛత్రాధిపత్యం కిందకు తెచ్చి, ఒడ్డేరాజులు, క్షత్రియ రాజుల సేనలతో గంగ నుండి కావేరి వరకు దిగ్విజయం సాధించారు.',
      kn: 'ಕಪಿಲೇಂದ್ರ ರೌತರಾಯ ಗಜಪತಿ ಕಳಿಂಗ, ಉತ್ಕಳ ಮತ್ತು ತ್ರಿಕಳಿಂಗವನ್ನು ಒಗ್ಗೂಡಿಸಿ, ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ಕ್ಷತ್ರಿಯ ರಾಜುಲು ಸೇನೆಗಳೊಂದಿಗೆ ಗಂಗೆಯಿಂದ ಕಾವೇರಿಯವರೆಗೆ ಆಳ್ವಿಕೆ ನಡೆಸಿದರು.',
      ta: 'கபிலேந்திர ராவூத்ராய் கஜபதி, கலிங்கம், உத்கலம், திரிகலிங்கம் ஆகியவற்றை ஒன்றிணைத்து ஒட்டேராஜுலு மற்றும் க்ஷத்திரிய ராஜுலு படைகளை வழிநடத்தினார்.',
      mr: 'कपिलेंद्र राऊतराय गजपती यांनी कलिंग, उत्कल व त्रिकलिंगाचे एकत्रीकरण करून ओड्डेराजुलू व क्षत्रिय सैन्याच्या बळावर गंगा ते कावेरीपर्यंत साम्राज्य विस्तारले.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟର ପ୍ରତିଷ୍ଠାତା। ରାଜକୀୟ ଶିଳାଲେଖରେ "କପିଳେନ୍ଦ୍ର ରାଉତରାୟ" ନାମରେ ବର୍ଣ୍ଣିତ, ସେ ଉତ୍କଳ, କଳିଙ୍ଗ ଓ ତ୍ରିକଳିଙ୍ଗକୁ ଏକତ୍ର କରି ବିଶାଳ ସାମ୍ରାଜ୍ୟ ଗଠନ କରିଥିଲେ।',
      bn: 'সূর্যবংশীয় গজপতি সাম্রাজ্যের প্রতিষ্ঠাতা। শিলালিপিতে কপিলেন্দ্র রাউতরায় নামে খ্যাত, তিনি উৎকল, কলিঙ্গ ও ত্রিকলিঙ্গকে ঐক্যবদ্ধ করে বিশাল সাম্রাজ্য গড়ে তোলেন।'
    },
    biography: {
      en: 'Ascending the throne in 1434 CE during an imperial interregnum, Kapilendra Deva established the Suryavamsha dynasty with Cuttack and Puri as dual capitals. His royal house was historically rooted in the ancient Suryavamsha Kshatriya and RauthRai martial nobility. He organized defensive hill bastions across Kondavidu and Bellamkonda.',
      hi: '1434 ईस्वी में सिंहासनारूढ़ होकर कपिलेंद्र देव ने सूर्यवंश की स्थापना की। वे मूलतः सूर्यवंशीय क्षत्रिय और राउताराय सैन्य कुलीनता से संबंधित थे। उनके जगन्नाथ मंदिर और वेलीगलानी ताम्रपत्रों में विजयों का स्पष्ट उल्लेख है।',
      te: 'సా.శ. 1434లో పట్టాభిషిక్తుడైన కపిలేంద్ర దేవుడు సూర్యవంశ క్షత్రియ రౌత్‌రాయ్ వంశ గౌరవాన్ని చాటారు. కొండవీడు, ఉదయగిరిలలో ఒడ్డేరాజులు, వడ్డెర శిల్పులతో దుర్గాలు కట్టించారు.',
      kn: '೧೪೩೪ರಲ್ಲಿ ಅಧಿಕಾರಕ್ಕೆ ಬಂದು ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯ ಪರಂಪರೆಯನ್ನು ಎತ್ತಿಹಿಡಿದರು.',
      ta: '1434 இல் அரியணை ஏறி சூர்யவம்ச க்ஷத்திரிய பெருமையை நிலைநாட்டினார்.',
      mr: '१४३४ मध्ये सूर्यवंशीय परंपरेचे पुनरुत्थान करून त्यांनी विशाल साम्राज्याची मुहूर्तमेढ रोवली.',
      or: '୧୪୩୪ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ସୂର୍ଯ୍ୟବଂଶ ସ୍ଥାପନ କରି ଜଗନ୍ନାଥ ମନ୍ଦିରରେ ଅନେକ ଶିଳାଲେଖ ଉତ୍କୀର୍ଣ୍ଣ କରିଥିଲେ।',
      bn: '১৪৩৪ খ্রিস্টাব্দে সিংহাসনে বসে সূর্যবংশীয় ক্ষত্রিয় মর্যাদাকে পুনরুজ্জীবিত করেন।'
    },
    majorContributions: [
      {
        en: 'Reunified the tri-realms of Kalinga, Utkala, and Trikalinga into a single imperial polity.',
        hi: 'कलिंग, उत्कल और त्रिकलिंग के ऐतिहासिक भूभागों को एकीकृत साम्राज्य में पिरोया।',
        te: 'కళింగ, ఉత్కళ, త్రికళింగ భూములను ఏకం చేసి అజేయ మహాసామ్రాజ్యంగా మలిచారు.',
        kn: 'ಕಳಿಂಗ, ಉತ್ಕಳ ಮತ್ತು ತ್ರಿಕಳಿಂಗವನ್ನು ಒಗ್ಗೂಡಿಸಿ ಬಲಿಷ್ಠ ಸಾಮ್ರಾಜ್ಯ ಕಟ್ಟಿದರು.',
        ta: 'கலிங்கம், உத்கலம், திரிகலிங்கம் ஆகிய முப்பெரும் நிலங்களை இணைத்தார்.',
        mr: 'कलिंग, उत्कल आणि त्रिकलिंग यांना एकाच छत्राखाली आणले.',
        or: 'କଳିଙ୍ଗ, ଉତ୍କଳ ଓ ତ୍ରିକଳିଙ୍ଗକୁ ଏକ ଶାସନାଧୀନ କରିଥିଲେ।',
        bn: 'কলিঙ্গ, উৎকল ও ত্রিকলিঙ্গকে ঐক্যবদ্ধ করে একটি অখণ্ড সাম্রাজ্য প্রতিষ্ঠা করেন।'
      },
      {
        en: 'Formed the sovereign foundation for the OddeRajulu, VaddeRajulu, and Odiyaraju Kshatriya clans.',
        hi: 'ओड्डेराजुलु, वड्डेराजुलु और ओडियाराजू क्षत्रिय कुलों के संप्रभु आधार का निर्माण किया।',
        te: 'ఒడ్డేరాజులు, వడ్డేరాజులు, ఒడియారాజు క్షత్రియ వంశాలకు చారిత్రక రాజసార్వభౌమత్వాన్ని అందించారు.',
        kn: 'ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡಿಯಾರಾಜುಲು ವಂಶಗಳಿಗೆ ರಾಜವೈಭವ ತಂದಿತ್ತರು.',
        ta: 'ஒட்டேராஜுலு மற்றும் வடியாராஜுலு மரபுகளுக்கு அரச அதிகாரத்தை நிலைநிறுத்தினார்.',
        mr: 'ओड्डेराजुलू आणि वडियाराजुलू घराण्यांना राजेशाही प्रतिष्ठा दिली.',
        or: 'ଓଡ୍ଡେରାଜୁଲୁ ଓ ଭଡ୍ଡେରାଜୁଲୁ ବଂଶର ରାଜକୀୟ ପ୍ରତିଷ୍ଠା ବଜାୟ ରଖିଥିଲେ।',
        bn: 'ওড্ডেরাজুলু ও ভাড্ডেরাজুলু বংশের রাজকীয় মর্যাদা প্রতিষ্ঠা করেন।'
      }
    ],
    evidenceSources: [
      'Veligalani Copper Plates of Kapilendra Deva (Epigraphia Indica, Vol. XXXIII)',
      'Jagannath Temple Inscriptions of Sri Pratapa Kapilendra Deva (1436–1464 CE)',
      'Madala Panji (Puri Temple Royal Chronicle)',
      'Prof. R. Subrahmanyam, "The Suryavamsi Gajapatis of Orissa"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 2. Kumara Hamvira Deva Gajapathi (Hamvira Rautraya)
  {
    id: 'kumara_hamvira_deva',
    name: {
      en: 'Kumara Hamvira Deva Gajapathi (Hamvira Rautraya)',
      hi: 'कुमार हम्मीर देव राउताराय गजपति',
      te: 'కుమార హంవీర దేవ రౌత్‌రాయ్ గజపతి',
      kn: 'ಕುಮಾರ ಹಂವೀರ ದೇವ ರೌತರಾಯ ಗಜಪತಿ',
      ta: 'குமார ஹம்வீர தேவ ராவூத்ராய் கஜபதி',
      mr: 'कुमार हम्मीर देव राऊतराय गजपती',
      or: 'କୁମାର ହମ୍ବୀର ଦେବ ରାଉତରାୟ ଗଜପତି',
      bn: 'কুমার হাম্বীর দেব রাউতরায় গজপতি'
    },
    titles: {
      en: 'Crown Prince, Viceroy of Southern Frontiers, Commander of Paika Vanguard, Ancestor of OddeRajulu & VaddeRajulu',
      hi: 'युवराज, दक्षिणापथ महाशासक, पाइका सैन्यदल के अधिपति, ओड्डेराजुलु व वड्डेराजुलु के कुलपिता',
      te: 'యువరాజు, దక్షిణ రాజ్య రక్షకుడు, పైకా సైన్యాధ్యక్షుడు, ఒడ్డేరాజులు-వడ్డేరాజులు-ఒడియారాజుల మూలపురుషుడు',
      kn: 'ಯುವರಾಜ, ದಕ್ಷಿಣ ವಿಭಾಗದ ಮಹಾರಾಜಪ್ರತಿನಿಧಿ, ಪೈಕ ಪಡೆಯ ಮುಖ್ಯಸ್ಥ, ಒಡ್ಡೇರಾಜುಲು ಮೂಲಪುರುಷ',
      ta: 'இளவரசர், தென்னகப் பிரதிநிதி, பைகா படைத்தலைவர், ஒட்டேராஜுலு முன்னோடி',
      mr: 'युवराज, दक्षिणेचे राज्यपाल, पाईक सैन्याचे अधिपती, ओड्डेराजुलूंचे कुलपुरुष',
      or: 'ଯୁବରାଜ, ଦକ୍ଷିଣାପଥ ପ୍ରଶାସକ, ପାଇକ ସେନାର ପ୍ରଧାନ, ଓଡ୍ଡେରାଜୁଲୁ ଓ ଭଡ୍ଡେରାଜୁଲୁଙ୍କ ଆଦିପୁରୁଷ',
      bn: 'যুবরাজ, দক্ষিণাঞ্চলের ভাইসরয়, পাইক সেনার অধিনায়ক, ওড্ডেরাজুলু ও ভাড্ডেরাজুলুদের পূর্বপুরুষ'
    },
    branches: [
      'Gajapathi RauthRai',
      'OddeRajulu',
      'VaddeRajulu',
      'OddeRazulu',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddaNayakkar',
      'Odar',
      'Wadar',
      'Ottar',
      'paikas',
      'Gajapathis',
      'Odiyaraju',
      'Od-Kshatriya',
      'Odde',
      'Oddar'
    ],
    era: {
      en: '15th Century CE (Active c. 1445 – 1485 CE)',
      hi: '15वीं शताब्दी ईस्वी (सक्रिय लगभग 1445 – 1485 ई.)',
      te: '15వ శతాబ్దం (క్రియాశీలత సా.శ. 1445 – 1485)',
      kn: '೧೫ನೇ ಶತಮಾನ (ಕ್ರಿ.ಶ. ೧೪೪೫ – ೧೪೮೫)',
      ta: '15 ஆம் நூற்றாண்டு (பொ.ஆ. 1445 – 1485)',
      mr: '१५ वे शतक (इ.स. १४४५ – १४८५)',
      or: '୧୫ଶ ଶତାବ୍ଦୀ (୧୪୪୫ – ୧୪୮୫ ଖ୍ରୀଷ୍ଟାବ୍ଦ)',
      bn: '১৫শ শতাব্দী (আনুমানিক ১৪৪৫ – ১৪৮৫ খ্রিস্টাব্দ)'
    },
    region: {
      en: 'Kondavidu, Bellamkonda, Udayagiri, Hampi, & Southern River Basins (Andhra, Karnataka, Tamil Nadu)',
      hi: 'कोंडावीडु, बेल्लमकोंडा, उदयगिरि, हम्पी, और दक्षिणी नदियां (आंध्र, कर्नाटक, तमिलनाडु)',
      te: 'కొండవీడు, బెల్లంకొండ, ఉదయగిరి, హంపీ మరియు దక్షిణ నదీలోయలు (ఆంధ్ర, కర్ణాటక, తమిళనాడు)',
      kn: 'ಕೊಂಡವೀಡು, ಉದಯಗಿರಿ, ಹಂಪಿ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಪ್ರಾಂತ್ಯಗಳು',
      ta: 'கொண்டவீடு, உதயகிரி, ஹம்பி மற்றும் தென்னிந்தியப் பகுதிகள்',
      mr: 'कोंडावीडू, उदयगिरी, हंपी व दक्षिण नद्यांची खोरी',
      or: 'କୋଣ୍ଡାଭିଡୁ, ବେଲ୍ଲମକୋଣ୍ଡା, ଉଦୟଗିରି ଓ ଦକ୍ଷିଣ ନଦୀ ଅବବାହିକା',
      bn: 'কোন্ডাভিডু, বেল্লমকোন্ডা, উদয়গিরি এবং দক্ষিণ ভারতের নদী উপত্যকা'
    },
    badge: 'Martial Vanguard & Viceroy',
    summary: {
      en: 'Legendary warrior crown prince and viceroy who commanded the Gajapathi Paika forces across Andhra, Karnataka, and Tamil country. Settling in southern march lands, he established the OddeRajulu, VaddeRajulu, OddeRazulu, and OddaNayakkar martial and civil governance traditions.',
      hi: 'पराक्रमी युवराज और दक्षिणापथ के वायसराय जिन्होंने आंध्र, कर्नाटक और तमिलनाडु में गजपति पाइका सेनाओं का नेतृत्व किया। उन्होंने कोंडावीडु और उदयगिरि में ओड्डेराजुलु, वड्डेराजुलु, ओड्डेराजुलू और ओड्डा नायक्कर शासन परंपरा की नींव रखी।',
      te: 'గజపతి సూర్యవంశ జ్యేష్ఠ యువరాజు, దక్షిణ సేనాని. ఆంధ్ర, కర్ణాటక, తమిళ ప్రాంతాలలో పైకా సైన్యాలను నడిపించి, కొండవీడు-ఉదయగిరిలలో స్థిరపడి ఒడ్డేరాజులు, వడ్డేరాజులు, ఒడ్డేరాజ్జులు, ఒడ్డా నాయక్కర్ రాజరిక పరంపరకు ఆద్యుడైన చారిత్రక నాయకుడు.',
      kn: 'ದಕ್ಷಿಣ ಭಾರತದಲ್ಲಿ ಪೈಕ ಸೈನ್ಯವನ್ನು ಮುನ್ನಡೆಸಿ ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡಿಯಾರಾಜುಲು ವಂಶಗಳಿಗೆ ಆಧಾರವಾದ ವೀರ ದಂಡನಾಯಕ.',
      ta: 'தென்னகத்தில் பைகா படைகளை வழிநடத்தி, ஒட்டேராஜுலு மற்றும் ஒட்டா நாயக்கர் பரம்பரையைத் தோற்றுவித்த மாவீரர்.',
      mr: 'दक्षिणेत पाईक सैन्याचे नेतृत्व करून ओड्डेराजुलू आणि वड्डेराजुलू राजघराण्यांची स्थापना करणारे वीर सेनापती.',
      or: 'ଦକ୍ଷିଣ ଅଭିଯାନର ମହାନାୟକ ଯିଏ ପାଇକ ସେନାର ନେତୃତ୍ୱ ନେଇ ଓଡ୍ଡେରାଜୁଲୁ ଓ ଭଡ୍ଡେରାଜୁଲୁ ଶାସନ ପ୍ରତିଷ୍ଠା କରିଥିଲେ।',
      bn: 'দক্ষিণ ভারতীয় অভিযানে পাইক বাহিনীর নেতৃত্ব দিয়ে ওড্ডেরাজুলু ও ভাড্ডেরাজুলু বংশের সূচনা করেন।'
    },
    biography: {
      en: 'Hamvira Deva commanded the royal divisions capturing Chandragiri, Udayagiri, and entering Vijayanagara marches. His grants at Warangal, Srisailam, and Kondavidu attest to his military mastery. His descendants blended royal Kshatriya titles with civil stone-fortification leadership throughout the Deccan.',
      hi: 'हम्मीर देव ने चंद्रगिरि और विजयनगर सीमा तक विजय पताका फहराई। वारंगल और श्रीशैलम के शिलालेखों में उनके शौर्य का प्रमाण है। उनकी संतानें आंध्र और तमिलनाडु में राजुलु और नायक्कर के रूप में सम्मानित हुईं।',
      te: 'హంవీర దేవుడు శ్రీశైలం, వరంగల్, కొండవీడు శాసనాలలో అజేయ సేనానిగా ప్రస్తుతించబడ్డారు. వీరి వారసులే దక్షిణ భారతంలో క్షత్రియ రాజులుగా, ఒడ్డేరాజులుగా, నాయక్కర్లుగా ప్రాసిద్ధికెక్కారు.',
      kn: 'ಚಂದ್ರಗಿರಿ ಮತ್ತು ಉದಯಗಿರಿಯನ್ನು ಗೆದ್ದು ತಮ್ಮದೇ ಶಾಸನಗಳನ್ನು ಸ್ಥಾಪಿಸಿದರು.',
      ta: 'சந்திரகிரி மற்றும் உதயகிரியைக் கைப்பற்றி கல்வெட்டுகளில் அழியாப் புகழ் பெற்றார்.',
      mr: 'वारंगळ व श्रीशैलम येथे शिलालेख कोरून त्यांनी आपले वर्चस्व सिद्ध केले.',
      or: 'ଶ୍ରୀଶୈଳମ ଓ କୋଣ୍ଡାଭିଡୁରେ ନିଜର ଶିଳାଲେଖ ପ୍ରତିଷ୍ଠା କରିଥିଲେ।',
      bn: 'শ্রীশৈলম ও কোন্ডাভিডুতে শিলালিপির মাধ্যমে নিজ কর্তৃত্বের সাক্ষ্য রেখে গেছেন।'
    },
    majorContributions: [
      {
        en: 'Led the imperial Paika foot-soldier regiments in the conquest of southern hill fortresses.',
        hi: 'दक्षिणी गिरिदुर्गों की विजय में गजपति पाइका पैदल सेना का सफल नेतृत्व किया।',
        te: 'దక్షిణ భారత గిరిదుర్గాల ఆక్రమణలో పైకా కాల్బలాలను విజయపథంలో నడిపించారు.',
        kn: 'ದಕ್ಷಿಣದ ಬೆಟ್ಟದ ಕೋಟೆಗಳನ್ನು ವಶಪಡಿಸಿಕೊಳ್ಳಲು ಪೈಕ ಸೈನ್ಯವನ್ನು ಮುನ್ನಡೆಸಿದರು.',
        ta: 'தென்னக மலைக் கோட்டைகளை வெல்ல பைகா காலாட்படையை வழிநடத்தினார்.',
        mr: 'दक्षिणेतील डोंगरी किल्ले जिंकण्यासाठी पाईक पायदळाचे नेतृत्व केले.',
        or: 'ଦକ୍ଷିଣ ଭାରତର ପର୍ବତ ଦୁର୍ଗଗୁଡ଼ିକ ଜୟ କରିବାରେ ପାଇକ ସେନାର ନେତୃତ୍ୱ ନେଇଥିଲେ।',
        bn: 'দক্ষিণের পার্বত্য দুর্গজয়ে পাইক পদাতিক বাহিনীর নেতৃত্ব প্রদান করেন।'
      },
      {
        en: 'Patronized the stone fort builders and reservoir diggers (OddaNayakkar, Ottar, Odar, Wadar).',
        hi: 'पाषाण दुर्ग निर्माताओं और जलाशय उत्खननकर्ताओं (ओड्डा नायक्कर, ओट्टार, वाडार) को संरक्षण दिया।',
        te: 'శిలాదుర్గ నిర్మాతలు, చెరువులు తవ్వే శిల్పులను (ఒడ్డా నాయక్కర్, ఒట్టార్, వాడార్) గౌరవించి పోషించారు.',
        kn: 'ಕೋಟೆ ಕಟ್ಟುವ ಮತ್ತು ಕೆರೆ ತೋಡುವ ಕಾಯಕದವರಿಗೆ ರಾಜಾಶ್ರಯ ನೀಡಿದರು.',
        ta: 'கல் கோட்டை கட்டுவோர் மற்றும் ஏரி வெட்டுவோருக்கு அரச ஆதரவு தந்தார்.',
        mr: 'दुर्ग निर्माते व जलसंधारण करणाऱ्या कलावंतांना राजाश्रय दिला.',
        or: 'ଦୁର୍ଗ ଓ ଜଳାଶୟ ନିର୍ମାଣକାରୀ ଶ୍ରମିକମାନଙ୍କୁ ରାଜକୀୟ ସୁରକ୍ଷା ଦେଇଥିଲେ।',
        bn: 'দুর্গ ও জলাশয় নির্মাতাদের রাজকীয় পৃষ্ঠপোষকতা প্রদান করেন।'
      }
    ],
    evidenceSources: [
      'Kondavidu Inscription of Hamvira Deva (South Indian Inscriptions, Vol. X)',
      'Warangal Fort Inscription of Kumara Hamvira Deva (Epigraphia Indica)',
      'Srisailam Temple Inscriptions of the Gajapati Dynasty'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 3. Baxi Jagabandhu Vidyadhara Mahapatra Bhramarabar Ray
  {
    id: 'baxi_jagabandhu_paika_general',
    name: {
      en: 'Baxi Jagabandhu Vidyadhara (Supreme Paika General)',
      hi: 'बक्शी जगबंधु विद्याधर (महान पाइका सेनापति)',
      te: 'బక్షీ జగబంధు విద్యాధర (పైకా మహాసేనాని)',
      kn: 'ಬಕ್ಷಿ ಜಗಬಂಧು ವಿದ್ಯಾಧರ (ಪೈಕ ಮಹಾದಂಡನಾಯಕ)',
      ta: 'பக்ஷி ஜகபந்து வித்யாதரா (பைகா தலைமைத் தளபதி)',
      mr: 'बक्षी जगबंधू विद्याधर (महान पाईक सरसेनापती)',
      or: 'ବକ୍ସି ଜଗବନ୍ଧୁ ବିଦ୍ୟାଧର (ମହାନ ପାଇକ ସେନାପତି)',
      bn: 'বক্সী জগবন্ধু বিদ্যাধর (মহান পাইক সেনাপতি)'
    },
    titles: {
      en: 'Baxi (Commander-in-Chief of Khurda Gajapathi Royal Army), Supreme Leader of the Paika Rebellion (1817), Pride of Od-Khandayaths & Utkala',
      hi: 'बक्शी (खुर्दा गजपति सेना के प्रधान सेनापति), पाइका महाक्रांति (1817) के सर्वोच्च नायक, ओड-खंडायत व उत्कल का गौरव',
      te: 'బక్షీ (ఖుర్దా గజపతి మహా సైన్యాధ్యక్షుడు), 1817 పైకా విప్లవ మహా నాయకుడు, ఒడ్-ఖండాయత్ & ఉత్కళ వీర కిరీటం',
      kn: 'ಖುರ್ದಾ ಗಜಪತಿ ಮಹಾಸೈನ್ಯದ ಮುಖ್ಯಸ್ಥ, ೧೮೧೭ರ ಪೈಕ ಕ್ರಾಂತಿಯ ಮಹಾನಾಯಕ',
      ta: 'குர்தா கஜபதி படைத்தலைவர், 1817 பைகா புரட்சியின் ஒப்பற்ற தலைவர்',
      mr: 'खुर्दा गजपती सैन्याचे सरसेनापती, १८१७ च्या पाईक बंडाचे महान नेते',
      or: 'ଖୋର୍ଦ୍ଧା ଗଜପତି ସୈନ୍ୟବାହିନୀର ପ୍ରଧାନ ସେନାପତି, ୧୮୧୭ ପାଇକ ବିଦ୍ରୋହର ମହାନାୟକ, ଓଡ଼-ଖଣ୍ଡାୟତ ଗୌରବ',
      bn: 'খুর্দা গজপতি সৈন্যবাহিনীর প্রধান সেনাপতি, ১৮১৭-র পাইক বিদ্রোহের মহানায়ক, ওড-খণ্ডায়ত গৌরব'
    },
    branches: [
      'paikas',
      'Od-Khandayaths',
      'Utkala',
      'Kalinga',
      'Trikalinga',
      'Odra',
      'Od-Kshatriya',
      'Gajapathis'
    ],
    era: {
      en: '1773 – 1829 CE (The Great Paika Rebellion of 1817)',
      hi: '1773 – 1829 ईस्वी (1817 की महान पाइका क्रांति)',
      te: 'సా.శ. 1773 – 1829 (1817 మహోజ్వల పైకా విప్లవం)',
      kn: '೧೭೭೩ – ೧೮೨୯ (೧೮೧೭ರ ಪೈಕ ಕ್ರಾಂತಿ)',
      ta: 'பொ.ஆ. 1773 – 1829 (1817 பைகா புரட்சி)',
      mr: '१७७३ – १८२९ (१८१७ चा पाईक लढा)',
      or: '୧୭୭୩ – ୧୮୨୯ ଖ୍ରୀଷ୍ଟାବ୍ଦ (୧୮୧୭ର ଐତିହାସିକ ପାଇକ ବିଦ୍ରୋହ)',
      bn: '১৭৭৩ – ১৮২৯ খ্রিস্টাব্দ (১৮১৭ সালের ঐতিহাসিক পাইক বিদ্রোহ)'
    },
    region: {
      en: 'Khurda, Puri, Banapur, Barunei Hill, & Utkala (Odisha)',
      hi: 'खुर्दा, पुरी, बाणपुर, बारुणेई पर्वत एवं उत्कल (ओडिशा)',
      te: 'ఖుర్దా, పూరీ, బాణపూర్, బారుణేయి పర్వతం మరియు ఉత్కళ (ఒడిశా)',
      kn: 'ಖುರ್ದಾ, ಪುರಿ, ಬಾಣಪುರ, ಬರುಣೈ ಬೆಟ್ಟ, ಒಡಿಶಾ',
      ta: 'குர்தா, பூரி, பாணபூர், பாருணை மலை, ஒடிசா',
      mr: 'खुर्दा, पुरी, बाणपूर, बारुणेई टेकडी, ओडिशा',
      or: 'ଖୋର୍ଦ୍ଧା, ପୁରୀ, ବାଣପୁର, ବାରୁଣେଇ ପାହାଡ଼ ଓ ଉତ୍କଳ',
      bn: 'খুর্দা, পুরী, বাণপুর, বারুণেই পাহাড় ও উৎকল (ওড়িশা)'
    },
    badge: 'Supreme Paika General & Freedom Icon',
    summary: {
      en: 'Supreme military commander (Baxi) of the Gajapathi Raja of Khurda and undisputed leader of the historic 1817 Paika Rebellion—India’s First War of Independence. Mobilizing the fearless martial peasant-warriors of the Od-Khandayaths and Paikas, he routed British East India Company garrisons at Banapur and Puri, striking fear into colonial rulers.',
      hi: 'खुर्दा के गजपति राजा के प्रधान सेनापति (बक्शी) और 1817 के ऐतिहासिक पाइका विद्रोह—भारत के प्रथम स्वतंत्रता संग्राम—के महान सूत्रधार। ओड-खंडायत और पाइका योद्धाओं को संगठित कर उन्होंने बाणपुर और पुरी में ब्रिटिश ईस्ट इंडिया कंपनी की सेनाओं को धूल चटा दी और मातृभूमि की संप्रभुता के लिए अंत तक लड़े।',
      te: 'ఖుర్దా గజపతి మహారాజుల ప్రధాన దండనాయకుడు మరియు భారతదేశ ప్రథమ స్వాతంత్ర్య సంగ్రామంగా పేరొందిన 1817 నాటి చారిత్రక పైకా విప్లవ అగ్రనేత. ఒడ్-ఖండాయత్, పైకా వీరులను సంఘటితం చేసి బాణపూర్, పూరీలలో బ్రిటిష్ ఈస్ట్ ఇండియా కంపెనీ దళాలను చిత్తుచిత్తుగా ఓడించిన అజేయ దేశభక్తుడు.',
      kn: '೧೮೧೭ರ ಪ್ರಸಿದ್ಧ ಪೈಕ ಕ್ರಾಂತಿಯ ಮಹಾನಾಯಕ. ಖುರ್ದಾ ಗಜಪತಿ ಸೇನೆಯನ್ನು ಮುನ್ನಡೆಸಿ ಬ್ರಿಟಿಷ್ ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿಯ ಸೈನ್ಯವನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸಿದರು.',
      ta: '1817 பைகா புரட்சியின் தலைவர். ஆங்கிலேயப் படைகளை எதிர்த்துப் போரிட்டு குர்தா மற்றும் பூரியை மீட்ட வீரத் தளபதி.',
      mr: '१८१७ च्या ऐतिहासिक पाईक क्रांतीचे नेते. त्यांनी ओड-खंडायत व पाईक सैनिकांना संघटित करून ब्रिटिश ईस्ट इंडिया कंपनीच्या सैन्याचा पराभव केला.',
      or: 'ଖୋର୍ଦ୍ଧା ଗଜପତି ରାଜାଙ୍କ ପ୍ରଧାନ ସେନାପତି (ବକ୍ସି) ତଥା ୧୮୧୭ର ପ୍ରଥମ ସ୍ୱାଧୀନତା ସଂଗ୍ରାମ "ପାଇକ ବିଦ୍ରୋହ"ର ଅମର ନାୟକ। ବ୍ରିଟିଶ୍ ବାହିନୀକୁ ପରାସ୍ତ କରି ସ୍ୱାଧୀନତା ରକ୍ଷା କରିଥିଲେ।',
      bn: 'খুর্দা রাজদরবারের প্রধান সেনাপতি এবং ১৮১৭ সালের ঐতিহাসিক পাইক বিদ্রোহের মহানায়ক যিনি ব্রিটিশ ইস্ট ইন্ডিয়া কোম্পানিকে শোচনীয়ভাবে পরাস্ত করেছিলেন।'
    },
    biography: {
      en: 'Inheriting the hereditary title of Baxi (general) of the Gajapathi armed forces, Jagabandhu held the ancestral estate of Rorung. When the British confiscated their lands and dishonored the Gajapathi crown, Baxi rallied thousands of Paikas (traditional militia) armed with broadswords, bows, and matchlocks. Operating from the forested fortress of Barunei, he forced British administrators to abandon administrative centers before sacrificing in captivity in Cuttack in 1829.',
      hi: 'रोरंग रियासत के वंशानुगत बक्शी जगबंधु ने ईस्ट इंडिया कंपनी के शोषण के विरुद्ध बारुणेई की पहाड़ियों से छापामार युद्ध छेड़ा। उन्होंने खंडायत पाइकों के साथ मिलकर कटक और पुरी को अंग्रेजी नियंत्रण से मुक्त करा लिया था।',
      te: 'రోరుంగ్ జమీందారీ వారసత్వ బక్షీ అయిన జగబంధు, ఆంగ్లేయుల దురాగతాలకు వ్యతిరేకంగా గళమెత్తారు. బారుణేయి కొండల నుండి గెరిల్లా యుద్ధం నడిపి బ్రిటిష్ సైన్యాన్ని వణికించారు. 1829లో కటక్ లో అమరుడయ్యారు.',
      kn: 'ಬರುಣೈ ಕಾಡುಗಳಿಂದ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಗೆರಿಲ್ಲಾ ಕದನ ನಡೆಸಿ ಖುರ್ದಾವನ್ನು ರಕ್ಷಿಸಿದರು.',
      ta: 'பாருணை மலைகளிலிருந்து கெரில்லா போர் நடத்தி ஆங்கிலேயரை நடுங்கச் செய்தவர்.',
      mr: 'बारुणेई टेकड्यांमधून गनिमी काव्याने लढून त्यांनी ब्रिटिशांना सळो की पळो करून सोडले.',
      or: 'ବାରୁଣେଇ ପାହାଡ଼କୁ କେନ୍ଦ୍ର କରି ବ୍ରିଟିଶ୍ ଶାସନ ବିରୋଧରେ ଗରିଲା ଯୁଦ୍ଧ ଚଳାଇଥିଲେ।',
      bn: 'বারুণেই পাহাড় থেকে ব্রিটিশবিরোধী গেরিলা যুদ্ধ পরিচালনা করে ইংরেজদের বিতাড়িত করেন।'
    },
    majorContributions: [
      {
        en: 'Led the 1817 Paika Rebellion, recognized by historians as the earliest organized mass freedom war against British rule.',
        hi: '1817 के पाइका विद्रोह का नेतृत्व किया, जिसे भारत का प्रथम जन-स्वतंत्रता संग्राम माना जाता है।',
        te: 'బ్రిటిష్ వారికి వ్యతిరేకంగా తొలి వ్యవస్థీకృత ప్రజా విప్లవమైన 1817 పైకా తిరుగుబాటును నడిపించారు.',
        kn: 'ಬ್ರಿಟಿಷರ ವಿರುದ್ಧದ ಪ್ರಥಮ ಸಂಘಟಿತ ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟವಾದ ಪೈಕ ಕ್ರಾಂತಿಯ ನೇತೃತ್ವ ವಹಿಸಿದರು.',
        ta: 'ஆங்கிலேய ஆட்சிக்கு எதிரான முதல் ஒருங்கிணைந்த மக்கள் சுதந்திரப் போரை வழிநடத்தினார்.',
        mr: 'ब्रिटिश राजवटीविरुद्धच्या पहिल्या संघटित स्वातंत्र्यलढ्याचे नेतृत्व केले.',
        or: '୧୮୧୭ରେ ବ୍ରିଟିଶ୍ ବିରୋଧରେ ପ୍ରଥମ ସଂଗଠିତ ଗଣ-ସ୍ୱାଧୀନତା ଆନ୍ଦୋଳନ ପରିଚାଳନା କରିଥିଲେ।',
        bn: '১৮১৭ সালে ব্রিটিশ শাসনের বিরুদ্ধে প্রথম গণ-স্বাধীনতা সংগ্রামের সফল নেতৃত্ব দেন।'
      },
      {
        en: 'Symbolized the immortal martial chivalry of the Od-Khandayaths and peasant-warriors of Utkala.',
        hi: 'ओड-खंडायत और उत्कल के किसान-योद्धाओं के अदम्य पराक्रम और स्वाभिमान का अमर प्रतीक बने।',
        te: 'ఉత్కళ దేశపు ఒడ్-ఖండాయత్, శ్రామిక పైకా యోధుల అజేయ ఆత్మగౌరవానికి శాశ్వత నిదర్శనం.',
        kn: 'ಒಡ್-ಖಂಡಾಯತ್ ಮತ್ತು ಉತ್ಕಳದ ಯೋಧರ ಸಾಹಸದ ಶಾಶ್ವತ ಪ್ರತೀಕ.',
        ta: 'ஒட்-கண்டாயத் மற்றும் உத்கல விவசாய வீரர்களின் வீரச் சின்னம்.',
        mr: 'ओड-खंडायत व शेतकऱ्यांच्या युद्धकौशल्याचे अद्वितीय उदाहरण.',
        or: 'ଓଡ଼-ଖଣ୍ଡାୟତ ଓ ଉତ୍କଳର କୃଷକ-ଯୋଦ୍ଧାମାନଙ୍କ ବୀରତ୍ୱର ଚିରନ୍ତନ ପ୍ରତୀକ।',
        bn: 'ওড-খণ্ডায়ত ও কৃষক যোদ্ধাদের শৌর্য ও আত্মত্যাগের অমর প্রতীক।'
      }
    ],
    evidenceSources: [
      'Walter Ewer Commission Report on Khurda Paik Rebellion (1818, British Parliamentary Archives)',
      'Toynbee, G., "A Sketch of the History of Orissa (1803–1828)", Bengal Secretariat Press',
      'P.K. Pattanaik, "A Forgotten Chapter of Orissan History (Paik Rebellion 1817)"',
      'Barunei Hill Inscriptions & Commemorative Pillar Records'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 4. Jayee Rajguru (Maharshi Jaya Krushna Rajguru Mohapatra)
  {
    id: 'jayee_rajguru_preceptor',
    name: {
      en: 'Jayee Rajguru (Martyr-Commander of Khurda)',
      hi: 'जयी राजगुरु (खुर्दा के अमर सेनानी व राजगुरु)',
      te: 'జయీ రాజగురు (ఖుర్దా రాజగురువు & తొలి అమరవీరుడు)',
      kn: 'ಜಯೀ ರಾಜಗುರು (ಖುರ್ದಾ ಮಹಾನ್ ಹುತಾತ್ಮ)',
      ta: 'ஜயீ ராஜகுரு (குர்தா தியாகி & படைத் தளபதி)',
      mr: 'जयी राजगुरू (खुर्दाचे पहिले हुतात्मा सेनापती)',
      or: 'ଜୟୀ ରାଜଗୁରୁ (ଖୋର୍ଦ୍ଧାର ପ୍ରଥମ ଶହୀଦ ଓ ରାଜଗୁରୁ)',
      bn: 'জয়ী রাজগুরু (খুর্দার প্রথম শহীদ ও সেনাপতি)'
    },
    titles: {
      en: 'Royal Preceptor & Chief Minister of Khurda Gajapathi Kingdom, Commander of Paika Armies, First Great Martyr of Freedom Resistance (1806)',
      hi: 'खुर्दा गजपति साम्राज्य के राजगुरु एवं प्रधान सलाहकार, पाइका सेनापति, 1806 के अमर प्रथम स्वाधीनता बलिदानी',
      te: 'ఖుర్దా గజపతి సామ్రాజ్య రాజగురువు & ప్రధానమంత్రి, పైకా దళాధిపతి, 1806 నాటి తొలి స్వాతంత్ర్య సమర అమరవీరుడు',
      kn: 'ಖುರ್ದಾ ಗಜಪತಿ ರಾಜಗುರು, ಪೈಕ ಪಡೆಯ ಮುಖ್ಯಸ್ಥ, ಪ್ರಥಮ ಹುತಾತ್ಮ (೧೮೦೬)',
      ta: 'குர்தா கஜபதி அரச குரு, பைகா படைத்தளபதி, முதல் சுதந்திரப் போராட்டத் தியாகி (1806)',
      mr: 'खुर्दा गजपती साम्राज्याचे मुख्य सल्लागार, पाईक सैन्याचे नियंत्रक, पहिले थोर हुतात्मा',
      or: 'ଖୋର୍ଦ୍ଧା ଗଜପତି ସାମ୍ରାଜ୍ୟର ରାଜଗୁରୁ ଓ ପ୍ରଧାନମନ୍ତ୍ରୀ, ପାଇକ ସେନାର ପ୍ରଧାନ ସଞ୍ଚାଳକ, ପ୍ରଥମ ଶହୀଦ (୧୮୦୬)',
      bn: 'খুর্দা গজপতি সাম্রাজ্যের রাজগুরু ও প্রধান উপদেষ্টা, পাইক বাহিনীর সেনাপতি, ১৮০৬-র অমর শহীদ'
    },
    branches: [
      'paikas',
      'Od-Khandayaths',
      'Utkala',
      'Odra',
      'Gajapathis',
      'Od-Kshatriya'
    ],
    era: {
      en: '1739 – 1806 CE',
      hi: '1739 – 1806 ईस्वी',
      te: 'సా.శ. 1739 – 1806',
      kn: '೧೭೩೯ – ೧೮೦೬',
      ta: 'பொ.ஆ. 1739 – 1806',
      mr: '१७३୯ – १८०६',
      or: '୧୭୩୯ – ୧୮୦୬ ଖ୍ରୀଷ୍ଟାବ୍ଦ',
      bn: '১৭৩৯ – ১৮০৬ খ্রিস্টাব্দ'
    },
    region: {
      en: 'Khurda, Puri, Barunei Fort, Midnapore & Baghitota (Bengal)',
      hi: 'खुर्दा, पुरी, बारुणेई दुर्ग, मेदिनीपुर व बाघीतोता (बंगाल)',
      te: 'ఖుర్దా, పూరీ, బారుణేయి కోట, మిడ్నాపూర్ & బాఘీతోటా',
      kn: 'ಖುರ್ದಾ, ಪುರಿ, ಬರುಣೈ ಕೋಟೆ',
      ta: 'குர்தா, பூரி, மிட்னாபூர்',
      mr: 'खुर्दा, पुरी, बारुणेई किल्ला व मेदिनीपूर',
      or: 'ଖୋର୍ଦ୍ଧା, ପୁରୀ, ବାରୁଣେଇ ଦୁର୍ଗ ଓ ମେଦିନୀପୁର',
      bn: 'খুর্দা, পুরী, বারুণেই দুর্গ ও মেদিনীপুর'
    },
    badge: 'Supreme Strategist & First Martyr',
    summary: {
      en: 'Eminent scholar-warrior and Chief Minister of Khurda Gajapathi King Mukunda Deva II. He unified the Paika warrior villages and Od-Khandayath militias to resist British occupation in 1804. Betrayed after heroic defense of Barunei Fort, he refused to submit to the British and was brutally executed at Baghitota (Midnapore) in 1806, becoming one of India’s earliest anti-colonial martyrs.',
      hi: 'खुर्दा के गजपति राजा मुकुंद देव द्वितीय के मुख्य सलाहकार एवं सेनापति। उन्होंने पाइका गांवों और ओड-खंडायत सैनिकों को एकजुट कर 1804 में अंग्रेजों के विरुद्ध संग्राम छेड़ा। बारुणेई दुर्ग की रक्षा के पश्चात उन्हें बंदी बनाया गया और 1806 में मेदिनीपुर में क्रूरतापूर्वक शहीद कर दिया गया, किंतु उन्होंने झुकने से इनकार कर दिया।',
      te: 'ఖుర్దా గజపతి ముకుంద దేవ II ప్రధాన మంత్రి మరియు రాజగురువు. 1804లో బ్రిటిష్ సైన్యం ఒడిశాపై దాడి చేసినప్పుడు పైకా వీరులను, ఒడ్-ఖండాయత్ గ్రామాలను సమీకరించి అపూర్వ పోరాటం చేశారు. 1806లో మేదినీపూర్‌లో ప్రాణాలర్పించి దేశభక్తికి చిరస్మరణీయ శిఖరంగా నిలిచారు.',
      kn: '೧೮೦೪ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಪೈಕ ಸೈನ್ಯವನ್ನು ಸಂಘಟಿಸಿ ಅಪ್ರತಿಮ ಹೋರಾಟ ನಡೆಸಿ ಹುತಾತ್ಮರಾದರು.',
      ta: '1804 இல் ஆங்கிலேயருக்கு எதிராக பைகா வீரர்களைத் திரட்டிப் போரிட்டு வீரமரணமடைந்த சுதந்திரப் போராட்ட நாயகர்.',
      mr: '१८०४ मध्ये ब्रिटिशांविरुद्ध लढा उभारून १८०६ मध्ये देशासाठी सर्वोच्च बलिदान दिले.',
      or: '୧୮୦୪ରେ ବ୍ରିଟିଶ୍ ଆକ୍ରମଣ ବିରୋଧରେ ପାଇକମାନଙ୍କୁ ସଂଗଠିତ କରିଥିଲେ। ୧୮୦୬ରେ ମେଦିନୀପୁରରେ ନିର୍ମମ ଭାବେ ଶହୀଦ ହୋଇଥିଲେ।',
      bn: '১৮০৪ সালে ব্রিটিশ আগ্রাসনের বিরুদ্ধে পাইক বাহিনীকে পরিচালনা করেন এবং ১৮০৬ সালে আত্মাহুতি দেন।'
    },
    biography: {
      en: 'A profound master of the Shastras, statecraft, and Dhanurveda (martial archery), Jayee Rajguru administered the defense of Khurda. When the British reneged on promises regarding Purushottama Kshetra, Rajguru organized resistance. Despite being torn apart between banyan branches by British executioners in 1806, his courage inspired the wider Paika Rebellion of 1817.',
      hi: 'शास्त्र और शस्त्र दोनों के प्रकांड विद्वान जयी राजगुरु ने खुर्दा की रक्षा की। अंग्रेजों द्वारा विश्वासघात किए जाने पर उन्होंने बगावत की। अंग्रेजों ने उन्हें बरगद की दो शाखाओं से बांधकर चीर दिया, परंतु उनका अमर बलिदान भावी पीढ़ियों के लिए स्वतंत्रता की लौ बन गया।',
      te: 'శాస్త్రాలలో, ధనుర్విద్యలో ఆరితేరిన జయీ రాజగురువు ఖుర్దా గౌరవాన్ని కాపాడారు. బ్రిటిష్ వారు మర్రి చెట్టు కొమ్మలకు కట్టి చిత్రహింసలు పెట్టి చంపినా, ఆయన పేరు చరిత్రలో చిరస్థాయిగా నిలిచిపోయింది.',
      kn: 'ಶಾಸ್ತ್ರ ಮತ್ತು ಶಸ್ತ್ರ ಎರಡರಲ್ಲೂ ನಿಪುಣರಾಗಿದ್ದ ರಾಜಗುರು ದೇಶಕ್ಕಾಗಿ ಬಲಿದಾನ ನೀಡಿದರು.',
      ta: 'சாஸ்திரமும் போர்க்கலையும் கைவரப்பெற்ற ஜயீ ராஜகுரு சுதந்திரத் தீயை மூட்டினார்.',
      mr: 'शास्त्र आणि शस्त्रविद्येत पारंगत असणाऱ्या राजगुरुंनी हौतात्म्य पत्करून स्वातंत्र्यलढा पेटवला.',
      or: 'ଶାସ୍ତ୍ର ଓ ଧନୁର୍ବିଦ୍ୟାର ମହାନ୍ ବିଦ୍ୱାନ ଯିଏ ମାତୃଭୂମିର ସ୍ୱାଧୀନତା ପାଇଁ ନିଜ ଜୀବନ ଆହୁତି ଦେଇଥିଲେ।',
      bn: 'শাস্ত্র ও যুদ্ধবিদ্যায় পারদর্শী জয়ী রাজগুরু স্বাধীনতার বেদীতে আত্মোৎসর্গ করেছিলেন।'
    },
    majorContributions: [
      {
        en: 'Conceived and organized the first anti-British confederacy of Paika warrior clans in 1804.',
        hi: '1804 में अंग्रेजों के विरुद्ध पाइका योद्धा कुलों के प्रथम संयुक्त मोर्चे का गठन किया।',
        te: '1804 లో బ్రిటిష్ వారిపై పోరాడటానికి పైకా యోధుల మొదటి మహాకూటమిని ఏర్పాటు చేశారు.',
        kn: '೧೮೦೪ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಪೈಕ ಒಕ್ಕೂಟವನ್ನು ರಚಿಸಿದರು.',
        ta: '1804 இல் ஆங்கிலேயருக்கு எதிரான முதல் பைகா கூட்டமைப்பை உருவாக்கினார்.',
        mr: '१८०४ मध्ये पाईक सैनिकांची पहिली ब्रिटिशांविरोधी आघाडी उभारली.',
        or: '୧୮୦୪ରେ ବ୍ରିଟିଶ୍ ବିରୋଧରେ ପାଇକମାନଙ୍କର ପ୍ରଥମ ମହାମେଣ୍ଟ ଗଠନ କରିଥିଲେ।',
        bn: '১৮০৪ সালে ব্রিটিশবিরোধী প্রথম ঐক্যবদ্ধ পাইক মোর্চা গড়ে তোলেন।'
      },
      {
        en: 'Immortalized the sacred oath of defending Swadharma and indigenous sovereignty.',
        hi: 'स्वधर्म और मातृभूमि की संप्रभुता की रक्षा हेतु सर्वोच्च बलिदान की अमर परंपरा स्थापित की।',
        te: 'స్వధర్మం, స్వదేశ సార్వభౌమత్వ పరిరక్షణ కోసం ప్రాణాలర్పించిన పవిత్ర ఆదర్శం.',
        kn: 'ಸ್ವಧರ್ಮ ಮತ್ತು ನಾಡಿನ ರಕ್ಷಣೆಗಾಗಿ ಪರಮ ಬಲಿದಾನದ ಆದರ್ಶ ಮೆರೆದರು.',
        ta: 'தாய்நாட்டின் மாண்பைக் காக்க தன்னுயிர் ஈந்த புனித லட்சியவாதி.',
        mr: 'स्वधर्म आणि मातृभूमीच्या रक्षणासाठी प्राणांचे बलिदान दिले.',
        or: 'ସ୍ୱଧର୍ମ ଓ ମାତୃଭୂମିର ସୁରକ୍ଷା ପାଇଁ ଆତ୍ମବଳିଦାନର ଅମର ଆଦର୍ଶ ସ୍ଥାପନ କରିଥିଲେ।',
        bn: 'স্বধর্ম ও মাতৃভূমির সার্বভৌমত্ব রক্ষায় আত্মত্যাগের অমর দৃষ্টান্ত স্থাপন করেন।'
      }
    ],
    evidenceSources: [
      'G. Toynbee, "A Sketch of the History of Orissa (1803–1828)"',
      'Board of Revenue Records, Fort William (Calcutta, 1804–1806)',
      'Dr. H.K. Mahtab, "History of Orissa", Vol. II (Jayee Rajguru Chapter)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 5. Anantavarman Chodaganga Deva
  {
    id: 'anantavarman_chodaganga_trikalinga',
    name: {
      en: 'Emperor Anantavarman Chodaganga Deva',
      hi: 'सम्राट अनंतवर्मन चोडगंग देव (त्रिकलिंगाधिपति)',
      te: 'చక్రవర్తి అనంతవర్మన్ చోడగంగ దేవ (త్రికళింగాధిపతి)',
      kn: 'ಚಕ್ರವರ್ತಿ ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ ದೇವ (ತ್ರಿಕಳಿಂಗಾಧಿಪತಿ)',
      ta: 'பேரரசர் அனந்தவர்மன் சோடகங்க தேவ (திரிகலிங்காதிபதி)',
      mr: 'सम्राट अनंतवर्मन चोडगंग देव (त्रिकलिंगाधिपती)',
      or: 'ସମ୍ରାଟ ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ (ତ୍ରିକଳିଙ୍ଗାଧିପତି)',
      bn: 'সম্রাট অনন্তবর্মণ চোড়গঙ্গ দেব (ত্রিকলিঙ্গাধ্যক্ষ)'
    },
    titles: {
      en: 'Trikalingadhipati (Lord of Three Kalingas), Sovereign of Kalinga & Utkala, Builder of the Great Jagannath Temple at Puri',
      hi: 'त्रिकलिंगाधिपति (तीनों कलिंगों के अधिपति), कलिंग एवं उत्कल के सम्राट, पुरी के भव्य श्री जगन्नाथ मंदिर के निर्माता',
      te: 'త్రికళింగాధిపతి, కళింగ మరియు ఉత్కళ సామ్రాజ్య సార్వభౌముడు, పూరీ శ్రీ జగన్నాథ మహాదేవాలయ నిర్మాత',
      kn: 'ತ್ರಿಕಳಿಂಗಾಧಿಪತಿ, ಕಳಿಂಗ ಮತ್ತು ಉತ್ಕಳದ ಚಕ್ರವರ್ತಿ, ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯ ನಿರ್ಮಾತೃ',
      ta: 'திரிகலிங்காதிபதி, பூரி ஜெகந்நாதர் பேராலயத்தை நிர்மாணித்த பேரரசர்',
      mr: 'त्रिकलिंगाधिपती, कलिंग व उत्कलचे चक्रवर्ती, पुरीच्या भव्य जगन्नाथ मंदिराचे निर्माते',
      or: 'ତ୍ରିକଳିଙ୍ଗାଧିପତି, କଳିଙ୍ଗ ଓ ଉତ୍କଳର ସାର୍ବଭୌମ ସମ୍ରାଟ, ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିରର ମହାନ ନିର୍ମାତା',
      bn: 'ত্রিকলিঙ্গাধ্যক্ষ, কলিঙ্গ ও উৎকলের অধীশ্বর, পুরীর জগন্নাথ মন্দিরের অমর নির্মাতা'
    },
    branches: [
      'Trikalinga',
      'Kalinga',
      'Utkala',
      'Odra',
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Od-Kshatriya',
      'Gajapathis',
      'Oda-Chasa'
    ],
    era: {
      en: '1077 – 1150 CE (Reigned 73 Years)',
      hi: '1077 – 1150 ईस्वी (73 वर्षों का गौरवशाली शासन)',
      te: 'సా.శ. 1077 – 1150 (73 సంవత్సరాల సుదీర్ఘ పాలన)',
      kn: '೧೦೭೭ – ೧೧೫೦ (೭೩ ವರ್ಷಗಳ ದೀರ್ಘ ಆಳ್ವಿಕೆ)',
      ta: 'பொ.ஆ. 1077 – 1150 (73 ஆண்டுகள் ஆட்சி)',
      mr: '१०७७ – ११५० (७३ वर्षांचे प्रदीर्घ राज्य)',
      or: '୧୦୭୭ – ୧୧୫୦ ଖ୍ରୀଷ୍ଟାବ୍ଦ (୭୩ ବର୍ଷର ଐତିହାସିକ ଶାସନ)',
      bn: '১০৭৭ – ১১৫০ খ্রিস্টাব্দ (৭৩ বছরের সুবিশাল শাসনকাল)'
    },
    region: {
      en: 'Puri, Kalinganagara (Mukhalingam), Cuttack, Godavari to Ganges Basin',
      hi: 'पुरी, कलिंगनगर (मुखलिंगम), कटक, गोदावरी से गंगा बेसिन',
      te: 'పూరీ, కళింగనగరం (ముఖలింగం), కటక్, గోదావరి నుండి గంగా తీరం',
      kn: 'ಪುರಿ, ಮುಖಲಿಂಗಂ, ಕಟಕ್, ಗೋದಾವರಿಯಿಂದ ಗಂಗೆಯವರೆಗೆ',
      ta: 'பூரி, முகலிங்கம், கட்டக், கோதாவரி முதல் கங்கை வரை',
      mr: 'पुरी, मुखलिंगम, कटक, गोदावरी ते गंगा खोरे',
      or: 'ପୁରୀ, କଳିଙ୍ଗନଗର (ମୁଖଲିଙ୍ଗମ), କଟକ, ଗୋଦାବରୀଠାରୁ ଗଙ୍ଗା',
      bn: 'পুরী, কলিঙ্গনগর (মুখলিঙ্গম), কটক, গোদাবরী থেকে গঙ্গা অববাহিকা'
    },
    badge: 'Trikalingadhipati & Master Temple Builder',
    summary: {
      en: 'The monumental Eastern Ganga monarch who bore the historic imperial title "Trikalingadhipati" and unified the coastal territories of Kalinga and Utkala from the Godavari to the Ganges. He commenced the construction of the colossal Jagannath Temple at Puri and excavated monumental public reservoirs across eastern India.',
      hi: 'पूर्वी गंग राजवंश के प्रतापी चक्रवर्ती जिन्होंने "त्रिकलिंगाधिपति" की उपाधि धारण की और गोदावरी से गंगा तक कलिंग, उत्कल और ओड्र को एकजुट किया। उन्होंने विश्वप्रसिद्ध पुरी के श्री जगन्नाथ मंदिर के भव्य गर्भगृह का निर्माण आरंभ कराया और विशाल जनकल्याणकारी जलाशयों की स्थापना की।',
      te: '"త్రికళింగాధిపతి" బిరుదాంకితుడైన తూర్పు గాంగ చక్రవర్తి. గోదావరి నుండి గంగ వరకు కళింగ, ఉత్కళ భూములను ఏకంచేసి, నేటి ప్రపంచ ప్రసిద్ధ పూరీ శ్రీ జగన్నాథ మందిర నిర్మాణాన్ని ప్రారంభించి, వేలాది వ్యవసాయ చెరువులను తవ్వించిన దార్శనిక పాలకుడు.',
      kn: 'ತ್ರಿಕಳಿಂಗಾಧಿಪತಿ ಬಿರುದಾಂಕಿತ ಚಕ್ರವರ್ತಿ. ಪುರಿಯ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ನಿರ್ಮಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ ಜನೋಪಯೋಗಿ ಕೆರೆಗಳನ್ನು ಕಟ್ಟಿಸಿದರು.',
      ta: 'திரிகலிங்காதிபதி என்று போற்றப்பட்ட மாமன்னர். பூரி ஜெகந்நாதர் கோயிலைத் தொடங்கி வைத்து பல நீர்த்தேக்கங்களை அமைத்தார்.',
      mr: 'त्रिकलिंगाधिपती म्हणून गौरवलेले सम्राट ज्यांनी पुरीच्या जगन्नाथ मंदिराची पायाभरणी केली आणि शेतीसाठी भव्य तलाव बांधले.',
      or: 'ପ୍ରସିଦ୍ଧ "ତ୍ରିକଳିଙ୍ଗାଧିପତି" ଉପାଧିଧାରୀ ସମ୍ରାଟ। ପୁରୀ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ନିର୍ମାଣ ଆରମ୍ଭ କରି କଳିଙ୍ଗ ଓ ଉତ୍କଳକୁ ଏକତ୍ର କରିଥିଲେ।',
      bn: 'ত্রিকলিঙ্গাধ্যক্ষ উপাধিতে ভূষিত মহান সম্রাট। পুরীর জগন্নাথ মন্দিরের নির্মাণকাজ শুরু করেন এবং প্রভূত জলাশয় খনন করান।'
    },
    biography: {
      en: 'Ruling for over seven decades, Chodaganga Deva shifted his imperial capital from Mukhalingam on the Vamsadhara to Cuttack (Barabati). He was a patron of Tamil, Telugu, Sanskrit, and Odia stone architects. His Korni copper plates and inscriptions at Draksharama confirm his undisputed sovereignty across all three regions of Trikalinga.',
      hi: 'सात दशकों से अधिक समय तक शासन करते हुए चोडगंग देव ने राजधानी को मुखलिंगम से कटक स्थानांतरित किया। उन्होंने द्राक्षाराम और कोर्णी ताम्रपत्रों में अपनी विजयों का उल्लेख किया।',
      te: 'ఏడు దశాబ్దాల సుదీర్ఘ పాలనలో రాజధానిని ముఖలింగం నుండి కటక్ కు మార్చారు. ద్రాక్షారామ మరియు కోర్నీ తామ్రపత్రాలలో వీరి శాసనాలు ఉన్నాయి.',
      kn: 'ಮುಖಲಿಂಗಂನಿಂದ ಕಟಕ್‌ಗೆ ರಾಜಧಾನಿಯನ್ನು ಬದಲಾಯಿಸಿದರು.',
      ta: 'தலைநகரை முகலிங்கத்திலிருந்து கட்டக்கிற்கு மாற்றினார்.',
      mr: 'आपली राजधानी मुखलिंगमवरून कटक येथे हलवून त्यांनी प्रदीर्घ काळ राज्य केले.',
      or: 'ରାଜଧାନୀକୁ ମୁଖଲିଙ୍ଗମରୁ କଟକ ସ୍ଥାନାନ୍ତର କରି ବିଶାଳ ସାମ୍ରାଜ୍ୟ ଶାସନ କରିଥିଲେ।',
      bn: 'মুখলিঙ্গম থেকে কটকে রাজধানী স্থানান্তরিত করে সুদীর্ঘ কাল শাসনকার্য পরিচালনা করেন।'
    },
    majorContributions: [
      {
        en: 'Founded the architectural construction of the monumental Jagannath Temple at Puri.',
        hi: 'पुरी के विश्वप्रसिद्ध भव्य श्री जगन्नाथ मंदिर के निर्माण की आधारशिला रखी।',
        te: 'పూరీ జగన్నాథ మహాదేవాలయ నిర్మాణానికి నాంది పలికారు.',
        kn: 'ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ನಿರ್ಮಾಣಕ್ಕೆ ಅಡಿಪಾಯ ಹಾಕಿದರು.',
        ta: 'பூரி ஜெகந்நாதர் பெருங்கோயிலின் கட்டுமானத்தைத் தொடங்கி வைத்தார்.',
        mr: 'पुरीच्या भव्य जगन्नाथ मंदिराच्या उभारणीची सुरुवात केली.',
        or: 'ପୁରୀର ବିଶାଳ ଶ୍ରୀଜଗନ୍ନାଥ ମନ୍ଦିର ନିର୍ମାଣର ଶୁଭାରମ୍ଭ କରିଥିଲେ।',
        bn: 'পুরীর জগন্নাথ মন্দিরের সুবিশাল স্থাপত্যের সূচনা করেন।'
      },
      {
        en: 'United Kalinga, Utkala, and Trikalinga into a single prosperous eastern civilization.',
        hi: 'कलिंग, उत्कल और त्रिकलिंग को जोड़कर समृद्ध पूर्वी भारतीय सभ्यता का विकास किया।',
        te: 'కళింగ, ఉత్కళ, త్రికళింగ ప్రాంతాలను కలిపి సుసంపన్నమైన నాగరికతను నిర్మించారు.',
        kn: 'ಕಳಿಂಗ ಮತ್ತು ಉತ್ಕಳವನ್ನು ಒಂದುಗೂಡಿಸಿ ಸಮೃದ್ಧ ಸಾಮ್ರಾಜ್ಯವನ್ನು ರೂಪಿಸಿದರು.',
        ta: 'கலிங்கம் மற்றும் உத்கலத்தை ஒன்றிணைத்து நாகரிகத்தை வளர்த்தார்.',
        mr: 'कलिंग, उत्कल आणि त्रिकलिंगाची एकात्मता साधून संस्कृती समृद्ध केली.',
        or: 'କଳିଙ୍ଗ ଓ ଉତ୍କଳକୁ ଯୋଡ଼ି ସମୃଦ୍ଧ ସଭ୍ୟତା ଗଠନ କରିଥିଲେ।',
        bn: 'কলিঙ্গ ও উৎকলকে যুক্ত করে একটি সমৃদ্ধ সভ্যতার ভিত্তি স্থাপন করেন।'
      }
    ],
    evidenceSources: [
      'Korni Copper Plate Grants of Anantavarman Chodaganga (Journal of Andhra Historical Research Society)',
      'Draksharama Bhimeswara Temple Epigraphs of Chodaganga Deva (South Indian Inscriptions, Vol. IV)',
      'Epigraphia Indica, Vol. XXVIII (Puri Copper Plates)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 6. Purushottama Deva Gajapathi
  {
    id: 'purushottama_deva_gajapathi',
    name: {
      en: 'Emperor Purushottama Deva Gajapathi',
      hi: 'सम्राट पुरुषोत्तम देव गजपति',
      te: 'చక్రవర్తి పురుషోత్తమ దేవ గజపతి',
      kn: 'ಚಕ್ರವರ್ತಿ ಪುರುಷೋತ್ತಮ ದೇವ ಗಜಪತಿ',
      ta: 'பேரரசர் புருஷோத்தம தேவ கஜபதி',
      mr: 'सम्राट पुरुषोत्तम देव गजपती',
      or: 'ସମ୍ରାଟ ପୁରୁଷୋତ୍ତମ ଦେବ ଗଜପତି',
      bn: 'সম্রাট পুরুষোত্তম দেব গজপতি'
    },
    titles: {
      en: 'Hero of Kanchi-Kaveri Expedition, Sovereign Devotee of Lord Jagannatha, Gaudesvara Navakoti Karnata Kalaburagesvara',
      hi: 'कांची-कावेरी विजय के नायक, श्री जगन्नाथ के परम भक्त सम्राट, गौडेश्वर नवकोटि कर्णाट कलबुर्गीश्वर',
      te: 'కాంచీ-కావేరీ దిగ్విజయ వీరుడు, శ్రీ జగన్నాథుని పరమ భక్తుడు, సూర్యవంశ చక్రవర్తి',
      kn: 'ಕಾಂಚಿ-ಕಾವೇರಿ ದಂಡಯಾತ್ರೆಯ ನಾಯಕ, ಜಗನ್ನಾಥನ ಪರಮ ಭಕ್ತ',
      ta: 'காஞ்சி-காவிரிப் போரின் வெற்றி நாயகர், ஜெகந்நாதரின் பரம பக்தர்',
      mr: 'कांची-कावेरी मोहिमेचे महानायक, श्री जगन्नाथांचे परम भक्त सम्राट',
      or: 'କାଞ୍ଚି-କାବେରୀ ଅଭିଯାନର ମହାନାୟକ, ପ୍ରଭୁ ଶ୍ରୀଜଗନ୍ନାଥଙ୍କ ପରମ ସେବକ',
      bn: 'কাঞ্চি-কাবেরী অভিযানের মহাবীর, জগন্নাথের পরম ভক্ত সম্রাট'
    },
    branches: [
      'Gajapathi RauthRai',
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddeRajulu',
      'Kalinga',
      'Utkala',
      'Trikalinga',
      'Gajapathis',
      'Odra',
      'Od-Kshatriya',
      'Od'
    ],
    era: {
      en: '1466 – 1497 CE',
      hi: '1466 – 1497 ईस्वी',
      te: 'సా.శ. 1466 – 1497',
      kn: 'ಕ್ರಿ.ಶ. 1466 – 1497',
      ta: 'பொ.ஆ. 1466 – 1497',
      mr: 'इ.स. १४६६ – १४९७',
      or: 'ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୪୬୬ – ୧୪୯୭',
      bn: '১৪৬৬ – ১৪৯৭ খ্রিস্টাব্দ'
    },
    region: {
      en: 'Utkala, Kalinga, Odra Desha, Kanchi, Southern Coromandel, & Puri',
      hi: 'उत्कल, कलिंग, ओड्र देश, कांची, दक्षिणी कोरोमंडल तट और पुरी',
      te: 'ఉత్కళ, కళింగ, ఓడ్ర దేశం, కాంచీపురం మరియు పూరీ జగన్నాథ క్షేత్రం',
      kn: 'ಉತ್ಕಳ, ಕಳಿಂಗ, ಓಡ್ರ ದೇಶ, ಕಂಚಿ ಮತ್ತು ಪುರಿ',
      ta: 'உத்கலம், கலிங்கம், ஓட்ர தேசம், காஞ்சிபுரம் மற்றும் பூரி',
      mr: 'उत्कल, कलिंग, ओड्र देश, कांची आणि पुरी',
      or: 'ଉତ୍କଳ, କଳିଙ୍ଗ, ଓଡ଼୍ର ଦେଶ, କାଞ୍ଚି ଓ ପୁରୀ',
      bn: 'উৎকল, কলিঙ্গ, ওড্র দেশ, কাঞ্চীপুরম ও পুরী'
    },
    badge: 'Chivalric & Devotional Monarch',
    summary: {
      en: 'Celebrated Suryavamsha Gajapathi emperor famed for the historic Kanchi-Kaveri military expedition and literary classics. Mobilizing the combined Paika and Kshatriya Rajulu divisions, he secured the southern bounds of Utkala and Kalinga, instituting grand temple waterworks and civic tanks.',
      hi: 'कांची-कावेरी विजय के अमर नायक और संस्कृत साहित्य के विद्वान सम्राट। उत्कल और कलिंग की पाइका व क्षत्रिय राजुलु सेनाओं का नेतृत्व करते हुए उन्होंने साम्राज्य की सीमाओं की रक्षा की और विशाल जलाशयों का निर्माण कराया।',
      te: 'ప్రసిద్ధ కాంచీ-కావేరీ దిగ్విజయ గాథానాయకుడు. ఉత్కళ, కళింగ పైకా మరియు క్షత్రియ రాజుల సేనలతో కాంచీపై విజయం సాధించి, జగన్నాథుని సమక్షంలో ప్రజాసేవే పరమావధి అని నిరూపించిన మహోన్నత చక్రవర్తి.',
      kn: 'ಕಾಂಚಿ-ಕಾವೇರಿ ದಂಡಯಾತ್ರೆಯ ಮೂಲಕ ಖ್ಯಾತಿಗಳಿಸಿದ ಸೂರ್ಯವಂಶ ದೊರೆ. ಕಾಂಚಿಯಿಂದ ವಿಜಯಶಾಲಿಯಾಗಿ ಮರಳಿ ವಿಶಾಲ ಜಲಾಶಯಗಳನ್ನು ಕಟ್ಟಿಸಿದರು.',
      ta: 'காஞ்சி-காவிரிப் போரில் வெற்றி பெற்ற ஒப்பற்ற கஜபதி அரசர். பூரியில் பல பொதுக் குளங்களையும் அமைத்தவர்.',
      mr: 'कांची-कावेरी मोहिमेचे अमर नायक. त्यांनी उत्कल व कलिंगाच्या सीमांचे रक्षण करून भव्य तलाव उभारले.',
      or: 'ପ୍ରସିଦ୍ଧ କାଞ୍ଚି-କାବେରୀ ଅଭିଯାନର ଅମର ନାୟକ। ଉତ୍କଳ ଓ କଳିଙ୍ଗର ପାଇକ ସୈନ୍ୟବାହିନୀ ସହିତ କାଞ୍ଚି ବିଜୟ କରିଥିଲେ।',
      bn: 'কাঞ্চি-কাবেরী বিজয়ের অমর নায়ক। উৎকল ও কলিঙ্গের পাইক সৈন্য নিয়ে দক্ষিণ ভারত জয় করেন।'
    },
    biography: {
      en: 'Purushottama Deva was crowned as Kapilendra Deva’s successor. When the Saluva ruler of Kanchi rejected his marriage alliance, Purushottama launched the legendary Kanchi campaign, returning victorious with royal deities and establishing enduring peace. His Abhinava Gitagovinda and epigraphs attest to his cultural and strategic genius.',
      hi: 'कपिलेंद्र देव के उत्तराधिकारी पुरुषोत्तम देव ने सालुव नरसिंह को कांची में पराजित किया। उन्होंने पुरी में रत्नसिंहासन और कई मंदिरों का जीर्णोद्धार किया। उनका शासनकाल ओड्र संस्कृति का स्वर्णकाल था।',
      te: 'సా.శ. 1466లో రాజ్యానికి వచ్చిన పురుషోత్తమ దేవుడు కాంచీపురంపై దండెత్తి సాలువ నరసింహరాయలను ఓడించారు. పూరీలో మాదళ పాంజీ ప్రకారం ఎన్నో చెరువులు, కాలువలు తవ్వించి శిల్పకళను కాపాడారు.',
      kn: 'ಪುರುಷೋತ್ತಮ ದೇವ ಸಾಲುವ ನರಸಿಂಹನನ್ನು ಸೋಲಿಸಿ ಕಾಂಚಿಯಿಂದ ವಿಜಯಶಾಲಿಯಾಗಿ ಮರಳಿದರು.',
      ta: 'கபிலேந்திர தேவரின் வழித்தோன்றலான புருஷோத்தம தேவர் காஞ்சியை வென்று புகழ்பெற்றார்.',
      mr: 'पुरुषोत्तम देवांनी साळुव नरसिंहाचा पराभव करून कांची मोहीम यशस्वी केली.',
      or: 'ପୁରୁଷୋତ୍ତମ ଦେବ କାଞ୍ଚି ବିଜୟ କରି ରତ୍ନସିଂହାସନ ଓ ମନ୍ଦିର ନିର୍ମାଣ କାର୍ଯ୍ୟକୁ ତ୍ୱରାନ୍ୱିତ କରିଥିଲେ।',
      bn: 'পুরুষোত্তম দেব কাঞ্চী জয় করে মন্দির শিল্পকলা ও সেচব্যবস্থার প্রভূত উন্নতি সাধন করেন।'
    },
    majorContributions: [
      {
        en: 'Led the historic Kanchi campaign preserving the honor and frontiers of Utkala and Kalinga.',
        hi: 'ऐतिहासिक कांची अभियान का सफल नेतृत्व कर उत्कल और कलिंग के सम्मान की रक्षा की।',
        te: 'చారిత్రక కాంచీ దండయాత్రను నడిపి ఉత్కళ, కళింగ సామ్రాజ్యాల ప్రతిష్టను నిలబెట్టారు.',
        kn: 'ಕಾಂಚಿ ದಂಡಯಾತ್ರೆಯನ್ನು ಮುನ್ನಡೆಸಿ ಸಾಮ್ರಾಜ್ಯದ ಗೌರವ ಕಾಪಾಡಿದರು.',
        ta: 'காஞ்சிப் போரை வழிநடத்தி சாம்ராஜ்யத்தின் பெருமையைக் காத்தார்.',
        mr: 'कांची मोहिमेचे यशस्वी नेतृत्व करून साम्राज्याची प्रतिष्ठा वाढवली.',
        or: 'ଐତିହାସିକ କାଞ୍ଚି ଅଭିଯାନର ନେତୃତ୍ୱ ନେଇ ସାମ୍ରାଜ୍ୟର ଗୌରବ ବୃଦ୍ଧି କରିଥିଲେ।',
        bn: 'ঐতিহাসিক কাঞ্চী অভিযান সফল করে সাম্রাজ্যের মর্যাদা রক্ষা করেন।'
      },
      {
        en: 'Instituted enduring civic and temple waterworks across the coastal delta belt.',
        hi: 'तटीय डेल्टा क्षेत्रों में विशाल जनकल्याणकारी जलाशयों का निर्माण कराया।',
        te: 'తీరప్రాంత డెల్టాలో భారీ ప్రజా జలాశయాలు, కాలువలు నిర్మించారు.',
        kn: 'ಕರಾವಳಿ ಪ್ರದೇಶಗಳಲ್ಲಿ ಸಾರ್ವಜನಿಕ ಕೆರೆಗಳನ್ನು ನಿರ್ಮಿಸಿದರು.',
        ta: 'கடற்கரைப் பகுதிகளில் பல நீர்நிலைகளை உருவாக்கினார்.',
        mr: 'किनारपट्टी भागात विशाल जलसाठे निर्माण केले.',
        or: 'ଉପକୂଳ ଅଞ୍ଚଳରେ ବିଶାଳ ଜଳାଶୟ ଓ ପୋଖରୀ ନିର୍ମାଣ କରିଥିଲେ।',
        bn: 'উপকূলীয় অঞ্চলে বহু দিঘি ও জলাশয় খনন করান।'
      }
    ],
    evidenceSources: [
      'Puri Jagannath Temple Inscriptions of Purushottama Deva (Epigraphia Indica)',
      'Potavaram Grant of Purushottama Gajapati (Inscriptions of Andhra Pradesh)',
      'K.C. Panigrahi, "History of Orissa (Hindu Period)"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 7. Prataparudra Deva Gajapathi
  {
    id: 'prataparudra_deva_gajapathi',
    name: {
      en: 'Emperor Prataparudra Deva Gajapathi',
      hi: 'सम्राट प्रतापरुद्र देव गजपति',
      te: 'చక్రవర్తి ప్రతాపరుద్ర దేవ గజపతి',
      kn: 'ಚಕ್ರವರ್ತಿ ಪ್ರತಾಪರುದ್ರ ದೇವ ಗಜಪತಿ',
      ta: 'பேரரசர் பிரதாபருத்ர தேவ கஜபதி',
      mr: 'सम्राट प्रतापरुद्र देव गजपती',
      or: 'ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ ଗଜପତି',
      bn: 'সম্রাট প্রতাপরুদ্র দেব গজপতি'
    },
    titles: {
      en: 'Scholar-Emperor of Utkala & Kalinga, Author of Sarasvati Vilasam, Royal Patron of Sri Chaitanya Mahaprabhu',
      hi: 'उत्कल एवं कलिंग के विद्वान सम्राट, सरस्वती विलासम के रचयिता, श्री चैतन्य महाप्रभु के परम आश्रयदाता',
      te: 'ఉత్కళ-కళింగ విద్వత్ చక్రవర్తి, సరస్వతీ విలాస గ్రంథ కర్త, శ్రీ చైతన్య మహాప్రభువుల పరమ భక్తుడు',
      kn: 'ಉತ್ಕಳ-ಕಳಿಂಗದ ವಿದ್ವತ್ ಚಕ್ರವರ್ತಿ, ಸರಸ್ವತೀ ವಿಲಾಸಂ ಗ್ರಂಥಕರ್ತ, ಶ್ರೀ ಚೈತನ್ಯರ ಆಶ್ರಯದಾತ',
      ta: 'அறிஞர் மன்னர், சரஸ்வதி விலாசம் நூலின் ஆசிரியர், ஸ்ரீ சைதன்யரின் புரவலர்',
      mr: 'विद्वान सम्राट, सरस्वती विलासमचे लेखक, श्री चैतन्य महाप्रभूंचे आश्रयदाते',
      or: 'ଉତ୍କଳ ଓ କଳିଙ୍ଗର ବିଦ୍ୱାନ ସମ୍ରାଟ, ସରସ୍ୱତୀ ବିଳାସମ୍‌ର ରଚୟିତା, ଶ୍ରୀଚୈତନ୍ୟ ମହାପ୍ରଭୁଙ୍କ ପରମ ଆଶ୍ରୟଦାତା',
      bn: 'পণ্ডিত সম্রাট, সরস্বতী বিলাসম রচয়িতা, শ্রীচৈতন্য মহাপ্রভুর প্রধান পৃষ্ঠপোষক'
    },
    branches: [
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'Utkala',
      'Kalinga',
      'Trikalinga',
      'Gajapathis',
      'Odra',
      'Od-Kshatriya',
      'Odiyaraju'
    ],
    era: {
      en: '1497 – 1540 CE',
      hi: '1497 – 1540 ईस्वी',
      te: 'సా.శ. 1497 – 1540',
      kn: 'ಕ್ರಿ.ಶ. 1497 – 1540',
      ta: 'பொ.ஆ. 1497 – 1540',
      mr: 'इ.स. १४९७ – १५४०',
      or: 'ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୪୯୭ – ୧୫୪୦',
      bn: '১৪৯৭ – ১৫৪০ খ্রিস্টাব্দ'
    },
    region: {
      en: 'Utkala, Kalinga, Cuttack, Puri, Andhra Frontiers, & Kondavidu',
      hi: 'उत्कल, कलिंग, कटक, पुरी, आंध्र सीमाएं और कोंडावीडु',
      te: 'ఉత్కళ, కళింగ, కటక్, పూరీ, ఆంధ్ర సరిహద్దులు మరియు కొండవీడు',
      kn: 'ಉತ್ಕಳ, ಕಳಿಂಗ, ಕಟಕ್, ಪುರಿ, ಆಂಧ್ರ ಗಡಿಗಳು',
      ta: 'உத்கலம், கலிங்கம், கட்டக், பூரி மற்றும் ஆந்திர எல்லைகள்',
      mr: 'उत्कल, कलिंग, कटक, पुरी व आंध्र सीमा',
      or: 'ଉତ୍କଳ, କଳିଙ୍ଗ, କଟକ, ପୁରୀ, ଆନ୍ଧ୍ର ସୀମାନ୍ତ ଏବଂ କୋଣ୍ଡାଭିଡୁ',
      bn: 'উৎকল, কলিঙ্গ, কটক, পুরী ও অন্ধ্র সীমান্ত'
    },
    badge: 'Scholar & Spiritual Monarch',
    summary: {
      en: 'Suryavamsha Kshatriya emperor of Utkala and Kalinga who authored the legal treatise Sarasvati Vilasam and provided royal shelter to Sri Chaitanya Mahaprabhu. He defended the realm against Bengal Sultanate forces and established diplomatic accords along the Krishna River.',
      hi: 'उत्कल और कलिंग के सूर्यवंशी क्षत्रिय सम्राट जिन्होंने "सरस्वती विलासम" की रचना की और श्री चैतन्य महाप्रभु को राज्याश्रय दिया। उन्होंने उत्तर से बंगाल के सुल्तानों से रक्षा की और कृष्णा नदी पर स्थायी सीमाएं निर्धारित कीं।',
      te: 'ఉత్కళ, కళింగ సూర్యవంశ క్షత్రియ చక్రవర్తి. భారతీయ న్యాయశాస్త్ర గ్రంథం "సరస్వతీ విలాసం" రచించి, శ్రీ చైతన్య మహాప్రభువులను ఆదరించి, కృష్ణా నదిని సరిహద్దుగా నిలిపిన ధర్మరాజు.',
      kn: 'ಕಾನೂನು ಗ್ರಂಥ "ಸರಸ್ವತೀ ವಿಲಾಸಂ" ರಚಿಸಿದ ಮಹಾನ್ ವಿದ್ವಾಂಸ ರಾಜ. ಶ್ರೀ ಚೈತನ್ಯರಿಗೆ ರಾಜಾಶ್ರಯ ನೀಡಿದರು.',
      ta: 'சரஸ்வதி விலாசம் சட்ட நூலை இயற்றிய அறிவார்ந்த பேரரசர். ஸ்ரீ சைதன்யருக்கு ஆதரவளித்தார்.',
      mr: 'सरस्वती विलासम ग्रंथाचे लेखक आणि श्री चैतन्य महाप्रभूंचे मुख्य आश्रयदाते.',
      or: 'ବିଧି ଗ୍ରନ୍ଥ "ସରସ୍ୱତୀ ବିଳାସମ୍" ରଚନା କରିଥିବା ବିଦ୍ୱାନ ସମ୍ରାଟ ଯିଏ ଶ୍ରୀଚୈତନ୍ୟ ମହାପ୍ରଭୁଙ୍କୁ ଆଶ୍ରୟ ଦେଇଥିଲେ।',
      bn: 'আইনগ্রন্থ সরস্বতী বিলাসমের রচয়িতা এবং শ্রীচৈতন্য মহাপ্রভুর প্রধান পৃষ্ঠপোষক সম্রাট।'
    },
    biography: {
      en: 'Ruling during a dynamic epoch in Indian history, Prataparudra maintained Puri as the spiritual heart of eastern India. His treaty with Vijayanagara emperor Krishnadevaraya in 1519 CE established peaceful diplomatic borders along the Krishna River.',
      hi: 'प्रतापरुद्र देव का शासनकाल भक्ति आंदोलन का काल था। 1519 ईस्वी में सम्राट कृष्णदेवराय के साथ संधि के उपरांत कृष्णा नदी को दोनों साम्राज्यों की स्थायी सीमा निर्धारित किया गया।',
      te: 'సా.శ. 1497 నుండి 1540 వరకు పాలించిన ప్రతాపరుద్ర దేవుడు శ్రీకృష్ణదేవరాయలతో 1519లో సంధి చేసుకుని కృష్ణా నదిని సరిహద్దుగా స్థిరపరిచారు.',
      kn: '೧೫೧೯ರಲ್ಲಿ ಕೃಷ್ಣದೇವರಾಯನೊಂದಿಗೆ ಒಪ್ಪಂದ ಮಾಡಿಕೊಂಡು ಕೃಷ್ಣಾ ನದಿಯನ್ನು ಗಡಿಯಾಗಿ ನಿಗದಿಪಡಿಸಿದರು.',
      ta: '1519 இல் கிருஷ்ணதேவராயருடன் அமைதி ஒப்பந்தம் செய்துகொண்டு எல்லையை உறுதி செய்தார்.',
      mr: '१५१९ मध्ये कृष्णदेवरायांसोबत तह करून कृष्णा नदी ही दोन्ही साम्राज्यांची सीमा बनवली.',
      or: '୧୫୧୯ରେ ଶ୍ରୀକୃଷ୍ଣଦେବରାୟଙ୍କ ସହିତ ସନ୍ଧି କରି କୃଷ୍ଣା ନଦୀକୁ ସ୍ଥାୟୀ ସୀମା ଭାବେ ସ୍ଥିର କରିଥିଲେ।',
      bn: '১৫১৯ খ্রিস্টাব্দে কৃষ্ণদেবরায়ের সাথে শান্তিচুক্তি স্বাক্ষর করে কৃষ্ণা নদীকে সীমান্ত হিসেবে নির্ধারণ করেন।'
    },
    majorContributions: [
      {
        en: 'Authored the comprehensive Sanskrit legal encyclopaedia "Sarasvati Vilasam".',
        hi: 'विशाल संस्कृत विधि विश्वकोश "सरस्वती विलासम" का प्रणयन किया।',
        te: 'సమగ్ర సంస్కృత ధర్మశాస్త్ర గ్రంథం "సరస్వతీ విలాసం" రచించారు.',
        kn: 'ಸಂಸ್ಕೃತ ಧರ್ಮಶಾಸ್ತ್ರ "ಸರಸ್ವತೀ ವಿಲಾಸಂ" ರಚಿಸಿದರು.',
        ta: 'சரஸ்வதி விலாசம் என்ற சமஸ்கிருத சட்டக் களஞ்சியத்தை இயற்றினார்.',
        mr: 'संस्कृत विधिग्रंथ "सरस्वती विलासम" चे लेखन केले.',
        or: 'ସଂସ୍କୃତ ଆଇନ ଗ୍ରନ୍ଥ "ସରସ୍ୱତୀ ବିଳାସମ୍" ରଚନା କରିଥିଲେ।',
        bn: 'সংস্কৃত আইন বিশ্বকোষ "সরস্বতী বিলাসম" রচনা করেন।'
      },
      {
        en: 'Preserved and endowed Jagannatha Puri as the paramount devotional sanctuary.',
        hi: 'पुरी जगन्नाथ धाम को सर्वोच्च आध्यात्मिक केंद्र के रूप में संरक्षित रखा।',
        te: 'పూరీ జగన్నాథ ధామాన్ని అత్యున్నత ఆధ్యాత్మిక నిలయంగా నిలిపారు.',
        kn: 'ಪುರಿ ಜಗನ್ನಾಥ ಕ್ಷೇತ್ರವನ್ನು ಭಕ್ತಿ ಚಳವಳಿಯ ಪ್ರಮುಖ ತಾಣವಾಗಿ ಪೋಷಿಸಿದರು.',
        ta: 'பூரி ஜெகந்நாதர் தலத்தை பக்தி இயக்கத்தின் மையமாக நிலைநிறுத்தினார்.',
        mr: 'पुरी जगन्नाथ धामला भक्ती चळवळीचे अग्रगण्य केंद्र म्हणून संवर्धित केले.',
        or: 'ପୁରୀ ଜଗନ୍ନାଥ କ୍ଷେତ୍ରକୁ ଭକ୍ତି ଆନ୍ଦୋଳନର ଶ୍ରେଷ୍ଠ କେନ୍ଦ୍ର ଭାବରେ ସଂରକ୍ଷଣ କରିଥିଲେ।',
        bn: 'পুরী জগন্নাথ ধামকে ভক্তি আন্দোলনের কেন্দ্রবিন্দু হিসেবে সযত্নে রক্ষা করেন।'
      }
    ],
    evidenceSources: [
      'Sarasvati Vilasam (Text edited by Dr. R. Shamasastry)',
      'Chaitanya Charitamrita of Krishnadasa Kaviraja Goswami',
      'Undavalli & Kondavidu Epigraphs of Prataparudra Deva'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 8. Maharshi Raja Bhagiratha
  {
    id: 'maharshi_raja_bhagiratha',
    name: {
      en: 'Maharshi Raja Bhagiratha',
      hi: 'महर्षि राजा भगीरथ',
      te: 'మహర్షి రాజా భగీరథుడు',
      kn: 'ಮಹರ್ಷಿ ರಾಜಾ ಭಗೀರಥ',
      ta: 'மகரிஷி ராஜா பகீரதன்',
      mr: 'महर्षि राजा भगीरथ',
      or: 'ମହର୍ଷି ରାଜା ଭଗୀରଥ',
      bn: 'মহর্ষি রাজা ভগীরথ'
    },
    titles: {
      en: 'Suryavamsha Ikshvaku Sovereign, Supreme Hydraulic Progenitor of Earth-Carvers, Canallers, Oda-Chasa & OddeRajulu',
      hi: 'सूर्यवंशी इक्ष्वाकु सम्राट, जल-अभियांत्रिकी व पाषाण-शिल्पियों, ओडा-चासा व ओड्डेराजुलु के आदिपुरुष',
      te: 'సూర్యవంశ ఇక్ష్వాకు చక్రవర్తి, గంగావతరణ శిల్పి, వడ్డెర-ఒడ్డే-ఒడ్డార్-ఓడా చాసా వంశాల ఆరాధ్య దైవం',
      kn: 'ಸೂರ್ಯವಂಶ ಇಕ್ಷ್ವಾಕು ಚಕ್ರವರ್ತಿ, ಗಂಗಾವತರಣ ಪುರುಷ, ಕಲ್ಲು-ಜಲಶಿಲ್ಪಿಗಳ ಆದಿಪುರುಷ',
      ta: 'சூர்யவம்ச இக்ஷ்வாகு பேரரசர், கங்கையை பூமிக்குக் கொணர்ந்த நீரியல் மூதாதையர்',
      mr: 'सूर्यवंशी इक्ष्वाकु सम्राट, भागीरथी गंगा भूमीवर आणणारे आदिपुरुष',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଇକ୍ଷ୍ୱାକୁ ସମ୍ରାଟ, ଗଙ୍ଗାବତରଣର ମହାନ୍ ଶିଳ୍ପୀ ଓ ଆଦିପୁରୁଷ',
      bn: 'সূর্যবংশীয় ইক্ষ্বাকু সম্রাট, মর্ত্যে গঙ্গা আনয়নকারী জল-প্রকৌশল আদিপুরুষ'
    },
    branches: [
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddeRajulu',
      'VaddeRajulu',
      'Oda-Chasa',
      'Od-Khandayaths',
      'Odar',
      'Wadar',
      'Ottar',
      'Oad',
      'Od',
      'Oad-Rajputh',
      'Odde',
      'vadde',
      'Vaddera',
      'Oddar',
      'Vaddar',
      'Waddar'
    ],
    era: {
      en: 'Ancient Treta Yuga / Vedic Suryavamsha Progenitor Era',
      hi: 'प्राचीन त्रेता युग / वैदिक सूर्यवंश पूर्वज काल',
      te: 'ప్రాచీన త్రేతాయుగం / వైదిక సూర్యవంశ మూలపురుష కాలం',
      kn: 'ಪ್ರಾಚೀನ ತ್ರೇತಾಯುಗ / ಸೂರ್ಯವಂಶ ಆದಿ ಕಾಲ',
      ta: 'தொன்மையான த்ரேதா யுகம் / சூர்யவம்ச முந்தைய காலம்',
      mr: 'प्राचीन त्रेतायुग / सूर्यवंशीय पूर्वज काळ',
      or: 'ପ୍ରାଚୀନ ତ୍ରେତା ଯୁଗ / ବୈଦିକ ସୂର୍ଯ୍ୟବଂଶ ଆଦିକାଳ',
      bn: 'প্রাচীন ত্রেতা যুগ / বৈদিক সূর্যবংশ আদি যুগ'
    },
    region: {
      en: 'Himalayas, Indo-Gangetic Plains, & Pan-Indian River Basins',
      hi: 'हिमालय, गंगा-यमुना दोआब और संपूर्ण भारतवर्ष के नदी बेसिन',
      te: 'హిమాలయాలు, గంగా మైదానాలు మరియు యావద్భారత నదీ లోయలు',
      kn: 'ಹಿಮಾಲಯ ಮತ್ತು ಗಂಗಾ ಬಯಲು ಪ್ರದೇಶಗಳು',
      ta: 'இமயமலை மற்றும் கங்கைச் சமவெளிப் பகுதிகள்',
      mr: 'हिमालय आणि गंगा खोरे',
      or: 'ହିମାଳୟ, ଗଙ୍ଗା ଉପତ୍ୟକା ଓ ସମଗ୍ର ଭାରତୀୟ ଜଳାଶୟ କ୍ଷେତ୍ର',
      bn: 'হিমালয় ও গাঙ্গেয় সমভূমি অঞ্চল'
    },
    badge: 'Supreme Progenitor & Hydraulic Pioneer',
    summary: {
      en: 'Revered ancestral patriarch of all earth-excavating, stone-carving, and agrarian irrigation communities (Suryavamsha Kshatriya, OddeRajulu, VaddeRajulu, Oda-Chasa, Od-Khandayaths, Odar, Wadar, Ottar). His unmatched feat of bringing the Ganga stands as the civilizational symbol of hydraulic determination and artisanal mastery.',
      hi: 'सूर्यवंश क्षत्रिय, ओड्डेराजुलु, वड्डेराजुलु, ओडा-चासा, ओडार, वाडार, ओट्टार समाजों के परम आराध्य पूर्वज। पहाड़ों को काटकर गंगा की धारा को मरुभूमि से सागर तक ले जाने का उनका भागीरथ प्रयास आज भी अदम्य परिश्रम और जल-वास्तुकला का अमर प्रतीक है।',
      te: 'సూర్యవంశ క్షత్రియులు, ఒడ్డేరాజులు, వడ్డేరాజులు, ఓడా-చాసా, ఒడార్, వాడార్, ఒట్టార్ సమాజాల పరమ పూజ్య మూలపురుషుడు. కొండలను పిండిచేసి, రాతిని చీల్చి, ఆకాశగంగను భూమికి రప్పించిన భగీరథుని సాహసం మానవ సంకల్పానికి తలమానికం.',
      kn: 'ಕಲ್ಲು ಒಡೆಯುವ, ಕೆರೆ ತೋಡುವ ಒಡ್ಡೆ, ಒಡ್ಡೇರಾಜುಲು, ವಡ್ಡೇರ ಸಮುದಾಯಗಳ ಪರಮ ಆದಿಪುರುಷ.',
      ta: 'கல் உடைப்பவர்கள் மற்றும் நீர்நிலைகளை அமைக்கும் சமூகங்களின் வணக்கத்திற்குரிய மூதாதையர்.',
      mr: 'ओआड, वड्डे, वद्देरा, वड्डार आणि ओड्डेराजुलू समाजाचे पूजनीय पूर्वज.',
      or: 'ଓଆଡ୍, ଓଡ୍ଡେ, ଓଡ୍ଡେରାଜୁଲୁ, ଭଡ୍ଡେରାଜୁଲୁ, ଓଡ଼ା-ଚାଷୀ ସମାଜର ପରମ ଆରାଧ୍ୟ ପୂର୍ବପୁରୁଷ।',
      bn: 'ওআড, ওড্ডে, ওড্ডেরাজুলু, ভাড্ডেরাজুলু ও ওডা-চাষা সম্প্রদায়ের পরম পূজ্য পূর্বপুরুষ।'
    },
    biography: {
      en: 'Great-grandson of Emperor Sagara in the Suryavamsha lineage of Ayodhya. To deliver his 60,000 ancestors and irrigate the parched subcontinent, Bhagiratha performed unmatched penance, overcoming Himalayan gorges and leading the river across thousands of miles. His name gives rise to the universal term "Bhagiratha Prayatna" (Herculean Endeavour).',
      hi: 'अयोध्या के सूर्यवंश में उत्पन्न भगीरथ ने अपने पूर्वजों के उद्धार और समस्त प्राणियों को जल प्रदान करने के लिए कठोर तप किया। गंगा को हिमालय के दुर्गम पाषाणों से उतारकर समुद्र तक ले जाने के उनके पराक्रम से ही गंगा का नाम "भागीरथी" पड़ा।',
      te: 'సూర్యవంశ చక్రవర్తి సగరుని మునిమనుమడైన భగీరథుడు తన పూర్వీకుల మోక్షం కొరకు, విశ్వజనుల దాహం తీర్చుట కొరకు శివుని మెప్పించి గంగను భూమిపైకి తెచ్చారు.',
      kn: 'ಅಯೋಧ್ಯೆಯ ಸೂರ್ಯವಂಶದಲ್ಲಿ ಜನಿಸಿದ ಭಗೀರಥ ತನ್ನ ತಪಸ್ಸಿನಿಂದ ಗಂಗೆಯನ್ನು ಧರೆಗಿಳಿಸಿದನು.',
      ta: 'சூரிய வம்சத்து பகீரதன் தனது விடாமுயற்சியால் கங்கையை பூமிக்குக் கொண்டுவந்தார்.',
      mr: 'सूर्यवंशी भगीरथांनी केलेल्या अथांग प्रयत्नांमुळेच "भागीरथ प्रयत्न" हा शब्द दृढ संकल्पाचे प्रतीक बनला.',
      or: 'ଅଯୋଧ୍ୟାର ସୂର୍ଯ୍ୟବଂଶରେ ଜନ୍ମିତ ଭଗୀରଥ କଠୋର ତପସ୍ୟା କରି ଗଙ୍ଗାଙ୍କୁ ମର୍ତ୍ତ୍ୟକୁ ଆଣିଥିଲେ।',
      bn: 'সূর্যবংশের সন্তান ভগীরথ কঠোর সাধনায় গঙ্গাকে মর্ত্যে এনে তৃষ্ণার্ত ধরণীকে শস্যশ্যামল করেছিলেন।'
    },
    majorContributions: [
      {
        en: 'Pioneered trans-continental river-cutting engineering commemorated in civilizational literature.',
        hi: 'महाद्वीपीय जल-प्रवाह और नहर निर्माण की प्राचीनतम प्रणाली का सूत्रपात किया।',
        te: 'పర్వతాలను చీల్చి నదీ ప్రవాహాన్ని మళ్లించే జల-వాస్తు శాస్త్రానికి ఆద్యుడిగా నిలిచారు.',
        kn: 'ಪರ್ವತಗಳನ್ನು ಸೀಳಿ ನದಿಯ ಹರಿವನ್ನು ರೂಪಿಸಿದ ಜಲತಂತ್ರಜ್ಞಾನದ ಆದ್ಯಪ್ರವರ್ತಕ.',
        ta: 'மலைகளைக் குடைந்து நதியை வழிநடத்திய ஆதி நீரியல் வல்லுநர்.',
        mr: 'पर्वत फोडून नदीचा मार्ग सुकर करणारी प्राचीन जलव्यवस्था उभारली.',
        or: 'ପର୍ବତ ଖୋଳି ନଦୀ ପ୍ରବାହିତ କରିବାର ପ୍ରାଚୀନତମ ଜଳ-ଇଞ୍ଜିନିୟରିଂ ଆରମ୍ଭ କରିଥିଲେ।',
        bn: 'পাহাড় কেটে নদীপ্রবাহ তৈরি করার প্রাচীন জল-প্রকৌশলের সূচনা করেন।'
      },
      {
        en: 'Eternal cultural inspiration for stone-cutters, canal builders, and reservoir excavators nationwide.',
        hi: 'संपूर्ण देश के प्रस्तर-शिल्पियों, नहर निर्माताओं व कूप-तड़ाग खुदवाने वाले श्रमिकों के शाश्वत प्रेरणास्रोत।',
        te: 'దేశవ్యాప్తంగా ఉన్న శిలాశిల్పులకు, చెరువులు-కాలువలు తవ్వే శ్రామిక వీరులకు శాశ్వత ఆరాధ్యదైవం.',
        kn: 'ದೇಶದ ಕಲ್ಲುಕುಟಿಗರು ಮತ್ತು ಕೆರೆ-ಕಟ್ಟೆ ನಿರ್ಮಾಣಕಾರರಿಗೆ ಚಿರಂತನ ಪ್ರೇರಣೆ.',
        ta: 'நாடெங்கிலும் உள்ள கல் தொழிலாளர்கள் மற்றும் குளம் வெட்டுவோருக்கு நித்திய ஆன்மீக ஊக்கம்.',
        mr: 'पाषाण कारागीर आणि विहिरी-तलाव खोदणाऱ्यांसाठी अखंड प्रेरणास्थान.',
        or: 'ଦେଶର ଶିଳାଶିଳ୍ପୀ ଏବଂ ପୋଖରୀ ଖୋଳାଳିମାନଙ୍କର ଚିରନ୍ତନ ଆଦର୍ଶ।',
        bn: 'দেশজুড়ে পাথর খোদাইকারী ও জলাশয় খননকারী সমাজের চিরন্তন অনুপ্রেরণা।'
      }
    ],
    evidenceSources: [
      'Valmiki Ramayana, Balakanda, Sargas 42–44',
      'Mahabharata, Vana Parva, Tirthayatra Parva',
      'Vishnu Purana, Book IV, Chapter 4',
      'Imperial Gazetteer of India, Vol. XVIII'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 9. Samrat Sagara
  {
    id: 'samrat_sagara',
    name: {
      en: 'Samrat Sagara (Chakravarti Sovereign)',
      hi: 'सम्राट सगर (चक्रवर्ती अधिपति)',
      te: 'సమ్రాట్ సగరుడు (చక్రవర్తి సార్వభౌముడు)',
      kn: 'ಸಾಮ್ರಾಟ್ ಸಗರ (ಚಕ್ರವರ್ತಿ)',
      ta: 'பேரரசர் சகரன் (சக்ரவர்த்தி)',
      mr: 'सम्राट सगर (चक्रवर्ती सम्राट)',
      or: 'ସମ୍ରାଟ ସଗର (ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ)',
      bn: 'সম্রাট সগর (চক্রবর্তী সম্রাট)'
    },
    titles: {
      en: 'Chakravarti Sovereign of Ayodhya, Ancient Patriarch of Suryavamsha Kshatriyas & Suryavamsham Rajulu',
      hi: 'अयोध्या के चक्रवर्ती सम्राट, सूर्यवंश क्षत्रिय एवं सूर्यवंशम राजुलु के आदि प्रणेता',
      te: 'అయోధ్య చక్రవర్తి, సూర్యవంశ క్షత్రియులు & సూర్యవంశం రాజుల ప్రాచీన మూలపురుషుడు',
      kn: 'ಅಯೋಧ್ಯೆಯ ಚಕ್ರವರ್ತಿ, ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯರ ಮೂಲಪುರುಷ',
      ta: 'அயோத்தியின் சக்ரவர்த்தி, சூர்யவம்ச க்ஷத்திரியர்களின் ஆதி மூதாதையர்',
      mr: 'अयोध्येचे चक्रवर्ती सम्राट, सूर्यवंशी क्षत्रियांचे महान पूर्वज',
      or: 'ଅଯୋଧ୍ୟାର ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ, ସୂର୍ଯ୍ୟବଂଶ କ୍ଷତ୍ରିୟଙ୍କ ଆଦିପୁରୁଷ',
      bn: 'অযোধ্যার চক্রবর্তী সম্রাট, সূর্যবংশীয় ক্ষত্রিয়দের আদিপুরুষ'
    },
    branches: [
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddeRajulu',
      'Vadiyarajulu',
      'Oad-Rajputh',
      'Od-Kshatriya',
      'Oad',
      'Od'
    ],
    era: {
      en: 'Early Vedic / Treta Yuga Solar Dynasty',
      hi: 'प्रारंभिक वैदिक / त्रेता युग सूर्यवंश',
      te: 'తొలి వైదిక / త్రేతాయుగ సూర్యవంశ కాలం',
      kn: 'ಆದಿ ವೈದಿಕ / ತ್ರೇತಾಯುಗ',
      ta: 'தொடக்க வேத காலம் / த்ரேதா யுகம்',
      mr: 'प्रारंभिक वैदिक / त्रेतायुग',
      or: 'ପ୍ରାଚୀନ ବୈଦିକ / ତ୍ରେତା ଯୁଗ ସୂର୍ଯ୍ୟବଂଶ',
      bn: 'প্রাচীন বৈদিক / ত্রেতা যুগ'
    },
    region: {
      en: 'Ayodhya, Ocean Basin (Sagara), & Imperial Bharatavarsha',
      hi: 'अयोध्या, सागर बेसिन और अखंड भारतवर्ष',
      te: 'అయోధ్య, సముద్ర తీరం మరియు ప్రాచీన భారతదేశం',
      kn: 'ಅಯೋಧ್ಯೆ ಮತ್ತು ಸಾಗರ ತೀರಗಳು',
      ta: 'அயோத்தி மற்றும் கடல் படுகை',
      mr: 'अयोध्या आणि प्राचीन भारतवर्ष',
      or: 'ଅଯୋଧ୍ୟା, ସାଗର ଉପକୂଳ ଓ ସମଗ୍ର ଭାରତବର୍ଷ',
      bn: 'অযোধ্যা ও প্রাচীন ভারতবর্ষ'
    },
    badge: 'Chakravarti Patriarch',
    summary: {
      en: 'Legendary universal monarch of the Ikshvaku Suryavamsha dynasty whose sixty thousand sons excavated the earth, forming the world’s ocean (hence called "Sagara"). Veneration of Samrat Sagara links the earthworking and governing traditions of Suryavamsha Kshatriya, Suryavamsham Rajulu, and OddeRajulu directly to primordial solar sovereignty.',
      hi: 'इक्ष्वाकु सूर्यवंश के चक्रवर्ती सम्राट जिनके साठ हजार पुत्रों ने पृथ्वी को खोदकर विशाल महासागर का स्वरूप दिया (जिसे "सागर" कहा गया)। सम्राट सगर का नाम सूर्यवंश क्षत्रिय, सूर्यवंशम राजुलु और ओड्डेराजुलु समाजों को सीधे सूर्यवंशीय राजपद से जोड़ता है।',
      te: 'ఇక్ష్వాకు సూర్యవంశానికి చెందిన సార్వభౌమ చక్రవర్తి. ఆయన కుమారులు అశ్వమేధ యాగాశ్వం కోసం భూమిని తవ్వి మహాసముద్రానికి ఆకృతినిచ్చారు. సూర్యవంశ క్షత్రియులు, సూర్యవంశం రాజులు, ఒడ్డేరాజులకు సగరుడు మహోన్నత మూలపురుషుడు.',
      kn: 'ಸೂರ್ಯವಂಶದ ಚಕ್ರವರ್ತಿ. ಇವರ ಪುತ್ರರು ಭೂಮಿಯನ್ನು ಅಗೆದು ಸಾಗರವನ್ನು ನಿರ್ಮಿಸಿದರು. ಸೂರ್ಯವಂಶ ಕ್ಷತ್ರಿಯರಿಗೆ ಸಗರನೇ ಮೂಲ.',
      ta: 'பூமியைத் தோண்டி கடலை உருவாக்கிய சாகரர்களின் தந்தை. சூர்யவம்ச க்ஷத்திரியர்களின் அரசர்.',
      mr: 'सूर्यवंशी चक्रवर्ती सम्राट ज्यांच्या पुत्रांनी पृथ्वीचे उत्खनन करून सागराची निर्मिती केली.',
      or: 'ଇକ୍ଷ୍ୱାକୁ ସୂର୍ଯ୍ୟବଂଶର ଚକ୍ରବର୍ତ୍ତୀ ସମ୍ରାଟ। ତାଙ୍କ ନାମାନୁସାରେ ସମୁଦ୍ରକୁ "ସାଗର" କୁହାଯାଏ।',
      bn: 'ইক্ষ্বাকু সূর্যবংশের চক্রবর্তী সম্রাট যাঁর নামানুসারে সমুদ্রের নাম "সাগর" হয়েছিল।'
    },
    biography: {
      en: 'Born to King Bahu, Sagara conquered rival coalitions and consolidated the imperial rule of Ayodhya. His performance of the Ashvamedha sacrifice and the legendary digging of the seabed by his sons is chronicled across the Ramayana, Mahabharata, and Harivamsha.',
      hi: 'राजा बाहु के पुत्र सगर ने तालजंघ और हैहय क्षत्रियों को परास्त कर अयोध्या के आधिपत्य को पुनः स्थापित किया। उन्होंने अश्वमेध यज्ञ का आयोजन किया।',
      te: 'బాహు మహారాజు పుత్రుడైన సగరుడు శత్రువులను జయించి అయోధ్యను మహాసామ్రాజ్యంగా మలిచారు. అశ్వమేధ యాగం నిర్వహించారు.',
      kn: 'ಬಾಹು ರಾಜನ ಮಗ ಸಗರ ಶತ್ರುಗಳನ್ನು ಸೋಲಿಸಿ ಅಯೋಧ್ಯೆಯನ್ನು ಬಲಿಷ್ಠಗೊಳಿಸಿದನು.',
      ta: 'பாகு மன்னனின் மகனான சகரன் அஸ்வமேத யாகம் செய்து தன் அதிகாரத்தை நிலைநாட்டினார்.',
      mr: 'राजा बाहूंचे पुत्र सगर यांनी शत्रूंचा पराभव करून अयोध्येचे वैभव परत मिळवले.',
      or: 'ରାଜା ବାହୁଙ୍କ ପୁତ୍ର ସଗର ଶତ୍ରୁମାନଙ୍କୁ ପରାସ୍ତ କରି ଅଯୋଧ୍ୟାର ପ୍ରତିଷ୍ଠା ଫେରାଇ ଆଣିଥିଲେ।',
      bn: 'রাজা বাহুর পুত্র সগর সমস্ত শত্রুকে পরাজিত করে অযোধ্যায় সূর্যবংশের বিজয়পতাকা উড্ডীন করেন।'
    },
    majorContributions: [
      {
        en: 'Primordial ancestral connection between royal Kshatriya lineages and monumental earth excavation.',
        hi: 'राजकीय क्षत्रिय वंश और विशाल भू-उत्खनन परंपरा के बीच आदिम ऐतिहासिक संबंध स्थापित किया।',
        te: 'క్షత్రియ రాజవంశాలకు మరియు భూ-ఉద్ఘాటన సంప్రదాయాలకు మూలకారణంగా నిలిచారు.',
        kn: 'ಕ್ಷತ್ರಿಯ ವಂಶ ಮತ್ತು ಭೂ-ಉತ್ಖನನ ಪರಂಪರೆಯ ನಡುವೆ ಸೇತುವೆಯಾಗಿದ್ದಾರೆ.',
        ta: 'க்ஷத்திரிய அரச மரபுக்கும் பூமி தோண்டும் பாரம்பரியத்துக்கும் இடையிலான தொல் இணைப்பு.',
        mr: 'क्षत्रिय राजघराणे आणि भू-उत्खनन परंपरेचा प्राचीन संबंध जोडला.',
        or: 'କ୍ଷତ୍ରିୟ ରାଜବଂଶ ଓ ବିଶାଳ ଭୂ-ଉତ୍କ୍ଷେପଣ ପରମ୍ପରାର ଆଦିମ ପ୍ରତୀକ।',
        bn: 'রাজকীয় ক্ষত্রিয় ঐতিহ্য ও মহতী খননকার্য সংস্কৃতির মধ্যে ঐতিহাসিক সেতুবন্ধন স্থাপন করেন।'
      },
      {
        en: 'Preserved the sovereign prestige of the Ikshvaku Suryavamsha through the Ashvamedha rite.',
        hi: 'अश्वमेध यज्ञ के माध्यम से इक्ष्वाकु सूर्यवंश की सार्वभौम सत्ता को सुदृढ़ किया।',
        te: 'అశ్వమేధ యాగం ద్వారా ఇక్ష్వాకు సూర్యవంశ సార్వభౌమాధికారాన్ని విశ్వవ్యాప్తం చేశారు.',
        kn: 'ಅಶ್ವಮೇಧ ಯಾಗದ ಮೂಲಕ ಸೂರ್ಯವಂಶದ ಕೀರ್ತಿಯನ್ನು ಹೆಚ್ಚಿಸಿದರು.',
        ta: 'அஸ்வமேத யாகத்தின் மூலம் சூர்யவம்சத்தின் மாண்பைக் காத்தார்.',
        mr: 'अश्वमेध यज्ञाद्वारे सूर्यवंशाचे सार्वभौमत्व प्रस्थापित केले.',
        or: 'ଅଶ୍ୱମେଧ ଯଜ୍ଞ ମାଧ୍ୟମରେ ସୂର୍ଯ୍ୟବଂଶର ପ୍ରତିଷ୍ଠା ବଜାୟ ରଖିଥିଲେ।',
        bn: 'অশ্বমেধ যজ্ঞের মাধ্যমে সূর্যবংশের সার্বভৌম মর্যাদা অক্ষুণ্ণ রাখেন।'
      }
    ],
    evidenceSources: [
      'Valmiki Ramayana, Balakanda, Sarga 38–41',
      'Mahabharata, Vana Parva, Sagara-Charita',
      'Harivamsha Purana, Harivamsha Parva, Chapter 14'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 10. Mata Jasma Devi (Jasma Odan)
  {
    id: 'mata_jasma_devi',
    name: {
      en: 'Mata Jasma Devi (Jasma Odan)',
      hi: 'माता जसमा देवी (जसमा ओडण)',
      te: 'మాతా జస్మా దేవి (జస్మా ఓడన్)',
      kn: 'ಮಾತಾ ಜಸ್ಮಾ ದೇವಿ (ಜಸ್ಮಾ ಓಡನ್)',
      ta: 'மாதா ஜஸ்மா தேவி (ஜஸ்மா ஓடன்)',
      mr: 'माता जसमा देवी (जसमा ओडण)',
      or: 'ମାତା ଜସ୍ମା ଦେବୀ (ଜସ୍ମା ଓଡ଼ଣ)',
      bn: 'মাতা জসমা দেবী (জসমা ওড়ন)'
    },
    titles: {
      en: 'Iconic Folk Matriarch, Guardian of Community Honor, Patron Deity of Oad, Odar & Wadar Lineages',
      hi: 'स्वाभिमान व सतीत्व की देवी, ओआड, ओडार व वाडार समाज की कुलदेवी व लोकनायिका',
      te: 'ఆత్మగౌరవ ప్రతీక, పాతివ్రత్య శిఖరం, ఓడ్-ఒడార్-వాడార్ సమాజ ఆరాధ్య మాతృమూర్తి',
      kn: 'ಸ್ವಾಭಿಮಾನದ ಸಾಕಾರಮೂರ್ತಿ, ಓಡ್ ಸಮುದಾಯದ ಕುಲದೇವತೆ',
      ta: 'சுயமரியாதையின் தெய்வம், ஓட் சமூகத்தின் குலதெய்வம்',
      mr: 'स्वाभिमान व चारित्र्याची देवता, ओआड समाजाची कुलमाता',
      or: 'ସ୍ୱାଭିମାନ ଓ ସତୀତ୍ୱର ଦେବୀ, ଓଆଡ୍-ଓଡ଼ାର ସମାଜର କୁଳମାତା',
      bn: 'আত্মসম্মান ও সতীত্বের দেবী, ওআড সমাজের পরম পূজ্য কুলদেবী'
    },
    branches: ['Oad', 'Oad-Rajputh', 'Odar', 'Wadar', 'Od'],
    era: {
      en: '11th – 12th Century CE (Solanki Dynasty Era of Gujarat)',
      hi: '11वीं – 12वीं शताब्दी ईस्वी (गुजरात का सोलंकी राजवंश काल)',
      te: '11వ – 12వ శతాబ్దం (గుజరాత్ సోలంకీ రాజవంశ కాలం)',
      kn: '೧೧ – ೧೨ನೇ ಶತಮಾನ (ಗುಜರಾತ್ ಸೋಲಂಕಿ ಕಾಲ)',
      ta: '11 – 12 ஆம் நூற்றாண்டு (குஜராத் சோலாங்கி சகாப்தம்)',
      mr: '११ वे – १२ वे शतक (सोळंकी काळ, गुजरात)',
      or: '୧୧ଶ – ୧୨ଶ ଶତାବ୍ଦୀ (ଗୁଜରାଟର ସୋଲାଙ୍କି ରାଜବଂଶ କାଳ)',
      bn: '১১শ – ১২শ শতাব্দী (গুজরাটের সোলাঙ্কি রাজবংশ যুগ)'
    },
    region: {
      en: 'Patan, Sahasralinga Talav, Gujarat & Rajasthan',
      hi: 'पाटण, सहस्रलिंग तलाव, गुजरात व राजस्थान',
      te: 'పాటణ్, సహస్రలింగ తటాకం, గుజరాత్ మరియు రాజస్థాన్',
      kn: 'ಪಾಟಣ, ಸಹಸ್ರಲಿಂಗ ತಲಾಬ್, ಗುಜರಾತ್',
      ta: 'பதான், சஹஸ்ரலிங்க ஏரி, குஜராத்',
      mr: 'पाटण, सहस्रलिंग तलाव, गुजरात',
      or: 'ପାଟଣ, ସହସ୍ରଲିଙ୍ଗ ପୋଖରୀ, ଗୁଜରାଟ ଓ ରାଜସ୍ଥାନ',
      bn: 'পাটন, সহস্রলিঙ্গ দিঘি, গুজরাট ও রাজস্থান'
    },
    badge: 'Spiritual Heroine & Matriarch',
    summary: {
      en: 'Sacred folk heroine of the Oad, Odar, and Wadar communities who embodied supreme moral courage, labor dignity, and resistance against royal tyranny. When King Siddharaja Jaisinh sought to violate her honor while excavating the massive Sahasralinga Talav in Patan, she chose self-immolation over dishonor. Her temple at Patan is an all-India pilgrimage site.',
      hi: 'ओआड, ओडार और वाडार समाज की परम पूज्य लोकनायिका जिन्होंने स्वाभिमान और श्रम के सम्मान की रक्षा हेतु अपने प्राणों की आहुति दे दी। पाटण में सहस्रलिंग तलाव के निर्माण के समय सोलंकी शासक सिद्धराज जयसिंह के कुटिल प्रस्ताव को ठुकराकर उन्होंने सतीत्व का वरण किया।',
      te: 'ఓడ్-రాజపుత్ సమాజానికి చెందిన చారిత్రక ఆత్మగౌరవ వీరనారి. గుజరాత్ పాటణ్‌లో సహస్రలింగ తటాకం తవ్వుతున్న సమయంలో సోలంకీ రాజు సిద్ధరాజు జయసింహుని అహంకారాన్ని ధిక్కరించి ప్రాణత్యాగం చేసిన పవిత్ర మాతృమూర్తి.',
      kn: 'ಸ್ವಾಭಿಮಾನಕ್ಕಾಗಿ ಪ್ರಾಣತ್ಯಾಗ ಮಾಡಿದ ಓಡ್ ಕುಲದ ವೀರವನಿತೆ.',
      ta: 'தன் சுயமரியாதையைக் காக்க மன்னனின் அதிகாரத்தை எதிர்த்து நின்ற புனித வீராங்கனை.',
      mr: 'स्वाभिमान आणि चारित्र्याच्या रक्षणासाठी राजाच्या आमिषाला लाथाडणारी महान सती.',
      or: 'ଓଆଡ୍-ରାଜପୁତ ସମାଜର ମହାନ ସ୍ୱାଭିମାନୀ ନାରୀ ଯିଏ ନିଜର ମର୍ଯ୍ୟାଦା ରକ୍ଷା ପାଇଁ ପ୍ରାଣାହୁତି ଦେଇଥିଲେ।',
      bn: 'ওআড-রাজপুত সমাজের পরম পূজনীয় বীরাঙ্গনা যিনি আত্মসম্মান রক্ষার্থে অগ্নিতে প্রাণাহুতি দেন।'
    },
    biography: {
      en: 'Jasma was married to Rooda, a master tank excavator of the Oad community. Hired by King Siddharaja Jaisinh to dig the magnificent Sahasralinga Talav in Patan, the Oad artisans worked tirelessly. Smitten by Jasma’s beauty, the king attempted to abduct her. Defending her community’s dignity, Jasma cursed the lake and embraced the flames. Her shrine stands beside the historic reservoir.',
      hi: 'जसमा ओड समाज के कुशल श्रमिक रूड़ा की पत्नी थीं। जब सोलंकी राजा ने उनके सतीत्व पर आघात करना चाहा, तब उन्होंने समाज के आत्मसम्मान की रक्षा के लिए सती होना स्वीकार किया।',
      te: 'జస్మా ఓడ్ శ్రామిక నాయకుడైన రూడా భార్య. సహస్రలింగ తటాక నిర్మాణంలో వీరి కళానైపుణ్యం అద్వితీయం. రాజు దుర్బుద్ధిని గ్రహించిన జస్మా తన శీలరక్షణకై అగ్నిప్రవేశం చేసింది.',
      kn: 'ಜಸ್ಮಾ ಒಡ್ ಸಮುದಾಯದ ರೂಡಾ ಎಂಬುವವರ ಪತ್ನಿ. ಆಕೆಯ ಶೀಲವನ್ನು ಕಾಪಾಡಲು ಬೆಂಕಿಗೆ ಆಹುತಿಯಾದಳು.',
      ta: 'ஜஸ்மா மாதா தனது கற்பையும் சமூகப் பெருமையையும் காக்க தீப்புகுந்த வரலாற்று நாயகி.',
      mr: 'जसमा यांनी पाटणच्या सहस्रलिंग तलावाच्या काठावर सती जाऊन आपल्या समाजाची मान उंचावली.',
      or: 'ଜସ୍ମା ଓଡ଼ ସମାଜର ସମ୍ମାନ ରକ୍ଷା ପାଇଁ ଅଗ୍ନିରେ ଝାସ ଦେଇଥିଲେ।',
      bn: 'জসমা ওড় সম্প্রদায়ের আত্মমর্যাদার প্রতীক যিনি অন্যায়ের কাছে নতিস্বীকার না করে প্রাণাহুতি দেন।'
    },
    majorContributions: [
      {
        en: 'Eternal archetype of feminine resistance, community labor pride, and uncompromising fidelity.',
        hi: 'नारी स्वाभिमान, श्रमिक वर्ग के आत्मगौरव और अडिग सतीत्व का अमर वैश्विक आदर्श।',
        te: 'స్త్రీ ఆత్మగౌరవానికి, శ్రామిక వర్గాల స్వయంప్రతిపత్తికి నిలువెత్తు సాక్ష్యంగా నిలిచారు.',
        kn: 'ಸ್ತ್ರೀ ಸ್ವಾಭಿಮಾನ ಮತ್ತು ಶ್ರಮಿಕ ವರ್ಗದ ಆತ್ಮಗೌರವದ ಅಮರ ಸಂಕೇತ.',
        ta: 'பெண்மையின் உறுதிக்கும் உழைக்கும் மக்களின் தன்மானத்திற்கும் வரலாற்றுச் சான்று.',
        mr: 'स्त्री स्वाभिमान आणि कष्टकऱ्यांच्या स्वाभिमानाचे चिरंतन प्रतीक.',
        or: 'ନାରୀ ସ୍ୱାଭିମାନ ଓ ଶ୍ରମିକ ସମାଜର ଆତ୍ମଗୌରବର ଅମର ଆଦର୍ଶ।',
        bn: 'নারী আত্মমর্যাদা এবং শ্রমজীবী সমাজের আত্মসম্মানের চিরন্তন প্রতীক।'
      },
      {
        en: 'Fostered pan-Indian cultural solidarity and spiritual sanctuaries across Gujarat and Rajasthan.',
        hi: 'गुजरात और राजस्थान में ओआड समुदाय के लिए सांस्कृतिक एकता और तीर्थ परंपरा का सूत्रपात किया।',
        te: 'గుజరాత్, రాజస్థాన్ ప్రాంతాలలో ఓడ్ ప్రజల సాంస్కృతిక ఐక్యతకు పీఠభూమిగా నిలిచారు.',
        kn: 'ಗುಜರಾತ್ ಮತ್ತು ರಾಜಸ್ಥಾನಗಳಲ್ಲಿ ಸಮುದಾಯದ ಸಾಂಸ್ಕೃತಿಕ ಐಕ್ಯತೆಗೆ ಪ್ರೇರಣೆ ನೀಡಿದರು.',
        ta: 'குஜராத் மற்றும் ராஜஸ்தானில் சமூக ஒருமைப்பாட்டை வளர்த்தார்.',
        mr: 'गुजरात आणि राजस्थानमध्ये समाजाची सांस्कृतिक एकजूट घडवून आणली.',
        or: 'ଗୁଜରାଟ ଓ ରାଜସ୍ଥାନରେ ଓଆଡ୍ ସମାଜ ମଧ୍ୟରେ ସାଂସ୍କୃତିକ ଏକତା ସୃଷ୍ଟି କରିଥିଲେ।',
        bn: 'গুজরাট ও রাজস্থানে সমাজের ঐক্যের প্রতীক হিসেবে প্রতিষ্ঠিত হন।'
      }
    ],
    evidenceSources: [
      'Archaeological Survey of India (ASI) Reports on Sahasralinga Talav, Patan',
      'Alexander Kinloch Forbes, "Ras-Mala"',
      'K.M. Munshi, "Glory that was Gurjaradesa"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 11. Shivayogi Siddharameshwara
  {
    id: 'shivayogi_siddharameshwara',
    name: {
      en: 'Shivayogi Siddharameshwara',
      hi: 'शिवयोगी सिद्धरामेश्वर',
      te: 'శివయోగి సిద్ధరామేశ్వరుడు',
      kn: 'ಶಿವಯೋಗಿ ಸಿದ್ಧರಾಮೇಶ್ವರ',
      ta: 'சிவயோகி சித்தராமேஸ்வரர்',
      mr: 'शिवयोगी सिद्धरामेश्वर',
      or: 'ଶିବଯୋଗୀ ସିଦ୍ଧରାମେଶ୍ୱର',
      bn: 'শিবযোগী সিদ্ধরামেশ্বর'
    },
    titles: {
      en: '12th Century Vachanakara, Master Lake-Builder of Sonnalige, Spiritual Patron of Waddar, Vaddar, Vaddera, Wadar, Odar & Ottar',
      hi: '12वीं सदी के वचनकार, सोन्नलिगे के महा-जलाशय निर्माता, वड्डार, वद्देरा, वाडार, ओडार व ओट्टार समाज के कुलगुरु',
      te: '12వ శతాబ్దపు వచనకార, సోన్నలిగె మహా జలాశయ నిర్మాత, వడ్డెర-వడ్డార్-వాడార్-ఒట్టార్ జాతికి ఆరాధ్య గురువు',
      kn: '೧೨ನೇ ಶತಮಾನದ ಶ್ರೇಷ್ಠ ವಚನಕಾರ, ಸೊನ್ನಲಿಗೆಯ ಕೆರೆಗಳ ನಿರ್ಮಾತೃ, ವಡ್ಡೇರ/ವಡ್ಡಾರ ಸಮಾಜದ ಕುಲಗುರು',
      ta: '12 ஆம் நூற்றாண்டு வசங்காரர், சொன்னலிகே ஏரியை அமைத்த மாமுனிவர், வாட்டார் சமூகக் குரு',
      mr: '१२ व्या शतकातील थोर वचनकार, सोलापूर तलावाचे निर्माते, वड्डार समाजाचे कुलदैवत',
      or: '୧୨ଶ ଶତାବ୍ଦୀର ଶ୍ରେଷ୍ଠ ବଚନକାର, ସୋନ୍ନାଲିଗେ ଜଳାଶୟ ନିର୍ମାତା, ଭଦ୍ଦାର ସମାଜର ମାର୍ଗଦର୍ଶକ ସନ୍ଥ',
      bn: '১২শ শতাব্দীর বিশিষ্ট বচনকার, সোন্নালিগে জলাশয় নির্মাতা, ওয়াদ্দার সমাজের আধ্যাত্মিক পথপ্রদর্শক'
    },
    branches: [
      'Waddar',
      'Wadar',
      'Odar',
      'Ottar',
      'Vaddar',
      'Vaddera',
      'Odde',
      'vadde',
      'Oddar'
    ],
    era: {
      en: '12th Century CE (c. 1125 – 1175 CE)',
      hi: '12वीं शताब्दी ईस्वी (लगभग 1125 – 1175 ई.)',
      te: '12వ శతాబ్దం (సా.శ. 1125 – 1175)',
      kn: '೧೨ನೇ ಶತಮಾನ (ಕ್ರಿ.ಶ. ೧೧೨೫ – ೧೧೭೫)',
      ta: '12 ஆம் நூற்றாண்டு (பொ.ஆ. 1125 – 1175)',
      mr: '१२ वे शतक (इ.स. ११२५ – ११७५)',
      or: '୧୨ଶ ଶତାବ୍ଦୀ (୧୧୨୫ – ୧୧୭୫ ଖ୍ରୀଷ୍ଟାବ୍ଦ)',
      bn: '১২শ শতাব্দী (আনুমানিক ১১২৫ – ১১৭৫ খ্রিস্টাব্দ)'
    },
    region: {
      en: 'Sonnalige (Solapur), Kalyana, Karnataka & Maharashtra',
      hi: 'सोन्नलिगे (सोलापूर), कल्याण, कर्नाटक व महाराष्ट्र',
      te: 'సోన్నలిగె (సోలాపూర్), బసవకల్యాణ్, కర్ణాటక మరియు మహారాష్ట్ర',
      kn: 'ಸೊನ್ನಲಿಗೆ (ಸೋಲಾಪುರ), ಕಲ್ಯಾಣ, ಕರ್ನಾಟಕ ಹಾಗೂ ಮಹಾರಾಷ್ಟ್ರ',
      ta: 'சொன்னலிகே (சோலாப்பூர்), கல்யாண், கர்நாடகா மற்றும் மகாராஷ்டிரா',
      mr: 'सोन्नलिगे (सोलापूर), कल्याण, महाराष्ट्र व कर्नाटक',
      or: 'ସୋନ୍ନାଲିଗେ (ସୋଲାପୁର), କଲ୍ୟାଣ, କର୍ଣ୍ଣାଟକ ଓ ମହାରାଷ୍ଟ୍ର',
      bn: 'সোন্নালিগে (সোলাপুর), কল্যাণ, কর্ণাটক ও মহারাষ্ট্র'
    },
    badge: 'Civic Saint & Lake Architect',
    summary: {
      en: 'Visionary 12th-century Shaivite saint, philosopher, and supreme master builder who sanctified manual stonework and reservoir excavation as divine service (Kayakave Kailasa). He constructed the vast public lake of Solapur and is venerated as the supreme patron saint of the Waddar, Vaddar, Vaddera, Wadar, Odar, and Ottar communities.',
      hi: '12वीं सदी के महान संत, दार्शनिक और जल-अभियंता जिन्होंने शारीरिक श्रम और पाषाण-शिल्प को "कायकवे कैलास" (कर्म ही पूजा है) के रूप में प्रतिष्ठित किया। उन्होंने सोलापुर के ऐतिहासिक महा-जलाशय का निर्माण किया। वे वड्डार, वद्देरा, वाडार, ओडार व ओट्टार समाज के सर्वोच्च कुलगुरु हैं।',
      te: '12వ శతాబ్దపు మహోన్నత శివశరణుడు, వచనకారుడు, ప్రజా సంక్షేమ జలాశయ నిర్మాత. "కాయకవే కైలాసం" సిద్ధాంతంతో రాతి పనిని, మట్టి పనిని పరమ పవిత్ర సాధనగా చాటారు. సోలాపూర్‌లో అద్భుతమైన చెరువును తవ్వించి వడ్డెర, వడ్డార్, వాడార్, ఒట్టార్ సమాజాలకు ఆరాధ్య గురువయ్యారు.',
      kn: 'ಸೊನ್ನಲಿಗೆಯಲ್ಲಿ ಬೃಹತ್ ಕೆರೆ ತೋಡಿಸಿ, ಕಾಯಕವೇ ಕೈಲಾಸ ತತ್ವದ ಮೂಲಕ ಕಲ್ಲು ಹೊಡೆಯುವ ಶ್ರಮಿಕರನ್ನು ದೈವಸ್ವರೂಪಿಗಳಾಗಿ ಕಂಡ ವಡ್ಡೇರ ಸಮಾಜದ ಮಹಾನ್ ಚೇತನ.',
      ta: 'காயகவே கைலாச தத்துவத்தின்படி உழைப்பை வணங்கிய மாமுனிவர். சோலாப்பூரில் மாபெரும் ஏரியை வெட்டியவர்.',
      mr: 'सोलापूर येथे अथांग पाण्याचे तलाव आणि ६८ लिंगांची स्थापना करणारे थोर समाजसुधारक संत. वड्डार समाजाचे आद्य कुलदैवत.',
      or: 'ଶ୍ରମର ମହତ୍ତ୍ୱ ପ୍ରତିଷ୍ଠା କରିଥିବା ୧୨ଶ ଶତାବ୍ଦୀର ସନ୍ଥ। ସୋଲାପୁରରେ ବିଶାଳ ଜଳାଶୟ ନିର୍ମାଣ କରିଥିଲେ।',
      bn: 'শ্রমের মর্যাদা প্রতিষ্ঠাকারী ১২শ শতাব্দীর বিশিষ্ট সন্ত। সোলাপুরে বিশাল জলাশয় খনন করেছিলেন।'
    },
    biography: {
      en: 'Born in a farming family in Sonnalige, Siddharama organized thousands of stone artisans and laborers to build civic infrastructure, schools, and feeding houses. He composed hundreds of profound Vachanas under the signature "Kapilasiddha Mallikarjuna".',
      hi: 'सोन्नलिगे में जन्मे सिद्धरामेश्वर ने जनसेवा को ही ईश्वर भक्ति माना। उन्होंने हजारों कारीगरों को संगठित कर सोलापुर में विशाल जल तलाव का निर्माण किया।',
      te: 'సోన్నలిగె గ్రామంలో జన్మించిన సిద్ధరామేశ్వరుడు కరవు కోరల్లో చిక్కుకున్న ప్రజల దాహం తీర్చడానికి స్వయంగా గడ్డపార పట్టి సోలాపూర్ చెరువును తవ్వించారు.',
      kn: 'ಕಪಿಲಸಿದ್ಧ ಮಲ್ಲಿಕಾರ್ಜುನ ಅಂಕಿತದಲ್ಲಿ ವಚನಗಳನ್ನು ರಚಿಸಿದ ಸಿದ್ಧರಾಮರು ಸಮಾಜದ ಅಭಿವೃದ್ಧಿಗೆ ಶ್ರಮಿಸಿದರು.',
      ta: 'கபிலசித்த மல்லிகார்ஜுனா என்ற முத்திரையில் வசங்களை இயற்றியவர்.',
      mr: 'कपिलसिद्ध मल्लिकार्जुन या नावाने शेकडो वचने रचून दुष्काळ निवारणासाठी अहोरात्र श्रम केले.',
      or: 'କପିଳସିଦ୍ଧ ମଲ୍ଲିକାର୍ଜୁନ ନାମରେ ବଚନ ରଚନା କରି ଦୁର୍ଭିକ୍ଷ ନିବାରଣ ପାଇଁ କାର୍ଯ୍ୟ କରିଥିଲେ।',
      bn: 'কপিলসিদ্ধ মল্লিকার্জুন ভণিতায় বচন রচনা করে সমাজসেবায় জীবন উৎসর্গ করেন।'
    },
    majorContributions: [
      {
        en: 'Constructed the historic Solapur lake and 68 Shiva temple sanctuaries through cooperative labor.',
        hi: 'सामूहिक श्रम के माध्यम से सोलापुर के ऐतिहासिक महा-जलाशय और 68 देवालयों का निर्माण कराया।',
        te: 'సామూహిక శ్రమతో సోలాపూర్ మహా జలాశయాన్ని, 68 శివాలయాలను నిర్మించారు.',
        kn: 'ಸೊನ್ನಲಿಗೆಯಲ್ಲಿ ಐತಿಹಾಸಿಕ ಕೆರೆ ಮತ್ತು ೬೮ ದೇವಾಲಯಗಳನ್ನು ಕಟ್ಟಿಸಿದರು.',
        ta: 'கூட்டுழைப்பின் மூலம் சோலாப்பூர் ஏரியையும் 68 சிவாலயங்களையும் நிர்மாணித்தார்.',
        mr: 'लोकसहभागातून सोलापूरचा प्रसिद्ध तलाव व ६८ शिवालये उभारली.',
        or: 'ଜନସହଯୋଗରେ ସୋଲାପୁର ପୋଖରୀ ଓ ୬୮ ଶିବାଳୟ ନିର୍ମାଣ କରିଥିଲେ।',
        bn: 'জনসহযোগিতায় সোলাপুরের ঐতিহাসিক দীঘি ও ৬৮টি শিবালয় নির্মাণ করেন।'
      },
      {
        en: 'Elevated earthwork, canal digging, and stonework to sacred spiritual callings in the Sharana tradition.',
        hi: 'शरण परंपरा में मिट्टी खोदने, नहर बनाने और पत्थर तराशने को परम आध्यात्मिक साधना का पद दिया।',
        te: 'శరణ సంప్రదాయంలో రాతిపనిని, మట్టిపనిని పరమ పవిత్రమైన ఆధ్యాత్మిక తపస్సుగా ఉన్నతీకరించారు.',
        kn: 'ಕಲ್ಲು-ಮಣ್ಣಿನ ಶ್ರಮದಾಯಕ ಕಾಯಕಕ್ಕೆ ಆಧ್ಯಾತ್ಮಿಕ ಗೌರವ ತಂದುಕೊಟ್ಟರು.',
        ta: 'கல் வெட்டும் உழைப்பை ஆன்மீகத் தவமாக உயர்த்தினார்.',
        mr: 'पाषाण व जलकामांना अध्यात्मात सर्वोच्च प्रतिष्ठा प्राप्त करून दिली.',
        or: 'କଠିନ ଶ୍ରମ ଓ ଜଳାଶୟ ଖୋଳିବାକୁ ଧର୍ମୀୟ ସାଧନାର ମର୍ଯ୍ୟାଦା ଦେଇଥିଲେ।',
        bn: 'পাথর কাটার কঠিন শ্রমকে আধ্যাত্মিক সাধনার উচ্চতায় প্রতিষ্ঠিত করেন।'
      }
    ],
    evidenceSources: [
      'Raghavanka, "Siddharama Charite"',
      'Vachana Sahitya Sangraha, Government of Karnataka',
      'Gazetteer of Bombay Presidency, Vol. XX'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 12. Mahameghavahana Kharavela
  {
    id: 'emperor_kharavela',
    name: {
      en: 'Mahameghavahana Emperor Kharavela',
      hi: 'महामेघवाहन सम्राट खारवेल',
      te: 'మహామేఘవాహన చక్రవర్తి ఖారవేలుడు',
      kn: 'ಮಹಾಮೇಘವಾಹನ ಚಕ್ರವರ್ತಿ ಖಾರವೇಲ',
      ta: 'மகாமேகவாகன பேரரசர் காரவேலன்',
      mr: 'महामेघवाहन सम्राट खारवेल',
      or: 'ମହାମେଘବାହନ ସମ୍ରାଟ ଖାରବେଳ',
      bn: 'মহামেঘবাহন সম্রাট খারবেল'
    },
    titles: {
      en: 'Kalingadhipati, Great Monarch of Ancient Kalinga, Trikalinga & Odra, Sovereign of Hathigumpha',
      hi: 'कलिंगाधिपति, प्राचीन कलिंग, त्रिकलिंग एवं ओड्र के महासम्राट, हाथीगुम्फा अभिलेख के अमर प्रणेता',
      te: 'కళింగాధిపతి, ప్రాచీన కళింగ-త్రికళింగ-ఓడ్ర మహాచక్రవర్తి, హాథీగుంఫా శాసన సృష్టికర్త',
      kn: 'ಕಳಿಂಗಾಧಿಪತಿ, ಹಾಥಿಗುಂಫಾ ಶಾಸನದ ಚಕ್ರವರ್ತಿ',
      ta: 'கலிங்காதிபதி, ஹாத்திகும்பா கல்வெட்டின் நாயகர்',
      mr: 'कलिंगाधिपती, हत्तीगुंफा शिलालेखाचे निर्माते महासम्राट',
      or: 'କଳିଙ୍ଗାଧିପତି, ପ୍ରାଚୀନ କଳିଙ୍ଗ-ତ୍ରିକଳିଙ୍ଗ-ଓଡ଼୍ରର ମହାରାଜାଧିରାଜ, ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖ ପ୍ରବର୍ତ୍ତକ',
      bn: 'কলিঙ্গাধ্যক্ষ, প্রাচীন কলিঙ্গ, ত্রিকলিঙ্গ ও ওড্রের মহান সম্রাট, হাতিগুম্ফা শিলালিপির স্রষ্টা'
    },
    branches: [
      'Kalinga',
      'Trikalinga',
      'Utkala',
      'Odra',
      'Suryavamsha Kshatriya',
      'Od-Kshatriya',
      'Od'
    ],
    era: {
      en: '1st – 2nd Century BCE',
      hi: 'प्रथम – द्वितीय शताब्दी ईसा पूर्व',
      te: 'క్రీ.పూ. 1వ – 2వ శతాబ్దం',
      kn: 'ಕ್ರಿ.ಪೂ. ೧ – ೨ನೇ ಶತಮಾನ',
      ta: 'பொ.ஆ.மு. 1 – 2 ஆம் நூற்றாண்டு',
      mr: 'इ.स.पूर्व १ ले – २ रे शतक',
      or: 'ଖ୍ରୀଷ୍ଟପୂର୍ବ ୧ମ – ୨ୟ ଶତାବ୍ଦୀ',
      bn: 'খ্রিস্টপূর্ব ১ম – ২য় শতাব্দী'
    },
    region: {
      en: 'Kalinga, Trikalinga, Odra Desha, Udayagiri-Khandagiri, & Imperial Bharatavarsha',
      hi: 'कलिंग, त्रिकलिंग, ओड्र देश, उदयगिरि-खंडगिरि और संपूर्ण भारतवर्ष',
      te: 'కళింగ, త్రికళింగ, ఓడ్ర దేశం, ఉదయగిరి-ఖండగిరి మరియు ప్రాచీన భారతం',
      kn: 'ಕಳಿಂಗ, ತ್ರಿಕಳಿಂಗ, ಓಡ್ರ ದೇಶ, ಉದಯಗಿರಿ-ಖಂಡಗಿರಿ',
      ta: 'கலிங்கம், திரிகலிங்கம், உதயகிரி-கண்டகிரி மலைகள்',
      mr: 'कलिंग, त्रिकलिंग, ओड्र देश, उदयगिरी-खंडगिरी',
      or: 'କଳିଙ୍ଗ, ତ୍ରିକଳିଙ୍ଗ, ଓଡ଼୍ର ଦେଶ, ଉଦୟଗିରି-ଖଣ୍ଡଗିରି',
      bn: 'কলিঙ্গ, ত্রিকলিঙ্গ, ওড্র দেশ, উদয়গিরি-খণ্ডগিরি'
    },
    badge: 'Ancient Epigraphic Sovereign',
    summary: {
      en: 'Paramount third monarch of the Mahameghavahana dynasty of ancient Kalinga and Trikalinga. Renowned for his monumental 17-line Hathigumpha inscription at Udayagiri recording military campaigns, reconstruction of cyclone-damaged capitals, canal excavations, and deep patronage of stone artisans.',
      hi: 'प्राचीन कलिंग और त्रिकलिंग के महामेघवाहन राजवंश के सर्वाधिक प्रतापी सम्राट। उदयगिरि स्थित उनकी प्रसिद्ध हाथीगुम्फा प्रशस्ति उनके दिग्विजय, चक्रवात से क्षतिग्रस्त राजधानी के जीर्णोद्धार, प्राचीन नहरों के विस्तार और पाषाण शिल्पियों के संरक्षण का प्रामाणिक साक्ष्य है।',
      te: 'ప్రాచీన కళింగ, త్రికళింగ, ఓడ్ర దేశపు మహామేఘవాహన సామ్రాజ్య మహాచక్రవర్తి. ఉదయగిరి కొండపై చెక్కించిన 17 పంక్తుల హాథీగుంఫా శాసనం ద్వారా కాలువల విస్తరణ, తుపాను ధ్వంసం చేసిన నగర ప్రాకారాల పునర్నిర్మాణాన్ని శాశ్వతం చేసిన అజేయ పాలకుడు.',
      kn: 'ಉದಯಗಿರಿಯ ಹಾಥಿಗುಂಫಾ ಶಾಸನದಿಂದ ಖ್ಯಾತರಾದ ಪ್ರಾಚೀನ ಕಳಿಂಗ ಚಕ್ರವರ್ತಿ.',
      ta: 'ஹாத்திகும்பா கல்வெட்டில் தனது சாதனைகளைப் பொறித்த பண்டைய கலிங்கப் பேரரசர்.',
      mr: 'उदयगिरी येथील हत्तीगुंफा शिलालेखात आपले पराक्रम नोंदवून ठेवणारे प्राचीन सम्राट.',
      or: 'ପ୍ରାଚୀନ କଳିଙ୍ଗ ଓ ତ୍ରିକଳିଙ୍ଗର ଶ୍ରେଷ୍ଠ ଚକ୍ରବର୍ତ୍ତୀ। ଉଦୟଗିରି ହାତୀଗୁମ୍ଫା ଶିଳାଲେଖରେ ତାଙ୍କର କେନାଲ୍ ଖନନ ବିବରଣୀ ଉଲ୍ଲେଖ ଅଛି।',
      bn: 'প্রাচীন কলিঙ্গ ও ত্রিকলিঙ্গের শ্রেষ্ঠ সম্রাট। হাতিগুম্ফা শিলালিপিতে তাঁর খাল খনন ও নগর পুনর্নির্মাণের কীর্তি স্বর্ণাক্ষরে লেখা আছে।'
    },
    biography: {
      en: 'Trained in statecraft and warfare, Kharavela ascended the throne at age 24. In his fifth regnal year, he extended the canal dug 300 years earlier by King Nanda into Kalinganagara. His cave dwellings for monks at Udayagiri and Khandagiri stand as masterworks of rock-cut architecture.',
      hi: 'खारवेल ने 24 वर्ष की आयु में राज्यारोहण किया। अपने शासन के 5वें वर्ष में उन्होंने नंद राजा द्वारा निर्मित प्राचीन नहर को राजधानी तक विस्तारित किया। उदयगिरि की गुफाएं उनके संरक्षण में निर्मित हुईं।',
      te: '24 ఏళ్ల ప్రాయంలో సింహాసనమెక్కిన ఖారవేలుడు నందరాజులు 300 ఏళ్ల క్రితం తవ్వించిన కాలువను కళింగ నగరానికి పొడిగించారు.',
      kn: 'ನಂದ ರಾಜರು ಕಟ್ಟಿಸಿದ್ದ ಕಾಲುವೆಯನ್ನು ನಗರದವರೆಗೂ ವಿಸ್ತರಿಸಿದ ಕೀರ್ತಿ ಖಾರವೇಲನಿಗೆ ಸಲ್ಲುತ್ತದೆ.',
      ta: 'நந்த மன்னர் காலத்துக் கால்வாயை மேலும் நீட்டித்து நீர் மேலாண்மை செய்தவர்.',
      mr: 'नंद राजाने खोदलेला कालवा राजधानीपर्यंत वाढवून शेतीला पाणी पुरवणारे राजे.',
      or: 'ନନ୍ଦରାଜାଙ୍କ ଦ୍ୱାରା ଖନନ କରାଯାଇଥିବା କେନାଲକୁ କଳିଙ୍ଗନଗର ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତାର କରିଥିଲେ।',
      bn: 'নন্দরচিত প্রাচীন খালকে রাজধানী পর্যন্ত সম্প্রসারিত করে কৃষিতে বিপ্লব ঘটিয়েছিলেন।'
    },
    majorContributions: [
      {
        en: 'Extended the 300-year-old Nanda canal into Kalinganagara, pioneering classical irrigation.',
        hi: '300 वर्ष पुरानी नंद नहर को राजधानी तक पहुंचाकर प्राचीन जल-प्रबंधन का उदाहरण प्रस्तुत किया।',
        te: '300 సంవత్సరాల పురాతన నంద కాలువను రాజధాని వరకు విస్తరించి నీటిపారుదల విప్లవం సృష్టించారు.',
        kn: 'ಪ್ರಾಚೀನ ನಂದ ಕಾಲುವೆಯನ್ನು ವಿಸ್ತರಿಸಿ ಕೃಷಿಗೆ ನೀರಾವರಿ ಒದಗಿಸಿದರು.',
        ta: 'பண்டைய கால்வாய்களை விரிவுபடுத்தி பாசன வசதியை மேம்படுத்தினார்.',
        mr: 'प्राचीन कालव्यांचा विस्तार करून शेतीसाठी पाणी उपलब्ध करून दिले.',
        or: '୩୦୦ ବର୍ଷ ପୁରୁଣା ନନ୍ଦ କେନାଲ୍‌କୁ ରାଜଧାନୀ ପର୍ଯ୍ୟନ୍ତ ସଂପ୍ରସାରିତ କରିଥିଲେ।',
        bn: '৩০০ বছরের প্রাচীন খাল সম্প্রসারণ করে কৃষিব্যবস্থার যুগান্তকারী উন্নতি করেন।'
      },
      {
        en: 'Commissioned the rock-cut cave complexes and inscriptions of Udayagiri and Khandagiri.',
        hi: 'उदयगिरि और खंडगिरि की विश्वविख्यात पाषाण गुफाओं और स्थापत्य का निर्माण करवाया।',
        te: 'ఉదయగిరి, ఖండగిరిలలో నేటికీ నిలిచియున్న అద్భుత రాతి గుహాలయాలను నిర్మింపజేశారు.',
        kn: 'ಉದಯಗಿರಿ ಮತ್ತು ಖಂಡಗಿರಿಯ ಕಲ್ಲಿನ ಗುಹಾ ಸಂಕೀರ್ಣಗಳನ್ನು ನಿರ್ಮಿಸಿದರು.',
        ta: 'உதயகிரி மற்றும் கண்டகிரி பாறைக் குடைவரைக் கோயில்களை உருவாக்கினார்.',
        mr: 'उदयगिरी व खंडगिरी येथील जगप्रसिद्ध लेण्यांची निर्मिती केली.',
        or: 'ଉଦୟଗିରି ଓ ଖଣ୍ଡଗିରିର ଅପୂର୍ବ ଶିଳାଗୁମ୍ଫାଗୁଡ଼ିକ ନିର୍ମାଣ କରିଥିଲେ।',
        bn: 'উদয়গিরি ও খণ্ডগিরির বিশ্ববিখ্যাত শৈল গুহামন্দিরসমূহ নির্মাণ করান।'
      }
    ],
    evidenceSources: [
      'Hathigumpha Inscription of Kharavela (Epigraphia Indica, Vol. XX)',
      'B.M. Barua, "Old Brahmi Inscriptions in the Udayagiri and Khandagiri Caves"',
      'K.P. Jayaswal and R.D. Banerji, "The Hathigumpha Inscription of Kharavela"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 13. Sri Kolletikota Peddintlamma Thalli
  {
    id: 'kolletikota_peddintlamma',
    name: {
      en: 'Sri Kolletikota Peddintlamma Thalli',
      hi: 'श्री कोल्लेतिकोटा पेद्दिंटलम्मा तल्ली',
      te: 'శ్రీ కొల్లేటికోట పెద్దింట్లమ్మ తల్లి',
      kn: 'ಶ್ರೀ ಕೊಲ್ಲೇಟಿಕೋಟೆ ಪೆದ್ದಿಂಟ್ಲಮ್ಮ ತಾಯಿ',
      ta: 'ஸ்ரீ கொல்லேடிகோட்டை பெத்திண்ட்லம்மா தாயார்',
      mr: 'श्री कोल्लेतिकोटा पेद्दिंटलम्मा माता',
      or: 'ଶ୍ରୀ କୋଲ୍ଲେତିକୋଟା ପେଦ୍ଦିଣ୍ଟଲମ୍ମା ମାତା',
      bn: 'শ্রী কোল্লেটিকোটা পেদ্দিণ্টলম্মা মা'
    },
    titles: {
      en: 'Tutelary Sovereign Goddess of Kolleru Lake Fort, Protector Deity of Gajapathi, Paika, OddeRajulu & VaddeRajulu Warriors',
      hi: 'कोल्लेरु झील दुर्ग की अधिष्ठात्री कुलदेवी, गजपति सेना, पाइका, ओड्डेराजुलु व वड्डेराजुलु की संरक्षिका',
      te: 'కొల్లేటి సరస్సు జలదుర్గ రక్షక దేవత, గజపతులు, పైకాలు, ఒడ్డేరాజులు, వడ్డేరాజుల ఆరాధ్య కులదేవత',
      kn: 'ಕೊಲ್ಲೇರು ಜಲಕೋಟೆಯ ಕುಲದೇವತೆ, ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡಿಯಾರಾಜುಲು ಯೋಧರ ರಕ್ಷಕಿ',
      ta: 'கொல்லேரு ஏரி நீர்-கோட்டையின் காவல் தெய்வம், ஒட்டேராஜுலு மரபினரின் குலஅன்னை',
      mr: 'कोल्लेरू जलदुर्गाची रक्षक देवता, ओड्डेराजुलू व वड्डेराजुलू समाजाची कुलमाता',
      or: 'କୋଲ୍ଲେରୁ ଜଳଦୁର୍ଗର ଅଧିଷ୍ଠାତ୍ରୀ ଦେବୀ, ପାଇକ ଓ ଓଡ୍ଡେରାଜୁଲୁ ସମାଜର ରକ୍ଷୟିତ୍ରୀ',
      bn: 'কোল্লেরু হ্রদ জলদুর্গের অধিষ্ঠাত্রী দেবী, পাইক ও ওড্ডেরাজুলু যোদ্ধাদের পরম রক্ষাকর্ত্রী'
    },
    branches: [
      'OddeRajulu',
      'VaddeRajulu',
      'OddeRazulu',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'paikas',
      'Odiyaraju',
      'Vadiyarajulu',
      'vadde',
      'Odde',
      'Gajapathis'
    ],
    era: {
      en: 'Medieval Gajapathi & Ganga Epoch (Living Sacred Tradition)',
      hi: 'मध्यकालीन गजपति एवं गंग साम्राज्य काल (जीवंत तीर्थ परंपरा)',
      te: 'మధ్యయుగ గజపతి యుగం (సజీవ ఆరాధనా సంప్రదాయం)',
      kn: 'ಮಧ್ಯಯುಗದ ಗಜಪತಿ ಕಾಲ',
      ta: 'இடைக்கால கஜபதி சகாப்தம்',
      mr: 'मध्ययुगीन गजपती काळ',
      or: 'ମଧ୍ୟଯୁଗୀୟ ଗଜପତି କାଳ (ଜୀବନ୍ତ ଐତିହ୍ୟ)',
      bn: 'মধ্যযুগীয় গজপতি যুগ (চিরন্তন উপাসনা ঐতিহ্য)'
    },
    region: {
      en: 'Kolletikota, Kolleru Lake, Eluru, Krishna-Godavari Delta',
      hi: 'कोल्लेतिकोटा, कोल्लेरु झील, एलुरु एवं कृष्णा-गोदावरी दोआब',
      te: 'కొల్లేటికోట, కొల్లేరు సరస్సు, ఏలూరు మరియు కృష్ణా-గోదావరి డెల్టా',
      kn: 'ಕೊಲ್ಲೇಟಿಕೋಟೆ, ಕೊಲ್ಲೇರು ಕೆರೆ, ಆಂಧ್ರಪ್ರದೇಶ',
      ta: 'கொல்லேடிகோட்டை, கொல்லேரு ஏரி, ஆந்திரா',
      mr: 'कोल्लेतिकोटा, कोल्लेरू सरोवर, आंध्र प्रदेश',
      or: 'କୋଲ୍ଲେତିକୋଟା, କୋଲ୍ଲେରୁ ହ୍ରଦ, ଏଲୁରୁ ଓ ଆନ୍ଧ୍ର',
      bn: 'কোল্লেটিকোটা, কোল্লেরু হ্রদ, এলুরু ও অন্ধ্র'
    },
    badge: 'Tutelary Fort Goddess',
    summary: {
      en: 'The legendary sovereign protector goddess enshrined at the historic aquatic fortress of Kolletikota in Kolleru Lake. Gajapathi monarchs, Kumara Hamvira Deva, and local amphibious OddeRajulu, VaddeRajulu, and Paika warriors worshipped her before embarking on river and coastal campaigns.',
      hi: 'कोल्लेरु झील के मध्य स्थित ऐतिहासिक जलदुर्ग "कोल्लेतिकोटा" की अधिष्ठात्री माता। गजपति सम्राटों, कुमार हम्मीर देव और ओड्डेराजुलु, वड्डेराजुलु व पाइका योद्धाओं ने प्रत्येक युद्ध अभियान से पूर्व माता का आशीर्वाद प्राप्त किया।',
      te: 'కొల్లేరు సరస్సు నడిబొడ్డున ఉన్న చారిత్రక కొల్లేటికోట జలదుర్గంలో వెలసిన శక్తిస్వరూపిణి. గజపతి మహారాజులు, కుమార హంవీర దేవుడు, పైకా యోధులు, ఒడ్డేరాజులు యుద్దాలకు వెళ్లేముందు ఈ అమ్మవారిని పూజించేవారు.',
      kn: 'ಕೊಲ್ಲೇರು ಕೆರೆಯ ಮಧ್ಯದಲ್ಲಿರುವ ಐತಿಹಾಸಿಕ ಕೋಟೆಯ ರಕ್ಷಕ ದೇವತೆ. ಗಜಪತಿ ರಾಜರು ಮತ್ತು ಒಡ್ಡೇರಾಜುಲು ಯೋಧರು ಈ ತಾಯಿಯನ್ನು ಪೂಜಿಸುತ್ತಿದ್ದರು.',
      ta: 'கொல்லேரு ஏரிக்கோட்டையின் காவல் தெய்வமான பெத்திண்ட்லம்மா தாயாரை கஜபதி மன்னர்கள் வழிபட்டனர்.',
      mr: 'कोल्लेरू सरोवरातील जलकिल्ल्याची कुलदेवता. गनिमी काव्याने लढणारे ओड्डेराजुलू सैनिक या देवीची पूजा करत.',
      or: 'କୋଲ୍ଲେରୁ ହ୍ରଦ ମଧ୍ୟରେ ଅବସ୍ଥିତ ଐତିହାସିକ ଦୁର୍ଗର କୁଳଦେବୀ। ଗଜପତି ଓ ପାଇକ ଯୋଦ୍ଧାମାନେ ଯୁଦ୍ଧ ପୂର୍ବରୁ ପୂଜାର୍ଚ୍ଚନା କରୁଥିଲେ।',
      bn: 'কোল্লেরু হ্রদের জলদুর্গের অধিষ্ঠাত্রী দেবী যাঁর আশীর্বাদ নিয়ে গজপতি ও পাইক যোদ্ধারা যুদ্ধে যেতেন।'
    },
    biography: {
      en: 'Historical traditions record that during siege operations by Delhi Sultans and regional adversaries, the Kolletikota water fortress remained impregnable due to the divine presence of Peddintlamma and the guerrilla boat prowess of the OddeRajulu and Vadde forces.',
      hi: 'ऐतिहासिक स्रोतों के अनुसार जब सुल्तानों की सेना ने आक्रमण किया, तब कोल्लेतिकोटा जलदुर्ग अजेय रहा। ओड्डेराजुलु और वड्डे सैनिकों ने माता के ध्वज तले शत्रु सेनाओं को परास्त किया।',
      te: 'ముస్లిం సుల్తానులు మరియు శత్రు సైన్యాలు కొల్లేరుపై దండెత్తినప్పుడు, పెద్దింట్లమ్మ దేవి కటాక్షంతో, ఒడ్డేరాజులు, వడ్డెర నావికా దళాలు ఆ అగాధ జలాల్లో శత్రువులను తుదముట్టించాయి.',
      kn: 'ಶತ್ರು ಸೈನ್ಯಗಳು ಕೋಟೆಯನ್ನು ಮುತ್ತಿಗೆ ಹಾಕಿದಾಗ ಜಲಪಡೆಗಳು ದೇವಿಯ ಕೃಪೆಯಿಂದ ಶತ್ರುಗಳನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸಿದವು.',
      ta: 'பகைவர் படைகளை விரட்டியடிக்க படகுப் படைகளுக்கு அருள் பாலித்த தெய்வம்.',
      mr: 'शत्रूंच्या आक्रमणापासून जलदुर्गाचे रक्षण करणाऱ्या सैनिकांचे श्रद्धास्थान.',
      or: 'ଶତ୍ରୁ ଆକ୍ରମଣରୁ ଦୁର୍ଗ ରକ୍ଷା କରିବାରେ ଏହି ଦେବୀଙ୍କ କୃପା ସର୍ବବିଦିତ।',
      bn: 'শত্রু আক্রমণ থেকে জলদুর্গ রক্ষা করার ক্ষেত্রে দেবী পেদ্দিণ্টলম্মার কৃপা সর্বজনবিদিত।'
    },
    majorContributions: [
      {
        en: 'Sacred spiritual unifying symbol for the amphibious OddeRajulu, VaddeRajulu, and Odiyaraju families.',
        hi: 'ओड्डेराजुलु, वड्डेराजुलु और ओडियाराजू समाजों की आध्यात्मिक एकता और आत्मरक्षा का शाश्वत केंद्र।',
        te: 'ఒడ్డేరాజులు, వడ్డేరాజులు మరియు ఒడియారాజు వంశాల ఆధ్యాత్మిక ఐక్యతకు పవిత్ర ప్రతీక.',
        kn: 'ಒಡ್ಡೇರಾಜುಲು ಮತ್ತು ವಡಿಯಾರಾಜುಲು ಸಮಾಜದ ಧಾರ್ಮಿಕ ಏಕತೆಯ ಮಹಾನ್ ಕೇಂದ್ರ.',
        ta: 'ஒட்டேராஜுலு மற்றும் வடியாராஜுலு சமூகங்களின் ஆன்மீக ஒற்றுமையின் அடையாளம்.',
        mr: 'ओड्डेराजुलू आणि वड्डेराजुलू समाजाच्या सांस्कृतिक व धार्मिक एकतेचे केंद्र.',
        or: 'ଓଡ୍ଡେରାଜୁଲୁ ତଥା ଭଡ୍ଡେରାଜୁଲୁ ସମାଜର ଆଧ୍ୟାତ୍ମିକ ଏକତାର ଚିରନ୍ତନ କେନ୍ଦ୍ର।',
        bn: 'ওড্ডেরাজুলু ও ভাড্ডেরাজুলু সম্প্রদায়ের আধ্যাত্মিক সংহতির চিরন্তন কেন্দ্র।'
      },
      {
        en: 'Preserved the historic aquatic fortification heritage of Kolleru across six centuries.',
        hi: 'छह शताब्दियों से कोल्लेरु के ऐतिहासिक जलदुर्ग और नौका-संस्कृति की स्मृति को जीवित रखा।',
        te: 'ఆరు శతాబ్దాలుగా కొల్లేరు జలదుర్గ చారిత్రక వైభవాన్ని సజీవంగా కాపాడారు.',
        kn: 'ಆರು ಶತಮಾನಗಳಿಂದ ಕೊಲ್ಲೇರು ಜಲಕೋಟೆಯ ಪರಂಪರೆಯನ್ನು ಕಾಪಾಡಿಕೊಂಡು ಬಂದಿದೆ.',
        ta: 'ஆறு நூற்றாண்டுகளாக கொல்லேரு நீர்-கோட்டையின் பாரம்பரியத்தைப் பாதுகாத்து வருகிறது.',
        mr: 'सहा शतकांपासून कोल्लेरू जलदुर्गाचा इतिहास जिवंत ठेवला.',
        or: 'ଛଅ ଶତାବ୍ଦୀ ଧରି କୋଲ୍ଲେରୁ ଜଳଦୁର୍ଗର ଐତିହ୍ୟକୁ ସଂରକ୍ଷିତ ରଖିଛି।',
        bn: 'ছয় শতাব্দী ধরে কোল্লেরু জলদুর্গের ঐতিহাসিক ঐতিহ্য রক্ষা করে চলেছে।'
      }
    ],
    evidenceSources: [
      'Mackenzie Manuscripts, Kolletikota Kaifiyat',
      'Robert Sewell, "Lists of the Antiquities of the Madras Presidency"',
      'Eluru District Gazetteer on Kolleru Aquatic Bastions'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 14. Kolani Rudra Deva Nayaka & Lake Chieftains
  {
    id: 'kolani_rudra_deva',
    name: {
      en: 'Kolani Rudra Deva Nayaka & Lake Chieftains',
      hi: 'कोलनी रुद्र देव नायक एवं जलदुर्ग नायक',
      te: 'కొలని రుద్రదేవ నాయకుడు మరియు సరస్సు దుర్గాధిపతులు',
      kn: 'ಕೊಲನಿ ರುದ್ರದೇವ ನಾಯಕ ಮತ್ತು ಕೆರೆ ಕೋಟೆ ನಾಯಕರು',
      ta: 'கொலானி ருத்ர தேவ நாயக்கர் மற்றும் நீர்-கோட்டைத் தலைவர்கள்',
      mr: 'कोलनी रुद्र देव नायक आणि जलदुर्ग प्रमुख',
      or: 'କୋଲାନି ରୁଦ୍ର ଦେବ ନାୟକ ଓ ହ୍ରଦ ଦୁର୍ଗାଧିପତି',
      bn: 'কোলানি রুদ্র দেব নায়ক এবং হ্রদ দুর্গাধ্যক্ষগণ'
    },
    titles: {
      en: 'Commander of Kolletikota Bastion, Forebear of Kolani Vadiyarajulu, OddeRajulu & VaddeRajulu Chieftains',
      hi: 'कोल्लेतिकोटा के महानायक, कोलनी वडियाराजुलु, ओड्डेराजुलु एवं वड्डेराजुलु क्षत्रपों के आदि पूर्वज',
      te: 'కొల్లేటికోట రక్షక మహాదండనాయకుడు, కొలని వడియారాజులు, ఒడ్డేరాజులు మరియు వడ్డేరాజుల మూలపురుషుడు',
      kn: 'ಕೊಲ್ಲೇಟಿಕೋಟೆಯ ದಂಡನಾಯಕ, ವಡಿಯಾರಾಜುಲು ಮತ್ತು ಒಡ್ಡೇರಾಜುಲು ನಾಯಕರ ಆದಿಪುರುಷ',
      ta: 'கொல்லேடிகோட்டைத் தளபதி, வடியாராஜுலு மற்றும் ஒட்டேராஜுலு தலைவர்களின் முன்னோடி',
      mr: 'कोल्लेतिकोटा जलदुर्गाचे सेनापती, वडियाराजुलू व ओड्डेराजुलू घराण्याचे पूर्वज',
      or: 'କୋଲ୍ଲେତିକୋଟାର ମହାସେନାପତି, ଭାଡିଆରାଜୁଲୁ ତଥା ଓଡ୍ଡେରାଜୁଲୁ ନାୟକଙ୍କ ଆଦିପୁରୁଷ',
      bn: 'কোল্লেটিকোটা দুর্গের মহাধিনায়ক, ভাডিয়ারাজুলু ও ওড্ডেরাজুলু নায়কদের আদিপুরুষ'
    },
    branches: [
      'OddeRajulu',
      'VaddeRajulu',
      'OddeRazulu',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddaNayakkar',
      'Vadiyarajulu',
      'vadde',
      'Odde',
      'Odiyaraju'
    ],
    era: {
      en: '13th – 14th Century CE',
      hi: '13वीं – 14वीं शताब्दी ईस्वी',
      te: '13వ – 14వ శతాబ్దం',
      kn: '೧೩ – ೧೪ನೇ ಶತಮಾನ',
      ta: '13 – 14 ஆம் நூற்றாண்டு',
      mr: '१३ वे – १४ वे शतक',
      or: '୧୩ଶ – ୧୪ଶ ଶତାବ୍ଦୀ',
      bn: '১৩শ – ১৪শ শতাব্দী'
    },
    region: {
      en: 'Kolleru Lake, Kolani (Sarasipura), Vengi, & Coastal Andhra',
      hi: 'कोल्लेरु झील, कोलनी (सरसीपुर), वेंगी एवं तटीय आंध्र',
      te: 'కొల్లేరు సరస్సు, కొలని (సరసీపురం), వేంగి మరియు కోస్తా ఆంధ్ర',
      kn: 'ಕೊಲ್ಲೇರು ಕೆರೆ, ಕೊಲನಿ, ವೆಂಗಿ ಪ್ರದೇಶ',
      ta: 'கொல்லேரு ஏரி, கொலானி மற்றும் கடற்கரை ஆந்திரா',
      mr: 'कोल्लेरू सरोवर, कोलनी आणि किनारपट्टी आंध्र',
      or: 'କୋଲ୍ଲେରୁ ହ୍ରଦ, କୋଲାନି, ଭେଙ୍ଗି ଏବଂ ଉପକୂଳ ଆନ୍ଧ୍ର',
      bn: 'কোল্লেরু হ্রদ, কোলানি ও উপকূলীয় অন্ধ্র'
    },
    badge: 'Aquatic Chieftain & Fortress Defender',
    summary: {
      en: 'Celebrated medieval lake commander who ruled the aquatic island stronghold of Sarasipura (Kolani) in Kolleru Lake. Commanding thousands of amphibious archers and stone masons, his lineage gave rise to the Kolani Vadiyarajulu, OddeRajulu, and VaddeRajulu rulers of Andhra.',
      hi: 'कोल्लेरु झील के जल-द्वीप दुर्ग "सरसीपुर" (कोलनी) के पराक्रमी शासक एवं सेनापति। हजारों कुशल नौका-सैनिकों का नेतृत्व करते हुए उन्होंने तटीय प्रदेश की रक्षा की। उनका कुल आगे चलकर "कोलनी वडियाराजुलु", "ओड्डेराजुलु" और "वड्डेराजुलु" क्षत्रप कहलाया।',
      te: 'కొల్లేరు సరస్సులోని ద్వీప దుర్గమైన సరసీపురానికి (కొలని) అధిపతి. వేలాదిమంది నావికా వీరులను, శిలాకారులను నడిపిస్తూ శత్రుసేనలకు కొరుకుడుపడని రీతిలో జలదుర్గాన్ని కాపాడారు. వీరి వంశీయులే నేడు కొలని వడియారాజులుగా, ఒడ్డేరాజులుగా ప్రసిద్ధి చెందారు.',
      kn: 'ಕೊಲ್ಲೇರು ಕೆರೆಯ ದ್ವೀಪ ಕೋಟೆಯನ್ನು ಶೌರ್ಯದಿಂದ ರಕ್ಷಿಸಿದ ನಾಯಕ. ಇವರ ಸಂತತಿಯೇ ಮುಂದೆ ವಡಿಯಾರಾಜುಲು ಮತ್ತು ಒಡ್ಡೇರಾಜುಲು ಎಂದು ಖ್ಯಾತಿ ಪಡೆಯಿತು.',
      ta: 'கொல்லேரு ஏரித் தீவுக் கோட்டையைக் கட்டிக் காத்த தளபதி. இவரது வழியினரே வடியாராஜுலு மற்றும் ஒட்டேராஜுலு என்று அழைக்கப்பட்டனர்.',
      mr: 'कोल्लेरू सरोवरातील जलदुर्गाचे पराक्रमी किल्लेदार ज्यांच्यापासून वडियाराजुलू व ओड्डेराजुलू घराणे पुढे आले.',
      or: 'କୋଲ୍ଲେରୁ ହ୍ରଦର ଜଳଦୁର୍ଗ ଶାସକ ଯାହାଙ୍କ ବଂଶଧରମାନେ ଭାଡିଆରାଜୁଲୁ ଓ ଓଡ୍ଡେରାଜୁଲୁ ଭାବେ ପରିଚିତ।',
      bn: 'কোল্লেরু হ্রদের জলদুর্গের অপরাজেয় সেনানায়ক যাঁর বংশধরেরা ভাডিয়ারাজুলু ও ওড্ডেরাজুলু নামে খ্যাত।'
    },
    biography: {
      en: 'Inscriptions at Draksharama, Natavadi, and Chebrolu confirm the military supremacy of the Kolani chiefs. Kolani Rudra Deva commanded the royal flotilla, constructing deep stone channels and defensive moats that baffled imperial invaders during the medieval transition.',
      hi: 'द्राक्षाराम और चेब्रोळु के शिलालेखों में कोलनी सरदारों के शौर्य का प्रमाण मिलता है। उन्होंने पत्थरों से जलमार्गों और खाइयों का निर्माण कर दुर्ग को अभेद्य बनाया।',
      te: 'ద్రాక్షారామ శాసనం, చేబ్రోలు శాసనాలలో కొలని నాయకుల ప్రస్తావన ఉంది. సరస్సులో రహస్య జలమార్గాలు, రాతి అగడ్తలు నిర్మించి చక్రవర్తుల దండయాత్రలను నిలువరించారు.',
      kn: 'ದ್ರಾಕ್ಷಾರಾಮ ಶಾಸನಗಳಲ್ಲಿ ಕೊಲನಿ ನಾಯಕರ ಶೌರ್ಯ ದಾಖಲಾಗಿದೆ.',
      ta: 'திராட்சாராம கல்வெட்டுகளில் கொலானி நாயக்கர்களின் அஞ்சாத வீரம் பொறிக்கப்பட்டுள்ளது.',
      mr: 'द्राक्षाराम येथील शिलालेखांमध्ये कोलनी नायकांच्या पराक्रमाची नोंद आहे.',
      or: 'ଦ୍ରାକ୍ଷାରାମ ଶିଳାଲେଖରେ କୋଲାନି ନାୟକଙ୍କ ବୀରତ୍ୱ ବର୍ଣ୍ଣିତ ଅଛି।',
      bn: 'দ্রাক্ষারামের শিলালিপিতে কোলানি নায়কদের রণকৌশল ও বীরত্বের প্রমাণ মেলে।'
    },
    majorContributions: [
      {
        en: 'Mastered amphibious aquatic warfare protecting the coastal Vengi heartland.',
        hi: 'वेंगी और तटीय आंध्र की रक्षा हेतु अद्वितीय जल-युद्ध तकनीक का विकास किया।',
        te: 'తీరప్రాంత వేంగి రక్షణ కొరకు అద్భుతమైన జల-యుద్ధ వ్యూహాలను రూపొందించారు.',
        kn: 'ಕರಾವಳಿ ಆಂಧ್ರದ ರಕ್ಷಣೆಗಾಗಿ ಜಲಯುದ್ಧ ತಂತ್ರಗಳನ್ನು ರೂಪಿಸಿದರು.',
        ta: 'கடற்கரை ஆந்திராவைப் பாதுகாக்க நீர்-போர் உத்திகளை வகுத்தார்.',
        mr: 'किनारपट्टीच्या संरक्षणासाठी अजोड जल-युद्ध तंत्र विकसित केले.',
        or: 'ଉପକୂଳ ଆନ୍ଧ୍ରର ରକ୍ଷା ପାଇଁ ଜଳଯୁଦ୍ଧ କୌଶଳ ପ୍ରୟୋଗ କରିଥିଲେ।',
        bn: 'উপকূলীয় অন্ধ্র রক্ষার্থে নিখুঁত জল-যুদ্ধ কৌশলের প্রবর্তন করেন।'
      },
      {
        en: 'Progenitor of the Kolani Vadiyarajulu and OddeRajulu chieftaincies recognized across Andhra Pradesh.',
        hi: 'आंध्र प्रदेश में प्रतिष्ठित कोलनी वडियाराजुलु और ओड्डेराजुलु राजवंश के पूर्वज।',
        te: 'ఆంధ్రప్రదేశ్‌లో గౌరవించబడే కొలని వడియారాజుల మరియు ఒడ్డేరాజుల పరిపాలక పరంపరకు ఆద్యులు.',
        kn: 'ಆಂಧ್ರಪ್ರದೇಶದ ಗೌರವಾನ್ವಿತ ವಡಿಯಾರಾಜುಲು ಮತ್ತು ಒಡ್ಡೇರಾಜುಲು ಮನೆತನದ ಮೂಲಪುರುಷ.',
        ta: 'ஆந்திராவில் போற்றப்படும் வடியாராஜுலு மற்றும் ஒட்டேராஜுலு குலத்தின் முன்னோடி.',
        mr: 'आंध्रातील प्रसिद्ध वडियाराजुलू व ओड्डेराजुलू घराण्याचे संस्थापक.',
        or: 'ଆନ୍ଧ୍ରପ୍ରଦେଶର ସମ୍ମାନିତ ଭାଡିଆରାଜୁଲୁ ଓ ଓଡ୍ଡେରାଜୁଲୁ ବଂଶର ଆଦିପୁରୁଷ।',
        bn: 'অন্ধ্রের প্রখ্যাত ভাডিয়ারাজুলু ও ওড্ডেরাজুলু শাসনকর্তাদের আদিপুরুষ।'
      }
    ],
    evidenceSources: [
      'Draksharama Bhimeswara Temple Inscriptions (South Indian Inscriptions, Vol. IV)',
      'Chebrolu Epigraph of Kolani Chieftains',
      'N. Venkataramanayya, "The Early Muslim Expansion in South India"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 15. Raja Mukunda Deva Harichandana
  {
    id: 'raja_mukunda_deva',
    name: {
      en: 'Raja Mukunda Deva Harichandana',
      hi: 'राजा मुकुंद देव हरिचंदन',
      te: 'రాజా ముకుంద దేవ హరిచందన',
      kn: 'ರಾಜಾ ಮುಕುಂದ ದೇವ ಹರಿಚಂದನ',
      ta: 'ராஜா முகுந்த தேவ ஹரிசந்தனா',
      mr: 'राजा मुकुंद देव हरिचंदन',
      or: 'ରାଜା ମୁକୁନ୍ଦ ଦେବ ହରିଚନ୍ଦନ',
      bn: 'রাজা মুকুন্দ দেব হরিচন্দন'
    },
    titles: {
      en: 'Last Independent Sovereign of Classical Odra Desha, Utkala & Kalinga, Builder of Triveni Ghat Steps, Commander of Paika Regiments',
      hi: 'शास्त्रीय ओड्र देश, उत्कल व कलिंग के अंतिम स्वतंत्र हिंदू सम्राट, त्रिवेणी घाट (गंगा) सोपानों के निर्माता',
      te: 'ఓడ్ర దేశం, ఉత్కళ, కళింగల చివరి స్వతంత్ర హిందూ చక్రవర్తి, గంగా త్రివేణీ ఘాట్ మెట్ల నిర్మాత, పైకా సేనాధిపతి',
      kn: 'ಓಡ್ರ ದೇಶದ ಕೊನೆಯ ಸ್ವತಂತ್ರ ಹಿಂದೂ ಚಕ್ರವರ್ತಿ, ಪೈಕ ರಕ್ಷಕ',
      ta: 'ஓட்ர தேசத்தின் கடைசி சுதந்திர இந்துப் பேரரசர்',
      mr: 'ओड्र देशाचे शेवटचे स्वतंत्र हिंदू सम्राट',
      or: 'ଶାସ୍ତ୍ରୀୟ ଓଡ଼୍ର ଦେଶ, ଉତ୍କଳ ଓ କଳିଙ୍ଗର ଶେଷ ସ୍ୱାଧୀନ ହିନ୍ଦୁ ସମ୍ରାଟ, ତ୍ରିବେଣୀ ଘାଟ ନିର୍ମାତା',
      bn: 'শাস্ত্রীয় ওড্র দেশ, উৎকল ও কলিঙ্গের শেষ স্বাধীন হিন্দু সম্রাট'
    },
    branches: [
      'Utkala',
      'Kalinga',
      'Trikalinga',
      'Odra',
      'paikas',
      'Od-Khandayaths',
      'Od-Kshatriya',
      'Gajapathis',
      'Od'
    ],
    era: {
      en: '1559 – 1568 CE',
      hi: '1559 – 1568 ईस्वी',
      te: 'సా.శ. 1559 – 1568',
      kn: 'ಕ್ರಿ.ಶ. ೧೫೫೯ – ೧೫೬೮',
      ta: 'பொ.ஆ. 1559 – 1568',
      mr: 'इ.स. १५५९ – १५६୮',
      or: 'ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୫୫୯ – ୧୫୬୮',
      bn: '১৫৫৯ – ১৫৬৮ খ্রিস্টাব্দ'
    },
    region: {
      en: 'Odra Desha, Utkala, Barabati Fort (Cuttack), Puri, & Triveni (Bengal)',
      hi: 'ओड्र देश, उत्कल, बारबाटी दुर्ग (कटक), पुरी एवं त्रिवेणी (बंगाल)',
      te: 'ఓడ్ర దేశం, ఉత్కళ, బారాబటి కోట (కటక్), పూరీ మరియు త్రివేణి (బెంగాల్)',
      kn: 'ಓಡ್ರ ದೇಶ, ಉತ್ಕಳ, ಬಾರಾಬಾಟಿ ಕೋಟೆ (ಕಟಕ್), ಪುರಿ',
      ta: 'ஓட்ர தேசம், பாராபடி கோட்டை, பூரி',
      mr: 'ओड्र देश, उत्कल, बाराबती किल्ला (कटक), पुरी',
      or: 'ଓଡ଼୍ର ଦେଶ, ଉତ୍କଳ, ବାରବାଟୀ ଦୁର୍ଗ (କଟକ), ପୁରୀ ଓ ତ୍ରିବେଣୀ (ବଙ୍ଗ)',
      bn: 'ওড্র দেশ, উৎকল, বারবাটী দুর্গ (কটক), পুরী ও ত্রিবেণী'
    },
    badge: 'Defender of the Realm',
    summary: {
      en: 'The valiant and tragic monarch recognized as the last independent Hindu emperor of unified Odra Desha, Utkala, and Kalinga. Ruling from the nine-storeyed Barabati Fort at Cuttack, he commanded the Paika warrior divisions against Sulaiman Kararani of Bengal, constructed the stone bathing steps at Triveni on the Ganges, and fell heroically defending his motherland.',
      hi: 'एकीकृत ओड्र देश, उत्कल और कलिंग के अंतिम स्वतंत्र हिंदू सम्राट। कटक के प्रसिद्ध नौमंजिला बारबाटी दुर्ग से शासन करते हुए उन्होंने पाइका सेनाओं के बल पर सुल्तान सुलेमान कर्रानी के आक्रमणों का डटकर मुकाबला किया। उन्होंने गंगा के त्रिवेणी घाट पर विशाल पाषाण सोपानों का निर्माण कराया।',
      te: 'ఏకీకృత ఓడ్ర దేశం, ఉత్కళ, కళింగల చివరి స్వతంత్ర హిందూ చక్రవర్తి. కటక్ బారాబటి శిలాదుర్గం నుండి పాలిస్తూ పైకా సైన్యంతో బెంగాల్ సుల్తానుల దండయాత్రలను తిప్పికొట్టారు. గంగానది త్రివేణీ ఘాట్ రాతి మెట్లను నిర్మించి, మాతృభూమి కోసం వీరమరణం పొందారు.',
      kn: 'ಕಟಕ್‌ನ ಬಾರಾಬಾಟಿ ಕೋಟೆಯಿಂದ ಆಳಿದ ಕೊನೆಯ ಸ್ವತಂತ್ರ ಓಡ್ರಾ ದೊರೆ. ಗಂಗಾ ನದಿಯ ತ್ರಿವೇಣಿ ಘಾಟ್ ಮೆಟ್ಟಿಲುಗಳನ್ನು ಕಟ್ಟಿಸಿದ ಧೀಮಂತ.',
      ta: 'கட்டக் பாராபடி கோட்டையிலிருந்து ஆண்ட கடைசி சுதந்திர ஓட்ர மன்னர்.',
      mr: 'कटकच्या बाराबती किल्ल्यावरून राज्य करणारे शेवटचे स्वतंत्र राजे ज्यांनी मातृभूमीसाठी प्राणांची आहुती दिली.',
      or: 'ଏକତ୍ରିତ ଓଡ଼୍ର ଦେଶ ଓ ଉତ୍କଳର ଶେଷ ସ୍ୱାଧୀନ ହିନ୍ଦୁ ସମ୍ରାଟ। କଟକ ବାରବାଟୀ ଦୁର୍ଗରୁ ପାଇକ ସେନା ସହିତ ଶତ୍ରୁ ଆକ୍ରମଣ ପ୍ରତିରୋଧ କରିଥିଲେ।',
      bn: 'ঐক্যবদ্ধ ওড্র দেশ ও উৎকলের শেষ স্বাধীন হিন্দু সম্রাট যিনি বারবাটী দুর্গ থেকে বীর বিক্রমে দেশরক্ষা করেছিলেন।'
    },
    biography: {
      en: 'Mukunda Deva was an ally of Mughal Emperor Akbar, creating a northern counter-balance to the aggressive Sultanate of Bengal. His epigraph at Bhimeswara Temple in Draksharama affirms his sovereign titles. His heroic fall in 1568 CE at Gohiratikiri marked the sunset of classical Odra independence.',
      hi: 'मुकुंद देव ने द्राक्षाराम मंदिर में अपना शिलालेख उत्कीर्ण कराया। 1568 ईस्वी में गोहिरातिकिरी के युद्ध में उनका बलिदान भारतीय इतिहास का अविस्मरणीय अध्याय है।',
      te: 'సా.శ. 1559 లో అధికారంలోకి వచ్చిన ముకుంద దేవుడు ద్రాక్షారామ భీమేశ్వర ఆలయంలో విజయ శాసనం చెక్కించారు. 1568లో గోహిరాటికిరి వద్ద జరిగిన పోరాటంలో మాతృభూమి కోసం అసువులు బాసారు.',
      kn: '೧೫೬೮ರಲ್ಲಿ ಗೋಹಿರಾತಿಕಿರಿಯಲ್ಲಿ ನಡೆದ ಯುದ್ಧದಲ್ಲಿ ವೀರಮರಣವನ್ನಪ್ಪಿದರು.',
      ta: '1568 இல் தாய்நாட்டின் சுதந்திரத்தைக் காக்க போர்க்களத்தில் வீரமரணம் அடைந்தார்.',
      mr: '१५६८ मध्ये गोहिरातिकिरी येथील लढाईत मातृभूमीसाठी धारातीर्थी पडले.',
      or: '୧୫୬୮ ଖ୍ରୀଷ୍ଟାବ୍ଦରେ ଗୋହିରାଟିକିରି ଯୁଦ୍ଧରେ ମାତୃଭୂମିର ସ୍ୱାଧୀନତା ରକ୍ଷା ପାଇଁ ଶହୀଦ ହୋଇଥିଲେ।',
      bn: '১৫৬৮ সালে মাতৃভূমির স্বাধীনতা রক্ষায় নির্ভীকভাবে যুদ্ধ করে আত্মাহুতি দেন।'
    },
    majorContributions: [
      {
        en: 'Constructed the historic stone bathing steps (Mukunda Ghat) at Triveni on the sacred Ganges.',
        hi: 'पवित्र गंगा के तट पर त्रिवेणी में विशाल पाषाण सोपानों (मुकुंद घाट) का निर्माण कराया।',
        te: 'పవిత్ర గంగా తీరంలో త్రివేణి వద్ద ప్రసిద్ధ "ముకుంద ఘాట్" రాతి మెట్లను నిర్మించారు.',
        kn: 'ಗಂಗಾ ನದಿಯ ದಂಡೆಯಲ್ಲಿ ಸುಂದರವಾದ ಮುಕುಂದ ಘಾಟ್ ಕಲ್ಲಿನ ಮೆಟ್ಟಿಲುಗಳನ್ನು ಕಟ್ಟಿಸಿದರು.',
        ta: 'புனித கங்கை நதிக்கரையில் திரிவேணி படித்துறைகளை பாறைகளால் அமைத்தார்.',
        mr: 'पवित्र गंगेच्या काठावर त्रिवेणी येथे दगडी घाटाची निर्मिती केली.',
        or: 'ପବିତ୍ର ଗଙ୍ଗା କୂଳରେ ତ୍ରିବେଣୀ ଘାଟର ଶିଳା ପାହାଚ ନିର୍ମାଣ କରିଥିଲେ।',
        bn: 'পবিত্র গঙ্গার তীরে ত্রিবেণীতে মনোরম পাথরের স্নানঘাট নির্মাণ করান।'
      },
      {
        en: 'Defended Barabati Fort and the sovereignty of classical Odra Desha to the last breath.',
        hi: 'अंतिम सांस तक बारबाटी दुर्ग और ओड्र देश की संप्रभुता की वीरतापूर्वक रक्षा की।',
        te: 'చివరి శ్వాస వరకు బారాబటి కోటను, ఓడ్ర దేశ సార్వభౌమత్వాన్ని ప్రాణాలర్పించి కాపాడారు.',
        kn: 'ಕೊನೆಯುಸಿರಿನವರೆಗೂ ಬಾರಾಬಾಟಿ ಕೋಟೆಯ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ರಕ್ಷಿಸಿದರು.',
        ta: 'பாராபடி கோட்டையை இறுதி மூச்சு வரை வீரத்துடன் பாதுகாத்தார்.',
        mr: 'शेवटच्या श्वासापर्यंत बाराबती किल्ल्याची तटबंदी अभेद्य ठेवली.',
        or: 'ଶେଷ ନିଶ୍ୱାସ ତ୍ୟାଗ କରିବା ପର୍ଯ୍ୟନ୍ତ ବାରବାଟୀ ଦୁର୍ଗର ରକ୍ଷା କରିଥିଲେ।',
        bn: 'শেষ রক্তবিন্দু দিয়ে বারবাটী দুর্গ ও ওড্র দেশের সার্বভৌমত্ব রক্ষা করেন।'
      }
    ],
    evidenceSources: [
      'Draksharama Bhimeswara Temple Inscription of Mukunda Deva (Epigraphia Indica, Vol. XXIX)',
      'Akbarnama of Abul Fazl',
      'H.K. Mahtab, "History of Orissa"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 16. Emperor Langula Narasimha Deva I
  {
    id: 'langula_narasimha_deva',
    name: {
      en: 'Langula Narasimha Deva I',
      hi: 'लांगुला नरसिंह देव प्रथम',
      te: 'లాంగులా నరసింహ దేవ I',
      kn: 'ಲಾಂಗುಲಾ ನರಸಿಂಹ ದೇವ I',
      ta: 'லாங்குலா நரசிம்ம தேவ I',
      mr: 'लांगुला नरसिंह देव १ ले',
      or: 'ଲାଙ୍ଗୁଳା ନରସିଂହ ଦେବ ପ୍ରଥମ',
      bn: 'লাঙ্গুলা নরসিংহ দেব প্রথম'
    },
    titles: {
      en: 'Trikalingadhipati, Builder of Konark Sun Temple, Champion of Eastern Indian Sovereignty & Patron of Oda-Chasa & Odde Guilds',
      hi: 'त्रिकलिंगाधिपति, कोणार्क सूर्य मंदिर के निर्माता, पूर्वी भारत की संप्रभुता के रक्षक सम्राट व ओडा-चासा-ओड्डे शिल्पियों के संरक्षक',
      te: 'త్రికళింగాధిపతి, కోణార్క్ సూర్య దేవాలయ నిర్మాత, తూర్పు భారత సార్వభౌమత్వ రక్షకుడు, ఓడా-చాసా & ఒడ్డే శిల్పుల ఆశ్రయదాత',
      kn: 'ತ್ರಿಕಳಿಂಗಾಧಿಪತಿ, ಕೊಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ ನಿರ್ಮಾತೃ',
      ta: 'திரிகலிங்காதிபதி, கோனார்க் சூரியக் கோயிலைக் கட்டிய பேரரசர்',
      mr: 'त्रिकलिंगाधिपती, कोणार्क सूर्य मंदिराचे निर्माते महासम्राट',
      or: 'ତ୍ରିକଳିଙ୍ଗାଧିପତି, କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ଅମର ନିର୍ମାତା, ପୂର୍ବ ଭାରତର ରକ୍ଷକ ସମ୍ରାଟ',
      bn: 'ত্রিকলিঙ্গাধ্যক্ষ, কোণার্ক সূর্য মন্দিরের নির্মাতা, পূর্ব ভারতের সার্বভৌমত্বের রক্ষক'
    },
    branches: [
      'Trikalinga',
      'Kalinga',
      'Utkala',
      'paikas',
      'Od-Khandayaths',
      'Oda-Chasa',
      'OddeRajulu',
      'Gajapathis',
      'Odra',
      'Od-Kshatriya',
      'Odde',
      'Oddar'
    ],
    era: {
      en: '1238 – 1264 CE (Eastern Ganga Epoch)',
      hi: '1238 – 1264 ईस्वी (पूर्वी गंग साम्राज्य काल)',
      te: 'సా.శ. 1238 – 1264',
      kn: 'ಕ್ರಿ.ಶ. ೧೨೩೮ – ೧೨೬೪',
      ta: 'பொ.ஆ. 1238 – 1264',
      mr: 'इ.स. १२३८ – १२६४',
      or: 'ଖ୍ରୀଷ୍ଟାବ୍ଦ ୧୨୩୮ – ୧୨୬୪',
      bn: '১২৩৮ – ১২৬৪ খ্রিস্টাব্দ'
    },
    region: {
      en: 'Konark, Puri, Cuttack, Lakhnauti (Bengal), Godavari to Ganges',
      hi: 'कोणार्क, पुरी, कटक, लखनौती (बंगाल), गोदावरी से गंगा बेसिन',
      te: 'కోణార్క్, పూరీ, కటక్, లఖ్నౌతి (బెంగాల్), గోదావరి నుండి గంగ',
      kn: 'ಕೊಣಾರ್ಕ್, ಪುರಿ, ಕಟಕ್, ಬಂಗಾಳ ಗಡಿ',
      ta: 'கோனார்க், பூரி, கட்டக், வங்காள எல்லை',
      mr: 'कोणार्क, पुरी, कटक आणि बंगाल सीमा',
      or: 'କୋଣାର୍କ, ପୁରୀ, କଟକ, ଲକ୍ଷ୍ମଣାବତୀ (ବଙ୍ଗ), ଗୋଦାବରୀଠାରୁ ଗଙ୍ଗା',
      bn: 'কোণার্ক, পুরী, কটক, লখনৌতি (বাংলা)'
    },
    badge: 'Monumental Architect & Victorious Sovereign',
    summary: {
      en: 'World-renowned builder of the UNESCO World Heritage Sun Temple at Konark, sculpted entirely of black stone monoliths. He defeated the armies of the Bengal Sultanate, mobilized twelve hundred elite stone masters (Badhei / Odde), and supported the agrarian Oda-Chasa and martial Khandayath guilds across Trikalinga.',
      hi: 'विश्वविख्यात कोणार्क सूर्य मंदिर के अमर निर्माता। उन्होंने बंगाल के सुल्तानों को पराजित किया और बारह सौ कुशल पाषाण-शिल्पियों (बढ़ई/ओड्डे) को संगठित कर समुद्र तट पर विशाल रथ रूपी सूर्य मंदिर का निर्माण कराया। उन्होंने त्रिकलिंग के ओडा-चासा और खंडायत पाइकों को राजकीय संबल प्रदान किया।',
      te: 'ప్రపంచ ప్రసిద్ధిగాంచిన కోణార్క్ సూర్య దేవాలయ నిర్మాత. బెంగాల్ సుల్తానుల సైన్యాలను ఓడించి, పన్నెండు వందల మంది మహాశిల్పులను సమీకరించి సముద్ర తీరాన అద్భుతమైన రాతి రథాన్ని నిలబెట్టిన మహోన్నత చక్రవర్తి. ఓడా-చాసా మరియు ఒడ్డే శిల్పకారుల ప్రజ్ఞకు ఆయన సజీవ తార్కాణం.',
      kn: 'ವಿಶ್ವವಿಖ್ಯಾತ ಕೊಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯವನ್ನು ಕಲ್ಲಿನಲ್ಲಿ ಕಡೆಸಿದ ಧೀಮಂತ ದೊರೆ. ಬಂಗಾಳದ ಸುಲ್ತಾನರನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸಿದರು.',
      ta: 'யுனெஸ்கோ பாரம்பரிய சின்னமான கோனார்க் சூரியக் கோயிலைக் கட்டிய மாமன்னர்.',
      mr: 'जागतिक वारसा असलेले कोणार्क सूर्य मंदिर पाषाणात साकारणारे महान चक्रवर्ती.',
      or: 'ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ନିର୍ମାତା ଯିଏ ବାରଶହ ବଢ଼େଇ/ଓଡ୍ଡେ ଶିଳ୍ପକଳାକୁ ଅମର କରିଥିଲେ।',
      bn: 'ইউনেস্কো বিশ্ব ঐতিহ্য কোণার্ক সূর্য মন্দিরের নির্মাতা যিনি বারোশত দক্ষ ভাস্করকে নেতৃত্ব দিয়েছিলেন।'
    },
    biography: {
      en: 'Ascending the throne in 1238 CE, Narasimha Deva I launched aggressive counter-offensives into Bengal, capturing territories as far north as Lakhnauti. The Kendupatna copper plates describe his unmatched military prowess. For twelve years, his royal treasury funded the cutting, transport, and carving of colossal stone monoliths for Konark.',
      hi: '1238 ईस्वी में सिंहासन संभालते ही नरसिंह देव ने लखनौती (बंगाल) तक अभियान चलाए। उन्होंने बारह वर्षों तक अपने राजकीय कोष से कोणार्क के निर्माण हेतु लाखों टन पत्थरों को नदी व समुद्र मार्ग से मंगवाया।',
      te: 'సా.శ. 1238లో పట్టాభిషిక్తుడైన నరసింహదేవుడు లఖ్నౌతి వరకు దండయాత్రలు నడిపారు. పన్నెండేళ్లపాటు వేలాదిమంది శిల్పులు రాత్రింబవళ్లు శ్రమించి కోణార్క్ అద్భుతాన్ని ఆవిష్కరించారు.',
      kn: '೧೨ ವರ್ಷಗಳ ಕಾಲ ಸಾವಿರಾರು ಕಲ್ಲುಕುಟಿಗರು ಶ್ರಮಿಸಿ ಕೊಣಾರ್ಕ್ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದರು.',
      ta: 'பன்னிரண்டு ஆண்டுகள் பெரும் செலவில் பாறைகளைக் கொண்டுவந்து கோனார்க்கை அமைத்தார்.',
      mr: 'बारा वर्षे अहोरात्र काम करून त्यांनी कोणार्कचे अद्भूत शिल्प साकारले.',
      or: '୧୨ ବର୍ଷ ଧରି ରାଜକୋଷରୁ ବ୍ୟୟ କରି କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ବିଶାଳ ପଥର କାରୁକାର୍ଯ୍ୟ କରାଇଥିଲେ।',
      bn: 'বারো বছর ধরে বিপুল অর্থ ব্যয়ে কোণার্কের বিশাল সূর্য মন্দির নির্মাণ করান।'
    },
    majorContributions: [
      {
        en: 'Built the UNESCO World Heritage Sun Temple of Konark celebrating monumental stone craftsmanship.',
        hi: 'पाषाण शिल्पकला के विश्वविख्यात शिखर "कोणार्क सूर्य मंदिर" का निर्माण कराया।',
        te: 'ప్రపంచ ప్రసిద్ధ కోణార్క్ సూర్య దేవాలయాన్ని నిర్మించి శిల్పకళను శిఖరాగ్రాన నిలిపారు.',
        kn: 'ವಿಶ್ವ ಪ್ರಸಿದ್ಧ ಕೊಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದರು.',
        ta: 'கோனார்க் சூரியக் கோயிலைக் கட்டி உலகப் புகழ்பெற்றார்.',
        mr: 'जगप्रसिद्ध कोणार्क सूर्य मंदिराची निर्मिती केली.',
        or: 'ବିଶ୍ୱ ପ୍ରସିଦ୍ଧ କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ନିର୍ମାଣ କରିଥିଲେ।',
        bn: 'বিশ্বখ্যাত কোণার্ক সূর্য মন্দির নির্মাণ করেন।'
      },
      {
        en: 'Repelled invading armies from eastern India, preserving civilizational art and sanctuaries.',
        hi: 'पूर्वी भारत को विदेशी आक्रमणों से सुरक्षित रख भारतीय संस्कृति और देवालयों की रक्षा की।',
        te: 'తూర్పు భారతదేశాన్ని శత్రు దాడుల నుండి కాపాడి సనాతన సంస్కృతిని పరిరక్షించారు.',
        kn: 'ಪೂರ್ವ ಭಾರತವನ್ನು ರಕ್ಷಿಸಿ ದೇವಾಲಯಗಳನ್ನು ಕಾಪಾಡಿದರು.',
        ta: 'கிழக்கிந்தியப் பகுதிகளைப் பாதுகாத்து கலாச்சாரத்தைக் காத்தார்.',
        mr: 'पूर्व भारताचे रक्षण करून संस्कृती टिकवून ठेवली.',
        or: 'ପୂର୍ବ ଭାରତକୁ ଶତ୍ରୁ ଆକ୍ରମଣରୁ ରକ୍ଷା କରିଥିଲେ।',
        bn: 'পূর্ব ভারতকে বহিরাগত আক্রমণ থেকে সুরক্ষিত রাখেন।'
      }
    ],
    evidenceSources: [
      'Kendupatna Copper Plates of Narasimhadeva I (Epigraphia Indica, Vol. XXVIII)',
      'Tabaqat-i-Nasiri of Minhaj-i-Siraj',
      'K.S. Behera, "Konark: The Heritage of Mankind"'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80'
  },

  // 17. Dr. G. Sathyanarayana Raju
  {
    id: 'dr_g_sathyanarayana_raju',
    name: {
      en: 'Dr. G. Sathyanarayana Raju',
      hi: 'डॉ. जी. सत्यनारायण राजू',
      te: 'డాక్టర్ జి. సత్యనారాయణ రాజు',
      kn: 'ಡಾ. ಜಿ. ಸತ್ಯನಾರಾಯಣ ರಾಜು',
      ta: 'டாக்டர் ஜி. சத்யநாராயண ராஜு',
      mr: 'डॉ. जी. सत्यनारायण राजू',
      or: 'ଡକ୍ଟର ଜି. ସତ୍ୟନାରାୟଣ ରାଜୁ',
      bn: 'ডক্টর জি. সত্যনারায়ণ রাজু'
    },
    titles: {
      en: 'Leader of Suryavamsha Odiyaraju Kshatriya Community, Unifier of OddeRajulu, VaddeRajulu & Kshatriya Rajulu, Archival Publisher',
      hi: 'सूर्यवंश ओडियाराजू क्षत्रिय समाज के शीर्ष नेता, ओड्डेराजुलु, वड्डेराजुलु व क्षत्रिय राजुलु के मार्गदर्शक, डिजिटल पोर्टल प्रकाशक',
      te: 'సూర్యవంశ ఒడియారాజు క్షత్రియ సమాజ అగ్రనేత, ఒడ్డేరాజులు, వడ్డేరాజులు, క్షత్రియ రాజుల సమన్వయకర్త, డిజిటల్ పోర్టల్ రూపకర్త',
      kn: 'ಸೂರ್ಯವಂಶ ಒಡಿಯಾರಾಜು ಕ್ಷತ್ರಿಯ ಸಮಾಜದ ನಾಯಕರು, ಇತಿಹಾಸ ಸಂಶೋಧಕರು',
      ta: 'சூர்யவம்ச ஒடியாராஜு க்ஷத்திரிய சமூகத் தலைவர், வரலாற்று ஆவணப் பதிப்பாளர்',
      mr: 'सूर्यवंशी ओडियाराजू क्षत्रिय समाजाचे मार्गदर्शक नेते, ऐतिहासिक दस्ताऐवज अभ्यासक',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ସମାଜର ମହାନେତା, ଐତିହାସିକ ଦସ୍ତାବିଜୀକରଣ ପ୍ରବକ୍ତା',
      bn: 'সূর্যবংশ ওডিয়ারাজু ক্ষত্রিয় সমাজের শীর্ষ নেতা, ঐতিহাসিক মহাফেজখানা প্রতিষ্ঠাতা'
    },
    branches: [
      'Suryavamsha Kshatriya',
      'Suryavamshi Kshatriya',
      'Suryavamsham Rajulu',
      'Kshatriya Rajulu',
      'OddeRajulu',
      'VaddeRajulu',
      'OddeRazulu',
      'Odiyaraju',
      'Vadiyarajulu',
      'Od-Kshatriya',
      'Oad-Rajputh'
    ],
    era: {
      en: 'Contemporary Era (Active 20th – 21st Century)',
      hi: 'समकालीन युग (सक्रिय 20वीं – 21वीं सदी)',
      te: 'సమకాలీన యుగం (20వ – 21వ శతాబ్దం)',
      kn: 'ಸಮಕಾಲೀನ ಯುಗ (೨೧ನೇ ಶತಮಾನ)',
      ta: 'தற்கால சகாப்தம் (21 ஆம் நூற்றாண்டு)',
      mr: 'समकालीन युग (२१ वे शतक)',
      or: 'ସମକାଳୀନ ଯୁଗ (୨୦ଶ – ୨୧ଶ ଶତାବ୍ଦୀ)',
      bn: 'সমকালীন যুগ (২০শ – ২১শ শতাব্দী)'
    },
    region: {
      en: 'Pan-Indian (Odisha, Andhra Pradesh, Karnataka, Maharashtra, & Gujarat)',
      hi: 'अखिल भारतीय (ओडिशा, आंध्र प्रदेश, कर्नाटक, महाराष्ट्र एवं गुजरात)',
      te: 'అఖిల భారత స్థాయి (ఒడిశా, ఆంధ్రప్రదేశ్, కర్ణాటక, మహారాష్ట్ర మరియు గుజరాత్)',
      kn: 'ಅಖಿಲ ಭಾರತ ಮಟ್ಟ (ಒಡಿಶಾ, ಆಂಧ್ರ, ಕರ್ನಾಟಕ, ಮಹಾರಾಷ್ಟ್ರ)',
      ta: 'அகில இந்திய தளம் (ஒடிசா, ஆந்திரா, கர்நாடகா, மகாராஷ்டிரா)',
      mr: 'अखिल भारतीय (ओडिशा, आंध्र प्रदेश, कर्नाटक, महाराष्ट्र व गुजरात)',
      or: 'ସର୍ବଭାରତୀୟ (ଓଡ଼ିଶା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ, କର୍ଣ୍ଣାଟକ, ମହାରାଷ୍ଟ୍ର ଓ ଗୁଜରାଟ)',
      bn: 'সর্বভারতীয় (ওড়িশা, অন্ধ্রপ্রদেশ, কর্ণাটক, মহারাষ্ট্র ও গুজরাট)'
    },
    badge: 'Community Leader & Archival Publisher',
    summary: {
      en: 'Visionary contemporary leader and scholar of the Suryavamsha Odiyaraju Kshatriya community. He has spearheaded the scientific documentation, epigraphic preservation, and digital archiving linking the OddeRajulu, VaddeRajulu, Kshatriya Rajulu, Suryavamsham Rajulu, and Oad-Rajput branches across India.',
      hi: 'सूर्यवंश ओडियाराजू क्षत्रिय समाज के दूरदर्शी नेता और इतिहास-अन्वेषक। उन्होंने भारतभर के ओड्डेराजुलु, वड्डेराजुलु, क्षत्रिय राजुलु, सूर्यवंशम राजुलु और ओआड-राजपूत समुदायों को जोड़ने वाले ताम्रपत्रों, शिलालेखों और वंशावलियों के वैज्ञानिक दस्तावेजीकरण का सफल नेतृत्व किया है।',
      te: 'సూర్యవంశ ఒడియారాజు క్షత్రియ సమాజపు మహోన్నత సమకాలీన నాయకుడు. దేశవ్యాప్తంగా విస్తరించి ఉన్న ఒడ్డేరాజులు, వడ్డేరాజులు, క్షత్రియ రాజులు, సూర్యవంశం రాజుల తామ్రపత్ర శాసనాలను సేకరించి, పురావస్తు ఆధారాలతో డిజిటల్ చారిత్రక భాండాగారాన్ని నిర్మించి భావితరాలకు అందించిన మార్గదర్శి.',
      kn: 'ಸೂರ್ಯವಂಶ ಒಡಿಯಾರಾಜು ಕ್ಷತ್ರಿಯ ಸಮಾಜದ ಧೀಮಂತ ನಾಯಕರು. ಪ್ರಾಚೀನ ತಾಮ್ರಶಾಸನಗಳು ಮತ್ತು ತಾಳೆಗರಿ ಗ್ರಂಥಗಳನ್ನು ಸಂರಕ್ಷಿಸಿ ಡಿಜಿಟಲ್ ಇತಿಹಾಸ ಸಂಪುಟವನ್ನು ರೂಪಿಸಿದ್ದಾರೆ.',
      ta: 'சூர்யவம்ச ஒடியாராஜு க்ஷத்திரிய சமூகத்தின் பெருமைமிகு தலைவர். செப்பேடுகளையும் கல்வெட்டுகளையும் திரட்டி இணைய ஆவணக் காப்பகத்தை உருவாக்கியவர்.',
      mr: 'सूर्यवंशी ओडियाराजू क्षत्रिय समाजाचे नेते ज्यांनी देशभरातील शिलालेख, ताम्रपट गोळा करून डिजिटल पोर्टलची निर्मिती केली.',
      or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ସମାଜର ଦୂରଦୃଷ୍ଟିସମ୍ପନ୍ନ ନେତା ଯିଏ ତାମ୍ରଫଳକ ଓ ଶିଳାଲେଖର ବୈଜ୍ଞାନିକ ଡିଜିଟାଲ୍ ସଂରକ୍ଷଣ କରିଛନ୍ତି।',
      bn: 'সূর্যবংশ ওডিয়ারাজু ক্ষত্রিয় সমাজের দূরদর্শী নেতা যিনি প্রাচীন তাম্রশাসন ও শিলালিপি সংরক্ষণে ঐতিহাসিক ভূমিকা পালন করেছেন।'
    },
    biography: {
      en: 'Deeply committed to methodological rigor and primary historical evidence, Dr. G. Sathyanarayana Raju has spent decades tracing inscriptions from Cuttack, Puri, and Simhachalam down to the Krishna-Godavari delta and Karnataka. He designed and published the comprehensive digital documentary portal (+91 9480112897), ensuring that community heritage is accessible in eight Indian languages.',
      hi: 'प्रामाणिक इतिहास के प्रति समर्पित डॉ. जी. सत्यनारायण राजू ने दशकों तक कटक, पुरी, सिंहाचलम और कृष्णा-गोदावरी बेसिन में जाकर प्रत्यक्ष शिलालेखों का अध्ययन किया। उन्होंने इस बृहद आठ-भाषाई ऐतिहासिक पोर्टल का निर्माण व प्रकाशन किया (+91 9480112897)।',
      te: 'చారిత్రక ప్రామాణికతే ధ్యేయంగా డాక్టర్ జి. సత్యనారాయణ రాజు దశాబ్దాల పాటు కటక్, పూరీ, సింహాచలం మరియు గోదావరి డెల్టాల్లో స్వయంగా పర్యటించి శిలాశాసనాలను అధ్యయనం చేశారు. ఈ సమగ్ర డిజిటల్ పోర్టల్‌ను రూపకల్పన చేసి ఎనిమిది భారతీయ భాషలలో ప్రచురించారు (+91 9480112897).',
      kn: 'ಪ್ರಾಥಮಿಕ ಶಾಸನಾಧಾರಗಳ ಮೇಲೆ ಸಂಶೋಧನೆ ನಡೆಸಿ ಈ ಎಂಟು ಭಾಷೆಗಳ ಡಿಜಿಟಲ್ ಪೋರ್ಟಲ್ ಅನ್ನು ಲೋಕಾರ್ಪಣೆಗೊಳಿಸಿದ್ದಾರೆ.',
      ta: 'நேரடிக் கல்வெட்டு ஆதாரங்களைத் திரட்டி எட்டு மொழிகளில் இந்த இணையப் பொக்கிஷத்தை உருவாக்கியுள்ளார்.',
      mr: 'दशकांपासून शिलालेख आणि ताम्रपटांचे संशोधन करून हे आठ भाषांमधील डिजिटल पोर्टल प्रकाशित केले.',
      or: 'ଦଶନ୍ଧି ଧରି ଶିଳାଲେଖ ଓ ତାମ୍ରପତ୍ର ଗବେଷଣା କରି ଏହି ଆଠଭାଷୀ ଡିଜିଟାଲ୍ ପୋର୍ଟାଲ୍ ପ୍ରକାଶ କରିଛନ୍ତି।',
      bn: 'কয়েক দশক ধরে শিলালিপি ও তাম্রশাসন নিয়ে গবেষণা করে আটটি ভাষায় এই ডিজিটাল পোর্টাল প্রকাশ করেছেন।'
    },
    majorContributions: [
      {
        en: 'Digitized and published primary epigraphic records establishing the sovereign Suryavamsha Odiyaraju continuum.',
        hi: 'सूर्यवंश ओडियाराजू क्षत्रिय परंपरा के प्रामाणिक शिलालेखों और ताम्रपत्रों का डिजिटलीकरण व प्रकाशन किया।',
        te: 'సూర్యవంశ ఒడియారాజు క్షత్రియ వంశపు ప్రామాణిక శాసనాలను, తామ్రపత్రాలను వెలికితీసి డిజిటలైజ్ చేశారు.',
        kn: 'ಸೂರ್ಯವಂಶದ ಶಾಸನಗಳನ್ನು ಡಿಜಿಟಲೀಕರಣಗೊಳಿಸಿ ಪ್ರಕಟಿಸಿದ್ದಾರೆ.',
        ta: 'சூரியவம்ச ஒடியாராஜு ஆவணங்களை இணையத்தில் பதிவேற்றி பாதுகாத்துள்ளார்.',
        mr: 'सूर्यवंशी ओडियाराजू वारशाच्या ऐतिहासिक कागदपत्रांचे डिजिटायझेशन केले.',
        or: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ ପରମ୍ପରାର ପ୍ରାମାଣିକ ଶିଳାଲେଖଗୁଡ଼ିକୁ ଡିଜିଟାଇଜ୍ କରିଛନ୍ତି।',
        bn: 'সূর্যবংশীয় ওডিয়ারাজু ঐতিহ্যের শিলালিপি ও তাম্রশাসনসমূহ ডিজিটালাইজ করেছেন।'
      },
      {
        en: 'United the pan-Indian community branches across 8 languages with direct WhatsApp and mobile coordination (+91 9480112897).',
        hi: 'व्हाट्सएप (+91 9480112897) और प्रत्यक्ष संपर्क के माध्यम से देश के सभी उपवर्गों में एकता स्थापित की।',
        te: 'వాట్సాప్ (+91 9480112897) మరియు ప్రత్యక్ష సమన్వయం ద్వారా దేశంలోని అన్ని శాఖల ప్రజలలో ఐక్యతను పెంపొందించారు.',
        kn: 'ವಾಟ್ಸಾಪ್ ಮತ್ತು ನೇರ ಸಂಪರ್ಕದ ಮೂಲಕ ದೇಶಾದ್ಯಂತ ಸಮಾಜ ಬಾಂಧವರನ್ನು ಒಗ್ಗೂಡಿಸಿದ್ದಾರೆ.',
        ta: 'வாட்ஸ்அப் மூலம் நாடு முழுவதும் உள்ள சமூக மக்களை ஒன்றிணைத்துள்ளார்.',
        mr: 'व्हॉट्सॲप आणि प्रत्यक्ष संवादातून देशभरातील समाजबांधवांना एकत्र आणले.',
        or: 'ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ ସାରା ଦେଶର ସମାଜ ବାନ୍ଧବମାନଙ୍କ ମଧ୍ୟରେ ଏକତା ଗଢ଼ିଛନ୍ତି।',
        bn: 'হোয়াটসঅ্যাপের মাধ্যমে দেশজুড়ে সমাজের মানুষের মধ্যে দৃঢ় সংযোগ গড়ে তুলেছেন।'
      }
    ],
    evidenceSources: [
      'Archival Field Surveys and Inscription Documentation Reports (2010–2026)',
      'Digital Portal Publisher Credit Register & Legal Heritage Notices',
      'Direct Community Outreach Register (+91 9480112897)'
    ],
    imageUrl: '/assets/dr_g_sathyanarayana_raju.png'
  }
];

export function getPersonsByBranch(branch: CommunityBranch | 'all'): ProminentPerson[] {
  if (branch === 'all') {
    return PROMINENT_PERSONS;
  }
  return PROMINENT_PERSONS.filter(person => person.branches.includes(branch));
}
