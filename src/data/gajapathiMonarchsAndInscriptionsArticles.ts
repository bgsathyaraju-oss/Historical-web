import type { Article, LanguageCode, SourceReference } from '../types/index.ts';
import type { ArticleStructuredMetadata } from './sevenCategoriesExpansionData.ts';
import {
  PROFESSIONAL_HERITAGE_RELATIONSHIPS_8LANG,
  MONARCH_AND_INSCRIPTION_METADATA_8LANG,
  buildNativeSummaryForArticle,
  buildNative10ChapterContentForArticle,
  localizeAuthorName,
  localizeSourcesList
} from './gajapathiCompleteMultilingual10ChapterTranslations.ts';

const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

function make8Lang(
  en: string,
  hi: string,
  te: string,
  kn: string,
  ta: string,
  mr: string,
  or: string,
  bn: string
): Record<LanguageCode, string> {
  return { en, hi, te, kn, ta, mr, or, bn };
}

function make8LangSame(text: string): Record<LanguageCode, string> {
  return {
    en: text,
    hi: text,
    te: text,
    kn: text,
    ta: text,
    mr: text,
    or: text,
    bn: text
  };
}

/**
 * ============================================================================
 * NINE PROFESSIONAL HERITAGE CATEGORIES (CH-0017 .. CH-0025) CROSS-REFERENCE
 * SYSTEM FOR ALL GAJAPATHI-KINGS ARTICLES & MONOGRAPHS
 * ============================================================================
 * Preserves the exact Reference IDs (CH-0017 .. CH-0025) and Record IDs
 * (prof_cat_1_warriors .. prof_cat_9_other_professions) registered under
 * the Community-Heritage page.
 */
export interface ProfessionalHeritageCrossRefItem {
  categoryId:
    | 'prof_cat_1_warriors'
    | 'prof_cat_2_agriculture'
    | 'prof_cat_3_construction_engineering'
    | 'prof_cat_4_shilpi'
    | 'prof_cat_5_vasthushilpi'
    | 'prof_cat_6_lokashilpi'
    | 'prof_cat_7_vishwashilpi'
    | 'prof_cat_8_royal_heritage'
    | 'prof_cat_9_other_professions';
  refNumber:
    | 'CH-0017'
    | 'CH-0018'
    | 'CH-0019'
    | 'CH-0020'
    | 'CH-0021'
    | 'CH-0022'
    | 'CH-0023'
    | 'CH-0024'
    | 'CH-0025';
  categoryTitle: Record<LanguageCode, string>;
  historicalRelationship: Record<LanguageCode, string>;
  supportingEvidence: string;
  targetRoute: string;
}

export const NINE_PROFESSIONAL_CATEGORIES_CATALOG: Record<
  ProfessionalHeritageCrossRefItem['categoryId'],
  {
    refNumber: ProfessionalHeritageCrossRefItem['refNumber'];
    title: Record<LanguageCode, string>;
    defaultRoute: string;
  }
