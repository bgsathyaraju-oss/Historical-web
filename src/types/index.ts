export type LanguageCode = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'or' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  script: string;
}

export type VerificationStatus =
  | 'Draft'
  | 'Under Research'
  | 'Awaiting Source Verification'
  | 'Reviewed'
  | 'Published'
  | 'Contested Interpretation'
  | 'Archived';

export type EvidenceCategory =
  | 'verified_archaeological'
  | 'scholarly_interpretation'
  | 'traditional_account'
  | 'oral_history'
  | 'community_belief';

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'historical_editor'
  | 'research_reviewer'
  | 'translator'
  | 'community_moderator'
  | 'member'
  | 'visitor';

export type ProfileVisibility = 'public' | 'members' | 'private';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'pending';
  email_verified: boolean;
  created_at: string;
  profile?: UserProfile;
  preferences?: UserPreferences;
}

export interface UserProfile {
  user_id: string;
  full_name: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  date_of_birth?: string; // Private
  country: string;
  state_or_province: string;
  district: string;
  city_town_village: string;
  profile_photo_url?: string;
  education?: string;
  profession?: string;
  current_work?: string;
  organization?: string;
  biography?: string;
  areas_of_historical_interest?: string[];
  languages_known?: string[];
  website_url?: string;
  research_contributions?: string;
  profile_visibility: ProfileVisibility;
}

export interface UserPreferences {
  user_id: string;
  preferred_language: LanguageCode;
  email_notifications: boolean;
  show_original_quotes: boolean;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  original_language: LanguageCode;
  original_title: string;
  original_content: string;
  summary: string;
  author_name: string;
  publication_date: string;
  verification_status: VerificationStatus;
  evidence_category: EvidenceCategory;
  sources: SourceReference[];
  featured_image?: string;
  tags: string[];
  translations?: Record<LanguageCode, {
    title: string;
    content: string;
    summary: string;
    status: 'pending' | 'reviewed';
    translator_name?: string;
    last_updated: string;
  }>;
}

export interface SourceReference {
  id: string;
  source_type: 'Primary Source' | 'Inscription' | 'Archaeological Record' | 'Scholarly Book' | 'Peer-Reviewed Research' | 'Official Publication' | 'Oral History' | 'Community Tradition';
  title: string;
  author_or_authority: string;
  publication_or_location: string;
  year_or_era: string;
  citation_details: string;
  verified: boolean;
}

export interface HistoricalFigure {
  id: string;
  name: string;
  alternate_names: string[];
  dynasty_name: string;
  dynasty_id: string;
  reign_period: string;
  approx_dates: string;
  known_titles: string[];
  biography: string;
  major_events: string[];
  historical_significance: string;
  associated_places: string[];
  evidence_status: 'Documented Primary Evidence' | 'Epigraphic Record' | 'Traditional Lineage Record' | 'Scholarly Debate';
  image_url: string;
  inscriptions_ids: string[];
  citations: string[];
  parent_id?: string;
  spouse_name?: string;
}

export interface Dynasty {
  id: string;
  name: string;
  period: string;
  capital: string;
  origin_region: string;
  overview: string;
  key_rulers: string[];
  verification_type: 'documented' | 'traditional' | 'scholarly_conjecture';
  monuments: string[];
}

export interface GenealogyNode {
  id: string;
  name: string;
  titles?: string;
  reign?: string;
  generation: number;
  relationship_type: 'documented_primary' | 'epigraphic_confirmed' | 'traditional_account' | 'conjectured';
  parent_id?: string;
  spouse?: string;
  children?: string[];
  sources: string[];
  notes?: string;
}

export interface HistoricalEvent {
  id: string;
  period: string;
  year_text: string;
  sort_year: number;
  title: string;
  rulers_involved: string;
  political_development: string;
  monuments_inscriptions: string;
  primary_sources: string;
  uncertainty_notes: string;
}

export interface HistoricalLocation {
  id: string;
  name: string;
  ancient_name: string;
  region: 'Odra' | 'Kalinga' | 'Utkala' | 'Trikalinga' | 'Deccan & South';
  modern_district: string;
  modern_state: string;
  summary: string;
  archaeological_findings: string;
  inscriptions_found: string[];
  image_url: string;
}

export interface InscriptionRecord {
  id: string;
  name: string;
  location_found: string;
  dynasty: string;
  ruler: string;
  script: string;
  language: string;
  era_or_date: string;
  historical_context: string;
  transcription_excerpt: string;
  english_translation: string;
  scholarly_references: string[];
  verification_status: VerificationStatus;
}

export interface TempleMonument {
  id: string;
  name: string;
  location: string;
  state: string;
  patron_ruler: string;
  century: string;
  architectural_style: string;
  historical_significance: string;
  image_url: string;
  sources: string[];
}

export interface HistoricalDocument {
  id: string;
  title: string;
  original_language: string;
  approximate_date: string;
  author_authority: string;
  current_location: string;
  source_provenance: string;
  digitization_info: string;
  transcription_excerpt: string;
  translation_excerpt: string;
  research_notes: string;
  copyright_license: string;
  verification_status: VerificationStatus;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'kings' | 'forts' | 'temples' | 'sculptures' | 'manuscripts' | 'maps' | 'traditions' | 'events' | 'archival';
  period: string;
  location: string;
  creator_photographer: string;
  source: string;
  copyright_license: string;
  verification_status: VerificationStatus;
  image_url: string;
  alt_text: string;
  description: string;
}

export interface HistoricalClaim {
  id: string;
  topic: string;
  claim_statement: string;
  supporting_evidence: string[];
  contradictory_evidence: string[];
  source_reliability_notes: string;
  reviewer_comments: string;
  review_date: string;
  status: 'Verified Supported' | 'Under Investigation' | 'Contested Interpretation' | 'Unsubstantiated Legend';
}

export interface CommunitySubmission {
  id: string;
  user_id: string;
  author_name: string;
  submission_type: 'article' | 'genealogy' | 'old_photo' | 'inscription' | 'manuscript' | 'reference' | 'oral_history' | 'correction';
  title: string;
  description: string;
  content_data: string;
  source_citations: string;
  copyright_agreed: boolean;
  status: 'pending' | 'in_review' | 'needs_correction' | 'approved' | 'rejected';
  reviewer_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date_text: string;
  location: string;
  event_type: 'Symposium' | 'Heritage Tour' | 'Cultural Gathering' | 'Research Lecture' | 'Community Meeting';
  description: string;
  is_virtual: boolean;
  max_attendees: number;
  registered_count: number;
}

export interface SiteStatistics {
  published_articles: number;
  digitized_documents: number;
  historical_photographs: number;
  reviewed_inscriptions: number;
  published_translations: number;
  registered_members: number;
  community_events: number;
}
