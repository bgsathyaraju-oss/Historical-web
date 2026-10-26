import { LanguageCode } from '../types';
import { KALINGA_WAR_TRANSLATIONS_PART2 } from './kalingaWarTranslationsPart2';

export interface KalingaQuickSummary {
  sectionTitle: string;
  conflictLabel: string;
  conflictValue: string;
  dateLabel: string;
  dateValue: string;
  rulerLabel: string;
  rulerValue: string;
  polityLabel: string;
  polityValue: string;
  sourceLabel: string;
  sourceValue: string;
  sitesLabel: string;
  sitesValue: string;
  significanceLabel: string;
  significanceValue: string;
}

export interface KalingaWarScene {
  id: string;
  sceneNumber: string;
  title: string;
  visualTypeBadge: string;
  isArtisticReconstruction: boolean;
  imageUrl: string;
  secondaryImageUrl: string;
  imageAlt: string;
  secondaryImageAlt: string;
  narrative: string;
  caption: string;
  secondaryCaption: string;
  attribution: string;
  historicalNote: string;
}

export interface KalingaWarReference {
  id: string;
  title: string;
  authorOrAuthority: string;
  category: 'epigraphic_primary' | 'scholarly_translation' | 'archaeological_survey';
  categoryLabel: string;
  description: string;
  url: string;
}

export interface KalingaWarLocaleContent {
  badge: string;
  pageTitle: string;
  subtitle: string;
  introParagraph: string;
  epistemicBannerTitle: string;
  epistemicBannerText: string;
  epistemicLegend: {
    inscriptionalTitle: string;
    inscriptionalDesc: string;
    scholarlyTitle: string;
    scholarlyDesc: string;
    artisticTitle: string;
    artisticDesc: string;
  };
  quickSummary: KalingaQuickSummary;
  sections: {
    background: {
      code: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      p3: string;
      evidenceBoxTitle: string;
      evidenceBoxText: string;
    };
    battle: {
      code: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      p3: string;
      historiographicalNote: string;
    };
    tragedy: {
      code: string;
      title: string;
      subtitle: string;
      p1: string;
      edictHeading: string;
      edictAttribution: string;
      statDeathsNumber: string;
      statDeathsLabel: string;
      statDeportedNumber: string;
      statDeportedLabel: string;
      statAftermathNumber: string;
      statAftermathLabel: string;
      methodologicalCaveat: string;
    };
    remorse: {
      code: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      p3: string;
      scholarlyDebateNote: string;
    };
    legacy: {
      code: string;
      title: string;
      subtitle: string;
      p1: string;
      p2: string;
      p3: string;
      conclusionTitle: string;
      conclusionText: string;
    };
  };
  scenesHeader: {
    badge: string;
    title: string;
    subtitle: string;
    viewDossierBtn: string;
    companionImageLabel: string;
    sourceAttributionLabel: string;
  };
  scenes: KalingaWarScene[];
  referencesHeader: {
    badge: string;
    title: string;
    subtitle: string;
    visitSourceBtn: string;
  };
  references: KalingaWarReference[];
  relatedLinks: {
    heading: string;
    odraDesha: string;
    inscriptions: string;
    gajapathiKings: string;
    timeline: string;
  };
}

