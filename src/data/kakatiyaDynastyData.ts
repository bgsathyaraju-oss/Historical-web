import type {
  Article,
  GalleryItem,
  GenealogyNode,
  HistoricalEvent,
  HistoricalLocation,
  InscriptionRecord,
  LanguageCode,
  TempleMonument
} from '../types/index.ts';
import type { DocumentedFigureData } from './documentedFiguresRepository.ts';
import type { ArticleStructuredMetadata } from './sevenCategoriesExpansionData.ts';
import type {
  GalleryTranslation,
  GenealogyNodeTranslation,
  LocationTranslation,
  TimelineEventTranslation
} from './multilingualSeedTranslations.ts';

const ARCHIVE_IMG = (file: string) =>
  `${(import.meta as any).env?.BASE_URL || '/'}assets/archive/${file}`;

/**
 * ============================================================================
 * KAKATIYA DYNASTY MASTER REFERENCE ID MAP (KD-0001 .. KD-0033)
 * ============================================================================
 */
export const KAKATIYA_REFERENCE_ID_MAP: Record<string, string> = {
  // Phase 2: Main Article (KD-0001)
  art_dyn_kakatiya_orugallu: 'KD-0001',

  // Phase 3: 9 Documented Kakatiya Rulers (KD-0002 .. KD-0010)
  fig_kakatiya_beta_i: 'KD-0002',
  fig_kakatiya_prola_i: 'KD-0003',
  fig_kakatiya_beta_ii: 'KD-0004',
  fig_kakatiya_prola_ii: 'KD-0005',
  fig_kakatiya_rudradeva: 'KD-0006',
  fig_kakatiya_mahadeva: 'KD-0007',
  fig_kakatiya_ganapati_deva: 'KD-0008',
  fig_kakatiya_rudrama_devi: 'KD-0009',
  fig_kakatiya_prataparudra_ii: 'KD-0010',

  // Phase 4A: 4 Kakatiya Temples & Monuments (KD-0011 .. KD-0014)
  mon_warangal_fort: 'KD-0011',
  mon_thousand_pillar_temple: 'KD-0012',
  mon_ramappa_temple: 'KD-0013',
  mon_ghanpur_temples: 'KD-0014',

  // Phase 4B: 4 Kakatiya Historical Locations & Fortified Citadels (KD-0015 .. KD-0018)
  loc_orugallu_warangal: 'KD-0015',
  loc_anumakonda_hanamkonda: 'KD-0016',
  loc_palampet_ramappa: 'KD-0017',
  loc_motupalli_port: 'KD-0018',

  // Phase 4C: 4 Kakatiya Epigraphic Inscriptions (KD-0019 .. KD-0022)
  insc_anumakonda_1163: 'KD-0019',
  insc_motupalli_1244: 'KD-0020',
  insc_malkapuram_1261: 'KD-0021',
  insc_chandupatla_1289: 'KD-0022',

  // Phase 4D: Royal Dynasty Dossier, Gallery Plate & Genealogy Node (KD-0023 .. KD-0025)
  dyn_kakatiya_orugallu: 'KD-0023',
  gal_kakatiya_kirti_torana: 'KD-0024',
  gen_kakatiya_lineage: 'KD-0025',

  // Phase 5: 8 Kakatiya Historical Timeline Events (KD-0026 .. KD-0033)
  ev_kakatiya_emergence_1000: 'KD-0026',
  ev_kakatiya_independence_1163: 'KD-0027',
  ev_kakatiya_orugallu_capital_1195: 'KD-0028',
  ev_kakatiya_ganapati_reign_1199: 'KD-0029',
  ev_kakatiya_rudrama_reign_1262: 'KD-0030',
  ev_kakatiya_prataparudra_reign_1289: 'KD-0031',
  ev_kakatiya_delhi_sieges_1309: 'KD-0032',
  ev_kakatiya_fall_warangal_1323: 'KD-0033'
};

/**
 * ============================================================================
 * PHASE 2 – KAKATIYA DYNASTY MAIN HISTORICAL MONOGRAPH (KD-0001)
 * Covers all 13 mandatory historiographical sections with primary epigraphic
 * and archaeological citations.
 * ============================================================================
 */
export const KAKATIYA_MAIN_ARTICLE: Article = {
  id: 'art_dyn_kakatiya_orugallu',
  slug: 'kakatiya-dynasty-orugallu-warangal-sovereigns-epigraphy-hydraulic-heritage',
  category: 'Royal Dynasties',
  evidence_category: 'verified_archaeological',
  verification_status: 'Published',
  author_name: 'Dr. Vikramaditya Gajapathi Raju & G.Sathyanarayana Raju.Peetla.',
  publication_date: '2026-11-11',
  featured_image: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
  original_language: 'en',
  original_title:
    'The Kakatiya Dynasty of Anumakonda and Orugallu (Warangal): Sovereign Polity, Epigraphy, Nayankara Administration, Tank Engineering & Temple Architecture (c. 1000–1323 CE)',
  summary:
    'A comprehensive 13-section historical and epigraphic monograph on the Kakatiya Dynasty (c. 1000–1323 CE), documenting its emergence under Beta I and Prola I at Anumakonda, Rudradeva’s declaration of independence in 1163 CE, Ganapati Deva’s 63-year unification of the Telugu-speaking lands, Rani Rudrama Devi’s statesmanship, Prataparudra II’s Nayankara military reorganization, concentric fortifications at Orugallu, chain-tank irrigation engineering (Samudrams), UNESCO-recognized Ramappa and Thousand Pillar temple architecture, and enduring Deccan legacy.',
  tags: [
    'Kakatiya Dynasty',
    'Orugallu (Warangal)',
    'Anumakonda (Hanamkonda)',
    'Ganapati Deva',
    'Rani Rudrama Devi',
    'Prataparudra II',
    'Ramappa Temple',
    'Thousand Pillar Temple',
    'Nayankara System',
    'Motupalli Abhaya Shasana'
  ],
  original_content: `### 1. Historical Origin and Early Kakatiya Rulers
The **Kakatiya Dynasty** (*Kākatīya*, c. 1000–1323 CE) stands among the most transformative sovereign powers of medieval South India and the eastern Deccan. Epigraphic charters—most notably the **Bayyaram Tank Inscription** of Mailama (sister of Ganapati Deva), the **Kazipet Darga Inscription** of Beta II (1090 CE), and the **Malkapuram Stone Pillar Inscription** (1261 CE)—trace the early ancestors of the house, such as **Venna**, **Gunda I–III**, and **Erra**, as military commanders (*Samantas* and *Rastrakuta/Chalukya* frontier governors) originally associated with *Kakatipura* and the Koravi–Anumakonda uplands of Telangana. The dynastic name derives from their tutelary worship of the goddess **Kakati Devi** (a form of Durga/Shakti) and **Svayambhudeva** (Shiva). In royal prasastis such as the **Anumakonda Inscription** (1163 CE) and **Motupalli Pillar Edict** (1244 CE), the Kakatiya monarchs also invoked solar (*Suryavamsha* / *Durjaya*) heroic prestige while grounding their political legitimacy in direct agrarian development, temple patronage, and martial valor rather than rigid ritual hierarchy.

### 2. Rise of the Kakatiya Dynasty (From Chalukya Feudatories to Sovereign Power)
During the 11th and early 12th centuries, the early rulers **Beta I** (r. c. 1000–1052 CE), **Prola I** (r. c. 1052–1076 CE), **Beta II** (r. c. 1076–1108 CE), **Durgaraja** (r. c. 1108–1116 CE), and **Prola II** (r. c. 1116–1157 CE) governed from **Anumakonda** (modern Hanamkonda) as hereditary *Mahamandalesvaras* under the **Western Chalukyas of Kalyani**. For his military service in the Konkan, Chakrakuta, and Vengi campaigns of Chalukya Emperor Someshvara I Trailokyamalla, **Prola I** received the permanent hereditary fief (*sthiram-vishayam*) of **Anumakonda Vishaya** (Kazipet Inscription). **Beta II** (*Vikramachakri*) further received the Sabbi-1000 district from Vikramaditya VI. As Kalyani Chalukya imperial authority waned in the mid-12th century, **Prola II** defeated rival feudatories including Tailapa III’s generals, Mantrakuta Gundaraja, and Choda Udaya, laying the foundation for full sovereignty. His son **Rudradeva (Prataparudra I)** formally proclaimed complete sovereign independence in **1163 CE (Saka 1084)**, recorded on the monumental **Anumakonda Thousand Pillar Temple Stone Inscription**.

### 3. Kakatiya Kingdom and Territorial Expansion
At its imperial zenith under **Emperor Ganapati Deva** (r. 1199–1262 CE), **Queen Rudrama Devi** (r. 1262–1289 CE), and **Emperor Prataparudra II** (r. 1289–1323 CE), the Kakatiya realm united virtually the entirety of the Telugu-speaking lands (*Trilinga Desha*)—marked traditionally by the three sacred Shaiva shrines of **Draksharama** (East Godavari), **Kaleshwaram** (Karimnagar/Jayashankar), and **Srisailam** (Kurnool). Ganapati Deva subdued the Velanati Chodas of coastal Andhra (c. 1210–1212 CE), integrated the Nellore Telugu Chodas as allies, extended Kakatiya influence southward to **Kanchipuram** (1250 CE), and contested Kalinga-Godavari frontier outposts with the **Imperial Eastern Gangas** of Odisha. Under Rudrama Devi and Prataparudra II, the kingdom defended its western and southern borders against the Seuna Yadavas of Devagiri, the Pandyas of Madurai, and the rebel Kayastha chieftain Ambadeva of Vallur.

### 4. Capital at Orugallu (Warangal / Ekashilanagara)
Recognizing the strategic need for a spacious plains citadel to complement the hill-fort of Anumakonda, **Rudradeva** initiated the new capital of **Orugallu** (*Ekashilanagara*, named after the monolithic granite hillock *Oru-kallu* or "Single Stone" at its center), which **Ganapati Deva** established as the permanent imperial capital and **Rudrama Devi** and **Prataparudra II** expanded into one of medieval Asia's most formidable fortified metropolises. As documented in the *Kridabhiramamu*, Amir Khusrau’s *Khaza'in ul-Futuh*, and Archaeological Survey of India (ASI) excavations, Orugallu was protected by **three concentric circular ramparts**:
- **Outer Earthen Wall (Matti Kota):** Approximately 12.5 km in diameter encircled by a deep moat, enclosing agricultural fields and reservoirs capable of sustaining the populace during prolonged sieges.
- **Middle Granite Bastion Wall (Kote):** Built of colossal dressed granite blocks (*dry-ashlar cyclopean masonry* fitted without mortar), fortified with **45 massive rectangular bastions**, four labyrinthine *Vankadari* (bent-axis) gateways, and a broad water-filled moat (*Agadtha*).
- **Inner Royal Citadel:** Surrounding the central **Svayambhudeva Temple**, the **Kirti Toranas** (four monumental monolithic stone gateways), the **Kush Mahal / Audience Hall**, and royal treasuries.

### 5. Political Administration and Governance (The Nayankara System)
The Kakatiya state pioneered a decentralized yet tightly integrated military-fiscal administration known as the **Nayankara System** (*Nāyaṅkara*), which later served as the direct institutional blueprint for the *Amara-Nayaka* system of the **Vijayanagara Empire** and the provincial military tenures of the **Suryavamsha Gajapathis**. Under **Rudrama Devi** and systematically reorganized by **Prataparudra II**, the kingdom’s revenue-bearing territories (*Sthalas* and *Kampanas*) were assigned to **77 trusted Nayakas** (military commanders drawn from diverse warrior communities without rigid varna barriers). In exchange for holding *Nayankara* fiefs, each Nayaka maintained a stipulated contingent of infantry, cavalry, and war elephants for the sovereign’s campaigns and remitted tribute to Orugallu. At the village level, administration rested on the **Ayagar system** (twelve hereditary village functionaries including the *Reddi/Peddakapu*, *Karanam* [accountant], and *Talari* [watchman]).

### 6. Military Organization and Fortifications (Chaturvidha Durga)
Kakatiya military treatise traditions (preserved in works such as the *Nitisara* attributed to Rudradeva/Prataparudra and *Sakalanitisammatamu*) classified fortifications into four strategic categories (*Chaturvidha Durga*):
1. **Giri Durga (Hill Fortresses):** Anumakonda, Golkonda (early mud/stone outpost), Bhuvanagiri, Rachakonda, Devarakonda, and Kondapalli.
2. **Sthala Durga (Plains Citadels):** The triple-walled capital of Orugallu (Warangal) and Elgandal.
3. **Jala Durga (Water Fortresses):** Kolanu (Kolleru / Kolletikota island citadel under the Kolani chiefs and Kakatiya governors) and Divi Island.
4. **Vana Durga (Forest Fortresses):** Eturunagaram, Palampet, and Godavari-Bastar frontier strongholds.
The construction of these cyclopean dry-stone granite ramparts, bastions, and moat excavations relied heavily upon specialized hereditary stone-quarry and earthwork warrior-artisan guilds—historically recorded in Deccan epigraphs and Mackenzie Kaifiyats as **Oddar / Odde / Vaddera / Odiyaraju** stone and fort engineers.

### 7. Agriculture, Irrigation and Tank Construction (Chain-Tank Hydraulic Engineering)
Because the Telangana plateau receives seasonal monsoon rainfall across undulating granitic terrain, the Kakatiya sovereigns and their feudatories executed a revolutionary hydraulic transformation by constructing thousands of interconnected reservoirs (**Samudrams** and **Cheruvus**) arranged in cascading hydrological chains (*Chain-Tank System*). Major epigraphically dated reservoirs include:
- **Kesari Samudram** and **Jagatkesari Samudram** (excavated under Prola I and Beta II).
- **Choda Samudram / Rudra Samudram** (Panagal / Nalgonda corridor).
- **Pakhal Lake** (commissioned in 1213 CE by Jagadala Mummadi, general of Ganapati Deva, impounding a 30 sq km basin).
- **Ramappa Cheruvu** (1213 CE, built by Recharla Rudra at Palampet).
- **Laknavaram Lake** (linking narrow valley gorges between hillocks with earthen-and-masonry bunds).
- **Ghanpur (Ghanapuram) Tank** and **Bayyaram Cheruvu** (Dharmakirti Samudram, built by Mailama).
Royal grants offered the **Dasavanda** (*Daśavanda* / *Kattu-kodage*) tenure—granting one-tenth to one-fourth of newly irrigated wet paddy land tax-free in perpetuity to the hydraulic engineers and communities who excavated the tank beds, raised the stone revetments (*Kallu-kattu*), and maintained the sluice gates (*Tumu*).

### 8. Trade, Economy and Society
Under Kakatiya rule, inland agrarian expansion was matched by flourishing guild commerce and international maritime trade. Powerful merchant corporations such as the **Ayyavole-500 (Ainnurruvar)**, **Pekamndru**, **Teliki-1000**, and **Nakarams** operated across urban centers (*Pattanas* and *Penthis*). In **1244 CE (Saka 1166)**, Emperor **Ganapati Deva** erected the celebrated **Motupalli Abhaya Shasana (Charter of Security)** at the seaport of **Motupalli** (*Desyuyakkondapattana* in modern Prakasam district). Whereas earlier coastal rulers had confiscated cargo from shipwrecked vessels, Ganapati Deva abolished unjust seizures, guaranteed complete protection of life and property to foreign and domestic sea-traders, and fixed transparent, moderate customs duties on gold, sandalwood, camphor, silk, pearls, rosewater, ivory, and warhorses. When the Venetian traveler **Marco Polo** visited Motupalli around **1289–1292 CE** at the close of Queen Rudrama Devi’s reign, he praised the peace, justice, diamond mines, and ultra-fine muslin textiles ("delicate as the tissue of a spider's web") of the kingdom.

### 9. Religion, Literature and Cultural Contributions
While early Kakatiya rulers (Beta I, Prola I, Beta II) patronized Jain establishments alongside Kalamukha Shaiva ascetics (such as **Ramesvara Pandita** at Anumakonda), the dynasty from Prola II onward championed Shaivism—venerating **Svayambhudeva**—while maintaining broad religious harmony toward Vaishnava and Jain shrines. Under **Ganapati Deva** and **Rudrama Devi**, the royal preceptor **Visvesvara Sambhu** of the **Golaki Matha** established the **Visvesvara Golaki** monastery, Vedic college, maternity hospital (*Prasuti-sala*), and free feeding house (*Satra*) at Mandadam/Malkapuram (recorded in the **1261 CE Malkapuram Inscription**).
In literature and performing arts, the Kakatiya court nurtured both Sanskrit and classical Telugu scholarship:
- **Rudradeva** authored the Sanskrit ethical treatise *Nitisara*.
- **Vidyanatha**, court poet of Prataparudra II, composed the celebrated Sanskrit poetics treatise ***Prataparudriya (Prataparudra Yasobhushana)***, in which every illustrative verse eulogizes Prataparudra II.
- **Jayapa Senani** (Gajasahini, commander of Ganapati Deva’s elephant corps) authored the ***Nrittaratnavali*** (1253–1254 CE) and *Gitaratnavali*, codifying both classical *Marga* and indigenous *Desi* dance forms including **Perini Sivatandavam** (the martial dance performed by warriors before battle).
- **Tikkana Somayaji**, minister to Manumasiddhi II of Nellore, visited Ganapati Deva’s court at Orugallu and composed 15 parvas of the *Andhra Mahabharatamu*, while **Palkuriki Somanatha** pioneered indigenous *Dvipada* meter in the *Basava Purana* and *Panditaradhya Charitra*.

### 10. Temple Architecture and Sculpture
Kakatiya architecture evolved the Kalyani Chalukya idiom into a distinct, structurally daring regional style characterized by:
- **Trikutachala (Triple-Shrine) Layout:** Three sanctums (*Garbhagrihas*) dedicated to Rudreswara (Shiva), Vasudeva (Vishnu), and Suryadeva (Surya) in the **1163 CE Thousand Pillar Temple at Hanamkonda**, opening onto a common pillared *Ranga Mandapa*.
- **Stellate (Star-Shaped) High Plinths (*Upapitha*):** Temples rest on elevated, multi-offset platforms providing a wide circumambulatory path (*Pradakshina Patha*).
- **Sandbox Seismic Foundation Technology:** Excavated foundation pits filled with a compacted mixture of sand, lime, jaggery, and *karakkaya* (black myrobalan) acting as a cushion against ground tremors.
- **Lightweight Floating Bricks (*Teetallu*):** Used in the pyramidal *Vimana* superstructure of the **Ramappa Temple (1213 CE)**—bricks engineered with organic sawdust/sponge admixtures having a bulk density of ~0.85–0.90 g/cm³ so that they float on water and reduce vertical load on the stone columns below.
- **Polished Black Dolerite Sculpture & Monolithic Kirti Toranas:** Lathe-turned, mirror-polished black basalt/dolerite pillars, exquisite *Madanika / Nagini* bracket figures at Palampet translated directly from Jayapa Senani’s *Nrittaratnavali*, and the four iconic monolithic **Kirti Toranas** of Warangal Fort.

### 11. Inscriptions and Archaeological Evidence
The history of the Kakatiya Dynasty is anchored in over **1,000 surviving stone and copper-plate inscriptions** catalogued in *Epigraphia Indica*, *South Indian Inscriptions (Vols. IV, VI, X)*, *Inscriptions of Andhra Pradesh (Warangal, Karimnagar, Nalgonda & Khammam Districts)*, and *Corpus of Inscriptions in the Telingana Districts of H.E.H. the Nizam’s Dominions* (ed. P. Sreenivasachar). Primary epigraphic cornerstones include:
1. **Kazipet Darga Inscription of Beta II (1090 CE):** Establishes early Kakatiya genealogy and Anumakonda fiefdom.
2. **Anumakonda Thousand Pillar Temple Inscription of Rudradeva (Saka 1084 / 20 January 1163 CE):** Composed by Achintendra, recording Prola II’s and Rudradeva’s victories and independent sovereignty.
3. **Palampet (Ramappa Temple) Pillar Inscription of Recharla Rudra (Saka 1135 / 1213 CE):** Records the consecration of the Rudreswara Temple and Ramappa Lake under Ganapati Deva.
4. **Bayyaram Tank Inscription of Mailama (Early 13th Century CE):** Records complete early Kakatiya genealogy from Venna to Ganapati Deva and the construction of Dharmakirti Samudram.
5. **Motupalli Abhaya Shasana of Ganapati Deva (Saka 1166 / 1244 CE):** Maritime trade charter protecting international merchants.
6. **Malkapuram Stone Pillar Inscription of Rudrama Devi (Saka 1183 / 1261 CE):** Records the endowment of Mandadam and Velagapudi to Visvesvara Sambhu’s Golaki Matha.
7. **Chandupatla Stone Inscription (27 November 1289 CE):** Discovered in Nalgonda district, recording a land gift by Puvvula Mummadi for the spiritual merit of **Rudrama Devi** and her general **Mallikarjuna Nayaka**, who had both attained *Sivaloka* (died in battle) just days earlier during the campaign against rebel Kayastha chief Ambadeva.

### 12. Decline of the Kakatiya Kingdom (1303–1323 CE)
During the reign of **Prataparudra II (r. 1289–1323 CE)**, the rich Kakatiya empire became the primary Deccan target of the **Delhi Sultanate** under the Khalji and Tughluq dynasties:
- **1303 CE (Battle of Upparapalli):** Allauddin Khalji’s first expedition led by Malik Fakhruddin Juna and Jhaju of Kara advancing via Bengal/Odisha was decisively routed by Prataparudra II’s Nayaka commanders Potuganti Maili and Rechacherla Prasaditya at Upparapalli (Karimnagar).
- **1309–1310 CE (Siege by Malik Kafur):** Malik Kafur besieged Anumakonda and the outer earthen rampart of Orugallu for over a month, compelling Prataparudra II to negotiate a tributary peace treaty involving war elephants, horses, and treasure.
- **1318 CE (Expedition of Khusrau Khan):** A renewed siege under Mubarak Shah Khalji’s general Khusrau Khan extracted further tribute.
- **1323 CE (Final Siege and Fall of Orugallu):** After an initial assault by **Ulugh Khan (later Sultan Muhammad bin Tughluq)** was repulsed in 1321–1322 CE, Ulugh Khan returned with a reinforced imperial army in **1323 CE**. Following a grueling five-month siege, Orugallu fell. As recorded strictly in the contemporary **Vilasa Copper-Plate Grant of Musunuri Prolaya Nayaka (c. 1330 CE)** and **Kaluvacheru Grant of Queen Anitalli (1423 CE)**, the captured Emperor **Prataparudra II** chose to end his life on the banks of the **Narmada River (Somodbhava)** while being taken toward Delhi rather than live in captivity.

### 13. Historical Legacy
Although Orugallu was briefly renamed *Sultanpur* in 1323 CE, Kakatiya political and cultural institutions proved indestructible:
- Within a decade, **75 surviving Kakatiya Nayakas** confederated under **Musunuri Prolaya Nayaka** and **Musunuri Kapaya Nayaka** (*Andhra-Suratrana*), liberating coastal Andhra and reconquering Orugallu by **1336 CE**.
- Other Kakatiya commanders and administrative families played foundational roles in the rise of the **Reddi Kingdoms of Kondavidu and Rajahmundry**, the **Recherla Padmanayakas of Rachakonda and Devarakonda**, and the **Vijayanagara Empire** (where Harihara I and Bukka I adopted the Kakatiya *Varaha* boar emblem and *Nayankara* military-fiscal system).
- In the 15th century, when **Suryavamsha Gajapathi Emperor Kapilendra Deva** and **Prince Kumara Hamvira Deva** allied with the Velama chiefs and liberated **Orugallu (Warangal Fort)** in **1460 CE** (celebrated in the Warangal Fort inscription of Raghudeva Narendra Mahapatra), the Gajapathi Empire directly inherited the Kakatiya fortresses, tank systems, and **Odiyaraju / Vaddera / Oddar** military-engineering guilds across the Telangana-Andhra corridor.`,
  sources: [
    {
      id: 'src_kak_01',
      source_type: 'Scholarly Book',
      title: 'Precolonial India in Practice: Society, Region, and Identity in Medieval Andhra',
      author_or_authority: 'Talbot, Cynthia',
      publication_or_location: 'Oxford University Press',
      year_or_era: '2001',
      citation_details: 'Definitive modern epigraphic study of 1,000+ Kakatiya-era Andhra inscriptions (1000–1323 CE).',
      verified: true
    },
    {
      id: 'src_kak_02',
      source_type: 'Official Publication',
      title: 'The Kakatiyas of Warangal',
      author_or_authority: 'Sastry, P.V. Parabrahma',
      publication_or_location: 'Government of Andhra Pradesh (Department of Archaeology & Museums), Hyderabad',
      year_or_era: '1978',
      citation_details: 'Authoritative political, administrative, and epigraphic history of the Kakatiya monarchs from Beta I to Prataparudra II.',
      verified: true
    },
    {
      id: 'src_kak_03',
      source_type: 'Scholarly Book',
      title: 'The Early History of the Deccan, Parts VII–XI (The Kakatiyas of Warangal)',
      author_or_authority: 'Yazdani, Ghulam & Rama Rao, M.',
      publication_or_location: 'Oxford University Press',
      year_or_era: '1960',
      citation_details: 'Detailed analysis of Orugallu fortifications, Nayankara administration, and Delhi Sultanate campaigns.',
      verified: true
    },
    {
      id: 'src_kak_04',
      source_type: 'Inscription',
      title: 'Anumakonda Inscription of Rudradeva (Saka 1084 / 1163 CE) & Motupalli Pillar Inscription of Ganapatideva (1244 CE)',
      author_or_authority: 'Fleet, J.F. & Hultzsch, E. (Eds.)',
      publication_or_location: 'Epigraphia Indica, Vols. IX & XII, Archaeological Survey of India',
      year_or_era: '1907–1914',
      citation_details: 'Primary Sanskrit epigraphic texts recording Rudradeva’s sovereignty and Ganapati Deva’s maritime trade charter.',
      verified: true
    },
    {
      id: 'src_kak_05',
      source_type: 'Inscription',
      title: 'Inscriptions of Andhra Pradesh: Warangal, Karimnagar & Nalgonda Districts',
      author_or_authority: 'Sastry, P.V. Parabrahma (Ed.)',
      publication_or_location: 'Government of Andhra Pradesh Epigraphical Series',
      year_or_era: '1974–1992',
      citation_details: 'Critical editions of Kazipet (1090 CE), Hanamkonda (1163 CE), Palampet (1213 CE), Bayyaram, and Chandupatla (1289 CE) inscriptions.',
      verified: true
    }
  ]
};

export const KAKATIYA_MAIN_ARTICLE_STRUCTURED_METADATA: ArticleStructuredMetadata = {
  refNumber: 'KD-0001',
  articleId: 'art_dyn_kakatiya_orugallu',
  categoryCode: 'RD',
  categoryName: {
    en: '3. Royal Dynasties',
    hi: '3. राजवंश (Royal Dynasties)',
    te: '3. రాజవంశాలు (Royal Dynasties)',
    kn: '3. ರಾಜವಂಶಗಳು (Royal Dynasties)',
    ta: '3. அரச வம்சங்கள் (Royal Dynasties)',
    mr: '3. राजवंश (Royal Dynasties)',
    or: '3. ରାଜବଂଶ (Royal Dynasties)',
    bn: '3. রাজবংশ (Royal Dynasties)'
  },
  subcategoryName: {
    en: 'Kakatiya Dynasty of Anumakonda & Orugallu (c. 1000–1323 CE)',
    hi: 'अनुमकोंडा और ओरुगल्लु (वारंगल) का काकतीय राजवंश (लगभग 1000–1323 ई.)',
    te: 'అనుమకొండ మరియు ఓరుగల్లు (వరంగల్) కాకతీయ రాజవంశం (క్రీ.శ. 1000–1323)',
    kn: 'ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು (ವರಂಗಲ್) ಕಾಕತೀಯ ರಾಜವಂಶ (ಸು. ಕ್ರಿ.ಶ. 1000–1323)',
    ta: 'அனுமகொண்டா மற்றும் ஓருகல்லு (வாரங்கல்) காகதீய வம்சம் (பொ.ஊ. 1000–1323)',
    mr: 'अनुमकोंडा आणि ओरुगल्लु (वरंगळ) चे काकतीय राजवंश (इ.स. १०००–१३२३)',
    or: 'ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ର କାକତୀୟ ରାଜବଂଶ (୧୦୦୦–୧୩୨୩ ଖ୍ରୀ.ଅ.)',
    bn: 'অনুমকোন্ডা ও ওরুগল্লু (ওয়ারাঙ্গল)-এর কাকতীয় রাজবংশ (আনু. ১০০০–১৩২৩ খ্রি.)'
  },
  historicalPeriod: {
    en: 'High Medieval Imperial Era (c. 1000–1323 CE)',
    hi: 'उच्च मध्यकालीन साम्राज्य काल (लगभग 1000–1323 ई.)',
    te: 'మధ్యయుగ సామ్రాజ్య యుగం (క్రీ.శ. 1000–1323)',
    kn: 'ಮಧ್ಯಕಾಲೀನ ಸಾಮ್ರಾಜ್ಯ ಯುಗ (ಸು. ಕ್ರಿ.ಶ. 1000–1323)',
    ta: 'இடைக்காலப் பேரரசு காலம் (பொ.ஊ. 1000–1323)',
    mr: 'मध्ययुगीन साम्राज्य काळ (इ.स. १०००–१३२३)',
    or: 'ମଧ୍ୟଯୁଗୀୟ ସାମ୍ରାଜ୍ୟ କାଳ (୧୦୦୦–୧୩୨୩ ଖ୍ରୀ.ଅ.)',
    bn: 'মধ্যযুগীয় সাম্রাজ্যিক যুগ (আনু. ১০০০–১৩২৩ খ্রি.)'
  },
  approxDateRange: {
    en: 'c. 1000 – 1323 CE (Sovereign Rule: 1163 – 1323 CE)',
    hi: 'लगभग 1000 – 1323 ई. (सार्वभौम शासन: 1163 – 1323 ई.)',
    te: 'క్రీ.శ. 1000 – 1323 (సార్వభౌమ పాలన: 1163 – 1323)',
    kn: 'ಕ್ರಿ.ಶ. 1000 – 1323 (ಸಾರ್ವಭೌಮ ಆಳ್ವಿಕೆ: 1163 – 1323)',
    ta: 'பொ.ஊ. 1000 – 1323 (இறையாண்மை ஆட்சி: 1163 – 1323)',
    mr: 'इ.स. १००० – १३२३ (सार्वभौम शासन: ११६३ – १३२३)',
    or: '୧୦୦୦ – ୧୩୨୩ ଖ୍ରୀ.ଅ. (ସାର୍ବଭୌମ ଶାସନ: ୧୧୬୩ – ୧୩୨୩ ଖ୍ରୀ.ଅ.)',
    bn: '১০০০ – ১৩২৩ খ্রি. (সার্বভৌম শাসন: ১১৬৩ – ১৩২৩ খ্রি.)'
  },
  geographicalLocation: {
    en: 'Telangana, Coastal Andhra & Rayalaseema (Capital: Anumakonda & Orugallu / Warangal)',
    hi: 'तेलंगाना, तटीय आंध्र और रायलसीमा (राजधानी: अनुमकोंडा और ओरुगल्लु / वारंगल)',
    te: 'తెలంగాణ, తీర ఆంధ్ర & రాయలసీమ (రాజధాని: అనుమకొండ & ఓరుగల్లు / వరంగల్)',
    kn: 'ತೆಲಂಗಾಣ, ಕರಾವಳಿ ಆಂಧ್ರ ಮತ್ತು ರಾಯಲಸೀಮೆ (ರಾಜಧಾನಿ: ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು / ವರಂಗಲ್)',
    ta: 'தெலுங்கானா, ஆந்திரக் கடற்கரை & இராயலசீமை (தலைநகர்: அனுமகொண்டா & ஓருகல்லு / வாரங்கல்)',
    mr: 'तेलंगणा, किनारी आंध्र आणि रायलसीमा (राजधानी: अनुमकोंडा आणि ओरुगल्लु / वरंगळ)',
    or: 'ତେଲେଙ୍ଗାନା, ତଟବର୍ତ୍ତୀ ଆନ୍ଧ୍ର ଓ ରାୟଲସୀମା (ରାଜଧାନୀ: ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁ / ୱାରଙ୍ଗଲ)',
    bn: 'তেলেঙ্গানা, উপকূলীয় অন্ধ্র ও রায়লসীমা (রাজধানী: অনুমকোন্ডা ও ওরুগল্লু / ওয়ারাঙ্গল)'
  },
  epistemicClassification: 'Verified Epigraphic & Archaeological Evidence',
  imageProvenance: {
    title: 'Orugallu (Warangal) Fort & Deccan Imperial Citadel Corridor',
    caption:
      'Archival representation of the fortified granite ramparts and monolithic Kirti Torana precinct of Orugallu (Warangal), imperial capital of the Kakatiya Dynasty (1163–1323 CE) and later liberated in 1460 CE by Gajapathi Prince Kumara Hamvira Deva.',
    period: '12th–14th Century CE (Kakatiya Imperial Period)',
    sourceOrProvenance: 'Archaeological Survey of India (ASI) Hyderabad Circle & Epigraphia Indica Records',
    credit: 'SURYA-ROYAL-8 Archival Heritage Repository',
    altText: 'Monolithic stone gateway and concentric granite fortifications of Warangal (Orugallu)',
    visualType: 'Archival Photograph / Epigraphic Facsimile'
  },
  communityCrossReferences: [
    {
      communityId: 'comm_dir_10_vaddera',
      canonicalTerm: 'Vaddera',
      associationType: 'Documented Epigraphic / Gazetteer Association',
      historicalPeriod: '11th–14th Century CE (Kakatiya Tank & Fort Construction Era)',
      relationshipSummary: {
        en: 'Documented in Deccan inscriptions, Dasavanda tank charters, and colonial gazetteers (Thurston 1909, Syed Siraj ul Hassan 1920) as the hereditary stone-quarry, cyclopean fort-wall, and Samudram reservoir engineers of the Kakatiya realm.',
        hi: 'दक्कन के शिलालेखों, दशवंद जलाशय अनुदानों और गजेटियरों में काकतीय साम्राज्य के पाषाण-दुर्ग और समुद्रम जलाशय निर्माण अभियंताओं के रूप में प्रलेखित।',
        te: 'కాకతీయ యుగపు దశవంద చెరువు శాసనాలు మరియు గెజిటీర్లలో ఓరుగల్లు కోట ప్రాకారాలు, సముద్రం చెరువుల నిర్మాణ శిల్పులుగా నమోదు చేయబడ్డారు.',
        kn: 'ಕಾಕತೀಯ ಯುಗದ ದಶವಂದ ಕೆರೆ ಶಾಸನಗಳು ಮತ್ತು ಗೆಜೆಟಿಯರ್‌ಗಳಲ್ಲಿ ಕೋಟೆ ಮತ್ತು ಸಮುದ್ರಂ ಜಲಾಶಯ ನಿರ್ಮಾಪಕರಾಗಿ ದಾಖಲಾಗಿದ್ದಾರೆ.',
        ta: 'காகதீய கால தசவந்த ஏரிக் கல்வெட்டுகள் மற்றும் அரசிதழ்களில் கற்கோட்டை மற்றும் நீர்த்தேக்கப் பொறியாளர்களாகப் பதிவு செய்யப்பட்டுள்ளனர்.',
        mr: 'काकतीय काळातील दशवंद तलाव शिलालेख आणि गॅझेटियर्समध्ये दगडी किल्ले व जलाशय अभियंते म्हणून नोंदवलेले.',
        or: 'କାକତୀୟ ଯୁଗର ଦଶବନ୍ଦ ଜଳାଶୟ ଶିଳାଲେଖ ଓ ଗେଜେଟିୟରରେ ପ୍ରସ୍ତର ଦୁର୍ଗ ଓ ସମୁଦ୍ରମ ଜଳାଶୟ ନିର୍ମାତା ଭାବେ ପ୍ରମାଣିତ।',
        bn: 'কাকতীয় যুগের দশবন্দ জলাশয় শিলালিপি ও গেজেটিয়ারে প্রস্তর দুর্গ ও সমুদ্রম জলাশয় নির্মাতা হিসেবে নথিবদ্ধ।'
      },
      supportingRef: 'Syed Siraj ul Hassan, Castes and Tribes of H.E.H. the Nizam’s Dominions (1920); Talbot (2001)',
      targetRoute: '/community-heritage?tab=directory&id=comm_dir_10_vaddera'
    },
    {
      communityId: 'comm_dir_12_vaddirajulu',
      canonicalTerm: 'VaddiRajulu',
      associationType: 'Traditional Lineage Claim',
      historicalPeriod: '12th–15th Century CE (Kakatiya to Gajapathi Deccan Transition)',
      relationshipSummary: {
        en: 'Regional Kshatriya and Nayaka lineages in Telangana and Andhra preserving traditions of fort command (Durgadhipati) and hydraulic stewardship under Kakatiya and subsequent Gajapathi sovereigns.',
        hi: 'तेलंगाना और आंध्र में काकतीय तथा परवर्ती गजपति शासकों के अधीन दुर्ग-रक्षा और जल-प्रबंधन की परंपरा रखने वाले क्षेत्रीय क्षत्रिय वंश।',
        te: 'కాకతీయ మరియు గజపతి చక్రవర్తుల కాలంలో దుర్గాధిపతులుగా, జలదుర్గ రక్షకులుగా సేవలందించిన క్షత్రియ నాయక వంశాలు.',
        kn: 'ಕಾಕತೀಯ ಮತ್ತು ಗಜಪತಿ ಸಾಮ್ರಾಟರ ಕಾಲದಲ್ಲಿ ದುರ್ಗಾಧಿಪತಿಗಳಾಗಿ ಸೇವೆ ಸಲ್ಲಿಸಿದ ಕ್ಷತ್ರಿಯ ನಾಯಕ ವಂಶಗಳು.',
        ta: 'காகதீய மற்றும் கஜபதி பேரரசர்களின் கீழ் கோட்டைத் தளபதிகளாகப் பணியாற்றிய க்ஷத்ரிய நாயக்கர் மரபினர்.',
        mr: 'काकतीय आणि गजपती सम्राटांच्या काळात दुर्गप्रमुख म्हणून कार्यरत राहिलेले क्षत्रिय नायक वंश.',
        or: 'କାକତୀୟ ଓ ଗଜପତି ସମ୍ରାଟଙ୍କ ଅଧୀନରେ ଦୁର୍ଗାଧିପତି ଭାବେ କାର୍ଯ୍ୟ କରିଥିବା କ୍ଷତ୍ରିୟ ନାୟକ ବଂଶ।',
        bn: 'কাকতীয় ও গজপতি সম্রাটদের অধীনে দুর্গাധിപতি হিসেবে কর্মরত ক্ষত্রিয় নায়ক বংশ।'
      },
      supportingRef: 'Mackenzie Manuscripts (Warangal & Kondavidu Kaifiyats); Thurston (1909, Vol. V)',
      targetRoute: '/community-heritage?tab=directory&id=comm_dir_12_vaddirajulu'
    }
  ],
  relatedArticleIds: [
    'art_ia_south_indian_epigraphy_corpus',
    'art_km_deccan_corridors_forts',
    'art_gajapathi_kapilendra',
    'art_dyn_eastern_gangas',
    'art_dyn_chalukya_synthesis'
  ],
  relatedFigureIds: [
    'fig_kakatiya_beta_i',
    'fig_kakatiya_prola_i',
    'fig_kakatiya_beta_ii',
    'fig_kakatiya_prola_ii',
    'fig_kakatiya_rudradeva',
    'fig_kakatiya_mahadeva',
    'fig_kakatiya_ganapati_deva',
    'fig_kakatiya_rudrama_devi',
    'fig_kakatiya_prataparudra_ii',
    'fig_hamvira_deva'
  ],
  relatedDynastyNames: [
    'Kakatiya Dynasty (Anumakonda & Orugallu)',
    'Western Chalukyas of Kalyani',
    'Imperial Eastern Gangas',
    'Suryavamsha Gajapathi Empire'
  ]
};

/**
 * 8-Language Translations for the Kakatiya Main Article (KD-0001)
 */
export const KAKATIYA_ARTICLE_TRANSLATIONS: Record<
  string,
  Record<
    LanguageCode,
    {
      title: string;
      summary: string;
      content: string;
      author_name?: string;
    }
  >
> = {
  art_dyn_kakatiya_orugallu: {
    en: {
      title: KAKATIYA_MAIN_ARTICLE.original_title,
      summary: KAKATIYA_MAIN_ARTICLE.summary,
      content: KAKATIYA_MAIN_ARTICLE.original_content,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    hi: {
      title:
        'अनुमकोंडा और ओरुगल्लु (वारंगल) का काकतीय राजवंश: सार्वभौम शासन, शिलालेख, नायंकर प्रशासन, जलाशय अभियांत्रिकी और मंदिर स्थापत्य (लगभग 1000–1323 ई.)',
      summary:
        'काकतीय राजवंश (लगभग 1000–1323 ई.) पर 13-खंडों का विस्तृत ऐतिहासिक और शिलालेखीय शोध-प्रबंध—जिसमें बेत प्रथम और प्रोल प्रथम के अधीन उदय, रुद्रदेव का 1163 ई. का स्वतंत्रता उद्घोष, गणपति देव का 63-वर्षीय शासन, रानी रुद्रमा देवी का नेतृत्व, प्रतापरुद्र द्वितीय की नायंकर सैन्य व्यवस्था, ओरुगल्लु के त्रि-स्तरीय दुर्ग, श्रृंखलाबद्ध जलाशय (समुद्रम) और यूनेस्को विश्व धरोहर रामप्पा मंदिर का विवरण है।',
      content: `### 1. ऐतिहासिक उत्पत्ति और प्रारंभिक काकतीय शासक
**काकतीय राजवंश** (लगभग 1000–1323 ई.) मध्यकालीन दक्षिण भारत और पूर्वी दक्कन की सबसे प्रभावशाली सार्वभौम शक्तियों में से एक था। **बय्यारम जलाशय शिलालेख**, **काजीपेट दरगाह शिलालेख** (1090 ई.) और **मल्कापुरम स्तंभ शिलालेख** (1261 ई.) के अनुसार इस वंश के प्रारंभिक पूर्वज वेन्ना, गुंडा और एर्रा राष्ट्रकूट एवं कल्याणी चालुक्य साम्राज्यों के सीमांत सेनापति थे। राजवंश का नाम कुलदेवी **काकती देवी** और **स्वयंभूदेव (शिव)** की आराधना से जुड़ा है।

### 2. काकतीय राजवंश का उदय (सामंती स्थिति से सार्वभौम सत्ता तक)
**बेत प्रथम** (लगभग 1000–1052 ई.), **प्रोल प्रथम** (1052–1076 ई.), **बेत द्वितीय** (1076–1108 ई.) और **प्रोल द्वितीय** (1116–1157 ई.) ने प्रारंभ में **अनुमकोंडा** (आधुनिक हनमकोंडा) से कल्याणी चालुक्यों के महामंडलेश्वर के रूप में शासन किया। प्रोल प्रथम ने चालुक्य सम्राट सोमेश्वर प्रथम से अनुमकोंडा विषय स्थायी जागीर के रूप में प्राप्त किया। **रुद्रदेव (प्रतापरुद्र प्रथम)** ने **1163 ई. (शक 1084)** में पूर्ण सार्वभौम स्वतंत्रता घोषित की, जो **अनुमकोंडा सहस्र लिंग (हजार स्तंभ) मंदिर शिलालेख** में अंकित है।

### 3. काकतीय साम्राज्य और क्षेत्रीय विस्तार
**सम्राट गणपति देव** (1199–1262 ई.), **रानी रुद्रमा देवी** (1262–1289 ई.) और **प्रतापरुद्र द्वितीय** (1289–1323 ई.) के शासनकाल में काकतीय साम्राज्य ने संपूर्ण तेलुगु-भाषी क्षेत्र (**त्रिलिंग देश** — द्राक्षाराम, कालेश्वरम और श्रीशैलम के मध्य) को एक सूत्र में पिरोया।

### 4. राजधानी ओरुगल्लु (वारंगल / एकशिलानगर)
रुद्रदेव और गणपति देव ने **ओरुगल्लु (वारंगल)** में नई राजधानी स्थापित की। ओरुगल्लु किला **तीन संकेंद्रित सुरक्षा प्राचीरों** (बाहरी मिट्टी की दीवार, विशाल ग्रेनाइट पत्थरों की बिना गारे की मध्य प्राचीर और 45 बुर्जों तथा गहरी खाई से युक्त आंतरिक गढ़) और चार भव्य एकाश्म **कीर्ति तोरणों** के लिए प्रसिद्ध था।

### 5. राजनीतिक प्रशासन और नायंकर प्रणाली
काकतीय शासकों ने **नायंकर प्रणाली** स्थापित की, जिसके अंतर्गत **प्रतापरुद्र द्वितीय** ने साम्राज्य की सैन्य और राजस्व कमान **77 नायकों** को सौंपी। यही प्रणाली आगे चलकर विजयनगर की अमर-नायक व्यवस्था का आधार बनी।

### 6. सैन्य संगठन और दुर्ग स्थापत्य (चतुर्विध दुर्ग)
काकतीय सैन्य ग्रंथों में **गिरि दुर्ग** (अनुमकोंडा, गोलकोंडा, भुवनगिरि), **स्थल दुर्ग** (ओरुगल्लु), **जल दुर्ग** (कोल्लेरू/कोलनु) और **वन दुर्ग** का उल्लेख है, जिनके निर्माण में **वड्डेरा / ओड्डर / ओडियाराजू** पाषाण-दुर्ग अभियंताओं की प्रमुख भूमिका रही।

### 7. कृषि, सिंचाई और विशाल जलाशय निर्माण (समुद्रम एवं चेरुवु)
तेलंगाना के पठारी भूभाग को उपजाऊ बनाने के लिए काकतीय राजाओं ने **केशरी समुद्रम**, **पाखाल झील**, **रामप्पा झील**, **लखनावरम झील**, **घनपुर** और **बय्यारम** जैसे विशाल श्रृंखलाबद्ध जलाशयों का निर्माण कराया तथा जलाशय निर्माताओं को **दशवंद** कर-मुक्त भूमि अनुदान दिए।

### 8. व्यापार, अर्थव्यवस्था और मोटुपल्ली अभय शासन (1244 ई.)
गणपति देव ने **1244 ई.** में **मोटुपल्ली बंदरगाह** पर **अभय शासन** स्तंभ लेख स्थापित कर समुद्री व्यापारियों को सुरक्षा और न्यायपूर्ण कर की गारंटी दी। **मार्को पोलो** ने 1289–1292 ई. में मोटुपल्ली की यात्रा कर रानी रुद्रमा देवी के न्याय और गोलकोंडा के हीरों की प्रशंसा की।

### 9. धर्म, साहित्य और सांस्कृतिक योगदान
काकतीय दरबार में विद्यानाथ ने **प्रतापरुद्रीय**, जयप सेनानी ने **नृत्तरत्नावली** (पेरिणी शिवतांडवम नृत्य का शास्त्रीय ग्रंथ) और पाल्कुरिकी सोमनाथ ने द्विपद साहित्य की रचना की।

### 10. मंदिर स्थापत्य और शिल्पकला
**त्रिकूटाचल शैली**, तारे के आकार (स्टेलैट) के ऊँचे अधिष्ठान, भूकंप-रोधी **सैंडबॉक्स नींव** और **पानी में तैरने वाली हल्की ईंटें** (रामप्पा मंदिर, 1213 ई. — यूनेस्को विश्व धरोहर) काकतीय स्थापत्य की अद्वितीय विशेषताएँ हैं।

### 11. शिलालेख और पुरातात्विक साक्ष्य
काजीपेट (1090 ई.), अनुमकोंडा (1163 ई.), पालापेट/रामप्पा (1213 ई.), मोटुपल्ली (1244 ई.), मल्कापुरम (1261 ई.) और **चंदुपट्ला शिलालेख (नवंबर 1289 ई.)** काकतीय इतिहास के प्रामाणिक प्राथमिक स्रोत हैं।

### 12. काकतीय साम्राज्य का पतन (1303–1323 ई.)
1303 ई. में उप्परपल्ली के युद्ध में दिल्ली सल्तनत की सेना को पराजित करने के बाद, 1309 और 1318 ई. के अभियानों के पश्चात **1323 ई.** में उलुग खान (मुहम्मद बिन तुगलक) के पाँच माह के घेरे के बाद ओरुगल्लु का पतन हुआ। विलास ताम्रपत्र (1330 ई.) के अनुसार बंदी बनाए गए प्रतापरुद्र द्वितीय ने नर्मदा नदी के तट पर अपने प्राण त्याग दिए।

### 13. ऐतिहासिक विरासत
काकतीय पतन के बाद मुसुनुरी नायकों ने 1336 ई. तक ओरुगल्लु को पुनः स्वतंत्र कराया, और 1460 ई. में सूर्यवंशी गजपति राजकुमार **कुमार हम्वीर देव** ने वारंगल किले को मुक्त कर ओड्र-काकतीय सैन्य विरासत को पुनः स्थापित किया।`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    te: {
      title:
        'అనుమకొండ మరియు ఓరుగల్లు (వరంగల్) కాకతీయ రాజవంశం: సార్వభౌమ పాలన, శాసనాలు, నాయంకర విధానం, చెరువుల నిర్మాణ కౌశలం & ఆలయ శిల్పకళ (క్రీ.శ. 1000–1323)',
      summary:
        'కాకతీయ రాజవంశం (క్రీ.శ. 1000–1323) పై 13 విభాగాల సమగ్ర చారిత్రక మరియు శాసన పరిశోధనా వ్యాసం—మొదటి బేతరాజు, మొదటి ప్రోలరాజుల ప్రారంభం, క్రీ.శ. 1163లో రుద్రదేవుని స్వతంత్ర ప్రకటన, గణపతిదేవుని 63 ఏళ్ల తెలుగు నేల ఏకీకరణ, రాణి రుద్రమదేవి పాలన, రెండవ ప్రతాపరుద్రుని 77 నాయంకర వ్యవస్థ, ఓరుగల్లు కోట, గొలుసుకట్టు చెరువులు మరియు రామప్ప దేవాలయ విశేషాలు.',
      content: `### 1. చారిత్రక ఆవిర్భావం మరియు తొలి కాకతీయ రాజులు
**కాకతీయ రాజవంశం** (క్రీ.శ. 1000–1323) మధ్యయుగ దక్షిణ భారతదేశం మరియు దక్కన్ చరిత్రలో తెలుగు జాతిని ఏకం చేసిన మహోన్నత సార్వభౌమ వంశం. **బయ్యారం చెరువు శాసనం**, **కాజీపేట దర్గా శాసనం** (1090), మరియు **మల్కాపురం శిలాశాసనం** (1261) ప్రకారం వెన్న, గుండ I–III, ఎర్ర అనే తొలి పూర్వీకులు రాష్ట్రకూట మరియు కళ్యాణి చాళుక్య సేనానులుగా ప్రసిద్ధులు. కాకతి దేవి మరియు స్వయంభూదేవుని ఆరాధన వల్ల వీరికి కాకతీయులు అనే పేరు స్థిరపడింది.

### 2. కాకతీయ వంశ వికాసం (సామంతుల నుండి సార్వభౌమత్వం వరకు)
**మొదటి బేతరాజు** (క్రీ.శ. 1000–1052), **మొదటి ప్రోలరాజు** (1052–1076), **రెండవ బేతరాజు** (1076–1108), మరియు **రెండవ ప్రోలరాజు** (1116–1157) తొలుత **అనుమకొండ** రాజధానిగా కళ్యాణి చాళుక్య మహామండలేశ్వరులుగా పాలించారు. మొదటి ప్రోలరాజు చాళుక్య సోమేశ్వరుని నుండి అనుమకొండ విషయాన్ని శాశ్వత భరణంగా పొందాడు. **రుద్రదేవుడు (మొదటి ప్రతాపరుద్రుడు)** **క్రీ.శ. 1163 (శక 1084)** లో సంపూర్ణ స్వతంత్ర సార్వభౌమత్వాన్ని ప్రకటించి **అనుమకొండ వేయిస్తంభాల గుడి శాసనం** వేయించాడు.

### 3. కాకతీయ సామ్రాజ్య విస్తరణ (త్రిలింగ దేశ ఏకీకరణ)
**గణపతిదేవ చక్రవర్తి** (1199–1262), **రాణి రుద్రమదేవి** (1262–1289), మరియు **రెండవ ప్రతాపరుద్రుడు** (1289–1323) పాలనలో ద్రాక్షారామం, కాలేశ్వరం, శ్రీశైలం మధ్య విస్తరించిన సమస్త **త్రిలింగ దేశం** (తెలంగాణ, తీర ఆంధ్ర, రాయలసీమ) ఒకే గొడుగు కిందికి వచ్చింది.

### 4. ఓరుగల్లు రాజధాని (ఏకశిలానగరం / వరంగల్)
రుద్రదేవుడు పునాది వేసి, గణపతిదేవుడు మరియు రుద్రమదేవి పూర్తి చేసిన **ఓరుగల్లు కోట** మూడు వలయాల ప్రాకారాలతో (మట్టి కోట, కంగులతో కూడిన కృష్ణశిలా రాతి కోట, అంతర్గత స్వయంభూదేవ ఆలయ దుర్గం), 45 బురుజులతో, నాలుగు ఏకశిలా **కీర్తి తోరణాలతో** అజేయ దుర్గంగా విలసిల్లింది.

### 5. రాజకీయ పరిపాలన మరియు నాయంకర విధానం
రాణి రుద్రమదేవి ప్రారంభించి రెండవ ప్రతాపరుద్రుడు క్రమబద్ధీకరించిన **నాయంకర విధానం**లో సామ్రాజ్యాన్ని **77 నాయంకరాలుగా** విభజించి పరాక్రమవంతులైన నాయకులకు సైనిక-రెవెన్యూ బాధ్యతలు అప్పగించారు.

### 6. సైనిక వ్యవస్థ మరియు చతుర్విధ దుర్గాలు
**గిరి దుర్గాలు** (అనుమకొండ, గోల్కొండ, భువనగిరి, రాచకొండ), **స్థల దుర్గాలు** (ఓరుగల్లు), **జల దుర్గాలు** (కొల్లేటికోట), మరియు **వన దుర్గాలు** (పాలంపేట, ఏటూరునాగారం) కాకతీయ రక్షణ కవచాలుగా నిలిచాయి. ఈ రాతి కోటలు, బురుజుల నిర్మాణంలో **వడ్డెర / ఒడ్డె / వడ్డెరాజులు / ఒడియరాజు** శిల్ప-దుర్గ నిర్మాణ శ్రేణులు కీలక పాత్ర పోషించారు.

### 7. వ్యవసాయం, గొలుసుకట్టు చెరువులు మరియు దశవంద మాన్యాలు
కేసరి సముద్రం, **పాకాల చెరువు**, **రామప్ప చెరువు**, **లక్నవరం చెరువు**, **ఘణపురం చెరువు**, **బయ్యారం చెరువు** వంటి గొలుసుకట్టు జలాశయాలను నిర్మించి, చెరువులు తవ్విన నిర్మాతలకు **దశవందం** (పన్ను లేని భూమి) మంజూరు చేశారు.

### 8. వాణిజ్యం, ఆర్థిక వ్యవస్థ & మోటుపల్లి అభయ శాసనం (1244)
గణపతిదేవుడు **క్రీ.శ. 1244** లో **మోటుపల్లి ఓడరేవు** వద్ద **అభయ శాసనం** వేయించి విదేశీ సముద్ర వ్యాపారులకు రక్షణ కల్పించాడు. వెనిస్ యాత్రికుడు **మార్కో పోలో** (1289–1292) రుద్రమదేవి పాలనను, వజ్రాల గనులను, సాలెపురుగు జాలం వంటి మస్లిన్ వస్త్రాలను కొనియాడాడు.

### 9. మతం, సాహిత్యం మరియు కళా పోషణ
విద్యానాథుని **ప్రతాపరుద్రీయం**, జాయప సేనాని **నృత్తరత్నావళి** (పేరిణి శివతాండవం), తిక్కన సోమయాజి, పాల్కురికి సోమనాథుల సాహిత్య సేవ కాకతీయ యుగాన్ని సువర్ణ అధ్యాయంగా నిలిపాయి.

### 10. ఆలయ వాస్తుశిల్పం (రామప్ప & వేయిస్తంభాల గుడి)
**త్రికూటాచల ఆలయాలు**, నక్షత్రాకార జగతి, భూకంపాలను తట్టుకునే **ఇసుక పునాది (Sandbox technology)**, మరియు **నీటిపై తేలే ఇటుకలతో** నిర్మించిన **రామప్ప దేవాలయం (1213 — యునెస్కో ప్రపంచ వారసత్వ సంపద)** కాకతీయ శిల్పకళకు నిదర్శనాలు.

### 11. శాసనాలు మరియు పురావస్తు ఆధారాలు
కాజీపేట (1090), అనుమకొండ (1163), పాలంపేట (1213), మోటుపల్లి (1244), మల్కాపురం (1261), మరియు రుద్రమదేవి వీరమరణాన్ని నమోదు చేసిన **చందుపట్ల శాసనం (నవంబర్ 1289)** కాకతీయ చరిత్రకు తిరుగులేని ఆధారాలు.

### 12. కాకతీయ సామ్రాజ్య పతనం (1303–1323)
1303 ఉప్పరపల్లి యుద్ధంలో ఢిల్లీ సుల్తాన్ సైన్యాన్ని ఓడించినప్పటికీ, 1309 మాలిక్ కాఫర్, 1318 ఖుస్రూ ఖాన్ దండయాత్రల అనంతరం **క్రీ.శ. 1323** లో ఉలుఘ్ ఖాన్ (ముహమ్మద్ బిన్ తుగ్లక్) ముట్టడితో ఓరుగల్లు పతనమైంది. విలాస తామ్రశాసనం (1330) ప్రకారం ప్రతాపరుద్రుడు బందీగా వెళ్తూ నర్మదా నదీ తీరంలో ప్రాణత్యాగం చేశాడు.

### 13. చారిత్రక వారసత్వం
ముసునూరి ప్రోలయ నాయకుడు, కాపయ నాయకుడు 75 మంది నాయకులను ఏకం చేసి 1336 నాటికి ఓరుగల్లును విముక్తి చేశారు. అనంతరం 1460లో సూర్యవంశ గజపతి యువరాజు **కుమార హంవీర దేవుడు** ఓరుగల్లు కోటను జయించి కాకతీయ-ఓడ్ర శౌర్య వారసత్వాన్ని కొనసాగించాడు.`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    kn: {
      title:
        'ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು (ವರಂಗಲ್) ಕಾಕತೀಯ ರಾಜವಂಶ: ಸಾರ್ವಭೌಮ ಆಡಳಿತ, ಶಾಸನಗಳು, ನಾಯಂಕರ ಪದ್ಧತಿ, ಕೆರೆ ನಿರ್ಮಾಣ ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ (ಕ್ರಿ.ಶ. 1000–1323)',
      summary:
        'ಕಾಕತೀಯ ರಾಜವಂಶದ (ಕ್ರಿ.ಶ. 1000–1323) 13 ವಿಭಾಗಗಳ ಸಮಗ್ರ ಐತಿಹಾಸಿಕ ಮತ್ತು ಶಾಸನೀಯ ಸಂಶೋಧನಾ ಪ್ರಬಂಧ—ಮೊದಲನೇ ಬೇತ ಮತ್ತು ಪ್ರೋಲರಿಂದ ಪ್ರಾರಂಭಿಸಿ, 1163ರ ರುದ್ರದೇವನ ಸ್ವಾತಂತ್ರ್ಯ ಘೋಷಣೆ, ಗಣಪತಿದೇವನ 63 ವರ್ಷಗಳ ಆಳ್ವಿಕೆ, ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ಶೌರ್ಯ, ಪ್ರತಾಪರುದ್ರನ ನಾಯಂಕರ ವ್ಯವಸ್ಥೆ, ಓರುಗಲ್ಲು ಕೋಟೆ ಮತ್ತು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ರಾಮಪ್ಪ ದೇವಾಲಯದ ಸಮಗ್ರ ವಿವರಣೆ.',
      content: `### 1. ಐತಿಹಾಸಿಕ ಮೂಲ ಮತ್ತು ಆರಂಭಿಕ ಕಾಕತೀಯ ಅರಸರು
**ಕಾಕತೀಯ ರಾಜವಂಶ** (ಕ್ರಿ.ಶ. 1000–1323) ಮಧ್ಯಕಾಲೀನ ದಕ್ಷಿಣ ಭಾರತ ಮತ್ತು ದಕ್ಕನ್ ಪ್ರಸ್ಥಭೂಮಿಯ ಪ್ರಮುಖ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ಶಕ್ತಿಯಾಗಿತ್ತು. ಬಯ್ಯಾರಂ ಕೆರೆ ಶಾಸನ, ಕಾಜಿಪೇಟ ಶಾಸನ (1090) ಮತ್ತು ಮಲ್ಕಾಪುರಂ ಶಾಸನಗಳ (1261) ಪ್ರಕಾರ ಆರಂಭಿಕ ಪೂರ್ವಜರು ರಾಷ್ಟ್ರಕೂಟ ಮತ್ತು ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರ ಸೇನಾನಾಯಕರಾಗಿದ್ದರು. ಕಾಕತಿ ದೇವಿ ಮತ್ತು స్వయంభూದೇವನ ಆರಾಧನೆಯಿಂದ ಕಾಕತೀಯ ಎಂಬ ಹೆಸರು ಬಂದಿತು.

### 2. ಕಾಕತೀಯ ವಂಶದ ಉದಯ (ಸಾಮಂತರಿಂದ ಸಾರ್ವಭೌಮತ್ವದವರೆಗೆ)
**ಮೊದಲನೇ ಬೇತ** (1000–1052), **ಮೊದಲನೇ ಪ್ರೋಲ** (1052–1076), **ಎರಡನೇ ಬೇತ** (1076–1108) ಮತ್ತು **ಎರಡನೇ ಪ್ರೋಲ** (1116–1157) ಅನುಮಕೊಂಡದಿಂದ ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರ ಮಹಾಮಂಡಲೇಶ್ವರರಾಗಿ ಆಳಿದರು. **ರುದ್ರದೇವ (ಮೊದಲನೇ ಪ್ರತಾಪರುದ್ರ)** **ಕ್ರಿ.ಶ. 1163 (ಶಕ 1084)** ರಲ್ಲಿ ಸಂಪೂರ್ಣ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ಘೋಷಿಸಿ **ಅನುಮಕೊಂಡ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ಶಾಸನ**ವನ್ನು ಸ್ಥಾಪಿಸಿದನು.

### 3. ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ವಿಸ್ತರಣೆ
**ಗಣಪತಿದೇವ** (1199–1262), **ರಾಣಿ ರುದ್ರಮಾದೇವಿ** (1262–1289) ಮತ್ತು **ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ** (1289–1323) ಕಾಲದಲ್ಲಿ ದ್ರಾಕ್ಷಾರಾಮ, ಕಾಲೇಶ್ವರಂ ಮತ್ತು ಶ್ರೀಶೈಲಂ ನಡುವಿನ ಸಮಗ್ರ ತೆಲುಗು ನಾಡು (ತ್ರಿಲಿಂಗ ದೇಶ) ಏಕೀಕೃತಗೊಂಡಿತು.

### 4. ಓರುಗಲ್ಲು ರಾಜಧಾನಿ (ವರಂಗಲ್ / ಏಕಶಿಲಾನಗರ)
ಓರುಗಲ್ಲು ಕೋಟೆಯು **ಮೂರು ಸುತ್ತಿನ ಕೋಟೆ ಗೋಡೆಗಳು** (ಮಣ್ಣಿನ ಕೋಟೆ, ಗಾರೆ ಇಲ್ಲದೆ ಜೋಡಿಸಿದ ಬೃಹತ್ ಗ್ರಾನೈಟ್ ಕಲ್ಲಿನ ಕೋಟೆ ಮತ್ತು ಒಳಕೋಟೆ), 45 ಬುರುಜುಗಳು ಮತ್ತು ನಾಲ್ಕು ಏಕಶಿಲಾ **ಕೀರ್ತಿ ತೋರಣ**ಗಳಿಂದ ಕೂಡಿತ್ತು.

### 5. ರಾಜಕೀಯ ಆಡಳಿತ ಮತ್ತು ನಾಯಂಕರ ಪದ್ಧತಿ
ಸಾಮ್ರಾಜ್ಯದ ರಕ್ಷಣೆ ಮತ್ತು ಕಂದಾಯ ಆಡಳಿತಕ್ಕಾಗಿ **77 ನಾಯಕ**ರಿಗೆ ಭೂಮಿ ಮತ್ತು ಸೈನಿಕ ಜವಾಬ್ದಾರಿ ನೀಡುವ **ನಾಯಂಕರ ಪದ್ಧತಿ**ಯನ್ನು ಜಾರಿಗೆ ತರಲಾಯಿತು; ಇದು ಮುಂದೆ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಅಮರ-ನಾಯಕ ಪದ್ಧತಿಗೆ ಮಾದರಿಯಾಯಿತು.

### 6. ಸೈನಿಕ ಸಂಘಟನೆ ಮತ್ತು ಚತುರ್ವಿಧ ದುರ್ಗಗಳು
ಗಿರಿ ದುರ್ಗ, ಸ್ಥಳ ದುರ್ಗ, ಜಲ ದುರ್ಗ ಮತ್ತು ವನ ದುರ್ಗಗಳ ನಿರ್ಮಾಣದಲ್ಲಿ **ವಡ್ಡರ್ / ಒಡ್ಡೆ / ವಡ್ಡೇರಾಜು / ಒಡಿಯರಾಜು** ಕಲ್ಲಿನ ಕೋಟೆ ಮತ್ತು ಜಲಾಶಯ ಶಿಲ್ಪಿಗಳು ಪ್ರಮುಖ ಪಾತ್ರ ವಹಿಸಿದರು.

### 7. ಕೃಷಿ, ನೀರಾವರಿ ಮತ್ತು ಸರಣಿ ಕೆರೆಗಳ ನಿರ್ಮಾಣ (ಸಮುದ್ರಂಗಳು)
ಪಾಕಾಲ ಕೆರೆ, ರಾಮಪ್ಪ ಕೆರೆ, ಲಕ್ನವರಂ, ಘನಪುರಂ ಮತ್ತು ಬಯ್ಯಾರಂ ಕೆರೆಗಳನ್ನು ನಿರ್ಮಿಸಿ ಕೆರೆ ಕಟ್ಟಿದವರಿಗೆ **ದಶವಂದ** (ತೆರಿಗೆ ಮುಕ್ತ ಭೂಮಿ) ನೀಡಲಾಯಿತು.

### 8. ವ್ಯಾಪಾರ, ಆರ್ಥಿಕತೆ ಮತ್ತು ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (1244)
ಗಣಪತಿದೇವನು **1244**ರಲ್ಲಿ **ಮೋಟುಪಲ್ಲಿ ಬಂದರಿನಲ್ಲಿ ಅಭಯ ಶಾಸನ** ಸ್ಥಾಪಿಸಿ ವಿದೇಶಿ ವ್ಯಾಪಾರಿಗಳಿಗೆ ರಕ್ಷಣೆ ನೀಡಿದನು; ವೆನಿಸ್ ಪ್ರವಾಸಿ **ಮಾರ್ಕೊ ಪೋಲೊ** ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ಆಡಳಿತವನ್ನು ಶ್ಲಾಘಿಸಿದ್ದಾನೆ.

### 9. ಧರ್ಮ, ಸಾಹಿತ್ಯ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕೊಡುಗೆಗಳು
ವಿದ್ಯಾನಾಥನ **ಪ್ರತಾಪರುದ್ರೀಯ**, ಜాయಪ ಸೇನಾನಿಯ **ನೃತ್ತರತ್ನಾವಳಿ** (ಪೇರಿಣಿ ಶಿವತಾಂಡವ ನೃತ್ಯ) ಮತ್ತು ತಿಕ್ಕನ ಸೋಮಯಾಜಿಯ ಸಾಹಿತ್ಯ ಕೃತಿಗಳು ಈ ಯುಗದ ಶ್ರೇಷ್ಠ ಕೊಡುಗೆಗಳಾಗಿವೆ.

### 10. ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಶಿಲ್ಪಕಲೆ
ತ್ರಿಕೂಟಾಚಲ ವಿನ್ಯಾಸ, ನಕ್ಷತ್ರಾಕಾರದ ಜಗತಿ, **ಮರಳು ತಳಹದಿ (Sandbox foundation)** ಮತ್ತು **ನೀರಿನಲ್ಲಿ ತೇಲುವ ಇಟ್ಟಿಗೆಗಳಿಂದ** ನಿರ್ಮಿತವಾದ **ರಾಮಪ್ಪ ದೇವಾಲಯ (1213 — ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ)** ಕಾಕತೀಯ ಶಿಲ್ಪಕಲೆಯ ಶಿಖರವಾಗಿದೆ.

### 11. ಶಾಸನಗಳು ಮತ್ತು ಪುರಾತತ್ವ ಆಧಾರಗಳು
ಅನುಮಕೊಂಡ (1163), ಪಾಲಂಪೇಟ (1213), ಮೋಟುಪಲ್ಲಿ (1244), ಮಲ್ಕಾಪುರಂ (1261) ಮತ್ತು ರುದ್ರಮಾದೇವಿಯ ವೀರಮರಣವನ್ನು ದಾಖಲಿಸುವ **ಚಂದುಪಟ್ಲ ಶಾಸನ (ನವೆಂಬರ್ 1289)** ಪ್ರಮುಖ ಆಧಾರಗಳಾಗಿವೆ.

### 12. ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯದ ಪತನ (1303–1323)
1303ರ ಉಪ್ಪರಪಲ್ಲಿ ಕದನದಲ್ಲಿ ದೆಹಲಿ ಸುಲ್ತಾನರ ಸೈನ್ಯವನ್ನು ಸೋಲಿಸಿದ ನಂತರ, 1309 ಮತ್ತು 1318ರ ದಾಳಿಗಳ ಬಳಿಕ **1323**ರಲ್ಲಿ ಉಲುಘ್ ಖಾನ್ (ಮುಹಮ್ಮದ್ ಬಿನ್ ತುಘಲಕ್) ಮುತ್ತಿಗೆಯಿಂದ ಓರುಗಲ್ಲು ಪತನವಾಯಿತು; ಪ್ರತಾಪರುದ್ರನು ನರ್ಮದಾ ನದಿ ತೀರದಲ್ಲಿ ಪ್ರಾಣತ್ಯಾಗ ಮಾಡಿದನು.

### 13. ಐತಿಹಾಸಿಕ ಪರಂಪರೆ
ಮುసుನೂರಿ ನಾಯಕರು 1336ರಲ್ಲಿ ಓರುಗಲ್ಲನ್ನು ಪುನಃ ವಶಪಡಿಸಿಕೊಂಡರು ಮತ್ತು ಮುಂದೆ ವಿಜಯನಗರ ಹಾಗೂ ಸೂರ್ಯವಂಶ ಗಜಪತಿ ಸಾಮ್ರಾಜ್ಯಗಳು ಕಾಕತೀಯ ಕೋಟೆ-ಆಡಳಿತ ಪರಂಪರೆಯನ್ನು ಮುಂದುವರಿಸಿದವು.`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    ta: {
      title:
        'அனுமகொண்டா மற்றும் ஓருகல்லு (வாரங்கல்) காகதீய வம்சம்: இறையாண்மை ஆட்சி, கல்வெட்டுகள், நாயங்கர நிர்வாகம், ஏரிப் பொறியியல் & கோயில் கட்டிடக்கலை (பொ.ஊ. 1000–1323)',
      summary:
        'காகதீய வம்சம் (பொ.ஊ. 1000–1323) குறித்த 13 பிரிவுகளைக் கொண்ட விரிவான வரலாற்று மற்றும் கல்வெட்டு ஆய்வுக் கட்டுரை—முதலாம் பேதराजன் மற்றும் முதலாம் புரோலராஜன் காலம் தொட்டு, 1163இல் உருத்ரதேவரின் சுதந்திரப் பிரகடனம், கணபதி தேவரின் 63 ஆண்டு ஆட்சி, ராணி ருத்ரமா தேவியின் வீரம், இரண்டாம் பிரதாபருத்ரரின் 77 நாயங்கர முறை, ஓருகல்லு கோட்டை, சங்கிலித் தொடர் ஏரிகள் மற்றும் யுனெஸ்கோ புகழ் ராமப்பா கோயில்.',
      content: `### 1. வரலாற்றுத் தோற்றம் மற்றும் தொடக்கக் கால காகதீய மன்னர்கள்
**காகதீய வம்சம்** (பொ.ஊ. 1000–1323) இடைக்காலத் தென்னிந்தியா மற்றும் தக்காணத்தின் மிகச்சிறந்த பேரரசுகளில் ஒன்றாகும். **பய்யாரம் ஏரிக் கல்வெட்டு**, **காஜிப்பேட்டை கல்வெட்டு** (1090) மற்றும் **மல்காபுரம் தூண் கல்வெட்டு** (1261) ஆகியவை இவர்களின் தொடக்கக் கால முன்னோர்கள் இராஷ்டிரகூட மற்றும் கல்யாணிச் சாளுக்கியப் படைத்தளபதிகளாக விளங்கியதைக் குறிப்பிடுகின்றன. காகதி தேவி மற்றும் சுயம்புதேவர் (சிவன்) வழிபாட்டினால் காகதீயர் எனப் பெயர் பெற்றனர்.

### 2. காகதீய வம்சத்தின் எழுச்சி (சிற்றரசர்களிலிருந்து பேரரசு வரை)
**முதலாம் பேதराजன்** (1000–1052), **முதலாம் புரோலராஜன்** (1052–1076), **இரண்டாம் பேதराजன்** (1076–1108) மற்றும் **இரண்டாம் புரோலராஜன்** (1116–1157) அனுமகொண்டாவிலிருந்து சாளுக்கிய மகாமண்டலேஸ்வரர்களாக ஆட்சி செய்தனர். **உருத்ரதேவர் (முதலாம் பிரதாபருத்ரர்)** **பொ.ஊ. 1163 (சக 1084)** இல் முழு சுதந்திரத்தை அறிவித்து **அனுமகொண்டா ஆயிரங்கால் மண்டபக் கல்வெட்டை** பொறித்தார்.

### 3. காகதீயப் பேரரசின் விரிவாக்கம்
**கணபதி தேவர்** (1199–1262), **ராணி ருத்ரமா தேவி** (1262–1289) மற்றும் **இரண்டாம் பிரதாபருத்ரர்** (1289–1323) ஆட்சியில் திராட்சாராமம், காலேஸ்வரம், ஸ்ரீசைலம் இடையிலான முழுத் தெலுங்கு மண்டலமும் (திரிலிங்க தேசம்) ஒன்றிணைக்கப்பட்டது.

### 4. தலைநகர் ஓருகல்லு (வாரங்கல் / ஏகசிலாநகரம்)
ஓருகல்லு கோட்டை **மூன்று வட்ட அரண்கள்** (மண் கோட்டை, சாந்து இல்லாமல் அடுக்கப்பட்ட கருங்கல் கோட்டை மற்றும் உட்கோட்டை), 45 கொத்தளங்கள் மற்றும் நான்கு ஒற்றைக்கல் **கீர்த்தி தோரணங்களுடன்** அமைக்கப்பட்டிருந்தது.

### 5. அரசியல் நிர்வாகம் மற்றும் நாயங்கர முறை
பேரரசின் இராணுவ மற்றும் வருவாய் நிர்வாகத்திற்காக **77 நாயக்கர்களுக்கு** நிலப் பொறுப்பு வழங்கும் **நாயங்கர முறை** உருவாக்கப்பட்டது; இதுவே பிற்கால விஜயநகர அமர-நாயக்கர் முறைக்கு முன்னோடியாகத் திகழ்ந்தது.

### 6. இராணுவ அமைப்பு மற்றும் நால்வகைக் கோட்டைகள் (சதுர்வித துர்க்கம்)
கிரி துர்க்கம், ஸ்தல துர்க்கம், ஜல துர்க்கம் மற்றும் வன துர்க்கம் ஆகிய கற்கோட்டைகள் மற்றும் அகழிகளை அமைப்பதில் **வட்டர் / ஒட்டர் / வட்டெராஜு / ஒடியராஜு** கற்கோட்டை மற்றும் நீர்த்தேக்கப் பொறியாளர்கள் முக்கியப் பங்காற்றினர்.

### 7. வேளாண்மை, நீர்ப்பாசனம் மற்றும் சங்கிலித் தொடர் ஏரிகள் (சமுத்திரங்கள்)
பாகால் ஏரி, ராமப்பா ஏரி, லக்னவரம், கனபுரம் மற்றும் பய்யாரம் போன்ற பிரம்மாண்ட ஏரிகளை உருவாக்கி, ஏரி கட்டியவர்களுக்கு **தசவந்தம்** (வரிில்லா நிலம்) வழங்கப்பட்டது.

### 8. வணிகம், பொருளாதாரம் & மோட்டுப்பள்ளி அபய சாசனம் (1244)
கணபதி தேவர் **1244இல் மோட்டுப்பள்ளி துறைமுகத்தில் அபய சாசனம்** பொறித்து கடல் வணிகர்களுக்குப் பாதுகாப்பு அளித்தார். வெனிஸ் பயணி **மார்க்கோ போலோ** (1289–1292) ருத்ரமா தேவியின் நீதியான ஆட்சியையும் வைரச் சுரங்கங்களையும் புகழ்ந்துள்ளார்.

### 9. சமயம், இலக்கியம் மற்றும் கலைப் பங்களிப்புகள்
வித்யாநாதரின் **பிரதாபருத்ரீயம்**, ஜாயப சேனானியின் **நிருத்தரத்னாவளி** (பேரிணி சிவதாண்டவம்) மற்றும் திக்கன சோமயாஜியின் இலக்கியப் படைப்புகள் இக்காலத்தின் பெருமைகளாகும்.

### 10. கோயில் கட்டிடக்கலை மற்றும் சிற்பக்கலை
திரிகூடாசல அமைப்பு, நட்சத்திர வடிவ அதிஷ்டானம், நிலநடுக்கம் தாங்கும் **மணல் அடித்தளம் (Sandbox foundation)** மற்றும் **நீரில் மிதக்கும் செங்கற்களால்** கட்டப்பட்ட **ராமப்பா கோயில் (1213 — யுனெஸ்கோ உலகப் பாரம்பரியச் சின்னம்)** காகதீய கட்டிடக்கலையின் சிகரமாகும்.

### 11. கல்வெட்டுகள் மற்றும் தொல்லியல் சான்றுகள்
அனுமகொண்டா (1163), பாலம்பேட்டை (1213), மோட்டுப்பள்ளி (1244), மல்காபுரம் (1261) மற்றும் ராணி ருத்ரமா தேவியின் வீரமரணத்தைப் பதிவு செய்த **சந்துபட்லா கல்வெட்டு (நவம்பர் 1289)** ஆகியவை முதன்மைச் சான்றுகளாகும்.

### 12. காகதீயப் பேரரசின் வீழ்ச்சி (1303–1323)
1303 உப்பரப்பள்ளி போரில் டெல்லி சுல்தானகப் படையை வென்ற போதிலும், 1309 மற்றும் 1318 முற்றுகைகளுக்குப் பிறகு **1323இல்** உலுக் கான் (முகமது பின் துக்ளக்) படையெடுப்பால் ஓருகல்லு வீழ்ந்தது; இரண்டாம் பிரதாபருத்ரர் நர்மதை ஆற்றங்கரையில் உயிர் நீத்தார்.

### 13. வரலாற்று மரபு
முசுனூரி நாயக்கர்கள் 1336இல் ஓருகல்லுவை மீட்டனர்; பின்னர் விஜயநகர மற்றும் சூரியவம்ச கஜபதி பேரரசுகள் காகதீய கோட்டை மற்றும் நிர்வாக மரபினைத் தொடர்ந்தன.`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    mr: {
      title:
        'अनुमकोंडा आणि ओरुगल्लु (वरंगळ) चा काकतीय राजवंश: सार्वभौम शासन, शिलालेख, नायंकर प्रशासन, तलाव अभियांत्रिकी आणि मंदिर स्थापत्य (इ.स. १०००–१३२३)',
      summary:
        'काकतीय राजवंशावरील (इ.स. १०००–१३२३) १३ विभागांचा सविस्तर ऐतिहासिक व शिलालेखीय शोधनिबंध—बेत पहिला आणि प्रोल पहिला यांच्यापासून सुरुवात, ११६३ मधील रुद्रदेवाची स्वातंत्र्य घोषणा, गणपती देवाची ६३ वर्षांची कारकीर्द, राणी रुद्रमा देवीचे नेतृत्व, प्रतापरुद्र दुसऱ्याची ७७ नायंकर पद्धती, ओरुगल्लु किल्ला, साखळी तलाव आणि युनेस्को जागतिक वारसा रामप्पा मंदिर.',
      content: `### 1. ऐतिहासिक उगम आणि प्रारंभिक काकतीय शासक
**काकतीय राजवंश** (इ.स. १०००–१३२३) हा मध्ययुगीन दक्षिण भारत आणि दख्खनमधील एक अत्यंत प्रभावशाली सार्वभौम राजवंश होता. **बय्यारम तलाव शिलालेख**, **काझीपेट शिलालेख** (१०९०) आणि **मल्कापुरम स्तंभ शिलालेख** (१२६१) नुसार त्यांचे पूर्वज राष्ट्रकूट आणि कल्याणी चालुक्यांचे सेनापती होते. कुलस्वामिनी **काकती देवी** आणि **स्वयंभूदेव (शिव)** यांच्या उपासनेवरून त्यांना काकतीय हे नाव मिळाले.

### 2. काकतीय राजवंशाचा उदय (मांडलीक ते सार्वभौम सत्ता)
**बेत पहिला** (१०००–१०५२), **प्रोल पहिला** (१०५२–१०७६), **बेत दुसरा** (१०७६–११०८) आणि **प्रोल दुसरा** (१११६–११५७) यांनी सुरुवातीला **अनुमकोंडा** येथून कल्याणी चालुक्यांचे महामंडलेश्वर म्हणून राज्य केले. **रुद्रदेव (प्रतापरुद्र पहिला)** याने **इ.स. ११६३ (शक १०८४)** मध्ये पूर्ण सार्वभौम स्वातंत्र्य घोषित केले आणि **अनुमकोंडा हजार स्तंभ मंदिर शिलालेख** कोरला.

### 3. काकतीय साम्राज्य आणि प्रादेशिक विस्तार
**सम्राट गणपती देव** (११९९–१२६२), **राणी रुद्रमा देवी** (१२६२–१२८९) आणि **प्रतापरुद्र दुसरा** (१२८९–१३२३) यांच्या काळात द्राक्षाराम, कालेश्वरम आणि श्रीशैलम यांमधील संपूर्ण तेलुगू प्रदेश (**त्रिलिंग देश**) एकत्र आला.

### 4. राजधानी ओरुगल्लु (वरंगळ / एकशिलानगर)
ओरुगल्लु किल्ला **तीन समकेंद्रित तटबंदी** (मातीचा कोट, चुन्याशिवाय रचलेला भव्य ग्रॅनाइट दगडी कोट आणि अंतर्गत गड), ४५ बुरूज आणि चार एकाश्म **कीर्ती तोरणांसाठी** प्रसिद्ध होता.

### 5. राजकीय प्रशासन आणि नायंकर पद्धती
लष्करी व महसूल प्रशासनासाठी साम्राज्याची विभागणी **७७ नायकांमध्ये** करणारी **नायंकर पद्धती** काकतीयांनी सुरू केली; हीच पद्धत पुढे विजयनगरच्या अमर-नायक व्यवस्थेचा पाया ठरली.

### 6. लष्करी संघटन आणि चतुर्विध दुर्ग
गिरी दुर्ग, स्थल दुर्ग, जल दुर्ग आणि वन दुर्ग यांच्या उभारणीत **वड्डर / ओड्डे / वड्डेराजू / ओडियाराजू** दगडी किल्ले व तलाव अभियंत्यांचे मोठे योगदान होते.

### 7. शेती, जलसिंचन आणि साखळी तलाव (समुद्रम)
पाखाल तलाव, रामप्पा तलाव, लखनावरम, घनपूर आणि बय्यारम यांसारखे विशाल तलाव बांधून तलाव निर्मात्यांना **दशवंद** करमुक्त जमीन देण्यात आली.

### 8. व्यापार, अर्थव्यवस्था आणि मोटुपल्ली अभय शासन (१२४४)
गणपती देवाने **१२४४ मध्ये मोटुपल्ली बंदरावर अभय शासन** स्तंभ उभारून सागरी व्यापाऱ्यांना सुरक्षिततेची हमी दिली. प्रवासी **मार्को पोलो** याने राणी रुद्रमा देवीच्या न्याय्य राजवटीची आणि हिऱ्यांच्या खाणींची प्रशंसा केली आहे.

### 9. धर्म, साहित्य आणि सांस्कृतिक योगदान
विद्यानाथाचा **प्रतापरुद्रीय**, जायप सेनानीचा **नृत्तरत्नावली** (पेरिणी शिवतांडव नृत्य) आणि तिक्कन सोमयाजी यांचे साहित्य हे या काळातील सर्वोच्च सांस्कृतिक योगदान आहे.

### 10. मंदिर स्थापत्य आणि शिल्पकला
त्रिकूटाचल रचना, तारकाकृती अधिष्ठान, भूकंपरोधी **वाळूचा पाया (Sandbox foundation)** आणि **पाण्यावर तरंगणाऱ्या हलक्या विटांनी** बांधलेले **रामप्पा मंदिर (१२१३ — युनेस्को जागतिक वारसा स्थळ)** ही काकतीय स्थापत्याची वैशिष्ट्ये आहेत.

### 11. शिलालेख आणि पुरातत्त्वीय पुरावे
अनुमकोंडा (११६३), पालमपेट (१२१३), मोटुपल्ली (१२४४), मल्कापुरम (१२६१) आणि राणी रुद्रमा देवीच्या वीरमरणाची नोंद करणारा **चंदुपट्ला शिलालेख (नोव्हेंबर १२८९)** हे प्रमुख पुरावे आहेत.

### 12. काकतीय साम्राज्याचा ऱ्हास (१३०३–१३२३)
१३०३ च्या उप्परपल्ली युद्धात दिल्ली सल्तनतीच्या सैन्याचा पराभव केल्यानंतर, १३०९ आणि १३१८ च्या मोहिमांनंतर **१३२३ मध्ये** उलुघ खान (मुहम्मद बिन तुघलक) याच्या वेढ्यानंतर ओरुगल्लुचा पाडाव झाला; प्रतापरुद्र दुसऱ्याने नर्मदा नदीकाठी प्राणत्याग केला.

### 13. ऐतिहासिक वारसा
मुसुनुरी नायकांनी १३३६ पर्यंत ओरुगल्लु पुन्हा स्वतंत्र केले आणि १४६० मध्ये सूर्यवंशी गजपती राजपुत्र **कुमार हम्वीर देव** याने वरंगळ किल्ला मुक्त करून काकतीय-ओड्र लष्करी वारसा पुढे चालवला.`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    or: {
      title:
        'ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ର କାକତୀୟ ରାଜବଂଶ: ସାର୍ବଭୌମ ଶାସନ, ଶିଳାଲେଖ, ନାୟଙ୍କର ପ୍ରଶାସନ, ଜଳାଶୟ ନିର୍ମାଣ କୌଶଳ ଓ ମନ୍ଦିର ସ୍ଥାପତ୍ୟ (୧୦୦୦–୧୩୨୩ ଖ୍ରୀ.ଅ.)',
      summary:
        'କାକତୀୟ ରାଜବଂଶ (୧୦୦୦–୧୩୨୩ ଖ୍ରୀ.ଅ.) ଉପରେ ୧୩-ବିଭାଗ ବିଶିଷ୍ଟ ସମଗ୍ର ଐତିହାସିକ ଓ ଶିଳାଲେଖୀୟ ଗବେଷଣା ପ୍ରବନ୍ଧ—ପ୍ରଥମ ବେତ ଓ ପ୍ରଥମ ପ୍ରୋଲଙ୍କଠାରୁ ଆରମ୍ଭ କରି ୧୧୬୩ରେ ରୁଦ୍ରଦେବଙ୍କ ସ୍ୱାଧୀନତା ଘୋଷଣା, ଗଣପତି ଦେବଙ୍କ ୬୩ ବର୍ଷର ଶାସନ, ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ବୀରତ୍ୱ, ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ରଙ୍କ ୭୭ ନାୟଙ୍କର ବ୍ୟବସ୍ଥା, ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ ଏବଂ ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ ରାମପ୍ପା ମନ୍ଦିର।',
      content: `### 1. ଐତିହାସିକ ଉତ୍ପତ୍ତି ଓ ପ୍ରାରମ୍ଭିକ କାକତୀୟ ଶାସକ
**କାକତୀୟ ରାଜବଂଶ** (୧୦୦୦–୧୩୨୩ ଖ୍ରୀ.ଅ.) ମଧ୍ୟଯୁଗୀୟ ଦକ୍ଷିଣ ଭାରତ ଓ ପୂର୍ବ ଦక్కନର ଅନ୍ୟତମ ଶକ୍ତିଶାଳୀ ସାର୍ବଭୌମ ରାଜବଂଶ ଥିଲା। **ବୟ୍ୟାରମ ଜଳାଶୟ ଶିଳାଲେଖ**, **କାଜିପେଟ ଶିଳାଲେଖ** (୧୦୯୦) ଓ **ମଲ୍କାପୁରମ ସ୍ତମ୍ଭ ଶିଳାଲେଖ** (୧୨୬୧) ଅନୁସାରେ ଏମାନଙ୍କର ପ୍ରାରମ୍ଭିକ ପୂର୍ବପୁରୁଷ ରାଷ୍ଟ୍ରକୂଟ ଓ କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟମାନଙ୍କର ସେନାପତି ଥିଲେ। କୁଳদেବୀ **କାକତୀ ଦେବୀ** ଓ **ସ୍ୱୟମ୍ଭୂଦେବ (ଶିବ)** ଙ୍କ ଉପାସନାରୁ କାକତୀୟ ନାମ ସୃଷ୍ଟି ହୋଇଥିଲା।

### 2. କାକତୀୟ ରାଜବଂଶର ଉദୟ (ସାମନ୍ତରୁ ସାର୍ବଭୌମ ଶକ୍ତି)
**ପ୍ରଥମ ବେତ** (୧୦୦୦–୧୦୫୨), **ପ୍ରଥମ ପ୍ରୋଲ** (୧୦୫୨–୧୦୭୬), **ଦ୍ୱିତୀୟ ବେତ** (୧୦୭୬–୧୧୦୮) ଓ **ଦ୍ୱିତୀୟ ପ୍ରୋଲ** (୧୧୧୬–୧୧୫୭) ଅନୁମକୋଣ୍ଡାରୁ କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟଙ୍କ ମହାମଣ୍ଡଳେଶ୍ୱର ଭାବେ ଶାସନ କରିଥିଲେ। **ରୁଦ୍ରଦେବ (ପ୍ରଥମ ପ୍ରତାପରୁଦ୍ର)** **୧୧୬୩ ଖ୍ରୀ.ଅ. (ଶକ ୧୦୮୪)** ରେ ପୂର୍ଣ୍ଣ ସ୍ୱାଧୀନତା ଘୋଷଣା କରି **ଅନୁମକୋଣ୍ଡା ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ଶିଳାଲେଖ** ସ୍ଥାପନ କରିଥିଲେ।

### 3. କାକତୀୟ ସାମ୍ରାଜ୍ୟ ଓ କ୍ଷେତ୍ରୀୟ ବିସ୍ତାର
**ସମ୍ରାଟ ଗଣପତି ଦେବ** (୧୧୯୯–୧୨୬୨), **ରାଣୀ ରୁଦ୍ରମା ଦେବୀ** (୧୨୬୨–୧୨୮୯) ଓ **ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର** (୧୨୮୯–୧୩୨୩) ଙ୍କ ଶାସନ କାଳରେ ଦ୍ରାକ୍ଷାରାମ, କାଳେଶ୍ୱରମ ଓ ଶ୍ରୀଶୈଳମ ମଧ୍ୟବର୍ତ୍ତୀ ସମଗ୍ର ତେଲୁଗୁ ଅଞ୍ଚଳ (**ତ୍ରିଲିଙ୍ଗ ଦେଶ**) ଏକତ୍ରিত ହୋଇଥିଲା।

### 4. ରାଜଧାନୀ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ / ଏକଶିଳାନଗର)
ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ **ତିନୋଟି ସମକେନ୍ଦ୍ରিক ପ୍ରାଚୀର** (ମାଟି ପ୍ରାଚୀର, ବିନା ଚୂନରେ ନିର୍ମିତ ବିଶାଳ ଗ୍ରାନାଇଟ ପ୍ରସ୍ତର ପ୍ରାଚୀର ଓ ଅନ୍ତଃଦୁର୍ଗ), ୪୫ଟି ବୁରୁଜ ଏବଂ ଚାରୋଟି ଏକଶିଳା **କୀର୍ତ୍ତି ତୋରଣ** ପାଇଁ ପ୍ରସିଦ୍ଧ ଥିଲା।

### 5. ରାଜନୈତିକ ପ୍ରଶାସନ ଓ ନାୟଙ୍କର ପ୍ରଣାଳୀ
ସାମରିକ ଓ ରାଜସ୍ୱ ପ୍ରଶାସନ ପାଇଁ ସାମ୍ରାଜ୍ୟକୁ **୭୭ ଜଣ ନାୟକ**ଙ୍କ ମଧ୍ୟରେ ବଣ୍ଟନ କରାଯାଇ **ନାୟଙ୍କର ପ୍ରଣାଳୀ** ପ୍ରଚଳିତ ହୋଇଥିଲା।

### 6. ସାମରିକ ସଂଗଠନ ଓ ଚତୁର୍ବିଧ ଦୁର୍ଗ
ଗିରି ଦୁର୍ଗ, ସ୍ଥଳ ଦୁର୍ଗ, ଜଳ ଦୁର୍ଗ ଓ ବନ ଦୁର୍ଗ ନିର୍ମାଣରେ **ବଡ଼େରା / ଓଡ଼ର / ଓଡ଼ିଆରାଜୁ** ପ୍ରସ୍ତର ଦୁର୍ଗ ଓ ଜଳାଶୟ ଶିଳ୍ପୀମାନେ ପ୍ରମୁଖ ଭୂମିକା ଗ୍ରହଣ କରିଥିଲେ।

### 7. କୃଷି, ଜଳସେଚନ ଓ ଶୃଙ୍ଖଳିତ ଜଳାଶୟ ନିର୍ମାଣ (ସମୁଦ୍ରମ)
ପାଖାଲ ହ୍ରଦ, ରାମପ୍ପା ହ୍ରଦ, ଲଖନାବରମ, ଘନପୁର ଓ ବୟ୍ୟାରମ ଜଳାଶୟ ନିର୍ମାଣ କରି ଜଳାଶୟ ନିର୍ମାତାମାନଙ୍କୁ **ଦଶବନ୍ଦ** କରମୁକ୍ତ ଭୂମି ପ୍ରଦାନ କରାଯାଇଥିଲା।

### 8. ବାଣିଜ୍ୟ, ଅର୍ଥନୀତି ଓ ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ (୧୨୪୪)
ଗଣପତି ଦେବ **୧୨୪୪ ଖ୍ରୀ.ଅ.** ରେ **ମୋଟୁପଲ୍ଲୀ ବନ୍ଦରରେ ଅଭୟ ଶାସନ** ସ୍ତମ୍ଭ ସ୍ଥାପନ କରି ସାମୁଦ୍ରିକ ବଣିକମାନଙ୍କୁ ସୁରକ୍ଷା ଦେଇଥିଲେ। ଭେନିସ ଯାତ୍ରୀ **ମାର୍କୋ ପୋଲୋ** ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ଶାସନ ଓ ହୀରା ଖଣିର ପ୍ରଶଂସା କରିଛନ୍ତି।

### 9. ଧର୍ମ, ସାହିତ୍ୟ ଓ ସାଂସ୍କୃତିକ ଅବଦାନ
ବିଦ୍ୟାନାଥଙ୍କ **ପ୍ରତାପରୁଦ୍ରୀୟ**, ଜାୟପ ସେନାନୀଙ୍କ **ନୃତ୍ତରତ୍ନାବଳୀ** (ପେରିଣୀ ଶିବତାଣ୍ଡବ ନୃତ୍ୟ) ଓ ତିକ୍କନ ସୋମୟାଜୀଙ୍କ ସାହିତ୍ୟ କୃତି କାକତୀୟ ଯୁଗର ଗୌରବ ବୃଦ୍ଧି କରିଥିଲା।

### 10. ମନ୍ଦିର ସ୍ଥାପତ୍ୟ ଓ ଶିଳ୍ପକଳା
ତ୍ରିକୂଟାଚଳ ଶୈଳୀ, ତାରକାକୃତି ଅଧିଷ୍ଠାନ, ଭୂমিকମ୍ପ-ରୋଧୀ **ବାଲି ମୂଳଦୁଆ (Sandbox foundation)** ଏବଂ **ପାଣିରେ ଭାସୁଥିବା ହାଲୁକା ଇଟାରେ** ନିର୍ମିତ **ରାମପ୍ପା ମନ୍ଦିର (୧୨୧୩ — ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ)** କାକତୀୟ ସ୍ଥାପତ୍ୟର ଅନନ୍ୟ ନିଦର୍ଶନ।

### 11. ଶିଳାଲେଖ ଓ ପ୍ରତ୍ନତାତ୍ତ୍ୱିକ ପ୍ରମାଣ
ଅନୁମକୋଣ୍ଡା (୧୧୬୩), ପାଲମପେଟ (୧୨୧୩), ମୋଟୁପଲ୍ଲୀ (୧୨୪୪), ମଲ୍କାପୁରମ (୧୨୬୧) ଏବଂ ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ବୀରगतिକୁ ଲିପିବଦ୍ଧ କରିଥିବା **ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ (ନଭେମ୍ବର ୧୨୮୯)** ପ୍ରମୁଖ ପ୍ରମାଣ ଅଟେ।

### 12. କାକତୀୟ ସାମ୍ରାଜ୍ୟର ପତନ (୧୩୦୩–୧୩୨୩)
୧୩୦୩ ଉପ୍ପରପଲ୍ଲୀ ଯୁଦ୍ଧରେ ଦିଲ୍ଲୀ ସୁଲତାନୀ ସେନାକୁ ପରାସ୍ତ କରିବା ପରେ, ୧୩୦୯ ଓ ୧୩୧୮ ଅଭିଯାନ ପରେ **୧୩୨୩ ଖ୍ରୀ.ଅ.** ରେ ଉലୁଘ ଖାନ (ମୁହମ୍ମଦ ବିନ ତୁଗଲକ) ଙ୍କ ଅବୋରୋଧ ଫଳରେ ଓରୁଗଲ୍ଲୁର ପତନ ଘଟିଲା; ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର ନର୍ମଦା ନଦୀ ତীরে ପ୍ରାଣତ୍ୟାଗ କଲେ।

### 13. ଐତିହାସିକ ଐତିହ୍ୟ
ମୁସୁନୁରୀ ନାୟକମାନେ ୧୩୩୬ ସୁଦ୍ଧା ଓରୁଗଲ୍ଲୁକୁ ମୁକ୍ତ କରିଥିଲେ ଏବଂ ୧୪୬୦ ଖ୍ରୀ.ଅ. ରେ ସୂର୍ଯ୍ୟବଂଶୀ ଗଜପତି ରାଜକୁମାର **କୁମାର ହମ୍ବୀର ଦେବ** ୱାରଙ୍ଗଲ ଦୁର୍ଗକୁ ବିଜୟ କରି କାକତୀୟ-ଓଡ଼୍ର ସାମରିକ ଐତିହ୍ୟକୁ ପୁନଃସ୍ଥାପିତ କରିଥିଲେ।`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    },
    bn: {
      title:
        'অনুমকোন্ডা ও ওরুগল্লু (ওয়ারাঙ্গল)-এর কাকতীয় রাজবংশ: সার্বভৌম শাসন, শিলালিপি, নায়ঙ্কর প্রশাসন, জলাশয় প্রকৌশল ও মন্দির স্থাপত্য (আনু. ১০০০–১৩২৩ খ্রি.)',
      summary:
        'কাকতীয় রাজবংশ (আনু. ১০০০–১৩২৩ খ্রি.) বিষয়ে ১৩-বিভাগের বিস্তারিত ঐতিহাসিক ও শিলালিপিভিত্তিক গবেষণা নিবন্ধ—প্রথম বেত ও প্রথম প্রোল থেকে শুরু করে ১১৬৩ খ্রিস্টাব্দে রুদ্রদেবের স্বাধীনতা ঘোষণা, গণপতি দেবের ৬৩ বছরের শাসন, রানি রুদ্রমা দেবীর বীরত্ব, দ্বিতীয় প্রতাপরুদ্রের ৭৭ নায়ঙ্কর ব্যবস্থা, ওরুগল্লু দুর্গ এবং ইউনেস্কো বিশ্ব ঐতিহ্য রামাপ্পা মন্দির।',
      content: `### 1. ঐতিহাসিক উৎপত্তি ও প্রারম্ভিক কাকতীয় শাসকগণ
**কাকতীয় রাজবংশ** (আনু. ১০০০–১৩২৩ খ্রি.) মধ্যযুগীয় দক্ষিণ ভারত ও পূর্ব দাক্ষিণাত্যের অন্যতম শক্তিশালী সার্বভৌম শক্তি ছিল। **বয়্যারম জলাশয় শিলালিপি**, **কাজিপেট শিলালিপি** (১০৯০) ও **মল্কাপুরম স্তম্ভ শিলালিপি** (১২৬১) অনুসারে এঁদের প্রারম্ভিক পূর্বপুরুষরা রাষ্ট্রকূট ও কল্যাণী চালুক্যদের সেনাপতি ছিলেন। কুলদেবী **কাকতী দেবী** ও **স্বয়ম্ভুদেব (শিব)**-এর উপাসনা থেকে কাকতীয় নামের উৎপত্তি।

### 2. কাকতীয় রাজবংশের উত্থান (সামন্ত থেকে সার্বভৌম শক্তি)
**প্রথম বেত** (১০০০–১০৫২), **প্রথম প্রোল** (১০৫২–১০৭৬), **দ্বিতীয় বেত** (১০৭৬–১১০৮) ও **দ্বিতীয় প্রোল** (১১১৬–১১৫৭) অনুমকোন্ডা থেকে কল্যাণী চালুক্যদের মহামণ্ডলেশ্বর হিসেবে শাসন করেন। **রুদ্রদেব (প্রথম প্রতাপরুদ্র)** **১১৬৩ খ্রিস্টাব্দে (শক ১০৮৪)** পূর্ণ স্বাধীনতা ঘোষণা করে **অনুমকোন্ডা সহস্র স্তম্ভ মন্দির শিলালিপি** স্থাপন করেন।

### 3. কাকতীয় সাম্রাজ্য ও আঞ্চলিক বিস্তার
**সম্রাট গণপতি দেব** (১১৯৯–১২৬২), **রানি রুদ্রমা দেবী** (১২৬২–১২৮৯) ও **দ্বিতীয় প্রতাপরুদ্র** (১২৮৯–১৩২৩)-এর শাসনকালে দ্রাক্ষারাম, কালেশ্বরম ও শ্রীশৈলমের মধ্যবর্তী সমগ্র তেলুগু অঞ্চল (**ত্রিলিঙ্গ দেশ**) ঐক্যবদ্ধ হয়।

### 4. রাজধানী ওরুগল্লু (ওয়ারাঙ্গল / একশিলানগর)
ওরুগল্লু দুর্গ **তিনটি সমকেন্দ্রিক প্রাচীর** (মাটির প্রাচীর, চুন ছাড়া নির্মিত বিশাল গ্রানাইট পাথরের প্রাচীর ও অন্তর্দুর্গ), ৪৫টি বুরুজ এবং চারটি একশিলা **কীর্তি তোরণ**-এর জন্য বিখ্যাত ছিল।

### 5. রাজনৈতিক প্রশাসন ও নায়ঙ্কর প্রথা
সামরিক ও রাজস্ব প্রশাসনের জন্য সাম্রাজ্যকে **৭৭ জন নায়কের** মধ্যে বণ্টন করে **নায়ঙ্কর প্রথা** চালু করা হয়, যা পরবর্তীকালে বিজয়নগর সাম্রাজ্যের অমর-নায়ক ব্যবস্থার ভিত্তি হয়।

### 6. সামরিক সংগঠন ও চতুর্বিধ দুর্গ
গিরি দুর্গ, স্থল দুর্গ, জল দুর্গ ও বন দুর্গ নির্মাণে **বড্ডেরা / ওড্ডর / ওড়িয়ারাজু** প্রস্তর দুর্গ ও জলাশয় প্রকৌশলীরা মুখ্য ভূমিকা পালন করেন।

### 7. কৃষি, সেচ ও শৃঙ্খলিত জলাশয় নির্মাণ (সমুদ্রম)
পাখাল হ্রদ, রামাপ্পা হ্রদ, লখনাবরম, ঘনপুর ও বয়্যারম জলাশয় নির্মাণ করে জলাশয় নির্মাতাদের **দশবন্দ** করমুক্ত ভূমি প্রদান করা হতো।

### 8. বাণিজ্য, অর্থনীতি ও মোতুপল্লী অভয় শাসন (১২৪৪)
গণপতি দেব **১২৪৪ খ্রিস্টাব্দে মোতুপল্লী বন্দরে অভয় শাসন** স্তম্ভ স্থাপন করে সামুদ্রিক বণিকদের নিরাপত্তা নিশ্চিত করেন। ভেনিসীয় পর্যটক **মার্কো পোলো** রানি রুদ্রমা দেবীর শাসন ও হীরার খনির প্রশংসা করেছেন।

### 9. ধর্ম, সাহিত্য ও সাংস্কৃতিক অবদান
বিদ্যানাথের **প্রতাপরুদ্রীয়**, জায়প সেনানীর **নৃত্তরত্নাবলী** (পেরিণী শিবতাণ্ডব নৃত্য) ও তিক্কন সোমযাজীর সাহিত্যকর্ম কাকতীয় যুগের অমূল্য অবদান।

### 10. মন্দির স্থাপত্য ও ভাস্কর্য
ত্রিকূটাচল শৈলী, তারকাকৃতি ভিত্তি, ভূমিকম্প-প্রতিরোধী **বালির ভিত্তি (Sandbox foundation)** এবং **জলে ভাসমান হালকা ইটে** নির্মিত **রামাপ্পা মন্দির (১২১৩ — ইউনেস্কো বিশ্ব ঐতিহ্য)** কাকতীয় স্থাপত্যের শ্রেষ্ঠ নিদর্শন।

### 11. শিলালিপি ও প্রত্নতাত্ত্বিক প্রমাণ
অনুমকোন্ডা (১১৬৩), পালমপেট (১২১৩), মোতুপল্লী (১২৪৪), মল্কাপুরম (১২৬১) এবং রানি রুদ্রমা দেবীর বীরগতি লিপিবদ্ধকারী **চন্দুপট্লা শিলালিপি (নভেম্বর ১২৮৯)** প্রামাণ্য ঐতিহাসিক দলিল।

### 12. কাকতীয় সাম্রাজ্যের পতন (১৩০৩–১৩২৩)
১৩০৩ খ্রিস্টাব্দে উপ্পরপল্লী যুদ্ধে দিল্লি সুলতানি বাহিনীকে পরাস্ত করার পর, ১৩০৯ ও ১৩১৮-এর অভিযানের শেষে **১৩২৩ খ্রিস্টাব্দে** উলুঘ খান (মুহম্মদ বিন তুঘলক)-এর অবরোধে ওরুগল্লুর পতন ঘটে; দ্বিতীয় প্রতাপরুদ্র নর্মদা নদীর তীরে প্রাণত্যাগ করেন।

### 13. ঐতিহাসিক উত্তরাধিকার
মুসুনুরি নায়করা ১৩৩৬ খ্রিস্টাব্দে ওরুগল্লু পুনরুদ্ধার করেন এবং ১৪৬০ খ্রিস্টাব্দে সূর্যবংশীয় গজপতি রাজপুত্র **কুমার হম্বীর দেব** ওয়ারাঙ্গল দুর্গ মুক্ত করে কাকতীয়-ওড্র সামরিক ঐতিহ্যকে পুনরুজ্জীবিত করেন।`,
      author_name: KAKATIYA_MAIN_ARTICLE.author_name
    }
  }
};

/**
 * ============================================================================
 * PHASE 3 – 9 DOCUMENTED KAKATIYA RULERS (KD-0002 .. KD-0010)
 * Complete 8-language biographical & epigraphic dossiers for KingsQueensPage
 * and Royal Dynasties (GajapathiKingdomPage).
 * ============================================================================
 */
const KAKATIYA_DYNASTY_NAME_ML = {
  en: 'Kakatiya Dynasty (Anumakonda & Orugallu / Warangal)',
  hi: 'काकतीय राजवंश (अनुमकोंडा और ओरुगल्लु / वारंगल)',
  te: 'కాకతీయ రాజవంశం (అనుమకొండ & ఓరుగల్లు / వరంగల్)',
  kn: 'ಕಾಕತೀಯ ರಾಜವಂಶ (ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು / ವರಂಗಲ್)',
  ta: 'காகதீய வம்சம் (அனுமகொண்டா & ஓருகல்லு / வாரங்கல்)',
  mr: 'काकतीय राजवंश (अनुमकोंडा आणि ओरुगल्लु / वरंगळ)',
  or: 'କାକତୀୟ ରାଜବଂଶ (ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁ / ୱାରଙ୍ଗଲ)',
  bn: 'কাকতীয় রাজবংশ (অনুমকোন্ডা ও ওরুগল্লু / ওয়ারাঙ্গল)'
};

export const KAKATIYA_RULER_FIGURES: DocumentedFigureData[] = [
  // 1. Beta I (KD-0002)
  {
    id: 'fig_kakatiya_beta_i',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Beta I (Betaraja I / Garuda Beta)',
      hi: 'बेत प्रथम (बेतराज प्रथम / गरुड़ बेत)',
      te: 'మొదటి బేతరాజు (గరుడ బేతరాజు)',
      kn: 'ಮೊದಲನೇ ಬೇತರಾಜ (ಗರುಡ ಬೇತ)',
      ta: 'முதலாம் பேதராஜன் (கருட பேதன்)',
      mr: 'बेत पहिला (बेतराज पहिला / गरुडा बेत)',
      or: 'ପ୍ରଥମ ବେତରାଜ (ଗରୁଡ଼ ବେତ)',
      bn: 'প্রথম বেতরাজ (গরুড় বেত)'
    },
    alternate_names: ['Betaraja I', 'Garuda Beta', 'Kakatiya Vallabha'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: 'c. 1000 – 1052 CE',
      hi: 'लगभग 1000 – 1052 ई.',
      te: 'క్రీ.శ. 1000 – 1052',
      kn: 'ಸು. ಕ್ರಿ.ಶ. 1000 – 1052',
      ta: 'பொ.ஊ. 1000 – 1052',
      mr: 'इ.स. १००० – १०५२',
      or: '୧୦୦୦ – ୧୦୫୨ ଖ୍ରୀ.ଅ.',
      bn: 'আনু. ১০০০ – ১০৫২ খ্রি.'
    },
    approx_dates: 'c. 1000 – 1052 CE',
    known_titles: {
      en: ['Kakatiya Vallabha', 'Garuda Beta', 'Samanta of Anumakonda'],
      hi: ['काकतीय वल्लभ', 'गरुड़ बेत', 'अनुमकोंडा सामंत'],
      te: ['కాకతి వల్లభ', 'గరుడ బేత', 'అనుమకొండ సామంత'],
      kn: ['ಕಾಕತೀಯ ವಲ್ಲಭ', 'ಗರುಡ ಬೇತ', 'ಅನುಮಕೊಂಡ ಸಾಮಂತ'],
      ta: ['காகதீய வல்லபன்', 'கருட பேதன்', 'அனுமகொண்டா சாமந்தன்'],
      mr: ['काकतीय वल्लभ', 'गरुडा बेत', 'अनुमकोंडा सामंत'],
      or: ['କାକତୀୟ ବଲ୍ଲଭ', 'ଗରୁଡ଼ ବେତ', 'ଅନୁମକୋଣ୍ଡା ସାମନ୍ତ'],
      bn: ['কাকতীয় বল্লভ', 'গরুড় বেত', 'অনুমকোন্ডা সামন্ত']
    },
    biography: {
      en: 'Son of Gunda IV (Gudya) and founder of the historical Kakatiya principality at Anumakonda. Following the displacement of his father at Koravi during the Chola-Chalukya succession wars in Vengi, young Beta I was restored to authority with the assistance of his paternal aunt Kamavasani and her husband Viriyala Erra Bhupati. Realigning the house with the Western Chalukyas of Kalyani under Jayasimha II and Someshvara I, Beta I consolidated Anumakonda and participated in Chalukya expeditions toward Kanchipuram.',
      hi: 'गुंडा चतुर्थ के पुत्र और अनुमकोंडा में ऐतिहासिक काकतीय रियासत के संस्थापक। अपनी बुआ कामवसानी और विरियाला एर्रा भूपति की सहायता से उन्होंने अनुमकोंडा में सत्ता स्थापित की और कल्याणी चालुक्यों के अधीन कांचीपुरम अभियान में भाग लिया।',
      te: 'నాలుగవ గుండరాజు కుమారుడు మరియు అనుమకొండలో చారిత్రక కాకతీయ రాజ్య స్థాపకుడు. తన మేనత్త కామవసాని, విరియాల ఎర్ర భూపతి సహాయంతో కొరవి-అనుమకొండ ప్రాంతంలో అధికారాన్ని పునరుద్ధరించుకొని, కళ్యాణి చాళుక్యుల పక్షాన కాంచీపురం దండయాత్రలో పాల్గొన్నాడు.',
      kn: 'ನಾಲ್ಕನೇ ಗುಂಡರಾಜನ ಪುತ್ರ ಮತ್ತು ಅನುಮಕೊಂಡದಲ್ಲಿ ಕಾಕತೀಯ ಸಂಸ್ಥಾನದ ಸ್ಥಾಪಕ. ತನ್ನ ಸೋದರತ್ತೆ ಕಾಮವಸಾನಿ ಮತ್ತು ವಿರಿಯಾಲ ಎರ್ರ ಭೂಪತಿಯ ನೆರವಿನಿಂದ ಅಧಿಕಾರವನ್ನು ಮರಳಿ ಪಡೆದು ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರ ಪರವಾಗಿ ಕಾಂಚೀಪುರಂ ದಂಡಯಾತ್ರೆಯಲ್ಲಿ ಭಾಗವಹಿಸಿದನು.',
      ta: 'நான்காம் குண்டராஜனின் புதல்வரும் அனுமகொண்டாவில் காகதீய அரசை நிறுவியவருமாவார். தனது அத்தை காமவசானி மற்றும் விரியால எர்ர பூபதியின் உதவியுடன் ஆட்சியை நிலைநிறுத்தி, கல்யாணிச் சாளுக்கியர் சார்பில் காஞ்சிபுரம் படையெடுப்பில் பங்கேற்றார்.',
      mr: 'चौथा गुंड याचा पुत्र आणि अनुमकोंडा येथील ऐतिहासिक काकतीय राज्याचा संस्थापक. आत्या कामवसानी आणि विरियाला एर्रा भूपती यांच्या मदतीने त्याने अनुमकोंडा येथे सत्ता प्रस्थापित केली.',
      or: 'ଚତୁର୍ଥ ଗୁଣ୍ଡଙ୍କ ପୁତ୍ର ଓ ଅନୁମକୋଣ୍ଡାରେ ଐତିହାସିକ କାକତୀୟ ରାଜ୍ୟର ପ୍ରତିଷ୍ଠାତା। ପିଉସୀ କାମବସାନୀ ଓ ବିরিୟାଲା ଏର୍ରା ଭୂପତିଙ୍କ ସହାୟତାରେ ସେ ଅନୁମକୋଣ୍ଡାରେ ଶାସନ ସୁଦୃଢ଼ କରିଥିଲେ।',
      bn: 'চতুর্থ গুন্ডের পুত্র এবং অনুমকোন্ডায় ঐতিহাসিক কাকতীয় রাজ্যের প্রতিষ্ঠাতা। পিসি কামবসানী ও বিরিয়ালা এর্রা ভূপতির সহায়তায় তিনি অনুমকোন্ডায় ক্ষমতা সুদৃঢ় করেন।'
    },
    major_events: {
      en: [
        'Re-establishment of Kakatiya political authority at Anumakonda with Viriyala alliance (c. 1000 CE)',
        'Military participation in Western Chalukya campaigns against Chola territories',
        'Sanigaram Epigraph (1051 CE) recording early Kakatiya administration in Karimnagar corridor'
      ],
      hi: [
        'विरियाला गठबंधन के साथ अनुमकोंडा में काकतीय सत्ता की पुनर्स्थापना (लगभग 1000 ई.)',
        'चोल क्षेत्रों के विरुद्ध कल्याणी चालुक्य सैन्य अभियानों में भागीदारी',
        'सनगिरम शिलालेख (1051 ई.) में प्रारंभिक प्रशासन का उल्लेख'
      ],
      te: [
        'విరియాల కూటమి సహాయంతో అనుమకొండలో కాకతీయ అధికార పునరుద్ధరణ (క్రీ.శ. 1000)',
        'చోళులపై కళ్యాణి చాళుక్యుల దండయాత్రలలో సైనిక భాగస్వామ్యం',
        'శనిగరం శాసనం (1051) ద్వారా తొలి కాకతీయ పాలనా నమోదు'
      ],
      kn: [
        'ವಿರಿಯಾಲ ಮೈತ್ರಿಯೊಂದಿಗೆ ಅನುಮಕೊಂಡದಲ್ಲಿ ಕಾಕತೀಯ ಅಧಿಕಾರ ಸ್ಥಾಪನೆ (ಕ್ರಿ.ಶ. 1000)',
        'ಚೋಳರ ವಿರುದ್ಧ ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರ ದಂಡಯಾತ್ರೆಗಳಲ್ಲಿ ಭಾಗಿ',
        'ಶನಿಗರಂ ಶಾಸನದಲ್ಲಿ (1051) ಆರಂಭಿಕ ಆಡಳಿತದ ದಾಖಲೆ'
      ],
      ta: [
        'விரியால கூட்டணியுடன் அனுமகொண்டாவில் காகதீய ஆட்சி நிலைநிறுத்தம் (பொ.ஊ. 1000)',
        'சோழர்களுக்கு எதிரான கல்யாணிச் சாளுக்கியப் போர்களில் பங்கேற்பு',
        'சனிகரம் கல்வெட்டில் (1051) தொடக்கக் கால நிர்வாகப் பதிவு'
      ],
      mr: [
        'विरियाला युतीसह अनुमकोंडा येथे काकतीय सत्तेची पुनर्स्थापना (इ.स. १०००)',
        'चोळांविरुद्ध कल्याणी चालुक्यांच्या मोहिमांमध्ये सहभाग',
        'शनिगरम शिलालेखात (१०५१) प्रारंभिक प्रशासनाची नोंद'
      ],
      or: [
        'ବିରିୟାଲା ମେଣ୍ଟ ସହ ଅନୁମକୋଣ୍ଡାରେ କାକତୀୟ ଶାସନ ପ୍ରତିଷ୍ଠା (୧୦୦୦ ଖ୍ରୀ.ଅ.)',
        'ଚୋଳଙ୍କ ବିରୁଦ୍ଧରେ କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟ ଅଭିଯାନରେ ଯୋଗଦାନ',
        'ଶനിଗରମ ଶିଳାଲେଖ (୧୦୫୧) ରେ ପ୍ରାରମ୍ଭିକ ପ୍ରଶାସନର ଉଲ୍ଲେଖ'
      ],
      bn: [
        'বিরিয়ালা জোটের সহায়তায় অনুমকোন্ডায় কাকতীয় শাসন প্রতিষ্ঠা (১০০০ খ্রি.)',
        'চোলদের বিরুদ্ধে কল্যাণী চালুক্য অভিযানে অংশগ্রহণ',
        'শনিগরম শিলালিপিতে (১০৫১) প্রারম্ভিক প্রশাসনের উল্লেখ'
      ]
    },
    historical_significance: {
      en: 'Transitioned the Kakatiya family from Rashtrakuta frontier commanders into hereditary Chalukya Mahamandalesvaras centered at Anumakonda.',
      hi: 'काकतीय वंश को राष्ट्रकूट सीमांत सेनापतियों से अनुमकोंडा के वंशानुगत चालुक्य महामंडलेश्वर के रूप में स्थापित किया।',
      te: 'కాకతీయ వంశాన్ని రాష్ట్రకూట సరిహద్దు సేనానుల స్థాయి నుండి అనుమకొండ కేంద్రంగా వంశపారంపర్య మహామండలేశ్వరులుగా నిలిపాడు.',
      kn: 'ಕಾಕತೀಯ ವಂಶವನ್ನು ಅನುಮಕೊಂಡ ಕೇಂದ್ರಿತ ವಂಶಪಾರಂಪರ್ಯ ಮಹಾಮಂಡಲೇಶ್ವರರಾಗಿ ರೂಪಿಸಿದನು.',
      ta: 'காகதீய குலத்தை அனுமகொண்டாவை மையமாகக் கொண்ட பரம்பரை மகாமண்டலேஸ்வரர்களாக உயர்த்தினார்.',
      mr: 'काकतीय घराण्याला अनुमकोंडा येथील वंशपरंपरागत महामंडलेश्वर म्हणून प्रस्थापित केले.',
      or: 'କାକତୀୟ ବଂଶକୁ ଅନୁମକୋଣ୍ଡାର ବଂଶାନୁକ୍ରମିକ ମହାମଣ୍ଡଳେଶ୍ୱର ଭାବେ ପ୍ରତିଷ୍ଠିତ କରିଥିଲେ।',
      bn: 'কাকতীয় বংশকে অনুমকোন্ডার বংশানুক্রমিক মহামণ্ডলেশ্বর হিসেবে প্রতিষ্ঠিত করেন।'
    },
    associated_places: {
      en: ['Anumakonda (Hanamkonda)', 'Koravi', 'Sanigaram (Karimnagar)'],
      hi: ['अनुमकोंडा (हनमकोंडा)', 'कोरवी', 'सनगिरम (करीमनगर)'],
      te: ['అనుమకొండ (హనుమకొండ)', 'కొరవి', 'శనిగరం (కరీంనగర్)'],
      kn: ['ಅನುಮಕೊಂಡ (ಹನುಮಕೊಂಡ)', 'ಕೊರವಿ', 'ಶನಿಗರಂ'],
      ta: ['அனுமகொண்டா (ஹனம்கொண்டா)', 'கொரவி', 'சனிகரம்'],
      mr: ['अनुमकोंडा (हनमकोंडा)', 'कोरवी', 'शनिगरम'],
      or: ['ଅନୁମକୋଣ୍ଡା (ହନମକୋଣ୍ଡା)', 'କୋରବୀ', 'ଶനിଗରମ'],
      bn: ['অনুমকোন্ডা (হনমকোন্ডা)', 'কোরবী', 'শনিগরম']
    },
    evidence_status: 'Epigraphic Record',
    image_url: ARCHIVE_IMG('odra_fort_inscription.jpg'),
    inscriptions_ids: ['insc_anumakonda_1163'],
    citations: [
      'Bayyaram Tank Inscription of Mailama (Epigraphia Andhrica, Vol. I)',
      'Kazipet Darga Inscription of Beta II (1090 CE)',
      'Sastry, P.V. Parabrahma, The Kakatiyas of Warangal (1978), pp. 42–46'
    ]
  },

  // 2. Prola I (KD-0003)
  {
    id: 'fig_kakatiya_prola_i',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Prola I (Prolaraja I / Arigajakesari)',
      hi: 'प्रोल प्रथम (प्रोलराज प्रथम / अरिगजकेसरी)',
      te: 'మొదటి ప్రోలరాజు (అరిగజకేసరి)',
      kn: 'ಮೊದಲನೇ ಪ್ರೋಲರಾಜ (ಅರಿಗಜಕೇಸರಿ)',
      ta: 'முதலாம் புரோலராஜன் (அரிகஜகேசரி)',
      mr: 'प्रोल पहिला (प्रोलराज पहिला / अरिगजकेसरी)',
      or: 'ପ୍ରଥମ ପ୍ରୋଲରାଜ (ଅରିଗଜକେସରୀ)',
      bn: 'প্রথম প্রোলরাজ (অরিগজকেশরী)'
    },
    alternate_names: ['Prolaraja I', 'Arigajakesari', 'Kakati Prola'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: 'c. 1052 – 1076 CE',
      hi: 'लगभग 1052 – 1076 ई.',
      te: 'క్రీ.శ. 1052 – 1076',
      kn: 'ಸು. ಕ್ರಿ.ಶ. 1052 – 1076',
      ta: 'பொ.ஊ. 1052 – 1076',
      mr: 'इ.स. १०५२ – १०७६',
      or: '୧୦୫୨ – ୧୦୭୬ ଖ୍ରୀ.ଅ.',
      bn: 'আনু. ১০৫২ – ১০৭৬ খ্রি.'
    },
    approx_dates: 'c. 1052 – 1076 CE',
    known_titles: {
      en: ['Arigajakesari (Lion to the Elephant-like Enemies)', 'Mahamandalesvara', 'Lord of Anumakonda Vishaya'],
      hi: ['अरिगजकेसरी', 'महामंडलेश्वर', 'अनुमकोंडा विषयाधिपति'],
      te: ['అరిగజకేసరి', 'మహామండలేశ్వర', 'అనుమకొండ విషయాధిపతి'],
      kn: ['ಅರಿಗಜಕೇಸರಿ', 'ಮಹಾಮಂಡಲೇಶ್ವರ', 'ಅನುಮಕೊಂಡ ವಿಷಯಾಧಿಪತಿ'],
      ta: ['அரிகஜகேசரி', 'மகாமண்டலேஸ்வரன்', 'அனுமகொண்டா விஷயாதிபதி'],
      mr: ['अरिगजकेसरी', 'महामंडलेश्वर', 'अनुमकोंडा विषयाधिपती'],
      or: ['ଅରିଗଜକେସରୀ', 'ମହାମଣ୍ଡଳେଶ୍ୱର', 'ଅନୁମକୋଣ୍ଡା ବିଷୟାଧିପତି'],
      bn: ['অরিগজকেশরী', 'মহামণ্ডলেশ্বর', 'অনুমকোন্ডা বিষয়াধিপতি']
    },
    biography: {
      en: 'Son and successor of Beta I who secured the permanent hereditary grant (sthiram-vishayam) of Anumakonda Vishaya from Western Chalukya Emperor Someshvara I Trailokyamalla in recognition of his victories in the Konkan, Chakrakuta (Bastar), and Vemulavada campaigns. Bearing the biruda Arigajakesari ("Lion to Enemy Elephants"), Prola I excavated the monumental Kesari Samudram irrigation reservoir (modern Kesamudram in Mahabubabad district), initiating the great Kakatiya tradition of royal hydraulic tank construction.',
      hi: 'बेत प्रथम के पुत्र एवं उत्तराधिकारी, जिन्होंने कल्याणी चालुक्य सम्राट सोमेश्वर प्रथम त्रैलोक्यमल्ल से कोंकण और चक्रकूट अभियानों में वीरता के लिए अनुमकोंडा विषय का स्थायी वंशानुगत अनुदान प्राप्त किया। अरिगजकेसरी की उपाधि धारण कर उन्होंने विशाल केसरी समुद्रम जलाशय का निर्माण कराया।',
      te: 'మొదటి బేతరాజు కుమారుడు. కళ్యాణి చాళుక్య చక్రవర్తి మొదటి సోమేశ్వరుని (త్రైలోక్యమల్ల) పక్షాన కొంకణ, చక్రకూట (బస్తర్) యుద్ధాలలో విజయం సాధించి అనుమకొండ విషయాన్ని శాశ్వత భరణంగా పొందాడు. అరిగజకేసరి బిరుదాంకితుడైన ఈయన కేసరి సముద్రం (కేసముద్రం) అనే మహా జలాశయాన్ని తవ్వించి కాకతీయ చెరువుల నిర్మాణ సంప్రదాయానికి నాంది పలికాడు.',
      kn: 'ಮೊದಲನೇ ಬೇತರಾಜನ ಪುತ್ರ. ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯ ಸಾಮ್ರಾಟ ಒಂದನೇ ಸೋಮೇಶ್ವರನಿಂದ ಅನುಮಕೊಂಡ ವಿಷಯವನ್ನು ಶಾಶ್ವತ ಜಾಗೀರಾಗಿ ಪಡೆದನು. ಅರಿಗಜಕೇಸರಿ ಎಂಬ ಬಿರುದನ್ನು ಹೊಂದಿದ್ದ ಇವನು ಕೇಸರಿ ಸಮುದ್ರಂ ಎಂಬ ಬೃಹತ್ ಕೆರೆಯನ್ನು ನಿರ್ಮಿಸಿದನು.',
      ta: 'முதலாம் பேதராஜனின் புதல்வர். கல்யாணிச் சாளுக்கிய மன்னர் முதலாம் சோமேஸ்வரரிடமிருந்து அனுமகொண்டா விஷயத்தை நிரந்தர உரிமையாகப் பெற்றார். அரிகஜகேசரி என்ற பட்டம் பூண்டு கேசரி சமுத்திரம் என்ற மாபெரும் ஏரியை வெட்டினார்.',
      mr: 'बेत पहिल्याचा पुत्र. कल्याणी चालुक्य सम्राट सोमेश्वर पहिला याच्याकडून अनुमकोंडा विषयाची कायमस्वरूपी सनद मिळवली आणि अरिगजकेसरी पदवी धारण करून केसरी समुद्रम तलाव बांधला.',
      or: 'ପ୍ରଥମ ବେତରାଜଙ୍କ ପୁତ୍ର। କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟ ସମ୍ରାଟ ପ୍ରଥମ ସୋମେଶ୍ୱରଙ୍କଠାରୁ ଅନୁମକୋଣ୍ଡା ବିଷୟର ସ୍ଥାୟୀ ଅନୁଦାନ ପାଇଥିଲେ ଏବଂ ଅରିଗଜକେସରୀ ଉପାଧି ଧାରଣ କରି କେସରୀ ସମୁଦ୍ରମ ଜଳାଶୟ ନିର୍ମାଣ କରିଥିଲେ।',
      bn: 'প্রথম বেতরাজের পুত্র। কল্যাণী চালুক্য সম্রাট প্রথম সোমেশ্বরের কাছ থেকে অনুমকোন্ডা বিষয়ের স্থায়ী সনদ লাভ করেন এবং অরিগজকেশরী উপাধি ধারণ করে কেশরী সমুদ্রম জলাশয় খনন করান।'
    },
    major_events: {
      en: [
        'Permanent royal charter of Anumakonda Vishaya granted by Chalukya Someshvara I',
        'Military campaigns in Chakrakuta (Bastar), Konkan, and Bhadranga',
        'Excavation of the Kesari Samudram (Kesamudram) irrigation tank'
      ],
      hi: [
        'चालुक्य सम्राट सोमेश्वर प्रथम द्वारा अनुमकोंडा विषय का स्थायी अनुदान',
        'चक्रकूट (बस्तर) और कोंकण के सैन्य अभियान',
        'केसरी समुद्रम (केसमुद्रम) विशाल जलाशय का निर्माण'
      ],
      te: [
        'చాళుక్య మొదటి సోమేశ్వరుని నుండి అనుమకొండ విషయ శాశ్వత సనదు పొందుట',
        'చక్రకూట (బస్తర్) మరియు కొంకణ సైనిక విజయాలు',
        'కేసరి సముద్రం (కేసముద్రం) మహా జలాశయ నిర్మాణం'
      ],
      kn: [
        'ಚಾಳುಕ್ಯ ಸೋಮೇಶ್ವರನಿಂದ ಅನುಮಕೊಂಡ ವಿಷಯದ ಶಾಶ್ವತ ಸನ್ನದು',
        'ಚಕ್ರಕೂಟ ಮತ್ತು ಕೊಂಕಣ ದಂಡಯಾತ್ರೆಗಳು',
        'ಕೇಸರಿ ಸಮುದ್ರಂ ಜಲಾಶಯದ ನಿರ್ಮಾಣ'
      ],
      ta: [
        'சாளுக்கிய முதலாம் சோமேஸ்வரரிடமிருந்து அனுமகொண்டா நிரந்தரப் பட்டயம் பெறுதல்',
        'சக்ரகூடம் மற்றும் கொங்கணப் படையெடுப்புகள்',
        'கேசரி சமுத்திரம் நீர்த்தேக்க உருவாக்கம்'
      ],
      mr: [
        'चालुक्य सोमेश्वर पहिल्याकडून अनुमकोंडा विषयाची कायमस्वरूपी सनद',
        'चक्रकूट आणि कोकण लष्करी मोहिमा',
        'केसरी समुद्रम तलावाची उभारणी'
      ],
      or: [
        'ଚାଲୁକ୍ୟ ପ୍ରଥମ ସୋମେଶ୍ୱରଙ୍କ ଦ୍ୱାରା ଅନୁମକୋଣ୍ଡା ବିଷୟର ସ୍ଥାୟୀ ସനଦ',
        'ଚକ୍ରକୂଟ ଓ କୋଙ୍କଣ ସାମରିକ ଅଭିଯାନ',
        'କେସରୀ ସମୁଦ୍ରମ ଜଳାଶୟ ନିର୍ମାଣ'
      ],
      bn: [
        'চালুক্য প্রথম সোমেশ্বরের কাছ থেকে অনুমকোন্ডা বিষয়ের স্থায়ী সনদ লাভ',
        'চক্রকূট ও কোঙ্কণ সামরিক অভিযান',
        'কেশরী সমুদ্রম জলাশয় নির্মাণ'
      ]
    },
    historical_significance: {
      en: 'Secured the territorial permanence of Anumakonda for the Kakatiya dynasty and pioneered large-scale royal tank irrigation (Samudrams) in upland Telangana.',
      hi: 'अनुमकोंडा पर काकतीय वंश का स्थायी अधिकार सुनिश्चित किया और तेलंगाना पठार में विशाल समुद्रम जलाशयों की परंपरा शुरू की।',
      te: 'అనుమకొండపై కాకతీయుల శాశ్వత ఆధిపత్యాన్ని సుస్థిరం చేసి, తెలంగాణ పీఠభూమిలో సముద్రం పేరిట భారీ చెరువుల నిర్మాణానికి ఆద్యుడయ్యాడు.',
      kn: 'ಅನುಮಕೊಂಡದ ಮೇಲೆ ಕಾಕತೀಯರ ಶಾಶ್ವತ ಅಧಿಕಾರವನ್ನು ಸ್ಥಾಪಿಸಿ ಬೃಹತ್ ಕೆರೆ ನಿರ್ಮಾಣ ಪರಂಪರೆಯನ್ನು ಆರಂಭಿಸಿದನು.',
      ta: 'அனுமகொண்டாவில் காகதீயரின் நிரந்தர ஆட்சியை உறுதிப்படுத்தி, மாபெரும் சமுத்திரம் ஏரிப் பாசன மரபைத் தொடங்கி வைத்தார்.',
      mr: 'अनुमकोंडावर काकतीयांचे कायमस्वरूपी वर्चस्व प्रस्थापित केले आणि भव्य समुद्रम तलाव परंपरेची मुहूर्तमेढ रोवली.',
      or: 'ଅନୁମକୋଣ୍ଡାରେ କାକତୀୟଙ୍କ ସ୍ଥାୟୀ ଅଧିକାର ନିଶ୍ଚିତ କରି ବିଶାଳ ସମୁଦ୍ରମ ଜଳାଶୟ ପରମ୍ପରା ଆରମ୍ଭ କରିଥିଲେ।',
      bn: 'অনুমকোন্ডায় কাকতীয়দের স্থায়ী অধিকার নিশ্চিত করেন এবং বিশাল সমুদ্রম জলাশয় নির্মাণের ঐতিহ্য সূচনা করেন।'
    },
    associated_places: {
      en: ['Anumakonda (Hanamkonda)', 'Kesamudram (Kesari Samudram)', 'Chakrakuta (Bastar)'],
      hi: ['अनुमकोंडा (हनमकोंडा)', 'केसमुद्रम (केसरी समुद्रम)', 'चक्रकूट (बस्तर)'],
      te: ['అనుమకొండ (హనుమకొండ)', 'కేసముద్రం (కేసరి సముద్రం)', 'చక్రకూటం (బస్తర్)'],
      kn: ['ಅನುಮಕೊಂಡ', 'ಕೇಸಮುದ್ರಂ', 'ಚಕ್ರಕೂಟ'],
      ta: ['அனுமகொண்டா', 'கேசமுத்திரம்', 'சக்ரகூடம்'],
      mr: ['अनुमकोंडा', 'केसमुद्रम', 'चक्रकूट'],
      or: ['ଅନୁମକୋଣ୍ଡା', 'କେସମୁଦ୍ରମ', 'ଚକ୍ରକୂଟ'],
      bn: ['অনুমকোন্ডা', 'কেশমুদ্রম', 'চক্রকূট']
    },
    evidence_status: 'Epigraphic Record',
    image_url: ARCHIVE_IMG('oad_hydraulic_stepwell.jpg'),
    inscriptions_ids: ['insc_anumakonda_1163'],
    citations: [
      'Kazipet Inscription of Beta II (1090 CE, Inscriptions of Andhra Pradesh: Warangal District)',
      'Anumakonda Inscription of Rudradeva (1163 CE, Epigraphia Indica Vol. IX)',
      'Talbot, Cynthia, Precolonial India in Practice (2001), OUP'
    ]
  },

  // 3. Beta II (KD-0004)
  {
    id: 'fig_kakatiya_beta_ii',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Beta II (Tribhuvanamalla Betaraja II / Vikramachakri)',
      hi: 'बेत द्वितीय (त्रिभुवनमल्ल बेतराज द्वितीय / विक्रमचक्री)',
      te: 'రెండవ బేతరాజు (త్రిభువనమల్ల / విక్రమచక్రి)',
      kn: 'ಎರಡನೇ ಬೇತರಾಜ (ತ್ರಿಭುವನಮಲ್ಲ / ವಿಕ್ರಮಚಕ್ರಿ)',
      ta: 'இரண்டாம் பேதராஜன் (திரிபுவனமல்லன் / விக்ரமசக்ரி)',
      mr: 'बेत दुसरा (त्रिभुवनमल्ल बेतराज दुसरा / विक्रमचक्री)',
      or: 'ଦ୍ୱିତୀୟ ବେତରାଜ (ତ୍ରିଭୁବନମଲ୍ଲ / ବିକ୍ରମଚକ୍ରୀ)',
      bn: 'দ্বিতীয় বেতরাজ (ত্রিভুবনমল্ল / বিক্রমচক্রী)'
    },
    alternate_names: ['Tribhuvanamalla Beta', 'Vikramachakri', 'Chalamarttiganda'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: 'c. 1076 – 1108 CE',
      hi: 'लगभग 1076 – 1108 ई.',
      te: 'క్రీ.శ. 1076 – 1108',
      kn: 'ಸು. ಕ್ರಿ.ಶ. 1076 – 1108',
      ta: 'பொ.ஊ. 1076 – 1108',
      mr: 'इ.स. १०७६ – ११०८',
      or: '୧୦୭୬ – ୧୧୦୮ ଖ୍ରୀ.ଅ.',
      bn: 'আনু. ১০৭৬ – ১১০৮ খ্রি.'
    },
    approx_dates: 'c. 1076 – 1108 CE',
    known_titles: {
      en: ['Vikramachakri', 'Tribhuvanamalla', 'Mahamandalesvara of Sabbi-1000 & Anumakonda'],
      hi: ['विक्रमचक्री', 'त्रिभुवनमल्ल', 'सब्बी-1000 एवं अनुमकोंडा महामंडलेश्वर'],
      te: ['విక్రమచక్రి', 'త్రిభువనమల్ల', 'సబ్బి-1000 & అనుమకొండ మహామండలేశ్వర'],
      kn: ['ವಿಕ್ರಮಚಕ್ರಿ', 'ತ್ರಿಭುವನಮಲ್ಲ', 'ಸಬ್ಬಿ-1000 ಮತ್ತು ಅನುಮಕೊಂಡ ಮಹಾಮಂಡಲೇಶ್ವರ'],
      ta: ['விக்ரமசக்ரி', 'திரிபுவனமல்லன்', 'சப்பி-1000 & அனுமகொண்டா மகாமண்டலேஸ்வரன்'],
      mr: ['विक्रमचक्री', 'त्रिभुवनमल्ल', 'सब्बी-१००० व अनुमकोंडा महामंडलेश्वर'],
      or: ['ବିକ୍ରମଚକ୍ରୀ', 'ତ୍ରିଭୁବନମଲ୍ଲ', 'ସବ୍ବି-୧୦୦୦ ଓ ଅନୁମକୋଣ୍ଡା ମହାମଣ୍ଡଳେଶ୍ୱର'],
      bn: ['বিক্রমচক্রী', 'ত্রিভুবনমল্ল', 'সব্বি-১০০০ ও অনুমকোন্ডা মহামণ্ডলেশ্বর']
    },
    biography: {
      en: 'Son of Prola I and contemporary of Kalyani Chalukya Emperor Vikramaditya VI (Tribhuvanamalla). Beta II received the prestigious titles Vikramachakri and Tribhuvanamalla along with the Sabbi-1000 province (Karimnagar–Nizamabad region). He took Kalamukha Shaiva initiation (Siva-diksha) from Acharya Ramesvara Pandita of the Mallikarjuna Shila Matha at Srisailam, founded the town of Sivapura at Anumakonda, and issued the famous Kazipet Darga Inscription (1090 CE).',
      hi: 'प्रोल प्रथम के पुत्र और कल्याणी चालुक्य सम्राट विक्रमादित्य षष्ठ के समकालीन। उन्हें विक्रमचक्री और त्रिभुवनमल्ल की उपाधियाँ तथा सब्बी-1000 प्रांत प्राप्त हुआ। उन्होंने आचार्य रामेश्वर पंडित से शिव-दीक्षा ली और 1090 ई. का प्रसिद्ध काजीपेट शिलालेख जारी किया।',
      te: 'మొదటి ప్రోలరాజు కుమారుడు మరియు కళ్యాణి చాళుక్య చక్రవర్తి ఆరవ విక్రమాదిత్యుని సమకాలికుడు. విక్రమచక్రి, త్రిభువనమల్ల బిరుదులతో పాటు సబ్బి-1000 మండలాన్ని పొందాడు. శ్రీశైల మల్లికార్జున శిలామఠాధిపతి రామేశ్వర పండితుని వద్ద శివదీక్ష స్వీకరించి, అనుమకొండలో శివపురాన్ని నిర్మించి, 1090లో ప్రసిద్ధ కాజీపేట శాసనాన్ని వేయించాడు.',
      kn: 'ಮೊದಲನೇ ಪ್ರೋಲರಾಜನ ಪುತ್ರ ಮತ್ತು ಚಾಳುಕ್ಯ ಆರನೇ ವಿಕ್ರಮಾದಿತ್ಯನ ಸಮಕಾಲೀನ. ವಿಕ್ರಮಚಕ್ರಿ ಮತ್ತು ತ್ರಿಭುವನಮಲ್ಲ ಬಿರುದುಗಳೊಂದಿಗೆ ಸಬ್ಬಿ-1000 ಪ್ರಾಂತ್ಯವನ್ನು ಪಡೆದನು ಹಾಗೂ ರಾಮೇಶ್ವರ ಪಂಡಿತರಿಂದ ಶಿವದೀಕ್ಷೆ ಸ್ವೀಕರಿಸಿ ಕಾಜಿಪೇಟ ಶಾಸನವನ್ನು (1090) ಹೊರಡಿಸಿದನು.',
      ta: 'முதலாம் புரோலராஜனின் புதல்வர். ஆறாம் விக்ரமாதித்தனிடமிருந்து விக்ரமசக்ரி, திரிபுவனமல்லன் பட்டங்களையும் சப்பி-1000 மண்டலத்தையும் பெற்றார். இராமேஸ்வர பண்டிதரிடம் சிவதீட்சை பெற்று 1090இல் காஜிப்பேட்டை கல்வெட்டை வெளியிட்டார்.',
      mr: 'प्रोल पहिल्याचा पुत्र. चालुक्य सम्राट सहावा विक्रमादित्य याच्याकडून विक्रमचक्री पदवी व सब्बी-१००० प्रांत मिळवला आणि आचार्य रामेश्वर पंडित यांच्याकडून शिवदीक्षा घेऊन १०९० चा काझीपेट शिलालेख कोरला.',
      or: 'ପ୍ରଥମ ପ୍ରୋଲରାଜଙ୍କ ପୁତ୍ର। ଚାଲୁକ୍ୟ ଷଷ୍ଠ ବିକ୍ରମାଦିତ୍ୟଙ୍କଠାରୁ ବିକ୍ରମଚକ୍ରୀ ଉପାଧି ଓ ସବ୍ବି-୧୦୦୦ ପ୍ରାନ୍ତ ପାଇଥିଲେ ଏବଂ ରାମେଶ୍ୱର ପଣ୍ଡିତଙ୍କଠାରୁ ଶିବଦୀକ୍ଷା ଗ୍ରହଣ କରି ୧୦୯୦ରେ କାଜିପେଟ ଶିଳାଲେଖ ଜାରି କରିଥିଲେ।',
      bn: 'প্রথম প্রোলরাজের পুত্র। চালুক্য ষষ্ঠ বিক্রমাদিত্যের কাছ থেকে বিক্রমচক্রী উপাধি ও সব্বি-১০০০ প্রদেশ লাভ করেন এবং রামেশ্বর পণ্ডিতের কাছে শিবদীক্ষা গ্রহণ করে ১০৯০ খ্রিস্টাব্দে কাজিপেট শিলালিপি জারি করেন।'
    },
    major_events: {
      en: [
        'Acquisition of Sabbi-1000 territory from Chalukya Emperor Vikramaditya VI',
        'Issuance of the Kazipet Darga Stone Inscription (1079 & 1090 CE)',
        'Foundation of Sivapura and patronage of Kalamukha Shaiva preceptor Ramesvara Pandita'
      ],
      hi: [
        'चालुक्य सम्राट विक्रमादित्य षष्ठ से सब्बी-1000 प्रांत की प्राप्ति',
        'काजीपेट दरगाह पाषाण शिलालेख (1079 एवं 1090 ई.) का प्रकाशन',
        'अनुमकोंडा में शिवपुर की स्थापना और आचार्य रामेश्वर पंडित को संरक्षण'
      ],
      te: [
        'చాళుక్య ఆరవ విక్రమాదిత్యుని నుండి సబ్బి-1000 మండల ప్రాప్తి',
        'కాజీపేట దర్గా శిలాశాసన జారీ (1079 & 1090)',
        'అనుమకొండలో శివపుర నిర్మాణం మరియు రామేశ్వర పండితునికి భూదానం'
      ],
      kn: [
        'ಚಾಳುಕ್ಯ ಆರನೇ ವಿಕ್ರಮಾದಿತ್ಯನಿಂದ ಸಬ್ಬಿ-1000 ಪ್ರಾಂತ್ಯ ಪ್ರಾಪ್ತಿ',
        'ಕಾಜಿಪೇಟ ದರ್ಗಾ ಶಿಲಾಶಾಸನ ಪ್ರಕಟಣೆ (1090)',
        'ಶಿವಪುರ ಸ್ಥಾಪನೆ ಮತ್ತು ರಾಮೇಶ್ವರ ಪಂಡಿತರಿಗೆ ದತ್ತಿ'
      ],
      ta: [
        'ஆறாம் விக்ரமாதித்தனிடமிருந்து சப்பி-1000 மண்டலம் பெறுதல்',
        'காஜிப்பேட்டை தர்கா கல்வெட்டு வெளியீடு (1090)',
        'சிவபுரம் நிறுவுதல் மற்றும் இராமேஸ்வர பண்டிதருக்கு மானியம்'
      ],
      mr: [
        'सहाव्या विक्रमादित्याकडून सब्बी-१००० प्रांताची प्राप्ती',
        'काझीपेट दर्गा शिलालेख (१०९०) जारी करणे',
        'शिवपूरची स्थापना आणि रामेश्वर पंडितांना आश्रय'
      ],
      or: [
        'ଷଷ୍ଠ ବିକ୍ରମାଦିତ୍ୟଙ୍କଠାରୁ ସବ୍ବି-୧୦୦୦ ପ୍ରାନ୍ତ ପ୍ରାପ୍ତି',
        'କାଜିପେଟ ଦରগা ଶିଳାଲେଖ (୧୦୯୦) ପ୍ରକାଶନ',
        'ଶିବପୁର ସ୍ଥାପନ ଓ ରାମେଶ୍ୱର ପଣ୍ଡିତଙ୍କୁ ଭୂమిଦାନ'
      ],
      bn: [
        'ষষ্ঠ বিক্রমাদিত্যের কাছ থেকে সব্বি-১০০০ প্রদেশ লাভ',
        'কাজিপেট দরগা শিলালিপি (১০৯০) প্রকাশ',
        'শিবপুর প্রতিষ্ঠা ও রামেশ্বর পণ্ডিতকে ভূমিদান'
      ]
    },
    historical_significance: {
      en: 'Expanded Kakatiya rule across the Sabbi-1000 heartland (Karimnagar–Warangal) and established Anumakonda as a premier Shaiva learning center.',
      hi: 'करीमनगर-वारंगल क्षेत्र (सब्बी-1000) में काकतीय शासन का विस्तार किया और अनुमकोंडा को प्रमुख शैव विद्या केंद्र बनाया।',
      te: 'సబ్బి-1000 (కరీంనగర్-వరంగల్) ప్రాంతమంతటా కాకతీయ అధికారాన్ని విస్తరించి, అనుమకొండను ప్రముఖ శైవ విద్యా కేంద్రంగా తీర్చిదిద్దాడు.',
      kn: 'ಸಬ್ಬಿ-1000 ಪ್ರದೇಶದಲ್ಲಿ ಕಾಕತೀಯ ಆಳ್ವಿಕೆಯನ್ನು ವಿಸ್ತರಿಸಿ ಅನುಮಕೊಂಡವನ್ನು ಪ್ರಮುಖ ಶೈವ ಕೇಂದ್ರವನ್ನಾಗಿ ಮಾಡಿದನು.',
      ta: 'சப்பி-1000 பகுதியில் காகதீய ஆட்சியை விரிவுபடுத்தி அனுமகொண்டாவைச் சைவக் கல்வி மையமாக்கினார்.',
      mr: 'सब्बी-१००० प्रदेशात काकतीय सत्ता विस्तारित करून अनुमकोंडाला प्रमुख शैव केंद्र बनवले.',
      or: 'ସବ୍ବି-୧୦୦୦ ଅଞ୍ଚଳରେ କାକତୀୟ ଶାସନ ବିସ୍ତାର କରି ଅନୁମକୋଣ୍ଡାକୁ ପ୍ରମୁଖ ଶୈବ କେନ୍ଦ୍ରରେ ପରିଣତ କରିଥିଲେ।',
      bn: 'সব্বি-১০০০ অঞ্চলে কাকতীয় শাসন বিস্তার করে অনুমকোন্ডাকে প্রধান শৈব শিক্ষাকেন্দ্রে পরিণত করেন।'
    },
    associated_places: {
      en: ['Anumakonda (Hanamkonda)', 'Kazipet', 'Sabbi-1000 (Karimnagar)'],
      hi: ['अनुमकोंडा (हनमकोंडा)', 'काजीपेट', 'सब्बी-1000 (करीमनगर)'],
      te: ['అనుమకొండ (హనుమకొండ)', 'కాజీపేట', 'సబ్బి-1000 (కరీంనగర్)'],
      kn: ['ಅನುಮಕೊಂಡ', 'ಕಾಜಿಪೇಟ', 'ಸಬ್ಬಿ-1000'],
      ta: ['அனுமகொண்டா', 'காஜிப்பேட்டை', 'சப்பி-1000'],
      mr: ['अनुमकोंडा', 'काझीपेट', 'सब्बी-१०००'],
      or: ['ଅନୁମକୋଣ୍ଡା', 'କାଜିପେଟ', 'ସବ୍ବି-୧୦୦୦'],
      bn: ['অনুমকোন্ডা', 'কাজিপেট', 'সব্বি-১০০০']
    },
    evidence_status: 'Epigraphic Record',
    image_url: ARCHIVE_IMG('odra_fort_inscription.jpg'),
    inscriptions_ids: ['insc_anumakonda_1163'],
    citations: [
      'Kazipet Darga Inscription of Beta II (1090 CE)',
      'Inscriptions of Andhra Pradesh: Warangal District, Nos. 14–16',
      'Sastry, P.V. Parabrahma, The Kakatiyas of Warangal (1978), pp. 47–53'
    ]
  },

  // 4. Prola II (KD-0005)
  {
    id: 'fig_kakatiya_prola_ii',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Prola II (Prolaraja II / Nissankapradhana)',
      hi: 'प्रोल द्वितीय (प्रोलराज द्वितीय / निःशंकप्रधान)',
      te: 'రెండవ ప్రోలరాజు (నిశ్శంకప్రధాని)',
      kn: 'ಎರಡನೇ ಪ್ರೋಲರಾಜ (ನಿಶ್ಶಂಕಪ್ರಧಾನ)',
      ta: 'இரண்டாம் புரோலராஜன் (நிஸ்ஸங்கபிரதானி)',
      mr: 'प्रोल दुसरा (प्रोलराज दुसरा / निःशंकप्रधान)',
      or: 'ଦ୍ୱିତୀୟ ପ୍ରୋଲରାଜ (ନିଃଶଙ୍କପ୍ରଧାନ)',
      bn: 'দ্বিতীয় প্রোলরাজ (নিঃশঙ্কপ্রধান)'
    },
    alternate_names: ['Prolaraja II', 'Darshanapradhana', 'Mahamandalesvara Prola'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: 'c. 1116 – 1157 CE',
      hi: 'लगभग 1116 – 1157 ई.',
      te: 'క్రీ.శ. 1116 – 1157',
      kn: 'ಸು. ಕ್ರಿ.ಶ. 1116 – 1157',
      ta: 'பொ.ஊ. 1116 – 1157',
      mr: 'इ.स. १११६ – ११५७',
      or: '୧୧୧୬ – ୧୧୫୭ ଖ୍ରୀ.ଅ.',
      bn: 'আনু. ১১১৬ – ১১৫৭ খ্রি.'
    },
    approx_dates: 'c. 1116 – 1157 CE',
    known_titles: {
      en: ['Mahamandalesvara', 'Parama-Mahesvara', 'Conqueror of Tailapa III & Gundaraja'],
      hi: ['महामंडलेश्वर', 'परम-माहेश्वर', 'तैलप तृतीय एवं गुंडराज विजेता'],
      te: ['మహామండలేశ్వర', 'పరమ మాహేశ్వర', 'మూడవ తైలపుని విజేత'],
      kn: ['ಮಹಾಮಂಡಲೇಶ್ವರ', 'ಪರಮ ಮಾಹೇಶ್ವರ', 'ಮೂರನೇ ತೈಲಪನ ವಿಜೇತ'],
      ta: ['மகாமண்டலேஸ்வரன்', 'பரம மாहेஸ்வரன்', 'மூன்றாம் தைலபனை வென்றவன்'],
      mr: ['महामंडलेश्वर', 'परम-माहेश्वर', 'तिसरा तैलप विजेता'],
      or: ['ମହାମଣ୍ଡଳେଶ୍ୱର', 'ପରମ-ମାହେଶ୍ୱର', 'ତୃତୀୟ ତୈଳପ ବିଜେତା'],
      bn: ['মহামণ্ডলেশ্বর', 'পরম-মাহেশ্বর', 'তৃতীয় তৈলপ বিজেতা']
    },
    biography: {
      en: 'Younger son of Beta II who succeeded his elder brother Durgaraja around 1116 CE and transformed the Kakatiya principality into the dominant military power of Telangana. Taking advantage of the decline of the Western Chalukyas after Someshvara III, Prola II defeated Chalukya Emperor Tailapa III (capturing and releasing him out of loyalty), routed Govinda Raja, shaved the head of Mantrakuta Gundaraja, repulsed Jagaddeva’s siege of Anumakonda, and extended Kakatiya sway to Srisailam before falling in battle against the Velanati Chodas around 1157 CE.',
      hi: 'बेत द्वितीय के कनिष्ठ पुत्र जिन्होंने 1116 ई. के आसपास अपने बड़े भाई दुर्गराज के बाद शासन संभाला और तेलंगाना में काकतीय शक्ति का व्यापक विस्तार किया। उन्होंने कल्याणी चालुक्य सम्राट तैलप तृतीय, गोविंदराज, मंत्रकूट के गुंडराज और जगद्देव को पराजित कर श्रीशैलम में विजय स्तंभ स्थापित किया।',
      te: 'రెండవ బేతరాజు చిన్న కుమారుడు. క్రీ.శ. 1116 ప్రాంతంలో తన అన్న దుర్గరాజు తదుపరి సింహాసనాన్ని అధిష్టించి తెలంగాణ అంతటా కాకతీయ ఆధిపత్యాన్ని విస్తరించాడు. చాళుక్య మూడవ తైలపుని బంధించి విడిచిపెట్టాడు; గోవిందరాజును, మంత్రకూట గుండరాజును, జగద్దేవుని ఓడించి శ్రీశైలంలో విజయస్తంభం నాటాడు.',
      kn: 'ಎರಡನೇ ಬೇತರಾಜನ ಕಿರಿಯ ಪುತ್ರ. ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯ ಮೂರನೇ ತೈಲಪ, ಗೋವಿಂದರಾಜ, ಮಂತ್ರಕೂಟದ ಗುಂಡರಾಜ ಮತ್ತು ಜಗದ್ದೇವನನ್ನು ಸೋಲಿಸಿ ಶ್ರೀಶೈಲದಲ್ಲಿ ವಿಜಯಸ್ತಂಭವನ್ನು ಸ್ಥಾಪಿಸಿದನು.',
      ta: 'இரண்டாம் பேதராஜனின் இளைய புதல்வர். சாளுக்கிய மூன்றாம் தைலபன், கோவிந்தராஜன், மந்த்ரகூட குண்டராஜன் மற்றும் ஜகத்தேவனை வென்று ஸ்ரீசைலத்தில் வெற்றித்தூண் நாட்டினார்.',
      mr: 'बेत दुसऱ्याचा धाकटा पुत्र. त्याने चालुक्य तैलप तिसरा, गोविंदराज, मंत्रकूटचा गुंडराज आणि जगद्देव यांचा पराभव करून श्रीशैलम येथे विजयस्तंभ उभारला.',
      or: 'ଦ୍ୱିତୀୟ ବେତରାଜଙ୍କ କନିଷ୍ଠ ପୁତ୍ର। ସେ ଚାଲୁକ୍ୟ ତୃତୀୟ ତୈଳପ, ଗୋବିନ୍ଦରାଜ, ମନ୍ତ୍ରକୂଟର ଗୁଣ୍ଡରାଜ ଓ ଜଗଦ୍ଦେବଙ୍କୁ ପରାସ୍ତ କରି ଶ୍ରୀଶୈଳମରେ ବିଜୟ ସ୍ତମ୍ଭ ସ୍ଥାପନ କରିଥିଲେ।',
      bn: 'দ্বিতীয় বেতরাজের কনিষ্ঠ পুত্র। তিনি চালুক্য তৃতীয় তৈলপ, গোবিন্দরাজ, মন্ত্রকূটের গুন্ডরাজ ও জগদ্দেবকে পরাস্ত করে শ্রীশৈলমে বিজয়স্তম্ভ স্থাপন করেন।'
    },
    major_events: {
      en: [
        'Defeat and chivalrous release of Western Chalukya Emperor Tailapa III',
        'Victories over Mantrakuta Gundaraja, Govinda Raja, and Santara Jagaddeva at Anumakonda',
        'Erection of a Victory Pillar at Srisailam and devotion to Svayambhudeva'
      ],
      hi: [
        'कल्याणी चालुक्य सम्राट तैलप तृतीय पर विजय और क्षमादान',
        'मंत्रकूट के गुंडराज, गोविंदराज और जगद्देव की अनुमकोंडा घेराबंदी पर विजय',
        'श्रीशैलम में विजय स्तंभ की स्थापना और स्वयंभूदेव की आराधना'
      ],
      te: [
        'కళ్యాణి చాళుక్య చక్రవర్తి మూడవ తైలపునిపై విజయం',
        'మంత్రకూట గుండరాజు, గోవిందరాజు మరియు అనుమకొండను ముట్టడించిన జగద్దేవునిపై ఘనవిజయం',
        'శ్రీశైల క్షేత్రంలో విజయస్తంభ స్థాపన మరియు స్వయంభూదేవ ఆరాధన'
      ],
      kn: [
        'ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯ ಸಾಮ್ರಾಟ ಮೂರನೇ ತೈಲಪನ ಮೇಲೆ ಜಯ',
        'ಮಂತ್ರಕೂಟದ ಗುಂಡರಾಜ ಮತ್ತು ಜಗದ್ದೇವನ ಸೋಲು',
        'ಶ್ರೀಶೈಲದಲ್ಲಿ ವಿಜಯಸ್ತಂಭ ಸ್ಥಾಪನೆ'
      ],
      ta: [
        'கல்யாணிச் சாளுக்கிய மூன்றாம் தைலபன் மீது வெற்றி',
        'மந்த்ரகூட குண்டராஜன் மற்றும் ஜகத்தேவன் முற்றுகை முறியடிப்பு',
        'ஸ்ரீசைலத்தில் வெற்றித்தூண் நிறுவல்'
      ],
      mr: [
        'चालुक्य सम्राट तैलप तिसरा याच्यावर विजय',
        'मंत्रकूटचा गुंडराज आणि जगद्देव यांचा पराभव',
        'श्रीशैलम येथे विजयस्तंभाची उभारणी'
      ],
      or: [
        'ଚାଲୁକ୍ୟ ସମ୍ରାଟ ତୃତୀୟ ତୈଳପଙ୍କ ଉପରେ ବିଜୟ',
        'ମନ୍ତ୍ରକୂଟର ଗୁଣ୍ଡରାଜ ଓ ଜଗଦ୍ଦେବଙ୍କ ପରାଜୟ',
        'ଶ୍ରୀଶୈଳମରେ ବିଜୟ ସ୍ତମ୍ଭ ସ୍ଥାପନ'
      ],
      bn: [
        'চালুক্য সম্রাট তৃতীয় তৈলপের ওপর বিজয়',
        'মন্ত্রকূটের গুন্ডরাজ ও জগদ্দেবের পরাজয়',
        'শ্রীশৈলমে বিজয়স্তম্ভ স্থাপন'
      ]
    },
    historical_significance: {
      en: 'Shattered Western Chalukya suzerainty over Telangana and paved the direct military path for his son Rudradeva’s formal proclamation of independence in 1163 CE.',
      hi: 'तेलंगाना पर पश्चिमी चालुक्यों के आधिपत्य को समाप्त कर अपने पुत्र रुद्रदेव की 1163 ई. की सार्वभौम स्वतंत्रता का मार्ग प्रशस्त किया।',
      te: 'తెలంగాణపై పశ్చిమ చాళుక్యుల ఆధిపత్యాన్ని తుదముట్టించి, తన కుమారుడు రుద్రదేవుని క్రీ.శ. 1163 స్వతంత్ర సామ్రాజ్య స్థాపనకు బాటలు వేశాడు.',
      kn: 'ತೆಲಂಗಾಣದಲ್ಲಿ ಪಶ್ಚಿಮ ಚಾಳುಕ್ಯರ ಪ್ರಾಬಲ್ಯವನ್ನು ಕೊನೆಗೊಳಿಸಿ ತನ್ನ ಮಗ ರುದ್ರದೇವನ ಸ್ವಾತಂತ್ರ್ಯ ಘೋಷಣೆಗೆ അടിಪಾಯ ಹಾಕಿದನು.',
      ta: 'தெலுங்கானாவில் மேலைச் சாளுக்கிய ஆதிக்கத்தை முடிவுக்குக் கொண்டுவந்து தன் மகன் உருத்ரதேவரின் சுதந்திரப் பிரகடனத்திற்கு அடிகோலினார்.',
      mr: 'तेलंगणावरील पश्चिमी चालुक्यांचे वर्चस्व मोडून काढत पुत्र रुद्रदेवाच्या ११६३ मधील सार्वभौम स्वातंत्र्याचा पाया रचला.',
      or: 'ତେଲେଙ୍ଗାନାରେ ପଶ୍ଚିମ ଚାଲୁକ୍ୟଙ୍କ ଆଧିପତ୍ୟ ସମାପ୍ତ କରି ପୁତ୍ର ରୁଦ୍ରଦେବଙ୍କ ୧୧୬୩ ସ୍ୱାଧୀନତା ଘୋଷଣାର ପଥ ପ୍ରଶସ୍ତ କରିଥିଲେ।',
      bn: 'তেলেঙ্গানায় পশ্চিম চালুক্যদের আধিপত্যের অবসান ঘটিয়ে পুত্র রুদ্রদেবের ১১৬৩ খ্রিস্টাব্দের স্বাধীনতা ঘোষণার পথ প্রশস্ত করেন।'
    },
    associated_places: {
      en: ['Anumakonda (Hanamkonda)', 'Mantrakuta (Manthani)', 'Srisailam', 'Polavasa'],
      hi: ['अनुमकोंडा (हनमकोंडा)', 'मंत्रकूट (मंथनी)', 'श्रीशैलम', 'पोलवास'],
      te: ['అనుమకొండ (హనుమకొండ)', 'మంత్రకూటం (మంథని)', 'శ్రీశైలం', 'పొలవాస'],
      kn: ['ಅನುಮಕೊಂಡ', 'ಮಂತ್ರಕೂಟ', 'ಶ್ರೀಶೈಲಂ', 'ಪೊಲವಾಸ'],
      ta: ['அனுமகொண்டா', 'மந்த்ரகூடம்', 'ஸ்ரீசைலம்', 'பொலவாசா'],
      mr: ['अनुमकोंडा', 'मंत्रकूट', 'श्रीशैलम', 'पोलवास'],
      or: ['ଅନୁମକୋଣ୍ଡା', 'ମନ୍ତ୍ରକୂଟ', 'ଶ୍ରୀଶୈଳମ', 'ପୋଲବାସ'],
      bn: ['অনুমকোন্ডা', 'মন্ত্রকূট', 'শ্রীশৈলম', 'পোলবাস']
    },
    evidence_status: 'Documented Primary Evidence',
    image_url: ARCHIVE_IMG('draksharama_temple.jpg'),
    inscriptions_ids: ['insc_anumakonda_1163'],
    citations: [
      'Anumakonda Thousand Pillar Temple Inscription of Rudradeva (1163 CE, Epigraphia Indica Vol. IX, pp. 256–267)',
      'Sastry, P.V. Parabrahma, The Kakatiyas of Warangal (1978), pp. 54–62'
    ]
  },

  // 5. Rudradeva / Prataparudra I (KD-0006)
  {
    id: 'fig_kakatiya_rudradeva',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Rudradeva (Prataparudra I)',
      hi: 'रुद्रदेव (प्रतापरुद्र प्रथम)',
      te: 'రుద్రదేవ మహారాజు (మొదటి ప్రతాపరుద్రుడు)',
      kn: 'ರುದ್ರದೇವ ಮಹಾರಾಜ (ಮೊದಲನೇ ಪ್ರತಾಪರುದ್ರ)',
      ta: 'உருத்ரதேவ மகாராஜா (முதலாம் பிரதாபருத்ரர்)',
      mr: 'रुद्रदेव महाराज (प्रतापरुद्र पहिला)',
      or: 'ରୁଦ୍ରଦେବ ମହାରାଜ (ପ୍ରଥମ ପ୍ରତାପରୁଦ୍ର)',
      bn: 'রুদ্রদেব মহারাজ (প্রথম প্রতাপরুদ্র)'
    },
    alternate_names: ['Prataparudra I', 'Kakatiya Rudradeva', 'Vinayabhushana'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: 'c. 1158 – 1195 CE (Sovereign Declaration: 1163 CE)',
      hi: 'लगभग 1158 – 1195 ई. (सार्वभौम घोषणा: 1163 ई.)',
      te: 'క్రీ.శ. 1158 – 1195 (స్వతంత్ర ప్రకటన: 1163)',
      kn: 'ಸು. ಕ್ರಿ.ಶ. 1158 – 1195 (ಸ್ವಾತಂತ್ರ್ಯ ಘೋಷಣೆ: 1163)',
      ta: 'பொ.ஊ. 1158 – 1195 (சுதந்திரப் பிரகடனம்: 1163)',
      mr: 'इ.स. ११५८ – ११९५ (सार्वभौम घोषणा: ११६३)',
      or: '୧୧୫୮ – ୧୧୯୫ ଖ୍ରୀ.ଅ. (ସ୍ୱାଧୀନତା ଘୋଷଣା: ୧୧୬୩)',
      bn: 'আনু. ১১৫৮ – ১১৯৫ খ্রি. (স্বাধীনতা ঘোষণা: ১১৬৩)'
    },
    approx_dates: 'c. 1158 – 1195 CE',
    known_titles: {
      en: ['Prataparudra I', 'Vinayabhushana', 'Dayagajakesari', 'Founder of Sovereign Kakatiya Kingdom'],
      hi: ['प्रतापरुद्र प्रथम', 'विनयभूषण', 'दयागजकेसरी', 'सार्वभौम काकतीय साम्राज्य संस्थापक'],
      te: ['మొదటి ప్రతాపరుద్రుడు', 'వినయభూషణ', 'దయాగజకేసరి', 'కాకతీయ సార్వభౌమ స్థాపకుడు'],
      kn: ['ಮೊದಲನೇ ಪ್ರತಾಪರುದ್ರ', 'ವಿನಯಭೂಷಣ', 'ದಯಾಗಜಕೇಸರಿ', 'ಸಾರ್ವಭೌಮ ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯ ಸ್ಥಾಪಕ'],
      ta: ['முதலாம் பிரதாபருத்ரர்', 'விநயபூஷணன்', 'தயாகஜகேசரி', 'இறையாண்மை காகதீய அரசின் நிறுவனர்'],
      mr: ['प्रतापरुद्र पहिला', 'विनयभूषण', 'दयागजकेसरी', 'सार्वभौम काकतीय साम्राज्य संस्थापक'],
      or: ['ପ୍ରଥମ ପ୍ରତାପରୁଦ୍ର', 'ବିନୟଭୂଷଣ', 'ଦୟାଗଜକେସରୀ', 'ସାର୍ବଭୌମ କାକତୀୟ ସାମ୍ରାଜ୍ୟ ପ୍ରତିଷ୍ଠାତା'],
      bn: ['প্রথম প্রতাপরুদ্র', 'বিনয়ভূষণ', 'দয়াগজকেশরী', 'সার্বভৌম কাকতীয় সাম্রাজ্য প্রতিষ্ঠাতা']
    },
    biography: {
      en: 'Eldest son of Prola II and the first completely independent sovereign monarch of the Kakatiya Dynasty. In 1163 CE (Saka 1084), Rudradeva issued the celebrated Anumakonda Stone Pillar Inscription (composed in ornate Sanskrit verse by Achintendra) proclaiming full Kakatiya sovereignty after subduing Dommaraja, Medaraja of Polavasa, Mailigideva, and Choda Bhima of Vardhamanapura. In the same year (1163 CE), he consecrated the magnificent Sri Rudreswara Swamy Temple (Thousand Pillar Temple / Veyisthambala Gudi) in Hanamkonda, laid the foundation of the new capital city of Orugallu (Warangal), and authored the Sanskrit political treatise Nitisara before dying in battle against the Seuna Yadava ruler Jaitugi in 1195 CE.',
      hi: 'प्रोल द्वितीय के ज्येष्ठ पुत्र और काकतीय राजवंश के प्रथम पूर्ण स्वतंत्र सार्वभौम सम्राट। 1163 ई. (शक 1084) में उन्होंने डोम्मराज, मेदराज और चोड भीम को पराजित कर प्रसिद्ध अनुमकोंडा शिलालेख जारी किया और हनमकोंडा में भव्य सहस्र स्तंभ मंदिर (रुद्रेश्वर स्वामी मंदिर) का निर्माण कराया। उन्होंने ओरुगल्लु (वारंगल) की नई राजधानी की नींव रखी और संस्कृत में नीतिसार ग्रंथ की रचना की।',
      te: 'రెండవ ప్రోలరాజు పెద్ద కుమారుడు మరియు కాకతీయ వంశంలో తొలి స్వతంత్ర సార్వభౌమ చక్రవర్తి. క్రీ.శ. 1163 (శక 1084) లో దొమ్మరాజు, మేడరాజు, మైలిగిదేవుడు, చోడ భీములను జయించి ప్రసిద్ధ అనుమకొండ వేయిస్తంభాల గుడి శాసనాన్ని వేయించాడు. హనుమకొండలో అద్భుతమైన త్రికూట ఆలయమైన వేయిస్తంభాల గుడిని (శ్రీ రుద్రేశ్వర స్వామి ఆలయం) నిర్మించి, నూతన రాజధాని ఓరుగల్లు (వరంగల్) కోటకు పునాది వేశాడు. స్వయంగా కవి అయిన రుద్రదేవుడు సంస్కృతంలో "నీతిసారం" అనే రాజనీతి గ్రంథాన్ని రచించాడు.',
      kn: 'ಎರಡನೇ ಪ್ರೋಲರಾಜನ ಹಿರಿಯ ಪುತ್ರ ಮತ್ತು ಕಾಕತೀಯ ವಂಶದ ಮೊದಲ ಸ್ವತಂತ್ರ ಸಾರ್ವಭೌಮ ಸಾಮ್ರಾಟ. ಕ್ರಿ.ಶ. 1163 (ಶಕ 1084) ರಲ್ಲಿ ಅನುಮಕೊಂಡ ಶಾಸನವನ್ನು ಸ್ಥಾಪಿಸಿ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯವನ್ನು (ಶ್ರೀ ರುದ್ರೇಶ್ವರ ಸ್ವಾಮಿ ದೇವಾಲಯ) ನಿರ್ಮಿಸಿದನು ಹಾಗೂ ಹೊಸ ರಾಜಧಾನಿ ಓರುಗಲ್ಲು (ವರಂಗಲ್) ನಗರಕ್ಕೆ ಅಡಿಪಾಯ ಹಾಕಿದನು.',
      ta: 'இரண்டாம் புரோலராஜனின் மூத்த புதல்வரும் காகதீய வம்சத்தின் முதல் முழு சுதந்திரப் பேரரசருமாவார். பொ.ஊ. 1163 (சக 1084) இல் அனுமகொண்டா கல்வெட்டை வெளியிட்டு, ஹனம்கொண்டாவில் புகழ்பெற்ற ஆயிரங்கால் கோயிலை (ஸ்ரீ ருத்ரேஸ்வர சுவாமி கோயில்) கட்டினார்; புதிய தலைநகர் ஓருகல்லுவுக்கு அடிக்கல் நாட்டினார்.',
      mr: 'प्रोल दुसऱ्याचा ज्येष्ठ पुत्र आणि काकतीय राजवंशाचा पहिला पूर्ण स्वतंत्र सार्वभौम सम्राट. इ.स. ११६३ (शक १०८४) मध्ये त्याने अनुमकोंडा शिलालेख कोरून हनमकोंडा येथे भव्य हजार स्तंभ मंदिर (श्री रुद्रेश्वर स्वामी मंदिर) बांधले आणि ओरुगल्लु (वरंगळ) या नवीन राजधानीची पायाभरणी केली.',
      or: 'ଦ୍ୱିତୀୟ ପ୍ରୋଲରାଜଙ୍କ ଜ୍ୟେଷ୍ଠ ପୁତ୍ର ଓ କାକତୀୟ ବଂଶର ପ୍ରଥମ ପୂର୍ଣ୍ଣ ସ୍ୱାଧୀନ ସାର୍ବଭୌମ ସମ୍ରାଟ। ୧୧୬୩ ଖ୍ରୀ.ଅ. (ଶକ ୧୦୮୪) ରେ ସେ ଅନୁମକୋଣ୍ଡା ଶିଳାଲେଖ ସ୍ଥାପନ କରି ହନମକୋଣ୍ଡାରେ ପ୍ରସିଦ୍ଧ ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ନିର୍ମାଣ କରିଥିଲେ ଓ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ରାଜଧାନୀର ମୂଳଦୁଆ ପକାଇଥିଲେ।',
      bn: 'দ্বিতীয় প্রোলরাজের জ্যেষ্ঠ পুত্র এবং কাকতীয় রাজবংশের প্রথম পূর্ণ স্বাধীন সার্বভৌম সম্রাট। ১১৬৩ খ্রিস্টাব্দে (শক ১০৮৪) তিনি অনুমকোন্ডা শিলালিপি স্থাপন করে হনমকোন্ডায় বিখ্যাত সহস্র স্তম্ভ মন্দির নির্মাণ করেন এবং নতুন রাজধানী ওরুগল্লু (ওয়ারাঙ্গল)-এর ভিত্তিপ্রস্তর স্থাপন করেন।'
    },
    major_events: {
      en: [
        'Proclamation of Full Sovereign Independence & Anumakonda Inscription (20 January 1163 CE / Saka 1084)',
        'Consecration of the Thousand Pillar Temple (Trikutachala Rudreswara Shrine) at Hanamkonda (1163 CE)',
        'Foundation of Orugallu (Ekashilanagara / Warangal) & Campaigns in Coastal Andhra (Draksharama & Palnadu)'
      ],
      hi: [
        'पूर्ण सार्वभौम स्वतंत्रता की घोषणा और अनुमकोंडा शिलालेख (20 जनवरी 1163 ई. / शक 1084)',
        'हनमकोंडा में सहस्र स्तंभ मंदिर (त्रिकूटाचल रुद्रेश्वर मंदिर) की प्रतिष्ठा (1163 ई.)',
        'ओरुगल्लु (वारंगल) राजधानी की स्थापना और तटीय आंध्र (द्राक्षाराम व पलनाडु) अभियान'
      ],
      te: [
        'సంపూర్ణ స్వతంత్ర సార్వభౌమ ప్రకటన & అనుమకొండ శాసనం (20 జనవరి 1163 / శక 1084)',
        'హనుమకొండలో వేయిస్తంభాల గుడి (త్రికూటాచల రుద్రేశ్వర ఆలయం) నిర్మాణం (1163)',
        'ఓరుగల్లు (ఏకశిలానగరం) రాజధాని పునాది మరియు ద్రాక్షారామ-పల్నాడు దండయాత్రలు'
      ],
      kn: [
        'ಸಂಪೂರ್ಣ ಸಾರ್ವಭೌಮ ಸ್ವಾತಂತ್ರ್ಯ ಘೋಷಣೆ ಮತ್ತು ಅನುಮಕೊಂಡ ಶಾಸನ (20 ಜನವರಿ 1163 / ಶಕ 1084)',
        'ಹನುಮಕೊಂಡದಲ್ಲಿ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ನಿರ್ಮಾಣ (1163)',
        'ಓರುಗಲ್ಲು (ವರಂಗಲ್) ರಾಜಧಾನಿಯ ಸ್ಥಾಪನೆ'
      ],
      ta: [
        'முழு சுதந்திரப் பிரகடனம் & அனுமகொண்டா கல்வெட்டு (20 ஜனவரி 1163 / சக 1084)',
        'ஹனம்கொண்டாவில் ஆயிரங்கால் கோயில் (திரிகூடாசல ருத்ரேஸ்வரர் கோயில்) பிரதிஷ்டை (1163)',
        'ஓருகல்லு (வாரங்கல்) தலைநகர் அடிக்கல் நாட்டல்'
      ],
      mr: [
        'पूर्ण सार्वभौम स्वातंत्र्याची घोषणा व अनुमकोंडा शिलालेख (२० जानेवारी ११६३ / शक १०८४)',
        'हनमकोंडा येथे हजार स्तंभ मंदिराची उभारणी (११६३)',
        'ओरुगल्लु (वरंगळ) राजधानीची स्थापना'
      ],
      or: [
        'ପୂର୍ଣ୍ଣ ସାର୍ବଭୌମ ସ୍ୱାଧୀନତା ଘୋଷଣା ଓ ଅନୁମକୋଣ୍ଡା ଶିଳାଲେଖ (୨୦ ଜାନୁଆରୀ ୧୧୬୩ / ଶକ ୧୦୮୪)',
        'ହନମକୋଣ୍ଡାରେ ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ପ୍ରତିଷ୍ଠା (୧୧୬୩)',
        'ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ରାଜଧାନୀର ମୂଳଦୁଆ ସ୍ଥାପନ'
      ],
      bn: [
        'পূর্ণ সার্বভৌম স্বাধীনতা ঘোষণা ও অনুমকোন্ডা শিলালিপি (২০ জানুয়ারি ১১৬৩ / শক ১০৮৪)',
        'হনমকোন্ডায় সহস্র স্তম্ভ মন্দির প্রতিষ্ঠা (১১৬৩)',
        'ওরুগল্লু (ওয়ারাঙ্গল) রাজধানীর ভিত্তিপ্রস্তর স্থাপন'
      ]
    },
    historical_significance: {
      en: 'Proclaimed the independent Kakatiya Empire in 1163 CE, built the Thousand Pillar Temple at Hanamkonda, and initiated the imperial citadel of Orugallu.',
      hi: '1163 ई. में स्वतंत्र काकतीय साम्राज्य की घोषणा की, हनमकोंडा में हजार स्तंभ मंदिर बनवाया और ओरुगल्लु दुर्ग की नींव रखी।',
      te: 'క్రీ.శ. 1163లో స్వతంత్ర కాకతీయ సామ్రాజ్యాన్ని ప్రకటించి, హనుమకొండ వేయిస్తంభాల గుడిని నిర్మించి, ఓరుగల్లు కోటకు శ్రీకారం చుట్టాడు.',
      kn: '1163ರಲ್ಲಿ ಸ್ವತಂತ್ರ ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಘೋಷಿಸಿ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ಮತ್ತು ಓರುಗಲ್ಲು ಕೋಟೆಯನ್ನು ಆರಂಭಿಸಿದನು.',
      ta: '1163இல் சுதந்திர காகதீயப் பேரரசை அறிவித்து, ஆயிரங்கால் கோயிலைக் கட்டி ஓருகல்லு கோட்டையைத் தொடங்கினார்.',
      mr: '११६३ मध्ये स्वतंत्र काकतीय साम्राज्याची घोषणा केली, हजार स्तंभ मंदिर बांधले आणि ओरुगल्लु किल्ल्याची सुरुवात केली.',
      or: '୧୧୬୩ରେ ସ୍ୱାଧୀନ କାକତୀୟ ସାମ୍ରାଜ୍ୟ ଘୋଷଣା କରି ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ଓ ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ ଆରମ୍ଭ କରିଥିଲେ।',
      bn: '১১৬৩ খ্রিস্টাব্দে স্বাধীন কাকতীয় সাম্রাজ্য ঘোষণা করেন, সহস্র স্তম্ভ মন্দির নির্মাণ করেন এবং ওরুগল্লু দুর্গের সূচনা করেন।'
    },
    associated_places: {
      en: ['Anumakonda (Hanamkonda)', 'Orugallu (Warangal)', 'Draksharama', 'Tripurantakam'],
      hi: ['अनुमकोंडा (हनमकोंडा)', 'ओरुगल्लु (वारंगल)', 'द्राक्षाराम', 'त्रिपुरांतकम'],
      te: ['అనుమకొండ (హనుమకొండ)', 'ఓరుగల్లు (వరంగల్)', 'ద్రాక్షారామం', 'త్రిపురాంతకం'],
      kn: ['ಅನುಮಕೊಂಡ', 'ಓರುಗಲ್ಲು (ವರಂಗಲ್)', 'ದ್ರಾಕ್ಷಾರಾಮ', 'ತ್ರಿಪುರಾಂತಕಂ'],
      ta: ['அனுமகொண்டா', 'ஓருகல்லு (வாரங்கல்)', 'திராட்சாராமம்', 'திரிபுராந்தகம்'],
      mr: ['अनुमकोंडा', 'ओरुगल्लु (वरंगळ)', 'द्राक्षाराम', 'त्रिपुरांतकम'],
      or: ['ଅନୁମକୋଣ୍ଡା', 'ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ)', 'ଦ୍ରାକ୍ଷାରାମ', 'ତ୍ରିପୁରାନ୍ତକମ'],
      bn: ['অনুমকোন্ডা', 'ওরুগল্লু (ওয়ারাঙ্গল)', 'দ্রাক্ষারাম', 'ত্রিপুরান্তকম']
    },
    evidence_status: 'Documented Primary Evidence',
    image_url: ARCHIVE_IMG('draksharama_temple.jpg'),
    inscriptions_ids: ['insc_anumakonda_1163'],
    citations: [
      'Anumakonda Inscription of Rudradeva (Saka 1084 / 20 Jan 1163 CE), ed. J.F. Fleet, Epigraphia Indica Vol. IX',
      'Draksharama Inscription of Rudradeva (1168 CE, SII Vol. IV)',
      'Talbot, Cynthia, Precolonial India in Practice (2001), pp. 128–133'
    ]
  },

  // 6. Mahadeva (KD-0007)
  {
    id: 'fig_kakatiya_mahadeva',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Mahadeva (Kakatiya Mahadevaraja)',
      hi: 'महादेव (काकतीय महादेवराज)',
      te: 'మహాదేవ రాజు (కాకతీయ మహాదేవుడు)',
      kn: 'ಮಹಾದೇವ ರಾಜ (ಕಾಕತೀಯ ಮಹಾದೇವ)',
      ta: 'மகாதேவ ராஜா (காகதீய மகாதேவர்)',
      mr: 'महादेव राजा (काकतीय महादेव)',
      or: 'ମହାଦେବ ରାଜା (କାକତୀୟ ମହାଦେବ)',
      bn: 'মহাদেব রাজা (কাকতীয় মহাদেব)'
    },
    alternate_names: ['Mahadevaraja', 'Kakati Mahadeva'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: 'c. 1195 – 1199 CE',
      hi: 'लगभग 1195 – 1199 ई.',
      te: 'క్రీ.శ. 1195 – 1199',
      kn: 'ಸು. ಕ್ರಿ.ಶ. 1195 – 1199',
      ta: 'பொ.ஊ. 1195 – 1199',
      mr: 'इ.स. ११९५ – ११९९',
      or: '୧୧୯୫ – ୧୧୯୯ ଖ୍ରୀ.ଅ.',
      bn: 'আনু. ১১৯৫ – ১১৯৯ খ্রি.'
    },
    approx_dates: 'c. 1195 – 1199 CE',
    known_titles: {
      en: ['Parama-Mahesvara', 'Sovereign of Anumakonda & Orugallu'],
      hi: ['परम-माहेश्वर', 'अनुमकोंडा एवं ओरुगल्लु अधिपति'],
      te: ['పరమ మాహేశ్వర', 'అనుమకొండ-ఓరుగల్లు అధిపతి'],
      kn: ['ಪರಮ ಮಾಹೇಶ್ವರ', 'ಅನುಮಕೊಂಡ-ಓರುಗಲ್ಲು ಅಧಿಪತಿ'],
      ta: ['பரம மாகேஸ்வரன்', 'அனுமகொண்டா-ஓருகல்லு அதிபதி'],
      mr: ['परम-माहेश्वर', 'अनुमकोंडा-ओरुगल्लु अधिपती'],
      or: ['ପରମ-ମାହେଶ୍ୱର', 'ଅନୁମକୋଣ୍ଡା-ଓରୁଗଲ୍ଲୁ ଅଧିପତି'],
      bn: ['পরম-মাহেশ্বর', 'অনুমকোন্ডা-ওরুগল্লু অধিপতি']
    },
    biography: {
      en: 'Younger brother of Rudradeva and father of Emperor Ganapati Deva, Mailama, and Kundamamba. Ascending the throne in 1195 CE after the childless Rudradeva fell in battle against the Seuna Yadavas, Mahadeva took a devout Shaiva initiation from Dhruvesvara Pandita and led a bold retaliatory expedition against the Yadava capital of Devagiri in 1198–1199 CE, where he lost his life fighting atop his war elephant while his son Ganapati Deva was temporarily held captive before being released and crowned.',
      hi: 'रुद्रदेव के छोटे भाई तथा सम्राट गणपति देव, मैलमा और कुंदमांबा के पिता। 1195 ई. में रुद्रदेव के वीरगति प्राप्त करने पर उन्होंने सिंहासन संभाला और 1198–1199 ई. में देवगिरि के यादवों के विरुद्ध साहसिक प्रतिशोधात्मक अभियान का नेतृत्व करते हुए रणभूमि में वीरगति पाई।',
      te: 'రుద్రదేవుని తమ్ముడు మరియు గణపతిదేవ చక్రవర్తి, మైలమ, కుందమాంబల తండ్రి. సంతానం లేని రుద్రదేవుడు క్రీ.శ. 1195లో యాదవులతో జరిగిన యుద్ధంలో వీరమరణం పొందగా మహాదేవుడు రాజ్యానికి వచ్చాడు. ధ్రువేశ్వర పండితుని శిష్యుడైన మహాదేవుడు క్రీ.శ. 1198–1199లో దేవగిరి యాదవ రాజ్యంపై ప్రతీకార దండయాత్ర జరిపి యుద్ధభూమిలో గజారోహణుడై పోరాడుతూ వీరమరణం పొందాడు.',
      kn: 'ರುದ್ರದೇವನ ತಮ್ಮ ಮತ್ತು ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವನ ತಂದೆ. ಕ್ರಿ.ಶ. 1195ರಲ್ಲಿ ಸಿಂಹಾಸನವೇರಿದ ಇವನು ದೇವಗಿರಿಯ ಯಾದವರ ವಿರುದ್ಧದ ಯುದ್ಧದಲ್ಲಿ (1198–1199) ವೀರಮರಣ ಹೊಂದಿದನು.',
      ta: 'உருத்ரதேவரின் இளைய சகோதரரும் பேரரசர் கணபதி தேவரின் தந்தையுமாவார். 1195இல் ஆட்சிப் பொறுப்பேற்று, தேவகிரி யாதவர்களுக்கு எதிரான போரில் (1198–1199) வீரமரணம் அடைந்தார்.',
      mr: 'रुद्रदेवाचा धाकटा भाऊ आणि सम्राट गणपती देवाचा पिता. ११९५ मध्ये गादीवर बसल्यानंतर देवगिरीच्या यादवांविरुद्धच्या मोहिमेत (११९८–११९९) तो धारातीर्थी पडला.',
      or: 'ରୁଦ୍ରଦେବଙ୍କ ସାନ ভাই ଓ ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ପିତା। ୧୧୯୫ରେ ସିଂହାସନ ଆରୋହଣ କରି ଦେବଗିରି ଯାଦବଙ୍କ ବିରୁଦ୍ଧରେ ଯୁଦ୍ଧରେ (୧୧୯୮–୧୧୯୯) ବୀରଗତି ପ୍ରାପ୍ତ ହୋଇଥିଲେ।',
      bn: 'রুদ্রদেবের কনিষ্ঠ ভ্রাতা এবং সম্রাট গণপতি দেবের পিতা। ১১৯৫ খ্রিস্টাব্দে সিংহাসনে আরোহণ করে দেবগিরির যাদবদের বিরুদ্ধে যুদ্ধে (১১৯৮–১১৯৯) বীরগতি প্রাপ্ত হন।'
    },
    major_events: {
      en: [
        'Succession to the Kakatiya throne following Rudradeva’s death (1195 CE)',
        'Sundilla Epigraph & patronage of Shaiva preceptor Dhruvesvara Pandita',
        'Retaliatory military expedition against the Seuna Yadavas of Devagiri (1198–1199 CE)'
      ],
      hi: [
        'रुद्रदेव के पश्चात काकतीय सिंहासन पर आरोहण (1195 ई.)',
        'सुंदिल्ला शिलालेख एवं शैव आचार्य ध्रुवेश्वर पंडित को संरक्षण',
        'देवगिरि के यादवों के विरुद्ध सैन्य अभियान और रणभूमि में वीरगति (1198–1199 ई.)'
      ],
      te: [
        'రుద్రదేవుని అనంతరం కాకతీయ సింహాసనాధిష్ఠానం (1195)',
        'సుందిళ్ల శాసనం మరియు శైవ గురువు ధ్రువేశ్వర పండితుని ఆదరణ',
        'దేవగిరి యాదవులపై దండయాత్ర మరియు రణరంగంలో వీరమరణం (1198–1199)'
      ],
      kn: [
        'ರುದ್ರದೇವನ ನಂತರ ಕಾಕತೀಯ ಸಿಂಹಾಸನಾರೋಹಣ (1195)',
        'ಧ್ರುವೇಶ್ವರ ಪಂಡಿತರಿಗೆ ರಾಜಾಶ್ರಯ',
        'ದೇವಗಿರಿಯ ಯಾದವರ ವಿರುದ್ಧದ ದಂಡಯಾತ್ರೆ (1198–1199)'
      ],
      ta: [
        'உருத்ரதேவருக்குப் பின் காகதீய அரியணை ஏறுதல் (1195)',
        'துருவேஸ்வர பண்டிதருக்கு ஆதரவு',
        'தேவகிரி யாதவர்களுக்கு எதிரான படையெடுப்பு (1198–1199)'
      ],
      mr: [
        'रुद्रदेवानंतर काकतीय सिंहासनावर आरोहण (११९५)',
        'ध्रुवेश्वर पंडितांना राजाश्रय',
        'देवगिरीच्या यादवांविरुद्ध लष्करी मोहीम (११९८–११९९)'
      ],
      or: [
        'ରୁଦ୍ରଦେବଙ୍କ ପରେ କାକତୀୟ ସିଂହାସନ ଆରୋହଣ (୧୧୯୫)',
        'ଧ୍ରୁବେଶ୍ୱର ପଣ୍ଡିତଙ୍କୁ ରାଜାଶ୍ରୟ',
        'ଦେବଗିରି ଯାଦବଙ୍କ ବିରୁଦ୍ଧରେ ସାମରିକ ଅଭିଯାନ (୧୧୯୮–୧୧୯୯)'
      ],
      bn: [
        'রুদ্রদেবের পর কাকতীয় সিংহাসনে আরোহণ (১১৯৫)',
        'ধ্রুবেশ্বর পণ্ডিতকে পৃষ্ঠপোষকতা',
        'দেবগিরির যাদবদের বিরুদ্ধে সামরিক অভিযান (১১৯৮–১১৯৯)'
      ]
    },
    historical_significance: {
      en: 'Maintained Kakatiya dynastic continuity during the perilous 1195–1199 CE Yadava crisis and fathered Emperor Ganapati Deva, under whom the empire reached its territorial zenith.',
      hi: '1195–1199 ई. के संकटकाल में काकतीय वंश की निरंतरता बनाए रखी; उनके पुत्र सम्राट गणपति देव के अधीन साम्राज्य अपने सर्वोच्च शिखर पर पहुँचा।',
      te: 'క్రీ.శ. 1195–1199 సంక్షోభ సమయంలో కాకతీయ రాజ్య రక్షణకై పోరాడి, సామ్రాజ్యాన్ని ఉచ్చస్థితికి చేర్చిన గణపతిదేవ చక్రవర్తికి జన్మనిచ్చాడు.',
      kn: '1195–1199ರ ಸಂಕಷ್ಟ ಕಾಲದಲ್ಲಿ ಕಾಕತೀಯ ವಂಶದ ನಿರಂತರತೆಯನ್ನು ಕಾಪಾಡಿದನು ಮತ್ತು ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವನ ತಂದೆಯಾದನು.',
      ta: '1195–1199 நெருக்கடிக் காலத்தில் காகதீய வம்சத்தின் தொடர்ச்சியைக் காத்ததோடு பேரரசர் கணபதி தேவரின் தந்தையாக விளங்கினார்.',
      mr: '११९५–११९९ च्या संकटकाळात काकतीय घराण्याचे सातत्य राखले आणि सम्राट गणपती देवाचे पितृत्व भूषवले.',
      or: '୧୧୯୫–୧୧୯୯ ସঙ্কট କାଳରେ କାକତୀୟ ବଂଶର ଧାରାବାହିକତା ରକ୍ଷା କରିଥିଲେ ଓ ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ପିତା ଥିଲେ।',
      bn: '১১৯৫–১১৯৯ খ্রিস্টাব্দের সংকটকালে কাকতীয় বংশের ধারাবাহিকতা রক্ষা করেন এবং সম্রাট গণপতি দেবের পিতা ছিলেন।'
    },
    associated_places: {
      en: ['Anumakonda (Hanamkonda)', 'Orugallu (Warangal)', 'Bayyaram', 'Devagiri'],
      hi: ['अनुमकोंडा (हनमकोंडा)', 'ओरुगल्लु (वारंगल)', 'बय्यारम', 'देवगिरि'],
      te: ['అనుమకొండ (హనుమకొండ)', 'ఓరుగల్లు (వరంగల్)', 'బయ్యారం', 'దేవగిరి'],
      kn: ['ಅನುಮಕೊಂಡ', 'ಓರುಗಲ್ಲು', 'ಬಯ್ಯಾರಂ', 'ದೇವಗಿರಿ'],
      ta: ['அனுமகொண்டா', 'ஓருகல்லு', 'பய்யாரம்', 'தேவகிரி'],
      mr: ['अनुमकोंडा', 'ओरुगल्लु', 'बय्यारम', 'देवगिरी'],
      or: ['ଅନୁମକୋଣ୍ଡା', 'ଓରୁଗଲ୍ଲୁ', 'ବୟ୍ୟାରମ', 'ଦେବଗିରି'],
      bn: ['অনুমকোন্ডা', 'ওরুগল্লু', 'বয়্যারম', 'দেবগিরি']
    },
    evidence_status: 'Epigraphic Record',
    image_url: ARCHIVE_IMG('kondavidu_hill_fortress.jpg'),
    inscriptions_ids: ['insc_motupalli_1244'],
    citations: [
      'Bayyaram Tank Inscription of Mailama (Epigraphia Andhrica Vol. I)',
      'Palampet Inscription of Recharla Rudra (1213 CE, documenting how Recharla Rudra saved the kingdom during Ganapati Deva’s captivity)',
      'Sastry, P.V. Parabrahma, The Kakatiyas of Warangal (1978), pp. 102–105'
    ]
  },

  // 7. Ganapati Deva (KD-0008)
  {
    id: 'fig_kakatiya_ganapati_deva',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Emperor Ganapati Deva',
      hi: 'सम्राट गणपति देव',
      te: 'గణపతిదేవ చక్రవర్తి',
      kn: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವ',
      ta: 'பேரரசர் கணபதி தேவர்',
      mr: 'सम्राट गणपती देव',
      or: 'ସମ୍ରାଟ ଗଣପତି ଦେବ',
      bn: 'সম্রাট গণপতি দেব'
    },
    alternate_names: ['Kakatiya Ganapatideva Maharaja', 'Raya-Gajakesari', 'Chalamartiganda'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: '1199 – 1262 CE (63-Year Imperial Reign)',
      hi: '1199 – 1262 ई. (63-वर्षीय साम्राज्य शासन)',
      te: 'క్రీ.శ. 1199 – 1262 (63 ఏళ్ల సుదీర్ఘ సామ్రాజ్య పాలన)',
      kn: 'ಕ್ರಿ.ಶ. 1199 – 1262 (63 ವರ್ಷಗಳ ಸಾಮ್ರಾಜ್ಯ ಆಳ್ವಿಕೆ)',
      ta: 'பொ.ஊ. 1199 – 1262 (63 ஆண்டுப் பேரரசு ஆட்சி)',
      mr: 'इ.स. ११९९ – १२६२ (६३ वर्षांची साम्राज्य कारकीर्द)',
      or: '୧୧୯୯ – ୧୨୬୨ ଖ୍ରୀ.ଅ. (୬୩ ବର୍ଷର ସାମ୍ରାଜ୍ୟ ଶାସନ)',
      bn: '১১৯৯ – ১২৬২ খ্রি. (৬৩ বছরের সাম্রাজ্যিক শাসন)'
    },
    approx_dates: '1199 – 1262 CE',
    known_titles: {
      en: ['Maharajadhiraja', 'Raya-Gajakesari', 'Sakala-Desha-Pratishthapanacharya', 'Promulgator of the Motupalli Abhaya Shasana'],
      hi: ['महाराजाधिराज', 'राय-गजकेसरी', 'सकल-देश-प्रतिष्ठापनाचार्य', 'मोटुपल्ली अभय शासन प्रवर्तक'],
      te: ['మహారాజాధిరాజ', 'రాయగజకేసరి', 'సకలదేశ ప్రతిష్ఠాపనాచార్య', 'మోటుపల్లి అభయశాసన ప్రదాత'],
      kn: ['ಮಹಾರಾಜಾಧಿರಾಜ', 'ರಾಯ-ಗಜಕೇಸರಿ', 'ಸಕಲದೇಶ ಪ್ರತಿಷ್ಠಾಪನಾಚಾರ್ಯ', 'ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ ಪ್ರವರ್ತಕ'],
      ta: ['மகாராஜாதிராஜா', 'ராய-கஜகேசரி', 'மோட்டுப்பள்ளி அபய சாசன நிறுவனர்'],
      mr: ['महाराजाधिराज', 'राय-गजकेसरी', 'मोटुपल्ली अभय शासन प्रवर्तक'],
      or: ['ମହାରାଜାଧିରାଜ', 'ରାୟ-ଗଜକେସରୀ', 'ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ ପ୍ରବର୍ତ୍ତକ'],
      bn: ['মহারাজাধিরাজ', 'রায়-গজকেশরী', 'মোতুপল্লী অভয় শাসন প্রবর্তক']
    },
    biography: {
      en: 'Son of Mahadeva and the greatest imperial unifier of the Kakatiya Dynasty, reigning for an extraordinary 63 years (1199–1262 CE). While young Ganapati Deva was held in Yadava captivity following his father’s death in 1199 CE, the loyal general Recharla Rudra (Senapati) defended the realm until Ganapati Deva returned to assume the throne. Ganapati Deva conquered Coastal Andhra from the Velanati Chodas (1201–1212 CE), subdued Divi Island (marrying Naramba and Peramba, sisters of Jayapa Senani), allied with the Nellore Telugu Chodas (Manumasiddhi II), extended Kakatiya power from the Godavari-Kalinga frontier to Kanchipuram, transferred the permanent imperial capital from Anumakonda to Orugallu (Warangal), issued the famous Motupalli Abhaya Shasana maritime trade charter in 1244 CE, and trained his daughter Rudrama Devi as his co-regent and male-titled successor.',
      hi: 'महादेव के पुत्र और काकतीय राजवंश के सबसे महान साम्राज्य निर्माता, जिन्होंने 63 वर्षों (1199–1262 ई.) तक शासन किया। सेनापति रेचर्ला रुद्र की स्वामिभक्ति से सिंहासन प्राप्त करने के बाद उन्होंने वेलनाडु चोडों को पराजित कर तटीय आंध्र, दिवी द्वीप, नेल्लोर और कांचीपुरम तक साम्राज्य का विस्तार किया। उन्होंने ओरुगल्लु (वारंगल) को स्थायी राजधानी बनाया, 1244 ई. में मोटुपल्ली अभय शासन जारी किया और अपनी पुत्री रुद्रमा देवी को उत्तराधिकारी नियुक्त किया।',
      te: 'మహాదేవుని కుమారుడు మరియు కాకతీయ చక్రవర్తులలో అగ్రగణ్యుడు. క్రీ.శ. 1199 నుండి 1262 వరకు 63 సంవత్సరాల పాటు సుదీర్ఘంగా పాలించి సమస్త తెలుగు నేలను (తెలంగాణ, తీర ఆంధ్ర, రాయలసీమ) ఒకే సామ్రాజ్యంగా ఏకం చేశాడు. స్వామిభక్తుడైన రేచర్ల రుద్ర సేనాని సహకారంతో సింహాసనాన్ని అధిష్టించి వెలనాటి చోడులను, దివిసీమ అయ్య వంశీయులను జయించి, జాయప సేనాని సోదరీమణులైన నారాంబ, పేరాంబలను వివాహమాడాడు. రాజధానిని అనుమకొండ నుండి ఓరుగల్లుకు మార్చి, 1213లో రామప్ప, పాకాల చెరువులు నిర్మింపజేసి, 1244లో మోటుపల్లి అభయ శాసనం జారీ చేశాడు. తన కుమార్తె రుద్రమదేవిని రుద్రదేవ మహారాజుగా ప్రకటించి వారసురాలిని చేశాడు.',
      kn: 'ಮಹಾದೇವನ ಪುತ್ರ ಮತ್ತು 63 ವರ್ಷಗಳ ಕಾಲ (1199–1262) ಆಳಿದ ಕಾಕತೀಯ ವಂಶದ ಮಹಾನ್ ಸಾಮ್ರಾಟ. ಸಮಗ್ರ ತೆಲುಗು ನಾಡನ್ನು ಏಕೀಕರಿಸಿ, ಓರುಗಲ್ಲನ್ನು ಶಾಶ್ವತ ರಾಜಧಾನಿಯನ್ನಾಗಿ ಮಾಡಿ, 1213ರಲ್ಲಿ ರಾಮಪ್ಪ ದೇವಾಲಯ ಹಾಗೂ ಪಾಕಾಲ ಕೆರೆ ನಿರ್ಮಾಣಕ್ಕೆ ಪ್ರೇರಣೆ ನೀಡಿದನು ಮತ್ತು 1244ರಲ್ಲಿ ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನವನ್ನು ಹೊರಡಿಸಿದನು.',
      ta: 'மகாதேவரின் புதல்வரும் 63 ஆண்டுகள் (1199–1262) ஆட்சி புரிந்த மாபெரும் காகதீயப் பேரரசருமாவார். முழுத் தெலுங்கு மண்டலத்தையும் ஒன்றிணைத்து ஓருகல்லுவை நிரந்தரத் தலைநகராக்கினார்; 1213இல் ராமப்பா கோயில், பாகால் ஏரி மற்றும் 1244இல் மோட்டுப்பள்ளி அபய சாசனத்தை உருவாக்கினார்.',
      mr: 'महादेवाचा पुत्र आणि ६३ वर्षे (११९९–१२६२) राज्य करणारा काकतीय राजवंशातील सर्वात महान सम्राट. त्याने संपूर्ण तेलुगू प्रदेश एकत्र केला, ओरुगल्लुला स्थायी राजधानी बनवले, १२१३ मध्ये रामप्पा मंदिर व पाखाल तलाव उभारण्यास प्रोत्साहन दिले आणि १२४४ मध्ये मोटुपल्ली अभय शासन जारी केले.',
      or: 'ମହାଦେବଙ୍କ ପୁତ୍ର ଓ ୬୩ ବର୍ଷ (୧୧୯୯–୧୨୬୨) ଶାସନ କରିଥିବା କାକତୀୟ ବଂଶର ସର୍ବଶ୍ରେଷ୍ଠ ସମ୍ରାଟ। ସେ ସମଗ୍ର ତେଲୁଗୁ ଅଞ୍ଚଳକୁ ଏକত্রିତ କରି ଓରୁଗଲ୍ଲୁକୁ ସ୍ଥାୟୀ ରାଜଧାନୀ କରିଥିଲେ, ୧୨୧୩ରେ ରାମପ୍ପା ମନ୍ଦିର ଓ ୧୨୪୪ରେ ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ ପ୍ରତିଷ୍ଠା କରିଥିଲେ।',
      bn: 'মহাদেবের পুত্র এবং ৬৩ বছর (১১৯৯–১২৬২) শাসনকারী কাকতীয় রাজবংশের সর্বশ্রেষ্ঠ সম্রাট। তিনি সমগ্র তেলুগু অঞ্চলকে ঐক্যবদ্ধ করে ওরুগল্লুকে স্থায়ী রাজধানী করেন, ১২১৩ খ্রিস্টাব্দে রামাপ্পা মন্দির এবং ১২৪৪ খ্রিস্টাব্দে মোতুপল্লী অভয় শাসন প্রতিষ্ঠা করেন।'
    },
    major_events: {
      en: [
        'Unification of Telangana, Coastal Andhra (Velanadu & Divi Island), and Nellore–Kanchipuram corridor (1201–1250 CE)',
        'Consecration of Ramappa Temple (Palampet) by Recharla Rudra & Excavation of Pakhal and Ramappa Lakes (1213 CE)',
        'Promulgation of the Motupalli Abhaya Shasana Maritime Trade Charter (1244 CE / Saka 1166) & Co-regency of Rudrama Devi (1259–1262 CE)'
      ],
      hi: [
        'तेलंगाना, तटीय आंध्र (वेलनाडु एवं दिवी द्वीप) और नेल्लोर-कांचीपुरम का साम्राज्यीय एकीकरण (1201–1250 ई.)',
        'रेचर्ला रुद्र द्वारा रामप्पा मंदिर (पालापेट) की प्रतिष्ठा तथा पाखाल और रामप्पा झीलों का निर्माण (1213 ई.)',
        'मोटुपल्ली अभय शासन समुद्री व्यापार चार्टर (1244 ई.) एवं पुत्री रुद्रमा देवी का सह-शासन (1259–1262 ई.)'
      ],
      te: [
        'తెలంగాణ, తీర ఆంధ్ర (వెలనాడు & దివిసీమ) మరియు నెల్లూరు-కాంచీపురం ప్రాంతాల ఏకీకరణ (1201–1250)',
        'రేచర్ల రుద్రునిచే రామప్ప దేవాలయ నిర్మాణం & పాకాల, రామప్ప చెరువుల తవ్వకం (1213)',
        'మోటుపల్లి అభయ శాసన జారీ (1244 / శక 1166) మరియు కుమార్తె రుద్రమదేవి సహ-పరిపాలన (1259–1262)'
      ],
      kn: [
        'ತೆಲಂಗಾಣ, ಕರಾವಳಿ ಆಂಧ್ರ ಮತ್ತು ನೆಲ್ಲೂರು-ಕಾಂಚೀಪುರಂ ಏಕೀಕರಣ (1201–1250)',
        'ರಾಮಪ್ಪ ದೇವಾಲಯ ಮತ್ತು ಪಾಕಾಲ-ರಾಮಪ್ಪ ಕೆರೆಗಳ ನಿರ್ಮಾಣ (1213)',
        'ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (1244) ಮತ್ತು ಪುತ್ರಿ ರುದ್ರಮಾದೇವಿಗೆ ಪಟ್ಟಾಭಿಷೇಕ'
      ],
      ta: [
        'தெலுங்கானா, ஆந்திரக் கடற்கரை மற்றும் நெல்லூர்-காஞ்சிபுரம் ஒன்றிணைப்பு (1201–1250)',
        'ராமப்பா கோயில் மற்றும் பாகால்-ராமப்பா ஏரிகள் உருவாக்கம் (1213)',
        'மோட்டுப்பள்ளி அபய சாசனம் (1244) மற்றும் மகள் ருத்ரமா தேவிக்கு முடிசூட்டல்'
      ],
      mr: [
        'तेलंगणा, किनारी आंध्र आणि नेल्लोर-कांचीपुरमचे एकीकरण (१२०१–१२५०)',
        'रामप्पा मंदिर आणि पाखाल-रामप्पा तलावांची उभारणी (१२१३)',
        'मोटुपल्ली अभय शासन (१२४४) आणि कन्या रुद्रमा देवीची उत्तराधिकारी म्हणून नियुक्ती'
      ],
      or: [
        'ତେଲେଙ୍ଗାନା, ତଟବର୍ତ୍ତୀ ଆନ୍ଧ୍ର ଓ ନେଲ୍ଲୋର-କାଞ୍ଚିପୁରମର ଏକୀକରଣ (୧୨୦୧–୧୨୫୦)',
        'ରାମପ୍ପା ମନ୍ଦିର ଓ ପାଖାଲ-ରାମପ୍ପା ହ୍ରଦ ନିର୍ମାଣ (୧୨୧୩)',
        'ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ (୧୨୪୪) ଓ କନ୍ୟା ରୁଦ୍ରମା ଦେବୀଙ୍କ ସହ-ଶାସନ'
      ],
      bn: [
        'তেলেঙ্গানা, উপকূলীয় অন্ধ্র ও নেল্লোর-কাঞ্চীপুরমের একীকরণ (১২০১–১২৫০)',
        'রামাপ্পা মন্দির এবং পাখাল-রামাপ্পা হ্রদ নির্মাণ (১২১৩)',
        'মোতুপল্লী অভয় শাসন (১২৪৪) এবং কন্যা রুদ্রমা দেবীর সহ-শাসন'
      ]
    },
    historical_significance: {
      en: 'United all Telugu-speaking regions under Orugallu for the first time since the Satavahanas, transformed Motupalli into an international maritime emporium, and instituted gender-transcending royal succession by appointing his daughter Rudrama Devi as Maharaja.',
      hi: 'सातवाहनों के बाद पहली बार समस्त तेलुगु क्षेत्रों को ओरुगल्लु के अधीन एकीकृत किया, मोटुपल्ली को अंतरराष्ट्रीय बंदरगाह बनाया और अपनी पुत्री रुद्रमा देवी को महाराजा के रूप में उत्तराधिकारी नियुक्त किया।',
      te: 'శాతవాహనుల తర్వాత తొలిసారిగా సమస్త తెలుగు నేలను ఓరుగల్లు పాలన కిందికి తెచ్చి, మోటుపల్లిని అంతర్జాతీయ ఓడరేవుగా తీర్చిదిద్ది, కుమార్తె రుద్రమదేవిని మహారాజుగా అభిషేకించిన దార్శనిక చక్రవర్తి.',
      kn: 'ಸಮಗ್ರ ತೆಲುಗು ಪ್ರದೇಶಗಳನ್ನು ಓರುಗಲ್ಲು ಅಡಿಯಲ್ಲಿ ಒಂದುಗೂಡಿಸಿ, ಮೋಟುಪಲ್ಲಿಯನ್ನು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಬಂದರನ್ನಾಗಿ ಮಾಡಿ, ಪುತ್ರಿ ರುದ್ರಮಾದೇವಿಯನ್ನು ಮಹಾರಾಜನನ್ನಾಗಿ ನೇಮಿಸಿದನು.',
      ta: 'முழுத் தெலுங்குப் பகுதிகளையும் ஓருகல்லு கீழ் இணைத்து, மோட்டுப்பள்ளியைப் பன்னாட்டுத் துறைமுகமாக்கி, மகள் ருத்ரமா தேவியை மகாராஜாவாக முடிசூட்டினார்.',
      mr: 'संपूर्ण तेलुगू प्रदेश ओरुगल्लुच्या छत्राखाली आणला, मोटुपल्लीला आंतरराष्ट्रीय बंदर बनवले आणि कन्या रुद्रमा देवीला महाराजा म्हणून नियुक्त केले.',
      or: 'ସମଗ୍ର ତେଲୁଗୁ ଅଞ୍ଚଳକୁ ଓରୁଗଲ୍ଲୁ ଅଧୀନରେ ଏକତ୍ରିତ କରି ମୋଟୁପଲ୍ଲୀକୁ ଆନ୍ତର୍ଜାତୀୟ ବନ୍ଦର କରିଥିଲେ ଓ କନ୍ୟା ରୁଦ୍ରମା ଦେବୀଙ୍କୁ ମହାରାଜା ଭାବେ ଅଭିଷিক্ত କରିଥିଲେ।',
      bn: 'সমগ্র তেলুগু অঞ্চলকে ওরুগল্লুর অধীনে ঐক্যবদ্ধ করেন, মোতুপল্লীকে আন্তর্জাতিক বন্দরে পরিণত করেন এবং কন্যা রুদ্রমা দেবীকে মহারাজা হিসেবে অভিষিক্ত করেন।'
    },
    associated_places: {
      en: ['Orugallu (Warangal)', 'Motupalli Port', 'Palampet (Ramappa)', 'Pakhal', 'Divi Island', 'Kanchipuram'],
      hi: ['ओरुगल्लु (वारंगल)', 'मोटुपल्ली बंदरगाह', 'पालापेट (रामप्पा)', 'पाखाल', 'दिवी द्वीप', 'कांचीपुरम'],
      te: ['ఓరుగల్లు (వరంగల్)', 'మోటుపల్లి ఓడరేవు', 'పాలంపేట (రామప్ప)', 'పాకాల', 'దివిసీమ', 'కాంచీపురం'],
      kn: ['ಓರುಗಲ್ಲು (ವರಂಗಲ್)', 'ಮೋಟುಪಲ್ಲಿ ಬಂದರು', 'ಪಾಲಂಪೇಟ (ರಾಮಪ್ಪ)', 'ಪಾಕಾಲ', 'ದಿವಿ ದ್ವೀಪ'],
      ta: ['ஓருகல்லு (வாரங்கல்)', 'மோட்டுப்பள்ளி துறைமுகம்', 'பாலம்பேட்டை (ராமப்பா)', 'பாகால்', 'காஞ்சிபுரம்'],
      mr: ['ओरुगल्लु (वरंगळ)', 'मोटुपल्ली बंदर', 'पालमपेट (रामप्पा)', 'पाखाल', 'कांचीपुरम'],
      or: ['ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ)', 'ମୋଟୁପଲ୍ଲୀ ବନ୍ଦର', 'ପାଲମପେଟ (ରାମପ୍ପା)', 'ପାଖାଲ', 'କାଞ୍ଚିପୁରମ'],
      bn: ['ওরুগল্লু (ওয়ারাঙ্গল)', 'মোতুপল্লী বন্দর', 'পালমপেট (রামাপ্পা)', 'পাখাল', 'কাঞ্চীপুরম']
    },
    evidence_status: 'Documented Primary Evidence',
    image_url: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
    inscriptions_ids: ['insc_motupalli_1244', 'insc_malkapuram_1261'],
    citations: [
      'Motupalli Pillar Inscription of Ganapatideva (Saka 1166 / 1244 CE), ed. E. Hultzsch, Epigraphia Indica Vol. XII, pp. 188–197',
      'Palampet Inscription of Recharla Rudra (Saka 1135 / 1213 CE)',
      'Chebrolu Inscription of Jayapa Senani (1235 CE, Epigraphia Indica Vol. V)',
      'Talbot, Cynthia, Precolonial India in Practice (2001), pp. 133–143'
    ]
  },

  // 8. Rani Rudrama Devi (KD-0009)
  {
    id: 'fig_kakatiya_rudrama_devi',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Queen Rudrama Devi (Rudradeva Maharaja)',
      hi: 'रानी रुद्रमा देवी (रुद्रदेव महाराजा)',
      te: 'రాణి రుద్రమదేవి (రుద్రదేవ మహారాజు)',
      kn: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿ (ರುದ್ರದೇವ ಮಹಾರಾಜ)',
      ta: 'ராணி ருத்ரமா தேவி (உருத்ரதேவ மகாராஜா)',
      mr: 'राणी रुद्रमा देवी (रुद्रदेव महाराजा)',
      or: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀ (ରୁଦ୍ରଦେବ ମହାରାଜା)',
      bn: 'রানি রুদ্রমা দেবী (রুদ্রদেব মহারাজা)'
    },
    alternate_names: ['Rudradeva Maharaja', 'Rani Rudrama', 'Raya-Gajakesari Rudramamba'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: '1262 – November 1289 CE (Co-regent from 1259 CE)',
      hi: '1262 – नवंबर 1289 ई. (1259 ई. से सह-शासिका)',
      te: 'క్రీ.శ. 1262 – నవంబర్ 1289 (1259 నుండి సహ-పరిపాలన)',
      kn: 'ಕ್ರಿ.ಶ. 1262 – ನವೆಂಬರ್ 1289 (1259ರಿಂದ ಸಹ-ಆಡಳಿತ)',
      ta: 'பொ.ஊ. 1262 – நவம்பர் 1289 (1259 முதல் இணை ஆட்சி)',
      mr: 'इ.स. १२६२ – नोव्हेंबर १२८९ (१२५९ पासून सह-शासिका)',
      or: '୧୨୬୨ – ନଭେମ୍ବର ୧୨୮୯ ଖ୍ରୀ.ଅ. (୧୨୫୯ରୁ ସହ-ଶାସିକା)',
      bn: '১২৬২ – নভেম্বর ১২৮৯ খ্রি. (১২৫৯ থেকে সহ-শাসিকা)'
    },
    approx_dates: '1262 – 1289 CE',
    known_titles: {
      en: ['Rudradeva Maharaja', 'Raya-Gajakesari', 'Dayagajakesari', 'Mahamandalesvara'],
      hi: ['रुद्रदेव महाराजा', 'राय-गजकेसरी', 'दयागजकेसरी', 'वीर वीरांगना सम्राज्ञी'],
      te: ['రుద్రదేవ మహారాజు', 'రాయగజకేసరి', 'దయాగజకేసరి', 'ఓరుగల్లు సామ్రాజ్ఞి'],
      kn: ['ರುದ್ರದೇವ ಮಹಾರಾಜ', 'ರಾಯ-ಗಜಕೇಸರಿ', 'ದಯಾಗಜಕೇಸರಿ'],
      ta: ['உருத்ரதேவ மகாராஜா', 'ராய-கஜகேசரி', 'தயாகஜகேசரி'],
      mr: ['रुद्रदेव महाराजा', 'राय-गजकेसरी', 'दयागजकेसरी'],
      or: ['ରୁଦ୍ରଦେବ ମହାରାଜା', 'ରାୟ-ଗଜକେସରୀ', 'ଦୟାଗଜକେସରୀ'],
      bn: ['রুদ্রদেব মহারাজা', 'রায়-গজকেশরী', 'দয়াগজকেশরী']
    },
    biography: {
      en: 'One of the few sovereign reigning queens in Indian history, daughter of Emperor Ganapati Deva and consort of Eastern Chalukya prince Virabhadra of Nidadavolu. Designated through the ancient Putrika ceremony as a male heir bearing the official royal title "Rudradeva Maharaja", she governed in male warrior attire, crushed internal aristocratic rebellions, and defeated the invading Seuna Yadava King Mahadeva of Devagiri—pursuing his forces to the walls of Devagiri and extracting heavy war indemnity (recorded in the Bidar fort inscription). She completed the inner granite ramparts, 45 bastions, and moat of Orugallu Fort, endowed the Golaki Matha university-hospital complex at Malkapuram (1261 CE), and adopted her daughter Mummadamma’s son Prataparudra II as heir. As proven by the Chandupatla Stone Inscription (27 November 1289 CE), Queen Rudrama Devi died heroically on the battlefield in November 1289 CE alongside her general Mallikarjuna Nayaka while leading a campaign against the rebel Kayastha chief Ambadeva.',
      hi: 'भारतीय इतिहास की गिनी-चुनी सार्वभौम महिला शासिकाओं में से एक, सम्राट गणपति देव की पुत्री और निडदवोलु के चालुक्य राजकुमार वीरभद्र की पत्नी। पुत्रिका संस्कार के माध्यम से "रुद्रदेव महाराजा" की राजकीय उपाधि धारण कर उन्होंने पुरुष योद्धा वेश में शासन किया, देवगिरि के यादव राजा महादेव को पराजित कर भारी युद्ध हर्जाना वसूला, ओरुगल्लु किले की ग्रेनाइट प्राचीर और खाई को पूर्ण कराया तथा मल्कापुरम (1261 ई.) में गोलकी मठ विश्वविद्यालय-चिकित्सालय को दान दिया। चंदुपट्ला शिलालेख (27 नवंबर 1289 ई.) के अनुसार उन्होंने नवंबर 1289 ई. में विद्रोही कायस्थ प्रमुख अंबादेव के विरुद्ध युद्ध लड़ते हुए रणभूमि में वीरगति प्राप्त की।',
      te: 'భారతదేశ చరిత్రలో స్వతంత్రంగా సామ్రాజ్యాన్ని ఏలిన అరుదైన వీరనారి, గణపతిదేవ చక్రవర్తి కుమార్తె మరియు నిడదవోలు తూర్పు చాళుక్య యువరాజు వీరభద్రుని అర్ధాంగి. పుత్రికా స్వీకార విధానం ద్వారా "రుద్రదేవ మహారాజు" అనే పురుష రాజబిరుదుతో సింహాసనాన్ని అధిష్టించి, పురుష యోధుని వలె కవచధారణ చేసి రణరంగాన సేనలను నడిపించింది. దేవగిరి యాదవ రాజైన మహాదేవుని దండయాత్రను తిప్పికొట్టి దేవగిరి కోట వరకు తరిమి కొట్టి యుద్ధ నష్టపరిహారం వసూలు చేసింది (బీదర్ శాసనం). ఓరుగల్లు రాతి కోట, 45 బురుజులు, కందకం నిర్మాణాన్ని పూర్తి చేసింది; మల్కాపురం శాసనం (1261) ద్వారా విశ్వేశ్వర శంభుని గోళకీ మఠం, ప్రసూతి వైద్యశాల, విద్యాపీఠానికి దానాలు చేసింది. నల్లగొండ జిల్లా **చందుపట్ల శిలాశాసనం (27 నవంబర్ 1289)** ప్రకారం కాయস্থ అంబదేవుని తిరుగుబాటును అణచివేసే యుద్ధంలో తన సేనాని మల్లికార్జున నాయకునితో కలిసి క్రీ.శ. 1289 నవంబర్‌లో రణభూమిలో వీరమరణం పొందింది.',
      kn: 'ಭಾರತದ ಇತಿಹಾಸದಲ್ಲಿ ಸ್ವತಂತ್ರವಾಗಿ ಆಳಿದ ವೀರ ಸಾಮ್ರಾಜ್ಞಿ, ಗಣಪತಿದೇವನ ಪುತ್ರಿ. "ರುದ್ರದೇವ ಮಹಾರಾಜ" ಎಂಬ ಪುರುಷ ರಾಜಬಿರುದಿನೊಂದಿಗೆ ಸಿಂಹಾಸನವೇರಿ, ದೇವಗಿರಿಯ ಯಾದವ ರಾಜ ಮಹಾದೇವನನ್ನು ಸೋಲಿಸಿ, ಓರುಗಲ್ಲು ಕಲ್ಲಿನ ಕೋಟೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದಳು. **ಚಂದುಪಟ್ಲ ಶಾಸನದ (27 ನವೆಂಬರ್ 1289)** ಪ್ರಕಾರ ಕಾಯস্থ ಅಂಬದೇವನ ವಿರುದ್ಧದ ಯುದ್ಧದಲ್ಲಿ ನವೆಂಬರ್ 1289ರಲ್ಲಿ ವೀರಮರಣ ಹೊಂದಿದಳು.',
      ta: 'இந்திய வரலாற்றில் சுதந்திரமாகப் பேரரசை ஆண்ட வீரப் பேரரசி, கணபதி தேவரின் புதல்வி. "உருத்ரதேவ மகாராஜா" என்ற ஆண் அரசப் பட்டத்துடன் அரியணை ஏறி, தேவகிரி யாதவ மன்னன் மகாதேவனை முறியடித்து, ஓருகல்லு கற்கோட்டையை நிறைவு செய்தார். **சந்துபட்லா கல்வெட்டின்படி (27 நவம்பர் 1289)** அம்பதேவனுக்கு எதிரான போரில் நவம்பர் 1289இல் போர்க்களத்தில் வீரமரணம் அடைந்தார்.',
      mr: 'भारतीय इतिहासातील एक अद्वितीय सार्वभौम सम्राज्ञी, सम्राट गणपती देवाची कन्या. "रुद्रदेव महाराजा" ही पदवी धारण करून तिने देवगिरीच्या यादव राजा महादेवाचा पराभव केला आणि ओरुगल्लुचा दगडी किल्ला पूर्ण केला. **चंदुपट्ला शिलालेखानुसार (२७ नोव्हेंबर १२८९)** बंडखोर अंबादेवाविरुद्धच्या युद्धात नोव्हेंबर १२८९ मध्ये तिला वीरमरण आले.',
      or: 'ଭାରତୀୟ ଇତିହାସର ଅନ୍ୟତମ ମହାନ ସାର୍ବଭୌମ ସମ୍ରାଜ୍ଞୀ, ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ କନ୍ୟା। "ରୁଦ୍ରଦେବ ମହାରାଜା" ଉପାଧି ଧାରଣ କରି ସେ ଦେବଗିରିର ଯାଦବ ରାଜା ମହାଦେବଙ୍କୁ ପରାସ୍ତ କରିଥିଲେ ଓ ଓରୁଗଲ୍ଲୁ ପ୍ରସ୍ତର ଦୁର୍ଗ ସମ୍ପୂର୍ଣ୍ଣ କରିଥିଲେ। **ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ (୨୭ ନଭେମ୍ବର ୧୨୮୯)** ଅନୁସାରେ ଅମ୍ବାଦେବଙ୍କ ବିରୁଦ୍ଧରେ ଯୁଦ୍ଧରେ ସେ ବୀରଗତି ପ୍ରାପ୍ତ ହୋଇଥିଲେ।',
      bn: 'ভারতীয় ইতিহাসের অন্যতম মহান সার্বভৌম সম্রাজ্ঞী, সম্রাট গণপতি দেবের কন্যা। "রুদ্রদেব মহারাজা" উপাধি ধারণ করে তিনি দেবগিরির যাদব রাজা মহাদেবকে পরাস্ত করেন এবং ওরুগল্লু প্রস্তর দুর্গ সম্পন্ন করেন। **চন্দুপট্লা শিলালিপি (২৭ নভেম্বর ১২৮৯)** অনুসারে অম্বাদেবের বিরুদ্ধে যুদ্ধে নভেম্বর ১২৮৯ খ্রিস্টাব্দে তিনি বীরগতি প্রাপ্ত হন।'
    },
    major_events: {
      en: [
        'Malkapuram Stone Pillar Charter (1261 CE) endowing Visvesvara Sambhu’s Golaki Matha & Maternity Hospital',
        'Decisive victory over Seuna Yadava King Mahadeva & pursuit to Devagiri Citadel (Bidar Inscription)',
        'Completion of Orugallu Stone Ramparts, Marco Polo’s visit to Motupalli, and Heroic Battlefield Death recorded in the Chandupatla Inscription (27 November 1289 CE)'
      ],
      hi: [
        'मल्कापुरम पाषाण स्तंभ अभिलेख (1261 ई.) द्वारा विश्वेश्वर शंभु के गोलकी मठ एवं प्रसूति चिकित्सालय को भूमि दान',
        'देवगिरि के यादव राजा महादेव पर निर्णायक विजय (बीदर शिलालेख)',
        'ओरुगल्लु पाषाण प्राचीर की पूर्णता, मार्को पोलो का आगमन और चंदुपट्ला शिलालेख (27 नवंबर 1289 ई.) में दर्ज वीरगति'
      ],
      te: [
        'మల్కాపురం శిలాశాసనం (1261) ద్వారా విశ్వేశ్వర శంభుని గోళకీ మఠం & ప్రసూతి వైద్యశాలకు భూదానం',
        'దేవగిరి యాదవ రాజు మహాదేవునిపై అఖండ విజయం (బీదర్ కోట శాసనం)',
        'ఓరుగల్లు రాతి కోట పూర్తి, మార్కో పోలో పర్యటన & చందుపట్ల శాసనం (27 నవంబర్ 1289) నమోదు చేసిన వీరమరణం'
      ],
      kn: [
        'ಮಲ್ಕಾಪುರಂ ಶಾಸನದ (1261) ಮೂಲಕ ಗೋಳಕಿ ಮಠ ಮತ್ತು ಹೆರಿಗೆ ಆಸ್ಪತ್ರೆಗೆ ದತ್ತಿ',
        'ದೇವಗಿರಿಯ ಯಾದವ ರಾಜ ಮಹಾದೇವನ ಮೇಲೆ ನಿರ್ಣಾಯಕ ಜಯ',
        'ಓರುಗಲ್ಲು ಕಲ್ಲಿನ ಕೋಟೆ ಪೂರ್ಣ ಹಾಗೂ ಚಂದುಪಟ್ಲ ಶಾಸನದಲ್ಲಿ (27 ನವೆಂಬರ್ 1289) ದಾಖಲಾದ ವೀರಮರಣ'
      ],
      ta: [
        'மல்காபுரம் கல்வெட்டு (1261) மூலம் கோளகி மடம் மற்றும் மகப்பேறு மருத்துவமனைக்குக் கொடை',
        'தேவகிரி யாதவ மன்னன் மகாதேவன் மீது மாபெரும் வெற்றி',
        'ஓருகல்லு கற்கோட்டை நிறைவு மற்றும் சந்துபட்லா கல்வெட்டில் (27 நவம்பர் 1289) பதிவான வீரமரணம்'
      ],
      mr: [
        'मल्कापुरम शिलालेखाद्वारे (१२६१) गोलकी मठ आणि प्रसूती रुग्णालयास दान',
        'देवगिरीच्या यादव राजा महादेवावर निर्णायक विजय',
        'ओरुगल्लु दगडी किल्ला पूर्ण व चंदुपट्ला शिलालेखात (२७ नोव्हेंबर १२८९) नोंदवलेले वीरमरण'
      ],
      or: [
        'ମଲ୍କାପୁରମ ଶିଳାଲେଖ (୧୨୬୧) ଦ୍ୱାରା ଗୋଳକୀ ମଠ ଓ ପ୍ରସୂତି ଚିକିତ୍ସାଳୟକୁ ଦାନ',
        'ଦେବଗିରିର ଯାଦବ ରାଜା ମହାଦେବଙ୍କ ଉପରେ ନିର୍ଣ୍ଣାୟକ ବିଜୟ',
        'ଓରୁଗଲ୍ଲୁ ପ୍ରସ୍ତର ଦୁର୍ଗ ପୂର୍ଣ୍ଣ ଓ ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ (୨୭ ନଭେମ୍ବର ୧୨୮୯) ରେ ଲିପିବଦ୍ଧ ବୀରଗତି'
      ],
      bn: [
        'মল্কাপুরম শিলালিপির (১২৬১) মাধ্যমে গোলকী মঠ ও প্রসূতি হাসপাতালে দান',
        'দেবগিরির যাদব রাজা মহাদেবের ওপর নির্ণায়ক বিজয়',
        'ওরুগল্লু প্রস্তর দুর্গ সমাপ্তি ও চন্দুপট্লা শিলালিপিতে (২৭ নভেম্বর ১২৮৯) নথিবদ্ধ বীরগতি'
      ]
    },
    historical_significance: {
      en: 'Defended Kakatiya imperial integrity for nearly three decades as "Rudradeva Maharaja", fostered Nayaka military recruitment across non-royal warrior communities, and won international acclaim in Marco Polo’s travelogue.',
      hi: '"रुद्रदेव महाराजा" के रूप में तीन दशकों तक काकतीय साम्राज्य की रक्षा की, नायंकर सैन्य व्यवस्था को सुदृढ़ किया और मार्को पोलो के यात्रा-वृत्तांत में वैश्विक प्रशंसा प्राप्त की।',
      te: '"రుద్రదేవ మహారాజు"గా మూడు దశాబ్దాల పాటు కాకతీయ సామ్రాజ్యాన్ని రక్షించి, నాయంకర విధానాన్ని బలోపేతం చేసి, మార్కో పోలో రచనలలో అంతర్జాతీయ ప్రశంసలు అందుకున్న వీర సామ్రాజ్ఞి.',
      kn: '"ರುದ್ರದೇವ ಮಹಾರಾಜ"ಳಾಗಿ ಮೂರು ದಶಕಗಳ ಕಾಲ ಸಾಮ್ರಾಜ್ಯವನ್ನು ರಕ್ಷಿಸಿ ಮಾರ್ಕೊ ಪೋಲೊನಿಂದ ಜಾಗತಿಕ ಮೆಚ್ಚುಗೆ ಪಡೆದಳು.',
      ta: '"உருத்ரதேவ மகாராஜா"வாக முப்பது ஆண்டுகள் பேரரசைக் காத்து மார்க்கோ போலோவால் உலகளவில் போற்றப்பட்டார்.',
      mr: '"रुद्रदेव महाराजा" म्हणून तीन दशके साम्राज्याचे रक्षण केले आणि मार्को पोलोच्या प्रवासवर्णनात जागतिक गौरव मिळवला.',
      or: '"ରୁଦ୍ରଦେବ ମହାରାଜା" ଭାବେ ତିନି ଦଶନ୍ଧି ଧରି ସାମ୍ରାଜ୍ୟ ରକ୍ଷା କରି ମାର୍କୋ ପୋଲୋଙ୍କ ଦ୍ୱାରା ବିଶ୍ୱସ୍ତରରେ ପ୍ରଶଂସିତ ହୋଇଥିଲେ।',
      bn: '"রুদ্রদেব মহারাজা" হিসেবে তিন দশক ধরে সাম্রাজ্য রক্ষা করেন এবং মার্কো পোলোর ভ্রমণবৃত্তান্তে বিশ্বব্যাপী প্রশংসিত হন।'
    },
    associated_places: {
      en: ['Orugallu (Warangal Fort)', 'Malkapuram (Guntur)', 'Chandupatla (Nalgonda)', 'Motupalli', 'Bidar'],
      hi: ['ओरुगल्लु (वारंगल किला)', 'मल्कापुरम (गुंटूर)', 'चंदुपट्ला (नलगोंडा)', 'मोटुपल्ली', 'बीदर'],
      te: ['ఓరుగల్లు (వరంగల్ కోట)', 'మల్కాపురం (గుంటూరు)', 'చందుపట్ల (నల్లగొండ)', 'మోటుపల్లి', 'బీదర్'],
      kn: ['ಓರುಗಲ್ಲು (ವರಂಗಲ್ ಕೋಟೆ)', 'ಮಲ್ಕಾಪುರಂ', 'ಚಂದುಪಟ್ಲ', 'ಮೋಟುಪಲ್ಲಿ', 'ಬೀದರ್'],
      ta: ['ஓருகல்லு (வாரங்கல் கோட்டை)', 'மல்காபுரம்', 'சந்துபட்லா', 'மோட்டுப்பள்ளி', 'பீதர்'],
      mr: ['ओरुगल्लु (वरंगळ किल्ला)', 'मल्कापुरम', 'चंदुपट्ला', 'मोटुपल्ली', 'बीदर'],
      or: ['ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ ଦୁର୍ଗ)', 'ମଲ୍କାପୁରମ', 'ଚନ୍ଦୁପଟ୍ଲା', 'ମୋଟୁପଲ୍ଲୀ', 'ବୀଦର'],
      bn: ['ওরুগল্লু (ওয়ারাঙ্গল দুর্গ)', 'মল্কাপুরম', 'চন্দুপট্লা', 'মোতুপল্লী', 'বিদর']
    },
    evidence_status: 'Documented Primary Evidence',
    image_url: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
    inscriptions_ids: ['insc_malkapuram_1261', 'insc_chandupatla_1289'],
    citations: [
      'Malkapuram Stone Pillar Inscription (Saka 1183 / 1261 CE, Journal of the Andhra Historical Research Society Vol. IV)',
      'Chandupatla Stone Inscription (27 November 1289 CE, Inscriptions of Andhra Pradesh: Nalgonda District)',
      'Marco Polo, The Travels of Marco Polo (Book III, Ch. 19: Concerning the Kingdom of Mutfili)',
      'Talbot, Cynthia, "Rudrama-devi, the Female King: Gender and Political Authority in Medieval India" (1995 / 2001)'
    ]
  },

  // 9. Prataparudra II (KD-0010)
  {
    id: 'fig_kakatiya_prataparudra_ii',
    category: 'gajapathi_monarchs',
    name: {
      en: 'Emperor Prataparudra II (Prataparudradeva)',
      hi: 'सम्राट प्रतापरुद्र द्वितीय (प्रतापरुद्रदेव)',
      te: 'రెండవ ప్రతాపరుద్ర చక్రవర్తి (ప్రతాపరుద్రదేవుడు)',
      kn: 'ಸಾಮ್ರಾಟ ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ (ಪ್ರತಾಪರುದ್ರದೇವ)',
      ta: 'பேரரசர் இரண்டாம் பிரதாபருத்ரர் (பிரதாபருத்ரதேவர்)',
      mr: 'सम्राट प्रतापरुद्र दुसरा (प्रतापरुद्रदेव)',
      or: 'ସମ୍ରାଟ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର (ପ୍ରତାପରୁଦ୍ରଦେବ)',
      bn: 'সম্রাট দ্বিতীয় প্রতাপরুদ্র (প্রতাপরুদ্রদেব)'
    },
    alternate_names: ['Prataparudra II', 'Kumara Rudradeva', 'Vira Rudradeva', 'Kakati Prataparudra'],
    dynasty_name: KAKATIYA_DYNASTY_NAME_ML,
    dynasty_id: 'dyn_kakatiya_orugallu',
    reign_period: {
      en: '1289 – 1323 CE (Co-regent as Kumara Rudradeva from 1280 CE)',
      hi: '1289 – 1323 ई. (1280 ई. से कुमार रुद्रदेव के रूप में युवराज)',
      te: 'క్రీ.శ. 1289 – 1323 (1280 నుండి కుమార రుద్రదేవునిగా యువరాజు)',
      kn: 'ಕ್ರಿ.ಶ. 1289 – 1323 (1280ರಿಂದ ಕುಮಾರ ರುದ್ರದೇವನಾಗಿ ಯುವರಾಜ)',
      ta: 'பொ.ஊ. 1289 – 1323 (1280 முதல் குமார ருத்ரதேவராக இளவரசர்)',
      mr: 'इ.स. १२८९ – १३२३ (१२८० पासून कुमार रुद्रदेव म्हणून युवराज)',
      or: '୧୨୮୯ – ୧୩୨୩ ଖ୍ରୀ.ଅ. (୧୨୮୦ରୁ କୁମାର ରୁଦ୍ରଦେବ ଭାବେ ଯୁବରାଜ)',
      bn: '১২৮৯ – ১৩২৩ খ্রি. (১২৮০ থেকে কুমার রুদ্রদেব হিসেবে যুবরাজ)'
    },
    approx_dates: '1289 – 1323 CE',
    known_titles: {
      en: ['Maharajadhiraja', 'Kakatiyendra', 'Mururayaraganda', 'Patron of Vidyanatha’s Prataparudriya'],
      hi: ['महाराजाधिराज', 'काकतीयेन्द्र', 'मुरुरायरगंड', 'प्रतापरुद्रीय के आश्रयदाता'],
      te: ['మహారాజాధిరాజ', 'కాకతీయేంద్ర', 'మూరురాయరగండ', 'ప్రతాపరుద్రీయ పోషకుడు'],
      kn: ['ಮಹಾರಾಜಾಧಿರಾಜ', 'ಕಾಕತೀಯೇಂದ್ರ', 'ಮೂರುರಾಯರಗಂಡ'],
      ta: ['மகாராஜாதிராஜா', 'காகதீயேந்திரன்', 'மூருராயரகண்டன்'],
      mr: ['महाराजाधिराज', 'काकतीयेन्द्र', 'मुरुरायरगंड'],
      or: ['ମହାରାଜାଧିରାଜ', 'କାକତୀୟେନ୍ଦ୍ର', 'ମୁରୁରାୟରଗଣ୍ଡ'],
      bn: ['মহারাজাধিরাজ', 'কাকতীয়েম্দ্র', 'মুরুরায়রগন্ড']
    },
    biography: {
      en: 'Son of Rudrama Devi’s eldest daughter Mummadamma and Mahadeva, adopted by Queen Rudrama Devi as her successor. Immediately upon ascending the throne in late 1289 CE, Prataparudra II launched a three-pronged offensive that crushed the rebel Kayastha chief Ambadeva at Tripurantakam, drove the Yadavas back across the Godavari, and campaigned down to Kanchipuram and Nellore. He systematically reorganized the Kakatiya military-fiscal state by assigning one-fourth of the kingdom’s territories to 77 loyal Nayakas (the Nayankara System). Between 1303 and 1323 CE, Prataparudra II heroically defended Orugallu against five major invasions of the Delhi Sultanate—routing the first Khalji invasion at Upparapalli in 1303 CE, surviving the sieges of Malik Kafur (1309–1310) and Khusrau Khan (1318), repulsing Ulugh Khan in 1321–1322, and finally succumbing after a five-month siege in 1323 CE. While being escorted as a prisoner toward Delhi, Prataparudra II ended his life on the banks of the Narmada River (Somodbhava), as attested in the Vilasa Grant of Musunuri Prolaya Nayaka (c. 1330 CE).',
      hi: 'रानी रुद्रमा देवी की ज्येष्ठ पुत्री मुम्मदम्मा और महादेव के पुत्र, जिन्हें रुद्रमा देवी ने दत्तक पुत्र और उत्तराधिकारी बनाया। 1289 ई. के अंत में सिंहासनारूढ़ होते ही उन्होंने विद्रोही अंबादेव को परास्त किया और कांचीपुरम तक अभियान चलाया। उन्होंने साम्राज्य को 77 नायकों (नायंकर प्रणाली) के अधीन पुनर्गठित किया। 1303 ई. में उप्परपल्ली के युद्ध में खिलजी सेना को हराने के बाद उन्होंने 1323 ई. तक दिल्ली सल्तनत के आक्रमणों का डटकर मुकाबला किया। 1323 ई. में ओरुगल्लु के पतन के बाद दिल्ली ले जाए जाते समय उन्होंने नर्मदा नदी के तट पर अपने प्राण त्याग दिए (विलास ताम्रपत्र, 1330 ई.)।',
      te: 'రాణి రుద్రమదేవి పెద్ద కుమార్తె ముమ్మడమ్మ మరియు మహాదేవుల కుమారుడు. రుద్రమదేవి దత్తపుత్రునిగా క్రీ.శ. 1289 చివరలో సింహాసనాన్ని అధిష్టించి, కాయস্থ అంబదేవుని త్రిపురాంతకంలో ఓడించి, నెల్లూరు మరియు కాంచీపురం వరకు జైత్రయాత్ర నిర్వహించాడు. సామ్రాజ్య రక్షణ కోసం **77 నాయంకరాలను** ఏర్పరిచి సైనిక వ్యవస్థను పటిష్ఠం చేశాడు. క్రీ.శ. 1303 ఉప్పరపల్లి యుద్ధంలో ఢిల్లీ సుల్తాన్ సైన్యాన్ని చిత్తుగా ఓడించాడు. 1309 మాలిక్ కాఫర్, 1318 ఖుస్రూ ఖాన్ దండయాత్రలను ఎదుర్కొని, 1321లో ఉలుఘ్ ఖాన్‌ను తిప్పికొట్టి, చివరకు **క్రీ.శ. 1323** లో ఐదు నెలల ముట్టడి అనంతరం ఓరుగల్లు పతనమైనప్పుడు బందీగా ఢిల్లీకి తరలించబడుతూ మార్గమధ్యంలో **నర్మదా నదీ (సోమోద్భవ) తీరంలో** ఆత్మార్పణం చేసుకున్నాడు (ముసునూరి ప్రోలయ నాయకుని విలాస తామ్రశాసనం, 1330).',
      kn: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ಮೊಮ್ಮಗ ಮತ್ತು ದತ್ತపుತ್ರ. 1289ರಲ್ಲಿ ಸಿಂಹಾಸನವೇರಿ ಅಂಬದೇವನನ್ನು ಸೋಲಿಸಿ, ಸಾಮ್ರಾಜ್ಯವನ್ನು **77 ನಾಯಕರ** ಅಡಿಯಲ್ಲಿ ಸಂಘಟಿಸಿದನು. 1303ರ ಉಪ್ಪರಪಲ್ಲಿ ಕದನದಲ್ಲಿ ದೆಹಲಿ ಸುಲ್ತಾನರ ಸೈನ್ಯವನ್ನು ಸೋಲಿಸಿ, 1323ರವರೆಗೆ ಓರುಗಲ್ಲನ್ನು ರಕ್ಷಿಸಿದನು. 1323ರಲ್ಲಿ ಸೆರೆಸಿಕ್ಕಿ ದೆಹಲಿಗೆ ಕರೆದೊಯ್ಯುವಾಗ ನರ್ಮದಾ ನದಿ ತೀರದಲ್ಲಿ ಪ್ರಾಣತ್ಯಾಗ ಮಾಡಿದನು (ವಿಲಾಸ ತಾಮ್ರಶಾಸನ, 1330).',
      ta: 'ராணி ருத்ரமா தேவியின் பேரனும் சுவீகாரப் புதல்வருமாவார். 1289இல் அரியணை ஏறி அம்பதேவனை வென்று, பேரரசை **77 நாயக்கர்களின்** கீழ் சீரமைத்தார். 1303 உப்பரப்பள்ளி போரில் டெல்லி சுல்தானகப் படையை முறியடித்து 1323 வரை ஓருகல்லுவைக் காத்தார். 1323இல் ஓருகல்லு வீழ்ந்த பின் டெல்லிக்குக் கொண்டு செல்லப்படுகையில் நர்மதை ஆற்றங்கரையில் உயிர் நீத்தார் (விலாச செப்பேடு, 1330).',
      mr: 'राणी रुद्रमा देवीचा नातू व दत्तक पुत्र. १२८९ मध्ये गादीवर बसताच त्याने अंबादेवाचा पराभव केला आणि साम्राज्याची **७७ नायकांमध्ये** पुनर्रचना केली. १३०३ च्या उप्परपल्ली युद्धात दिल्ली सल्तनतीचा पराभव करून १३२३ पर्यंत ओरुगल्लुचे रक्षण केले. १३२३ मध्ये बंदी म्हणून दिल्लीला नेले जात असताना नर्मदा नदीकाठी त्याने प्राणत्याग केला (विलास ताम्रपट, १३३०).',
      or: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ନାତି ଓ ପୋଷ୍ୟ ପୁତ୍ର। ୧୨୮୯ରେ ସିଂହାସନ ଆରୋହଣ କରି ଅମ୍ବାଦେବଙ୍କୁ ପରାସ୍ତ କରିଥିଲେ ଓ ସାମ୍ରାଜ୍ୟକୁ **୭୭ ଜଣ ନାୟକ**ଙ୍କ ଅଧୀନରେ ସଂଗଠିତ କରିଥିଲେ। ୧୩୦୩ ଉପ୍ପରପଲ୍ଲୀ ଯୁଦ୍ଧରେ ଦିଲ୍ଲୀ ସୁଲତାନୀ ସେନାକୁ ହରାଇ ୧୩୨୩ ପର୍ଯ୍ୟନ୍ତ ଓରୁଗଲ୍ଲୁ ରକ୍ଷା କରିଥିଲେ ଓ ୧୩୨୩ରେ ନର୍ମଦା ନଦୀ ତীরে ପ୍ରାଣତ୍ୟାଗ କରିଥିଲେ (ବିଳାସ ତାମ୍ରପତ୍ର, ୧୩୩୦)।',
      bn: 'রানি রুদ্রমা দেবীর দৌহিত্র ও দত্তক পুত্র। ১২৮৯ খ্রিস্টাব্দে সিংহাসনে আরোহণ করে অম্বাদেবকে পরাস্ত করেন এবং সাম্রাজ্যকে **৭৭ জন নায়কের** অধীনে পুনর্গঠিত করেন। ১৩০৩-এর উপ্পরপল্লী যুদ্ধে দিল্লি সুলতানি বাহিনীকে পরাস্ত করে ১৩২৩ পর্যন্ত ওরুগল্লু রক্ষা করেন এবং ১৩২৩ খ্রিস্টাব্দে নর্মদা নদীর তীরে প্রাণত্যাগ করেন (বিলাস তাম্রশাসন, ১৩৩০)।'
    },
    major_events: {
      en: [
        'Defeat of rebel Kayastha Ambadeva (1290–1291 CE) & Reorganization of the 77 Nayankara Military Estates',
        'Decisive Victory over Delhi Sultanate Forces at the Battle of Upparapalli (1303 CE) & Patronage of Vidyanatha’s Prataparudriya',
        'Defense of Orugallu during the Delhi Sultanate Sieges (1309–1310, 1318, 1321–1323 CE) & Martyrdom on the Narmada River (1323 CE)'
      ],
      hi: [
        'विद्रोही अंबादेव पर विजय (1290–1291 ई.) एवं 77 नायंकर सैन्य इकाइयों का पुनर्गठन',
        'उप्परपल्ली के युद्ध (1303 ई.) में दिल्ली सल्तनत की सेना पर निर्णायक विजय एवं विद्यानाथ रचित प्रतापरुद्रीय का संरक्षण',
        'ओरुगल्लु की रक्षा (1309–1310, 1318, 1321–1323 ई.) एवं नर्मदा नदी के तट पर आत्मोत्सर्ग (1323 ई.)'
      ],
      te: [
        'కాయস্থ అంబదేవుని సంహారం (1290–1291) & 77 నాయంకర సైనిక మండలాల పునర్వ్యవస్థీకరణ',
        'ఉప్పరపల్లి యుద్ధంలో (1303) ఢిల్లీ సుల్తాన్ సైన్యంపై ఘనవిజయం & విద్యానాథుని ప్రతాపరుద్రీయ పోషణ',
        'ఓరుగల్లు కోట రక్షణ పోరాటాలు (1309–1310, 1318, 1321–1323) & నర్మదా నదీ తీరాన ఆత్మార్పణం (1323)'
      ],
      kn: [
        'ಅಂಬದೇವನ ದಮನ (1290–1291) ಮತ್ತು 77 ನಾಯಂಕರ ಸೈನಿಕ ವ್ಯವಸ್ಥೆಯ ಪುನರ್‌ರಚನೆ',
        'ಉಪ್ಪರಪಲ್ಲಿ ಕದನದಲ್ಲಿ (1303) ದೆಹಲಿ ಸುಲ್ತಾನರ ಸೈನ್ಯದ ಮೇಲೆ ಜಯ ಮತ್ತು ಪ್ರತಾಪರುದ್ರೀಯ ಗ್ರಂಥಕ್ಕೆ ಆಶ್ರಯ',
        'ಓರುಗಲ್ಲು ರಕ್ಷಣಾ ಹೋರಾಟಗಳು (1309–1323) ಮತ್ತು ನರ್ಮದಾ ನದಿ ತೀರದಲ್ಲಿ ಆತ್ಮಾರ್ಪಣೆ (1323)'
      ],
      ta: [
        'அம்பதேவன் ஒடுக்கப்படல் (1290–1291) & 77 நாயங்கர இராணுவ மண்டலங்கள் சீரமைப்பு',
        'உப்பரப்பள்ளி போரில் (1303) டெல்லி சுல்தானகப் படை மீது வெற்றி & வித்யாநாதரின் பிரதாபருத்ரீய ஆதரவு',
        'ஓருகல்லு கோட்டைப் பாதுகாப்புப் போர்கள் (1309–1323) & நர்மதை ஆற்றங்கரையில் தியாகம் (1323)'
      ],
      mr: [
        'अंबादेवाचा पाडाव (१२९०–१२९१) आणि ७७ नायंकर लष्करी विभागांची पुनर्रचना',
        'उप्परपल्ली युद्धात (१३०३) दिल्ली सल्तनतीवर विजय व विद्यानाथाच्या प्रतापरुद्रीय ग्रंथास आश्रय',
        'ओरुगल्लु किल्ल्याचा लढा (१३०९–१३२३) आणि नर्मदा नदीकाठी आत्मार्पण (१३२३)'
      ],
      or: [
        'ଅମ୍ବାଦେବଙ୍କ ଦମନ (୧୨୯୦–୧୨୯୧) ଓ ୭୭ ନାୟଙ୍କର ସାମରିକ ମଣ୍ଡଳର ପୁନର୍ଗଠନ',
        'ଉପ୍ପରପଲ୍ଲୀ ଯୁଦ୍ଧରେ (୧୩୦୩) ଦିଲ୍ଲୀ ସୁଲତାନୀ ସେନା ଉପରେ ବିଜୟ ଓ ବିଦ୍ୟାନାଥଙ୍କ ପ୍ରତାପରୁଦ୍ରୀୟକୁ ଆଶ୍ରୟ',
        'ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ ରକ୍ଷା ସଂଗ୍ରାମ (୧୩୦୯–୧୩୨୩) ଓ ନର୍ମଦା ନଦୀ ତীরে ଆତ୍ମোତ୍ସର୍ଗ (୧୩୨୩)'
      ],
      bn: [
        'অম্বাদেবের দমন (১২৯০–১২৯১) ও ৭৭ নায়ঙ্কর সামরিক মণ্ডলের পুনর্গঠন',
        'উপ্পরপল্লী যুদ্ধে (১৩০৩) দিল্লি সুলতানি বাহিনীর ওপর বিজয় ও বিদ্যানাথের প্রতাপরুদ্রীয় গ্রন্থের পৃষ্ঠপোষকতা',
        'ওরুগল্লু দুর্গ রক্ষা সংগ্রাম (১৩০৯–১৩২৩) ও নর্মদা নদীর তীরে আত্মোৎসর্গ (১৩২৩)'
      ]
    },
    historical_significance: {
      en: 'Last sovereign emperor of the Kakatiya Dynasty whose 77-Nayaka administrative system directly inspired the Musunuri liberation movement, the Reddi and Padmanayaka kingdoms, and the Vijayanagara and Gajapathi empires.',
      hi: 'काकतीय राजवंश के अंतिम सार्वभौम सम्राट जिनकी 77-नायक प्रशासनिक प्रणाली ने मुसुनुरी मुक्ति संग्राम, रेड्डी एवं पद्मनायक राज्यों तथा विजयनगर और गजपति साम्राज्यों को प्रेरित किया।',
      te: 'కాకతీయ వంశపు చివరి సార్వభౌమ చక్రవర్తి. ఈయన తీర్చిదిద్దిన 77 నాయంకర వ్యవస్థే తదనంతర ముసునూరి నాయకుల విముక్తి పోరాటానికి, రెడ్డి-పద్మనాయక రాజ్యాలకు, విజయనగర మరియు గజపతి సామ్రాజ్యాలకు పునాదిగా నిలిచింది.',
      kn: 'ಕಾಕತೀಯ ವಂಶದ ಕೊನೆಯ ಸಾರ್ವಭೌಮ ಸಾಮ್ರಾಟ; ಇವನ 77 ನಾಯಕರ ವ್ಯವಸ್ಥೆಯು ಮುసుನೂರಿ ವಿಮೋಚನಾ ಹೋರಾಟ ಮತ್ತು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ಪ್ರೇರಣೆಯಾಯಿತು.',
      ta: 'காகதீய வம்சத்தின் கடைசிப் பேரரசர்; இவரது 77 நாயக்கர் முறையே முசுனூரி விடுதலைப் போராட்டத்திற்கும் விஜயநகரப் பேரரசிற்கும் அடித்தளமாக அமைந்தது.',
      mr: 'काकतीय राजवंशाचा शेवटचा सार्वभौम सम्राट; त्याच्या ७७ नायकांच्या पद्धतीने मुसुनुरी स्वातंत्र्यलढा आणि विजयनगर साम्राज्याला प्रेरणा दिली.',
      or: 'କାକତୀୟ ବଂଶର ଶେଷ ସାର୍ବଭୌମ ସମ୍ରାଟ; ତାଙ୍କର ୭୭ ନାୟକ ବ୍ୟବସ୍ଥା ମୁସୁନୁରୀ ମୁକ୍ତି ସଂଗ୍ରାମ ଓ ବିଜୟନଗର-ଗଜପତି ସାମ୍ରାଜ୍ୟକୁ ପ୍ରେରଣା ଦେଇଥିଲା।',
      bn: 'কাকতীয় রাজবংশের শেষ সার্বভৌম সম্রাট; তাঁর ৭৭ নায়ক ব্যবস্থা মুসুনুরি মুক্তি সংগ্রাম এবং বিজয়নগর-গজপতি সাম্রাজ্যকে অনুপ্রাণিত করেছিল।'
    },
    associated_places: {
      en: ['Orugallu (Warangal Fort)', 'Upparapalli (Karimnagar)', 'Tripurantakam', 'Srisailam', 'Kanchipuram', 'Narmada River'],
      hi: ['ओरुगल्लु (वारंगल किला)', 'उप्परपल्ली (करीमनगर)', 'त्रिपुरांतकम', 'श्रीशैलम', 'कांचीपुरम', 'नर्मदा नदी'],
      te: ['ఓరుగల్లు (వరంగల్ కోట)', 'ఉప్పరపల్లి (కరీంనగర్)', 'త్రిపురాంతకం', 'శ్రీశైలం', 'కాంచీపురం', 'నర్మదా నది'],
      kn: ['ಓರುಗಲ್ಲು (ವರಂಗಲ್ ಕೋಟೆ)', 'ಉಪ್ಪರಪಲ್ಲಿ', 'ತ್ರಿಪುರಾಂತಕಂ', 'ಶ್ರೀಶೈಲಂ', 'ಕಾಂಚೀಪುರಂ', 'ನರ್ಮದಾ ನದಿ'],
      ta: ['ஓருகல்லு (வாரங்கல் கோட்டை)', 'உப்பரப்பள்ளி', 'திரிபுராந்தகம்', 'ஸ்ரீசைலம்', 'காஞ்சிபுரம்', 'நர்மதை ஆறு'],
      mr: ['ओरुगल्लु (वरंगळ किल्ला)', 'उप्परपल्ली', 'त्रिपुरांतकम', 'श्रीशैलम', 'कांचीपुरम', 'नर्मदा नदी'],
      or: ['ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ ଦୁର୍ଗ)', 'ଉପ୍ପରପଲ୍ଲୀ', 'ତ୍ରିପୁରାନ୍ତକମ', 'ଶ୍ରୀଶୈଳମ', 'କାଞ୍ଚିପୁରମ', 'ନର୍ମଦା ନଦୀ'],
      bn: ['ওরুগল্লু (ওয়ারাঙ্গল দুর্গ)', 'উপ্পরপল্লী', 'ত্রিপুরান্তকম', 'শ্রীশৈলম', 'কাঞ্চীপুরম', 'নর্মদা নদী']
    },
    evidence_status: 'Documented Primary Evidence',
    image_url: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
    inscriptions_ids: ['insc_chandupatla_1289'],
    citations: [
      'Vilasa Copper-Plate Grant of Musunuri Prolaya Nayaka (c. 1330 CE, Epigraphia Indica Vol. XXXII, pp. 239–268)',
      'Srisailam Inscription of Prataparudra II (1313 CE)',
      'Vidyanatha, Prataparudriya (Prataparudra Yasobhushana)',
      'Eaton, Richard M., A Social History of the Deccan, 1300–1761: Eight Indian Lives (Ch. 1: Prataparudra, 1289–1323), Cambridge University Press, 2005'
    ]
  }
];

/**
 * ============================================================================
 * PHASE 4 – KAKATIYA MONUMENTS, LOCATIONS, INSCRIPTIONS, GALLERY & GENEALOGY
 * (KD-0011 .. KD-0025)
 * ============================================================================
 */
export const KAKATIYA_MONUMENTS: TempleMonument[] = [
  // KD-0011
  {
    id: 'mon_warangal_fort',
    name: 'Orugallu (Warangal) Fort & Monolithic Svayambhudeva Kirti Toranas',
    location: 'Warangal (Orugallu / Ekashilanagara), Warangal District',
    state: 'Telangana',
    patron_ruler: 'Rudradeva, Ganapati Deva, Rani Rudrama Devi & Prataparudra II',
    century: '12th–14th Century CE (1163–1323 CE)',
    architectural_style: 'Kakatiya Concentric Cyclopean Granite Fortification & Monolithic Torana Architecture',
    historical_significance:
      'Imperial capital fortress of the Kakatiya Empire constructed with three concentric circular ramparts (outer earthen wall, middle dry-ashlar granite wall with 45 bastions and deep moat, and inner royal citadel) surrounding the grand Svayambhudeva Shiva Temple precinct and its four iconic monolithic stone gateways (Kirti Toranas), now the official state emblem of Telangana.',
    image_url: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
    sources: [
      'Archaeological Survey of India (ASI) Warangal Fort Excavations Reports',
      'Yazdani, Ghulam, The Early History of the Deccan (1960)',
      'Michell, George, Architecture and Art of Southern India (Cambridge University Press)'
    ]
  },
  // KD-0012
  {
    id: 'mon_thousand_pillar_temple',
    name: 'Thousand Pillar Temple (Sri Rudreswara Swamy Trikutalayam, Hanamkonda)',
    location: 'Hanamkonda (Anumakonda), Warangal Urban District',
    state: 'Telangana',
    patron_ruler: 'King Rudradeva (Prataparudra I)',
    century: '12th Century CE (Consecrated 1163 CE / Saka 1084)',
    architectural_style: 'Kakatiya Trikutachala (Triple-Shrine) Stellate Dolerite Architecture',
    historical_significance:
      'Consecrated in 1163 CE by Rudradeva to commemorate sovereign Kakatiya independence. Built on a star-shaped (stellate) plinth with sandbox foundation technology, housing three sanctums dedicated to Rudreswara (Shiva), Vasudeva (Vishnu), and Suryadeva (Sun God), an exquisite monolithic black basalt Nandi, and a 300-pillar Kalyana Mandapa.',
    image_url: ARCHIVE_IMG('draksharama_temple.jpg'),
    sources: [
      'Anumakonda Thousand Pillar Temple Inscription (1163 CE, Epigraphia Indica Vol. IX)',
      'UNESCO World Heritage Tentative List Dossier (Kakatiya Temples & Gateways)',
      'Sastry, P.V. Parabrahma, The Kakatiyas of Warangal (1978)'
    ]
  },
  // KD-0013
  {
    id: 'mon_ramappa_temple',
    name: 'Kakatiya Rudreswara (Ramappa) Temple, Palampet (UNESCO World Heritage Site)',
    location: 'Palampet, Venkatapur Mandal, Mulugu District',
    state: 'Telangana',
    patron_ruler: 'General Recharla Rudra under Emperor Ganapati Deva (Sculptor: Ramappa)',
    century: '13th Century CE (Consecrated 1213 CE / Saka 1135)',
    architectural_style: 'Kakatiya Stellate Sandstone Temple with Floating-Brick Vimana & Dolerite Bracket Sculptures',
    historical_significance:
      'Inscribed as a UNESCO World Heritage Site in 2021. Commissioned in 1213 CE by Recharla Rudra alongside the Ramappa Cheruvu reservoir, this temple is celebrated for its earthquake-resistant sandbox foundation, lightweight porous floating bricks (density ~0.85 g/cm³) in the pyramidal Vimana, and mirror-polished black dolerite Madanika/Nagini dance brackets illustrating Jayapa Senani’s Nrittaratnavali.',
    image_url: ARCHIVE_IMG('draksharama_temple.jpg'),
    sources: [
      'UNESCO World Heritage Committee Decision 44 COM 8B.13 (2021): Kakatiya Rudreshwara (Ramappa) Temple, Telangana',
      'Palampet Stone Pillar Inscription of Recharla Rudra (Saka 1135 / 1213 CE)',
      'Archaeological Survey of India (ASI) Hyderabad Circle Conservation Dossier'
    ]
  },
  // KD-0014
  {
    id: 'mon_ghanpur_temples',
    name: 'Kota Gullu (Ghanpur Group of Kakatiya Temples & Reservoir Complex)',
    location: 'Ghanpur (Mulugu Ghanpur), Mulugu District',
    state: 'Telangana',
    patron_ruler: 'Emperor Ganapati Deva & Kakatiya Feudatories',
    century: 'Early 13th Century CE',
    architectural_style: 'Kakatiya Fortified Panchayatana & Sabhamandapa Temple Complex',
    historical_significance:
      'Known locally as Kota Gullu ("Fort Temples"), this walled sacred precinct comprises 22 subsidiary shrines surrounding the main Ganapesvara (Reddi Gudi) Shiva temple, featuring a double-porched Sabha Mandapa adorned with mythical Gaja-Kesari (elephant-lion) and human-torso bracket sculptures adjacent to the historic Ghanpur irrigation tank.',
    image_url: ARCHIVE_IMG('oad_hydraulic_stepwell.jpg'),
    sources: [
      'Ghanpur Stone Inscriptions (Inscriptions of Andhra Pradesh: Warangal District)',
      'Archaeological Survey of India (ASI) Protected Monuments of Telangana'
    ]
  }
];

export const KAKATIYA_LOCATIONS: HistoricalLocation[] = [
  // KD-0015
  {
    id: 'loc_orugallu_warangal',
    name: 'Orugallu Imperial Citadel (Warangal Fort)',
    ancient_name: 'Orugallu / Ekashilanagara',
    region: 'Deccan & South',
    modern_district: 'Warangal',
    modern_state: 'Telangana',
    summary:
      'The sovereign capital of the Kakatiya Empire from the late 12th century to 1323 CE, engineered with three concentric circular defense walls (outer earthen Matti Kota, middle cyclopean granite bastion wall with 45 towers, and inner royal citadel) and two wet moats.',
    archaeological_findings:
      'ASI excavations exposed the foundation of the monumental Svayambhudeva Temple, four standing monolithic Kirti Toranas, Ekashila hillock fortifications, Kush Mahal, stepwells, and hundreds of sculpted dolerite friezes.',
    inscriptions_found: [
      'Warangal Fort Svayambhudeva Pillar Epigraphs',
      'Gajapathi Prince Raghudeva Narendra Mahapatra Warangal Liberation Inscription (1460 CE)'
    ],
    image_url: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg')
  },
  // KD-0016
  {
    id: 'loc_anumakonda_hanamkonda',
    name: 'Anumakonda Early Kakatiya Capital & Hill Fortress',
    ancient_name: 'Anumakonda / Hanumakonda Vishaya',
    region: 'Deccan & South',
    modern_district: 'Hanamkonda (Warangal Urban)',
    modern_state: 'Telangana',
    summary:
      'The foundational political capital of the early Kakatiya rulers from Beta I and Prola I through Rudradeva (c. 1000–1195 CE). Granted as a permanent fief by Chalukya Someshvara I and immortalized by the 1163 CE Thousand Pillar Temple and Padmakshi Hill shrines.',
    archaeological_findings:
      'Granite hill-fort ramparts, the 1163 CE Thousand Pillar Temple (Sri Rudreswara Swamy Trikutalayam), Padmakshi cave temple with Jain and Shaiva rock reliefs, and early Kalamukha matha remains.',
    inscriptions_found: [
      'Anumakonda Thousand Pillar Temple Inscription of Rudradeva (Saka 1084 / 1163 CE)',
      'Kazipet Darga Inscription of Beta II (1090 CE)',
      'Padmakshi Temple Inscription of Mailama (1117 CE)'
    ],
    image_url: ARCHIVE_IMG('odra_fort_inscription.jpg')
  },
  // KD-0017
  {
    id: 'loc_palampet_ramappa',
    name: 'Palampet & Ramappa Cheruvu Hydraulic-Temple Complex',
    ancient_name: 'Palampeta / Rudrasamudram',
    region: 'Deccan & South',
    modern_district: 'Mulugu',
    modern_state: 'Telangana',
    summary:
      'Integrated Kakatiya sacred and agro-hydraulic landscape constructed in 1213 CE by General Recharla Rudra under Emperor Ganapati Deva, combining the Ramappa Cheruvu reservoir ringed by hills with the UNESCO World Heritage Rudreswara (Ramappa) Temple.',
    archaeological_findings:
      'Stellate sandstone temple on a sandbox foundation, floating-brick Vimana, Kameswara and Kateswara subsidiary shrines, and 13th-century stone sluice gates and earthen bunds of Ramappa Lake.',
    inscriptions_found: [
      'Palampet Four-Faced Basalt Pillar Inscription of Recharla Rudra (Saka 1135 / 1213 CE)'
    ],
    image_url: ARCHIVE_IMG('oad_hydraulic_stepwell.jpg')
  },
  // KD-0018
  {
    id: 'loc_motupalli_port',
    name: 'Motupalli International Maritime Port (Desyuyakkondapattana)',
    ancient_name: 'Motupalli / Vela-nagara / Mutfili',
    region: 'Deccan & South',
    modern_district: 'Bapatla / Prakasam Coast',
    modern_state: 'Andhra Pradesh',
    summary:
      'Premier Bay of Bengal maritime emporium of the Kakatiya Empire where Emperor Ganapati Deva erected the Motupalli Abhaya Shasana (1244 CE) guaranteeing security and fair customs to international merchants, and where Marco Polo landed around 1289–1292 CE.',
    archaeological_findings:
      'Virabhadraswamy and Kodandaramaswamy temple precincts, inscribed stone Charter pillars, medieval Chinese celadon ware shards, Roman/Arab trade ceramics, and coastal anchorage remains.',
    inscriptions_found: [
      'Motupalli Abhaya Shasana Pillar Inscription of Ganapati Deva (Saka 1166 / 1244 CE)',
      'Reddi Kingdom renewal charter of Anapota Reddi (1358 CE)'
    ],
    image_url: ARCHIVE_IMG('copper_plate_charter.jpg')
  }
];

export const KAKATIYA_INSCRIPTIONS: InscriptionRecord[] = [
  // KD-0019
  {
    id: 'insc_anumakonda_1163',
    name: 'Anumakonda Thousand Pillar Temple Inscription of Rudradeva',
    location_found: 'Sri Rudreswara Swamy (Thousand Pillar) Temple, Hanamkonda, Telangana',
    dynasty: 'Kakatiya Dynasty',
    ruler: 'Rudradeva (Prataparudra I)',
    script: 'Telugu-Kannada script',
    language: 'Sanskrit verse (composed by Achintendra)',
    era_or_date: 'Saka 1084, Chitrabhanu, Magha Sukla Trayodasi (20 January 1163 CE)',
    historical_context:
      'Engraved on four faces of a polished black basalt pillar in the Thousand Pillar Temple at Hanamkonda. It records the genealogy and military achievements of Prola II and Rudradeva, proclaiming the complete sovereign independence of the Kakatiya kingdom from the Western Chalukyas and commemorating the consecration of the Trikuta shrines of Rudreswara, Vasudeva, and Suryadeva.',
    transcription_excerpt:
      '"...Svasti Sri Saka-varshambulu 1084 agu Chitrabhanu samvatsara Magha su. 13 Vaddavarana... Sri Mahamandalesvara Kakatiyya Rudradeva Raju..."',
    english_translation:
      'Hail! In the Saka year 1084 (20 January 1163 CE), the illustrious sovereign Kakatiya Rudradeva, having vanquished Dommaraja, Medaraja, Mailigideva, and Chododaya, established his supreme independent rule and consecrated the triple shrine of Rudreswara, Vasudeva, and Surya at Anumakonda.',
    scholarly_references: [
      'Fleet, J.F. (Ed.), "Anumakonda Inscription of Rudradeva", Epigraphia Indica, Vol. IX (1907–08), pp. 256–267.',
      'Sastry, P.V. Parabrahma, Inscriptions of Andhra Pradesh: Warangal District (1974), No. 36.'
    ],
    verification_status: 'Reviewed'
  },
  // KD-0020
  {
    id: 'insc_motupalli_1244',
    name: 'Motupalli Abhaya Shasana (Charter of Security) of Emperor Ganapati Deva',
    location_found: 'Virabhadraswamy Temple Mandapa Pillar, Motupalli Port, Prakasam/Bapatla District, Andhra Pradesh',
    dynasty: 'Kakatiya Dynasty',
    ruler: 'Emperor Ganapati Deva',
    script: 'Telugu script',
    language: 'Sanskrit & Telugu',
    era_or_date: 'Saka 1166, Krodhi (1244 CE)',
    historical_context:
      'One of medieval Asia’s most famous maritime trade charters. Issued by Emperor Ganapati Deva via his customs superintendent Siddhayadeva at the seaport of Motupalli (Desyuyakkondapattana), it abolished the predatory practice of seizing cargo from shipwrecked vessels, guaranteed absolute safety of life and merchandise to foreign and coastal sea-merchants, and published a transparent tariff schedule on gold, pearls, silk, camphor, sandalwood, and horses.',
    transcription_excerpt:
      '"...Svasti Sri Ganapatideva Maharajah... samudra-yatra-vyavaharinam abhaya-sasanam... prana-ebhyo priyam-asti naiva dhanam-iti..."',
    english_translation:
      'Seeing that to merchants who brave the perils of the sea, wealth is dearer even than life, His Majesty Maharaja Ganapati Deva grants this Charter of Security (Abhaya Shasana) at Motupalli: heretofore cargo washed ashore by storms was seized by kings, but out of compassion we hereby remit all unjust confiscation and fix only the lawful duty.',
    scholarly_references: [
      'Hultzsch, E. (Ed.), "Motupalli Pillar Inscription of Ganapatideva (A.D. 1244–45)", Epigraphia Indica, Vol. XII (1913–14), pp. 188–197.',
      'Talbot, Cynthia, Precolonial India in Practice (2001), Oxford University Press, pp. 75–77.'
    ],
    verification_status: 'Reviewed'
  },
  // KD-0021
  {
    id: 'insc_malkapuram_1261',
    name: 'Malkapuram Stone Pillar Inscription of Queen Rudrama Devi & Visvesvara Sambhu',
    location_found: 'Rudreswara Temple Precinct, Malkapuram Village (near Mandadam, Amaravati/Guntur District, Andhra Pradesh)',
    dynasty: 'Kakatiya Dynasty',
    ruler: 'Ganapati Deva & Queen Rudrama Devi (with Rajaguru Visvesvara Sambhu)',
    script: 'Telugu script',
    language: 'Sanskrit & Telugu',
    era_or_date: 'Saka 1183, Durmati, Chaitra Bahula Ashtami (25 March 1261 CE)',
    historical_context:
      'Engraved on a huge Nandi-crowned granite pillar (14 feet high), this inscription records Queen Rudrama Devi’s fulfillment of Ganapati Deva’s vow granting the villages of Mandadam and Velagapudi on the southern bank of the Krishna River to the Shaiva Rajaguru Visvesvara Sambhu of the Golaki Matha. It documents the creation of the Visvesvara Golaki agrahara, a Vedic and medical college, a maternity hospital (Prasuti-sala), a general hospital (Arogya-sala), a free feeding house (Satra), and artisan guilds.',
    transcription_excerpt:
      '"...Sri Ganapatideva-maharajena datta Mandara-gramam... Rudrama-devi Rudradeva-maharajah Visvesvara-siva-desikaya pradat..."',
    english_translation:
      'The village of Mandara (Mandadam) together with Velangapundi, promised by Maharaja Ganapati Deva and formally granted with libations of water by Queen Rudrama Devi (bearing the title Rudradeva Maharaja) to the royal preceptor Visvesvara Sambhu, establishes the Visvesvara Golaki monastery, Vedic college, maternity hospital, and charitable feeding house open to all.',
    scholarly_references: [
      'Ramayya Pantulu, J. (Ed.), "Malkapuram Stone Pillar Inscription of Rudradeva (Rudrama Devi), Saka 1183", Journal of the Andhra Historical Research Society, Vol. IV (1929–30), pp. 147–162.',
      'Sircar, D.C., Select Inscriptions Bearing on Indian History and Civilization, Vol. II.'
    ],
    verification_status: 'Reviewed'
  },
  // KD-0022
  {
    id: 'insc_chandupatla_1289',
    name: 'Chandupatla Stone Inscription Recording the Battlefield Martyrdom of Queen Rudrama Devi',
    location_found: 'Chandupatla Village, Nakrekal Mandal, Nalgonda District, Telangana',
    dynasty: 'Kakatiya Dynasty',
    ruler: 'Transition of Queen Rudrama Devi to Prataparudra II',
    script: 'Telugu script',
    language: 'Telugu',
    era_or_date: 'Saka 1211, Virodhi, Margasira Suddha Dvadasi (27 November 1289 CE)',
    historical_context:
      'A landmark discovery in South Indian epigraphy that resolved the exact date and manner of Queen Rudrama Devi’s death. Engraved by a warrior-subordinate named Puvvula Mummadi, it records a gift of wet land to the god Somalingadeva of Chandupatla for the spiritual merit (Sivaloka-prapti) of Kakatiya Rudradeva Maharaja (Queen Rudrama Devi) and her commander Mallikarjuna Nayaka, proving that the 80-year-old warrior queen died on the battlefield in November 1289 CE during the military campaign against the rebel Kayastha chief Ambadeva.',
    transcription_excerpt:
      '"...Svasti Sri Sakavarshambulu 1211 agu Virodhi samvatsara Margasira su. 12 Somavaramuna Kakatiyya Rudradeva Maharajunaku Mallikarjuna Nayunikini Sivaloka-prapti-artham..."',
    english_translation:
      'Hail! In the Saka year 1211, Virodhi, on Monday the 12th day of the bright fortnight of Margasira (27 November 1289 CE), Puvvula Mummadi donates irrigated land to Lord Somalingadeva for the attainment of Sivaloka (heavenly abode) of Kakatiya Rudradeva Maharaja (Queen Rudrama Devi) and General Mallikarjuna Nayaka.',
    scholarly_references: [
      'Sastry, P.V. Parabrahma (Ed.), Inscriptions of Andhra Pradesh: Nalgonda District, Vol. I (1992).',
      'Talbot, Cynthia, Precolonial India in Practice (2001), Oxford University Press, p. 136 & p. 274.'
    ],
    verification_status: 'Reviewed'
  }
];

// KD-0023: Royal Dynasty Record for Royal Dynasties Page & Server Translations
export const KAKATIYA_DYNASTY_RECORD = {
  id: 'dyn_kakatiya_orugallu',
  refNumber: 'KD-0023',
  name: {
    en: 'Kakatiya Imperial Dynasty of Anumakonda & Orugallu (c. 1000–1323 CE)',
    hi: 'अनुमकोंडा एवं ओरुगल्लु (वारंगल) का काकतीय साम्राज्य (लगभग 1000–1323 ई.)',
    te: 'అనుమకొండ & ఓరుగల్లు (వరంగల్) కాకతీయ సామ్రాజ్య రాజవంశం (క్రీ.శ. 1000–1323)',
    kn: 'ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು (ವರಂಗಲ್) ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯಶಾಹಿ ರಾಜವಂಶ (ಕ್ರಿ.ಶ. 1000–1323)',
    ta: 'அனுமகொண்டா & ஓருகல்லு (வாரங்கல்) காகதீயப் பேரரசு வம்சம் (பொ.ஊ. 1000–1323)',
    mr: 'अनुमकोंडा आणि ओरुगल्लु (वरंगळ) चे काकतीय साम्राज्य राजवंश (इ.स. १०००–१३२३)',
    or: 'ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ର କାକତୀୟ ସାମ୍ରାଜ୍ୟ ରାଜବଂଶ (୧୦୦୦–୧୩୨୩ ଖ୍ରୀ.ଅ.)',
    bn: 'অনুমকোন্ডা ও ওরুগল্লু (ওয়ারাঙ্গল)-এর কাকতীয় সাম্রাজ্যিক রাজবংশ (১০০০–১৩২৩ খ্রি.)'
  },
  period: {
    en: 'c. 1000 – 1323 CE (Sovereign Empire: 1163 – 1323 CE)',
    hi: 'लगभग 1000 – 1323 ई. (सार्वभौम साम्राज्य: 1163 – 1323 ई.)',
    te: 'క్రీ.శ. 1000 – 1323 (సార్వభౌమ సామ్రాజ్యం: 1163 – 1323)',
    kn: 'ಕ್ರಿ.ಶ. 1000 – 1323 (ಸಾರ್ವಭೌಮ ಸಾಮ್ರಾಜ್ಯ: 1163 – 1323)',
    ta: 'பொ.ஊ. 1000 – 1323 (இறையாண்மைப் பேரரசு: 1163 – 1323)',
    mr: 'इ.स. १००० – १३२३ (सार्वभौम साम्राज्य: ११६३ – १३२३)',
    or: '୧୦୦୦ – ୧୩୨୩ ଖ୍ରୀ.ଅ. (ସାର୍ବଭୌମ ସାମ୍ରାଜ୍ୟ: ୧୧୬୩ – ୧୩୨୩ ଖ୍ରୀ.ଅ.)',
    bn: '১০০০ – ১৩২৩ খ্রি. (সার্বভৌম সাম্রাজ্য: ১১৬৩ – ১৩২৩ খ্রি.)'
  },
  capital: {
    en: 'Anumakonda (Hanamkonda) & Orugallu (Warangal / Ekashilanagara)',
    hi: 'अनुमकोंडा (हनमकोंडा) एवं ओरुगल्लु (वारंगल / एकशिलानगर)',
    te: 'అనుమకొండ (హనుమకొండ) & ఓరుగల్లు (వరంగల్ / ఏకశిలానగరం)',
    kn: 'ಅನುಮಕೊಂಡ (ಹನುಮಕೊಂಡ) ಮತ್ತು ಓರುಗಲ್ಲು (ವರಂಗಲ್ / ಏಕಶಿಲಾನಗರ)',
    ta: 'அனுமகொண்டா (ஹனம்கொண்டா) & ஓருகல்லு (வாரங்கல் / ஏகசிலாநகரம்)',
    mr: 'अनुमकोंडा (हनमकोंडा) आणि ओरुगल्लु (वरंगळ / एकशिलानगर)',
    or: 'ଅନୁମକୋଣ୍ଡା (ହନମକୋଣ୍ଡା) ଓ ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ / ଏକଶିଳାନଗର)',
    bn: 'অনুমকোন্ডা (হনমকোন্ডা) ও ওরুগল্লু (ওয়ারাঙ্গল / একশিলানগর)'
  },
  origin_region: {
    en: 'Telangana & Andhra (Trilinga Desha — Godavari to Kanchipuram)',
    hi: 'तेलंगाना एवं आंध्र (त्रिलिंग देश — गोदावरी से कांचीपुरम तक)',
    te: 'తెలంగాణ & ఆంధ్ర (త్రిలింగ దేశం — గోదావరి నుండి కాంచీపురం వరకు)',
    kn: 'ತೆಲಂಗಾಣ ಮತ್ತು ಆಂಧ್ರ (ತ್ರಿಲಿಂಗ ದೇಶ — ಗೋದಾವರಿಯಿಂದ ಕಾಂಚೀಪುರಂವರೆಗೆ)',
    ta: 'தெலுங்கானா & ஆந்திரா (திரிலிங்க தேசம் — கோதாவரி முதல் காஞ்சிபுரம் வரை)',
    mr: 'तेलंगणा आणि आंध्र (त्रिलिंग देश — गोदावरी ते कांचीपुरम)',
    or: 'ତେଲେଙ୍ଗାନା ଓ ଆନ୍ଧ୍ର (ତ୍ରିଲିଙ୍ଗ ଦେଶ — ଗୋଦାବରୀଠାରୁ କାଞ୍ଚିପୁରମ ପର୍ଯ୍ୟନ୍ତ)',
    bn: 'তেলেঙ্গানা ও অন্ধ্র (ত্রিলিঙ্গ দেশ — গোদাবরী থেকে কাঞ্চীপুরম পর্যন্ত)'
  },
  overview: {
    en: 'Documented Deccan imperial dynasty rising from Western Chalukya feudatories at Anumakonda under Beta I, Prola I, Beta II, and Prola II to full sovereignty under Rudradeva (1163 CE), Mahadeva, Emperor Ganapati Deva (1199–1262 CE), Queen Rudrama Devi (1262–1289 CE), and Prataparudra II (1289–1323 CE). Renowned for the triple concentric fortifications of Orugallu, the 77-Nayaka Nayankara military system, thousands of chain-tank irrigation reservoirs (Golusu Kattu Cheruvulu), the Motupalli maritime charter (1244 CE), the Thousand Pillar Temple (1163 CE), and the UNESCO-listed Ramappa Temple (1213 CE).',
    hi: 'अनुमकोंडा में कल्याणी चालुक्यों के सामंत के रूप में बेत प्रथम, प्रोल प्रथम, बेत द्वितीय और प्रोल द्वितीय के अधीन उदित होकर रुद्रदेव (1163 ई.), महादेव, सम्राट गणपति देव (1199–1262 ई.), रानी रुद्रमा देवी (1262–1289 ई.) और प्रतापरुद्र द्वितीय (1289–1323 ई.) के अधीन संपूर्ण तेलुगु भूमि को एकीकृत करने वाला प्रसिद्ध दक्कन साम्राज्य। ओरुगल्लु के त्रि-स्तरीय दुर्ग, 77-नायक नायंकर व्यवस्था, श्रृंखलाबद्ध सिंचाई तालाबों, मोटुपल्ली अभय शासन (1244 ई.), हजार स्तंभ मंदिर (1163 ई.) और यूनेस्को विश्व धरोहर रामप्पा मंदिर (1213 ई.) के लिए विख्यात।',
    te: 'అనుమకొండలో కళ్యాణి చాళుక్య సామంతులుగా మొదటి బేతరాజు, మొదటి ప్రోలరాజు, రెండవ బేతరాజు, రెండవ ప్రోలరాజుల క్రింద ఆరంభమై, రుద్రదేవుడు (1163), మహాదేవుడు, గణపతిదేవ చక్రవర్తి (1199–1262), రాణి రుద్రమదేవి (1262–1289), రెండవ ప్రతాపరుద్రుల (1289–1323) పాలనలో యావత్ తెలుగు జాతిని ఏకం చేసిన మహా సామ్రాజ్యం. ఓరుగల్లు త్రివలయ దుర్గం, 77 నాయంకర సైనిక వ్యవస్థ, గొలుసుకట్టు చెరువులు, మోటుపల్లి అభయశాసనం (1244), వేయిస్తంభాల గుడి (1163), యునెస్కో గుర్తింపు పొందిన రామప్ప దేవాలయం (1213) కాకతీయుల అజరామర కীর্তికి నిదర్శనాలు.',
    kn: 'ಅನುಮಕೊಂಡದಲ್ಲಿ ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರ ಸಾಮಂತರಾಗಿ ಪ್ರಾರಂಭವಾಗಿ, ರುದ್ರದೇವ (1163), ಮಹಾದೇವ, ಸಾಮ್ರಾಟ್ ಗಣಪತಿದೇವ (1199–1262), ರಾಣಿ ರುದ್ರಮಾದೇವಿ (1262–1289) ಮತ್ತು ಎರಡನೇ ಪ್ರತಾಪರುದ್ರರ (1289–1323) ಅಡಿಯಲ್ಲಿ ಸಮಗ್ರ ಆಂಧ್ರ-ತೆಲಂಗಾಣವನ್ನು ಏಕೀಕರಿಸಿದ ದಕ್ಕನ್ ಸಾಮ್ರಾಜ್ಯ. ಓರುಗಲ್ಲು ಕೋಟೆ, ನಾಯಂಕರ ಪದ್ಧತಿ, ಸರಣಿ ಕೆರೆಗಳು, ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (1244), ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ (1163) ಮತ್ತು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ರಾಮಪ್ಪ ದೇವಾಲಯಗಳಿಗೆ (1213) ಪ್ರಸಿದ್ಧವಾಗಿದೆ.',
    ta: 'அனுமகொண்டாவில் கல்யாணிச் சாளுக்கியர்களின் சிற்றரசர்களாகத் தொடங்கி, உருத்ரதேவர் (1163), மகாதேவர், பேரரசர் கணபதி தேவர் (1199–1262), ராணி ருத்ரமா தேவி (1262–1289) மற்றும் இரண்டாம் பிரதாபருத்ரர் (1289–1323) ஆகியோரின் கீழ் தெலுங்கு நிலங்களை ஒன்றிணைத்த தக்காணப் பேரரசு. ஓருகல்லு முவ்வட்டக் கோட்டை, நாயங்கர முறை, சங்கிலித் தொடர் ஏரிகள், மோதுபள்ளி அபய சாசனம் (1244), ஆயிரங்கால் கோயில் (1163) மற்றும் யுனெஸ்கோ உலக பாரம்பரிய இராமப்பா கோயில் (1213) ஆகியவற்றிற்குப் புகழ்பெற்றது.',
    mr: 'अनुमकोंडा येथे कल्याणी चालुक्यांचे सामंत म्हणून उदयास येऊन रुद्रदेव (११६३), महादेव, सम्राट गणपती देव (११९९–१२६२), राणी रुद्रमा देवी (१२६२–१२८९) आणि प्रतापरुद्र दुसरा (१२८९–१३२३) यांच्या नेतृत्वाखाली संपूर्ण तेलुगू प्रदेश एकत्र करणारे दख्खनमधील महान साम्राज्य. ओरुगल्लुचा तिहेरी किल्ला, ७७ नायकांची नायंकर पद्धत, साखळी तलाव, मोटुपल्ली अभयशासन (१२४४), हजार स्तंभ मंदिर (११६३) आणि युनेस्को जागतिक वारसा रामप्पा मंदिर (१२१३) यासाठी प्रसिद्ध.',
    or: 'ଅନୁମକୋଣ୍ଡାରେ କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟଙ୍କ ସାମନ୍ତ ଭାବେ ଉದୟ ହୋଇ ରୁଦ୍ରଦେବ (୧୧୬୩), ମହାଦେବ, ସମ୍ରାଟ ଗଣପତି ଦେବ (୧୧୯୯–୧୨୬୨), ରାଣୀ ରୁଦ୍ରମା ଦେବୀ (୧୨୬୨–୧୨୮୯) ଓ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ରଙ୍କ (୧୨୮୯–୧୩୨୩) ଅଧୀନରେ ସମଗ୍ର ତେଲୁଗୁ ଭୂమిକୁ ଏକত্রିତ କରିଥିବା ଦাক্ষିଣାତ୍ୟ ସାମ୍ରାଜ୍ୟ। ଓରୁଗଲ୍ଲୁ ତ୍ରିବଳୟ ଦୁର୍ଗ, ୭୭-ନାୟଙ୍କର ପ୍ରଥା, ଶୃଙ୍ଖଳିତ ଜળાଶୟ, ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ (୧୨୪୪), ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର (୧୧୬୩) ଓ ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ ରାମପ୍ପା ମନ୍ଦିର (୧୨୧୩) ପାଇଁ ପ୍ରସିଦ୍ଧ।',
    bn: 'অনুমকোন্ডায় কল্যাণী চালুক্যদের সামন্ত হিসেবে উত্থান লাভ করে রুদ্রদেব (১১৬৩), মহাদেব, সম্রাট গণপতি দেব (১১৯৯–১২৬২), রানি রুদ্রমা দেবী (১২৬২–১২৮৯) এবং দ্বিতীয় প্রতাপরুদ্রের (১২৮৯–১৩২৩) অধীনে সমগ্র তেলুগু ভূমি ঐক্যবদ্ধকারী দাক্ষিণাত্যের সাম্রাজ্য। ওরুগল্লু ত্রিবলয় দুর্গ, ৭৭-নায়ঙ্কর প্রথা, শৃঙ্খলিত জলাধার, মোতুপল্লী অভয় শাসন (১২৪৪), সহস্র স্তম্ভ মন্দির (১১৬৩) এবং ইউনেস্কো বিশ্ব ঐতিহ্য রামপ্পা মন্দিরের (১২১৩) জন্য বিখ্যাত।'
  },
  rulers: [
    'Beta I (c. 1000–1052 CE)',
    'Prola I (c. 1052–1076 CE)',
    'Beta II (c. 1076–1108 CE)',
    'Prola II (c. 1116–1157 CE)',
    'Rudradeva / Prataparudra I (c. 1158–1195 CE)',
    'Mahadeva (c. 1195–1199 CE)',
    'Ganapati Deva (1199–1262 CE)',
    'Rani Rudrama Devi (1262–1289 CE)',
    'Prataparudra II (1289–1323 CE)'
  ],
  monuments: [
    'Orugallu (Warangal) Fort & Monolithic Kirti Toranas (KD-0011)',
    'Thousand Pillar Temple, Hanamkonda (1163 CE, KD-0012)',
    'Kakatiya Rudreswara (Ramappa) Temple, Palampet — UNESCO World Heritage Site (1213 CE, KD-0013)',
    'Kota Gullu / Ghanpur Group of Temples (KD-0014)',
    'Pakhal, Ramappa, Laknavaram & Bayyaram Chain-Tank Reservoirs (Samudrams)'
  ],
  inscriptions: [
    'Anumakonda Inscription of Rudradeva (1163 CE / Saka 1084, KD-0019)',
    'Motupalli Abhaya Shasana of Ganapati Deva (1244 CE, KD-0020)',
    'Malkapuram Stone Pillar Inscription of Rudrama Devi (1261 CE, KD-0021)',
    'Chandupatla Stone Inscription of Rudrama Devi (Nov 1289 CE, KD-0022)'
  ]
};

// KD-0024: Historical Gallery Item
export const KAKATIYA_GALLERY_ITEM: GalleryItem = {
  id: 'gal_kakatiya_kirti_torana',
  title: 'Orugallu (Warangal) Fort Monolithic Kirti Torana & Cyclopean Granite Ramparts',
  category: 'forts',
  period: '12th–14th Century CE (Kakatiya Imperial Period)',
  location: 'Warangal (Orugallu), Telangana',
  creator_photographer: 'Deccan Epigraphic & Architectural Survey Archive',
  source: 'Archaeological Survey of India (ASI) Hyderabad Circle Photographic Record',
  copyright_license: 'CC BY-SA 4.0 / Open Educational Archival Use',
  verification_status: 'Reviewed',
  image_url: ARCHIVE_IMG('kumara_hamvira_warangal_srirangam.jpg'),
  alt_text:
    'Monolithic stone Kirti Torana gateway and concentric dry-ashlar granite ramparts of Orugallu (Warangal Fort)',
  description:
    'The iconic monolithic stone gateway (Kirti Torana) of the Svayambhudeva Temple precinct inside Orugallu Fort, flanked by the triple concentric fortifications engineered under Rudradeva, Ganapati Deva, Rani Rudrama Devi, and Prataparudra II.'
};

// KD-0025: Royal Genealogy Branch Node
export const KAKATIYA_GENEALOGY_NODE: GenealogyNode = {
  id: 'gen_kakatiya_lineage',
  name: 'Kakatiya Imperial House of Anumakonda & Orugallu (Beta I to Prataparudra II)',
  titles: 'Mahamandalesvara, Maharajadhiraja, Raya-Gajakesari & Dayagajakesari',
  reign: 'c. 1000 – 1323 CE (Sovereign Empire: 1163 – 1323 CE)',
  generation: 1,
  relationship_type: 'documented_primary',
  parent_id: 'gen_sri_rama',
  spouse: 'Virabhadra of Nidadavolu (Eastern Chalukya Consort of Queen Rudrama Devi)',
  children: ['gen_dakshina_branch'],
  sources: [
    'Anumakonda Inscription of Rudradeva (1163 CE / Saka 1084)',
    'Bayyaram Tank Inscription of Mailama',
    'Malkapuram Stone Pillar Inscription (1261 CE)',
    'Chandupatla Inscription (27 Nov 1289 CE)'
  ],
  notes:
    'Epigraphically verified Deccan imperial dynasty (Beta I → Prola I → Beta II → Prola II → Rudradeva → Mahadeva → Ganapati Deva → Queen Rudrama Devi → Prataparudra II) whose 77-Nayaka military system and Orugallu fortifications later connected directly with the 1460 CE Gajapathi southern campaigns and Odiyaraju / Vaddera fort-engineering lineages.'
};

/**
 * ============================================================================
 * PHASE 5 – 8 KAKATIYA HISTORICAL TIMELINE EVENTS (KD-0026 .. KD-0033)
 * Chronologically ordered from c. 1000 CE emergence to the 1323 CE Fall of Orugallu.
 * ============================================================================
 */
export const KAKATIYA_TIMELINE_EVENTS: HistoricalEvent[] = [
  // 1. KD-0026
  {
    id: 'ev_kakatiya_emergence_1000',
    period: '11th Century CE',
    year_text: 'c. 1000–1076 CE',
    sort_year: 1000,
    title: 'Emergence of the Early Kakatiya Principality at Anumakonda under Beta I & Prola I',
    rulers_involved: 'Beta I (r. c. 1000–1052 CE) & Prola I (r. c. 1052–1076 CE)',
    political_development:
      'Following service under the Rashtrakutas and realignment with the Western Chalukyas of Kalyani, Beta I consolidated Anumakonda (Hanamkonda). His son Prola I (Arigajakesari) secured the permanent hereditary grant (sthiram-vishayam) of Anumakonda Vishaya from Chalukya Emperor Someshvara I and excavated the Kesari Samudram irrigation tank, initiating Kakatiya hydraulic statecraft.',
    monuments_inscriptions: 'Sanigaram Inscription (1051 CE); Kazipet Darga Inscription (1090 CE); Kesari Samudram (Kesamudram) reservoir.',
    primary_sources: 'Inscriptions of Andhra Pradesh: Warangal & Karimnagar Districts; Bayyaram Tank Inscription.',
    uncertainty_notes: 'Epigraphically corroborated primary record; early pre-1000 CE ancestors (Venna, Gunda I–IV) are reconstructed from the Bayyaram and Kazipet genealogical prasastis.'
  },
  // 2. KD-0027
  {
    id: 'ev_kakatiya_independence_1163',
    period: 'Mid 12th Century CE',
    year_text: '1163 CE (Saka 1084)',
    sort_year: 1163,
    title: 'Rudradeva’s Proclamation of Sovereign Independence & Consecration of the Thousand Pillar Temple',
    rulers_involved: 'Prola II (r. c. 1116–1157 CE) & King Rudradeva / Prataparudra I (r. c. 1158–1195 CE)',
    political_development:
      'Building on Prola II’s victories over Western Chalukya Tailapa III and rival Telangana chiefs, Rudradeva formally threw off Chalukya suzerainty in 1163 CE (Saka 1084), proclaiming a fully independent Kakatiya kingdom and extending campaigns into Coastal Andhra up to Draksharama.',
    monuments_inscriptions: 'Anumakonda Thousand Pillar Temple (Sri Rudreswara Swamy Trikutalayam) & Anumakonda Stone Pillar Inscription (20 January 1163 CE).',
    primary_sources: 'Epigraphia Indica, Vol. IX, pp. 256–267 (ed. J.F. Fleet); South Indian Inscriptions Vol. IV.',
    uncertainty_notes: 'Exact astronomical date verified by primary Sanskrit-Telugu stone inscription at Hanamkonda (20 January 1163 CE).'
  },
  // 3. KD-0028
  {
    id: 'ev_kakatiya_orugallu_capital_1195',
    period: 'Late 12th Century CE',
    year_text: 'c. 1163–1199 CE',
    sort_year: 1195,
    title: 'Foundation of Orugallu (Warangal) Citadel & Mahadeva’s Devagiri Campaign',
    rulers_involved: 'Rudradeva (r. c. 1158–1195 CE) & Mahadeva (r. c. 1195–1199 CE)',
    political_development:
      'Rudradeva initiated the new plains fortress-capital of Orugallu (Ekashilanagara / Warangal) around the Svayambhudeva shrine. Following Rudradeva’s death fighting the Seuna Yadavas in 1195 CE, his brother Mahadeva ruled until falling in battle during a retaliatory campaign against Devagiri in 1198–1199 CE, while General Recharla Rudra safeguarded the Kakatiya state.',
    monuments_inscriptions: 'Early Orugallu citadel foundations; Sundilla & Palampet inscriptions.',
    primary_sources: 'Palampet Inscription of Recharla Rudra (1213 CE); Bayyaram Tank Inscription.',
    uncertainty_notes: 'Verified by contemporary epigraphic accounts of both the Kakatiyas and Seuna Yadavas.'
  },
  // 4. KD-0029
  {
    id: 'ev_kakatiya_ganapati_reign_1199',
    period: '13th Century CE',
    year_text: '1199–1262 CE',
    sort_year: 1213,
    title: 'Emperor Ganapati Deva’s 63-Year Unification of Telugu Lands, Ramappa Temple (1213 CE) & Motupalli Charter (1244 CE)',
    rulers_involved: 'Emperor Ganapati Deva (r. 1199–1262 CE), General Recharla Rudra & Jayapa Senani',
    political_development:
      'During his 63-year reign, Ganapati Deva united Telangana, Coastal Andhra, and Rayalaseema down to Kanchipuram, shifted the imperial capital permanently to Orugallu, commissioned the Pakhal and Ramappa reservoirs and UNESCO-listed Ramappa Temple (1213 CE), and promulgated the Motupalli Abhaya Shasana maritime security charter (1244 CE).',
    monuments_inscriptions: 'Kakatiya Rudreswara (Ramappa) Temple (1213 CE); Pakhal Lake; Motupalli Abhaya Shasana Pillar Inscription (1244 CE).',
    primary_sources: 'Epigraphia Indica, Vol. XII, pp. 188–197 (Motupalli Inscription); Jayapa Senani’s Nrittaratnavali (1253–54 CE).',
    uncertainty_notes: 'Completely corroborated by over 400 dated stone and copper-plate inscriptions across Andhra and Telangana.'
  },
  // 5. KD-0030
  {
    id: 'ev_kakatiya_rudrama_reign_1262',
    period: 'Late 13th Century CE',
    year_text: '1262–1289 CE',
    sort_year: 1262,
    title: 'Sovereign Reign of Queen Rudrama Devi (Rudradeva Maharaja) & Chandupatla Epigraph (Nov 1289 CE)',
    rulers_involved: 'Queen Rudrama Devi (r. 1262–1289 CE)',
    political_development:
      'Designated as a male sovereign ("Rudradeva Maharaja") through the Putrika ceremony, Queen Rudrama Devi defeated the invading Yadava King Mahadeva of Devagiri, completed the concentric granite bastion wall and moat of Orugallu Fort, endowed the Golaki Matha university and maternity hospital at Malkapuram (1261 CE), and died heroically on the battlefield in November 1289 CE fighting the rebel Kayastha chief Ambadeva.',
    monuments_inscriptions: 'Malkapuram Stone Pillar Inscription (1261 CE); Orugallu Inner Granite Ramparts & 45 Bastions; Chandupatla Stone Inscription (27 November 1289 CE).',
    primary_sources: 'Chandupatla Inscription (1289 CE); Malkapuram Inscription (1261 CE); Marco Polo’s Travels (Book III, Ch. 19).',
    uncertainty_notes: 'The discovery of the Chandupatla Inscription (dated 27 Nov 1289 CE) definitively established the exact month and battlefield context of Rudrama Devi’s death.'
  },
  // 6. KD-0031
  {
    id: 'ev_kakatiya_prataparudra_reign_1289',
    period: 'Late 13th – Early 14th Century CE',
    year_text: '1289–1303 CE',
    sort_year: 1290,
    title: 'Accession of Emperor Prataparudra II, 77-Nayankara Reorganization & Victory at Upparapalli (1303 CE)',
    rulers_involved: 'Emperor Prataparudra II (r. 1289–1323 CE) & Nayaka Commanders Potuganti Maili and Rechacherla Prasaditya',
    political_development:
      'Succeeding his grandmother Rudrama Devi, Prataparudra II crushed Ambadeva’s rebellion at Tripurantakam, reorganized Kakatiya military administration by assigning royal estates to 77 Nayakas (the Nayankara System), and decisively routed Sultan Allauddin Khalji’s first Delhi Sultanate invasion at the Battle of Upparapalli in 1303 CE.',
    monuments_inscriptions: 'Tripurantakam, Srisailam, and Karimnagar inscriptions; Vidyanatha’s Sanskrit treatise Prataparudriya.',
    primary_sources: 'Inscriptions of Andhra Pradesh; Vilasa Grant; Ziauddin Barani’s Tarikh-i-Firuz Shahi.',
    uncertainty_notes: 'Verified by both Telugu epigraphic prasastis of the Velama/Nayaka commanders and Indo-Persian court chronicles.'
  },
  // 7. KD-0032
  {
    id: 'ev_kakatiya_delhi_sieges_1309',
    period: 'Early 14th Century CE',
    year_text: '1309–1318 CE',
    sort_year: 1309,
    title: 'Delhi Sultanate Expeditions Against Orugallu under Malik Kafur (1309–1310 CE) & Khusrau Khan (1318 CE)',
    rulers_involved: 'Emperor Prataparudra II vs. Malik Kafur (1309–1310 CE) & Khusrau Khan (1318 CE)',
    political_development:
      'In 1309–1310 CE, Allauddin Khalji’s general Malik Kafur marched via Devagiri and besieged the concentric earthen and stone walls of Orugallu for over a month before concluding a tributary treaty. After Prataparudra II reasserted autonomy and campaigned to Kanchipuram (1316 CE), Mubarak Shah Khalji’s general Khusrau Khan led a second expedition in 1318 CE.',
    monuments_inscriptions: 'Orugallu outer earthen rampart (Matti Kota) & middle stone fort bastions; Dakshina-Kanchi inscriptions of Prataparudra II (1316 CE).',
    primary_sources: 'Amir Khusrau’s Khaza’in ul-Futuh (1311 CE) & Nuh Sipihr; Srisailam & Kanchipuram inscriptions.',
    uncertainty_notes: 'Detailed siege descriptions of Orugallu’s concentric moats and bastions in Amir Khusrau’s eye-witness chronicle closely match surviving archaeological remains at Warangal.'
  },
  // 8. KD-0033
  {
    id: 'ev_kakatiya_fall_warangal_1323',
    period: 'Early 14th Century CE',
    year_text: '1323 CE',
    sort_year: 1323,
    title: 'Final Siege and Fall of Orugallu (1323 CE), Prataparudra II’s Martyrdom & Post-Kakatiya Nayaka Liberation',
    rulers_involved: 'Emperor Prataparudra II vs. Ulugh Khan (Muhammad bin Tughluq); Musunuri Prolaya & Kapaya Nayaka',
    political_development:
      'After repulsing Ulugh Khan’s first assault in 1321–1322 CE, Orugallu endured a five-month siege in 1323 CE before falling to reinforced Tughluq armies. Captured and escorted toward Delhi, Emperor Prataparudra II ended his life on the banks of the Narmada River (Somodbhava). Within a decade, 75 surviving Kakatiya Nayakas united under Musunuri Prolaya and Kapaya Nayaka to liberate Andhra and reconquer Orugallu by 1336 CE.',
    monuments_inscriptions: 'Ruined Svayambhudeva Temple & Kirti Toranas of Warangal Fort; Vilasa Copper-Plate Grant (c. 1330 CE); Kaluvacheru Grant (1423 CE).',
    primary_sources: 'Vilasa Copper-Plate Grant of Musunuri Prolaya Nayaka (Epigraphia Indica Vol. XXXII, pp. 239–268); Kaluvacheru Grant of Anitalli; Isami’s Futuh-us-Salatin.',
    uncertainty_notes: 'Prataparudra II’s voluntary death on the banks of the Narmada (Somodbhava) is explicitly attested in contemporary 14th-century Telugu-Sanskrit copper plates (Vilasa Grant).'
  }
];

/**
 * ============================================================================
 * PHASE 7 – MULTILINGUAL TRANSLATIONS FOR ALL KAKATIYA RECORDS (8 LANGUAGES)
 * ============================================================================
 */
export const KAKATIYA_MONUMENT_TRANSLATIONS: Record<
  string,
  Partial<
    Record<
      LanguageCode,
      {
        name?: string;
        location?: string;
        state?: string;
        patron_ruler?: string;
        century?: string;
        architectural_style?: string;
        historical_significance?: string;
        sources?: string[];
      }
    >
  >
> = {
  mon_warangal_fort: {
    hi: {
      name: 'ओरुगल्लु (वारंगल) किला और एकाश्म स्वयंभूदेव कीर्ति तोरण',
      location: 'वारंगल (ओरुगल्लु / एकशिलानगर), वारंगल जिला',
      state: 'तेलंगाना',
      patron_ruler: 'रुद्रदेव, गणपति देव, रानी रुद्रमा देवी एवं प्रतापरुद्र द्वितीय',
      century: '12वीं–14वीं शताब्दी ई. (1163–1323 ई.)',
      architectural_style: 'काकतीय त्रि-स्तरीय ग्रेनाइट दुर्ग एवं एकाश्म तोरण स्थापत्य',
      historical_significance:
        'काकतीय साम्राज्य का राजधानी दुर्ग जो तीन संकेंद्रित सुरक्षा प्राचीरों (बाहरी मिट्टी की दीवार, 45 बुर्जों वाली विशाल ग्रेनाइट मध्य प्राचीर और आंतरिक गढ़) तथा स्वयंभूदेव शिव मंदिर के चार भव्य एकाश्म कीर्ति तोरणों के लिए प्रसिद्ध है।'
    },
    te: {
      name: 'ఓరుగల్లు (వరంగల్) కోట & స్వయంభూదేవ ఏకశిలా కీర్తి తోరణాలు',
      location: 'వరంగల్ (ఓరుగల్లు / ఏకశిలానగరం), వరంగల్ జిల్లా',
      state: 'తెలంగాణ',
      patron_ruler: 'రుద్రదేవుడు, గణపతిదేవుడు, రాణి రుద్రమదేవి & రెండవ ప్రతాపరుద్రుడు',
      century: 'క్రీ.శ. 12–14వ శతాబ్దం (1163–1323)',
      architectural_style: 'కాకతీయ త్రివలయ రాతి కోట & ఏకశిలా కీర్తి తోరణ వాస్తుశిల్పం',
      historical_significance:
        'కాకతీయ సామ్రాజ్య రాజధాని దుర్గం. మూడు వలయాల ప్రాకారాలు (మట్టి కోట, 45 బురుజులు గల కృష్ణశిలా కోట, అంతర్గత కోట), లోతైన కందకాలు మరియు స్వయంభూదేవ ఆలయం చుట్టూ ఉన్న నాలుగు ప్రసిద్ధ ఏకశిలా కీర్తి తోరణాలు తెలంగాణ రాష్ట్ర చిహ్నంగా విరాజిల్లుతున్నాయి.'
    },
    kn: {
      name: 'ಓರುಗಲ್ಲು (ವರಂಗಲ್) ಕೋಟೆ ಮತ್ತು ಏಕಶಿಲಾ ಸ್ವಯಂಭೂದೇವ ಕೀರ್ತಿ ತೋರಣಗಳು',
      location: 'ವರಂಗಲ್ (ಓರುಗಲ್ಲು), ವರಂಗಲ್ ಜಿಲ್ಲೆ',
      state: 'ತೆಲಂಗಾಣ',
      patron_ruler: 'ರುದ್ರದೇವ, ಗಣಪತಿದೇವ, ರಾಣಿ ರುದ್ರಮಾದೇವಿ ಮತ್ತು ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ',
      century: 'ಕ್ರಿ.ಶ. 12–14ನೇ ಶತಮಾನ (1163–1323)',
      architectural_style: 'ಕಾಕತೀಯ ತ್ರಿವಲಯ ಗ್ರಾನೈಟ್ ಕೋಟೆ ಮತ್ತು ಏಕಶಿಲಾ ತೋರಣ ವಾಸ್ತುಶಿಲ್ಪ',
      historical_significance:
        'ಮೂರು ಸುತ್ತಿನ ಕೋಟೆ ಗೋಡೆಗಳು, 45 ಬುರುಜುಗಳು ಮತ್ತು ಸ್ವಯಂಭೂದೇವ ದೇವಾಲಯದ ನಾಲ್ಕು ಭವ್ಯ ಏಕಶಿಲಾ ಕೀರ್ತಿ ತೋರಣಗಳನ್ನು ಒಳಗೊಂಡ ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ ಕೋಟೆ.'
    },
    ta: {
      name: 'ஓருகல்லு (வாரங்கல்) கோட்டை & ஒற்றைக்கல் சுயம்புதேவ கீர்த்தி தோரணங்கள்',
      location: 'வாரங்கல் (ஓருகல்லு), வாரங்கல் மாவட்டம்',
      state: 'தெலுங்கானா',
      patron_ruler: 'உருத்ரதேவர், கணபதி தேவர், ராணி ருத்ரமா தேவி & இரண்டாம் பிரதாபருத்ரர்',
      century: 'பொ.ஊ. 12–14ஆம் நூற்றாண்டு (1163–1323)',
      architectural_style: 'காகதீய மூன்று வட்டக் கற்கோட்டை & ஒற்றைக்கல் தோரணக் கட்டிடக்கலை',
      historical_significance:
        'மூன்று வட்ட அரண்கள், 45 கொத்தளங்கள் மற்றும் சுயம்புதேவர் கோயிலின் நான்கு ஒற்றைக்கல் கீர்த்தி தோரணங்களைக் கொண்ட காகதீயப் பேரரசின் தலைநகர் கோட்டை.'
    },
    mr: {
      name: 'ओरुगल्लु (वरंगळ) किल्ला आणि एकाश्म स्वयंभूदेव कीर्ती तोरणे',
      location: 'वरंगळ (ओरुगल्लु), वरंगळ जिल्हा',
      state: 'तेलंगणा',
      patron_ruler: 'रुद्रदेव, गणपती देव, राणी रुद्रमा देवी आणि प्रतापरुद्र दुसरा',
      century: 'इ.स. १२ वे ते १४ वे शतक (११६३–१३२३)',
      architectural_style: 'काकतीय समकेंद्रित ग्रॅनाइट दुर्ग आणि एकाश्म तोरण स्थापत्य',
      historical_significance:
        'तीन समकेंद्रित तटबंदी, ४५ बुरूज आणि स्वयंभूदेव मंदिराच्या चार भव्य एकाश्म कीर्ती तोरणांसाठी प्रसिद्ध असलेला काकतीय साम्राज्याचा राजधानी किल्ला.'
    },
    or: {
      name: 'ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ଦୁର୍ଗ ଓ ଏକଶିଳା ସ୍ୱୟମ୍ଭୂଦେବ କୀର୍ତ୍ତି ତୋରଣ',
      location: 'ୱାରଙ୍ଗଲ (ଓରୁଗଲ୍ଲୁ), ୱାରଙ୍ଗଲ ଜିଲ୍ଲା',
      state: 'ତେଲେଙ୍ଗାନା',
      patron_ruler: 'ରୁଦ୍ରଦେବ, ଗଣପତି ଦେବ, ରାଣୀ ରୁଦ୍ରମା ଦେବୀ ଓ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର',
      century: '୧୨ଶ–୧୪ଶ ଶତାବ୍ଦୀ (୧୧୬୩–୧୩୨୩ ଖ୍ରୀ.ଅ.)',
      architectural_style: 'କାକତୀୟ ତ୍ରିବଳୟ ଗ୍ରାନାଇଟ ଦୁର୍ଗ ଓ ଏକଶିଳା ତୋରଣ ସ୍ଥାପତ୍ୟ',
      historical_significance:
        'ତିନୋଟି ସମକେନ୍ଦ୍ରিক ପ୍ରାଚୀର, ୪୫ଟି ବୁରୁଜ ଏବଂ ସ୍ୱୟମ୍ଭୂଦେବ ମନ୍ଦିରର ଚାରୋଟି ଏକଶିଳା କୀର୍ତ୍ତି ତୋରଣ ବିଶିଷ୍ଟ କାକତୀୟ ସାମ୍ରାଜ୍ୟର ରାଜଧାନୀ ଦୁର୍ଗ।'
    },
    bn: {
      name: 'ওরুগল্লু (ওয়ারাঙ্গল) দুর্গ ও একশিলা স্বয়ম্ভুদেব কীর্তি তোরণ',
      location: 'ওয়ারাঙ্গল (ওরুগল্লু), ওয়ারাঙ্গল জেলা',
      state: 'তেলেঙ্গানা',
      patron_ruler: 'রুদ্রদেব, গণপতি দেব, রানি রুদ্রমা দেবী ও দ্বিতীয় প্রতাপরুদ্র',
      century: '১২শ–১৪শ শতাব্দী (১১৬৩–১৩২৩ খ্রি.)',
      architectural_style: 'কাকতীয় ত্রিবলয় গ্রানাইট দুর্গ ও একশিলা তোরণ স্থাপত্য',
      historical_significance:
        'তিনটি সমকেন্দ্রিক প্রাচীর, ৪৫টি বুরুজ এবং স্বয়ম্ভুদেব মন্দিরের চারটি একশিলা কীর্তি তোরণ বিশিষ্ট কাকতীয় সাম্রাজ্যের রাজধানী দুর্গ।'
    }
  },
  mon_thousand_pillar_temple: {
    hi: {
      name: 'हजार स्तंभ मंदिर (श्री रुद्रेश्वर स्वामी त्रिकूटालयम, हनमकोंडा)',
      location: 'हनमकोंडा (अनुमकोंडा), वारंगल जिला',
      state: 'तेलंगाना',
      patron_ruler: 'राजा रुद्रदेव (प्रतापरुद्र प्रथम)',
      century: '12वीं शताब्दी ई. (प्रतिष्ठा: 1163 ई. / शक 1084)',
      architectural_style: 'काकतीय त्रिकूटाचल तारांकित (स्टेलैट) स्थापत्य शैली',
      historical_significance:
        '1163 ई. में काकतीय सार्वभौम स्वतंत्रता के उपलक्ष्य में राजा रुद्रदेव द्वारा निर्मित। तारे के आकार के अधिष्ठान और सैंडबॉक्स नींव पर निर्मित इस मंदिर में रुद्रेश्वर (शिव), वासुदेव (विष्णु) और सूर्यदेव के तीन गर्भगृह तथा एकाश्म नंदी मंडप हैं।'
    },
    te: {
      name: 'వేయిస్తంభాల గుడి (శ్రీ రుద్రేశ్వర స్వామి త్రికూటాలయం, హనుమకొండ)',
      location: 'హనుమకొండ (అనుమకొండ), వరంగల్ జిల్లా',
      state: 'తెలంగాణ',
      patron_ruler: 'రుద్రదేవ మహారాజు (మొదటి ప్రతాపరుద్రుడు)',
      century: 'క్రీ.శ. 12వ శతాబ్దం (ప్రతిష్ఠ: 1163 / శక 1084)',
      architectural_style: 'కాకతీయ త్రికూటాచల నక్షత్రాకార కృష్ణశిలా వాస్తుశిల్పం',
      historical_significance:
        'కాకతీయ స్వతంత్ర సామ్రాజ్య స్థాపనకు చిహ్నంగా క్రీ.శ. 1163లో రుద్రదేవుడు నిర్మించిన త్రికూట ఆలయం. రుద్రేశ్వర (శివ), వాసుదేవ (విష్ణు), సూర్యదేవ ఆలయాలతో, ఏకశిలా నందితో, నక్షత్రాకార జగతిపై నిర్మించబడింది.'
    },
    kn: {
      name: 'ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ (ಶ್ರೀ ರುದ್ರೇಶ್ವರ ಸ್ವಾಮಿ ತ್ರಿಕೂಟಾಲಯ, ಹನುಮಕೊಂಡ)',
      location: 'ಹನುಮಕೊಂಡ (ಅನುಮಕೊಂಡ), ವರಂಗಲ್ ಜಿಲ್ಲೆ',
      state: 'ತೆಲಂಗಾಣ',
      patron_ruler: 'ರಾಜ ರುದ್ರದೇವ (ಮೊದಲನೇ ಪ್ರತಾಪರುದ್ರ)',
      century: 'ಕ್ರಿ.ಶ. 12ನೇ ಶತಮಾನ (1163 / ಶಕ 1084)',
      architectural_style: 'ಕಾಕತೀಯ ತ್ರಿಕೂಟಾಚಲ ನಕ್ಷತ್ರಾಕಾರದ ವಾಸ್ತುಶಿಲ್ಪ',
      historical_significance:
        '1163ರಲ್ಲಿ ಕಾಕತೀಯ ಸ್ವಾತಂತ್ರ್ಯದ ಸ್ಮರಣಾರ್ಥ ರುದ್ರದೇವನು ನಿರ್ಮಿಸಿದ ತ್ರಿಕೂಟ ದೇವಾಲಯ; ರುದ್ರೇಶ್ವರ, ವಾಸುದೇವ ಮತ್ತು ಸೂರ್ಯದೇವರ ಮೂರು ಗರ್ಭಗೃಹಗಳನ್ನು ಹೊಂದಿದೆ.'
    },
    ta: {
      name: 'ஆயிரங்கால் கோயில் (ஸ்ரீ ருத்ரேஸ்வர சுவாமி திரிகூடாலயம், ஹனம்கொண்டா)',
      location: 'ஹனம்கொண்டா (அனுமகொண்டா), வாரங்கல் மாவட்டம்',
      state: 'தெலுங்கானா',
      patron_ruler: 'மன்னர் உருத்ரதேவர் (முதலாம் பிரதாபருத்ரர்)',
      century: 'பொ.ஊ. 12ஆம் நூற்றாண்டு (1163 / சக 1084)',
      architectural_style: 'காகதீய திரிகூடாசல நட்சத்திர வடிவக் கட்டிடக்கலை',
      historical_significance:
        '1163இல் காகதீய சுதந்திரத்தைக் கொண்டாட உருத்ரதேவரால் கட்டப்பட்ட திரிகூடக் கோயில்; சிவன், விஷ்ணு, சூரியன் ஆகிய மும்மூர்த்திகளுக்கான கருவறைகளைக் கொண்டுள்ளது.'
    },
    mr: {
      name: 'हजार स्तंभ मंदिर (श्री रुद्रेश्वर स्वामी त्रिकूटालयम, हनमकोंडा)',
      location: 'हनमकोंडा (अनुमकोंडा), वरंगळ जिल्हा',
      state: 'तेलंगणा',
      patron_ruler: 'राजा रुद्रदेव (प्रतापरुद्र पहिला)',
      century: 'इ.स. १२ वे शतक (११६३ / शक १०८४)',
      architectural_style: 'काकतीय त्रिकूटाचल तारकाकृती स्थापत्य',
      historical_significance:
        '११६३ मध्ये काकतीय स्वातंत्र्याच्या स्मरणार्थ राजा रुद्रदेवाने बांधलेले त्रिकूट मंदिर; यात रुद्रेश्वर, वासुदेव आणि सूर्यदेव यांची तीन गर्भगृहे आहेत.'
    },
    or: {
      name: 'ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର (ଶ୍ରୀ ରୁଦ୍ରେଶ୍ୱର ସ୍ୱାମୀ ତ୍ରିକୂଟାଳୟ, ହନମକୋଣ୍ଡା)',
      location: 'ହନମକୋଣ୍ଡା (ଅନୁମକୋଣ୍ଡା), ୱାରଙ୍ଗଲ ଜିଲ୍ଲା',
      state: 'ତେଲେଙ୍ଗାନା',
      patron_ruler: 'ରାଜା ରୁଦ୍ରଦେବ (ପ୍ରଥମ ପ୍ରତାପରୁଦ୍ର)',
      century: '୧୨ଶ ଶତାବ୍ଦୀ (୧୧୬୩ ଖ୍ରୀ.ଅ. / ଶକ ୧୦୮୪)',
      architectural_style: 'କାକତୀୟ ତ୍ରିକୂଟାଚଳ ତାରକାକୃତି ସ୍ଥାପତ୍ୟ',
      historical_significance:
        '୧୧୬୩ରେ କାକତୀୟ ସ୍ୱାଧୀନତା ସ୍ମୃତିରେ ରୁଦ୍ରଦେବଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ତ୍ରିକୂଟ ମନ୍ଦିର; ଏଥିରେ ରୁଦ୍ରେଶ୍ୱର, ବାସୁଦେବ ଓ ସୂର୍ଯ୍ୟଦେବଙ୍କ ତିନୋଟି ଗର୍ଭଗୃହ ରହିଛି।'
    },
    bn: {
      name: 'সহস্র স্তম্ভ মন্দির (শ্রী রুদ্রেশ্বর স্বামী ত্রিকূটালয়ম, হনমকোন্ডা)',
      location: 'হনমকোন্ডা (অনুমকোন্ডা), ওয়ারাঙ্গল জেলা',
      state: 'তেলেঙ্গানা',
      patron_ruler: 'রাজা রুদ্রদেব (প্রথম প্রতাপরুদ্র)',
      century: '১২শ শতাব্দী (১১৬৩ খ্রি. / শক ১০৮৪)',
      architectural_style: 'কাকতীয় ত্রিকূটাচল তারকাকৃতি স্থাপত্য',
      historical_significance:
        '১১৬৩ খ্রিস্টাব্দে কাকতীয় স্বাধীনতার স্মারক হিসেবে রাজা রুদ্রদেব কর্তৃক নির্মিত ত্রিকূট মন্দির; এতে রুদ্রেশ্বর, বাসুদেব ও সূর্যদেবের তিনটি গর্ভগৃহ রয়েছে।'
    }
  },
  mon_ramappa_temple: {
    hi: {
      name: 'काकतीय रुद्रेश्वर (रामप्पा) मंदिर, पालापेट (यूनेस्को विश्व धरोहर स्थल)',
      location: 'पालापेट, वेंकटपुर मंडल, मुलुगु जिला',
      state: 'तेलंगाना',
      patron_ruler: 'सम्राट गणपति देव के अधीन सेनापति रेचर्ला रुद्र (प्रमुख शिल्पी: रामप्पा)',
      century: '13वीं शताब्दी ई. (प्रतिष्ठा: 1213 ई. / शक 1135)',
      architectural_style: 'तैरती ईंटों वाले विमान, सैंडबॉक्स नींव और डोलराइट मदनिका शिल्प से युक्त काकतीय मंदिर',
      historical_significance:
        '2021 में यूनेस्को विश्व धरोहर स्थल घोषित। 1213 ई. में सेनापति रेचर्ला रुद्र द्वारा रामप्पा झील के तट पर निर्मित यह मंदिर भूकंप-रोधी सैंडबॉक्स नींव, पानी में तैरने वाली हल्की ईंटों (घनत्व ~0.85 g/cm³) और जयप सेनानी की नृत्तरत्नावली पर आधारित काले पत्थर की नृत्य मूर्तियों के लिए विश्व प्रसिद्ध है।'
    },
    te: {
      name: 'కాకతీయ రుద్రేశ్వర (రామప్ప) దేవాలయం, పాలంపేట (యునెస్కో ప్రపంచ వారసత్వ సంపద)',
      location: 'పాలంపేట, వెంకటాపురం మండలం, ములుగు జిల్లా',
      state: 'తెలంగాణ',
      patron_ruler: 'గణపతిదేవ చక్రవర్తి సేనాని రేచర్ల రుద్రుడు (ప్రధాన శిల్పి: రామప్ప)',
      century: 'క్రీ.శ. 13వ శతాబ్దం (ప్రతిష్ఠ: 1213 / శక 1135)',
      architectural_style: 'నీటిపై తేలే ఇటుకల విమానం, ఇసుక పునాది & కృష్ణశిలా మదనికా శిల్పాల కాకతీయ ఆలయం',
      historical_significance:
        '2021లో యునెస్కో ప్రపంచ వారసత్వ సంపదగా గుర్తింపు పొందింది. క్రీ.శ. 1213లో రేచర్ల రుద్రుడు రామప్ప చెరువు తీరాన నిర్మించిన ఈ ఆలయం భూకంపాలను తట్టుకునే ఇసుక పునాది (Sandbox foundation), నీటిపై తేలే తేలికపాటి ఇటుకలు మరియు జాయప సేనాని నృత్తరత్నావళిని ప్రతిబింబించే మదనికా-నాగినీ శిల్పాలకు జగత్ప్రసిద్ధి చెందింది.'
    },
    kn: {
      name: 'ಕಾಕತೀಯ ರುದ್ರೇಶ್ವರ (ರಾಮಪ್ಪ) ದೇವಾಲಯ, ಪಾಲಂಪೇಟ (ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ)',
      location: 'ಪಾಲಂಪೇಟ, ಮುಲುಗು ಜಿಲ್ಲೆ',
      state: 'ತೆಲಂಗಾಣ',
      patron_ruler: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವನ ಸೇನಾಪತಿ ರೇಚರ್ಲ ರುದ್ರ (ಶಿಲ್ಪಿ: ರಾಮಪ್ಪ)',
      century: 'ಕ್ರಿ.ಶ. 13ನೇ ಶತಮಾನ (1213 / ಶಕ 1135)',
      architectural_style: 'ತೇಲುವ ಇಟ್ಟಿಗೆಗಳ ವಿಮಾನ ಮತ್ತು ಮರಳು ತಳಹದಿಯ ಕಾಕತೀಯ ದೇವಾಲಯ',
      historical_significance:
        '2021ರಲ್ಲಿ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿ ಘೋಷಿಸಲ್ಪಟ್ಟಿದೆ. 1213ರಲ್ಲಿ ನಿರ್ಮಿತವಾದ ಈ ದೇವಾಲಯವು ಮರಳು ತಳಹದಿ, ನೀರಿನಲ್ಲಿ ತೇಲುವ ಇಟ್ಟಿಗೆಗಳು ಮತ್ತು ಮದನಿಕಾ ಶಿಲ್ಪಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.'
    },
    ta: {
      name: 'காகதீய ருத்ரேஸ்வர (ராமப்பா) கோயில், பாலம்பேட்டை (யுனெஸ்கோ உலகப் பாரம்பரியச் சின்னம்)',
      location: 'பாலம்பேட்டை, முலுகு மாவட்டம்',
      state: 'தெலுங்கானா',
      patron_ruler: 'கணபதி தேவரின் தளபதி ரேசர்ல ருத்ரன் (சிற்பி: ராமப்பா)',
      century: 'பொ.ஊ. 13ஆம் நூற்றாண்டு (1213 / சக 1135)',
      architectural_style: 'நீரில் மிதக்கும் செங்கல் விமானம் & மணல் அடித்தள காகதீய கட்டிடக்கலை',
      historical_significance:
        '2021இல் யுனெஸ்கோ உலகப் பாரம்பரியச் சின்னமாக அறிவிக்கப்பட்டது. 1213இல் கட்டப்பட்ட இக்கோயில் மணல் அடித்தளம், நீரில் மிதக்கும் செங்கற்கள் மற்றும் மதனிகா நடனச் சிற்பங்களுக்குப் புகழ்பெற்றது.'
    },
    mr: {
      name: 'काकतीय रुद्रेश्वर (रामप्पा) मंदिर, पालमपेट (युनेस्को जागतिक वारसा स्थळ)',
      location: 'पालमपेट, मुलुगू जिल्हा',
      state: 'तेलंगणा',
      patron_ruler: 'सम्राट गणपती देवाचा सेनापती रेचर्ला रुद्र (शिल्पकार: रामप्पा)',
      century: 'इ.स. १३ वे शतक (१२१३ / शक ११३५)',
      architectural_style: 'तरंगणाऱ्या विटांचे विमान व वाळूचा पाया असलेले काकतीय मंदिर स्थापत्य',
      historical_significance:
        '२०२१ मध्ये युनेस्को जागतिक वारसा स्थळ म्हणून घोषित. १२१३ मध्ये बांधलेले हे मंदिर भूकंपरोधी वाळूचा पाया, पाण्यावर तरंगणाऱ्या विटा आणि मदनिका नृत्य शिल्पांसाठी जगप्रसिद्ध आहे.'
    },
    or: {
      name: 'କାକତୀୟ ରୁଦ୍ରେଶ୍ୱର (ରାମପ୍ପା) ମନ୍ଦିର, ପାଲମପେଟ (ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ ସ୍ଥଳ)',
      location: 'ପାଲମପେଟ, ମୁଲୁଗୁ ଜିଲ୍ଲା',
      state: 'ତେଲେଙ୍ଗାନା',
      patron_ruler: 'ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ସେନାପତି ରେଚର୍ଲା ରୁଦ୍ର (ଶିଳ୍ପୀ: ରାମପ୍ପା)',
      century: '୧୩ଶ ଶତାବ୍ଦୀ (୧୨୧୩ ଖ୍ରୀ.ଅ. / ଶକ ୧୧୩୫)',
      architectural_style: 'ଭାସମାନ ଇଟା ବିମାନ ଓ ବାଲି ମୂଳଦୁଆ ବିଶିଷ୍ଟ କାକତୀୟ ମନ୍ଦିର',
      historical_significance:
        '୨୦୨୧ରେ ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ ସ୍ଥଳ ଭାବେ ଘୋଷିତ। ୧୨୧୩ରେ ନିର୍ମିତ ଏହି ମନ୍ଦିର ଭୂମିକମ୍ପ-ରୋଧୀ ବାଲି ମୂଳଦୁଆ, ପାଣିରେ ଭାସୁଥିବା ଇଟା ଓ ମଦନିକା ଶିଳ୍ପ ପାଇଁ ବିଶ୍ୱപ്രସିଦ୍ଧ।'
    },
    bn: {
      name: 'কাকতীয় রুদ্রেশ্বর (রামাপ্পা) মন্দির, পালমপেট (ইউনেস্কো বিশ্ব ঐতিহ্য স্থান)',
      location: 'পালমপেট, মুলুগু জেলা',
      state: 'তেলেঙ্গানা',
      patron_ruler: 'সম্রাট গণপতি দেবের সেনাপতি রেচর্লা রুদ্র (শিল্পী: রামাপ্পা)',
      century: '১৩শ শতাব্দী (১২১৩ খ্রি. / শক ১১৩৫)',
      architectural_style: 'ভাসমান ইটের বিমান ও বালির ভিত্তি বিশিষ্ট কাকতীয় মন্দির',
      historical_significance:
        '২০২১ সালে ইউনেস্কো বিশ্ব ঐতিহ্য স্থান হিসেবে ঘোষিত। ১২১৩ খ্রিস্টাব্দে নির্মিত এই মন্দির ভূমিকম্প-প্রতিরোধী বালির ভিত্তি, জলে ভাসমান হালকা ইট এবং মদনিকা নৃত্য ভাস্কর্যের জন্য বিশ্ববিখ্যাত।'
    }
  },
  mon_ghanpur_temples: {
    hi: {
      name: 'कोटा गुल्लु (घनपुर काकतीय मंदिर समूह एवं जलाशय परिसर)',
      location: 'घनपुर (मुलुगु घनपुर), मुलुगु जिला',
      state: 'तेलंगाना',
      patron_ruler: 'सम्राट गणपति देव एवं काकतीय सामंत',
      century: 'प्रारंभिक 13वीं शताब्दी ई.',
      architectural_style: 'काकतीय किलेबंद पंचायतन एवं सभामंडप मंदिर परिसर',
      historical_significance:
        'स्थानीय रूप से कोटा गुल्लु ("किला मंदिर") के नाम से प्रसिद्ध इस परिसर में मुख्य गणपेश्वर शिव मंदिर के चारों ओर 22 सहायक मंदिर और गज-केसरी ब्रैकेट मूर्तियों से सुसज्जित सभामंडप स्थित हैं।'
    },
    te: {
      name: 'కోటగుళ్లు (ఘణపురం కాకతీయ దేవాలయాల సముదాయం & చెరువు)',
      location: 'ఘణపురం (ములుగు ఘణపురం), ములుగు జిల్లా',
      state: 'తెలంగాణ',
      patron_ruler: 'గణపతిదేవ చక్రవర్తి & కాకతీయ సామంతులు',
      century: 'క్రీ.శ. 13వ శతాబ్దం ప్రారంభం',
      architectural_style: 'కాకతీయ ప్రాకార పంచాయతన & సభామండప ఆలయ శైలి',
      historical_significance:
        'కోటగుళ్లుగా ప్రసిద్ధి చెందిన ఈ ఆలయ సముదాయంలో ప్రధాన గణపేశ్వర (రెడ్డి గుడి) ఆలయం చుట్టూ 22 ఉప ఆలయాలు, గజ-కేసరి మదనికా శిల్పాలతో కూడిన సభామండపం మరియు చారిత్రక ఘణపురం చెరువు ఉన్నాయి.'
    },
    kn: {
      name: 'ಕೋಟಗುಳ್ಳು (ಘನಪುರ ಕಾಕತೀಯ ದೇವಾಲಯಗಳ ಸಮೂಹ)',
      location: 'ಘನಪುರ, ಮುಲುಗು ಜಿಲ್ಲೆ',
      state: 'ತೆಲಂಗಾಣ',
      patron_ruler: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವ ಮತ್ತು ಕಾಕತೀಯ ಸಾಮಂತರು',
      century: 'ಕ್ರಿ.ಶ. 13ನೇ ಶತಮಾನದ ಆರಂಭ',
      architectural_style: 'ಕಾಕತೀಯ ಪಂಚಾಯತನ ಮತ್ತು ಸಭಾಮಂಡಪ ದೇವಾಲಯ ಸಂಕೀರ್ಣ',
      historical_significance:
        'ಕೋಟಗುಳ್ಳು ಎಂದು ಕರೆಯಲ್ಪಡುವ ಈ ಸಂಕೀರ್ಣದಲ್ಲಿ ಮುಖ್ಯ ಗಣಪೇಶ್ವರ ಶಿವ ದೇವಾಲಯದ ಸುತ್ತ 22 ಉಪ ದೇವಾಲಯಗಳು ಮತ್ತು ಗಜ-ಕೇಸರಿ ಶಿಲ್ಪಗಳಿವೆ.'
    },
    ta: {
      name: 'கோட்டகுல்லு (கனபூர் காகதீய கோயில்கள் தொகுப்பு)',
      location: 'கனபூர், முலுகு மாவட்டம்',
      state: 'தெலுங்கானா',
      patron_ruler: 'பேரரசர் கணபதி தேவர் & காகதீய சிற்றரசர்கள்',
      century: 'பொ.ஊ. 13ஆம் நூற்றாண்டின் தொடக்கம்',
      architectural_style: 'காகதீய பஞ்சாயதன & சபாமண்டபக் கோயில் வளாகம்',
      historical_significance:
        'கோட்டகுல்லு எனப்படும் இவ்வளாகத்தில் முதன்மை கணபேஸ்வரர் கோயிலைச் சுற்றி 22 துணை ஆலயங்களும் கஜ-கேசரி சிற்பங்களும் அமைந்துள்ளன.'
    },
    mr: {
      name: 'कोटा गुल्लु (घनपूर काकतीय मंदिर समूह आणि तलाव परिसर)',
      location: 'घनपूर, मुलुगू जिल्हा',
      state: 'तेलंगणा',
      patron_ruler: 'सम्राट गणपती देव आणि काकतीय सामंत',
      century: 'इ.स. १३ व्या शतकाची सुरुवात',
      architectural_style: 'काकतीय तटबंदीयुक्त पंचायतन आणि सभामंडप मंदिर संकुल',
      historical_significance:
        'कोटा गुल्लु म्हणून ओळखल्या जाणाऱ्या या संकुलात मुख्य गणपेश्वर मंदिराभोवती २२ उपमंदिरे आणि गज-केसरी शिल्पांनी युक्त सभामंडप आहे.'
    },
    or: {
      name: 'କୋଟା ଗୁଲ୍ଲୁ (ଘନପୁର କାକତୀୟ ମନ୍ଦିର ସମୂହ ଓ ଜଳାଶୟ)',
      location: 'ଘନପୁର, ମୁଲୁଗୁ ଜିଲ୍ଲା',
      state: 'ତେଲେଙ୍ଗାନା',
      patron_ruler: 'ସମ୍ରାଟ ଗଣପତି ଦେବ ଓ କାକତୀୟ ସାମନ୍ତ',
      century: 'ପ୍ରାରମ୍ଭିକ ୧୩ଶ ଶତାବ୍ଦୀ',
      architectural_style: 'କାକତୀୟ ପଞ୍ଚାୟତନ ଓ ସଭାମଣ୍ଡପ ମନ୍ଦିର ପରିସର',
      historical_significance:
        'କୋଟା ଗୁଲ୍ଲୁ ନାମରେ ପରିଚିତ ଏହି ପରିସରରେ ମୁଖ୍ୟ ଗଣପେଶ୍ୱର ମନ୍ଦିର ଚାରିপাଖରେ ୨୨ଟି ଉପ-ମନ୍ଦିର ଓ ଗଜ-କେସରୀ ଶିଳ୍ପ ରହିଛି।'
    },
    bn: {
      name: 'কোটা গুল্লু (ঘনপুর কাকতীয় মন্দির সমূহ ও জলাশয় প্রাঙ্গণ)',
      location: 'ঘনপুর, মুলুগু জেলা',
      state: 'তেলেঙ্গানা',
      patron_ruler: 'সম্রাট গণপতি দেব ও কাকতীয় সামন্তগণ',
      century: 'প্রারম্ভিক ১৩শ শতাব্দী',
      architectural_style: 'কাকতীয় পঞ্চায়তন ও সভামণ্ডপ মন্দির চত্বর',
      historical_significance:
        'কোটা গুল্লু নামে পরিচিত এই চত্বরে প্রধান গণপেশ্বর শিব মন্দিরকে ঘিরে ২২টি উপ-মন্দির এবং গজ-কেশরী ভাস্কর্যশোভিত সভামণ্ডপ রয়েছে।'
    }
  }
};

export const KAKATIYA_LOCATION_TRANSLATIONS: Record<
  string,
  Partial<Record<LanguageCode, LocationTranslation>>
> = {
  loc_orugallu_warangal: {
    hi: {
      name: 'ओरुगल्लु साम्राज्य गढ़ (वारंगल किला)',
      ancient_name: 'ओरुगल्लु / एकशिलानगर',
      modern_district: 'वारंगल',
      modern_state: 'तेलंगाना',
      summary:
        '12वीं शताब्दी के अंत से 1323 ई. तक काकतीय साम्राज्य की राजधानी, जो तीन संकेंद्रित सुरक्षा दीवारों (मिट्टी की बाहरी दीवार, 45 बुर्जों वाली ग्रेनाइट की मध्य प्राचीर और आंतरिक गढ़) तथा गहरी खाइयों से सुरक्षित थी।',
      archaeological_findings:
        'भारतीय पुरातत्व सर्वेक्षण (ASI) के उत्खनन में स्वयंभूदेव मंदिर की नींव, चार एकाश्म कीर्ति तोरण, एकशिला पहाड़ी, कुश महल और बावड़ियाँ प्राप्त हुई हैं।'
    },
    te: {
      name: 'ఓరుగల్లు సామ్రాజ్య దుర్గం (వరంగల్ కోట)',
      ancient_name: 'ఓరుగల్లు / ఏకశిలానగరం',
      modern_district: 'వరంగల్',
      modern_state: 'తెలంగాణ',
      summary:
        '12వ శతాబ్దం చివరి నుండి క్రీ.శ. 1323 వరకు కాకతీయ సామ్రాజ్య రాజధాని. మట్టి కోట, 45 బురుజులు గల కృష్ణశిలా రాతి కోట, అంతర్గత కోట అనే మూడు వలయాల ప్రాకారాలతో మరియు రెండు కందకాలతో నిర్మించబడింది.',
      archaeological_findings:
        'పురావస్తు తవ్వకాలలో స్వయంభూదేవ ఆలయ పునాదులు, నాలుగు ఏకశిలా కీర్తి తోరణాలు, ఏకశిలా గుట్ట, కుష్ మహల్ మరియు మెట్ల బావులు వెలుగుచూశాయి.'
    },
    kn: {
      name: 'ಓರುಗಲ್ಲು ಸಾಮ್ರಾಜ್ಯ ಕೋಟೆ (ವರಂಗಲ್ ಕೋಟೆ)',
      ancient_name: 'ಓರುಗಲ್ಲು / ಏಕಶಿಲಾನಗರ',
      modern_district: 'ವರಂಗಲ್',
      modern_state: 'ತೆಲಂಗಾಣ',
      summary:
        'ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ ಕೋಟೆ; ಮೂರು ಸುತ್ತಿನ ಕೋಟೆ ಗೋಡೆಗಳು ಮತ್ತು 45 ಬುರುಜುಗಳಿಂದ ಕೂಡಿದೆ.',
      archaeological_findings:
        'ಸ್ವಯಂಭೂದೇವ ದೇವಾಲಯದ ಅವಶೇಷಗಳು, ನಾಲ್ಕು ಏಕಶಿಲಾ ಕೀರ್ತಿ ತೋರಣಗಳು ಮತ್ತು ಮೆಟ್ಟಿಲು ಬಾವಿಗಳು ಪತ್ತೆಯಾಗಿವೆ.'
    },
    ta: {
      name: 'ஓருகல்லு பேரரசு கோட்டை (வாரங்கல் கோட்டை)',
      ancient_name: 'ஓருகல்லு / ஏகசிலாநகரம்',
      modern_district: 'வாரங்கல்',
      modern_state: 'தெலுங்கானா',
      summary:
        'காகதீயப் பேரரசின் தலைநகர் கோட்டை; மூன்று வட்ட அரண்கள் மற்றும் 45 கொத்தளங்களுடன் அமைக்கப்பட்டது.',
      archaeological_findings:
        'சுயம்புதேவர் கோயில் அடித்தளம், நான்கு ஒற்றைக்கல் கீர்த்தி தோரணங்கள் மற்றும் படிக்கிணறுகள் கண்டறியப்பட்டுள்ளன.'
    },
    mr: {
      name: 'ओरुगल्लु साम्राज्य दुर्ग (वरंगळ किल्ला)',
      ancient_name: 'ओरुगल्लु / एकशिलानगर',
      modern_district: 'वरंगळ',
      modern_state: 'तेलंगणा',
      summary:
        'काकतीय साम्राज्याची राजधानी; तीन समकेंद्रित तटबंदी आणि ४५ बुरुजांनी युक्त अभेद्य किल्ला.',
      archaeological_findings:
        'स्वयंभूदेव मंदिराचा पाया, चार एकाश्म कीर्ती तोरणे आणि बारवांचे अवशेष आढळले आहेत.'
    },
    or: {
      name: 'ଓରୁଗଲ୍ଲୁ ସାମ୍ରାଜ୍ୟ ଦୁର୍ଗ (ୱାରଙ୍ଗଲ ଦୁର୍ଗ)',
      ancient_name: 'ଓରୁଗଲ୍ଲୁ / ଏକଶିଳାନଗର',
      modern_district: 'ୱାରଙ୍ଗଲ',
      modern_state: 'ତେଲେଙ୍ଗାନା',
      summary:
        'କାକତୀୟ ସାମ୍ରାଜ୍ୟର ରାଜଧାନୀ ଦୁର୍ଗ; ତିନୋଟି ସମକେନ୍ଦ୍ରିକ ପ୍ରାଚୀର ଓ ୪୫ଟି ବୁରୁଜ ଦ୍ୱାରା ସୁରକ୍ଷିତ।',
      archaeological_findings:
        'ସ୍ୱୟମ୍ଭୂଦେବ ମନ୍ଦିର ମୂଳଦୁଆ, ଚାରୋଟି ଏକଶିଳା କୀର୍ତ୍ତି ତୋରଣ ଓ ପାହାଚ କୂଅ ଆବିଷ୍କୃତ ହୋଇଛି।'
    },
    bn: {
      name: 'ওরুগল্লু সাম্রাজ্য দুর্গ (ওয়ারাঙ্গল দুর্গ)',
      ancient_name: 'ওরুগল্লু / একশিলানগর',
      modern_district: 'ওয়ারাঙ্গল',
      modern_state: 'তেলেঙ্গানা',
      summary:
        'কাকতীয় সাম্রাজ্যের রাজধানী দুর্গ; তিনটি সমকেন্দ্রিক প্রাচীর ও ৪৫টি বুরুজ দ্বারা সুরক্ষিত।',
      archaeological_findings:
        'স্বয়ম্ভুদেব মন্দিরের ভিত্তি, চারটি একশিলা কীর্তি তোরণ এবং সোপানযুক্ত কূপ আবিষ্কৃত হয়েছে।'
    }
  },
  loc_anumakonda_hanamkonda: {
    hi: {
      name: 'अनुमकोंडा प्रारंभिक काकतीय राजधानी एवं गिरि दुर्ग',
      ancient_name: 'अनुमकोंडा / हनुमकोंडा विषय',
      modern_district: 'हनमकोंडा (वारंगल)',
      modern_state: 'तेलंगाना',
      summary:
        'बेत प्रथम और प्रोल प्रथम से लेकर रुद्रदेव (लगभग 1000–1195 ई.) तक प्रारंभिक काकतीय शासकों की राजधानी, जहाँ 1163 ई. का सहस्र स्तंभ मंदिर और पद्माक्षी पहाड़ी मंदिर स्थित हैं।',
      archaeological_findings:
        'ग्रेनाइट पहाड़ी किला, 1163 ई. का हजार स्तंभ मंदिर, पद्माक्षी गुफा मंदिर और प्रारंभिक कालामुख मठ के अवशेष।'
    },
    te: {
      name: 'అనుమకొండ తొలి కాకతీయ రాజధాని & గిరి దుర్గం',
      ancient_name: 'అనుమకొండ / హనుమకొండ విషయం',
      modern_district: 'హనుమకొండ (వరంగల్)',
      modern_state: 'తెలంగాణ',
      summary:
        'మొదటి బేతరాజు, మొదటి ప్రోలరాజు నుండి రుద్రదేవుని వరకు (క్రీ.శ. 1000–1195) కాకతీయుల తొలి రాజధాని. ఇక్కడే 1163 నాటి వేయిస్తంభాల గుడి మరియు పద్మాక్షి గుట్ట ఆలయం ఉన్నాయి.',
      archaeological_findings:
        'గ్రానైట్ కొండ కోట ప్రాకారాలు, వేయిస్తంభాల గుడి, పద్మాక్షి జైన-శైవ గుహాలయం మరియు కాలాముఖ మఠ ఆధారాలు.'
    },
    kn: {
      name: 'ಅನುಮಕೊಂಡ ಆರಂಭಿಕ ಕಾಕತೀಯ ರಾಜಧಾನಿ ಮತ್ತು ಗಿರಿ ದುರ್ಗ',
      ancient_name: 'ಅನುಮಕೊಂಡ / ಹನುಮಕೊಂಡ ವಿಷಯ',
      modern_district: 'ಹನುಮಕೊಂಡ',
      modern_state: 'ತೆಲಂಗಾಣ',
      summary:
        'ಮೊದಲನೇ ಬೇತ ಮತ್ತು ಪ್ರೋಲರಿಂದ ರುದ್ರದೇವನವರೆಗೆ (1000–1195) ಕಾಕತೀಯರ ಮೊದಲ ರಾಜಧಾನಿ; 1163ರ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ಇಲ್ಲಿದೆ.',
      archaeological_findings:
        'ಬೆಟ್ಟದ ಕೋಟೆ ಗೋಡೆಗಳು, ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ಮತ್ತು ಪದ್ಮಾಕ್ಷಿ ಗುಹಾ ದೇವಾಲಯ.'
    },
    ta: {
      name: 'அனுமகொண்டா தொடக்கக் கால காகதீயத் தலைநகர் & மலைக்கோட்டை',
      ancient_name: 'அனுமகொண்டா / ஹனம்கொண்டா விஷயம்',
      modern_district: 'ஹனம்கொண்டா',
      modern_state: 'தெலுங்கானா',
      summary:
        'முதலாம் பேதराजன் முதல் உருத்ரதேவர் வரை (1000–1195) காகதீயரின் முதல் தலைநகர்; 1163ஆம் ஆண்டின் ஆயிரங்கால் கோயில் இங்குள்ளது.',
      archaeological_findings:
        'மலைக்கோட்டை அரண்கள், ஆயிரங்கால் கோயில் மற்றும் பத்மாக்ஷி குகைக் கோயில்.'
    },
    mr: {
      name: 'अनुमकोंडा प्रारंभिक काकतीय राजधानी व गिरी दुर्ग',
      ancient_name: 'अनुमकोंडा / हनुमकोंडा विषय',
      modern_district: 'हनमकोंडा',
      modern_state: 'तेलंगणा',
      summary:
        'बेत पहिल्यापासून रुद्रदेवापर्यंत (१०००–११९५) काकतीयांची पहिली राजधानी; येथे ११६३ चे हजार स्तंभ मंदिर आहे.',
      archaeological_findings:
        'डोंगरी किल्ल्याची तटबंदी, हजार स्तंभ मंदिर आणि पद्माक्षी लेणी मंदिर.'
    },
    or: {
      name: 'ଅନୁମକୋଣ୍ଡା ପ୍ରାରମ୍ଭିକ କାକତୀୟ ରାଜଧାନୀ ଓ ଗିରି ଦୁର୍ଗ',
      ancient_name: 'ଅନୁମକୋଣ୍ଡା / ହନୁମକୋଣ୍ଡା ବିଷୟ',
      modern_district: 'ହନମକୋଣ୍ଡା',
      modern_state: 'ତେଲେଙ୍ଗାନା',
      summary:
        'ପ୍ରଥମ ବେତଙ୍କଠାରୁ ରୁଦ୍ରଦେବଙ୍କ ପର୍ଯ୍ୟନ୍ତ (୧୦୦୦–୧୧୯୫) କାକତୀୟଙ୍କ ପ୍ରଥମ ରାଜଧାନୀ; ଏଠାରେ ୧୧୬୩ର ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ଅବସ୍ଥିତ।',
      archaeological_findings:
        'ପାହାଡ଼ ଦୁର୍ଗ ପ୍ରାଚୀର, ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ଓ ପଦ୍ମାକ୍ଷୀ ଗୁମ୍ଫା ମନ୍ଦିର।'
    },
    bn: {
      name: 'অনুমকোন্ডা প্রারম্ভিক কাকতীয় রাজধানী ও গিরি দুর্গ',
      ancient_name: 'অনুমকোন্ডা / হনুমকোন্ডা বিষয়',
      modern_district: 'হনমকোন্ডা',
      modern_state: 'তেলেঙ্গানা',
      summary:
        'প্রথম বেত থেকে রুদ্রদেব পর্যন্ত (১০০০–১১৯৫) কাকতীয়দের প্রথম রাজধানী; এখানে ১১৬৩ খ্রিস্টাব্দের সহস্র স্তম্ভ মন্দির অবস্থিত।',
      archaeological_findings:
        'পাহাড়ি দুর্গের প্রাচীর, সহস্র স্তম্ভ মন্দির এবং পদ্মাক্ষী গুহা মন্দির।'
    }
  },
  loc_palampet_ramappa: {
    hi: {
      name: 'पालापेट एवं रामप्पा चेरुवु जल-मंदिर परिसर',
      ancient_name: 'पालापेट / रुद्रसमुद्रम',
      modern_district: 'मुलुगु',
      modern_state: 'तेलंगाना',
      summary:
        'सम्राट गणपति देव के सेनापति रेचर्ला रुद्र द्वारा 1213 ई. में निर्मित समन्वित काकतीय मंदिर और जलाशय परिसर, जिसमें रामप्पा झील और यूनेस्को विश्व धरोहर रुद्रेश्वर (रामप्पा) मंदिर शामिल हैं।',
      archaeological_findings:
        'सैंडबॉक्स नींव पर निर्मित तारांकित मंदिर, तैरने वाली ईंटों का शिखर और 13वीं शताब्दी के रामप्पा जलाशय के पाषाण स्लुइस गेट।'
    },
    te: {
      name: 'పాలంపేట & రామప్ప చెరువు జల-ఆలయ సముదాయం',
      ancient_name: 'పాలంపేట / రుద్రసముద్రం',
      modern_district: 'ములుగు',
      modern_state: 'తెలంగాణ',
      summary:
        'గణపతిదేవ చక్రవర్తి సేనాని రేచర్ల రుద్రుడు క్రీ.శ. 1213లో నిర్మించిన సమగ్ర ఆలయ మరియు జలాశయ సముదాయం. ఇందులో రామప్ప చెరువు మరియు యునెస్కో గుర్తింపు పొందిన రామప్ప దేవాలయం ఉన్నాయి.',
      archaeological_findings:
        'ఇసుక పునాదిపై నిర్మించిన నక్షత్రాకార ఆలయం, నీటిపై తేలే ఇటుకల విమానం మరియు 13వ శతాబ్దపు రామప్ప చెరువు రాతి తూములు.'
    },
    kn: {
      name: 'ಪಾಲಂಪೇಟ ಮತ್ತು ರಾಮಪ್ಪ ಕೆರೆ-ದೇವಾಲಯ ಸಂಕೀರ್ಣ',
      ancient_name: 'ಪಾಲಂಪೇಟ / ರುದ್ರಸಮುದ್ರಂ',
      modern_district: 'ಮುಲುಗು',
      modern_state: 'ತೆಲಂಗಾಣ',
      summary:
        '1213ರಲ್ಲಿ ಸೇನಾಪತಿ ರೇಚರ್ಲ ರುದ್ರನು ನಿರ್ಮಿಸಿದ ರಾಮಪ್ಪ ಕೆರೆ ಮತ್ತು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ರಾಮಪ್ಪ ದೇವಾಲಯದ ಸಂಕೀರ್ಣ.',
      archaeological_findings:
        'ಮರಳು ತಳಹದಿಯ ದೇವಾಲಯ, ತೇಲುವ ಇಟ್ಟಿಗೆಗಳ ವಿಮಾನ ಮತ್ತು 13ನೇ ಶತಮಾನದ ಕೆರೆಯ ತೂಬುಗಳು.'
    },
    ta: {
      name: 'பாலம்பேட்டை & ராமப்பா ஏரி-கோயில் வளாகம்',
      ancient_name: 'பாலம்பேட்டை / ருத்ரசமுத்திரம்',
      modern_district: 'முலுகு',
      modern_state: 'தெலுங்கானா',
      summary:
        '1213இல் தளபதி ரேசர்ல ருத்ரனால் உருவாக்கப்பட்ட ராமப்பா ஏரி மற்றும் யுனெஸ்கோ உலகப் பாரம்பரிய ராமப்பா கோயில் வளாகம்.',
      archaeological_findings:
        'மணல் அடித்தளக் கோயில், மிதக்கும் செங்கல் விமானம் மற்றும் 13ஆம் நூற்றாண்டு மதகுகள்.'
    },
    mr: {
      name: 'पालमपेट आणि रामप्पा तलाव-मंदिर संकुल',
      ancient_name: 'पालमपेट / रुद्रसमुद्रम',
      modern_district: 'मुलुगू',
      modern_state: 'तेलंगणा',
      summary:
        '१२१३ मध्ये सेनापती रेचर्ला रुद्राने बांधलेला रामप्पा तलाव आणि युनेस्को जागतिक वारसा रामप्पा मंदिर परिसर.',
      archaeological_findings:
        'वाळूच्या पायावरील मंदिर, तरंगणाऱ्या विटांचे शिखर आणि १३ व्या शतकातील तलावाचे दगडी दरवाजे.'
    },
    or: {
      name: 'ପାଲମପେଟ ଓ ରାମପ୍ପା ହ୍ରଦ-ମନ୍ଦିର ପରିସର',
      ancient_name: 'ପାଲମପେଟ / ରୁଦ୍ରସମୁଦ୍ରମ',
      modern_district: 'ମୁଲୁଗୁ',
      modern_state: 'ତେଲେଙ୍ଗାନା',
      summary:
        '୧୨୧୩ରେ ସେନାପତି ରେଚର୍ଲା ରୁଦ୍ରଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ରାମପ୍ପା ହ୍ରଦ ଓ ୟୁନେସ୍କୋ ବିଶ୍ୱ ଐତିହ୍ୟ ରାମପ୍ପା ମନ୍ଦିର ପରିସର।',
      archaeological_findings:
        'ବାଲି ମୂଳଦୁଆ ମନ୍ଦିର, ଭାସମାନ ଇଟା ବିମାନ ଓ ୧୩ଶ ଶତାବ୍ଦୀର ପ୍ରସ୍ତର ଜଳद्वार।'
    },
    bn: {
      name: 'পালমপেট ও রামাপ্পা হ্রদ-মন্দির চত্বর',
      ancient_name: 'পালমপেট / রুদ্রসমুদ্রম',
      modern_district: 'মুলুগু',
      modern_state: 'তেলেঙ্গানা',
      summary:
        '১২১৩ খ্রিস্টাব্দে সেনাপতি রেচর্লা রুদ্র কর্তৃক নির্মিত রামাপ্পা হ্রদ এবং ইউনেস্কো বিশ্ব ঐতিহ্য রামাপ্পা মন্দির চত্বর।',
      archaeological_findings:
        'বালির ভিত্তির মন্দির, ভাসমান ইটের বিমান এবং ১৩শ শতাব্দীর প্রস্তর জলদ্বার।'
    }
  },
  loc_motupalli_port: {
    hi: {
      name: 'मोटुपल्ली अंतरराष्ट्रीय समुद्री बंदरगाह (देश्युयक्कोंडपट्टण)',
      ancient_name: 'मोटुपल्ली / वेलानगर / मुतफिली',
      modern_district: 'बापट्ला / प्रकाशम तट',
      modern_state: 'आंध्र प्रदेश',
      summary:
        'बंगाल की खाड़ी पर काकतीय साम्राज्य का प्रमुख समुद्री व्यापारिक बंदरगाह, जहाँ सम्राट गणपति देव ने 1244 ई. में अभय शासन स्तंभ स्थापित किया और जहाँ 1289–1292 ई. में मार्को पोलो उतरे थे।',
      archaeological_findings:
        'वीरभद्रस्वामी और कोदंडरामस्वामी मंदिर परिसर, अभय शासन स्तंभ लेख, चीनी सेलाडॉन मिट्टी के बर्तन और अरब व्यापारिक अवशेष।'
    },
    te: {
      name: 'మోటుపల్లి అంతర్జాతీయ సముద్ర ఓడరేవు (దేశ్యుయక్కొండపట్టణం)',
      ancient_name: 'మోటుపల్లి / వేలానగరం / ముత్ఫిలి',
      modern_district: 'బాపట్ల / ప్రకాశం తీరం',
      modern_state: 'ఆంధ్రప్రదేశ్',
      summary:
        'బంగాళాఖాత తీరాన కాకతీయ సామ్రాజ్యపు ప్రధాన అంతర్జాతీయ ఓడరేవు. ఇక్కడే గణపతిదేవ చక్రవర్తి క్రీ.శ. 1244లో ప్రసిద్ధ అభయ శాసనాన్ని వేయించాడు మరియు మార్కో పోలో (1289–1292) పర్యటించాడు.',
      archaeological_findings:
        'వీరభద్రస్వామి, కోదండరామస్వామి ఆలయాలు, అభయ శాసన స్తంభం, చైనా సెలడాన్ పింగాణీ ముక్కలు మరియు విదేశీ వాణిజ్య ఆధారాలు.'
    },
    kn: {
      name: 'ಮೋಟುಪಲ್ಲಿ ಅಂತಾರಾಷ್ಟ್ರೀಯ ಕಡಲ ಬಂದರು',
      ancient_name: 'ಮೋಟುಪಲ್ಲಿ / ಮುತ್ಫಿಲಿ',
      modern_district: 'ಬಾಪಟ್ಲ / ಪ್ರಕಾಶಂ ಕರಾವಳಿ',
      modern_state: 'ಆಂಧ್ರಪ್ರದೇಶ',
      summary:
        'ಬಂಗಾಳ ಕೊಲ್ಲಿಯ ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯದ ಪ್ರಮುಖ ಬಂದರು; ಗಣಪತಿದೇವನು 1244ರಲ್ಲಿ ಅಭಯ ಶಾಸನ ಸ್ಥಾಪಿಸಿದ ಮತ್ತು ಮಾರ್ಕೊ ಪೋಲೊ ಭೇಟಿ ನೀಡಿದ ಸ್ಥಳ.',
      archaeological_findings:
        'ವೀರಭದ್ರಸ್ವಾಮಿ ದೇವಾಲಯ, ಅಭಯ ಶಾಸನ ಕಂಬ ಮತ್ತು ಚೀನೀ ಸೆಲಡಾನ್ ಮಡಕೆ ಅವಶೇಷಗಳು.'
    },
    ta: {
      name: 'மோட்டுப்பள்ளி பன்னாட்டுக் கடல் துறைமுகம் (தேசியுயக்கொண்டபட்டினம்)',
      ancient_name: 'மோட்டுப்பள்ளி / முத்ஃபிலி',
      modern_district: 'பாபட்லா / பிரகாசம் கடற்கரை',
      modern_state: 'ஆந்திரப் பிரதேசம்',
      summary:
        'வங்காள விரிகுடாவில் காகதீயப் பேரரசின் முதன்மைத் துறைமுகம்; கணபதி தேவர் 1244இல் அபய சாசனம் பொறித்ததும் மார்க்கோ போலோ வருகை தந்ததுமான இடம்.',
      archaeological_findings:
        'வீரபத்ரசுவாமி கோயில், அபய சாசனத் தூண் மற்றும் சீன செலடான் மட்பாண்ட எச்சங்கள்.'
    },
    mr: {
      name: 'मोटुपल्ली आंतरराष्ट्रीय सागरी बंदर',
      ancient_name: 'मोटुपल्ली / मुतफिली',
      modern_district: 'बापट्ला / प्रकाशम किनारा',
      modern_state: 'आंध्र प्रदेश',
      summary:
        'बंगालच्या उपसागरावरील काकतीय साम्राज्याचे प्रमुख बंदर; येथे गणपती देवाने १२४४ मध्ये अभय शासन स्तंभ उभारला आणि मार्को पोलोने भेट दिली.',
      archaeological_findings:
        'वीरभद्रस्वामी मंदिर, अभय शासन स्तंभ आणि चिनी सेलाडॉन भांड्यांचे अवशेष.'
    },
    or: {
      name: 'ମୋଟୁପଲ୍ଲୀ ଆନ୍ତର୍ଜାତୀୟ ସାମୁଦ୍ରିକ ବନ୍ଦର',
      ancient_name: 'ମୋଟୁପଲ୍ଲୀ / ମୁତଫିଲି',
      modern_district: 'ବାପଟ୍ଲା / ପ୍ରକାଶମ ଉପକୂଳ',
      modern_state: 'ଆନ୍ଧ୍ର ପ୍ରଦେଶ',
      summary:
        'ବଙ୍ଗୋପସାଗର ତীরରେ କାକତୀୟ ସାମ୍ରାଜ୍ୟର ପ୍ରମୁଖ ବନ୍ଦର; ଏଠାରେ ଗଣପତି ଦେବ ୧୨୪୪ରେ ଅଭୟ ଶାସନ ସ୍ତମ୍ଭ ସ୍ଥାପନ କରିଥିଲେ ଓ ମାର୍କୋ ପୋଲୋ ଭ୍ରମଣ କରିଥିଲେ।',
      archaeological_findings:
        'ବୀରଭଦ୍ରସ୍ୱାମୀ ମନ୍ଦିର, ଅଭୟ ଶାସନ ସ୍ତମ୍ଭ ଓ ଚୀନ ସେଲାଡନ ମାଟିପାତ୍ର ଅବଶେଷ।'
    },
    bn: {
      name: 'মোতুপল্লী আন্তর্জাতিক সামুদ্রিক বন্দর',
      ancient_name: 'মোতুপল্লী / মুতফিলি',
      modern_district: 'বাপট্লা / প্রকাশম উপকূল',
      modern_state: 'অন্ধ্রপ্রদেশ',
      summary:
        'বঙ্গোপসাগর উপকূলে কাকতীয় সাম্রাজ্যের প্রধান বন্দর; এখানে গণপতি দেব ১২৪৪ খ্রিস্টাব্দে অভয় শাসন স্তম্ভ স্থাপন করেন এবং মার্কো পোলো ভ্রমণ করেন।',
      archaeological_findings:
        'বীরভদ্রস্বামী মন্দির, অভয় শাসন স্তম্ভ এবং চীনা সেলাডন মৃৎপাত্রের অবশেষ।'
    }
  }
};

export const KAKATIYA_INSCRIPTION_TRANSLATIONS: Record<
  string,
  Partial<
    Record<
      LanguageCode,
      {
        name?: string;
        ruler?: string;
        location?: string;
        dynasty?: string;
        script?: string;
        language?: string;
        era_or_date?: string;
        summary?: string;
        english_translation?: string;
        scholarly_references?: string[];
      }
    >
  >
> = {
  insc_anumakonda_1163: {
    hi: {
      name: 'रुद्रदेव का अनुमकोंडा सहस्र स्तंभ मंदिर शिलालेख (1163 ई.)',
      ruler: 'रुद्रदेव (प्रतापरुद्र प्रथम)',
      location: 'श्री रुद्रेश्वर स्वामी (हजार स्तंभ) मंदिर, हनमकोंडा, तेलंगाना',
      dynasty: 'काकतीय राजवंश',
      script: 'तेलुगु-कन्नड़ लिपि',
      language: 'संस्कृत पद्य (अचिंतेंद्र द्वारा रचित)',
      era_or_date: 'शक 1084, चित्रभानु, माघ शुक्ल त्रयोदशी (20 जनवरी 1163 ई.)',
      summary:
        'हनमकोंडा के हजार स्तंभ मंदिर में काले बेसाल्ट स्तंभ के चारों फलकों पर उत्कीर्ण यह शिलालेख प्रोल द्वितीय और रुद्रदेव की विजयों तथा कल्याणी चालुक्यों से काकतीय साम्राज्य की पूर्ण सार्वभौम स्वतंत्रता की घोषणा करता है।',
      english_translation:
        'शक संवत 1084 (20 जनवरी 1163 ई.) में महामंडलेश्वर काकतीय रुद्रदेव ने डोम्मराज, मेदराज, मैलिगिदेव और चोडोदय को परास्त कर स्वतंत्र सार्वभौम शासन स्थापित किया और अनुमकोंडा में रुद्रेश्वर, वासुदेव एवं सूर्यदेव के त्रिकूट मंदिर की प्रतिष्ठा की।'
    },
    te: {
      name: 'రుద్రదేవుని అనుమకొండ వేయిస్తంభాల గుడి శిలాశాసనం (1163)',
      ruler: 'రుద్రదేవ మహారాజు (మొదటి ప్రతాపరుద్రుడు)',
      location: 'శ్రీ రుద్రేశ్వర స్వామి (వేయిస్తంభాల) ఆలయం, హనుమకొండ, తెలంగాణ',
      dynasty: 'కాకతీయ రాజవంశం',
      script: 'తెలుగు-కన్నడ లిపి',
      language: 'సంస్కృత పద్యం (అచింతేంద్ర విరచితం)',
      era_or_date: 'శక 1084, చిత్రభాను, మాఘ శుద్ధ త్రయోదశి (20 జనవరి 1163)',
      summary:
        'హనుమకొండ వేయిస్తంభాల గుడిలో నల్ల రాతి స్తంభంపై నాలుగు వైపులా చెక్కబడిన ఈ చారిత్రక శాసనం రెండవ ప్రోలరాజు మరియు రుద్రదేవుని విజయాలను, కాకతీయ స్వతంత్ర సార్వభౌమ ప్రకటనను నమోదు చేసింది.',
      english_translation:
        'శక వర్షం 1084 (20 జనవరి 1163) నాడు కాకతీయ రుద్రదేవ మహారాజు దొమ్మరాజు, మేడరాజు, మైలిగిదేవుడు, చోడోదయులను జయించి స్వతంత్ర సార్వభౌమత్వాన్ని స్థాపించి అనుమకొండలో రుద్రేశ్వర, వాసుదేవ, సూర్యదేవ త్రికూట ఆలయాన్ని ప్రతిష్ఠించాడు.'
    },
    kn: {
      name: 'ರುದ್ರದೇವನ ಅನುಮಕೊಂಡ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ಶಾಸನ (1163)',
      ruler: 'ರುದ್ರದೇವ (ಮೊದಲನೇ ಪ್ರತಾಪರುದ್ರ)',
      location: 'ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ, ಹನುಮಕೊಂಡ, ತೆಲಂಗಾಣ',
      dynasty: 'ಕಾಕತೀಯ ರಾಜವಂಶ',
      era_or_date: 'ಶಕ 1084 (20 ಜನವರಿ 1163)',
      summary:
        'ಎರಡನೇ ಪ್ರೋಲ ಮತ್ತು ರುದ್ರದೇವನ ವಿಜಯಗಳನ್ನು ಹಾಗೂ ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯದ ಸಂಪೂರ್ಣ ಸ್ವಾತಂತ್ರ್ಯವನ್ನು ಘೋಷಿಸುವ ಪ್ರಮುಖ ಶಾಸನ.'
    },
    ta: {
      name: 'உருத்ரதேவரின் அனுமகொண்டா ஆயிரங்கால் கோயில் கல்வெட்டு (1163)',
      ruler: 'உருத்ரதேவர் (முதலாம் பிரதாபருத்ரர்)',
      location: 'ஆயிரங்கால் கோயில், ஹனம்கொண்டா, தெலுங்கானா',
      dynasty: 'காகதீய வம்சம்',
      era_or_date: 'சக 1084 (20 ஜனவரி 1163)',
      summary:
        'இரண்டாம் புரோலன் மற்றும் உருத்ரதேவரின் வெற்றிகளையும் காகதீயப் பேரரசின் முழு சுதந்திரத்தையும் அறிவிக்கும் வரலாற்றுக் கல்வெட்டு.'
    },
    mr: {
      name: 'रुद्रदेवाचा अनुमकोंडा हजार स्तंभ मंदिर शिलालेख (११६३)',
      ruler: 'रुद्रदेव (प्रतापरुद्र पहिला)',
      location: 'हजार स्तंभ मंदिर, हनमकोंडा, तेलंगणा',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक १०८४ (२० जानेवारी ११६३)',
      summary:
        'प्रोल दुसरा आणि रुद्रदेवाच्या विजयांची व काकतीय साम्राज्याच्या पूर्ण सार्वभौम स्वातंत्र्याची नोंद करणारा शिलालेख.'
    },
    or: {
      name: 'ରୁଦ୍ରଦେବଙ୍କ ଅନୁମକୋଣ୍ଡା ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ଶିଳାଲେଖ (୧୧୬୩)',
      ruler: 'ରୁଦ୍ରଦେବ (ପ୍ରଥମ ପ୍ରତାପରୁଦ୍ର)',
      location: 'ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର, ହନମକୋଣ୍ଡା, ତେଲେଙ୍ଗାନା',
      dynasty: 'କାକତୀୟ ରାଜବଂଶ',
      era_or_date: 'ଶକ ୧୦୮୪ (୨୦ ଜାନୁଆରୀ ୧୧୬୩)',
      summary:
        'ଦ୍ୱିତୀୟ ପ୍ରୋଲ ଓ ରୁଦ୍ରଦେବଙ୍କ ବିଜୟ ଏବଂ କାକତୀୟ ସାମ୍ରାଜ୍ୟର ପୂର୍ଣ୍ଣ ସ୍ୱାଧୀନତା ଘୋଷଣା କରୁଥିବା ପ୍ରମୁଖ ଶିଳାଲେଖ।'
    },
    bn: {
      name: 'রুদ্রদেবের অনুমকোন্ডা সহস্র স্তম্ভ মন্দির শিলালিপি (১১৬৩)',
      ruler: 'রুদ্রদেব (প্রথম প্রতাপরুদ্র)',
      location: 'সহস্র স্তম্ভ মন্দির, হনমকোন্ডা, তেলেঙ্গানা',
      dynasty: 'কাকতীয় রাজবংশ',
      era_or_date: 'শক ১০৮৪ (২০ জানুয়ারি ১১৬৩)',
      summary:
        'দ্বিতীয় প্রোল ও রুদ্রদেবের বিজয় এবং কাকতীয় সাম্রাজ্যের পূর্ণ সার্বভৌম স্বাধীনতা ঘোষণাকারী প্রামাণ্য শিলালিপি।'
    }
  },
  insc_motupalli_1244: {
    hi: {
      name: 'सम्राट गणपति देव का मोटुपल्ली अभय शासन स्तंभ लेख (1244 ई.)',
      ruler: 'सम्राट गणपति देव',
      location: 'वीरभद्रस्वामी मंदिर मंडप स्तंभ, मोटुपल्ली बंदरगाह, आंध्र प्रदेश',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक 1166, क्रोधी (1244 ई.)',
      summary:
        'मोटुपल्ली बंदरगाह पर सम्राट गणपति देव द्वारा जारी किया गया प्रसिद्ध समुद्री व्यापार सुरक्षा चार्टर (अभय शासन), जिसने तूफान में क्षतिग्रस्त जहाजों के माल की जब्ती को समाप्त किया और विदेशी व्यापारियों को पूर्ण सुरक्षा व पारदर्शी सीमा-शुल्क की गारंटी दी।'
    },
    te: {
      name: 'గణపతిదేవ చక్రవర్తి మోటుపల్లి అభయ శాసనం (1244)',
      ruler: 'గణపతిదేవ చక్రవర్తి',
      location: 'వీరభద్రస్వామి ఆలయ మండప స్తంభం, మోటుపల్లి ఓడరేవు, ఆంధ్రప్రదేశ్',
      dynasty: 'కాకతీయ రాజవంశం',
      era_or_date: 'శక 1166, క్రోధి (క్రీ.శ. 1244)',
      summary:
        'సముద్ర వ్యాపారులకు ప్రాణంకంటే ధనమే ప్రియమైనదని గుర్తించి గణపతిదేవ చక్రవర్తి మోటుపల్లి ఓడరేవు వద్ద జారీ చేసిన అభయ శాసనం. తుఫానులలో కొట్టుకువచ్చిన ఓడల సరుకును జప్తు చేసే పాత ఆచారాన్ని రద్దు చేసి, విదేశీ వర్తకులకు రక్షణ మరియు న్యాయమైన సుంకాలను నిర్ణయించింది.'
    },
    kn: {
      name: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವನ ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (1244)',
      ruler: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವ',
      location: 'ಮೋಟುಪಲ್ಲಿ ಬಂದರು, ಆಂಧ್ರಪ್ರದೇಶ',
      dynasty: 'ಕಾಕತೀಯ ರಾಜವಂಶ',
      era_or_date: 'ಶಕ 1166 (ಕ್ರಿ.ಶ. 1244)',
      summary:
        'ಕಡಲ ವ್ಯಾಪಾರಿಗಳಿಗೆ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ಮತ್ತು ನ್ಯಾಯಯುತ ಸುಂಕವನ್ನು ಖಾತರಿಪಡಿಸಿ ಗಣಪತಿದೇವನು ಮೋಟುಪಲ್ಲಿ ಬಂದರಿನಲ್ಲಿ ಸ್ಥಾಪಿಸಿದ ಪ್ರಸಿದ್ಧ ಅಭಯ ಶಾಸನ.'
    },
    ta: {
      name: 'பேரரசர் கணபதி தேவரின் மோட்டுப்பள்ளி அபய சாசனம் (1244)',
      ruler: 'பேரரசர் கணபதி தேவர்',
      location: 'மோட்டுப்பள்ளி துறைமுகம், ஆந்திரப் பிரதேசம்',
      dynasty: 'காகதீய வம்சம்',
      era_or_date: 'சக 1166 (பொ.ஊ. 1244)',
      summary:
        'கடல் வணிகர்களுக்கு முழுப் பாதுகாப்பையும் நியாயமான சுங்க வரியையும் உறுதிசெய்து கணபதி தேவர் மோட்டுப்பள்ளி துறைமுகத்தில் பொறித்த புகழ்பெற்ற அபய சாசனம்.'
    },
    mr: {
      name: 'सम्राट गणपती देवाचा मोटुपल्ली अभय शासन स्तंभलेख (१२४४)',
      ruler: 'सम्राट गणपती देव',
      location: 'मोटुपल्ली बंदर, आंध्र प्रदेश',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक ११६६ (इ.स. १२४४)',
      summary:
        'सागरी व्यापाऱ्यांना पूर्ण सुरक्षा आणि न्याय्य जकातीची हमी देणारा सम्राट गणपती देवाचा प्रसिद्ध मोटुपल्ली अभय शासन स्तंभलेख.'
    },
    or: {
      name: 'ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ ସ୍ତମ୍ଭ ଲେଖ (୧୨୪୪)',
      ruler: 'ସମ୍ରାଟ ଗଣପତି ଦେବ',
      location: 'ମୋଟୁପଲ୍ଲୀ ବନ୍ଦର, ଆନ୍ଧ୍ର ପ୍ରଦେଶ',
      dynasty: 'କାକତୀୟ ରାଜବଂଶ',
      era_or_date: 'ଶକ ୧୧୬୬ (୧୨୪୪ ଖ୍ରୀ.ଅ.)',
      summary:
        'ସାମୁଦ୍ରିକ ବଣିକମାନଙ୍କୁ ପୂର୍ଣ୍ଣ ସୁରକ୍ଷା ଓ ନ୍ୟାୟসଙ୍ଗତ ଶୁଳ୍କର ପ୍ରତିଶ୍ରୁତି ଦେଇ ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ଦ୍ୱାରା ଜାରି ପ୍ରସିଦ୍ଧ ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ।'
    },
    bn: {
      name: 'সম্রাট গণপতি দেবের মোতুপল্লী অভয় শাসন স্তম্ভলিপি (১২৪৪)',
      ruler: 'সম্রাট গণপতি দেব',
      location: 'মোতুপল্লী বন্দর, অন্ধ্রপ্রদেশ',
      dynasty: 'কাকতীয় রাজবংশ',
      era_or_date: 'শক ১১৬৬ (১২৪৪ খ্রি.)',
      summary:
        'সামুদ্রিক বণিকদের পূর্ণ নিরাপত্তা ও ন্যায্য শুল্কের নিশ্চয়তা প্রদান করে সম্রাট গণপতি দেব কর্তৃক জারি করা বিখ্যাত মোতুপল্লী অভয় শাসন।'
    }
  },
  insc_malkapuram_1261: {
    hi: {
      name: 'रानी रुद्रमा देवी एवं विश्वेश्वर शंभु का मल्कापुरम पाषाण स्तंभ शिलालेख (1261 ई.)',
      ruler: 'गणपति देव एवं रानी रुद्रमा देवी (राजगुरु विश्वेश्वर शंभु)',
      location: 'मल्कापुरम ग्राम (अमरावती/गुंटूर जिला, आंध्र प्रदेश)',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक 1183 (25 मार्च 1261 ई.)',
      summary:
        'रानी रुद्रमा देवी (रुद्रदेव महाराजा) द्वारा राजगुरु विश्वेश्वर शंभु के गोलकी मठ, वैदिक महाविद्यालय, प्रसूति चिकित्सालय (प्रसूति-शाला) और अन्नसत्र के लिए मंदडम तथा वेलगपुडी ग्रामों के दान का ऐतिहासिक अभिलेख।'
    },
    te: {
      name: 'రాణి రుద్రమదేవి & విశ్వేశ్వర శంభువుల మల్కాపురం శిలాశాసనం (1261)',
      ruler: 'గణపతిదేవుడు & రాణి రుద్రమదేవి (రాజగురువు విశ్వేశ్వర శంభు)',
      location: 'మల్కాపురం (మందడం సమీపంలో, గుంటూరు జిల్లా, ఆంధ్రప్రదేశ్)',
      dynasty: 'కాకతీయ రాజవంశం',
      era_or_date: 'శక 1183, దుర్మతి (25 మార్చి 1261)',
      summary:
        'గణపతిదేవుని వాగ్దానాన్ని నెరవేరుస్తూ రాణి రుద్రమదేవి (రుద్రదేవ మహారాజు) కృష్ణా నదీ తీరాన మందడం, వెలగపూడి గ్రామాలను రాజగురువు విశ్వేశ్వర శంభువుకు దానం చేసి గోళకీ మఠం, విద్యాపీఠం, ప్రసూతి వైద్యశాల మరియు నిత్యాన్నదాన సత్రాన్ని స్థాపించిన శాసనం.'
    },
    kn: {
      name: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿ ಮತ್ತು ವಿಶ್ವೇಶ್ವರ ಶಂಭುವಿನ ಮಲ್ಕಾಪುರಂ ಶಾಸನ (1261)',
      ruler: 'ಗಣಪತಿದೇವ ಮತ್ತು ರಾಣಿ ರುದ್ರಮಾದೇವಿ',
      location: 'ಮಲ್ಕಾಪುರಂ, ಗುಂಟೂರು ಜಿಲ್ಲೆ, ಆಂಧ್ರಪ್ರದೇಶ',
      dynasty: 'ಕಾಕತೀಯ ರಾಜವಂಶ',
      era_or_date: 'ಶಕ 1183 (25 ಮಾರ್ಚ್ 1261)',
      summary:
        'ರಾಣಿ ರುದ್ರಮಾದೇವಿಯು ರಾಜಗುರು ವಿಶ್ವೇಶ್ವರ ಶಂಭುವಿನ ಗೋಳಕಿ ಮಠ, ವಿದ್ಯಾಪೀಠ ಮತ್ತು ಹೆರಿಗೆ ಆಸ್ಪತ್ರೆಗಾಗಿ ಮಂದಡಂ ಗ್ರಾಮವನ್ನು ದಾನ ನೀಡಿದ ಶಾಸನ.'
    },
    ta: {
      name: 'ராணி ருத்ரமா தேவி & விஸ்வேஸ்வர சம்புவின் மல்காபுரம் தூண் கல்வெட்டு (1261)',
      ruler: 'கணபதி தேவர் & ராணி ருத்ரமா தேவி',
      location: 'மல்காபுரம், குண்டூர் மாவட்டம், ஆந்திரப் பிரதேசம்',
      dynasty: 'காகதீய வம்சம்',
      era_or_date: 'சக 1183 (25 மார்ச் 1261)',
      summary:
        'ராணி ருத்ரமா தேவி ராஜகுரு விஸ்வேஸ்வர சம்புவின் கோளகி மடம், கல்லூரி மற்றும் மகப்பேறு மருத்துவமனைக்காக மந்தடம் கிராமத்தை தானமாக வழங்கிய கல்வெட்டு.'
    },
    mr: {
      name: 'राणी रुद्रमा देवी आणि विश्वेश्वर शंभू यांचा मल्कापुरम स्तंभ शिलालेख (१२६१)',
      ruler: 'गणपती देव आणि राणी रुद्रमा देवी',
      location: 'मल्कापुरम, गुंटूर जिल्हा, आंध्र प्रदेश',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक ११८३ (२५ मार्च १२६१)',
      summary:
        'राणी रुद्रमा देवीने राजगुरू विश्वेश्वर शंभू यांच्या गोलकी मठ, विद्यापीठ व प्रसूती रुग्णालयासाठी मंदडम गाव दान दिल्याची नोंद करणारा शिलालेख.'
    },
    or: {
      name: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀ ଓ ବିଶ୍ୱେଶ୍ୱର ଶମ୍ଭୁଙ୍କ ମଲ୍କାପୁରମ ସ୍ତମ୍ଭ ଶିଳାଲେଖ (୧୨୬୧)',
      ruler: 'ଗଣପତି ଦେବ ଓ ରାଣୀ ରୁଦ୍ରମା ଦେବୀ',
      location: 'ମଲ୍କାପୁରମ, ଗୁଣ୍ଟୁର ଜିଲ୍ଲା, ଆନ୍ଧ୍ର ପ୍ରଦେଶ',
      dynasty: 'କାକତୀୟ ରାଜବଂଶ',
      era_or_date: 'ଶକ ୧୧୮୩ (୨୫ ମାର୍ଚ୍ଚ ୧୨୬୧)',
      summary:
        'ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ଦ୍ୱାରା ରାଜଗୁରୁ ବିଶ୍ୱେଶ୍ୱର ଶମ୍ଭୁଙ୍କ ଗୋଳକୀ ମଠ, ବିଦ୍ୟାପୀଠ ଓ ପ୍ରସୂତି ଚିକିତ୍ସାଳୟ ପାଇଁ ମନ୍ଦଡମ ଗ୍ରାମ ଦାନର ଶିଳାଲେଖ।'
    },
    bn: {
      name: 'রানি রুদ্রমা দেবী ও বিশ্বেস্বর শম্ভুর মল্কাপুরম স্তম্ভ শিলালিপি (১২৬১)',
      ruler: 'গণপতি দেব ও রানি রুদ্রমা দেবী',
      location: 'মল্কাপুরম, গুন্টুর জেলা, অন্ধ্রপ্রদেশ',
      dynasty: 'কাকতীয় রাজবংশ',
      era_or_date: 'শক ১১৮৩ (২৫ মার্চ ১২৬১)',
      summary:
        'রানি রুদ্রমা দেবী কর্তৃক রাজগুরু বিশ্বেস্বর শম্ভুর গোলকী মঠ, বিদ্যাপীঠ ও প্রসূতি হাসপাতালের জন্য মন্দডম গ্রাম দানের ঐতিহাসিক শিলালিপি।'
    }
  },
  insc_chandupatla_1289: {
    hi: {
      name: 'रानी रुद्रमा देवी की रणभूमि वीरगति को दर्ज करने वाला चंदुपट्ला शिलालेख (नवंबर 1289 ई.)',
      ruler: 'रानी रुद्रमा देवी से प्रतापरुद्र द्वितीय को सत्ता हस्तांतरण',
      location: 'चंदुपट्ला ग्राम, नक्रेकल मंडल, नलगोंडा जिला, तेलंगाना',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक 1211, विरोधी, मार्गशीर्ष शुद्ध द्वादशी (27 नवंबर 1289 ई.)',
      summary:
        'दक्षिण भारतीय शिलालेखीय शोध की एक युगांतरकारी खोज, जिसमें पुव्वुला मुम्मडी नामक योद्धा ने काकतीय रुद्रदेव महाराजा (रानी रुद्रमा देवी) और सेनापति मल्लिकार्जुन नायक की शिवलोक-प्राप्ति (वीरगति) के पुण्यर्थ भूमि दान दर्ज किया—जिससे प्रमाणित हुआ कि रानी रुद्रमा देवी ने नवंबर 1289 ई. में अंबादेव के विरुद्ध युद्ध में वीरगति प्राप्त की।'
    },
    te: {
      name: 'రాణి రుద్రమదేవి వీరమరణాన్ని నిర్ధారించిన చందుపట్ల శిలాశాసనం (27 నవంబర్ 1289)',
      ruler: 'రాణి రుద్రమదేవి అనంతరం రెండవ ప్రతాపరుద్రుని పాలనా ఆరంభం',
      location: 'చందుపట్ల గ్రామం, నకిరేకల్ మండలం, నల్లగొండ జిల్లా, తెలంగాణ',
      dynasty: 'కాకతీయ రాజవంశం',
      era_or_date: 'శక 1211, విరోధి, మార్గశిర శుద్ధ ద్వాదశి (27 నవంబర్ 1289)',
      summary:
        'కాకతీయ చరిత్రలో అత్యంత కీలకమైన శాసన ఆవిష్కరణ. పువ్వుల ముమ్మడి అనే బంటు కాకతీయ రుద్రదేవ మహారాజు (రాణి రుద్రమదేవి) మరియు సేనాని మల్లికార్జున నాయకుని శివలోక ప్రాప్తి (వీరమరణం) కొరకు చందుపట్ల సోమలింగదేవునికి భూదానం చేసినట్లు నమోదు చేశాడు. దీనివల్ల రుద్రమదేవి క్రీ.శ. 1289 నవంబర్‌లో అంబదేవునిపై జరిగిన యుద్ధంలో వీరమరణం పొందినట్లు నిరూపితమైంది.'
    },
    kn: {
      name: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ವೀರಮರಣವನ್ನು ದೃಢಪಡಿಸುವ ಚಂದುಪಟ್ಲ ಶಾಸನ (27 ನವೆಂಬರ್ 1289)',
      ruler: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿ ಮತ್ತು ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ',
      location: 'ಚಂದುಪಟ್ಲ ಗ್ರಾಮ, ನಲ್ಗೊಂಡ ಜಿಲ್ಲೆ, ತೆಲಂಗಾಣ',
      dynasty: 'ಕಾಕತೀಯ ರಾಜವಂಶ',
      era_or_date: 'ಶಕ 1211 (27 ನವೆಂಬರ್ 1289)',
      summary:
        'ಕಾಕತೀಯ ರುದ್ರದೇವ ಮಹಾರಾಜ (ರಾಣಿ ರುದ್ರಮಾದೇವಿ) ಮತ್ತು ಸೇನಾಪತಿ ಮಲ್ಲಿಕಾರ್ಜುನ ನಾಯಕರ ಶಿವಲೋಕ ಪ್ರಾಪ್ತಿಗಾಗಿ ಪುವ್ವುಲ ಮುಮ್ಮಡಿ ಭೂದಾನ ಮಾಡಿದ ಶಾಸನ; ಇದು ನವೆಂಬರ್ 1289ರಲ್ಲಿ ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ಯುದ್ಧಭೂಮಿ ವೀರಮರಣವನ್ನು ಸಾಬೀತುಪಡಿಸುತ್ತದೆ.'
    },
    ta: {
      name: 'ராணி ருத்ரமா தேவியின் வீரமரணத்தை உறுதிப்படுத்திய சந்துபட்லா கல்வெட்டு (27 நவம்பர் 1289)',
      ruler: 'ராணி ருத்ரமா தேவி & இரண்டாம் பிரதாபருத்ரர்',
      location: 'சந்துபட்லா கிராமம், நல்கொண்டா மாவட்டம், தெலுங்கானா',
      dynasty: 'காகதீய வம்சம்',
      era_or_date: 'சக 1211 (27 நவம்பர் 1289)',
      summary:
        'காகதீய உருத்ரதேவ மகாராஜா (ராணி ருத்ரமா தேவி) மற்றும் தளபதி மல்லிகார்ஜுன நாயக்கர் சிவலோகப் பேறு அடைந்ததற்காக புவ்வுல மும்மடி நிலக்கொடை வழங்கியதைப் பதிவு செய்யும் கல்வெட்டு; இது நவம்பர் 1289இல் ருத்ரமா தேவி போர்க்களத்தில் வீரமரணம் அடைந்ததை நிரூபிக்கிறது.'
    },
    mr: {
      name: 'राणी रुद्रमा देवीच्या वीरमरणाची नोंद करणारा चंदुपट्ला शिलालेख (२७ नोव्हेंबर १२८९)',
      ruler: 'राणी रुद्रमा देवी आणि प्रतापरुद्र दुसरा',
      location: 'चंदुपट्ला गाव, नलगोंडा जिल्हा, तेलंगणा',
      dynasty: 'काकतीय राजवंश',
      era_or_date: 'शक १२११ (२७ नोव्हेंबर १२८९)',
      summary:
        'काकतीय रुद्रदेव महाराजा (राणी रुद्रमा देवी) आणि सेनापती मल्लिकार्जुन नायक यांच्या शिवलोक प्राप्तीसाठी पुव्वुला मुम्मडीने दिलेल्या भूदानाची नोंद करणारा शिलालेख; यामुळे नोव्हेंबर १२८९ मधील रुद्रमा देवीचे रणभूमीवरील वीरमरण सिद्ध झाले.'
    },
    or: {
      name: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ବୀରଗତିକୁ ପ୍ରମାଣିତ କରୁଥିବା ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ (୨୭ ନଭେମ୍ବର ୧୨୮୯)',
      ruler: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀ ଓ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର',
      location: 'ଚନ୍ଦୁପଟ୍ଲା ଗ୍ରାମ, ନଲଗୋଣ୍ଡା ଜିଲ୍ଲା, ତେଲେଙ୍ଗାନା',
      dynasty: 'କାକତୀୟ ରାଜବଂଶ',
      era_or_date: 'ଶକ ୧୨୧୧ (୨୭ ନଭେମ୍ବର ୧୨୮୯)',
      summary:
        'କାକତୀୟ ରୁଦ୍ରଦେବ ମହାରାଜା (ରାଣୀ ରୁଦ୍ରମା ଦେବୀ) ଓ ସେନାପତି ମଲ୍ଲିକାର୍ଜୁନ ନାୟକଙ୍କ ଶିବଲୋକ ପ୍ରାପ୍ତି ନିମନ୍ତେ ପୁବ୍ବୁଲା ମୁମ୍ମଡିଙ୍କ ଭୂମିଦାନ ଶିଳାଲେଖ; ଏହା ନଭେମ୍ବର ୧୨୮୯ରେ ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ରଣଭୂମି ବୀରଗତି ପ୍ରମାଣ କରେ।'
    },
    bn: {
      name: 'রানি রুদ্রমা দেবীর বীরগতি প্রমাণকারী চন্দুপট্লা শিলালিপি (২৭ নভেম্বর ১২৮৯)',
      ruler: 'রানি রুদ্রমা দেবী ও দ্বিতীয় প্রতাপরুদ্র',
      location: 'চন্দুপট্লা গ্রাম, নলগোন্ডা জেলা, তেলেঙ্গানা',
      dynasty: 'কাকতীয় রাজবংশ',
      era_or_date: 'শক ১২১১ (২৭ নভেম্বর ১২৮৯)',
      summary:
        'কাকতীয় রুদ্রদেব মহারাজা (রানি রুদ্রমা দেবী) এবং সেনাপতি মল্লিকার্জুন নায়কের শিবলোক প্রাপ্তির উদ্দেশ্যে পুব্বুলা মুম্মডির ভূমিদান লিপিবদ্ধকারী শিলালিপি; এটি নভেম্বর ১২৮৯ খ্রিস্টাব্দে রণক্ষেত্রে রানি রুদ্রমা দেবীর বীরগতি প্রমাণ করে।'
    }
  }
};

export const KAKATIYA_GALLERY_TRANSLATIONS: Record<
  string,
  Partial<Record<LanguageCode, GalleryTranslation>>
> = {
  gal_kakatiya_kirti_torana: {
    hi: {
      title: 'ओरुगल्लु (वारंगल) किले का एकाश्म कीर्ति तोरण एवं विशाल ग्रेनाइट प्राचीर',
      period: '12वीं–14वीं शताब्दी ई. (काकतीय साम्राज्य काल)',
      location: 'वारंगल (ओरुगल्लु), तेलंगाना',
      description:
        'ओरुगल्लु किले के भीतर स्वयंभूदेव मंदिर परिसर का प्रसिद्ध एकाश्म कीर्ति तोरण और रुद्रदेव, गणपति देव, रानी रुद्रमा देवी तथा प्रतापरुद्र द्वितीय द्वारा निर्मित त्रि-स्तरीय पाषाण प्राचीर।'
    },
    te: {
      title: 'ఓరుగల్లు (వరంగల్) కోట ఏకశిలా కీర్తి తోరణం & కృష్ణశిలా ప్రాకారాలు',
      period: 'క్రీ.శ. 12–14వ శతాబ్దం (కాకతీయ సామ్రాజ్య కాలం)',
      location: 'వరంగల్ (ఓరుగల్లు), తెలంగాణ',
      description:
        'ఓరుగల్లు కోటలోని స్వయంభూదేవ ఆలయ ప్రాంగణంలో నిలిచిన చారిత్రక ఏకశిలా కీర్తి తోరణం మరియు కాకతీయ చక్రవర్తులు నిర్మించిన మూడు వలయాల రాతి కోట ప్రాకారాలు.'
    },
    kn: {
      title: 'ಓರುಗಲ್ಲು (ವರಂಗಲ್) ಕೋಟೆಯ ಏಕಶಿಲಾ ಕೀರ್ತಿ ತೋರಣ ಮತ್ತು ಗ್ರಾನೈಟ್ ಕೋಟೆ ಗೋಡೆಗಳು',
      period: 'ಕ್ರಿ.ಶ. 12–14ನೇ ಶತಮಾನ (ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯ ಕಾಲ)',
      location: 'ವರಂಗಲ್ (ಓರುಗಲ್ಲು), ತೆಲಂಗಾಣ',
      description:
        'ಓರುಗಲ್ಲು ಕೋಟೆಯ ಸ್ವಯಂಭೂದೇವ ದೇವಾಲಯದ ಏಕಶಿಲಾ ಕೀರ್ತಿ ತೋರಣ ಮತ್ತು ಕಾಕತೀಯ ಚಕ್ರವರ್ತಿಗಳು ನಿರ್ಮಿಸಿದ ಮೂರು ಸುತ್ತಿನ ಕೋಟೆ ಗೋಡೆಗಳು.'
    },
    ta: {
      title: 'ஓருகல்லு (வாரங்கல்) கோட்டை ஒற்றைக்கல் கீர்த்தி தோரணம் & கருங்கல் அரண்கள்',
      period: 'பொ.ஊ. 12–14ஆம் நூற்றாண்டு (காகதீயப் பேரரசு காலம்)',
      location: 'வாரங்கல் (ஓருகல்லு), தெலுங்கானா',
      description:
        'ஓருகல்லு கோட்டைக்குள் அமைந்துள்ள சுயம்புதேவர் கோயிலின் ஒற்றைக்கல் கீர்த்தி தோரணம் மற்றும் காகதீய மன்னர்களால் கட்டப்பட்ட மூன்று வட்டக் கோட்டைச் சுவர்கள்.'
    },
    mr: {
      title: 'ओरुगल्लु (वरंगळ) किल्ल्याचे एकाश्म कीर्ती तोरण आणि भव्य ग्रॅनाइट तटबंदी',
      period: 'इ.स. १२ वे ते १४ वे शतक (काकतीय साम्राज्य काळ)',
      location: 'वरंगळ (ओरुगल्लु), तेलंगणा',
      description:
        'ओरुगल्लु किल्ल्यातील स्वयंभूदेव मंदिर परिसराचे एकाश्म कीर्ती तोरण आणि काकतीय सम्राटांनी बांधलेली तीन समकेंद्रित दगडी तटबंदी.'
    },
    or: {
      title: 'ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ଦୁର୍ଗର ଏକଶିଳା କୀର୍ତ୍ତି ତୋରଣ ଓ ଗ୍ରାନାଇଟ ପ୍ରାଚୀର',
      period: '୧୨ଶ–୧୪ଶ ଶତାବ୍ଦୀ (କାକତୀୟ ସାମ୍ରାଜ୍ୟ କାଳ)',
      location: 'ୱାରଙ୍ଗଲ (ଓରୁଗଲ୍ଲୁ), ତେଲେଙ୍ଗାନା',
      description:
        'ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ ମଧ୍ୟରେ ଥିବା ସ୍ୱୟମ୍ଭୂଦେବ ମନ୍ଦିରର ଏକଶିଳା କୀର୍ତ୍ତି ତୋରଣ ଓ କାକତୀୟ ସମ୍ରାଟମାନଙ୍କ ଦ୍ୱାରା ନିର୍ମିତ ତ୍ରିବଳୟ ପ୍ରସ୍ତର ପ୍ରାଚୀର।'
    },
    bn: {
      title: 'ওরুগল্লু (ওয়ারাঙ্গল) দুর্গের একশিলা কীর্তি তোরণ ও গ্রানাইট প্রাচীর',
      period: '১২শ–১৪শ শতাব্দী (কাকতীয় সাম্রাজ্য কাল)',
      location: 'ওয়ারাঙ্গল (ওরুগল্লু), তেলেঙ্গানা',
      description:
        'ওরুগল্লু দুর্গের অভ্যন্তরে স্বয়ম্ভুদেব মন্দির চত্বরের একশিলা কীর্তি তোরণ এবং কাকতীয় সম্রাটদের নির্মিত ত্রিবলয় প্রস্তর প্রাচীর।'
    }
  }
};

export const KAKATIYA_GENEALOGY_TRANSLATIONS: Record<
  string,
  Partial<Record<LanguageCode, GenealogyNodeTranslation>>
> = {
  gen_kakatiya_lineage: {
    hi: {
      name: 'अनुमकोंडा एवं ओरुगल्लु का काकतीय राजवंश (बेत प्रथम से प्रतापरुद्र द्वितीय तक)',
      titles: 'महामंडलेश्वर, महाराजाधिराज, राय-गजकेसरी एवं दयागजकेसरी',
      reign: 'लगभग 1000 – 1323 ई. (सार्वभौम साम्राज्य: 1163 – 1323 ई.)',
      spouse: 'निडदवोलु के चालुक्य वीरभद्र (रानी रुद्रमा देवी के पति)',
      notes:
        'शिलालेखीय रूप से सत्यापित दक्कन राजवंश (बेत प्रथम → प्रोल प्रथम → बेत द्वितीय → प्रोल द्वितीय → रुद्रदेव → महादेव → गणपति देव → रानी रुद्रमा देवी → प्रतापरुद्र द्वितीय), जिसकी 77-नायंकर सैन्य प्रणाली और ओरुगल्लु दुर्ग बाद में गजपति दक्षिणी अभियानों और ओडियाराजू / वड्डेरा दुर्ग-अभियांत्रिकी वंशों से जुड़े।'
    },
    te: {
      name: 'అనుమకొండ & ఓరుగల్లు కాకతీయ సామ్రాజ్య వంశం (మొదటి బేతరాజు నుండి రెండవ ప్రతాపరుద్రుని వరకు)',
      titles: 'మహామండలేశ్వర, మహారాజాధిరాజ, రాయగజకేసరి & దయాగజకేసరి',
      reign: 'క్రీ.శ. 1000 – 1323 (సార్వభౌమ సామ్రాజ్యం: 1163 – 1323)',
      spouse: 'నిడదవోలు చాళుక్య వీరభద్రుడు (రాణి రుద్రమదేవి భర్త)',
      notes:
        'శాసన ఆధారిత దక్కన్ సామ్రాజ్య వంశం (మొదటి బేతరాజు → మొదటి ప్రోలరాజు → రెండవ బేతరాజు → రెండవ ప్రోలరాజు → రుద్రదేవుడు → మహాదేవుడు → గణపతిదేవుడు → రాణి రుద్రమదేవి → రెండవ ప్రతాపరుద్రుడు). వీరి 77 నాయంకర సైనిక వ్యవస్థ మరియు ఓరుగల్లు కోటలు తదనంతర గజపతి దక్షిణ దండయాత్రలు, ఒడియరాజు / వడ్డెర దుర్గ నిర్మాణ వంశాలతో ముడిపడి ఉన్నాయి.'
    },
    kn: {
      name: 'ಅನುಮಕೊಂಡ ಮತ್ತು ಓರುಗಲ್ಲು ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯ ವಂಶ (ಮೊದಲನೇ ಬೇತನಿಂದ ಎರಡನೇ ಪ್ರತಾಪರುದ್ರನವರೆಗೆ)',
      titles: 'ಮಹಾಮಂಡಲೇಶ್ವರ, ಮಹಾರಾಜಾಧಿರಾಜ, ರಾಯ-ಗಜಕೇಸರಿ ಮತ್ತು ದಯಾಗಜಕೇಸರಿ',
      reign: 'ಕ್ರಿ.ಶ. 1000 – 1323 (ಸಾರ್ವಭೌಮ ಸಾಮ್ರಾಜ್ಯ: 1163 – 1323)',
      spouse: 'ನಿಡದವೋಲು ಚಾಳುಕ್ಯ ವೀರಭದ್ರ (ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ ಪತಿ)',
      notes:
        'ಶಾಸನಬದ್ಧ ದಕ್ಕನ್ ಸಾಮ್ರಾಜ್ಯ ವಂಶ (ಬೇತ I → ಪ್ರೋಲ I → ಬೇತ II → ಪ್ರೋಲ II → ರುದ್ರದೇವ → ಮಹಾದೇವ → ಗಣಪತಿದೇವ → ರಾಣಿ ರುದ್ರಮಾದೇವಿ → ಪ್ರತಾಪರುದ್ರ II); ಇವರ 77 ನಾಯಂಕರ ಪದ್ಧತಿಯು ಮುಂದೆ ವಿಜಯನಗರ ಮತ್ತು ಗಜಪತಿ ಯುಗದ ಕೋಟೆ ಪರಂಪರೆಯೊಂದಿಗೆ ಬೆಸೆದುಕೊಂಡಿತು.'
    },
    ta: {
      name: 'அனுமகொண்டா & ஓருகல்லு காகதீயப் பேரரசு வம்சம் (முதலாம் பேதன் முதல் இரண்டாம் பிரதாபருத்ரர் வரை)',
      titles: 'மகாமண்டலேஸ்வரன், மகாராஜாதிராஜா, ராய-கஜகேசரி & தயாகஜகேசரி',
      reign: 'பொ.ஊ. 1000 – 1323 (இறையாண்மைப் பேரரசு: 1163 – 1323)',
      spouse: 'நிடதவோலு சாளுக்கிய வீரபத்ரர் (ராணி ருத்ரமா தேவியின் கணவர்)',
      notes:
        'கல்வெட்டுகளால் உறுதிப்படுத்தப்பட்ட தக்காணப் பேரரசு வம்சம் (பேதன் I → புரோலன் I → பேதன் II → புரோலன் II → உருத்ரதேவர் → மகாதேவர் → கணபதி தேவர் → ராணி ருத்ரமா தேவி → பிரதாபருத்ரர் II).'
    },
    mr: {
      name: 'अनुमकोंडा आणि ओरुगल्लुचे काकतीय साम्राज्य घराणे (बेत पहिला ते प्रतापरुद्र दुसरा)',
      titles: 'महामंडलेश्वर, महाराजाधिराज, राय-गजकेसरी आणि दयागजकेसरी',
      reign: 'इ.स. १००० – १३२३ (सार्वभौम साम्राज्य: ११६३ – १३२३)',
      spouse: 'निडदवोलुचा चालुक्य वीरभद्र (राणी रुद्रमा देवीचा पती)',
      notes:
        'शिलालेखांनी प्रमाणित दख्खनमधील साम्राज्य घराणे (बेत पहिला → प्रोल पहिला → बेत दुसरा → प्रोल दुसरा → रुद्रदेव → महादेव → गणपती देव → राणी रुद्रमा देवी → प्रतापरुद्र दुसरा).'
    },
    or: {
      name: 'ଅନୁମକୋଣ୍ଡା ଓ ଓରୁଗଲ୍ଲୁର କାକତୀୟ ସାମ୍ରାଜ୍ୟ ବଂଶ (ପ୍ରଥମ ବେତଙ୍କଠାରୁ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର ପର୍ଯ୍ୟନ୍ତ)',
      titles: 'ମହାମଣ୍ଡଳେଶ୍ୱର, ମହାରାଜାଧିରାଜ, ରାୟ-ଗଜକେସରୀ ଓ ଦୟାଗଜକେସରୀ',
      reign: '୧୦୦୦ – ୧୩୨୩ ଖ୍ରୀ.ଅ. (ସାର୍ବଭୌମ ସାମ୍ରାଜ୍ୟ: ୧୧୬୩ – ୧୩୨୩)',
      spouse: 'ନିଡଦବୋଲୁର ଚାଲୁକ୍ୟ ବୀରଭଦ୍ର (ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ପତି)',
      notes:
        'ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ ଦక్కନ ସାମ୍ରାଜ୍ୟ ବଂଶ (ବେତ I → ପ୍ରୋଲ I → ବେତ II → ପ୍ରୋଲ II → ରୁଦ୍ରଦେବ → ମହାଦେବ → ଗଣପତି ଦେବ → ରାଣୀ ରୁଦ୍ରମା ଦେବୀ → ପ୍ରତାପରୁଦ୍ର II)।'
    },
    bn: {
      name: 'অনুমকোন্ডা ও ওরুগল্লুর কাকতীয় সাম্রাজ্য বংশ (প্রথম বেত থেকে দ্বিতীয় প্রতাপরুদ্র পর্যন্ত)',
      titles: 'মহামণ্ডলেশ্বর, মহারাজাধিরাজ, রায়-গজকেশরী ও দয়াগজকেশরী',
      reign: 'আনু. ১০০০ – ১৩২৩ খ্রি. (সার্বভৌম সাম্রাজ্য: ১১৬৩ – ১৩২৩ খ্রি.)',
      spouse: 'নিডদভোলুর চালুক্য বীরভদ্র (রানি রুদ্রমা দেবীর পতি)',
      notes:
        'শিলালিপি দ্বারা প্রমাণিত দাক্ষিণাত্যের সাম্রাজ্যিক বংশ (বেত I → প্রোল I → বেত II → প্রোল II → রুদ্রদেব → মহাদেব → গণপতি দেব → রানি রুদ্রমা দেবী → প্রতাপরুদ্র II)।'
    }
  }
};

export const KAKATIYA_TIMELINE_TRANSLATIONS: Record<
  string,
  Partial<Record<LanguageCode, TimelineEventTranslation>>
> = {
  ev_kakatiya_emergence_1000: {
    hi: {
      period: '11वीं शताब्दी ई.',
      year_text: 'लगभग 1000–1076 ई.',
      title: 'बेत प्रथम एवं प्रोल प्रथम के अधीन अनुमकोंडा में प्रारंभिक काकतीय रियासत का उदय',
      rulers_involved: 'बेत प्रथम (1000–1052 ई.) एवं प्रोल प्रथम (1052–1076 ई.)',
      political_development:
        'कल्याणी के पश्चिमी चालुक्यों के साथ गठबंधन कर बेत प्रथम ने अनुमकोंडा को सुदृढ़ किया। उनके पुत्र प्रोल प्रथम (अरिगजकेसरी) ने चालुक्य सम्राट सोमेश्वर प्रथम से अनुमकोंडा विषय का स्थायी वंशानुगत अनुदान प्राप्त किया और केसरी समुद्रम जलाशय का निर्माण कराया।',
      monuments_inscriptions: 'सनगिरम शिलालेख (1051 ई.); काजीपेट दरगाह शिलालेख (1090 ई.); केसरी समुद्रम जलाशय।',
      uncertainty_notes: 'काजीपेट और बय्यारम शिलालेखों द्वारा पूर्णतः प्रमाणित।'
    },
    te: {
      period: 'క్రీ.శ. 11వ శతాబ్దం',
      year_text: 'క్రీ.శ. 1000–1076',
      title: 'మొదటి బేతరాజు & మొదటి ప్రోలరాజు పాలనలో అనుమకొండ కేంద్రంగా కాకతీయ రాజ్య ఆవిర్భావం',
      rulers_involved: 'మొదటి బేతరాజు (1000–1052) & మొదటి ప్రోలరాజు (1052–1076)',
      political_development:
        'కళ్యాణి చాళుక్యుల మైత్రితో మొదటి బేతరాజు అనుమకొండలో అధికారాన్ని స్థిరపరిచాడు. ఆయన కుమారుడు మొదటి ప్రోలరాజు (అరిగజకేసరి) చాళుక్య మొదటి సోమేశ్వరుని నుండి అనుమకొండ విషయాన్ని శాశ్వత భరణంగా పొంది కేసరి సముద్రం చెరువును తవ్వించాడు.',
      monuments_inscriptions: 'శనిగరం శాసనం (1051); కాజీపేట దర్గా శాసనం (1090); కేసరి సముద్రం చెరువు.',
      uncertainty_notes: 'కాజీపేట మరియు బయ్యారం శాసనాల ద్వారా పూర్తిగా ధృవీకరించబడింది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 11ನೇ ಶತಮಾನ',
      year_text: 'ಸು. ಕ್ರಿ.ಶ. 1000–1076',
      title: 'ಮೊದಲನೇ ಬೇತ ಮತ್ತು ಪ್ರೋಲರ ಅಡಿಯಲ್ಲಿ ಅನುಮಕೊಂಡದಲ್ಲಿ ಕಾಕತೀಯ ಸಂಸ್ಥಾನದ ಉದಯ',
      rulers_involved: 'ಮೊದಲನೇ ಬೇತ (1000–1052) ಮತ್ತು ಮೊದಲನೇ ಪ್ರೋಲ (1052–1076)',
      political_development:
        'ಕಲ್ಯಾಣಿ ಚಾಳುಕ್ಯರ ಸಾಮಂತರಾಗಿ ಅನುಮಕೊಂಡವನ್ನು ಭದ್ರಪಡಿಸಿ, ಒಂದನೇ ಪ್ರೋಲನು ಅನುಮಕೊಂಡ ವಿಷಯವನ್ನು ಶಾಶ್ವತ ಜಾಗೀರಾಗಿ ಪಡೆದು ಕೇಸರಿ ಸಮುದ್ರಂ ಕೆರೆಯನ್ನು ನಿರ್ಮಿಸಿದನು.',
      monuments_inscriptions: 'ಶನಿಗರಂ ಶಾಸನ (1051); ಕಾಜಿಪೇಟ ಶಾಸನ (1090); ಕೇಸರಿ ಸಮುದ್ರಂ ಕೆರೆ.',
      uncertainty_notes: 'ಶಾಸನಗಳಿಂದ ದೃಢಪಟ್ಟ ಐತಿಹಾಸಿಕ ದಾಖಲೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 11ஆம் நூற்றாண்டு',
      year_text: 'பொ.ஊ. 1000–1076',
      title: 'முதலாம் பேதராஜன் & முதலாம் புரோலராஜன் கீழ் அனுமகொண்டாவில் காகதீய அரசின் எழுச்சி',
      rulers_involved: 'முதலாம் பேதராஜன் (1000–1052) & முதலாம் புரோலராஜன் (1052–1076)',
      political_development:
        'கல்யாணிச் சாளுக்கியருடன் இணைந்து அனுமகொண்டாவை வலுப்படுத்தி, முதலாம் புரோலராஜன் அனுமகொண்டா விஷயத்தை நிரந்தர உரிமையாகப் பெற்று கேசரி சமுத்திரம் ஏரியை உருவாக்கினார்.',
      monuments_inscriptions: 'சனிகரம் கல்வெட்டு (1051); காஜிப்பேட்டை கல்வெட்டு (1090); கேசரி சமுத்திரம்.',
      uncertainty_notes: 'கல்வெட்டுகளால் உறுதிப்படுத்தப்பட்ட வரலாற்றுப் பதிவு.'
    },
    mr: {
      period: 'इ.स. ११ वे शतक',
      year_text: 'इ.स. १०००–१०७६',
      title: 'बेत पहिला व प्रोल पहिला यांच्या नेतृत्वाखाली अनुमकोंडा येथे काकतीय राज्याचा उदय',
      rulers_involved: 'बेत पहिला (१०००–१०५२) व प्रोल पहिला (१०५२–१०७६)',
      political_development:
        'कल्याणी चालुक्यांचे महामंडलेश्वर म्हणून अनुमकोंडा मजबूत केले आणि प्रोल पहिल्याला अनुमकोंडा विषयाची कायमस्वरूपी सनद मिळाली व त्याने केसरी समुद्रम तलाव बांधला.',
      monuments_inscriptions: 'शनिगरम शिलालेख (१०५१); काझीपेट शिलालेख (१०९०); केसरी समुद्रम.',
      uncertainty_notes: 'शिलालेखीय पुराव्यांनी पूर्णपणे प्रमाणित.'
    },
    or: {
      period: '୧୧ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୦୦୦–୧୦୭୬ ଖ୍ରୀ.ଅ.',
      title: 'ପ୍ରଥମ ବେତ ଓ ପ୍ରଥମ ପ୍ରୋଲଙ୍କ ଅଧୀନରେ ଅନୁମକୋଣ୍ଡାରେ କାକତୀୟ ରାଜ୍ୟର ଉଦୟ',
      rulers_involved: 'ପ୍ରଥମ ବେତ (୧୦୦୦–୧୦୫୨) ଓ ପ୍ରଥମ ପ୍ରୋଲ (୧୦୫୨–୧୦୭୬)',
      political_development:
        'କଲ୍ୟାଣୀ ଚାଲୁକ୍ୟଙ୍କ ସହ ମিত্রତା କରି ଅନୁମକୋଣ୍ଡାକୁ ସୁଦୃଢ଼ କରିଥିଲେ ଏବଂ ପ୍ରଥମ ପ୍ରୋଲ ଅନୁମକୋଣ୍ଡା ବିଷୟର ସ୍ଥାୟୀ ଅନୁଦାନ ପାଇ କେସରୀ ସମୁଦ୍ରମ ଜଳାଶୟ ନିର୍ମାଣ କରିଥିଲେ।',
      monuments_inscriptions: 'ଶനിଗରମ ଶିଳାଲେଖ (୧୦୫୧); କାଜିପେଟ ଶିଳାଲେଖ (୧୦୯୦); କେସରୀ ସମୁଦ୍ରମ।',
      uncertainty_notes: 'ଶିଳାଲେଖ ଦ୍ୱାରା ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରମାଣିତ।'
    },
    bn: {
      period: '১১শ শতাব্দী',
      year_text: 'আনু. ১০০০–১০৭৬ খ্রি.',
      title: 'প্রথম বেত ও প্রথম প্রোলের অধীনে অনুমকোন্ডায় কাকতীয় রাজ্যের উত্থান',
      rulers_involved: 'প্রথম বেত (১০০০–১০৫২) ও প্রথম প্রোল (১০৫২–১০৭৬)',
      political_development:
        'কল্যাণী চালুক্যদের সঙ্গে মিত্রতায় অনুমকোন্ডা সুদৃঢ় করেন এবং প্রথম প্রোল অনুমকোন্ডা বিষয়ের স্থায়ী সনদ লাভ করে কেশরী সমুদ্রম জলাশয় নির্মাণ করেন।',
      monuments_inscriptions: 'শনিগরম শিলালিপি (১০৫১); কাজিপেট শিলালিপি (১০৯০); কেশরী সমুদ্রম।',
      uncertainty_notes: 'শিলালিপি দ্বারা সম্পূর্ণভাবে প্রমাণিত।'
    }
  },
  ev_kakatiya_independence_1163: {
    hi: {
      period: 'मध्य 12वीं शताब्दी ई.',
      year_text: '1163 ई. (शक 1084)',
      title: 'रुद्रदेव द्वारा सार्वभौम स्वतंत्रता की घोषणा एवं हजार स्तंभ मंदिर की प्रतिष्ठा',
      rulers_involved: 'प्रोल द्वितीय (1116–1157 ई.) एवं राजा रुद्रदेव / प्रतापरुद्र प्रथम (1158–1195 ई.)',
      political_development:
        'प्रोल द्वितीय की विजयों के आधार पर राजा रुद्रदेव ने 1163 ई. (शक 1084) में चालुक्य आधिपत्य को समाप्त कर पूर्ण स्वतंत्र काकतीय साम्राज्य की घोषणा की और द्राक्षाराम तक अभियान चलाया।',
      monuments_inscriptions: 'अनुमकोंडा हजार स्तंभ मंदिर (श्री रुद्रेश्वर स्वामी त्रिकूटालयम) एवं अनुमकोंडा शिलालेख (20 जनवरी 1163 ई.)।',
      uncertainty_notes: 'हनमकोंडा शिलालेख की खगोलीय तिथि (20 जनवरी 1163 ई.) द्वारा पूर्णतः सत्यापित।'
    },
    te: {
      period: 'క్రీ.శ. 12వ శతాబ్దం మధ్యభాగం',
      year_text: 'క్రీ.శ. 1163 (శక 1084)',
      title: 'రుద్రదేవుని సంపూర్ణ స్వతంత్ర సార్వభౌమ ప్రకటన & వేయిస్తంభాల గుడి నిర్మాణం',
      rulers_involved: 'రెండవ ప్రోలరాజు (1116–1157) & రుద్రదేవ మహారాజు / మొదటి ప్రతాపరుద్రుడు (1158–1195)',
      political_development:
        'రెండవ ప్రోలరాజు సాధించిన విజయాల పునాదిపై రుద్రదేవుడు క్రీ.శ. 1163 (శక 1084) లో చాళుక్య సామంతత్వాన్ని త్రోసిపుచ్చి స్వతంత్ర కాకతీయ సామ్రాజ్యాన్ని ప్రకటించి ద్రాక్షారామం వరకు జైత్రయాత్ర జరిపాడు.',
      monuments_inscriptions: 'హనుమకొండ వేయిస్తంభాల గుడి & అనుమకొండ శిలాశాసనం (20 జనవరి 1163).',
      uncertainty_notes: 'హనుమకొండ శాసనంలోని ఖచ్చితమైన తేదీ (20 జనవరి 1163) ద్వారా నిరూపితమైంది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 12ನೇ ಶತಮಾನದ ಮಧ್ಯಭಾಗ',
      year_text: 'ಕ್ರಿ.ಶ. 1163 (ಶಕ 1084)',
      title: 'ರುದ್ರದೇವನ ಸಾರ್ವಭೌಮ ಸ್ವಾತಂತ್ರ್ಯ ಘೋಷಣೆ ಮತ್ತು ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ನಿರ್ಮಾಣ',
      rulers_involved: 'ಎರಡನೇ ಪ್ರೋಲ (1116–1157) ಮತ್ತು ರುದ್ರದೇವ (1158–1195)',
      political_development:
        'ರುದ್ರದೇವನು ಕ್ರಿ.ಶ. 1163 (ಶಕ 1084) ರಲ್ಲಿ ಚಾಳುಕ್ಯರ ಅಧೀನತೆಯನ್ನು ಕೊನೆಗೊಳಿಸಿ ಸಂಪೂರ್ಣ ಸ್ವತಂತ್ರ ಕಾಕತೀಯ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಘೋಷಿಸಿದನು.',
      monuments_inscriptions: 'ಹನುಮಕೊಂಡ ಸಾವಿರ ಕಂಬದ ದೇವಾಲಯ ಮತ್ತು ಅನುಮಕೊಂಡ ಶಾಸನ (20 ಜನವರಿ 1163).',
      uncertainty_notes: 'ಹನುಮಕೊಂಡ ಶಾಸನದ ನಿಖರ ದಿನಾಂಕದಿಂದ ದೃಢಪಟ್ಟಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 12ஆம் நூற்றாண்டின் நடுப்பகுதி',
      year_text: 'பொ.ஊ. 1163 (சக 1084)',
      title: 'உருத்ரதேவரின் சுதந்திரப் பிரகடனம் & ஆயிரங்கால் கோயில் பிரதிஷ்டை',
      rulers_involved: 'இரண்டாம் புரோலராஜன் (1116–1157) & உருத்ரதேவர் (1158–1195)',
      political_development:
        'பொ.ஊ. 1163 (சக 1084) இல் உருத்ரதேவர் சாளுக்கிய மேலாதிக்கத்தை நீக்கி முழு சுதந்திர காகதீயப் பேரரசை அறிவித்தார்.',
      monuments_inscriptions: 'ஹனம்கொண்டா ஆயிரங்கால் கோயில் & அனுமகொண்டா கல்வெட்டு (20 ஜனவரி 1163).',
      uncertainty_notes: 'அனுமகொண்டா கல்வெட்டின் துல்லியமான தேதியால் உறுதிப்படுத்தப்பட்டது.'
    },
    mr: {
      period: 'इ.स. १२ व्या शतकाचा मध्य',
      year_text: 'इ.स. ११६३ (शक १०८४)',
      title: 'रुद्रदेवाची सार्वभौम स्वातंत्र्य घोषणा आणि हजार स्तंभ मंदिराची उभारणी',
      rulers_involved: 'प्रोल दुसरा (१११६–११५७) व राजा रुद्रदेव (११५८–११९५)',
      political_development:
        'इ.स. ११६३ (शक १०८४) मध्ये रुद्रदेवाने चालुक्यांचे मांडलीकत्व झुगारून पूर्ण स्वतंत्र काकतीय साम्राज्याची घोषणा केली.',
      monuments_inscriptions: 'हनमकोंडा हजार स्तंभ मंदिर व अनुमकोंडा शिलालेख (२० जानेवारी ११६३).',
      uncertainty_notes: 'अनुमकोंडा शिलालेखातील अचूक तारखेने प्रमाणित.'
    },
    or: {
      period: 'ମଧ୍ୟ ୧୨ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୧୬୩ ଖ୍ରୀ.ଅ. (ଶକ ୧୦୮୪)',
      title: 'ରୁଦ୍ରଦେବଙ୍କ ସାର୍ବଭୌମ ସ୍ୱାଧୀନତା ଘୋଷଣା ଓ ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ପ୍ରତିଷ୍ଠା',
      rulers_involved: 'ଦ୍ୱିତୀୟ ପ୍ରୋଲ (୧୧୧୬–୧୧୫୭) ଓ ରାଜା ରୁଦ୍ରଦେବ (୧୧୫୮–୧୧୯୫)',
      political_development:
        '୧୧୬୩ ଖ୍ରୀ.ଅ. (ଶକ ୧୦୮୪) ରେ ରୁଦ୍ରଦେବ ଚାଲୁକ୍ୟ ଆଧିପତ୍ୟ ସମାପ୍ତ କରି ପୂର୍ଣ୍ଣ ସ୍ୱାଧୀନ କାକତୀୟ ସାମ୍ରାଜ୍ୟ ଘୋଷଣା କରିଥିଲେ।',
      monuments_inscriptions: 'ହନମକୋଣ୍ଡା ସହସ୍ର ସ୍ତମ୍ଭ ମନ୍ଦିର ଓ ଅନୁମକୋଣ୍ଡା ଶିଳାଲେଖ (୨୦ ଜାନୁଆରୀ ୧୧୬୩)।',
      uncertainty_notes: 'ଅନୁମକୋଣ୍ଡା ଶିଳାଲେଖର ସଠିକ ତାରିଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।'
    },
    bn: {
      period: 'মধ্য ১২শ শতাব্দী',
      year_text: '১১৬৩ খ্রি. (শক ১০৮৪)',
      title: 'রুদ্রদেবের সার্বভৌম স্বাধীনতা ঘোষণা ও সহস্র স্তম্ভ মন্দির প্রতিষ্ঠা',
      rulers_involved: 'দ্বিতীয় প্রোল (১১১৬–১১৫৭) ও রাজা রুদ্রদেব (১১৫৮–১১৯৫)',
      political_development:
        '১১৬৩ খ্রিস্টাব্দে (শক ১০৮৪) রুদ্রদেব চালুক্য আধিপত্য অস্বীকার করে পূর্ণ স্বাধীন কাকতীয় সাম্রাজ্য ঘোষণা করেন।',
      monuments_inscriptions: 'হনমকোন্ডা সহস্র স্তম্ভ মন্দির ও অনুমকোন্ডা শিলালিপি (২০ জানুয়ারি ১১৬৩)।',
      uncertainty_notes: 'অনুমকোন্ডা শিলালিপির সুনির্দিষ্ট তারিখ দ্বারা প্রমাণিত।'
    }
  },
  ev_kakatiya_orugallu_capital_1195: {
    hi: {
      period: 'उत्तर 12वीं शताब्दी ई.',
      year_text: 'लगभग 1163–1199 ई.',
      title: 'ओरुगल्लु (वारंगल) राजधानी दुर्ग की नींव एवं महादेव का देवगिरि अभियान',
      rulers_involved: 'रुद्रदेव (1158–1195 ई.) एवं महादेव (1195–1199 ई.)',
      political_development:
        'रुद्रदेव ने स्वयंभूदेव मंदिर के चारों ओर ओरुगल्लु (एकशिलानगर / वारंगल) की नई राजधानी की नींव रखी। 1195 ई. में यादवों के विरुद्ध युद्ध में रुद्रदेव के वीरगति पाने पर उनके भाई महादेव ने शासन संभाला और 1198–1199 ई. में देवगिरि अभियान में वीरगति प्राप्त की।',
      monuments_inscriptions: 'ओरुगल्लु किले की प्रारंभिक संरचना; सुंदिल्ला एवं पालापेट शिलालेख।',
      uncertainty_notes: 'काकतीय और यादव दोनों पक्षों के समकालीन शिलालेखों द्वारा प्रमाणित।'
    },
    te: {
      period: 'క్రీ.శ. 12వ శతాబ్దం చివరి భాగం',
      year_text: 'క్రీ.శ. 1163–1199',
      title: 'ఓరుగల్లు (వరంగల్) రాజధాని కోట పునాది & మహాదేవుని దేవగిరి దండయాత్ర',
      rulers_involved: 'రుద్రదేవుడు (1158–1195) & మహాదేవుడు (1195–1199)',
      political_development:
        'రుద్రదేవుడు స్వయంభూదేవ ఆలయం చుట్టూ ఓరుగల్లు (ఏకశిలానగరం) నూతన రాజధాని నిర్మాణాన్ని ప్రారంభించాడు. 1195లో యాదవులతో జరిగిన పోరులో రుద్రదేవుడు మరణించగా, ఆయన తమ్ముడు మహాదేవుడు రాజ్యానికి వచ్చి 1198–1199 దేవగిరి దండయాత్రలో వీరమరణం పొందగా, సేనాని రేచర్ల రుద్రుడు రాజ్యాన్ని కాపాడాడు.',
      monuments_inscriptions: 'ఓరుగల్లు కోట తొలి కట్టడాలు; సుందిళ్ల & పాలంపేట శాసనాలు.',
      uncertainty_notes: 'కాకతీయ మరియు యాదవ సమకాలీన శాసనాల ద్వారా ధృవీకరించబడింది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 12ನೇ ಶತಮಾನದ ಅಂತ್ಯ',
      year_text: 'ಸು. ಕ್ರಿ.ಶ. 1163–1199',
      title: 'ಓರುಗಲ್ಲು (ವರಂಗಲ್) ರಾಜಧಾನಿ ಕೋಟೆಯ ಸ್ಥಾಪನೆ ಮತ್ತು ಮಹಾದೇವನ ದೇವಗಿರಿ ದಂಡಯಾತ್ರೆ',
      rulers_involved: 'ರುದ್ರದೇವ (1158–1195) ಮತ್ತು ಮಹಾದೇವ (1195–1199)',
      political_development:
        'ರುದ್ರದೇವನು ಓರುಗಲ್ಲು ಹೊಸ ರಾಜಧಾನಿಗೆ ಅಡಿಪಾಯ ಹಾಕಿದನು; ನಂತರ ಮಹಾದೇವನು ದೇವಗಿರಿಯ ಯಾದವರ ವಿರುದ್ಧ ಹೋರಾಡುತ್ತಾ ವೀರಮರಣ ಹೊಂದಿದಾಗ ಸೇನಾಪತಿ ರೇಚರ್ಲ ರುದ್ರನು ರಾಜ್ಯವನ್ನು ರಕ್ಷಿಸಿದನು.',
      monuments_inscriptions: 'ಓರುಗಲ್ಲು ಕೋಟೆಯ ಆರಂಭಿಕ ರಚನೆಗಳು; ಪಾಲಂಪೇಟ ಶಾಸನ.',
      uncertainty_notes: 'ಸಮಕಾಲೀನ ಶಾಸನಗಳಿಂದ ದೃಢಪಟ್ಟಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 12ஆம் நூற்றாண்டின் பிற்பகுதி',
      year_text: 'பொ.ஊ. 1163–1199',
      title: 'ஓருகல்லு (வாரங்கல்) தலைநகர் கோட்டை உருவாக்கம் & மகாதேவரின் தேவகிரிப் படையெடுப்பு',
      rulers_involved: 'உருத்ரதேவர் (1158–1195) & மகாதேவர் (1195–1199)',
      political_development:
        'உருத்ரதேவர் ஓருகல்லு புதிய தலைநகருக்கு அடிக்கல் நாட்டினார்; பின்னர் மகாதேவர் தேவகிரி யாதவர்களுக்கு எதிரான போரில் வீரமரணம் அடைந்தபோது தளபதி ரேசர்ல ருத்ரன் அரசைக் காத்தார்.',
      monuments_inscriptions: 'ஓருகல்லு கோட்டை அடித்தளம்; பாலம்பேட்டை கல்வெட்டு.',
      uncertainty_notes: 'சமகாலக் கல்வெட்டுகளால் உறுதிப்படுத்தப்பட்டது.'
    },
    mr: {
      period: 'इ.स. १२ व्या शतकाचा उत्तरार्ध',
      year_text: 'इ.स. ११६३–११९९',
      title: 'ओरुगल्लु (वरंगळ) राजधानीची पायाभरणी आणि महादेवाची देवगिरी मोहीम',
      rulers_involved: 'रुद्रदेव (११५८–११९५) व महादेव (११९५–११९९)',
      political_development:
        'रुद्रदेवाने ओरुगल्लु नवीन राजधानीची पायाभरणी केली; त्यानंतर महादेव देवगिरीच्या यादवांविरुद्ध लढताना धारातीर्थी पडला असता सेनापती रेचर्ला रुद्राने राज्याचे रक्षण केले.',
      monuments_inscriptions: 'ओरुगल्लु किल्ल्याची प्रारंभिक बांधकामे; पालमपेट शिलालेख.',
      uncertainty_notes: 'समकालीन शिलालेखांनी प्रमाणित.'
    },
    or: {
      period: 'ଉତ୍ତର ୧୨ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୧୬୩–୧୧୯୯ ଖ୍ରୀ.ଅ.',
      title: 'ଓରୁଗଲ୍ଲୁ (ୱାରଙ୍ଗଲ) ରାଜଧାନୀ ଦୁର୍ଗ ସ୍ଥାପନ ଓ ମହାଦେବଙ୍କ ଦେବଗିରି ଅଭିଯାନ',
      rulers_involved: 'ରୁଦ୍ରଦେବ (୧୧୫୮–୧୧୯୫) ଓ ମହାଦେବ (୧୧୯୫–୧୧୯୯)',
      political_development:
        'ରୁଦ୍ରଦେବ ଓରୁଗଲ୍ଲୁ ନୂତନ ରାଜଧାନୀର ମୂଳଦୁଆ ପକାଇଥିଲେ; ପରେ ମହାଦେବ ଦେବଗିରି ଯୁଦ୍ଧରେ ବୀରଗତି ପ୍ରାପ୍ତ ହେବାରୁ ସେନାପତି ରେଚର୍ଲା ରୁଦ୍ର ରାଜ୍ୟ ରକ୍ଷା କରିଥିଲେ।',
      monuments_inscriptions: 'ଓରୁଗଲ୍ଲୁ ଦୁର୍ଗ ମୂଳଦୁଆ; ପାଲମପେଟ ଶିଳାଲେଖ।',
      uncertainty_notes: 'ସମକାଳୀନ ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।'
    },
    bn: {
      period: 'উত্তর ১২শ শতাব্দী',
      year_text: 'আনু. ১১৬৩–১১৯৯ খ্রি.',
      title: 'ওরুগল্লু (ওয়ারাঙ্গল) রাজধানী দুর্গের ভিত্তিপ্রস্তর ও মহাদেবের দেবগিরি অভিযান',
      rulers_involved: 'রুদ্রদেব (১১৫৮–১১৯৫) ও মহাদেব (১১৯৫–১১৯৯)',
      political_development:
        'রুদ্রদেব ওরুগল্লু নতুন রাজধানীর ভিত্তি স্থাপন করেন; পরে মহাদেব দেবগিরি অভিযানে বীরগতি প্রাপ্ত হলে সেনাপতি রেচর্লা রুদ্র রাজ্য রক্ষা করেন।',
      monuments_inscriptions: 'ওরুগল্লু দুর্গের প্রারম্ভিক নির্মাণ; পালমপেট শিলালিপি।',
      uncertainty_notes: 'সমসাময়িক শিলালিপি দ্বারা প্রমাণিত।'
    }
  },
  ev_kakatiya_ganapati_reign_1199: {
    hi: {
      period: '13वीं शताब्दी ई.',
      year_text: '1199–1262 ई.',
      title: 'सम्राट गणपति देव का 63-वर्षीय शासन: तेलुगु भूमि का एकीकरण, रामप्पा मंदिर (1213 ई.) एवं मोटुपल्ली चार्टर (1244 ई.)',
      rulers_involved: 'सम्राट गणपति देव (1199–1262 ई.), सेनापति रेचर्ला रुद्र एवं जयप सेनानी',
      political_development:
        'अपने 63-वर्षीय शासनकाल में गणपति देव ने तेलंगाना, तटीय आंध्र और रायलसीमा से कांचीपुरम तक साम्राज्य को एकीकृत किया, ओरुगल्लु को स्थायी राजधानी बनाया, 1213 ई. में पाखाल व रामप्पा जलाशयों और रामप्पा मंदिर का निर्माण कराया तथा 1244 ई. में मोटुपल्ली अभय शासन जारी किया।',
      monuments_inscriptions: 'रामप्पा मंदिर (1213 ई.); पाखाल झील; मोटुपल्ली अभय शासन स्तंभ लेख (1244 ई.)।',
      uncertainty_notes: 'आंध्र और तेलंगाना में 400 से अधिक दिनांकित शिलालेखों द्वारा प्रमाणित।'
    },
    te: {
      period: 'క్రీ.శ. 13వ శతాబ్దం',
      year_text: 'క్రీ.శ. 1199–1262',
      title: 'గణపతిదేవ చక్రవర్తి 63 ఏళ్ల పాలన: తెలుగు నేల ఏకీకరణ, రామప్ప గుడి (1213) & మోటుపల్లి అభయ శాసనం (1244)',
      rulers_involved: 'గణపతిదేవ చక్రవర్తి (1199–1262), సేనాని రేచర్ల రుద్రుడు & జాయప సేనాని',
      political_development:
        '63 ఏళ్ల సుదీర్ఘ పాలనలో గణపతిదేవుడు తెలంగాణ, తీర ఆంధ్ర, రాయలసీమలను కాంచీపురం వరకు ఏకం చేసి, ఓరుగల్లును శాశ్వత రాజధానిగా తీర్చిదిద్దాడు. 1213లో పాకాల, రామప్ప చెరువులు మరియు రామప్ప ఆలయం నిర్మింపబడినవి; 1244లో మోటుపల్లి అభయ శాసనం జారీ చేయబడింది.',
      monuments_inscriptions: 'రామప్ప దేవాలయం (1213); పాకాల చెరువు; మోటుపల్లి అభయ శాసనం (1244).',
      uncertainty_notes: 'ఆంధ్ర, తెలంగాణలలో లభించిన 400కు పైగా శాసనాల ద్వారా పూర్తిగా ధృవీకరించబడింది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 13ನೇ ಶತಮಾನ',
      year_text: 'ಕ್ರಿ.ಶ. 1199–1262',
      title: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವನ 63 ವರ್ಷಗಳ ಆಳ್ವಿಕೆ: ರಾಮಪ್ಪ ದೇವಾಲಯ (1213) ಮತ್ತು ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (1244)',
      rulers_involved: 'ಸಾಮ್ರಾಟ ಗಣಪತಿದೇವ (1199–1262), ರೇಚರ್ಲ ರುದ್ರ ಮತ್ತು ಜಾಯಪ ಸೇನಾನಿ',
      political_development:
        'ಗಣಪತಿದೇವನು ಸಮಗ್ರ ತೆಲುಗು ನಾಡನ್ನು ಒಂದುಗೂಡಿಸಿ ಓರುಗಲ್ಲನ್ನು ಶಾಶ್ವತ ರಾಜಧಾನಿಯನ್ನಾಗಿ ಮಾಡಿದನು; 1213ರಲ್ಲಿ ರಾಮಪ್ಪ ದೇವಾಲಯ ಹಾಗೂ 1244ರಲ್ಲಿ ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ ಸ್ಥಾಪನೆಯಾದವು.',
      monuments_inscriptions: 'ರಾಮಪ್ಪ ದೇವಾಲಯ (1213); ಪಾಕಾಲ ಕೆರೆ; ಮೋಟುಪಲ್ಲಿ ಅಭಯ ಶಾಸನ (1244).',
      uncertainty_notes: '400ಕ್ಕೂ ಹೆಚ್ಚು ಶಾಸನಗಳಿಂದ ದೃಢಪಟ್ಟಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 13ஆம் நூற்றாண்டு',
      year_text: 'பொ.ஊ. 1199–1262',
      title: 'பேரரசர் கணபதி தேவரின் 63 ஆண்டு ஆட்சி: ராமப்பா கோயில் (1213) & மோட்டுப்பள்ளி அபய சாசனம் (1244)',
      rulers_involved: 'பேரரசர் கணபதி தேவர் (1199–1262), ரேசர்ல ருத்ரன் & ஜாயப சேனானி',
      political_development:
        'கணபதி தேவர் தெலுங்குப் பகுதிகளை ஒன்றிணைத்து ஓருகல்லுவை நிரந்தரத் தலைநகராக்கினார்; 1213இல் ராமப்பா கோயிலும் 1244இல் மோட்டுப்பள்ளி அபய சாசனமும் உருவாக்கப்பட்டன.',
      monuments_inscriptions: 'ராமப்பா கோயில் (1213); பாகால் ஏரி; மோட்டுப்பள்ளி அபய சாசனம் (1244).',
      uncertainty_notes: '400க்கும் மேற்பட்ட கல்வெட்டுகளால் உறுதிப்படுத்தப்பட்டது.'
    },
    mr: {
      period: 'इ.स. १३ वे शतक',
      year_text: 'इ.स. ११९९–१२६२',
      title: 'सम्राट गणपती देवाची ६३ वर्षांची कारकीर्द: रामप्पा मंदिर (१२१३) व मोटुपल्ली अभय शासन (१२४४)',
      rulers_involved: 'सम्राट गणपती देव (११९९–१२६२), रेचर्ला रुद्र व जायप सेनानी',
      political_development:
        'गणपती देवाने संपूर्ण तेलुगू प्रदेश एकत्र करून ओरुगल्लुला स्थायी राजधानी बनवले; १२१३ मध्ये रामप्पा मंदिर आणि १२४४ मध्ये मोटुपल्ली अभय शासन उभारले गेले.',
      monuments_inscriptions: 'रामप्पा मंदिर (१२१३); पाखाल तलाव; मोटुपल्ली अभय शासन (१२४४).',
      uncertainty_notes: '४०० हून अधिक शिलालेखांनी प्रमाणित.'
    },
    or: {
      period: '୧୩ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୧୯୯–୧୨୬୨ ଖ୍ରୀ.ଅ.',
      title: 'ସମ୍ରାଟ ଗଣପତି ଦେବଙ୍କ ୬୩ ବର୍ଷର ଶାସନ: ରାମପ୍ପା ମନ୍ଦିର (୧୨୧୩) ଓ ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ (୧୨୪୪)',
      rulers_involved: 'ସମ୍ରାଟ ଗଣପତି ଦେବ (୧୧୯୯–୧୨୬୨), ରେଚର୍ଲା ରୁଦ୍ର ଓ ଜାୟପ ସେନାନୀ',
      political_development:
        'ଗଣପତି ଦେବ ସମଗ୍ର ତେଲୁଗୁ ଅଞ୍ଚଳକୁ ଏକତ୍ରିତ କରି ଓରୁଗଲ୍ଲୁକୁ ସ୍ଥାୟୀ ରାଜଧାନୀ କରିଥିଲେ; ୧୨୧୩ରେ ରାମପ୍ପା ମନ୍ଦିର ଓ ୧୨୪୪ରେ ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ ପ୍ରତିଷ୍ଠିତ ହୋଇଥିଲା।',
      monuments_inscriptions: 'ରାମପ୍ପା ମନ୍ଦିର (୧୨୧୩); ପାଖାଲ ହ୍ରଦ; ମୋଟୁପଲ୍ଲୀ ଅଭୟ ଶାସନ (୧୨୪୪)।',
      uncertainty_notes: '୪୦୦ରୁ ଅଧିକ ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।'
    },
    bn: {
      period: '১৩শ শতাব্দী',
      year_text: '১১৯৯–১২৬২ খ্রি.',
      title: 'সম্রাট গণপতি দেবের ৬৩ বছরের শাসন: রামাপ্পা মন্দির (১২১৩) ও মোতুপল্লী অভয় শাসন (১২৪৪)',
      rulers_involved: 'সম্রাট গণপতি দেব (১১৯৯–১২৬২), রেচর্লা রুদ্র ও জায়প সেনানী',
      political_development:
        'গণপতি দেব সমগ্র তেলুগু অঞ্চলকে ঐক্যবদ্ধ করে ওরুগল্লুকে স্থায়ী রাজধানী করেন; ১২১৩ খ্রিস্টাব্দে রামাপ্পা মন্দির এবং ১২৪৪ খ্রিস্টাব্দে মোতুপল্লী অভয় শাসন প্রতিষ্ঠিত হয়।',
      monuments_inscriptions: 'রামাপ্পা মন্দির (১২১৩); পাখাল হ্রদ; মোতুপল্লী অভয় শাসন (১২৪৪)।',
      uncertainty_notes: '৪০০-রও বেশি শিলালিপি দ্বারা প্রমাণিত।'
    }
  },
  ev_kakatiya_rudrama_reign_1262: {
    hi: {
      period: 'उत्तर 13वीं शताब्दी ई.',
      year_text: '1262–1289 ई.',
      title: 'रानी रुद्रमा देवी (रुद्रदेव महाराजा) का सार्वभौम शासन एवं चंदुपट्ला शिलालेख (नवंबर 1289 ई.)',
      rulers_involved: 'रानी रुद्रमा देवी (1262–1289 ई.)',
      political_development:
        '"रुद्रदेव महाराजा" की उपाधि के साथ शासन करते हुए रानी रुद्रमा देवी ने देवगिरि के यादव राजा महादेव को परास्त किया, ओरुगल्लु किले की ग्रेनाइट प्राचीर व खाई को पूर्ण कराया, मल्कापुरम में गोलकी मठ को दान दिया और नवंबर 1289 ई. में अंबादेव के विरुद्ध युद्ध में वीरगति प्राप्त की।',
      monuments_inscriptions: 'मल्कापुरम शिलालेख (1261 ई.); ओरुगल्लु पाषाण प्राचीर; चंदुपट्ला शिलालेख (27 नवंबर 1289 ई.)।',
      uncertainty_notes: 'चंदुपट्ला शिलालेख (27 नवंबर 1289 ई.) ने रुद्रमा देवी की रणभूमि वीरगति की सटीक तिथि सिद्ध की।'
    },
    te: {
      period: 'క్రీ.శ. 13వ శతాబ్దం ఉత్తరార్థం',
      year_text: 'క్రీ.శ. 1262–1289',
      title: 'రాణి రుద్రమదేవి (రుద్రదేవ మహారాజు) సార్వభౌమ పాలన & చందుపట్ల శాసనం (నవంబర్ 1289)',
      rulers_involved: 'రాణి రుద్రమదేవి (1262–1289)',
      political_development:
        '"రుద్రదేవ మహారాజు"గా సింహాసనాన్ని అధిష్టించిన రాణి రుద్రమదేవి దేవగిరి యాదవ రాజైన మహాదేవుని ఓడించింది, ఓరుగల్లు రాతి కోట మరియు కందకాన్ని పూర్తి చేసింది, మల్కాపురం గోళకీ మఠానికి భూదానం చేసింది మరియు క్రీ.శ. 1289 నవంబర్‌లో అంబదేవునిపై జరిగిన యుద్ధంలో వీరమరణం పొందింది.',
      monuments_inscriptions: 'మల్కాపురం శాసనం (1261); ఓరుగల్లు రాతి కోట & 45 బురుజులు; చందుపట్ల శాసనం (27 నవంబర్ 1289).',
      uncertainty_notes: 'చందుపట్ల శాసనం (27 నవంబర్ 1289) రుద్రమదేవి వీరమరణ తేదీని నిరూపించింది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 13ನೇ ಶತಮಾನದ ಉತ್ತರಾರ್ಧ',
      year_text: 'ಕ್ರಿ.ಶ. 1262–1289',
      title: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿಯ (ರುದ್ರದೇವ ಮಹಾರಾಜ) ಆಳ್ವಿಕೆ ಮತ್ತು ಚಂದುಪಟ್ಲ ಶಾಸನ (ನವೆಂಬರ್ 1289)',
      rulers_involved: 'ರಾಣಿ ರುದ್ರಮಾದೇವಿ (1262–1289)',
      political_development:
        '"ರುದ್ರದೇವ ಮಹಾರಾಜ"ಳಾಗಿ ಆಳಿದ ರಾಣಿ ರುದ್ರಮಾದೇವಿಯು ದೇವಗಿರಿಯ ಯಾದವ ರಾಜ ಮಹಾದೇವನನ್ನು ಸೋಲಿಸಿ, ಓರುಗಲ್ಲು ಕಲ್ಲಿನ ಕೋಟೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ, ನವೆಂಬರ್ 1289ರಲ್ಲಿ ಅಂಬದೇವನ ವಿರುದ್ಧ ಹೋರಾಡುತ್ತಾ ವೀರಮರಣ ಹೊಂದಿದಳು.',
      monuments_inscriptions: 'ಮಲ್ಕಾಪುರಂ ಶಾಸನ (1261); ಓರುಗಲ್ಲು ಕಲ್ಲಿನ ಕೋಟೆ; ಚಂದುಪಟ್ಲ ಶಾಸನ (27 ನವೆಂಬರ್ 1289).',
      uncertainty_notes: 'ಚಂದುಪಟ್ಲ ಶಾಸನವು ರುದ್ರಮಾದೇವಿಯ ವೀರಮರಣದ ನಿಖರ ದಿನಾಂಕವನ್ನು ಸಾಬೀತುಪಡಿಸಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 13ஆம் நூற்றாண்டின் பிற்பகுதி',
      year_text: 'பொ.ஊ. 1262–1289',
      title: 'ராணி ருத்ரமா தேவியின் (உருத்ரதேவ மகாராஜா) ஆட்சி & சந்துபட்லா கல்வெட்டு (நவம்பர் 1289)',
      rulers_involved: 'ராணி ருத்ரமா தேவி (1262–1289)',
      political_development:
        '"உருத்ரதேவ மகாராஜா"வாக ஆட்சி செய்த ராணி ருத்ரமா தேவி தேவகிரி யாதவ மன்னன் மகாதேவனை வென்று, ஓருகல்லு கற்கோட்டையை நிறைவு செய்து, நவம்பர் 1289இல் அம்பதேவனுக்கு எதிரான போரில் வீரமரணம் அடைந்தார்.',
      monuments_inscriptions: 'மல்காபுரம் கல்வெட்டு (1261); ஓருகல்லு கற்கோட்டை; சந்துபட்லா கல்வெட்டு (27 நவம்பர் 1289).',
      uncertainty_notes: 'சந்துபட்லா கல்வெட்டு ருத்ரமா தேவியின் வீரமரணத் தேதியை உறுதிப்படுத்தியது.'
    },
    mr: {
      period: 'इ.स. १३ व्या शतकाचा उत्तरार्ध',
      year_text: 'इ.स. १२६२–१२८९',
      title: 'राणी रुद्रमा देवीचे (रुद्रदेव महाराजा) सार्वभौम शासन आणि चंदुपट्ला शिलालेख (नोव्हेंबर १२८९)',
      rulers_involved: 'राणी रुद्रमा देवी (१२६२–१२८९)',
      political_development:
        '"रुद्रदेव महाराजा" म्हणून राज्य करताना राणी रुद्रमा देवीने देवगिरीच्या यादव राजा महादेवाचा पराभव केला, ओरुगल्लु दगडी किल्ला पूर्ण केला आणि नोव्हेंबर १२८९ मध्ये अंबादेवाविरुद्धच्या युद्धात तिला वीरमरण आले.',
      monuments_inscriptions: 'मल्कापुरम शिलालेख (१२६१); ओरुगल्लु दगडी किल्ला; चंदुपट्ला शिलालेख (२७ नोव्हेंबर १२८९).',
      uncertainty_notes: 'चंदुपट्ला शिलालेखाने रुद्रमा देवीच्या वीरमरणाची अचूक तारीख सिद्ध केली.'
    },
    or: {
      period: 'ଉତ୍ତର ୧୩ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୨୬୨–୧୨୮୯ ଖ୍ରୀ.ଅ.',
      title: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ (ରୁଦ୍ରଦେବ ମହାରାଜା) ସାର୍ବଭୌମ ଶାସନ ଓ ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ (ନଭେମ୍ବର ୧୨୮୯)',
      rulers_involved: 'ରାଣୀ ରୁଦ୍ରମା ଦେବୀ (୧୨୬୨–୧୨୮୯)',
      political_development:
        '"ରୁଦ୍ରଦେବ ମହାରାଜା" ଭାବେ ଶାସନ କରି ରାଣୀ ରୁଦ୍ରମା ଦେବୀ ଦେବଗିରିର ଯାଦବ ରାଜା ମହାଦେବଙ୍କୁ ପରାସ୍ତ କରିଥିଲେ, ଓରୁଗଲ୍ଲୁ ପ୍ରସ୍ତର ଦୁର୍ଗ ପୂର୍ଣ୍ଣ କରିଥିଲେ ଓ ନଭେମ୍ବର ୧୨୮୯ରେ ଅମ୍ବାଦେବଙ୍କ ବିରୁଦ୍ଧରେ ଯୁଦ୍ଧରେ ବୀରଗତି ପ୍ରାପ୍ତ ହୋଇଥିଲେ।',
      monuments_inscriptions: 'ମଲ୍କାପୁରମ ଶିଳାଲେଖ (୧୨୬୧); ଓରୁଗଲ୍ଲୁ ପ୍ରସ୍ତର ଦୁର୍ଗ; ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ (୨୭ ନଭେମ୍ବର ୧୨୮୯)।',
      uncertainty_notes: 'ଚନ୍ଦୁପଟ୍ଲା ଶିଳାଲେଖ ରାଣୀ ରୁଦ୍ରମା ଦେବୀଙ୍କ ବୀରଗତିର ସଠିକ ତାରିଖ ପ୍ରମାଣ କରିଛି।'
    },
    bn: {
      period: 'উত্তর ১৩শ শতাব্দী',
      year_text: '১২৬২–১২৮৯ খ্রি.',
      title: 'রানি রুদ্রমা দেবীর (রুদ্রদেব মহারাজা) সার্বভৌম শাসন ও চন্দুপট্লা শিলালিপি (নভেম্বর ১২৮৯)',
      rulers_involved: 'রানি রুদ্রমা দেবী (১২৬২–১২৮৯)',
      political_development:
        '"রুদ্রদেব মহারাজা" হিসেবে শাসন করে রানি রুদ্রমা দেবী দেবগিরির যাদব রাজা মহাদেবকে পরাস্ত করেন, ওরুগল্লু প্রস্তর দুর্গ সম্পন্ন করেন এবং নভেম্বর ১২৮৯ খ্রিস্টাব্দে অম্বাদেবের বিরুদ্ধে যুদ্ধে বীরগতি প্রাপ্ত হন।',
      monuments_inscriptions: 'মল্কাপুরম শিলালিপি (১২৬১); ওরুগল্লু প্রস্তর দুর্গ; চন্দুপট্লা শিলালিপি (২৭ নভেম্বর ১২৮৯)।',
      uncertainty_notes: 'চন্দুপট্লা শিলালিপি রানি রুদ্রমা দেবীর বীরগতির সুনির্দিষ্ট তারিখ প্রমাণ করেছে।'
    }
  },
  ev_kakatiya_prataparudra_reign_1289: {
    hi: {
      period: '13वीं शताब्दी का अंत – प्रारंभिक 14वीं शताब्दी ई.',
      year_text: '1289–1303 ई.',
      title: 'सम्राट प्रतापरुद्र द्वितीय का राज्यारोहण, 77-नायंकर पुनर्गठन एवं उप्परपल्ली विजय (1303 ई.)',
      rulers_involved: 'सम्राट प्रतापरुद्र द्वितीय (1289–1323 ई.) एवं नायक सेनापति पोतुगंटी मैली व रेचर्ला प्रसादित्य',
      political_development:
        'अपनी दादी रुद्रमा देवी के उत्तराधिकारी के रूप में प्रतापरुद्र द्वितीय ने त्रिपुरांतकम में अंबादेव के विद्रोह को कुचला, 77 नायकों के अधीन नायंकर सैन्य प्रशासन का पुनर्गठन किया और 1303 ई. में उप्परपल्ली के युद्ध में अलाउद्दीन खिलजी की प्रथम दिल्ली सल्तनत सेना को करारी शिकस्त दी।',
      monuments_inscriptions: 'त्रिपुरांतकम, श्रीशैलम और करीमनगर शिलालेख; विद्यानाथ रचित प्रतापरुद्रीय।',
      uncertainty_notes: 'तेलुगु शिलालेखों और फारसी इतिहासकार जियाउद्दीन बरनी दोनों द्वारा सत्यापित।'
    },
    te: {
      period: 'క్రీ.శ. 13వ శతాబ్దం చివర – 14వ శతాబ్దం ప్రారంభం',
      year_text: 'క్రీ.శ. 1289–1303',
      title: 'రెండవ ప్రతాపరుద్రుని పట్టాభిషేకం, 77 నాయంకర వ్యవస్థ & ఉప్పరపల్లి విజయం (1303)',
      rulers_involved: 'రెండవ ప్రతాపరుద్ర చక్రవర్తి (1289–1323), పోతుగంటి మైలి & రేచర్ల ప్రసాదిత్యుడు',
      political_development:
        'తన అమ్మమ్మ రుద్రమదేవి తదుపరి సింహాసనాన్ని అధిష్టించిన రెండవ ప్రతాపరుద్రుడు త్రిపురాంతకంలో అంబదేవుని అణచివేసి, 77 మంది నాయకులతో నాయంకర సైనిక విధానాన్ని పటిష్ఠం చేసి, క్రీ.శ. 1303లో ఉప్పరపల్లి యుద్ధంలో అల్లావుద్దీన్ ఖిల్జీ పంపిన తొలి ఢిల్లీ సుల్తాన్ సైన్యాన్ని చిత్తుగా ఓడించాడు.',
      monuments_inscriptions: 'త్రిపురాంతకం, శ్రీశైలం శాసనాలు; విద్యానాథుని ప్రతాపరుద్రీయం.',
      uncertainty_notes: 'తెలుగు శాసనాలు మరియు పర్షియన్ చరిత్రకారుడు బరనీ రచనల ద్వారా ధృవీకరించబడింది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 13ನೇ ಶತಮಾನದ ಅಂತ್ಯ – 14ನೇ ಶತಮಾನದ ಆರಂಭ',
      year_text: 'ಕ್ರಿ.ಶ. 1289–1303',
      title: 'ಎರಡನೇ ಪ್ರತಾಪರುದ್ರನ ಪಟ್ಟಾಭಿಷೇಕ, 77 ನಾಯಂಕರ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಉಪ್ಪರಪಲ್ಲಿ ವಿಜಯ (1303)',
      rulers_involved: 'ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ (1289–1323)',
      political_development:
        'ಎರಡನೇ ಪ್ರತಾಪರುದ್ರನು ಅಂಬದೇವನ ದಂಗೆಯನ್ನು ಅಡಗಿಸಿ, 77 ನಾಯಕರ ಅಡಿಯಲ್ಲಿ ನಾಯಂಕರ ಸೈನಿಕ ಆಡಳಿತವನ್ನು ಸಂಘಟಿಸಿ, 1303ರ ಉಪ್ಪರಪಲ್ಲಿ ಕದನದಲ್ಲಿ ದೆಹಲಿ ಸುಲ್ತಾನರ ಮೊದಲ ದಾಳಿಯನ್ನು ಹಿಮ್ಮೆಟ್ಟಿಸಿದನು.',
      monuments_inscriptions: 'ತ್ರಿಪುರಾಂತಕಂ ಮತ್ತು ಶ್ರೀಶೈಲಂ ಶಾಸನಗಳು; ವಿದ್ಯಾನಾಥನ ಪ್ರತಾಪರುದ್ರೀಯ.',
      uncertainty_notes: 'ಶಾಸನಗಳು ಮತ್ತು ಪರ್ಷಿಯನ್ ದಾಖಲೆಗಳಿಂದ ದೃಢಪಟ್ಟಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 13ஆம் நூற்றாண்டின் இறுதி – 14ஆம் நூற்றாண்டின் தொடக்கம்',
      year_text: 'பொ.ஊ. 1289–1303',
      title: 'இரண்டாம் பிரதாபருத்ரரின் முடிசூட்டல், 77 நாயங்கர முறை & உப்பரப்பள்ளி வெற்றி (1303)',
      rulers_involved: 'இரண்டாம் பிரதாபருத்ரர் (1289–1323)',
      political_development:
        'இரண்டாம் பிரதாபருத்ரர் அம்பதேவனின் கிளர்ச்சியை ஒடுக்கி, 77 நாயக்கர்களின் கீழ் நாயங்கர இராணுவ முறையைச் சீரமைத்து, 1303 உப்பரப்பள்ளி போரில் டெல்லி சுல்தானகத்தின் முதல் படையெடுப்பை முறியடித்தார்.',
      monuments_inscriptions: 'திரிபுராந்தகம், ஸ்ரீசைலம் கல்வெட்டுகள்; வித்யாநாதரின் பிரதாபருத்ரீயம்.',
      uncertainty_notes: 'கல்வெட்டுகள் மற்றும் பாரசீக ஆவணங்களால் உறுதிப்படுத்தப்பட்டது.'
    },
    mr: {
      period: 'इ.स. १३ व्या शतकाचा शेवट – १४ व्या शतकाची सुरुवात',
      year_text: 'इ.स. १२८९–१३०३',
      title: 'प्रतापरुद्र दुसऱ्याचे राज्यारोहण, ७७ नायंकर पुनर्रचना व उप्परपल्ली विजय (१३०३)',
      rulers_involved: 'सम्राट प्रतापरुद्र दुसरा (१२८९–१३२३)',
      political_development:
        'प्रतापरुद्र दुसऱ्याने अंबादेवाचे बंड मोडून काढले, ७७ नायकांच्या हाती नायंकर लष्करी व्यवस्था सोपवली आणि १३०३ च्या उप्परपल्ली युद्धात दिल्ली सल्तनतीच्या पहिल्या आक्रमणाचा पराभव केला.',
      monuments_inscriptions: 'त्रिपुरांतकम व श्रीशैलम शिलालेख; विद्यानाथाचा प्रतापरुद्रीय ग्रंथ.',
      uncertainty_notes: 'शिलालेख आणि फारसी तवारिखांनी प्रमाणित.'
    },
    or: {
      period: '୧୩ଶ ଶତାବ୍ଦୀ ଶେଷ – ପ୍ରାରମ୍ଭିକ ୧୪ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୨୮୯–୧୩୦୩ ଖ୍ରୀ.ଅ.',
      title: 'ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ରଙ୍କ ରାଜ୍ୟାଭିଷେକ, ୭୭ ନାୟଙ୍କର ପୁନର୍ଗଠନ ଓ ଉପ୍ପରପଲ୍ଲୀ ବିଜୟ (୧୩୦୩)',
      rulers_involved: 'ସମ୍ରାଟ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର (୧୨୮୯–୧୩୨୩)',
      political_development:
        'ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର ଅମ୍ବାଦେବଙ୍କ ବିଦ୍ରୋହ ଦମନ କରି ୭୭ ନାୟକଙ୍କ ଅଧୀନରେ ନାୟଙ୍କର ସାମରିକ ବ୍ୟବସ୍ଥା ଗଠନ କରିଥିଲେ ଓ ୧୩୦୩ ଉପ୍ପରପଲ୍ଲୀ ଯୁଦ୍ଧରେ ଦିଲ୍ଲୀ ସୁଲତାନୀ ସେନାକୁ ପରାସ୍ତ କରିଥିଲେ।',
      monuments_inscriptions: 'ତ୍ରିପୁରାନ୍ତକମ ଓ ଶ୍ରୀଶୈଳମ ଶିଳାଲେଖ; ବିଦ୍ୟାନାଥଙ୍କ ପ୍ରତାପରୁଦ୍ରୀୟ।',
      uncertainty_notes: 'ଶିଳାଲେଖ ଓ ପାରସ୍ୟ ଇତିହାସ ଦ୍ୱାରା ପ୍ରମାଣିତ।'
    },
    bn: {
      period: '১৩শ শতাব্দীর শেষ – প্রারম্ভিক ১৪শ শতাব্দী',
      year_text: '১২৮৯–১৩০৩ খ্রি.',
      title: 'দ্বিতীয় প্রতাপরুদ্রের অভিষেক, ৭৭ নায়ঙ্কর পুনর্গঠন ও উপ্পরপল্লী বিজয় (১৩০৩)',
      rulers_involved: 'সম্রাট দ্বিতীয় প্রতাপরুদ্র (১২৮৯–১৩২৩)',
      political_development:
        'দ্বিতীয় প্রতাপরুদ্র অম্বাদেবের বিদ্রোহ দমন করে ৭৭ জন নায়কের অধীনে নায়ঙ্কর সামরিক ব্যবস্থা পুনর্গঠন করেন এবং ১৩০৩ খ্রিস্টাব্দের উপ্পরপল্লী যুদ্ধে দিল্লি সুলতানি বাহিনীকে পরাস্ত করেন।',
      monuments_inscriptions: 'ত্রিপুরান্তকম ও শ্রীশৈলম শিলালিপি; বিদ্যানাথের প্রতাপরুদ্রীয়।',
      uncertainty_notes: 'শিলালিপি ও ফারসি ইতিহাস দ্বারা প্রমাণিত।'
    }
  },
  ev_kakatiya_delhi_sieges_1309: {
    hi: {
      period: 'प्रारंभिक 14वीं शताब्दी ई.',
      year_text: '1309–1318 ई.',
      title: 'मलिक काफूर (1309–1310 ई.) एवं खुसरो खान (1318 ई.) के विरुद्ध ओरुगल्लु की प्रतिरक्षा',
      rulers_involved: 'सम्राट प्रतापरुद्र द्वितीय बनाम मलिक काफूर (1309–1310 ई.) एवं खुसरो खान (1318 ई.)',
      political_development:
        '1309–1310 ई. में मलिक काफूर ने ओरुगल्लु के बाहरी मिट्टी के कोट और मध्य पाषाण किले का घेरा डाला, जिसके बाद संधि हुई। 1316 ई. में प्रतापरुद्र द्वितीय ने पुनः दक्षिण में कांचीपुरम तक अभियान चलाया और 1318 ई. में खुसरो खान के आक्रमण का सामना किया।',
      monuments_inscriptions: 'ओरुगल्लु की बाहरी मिट्टी की प्राचीर (मट्टी कोटा) एवं 45 पाषाण बुर्ज; कांचीपुरम शिलालेख (1316 ई.)।',
      uncertainty_notes: 'अमीर खुसरो की खज़ाइन-उल-फुतूह और कांचीपुरम के शिलालेखों द्वारा सत्यापित।'
    },
    te: {
      period: 'క్రీ.శ. 14వ శతాబ్దం ప్రారంభం',
      year_text: 'క్రీ.శ. 1309–1318',
      title: 'మాలిక్ కాఫర్ (1309–1310) & ఖుస్రూ ఖాన్ (1318) ముట్టడులలో ఓరుగల్లు రక్షణ పోరాటాలు',
      rulers_involved: 'రెండవ ప్రతాపరుద్ర చక్రవర్తి vs. మాలిక్ కాఫర్ (1309–1310) & ఖుస్రూ ఖాన్ (1318)',
      political_development:
        '1309–1310లో మాలిక్ కాఫర్ ఓరుగల్లు కోటను నెలరోజులకు పైగా ముట్టడించగా సంధి కుదిరింది. అనంతరం ప్రతాపరుద్రుడు తిరిగి స్వతంత్రంగా 1316లో కాంచీపురం వరకు జైత్రయాత్ర జరిపి, 1318లో ఖుస్రూ ఖాన్ దండయాత్రను ఎదుర్కొన్నాడు.',
      monuments_inscriptions: 'ఓరుగల్లు మట్టి కోట & 45 రాతి బురుజులు; ప్రతాపరుద్రుని దక్షిణ కాంచీపురం శాసనం (1316).',
      uncertainty_notes: 'అమీర్ ఖుస్రూ రచనలు మరియు కాంచీపురం శాసనాల ద్వారా ధృవీకరించబడింది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 14ನೇ ಶತಮಾನದ ಆರಂಭ',
      year_text: 'ಕ್ರಿ.ಶ. 1309–1318',
      title: 'ಮಾಲಿಕ್ ಕಾಫರ್ (1309–1310) ಮತ್ತು ಖುಸ್ರು ಖಾನ್ (1318) ಮುತ್ತಿಗೆಗಳ ವಿರುದ್ಧ ಓರುಗಲ್ಲು ರಕ್ಷಣೆ',
      rulers_involved: 'ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ vs. ಮಾಲಿಕ್ ಕಾಫರ್ ಮತ್ತು ಖುಸ್ರು ಖಾನ್',
      political_development:
        '1309–1310ರಲ್ಲಿ ಮಾಲಿಕ್ ಕಾಫರ್ ಓರುಗಲ್ಲನ್ನು ಮುತ್ತಿಗೆ ಹಾಕಿದ ನಂತರ ಒಪ್ಪಂದವಾಯಿತು; 1316ರಲ್ಲಿ ಪ್ರತಾಪರುದ್ರನು ಕಾಂಚೀಪುರಂವರೆಗೆ ದಂಡಯಾತ್ರೆ ನಡೆಸಿ 1318ರಲ್ಲಿ ಖುಸ್ರು ಖಾನ್ ದಾಳಿಯನ್ನು ಎದುರಿಸಿದನು.',
      monuments_inscriptions: 'ಓರುಗಲ್ಲು ಮಣ್ಣಿನ ಕೋಟೆ ಮತ್ತು 45 ಕಲ್ಲಿನ ಬುರುಜುಗಳು; ಕಾಂಚೀಪುರಂ ಶಾಸನ (1316).',
      uncertainty_notes: 'ಅಮೀರ್ ಖುಸ್ರು ದಾಖಲೆ ಮತ್ತು ಕಾಂಚೀಪುರಂ ಶಾಸನಗಳಿಂದ ದೃಢಪಟ್ಟಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 14ஆம் நூற்றாண்டின் தொடக்கம்',
      year_text: 'பொ.ஊ. 1309–1318',
      title: 'மாலிக் காபூர் (1309–1310) & குஸ்ரு கான் (1318) முற்றுகைகளுக்கு எதிராக ஓருகல்லு பாதுகாப்பு',
      rulers_involved: 'இரண்டாம் பிரதாபருத்ரர் vs. மாலிக் காபூர் & குஸ்ரு கான்',
      political_development:
        '1309–1310இல் மாலிக் காபூர் முற்றுகைக்குப் பின் உடன்படிக்கை ஏற்பட்டது; 1316இல் பிரதாபருத்ரர் காஞ்சிபுரம் வரை படையெடுத்து 1318இல் குஸ்ரு கான் முற்றுகையை எதிர்கொண்டார்.',
      monuments_inscriptions: 'ஓருகல்லு மண் கோட்டை & 45 கற்கொத்தளங்கள்; காஞ்சிபுரம் கல்வெட்டு (1316).',
      uncertainty_notes: 'அமீர் குஸ்ருவின் குறிப்புகள் மற்றும் காஞ்சிபுரம் கல்வெட்டுகளால் உறுதிப்படுத்தப்பட்டது.'
    },
    mr: {
      period: 'इ.स. १४ व्या शतकाची सुरुवात',
      year_text: 'इ.स. १३०९–१३१८',
      title: 'मलिक काफूर (१३०९–१३१०) व खुसरो खान (१३१८) यांच्या वेढ्यांविरुद्ध ओरुगल्लुचा बचाव',
      rulers_involved: 'सम्राट प्रतापरुद्र दुसरा विरुद्ध मलिक काफूर व खुसरो खान',
      political_development:
        '१३०९–१३१० मधील मलिक काफूरच्या वेढ्यानंतर तह झाला; १३१६ मध्ये प्रतापरुद्राने कांचीपुरमपर्यंत मोहीम काढली आणि १३१८ मध्ये खुसरो खानाच्या मोहिमेला तोंड दिले.',
      monuments_inscriptions: 'ओरुगल्लुचा मातीचा कोट व ४५ दगडी बुरूज; कांचीपुरम शिलालेख (१३१६).',
      uncertainty_notes: 'अमीर खुसरोचे लेखन आणि कांचीपुरम शिलालेखांनी प्रमाणित.'
    },
    or: {
      period: 'ପ୍ରାରମ୍ଭିକ ୧୪ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୩୦୯–୧୩୧୮ ଖ୍ରୀ.ଅ.',
      title: 'ମଲିକ କାଫୁର (୧୩୦୯–୧୩୧୦) ଓ ଖୁସ্রୋ ଖାନ (୧୩୧୮) ଙ୍କ ଅଭିଯାନ ବିରୁଦ୍ଧରେ ଓରୁଗଲ୍ଲୁ ରକ୍ଷା',
      rulers_involved: 'ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର ବନାମ ମଲିକ କାଫୁର ଓ ଖୁସ্রୋ ଖାନ',
      political_development:
        '୧୩୦୯–୧୩୧୦ରେ ମଲିକ କାଫୁରଙ୍କ ଅବୋରୋଧ ପରେ ସନ୍ଧି ହୋଇଥିଲା; ୧୩୧୬ରେ ପ୍ରତାପରୁଦ୍ର କାଞ୍ଚିପୁରମ ପର୍ଯ୍ୟନ୍ତ ଅଭିଯାନ କରି ୧୩୧୮ରେ ଖୁସ্রୋ ଖାନଙ୍କ ଆକ୍ରମଣର ସମ୍ମୁଖୀନ ହୋଇଥିଲେ।',
      monuments_inscriptions: 'ଓରୁଗଲ୍ଲୁ ମାଟି ପ୍ରାଚୀର ଓ ୪୫ ପ୍ରସ୍ତର ବୁରୁଜ; କାଞ୍ଚିପୁରମ ଶିଳାଲେଖ (୧୩୧୬)।',
      uncertainty_notes: 'ଅମୀର ଖୁସ্রୋଙ୍କ ବିବରଣୀ ଓ କାଞ୍ଚିପୁରମ ଶିଳାଲେଖ ଦ୍ୱାରା ପ୍ରମାଣିତ।'
    },
    bn: {
      period: 'প্রারম্ভিক ১৪শ শতাব্দী',
      year_text: '১৩০৯–১৩১৮ খ্রি.',
      title: 'মালিক কাফুর (১৩০৯–১৩১০) ও খসরু খান (১৩১৮)-এর অবরোধের বিরুদ্ধে ওরুগল্লু প্রতিরক্ষা',
      rulers_involved: 'দ্বিতীয় প্রতাপরুদ্র বনাম মালিক কাফুর ও খসরু খান',
      political_development:
        '১৩০৯–১৩১০-এ মালিক কাফুরের অবরোধের পর সন্ধি হয়; ১৩১৬ খ্রিস্টাব্দে প্রতাপরুদ্র কাঞ্চীপুরম পর্যন্ত অভিযান করেন এবং ১৩১৮ খ্রিস্টাব্দে খসরু খানের আক্রমণ মোকাবিলা করেন।',
      monuments_inscriptions: 'ওরুগল্লু মাটির প্রাচীর ও ৪৫টি প্রস্তর বুরুজ; কাঞ্চীপুরম শিলালিপি (১৩১৬)।',
      uncertainty_notes: 'আমির খসরুর বিবরণ ও কাঞ্চীপুরম শিলালিপি দ্বারা প্রমাণিত।'
    }
  },
  ev_kakatiya_fall_warangal_1323: {
    hi: {
      period: 'प्रारंभिक 14वीं शताब्दी ई.',
      year_text: '1323 ई.',
      title: 'ओरुगल्लु का अंतिम घेरा एवं पतन (1323 ई.), प्रतापरुद्र द्वितीय का आत्मोत्सर्ग एवं नायक मुक्ति संग्राम',
      rulers_involved: 'सम्राट प्रतापरुद्र द्वितीय बनाम उलुग खान (मुहम्मद बिन तुगलक); मुसुनुरी प्रोलय एवं कापय नायक',
      political_development:
        '1321–1322 ई. में उलुग खान के प्रथम आक्रमण को विफल करने के बाद, 1323 ई. में पाँच महीने के भीषण घेरे के पश्चात ओरुगल्लु का पतन हुआ। दिल्ली ले जाए जाते समय सम्राट प्रतापरुद्र द्वितीय ने नर्मदा नदी (सोमोद्भव) के तट पर अपने प्राण त्याग दिए। एक दशक के भीतर 75 काकतीय नायकों ने मुसुनुरी प्रोलय और कापय नायक के नेतृत्व में 1336 ई. तक ओरुगल्लु को पुनः स्वतंत्र करा लिया।',
      monuments_inscriptions: 'वारंगल किले के कीर्ति तोरण; मुसुनुरी प्रोलय नायक का विलास ताम्रपत्र (1330 ई.); कलुवचेरु ताम्रपत्र (1423 ई.)।',
      uncertainty_notes: 'नर्मदा तट पर प्रतापरुद्र द्वितीय का आत्मोत्सर्ग समकालीन विलास ताम्रपत्र (1330 ई.) में स्पष्ट रूप से अंकित है।'
    },
    te: {
      period: 'క్రీ.శ. 14వ శతాబ్దం ప్రారంభం',
      year_text: 'క్రీ.శ. 1323',
      title: 'ఓరుగల్లు కోట తుది ముట్టడి & పతనం (1323), ప్రతాపరుద్రుని ఆత్మార్పణం & ముసునూరి నాయకుల విముక్తి పోరాటం',
      rulers_involved: 'రెండవ ప్రతాపరుద్ర చక్రవర్తి vs. ఉలుఘ్ ఖాన్ (ముహమ్మద్ బిన్ తుగ్లక్); ముసునూరి ప్రోలయ & కాపయ నాయకులు',
      political_development:
        '1321–1322లో ఉలుఘ్ ఖాన్ మొదటి దాడిని తిప్పికొట్టిన అనంతరం, క్రీ.శ. 1323లో ఐదు నెలల భీకర ముట్టడి తర్వాత ఓరుగల్లు కోట పతనమైంది. బందీగా ఢిల్లీకి తరలించబడుతూ ప్రతాపరుద్ర చక్రవర్తి నర్మదా నదీ (సోమోద్భవ) తీరంలో ప్రాణత్యాగం చేశాడు. పదేళ్లలోనే 75 మంది కాకతీయ నాయకులు ముసునూరి ప్రోలయ, కాపయ నాయకుల నేతృత్వంలో ఏకమై 1336 నాటికి ఓరుగల్లును తిరిగి విముక్తి చేశారు.',
      monuments_inscriptions: 'వరంగల్ కోట కీర్తి తోరణాలు; ముసునూరి ప్రోలయ నాయకుని విలాస తామ్రశాసనం (1330); కలువచేరు శాసనం (1423).',
      uncertainty_notes: 'నర్మదా నదీ తీరాన ప్రతాపరుద్రుని ఆత్మార్పణం సమకాలీన విలాస తామ్రశాసనం (1330) లో స్పష్టంగా నమోదైంది.'
    },
    kn: {
      period: 'ಕ್ರಿ.ಶ. 14ನೇ ಶತಮಾನದ ಆರಂಭ',
      year_text: 'ಕ್ರಿ.ಶ. 1323',
      title: 'ಓರುಗಲ್ಲು ಕೋಟೆಯ ಅಂತಿಮ ಮುತ್ತಿಗೆ ಮತ್ತು ಪತನ (1323), ಪ್ರತಾಪರುದ್ರನ ಆತ್ಮಾರ್ಪಣೆ ಹಾಗೂ ನಾಯಕರ ವಿಮೋಚನಾ ಹೋರಾಟ',
      rulers_involved: 'ಎರಡನೇ ಪ್ರತಾಪರುದ್ರ vs. ಉಲುಘ್ ಖಾನ್; ಮುసుನೂರಿ ಪ್ರೋಲಯ ಮತ್ತು ಕಾಪಯ ನಾಯಕ',
      political_development:
        '1323ರಲ್ಲಿ ಐದು ತಿಂಗಳ ಮುತ್ತಿಗೆಯ ನಂತರ ಓರುಗಲ್ಲು ಪತನವಾಯಿತು; ಸೆರೆಸಿಕ್ಕ ಎರಡನೇ ಪ್ರತಾಪರುದ್ರನು ನರ್ಮದಾ ನದಿ ತೀರದಲ್ಲಿ ಪ್ರಾಣತ್ಯಾಗ ಮಾಡಿದನು. ಹತ್ತು ವರ್ಷಗಳಲ್ಲಿ 75 ಕಾಕತೀಯ ನಾಯಕರು ಮುసుನೂರಿ ನಾಯಕರ ನೇತೃತ್ವದಲ್ಲಿ ಒಂದಾಗಿ 1336ರಲ್ಲಿ ಓರುಗಲ್ಲನ್ನು ವಿಮೋಚನೆಗೊಳಿಸಿದರು.',
      monuments_inscriptions: 'ವರಂಗಲ್ ಕೋಟೆಯ ಕೀರ್ತಿ ತೋರಣಗಳು; ವಿಲಾಸ ತಾಮ್ರಶಾಸನ (1330); ಕಲುವಚೇರು ಶಾಸನ (1423).',
      uncertainty_notes: 'ವಿಲಾಸ ತಾಮ್ರಶಾಸನದಲ್ಲಿ (1330) ಪ್ರತಾಪರುದ್ರನ ನರ್ಮದಾ ತೀರದ ಆತ್ಮಾರ್ಪಣೆ ಸ್ಪಷ್ಟವಾಗಿ ದಾಖಲಾಗಿದೆ.'
    },
    ta: {
      period: 'பொ.ஊ. 14ஆம் நூற்றாண்டின் தொடக்கம்',
      year_text: 'பொ.ஊ. 1323',
      title: 'ஓருகல்லு கோட்டையின் இறுதி முற்றுகையும் வீழ்ச்சியும் (1323), பிரதாபருத்ரரின் தியாகம் & நாயக்கர் விடுதலைப் போர்',
      rulers_involved: 'இரண்டாம் பிரதாபருத்ரர் vs. உலுக் கான்; முசுனூரி புரோலய & காபய நாயக்கர்',
      political_development:
        '1323இல் ஐந்து மாத முற்றுகைக்குப் பின் ஓருகல்லு வீழ்ந்தது; சிறைப்பிடிக்கப்பட்ட இரண்டாம் பிரதாபருத்ரர் நர்மதை ஆற்றங்கரையில் உயிர் நீத்தார். பத்தாண்டுகளுக்குள் 75 காகதீய நாயக்கர்கள் முசுனூரி நாயக்கர்கள் தலைமையில் இணைந்து 1336இல் ஓருகல்லுவை மீட்டனர்.',
      monuments_inscriptions: 'வாரங்கல் கோட்டை கீர்த்தி தோரணங்கள்; விலாச செப்பேடு (1330); களுவசேரு செப்பேடு (1423).',
      uncertainty_notes: 'நர்மதை ஆற்றங்கரையில் பிரதாபருத்ரர் உயிர் நீத்தது விலாச செப்பேட்டில் (1330) பதிவு செய்யப்பட்டுள்ளது.'
    },
    mr: {
      period: 'इ.स. १४ व्या शतकाची सुरुवात',
      year_text: 'इ.स. १३२३',
      title: 'ओरुगल्लुचा अंतिम वेढा व पाडाव (१३२३), प्रतापरुद्र दुसऱ्याचे आत्मार्पण आणि नायक स्वातंत्र्यलढा',
      rulers_involved: 'सम्राट प्रतापरुद्र दुसरा विरुद्ध उलुघ खान; मुसुनुरी प्रोलय व कापय नायक',
      political_development:
        '१३२३ मध्ये पाच महिन्यांच्या वेढ्यानंतर ओरुगल्लुचा पाडाव झाला; दिल्लीला नेले जात असताना प्रतापरुद्र दुसऱ्याने नर्मदा नदीकाठी प्राणत्याग केला. एका दशकातच ७५ काकतीय नायकांनी मुसुनुरी नायकांच्या नेतृत्वाखाली १३३६ पर्यंत ओरुगल्लु पुन्हा स्वतंत्र केले.',
      monuments_inscriptions: 'वरंगळ किल्ल्याची कीर्ती तोरणे; विलास ताम्रपट (१३३०); कलुवचेरु ताम्रपट (१४२३).',
      uncertainty_notes: 'विलास ताम्रपटात (१३३०) प्रतापरुद्राच्या नर्मदा तीरावरील आत्मार्पणाची स्पष्ट नोंद आहे.'
    },
    or: {
      period: 'ପ୍ରାରମ୍ଭିକ ୧୪ଶ ଶତାବ୍ଦୀ',
      year_text: '୧୩୨୩ ଖ୍ରୀ.ଅ.',
      title: 'ଓରୁଗଲ୍ଲୁର ଅନ୍ତିମ ଅବୋରୋଧ ଓ ପତନ (୧୩୨୩), ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ରଙ୍କ ଆତ୍ମোତ୍ସର୍ଗ ଓ ନାୟକ ମୁକ୍ତି ସଂଗ୍ରାମ',
      rulers_involved: 'ସମ୍ରାଟ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର ବନାମ ଉଲୁଘ ଖାନ; ମୁସୁନୁରୀ ପ୍ରୋଲୟ ଓ କାପୟ ନାୟକ',
      political_development:
        '୧୩୨୩ରେ ପାଞ୍ଚ ମାସର ଅବୋରୋଧ ପରେ ଓରୁଗଲ୍ଲୁର ପତନ ଘଟିଲା; ଦିଲ୍ଲୀ ନିଆଯାଉଥିବା ବେଳେ ଦ୍ୱିତୀୟ ପ୍ରତାପରୁଦ୍ର ନର୍ମଦା ନଦୀ ତীরে ପ୍ରାଣତ୍ୟାଗ କଲେ। ଦଶ ବର୍ଷ ମଧ୍ୟରେ ୭୫ ଜଣ କାକତୀୟ ନାୟକ ମୁସୁନୁରୀ ନାୟକଙ୍କ ନେତୃତ୍ୱରେ ୧୩୩୬ ସୁଦ୍ଧା ଓରୁଗଲ୍ଲୁକୁ ମୁକ୍ତ କରିଥିଲେ।',
      monuments_inscriptions: 'ୱାରଙ୍ଗଲ ଦୁର୍ଗ କୀର୍ତ୍ତି ତୋରଣ; ବିଳାସ ତାମ୍ରପତ୍ର (୧୩୩୦); କଲୁବଚେରୁ ତାମ୍ରପତ୍ର (୧୪୨୩)।',
      uncertainty_notes: 'ବିଳାସ ତାମ୍ରପତ୍ର (୧୩୩୦) ରେ ନର୍ମଦା ତীরে ପ୍ରତାପରୁଦ୍ରଙ୍କ ଆତ୍ମোତ୍ସର୍ଗ ସ୍ପଷ୍ଟ ଭାବେ ଉଲ୍ଲେଖ ଅଛି।'
    },
    bn: {
      period: 'প্রারম্ভিক ১৪শ শতাব্দী',
      year_text: '১৩২৩ খ্রি.',
      title: 'ওরুগল্লুর চূড়ান্ত অবরোধ ও পতন (১৩২৩), দ্বিতীয় প্রতাপরুদ্রের আত্মোৎসর্গ ও নায়ক মুক্তি সংগ্রাম',
      rulers_involved: 'সম্রাট দ্বিতীয় প্রতাপরুদ্র বনাম উলুঘ খান; মুসুনুরি প্রোলয় ও কাপয় নায়ক',
      political_development:
        '১৩২৩ খ্রিস্টাব্দে পাঁচ মাসের অবরোধের পর ওরুগল্লুর পতন ঘটে; দিল্লি নিয়ে যাওয়ার পথে দ্বিতীয় প্রতাপরুদ্র নর্মদা নদীর তীরে প্রাণত্যাগ করেন। এক দশকের মধ্যে ৭৫ জন কাকতীয় নায়ক মুসুনুরি নায়কদের নেতৃত্বে ১৩৩৬ খ্রিস্টাব্দে ওরুগল্লু পুনরুদ্ধার করেন।',
      monuments_inscriptions: 'ওয়ারাঙ্গল দুর্গের কীর্তি তোরণ; বিলাস তাম্রশাসন (১৩৩০); কলুবচেরু তাম্রশাসন (১৪২৩)।',
      uncertainty_notes: 'বিলাস তাম্রশাসনে (১৩৩০) নর্মদা তীরে প্রতাপরুদ্রের আত্মোৎসর্গ স্পষ্টভাবে নথিবদ্ধ রয়েছে।'
    }
  }
};
