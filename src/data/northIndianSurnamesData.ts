import { LanguageCode } from '../types';
import { SurnameTransliterations, ALPHABET_LETTERS } from './communitySurnamesData';

export interface NorthIndianSurnameEntry {
  /** 1-based sequential index preserving exact array order (1 to 90) */
  orderIndex: number;
  /** Unique React key combining orderIndex and raw surname */
  id: string;
  /** Exact surname/sub-caste spelling as provided — never modified or translated */
  surname: string;
  /** Category fixed as North-Indian */
  category: 'North-Indian';
  /** Uppercase initial letter (A-Z) for alphabetical grouping and navigation */
  letter: string;
  /** 8-language representation (English, Hindi, Telugu, Kannada, Tamil, Marathi, Odia, Bengali) */
  transliterations: SurnameTransliterations;
}

export { ALPHABET_LETTERS };

/**
 * Exact 90 North-Indian Suryavamshi Oad-Rajpoot Surnames / Sub-Castes
 * Preserving original spelling, capitalization ("bika", "JAISWAR", "kanad", "kudawala", "karla"),
 * slash-separated entry ("Hadgal/Hada"), "Others", and exact sequence (1 to 90).
 */
export const NORTH_INDIAN_SURNAMES_RAW_LIST: string[] = [
  'Bambali',
  'Bandoka',
  'Basniwal',
  'Bawru',
  'Beldar',
  'Bhati',
  'bika',
  'Biroka',
  'Birpali',
  'Borda',
  'Botia',
  'Bourda',
  'Byawat',
  'Chachiya',
  'Chandel',
  'Chauhan',
  'Chitra',
  'Chunthal',
  'Dahag',
  'Dalere',
  'Dau',
  'Derewal',
  'Dewat',
  'Dudani',
  'Dundia',
  'Gadai',
  'Gaherwar',
  'Galgat',
  'Gangwani',
  'Goaar',
  'Gohil',
  'Gundli',
  'Hada',
  'Hadgal/Hada',
  'Hansu',
  'Jadod',
  'JAISWAR',
  'Jandu',
  'Japlot',
  'Jiyani',
  'Jodha',
  'Kaliya',
  'kanad',
  'Kanawat',
  'Kantiwal',
  'Kesru',
  'Khambra',
  'Kharwar',
  'Khati',
  'kudawala',
  'Kungar',
  'Lola',
  'Madauna',
  'Madha',
  'Madhwani',
  'Majoka',
  'Malak',
  'Malwan',
  'Mangal',
  'Mehla',
  'Mighani',
  'Motlani',
  'Mudai',
  'Mugri',
  'Nagiya',
  'Nahar',
  'Napa',
  'Naruka',
  'Neeliwal',
  'Niver',
  'Nothey',
  'Others',
  'Plawar',
  'Sangawat',
  'Sargani',
  'Shandilya',
  'Shoda',
  'Sisodiya',
  'Sravan',
  'Sulkhani',
  'Sura',
  'Thahiya',
  'Tihal',
  'Tumrail',
  'Udesi',
  'Vavru',
  'Waweja',
  'karla',
  'Mouri',
  'Pathraan',
];

/**
 * Verified 8-language phonetic script transliterations for the 90 North-Indian Oad-Rajpoot surnames/sub-castes.
 * Preserves exact original English spelling as reference and provides phonetic script representations.
 */
export const NORTH_INDIAN_SURNAME_TRANSLITERATIONS: Record<
  string,
  Partial<Omit<SurnameTransliterations, 'en'>>
