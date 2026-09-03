// Afspraakplanner Page - Atelier Maison Milau
// Rule: Do not rewrite, improve, summarize, optimize, shorten, expand or modify any text.

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CheckCircle2, Coffee, User, Send } from 'lucide-react';
import { store } from '../db/store';

interface AppointmentPageProps {
  onNavigate: (path: string) => void;
}

export const AppointmentPage: React.FC<AppointmentPageProps> = () => {
  const [selectedService, setSelectedService] = useState('Koffieproeverij & Cupping Sessie');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('14:00');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const services = [
    {
      id: 'Koffieproeverij & Cupping Sessie',
      title: 'Koffieproeverij & Cupping Sessie',
      desc: 'Proef onze single origins, blends en barrel aged coffees onder leiding van de meesterbrander.',
      duration: '45 minuten',
    },
    {
      id: 'Atelier Bezoek & Bonen Afhalen',
      title: 'Atelier Bezoek & Bonen Afhalen',
      desc: 'Haal uw verse koffiebonen direct op in ons branderij-atelier in Oudegem.',
      duration: '15 minuten',
    },
    {
      id: 'Blend Ontwikkeling & White Label',
      title: 'Blend Ontwikkeling & White Label',
      desc: 'Ontwikkel samen met Laurent uw eigen gepersonaliseerde huisblend voor horeca of kantoor.',
      duration: '60 minuten',
    },
    {
      id: 'B2B Machine & Formule Demonstratie',
      title: 'B2B Machine & Formule Demonstratie',
      desc: 'Verken professionele espressoapparatuur en verhuurformules voor uw bedrijf of horecazaak.',
      duration: '45 minuten',
    },
  ];

  const timeSlots = ['10:00', '11:30', '14:00', '15:30', '17:00'];

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !selectedDate) return;

    setSubmitting(true);
    try {
      await fetch('/api/forms/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      store.submitAppointment({
        ...formData,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      });

      setConfirmed(true);
    } catch {
      store.submitAppointment({
        ...formData,
        service: selectedService,
        date: selectedDate,
        time: selectedTime,
      });
      setConfirmed(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 pb-14 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#8C6239] mb-2">
          <MapPin className="w-4 h-4" />
          <span>Atelier Oudegem (Dendermonde)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Plan een Bezoek of Afspraak
        </h1>
        <p className="text-sm sm:text-base text-[#5C4A3E] mt-3 max-w-3xl leading-relaxed">
          Bezoek aan ons branderij-atelier in Oudegem is mogelijk op afspraak of tijdens onze afhaaldagen.
          Adres: Jef Scheirsstraat 29, 9200 Oudegem.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {confirmed ? (
          <div className="bg-white rounded-3xl border border-[#D9CEBF] p-8 sm:p-12 text-center shadow-md space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">
              Uw Afspraak is Bevestigd!
            </h2>
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EAE2D7] text-left max-w-md mx-auto space-y-2 text-xs text-[#4B362A]">
              <div>
                <strong>Dienst:</strong> {selectedService}
              </div>
              <div>
                <strong>Datum & Tijdstip:</strong> {selectedDate} om {selectedTime}
              </div>
              <div>
                <strong>Locatie:</strong> Atelier Maison Milau, Jef Scheirsstraat 29, 9200 Oudegem
              </div>
              <div>
                <strong>Contactpersoon:</strong> {formData.name} ({formData.phone})
              </div>
            </div>
            <p className="text-xs text-[#786455] max-w-md mx-auto">
              We hebben een bevestiging gestuurd naar <strong>{formData.email}</strong>. Laurent kijkt ernaar uit u te verwelkomen met een verse kop specialty coffee.
            </p>
            <button
              onClick={() => setConfirmed(false)}
              className="mt-4 px-6 py-2.5 rounded-xl border border-stone-300 text-xs font-semibold text-[#2A1D17] hover:bg-[#F5EFE6]"
            >
              Nieuwe afspraak inplannen
            </button>
          </div>
        ) : (
          <form onSubmit={handleBooking} className="bg-white rounded-3xl border border-[#E0D7CD] p-8 sm:p-12 shadow-xs space-y-10">
            {/* Step 1: Select Service */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-2">
                Stap 1: Kies het type afspraak
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                      selectedService === s.id
                        ? 'border-[#8C6239] bg-[#F5EFE6] ring-2 ring-[#8C6239]/20'
                        : 'border-[#E0D7CD] bg-[#FAF6F0] hover:bg-[#F2EAE0]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif font-bold text-sm text-[#2A1D17]">{s.title}</h3>
                      <span className="text-[10px] text-[#8C6239] font-medium bg-white px-2 py-0.5 rounded border border-[#E0D7CD]">
                        {s.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[#5C4A3E] leading-relaxed mt-1">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-2">
                Stap 2: Datum & Tijdstip
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Gewenste Datum *
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Beschikbaar Tijdstip
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                          selectedTime === slot
                            ? 'bg-[#2A1D17] text-white border-[#2A1D17]'
                            : 'bg-[#FBF9F5] text-[#4B362A] border-[#D9CEBF] hover:bg-[#F2EAE0]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Contact details */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6239] block mb-2">
                Stap 3: Uw Gegevens
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                    Volledige Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Voornaam Achternaam"
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

              <div className="mt-4">
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1.5">
                  Extra wensen of specifieke koffievragen
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  placeholder="Bijv. aantal personen, interesse in barrel aged coffees of B2B machineadvies..."
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                id="btn-confirm-booking"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? 'Afspraak vastleggen...' : 'Bevestig Afspraak in het Atelier'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
