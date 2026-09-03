// Maison Milau - Verbatim Footer Implementation
// Rule: Do not rewrite, improve, summarize, optimize, shorten, expand or modify any text.

import React from 'react';
import { ValidatedLink } from './LinkValidator';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#211611] text-[#E5DCD3] border-t border-[#3A2820] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3A2820]">
          {/* Column 1: Brand & Atelier */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white tracking-wide">
              MAISON MILAU
            </h3>
            <p className="text-xs uppercase tracking-widest text-[#C89B67] font-semibold">
              Ambachtelijke Koffiebranderij
            </p>
            <p className="text-sm text-[#C4B5A6] leading-relaxed">
              Artisanale micro-roastery in Oudegem (Dendermonde). Met zorg en passie gebrande specialty koffies, kantoor- en horeca-oplossingen en machine-verhuur voor evenementen.
            </p>

            <div className="pt-2 text-xs text-[#A89889] space-y-1">
              <div className="font-semibold text-[#D8C9BC]">Bedrijfsgegevens:</div>
              <div>BTW & Ondernemingsnummer: BE 1041.542.844</div>
            </div>

            <div className="pt-3">
              <div className="text-xs font-semibold text-white mb-2">Volg Maison Milau</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  id="link-footer-instagram"
                  href="https://www.instagram.com/maison_milau?igsi=MTR4ZnZmeXB4OWQ2aQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#33231B] hover:bg-[#483327] text-white transition-colors border border-[#483327]"
                >
                  Instagram
                </a>
                <a
                  id="link-footer-facebook"
                  href="https://www.facebook.com/people/Maison-Milau/61594088783935/?mibextid=wwXIfr&rdid=2NNl8EbSQSj7FY2P&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19aNRNmCbA%2F%3Fmibextid%3DwwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#33231B] hover:bg-[#483327] text-white transition-colors border border-[#483327]"
                >
                  Facebook
                </a>
                <a
                  id="link-footer-whatsapp"
                  href="https://wa.me/32467773766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-[#1E3A2B] hover:bg-[#284E3A] text-emerald-200 transition-colors border border-emerald-900/50"
                >
                  WhatsApp Ons
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Atelier & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#C89B67]">
              Atelier & Contact
            </h4>
            <div className="text-sm text-[#C4B5A6] space-y-2">
              <div>
                <span className="text-[#EDE4DA] font-medium block">Roastery Atelier:</span>
                Jef Scheirsstraat 29, 9200 Oudegem (Dendermonde)
              </div>
              <div>
                <span className="text-[#EDE4DA] font-medium block">Telefoon & WhatsApp:</span>
                <a href="tel:+32467773766" className="hover:text-white transition-colors">
                  +32 (0)467 77 37 66
                </a>
              </div>
              <div>
                <span className="text-[#EDE4DA] font-medium block">E-mailadres:</span>
                <a href="mailto:Maison-milau@gmail.com" className="hover:text-white transition-colors">
                  Maison-milau@gmail.com
                </a>
              </div>
            </div>

            <div className="pt-2 border-t border-[#3A2820]">
              <h5 className="text-xs uppercase font-semibold text-[#EDE4DA] mb-1">
                Atelier Bezoek
              </h5>
              <p className="text-xs text-[#A89889] leading-relaxed mb-3">
                Bezoek aan ons branderij-atelier in Oudegem is mogelijk op afspraak of tijdens onze afhaaldagen.
              </p>
              <button
                id="footer-btn-afspraak"
                onClick={() => onNavigate('/afspraakplanner')}
                className="inline-flex items-center text-xs font-semibold text-[#C89B67] hover:text-white underline underline-offset-4"
              >
                Plan een bezoek of neem contact op (afspraak planner) →
              </button>
            </div>
          </div>

          {/* Column 3: Lokale Markten */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#C89B67]">
              Lokale Markten
            </h4>
            <p className="text-sm text-[#C4B5A6] leading-relaxed">
              Kom proeven en koop je vers gebrande bonen rechtstreeks op de wekelijkse markten:
            </p>
            <ul className="text-sm space-y-2.5 text-[#EDE4DA]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C89B67]"></span>
                <span className="font-semibold text-white">Maandag:</span> Dendermonde
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C89B67]"></span>
                <span className="font-semibold text-white">Donderdag:</span> Wetteren
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C89B67]"></span>
                <span className="font-semibold text-white">Zaterdag:</span> Aalst
              </li>
            </ul>

            <div className="pt-4 border-t border-[#3A2820]">
              <button
                id="footer-btn-offerte-contact"
                onClick={() => onNavigate('/faq')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#38261E] hover:bg-[#4D352A] text-white text-xs font-semibold transition-colors border border-[#4D352A] text-center block"
              >
                Offerte of Vraag Sturen
              </button>
            </div>
          </div>

          {/* Column 4: Sitemap & Formules */}
          <div className="space-y-4">
            <h4 className="text-sm uppercase font-bold tracking-wider text-[#C89B67]">
              Sitemap & Formules
            </h4>
            <ul className="text-sm space-y-2.5 text-[#C4B5A6]">
              <li>
                <button
                  id="footer-nav-account"
                  onClick={() => onNavigate('/my-account')}
                  className="hover:text-white transition-colors"
                >
                  Mijn Account
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-webshop"
                  onClick={() => onNavigate('/webshop')}
                  className="hover:text-white transition-colors"
                >
                  Webshop
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-kantoor"
                  onClick={() => onNavigate('/kantoor-en-horeca')}
                  className="hover:text-white transition-colors"
                >
                  Kantoor & Horeca
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-events"
                  onClick={() => onNavigate('/events')}
                  className="hover:text-white transition-colors"
                >
                  Event Planner
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-faq"
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-sitemap-doc"
                  onClick={() => onNavigate('/sitemap')}
                  className="hover:text-white transition-colors text-xs text-[#A89889]"
                >
                  Volledige Sitemap & Specificaties
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#8F7E70] gap-4">
          <div>
            © 2026 Maison Milau · Ambachtelijke Koffiebranderij Oudegem. Alle rechten voorbehouden.
          </div>
          <div className="text-[11px] text-[#A89889]">
            BTW BE 1041.542.844 · Specialty Coffee Belgium · Vers gebrand in Dendermonde
          </div>
        </div>
      </div>
    </footer>
  );
};