> = {
  'Bambali': { hi: 'बंबाली', mr: 'बंबाली', te: 'బంబాలి', kn: 'ಬಂಬಾಲಿ', ta: 'பம்பாலி', or: 'ବମ୍ବାଲି', bn: 'বম্বালি' },
  'Bandoka': { hi: 'बंदोका', mr: 'बंदोका', te: 'బందోకా', kn: 'ಬಂದೋಕಾ', ta: 'பந்தோகா', or: 'ବନ୍ଦୋକା', bn: 'বন্দোকা' },
  'Basniwal': { hi: 'बासनीवाल', mr: 'बासनीवाल', te: 'బాస్నివాల్', kn: 'ಬಾಸ್ನಿವಾಲ್', ta: 'பாஸ்னிவால்', or: 'ବାସନିୱାଲ', bn: 'বাসনিওয়াল' },
  'Bawru': { hi: 'बावरू', mr: 'बावरू', te: 'బావరు', kn: 'ಬಾವರು', ta: 'பாவ்ரு', or: 'ବାୱରୁ', bn: 'বাওরু' },
  'Beldar': { hi: 'बेलदार', mr: 'बेलदार', te: 'బెల్దార్', kn: 'ಬೆಲ್ದಾರ್', ta: 'பெல்தார்', or: 'ବେଲଦାର', bn: 'বেলদার' },
  'Bhati': { hi: 'भाटी', mr: 'भाटी', te: 'భాటి', kn: 'ಭಾಟಿ', ta: 'பாட்டி', or: 'ଭାଟି', bn: 'ভাটি' },
  'bika': { hi: 'बीका', mr: 'बीका', te: 'బీకా', kn: 'ಬೀಕಾ', ta: 'பீகா', or: 'ବୀକା', bn: 'বীকা' },
  'Biroka': { hi: 'बिरोका', mr: 'बिरोका', te: 'బిరోకా', kn: 'ಬಿರೋಕಾ', ta: 'பிரோகா', or: 'ବିରୋକା', bn: 'বিরোকা' },
  'Birpali': { hi: 'बिरपाली', mr: 'बिरपाली', te: 'బిర్పాలి', kn: 'ಬಿರ್ಪಾಲಿ', ta: 'பிர்பாலி', or: 'ବିରପାଲି', bn: 'বিরপালি' },
  'Borda': { hi: 'बोरदा', mr: 'बोरदा', te: 'బోర్డా', kn: 'ಬೋರ್ಡಾ', ta: 'போர்டா', or: 'ବୋର୍ଦା', bn: 'বোর্দা' },
  'Botia': { hi: 'बोटिया', mr: 'बोटिया', te: 'బోటియా', kn: 'ಬೋಟಿಯಾ', ta: 'போட்டியா', or: 'ବୋଟିଆ', bn: 'বোটিয়া' },
  'Bourda': { hi: 'बौर्दा', mr: 'बौर्दा', te: 'బౌర్డా', kn: 'ಬೌರ್ಡಾ', ta: 'பௌர்டா', or: 'ବୌର୍ଦା', bn: 'বৌর্দা' },
  'Byawat': { hi: 'ब्यावत', mr: 'ब्यावत', te: 'బ్యావత్', kn: 'ಬ್ಯಾವತ್', ta: 'பியாவத்', or: 'ବ୍ୟାୱତ', bn: 'ব্যাওয়াত' },
  'Chachiya': { hi: 'चाचिया', mr: 'चाचिया', te: 'చాచియా', kn: 'ಚಾಚಿಯಾ', ta: 'சாச்சியா', or: 'ଚାଚିଆ', bn: 'চাচিয়া' },
  'Chandel': { hi: 'चंदेल', mr: 'चंदेल', te: 'చందేల్', kn: 'ಚಂದೇಲ್', ta: 'சந்தேல்', or: 'ଚନ୍ଦେଲ', bn: 'চান্দেল' },
  'Chauhan': { hi: 'चौहान', mr: 'चौहान', te: 'చౌహాన్', kn: 'ಚೌಹಾಣ್', ta: 'சௌஹான்', or: 'ଚୌହାନ', bn: 'চৌহান' },
  'Chitra': { hi: 'चित्रा', mr: 'चित्रा', te: 'చిత్రా', kn: 'ಚಿತ್ರಾ', ta: 'சித்ரா', or: 'ଚିତ୍ରା', bn: 'চিত্রা' },
  'Chunthal': { hi: 'चुंथल', mr: 'चुंथल', te: 'చుంథాల్', kn: 'ಚುಂಥಾಲ್', ta: 'சுந்தால்', or: 'ଚୁନ୍ଥଲ', bn: 'চুন্থল' },
  'Dahag': { hi: 'दहाग', mr: 'दहाग', te: 'దహాగ్', kn: 'ದಹಾಗ್', ta: 'தஹாக்', or: 'ଦହାଗ', bn: 'দহাগ' },
  'Dalere': { hi: 'दलेरे', mr: 'दलेरे', te: 'దలేరే', kn: 'ದಲೇರೇ', ta: 'தலேரே', or: 'ଦଲେରେ', bn: 'দলেরে' },
  'Dau': { hi: 'दाऊ', mr: 'दाऊ', te: 'దాউ', kn: 'ದಾವು', ta: 'தாவு', or: 'ଦାଉ', bn: 'দাউ' },
  'Derewal': { hi: 'डेरेवाल', mr: 'डेरेवाल', te: 'డేరేవాల్', kn: 'ಡೇರೇವಾಲ್', ta: 'டேரேவால்', or: 'ଡେରେୱାଲ', bn: 'ডেরেওয়াল' },
  'Dewat': { hi: 'देवत', mr: 'देवत', te: 'దేవత్', kn: 'ದೇವತ್', ta: 'தேவத்', or: 'ଦେୱତ', bn: 'দেওয়াত' },
  'Dudani': { hi: 'दुदानी', mr: 'दुदानी', te: 'దుదానీ', kn: 'ದುದಾನಿ', ta: 'துதானி', or: 'ଦୁଦାନି', bn: 'দুদানি' },
  'Dundia': { hi: 'डुंडिया', mr: 'डुंडिया', te: 'డుండియా', kn: 'ಡುಂಡಿಯಾ', ta: 'டுண்டியா', or: 'ଡୁଣ୍ଡିଆ', bn: 'ডুন্ডিয়া' },
  'Gadai': { hi: 'गदाई', mr: 'गदाई', te: 'గదాయి', kn: 'ಗದಾಯಿ', ta: 'கதாய்', or: 'ଗଦାଇ', bn: 'গদাই' },
  'Gaherwar': { hi: 'गहरवार', mr: 'गहरवार', te: 'గహర్వార్', kn: 'ಗಹರ್ವಾರ್', ta: 'கஹர்வார்', or: 'ଗହରୱାର', bn: 'গহরওয়ার' },
  'Galgat': { hi: 'गलगत', mr: 'गलगत', te: 'గల్గత్', kn: 'ಗಲ್ಗತ್', ta: 'கல்கத்', or: 'ଗଲଗତ', bn: 'গলগত' },
  'Gangwani': { hi: 'गंगवानी', mr: 'गंगवानी', te: 'గంగ్వానీ', kn: 'ಗಂಗ್ವಾನಿ', ta: 'கங்வானி', or: 'ଗଙ୍ଗୱାନି', bn: 'গঙ্গওয়ানি' },
  'Goaar': { hi: 'गोआर', mr: 'गोआर', te: 'గోఆర్', kn: 'ಗೋಆರ್', ta: 'கோஆர்', or: 'ଗୋଆର', bn: 'গোয়ার' },
  'Gohil': { hi: 'गोहिल', mr: 'गोहिल', te: 'గోహిల్', kn: 'ಗೋಹಿಲ್', ta: 'கோஹில்', or: 'ଗୋହିଲ', bn: 'গোহিল' },
  'Gundli': { hi: 'गुंदली', mr: 'गुंदली', te: 'గుండ్లి', kn: 'ಗುಂಡ್ಲಿ', ta: 'குண்ட்லி', or: 'ଗୁନ୍ଦଲି', bn: 'গুন্দলি' },
  'Hada': { hi: 'हाड़ा', mr: 'हाडा', te: 'హాడా', kn: 'ಹಾಡಾ', ta: 'ஹாடா', or: 'ହାଡା', bn: 'হাড়া' },
  'Hadgal/Hada': { hi: 'हदगल / हाड़ा', mr: 'हदगल / हाडा', te: 'హద్గల్ / హాడా', kn: 'ಹದ್ಗಲ್ / ಹಾಡಾ', ta: 'ஹத்கல் / ஹாடா', or: 'ହଦଗଲ / ହାଡା', bn: 'হদগল / হাড়া' },
  'Hansu': { hi: 'हंसू', mr: 'हंसू', te: 'హంసు', kn: 'ಹಂಸು', ta: 'ஹன்சு', or: 'ହଂସୁ', bn: 'হংসু' },
  'Jadod': { hi: 'जदोद', mr: 'जदोद', te: 'జదోద్', kn: 'ಜದೋದ್', ta: 'ஜதோத்', or: 'ଜଦୋଦ', bn: 'জদোদ' },
  'JAISWAR': { hi: 'जैसवार', mr: 'जैसवार', te: 'జైస్వార్', kn: 'ಜೈಸ್ವಾರ್', ta: 'ஜெய்ஸ்வார்', or: 'ଜୈସୱାର', bn: 'জয়সওয়ার' },
  'Jandu': { hi: 'जंडू', mr: 'जंडू', te: 'జండు', kn: 'ಜಂಡು', ta: 'ஜண்டு', or: 'ଜଣ୍ଡୁ', bn: 'জন্ডু' },
  'Japlot': { hi: 'जापलोट', mr: 'जापलोट', te: 'జాప్లోట్', kn: 'ಜಾಪ್ಲೋಟ್', ta: 'ஜாப்லோட்', or: 'ଜାପଲୋଟ', bn: 'জাপলোট' },
  'Jiyani': { hi: 'जियानी', mr: 'जियानी', te: 'జియానీ', kn: 'ಜಿಯಾನಿ', ta: 'ஜியானி', or: 'ଜିୟାନି', bn: 'জিয়ানি' },
  'Jodha': { hi: 'जोधा', mr: 'जोधा', te: 'జోధా', kn: 'ಜೋಧಾ', ta: 'ஜோதா', or: 'ଯୋଧା', bn: 'যোধা' },
  'Kaliya': { hi: 'कालिया', mr: 'कालिया', te: 'కాలియా', kn: 'ಕಾಲಿಯಾ', ta: 'காலியா', or: 'କାଲିଆ', bn: 'কালিয়া' },
  'kanad': { hi: 'कणद', mr: 'कणद', te: 'కణద్', kn: 'ಕಣದ್', ta: 'கணத்', or: 'କଣଦ', bn: 'কণদ' },
  'Kanawat': { hi: 'कनावत', mr: 'कनावत', te: 'కనావత్', kn: 'ಕನಾವತ್', ta: 'கனாவத்', or: 'କନାୱତ', bn: 'কনাওয়াত' },
  'Kantiwal': { hi: 'कांतिवाल', mr: 'कांतिवाल', te: 'కాంతివాల్', kn: 'ಕಾಂತಿವಾಲ್', ta: 'காந்திவால்', or: 'କାନ୍ତିୱାଲ', bn: 'কান্তিওয়াল' },
  'Kesru': { hi: 'केसरू', mr: 'केसरू', te: 'కేసరు', kn: 'ಕೇಸರು', ta: 'கேஸ்ரு', or: 'କେସରୁ', bn: 'কেসরু' },
  'Khambra': { hi: 'खाम्बरा', mr: 'खाम्बरा', te: 'ఖాంబ్రా', kn: 'ಖಾಂಬ್ರಾ', ta: 'காம்பரா', or: 'ଖାମବ୍ରା', bn: 'খাম্ব্রা' },
  'Kharwar': { hi: 'खरवार', mr: 'खरवार', te: 'ఖర్వార్', kn: 'ಖರ್ವಾರ್', ta: 'கர்வார்', or: 'ଖରୱାର', bn: 'খরওয়ার' },
  'Khati': { hi: 'खाती', mr: 'खाती', te: 'ఖాతి', kn: 'ಖಾತಿ', ta: 'காத்தி', or: 'ଖାତି', bn: 'খাতি' },
  'kudawala': { hi: 'कुदावाला', mr: 'कुदावाला', te: 'కుదావాలా', kn: 'ಕುದಾವಾಲಾ', ta: 'குதாவாலா', or: 'କୁଦାୱାଲା', bn: 'কুদাওয়ালা' },
  'Kungar': { hi: 'कुंगर', mr: 'कुंगर', te: 'కుంగర్', kn: 'ಕುಂಗರ್', ta: 'குங்கர்', or: 'କୁଙ୍ଗର', bn: 'কুঙ্গর' },
  'Lola': { hi: 'लोला', mr: 'लोला', te: 'లోలా', kn: 'ಲೋಲಾ', ta: 'லோலா', or: 'ଲୋଲା', bn: 'লোলা' },
  'Madauna': { hi: 'मदौना', mr: 'मदौना', te: 'మదౌనా', kn: 'ಮದೌನಾ', ta: 'மதௌனா', or: 'ମଦୌନା', bn: 'মদৌনা' },
  'Madha': { hi: 'माधा', mr: 'माधा', te: 'మాధా', kn: 'ಮಾಧಾ', ta: 'மாதா', or: 'ମାଧା', bn: 'মাধা' },
  'Madhwani': { hi: 'माधवानी', mr: 'माधवानी', te: 'మాధ్వానీ', kn: 'ಮಾಧ್ವಾನಿ', ta: 'மாத்வானி', or: 'ମାଧୱାନି', bn: 'মাধওয়ানি' },
  'Majoka': { hi: 'मजोका', mr: 'मजोका', te: 'మజోకా', kn: 'ಮಜೋಕಾ', ta: 'மஜோகா', or: 'ମଜୋକା', bn: 'মজোকা' },
  'Malak': { hi: 'मलक', mr: 'मलक', te: 'మలక్', kn: 'ಮಲಕ್', ta: 'மலக்', or: 'ମଲକ', bn: 'মলক' },
  'Malwan': { hi: 'मालवण', mr: 'मालवण', te: 'మాల్వన్', kn: 'ಮಾಲ್ವನ್', ta: 'மால்வன்', or: 'ମାଲୱନ', bn: 'মালওয়ান' },
  'Mangal': { hi: 'मंगल', mr: 'मंगल', te: 'మంగళ్', kn: 'ಮಂಗಳ್', ta: 'மங்கல்', or: 'ମଙ୍ଗଳ', bn: 'মঙ্গল' },
  'Mehla': { hi: 'मेहला', mr: 'मेहला', te: 'మెహ్లా', kn: 'ಮೆಹ್ಲಾ', ta: 'மெஹ்லா', or: 'ମେହଲା', bn: 'মেহলা' },
  'Mighani': { hi: 'मिघानी', mr: 'मिघानी', te: 'మిఘానీ', kn: 'ಮಿಘಾನಿ', ta: 'மிகானி', or: 'ମିଘାନି', bn: 'মিঘানি' },
  'Motlani': { hi: 'मोतलानी', mr: 'मोतलानी', te: 'మోత్లానీ', kn: 'ಮೋತ್ಲಾನಿ', ta: 'மோத்லானி', or: 'ମୋତଲାନି', bn: 'মোতলানি' },
  'Mudai': { hi: 'मुदाई', mr: 'मुदाई', te: 'ముదాయి', kn: 'ಮುದಾಯಿ', ta: 'முதாய்', or: 'ମୁଦାଇ', bn: 'মুদাই' },
  'Mugri': { hi: 'मुगरी', mr: 'मुगरी', te: 'ముగ్రి', kn: 'ಮುಗ್ರಿ', ta: 'முக்ரி', or: 'ମୁଗ୍ରି', bn: 'মুগ্রি' },
  'Nagiya': { hi: 'नागिया', mr: 'नागिया', te: 'నాగియా', kn: 'ನಾಗಿಯಾ', ta: 'நாகியா', or: 'ନାଗିଆ', bn: 'নাগিয়া' },
  'Nahar': { hi: 'नाहर', mr: 'नाहर', te: 'నాహర్', kn: 'ನಾಹರ್', ta: 'நாஹர்', or: 'ନାହର', bn: 'নাহার' },
  'Napa': { hi: 'नापा', mr: 'नापा', te: 'నాపా', kn: 'ನಾಪಾ', ta: 'நாபா', or: 'ନାପା', bn: 'নাপা' },
  'Naruka': { hi: 'नरूका', mr: 'नरुका', te: 'నరూకా', kn: 'ನರೂಕಾ', ta: 'நரூகா', or: 'ନରୁକା', bn: 'নরুকা' },
  'Neeliwal': { hi: 'नीलीवाल', mr: 'नीलीवाल', te: 'నీలివాల్', kn: 'ನೀಲಿವಾಲ್', ta: 'நீலிவால்', or: 'ନୀলিୱାଲ', bn: 'নীলিওয়াল' },
  'Niver': { hi: 'निवेर', mr: 'निवेर', te: 'నివేర్', kn: 'ನಿವೇರ್', ta: 'நிவேர்', or: 'ନିଭେର', bn: 'নিভের' },
  'Nothey': { hi: 'नोथे', mr: 'नोथे', te: 'నోథే', kn: 'ನೋಥೇ', ta: 'நோதே', or: 'ନୋଥେ', bn: 'নোথে' },
  'Others': { hi: 'Others', mr: 'Others', te: 'Others', kn: 'Others', ta: 'Others', or: 'Others', bn: 'Others' },
  'Plawar': { hi: 'पलावर', mr: 'पलावर', te: 'పలావర్', kn: 'ಪಲಾವರ್', ta: 'பலாவர்', or: 'ପଲାୱର', bn: 'পলাওয়ার' },
  'Sangawat': { hi: 'सांगावत', mr: 'सांगावत', te: 'సాంగావత్', kn: 'ಸಾಂಗಾವತ್', ta: 'சாங்காவத்', or: 'ସାଙ୍ଗାୱତ', bn: 'সাঙ্গাওয়াত' },
  'Sargani': { hi: 'सरगानी', mr: 'सरगानी', te: 'సర్గానీ', kn: 'ಸರ್ಗಾನಿ', ta: 'சர்கானி', or: 'ସରଗାନି', bn: 'সরগানি' },
  'Shandilya': { hi: 'शांडिल्य', mr: 'शांडिल्य', te: 'శాండిల్య', kn: 'ಶಾಂಡಿಲ್ಯ', ta: 'சாண்டில்ய', or: 'ଶାଣ୍ଡିଲ୍ୟ', bn: 'শাণ্ডিল্য' },
  'Shoda': { hi: 'शोदा', mr: 'शोदा', te: 'శోదా', kn: 'ಶೋದಾ', ta: 'சோதா', or: 'ଶୋଦା', bn: 'শোদা' },
  'Sisodiya': { hi: 'सिसोदिया', mr: 'सिसोदिया', te: 'సిసోదియా', kn: 'ಸಿಸೋದಿಯಾ', ta: 'சிசோதியா', or: 'ସିସୋଦିଆ', bn: 'সিসোদিয়া' },
  'Sravan': { hi: 'श्रवण', mr: 'श्रवण', te: 'శ్రవణ్', kn: 'ಶ್ರವಣ್', ta: 'ஸ்ரவண்', or: 'ଶ୍ରବଣ', bn: 'শ্রবণ' },
  'Sulkhani': { hi: 'सुलखानी', mr: 'सुलखानी', te: 'సుల్ఖానీ', kn: 'ಸುಲ್ಖಾನಿ', ta: 'சுல்கானி', or: 'ସୁଲଖାନି', bn: 'সুলখানি' },
  'Sura': { hi: 'सूरा', mr: 'सूरा', te: 'సూరా', kn: 'ಸೂರಾ', ta: 'சூரா', or: 'ସୂରା', bn: 'সূরা' },
  'Thahiya': { hi: 'थाहिया', mr: 'थाहिया', te: 'థాహియా', kn: 'ಥಾಹಿಯಾ', ta: 'தாஹியா', or: 'ଥାହିଆ', bn: 'থাহিয়া' },
  'Tihal': { hi: 'तिहाल', mr: 'तिहाल', te: 'తిహాల్', kn: 'ತಿಹಾಲ್', ta: 'திஹால்', or: 'ତିହାଲ', bn: 'তিহাল' },
  'Tumrail': { hi: 'तुमरैल', mr: 'तुमरैल', te: 'తుమ్రైల్', kn: 'ತುಮ್ರೈಲ್', ta: 'தும்ரைல்', or: 'ତୁମরୈଲ', bn: 'তুমরেল' },
  'Udesi': { hi: 'उदेसी', mr: 'उदेसी', te: 'ఉదేసి', kn: 'ಉದೇಸಿ', ta: 'உதேசி', or: 'ଉଦେସି', bn: 'উদেসি' },
  'Vavru': { hi: 'वावरू', mr: 'वावरू', te: 'వావరు', kn: 'ವಾವರು', ta: 'வாவ்ரு', or: 'ଭାୱରୁ', bn: 'ভাওরু' },
  'Waweja': { hi: 'वावेजा', mr: 'वावेजा', te: 'వావేజా', kn: 'ವಾವೇಜಾ', ta: 'வாவேஜா', or: 'ୱାୱେଜା', bn: 'ওয়াওয়েজা' },
  'karla': { hi: 'करला', mr: 'कर्ला', te: 'కర్లా', kn: 'ಕರ್ಲಾ', ta: 'கர்லா', or: 'କର୍ଲା', bn: 'করলা' },
  'Mouri': { hi: 'मौरी', mr: 'मौरी', te: 'మౌరి', kn: 'ಮೌರಿ', ta: 'மௌரி', or: 'ମୌରୀ', bn: 'মৌরি' },
  'Pathraan': { hi: 'पथरान', mr: 'पथरान', te: 'పథ్రాన్', kn: 'ಪಥ್ರಾನ್', ta: 'பத்ரான்', or: 'ପଥରାନ', bn: 'পথরান' },
};

