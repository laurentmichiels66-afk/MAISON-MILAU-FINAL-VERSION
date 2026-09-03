// Maison Milau - Client Database Store & State Management
// Handles persistence, B2C/B2B customer portal records, Mollie payments, subscriptions, and cart.

import { ALL_PRODUCTS } from '../data/products';
import { CONTENT_TRANSLATIONS, ContentTranslation } from '../data/translations';
import {
  User,
  Order,
  Invoice,
  Subscription,
  OrderItem,
  Address,
  B2BInquiry,
  EventInquiry,
  Appointment,
  SupportTicket,
  ReturnRequest,
  B2BCompanyProfile,
  RegisterPayload,
} from '../types/database';

const STORAGE_KEY = 'maison_milau_store_v1';

export interface CartItem {
  productId: string;
  productName: string;
  collection: string;
  grind: 'Volle bonen' | 'Espresso' | 'Filter';
  weight: '250g' | '500g' | '1kg';
  unitPrice: number;
  quantity: number;
}

export interface StoreState {
  isAuthenticated: boolean;
  currentUser: User;
  registeredUsers: User[];
  cart: CartItem[];
  orders: Order[];
  invoices: Invoice[];
  subscriptions: Subscription[];
  b2bInquiries: B2BInquiry[];
  eventInquiries: EventInquiry[];
  appointments: Appointment[];
  supportTickets: SupportTicket[];
  returnRequests: ReturnRequest[];
  translations: Record<string, ContentTranslation>;
}

