import { LanguageCode } from '../types';

export interface SurnameTransliterations {
  en: string;
  hi: string;
  te: string;
  kn: string;
  ta: string;
  mr: string;
  or: string;
  bn: string;
}

export type RawSurnameItem =
  | string
  | {
      surname: string;
      transliterations?: Partial<SurnameTransliterations>;
    };

export interface CommunitySurnameEntry {
  /** 1-based sequential index preserving exact array order and duplicate entries */
  orderIndex: number;
  /** Unique React key combining orderIndex and raw surname so duplicates are never merged */
  id: string;
  /** Exact surname spelling as provided — never modified or translated */
  surname: string;
  /** Category fixed as South-Indian */
  category: 'South-Indian';
  /** Uppercase initial letter (A-Z) for alphabetical grouping and navigation */
  letter: string;
  /** 8-language representation (English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, Bengali) */
  transliterations: SurnameTransliterations;
}

export type AlphabeticalSurnameGroups = Record<string, RawSurnameItem[]>;

export const ALPHABET_LETTERS: string[] = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

/**
 * Verified 8-language transliteration dictionary.
 * Does not invent regional-language spellings; only uses explicitly provided transliterations
 * or preserves the exact original spelling until provided.
 */
export const VERIFIED_SURNAME_TRANSLITERATIONS: Record<
  string,
  Partial<Omit<SurnameTransliterations, 'en'>>