function getNorthIndianSurnameTransliterations(surname: string): SurnameTransliterations {
  const verified = NORTH_INDIAN_SURNAME_TRANSLITERATIONS[surname] || {};
  return {
    en: surname,
    hi: verified.hi ?? surname,
    te: verified.te ?? surname,
    kn: verified.kn ?? surname,
    ta: verified.ta ?? surname,
    mr: verified.mr ?? surname,
    or: verified.or ?? surname,
    bn: verified.bn ?? surname,
  };
}

function buildNorthIndianSurnameEntries(): NorthIndianSurnameEntry[] {
  return NORTH_INDIAN_SURNAMES_RAW_LIST.map((surname, index) => {
    const orderIndex = index + 1;
    const trimmed = surname.trim();
    const firstChar = trimmed.charAt(0).toUpperCase();
    const letter = /[A-Z]/.test(firstChar) ? firstChar : '#';

    return {
      orderIndex,
      id: `north_surname_${orderIndex}_${letter}_${trimmed.replace(/[^a-zA-Z0-9]/g, '_')}`,
      surname,
      category: 'North-Indian',
      letter,
      transliterations: getNorthIndianSurnameTransliterations(surname),
    };
  });
}

export const NORTH_INDIAN_SURNAME_ENTRIES: NorthIndianSurnameEntry[] =
  buildNorthIndianSurnameEntries();

export function getNorthIndianSurnameByLanguage(
  entry: NorthIndianSurnameEntry,
  language: LanguageCode
): string {
  return entry.transliterations[language] || entry.surname;
}
