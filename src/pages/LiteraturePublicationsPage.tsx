import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';
import { useLanguage } from '../context/LanguageContext';

const LIT_DATA: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  sigLabel: string;
  inspectBtn: string;
  items: { id: string; title: string; author: string; lang: string; desc: string; significance: string; sources: { title: string }[] }[];
}> = {
  en: {
    badge: 'Classical Odia & Sanskrit Corpus',
    title: 'Literature, Legal Codices & Court Publications',
    subtitle: 'The Suryavamshi Gajapathi court patronized monumental literary works that defined medieval Indian law, vernacular epic poetry, and devotional aesthetics.',
    sigLabel: 'Historical Significance',
    inspectBtn: 'Inspect Codex →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'Sarasvati Vilasa (Medieval Sanskrit Legal Digest)',
        author: 'Composed by Prataparudra Deva Gajapathi (c. 1515 CE)',
        lang: 'Sanskrit',
        desc: 'A comprehensive Sanskrit legal and civil digest dealing with vyavahara (jurisprudence), the division of property, inheritance rules, and the rights of subjects. Critically edited by Dr. R. Shama Sastri in 1927 based on palm-leaf folios in Mysore and Madras.',
        significance: 'Recognized as one of the definitive Smriti digests of southern and eastern India, providing priceless evidence of Gajapathi land tenure.',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri, University of Mysore Oriental Library Publications (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'Sarala Mahabharata (The Pioneer of Vernacular Odia Literature)',
        author: 'Composed by Adikabi Sarala Dasa (under Kapilendra Deva’s patronage, c. 1450 CE)',
        lang: 'Classical Odia',
        desc: 'A monumental translation and regional contextualization of the Mahabharata composed in the vernacular Odia Dandi Vritta meter. Reflected the contemporary martial valor, warfare methods, and social life of Kapilendra Deva’s empire.',
        significance: 'Considered the founding literary monument of the Odia language and literature.',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Department of Culture, Government of Odisha, Bhubaneswar' }, { title: 'K.C. Panigrahi, Sarala Dasa (Sahitya Akademi Monograph)' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'Abhinava Gitagovinda & Nama-malika',
        author: 'Attributed to Purushottama Deva Gajapathi (c. 1475 CE)',
        lang: 'Sanskrit',
        desc: 'Devotional lyric poems written in emulation of Jayadeva’s Gitagovinda, dedicated to Lord Jagannatha, along with lexicographical and philosophical texts compiled under the king’s personal scholarship.',
        significance: 'Demonstrated the deep devotional and Sanskrit literary scholarship of the Gajapathi monarchs.',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Odisha State Museum, Bhubaneswar' }]
      }
    ]
  },
  hi: {
    badge: 'शास्त्रीय ओडिया एवं संस्कृत वाङ्मय',
    title: 'साहित्य, विधिक संहिताएं एवं राजदरबार प्रकाशन',
    subtitle: 'सूर्यवंशी गजपति राजदरबार ने मध्यकालीन भारतीय विधि, महाकाव्य और भक्ति साहित्य की कालजयी कृतियों को संरक्षण दिया।',
    sigLabel: 'ऐतिहासिक महत्व',
    inspectBtn: 'ग्रंथ विवरण देखें →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'सरस्वती विलास (मध्यकालीन संस्कृत विधि संहिता)',
        author: 'सम्राट प्रतापरुद्र देव गजपति द्वारा रचित (लगभग 1515 ई.)',
        lang: 'संस्कृत',
        desc: 'व्यवहार (न्यायशास्त्र), संपत्ति विभाजन, उत्तराधिकार नियमों और प्रजा के अधिकारों का व्यापक संस्कृत विधिक ग्रंथ। 1927 में डॉ. आर. शामशास्त्री द्वारा संपादित।',
        significance: 'पूर्वी और दक्षिणी भारत की प्रमुख स्मृति संहिताओं में से एक, जो गजपति कालीन भूमि व्यवस्था का प्रमाण देती है।',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'सारला महाभारत (ओडिया साहित्य का आदि-महाकाव्य)',
        author: 'आदिकवि सारला दास द्वारा रचित (महाराजा कपिलेंद्र देव के शासनकाल में, लगभग 1450 ई.)',
        lang: 'शास्त्रीय ओडिया',
        desc: 'दांडी वृत्त छंद में रचित महाभारत का ओडिया महाकाव्य, जिसमें कपिलेंद्र देव के साम्राज्य के सैन्य शौर्य, युद्ध कौशल और सामाजिक जीवन का सजीव चित्रण है।',
        significance: 'ओडिया भाषा और साहित्य का आधारस्तंभ।',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'अभिनव गीतगोविंद एवं नाम-मालिका',
        author: 'सम्राट पुरुषोत्तम देव गजपति द्वारा रचित (लगभग 1475 ई.)',
        lang: 'संस्कृत',
        desc: 'भगवान जगन्नाथ को समर्पित भक्ति काव्य और कोषग्रंथ, जो गजपति सम्राटों की गहन संस्कृत विद्वत्ता को दर्शाते हैं।',
        significance: 'गजपति सम्राटों की भक्ति और संस्कृत साहित्य सेवा का प्रमुख प्रमाण।',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  },
  te: {
    badge: 'శాస్త్రీయ ఒడియా & సంస్కృత సాహిత్య భాండాగారం',
    title: 'సాహిత్యం, న్యాయ గ్రంథాలు & రాజదర్బారు ప్రచురణలు',
    subtitle: 'సూర్యవంశ గజపతి ఆస్థానం మధ్యయుగ భారతీయ న్యాయశాస్త్రం, ఇతిహాస కావ్యాలు మరియు భక్తి సాహిత్యాన్ని పోషించింది.',
    sigLabel: 'చారిత్రక ప్రాముఖ్యత',
    inspectBtn: 'గ్రంథ వివరాలు చూడండి →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'సరస్వతీ విలాసం (సంస్కృత న్యాయశాస్త్ర గ్రంథం)',
        author: 'ప్రతాపరుద్ర దేవ గజపతి రచన (క్రీ.శ. 1515)',
        lang: 'సంస్కృతం',
        desc: 'వ్యవహార ధర్మం, ఆస్తి పంపకాలు, వారసత్వ నియమాలు మరియు పౌర హక్కులను వివరించే సమగ్ర సంస్కృత న్యాయ గ్రంథం. 1927లో డా. ఆర్. శ్యామశాస్త్రిచే పరిష్కరించబడింది.',
        significance: 'దక్షిణ మరియు తూర్పు భారతదేశంలో అత్యంత ప్రామాణికమైన స్మృతి గ్రంథాలలో ఒకటి.',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'సారళా మహాభారతం (ఒడియా సాహిత్య ఆది మహాకావ్యం)',
        author: 'ఆదికవి సారళా దాసు రచన (కపిలేంద్ర దేవుని కాలం, క్రీ.శ. 1450)',
        lang: 'శాస్త్రీయ ఒడియా',
        desc: 'కపిలేంద్ర దేవుని సామ్రాజ్యపు సైనిక పరాక్రమం, యుద్ధ తంత్రాలు మరియు సామాజిక జీవనాన్ని ప్రతిబింబిస్తూ దండి వృత్త ఛందస్సులో రచించబడిన మహాభారత కావ్యం.',
        significance: 'ఒడియా భాషా సాహిత్యాలకు పునాది రాయి.',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'అభినవ గీతగోవిందం & నామ-మాలిక',
        author: 'పురుషోత్తమ దేవ గజపతి రచన (క్రీ.శ. 1475)',
        lang: 'సంస్కృతం',
        desc: 'జగన్నాథ స్వామికి అంకితం చేయబడిన భక్తి గీత కావ్యాలు మరియు నిఘంటు గ్రంథాలు.',
        significance: 'గజపతి చక్రవర్తుల సంస్కృత పాండిత్యానికి, భక్తికి నిదర్శనం.',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  },
  kn: {
    badge: 'ಶಾಸ್ತ್ರೀಯ ಒಡಿಯಾ ಮತ್ತು ಸಂಸ್ಕೃತ ಸಾಹಿತ್ಯ ಕಣಜ',
    title: 'ಸಾಹಿತ್ಯ, ನ್ಯಾಯ ಸಂಹಿತೆಗಳು ಮತ್ತು ರಾಜ ಆಸ್ಥಾನದ ಕೃತಿಗಳು',
    subtitle: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಆಸ್ಥಾನವು ಮಧ್ಯಕಾಲೀನ ಭಾರತೀಯ ನ್ಯಾಯಶಾಸ್ತ್ರ, ಮಹಾಕಾವ್ಯ ಮತ್ತು ಭಕ್ತಿ ಸಾಹಿತ್ಯವನ್ನು ಪೋಷಿಸಿತು.',
    sigLabel: 'ಐತಿಹಾಸಿಕ ಮಹತ್ವ',
    inspectBtn: 'ಗ್ರಂಥ ವಿವರ ವೀಕ್ಷಿಸಿ →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'ಸರಸ್ವತೀ ವಿಲಾಸ (ಸಂಸ್ಕೃತ ನ್ಯಾಯಶಾಸ್ತ್ರ ಗ್ರಂಥ)',
        author: 'ಪ್ರತಾಪರುದ್ರ ದೇವ ಗಜಪತಿಯಿಂದ ರಚಿತ (ಕ್ರಿ.ಶ. 1515)',
        lang: 'ಸಂಸ್ಕೃತ',
        desc: 'ವ್ಯವಹಾರ ಧರ್ಮ, ಆಸ್ತಿ ವಿಭಜನೆ, ಉತ್ತರಾಧಿಕಾರ ನಿಯಮಗಳನ್ನು ಒಳಗೊಂಡ ಸಮಗ್ರ ಸಂಸ್ಕೃತ ಕಾನೂನು ಗ್ರಂಥ. 1927ರಲ್ಲಿ ಮೈಸೂರಿನ ಡಾ. ಆರ್. ಶಾಮಶಾಸ್ತ್ರಿಗಳಿಂದ ಸಂಪಾದಿಸಲ್ಪಟ್ಟಿತು.',
        significance: 'ದಕ್ಷಿಣ ಮತ್ತು ಪೂರ್ವ ಭಾರತದ ಪ್ರಮುಖ ಸ್ಮೃತಿ ಗ್ರಂಥಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'ಸಾರಳಾ ಮಹಾಭಾರತ (ಒಡಿಯಾ ಸಾಹಿತ್ಯದ ಆದಿಕಾವ್ಯ)',
        author: 'ಆದಿಕವಿ ಸಾರಳಾ ದಾಸ (ಕಪಿಲೇಂದ್ರ ದೇವನ ಕಾಲ, ಕ್ರಿ.ಶ. 1450)',
        lang: 'ಶಾಸ್ತ್ರೀಯ ಒಡಿಯಾ',
        desc: 'ಕಪಿಲೇಂದ್ರ ದೇವನ ಸಾಮ್ರಾಜ್ಯದ ಶೌರ್ಯ, ಯುದ್ಧ ಕಲೆ ಮತ್ತು ಸಾಮಾಜಿಕ ಜೀವನವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುವ ಒಡಿಯಾ ಮಹಾಭಾರತ.',
        significance: 'ಒಡಿಯಾ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯದ ಸ್ಥಾಪಕ ಕೃತಿ.',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'ಅಭಿನವ ಗೀತಗೋವಿಂದ ಮತ್ತು ನಾಮ-ಮಾಲಿಕಾ',
        author: 'ಪುರುಷೋತ್ತಮ ದೇವ ಗಜಪತಿ (ಕ್ರಿ.ಶ. 1475)',
        lang: 'ಸಂಸ್ಕೃತ',
        desc: 'ಜಗನ್ನಾಥನಿಗೆ ಸಮರ್ಪಿತವಾದ ಭಕ್ತಿ ಕಾವ್ಯಗಳು ಮತ್ತು ಸಂಸ್ಕೃತ ಗ್ರಂಥಗಳು.',
        significance: 'ಗಜಪತಿ ಅರಸರ ಸಂಸ್ಕೃತ ವಿದ್ವತ್ತಿಗೆ ಸಾಕ್ಷಿ.',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  },
  ta: {
    badge: 'செவ்வியல் ஒடியா மற்றும் சமஸ்கிருத இலக்கியக் களஞ்சியம்',
    title: 'இலக்கியம், சட்ட நூல்கள் மற்றும் அரசவை வெளியீடுகள்',
    subtitle: 'சூரியவம்ச கஜபதி அரசவை இடைக்கால இந்தியச் சட்டம், காப்பியம் மற்றும் பக்தி இலக்கியங்களை ஆதரித்தது.',
    sigLabel: 'வரலாற்று முக்கியத்துவம்',
    inspectBtn: 'நூல் விவரம் காண்க →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'சரஸ்வதி விலாசம் (சமஸ்கிருத சட்ட நூல்)',
        author: 'பிரதாபருத்ர தேவ கஜபதியால் இயற்றப்பட்டது (கி.பி. 1515)',
        lang: 'சமஸ்கிருதம்',
        desc: 'சொத்துரிமை, வாரிசுரிமை மற்றும் நீதி பரிபாலனத்தை விளக்கும் சமஸ்கிருத சட்ட நூல். 1927இல் டாக்டர் ஆர். சாமசாஸ்திரியால் பதிப்பிக்கப்பட்டது.',
        significance: 'தெற்கு மற்றும் கிழக்கு இந்தியாவின் முக்கிய நீதி நூல்களில் ஒன்று.',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'சாரளா மகாபாரதம் (ஒடிய இலக்கியத்தின் ஆதிகாவியம்)',
        author: 'ஆதிகவி சாரளா தாஸ் (கபிலேந்திர தேவரின் காலம், கி.பி. 1450)',
        lang: 'செவ்வியல் ஒடியா',
        desc: 'கபிலேந்திர தேவரின் பேரரசின் போர் வீரம் மற்றும் சமூக வாழ்வைப் பிரதிபலிக்கும் ஒடியா மகாபாரதக் காப்பியம்.',
        significance: 'ஒடிய மொழி மற்றும் இலக்கியத்தின் அடித்தள நூல்.',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'அபினவ கீதகோவிந்தம் & நாம-மாலிகா',
        author: 'புருஷோத்தம தேவ கஜபதி (கி.பி. 1475)',
        lang: 'சமஸ்கிருதம்',
        desc: 'ஜெகந்நாதருக்கு அர்ப்பணிக்கப்பட்ட சமஸ்கிருத பக்திப் பாடல்கள் மற்றும் நிகண்டு நூல்கள்.',
        significance: 'கஜபதி மன்னர்களின் சமஸ்கிருதப் புலமைக்குச் சான்று.',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  },
  mr: {
    badge: 'अभिजात ओडिया आणि संस्कृत साहित्य संग्रह',
    title: 'साहित्य, विधी संहिता आणि राजदरबार प्रकाशने',
    subtitle: 'सूर्यवंशी गजपती राजदरबाराने मध्ययुगीन भारतीय कायदा, महाकाव्य आणि भक्ती साहित्याला राजाश्रय दिला.',
    sigLabel: 'ऐतिहासिक महत्त्व',
    inspectBtn: 'ग्रंथ तपशील पहा →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'सरस्वती विलास (संस्कृत कायदा व न्याय ग्रंथ)',
        author: 'सम्राट प्रतापरुद्र देव गजपती रचित (इ.स. १५१५)',
        lang: 'संस्कृत',
        desc: 'न्यायशास्त्र, मालमत्ता विभाजन आणि वारसा हक्कांचे विवेचन करणारा संस्कृत विधी ग्रंथ. १९२७ मध्ये डॉ. आर. शामशास्त्री यांनी संपादित केला.',
        significance: 'दक्षिण व पूर्व भारतातील प्रमुख स्मृती ग्रंथांपैकी एक.',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'सारला महाभारत (ओडिया साहित्याचे आदि-महाकाव्य)',
        author: 'आदिकवी सारला दास (कपिलेंद्र देवांच्या काळात, इ.स. १४५०)',
        lang: 'अभिजात ओडिया',
        desc: 'कपिलेंद्र देवांच्या साम्राज्याचे शौर्य आणि युद्धपद्धतीचे चित्रण करणारे ओडिया महाभारत.',
        significance: 'ओडिया भाषा आणि साहित्याचा पायाभूत ग्रंथ.',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'अभिनव गीतगोविंद आणि नाम-मालिका',
        author: 'पुरुषोत्तम देव गजपती (इ.स. १४७५)',
        lang: 'संस्कृत',
        desc: 'भगवान जगन्नाथाला समर्पित संस्कृत भक्तीकाव्ये आणि कोशग्रंथ.',
        significance: 'गजपती सम्राटांच्या संस्कृत विद्वत्तेचे प्रतीक.',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  },
  or: {
    badge: 'ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଆ ଓ ସଂସ୍କୃତ ସାହିତ୍ୟ ଭଣ୍ଡାର',
    title: 'ସାହିତ୍ୟ, ଆଇନ ଗ୍ରନ୍ଥ ଓ ରାଜଦରବାର ପ୍ରକାଶନ',
    subtitle: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜଦରବାର ମଧ୍ୟଯୁଗୀୟ ଭାରତୀୟ ଆଇନ, ଓଡ଼ିଆ ମହାକାବ୍ୟ ଓ ଭକ୍ତି ସାହିତ୍ୟକୁ ସମୃଦ୍ଧ କରିଥିଲା।',
    sigLabel: 'ଐତିହାସିକ ମହତ୍ତ୍ୱ',
    inspectBtn: 'ଗ୍ରନ୍ଥ ବିବରଣୀ ଦେଖନ୍ତୁ →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'ସରସ୍ୱତୀ ବିଳାସ (ସଂସ୍କୃତ ଆଇନ ଓ ବ୍ୟବହାର ଗ୍ରନ୍ଥ)',
        author: 'ସମ୍ରାଟ ପ୍ରତାପରୁଦ୍ର ଦେବ ଗଜପତିଙ୍କ ଦ୍ୱାରା ପ୍ରଣୀତ (୧୫୧୫ ଖ୍ରୀ.)',
        lang: 'ସଂସ୍କୃତ',
        desc: 'ବ୍ୟବହାର ଶାସ୍ତ୍ର, ସମ୍ପତ୍ତି ବିଭାଜନ, ଉତ୍ତରାଧିକାର ନିୟମ ଓ ପ୍ରଜାଙ୍କ ଅଧିକାର ସମ୍ବନ୍ଧୀୟ ପ୍ରାମାଣିକ ସଂସ୍କୃତ ଆଇନ ଗ୍ରନ୍ଥ।',
        significance: 'ଦକ୍ଷିଣ ଓ ପୂର୍ବ ଭାରତର ଅନ୍ୟତମ ଶ୍ରେଷ୍ଠ ସ୍ମୃତି ଓ ଆଇନ ଗ୍ରନ୍ଥ।',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'ସାରଳା ମହାଭାରତ (ଓଡ଼ିଆ ସାହିତ୍ୟର ଆଦି ମହାକାବ୍ୟ)',
        author: 'ଆଦିକବି ସାରଳା ଦାସ (କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଶାସନ କାଳ, ୧୪୫୦ ଖ୍ରୀ.)',
        lang: 'ଶାସ୍ତ୍ରୀୟ ଓଡ଼ିଆ',
        desc: 'ଦାଣ୍ଡି ବୃତ୍ତରେ রଚିତ ଓଡ଼ିଆ ମହାଭାରତ, ଯେଉଁଥିରେ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ସାମ୍ରାଜ୍ୟର ସାମରିକ ବୀରତ୍ୱ ଓ ସାମାଜିକ ଜୀବନର ଚିତ୍ରଣ ରହିଛି।',
        significance: 'ଓଡ଼ିଆ ଭାଷା ଓ ସାହିତ୍ୟର ମୂଳଦୁଆ।',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'ଅଭିନବ ଗୀତଗୋବିନ୍ଦ ଓ ନାମ-ମାଳିକା',
        author: 'ସମ୍ରାଟ ପୁରୁଷୋତ୍ତମ ଦେବ ଗଜପତି (୧୪୭୫ ଖ୍ରୀ.)',
        lang: 'ସଂସ୍କୃତ',
        desc: 'ମହାପ୍ରଭୁ ଜଗନ୍ନାଥଙ୍କୁ ସମର୍ପିତ ଭକ୍ତି କାବ୍ୟ ଓ ସଂସ୍କୃତ ଗ୍ରନ୍ଥ।',
        significance: 'ଗଜପତି ସମ୍ରାଟମାନଙ୍କର ଗଭୀର ସଂସ୍କୃତ ପାଣ୍ଡିତ୍ୟର ପ୍ରମାଣ।',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  },
  bn: {
    badge: 'ধ্রুপদী ওড়িয়া ও সংস্কৃত সাহিত্য ভাণ্ডার',
    title: 'সাহিত্য, আইনগ্রন্থ ও রাজদরবার প্রকাশনা',
    subtitle: 'সূর্যবংশীয় গজপতি রাজদরবার মধ্যযুগীয় ভারতীয় আইন, মহাকাব্য এবং ভক্তি সাহিত্যকে পৃষ্ঠপোষকতা করেছিল।',
    sigLabel: 'ঐতিহাসিক গুরুত্ব',
    inspectBtn: 'গ্রন্থ বিবরণ দেখুন →',
    items: [
      {
        id: 'lit-sarasvati-vilasa',
        title: 'সরস্বতী বিলাস (সংস্কৃত আইন ও বিচার সংহিতা)',
        author: 'সম্রাট প্রতাপরুদ্র দেব গজপতি বিরচিত (১৫১৫ খ্রি.)',
        lang: 'সংস্কৃত',
        desc: 'ব্যবহারশাস্ত্র, সম্পত্তি বিভাজন ও উত্তরাধিকার আইন বিষয়ক প্রামাণ্য সংস্কৃত আইনগ্রন্থ। ১৯২৭ সালে ড. আর. শ্যামশাস্ত্রী কর্তৃক সম্পাদিত।',
        significance: 'দক্ষিণ ও পূর্ব ভারতের অন্যতম প্রধান স্মৃতি ও আইন সংহিতা।',
        sources: [{ title: 'Sarasvati Vilasa of Prataparudra Deva, ed. Dr. R. Shama Sastri (1927)' }]
      },
      {
        id: 'lit-sarala-mahabharata',
        title: 'সারলা মহাভারত (ওড়িয়া সাহিত্যের আদি মহাকাব্য)',
        author: 'আদিকবি সারলা দাস (কপিলেন্দ্র দেবের শাসনকালে, ১৪৫০ খ্রি.)',
        lang: 'ধ্রুপদী ওড়িয়া',
        desc: 'কপিলেন্দ্র দেবের সাম্রাজ্যের সামরিক শৌর্য ও সমাজজীবনের প্রতিফলনসহ ওড়িয়া ভাষায় রচিত মহাভারত।',
        significance: 'ওড়িয়া ভাষা ও সাহিত্যের ভিত্তিপ্রস্তর।',
        sources: [{ title: 'Sarala Mahabharata (18 Volumes), Government of Odisha' }]
      },
      {
        id: 'lit-abhinava-gitagovinda',
        title: 'অভিনব গীতগোবিন্দ ও নাম-মালিকা',
        author: 'সম্রাট পুরুষোত্তম দেব গজপতি (১৪৭৫ খ্রি.)',
        lang: 'সংস্কৃত',
        desc: 'মহাপ্রভু জগন্নাথকে নিবেদিত ভক্তিমূলক কাব্য ও অভিধান গ্রন্থ।',
        significance: 'গজপতি সম্রাটদের সংস্কৃত পাণ্ডিত্যের নিদর্শন।',
        sources: [{ title: 'Descriptive Catalogue of Sanskrit Manuscripts of Orissa, Bhubaneswar' }]
      }
    ]
  }
};

