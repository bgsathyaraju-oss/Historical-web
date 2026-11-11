import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Info,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AdminRegisterPageProps {
  onNavigate: (path: string) => void;
}

export const AUTHORIZED_OWNER_EMAIL = 'bgsathyaraju@gmail.com';

export const AdminRegisterPage: React.FC<AdminRegisterPageProps> = ({ onNavigate }) => {
  const { adminRegister } = useAuth();

  // Form Fields in EXACT SPECIFIED ORDER:
  // 1. First Name
  // 2. Last Name
  // 3. Email Address
  // 4. Mobile Number
  // 5. City
  // 6. State
  // 7. Country
  // 8. Create Password
  // 9. Re-Enter Password
  // 10. Create Account button
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('India');
  const [createPassword, setCreatePassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');

  // Password visibility toggles
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  // Status & Validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState<any | null>(null);

  // Field validation helpers
  const normalizedEmail = email.trim().toLowerCase();
  const isOwnerEmail = normalizedEmail === AUTHORIZED_OWNER_EMAIL.toLowerCase();

  // Password requirements
  const hasMinLength = createPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(createPassword);
  const hasLowercase = /[a-z]/.test(createPassword);
  const hasNumber = /[0-9]/.test(createPassword);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(createPassword);
  const isPasswordSecure = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;
  const doPasswordsMatch = createPassword.length > 0 && createPassword === reEnterPassword;

  // Mobile number international format
  const isMobileValid = /^\+?[1-9]\d{0,3}[-\s]?\d{4,14}$/.test(mobileNumber.trim()) && mobileNumber.replace(/\D/g, '').length >= 8;

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. First Name
    if (!firstName.trim()) {
      errors.firstName = 'First Name is required.';
    } else if (firstName.trim().length < 2) {
      errors.firstName = 'First Name must be at least 2 characters.';
    }

    // 2. Last Name
    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required.';
    }

    // 3. Email Address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Email Address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email format (e.g., name@example.com).';
    } else if (!isOwnerEmail) {
      errors.email = `Admin account registration is restricted to the verified website owner (${AUTHORIZED_OWNER_EMAIL}). Public visitors cannot create admin accounts.`;
    }

    // 4. Mobile Number
    if (!mobileNumber.trim()) {
      errors.mobileNumber = 'Mobile Number with country code is required.';
    } else if (!isMobileValid) {
      errors.mobileNumber = 'Enter a valid international mobile number (e.g., +91 9876543210 or +1 555-0199).';
    }

    // 5. City
    if (!city.trim()) {
      errors.city = 'City is required.';
    }

    // 6. State
    if (!state.trim()) {
      errors.state = 'State is required.';
    }

    // 7. Country
    if (!country.trim()) {
      errors.country = 'Country is required.';
    }

    // 8. Create Password
    if (!createPassword) {
      errors.createPassword = 'Create Password is required.';
    } else if (!isPasswordSecure) {
      errors.createPassword = 'Password must be 8+ chars with uppercase, lowercase, number, and special symbol.';
    }

    // 9. Re-Enter Password
    if (!reEnterPassword) {
      errors.reEnterPassword = 'Re-Enter Password is required.';
    } else if (createPassword !== reEnterPassword) {
      errors.reEnterPassword = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: normalizedEmail,
        mobile_number: mobileNumber.trim(),
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        password: createPassword,
        confirm_password: reEnterPassword
      };

      // 1. Firebase Authentication: Create user via Firebase Auth SDK
      let firebaseUid = '';
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, createPassword);
        firebaseUid = userCredential.user.uid;
        await updateProfile(userCredential.user, {
          displayName: `${firstName.trim()} ${lastName.trim()}`
        });

        // 2. Store sanitized admin profile in Firestore (/admins/{uid}) without storing passwords
        await setDoc(doc(db, 'admins', firebaseUid), {
          id: firebaseUid,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          fullName: `${firstName.trim()} ${lastName.trim()}`,
          email: normalizedEmail,
          mobileNumber: mobileNumber.trim(),
          city: city.trim(),
          state: state.trim(),
          country: country.trim(),
          role: 'super_admin',
          isAuthorizedAdmin: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        // Also store public profile in /users/{uid} for identity sync
        await setDoc(doc(db, 'users', firebaseUid), {
          id: firebaseUid,
          email: normalizedEmail,
          role: 'super_admin',
          full_name: `${firstName.trim()} ${lastName.trim()}`,
          status: 'active',
          created_at: new Date().toISOString()
        });
      } catch (fbErr: any) {
        // If user already exists in Firebase Auth, proceed to server sync or handle specific errors
        if (fbErr.code === 'auth/email-already-in-use') {
          // Continue to verify server state
        } else if (fbErr.code === 'auth/weak-password') {
          setFormErrors(prev => ({ ...prev, createPassword: 'Firebase requires a stronger password.' }));
          setSubmitting(false);
          return;
        } else {
          console.warn('[FIREBASE AUTH WARNING]', fbErr.message);
        }
      }

      // 3. Server-side session & role registration with bcrypt hashing
      const res = await adminRegister(payload);

      if (!res.success) {
        setServerError(res.error || 'Failed to create administrative account.');
        setSubmitting(false);
        return;
      }

      // Success confirmation state
      setRegistrationSuccess({
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        email: normalizedEmail,
        mobile: mobileNumber.trim(),
        role: 'Super Administrator',
        city: city.trim(),
        state: state.trim(),
        country: country.trim(),
        created_at: new Date().toLocaleString()
      });
    } catch (err: any) {
      setServerError(err?.message || 'An unexpected error occurred during account creation.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (registrationSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFCF5] border-2 border-[#A87924]/60 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EEF7F0] border-2 border-[#1E5631] text-[#1E5631] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#EFE3D0] text-[#762D35] border border-[#A87924]/40">
              Admin Provisioning Confirmed
            </span>
            <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F]">
              Admin Account Successfully Created
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5948] max-w-lg mx-auto">
              Welcome, <strong className="text-[#292521]">{registrationSuccess.fullName}</strong>. Your account has been registered with highest-tier <strong className="text-[#762D35]">{registrationSuccess.role}</strong> privileges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF9EF] border border-[#D8C3A2] text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-[#D8C3A2]/60 pb-1.5">
              <span className="text-[#6B5948]">Registered Name:</span>
              <span className="font-bold text-[#292521]">{registrationSuccess.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#D8C3A2]/60 pb-1.5">
              <span className="text-[#6B5948]">Email Address:</span>
              <span className="font-mono font-bold text-[#762D35]">{registrationSuccess.email}</span>
            </div>
            <div className="flex justify-between border-b border-[#D8C3A2]/60 pb-1.5">
              <span className="text-[#6B5948]">Mobile Number:</span>
              <span className="font-mono text-[#292521]">{registrationSuccess.mobile}</span>
            </div>
            <div className="flex justify-between border-b border-[#D8C3A2]/60 pb-1.5">
              <span className="text-[#6B5948]">Jurisdiction / Location:</span>
              <span className="text-[#292521]">{registrationSuccess.city}, {registrationSuccess.state}, {registrationSuccess.country}</span>
            </div>
            <div className="flex justify-between border-b border-[#D8C3A2]/60 pb-1.5">
              <span className="text-[#6B5948]">Assigned Role:</span>
              <span className="font-bold text-[#1E5631]">{registrationSuccess.role} (Universal Access)</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-[#6B5948]">Security Status:</span>
              <span className="font-semibold text-[#1E5631]">Firebase Auth & Firestore Verified</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('/admin')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#762D35] hover:bg-[#5E2229] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/admin-login')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#EFE3D0] hover:bg-[#E2D2B8] text-[#54351F] text-xs font-bold border border-[#D8C3A2] transition-colors cursor-pointer"
            >
              Go to Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Royal Admin Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE3D0] text-[#762D35] text-xs font-bold border border-[#A87924]/40 shadow-sm">
          <Shield className="w-4 h-4 text-[#A87924]" />
          <span>Restricted Portal • Role-Based Access Control</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-3xl text-[#54351F]">
          Admin Account Registration
        </h1>
        <p className="text-xs sm:text-sm text-[#6B5948] max-w-xl mx-auto leading-relaxed">
          Official Administrative Account Provisioning for the Suryavamsha Odiyaraju Kshatriya Historical Heritage Portal.
        </p>
      </div>

      {/* Critical Authorization Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9EF] border-2 border-[#A87924]/40 space-y-2 text-xs text-[#54351F]">
        <div className="flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-[#A87924] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-[#762D35] uppercase tracking-wider text-[11px]">
              Critical Admin Authorization Policy
            </h4>
            <p className="leading-relaxed text-[#292521]">
              This is a secure <strong>ADMIN</strong> account registration form. In strict compliance with security architecture, initial Administrator provisioning is restricted to the verified website owner:
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EFE3D0] font-mono font-bold text-[#762D35] border border-[#D8C3A2]">
              <Lock className="w-3.5 h-3.5 text-[#A87924]" />
              <span>{AUTHORIZED_OWNER_EMAIL}</span>
            </div>
            <p className="text-[11px] text-[#6B5948] pt-1">
              Public visitors cannot self-assign administrative roles. If you are a general researcher or community member, please register at the{' '}
              <button
                type="button"
                onClick={() => onNavigate('/register')}
                className="font-bold text-[#762D35] underline hover:text-[#5E2229] cursor-pointer"
              >
                Public Member Registration Portal (/register)
              </button>
              .
            </p>
          </div>
        </div>
      </div>

      {serverError && (
        <div className="p-4 rounded-xl bg-[#FDF2F2] border border-[#F5C2C7] text-xs text-[#9B1C1C] flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Registration Blocked:</strong> {serverError}
          </div>
        </div>
      )}

      {/* Admin Create Account Form */}
      <form
        onSubmit={handleCreateAccount}
        noValidate
        className="p-6 sm:p-10 rounded-3xl bg-[#FFFCF5] border border-[#D8C3A2] shadow-lg space-y-6"
      >
        <div className="border-b border-[#D8C3A2] pb-3 flex items-center justify-between">
          <h2 className="font-royal-heading font-bold text-lg text-[#54351F]">
            Admin Account Provisioning Form
          </h2>
          <span className="text-[11px] text-[#6B5948]">All 10 fields strictly verified</span>
        </div>

        {/* 1. FIRST NAME */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            1. First Name <span className="text-[#9B1C1C]">*</span>
          </label>
          <input
            type="text"
            required
            value={firstName}
            onChange={e => {
              setFirstName(e.target.value);
              if (formErrors.firstName) setFormErrors(prev => ({ ...prev, firstName: '' }));
            }}
            placeholder="e.g. Sathyanarayana"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border transition-colors focus:outline-none ${
              formErrors.firstName ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.firstName && (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.firstName}
            </p>
          )}
        </div>

        {/* 2. LAST NAME */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            2. Last Name <span className="text-[#9B1C1C]">*</span>
          </label>
          <input
            type="text"
            required
            value={lastName}
            onChange={e => {
              setLastName(e.target.value);
              if (formErrors.lastName) setFormErrors(prev => ({ ...prev, lastName: '' }));
            }}
            placeholder="e.g. Raju Peetla"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border transition-colors focus:outline-none ${
              formErrors.lastName ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.lastName && (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.lastName}
            </p>
          )}
        </div>

        {/* 3. EMAIL ADDRESS */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider">
              3. Email Address <span className="text-[#9B1C1C]">*</span>
            </label>
            {isOwnerEmail && (
              <span className="text-[10px] font-bold text-[#1E5631] bg-[#EEF7F0] px-2 py-0.5 rounded-md border border-[#A3CFAF] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Owner Authorized
              </span>
            )}
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
            }}
            placeholder={`e.g. ${AUTHORIZED_OWNER_EMAIL}`}
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border font-mono transition-colors focus:outline-none ${
              formErrors.email
                ? 'border-[#9B1C1C] bg-[#FFF5F5]'
                : isOwnerEmail
                ? 'border-[#1E5631] bg-[#F7FCF8]'
                : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.email ? (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.email}
            </p>
          ) : (
            <p className="text-[11px] text-[#6B5948] mt-1">
              Must match the authorized website owner address: <strong className="text-[#762D35]">{AUTHORIZED_OWNER_EMAIL}</strong>.
            </p>
          )}
        </div>

        {/* 4. MOBILE NUMBER */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            4. Mobile Number (with International Country Code) <span className="text-[#9B1C1C]">*</span>
          </label>
          <input
            type="tel"
            required
            value={mobileNumber}
            onChange={e => {
              setMobileNumber(e.target.value);
              if (formErrors.mobileNumber) setFormErrors(prev => ({ ...prev, mobileNumber: '' }));
            }}
            placeholder="+91 9876543210 or +1 555-0199"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border font-mono transition-colors focus:outline-none ${
              formErrors.mobileNumber ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.mobileNumber ? (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.mobileNumber}
            </p>
          ) : (
            <p className="text-[11px] text-[#6B5948] mt-1">
              Include country code with leading + (e.g., +91 for India, +1 for USA/Canada, +44 for UK).
            </p>
          )}
        </div>

        {/* 5. CITY */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            5. City <span className="text-[#9B1C1C]">*</span>
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={e => {
              setCity(e.target.value);
              if (formErrors.city) setFormErrors(prev => ({ ...prev, city: '' }));
            }}
            placeholder="e.g. Bengaluru, Hyderabad, Puri, Visakhapatnam"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border transition-colors focus:outline-none ${
              formErrors.city ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.city && (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.city}
            </p>
          )}
        </div>

        {/* 6. STATE */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            6. State / Province <span className="text-[#9B1C1C]">*</span>
          </label>
          <input
            type="text"
            required
            value={state}
            onChange={e => {
              setState(e.target.value);
              if (formErrors.state) setFormErrors(prev => ({ ...prev, state: '' }));
            }}
            placeholder="e.g. Karnataka, Andhra Pradesh, Telangana, Odisha"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border transition-colors focus:outline-none ${
              formErrors.state ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.state && (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.state}
            </p>
          )}
        </div>

        {/* 7. COUNTRY */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            7. Country <span className="text-[#9B1C1C]">*</span>
          </label>
          <input
            type="text"
            required
            value={country}
            onChange={e => {
              setCountry(e.target.value);
              if (formErrors.country) setFormErrors(prev => ({ ...prev, country: '' }));
            }}
            placeholder="e.g. India"
            className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#292521] border transition-colors focus:outline-none ${
              formErrors.country ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
            }`}
          />
          {formErrors.country && (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.country}
            </p>
          )}
        </div>

        {/* 8. CREATE PASSWORD */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            8. Create Password <span className="text-[#9B1C1C]">*</span>
          </label>
          <div className="relative">
            <input
              type={showCreatePassword ? 'text' : 'password'}
              required
              value={createPassword}
              onChange={e => {
                setCreatePassword(e.target.value);
                if (formErrors.createPassword) setFormErrors(prev => ({ ...prev, createPassword: '' }));
              }}
              placeholder="Minimum 8 characters with upper, lower, number, and symbol"
              className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white text-xs text-[#292521] border font-mono transition-colors focus:outline-none ${
                formErrors.createPassword ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCreatePassword(prev => !prev)}
              aria-label={showCreatePassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5948] hover:text-[#292521] cursor-pointer"
            >
              {showCreatePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {formErrors.createPassword && (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.createPassword}
            </p>
          )}

          {/* Password Strength Checklist */}
          <div className="mt-2 p-3 rounded-xl bg-[#FFF9EF] border border-[#D8C3A2]/60 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
            <span className={hasMinLength ? 'text-[#1E5631] font-semibold' : 'text-[#6B5948]'}>
              {hasMinLength ? '✓' : '○'} 8+ Characters
            </span>
            <span className={hasUppercase ? 'text-[#1E5631] font-semibold' : 'text-[#6B5948]'}>
              {hasUppercase ? '✓' : '○'} Uppercase (A-Z)
            </span>
            <span className={hasLowercase ? 'text-[#1E5631] font-semibold' : 'text-[#6B5948]'}>
              {hasLowercase ? '✓' : '○'} Lowercase (a-z)
            </span>
            <span className={hasNumber ? 'text-[#1E5631] font-semibold' : 'text-[#6B5948]'}>
              {hasNumber ? '✓' : '○'} Number (0-9)
            </span>
            <span className={hasSpecial ? 'text-[#1E5631] font-semibold' : 'text-[#6B5948]'}>
              {hasSpecial ? '✓' : '○'} Special Symbol (!@#$)
            </span>
          </div>
        </div>

        {/* 9. RE-ENTER PASSWORD */}
        <div>
          <label className="block text-xs font-bold text-[#54351F] uppercase tracking-wider mb-1">
            9. Re-Enter Password <span className="text-[#9B1C1C]">*</span>
          </label>
          <div className="relative">
            <input
              type={showReEnterPassword ? 'text' : 'password'}
              required
              value={reEnterPassword}
              onChange={e => {
                setReEnterPassword(e.target.value);
                if (formErrors.reEnterPassword) setFormErrors(prev => ({ ...prev, reEnterPassword: '' }));
              }}
              placeholder="Confirm your created password"
              className={`w-full px-3.5 py-2.5 pr-10 rounded-xl bg-white text-xs text-[#292521] border font-mono transition-colors focus:outline-none ${
                formErrors.reEnterPassword ? 'border-[#9B1C1C] bg-[#FFF5F5]' : 'border-[#D8C3A2] focus:border-[#A87924]'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowReEnterPassword(prev => !prev)}
              aria-label={showReEnterPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B5948] hover:text-[#292521] cursor-pointer"
            >
              {showReEnterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {formErrors.reEnterPassword ? (
            <p className="text-[11px] text-[#9B1C1C] mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 shrink-0" /> {formErrors.reEnterPassword}
            </p>
          ) : doPasswordsMatch ? (
            <p className="text-[11px] text-[#1E5631] mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" /> Passwords match perfectly.
            </p>
          ) : null}
        </div>

        {/* 10. CREATE ACCOUNT BUTTON */}
        <div className="pt-4 border-t border-[#D8C3A2] space-y-3">
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              submitting
                ? 'bg-[#A87924] opacity-80 cursor-wait'
                : 'bg-[#762D35] hover:bg-[#5E2229] active:scale-[0.99]'
            }`}
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying Authorization & Provisioning Account...</span>
              </>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>10. Create Account</span>
              </>
            )}
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B5948] gap-2 pt-2">
            <div>
              Already have an admin account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/admin-login')}
                className="font-bold text-[#762D35] hover:underline cursor-pointer"
              >
                Log In to Admin Dashboard
              </button>
            </div>
            <div>
              Member Account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('/login')}
                className="font-semibold text-[#54351F] hover:underline cursor-pointer"
              >
                Member Portal
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
