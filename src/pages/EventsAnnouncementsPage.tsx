import React, { useState, useEffect } from 'react';
import { CommunityEvent, SupportedLanguage } from '../types';
import { Calendar, MapPin, CheckCircle, Video, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { CANONICAL_COMMUNITY_EVENTS } from '../data/archivalSeedData';
import { ContentDetailModal, ContentDetailItem } from '../components/ContentDetailModal';

interface EventsPageProps {
  onNavigate: (path: string) => void;
}

const EVENT_UI_TRANSLATIONS: Record<SupportedLanguage, {
  badge: string;
  title: string;
  subtitle: string;
  virtualStream: string;
  capacityLabel: string;
  registeredLabel: string;
  registerBtn: string;
  youAreRegistered: string;
  closedCapacity: string;
  viewDetails: string;
}> = {
  en: {
    badge: 'Gatherings, Symposiums & Heritage Tours',
    title: 'Events & Community Announcements',
    subtitle: 'Stay connected with our global research seminars, on-site archaeological explorations, and annual cultural celebrations.',
    virtualStream: 'Virtual Stream',
    capacityLabel: 'Capacity',
    registeredLabel: 'Registered',
    registerBtn: 'Register to Attend',
    youAreRegistered: 'You are registered for this event',
    closedCapacity: 'Registration Closed (Capacity Reached)',
    viewDetails: 'View Event Details →'
  },
  hi: {
    badge: 'सम्मेलन, संगोष्ठियाँ और विरासत यात्राएँ',
    title: 'कार्यक्रम और सामुदायिक घोषणाएँ',
    subtitle: 'हमारे वैश्विक शोध सेमिनारों, पुरातात्विक अन्वेषणों और वार्षिक सांस्कृतिक समारोहों से जुड़े रहें।',
    virtualStream: 'वर्चुअल स्ट्रीम',
    capacityLabel: 'क्षमता',
    registeredLabel: 'पंजीकृत',
    registerBtn: 'भाग लेने के लिए पंजीकरण करें',
    youAreRegistered: 'आप इस कार्यक्रम के लिए पंजीकृत हैं',
    closedCapacity: 'पंजीकरण बंद (क्षमता पूर्ण)',
    viewDetails: 'कार्यक्रम विवरण देखें →'
  },
  te: {
    badge: 'సమావేశాలు, సదస్సులు & వారసత్వ యాత్రలు',
    title: 'కార్యక్రమాలు & కమ్యూనిటీ ప్రకటనలు',
    subtitle: 'మా అంతర్జాతీయ పరిశోధన సదస్సులు, పురావస్తు అన్వేషణలు మరియు వార్షిక సాంస్కృతిక వేడుకలతో అనుసంధానమై ఉండండి.',
    virtualStream: 'వర్చువల్ స్ట్రీమ్',
    capacityLabel: 'పరిమితి',
    registeredLabel: 'నమోదైనవారు',
    registerBtn: 'పాల్గొనడానికి నమోదు చేసుకోండి',
    youAreRegistered: 'మీరు ఈ కార్యక్రమానికి నమోదు చేసుకున్నారు',
    closedCapacity: 'నమోదు ముగిసింది',
    viewDetails: 'కార్యక్రమ వివరాలు చూడండి →'
  },
  kn: {
    badge: 'ಸಮ್ಮೇಳನಗಳು, ವಿಚಾರ ಸಂಕಿರಣಗಳು ಮತ್ತು ಪರಂಪರೆಯ ಪ್ರವಾಸಗಳು',
    title: 'ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮುದಾಯ ಪ್ರಕಟಣೆಗಳು',
    subtitle: 'ನಮ್ಮ ಜಾಗತಿಕ ಸಂಶೋಧನಾ ವಿಚಾರ ಸಂಕಿರಣಗಳು, ಪುರಾತತ್ತ್ವ ಶಾಸ್ತ್ರದ ಅನ್ವೇಷಣೆಗಳು ಮತ್ತು ವಾರ್ಷಿಕ ಸಾಂಸ್ಕೃತಿಕ ಆಚರಣೆಗಳೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ.',
    virtualStream: 'ವರ್ಚುವಲ್ ಸ್ಟ್ರೀಮ್',
    capacityLabel: 'ಸಾಮರ್ಥ್ಯ',
    registeredLabel: 'ನೋಂದಾಯಿತರು',
    registerBtn: 'ಭಾಗವಹಿಸಲು ನೋಂದಾಯಿಸಿ',
    youAreRegistered: 'ನೀವು ಈ ಕಾರ್ಯಕ್ರಮಕ್ಕೆ ನೋಂದಾಯಿಸಿಕೊಂಡಿದ್ದೀರಿ',
    closedCapacity: 'ನೋಂದಣಿ ಮುಕ್ತಾಯವಾಗಿದೆ',
    viewDetails: 'ಕಾರ್ಯಕ್ರಮದ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ →'
  },
  ta: {
    badge: 'கூட்டங்கள், கருத்தரங்குகள் & பாரம்பரியப் பயணங்கள்',
    title: 'நிகழ்வுகள் & சமூக அறிவிப்புகள்',
    subtitle: 'எமது உலகளாவிய ஆராய்ச்சி கருத்தரங்குகள், தொல்லியல் ஆய்வுகள் மற்றும் வருடாந்திர கலாச்சார விழாக்களுடன் இணைந்திருங்கள்.',
    virtualStream: 'இணைய நேரலை',
    capacityLabel: 'இருக்கைகள்',
    registeredLabel: 'பதிவு செய்தவர்கள்',
    registerBtn: 'பங்கேற்கப் பதிவு செய்க',
    youAreRegistered: 'இந்த நிகழ்விற்கு நீங்கள் பதிவு செய்துள்ளீர்கள்',
    closedCapacity: 'பதிவு முடிவடைந்தது',
    viewDetails: 'நிகழ்வு விவரங்களைக் காண்க →'
  },
  mr: {
    badge: 'संमेलने, परिसंवाद आणि वारसा सहली',
    title: 'कार्यक्रम आणि सामुदायिक घोषणा',
    subtitle: 'आमच्या जागतिक संशोधन सेमिनार, पुरातत्त्वीय शोध आणि वार्षिक सांस्कृतिक सोहळ्यांशी जोडलेले रहा.',
    virtualStream: 'व्हर्च्युअल स्ट्रीम',
    capacityLabel: 'क्षमता',
    registeredLabel: 'नोंदणीकृत',
    registerBtn: 'सहभागी होण्यासाठी नोंदणी करा',
    youAreRegistered: 'तुम्ही या कार्यक्रमासाठी नोंदणी केली आहे',
    closedCapacity: 'नोंदणी बंद (क्षमता पूर्ण)',
    viewDetails: 'कार्यक्रमाचा तपशील पहा →'
  },
  or: {
    badge: 'ସମ୍ମିଳନୀ, ଆଲୋଚନାଚକ୍ର ଏବଂ ଐତିହ୍ୟ ଯାତ୍ରା',
    title: 'କାର୍ଯ୍ୟକ୍ରମ ଏବଂ ସାମୁଦାୟିକ ଘୋଷଣା',
    subtitle: 'ଆମର ବିଶ୍ୱସ୍ତରୀୟ ଗବେଷଣା ସେମିନାର, ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅନ୍ୱେଷଣ ଏବଂ ବାର୍ଷିକ ସାଂସ୍କୃତିକ ଉତ୍ସବ ସହିତ ଯୋଡ଼ି ହୋଇ ରୁହନ୍ତୁ।',
    virtualStream: 'ଭର୍ଚୁଆଲ୍ ଷ୍ଟ୍ରିମ୍',
    capacityLabel: 'କ୍ଷମତା',
    registeredLabel: 'ପଞ୍ଜୀକୃତ',
    registerBtn: 'ଯୋଗଦେବାକୁ ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
    youAreRegistered: 'ଆପଣ ଏହି କାର୍ଯ୍ୟକ୍ରମ ପାଇଁ ପଞ୍ଜୀକୃତ ଅଛନ୍ତି',
    closedCapacity: 'ପଞ୍ଜୀକରଣ ବନ୍ଦ',
    viewDetails: 'କାର୍ଯ୍ୟକ୍ରମ ବିବରଣୀ ଦେଖନ୍ତୁ →'
  },
  bn: {
    badge: 'সমাবেশ, সিম্পোজিয়াম ও ঐতিহ্য ভ্রমণ',
    title: 'অনুষ্ঠান ও সামাজিক ঘোষণা',
    subtitle: 'আমাদের বৈশ্বিক গবেষণা সেমিনার, প্রত্নতাত্ত্বিক অনুসন্ধান এবং বার্ষিক সাংস্কৃতিক উদযাপনের সাথে যুক্ত থাকুন।',
    virtualStream: 'ভার্চুয়াল স্ট্রিম',
    capacityLabel: 'ধারণক্ষমতা',
    registeredLabel: 'নিবন্ধিত',
    registerBtn: 'অংশগ্রহণের জন্য নিবন্ধন করুন',
    youAreRegistered: 'আপনি এই অনুষ্ঠানের জন্য নিবন্ধিত হয়েছেন',
    closedCapacity: 'নিবন্ধন বন্ধ',
    viewDetails: 'অনুষ্ঠানের বিবরণ দেখুন →'
  }
};

const EVENT_CONTENT_TRANSLATIONS: Record<string, Partial<Record<SupportedLanguage, { title: string; description: string }>>> = {
  ev_symposium_2025: {
    hi: {
      title: 'सूर्यवंशी पुरालेख और वंशावली पर वार्षिक संगोष्ठी',
      description: 'ओडिशा, आंध्र प्रदेश, तेलंगाना, कर्नाटक और महाराष्ट्र के इतिहासकारों, पुरालेखवेत्ताओं और समुदाय के सदस्यों की एक हाइब्रिड शैक्षणिक सभा जो नए डिजिटल किए गए ताड़पत्र पांडुलिपियों की समीक्षा करती है।'
    },
    te: {
      title: 'సూర్యవంశ శాసనాలు & వంశావళిపై వార్షిక సదస్సు',
      description: 'ఒడిశా, ఆంధ్రప్రదేశ్, తెలంగాణ, కర్ణాటక మరియు మహారాష్ట్రల నుండి చరిత్రకారులు, శాసన పరిశోధకులు మరియు కమ్యూనిటీ సభ్యులు కొత్తగా డిజిటైజ్ చేసిన తాళపత్రాలను సమీక్షించే అకాడెమిక్ సదస్సు.'
    },
    kn: {
      title: 'ಸೂರ್ಯವಂಶದ ಶಾಸನಗಳು ಮತ್ತು ವಂಶಾವಳಿಯ ವಾರ್ಷಿಕ ವಿಚಾರ ಸಂಕಿರಣ',
      description: 'ಒಡಿಶಾ, ಆಂಧ್ರಪ್ರದೇಶ, ತೆಲಂಗಾಣ, ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದ ಇತಿಹಾಸಕಾರರು, ಶಾಸನತಜ್ಞರು ಮತ್ತು ಸಮುದಾಯದ ಸದಸ್ಯರು ಹೊಸದಾಗಿ ಡಿಜಿಟಲೀಕರಿಸಿದ ತಾಳೆಗರಿ ಹಸ್ತಪ್ರತಿಗಳನ್ನು ಪರಿಶೀಲಿಸುವ ಶೈಕ್ಷಣಿಕ ಸಮಾವೇಶ.'
    },
    ta: {
      title: 'சூர்யவம்ச கல்வெட்டியல் & வம்சாவளி குறித்த வருடாந்திர கருத்தரங்கு',
      description: 'ஒடிசா, ஆந்திரா, தெலுங்கானா, கர்நாடகா மற்றும் மகாராஷ்டிராவைச் சேர்ந்த வரலாற்றாசிரியர்கள் மற்றும் கல்வெட்டு அறிஞர்கள் பங்கேற்கும் ஆய்வுக் கருத்தரங்கு.'
    },
    mr: {
      title: 'सूर्यवंशी शिलालेख आणि वंशावळीवर वार्षिक परिसंवाद',
      description: 'ओडिशा, आंध्र प्रदेश, तेलंगणा, कर्नाटक आणि महाराष्ट्रातील इतिहासकार, पुरालेखतज्ज्ञ आणि समाज बांधवांची नव्याने डिजिटायझेशन केलेल्या ताडपत्र हस्तलिखितांचा आढावा घेणारी परिषद.'
    },
    or: {
      title: 'ସୂର୍ଯ୍ୟବଂଶୀ ଶିଳାଲେଖ ଏବଂ ବଂଶାବଳୀ ଉପରେ ବାର୍ଷିକ ଆଲୋଚନାଚକ୍ର',
      description: 'ଓଡ଼ିଶା, ଆନ୍ଧ୍ରପ୍ରଦେଶ, ତେଲେଙ୍ଗାନା, କର୍ଣ୍ଣାଟକ ଏବଂ ମହାରାଷ୍ଟ୍ରର ଇତିହାସକାର, ଶିଳାଲେଖ ବିଶେଷଜ୍ଞ ଏବଂ ସମାଜର ସଦସ୍ୟମାନଙ୍କର ଏକ ଶୈକ୍ଷିକ ସମ୍ମିଳନୀ।'
    },
    bn: {
      title: 'সূর্যবংশী প্রত্নলিপি ও বংশাবলী বিষয়ক বার্ষিক সিম্পোজিয়াম',
      description: 'ওড়িশা, অন্ধ্রপ্রদেশ, তেলেঙ্গানা, কর্ণাটক ও মহারাষ্ট্রের ইতিহাসবিদ, প্রত্নলিপিবিদ এবং সম্প্রদায়ের সদস্যদের একটি যৌথ একাডেমিক সমাবেশ।'
    }
  },
  ev_barabati_walk_2025: {
    hi: {
      title: 'बाराबती किला और कोणार्क विरासत अन्वेषण यात्रा',
      description: 'कटक में बाराबती किले की खाइयों, पुरी जगन्नाथ मंदिर के अभिलेखों और कोणार्क सूर्य मंदिर परिसर की 3-दिवसीय निर्देशित विरासत यात्रा।'
    },
    te: {
      title: 'బారాబతి కోట & కోణార్క్ వారసత్వ అన్వేషణ యాత్ర',
      description: 'కటక్‌లోని బారాబతి కోట, పూరీ జగన్నాథ దేవాలయ శాసనాలు మరియు కోణార్క్ సూర్య దేవాలయ సముదాయాన్ని సందర్శించే 3 రోజుల వారసత్వ యాత్ర.'
    },
    kn: {
      title: 'ಬಾರಾಬತಿ ಕೋಟೆ ಮತ್ತು ಕೋನಾರ್ಕ್ ಪರಂಪರೆಯ ಅನ್ವೇಷಣಾ ಪ್ರವಾಸ',
      description: 'ಕಟಕ್‌ನ ಬಾರಾಬತಿ ಕೋಟೆ, ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ದಾಖಲೆಗಳು ಮತ್ತು ಕೋನಾರ್ಕ್ ಸೂರ್ಯ ದೇವಾಲಯದ ಸಂಕೀರ್ಣಕ್ಕೆ 3 ದಿನಗಳ ಮಾರ್ಗದರ್ಶಿತ ಪರಂಪರೆಯ ಪ್ರವಾಸ.'
    },
    ta: {
      title: 'பாராபதி கோட்டை & கொனார்க் பாரம்பரிய ஆய்வுப் பயணம்',
      description: 'கட்டாக்கில் உள்ள பாராபதி கோட்டை, பூரி ஜெகந்நாதர் கோயில் ஆவணங்கள் மற்றும் கொனார்க் சூரிய கோயில் வளாகத்திற்கான 3 நாள் வழிகாட்டப்பட்ட பாரம்பரியப் பயணம்.'
    },
    mr: {
      title: 'बाराबती किल्ला आणि कोणार्क वारसा शोध सहल',
      description: 'कटक येथील बाराबती किल्ला, पुरी जगन्नाथ मंदिरातील अभिलेख आणि कोणार्क सूर्य मंदिर परिसराची ३ दिवसीय मार्गदर्शित वारसा सहल.'
    },
    or: {
      title: 'ବାରବାଟୀ ଦୁର୍ଗ ଏବଂ କୋଣାର୍କ ଐତିହ୍ୟ ଅନ୍ୱେଷଣ ଯାତ୍ରା',
      description: 'କଟକର ବାରବାଟୀ ଦୁର୍ଗ, ପୁରୀ ଜଗନ୍ନାଥ ମନ୍ଦିର ଅଭିଲେଖ ଏବଂ କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ପରିସରକୁ ୩-ଦିବସୀୟ ମାର୍ଗଦର୍ଶିତ ଐତିହ୍ୟ ଯାତ୍ରା।'
    },
    bn: {
      title: 'বারাবাটি দুর্গ ও কোনার্ক ঐতিহ্য অন্বেষণ ভ্রমণ',
      description: 'কটকের বারাবাটি দুর্গ, পুরী জগন্নাথ মন্দিরের নথিপত্র এবং কোনার্ক সূর্য মন্দির কমপ্লেক্সে ৩ দিনের গাইডেড হেরিটেজ এক্সপিডিশন।'
    }
  }
};

export const EventsAnnouncementsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const ui = EVENT_UI_TRANSLATIONS[language] || EVENT_UI_TRANSLATIONS.en;
  const [events, setEvents] = useState<(CommunityEvent & { is_registered?: boolean })[]>(CANONICAL_COMMUNITY_EVENTS);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/community/events');
      if (res.ok) {
        const d = await res.json();
        if (d.events && d.events.length > 0) {
          setEvents(d.events);
        }
      }
    } catch {
      // Fallback to canonical seed events in static mode
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId: string) => {
    if (!user) {
      onNavigate('/login');
      return;
    }

    try {
      const res = await fetch(`/api/community/events/${eventId}/register`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Confirmation details recorded.');
        fetchEvents();
      } else {
        setMessage(data.error || 'Failed to register.');
      }
    } catch {
      setMessage('Registration recorded locally for this session.');
      setEvents(prev =>
        prev.map(ev =>
          ev.id === eventId
            ? { ...ev, is_registered: true, registered_count: ev.registered_count + 1 }
            : ev
        )
      );
    }
  };

  const localizedEvents = events.map(ev => {
    const tr = language !== 'en' ? EVENT_CONTENT_TRANSLATIONS[ev.id]?.[language] : undefined;
    return {
      ...ev,
      title: tr?.title || ev.title,
      description: tr?.description || ev.description
    };
  });

  const selectedEvent = selectedEventId ? localizedEvents.find(e => e.id === selectedEventId) || null : null;
  const archiveBase = `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/`;
  const evImgMap: Record<string, string> = {
    ev_01: `${archiveBase}barabati_fort_gateway.jpg`,
    ev_02: `${archiveBase}odia_palm_leaf_manuscript.jpg`,
    ev_03: `${archiveBase}kondavidu_fort_hills.jpg`,
    ev_symposium_2025: `${archiveBase}barabati_fort_gateway.jpg`,
    ev_barabati_walk_2025: `${archiveBase}kondavidu_fort_hills.jpg`
  };

  const modalItem: ContentDetailItem | null = selectedEvent
    ? {
        id: selectedEvent.id,
        title: selectedEvent.title,
        subtitle: `${selectedEvent.event_type.toUpperCase()} • ${selectedEvent.is_virtual ? ui.virtualStream : 'On-Site'}`,
        badge: selectedEvent.event_type,
        era: selectedEvent.date_text,
        location: selectedEvent.location,
        imageUrl: evImgMap[selectedEvent.id] || `${archiveBase}barabati_fort_gateway.jpg`,
        imageLayout: 'banner',
        content: selectedEvent.description,
        metadata: [
          { label: 'Schedule', value: selectedEvent.date_text },
          { label: 'Location', value: selectedEvent.location },
          { label: ui.capacityLabel, value: `${selectedEvent.registered_count} / ${selectedEvent.max_attendees} ${ui.registeredLabel}` }
        ]
      }
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Calendar className="w-4 h-4" />
          <span>{ui.badge}</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          {ui.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          {ui.subtitle}
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs sm:text-sm text-emerald-300">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {localizedEvents.map((ev, idx) => {
          const isFull = ev.registered_count >= ev.max_attendees;
          const fallbackImgs = [
            `${archiveBase}barabati_fort_gateway.jpg`,
            `${archiveBase}odia_palm_leaf_manuscript.jpg`,
            `${archiveBase}kondavidu_fort_hills.jpg`
          ];
          const thumbUrl = evImgMap[ev.id] || fallbackImgs[idx % fallbackImgs.length];
          return (
            <div
              key={ev.id}
              onClick={() => setSelectedEventId(ev.id)}
              className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 shadow-xl hover:border-[#c99738] transition-all cursor-pointer group flex flex-col md:flex-row gap-6 items-start"
            >
              <img
                src={thumbUrl}
                alt={ev.title}
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = '1';
                    target.src = `${archiveBase}barabati_fort_gateway.jpg`;
                  }
                }}
                className="w-full md:w-52 h-48 md:h-44 rounded-2xl object-cover object-center shrink-0 border border-[#c99738]/40 bg-stone-950"
              />
              <div className="flex-1 space-y-4 min-w-0 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-1 rounded-full bg-stone-900 border border-stone-800">
                      {ev.event_type}
                    </span>
                    {ev.is_virtual && (
                      <span className="text-xs text-sky-400 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-950/60 border border-sky-800">
                        <Video className="w-3 h-3" /> {ui.virtualStream}
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-stone-400 flex items-center gap-4">
                    <span>{ui.capacityLabel}: {ev.registered_count} / {ev.max_attendees} {ui.registeredLabel}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-stone-100 group-hover:text-[#fae29c] transition-colors">
                    {ev.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#e8c872] mt-1.5 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {ev.date_text}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {ev.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-royal-serif">
                  {ev.description}
                </p>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                  {ev.is_registered ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/60">
                      <CheckCircle className="w-4 h-4" /> {ui.youAreRegistered}
                    </span>
                  ) : isFull ? (
                    <span className="text-xs text-rose-400 font-semibold">
                      {ui.closedCapacity}
                    </span>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleRegister(ev.id);
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{ui.registerBtn}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <span className="text-xs font-semibold text-[#e8c872]">{ui.viewDetails}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ContentDetailModal item={modalItem} onClose={() => setSelectedEventId(null)} />
    </div>
  );
};