const defaultAddresses: Address[] = [
  {
    id: 'addr-1',
    type: 'Thuis',
    recipientName: 'Laurent Michiels',
    street: 'Kerkstraat',
    number: '14',
    postalCode: '9200',
    city: 'Dendermonde',
    country: 'België',
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: 'addr-2',
    type: 'Werk',
    recipientName: 'Maison Milau B.V.',
    street: 'Koning Albertlaan',
    number: '88',
    postalCode: '9300',
    city: 'Aalst',
    country: 'België',
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
  {
    id: 'addr-b2b-1',
    type: 'Hoofdkantoor',
    recipientName: 'Milau Hospitality Belux',
    street: 'Leopold II Laan',
    number: '42',
    postalCode: '9200',
    city: 'Dendermonde',
    country: 'België',
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: 'addr-b2b-2',
    type: 'Magazijn',
    recipientName: 'Milau Logistics & Stock',
    street: 'Industriepark West',
    number: '12',
    postalCode: '9200',
    city: 'Oudegem',
    country: 'België',
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

const sampleCompanyProfile: B2BCompanyProfile = {
  companyName: 'Brasserie De Markt & Co BV',
  vatNumber: 'BE 0899.412.309',
  sector: 'Horeca / Restaurant / Café / Koffiebar',
  contactPerson: 'Laurent Michiels',
  phone: '+32 (0)467 77 37 66',
  email: 'laurent.michiels66@gmail.com',
  billingAddress: defaultAddresses[2],
  deliveryAddresses: [defaultAddresses[2], defaultAddresses[3]],
  approvedDiscountTier: 15,
  paymentTerms: '30_days',
  creditLimit: 3500,
  openBalance: 420.50,
  monthlyCoffeeVolumeKg: 25,
  erpIntegrationStatus: 'Connected (Accountable)',
  budgetAnnual: 12000,
  budgetSpent: 3840,
};

const defaultUser: User = {
  id: 'usr-milau-001',
  email: 'laurent.michiels66@gmail.com',
  name: 'Laurent Michiels',
  phoneNumber: '+32 (0)467 77 37 66',
  role: 'b2c', // can toggle to 'b2b' or 'admin'
  createdAt: '2026-01-15T09:00:00Z',
  addresses: defaultAddresses,
  wishlistProductIds: ['selection-espresso', 'ba-moscatel', 'so-chelbesa'],
  loyaltyPoints: 340,
  companyProfile: sampleCompanyProfile,
  subUsers: [
    { id: 'sub-1', name: 'Sophie Vandevelde', email: 'sophie@demarkt.be', role: 'Buyer', spendingLimit: 500 },
    { id: 'sub-2', name: 'Marc Janssens', email: 'marc@demarkt.be', role: 'Approver', spendingLimit: 2000 },
  ],
};

const initialOrders: Order[] = [
  {
    id: 'ord-2026-0089',
    orderNumber: 'MILAU-2026-0089',
    userId: 'usr-milau-001',
    customerName: 'Laurent Michiels',
    customerEmail: 'laurent.michiels66@gmail.com',
    isB2B: false,
    items: [
      {
        productId: 'selection-espresso',
        productName: 'Selection Espresso',
        collection: 'selection',
        grind: 'Volle bonen',
        weight: '1kg',
        unitPrice: 32.95,
        quantity: 1,
        subtotal: 32.95,
      },
      {
        productId: 'ba-moscatel',
        productName: 'Moscatel Barrel Aged',
        collection: 'barrel_aged',
        grind: 'Volle bonen',
        weight: '250g',
        unitPrice: 16.95,
        quantity: 1,
        subtotal: 16.95,
      },
    ],
    subtotal: 49.90,
    shippingFee: 0, // Free shipping > €45
    vatAmount: 2.82, // 6% on beans
    totalAmount: 49.90,
    status: 'Payment Successful',
    paymentMethod: 'Bancontact',
    molliePaymentId: 'tr_9823412mollie',
    molliePaymentUrl: 'https://www.mollie.com/payscreen/checkout/tr_9823412mollie',
    mollieQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwww.mollie.com%2Fpayscreen%2Fcheckout%2Ftr_9823412mollie',
    deliveryOption: 'bpost_delivery',
    shippingAddress: defaultAddresses[0],
    billingAddress: defaultAddresses[0],
    trackingNumber: '3232001928374981',
    trackingCarrier: 'bpost',
    invoiceId: 'inv-2026-0089',
    createdAt: '2026-08-28T14:22:00Z',
    estimatedDeliveryDate: '2026-09-02',
  },
  {
    id: 'ord-2026-0072',
    orderNumber: 'MILAU-2026-0072',
    userId: 'usr-milau-001',
    customerName: 'Brasserie De Markt & Co BV',
    customerEmail: 'laurent.michiels66@gmail.com',
    isB2B: true,
    companyName: 'Brasserie De Markt & Co BV',
    vatNumber: 'BE 0899.412.309',
    items: [
      {
        productId: 'value-espresso',
        productName: 'Value Espresso',
        collection: 'value',
        grind: 'Volle bonen',
        weight: '1kg',
        unitPrice: 19.51, // 15% B2B discount applied
        quantity: 15,
        subtotal: 292.65,
      },
    ],
    subtotal: 292.65,
    shippingFee: 0,
    vatAmount: 17.56,
    totalAmount: 310.21,
    status: 'Payment Successful',
    paymentMethod: 'Invoice (B2B 30 dagen)',
    molliePaymentId: 'tr_184920b2bmollie',
    molliePaymentUrl: 'https://www.mollie.com/payscreen/checkout/tr_184920b2bmollie',
    mollieQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwww.mollie.com%2Fpayscreen%2Fcheckout%2Ftr_184920b2bmollie',
    deliveryOption: 'pickup_atelier_oudegem',
    shippingAddress: defaultAddresses[2],
    billingAddress: defaultAddresses[2],
    trackingNumber: 'MILAU-DIRECT-PICKUP',
    trackingCarrier: 'milau_direct',
    invoiceId: 'inv-2026-0072',
    createdAt: '2026-08-14T10:15:00Z',
    estimatedDeliveryDate: '2026-08-16',
  },
];

const initialInvoices: Invoice[] = [
  {
    id: 'inv-2026-0089',
    invoiceNumber: 'FACT-2026-0089',
    orderId: 'ord-2026-0089',
    userId: 'usr-milau-001',
    issueDate: '2026-08-28',
    dueDate: '2026-08-28',
    subtotal: 47.08,
    vat6Percent: 2.82,
    vat21Percent: 0,
    totalAmount: 49.90,
    status: 'Paid',
    molliePaymentUrl: 'https://www.mollie.com/payscreen/checkout/tr_9823412mollie',
    mollieQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwww.mollie.com%2Fpayscreen%2Fcheckout%2Ftr_9823412mollie',
    paidAt: '2026-08-28T14:23:10Z',
    pdfUrl: '#download-pdf-fact-2026-0089',
  },
  {
    id: 'inv-2026-0072',
    invoiceNumber: 'FACT-2026-0072',
    orderId: 'ord-2026-0072',
    userId: 'usr-milau-001',
    companyName: 'Brasserie De Markt & Co BV',
    vatNumber: 'BE 0899.412.309',
    issueDate: '2026-08-14',
    dueDate: '2026-09-13',
    subtotal: 292.65,
    vat6Percent: 17.56,
    vat21Percent: 0,
    totalAmount: 310.21,
    status: 'Paid',
    molliePaymentUrl: 'https://www.mollie.com/payscreen/checkout/tr_184920b2bmollie',
    mollieQrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwww.mollie.com%2Fpayscreen%2Fcheckout%2Ftr_184920b2bmollie',
    paidAt: '2026-08-20T11:05:00Z',
    pdfUrl: '#download-pdf-fact-2026-0072',
  },
];

const initialSubscriptions: Subscription[] = [
  {
    id: 'sub-milau-101',
    userId: 'usr-milau-001',
    customerName: 'Laurent Michiels',
    customerEmail: 'laurent.michiels66@gmail.com',
    planType: 'Vast maandelijks',
    coffeeId: 'selection-espresso',
    coffeeName: 'Selection Espresso',
    grind: 'Volle bonen',
    frequency: '4_weeks',
    weight: '1kg',
    quantity: 1,
    pricePerShipment: 29.66, // 32.95 - 10%
    discountApplied: 10,
    status: 'active',
    nextShipmentDate: '2026-09-25',
    lastPaymentDate: '2026-08-28',
    shippingAddress: defaultAddresses[0],
    paymentMethod: 'Bancontact',
    createdAt: '2026-07-28T10:00:00Z',
  },
];

const initialSupportTickets: SupportTicket[] = [
  {
    id: 'tkt-8821',
    userId: 'usr-milau-001',
    category: 'Maalgraden & Zettechnieken',
    subject: 'Aanbevolen maalgraad voor Sage Barista Touch met Selection Espresso',
    email: 'laurent.michiels66@gmail.com',
    message: 'Goedemiddag, welke maalgraad bevelen jullie aan voor de Selection Espresso op een Sage pistonmachine?',
    status: 'Opgelost',
    createdAt: '2026-08-29T16:00:00Z',
  },
];

function loadInitialState(): StoreState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        isAuthenticated: typeof parsed.isAuthenticated === 'boolean' ? parsed.isAuthenticated : false,
        currentUser: parsed.currentUser || defaultUser,
        registeredUsers: parsed.registeredUsers && parsed.registeredUsers.length ? parsed.registeredUsers : [defaultUser],
        cart: parsed.cart || [],
        orders: parsed.orders || initialOrders,
        invoices: parsed.invoices || initialInvoices,
        subscriptions: parsed.subscriptions || initialSubscriptions,
        b2bInquiries: parsed.b2bInquiries || [],
        eventInquiries: parsed.eventInquiries || [],
        appointments: parsed.appointments || [],
        supportTickets: parsed.supportTickets || initialSupportTickets,
        returnRequests: parsed.returnRequests || [],
        translations: { ...CONTENT_TRANSLATIONS, ...parsed.translations },
      };
    }
  } catch (err) {
    console.warn('Could not read store from localStorage:', err);
  }
  return {
    isAuthenticated: false, // Default requires sign-in or registration before entering private portal
    currentUser: defaultUser,
    registeredUsers: [defaultUser],
    cart: [],
    orders: initialOrders,
    invoices: initialInvoices,
    subscriptions: initialSubscriptions,
    b2bInquiries: [],
    eventInquiries: [],
    appointments: [],
    supportTickets: initialSupportTickets,
    returnRequests: [],
    translations: CONTENT_TRANSLATIONS,
  };
}

