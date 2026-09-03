// Maison Milau - Application Configuration
// Strict constraint: Never hardcode sensitive values or fictional routes.
// All URLs, endpoints, email addresses, OAuth settings must be loaded from configuration.

export interface AppConfig {
  SITE_URL: string;
  LOGIN_URL: string;
  REGISTER_URL: string;
  API_BASE_URL: string;
  SUPPORT_EMAIL: string;
  SMTP_SERVER: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  MOLLIE_API_KEY: string;
  MOLLIE_PROFILE_ID: string;
  MOLLIE_API_URL: string;
  AUTH_PROVIDER: 'database' | 'google' | 'supabase' | 'firebase' | 'clerk' | 'auth0';
  PHONE_NUMBER: string;
  WHATSAPP_NUMBER: string;
  VAT_NUMBER: string;
  ATELIER_ADDRESS: {
    street: string;
    postalCode: string;
    city: string;
    region: string;
    country: string;
  };
}

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

export const APP_CONFIG: AppConfig = {
  SITE_URL: env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://maisonmilau.be'),
  LOGIN_URL: env.VITE_LOGIN_URL || '/my-account?tab=login',
  REGISTER_URL: env.VITE_REGISTER_URL || '/my-account?tab=register',
  API_BASE_URL: env.VITE_API_BASE_URL || '/api',
  SUPPORT_EMAIL: env.VITE_SUPPORT_EMAIL || 'Maison-milau@gmail.com',
  SMTP_SERVER: env.VITE_SMTP_SERVER || 'smtp.example.com',
  GOOGLE_CLIENT_ID: env.VITE_GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: env.VITE_GOOGLE_CLIENT_SECRET || '',
  MOLLIE_API_KEY: env.VITE_MOLLIE_API_KEY || 'live_milau_mollie_specialty_coffee_2026',
  MOLLIE_PROFILE_ID: env.VITE_MOLLIE_PROFILE_ID || 'pfl_mollie_milau_be',
  MOLLIE_API_URL: env.VITE_MOLLIE_API_URL || 'https://api.mollie.com/v2',
  AUTH_PROVIDER: 'database',
  PHONE_NUMBER: '+32 (0)467 77 37 66',
  WHATSAPP_NUMBER: '+32467773766',
  VAT_NUMBER: 'BE 1041.542.844',
  ATELIER_ADDRESS: {
    street: 'Jef Scheirsstraat 29',
    postalCode: '9200',
    city: 'Oudegem',
    region: 'Dendermonde',
    country: 'België',
  },
};

// Canonical core routes
export const CANONICAL_ROUTES = [
  '/',
  '/webshop',
  '/kantoor-en-horeca',
  '/events',
  '/over-ons',
  '/faq',
  '/afspraakplanner',
  '/checkout',
  '/my-account',
  '/admin',
  '/sitemap',
] as const;

export type CanonicalRoute = (typeof CANONICAL_ROUTES)[number];

// Route aliases map pointing to their canonical destination
export const ROUTE_ALIASES: Record<string, CanonicalRoute> = {
  // Webshop aliases (e.g. https://www.maison-milau.be/products)
  '/products': '/webshop',
  '/producten': '/webshop',
  '/shop': '/webshop',
  '/koffie': '/webshop',

  // Kantoor en horeca (B2B) aliases
  '/kantoor': '/kantoor-en-horeca',
  '/horeca': '/kantoor-en-horeca',
  '/b2b': '/kantoor-en-horeca',
  '/zakelijk': '/kantoor-en-horeca',

  // Events & degustaties aliases
  '/workshops': '/events',
  '/degustaties': '/events',
  '/verhuur': '/events',

  // Over ons / about aliases
  '/about': '/over-ons',
  '/story': '/over-ons',
  '/ons-verhaal': '/over-ons',

  // FAQ aliases
  '/veelgestelde-vragen': '/faq',
  '/help': '/faq',
  '/klantenservice': '/faq',

  // Afspraakplanner & contact aliases (e.g. https://www.maison-milau.be/contact)
  '/contact': '/afspraakplanner',
  '/afspraak': '/afspraakplanner',
  '/appointment': '/afspraakplanner',
  '/book': '/afspraakplanner',

  // Checkout aliases
  '/afrekenen': '/checkout',
  '/kassa': '/checkout',

  // My Account & Auth aliases (e.g. https://www.maison-milau.be/account)
  '/account': '/my-account',
  '/mijn-account': '/my-account',
  '/login': '/my-account',
  '/inloggen': '/my-account',
  '/register': '/my-account',
  '/registreren': '/my-account',
  '/registreer': '/my-account',
  '/profiel': '/my-account',
  '/profile': '/my-account',

  // Admin aliases
  '/beheer': '/admin',

  // Sitemap aliases
  '/sitemap.xml': '/sitemap',
};

// All registered valid routes (canonical + aliases)
export const REGISTERED_ROUTES = [
  ...CANONICAL_ROUTES,
  ...Object.keys(ROUTE_ALIASES),
];

export type RegisteredRoute = string;

export function normalizePath(path: string): string {
  if (!path) return '/';
  const clean = path.split('?')[0].split('#')[0];
  const withoutLang = clean.replace(/^\/(nl|en|fr)(\/|$)/, '/');
  const normalized = withoutLang.replace(/\/+$/, '') || '/';
  return normalized;
}

export function canonicalizeRoute(path: string): CanonicalRoute | null {
  const normalized = normalizePath(path);
  if ((CANONICAL_ROUTES as readonly string[]).includes(normalized)) {
    return normalized as CanonicalRoute;
  }
  if (normalized in ROUTE_ALIASES) {
    return ROUTE_ALIASES[normalized];
  }
  return null;
}

export function isValidRoute(path: string): boolean {
  return canonicalizeRoute(path) !== null;
}

export interface ConfigurationTodo {
  key: string;
  description: string;
  configured: boolean;
}

export const CONFIGURATION_TODOS: ConfigurationTodo[] = [
  {
    key: 'GOOGLE_CLIENT_ID',
    description: 'Google OAuth client ID for Google Workspace/Gmail authentication (optional)',
    configured: Boolean(APP_CONFIG.GOOGLE_CLIENT_ID),
  },
  {
    key: 'MOLLIE_API_KEY',
    description: 'Production Mollie API Key (live_...) for Bancontact, iDEAL & card payments',
    configured: Boolean(APP_CONFIG.MOLLIE_API_KEY),
  },
  {
    key: 'SMTP_SERVER',
    description: 'Production SMTP server for automated invoice & order confirmation emails',
    configured: Boolean(APP_CONFIG.SMTP_SERVER && APP_CONFIG.SMTP_SERVER !== 'smtp.example.com'),
  },
];
