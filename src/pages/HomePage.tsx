// Home Page - Maison Milau
// Rule: Light colors. Do not rewrite, improve, summarize, optimize, shorten, expand or modify any text.

import React from 'react';
import { ArrowRight, Coffee, Calendar, Store, Sparkles, Check, MapPin, Award } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { store } from '../db/store';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Featured sample coffees from the verified database
  const featuredCoffees = ALL_PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen">
      {/* 1. Hero Section: Light colors, generous negative space, refined display typography */}
      <section className="relative px-4 sm:px-6 pt-12 pb-20 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5EFE6] border border-[#E2D8CC] text-xs font-semibold text-[#8C6239] tracking-wide">
            <MapPin className="w-3.5 h-3.5" />
            <span>Ambachtelijke Koffiebranderij · Oudegem (Dendermonde)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#2A1D17] leading-[1.15] tracking-tight">
            Maison Milau Artisanale koffiebranderij .
          </h1>

          <p className="text-base sm:text-xl text-[#5C4A3E] font-normal leading-relaxed max-w-2xl">
            Ambachtelijk gebrande specialty koffies voor elke gelegenheid. Bij jou thuis, voor op kantoor,  in je horecazaak of exclusieve koffiecatering voor jouw tuinfeest.
          </p>

          {/* Direct CTA links as specified */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button
              id="hero-btn-webshop"
              onClick={() => onNavigate('/webshop')}
              className="px-6 py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-sm font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>LINK Naar Webshop</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-btn-kantoor"
              onClick={() => onNavigate('/kantoor-en-horeca')}
              className="px-6 py-3.5 rounded-xl bg-[#F5EFE6] hover:bg-[#EAE1D3] text-[#2A1D17] text-sm font-semibold transition-all border border-[#D9CEBF] flex items-center gap-2 cursor-pointer"
            >
              <span>LINK Naar Kantoor & Horeca</span>
            </button>

            <button
              id="hero-btn-events"
              onClick={() => onNavigate('/events')}
              className="px-6 py-3.5 rounded-xl bg-[#F5EFE6] hover:bg-[#EAE1D3] text-[#2A1D17] text-sm font-semibold transition-all border border-[#D9CEBF] flex items-center gap-2 cursor-pointer"
            >
              <span>LINK Naar Events</span>
            </button>

            <button
              id="hero-btn-afspraak"
              onClick={() => onNavigate('/afspraakplanner')}
              className="px-6 py-3.5 rounded-xl border border-[#8C6239] text-[#8C6239] hover:bg-[#8C6239]/10 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>LINK Naar Afspraakplanner</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Direct naar onze hoofddiensten */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1D17] mb-8">
          Direct naar onze hoofddiensten:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dienst 1: Webshop */}
          <div
            onClick={() => onNavigate('/webshop')}
            className="p-8 rounded-2xl bg-white border border-[#E0D7CD] shadow-xs hover:border-[#8C6239] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#8C6239] flex items-center justify-center mb-6">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A1D17] mb-2 group-hover:text-[#8C6239] transition-colors">
                Webshop
              </h3>
              <p className="text-sm text-[#635144] leading-relaxed">
                Artisanale Houseblends, Barrel Aged Koffies
              </p>
            </div>
            <div className="pt-6 text-xs font-semibold text-[#8C6239] flex items-center gap-1.5">
              <span>Ontdek de collecties</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Dienst 2: B2B Oplossingen */}
          <div
            onClick={() => onNavigate('/kantoor-en-horeca')}
            className="p-8 rounded-2xl bg-white border border-[#E0D7CD] shadow-xs hover:border-[#8C6239] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#8C6239] flex items-center justify-center mb-6">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A1D17] mb-2 group-hover:text-[#8C6239] transition-colors">
                B2B Oplossingen
              </h3>
              <p className="text-sm text-[#635144] leading-relaxed">
                Horeca, kantoren, proefpakket & machineformules
              </p>
            </div>
            <div className="pt-6 text-xs font-semibold text-[#8C6239] flex items-center gap-1.5">
              <span>Bekijk B2B tarieven & staffels</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Dienst 3: Events & Verhuur */}
          <div
            onClick={() => onNavigate('/events')}
            className="p-8 rounded-2xl bg-white border border-[#E0D7CD] shadow-xs hover:border-[#8C6239] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] text-[#8C6239] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2A1D17] mb-2 group-hover:text-[#8C6239] transition-colors">
                Events & Verhuur
              </h3>
              <p className="text-sm text-[#635144] leading-relaxed">
                Koffiecatering & machines voor al uw feesten
              </p>
            </div>
            <div className="pt-6 text-xs font-semibold text-[#8C6239] flex items-center gap-1.5">
              <span>Bereken uw event behoeften</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Maison Milau beloften (Exact verbatim lines) */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <div className="bg-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#E2D8CC]">
          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1D17]">
              Maison Milau beloften
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E5DCD0]">
              <div className="w-6 h-6 rounded-full bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-sm text-[#3E2E23] font-medium leading-normal">
                Altijd vers gebrand koffie, geleverd binnen 2 weken na branding
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E5DCD0]">
              <div className="w-6 h-6 rounded-full bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-sm text-[#3E2E23] font-medium leading-normal">
                Zeer democratische prijzen en gegarandeertd beter dan koffie uit de rekken!
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E5DCD0]">
              <div className="w-6 h-6 rounded-full bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-sm text-[#3E2E23] font-medium leading-normal">
                Promoties, kortingen, abonemementen en klantendiest beschikbaar
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E5DCD0]">
              <div className="w-6 h-6 rounded-full bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-sm text-[#3E2E23] font-medium leading-normal">
                Bezoek ons en ontwikkel je eigen koffieblend en huismerk in ons koffie atelier.
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E5DCD0]">
              <div className="w-6 h-6 rounded-full bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-sm text-[#3E2E23] font-medium leading-normal">
                Voorzie je trouw, verjaardag of jaarlijkse nieuwjaarecepties met prestige koffie.
              </p>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/80 border border-[#E5DCD0]">
              <div className="w-6 h-6 rounded-full bg-[#8C6239] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-sm text-[#3E2E23] font-medium leading-normal">
                Vind ons op de wekelijkse markten in Dendermonde, Aalst en Wetteren
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Preview Uitgelichte Koffie Collecties */}
      <section className="px-4 sm:px-6 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239]">
              Specialty Assortiment
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1D17] mt-1">
              Vers Gebrande Specialty Blends
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/webshop')}
            className="text-xs font-semibold text-[#8C6239] hover:text-[#2A1D17] flex items-center gap-1.5 underline underline-offset-4"
          >
            <span>Bekijk de volledige webshop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCoffees.map((coffee) => (
            <div
              key={coffee.id}
              className="bg-white rounded-2xl border border-[#E0D7CD] p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#8C6239] transition-all"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5EFE6] text-[#8C6239]">
                    {coffee.collection}
                  </span>
                  {coffee.scaScore && (
                    <span className="text-[11px] font-semibold text-[#666666]">
                      SCA: {coffee.scaScore}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-base text-[#2A1D17] mb-1">
                  {coffee.name}
                </h3>
                <p className="text-xs text-[#786455] italic mb-3 line-clamp-2">
                  {coffee.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {coffee.flavorNotes.slice(0, 3).map((note, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#5C4A3E] border border-[#EAE2D7]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE8DE] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#786455] block">Vanaf</span>
                  <span className="text-base font-bold text-[#2A1D17]">
                    €{coffee.startingPrice.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-[#786455] ml-1">/ 250g</span>
                </div>

                <button
                  onClick={() => onNavigate(`/webshop?collection=${coffee.collection}`)}
                  className="p-2 rounded-lg bg-[#2A1D17] hover:bg-[#4B362A] text-white transition-colors"
                  title="Bekijk product"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
