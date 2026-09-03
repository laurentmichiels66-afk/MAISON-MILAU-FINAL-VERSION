// Kantoor en Horeca (B2B) Landing Page
// Rule: Do not rewrite, improve, summarize, optimize, shorten, expand or modify any text.

import React, { useState } from 'react';
import { Coffee, Calculator, Check, Building2, Utensils, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { store } from '../db/store';

interface KantoorHorecaPageProps {
  onNavigate: (path: string) => void;
}

export const KantoorHorecaPage: React.FC<KantoorHorecaPageProps> = ({ onNavigate }) => {
  // Interactive B2B Calculator state
  const [monthlyVolumeKg, setMonthlyVolumeKg] = useState<number>(15);
  const [basePricePerKg, setBasePricePerKg] = useState<number>(32.95); // e.g. Selection Espresso

  // Calculator calculations
  const getDiscountPercent = (volume: number): number => {
    if (volume < 5) return 10;
    if (volume < 15) return 12;
    if (volume < 30) return 15;
    if (volume < 50) return 18;
    return 20;
  };

  const discountPercent = getDiscountPercent(monthlyVolumeKg);
  const b2bPricePerKg = basePricePerKg * (1 - discountPercent / 100);
  const cupsPerMonth = Math.round(monthlyVolumeKg * 140); // approx 7.1g per cup
  const totalMonthlyCost = b2bPricePerKg * monthlyVolumeKg;
  const costPerCup = totalMonthlyCost / cupsPerMonth;
  const standardMonthlyCost = basePricePerKg * monthlyVolumeKg;
  const monthlySavings = standardMonthlyCost - totalMonthlyCost;

  // B2B Form State
  const [formData, setFormData] = useState({
    companyName: '',
    vatNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    sector: 'Horeca / Restaurant / Café / Koffiebar',
    machineNeed: 'Enkel verse specialty koffiebonen (wij hebben al een machine)',
    questions: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    const errors: string[] = [];
    if (!formData.companyName.trim()) errors.push('Bedrijfsnaam / Horecazaak is verplicht.');
    if (!formData.contactPerson.trim()) errors.push('Contactpersoon is verplicht.');
    if (!formData.email.trim() || !formData.email.includes('@')) errors.push('Geldig e-mailadres is verplicht.');
    if (!formData.phone.trim()) errors.push('Telefoonnummer is verplicht.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitting(true);
    try {
      // Direct call to backend endpoint /api/forms/b2b-inquiry
      const response = await fetch('/api/forms/b2b-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Also store in client database store
      store.submitB2BInquiry(formData);

      setFormSuccess('Hartelijk dank voor uw aanvraag. We bezorgen u binnen 24u een voorstel op maat van uw onderneming.');
      setFormData({
        companyName: '',
        vatNumber: '',
        contactPerson: '',
        email: '',
        phone: '',
        sector: 'Horeca / Restaurant / Café / Koffiebar',
        machineNeed: 'Enkel verse specialty koffiebonen (wij hebben al een machine)',
        questions: '',
      });
    } catch (err) {
      // Fallback client store
      store.submitB2BInquiry(formData);
      setFormSuccess('Hartelijk dank voor uw aanvraag. We bezorgen u binnen 24u een voorstel op maat van uw onderneming.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* 1. Header & Hero */}
      <div className="px-4 sm:px-6 pt-12 pb-14 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-2">
          B2B Oplossingen · Maison Milau
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Formules & Tarieven op Maat
        </h1>
        <h2 className="text-lg sm:text-2xl text-[#4B362A] font-serif font-semibold mt-2">
          Koffieformules voor Thuis & Onderneming
        </h2>
        <p className="text-sm sm:text-base text-[#6B5749] mt-3 max-w-3xl leading-relaxed">
          Flexibele maandabonnementen, aantrekkelijke volumetarieven en unieke custom roasting & white label branding.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] text-[#2A1D17] border border-[#E0D7CD]">
            Maandabonnementen (-10%)
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] text-[#2A1D17] border border-[#E0D7CD]">
            B2B Volumekorting & Horeca
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-[#F5EFE6] text-[#2A1D17] border border-[#E0D7CD]">
            Custom Roasting & White Label
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-[#EAE2D7] text-xs text-[#786455] flex flex-wrap justify-between gap-2">
          <div>
            <strong>Geschikt voor:</strong> Horeca (brasseries, restaurants, koffiebars), Kantoren, Bedrijven, Handelszaken & Residentiële centra.
          </div>
          <div>
            <strong>BTW Facturatie:</strong> BE 1041.542.844
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. B2B Volumekorting Staffels & Facturatie */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 sm:p-10 shadow-xs">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2A1D17] mb-2">
            B2B Volumekorting Staffels
          </h3>
          <p className="text-xs sm:text-sm text-[#6B5749] max-w-3xl leading-relaxed mb-6">
            Transparante kortingen berekend op basis van uw maandelijks afnamevolume.
            Facturatie op maat: Maandelijkse verzamelfactuur met 6% BTW op koffiebonen en 21% op apparatuur/diensten. Gratis levering in regio Dendermonde, Wetteren en Aalst.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs text-[#786455] block">Minder dan 5 kg</span>
              <span className="text-sm font-bold text-[#2A1D17] mt-1 block">Retail -10%</span>
              <span className="text-[10px] text-stone-500">Abonnementskorting</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs text-[#786455] block">10 tot 15 kg</span>
              <span className="text-sm font-bold text-[#8C6239] mt-1 block">-12%</span>
              <span className="text-[10px] text-stone-500">Kleine horeca/kantoor</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#C89B67] ring-1 ring-[#C89B67]">
              <span className="text-xs text-[#786455] block">15 tot 30 kg</span>
              <span className="text-sm font-bold text-[#8C6239] mt-1 block">-15%</span>
              <span className="text-[10px] text-[#8C6239] font-medium">Meest gekozen</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs text-[#786455] block">30 tot 50 kg</span>
              <span className="text-sm font-bold text-[#8C6239] mt-1 block">-18%</span>
              <span className="text-[10px] text-stone-500">Drukke brasserie</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E8DFC8]">
              <span className="text-xs text-[#786455] block">Meer dan 50 kg</span>
              <span className="text-sm font-bold text-[#2A1D17] mt-1 block">-20%</span>
              <span className="text-[10px] text-stone-500">Grote volumes & groothandel</span>
            </div>
          </div>
        </section>

        {/* 3. Interactieve B2B Calculator (Kantoorcalculator) */}
        <section className="bg-[#FAF6F0] rounded-3xl border border-[#D9CEBF] p-8 sm:p-10">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#8C6239] mb-1">
            <Calculator className="w-4 h-4" />
            <span>Interactiële Calculator (indicative)</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#2A1D17] mb-6">
            Bereken uw B2B Prijs (indicatief)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#2A1D17] mb-2">
                  <span>Maandelijks volume</span>
                  <span className="text-base font-bold text-[#8C6239]">{monthlyVolumeKg} kg / maand</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="80"
                  step="1"
                  value={monthlyVolumeKg}
                  onChange={(e) => setMonthlyVolumeKg(Number(e.target.value))}
                  className="w-full accent-[#8C6239] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                  <span>3 kg (klein team)</span>
                  <span>25 kg (gemiddeld kantoor/horeca)</span>
                  <span>80 kg (grootverbruik)</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-2">
                  Referentie Koffieblend:
                </label>
                <select
                  value={basePricePerKg}
                  onChange={(e) => setBasePricePerKg(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-white text-xs font-medium text-[#2A1D17]"
                >
                  <option value={19.95}>Milau Budget Espresso (€19,95 / kg)</option>
                  <option value={22.95}>Milau Value Espresso (€22,95 / kg)</option>
                  <option value={32.95}>Milau Selection Espresso (€32,95 / kg - Aanbevolen)</option>
                  <option value={42.95}>Milau Premium Espresso (€42,95 / kg)</option>
                  <option value={45.95}>Milau Prestige Espresso (€45,95 / kg)</option>
                </select>
              </div>

              <div className="text-xs text-[#786455] italic">
                * Indicatieve berekening gebaseerd op gemiddeld ~7 gram specialty bonen per kopje espresso of filter.
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9CEBF] shadow-sm space-y-3.5 text-xs text-[#4B362A]">
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Uw B2B prijs per kg:</span>
                <span className="font-bold text-sm text-[#2A1D17]">€{b2bPricePerKg.toFixed(2)} / kg</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Geschat aantal kopjes per maand:</span>
                <span className="font-bold text-[#2A1D17]">~{cupsPerMonth} kopjes</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Kostprijs per kopje:</span>
                <span className="font-bold text-emerald-700 text-sm">€{costPerCup.toFixed(2)} / kop</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Totaal maandelijks:</span>
                <span className="font-serif font-bold text-lg text-[#2A1D17]">€{totalMonthlyCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#8C6239] font-bold pb-2">
                <span>Uw maandelijkse besparing:</span>
                <span>€{monthlySavings.toFixed(2)} ({discountPercent}%)</span>
              </div>

              <a
                href="#b2b-form-section"
                className="w-full py-3 px-4 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold block text-center transition-colors shadow-sm cursor-pointer mt-2"
              >
                Vraag Offerte aan
              </a>
            </div>
          </div>
        </section>

        {/* 4. Proefpakket & Bonenlevering Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-[#E0D7CD] space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#F5EFE6] text-[#8C6239] font-serif font-bold flex items-center justify-center text-sm">
              01
            </span>
            <h4 className="text-lg font-serif font-bold text-[#2A1D17]">
              Gratis Proefpakket & Cupping
            </h4>
            <p className="text-xs sm:text-sm text-[#6B5749] leading-relaxed">
              We komen vrijblijvend langs in uw zaak of kantoor voor een smaaktest op maat van uw team of gasten. Of vraag een gratis proefpakket aan
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E0D7CD] space-y-3">
            <span className="w-8 h-8 rounded-full bg-[#F5EFE6] text-[#8C6239] font-serif font-bold flex items-center justify-center text-sm">
              02
            </span>
            <h4 className="text-lg font-serif font-bold text-[#2A1D17]">
              Bonenlevering
            </h4>
            <p className="text-xs sm:text-sm text-[#6B5749] leading-relaxed">
              Stipt geleverd elke 2 weken of maandelijks, naar wens, op factuur met gunstige B2B volumetarieven en persoonlijke opvolging door onze brander.
            </p>
            <ul className="text-xs text-[#786455] space-y-1 pt-1">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>1kg aromadichte ventielzakken</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Gratis levering regio Dendermonde/Aalst</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Custom Roasting & White Label Section */}
        <section className="bg-[#2A1D17] text-white rounded-3xl p-8 sm:p-10 space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C89B67] block">
            Exclusieve Branding
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#EDE4DA]">
            Costum roasting and white label
          </h3>
          <p className="text-xs sm:text-sm text-[#C4B5A6] max-w-2xl leading-relaxed">
            Persoonlijke koffie labels op maat. Cupping en tasting sessions ter plaatse of Atelier.
          </p>
          <div className="pt-2">
            <a
              href="#b2b-form-section"
              className="inline-flex items-center text-xs font-semibold text-[#C89B67] hover:text-white underline underline-offset-4"
            >
              Neem contact op voor White Label and custom roasting solutions →
            </a>
          </div>
        </section>

        {/* 6. Vraag een B2B Voorstel of Gratis Proefpakket aan (Formulier) */}
        <section id="b2b-form-section" className="bg-white rounded-3xl border border-[#D9CEBF] p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-serif font-bold text-[#2A1D17]">
              Vraag een B2B Voorstel of Gratis Proefpakket aan
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5749] mt-2 leading-relaxed">
              Vul onderstaand formulier in en we bezorgen u binnen 24u een voorstel op maat van uw onderneming.
            </p>
          </div>

          {formSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              <div className="text-sm font-bold">{formSuccess}</div>
              <p className="text-xs text-emerald-700">
                Ons branderij-team te Oudegem neemt spoedig contact met u op.
              </p>
              <button
                onClick={() => setFormSuccess(null)}
                className="mt-2 text-xs font-semibold underline"
              >
                Nog een aanvraag indienen
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {formErrors.length > 0 && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs space-y-1">
                  {formErrors.map((err, idx) => (
                    <div key={idx}>• {err}</div>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Bedrijfsnaam / Horecazaak *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Bijv. Brasserie De Markt BV"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    BTW-nummer
                  </label>
                  <input
                    type="text"
                    value={formData.vatNumber}
                    onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="BE 0123.456.789"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Contactpersoon *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Voornaam + Achternaam"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="naam@onderneming.be"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="+32 4..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Sector / Type zaak
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  >
                    <option value="Horeca / Restaurant / Café / Koffiebar">Horeca / Restaurant / Café / Koffiebar</option>
                    <option value="Kantoor / Bedrijfsruimte">Kantoor / Bedrijfsruimte</option>
                    <option value="Handelszaak / Boetiek / Kapper">Handelszaak / Boetiek / Kapper</option>
                    <option value="Residentieel centrum / Zorginstelling">Residentieel centrum / Zorginstelling</option>
                    <option value="Overige">Overige</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Machine & Behoefte
                  </label>
                  <select
                    value={formData.machineNeed}
                    onChange={(e) => setFormData({ ...formData, machineNeed: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  >
                    <option value="Enkel verse specialty koffiebonen (wij hebben al een machine)">Enkel verse specialty koffiebonen (wij hebben al een machine)</option>
                    <option value="Koffiebonen + Volautomaat bonenmachine (Kantoor)">Koffiebonen + Volautomaat bonenmachine (Kantoor)</option>
                    <option value="Koffiebonen + Professionele traditionele pistonmachine (Horeca)">Koffiebonen + Professionele traditionele pistonmachine (Horeca)</option>
                    <option value="Enkel gratis proefpakket aanvragen">Enkel gratis proefpakket aanvragen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                  Eventuele vragen of opmerkingen
                </label>
                <textarea
                  rows={4}
                  value={formData.questions}
                  onChange={(e) => setFormData({ ...formData, questions: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  placeholder="Bijv. gewenst volume, voorkeur voor cupping datum in Oudegem..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  id="btn-submit-b2b-form"
                  disabled={formSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Bezig met versturen...' : 'Verstuur B2B Aanvraag'}</span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
