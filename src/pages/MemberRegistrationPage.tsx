import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { ShieldCheck, UserPlus, Eye, EyeOff, CheckCircle, AlertCircle, ArrowRight, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { LanguageCode } from '../types';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const MemberRegistrationPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'Male',
    date_of_birth: '',
    country: 'India',
    state_or_province: '',
    district: '',
    city_town_village: '',
    preferred_language: language || 'en',
    email: '',
    password: '',
    confirm_password: '',
    accept_terms_privacy: false,
    // Optional
    profile_photo_url: '',
    education: '',
    profession: '',
    current_work: '',
    organization: '',
    biography: '',
    areas_of_historical_interest: '',
    languages_known: '',
    website_url: '',
    research_contributions: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2>(1); // Step 1: Required, Step 2: Optional
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image file size must be under 5MB.');
      return;
    }

    setUploadError(null);
    setUploadingPhoto(true);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: file.name,
            file_data: base64Data,
            file_type: 'photo'
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setFormData(prev => ({ ...prev, profile_photo_url: data.url }));
        } else {
          setUploadError(data.error || 'Failed to upload photo.');
        }
      } catch {
        setUploadError('Network error uploading photo.');
      } finally {
        setUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateStep1 = () => {
    if (!formData.full_name.trim()) return 'Full name is required.';
    if (!formData.gender) return 'Gender is required.';
    if (!formData.date_of_birth) return 'Date of birth is required.';
    if (!formData.country.trim()) return 'Country is required.';
    if (!formData.state_or_province.trim()) return 'State or province is required.';
    if (!formData.district.trim()) return 'District is required.';
    if (!formData.city_town_village.trim()) return 'City, town or village is required.';
    if (!formData.email.trim()) return 'Email address is required.';
    if (!formData.password) return 'Password is required.';
    if (formData.password !== formData.confirm_password) return 'Passwords do not match.';
    if (!formData.accept_terms_privacy) return 'You must accept the Privacy Policy and Terms of Use.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setError(err);
      setActiveStep(1);
      return;
    }

    setError(null);
    setSubmitting(true);

    const payload = {
      ...formData,
      areas_of_historical_interest: formData.areas_of_historical_interest
        ? formData.areas_of_historical_interest.split(',').map(s => s.trim())
        : [],
      languages_known: formData.languages_known
        ? formData.languages_known.split(',').map(s => s.trim())
        : []
    };

    const res = await register(payload);
    setSubmitting(false);

    if (res.success) {
      onNavigate('/dashboard');
    } else {
      setError(res.error || 'Registration failed. Please check your information.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#580014] text-[#fcedc7] text-xs font-semibold border border-[#d4af37]/40">
          <UserPlus className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Community Membership Registration</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Create Your Member Account
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto leading-relaxed">
          Join researchers, historians, and community members in preserving the legacy of Suryavamsha Odiyaraju Kshatriya.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-center gap-3 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveStep(1)}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeStep === 1
              ? 'bg-[#c99738] text-[#300207] shadow-md'
              : 'bg-[#161c2a] text-stone-400 border border-stone-800'
          }`}
        >
          1. Mandatory Profile & Credentials (12 Fields)
        </button>
        <button
          type="button"
          onClick={() => {
            const err = validateStep1();
            if (err) setError(err);
            else {
              setError(null);
              setActiveStep(2);
            }
          }}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeStep === 2
              ? 'bg-[#c99738] text-[#300207] shadow-md'
              : 'bg-[#161c2a] text-stone-400 border border-stone-800'
          }`}
        >
          2. Academic & Research Interests (Optional)
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-xs sm:text-sm text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#c99738]/40 space-y-6 shadow-2xl">
        {activeStep === 1 ? (
          <div className="space-y-4">
            <h3 className="font-royal-heading font-bold text-base text-[#fcedc7] border-b border-stone-800 pb-2">
              Mandatory Registration Information
            </h3>

            {/* 1. Full Name */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                1. Full Legal Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                placeholder="e.g. Sathyanarayana Raju"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
              />
            </div>

            {/* 2 & 3. Gender and Date of Birth */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  2. Gender <span className="text-rose-400">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  3. Date of Birth <span className="text-rose-400">*</span> (Private)
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>
            </div>

            {/* 4 & 5. Country and State/Province */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  4. Country <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  5. State or Province <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="state_or_province"
                  value={formData.state_or_province}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Odisha, Andhra Pradesh, Karnataka"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>
            </div>

            {/* 6 & 7. District and City/Town/Village */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  6. District <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Cuttack, Visakhapatnam, Ballari"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  7. City, Town or Village <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="city_town_village"
                  value={formData.city_town_village}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Puri, Kondavidu, Bengaluru"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>
            </div>

            {/* 8. Preferred Website Language */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                8. Preferred Website Language (8 Languages Supported) <span className="text-rose-400">*</span>
              </label>
              <select
                name="preferred_language"
                value={formData.preferred_language}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName} ({lang.label})
                  </option>
                ))}
              </select>
            </div>

            {/* 9. Email Address */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                9. Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="name@example.com"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
              />
            </div>

            {/* 10 & 11. Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  10. Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Min 8 chars, uppercase, digit & symbol"
                    className="w-full px-3.5 py-2 pr-10 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  11. Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleInputChange}
                    required
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2 pr-10 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 12. Privacy Policy & Terms Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="accept_terms_privacy"
                  checked={formData.accept_terms_privacy}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 text-[#c99738] rounded border-stone-700 focus:ring-[#c99738]"
                />
                <span className="text-xs text-stone-300 leading-relaxed">
                  12. I hereby accept the <button type="button" onClick={() => onNavigate('/privacy')} className="text-[#e8c872] underline">Privacy Policy</button> and <button type="button" onClick={() => onNavigate('/terms')} className="text-[#e8c872] underline">Terms of Use</button>. I understand that sensitive personal data (date of birth, exact address) is strictly confidential and protected from public exposure.
                </span>
              </label>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="text-xs text-stone-400 hover:text-[#e8c872]"
              >
                Already have an account? Sign In
              </button>

              <button
                type="button"
                onClick={() => {
                  const err = validateStep1();
                  if (err) setError(err);
                  else {
                    setError(null);
                    setActiveStep(2);
                  }
                }}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Continue to Optional Profile Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            <h3 className="font-royal-heading font-bold text-base text-[#fcedc7] border-b border-stone-800 pb-2">
              Optional Academic & Biographical Profile Fields
            </h3>
            <p className="text-xs text-stone-400">
              You can leave these blank or fill them to enhance your visibility among fellow researchers.
            </p>

            {/* 13. Profile Photo */}
            <div className="p-4 rounded-2xl bg-[#182030] border border-stone-700/80 space-y-3">
              <label className="block text-xs font-semibold text-stone-200">
                13. Profile Photo (Optional)
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {formData.profile_photo_url ? (
                  <img
                    src={formData.profile_photo_url}
                    alt="Preview"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#c99738] shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-[#580014] border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingPhoto}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {uploadingPhoto ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          Upload Photo File
                        </>
                      )}
                    </button>
                    {formData.profile_photo_url && (
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, profile_photo_url: '' }))}
                        className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    name="profile_photo_url"
                    value={formData.profile_photo_url}
                    onChange={handleInputChange}
                    placeholder="Or enter image URL (https://...)"
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#121622] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                  />
                  <p className="text-[11px] text-stone-400">
                    Upload a portrait photo (JPG, PNG, WebP up to 5MB).
                  </p>
                  {uploadError && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {uploadError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 14 & 15. Education and Profession */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  14. Education & Degrees
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g. M.A. History, B.Tech, Ph.D."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  15. Profession
                </label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="e.g. Historian, Engineer, Teacher"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>
            </div>

            {/* 16 & 17. Current Work & Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  16. Current Work / Occupation
                </label>
                <input
                  type="text"
                  name="current_work"
                  value={formData.current_work}
                  onChange={handleInputChange}
                  placeholder="e.g. Academic Research / Independent Study"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  17. Organization or Institution
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  placeholder="e.g. Utkal University / Heritage Trust"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>
            </div>

            {/* 18. Biography */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                18. Biography or About Me
              </label>
              <textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief summary of your background, ancestry, or research focus..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
              />
            </div>

            {/* 19 & 20. Historical Interests & Languages Known */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  19. Areas of Historical Interest (comma-separated)
                </label>
                <input
                  type="text"
                  name="areas_of_historical_interest"
                  value={formData.areas_of_historical_interest}
                  onChange={handleInputChange}
                  placeholder="Gajapathi Inscriptions, Forts, Genealogy"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  20. Languages Known (comma-separated)
                </label>
                <input
                  type="text"
                  name="languages_known"
                  value={formData.languages_known}
                  onChange={handleInputChange}
                  placeholder="Odia, Telugu, Kannada, English, Hindi"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
                />
              </div>
            </div>

            {/* 21. Website or Public Portfolio */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                21. Website or Public Portfolio URL
              </label>
              <input
                type="url"
                name="website_url"
                value={formData.website_url}
                onChange={handleInputChange}
                placeholder="https://mysite.org"
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
              />
            </div>

            {/* 22. Historical Research Contributions */}
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                22. Historical Research Contributions / Publications
              </label>
              <textarea
                name="research_contributions"
                value={formData.research_contributions}
                onChange={handleInputChange}
                rows={2}
                placeholder="Mention any family manuscripts, papers, or local epigraph studies you have contributed..."
                className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl bg-[#182030] text-stone-100 border border-stone-700 focus:outline-none focus:border-[#c99738]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-white border border-stone-700"
              >
                ← Back to Credentials
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-[#997022] to-[#c99738] text-[#290106] hover:from-[#b38328] hover:to-[#dfab43] shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? 'Registering Account...' : 'Complete Registration & Open Dashboard'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