> = {
  // A
  'Alluri': { te: 'అల్లూరి', kn: 'ಅಲ್ಲೂರಿ', ta: 'அல்லூரி', hi: 'अल्लूरि', mr: 'अल्लूरी', or: 'ଅଲ୍ଲୂରି', bn: 'আল্লুরি' },
  'Attari': { te: 'అత్తారి', kn: 'ಅತ್ತಾರಿ', ta: 'அத்தாரி', hi: 'अत्तारि', mr: 'अत्तारी', or: 'ଅତ୍ତାରି', bn: 'আত্তারি' },
  'Alakunta': { te: 'అలకుంట', kn: 'ಅಲಕುಂಟ', ta: 'அலகுண்டா', hi: 'अलकुंटा', mr: 'अलकुंटा', or: 'ଅଳକୁଣ୍ଟା', bn: 'আলকুন্তা' },
  'Achi Nalavi': { te: 'అచ్చి నలవి', kn: 'ಅಚ್ಚಿ ನಲವಿ', ta: 'அச்சி நலவி', hi: 'अच्चि नलवि', mr: 'अच्ची नलवी', or: 'ଅଚ୍ଚି ନଲବି', bn: 'আচ্চি নলভি' },
  'Allugala': { te: 'అల్లుగల', kn: 'ಅಲ್ಲುಗಲ', ta: 'அல்லுகல', hi: 'अल्लुगल', mr: 'अल्लुगल', or: 'ଅଲ୍ଲୁଗଲ', bn: 'আল্লুগল' },
  'Achhi': { te: 'అచ్చి', kn: 'ಅಚ್ಚಿ', ta: 'அச்சி', hi: 'अच्छी', mr: 'अच्छी', or: 'ଅଚ୍ଛି', bn: 'আচ্ছি' },
  'Achitani': { te: 'అచితాని', kn: 'ಅಚಿತಾನಿ', ta: 'அசிதானி', hi: 'अचितानी', mr: 'अचितानी', or: 'ଅଚିତାନି', bn: 'আচিতানি' },
  'Allepu': { te: 'అల్లెపు', kn: 'ಅಲ್ಲೆಪು', ta: 'அல்லெபு', hi: 'अल्लेपु', mr: 'अल्लेपू', or: 'ଅଲ୍ଲେପୁ', bn: 'আল্লেপু' },
  'Akula': { te: 'ఆకుల', kn: 'ಆಕುಲ', ta: 'ஆகுல', hi: 'आकुल', mr: 'आकुल', or: 'ଆକୁଳ', bn: 'আকুল' },
  'Adavi': { te: 'అడవి', kn: 'ಅಡವಿ', ta: 'அடவி', hi: 'अडवि', mr: 'अडवी', or: 'ଅଡବି', bn: 'আড়বি' },

  // B
  'Bose': { te: 'బోస్', kn: 'ಬೋಸ್', ta: 'போஸ்', hi: 'बोस', mr: 'बोस', or: 'ବୋଷ', bn: 'বোস' },
  'Bale': { te: 'బాలె', kn: 'ಬಾಲೆ', ta: 'பாலே', hi: 'बाले', mr: 'बाले', or: 'ବାଲେ', bn: 'বালে' },
  'Bellam Konda': { te: 'బెల్లంకొండ', kn: 'ಬೆಲ್ಲಂ ಕೊಂಡ', ta: 'பெல்லம் கொண்டா', hi: 'बेल्लम कोंडा', mr: 'बेल्लम कोंडा', or: 'ବେଲ୍ଲମ କୋଣ୍ଡା', bn: 'বেল্লাম কোন্ডা' },
  'Bimutaka': { te: 'బిముటక', kn: 'ಬಿಮುಟಕ', ta: 'பிமுடக', hi: 'बिमुटक', mr: 'बिमुटक', or: 'ବିମୁଟକ', bn: 'বিমুটক' },
  'Banalolla': { te: 'బానలోళ్ళ', kn: 'ಬಾನಲೊಳ್ಳ', ta: 'பானலோல்ல', hi: 'बानलोल्ल', mr: 'बानलोल्ल', or: 'ବାନଲୋଲ୍ଲ', bn: 'বানলোল্ল' },
  'Banala': { te: 'బానాల', kn: 'ಬಾನಾಲ', ta: 'பானால', hi: 'बानाल', mr: 'बानाल', or: 'ବାନାଲ', bn: 'বানাল' },
  'Bimukkala': { te: 'బిముక్కల', kn: 'ಬಿಮುಕ್ಕಲ', ta: 'பிமுக்கல', hi: 'बिमुक्कल', mr: 'बिमुक्कल', or: 'ବିମୁକ୍କଲ', bn: 'বিমুক্কল' },
  'Bimutukala': { te: 'బిముటుకల', kn: 'ಬಿಮುಟುಕಲ', ta: 'பிமுடுகல', hi: 'बिमुटुकल', mr: 'बिमुटुकल', or: 'ବିମୁଟୁକଲ', bn: 'বিমুটুকল' },
  'Bhoorsu': { te: 'భూర్సు', kn: 'ಭೂರ್ಸು', ta: 'பூர்சு', hi: 'भूर्सु', mr: 'भूर्सू', or: 'ଭୂର୍ସୁ', bn: 'ভূর্সু' },
  'Bhoosata': { te: 'భూసట', kn: 'ಭೂಸಟ', ta: 'பூசட', hi: 'भूसट', mr: 'भूसट', or: 'ଭୂସଟ', bn: 'ভূসট' },
  'Bankavallu': { te: 'బంకవాళ్ళు', kn: 'ಬಂಕವಾಳ್ಳು', ta: 'பங்கவால்லு', hi: 'बंकवाल्लु', mr: 'बंकवाल्लू', or: 'ବଙ୍କବାଲ୍ଲୁ', bn: 'বঙ্কভাল্লু' },
  'Bandi': { te: 'బండి', kn: 'ಬಂಡಿ', ta: 'பண்டி', hi: 'बंडी', mr: 'बंडी', or: 'ବଣ୍ଡି', bn: 'বন্ডি' },
  'Banda': { te: 'బండ', kn: 'ಬಂಡ', ta: 'பண்டா', hi: 'बंडा', mr: 'बंडा', or: 'ବଣ୍ଡା', bn: 'বন্ডা' },
  'Bandaru': { te: 'బండారు', kn: 'ಬಂಡಾರು', ta: 'பண்டாரு', hi: 'बंडारू', mr: 'बंडारू', or: 'ବଣ୍ଡାରୁ', bn: 'বন্ডারু' },
  'Baimutukollu': { te: 'బైముటుకోళ్ళు', kn: 'ಬೈಮುಟುಕೊಳ್ಳು', ta: 'பைமுடுகொல்லு', hi: 'बैमुटुकोल्लु', mr: 'बैमुटुकोल्लू', or: 'ବୈମୁଟୁକୋଲ୍ଲୁ', bn: 'বৈমুটুকোল্লু' },
  'Bukkamulu': { te: 'బుక్కములు', kn: 'ಬುಕ್ಕಮುಲು', ta: 'புக்கமுலு', hi: 'बुक्कमुलु', mr: 'बुक्कमुलू', or: 'ବୁକ୍କମୁଲୁ', bn: 'বুক্কমুলু' },
  'Bukkala': { te: 'బుక్కల', kn: 'ಬುಕ್ಕಲ', ta: 'புக்கல', hi: 'बुक्कल', mr: 'बुक्कल', or: 'ବୁକ୍କଲ', bn: 'বুক্কল' },
  'Bursu': { te: 'బుర్సు', kn: 'ಬುರ್ಸು', ta: 'புர்சு', hi: 'बुर्सु', mr: 'बुर्सू', or: 'ବୁର୍ସୁ', bn: 'বুর্সু' },
  'Burusu': { te: 'బురుసు', kn: 'ಬುರುಸು', ta: 'புருசு', hi: 'बुरुसु', mr: 'बुरुसू', or: 'ବୁରୁସୁ', bn: 'বুরুসু' },
  'Botamthollu': { te: 'బోతంతోళ్ళు', kn: 'ಬೋತಂತೊಳ್ಳು', ta: 'போதந்தொல்லு', hi: 'बोतंतोल्लु', mr: 'बोतंतोल्लू', or: 'ବୋତନ୍ତୋଲ୍ଲୁ', bn: 'বোতন্তোল্লু' },
  'Bodasu': { te: 'బోడసు', kn: 'ಬೋಡಸು', ta: 'போடசு', hi: 'बोडसु', mr: 'बोडसू', or: 'ବୋଡସୁ', bn: 'বোড়সু' },
  'Bhusala': { te: 'భూసాల', kn: 'ಭೂಸಾಲ', ta: 'பூசால', hi: 'भूसाल', mr: 'भूसाल', or: 'ଭୂସାଲ', bn: 'ভূসাল' },
  'Battula': { te: 'బత్తుల', kn: 'ಬತ್ತುಲ', ta: 'பத்துல', hi: 'बत्तुल', mr: 'बत्तुल', or: 'ବତ୍ତୁଲ', bn: 'বত্তুল' },
  'Bontha': { te: 'బొంత', kn: 'ಬೊಂತ', ta: 'பொந்த', hi: 'बोंथा', mr: 'बोंथा', or: 'ବୋନ୍ଥା', bn: 'বোন্থা' },
  'Boggula': { te: 'బొగ్గుల', kn: 'ಬೊಗ್ಗುಲ', ta: 'பொக்குல', hi: 'बोग्गुल', mr: 'बोग्गुल', or: 'ବୋଗ୍ଗୁଲ', bn: 'বোগ্গুল' },

  // C
  'Challa': { te: 'చల్లా', kn: 'ಚಲ್ಲಾ', ta: 'சல்லா', hi: 'चल्ला', mr: 'चल्ला', or: 'ଚଲ୍ଲା', bn: 'চল্লা' },
  'Chandragiri': { te: 'చంద్రగిరి', kn: 'ಚಂದ್ರಗಿರಿ', ta: 'சந்திரகிரி', hi: 'चंद्रगिरि', mr: 'चंद्रगिरी', or: 'ଚନ୍ଦ୍ରଗିରି', bn: 'চন্দ্রগিরি' },
  'Chembeti': { te: 'చెంబేటి', kn: 'ಚೆಂಬೇಟಿ', ta: 'செம்பேடி', hi: 'चेंबेटि', mr: 'चेंबेटी', or: 'ଚେମ୍ବେଟି', bn: 'চেম্বেটি' },
  'Chenjoti': { te: 'చెంజోటి', kn: 'ಚೆಂಜೋಟಿ', ta: 'செஞ்சோடி', hi: 'चेंजोटि', mr: 'चेंजोटी', or: 'ଚେଞ୍ଜୋଟି', bn: 'চেঞ্জোটি' },
  'Chemloti': { te: 'చెంలోటి', kn: 'ಚೆಂಲೋಟಿ', ta: 'செம்லோடி', hi: 'चेमलोटी', mr: 'चेमलोटी', or: 'ଚେମଲୋଟି', bn: 'চেমলোটি' },
  'Chencheti': { te: 'చెంచేటి', kn: 'ಚೆಂಚೇಟಿ', ta: 'செஞ்சேடி', hi: 'चेंचेटि', mr: 'चेंचेटी', or: 'ଚେଞ୍ଚେଟି', bn: 'চেঞ্চেটি' },
  'Chempeti': { te: 'చెంపేటి', kn: 'ಚೆಂಪೇಟಿ', ta: 'செம்பேடி', hi: 'चेंपेटि', mr: 'चेंपेटी', or: 'ଚେମ୍ପେଟି', bn: 'চেম্পেটি' },
  'Champati': { te: 'చంపాటి', kn: 'ಚಂಪಾಟಿ', ta: 'சம்பாடி', hi: 'चंपाटि', mr: 'चंपाटी', or: 'ଚମ୍ପାଟି', bn: 'চম্পাটি' },
  'Chinthala': { te: 'చింతల', kn: 'ಚಿಂತಲ', ta: 'சிந்தல', hi: 'चिंतल', mr: 'चिंतल', or: 'ଚିନ୍ତଲ', bn: 'চিন্তল' },

  // D
  'Dandu': { te: 'దండు', kn: 'ದಂಡು', ta: 'தண்டு', hi: 'दंडु', mr: 'दंडू', or: 'ଦଣ୍ଡୁ', bn: 'দন্ডু' },
  'Dandugula': { te: 'దండుగుల', kn: 'ದಂಡುಗುಲ', ta: 'தண்டுகுல', hi: 'दंडुगुल', mr: 'दंडुगुल', or: 'ଦଣ୍ଡୁଗୁଲ', bn: 'দন্ডুগুল' },
  'Derangula': { te: 'దేరంగుల', kn: 'ದೇರಂಗುಲ', ta: 'தேரங்குல', hi: 'देरंगुल', mr: 'देरंगुल', or: 'ଦେରଙ୍ଗୁଲ', bn: 'দেরঙ্গুল' },
  'Devalla': { te: 'దేవళ్ళ', kn: 'ದೇವಳ್ಳ', ta: 'தேவல்ல', hi: 'देवल्ल', mr: 'देवल्ल', or: 'ଦେବଲ୍ଲ', bn: 'দেবল্ল' },
  'Dandigiri': { te: 'దండిగిరి', kn: 'ದಂಡಿಗಿರಿ', ta: 'தண்டிகிரி', hi: 'दंडिगिरि', mr: 'दंडिगिरी', or: 'ଦଣ୍ଡିଗିରି', bn: 'দন্ডিগিরি' },
  'Dalavayi': { te: 'దళవాయి', kn: 'ದಳವಾಯಿ', ta: 'தளவாயி', hi: 'दलवायि', mr: 'दळवायी', or: 'ଦଳବାୟି', bn: 'দলবায়ি' },
  'Dayyamuthukollu': { te: 'దయ్యముతుకోళ్ళు', kn: 'ದಯ್ಯಮುತುಕೊಳ್ಳು', ta: 'தய்யமுதுகொல்லு', hi: 'दय्यमुतुकोल्लु', mr: 'दय्यमुतुकोल्लू', or: 'ଦୟ୍ୟମୁତୁକୋଲ୍ଲୁ', bn: 'দয়্যমুতুকোল্লু' },
  'Dyarangula': { te: 'ద్యారంగుల', kn: 'ದ್ಯಾರಂಗುಲ', ta: 'தியாரங்குல', hi: 'द्यारंगुल', mr: 'द्यारंगुल', or: 'ଦ୍ୟାରଙ୍ଗୁଲ', bn: 'দ্যারঙ্গুল' },
  'Devandla': { te: 'దేవండ్ల', kn: 'ದೇವಂಡ್ಲ', ta: 'தேவண்ட்ல', hi: 'देवंड्ल', mr: 'देवंड्ल', or: 'ଦେବଣ୍ଡ୍ଲ', bn: 'দেবন্ড্ল' },
  'Dasarla': { te: 'దాసర్ల', kn: 'ದಾಸರ್ಲ', ta: 'தாசர்ல', hi: 'दासर्ल', mr: 'दासर्ल', or: 'ଦାସର୍ଲ', bn: 'দাসর্ল' },
  'Darmavaram': { te: 'ధర్మవరం', kn: 'ಧರ್ಮವರಂ', ta: 'தர்மவரம்', hi: 'धर्मवरम', mr: 'धर्मवरम', or: 'ଧର୍ମବରମ', bn: 'ধর্মবরম' },
  'Darga': { te: 'దర్గా', kn: 'ದರ್ಗಾ', ta: 'தர்கா', hi: 'दर्गा', mr: 'दर्गा', or: 'ଦର୍ଗା', bn: 'দর্গা' },

  // E
  'Edagopuru': { te: 'ఎడగోపురు', kn: 'ಎಡಗೋಪುರು', ta: 'எடகோபுரு', hi: 'एडगोपुर', mr: 'एडगोपुरू', or: 'ଏଡଗୋପୁରୁ', bn: 'এড়গোপুর' },
  'Enagotthu': { te: 'ఎనగొత్తు', kn: 'ಎನಗೊತ್ತು', ta: 'எனகொத்து', hi: 'एनगोत्थु', mr: 'एनगोत्थू', or: 'ଏନଗୋତ୍ଥୁ', bn: 'এনগোত্থু' },
  'Ettari': { te: 'ఎత్తారి', kn: 'ಎತ್ತಾರಿ', ta: 'எத்தாரி', hi: 'एत्तारि', mr: 'एत्तारी', or: 'ଏତ୍ତାରି', bn: 'এত্তারি' },
  'Etharu': { te: 'ఎతారు', kn: 'ಎತಾರು', ta: 'எதாரு', hi: 'एथारु', mr: 'एथारू', or: 'ଏଥାରୁ', bn: 'এথারু' },
  'Earla': { te: 'ఈర్ల', kn: 'ಈರ್ಲ', ta: 'ஈர்ல', hi: 'ईर्ल', mr: 'ईर्ल', or: 'ଈର୍ଲ', bn: 'ঈর্ল' },
  'Earla Mutaka': { te: 'ఈర్ల ముటక', kn: 'ಈರ್ಲ ಮುಟಕ', ta: 'ஈர்ல முடக', hi: 'ईर्ल मुटक', mr: 'ईर्ल मुटक', or: 'ଈର୍ଲ ମୁଟକ', bn: 'ঈর্ল মুটক' },
  'Edigoti': { te: 'ఎదిగోటి', kn: 'ಎದಿಗೋಟಿ', ta: 'எதிகோடி', hi: 'एदिगोटि', mr: 'एदिगोटी', or: 'ଏଦିଗୋଟି', bn: 'এদিগোটি' },
  'Edagottlu': { te: 'ఎడగొట్లు', kn: 'ಎಡಗೊಟ್ಲು', ta: 'எடகொட்லு', hi: 'एडगोट्लु', mr: 'एडगोट्लू', or: 'ଏଡଗୋଟ୍ଲୁ', bn: 'এড়গোট্লু' },
  'Edagoti': { te: 'ఎడగోటి', kn: 'ಎಡಗೋಟಿ', ta: 'எடகோடி', hi: 'एडगोटि', mr: 'एडगोटी', or: 'ଏଡଗୋଟି', bn: 'এড়গোটি' },
  'Eragadinne': { te: 'ఎరగాదిన్నె', kn: 'ಎರಗಾದಿನ್ನೆ', ta: 'எரகாதின்னே', hi: 'एरगादिन्ने', mr: 'एरगादिन्ने', or: 'ଏରଗାଦିନ୍ନେ', bn: 'এরগাদিন্নে' },
  'Eradindla': { te: 'ఎరదిండ్ల', kn: 'ಎರದಿಂಡ್ಲ', ta: 'எரதிண்ட்ல', hi: 'एरदिंड्ल', mr: 'एरदिंड्ल', or: 'ଏରଦିଣ୍ଡ୍ଲ', bn: 'এরদিন্ড্ল' },

  // G
  'Gangaraju': { te: 'గంగరాజు', kn: 'ಗಂಗರಾಜು', ta: 'கங்கராஜு', hi: 'गंगराजू', mr: 'गंगराजू', or: 'ଗଙ୍ଗରାଜୁ', bn: 'গঙ্গরাজু' },
  'Gokaraju': { te: 'గోకరాజు', kn: 'ಗೋಕರಾಜು', ta: 'கோகராஜு', hi: 'गोकराजू', mr: 'गोकराजू', or: 'ଗୋକରାଜୁ', bn: 'গোকরাজু' },
  'Gunji': { te: 'గుంజి', kn: 'ಗುಂಜಿ', ta: 'குஞ்சி', hi: 'गुंजि', mr: 'गुंजी', or: 'ଗୁଞ୍ଜି', bn: 'গুঞ্জি' },
  'Gunja': { te: 'గుంజ', kn: 'ಗುಂಜ', ta: 'குஞ்சா', hi: 'गुंजा', mr: 'गुंजा', or: 'ଗୁଞ୍ଜା', bn: 'গুঞ্জা' },
  'Gampa': { te: 'గంప', kn: 'ಗಂಪ', ta: 'கம்பா', hi: 'गंपा', mr: 'गंपा', or: 'ଗମ୍ପା', bn: 'গম্পা' },
  'Gajjala': { te: 'గజ్జల', kn: 'ಗಜ್ಜಲ', ta: 'கஜ்ஜல', hi: 'गज्जल', mr: 'गज्जल', or: 'ଗଜ୍ଜଲ', bn: 'গজ্জল' },
  'Gunje': { te: 'గుంజె', kn: 'ಗುಂಜೆ', ta: 'குஞ்சே', hi: 'गुंजे', mr: 'गुंजे', or: 'ଗୁଞ୍ଜେ', bn: 'গুঞ্জে' },
  'Gundaga': { te: 'గుండగ', kn: 'ಗುಂಡಗ', ta: 'குண்டக', hi: 'गुंडग', mr: 'गुंडग', or: 'ଗୁଣ୍ଡଗ', bn: 'গুন্ডগ' },
  'Goddendla': { te: 'గొద్దెండ్ల', kn: 'ಗೊದ್ದೆಂಡ್ಲ', ta: 'கொத்தெண்ட்ல', hi: 'गोद्देंड्ल', mr: 'गोद्देंड्ल', or: 'ଗୋଦ୍ଦେଣ୍ଡ୍ଲ', bn: 'গোদ্দেন্ড্ল' },
  'Godella': { te: 'గోదెళ్ళ', kn: 'ಗೋದೆಳ್ಳ', ta: 'கோதெல்ல', hi: 'गोदेल्ल', mr: 'गोदेल्ल', or: 'ଗୋଦେଲ୍ଲ', bn: 'গোদেল্ল' },
  'Gogula': { te: 'గోగుల', kn: 'ಗೋಗುಲ', ta: 'கோகுல', hi: 'गोगुल', mr: 'गोगुल', or: 'ଗୋଗୁଲ', bn: 'গোগুল' },
  'Gosala': { te: 'గోసాల', kn: 'ಗೋಸಾಲ', ta: 'கோசால', hi: 'गोसाल', mr: 'गोसाल', or: 'ଗୋସାଲ', bn: 'গোসাল' },
  'Govula': { te: 'గోవుల', kn: 'ಗೋವುಲ', ta: 'கோவுல', hi: 'गोवुल', mr: 'गोवुल', or: 'ଗୋବୁଲ', bn: 'গোভুল' },
  'Gandipeta': { te: 'గండిపేట', kn: 'ಗಂಡಿಪೇಟ', ta: 'கண்டிப்பேட்டை', hi: 'गंडीपेटा', mr: 'गंडीपेटा', or: 'ଗଣ୍ଡିପେଟା', bn: 'গন্ডিপেটা' },
  'Gandikota': { te: 'గండికోట', kn: 'ಗಂಡಿಕೋಟ', ta: 'கண்டிகோட்டை', hi: 'गंडीकोटा', mr: 'गंडीकोटा', or: 'ଗଣ୍ଡିକୋଟା', bn: 'গন্ডিকোটা' },
  'Gampala': { te: 'గంపల', kn: 'ಗಂಪಲ', ta: 'கம்பல', hi: 'गंपल', mr: 'गंपल', or: 'ଗମ୍ପଲ', bn: 'গম্পল' },
  'Giri': { te: 'గిరి', kn: 'ಗಿರಿ', ta: 'கிரி', hi: 'गिरि', mr: 'गिरी', or: 'ଗିରି', bn: 'গিরি' },
  'Gajula': { te: 'గాజుల', kn: 'ಗಾಜುಲ', ta: 'காஜுல', hi: 'गाजुल', mr: 'गाजुल', or: 'ଗାଜୁଲ', bn: 'গাজুল' },
  'Gantasala': { te: 'ఘంటసాల', kn: 'ಘಂಟಸಾಲ', ta: 'கண்டசாலா', hi: 'घंटसाला', mr: 'घंटसाला', or: 'ଘଣ୍ଟସାଳା', bn: 'ঘণ্টসালা' },
  'Gurudaasu': { te: 'గురుదాసు', kn: 'ಗುರುದಾಸು', ta: 'குருதாசு', hi: 'गुरुदासु', mr: 'गुरुदासू', or: 'ଗୁରୁଦାସୁ', bn: 'গুরুদাসু' },
  'Govindhu': { te: 'గోవిందు', kn: 'ಗೋವಿಂದು', ta: 'கோவிந்து', hi: 'गोविंदु', mr: 'गोविंदू', or: 'ଗୋବିନ୍ଦୁ', bn: 'গোবিন্দু' },

  // J
  'Jaimangala': { te: 'జైమంగళ', kn: 'ಜೈಮಂಗಳ', ta: 'ஜெய்மங்கள', hi: 'जैमंगल', mr: 'जैमंगळ', or: 'ଜୈମଙ୍ଗଳ', bn: 'জৈমঙ্গল' },
  'Jalluri': { te: 'జల్లూరి', kn: 'ಜಲ್ಲೂರಿ', ta: 'ஜல்லூரி', hi: 'जल्लूरि', mr: 'जल्लूरी', or: 'ଜଲ୍ଲୂରି', bn: 'জল্লুরি' },
  'Jarupati': { te: 'జరుపాటి', kn: 'ಜರುಪಾಟಿ', ta: 'ஜருபாடி', hi: 'जरुपाटि', mr: 'जरुपाटी', or: 'ଜରୁପାଟି', bn: 'জরুপাটি' },
  'Jerapati': { te: 'జెరపాటి', kn: 'ಜೆರಪಾಟಿ', ta: 'ஜெரபாடி', hi: 'जेरपाटि', mr: 'जेरपाटी', or: 'ଜେରପାଟି', bn: 'জেরপাটি' },
  'Jeripeti': { te: 'జెరిపేటి', kn: 'ಜೆರಿಪೇಟಿ', ta: 'ஜெரிபேடி', hi: 'जेरिपेटि', mr: 'जेरिपेटी', or: 'ଜେରିପେଟି', bn: 'জেরিপেটি' },
  'Jayanthi': { te: 'జయంతి', kn: 'ಜಯಂತಿ', ta: 'ஜெயந்தி', hi: 'जयंती', mr: 'जयंती', or: 'ଜୟନ୍ତୀ', bn: 'জয়ন্তী' },
  'Jemmisetty': { te: 'జెమ్మిశెట్టి', kn: 'ಜೆಮ್ಮಿಶೆಟ್ಟಿ', ta: 'ஜெம்மிசெட்டி', hi: 'जेम्मिशेट्टी', mr: 'जेम्मिशेट्टी', or: 'ଜେମ୍ମିଶେଟ୍ଟୀ', bn: 'জেম্মিশেট্টি' },
  'Jathava': { te: 'జాతవ', kn: 'ಜಾತವ', ta: 'ஜாதவ', hi: 'जाथव', mr: 'जाथव', or: 'ଜାଥବ', bn: 'জাথব' },
  'Janamula': { te: 'జనముల', kn: 'ಜನಮುಲ', ta: 'ஜனமுல', hi: 'जनमुल', mr: 'जनमुल', or: 'ଜନମୁଲ', bn: 'জনমুল' },

  // K
  'Katriya': { te: 'కత్రియ', kn: 'ಕತ್ರಿಯ', ta: 'கத்ரிய', hi: 'कत्रिय', mr: 'कत्रिय', or: 'କତ୍ରିୟ', bn: 'কত্রিয়' },
  'Kshatriya': { te: 'క్షత్రియ', kn: 'ಕ್ಷತ್ರಿಯ', ta: 'க்ஷத்ரிய', hi: 'क्षत्रिय', mr: 'क्षत्रिय', or: 'କ୍ଷତ୍ରିୟ', bn: 'ক্ষত্রিয়' },
  'Kandula': { te: 'కందుల', kn: 'ಕಂದುಲ', ta: 'கந்துல', hi: 'कंदुल', mr: 'कंदुल', or: 'କନ୍ଦୁଲ', bn: 'কন্দুল' },
  'Kashi': { te: 'కాశీ', kn: 'ಕಾಶಿ', ta: 'காசி', hi: 'काशी', mr: 'काशी', or: 'କାଶୀ', bn: 'কাশী' },
  'Kunchala': { te: 'కుంచాల', kn: 'ಕುಂಚಾಲ', ta: 'குஞ்சால', hi: 'कुंचाल', mr: 'कुंचाल', or: 'କୁଞ୍ଚାଲ', bn: 'কুঞ্চাল' },
  'Kunchem': { te: 'కుంచెం', kn: 'ಕುಂಚೆಂ', ta: 'குஞ்செம்', hi: 'कुंचेम', mr: 'कुंचेम', or: 'କୁଞ୍ଚେମ', bn: 'কুঞ্চেম' },
  'Komura': { te: 'కొముర', kn: 'ಕೊಮುರ', ta: 'கொமுர', hi: 'कोमुर', mr: 'कोमुर', or: 'କୋମୁର', bn: 'কোমুর' },
  'Kasula': { te: 'కాసుల', kn: 'ಕಾಸುಲ', ta: 'காசுல', hi: 'कासुल', mr: 'कासुल', or: 'କାସୁଲ', bn: 'কাসুল' },
  'Kyathi': { te: 'ఖ్యాతి', kn: 'ಖ್ಯಾತಿ', ta: 'க்யாதி', hi: 'ख्याति', mr: 'ख्याती', or: 'ଖ୍ୟାତି', bn: 'খ্যাতি' },
  'Kundi': { te: 'కుంది', kn: 'ಕುಂದಿ', ta: 'குந்தி', hi: 'कुंदि', mr: 'कुंदी', or: 'କୁନ୍ଦି', bn: 'কুন্দি' },
  'Kunchapu': { te: 'కుంచపు', kn: 'ಕುಂಚಪು', ta: 'குஞ்சபு', hi: 'कुंचपु', mr: 'कुंचपू', or: 'କୁଞ୍ଚପୁ', bn: 'কুঞ্চপু' },
  'Kinthara': { te: 'కింతర', kn: 'ಕಿಂತರ', ta: 'கிந்தர', hi: 'किंथर', mr: 'किंथर', or: 'କିନ୍ଥର', bn: 'কিন্থর' },
  'Kyathana': { te: 'ఖ్యాతన', kn: 'ಖ್ಯಾತನ', ta: 'க்யாதன', hi: 'ख्यातन', mr: 'ख्यातन', or: 'ଖ୍ୟାତନ', bn: 'খ্যাতন' },
  'Kothabandi': { te: 'కొత్తబండి', kn: 'ಕೊತ್ತಬಂಡಿ', ta: 'கொத்தபண்டி', hi: 'कोत्तबंडी', mr: 'कोत्तबंडी', or: 'କୋତ୍ତବଣ୍ଡି', bn: 'কোত্তবন্ডি' },
  'Katana': { te: 'కటన', kn: 'ಕಟನ', ta: 'கடன', hi: 'कटन', mr: 'कटन', or: 'କଟନ', bn: 'কটন' },
  'Koradavaru': { te: 'కొరడావారు', kn: 'ಕೊರಡಾವಾರು', ta: 'கொரடாவாரு', hi: 'कोरडावारु', mr: 'कोरडावारू', or: 'କୋରଡାବାରୁ', bn: 'কোরড়াবারু' },
  'Konadala': { te: 'కొనదల', kn: 'ಕೊನದಲ', ta: 'கொனதல', hi: 'कोनदल', mr: 'कोनदल', or: 'କୋନଦଲ', bn: 'কোনদল' },
  'Kotakonda': { te: 'కోటకొండ', kn: 'ಕೋಟಕೊಂಡ', ta: 'கோட்டகொண்டா', hi: 'कोटकोंडा', mr: 'कोटकोंडा', or: 'କୋଟକୋଣ୍ଡା', bn: 'কোটকোন্ডা' },
  'Kovvoorivaru': { te: 'కొవ్వూరివారు', kn: 'ಕೊವ್ವೂರಿವಾರು', ta: 'கொவ்வூரிவாரு', hi: 'कोव्वूरिवारु', mr: 'कोव्वूरीवारू', or: 'କୋବ୍ବୂରିବାରୁ', bn: 'কোভ্ভুরিবারু' },
  'Karadala': { te: 'కరడాల', kn: 'ಕರಡಾಲ', ta: 'கரடால', hi: 'करडाल', mr: 'करडाल', or: 'କରଡାଲ', bn: 'করড়াল' },
  'Kotaganti': { te: 'కోటగంటి', kn: 'ಕೋಟಗಂಟಿ', ta: 'கோட்டகண்டி', hi: 'कोटगंटि', mr: 'कोटगंटी', or: 'କୋଟଗଣ୍ଟି', bn: 'কোটগন্টি' },
  'Kommarajula': { te: 'కొమ్మరాజుల', kn: 'ಕೊಮ್ಮರಾಜುಲ', ta: 'கொம்மராஜுல', hi: 'कोम्मराजुल', mr: 'कोम्मराजुल', or: 'କୋମ୍ମରାଜୁଲ', bn: 'কোম্মরাজুল' },
  'Komira': { te: 'కొమిర', kn: 'ಕೊಮಿರ', ta: 'கொமிர', hi: 'कोमिर', mr: 'कोमिर', or: 'କୋମିର', bn: 'কোমির' },
  'Kanugula': { te: 'కనుగుల', kn: 'ಕನುಗುಲ', ta: 'கனுகுல', hi: 'कनुगुल', mr: 'कनुगुल', or: 'କନୁଗୁଲ', bn: 'কনুগুল' },
  'Komerla': { te: 'కొమెర్ల', kn: 'ಕೊಮೆರ್ಲ', ta: 'கொமெர்ல', hi: 'कोमेर्ल', mr: 'कोमेर्ल', or: 'କୋମେର୍ଲ', bn: 'কোমের্ল' },
  'Konavelli': { te: 'కొనవెల్లి', kn: 'ಕೊನವೆಲ್ಲಿ', ta: 'கொனவெல்லி', hi: 'कोनवेल्लि', mr: 'कोनवेल्ली', or: 'କୋନବେଲ୍ଲି', bn: 'কোনভেল্লি' },

  // M
  'Manjula': { te: 'మంజుల', kn: 'ಮಂಜುಲ', ta: 'மஞ்சுல', hi: 'मंजुल', mr: 'मंजुळ', or: 'ମଞ୍ଜୁଳ', bn: 'মঞ্জুল' },
  'Manjala': { te: 'మంజాల', kn: 'ಮಂಜಾಲ', ta: 'மஞ்சால', hi: 'मंजाल', mr: 'मंजाळ', or: 'ମଞ୍ଜାଳ', bn: 'মঞ্জাল' },
  'Makkala': { te: 'మక్కల', kn: 'ಮಕ್ಕಲ', ta: 'மக்கல', hi: 'मक्कल', mr: 'मक्कल', or: 'ମକ୍କଲ', bn: 'মক্কল' },
  'Makkathollu': { te: 'మక్కతోళ్ళు', kn: 'ಮಕ್ಕತೊಳ್ಳು', ta: 'மக்கதொல்லு', hi: 'मक्कतोल्लु', mr: 'मक्कतोल्लू', or: 'ମକ୍କତୋଲ୍ଲୁ', bn: 'মক্কতোল্লু' },
  'Mallela': { te: 'మల్లెల', kn: 'ಮಲ್ಲೆಲ', ta: 'மல்லெல', hi: 'मल्लेल', mr: 'मल्लेल', or: 'ମଲ୍ଲେଲ', bn: 'মল্লেল' },
  'Mallevaru': { te: 'మల్లెవారు', kn: 'ಮಲ್ಲೆವಾರು', ta: 'மல்லெவாரு', hi: 'मल्लेवारु', mr: 'मल्लेवारू', or: 'ମଲ୍ଲେବାରୁ', bn: 'মল্লেবারু' },
  'Mannem': { te: 'మన్నెం', kn: 'ಮನ್ನೆಂ', ta: 'மன்னெம்', hi: 'मन्नेम', mr: 'मन्नेम', or: 'ମନ୍ନେମ', bn: 'মন্নেম' },
  'Magari': { te: 'మగారి', kn: 'ಮಗಾರಿ', ta: 'மகாரி', hi: 'मगारि', mr: 'मगारी', or: 'ମଗାରି', bn: 'মগারি' },
  'Marlu': { te: 'మర్లు', kn: 'ಮರ್ಲು', ta: 'மர்லு', hi: 'मर्लु', mr: 'मर्लू', or: 'ମର୍ଲୁ', bn: 'মর্লু' },
  'Malapala': { te: 'మలపాల', kn: 'ಮಲಪಾಲ', ta: 'மலபால', hi: 'मलपाल', mr: 'मलपाल', or: 'ମଳପାଲ', bn: 'মলপাল' },
  'Maageneellu': { te: 'మాగెనీళ్ళు', kn: 'ಮಾಗೆನೀಳ್ಳು', ta: 'மாகெனீல்லு', hi: 'मागेनील्लु', mr: 'मागेनील्लू', or: 'ମାଗେନୀଲ୍ଲୁ', bn: 'মাগেনীল্লু' },
  'Maagenollu': { te: 'మాగెనోళ్ళు', kn: 'ಮಾಗೆನೊಳ್ಳು', ta: 'மாகெனொல்லு', hi: 'मागेनोल्लु', mr: 'मागेनोल्लू', or: 'ମାଗେନୋଲ୍ଲୁ', bn: 'মাগেনোল্লু' },
  'Mayani': { te: 'మాయని', kn: 'ಮಾಯನಿ', ta: 'மாயனி', hi: 'मायनि', mr: 'मायनी', or: 'ମାୟନି', bn: 'মায়নি' },
  'Muddangala': { te: 'ముద్దంగల', kn: 'ಮುದ್ದಂಗಲ', ta: 'முத்தங்கல', hi: 'मुद्दंगल', mr: 'मुद्दंगल', or: 'ମୁଦ୍ଦଙ୍ଗଲ', bn: 'মুদ্দঙ্গল' },
  'Mudhguloru': { te: 'ముద్గులోరు', kn: 'ಮುದ್ಗುಲೋರು', ta: 'முத்குலோரு', hi: 'मुद्गुलोरु', mr: 'मुद्गुलोरू', or: 'ମୁଦ୍ଗୁଲୋରୁ', bn: 'মুদ্গুলোরু' },
  'Muppukollu': { te: 'ముప్పుకోళ్ళు', kn: 'ಮುಪ್ಪುಕೊಳ್ಳು', ta: 'முப்புகொல்லு', hi: 'मुप्पुकोल्लु', mr: 'मुप्पुकोल्लू', or: 'ମୁପ୍ପୁକୋଲ୍ଲୁ', bn: 'মুপ্পুকোল্লু' },
  'Mekala': { te: 'మేకల', kn: 'ಮೇಕಲ', ta: 'மேகல', hi: 'मेकल', mr: 'मेकल', or: 'ମେକଲ', bn: 'মেকল' },
  'Miriyala': { te: 'మిరియాల', kn: 'ಮಿರಿಯಾಲ', ta: 'மிரியால', hi: 'मिरियाल', mr: 'मिरियाल', or: 'ମିରିୟାଲ', bn: 'মিরিয়াল' },
  'Moru': { te: 'మోరు', kn: 'ಮೋರು', ta: 'மோரு', hi: 'मोरु', mr: 'मोरू', or: 'ମୋରୁ', bn: 'মোরু' },
  'Moinla': { te: 'మొయిన్ల', kn: 'ಮೊಯಿನ್ಲ', ta: 'மொயின்ல', hi: 'मोइंला', mr: 'मोइंला', or: 'ମୋଇଁଲା', bn: 'মোইনলা' },
  'Mogalipuvu': { te: 'మొగలిపువ్వు', kn: 'ಮೊಗಲಿಪುವು', ta: 'மொகலிபுவ்வு', hi: 'मोगलिपुवु', mr: 'मोगलिपुवू', or: 'ମୋଗଲିପୁବୁ', bn: 'মোগলিপুভু' },
  'Mugachetla': { te: 'మూగచెట్ల', kn: 'ಮೂಗಚೆಟ್ಲ', ta: 'மூகசெட்ல', hi: 'मूगचेट्ल', mr: 'मूगचेट्ल', or: 'ମୂଗଚେଟ୍ଲ', bn: 'মূগচেট্ল' },
  'Mudaagula': { te: 'ముడాగుల', kn: 'ಮುಡಾಗುಲ', ta: 'முடாகுல', hi: 'मुडागुल', mr: 'मुडागुल', or: 'ମୁଡାଗୁଲ', bn: 'মুড়াগুল' },
  'Mallishetty': { te: 'మల్లిశెట్టి', kn: 'ಮಲ್ಲಿಶೆಟ್ಟಿ', ta: 'மல்லிசெட்டி', hi: 'मल्लिशेट्टी', mr: 'मल्लिशेट्टी', or: 'ମଲ୍ଲିଶେଟ୍ଟୀ', bn: 'মল্লিশেট্টি' },
  'Mungara': { te: 'ముంగర', kn: 'ಮುಂಗರ', ta: 'முங்கர', hi: 'मुंगर', mr: 'मुंगर', or: 'ମୁଙ୍ଗର', bn: 'মুঙ্গর' },

  // N
  'Nandhyala': { te: 'నంద్యాల', kn: 'ನಂದ್ಯಾಲ', ta: 'நந்தியால', hi: 'नंद्याल', mr: 'नंद्याल', or: 'ନନ୍ଦ୍ୟାଲ', bn: 'নন্দ্যাল' },
  'Nallabothula': { te: 'నల్లబోతుల', kn: 'ನಲ್ಲಬೋತುಲ', ta: 'நல்லபோதுல', hi: 'नल्लबोतुल', mr: 'नल्लबोतुल', or: 'ନଲ୍ଲବୋତୁଲ', bn: 'নল্লবোতুল' },
  'Nallangula': { te: 'నల్లంగుల', kn: 'ನಲ್ಲಂಗುಲ', ta: 'நல்லங்குல', hi: 'नल्लंगुल', mr: 'नल्लंगुल', or: 'ନଲ୍ଲଙ୍ଗୁଲ', bn: 'নল্লঙ্গুল' },
  'Nallaboina': { te: 'నల్లబోయిన', kn: 'ನಲ್ಲಬೋಯಿನ', ta: 'நல்லபோயின', hi: 'नल्लबोइन', mr: 'नल्लबोइन', or: 'ନଲ୍ଲବୋଇନ', bn: 'নল্লবোইন' },
  'Naga': { te: 'నాగ', kn: 'ನಾಗ', ta: 'நாக', hi: 'नाग', mr: 'नाग', or: 'ନାଗ', bn: 'নাগ' },
  'Nallapothula': { te: 'నల్లపోతుల', kn: 'ನಲ್ಲಪೋತುಲ', ta: 'நல்லபோதுல', hi: 'नल्लपोतुल', mr: 'नल्लपोतुल', or: 'ନଲ୍ଲପୋତୁଲ', bn: 'নল্লপোতুল' },
  'Nabigaaru': { te: 'నబీగారు', kn: 'ನಬೀಗಾರು', ta: 'நபீகாரு', hi: 'नबीगारु', mr: 'नबीगारू', or: 'ନବୀଗାରୁ', bn: 'নবীগারু' },
  'Nabigaari': { te: 'నబీగారి', kn: 'ನಬೀಗಾರಿ', ta: 'நபீகாரி', hi: 'नबीगारि', mr: 'नबीगारी', or: 'ନବୀଗାରି', bn: 'নবীগারি' },

  // O
  'Orusu': { te: 'ఒరుసు', kn: 'ಒರುಸು', ta: 'ஒருசு', hi: 'ओरुसु', mr: 'ओरुसू', or: 'ଓରୁସୁ', bn: 'ওরুসু' },
  'Orsuvaru': { te: 'ఒర్సువారు', kn: 'ಒರ್ಸುವಾರು', ta: 'ஒர்சுவாரு', hi: 'ओर्सुवारु', mr: 'ओर्सुवारू', or: 'ଓର୍ସୁବାରୁ', bn: 'ওর্সুবারু' },
  'Ontipuli': { te: 'ఒంటిపులి', kn: 'ಒಂಟಿಪುಲಿ', ta: 'ஒண்டிபுலி', hi: 'ओंटिपुलि', mr: 'ओंटिपुली', or: 'ଓଣ୍ଟିପୁଲି', bn: 'ওন্টিপুলি' },
  'Ontipuri': { te: 'ఒంటిపురి', kn: 'ಒಂಟಿಪುರಿ', ta: 'ஒண்டிபுரி', hi: 'ओंटिपुरि', mr: 'ओंटिपुरी', or: 'ଓଣ୍ଟିପୁରୀ', bn: 'ওন্টিপুরি' },
  'Orcha': { te: 'ఓర్చ', kn: 'ಓರ್ಚ', ta: 'ஓர்ச', hi: 'ओर्चा', mr: 'ओर्चा', or: 'ଓର୍ଚା', bn: 'ওর্চা' },

  // P
  'Pasupuleti': { te: 'పసుపులేటి', kn: 'ಪಸುಪುಲೇಟಿ', ta: 'பசுபுலேடி', hi: 'पसुपुलेटि', mr: 'पसुपुलेटी', or: 'ପସୁପୁଲେଟି', bn: 'পসুপুলেটি' },
  'Pasupu': { te: 'పసుపు', kn: 'ಪಸುಪು', ta: 'பசுபு', hi: 'पसुपु', mr: 'पसुपू', or: 'ପସୁପୁ', bn: 'পসুপু' },
  'Pallap': { te: 'పల్లప్', kn: 'ಪಲ್ಲಪ್', ta: 'பல்லப்', hi: 'पल्लप', mr: 'पल्लप', or: 'ପଲ୍ଲପ', bn: 'পল্লপ' },
  'Pallapu': { te: 'పల్లపు', kn: 'ಪಲ್ಲಪು', ta: 'பல்லபு', hi: 'पल्लपु', mr: 'पल्लपू', or: 'ପଲ୍ଲପୁ', bn: 'পল্লপু' },
  'Punaganti': { te: 'పునగంటి', kn: 'ಪುನಗಂಟಿ', ta: 'புனகண்டி', hi: 'पुनगंटि', mr: 'पुनगंटी', or: 'ପୁନଗଣ୍ଟି', bn: 'পুনগন্টি' },
  'Panjapattu': { te: 'పంజపట్టు', kn: 'ಪಂಜಪಟ್ಟು', ta: 'பஞ்சபட்டு', hi: 'पंजपट्टु', mr: 'पंजपट्टू', or: 'ପଞ୍ଜପଟ୍ଟୁ', bn: 'পঞ্জপট্টু' },
  'Pandipotta': { te: 'పందిపొట్ట', kn: 'ಪಂದಿಪೊಟ್ಟ', ta: 'பந்திபொட்ட', hi: 'पंदिपोट्टा', mr: 'पंदिपोट्टा', or: 'ପନ୍ଦିପୋଟ୍ଟା', bn: 'পন্দিপোট্টা' },
  'Pandibotta': { te: 'పందిబొట్ట', kn: 'ಪಂದಿಬೊಟ್ಟ', ta: 'பந்திபொட்ட', hi: 'पंदिबोट्टा', mr: 'पंदिबोट्टा', or: 'ପନ୍ଦିବୋଟ୍ଟା', bn: 'পন্দিবোট্টা' },
  'Pappathollu': { te: 'పప్పతోళ్ళు', kn: 'ಪಪ್ಪತೊಳ್ಳು', ta: 'பப்பதொல்லு', hi: 'पप्पतोल्लु', mr: 'पप्पतोल्लू', or: 'ପପ୍ପତୋଲ୍ଲୁ', bn: 'পপ্পতোল্লু' },
  'Poojari': { te: 'పూజారి', kn: 'ಪೂಜಾರಿ', ta: 'பூஜாரி', hi: 'पूजारी', mr: 'पुजारी', or: 'ପୂଜାରୀ', bn: 'পূজারী' },
  'Poojabanda': { te: 'పూజబండ', kn: 'ಪೂಜಬಂಡ', ta: 'பூஜபண்ட', hi: 'पूजबंडा', mr: 'पूजबंडा', or: 'ପୂଜବଣ୍ଡା', bn: 'পূজবন্ডা' },
  'Pandinagotlu': { te: 'పందినగొట్లు', kn: 'ಪಂದಿನಗೊಟ್ಲು', ta: 'பந்தினகொட்லு', hi: 'पंदिनगोट्लु', mr: 'पंदिनगोट्लू', or: 'ପନ୍ଦିନଗୋଟ୍ଲୁ', bn: 'পন্দিনগোট্লু' },
  'Pallangi': { te: 'పల్లంగి', kn: 'ಪಲ್ಲಂಗಿ', ta: 'பல்லங்கி', hi: 'पल्लंगि', mr: 'पल्लंगी', or: 'ପଲ୍ଲଙ୍ଗି', bn: 'পল্লঙ্গি' },
  'Pasupula': { te: 'పసుపుల', kn: 'ಪಸುಪುಲ', ta: 'பசுபுல', hi: 'पसुपुल', mr: 'पसुपुल', or: 'ପସୁପୁଲ', bn: 'পসুপুল' },
  'Palakonda': { te: 'పాలకొండ', kn: 'ಪಾಲಕೊಂಡ', ta: 'பாலகொண்டா', hi: 'पालकोंडा', mr: 'पालकोंडा', or: 'ପାଳକୋଣ୍ଡା', bn: 'পালকোন্ডা' },
  'Peetla': { te: 'పీట్ల', kn: 'ಪೀಟ್ಲ', ta: 'பீட்ல', hi: 'पीट्ल', mr: 'पीट्ल', or: 'ପୀଟ୍ଲ', bn: 'পীট্ল' },
  'Peetlorlu': { te: 'పీట్లోర్లు', kn: 'ಪೀಟ್ಲೋರ್ಲು', ta: 'பீட்லோர்லு', hi: 'पीट्लोर्लु', mr: 'पीट्लोर्लू', or: 'ପୀଟ୍ଲୋର୍ଲୁ', bn: 'পীট্লোর্লু' },
  'Porigila': { te: 'పొరిగిల', kn: 'ಪೊರಿಗಿಲ', ta: 'பொரிகில', hi: 'पोरिगिल', mr: 'पोरिगिल', or: 'ପୋରିଗିଲ', bn: 'পোরিগিল' },
  'Palavelli': { te: 'పాలవెల్లి', kn: 'ಪಾಲವೆಲ್ಲಿ', ta: 'பாலவெல்லி', hi: 'पालवेल्लि', mr: 'पालवेल्ली', or: 'ପାଳବେଲ୍ଲି', bn: 'পালভেল্লি' },
  'Palanati': { te: 'పలనాటి', kn: 'ಪಲನಾಟಿ', ta: 'பலநாடி', hi: 'पलनाटि', mr: 'पलनाटी', or: 'ପଲନାଟି', bn: 'পলনাটি' },
  'Pegili': { te: 'పెగిలి', kn: 'ಪೆಗಿಲಿ', ta: 'பெகிலி', hi: 'पेगिलि', mr: 'पेगिली', or: 'ପେଗିଲି', bn: 'পেগিলি' },
  'Palakunda': { te: 'పాలకుండ', kn: 'ಪಾಲಕುಂಡ', ta: 'பாலகுண்டா', hi: 'पालकुंडा', mr: 'पालकुंडा', or: 'ପାଳକୁଣ୍ଡା', bn: 'পালকুন্ডা' },

  // R
  'Rayachoti': { te: 'రాయచోటి', kn: 'ರಾಯಚೋಟಿ', ta: 'ராயச்சோட்டி', hi: 'रायचोटि', mr: 'रायचोटी', or: 'ରାୟଚୋଟି', bn: 'রায়চোটি' },
  'Rajola': { te: 'రాజోల', kn: 'ರಾಜೋಲ', ta: 'ராஜோல', hi: 'राजोल', mr: 'राजोल', or: 'ରାଜୋଲ', bn: 'রাজোল' },
  'Rajulu': { te: 'రాజులు', kn: 'ರಾಜುಲು', ta: 'ராஜுலு', hi: 'राजुलु', mr: 'राजुलू', or: 'ରାଜୁଲୁ', bn: 'রাজুলু' },
  'Rupani': { te: 'రూపాని', kn: 'ರೂಪಾನಿ', ta: 'ரூபானி', hi: 'रूपानी', mr: 'रुपानी', or: 'ରୂପାନି', bn: 'রূপানি' },
  'Ravuri': { te: 'రావూరి', kn: 'ರಾವೂರಿ', ta: 'ராவூரி', hi: 'रावूरि', mr: 'रावूरी', or: 'ରାବୂରି', bn: 'রাভুরি' },
  'Rapuri': { te: 'రాపూరి', kn: 'ರಾಪೂರಿ', ta: 'ராபூரி', hi: 'रापूरि', mr: 'रापूरी', or: 'ରାପୂରି', bn: 'রাপুরি' },
  'Rauthu': { te: 'రౌతు', kn: 'ರೌತು', ta: 'ரௌது', hi: 'रौथु', mr: 'रौथू', or: 'ରୌଥୁ', bn: 'রৌথু' },
  'RouthuRayulu': { te: 'రౌతురాయులు', kn: 'ರೌತುರಾಯುಲು', ta: 'ரௌதுராயுலு', hi: 'रौथुरायुलु', mr: 'रौथुरायुलू', or: 'ରୌଥୁରାୟୁଲୁ', bn: 'রৌথুরায়ুলু' },
  'Rupana': { te: 'రూపన', kn: 'ರೂಪನ', ta: 'ரூபன', hi: 'रूपन', mr: 'रूपन', or: 'ରୂପନ', bn: 'রূপন' },
  'Revana': { te: 'రేవణ', kn: 'ರೇವಣ', ta: 'ரேவண', hi: 'रेवण', mr: 'रेवण', or: 'ରେବଣ', bn: 'রেবণ' },
  'Rajabanda': { te: 'రాజబండ', kn: 'ರಾಜಬಂಡ', ta: 'ராஜபண்ட', hi: 'राजबंडा', mr: 'राजबंडा', or: 'ରାଜବଣ୍ଡା', bn: 'রাজবন্ডা' },
  'Repani': { te: 'రేపాని', kn: 'ರೇಪಾನಿ', ta: 'ரேபானி', hi: 'रेपानि', mr: 'रेपानी', or: 'ରେପାନି', bn: 'রেপানি' },
  'Rajeebanda': { te: 'రాజీబండ', kn: 'ರಾಜೀಬಂಡ', ta: 'ராஜீபண்ட', hi: 'राजीबंडा', mr: 'राजीबंडा', or: 'ରାଜୀବଣ୍ଡା', bn: 'রাজীবন্ডা' },
  'Rollagoti': { te: 'రోళ్ళగోటి', kn: 'ರೊಳ್ಳಗೋಟಿ', ta: 'ரோல்லகோடி', hi: 'रोल्लगोटि', mr: 'रोल्लगोटी', or: 'ରୋଲ୍ଲଗୋଟି', bn: 'রোল্লগোটি' },
  'Rollugotti': { te: 'రోళ్ళుగొట్టి', kn: 'ರೊಳ್ಳುಗೊಟ್ಟಿ', ta: 'ரோல்லுகொட்டி', hi: 'रोल्लुगोट्टि', mr: 'रोल्लुगोट्टी', or: 'ରୋଲ୍ଲୁଗୋଟ୍ଟି', bn: 'রোল্লুগোট্টি' },
  'Reni': { te: 'రేణి', kn: 'ರೇಣಿ', ta: 'ரேணி', hi: 'रेणि', mr: 'रेणी', or: 'ରେଣି', bn: 'রেণি' },

  // S
  'Saidu': { te: 'సైదు', kn: 'ಸೈದು', ta: 'சைது', hi: 'सैदु', mr: 'सैदू', or: 'ସୈଦୁ', bn: 'সৈদু' },
  'Shivarathri': { te: 'శివరాత్రి', kn: 'ಶಿವರಾತ್ರಿ', ta: 'சிவராத்திரி', hi: 'शिवरात्रि', mr: 'शिवरात्री', or: 'ଶିବରାତ୍ରି', bn: 'শিবরাত্রি' },
  'Sheetarlavaru': { te: 'శీతర్లవారు', kn: 'ಶೀತರ್ಲವಾರು', ta: 'சீதர்லவாரு', hi: 'शीतर्लवारु', mr: 'शीतर्लवारू', or: 'ଶୀତର୍ଲବାରୁ', bn: 'শীতর্লবারু' },
  'Sakala': { te: 'సకల', kn: 'ಸಕಲ', ta: 'சகல', hi: 'सकल', mr: 'सकल', or: 'ସକଳ', bn: 'সকল' },
  'Sampangi': { te: 'సంపంగి', kn: 'ಸಂಪಂಗಿ', ta: 'சம்பங்கி', hi: 'संपंगि', mr: 'संपंगी', or: 'ସମ୍ପଙ୍ଗି', bn: 'সম্পঙ্গি' },
  'Satarla': { te: 'సతర్ల', kn: 'ಸತರ್ಲ', ta: 'சதர்ல', hi: 'सतर्ल', mr: 'सतर्ल', or: 'ସତର୍ଲ', bn: 'সতর্ল' },
  'Sarangi': { te: 'సారంగి', kn: 'ಸಾರಂಗಿ', ta: 'சாரங்கி', hi: 'सारंगी', mr: 'सारंगी', or: 'ସାରଙ୍ଗୀ', bn: 'সারঙ্গী' },
  'Sirivennela': { te: 'సిరివెన్నెల', kn: 'ಸಿರಿವೆನ್ನೆಲ', ta: 'சிரிவென்னெல', hi: 'सिरिवेन्नेल', mr: 'सिरिवेन्नेल', or: 'ସିରିବେନ୍ନେଲ', bn: 'সিরিভেন্নেল' },
  'Sippadatala': { te: 'సిప్పదాతల', kn: 'ಸಿಪ್ಪದಾತಲ', ta: 'சிப்பதாதல', hi: 'सिप्पदातल', mr: 'सिप्पदातल', or: 'ସିପ୍ପଦାତଲ', bn: 'সিপ্পদাতল' },
  'Sarangula': { te: 'సారంగుల', kn: 'ಸಾರಂಗುಲ', ta: 'சாரங்குல', hi: 'सारंगुल', mr: 'सारंगुल', or: 'ସାରଙ୍ଗୁଲ', bn: 'সারঙ্গুল' },
  'Sadasu': { te: 'సదాసు', kn: 'ಸದಾಸು', ta: 'சதாசு', hi: 'सदासु', mr: 'सदासू', or: 'ସଦାସୁ', bn: 'সদাসু' },
  'Shankarapu': { te: 'శంకరపు', kn: 'ಶಂಕರಪು', ta: 'சங்கரபு', hi: 'शंकरपु', mr: 'शंकरपू', or: 'ଶଙ୍କରପୁ', bn: 'শঙ্করপু' },
  'Shellavollu': { te: 'శెల్లవోళ్ళు', kn: 'ಶೆಲ್ಲವೊಳ್ಳು', ta: 'செல்லவொல்லு', hi: 'शेल्लवोल्लु', mr: 'शेल्लवोल्लू', or: 'ଶେଲ୍ଲବୋଲ୍ଲୁ', bn: 'শেল্লভোল্লু' },
  'Shivanandala': { te: 'శివానందల', kn: 'ಶಿವಾನಂದಲ', ta: 'சிவானந்தல', hi: 'शिवानंदल', mr: 'शिवानंदल', or: 'ଶିବାନନ୍ଦଲ', bn: 'শিবানন্দল' },
  'Sangajjala': { te: 'సంగజ్జల', kn: 'ಸಂಗಜ್ಜಲ', ta: 'சங்கஜ்ஜல', hi: 'संगज्जल', mr: 'संगज्जल', or: 'ସଙ୍ଗଜ୍ଜଲ', bn: 'সঙ্গজ্জল' },
  'Signi': { te: 'సిగ్ని', kn: 'ಸಿಗ್ನಿ', ta: 'சிக்னி', hi: 'सिग्नि', mr: 'सिग्नी', or: 'ସିଗ୍ନି', bn: 'সিগ্নি' },
  'Sallagothi': { te: 'సల్లగోతి', kn: 'ಸಲ್ಲಗೋತಿ', ta: 'சல்லகோதி', hi: 'सल्लगोथि', mr: 'सल्लगोथी', or: 'ସଲ୍ଲଗୋଥି', bn: 'সল্লগোথি' },
  'Sandra': { te: 'సండ్ర', kn: 'ಸಂಡ್ರ', ta: 'சண்ட்ர', hi: 'संड्रा', mr: 'संड्रा', or: 'ସଣ୍ଡ୍ରା', bn: 'সন্ড্রা' },
  'Surollu': { te: 'సూరోళ్ళు', kn: 'ಸೂರೊಳ್ಳು', ta: 'சூரோல்லு', hi: 'सूरोल्लु', mr: 'सूरोल्लू', or: 'ସୂରୋଲ୍ଲୁ', bn: 'সূরোল্লু' },
  'Shatharala': { te: 'శతారల', kn: 'ಶತಾರಲ', ta: 'சதாரல', hi: 'शतारल', mr: 'शतारल', or: 'ଶତାରଲ', bn: 'শতারল' },
  'Sriramulu': { te: 'శ్రీరాములు', kn: 'ಶ್ರೀರಾಮುಲು', ta: 'ஸ்ரீராமுலு', hi: 'श्रीरामुलु', mr: 'श्रीरामुलू', or: 'ଶ୍ରୀରାମୁଲୁ', bn: 'শ্রীরামুলু' },
  'Sirimalle': { te: 'సిరిమల్లె', kn: 'ಸಿರಿಮಲ್ಲೆ', ta: 'சிரிமல்லே', hi: 'सिरिमल्ले', mr: 'सिरिमल्ले', or: 'ସିରିମଲ୍ଲେ', bn: 'সিরিমল্লে' },

  // T
  'Thanniru': { te: 'తన్నీరు', kn: 'ತನ್ನೀರು', ta: 'தன்னீரு', hi: 'तन्नीरु', mr: 'तन्नीरू', or: 'ତନ୍ନୀରୁ', bn: 'তন্নীরু' },
  'Thammisetty': { te: 'తమ్మిశెట్టి', kn: 'ತಮ್ಮಿಶೆಟ್ಟಿ', ta: 'தம்மிசெட்டி', hi: 'तम्मिशेट्टी', mr: 'तम्मिशेट्टी', or: 'ତମ୍ମିଶେଟ୍ଟୀ', bn: 'তম্মিশেট্টি' },
  'Thammikanti': { te: 'తమ్మికంటి', kn: 'ತಮ್ಮಿಕಂಟಿ', ta: 'தம்மிகண்டி', hi: 'तम्मिकंटि', mr: 'तम्मिकंटी', or: 'ତମ୍ମିକଣ୍ଟି', bn: 'তম্মিকন্টি' },
  'Thalluri': { te: 'తాళ్ళూరి', kn: 'ತಾಳ್ಳೂರಿ', ta: 'தல்லூரி', hi: 'ताल्लूरि', mr: 'ताल्लूरी', or: 'ତାଲ୍ଲୂରି', bn: 'তাল্লুরি' },
  'Turaka': { te: 'తురక', kn: 'ತುರಕ', ta: 'துரக', hi: 'तुरक', mr: 'तुरक', or: 'ତୁରକ', bn: 'তুরক' },
  'Tapalla': { te: 'తపాళ్ళ', kn: 'ತಪಾಳ್ಳ', ta: 'தபால', hi: 'तपाल्ल', mr: 'तपाल्ल', or: 'ତପାଲ୍ଲ', bn: 'তপাল্ল' },
  'Thirupathi': { te: 'తిరుపతి', kn: 'ತಿರುಪತಿ', ta: 'திருப்பதி', hi: 'तिरुपति', mr: 'तिरुपती', or: 'ତିରୁପତି', bn: 'তিরুপতি' },
  'Thirumala': { te: 'తిరుమల', kn: 'ತಿರುಮಲ', ta: 'திருமலை', hi: 'तिरुमला', mr: 'तिरुमला', or: 'ତିରୁମଲା', bn: 'তিরুমলা' },
  'Tummutka': { te: 'తుమ్ముట్క', kn: 'ತುಮ್ಮುಟ್ಕ', ta: 'தும்முட்க', hi: 'तुम्मुट्क', mr: 'तुम्मुट्क', or: 'ତୁମ୍ମୁଟ୍କ', bn: 'তুম্মুট্ক' },
  'Turaga': { te: 'తురగ', kn: 'ತುರಗ', ta: 'துரக', hi: 'तुरग', mr: 'तुरग', or: 'ତୁରଗ', bn: 'তুরগ' },
  'Tummutakala': { te: 'తుమ్ముటకల', kn: 'ತುಮ್ಮುಟಕಲ', ta: 'தும்முடகல', hi: 'तुम्मुटकल', mr: 'तुम्मुटकल', or: 'ତୁମ୍ମୁଟକଲ', bn: 'তুম্মুটকল' },
  'Takkari': { te: 'టక్కరి', kn: 'ಟಕ್ಕರಿ', ta: 'டக்கரி', hi: 'टक्करि', mr: 'टक्करी', or: 'ଟକ୍କରି', bn: 'টক্করি' },
  'Takkarodu': { te: 'టక్కరోడు', kn: 'ಟಕ್ಕರೋಡು', ta: 'டக்கரோடு', hi: 'टक्करोडु', mr: 'टक्करोडू', or: 'ଟକ୍କରୋଡୁ', bn: 'টক্করোডু' },
  'Tulasi': { te: 'తులసి', kn: 'ತುಳಸಿ', ta: 'துளசி', hi: 'तुलसी', mr: 'तुळशी', or: 'ତୁଳସୀ', bn: 'তুলসী' },
  'Thoopakula': { te: 'తూపాకుల', kn: 'ತೂಪಾಕುಲ', ta: 'தூபாகுல', hi: 'तूपाकुल', mr: 'तूपाकुल', or: 'ତୂପାକୁଲ', bn: 'তূপাকুল' },
  'Thangedu': { te: 'తంగేడు', kn: 'ತಂಗೇಡು', ta: 'தங்கேடு', hi: 'तंगेडु', mr: 'तंगेडू', or: 'ତଙ୍ଗେଡୁ', bn: 'তঙ্গেড়ু' },
  'Thamballa': { te: 'తంబళ్ళ', kn: 'ತಂಬಳ್ಳ', ta: 'தம்பல்ல', hi: 'तंबल्ल', mr: 'तंबल्ल', or: 'ତମ୍ବଲ୍ଲ', bn: 'তম্বল্ল' },

  // U
  'Uppalapati': { te: 'ఉప్పలపాటి', kn: 'ಉಪ್ಪಲಪಾಟಿ', ta: 'உப்பலபாடி', hi: 'उप्पलपाटि', mr: 'उप्पलपाटी', or: 'ଉପ୍ପଲପାଟି', bn: 'উপ্পলপাটি' },
  'Upputoori': { te: 'ఉప్పుటూరి', kn: 'ಉಪ್ಪುಟೂರಿ', ta: 'உப்புடூரி', hi: 'उप्पुटूरि', mr: 'उप्पुटूरी', or: 'ଉପ୍ପୁଟୂରି', bn: 'উপ্পুটুরি' },
  'Uttipalli': { te: 'ఉత్తిపల్లి', kn: 'ಉತ್ತಿಪಲ್ಲಿ', ta: 'உத்திபல்லி', hi: 'उत्तिपल्लि', mr: 'उत्तिपल्ली', or: 'ଉତ୍ତିପଲ୍ଲି', bn: 'উত্তিপল্লি' },
  'Uppu': { te: 'ఉప్పు', kn: 'ಉಪ್ಪು', ta: 'உப்பு', hi: 'उप्पु', mr: 'उप्पू', or: 'ଉପ୍ପୁ', bn: 'উপ্পু' },
  'Upputholla': { te: 'ఉప్పుతోళ్ళ', kn: 'ಉಪ್ಪುತೊಳ್ಳ', ta: 'உப்புதொல்ல', hi: 'उप्पुतोल्ल', mr: 'उप्पुतोल्ल', or: 'ଉପ୍ପୁତୋଲ୍ଲ', bn: 'উপ্পুতোল্ল' },
  'Uppata': { te: 'ఉప్పట', kn: 'ಉಪ್ಪಟ', ta: 'உப்பட', hi: 'उप्पटा', mr: 'उप्पटा', or: 'ଉପ୍ପଟା', bn: 'উপ্পটা' },
  'Urlabandavaru': { te: 'ఉర్లబండవారు', kn: 'ಉರ್ಲಬಂಡವಾರು', ta: 'உர்லபண்டவாரு', hi: 'उर्लबंडवारु', mr: 'उर्लबंडवारू', or: 'ଉର୍ଲବଣ୍ଡବାରୁ', bn: 'উর্লবন্ডবারু' },
  'Uppitti': { te: 'ఉప్పిట్టి', kn: 'ಉಪ್ಪಿಟ್ಟಿ', ta: 'உப்பிட்டி', hi: 'उप्पिट्टि', mr: 'उप्पिट्टी', or: 'ଉପ୍ପିଟ୍ଟି', bn: 'উপ্পিট্টি' },

  // V
  'Vanamala': { te: 'వనమాల', kn: 'ವನಮಾಲ', ta: 'வனமால', hi: 'वनमाला', mr: 'वनमाला', or: 'ବନମାଳା', bn: 'বনমালা' },
  'Vallepu': { te: 'వల్లెపు', kn: 'ವಲ್ಲೆಪು', ta: 'வல்லெபு', hi: 'वल्लेपु', mr: 'वल्लेपू', or: 'ବଲ୍ଲେପୁ', bn: 'ভল্লেপু' },
  'Vadde': { te: 'వద్దె', kn: 'ವದ್ದೆ', ta: 'வத்தே', hi: 'वद्दे', mr: 'वद्दे', or: 'ବଦ୍ଦେ', bn: 'বদ্দে' },
  'Varikuppala': { te: 'వరికుప్పల', kn: 'ವರಿಕುಪ್ಪಲ', ta: 'வரிகுப்பல', hi: 'वरिकुप्पल', mr: 'वरिकुप्पल', or: 'ବରିକୁପ୍ପଲ', bn: 'বরিকুপ্পল' },
  'Vemula': { te: 'వేముల', kn: 'ವೇಮುಲ', ta: 'வேமுல', hi: 'वेमुल', mr: 'वेमुल', or: 'ବେମୁଲ', bn: 'ভেমুল' },
  'Vidigottu': { te: 'విదిగొట్టు', kn: 'ವಿದಿಗೊಟ್ಟು', ta: 'விதிகொட்டு', hi: 'विदिगोट्टु', mr: 'विदिगोट्टू', or: 'ବିଦିଗୋଟ୍ଟୁ', bn: 'বিদিগোট্টু' },
  'Valleporu': { te: 'వల్లెపోరు', kn: 'ವಲ್ಲೆಪೋರು', ta: 'வல்லெபோரு', hi: 'वल्लेपोरु', mr: 'वल्लेपोरू', or: 'ବଲ୍ଲେପୋରୁ', bn: 'ভল্লেপোরু' },
  'Veepaneedu': { te: 'వీపనీడు', kn: 'ವೀಪನೀಡು', ta: 'வீபனீடு', hi: 'वीपनीडु', mr: 'वीपनीडू', or: 'ବୀପନୀଡୁ', bn: 'বীপনীড়ু' },
  'Vepakaya': { te: 'వేపకాయ', kn: 'ವೇಪಕಾಯ', ta: 'வேபகாய', hi: 'वेपकाय', mr: 'वेपकाय', or: 'ବେପକାୟ', bn: 'ভেপকায়' },

  // Y
  'Yerla': { te: 'యెర్ల', kn: 'ಯೆರ್ಲ', ta: 'யெர்ல', hi: 'येर्ल', mr: 'येर्ल', or: 'ୟେର୍ଲ', bn: 'য়ের্ল' },
  'Yanamala': { te: 'యనమల', kn: 'ಯನಮಲ', ta: 'யனமல', hi: 'यनमल', mr: 'यनमल', or: 'ୟନମଲ', bn: 'য়নমল' },
  'Yalamanda': { te: 'యలమంద', kn: 'ಯಲಮಂದ', ta: 'யலமந்த', hi: 'यलमंदा', mr: 'यलमंदा', or: 'ୟଲମନ୍ଦା', bn: 'য়লমন্দা' },
  'Yarlagoti': { te: 'యార్లగోటి', kn: 'ಯಾರ್ಲಗೋಟಿ', ta: 'யார்லகோடி', hi: 'यार्लगोटि', mr: 'यार्लगोटी', or: 'ୟାର୍ଲଗୋଟି', bn: 'য়ার্লগোটি' },
};

