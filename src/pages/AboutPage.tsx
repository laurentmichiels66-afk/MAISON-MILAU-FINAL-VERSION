// Over ons Page - Maison Milau
// Rule: Do not rewrite, improve, summarize, optimize, shorten, expand or modify any text.

import React from 'react';
import { Coffee, MapPin, CheckCircle, Calendar, Heart, Shield, Sparkles } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* 1. Hero */}
      <div className="px-4 sm:px-6 pt-12 pb-14 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-2">
          Ambachtelijke Micro-Koffiebranderij
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Over ons
        </h1>
        <p className="text-base sm:text-xl text-[#5C4A3E] mt-4 max-w-3xl leading-relaxed">
          Maison Milau is een artisanale micro-koffiebranderij gevestigd in Oudegem (Dendermonde).
          Ontstaan vanuit een diepe passie voor specialty coffee, ambachtelijk branden en het streven naar de perfecte kop koffie.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. Laurent Story & Micro-roasting */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">
              Ambachtelijke toewijding
            </h2>
            <p className="text-sm sm:text-base text-[#5C4A3E] leading-relaxed">
              Laurent, de bezieler en brander achter Maison Milau, selecteert uitsluitend hoogwaardige koffiebonen van transparante en duurzame herkomst.
            </p>
            <p className="text-sm sm:text-base text-[#5C4A3E] leading-relaxed">
              Elke batch wordt met de hand gebrand in kleine volumes om optimale versheid, smaakcomplexiteit en kwaliteit te garanderen.
              Geen massaproductie, maar pure toewijding aan het ambacht.
            </p>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/afspraakplanner')}
                className="px-6 py-3 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>LINK Naar Afspraakplanner</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-8 rounded-3xl border border-[#E0D7CD] shadow-xs space-y-4 text-xs text-[#5C4A3E]">
            <div className="font-serif font-bold text-base text-[#2A1D17] border-b border-[#EFE8DE] pb-2">
              Maison Milau Profiel
            </div>
            <div>
              <span className="font-semibold text-[#2A1D17] block">Locatie:</span>
              Oudegem (Dendermonde), Oost-Vlaanderen
            </div>
            <div>
              <span className="font-semibold text-[#2A1D17] block">Oprichting & Brander:</span>
              Laurent · Ambachtelijk Meesterbrander
            </div>
            <div>
              <span className="font-semibold text-[#2A1D17] block">Ondernemingsnummer:</span>
              BE 1041.542.844
            </div>
            <div>
              <span className="font-semibold text-[#2A1D17] block">Specialiteit:</span>
              Single origins, houseblends, barrel aged & infused coffees
            </div>
          </div>
        </div>

        {/* 3. Onze Filosofie */}
        <section className="bg-[#FAF6F0] rounded-3xl border border-[#D9CEBF] p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2A1D17] mb-8">
            Onze Filosofie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E2D8CC] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6239] font-bold text-sm">
                <Heart className="w-4 h-4" />
                <h3>Kwaliteit Boven Kwantiteit</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                Wij branden in kleine batches (micro-roasting) zodat elke boon de aandacht krijgt die hij verdient.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2D8CC] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6239] font-bold text-sm">
                <Shield className="w-4 h-4" />
                <h3>Transparantie & Eerlijke Handel</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                Wij kiezen voor koffies met een duidelijke herkomst (single estate, coöperatieven) en respect voor de koffieboer.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2D8CC] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6239] font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <h3>Versheid Gegarandeerd</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                Onze koffie wordt pas gebrand na bestelling of in kleine voorraden, zodat u altijd geniet van pas gebrande bonen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E2D8CC] space-y-2">
              <div className="flex items-center gap-2 text-[#8C6239] font-bold text-sm">
                <Coffee className="w-4 h-4" />
                <h3>Passie om te Delen</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
                Van workshops tot evenementencatering: wij delen onze liefde voor koffie graag met iedereen.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Het Atelier */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 sm:p-10 shadow-xs">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block">
              Locatie & Bezoek
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">
              Het Atelier
            </h2>
            <p className="text-sm sm:text-base text-[#5C4A3E] leading-relaxed">
              Ons branderij-atelier bevindt zich in de Jef Scheirsstraat 29 te 9200 Oudegem. Hier worden alle bonen gebrand, verpakt en voorbereid voor verzending of afhaling.
              Bezoek aan het atelier is mogelijk op afspraak.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/afspraakplanner')}
                className="text-xs font-semibold text-[#8C6239] hover:text-[#2A1D17] underline underline-offset-4 flex items-center gap-1.5"
              >
                Plan een bezoek of neem contact op (afspraak planner) →
              </button>
            </div>
          </div>
        </section>

        {/* 5. Lokale Markten */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 sm:p-10 shadow-xs">
          <h2 className="text-2xl font-serif font-bold text-[#2A1D17] mb-2">
            Lokale Markten
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5749] mb-6">
            Je vindt ons wekelijks op de markt met vers gebrande bonen en koffie ter plaatse:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-1">
                Maandag
              </span>
              <span className="text-base font-serif font-bold text-[#2A1D17]">
                Dendermonde
              </span>
              <span className="text-[11px] text-[#786455] block mt-1">Wekelijkse markt</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-1">
                Donderdag
              </span>
              <span className="text-base font-serif font-bold text-[#2A1D17]">
                Wetteren
              </span>
              <span className="text-[11px] text-[#786455] block mt-1">Wekelijkse markt</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-1">
                Zaterdag
              </span>
              <span className="text-base font-serif font-bold text-[#2A1D17]">
                Aalst
              </span>
              <span className="text-[11px] text-[#786455] block mt-1">Wekelijkse markt</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
