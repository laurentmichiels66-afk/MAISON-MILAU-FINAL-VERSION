// Sitemap & Specificaties Page - Maison Milau
// Verification of all routes, catalog ladders, and architecture compliance

import React from 'react';
import { Check, ShieldCheck, MapPin, ArrowRight, Table } from 'lucide-react';
import { SITEMAP_PAGES, HAMBURGER_MENU, FOOTER_MENU } from '../sitemap';
import { RETAIL_LADDER_TABLE, PRICING_LADDER_TABLE } from '../data/products';
import { ValidatedLink } from '../components/LinkValidator';

interface SitemapPageProps {
  onNavigate: (path: string) => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 pb-10 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-1">
          Architectuur & Overzicht
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17]">
          Sitemap & Specificaties
        </h1>
        <p className="text-sm sm:text-base text-[#5C4A3E] mt-2 max-w-3xl leading-relaxed">
          Volledig overzicht van alle gevalideerde routes, navigatiestructuur, adviesprijzen en tariefladders van Maison Milau.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
        {/* 1. Gevalideerde Routes */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#2A1D17] mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Gevalideerde Routes (Sitemap)
          </h2>
          <p className="text-xs text-[#786455] mb-6">
            Elke link in het systeem wordt vooraf gevalideerd. Niet-bestaande routes tonen een duidelijke foutmelding in plaats van onvolledige pagina's te laden.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITEMAP_PAGES.map((page) => (
              <div
                key={page.path}
                onClick={() => onNavigate(page.path)}
                className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] hover:border-[#8C6239] cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#2A1D17]">{page.title}</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                      Gevalideerd
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#8C6239] block mt-1">
                    {page.path}
                  </span>
                  <p className="text-[11px] text-[#786455] mt-1.5">{page.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Recommended Retail Ladder Table */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#2A1D17] mb-2">
            Recommended Retail Ladder
          </h2>
          <p className="text-xs text-[#786455] mb-6">
            Adviesprijzen per blend en formaat conform het officiële prijzenschema van Maison Milau:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF6F0] text-[#4B362A] border-b border-[#E0D7CD]">
                <tr>
                  <th className="p-3 font-bold">Blend / Collectie</th>
                  <th className="p-3 font-semibold">250g</th>
                  <th className="p-3 font-semibold">500g</th>
                  <th className="p-3 font-semibold">1 kg</th>
                  <th className="p-3 font-semibold">Advies €/kg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DE]">
                {RETAIL_LADDER_TABLE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF6F0]/50">
                    <td className="p-3 font-bold text-[#2A1D17]">{item.blend}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.p250g.toFixed(2)}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.p500g.toFixed(2)}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.p1kg.toFixed(2)}</td>
                    <td className="p-3 font-semibold text-[#8C6239]">€{item.retailPerKg.toFixed(2)} / kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Pricing Ladder Table */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 shadow-xs">
          <h2 className="text-xl font-serif font-bold text-[#2A1D17] mb-2">
            Pricing Ladder & Kostprijsstructuur
          </h2>
          <p className="text-xs text-[#786455] mb-6">
            Transparant overzicht van inkoop- en adviesprijzen voor partners en wederverkopers:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF6F0] text-[#4B362A] border-b border-[#E0D7CD]">
                <tr>
                  <th className="p-3 font-bold">Blend</th>
                  <th className="p-3 font-semibold">Kost €/kg</th>
                  <th className="p-3 font-semibold">Advies €/kg</th>
                  <th className="p-3 font-semibold">250g</th>
                  <th className="p-3 font-semibold">500g</th>
                  <th className="p-3 font-semibold">1kg</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE8DE]">
                {PRICING_LADDER_TABLE.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF6F0]/50">
                    <td className="p-3 font-bold text-[#2A1D17]">{item.blend}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.costPerKg.toFixed(2)}</td>
                    <td className="p-3 font-semibold text-[#8C6239]">€{item.retailPerKg.toFixed(2)}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.p250g.toFixed(2)}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.p500g.toFixed(2)}</td>
                    <td className="p-3 text-[#5C4A3E]">€{item.p1kg.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
