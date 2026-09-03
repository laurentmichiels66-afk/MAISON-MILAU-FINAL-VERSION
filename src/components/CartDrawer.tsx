import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { store, CartItem } from '../db/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  if (!isOpen) return null;

  const state = store.getState();
  const cart = state.cart;
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 45.0;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl border-l border-[#E0D7CD] flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E1D9]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#8C6239]" />
                <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Winkelwagen</h2>
                <span className="text-xs bg-[#EFE8DE] text-[#4B362A] px-2 py-0.5 rounded-full font-semibold">
                  {cart.reduce((sum, i) => sum + i.quantity, 0)} artikelen
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-md text-stone-500 hover:text-stone-800 hover:bg-stone-200/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping threshold bar */}
            <div className="mt-4 p-3 rounded-lg bg-[#F5EFE6] border border-[#E8DFC8]">
              <div className="flex justify-between text-xs font-medium text-[#4B362A] mb-1.5">
                <span>
                  {remainingForFreeShipping > 0 ? (
                    <>Nog €{remainingForFreeShipping.toFixed(2)} voor <strong>gratis verzending</strong></>
                  ) : (
                    <strong className="text-emerald-700">✓ Gratis verzending binnen België ontgrendeld!</strong>
                  )}
                </span>
                <span className="font-semibold text-[#8C6239]">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full bg-[#E5DCD0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#8C6239] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-[#786455]">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#C8B8A6] mb-3 stroke-[1.5]" />
                <p className="font-medium text-base text-[#2A1D17]">Uw winkelwagen is momenteel leeg</p>
                <p className="text-xs text-[#8A796C] mt-1">
                  Kies een specialty coffee blend uit onze webshop.
                </p>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.productId}-${item.grind}-${item.weight}`}
                  className="flex gap-4 p-3.5 rounded-xl bg-white border border-[#E8E1D9] shadow-xs"
                >
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[#2A1D17]">{item.productName}</h3>
                    <div className="text-xs text-[#786455] mt-0.5 space-x-2">
                      <span className="font-medium text-[#8C6239]">{item.weight}</span>
                      <span>·</span>
                      <span>{item.grind}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#2A1D17] mt-2">
                      €{(item.unitPrice * item.quantity).toFixed(2)}
                      <span className="text-xs text-[#8A796C] font-normal ml-1">
                        (€{item.unitPrice.toFixed(2)} / stuk)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => store.updateCartQuantity(index, 0)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Verwijder artikel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center border border-[#D9CEBF] rounded-lg bg-[#FAF6F0]">
                      <button
                        onClick={() => store.updateCartQuantity(index, item.quantity - 1)}
                        className="p-1 hover:bg-[#EAE1D3] text-[#2A1D17] rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-[#2A1D17]">{item.quantity}</span>
                      <button
                        onClick={() => store.updateCartQuantity(index, item.quantity + 1)}
                        className="p-1 hover:bg-[#EAE1D3] text-[#2A1D17] rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E1D9] bg-[#F5EFE6]/50 space-y-4">
              <div className="space-y-1.5 text-xs text-[#4B362A]">
                <div className="flex justify-between">
                  <span>Subtotaal (incl. 6% btw)</span>
                  <span className="font-semibold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verzendkosten (bpost)</span>
                  <span>{subtotal >= 45 ? <strong className="text-emerald-700">GRATIS</strong> : '€4,95'}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#2A1D17] pt-2 border-t border-[#E0D7CD]">
                  <span>Totaal</span>
                  <span>€{(subtotal + (subtotal >= 45 ? 0 : 4.95)).toFixed(2)}</span>
                </div>
              </div>

              <button
                id="cart-btn-proceed-checkout"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Afrekenen via Mollie Beveiligde Betaling</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#786455]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Bancontact, iDEAL, Visa, Mastercard, Apple Pay, Wero</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
