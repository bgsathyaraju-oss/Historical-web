import { LanguageCode } from '../types';

export interface PillarItem {
  title: string;
  desc: string;
}

export interface PageTranslations {
  home: {
    pillarsBadge: string;
    pillarsTitle: string;
    pillarsSubtitle: string;
    pillars: PillarItem[];
    researchBadge: string;
    researchTitle: string;
    researchSubtitle: string;
    readFull: string;
    viewAllResearch: string;
    timelineBadge: string;
    timelineTitle: string;
    timelineSubtitle: string;
    viewFullTimeline: string;
    galleryBadge: string;
    galleryTitle: string;
    gallerySubtitle: string;
    viewFullGallery: string;
    communityBadge: string;
    communityTitle: string;
    communitySubtitle: string;
    joinBtn: string;
    directoryBtn: string;
  };
  kingsQueens: {
    badge: string;
    title: string;
    subtitle: string;
    listTitle: string;
    alternateSpellings: string;
    dynastyLabel: string;
    titlesLabel: string;
    biographyLabel: string;
    eventsLabel: string;
    placesLabel: string;
    citationsLabel: string;
  };
  genealogy: {
    badge: string;
    title: string;
    subtitle: string;
    chartTitle: string;
    chartSubtitle: string;
    claimsBadge: string;
    claimsTitle: string;
    claimsSubtitle: string;
  };
  inscriptions: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    showingCount: string;
    rulerLabel: string;
    findspotLabel: string;
    eraLabel: string;
    dynastyLabel: string;
    transcriptionLabel: string;
    translationLabel: string;
    significanceLabel: string;
  };
  monuments: {
    badge: string;
    title: string;
    subtitle: string;
    patronLabel: string;
    styleLabel: string;
    significanceLabel: string;
    sourcesLabel: string;
  };
  timeline: {
    badge: string;
    title: string;
    subtitle: string;
    filterPlaceholder: string;
    rulerLabel: string;
    evidenceLabel: string;
    citationsLabel: string;
    methodologyLabel: string;
  };
  odraDesha: {
    badge: string;
    title: string;
    subtitle: string;
    regionsTitle: string;
    regionsSubtitle: string;
    odraTitle: string;
    odraDesc: string;
    utkalaTitle: string;
    utkalaDesc: string;
    kalingaTitle: string;
    kalingaDesc: string;
    trikalingaTitle: string;
    trikalingaDesc: string;
    coreRulers: string;
  };
  gajapathi: {
    badge: string;
    title: string;
    subtitle: string;
    tabChronology: string;
    tabAdministration: string;
    tabMilitary: string;
    tabCulture: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionDesc: string;
    methodologyTitle: string;
    methodologyDesc: string;
  };
}