/**
 * Resolves 8-language fields for a surname without inventing regional spellings.
 */
export function getSurnameTransliterations(
  surname: string,
  explicit?: Partial<SurnameTransliterations>
): SurnameTransliterations {
  const verified = VERIFIED_SURNAME_TRANSLITERATIONS[surname] || {};
  return {
    en: explicit?.en ?? surname,
    hi: explicit?.hi ?? verified.hi ?? surname,
    te: explicit?.te ?? verified.te ?? surname,
    kn: explicit?.kn ?? verified.kn ?? surname,
    ta: explicit?.ta ?? verified.ta ?? surname,
    mr: explicit?.mr ?? verified.mr ?? surname,
    or: explicit?.or ?? verified.or ?? surname,
    bn: explicit?.bn ?? verified.bn ?? surname,
  };
}

/**
 * Alphabetical surname groups (A-Z) ready to receive the complete South-Indian surname list.
 * Duplicate surname entries within any letter group are preserved in exact order.
 */
export const ALPHABETICAL_SURNAME_GROUPS: AlphabeticalSurnameGroups = {
  A: [
    'Alluri',
    'Attari',
    'Alakunta',
    'Achi Nalavi',
    'Allugala',
    'Achhi',
    'Achitani',
    'Allepu',
    'Akula',
    'Adavi',
  ],
  B: [
    'Bose',
    'Bale',
    'Bellam Konda',
    'Bimutaka',
    'Banalolla',
    'Banala',
    'Bimukkala',
    'Bimutukala',
    'Bhoorsu',
    'Bhoosata',
    'Bankavallu',
    'Bandi',
    'Banda',
    'Bandaru',
    'Baimutukollu',
    'Bukkamulu',
    'Bukkala',
    'Bursu',
    'Burusu',
    'Botamthollu',
    'Bodasu',
    'Bhusala',
    'Battula',
    'Bontha',
    'Boggula',
  ],
  C: [
    'Challa',
    'Chandragiri',
    'Chembeti',
    'Chenjoti',
    'Chemloti',
    'Chencheti',
    'Chempeti',
    'Champati',
    'Chinthala',
  ],
  D: [
    'Dandu',
    'Dandugula',
    'Derangula',
    'Devalla',
    'Dandigiri',
    'Dalavayi',
    'Dayyamuthukollu',
    'Dyarangula',
    'Devandla',
    'Dasarla',
    'Darmavaram',
    'Darga',
  ],
  E: [
    'Edagopuru',
    'Enagotthu',
    'Ettari',
    'Etharu',
    'Earla',
    'Earla Mutaka',
    'Edigoti',
    'Edagottlu',
    'Edagoti',
    'Eragadinne',
    'Eradindla',
  ],
  F: [],
  G: [
    'Gangaraju',
    'Gokaraju',
    'Gunji',
    'Gunja',
    'Gampa',
    'Gajjala',
    'Gunje',
    'Gundaga',
    'Goddendla',
    'Godella',
    'Gogula',
    'Gosala',
    'Govula',
    'Gandipeta',
    'Gandikota',
    'Gampala',
    'Giri',
    'Gajula',
    'Gantasala',
    'Gurudaasu',
    'Govindhu',
  ],
  H: [],
  I: [],
  J: [
    'Jaimangala',
    'Jalluri',
    'Jarupati',
    'Jerapati',
    'Jeripeti',
    'Jayanthi',
    'Jemmisetty',
    'Jathava',
    'Janamula',
  ],
  K: [
    'Katriya',
    'Kshatriya',
    'Kandula',
    'Kashi',
    'Kunchala',
    'Kunchem',
    'Komura',
    'Kasula',
    'Kyathi',
    'Kundi',
    'Kunchapu',
    'Kinthara',
    'Kyathana',
    'Kothabandi',
    'Katana',
    'Koradavaru',
    'Konadala',
    'Kotakonda',
    'Kovvoorivaru',
    'Karadala',
    'Kotaganti',
    'Kommarajula',
    'Komira',
    'Kanugula',
    'Komerla',
    'Konavelli',
  ],
  L: [],
  M: [
    'Manjula',
    'Manjala',
    'Makkala',
    'Makkathollu',
    'Mallela',
    'Mallevaru',
    'Mannem',
    'Magari',
    'Marlu',
    'Malapala',
    'Maageneellu',
    'Maagenollu',
    'Mayani',
    'Muddangala',
    'Mudhguloru',
    'Muppukollu',
    'Mekala',
    'Miriyala',
    'Moru',
    'Moinla',
    'Mogalipuvu',
    'Mugachetla',
    'Mudaagula',
    'Mallishetty',
    'Mungara',
  ],
  N: [
    'Nandhyala',
    'Nallabothula',
    'Nallangula',
    'Nallaboina',
    'Naga',
    'Nallapothula',
    'Nabigaaru',
    'Nabigaari',
  ],
  O: [
    'Orusu',
    'Orsuvaru',
    'Ontipuli',
    'Ontipuri',
    'Orcha',
  ],
  P: [
    'Pasupuleti',
    'Pasupu',
    'Pallap',
    'Pallapu',
    'Punaganti',
    'Panjapattu',
    'Pandipotta',
    'Pandibotta',
    'Pappathollu',
    'Poojari',
    'Poojabanda',
    'Pandinagotlu',
    'Pallangi',
    'Pasupula',
    'Palakonda',
    'Peetla',
    'Peetlorlu',
    'Porigila',
    'Palavelli',
    'Palanati',
    'Pegili',
    'Palakunda',
  ],
  Q: [],
  R: [
    'Rayachoti',
    'Rajola',
    'Rajulu',
    'Rupani',
    'Ravuri',
    'Rapuri',
    'Rapuri',
    'Rauthu',
    'RouthuRayulu',
    'Rupana',
    'Revana',
    'Rajabanda',
    'Repani',
    'Rajeebanda',
    'Rollagoti',
    'Rollugotti',
    'Reni',
  ],
  S: [
    'Saidu',
    'Shivarathri',
    'Sheetarlavaru',
    'Sakala',
    'Sampangi',
    'Satarla',
    'Sarangi',
    'Sirivennela',
    'Sippadatala',
    'Sarangula',
    'Sadasu',
    'Shankarapu',
    'Shellavollu',
    'Shivanandala',
    'Sangajjala',
    'Signi',
    'Sallagothi',
    'Sandra',
    'Surollu',
    'Shatharala',
    'Sriramulu',
    'Sirimalle',
  ],
  T: [
    'Thanniru',
    'Thammisetty',
    'Thammikanti',
    'Thalluri',
    'Turaka',
    'Tapalla',
    'Thirupathi',
    'Thirumala',
    'Tummutka',
    'Turaga',
    'Tummutakala',
    'Takkari',
    'Takkarodu',
    'Tulasi',
    'Thoopakula',
    'Thangedu',
    'Thamballa',
  ],
  U: [
    'Uppalapati',
    'Upputoori',
    'Uttipalli',
    'Uppu',
    'Upputholla',
    'Uppata',
    'Urlabandavaru',
    'Uppitti',
  ],
  V: [
    'Vanamala',
    'Vallepu',
    'Vadde',
    'Varikuppala',
    'Vemula',
    'Vidigottu',
    'Valleporu',
    'Veepaneedu',
    'Vepakaya',
  ],
  W: [],
  X: [],
  Y: [
    'Yerla',
    'Yanamala',
    'Yalamanda',
    'Yarlagoti',
  ],
  Z: [],
};

