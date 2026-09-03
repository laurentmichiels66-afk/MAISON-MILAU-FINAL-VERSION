import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Globe, ChevronDown, ChevronRight, ShieldCheck, Briefcase } from 'lucide-react';
import { store } from '../db/store';
import { useLanguage } from '../context/LanguageContext';
import { HAMBURGER_MENU } from '../sitemap';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [webshopSubmenuOpen, setWebshopSubmenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userRole, setUserRole] = useState<'b2c' | 'b2b' | 'admin'>('b2c');
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const update = () => {
      const state = store.getState();
      const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
      setUserRole(state.currentUser.role);
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleNav = (route: string) => {
    onNavigate(route);
    setIsOpen(false);
  };

  const toggleRole = () => {
    const nextRole = userRole === 'b2c' ? 'b2b' : userRole === 'b2b' ? 'admin' : 'b2c';
    store.setUserRole(nextRole);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E1D9] transition-all">
      {/* Top utility bar */}
      <div className="bg-[#2A1D17] text-[#EDE7E0] text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Ambachtelijke micro-roastery in Oudegem (Dendermonde) · Vers gebrand geleverd binnen 2 weken</span>
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            {/* Role switch toggle */}
            <button
              id="btn-toggle-portal-role"
              onClick={toggleRole}
              title="Wissel weergave tussen Particulier (B2C), Bedrijf (B2B) en Beheerder"
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#4B362A] hover:bg-[#5C4233] text-amber-200 transition-colors border border-amber-900/40 text-[11px]"
            >
              {userRole === 'b2c' && <User className="w-3 h-3" />}
              {userRole === 'b2b' && <Briefcase className="w-3 h-3" />}
              {userRole === 'admin' && <ShieldCheck className="w-3 h-3" />}
              <span className="font-medium">
                {userRole === 'b2c' && 'Portaal: B2C Particulier'}
                {userRole === 'b2b' && 'Portaal: B2B Zakelijk'}
                {userRole === 'admin' && 'Portaal: Webbeheerder'}
              </span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 text-[11px] font-medium border-l border-stone-700 pl-3">
              <Globe className="w-3 h-3 text-stone-400" />
              {(['nl', 'en', 'fr'] as const).map((lang) => (
                <button
                  key={lang}
                  id={`lang-btn-${lang}`}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors ${
                    language === lang
                      ? 'bg-amber-100/20 text-white font-semibold'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Left Hamburger & Brand */}
        <div className="flex items-center gap-4">
          <button
            id="hamburger-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-lg border border-[#E0D7CD] bg-[#F5EFE6] hover:bg-[#EBE2D7] text-[#2A1D17] transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#8C6239]"
            aria-label="Menu openen"
          >
            {isOpen ? <X className="w-5 h-5 text-[#2A1D17]" /> : <Menu className="w-5 h-5 text-[#2A1D17]" />}
            <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline text-[#2A1D17]">Menu</span>
          </button>

          <a
            id="brand-logo-link"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav('/');
            }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#2A1D17] group-hover:text-[#8C6239] transition-colors">
                MAISON MILAU
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8C6239] font-semibold hidden md:inline">
                Artisanale Koffiebranderij
              </span>
            </div>
            <span className="text-[11px] text-[#786455] font-light -mt-1 hidden sm:block">
              Oudegem · Dendermonde
            </span>
          </a>
        </div>

        {/* Center Desktop Quick Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#4B362A]">
          <button
            id="nav-link-webshop"
            onClick={() => handleNav('/webshop')}
            className={`py-1 border-b-2 transition-all ${
              currentPath === '/webshop' ? 'border-[#8C6239] text-[#2A1D17] font-semibold' : 'border-transparent hover:border-[#D1C2B2]'
            }`}
          >
            Webshop
          </button>
          <button
            id="nav-link-kantoor"
            onClick={() => handleNav('/kantoor-en-horeca')}
            className={`py-1 border-b-2 transition-all ${
              currentPath === '/kantoor-en-horeca' ? 'border-[#8C6239] text-[#2A1D17] font-semibold' : 'border-transparent hover:border-[#D1C2B2]'
            }`}
          >
            Kantoor & Horeca
          </button>
          <button
            id="nav-link-events"
            onClick={() => handleNav('/events')}
            className={`py-1 border-b-2 transition-all ${
              currentPath === '/events' ? 'border-[#8C6239] text-[#2A1D17] font-semibold' : 'border-transparent hover:border-[#D1C2B2]'
            }`}
          >
            Events & Verhuur
          </button>
          <button
            id="nav-link-overons"
            onClick={() => handleNav('/over-ons')}
            className={`py-1 border-b-2 transition-all ${
              currentPath === '/over-ons' ? 'border-[#8C6239] text-[#2A1D17] font-semibold' : 'border-transparent hover:border-[#D1C2B2]'
            }`}
          >
            Over ons
          </button>
          <button
            id="nav-link-faq"
            onClick={() => handleNav('/faq')}
            className={`py-1 border-b-2 transition-all ${
              currentPath === '/faq' ? 'border-[#8C6239] text-[#2A1D17] font-semibold' : 'border-transparent hover:border-[#D1C2B2]'
            }`}
          >
            FAQ
          </button>
        </nav>

        {/* Right Actions: My Account & Cart */}
        <div className="flex items-center gap-3">
          <button
            id="header-my-account-btn"
            onClick={() => handleNav('/my-account')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-[#2A1D17] bg-[#F5EFE6] border border-[#E0D7CD] hover:bg-[#EAE1D4] transition-colors"
          >
            <User className="w-4 h-4 text-[#8C6239]" />
            <span className="hidden sm:inline">My Account</span>
          </button>

          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center justify-center p-2.5 rounded-lg bg-[#2A1D17] text-[#EDE7E0] hover:bg-[#4B362A] transition-colors shadow-sm"
            aria-label="Winkelwagen openen"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C89B67] text-[#2A1D17] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Hamburger Menu Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-20 z-50 bg-black/40 backdrop-blur-sm flex justify-start">
          <div className="w-full max-w-md bg-[#FBF9F5] border-r border-[#E0D7CD] h-[calc(100vh-5rem)] overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D9] mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-[#8C6239]">
                  Navigatiemenu
                </span>
                <span className="text-xs text-[#786455]">Maison Milau</span>
              </div>

              {/* Exact Hamburger menu hierarchy specified by user:
                  - My Account
                  - Webshop (subcategories hidden in menu, able to open it when selecting)
                      Maison Milau Speciality Blends
                      Barrel Aged Coffees
                      Infused Coffees
                  - Kantoor en Horeca
                  - Events
                  - FAQ
                  - Over ons
              */}
              <nav className="space-y-1">
                {/* 1. My Account */}
                <button
                  id="menu-item-my-account"
                  onClick={() => handleNav('/my-account')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#2A1D17] hover:bg-[#F2EAE0] transition-colors text-left font-medium text-base"
                >
                  <span className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#8C6239]" />
                    My Account
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                {/* 2. Webshop with collapsible subcategories */}
                <div>
                  <button
                    id="menu-item-webshop-toggle"
                    onClick={() => setWebshopSubmenuOpen(!webshopSubmenuOpen)}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#2A1D17] hover:bg-[#F2EAE0] transition-colors text-left font-medium text-base"
                  >
                    <span className="flex items-center gap-3">
                      <ShoppingBag className="w-4 h-4 text-[#8C6239]" />
                      Webshop
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 transition-transform ${
                        webshopSubmenuOpen ? 'rotate-180 text-[#8C6239]' : ''
                      }`}
                    />
                  </button>

                  {/* Subcategories (openable when selecting) */}
                  {webshopSubmenuOpen && (
                    <div className="pl-9 pr-3 py-1 space-y-1 bg-[#F5EFE6]/60 rounded-lg my-1 border border-[#EDE5DA]">
                      <button
                        id="submenu-webshop-all"
                        onClick={() => handleNav('/webshop')}
                        className="w-full text-left py-2 px-2 text-sm text-[#4B362A] hover:text-[#8C6239] font-medium"
                      >
                        Alle Koffie Collecties
                      </button>
                      <button
                        id="submenu-specialty"
                        onClick={() => handleNav('/webshop?collection=specialty')}
                        className="w-full text-left py-2 px-2 text-sm text-[#4B362A] hover:text-[#8C6239] border-t border-[#EAE2D7]"
                      >
                        Maison Milau Speciality Blends
                      </button>
                      <button
                        id="submenu-barrel-aged"
                        onClick={() => handleNav('/webshop?collection=barrel_aged')}
                        className="w-full text-left py-2 px-2 text-sm text-[#4B362A] hover:text-[#8C6239] border-t border-[#EAE2D7]"
                      >
                        Barrel Aged Coffees
                      </button>
                      <button
                        id="submenu-infused"
                        onClick={() => handleNav('/webshop?collection=infused')}
                        className="w-full text-left py-2 px-2 text-sm text-[#4B362A] hover:text-[#8C6239] border-t border-[#EAE2D7]"
                      >
                        Infused Coffees
                      </button>
                      <button
                        id="submenu-giftboxes"
                        onClick={() => handleNav('/webshop?collection=giftbox')}
                        className="w-full text-left py-2 px-2 text-sm text-[#4B362A] hover:text-[#8C6239] border-t border-[#EAE2D7]"
                      >
                        Giftboxen & Proefpakketten
                      </button>
                      <button
                        id="submenu-merch"
                        onClick={() => handleNav('/webshop?collection=merchandise')}
                        className="w-full text-left py-2 px-2 text-sm text-[#4B362A] hover:text-[#8C6239] border-t border-[#EAE2D7]"
                      >
                        Koffie Toebehoren & Merchandise
                      </button>
                      <button
                        id="submenu-subs"
                        onClick={() => handleNav('/webshop?collection=subscriptions')}
                        className="w-full text-left py-2 px-2 text-sm text-[#8C6239] font-semibold border-t border-[#EAE2D7]"
                      >
                        Koffie-abonnementen (-10%)
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. Kantoor en Horeca */}
                <button
                  id="menu-item-kantoor"
                  onClick={() => handleNav('/kantoor-en-horeca')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#2A1D17] hover:bg-[#F2EAE0] transition-colors text-left font-medium text-base"
                >
                  <span>Kantoor en Horeca</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                {/* 4. Events */}
                <button
                  id="menu-item-events"
                  onClick={() => handleNav('/events')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#2A1D17] hover:bg-[#F2EAE0] transition-colors text-left font-medium text-base"
                >
                  <span>Events</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                {/* 5. FAQ */}
                <button
                  id="menu-item-faq"
                  onClick={() => handleNav('/faq')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#2A1D17] hover:bg-[#F2EAE0] transition-colors text-left font-medium text-base"
                >
                  <span>FAQ</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                {/* 6. Over ons */}
                <button
                  id="menu-item-overons"
                  onClick={() => handleNav('/over-ons')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#2A1D17] hover:bg-[#F2EAE0] transition-colors text-left font-medium text-base"
                >
                  <span>Over ons</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>

                {/* Afspraakplanner */}
                <button
                  id="menu-item-afspraak"
                  onClick={() => handleNav('/afspraakplanner')}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-[#8C6239] hover:bg-[#F2EAE0] transition-colors text-left font-semibold text-base mt-2 border border-dashed border-[#8C6239]/30"
                >
                  <span>Afspraakplanner (Atelier Oudegem)</span>
                  <ChevronRight className="w-4 h-4 text-[#8C6239]" />
                </button>
              </nav>
            </div>

            {/* Bottom info within drawer */}
            <div className="pt-6 border-t border-[#E8E1D9] text-xs text-[#786455] space-y-2">
              <div className="font-semibold text-[#2A1D17]">Atelier Maison Milau</div>
              <div>Jef Scheirsstraat 29, 9200 Oudegem</div>
              <div>Tel & WhatsApp: +32 (0)467 77 37 66</div>
              <div className="pt-2 text-[11px] text-stone-500">
                Wekelijkse markten: Maandag Dendermonde · Donderdag Wetteren · Zaterdag Aalst
              </div>
            </div>
          </div>

          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </header>
  );
};
