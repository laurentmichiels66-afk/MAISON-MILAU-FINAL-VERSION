// Events & Verhuur Page - Maison Milau
// Rule: Do not rewrite, improve, summarize, optimize, shorten, expand or modify any text.

import React, { useState } from 'react';
import { Sparkles, Calendar, Users, Coffee, Check, Send, CheckCircle2, Clock } from 'lucide-react';
import { store } from '../db/store';

interface EventsPageProps {
  onNavigate: (path: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  // Event Calculator State
  const [guestCount, setGuestCount] = useState<number>(80);
  const [eventType, setEventType] = useState<string>('Trouwfeest');
  const [durationHours, setDurationHours] = useState<number>(4);

  // Estimations
  // Average 1.8 cups per guest for a 4h event
  const estimatedCups = Math.round(guestCount * (durationHours * 0.45));
  const recommendedFormula =
    guestCount < 50
      ? 'Machineverhuur Do-It-Yourself'
      : guestCount < 180
      ? 'Mobiele Koffiebar met Barista'
      : 'Evenement op Maat';

  const baseFormulaPrice =
    guestCount < 50
      ? 165
      : guestCount < 180
      ? 395 + (durationHours - 3) * 60
      : 750;

  // Form State
  const [formData, setFormData] = useState({
    contactPerson: '',
    company: '',
    email: '',
    phone: '',
    eventDate: '',
    location: '',
    guestCount: 80,
    formula: 'Mobiele Koffiebar met Barista',
    notes: '',
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors([]);

    const errors: string[] = [];
    if (!formData.contactPerson.trim()) errors.push('Naam / Contactpersoon is verplicht.');
    if (!formData.email.trim() || !formData.email.includes('@')) errors.push('Geldig e-mailadres is verplicht.');
    if (!formData.phone.trim()) errors.push('Telefoonnummer is verplicht.');
    if (!formData.eventDate) errors.push('Datum van het event is verplicht.');
    if (!formData.location.trim()) errors.push('Locatie / Gemeente is verplicht.');

    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormSubmitting(true);
    try {
      await fetch('/api/forms/event-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      store.submitEventInquiry(formData);
      setFormSuccess('Hartelijk dank voor uw aanvraag. Laurent van Maison Milau bezorgt u spoedig een gedetailleerde offerte.');
      setFormData({
        contactPerson: '',
        company: '',
        email: '',
        phone: '',
        eventDate: '',
        location: '',
        guestCount: 80,
        formula: 'Mobiele Koffiebar met Barista',
        notes: '',
      });
    } catch {
      store.submitEventInquiry(formData);
      setFormSuccess('Hartelijk dank voor uw aanvraag. Laurent van Maison Milau bezorgt u spoedig een gedetailleerde offerte.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* 1. Header & Hero */}
      <div className="px-4 sm:px-6 pt-12 pb-14 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-2">
          Events & Catering · Maison Milau
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Koffiecatering voor elk Event
        </h1>
        <p className="text-sm sm:text-base text-[#5C4A3E] mt-3 max-w-3xl leading-relaxed">
          Van intieme familiefeesten en trouwfeesten tot grootschalige bedrijfsevents en beurzen. Wij voorzien barista-kwaliteit koffie, professionele espressomachines en optioneel bediening ter plaatse.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. Formules in de kijker */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-[#2A1D17] mb-8">
            Formules in de kijker:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Formule 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E0D7CD] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-1">
                  Formule 1
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2A1D17] mb-3">
                  Machineverhuur Do-It-Yourself
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5749] leading-relaxed mb-6">
                  Professionele espressomachine of volautomaat, inclusief koffiebonen, suiker, melk en bio-bekers. Ideaal voor tuinfeesten, verjaardagen en recepties.
                </p>
              </div>
              <div className="pt-4 border-t border-[#EFE8DE] text-xs font-semibold text-[#2A1D17]">
                Vanaf €165 / weekend
              </div>
            </div>

            {/* Formule 2 */}
            <div className="p-8 rounded-3xl bg-[#F5EFE6] border border-[#8C6239] shadow-sm flex flex-col justify-between ring-1 ring-[#8C6239]/20">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-1">
                  Formule 2 (Meest Populair)
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2A1D17] mb-3">
                  Mobiele Koffiebar met Barista
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed mb-6">
                  Volledige ontzorging met professionele barista. Espresso, cappuccino, latte art en thee. Voor trouwfeesten, bedrijfsevents en beurzen.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E8DFC8] text-xs font-semibold text-[#8C6239]">
                Vanaf €395 inclusief barista & specialty beans
              </div>
            </div>

            {/* Formule 3 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E0D7CD] shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-1">
                  Formule 3
                </span>
                <h3 className="text-xl font-serif font-bold text-[#2A1D17] mb-3">
                  Evenement op Maat
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5749] leading-relaxed mb-6">
                  Grote volumes, meerdere bars, gepersonaliseerde bekers of eigen blend als aandenken voor uw gasten.
                </p>
              </div>
              <div className="pt-4 border-t border-[#EFE8DE] text-xs font-semibold text-[#2A1D17]">
                Offerte op maat
              </div>
            </div>
          </div>
        </section>

        {/* 3. Wat is altijd inbegrepen? */}
        <section className="bg-white rounded-3xl border border-[#E0D7CD] p-8 sm:p-10 shadow-xs">
          <h3 className="text-xl font-serif font-bold text-[#2A1D17] mb-6">
            Wat is altijd inbegrepen?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-sm text-[#4B362A] font-medium">
                Vers gebrande Maison Milau specialty koffie
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-sm text-[#4B362A] font-medium">
                Professionele apparatuur (grondig getest)
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-sm text-[#4B362A] font-medium">
                Duidelijke instructies en technische ondersteuning
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <p className="text-xs sm:text-sm text-[#4B362A] font-medium">
                Gratis levering in regio Dendermonde
              </p>
            </div>
          </div>
        </section>

        {/* 4. Bereken uw Event (indicatief) */}
        <section className="bg-[#FAF6F0] rounded-3xl border border-[#D9CEBF] p-8 sm:p-10">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#8C6239] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Event Calculator</span>
          </div>
          <h3 className="text-2xl font-serif font-bold text-[#2A1D17] mb-6">
            Bereken uw Event (indicatief)
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#2A1D17] mb-2">
                  <span>Aantal gasten</span>
                  <span className="text-base font-bold text-[#8C6239]">{guestCount} personen</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#8C6239] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Type Event
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs font-medium text-[#2A1D17]"
                  >
                    <option value="Trouwfeest">Trouwfeest</option>
                    <option value="Privéfeest / Tuinfeest">Privéfeest / Tuinfeest</option>
                    <option value="Bedrijfsevent">Bedrijfsevent</option>
                    <option value="Beurs / Congres">Beurs / Congres</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Duur van het event (uren)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={durationHours}
                    onChange={(e) => setDurationHours(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-white text-xs font-medium text-[#2A1D17]"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#D9CEBF] shadow-sm space-y-3.5 text-xs text-[#4B362A]">
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Geschat aantal consumpties:</span>
                <span className="font-bold text-[#2A1D17]">~{estimatedCups} koffies</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Aanbevolen formule:</span>
                <span className="font-bold text-[#8C6239]">{recommendedFormula}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAE2D7]">
                <span>Geschatte prijs vanaf:</span>
                <span className="font-serif font-bold text-lg text-[#2A1D17]">€{baseFormulaPrice}</span>
              </div>

              <a
                href="#event-quote-form"
                className="w-full py-3 px-4 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold block text-center transition-colors shadow-sm cursor-pointer mt-2"
              >
                Vraag Vrijblijvende Eventofferte aan
              </a>
            </div>
          </div>
        </section>

        {/* 5. Vraag een Vrijblijvende Eventofferte aan (Formulier) */}
        <section id="event-quote-form" className="bg-white rounded-3xl border border-[#D9CEBF] p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-serif font-bold text-[#2A1D17]">
              Vraag een Vrijblijvende Eventofferte aan
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5749] mt-2 leading-relaxed">
              Laat ons weten wat u plant en wij bezorgen u binnen 24 uur een gedetailleerde offerte inclusief bonen, apparatuur en desgewenst barista.
            </p>
          </div>

          {formSuccess ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              <div className="text-sm font-bold">{formSuccess}</div>
              <p className="text-xs text-emerald-700">
                U ontvangt ook een bevestiging op het opgegeven e-mailadres.
              </p>
              <button
                onClick={() => setFormSuccess(null)}
                className="mt-2 text-xs font-semibold underline"
              >
                Nieuwe eventofferte aanvragen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    Naam / Contactpersoon *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Uw voornaam en achternaam"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Bedrijf of Organisatie (optioneel)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Bedrijfsnaam indien van toepassing"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    placeholder="uw@email.be"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Datum van het event *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Locatie / Gemeente *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Gemeente of feestlocatie"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Geschat aantal gasten *
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    required
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                  Gewenste Formule
                </label>
                <select
                  value={formData.formula}
                  onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                >
                  <option value="Machineverhuur Do-It-Yourself">Machineverhuur Do-It-Yourself</option>
                  <option value="Mobiele Koffiebar met Barista">Mobiele Koffiebar met Barista</option>
                  <option value="Volledig Event op Maat">Volledig Event op Maat</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                  Extra wensen of vragen
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  placeholder="Bijv. opbouw tijden, stroomvoorziening, specifieke koffievoorkeuren..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  id="btn-submit-event-quote"
                  disabled={formSubmitting}
                  className="px-8 py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formSubmitting ? 'Bezig met verzenden...' : 'Verstuur Aanvraag'}</span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
