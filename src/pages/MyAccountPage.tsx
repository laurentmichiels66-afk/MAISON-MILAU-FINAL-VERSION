// My Account Portal - Maison Milau
// Complete customer portal for B2C, B2B and Admin role views

import React, { useState, useEffect } from 'react';
import { User, Package, RefreshCw, FileText, MapPin, Settings, ShieldCheck, CheckCircle2, PauseCircle, PlayCircle, Plus, Download, ArrowRight } from 'lucide-react';
import { store } from '../db/store';
import { Order, Subscription, UserProfile, B2BInquiry, EventInquiry, Appointment } from '../types/database';

interface MyAccountPageProps {
  initialTab?: string;
  onNavigate: (path: string) => void;
}

export const MyAccountPage: React.FC<MyAccountPageProps> = ({ initialTab = 'orders', onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [user, setUser] = useState<UserProfile>(store.getState().currentUser);
  const [orders, setOrders] = useState<Order[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [adminInquiries, setAdminInquiries] = useState<B2BInquiry[]>([]);
  const [adminEvents, setAdminEvents] = useState<EventInquiry[]>([]);
  const [adminAppointments, setAdminAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const update = () => {
      const state = store.getState();
      setUser(state.currentUser);
      setOrders(state.orders.filter((o) => o.userId === state.currentUser.id || state.currentUser.role === 'admin'));
      setSubscriptions(state.subscriptions.filter((s) => s.userId === state.currentUser.id || state.currentUser.role === 'admin'));
      setAdminInquiries(state.b2bInquiries);
      setAdminEvents(state.eventInquiries);
      setAdminAppointments(state.appointments);
    };
    update();
    return store.subscribe(update);
  }, []);

  const handleToggleSub = (subId: string, currentStatus: 'active' | 'paused' | 'cancelled') => {
    const next = currentStatus === 'active' ? 'paused' : 'active';
    store.updateSubscriptionStatus(subId, next);
  };

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-12 pb-8 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-1">
              Klantenportaal
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2A1D17]">
              Welkom, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#786455] mt-1">
              {user.email} · {user.role === 'b2b' ? `Zakelijk Account (${user.companyName || 'B2B'})` : user.role === 'admin' ? 'Beheerder' : 'Particulier Account'}
            </p>
          </div>

          {/* Quick role toggle for preview */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-[#D9CEBF] text-xs">
            <span className="text-stone-500 font-medium">Toon rol:</span>
            <button
              onClick={() => store.setUserRole('b2c')}
              className={`px-2 py-1 rounded font-semibold ${user.role === 'b2c' ? 'bg-[#2A1D17] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              B2C
            </button>
            <button
              onClick={() => store.setUserRole('b2b')}
              className={`px-2 py-1 rounded font-semibold ${user.role === 'b2b' ? 'bg-[#8C6239] text-white' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              B2B
            </button>
            <button
              onClick={() => store.setUserRole('admin')}
              className={`px-2 py-1 rounded font-semibold ${user.role === 'admin' ? 'bg-stone-800 text-white' : 'text-stone-600 hover:bg-stone-100'}`}
            >
              Beheerder
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#2A1D17] text-white'
                : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Bestelgeschiedenis ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'subscriptions'
                ? 'bg-[#2A1D17] text-white'
                : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Koffie-abonnementen ({subscriptions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'invoices'
                ? 'bg-[#2A1D17] text-white'
                : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Facturen & Mollie Betalingen</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#2A1D17] text-white'
                : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Bezorgadressen</span>
          </button>

          {user.role === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-[#8C6239] text-white ring-2 ring-[#8C6239]/40'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin Beheerspaneel</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* TAB 1: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
                Uw Bestellingen
              </h2>
              <button
                onClick={() => onNavigate('/webshop')}
                className="text-xs font-semibold text-[#8C6239] hover:underline flex items-center gap-1"
              >
                <span>Nieuwe bestelling plaatsen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#E0D7CD] text-center space-y-3">
                <Package className="w-12 h-12 text-[#C8B8A6] mx-auto stroke-[1.5]" />
                <p className="font-serif font-bold text-base text-[#2A1D17]">Nog geen bestellingen geplaatst</p>
                <p className="text-xs text-[#786455]">
                  Plaats uw eerste bestelling in onze specialty coffee webshop.
                </p>
                <button
                  onClick={() => onNavigate('/webshop')}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-[#2A1D17] text-white text-xs font-semibold"
                >
                  Naar de Webshop
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-[#E0D7CD] p-6 shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 pb-4 border-b border-[#EFE8DE]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#2A1D17]">{order.orderNumber}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              order.status === 'Payment Successful' || order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-[#786455] mt-0.5">
                          Geplaatst op: {order.createdAt} · Mollie ID: {order.molliePaymentId || order.id}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-bold text-[#2A1D17]">
                          €{order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-[11px] text-[#786455]">
                          Betaald via {order.paymentMethod}
                        </div>
                      </div>
                    </div>

                    {/* Order items list */}
                    <div className="space-y-2 text-xs">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[#4B362A]">
                          <div>
                            <span className="font-semibold text-[#2A1D17]">{item.quantity}x</span> {item.productName}
                            <span className="text-[#8A796C] ml-2">({item.weight}, {item.grind})</span>
                          </div>
                          <div className="font-medium text-[#2A1D17]">
                            €{(item.unitPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#EFE8DE] flex flex-wrap justify-between items-center text-xs text-[#786455] gap-2">
                      <div>
                        <strong>Leveradres:</strong> {order.shippingAddress.street}, {order.shippingAddress.postalCode} {order.shippingAddress.city}
                      </div>
                      <button
                        onClick={() => alert(`Factuur ${order.invoiceNumber} (Maison Milau, BTW BE 1041.542.844) gedownload als PDF.`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#D9CEBF] bg-[#FAF6F0] hover:bg-[#F2EAE0] text-xs font-semibold text-[#2A1D17]"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Factuur ({order.invoiceNumber})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Subscriptions */}
        {activeTab === 'subscriptions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
                  Lopende Koffie-abonnementen (-10%)
                </h2>
                <p className="text-xs text-[#786455]">
                  Elke levering wordt vers gebrand verzonden met automatische betaling via Mollie Recurring.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/webshop?collection=subscriptions')}
                className="px-4 py-2 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nieuw Abonnement</span>
              </button>
            </div>

            {subscriptions.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#E0D7CD] text-center space-y-3">
                <RefreshCw className="w-12 h-12 text-[#C8B8A6] mx-auto stroke-[1.5]" />
                <p className="font-serif font-bold text-base text-[#2A1D17]">Geen actieve abonnementen</p>
                <p className="text-xs text-[#786455]">
                  Start een flexibel koffie-abonnement en bespaar direct 10% op elke levering.
                </p>
                <button
                  onClick={() => onNavigate('/webshop')}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-[#2A1D17] text-white text-xs font-semibold"
                >
                  Ontdek de Koffies
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-2xl border border-[#E0D7CD] p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            sub.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {sub.status === 'active' ? 'Actief (Levert Periodiek)' : 'Gepauzeerd'}
                        </span>
                        <span className="text-xs font-bold text-[#8C6239]">
                          {sub.discountApplied}% Korting
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-base text-[#2A1D17]">{sub.coffeeName}</h3>
                      <div className="text-xs text-[#786455] mt-1 space-x-2">
                        <span>Formaat: {sub.weight}</span>
                        <span>·</span>
                        <span>Maalgraad: {sub.grind}</span>
                      </div>

                      <div className="my-4 p-3 rounded-xl bg-[#FAF6F0] border border-[#EDE5DA] text-xs space-y-1 text-[#4B362A]">
                        <div>
                          <strong>Frequentie:</strong> Elke {sub.frequency === '2_weeks' ? '2 weken' : sub.frequency === '4_weeks' ? '4 weken' : '6 weken'}
                        </div>
                        <div>
                          <strong>Volgende Branding & Verzending:</strong> {sub.nextShipmentDate}
                        </div>
                        <div>
                          <strong>Bedrag per zending:</strong> €{sub.pricePerShipment.toFixed(2)} (incl. btw & korting)
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EFE8DE] flex gap-2">
                      <button
                        onClick={() => handleToggleSub(sub.id, sub.status)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                          sub.status === 'active'
                            ? 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
                            : 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                        }`}
                      >
                        {sub.status === 'active' ? (
                          <>
                            <PauseCircle className="w-3.5 h-3.5" />
                            <span>Abonnement Pauzeren</span>
                          </>
                        ) : (
                          <>
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>Abonnement Hervatten</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => alert(`Abonnement gewijzigd. Uw aanpassing is opgeslagen.`)}
                        className="py-2 px-3 rounded-xl border border-[#D9CEBF] text-xs font-semibold text-[#4B362A] hover:bg-[#FAF6F0]"
                      >
                        Wijzigen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Invoices */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-3xl border border-[#E0D7CD] p-8 space-y-6">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
                Facturen & Betaaloverzicht
              </h2>
              <p className="text-xs text-[#786455] mt-1">
                Alle facturen van Maison Milau (BTW BE 1041.542.844) worden conform de Belgische wetgeving opgemaakt met uitgesplitste 6% BTW (koffiebonen) en 21% BTW (machines en diensten).
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF6F0] text-[#5C4A3E] border-b border-[#E0D7CD]">
                  <tr>
                    <th className="p-3 font-semibold">Factuurnummer</th>
                    <th className="p-3 font-semibold">Datum</th>
                    <th className="p-3 font-semibold">Omschrijving</th>
                    <th className="p-3 font-semibold">Bedrag (incl. BTW)</th>
                    <th className="p-3 font-semibold">Mollie Betaalstatus</th>
                    <th className="p-3 font-semibold text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DE]">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#FAF6F0]/50">
                      <td className="p-3 font-bold text-[#2A1D17]">{order.invoiceNumber}</td>
                      <td className="p-3 text-[#786455]">{order.createdAt}</td>
                      <td className="p-3 text-[#4B362A]">{order.items.map((i) => i.productName).join(', ')}</td>
                      <td className="p-3 font-semibold text-[#2A1D17]">€{order.totalAmount.toFixed(2)}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px] border border-emerald-200">
                          Betaald via Mollie
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => alert(`Factuur ${order.invoiceNumber} gedownload.`)}
                          className="text-[#8C6239] hover:underline font-semibold"
                        >
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#2A1D17]">
              Bezorgadressen & Bedrijfsgegevens
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-2 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif font-bold text-sm text-[#2A1D17]">
                      {addr.street}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded bg-[#F5EFE6] text-[#8C6239] font-bold text-[10px]">
                        Standaard Adres
                      </span>
                    )}
                  </div>
                  <div className="text-[#4B362A]">
                    {addr.postalCode} {addr.city}
                  </div>
                  <div className="text-[#786455]">{addr.country}</div>
                  {user.vatNumber && (
                    <div className="pt-2 text-stone-500">
                      <strong>BTW-nummer:</strong> {user.vatNumber}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Admin Panel (Laurent / Webbeheerder) */}
        {activeTab === 'admin' && (
          <div className="space-y-8">
            <div className="bg-[#2A1D17] text-white p-6 rounded-2xl flex justify-between items-center">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#EDE4DA]">
                  Beheersoverzicht Atelier Maison Milau
                </h2>
                <p className="text-xs text-[#A89889]">
                  Centraal overzicht van inkomende B2B aanvragen, event offertes, afspraken en orders.
                </p>
              </div>
              <span className="px-3 py-1 rounded bg-[#8C6239] text-white text-xs font-bold">
                Rol: Webbeheerder
              </span>
            </div>

            {/* Inkomende B2B Aanvragen */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2A1D17]">
                Inkomende B2B Aanvragen ({adminInquiries.length})
              </h3>
              {adminInquiries.length === 0 ? (
                <p className="text-xs text-stone-500">Nog geen nieuwe B2B aanvragen ontvangen.</p>
              ) : (
                <div className="space-y-3">
                  {adminInquiries.map((inq) => (
                    <div key={inq.id} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-sm text-[#2A1D17]">
                        <span>{inq.companyName} ({inq.contactPerson})</span>
                        <span className="text-[11px] font-normal text-stone-500">{inq.submittedAt}</span>
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Contact:</strong> {inq.email} · {inq.phone} | <strong>BTW:</strong> {inq.vatNumber || 'N.v.t.'}
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Sector:</strong> {inq.sector} | <strong>Behoefte:</strong> {inq.machineNeed}
                      </div>
                      {inq.questions && (
                        <div className="text-[#4B362A] italic bg-white p-2 rounded border border-[#EDE5DA] mt-1">
                          "{inq.questions}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inkomende Event Offerte Aanvragen */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2A1D17]">
                Inkomende Event Offertes ({adminEvents.length})
              </h3>
              {adminEvents.length === 0 ? (
                <p className="text-xs text-stone-500">Nog geen nieuwe event aanvragen.</p>
              ) : (
                <div className="space-y-3">
                  {adminEvents.map((evt) => (
                    <div key={evt.id} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-sm text-[#2A1D17]">
                        <span>{evt.contactPerson} ({evt.guestCount} gasten)</span>
                        <span className="text-[11px] font-normal text-stone-500">{evt.submittedAt}</span>
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Datum & Locatie:</strong> {evt.eventDate} te {evt.location}
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Formule:</strong> {evt.formula} | <strong>Contact:</strong> {evt.email} ({evt.phone})
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Inkomende Afspraken */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2A1D17]">
                Ingeplande Atelier Afspraken ({adminAppointments.length})
              </h3>
              {adminAppointments.length === 0 ? (
                <p className="text-xs text-stone-500">Nog geen afspraken ingepland.</p>
              ) : (
                <div className="space-y-3">
                  {adminAppointments.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFC8] text-xs space-y-1">
                      <div className="flex justify-between font-bold text-sm text-[#2A1D17]">
                        <span>{app.name} · {app.service}</span>
                        <span className="text-[#8C6239]">{app.date} om {app.time}</span>
                      </div>
                      <div className="text-[#6B5749]">
                        <strong>Contact:</strong> {app.email} · {app.phone}
                      </div>
                      {app.notes && (
                        <div className="text-[#786455] italic">Opmerking: {app.notes}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
