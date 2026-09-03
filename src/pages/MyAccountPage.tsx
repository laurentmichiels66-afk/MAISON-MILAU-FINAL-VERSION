// My Account Portal - Maison Milau
// Complete customer portal for B2C, B2B and Admin role views with registration, login and profile management

import React, { useState, useEffect } from 'react';
import {
  User as UserIcon,
  Package,
  RefreshCw,
  FileText,
  MapPin,
  Settings,
  ShieldCheck,
  CheckCircle2,
  PauseCircle,
  PlayCircle,
  Plus,
  Download,
  ArrowRight,
  LogOut,
  LogIn,
  UserPlus,
  KeyRound,
  AlertCircle,
  Building2,
  Mail,
  Lock,
  Phone,
} from 'lucide-react';
import { store } from '../db/store';
import { Order, Subscription, UserProfile, B2BInquiry, EventInquiry, Appointment } from '../types/database';

interface MyAccountPageProps {
  initialTab?: string;
  onNavigate: (path: string) => void;
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({ initialTab = 'orders', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [user, setUser] = useState<UserProfile>(store.getState().currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(store.getState().isAuthenticated);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [adminInquiries, setAdminInquiries] = useState<B2BInquiry[]>([]);
  const [adminEvents, setAdminEvents] = useState<EventInquiry[]>([]);
  const [adminAppointments, setAdminAppointments] = useState<Appointment[]>([]);

  // Auth Forms State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Registration Form State
  const [regRole, setRegRole] = useState<'b2c' | 'b2b'>('b2c');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCompanyName, setRegCompanyName] = useState('');
  const [regVatNumber, setRegVatNumber] = useState('');
  const [regStreet, setRegStreet] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [regPostalCode, setRegPostalCode] = useState('');
  const [regCity, setRegCity] = useState('');
  const [regCountry, setRegCountry] = useState('België');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const update = () => {
      const state = store.getState();
      setUser(state.currentUser);
      setIsAuthenticated(state.isAuthenticated);
      setOrders(state.orders.filter((o) => o.userId === state.currentUser.id || state.currentUser.role === 'admin'));
      setSubscriptions(state.subscriptions.filter((s) => s.userId === state.currentUser.id || state.currentUser.role === 'admin'));
      setAdminInquiries(state.b2bInquiries);
      setAdminEvents(state.eventInquiries);
      setAdminAppointments(state.appointments);
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleToggleSub = (subId: string, currentStatus: 'active' | 'paused' | 'cancelled') => {
    const next = currentStatus === 'active' ? 'paused' : 'active';
    store.updateSubscriptionStatus(subId, next);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!loginEmail.trim()) {
      setAuthError('Vul uw e-mailadres in.');
      return;
    }

    const res = store.login(loginEmail, loginPassword);
    if (res.success && res.user) {
      setAuthSuccess(`Welkom terug, ${res.user.name}! U bent succesvol ingelogd.`);
      setActiveTab('orders');
    } else {
      setAuthError(res.error || 'Inloggen mislukt.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!regName.trim()) {
      setAuthError('Vul uw volledige naam in.');
      return;
    }
    if (!regEmail.trim()) {
      setAuthError('Vul een geldig e-mailadres in.');
      return;
    }
    if (regRole === 'b2b' && !regCompanyName.trim()) {
      setAuthError('Vul de bedrijfsnaam in voor zakelijke accounts.');
      return;
    }

    const res = store.register({
      name: regName,
      email: regEmail,
      password: regPassword,
      role: regRole,
      phone: regPhone,
      companyName: regRole === 'b2b' ? regCompanyName : undefined,
      vatNumber: regRole === 'b2b' ? regVatNumber : undefined,
      address: regStreet.trim()
        ? {
            street: regStreet,
            number: regNumber,
            postalCode: regPostalCode,
            city: regCity,
            country: regCountry,
          }
        : undefined,
    });

    if (res.success && res.user) {
      setAuthSuccess(`Gefeliciteerd ${res.user.name}! Uw klantaccount is succesvol aangemaakt en u bent direct ingelogd.`);
      setActiveTab('orders');
    } else {
      setAuthError(res.error || 'Registratie mislukt.');
    }
  };

  const handleLogout = () => {
    store.logout();
    setAuthSuccess('U bent succesvol uitgelogd.');
    setActiveTab('login');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthSuccess(null);

    if (!forgotEmail.trim()) {
      setAuthError('Vul uw geregistreerde e-mailadres in.');
      return;
    }

    const res = store.requestPasswordReset(forgotEmail);
    if (res.success) {
      setAuthSuccess(res.message);
    } else {
      setAuthError(res.message);
    }
  };

  const isAuthTab = !isAuthenticated || activeTab === 'login' || activeTab === 'register' || activeTab === 'forgot';

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 pb-8 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-1">
              {isAuthenticated ? 'Klantenportaal' : 'Authenticatie & Klantenportaal'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2A1D17]">
              {isAuthenticated ? `Welkom, ${user.name}` : 'Mijn Maison Milau Account'}
            </h1>
            <p className="text-xs sm:text-sm text-[#786455] mt-1">
              {isAuthenticated ? (
                <>
                  {user.email} ·{' '}
                  {user.role === 'b2b'
                    ? `Zakelijk Account (${user.companyName || 'B2B'})`
                    : user.role === 'admin'
                    ? 'Beheerder'
                    : 'Particulier Account'}
                </>
              ) : (
                'Log in op uw account of maak een nieuw particulier of zakelijk account aan.'
              )}
            </p>
          </div>

          {/* Quick role toggle & Logout */}
          <div className="flex flex-wrap items-center gap-2">
            {isAuthenticated && (
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs">
                <span className="text-stone-500 font-medium">Toon rol:</span>
                <button
                  onClick={() => store.setUserRole('b2c')}
                  className={`px-2 py-1 rounded font-semibold ${user.role === 'b2c' ? 'bg-[#2A1D17] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  B2C
                </button>
                <button
                  onClick={() => store.setUserRole('b2b')}
                  className={`px-2 py-1 rounded font-semibold ${user.role === 'b2b' ? 'bg-[#8C6239] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  B2B
                </button>
                <button
                  onClick={() => store.setUserRole('admin')}
                  className={`px-2 py-1 rounded font-semibold ${user.role === 'admin' ? 'bg-stone-800 text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  Beheerder
                </button>
              </div>
            )}

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold transition-colors"
                title="Uitloggen"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Afmelden</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthError(null);
                    setActiveTab('login');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                    activeTab === 'login' ? 'bg-[#2A1D17] text-white' : 'bg-white text-[#2A1D17] border border-[#D9CEBF]'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Inloggen</span>
                </button>
                <button
                  onClick={() => {
                    setAuthError(null);
                    setActiveTab('register');
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                    activeTab === 'register' ? 'bg-[#8C6239] text-white' : 'bg-white text-[#8C6239] border border-[#8C6239]/40'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Registreren</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation for Authenticated User */}
        {isAuthenticated && !isAuthTab && (
          <div className="mt-8 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#2A1D17] text-white'
                  : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Bestelgeschiedenis ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'subscriptions'
                  ? 'bg-[#2A1D17] text-white'
                  : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Koffie-abonnementen ({subscriptions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-[#2A1D17] text-white'
                  : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Facturen & Mollie Betalingen</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'addresses'
                  ? 'bg-[#2A1D17] text-white'
                  : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Bezorgadressen</span>
            </button>

            {user.role === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-[#8C6239] text-white ring-2 ring-[#8C6239]/40'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Beheerspaneel</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('register')}
              className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 ml-auto text-[#8C6239] hover:bg-[#F5EFE6] border border-[#D9CEBF]"
              title="Nieuw account registreren"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Nieuw Account Aanmaken</span>
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Global Auth Alerts */}
        {authSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div className="flex-1 font-medium">{authSuccess}</div>
            <button onClick={() => setAuthSuccess(null)} className="text-emerald-700 font-bold ml-2">×</button>
          </div>
        )}

        {authError && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div className="flex-1 font-medium">{authError}</div>
            <button onClick={() => setAuthError(null)} className="text-red-700 font-bold ml-2">×</button>
          </div>
        )}

        {/* AUTH TAB: Registration Form */}
        {activeTab === 'register' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D7CD] shadow-sm">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#8C6239] flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">
                Klantaccount Aanmaken
              </h2>
              <p className="text-xs sm:text-sm text-[#786455] mt-1">
                Kies uw accounttype en geniet van snelle bestellingen, abonnementen en facturatie.
              </p>
            </div>

            {/* Role selector tab */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-1 bg-[#F5EFE6] rounded-xl border border-[#E2D8CC]">
              <button
                type="button"
                onClick={() => setRegRole('b2c')}
                className={`py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  regRole === 'b2c' ? 'bg-[#2A1D17] text-white shadow-sm' : 'text-[#4B362A] hover:bg-white/50'
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Particulier (B2C)</span>
              </button>
              <button
                type="button"
                onClick={() => setRegRole('b2b')}
                className={`py-2.5 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                  regRole === 'b2b' ? 'bg-[#8C6239] text-white shadow-sm' : 'text-[#4B362A] hover:bg-white/50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Zakelijk (B2B / Kantoor / Horeca)</span>
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Volledige Naam *
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="bijv. Jan Van Damme"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    E-mailadres *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="naam@voorbeeld.be"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Wachtwoord *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Minstens 6 tekens"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                    Telefoonnummer
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+32 (0)4..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* B2B Extra Fields */}
              {regRole === 'b2b' && (
                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EAE0D2] space-y-3">
                  <div className="text-xs font-bold text-[#8C6239] uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    <span>Bedrijfsgegevens voor Facturatie & Staffelkorting</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                        Bedrijfsnaam *
                      </label>
                      <input
                        type="text"
                        required={regRole === 'b2b'}
                        value={regCompanyName}
                        onChange={(e) => setRegCompanyName(e.target.value)}
                        placeholder="bijv. Koffiebar De Markt BV"
                        className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                        BTW-nummer (BE...)
                      </label>
                      <input
                        type="text"
                        value={regVatNumber}
                        onChange={(e) => setRegVatNumber(e.target.value)}
                        placeholder="bijv. BE 0123.456.789"
                        className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Address Fields */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#4B362A] mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8C6239]" />
                  <span>Standaard Leveradres (Optioneel)</span>
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={regStreet}
                      onChange={(e) => setRegStreet(e.target.value)}
                      placeholder="Straatnaam"
                      className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => setRegNumber(e.target.value)}
                      placeholder="Huisnr"
                      className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={regPostalCode}
                      onChange={(e) => setRegPostalCode(e.target.value)}
                      placeholder="Postcode (bijv. 9200)"
                      className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Plaats (bijv. Oudegem)"
                      className="w-full px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#3F2B22] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Account Aanmaken & Direct Inloggen</span>
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-[#786455]">Heeft u al een account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null);
                    setActiveTab('login');
                  }}
                  className="text-xs font-bold text-[#8C6239] hover:underline"
                >
                  Log hier in
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AUTH TAB: Login Form */}
        {activeTab === 'login' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D7CD] shadow-sm">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#8C6239] flex items-center justify-center mx-auto mb-3">
                <LogIn className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">
                Inloggen bij Maison Milau
              </h2>
              <p className="text-xs text-[#786455] mt-1">
                Toegang tot bestellingen, facturen en abonnementen.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                  E-mailadres
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="uw@email.be"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-[#4B362A]">
                    Wachtwoord
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthError(null);
                      setActiveTab('forgot');
                    }}
                    className="text-[11px] text-[#8C6239] hover:underline"
                  >
                    Wachtwoord vergeten?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2A1D17] hover:bg-[#3F2B22] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Aanmelden</span>
                </button>
              </div>

              {/* Demo Accounts Quick-Select */}
              <div className="pt-4 border-t border-[#EAE2D7] text-center">
                <span className="text-[11px] text-stone-500 font-semibold block mb-2">
                  Snelle testaccounts:
                </span>
                <div className="flex flex-col gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('laurent.michiels66@gmail.com');
                      setLoginPassword('demo');
                    }}
                    className="py-1.5 px-2.5 rounded-lg bg-[#F5EFE6] hover:bg-[#EAE1D4] text-[#4B362A] text-left flex justify-between items-center text-[11px]"
                  >
                    <span><strong>Laurent Michiels</strong> (Beheerder / Admin)</span>
                    <span className="text-[#8C6239] font-bold">Kies</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('b2b@demarkt.be');
                      setLoginPassword('demo');
                    }}
                    className="py-1.5 px-2.5 rounded-lg bg-[#F5EFE6] hover:bg-[#EAE1D4] text-[#4B362A] text-left flex justify-between items-center text-[11px]"
                  >
                    <span><strong>Brasserie De Markt</strong> (B2B Zakelijk)</span>
                    <span className="text-[#8C6239] font-bold">Kies</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('klant@maisonmilau.be');
                      setLoginPassword('demo');
                    }}
                    className="py-1.5 px-2.5 rounded-lg bg-[#F5EFE6] hover:bg-[#EAE1D4] text-[#4B362A] text-left flex justify-between items-center text-[11px]"
                  >
                    <span><strong>Anke De Smet</strong> (B2C Particulier)</span>
                    <span className="text-[#8C6239] font-bold">Kies</span>
                  </button>
                </div>
              </div>

              <div className="text-center pt-2">
                <span className="text-xs text-[#786455]">Nog geen account? </span>
                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null);
                    setActiveTab('register');
                  }}
                  className="text-xs font-bold text-[#8C6239] hover:underline"
                >
                  Registreer hier
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AUTH TAB: Forgot Password Form */}
        {activeTab === 'forgot' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-[#E0D7CD] shadow-sm">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F5EFE6] text-[#8C6239] flex items-center justify-center mx-auto mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">
                Wachtwoord Vergeten
              </h2>
              <p className="text-xs text-[#786455] mt-1">
                Vul uw e-mailadres in om een herstellink te ontvangen.
              </p>
            </div>

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4B362A] mb-1">
                  Geregistreerd E-mailadres
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="uw@email.be"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#D9CEBF] text-xs focus:ring-2 focus:ring-[#8C6239] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2A1D17] hover:bg-[#3F2B22] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>Stuur Herstelinstructies</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null);
                    setActiveTab('login');
                  }}
                  className="text-xs font-bold text-[#8C6239] hover:underline"
                >
                  Terug naar Inloggen
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 1: Orders */}
        {isAuthenticated && activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
                Uw Bestellingen
              </h2>
              <button
                onClick={() => onNavigate('/webshop')}
                className="text-xs font-semibold text-[#8C6239] hover:underline flex items-center gap-1"
              >
                <span>Nieuwe bestelling plaatsen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#E0D7CD] text-center space-y-3">
                <Package className="w-12 h-12 text-[#C8B8A6] mx-auto stroke-[1.5]" />
                <p className="font-serif font-bold text-base text-[#2A1D17]">Nog geen bestellingen geplaatst</p>
                <p className="text-xs text-[#786455]">
                  Plaats uw eerste bestelling in onze specialty coffee webshop.
                </p>
                <button
                  onClick={() => onNavigate('/webshop')}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-[#2A1D17] text-white text-xs font-semibold"
                >
                  Naar de Webshop
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-[#E0D7CD] p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 pb-4 border-b border-[#EFE8DE]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#2A1D17]">{order.orderNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              order.status === 'Payment Successful' || order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#786455] mt-0.5">
                          Geplaatst op: {order.createdAt} · Mollie ID: {order.molliePaymentId || order.id}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-[#2A1D17]">
                          €{order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-[#786455]">
                          Betaald via {order.paymentMethod}
                        </div>
                      </div>
                    </div>

                    {/* Order items list */}
                    <div className="space-y-2 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[#4B362A]">
                          <div>
                            <span className="font-semibold text-[#2A1D17]">{item.quantity}x</span> {item.productName}
                            <span className="text-[#8A796C] ml-2">({item.weight}, {item.grind})</span>
                          </div>
                          <div className="font-medium text-[#2A1D17]">
                            €{(item.unitPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#EFE8DE] flex flex-wrap justify-between items-center text-xs text-[#786455] gap-2">
                      <div>
                        <strong>Leveradres:</strong> {order.shippingAddress.street}, {order.shippingAddress.postalCode} {order.shippingAddress.city}
                      </div>
                      <button
                        onClick={() => alert(`Factuur ${order.invoiceNumber} (Maison Milau, BTW BE 1041.542.844) gedownload als PDF.`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF6F0] hover:bg-[#F2EAE0] text-xs font-semibold text-[#2A1D17]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Factuur ({order.invoiceNumber})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
                  Lopende Koffie-abonnementen (-10%)
                </h2>
                <p className="text-xs text-[#786455]">
                  Elke levering wordt vers gebrand verzonden met automatische betaling via Mollie Recurring.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/webshop?collection=subscriptions')}
                className="px-4 py-2 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nieuw Abonnement</span>
              </button>
            </div>

            {subscriptions.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#E0D7CD] text-center space-y-3">
                <RefreshCw className="w-12 h-12 text-[#C8B8A6] mx-auto stroke-[1.5]" />
                <p className="font-serif font-bold text-base text-[#2A1D17]">Geen actieve abonnementen</p>
                <p className="text-xs text-[#786455]">
                  Start een flexibel koffie-abonnement en bespaar direct 10% op elke levering.
                </p>
                <button
                  onClick={() => onNavigate('/webshop')}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-[#2A1D17] text-white text-xs font-semibold"
                >
                  Ontdek de Koffies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl border border-[#E0D7CD] p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sub.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {sub.status === 'active' ? 'Actief (Levert Periodiek)' : 'Gepauzeerd'}
                        </span>
                        <span className="text-xs font-bold text-[#8C6239]">
                          {sub.discountApplied}% Korting
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-[#2A1D17]">{sub.coffeeName}</h3>
                      <div className="text-xs text-[#786455] mt-1 space-x-2">
                        <span>Formaat: {sub.weight}</span>
                        <span>·</span>
                        <span>Maalgraad: {sub.grind}</span>
                      </div>

                      <div className="my-4 p-3 rounded-xl bg-[#FAF6F0] border border-[#EDE5DA] text-xs space-y-1 text-[#4B362A]">
                        <div>
                          <strong>Frequentie:</strong> Elke {sub.frequency === '2_weeks' ? '2 weken' : sub.frequency === '4_weeks' ? '4 weken' : '6 weken'}
                        </div>
                        <div>
                          <strong>Volgende Branding & Verzending:</strong> {sub.nextShipmentDate}
                        </div>
                        <div>
                          <strong>Bedrag per zending:</strong> €{sub.pricePerShipment.toFixed(2)} (incl. btw & korting)
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EFE8DE] flex gap-2">
                      <button
                        onClick={() => handleToggleSub(sub.id, sub.status)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                          sub.status === 'active'
                            ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                            : 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                        }`}
                      >
                        {sub.status === 'active' ? (
                          <>
                            <PauseCircle className="w-3.5 h-3.5" />
                            <span>Abonnement Pauzeren</span>
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>Abonnement Hervatten</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => alert(`Abonnement gewijzigd. Uw aanpassing is opgeslagen.`)}
                        className="py-2 px-3 rounded-xl border border-[#D9CEBF] text-xs font-semibold text-[#4B362A] hover:bg-[#FAF6F0]"
                      >
                        Wijzigen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Invoices */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-3xl border border-[#E0D7CD] p-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
                Facturen & Betaaloverzicht
              </h2>
              <p className="text-xs text-[#786455] mt-1">
                Alle facturen van Maison Milau (BTW BE 1041.542.844) worden conform de Belgische wetgeving opgemaakt met uitgesplitste 6% BTW (koffiebonen) en 21% BTW (machines en diensten).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF6F0] text-[#5C4A3E] border-b border-[#E0D7CD]">
                  <tr>
                    <th className="p-3 font-semibold">Factuurnummer</th>
                    <th className="p-3 font-semibold">Datum</th>
                    <th className="p-3 font-semibold">Omschrijving</th>
                    <th className="p-3 font-semibold">Bedrag (incl. BTW)</th>
                    <th className="p-3 font-semibold">Mollie Betaalstatus</th>
                    <th className="p-3 font-semibold text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DE]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF6F0]/50">
                      <td className="p-3 font-bold text-[#2A1D17]">{order.invoiceNumber}</td>
                      <td className="p-3 text-[#786455]">{order.createdAt}</td>
                      <td className="p-3 text-[#4B362A]">{order.items.map((i) => i.productName).join(', ')}</td>
                      <td className="p-3 font-semibold text-[#2A1D17]">€{order.totalAmount.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px] border border-emerald-200">
                          Betaald via Mollie
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => alert(`Factuur ${order.invoiceNumber} gedownload.`)}
                          className="text-[#8C6239] hover:underline font-semibold"
                        >
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
              Bezorgadressen & Bedrijfsgegevens
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-2 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif font-bold text-sm text-[#2A1D17]">
                      {addr.street}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded bg-[#F5EFE6] text-[#8C6239] font-bold text-[10px]">
                        Standaard Adres
                      </span>
                    )}
                  </div>
                  <div className="text-[#4B362A]">
                    {addr.postalCode} {addr.city}
                  </div>
                  <div className="text-[#786455]">{addr.country}</div>
                  {user.vatNumber && (
                    <div className="pt-2 text-stone-500">
                      <strong>BTW-nummer:</strong> {user.vatNumber}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Admin Panel (Laurent / Webbeheerder) */}
        {activeTab === 'admin' && (
          <div className="space-y-8">
            <div className="bg-[#2A1D17] text-white p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#EDE4DA]">
                  Beheersoverzicht Atelier Maison Milau
                </h2>
                <p className="text-xs text-[#A89889]">
                  Centraal overzicht van inkomende B2B aanvragen, event offertes, afspraken en orders.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-[#8C6239] text-white text-xs font-bold">
                Rol: Webbeheerder
              </span>
            </div>

            {/* Inkomende B2B Aanvragen */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2A1D17]">
                Inkomende B2B Aanvragen ({adminInquiries.length})
              </h3>
              {adminInquiries.length === 0 ? (
                <p className="text-xs text-stone-500">Nog geen nieuwe B2B aanvragen ontvangen.</p>
              ) : (
                <div className="space-y-3">
                  {adminInquiries.map((inq) => (
                    <div key={inq.id} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-sm text-[#2A1D17]">
                        <span>{inq.companyName} ({inq.contactPerson})</span>
                        <span className="text-[11px] font-normal text-stone-500">{inq.submittedAt}</span>
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Contact:</strong> {inq.email} · {inq.phone} | <strong>BTW:</strong> {inq.vatNumber || 'N.v.t.'}
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Sector:</strong> {inq.sector} | <strong>Behoefte:</strong> {inq.machineNeed}
                      </div>
                      {inq.questions && (
                        <div className="text-[#4B362A] italic bg-white p-2 rounded border border-[#EDE5DA] mt-1">
                          "{inq.questions}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inkomende Event Offerte Aanvragen */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2A1D17]">
                Inkomende Event Offertes ({adminEvents.length})
              </h3>
              {adminEvents.length === 0 ? (
                <p className="text-xs text-stone-500">Nog geen nieuwe event aanvragen.</p>
              ) : (
                <div className="space-y-3">
                  {adminEvents.map((evt) => (
                    <div key={evt.id} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-sm text-[#2A1D17]">
                        <span>{evt.contactPerson} ({evt.guestCount} gasten)</span>
                        <span className="text-[11px] font-normal text-stone-500">{evt.submittedAt}</span>
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Datum & Locatie:</strong> {evt.eventDate} te {evt.location}
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Formule:</strong> {evt.formula} | <strong>Contact:</strong> {evt.email} ({evt.phone})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inkomende Afspraken */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2A1D17]">
                Ingeplande Atelier Afspraken ({adminAppointments.length})
              </h3>
              {adminAppointments.length === 0 ? (
                <p className="text-xs text-stone-500">Nog geen afspraken ingepland.</p>
              ) : (
                <div className="space-y-3">
                  {adminAppointments.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-sm text-[#2A1D17]">
                        <span>{app.name} · {app.service}</span>
                        <span className="text-[#8C6239]">{app.date} om {app.time}</span>
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Contact:</strong> {app.email} · {app.phone}
                      </div>
                      {app.notes && (
                        <div className="text-[#786455] italic">Opmerking: {app.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
