// STEP 3: Complete Database Entities & Schema Definition
// Production database models for Maison Milau E-commerce & Customer Portal.

export type UserRole = 'b2c' | 'b2b' | 'admin';

export interface Address {
  id: string;
  type?: 'Thuis' | 'Werk' | 'Vakantieadres' | 'Magazijn' | 'Hoofdkantoor' | 'Vestiging Brussel' | 'Vestiging Antwerpen' | 'Overig';
  recipientName?: string;
  street: string;
  number?: string;
  postalCode: string;
  city: string;
  country: string;
  isDefault?: boolean;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface B2BCompanyProfile {
  companyName: string;
  vatNumber: string; // e.g. BE 1041.542.844 or customer VAT
  sector: 'Horeca / Restaurant / Café / Koffiebar' | 'Kantoor / Bedrijfsruimte' | 'Handelszaak / Boetiek / Kapper' | 'Residentieel centrum / Zorginstelling' | 'Overige';
  contactPerson: string;
  phone: string;
  email: string;
  billingAddress: Address;
  deliveryAddresses: Address[];
  approvedDiscountTier: number; // e.g. 10%, 12%, 15%, 18%, 20%
  paymentTerms: 'Immediate' | '14_days' | '30_days' | '60_days';
  creditLimit: number;
  openBalance: number;
  monthlyCoffeeVolumeKg: number;
  erpIntegrationStatus: 'Connected (Accountable)' | 'Pending' | 'Disabled';
  budgetAnnual: number;
  budgetSpent: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  phoneNumber?: string;
  password?: string;
  role: UserRole;
  companyName?: string;
  vatNumber?: string;
  createdAt: string;
  addresses: Address[];
  wishlistProductIds: string[];
  loyaltyPoints: number;
  companyProfile?: B2BCompanyProfile;
  subUsers?: {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Buyer' | 'Approver' | 'Viewer';
    spendingLimit: number;
  }[];
}

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: 'b2c' | 'b2b';
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  companyName?: string;
  vatNumber?: string;
  sector?: string;
}

export type UserProfile = User;

export type OrderStatus =
  | 'Pending Payment'
  | 'Payment Authorized'
  | 'Payment Successful'
  | 'Payment Failed'
  | 'Refunded'
  | 'Partially Refunded'
  | 'Cancelled'
  | 'Delivered';

export type PaymentMethod =
  | 'Bancontact'
  | 'iDEAL'
  | 'Visa'
  | 'Mastercard'
  | 'Apple Pay'
  | 'Wero'
  | 'Cartes Bancaires'
  | 'Invoice (B2B 30 dagen)';

export interface OrderItem {
  productId: string;
  productName: string;
  collection: string;
  grind: 'Volle bonen' | 'Espresso' | 'Filter' | 'Cafetière / French Press' | 'Snelfilter' | string;
  weight: '250g' | '500g' | '1kg' | string;
  unitPrice: number;
  quantity: number;
  subtotal?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  isB2B?: boolean;
  companyName?: string;
  vatNumber?: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost?: number;
  shippingFee?: number;
  vatAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  molliePaymentId?: string;
  molliePaymentUrl?: string;
  mollieQrCode?: string;
  deliveryMethod?: 'shipping' | 'pickup';
  deliveryOption?: 'bpost_delivery' | 'pickup_atelier_oudegem' | 'pickup_market_dendermonde' | 'pickup_market_wetteren' | 'pickup_market_aalst' | string;
  shippingAddress: Address;
  billingAddress?: Address;
  orderNotes?: string;
  invoiceNumber?: string;
  invoiceStatus?: string;
  trackingNumber?: string;
  trackingCarrier?: 'bpost' | 'milau_direct';
  invoiceId?: string;
  createdAt: string;
  estimatedDeliveryDate?: string;
}

export type InvoiceStatus = 'Open' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  orderId: string;
  userId: string;
  companyName?: string;
  vatNumber?: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  vat6Percent: number; // 6% on coffee beans
  vat21Percent: number; // 21% on equipment/delivery/merchandise
  totalAmount: number;
  status: InvoiceStatus;
  molliePaymentUrl?: string;
  mollieQrCode?: string;
  paidAt?: string;
  pdfUrl: string;
}