/**
 * Optional flat list fallback (if surnames are supplied as a single sequential array).
 * Any entries placed in ALPHABETICAL_SURNAME_GROUPS or SOUTH_INDIAN_SURNAMES_RAW_LIST
 * are combined in exact order with all duplicates preserved.
 */
export const SOUTH_INDIAN_SURNAMES_RAW_LIST: RawSurnameItem[] = [];

function buildSurnameEntries(): CommunitySurnameEntry[] {
  const entries: CommunitySurnameEntry[] = [];
  let counter = 0;

  // 1. Process alphabetical groups A-Z in order
  for (const letter of ALPHABET_LETTERS) {
    const groupItems = ALPHABETICAL_SURNAME_GROUPS[letter] || [];
    for (const rawItem of groupItems) {
      counter += 1;
      const surname = typeof rawItem === 'string' ? rawItem : rawItem.surname;
      const explicitTrans =
        typeof rawItem === 'string' ? undefined : rawItem.transliterations;
      const trimmed = surname.trim();
      const normalizedLetter = letter.toUpperCase();

      entries.push({
        orderIndex: counter,
        id: `surname_${counter}_${normalizedLetter}_${trimmed.replace(/[^a-zA-Z0-9]/g, '_')}`,
        surname,
        category: 'South-Indian',
        letter: normalizedLetter,
        transliterations: getSurnameTransliterations(surname, explicitTrans),
      });
    }
  }

  // 2. Process any flat sequential entries while preserving order and duplicates
  for (const rawItem of SOUTH_INDIAN_SURNAMES_RAW_LIST) {
    counter += 1;
    const surname = typeof rawItem === 'string' ? rawItem : rawItem.surname;
    const explicitTrans =
      typeof rawItem === 'string' ? undefined : rawItem.transliterations;
    const trimmed = surname.trim();
    const firstChar = trimmed.charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';

    entries.push({
      orderIndex: counter,
      id: `surname_${counter}_${letter}_${trimmed.replace(/[^a-zA-Z0-9]/g, '_')}`,
      surname,
      category: 'South-Indian',
      letter,
      transliterations: getSurnameTransliterations(surname, explicitTrans),
    });
  }

  return entries;
}

export const SOUTH_INDIAN_SURNAME_ENTRIES: CommunitySurnameEntry[] =
  buildSurnameEntries();

export function getSurnameByLanguage(
  entry: CommunitySurnameEntry,
  language: LanguageCode
): string {
  return entry.transliterations[language] || entry.surname;
}