export const PAGE_TRANSLATIONS: Record<LanguageCode, PageTranslations> = {
  // 1. ENGLISH (en)
  en: {
    home: {
      pillarsBadge: 'Foundational Historical Pillars',
      pillarsTitle: 'Core Dimensions of Suryavamsha Odiyaraju Heritage',
      pillarsSubtitle: 'Systematically cataloged based on verified primary epigraphy, royal chronicles, and historical geography.',
      pillars: [
        {
          title: 'Ancient Odra Desha',
          desc: 'Historical geography, territorial evolution from the classical Audra kingdom to the deltaic capital of Varanasi Kataka.'
        },
        {
          title: 'Kalinga & Regional Connections',
          desc: 'Corroborating relations between Odra, Utkala, Kalinga, and Trikalinga through epigraphs and medieval boundary charters.'
        },
        {
          title: 'Gajapathi Kings & Imperial Era',
          desc: 'From Kapilendra Deva to Prataparudra Deva: the golden age of military dominance stretching from Ganges to Kaveri.'
        },
        {
          title: 'Royal Genealogy & Dynasties',
          desc: 'Interactive family-tree clearly distinguishing corroborated epigraphic lineages from traditional vamsavali records.'
        },
        {
          title: 'Inscriptions & Archaeology',
          desc: 'Bilingual copper-plate grants, stone pillar records of Veligalani, Simhachalam, and Lingaraja temple transcripts.'
        },
        {
          title: 'Temples & Monuments',
          desc: 'Architectural patronage of Meghanada Pacheri at Puri, Konark preservation, and Barabati fortresses.'
        },
        {
          title: 'Culture & Living Traditions',
          desc: 'Living martial traditions, Chera Panhara rituals, solar dynastic ceremonies, and community festivals.'
        },
        {
          title: 'Literature & Publications',
          desc: 'Sanskrit works like Sarasvati Vilasa and vernacular masterpieces including Sarala Dasa’s Odia Mahabharata.'
        }
      ],
      researchBadge: 'Peer-Reviewed Historiography',
      researchTitle: 'Featured Historical Monographs & Research',
      researchSubtitle: 'Critical scholarly editions exploring epigraphy, territorial borders, and dynastic succession.',
      readFull: 'Read Full Article',
      viewAllResearch: 'View All Research Papers',
      timelineBadge: 'Chronological Milestones',
      timelineTitle: 'Key Historical Milestones (1434–1540 CE)',
      timelineSubtitle: 'Major events corroborated by contemporary copper plates and temple wall records.',
      viewFullTimeline: 'Explore Complete Timeline',
      galleryBadge: 'Visual Heritage',
      galleryTitle: 'Historical Gallery & Visual Archives',
      gallerySubtitle: 'Photographic documentation of fortresses, pillar inscriptions, and sacred architecture.',
      viewFullGallery: 'View Full Gallery',
      communityBadge: 'Living Lineage & Global Community',
      communityTitle: 'Unite, Document & Preserve Our Sovereign Heritage',
      communitySubtitle: 'Join researchers, epigraphists, and diaspora community families across India and the globe.',
      joinBtn: 'Register Account',
      directoryBtn: 'Browse Member Directory'
    },
    kingsQueens: {
      badge: 'Documented Historical Figures',
      title: 'Kings, Queens, Commanders & Scholars of Suryavamsha',
      subtitle: 'Comprehensive biographical dossiers containing documented regnal dates, epigraphic records, citations from Epigraphia Indica, and verified architectural commissions.',
      listTitle: 'Historical Personages',
      alternateSpellings: 'Alternate Spellings',
      dynastyLabel: 'Dynasty',
      titlesLabel: 'Recorded Imperial Titles & Prasastis',
      biographyLabel: 'Scholarly Biography & Historical Significance',
      eventsLabel: 'Chronologically Documented Events',
      placesLabel: 'Associated Fortresses & Kshetrams',
      citationsLabel: 'Primary Inscriptions & Epigraphia Indica Citations'
    },
    genealogy: {
      badge: 'Epigraphic Genealogies vs Traditional Lineages',
      title: 'Royal Genealogy of Suryavamsha Odiyaraju Kshatriya',
      subtitle: 'Visual family-tree distinguishing verified epigraphically corroborated royal parentage from living community vamsavalis and oral memory. In accordance with professional standards, we do not present conjectural lineages as proven biological facts.',
      chartTitle: 'Interactive Dynastic Lineage Chart',
      chartSubtitle: 'Click any royal node for inscriptions & citations',
      claimsBadge: 'Historiographical Evidence Review',
      claimsTitle: 'Evaluation of Key Dynastic Claims & Traditions',
      claimsSubtitle: 'Neutral evaluation of significant dynastic traditions, supporting copper-plate inscriptions, and modern historical consensus.'
    },
    inscriptions: {
      badge: 'Epigraphic Corpus & Primary Sources',
      title: 'Inscriptions & Archaeological Records',
      subtitle: 'The bedrock of historical verification. Browse verified stone inscriptions and copper-plate charters with transcription excerpts, scholarly translations, and Epigraphia Indica volume references.',
      searchPlaceholder: 'Search by ruler, findspot, or charter name...',
      showingCount: 'reviewed epigraphic records',
      rulerLabel: 'Ruler',
      findspotLabel: 'Findspot',
      eraLabel: 'Era / Date',
      dynastyLabel: 'Dynasty',
      transcriptionLabel: 'Primary Inscription Excerpt',
      translationLabel: 'Scholarly Translation & Analysis',
      significanceLabel: 'Historical & Political Significance'
    },
    monuments: {
      badge: 'Architectural Heritage & Dynastic Patronage',
      title: 'Temples, Forts & Royal Monuments',
      subtitle: 'From the monumental Meghanada Pacheri defensive wall of Puri Jagannatha Temple to the pillared pavilions of Draksharama and Simhachalam, explore the lasting architectural imprint of the Suryavamshi rulers.',
      patronLabel: 'Patron Ruler',
      styleLabel: 'Architectural Style',
      significanceLabel: 'Historical Significance',
      sourcesLabel: 'Archival Sources'
    },
    timeline: {
      badge: 'Chronological Master Record',
      title: 'Comprehensive Historical Timeline',
      subtitle: 'Chronological milestone timeline spanning the rise, southern military campaigns, administrative golden age, and regional adaptations of the Suryavamshi rulers from 1434 CE forward.',
      filterPlaceholder: 'Filter by year or ruler (e.g. 1458, Kapilendra)...',
      rulerLabel: 'Ruler Involved',
      evidenceLabel: 'Associated Evidence',
      citationsLabel: 'Primary Citations',
      methodologyLabel: 'Methodological Note'
    },
    odraDesha: {
      badge: 'Historical Geography & Regional Nomenclature',
      title: 'Odra Desha: The Ancient Heart of Eastern Indian Sovereignty',
      subtitle: 'From early classical accounts of the Oretes to the medieval Audra Vishaya, Odra Desha evolved from an agrarian river basin into the imperial nucleus of the Suryavamshi Gajapathi realm, centered at Varanasi Kataka.',
      regionsTitle: 'Demarcation of Ancient Eastern Regions',
      regionsSubtitle: 'Historiographical analysis distinguishes Odra from Kalinga, Utkala, and Trikalinga based on epigraphic boundary charters.',
      odraTitle: 'Odra Desha (Audra)',
      odraDesc: 'Encompassed the central riverine basin of the Mahanadi, Kathajodi, and Baitarani. Capital was Varanasi Kataka (modern Cuttack). Served as the administrative seat of the Suryavamshi Gajapathis.',
      utkalaTitle: 'Utkala',
      utkalaDesc: 'Northern coastal strip extending toward the Subarnarekha and lower Bengal. Celebrated for maritime trade and arts.',
      kalingaTitle: 'Kalinga',
      kalingaDesc: 'Southern maritime domain stretching from the Rishikulya River down to the Godavari, famous for ancient seafaring and port settlements.',
      trikalingaTitle: 'Trikalinga',
      trikalingaDesc: 'The highland tract linking Eastern Ghats with central forested realms, contested by Gangas, Somavamshis, and Gajapathis.',
      coreRulers: 'Core Rulers: Suryavamsha Gajapathis'
    },
    gajapathi: {
      badge: 'Suryavamshi Gajapathi Empire (1434–1541 CE)',
      title: 'The Gajapathi Kings & The Imperial Golden Age',
      subtitle: 'Founded by the military strategist Kapilendra Deva in 1434 CE, the Suryavamshi Gajapathi dynasty transformed Odisha into the supreme military and cultural empire of eastern and peninsular India, ruling under the divine mandate of Lord Jagannatha.',
      tabChronology: 'Imperial Chronology',
      tabAdministration: 'Administration & Feudal Hierarchy',
      tabMilitary: 'Military Campaigns (Ganges to Kaveri)',
      tabCulture: 'Literary & Architectural Patronage'
    },
    about: {
      badge: 'About The Historical Project',
      title: 'Preserving Sovereign Heritage with Epigraphic Rigor',
      subtitle: 'Dedicated to documenting the authentic history of Suryavamsha Odiyaraju Kshatriyas through primary inscriptions, peer-reviewed historiography, and cultural memory.',
      missionTitle: 'Our Mission & Archival Mandate',
      missionDesc: 'To provide a globally accessible, scientifically rigorous digital repository that preserves medieval inscriptions, architecture, and living community lineages without distortion.',
      methodologyTitle: 'Epistemic Standard & Verification',
      methodologyDesc: 'Strict demarcation between primary epigraphy, secondary scholarly consensus, traditional vamsavalis, and oral memory.'
    }
  },

  // 2. TELUGU (te)
  te: {
    home: {
      pillarsBadge: 'ప్రాథమిక చారిత్రక స్తంభాలు',
      pillarsTitle: 'సూర్యవంశ ఒడియరాజు వారసత్వ ప్రధాన విభాగాలు',
      pillarsSubtitle: 'ధృవీకరించబడిన ప్రాథమిక శాసనాలు, రాజ చరిత్రలు మరియు చారిత్రక భౌగోళిక ఆధారాలతో క్రమబద్ధీకరించబడింది.',
      pillars: [
        {
          title: 'ప్రాచీన ఓడ్ర దేశం',
          desc: 'చారిత్రక భౌగోళిక స్వరూపం, ప్రాచీన ఔడ్ర రాజ్యం నుండి వారణాసి కటక రాజధాని వరకు పరిణామ క్రమం.'
        },
        {
          title: 'కళింగ & ప్రాంతీయ సంబంధాలు',
          desc: 'శాసన ఆధారాల ద్వారా ఓడ్ర, ఉత్కళ, కళింగ మరియు త్రికళింగ ప్రాంతాల చారిత్రక సరిహద్దుల విశ్లేషణ.'
        },
        {
          title: 'గజపతి రాజులు & సామ్రాజ్య యుగం',
          desc: 'కపిలేంద్ర దేవ నుండి ప్రతాపరుద్ర దేవుని వరకు: గంగా నది నుండి కావేరి వరకు విస్తరించిన సైనిక స్వర్ణయుగం.'
        },
        {
          title: 'రాజ వంశావళి & రాజవంశాలు',
          desc: 'శాసనబద్ధమైన పూర్వీకుల వరుసను సాంప్రదాయ వంశావళుల నుండి స్పష్టంగా వేరుచేసే కుటుంబ వృక్షం.'
        },
        {
          title: 'శాసనాలు & పురాతత్వ ఆధారాలు',
          desc: 'ద్విభాషా తామ్రశాసనాలు, వెలిగలని, సింహాచలం మరియు లింగరాజ దేవాలయాల శిలాశాసనాల మూల గ్రంథాలు.'
        },
        {
          title: 'దేవాలయాలు & స్మారక కట్టడాలు',
          desc: 'పూరి జగన్నాథ దేవాలయ మేఘనాద పాచేరి, కోణార్క్ సంరక్షణ మరియు బారాబటి కోటల నిర్మాణ శైలి.'
        },
        {
          title: 'సంస్కృతి & సజీవ సంప్రదాయాలు',
          desc: 'సూర్యవంశ క్షత్రియ ఆచారాలు, చెరా పంహర పూజా విధులు మరియు సామాజిక ఉత్సవాలు.'
        },
        {
          title: 'సాహిత్యం & ప్రచురణలు',
          desc: 'సరస్వతీ విలాసం వంటి సంస్కృత గ్రంథాలు మరియు సారళా దాసు ఒడియా మహాభారతం వంటి కావ్యాలు.'
        }
      ],
      researchBadge: 'పరిశోధనాత్మక చరిత్ర రచన',
      researchTitle: 'ప్రముఖ చారిత్రక పరిశోధనా పత్రాలు',
      researchSubtitle: 'శాసనాలు, ప్రాంతీయ సరిహద్దులు మరియు రాజవంశ పరిపాలనను విశ్లేషించే ప్రామాణిక పరిశోధనలు.',
      readFull: 'పూర్తి వ్యాసం చదవండి',
      viewAllResearch: 'అన్ని పరిశోధనా పత్రాలను చూడండి',
      timelineBadge: 'కాలక్రమ మైలురాళ్ళు',
      timelineTitle: 'కీలక చారిత్రక మైలురాళ్ళు (1434–1540 క్రీ.శ.)',
      timelineSubtitle: 'సమకాలీన తామ్ర శాసనాలు మరియు దేవాలయ గోడల ఆధారంగా నిర్ధారించబడిన ప్రధాన ఘట్టాలు.',
      viewFullTimeline: 'పూర్తి కాలక్రమాన్ని చూడండి',
      galleryBadge: 'దృశ్య వారసత్వం',
      galleryTitle: 'చారిత్రక చిత్రశాల & దృశ్య భాండాగారం',
      gallerySubtitle: 'పురాతన కోటలు, స్తంభ శాసనాలు మరియు పవిత్ర నిర్మాణాల ఛాయాచిత్రాలు.',
      viewFullGallery: 'చిత్రశాల చూడండి',
      communityBadge: 'సజీవ వంశావళి & ప్రపంచ వేదిక',
      communityTitle: 'మన సార్వభౌమ వారసత్వాన్ని సమైక్యంగా రక్షిద్దాం',
      communitySubtitle: 'భారతదేశం మరియు ప్రపంచవ్యాప్తంగా ఉన్న పరిశోధకులు, వంశీయులతో కలవండి.',
      joinBtn: 'సభ్యత్వాన్ని నమోదు చేసుకోండి',
      directoryBtn: 'సభ్యుల డైరెక్టరీ'
    },
    kingsQueens: {
      badge: 'చారిత్రక రికార్డులు కలిగిన ప్రముఖులు',
      title: 'సూర్యవంశ రాజులు, రాణులు, సేనాపతులు & పండితులు',
      subtitle: 'పాలనా కాలాలు, ఎపిగ్రాఫియా ఇండికా శాసన ఆధారాలు మరియు ప్రాచీన నిర్మాణాలతో కూడిన సమగ్ర జీవిత చరిత్రలు.',
      listTitle: 'చారిత్రక వ్యక్తులు',
      alternateSpellings: 'ఇతర పేర్లు',
      dynastyLabel: 'రాజవంశం',
      titlesLabel: 'రాజ బిరుదులు & ప్రశస్తులు',
      biographyLabel: 'ప్రామాణిక జీవిత చరిత్ర & ప్రాముఖ్యత',
      eventsLabel: 'కాలక్రమ చారిత్రక సంఘటనలు',
      placesLabel: 'సంబంధిత కోటలు & క్షేత్రాలు',
      citationsLabel: 'ప్రాథమిక శాసనాలు & పరిశోధనా ఆధారాలు'
    },
    genealogy: {
      badge: 'శాసన వంశావళులు వర్సెస్ సాంప్రదాయ కథనాలు',
      title: 'సూర్యవంశ ఒడియరాజు క్షత్రియ రాజ వంశావళి',
      subtitle: 'శాసన ఆధారాల ద్వారా రుజువైన రాజరిక పూర్వీకులను, సాంప్రదాయ కుటుంబ కథల నుండి వేరుచేసి చూపే కుటుంబ వృక్షం.',
      chartTitle: 'పరస్పర స్పందనాత్మక రాజవంశ చార్ట్',
      chartSubtitle: 'శాసనాలు, ఆధారాలు చూడటానికి ఏదైనా రాజ స్థానంపై క్లిక్ చేయండి',
      claimsBadge: 'చారిత్రక సాక్ష్యాల సమీక్ష',
      claimsTitle: 'కీలక రాజవంశ వాదనలు & సంప్రదాయాల విశ్లేషణ',
      claimsSubtitle: 'ముఖ్యమైన సాంప్రదాయాలు మరియు ఆధునిక చారిత్రక ఏకాభిప్రాయం యొక్క నిష్పక్షపాత సమీక్ష.'
    },
    inscriptions: {
      badge: 'శాసన భాండాగారం & ప్రాథమిక ఆధారాలు',
      title: 'శాసనాలు & పురాతత్వ రికార్డులు',
      subtitle: 'చారిత్రక ప్రామాణికతకు పునాది. తామ్రపత్రాలు, శిలాశాసనాలు, పాఠ్య అనువాదాలు మరియు ఎపిగ్రాఫియా ఇండికా రిఫరెన్సులు.',
      searchPlaceholder: 'పాలకుడు, కనుగొన్న ప్రదేశం లేదా శాసనం పేరుతో వెతకండి...',
      showingCount: 'సమీక్షించిన శాసన రికార్డులు',
      rulerLabel: 'పాలకుడు',
      findspotLabel: 'లభించిన ప్రదేశం',
      eraLabel: 'కాలం / తేదీ',
      dynastyLabel: 'రాజవంశం',
      transcriptionLabel: 'మూల శాసన పాఠం',
      translationLabel: 'పండితుల అనువాదం & విశ్లేషణ',
      significanceLabel: 'చారిత్రక & రాజకీయ ప్రాముఖ్యత'
    },
    monuments: {
      badge: 'వాస్తుశిల్ప వారసత్వం & రాజ పోషణ',
      title: 'దేవాలయాలు, కోటలు & రాజభవనాలు',
      subtitle: 'పూరి జగన్నాథ మేఘనాద పాచేరి నుండి ద్రాక్షారామం, సింహాచల మండపాల వరకు సూర్యవంశ రాజుల అద్భుత శిల్పకళా వైభవం.',
      patronLabel: 'నిర్మించిన పాలకుడు',
      styleLabel: 'వాస్తు శైలి',
      significanceLabel: 'చారిత్రక ప్రాముఖ్యత',
      sourcesLabel: 'చారిత్రక ఆధారాలు'
    },
    timeline: {
      badge: 'కాలక్రమ అధికారిక రికార్డు',
      title: 'సమగ్ర చారిత్రక కాలక్రమం',
      subtitle: 'క్రీస్తు శకం 1434 నుండి సూర్యవంశ గజపతుల ఆవిర్భావం, దక్షిణ దేశ విజయాలు మరియు పరిపాలనా ప్రస్థానం.',
      filterPlaceholder: 'సంవత్సరం లేదా రాజు పేరుతో వెతకండి (ఉదా. 1458, కపిలేంద్ర)...',
      rulerLabel: 'సంబంధిత రాజు',
      evidenceLabel: 'సంబంధిత సాక్ష్యం',
      citationsLabel: 'ప్రాథమిక ఆధారాలు',
      methodologyLabel: 'పద్ధతి వివరణ'
    },
    odraDesha: {
      badge: 'చారిత్రక భౌగోళికం & నామకరణం',
      title: 'ఓడ్ర దేశం: తూర్పు భారత సార్వభౌమాధికార ప్రాచీన కేంద్రం',
      subtitle: 'ప్లినీ రచనలలోని ఒరేటెస్ నుండి మధ్యయుగ ఔడ్ర విషయం వరకు, మహానది డెల్టా రాజధాని వారణాసి కటక కేంద్రంగా ఎదిగిన చరిత్ర.',
      regionsTitle: 'ప్రాచీన తూర్పు భారత రాజ్యాల సరిహద్దులు',
      regionsSubtitle: 'శాసన ఆధారాల ప్రకారం ఓడ్ర, కళింగ, ఉత్కళ మరియు త్రికళింగల ప్రత్యేక సరిహద్దుల విశ్లేషణ.',
      odraTitle: 'ఓడ్ర దేశం (ఔడ్ర)',
      odraDesc: 'మహానది, కథాజోడి, బైతరణి లోయ ప్రాంతం. రాజధాని వారణాసి కటకం (నేటి కటక్). సూర్యవంశ గజపతుల ప్రధాన పరిపాలనా కేంద్రం.',
      utkalaTitle: 'ఉత్కళం',
      utkalaDesc: 'సువర్ణరేఖ నది నుండి బెంగాల్ వరకు ఉన్న ఉత్తర తీరప్రాంతం. సముద్ర వాణిజ్యానికి ప్రసిద్ధి.',
      kalingaTitle: 'కళింగం',
      kalingaDesc: 'రుషికుల్య నది నుండి గోదావరి వరకు విస్తరించిన తీరప్రాంతం, ప్రాచీన నౌకా వాణిజ్య కేంద్రం.',
      trikalingaTitle: 'త్రికళింగం',
      trikalingaDesc: 'తూర్పు కనుమలు మరియు అటవీ ప్రాంతాలను కలిపే పర్వత భూభాగం.',
      coreRulers: 'ప్రధాన పాలకులు: సూర్యవంశ గజపతులు'
    },
    gajapathi: {
      badge: 'సూర్యవంశ గజపతి సామ్రాజ్యం (1434–1541 క్రీ.శ.)',
      title: 'గజపతి రాజులు & సామ్రాజ్య స్వర్ణయుగం',
      subtitle: '1434లో కపిలేంద్ర దేవునిచే స్థాపించబడి, జగన్నాథుని ప్రతినిధులుగా గంగా నది నుండి కావేరి వరకు పరిపాలించిన మహా సామ్రాజ్యం.',
      tabChronology: 'సామ్రాజ్య కాలక్రమం',
      tabAdministration: 'పరిపాలన & సైనిక వ్యవస్థ',
      tabMilitary: 'దక్షిణ దేశ దండయాత్రలు (గంగ నుండి కావేరి)',
      tabCulture: 'సాహిత్యం & దేవాలయ శిల్పకళ'
    },
    about: {
      badge: 'చారిత్రక ప్రాజెక్ట్ గురించి',
      title: 'శాసన నిబద్ధతతో సార్వభౌమ వారసత్వ పరిరక్షణ',
      subtitle: 'ప్రాథమిక శాసనాలు, విద్యావేత్తల పరిశోధనలు మరియు సాంస్కృతిక స్మృతుల ద్వారా సూర్యవంశ క్షత్రియుల నిజమైన చరిత్ర నమోదు.',
      missionTitle: 'మా లక్ష్యం & కర్తవ్యం',
      missionDesc: 'మధ్యయుగ శాసనాలు, శిల్పకళ మరియు సజీవ వంశావళులను వక్రీకరణలు లేకుండా ప్రపంచానికి అందించే డిజిటల్ భాండాగారం.',
      methodologyTitle: 'పరిశోధనా ప్రమాణాలు',
      methodologyDesc: 'ప్రాథమిక రాతి-రాగి శాసనాలకు, సాంప్రదాయ మౌఖిక కథనాలకు మధ్య కచ్చితమైన స్పష్టత పాటించడం.'
    }
  },

  // 3. ODIA (or)
  or: {
    home: {
      pillarsBadge: 'ମୌଳିକ ଐତିହାସିକ ସ୍ତମ୍ଭ',
      pillarsTitle: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ ଐତିହ୍ୟର ମୁଖ୍ୟ ବିଭାଗ',
      pillarsSubtitle: 'ପ୍ରାଥମିକ ଶିଳାଲେଖ, ତାମ୍ରଶାସନ ଓ ରାଜକୀୟ ଇତିହାସ ଆଧାରରେ ପ୍ରସ୍ତୁତ ବିଶ୍ୱସନୀୟ ତଥ୍ୟାବଳୀ।',
      pillars: [
        {
          title: 'ପ୍ରାଚୀନ ଓଡ଼୍ର ଦେଶ',
          desc: 'ପ୍ରାଚୀନ ଔଡ୍ର ରାଜ୍ୟଠାରୁ ଆରମ୍ଭ କରି ବାରଣାସୀ କଟକ ରାଜଧାନୀ ପର୍ଯ୍ୟନ୍ତ ଭୌଗୋଳିକ ବିବର୍ତ୍ତନ।'
        },
        {
          title: 'କଳିଙ୍ଗ ଓ ଆଞ୍ଚଳିକ ସମ୍ପର୍କ',
          desc: 'ଅଭିଲେଖ ପ୍ରମାଣ ଭିତ୍ତିରେ ଓଡ଼୍ର, ଉତ୍କଳ, କଳିଙ୍ଗ ଓ ତ୍ରିକଳିଙ୍ଗର ଐତିହାସିକ ସୀମା ବିଶ୍ଳେଷଣ।'
        },
        {
          title: 'ଗଜପତି ରାଜା ଓ ସାମ୍ରାଜ୍ୟ ଯୁଗ',
          desc: 'କପିଳେନ୍ଦ୍ର ଦେବଙ୍କଠାରୁ ପ୍ରତାପରୁଦ୍ର ଦେବ: ଗଙ୍ଗାଠାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ସାମ୍ରାଜ୍ୟ ବିସ୍ତାରର ସ୍ୱର୍ଣ୍ଣଯୁଗ।'
        },
        {
          title: 'ରାଜବଂଶାବଳୀ ଓ ପରମ୍ପରା',
          desc: 'ଶିଳାଲେଖ ସତ୍ୟାପିତ ବଂଶାବଳୀ ସହିତ ପାରମ୍ପରିକ ପୋଥି ତଥ୍ୟର ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ଦର୍ଶାଉଥିବା ଚାର୍ଟ।'
        },
        {
          title: 'ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତତ୍ତ୍ୱ',
          desc: 'ଦ୍ୱିଭାଷୀ ତାମ୍ରଶାସନ, ଭେଲିଗାଲାନି, ସିଂହାଚଳମ ଓ ଲିଙ୍ଗରାଜ ମନ୍ଦିରର ଐତିହାସିକ ଅଭିଲେଖ।'
        },
        {
          title: 'ମନ୍ଦିର ଓ ରାଜକୀୟ କୀର୍ତ୍ତି',
          desc: 'ପୁରୀ ଜଗନ୍ନାଥ ମନ୍ଦିରର ମେଘନାଦ ପାଚେରୀ, କୋଣାର୍କ ସୂର୍ଯ୍ୟ ମନ୍ଦିର ଓ ବାରବାଟୀ ଦୁର୍ଗ ସ୍ଥାପତ୍ୟ।'
        },
        {
          title: 'ସଂସ୍କୃତି ଓ ଜୀବନ୍ତ ପରମ୍ପରା',
          desc: 'ସୂର୍ଯ୍ୟବଂଶୀ କ୍ଷତ୍ରିୟ ପରମ୍ପରା, ଛେରା ପହଁରା ବିଧି, ସୌର ପର୍ବ ଓ ସାମାଜିକ ଉତ୍ସବ।'
        },
        {
          title: 'ସାହିତ୍ୟ ଓ ପ୍ରକାଶନ',
          desc: 'ସରସ୍ୱତୀ ବିଳାସ ଭଳି ସଂସ୍କୃତ ନୀତିଗ୍ରନ୍ଥ ଓ ଆଦିକବି ସାରଳା ଦାସଙ୍କ ଓଡ଼ିଆ ମହାଭାରତ।'
        }
      ],
      researchBadge: 'ପ୍ରମାଣଭିତ୍ତିକ ଇତିହାସ ଗବେଷଣା',
      researchTitle: 'ମୁଖ୍ୟ ଐତିହାସିକ ଗବେଷଣା ପ୍ରବନ୍ଧ',
      researchSubtitle: 'ଶିଳାଲେଖ, ଭୌଗୋଳିକ ସୀମା ଓ ରାଜବଂଶ ଶାସନ ଉପରେ ବିଶିଷ୍ଟ ଐତିହାସିକମାନଙ୍କ ଆଲେଖ୍ୟ।',
      readFull: 'ପୂରା ପ୍ରବନ୍ଧ ପଢ଼ନ୍ତୁ',
      viewAllResearch: 'ସମସ୍ତ ଗବେଷଣା ପ୍ରବନ୍ଧ',
      timelineBadge: 'କାଳାନୁକ୍ରମିକ ମାଇଲଷ୍ଟୋନ',
      timelineTitle: 'ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଐତିହାସିକ ଘଟଣାବଳୀ (୧୪୩୪–୧୫୪୦ ଖ୍ରୀ.)',
      timelineSubtitle: 'ସମକାଳୀନ ତାମ୍ରଶାସନ ଓ ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ ମୁଖ୍ୟ ଘଟଣା।',
      viewFullTimeline: 'ସମ୍ପୂର୍ଣ୍ଣ କାଳକ୍ରମ ଦେଖନ୍ତୁ',
      galleryBadge: 'ଦୃଶ୍ୟ ଐତିହ୍ୟ',
      galleryTitle: 'ଐତିହାସିକ ଗ୍ୟାଲେରୀ ଓ ଚିତ୍ରାବଳୀ',
      gallerySubtitle: 'ଦୁର୍ଗ, ଶିଳାଲେଖ ଓ ପ୍ରାଚୀନ ମନ୍ଦିର ସ୍ଥାପତ୍ୟର ଫଟୋଚିତ୍ର ସଂଗ୍ରହ।',
      viewFullGallery: 'ଗ୍ୟାଲେରୀ ଦେଖନ୍ତୁ',
      communityBadge: 'ଜୀବନ୍ତ ବଂଶାବଳୀ ଓ ବିଶ୍ୱ ସମ୍ପ୍ରଦାୟ',
      communityTitle: 'ଆମ ଗୌରବମୟ ସାର୍ବଭୌମ ଐତିହ୍ୟର ସଂରକ୍ଷଣ',
      communitySubtitle: 'ଭାରତ ତଥା ବିଶ୍ୱରେ ଥିବା ଗବେଷକ ଓ ସୂର୍ଯ୍ୟବଂଶୀ ପରିବାରମାନଙ୍କ ସହ ଯୋଡ଼ି ହୁଅନ୍ତୁ।',
      joinBtn: 'ଖାତା ପଞ୍ଜୀକରଣ କରନ୍ତୁ',
      directoryBtn: 'ସଦସ୍ୟ ଡିରେକ୍ଟୋରୀ'
    },
    kingsQueens: {
      badge: 'ଅଭିଲେଖ ପ୍ରମାଣିତ ଐତିହାସିକ ବ୍ୟକ୍ତିତ୍ୱ',
      title: 'ସୂର୍ଯ୍ୟବଂଶୀ ରାଜା, ରାଣୀ, ସେନାପତି ଓ ବିଦ୍ୱାନଗଣ',
      subtitle: 'ରାଜତ୍ୱ କାଳ, ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ସନ୍ଦର୍ଭ ଓ ସ୍ଥାପତ୍ୟ କୀର୍ତ୍ତି ସହିତ ବିସ୍ତୃତ ଜୀବନୀ।',
      listTitle: 'ଐତିହାସିକ ବ୍ୟକ୍ତିବିଶେଷ',
      alternateSpellings: 'ଅନ୍ୟାନ୍ୟ ନାମ',
      dynastyLabel: 'ରାଜବଂଶ',
      titlesLabel: 'ରାଜକୀୟ ଉପାଧି ଓ ପ୍ରଶସ୍ତି',
      biographyLabel: 'ପ୍ରାମାଣିକ ଜୀବନୀ ଓ ଐତିହାସିକ ମହତ୍ତ୍ୱ',
      eventsLabel: 'କାଳକ୍ରମ ଅନୁଯାୟୀ ଘଟଣାବଳୀ',
      placesLabel: 'ସମ୍ପର୍କିତ ଦୁର୍ଗ ଓ କ୍ଷେତ୍ର',
      citationsLabel: 'ପ୍ରାଥମିକ ଶିଳାଲେଖ ଓ ଗବେଷଣା ପ୍ରମାଣ'
    },
    genealogy: {
      badge: 'ଶିଳାଲେଖ ପ୍ରମାଣ ବନାମ ପାରମ୍ପରିକ ବଂଶାବଳୀ',
      title: 'ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ରାଜବଂଶାବଳୀ',
      subtitle: 'ଶିଳାଲେଖ ସତ୍ୟାପିତ ରାଜକୀୟ ପୂର୍ବପୁରୁଷ ଏବଂ ମୌଖିକ ପରମ୍ପରା ମଧ୍ୟରେ ଥିବା ସ୍ପଷ୍ଟ ପାର୍ଥକ୍ୟ ଦର୍ଶାଉଥିବା ଚାର୍ଟ।',
      chartTitle: 'ପାରସ୍ପରିକ ବଂଶାବଳୀ ଚିତ୍ର',
      chartSubtitle: 'ଅଭିଲେଖ ଓ ପ୍ରମାଣ ଦେଖିବା ପାଇଁ ଯେକୌଣସି ରାଜାଙ୍କ ଉପରେ କ୍ଲିକ୍ କରନ୍ତୁ',
      claimsBadge: 'ଐତିହାସିକ ସାକ୍ଷ୍ୟ ସମୀକ୍ଷା',
      claimsTitle: 'ମୁଖ୍ୟ ରାଜବଂଶ ଦାବି ଓ ପରମ୍ପରାର ମୂଲ୍ୟାୟନ',
      claimsSubtitle: 'ପାରମ୍ପରିକ ବିଶ୍ୱାସ ଏବଂ ଆଧୁନିକ ଇତିହାସବିଦ୍ ମାନଙ୍କ ନିରପେକ୍ଷ ସମୀକ୍ଷା।'
    },
    inscriptions: {
      badge: 'ଅଭିଲେଖ ଭଣ୍ଡାର ଓ ପ୍ରାଥମିକ ଉତ୍ସ',
      title: 'ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ଅଭିଲେଖ',
      subtitle: 'ଐତିହାସିକ ସତ୍ୟାପନର ମୂଳଦୁଆ। ତାମ୍ରଫଳକ, ଶିଳାଲିପି, ବିଦ୍ୱାନଙ୍କ ଅନୁବାଦ ଓ ଏପିଗ୍ରାଫିଆ ଇଣ୍ଡିକା ଭଲ୍ୟୁମ୍ ସନ୍ଦର୍ଭ।',
      searchPlaceholder: 'ଶାସକ, ପ୍ରାପ୍ତିସ୍ଥାନ ବା ତାମ୍ରଶାସନ ନାମ ଦ୍ୱାରା ଖୋଜନ୍ତୁ...',
      showingCount: 'ପର୍ଯ୍ୟାଲୋଚିତ ଅଭିଲେଖ ସଂଖ୍ୟା',
      rulerLabel: 'ଶାସକ',
      findspotLabel: 'ପ୍ରାପ୍ତିସ୍ଥାନ',
      eraLabel: 'ସମୟକାଳ / ତାରିଖ',
      dynastyLabel: 'ରାଜବଂଶ',
      transcriptionLabel: 'ମୌଳିକ ଅଭିଲେଖ ପାଠ',
      translationLabel: 'ଗବେଷକଙ୍କ ଅନୁବାଦ ଓ ବିଶ୍ଳେଷଣ',
      significanceLabel: 'ଐତିହାସିକ ଓ ରାଜନୈତିକ ଗୁରୁତ୍ୱ'
    },
    monuments: {
      badge: 'ସ୍ଥାପତ୍ୟ କଳା ଓ ରାଜକୀୟ ପୃଷ୍ଠପୋଷକତା',
      title: 'ମନ୍ଦିର, ଦୁର୍ଗ ଓ ରାଜକୀୟ କୀର୍ତ୍ତି',
      subtitle: 'ପୁରୀ ଶ୍ରୀମନ୍ଦିରର ମେଘନାଦ ପାଚେରୀଠାରୁ ଦ୍ରାକ୍ଷାରାମ ଓ ସିଂହାଚଳମ ମଣ୍ଡପ ପର୍ଯ୍ୟନ୍ତ ସୂର୍ଯ୍ୟବଂଶୀ ସ୍ଥାପତ୍ୟର ଅମର ଗାଥା।',
      patronLabel: 'ନିର୍ମାତା ଶାସକ',
      styleLabel: 'ସ୍ଥାପତ୍ୟ ଶୈଳୀ',
      significanceLabel: 'ଐତିହାସିକ ଗୁରୁତ୍ୱ',
      sourcesLabel: 'ଐତିହାସିକ ଉତ୍ସ'
    },
    timeline: {
      badge: 'କାଳାନୁକ୍ରମିକ ପ୍ରାମାଣିକ ବିବରଣୀ',
      title: 'ସମଗ୍ର ଐତିହାସିକ କାଳକ୍ରମ',
      subtitle: '୧୪୩୪ ଖ୍ରୀଷ୍ଟାବ୍ଦରୁ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିମାନଙ୍କ ଅଭ୍ୟୁଦୟ, ଦକ୍ଷିଣ ବିଜୟ ଓ ପ୍ରଶାସନିକ ସ୍ୱର୍ଣ୍ଣଯୁଗର ବିବରଣୀ।',
      filterPlaceholder: 'ବର୍ଷ ବା ଶାସକଙ୍କ ନାମ ଲେଖି ଖୋଜନ୍ତୁ (ଉଦା. 1458, Kapilendra)...',
      rulerLabel: 'ସମ୍ପୃକ୍ତ ଶାସକ',
      evidenceLabel: 'ସମ୍ପର୍କିତ ପ୍ରମାଣ',
      citationsLabel: 'ପ୍ରାଥମିକ ସନ୍ଦର୍ଭ',
      methodologyLabel: 'ପଦ୍ଧତିଗତ ବିବରଣୀ'
    },
    odraDesha: {
      badge: 'ଐତିହାସିକ ଭୂଗୋଳ ଓ ନାମକରଣ',
      title: 'ଓଡ଼୍ର ଦେଶ: ପ୍ରାଚ୍ୟ ଭାରତୀୟ ସାର୍ବଭୌମତ୍ୱର ପ୍ରାଚୀନ ହୃତପିଣ୍ଡ',
      subtitle: 'ପ୍ଲିନିଙ୍କ ବର୍ଣ୍ଣିତ ଓରେଟେସଠାରୁ ମଧ୍ୟଯୁଗୀୟ ଔଡ୍ର ବିଷୟ ପର୍ଯ୍ୟନ୍ତ, ମହାନଦୀ ଅବବାହିକାରୁ ବାରଣାସୀ କଟକ ରାଜଧାନୀର ବିକାଶ।',
      regionsTitle: 'ପ୍ରାଚୀନ ପ୍ରାଚ୍ୟ ରାଜ୍ୟସମୂହର ସୀମା ନିର୍ଦ୍ଧାରଣ',
      regionsSubtitle: 'ଶିଳାଲେଖ ପ୍ରମାଣ ଭିତ୍ତିରେ ଓଡ଼୍ର, କଳିଙ୍ଗ, ଉତ୍କଳ ଓ ତ୍ରିକଳିଙ୍ଗର ସ୍ୱତନ୍ତ୍ର ପରିଚୟ।',
      odraTitle: 'ଓଡ଼୍ର ଦେଶ (ଔଡ୍ର)',
      odraDesc: 'ମହାନଦୀ, କାଠଯୋଡ଼ି ଓ ବୈତରଣୀ ଉପତ୍ୟକା। ରାଜଧାନୀ ବାରଣାସୀ କଟକ। ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଙ୍କ ପ୍ରଧାନ ପ୍ରଶାସନିକ କେନ୍ଦ୍ର।',
      utkalaTitle: 'ଉତ୍କଳ',
      utkalaDesc: 'ସୁବର୍ଣ୍ଣରେଖାଠାରୁ ବଙ୍ଗ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ ଉତ୍ତର ଉପକୂଳ। ସାମୁଦ୍ରିକ ବାଣିଜ୍ୟ ଓ କଳା ପାଇଁ ବିଖ୍ୟାତ।',
      kalingaTitle: 'କଳିଙ୍ଗ',
      kalingaDesc: 'ଋଷିକୁଲ୍ୟାରୁ ଗୋଦାବରୀ ପର୍ଯ୍ୟନ୍ତ ଦକ୍ଷିଣ ଉପକୂଳ, ପ୍ରାଚୀନ ନୌବାଣିଜ୍ୟର ମୁଖ୍ୟ କେନ୍ଦ୍ର।',
      trikalingaTitle: 'ତ୍ରିକଳିଙ୍ଗ',
      trikalingaDesc: 'ପୂର୍ବଘାଟ ପର୍ବତମାଳା ଓ ଅରଣ୍ୟାଞ୍ଚଳକୁ ସଂଯୋଗ କରୁଥିବା ପାର୍ବତ୍ୟ ଭୂଖଣ୍ଡ।',
      coreRulers: 'ମୁଖ୍ୟ ଶାସକ: ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତିଗଣ'
    },
    gajapathi: {
      badge: 'ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ସାମ୍ରାଜ୍ୟ (୧୪୩୪–୧୫୪୧ ଖ୍ରୀଷ୍ଟାବ୍ଦ)',
      title: 'ଗଜପତି ରାଜାଗଣ ଓ ସାମ୍ରାଜ୍ୟର ସ୍ୱର୍ଣ୍ଣଯୁଗ',
      subtitle: '୧୪୩୪ରେ କପିଳେନ୍ଦ୍ର ଦେବଙ୍କ ଦ୍ୱାରା ପ୍ରତିଷ୍ଠିତ, ଭଗବାନ ଶ୍ରୀଜଗନ୍ନାଥଙ୍କ ରାଉତ ଭାବେ ଗଙ୍ଗାଠାରୁ କାବେରୀ ପର୍ଯ୍ୟନ୍ତ ବିସ୍ତୃତ ସାମ୍ରାଜ୍ୟ।',
      tabChronology: 'ସାମ୍ରାଜ୍ୟ କାଳକ୍ରମ',
      tabAdministration: 'ପ୍ରଶାସନ ଓ ସାମନ୍ତ ବ୍ୟବସ୍ଥା',
      tabMilitary: 'ଦକ୍ଷିଣ ବିଜୟ ଅଭିଯାନ (ଗଙ୍ଗାଠାରୁ କାବେରୀ)',
      tabCulture: 'ସାହିତ୍ୟ ଓ ସ୍ଥାପତ୍ୟ ସଂସ୍କୃତି'
    },
    about: {
      badge: 'ଐତିହାସିକ ପ୍ରକଳ୍ପ ବିଷୟରେ',
      title: 'ଶିଳାଲେଖ ପ୍ରମାଣ ଭିତ୍ତିରେ ସାର୍ବଭୌମ ଐତିହ୍ୟ ସଂରକ୍ଷଣ',
      subtitle: 'ମୌଳିକ ଅଭିଲେଖ, ଗବେଷଣା ଓ ସାଂସ୍କୃତିକ ସ୍ମୃତି ମାଧ୍ୟମରେ ସୂର୍ଯ୍ୟବଂଶୀ ଓଡ଼ିଆରାଜୁ କ୍ଷତ୍ରିୟ ଇତିହାସର ଲିପିବଦ୍ଧକରଣ।',
      missionTitle: 'ଆମ ଲକ୍ଷ୍ୟ ଓ କର୍ତ୍ତବ୍ୟ',
      missionDesc: 'ମଧ୍ୟଯୁଗୀୟ ଅଭିଲେଖ, ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଓ ବଂଶାବଳୀକୁ ନିର୍ଭୁଲ ଭାବରେ ସଂରକ୍ଷିତ ରଖିବା ପାଇଁ ଏକ ଡିଜିଟାଲ୍ ଭଣ୍ଡାର।',
      methodologyTitle: 'ଗବେଷଣା ମାନଦଣ୍ଡ',
      methodologyDesc: 'ପ୍ରାଥମିକ ଶିଳାଲେଖ, ଐତିହାସିକ ବିଶ୍ଳେଷଣ ଓ ପାରମ୍ପରିକ ମୌଖିକ ପରମ୍ପରା ମଧ୍ୟରେ କଠୋର ପାର୍ଥକ୍ୟ ରକ୍ଷା।'
    }
  },

  // 4. HINDI (hi)
  hi: {
    home: {
      pillarsBadge: 'मौलिक ऐतिहासिक स्तंभ',
      pillarsTitle: 'सूर्यवंशी ओडियाराजू धरोहर के प्रमुख आयाम',
      pillarsSubtitle: 'सत्यापित प्राथमिक शिलालेखों, राजकीय इतिहास और ऐतिहासिक भूगोल के आधार पर सुव्यवस्थित संकलन।',
      pillars: [
        {
          title: 'प्राचीन ओड्र देश',
          desc: 'ऐतिहासिक भूगोल, प्राचीन औड्र राज्य से लेकर वाराणसी कटक राजधानी तक का प्रामाणिक विकास।'
        },
        {
          title: 'कलिंग एवं क्षेत्रीय संबंध',
          desc: 'अभिलेखीय साक्ष्यों के आधार पर ओड्र, उत्कल, कलिंग और त्रिकलिंग की सीमाओं का विश्लेषण।'
        },
        {
          title: 'गजपति सम्राट एवं साम्राज्य युग',
          desc: 'कपिलेंद्र देव से प्रतापरुद्र देव: गंगा से कावेरी तक विस्तारित सैन्य प्रभुत्व का स्वर्णिम काल।'
        },
        {
          title: 'राजकीय वंशावली एवं राजवंश',
          desc: 'पारंपरिक वंशावलियों से भिन्न, समकालीन अभिलेखों द्वारा प्रमाणित राजकुल का स्पष्ट वंशवृक्ष।'
        },
        {
          title: 'शिलालेख एवं पुरातत्व',
          desc: 'द्विभाषी ताम्रपत्र, वेलिगलनी, सिंहाचलम और लिंगराज मंदिर के ऐतिहासिक पाषाण अभिलेख।'
        },
        {
          title: 'मंदिर एवं राजप्रसाद स्थापत्य',
          desc: 'पुरी जगन्नाथ मंदिर की मेघनाद पाचेरी, कोणार्क संरक्षण और बाराबती दुर्ग की स्थापत्य कला।'
        },
        {
          title: 'संस्कृति एवं जीवित परंपराएं',
          desc: 'सूर्यवंशी क्षत्रिय परंपराएं, छेरा पहँरा अनुष्ठान, सौर वंश पर्व और सामुदायिक उत्सव।'
        },
        {
          title: 'साहित्य एवं प्रकाशन',
          desc: 'सरस्वती विलास जैसे संस्कृत विधिक ग्रंथ और सरला दास का उड़िया महाभारत।'
        }
      ],
      researchBadge: 'अकादमिक इतिहास अनुसंधान',
      researchTitle: 'प्रमुख ऐतिहासिक शोध प्रबंध',
      researchSubtitle: 'पुरालेख, क्षेत्रीय सीमा और राजवंश शासन पर प्रतिष्ठित इतिहासकारों के शोध पत्र।',
      readFull: 'पूरा लेख पढ़ें',
      viewAllResearch: 'सभी शोध पत्र देखें',
      timelineBadge: 'ऐतिहासिक कालक्रम',
      timelineTitle: 'महत्वपूर्ण ऐतिहासिक पड़ाव (1434–1540 ई.)',
      timelineSubtitle: 'समकालीन ताम्रपत्रों और मंदिर शिलालेखों द्वारा प्रमाणित प्रमुख ऐतिहासिक घटनाएं।',
      viewFullTimeline: 'सम्पूर्ण कालक्रम देखें',
      galleryBadge: 'दृश्य धरोहर',
      galleryTitle: 'ऐतिहासिक दीर्घा एवं दृश्य अभिलेखागार',
      gallerySubtitle: 'प्राचीन किलों, स्तंभ अभिलेखों और पवित्र मंदिरों के उच्च-गुणवत्ता वाले छायाचित्र।',
      viewFullGallery: 'गैलरी देखें',
      communityBadge: 'जीवित वंशावली एवं वैश्विक समुदाय',
      communityTitle: 'अपनी संप्रभु ऐतिहासिक धरोहर को संगठित एवं संरक्षित करें',
      communitySubtitle: 'भारत और विश्व भर के शोधकर्ताओं और सूर्यवंशी क्षत्रिय परिवारों से जुड़ें।',
      joinBtn: 'खाता पंजीकृत करें',
      directoryBtn: 'सदस्य निर्देशिका'
    },
    kingsQueens: {
      badge: 'अभिलेख-प्रमाणित ऐतिहासिक विभूतियां',
      title: 'सूर्यवंश के राजा, रानियां, सेनापति एवं विद्वान',
      subtitle: 'शासनकाल, एपिग्राफिया इंडिका संदर्भ एवं स्थापत्य कार्यों से युक्त प्रामाणिक जीवन वृत्त।',
      listTitle: 'ऐतिहासिक व्यक्तित्व',
      alternateSpellings: 'अन्य नाम',
      dynastyLabel: 'राजवंश',
      titlesLabel: 'राजकीय उपाधियां एवं प्रशस्तियां',
      biographyLabel: 'प्रामाणिक जीवनी एवं ऐतिहासिक महत्व',
      eventsLabel: 'कालक्रमानुसार प्रमुख घटनाएं',
      placesLabel: 'संबंधित दुर्ग एवं तीर्थ क्षेत्र',
      citationsLabel: 'प्राथमिक शिलालेख एवं शोध संदर्भ'
    },
    genealogy: {
      badge: 'शिलालेखीय वंशावली बनाम पारंपरिक लोकवृत्त',
      title: 'सूर्यवंशी ओडियाराजू क्षत्रिय राजकीय वंशावली',
      subtitle: 'अभिलेखों द्वारा प्रमाणित राजकुल को मौखिक परंपराओं से स्पष्ट रूप से अलग दर्शाने वाला प्रामाणिक वंशवृक्ष।',
      chartTitle: 'इंटरैक्टिव राजवंश चार्ट',
      chartSubtitle: 'अभिलेख एवं संदर्भ देखने के लिए किसी भी राजा पर क्लिक करें',
      claimsBadge: 'ऐतिहासिक साक्ष्य समीक्षा',
      claimsTitle: 'प्रमुख पारंपरिक दावों एवं मान्यताओं का निष्पक्ष विश्लेषण',
      claimsSubtitle: 'पारंपरिक लोकस्मृति और आधुनिक ऐतिहासिक साक्ष्यों का वस्तुपरक मूल्यांकन।'
    },
    inscriptions: {
      badge: 'अभिलेख संग्रह एवं प्राथमिक स्रोत',
      title: 'शिलालेख एवं पुरातात्विक साक्ष्य',
      subtitle: 'ऐतिहासिक सत्यता का मुख्य आधार। ताम्रपत्र, पाषाण अभिलेख, विद्वानों के अनुवाद और एपिग्राफिया इंडिका संदर्भ।',
      searchPlaceholder: 'शासक, प्राप्ति-स्थान या ताम्रपत्र नाम से खोजें...',
      showingCount: 'समीक्षित अभिलेख रिकॉर्ड',
      rulerLabel: 'शासक',
      findspotLabel: 'प्राप्ति स्थान',
      eraLabel: 'काल / तिथि',
      dynastyLabel: 'राजवंश',
      transcriptionLabel: 'मूल अभिलेख पाठ',
      translationLabel: 'विद्वानों का अनुवाद एवं विश्लेषण',
      significanceLabel: 'ऐतिहासिक एवं राजनीतिक महत्व'
    },
    monuments: {
      badge: 'स्थापत्य कला एवं राजकीय संरक्षण',
      title: 'मंदिर, दुर्ग एवं राजकीय स्मारक',
      subtitle: 'पुरी जगन्नाथ मंदिर की मेघनाद पाचेरी से लेकर द्राक्षाराम और सिंहाचलम तक सूर्यवंशी स्थापत्य का गौरव।',
      patronLabel: 'संरक्षक शासक',
      styleLabel: 'स्थापत्य शैली',
      significanceLabel: 'ऐतिहासिक महत्व',
      sourcesLabel: 'ऐतिहासिक स्रोत'
    },
    timeline: {
      badge: 'कालक्रमानुसार प्रामाणिक विवरण',
      title: 'विस्तृत ऐतिहासिक कालक्रम',
      subtitle: '1434 ईस्वी से सूर्यवंशी गजपतियों का उदय, दक्षिण विजय और प्रशासनिक स्वर्णिम युग।',
      filterPlaceholder: 'वर्ष या शासक का नाम लिखकर खोजें (उदा. 1458, Kapilendra)...',
      rulerLabel: 'संबंधित शासक',
      evidenceLabel: 'संबंधित साक्ष्य',
      citationsLabel: 'प्राथमिक संदर्भ',
      methodologyLabel: 'पद्धतिगत टिप्पणी'
    },
    odraDesha: {
      badge: 'ऐतिहासिक भूगोल एवं नामकरण',
      title: 'ओड्र देश: पूर्वी भारतीय संप्रभुता का प्राचीन केंद्र',
      subtitle: 'प्लिनी के वृत्तांतों से लेकर मध्यकालीन औड्र विषय तक, महानदी बेसिन से कटक राजधानी का विकास।',
      regionsTitle: 'प्राचीन पूर्वी भारतीय राज्यों का सीमांकन',
      regionsSubtitle: 'अभिलेखीय साक्ष्यों के आधार पर ओड्र, कलिंग, उत्कल और त्रिकलिंग की ऐतिहासिक सीमाएं।',
      odraTitle: 'ओड्र देश (औड्र)',
      odraDesc: 'महानदी, काठजोड़ी और वैतरणी नदियों का कछार। राजधानी वाराणसी कटक। सूर्यवंशी गजपतियों का मुख्य प्रशासनिक केंद्र।',
      utkalaTitle: 'उत्कल',
      utkalaDesc: 'सुवर्णरेखा से बंगाल तक का उत्तरी तटीय क्षेत्र। समुद्री व्यापार और कला के लिए प्रसिद्ध।',
      kalingaTitle: 'कलिंग',
      kalingaDesc: 'ऋषिकुल्या से गोदावरी तक फैला दक्षिणी तटीय प्रदेश, प्राचीन नौपरिवहन का केंद्र।',
      trikalingaTitle: 'त्रिकलिंग',
      trikalingaDesc: 'पूर्वी घाट और घने वनों को जोड़ने वाला पर्वतीय भूभाग।',
      coreRulers: 'प्रमुख शासक: सूर्यवंशी गजपति सम्राट'
    },
    gajapathi: {
      badge: 'सूर्यवंशी गजपति साम्राज्य (1434–1541 ई.)',
      title: 'गजपति सम्राट एवं साम्राज्य का स्वर्णिम युग',
      subtitle: '1434 में कपिलेंद्र देव द्वारा स्थापित, जगन्नाथ के सेवक के रूप में गंगा से कावेरी तक शासन करने वाला विराट साम्राज्य।',
      tabChronology: 'साम्राज्य कालक्रम',
      tabAdministration: 'प्रशासन एवं सामंती व्यवस्था',
      tabMilitary: 'दक्षिण विजय अभियान (गंगा से कावेरी)',
      tabCulture: 'साहित्य एवं स्थापत्य कला'
    },
    about: {
      badge: 'ऐतिहासिक परियोजना के विषय में',
      title: 'अभिलेखीय निष्ठा से संप्रभु धरोहर का संरक्षण',
      subtitle: 'प्राथमिक शिलालेखों, अकादमिक शोध और सांस्कृतिक स्मृति के माध्यम से सूर्यवंशी क्षत्रिय इतिहास का दस्तावेजीकरण।',
      missionTitle: 'हमारा उद्देश्य एवं संकल्प',
      missionDesc: 'मध्यकालीन अभिलेखों, स्थापत्य और जीवित वंशावलियों को बिना किसी विकृति के संरक्षित करने वाला डिजिटल पोर्टल।',
      methodologyTitle: 'अनुसंधान की प्रामाणिकता',
      methodologyDesc: 'प्राथमिक शिलालेखों, ऐतिहासिक विश्लेषण और पारंपरिक मान्यताओं के बीच स्पष्ट अंतर बनाए रखना।'
    }
  },

  // 5. KANNADA (kn)
  kn: {
    home: {
      pillarsBadge: 'ಮೂಲ ಐತಿಹಾಸಿಕ ಸ್ತಂಭಗಳು',
      pillarsTitle: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಪರಂಪರೆಯ ಪ್ರಮುಖ ಆಯಾಮಗಳು',
      pillarsSubtitle: 'ಶಾಸನಗಳು, ರಾಜವಂಶ ಚರಿತ್ರೆಗಳು ಮತ್ತು ಐತಿಹಾಸಿಕ ಭೂಗೋಳದ ಆಧಾರದ ಮೇಲೆ ದಾಖಲಿಸಲಾಗಿದೆ.',
      pillars: [
        {
          title: 'ಪ್ರಾಚೀನ ಓಡ್ರ ದೇಶ',
          desc: 'ಐತಿಹಾಸಿಕ ಭೂಗೋಳ ಮತ್ತು ವಾರಣಾಸಿ ಕಟಕ ರಾಜಧಾನಿಯವರೆಗಿನ ಭೌಗೋಳಿಕ ವಿಕಾಸ.'
        },
        {
          title: 'ಕಳಿಂಗ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಸಂಬಂಧಗಳು',
          desc: 'ಶಾಸನಗಳ ಆಧಾರದ ಮೇಲೆ ಓಡ್ರ, ಉತ್ಕಲ, ಕಳಿಂಗ ಮತ್ತು ತ್ರಿಕಳಿಂಗದ ಐತಿಹಾಸಿಕ ಗಡಿಗಳ ವಿಶ್ಲೇಷಣೆ.'
        },
        {
          title: 'ಗಜಪತಿ ರಾಜರು ಮತ್ತು ಸುವರ್ಣಯುಗ',
          desc: 'ಕಪಿಲೇಂದ್ರ ದೇವನಿಂದ ಪ್ರತಾಪರುದ್ರ ದೇವನವರೆಗೆ: ಗಂಗಾ ನದಿಯಿಂದ ಕಾವೇರಿಯವರೆಗಿನ ದಿಗ್ವಿಜಯ.'
        },
        {
          title: 'ರಾಜ ವಂಶಾವಳಿ ಮತ್ತು ರಾಜಮನೆತನಗಳು',
          desc: 'ಶಾಸನಬದ್ಧ ಪೂರ್ವಜರನ್ನು ಸಾಂಪ್ರದಾಯಿಕ ದಾಖಲೆಗಳಿಂದ ಪ್ರತ್ಯೇಕಿಸಿ ತೋರಿಸುವ ಕುಟುಂಬ ವೃಕ್ಷ.'
        },
        {
          title: 'ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ',
          desc: 'ದ್ವಿಭಾಷಾ ತಾಮ್ರಶಾಸನಗಳು, ವೆಲಿಗಲನಿ, ಸಿಂಹಾಚಲ ಮತ್ತು ಲಿಂಗರಾಜ ದೇವಾಲಯದ ಶಾಸನಗಳು.'
        },
        {
          title: 'ದೇವಾಲಯಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು',
          desc: 'ಪುರಿ ಜಗನ್ನಾಥ ದೇವಾಲಯದ ಮೇಘನಾದ ಪಾಚೇರಿ, ಕೊಣಾರ್ಕ್ ಮತ್ತು ಬಾರಾಬಟಿ ಕೋಟೆಗಳ ವಾಸ್ತುಶಿಲ್ಪ.'
        },
        {
          title: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಜೀವಂತ ಪರಂಪರೆ',
          desc: 'ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯ ಸಂಪ್ರದಾಯಗಳು, ಚೆರಾ ಪಂಹರ ಆಚರಣೆ ಮತ್ತು ಉತ್ಸವಗಳು.'
        },
        {
          title: 'ಸಾಹಿತ್ಯ ಮತ್ತು ಪ್ರಕಟಣೆಗಳು',
          desc: 'ಸರಸ್ವತೀ ವಿಲಾಸ ಸಂಸ್ಕೃತ ಕೃತಿ ಮತ್ತು ಸಾರಳಾ ದಾಸರ ಒಡಿಯಾ ಮಹಾಭಾರತ.'
        }
      ],
      researchBadge: 'ಅಕಾಡೆಮಿಕ್ ಇತಿಹಾಸ ಸಂಶೋಧನೆ',
      researchTitle: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಪ್ರಬಂಧಗಳು',
      researchSubtitle: 'ಶಾಸನಗಳು ಮತ್ತು ರಾಜವಂಶ ಆಡಳಿತದ ಕುರಿತು ವಿದ್ವಾಂಸರ ವಿಮರ್ಶಾತ್ಮಕ ಲೇಖನಗಳು.',
      readFull: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ',
      viewAllResearch: 'ಎಲ್ಲಾ ಸಂಶೋಧನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      timelineBadge: 'ಕಾಲಾನುಕ್ರಮ ಮೈಲಿಗಲ್ಲುಗಳು',
      timelineTitle: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಘಟನೆಗಳು (1434–1540)',
      timelineSubtitle: 'ಸಮಕಾಲೀನ ತಾಮ್ರಶಾಸನಗಳು ಮತ್ತು ದೇವಾಲಯ ದಾಖಲೆಗಳಿಂದ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟ ಇತಿಹಾಸ.',
      viewFullTimeline: 'ಸಂಪೂರ್ಣ ಕಾಲಾನುಕ್ರಮ ನೋಡಿ',
      galleryBadge: 'ದೃಶ್ಯ ಪರಂಪರೆ',
      galleryTitle: 'ಐತಿಹಾಸಿಕ ಗ್ಯಾಲರಿ ಮತ್ತು ಛಾಯಾಚಿತ್ರಗಳು',
      gallerySubtitle: 'ಕೋಟೆಗಳು, ಶಾಸನಗಳು ಮತ್ತು ದೇವಾಲಯಗಳ ಅಪರೂಪದ ಛಾಯಾಚಿತ್ರ ಸಂಗ್ರಹ.',
      viewFullGallery: 'ಗ್ಯಾಲರಿ ವೀಕ್ಷಿಸಿ',
      communityBadge: 'ಜೀವಂತ ಪರಂಪರೆ ಮತ್ತು ಜಾಗತಿಕ ಸಮುದಾಯ',
      communityTitle: 'ನಮ್ಮ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಯನ್ನು ರಕ್ಷಿಸೋಣ',
      communitySubtitle: 'ಭಾರತ ಮತ್ತು ವಿದೇಶಗಳಲ್ಲಿರುವ ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯ ಕುಟುಂಬಗಳು ಒಂದಾಗಿ.',
      joinBtn: 'ಖಾತೆ ನೋಂದಾಯಿಸಿ',
      directoryBtn: 'ಸದಸ್ಯರ ಡೈರೆಕ್ಟರಿ'
    },
    kingsQueens: {
      badge: 'ದಾಖಲಿತ ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
      title: 'ಸೂರ್ಯವಂಶದ ರಾಜರು, ರಾಣಿಯರು, ಸೇನಾಪತಿಗಳು ಮತ್ತು ವಿದ್ವಾಂಸರು',
      subtitle: 'ಶಾಸನಗಳು, ಆಡಳಿತಾವಧಿ ಮತ್ತು ಸ್ಮಾರಕಗಳೊಂದಿಗೆ ಅಧಿಕೃತ ಜೀವನ ಚರಿತ್ರೆಗಳು.',
      listTitle: 'ಐತಿಹಾಸಿಕ ವ್ಯಕ್ತಿಗಳು',
      alternateSpellings: 'ಇತರ ಹೆಸರುಗಳು',
      dynastyLabel: 'ರಾಜವಂಶ',
      titlesLabel: 'ರಾಜ ಬಿರುದುಗಳು ಮತ್ತು ಪ್ರಶಸ್ತಿಗಳು',
      biographyLabel: 'ಅಧಿಕೃತ ಜೀವನ ಚರಿತ್ರೆ ಮತ್ತು ಮಹತ್ವ',
      eventsLabel: 'ಕಾಲಾನುಕ್ರಮ ಘಟನೆಗಳು',
      placesLabel: 'ಸಂಬಂಧಿತ ಕೋಟೆಗಳು ಮತ್ತು ಕ್ಷೇತ್ರಗಳು',
      citationsLabel: 'ಮೂಲ ಶಾಸನಗಳು ಮತ್ತು ಆಧಾರಗಳು'
    },
    genealogy: {
      badge: 'ಶಾಸನ ವಂಶಾವಳಿ vs ಸಾಂಪ್ರದಾಯಿಕ ದಾಖಲೆಗಳು',
      title: 'ಸೂರ್ಯವಂಶ ಒಡಿಯರಾಜು ಕ್ಷತ್ರಿಯ ರಾಜವಂಶಾವಳಿ',
      subtitle: 'ಶಾಸನ ಆಧಾರಿತ ರಾಜಪರಂಪರೆಯನ್ನು ಮೌಖಿಕ ಕಥೆಗಳಿಂದ ಬೇರ್ಪಡಿಸಿ ತೋರಿಸುವ ನಿಖರ ಕುಟುಂಬ ವೃಕ್ಷ.',
      chartTitle: 'ಇಂಟರ್ಯಾಕ್ಟಿವ್ ರಾಜವಂಶ ಚಾರ್ಟ್',
      chartSubtitle: 'ಶಾಸನಗಳು ಮತ್ತು ವಿವರಗಳನ್ನು ನೋಡಲು ರಾಜನ ಹೆಸರಿನ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
      claimsBadge: 'ಐತಿಹಾಸಿಕ ಪುರಾವೆಗಳ ವಿಮರ್ಶೆ',
      claimsTitle: 'ಪ್ರಮುಖ ರಾಜವಂಶ ಸಂಪ್ರದಾಯಗಳ ವಿಶ್ಲೇಷಣೆ',
      claimsSubtitle: 'ಸಾಂಪ್ರದಾಯಿಕ ನಂಬಿಕೆಗಳು ಮತ್ತು ಇತಿಹಾಸಕಾರರ ನಿಷ್ಪಕ್ಷಪಾತ ಮೌಲ್ಯಮಾಪನ.'
    },
    inscriptions: {
      badge: 'ಶಾಸನ ಭಂಡಾರ ಮತ್ತು ಮೂಲ ಪುರಾವೆಗಳು',
      title: 'ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ ದಾಖಲೆಗಳು',
      subtitle: 'ಇತಿಹಾಸದ ದೃಢವಾದ ಬುನಾದಿ. ತಾಮ್ರಶಾಸನಗಳು, ವಿದ್ವಾಂಸರ ಅನುವಾದ ಮತ್ತು ಎಪಿಗ್ರಾಫಿಯಾ ಇಂಡಿಕಾ ಉಲ್ಲೇಖಗಳು.',
      searchPlaceholder: 'ರಾಜ, ಸ್ಥಳ ಅಥವಾ ಶಾಸನದ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
      showingCount: 'ಪರಿಶೀಲಿಸಲಾದ ಶಾಸನ ದಾಖಲೆಗಳು',
      rulerLabel: 'ಆಡಳಿತಗಾರ',
      findspotLabel: 'ದೊರೆತ ಸ್ಥಳ',
      eraLabel: 'ಕಾಲ / ದಿನಾಂಕ',
      dynastyLabel: 'ರಾಜವಂಶ',
      transcriptionLabel: 'ಮೂಲ ಶಾಸನ ಪಠ್ಯ',
      translationLabel: 'ವಿದ್ವಾಂಸರ ಅನುವಾದ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ',
      significanceLabel: 'ಐತಿಹಾಸಿಕ ಮತ್ತು ರಾಜಕೀಯ ಮಹತ್ವ'
    },
    monuments: {
      badge: 'ವಾಸ್ತುಶಿಲ್ಪ ಪರಂಪರೆ ಮತ್ತು ರಾಜಾಶ್ರಯ',
      title: 'ದೇವಾಲಯಗಳು, ಕೋಟೆಗಳು ಮತ್ತು ಸ್ಮಾರಕಗಳು',
      subtitle: 'ಪುರಿ ಜಗನ್ನಾಥ ಮೇಘನಾದ ಪಾಚೇರಿಯಿಂದ ಸಿಂಹಾಚಲಂವರೆಗೆ ಸೂರ್ಯವಂಶಿ ವಾಸ್ತುಶಿಲ್ಪ ವೈಭವ.',
      patronLabel: 'ನಿರ್ಮಿಸಿದ ರಾಜ',
      styleLabel: 'ವಾಸ್ತುಶೈಲಿ',
      significanceLabel: 'ಐತಿಹಾಸಿಕ ಮಹತ್ವ',
      sourcesLabel: 'ಐತಿಹಾಸಿಕ ಮೂಲಗಳು'
    },
    timeline: {
      badge: 'ಕಾಲಾನುಕ್ರಮ ಅಧಿಕೃತ ದಾಖಲೆ',
      title: 'ಸಮಗ್ರ ಐತಿಹಾಸಿಕ ಕಾಲರೇಖೆ',
      subtitle: 'ಕ್ರಿ.ಶ. 1434ರಿಂದ ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳ ಉದಯ, ದಿಗ್ವಿಜಯಗಳು ಮತ್ತು ಸುವರ್ಣ ಆಡಳಿತ.',
      filterPlaceholder: 'ವರ್ಷ ಅಥವಾ ರಾಜನ ಹೆಸರು ಬರೆದು ಹುಡುಕಿ (ಉದಾ. 1458, Kapilendra)...',
      rulerLabel: 'ಸಂಬಂಧಿತ ರಾಜ',
      evidenceLabel: 'ಸಂಬಂಧಿತ ಪುರಾವೆ',
      citationsLabel: 'ಮೂಲ ಉಲ್ಲೇಖಗಳು',
      methodologyLabel: 'ವಿಧಾನ ವಿವರಣೆ'
    },
    odraDesha: {
      badge: 'ಐತಿಹಾಸಿಕ ಭೂಗೋಳ ಮತ್ತು ನಾಮಕರಣ',
      title: 'ಓಡ್ರ ದೇಶ: ಪೂರ್ವ ಭಾರತದ ಸಾರ್ವಭೌಮತೆಯ ಪ್ರಾಚೀನ ಕೇಂದ್ರ',
      subtitle: 'ಪ್ಲಿನಿಯ ಬರಹಗಳಿಂದ ಹಿಡಿದು ವಾರಣಾಸಿ ಕಟಕ ರಾಜಧಾನಿಯವರೆಗಿನ ಓಡ್ರ ದೇಶದ ಐತಿಹಾಸಿಕ ಬೆಳವಣಿಗೆ.',
      regionsTitle: 'ಪ್ರಾಚೀನ ಪೂರ್ವ ಭಾರತೀಯ ರಾಜ್ಯಗಳ ಗಡಿಗಳು',
      regionsSubtitle: 'ಶಾಸನಗಳ ಆಧಾರದಲ್ಲಿ ಓಡ್ರ, ಕಳಿಂಗ, ಉತ್ಕಲ ಮತ್ತು ತ್ರಿಕಳಿಂಗದ ಪ್ರತ್ಯೇಕ ಗಡಿಗಳು.',
      odraTitle: 'ಓಡ್ರ ದೇಶ (ಔಡ್ರ)',
      odraDesc: 'ಮಹಾನದಿ ಕಣಿವೆ ಪ್ರದೇಶ. ರಾಜಧಾನಿ ವಾರಣಾಸಿ ಕಟಕ (ಇಂದಿನ ಕಟಕ್). ಗಜಪತಿಗಳ ಆಡಳಿತ ಕೇಂದ್ರ.',
      utkalaTitle: 'ಉತ್ಕಲ',
      utkalaDesc: 'ಸುವರ್ಣರೇಖಾ ನದಿಯಿಂದ ಬಂಗಾಳದವರೆಗಿನ ಕರಾವಳಿ ಪ್ರದೇಶ.',
      kalingaTitle: 'ಕಳಿಂಗ',
      kalingaDesc: 'ಋಷಿಕುಲ್ಯಾ ನದಿಯಿಂದ ಗೋದಾವರಿಯವರೆಗಿನ ಕರಾವಳಿ ಪ್ರದೇಶ.',
      trikalingaTitle: 'ತ್ರಿಕಳಿಂಗ',
      trikalingaDesc: 'ಪೂರ್ವಘಟ್ಟಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ಅರಣ್ಯ ಮತ್ತು ಪರ್ವತ ಪ್ರದೇಶ.',
      coreRulers: 'ಪ್ರಮುಖ ಆಡಳಿತಗಾರರು: ಸೂರ್ಯವಂಶ ಗಜಪತಿಗಳು'
    },
    gajapathi: {
      badge: 'ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯ (1434–1541)',
      title: 'ಗಜಪತಿ ರಾಜರು ಮತ್ತು ಸುವರ್ಣ ಸಾಮ್ರಾಜ್ಯ',
      subtitle: '1434ರಲ್ಲಿ ಕಪಿಲೇಂದ್ರ ದೇವನಿಂದ ಸ್ಥಾಪಿಸಲ್ಪಟ್ಟು, ಗಂಗಾ ನದಿಯಿಂದ ಕಾವೇರಿಯವರೆಗೆ ಆಳಿದ ಮಹಾನ್ ಸಾಮ್ರಾಜ್ಯ.',
      tabChronology: 'ಸಾಮ್ರಾಜ್ಯ ಕಾಲಾನುಕ್ರಮ',
      tabAdministration: 'ಆಡಳಿತ ಮತ್ತು ಸೈನ್ಯ ರಚನೆ',
      tabMilitary: 'ದಕ್ಷಿಣ ದಿಗ್ವಿಜಯ (ಗಂಗೆಯಿಂದ ಕಾವೇರಿವರೆಗೆ)',
      tabCulture: 'ಸಾಹಿತ್ಯ ಮತ್ತು ವಾಸ್ತುಶಿಲ್ಪ ಕೊಡುಗೆ'
    },
    about: {
      badge: 'ಐತಿಹಾಸಿಕ ಯೋಜನೆಯ ಬಗ್ಗೆ',
      title: 'ಶಾಸನಾಧಾರಿತ ಸಾರ್ವಭೌಮ ಪರಂಪರೆಯ ರಕ್ಷಣೆ',
      subtitle: 'ಮೂಲ ಶಾಸನಗಳು ಮತ್ತು ಸಂಶೋಧನೆಗಳ ಮೂಲಕ ಸೂರ್ಯವಂಶಿ ಕ್ಷತ್ರಿಯರ ಸತ್ಯ ಇತಿಹಾಸದ ದಾಖಲೀಕರಣ.',
      missionTitle: 'ನಮ್ಮ ಧ್ಯೇಯ ಮತ್ತು ಗುರಿ',
      missionDesc: 'ಮಧ್ಯಯುಗದ ಶಾಸನಗಳು ಮತ್ತು ವಂಶಾವಳಿಗಳನ್ನು ಯಾವುದೇ ಬದಲಾವಣೆ ಇಲ್ಲದೆ ರಕ್ಷಿಸುವ ಡಿಜಿಟಲ್ ತಾಣ.',
      methodologyTitle: 'ಸಂಶೋಧನಾ ಮಾನದಂಡಗಳು',
      methodologyDesc: 'ಮೂಲ ಶಾಸನಗಳು ಮತ್ತು ಮೌಖಿಕ ನಂಬಿಕೆಗಳ ನಡುವೆ ಸ್ಪಷ್ಟ ವ್ಯತ್ಯಾಸ ಕಾಯ್ದುಕೊಳ್ಳುವುದು.'
    }
  },

  // 6. TAMIL (ta)
  ta: {
    home: {
      pillarsBadge: 'அடிப்படை வரலாற்றுத் தூண்கள்',
      pillarsTitle: 'சூரியவம்ச ஒடியாராஜு மரபின் முதன்மைப் பிரிவுகள்',
      pillarsSubtitle: 'கல்வெட்டுகள், அரச ஆவணங்கள் மற்றும் வரலாற்று புவியியல் அடிப்படையில் தொகுக்கப்பட்டது.',
      pillars: [
        {
          title: 'பண்டைய ஒட்ர தேசம்',
          desc: 'வரலாற்று புவியியல் மற்றும் வாரணாசி கட்டக் தலைநகரத்தின் தோற்றம்.'
        },
        {
          title: 'கலிங்கம் மற்றும் பிராந்திய தொடர்புகள்',
          desc: 'ஒட்ர, உத்கலம், கலிங்கம் மற்றும் திரிகலிங்கத்தின் வரலாற்று எல்லைகள்.'
        },
        {
          title: 'கஜபதி மன்னர்கள் மற்றும் பேரரசு யுகம்',
          desc: 'கபிலேந்திர தேவர் முதல் பிரதாபருத்ரர் வரை: கங்கை முதல் காவிரி வரையிலான ஆட்சி.'
        },
        {
          title: 'அரச வம்சாவளி மற்றும் மரபுகள்',
          desc: 'கல்வெட்டு சான்றுகள் மூலம் உறுதிசெய்யப்பட்ட அரச குடும்ப மரபு மரம்.'
        },
        {
          title: 'கல்வெட்டுகள் மற்றும் தொல்பொருளியல்',
          desc: 'இருமொழி செப்பேடுகள், வெலிகலானி, சிம்மாசலம் மற்றும் லிங்கராஜர் கல்வெட்டுகள்.'
        },
        {
          title: 'கோயில்கள் மற்றும் நினைவுச் சின்னங்கள்',
          desc: 'புரி மேகநாத பாசேரி, கொனார்க் மற்றும் பாராபடி கோட்டையின் கட்டடக் கலை.'
        },
        {
          title: 'கலாச்சாரம் மற்றும் பாரம்பரியம்',
          desc: 'சூரியவம்ச சத்திரிய மரபுகள், சேரா பஹரா சடங்குகள் மற்றும் விழாக்கள்.'
        },
        {
          title: 'இலக்கியம் மற்றும் வெளியீடுகள்',
          desc: 'சரஸ்வதி விலாசம் சமஸ்கிருத நூல் மற்றும் சாரளா தாசரின் ஒடியா மகாபாரதம்.'
        }
      ],
      researchBadge: 'ஆய்வுசார் வரலாறு',
      researchTitle: 'முக்கிய வரலாற்று ஆய்வுக் கட்டுரைகள்',
      researchSubtitle: 'கல்வெட்டுகள் மற்றும் பேரரசு குறித்த அறிஞர்களின் விரிவான ஆய்வுகள்.',
      readFull: 'முழு கட்டுரையைப் படியுங்கள்',
      viewAllResearch: 'அனைத்து ஆய்வுகளையும் காண்க',
      timelineBadge: 'காலவரிசை மைல்கற்கள்',
      timelineTitle: 'முக்கிய வரலாற்று நிகழ்வுகள் (1434–1540)',
      timelineSubtitle: 'செப்பேடுகள் மற்றும் கல்வெட்டுகள் மூலம் உறுதிப்படுத்தப்பட்ட நிகழ்வுகள்.',
      viewFullTimeline: 'முழு காலவரிசையைக் காண்க',
      galleryBadge: 'காட்சிப் பாரம்பரியம்',
      galleryTitle: 'வரலாற்றுப் புகைப்படக் கூடம்',
      gallerySubtitle: 'கோட்டைகள், கல்வெட்டுகள் மற்றும் கோயில்களின் வரலாற்றுப் புகைப்படங்கள்.',
      viewFullGallery: 'புகைப்படக் கூடம் காண்க',
      communityBadge: 'வாழும் மரபு மற்றும் உலக சமுதாயம்',
      communityTitle: 'நமது வரலாற்றுப் பாரம்பரியத்தைப் பாதுகாப்போம்',
      communitySubtitle: 'உலகெங்கிலும் உள்ள சத்திரிய குடும்பங்கள் ஒன்றிணைவோம்.',
      joinBtn: 'கணக்கை பதிவு செய்க',
      directoryBtn: 'உறுப்பினர் பட்டியல்'
    },
    kingsQueens: {
      badge: 'ஆவணப்படுத்தப்பட்ட வரலாற்று ஆளுமைகள்',
      title: 'சூரியவம்ச மன்னர்கள், அரசிகள், தளபதிகள் மற்றும் அறிஞர்கள்',
      subtitle: 'ஆட்சிக்காலம், கல்வெட்டு மேற்கோள்கள் மற்றும் கட்டடக் கலை சாதனைகளுடன் வாழ்க்கை வரலாறு.',
      listTitle: 'வரலாற்று ஆளுமைகள்',
      alternateSpellings: 'மாற்றுப் பெயர்கள்',
      dynastyLabel: 'அரச வம்சம்',
      titlesLabel: 'அரச பட்டங்கள் மற்றும் புகழுரைகள்',
      biographyLabel: 'வாழ்க்கை வரலாறு மற்றும் வரலாற்று முக்கியத்துவம்',
      eventsLabel: 'காலவரிசை வரலாற்று நிகழ்வுகள்',
      placesLabel: 'தொடர்புடைய கோட்டைகள் மற்றும் திருத்தலங்கள்',
      citationsLabel: 'முதன்மை கல்வெட்டு ஆதாரங்கள்'
    },
    genealogy: {
      badge: 'கல்வெட்டு வம்சாவளி vs வாய்மொழி மரபுகள்',
      title: 'சூரியவம்ச ஒடியாராஜு சத்திரிய அரச வம்சாவளி',
      subtitle: 'கல்வெட்டுகளால் நிரூபிக்கப்பட்ட அரச வம்சாவಳியைக் காட்டும் குடும்ப மரம்.',
      chartTitle: 'மரபுவழி வரைபடம்',
      chartSubtitle: 'விவரங்களைக் காண அரசர் பெயரைக் கிளிக் செய்க',
      claimsBadge: 'வரலாற்றுச் சான்றுகள் மதிப்பாய்வு',
      claimsTitle: 'பாரம்பரிய மரபுகள் மற்றும் கூற்றுகளின் பகுப்பாய்வு',
      claimsSubtitle: 'நம்பகமான வரலாற்று ஆதாரங்கள் மற்றும் வரலாற்று ஆசிரியர்களின் மதிப்பீடு.'
    },
    inscriptions: {
      badge: 'கல்வெட்டுத் தொகுப்பு மற்றும் மூல ஆதாரங்கள்',
      title: 'கல்வெட்டுகள் மற்றும் தொல்பொருள் பதிவுகள்',
      subtitle: 'வரலாற்று உண்மைக்கான அடித்தளம். செப்பேடுகள், தமிழாக்கங்கள் மற்றும் கல்வெட்டு இதழ் குறிப்புகள்.',
      searchPlaceholder: 'மன்னர், இடம் அல்லது கல்வெட்டுப் பெயரால் தேடுக...',
      showingCount: 'ஆய்வு செய்யப்பட்ட கல்வெட்டுகள்',
      rulerLabel: 'ஆட்சியாளர்',
      findspotLabel: 'கண்டெடுக்கப்பட்ட இடம்',
      eraLabel: 'காலம் / தேதி',
      dynastyLabel: 'அரச வம்சம்',
      transcriptionLabel: 'மூலக் கல்வெட்டு உரை',
      translationLabel: 'அறிஞர்களின் மொழிபெயர்ப்பு மற்றும் விளக்கம்',
      significanceLabel: 'வரலாற்று மற்றும் அரசியல் முக்கியத்துவம்'
    },
    monuments: {
      badge: 'கட்டடக் கலை மற்றும் அரச ஆதரவு',
      title: 'கோயில்கள், கோட்டைகள் மற்றும் நினைவுச் சின்னங்கள்',
      subtitle: 'புரி முதல் சிம்மாசலம் வரை சூரியவம்ச மன்னர்களின் பிரம்மாண்ட கட்டடக் கலை.',
      patronLabel: 'கட்டிய மன்னர்',
      styleLabel: 'கட்டடக் கலை பாணி',
      significanceLabel: 'வரலாற்று முக்கியத்துவம்',
      sourcesLabel: 'வரலாற்று மூலங்கள்'
    },
    timeline: {
      badge: 'காலவரிசை முதன்மைப் பதிவேடு',
      title: 'முழுமையான வரலாற்று காலவரிசை',
      subtitle: 'கி.பி. 1434 முதல் சூரியவம்ச கஜபதிகளின் எழுச்சி மற்றும் தென்னிந்திய வெற்றிகள்.',
      filterPlaceholder: 'ஆண்டு அல்லது மன்னர் பெயர் கொண்டு தேடுக (எ.கா. 1458, Kapilendra)...',
      rulerLabel: 'தொடர்புடைய மன்னர்',
      evidenceLabel: 'தொடர்புடைய சான்று',
      citationsLabel: 'முதன்மை ஆதாரங்கள்',
      methodologyLabel: 'ஆய்வு முறை விளக்கம்'
    },
    odraDesha: {
      badge: 'வரலாற்று புவியியல் மற்றும் பெயரமைப்பு',
      title: 'ஒட்ர தேசம்: கிழக்கு இந்திய இறையாண்மையின் பண்டைய இதயம்',
      subtitle: 'பிளினியின் வரலாற்று குறிப்புகள் முதல் வாரணாசி கட்டக் தலைநகரம் வரையிலான வளர்ச்சி.',
      regionsTitle: 'பண்டைய கிழக்கு நாடுகளின் எல்லைகள்',
      regionsSubtitle: 'கல்வெட்டுகளின் அடிப்படையில் ஒட்ர, கலிங்கம், உத்கலம் எல்லைகள்.',
      odraTitle: 'ஒட்ர தேசம் (ஔட்ர)',
      odraDesc: 'மகாநதி படுகை. தலைநகரம் வாரணாசி கட்டக் (கட்டக்). கஜபதிகளின் ஆட்சி மையம்.',
      utkalaTitle: 'உத்கலம்',
      utkalaDesc: 'சுபர்ணரேகை நதி முதல் வங்காளம் வரையிலான கடற்கரைப் பகுதி.',
      kalingaTitle: 'கலிங்கம்',
      kalingaDesc: 'ரிஷிகுல்யா முதல் கோதாவரி வரையிலான கடலோரப் பகுதி.',
      trikalingaTitle: 'திரிகலிங்கம்',
      trikalingaDesc: 'கிழக்கு தொடர்ச்சி மலைகளை இணைக்கும் வனப் பிரதேசம்.',
      coreRulers: 'முதன்மை ஆட்சியாளர்கள்: சூரியவம்ச கஜபதிகள்'
    },
    gajapathi: {
      badge: 'சூரியவம்ச கஜபதி பேரரசு (1434–1541)',
      title: 'கஜபதி மன்னர்கள் மற்றும் பொற்காலம்',
      subtitle: '1434இல் கபிலேந்திர தேவரால் நிறுவப்பட்டு, கங்கை முதல் காவிரி வரை ஆட்சி செய்த பேரரசு.',
      tabChronology: 'பேரரசு காலவரிசை',
      tabAdministration: 'நிர்வாகம் மற்றும் படைகள்',
      tabMilitary: 'தென்னிந்தியப் படையெடுப்பு (கங்கை முதல் காவிரி வரை)',
      tabCulture: 'இலக்கியம் மற்றும் கட்டடக் கலை'
    },
    about: {
      badge: 'வரலாற்றுத் திட்டம் பற்றி',
      title: 'கல்வெட்டு ஆதாரங்களுடன் வரலாற்றுப் பாதுகாப்பு',
      subtitle: 'முதன்மை கல்வெட்டுகள் மற்றும் ஆய்வுகள் மூலம் சூரியவம்ச சத்திரிய வரலாற்றைப் பாதுகாத்தல்.',
      missionTitle: 'எங்கள் நோக்கம் மற்றும் கடமை',
      missionDesc: 'மத்திய கால கல்வெட்டுகள் மற்றும் அரச மரபுகளை மாற்றமின்றி பாதுகாக்கும் டிஜிட்டல் தளம்.',
      methodologyTitle: 'ஆய்வு நெறிமுறைகள்',
      methodologyDesc: 'கல்வெட்டு ஆதாரங்களுக்கும் வாய்மொழி நம்பிக்கைகளுக்கும் இடையே தெளிவான வேறுபாட்டைப் பேணுதல்.'
    }
  },

  // 7. MARATHI (mr)
  mr: {
    home: {
      pillarsBadge: 'पायाभूत ऐतिहासिक स्तंभ',
      pillarsTitle: 'सूर्यवंशी ओडियाराजू वारशाचे मुख्य पैलू',
      pillarsSubtitle: 'सत्यापित शिलालेख, राजदरबारी नोंदी आणि ऐतिहासिक भूगोलावर आधारित संकलन.',
      pillars: [
        {
          title: 'प्राचीन ओड्र देश',
          desc: 'ऐतिहासिक भूगोल आणि वाराणसी कटक राजधानीपर्यंतचा प्रामाणिक विकास.'
        },
        {
          title: 'कलिंग आणि प्रादेशिक संबंध',
          desc: 'शिलालेखांच्या आधारे ओड्र, उत्कल, कलिंग आणि त्रिकलिंगच्या सीमांचे विश्लेषण.'
        },
        {
          title: 'गजपती राजे आणि साम्राज्य युग',
          desc: 'कपिलेंद्र देवापासून प्रतापरुद्र देवापर्यंत: गंगा ते कावेरीपर्यंतचा सुवर्णकाळ.'
        },
        {
          title: 'राजघराणी आणि वंशावळ',
          desc: 'शिलालेखांद्वारे सिद्ध झालेली अधिकृत सूर्यवंशी क्षत्रिय वंशावळ.'
        },
        {
          title: 'शिलालेख आणि पुरातत्व',
          desc: 'द्विभाषिक ताम्रपट, वेलिगलनी, सिंहाचलम आणि लिंगराज मंदिरातील शिलालेख.'
        },
        {
          title: 'मंदिरे आणि ऐतिहासिक वास्तू',
          desc: 'पुरी जगन्नाथ मंदिराची मेघनाद पाचेरी, कोणार्क आणि बाराबती किल्ल्याचे स्थापत्य.'
        },
        {
          title: 'संस्कृती आणि जिवंत परंपरा',
          desc: 'सूर्यवंशी क्षत्रिय परंपरा, छेरा पहँरा विधी आणि सण-उत्सव.'
        },
        {
          title: 'साहित्य आणि ग्रंथसंपदा',
          desc: 'सरस्वती विलास हा संस्कृत ग्रंथ आणि सरला दासांचे ओडिया महाभारत.'
        }
      ],
      researchBadge: 'संशोधनात्मक इतिहास',
      researchTitle: 'प्रमुख ऐतिहासिक शोधनिबंध',
      researchSubtitle: 'पुरालेख आणि राज्यकारभारावर इतिहासकारांचे अभ्यासपूर्ण लेख.',
      readFull: 'पूर्ण लेख वाचा',
      viewAllResearch: 'सर्व शोधनिबंध पहा',
      timelineBadge: 'ऐतिहासिक कालक्रम',
      timelineTitle: 'महत्त्वाचे ऐतिहासिक टप्पे (१४३४–१५४०)',
      timelineSubtitle: 'समकालीन ताम्रपट आणि मंदिरांतील शिलालेखांनी सिद्ध केलेल्या घटना.',
      viewFullTimeline: 'पूर्ण कालक्रम पहा',
      galleryBadge: 'दृश्य वारसा',
      galleryTitle: 'ऐतिहासिक दालन आणि छायाचित्रे',
      gallerySubtitle: 'किल्ले, शिलालेख आणि मंदिरांची दुर्मिळ छायाचित्रे.',
      viewFullGallery: 'दालन पहा',
      communityBadge: 'जिवंत परंपरा आणि जागतिक समुदाय',
      communityTitle: 'आपला गौरवशाली ऐतिहासिक वारसा जतन करूया',
      communitySubtitle: 'भारत आणि जगभरातील सूर्यवंशी क्षत्रिय बांधवांना एकत्र आणणारे व्यासपीठ.',
      joinBtn: 'खाते नोंदवा',
      directoryBtn: 'सदस्य सूची'
    },
    kingsQueens: {
      badge: 'शिलालेख-प्रमाणित ऐतिहासिक राजे',
      title: 'सूर्यवंशाचे राजे, राण्या, सेनापती आणि विद्वान',
      subtitle: 'शासनकाळ, शिलालेख संदर्भ आणि स्थापत्य निर्मितीसह प्रामाणिक चरित्रे.',
      listTitle: 'ऐतिहासिक व्यक्ती',
      alternateSpellings: 'इतर नावे',
      dynastyLabel: 'राजघराणे',
      titlesLabel: 'राजकीय पदव्या आणि बिरुदावली',
      biographyLabel: 'अधिकृत चरित्र आणि ऐतिहासिक महत्त्व',
      eventsLabel: 'कालक्रमानुसार प्रमुख घटना',
      placesLabel: 'संबंधित किल्ले आणि तीर्थक्षेत्रे',
      citationsLabel: 'मूळ शिलालेखीय संदर्भ'
    },
    genealogy: {
      badge: 'शिलालेखीय वंशावळ विरुद्ध लोकपरंपरा',
      title: 'सूर्यवंशी ओडियाराजू क्षत्रिय राजवंशावळ',
      subtitle: 'शिलालेखांनी सिद्ध राजघराण्याचा प्रामाणिक वंशवृक्ष.',
      chartTitle: 'परस्परसंवादी वंशावळ तक्ता',
      chartSubtitle: 'शिलालेख आणि संदर्भ पाहण्यासाठी कोणत्याही राजावर क्लिक करा',
      claimsBadge: 'ऐतिहासिक पुरावे समीक्षा',
      claimsTitle: 'पारंपरिक दाव्यांचे तटस्थ विश्लेषण',
      claimsSubtitle: 'पारंपरिक लोकस्मृती आणि इतिहासकारांचे वस्तुनिष्ठ मूल्यमापन.'
    },
    inscriptions: {
      badge: 'शिलालेख संग्रह आणि मूळ साधने',
      title: 'शिलालेख आणि पुरातत्वीय नोंदी',
      subtitle: 'इतिहासाचा पाया. ताम्रपट, अभ्यासकांचे अनुवाद आणि एपिग्राफिया इंडिका संदर्भ.',
      searchPlaceholder: 'राजे, ठिकाण किंवा ताम्रपटाच्या नावाने शोधा...',
      showingCount: 'तपासलेले शिलालेख',
      rulerLabel: 'शासक',
      findspotLabel: 'सापडलेले ठिकाण',
      eraLabel: 'काळ / तारीख',
      dynastyLabel: 'राजघराणे',
      transcriptionLabel: 'मूळ शिलालेख मजकूर',
      translationLabel: 'अभ्यासकांचे भाषांतर आणि विश्लेषण',
      significanceLabel: 'ऐतिहासिक आणि राजकीय महत्त्व'
    },
    monuments: {
      badge: 'स्थापत्य वारसा आणि राजाश्रय',
      title: 'मंदिरे, किल्ले आणि ऐतिहासिक स्मारके',
      subtitle: 'पुरीच्या मेघनाद पाचेरीपासून सिंहाचलमपर्यंत सूर्यवंशी स्थापत्याचा गौरव.',
      patronLabel: 'निर्माता राजा',
      styleLabel: 'स्थापत्य शैली',
      significanceLabel: 'ऐतिहासिक महत्त्व',
      sourcesLabel: 'ऐतिहासिक साधने'
    },
    timeline: {
      badge: 'कालक्रमानुसार अधिकृत नोंद',
      title: 'सविस्तर ऐतिहासिक कालरेषा',
      subtitle: '१४३४ पासून सूर्यवंशी गजपतींचा उदय आणि दक्षिण भारतातील विजय मोहिमा.',
      filterPlaceholder: 'वर्ष किंवा राजाचे नाव टाकून शोधा (उदा. 1458, Kapilendra)...',
      rulerLabel: 'संबंधित राजा',
      evidenceLabel: 'संबंधित पुरावा',
      citationsLabel: 'मूळ संदर्भ',
      methodologyLabel: 'पद्धतीविषयक नोंद'
    },
    odraDesha: {
      badge: 'ऐतिहासिक भूगोल आणि नामकरण',
      title: 'ओड्र देश: पूर्व भारतीय सार्वभौमत्वाचे प्राचीन केंद्र',
      subtitle: 'प्लिनीच्या नोंदींपासून वाराणसी कटक राजधानीपर्यंतचा विकास.',
      regionsTitle: 'प्राचीन पूर्व भारतीय राज्यांच्या सीमा',
      regionsSubtitle: 'शिलालेखांच्या आधारे ओड्र, कलिंग आणि उत्कलच्या स्वतंत्र सीमा.',
      odraTitle: 'ओड्र देश (औड्र)',
      odraDesc: 'महानदी खोरे. राजधानी वाराणसी कटक (कटक). गजपतींचे मुख्य केंद्र.',
      utkalaTitle: 'उत्कल',
      utkalaDesc: 'सुवर्णरेखा ते बंगालपर्यंतचा किनारी प्रदेश.',
      kalingaTitle: 'कलिंग',
      kalingaDesc: 'ऋषिकुल्या ते गोदावरीपर्यंतचा किनारी भाग.',
      trikalingaTitle: 'त्रिकलिंग',
      trikalingaDesc: 'पूर्व घाटातील पर्वतीय आणि वन प्रदेश.',
      coreRulers: 'प्रमुख शासक: सूर्यवंशी गजपती राजे'
    },
    gajapathi: {
      badge: 'सूर्यवंशी गजपती साम्राज्य (१४३४–१५४१)',
      title: 'गजपती राजे आणि साम्राज्याचा सुवर्णकाळ',
      subtitle: '१४३४ मध्ये कपिलेंद्र देवाने स्थापन केलेले गंगा ते कावेरीपर्यंत पसरलेले विशाल साम्राज्य.',
      tabChronology: 'साम्राज्य कालक्रम',
      tabAdministration: 'प्रशासन आणि सैन्यव्यवस्था',
      tabMilitary: 'दक्षिण विजय मोहिमा (गंगा ते कावेरी)',
      tabCulture: 'साहित्य आणि स्थापत्य वारसा'
    },
    about: {
      badge: 'ऐतिहासिक प्रकल्पाबद्दल',
      title: 'शिलालेखीय पुराव्यांसह ऐतिहासिक वारशाचे जतन',
      subtitle: 'मूळ शिलालेख आणि संशोधनाच्या आधारे सूर्यवंशी क्षत्रियांचा खरा इतिहास जतन करणे.',
      missionTitle: 'आमचे ध्येय आणि संकल्प',
      missionDesc: 'मध्ययुगीन शिलालेख आणि वंशावळी कोणत्याही विकृतीशिवाय जतन करणारा डिजिटल संग्रह.',
      methodologyTitle: 'संशोधन मानके',
      methodologyDesc: 'मूळ शिलालेख आणि लोककथा यांच्यात स्पष्ट भेद राखणे.'
    }
  },

  // 8. BENGALI (bn)
  bn: {
    home: {
      pillarsBadge: 'মৌলিক ঐতিহাসিক স্তম্ভ',
      pillarsTitle: 'সূর্যবংশীয় ওড়িয়ারাজু ঐতিহ্যের মূল দিকসমূহ',
      pillarsSubtitle: 'যাচাইকৃত শিলালিপি, রাজকীয় ইতিহাস এবং ঐতিহাসিক ভূগোলের ভিত্তিতে সংকলিত।',
      pillars: [
        {
          title: 'প্রাচীন ওড্র দেশ',
          desc: 'ঐতিহাসিক ভূগোল এবং বারাণসী কটক রাজধানী পর্যন্ত ভৌগোলিক বিবর্তন।'
        },
        {
          title: 'কলিঙ্গ ও আঞ্চলিক সম্পর্ক',
          desc: 'শিলালিপির ভিত্তিতে ওড্র, উৎকল, কলিঙ্গ ও ত্রিকলিঙ্গের ঐতিহাসিক সীমানা।'
        },
        {
          title: 'গজপতি রাজাগণ ও স্বর্ণযুগ',
          desc: 'কপিলেন্দ্র দেব থেকে প্রতাপরুদ্র দেব: গঙ্গা থেকে কাবেরী পর্যন্ত সাম্রাজ্য বিস্তার।'
        },
        {
          title: 'রাজকীয় বংশতালিকা ও রাজবংশ',
          desc: 'শিলালিপি দ্বারা প্রমাণিত রাজবংশের নির্ভুল পারিবারিক বংশলতিকা।'
        },
        {
          title: 'শিলালিপি ও প্রত্নতত্ত্ব',
          desc: 'দ্বিভাষিক তাম্রশাসন, ভেলিগালানি, সিংহাচলম ও লিঙ্গরাজ মন্দিরের শিলালিপি।'
        },
        {
          title: 'মন্দির ও স্থাপত্য কীর্তি',
          desc: 'পুরী জগন্নাথ মন্দিরের মেঘনাদ প্রাচীর, কোণার্ক ও বারবাটী দুর্গের স্থাপত্য।'
        },
        {
          title: 'সংস্কৃতি ও জীবন্ত ঐতিহ্য',
          desc: 'সূর্যবংশীয় ক্ষত্রিয় ঐতিহ্য, ছেরা পহঁরা আচার ও সামাজিক উৎসব।'
        },
        {
          title: 'সাহিত্য ও গ্রন্থাবলি',
          desc: 'সরস্বতী বিলাস সংস্কৃত গ্রন্থ এবং সারলা দাসের ওড়িয়া মহাভারত।'
        }
      ],
      researchBadge: 'অ্যাকাডেমিক ইতিহাস গবেষণা',
      researchTitle: 'প্রধান ঐতিহাসিক গবেষণাপত্র',
      researchSubtitle: 'শিলালিপি ও রাজবংশের ইতিহাসের ওপর বিশিষ্ট গবেষকদের প্রবন্ধ।',
      readFull: 'সম্পূর্ণ প্রবন্ধ পড়ুন',
      viewAllResearch: 'সকল গবেষণাপত্র দেখুন',
      timelineBadge: 'কালানুক্রমিক মাইলফলক',
      timelineTitle: 'গুরুত্বপূর্ণ ঐতিহাসিক ঘটনাপঞ্জি (১৪৩৪–১৫৪০ খ্রি.)',
      timelineSubtitle: 'সমকালীন তাম্রশাসন ও মন্দির শিলালিপি দ্বারা প্রমাণিত প্রধান ঘটনাবলি।',
      viewFullTimeline: 'সম্পূর্ণ কালরেখা দেখুন',
      galleryBadge: 'দৃশ্যমান ঐতিহ্য',
      galleryTitle: 'ঐতিহাসিক গ্যালারি ও আলোকচিত্র',
      gallerySubtitle: 'প্রাচীন দুর্গ, শিলালিপি ও মন্দিরের দুর্লভ আলোকচিত্র সংকলন।',
      viewFullGallery: 'গ্যালারি দেখুন',
      communityBadge: 'জীবন্ত ঐতিহ্য ও বিশ্ব সম্প্রদায়',
      communityTitle: 'আমাদের ঐতিহাসিক সার্বভৌম ঐতিহ্য সংরক্ষণ করি',
      communitySubtitle: 'ভারত ও বিশ্বজুড়ে ছড়িয়ে থাকা সূর্যবংশীয় ক্ষত্রিয় পরিবারবর্গকে ঐক্যবদ্ধ করা।',
      joinBtn: 'অ্যাকাউন্ট খুলুন',
      directoryBtn: 'সদস্য তালিকা'
    },
    kingsQueens: {
      badge: 'নথিভুক্ত ঐতিহাসিক ব্যক্তিত্ব',
      title: 'সূর্যবংশের রাজা, রানি, সেনাপতি ও পণ্ডিতগণ',
      subtitle: 'শাসনকাল, এপিগ্রাফিয়া ইন্ডিকা সূত্র ও স্থাপত্য কীর্তিসহ প্রামাণ্য জীবনবৃত্তান্ত।',
      listTitle: 'ঐতিহাসিক ব্যক্তিত্ব',
      alternateSpellings: 'অন্যান্য নাম',
      dynastyLabel: 'রাজবংশ',
      titlesLabel: 'রাজকীয় উপাধি ও প্রশস্তি',
      biographyLabel: 'প্রামাণিক জীবনী ও ঐতিহাসিক গুরুত্ব',
      eventsLabel: 'কালানুক্রমিক ঘটনাবলি',
      placesLabel: 'সংশ্লিষ্ট দুর্গ ও তীর্থক্ষেত্র',
      citationsLabel: 'মৌলিক শিলালিপি ও গবেষণা সূত্র'
    },
    genealogy: {
      badge: 'শিলালিপি বংশতালিকা বনাম লোকঐতিহ্য',
      title: 'সূর্যবংশীয় ওড়িয়ারাজু ক্ষত্রিয় রাজকীয় বংশতালিকা',
      subtitle: 'শিলালিপি দ্বারা প্রমাণিত রাজবংশের নির্ভুল পারিবারিক বংশলতিকা।',
      chartTitle: 'ইন্টারেক্টিভ রাজবংশ চার্ট',
      chartSubtitle: 'শিলালিপি ও তথ্য দেখতে যেকোনো রাজার ওপর ক্লিক করুন',
      claimsBadge: 'ঐতিহাসিক প্রমাণ পর্যালোচনা',
      claimsTitle: 'ঐতিহ্যবাহী দাবি ও বিশ্বাসের নিরপেক্ষ বিশ্লেষণ',
      claimsSubtitle: 'ঐতিহাসিক শিলালিপি এবং আধুনিক গবেষকদের প্রামাণ্য মূল্যায়ন।'
    },
    inscriptions: {
      badge: 'শিলালিপি সংকলন ও প্রাথমিক উৎস',
      title: 'শিলালিপি ও প্রত্নতাত্ত্বিক নথি',
      subtitle: 'ঐতিহাসিক সত্যতার মূল ভিত্তি। তাম্রশাসন, অনুবাদ ও এপিগ্রাফিয়া ইন্ডিকা সূত্র।',
      searchPlaceholder: 'রাজা, স্থান বা তাম্রশাসনের নাম দিয়ে খুঁজুন...',
      showingCount: 'পর্যালোচিত শিলালিপি সংখ্যা',
      rulerLabel: 'শাসক',
      findspotLabel: 'প্রাপ্তিস্থান',
      eraLabel: 'সময়কাল / তারিখ',
      dynastyLabel: 'রাজবংশ',
      transcriptionLabel: 'মূল শিলালিপির পাঠ',
      translationLabel: 'গবেষকদের অনুবাদ ও বিশ্লেষণ',
      significanceLabel: 'ঐতিহাসিক ও রাজনৈতিক তাৎপর্য'
    },
    monuments: {
      badge: 'স্থাপত্য ঐতিহ্য ও রাজকীয় পৃষ্ঠপোষকতা',
      title: 'মন্দির, দুর্গ ও রাজকীয় কীর্তি',
      subtitle: 'পুরীর মেঘনাদ প্রাচীর থেকে সিংহাচলম পর্যন্ত সূর্যবংশীয় স্থাপত্যের নিদর্শন।',
      patronLabel: 'নির্মাতা শাসক',
      styleLabel: 'স্থাপত্য শৈলী',
      significanceLabel: 'ঐতিহাসিক গুরুত্ব',
      sourcesLabel: 'ঐতিহাসিক উৎস'
    },
    timeline: {
      badge: 'কালানুক্রমিক প্রামাণিক নথি',
      title: 'সম্পূর্ণ ঐতিহাসিক কালরেখা',
      subtitle: '১৪৩৪ খ্রিস্টাব্দ থেকে সূর্যবংশীয় গজপতিদের উত্থান ও দক্ষিণ বিজয় অভিযান।',
      filterPlaceholder: 'সাল বা রাজার নাম লিখে খুঁজুন (যেমন 1458, Kapilendra)...',
      rulerLabel: 'সংশ্লিষ্ট শাসক',
      evidenceLabel: 'সংশ্লিষ্ট প্রমাণ',
      citationsLabel: 'প্রাথমিক সূত্র',
      methodologyLabel: 'পদ্ধতিগত ব্যাখ্যা'
    },
    odraDesha: {
      badge: 'ঐতিহাসিক ভূগোল ও নামকরণ',
      title: 'ওড্র দেশ: প্রাচ্য ভারতীয় সার্বভৌমত্বের প্রাচীন কেন্দ্র',
      subtitle: 'প্লিনির বিবরণ থেকে বারাণসী কটক রাজধানী পর্যন্ত ওড্র দেশের ঐতিহাসিক বিকাশ।',
      regionsTitle: 'প্রাচীন প্রাচ্য রাজ্যসমূহের সীমানা নির্ধারণ',
      regionsSubtitle: 'শিলালিপির ভিত্তিতে ওড্র, কলিঙ্গ ও উৎকলের স্বতন্ত্র সীমানা।',
      odraTitle: 'ওড্র দেশ (ঔড্র)',
      odraDesc: 'মহানদী অববাহিকা। রাজধানী বারাণসী কটক (কটক)। গজপতিদের মূল কেন্দ্র।',
      utkalaTitle: 'উৎকল',
      utkalaDesc: 'সুবর্ণরেখা থেকে বাংলা পর্যন্ত বিস্তৃত উপকূলীয় অঞ্চল।',
      kalingaTitle: 'কলিঙ্গ',
      kalingaDesc: 'ঋষিকুল্যা থেকে গোদাবরী পর্যন্ত বিস্তৃত উপকূলীয় অঞ্চল।',
      trikalingaTitle: 'ত্রিকলিঙ্গ',
      trikalingaDesc: 'পূর্বঘাট পর্বতমালার মধ্যবর্তী বনভূমি অঞ্চল।',
      coreRulers: 'প্রধান শাসক: সূর্যবংশীয় গজপতি সম্রাটগণ'
    },
    gajapathi: {
      badge: 'সূর্যবংশীয় গজপতি সাম্রাজ্য (১৪৩৪–১৫৪১ খ্রি.)',
      title: 'গজপতি রাজাগণ ও স্বর্ণযুগ',
      subtitle: '১৪৩৪ সালে কপিলেন্দ্র দেব কর্তৃক প্রতিষ্ঠিত, গঙ্গা থেকে কাবেরী পর্যন্ত বিস্তৃত বিশাল সাম্রাজ্য।',
      tabChronology: 'সাম্রাজ্য কালক্রম',
      tabAdministration: 'প্রশাসন ও সামরিক ব্যবস্থা',
      tabMilitary: 'দক্ষিণ বিজয় অভিযান (গঙ্গা থেকে কাবেরী)',
      tabCulture: 'সাহিত্য ও স্থাপত্য ঐতিহ্য'
    },
    about: {
      badge: 'ঐতিহাসিক প্রকল্প সম্পর্কিত',
      title: 'শিলালিপিভিত্তিক প্রামাণিক ইতিহাস সংরক্ষণ',
      subtitle: 'মৌলিক শিলালিপি ও গবেষণার মাধ্যমে সূর্যবংশীয় ক্ষত্রিয়দের সত্য ইতিহাস সংরক্ষণ।',
      missionTitle: 'আমাদের লক্ষ্য ও সংকল্প',
      missionDesc: 'মধ্যযুগীয় শিলালিপি ও বংশলতিকা অবিকৃতভাবে সংরক্ষণের জন্য একটি ডিজিটাল প্ল্যাটফর্ম।',
      methodologyTitle: 'গবেষণার মানদণ্ড',
      methodologyDesc: 'মৌলিক শিলালিপি এবং লোকবিশ্বাসের মধ্যে সুস্পষ্ট পার্থক্য বজায় রাখা।'
    }
  }
};
