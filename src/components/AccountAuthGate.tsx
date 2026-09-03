// AccountAuthGate.tsx - Registration & Login Gateway for Maison Milau
// Gates access to /my-account until the user registers or logs in.

import React, { useState } from 'react';
import {
  User,
  Building2,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
  Coffee,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { store } from '../db/store';
import { RegisterPayload } from '../types/database';

interface AccountAuthGateProps {
  onSuccess: () => void;
  onNavigate?: (path: string) => void;
}

export const AccountAuthGate: React.FC<AccountAuthGateProps> = ({ onSuccess, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [accountType, setAccountType] = useState<'b2c' | 'b2b'>('b2c');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Address
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('België');

  // B2B specific
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [sector, setSector] = useState('Kantoor / Bedrijfsruimte');

  // Consents & status
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Vul uw volledige naam in.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Vul een geldig e-mailadres in.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Het wachtwoord dient minimaal 6 tekens te bevatten.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('De ingevoerde wachtwoorden komen niet overeen.');
      return;
    }
    if (accountType === 'b2b' && !companyName.trim()) {
      setErrorMessage('Vul de officiële bedrijfsnaam in.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Gelieve akkoord te gaan met de algemene voorwaarden om verder te gaan.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const payload: RegisterPayload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        role: accountType,
        address: {
          street: street.trim() || 'Kerkstraat 1',
          postalCode: postalCode.trim() || '9200',
          city: city.trim() || 'Dendermonde',
          country,
        },
        companyName: accountType === 'b2b' ? companyName.trim() : undefined,
        vatNumber: accountType === 'b2b' ? vatNumber.trim() : undefined,
        sector: accountType === 'b2b' ? sector : undefined,
      };

      const result = store.registerUser(payload);
      setIsSubmitting(false);

      if (result.success) {
        setSuccessMessage('Account succesvol aangemaakt! U bent nu ingelogd.');
        setTimeout(() => {
          onSuccess();
        }, 600);
      } else {
        setErrorMessage(result.error || 'Er is een fout opgetreden bij de registratie.');
      }
    }, 400);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('Vul uw geregistreerde e-mailadres in.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = store.loginUser(loginEmail, loginPassword);
      setIsSubmitting(false);

      if (result.success) {
        setSuccessMessage('Succesvol ingelogd! Welkom terug.');
        setTimeout(() => {
          onSuccess();
        }, 500);
      } else {
        setErrorMessage(result.error || 'Aanmelden mislukt.');
      }
    }, 350);
  };

  const handleQuickDemo = (role: 'b2c' | 'b2b' | 'admin') => {
    store.loginDemoUser(role);
    setSuccessMessage(`Ingelogd als demo (${role.toUpperCase()})`);
    setTimeout(() => {
      onSuccess();
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Brand Header */}
      <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#E0D7CD] text-xs font-semibold text-[#8C6239]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Beveiligd Maison Milau Klantenportaal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Toegang tot Mijn Account
        </h1>
        <p className="text-sm text-[#6B5749] leading-relaxed">
          Maak een account aan of log in om uw geplaatste bestellingen te bekijken, facturen te downloaden, flexibele koffie-abonnementen te beheren en spaarpunten te verzilveren.
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl border border-[#D9CEBF] shadow-lg overflow-hidden">
        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-[#EAE2D7] bg-[#FAF6F0]">
          <button
            id="auth-tab-register"
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage(null);
            }}
            className={`py-4 px-6 text-sm font-serif font-bold transition-all text-center cursor-pointer ${
              activeTab === 'register'
                ? 'bg-white text-[#2A1D17] border-b-2 border-[#8C6239] shadow-xs'
                : 'text-[#7A6759] hover:text-[#2A1D17] hover:bg-[#F2EAE0]'
            }`}
          >
            1. Nieuw Account Aanmaken
          </button>
          <button
            id="auth-tab-login"
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(null);
            }}
            className={`py-4 px-6 text-sm font-serif font-bold transition-all text-center cursor-pointer ${
              activeTab === 'login'
                ? 'bg-white text-[#2A1D17] border-b-2 border-[#8C6239] shadow-xs'
                : 'text-[#7A6759] hover:text-[#2A1D17] hover:bg-[#F2EAE0]'
            }`}
          >
            2. Bestaand Account Inloggen
          </button>
        </div>

        <div className="p-6 sm:p-10">
          {/* Notifications */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* TAB 1: REGISTRATION */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-6">
              {/* B2C vs B2B Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B362A] mb-2">
                  Kies uw accounttype
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('b2c')}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      accountType === 'b2c'
                        ? 'border-[#8C6239] bg-[#FAF6F0] ring-1 ring-[#8C6239]'
                        : 'border-[#E0D7CD] hover:border-[#8C6239] bg-white'
                    }`}
                  >
                    <User className={`w-5 h-5 ${accountType === 'b2c' ? 'text-[#8C6239]' : 'text-stone-400'}`} />
                    <div>
                      <div className="text-xs font-bold text-[#2A1D17]">Particulier (B2C)</div>
                      <div className="text-[11px] text-[#7A6759]">Voor thuisgenot & abonnementen</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('b2b')}
                    className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      accountType === 'b2b'
                        ? 'border-[#8C6239] bg-[#FAF6F0] ring-1 ring-[#8C6239]'
                        : 'border-[#E0D7CD] hover:border-[#8C6239] bg-white'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 ${accountType === 'b2b' ? 'text-[#8C6239]' : 'text-stone-400'}`} />
                    <div>
                      <div className="text-xs font-bold text-[#2A1D17]">Zakelijk / Bedrijf (B2B)</div>
                      <div className="text-[11px] text-[#7A6759]">Voor kantoor, horeca & staffelkorting</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Volledige Naam <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="bijv. Laurent Michiels"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    E-mailadres <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="uw.email@domein.be"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Telefoonnummer / GSM
                  </label>
                  <input
                    id="register-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+32 (0)467 77 37 66"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Land van levering
                  </label>
                  <select
                    id="register-country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                  >
                    <option value="België">België</option>
                    <option value="Nederland">Nederland</option>
                    <option value="Luxemburg">Luxemburg</option>
                    <option value="Frankrijk">Frankrijk</option>
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Kies een Wachtwoord <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimaal 6 karakters"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Bevestig Wachtwoord <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="register-confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Herhaal uw wachtwoord"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                  />
                </div>
              </div>

              {/* B2B Extra Section */}
              {accountType === 'b2b' && (
                <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#E0D7CD] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8C6239] uppercase tracking-wider">
                    <Building2 className="w-4 h-4" />
                    <span>Zakelijke Bedrijfsgegevens</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                        Officiële Bedrijfsnaam <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="register-b2b-company"
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="bv. Koffiebar De Markt BV"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                        BTW-nummer
                      </label>
                      <input
                        id="register-b2b-vat"
                        type="text"
                        value={vatNumber}
                        onChange={(e) => setVatNumber(e.target.value)}
                        placeholder="BE 0123.456.789"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                        Sector / Type organisatie
                      </label>
                      <select
                        id="register-b2b-sector"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239]"
                      >
                        <option value="Kantoor / Bedrijfsruimte">Kantoor / Bedrijfsruimte</option>
                        <option value="Horeca & Koffiebar">Horeca, Restaurant & Koffiebar</option>
                        <option value="Retail & Delicatessenzaak">Retail & Delicatessenzaak</option>
                        <option value="Evenementen & Beurzen">Evenementen & Beurzen</option>
                        <option value="Vrij Beroep & Praktijk">Vrij Beroep & Praktijk</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Address */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B362A]">
                  Standaard Adres
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      id="register-address-street"
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Straat en huisnummer"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                    />
                  </div>
                  <div>
                    <input
                      id="register-address-postal"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postcode"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      id="register-address-city"
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Gemeente / Stad"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2 text-xs text-[#4B362A]">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    id="register-agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#8C6239] focus:ring-[#8C6239]"
                  />
                  <span>
                    Ik ga akkoord met de <strong className="text-[#2A1D17]">algemene verkoopsvoorwaarden</strong> en het privacybeleid van Maison Milau.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    id="register-newsletter"
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="mt-0.5 rounded text-[#8C6239] focus:ring-[#8C6239]"
                  />
                  <span>
                    Ontvang meldingen over wekelijkse verse batches en uitnodigingen voor cupping sessies in ons atelier (optioneel).
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-registration"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Account wordt aangemaakt...</span>
                ) : (
                  <>
                    <span>Account Aanmaken & Toegang Krijgen</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Welcome bonus note */}
              <div className="flex items-center justify-center gap-2 text-xs text-[#8C6239] text-center pt-1">
                <Sparkles className="w-4 h-4" />
                <span>U ontvangt direct 50 welkomst-spaarpunten bij registratie!</span>
              </div>
            </form>
          )}

          {/* TAB 2: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                  E-mailadres
                </label>
                <div className="relative">
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="uw.email@domein.be"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white pl-10"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-[#4B362A]">
                    Wachtwoord
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Neem contact op met Laurent via Maison-milau@gmail.com of stel een nieuw wachtwoord in via de registratie tab.')}
                    className="text-[11px] text-[#8C6239] hover:underline cursor-pointer"
                  >
                    Wachtwoord vergeten?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Uw wachtwoord"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#D9CEBF] bg-[#FAF6F0]/50 text-xs text-[#2A1D17] focus:outline-hidden focus:border-[#8C6239] focus:bg-white pl-10 pr-10"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                id="btn-submit-login"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Aanmelden controleren...</span>
                ) : (
                  <>
                    <span>Inloggen op Mijn Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Quick Demo Section for instant testing */}
          <div className="mt-8 pt-6 border-t border-[#EAE2D7]">
            <div className="text-center text-xs text-[#7A6759] mb-3">
              Direct testen met het Laurent Michiels demo-account:
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                id="btn-demo-b2c"
                onClick={() => handleQuickDemo('b2c')}
                className="px-3 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#F2EAE0] border border-[#D9CEBF] text-xs font-semibold text-[#4B362A] transition-colors cursor-pointer"
              >
                Particulier (B2C Demo)
              </button>
              <button
                type="button"
                id="btn-demo-b2b"
                onClick={() => handleQuickDemo('b2b')}
                className="px-3 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#F2EAE0] border border-[#D9CEBF] text-xs font-semibold text-[#4B362A] transition-colors cursor-pointer"
              >
                Zakelijk (B2B Demo)
              </button>
              <button
                type="button"
                id="btn-demo-admin"
                onClick={() => handleQuickDemo('admin')}
                className="px-3 py-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#F2EAE0] border border-[#D9CEBF] text-xs font-semibold text-[#4B362A] transition-colors cursor-pointer"
              >
                Beheerder (Admin Demo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
