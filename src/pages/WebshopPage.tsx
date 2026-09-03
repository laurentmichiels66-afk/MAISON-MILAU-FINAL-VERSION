// Webshop Page - Maison Milau
// Complete catalog with exact verbatim collection descriptions, pricing ladders, grind selectors, giftboxes, accessories & subscription options.

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Check, Star, Filter, Sparkles, RefreshCw, Gift, Coffee, PackageCheck } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import { store } from '../db/store';
import { Product } from '../types/database';

interface WebshopPageProps {
  initialCollection?: string;
  onNavigate: (path: string) => void;
  onOpenCart: () => void;
}

export const WebshopPage: React.FC<WebshopPageProps> = ({
  initialCollection = 'all',
  onNavigate,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialCollection);
  const [selectedGrinds, setSelectedGrinds] = useState<Record<string, 'Volle bonen' | 'Espresso' | 'Filter'>>({});
  const [selectedWeights, setSelectedWeights] = useState<Record<string, '250g' | '500g' | '1kg'>>({});
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Sync with initialCollection parameter changes
  useEffect(() => {
    if (initialCollection && initialCollection !== 'all') {
      setActiveTab(initialCollection);
    }
  }, [initialCollection]);

  const collections = [
    { id: 'all', label: 'Alle Koffies & Producten' },
    { id: 'budget', label: 'Milau Budget' },
    { id: 'value', label: 'Milau Value' },
    { id: 'selection', label: 'Milau Selection' },
    { id: 'premium', label: 'Milau Premium' },
    { id: 'prestige', label: 'Milau Prestige' },
    { id: 'single_origin', label: 'Single Origins' },
    { id: 'barrel_aged', label: 'Barrel Aged' },
    { id: 'infused', label: 'Infused' },
    { id: 'giftbox', label: 'Giftboxen & Proefpakketten' },
    { id: 'merchandise', label: 'Toebehoren & Merchandise' },
    { id: 'subscriptions', label: 'Abonnementen (-10%)' },
    { id: 'promoties', label: 'Promoties' },
  ];

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'specialty') {
      return ['budget', 'value', 'selection', 'premium', 'prestige', 'single_origin'].includes(product.collection);
    }
    return product.collection === activeTab;
  });

  const getActiveGrind = (product: Product): 'Volle bonen' | 'Espresso' | 'Filter' => {
    return selectedGrinds[product.id] || product.availableGrinds[0] || 'Volle bonen';
  };

  const getActiveWeight = (product: Product): '250g' | '500g' | '1kg' => {
    return selectedWeights[product.id] || product.pricing[0].weight;
  };

  const getActivePrice = (product: Product): number => {
    const weight = getActiveWeight(product);
    const tier = product.pricing.find((p) => p.weight === weight);
    return tier ? tier.price : product.startingPrice;
  };

  const handleAddToCart = (product: Product) => {
    const weight = getActiveWeight(product);
    const grind = getActiveGrind(product);
    const unitPrice = getActivePrice(product);

    store.addToCart({
      productId: product.id,
      productName: product.name,
      collection: product.collection,
      grind,
      weight,
      unitPrice,
    });

    setAddedNotice(product.name);
    setTimeout(() => setAddedNotice(null), 2500);
    onOpenCart();
  };

  const handleStartSubscription = (product: Product) => {
    const weight = getActiveWeight(product);
    const grind = getActiveGrind(product);
    const originalPrice = getActivePrice(product);
    const discountedPrice = Number((originalPrice * 0.9).toFixed(2));

    const defaultAddress = store.getState().currentUser.addresses[0];

    store.addSubscription({
      userId: store.getState().currentUser.id,
      customerName: store.getState().currentUser.name,
      customerEmail: store.getState().currentUser.email,
      planType: 'Flexibel abonnement',
      coffeeId: product.id,
      coffeeName: product.name,
      grind,
      frequency: '4_weeks',
      weight,
      quantity: 1,
      pricePerShipment: discountedPrice,
      discountApplied: 10,
      status: 'active',
      nextShipmentDate: new Date(Date.now() + 28 * 86400000).toISOString().split('T')[0],
      shippingAddress: defaultAddress,
      paymentMethod: 'Bancontact',
    });

    onNavigate('/my-account?tab=subscriptions');
  };

  return (
    <div className="bg-[#FBF9F5] text-[#2A1D17] min-h-screen pb-24">
      {/* Toast Notification */}
      {addedNotice && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2A1D17] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#4B362A] animate-in fade-in slide-in-from-bottom-3">
          <Check className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold">{addedNotice} toegevoegd aan uw winkelwagen</span>
        </div>
      )}

      {/* Header */}
      <div className="px-4 sm:px-6 pt-10 pb-8 max-w-7xl mx-auto border-b border-[#E8E1D9]">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8C6239] block mb-1">
          Artisanale Micro-Roastery Oudegem
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2A1D17] tracking-tight">
          Onze Koffies · Webshop
        </h1>
        <p className="text-sm sm:text-base text-[#5C4A3E] mt-2 max-w-3xl leading-relaxed">
          Ambachtelijk gebrande specialty koffies voor elke gelegenheid. Altijd vers gebrand geleverd binnen 2 weken na branding.
        </p>

        {/* Collection Filter Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 pt-2">
          {collections.map((col) => (
            <button
              key={col.id}
              id={`filter-tab-${col.id}`}
              onClick={() => setActiveTab(col.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === col.id
                  ? 'bg-[#2A1D17] text-white shadow-sm'
                  : 'bg-[#F5EFE6] text-[#4B362A] hover:bg-[#EAE1D3] border border-[#E2D8CC]'
              }`}
            >
              {col.label}
            </button>
          ))}
        </div>
      </div>

      {/* Specific Section Overview when filtered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {activeTab === 'budget' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Milau Budget Collection</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €5,25 per 250g</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              De Milau Budget Collection bewijst dat goede koffie niet duur hoeft te zijn. Dit assortiment biedt toegankelijke espresso-, filter- en dagelijkse koffies met een vol karakter, veel body en een uitstekende prijs-kwaliteitverhouding.
              Deze koffies zijn speciaal ontwikkeld voor wie de stap wil zetten van standaard supermarktmerken naar vers gebrande koffie, zonder daarvoor meer te betalen. Verwacht vertrouwde smaken van chocolade, noten en zachte karameltinten, perfect voor dagelijks gebruik.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2A1D17]">
              Voor wie? · Dagelijkse koffiedrinker · Volautomatische machines · Kantoren en gezinnen · Beste prijs-kwaliteitverhouding
            </div>
          </div>
        )}

        {activeTab === 'value' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Milau Value Collection</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €5,95 per 250g</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              De Milau Value Collection vormt de ideale brug tussen traditionele koffie en specialty coffee. Deze zorgvuldig samengestelde blends bevatten geselecteerde Arabica's aangevuld met karaktervolle koffies uit Brazilië, Colombia en Costa Rica.
              Het resultaat is een evenwichtige kop koffie met meer zoetheid, complexiteit en oorsprongskarakter dan klassieke commerciële koffies, terwijl de prijs bijzonder toegankelijk blijft.
              Verwacht tonen van melkchocolade, karamel, honing en subtiele fruitige accenten.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2A1D17]">
              Voor wie? · Koffieliefhebbers die willen upgraden · Espresso én filter · Dagelijks gebruik met specialty karakter
            </div>
          </div>
        )}

        {activeTab === 'selection' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Milau Selection Collection</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €8,50 per 250g · SCA-score: gemiddeld 86-87+</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              De Milau Selection Collection vormt het hart van ons assortiment. Hier begint de echte wereld van specialty coffee.
              Voor deze blends selecteren wij uitsluitend hoogwaardige koffies afkomstig van gerenommeerde producenten en coöperaties uit onder meer Ethiopië, Rwanda, Costa Rica, Colombia en Brazilië. De focus ligt op balans, zoetheid en terroir.
              Verwacht complexe smaken van karamel, citrus, rijp steenfruit, chocolade en bloemige toetsen.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2A1D17]">
              Voor wie? · Specialty beginners én kenners · Espresso, filter en omni-roast · Perfecte balans tussen prijs en kwaliteit
            </div>
          </div>
        )}

        {activeTab === 'premium' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Milau Premium Collection</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €10,95 per 250g · SCA-score: 87-89</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              Voor de Milau Premium Collection selecteren wij uitsluitend koffiebonen met een Specialty Coffee Association-score van minimaal 87 punten.
              Deze uitzonderlijke koffies onderscheiden zich door hun verfijnde aroma's, uitgesproken zoetheid en complexe smaakstructuur. Denk aan variëteiten zoals Pink Bourbon, Orange Bourbon en zorgvuldig geselecteerde anaerobe lots.
              Verwacht elegante smaken van rood fruit, bloemenhoning, tropisch fruit, citrus en verfijnde chocoladetonen.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2A1D17]">
              Voor wie? · Ervaren koffieliefhebbers · Filter- en espressofanaten · Liefhebbers van uitgesproken smaakprofielen
            </div>
          </div>
        )}

        {activeTab === 'prestige' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Milau Prestige Collection</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €11,95 per 250g · SCA-score: 88-90+</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              De Milau Prestige Collection vertegenwoordigt het absolute topsegment van ons assortiment.
              Voor deze blends selecteren wij uitsluitend coffees met een SCA-score van 88 punten en hoger, waaronder exclusieve variëteiten zoals Gesha, Maragesha, SL-28 en andere zeldzame microlots.
              Veel van deze koffies zouden op zichzelf reeds uitzonderlijke single origins vormen. In onze Prestige-blends worden ze samengebracht tot complexe, gelaagde smaakervaringen die zich blijven ontwikkelen terwijl de koffie afkoelt.
              Verwacht aroma's van jasmijn, witte perzik, bergamot, tropisch fruit, honing en florale tonen die enkel voorkomen in de absolute top van specialty coffee.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2A1D17]">
              Voor wie? · Specialty puristen · Cuppers en professionals · Liefhebbers van uitzonderlijke koffie
            </div>
          </div>
        )}

        {activeTab === 'barrel_aged' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Barrel Aged Coffee</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €16,95 per 250g</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              Onze Barrel Aged Collection behoort tot de meest exclusieve koffies in ons assortiment.
              Groene koffiebonen rijpen gedurende meerdere weken in zorgvuldig geselecteerde eikenhouten vaten. Tijdens dit proces absorbeert de koffie subtiele aroma's uit het hout en de eerdere inhoud van het vat.
              Elke batch wordt in beperkte oplage geproduceerd en is slechts tijdelijk beschikbaar.
            </p>
          </div>
        )}

        {activeTab === 'infused' && (
          <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 space-y-2">
            <h2 className="text-lg font-serif font-bold text-[#2A1D17]">Infused Coffee</h2>
            <div className="text-xs text-[#8C6239] font-bold">Vanaf €10,95 per 250g</div>
            <p className="text-xs sm:text-sm text-[#5C4A3E] leading-relaxed">
              Onze Infused Coffee Collection combineert hoogwaardige specialty coffee met natuurlijke aroma-infusies.
              Na het brandproces worden de koffiebonen op een gecontroleerde en passieve manier verrijkt met zorgvuldig geselecteerde natuurlijke aroma's. Hierdoor behouden de bonen hun oorspronkelijke kwaliteit, terwijl extra smaaklagen worden toegevoegd.
              Het resultaat is een elegante gearomatiseerde koffie zonder de artificiële smaak die vaak met klassieke gearomatiseerde koffies wordt geassocieerd.
            </p>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="p-6 rounded-2xl bg-[#2A1D17] text-white mb-8 space-y-3">
            <div className="flex items-center gap-2 text-[#C89B67] text-xs font-bold uppercase tracking-wider">
              <RefreshCw className="w-4 h-4" />
              <span>Maison Milau Koffie-abonnementen (-10%)</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-[#EDE4DA]">
              Koffieformules voor Thuis & Onderneming
            </h2>
            <p className="text-xs sm:text-sm text-[#C4B5A6] leading-relaxed">
              Vast maandelijks of Flexibel abonnement (elke 2, 4 of 6 weken). Klant kiest zelf periodiciteit, bonen en maalgraad (volle bonen of gemalen). Mogelijkheid om levering tijdelijk te pauzeren via het klantenportaal. Ook beschikbaar als Verrassingsabonnement ("Coffee of the Month") of Cadeau-abonnement.
            </p>
            <div className="text-xs font-semibold text-[#C89B67]">
              ✓ Standaard 10% korting op elke levering · Automatische incasso of Bancontact · Altijd opzegbaar
            </div>
          </div>
        )}

        {activeTab === 'promoties' && (
          <div className="p-8 rounded-2xl bg-[#F5EFE6] border border-[#E2D8CC] mb-8 text-center space-y-2">
            <h2 className="text-xl font-serif font-bold text-[#2A1D17]">Actuele Promoties & Kortingen</h2>
            <p className="text-xs sm:text-sm text-[#786455] max-w-xl mx-auto">
              (check deze pagina regelmatig voor speciale promoties en kortingen)
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <div className="p-4 rounded-xl bg-white border border-[#D9CEBF] text-left">
                <span className="text-xs font-bold text-[#8C6239] block">Abonnementen voordeel</span>
                <span className="text-sm font-bold text-[#2A1D17]">Standaard -10% op alle periodieke orders</span>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#D9CEBF] text-left">
                <span className="text-xs font-bold text-[#8C6239] block">B2B Volumekortingen</span>
                <span className="text-sm font-bold text-[#2A1D17]">Staffelkortingen tot 20% vanaf 10kg/maand</span>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentGrind = getActiveGrind(product);
            const currentWeight = getActiveWeight(product);
            const currentPrice = getActivePrice(product);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#E0D7CD] p-6 shadow-xs hover:border-[#8C6239] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & SCA Badge */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#8C6239] border border-[#EADFCF]">
                      {product.collection.replace('_', ' ')}
                    </span>
                    {product.scaScore && (
                      <span className="text-xs font-bold text-[#2A1D17] bg-stone-100 px-2 py-0.5 rounded">
                        SCA: {product.scaScore}
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-serif font-bold text-[#2A1D17] mb-1">
                    {product.name}
                  </h3>
                  {product.tagline && (
                    <p className="text-xs text-[#786455] italic mb-3">
                      {product.tagline}
                    </p>
                  )}

                  <p className="text-xs text-[#5C4A3E] leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Blend Composition if present */}
                  {product.blendComposition && product.blendComposition.length > 0 && (
                    <div className="mb-4 text-[11px] bg-[#FAF6F0] p-2.5 rounded-lg border border-[#EDE5DA] text-[#5C4A3E] space-y-0.5">
                      <span className="font-semibold text-[#2A1D17] block mb-0.5">Blend:</span>
                      {product.blendComposition.map((comp, idx) => (
                        <div key={idx}>• {comp}</div>
                      ))}
                    </div>
                  )}

                  {/* Flavor Notes */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A796C] block mb-1.5">
                      Smaakprofiel:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.flavorNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F5EFE6] text-[#4B362A] font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ratings (Body, Acidity, Sweetness) */}
                  {product.bodyRating !== undefined && (
                    <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-[#EFE8DE] text-[11px] text-[#786455] mb-4">
                      <div>
                        <span className="block text-[10px] text-stone-500">Body</span>
                        <div className="flex text-amber-600">
                          {'★'.repeat(product.bodyRating)}
                          {'☆'.repeat(5 - product.bodyRating)}
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-500">Aciditeit</span>
                        <div className="flex text-amber-600">
                          {'★'.repeat(product.acidityRating || 0)}
                          {'☆'.repeat(5 - (product.acidityRating || 0))}
                        </div>
                      </div>
                      <div>
                        <span className="block text-[10px] text-stone-500">Zoetheid</span>
                        <div className="flex text-amber-600">
                          {'★'.repeat(product.sweetnessRating || 0)}
                          {'☆'.repeat(5 - (product.sweetnessRating || 0))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Weight Selector */}
                  {product.pricing.length > 1 && (
                    <div className="mb-3">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#786455] block mb-1">
                        Formaat:
                      </label>
                      <div className="flex gap-2">
                        {product.pricing.map((p) => (
                          <button
                            key={p.weight}
                            type="button"
                            onClick={() =>
                              setSelectedWeights((prev) => ({ ...prev, [product.id]: p.weight }))
                            }
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                              currentWeight === p.weight
                                ? 'bg-[#2A1D17] text-white border-[#2A1D17]'
                                : 'bg-[#FAF6F0] text-[#4B362A] border-[#D9CEBF] hover:bg-[#F2EAE0]'
                            }`}
                          >
                            {p.weight}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grind Selector */}
                  {product.availableGrinds.length > 1 && (
                    <div className="mb-4">
                      <label className="text-[10px] uppercase font-bold tracking-wider text-[#786455] block mb-1">
                        Maalgraad:
                      </label>
                      <div className="flex gap-1.5">
                        {product.availableGrinds.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() =>
                              setSelectedGrinds((prev) => ({ ...prev, [product.id]: g }))
                            }
                            className={`flex-1 py-1 px-2 text-[11px] font-medium rounded-lg border transition-all ${
                              currentGrind === g
                                ? 'bg-[#8C6239] text-white border-[#8C6239]'
                                : 'bg-white text-[#4B362A] border-[#E0D7CD] hover:bg-[#FAF6F0]'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price & Actions */}
                <div className="pt-4 border-t border-[#E8E1D9] space-y-2">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-xl font-serif font-bold text-[#2A1D17]">
                        €{currentPrice.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#786455] ml-1.5">
                        (incl. 6% btw)
                      </span>
                    </div>

                    {product.batchStatus && (
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {product.batchStatus}
                      </span>
                    )}
                  </div>

                  {/* Buttons: Add to Cart and Subscribe (-10%) */}
                  <div className="flex gap-2">
                    <button
                      id={`btn-add-cart-${product.id}`}
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#2A1D17] hover:bg-[#432F23] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>In Winkelwagen</span>
                    </button>

                    {product.collection !== 'merchandise' && (
                      <button
                        id={`btn-sub-${product.id}`}
                        onClick={() => handleStartSubscription(product)}
                        title="Start abonnement met 10% korting"
                        className="py-2.5 px-3 rounded-xl border border-[#8C6239] text-[#8C6239] hover:bg-[#F5EFE6] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Abonnement (-10%)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
