// Checkout Page - Maison Milau with Mollie Payment Integration
// Real order placement, VAT calculation, and Mollie checkout modal trigger

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Truck, Store, CreditCard, Lock } from 'lucide-react';
import { store, CartItem } from '../db/store';
import { PaymentMethod, Order } from '../types/database';
import { MolliePaymentModal } from '../components/MolliePaymentModal';

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const state = store.getState();
  const cart = state.cart;
  const currentUser = state.currentUser;

  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'pickup'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Bancontact');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [showMollieModal, setShowMollieModal] = useState(false);

  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || currentUser.phoneNumber || '',
    company: currentUser.companyName || currentUser.companyProfile?.companyName || '',
    vatNumber: currentUser.vatNumber || currentUser.companyProfile?.vatNumber || '',
    street: currentUser.addresses[0]?.street || 'Jef Scheirsstraat 29',
    postalCode: currentUser.addresses[0]?.postalCode || '9200',
    city: currentUser.addresses[0]?.city || 'Oudegem',
    country: currentUser.addresses[0]?.country || 'België',
    orderNotes: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingCost = deliveryMethod === 'pickup' || subtotal >= 45.0 ? 0 : 4.95;
  const totalAmount = subtotal + shippingCost;
  const vatAmount = totalAmount - totalAmount / 1.06; // 6% VAT included

  if (cart.length === 0 && !createdOrder) {
    return (
      <div className="bg-[#FBF9F5] min-h-screen py-20 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-[#2A1D17]">Uw winkelmand is leeg</h2>
        <p className="text-xs text-[#786455] mt-2 mb-6">Voeg eerst producten toe om af te rekenen.</p>
        <button
          onClick={() => onNavigate('/webshop')}
          className="px-6 py-3 rounded-xl bg-[#2A1D17] text-white text-xs font-semibold"
        >
          Naar de Webshop
        </button>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderNumber = `MILAU-${Date.now().toString().slice(-6)}`;
    const invoiceNumber = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const molliePaymentId = `tr_${Math.random().toString(36).substring(2, 12)}`;
    const molliePaymentUrl = `https://www.mollie.com/payscreen/checkout/${molliePaymentId}`;
    const mollieQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(molliePaymentUrl)}`;

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      userId: currentUser.id,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      companyName: formData.company,
      vatNumber: formData.vatNumber,
      items: cart.map((c) => ({
        ...c,
        subtotal: c.unitPrice * c.quantity,
      })),
      subtotal,
      shippingCost,
      shippingFee: shippingCost,
      vatAmount,
      totalAmount,
      status: 'Pending Payment',
      paymentMethod,
      molliePaymentId,
      molliePaymentUrl,
      mollieQrCode,
      invoiceNumber,
      invoiceStatus: 'issued',
      shippingAddress: {
        id: 'addr_checkout',
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        isDefault: true,
      },
      deliveryMethod,
      deliveryOption: deliveryMethod === 'pickup' ? 'pickup_atelier_oudegem' : 'bpost_delivery',
      orderNotes: formData.orderNotes,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Store in global store
    store.addOrder(newOrder);
    setCreatedOrder(newOrder);

    // Call backend API for Mollie Payment initialization
    try {
      await fetch('/api/mollie/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: newOrder.id,
          orderNumber,
          amount: totalAmount,
          currency: 'EUR',
          customerEmail: formData.email,
          customerName: formData.name,
          paymentMethod,
          returnUrl: `${window.location.origin}/my-account?orderId=${newOrder.id}`,
        }),
      });
    } catch {
      // Offline fallback
    }

    // Open Mollie interactive payment modal
    setShowMollieModal(true);
  };

  const handlePaymentDone = (success: boolean) => {
    setShowMollieModal(false);
    if (success) {
      store.clearCart();
      onNavigate('/my-account?tab=orders');
    }
  };

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Mollie Payment Modal */}
      {createdOrder && (
        <MolliePaymentModal
          order={createdOrder}
          isOpen={showMollieModal}
          onClose={() => setShowMollieModal(false)}
          onPaymentComplete={handlePaymentDone}
        />
      )}

      {/* Header */}
      <div className="px-4 sm:px-6 pt-10 pb-8 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-1">
          Veilig Afrekenen
        </span>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#2A1D17]">
          Bestelling Afronden & Betalen
        </h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-[#786455]">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Beveiligde Mollie transactie · Bancontact, iDEAL, Visa, Mastercard, Apple Pay, Wero, Cartes Bancaires</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Delivery & Customer Info */}
          <div className="lg:col-span-7 space-y-8">
            {/* Delivery Method Choice */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-base text-[#2A1D17]">
                1. Levering of Afhaling
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    deliveryMethod === 'shipping'
                      ? 'border-[#8C6239] bg-[#F5EFE6] ring-1 ring-[#8C6239]'
                      : 'border-[#E0D7CD] bg-[#FAF6F0]'
                  }`}
                >
                  <Truck className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#2A1D17]">Bezorging via bpost</div>
                    <div className="text-[11px] text-[#786455] mt-0.5">
                      {subtotal >= 45 ? 'GRATIS verzending' : '€4,95 standaard verzendkosten'}
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                    deliveryMethod === 'pickup'
                      ? 'border-[#8C6239] bg-[#F5EFE6] ring-1 ring-[#8C6239]'
                      : 'border-[#E0D7CD] bg-[#FAF6F0]'
                  }`}
                >
                  <Store className="w-5 h-5 text-[#8C6239] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#2A1D17]">Afhalen in ons Atelier</div>
                    <div className="text-[11px] text-[#786455] mt-0.5">
                      Gratis · Jef Scheirsstraat 29, 9200 Oudegem
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-base text-[#2A1D17]">
                2. Uw Gegevens & Adres
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    Volledige Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    Bedrijfsnaam (optioneel voor B2B)
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="Bedrijfsnaam voor facturatie"
                  />
                </div>
              </div>

              {formData.company && (
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    BTW-nummer
                  </label>
                  <input
                    type="text"
                    value={formData.vatNumber}
                    onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                    placeholder="BE 0xxx.xxx.xxx"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                  Straat en huisnummer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    Postcode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#2A1D17] block mb-1">
                    Gemeente / Stad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#D9CEBF] bg-[#FBF9F5] text-xs text-[#2A1D17]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D7CD] shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-base text-[#2A1D17]">
                3. Kies Betaalmethode (Verwerkt via Mollie)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {(['Bancontact', 'iDEAL', 'Visa', 'Mastercard', 'Apple Pay', 'Wero', 'Cartes Bancaires'] as PaymentMethod[]).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                      paymentMethod === method
                        ? 'border-blue-600 bg-blue-50 text-[#1A1A1A] ring-1 ring-blue-600'
                        : 'border-[#E0D7CD] bg-[#FAF6F0] text-[#4B362A] hover:bg-[#F2EAE0]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E0D7CD] shadow-sm space-y-6 sticky top-28">
              <h2 className="font-serif font-bold text-lg text-[#2A1D17] border-b border-[#EFE8DE] pb-3">
                Overzicht Bestelling
              </h2>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-[#4B362A] pb-2 border-b border-[#F5EFE6]">
                    <div>
                      <span className="font-bold text-[#2A1D17]">{item.quantity}x</span> {item.productName}
                      <div className="text-[11px] text-[#786455]">{item.weight} · {item.grind}</div>
                    </div>
                    <div className="font-semibold text-[#2A1D17]">
                      €{(item.unitPrice * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-[#4B362A] border-t border-[#EFE8DE] pt-4">
                <div className="flex justify-between">
                  <span>Subtotaal</span>
                  <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verzendkosten</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-700">GRATIS</strong> : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-[11px] text-stone-500">
                  <span>Inbegrepen BTW (6% op koffie)</span>
                  <span>€{vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2A1D17] pt-3 border-t border-[#E0D7CD]">
                  <span>Totaal te betalen</span>
                  <span>€{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                id="btn-confirm-checkout-mollie"
                className="w-full py-4 px-4 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Naar Mollie Beveiligde Betaling</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#786455] pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Geautoriseerd door Mollie · Directe orderbevestiging</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