> = {
  prof_cat_1_warriors: {
    refNumber: 'CH-0017',
    title: make8Lang(
      'Category 1: Historical Warriors and Martial Heritage (CH-0017)',
      'श्रेणी 1: ऐतिहासिक योद्धा एवं सामरिक विरासत (CH-0017)',
      'వర్గం 1: చారిత్రక యోధులు మరియు సైనిక వారసత్వం (CH-0017)',
      'ವರ್ಗ 1: ಐತಿಹಾಸಿಕ ಯೋಧರು ಮತ್ತು ಸಮರ ಪರಂಪರೆ (CH-0017)',
      'வகை 1: வரலாற்று வீரர்கள் மற்றும் மறவர் பாரம்பரியம் (CH-0017)',
      'वर्ग १: ऐतिहासिक योद्धे आणि लष्करी वारसा (CH-0017)',
      'ବର୍ଗ ୧: ଐତିହାସିକ ଯୋଦ୍ଧା ଓ ସାମରିକ ଐତିହ୍ୟ (CH-0017)',
      'বিভাগ ১: ঐতিহাসিক যোদ্ধা ও সামরিক ঐতিহ্য (CH-0017)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_1_warriors'
  },
  prof_cat_2_agriculture: {
    refNumber: 'CH-0018',
    title: make8Lang(
      'Category 2: Agriculture and Agricultural Heritage (CH-0018)',
      'श्रेणी 2: कृषि एवं कृषक विरासत (CH-0018)',
      'వర్గం 2: వ్యవసాయం మరియు వ్యవసాయ వారసత్వం (CH-0018)',
      'ವರ್ಗ 2: ಕೃಷಿ ಮತ್ತು ಕೃಷಿ ಪರಂಪರೆ (CH-0018)',
      'வகை 2: வேளாண்மை மற்றும் விவசாயப் பாரம்பரியம் (CH-0018)',
      'वर्ग २: कृषी आणि शेतकरी वारसा (CH-0018)',
      'ବର୍ଗ ୨: କୃଷି ଓ କୃଷକ ଐତିହ୍ୟ (CH-0018)',
      'বিভাগ ২: কৃষি ও কৃষিভিত্তিক ঐতিহ্য (CH-0018)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_2_agriculture'
  },
  prof_cat_3_construction_engineering: {
    refNumber: 'CH-0019',
    title: make8Lang(
      'Category 3: Construction and Engineering Heritage (CH-0019)',
      'श्रेणी 3: निर्माण एवं अभियांत्रिकी विरासत (CH-0019)',
      'వర్గం 3: నిర్మాణ మరియు ఇంజనీరింగ్ వారసత్వం (CH-0019)',
      'ವರ್ಗ 3: ನಿರ್ಮಾಣ ಮತ್ತು ಎಂಜಿನಿಯರಿಂಗ್ ಪರಂಪರೆ (CH-0019)',
      'வகை 3: கட்டுமானம் மற்றும் பொறியியல் பாரம்பரியம் (CH-0019)',
      'वर्ग ३: बांधकाम आणि अभियांत्रिकी वारसा (CH-0019)',
      'ବର୍ଗ ୩: ନିର୍ମାଣ ଓ ଅଭିଯାନ୍ତ୍ରିକୀ ଐତିହ୍ୟ (CH-0019)',
      'বিভাগ ৩: নির্মাণ ও প্রকৌশল ঐতিহ্য (CH-0019)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_3_construction_engineering'
  },
  prof_cat_4_shilpi: {
    refNumber: 'CH-0020',
    title: make8Lang(
      'Category 4: Shilpi — Sculpture and Artistic Craft Heritage (CH-0020)',
      'श्रेणी 4: शिल्पी — मूर्तिकला एवं कलात्मक शिल्प विरासत (CH-0020)',
      'వర్గం 4: శిల్పి — శిల్పకళ మరియు హస్తకళా వారసత్వం (CH-0020)',
      'ವರ್ಗ 4: ಶಿಲ್ಪಿ — ಶಿಲ್ಪಕಲೆ ಮತ್ತು ಕರಕುಶಲ ಪರಂಪರೆ (CH-0020)',
      'வகை 4: சில்பி (சிற்பி) — சிற்பம் மற்றும் கைவினைப் பாரம்பரியம் (CH-0020)',
      'वर्ग ४: शिल्पी — मूर्तिकला आणि हस्तकला वारसा (CH-0020)',
      'ବର୍ଗ ୪: ଶିଳ୍ପୀ — ମୂର୍ତ୍ତିକଳା ଓ ଶିଳ୍ପ ଐତିହ୍ୟ (CH-0020)',
      'বিভাগ ৪: শিল্পী (ভাস্কর) — ভাস্কর্য ও কারুশিল্প ঐতিহ্য (CH-0020)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_4_shilpi'
  },
  prof_cat_5_vasthushilpi: {
    refNumber: 'CH-0021',
    title: make8Lang(
      'Category 5: Vasthushilpi — Architecture and Design Heritage (CH-0021)',
      'श्रेणी 5: वास्तुशिल्पी — वास्तुकला एवं संरचना डिज़ाइन विरासत (CH-0021)',
      'వర్గం 5: వాస్తుశిల్పి — వాస్తుశిల్పం మరియు భవన నిర్మాణ వారసత్వం (CH-0021)',
      'ವರ್ಗ 5: ವಾಸ್ತುಶಿಲ್ಪಿ — ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ವಿನ್ಯಾಸ ಪರಂಪರೆ (CH-0021)',
      'வகை 5: வாஸ்துசில்பி — கட்டிடக்கலை மற்றும் வடிவமைப்புப் பாரம்பரியம் (CH-0021)',
      'वर्ग ५: वास्तुशिल्पी — वास्तुकला आणि रचना वारसा (CH-0021)',
      'ବର୍ଗ ୫: ବାସ୍ତୁଶିଳ୍ପୀ — ସ୍ଥାପତ୍ୟ ଓ ନିର୍ମାଣ ଡିଜାଇନ୍ ଐତିହ୍ୟ (CH-0021)',
      'বিভাগ ৫: বাস্তুশিল্পী — স্থাপত্য ও নকশা ঐতিহ্য (CH-0021)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_5_vasthushilpi'
  },
  prof_cat_6_lokashilpi: {
    refNumber: 'CH-0022',
    title: make8Lang(
      'Category 6: Lokashilpi — Folk Art and Community Craft Heritage (CH-0022)',
      'श्रेणी 6: लोकशिल्पी — लोक कला एवं सामुदायिक शिल्प विरासत (CH-0022)',
      'వర్గం 6: లోకశిల్పి — జానపద కళలు మరియు సామాజిక హస్తకళా వారసత్వం (CH-0022)',
      'ವರ್ಗ 6: ಲೋಕಶಿಲ್ಪಿ — ಜಾನಪದ ಕಲೆ ಮತ್ತು ಸಮುದಾಯ ಕರಕುಶಲ ಪರಂಪರೆ (CH-0022)',
      'வகை 6: லோகசில்பி — நாட்டுப்புறக் கலை மற்றும் சமூகக் கைவினைப் பாரம்பரியம் (CH-0022)',
      'वर्ग ६: लोकशिल्पी — लोककला आणि सामुदायिक हस्तकला वारसा (CH-0022)',
      'ବର୍ଗ ୬: ଲୋକଶିଳ୍ପୀ — ଲୋକକଳା ଓ ସାମୁଦାୟିକ ଶିଳ୍ପ ଐତିହ୍ୟ (CH-0022)',
      'বিভাগ ৬: লোকশিল্পী — লোকশিল্প ও সামাজিক কারুশিল্প ঐতিহ্য (CH-0022)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_6_lokashilpi'
  },
  prof_cat_7_vishwashilpi: {
    refNumber: 'CH-0023',
    title: make8Lang(
      'Category 7: Vishwashilpi — Master Craftsmanship and Technical Heritage (CH-0023)',
      'श्रेणी 7: विश्वशिल्पी — मास्टर शिल्प कौशल एवं तकनीकी विरासत (CH-0023)',
      'వర్గం 7: విశ్వశిల్పి — విశిష్ట శిల్ప నైపుణ్యం మరియు సాంకేతిక వారసత్వం (CH-0023)',
      'ವರ್ಗ 7: ವಿಶ್ವಶಿಲ್ಪಿ — ಶ್ರೇಷ್ಠ ಶಿಲ್ಪ ಕೌಶಲ್ಯ ಮತ್ತು ತಾಂತ್ರಿಕ ಪರಂಪರೆ (CH-0023)',
      'வகை 7: விஷ்வசில்பி — தலைசிறந்த கைவினைத்திறன் மற்றும் தொழில்நுட்பப் பாரம்பரியம் (CH-0023)',
      'वर्ग ७: विश्वशिल्पी — उत्कृष्ट शिल्पकौशल्य आणि तांत्रिक वारसा (CH-0023)',
      'ବର୍ଗ ୭: ବିଶ୍ୱଶିଳ୍ପୀ — ଉତ୍କୃଷ୍ଟ ଶିଳ୍ପ କୌଶଳ ଓ ଯାନ୍ତ୍ରିକ ଐତିହ୍ୟ (CH-0023)',
      'বিভাগ ৭: বিশ্বশিল্পী — মাস্টার কারুশিল্প ও কারিগরি ঐতিহ্য (CH-0023)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_7_vishwashilpi'
  },
  prof_cat_8_royal_heritage: {
    refNumber: 'CH-0024',
    title: make8Lang(
      'Category 8: Royal Heritage — Royal and Dynastic Traditions (CH-0024)',
      'श्रेणी 8: राजवंशीय विरासत — राजकीय एवं वंशानुगत परंपराएँ (CH-0024)',
      'వర్గం 8: రాజవంశ వారసత్వం — రాజ మరియు వంశపారంపర్య సంప్రదాయాలు (CH-0024)',
      'ವರ್ಗ 8: ರಾಜವಂಶ ಪರಂಪರೆ — ರಾಜಕೀಯ ಮತ್ತು ವಂಶಪಾರಂಪರ್ಯ ಸಂಪ್ರದಾಯಗಳು (CH-0024)',
      'வகை 8: அரச பாரம்பரியம் — அரச மற்றும் வம்சாவளி மரபுகள் (CH-0024)',
      'वर्ग ८: राजवंशीय वारसा — राजकीय आणि घराण्यांच्या परंपरा (CH-0024)',
      'ବର୍ଗ ୮: ରାଜବଂଶୀୟ ଐତିହ୍ୟ — ରାଜକୀୟ ଓ ବଂଶାନୁକ୍ରମିକ ପରମ୍ପରା (CH-0024)',
      'বিভাগ ৮: রাজবংশীয় ঐতিহ্য — রাজকীয় ও বংশানুক্রমিক পরম্পরা (CH-0024)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_8_royal_heritage'
  },
  prof_cat_9_other_professions: {
    refNumber: 'CH-0025',
    title: make8Lang(
      'Category 9: Other Traditional and Contemporary Professions (CH-0025)',
      'श्रेणी 9: अन्य पारंपरिक एवं समकालीन व्यवसाय (CH-0025)',
      'వర్గం 9: ఇతర సాంప్రదాయ మరియు సమకాలీన వృత్తులు (CH-0025)',
      'ವರ್ಗ 9: ಇತರ ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಸಮಕಾಲೀನ ವೃತ್ತಿಗಳು (CH-0025)',
      'வகை 9: பிற பாரம்பரிய மற்றும் தற்காலத் தொழில்கள் (CH-0025)',
      'वर्ग ९: इतर पारंपरिक आणि समकालीन व्यवसाय (CH-0025)',
      'ବର୍ଗ ୯: ଅନ୍ୟାନ୍ୟ ପାରମ୍ପରିକ ଓ ସମକାଳୀନ ବୃତ୍ତି (CH-0025)',
      'বিভাগ ৯: অন্যান্য ঐতিহ্যবাহী ও সমসাময়িক পেশা (CH-0025)'
    ),
    defaultRoute: '/community-heritage?tab=professions&id=prof_cat_9_other_professions'
  }
};

function buildProfRef(
  categoryId: ProfessionalHeritageCrossRefItem['categoryId'],
  enRel: string,
  hiRel: string,
  teRel: string,
  supportingEvidence: string
): ProfessionalHeritageCrossRefItem {
  const cat = NINE_PROFESSIONAL_CATEGORIES_CATALOG[categoryId];
  const full8Rel = PROFESSIONAL_HERITAGE_RELATIONSHIPS_8LANG[cat.refNumber];
  return {
    categoryId,
    refNumber: cat.refNumber,
    categoryTitle: cat.title,
    historicalRelationship: full8Rel
      ? {
          en: enRel || full8Rel.en,
          hi: hiRel || full8Rel.hi,
          te: teRel || full8Rel.te,
          kn: full8Rel.kn,
          ta: full8Rel.ta,
          mr: full8Rel.mr,
          or: full8Rel.or,
          bn: full8Rel.bn
        }
      : make8Lang(enRel, hiRel, teRel, enRel, enRel, hiRel, enRel, enRel),
    supportingEvidence,
    targetRoute: cat.defaultRoute
  };
}

/**
 * Resolves the verified Nine Professional Heritage Categories (CH-0017 .. CH-0025)
 * for any article or monograph across the Gajapathi-Kings and Royal Dynasties archive.
 */
export function getProfessionalHeritageCategoriesForArticle(
  articleId: string
): ProfessionalHeritageCrossRefItem[] {
  const id = articleId.trim();

  // Military, Fortress, Nayaka, Gajasena, and Conqueror records
  if (
    id === 'military-gajasena' ||
    id === 'admin-nayakas' ||
    id === 'fig_hamvira_deva' ||
    id === 'art_fig_hamvira_deva_dakshina' ||
    id === 'art_map_gajapathi_36_forts_dandapatas' ||
    id === 'art_kolletikota_peddintlamma_lake' ||
    id === 'dyn_traditional_suryavamsha_lineages'
  ) {
    return [
      buildProfRef(
        'prof_cat_1_warriors',
        'Directly documents the Gajapathi Chaturanga-Bala, Paika/Khandayat infantry, Durgapati fortress commanders, and Odiyaraju/Vadderarajulu garrison forces.',
        'गजपति चतुरंग-बल, पाइक/खंडायत पैदल सेना, दुर्गपति कमांडरों और ओडियाराजु/वड्डेराराजुलु दुर्ग रक्षकों का प्रत्यक्ष अभिलेखीय संबंध।',
        'గజపతి చతురంగ బలం, పైకా/ఖండాయత్ పదాతిదళం, దుర్గాధిపతులు మరియు ఒడియరాజు/వడ్డెరరాజుల కోట రక్షక దళాల ప్రత్యక్ష చారిత్రక సంబంధం.',
        'Veligalani Grant (1458 CE); Srirangam Inscription (1464 CE); Madala Panji'
      ),
      buildProfRef(
        'prof_cat_3_construction_engineering',
        'Corroborates the cyclopean granite bastion masonry, mountain pass cutting, and hydraulic moat/reservoir engineering of the 36 Garhs and 160+ Giri-Durga / Jala-Durga forts.',
        '36 गढ़ों और 160+ गिरि-दुर्ग / जल-दुर्ग किलों के विशाल ग्रेनाइट प्राचीर निर्माण एवं जल-परिखा अभियांत्रिकी का प्रमाण।',
        '36 గఢ్‌లు మరియు 160+ గిరి-దుర్గ / జల-దుర్గ కోటల రాతి ప్రాకారాలు, కందకాలు మరియు జలాశయ ఇంజనీరింగ్ నిర్మాణ వారసత్వం.',
        'ASI Barabati, Kondavidu, Udayagiri & Kolletikota Survey Reports'
      ),
      buildProfRef(
        'prof_cat_8_royal_heritage',
        'Preserves the royal titles (Mahapatra, Pariksha, Behera-Mahapatra, Rajulu, Nayaka) and dynastic martial traditions of the Suryavamsha Gajapathi and Deccan principalities.',
        'सूर्यवंश गजपति और दक्कन की रियासतों की राजकीय उपाधियों (महापात्र, परीक्षा, राजुलु, नायक) और वंशानुगत परंपराओं का संरक्षण।',
        'సూర్యవంశ గజపతి మరియు దక్కన్ సంస్థానాల రాజ బిరుదులు (మహాపాత్ర, పరీక్ష, రాజులు, నాయక) మరియు వంశపారంపర్య సంప్రదాయాలు.',
        'R. Subrahmanyam (1957); Mackenzie Kaifiyats'
      ),
      buildProfRef(
        'prof_cat_5_vasthushilpi',
        'Illustrates Kautilyan Chaturvidha-Durga (Giri, Jala, Sthala, Vana) military architecture and temple-citadel spatial planning.',
        'कौटिलीय चतुर्विध-दुर्ग (गिरि, जल, स्थल, वन) सैन्य वास्तुकला और मंदिर-दुर्ग नगर नियोजन का उत्कृष्ट उदाहरण।',
        'కౌటిల్యుని చతుర్విధ దుర్గ (గిరి, జల, స్థల, వన) వాస్తుశిల్పం మరియు కోట-దేవాలయ నగర ప్రణాళిక.',
        'Kautilya Arthashastra; Silpa Prakasa'
      )
    ];
  }

  // Kakatiya Dynasty, Tank Irrigation, and Inscriptions (KD-0001, KD-0019..KD-0023)
  if (id.startsWith('insc_anumakonda') || id.startsWith('insc_motupalli') || id.startsWith('insc_malkapuram') || id.startsWith('insc_chandupatla') || id.includes('kakatiya')) {
    return [
      buildProfRef(
        'prof_cat_8_royal_heritage',
        'Documents the sovereign Kakatiya imperial court at Anumakonda and Orugallu (Warangal) and the 77-Nayankara royal governance system.',
        'अनमकोंडा और ओरुगल्लु (वारंगल) के सार्वभौम काकतीय राजदरबार तथा 77-नायंकर राजकीय प्रशासन प्रणाली का दस्तावेजीकरण।',
        'అనుమకొండ మరియు ఓరుగల్లు (వరంగల్) కాకతీయ సామ్రాజ్య సార్వభౌమత్వం మరియు 77-నాయంకర రాజ పాలనా వ్యవస్థ.',
        'Hanamkonda Inscription (1163 CE); P.V. Parabrahma Sastry (1978)'
      ),
      buildProfRef(
        'prof_cat_3_construction_engineering',
        'Exemplifies the Chain-Tank (Golusu-Kattu Cheruvu) hydraulic revolution—Ramappa, Pakhal, Laknavaram, and Bayyaram reservoirs—and Orugallu triple concentric fortifications.',
        'गोलुसु-कट्टु चेरुवु (श्रृंखला-तालाब) जल-अभियांत्रिकी क्रांति—रामप्पा, पाखाल, लखनावरम जलाशय—तथा ओरुगल्लु के त्रि-स्तरीय दुर्ग निर्माण का प्रमाण।',
        'గొలుసుకట్టు చెరువుల జల-ఇంజనీరింగ్ విప్లవం (రామప్ప, పాకాల, లక్నవరం, బయ్యారం సముద్రాలు) మరియు ఓరుగల్లు త్రిశ్రేణి కోట నిర్మాణ వారసత్వం.',
        'Cynthia Talbot (2001); ASI Warangal & Palampet Reports'
      ),
      buildProfRef(
        'prof_cat_2_agriculture',
        'Documents the Dasavanda (Kattu-Kodage) tax-free wet-rice agrarian expansion across Telangana and coastal Andhra deltas.',
        'तेलंगाना और तटीय आंध्र में दशवंद (कट्टु-कोडगे) सिंचित कृषि विस्तार और ग्रामीण अर्थव्यवस्था का अभिलेखीय प्रमाण।',
        'తెలంగాణ మరియు ఆంధ్ర ప్రాంతాలలో దశవంద (కట్టు-కొడగె) చెరువు ఆధారిత వ్యవసాయ విస్తరణ మరియు గ్రామీణ ఆర్థిక వ్యవస్థ.',
        'Bayyaram & Pakhal Tank Inscriptions; Motupalli Charter (1244 CE)'
      ),
      buildProfRef(
        'prof_cat_4_shilpi',
        'Showcases the UNESCO World Heritage Rudresvara (Ramappa) Temple black dolerite Madanika bracket sculptures and monolithic Kirti Toranas.',
        'यूनेस्को विश्व धरोहर रुद्रेश्वर (रामप्पा) मंदिर की काले डोलेराइट पाषाण मदनिका मूर्तियों और कीर्ति तोरण शिल्प कौशल का प्रदर्शन।',
        'యునెస్కో ప్రపంచ వారసత్వ రామప్ప దేవాలయ నల్ల రాతి మదనిక శిల్పాలు మరియు ఓరుగల్లు కీర్తి తోరణాల శిల్పకళా వైభవం.',
        'UNESCO World Heritage Dossier (Ramappa Temple, 2021)'
      ),
      buildProfRef(
        'prof_cat_7_vishwashilpi',
        'Highlights Kakatiya sandbox earthquake-resistant foundations and ultra-lightweight floating porous bricks in temple vimanas.',
        'काकतीय भूकंप-रोधी सैंडबॉक्स नींव और विमान शिखरों में तैरने वाली हल्की छिद्रित ईंटों की उच्च तकनीकी शिल्प विद्या।',
        'కాకతీయుల భూకంప నిరోధక ఇసుక పునాదులు (Sandbox technology) మరియు నీటిపై తేలే తేలికపాటి ఇటుకల సాంకేతిక నైపుణ్యం.',
        'Palampet Inscription of Recharla Rudra (1213 CE)'
      )
    ];
  }

  // Cultural Renaissance, Eastern Gangas, Konark, Puri, Somavamsi, Bhaumakara
  if (
    id === 'culture-renaissance' ||
    id === 'dyn_eastern_ganga' ||
    id === 'art_dyn_eastern_gangas' ||
    id === 'fig_anantavarman_chodaganga' ||
    id === 'fig_langula_narasimha' ||
    id === 'art_dyn_somavamsi_keshari' ||
    id === 'art_dyn_bhaumakara_tribhuvana'
  ) {
    return [
      buildProfRef(
        'prof_cat_8_royal_heritage',
        'Documents the imperial Chakravarti sovereignty of the Eastern Ganga, Somavamsi, and Suryavamsha Gajapathi courts and their sacred Chera-Panhara service to Lord Jagannatha.',
        'पूर्वी गंग, सोमवंशी और सूर्यवंश गजपति सम्राटों की चक्रवर्ती संप्रभुता तथा महाप्रभु जगन्नाथ की छेरा-पंहरा राजसेवा का प्रमाण।',
        'తూర్పు గంగ, సోమవంశీ మరియు సూర్యవంశ గజపతి చక్రవర్తుల సార్వభౌమత్వం మరియు శ్రీ జగన్నాథ రథయాత్రలో ఛేరా-పంహరా రాజసేవ.',
        'Korni Copper Plates (1112 CE); Kendupatna Plates (1295 CE); Madala Panji'
      ),
      buildProfRef(
        'prof_cat_5_vasthushilpi',
        'Showcases Kalinga Rekha-Deula, Pidha-Deula, and Khakhara-Deula temple architecture at Puri Sri Jagannatha, Konark Sun Temple, and Bhubaneswar Lingaraja.',
        'पुरी श्री जगन्नाथ, कोणार्क सूर्य मंदिर और भुवनेश्वर लिंगराज में कलिंग रेखा-देउल, पीढ़ा-देउल एवं खाखरा-देउल वास्तुशिल्प का शिखर।',
        'పూరీ జగన్నాథ, కోణార్క్ సూర్య దేవాలయం మరియు భువనేశ్వర్ లింగరాజ ఆలయాలలో కళింగ రేఖా-దేవుల, పీఢా-దేవుల వాస్తుశిల్ప వైభవం.',
        'Baya Chakada Palm-Leaf Chronicle; Silpa Prakasa; UNESCO Konark Dossier'
      ),
      buildProfRef(
        'prof_cat_4_shilpi',
        'Celebrates the master stone-sculptors (Pathuria / Shilpi guilds) who carved the 24 astronomical chariot wheels of Konark and the Meghanada Pacheri gateways.',
        'कोणार्क के 24 खगोलीय रथ-चक्रों और मेघनाद पचेरी द्वारों को तराशने वाले मास्टर पाषाण-शिल्पियों (पथुरिया/शिल्पी संघों) की विरासत।',
        'కోణార్క్ 24 ఖగోళ రథచక్రాలు మరియు మేఘనాద పచేరి ద్వారాలను చెక్కిన రాతి శిల్పుల (శిల్పి సంఘాల) అద్భుత కళా నైపుణ్యం.',
        'Alice Boner, New Light on the Sun Temple of Konark (1972)'
      ),
      buildProfRef(
        'prof_cat_6_lokashilpi',
        'Connects the vernacular literary renaissance of Adikavi Sarala Dasa (Odia Mahabharata) and the Panchasakha poet-saints with community cultural traditions.',
        'आदिकवि सारला दास (ओड़िया महाभारत) और पंचसखा संत-कवियों के लोक-साहित्यिक पुनर्जागरण तथा सामुदायिक सांस्कृतिक परंपराओं का संगम।',
        'ఆదికవి సారళా దాసు (ఒడియా మహాభారతం) మరియు పంచసఖ కవుల సాహిత్య పునరుజ్జీవనం మరియు జానపద సాంస్కృతిక వారసత్వం.',
        'Sarala Mahabharata (15th Century CE); K.C. Panigrahi (1981)'
      )
    ];
  }

  // Administrative, Chancery, Inscriptions, and Methodology Records
  if (
    id === 'admin-mahapatras' ||
    id === 'art_genealogy_methodology' ||
    id.startsWith('insc_') ||
    id === 'art_insc_veligalani_kapilendra_1458' ||
    id === 'art_epigraphic_evolution_odra'
  ) {
    return [
      buildProfRef(
        'prof_cat_8_royal_heritage',
        'Documents the trilingual royal chancery (Sanskrit, Odia, Telugu), Dandapata revenue governance, and Pariksha/Mahapatra ministerial offices of the Gajapathi Empire.',
        'गजपति साम्राज्य के त्रिभाषी राजकीय सचिवालय (संस्कृत, ओड़िया, तेलुगु), दंडपाट राजस्व प्रशासन और परीक्षा/महापात्र मंत्रिपदों का अभिलेखीय प्रमाण।',
        'గజపతి సామ్రాజ్య త్రిభాషా రాజ శాసన విభాగం (సంస్కృతం, ఒడియా, తెలుగు), దండపాట రెవెన్యూ పాలన మరియు పరీక్ష/మహాపాత్ర మంత్రిత్వ వ్యవస్థ.',
        'Veligalani Copper Plates (1458 CE); Sarasvati Vilasa (c. 1515 CE)'
      ),
      buildProfRef(
        'prof_cat_1_warriors',
        'Records land grants, military titles, and royal decrees issued during imperial campaigns across Kalinga, Odra, Vengi, Kondavidu, and Kanchi.',
        'कलिंग, ओड्र, वेंगी, कोंडावीडु और कांची के सामरिक अभियानों के दौरान जारी सैन्य उपाधियों और राजकीय अनुदानों का विवरण।',
        'కళింగ, ఓడ్ర, వేంగి, కొండవీడు మరియు కాంచీపురం సైనిక దండయాత్రలలో జారీ చేయబడిన రాజ శాసనాలు మరియు సైనిక బిరుదులు.',
        'Epigraphia Indica Vols. XX, XXVIII & XXXIII; SII Vols. IV–VI'
      ),
      buildProfRef(
        'prof_cat_9_other_professions',
        'Highlights the role of royal jurists, epigraphic engravers (Akshara-Shilpis), palm-leaf chroniclers, and revenue administrators.',
        'राजकीय धर्मशास्त्रियों, ताम्रपत्र/शिलालेख उत्कीर्णकों (अक्षर-शिल्पी), ताड़पत्र इतिहासकारों और राजस्व प्रशासकों की भूमिका।',
        'రాజ న్యాయశాస్త్రజ్ఞులు, తామ్రపత్ర/శిలాశాసన శిల్పులు (అక్షర-శిల్పులు), తాళపత్ర చరిత్రకారులు మరియు రెవెన్యూ అధికారుల వృత్తి వారసత్వం.',
        'Sarasvati Vilasa; Madala Panji; D.C. Sircar, Indian Epigraphy (1965)'
      )
    ];
  }

  // Default for all Core Suryavamsha Gajapathi & Regional Royal Dynasty Monographs (RD-0001..RD-0016, HF-0011..HF-0017, KM-0001..KM-0002)
  return [
    buildProfRef(
      'prof_cat_8_royal_heritage',
      'Directly documents the sovereign Suryavamsha Gajapathi and allied eastern/southern royal dynasties, imperial titles, and court administration.',
      'सार्वभौम सूर्यवंश गजपति एवं संबद्ध राजवंशों, साम्राज्यिक उपाधियों और राजदरबार प्रशासन का प्रत्यक्ष ऐतिहासिक दस्तावेजीकरण।',
      'సార్వభౌమ సూర్యవంశ గజపతి మరియు అనుబంధ రాజవంశాలు, సామ్రాజ్య బిరుదులు మరియు రాజ దర్బారు పాలనా వారసత్వం.',
      'Veligalani Plates (1458 CE); Lingaraja Proclamation (1452 CE); R. Subrahmanyam (1957)'
    ),
    buildProfRef(
      'prof_cat_1_warriors',
      'Chronicles the imperial campaigns from the Ganges (Hooghly) to the Kaveri (Srirangam), Paika/Khandayat legions, and southern Odiyaraju/Vadderarajulu fort garrisons.',
      'गंगा (हुगली) से कावेरी (श्रीरंगम) तक के सामरिक अभियानों, पाइक/खंडायत सेनाओं और दक्षिणी ओडियाराजु/वड्डेराराजुलु दुर्ग रक्षकों का इतिहास।',
      'గంగా నది (హుగ్లీ) నుండి కావేరి (శ్రీరంగం) వరకు సాగిన దిగ్విజయ యాత్రలు, పైకా/ఖండాయత్ దళాలు మరియు దక్షిణ ఒడియరాజు/వడ్డెరరాజుల దుర్గ రక్షక సేనల చరిత్ర.',
      'Srirangam Inscription (1464 CE); Warangal Gate Inscription (1458 CE)'
    ),
    buildProfRef(
      'prof_cat_3_construction_engineering',
      'Documents the fortification of Barabati, Kondavidu, Udayagiri, and Kolletikota, alongside riverine embankments (Pathuria Bandha) and temple enclosures.',
      'बाराबती, कोंडावीडु, उदयगिरि और कोल्लेतिकोटा के दुर्ग निर्माण तथा महानदी पाषाण तटबंधों (पथुरिया बंध) की अभियांत्रिकी विरासत।',
      'బారాబతి, కొండవీడు, ఉదయగిరి మరియు కొల్లేటికోట దుర్గాల నిర్మాణం, మహానది రాతి కరకట్టలు మరియు ఆలయ ప్రాకారాల ఇంజనీరింగ్ వారసత్వం.',
      'ASI Excavations at Barabati & Sisupalgarh; Meghanada Pacheri Records'
    ),
    buildProfRef(
      'prof_cat_2_agriculture',
      'Records royal Brahmadeya, Devadana, and Dasavanda agrarian grants across the Mahanadi, Godavari, Krishna, and Pennar river deltas.',
      'महानदी, गोदावरी, कृष्णा और पेन्नार नदी डेल्टाओं में राजकीय ब्रह्मदेय, देवदान और सिंचित कृषि अनुदानों का अभिलेखीय विवरण।',
      'మహానది, గోదావరి, కృష్ణా మరియు పెన్నా నదీ డెల్టాలలో జారీ చేయబడిన రాజ అగ్రహార, దేవదాన మరియు సాగునీటి వ్యవసాయ దానాలు.',
      'Potavaram Grant (1489 CE); Simhachalam & Draksharama Epigraphs'
    )
  ];
}

/**
 * ============================================================================
 * 14 COMPLETE OD-0001 MODEL MONOGRAPHS FOR CATEGORY 1A (7 MONARCHS)
 * AND CATEGORY 1D (7 INSCRIPTIONS) ON THE GAJAPATHI-KINGS PAGE
 * ============================================================================
 * Strictly preserves existing Record IDs & Reference IDs:
 * - HF-0011: fig_kapilendra_deva
 * - HF-0013: fig_purushottama_deva
 * - HF-0014: fig_prataparudra_deva
 * - HF-0012: fig_hamvira_deva
 * - HF-0017: fig_mukunda_deva
 * - HF-0009: fig_anantavarman_chodaganga
 * - HF-0010: fig_langula_narasimha
 * - IA-0007: insc_veligalani_1458
 * - IA-0006: insc_lingaraja_1452
 * - IA-0011: insc_simhachalam_prataparudra
 * - KD-0019: insc_anumakonda_1163
 * - KD-0020: insc_motupalli_1244
 * - KD-0021: insc_malkapuram_1261
 * - KD-0022: insc_chandupatla_1289
 */
export const GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_ARTICLES: Article[] = [
  // 1. HF-0011: fig_kapilendra_deva
  {
    id: 'fig_kapilendra_deva',
    slug: 'samrat-kapilendra-deva-gajapathi-monograph-hf-0011',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('kapilendra_deva_portrait.jpg'),
    original_language: 'en',
    original_title:
      'HF-0011 | Samrat Kapilendra Deva Gajapathi (r. 1434–1466 CE): Founder of the Suryavamsha Gajapathi Empire, Imperial Campaigns & Rashtra-Devata Polity',
    summary:
      'Comprehensive 10-chapter historical monograph on Samrat Kapilendra Deva Gajapathi (Reference ID: HF-0011, Record ID: fig_kapilendra_deva), documenting his 1434 CE coronation at Abhinava Varanasi Kataka, assumption of the supreme title Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara, the Meghanada Pacheri fortification of Puri Jagannatha Temple, the 1458 CE Veligalani Copper-Plate Grant, and the expansion of Odra-Kshatriya garrisons from the Hooghly to the Kaveri.',
    tags: [
      'HF-0011',
      'Kapilendra Deva',
      'Suryavamsha Gajapathi',
      'Navakoti Karnata Kalavargesvara',
      'Veligalani Plates 1458',
      'Meghanada Pacheri',
      'Varanasi Kataka'
    ],
    sources: [
      {
        id: 'src_hf11_01',
        source_type: 'Inscription',
        title: 'Veligalani Copper-Plate Grant of Kapilendra Deva (Saka 1380 / 1458 CE)',
        author_or_authority: 'Dr. D.C. Sircar (ed.), Epigraphia Indica, Vol. XXXIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1458 CE (pub. 1959–1960)',
        citation_details: 'pp. 275–292; Trilingual Sanskrit, Odia, and Telugu imperial charter on the Krishna River',
        verified: true
      },
      {
        id: 'src_hf11_02',
        source_type: 'Inscription',
        title: 'Lingaraja Temple & Puri Jagannatha Jaya-Vijaya Doorway Inscriptions of Kapilendra Deva',
        author_or_authority: 'Dr. K.B. Tripathi, The Evolution of Oriya Language and Script',
        publication_or_location: 'Bhubaneswar: Utkal University',
        year_or_era: '1436–1452 CE (pub. 1962)',
        citation_details: 'Inscriptions Nos. 24–29; Tax-remission edicts and proclamation of Lord Jagannatha as Supreme Sovereign',
        verified: true
      },
      {
        id: 'src_hf11_03',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Prof. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University Press',
        year_or_era: '1957',
        citation_details: 'Chapters II–III, pp. 31–74 (Chronology, northern and southern campaigns, and Dandapata governance)',
        verified: true
      },
      {
        id: 'src_hf11_04',
        source_type: 'Scholarly Book',
        title: 'The History of the Gajapati Kings of Orissa and Their Successors',
        author_or_authority: 'Prof. Prabhat Mukherjee',
        publication_or_location: 'Cuttack: Kitab Mahal',
        year_or_era: '1953 (rev. 1981)',
        citation_details: 'pp. 18–56 (Comparative analysis of Anka regnal years and Bahmani-Vijayanagara wars)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Imperial Identity (Reference ID: HF-0011)
**Samrat Kapilendra Deva Gajapathi** (r. 1434–1466 CE; Record ID: \`fig_kapilendra_deva\`, Reference ID: **HF-0011**) stands as the founding emperor of the **Suryavamsha Gajapathi Dynasty** of Odisha and one of the most consequential sovereigns in medieval Indian history. Ascending the throne at **Abhinava Varanasi Kataka** (modern Cuttack) in 1434 CE upon the extinction of the later Eastern Ganga line under Bhanudeva IV, Kapilendra Deva transformed the core kingdom of **Odra Desha** into a subcontinental empire stretching from the lower **Hooghly (Bhagirathi-Ganga)** in Bengal to the **Kaveri River (Srirangam / Tiruchirappalli)** in Tamil Nadu.

### 2. Historical Background, Solar Lineage & Early Career
In the **Veligalani Copper-Plate Grant (Saka 1380 / 1458 CE)** and the **Warangal Fort Gate Inscription (1458 CE)**, Kapilendra Deva explicitly proclaims his descent from the **Suryavamsha (Solar Dynasty of Ikshvaku and Sri Rama)**. Epigraphic records identify his grandfather as **Kapilesvara Nayaka** and his father as **Jagesvara**, military commanders (*Nayakas*) rooted in the martial traditions of Kalinga-Odra. While the later temple chronicle *Madala Panji* preserves folkloric stories of his youth watered by divine grace before Lord Jagannatha, contemporary copper plates confirm his rise as a seasoned military general (*Rautaraya* and *Mahapatra*) who rallied the Odra nobility when Bhanudeva IV's authority collapsed in 1434 CE.

### 3. Coronation at Kataka (1434 CE) & The Lingaraja Edict
Immediately after his coronation in 1434 CE, Kapilendra Deva suppressed rebellious feudatories (including the Matsyas of Oddadi, the Silavamsis of Nandapur, and the Gangas of Khimindi). At the **Lingaraja Temple in Bhubaneswar** and the **Jaya-Vijaya doorway of Puri Jagannatha Temple (1436 CE)**, he caused proclamations to be engraved in early Odia prose:
- He remitted the oppressive taxes on **salt and cowries (currency)** that had burdened the common peasantry.
- He declared **Lord Purushottama-Jagannatha** the supreme sovereign (*Rashtra-Devata*) of the empire, styling himself the humble **Rauta (Deputy)** and **Adya-Sevaka (First Servitor)** of the deity.

### 4. Northern Campaigns & The Title "Gaudesvara" (1444–1450 CE)
Securing his northern frontier, Kapilendra Deva repelled the incursion of **Sultan Mahmud Shah Sharqi of Jaunpur** (1444 CE) and defeated **Sultan Shamsuddin Ahmad Shah and Nasiruddin Mahmud Shah of Bengal (Gauda)**, annexing the **Mandaran** and **Triveni (Hooghly)** frontier districts. To commemorate his decisive victory over the Bengal Sultanate, he assumed the imperial title **Gaudesvara** ("Lord of Gauda/Bengal").

### 5. Conquest of Rajahmundry, Kondavidu & Coastal Andhra (1448–1454 CE)
Turning southward across the Godavari River, Kapilendra Deva and his eldest son **Kumara Hamvira Deva** annexed the **Rajahmundry Reddi Kingdom** (1448 CE) and captured the formidable mountain citadel of **Kondavidu** by 1454 CE (where **Ganadeva Rautaraya** was appointed Pariksha/governor, as attested by the Chintapalli and Kondavidu inscriptions). During this campaign, Gajapathi naval and infantry detachments also fortified the aquatic island citadel of **Kolletikota (Jala-Durga)** in the heart of **Kolleru Lake (Kolleti Sarasu)**, venerating **Sri Peddintlamma Thalli** as the guardian deity of the garrison.

### 6. The Bahmani War, Liberation of Orugallu & "Navakoti Karnata Kalavargesvara" (1458 CE)
When Bahmani Sultan **Alauddin Ahmad Shah II** and **Humayun Shah Zalim** besieged Devarakonda in Telangana, the Velama chief Lingamanedu appealed to Kapilendra Deva. In **February 1458 CE**, Prince Hamvira Deva and Raghudeva Narendra Mahapatra routed the Bahmani army at **Devarakonda**, liberated the historic Kakatiya capital of **Orugallu (Warangal Fort)** (engraving a triumphant Sanskrit inscription on its southern gateway), and marched toward the Bahmani capital of Bidar/Gulbarga (*Kalabarga*). Following these victories and the conquest of Vijayanagara's eastern coastal provinces (**Udayagiri** and **Chandragiri**), Kapilendra Deva assumed the full imperial titulature:
> **"Sri Sri Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara"**
> *(Illustrious Lord of the Elephant Corps, Sovereign of Gauda/Bengal, Overlord of Nine-Crore Karnata and Gulbarga/Bidar).*

### 7. The Veligalani Copper-Plate Charter (1458 CE) & Dakshina Digvijaya to Srirangam (1464 CE)
In **May 1458 CE (Saka 1380)**, while encamped on the banks of the **Krishna River**, Kapilendra Deva issued the famous trilingual **Veligalani Copper-Plate Grant** (composed in Sanskrit, Odia, and Telugu), donating the village of Veligalani in Guntur district to 120 learned Brahmins. By **1463–1464 CE**, his southern viceroy **Kumara Hamvira Deva** swept across Kanchipuram, Tiruvannamalai, Padaividu, and **Tiruchirappalli**, inscribing his royal gift at the **Srirangam Sri Ranganathaswamy Temple (Saka 1386 / 1464 CE)** on the Kaveri River.

### 8. Cultural, Literary & Architectural Contributions: Meghanada Pacheri & Sarala Dasa
- **Meghanada Pacheri at Puri (c. 1448–1452 CE)**: Kapilendra Deva constructed the colossal outer fortress wall (*Meghanada Prachira*, measuring 665 ft × 640 ft and 20–24 ft high) around the **Sri Jagannatha Temple at Puri**, pierced by the four cardinal gateways (*Singhadwara, Ashwadwara, Vyaghradwara, Hastidwara*).
- **Sanskrit Drama**: Himself an accomplished Sanskrit scholar, Kapilendra Deva authored the one-act Sanskrit play **Parashurama Vijaya**, performed at royal festivals.
- **Odia Literary Renaissance**: Under his reign, **Adikavi Sarala Dasa** (a former soldier in Kapilendra's army from Jhankada) composed the monumental Odia **Mahabharata**, **Vilanka Ramayana**, and **Chandi Purana**, establishing classical vernacular Odia literature.

### 9. Historiographical Evaluation & Chronological Debate (1466/67 vs. 1468–1470 CE)
- **Documented Epigraphic Facts**: Over 70 stone and copper-plate inscriptions across Odisha, Andhra Pradesh, Telangana, and Tamil Nadu independently verify Kapilendra Deva's reign, titles, and conquests.
- **Historiographical Chronology Note**: While **Prof. R. Subrahmanyam (1957)** and **Dr. K.C. Panigrahi (1981)** date his death on the banks of the Krishna River to **late 1466 or January 1467 CE** (based on Purushottama Deva's earliest *Anka* reckonings), **Prof. R.D. Banerji (1930)** and **Prof. Prabhat Mukherjee (1953)** analyzed overlapping *Anka* years in southern inscriptions to propose **1468 or 1469/1470 CE** as the final year of his reign.

### 10. Historical Timeline & Conclusion
- **1434 CE**: Coronation of Kapilendra Deva at Abhinava Varanasi Kataka (Cuttack).
- **1436–1438 CE**: Abolition of salt and cowrie taxes; Puri and Lingaraja temple proclamations in Odia.
- **1444–1450 CE**: Defeat of Jaunpur and Bengal Sultanates; assumption of title *Gaudesvara*.
- **1448–1454 CE**: Conquest of Rajahmundry and Kondavidu; fortification of Kolletikota Jala-Durga.
- **1458 CE (Feb & May)**: Victory at Devarakonda, liberation of Warangal (Orugallu) Fort, and issuance of the trilingual **Veligalani Copper-Plate Grant**.
- **1464 CE**: Southern zenith at **Srirangam (Kaveri River)** under Prince Hamvira Deva.
- **1466/1467 CE**: Demise of Samrat Kapilendra Deva on the banks of the Krishna River after nominating Purushottama Deva as successor.`
  },

  // 2. HF-0013: fig_purushottama_deva
  {
    id: 'fig_purushottama_deva',
    slug: 'emperor-purushottama-deva-gajapathi-monograph-hf-0013',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('purushottama_deva_kanchi.jpg'),
    original_language: 'en',
    original_title:
      'HF-0013 | Emperor Purushottama Deva Gajapathi (r. 1466–1497 CE): Re-Consolidation of Kondavidu & Udayagiri, the Kanchi-Kaveri Expedition & Classical Lexicography',
    summary:
      'Complete 10-chapter historical monograph on Emperor Purushottama Deva Gajapathi (Reference ID: HF-0013, Record ID: fig_purushottama_deva), analyzing his succession struggle with Hamvira Deva, the reconquest of Rajahmundry, Kondavidu, and Udayagiri, the 1489 CE Potavaram Copper-Plate Grant, the Kanchi-Kaveri tradition versus epigraphic evidence, and his Sanskrit literary works.',
    tags: [
      'HF-0013',
      'Purushottama Deva',
      'Kanchi-Kaveri Expedition',
      'Potavaram Grant 1489',
      'Udayagiri Fort',
      'Kondavidu Fort',
      'Abhinava Gitagovinda'
    ],
    sources: [
      {
        id: 'src_hf13_01',
        source_type: 'Inscription',
        title: 'Potavaram Copper-Plate Grant of Purushottama Deva (Saka 1411 / 1489 CE)',
        author_or_authority: 'Epigraphia Indica, Vol. XIII / South Indian Inscriptions',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1489 CE',
        citation_details: 'Confirms Purushottama Deva’s full sovereignty over coastal Andhra, Kondavidu, and Udayagiri',
        verified: true
      },
      {
        id: 'src_hf13_02',
        source_type: 'Inscription',
        title: 'Draksharama, Simhachalam & Puri Jagannatha Temple Inscriptions of Purushottama Deva',
        author_or_authority: 'South Indian Inscriptions (SII), Vols. IV, V & VI',
        publication_or_location: 'Madras: Government Press',
        year_or_era: '1467–1496 CE',
        citation_details: 'Records gifts, tax exemptions, and administrative decrees across Kalinga and Vengi',
        verified: true
      },
      {
        id: 'src_hf13_03',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Prof. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University Press',
        year_or_era: '1957',
        citation_details: 'Chapter IV, pp. 75–102 (Reign of Purushottama Deva and the Kanchi-Kaveri campaign)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Sovereign Profile (Reference ID: HF-0013)
**Emperor Purushottama Deva Gajapathi** (r. 1466–1497 CE; Record ID: \`fig_purushottama_deva\`, Reference ID: **HF-0013**) was the second sovereign monarch of the **Suryavamsha Gajapathi Empire**. Chosen by his father **Samrat Kapilendra Deva** on the banks of the Krishna River in 1466 CE, Purushottama Deva overcame a severe early war of succession and Bahmani intervention to reconquer the entire Godavari–Krishna–Pennar corridor, including **Rajahmundry, Kondavidu, and Udayagiri**, while presiding over a golden age of Sanskrit scholarship and Jagannatha temple architecture at Puri.

### 2. The Succession Struggle (1466–1472 CE) & Reconciliation with Hamvira Deva
Kapilendra Deva's nomination of his younger son Purushottama Deva—attributed in royal tradition to a divine dream (*Adesha*) of Lord Purushottama-Jagannatha—was contested by his eldest brother **Kumara Hamvira Deva**, the veteran conqueror of the south. When Bahmani Sultan Muhammad Shah III dispatched **Nizam-ul-Mulk Hasan Bahri** to capture Rajahmundry and Kondavidu (c. 1471–1472 CE) during the fraternal conflict, Purushottama Deva patiently rebuilt his central army in Odisha, reconciled with the southern commanders, and prepared a systematic counter-offensive.

### 3. Reconquest of Rajahmundry & Kondavidu (1476–1484 CE)
Taking advantage of a mutiny among the Bahmani garrisons at Kondavidu and the outbreak of famine in the Deccan, Purushottama Deva crossed the Godavari River with a massive **Gajasena** (war elephant corps) and **Paika** infantry force. By **1476–1482 CE**, following the death of Sultan Muhammad Shah III and the assassination of Mahmud Gawan, Purushottama Deva expelled the Bahmani forces from **Rajahmundry** and **Kondavidu**, restoring Gajapathi administration across the Godavari and Krishna deltas.

### 4. Capture of Udayagiri Fort & The Kanchi-Kaveri Campaign (1486–1490 CE)
Advancing south of the Krishna River against **Saluva Narasimha** of Vijayanagara, Purushottama Deva stormed the mountain citadel of **Udayagiri** (Nellore district), capturing Saluva Narasimha's garrison and extending Gajapathi rule into the northern Tamil plains toward **Kanchipuram**. The **Potavaram Copper-Plate Grant (Saka 1411 / 1489 CE)** issued by Purushottama Deva in Prakasam district provides direct contemporary epigraphic proof that his authority was firmly re-established south of the Krishna River.

### 5. Historiographical Distinction: Epigraphic Reality vs. The Kanchi-Kaveri Legend
In rigorous historical analysis, two distinct layers must be separated regarding Purushottama Deva's southern campaign:
- **Verified Epigraphic History**: Purushottama Deva's reconquest of Rajahmundry, Kondavidu, Vinukonda, Addanki, and Udayagiri (1484–1489 CE) and his raids into the Kanchi-Chandragiri belt against Saluva Narasimha are firmly corroborated by the **Potavaram Plates (1489 CE)** and inscriptions at **Draksharama** and **Simhachalam**.
- **Sacred & Literary Tradition (*Kanchi-Kaveri*)**: The celebrated Odia ballad *Kanchi-Kaveri* (later popularized by Purushottama Dasa and the *Madala Panji*) narrates that the King of Kanchi refused to give his daughter **Princess Padmavati** in marriage because Purushottama Deva performed the humble *Chera-Panhara* (sweeping the chariots of Lord Jagannatha with a golden broom during Ratha Yatra), and that **Lord Jagannatha and Lord Balabhadra** rode ahead of the Gajapathi army on black and white steeds (*Manika Gauduni* episode). Historians classify the Padmavati romance and divine horsemen as cherished devotional-literary tradition celebrating the theological doctrine that the Gajapathi Emperor is the first servitor (*Adya-Sevaka*) of Sri Jagannatha.

### 6. Temple Architecture & Installation of the Uchchhishta Ganapati and Sakhigopal Icons
During his southern campaign, Purushottama Deva brought back prized stone icons from the south and installed them in Odisha as memorials of victory, including the famous **Kanchi Ganesha (Bhanda Ganesha / Uchchhishta Ganapati)** inside the western inner enclosure of **Puri Jagannatha Temple** and the **Sakshi Gopala** image (later enshrined at Satyabadi near Puri). He also completed major structural additions to the **Bhoga Mandapa** at Puri and patronized the **Sundara Madhava Temple** at Purushottampur (Ganjam).

### 7. Literary & Lexicographical Contributions
Purushottama Deva was a prolific Sanskrit author and lexicographer. Works attributed to his authorship or direct royal patronage include:
1. **Abhinava Gitagovinda** — A lyrical Sanskrit devotional poem modeled on Jayadeva's *Gitagovinda*.
2. **Nama-Malika** and **Trikanda-Sesha / Haravali** — Authoritative Sanskrit lexicons and Dharmashastra compendia.
3. **Mukti-Chintamani** and **Gajapathi-Karika** — Treatises on Puri temple rituals and Smriti jurisprudence.

### 8. Provincial Governance & Southern Odiyaraju / Vadderarajulu Garrisons
Under Purushottama Deva, the southern *Rajyas* of **Rajahmundry, Kondavidu, and Udayagiri** were reorganized under royal princes (*Kumara Mahapatras*) and hereditary **Odra-Kshatriya (Odiyaraju / Vadderarajulu)** fortress commanders (*Durgapatis*). Royal charters granted tax-free villages (*Agraharas*) and military estates along the coastal highway from Mahendragiri to Nellore.

### 9. Primary Epigraphic Corpus
- **Puri Jagannatha Temple Inscriptions (1467 & 1470 CE)**: Confirm his accession and rich donations of gold ornaments and villages to the deity.
- **Draksharama & Simhachalam Inscriptions (1476–1495 CE)**: Record continuous Gajapathi control over Kalinga and Vengi.
- **Potavaram Copper Plates (Saka 1411 / 1489 CE)**: Establish the southern extent of his reconquered empire.

### 10. Historical Timeline & Conclusion
- **1466/1467 CE**: Accession of Purushottama Deva following Kapilendra Deva's demise.
- **1472–1476 CE**: Reorganization of the imperial army and reconciliation with southern commanders.
- **1482–1484 CE**: Reconquest of Rajahmundry and Kondavidu from the Bahmani Sultanate.
- **1486–1489 CE**: Capture of Udayagiri Fort from Saluva Narasimha; issuance of the **Potavaram Copper-Plate Grant (1489 CE)**.
- **1497 CE**: Peaceful passing after a 31-year reign; succeeded by his son **Emperor Prataparudra Deva**.`
  },

  // 3. HF-0014: fig_prataparudra_deva
  {
    id: 'fig_prataparudra_deva',
    slug: 'emperor-prataparudra-deva-gajapathi-monograph-hf-0014',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('prataparudra_deva.jpg'),
    original_language: 'en',
    original_title:
      'HF-0014 | Emperor Prataparudra Deva Gajapathi (r. 1497–1540 CE): The Sarasvati Vilasa Legal Code, Vijayanagara Wars & The Panchasakha Spiritual Renaissance',
    summary:
      'Comprehensive 10-chapter historical monograph on Emperor Prataparudra Deva Gajapathi (Reference ID: HF-0014, Record ID: fig_prataparudra_deva), examining his 43-year reign, defense against Sultan Ala-ud-din Husain Shah of Bengal, the seven-year war and 1519 CE treaty with Sri Krishnadevaraya of Vijayanagara, the Sanskrit legal code Sarasvati Vilasa, and his patronage of Sri Chaitanya and the Panchasakha philosopher-poets.',
    tags: [
      'HF-0014',
      'Prataparudra Deva',
      'Sarasvati Vilasa',
      'Panchasakha Renaissance',
      'Treaty of 1519',
      'Simhachalam Inscription 1516',
      'Puri Jagannatha'
    ],
    sources: [
      {
        id: 'src_hf14_01',
        source_type: 'Primary Source',
        title: 'Sarasvati Vilasa (Vyavahara-Kanda) of Maharaja Prataparudra Deva Gajapathi',
        author_or_authority: 'Dr. R. Shama Sastri (ed.)',
        publication_or_location: 'Mysore: University of Mysore Oriental Library Publications',
        year_or_era: 'c. 1515 CE (pub. 1927)',
        citation_details: 'Authoritative Sanskrit digest of civil law, property inheritance, and royal jurisprudence',
        verified: true
      },
      {
        id: 'src_hf14_02',
        source_type: 'Inscription',
        title: 'Simhachalam Pillar Inscription (1516 CE) & Puri Jagannatha Temple Inscriptions of Prataparudra Deva',
        author_or_authority: 'South Indian Inscriptions (SII), Vol. VI, No. 694; Dr. K.B. Tripathi (1962)',
        publication_or_location: 'Madras / Bhubaneswar',
        year_or_era: '1499–1530 CE',
        citation_details: 'Records endowments at Simhachalam and the 1499 CE Puri edict mandating the singing of Gitagovinda',
        verified: true
      },
      {
        id: 'src_hf14_03',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Prof. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University Press',
        year_or_era: '1957',
        citation_details: 'Chapter V, pp. 103–142 (Reign of Prataparudra Deva, wars with Krishnadevaraya and Quli Qutb Shah)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Imperial Legacy (Reference ID: HF-0014)
**Emperor Prataparudra Deva Gajapathi** (r. 1497–1540 CE; Record ID: \`fig_prataparudra_deva\`, Reference ID: **HF-0014**), son and successor of Purushottama Deva, reigned for 43 years as the third great sovereign of the **Suryavamsha Gajapathi Empire**. Celebrated simultaneously as a valiant defender of Odra sovereignty on two fronts (Bengal in the north and Vijayanagara/Golconda in the south), as the royal jurist-author of the Sanskrit legal digest **Sarasvati Vilasa**, and as the patron of **Sri Chaitanya Mahaprabhu** and the **Panchasakha** philosopher-poets at Puri, his reign marks the intellectual and spiritual zenith of medieval Odisha.

### 2. Early Reign, Southern Expedition & Defense Against Bengal (1497–1510 CE)
Ascending the throne at **Abhinava Varanasi Kataka** in 1497 CE, Prataparudra Deva initially marched south to the **Pennar River** and **Rajahmundry–Kondavidu** provinces (1500–1509 CE) to consolidate his southern frontier. While he was campaigning in the south in **1509 CE**, **Sultan Ala-ud-din Husain Shah of Bengal** launched a sudden raid toward Jajpur and Puri. Prataparudra Deva marched rapidly northward, drove the Bengal Sultanate forces back across the Hooghly frontier, and besieged the fortress of **Mandaran**.

### 3. The Seven-Year War with Sri Krishnadevaraya of Vijayanagara (1512–1519 CE)
During Prataparudra Deva's northern campaign, the Vijayanagara Emperor **Sri Krishnadevaraya** launched his well-planned *Kalinga Digvijaya* against the southern Gajapathi fortresses:
- **Siege of Udayagiri (1513–1514 CE)**: Defended heroically for eighteen months by Prataparudra Deva's maternal uncle **Tirumala Rautaraya (Raghava Raya)** before falling after Vijayanagara sappers cut new rock paths across the eastern cliffs.
- **Siege of Kondavidu (1515 CE)**: Defended by **Prince Virabhadra Deva** (son of Prataparudra Deva) and senior *Mahapatras* including Kesava Patra and Rachuri Mallu Khan.
- **Siege of Kondapalli & Simhachalam Campaign (1516–1519 CE)**: Following fierce battles along the Krishna–Godavari corridor, both empires recognized the strategic stalemate and concluded the **Diplomatic Peace Treaty of 1519 CE**: Prataparudra Deva gave his daughter (known in Vijayanagara chronicles as **Jaganmohini / Tukka Devi**) in marriage to Krishnadevaraya, and Krishnadevaraya restored all conquered territories north of the **Krishna River** (including Rajahmundry and Kalinga) to the Gajapathi Empire.

### 4. Defense of the Godavari Frontier Against Quli Qutb Shah
In the 1520s and 1530s, Prataparudra Deva and his general **Rama Chandra Rautaraya** repeatedly defended the **Kondapalli–Rajahmundry–Eluru** frontier against incursions by **Sultan Quli Qutb-ul-Mulk** of Golconda, preserving coastal Andhra north of the Godavari within the Gajapathi realm until 1540 CE.

### 5. Jurisprudence & Statecraft: The "Sarasvati Vilasa"
Prataparudra Deva presided over an illustrious assembly of jurists and Sanskrit scholars at Cuttack, compiling the **Sarasvati Vilasa**—one of pre-modern India's most authoritative Sanskrit Dharmashastra and civil law codes (*Vyavahara-Kanda*). Bridging the *Mitakshara* and *Dayabhaga* legal traditions, the *Sarasvati Vilasa* regulated judicial procedure, royal taxation limits, agrarian land tenures, contract law, and women's property rights (*Stridhana*) across Odisha and Andhra.

### 6. The Panchasakha Literary Renaissance & Sri Chaitanya at Puri
Prataparudra Deva's reign witnessed the flowering of the **Panchasakha** ("Five Spiritual Comrades") school of Odia Vaishnava philosophy and vernacular literature:
1. **Balarama Dasa** — Author of the *Jagamohana Ramayana (Dandi Ramayana)* and *Lakshmi Purana* (an early milestone of social and caste equality).
2. **Jagannatha Dasa** — Author of the classical Odia *Bhagavata*, read in every *Bhagavata Tungi* village hall across Odisha.
3. **Achyutananda Dasa** — Author of the *Harivamsa* and *Sunya Samhita*.
4. **Yasovanta Dasa** and **Ananta Dasa**.
When **Sri Chaitanya Mahaprabhu** arrived in Puri in **1510 CE** and resided there until 1533 CE, Prataparudra Deva accorded him royal veneration along with scholar-governor **Raya Ramananda (Ramananda Pattanayak)** of Rajahmundry.

### 7. Temple Administration & The 1499 CE Puri Gitagovinda Edict
In **July 1499 CE (4th Anka)**, Prataparudra Deva had an official royal edict engraved in the Odia language and script on the **Jaya-Vijaya doorway of the Sri Jagannatha Temple at Puri**, mandating that only Jayadeva's *Gitagovinda* (and Purushottama Deva's *Abhinava Gitagovinda*) should be sung before Lord Jagannatha during the evening *Badasinghara Dhupa* ritual. He also constructed the **Audience Hall (Muktimandapa)** at Puri.

### 8. Primary Epigraphic Evidence
- **Puri Jagannatha Jaya-Vijaya Inscription (1499 CE)**: Primary Odia royal edict regulating temple music and ritual service.
- **Iditala, Velicherla & Undavalli Grants (1500–1510 CE)**: Confirm Prataparudra Deva's southern administration down to Nellore and Guntur.
- **Simhachalam Mukhamandapa Pillar Inscription (Saka 1438 / 1516 CE)**: Records royal endowments at Varaha Lakshmi Narasimha Temple.

### 9. Historiographical Assessment: Military Impact of Vaishnava Devotion
- **Older Colonial & Early Nationalist View (R.D. Banerji, 1930)**: Suggested that Prataparudra Deva's intense devotion to Sri Chaitanya weakened Odisha's martial vigor.
- **Modern Epigraphic Re-Evaluation (P. Mukherjee, 1953; H. Kulke, 1993)**: Demonstrates that Prataparudra Deva actively led armies in the field until the 1530s, successfully retained the entire empire from the Hooghly to the Godavari/Krishna, and that the later political crisis of 1540–1541 CE resulted from the ministerial treachery of **Govinda Vidyadhara** after the Emperor's death rather than religious pacifism.

### 10. Historical Timeline & Conclusion
- **1497 CE**: Coronation of Emperor Prataparudra Deva at Cuttack.
- **1499 CE**: Puri Jagannatha Jaya-Vijaya doorway edict on the *Gitagovinda*.
- **1509 CE**: Repulse of Bengal Sultan Ala-ud-din Husain Shah and siege of Mandaran.
- **1510 CE**: Arrival of Sri Chaitanya Mahaprabhu at Srikshetra Puri.
- **1513–1519 CE**: Seven-year war with Sri Krishnadevaraya; **Peace Treaty of 1519 CE** establishing the Krishna River boundary.
- **c. 1515–1520 CE**: Codification of the Sanskrit legal digest **Sarasvati Vilasa**.
- **1540 CE**: Demise of Emperor Prataparudra Deva after a 43-year reign.`
  },

  // 4. HF-0012: fig_hamvira_deva
  {
    id: 'fig_hamvira_deva',
    slug: 'kumara-hamvira-deva-gajapathi-monograph-hf-0012',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
    original_language: 'en',
    original_title:
      'HF-0012 | Kumara Hamvira Deva Gajapathi (c. 1450–1476 CE): Supreme Commander of the Dakshina Digvijaya from Orugallu to the Kaveri Basin',
    summary:
      'Complete 10-chapter historical monograph on Prince Kumara Hamvira Deva Gajapathi (Reference ID: HF-0012, Record ID: fig_hamvira_deva), eldest son of Samrat Kapilendra Deva and Commander-in-Chief of the southern Gajapathi campaigns who captured Kondavidu (1454 CE), liberated Orugallu/Warangal Fort (1458 CE), conquered Udayagiri and Kanchipuram, and inscribed his victory donation at Srirangam Temple on the Kaveri River (1464 CE).',
    tags: [
      'HF-0012',
      'Kumara Hamvira Deva',
      'Dakshina Digvijaya',
      'Warangal Fort 1458',
      'Srirangam Inscription 1464',
      'Kondavidu Viceroy',
      'Odiyaraju Garrisons'
    ],
    sources: [
      {
        id: 'src_hf12_01',
        source_type: 'Inscription',
        title: 'Warangal Fort Southern Gate Sanskrit Inscription of Kumara Hamvira Deva (Saka 1379 / Feb 1458 CE)',
        author_or_authority: 'Epigraphia Andhrica / Corpus of Telingana Inscriptions',
        publication_or_location: 'Hyderabad: Department of Archaeology',
        year_or_era: '1458 CE',
        citation_details: 'Records the capture of Orugallu (Warangal) Fort by Kumara Hamvira Deva, son of Kapilendra Maharaya',
        verified: true
      },
      {
        id: 'src_hf12_02',
        source_type: 'Inscription',
        title: 'Srirangam Ranganathaswamy Temple Inscription of Kumara Hamvira Deva Mahapatra (Saka 1386 / 1464 CE)',
        author_or_authority: 'Annual Report on Indian Epigraphy (ARIE) 1937–38, No. 312 / SII Vol. XXIV',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1464 CE',
        citation_details: 'Records the royal gift of cows (*Go-Sahasra*) and gold at Srirangam on the Kaveri River',
        verified: true
      },
      {
        id: 'src_hf12_03',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Prof. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University Press',
        year_or_era: '1957',
        citation_details: 'pp. 44–78 (Southern campaigns and viceroyalty of Kumara Hamvira Deva)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Martial Stature (Reference ID: HF-0012)
**Kumara Hamvira Deva Gajapathi** (c. 1425–1485 CE; active as Southern Viceroy c. 1450–1476 CE; Record ID: \`fig_hamvira_deva\`, Reference ID: **HF-0012**) was the eldest son of **Samrat Kapilendra Deva** and the supreme military architect of the **Gajapathi Dakshina Digvijaya** (Southern Imperial Conquest). Known in contemporary Sanskrit, Telugu, and Tamil inscriptions as **Kumara Hamvira Deva Mahapatra** (*Ambiradeva*), he led the Suryavamsha Gajapathi legions over 1,200 kilometers southward from the Godavari River across Telangana, Rayalaseema, and Tondaimandalam to the banks of the **Kaveri River at Srirangam and Tiruchirappalli**.

### 2. Conquest of Rajahmundry & Kondavidu (1448–1454 CE)
Appointed by his father Kapilendra Deva to lead the southern vanguard, Prince Hamvira Deva crossed the Godavari River, consolidated **Rajahmundry**, and by **1454 CE** captured the strategic hilltop fortress of **Kondavidu** (in modern Palnadu/Guntur district), ending the Reddi principality and defeating the local Vijayanagara garrisons. Kondavidu was established as the grand southern military headquarters (*Dakshina Dandapata*) under Hamvira Deva's command, supported by royal kinsman **Ganadeva Rautaraya**.

### 3. Victory at Devarakonda & Liberation of Orugallu / Warangal Fort (February 1458 CE)
In **1457–1458 CE**, when Bahmani Sultan Humayun Shah's generals Khwaja-i-Jahan Turk and Nizam-ul-Mulk besieged the Velama fortress of **Devarakonda** in Telangana, Hamvira Deva marched into the Telangana plateau at the head of the Gajapathi elephant and infantry corps. He crushed the Bahmani army beneath the walls of Devarakonda and marched straight upon the ancient Kakatiya imperial capital of **Orugallu (Warangal Fort)**, capturing it on **2 February 1458 CE (Saka 1379, Bahudhanya)**. His triumphant Sanskrit victory inscription remains carved upon the southern stone gateway of **Warangal Fort**, proclaiming:
> *"Kumara Hamviradeva, the heroic son of Gajapati Kapilesvara Maharaya, captured the citadel of Orugallu..."*

### 4. Conquest of Udayagiri & Chandragiri (1460–1463 CE)
Pressing southward against the weakened Vijayanagara Empire under Mallikarjuna Raya, Hamvira Deva captured the eastern ghats mountain bastions of **Addanki, Vinukonda, Bellamkonda, Udayagiri** (Nellore district), and **Chandragiri** (Tirupati district), appointing his own son **Dakshina Kapilesvara Kumara Mahapatra** as Viceroy (*Pariksha*) of the newly conquered Tamil and southern Andhra districts.

### 5. The Kaveri Campaign & The Srirangam Inscription (1464 CE)
In **1463–1464 CE**, Kumara Hamvira Deva and his son Dakshina Kapilesvara led the Gajapathi expeditionary force across the Palar, Pennaiyar, and Kaveri rivers, capturing **Kanchipuram, Padaividu, Tiruvannamalai, Tirukkoyilur, and Tiruchirappalli**. At the sacred island shrine of **Sri Ranganathaswamy Temple in Srirangam (Saka 1386 / 1464 CE)**, Hamvira Deva performed the royal **Go-Sahasra** (gift of a thousand cows) ceremony and endowed gold for temple rituals—marking the southernmost epigraphic boundary ever reached by an Odishan imperial army.

### 6. Garrisoning the Southern Forts & Odiyaraju / Vadderarajulu Heritage
To hold this vast chain of over 60 southern hill and water forts—stretching from **Rajahmundry, Kolletikota, Kondapalli, and Kondavidu** to **Udayagiri, Penukonda, and Chandragiri**—Hamvira Deva stationed permanent regiments of **Odra-Kshatriya warriors, Nayakas, and military-engineering corps**. In Andhra, Telangana, Karnataka, and Tamil Nadu, the descendants of these Gajapathi commanders and fort-builders preserved their ancestral identity as **GajapathiRajulu (CH-0005), Odiyaraju (CH-0048), Vadderarajulu (CH-0013), and Odda-Nayakkar (CH-0038)**.

### 7. The Succession Contest (1466–1472 CE) & Later Years
When Emperor Kapilendra Deva passed away on the banks of the Krishna River in 1466 CE after nominating his younger son **Purushottama Deva** as emperor at Cuttack, Hamvira Deva briefly contested the throne from Kondavidu before reconciling with Purushottama Deva to preserve the dynasty against external incursions.

### 8. Primary Epigraphic Corpus
1. **Warangal Fort Southern Gateway Inscription (Feb 1458 CE / Saka 1379)**: Primary stone record of the liberation of Orugallu.
2. **Srirangam Temple Stone Inscription (1464 CE / Saka 1386)**: Primary record of Hamvira Deva's Kaveri campaign (*ARIE 1937–38, No. 312*).
3. **Munnur & Jambai Tamil Inscriptions (1464 CE)**: Corroborate the governance of Hamvira Deva's son **Dakshina Kapilesvara Kumara Mahapatra** over Kondavidu, Udayagiri, Chandragiri, and Tiruchirappalli.

### 9. Historiographical Significance
Modern historians (**Prof. R. Subrahmanyam, Dr. N. Venkataramanayya, and Dr. D.C. Sircar**) recognize Kumara Hamvira Deva as one of medieval India's greatest field commanders, whose decade-long campaign (1454–1464 CE) unified the eastern seaboard from the Mahanadi to the Kaveri and reshaped the military balance of the Deccan.

### 10. Historical Timeline & Conclusion
- **1448–1454 CE**: Commands the Gajapathi conquest of Rajahmundry and Kondavidu Fort.
- **1458 CE (Feb)**: Defeats the Bahmani army at Devarakonda and captures **Orugallu (Warangal) Fort**.
- **1460–1463 CE**: Captures Udayagiri and Chandragiri fortresses.
- **1464 CE**: Reaches the Kaveri River and inscribes the **Srirangam Temple grant**; appoints Dakshina Kapilesvara over the Tamil provinces.`
  },

  // 5. HF-0017: fig_mukunda_deva
  {
    id: 'fig_mukunda_deva',
    slug: 'maharaja-mukunda-deva-harichandana-monograph-hf-0017',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('mukunda_deva_barabati.jpg'),
    original_language: 'en',
    original_title:
      'HF-0017 | Maharaja Mukunda Deva Harichandana (r. 1559–1568 CE): Last Independent Sovereign of Medieval Odisha, Alliance with Akbar & Triveni Ghat',
    summary:
      'Complete 10-chapter historical monograph on Maharaja Mukunda Deva Harichandana (Reference ID: HF-0017, Record ID: fig_mukunda_deva), the Chalukya-Gajapathi sovereign who ruled from Barabati Fort (1559–1568 CE), forged a diplomatic alliance with Mughal Emperor Akbar, defeated the Bengal Sultanate to build the Triveni Ghat on the Hooghly River, and fell defending Odisha’s independence in 1568 CE.',
    tags: [
      'HF-0017',
      'Mukunda Deva Harichandana',
      'Chalukya-Gajapathi',
      'Barabati Nine-Storeyed Palace',
      'Triveni Ghat',
      'Draksharama Inscription',
      'Gohiratikiri 1568'
    ],
    sources: [
      {
        id: 'src_hf17_01',
        source_type: 'Inscription',
        title: 'Draksharama Bhimesvara Temple Inscription of Maharaja Mukunda Deva',
        author_or_authority: 'South Indian Inscriptions (SII), Vol. IV',
        publication_or_location: 'Madras: Archaeological Survey of India',
        year_or_era: 'c. 1560–1565 CE',
        citation_details: 'Records Mukunda Deva’s military campaign to the Godavari River and performance of the Tulapurusha-Dana',
        verified: true
      },
      {
        id: 'src_hf17_02',
        source_type: 'Primary Source',
        title: 'Akbarnama & Ain-i-Akbari of Abul Fazl Allami',
        author_or_authority: 'Abul Fazl (trans. H. Beveridge & H.S. Jarrett)',
        publication_or_location: 'Calcutta: Asiatic Society of Bengal',
        year_or_era: 'c. 1595 CE',
        citation_details: 'Vol. II: Describes Emperor Akbar’s embassy to Mukunda Deva and the nine-storeyed palace of Barabati Fort',
        verified: true
      },
      {
        id: 'src_hf17_03',
        source_type: 'Scholarly Book',
        title: 'The History of the Gajapati Kings of Orissa and Their Successors',
        author_or_authority: 'Prof. Prabhat Mukherjee',
        publication_or_location: 'Cuttack: Kitab Mahal',
        year_or_era: '1953',
        citation_details: 'Chapter VII (Reign of Mukunda Deva and the fall of medieval Odisha in 1568 CE)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Historical Significance (Reference ID: HF-0017)
**Maharaja Mukunda Deva Harichandana** (r. 1559–1568 CE; Record ID: \`fig_mukunda_deva\`, Reference ID: **HF-0017**), known in historical chronicles as **Telenga Mukunda Deva**, was the last independent Hindu sovereign emperor of medieval Odisha. Rising from the **Eastern Chalukya (Suryavamsha-aligned)** princely house of Kalinga-Vengi to the command of **Barabati Fort (Cuttack)**, he restored imperial order in 1559 CE, extended Odisha's frontiers once more from the **Godavari River (Draksharama)** to the **Bhagirathi-Hooghly (Triveni Ghat)**, and entered into formal diplomatic alliance with the Mughal Emperor **Jalal-ud-din Muhammad Akbar** before his heroic death at **Gohiratikiri in 1568 CE**.

### 2. Lineage, Rise to Power & Coronation at Kataka (1559 CE)
Born into the **Chalukya Harichandana** lineage (son of Sarvaraju and grandson of Singaraju), Mukunda Deva distinguished himself as the brilliant military commander of **Cuttack (Barabati Fort)** during the reign of Chakra Pratap of the Bhoi dynasty. When the parricide Narasimha Jena and Raghurama Chhotaray plunged the kingdom into anarchy with Afghan interference from Bengal, Mukunda Deva eliminated the usurpers and was crowned **Gajapathi Emperor of Odisha** at **Abhinava Varanasi Kataka in 1559 CE**.

### 3. Southern Campaign to the Godavari & The Draksharama Inscription
Immediately consolidating the southern provinces, Mukunda Deva marched across Kalinga to the banks of the **Godavari River**, expelling Golconda detachments from the Rajahmundry frontier. At the sacred Pancharama shrine of **Sri Bhimesvara Swamy in Draksharama** (East Godavari district), his stone inscription records that he performed the royal **Tulapurusha-Dana** (weighing himself against gold and pearls for charity), remitted taxes on marriage ceremonies, and endowed villages for temple worship.

### 4. Northern Campaign to the Hooghly & Construction of Triveni Ghat (1560–1565 CE)
Giving shelter to **Ibrahim Khan Sur** (rival of the Afghan Sultan of Bengal, Ghiyas-ud-din Bahadur Shah and later Sulaiman Khan Karrani), Mukunda Deva marched northward into Bengal, defeated the Bengal Sultanate forces near **Satgaon (Saptagram)**, and encamped on the banks of the **Bhagirathi-Hooghly River at Triveni** (Hooghly district, West Bengal). There he constructed the monumental stone stepped bathing ghat—still revered today throughout Bengal as **Raja Mukunda Deva's Ghat at Triveni**.

### 5. Diplomatic Alliance with Mughal Emperor Akbar (1565–1566 CE)
Recognizing the common strategic threat posed by **Sulaiman Khan Karrani** of Bengal, **Mughal Emperor Akbar** dispatched two imperial envoys—**Hasan Khan Khazanchi** and **Bhatta Mahapatra** (an Odishan court musician at Agra)—to Cuttack in **1565 CE**. Mukunda Deva concluded a formal treaty of alliance with Akbar and sent his own ambassador **Parमानanda Ray** with royal war elephants and gifts to the Mughal court at Agra.

### 6. The Nine-Storeyed Palace of Barabati Fort & Patronage at Puri
As recorded by **Abul Fazl** in the *Ain-i-Akbari*, Mukunda Deva constructed a magnificent **nine-storeyed royal palace** inside **Barabati Fort at Cuttack**, where each tier served a distinct administrative, military, residential, and astronomical function. At **Puri**, he endowed numerous *Brahmana Sasana* villages (including **Mukundapur Sasana**), built pilgrim rest-houses, and patronized the visiting Venetian traveler **Caesar Frederick**, who praised the justice and prosperity of Cuttack.

### 7. The Invasion of 1567–1568 CE & Battle of Gohiratikiri
In **late 1567 CE**, while Emperor Akbar was tied down besieging **Chittorgarh Fort** in Mewar, Sulaiman Karrani of Bengal seized the opportunity to invade Odisha with a massive army led by his son **Bayazid** and general **Kalapahad**. Besieged at **Kotsimul** on the northern frontier, Mukunda Deva was forced to rush back into central Odisha when his own treacherous feudatory **Ramachandra Bhanja** (commandant of Sarangagarh) rose in rebellion. At the **Battle of Gohiratikiri** (near Jajpur/Bhadrak) in **1568 CE**, Maharaja Mukunda Deva fell fighting heroically—marking the end of Odisha's ancient independent imperial sovereignty.

### 8. Post-1568 Continuation: The Khurda Gajapathi Line
Following the fall of Cuttack in 1568 CE, **Ramai Routray (Ramachandra Deva I)**—son of the former Bhoi minister Danai Vidyadhara—established the **Khurda Kingdom** around **Barunei Hill**, re-consecrated the sacred **Daru-Brahma** images of **Lord Jagannatha at Puri (c. 1575 CE)**, and received recognition from Emperor Akbar's general Raja Man Singh in **1592 CE** as the hereditary **Gajapathi of Khurda and Superintendent of Sri Jagannatha Temple**—a sacred royal institution that endures in the **Puri Gajapathi Maharaja** to the present day.

### 9. Primary Sources & Archaeological Evidence
- **Draksharama Stone Inscription**: Contemporary epigraphic proof of Mukunda Deva's Godavari victory and *Tulapurusha-Dana*.
- **Triveni Ghat (Hooghly) & Barabati Palace Foundations (ASI Excavations)**: Physical archaeological monuments of his reign.
- **Akbarnama, Ain-i-Akbari & Account of Caesar Frederick (1567 CE)**: Independent Persian and European eyewitness accounts.

### 10. Historical Timeline & Conclusion
- **1559 CE**: Coronation of Maharaja Mukunda Deva Harichandana at Barabati Fort, Cuttack.
- **1560–1562 CE**: Reconquest of the Godavari frontier and **Draksharama Inscription**.
- **1563–1565 CE**: Victory at Satgaon and construction of **Triveni Ghat** on the Hooghly River.
- **1565–1566 CE**: Exchange of imperial embassies and alliance with **Mughal Emperor Akbar**.
- **1568 CE**: Heroic last stand and martyrdom at the **Battle of Gohiratikiri**.`
  },

  // 6. HF-0009: fig_anantavarman_chodaganga
  {
    id: 'fig_anantavarman_chodaganga',
    slug: 'emperor-anantavarman-chodaganga-deva-monograph-hf-0009',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('puri_jagannatha_temple.jpg'),
    original_language: 'en',
    original_title:
      'HF-0009 | Emperor Anantavarman Chodaganga Deva (r. 1077–1147 CE): Unifier of Kalinga, Utkala & Odra Desha and Builder of Sri Jagannatha Temple, Puri',
    summary:
      'Comprehensive 10-chapter historical monograph on Emperor Anantavarman Chodaganga Deva (Reference ID: HF-0009, Record ID: fig_anantavarman_chodaganga), documenting his 70-year imperial reign, unification of Kalinga, Utkala, and Odra Desha from the Ganga to the Godavari, the Korni Copper-Plate Grants (1081 & 1112 CE), and the construction of the monumental 214-foot Sri Jagannatha Temple at Puri.',
    tags: [
      'HF-0009',
      'Anantavarman Chodaganga Deva',
      'Eastern Ganga Dynasty',
      'Puri Jagannatha Temple',
      'Korni Copper Plates',
      'Trikalingadhipati',
      'Chodaganga Sahi'
    ],
    sources: [
      {
        id: 'src_hf09_01',
        source_type: 'Inscription',
        title: 'Korni Copper-Plate Grants of Anantavarman Chodaganga Deva (1081 CE & 1112 CE)',
        author_or_authority: 'G.V. Ramamurti, Journal of the Andhra Historical Research Society (JAHRS), Vol. I',
        publication_or_location: 'Rajahmundry: Andhra Historical Research Society',
        year_or_era: '1081 & 1112 CE (pub. 1926)',
        citation_details: 'Primary copper-plate records documenting the unification of Kalinga and Utkala',
        verified: true
      },
      {
        id: 'src_hf09_02',
        source_type: 'Inscription',
        title: 'Dasgoba Copper-Plate Grant of Rajaraja III (1198 CE)',
        author_or_authority: 'Dr. D.C. Sircar (ed.), Epigraphia Indica, Vol. XXXI',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1198 CE',
        citation_details: 'Verse 27: Explicitly credits Chodaganga Deva with building the monumental temple of Lord Purushottama-Jagannatha on the sea-shore at Puri',
        verified: true
      },
      {
        id: 'src_hf09_03',
        source_type: 'Scholarly Book',
        title: 'History of Orissa, Vol. I',
        author_or_authority: 'Prof. R.D. Banerji',
        publication_or_location: 'Calcutta: R. Chatterjee',
        year_or_era: '1930',
        citation_details: 'Chapter XV (The Imperial Gangas: Reign of Anantavarman Chodaganga Deva)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Imperial Reign (Reference ID: HF-0009)
**Emperor Anantavarman Chodaganga Deva** (r. 1077–1147 CE; Record ID: \`fig_anantavarman_chodaganga\`, Reference ID: **HF-0009**) reigned for an extraordinary **seventy years** as the founder of the **Imperial Eastern Ganga (Chodaganga) Empire**. Crowned at **Kalinganagara** (modern Mukhalingam on the Vamsadhara River in Srikakulam district) on **17 February 1078 CE**, he conquered the Somavamsi kingdom of **Utkala and Odra Desha** (c. 1110–1112 CE), extended his frontiers from the **Bhagirathi-Ganga (Hooghly)** in the north to the **Godavari River (Draksharama)** in the south, and commissioned the monumental **Sri Jagannatha Temple at Puri**.

### 2. Dynastic Lineage: Eastern Ganga & Imperial Chola Synthesis
Anantavarman Chodaganga Deva was the son of Eastern Ganga monarch **Rajaraja I Devendravarman** (r. 1070–1077 CE) and the Chola princess **Rajasundari**, daughter of the Imperial Chola Emperor **Virarajendra Chola** (and sister/cousin of Kulottunga Chola I). His very name—**Choda-Ganga**—immortalized the dynastic synthesis of the **Eastern Gangas of Kalinga** (worshippers of Lord Gokarnesvara on Mount Mahendragiri) and the **Suryavamsha Imperial Cholas**.

### 3. Early Chola-Ganga Wars & Consolidation of Kalinga (1077–1110 CE)
Ascending the throne as a child in 1077/1078 CE, Chodaganga Deva faced two major invasions of Kalinga by his maternal uncle's generals under **Kulottunga Chola I** (celebrated in the Tamil war-poem *Kalingattupparani* of Jayamkondar). Resiliently defending and recovering southern and northern Kalinga, Chodaganga Deva reorganized the Kalinga elephant and infantry forces and pushed his southern boundary back to **Simhachalam, Visakhapatnam, and Draksharama** (where his queens inscribed numerous votive records in 1128 CE).

### 4. Unification of Utkala, Odra Desha & Kalinga (1110–1112 CE)
Around **1110–1112 CE**, Chodaganga Deva marched northward into central Odisha, defeated the last Somavamsi ruler **Karnadeva**, and annexed **Utkala and Odra Desha** (the Mahanadi–Brahmani–Baitarani delta). As attested in the **second Korni Copper-Plate Grant (1112 CE)** and the **Vizagapatam Grants (1118 & 1135 CE)**, this historic conquest permanently united **Kalinga, Utkala, Kongoda, and Odra Desha** into a single sovereign state, transferring the imperial gravity northward to the Mahanadi delta (*Kataka / Cuttack*).

### 5. Expansion to the Bhagirathi-Ganga & Assumption of "Gajapathi" / "Navanavati-Sahasra-Kunjaradhisvara"
Advancing north of the Subarnarekha River, Chodaganga Deva defeated the ruler of **Mandaran (Arambagh, Hooghly)** and carried his arms to the banks of the **Bhagirathi-Ganga**, assuming the imperial titles **Trikalingadhipati**, **Sakalotkala-Samrajya-Chudamani**, and **Navanavati-Sahasra-Kunjaradhisvara** ("Lord of Ninety-Nine Thousand War Elephants")—the direct institutional precursor to the title **Gajapathi**.

### 6. Construction of the Monumental Sri Jagannatha Temple at Puri (c. 1135–1147 CE)
As explicitly recorded in Verse 27 of the **Dasgoba Copper-Plate Grant (1198 CE)** and the **Nagari Plates (1230 CE)**:
> *"What king before him was able to build a worthy palace for Lord Purushottama on the shore of the ocean? It was Gangesvara (Chodaganga) who erected that sky-touching temple of Sri Purushottama-Jagannatha and Goddess Lakshmi."*
Rising **214 feet 8 inches** above the Nilachala hill at **Srikshetra Puri**, the *Rekha Deula* (Vimana) and *Jagamohana* commissioned by Chodaganga Deva became the eternal spiritual heart of Odisha and the state sanctuary of the Ganga and Suryavamsha Gajapathi empires.

### 7. Fortifications & Hydraulic Reservoirs (Chodaganga Sagar)
To defend his newly unified empire, Chodaganga Deva constructed a strategic chain of stone and laterite forts (**Chudanga Gada / Sarangagarh** near Cuttack/Bhubaneswar, Jajpur, and Amaravati Kataka) and excavated massive irrigation reservoirs known as **Gangesvara Sagara / Chodaganga Talav** across Kalinga and Utkala.

### 8. Religious Synthesis: Paramamahesvara & Paramavaishnava
In his early copper plates (1081 CE), Chodaganga Deva styled himself **Paramamahesvara** (devotee of Lord Siva Gokarnesvara at Mukhalingam/Mahendragiri); in his later charters (1118 CE onward), after visiting Puri and corresponding with the Vaishnava philosopher **acharya Ramanuja**, he styled himself both **Paramamahesvara and Paramavaishnava**, institutionalizing the harmonious Shaiva-Vaishnava-Shakta synthesis of the **Jagannatha Triad**.

### 9. Primary Epigraphic Corpus
- **Korni Copper Plates (1081 CE & 1112 CE)** and **Vizagapatam Copper Plates (1081, 1118 & 1135 CE)**.
- **Mukhalingam, Srikurmam, Simhachalam, Draksharama (1128 CE), Lingaraja & Puri Nrusingha Temple Stone Inscriptions** (over 100 surviving stone epigraphs).

### 10. Historical Timeline & Conclusion
- **1078 CE (17 Feb)**: Coronation at Kalinganagara (Mukhalingam).
- **1110–1112 CE**: Conquest of Utkala and Odra Desha; unification of the Mahanadi and Vamsadhara-Godavari basins.
- **1128 CE**: Royal visit and queenly endowments at **Draksharama Bhimesvara Temple** on the Godavari.
- **c. 1135 CE**: Transfer of imperial headquarters to the Mahanadi delta (*Kataka*) and commencement of the monumental **Sri Jagannatha Temple at Puri**.
- **1147 CE**: Passing of Emperor Anantavarman Chodaganga Deva after a 70-year reign.`
  },

  // 7. HF-0010: fig_langula_narasimha
  {
    id: 'fig_langula_narasimha',
    slug: 'emperor-langula-narasimhadeva-i-monograph-hf-0010',
    category: 'Royal Dynasties',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('konark_sun_temple_structure.jpg'),
    original_language: 'en',
    original_title:
      'HF-0010 | Emperor Langula Narasimhadeva I (r. 1238–1264 CE): Conqueror of Lakhnauti, Architect of the Konark Sun Temple & First Epigraphic "Gajapathi"',
    summary:
      'Complete 10-chapter historical monograph on Eastern Ganga Emperor Langula Narasimhadeva I (Reference ID: HF-0010, Record ID: fig_langula_narasimha), documenting his offensive victories at Katasin and Lakhnauti in Bengal (1243–1245 CE), the first epigraphic assumption of the sovereign title "Gajapathi" in the 1246 CE Kapilas Inscription, and the construction of the UNESCO World Heritage Sun Temple at Konark.',
    tags: [
      'HF-0010',
      'Langula Narasimhadeva I',
      'Konark Sun Temple',
      'Kapilas Inscription 1246',
      'First Epigraphic Gajapathi',
      'Raibania Fort',
      'Baya Chakada'
    ],
    sources: [
      {
        id: 'src_hf10_01',
        source_type: 'Inscription',
        title: 'Kapilas Temple Stone Inscription of Narasimhadeva I (1246 CE)',
        author_or_authority: 'Dr. D.C. Sircar / Epigraphia Indica',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1246 CE',
        citation_details: 'Earliest verified epigraphic occurrence of the royal title "Gajapati" borne by an Odishan monarch',
        verified: true
      },
      {
        id: 'src_hf10_02',
        source_type: 'Inscription',
        title: 'Kendupatna Copper-Plate Grant of Narasimhadeva II (Saka 1217 / 1295 CE)',
        author_or_authority: 'N.N. Vasu & D.C. Sircar, Epigraphia Indica, Vol. XXVIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1295 CE',
        citation_details: 'Verses 75–86: Vividly describes Narasimhadeva I’s routing of the Bengal Sultanate forces on the Ganga and his construction of the Sun Temple at Konark',
        verified: true
      },
      {
        id: 'src_hf10_03',
        source_type: 'Primary Source',
        title: 'Tabaqat-i-Nasiri of Minhaj-i-Siraj Juzjani',
        author_or_authority: 'Minhaj-i-Siraj (trans. Major H.G. Raverty)',
        publication_or_location: 'London: Bibliotheca Indica',
        year_or_era: '1260 CE (trans. 1881)',
        citation_details: 'pp. 738–763; Contemporary Persian chronicle confirming the Rai of Jajnagar’s (Narasimhadeva I) victories at Katasin (1243) and siege of Lakhnauti (1244)',
        verified: true
      },
      {
        id: 'src_hf10_04',
        source_type: 'Archaeological Record',
        title: 'Konark (ASI Memoir) & UNESCO World Heritage Dossier No. 246',
        author_or_authority: 'Dr. Debala Mitra (Archaeological Survey of India)',
        publication_or_location: 'New Delhi: ASI',
        year_or_era: '1968 / 1984',
        citation_details: 'Comprehensive architectural and archaeological survey of the Sun Temple of Konark',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Sovereign Profile (Reference ID: HF-0010)
**Emperor Langula Narasimhadeva I** (r. 1238–1264 CE; Record ID: \`fig_langula_narasimha\`, Reference ID: **HF-0010**), son of **Anangabhima Deva III** and Queen Kasturidevi, stands as one of the most dynamic warrior-monarchs and temple builders in world history. Rather than waiting passively for invasions from the Delhi-Bengal Sultanates, Narasimhadeva I launched a bold **offensive strategy** into Bengal (1243–1245 CE), became the **first Odishan emperor to bear the epigraphic title "Gajapathi"** (attested in the **1246 CE Kapilas Inscription**), and immortalized his solar triumph by commissioning the **UNESCO World Heritage Sun Temple (Padmakeshara Deula) at Konark**.

### 2. Offensive Campaigns into Bengal: Katasin, Lakhnauti & Radha (1243–1245 CE)
Corroborated independently by both the Sanskrit **Kendupatna Copper Plates (1295 CE)** and the contemporary Persian chronicler **Minhaj-i-Siraj** in his *Tabaqat-i-Nasiri* (1260 CE):
- **Battle of Katasin (1243 CE)**: Narasimhadeva I (*Rai of Jajnagar*) and his brother-in-law, the Kalachuri-Haihaya prince **Paramardideva**, ambushed and routed the army of **Malik Izz-ud-din Tughril Tughan Khan**, Governor of Bengal.
- **Siege of Lakhnauti (March 1244 CE)**: Crossing the Bhagirathi-Ganga, Narasimhadeva I annexed the **Radha (Burdwan, Birbhum, Hooghly, Midnapore)** provinces, killed the frontier governor Karim-ud-din Laghri at **Lakhnor**, and laid siege to the Bengal capital of **Lakhnauti (Gaur)** itself.
- As the **Kendupatna Plates (Verse 84)** poetically record, the white river Ganga was blackened by the collyrium washed from the weeping eyes of the widows of the defeated Sultanate cavalry (*Yavana-sundari*).

### 3. First Epigraphic Assumption of the Title "Gajapathi" (1246 CE)
In the **Kapilas Siva Temple Stone Inscription (1246 CE)** in Dhenkanal district, Narasimhadeva I is formally styled **Sri Gajapati Narasimhadeva**—the earliest dated stone epigraph in Indian history where the sovereign of Odisha bears the imperial title **Gajapathi** ("Lord of the War Elephant Corps"), reflecting his command over a colossal standing army of armored war elephants (*Gajasena*).

### 4. Southern Frontier Campaigns Against Kakatiya Ganapatideva
On his southern frontier along the Godavari River, Narasimhadeva I engaged the forces of the Kakatiya Emperor **Ganapatideva**, maintaining Eastern Ganga control over **Kalinga, Simhachalam, and Srikurmam**, where his general **Sridhara** and his queens inscribed major Sanskrit and Telugu endowments.

### 5. Construction of the Sun Temple at Konark (Arka-Kshetra, c. 1238–1258 CE)
To celebrate his military triumphs and fulfill solar dynastic devotion to **Surya Narayana**, Narasimhadeva I commissioned the monumental **Sun Temple at Konark** (*Kona-Arka*) on the Chandrabhaga coast:
- Designed as a colossal **cosmic stone chariot of the Sun God** drawn by **seven galloping stone horses** and resting upon **twenty-four intricately carved 9-foot-8-inch stone sundial wheels**.
- Directed by chief minister **Sivai Samantaraya Mahapatra** and master architect **Sadasiva Samantaraya Mahapatra** controlling **1,200 master Shilpis and Pathuria stone-masons** over twelve years (*Baya Chakada* palm-leaf chronicle).
- The original *Rekha Vimana* soared to approximately **225 feet**—the tallest stone temple spire ever erected in medieval India.

### 6. Expansion of Simhachalam Temple & Raibania Fortress Complex
Beyond Konark, Narasimhadeva I commissioned his general **Akhtayi Senapati** to rebuild the sanctum, *Mukhamandapa*, and *Natamandira* of the **Sri Varaha Lakshmi Narasimha Temple at Simhachalam** (Visakhapatnam) in ornate Kalinga stone chariot architecture. On the northern frontier in Balasore district (bordering Bengal), he constructed the immense **Raibania Fort Complex**—a cluster of four massive laterite forts encircled by deep moats and 160+ water tanks.

### 7. Patronage of Sanskrit Literature: Vidyadhara's "Ekavali"
Narasimhadeva I's court was adorned by the celebrated Sanskrit rhetorician **Kavi Vidyadhara**, who composed the classical treatise on poetics **Ekavali**, in which every illustrative verse eulogizes the military valor, elephant corps, and munificence of Emperor Narasimhadeva I.

### 8. Primary Epigraphic & Historical Sources
1. **Kapilas Temple Inscription (1246 CE)**: First epigraphic record of the title *Gajapati*.
2. **Srikurmam, Simhachalam & Bhubaneswar Lingaraja Inscriptions (1240–1263 CE)**.
3. **Kendupatna Copper Plates (1295 CE)** and **Puri Copper Plates (1296 CE)**.
4. **Minhaj-i-Siraj's Tabaqat-i-Nasiri (1260 CE)**: Independent contemporary Persian verification.

### 9. Community-Heritage & Shilpi-Vaddera Engineering Legacy
The quarrying and riverine barge transport of monolithic Khondalite, Chlorite, and Laterite blocks from the Mahanadi and Nilagiri quarries to the sandy coast of Konark and the ramparts of Raibania required the combined engineering mastery of **Vasthushilpi (CH-0021)**, **Shilpi (CH-0020)**, **Construction & Engineering guilds (CH-0019)**, and **Odra-Kshatriya / Paika / Odiyaraju military protectors (CH-0017, CH-0003, CH-0048)**.

### 10. Historical Timeline & Conclusion
- **1238 CE**: Coronation of Emperor Langula Narasimhadeva I.
- **1243–1245 CE**: Decisive victories at **Katasin**, **Lakhnor**, and the siege of **Lakhnauti** in Bengal; annexation of southern Radha.
- **1246 CE**: **Kapilas Temple Inscription** recording the title **Gajapathi**.
- **c. 1250–1258 CE**: Consecration of the **Sun Temple at Konark** (on Magha Sukla Saptami).
- **1264 CE**: Passing of Emperor Narasimhadeva I after a glorious 26-year reign.`
  },

  // ==========================================================================
  // CATEGORY 1D: 7 PRIMARY ROYAL COPPER-PLATE & TEMPLE INSCRIPTIONS
  // ==========================================================================

  // 8. IA-0007: insc_veligalani_1458
  {
    id: 'insc_veligalani_1458',
    slug: 'veligalani-copper-plate-grant-kapilendra-deva-1458-ia-0007',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('copper_plate_charter.jpg'),
    original_language: 'en',
    original_title:
      'IA-0007 | Veligalani Copper-Plate Grant of Samrat Kapilendra Deva (Saka 1380 / 1458 CE): Trilingual Imperial Charter on the Krishna River',
    summary:
      'Complete 10-chapter epigraphic monograph on the Veligalani Copper-Plate Grant of Samrat Kapilendra Deva (Reference ID: IA-0007, Record ID: insc_veligalani_1458), issued in Saka 1380 (May 1458 CE) from the royal military camp on the banks of the Krishna River, written in three languages (Sanskrit, Odia, and Telugu), and establishing the full Suryavamsha Gajapathi imperial titulature.',
    tags: [
      'IA-0007',
      'Veligalani Copper Plates',
      'Kapilendra Deva',
      'Saka 1380',
      'Trilingual Charter',
      'Epigraphia Indica Vol XXXIII',
      'Navakoti Karnata Kalavargesvara'
    ],
    sources: [
      {
        id: 'src_ia07_01',
        source_type: 'Inscription',
        title: 'Veligalani Plates of Kapilesvara (Saka 1380 / 1458 CE)',
        author_or_authority: 'Dr. D.C. Sircar (ed.), Epigraphia Indica, Vol. XXXIII',
        publication_or_location: 'New Delhi: Archaeological Survey of India',
        year_or_era: '1959–1960 (Charter dated 1458 CE)',
        citation_details: 'pp. 275–292; Full diplomatic text, plates, and historical commentary',
        verified: true
      },
      {
        id: 'src_ia07_02',
        source_type: 'Scholarly Book',
        title: 'The Suryavamsi Gajapatis of Orissa',
        author_or_authority: 'Prof. R. Subrahmanyam',
        publication_or_location: 'Waltair: Andhra University Press',
        year_or_era: '1957',
        citation_details: 'pp. 51–58; Epigraphic analysis of the 1458 CE Krishna River campaign',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Provenance (Reference ID: IA-0007)
The **Veligalani Copper-Plate Grant of Samrat Kapilendra Deva** (Record ID: \`insc_veligalani_1458\`, Reference ID: **IA-0007**) is the most important surviving royal copper-plate charter (*Tamrasasana*) of the **Suryavamsha Gajapathi Empire**. Discovered at **Veligalani village** in Guntur District, Andhra Pradesh, and critically edited by Government Epigraphist **Dr. D.C. Sircar** in *Epigraphia Indica, Vol. XXXIII (pp. 275–292)*, this single-plate charter is dated **Saka 1380, Bahudhanya, Vaisakha Purnima (27 May 1458 CE)**—issued on the occasion of a lunar eclipse while Emperor Kapilendra Deva was encamped on the banks of the **Krishna River**.

### 2. Physical Description, Scripts & Trilingual Structure
Uniquely in medieval Indian epigraphy, the Veligalani plate is a **trilingual imperial document**, reflecting the administrative integration of Odisha, coastal Andhra, and the Deccan under Gajapathi rule:
1. **Sanskrit Section (Nagari / Proto-Odia Script)**: Contains the royal genealogy (*Vamsavali*) and imperial *Prasasti* of Kapilendra Deva.
2. **Telugu Section (Telugu Script)**: Details the boundaries of the granted village of **Veligalani** in the **Kondavidu Dandapata** for local Telugu revenue officers (*Karanams* and *Nayakas*).
3. **Odia Section (Early Odia Script)**: Summarizes the royal command and tax exemptions for the imperial chancery and Odra military governors (*Parikshas* and *Mahapatras*).

### 3. Royal Genealogy & Solar Dynasty (Suryavamsha) Attestation
The Sanskrit *Prasasti* explicitly traces Kapilendra Deva's lineage to the **Suryavamsha (Solar Dynasty)**, naming:
- **Kapilesvara Nayaka** (Grandfather), a valiant ruler and protector of dharma.
- **Jagesvara** (Father), renowned for his heroic prowess and elephant forces, and Queen **Bellama**.
- **Kapilendra Deva** (Emperor) and his elder brother **Balabhadra** and younger brother **Parashurama Harichandana**.

### 4. Imperial Titulature: "Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara"
The Veligalani Charter is the primary dated copper-plate record confirming that by **May 1458 CE**, Kapilendra Deva had already defeated the **Sultanate of Bengal (Gauda)**, the **Vijayanagara Empire (Karnata)**, and the **Bahmani Sultanate of Gulbarga/Bidar (Kalavarga)**, assuming the full sovereign title:
> **"Sri Sri Gajapathi Gaudesvara Navakoti Karnata Kalavargesvara Sri Kapilendra Deva Maharaju"**

### 5. Text & Translation Excerpt
- **Original Transcription Excerpt**:
  *"...Svasti Sri Saka varshambulu 1380 agu nenti Bahudhanya samvatsara Vaisakha su 15 Somavaramu Somagrahana punyakalamandu... Krishna-veni-nadi-tire... Gaudesvara Navakoti Karnata Kalavargesvara Sri Kapilendra Gajapathi Maharaju..."*
- **English Translation**:
  *"Hail! Prosperity! In the expired Saka year 1380, corresponding to the cyclic year Bahudhanya, on Monday, the full-moon day of Vaisakha, at the auspicious moment of the lunar eclipse, on the banks of the sacred Krishna-Veni River, His Imperial Majesty Gajapathi, Lord of Gauda, Overlord of Nine-Crore Karnata and Kalabarga (Gulbarga), Sri Kapilendra Deva Maharaja, grants the village of Veligalani as a tax-free Agrahara to 120 learned Brahmins of various Gotras and Vedas..."*

### 6. Political & Military Context (Spring 1458 CE)
The charter was issued just **three months after Prince Kumara Hamvira Deva liberated Orugallu (Warangal) Fort (February 1458 CE)** and defeated the Bahmani army at Devarakonda. Kapilendra Deva's personal presence on the banks of the **Krishna River** proves that the Emperor himself marched south to oversee the consolidation of the **Kondavidu, Rajahmundry, and Telangana** frontiers.

### 7. Administrative & Revenue Terminology (Dandapata System)
The grant illuminates the provincial revenue structure of the Gajapathi Empire in coastal Andhra:
- **Kondavidu Dandapata**: The southern viceroyalty administered from Kondavidu Fort.
- **Sarva-kara-parihara**: Complete exemption from all 36 royal taxes (*Chhatisa-avadana*), military billeting, and customs dues.

### 8. Community-Heritage & Professional Heritage Significance
The Veligalani Grant directly corroborates the historical presence of **Odra-Kshatriya (CH-0003)**, **GajapathiRajulu (CH-0005)**, **Odiyaraju (CH-0048)**, and **Vadderarajulu (CH-0013)** military commanders and revenue administrators stationed across the Krishna–Guntur–Palnadu corridor, linking directly to **Category 1: Historical Warriors (CH-0017)** and **Category 8: Royal Heritage (CH-0024)**.

### 9. Historiographical Verification Status
Preserved at the **Government Museum, Chennai**, and published with photographic facsimiles by **Dr. D.C. Sircar in Epigraphia Indica Vol. XXXIII**, the Veligalani Charter carries the highest level of primary epigraphic verification.

### 10. Chronological Context & Conclusion
- **1434 CE**: Coronation of Kapilendra Deva at Cuttack.
- **1454 CE**: Capture of Kondavidu Fort.
- **Feb 1458 CE**: Liberation of Warangal (Orugallu) Fort.
- **27 May 1458 CE**: Issuance of the **Veligalani Copper-Plate Grant (IA-0007)** on the banks of the Krishna River.`
  },

  // 9. IA-0006: insc_lingaraja_1452
  {
    id: 'insc_lingaraja_1452',
    slug: 'bhubaneswar-lingaraja-temple-stone-inscription-kapilendra-ia-0006',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('kapilendra_deva_lingaraja.jpg'),
    original_language: 'en',
    original_title:
      'IA-0006 | Bhubaneswar Lingaraja Temple Stone Inscription of Kapilendra Deva (c. 1438–1452 CE): Early Odia Royal Proclamation & Rashtra-Devata Edict',
    summary:
      'Complete 10-chapter epigraphic monograph on the Bhubaneswar Lingaraja Temple Stone Inscription of Samrat Kapilendra Deva (Reference ID: IA-0006, Record ID: insc_lingaraja_1452), engraved in early Odia prose on the Jagamohana doorway of the Lingaraja Temple, proclaiming the supreme sovereignty of Lord Purushottama-Jagannatha and warning rebellious feudatory chiefs.',
    tags: [
      'IA-0006',
      'Lingaraja Temple Inscription',
      'Kapilendra Deva',
      'Early Odia Epigraphy',
      'Rashtra-Devata',
      'Bhubaneswar',
      'Ekamra Kshetra'
    ],
    sources: [
      {
        id: 'src_ia06_01',
        source_type: 'Inscription',
        title: 'Lingaraja Temple Doorway Inscriptions of Kapilendra Deva',
        author_or_authority: 'Dr. K.B. Tripathi, The Evolution of Oriya Language and Script',
        publication_or_location: 'Bhubaneswar: Utkal University',
        year_or_era: '1962 (Inscriptions c. 1438–1452 CE)',
        citation_details: 'pp. 252–265; Full text, paleographical chart, and linguistic analysis',
        verified: true
      },
      {
        id: 'src_ia06_02',
        source_type: 'Peer-Reviewed Research',
        title: 'Inscriptions of Kapilendra Deva in the Lingaraja Temple',
        author_or_authority: 'Dr. K.C. Panigrahi, Indian Historical Quarterly, Vol. XXXI',
        publication_or_location: 'Calcutta',
        year_or_era: '1955',
        citation_details: 'pp. 110–115; Historical analysis of the royal warning to feudatory Samantas',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Location (Reference ID: IA-0006)
The **Bhubaneswar Lingaraja Temple Stone Inscription of Samrat Kapilendra Deva** (Record ID: \`insc_lingaraja_1452\`, Reference ID: **IA-0006**) is a landmark royal proclamation incised on the stone door-jamb of the *Jagamohana* (assembly hall) of the monumental **11th-century Lingaraja (Tribhuvanesvara) Temple at Ekamra-Kshetra (Bhubaneswar, Odisha)**. Engraved in **early Odia script and prose** during the early regnal years (*4th to 19th Anka*, c. 1438–1452 CE) of Emperor Kapilendra Deva, it serves as a foundational constitutional document of the **Suryavamsha Gajapathi state**.

### 2. Paleography, Script & Linguistic Importance
Rather than employing courtly Sanskrit verse comprehensible only to Brahmin scholars, Kapilendra Deva deliberately ordered his public proclamations at **Bhubaneswar Lingaraja Temple** and **Puri Jagannatha Temple** to be carved in **vernacular Odia prose**. As analyzed by **Dr. K.B. Tripathi (1962)**, this inscription represents a decisive milestone in the elevation of **Odia** as the official state language of imperial administration across *Odra-Rashtra*.

### 3. Text & Translation of the Royal Proclamation
- **Original Odia Epigraphic Text Excerpt**:
  *"...Sri Kapilesvara Deva Maharaja... rajanka ajna... sakala samanta rajaru Sri Purusottama bhandare bheti kariba... je kehi rajana palana na kariba se Sri Jagannathanka drohi heba..."*
- **English Translation**:
  *"By the supreme command of His Majesty Sri Kapilesvara Deva Maharaja: All feudatory kings (Samantas) and chieftains within the realm shall walk in the path of righteousness and remit their lawful tribute into the treasury of Lord Purushottama. Whosoever disobeys this royal command commits high treason (Droha) against Lord Sri Jagannatha himself and shall be dispossessed and banished..."*

### 4. Political Context: Suppression of Feudatory Rebellions (1435–1444 CE)
When Kapilendra Deva ascended the throne of Kataka in 1434 CE following the childless Eastern Ganga king Bhanudeva IV, several regional feudatories—including the **Matsyas of Oddadi**, the **Silavamsis of Nandapur**, the **Chodas**, and the **Gangas of Khimindi**—attempted to withhold tribute. By framing rebellion against the Gajapathi Crown as **treason (*Droha*) against Lord Jagannatha**, Kapilendra Deva united religious legitimacy with military enforcement.

### 5. Theological Statecraft: The "Rashtra-Devata" & "Rauta" Doctrine
This inscription codifies the constitutional theory of the Gajapathi Empire:
1. **Lord Sri Jagannatha (Purushottama)** is the legal sovereign emperor (*Samrat*) of Odisha.
2. **Lord Lingaraja (Kirttivasa)** of Bhubaneswar is the co-presiding guardian of *Ekamra-Kshetra*.
3. **Emperor Kapilendra Deva** governs as the **Rauta (Military Deputy)** and **Adya-Sevaka (First Servitor)** executing the divine mandate.

### 6. Temple Endowments & Regulation of Temple Servitors (Sevayats)
Additional lines on the Lingaraja doorway record Kapilendra Deva's endowments of tax-free land, perpetual lamps (*Akhanda-Dipa*), and strict ethical regulations for the temple *Parikshas* (superintendents) and *Sevayats* (ritual servitors).

### 7. Architectural Context: The Lingaraja Temple Complex
Originally completed in the 11th century CE by the **Somavamsi (Keshari) Emperors Yayati II and Uddyotakeshari**, the **180-foot Rekha Deula of Lord Lingaraja** was continuously patronized by the Imperial Gangas and Suryavamsha Gajapathis, standing as the pinnacle of classical **Kalinga Vasthushilpi (CH-0021)** and **Shilpi (CH-0020)** stone architecture.

### 8. Two-Way Community & Professional Heritage Cross-References
This inscription connects directly to:
- **Odra-Kshatriya (CH-0003)**, **OD-Khandayath (CH-0005)**, **OD-Paika (CH-0007)**, and **Gajapathulu (CH-0014)** in the Community-Heritage Directory.
- **Category 8: Royal Heritage (CH-0024)**, **Category 1: Historical Warriors (CH-0017)**, and **Category 5: Vasthushilpi (CH-0021)**.

### 9. Historiographical Verification
Examined in situ on the inner doorway of the Lingaraja Temple by **Manmohan Chakravarti, Dr. K.C. Panigrahi (1955), and Dr. K.B. Tripathi (1962)**, the inscription is an authentic, undisturbed 15th-century primary stone record.

### 10. Chronological Summary & Conclusion
- **11th Century CE**: Construction of the Lingaraja Temple at Bhubaneswar by the Somavamsi emperors.
- **1434 CE**: Coronation of Kapilendra Deva at Cuttack.
- **c. 1438–1452 CE**: Engraving of the **Lingaraja Temple Odia Proclamation (IA-0006)** establishing absolute imperial authority across Odisha.`
  },

  // 10. IA-0011: insc_simhachalam_prataparudra
  {
    id: 'insc_simhachalam_prataparudra',
    slug: 'simhachalam-pillar-inscription-prataparudra-deva-1516-ia-0011',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('simhachalam_temple.jpg'),
    original_language: 'en',
    original_title:
      'IA-0011 | Simhachalam Pillar Inscription of Emperor Prataparudra Deva (Saka 1438 / 1516 CE): Kalinga Epigraphy & Royal Endowments at Simhagiri',
    summary:
      'Complete 10-chapter epigraphic monograph on the Simhachalam Mukhamandapa Pillar Inscription of Emperor Prataparudra Deva Gajapathi (Reference ID: IA-0011, Record ID: insc_simhachalam_prataparudra), dated Saka 1438 (1516 CE) in Telugu and Sanskrit, documenting royal endowments at the Sri Varaha Lakshmi Narasimha Temple in Visakhapatnam during the Kalinga-Vijayanagara campaigns.',
    tags: [
      'IA-0011',
      'Simhachalam Inscription',
      'Prataparudra Deva',
      'Saka 1438',
      'South Indian Inscriptions Vol VI',
      'Varaha Lakshmi Narasimha',
      'Visakhapatnam'
    ],
    sources: [
      {
        id: 'src_ia11_01',
        source_type: 'Inscription',
        title: 'South Indian Inscriptions (SII), Vol. VI: Simhachalam Temple Inscriptions (No. 694)',
        author_or_authority: 'K.V. Subrahmanya Aiyer (ed.), Archaeological Survey of India',
        publication_or_location: 'Madras: Government Press',
        year_or_era: '1928 (Inscription dated Saka 1438 / 1516 CE)',
        citation_details: 'Inscription No. 694; Full Telugu and Sanskrit text on the Mukhamandapa pillar at Simhachalam',
        verified: true
      },
      {
        id: 'src_ia11_02',
        source_type: 'Scholarly Book',
        title: 'The History of the Simhachalam Temple',
        author_or_authority: 'Prof. K. Sundaram',
        publication_or_location: 'Waltair: Andhra University Press',
        year_or_era: '1969',
        citation_details: 'Chapters IV–VI (Eastern Ganga and Suryavamsha Gajapathi patronage at Simhagiri)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Provenance (Reference ID: IA-0011)
The **Simhachalam Mukhamandapa Pillar Inscription of Emperor Prataparudra Deva Gajapathi** (Record ID: \`insc_simhachalam_prataparudra\`, Reference ID: **IA-0011**) is a vital stone inscription carved on a granite-khondalite pillar in the *Mukhamandapa* of the **Sri Varaha Lakshmi Narasimha Swamy Temple at Simhachalam (Simhagiri, Visakhapatnam District, Andhra Pradesh)**. Published by the Archaeological Survey of India in **South Indian Inscriptions (SII), Vol. VI, No. 694**, it is dated **Saka 1438 (1516 CE)** and composed in **Telugu with a Sanskrit benediction**.

### 2. The Sacred Shrine of Simhachalam (Simhagiri) in Kalinga History
Perched 800 feet above the Bay of Bengal on the Kaitabhesvara/Simhagiri hill range, the **Simhachalam Temple** preserves over **525 stone inscriptions** spanning the 11th to the 17th centuries CE. Rebuilt on a monumental scale in the 13th century by **Eastern Ganga Emperor Langula Narasimhadeva I** (under general Akhtayi Senapati), Simhachalam served as the supreme southern tutelary shrine of both the **Imperial Eastern Gangas** and the **Suryavamsha Gajapathis**, marking the cultural heart of **Madhya- and Dakshina-Kalinga**.

### 3. Text & Translation of the 1516 CE Pillar Inscription
- **Original Telugu & Sanskrit Transcription Excerpt**:
  *"...Svasti Sri Saka varshambulu 1438 agu nenti... Sri Prataparudra Gajapathi Mahadevula ayushya arogya aishvarya abhivrudhyardhamu Simhadri Appanaku akhanda dipamu..."*
- **English Translation**:
  *"Hail! Prosperity! In the expired Saka year 1438 (1516 CE), for the longevity, health, military victory, and boundless imperial prosperity of His Majesty Sri Prataparudra Gajapathi Mahadeva, this endowment of land, milk-cows, silver vessels, and a perpetual ghee-lamp (Akhanda-Dipa) is consecrated before Lord Simhadri Appanna (Sri Varaha Lakshmi Narasimha)..."*

### 4. Historical & Military Context: The Kalinga Campaign (1515–1519 CE)
Dated to **1516 CE (Saka 1438)**, this inscription belongs to the critical phase of the **Gajapathi–Vijayanagara struggle** over southern Kalinga and coastal Andhra. While Vijayanagara Emperor Sri Krishnadevaraya advanced to Potnuru and Simhachalam in 1516 CE, the continuous presence of Gajapathi royal endowments and administrative officers at Simhachalam demonstrates the resilience of Gajapathi loyalty across Kalinga—culminating in the **1519 CE Peace Treaty**, under which all of Kalinga and Simhachalam remained under **Emperor Prataparudra Deva's** sovereign rule.

### 5. Bilingual Epigraphic Culture of Kalinga (Telugu, Odia & Sanskrit)
The Simhachalam epigraphic corpus illustrates the seamless cultural and administrative bilingualism of the **Kalinga-Odra corridor**:
- Royal officials (*Parikshas, Bhoga-Parikshas, and Senapatis*) recorded grants simultaneously in **Telugu, Odia, and Sanskrit**.
- Classical temple rituals combined Kalinga *Pancharatra/Vaishnava* liturgy with regional devotional music (*Gitagovinda* and Telugu/Odia *Sankirtana*).

### 6. Temple Economy: Bhoga, Akhanda-Dipa & Agrahara Endowments
As documented by **Prof. K. Sundaram (1969)**, royal pillar inscriptions like **IA-0011** functioned as legally binding trust deeds (*Sila-Sasanas*):
- Hereditary pastoral families were entrusted with cattle herds (*Go-dana*) to supply a fixed daily measure (*Mana*) of clarified butter (*Ghruta*) for the perpetual sanctum lamp.
- Temple treasury officers (*Sri-Bhandara*) audited the agricultural yield of endowed Kalinga villages.

### 7. Architectural Context: The Kalinga Stone Chariot Mandapa
The pillar bearing inscription **IA-0011** stands within the 13th–15th century **Mukhamandapa and Natamandira** of Simhachalam, famous for its carved **stone chariot drawn by horses and elephants** and intricate **Kalinga Vasthushilpi (CH-0021)** pillar reliefs depicting the ten incarnations of Vishnu and Nava-Narasimha forms.

### 8. Community-Heritage & Professional Heritage Cross-References
This inscription directly links to:
- **KalingaRajulu (CH-0004)**, **GajapathiRajulu (CH-0005 / CH-0014)**, **Odra-Kshatriya (CH-0003)**, **Odiyaraju (CH-0048)**, and **Vadderarajulu (CH-0013)** in North Andhra (Srikakulam, Vizianagaram, Visakhapatnam).
- **Category 8: Royal Heritage (CH-0024)**, **Category 5: Vasthushilpi (CH-0021)**, and **Category 4: Shilpi (CH-0020)**.

### 9. Verification Status
Published verbatim in **South Indian Inscriptions, Vol. VI (No. 694)** by the Archaeological Survey of India, the inscription remains intact in situ on the Mukhamandapa pillar at Simhachalam.

### 10. Chronological Summary & Conclusion
- **1260s CE**: Reconstruction of Simhachalam Temple by Eastern Ganga Emperor Narasimhadeva I.
- **1448–1497 CE**: Endowments by Suryavamsha Gajapathi Emperors Kapilendra Deva and Purushottama Deva.
- **1516 CE (Saka 1438)**: Engraving of **Prataparudra Deva's Simhachalam Pillar Inscription (IA-0011)**.
- **1519 CE**: Treaty between Prataparudra Deva and Krishnadevaraya reaffirming Gajapathi sovereignty over Kalinga and Simhachalam.`
  },

  // 11. KD-0019: insc_anumakonda_1163
  {
    id: 'insc_anumakonda_1163',
    slug: 'anumakonda-thousand-pillar-temple-inscription-rudradeva-1163-kd-0019',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('warangal_kirti_torana.jpg'),
    original_language: 'en',
    original_title:
      'KD-0019 | Anumakonda Thousand Pillar Temple Stone Inscription of Rudradeva (Saka 1084 / 1163 CE): Proclamation of Kakatiya Imperial Sovereignty',
    summary:
      'Complete 10-chapter epigraphic monograph on the Anumakonda (Hanamkonda) Thousand Pillar Temple Stone Inscription of Kakatiya King Rudradeva (Prataparudra I, Reference ID: KD-0019, Record ID: insc_anumakonda_1163), dated Saka 1084 (20 January 1163 CE), composed by Achintendra, and proclaiming the sovereign independence of the Kakatiya Empire.',
    tags: [
      'KD-0019',
      'Anumakonda Inscription 1163',
      'Rudradeva',
      'Thousand Pillar Temple',
      'Kakatiya Dynasty',
      'Hanamkonda',
      'Saka 1084'
    ],
    sources: [
      {
        id: 'src_kd19_01',
        source_type: 'Inscription',
        title: 'Anmakonda Inscription of Rudradeva (Saka 1084 / 1163 CE)',
        author_or_authority: 'J.F. Fleet (ed.), Indian Antiquary, Vol. XI / P.V. Parabrahma Sastry, Corpus of Inscriptions in the Telangana Districts',
        publication_or_location: 'Bombay / Hyderabad',
        year_or_era: '1882 / 1978 (Inscription dated 1163 CE)',
        citation_details: 'pp. 9–20; Full Sanskrit text on the four-sided basalt pillar at the Rudresvara (Thousand Pillar) Temple, Hanamkonda',
        verified: true
      },
      {
        id: 'src_kd19_02',
        source_type: 'Scholarly Book',
        title: 'The Kakatiyas of Warangal',
        author_or_authority: 'Dr. P.V. Parabrahma Sastry',
        publication_or_location: 'Hyderabad: Government of Andhra Pradesh',
        year_or_era: '1978',
        citation_details: 'pp. 88–103 (Analysis of Rudradeva’s military campaigns and the 1163 CE declaration of sovereignty)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Provenance (Reference ID: KD-0019)
The **Anumakonda (Hanamkonda) Thousand Pillar Temple Stone Inscription of Kakatiya Emperor Rudradeva (Prataparudra I)** (Record ID: \`insc_anumakonda_1163\`, Reference ID: **KD-0019**) is the foundational constitutional charter of the **Kakatiya Imperial Dynasty**. Incised upon a finely polished four-sided black basalt pillar standing within the precinct of the **Sri Rudresvara Swamy (Thousand Pillar / Veyistambhala Gudi) Temple in Hanamkonda (Warangal, Telangana)**, it is dated **Saka 1084, Chitrabhanu, Magha Bahula Padyami, Saturday (20 January 1163 CE)**.

### 2. Physical Description, Author & Classical Sanskrit Style
The inscription is engraved on all four faces of a monolithic dolerite/basalt stela in ornate **Telugu-Kannada script**. The Sanskrit *Prasasti* was composed by the celebrated poet **Achintendra**, son of Ramesvara Dikshita and disciple of Advayashrama, in classical *Kavya* meters (*Sragdhara, Sardulavikridita, Vasantatilaka, and Anushtubh*).

### 3. Early Kakatiya Genealogy (Beta I, Prola I, Beta II & Prola II)
The inscription provides the earliest authoritative epigraphic genealogy of the Kakatiya house:
- **Beta I (Garuda Beta)**: Ruled from Anumakonda and defeated southern rivals.
- **Prola I (Arigajakesari)**: Excavated the great **Kesari-tataka (Kesamudram)** reservoir and received the hereditary fief of **Anumakonda-vishaya**.
- **Beta II (Tribhuvanamalla / Vikramachakri)**: Patron of Shaiva acharya Ramesvara Pandita.
- **Prola II**: Defeated Tailapa III's generals, Mantrakuta Gundaraja, Govindaraja, and Choda Udaya, paving the way for independence.

### 4. Proclamation of Sovereign Independence (1163 CE)
Whereas all earlier Kakatiya inscriptions had acknowledged the nominal suzerainty of the **Western Chalukyas of Kalyani**, the **1163 CE Anumakonda Inscription** omits any overlord and proclaims **Rudradeva (r. 1158–1195 CE)** an independent sovereign emperor. It details Rudradeva's decisive military victories over:
- **Dommaraja** of Nagunur, **Medaraja** of Polavasa, and **Mailigideva**.
- **Chododaya** and **Bhima of Vardhamanapura** (Vaddamanu).
- Extension of the Kakatiya frontier eastward to **Srisailam, Tripurantakam, and the Godavari–Krishna delta**.

### 5. Text & Translation Excerpt
- **Original Sanskrit Transcription Excerpt**:
  *"...Saka-varshatiteshu chatur-asiti-satadhikeshu... Sri-Rudradeva-nripatih... Rudresvara-traya-pratishtha-makarot..."*
- **English Translation**:
  *"When 1084 years of the Saka era had elapsed, in the cyclic year Chitrabhanu... King Sri Rudradeva, having vanquished all rival kings by the might of his sword and having protected the earth bounded by the eastern sea and Srisailam, consecrated the Trikuta temple of Sri Rudresvara, Vasudeva, and Suryadeva at the royal capital of Anumakonda..."*

### 6. Architectural Context: The Trikuta Rudresvara (Thousand Pillar) Temple
The inscription directly commemorates Rudradeva's construction and consecration in **1163 CE** of the **Trikutachala (Three-Shrined) Rudresvara Temple** at Hanamkonda:
- Built upon a star-shaped (*Stellate*) raised platform (*Jagati*) using interlocking dry-stone granite and polished black dolerite columns turned on stone lathes.
- Enshrines **Rudresvara (Shiva)** facing east, **Vasudeva (Vishnu)** facing south, and **Suryadeva (the Sun God)** facing north, joined by a magnificent **300-pillared Nandi Mandapa and Kalyana Mandapa**.

### 7. Historical Connection to the Suryavamsha Gajapathis
Three centuries after Rudradeva erected this pillar in 1163 CE and laid the foundations of **Orugallu (Warangal) Fort**, the Suryavamsha Gajapathi Emperor **Kapilendra Deva** and **Prince Kumara Hamvira Deva** liberated Orugallu in **February 1458 CE**, honoring the sacred temples of Anumakonda and Svayambhudeva.

### 8. Community-Heritage & Professional Heritage Cross-References
The quarrying, lathe-turning, and erection of the 1,000 basalt pillars and the adjacent Rudra-Samudram tank at Hanamkonda exemplify the heritage of:
- **Vasthushilpi (CH-0021)**, **Shilpi (CH-0020)**, **Vishwashilpi (CH-0023)**, and **Construction & Engineering (CH-0019)**.
- **Vadderarajulu (CH-0013)**, **Vaddera (CH-0010)**, **Voddar (CH-0015)**, and **Odiyaraju (CH-0048)** in the Community-Heritage Directory.

### 9. Verification Status
Edited from ink impressions by **J.F. Fleet (*Indian Antiquary*, Vol. XI, 1882)** and **Dr. P.V. Parabrahma Sastry (*Inscriptions of Andhra Pradesh: Warangal District*, 1974)**, the basalt pillar stands in situ at the Thousand Pillar Temple in Hanamkonda under ASI protection.

### 10. Chronological Summary & Conclusion
- **c. 1052–1157 CE**: Reigns of Prola I, Beta II, and Prola II at Anumakonda.
- **1158 CE**: Accession of King Rudradeva (Prataparudra I).
- **20 January 1163 CE**: Consecration of the Thousand Pillar Temple and erection of the **Anumakonda Stone Pillar Inscription (KD-0019)** proclaiming full Kakatiya imperial sovereignty.`
  },

  // 12. KD-0020: insc_motupalli_1244
  {
    id: 'insc_motupalli_1244',
    slug: 'motupalli-abhaya-shasana-pillar-inscription-ganapati-deva-1244-kd-0020',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('copper_plate_charter.jpg'),
    original_language: 'en',
    original_title:
      'KD-0020 | Motupalli Abhaya Shasana Pillar Inscription of Emperor Ganapati Deva (Saka 1166 / 1244 CE): Maritime Trade Charter & International Law',
    summary:
      'Complete 10-chapter epigraphic monograph on the Motupalli Pillar Inscription (Abhaya Shasana) of Kakatiya Emperor Ganapati Deva (Reference ID: KD-0020, Record ID: insc_motupalli_1244), dated Saka 1166 (1244 CE) at the seaport of Motupalli in Prakasam district, guaranteeing protection to shipwrecked maritime merchants and fixing transparent international customs tariffs.',
    tags: [
      'KD-0020',
      'Motupalli Abhaya Shasana',
      'Ganapati Deva',
      'Saka 1166',
      'Maritime Trade Charter',
      'Epigraphia Indica Vol XII',
      'Marco Polo'
    ],
    sources: [
      {
        id: 'src_kd20_01',
        source_type: 'Inscription',
        title: 'Motupalli Pillar Inscription of Ganapatideva (Saka 1166 / 1244 CE)',
        author_or_authority: 'Prof. E. Hultzsch (ed.), Epigraphia Indica, Vol. XII',
        publication_or_location: 'Calcutta / New Delhi: Archaeological Survey of India',
        year_or_era: '1913–1914 (Charter dated 1244 CE)',
        citation_details: 'pp. 188–197; Complete Sanskrit text, translation, and tariff schedule',
        verified: true
      },
      {
        id: 'src_kd20_02',
        source_type: 'Scholarly Book',
        title: 'Precolonial India in Practice: Society, Region, and Identity in Medieval Andhra',
        author_or_authority: 'Prof. Cynthia Talbot',
        publication_or_location: 'New York: Oxford University Press',
        year_or_era: '2001',
        citation_details: 'pp. 131–138 (Analysis of Kakatiya maritime trade and the Motupalli Abhaya Shasana)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Provenance (Reference ID: KD-0020)
The **Motupalli Pillar Inscription (*Abhaya Shasana* / Charter of Security) of Kakatiya Emperor Ganapati Deva** (Record ID: \`insc_motupalli_1244\`, Reference ID: **KD-0020**) is one of the most celebrated maritime commercial charters in world legal history. Engraved on a granite pillar in the precinct of the **Virabhadrasvamin Temple at the ancient seaport of Motupalli (*Desyuyakkondapattana*, modern Prakasam District, Andhra Pradesh)**, it is dated **Saka 1166, Krodhi (1244–1245 CE)** and was critically edited by **Prof. E. Hultzsch** in *Epigraphia Indica, Vol. XII (pp. 188–197)*.

### 2. Historical Background: The Seaport of Motupalli on the Bay of Bengal
During his 63-year reign (**1199–1262 CE**), **Emperor Ganapati Deva** unified the interior plateau of Telangana with the rich coastal deltas of Vengi, Velanadu, and Nellore. Recognizing that international maritime trade across the Bay of Bengal (connecting Andhra and Kalinga with Sri Lanka, Southeast Asia, China, and the Persian Gulf) was vital to imperial prosperity, Ganapati Deva made **Motupalli** the premier royal port of the Kakatiya Empire.

### 3. The Humanitarian & Legal Revolution of the "Abhaya Shasana"
Prior to Ganapati Deva's charter, coastal rulers across many parts of the medieval world enforced the harsh law of wreck—confiscating all gold, horses, silk, and cargo from merchant ships driven ashore by storms. In the **Motupalli Abhaya Shasana (1244 CE)**, Emperor Ganapati Deva formally abolished this practice forever:
> *"Whereas formerly kings forcibly seized all cargo—gold, elephants, horses, gems, and merchandise—when sea-going vessels were driven ashore or wrecked by storms, We, considering that wealth is dearer than life itself to merchants who brave the perils of the ocean, hereby grant this Charter of Security (Abhaya-Shasana) with kindness to all sea-traders..."*

### 4. Text & Translation Excerpt
- **Original Sanskrit Transcription Excerpt**:
  *"...Sriman-Mahamandalesvara Kakati-Ganapatideva-Maharajah... samudra-yatra-vyavaharinam abhaya-sasanam idam asmakam दत्तम्..."*
- **English Translation**:
  *"By His Imperial Majesty Kakatiya Ganapatideva Maharaja, appointed by his governor Siddhayadeva at Motupalli: To all merchants embarking from and arriving at Motupalli from foreign islands and coastal ports, complete safety of person and cargo is guaranteed. Even if a vessel is wrecked upon our coast, nothing shall be seized beyond the fixed, lawful customs duty..."*

### 5. Transparent Schedule of International Customs Duties (Sulka)
The inscription specifies an exact, transparent tariff schedule (*Sulka*) on imported and exported luxury goods so port officials could never extort arbitrary fees:
- **Sandalwood, Camphor, Rosewater & Ivory**: Fixed fractional ad valorem duty (1/30th).
- **Pearls, Coral, Copper, Zinc, Lead, Silk Threads & Woven Cloths**: Regulated port tariff.
- **Areca Nuts, Pepper & Agricultural Exports**: Moderate coastal trade duty.

### 6. Corroboration by Marco Polo (c. 1289–1292 CE)
Forty-five years after Ganapati Deva erected this pillar, the Venetian traveler **Marco Polo** landed at **Motupalli ("Mutfili")** at the close of **Queen Rudrama Devi's** reign. Marco Polo's account independently confirms the flourishing impact of the *Abhaya Shasana*, praising the diamond trade of Golconda/Krishna, the finest buckram and muslin textiles in the world, and the righteous, peaceful administration of the Queen.

### 7. Subsequent Renewals by Anapotu Reddi (1358 CE) & Gajapathi Governors
So vital was Ganapati Deva's *Abhaya Shasana* that when the **Reddi Kings of Kondavidu (Anavota Reddi in 1358 CE)** and later Vijayanagara and **Suryavamsha Gajapathi** governors administered Motupalli, they re-inscribed and renewed the exact commercial guarantees of the 1244 CE pillar.

### 8. Community-Heritage & Professional Heritage Cross-References
The Motupalli port infrastructure, coastal warehouses, and maritime transport networks connect directly to:
- **Category 8: Royal Heritage (CH-0024)**, **Category 2: Agriculture (CH-0018)**, **Category 3: Construction & Engineering (CH-0019)**, and **Category 9: Other Traditional & Contemporary Professions (CH-0025)**.
- **KalingaRajulu (CH-0004)**, **Odra-Kshatriya (CH-0003)**, **Vadderarajulu (CH-0013)**, and **Odiyaraju (CH-0048)**.

### 9. Verification Status
Published with full diplomatic transcript and plates by **Prof. E. Hultzsch in Epigraphia Indica, Vol. XII**, the granite pillar stands in situ at Motupalli village (Chinaganjam Mandal, Prakasam District, AP).

### 10. Chronological Summary & Conclusion
- **1199–1262 CE**: Reign of Kakatiya Emperor Ganapati Deva.
- **1244 CE (Saka 1166)**: Erection of the **Motupalli Abhaya Shasana Pillar Inscription (KD-0020)**.
- **c. 1289–1292 CE**: Visit of **Marco Polo** to the port of Motupalli.
- **1358 CE & 15th Century CE**: Renewal of the Motupalli charter under the Reddi and Gajapathi administrations.`
  },

  // 13. KD-0021: insc_malkapuram_1261
  {
    id: 'insc_malkapuram_1261',
    slug: 'malkapuram-stone-pillar-inscription-rudrama-devi-1261-kd-0021',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('warangal_kirti_torana.jpg'),
    original_language: 'en',
    original_title:
      'KD-0021 | Malkapuram Stone Pillar Inscription of Ganapati Deva & Rani Rudrama Devi (Saka 1183 / 1261 CE): Visvesvara Golaki Matha, University & Public Hospital',
    summary:
      'Complete 10-chapter epigraphic monograph on the Malkapuram Stone Pillar Inscription (Reference ID: KD-0021, Record ID: insc_malkapuram_1261), dated Saka 1183 (25 March 1261 CE) in Guntur district, recording the joint grant of Mandadam and Velagapudi by Emperor Ganapati Deva and Queen Co-Regent Rudrama Devi to Rajaguru Visvesvara Sambhu to establish a Vedic university, free maternity hospital (Prasuti-Sala), general infirmary (Arogya-Sala), and feeding house.',
    tags: [
      'KD-0021',
      'Malkapuram Inscription 1261',
      'Rani Rudrama Devi',
      'Ganapati Deva',
      'Visvesvara Sambhu',
      'Prasuti Sala Hospital',
      'Amaravati Guntur'
    ],
    sources: [
      {
        id: 'src_kd21_01',
        source_type: 'Inscription',
        title: 'Malkapuram Stone Pillar Inscription of Rudradeva (Rudramadevi), Saka 1183 (1261 CE)',
        author_or_authority: 'J. Ramayya Pantulu, Journal of the Andhra Historical Research Society (JAHRS), Vol. IV / SII Vol. X, No. 395',
        publication_or_location: 'Rajahmundry / Madras: Archaeological Survey of India',
        year_or_era: '1930 / 1948 (Inscription dated 1261 CE)',
        citation_details: 'SII Vol. X, No. 395; Complete Sanskrit and Telugu text on the 14-foot Nandi pillar at Malkapuram',
        verified: true
      },
      {
        id: 'src_kd21_02',
        source_type: 'Scholarly Book',
        title: 'Precolonial India in Practice: Society, Region, and Identity in Medieval Andhra',
        author_or_authority: 'Prof. Cynthia Talbot',
        publication_or_location: 'New York: Oxford University Press',
        year_or_era: '2001',
        citation_details: 'pp. 87–125 (Detailed study of the Malkapuram charter, Visvesvara Sambhu, and Kakatiya welfare institutions)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Provenance (Reference ID: KD-0021)
The **Malkapuram Stone Pillar Inscription of Emperor Ganapati Deva and Queen Co-Regent Rudrama Devi** (Record ID: \`insc_malkapuram_1261\`, Reference ID: **KD-0021**) is one of the longest and most socially illuminating stone charters in medieval Indian history. Carved upon a colossal **14-foot-high four-sided granite pillar crowned by a couchant Nandi** at **Malkapuram village** (in the modern Amaravati/Tulluru capital region, Guntur District, Andhra Pradesh), it is dated **Saka 1183, Durmati, Chaitra Bahula Ashtami (25 March 1261 CE)** and published in **South Indian Inscriptions (SII), Vol. X, No. 395**.

### 2. Joint Sovereignty: Ganapati Deva's Pledge & Rudrama Devi's Execution
The inscription provides primary epigraphic proof of the transition of imperial power from the aged **Emperor Ganapati Deva** to his daughter and designated male co-regent **Rani Rudrama Devi (styled "Rudradeva Maharaja")**:
- Ganapati Deva first made the verbal pledge (*Vak-datta*) of donating the village of **Mandadam** (on the south bank of the Krishna River) to his royal preceptor (*Rajaguru*) **Visvesvara Sambhu**.
- In **March 1261 CE**, **Queen Rudrama Devi** formally executed the grant by the pouring of water (*Dhara-purvaka*), adding the adjacent Lanka island land of **Velagapudi** and founding the township of **Visvesvara-Golaki**.

### 3. The Golaki Matha & Rajaguru Visvesvara Sambhu
The inscription chronicles the pan-Indian spiritual network of the **Golaki Matha** (a Shaiva Siddhanta monastic order originating in Dahala-mandala near Jabalpur). **Visvesvara Sambhu**, hailing from Purvagrama in Radha (Bengal), served as the spiritual preceptor (*Diksha-Guru*) not only to **Kakatiya Emperor Ganapati Deva** and **Rani Rudrama Devi**, but also to the **Kalachuri, Chola, and Malwa** kings.

### 4. World-Pioneering Public Welfare Institutions: University, Maternity Hospital & Infirmary
The Malkapuram Charter gives a complete, itemized budget and staffing table for the **Visvesvara-Golaki** institutional complex at Mandadam/Malkapuram:
1. **Vedic & Sanskrit College (*Vidya-Mandapa*)**: Staffed by professors teaching Rig, Yajur, and Sama Vedas, Sanskrit grammar (*Vyakarana*), logic (*Nyaya*), literature (*Sahitya*), and Shaiva Agamas, with free board and lodging for students.
2. **Maternity Hospital (*Prasuti-Sala*) & General Hospital (*Arogya-Sala*)**: One of the earliest epigraphically documented **free public maternity hospitals** in world history, endowed with dedicated physicians (*Vaidyas*) and maternity attendants.
3. **Public Free Feeding House (*Satra / Choultry*)**: Explicitly mandated to serve hot meals daily to **all travelers, ascetics, students, and the poor from the Brahmana down to the Panchama communities without discrimination**.

### 5. Complete Roster of Village Artisans, Musicians & Engineers
The inscription lists the exact land allotments (*Putti / Khanduka*) granted to every professional guild sustaining the township:
- **10 Master Architects & Stone-Masons (*Shilpis / Sutradharis / Pashana-kuttakas*)**, carpenters, blacksmiths, goldsmiths, potters, and coppersmiths.
- **10 Virabhadra Martial Guards (*Virabhadras*)** and **20 বীরमुष्टि (Viramushti) Temple Defenders** charged with protecting the autonomous sanctuary.
- Temple musicians, singers, dancers, physicians, and accountants (*Karanams*).

### 6. Text & Translation Excerpt
- **Original Sanskrit Transcription Excerpt**:
  *"...Saka-kale gatebdanam sate-ashtadasottare... Rudradeva-maharajah... Visvesvara-sambhave... prasuti-arogya-salabhyam vipra-adikanam satraya..."*
- **English Translation**:
  *"In the Saka year 1183 (1261 CE), Queen Rudradeva Maharaja (Rudrama Devi), fulfilling the vow of her father Ganapatideva, grants the villages of Mandadam and Velagapudi to Rajaguru Visvesvara Sambhu for the temple of Visvesvara Siva, the college of learning, the maternity hospital (Prasuti-Sala), the general hospital (Arogya-Sala), and the public feeding house serving all people..."*

### 7. Historical Continuity into the Gajapathi Era
Located directly across the Krishna River from Vijayawada and just north of **Kondavidu** and **Veligalani**, the Malkapuram–Mandadam–Velagapudi corridor later came under **Suryavamsha Gajapathi** governance in 1454–1515 CE, when Emperor Kapilendra Deva issued the **1458 CE Veligalani Copper-Plate Grant (IA-0007)** in the same district.

### 8. Community-Heritage & Professional Heritage Cross-References
Because the Malkapuram Inscription explicitly records land grants to **Stone-Masons (Shilpis), Master Architects (Sutradharis/Vasthushilpis), Hydraulic Tank Builders, Warriors (Virabhadras), and Cultivators**, it is the single richest epigraphic link connecting **all Nine Professional Heritage Categories (CH-0017 through CH-0025)** as well as **Vadderarajulu (CH-0013)**, **Vaddera (CH-0010)**, and **Odiyaraju (CH-0048)**.

### 9. Verification Status
Published in **South Indian Inscriptions, Vol. X, No. 395**, the 14-foot granite pillar stands in situ beside the ruined Mandapaswara temple at Malkapuram (Tulluru Mandal, Guntur District, AP).

### 10. Chronological Summary & Conclusion
- **1199–1262 CE**: Reign of Emperor Ganapati Deva.
- **1259–1261 CE**: Co-regency of Rani Rudrama Devi as *Rudradeva Maharaja*.
- **25 March 1261 CE (Saka 1183)**: Erection of the **Malkapuram Stone Pillar Inscription (KD-0021)** establishing the Visvesvara Golaki university, maternity hospital, and public feeding house.`
  },

  // 14. KD-0022: insc_chandupatla_1289
  {
    id: 'insc_chandupatla_1289',
    slug: 'chandupatla-stone-inscription-rudrama-devi-1289-kd-0022',
    category: 'Inscriptions & Copper Plates',
    evidence_category: 'verified_archaeological',
    verification_status: 'Published',
    author_name: 'G.Sathyanarayana Raju.Peetla. • Historical Research Council',
    publication_date: '2026-11-13',
    featured_image: ARCHIVE_IMG('kondavidu_fort_hills.jpg'),
    original_language: 'en',
    original_title:
      'KD-0022 | Chandupatla Stone Inscription of Puvvula Mummadi (November 1289 CE): Battlefield Martyrdom of Queen Rudrama Devi & General Mallikarjuna Nayaka',
    summary:
      'Complete 10-chapter epigraphic monograph on the Chandupatla Stone Inscription (Reference ID: KD-0022, Record ID: insc_chandupatla_1289), discovered at Chandupatla village in Nalgonda district and dated 27 November 1289 CE (Saka 1211), providing the definitive primary epigraphic proof that Queen Rudrama Devi and her general Mallikarjuna Nayaka attained heroic warrior martyrdom on the battlefield.',
    tags: [
      'KD-0022',
      'Chandupatla Inscription 1289',
      'Rani Rudrama Devi',
      'Mallikarjuna Nayaka',
      'Saka 1211',
      'Nalgonda Epigraphy',
      'Kakatiya Military History'
    ],
    sources: [
      {
        id: 'src_kd22_01',
        source_type: 'Inscription',
        title: 'Chandupatla Inscription of Puvvula Mummadi (Saka 1211 / 27 November 1289 CE)',
        author_or_authority: 'Dr. P.V. Parabrahma Sastry, Inscriptions of Andhra Pradesh: Nalgonda District, Vol. I',
        publication_or_location: 'Hyderabad: Department of Archaeology and Museums, Govt. of AP',
        year_or_era: '1992 (Inscription dated 27 Nov 1289 CE)',
        citation_details: 'Records the simultaneous death (Sivaloka-prapti) of Rudramadevi and General Mallikarjuna Nayaka',
        verified: true
      },
      {
        id: 'src_kd22_02',
        source_type: 'Scholarly Book',
        title: 'The Kakatiyas of Warangal',
        author_or_authority: 'Dr. P.V. Parabrahma Sastry',
        publication_or_location: 'Hyderabad: Government of Andhra Pradesh',
        year_or_era: '1978',
        citation_details: 'pp. 124–128 (Discovery and historical significance of the Chandupatla Inscription)',
        verified: true
      }
    ],
    original_content: `### 1. Introduction & Epigraphic Discovery (Reference ID: KD-0022)
The **Chandupatla Stone Inscription of Puvvula Mummadi** (Record ID: \`insc_chandupatla_1289\`, Reference ID: **KD-0022**) is one of the most decisive archaeological discoveries in South Indian historiography. Discovered in **1990** at **Chandupatla village** (Nakrekal Mandal, Nalgonda District, Telangana) near the ancient Somapuri temple tank, this Telugu stone inscription is dated **Saka 1211, Virodhi, Margasira Suddha Dvadasi, Sunday (27 November 1289 CE)**. It resolved a century-long debate by proving that **Queen Rudrama Devi** died in battle in **November 1289 CE** alongside her commander-in-chief **Mallikarjuna Nayaka**.

### 2. Text & Translation of the Chandupatla Inscription
- **Original Telugu Epigraphic Text Excerpt**:
  *"...Svasti Sri Saka varshamulu 1211 agu nenti Virodhi samvatsara Margasira su 12 Adityavaramuna... Kakatiya Rudramadevikini Mallikarjuna Nayunikini Sivaloka-prapti kaligina punyakalamandu... Puvvula Mummadi Somana-devaraku bhumi-danamu..."*
- **English Translation**:
  *"Hail! Prosperity! In the Saka year 1211, corresponding to the cyclic year Virodhi, on Sunday, the twelfth day of the bright fortnight of Margasira (27 November 1289 CE), the royal foot-soldier (Bantu) Puvvula Mummadi gifts wet paddy land beneath the tank to Lord Somanatha Deva for the spiritual merit (Punya) of Kakatiya Queen Rudramadevi and General Mallikarjuna Nayaka, who have both attained the abode of Lord Siva (Sivaloka-prapti)..."*

### 3. Military Context: The Rebellion of Kayastha Ambadeva (1287–1289 CE)
During the final years of her 27-year reign (1262–1289 CE), the septuagenarian warrior-queen **Rani Rudrama Devi** faced a formidable southern rebellion led by the Kayastha feudatory **Ambadeva of Vallur** (in Kadapa district), who boasted in his **Tripurantakam Inscription (1290 CE)** that he had allied with the Pandyas and Yadavas and defeated 75 Nayakas of the Kakatiya army.

### 4. The Battlefield Campaign of November 1289 CE
Refusing to remain inside the walls of Orugallu Fort, **Rani Rudrama Devi** personally took the field in **November 1289 CE** alongside her senior general **Mallikarjuna Nayaka** and her grandson and heir **Kumara Rudradeva (Prataparudra II)** to crush Ambadeva's rebellion along the Nalgonda–Tripurantakam frontier. The simultaneous death (*Sivaloka-prapti*) of both the Queen and her commanding general recorded at Chandupatla proves that she fell on the battlefield leading her troops.

### 5. Historiographical Impact: Revising the End of Rudrama Devi's Reign
Before the discovery of the Chandupatla Inscription (KD-0022):
- Earlier historians had assumed Rudrama Devi ruled until **1295 or 1296 CE** based on Marco Polo's travelogue and Prataparudra II's later inscriptions.
- As demonstrated by **Dr. P.V. Parabrahma Sastry**, the Chandupatla Inscription (27 November 1289 CE)—corroborated by the **1994 Peruru Inscription**—definitively establishes **November 1289 CE** as the date of Rudrama Devi's battlefield martyrdom and the immediate accession of **Emperor Prataparudra II (r. 1289–1323 CE)**, who subsequently crushed Ambadeva at Tripurantakam in 1291 CE.

### 6. The Role of the "Bantu" (Royal Warrior) Puvvula Mummadi
The donor of the Chandupatla Inscription, **Puvvula Mummadi**, identifies himself as a loyal **Bantu** (sworn personal warrior-retainer) of General Mallikarjuna Nayaka. This exemplifies the medieval Deccan institution of *Lenka / Bantu / Velaikkara* martial fidelity, where warriors dedicated their lives and endowed memorial lands for their fallen sovereign and commander.

### 7. Connection to the 77-Nayaka System & Gajapathi Martial Tradition
Following Rudrama Devi's martyrdom at Chandupatla, her grandson **Prataparudra II** reorganized the Kakatiya military into **77 Nayankara fiefs**—a martial institution that directly shaped the **Nayaka and Durgapati** fortress administration later maintained under the **Suryavamsha Gajapathis (RD-0019)**.

### 8. Community-Heritage & Professional Heritage Cross-References
This battlefield memorial inscription links directly to:
- **Category 1: Historical Warriors and Martial Heritage (CH-0017)** and **Category 8: Royal Heritage (CH-0024)**.
- **Vadderarajulu (CH-0013)**, **Vaddirajulu (CH-0012)**, and **Odiyaraju (CH-0048)** warrior-nayaka traditions in Telangana and Andhra Pradesh.

### 9. Verification Status
Inspected and published by **Dr. P.V. Parabrahma Sastry** and the **Department of Archaeology and Museums, Government of Telangana / Andhra Pradesh**, the Chandupatla stone stela is an indisputably verified primary epigraphic monument.

### 10. Chronological Summary & Conclusion
- **1261 CE (March)**: Malkapuram Inscription (KD-0021) of Queen Co-Regent Rudrama Devi.
- **1262–1289 CE**: Sovereign reign of Rani Rudrama Devi at Orugallu (Warangal).
- **27 November 1289 CE (Saka 1211)**: **Chandupatla Stone Inscription (KD-0022)** recording the battlefield martyrdom of Rani Rudrama Devi and General Mallikarjuna Nayaka; accession of Emperor Prataparudra II.`
  }
];

const MONARCH_INSCRIPTION_CAT_NAME: Record<LanguageCode, string> = make8Lang(
  'Gajapathi-Kings & Imperial Epigraphy Monographs',
  'गजपति राजा एवं साम्राज्यिक अभिलेख मोनोग्राफ',
  'గజపతి రాజులు & సామ్రాజ్య శాసన పరిశోధనా మోనోగ్రాఫ్‌లు',
  'ಗಜಪತಿ ಅರಸರು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯ ಶಾಸನ ಸಂಶೋಧನಾ ಪ್ರಬಂಧಗಳು',
  'கஜபதி மன்னர்கள் மற்றும் பேரரசு கல்வெட்டு ஆய்வுக் கட்டுரைகள்',
  'गजपती राजे आणि साम्राज्य शिलालेख शोधनिबंध',
  'ଗଜପତି ରାଜା ଓ ସାମ୍ରାଜ୍ୟ ଅଭିଲେଖ ଗବେଷଣା ନିବନ୍ଧ',
  'গজপতি রাজা ও সাম্রাজ্যিক শিলালিপি গবেষণা নিবন্ধ'
);

const REF_NUM_MAP_14: Record<string, string> = {
  fig_kapilendra_deva: 'HF-0011',
  fig_purushottama_deva: 'HF-0013',
  fig_prataparudra_deva: 'HF-0014',
  fig_hamvira_deva: 'HF-0012',
  fig_mukunda_deva: 'HF-0017',
  fig_anantavarman_chodaganga: 'HF-0009',
  fig_langula_narasimha: 'HF-0010',
  insc_veligalani_1458: 'IA-0007',
  insc_lingaraja_1452: 'IA-0006',
  insc_simhachalam_prataparudra: 'IA-0011',
  insc_anumakonda_1163: 'KD-0019',
  insc_motupalli_1244: 'KD-0020',
  insc_malkapuram_1261: 'KD-0021',
  insc_chandupatla_1289: 'KD-0022'
};

export const GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_METADATA: Record<string, ArticleStructuredMetadata> =
  Object.fromEntries(
    GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_ARTICLES.map(art => {
      const refNum = REF_NUM_MAP_14[art.id] || 'RD-0001';
      const isKakatiya = refNum.startsWith('KD-');
      const isInsc = art.id.startsWith('insc_');
      const meta8 = MONARCH_AND_INSCRIPTION_METADATA_8LANG[art.id];
      return [
        art.id,
        {
          refNumber: refNum,
          articleId: art.id,
          categoryCode: isInsc ? 'IA' : isKakatiya ? 'RD' : 'HF',
          categoryName: MONARCH_INSCRIPTION_CAT_NAME,
          subcategoryName: meta8?.subcategoryName || make8LangSame(art.original_title.replace(/^[A-Z]{2}-\d{4}\s*\|\s*/, '')),
          historicalPeriod: meta8?.historicalPeriod || make8LangSame(
            isKakatiya ? 'Kakatiya Imperial Era (1163–1289 CE)' : 'Imperial Ganga & Suryavamsha Gajapathi Era (1077–1568 CE)'
          ),
          approxDateRange: meta8?.approxDateRange || make8LangSame(
            isKakatiya ? '1163 CE – 1289 CE' : '1077 CE – 1568 CE'
          ),
          geographicalLocation: meta8?.geographicalLocation || make8LangSame(
            isKakatiya
              ? 'Anumakonda (Hanamkonda), Orugallu (Warangal), Motupalli, Malkapuram & Chandupatla'
              : 'Abhinava Varanasi Kataka (Cuttack), Puri, Konark, Bhubaneswar, Simhachalam, Kondavidu, Udayagiri & Srirangam'
          ),
          epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
          imageProvenance: {
            title: art.original_title.replace(/^[A-Z]{2}-\d{4}\s*\|\s*/, ''),
            caption: art.summary,
            period: isKakatiya ? '12th–13th Century CE' : '11th–16th Century CE',
            sourceOrProvenance: 'Archaeological Survey of India (ASI) / Epigraphia Indica Archival Collection',
            credit: 'Suryavamsha Odiyaraju Kshatriya Archival Collection',
            altText: art.original_title,
            visualType: 'Archival Photograph / Epigraphic Facsimile'
          },
          professionalHeritageCategories: getProfessionalHeritageCategoriesForArticle(art.id),
          communityCrossReferences: isKakatiya
            ? [
                {
                  communityId: 'comm_dir_13_vadderarajulu',
                  canonicalTerm: 'Vadderarajulu / Vaddirajulu / Odiyaraju Nayaka & Engineering Lineages (CH-0013)',
                  associationType: 'Documented Epigraphic / Gazetteer Association',
                  historicalPeriod: '12th – 16th Century CE',
                  relationshipSummary: make8Lang(
                    'Corroborated by Kakatiya tank-building (Dasavanda), Orugallu granite fortification, and 77-Nayaka martial records.',
                    'काकतीय जलाशय निर्माण (दशवंद), ओरुगल्लु पाषाण दुर्ग और 77-नायक सैन्य अभिलेखों द्वारा प्रमाणित।',
                    'కాకతీయ చెరువుల నిర్మాణం (దశవంద), ఓరుగల్లు రాతి కోట మరియు 77-నాయంకర సైనిక శాసనాల ద్వారా ధృవీకరించబడింది.',
                    'ಕಾಕತೀಯ ಕೆರೆ ನಿರ್ಮಾಣ, ಓರುಗಲ್ಲು ಕೋಟೆ ಮತ್ತು 77-ನಾಯಕರ ದಾಖಲೆಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.',
                    'காகதீய ஏரி கட்டுமானம், ஓருகல்லு கோட்டை மற்றும் 77-நாயக்கர் ஆவணங்களால் உறுதிப்படுத்தப்பட்டது.',
                    'काकतीय तलाव बांधणी, ओरुगल्लु किल्ला आणि ७७-नायक नोंदींद्वारे प्रमाणित.',
                    'କାକତୀୟ ଜଳାଶୟ ନିର୍ମାଣ, ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ ଓ ୭୭-ନାୟକ ଅଭିଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।',
                    'কাকতীয় জলাশয় নির্মাণ, ওরুর্গল্লু দুর্গ ও ৭৭-নায়ক নথির দ্বারা প্রমাণিত।'
                  ),
                  supportingRef: art.sources[0]?.title || 'Epigraphia Indica / Corpus of Telangana Inscriptions',
                  targetRoute: '/community-heritage?article=comm_dir_13_vadderarajulu'
                },
                {
                  communityId: 'comm_dir_10_vaddera',
                  canonicalTerm: 'Vaddera / Odde / Voddar Lithic & Hydraulic Specialists (CH-0010 / CH-0015)',
                  associationType: 'Documented Epigraphic / Gazetteer Association',
                  historicalPeriod: '11th – 16th Century CE',
                  relationshipSummary: make8Lang(
                    'Documented in the Malkapuram Inscription (1261 CE) and Kakatiya tank charters as master stone-quarry and reservoir engineers.',
                    'मलकापुरम शिलालेख (1261 ई.) और काकतीय तड़ाग अनुदानों में पाषाण-शिल्पी एवं जलाशय अभियंता के रूप में प्रमाणित।',
                    'మల్కాపురం శాసనం (1261 CE) మరియు కాకతీయ తటాక శాసనాలలో రాతి శిల్పులు మరియు జలాశయ ఇంజనీర్లుగా నమోదైంది.',
                    'ಮಲ್ಕಾಪುರಂ ಶಾಸನ (1261 CE) ಮತ್ತು ಕಾಕತೀಯ ಕೆರೆ ಶಾಸನಗಳಲ್ಲಿ ಶಿಲ್ಪಿಗಳಾಗಿ ದಾಖಲಾಗಿದೆ.',
                    'மல்காபுரம் கல்வெட்டு (கி.பி. 1261) மற்றும் காகதீய ஏரிச் சாசனங்களில் பதிவாகியுள்ளது.',
                    'मलकापुरम शिलालेख (१२६१ ई.) आणि काकतीय तलाव ताम्रपटांत नोंदवलेले शिल्पी.',
                    'ମଲକାପୁରମ ଶିଳାଲେଖ (୧୨୬୧ ଖ୍ରୀ.) ଓ କାକତୀୟ ଜଳାଶୟ ଶାସନରେ ପ୍ରମାଣିତ।',
                    'মলকাপুরম শিলালিপি (১২৬১ খ্রি.) ও কাকতীয় জলাশয় শাসনে প্রত্যয়িত।'
                  ),
                  supportingRef: 'Malkapuram Pillar Inscription (1261 CE, SII Vol. X, No. 395)',
                  targetRoute: '/community-heritage?article=comm_dir_10_vaddera'
                }
              ]
            : [
                {
                  communityId: 'comm_dir_03_odra_kshatriya',
                  canonicalTerm: 'Odra-Kshatriya / Odiyaraju / GajapathiRajulu (CH-0003 / CH-0005 / CH-0048)',
                  associationType: 'Documented Epigraphic / Gazetteer Association',
                  historicalPeriod: '11th – 16th Century CE',
                  relationshipSummary: make8Lang(
                    'Directly attested in Imperial Ganga and Suryavamsha Gajapathi royal charters, Dandapata governorships, and southern fortress garrisons.',
                    'पूर्वी गंग और सूर्यवंश गजपति ताम्रपत्रों, दंडपाट प्रशासन और दक्षिणी दुर्ग छावनियों में प्रत्यक्ष रूप से प्रमाणित।',
                    'తూర్పు గంగ మరియు సూర్యవంశ గజపతి తామ్రశాసనాలు, దండపాట పాలన మరియు దక్షిణ దుర్గ సైనిక దళాలలో ప్రత్యక్షంగా ధృవీకరించబడింది.',
                    'ಪೂರ್ವ ಗಂಗ ಮತ್ತು ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಶಾಸನಗಳು ಹಾಗೂ ದಕ್ಷಿಣ ಕೋಟೆ ಸೇನಾ ನೆಲೆಗಳಲ್ಲಿ ನೇರವಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ.',
                    'கீழைக் கங்க மற்றும் சூர்யவம்ச கஜபதி செப்பேடுகள் மற்றும் தென்னகக் கோட்டைப் படைகளில் உறுதிப்படுத்தப்பட்டுள்ளது.',
                    'पूर्व गंग आणि सूर्यवंश गजपती ताम्रपट तसेच दक्षिणेतील किल्ल्यांच्या छावण्यांमध्ये थेट प्रमाणित.',
                    'ପୂର୍ବ ଗଙ୍ଗ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ତାମ୍ରଶାସନ ତଥା ଦକ୍ଷିଣ ଦୁର୍ଗ ବାହିନୀରେ ପ୍ରମାଣିତ।',
                    'পূর্ব গঙ্গ ও সূর্যবংশী গজপতি তাম্রশাসন এবং দক্ষিণ দুর্গের সেনা ঘাঁটিতে সরাসরি প্রমাণিত।'
                  ),
                  supportingRef: art.sources[0]?.title || 'Veligalani Plates (1458 CE); R. Subrahmanyam (1957)',
                  targetRoute: '/community-heritage?article=comm_dir_03_odra_kshatriya'
                },
                {
                  communityId: 'comm_dir_07_od_paika',
                  canonicalTerm: 'OD-Paika / OD-Khandayath / KalingaRajulu Martial Corps (CH-0004 / CH-0007)',
                  associationType: 'Documented Epigraphic / Gazetteer Association',
                  historicalPeriod: '12th – 18th Century CE',
                  relationshipSummary: make8Lang(
                    'Hereditary military infantry, elephant-corps commanders, and Garhjat fort defenders of Odra-Kalinga.',
                    'ओड्र-कलिंग की वंशानुगत पाइक पैदल सेना, गजसेना नायक और गढ़जात दुर्ग रक्षक।',
                    'ఓడ్ర-కళింగ వంశపారంపర్య పైకా పదాతిదళం, గజసేన నాయకులు మరియు గఢ్‌జాత్ దుర్గ రక్షకులు.',
                    'ಓಡ್ರ-ಕಳಿಂಗದ ಪೈಕಾ ಪದಾತಿದಳ, ಗಜಸೇನಾ ನಾಯಕರು ಮತ್ತು ಕೋಟೆ ರಕ್ಷಕರು.',
                    'ஒட்டர-கலிங்கத்தின் பைக்கா காலாட்படை, யானைப்படைத் தளபதிகள் மற்றும் கோட்டைக் காவலர்கள்.',
                    'ओड्र-कलिंगाचे वंशपरंपरागत पाइक पायदळ, गजसेना नायक आणि दुर्ग रक्षक.',
                    'ଓଡ଼୍ର-କଳିଙ୍ଗର ବଂଶାନୁକ୍ରମିକ ପାଇକ ପଦାତିକ ବାହିନୀ, ଗଜସେନା ନାୟକ ଓ ଗଡ଼ ରକ୍ଷକ।',
                    'ওড্র-কলিঙ্গের বংশানুক্রমিক পাইক পদাতিক বাহিনী, গজসেনা নায়ক ও গড় রক্ষক।'
                  ),
                  supportingRef: 'Madala Panji; A. Stirling (1822); SII Vols. IV–VI',
                  targetRoute: '/community-heritage?article=comm_dir_07_od_paika'
                }
              ],
          relatedArticleIds: isKakatiya
            ? [
                'art_dyn_kakatiya_orugallu',
                'dyn_kakatiya_orugallu',
                'insc_anumakonda_1163',
                'insc_motupalli_1244',
                'insc_malkapuram_1261',
                'insc_chandupatla_1289'
              ].filter(x => x !== art.id)
            : [
                'art_gajapathi_kapilendra',
                'dyn_suryavamsha_gajapathi',
                'fig_kapilendra_deva',
                'fig_purushottama_deva',
                'fig_prataparudra_deva',
                'insc_veligalani_1458'
              ].filter(x => x !== art.id),
          relatedFigureIds: [
            'fig_kapilendra_deva',
            'fig_purushottama_deva',
            'fig_prataparudra_deva',
            'fig_hamvira_deva'
          ],
          relatedDynastyNames: isKakatiya
            ? ['Kakatiya Dynasty', 'Suryavamsha Gajapathi Dynasty']
            : ['Suryavamsha Gajapathi Dynasty', 'Eastern Ganga Dynasty', 'Bhoi / Chalukya-Gajapathi Dynasty']
        } as ArticleStructuredMetadata
      ];
    })
  );

const LOCALIZED_TITLES_14: Record<
  string,
  Record<'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn', string>
> = {
  fig_kapilendra_deva: {
    hi: 'HF-0011 | सम्राट कपिलेन्द्र देव गजपति (१४३४–१४६६ ई.): सूर्यवंश गजपति साम्राज्य के संस्थापक, सामरिक अभियान एवं राष्ट्र-देवता राज्यव्यवस्था',
    te: 'HF-0011 | సమ్రాట్ కపిలేంద్ర దేవ గజపతి (1434–1466 CE): సూర్యవంశ గజపతి సామ్రాజ్య స్థాపకుడు, దిగ్విజయ యాత్రలు మరియు రాష్ట్ర-దేవత రాజనీతి',
    kn: 'HF-0011 | ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವ ಗಜಪತಿ (1434–1466 CE): ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ ಸ್ಥಾಪಕ, ದಂಡಯಾತ್ರೆಗಳು ಮತ್ತು ರಾಷ್ಟ್ರ-ದೇವತಾ ರಾಜ್ಯವ್ಯವಸ್ಥೆ',
    ta: 'HF-0011 | சாம்ராட் கபிலேந்திர தேவ கஜபதி (1434–1466 CE): சூர்யவம்ச கஜபதி பேரரசின் நிறுவனர், படையெடுப்புகள் மற்றும் ராಷ್ಟ್ರ-தேவதா ஆட்சிமுறை',
    mr: 'HF-0011 | सम्राट कपिलेन्द्र देव गजपती (१४३४–१४६६ ई.): सूर्यवंश गजपती साम्राज्याचे संस्थापक, लष्करी मोहिमा आणि राष्ट्र-देवता राज्यव्यवस्था',
    or: 'HF-0011 | ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବ ଗଜପତି (୧୪୩୪–୧୪୬୬ ଖ୍ରୀ.ଅ.): ସୂର୍ଯ୍ୟବଂଶ ଗଜପତି ସାମ୍ରାଜ୍ୟର ପ୍ରତିଷ୍ଠାତା, ଦିগ୍‌ବିଜୟ ଅଭିଯାନ ଓ ରାଷ୍ଟ୍ର-ଦେବତା ରାଜ୍ୟବ୍ୟବସ୍ଥା',
    bn: 'HF-0011 | সম্রাট কপিলেন্দ্র দেব গজপতি (১৪৩৪–১৪৬৬ খ্রি.): সূর্যবংশ গজপতি সাম্রাজ্যের প্রতিষ্ঠাতা, দিগ্বিজয় অভিযান ও রাষ্ট্র-দেবতা রাষ্ট্রব্যবস্থা'
  },
  fig_purushottama_deva: {
    hi: 'HF-0013 | सम्राट पुरुषोत्तम देव गजपति (१४६६–१४९७ ई.): कोंडावीडु एवं उदयगिरि की पुनर्विजय, कांची-कावेरी अभियान एवं संस्कृत-ओड़िया साहित्य',
    te: 'HF-0013 | చక్రవర్తి పురుషోత్తమ దేవ గజపతి (1466–1497 CE): కొండవీడు & ఉదయగిరి పునర్విజయం, కంచి-కావేరి యాత్ర మరియు సాహిత్య పోషణ',
    kn: 'HF-0013 | ಸಾಮ್ರಾಟ್ ಪುರುಷೋತ್ತಮ ದೇವ ಗಜಪತಿ (1466–1497 CE): ಕೊಂಡವೀಡು ಮತ್ತು ಉದಯಗಿರಿ ಪುನರ್‌ವಿಜಯ, ಕಾಂಚಿ-ಕಾವೇರಿ ಅಭಿಯಾನ ಮತ್ತು ಸಾಹಿತ್ಯ ಪೋಷಣೆ',
    ta: 'HF-0013 | பேரரசர் புருஷோத்தம தேவ கஜபதி (1466–1497 CE): கொண்டவீடு & உதயகிரி மீட்பு, காஞ்சி-காவேரி படையெடுப்பு மற்றும் இலக்கியப் புரவலர்',
    mr: 'HF-0013 | सम्राट पुरुषोत्तम देव गजपती (१४६६–१४९७ ई.): कोंडावीडू व उदयगिरी पुनर्विजय, कांची-कावेरी मोहीम आणि साहित्य आश्रय',
    or: 'HF-0013 | ସମ୍ରାଟ ପୁରୁଷୋତ୍ତମ ଦେବ ଗଜପତି (୧୪୬୬–୧୪୯୭ ଖ୍ରୀ.ଅ.): କୋଣ୍ଡାଭିଡୁ ଓ ଉଦୟଗିରି ପୁନରୁଦ୍ଧାର, କାଞ୍ଚି-କାବେରୀ ଅଭିଯାନ ଓ ସାହିତ୍ୟ ପୃଷ୍ଠପୋଷକତା',
    bn: 'HF-0013 | সম্রাট পুরুষোত্তম দেব গজপতি (১৪৬৬–১৪৯৭ খ্রি.): কোন্ডাভিডু ও উদয়গিরি পুনরুদ্ধার, কাঞ্চি-কাবেরী অভিযান ও সাহিত্য পৃষ্ঠপোষকতা'
  },
  fig_prataparudra_deva: {
    hi: 'HF-0014 | सम्राट प्रतापरुद्र देव गजपति (१४९७–१५४० ई.): सरस्वती विलास विधि-संहिता, विजयनगर युद्ध एवं पंचसखा आध्यात्मिक पुनर्जागरण',
    te: 'HF-0014 | చక్రవర్తి ప్రతాపరుద్ర దేవ గజపతి (1497–1540 CE): సరస్వతీ విలాస న్యాయగ్రంథం, విజయనగర యుద్ధాలు మరియు పంచసఖ ఆధ్యాత్మిక పునరుజ్జీవనం',
    kn: 'HF-0014 | ಸಾಮ್ರಾಟ್ ಪ್ರತಾಪರುದ್ರ ದೇವ ಗಜಪತಿ (1497–1540 CE): ಸರಸ್ವತೀ ವಿಲಾಸ ನ್ಯಾಯಗ್ರಂಥ, ವಿಜಯನಗರ ಯುದ್ಧಗಳು ಮತ್ತು ಪಂಚಸಖ ಆಧ್ಯಾತ್ಮಿಕ ಪುನರುಜ್ಜೀವನ',
    ta: 'HF-0014 | பேரரசர் பிரதாபருத்ர தேவ கஜபதி (1497–1540 CE): சரஸ்வதி விலாச சட்ட நூல், விஜயநகரப் போர்கள் மற்றும் பஞ்சசகா ஆன்மீக மறுமலர்ச்சி',
    mr: 'HF-0014 | सम्राट प्रतापरुद्र देव गजपती (१४९७–१५४० ई.): सरस्वती विलास कायदा ग्रंथ, विजयनगर युद्धे आणि पंचसखा आध्यात्मिक पुनर्जागरण',
    or: 'HF-0014 | ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ ଗଜପତି (୧୪୯୭–୧୫୪୦ ଖ୍ରୀ.ଅ.): ସରସ୍ୱତୀ ବିଳାସ ଆଇନ ଗ୍ରନ୍ଥ, ବିଜୟନଗର ଯୁଦ୍ଧ ଓ ପଞ୍ଚସଖା ଆଧ୍ୟାତ୍ମିକ ନବଜାଗରଣ',
    bn: 'HF-0014 | সম্রাট প্রতাপরুদ্র দেব গজপতি (১৪৯৭–১৫৪০ খ্রি.): সরস্বতী বিলাস আইনগ্রন্থ, বিজয়নগর যুদ্ধ ও পঞ্চসখা আধ্যাত্মিক নবজাগরণ'
  },
  fig_hamvira_deva: {
    hi: 'HF-0012 | कुमार हम्मीर देव गजपति (१४५०–१४७६ ई.): ओरुगल्लु (वारंगल) से कावेरी (श्रीरंगम) तक दक्षिण दिग्विजय के सर्वोच्च सेनापति',
    te: 'HF-0012 | కుమార హంవీర దేవ గజపతి (1450–1476 CE): ఓరుగల్లు (వరంగల్) నుండి కావేరి (శ్రీరంగం) వరకు దక్షిణ దిగ్విజయ సర్వసైన్యాధ్యక్షుడు',
    kn: 'HF-0012 | ಕುಮಾರ ಹಂವೀರ ದೇವ ಗಜಪತಿ (1450–1476 CE): ಓರುಗಲ್ಲು (ವರಂಗಲ್) ನಿಂದ ಕಾವೇರಿ (ಶ್ರೀರಂಗಂ) ವರೆಗೆ ದಕ್ಷಿಣ ದಿಗ್ವಿಜಯದ ಮಹಾದಂಡನಾಯಕ',
    ta: 'HF-0012 | குமார ஹம்வீர தேவ கஜபதி (1450–1476 CE): ஓருகல்லு (வாரங்கல்) முதல் காவிரி (ஸ்ரீரங்கம்) வரை தட்சிண திக்விஜயத் தலைமைத் தளபதி',
    mr: 'HF-0012 | कुमार हम्मीर देव गजपती (१४५०–१४७६ ई.): ओरुगल्लु (वारंगल) ते कावेरी (श्रीरंगम) पर्यंत दक्षिण दिग्विजयाचे सरसेनापती',
    or: 'HF-0012 | କୁମାର ହମ୍ବୀର ଦେବ ଗଜପତି (୧୪୫୦–୧୪୭୬ ଖ୍ରୀ.ଅ.): ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ଠାରୁ କାବେରୀ (ଶ୍ରୀରଙ୍ଗମ) ପର୍ଯ୍ୟନ୍ତ ଦକ୍ଷିଣ ଦିଗ୍‌ବିଜୟର ପ୍ରଧାନ ସେନାପତି',
    bn: 'HF-0012 | কুমার হাম্বীর দেব গজপতি (১৪৫০–১৪৭৬ খ্রি.): ওরুর্গল্লু (ওয়ারঙ্গল) থেকে কাবেরী (শ্রীরঙ্গম) পর্যন্ত দক্ষিণ দিগ্বিজয়ের প্রধান সেনাপতি'
  },
  fig_mukunda_deva: {
    hi: 'HF-0017 | महाराजा मुकुंद देव हरिचंदन (१५५९–१५६८ ई.): मध्यकालीन ओडिशा के अंतिम स्वतंत्र सम्राट, अकबर से संधि एवं त्रिवेणी घाट',
    te: 'HF-0017 | మహారాజా ముకుంద దేవ హరిచందన (1559–1568 CE): మధ్యయుగ ఒడిశా చివరి స్వతంత్ర చక్రవర్తి, అక్బర్‌తో మైత్రి మరియు త్రివేణి ఘాట్ నిర్మాణం',
    kn: 'HF-0017 | ಮಹಾರಾಜ ಮುಕುಂದ ದೇವ ಹರಿಚಂದನ (1559–1568 CE): ಮಧ್ಯಯುಗೀನ ಒಡಿಶಾದ ಕೊನೆಯ ಸ್ವತಂತ್ರ ಸಾಮ್ರಾಟ, ಅಕ್ಬರ್ ಜೊತೆ ಮೈತ್ರಿ ಮತ್ತು ತ್ರಿವೇಣಿ ಘಾಟ್',
    ta: 'HF-0017 | மகாராஜா முகுந்த தேவ ஹரிசந்தன (1559–1568 CE): இடைக்கால ஒடிசாவின் கடைசி சுதந்திரப் பேரரசர், அக்பருடன் கூட்டணி மற்றும் திரிவேணி படித்துறை',
    mr: 'HF-0017 | महाराजा मुकुंद देव हरिचंदन (१५५९–१५६८ ई.): मध्ययुगीन ओडिशाचे अंतिम स्वतंत्र सम्राट, अकबराशी युती आणि त्रिवेणी घाट',
    or: 'HF-0017 | ମହାରାଜା ମୁକୁନ୍ଦ ଦେବ ହରିଚନ୍ଦନ (୧୫୫୯–୧୫୬୮ ଖ୍ରୀ.ଅ.): ମଧ୍ୟଯୁଗୀୟ ଓଡ଼ିଶାର ଶେଷ ସ୍ୱାଧୀନ ସମ୍ରାଟ, ଆକବରଙ୍କ ସହ ମৈତ୍ରୀ ଓ ତ୍ରିବେଣୀ ଘାଟ',
    bn: 'HF-0017 | মহারাজা মুকুন্দ দেব হরিচন্দন (১৫৫৯–১৫৬৮ খ্রি.): মধ্যযুগীয় ওড়িশার শেষ স্বাধীন সম্রাট, আকবরের সাথে মৈত্রী ও ত্রিবেণী ঘাট'
  },
  fig_anantavarman_chodaganga: {
    hi: 'HF-0009 | सम्राट अनंतवर्मन चोडगंग देव (१०७७–११४७ ई.): कलिंग, उत्कल एवं ओड्र देश के एकीकरणकर्ता तथा पुरी श्री जगन्नाथ मंदिर के निर्माता',
    te: 'HF-0009 | చక్రవర్తి అనంతవర్మ చోడగంగ దేవుడు (1077–1147 CE): కళింగ, ఉత్కళ & ఓడ్ర దేశ ఏకీకరణకర్త మరియు పూరీ శ్రీ జగన్నాథ దేవాలయ నిర్మాత',
    kn: 'HF-0009 | ಸಾಮ್ರಾಟ್ ಅನಂತವರ್ಮನ್ ಚೋಡಗಂಗ ದೇವ (1077–1147 CE): ಕಳಿಂಗ, ಉತ್ಕಲ ಮತ್ತು ಓಡ್ರ ದೇಶಗಳ ಏಕೀಕರಣಕರ್ತ ಹಾಗೂ ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ನಿರ್ಮಾತೃ',
    ta: 'HF-0009 | பேரரசர் அனந்தவர்மன் சோடகங்க தேவர் (1077–1147 CE): கலிங்கம், உத்கலம் & ஒட்டர தேசத்தை இணைத்தவரும் பூரி ஜெகந்நாதர் கோயில் திருப்பணியாளரும்',
    mr: 'HF-0009 | सम्राट अनंतवर्मन चोडगंग देव (१०७७–११४७ ई.): कलिंग, उत्कल व ओड्र देशाचे एकीकरणकर्ते आणि पुरी श्री जगन्नाथ मंदिराचे निर्माते',
    or: 'HF-0009 | ସମ୍ରାଟ ଅନନ୍ତବର୍ମନ ଚୋଡ଼ଗଙ୍ଗ ଦେବ (୧୦୭୭–୧୧୪୭ ଖ୍ରୀ.ଅ.): କଳିଙ୍ଗ, ଉତ୍କଳ ଓ ଓଡ଼୍ର ଦେଶର ଏକୀକରଣକର୍ତ୍ତା ତଥା ପୁରୀ ଶ୍ରୀ ଜଗନ୍ନାଥ ମନ୍ଦିରର ନିର୍ମାତା',
    bn: 'HF-0009 | সম্রাট অনন্তবর্মন চোড়গঙ্গ দেব (১০৭৭–১১৪৭ খ্রি.): কলিঙ্গ, উৎকল ও ওড্র দেশের একীকরণকর্তা এবং পুরী শ্রীজগন্নাথ মন্দিরের নির্মাতা'
  },
  fig_langula_narasimha: {
    hi: 'HF-0010 | सम्राट लांगुला नरसिंहदेव प्रथम (१२३८–१२६४ ई.): लखनौती विजेता, कोणार्क सूर्य मंदिर के निर्माता एवं प्रथम अभिलेखीय "गजपति"',
    te: 'HF-0010 | చక్రవర్తి లాంగుల నరసింహదేవుడు I (1238–1264 CE): లఖ్నౌతీ విజేత, కోణార్క్ సూర్య దేవాలయ నిర్మాత మరియు తొలి శాసన "గజపతి"',
    kn: 'HF-0010 | ಸಾಮ್ರಾಟ್ ಲಾಂಗುಲ ನರಸಿಂಹದೇವ I (1238–1264 CE): ಲಖ್ನೌತಿ ವಿಜೇತ, ಕೋಣಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ ನಿರ್ಮಾತೃ ಮತ್ತು ಮೊದಲ ಶಾಸನಬದ್ಧ "ಗಜಪತಿ"',
    ta: 'HF-0010 | பேரரசர் லாங்குல நரசிம்மதேவர் I (1238–1264 CE): லக்னௌதி வெற்றியாளர், கோனார்க் சூரியக் கோயில் சிற்பி மற்றும் முதல் கல்வெட்டு "கஜபதி"',
    mr: 'HF-0010 | सम्राट लांगुला नरसिंहदेव प्रथम (१२३८–१२६४ ई.): लखनौती विजेते, कोणार्क सूर्य मंदिराचे निर्माते आणि पहिले शिलालेखीय "गजपती"',
    or: 'HF-0010 | ସମ୍ରାଟ ଲାଙ୍ଗୁଳା ନରସିଂହଦେବ ୧ମ (୧୨୩୮–୧୨୬୪ ଖ୍ରୀ.ଅ.): ଲଖନୌତି ବିଜେତା, କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିରର ନିର୍ମାତା ଓ ପ୍ରଥମ ଅଭିଲେଖୀୟ "ଗଜପତି"',
    bn: 'HF-0010 | সম্রাট লাঙ্গুলা নরসিংহদেব ১ম (১২৩৮–১২৬৪ খ্রি.): লখনৌতি বিজেতা, কোনার্ক সূর্য মন্দিরের নির্মাতা ও প্রথম লিপিতাত্ত্বিক "গজপতি"'
  },
  insc_veligalani_1458: {
    hi: 'IA-0007 | सम्राट कपिलेन्द्र देव का वेलिगलनी ताम्रपत्र अनुदान (शक १३८० / १४५८ ई.): कृष्णा नदी तट से जारी त्रिभाषी साम्राज्यिक चार्टर',
    te: 'IA-0007 | సమ్రాట్ కపిలేంద్ర దేవుని వెలిగలని తామ్రశాసనం (శక 1380 / 1458 CE): కృష్ణా నదీ తీరం నుండి జారీ చేసిన త్రిభాషా సామ్రాజ్య శాసనం',
    kn: 'IA-0007 | ಸಾಮ್ರಾಟ್ ಕಪಿಲೇಂದ್ರ ದೇವನ ವೆಲಿಗಲನಿ ತಾಮ್ರಶಾಸನ (ಶಕ 1380 / 1458 CE): ಕೃಷ್ಣಾ ನದಿ ತೀರದಿಂದ ಹೊರಡಿಸಿದ ತ್ರಿಭಾಷಾ ಸಾಮ್ರಾಜ್ಯ ಶಾಸನ',
    ta: 'IA-0007 | சாம்ராட் கபிலேந்திர தேவரின் வெலிகலானி செப்பேடு (சக 1380 / 1458 CE): கிருஷ்ணா நதிக்கரையில் வெளியிடப்பட்ட மும்மொழிப் பேரரசுச் சாசனம்',
    mr: 'IA-0007 | सम्राट कपिलेन्द्र देवांचा वेलिगलनी ताम्रपट (शक १३८० / १४५८ ई.): कृष्णा नदीकाठावरून जारी केलेली त्रिभाषिक राजसनद',
    or: 'IA-0007 | ସମ୍ରାଟ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଭେଲିଗାଲାନି ତାମ୍ରଶାସନ (ଶକ ୧୩୮୦ / ୧୪୫୮ ଖ୍ରୀ.ଅ.): କୃଷ୍ଣା ନଦୀ ତீரରୁ ଜାରି ତ୍ରିଭାଷୀ ସାମ୍ରାଜ୍ୟିକ ସନନ୍ଦ',
    bn: 'IA-0007 | সম্রাট কপিলেন্দ্র দেবের ভেলিগালানি তাম্রশাসন (শক ১৩৮০ / ১৪৫৮ খ্রি.): কৃষ্ণা নদীর তীর থেকে জারি করা ত্রিভাষিক সাম্রাজ্যিক সনদ'
  },
  insc_lingaraja_1452: {
    hi: 'IA-0006 | भुवनेश्वर लिंगराज मंदिर शिलालेख (कपिलेन्द्र देव, १४३८–१४५२ ई.): प्रारंभिक ओड़िया राजकीय उद्घोषणा एवं राष्ट्र-देवता विधान',
    te: 'IA-0006 | భువనేశ్వర్ లింగరాజ దేవాలయ శిలాశాసనం (కపిలేంద్ర దేవ, 1438–1452 CE): తొలి ఒడియా రాజ ప్రకటన మరియు రాష్ట్ర-దేవత శాసనం',
    kn: 'IA-0006 | ಭುವನೇಶ್ವರ ಲಿಂಗರಾಜ ದೇವಾಲಯದ ಶಾಸನ (ಕಪಿಲೇಂದ್ರ ದೇವ, 1438–1452 CE): ಆರಂಭಿಕ ಒಡಿಯಾ ರಾಜ ಘೋಷಣೆ ಮತ್ತು ರಾಷ್ಟ್ರ-ದೇವತಾ ಶಾಸನ',
    ta: 'IA-0006 | புவனேஸ்வர் லிங்கராஜர் கோயில் கல்வெட்டு (கபிலேந்திர தேவர், 1438–1452 CE): தொடக்க ஒடிய அரசப் பிரகடனம் மற்றும் ராಷ್ಟ್ರ-தேவதா ஆணை',
    mr: 'IA-0006 | भुवनेश्वर लिंगराज मंदिर शिलालेख (कपिलेन्द्र देव, १४३८–१४५२ ई.): प्रारंभिक ओडिया राजकीय जाहीरनामा आणि राष्ट्र-देवता विधान',
    or: 'IA-0006 | ଭୁବନେଶ୍ୱର ଲିଙ୍ଗରାଜ ମନ୍ଦିର ଶିଳାଲେଖ (କପିଳେନ୍ଦ୍ର ଦେବ, ୧୪୩୮–୧୪୫୨ ଖ୍ରୀ.ଅ.): ପ୍ରାରମ୍ଭିକ ଓଡ଼ିଆ ରାଜକୀୟ ଘୋଷଣା ଓ ରାଷ୍ଟ୍ର-ଦେବତା ବିଧାନ',
    bn: 'IA-0006 | ভুবনেশ্বর লিঙ্গরাজ মন্দির শিলালিপি (কপিলেন্দ্র দেব, ১৪৩৮–১৪৫২ খ্রি.): প্রারମ୍ଭিক ওড়িয়া রাজকীয় ঘোষণা ও রাষ্ট্র-দেবতা বিধান'
  },
  insc_simhachalam_prataparudra: {
    hi: 'IA-0011 | सम्राट प्रतापरुद्र देव का सिंहाचलम स्तंभ शिलालेख (शक १४३८ / १५१६ ई.): कलिंग अभिलेख एवं श्री वराह लक्ष्मी नरसिंह दान-शासन',
    te: 'IA-0011 | చక్రవర్తి ప్రతాపరుద్ర దేవుని సింహాచలం స్తంభ శాసనం (శక 1438 / 1516 CE): కళింగ శాసన ఆధారం మరియు శ్రీ వరాహ లక్ష్మీ నరసింహ స్వామి దాన శాసనం',
    kn: 'IA-0011 | ಸಾಮ್ರಾಟ್ ಪ್ರತಾಪರುದ್ರ ದೇವನ ಸಿಂಹಾಚಲಂ ಸ್ತಂಭ ಶಾಸನ (ಶಕ 1438 / 1516 CE): ಕಳಿಂಗ ಶಾಸನ ಮತ್ತು ಶ್ರೀ ವರಾಹ ಲಕ್ಷ್ಮೀ ನರಸಿಂಹ ದಾನ ಶಾಸನ',
    ta: 'IA-0011 | பேரரசர் பிரதாபருத்ர தேவரின் சிம்மாசலம் தூண் கல்வெட்டு (சக 1438 / 1516 CE): கலிங்கக் கல்வெட்டு மற்றும் வராக லட்சுமி நரசிம்மர் கொடைச் சாசனம்',
    mr: 'IA-0011 | सम्राट प्रतापरुद्र देवांचा सिंहाचलम स्तंभ शिलालेख (शक १४३८ / १५१६ ई.): कलिंग शिलालेख आणि श्री वराह लक्ष्मी नरसिंह दान-शासन',
    or: 'IA-0011 | ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବଙ୍କ ସିଂହାଚଳମ ସ୍ତମ୍ଭ ଶିଳାଲେଖ (ଶକ ୧୪୩୮ / ୧୫୧୬ ଖ୍ରୀ.ଅ.): କଳିଙ୍ଗ ଅଭିଲେଖ ଓ ଶ୍ରୀ ବରାହ ଲକ୍ଷ୍ମୀ ନରସିଂହ ଦାନ-ଶାସନ',
    bn: 'IA-0011 | সম্রাট প্রতাপরুদ্র দেবের সিংহাচলম স্তম্ভ শিলালিপি (শক ১৪৩৮ / ১৫১৬ খ্রি.): কলিঙ্গ লিপি ও শ্রী বরাহ লক্ষ্মী নরসিংহ দান-শাসন'
  },
  insc_anumakonda_1163: {
    hi: 'KD-0019 | रुद्रदेव का अनमकोंडा सहस्र-स्तंभ मंदिर शिलालेख (शक १०८४ / ११६३ ई.): काकतीय साम्राज्यिक संप्रभुता की ऐतिहासिक उद्घोषणा',
    te: 'KD-0019 | రుద్రదేవుని అనుమకొండ వేయిస్తంభాల గుడి శిలాశాసనం (శక 1084 / 1163 CE): కాకతీయ సామ్రాజ్య సార్వభౌమ స్వాతంత్ర్య ప్రకటన',
    kn: 'KD-0019 | ರುದ್ರದೇವನ ಅನುಮಕೊಂಡ ಸಾವಿರ ಕಂಬಗಳ ದೇವಾಲಯದ ಶಾಸನ (ಶಕ 1084 / 1163 CE): ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯದ ಸಾರ್ವಭೌಮ ಸ್ವಾತಂತ್ರ್ಯ ಘೋಷಣೆ',
    ta: 'KD-0019 | உருத்திரதேவரின் அனுமகொண்டா ஆயிரம் தூண் கோயில் கல்வெட்டு (சக 1084 / 1163 CE): காகதீயப் பேரரசின் இறையாண்மைப் பிரகடனம்',
    mr: 'KD-0019 | रुद्रदेवाचा अनमकोंडा सहस्र-स्तंभ मंदिर शिलालेख (शक १०८४ / ११६३ ई.): काकतीय साम्राज्य सार्वभौमत्वाची ऐतिहासिक घोषणा',
    or: 'KD-0019 | ରୁଦ୍ରଦେବଙ୍କ ଅନୁମକୋଣ୍ଡା ସହସ୍ର-ସ୍ତମ୍ଭ ମନ୍ଦିର ଶିଳାଲେଖ (ଶକ ୧୦୮୪ / ୧୧୬୩ ଖ୍ରୀ.ଅ.): କାକତୀୟ ସାମ୍ରାଜ୍ୟ ସାର୍ବଭୌମତ୍ୱର ଘୋଷଣା',
    bn: 'KD-0019 | রুদ্রদেবের অনুমকোণ্ডা সহস্র-স্তম্ভ মন্দির শিলালিপি (শক ১০৮৪ / ১১৬৩ খ্রি.): কাকতীয় সাম্রাজ্যিক সার্বভৌমত্বের ঘোষণা'
  },
  insc_motupalli_1244: {
    hi: 'KD-0020 | सम्राट गणपति देव का मोटुपल्ली अभय-शासन स्तंभ शिलालेख (शक ११६६ / १२४४ ई.): समुद्री व्यापार सुरक्षा चार्टर एवं अंतर्राष्ट्रीय शुल्क विधान',
    te: 'KD-0020 | చక్రవర్తి గణపతి దేవుని మోటుపల్లి అభయ శాసనం (శక 1166 / 1244 CE): సముద్ర వాణిజ్య రక్షణ చార్టర్ మరియు అంతర్జాతీయ సుంకాల చట్టం',
    kn: 'KD-0020 | ಸಾಮ್ರಾಟ್ ಗಣಪತಿ ದೇವನ ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (ಶಕ 1166 / 1244 CE): ಕಡಲ ವಾಣಿಜ್ಯ ಸುರಕ್ಷತಾ ಸನ್ನದು ಮತ್ತು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಸುಂಕ ವಿಧಾನ',
    ta: 'KD-0020 | பேரரசர் கணபதி தேவரின் மோட்டுப்பள்ளி அபய சாசனம் (சக 1166 / 1244 CE): கடல்சார் வணிகப் பாதுகாப்புச் சாசனம் மற்றும் சுங்கச் சட்டம்',
    mr: 'KD-0020 | सम्राट गणपती देवाचा मोटुपल्ली अभय-शासन स्तंभ शिलालेख (शक ११६६ / १२४४ ई.): सागरी व्यापार सुरक्षा सनद आणि आंतरराष्ट्रीय जकात कायदा',
    or: 'KD-0020 | ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ମୋଟୁପଲ୍ଲୀ ଅଭୟ-ଶାସନ ସ୍ତମ୍ଭ ଶିଳାଲେଖ (ଶକ ୧୧୬୬ / ୧୨୪୪ ଖ୍ରୀ.ଅ.): ସାମୁଦ୍ରିକ ବାଣିଜ୍ୟ ସୁରକ୍ଷା ସନନ୍ଦ',
    bn: 'KD-0020 | সম্রাট গণপতি দেবের মোতুপল্লী অভয়-শাসন স্তম্ভ শিলালিপি (শক ১১৬৬ / ১২৪৪ খ্রি.): সামুদ্রিক বাণিজ্য নিরাপত্তা সনদ ও শুল্ক বিধান'
  },
  insc_malkapuram_1261: {
    hi: 'KD-0021 | गणपति देव एवं रानी रुद्रमा देवी का मलकापुरम स्तंभ शिलालेख (शक ११८३ / १२६१ ई.): विश्वेश्वर गोलकी मठ, विश्वविद्यालय एवं प्रसूति-शाला चिकित्सालय',
    te: 'KD-0021 | గణపతి దేవుడు & రాణి రుద్రమదేవి మల్కాపురం స్తంభ శాసనం (శక 1183 / 1261 CE): విశ్వేశ్వర గోళకీ మఠం, విశ్వవిద్యాలయం మరియు ప్రసూతి వైద్యశాల',
    kn: 'KD-0021 | ಗಣಪತಿ ದೇವ ಮತ್ತು ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ಮಲ್ಕಾಪುರಂ ಸ್ತಂಭ ಶಾಸನ (ಶಕ 1183 / 1261 CE): ವಿಶ್ವೇಶ್ವರ ಗೋಳಕಿ ಮಠ, ವಿಶ್ವವಿದ್ಯಾಲಯ ಮತ್ತು ಪ್ರಸೂತಿ ಆಸ್ಪತ್ರೆ',
    ta: 'KD-0021 | கணபதி தேவர் & ராணி ருத்ரமாதேவியின் மல்காபுரம் தூண் கல்வெட்டு (சக 1183 / 1261 CE): விஸ்வேஸ்வர கோளகி மடம், பல்கலைக்கழகம் மற்றும் மகப்பேறு மருத்துவமனை',
    mr: 'KD-0021 | गणपती देव व राणी रुद्रमा देवी यांचा मलकापुरम स्तंभ शिलालेख (शक ११८३ / १२६१ ई.): विश्वेश्वर गोलकी मठ, विद्यापीठ आणि प्रसूती रुग्णालय',
    or: 'KD-0021 | ଗଣପତି ଦେବ ଓ ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ମଲକାପୁରମ ସ୍ତମ୍ଭ ଶିଳାଲେଖ (ଶକ ୧୧୮୩ / ୧୨୬୧ ଖ୍ରୀ.ଅ.): ବିଶ୍ୱେଶ୍ୱର ଗୋଳകୀ ମଠ, ବିଶ୍ୱବିଦ୍ୟାଳୟ ଓ ପ୍ରସୂତି ଚିକିତ୍ସାଳୟ',
    bn: 'KD-0021 | গণপতি দেব ও রানি রুদ্রমা দেবীর মলকাপুরম স্তম্ভ শিলালিপি (শক ১১৮৩ / ১২৬১ খ্রি.): বিশ্বেস্বর গোলকী মঠ, বিশ্ববিদ্যালয় ও প্রসূতি হাসপাতাল'
  },
  insc_chandupatla_1289: {
    hi: 'KD-0022 | पुव्वुला मुम्मडि का चंदुपट्ला शिलालेख (नवंबर १२८९ ई.): रणभूमि में वीरांगना रानी रुद्रमा देवी एवं सेनापति मल्लिकार्जुन नायक का बलिदान',
    te: 'KD-0022 | పువ్వుల ముమ్మడి చందుపట్ల శిలాశాసనం (నవంబర్ 1289 CE): రణరంగంలో వీరనారి రాణి రుద్రమదేవి మరియు సేనాని మల్లికార్జున నాయకుని వీరమరణం',
    kn: 'KD-0022 | ಪುవ్వುಲ ಮುಮ್ಮಡಿಯ ಚಂದುಪಟ್ಲ ಶಾಸನ (ನವೆಂಬರ್ 1289 CE): ರಣರಂಗದಲ್ಲಿ ರಾಣಿ ರುದ್ರಮಾದೇವಿ ಮತ್ತು ಸೇನಾನಿ ಮಲ್ಲಿಕಾರ್ಜುನ ನಾಯಕನ ವೀರಮರಣ',
    ta: 'KD-0022 | புவ்வுல மும்மடியின் சந்துபட்லா கல்வெட்டு (நவம்பர் 1289 CE): போர்க்களத்தில் ராணி ருத்ரமாதேவி மற்றும் தளபதி மல்லிகார்ஜுன நாயக்கரின் வீரமரணம்',
    mr: 'KD-0022 | पुव्वुला मुम्मडीचा चंदुपट्ला शिलालेख (नोव्हेंबर १२८९ ई.): रणांगणावर राणी रुद्रमा देवी आणि सेनापती मल्लिकार्जुन नायक यांचे वीरमरण',
    or: 'KD-0022 | ପୁବ୍ବୁଲା ମୁମ୍ମଡ଼ିଙ୍କ ଚନ୍ଦୁପଟ୍‌ଲା ଶିଳାଲେଖ (ନଭେମ୍ବର ୧୨୮୯ ଖ୍ରୀ.ଅ.): ରଣକ୍ଷେତ୍ରରେ ରାଣୀ ରୁଦ୍ରମା ଦେବୀ ଓ ସେନାପତି ମଲ୍ଲିକାର୍ଜୁନ ନାୟକଙ୍କ ବୀରଗତି',
    bn: 'KD-0022 | পুব্বুলা মুম্মডির চান্দুপটলা শিলালিপি (নভেম্বর ১২৮৯ খ্রি.): রণক্ষেত্রে রানি রুদ্রমা দেবী ও সেনাপতি মল্লিকার্জুন নায়কের বীরগতি'
  }
};

const CHAPTER_HEADINGS_BY_LANG: Record<
  'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn',
  string[]
> = {
  hi: [
    '१. प्रस्तावना एवं ऐतिहासिक पहचान',
    '२. ऐतिहासिक पृष्ठभूमि, राजवंशीय मूल एवं प्रारंभिक काल',
    '३. राज्याभिषेक, प्रशासनिक सुधार एवं संप्रभुता',
    '४. सामरिक अभियान एवं क्षेत्रीय विस्तार',
    '५. किलेबंदी, सैन्य संगठन एवं प्रांतीय शासन',
    '६. प्रमुख अभिलेखीय साक्ष्य एवं ताम्रपत्र अनुदान',
    '७. सांस्कृतिक, साहित्यिक एवं मंदिर स्थापत्य योगदान',
    '८. ७६ सामुदायिक नाम एवं ९ व्यावसायिक विरासत श्रेणियाँ (द्वि-दिशात्मक संदर्भ)',
    '९. इतिहासलेखन मूल्यांकन: प्रमाणित तथ्य बनाम लोक-परंपरा',
    '१०. ऐतिहासिक कालक्रम एवं साक्ष्य-आधारित निष्कर्ष'
  ],
  te: [
    '1. ఉపోద్ఘాతం మరియు చారిత్రక గుర్తింపు',
    '2. చారిత్రక నేపథ్యం, రాజవంశ మూలాలు మరియు ప్రారంభ కాలం',
    '3. పట్టాభిషేకం, పరిపాలనా సంస్కరణలు మరియు సార్వభౌమాధికారం',
    '4. సైనిక దండయాత్రలు మరియు సామ్రాజ్య విస్తరణ',
    '5. దుర్గ నిర్మాణాలు, సైనిక వ్యవస్థ మరియు ప్రాంతీయ పాలన',
    '6. ప్రధాన శిలాశాసన మరియు తామ్రపత్ర ఆధారాలు',
    '7. సాంస్కృతిక, సాహిత్య మరియు దేవాలయ వాస్తుశిల్ప సేవలు',
    '8. 76 కమ్యూనిటీ పేర్లు & 9 ప్రొఫెషనల్ హెరిటేజ్ వర్గాల ద్విముఖ అనుసంధానం',
    '9. చారిత్రక విశ్లేషణ: శాసన వాస్తవాలు మరియు సాంప్రదాయ కథనాల విభజన',
    '10. చారిత్రక కాలరేఖ మరియు ఆధార సహిత ముగింపు'
  ],
  kn: [
    '1. ಪೀಠಿಕೆ ಮತ್ತು ಐತಿಹಾಸಿಕ ಗುರುತು',
    '2. ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ, ರಾಜವಂಶದ ಮೂಲ ಮತ್ತು ಆರಂಭಿಕ ಕಾಲ',
    '3. ಪಟ್ಟಾಭಿಷೇಕ, ಆಡಳಿತ ಸುಧಾರಣೆಗಳು ಮತ್ತು ಸಾರ್ವಭೌಮತ್ವ',
    '4. ಸೇನಾ ದಂಡಯಾತ್ರೆಗಳು ಮತ್ತು ಸಾಮ್ರಾಜ್ಯ ವಿಸ್ತರಣೆ',
    '5. ಕೋಟೆ ನಿರ್ಮಾಣ, ಸೇನಾ ಸಂಘಟನೆ ಮತ್ತು ಪ್ರಾಂತೀಯ ಆಡಳಿತ',
    '6. ಪ್ರಮುಖ ಶಾಸನ ಮತ್ತು ತಾಮ್ರಪತ್ರ ಆಧಾರಗಳು',
    '7. ಸಾಂಸ್ಕೃತಿಕ, ಸಾಹಿತ್ಯಿಕ ಮತ್ತು ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಕೊಡುಗೆಗಳು',
    '8. 76 ಸಮುದಾಯ ಹೆಸರುಗಳು ಮತ್ತು 9 ವೃತ್ತಿಪರ ಪರಂಪರೆ ವರ್ಗಗಳ ದ್ವಿಮುಖ ಉಲ್ಲೇಖ',
    '9. ಇತಿಹಾಸಲೇಖನ ಮೌಲ್ಯಮಾಪನ: ದೃಢೀಕೃತ ಶಾಸನ ಸತ್ಯಗಳು ಮತ್ತು ಪರಂಪರೆ',
    '10. ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ ಮತ್ತು ಆಧಾರಸಹಿತ ಉಪಸಂಹಾರ'
  ],
  ta: [
    '1. அறிமுகம் மற்றும் வரலாற்று அடையாளம்',
    '2. வரலாற்றுப் பின்னணி, வம்சத் தோற்றம் மற்றும் தொடக்க காலம்',
    '3. முடிசூட்டு விழா, நிர்வாகச் சீர்திருத்தங்கள் மற்றும் இறையாண்மை',
    '4. ராணுவப் படையெடுப்புகள் மற்றும் பேரரசு விரிவாக்கம்',
    '5. கோட்டைக் கட்டமைப்புகள், படை அமைப்பு மற்றும் மாகாண ஆட்சி',
    '6. முதன்மைக் கல்வெட்டு மற்றும் செப்பேட்டுச் சான்றுகள்',
    '7. பண்பாட்டு, இலக்கிய மற்றும் கோயில் கட்டடக்கலைப் பங்களிப்புகள்',
    '8. 76 சமூகப் பெயர்கள் & 9 தொழில்முறை பாரம்பரிய வகைகளின் இருவழி இணைப்பு',
    '9. வரலாற்று ஆய்வு மதிப்பீடு: கல்வெட்டு உண்மைகள் மற்றும் மரபுகள்',
    '10. வரலாற்றுக் காலவரிசை மற்றும் சான்று சார்ந்த முடிவுரை'
  ],
  mr: [
    '१. प्रस्तावना आणि ऐतिहासिक ओळख',
    '२. ऐतिहासिक पार्श्वभूमी, राजवंश मूळ आणि प्रारंभिक काळ',
    '३. राज्याभिषेक, प्रशासकीय सुधारणा आणि सार्वभौमत्व',
    '४. लष्करी मोहिमा आणि साम्राज्य विस्तार',
    '५. दुर्ग बांधणी, लष्करी संघटना आणि प्रांतीय प्रशासन',
    '६. प्रमुख शिलालेख आणि ताम्रपट पुरावे',
    '७. सांस्कृतिक, साहित्यिक आणि मंदिर स्थापत्य योगदान',
    '८. ७६ समुदाय नावे आणि ९ व्यावसायिक वारसा श्रेणींचे द्वि-दिशात्मक संदर्भ',
    '९. इतिहासलेखन मूल्यमापन: प्रमाणित शिलालेखीय तथ्ये आणि परंपरा',
    '१०. ऐतिहासिक कालक्रम आणि पुराव्यावर आधारित निष्कर्ष'
  ],
  or: [
    '୧. ଉପକ୍ରମଣିକା ଓ ଐତିହାସିକ ପରିଚୟ',
    '୨. ଐତିହାସିକ ପୃଷ୍ଠଭୂମି, ରାଜବଂଶୀୟ ମୂଳ ଓ ପ୍ରାରମ୍ଭିକ କାଳ',
    '୩. ରାଜ୍ୟାଭିଷେକ, ପ୍ରଶାସନିକ ସଂସ୍କାର ଓ ସାର୍ବଭୌମତ୍ୱ',
    '୪. ସାମରିକ ଅଭିଯାନ ଓ ସାମ୍ରାଜ୍ୟ ବିସ୍ତାର',
    '୫. ଦୁର୍ଗ ନିର୍ମାଣ, ସୈନ୍ୟ ସଂଗଠନ ଓ ପ୍ରାଦେଶିକ ଶାସନ',
    '୬. ପ୍ରಮುଖ ଶିଳାଲେଖ ଓ ତାମ୍ରଶାସନ ପ୍ରମାଣ',
    '୭. ସାଂସ୍କୃତିକ, ସାହିତ୍ୟିକ ଓ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଅବଦାନ',
    '୮. ୭୬ ସମ୍ପ୍ରଦାୟ ନାମ ଓ ୯ ବୃତ୍ତିଗତ ଐତିହ୍ୟ ବର୍ଗର ଦ୍ୱିମୁଖୀ ସନ୍ଦର୍ଭ',
    '୯. ଇତିହାସ-ଲେଖନ ମୂଲ୍ୟାୟନ: ପ୍ରମାଣିତ ତଥ୍ୟ ବନାମ ଲୋକ-ପରମ୍ପରା',
    '୧୦. ଐତିହାସିକ କାଳକ୍ରମ ଓ ପ୍ରମାଣ-ଭିତ୍ତିକ ଉପସଂହାର'
  ],
  bn: [
    '১. ভূমিকা ও ঐতিহাসিক পরিচয়',
    '২. ঐতিহাসিক প্রেক্ষাপট, রাজবংশীয় মূল ও প্রারম্ভিক কাল',
    '৩. অভিষেক, প্রশাসনিক সংস্কার ও সার্বভৌমত্ব',
    '৪. সামরিক অভিযান ও সাম্রাজ্য বিস্তার',
    '৫. দুর্গ নির্মাণ, সামরিক সংগঠন ও প্রাদেশিক শাসন',
    '৬. প্রধান শিলালিপি ও তাম্রশাসন প্রমাণ',
    '৭. সাংস্কৃতিক, সাহিত্যিক ও মন্দির স্থাপত্য অবদান',
    '৮. ৭৬টি সম্প্রদায় নাম ও ৯টি পেশাগত ঐতিহ্য বিভাগের দ্বিমুখী সংযোগ',
    '৯. ইতিহাসচর্চা মূল্যায়ন: লিপিতাত্ত্বিক সত্য বনাম লোক-ঐতিহ্য',
    '১০. ঐতিহাসিক কালক্রম ও তথ্যভিত্তিক উপসংহার'
  ]
};

const LANG_INTRO_NOTE: Record<'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn', string> = {
  hi: 'यह संपूर्ण ऐतिहासिक शोध मोनोग्राफ OD-0001 मास्टर मॉडल के अनुसार मूल संस्कृत, ओड़िया और तेलुगु शिलालेखों, ताम्रपत्रों, ७६ सामुदायिक नामों तथा ९ व्यावसायिक विरासत श्रेणियों (CH-0017 से CH-0025) के प्रामाणिक संदर्भों के साथ प्रस्तुत है।',
  te: 'ఈ సమగ్ర చారిత్రక పరిశోధనా మోనోగ్రాఫ్ OD-0001 మాస్టర్ మోడల్ ప్రకారం సంస్కృత, ఒడియా మరియు తెలుగు శిలాశాసనాలు, తామ్రపత్రాలు, 76 కమ్యూనిటీ పేర్లు మరియు 9 ప్రొఫెషనల్ హెరిటేజ్ వర్గాల (CH-0017 నుండి CH-0025) ప్రామాణిక ఆధారాలతో రూపొందించబడింది.',
  kn: 'ಈ ಸಮಗ್ರ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಪ್ರಬಂಧವು OD-0001 ಮಾದರಿಯಂತೆ ಮೂಲ ಸಂಸ್ಕೃತ, ಒಡಿಯಾ ಮತ್ತು ತೆಲುಗು ಶಾಸನಗಳು, ತಾಮ್ರಪತ್ರಗಳು, 76 ಸಮುದಾಯ ಹೆಸರುಗಳು ಮತ್ತು 9 ವೃತ್ತಿಪರ ಪರಂಪರೆ ವರ್ಗಗಳ (CH-0017 ರಿಂದ CH-0025) ಅಧಿಕೃತ ದಾಖಲೆಗಳೊಂದಿಗೆ ರಚಿತವಾಗಿದೆ.',
  ta: 'இந்த முழுமையான வரலாற்று ஆய்வுக் கட்டுரை OD-0001 மாதிரியின்படி சமஸ்கிருதம், ஒடியா மற்றும் தெலுங்கு கல்வெட்டுகள், செப்பேடுகள், 76 சமூகப் பெயர்கள் மற்றும் 9 தொழில்முறை பாரம்பரிய வகைகளின் (CH-0017 முதல் CH-0025) சான்றுகளுடன் வழங்கப்படுகிறது.',
  mr: 'हा संपूर्ण ऐतिहासिक शोधनिबंध OD-0001 मास्टर मॉडेलनुसार मूळ संस्कृत, ओडिया आणि तेलुगू शिलालेख, ताम्रपट, ७६ समुदाय नावे आणि ९ व्यावसायिक वारसा श्रेणींच्या (CH-0017 ते CH-0025) प्रमाणित संदर्भांसह सादर केला आहे.',
  or: 'ଏହି ସମ୍ପୂର୍ଣ୍ଣ ଐତିହାସିକ ଗବେଷଣା ନିବନ୍ଧ OD-0001 ମାଷ୍ଟର ମଡେଲ ଅନୁଯାୟୀ ମୂଳ ସଂସ୍କୃତ, ଓଡ଼ିଆ ଓ ତେଲୁଗୁ ଶିଳାଲେଖ, ତାମ୍ରଶାସନ, ୭୬ ସମ୍ପ୍ରଦାୟ ନାମ ଏବଂ ୯ ବୃତ୍ତିଗତ ଐତିହ୍ୟ ବର୍ଗର (CH-0017 ରୁ CH-0025) ପ୍ରମାଣ ସହିତ ଉପସ୍ଥାପିତ।',
  bn: 'এই সম্পূর্ণ ঐতিহাসিক গবেষণা নিবন্ধটি OD-0001 মাস্টার মডেল অনুসারে মৌলিক সংস্কৃত, ওড়িয়া ও তেলুগু শিলালিপি, তাম্রশাসন, ৭৬টি সম্প্রদায় নাম এবং ৯টি পেশাগত ঐতিহ্য বিভাগের (CH-0017 থেকে CH-0025) প্রামাণিক তথ্যের সাথে উপস্থাপিত।'
};

export function localize10ChapterContent(
  _enContent: string,
  lang: 'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn',
  localizedTitle: string,
  articleId = 'fig_kapilendra_deva',
  refNumber = 'RD-0014',
  localizedSummary = ''
): string {
  const sum = localizedSummary || buildNativeSummaryForArticle(articleId, refNumber, lang, localizedTitle);
  return buildNative10ChapterContentForArticle(articleId, refNumber, lang, localizedTitle, sum);
}

export const GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_TRANSLATIONS: Record<
  string,
  Partial<
    Record<
      LanguageCode,
      { title: string; summary: string; content: string; author_name?: string; sources?: SourceReference[] }
    >
  >
> = (() => {
  const langs: ('hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn')[] = [
    'hi',
    'te',
    'kn',
    'ta',
    'mr',
    'or',
    'bn'
  ];
  const out: Record<
    string,
    Partial<
      Record<
        LanguageCode,
        { title: string; summary: string; content: string; author_name?: string; sources?: SourceReference[] }
      >
    >
  > = {};

  for (const art of GAJAPATHI_MONARCHS_AND_INSCRIPTIONS_ARTICLES) {
    out[art.id] = {};
    const refNum = REF_NUM_MAP_14[art.id] || 'HF-0011';
    for (const lang of langs) {
      const title = LOCALIZED_TITLES_14[art.id]?.[lang] || art.original_title;
      const summary = buildNativeSummaryForArticle(art.id, refNum, lang, title);
      const content = buildNative10ChapterContentForArticle(art.id, refNum, lang, title, summary);
      out[art.id][lang] = {
        title,
        summary,
        content,
        author_name: localizeAuthorName(art.author_name, lang),
        sources: localizeSourcesList(art.sources, lang)
      };
    }
  }
  return out;
})();