export type SubscriptionFrequency = '2_weeks' | '4_weeks' | '6_weeks';
export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';

export interface Subscription {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  planType: 'Vast maandelijks' | 'Flexibel abonnement' | 'Verrassingsabonnement ("Coffee of the Month")' | 'Cadeau-abonnement';
  coffeeId: string;
  coffeeName: string;
  grind: 'Volle bonen' | 'Espresso' | 'Filter';
  frequency: SubscriptionFrequency;
  weight: '250g' | '500g' | '1kg';
  quantity: number;
  pricePerShipment: number; // includes 10% discount
  discountApplied: number; // 10%
  status: SubscriptionStatus;
  nextShipmentDate: string;
  lastPaymentDate?: string;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface ProductPricing {
  weight: '250g' | '500g' | '1kg';
  price: number;
  wholesaleCostPerKg?: number;
  retailPerKg?: number;
}

export interface Product {
  id: string;
  collection:
    | 'budget'
    | 'value'
    | 'selection'
    | 'premium'
    | 'prestige'
    | 'single_origin'
    | 'barrel_aged'
    | 'infused'
    | 'giftbox'
    | 'merchandise';
  name: string;
  tagline?: string;
  description: string;
  scaScore?: string;
  roastLevel?: string;
  blendComposition?: string[];
  flavorNotes: string[];
  bodyRating?: number; // 1-5
  acidityRating?: number; // 1-5
  sweetnessRating?: number; // 1-5
  availableGrinds: ('Volle bonen' | 'Espresso' | 'Filter')[];
  pricing: ProductPricing[];
  startingPrice: number;
  inStock: boolean;
  batchStatus?: 'Op voorraad (vers gebrand)' | 'In batch-planning';
  barrelDetails?: {
    barrelType: string;
    baseCoffee?: string;
    caskOrigin?: string;
  };
  suitableFor?: string[];
  imageUrl?: string;
}

export interface B2BInquiry {
  id: string;
  companyName: string;
  vatNumber?: string;
  contactPerson: string;
  email: string;
  phone: string;
  sector: string;
  machineNeed: string;
  questions?: string;
  submittedAt: string;
  status: 'Nieuw' | 'In behandeling' | 'Voorstel verzonden' | 'Gecontacteerd';
}

export interface EventInquiry {
  id: string;
  contactPerson: string;
  email: string;
  phone: string;
  eventType: string;
  formula?: string;
  location?: string;
  eventDate: string;
  guestCount: number;
  machineHire: string;
  baristaService: string;
  notes?: string;
  submittedAt: string;
  status: 'Nieuw' | 'Offerte opgesteld' | 'Bevestigd';
}

export interface Appointment {
  id: string;
  type?: string;
  service?: string;
  date: string;
  timeSlot?: string;
  time?: string;
  contactName?: string;
  name?: string;
  email: string;
  phone: string;
  numberOfGuests?: number;
  notes?: string;
  status: 'Aangevraagd' | 'Bevestigd' | 'Voltooid' | string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId?: string;
  category: 'Bestellingen & Leveringen' | 'Track & Trace' | 'Retouren & Terugbetalingen' | 'Klachten & Problemen' | 'Maalgraden & Zettechnieken' | 'Zakelijk & B2B' | 'Evenementen & Verhuur' | 'Onze Branderij & Kwaliteit' | 'Facturen & Betalingen' | 'Abonnementen' | 'Algemene Vraag';
  subject: string;
  email: string;
  orderNumber?: string;
  message: string;
  status: 'Open' | 'In Behandeling' | 'Opgelost';
  createdAt: string;
}

export interface ReturnRequest {
  id: string;
  orderNumber: string;
  customerEmail: string;
  reason: string;
  itemsToReturn: string;
  status: 'Aangevraagd' | 'Goedgekeurd' | 'Product Ontvangen' | 'Terugbetaling Uitgevoerd';
  mollieRefundId?: string;
  createdAt: string;
}
