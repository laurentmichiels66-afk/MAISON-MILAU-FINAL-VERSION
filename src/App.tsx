import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { isValidRoute, resolveRoute, REGISTERED_ROUTES } from './config';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { WebshopPage } from './pages/WebshopPage';
import { KantoorHorecaPage } from './pages/KantoorHorecaPage';
import { EventsPage } from './pages/EventsPage';
import { AboutPage } from './pages/AboutPage';
import { FaqPage } from './pages/FaqPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SitemapPage } from './pages/SitemapPage';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function App() {
  const getResolvedState = (rawPath: string): string => {
    const { canonicalPath, originalClean } = resolveRoute(rawPath);
    return canonicalPath || originalClean;
  };

  const [currentPath, setCurrentPath] = useState<string>(() => {
    let initial = typeof window !== 'undefined' ? window.location.pathname || '/' : '/';
    if (typeof window !== 'undefined') {
      try {
        const savedRedirect = sessionStorage.getItem('spa_redirect_path');
        if (savedRedirect) {
          sessionStorage.removeItem('spa_redirect_path');
          const [savedPath, savedQuery] = savedRedirect.split('?');
          window.history.replaceState({}, '', savedRedirect);
          initial = savedPath;
        }
      } catch {
        // Ignore sessionStorage security restrictions
      }
    }
    return getResolvedState(initial);
  });

  const [queryParams, setQueryParams] = useState<URLSearchParams>(() => {
    return typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname || '/';
      setCurrentPath(getResolvedState(pathname));
      setQueryParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (pathWithQuery: string) => {
    const [path, queryString] = pathWithQuery.split('?');
    const resolved = getResolvedState(path || '/');
    const newSearch = queryString ? `?${queryString}` : '';

    window.history.pushState({}, '', `${resolved}${newSearch}`);
    setCurrentPath(resolved);
    setQueryParams(new URLSearchParams(newSearch));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isRouteApproved = isValidRoute(currentPath);

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#2A1D17] font-sans selection:bg-[#EAE2D7] selection:text-[#2A1D17]">
        {/* Navigation Bar */}
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Slideover Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false);
            navigate('/checkout');
          }}
        />

        {/* Main Content View Container */}
        <main className="flex-grow">
          {!isRouteApproved ? (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-[#2A1D17] mb-2">
                Route Niet Gevonden (Validatie Fout)
              </h1>
              <p className="text-xs sm:text-sm text-[#786455] mb-6 leading-relaxed">
                De opgevraagde route <code>"{currentPath}"</code> bestaat niet in de strikte sitemap van Maison Milau.
                Conform het systeembeleid wordt deze route geblokkeerd en dient deze eerst in de sitemap te worden geconfigureerd.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 rounded-xl bg-[#2A1D17] text-white text-xs font-semibold inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Terug naar de Startpagina</span>
              </button>
            </div>
          ) : (
            <>
              {currentPath === '/' && <HomePage onNavigate={navigate} />}
              {currentPath === '/webshop' && (
                <WebshopPage
                  initialCollection={queryParams.get('collection') || 'all'}
                  onNavigate={navigate}
                  onOpenCart={() => setIsCartOpen(true)}
                />
              )}
              {currentPath === '/kantoor-en-horeca' && <KantoorHorecaPage onNavigate={navigate} />}
              {currentPath === '/events' && <EventsPage onNavigate={navigate} />}
              {currentPath === '/over-ons' && <AboutPage onNavigate={navigate} />}
              {currentPath === '/faq' && <FaqPage onNavigate={navigate} />}
              {currentPath === '/afspraakplanner' && <AppointmentPage onNavigate={navigate} />}
              {currentPath === '/my-account' && (
                <MyAccountPage
                  initialTab={queryParams.get('tab') || 'orders'}
                  onNavigate={navigate}
                />
              )}
              {currentPath === '/checkout' && <CheckoutPage onNavigate={navigate} />}
              {currentPath === '/admin' && (
                <MyAccountPage
                  initialTab="admin_portal"
                  onNavigate={navigate}
                />
              )}
              {currentPath === '/sitemap' && <SitemapPage onNavigate={navigate} />}
            </>
          )}
        </main>

        {/* Verbatim Footer */}
        <Footer onNavigate={navigate} />
      </div>
    </LanguageProvider>
  );
}
