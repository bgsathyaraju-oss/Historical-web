import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit3, CheckCircle, AlertCircle, ArrowLeft, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface EditProfileProps {
  onNavigate: (path: string) => void;
}

export const EditProfilePage: React.FC<EditProfileProps> = ({ onNavigate }) => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    full_name: user?.profile?.full_name || '',
    gender: user?.profile?.gender || 'Male',
    country: user?.profile?.country || 'India',
    state_or_province: user?.profile?.state_or_province || '',
    district: user?.profile?.district || '',
    city_town_village: user?.profile?.city_town_village || '',
    profile_photo_url: user?.profile?.profile_photo_url || '',
    education: user?.profile?.education || '',
    profession: user?.profile?.profession || '',
    current_work: user?.profile?.current_work || '',
    organization: user?.profile?.organization || '',
    biography: user?.profile?.biography || '',
    website_url: user?.profile?.website_url || '',
    research_contributions: user?.profile?.research_contributions || '',
    profile_visibility: user?.profile?.profile_visibility || 'members'
  });

  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB.');
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
        setUploadError('Network error uploading profile photo.');
      } finally {
        setUploadingPhoto(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setErrorMsg(null);
    setLoading(true);

    const res = await updateProfile(formData);
    setLoading(false);

    if (res.success) {
      setStatusMsg('Profile successfully updated.');
      setTimeout(() => onNavigate('/dashboard'), 1500);
    } else {
      setErrorMsg(res.error || 'Failed to update profile.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div>
          <h1 className="font-royal-heading font-extrabold text-2xl text-[#fcedc7]">
            Edit Member Profile
          </h1>
          <p className="text-xs text-stone-400">
            Update your biographical information and community directory visibility.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/dashboard')}
          className="text-xs text-stone-400 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs sm:text-sm text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-xs sm:text-sm text-rose-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-[#c99738]/40 space-y-5 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Full Legal Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">State / Province</label>
            <input
              type="text"
              name="state_or_province"
              value={formData.state_or_province}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">City / Village</label>
            <input
              type="text"
              name="city_town_village"
              value={formData.city_town_village}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Education</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Profession</label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1">Biography</label>
          <textarea
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
          />
        </div>

        <div className="p-4 rounded-2xl bg-[#182030] border border-stone-700/80 space-y-3">
          <label className="block text-xs font-semibold text-stone-200">
            Profile Photo
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {formData.profile_photo_url ? (
              <img
                src={formData.profile_photo_url}
                alt="Profile Preview"
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
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#d8a846] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
                onChange={handleChange}
                placeholder="Or paste an image URL (e.g. https://...)"
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#121622] text-stone-100 border border-stone-700"
              />
              <p className="text-[11px] text-stone-400">
                Supports JPG, PNG, or WebP up to 5MB. Uploaded photos are stored securely in the archive server.
              </p>
              {uploadError && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {uploadError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-300 mb-1">Profile Visibility</label>
          <select
            name="profile_visibility"
            value={formData.profile_visibility}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs rounded-xl bg-[#182030] text-stone-100 border border-stone-700"
          >
            <option value="public">Public (Visible to everyone)</option>
            <option value="members">Members Only (Logged in community members)</option>
            <option value="private">Private (Hidden from Directory)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer"
        >
          {loading ? 'Saving Profile...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
};