const KALINGA_WAR_TRANSLATIONS_PART1: Record<'en' | 'hi' | 'te' | 'kn', KalingaWarLocaleContent> = {
  // ============================================================================
  // 1. ENGLISH (en)
  // ============================================================================
  en: {
    badge: 'Ancient Kalinga Epigraphic & Historical Documentary • c. 261 BCE',
    pageTitle: 'The Kalinga War: Ashoka and Kalinga — A Turning Point in History',
    subtitle: 'An evidence-based historical and epigraphic study of the Mauryan campaign against Kalinga, the human cost recorded in Major Rock Edict XIII, and the enduring legacy of the Dhauli and Jaugada inscriptions in Odisha.',
    introParagraph: 'Fought around c. 261 BCE in the eighth regnal year of the Mauryan Emperor Ashoka, the Kalinga War stands among the most consequential conflicts of the ancient world. Unlike almost all other wars of antiquity—where royal inscriptions celebrated only triumph and subjugation—the conquest of Kalinga is remembered through the conqueror’s own public expression of grief, moral reflection, and the subsequent proclamation of Dhamma.',
    epistemicBannerTitle: 'Historical Methodology & Source Classification Protocol',
    epistemicBannerText: 'This documentary rigorously separates primary epigraphic testimony (Ashoka’s contemporary rock edicts carved in Prakrit Brahmi and Kharosthi scripts), modern archaeological findings in Odisha (Sisupalgarh, Dhauli, and Jaugada), and clearly labelled artistic or sculptural reconstructions created for visual explanation.',
    epistemicLegend: {
      inscriptionalTitle: '1. Direct Epigraphic Testimony',
      inscriptionalDesc: 'Statements explicitly recorded in Emperor Ashoka’s Major Rock Edict XIII and Separate Kalinga Edicts I & II (3rd century BCE).',
      scholarlyTitle: '2. Modern Scholarly & Archaeological Analysis',
      scholarlyDesc: 'Peer-reviewed historical interpretations, stratigraphic excavations at Sisupalgarh/Toshali and Samapa/Jaugada, and critical evaluation of ancient casualty figures.',
      artisticTitle: '3. Artistic & Sculptural Reconstructions',
      artisticDesc: 'Clearly labelled commemorative bas-reliefs and educational illustrations used to visualize ancient scenes without claiming to be contemporary photographs.'
    },
    quickSummary: {
      sectionTitle: 'F. Quick Historical Summary',
      conflictLabel: 'Conflict',
      conflictValue: 'Kalinga War',
      dateLabel: 'Approximate Date',
      dateValue: 'c. 261 BCE (8th Regnal Year of Emperor Ashoka)',
      rulerLabel: 'Mauryan Ruler',
      rulerValue: 'Emperor Ashoka (Devanampiya Piyadassi)',
      polityLabel: 'Opposing Polity',
      polityValue: 'Kalinga (Ancient coastal & riverine eastern India, largely present-day Odisha)',
      sourceLabel: 'Principal Historical Source',
      sourceValue: 'Major Rock Edict XIII & Separate Kalinga Rock Edicts I–II',
      sitesLabel: 'Important Inscription Sites',
      sitesValue: 'Dhauli (Khordha district) and Jaugada (Ganjam district), Odisha',
      significanceLabel: 'Historical Significance',
      significanceValue: 'Ashoka’s expressed remorse and subsequent emphasis on Dhamma, restraint, and public welfare'
    },
    sections: {
      background: {
        code: 'Section A',
        title: 'Historical Background: Ashoka, the Mauryan Empire, and Ancient Kalinga',
        subtitle: 'Geopolitical context of eastern India prior to c. 261 BCE',
        p1: 'Emperor Ashoka (r. c. 268–232 BCE), grandson of Chandragupta Maurya and son of Bindusara, inherited the vast Mauryan Empire headquartered at Pataliputra in Magadha. By the early third century BCE, Mauryan sovereignty extended across northern, western, and large parts of peninsular India. Yet the fertile eastern coastal region of Kalinga—corresponding largely to present-day Odisha and adjacent northern coastal tracts—remained an independent, prosperous polity.',
        p2: 'Ancient Kalinga occupied a vital strategic and economic corridor between the Gangetic plains and southern India. Watered by major river systems including the Mahanadi, Brahmani, Baitarani, Rushikulya, and Daya, Kalinga possessed fortified urban settlements (such as Sisupalgarh near modern Bhubaneswar, identified with ancient Toshali/Kalinganagara), thriving agricultural plains, forest elephant reserves, and busy maritime ports along the Bay of Bengal.',
        p3: 'In the eighth year after his coronation (commonly dated to c. 261 BCE), Emperor Ashoka launched a full-scale military campaign to annex Kalinga and integrate its strategic land and sea trade routes into the Mauryan Empire.',
        evidenceBoxTitle: 'Distinguishing Established Evidence from Later Tradition',
        evidenceBoxText: 'Established primary evidence for the war comes directly from Ashoka’s Major Rock Edict XIII and the Separate Kalinga Edicts at Dhauli and Jaugada. Contemporary inscriptions do not record the personal name of Kalinga’s ruler, specific troop numbers of the Kalinga army, or romanticized legends that appeared many centuries later in literary traditions.'
      },
      battle: {
        code: 'Section B',
        title: 'The Battle of Kalinga',
        subtitle: 'The military campaign and fierce resistance across the Kalinga heartland',
        p1: 'When Mauryan imperial forces advanced into Kalinga around c. 261 BCE, they encountered determined resistance from Kalinga’s defenders and populace. Although no contemporary inscription preserves a tactical battle map or the names of individual military commanders, the scale of the casualties reported by Ashoka himself attests to an extraordinarily intense and hard-fought conflict.',
        p2: 'The campaign exacted a severe toll across Kalinga’s fortified towns and rural settlements. Ancient Indian warfare involved massed infantry armed with bows, spears, shields, and broadswords, supported by war elephants and chariots. The fighting was not confined to professional soldiers alone; as Major Rock Edict XIII notes, the devastation swept through settled communities, affecting householders, scholars, ascetics, and ordinary families.',
        p3: 'By the end of the campaign, Kalinga was conquered and incorporated as a province of the Mauryan Empire with administrative centers established at Toshali (associated with Dhauli/Sisupalgarh) in the north and Samapa (Jaugada) in the south. Yet the military victory came at an unprecedented human cost that permanently altered the moral discourse of Ashoka’s reign.',
        historiographicalNote: 'Historiographical Caution: Popular accounts often place the final engagement on the banks of the Daya River below Dhauli Hills near Bhubaneswar. While Dhauli is an authenticated Ashokan edict site overlooking the Daya plain, primary inscriptions do not specify a single battlefield coordinate, nor do they name Kalinga generals.'
      },
      tragedy: {
        code: 'Section C',
        title: 'The Human Tragedy: Testimony of Major Rock Edict XIII',
        subtitle: 'Consequences of the war for the people of Kalinga as recorded by Ashoka’s inscription',
        p1: 'The most direct historical record of the suffering endured by Kalinga comes from Emperor Ashoka’s own words in Major Rock Edict XIII. Rather than boasting of royal invincibility, the inscription describes the devastation inflicted upon both combatants and innocent non-combatants, including Brahmins, Shramanas (ascetics), and householders who were devoted to elders, parents, and dependents.',
        edictHeading: 'Figures Reported in Ashoka’s Major Rock Edict XIII',
        edictAttribution: 'Attributed directly to the Prakrit text of Major Rock Edict XIII (preserved at Shahbazgarhi, Mansehra, Kalsi, Girnar, and Erragudi):',
        statDeathsNumber: '~100,000',
        statDeathsLabel: 'People slain during the military conflict, according to the inscription',
        statDeportedNumber: '~150,000',
        statDeportedLabel: 'People deported or carried away as captives, according to the inscription',
        statAftermathNumber: 'Many Times More',
        statAftermathLabel: 'Additional deaths thereafter from wounds, hunger, disease, and disruption, according to the inscription',
        methodologicalCaveat: 'Important Historical Context: Historians emphasize that these figures—100,000 slain, 150,000 deported, and many times that number dying afterward—are the numbers reported by Ashoka’s inscription to convey the magnitude of the catastrophe. They should be understood as ancient epigraphic statements rather than independently audited modern demographic statistics.'
      },
      remorse: {
        code: 'Section D',
        title: 'Ashoka’s Remorse and the Policy of Dhamma',
        subtitle: 'Moral reflection, public welfare, and the governance principles inscribed in stone',
        p1: 'In Major Rock Edict XIII, Ashoka states that the conquest of Kalinga filled him with deep remorse (anusochana) and weighed heavily upon his mind. He writes that even when people who have done no wrong suffer injury, death, or the deportation of their loved ones, that suffering is shared by all who care for them—and that even a hundredth or a thousandth part of the deaths and deportations in Kalinga would now be a source of profound sorrow to the Beloved of the Gods (Devanampiya).',
        p2: 'Following the conquest, Ashoka proclaimed his dedication to Dhamma (Prakrit for Dharma)—an ethical framework emphasizing non-injury (ahimsa), compassion toward living beings, truthfulness, respect for parents and teachers, generosity toward Brahmins and Shramanas, religious restraint, and public welfare. Across his realm, he commissioned rock and pillar inscriptions so his officers and subjects could read and practice these principles.',
        p3: 'Significantly, Ashoka did not engrave Major Rock Edict XIII—which recounted the slaughter of Kalinga—inside Kalinga itself. Instead, at Dhauli and Jaugada in Odisha, he replaced Rock Edicts XI, XII, and XIII with Two Separate Kalinga Rock Edicts addressed to his judicial officers (Mahamatras) at Toshali and Samapa, instructing them to govern without harshness or arbitrary imprisonment and declaring: "All men are my children" (Save munise paja mama).',
        scholarlyDebateNote: 'Scholarly Perspective: Modern historians note that while Ashoka’s remorse in Rock Edict XIII is a remarkable and genuine epigraphic document, the precise chronology of his personal Buddhist affiliation and the pragmatic political aspects of his governance remain subjects of thoughtful historical inquiry. For instance, while renouncing further wars of aggression, Ashoka retained Kalinga within the empire and warned forest tribes of his power should they transgress.'
      },
      legacy: {
        code: 'Section E',
        title: 'Historical Legacy: Dhauli, Jaugada, and the Memory of Kalinga',
        subtitle: 'Archaeological monuments in Odisha and the enduring lessons of peace',
        p1: 'The Kalinga War is widely recognized as a watershed moment in ancient history: a rare instance in which an absolute monarch at the height of military power publicly recorded the human suffering caused by his own victory and advocated conquest through righteousness (Dhammaghosha) rather than the war-drum (Bherighosha).',
        p2: 'In Odisha today, the tangible legacy of this era survives at two major Archaeological Survey of India (ASI) sites: Dhauli (on the banks of the Daya River near Bhubaneswar) and Jaugada (on the banks of the Rushikulya River in Ganjam district). At Dhauli, directly above the smoothed granite face bearing Ashoka’s Prakrit Brahmi edicts, Mauryan sculptors carved the forepart of an elephant emerging from the living rock—one of the earliest surviving monumental stone sculptures in eastern India.',
        p3: 'In subsequent centuries, following the decline of the Mauryan Empire, Kalinga reasserted its independent political and military sovereignty—most famously under Mahameghavahana Emperor Kharavela in the first century BCE (recorded in the Hathigumpha Inscription at Udayagiri), and in later medieval eras through the Eastern Ganga and Suryavamshi Gajapathi rulers of Odra Desha.',
        conclusionTitle: 'Enduring Lesson for Humanity',
        conclusionText: 'More than two millennia after c. 261 BCE, the stones of Dhauli and Jaugada remind visitors that the true measure of governance lies not in the devastation of war, but in restraint, empathy, social welfare, and reverence for human dignity.'
      }
    },
    scenesHeader: {
      badge: 'Visual Historical Narrative • Scenes 1 to 7',
      title: 'Scene-by-Scene Visual Storytelling of the Kalinga War',
      subtitle: 'Explore seven sequential historical scenes pairing archaeological monuments, epigraphic rock faces, and clearly labelled sculptural reconstructions.',
      viewDossierBtn: 'Open Full Scene Dossier & Epigraphic Notes',
      companionImageLabel: 'Companion Archival View',
      sourceAttributionLabel: 'Source & Attribution'
    },
    scenes: [
      {
        id: 'scene_1_ancient_kalinga',
        sceneNumber: 'Scene 1',
        title: 'Ancient Kalinga: Fortified Settlements & River Plains',
        visualTypeBadge: 'Archaeological Site Photograph (Sisupalgarh / Toshali)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_sisupalgarh_columns.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_sisupalgarh_ramparts.jpg',
        imageAlt: 'Monolithic laterite stone pillars of the ancient fortified city of Sisupalgarh near Bhubaneswar, Odisha, associated with ancient Kalinga.',
        secondaryImageAlt: 'Excavated laterite stone gateway and defensive ramparts of ancient Sisupalgarh fort in Odisha.',
        narrative: 'Prior to the Mauryan invasion of c. 261 BCE, ancient Kalinga was a thriving regional civilization in eastern India centered along the fertile coastal plains and river valleys of present-day Odisha. Archaeological excavations at Sisupalgarh (near modern Bhubaneswar, widely identified with ancient Kalinganagara and Mauryan Toshali) reveal a planned square fortified city enclosed by massive clay and laterite ramparts, eight monumental gateways, moats, and pillared public halls.',
        caption: 'Fig. 1A — Monolithic laterite pillars at Sisupalgarh (near Bhubaneswar, Odisha), an authenticated early historic fortified urban center of ancient Kalinga.',
        secondaryCaption: 'Fig. 1B — Excavated western defensive gateway and laterite masonry ramparts of Sisupalgarh (ASI Protected Monument).',
        attribution: 'Wikimedia Commons / Archaeological Survey of India site photographs (CC BY-SA 4.0).',
        historicalNote: 'Archaeological Evidence: Excavations conducted by B.B. Lal (1948) and subsequent teams demonstrate that Sisupalgarh was a major fortified urban settlement with sophisticated water management and rectilinear street planning.'
      },
      {
        id: 'scene_2_mauryan_campaign',
        sceneNumber: 'Scene 2',
        title: 'The Mauryan Campaign Toward Kalinga',
        visualTypeBadge: 'Sculptural Historical Reconstruction & Campaign Geography',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_mauryan_procession_relief.jpg',
        secondaryImageUrl: '/assets/archive/odra_kalinga_map.jpg',
        imageAlt: 'Stone bas-relief carving at Dhauli depicting an ancient Indian royal military procession with horse-drawn chariot and foot soldiers.',
        secondaryImageAlt: 'Historical geographic map showing the territory of Kalinga along the eastern coast of India.',
        narrative: 'In the eighth year of his reign (c. 261 BCE), Emperor Ashoka mobilized the Mauryan imperial army to bring independent Kalinga under Magadhan rule. Moving southward and eastward along ancient arterial routes into the Mahanadi and Daya river basins, the Mauryan expedition comprised infantry armed with bamboo longbows, spears, and shields, alongside cavalry, wooden chariots, and war elephants.',
        caption: 'Fig. 2A — Narrative stone relief at Dhauli Shanti Stupa illustrating an ancient royal chariot and military retinue advancing from a fortified city (Artistic/Sculptural Reconstruction, not a contemporary 3rd-century BCE portrait).',
        secondaryCaption: 'Fig. 2B — Historical map illustrating the strategic position of Kalinga along the eastern seaboard between the Gangetic heartland and the Deccan.',
        attribution: 'Wikimedia Commons — Dhauli Shanti Stupa relief photograph (CC BY-SA 4.0) & Historical Cartographic Archive.',
        historicalNote: 'Historical Context: While classical writers like Pliny and Megasthenes described the large standing forces of the Mauryan Empire, Ashoka’s inscriptions themselves do not list the exact troop count deployed in the march on Kalinga.'
      },
      {
        id: 'scene_3_the_battle',
        sceneNumber: 'Scene 3',
        title: 'The Battle: Clash of Armies in Kalinga',
        visualTypeBadge: 'Commemorative Bas-Relief Reconstruction & Daya River Plain',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_war_buddhavanam_relief.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'Modern sculptural relief panel depicting the Battle of Kalinga with war elephants, shields, spears, and opposing ancient Indian warriors.',
        secondaryImageAlt: 'Panoramic view of the Daya River plains seen from Dhauli Hills in Odisha, traditionally associated with the Kalinga War.',
        narrative: 'The military confrontation in Kalinga was fierce and destructive. Defenders of Kalinga resisted the Mauryan advance across fortified settlements and river plains. Without resorting to graphic sensationalism, historical sources underscore the vast scale and confusion of the conflict, in which war elephants, chariots, and close-quarter infantry formations collided with devastating losses on both sides.',
        caption: 'Fig. 3A — Commemorative sculptural relief ("King Asoka’s Kalinga War", Buddhavanam Stupa Drum Relief) depicting war elephants and infantry in ancient combat. Clearly labelled as a modern artistic sculpture, not a contemporary battle record.',
        secondaryCaption: 'Fig. 3B — The tranquil plains of the Daya River viewed from Dhauli Hills near Bhubaneswar, Odisha—traditionally remembered as the landscape of the conflict.',
        attribution: 'Wikimedia Commons — Photograph by Anandajoti Bhikkhu (CC BY-SA 4.0) & Daya River view from Dhauli Hills (CC BY-SA 3.0).',
        historicalNote: 'Epistemic Note: Primary inscriptions do not record specific battlefield formations, individual duels, or named Kalinga generals. Visual reliefs serve as educational representations of ancient Indian warfare.'
      },
      {
        id: 'scene_4_human_cost',
        sceneNumber: 'Scene 4',
        title: 'The Human Cost: Suffering, Displacement & Loss',
        visualTypeBadge: 'Commemorative Relief at Dhauli Hills (Artistic Reconstruction)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'White stone relief carving at Dhauli Shanti Stupa depicting the human tragedy of the Kalinga War, showing grieving survivors and fallen figures.',
        secondaryImageAlt: 'View of the Daya River valley in Odisha where the aftermath of the Kalinga campaign unfolded.',
        narrative: 'Major Rock Edict XIII provides a sobering account of the human tragedy that followed the fighting. According to Ashoka’s inscription, approximately 100,000 people were slain, 150,000 were carried away or displaced from their homes, and many times that number perished afterward. Entire families were separated, and peaceful householders, scholars, and ascetics suffered profound bereavement.',
        caption: 'Fig. 4A — Sculptural panel at Dhauli Shanti Stupa, Bhubaneswar, portraying the human tragedy of the Kalinga War and the sorrow of survivors (20th-century commemorative relief; artistic reconstruction).',
        secondaryCaption: 'Fig. 4B — The Daya River floodplain below Dhauli Giri, where the inscription of Ashoka was later engraved to address the province of Toshali.',
        attribution: 'Wikimedia Commons — Dhauli Shanti Stupa Lower Panel 7 (CC BY-SA 4.0).',
        historicalNote: 'Source Attribution: The figures of 100,000 slain and 150,000 deported are reported directly in Ashoka’s Major Rock Edict XIII and represent the emperor’s own epigraphic statement of the war’s toll.'
      },
      {
        id: 'scene_5_ashoka_remorse',
        sceneNumber: 'Scene 5',
        title: 'Ashoka’s Remorse: Contemplating the Consequences of War',
        visualTypeBadge: 'Artistic & Sculptural Reconstruction (Dhauli Hills)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_ashoka_remorse_sword_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        imageAlt: 'Sculptural relief at Dhauli Shanti Stupa depicting Emperor Ashoka bowing in remorse and relinquishing his royal sword before the Buddha.',
        secondaryImageAlt: 'Relief carving at Dhauli showing Ashoka standing with his hand raised in grief beside an Ashokan pillar.',
        narrative: 'Confronted with the immense suffering of Kalinga, Ashoka expressed deep remorse (anusochana). In Rock Edict XIII, he declared that the slaughter, death, and deportation of the people weighed heavily on his mind, leading him to turn toward Dhamma—moral restraint, non-injury, and compassion—and to value conquest through righteousness (Dhammaghosha) above military might.',
        caption: 'Fig. 5A — Commemorative relief at Dhauli Shanti Stupa showing Emperor Ashoka bowing in remorse and offering up his sword of war (Artistic reconstruction symbolizing his renunciation of military conquest, not an authenticated historical portrait).',
        secondaryCaption: 'Fig. 5B — Companion Dhauli relief depicting Ashoka’s sorrowful contemplation over the casualties of Kalinga.',
        attribution: 'Wikimedia Commons — Dhauli Shanti Stupa Panel 9 & Panel 7 (CC BY-SA 4.0).',
        historicalNote: 'Historical Nuance: While later Buddhist narratives dramatize an instant battlefield conversion, historians note from Ashoka’s own edicts that his deepening commitment to Buddhism and Dhamma unfolded progressively over the years following the war.'
      },
      {
        id: 'scene_6_ashokan_rock_edicts',
        sceneNumber: 'Scene 6',
        title: 'Ashokan Rock Edicts at Dhauli and Jaugada',
        visualTypeBadge: 'Authentic 3rd-Century BCE Epigraphic Photographs (Odisha)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_rock_edicts.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_jaugada_rock_edict.jpg',
        imageAlt: 'Authentic close-up photograph of the 3rd-century BCE Ashokan Rock Edict engraved in Prakrit Brahmi script on the granite rock at Dhauli, Odisha.',
        secondaryImageAlt: 'Authentic photograph of the Ashokan Major Rock Edict cliff face at Jaugada in Ganjam district, Odisha.',
        narrative: 'At Dhauli (near Bhubaneswar) and Jaugada (in Ganjam district), Emperor Ashoka had his edicts engraved directly onto natural rock outcrops in Prakrit using the early Brahmi script. Recognizing the sensitivity of the newly conquered populace, Ashoka omitted Rock Edict XIII in Kalinga and instead inscribed the Two Separate Kalinga Edicts, instructing his administrators at Toshali and Samapa to act as impartial, compassionate guardians and proclaiming: "All men are my children."',
        caption: 'Fig. 6A — Authentic photograph of the Ashokan Rock Edicts carved in 3rd-century BCE Brahmi script on the granite brow at Dhauli, Khordha district, Odisha (ASI Protected Monument).',
        secondaryCaption: 'Fig. 6B — Authentic photograph of the Ashokan Rock Edict rock face at Jaugada (ancient Samapa), Ganjam district, Odisha (ASI Protected Monument).',
        attribution: 'Wikimedia Commons — Photographs of ASI Monuments N-OR-59 (Dhauli) and Jaugada Rock Inscription (CC BY-SA 4.0 / Public Domain).',
        historicalNote: 'Primary Epigraphic Proof: First deciphered in the 1830s by James Prinsep, the Dhauli and Jaugada inscriptions remain the oldest surviving dated written monuments in Odisha.'
      },
      {
        id: 'scene_7_message_of_peace',
        sceneNumber: 'Scene 7',
        title: 'The Message of Peace: The Dhauli Rock-Cut Elephant & Dhamma',
        visualTypeBadge: 'Authentic Mauryan Sculpture (c. 261–250 BCE) & Peace Monument',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_elephant_edict.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_dhauli_shanti_stupa.jpg',
        imageAlt: 'The 3rd-century BCE Mauryan rock-cut elephant sculpture emerging from the living rock directly above the Ashokan edicts at Dhauli, Odisha.',
        secondaryImageAlt: 'The white dome of the Dhauli Shanti Stupa (Peace Pagoda) atop Dhauli Giri hill near Bhubaneswar, Odisha.',
        narrative: 'Directly above the inscribed edicts at Dhauli stands the famous 3rd-century BCE Mauryan Rock-Cut Elephant—carved out of the living rock to symbolize the Buddha, serenity, and the dawn of peace over the former battlefield. Ashoka’s edicts record practical welfare measures instituted across his realm: planting banyan and mango groves along roads, digging wells at regular intervals, building rest houses for travelers, and establishing medical care for both humans and animals.',
        caption: 'Fig. 7A — The 3rd-century BCE Mauryan Rock-Cut Elephant directly above the Ashokan Rock Edicts at Dhauli, Odisha—the earliest surviving Buddhist stone sculpture in Odisha.',
        secondaryCaption: 'Fig. 7B — The modern Shanti Stupa (Peace Pagoda) atop Dhauli Hills, built in 1972 by the Japan Buddha Sangha and Kalinga Nippon Buddha Sangha to commemorate peace and compassion.',
        attribution: 'Wikimedia Commons — Dhauli Elephant Statue (CC BY-SA 4.0) & Shanti Stupa, Dhauli (CC BY-SA 3.0).',
        historicalNote: 'Enduring Heritage: At the base of the Dhauli rock edict, the Prakrit inscription concludes with the word "Seto" ("The White One"), referring to the sculpted elephant as a symbol of the Buddha.'
      }
    ],
    referencesHeader: {
      badge: 'Verified Sources & Further Reading',
      title: 'Primary Epigraphic Editions, Archaeological Reports & Scholarly Works',
      subtitle: 'Authoritative academic translations, Archaeological Survey of India publications, and museum archives documenting the Kalinga War and Ashokan inscriptions.',
      visitSourceBtn: 'Open Source / Reference Archive'
    },
    references: [
      {
        id: 'ref_hultzsch_cii',
        title: 'Corpus Inscriptionum Indicarum, Vol. I: Inscriptions of Asoka (New Edition)',
        authorOrAuthority: 'Eugen Hultzsch (Archaeological Survey of India / Clarendon Press, Oxford, 1925)',
        category: 'epigraphic_primary',
        categoryLabel: 'Primary Epigraphic Edition',
        description: 'The foundational critical edition containing the original Prakrit texts, Roman transliterations, and English translations of Major Rock Edict XIII and the Separate Kalinga Edicts at Dhauli and Jaugada.',
        url: 'https://archive.org/details/in.ernet.dli.2015.49403'
      },
      {
        id: 'ref_asi_dhauli_jaugada',
        title: 'Archaeological Survey of India (ASI) — Dhauli Rock Edict & Jaugada Monument Records',
        authorOrAuthority: 'Archaeological Survey of India, Bhubaneswar Circle, Ministry of Culture, Govt. of India',
        category: 'archaeological_survey',
        categoryLabel: 'Official Archaeological Record',
        description: 'Official monument documentation of the Ashokan Rock Edicts and forepart of the sculpted elephant at Dhauli (Khordha district) and the fortified site of Jaugada (Ganjam district) in Odisha.',
        url: 'https://asi.nic.in/'
      },
      {
        id: 'ref_thapar_ashoka',
        title: 'Aśoka and the Decline of the Mauryas',
        authorOrAuthority: 'Romila Thapar (Oxford University Press)',
        category: 'scholarly_translation',
        categoryLabel: 'Modern Scholarly Monograph',
        description: 'Comprehensive historical analysis of Ashoka’s reign, the geopolitical causes of the Kalinga campaign (c. 261 BCE), the interpretation of Major Rock Edict XIII, and the administrative policy of Dhamma.',
        url: 'https://global.oup.com/academic/product/asoka-and-the-decline-of-the-mauryas-9780198077244'
      },
      {
        id: 'ref_lahiri_ashoka',
        title: 'Ashoka in Ancient India',
        authorOrAuthority: 'Nayanjot Lahiri (Harvard University Press, 2015)',
        category: 'scholarly_translation',
        categoryLabel: 'Archaeological & Historical Study',
        description: 'Examines the archaeology of Mauryan India, the landscape of ancient Kalinga (Sisupalgarh/Toshali and Jaugada/Samapa), and why Ashoka omitted Rock Edict XIII inside Kalinga in favor of the Separate Edicts.',
        url: 'https://www.hup.harvard.edu/books/9780674057777'
      },
      {
        id: 'ref_lal_sisupalgarh',
        title: 'Sisupalgarh 1948: An Early Historical Fort in Eastern India (Ancient India, No. 5)',
        authorOrAuthority: 'B.B. Lal (Archaeological Survey of India, 1949)',
        category: 'archaeological_survey',
        categoryLabel: 'Archaeological Excavation Report',
        description: 'Seminal archaeological report documenting the fortified urban layout, laterite gateways, and defense ramparts of Sisupalgarh near Bhubaneswar, Odisha.',
        url: 'https://asi.nic.in/ancient-india/'
      },
      {
        id: 'ref_sircar_inscriptions',
        title: 'Inscriptions of Asoka & Select Inscriptions Bearing on Indian History and Civilization',
        authorOrAuthority: 'D.C. Sircar (Publications Division, Govt. of India / University of Calcutta)',
        category: 'epigraphic_primary',
        categoryLabel: 'Epigraphic Translation & Commentary',
        description: 'Accessible scholarly translation and philological commentary on Ashoka’s rock and pillar edicts, clarifying the Prakrit terminology of remorse (anusochana) and Dhamma.',
        url: 'https://archive.org/details/in.ernet.dli.2015.532669'
      }
    ],
    relatedLinks: {
      heading: 'Explore Connected Archival Pages in This Portal',
      odraDesha: 'Odra Desha & Ancient Kalinga Geography',
      inscriptions: 'Epigraphic Inscriptions & Copper Plates',
      gajapathiKings: 'Suryavamshi Gajapathi Kings of Odisha',
      timeline: 'Complete Historical Timeline'
    }
  },

  // ============================================================================
  // 2. HINDI (hi)
  // ============================================================================
  hi: {
    badge: 'प्राचीन कलिंग शिलालेख एवं ऐतिहासिक वृत्तचित्र • लगभग 261 ईसा पूर्व',
    pageTitle: 'कलिंग युद्ध: सम्राट अशोक और कलिंग — इतिहास का एक निर्णायक मोड़',
    subtitle: 'कलिंग के विरुद्ध मौर्य अभियान, तेरहवें वृहद शिलालेख में दर्ज मानवीय त्रासदी, तथा ओडिशा के धौली और जौगड़ शिलालेखों की ऐतिहासिक विरासत का प्रामाणिक अध्ययन।',
    introParagraph: 'सम्राट अशोक के राज्याभिषेक के आठवें वर्ष (लगभग 261 ईसा पूर्व) में लड़ा गया कलिंग युद्ध प्राचीन विश्व के सबसे महत्वपूर्ण संघर्षों में से एक है। प्राचीन काल के अन्य युद्धों के विपरीत—जहाँ राजकीय शिलालेख केवल विजय का गुणगान करते थे—कलिंग युद्ध को स्वयं विजेता सम्राट द्वारा पत्थर पर उत्कीर्ण कराए गए गहरे पश्चाताप, आत्ममंथन और धम्म के संदेश के लिए याद किया जाता है।',
    epistemicBannerTitle: 'ऐतिहासिक कार्यप्रणाली एवं स्रोत वर्गीकरण मानक',
    epistemicBannerText: 'यह ऐतिहासिक पृष्ठ प्राथमिक शिलालेखीय साक्ष्य (प्राकृत भाषा एवं ब्राह्मी/खरोष्ठी लिपि में उत्कीर्ण सम्राट अशोक के समकालीन शिलालेख), ओडिशा के पुरातात्विक प्रमाण (शिशुपालगढ़, धौली और जौगड़), तथा दृश्य समझ के लिए प्रयुक्त स्पष्ट रूप से चिह्नित कलात्मक/मूर्तिकला पुनर्निर्माणों के बीच स्पष्ट अंतर रखता है।',
    epistemicLegend: {
      inscriptionalTitle: '1. प्रत्यक्ष शिलालेखीय साक्ष्य',
      inscriptionalDesc: 'सम्राट अशोक के तेरहवें वृहद शिलालेख तथा प्रथम एवं द्वितीय पृथक कलिंग शिलालेख (तीसरी शताब्दी ईसा पूर्व) में सीधे दर्ज विवरण।',
      scholarlyTitle: '2. आधुनिक ऐतिहासिक एवं पुरातात्विक विश्लेषण',
      scholarlyDesc: 'शिशुपालगढ़/तोशाली और समापा/जौगड़ के पुरातात्विक उत्खनन तथा इतिहासकारों द्वारा प्राचीन हताहत संख्याओं का समीक्षात्मक मूल्यांकन।',
      artisticTitle: '3. कलात्मक एवं मूर्तिकला पुनर्निर्माण',
      artisticDesc: 'ऐतिहासिक घटनाओं को समझाने के लिए उपयोग किए गए स्मारक उभार-शिल्प (रिलीफ) और चित्र, जिन्हें समकालीन छायाचित्र होने का दावा किए बिना स्पष्ट रूप से चिह्नित किया गया है।'
    },
    quickSummary: {
      sectionTitle: 'F. संक्षिप्त ऐतिहासिक सारांश',
      conflictLabel: 'संघर्ष',
      conflictValue: 'कलिंग युद्ध',
      dateLabel: 'अनुमानित तिथि',
      dateValue: 'लगभग 261 ईसा पूर्व (सम्राट अशोक के राज्याभिषेक का 8वाँ वर्ष)',
      rulerLabel: 'मौर्य शासक',
      rulerValue: 'सम्राट अशोक (देवानाంప्रिय प्रियदर्शी)',
      polityLabel: 'प्रतिद्वंद्वी राज्य',
      polityValue: 'कलिंग (प्राचीन पूर्वी भारत का तटीय एवं नदी-घाटी क्षेत्र, मुख्यतः वर्तमान ओडिशा)',
      sourceLabel: 'प्रमुख ऐतिहासिक स्रोत',
      sourceValue: 'वृहद शिलालेख XIII (तेरहवाँ शिलालेख) एवं पृथक कलिंग शिलालेख I–II',
      sitesLabel: 'प्रमुख शिलालेख स्थल',
      sitesValue: 'धौली (खोर्धा जिला) और जौगड़ (गंजाम जिला), ओडिशा',
      significanceLabel: 'ऐतिहासिक महत्व',
      significanceValue: 'अशोक द्वारा व्यक्त गहरा पश्चाताप तथा तत्पश्चात धम्म, संयम और लोक-कल्याण पर बल'
    },
    sections: {
      background: {
        code: 'अनुभाग A',
        title: 'ऐतिहासिक पृष्ठभूमि: सम्राट अशोक, मौर्य साम्राज्य और प्राचीन कलिंग',
        subtitle: 'लगभग 261 ईसा पूर्व से पहले पूर्वी भारत की भू-राजनीतिक स्थिति',
        p1: 'चंद्रगुप्त मौर्य के पौत्र और बिंदुसार के पुत्र सम्राट अशोक (शासनकाल लगभग 268–232 ईसा पूर्व) को पाटलिपुत्र (मगध) से संचालित विशाल मौर्य साम्राज्य विरासत में मिला। तीसरी शताब्दी ईसा पूर्व के प्रारंभ तक मौर्य साम्राज्य उत्तर, पश्चिम और दक्षिण भारत के बड़े हिस्से में फैल चुका था, किंतु पूर्वी तट पर स्थित समृद्ध कलिंग राज्य—जो मुख्य रूप से वर्तमान ओडिशा से जुड़ा क्षेत्र था—एक स्वतंत्र शक्ति के रूप में कायम था।',
        p2: 'प्राचीन कलिंग गंगा के मैदानों और दक्षिणी प्रायद्वीप के बीच अत्यंत महत्वपूर्ण व्यापारिक और समुद्री मार्गों पर स्थित था। महानदी, ब्राह्मणी, वैतरणी, रुशिकुल्या और दया जैसी नदियों से सिंचित कलिंग में सुदृढ़ दुर्ग-नगर (जैसे भुवनेश्वर के पास शिशुपालगढ़, जिसकी पहचान प्राचीन तोशाली/कलिंगनगर से की जाती है), समृद्ध कृषि भूमि, हाथियों के वन और बंगाल की खाड़ी के बंदरगाह मौजूद थे।',
        p3: 'अपने राज्याभिषेक के आठवें वर्ष (लगभग 261 ईसा पूर्व) में सम्राट अशोक ने कलिंग को मौर्य साम्राज्य में मिलाने और उसके सामरिक स्थल व समुद्री मार्गों पर नियंत्रण स्थापित करने के लिए एक विशाल सैन्य अभियान चलाया।',
        evidenceBoxTitle: 'स्थापित ऐतिहासिक साक्ष्य बनाम परवर्ती परंपराएं',
        evidenceBoxText: 'कलिंग युद्ध का प्राथमिक एवं समकालीन प्रमाण सीधे अशोक के तेरहवें वृहद शिलालेख तथा धौली और जौगड़ के पृथक शिलालेखों से मिलता है। समकालीन शिलालेखों में कलिंग के तत्कालीन राजा का व्यक्तिगत नाम या सेनापतियों के नाम दर्ज नहीं हैं; बाद की शताब्दियों की साहित्यिक कथाओं को शिलालेखीय तथ्यों से अलग देखा जाना चाहिए।'
      },
      battle: {
        code: 'अनुभाग B',
        title: 'कलिंग का युद्ध',
        subtitle: 'सैन्य अभियान और कलिंग का भीषण प्रतिरोध',
        p1: 'जब लगभग 261 ईसा पूर्व में मौर्य सेना ने कलिंग में प्रवेश किया, तो उसे कलिंग के सैनिकों और नागरिकों के प्रबल प्रतिरोध का सामना करना पड़ा। यद्यपि किसी समकालीन शिलालेख में युद्ध की व्यूह-रचना या किसी सेनापति का नाम दर्ज नहीं है, तथापि स्वयं अशोक द्वारा वर्णित हताहतों की विशाल संख्या यह प्रमाणित करती है कि यह संघर्ष अत्यंत भीषण था।',
        p2: 'इस सैन्य अभियान ने कलिंग के दुर्ग-नगरों और ग्रामीण क्षेत्रों में भारी तबाही मचाई। प्राचीन भारतीय युद्धों में धनुष, भाले, ढाल और तलवारों से सुसज्जित पैदल सेना, रथ और युद्ध-हाथी शामिल होते थे। तेरहवें शिलालेख के अनुसार, इस युद्ध की पीड़ा केवल सैनिकों तक सीमित नहीं रही, बल्कि गृहस्थों, विद्वानों, ब्राह्मणों, श्रमणों और सामान्य परिवारों को भी इसका भीषण आघात सहना पड़ा।',
        p3: 'युद्ध के अंत में कलिंग को जीतकर मौर्य साम्राज्य के एक प्रांत के रूप में शामिल कर लिया गया, जिसके प्रशासनिक केंद्र उत्तर में तोशाली (धौली/शिशुपालगढ़) और दक्षिण में समापा (जौगड़) बनाए गए। किंतु इस सैन्य विजय की मानवीय कीमत इतनी भयावह थी कि इसने सम्राट अशोक के शासन की दिशा को सदा के लिए बदल दिया।',
        historiographicalNote: 'इतिहासलेखन संबंधी सावधानी: लोक-परंपराओं में प्रायः भुवनेश्वर के पास धौली पहाड़ी के नीचे दया नदी के तट को मुख्य युद्धस्थल माना जाता है। यद्यपि धौली एक प्रामाणिक अशोककालीन शिलालेख स्थल है, फिर भी मूल शिलालेखों में किसी एक निश्चित युद्ध-बिंदु या काल्पनिक संवादों का उल्लेख नहीं है।'
      },
      tragedy: {
        code: 'अनुभाग C',
        title: 'मानवीय त्रासदी: तेरहवें वृहद शिलालेख का साक्ष्य',
        subtitle: 'अशोक के शिलालेख के अनुसार कलिंग के लोगों पर युद्ध के परिणाम',
        p1: 'कलिंग के लोगों द्वारा झेली गई पीड़ा का सबसे प्रत्यक्ष ऐतिहासिक प्रमाण स्वयं सम्राट अशोक के तेरहवें वृहद शिलालेख (Major Rock Edict XIII) में मिलता है। अपनी सैन्य शक्ति का दंभ भरने के बजाय, अशोक ने इस शिलालेख में युद्ध से हुई मार-काट, मृत्यु और विस्थापन का अत्यंत संवेदनशील वर्णन किया है।',
        edictHeading: 'अशोक के तेरहवें वृहद शिलालेख में उल्लिखित आँकड़े',
        edictAttribution: 'तेरहवें वृहद शिलालेख के प्राकृत मूल पाठ (शाहबाजगढ़ी, मानसेहरा, कालसी, गिरनार और एर्रागुडी में सुरक्षित) के अनुसार:',
        statDeathsNumber: '~1,00,000',
        statDeathsLabel: 'शिलालेख के अनुसार युद्ध में मारे गए लोगों की अनुमानित संख्या',
        statDeportedNumber: '~1,50,000',
        statDeportedLabel: 'शिलालेख के अनुसार बंदी बनाए गए या निर्वासित किए गए लोगों की संख्या',
        statAftermathNumber: 'इससे कई गुना अधिक',
        statAftermathLabel: 'शिलालेख के अनुसार युद्ध के बाद घावों, अकाल और महामारी से हुई अतिरिक्त मौतें',
        methodologicalCaveat: 'महत्वपूर्ण ऐतिहासिक संदर्भ: इतिहासकार स्पष्ट करते हैं कि 1,00,000 मृतकों और 1,50,000 निर्वासितों के ये आँकड़े सम्राट अशोक के शिलालेख द्वारा युद्ध की भयावहता को दर्शाने के लिए दर्ज किए गए हैं। इन्हें आधुनिक स्वतंत्र जनगणना के आँकड़ों के रूप में नहीं, बल्कि प्राचीन शिलालेखीय साक्ष्य के रूप में समझा जाना चाहिए।'
      },
      remorse: {
        code: 'अनुभाग D',
        title: 'अशोक का पश्चाताप और धम्म की नीति',
        subtitle: 'आत्मग्लानि, लोक-कल्याण और शिलाओं पर उत्कीर्ण शासन के सिद्धांत',
        p1: 'तेरहवें वृहद शिलालेख में अशोक लिखते हैं कि कलिंग विजय के बाद उन्हें तीव्र पश्चाताप (अनुसोचन) हुआ। वे कहते हैं कि युद्ध में निर्दोष गृहस्थों, माता-पिता के भक्तों तथा ब्राह्मणों व श्रमणों को भी अपने प्रियजनों की मृत्यु और विछोह का दुख सहना पड़ता है—और कलिंग में जितने लोग मारे गए या निर्वासित हुए, उसका सौवाँ या हजारवाँ हिस्सा भी आज देवानाम्प्रिय के लिए अत्यंत दुखद होगा।',
        p2: 'इस त्रासदी के पश्चात अशोक ने "धम्म" (धर्म) के मार्ग पर बल दिया—जिसमें अहिंसा, जीवों के प्रति दया, सत्यवादिता, माता-पिता व गुरुजनों का आदर, सभी संप्रदायों के प्रति सहिष्णुता, संयम और लोक-कल्याण शामिल थे। उन्होंने अपने संदेशों को चट्टानों और स्तंभों पर उत्कीर्ण कराया ताकि अधिकारी और प्रजा दोनों इनका पालन कर सकें।',
        p3: 'विशेष रूप से, अशोक ने कलिंग की भूमि पर तेरहवाँ शिलालेख उत्कीर्ण नहीं कराया ताकि वहाँ के निवासियों के घाव हरे न हों। इसके स्थान पर ओडिशा के धौली और जौगड़ में उन्होंने दो "पृथक कलिंग शिलालेख" उत्कीर्ण कराए, जिनमें तोशाली और समापा के न्यायिक अधिकारियों (महामात्रों) को निष्पक्ष व करुणामय शासन का आदेश देते हुए घोषित किया: "सभी मनुष्य मेरी संतान हैं" (सवे मुनिसे पजा मम)।',
        scholarlyDebateNote: 'ऐतिहासिक विमर्श: आधुनिक इतिहासकार मानते हैं कि जहाँ शिलालेख XIII में अशोक का पश्चाताप एक अद्वितीय ऐतिहासिक दस्तावेज़ है, वहीं उनके व्यक्तिगत बौद्ध धर्म ग्रहण करने के सटीक समय और साम्राज्यिक राजनीति के व्यावहारिक पक्षों पर विद्वानों के बीच गंभीर चर्चा रही है।'
      },
      legacy: {
        code: 'अनुभाग E',
        title: 'ऐतिहासिक विरासत: धौली, जौगड़ और कलिंग की स्मृति',
        subtitle: 'ओडिशा के पुरातात्विक स्मारक और शांति व करुणा की शाश्वत सीख',
        p1: 'कलिंग युद्ध को विश्व इतिहास में एक युगांतरकारी मोड़ माना जाता है, क्योंकि सैन्य शक्ति के शिखर पर बैठे एक सम्राट ने सार्वजनिक रूप से अपनी ही विजय से उत्पन्न मानवीय पीड़ा पर शोक व्यक्त किया और रणभेरी (भेरीघोष) के स्थान पर धर्म-विजय (धम्मघोष) की नीति अपनाई।',
        p2: 'आज ओडिशा में इस युग की प्रत्यक्ष विरासत भारतीय पुरातत्व सर्वेक्षण (ASI) के दो प्रमुख स्थलों—धौली (भुवनेश्वर के पास दया नदी के तट पर) और जौगड़ (गंजाम जिले में रुशिकुल्या नदी के पास)—में सुरक्षित है। धौली में अशोक के शिलालेखों के ठीक ऊपर जीवित चट्टान को तराशकर बनाई गई हाथी की अग्रभाग की मूर्ति (तीसरी शताब्दी ईसा पूर्व) पूर्वी भारत की प्राचीनतम प्रस्तर कलाकृतियों में से एक है।',
        p3: 'आगे की शताब्दियों में मौर्य साम्राज्य के पतन के बाद कलिंग ने पुनः अपनी स्वतंत्र राजनीतिक और सैन्य शक्ति स्थापित की—विशेष रूप से प्रथम शताब्दी ईसा पूर्व में महामेघवाहन सम्राट खारवेल (हाथीगुम्फा शिलालेख) के अधीन, और बाद में मध्यकाल में पूर्वी गंग तथा सूर्यवंशी गजपति सम्राटों के शासनकाल में।',
        conclusionTitle: 'शांति और करुणा का संदेश',
        conclusionText: 'लगभग 261 ईसा पूर्व के दो हजार से अधिक वर्षों बाद भी धौली और जौगड़ के शिलालेख मानवता को यह शिक्षा देते हैं कि सच्ची महानता युद्ध के विनाश में नहीं, अपितु शांति, करुणा, संयम और जन-कल्याण में निहित है।'
      }
    },
    scenesHeader: {
      badge: 'दृश्य ऐतिहासिक कथा • दृश्य 1 से 7',
      title: 'कलिंग युद्ध की दृश्य-दर-दृश्य ऐतिहासिक प्रस्तुति',
      subtitle: 'पुरातात्विक स्मारकों, मूल अशोककालीन शिलालेखों और स्पष्ट रूप से चिह्नित मूर्तिकला पुनर्निर्माणों के माध्यम से सात ऐतिहासिक दृश्यों का अवलोकन करें।',
      viewDossierBtn: 'संपूर्ण दृश्य विवरण एवं संदर्भ खोलें',
      companionImageLabel: 'सहायक अभिलेखीय चित्र',
      sourceAttributionLabel: 'स्रोत एवं श्रेय'
    },
    scenes: [
      {
        id: 'scene_1_ancient_kalinga',
        sceneNumber: 'दृश्य 1',
        title: 'प्राचीन कलिंग: सुदृढ़ दुर्ग-नगर और नदी मैदान',
        visualTypeBadge: 'पुरातात्विक स्थल छायाचित्र (शिशुपालगढ़ / तोशाली)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_sisupalgarh_columns.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_sisupalgarh_ramparts.jpg',
        imageAlt: 'भुवनेश्वर, ओडिशा के पास प्राचीन शिशुपालगढ़ दुर्ग-नगर के एकाश्म लैटेराइट पाषाण स्तंभ।',
        secondaryImageAlt: 'ओडिशा के प्राचीन शिशुपालगढ़ किले के उत्खनित लैटेराइट द्वार और प्राचीर।',
        narrative: 'लगभग 261 ईसा पूर्व के मौर्य अभियान से पहले प्राचीन कलिंग पूर्वी भारत की एक समृद्ध सभ्यता थी। आधुनिक भुवनेश्वर के पास स्थित शिशुपालगढ़ (जिसकी पहचान प्राचीन कलिंगनगर और तोशाली से की जाती है) के पुरातात्विक उत्खनन से विशाल प्राचीर, आठ भव्य द्वारों, खाई और स्तंभयुक्त मंडपों वाले एक सुनियोजित प्राचीन नगर का पता चलता है।',
        caption: 'चित्र 1A — शिशुपालगढ़ (भुवनेश्वर, ओडिशा) के प्राचीन लैटेराइट स्तंभ, जो प्राचीन कलिंग के नगरीय स्थापत्य का प्रामाणिक पुरातात्विक प्रमाण हैं।',
        secondaryCaption: 'चित्र 1B — शिशुपालगढ़ दुर्ग का उत्खनित पश्चिमी प्रवेश द्वार और सुरक्षा प्राचीर (भारतीय पुरातत्व सर्वेक्षण संरक्षित स्मारक)।',
        attribution: 'विकिमीडिया कॉमन्स / भारतीय पुरातत्व सर्वेक्षण स्थल छायाचित्र (CC BY-SA 4.0)।',
        historicalNote: 'पुरातात्विक प्रमाण: 1948 में बी.बी. लाल द्वारा किए गए उत्खनन से सिद्ध हुआ कि शिशुपालगढ़ प्राचीन पूर्वी भारत का एक सुव्यवस्थित दुर्ग-नगर था।'
      },
      {
        id: 'scene_2_mauryan_campaign',
        sceneNumber: 'दृश्य 2',
        title: 'कलिंग की ओर मौर्य सैन्य अभियान',
        visualTypeBadge: 'मूर्तिकला ऐतिहासिक पुनर्निर्माण एवं अभियान भूगोल',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_mauryan_procession_relief.jpg',
        secondaryImageUrl: '/assets/archive/odra_kalinga_map.jpg',
        imageAlt: 'धौली में उत्कीर्ण पाषाण रिलीफ जिसमें प्राचीन भारतीय रथ, अश्व और पैदल सैनिकों का प्रस्थान दर्शाया गया है।',
        secondaryImageAlt: 'पूर्वी भारत के तट पर स्थित प्राचीन कलिंग क्षेत्र को दर्शाने वाला ऐतिहासिक मानचित्र।',
        narrative: 'अपने शासन के आठवें वर्ष (लगभग 261 ईसा पूर्व) में सम्राट अशोक ने स्वतंत्र कलिंग को मौर्य साम्राज्य के अधीन लाने के लिए विशाल सेना के साथ प्रस्थान किया। इस अभियान में धनुष, भाले व ढाल से लैस पैदल सैनिक, रथ और युद्ध-हाथी शामिल थे।',
        caption: 'चित्र 2A — धौली शांति स्तूप की पाषाण नक्काशी जिसमें दुर्ग से प्रस्थान करते प्राचीन राजकीय रथ और सैनिकों को दर्शाया गया है (कलात्मक/मूर्तिकला पुनर्निर्माण)।',
        secondaryCaption: 'चित्र 2B — गंगा के मैदान और दक्षिण भारत के बीच कलिंग की सामरिक स्थिति को दर्शाता ऐतिहासिक मानचित्र।',
        attribution: 'विकिमीडिया कॉमन्स — धौली शांति स्तूप रिलीफ छायाचित्र (CC BY-SA 4.0) एवं ऐतिहासिक मानचित्र अभिलेखागार।',
        historicalNote: 'ऐतिहासिक संदर्भ: अशोक के शिलालेखों में कलिंग अभियान में भेजी गई सेना की सटीक संख्या का उल्लेख नहीं है।'
      },
      {
        id: 'scene_3_the_battle',
        sceneNumber: 'दृश्य 3',
        title: 'कलिंग का युद्ध: सेनाओं का भीषण संघर्ष',
        visualTypeBadge: 'स्मारक उभार-शिल्प पुनर्निर्माण एवं दया नदी मैदान',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_war_buddhavanam_relief.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'युद्ध-हाथियों, ढालों, भालों और प्राचीन सैनिकों के साथ कलिंग युद्ध को दर्शाने वाला आधुनिक मूर्तिकला पैनल।',
        secondaryImageAlt: 'ओडिशा में धौली पहाड़ी से दिखने वाला दया नदी का मैदान, जिसे कलिंग युद्ध से जोड़ा जाता है।',
        narrative: 'कलिंग का सैन्य संघर्ष अत्यंत भीषण और विनाशकारी था। कलिंग के रक्षकों ने अपनी स्वतंत्रता के लिए डटकर मुकाबला किया। युद्ध-हाथियों, रथों और पैदल सेनाओं के इस टकराव में दोनों पक्षों को भारी क्षति उठानी पड़ी।',
        caption: 'चित्र 3A — कलिंग युद्ध में युद्ध-हाथियों और प्राचीन सैनिकों के संघर्ष को दर्शाता स्मारक शिल्प ("King Asoka’s Kalinga War", बुद्धवनम स्तूप रिलीफ — स्पष्ट रूप से कलात्मक पुनर्निर्माण के रूप में चिह्नित)।',
        secondaryCaption: 'चित्र 3B — भुवनेश्वर के पास धौली पहाड़ी से दया नदी के मैदान का दृश्य, जिसे परंपरा में कलिंग युद्ध की भूमि माना जाता है।',
        attribution: 'विकिमीडिया कॉमन्स — आनंदजोति भिक्खु द्वारा छायाचित्र (CC BY-SA 4.0) एवं दया नदी दृश्य (CC BY-SA 3.0)।',
        historicalNote: 'शैक्षणिक टिप्पणी: मूल शिलालेखों में किसी विशिष्ट व्यूह-रचना या कलिंग सेनापति के नाम का उल्लेख नहीं है; यह शिल्प प्राचीन युद्ध की गंभीरता को दर्शाने वाला कलात्मक चित्रण है।'
      },
      {
        id: 'scene_4_human_cost',
        sceneNumber: 'दृश्य 4',
        title: 'मानवीय मूल्य: विस्थापन, पीड़ा और जनहानि',
        visualTypeBadge: 'धौली पहाड़ी पर स्मारक शिल्प (कलात्मक पुनर्निर्माण)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'धौली शांति स्तूप का श्वेत पाषाण शिल्प जो कलिंग युद्ध की मानवीय त्रासदी और पीड़ित परिवारों के शोक को दर्शाता है।',
        secondaryImageAlt: 'धौली पहाड़ी के नीचे दया नदी घाटी का शांत दृश्य।',
        narrative: 'तेरहवें वृहद शिलालेख के अनुसार युद्ध में लगभग 1,00,000 लोग मारे गए, 1,50,000 लोग निर्वासित या बंदी बनाए गए, और उसके बाद कई गुना अधिक लोगों की मृत्यु हुई। असंख्य परिवार उजड़ गए और शांतिप्रिय नागरिकों को असहनीय पीड़ा झेलनी पड़ी।',
        caption: 'चित्र 4A — भुवनेश्वर के धौली शांति स्तूप में कलिंग युद्ध की मानवीय पीड़ा और हताहतों के शोक को दर्शाता शिल्प पैनल (बीसवीं शताब्दी का स्मारक कलात्मक पुनर्निर्माण)।',
        secondaryCaption: 'चित्र 4B — धौली गिरि के नीचे दया नदी का मैदानी क्षेत्र, जहाँ अशोक ने तोशाली प्रांत के लिए अपने शिलालेख उत्कीर्ण कराए।',
        attribution: 'विकिमीडिया कॉमन्स — धौली शांति स्तूप पैनल 7 (CC BY-SA 4.0)।',
        historicalNote: 'स्रोत श्रेय: 1,00,000 मृतकों और 1,50,000 निर्वासितों के आँकड़े सीधे सम्राट अशोक के तेरहवें वृहद शिलालेख से उद्धृत हैं।'
      },
      {
        id: 'scene_5_ashoka_remorse',
        sceneNumber: 'दृश्य 5',
        title: 'अशोक का पश्चाताप: युद्ध के परिणामों पर आत्ममंथन',
        visualTypeBadge: 'कलात्मक एवं मूर्तिकला पुनर्निर्माण (धौली गिरि)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_ashoka_remorse_sword_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        imageAlt: 'धौली शांति स्तूप का शिल्प जिसमें सम्राट अशोक पश्चाताप में झुककर युद्ध की तलवार त्यागते हुए दिखाए गए हैं।',
        secondaryImageAlt: 'धौली का शिल्प जिसमें अशोक स्तंभ के पास खड़े होकर युद्ध के विनाश पर शोक व्यक्त कर रहे हैं।',
        narrative: 'कलिंग के भीषण रक्तपात और दुख को देखकर सम्राट अशोक का हृदय ग्लानि और पश्चाताप से भर उठा। तेरहवें शिलालेख में उन्होंने स्पष्ट किया कि इस जनहानि ने उन्हें भीतर तक झकझोर दिया और उन्हें शस्त्र-विजय के स्थान पर धम्म-विजय (करुणा, अहिंसा और संयम) के मार्ग की ओर प्रेरित किया।',
        caption: 'चित्र 5A — धौली शांति स्तूप का स्मारक शिल्प जिसमें सम्राट अशोक को पश्चाताप में अपनी तलवार समर्पित करते दर्शाया गया है (यह एक प्रतीकात्मक कलात्मक पुनर्निर्माण है, समकालीन ऐतिहासिक चित्र नहीं)।',
        secondaryCaption: 'चित्र 5B — कलिंग के हताहतों को देखकर शोकमग्न अशोक का सहायक धौली शिल्प।',
        attribution: 'विकिमीडिया कॉमन्स — धौली शांति स्तूप पैनल 9 एवं पैनल 7 (CC BY-SA 4.0)।',
        historicalNote: 'ऐतिहासिक दृष्टिकोण: अशोक के अपने शिलालेखों से पता चलता है कि युद्ध के बाद धम्म और बौद्ध शिक्षाओं के प्रति उनकी निष्ठा क्रमिक रूप से गहरी होती गई।'
      },
      {
        id: 'scene_6_ashokan_rock_edicts',
        sceneNumber: 'दृश्य 6',
        title: 'धौली और जौगड़ के अशोककालीन शिलालेख',
        visualTypeBadge: 'तीसरी शताब्दी ईसा पूर्व के प्रामाणिक शिलालेख छायाचित्र (ओडिशा)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_rock_edicts.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_jaugada_rock_edict.jpg',
        imageAlt: 'ओडिशा के धौली में ग्रेनाइट चट्टान पर प्राकृत भाषा और ब्राह्मी लिपि में उत्कीर्ण अशोक के शिलालेख का प्रामाणिक छायाचित्र।',
        secondaryImageAlt: 'ओडिशा के गंजाम जिले में जौगड़ स्थित अशोक के वृहद शिलालेख की चट्टान का प्रामाणिक छायाचित्र।',
        narrative: 'ओडिशा के धौली (भुवनेश्वर के निकट) और जौगड़ (गंजाम जिले में) की चट्टानों पर सम्राट अशोक ने प्राकृत भाषा और ब्राह्मी लिपि में अपने शिलालेख खुदवाए। कलिंग के लोगों की भावनाओं का सम्मान करते हुए उन्होंने यहाँ दो "पृथक कलिंग शिलालेख" उत्कीर्ण कराए, जिनमें अधिकारियों को न्यायपूर्ण शासन का निर्देश देते हुए कहा गया: "सभी मनुष्य मेरी संतान हैं।"',
        caption: 'चित्र 6A — धौली (खोर्धा जिला, ओडिशा) की चट्टान पर तीसरी शताब्दी ईसा पूर्व की ब्राह्मी लिपि में उत्कीर्ण अशोक के शिलालेख का मूल छायाचित्र (ASI संरक्षित स्मारक)।',
        secondaryCaption: 'चित्र 6B — जौगड़ (प्राचीन समापा, गंजाम जिला, ओडिशा) में अशोक के शिलालेख वाली मूल चट्टान का छायाचित्र (ASI संरक्षित स्मारक)।',
        attribution: 'विकिमीडिया कॉमन्स — भारतीय पुरातत्व सर्वेक्षण स्मारक N-OR-59 (धौली) एवं जौगड़ शिलालेख छायाचित्र (CC BY-SA 4.0 / Public Domain)।',
        historicalNote: 'प्राथमिक शिलालेखीय प्रमाण: 1837 ईस्वी में जेम्स प्रिंसेप द्वारा पढ़े गए ये शिलालेख ओडिशा के प्राचीनतम लिखित ऐतिहासिक स्मारक हैं।'
      },
      {
        id: 'scene_7_message_of_peace',
        sceneNumber: 'दृश्य 7',
        title: 'शांति का संदेश: धौली का शैलकृत हाथी और धम्म कल्याण',
        visualTypeBadge: 'प्रामाणिक मौर्यकालीन पाषाण शिल्प (लगभग 261–250 ईसा पूर्व) एवं शांति स्तूप',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_elephant_edict.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_dhauli_shanti_stupa.jpg',
        imageAlt: 'धौली, ओडिशा में अशोक के शिलालेखों के ठीक ऊपर चट्टान को तराशकर बनाई गई तीसरी शताब्दी ईसा पूर्व की मौर्यकालीन हाथी की मूर्ति।',
        secondaryImageAlt: 'भुवनेश्वर के पास धौली गिरि पहाड़ी पर स्थित धौली शांति स्तूप का श्वेत गुंबद।',
        narrative: 'धौली के शिलालेखों के ठीक ऊपर जीवित चट्टान को तराशकर बनाया गया तीसरी शताब्दी ईसा पूर्व का मौर्यकालीन हाथी स्थित है, जो बुद्ध, करुणा और शांति के उदय का प्रतीक है। अशोक के शिलालेखों में युद्ध के बाद किए गए लोक-कल्याणकारी कार्यों का वर्णन है—सड़कों के किनारे छायादार वृक्ष लगाना, कुएँ खुदवाना, विश्रामगृह बनवाना तथा मनुष्यों व पशुओं के लिए चिकित्सा व्यवस्था करना।',
        caption: 'चित्र 7A — धौली (ओडिशा) में अशोक के शिलालेख के ऊपर स्थित तीसरी शताब्दी ईसा पूर्व का मौर्यकालीन शैलकृत हाथी—ओडिशा की प्राचीनतम पाषाण मूर्ति।',
        secondaryCaption: 'चित्र 7B — धौली पहाड़ी के शिखर पर स्थित आधुनिक शांति स्तूप (1972 में निर्मित), जो विश्व शांति और अहिंसा का संदेश देता है।',
        attribution: 'विकिमीडिया कॉमन्स — धौली हाथी प्रतिमा (CC BY-SA 4.0) एवं शांति स्तूप, धौली (CC BY-SA 3.0)।',
        historicalNote: 'शाश्वत धरोहर: धौली शिलालेख के अंत में प्राकृत शब्द "सेतो" (श्वेत गज) उत्कीर्ण है, जो बुद्ध और शांति का प्रतीक है।'
      }
    ],
    referencesHeader: {
      badge: 'प्रमाणित स्रोत एवं संदर्भ ग्रंथ',
      title: 'प्राथमिक शिलालेख संकलन, पुरातात्विक रिपोर्ट एवं ऐतिहासिक ग्रंथ',
      subtitle: 'कलिंग युद्ध तथा धौली और जौगड़ के शिलालेखों का दस्तावेज़ीकरण करने वाले प्रामाणिक अकादमिक अनुवाद और भारतीय पुरातत्व सर्वेक्षण के प्रकाशन।',
      visitSourceBtn: 'संदर्भ स्रोत खोलें'
    },
    references: [
      {
        id: 'ref_hultzsch_cii',
        title: 'Corpus Inscriptionum Indicarum, Vol. I: Inscriptions of Asoka',
        authorOrAuthority: 'यूजेन हुल्त्श (Eugen Hultzsch — भारतीय पुरातत्व सर्वेक्षण / ऑक्सफोर्ड, 1925)',
        category: 'epigraphic_primary',
        categoryLabel: 'प्राथमिक शिलालेख संस्करण',
        description: 'अशोक के तेरहवें वृहद शिलालेख तथा धौली और जौगड़ के पृथक कलिंग शिलालेखों के मूल प्राकृत पाठ, लिप्यंतरण और अनुवाद का प्रामाणिक संस्करण।',
        url: 'https://archive.org/details/in.ernet.dli.2015.49403'
      },
      {
        id: 'ref_asi_dhauli_jaugada',
        title: 'भारतीय पुरातत्व सर्वेक्षण (ASI) — धौली एवं जौगड़ शिलालेख स्मारक अभिलेख',
        authorOrAuthority: 'भारतीय पुरातत्व सर्वेक्षण, भुवनेश्वर मंडल, संस्कृति मंत्रालय, भारत सरकार',
        category: 'archaeological_survey',
        categoryLabel: 'आधिकारिक पुरातात्विक अभिलेख',
        description: 'ओडिशा के धौली (खोर्धा जिला) स्थित अशोक के शिलालेख व शैलकृत हाथी तथा जौगड़ (गंजाम जिला) के प्राचीन दुर्ग व शिलालेख का आधिकारिक विवरण।',
        url: 'https://asi.nic.in/'
      },
      {
        id: 'ref_thapar_ashoka',
        title: 'Aśoka and the Decline of the Mauryas',
        authorOrAuthority: 'रोमिला थापर (ऑक्सफोर्ड यूनिवर्सिटी प्रेस)',
        category: 'scholarly_translation',
        categoryLabel: 'आधुनिक ऐतिहासिक शोधग्रंथ',
        description: 'सम्राट अशोक के शासनकाल, कलिंग अभियान (लगभग 261 ईसा पूर्व) के कारणों, तेरहवें शिलालेख और धम्म की नीति का विस्तृत ऐतिहासिक विश्लेषण।',
        url: 'https://global.oup.com/academic/product/asoka-and-the-decline-of-the-mauryas-9780198077244'
      },
      {
        id: 'ref_lahiri_ashoka',
        title: 'Ashoka in Ancient India',
        authorOrAuthority: 'नयनजोत लाहिड़ी (हार्वर्ड यूनिवर्सिटी प्रेस, 2015)',
        category: 'scholarly_translation',
        categoryLabel: 'पुरातात्विक एवं ऐतिहासिक अध्ययन',
        description: 'मौर्यकालीन पुरातत्व, प्राचीन कलिंग (शिशुपालगढ़/तोशाली एवं जौगड़/समापा) के भूगोल और कलिंग में पृथक शिलालेखों के महत्व का गहन अध्ययन।',
        url: 'https://www.hup.harvard.edu/books/9780674057777'
      },
      {
        id: 'ref_lal_sisupalgarh',
        title: 'Sisupalgarh 1948: An Early Historical Fort in Eastern India (Ancient India, No. 5)',
        authorOrAuthority: 'बी.बी. लाल (भारतीय पुरातत्व सर्वेक्षण, 1949)',
        category: 'archaeological_survey',
        categoryLabel: 'पुरातात्विक उत्खनन रिपोर्ट',
        description: 'भुवनेश्वर के पास प्राचीन शिशुपालगढ़ दुर्ग-नगर के लैटेराइट द्वारों, प्राचीरों और नगरीय संरचना की प्रामाणिक उत्खनन रिपोर्ट।',
        url: 'https://asi.nic.in/ancient-india/'
      },
      {
        id: 'ref_sircar_inscriptions',
        title: 'Inscriptions of Asoka & Select Inscriptions',
        authorOrAuthority: 'डी.सी. सरकार (प्रकाशन विभाग, भारत सरकार / कलकत्ता विश्वविद्यालय)',
        category: 'epigraphic_primary',
        categoryLabel: 'शिलालेख अनुवाद एवं भाष्य',
        description: 'अशोक के शिलालेखों और स्तंभ-लेखों का प्रामाणिक अनुवाद एवं प्राकृत शब्दावली (अनुसोचन और धम्म) की व्याख्या।',
        url: 'https://archive.org/details/in.ernet.dli.2015.532669'
      }
    ],
    relatedLinks: {
      heading: 'इस पोर्टल के संबंधित ऐतिहासिक पृष्ठ देखें',
      odraDesha: 'ओड्र देश एवं प्राचीन कलिंग भूगोल',
      inscriptions: 'शिलालेख एवं ताम्रपत्र अभिलेख',
      gajapathiKings: 'ओडिशा के सूर्यवंशी गजपति सम्राट',
      timeline: 'संपूर्ण ऐतिहासिक कालक्रम'
    }
  },

  // ============================================================================
  // 3. TELUGU (te)
  // ============================================================================
  te: {
    badge: 'ప్రాచీన కళింగ శాసన & చారిత్రక డాక్యుమెంటరీ • సుమారు క్రీ.పూ. 261',
    pageTitle: 'కళింగ యుద్ధం: అశోకుడు మరియు కళింగ — చరిత్రలో ఒక కీలక మలుపు',
    subtitle: 'కళింగపై మౌర్య దండయాత్ర, పదమూడవ ప్రధాన శిలాశాసనంలో నమోదైన మానవ విషాదం మరియు ఒడిశాలోని ధౌలి, జౌగడ శాసనాల చారిత్రక వారసత్వంపై ఆధారాలతో కూడిన అధ్యయనం.',
    introParagraph: 'మౌర్య చక్రవర్తి అశోకుని పట్టాభిషేకం జరిగిన ఎనిమిదవ సంవత్సరంలో (సుమారు క్రీ.పూ. 261) జరిగిన కళింగ యుద్ధం ప్రాచీన ప్రపంచ చరిత్రలో అత్యంత ప్రభావవంతమైన సంఘటనలలో ఒకటి. కేవలం విజయాలను మాత్రమే కీర్తించే ఇతర ప్రాచీన శాసనాలకు భిన్నంగా, కళింగ యుద్ధం విజేత అయిన చక్రవర్తి స్వయంగా శిలలపై చెక్కించిన పశ్చాత్తాపం, ఆత్మపరిశీలన మరియు ధమ్మ (ధర్మ) ప్రకటన ద్వారా చరిత్రలో నిలిచిపోయింది.',
    epistemicBannerTitle: 'చారిత్రక పరిశోధనా విధానం & ఆధారాల వర్గీకరణ',
    epistemicBannerText: 'ఈ చారిత్రక వ్యాసం ప్రాథమిక శాసన ఆధారాలు (ప్రాకృత బ్రాహ్మీ, ఖరోష్ఠీ లిపులలో చెక్కబడిన అశోకుని సమకాలీన శిలాశాసనాలు), ఒడిశాలోని పురావస్తు ఆధారాలు (శిశుపాల్‌గఢ్, ధౌలి, జౌగడ), మరియు దృశ్య అవగాహన కోసం ఉపయోగించిన కళాత్మక/శిల్ప పునర్నిర్మాణాల మధ్య స్పష్టమైన వ్యత్యాసాన్ని పాటిస్తుంది.',
    epistemicLegend: {
      inscriptionalTitle: '1. ప్రత్యక్ష శిలాశాసన ఆధారాలు',
      inscriptionalDesc: 'అశోకుని 13వ ప్రధాన శిలాశాసనం మరియు ధౌలి, జౌగడలలోని ప్రత్యేక కళింగ శాసనాలలో (క్రీ.పూ. 3వ శతాబ్దం) నేరుగా నమోదైన వివరాలు.',
      scholarlyTitle: '2. ఆధునిక చారిత్రక & పురావస్తు విశ్లేషణ',
      scholarlyDesc: 'శిశుపాల్‌గఢ్/తోషాలి మరియు జౌగడ/సమాప తవ్వకాలు, అలాగే శాసన గణాంకాలపై ఆధునిక చరిత్రకారుల విమర్శనాత్మక పరిశీలన.',
      artisticTitle: '3. కళాత్మక & శిల్ప పునర్నిర్మాణాలు',
      artisticDesc: 'చారిత్రక సన్నివేశాలను వివరించడానికి ఉపయోగించిన స్మారక శిల్పాలు మరియు చిత్రాలు—వీటిని సమకాలీన ఛాయాచిత్రాలుగా కాకుండా కళాత్మక పునర్నిర్మాణాలుగా స్పష్టంగా గుర్తించడమైనది.'
    },
    quickSummary: {
      sectionTitle: 'F. సంక్షిప్త చారిత్రక సారాంశం',
      conflictLabel: 'యుద్ధం',
      conflictValue: 'కళింగ యుద్ధం',
      dateLabel: 'సుమారు కాలం',
      dateValue: 'సుమారు క్రీ.పూ. 261 (అశోకుని పట్టాభిషేకం జరిగిన 8వ సంవత్సరం)',
      rulerLabel: 'మౌర్య పాలకుడు',
      rulerValue: 'చక్రవర్తి అశోకుడు (దేవానాంప్రియ ప్రియదర్శి)',
      polityLabel: 'ఎదుర్కొన్న రాజ్యం',
      polityValue: 'కళింగ (ప్రాచీన తూర్పు భారత తీర మరియు నదీ లోయ ప్రాంతం, ప్రధానంగా నేటి ఒడిశా)',
      sourceLabel: 'ప్రధాన చారిత్రక ఆధారం',
      sourceValue: '13వ ప్రధాన శిలాశాసనం (Major Rock Edict XIII) & ప్రత్యేక కళింగ శాసనాలు I–II',
      sitesLabel: 'ముఖ్యమైన శాసన ప్రదేశాలు',
      sitesValue: 'ధౌలి (ఖోర్ధా జిల్లా) మరియు జౌగడ (గంజాం జిల్లా), ఒడిశా',
      significanceLabel: 'చారిత్రక ప్రాముఖ్యత',
      significanceValue: 'అశోకుడు వ్యక్తపరిచిన పశ్చాత్తాపం మరియు తదనంతరం ధమ్మం, సంయమనం, ప్రజా సంక్షేమంపై చూపిన శ్రద్ధ'
    },
    sections: {
      background: {
        code: 'విభాగం A',
        title: 'చారిత్రక నేపథ్యం: అశోకుడు, మౌర్య సామ్రాజ్యం మరియు ప్రాచీన కళింగ',
        subtitle: 'క్రీ.పూ. 261 కి ముందు తూర్పు భారతదేశ భౌగోళిక-రాజకీయ పరిస్థితి',
        p1: 'చంద్రగుప్త మౌర్యుని మనుమడు మరియు బిందుసారుని కుమారుడైన అశోక చక్రవర్తి (పాలన సుమారు క్రీ.పూ. 268–232) పాటలీపుత్రం (మగధ) రాజధానిగా గల విశాలమైన మౌర్య సామ్రాజ్యాన్ని వారసత్వంగా పొందాడు. క్రీ.పూ. 3వ శతాబ్దం ప్రారంభం నాటికి మౌర్య సామ్రాజ్యం ఉత్తర, పశ్చిమ మరియు దక్షిణ భారతదేశంలోని అధిక భాగాలకు విస్తరించింది. అయితే తూర్పు తీరంలోని సుసంపన్నమైన కళింగ ప్రాంతం—ప్రధానంగా నేటి ఒడిశా మరియు పరిసర ఉత్తర తీర ప్రాంతం—స్వతంత్ర రాజ్యంగా కొనసాగింది.',
        p2: 'గంగా మైదానాలకు మరియు దక్షిణ భారతదేశానికి మధ్యనున్న కీలకమైన వాణిజ్య, సముద్ర మార్గాలను ప్రాచీన కళింగ నియంత్రించేది. మహానది, బ్రాహ్మణి, వైతరణి, రుషికుల్య, దయా నదులచే సస్యశ్యామలమైన కళింగలో పటిష్టమైన కోట నగరాలు (నేటి భువనేశ్వర్ సమీపంలోని శిశుపాల్‌గఢ్ — ప్రాచీన తోషాలి/కళింగనగరం), గజ వనాలు మరియు బంగాళాఖాత రేవు పట్టణాలు ఉండేవి.',
        p3: 'తన పట్టాభిషేకం జరిగిన ఎనిమిదవ సంవత్సరంలో (సుమారు క్రీ.పూ. 261), కళింగను మౌర్య సామ్రాజ్యంలో విలీనం చేసుకోవడానికి అశోకుడు భారీ సైనిక దండయాత్రను ప్రారంభించాడు.',
        evidenceBoxTitle: 'చారిత్రక ఆధారాలు మరియు తర్వాతి కాలపు గాథల మధ్య వ్యత్యాసం',
        evidenceBoxText: 'కళింగ యుద్ధానికి సంబంధించిన ప్రాథమిక ఆధారాలు అశోకుని 13వ ప్రధాన శిలాశాసనం మరియు ధౌలి, జౌగడ శాసనాల నుండి నేరుగా లభిస్తాయి. సమకాలీన శాసనాలలో అప్పటి కళింగ రాజు పేరు గానీ, సేనానుల పేర్లు గానీ నమోదు కాలేదు.'
      },
      battle: {
        code: 'విభాగం B',
        title: 'కళింగ యుద్ధం',
        subtitle: 'సైనిక దండయాత్ర మరియు కళింగ ప్రజల తీవ్ర ప్రతిఘటన',
        p1: 'సుమారు క్రీ.పూ. 261లో మౌర్య సామ్రాజ్య సేనలు కళింగలోకి ప్రవేశించినప్పుడు, కళింగ యోధులు మరియు ప్రజల నుండి తీవ్రమైన ప్రతిఘటన ఎదురైంది. సమకాలీన శాసనాలలో నిర్దిష్ట యుద్ధ వ్యూహాలు లేదా సేనాధిపతుల పేర్లు లేకపోయినప్పటికీ, అశోకుడే స్వయంగా పేర్కొన్న భారీ ప్రాణనష్టం ఆ పోరాటం ఎంత భీకరంగా జరిగిందో తెలియజేస్తుంది.',
        p2: 'ఈ యుద్ధం కళింగలోని కోట నగరాలు మరియు పల్లెలలో తీవ్ర విధ్వంసాన్ని సృష్టించింది. ప్రాచీన భారతీయ యుద్ధాలలో విల్లులు, ఈటెలు, డాళ్లు, కత్తులతో కూడిన పదాతిదళం, రథాలు మరియు యుద్ధ ఏనుగులు పాల్గొనేవి. యుద్ధ ప్రభావం కేవలం సైనికులకే పరిమితం కాలేదు; 13వ శిలాశాసనం పేర్కొన్నట్లుగా గృహస్థులు, పండితులు, బ్రాహ్మణులు, శ్రమణులు మరియు సాధారణ కుటుంబాలు తీవ్రంగా నష్టపోయాయి.',
        p3: 'యుద్ధం ముగిసేసరికి కళింగ జయించబడి, ఉత్తరాన తోషాలి (ధౌలి/శిశుపాల్‌గఢ్) మరియు దక్షిణాన సమాప (జౌగడ) పరిపాలనా కేంద్రాలుగా మౌర్య సామ్రాజ్యంలో విలీనం చేయబడింది. కానీ ఆ విజయం వెనుక ఉన్న ఘోరమైన మానవ విషాదం అశోకుని పాలనా దృక్పథాన్ని పూర్తిగా మార్చివేసింది.',
        historiographicalNote: 'చారిత్రక గమనిక: భువనేశ్వర్ సమీపంలోని ధౌలి కొండల దిగువన ఉన్న దయా నది తీరాన్ని సంప్రదాయబద్ధంగా కళింగ యుద్ధ భూమిగా భావిస్తారు. ధౌలి అశోకుని శాసన కేంద్రమైనప్పటికీ, ప్రాథమిక శాసనాలు ఒకే ఒక్క నిర్దిష్ట యుద్ధ స్థలాన్ని లేదా కల్పిత సంభాషణలను పేర్కొనలేదు.'
      },
      tragedy: {
        code: 'విభాగం C',
        title: 'మానవ విషాదం: 13వ ప్రధాన శిలాశాసన సాక్ష్యం',
        subtitle: 'అశోకుని శాసనం ప్రకారం కళింగ ప్రజలు ఎదుర్కొన్న యుద్ధ పరిణామాలు',
        p1: 'కళింగ ప్రజలు అనుభవించిన వేదనకు అత్యంత ప్రత్యక్ష చారిత్రక ఆధారం అశోకుని 13వ ప్రధాన శిలాశాసనం (Major Rock Edict XIII). తన సైనిక విజయాన్ని గొప్పగా చెప్పుకోవడానికి బదులుగా, యుద్ధంలో జరిగిన ప్రాణనష్టం, నిర్వాసితుల బాధ మరియు సామాన్య కుటుంబాల వియోగాన్ని అశోకుడు ఇందులో వివరించాడు.',
        edictHeading: 'అశోకుని 13వ ప్రధాన శిలాశాసనంలో పేర్కొన్న గణాంకాలు',
        edictAttribution: '13వ ప్రధాన శిలాశాసనం యొక్క ప్రాకృత పాఠం (షాబాజ్‌గర్హి, మన్సెహ్రా, కాల్సీ, గిర్నార్, ఎర్రగుడిలలో లభించిన శాసనాలు) ప్రకారం:',
        statDeathsNumber: '~1,00,000',
        statDeathsLabel: 'శాసనం ప్రకారం యుద్ధంలో మరణించిన వారి సుమారు సంఖ్య',
        statDeportedNumber: '~1,50,000',
        statDeportedLabel: 'శాసనం ప్రకారం బందీలుగా లేదా నిర్వాసితులుగా తరలించబడిన వారి సంఖ్య',
        statAftermathNumber: 'అంతకు ఎన్నో రెట్లు',
        statAftermathLabel: 'శాసనం ప్రకారం యుద్ధం తర్వాత గాయాలు, కరువు మరియు వ్యాధుల వల్ల మరణించిన వారు',
        methodologicalCaveat: 'ముఖ్యమైన చారిత్రక వివరణ: 1,00,000 మరణాలు మరియు 1,50,000 మంది తరలింపు అనే ఈ సంఖ్యలు అశోకుని శాసనంలో యుద్ధ తీవ్రతను తెలియజేయడానికి నమోదు చేయబడినవి. వీటిని ఆధునిక జనాభా లెక్కలుగా కాకుండా, ప్రాచీన శాసన వాంగ్మూలంగా అర్థం చేసుకోవాలి.'
      },
      remorse: {
        code: 'విభాగం D',
        title: 'అశోకుని పశ్చాత్తాపం మరియు ధమ్మ విధానం',
        subtitle: 'ఆత్మవిమర్శ, ప్రజా సంక్షేమం మరియు శిలలపై చెక్కబడిన పాలనా సూత్రాలు',
        p1: 'కళింగను జయించిన తర్వాత దేవానాంప్రియునికి తీవ్రమైన పశ్చాత్తాపం (అనుశోచన) కలిగిందని 13వ శిలాశాసనం చెబుతోంది. ఏ తప్పు చేయని గృహస్థులు, పెద్దలను గౌరవించేవారు, బ్రాహ్మణులు, శ్రమణులు కూడా తమ ఆత్మీయుల మరణం లేదా ఎడబాటు వల్ల తీవ్ర దుఃఖానికి గురవుతారని—కళింగలో జరిగిన ప్రాణనష్టంలో నూరవ వంతు లేదా వెయ్యవ వంతు జరిగినా అది తనకు తీవ్ర వేదన కలిగిస్తుందని అశోకుడు పేర్కొన్నాడు.',
        p2: 'ఈ పరిణామం తర్వాత అశోకుడు "ధమ్మ" (ధర్మం) విధానానికి ప్రాధాన్యతనిచ్చాడు—అహింస, సకల జీవుల పట్ల కరుణ, సత్యం, తల్లిదండ్రులు మరియు గురువుల పట్ల గౌరవం, అన్ని మతాల పట్ల సహనం మరియు ప్రజా సంక్షేమం ఇందులో ముఖ్యాంశాలు. ప్రజలు మరియు అధికారులు చదివి ఆచరించేందుకు వీలుగా ఆయన కొండలపై, స్తంభాలపై శాసనాలను చెక్కించాడు.',
        p3: 'ముఖ్యంగా, కళింగ ప్రజల గాయాలను మళ్ళీ రేకెత్తించకూడదనే ఉద్దేశంతో అశోకుడు 13వ శిలాశాసనాన్ని కళింగలో చెక్కించలేదు. దానికి బదులుగా ఒడిశాలోని ధౌలి మరియు జౌగడలలో రెండు "ప్రత్యేక కళింగ శాసనాలను" చెక్కించి, తోషాలి మరియు సమాప న్యాయాధికారులకు (మహామాత్రులకు) నిష్పక్షపాత పాలన అందించాలని ఆదేశిస్తూ—"మనుషులందరూ నా బిడ్డలే" (సవే మునిసే పజా మమ) అని ప్రకటించాడు.',
        scholarlyDebateNote: 'చారిత్రక దృక్కోణం: 13వ శాసనంలో అశోకుని పశ్చాత్తాపం నిజమైన చారిత్రక ఆధారమైనప్పటికీ, ఆయన వ్యక్తిగత బౌద్ధ మత స్వీకార క్రమం మరియు సామ్రాజ్య పరిపాలనా వ్యూహాలపై చరిత్రకారులలో విస్తృత చర్చ ఉంది.'
      },
      legacy: {
        code: 'విభాగం E',
        title: 'చారిత్రక వారసత్వం: ధౌలి, జౌగడ మరియు కళింగ స్మృతి',
        subtitle: 'ఒడిశాలోని పురావస్తు స్మారకాలు మరియు శాంతి, కరుణల శాశ్వత సందేశం',
        p1: 'కళింగ యుద్ధం ప్రపంచ చరిత్రలో ఒక గొప్ప మలుపుగా పరిగణించబడుతుంది. సైనిక శక్తి పరాకాష్టలో ఉన్న ఒక చక్రవర్తి తన విజయం వల్ల కలిగిన మానవ దుఃఖాన్ని బహిరంగంగా శిలలపై నమోదు చేసి, యుద్ధ భేరి (భేరీఘోష) కంటే ధర్మ విజయం (ధమ్మఘోష) గొప్పదని చాటిచెప్పాడు.',
        p2: 'నేడు ఒడిశాలో ఈ యుగానికి చెందిన ప్రత్యక్ష ఆధారాలు భారత పురావస్తు శాఖ (ASI) సంరక్షణలో ఉన్న రెండు ప్రధాన ప్రదేశాలలో కనిపిస్తాయి: ధౌలి (భువనేశ్వర్ సమీపంలోని దయా నది తీరాన) మరియు జౌగడ (గంజాం జిల్లాలో రుషికుల్య నది సమీపంలో). ధౌలిలో అశోకుని బ్రాహ్మీ శాసనాలకు సరిగ్గా పైన సహజ శిలను చెక్కి రూపొందించిన మౌర్య కాలపు రాతి ఏనుగు (క్రీ.పూ. 3వ శతాబ్దం) తూర్పు భారతదేశపు అత్యంత ప్రాచీన శిల్పాలలో ఒకటి.',
        p3: 'తర్వాతి శతాబ్దాలలో మౌర్య సామ్రాజ్య పతనం అనంతరం కళింగ మళ్ళీ తన స్వతంత్ర రాజకీయ, సైనిక వైభవాన్ని చాటుకుంది—ముఖ్యంగా క్రీ.పూ. 1వ శతాబ్దంలో మహామేఘవాహన చక్రవర్తి ఖారవేలుని పాలనలో (ఉదయగిరి హాథీగుంఫా శాసనం) మరియు ఆ తర్వాత తూర్పు గంగ, సూర్యవంశ గజపతి మహారాజుల కాలంలో ఓడ్ర దేశం మహా సామ్రాజ్యంగా వెలుగొందింది.',
        conclusionTitle: 'మానవాళికి శాంతి సందేశం',
        conclusionText: 'రెండు వేల సంవత్సరాల తర్వాత కూడా ధౌలి, జౌగడ శిలాశాసనాలు యుద్ధ విధ్వంసం కంటే శాంతి, కరుణ, సంయమనం మరియు ప్రజా సంక్షేమమే నిజమైన రాజధర్మమని చాటిచెబుతున్నాయి.'
      }
    },
    scenesHeader: {
      badge: 'దృశ్య చారిత్రక కథనం • దృశ్యాలు 1 నుండి 7',
      title: 'కళింగ యుద్ధం: దృశ్యరూప చారిత్రక ప్రస్థానం',
      subtitle: 'పురావస్తు స్మారకాలు, అశోకుని అసలు శిలాశాసనాలు మరియు స్పష్టంగా గుర్తించిన శిల్ప పునర్నిర్మాణాలతో కూడిన ఏడు చారిత్రక దృశ్యాలను వీక్షించండి.',
      viewDossierBtn: 'పూర్తి దృశ్య వివరాలు & శాసన ఆధారాలు చూడండి',
      companionImageLabel: 'అనుబంధ చారిత్రక చిత్రం',
      sourceAttributionLabel: 'ఆధారం & క్రెడిట్'
    },
    scenes: [
      {
        id: 'scene_1_ancient_kalinga',
        sceneNumber: 'దృశ్యం 1',
        title: 'ప్రాచీన కళింగ: కోట నగరాలు & నదీ మైదానాలు',
        visualTypeBadge: 'పురావస్తు ప్రదేశ ఛాయాచిత్రం (శిశుపాల్‌గఢ్ / తోషాలి)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_sisupalgarh_columns.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_sisupalgarh_ramparts.jpg',
        imageAlt: 'భువనేశ్వర్ సమీపంలోని ప్రాచీన శిశుపాల్‌గఢ్ కోట నగరంలోని లాటరైట్ రాతి స్తంభాలు.',
        secondaryImageAlt: 'శిశుపాల్‌గఢ్ కోట యొక్క తవ్వకాలలో బయటపడిన రాతి ప్రవేశ ద్వారం మరియు ప్రాకారాలు.',
        narrative: 'క్రీ.పూ. 261 మౌర్య దండయాత్రకు ముందు ప్రాచీన కళింగ తూర్పు భారతదేశంలో సుసంపన్నమైన నాగరికతగా వర్ధిల్లింది. భువనేశ్వర్ సమీపంలోని శిశుపాల్‌గఢ్ (ప్రాచీన కళింగనగరం / తోషాలి) పురావస్తు తవ్వకాలలో భారీ రాతి ప్రాకారాలు, ఎనిమిది ప్రవేశ ద్వారాలు, కందకాలు మరియు స్తంభాల మండపాలతో కూడిన ప్రణాళికాబద్ధమైన నగరం బయటపడింది.',
        caption: 'చిత్రం 1A — శిశుపాల్‌గఢ్ (భువనేశ్వర్, ఒడిశా) వద్ద ఉన్న ప్రాచీన రాతి స్తంభాలు—కళింగ నగర నిర్మాణానికి ప్రత్యక్ష పురావస్తు ఆధారం.',
        secondaryCaption: 'చిత్రం 1B — శిశుపాల్‌గఢ్ కోట యొక్క పశ్చిమ ప్రవేశ ద్వారం మరియు లాటరైట్ రాతి ప్రాకారాలు (ASI రక్షిత స్మారకం).',
        attribution: 'వికీమీడియా కామన్స్ / భారత పురావస్తు శాఖ ప్రదేశ ఛాయాచిత్రాలు (CC BY-SA 4.0).',
        historicalNote: 'పురావస్తు ఆధారం: 1948లో బి.బి. లాల్ నిర్వహించిన తవ్వకాలలో శిశుపాల్‌గఢ్ ప్రాచీన భారతదేశంలోని అత్యంత ప్రణాళికాబద్ధమైన కోట నగరాలలో ఒకటిగా నిర్ధారించబడింది.'
      },
      {
        id: 'scene_2_mauryan_campaign',
        sceneNumber: 'దృశ్యం 2',
        title: 'కళింగ వైపు మౌర్య సైనిక దండయాత్ర',
        visualTypeBadge: 'శిల్ప చారిత్రక పునర్నిర్మాణం & భౌగోళిక పటం',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_mauryan_procession_relief.jpg',
        secondaryImageUrl: '/assets/archive/odra_kalinga_map.jpg',
        imageAlt: 'ధౌలి శాంతి స్తూపం వద్ద ప్రాచీన రథం, గుర్రాలు మరియు సైనికుల ప్రయాణాన్ని చూపే రాతి శిల్పం.',
        secondaryImageAlt: 'తూర్పు తీరంలో ప్రాచీన కళింగ ప్రాంతాన్ని చూపే చారిత్రక పటం.',
        narrative: 'తన పాలనలోని ఎనిమిదవ సంవత్సరంలో (సుమారు క్రీ.పూ. 261), స్వతంత్ర కళింగను మౌర్య సామ్రాజ్యంలో విలీనం చేయడానికి అశోకుడు సైనిక దండయాత్ర చేపట్టాడు. విల్లులు, ఈటెలు, డాళ్లతో కూడిన పదాతిదళం, రథాలు మరియు యుద్ధ ఏనుగులతో మౌర్య సైన్యం కళింగ నదీ మైదానాల వైపు సాగింది.',
        caption: 'చిత్రం 2A — కోట నగరం నుండి కదులుతున్న ప్రాచీన రాజ రథం మరియు సైనిక దళాన్ని చూపే ధౌలి రాతి శిల్పం (కళాత్మక/శిల్ప పునర్నిర్మాణం).',
        secondaryCaption: 'చిత్రం 2B — గంగా మైదానం మరియు దక్కన్ మధ్య కళింగ వ్యూహాత్మక స్థానాన్ని చూపే చారిత్రక పటం.',
        attribution: 'వికీమీడియా కామన్స్ — ధౌలి శాంతి స్తూప శిల్పం (CC BY-SA 4.0) & చారిత్రక పట భాండాగారం.',
        historicalNote: 'చారిత్రక వివరణ: కళింగ యుద్ధంలో పాల్గొన్న ఖచ్చితమైన సైనికుల సంఖ్యను అశోకుని శాసనాలు పేర్కొనలేదు.'
      },
      {
        id: 'scene_3_the_battle',
        sceneNumber: 'దృశ్యం 3',
        title: 'కళింగ యుద్ధం: సేనల భీకర పోరాటం',
        visualTypeBadge: 'స్మారక శిల్ప పునర్నిర్మాణం & దయా నది మైదానం',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_war_buddhavanam_relief.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'యుద్ధ ఏనుగులు, డాళ్లు, ఈటెలు మరియు ప్రాచీన యోధులతో కళింగ యుద్ధాన్ని చూపే శిల్ప ఫలకం.',
        secondaryImageAlt: 'ధౌలి కొండల నుండి కనిపించే దయా నది మైదాన ప్రాంతం.',
        narrative: 'కళింగలో జరిగిన సైనిక పోరాటం అత్యంత భీకరమైనది. కళింగ యోధులు తమ మాతృభూమి రక్షణ కోసం తీవ్రంగా ప్రతిఘటించారు. యుద్ధ ఏనుగులు, రథాలు మరియు పదాతిదళాల మధ్య జరిగిన ఈ పోరులో ఇరువైపులా భారీ ప్రాణనష్టం సంభవించింది.',
        caption: 'చిత్రం 3A — కళింగ యుద్ధంలో ఏనుగులు మరియు పదాతిదళాల పోరాటాన్ని చూపే స్మారక శిల్పం ("King Asoka’s Kalinga War", బుద్ధవనం స్తూప శిల్పం — ఆధునిక కళాత్మక పునర్నిర్మాణం).',
        secondaryCaption: 'చిత్రం 3B — భువనేశ్వర్ సమీపంలోని ధౌలి కొండల నుండి దయా నది మైదాన దృశ్యం.',
        attribution: 'వికీమీడియా కామన్స్ — ఆనందజ్యోతి భిక్షు ఛాయాచిత్రం (CC BY-SA 4.0) & దయా నది దృశ్యం (CC BY-SA 3.0).',
        historicalNote: 'శాస్త్రీయ గమనిక: ప్రాథమిక శాసనాలు నిర్దిష్ట యుద్ధ వ్యూహాలను లేదా కళింగ సేనానుల పేర్లను పేర్కొనలేదు.'
      },
      {
        id: 'scene_4_human_cost',
        sceneNumber: 'దృశ్యం 4',
        title: 'మానవ విషాదం: నిర్వాసితుల వేదన మరియు ప్రాణనష్టం',
        visualTypeBadge: 'ధౌలి కొండపై స్మారక శిల్పం (కళాత్మక పునర్నిర్మాణం)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'కళింగ యుద్ధం యొక్క మానవ విషాదాన్ని మరియు బాధితుల దుఃఖాన్ని చూపే ధౌలి శాంతి స్తూప శిల్పం.',
        secondaryImageAlt: 'ధౌలి కొండల దిగువన దయా నది లోయ దృశ్యం.',
        narrative: '13వ ప్రధాన శిలాశాసనం ప్రకారం ఈ యుద్ధంలో సుమారు 1,00,000 మంది మరణించారు, 1,50,000 మంది బందీలుగా లేదా నిర్వాసితులుగా తరలించబడ్డారు మరియు ఆ తర్వాత అంతకు ఎన్నో రెట్లు ఎక్కువ మంది మరణించారు. సామాన్య కుటుంబాలు, పండితులు మరియు గృహస్థులు తీవ్ర దుఃఖానికి గురయ్యారు.',
        caption: 'చిత్రం 4A — కళింగ యుద్ధంలో జరిగిన ప్రాణనష్టాన్ని మరియు బాధితుల వేదనను చూపే ధౌలి శాంతి స్తూప శిల్పం (20వ శతాబ్దపు స్మారక కళాత్మక పునర్నిర్మాణం).',
        secondaryCaption: 'చిత్రం 4B — ధౌలి గిరి దిగువన ఉన్న దయా నది మైదానం.',
        attribution: 'వికీమీడియా కామన్స్ — ధౌలి శాంతి స్తూప ప్యానెల్ 7 (CC BY-SA 4.0).',
        historicalNote: 'ఆధార వివరణ: 1,00,000 మరణాలు మరియు 1,50,000 మంది నిర్వాసితుల సంఖ్యలు నేరుగా అశోకుని 13వ ప్రధాన శిలాశాసనంలో పేర్కొనబడ్డాయి.'
      },
      {
        id: 'scene_5_ashoka_remorse',
        sceneNumber: 'దృశ్యం 5',
        title: 'అశోకుని పశ్చాత్తాపం: యుద్ధ పరిణామాలపై ఆత్మపరిశీలన',
        visualTypeBadge: 'కళాత్మక & శిల్ప పునర్నిర్మాణం (ధౌలి గిరి)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_ashoka_remorse_sword_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        imageAlt: 'అశోక చక్రవర్తి పశ్చాత్తాపంతో శిరస్సు వంచి తన ఖడ్గాన్ని బుద్ధుని ఎదుట సమర్పిస్తున్నట్లు చూపే ధౌలి శిల్పం.',
        secondaryImageAlt: 'యుద్ధ విషాదాన్ని చూసి విచారిస్తున్న అశోకుని ధౌలి శిల్పం.',
        narrative: 'కళింగలో జరిగిన ఘోర రక్తపాతాన్ని చూసిన అశోకుడు తీవ్ర పశ్చాత్తాపానికి (అనుశోచన) లోనయ్యాడు. యుద్ధ విజయం కంటే ధమ్మ విజయం (కరుణ, అహింస, సంయమనం) గొప్పదని భావించి ప్రజల సంక్షేమానికి అంకితమయ్యాడు.',
        caption: 'చిత్రం 5A — అశోక చక్రవర్తి పశ్చాత్తాపంతో తన యుద్ధ ఖడ్గాన్ని త్యజిస్తున్నట్లు చూపే ధౌలి శాంతి స్తూప శిల్పం (కళాత్మక పునర్నిర్మాణం, సమకాలీన చారిత్రక చిత్రం కాదు).',
        secondaryCaption: 'చిత్రం 5B — కళింగ యుద్ధ బాధితులను చూసి దుఃఖిస్తున్న అశోకుని అనుబంధ శిల్పం.',
        attribution: 'వికీమీడియా కామన్స్ — ధౌలి శాంతి స్తూప ప్యానెల్ 9 & ప్యానెల్ 7 (CC BY-SA 4.0).',
        historicalNote: 'చారిత్రక సమతుల్యత: యుద్ధం తర్వాత అశోకునిలో ధమ్మం మరియు బౌద్ధం పట్ల నిబద్ధత క్రమంగా బలపడిందని ఆయన శాసనాలు స్పష్టం చేస్తున్నాయి.'
      },
      {
        id: 'scene_6_ashokan_rock_edicts',
        sceneNumber: 'దృశ్యం 6',
        title: 'ధౌలి మరియు జౌగడలోని అశోకుని శిలాశాసనాలు',
        visualTypeBadge: 'క్రీ.పూ. 3వ శతాబ్దపు అసలు శిలాశాసన ఛాయాచిత్రాలు (ఒడిశా)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_rock_edicts.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_jaugada_rock_edict.jpg',
        imageAlt: 'ఒడిశాలోని ధౌలి వద్ద గ్రానైట్ రాతిపై ప్రాకృత బ్రాహ్మీ లిపిలో చెక్కబడిన అశోకుని శిలాశాసనం యొక్క అసలు ఛాయాచిత్రం.',
        secondaryImageAlt: 'ఒడిశాలోని గంజాం జిల్లా జౌగడ వద్ద ఉన్న అశోకుని ప్రధాన శిలాశాసన రాతి ముఖభాగం.',
        narrative: 'ధౌలి (భువనేశ్వర్ సమీపంలో) మరియు జౌగడ (గంజాం జిల్లా) వద్ద సహజ శిలలపై ప్రాకృత భాషలో, తొలి బ్రాహ్మీ లిపిలో అశోకుడు తన శాసనాలను చెక్కించాడు. కళింగలో 13వ శాసనానికి బదులుగా రెండు "ప్రత్యేక కళింగ శాసనాలను" చెక్కించి, "మనుషులందరూ నా బిడ్డలే" అని ప్రకటిస్తూ నిష్పక్షపాత పాలనను ఆదేశించాడు.',
        caption: 'చిత్రం 6A — ఒడిశాలోని ధౌలి వద్ద క్రీ.పూ. 3వ శతాబ్దపు బ్రాహ్మీ లిపిలో చెక్కబడిన అశోకుని శిలాశాసనపు అసలు ఛాయాచిత్రం (ASI రక్షిత స్మారకం).',
        secondaryCaption: 'చిత్రం 6B — గంజాం జిల్లా జౌగడ (ప్రాచీన సమాప) వద్ద ఉన్న అశోకుని శిలాశాసనపు అసలు ఛాయాచిత్రం (ASI రక్షిత స్మారకం).',
        attribution: 'వికీమీడియా కామన్స్ — ASI స్మారకాలు N-OR-59 (ధౌలి) మరియు జౌగడ శిలాశాసన ఛాయాచిత్రాలు (CC BY-SA 4.0 / Public Domain).',
        historicalNote: 'ప్రాథమిక శాసన ఆధారం: 1837లో జేమ్స్ ప్రిన్సెప్ చదివిన ఈ శాసనాలు ఒడిశాలో లభించిన అత్యంత ప్రాచీన లిఖిత ఆధారాలు.'
      },
      {
        id: 'scene_7_message_of_peace',
        sceneNumber: 'దృశ్యం 7',
        title: 'శాంతి సందేశం: ధౌలి రాతి ఏనుగు & ధమ్మ సంక్షేమం',
        visualTypeBadge: 'మౌర్య కాలపు అసలు రాతి శిల్పం (క్రీ.పూ. 261–250) & శాంతి స్తూపం',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_elephant_edict.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_dhauli_shanti_stupa.jpg',
        imageAlt: 'ధౌలి వద్ద అశోకుని శాసనాలకు పైన సహజ శిలలో చెక్కబడిన క్రీ.పూ. 3వ శతాబ్దపు మౌర్య కాలపు రాతి ఏనుగు శిల్పం.',
        secondaryImageAlt: 'భువనేశ్వర్ సమీపంలోని ధౌలి గిరి కొండపై ఉన్న ధౌలి శాంతి స్తూపం.',
        narrative: 'ధౌలి శిలాశాసనాలకు సరిగ్గా పైన సహజ శిల నుండి బయటకు వస్తున్నట్లుగా చెక్కబడిన క్రీ.పూ. 3వ శతాబ్దపు మౌర్య రాతి ఏనుగు బుద్ధునికి, శాంతికి మరియు కరుణకు ప్రతీకగా నిలుస్తుంది. రహదారుల వెంట నీడనిచ్చే చెట్లు నాటించడం, బావులు తవ్వించడం, బాటసారులకు విశ్రాంతి గృహాలు మరియు మనుషులకు, జంతువులకు వైద్య సదుపాయాలు కల్పించడం వంటి సంక్షేమ కార్యక్రమాలను అశోకుని శాసనాలు వివరిస్తాయి.',
        caption: 'చిత్రం 7A — ధౌలి శిలాశాసనంపై చెక్కబడిన క్రీ.పూ. 3వ శతాబ్దపు మౌర్య రాతి ఏనుగు శిల్పం—ఒడిశాలోని అత్యంత ప్రాచీన రాతి శిల్పం.',
        secondaryCaption: 'చిత్రం 7B — ధౌలి కొండపై శాంతి మరియు అహింసలకు ప్రతీకగా 1972లో నిర్మించబడిన శాంతి స్తూపం.',
        attribution: 'వికీమీడియా కామన్స్ — ధౌలి ఏనుగు శిల్పం (CC BY-SA 4.0) & ధౌలి శాంతి స్తూపం (CC BY-SA 3.0).',
        historicalNote: 'చారిత్రక విశేషం: ధౌలి శాసనం చివరన "సేతో" (శ్వేత గజం) అనే ప్రాకృత పదం బుద్ధునికి ప్రతీకగా చెక్కబడింది.'
      }
    ],
    referencesHeader: {
      badge: 'ధృవీకరించబడిన ఆధారాలు & గ్రంథ సూచిక',
      title: 'ప్రాథమిక శాసన గ్రంథాలు, పురావస్తు నివేదికలు & పరిశోధనా రచనలు',
      subtitle: 'కళింగ యుద్ధం మరియు ధౌలి, జౌగడ శాసనాలను నమోదు చేసిన ప్రామాణిక శాసన సంపుటాలు మరియు భారత పురావస్తు శాఖ ప్రచురణలు.',
      visitSourceBtn: 'ఆధార గ్రంథాన్ని తెరవండి'
    },
    references: [
      {
        id: 'ref_hultzsch_cii',
        title: 'Corpus Inscriptionum Indicarum, Vol. I: Inscriptions of Asoka',
        authorOrAuthority: 'యూజెన్ హుల్ట్‌ష్ (Eugen Hultzsch — భారత పురావస్తు శాఖ / ఆక్స్‌ఫర్డ్, 1925)',
        category: 'epigraphic_primary',
        categoryLabel: 'ప్రాథమిక శాసన సంపుటి',
        description: 'అశోకుని 13వ ప్రధాన శిలాశాసనం మరియు ధౌలి, జౌగడ ప్రత్యేక కళింగ శాసనాల మూల ప్రాకృత పాఠం మరియు ఆంగ్ల అనువాదంతో కూడిన ప్రామాణిక గ్రంథం.',
        url: 'https://archive.org/details/in.ernet.dli.2015.49403'
      },
      {
        id: 'ref_asi_dhauli_jaugada',
        title: 'భారత పురావస్తు శాఖ (ASI) — ధౌలి & జౌగడ శాసన స్మారక రికార్డులు',
        authorOrAuthority: 'భారత పురావస్తు శాఖ (ASI), భువనేశ్వర్ సర్కిల్, భారత ప్రభుత్వం',
        category: 'archaeological_survey',
        categoryLabel: 'అధికారిక పురావస్తు రికార్డు',
        description: 'ఒడిశాలోని ధౌలి (ఖోర్ధా జిల్లా) రాతి ఏనుగు & శిలాశాసనాలు మరియు జౌగడ (గంజాం జిల్లా) కోట & శాసనాల అధికారిక పురావస్తు వివరాలు.',
        url: 'https://asi.nic.in/'
      },
      {
        id: 'ref_thapar_ashoka',
        title: 'Aśoka and the Decline of the Mauryas',
        authorOrAuthority: 'రొమిలా థాపర్ (ఆక్స్‌ఫర్డ్ యూనివర్సిటీ ప్రెస్)',
        category: 'scholarly_translation',
        categoryLabel: 'ఆధునిక చారిత్రక పరిశోధనా గ్రంథం',
        description: 'అశోకుని పాలన, కళింగ దండయాత్ర (సుమారు క్రీ.పూ. 261) కారణాలు, 13వ శిలాశాసన విశ్లేషణ మరియు ధమ్మ విధానంపై సమగ్ర పరిశోధన.',
        url: 'https://global.oup.com/academic/product/asoka-and-the-decline-of-the-mauryas-9780198077244'
      },
      {
        id: 'ref_lahiri_ashoka',
        title: 'Ashoka in Ancient India',
        authorOrAuthority: 'నయనజ్యోత్ లాహిరి (హార్వర్డ్ యూనివర్సిటీ ప్రెస్, 2015)',
        category: 'scholarly_translation',
        categoryLabel: 'పురావస్తు & చారిత్రక అధ్యయనం',
        description: 'మౌర్య కాలపు పురావస్తు ఆధారాలు, ప్రాచీన కళింగ (శిశుపాల్‌గఢ్/తోషాలి మరియు జౌగడ/సమాప) భౌగోళికత మరియు ప్రత్యేక కళింగ శాసనాల విశ్లేషణ.',
        url: 'https://www.hup.harvard.edu/books/9780674057777'
      },
      {
        id: 'ref_lal_sisupalgarh',
        title: 'Sisupalgarh 1948: An Early Historical Fort in Eastern India (Ancient India, No. 5)',
        authorOrAuthority: 'బి.బి. లాల్ (భారత పురావస్తు శాఖ, 1949)',
        category: 'archaeological_survey',
        categoryLabel: 'పురావస్తు తవ్వకాల నివేదిక',
        description: 'భువనేశ్వర్ సమీపంలోని ప్రాచీన శిశుపాల్‌గఢ్ కోట నగర ప్రాకారాలు మరియు ప్రవేశ ద్వారాలపై జరిపిన పురావస్తు తవ్వకాల నివేదిక.',
        url: 'https://asi.nic.in/ancient-india/'
      },
      {
        id: 'ref_sircar_inscriptions',
        title: 'Inscriptions of Asoka & Select Inscriptions',
        authorOrAuthority: 'డి.సి. సర్కార్ (భారత ప్రభుత్వ ప్రచురణల విభాగం / కలకత్తా విశ్వవిద్యాలయం)',
        category: 'epigraphic_primary',
        categoryLabel: 'శాసన అనువాదం & వ్యాఖ్యానం',
        description: 'అశోకుని శిలా మరియు స్తంభ శాసనాల ప్రామాణిక అనువాదం మరియు ప్రాకృత పదజాల వివరణ.',
        url: 'https://archive.org/details/in.ernet.dli.2015.532669'
      }
    ],
    relatedLinks: {
      heading: 'ఈ పోర్టల్‌లోని సంబంధిత చారిత్రక పేజీలను చూడండి',
      odraDesha: 'ఓడ్ర దేశం & ప్రాచీన కళింగ భౌగోళికత',
      inscriptions: 'శిలాశాసనాలు & తామ్రశాసనాలు',
      gajapathiKings: 'ఒడిశా సూర్యవంశ గజపతి రాజులు',
      timeline: 'పూర్తి చారిత్రక కాలక్రమం'
    }
  },

  // ============================================================================
  // 4. KANNADA (kn)
  // ============================================================================
  kn: {
    badge: 'ಪ್ರಾಚೀನ ಕಳಿಂಗ ಶಾಸನ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸಾಕ್ಷ್ಯಚಿತ್ರ • ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261',
    pageTitle: 'ಕಳಿಂಗ ಯುದ್ಧ: ಸಾಮ್ರಾಟ್ ಅಶೋಕ ಮತ್ತು ಕಳಿಂಗ — ಇತಿಹಾಸದ ಒಂದು ನಿರ್ಣಾಯಕ ತಿರುವು',
    subtitle: 'ಕಳಿಂಗದ ಮೇಲಿನ ಮೌರ್ಯರ ದಂಡಯಾತ್ರೆ, ಹದಿಮೂರನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದಲ್ಲಿ ದಾಖಲಾದ ಮಾನವೀಯ ದುರಂತ ಹಾಗೂ ಒಡಿಶಾದ ಧೌಲಿ ಮತ್ತು ಜೌಗಡ ಶಾಸನಗಳ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಯ ಆಧಾರಸಹಿತ ಅಧ್ಯಯನ.',
    introParagraph: 'ಮೌರ್ಯ ಸಾಮ್ರಾಟ್ ಅಶೋಕನ ಪಟ್ಟಾಭಿಷೇಕದ ಎಂಟನೇ ವರ್ಷದಲ್ಲಿ (ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261) ನಡೆದ ಕಳಿಂಗ ಯುದ್ಧವು ಪ್ರಾಚೀನ ವಿಶ್ವದ ಅತ್ಯಂತ ಮಹತ್ವದ ಸಂಘರ್ಷಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಕೇವಲ ವಿಜಯಗಳನ್ನು ಮಾತ್ರ ಹೊಗಳುವ ಪ್ರಾಚೀನ ಶಾಸನಗಳಿಗಿಂತ ಭಿನ್ನವಾಗಿ, ಕಳಿಂಗ ಯುದ್ಧವು ವಿಜೇತ ಸಾಮ್ರಾಟನೇ ಸ್ವತಃ ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಿಸಿದ ಪಶ್ಚಾತ್ತಾಪ, ಆತ್ಮಾವಲೋಕನ ಮತ್ತು ಧಮ್ಮದ (ಧರ್ಮದ) ಸಂದೇಶಕ್ಕಾಗಿ ಇತಿಹಾಸದಲ್ಲಿ ಅಮರವಾಗಿದೆ.',
    epistemicBannerTitle: 'ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ವಿಧಾನ ಮತ್ತು ಆಕರಗಳ ವರ್ಗೀಕರಣ',
    epistemicBannerText: 'ಈ ಐತಿಹಾಸಿಕ ಪುಟವು ಪ್ರಾಥಮಿಕ ಶಾಸನಾತ್ಮಕ ಸಾಕ್ಷ್ಯ (ಪ್ರಾಕೃತ ಭಾಷೆ ಮತ್ತು ಬ್ರಾಹ್ಮೀ/ಖರೋಷ್ಠಿ ಲಿಪಿಯಲ್ಲಿ ಕೆತ್ತಲಾದ ಅಶೋಕನ ಸಮಕಾಲೀನ ಶಿಲಾಶಾಸನಗಳು), ಒಡಿಶಾದ ಪುರಾತತ್ವ ಅವಶೇಷಗಳು (ಶಿಶುಪಾಲ್‌ಗಢ್, ಧೌಲಿ ಮತ್ತು ಜೌಗಡ) ಹಾಗೂ ದೃಶ್ಯ ವಿವರಣೆಗಾಗಿ ಬಳಸಲಾದ ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಿದ ಕಲಾತ್ಮಕ/ಶಿಲ್ಪಕಲಾ ಪುನರ್ನಿರ್ಮಾಣಗಳ ನಡುವೆ ಸ್ಪಷ್ಟ ವ್ಯತ್ಯಾಸವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳುತ್ತದೆ.',
    epistemicLegend: {
      inscriptionalTitle: '1. ನೇರ ಶಿಲಾಶಾಸನ ಸಾಕ್ಷ್ಯ',
      inscriptionalDesc: 'ಅಶೋಕನ 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನ ಹಾಗೂ ಧೌಲಿ ಮತ್ತು ಜೌಗಡದ ಪ್ರತ್ಯೇಕ ಕಳಿಂಗ ಶಾಸನಗಳಲ್ಲಿ (ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ) ನೇರವಾಗಿ ದಾಖಲಾದ ವಿವರಗಳು.',
      scholarlyTitle: '2. ಆಧುನಿಕ ಐತಿಹಾಸಿಕ ಮತ್ತು ಪುರಾತತ್ವ ವಿಶ್ಲೇಷಣೆ',
      scholarlyDesc: 'ಶಿಶುಪಾಲ್‌ಗಢ್/ತೋಷಾಲಿ ಮತ್ತು ಜೌಗಡ/ಸಮಾಪ ಉತ್ಖನನಗಳು ಹಾಗೂ ಪ್ರಾಚೀನ ಸಾವು-ನೋವಿನ ಅಂಕಿಅಂಶಗಳ ಕುರಿತು ಇತಿಹಾಸಕಾರರ ವಿಮರ್ಶಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ.',
      artisticTitle: '3. ಕಲಾತ್ಮಕ ಮತ್ತು ಶಿಲ್ಪಕಲಾ ಪುನರ್ನಿರ್ಮಾಣಗಳು',
      artisticDesc: 'ಐತಿಹಾಸಿಕ ದೃಶ್ಯಗಳನ್ನು ವಿವರಿಸಲು ಬಳಸಲಾದ ಸ್ಮಾರಕ ಉಬ್ಬುಶಿಲ್ಪಗಳು ಮತ್ತು ಚಿತ್ರಗಳು—ಇವುಗಳನ್ನು ಸಮಕಾಲೀನ ಛಾಯಾಚಿತ್ರಗಳೆಂದು দাবি ಮಾಡದೆ ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣಗಳೆಂದು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ.'
    },
    quickSummary: {
      sectionTitle: 'F. ಸಂಕ್ಷಿಪ್ತ ಐತಿಹಾಸಿಕ ಸಾರಾಂಶ',
      conflictLabel: 'ಸಂಘರ್ಷ',
      conflictValue: 'ಕಳಿಂಗ ಯುದ್ಧ',
      dateLabel: 'ಅಂದಾಜು ಕಾಲ',
      dateValue: 'ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261 (ಅಶೋಕನ ಪಟ್ಟಾಭಿಷೇಕದ 8ನೇ ವರ್ಷ)',
      rulerLabel: 'ಮೌರ್ಯ ಆಡಳಿತಗಾರ',
      rulerValue: 'ಸಾಮ್ರಾಟ್ ಅಶೋಕ (ದೇವಾನಾಂಪ್ರಿಯ ಪ್ರಿಯದರ್ಶಿ)',
      polityLabel: 'ಎದುರಾಳಿ ರಾಜ್ಯ',
      polityValue: 'ಕಳಿಂಗ (ಪ್ರಾಚೀನ ಪೂರ್ವ ಭಾರತದ ಕರಾವಳಿ ಮತ್ತು ನದಿ ಕಣಿವೆ ಪ್ರದೇಶ, ಮುಖ್ಯವಾಗಿ ಇಂದಿನ ಒಡಿಶಾ)',
      sourceLabel: 'ಪ್ರಮುಖ ಐತಿಹಾಸಿಕ ಆಕರ',
      sourceValue: '13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನ (Major Rock Edict XIII) ಮತ್ತು ಪ್ರತ್ಯೇಕ ಕಳಿಂಗ ಶಾಸನಗಳು I–II',
      sitesLabel: 'ಪ್ರಮುಖ ಶಾಸನ ತಾಣಗಳು',
      sitesValue: 'ಧೌಲಿ (ಖೋರ್ಧಾ ಜಿಲ್ಲೆ) ಮತ್ತು ಜೌಗಡ (ಗಂಜಾಂ ಜಿಲ್ಲೆ), ಒಡಿಶಾ',
      significanceLabel: 'ಐತಿಹಾಸಿಕ ಮಹತ್ವ',
      significanceValue: 'ಅಶೋಕನು ವ್ಯಕ್ತಪಡಿಸಿದ ಪಶ್ಚಾತ್ತಾಪ ಮತ್ತು ನಂತರದ ಧಮ್ಮ, ಸಂಯಮ ಹಾಗೂ ಲೋಕಕಲ್ಯಾಣದ ನೀತಿ'
    },
    sections: {
      background: {
        code: 'ವಿಭಾಗ A',
        title: 'ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ: ಅಶೋಕ, ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಪ್ರಾಚೀನ ಕಳಿಂಗ',
        subtitle: 'ಕ್ರಿ.ಪೂ. 261ಕ್ಕಿಂತ ಮೊದಲು ಪೂರ್ವ ಭಾರತದ ಭೌಗೋಳಿಕ-ರಾಜಕೀಯ ಸಂದರ್ಭ',
        p1: 'ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯನ ಮೊಮ್ಮಗ ಮತ್ತು ಬಿಂದುಸಾರನ ಪುತ್ರನಾದ ಸಾಮ್ರಾಟ್ ಅಶೋಕನು (ಆಳ್ವಿಕೆ ಸುಮಾರು ಕ್ರಿ.ಪೂ. 268–232) ಪಾಟಲಿಪುತ್ರವನ್ನು (ಮಗಧ) ರಾಜಧಾನಿಯಾಗಿಸಿಕೊಂಡಿದ್ದ ಬೃಹತ್ ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಉತ್ತರಾಧಿಕಾರವಾಗಿ ಪಡೆದನು. ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದ ಆರಂಭದ ವೇಳೆಗೆ ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯವು ಉತ್ತರ, ಪಶ್ಚಿಮ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಬಹುಭಾಗಕ್ಕೆ ವಿಸ್ತರಿಸಿತ್ತು. ಆದರೆ ಪೂರ್ವ ಕರಾವಳಿಯ ಸಮೃದ್ಧ ಕಳಿಂಗ ಪ್ರದೇಶವು—ಮುಖ್ಯವಾಗಿ ಇಂದಿನ ಒಡಿಶಾ ಭಾಗ—ಸ್ವತಂತ್ರ ರಾಜ್ಯವಾಗಿ ಉಳಿದಿತ್ತು.',
        p2: 'ಪ್ರಾಚೀನ ಕಳಿಂಗವು ಗಂಗಾ ಬಯಲು ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ನಡುವಿನ ಪ್ರಮುಖ ವಾಣಿಜ್ಯ ಮತ್ತು ಸಮುದ್ರ ಮಾರ್ಗಗಳನ್ನು ನಿಯಂತ್ರಿಸುತ್ತಿತ್ತು. ಮಹಾನದಿ, ಬ್ರಾಹ್ಮಣಿ, ವೈತರಣಿ, ರುಷಿಕುಲ್ಯ ಮತ್ತು ದಯಾ ನದಿಗಳಿಂದ ಸಮೃದ್ಧವಾಗಿದ್ದ ಕಳಿಂಗದಲ್ಲಿ ಸುಭದ್ರ ಕೋಟೆ ನಗರಗಳು (ಇಂದಿನ ಭುವನೇಶ್ವರದ ಬಳಿಯ ಶಿಶುಪಾಲ್‌ಗಢ್ — ಪ್ರಾಚೀನ ತೋಷಾಲಿ/ಕಳಿಂಗನಗರ), ಆನೆ ಕಾಡುಗಳು ಮತ್ತು ಬಂಗಾಳಕೊಲ್ಲಿಯ ಬಂದರುಗಳಿದ್ದವು.',
        p3: 'ತನಗೆ ಪಟ್ಟಾಭಿಷೇಕವಾದ ಎಂಟನೇ ವರ್ಷದಲ್ಲಿ (ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261), ಕಳಿಂಗವನ್ನು ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ಸೇರಿಸಿಕೊಳ್ಳಲು ಮತ್ತು ಅದರ ವ್ಯಾಪಾರ ಮಾರ್ಗಗಳ ಮೇಲೆ ಹಿಡಿತ ಸಾಧಿಸಲು ಅಶೋಕನು ಬೃಹತ್ ಸೈನಿಕ ಕಾರ್ಯಾಚರಣೆಯನ್ನು ಕೈಗೊಂಡನು.',
        evidenceBoxTitle: 'ದೃಢೀಕೃತ ಸಾಕ್ಷ್ಯ ಮತ್ತು ನಂತರದ ಪರಂಪರೆಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸ',
        evidenceBoxText: 'ಕಳಿಂಗ ಯುದ್ಧದ ಪ್ರಾಥಮಿಕ ಸಾಕ್ಷ್ಯವು ಅಶೋಕನ 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನ ಹಾಗೂ ಧೌಲಿ ಮತ್ತು ಜೌಗಡದ ಶಾಸನಗಳಿಂದ ನೇರವಾಗಿ ದೊರೆಯುತ್ತದೆ. ಸಮಕಾಲೀನ ಶಾಸನಗಳಲ್ಲಿ ಅಂದಿನ ಕಳಿಂಗದ ರಾಜನ ಹೆಸರು ಅಥವಾ ಸೇನಾಪತಿಗಳ ಹೆಸರುಗಳು ಉಲ್ಲೇಖವಾಗಿಲ್ಲ.'
      },
      battle: {
        code: 'ವಿಭಾಗ B',
        title: 'ಕಳಿಂಗ ಯುದ್ಧ',
        subtitle: 'ಸೈನಿಕ ಕಾರ್ಯಾಚರಣೆ ಮತ್ತು ಕಳಿಂಗದ ತೀವ್ರ ಪ್ರತಿರೋಧ',
        p1: 'ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261ರಲ್ಲಿ ಮೌರ್ಯ ಸೈನ್ಯವು ಕಳಿಂಗವನ್ನು ಪ್ರವೇಶಿಸಿದಾಗ, ಕಳಿಂಗದ ಯೋಧರು ಮತ್ತು ಜನರಿಂದ ತೀವ್ರ ಪ್ರತಿರೋಧ ಎದುರಾಯಿತು. ಸಮಕಾಲೀನ ಶಾಸನಗಳಲ್ಲಿ ನಿರ್ದಿಷ್ಟ ಯುದ್ಧ ತಂತ್ರಗಳು ಅಥವಾ ಸೇನಾಪತಿಗಳ ಹೆಸರುಗಳಿಲ್ಲದಿದ್ದರೂ, ಸ್ವತಃ ಅಶೋಕನೇ ದಾಖಲಿಸಿದ ಅಪಾರ ಸಾವು-ನೋವಿನ ಸಂಖ್ಯೆಯು ಯುದ್ಧದ ಭೀಕರತೆಯನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ.',
        p2: 'ಈ ಯುದ್ಧವು ಕಳಿಂಗದ ಕೋಟೆ ನಗರಗಳು ಮತ್ತು ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಲ್ಲಿ ಭಾರೀ ವಿನಾಶವನ್ನುಂಟುಮಾಡಿತು. ಪ್ರಾಚೀನ ಭಾರತೀಯ ಯುದ್ಧದಲ್ಲಿ ಬಿಲ್ಲು, ಭರ್ಜಿ, ಗುರಾಣಿ ಮತ್ತು ಕತ್ತಿಗಳನ್ನು ಹಿಡಿದ ಕಾಲಾಳು ಪಡೆ, ರಥಗಳು ಮತ್ತು ಯುದ್ಧದ ಆನೆಗಳು ಭಾಗವಹಿಸಿದ್ದವು. ಯುದ್ಧದ ನೋವು ಕೇವಲ ಸೈನಿಕರಿಗೆ ಮಾತ್ರವಲ್ಲದೆ, ಗೃಹಸ್ಥರು, ವಿದ್ವಾಂಸರು, ಬ್ರಾಹ್ಮಣರು, ಶ್ರಮಣರು ಮತ್ತು ಸಾಮಾನ್ಯ ಕುಟುಂಬಗಳಿಗೂ ತಟ್ಟಿತು.',
        p3: 'ಯುದ್ಧದ ಅಂತ್ಯದಲ್ಲಿ ಕಳಿಂಗವನ್ನು ಗೆದ್ದು ಉತ್ತರದಲ್ಲಿ ತೋಷಾಲಿ (ಧೌಲಿ/ಶಿಶುಪಾಲ್‌ಗಢ್) ಮತ್ತು ದಕ್ಷಿಣದಲ್ಲಿ ಸಮಾಪ (ಜೌಗಡ) ಆಡಳಿತ ಕೇಂದ್ರಗಳನ್ನಾಗಿ ಮಾಡಿ ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯದಲ್ಲಿ ವಿಲೀನಗೊಳಿಸಲಾಯಿತು. ಆದರೆ ಆ ವಿಜಯದ ಮಾನವೀಯ ಬೆಲೆ ಅಶೋಕನ ಆಡಳಿತದ ದಿಕ್ಕನ್ನೇ ಬದಲಿಸಿತು.',
        historiographicalNote: 'ಇತಿಹಾಸಲೇಖನದ ಎಚ್ಚರಿಕೆ: ಭುವನೇಶ್ವರದ ಬಳಿಯ ಧೌಲಿ ಬೆಟ್ಟದ ಕೆಳಗಿರುವ ದಯಾ ನದಿಯ ತೀರವನ್ನು ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಕಳಿಂಗ ಯುದ್ಧಭೂಮಿಯೆಂದು ಗುರುತಿಸಲಾಗುತ್ತದೆ. ಧೌಲಿಯು ಅಧಿಕೃತ ಅಶೋಕನ ಶಾಸನ ತಾಣವಾಗಿದ್ದರೂ, ಮೂಲ ಶಾಸನಗಳು ಒಂದೇ ಒಂದು ನಿರ್ದಿಷ್ಟ ಯುದ್ಧ ಸ್ಥಳವನ್ನು ಹೆಸರಿಸಿಲ್ಲ.'
      },
      tragedy: {
        code: 'ವಿಭಾಗ C',
        title: 'ಮಾನವೀಯ ದುರಂತ: 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದ ಸಾಕ್ಷ್ಯ',
        subtitle: 'ಅಶೋಕನ ಶಾಸನದ ಪ್ರಕಾರ ಕಳಿಂಗದ ಜನರು ಅನುಭವಿಸಿದ ಯುದ್ಧದ ಪರಿಣಾಮಗಳು',
        p1: 'ಕಳಿಂಗದ ಜನರು ಅನುಭವಿಸಿದ ನೋವಿನ ಅತ್ಯಂತ ನೇರ ಐತಿಹಾಸಿಕ ದಾಖಲೆಯು ಸಾಮ್ರಾಟ್ ಅಶೋಕನ 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದಲ್ಲಿ (Major Rock Edict XIII) ಕಂಡುಬರುತ್ತದೆ. ತನ್ನ ಸೈನಿಕ ವಿಜಯವನ್ನು ಹೊಗಳಿಕೊಳ್ಳುವ ಬದಲು, ಯುದ್ಧದಿಂದ ಉಂಟಾದ ಸಾವು, ನೋವು ಮತ್ತು ಸ್ಥಳಾಂತರದ ದುರಂತವನ್ನು ಅಶೋಕನು ಇದರಲ್ಲಿ ವಿವರಿಸಿದ್ದಾನೆ.',
        edictHeading: 'ಅಶೋಕನ 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದಲ್ಲಿ ಉಲ್ಲೇಖಿಸಲಾದ ಅಂಕಿಅಂಶಗಳು',
        edictAttribution: '13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದ ಪ್ರಾಕೃತ ಮೂಲ ಪಠ್ಯದ ಪ್ರಕಾರ (ಶಹಬಾಜ್‌ಗರ್ಹಿ, ಮನ್ಸೆಹ್ರಾ, ಕಾಲ್ಸಿ, ಗಿರ್ನಾರ್ ಮತ್ತು ಎರ್ರಗುಡಿ ಶಾಸನಗಳು):',
        statDeathsNumber: '~1,00,000',
        statDeathsLabel: 'ಶಾಸನದ ಪ್ರಕಾರ ಯುದ್ಧದಲ್ಲಿ ಮಡಿದವರ ಅಂದಾಜು ಸಂಖ್ಯೆ',
        statDeportedNumber: '~1,50,000',
        statDeportedLabel: 'ಶಾಸನದ ಪ್ರಕಾರ ಸೆರೆಯಾಳುಗಳಾಗಿ ಅಥವಾ ಸ್ಥಳಾಂತರಗೊಂಡವರ ಸಂಖ್ಯೆ',
        statAftermathNumber: 'ಅದಕ್ಕೂ ಅನೇಕ ಪಟ್ಟು ಹೆಚ್ಚು',
        statAftermathLabel: 'ಶಾಸನದ ಪ್ರಕಾರ ಯುದ್ಧದ ನಂತರ ಗಾಯ, ಬರಗಾಲ ಮತ್ತು ರೋಗಗಳಿಂದ ಮೃತಪಟ್ಟವರು',
        methodologicalCaveat: 'ಮಹತ್ವದ ಐತಿಹಾಸಿಕ ಸ್ಪಷ್ಟನೆ: 1,00,000 ಸಾವುಗಳು ಮತ್ತು 1,50,000 ಜನರ ಸ್ಥಳಾಂತರದ ಈ ಅಂಕಿಅಂಶಗಳು ಯುದ್ಧದ ಭೀಕರತೆಯನ್ನು ತಿಳಿಸಲು ಅಶೋಕನ ಶಾಸನದಲ್ಲಿ ದಾಖಲಾದ ಸಂಖ್ಯೆಗಳಾಗಿವೆ. ಇವುಗಳನ್ನು ಆಧುನಿಕ ಜನಗಣತಿ ಅಂಕಿಅಂಶಗಳೆಂದು ಪರಿಗಣಿಸದೆ ಪ್ರಾಚೀನ ಶಾಸನಾತ್ಮಕ ಹೇಳಿಕೆಯೆಂದು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬೇಕು.'
      },
      remorse: {
        code: 'ವಿಭಾಗ D',
        title: 'ಅಶೋಕನ ಪಶ್ಚಾತ್ತಾಪ ಮತ್ತು ಧಮ್ಮದ ನೀತಿ',
        subtitle: 'ಆತ್ಮಾವಲೋಕನ, ಲೋಕಕಲ್ಯಾಣ ಮತ್ತು ಕಲ್ಲಿನಲ್ಲಿ ಕೆತ್ತಲಾದ ಆಡಳಿತ ಸೂತ್ರಗಳು',
        p1: 'ಕಳಿಂಗ ವಿಜಯದ ನಂತರ ದೇವಾನಾಂಪ್ರಿಯನಿಗೆ ತೀವ್ರ ಪಶ್ಚಾತ್ತಾಪ (ಅನುಶೋಚನ) ಉಂಟಾಯಿತು ಎಂದು 13ನೇ ಶಿಲಾಶಾಸನವು ತಿಳಿಸುತ್ತದೆ. ಯಾವುದೇ ತಪ್ಪು ಮಾಡದ ಗೃಹಸ್ಥರು, ಹಿರಿಯರನ್ನು ಗೌರವಿಸುವವರು, ಬ್ರಾಹ್ಮಣರು ಮತ್ತು ಶ್ರಮಣರು ಕೂಡ ತಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರ ಸಾವು ಮತ್ತು ಅಗಲಿಕೆಯಿಂದ ದುಃಖಿತರಾಗುತ್ತಾರೆ—ಮತ್ತು ಕಳಿಂಗದಲ್ಲಿ ನಡೆದ ಸಾವು-ನೋವುಗಳ ನೂರನೇ ಅಥವಾ ಸಾವಿರನೇ ಒಂದು ಭಾಗದಷ್ಟು ಇಂದು ಸಂಭವಿಸಿದರೂ ಅದು ಅಶೋಕನಿಗೆ ತೀವ್ರ ವೇದನೆ ತರುತ್ತದೆ ಎಂದು ದಾಖಲಿಸಲಾಗಿದೆ.',
        p2: 'ಇದರ ನಂತರ ಅಶೋಕನು "ಧಮ್ಮ" (ಧರ್ಮ) ನೀತಿಗೆ ಒತ್ತು ನೀಡಿದನು—ಅಹಿಂಸೆ, ಜೀವಿಗಳ প্রতি ದಯೆ, ಸತ್ಯ, ತಂದೆ-ತಾಯಿ ಮತ್ತು ಗುರುಗಳ ಗೌರವ, ಸರ್ವಧರ್ಮ ಸಹಿಷ್ಣುತೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕಲ್ಯಾಣ ಇದರ ತಿರುಳಾಗಿತ್ತು. ಜನರು ಮತ್ತು ಅಧಿಕಾರಿಗಳು ಓದಿ ಪಾಲಿಸಲು ಬಂಡೆಗಳ ಮತ್ತು ಸ್ತಂಭಗಳ ಮೇಲೆ ಶಾಸನಗಳನ್ನು ಕೆತ್ತಿಸಿದನು.',
        p3: 'ವಿಶೇಷವೆಂದರೆ, ಕಳಿಂಗದ ಜನರ ನೋವನ್ನು ಮರುಕಳಿಸದಿರಲು ಅಶೋಕನು 13ನೇ ಶಿಲಾಶಾಸನವನ್ನು ಕಳಿಂಗದಲ್ಲಿ ಕೆತ್ತಿಸಲಿಲ್ಲ. ಅದರ ಬದಲಾಗಿ ಒಡಿಶಾದ ಧೌಲಿ ಮತ್ತು ಜೌಗಡದಲ್ಲಿ ಎರಡು "ಪ್ರತ್ಯೇಕ ಕಳಿಂಗ ಶಾಸನಗಳನ್ನು" ಕೆತ್ತಿಸಿ, ತೋಷಾಲಿ ಮತ್ತು ಸಮಾಪದ ನ್ಯಾಯಾಧಿಕಾರಿಗಳಿಗೆ (ಮಹಾಮಾತ್ರರಿಗೆ) ನಿಷ್ಪಕ್ಷಪಾತ ಆಡಳಿತ ನಡೆಸುವಂತೆ ಆದೇಶಿಸಿ—"ಎಲ್ಲಾ ಮನುಷ್ಯರೂ ನನ್ನ ಮಕ್ಕಳೇ" (ಸವೇ ಮುನಿಸೇ ಪಜಾ ಮಮ) ಎಂದು ಘೋಷಿಸಿದನು.',
        scholarlyDebateNote: 'ವಿದ್ವತ್ಪೂರ್ಣ ದೃಷ್ಟಿಕೋನ: 13ನೇ ಶಾಸನದಲ್ಲಿನ ಅಶೋಕನ ಪಶ್ಚಾತ್ತಾಪವು ಮಹತ್ವದ ಐತಿಹಾಸಿಕ ದಾಖಲೆಯಾಗಿದ್ದರೂ, ಅವನ ವೈಯಕ್ತಿಕ ಬೌದ್ಧ ಧರ್ಮ ಸ್ವೀಕಾರದ ಕಾಲಾನುಕ್ರಮ ಮತ್ತು ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಆಡಳಿತದ ಪ್ರಾಯೋಗಿಕ ಅಂಶಗಳ ಕುರಿತು ಇತಿಹಾಸಕಾರರಲ್ಲಿ ಚರ್ಚೆಗಳಿವೆ.'
      },
      legacy: {
        code: 'ವಿಭಾಗ E',
        title: 'ಐತಿಹಾಸಿಕ ಪರಂಪರೆ: ಧೌಲಿ, ಜೌಗಡ ಮತ್ತು ಕಳಿಂಗದ ಸ್ಮರಣೆ',
        subtitle: 'ಒಡಿಶಾದ ಪುರಾತತ್ವ ಸ್ಮಾರಕಗಳು ಹಾಗೂ ಶಾಂತಿ ಮತ್ತು ಕರುಣೆಯ ಶಾಶ್ವತ ಪಾಠ',
        p1: 'ಕಳಿಂಗ ಯುದ್ಧವನ್ನು ವಿಶ್ವ ಇತಿಹಾಸದಲ್ಲಿ ಒಂದು ಪ್ರಮುಖ ತಿರುವು ಎಂದು ಪರಿಗಣಿಸಲಾಗಿದೆ. ಸೈನಿಕ ಶಕ್ತಿಯ ತುತ್ತತುದಿಯಲ್ಲಿದ್ದ ಸಾಮ್ರಾಟನೊಬ್ಬ ತನ್ನದೇ ವಿಜಯದಿಂದ ಉಂಟಾದ ಮಾನವೀಯ ನೋವನ್ನು ಸಾರ್ವಜನಿಕವಾಗಿ ದಾಖಲಿಸಿ, ಯುದ್ಧಭೇರಿಗಿಂತ (ಭೇರೀಘೋಷ) ಧರ್ಮವಿಜಯವೇ (ಧಮ್ಮಘೋಷ) ಶ್ರೇಷ್ಠವೆಂದು ಸಾರಿದನು.',
        p2: 'ಇಂದು ಒಡಿಶಾದಲ್ಲಿ ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆಯ (ASI) ಎರಡು ಪ್ರಮುಖ ತಾಣಗಳಲ್ಲಿ ಈ ಪರಂಪರೆ ಉಳಿದುಕೊಂಡಿದೆ: ಧೌಲಿ (ಭುವನೇಶ್ವರದ ಬಳಿ ದಯಾ ನದಿ ತೀರ) ಮತ್ತು ಜೌಗಡ (ಗಂಜಾಂ ಜಿಲ್ಲೆಯ ರುಷಿಕುಲ್ಯ ನದಿ ತೀರ). ಧೌಲಿಯಲ್ಲಿ ಅಶೋಕನ ಬ್ರಾಹ್ಮೀ ಶಾಸನಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಬಂಡೆಯನ್ನು ಕೊರೆದು ನಿರ್ಮಿಸಲಾದ ಮೌರ್ಯರ ಕಾಲದ ಆನೆಯ ಶಿಲ್ಪವು (ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನ) ಪೂರ್ವ ಭಾರತದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಶಿಲ್ಪಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.',
        p3: 'ನಂತರದ ಶತಮಾನಗಳಲ್ಲಿ ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯದ ಅವನತಿಯ ಬಳಿಕ ಕಳಿಂಗವು ಮತ್ತೆ ತನ್ನ ಸ್ವತಂತ್ರ ರಾಜಕೀಯ ಮತ್ತು ಸೈನಿಕ ಶಕ್ತಿಯನ್ನು ಸ್ಥಾಪಿಸಿತು—ಮುಖ್ಯವಾಗಿ ಕ್ರಿ.ಪೂ. 1ನೇ ಶತಮಾನದಲ್ಲಿ ಮಹಾಮೇಘವಾಹನ ಸಾಮ್ರಾಟ್ ಖಾರವೇಲನ ಆಳ್ವಿಕೆಯಲ್ಲಿ (ಹಾಥಿಗುಂಫಾ ಶಾಸನ) ಮತ್ತು ಮಧ್ಯಕಾಲೀನ ಯುಗದಲ್ಲಿ ಪೂರ್ವ ಗಂಗ ಹಾಗೂ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಅರಸರ ಕಾಲದಲ್ಲಿ ಓಡ್ರ ದೇಶವು ಪ್ರವರ್ಧಮಾನಕ್ಕೆ ಬಂದಿತು.',
        conclusionTitle: 'ಶಾಂತಿ ಮತ್ತು ಮಾನವೀಯತೆಯ ಸಂದೇಶ',
        conclusionText: 'ಎರಡು ಸಾವಿರ ವರ್ಷಗಳ ನಂತರವೂ ಧೌಲಿ ಮತ್ತು ಜೌಗಡದ ಶಾಸನಗಳು ಯುದ್ಧದ ವಿನಾಶಕ್ಕಿಂತ ಶಾಂತಿ, ಕರುಣೆ, ಸಂಯಮ ಮತ್ತು ಜನಕಲ್ಯಾಣವೇ ನಿಜವಾದ ರಾಜಧರ್ಮವೆಂಬ ಸಂದೇಶವನ್ನು ಸಾರುತ್ತಿವೆ.'
      }
    },
    scenesHeader: {
      badge: 'ದೃಶ್ಯ ಐತಿಹಾಸಿಕ ನಿರೂಪಣೆ • ದೃಶ್ಯಗಳು 1 ರಿಂದ 7',
      title: 'ಕಳಿಂಗ ಯುದ್ಧದ ದೃಶ್ಯ-ಆಧಾರಿತ ಐತಿಹಾಸಿಕ ಕಥನ',
      subtitle: 'ಪುರಾತತ್ವ ಸ್ಮಾರಕಗಳು, ಅಶೋಕನ ಮೂಲ ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಿದ ಶಿಲ್ಪಕಲಾ ಪುನರ್ನಿರ್ಮಾಣಗಳೊಂದಿಗೆ ಏಳು ಐತಿಹಾಸಿಕ ದೃಶ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
      viewDossierBtn: 'ಸಂಪೂರ್ಣ ದೃಶ್ಯ ವಿವರ ಮತ್ತು ಶಾಸನ ಮಾಹಿತಿ ತೆರೆಯಿರಿ',
      companionImageLabel: 'ಪೂರಕ ದಾಖಲೆ ಚಿತ್ರ',
      sourceAttributionLabel: 'ಆಕರ ಮತ್ತು ಕೃತಜ್ಞತೆ'
    },
    scenes: [
      {
        id: 'scene_1_ancient_kalinga',
        sceneNumber: 'ದೃಶ್ಯ 1',
        title: 'ಪ್ರಾಚೀನ ಕಳಿಂಗ: ಸುಭದ್ರ ಕೋಟೆ ನಗರಗಳು ಮತ್ತು ನದಿ ಬಯಲುಗಳು',
        visualTypeBadge: 'ಪುರಾತತ್ವ ತಾಣದ ಛಾಯಾಚಿತ್ರ (ಶಿಶುಪಾಲ್‌ಗಢ್ / ತೋಷಾಲಿ)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_sisupalgarh_columns.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_sisupalgarh_ramparts.jpg',
        imageAlt: 'ಭುವನೇಶ್ವರದ ಬಳಿಯ ಪ್ರಾಚೀನ ಶಿಶುಪಾಲ್‌ಗಢ್ ಕೋಟೆ ನಗರದ ಜಂಬುಇಟ್ಟಿಗೆ ಕಲ್ಲಿನ ಸ್ತಂಭಗಳು.',
        secondaryImageAlt: 'ಶಿಶುಪಾಲ್‌ಗಢ್ ಕೋಟೆಯ ಉತ್ಖನನ ಮಾಡಲಾದ ಕಲ್ಲಿನ ದ್ವಾರ ಮತ್ತು ಕೋಟೆ ಗೋಡೆಗಳು.',
        narrative: 'ಕ್ರಿ.ಪೂ. 261ರ ಮೌರ್ಯ ದಂಡಯಾತ್ರೆಗಿಂತ ಮೊದಲು ಪ್ರಾಚೀನ ಕಳಿಂಗವು ಪೂರ್ವ ಭಾರತದ ಸಮೃದ್ಧ ನಾಗರಿಕತೆಯಾಗಿತ್ತು. ಭುವನೇಶ್ವರದ ಬಳಿಯ ಶಿಶುಪಾಲ್‌ಗಢ್ (ಪ್ರಾಚೀನ ಕಳಿಂಗನಗರ / ತೋಷಾಲಿ) ಉತ್ಖನನದಲ್ಲಿ ಬೃಹತ್ ಕೋಟೆ ಗೋಡೆಗಳು, ಎಂಟು ಹೆಬ್ಬಾಗಿಲುಗಳು, ಕಂದಕ ಮತ್ತು ಸ್ತಂಭ ಮಂಟಪಗಳಿರುವ ಯೋಜಿತ ನಗರ ಬೆಳಕಿಗೆ ಬಂದಿದೆ.',
        caption: 'ಚಿತ್ರ 1A — ಶಿಶುಪಾಲ್‌ಗಢ್ (ಭುವನೇಶ್ವರ, ಒಡಿಶಾ) ಕೋಟೆ ನಗರದ ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಸ್ತಂಭಗಳು.',
        secondaryCaption: 'ಚಿತ್ರ 1B — ಶಿಶುಪಾಲ್‌ಗಢ್ ಕೋಟೆಯ ಉತ್ಖನನ ಮಾಡಲಾದ ಪಶ್ಚಿಮ ಹೆಬ್ಬಾಗಿಲು ಮತ್ತು ಕೋಟೆ ಗೋಡೆ (ASI ಸಂರಕ್ಷಿತ ಸ್ಮಾರಕ).',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ / ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (CC BY-SA 4.0).',
        historicalNote: 'ಪುರಾತತ್ವ ಸಾಕ್ಷ್ಯ: 1948ರಲ್ಲಿ ಬಿ.ಬಿ. ಲಾಲ್ ನಡೆಸಿದ ಉತ್ಖನನವು ಶಿಶುಪಾಲ್‌ಗಢ್ ಪ್ರಾಚೀನ ಭಾರತದ ಪ್ರಮುಖ ಯೋಜಿತ ಕೋಟೆ ನಗರವಾಗಿತ್ತು ಎಂದು ದೃಢಪಡಿಸಿದೆ.'
      },
      {
        id: 'scene_2_mauryan_campaign',
        sceneNumber: 'ದೃಶ್ಯ 2',
        title: 'ಕಳಿಂಗದತ್ತ ಮೌರ್ಯ ಸೈನಿಕ ಅಭಿಯಾನ',
        visualTypeBadge: 'ಶಿಲ್ಪಕಲಾ ಐತಿಹಾಸಿಕ ಪುನರ್ನಿರ್ಮಾಣ ಮತ್ತು ಭೌಗೋಳಿಕ ನಕ್ಷೆ',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_mauryan_procession_relief.jpg',
        secondaryImageUrl: '/assets/archive/odra_kalinga_map.jpg',
        imageAlt: 'ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪದಲ್ಲಿ ಪ್ರಾಚೀನ ರಥ, ಕುದುರೆಗಳು ಮತ್ತು ಸೈನಿಕರ ಪ್ರಯಾಣವನ್ನು ತೋರಿಸುವ ಕಲ್ಲಿನ ಉಬ್ಬುಶಿಲ್ಪ.',
        secondaryImageAlt: 'ಪೂರ್ವ ಕರಾವಳಿಯ ಪ್ರಾಚೀನ ಕಳಿಂಗ ಪ್ರದೇಶವನ್ನು ತೋರಿಸುವ ಐತಿಹಾಸಿಕ ನಕ್ಷೆ.',
        narrative: 'ತನ್ನ ಆಳ್ವಿಕೆಯ ಎಂಟನೇ ವರ್ಷದಲ್ಲಿ (ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261), ಸ್ವತಂತ್ರ ಕಳಿಂಗವನ್ನು ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ಸೇರಿಸಲು ಅಶೋಕನು ಸೈನಿಕ ಕಾರ್ಯಾಚರಣೆ ನಡೆಸಿದನು. ಬಿಲ್ಲು, ಭರ್ಜಿ, ಗುರಾಣಿ ಹಿಡಿದ ಕಾಲಾಳುಗಳು, ರಥಗಳು ಮತ್ತು ಯುದ್ಧದ ಆನೆಗಳೊಂದಿಗೆ ಮೌರ್ಯ ಸೈನ್ಯವು ಮುನ್ನಡೆಯಿತು.',
        caption: 'ಚಿತ್ರ 2A — ಕೋಟೆಯಿಂದ ಹೊರಟ ಪ್ರಾಚೀನ ರಾಜ ರಥ ಮತ್ತು ಸೈನಿಕ ಪರಿವಾರವನ್ನು ತೋರಿಸುವ ಧೌಲಿ ಉಬ್ಬುಶಿಲ್ಪ (ಕಲಾತ್ಮಕ/ಶಿಲ್ಪಕಲಾ ಪುನರ್ನಿರ್ಮಾಣ).',
        secondaryCaption: 'ಚಿತ್ರ 2B — ಗಂಗಾ ಬಯಲು ಮತ್ತು ದಖನ್ ನಡುವೆ ಕಳಿಂಗದ ಆಯಕಟ್ಟಿನ ಸ್ಥಾನವನ್ನು ತೋರಿಸುವ ಐತಿಹಾಸಿಕ ನಕ್ಷೆ.',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ — ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪ ಉಬ್ಬುಶಿಲ್ಪ (CC BY-SA 4.0) ಮತ್ತು ಐತಿಹಾಸಿಕ ನಕ್ಷೆ ಸಂಗ್ರಹ.',
        historicalNote: 'ಐತಿಹಾಸಿಕ ಟಿಪ್ಪಣಿ: ಕಳಿಂಗ ಅಭಿಯಾನದಲ್ಲಿ ಭಾಗವಹಿಸಿದ ಸೈನಿಕರ ನಿಖರ ಸಂಖ್ಯೆಯನ್ನು ಅಶೋಕನ ಶಾಸನಗಳು ಉಲ್ಲೇಖಿಸಿಲ್ಲ.'
      },
      {
        id: 'scene_3_the_battle',
        sceneNumber: 'ದೃಶ್ಯ 3',
        title: 'ಕಳಿಂಗ ಯುದ್ಧ: ಸೈನ್ಯಗಳ ಭೀಕರ ಹೋರಾಟ',
        visualTypeBadge: 'ಸ್ಮಾರಕ ಉಬ್ಬುಶಿಲ್ಪ ಪುನರ್ನಿರ್ಮಾಣ ಮತ್ತು ದಯಾ ನದಿ ಬಯಲು',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_war_buddhavanam_relief.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'ಯುದ್ಧದ ಆನೆಗಳು, ಗುರಾಣಿಗಳು, ಭರ್ಜಿಗಳು ಮತ್ತು ಪ್ರಾಚೀನ ಯೋಧರೊಂದಿಗೆ ಕಳಿಂಗ ಯುದ್ಧವನ್ನು ತೋರಿಸುವ ಉಬ್ಬುಶಿಲ್ಪ.',
        secondaryImageAlt: 'ಧೌಲಿ ಬೆಟ್ಟದಿಂದ ಕಾಣುವ ದಯಾ ನದಿ ಬಯಲಿನ ನೋಟ.',
        narrative: 'ಕಳಿಂಗದಲ್ಲಿ ನಡೆದ ಯುದ್ಧವು ಅತ್ಯಂತ ಭೀಕರವಾಗಿತ್ತು. ಕಳಿಂಗದ ಯೋಧರು ತಮ್ಮ ನಾಡಿನ ರಕ್ಷಣೆಗಾಗಿ ತೀವ್ರವಾಗಿ ಹೋರಾಡಿದರು. ಯುದ್ಧದ ಆನೆಗಳು, ರಥಗಳು ಮತ್ತು ಕಾಲಾಳು ಪಡೆಗಳ ನಡುವಿನ ಸಂಘರ್ಷದಲ್ಲಿ ಉಭಯ ಕಡೆಗಳಲ್ಲಿ ಭಾರೀ ಸಾವು-ನೋವು ಸಂಭವಿಸಿತು.',
        caption: 'ಚಿತ್ರ 3A — ಕಳಿಂಗ ಯುದ್ಧದಲ್ಲಿ ಆನೆಗಳು ಮತ್ತು ಕಾಲಾಳುಗಳ ಹೋರಾಟವನ್ನು ತೋರಿಸುವ ಸ್ಮಾರಕ ಉಬ್ಬುಶಿಲ್ಪ ("King Asoka’s Kalinga War", ಬುದ್ಧವನಂ ಸ್ತೂಪ ಉಬ್ಬುಶಿಲ್ಪ — ಆಧುನಿಕ ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣ).',
        secondaryCaption: 'ಚಿತ್ರ 3B — ಭುವನೇಶ್ವರದ ಬಳಿಯ ಧೌಲಿ ಬೆಟ್ಟದಿಂದ ದಯಾ ನದಿ ಬಯಲಿನ ನೋಟ.',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ — ಆನಂದಜೋತಿ ಭಿಕ್ಕು ಛಾಯಾಚಿತ್ರ (CC BY-SA 4.0) ಮತ್ತು ದಯಾ ನದಿ ನೋಟ (CC BY-SA 3.0).',
        historicalNote: 'ವೈಜ್ಞಾನಿಕ ಸೂಚನೆ: ಮೂಲ ಶಾಸನಗಳು ನಿರ್ದಿಷ್ಟ ಯುದ್ಧ ರಚನೆಗಳನ್ನು ಅಥವಾ ಕಳಿಂಗ ಸೇನಾಪತಿಗಳ ಹೆಸರುಗಳನ್ನು ದಾಖಲಿಸಿಲ್ಲ.'
      },
      {
        id: 'scene_4_human_cost',
        sceneNumber: 'ದೃಶ್ಯ 4',
        title: 'ಮಾನವೀಯ ಬೆಲೆ: ಸ್ಥಳಾಂತರ, ನೋವು ಮತ್ತು ಪ್ರಾಣಹಾನಿ',
        visualTypeBadge: 'ಧೌಲಿ ಬೆಟ್ಟದ ಸ್ಮಾರಕ ಶಿಲ್ಪ (ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣ)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_daya_river_battlefield.jpg',
        imageAlt: 'ಕಳಿಂಗ ಯುದ್ಧದ ಮಾನವೀಯ ದುರಂತ ಮತ್ತು ಸಂತ್ರಸ್ತರ ದುಃಖವನ್ನು ತೋರಿಸುವ ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪದ ಬಿಳಿ ಕಲ್ಲಿನ ಉಬ್ಬುಶಿಲ್ಪ.',
        secondaryImageAlt: 'ಧೌಲಿ ಬೆಟ್ಟದ ಕೆಳಗಿನ ದಯಾ ನದಿ ಕಣಿವೆ.',
        narrative: '13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದ ಪ್ರಕಾರ ಯುದ್ಧದಲ್ಲಿ ಸುಮಾರು 1,00,000 ಜನರು ಮಡಿದರು, 1,50,000 ಜನರು ಸೆರೆಯಾಳುಗಳಾಗಿ ಅಥವಾ ಸ್ಥಳಾಂತರಗೊಂಡರು ಮತ್ತು ನಂತರ ಅದಕ್ಕೂ ಅನೇಕ ಪಟ್ಟು ಹೆಚ್ಚು ಜನರು ಸಾವನ್ನಪ್ಪಿದರು. ಸಾಮಾನ್ಯ ಕುಟುಂಬಗಳು, ವಿದ್ವಾಂಸರು ಮತ್ತು ಗೃಹಸ್ಥರು ತೀವ್ರ ವೇದನೆ ಅನುಭವಿಸಿದರು.',
        caption: 'ಚಿತ್ರ 4A — ಕಳಿಂಗ ಯುದ್ಧದ ಮಾನವೀಯ ದುರಂತವನ್ನು ಚಿತ್ರಿಸುವ ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪದ ಉಬ್ಬುಶಿಲ್ಪ (20ನೇ ಶತಮಾನದ ಸ್ಮಾರಕ ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣ).',
        secondaryCaption: 'ಚಿತ್ರ 4B — ಧೌಲಿ ಗಿರಿಯ ಕೆಳಗಿನ ದಯಾ ನದಿ ಬಯಲು.',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ — ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪ ಪ್ಯಾನೆಲ್ 7 (CC BY-SA 4.0).',
        historicalNote: 'ಆಕರ ಮಾಹಿತಿ: 1,00,000 ಸಾವುಗಳು ಮತ್ತು 1,50,000 ಸ್ಥಳಾಂತರದ ಅಂಕಿಅಂಶಗಳು ನೇರವಾಗಿ ಅಶೋಕನ 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನದಿಂದ ಬಂದಿವೆ.'
      },
      {
        id: 'scene_5_ashoka_remorse',
        sceneNumber: 'ದೃಶ್ಯ 5',
        title: 'ಅಶೋಕನ ಪಶ್ಚಾತ್ತಾಪ: ಯುದ್ಧದ ಪರಿಣಾಮಗಳ ಕುರಿತು ಚಿಂತನೆ',
        visualTypeBadge: 'ಕಲಾತ್ಮಕ ಮತ್ತು ಶಿಲ್ಪಕಲಾ ಪುನರ್ನಿರ್ಮಾಣ (ಧೌಲಿ ಗಿರಿ)',
        isArtisticReconstruction: true,
        imageUrl: '/assets/archive/kalinga_ashoka_remorse_sword_dhauli.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_battle_relief_dhauli.jpg',
        imageAlt: 'ಸಾಮ್ರಾಟ್ ಅಶೋಕನು ಪಶ್ಚಾತ್ತಾಪದಿಂದ ತಲೆಬಾಗಿ ತನ್ನ ಕತ್ತಿಯನ್ನು ಬುದ್ಧನ ಮುಂದೆ ಅರ್ಪಿಸುತ್ತಿರುವ ಧೌಲಿ ಉಬ್ಬುಶಿಲ್ಪ.',
        secondaryImageAlt: 'ಯುದ್ಧದ ವಿನಾಶವನ್ನು ಕಂಡು ದುಃಖಿಸುತ್ತಿರುವ ಅಶೋಕನ ಧೌಲಿ ಉಬ್ಬುಶಿಲ್ಪ.',
        narrative: 'ಕಳಿಂಗದ ಭೀಕರ ಸಾವು-ನೋವುಗಳನ್ನು ಕಂಡು ಅಶೋಕನು ತೀವ್ರ ಪಶ್ಚಾತ್ತಾಪಕ್ಕೆ (ಅನುಶೋಚನ) ಒಳಗಾದನು. ಸೈನಿಕ ವಿಜಯಕ್ಕಿಂತ ಧಮ್ಮ ವಿಜಯವೇ (ಕರುಣೆ, ಅಹಿಂಸೆ ಮತ್ತು ಸಂಯಮ) ಶ್ರೇಷ್ಠವೆಂದು ಸಾರಿ ಲೋಕಕಲ್ಯಾಣಕ್ಕೆ ಮುಂದಾದನು.',
        caption: 'ಚಿತ್ರ 5A — ಅಶೋಕನು ಪಶ್ಚಾತ್ತಾಪದಿಂದ ತನ್ನ ಖಡ್ಗವನ್ನು ತ್ಯಜಿಸುತ್ತಿರುವ ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪದ ಉಬ್ಬುಶಿಲ್ಪ (ಇದು ಸಾಂಕೇತಿಕ ಕಲಾತ್ಮಕ ಪುನರ್ನಿರ್ಮಾಣ, ಸಮಕಾಲೀನ ಭಾವಚಿತ್ರವಲ್ಲ).',
        secondaryCaption: 'ಚಿತ್ರ 5B — ಕಳಿಂಗದ ಸಾವು-ನೋವುಗಳನ್ನು ಕಂಡು ಶೋಕಿಸುತ್ತಿರುವ ಅಶೋಕನ ಪೂರಕ ಶಿಲ್ಪ.',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ — ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪ ಪ್ಯಾನೆಲ್ 9 ಮತ್ತು ಪ್ಯಾನೆಲ್ 7 (CC BY-SA 4.0).',
        historicalNote: 'ಐತಿಹಾಸಿಕ ಸಮತೋಲನ: ಯುದ್ಧದ ನಂತರ ಅಶೋಕನಲ್ಲಿ ಧಮ್ಮ ಮತ್ತು ಬೌದ್ಧ ತತ್ವಗಳ ಬಗೆಗಿನ ಬದ್ಧತೆ ಹಂತಹಂತವಾಗಿ ಬೆಳೆಯಿತು ಎಂದು ಅವನ ಶಾಸನಗಳು ತೋರಿಸುತ್ತವೆ.'
      },
      {
        id: 'scene_6_ashokan_rock_edicts',
        sceneNumber: 'ದೃಶ್ಯ 6',
        title: 'ಧೌಲಿ ಮತ್ತು ಜೌಗಡದ ಅಶೋಕನ ಶಿಲಾಶಾಸನಗಳು',
        visualTypeBadge: 'ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದ ನೈಜ ಶಿಲಾಶಾಸನ ಛಾಯಾಚಿತ್ರಗಳು (ಒಡಿಶಾ)',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_rock_edicts.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_jaugada_rock_edict.jpg',
        imageAlt: 'ಒಡಿಶಾದ ಧೌಲಿಯಲ್ಲಿ ಗ್ರಾನೈಟ್ ಬಂಡೆಯ ಮೇಲೆ ಪ್ರಾಕೃತ ಬ್ರಾಹ್ಮೀ ಲಿಪಿಯಲ್ಲಿ ಕೆತ್ತಲಾದ ಅಶೋಕನ ಶಿಲಾಶಾಸನದ ನೈಜ ಛಾಯಾಚಿತ್ರ.',
        secondaryImageAlt: 'ಒಡಿಶಾದ ಗಂಜಾಂ ಜಿಲ್ಲೆಯ ಜೌಗಡದಲ್ಲಿರುವ ಅಶೋಕನ ಶಿಲಾಶಾಸನ ಬಂಡೆಯ ನೈಜ ಛಾಯಾಚಿತ್ರ.',
        narrative: 'ಧೌಲಿ (ಭುವನೇಶ್ವರದ ಬಳಿ) ಮತ್ತು ಜೌಗಡದಲ್ಲಿ (ಗಂಜಾಂ ಜಿಲ್ಲೆ) ನೈಸರ್ಗಿಕ ಬಂಡೆಗಳ ಮೇಲೆ ಪ್ರಾಕೃತ ಭಾಷೆ ಮತ್ತು ಬ್ರಾಹ್ಮೀ ಲಿಪಿಯಲ್ಲಿ ಅಶೋಕನು ತನ್ನ ಶಾಸನಗಳನ್ನು ಕೆತ್ತಿಸಿದನು. ಕಳಿಂಗದಲ್ಲಿ 13ನೇ ಶಾಸನದ ಬದಲಿಗೆ ಎರಡು "ಪ್ರತ್ಯೇಕ ಕಳಿಂಗ ಶಾಸನಗಳನ್ನು" ಕೆತ್ತಿಸಿ, "ಎಲ್ಲಾ ಮನುಷ್ಯರೂ ನನ್ನ ಮಕ್ಕಳೇ" ಎಂದು ಸಾರಿದನು.',
        caption: 'ಚಿತ್ರ 6A — ಧೌಲಿ (ಖೋರ್ಧಾ ಜಿಲ್ಲೆ, ಒಡಿಶಾ) ಬಂಡೆಯ ಮೇಲೆ ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದ ಬ್ರಾಹ್ಮೀ ಲಿಪಿಯಲ್ಲಿ ಕೆತ್ತಲಾದ ಅಶೋಕನ ಶಿಲಾಶಾಸನದ ನೈಜ ಛಾಯಾಚಿತ್ರ (ASI ಸಂರಕ್ಷಿತ ಸ್ಮಾರಕ).',
        secondaryCaption: 'ಚಿತ್ರ 6B — ಜೌಗಡ (ಪ್ರಾಚೀನ ಸಮಾಪ, ಗಂಜಾಂ ಜಿಲ್ಲೆ, ಒಡಿಶಾ) ಅಶೋಕನ ಶಿಲಾಶಾಸನದ ನೈಜ ಛಾಯಾಚಿತ್ರ (ASI ಸಂರಕ್ಷಿತ ಸ್ಮಾರಕ).',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ — ASI ಸ್ಮಾರಕ N-OR-59 (ಧೌಲಿ) ಮತ್ತು ಜೌಗಡ ಶಿಲಾಶಾಸನ ಛಾಯಾಚಿತ್ರಗಳು (CC BY-SA 4.0 / Public Domain).',
        historicalNote: 'ಪ್ರಾಥಮಿಕ ಶಾಸನ ಸಾಕ್ಷ್ಯ: 1837ರಲ್ಲಿ ಜೇಮ್ಸ್ ಪ್ರಿನ್ಸೆಪ್ ಓದಿದ ಈ ಶಾಸನಗಳು ಒಡಿಶಾದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಲಿಖಿತ ಸ್ಮಾರಕಗಳಾಗಿವೆ.'
      },
      {
        id: 'scene_7_message_of_peace',
        sceneNumber: 'ದೃಶ್ಯ 7',
        title: 'ಶಾಂತಿಯ ಸಂದೇಶ: ಧೌಲಿಯ ಕಲ್ಲಿನ ಆನೆ ಮತ್ತು ಧಮ್ಮ ಕಲ್ಯಾಣ',
        visualTypeBadge: 'ಮೌರ್ಯರ ಕಾಲದ ನೈಜ ಶಿಲ್ಪ (ಕ್ರಿ.ಪೂ. 261–250) ಮತ್ತು ಶಾಂತಿ ಸ್ತೂಪ',
        isArtisticReconstruction: false,
        imageUrl: '/assets/archive/kalinga_dhauli_elephant_edict.jpg',
        secondaryImageUrl: '/assets/archive/kalinga_dhauli_shanti_stupa.jpg',
        imageAlt: 'ಧೌಲಿಯಲ್ಲಿ ಅಶೋಕನ ಶಾಸನಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ಬಂಡೆಯನ್ನು ಕೊರೆದು ನಿರ್ಮಿಸಲಾದ ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದ ಮೌರ್ಯರ ಕಾಲದ ಆನೆಯ ಶಿಲ್ಪ.',
        secondaryImageAlt: 'ಭುವನೇಶ್ವರದ ಬಳಿಯ ಧೌಲಿ ಗಿರಿ ಬೆಟ್ಟದ ಮೇಲಿರುವ ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪ.',
        narrative: 'ಧೌಲಿ ಶಾಸನಗಳ ಮೇಲ್ಭಾಗದಲ್ಲಿ ನೈಸರ್ಗಿಕ ಬಂಡೆಯಿಂದ ಹೊರಬರುತ್ತಿರುವಂತೆ ಕೆತ್ತಲಾದ ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದ ಮೌರ್ಯರ ಕಲ್ಲಿನ ಆನೆಯು ಬುದ್ಧ, ಶಾಂತಿ ಮತ್ತು ಕರುಣೆಯ ಸಂಕೇತವಾಗಿದೆ. ರಸ್ತೆಗಳ ಬದಿಯಲ್ಲಿ ನೆರಳಿನ ಮರಗಳನ್ನು ನೆಡುವುದು, ಬಾವಿಗಳನ್ನು ತೋಡಿಸುವುದು, ವಿಶ್ರಾಂತಿ ಗೃಹಗಳು ಹಾಗೂ ಮನುಷ್ಯರು ಮತ್ತು ಪ್ರಾಣಿಗಳಿಗೆ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ನೀಡುವ ಕಲ್ಯಾಣ ಕಾರ್ಯಗಳನ್ನು ಅಶೋಕನ ಶಾಸನಗಳು ವಿವರಿಸುತ್ತವೆ.',
        caption: 'ಚಿತ್ರ 7A — ಧೌಲಿ ಶಿಲಾಶಾಸನದ ಮೇಲಿರುವ ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದ ಮೌರ್ಯರ ಕಲ್ಲಿನ ಆನೆಯ ಶಿಲ್ಪ—ಒಡಿಶಾದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಕಲ್ಲಿನ ಶಿಲ್ಪ.',
        secondaryCaption: 'ಚಿತ್ರ 7B — ಶಾಂತಿ ಮತ್ತು ಅಹಿಂಸೆಯ ಸ್ಮರಣಾರ್ಥ 1972ರಲ್ಲಿ ಧೌಲಿ ಬೆಟ್ಟದ ಮೇಲೆ ನಿರ್ಮಿಸಲಾದ ಶಾಂತಿ ಸ್ತೂಪ.',
        attribution: 'ವಿಕಿಮೀಡಿಯಾ ಕಾಮನ್ಸ್ — ಧೌಲಿ ಆನೆ ಶಿಲ್ಪ (CC BY-SA 4.0) ಮತ್ತು ಧೌಲಿ ಶಾಂತಿ ಸ್ತೂಪ (CC BY-SA 3.0).',
        historicalNote: 'ಐತಿಹಾಸಿಕ ವಿಶೇಷ: ಧೌಲಿ ಶಾಸನದ ಕೊನೆಯಲ್ಲಿ "ಸೇತೋ" (ಬಿಳಿ ಆನೆ) ಎಂಬ ಪ್ರಾಕೃತ ಪದವು ಬುದ್ಧನ ಸಂಕೇತವಾಗಿ ಕೆತ್ತಲ್ಪಟ್ಟಿದೆ.'
      }
    ],
    referencesHeader: {
      badge: 'ದೃಢೀಕೃತ ಆಕರಗಳು ಮತ್ತು ಪರಾಮರ್ಶನ ಗ್ರಂಥಗಳು',
      title: 'ಪ್ರಾಥಮಿಕ ಶಾಸನ ಸಂಪುಟಗಳು, ಪುರಾತತ್ವ ವರದಿಗಳು ಮತ್ತು ವಿದ್ವತ್ ಕೃತಿಗಳು',
      subtitle: 'ಕಳಿಂಗ ಯುದ್ಧ ಹಾಗೂ ಧೌಲಿ ಮತ್ತು ಜೌಗಡ ಶಾಸನಗಳನ್ನು ದಾಖಲಿಸಿರುವ ಅಧಿಕೃತ ಶಾಸನ ಸಂಪುಟಗಳು ಮತ್ತು ಭಾರತೀಯ ಪುರಾತತ್ವ ಇಲಾಖೆಯ ಪ್ರಕಟಣೆಗಳು.',
      visitSourceBtn: 'ಆಕರ ಗ್ರಂಥವನ್ನು ತೆರೆಯಿರಿ'
    },
    references: [
      {
        id: 'ref_hultzsch_cii',
        title: 'Corpus Inscriptionum Indicarum, Vol. I: Inscriptions of Asoka',
        authorOrAuthority: 'ಯೂಜೆನ್ ಹುಲ್ಟ್‌ಶ್ (Eugen Hultzsch — ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ / ಆಕ್ಸ್‌ಫರ್ಡ್, 1925)',
        category: 'epigraphic_primary',
        categoryLabel: 'ಪ್ರಾಥಮಿಕ ಶಾಸನ ಸಂಪುಟ',
        description: 'ಅಶೋಕನ 13ನೇ ಬೃಹತ್ ಶಿಲಾಶಾಸನ ಹಾಗೂ ಧೌಲಿ ಮತ್ತು ಜೌಗಡದ ಪ್ರತ್ಯೇಕ ಕಳಿಂಗ ಶಾಸನಗಳ ಮೂಲ ಪ್ರಾಕೃತ ಪಠ್ಯ ಮತ್ತು ಅನುವಾದವನ್ನು ಒಳಗೊಂಡ ಪ್ರಮಾಣಿತ ಗ್ರಂథ.',
        url: 'https://archive.org/details/in.ernet.dli.2015.49403'
      },
      {
        id: 'ref_asi_dhauli_jaugada',
        title: 'ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI) — ಧೌಲಿ ಮತ್ತು ಜೌಗಡ ಸ್ಮಾರಕ ದಾಖಲೆಗಳು',
        authorOrAuthority: 'ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ (ASI), ಭುವನೇಶ್ವರ ವೃತ್ತ, ಭಾರತ ಸರ್ಕಾರ',
        category: 'archaeological_survey',
        categoryLabel: 'ಅಧಿಕೃತ ಪುರಾತತ್ವ ದಾಖಲೆ',
        description: 'ಒಡಿಶಾದ ಧೌಲಿ (ಖೋರ್ಧಾ ಜಿಲ್ಲೆ) ಕಲ್ಲಿನ ಆನೆ ಮತ್ತು ಶಾಸನಗಳು ಹಾಗೂ ಜೌಗಡ (ಗಂಜಾಂ ಜಿಲ್ಲೆ) ಕೋಟೆ ಮತ್ತು ಶಾಸನಗಳ ಅಧಿಕೃತ ದಾಖಲೆ.',
        url: 'https://asi.nic.in/'
      },
      {
        id: 'ref_thapar_ashoka',
        title: 'Aśoka and the Decline of the Mauryas',
        authorOrAuthority: 'ರೊಮಿಲಾ ಥಾಪರ್ (ಆಕ್ಸ್‌ಫರ್ಡ್ ಯೂನಿವರ್ಸಿಟಿ ಪ್ರೆಸ್)',
        category: 'scholarly_translation',
        categoryLabel: 'ಆಧುನಿಕ ಐತಿಹಾಸಿಕ ಸಂಶೋಧನಾ ಗ್ರಂಥ',
        description: 'ಅಶೋಕನ ಆಳ್ವಿಕೆ, ಕಳಿಂಗ ಅಭಿಯಾನದ (ಸುಮಾರು ಕ್ರಿ.ಪೂ. 261) ಕಾರಣಗಳು, 13ನೇ ಶಿಲಾಶಾಸನ ಮತ್ತು ಧಮ್ಮ ನೀತಿಯ ಸಮಗ್ರ ವಿಶ್ಲೇಷಣೆ.',
        url: 'https://global.oup.com/academic/product/asoka-and-the-decline-of-the-mauryas-9780198077244'
      },
      {
        id: 'ref_lahiri_ashoka',
        title: 'Ashoka in Ancient India',
        authorOrAuthority: 'ನಯನಜೋತ್ ಲಾಹಿರಿ (ಹಾರ್ವರ್ಡ್ ಯೂನಿವರ್ಸಿಟಿ ಪ್ರೆಸ್, 2015)',
        category: 'scholarly_translation',
        categoryLabel: 'ಪುರಾತತ್ವ ಮತ್ತು ಐತಿಹಾಸಿಕ ಅಧ್ಯಯನ',
        description: 'ಮೌರ್ಯರ ಕಾಲದ ಪುರಾತತ್ವ, ಪ್ರಾಚೀನ ಕಳಿಂಗದ (ಶಿಶುಪಾಲ್‌ಗಢ್/ತೋಷಾಲಿ ಮತ್ತು ಜೌಗಡ/ಸಮಾಪ) ಭೌಗೋಳಿಕತೆ ಮತ್ತು ಪ್ರತ್ಯೇಕ ಶಾಸನಗಳ ಅಧ್ಯಯನ.',
        url: 'https://www.hup.harvard.edu/books/9780674057777'
      },
      {
        id: 'ref_lal_sisupalgarh',
        title: 'Sisupalgarh 1948: An Early Historical Fort in Eastern India (Ancient India, No. 5)',
        authorOrAuthority: 'ಬಿ.ಬಿ. ಲಾಲ್ (ಭಾರತೀಯ ಪುರಾತತ್ವ ಸರ್ವೇಕ್ಷಣಾ ಇಲಾಖೆ, 1949)',
        category: 'archaeological_survey',
        categoryLabel: 'ಪುರಾತತ್ವ ಉತ್ಖನನ ವರದಿ',
        description: 'ಭುವನೇಶ್ವರದ ಬಳಿಯ ಪ್ರಾಚೀನ ಶಿಶುಪಾಲ್‌ಗಢ್ ಕೋಟೆ ನಗರದ ಹೆಬ್ಬಾಗಿಲುಗಳು ಮತ್ತು ಕೋಟೆ ಗೋಡೆಗಳ ಉತ್ಖನನ ವರದಿ.',
        url: 'https://asi.nic.in/ancient-india/'
      },
      {
        id: 'ref_sircar_inscriptions',
        title: 'Inscriptions of Asoka & Select Inscriptions',
        authorOrAuthority: 'ಡಿ.ಸಿ. ಸರ್ಕಾರ್ (ಭಾರತ ಸರ್ಕಾರದ ಪ್ರಕಟಣಾ ವಿಭಾಗ / ಕಲ್ಕತ್ತಾ ವಿಶ್ವವಿದ್ಯಾಲಯ)',
        category: 'epigraphic_primary',
        categoryLabel: 'ಶಾಸನ ಅನುವಾದ ಮತ್ತು ವ್ಯಾಖ್ಯಾನ',
        description: 'ಅಶೋಕನ ಶಿಲಾ ಮತ್ತು ಸ್ತಂಭ ಶಾಸನಗಳ ಅಧಿಕೃತ ಅನುವಾದ ಹಾಗೂ ಪ್ರಾಕೃತ ಪದಗಳ ವಿವರಣೆ.',
        url: 'https://archive.org/details/in.ernet.dli.2015.532669'
      }
    ],
    relatedLinks: {
      heading: 'ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿರುವ ಸಂಬಂಧಿತ ಐತಿಹಾಸಿಕ ಪುಟಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
      odraDesha: 'ಓಡ್ರ ದೇಶ ಮತ್ತು ಪ್ರಾಚೀನ ಕಳಿಂಗ ಭೌಗೋಳಿಕತೆ',
      inscriptions: 'ಶಿಲಾಶಾಸನಗಳು ಮತ್ತು ತಾಮ್ರಶಾಸನಗಳು',
      gajapathiKings: 'ಒಡಿಶಾದ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಅರಸರು',
      timeline: 'ಸಂಪೂರ್ಣ ಐತಿಹಾಸಿಕ ಕಾಲಾನುಕ್ರಮ'
    }
  }
};

export const KALINGA_WAR_CONTENT: Record<LanguageCode, KalingaWarLocaleContent> = {
  ...KALINGA_WAR_TRANSLATIONS_PART1,
  ...KALINGA_WAR_TRANSLATIONS_PART2
};