let state: StoreState = loadInitialState();
const listeners = new Set<() => void>();

function persistAndNotify() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Could not write store to localStorage:', err);
  }
  listeners.forEach((listener) => listener());
}

export const store = {
  getState(): StoreState {
    return state;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // Authentication & Registration
  isAuthenticated(): boolean {
    return state.isAuthenticated;
  },

  registerUser(payload: RegisterPayload): { success: boolean; error?: string; user?: User } {
    if (!payload.name?.trim() || !payload.email?.trim()) {
      return { success: false, error: 'Vul alstublieft uw naam en een geldig e-mailadres in.' };
    }

    const emailClean = payload.email.trim().toLowerCase();
    const existing = state.registeredUsers.find(
      (u) => u.email.toLowerCase() === emailClean
    );
    if (existing) {
      return { success: false, error: 'Er bestaat al een Maison Milau account met dit e-mailadres. Gelieve in te loggen.' };
    }

    const newAddress: Address = {
      id: `addr-${Date.now()}`,
      type: payload.role === 'b2b' ? 'Werk' : 'Thuis',
      recipientName: payload.name.trim(),
      street: payload.address.street?.trim() || 'Jef Scheirsstraat 29',
      postalCode: payload.address.postalCode?.trim() || '9200',
      city: payload.address.city?.trim() || 'Oudegem',
      country: payload.address.country?.trim() || 'België',
      isDefaultShipping: true,
      isDefaultBilling: true,
    };

    let companyProfile: B2BCompanyProfile | undefined;
    if (payload.role === 'b2b') {
      companyProfile = {
        companyName: payload.companyName?.trim() || payload.name.trim(),
        vatNumber: payload.vatNumber?.trim() || 'BE 1041.542.844',
        sector: (payload.sector as any) || 'Kantoor / Bedrijfsruimte',
        contactPerson: payload.name.trim(),
        phone: payload.phone?.trim() || '+32 (0)467 77 37 66',
        email: emailClean,
        billingAddress: newAddress,
        deliveryAddresses: [newAddress],
        approvedDiscountTier: 15,
        paymentTerms: '30_days',
        creditLimit: 2500,
        openBalance: 0,
        monthlyCoffeeVolumeKg: 10,
        erpIntegrationStatus: 'Connected (Accountable)',
        budgetAnnual: 5000,
        budgetSpent: 0,
      };
    }

    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: payload.name.trim(),
      email: emailClean,
      phone: payload.phone?.trim() || '',
      phoneNumber: payload.phone?.trim() || '',
      password: payload.password,
      role: payload.role,
      companyName: payload.companyName?.trim(),
      vatNumber: payload.vatNumber?.trim(),
      createdAt: new Date().toISOString(),
      addresses: [newAddress],
      wishlistProductIds: [],
      loyaltyPoints: 50, // Welcome gift points
      companyProfile,
    };

    state = {
      ...state,
      registeredUsers: [...state.registeredUsers, newUser],
      currentUser: newUser,
      isAuthenticated: true,
    };
    persistAndNotify();
    return { success: true, user: newUser };
  },

  loginUser(email: string, password?: string): { success: boolean; error?: string; user?: User } {
    const cleanEmail = email.trim().toLowerCase();
    const user = state.registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail
    );

    if (!user) {
      // Fallback for default demo user
      if (cleanEmail === defaultUser.email.toLowerCase()) {
        state = {
          ...state,
          currentUser: defaultUser,
          isAuthenticated: true,
        };
        persistAndNotify();
        return { success: true, user: defaultUser };
      }
      return { success: false, error: 'Geen account gevonden voor dit e-mailadres. Maak hieronder een nieuw account aan.' };
    }

    if (password && user.password && user.password !== password) {
      return { success: false, error: 'Onjuist wachtwoord. Controleer uw invoer en probeer opnieuw.' };
    }

    state = {
      ...state,
      currentUser: user,
      isAuthenticated: true,
    };
    persistAndNotify();
    return { success: true, user };
  },

  loginDemoUser(role: 'b2c' | 'b2b' | 'admin' = 'b2c'): void {
    const demo = { ...defaultUser, role };
    state = {
      ...state,
      currentUser: demo,
      isAuthenticated: true,
    };
    persistAndNotify();
  },

  logout(): void {
    state = {
      ...state,
      isAuthenticated: false,
    };
    persistAndNotify();
  },

  // User & Roles
  setUserRole(role: 'b2c' | 'b2b' | 'admin') {
    state = {
      ...state,
      currentUser: { ...state.currentUser, role },
    };
    persistAndNotify();
  },

  updateProfile(updates: Partial<User>) {
    state = {
      ...state,
      currentUser: { ...state.currentUser, ...updates },
    };
    persistAndNotify();
  },

  updateB2BProfile(updates: Partial<B2BCompanyProfile>) {
    if (!state.currentUser.companyProfile) return;
    state = {
      ...state,
      currentUser: {
        ...state.currentUser,
        companyProfile: { ...state.currentUser.companyProfile, ...updates },
      },
    };
    persistAndNotify();
  },

  addAddress(address: Omit<Address, 'id'>) {
    const newAddr: Address = { ...address, id: `addr-${Date.now()}` };
    state = {
      ...state,
      currentUser: {
        ...state.currentUser,
        addresses: [...state.currentUser.addresses, newAddr],
      },
    };
    persistAndNotify();
  },

  // Cart
  addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1) {
    const existingIndex = state.cart.findIndex(
      (c) => c.productId === item.productId && c.grind === item.grind && c.weight === item.weight
    );
    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...state.cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...state.cart, { ...item, quantity }];
    }
    state = { ...state, cart: updatedCart };
    persistAndNotify();
  },

  updateCartQuantity(index: number, quantity: number) {
    let updatedCart: CartItem[];
    if (quantity <= 0) {
      updatedCart = state.cart.filter((_, i) => i !== index);
    } else {
      updatedCart = [...state.cart];
      updatedCart[index].quantity = quantity;
    }
    state = { ...state, cart: updatedCart };
    persistAndNotify();
  },

  clearCart() {
    state = { ...state, cart: [] };
    persistAndNotify();
  },

  // Orders & Mollie Checkout
  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
    const orderNumber = `MILAU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const id = `ord-${Date.now()}`;
    const invoiceId = `inv-${Date.now()}`;
    const molliePaymentId = `tr_${Math.random().toString(36).substring(2, 12)}`;
    const molliePaymentUrl = `https://www.mollie.com/payscreen/checkout/${molliePaymentId}`;
    const mollieQrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(molliePaymentUrl)}`;
    
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      invoiceId,
      molliePaymentId,
      molliePaymentUrl,
      mollieQrCode,
      createdAt: new Date().toISOString(),
    };

    // Also generate matching invoice
    const newInvoice: Invoice = {
      id: invoiceId,
      invoiceNumber: `FACT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: id,
      userId: newOrder.userId,
      companyName: newOrder.companyName,
      vatNumber: newOrder.vatNumber,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: newOrder.paymentMethod.includes('30') ? new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      subtotal: newOrder.subtotal,
      vat6Percent: Number((newOrder.subtotal * 0.06).toFixed(2)),
      vat21Percent: Number((newOrder.shippingFee * 0.21).toFixed(2)),
      totalAmount: newOrder.totalAmount,
      status: newOrder.status === 'Payment Successful' ? 'Paid' : 'Open',
      molliePaymentUrl: newOrder.molliePaymentUrl || '',
      mollieQrCode: newOrder.mollieQrCode || '',
      pdfUrl: `#download-pdf-${newOrder.orderNumber}`,
      paidAt: newOrder.status === 'Payment Successful' ? new Date().toISOString() : undefined,
    };

    state = {
      ...state,
      orders: [newOrder, ...state.orders],
      invoices: [newInvoice, ...state.invoices],
      cart: [],
    };
    persistAndNotify();
    return newOrder;
  },

  updateOrderStatus(orderId: string, status: Order['status']) {
    state = {
      ...state,
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
      invoices: state.invoices.map((inv) => (inv.orderId === orderId ? { ...inv, status: status === 'Payment Successful' ? 'Paid' : inv.status } : inv)),
    };
    persistAndNotify();
  },

  addOrder(order: Order) {
    state = {
      ...state,
      orders: [order, ...state.orders],
      cart: [],
    };
    persistAndNotify();
    return order;
  },

  // Subscriptions
  addSubscription(sub: Omit<Subscription, 'id' | 'createdAt'>): Subscription {
    const newSub: Subscription = {
      ...sub,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    state = {
      ...state,
      subscriptions: [newSub, ...state.subscriptions],
    };
    persistAndNotify();
    return newSub;
  },

  updateSubscription(id: string, updates: Partial<Subscription>) {
    state = {
      ...state,
      subscriptions: state.subscriptions.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    };
    persistAndNotify();
  },

  updateSubscriptionStatus(id: string, status: Subscription['status']) {
    this.updateSubscription(id, { status });
  },

  // Wishlist
  toggleWishlist(productId: string) {
    const list = state.currentUser.wishlistProductIds || [];
    const exists = list.includes(productId);
    const updated = exists ? list.filter((id) => id !== productId) : [...list, productId];
    state = {
      ...state,
      currentUser: { ...state.currentUser, wishlistProductIds: updated },
    };
    persistAndNotify();
  },

  // Inquiries & Appointments
  submitB2BInquiry(inquiry: Omit<B2BInquiry, 'id' | 'submittedAt' | 'status'>): B2BInquiry {
    const newInquiry: B2BInquiry = {
      ...inquiry,
      id: `b2b-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'Nieuw',
    };
    state = {
      ...state,
      b2bInquiries: [newInquiry, ...state.b2bInquiries],
    };
    persistAndNotify();
    return newInquiry;
  },

  submitEventInquiry(inquiry: Omit<EventInquiry, 'id' | 'submittedAt' | 'status'>): EventInquiry {
    const newInquiry: EventInquiry = {
      ...inquiry,
      id: `ev-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      status: 'Nieuw',
    };
    state = {
      ...state,
      eventInquiries: [newInquiry, ...state.eventInquiries],
    };
    persistAndNotify();
    return newInquiry;
  },

  submitAppointment(appt: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Appointment {
    const newAppt: Appointment = {
      ...appt,
      id: `apt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Aangevraagd',
    };
    state = {
      ...state,
      appointments: [newAppt, ...state.appointments],
    };
    persistAndNotify();
    return newAppt;
  },

  submitSupportTicket(ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>): SupportTicket {
    const newTicket: SupportTicket = {
      ...ticket,
      id: `tkt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Open',
    };
    state = {
      ...state,
      supportTickets: [newTicket, ...state.supportTickets],
    };
    persistAndNotify();
    return newTicket;
  },

  submitReturnRequest(req: Omit<ReturnRequest, 'id' | 'createdAt' | 'status'>): ReturnRequest {
    const newReq: ReturnRequest = {
      ...req,
      id: `ret-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Aangevraagd',
    };
    state = {
      ...state,
      returnRequests: [newReq, ...state.returnRequests],
    };
    persistAndNotify();
    return newReq;
  },

  // Admin CMS
  updateTranslation(contentId: string, lang: 'nl' | 'en' | 'fr', field: string, value: string) {
    const current = state.translations[contentId];
    if (!current) return;
    const updated = {
      ...current,
      [lang]: {
        ...current[lang],
        [field]: value,
      },
    };
    state = {
      ...state,
      translations: {
        ...state.translations,
        [contentId]: updated,
      },
    };
    persistAndNotify();
  },
};
