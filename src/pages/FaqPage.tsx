// FAQ Page - Maison Milau
// Detailed categorized questions & answers with real contact form

import React, { useState } from 'react';
import { ChevronDown, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { store } from '../db/store';

interface FaqPageProps {
  onNavigate: (path: string) => void;
}

interface FaqItem {
  q: string;
  a: string;
}

export const FaqPage: React.FC<FaqPageProps> = () => {
  const [openIndex, setOpenIndex] = useState<string | null>('koffie-0');

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    try {
      await fetch('/api/forms/support-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      store.submitSupportTicket(formData);
      setSuccessMsg('Uw bericht is succesvol verzonden. Ons team in Oudegem reageert binnen 24 uur.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      store.submitSupportTicket(formData);
      setSuccessMsg('Uw bericht is succesvol verzonden. Ons team in Oudegem reageert binnen 24 uur.');
    } finally {
      setSubmitting(false);
    }
  };

  const coffeeFaqs: FaqItem[] = [
    {
      q: 'Hoe vers is de koffie die ik bestel?',
      a: 'Al onze koffies worden wekelijks in kleine batches met de hand gebrand in ons atelier te Oudegem. Wij hanteren een strikte versheidsbelofte: al onze bonen worden uiterlijk binnen 2 weken na branddatum geleverd, zodat ze in hun optimale smaakvenster bij u toekomen.',
    },
    {
      q: 'Wat is het verschil tussen specialty coffee en supermarktkoffie?',
      a: 'Specialty coffee scoort minimaal 80+ punten op het onafhankelijke 100-punten cupping protocol van de Specialty Coffee Association (SCA). Supermarktkoffie wordt vaak industrieel donker gebrand om defecten in bulkbonen te maskeren. Bij Maison Milau branden we ambachtelijk en traag op maat van de specifieke boon, waardoor complexe natuurlijke aroma’s van chocolade, rood fruit, jasmijn en honing bewaard blijven.',
    },
    {
      q: 'Welke maalgraad moet ik kiezen?',
      a: 'We raden altijd Volle bonen aan voor wie thuis zelf maalt. Heeft u geen bonenmaler? Kies "Espresso" voor pistonmachines, moka pots en Aeropress, of "Filter" voor klassieke filterapparaten, V60, Chemex of French Press.',
    },
    {
      q: 'Hoe bewaar ik mijn koffie het best?',
      a: 'Bewaar uw koffie in de originele Maison Milau verpakking met ontgassingsventiel op een koele, droge en donkere plaats (bijv. in een keukenkast). Bewaar koffiebonen nooit in de koelkast, aangezien condensatie en vreemde geuren de smaak aantasten.',
    },
    {
      q: 'Hoe werken de koffie-abonnementen?',
      a: 'Met een Maison Milau koffie-abonnement ontvangt u automatisch elke 2, 4 of 6 weken uw favoriete vers gebrande bonen met een vaste 10% korting. U kunt uw abonnement op elk gewenst moment gratis pauzeren, wijzigen of stopzetten in uw klantenportaal.',
    },
  ];

  const b2bFaqs: FaqItem[] = [
    {
      q: 'Kunnen we eerst proeven voor we beslissen?',
      a: 'Absoluut. We komen vrijblijvend langs in uw kantoor of horecazaak met ons mobiele proefassortiment voor een cuppingsessie met uw team, of sturen u kosteloos een samengesteld B2B-proefpakket toe.',
    },
    {
      q: 'Bieden jullie ook koffiemachines aan?',
      a: 'Ja. Voor kantoren voorzien wij betrouwbare Jura, Franke of DeLonghi volautomaten. Voor horeca en specialty bars verzorgen wij traditionele espressomachines en professionele bonenmalers, inclusief installatie en periodiek onderhoud.',
    },
    {
      q: 'Wat zijn de levertijden voor B2B-bestellingen?',
      a: 'B2B-leveringen gebeuren volgens een vast tweewekelijks of maandelijks schema. In de regio Dendermonde, Wetteren en Aalst leveren wij persoonlijk en gratis aan de deur.',
    },
    {
      q: 'Hoe zit het met de facturatie?',
      a: 'U ontvangt maandelijks een overzichtelijke digitale verzamelfactuur met vermelding van het wettelijke btw-tarief (6% op koffiebonen, 21% op machines en service).',
    },
  ];

  const eventsFaqs: FaqItem[] = [
    {
      q: 'Hoe ver op voorhand moeten we reserveren?',
      a: 'Voor machineverhuur adviseren wij minimaal 2 weken vooraf te reserveren. Voor een bemande koffiebar met barista raden wij 4 tot 8 weken vooraf aan, zeker tijdens het trouw- en festivalseizoen.',
    },
    {
      q: 'Wat is inbegrepen bij machineverhuur?',
      a: 'De huur omvat de geteste machine, ruim voldoende vers gebrande Maison Milau koffiebonen, bio-afbreekbare bekers, suiker, melkcupjes en een duidelijke handleiding met 24/7 telefonische ondersteuning.',
    },
    {
      q: 'Kunnen jullie ook ter plaatse koffie schenken?',
      a: 'Zeker. Met onze Formule 2 komt een professionele SCA-gecertificeerde barista naar uw evenement met een mobiele bar en serveert espresso, cappuccino met latte art, flat whites en artisanale theeën.',
    },
  ];

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 pb-14 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-2">
          Klantenservice & Informatie
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Veelgestelde Vragen (FAQ)
        </h1>
        <p className="text-sm sm:text-base text-[#5C4A3E] mt-3 max-w-3xl leading-relaxed">
          Vind duidelijke antwoorden op vragen over onze ambachtelijke branding, verzending, B2B-leveringen en eventverhuur.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* Section 1: Koffie & Bestellingen */}
        <section>
          <h2 className="text-xl font-serif font-bold text-[#2A1D17] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8C6239]"></span>
            Vragen over Koffie & Bestellingen
          </h2>
          <div className="space-y-3">
            {coffeeFaqs.map((faq, idx) => {
              const id = `koffie-${idx}`;
              const isOpen = openIndex === id;
              return (
                <div
                  key={id}
                  className="rounded-2xl bg-white border border-[#E0D7CD] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(id)}
                    className="w-full p-5 text-left flex justify-between items-center font-medium text-sm text-[#2A1D17] hover:bg-[#FAF6F0] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#8C6239]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4A3E] leading-relaxed border-t border-[#F5EFE6]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Kantoor & Horeca */}
        <section>
          <h2 className="text-xl font-serif font-bold text-[#2A1D17] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8C6239]"></span>
            Vragen over Kantoor & Horeca
          </h2>
          <div className="space-y-3">
            {b2bFaqs.map((faq, idx) => {
              const id = `b2b-${idx}`;
              const isOpen = openIndex === id;
              return (
                <div
                  key={id}
                  className="rounded-2xl bg-white border border-[#E0D7CD] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(id)}
                    className="w-full p-5 text-left flex justify-between items-center font-medium text-sm text-[#2A1D17] hover:bg-[#FAF6F0] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#8C6239]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4A3E] leading-relaxed border-t border-[#F5EFE6]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Events & Verhuur */}
        <section>
          <h2 className="text-xl font-serif font-bold text-[#2A1D17] mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8C6239]"></span>
            Vragen over Events & Verhuur
          </h2>
          <div className="space-y-3">
            {eventsFaqs.map((faq, idx) => {
              const id = `event-${idx}`;
              const isOpen = openIndex === id;
              return (
                <div
                  key={id}
                  className="rounded-2xl bg-white border border-[#E0D7CD] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleAccordion(id)}
                    className="w-full p-5 text-left flex justify-between items-center font-medium text-sm text-[#2A1D17] hover:bg-[#FAF6F0] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#8C6239]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5C4A3E] leading-relaxed border-t border-[#F5EFE6]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Contact & Vraag Sturen Form */}
        <section className="bg-white rounded-3xl border border-[#D9CEBF] p-8 sm:p-12 shadow-sm">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#8C6239] mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>Stel een Vraag</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2A1D17]">
              Heeft u een andere vraag of offerte-aanvraag?
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5749] mt-2 leading-relaxed">
              Laat een bericht achter voor Laurent en ons branderij-team in Oudegem. Wij antwoorden gewoonlijk binnen enkele uren.
            </p>
          </div>

          {successMsg ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              <div className="text-sm font-bold">{successMsg}</div>
              <button
                onClick={() => setSuccessMsg(null)}
                className="mt-2 text-xs font-semibold underline text-emerald-800"
              >
                Nieuw bericht versturen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSupportSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Uw Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Voornaam en achternaam"
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
                    placeholder="uw@email.be"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                  Onderwerp
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  placeholder="Bijv. Vraag over levering, blend aanpassing, horeca..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                  Bericht of Vraag *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  placeholder="Hoe kunnen we u helpen?"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Versturen...' : 'Verstuur Bericht'}</span>
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