export const LiteraturePublicationsPage: React.FC = () => {
  const { language } = useLanguage();
  const loc = LIT_DATA[language] || LIT_DATA.en;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedPub = selectedId ? loc.items.find(i => i.id === selectedId) || null : null;
  const archiveBase = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
  const pubImgMap: Record<string, string> = {
    'lit-sarasvati-vilasa': `${archiveBase}prataparudra_deva.jpg`,
    'lit-sarala-mahabharata': `${archiveBase}mahakavi_sarala_dasa.jpg`,
    'lit-abhinava-gitagovinda': `${archiveBase}odia_palm_leaf_manuscript.jpg`
  };
  const modalItem: ContentDetailItem | null = selectedPub
    ? {
        id: selectedPub.id,
        title: selectedPub.title,
        subtitle: selectedPub.author,
        badge: selectedPub.lang,
        imageUrl: pubImgMap[selectedPub.id] || `${archiveBase}odia_palm_leaf_manuscript.jpg`,
        imageLayout: 'banner',
        summary: selectedPub.significance,
        content: selectedPub.desc,
        sources: selectedPub.sources
      }
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <BookOpen className="w-4 h-4" />
          <span>{loc.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {loc.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {loc.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        {loc.items.map(item => {
          const thumbUrl = pubImgMap[item.id] || `${archiveBase}odia_palm_leaf_manuscript.jpg`;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="p-6 rounded-3xl bg-[#121622] border border-stone-800 hover:border-[#c99738] shadow-lg cursor-pointer transition-all group flex flex-col sm:flex-row gap-5 items-start"
            >
              <img
                src={thumbUrl}
                alt={item.title}
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = `${archiveBase}odia_palm_leaf_manuscript.jpg`;
                  }
                }}
                className="w-full sm:w-44 h-44 sm:h-36 rounded-2xl object-cover object-top shrink-0 border border-[#c99738]/40 bg-stone-950"
              />
              <div className="flex-1 space-y-3 min-w-0 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                    {item.lang}
                  </span>
                  <span className="text-xs text-stone-400">{item.author}</span>
                </div>

                <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-stone-100 group-hover:text-[#fae29c] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-royal-serif">
                  {item.desc}
                </p>

                <div className="pt-2 border-t border-stone-800 text-xs text-[#e8c872] flex items-center justify-between">
                  <div>
                    <strong className="text-stone-300">{loc.sigLabel}:</strong> {item.significance}
                  </div>
                  <span className="font-semibold shrink-0 ml-2">{loc.inspectBtn}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ContentDetailModal item={modalItem} onClose={() => setSelectedId(null)} />
    </div>
  );
};


