// Sitemap, Page Routes, Database Entities & Navigation Menus
// Generated directly according to approved specifications.

export interface SitemapNode {
  title: string;
  route: string;
  description: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  priority: number;
  subpages?: SitemapNode[];
}

// STEP 1: Complete Sitemap
export const APPROVED_SITEMAP: SitemapNode[] = [
  {
    title: 'Home',
    route: '/',
    description: 'Ambachtelijke Koffiebranderij · Oudegem (Dendermonde). Specialty koffie, kantoor- & horeca-oplossingen en machine-verhuur.',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    title: 'Webshop',
    route: '/webshop',
    description: 'Onze Koffies, Maison Milau Specialty Blends, Barrel Aged, Infused, Giftboxen, Toebehoren & Abonnementen.',
    changefreq: 'daily',
    priority: 0.9,
    subpages: [
      { title: 'Milau Budget Collection', route: '/webshop?collection=budget', description: 'Toegankelijke espresso-, filter- en dagelijkse koffies vanaf €5,25', changefreq: 'weekly', priority: 0.8 },
      { title: 'Milau Value Collection', route: '/webshop?collection=value', description: 'Ideale brug naar specialty coffee vanaf €5,95', changefreq: 'weekly', priority: 0.8 },
      { title: 'Milau Selection Collection', route: '/webshop?collection=selection', description: 'Het hart van ons specialty assortiment (SCA 86-87+) vanaf €8,50', changefreq: 'weekly', priority: 0.8 },
      { title: 'Milau Premium Collection', route: '/webshop?collection=premium', description: 'Specialty bonen SCA 87-89 vanaf €10,95', changefreq: 'weekly', priority: 0.8 },
      { title: 'Milau Prestige Collection', route: '/webshop?collection=prestige', description: 'Vlaggenschip microlots & Gesha SCA 88-90+ vanaf €11,95', changefreq: 'weekly', priority: 0.8 },
      { title: 'Single Origins', route: '/webshop?collection=single_origin', description: 'Chelbesa, Kenya AA, Orange Bourbon, Gesha Betulia', changefreq: 'weekly', priority: 0.8 },
      { title: 'Barrel Aged Coffees', route: '/webshop?collection=barrel_aged', description: 'Rijping in Moscatel, Pedro Ximénez Sherry & Buffalo Trace Bourbon vaten', changefreq: 'weekly', priority: 0.8 },
      { title: 'Infused Coffees', route: '/webshop?collection=infused', description: 'Natuurlijke infusies: Vanilla, Cinnamon, Almond', changefreq: 'weekly', priority: 0.8 },
      { title: 'Giftboxen & Proefpakketten', route: '/webshop?collection=giftbox', description: 'Duo, Trio en Quattro luxe geschenkdozen', changefreq: 'monthly', priority: 0.7 },
      { title: 'Koffie Toebehoren & Merchandise', route: '/webshop?collection=merchandise', description: 'Keramische mokken, espresso- en cappuccinokopjes, cold brew glazen, T-shirts', changefreq: 'monthly', priority: 0.7 },
      { title: 'Koffie-abonnementen', route: '/webshop?collection=subscriptions', description: 'Flexibele levering elke 2, 4 of 6 weken met 10% korting', changefreq: 'weekly', priority: 0.8 },
      { title: 'Promoties', route: '/webshop?collection=promoties', description: 'Actuele aanbiedingen en kortingen', changefreq: 'weekly', priority: 0.7 },
    ],
  },
  {
    title: 'Kantoor en Horeca',
    route: '/kantoor-en-horeca',
    description: 'B2B Oplossingen, volumekorting staffels, interactieve B2B kantoorcalculator, gratis proefpakket & cupping, machineformules & white label.',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    title: 'Events en Verhuur',
    route: '/events',
    description: 'Koffiecatering & apparatuur, verse bonen, dry-hire espressomachines, mobiele SCA barista-bars & event calculator.',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    title: 'Over ons',
    route: '/over-ons',
    description: 'Branderij en Ambacht, ons familieverhaal, lokale markten (Dendermonde, Wetteren, Aalst) & bezoek atelier Oudegem.',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    title: 'FAQ',
    route: '/faq',
    description: 'Klantenservice, leveringstermijnen, maalgraden, B2B support, track & trace, retouren en help center.',
    changefreq: 'weekly',
    priority: 0.7,
  },
  {
    title: 'Afspraakplanner',
    route: '/afspraakplanner',
    description: 'Plan een bezoek, cuppingsessie of private label consultatie in ons branderij-atelier te Oudegem.',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    title: 'Checkout & Mollie Betalingen',
    route: '/checkout',
    description: 'Veilige kassa via Mollie (Bancontact, iDEAL, Visa, Mastercard, Apple Pay, Wero, Cartes Bancaires) en factuurverwerking.',
    changefreq: 'always',
    priority: 0.6,
  },
  {
    title: 'My Account / Mijn Account',
    route: '/my-account',
    description: 'Klant- & ERP-portaal voor particulieren (B2C) en ondernemingen (B2B): bestellingen, facturen, abonnementen, adressen, offertes & analytics.',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    title: 'Beheerdersportaal (Admin)',
    route: '/admin',
    description: 'Verkoopdashboard, omzetrapporten, Mollie transacties, abonnementsbeheer, B2B leads en meertalig CMS (alleen voor webbeheerder).',
    changefreq: 'daily',
    priority: 0.5,
  },
  {
    title: 'Sitemap & Systeemspecificaties',
    route: '/sitemap',
    description: 'Volledig overzicht van pagina-routes, database-entiteiten en configuratietoetsen.',
    changefreq: 'monthly',
    priority: 0.4,
  },
];

// STEP 2: Page Routes Definition
export interface PageRouteDefinition {
  id: string;
  path: string;
  component: string;
  title: string;
  requiresAuth: boolean;
  allowedRoles?: ('b2c' | 'b2b' | 'admin')[];
  description: string;
}

export const APPROVED_PAGE_ROUTES: PageRouteDefinition[] = [
  { id: 'home', path: '/', component: 'HomePage', title: 'Home · Maison Milau', requiresAuth: false, description: 'Homepage met light colors, beloften en hoofddiensten' },
  { id: 'webshop', path: '/webshop', component: 'WebshopPage', title: 'Webshop · Koffie Collecties', requiresAuth: false, description: 'Artisanale catalogus met 8 collecties, merchandise, giftboxen & abonnementen' },
  { id: 'kantoor-horeca', path: '/kantoor-en-horeca', component: 'KantoorHorecaPage', title: 'Kantoor en Horeca · B2B Oplossingen', requiresAuth: false, description: 'B2B volumekortingen, kantoorcalculator, gratis proefpakket & white label' },
  { id: 'events', path: '/events', component: 'EventsPage', title: 'Events & Verhuur · Koffiecatering', requiresAuth: false, description: 'Event calculator, dry-hire machinehuur & full-service barista-bar' },
  { id: 'over-ons', path: '/over-ons', component: 'OverOnsPage', title: 'Over ons · Branderij & Verhaal', requiresAuth: false, description: 'Micro-roastery Oudegem, ons familieverhaal, wekelijkse markten' },
  { id: 'faq', path: '/faq', component: 'FaqPage', title: 'FAQ · Klantenservice', requiresAuth: false, description: 'Veelgestelde vragen, track & trace, retourportaal & contact' },
  { id: 'afspraakplanner', path: '/afspraakplanner', component: 'AppointmentPage', title: 'Afspraakplanner · Atelier Oudegem', requiresAuth: false, description: 'Boek cuppingsessie of branderijbezoek' },
  { id: 'checkout', path: '/checkout', component: 'CheckoutPage', title: 'Winkelwagen & Checkout · Mollie', requiresAuth: false, description: 'Veilige betaling via Mollie payment provider met Bancontact, iDEAL, QR & kaarten' },
  { id: 'my-account', path: '/my-account', component: 'MyAccountPage', title: 'Mijn Account · Customer Portal', requiresAuth: false, description: 'B2C & B2B customer portal & ERP' },
  { id: 'admin', path: '/admin', component: 'AdminPage', title: 'Beheer · Webbeheerder ERP & Analytics', requiresAuth: true, allowedRoles: ['admin'], description: 'Sales metrics, orders, subscriptions, translations' },
  { id: 'sitemap-view', path: '/sitemap', component: 'SitemapPage', title: 'Sitemap & Systeemspecificatie', requiresAuth: false, description: 'Architectuur- en sitemapdocumentatie' },
];

// STEP 4: Navigation Menus
export interface MenuItem {
  title: string;
  route: string;
  subitems?: { title: string; route: string }[];
}

export const HAMBURGER_MENU: MenuItem[] = [
  { title: 'My Account', route: '/my-account' },
  {
    title: 'Webshop',
    route: '/webshop',
    subitems: [
      { title: 'Maison Milau Speciality Blends', route: '/webshop?collection=specialty' },
      { title: 'Barrel Aged Coffees', route: '/webshop?collection=barrel_aged' },
      { title: 'Infused Coffees', route: '/webshop?collection=infused' },
      { title: 'Giftboxen & Proefpakketten', route: '/webshop?collection=giftbox' },
      { title: 'Koffie Toebehoren & Merchandise', route: '/webshop?collection=merchandise' },
      { title: 'Koffie-abonnementen (-10%)', route: '/webshop?collection=subscriptions' },
      { title: 'Promoties', route: '/webshop?collection=promoties' },
    ],
  },
  { title: 'Kantoor en Horeca', route: '/kantoor-en-horeca' },
  { title: 'Events', route: '/events' },
  { title: 'FAQ', route: '/faq' },
  { title: 'Over ons', route: '/over-ons' },
];

export const FOOTER_SITEMAP_LINKS = [
  { title: 'Mijn Account', route: '/my-account' },
  { title: 'Webshop', route: '/webshop' },
  { title: 'Kantoor & Horeca', route: '/kantoor-en-horeca' },
  { title: 'Event Planner', route: '/events' },
  { title: 'FAQ', route: '/faq' },
  { title: 'Afspraakplanner', route: '/afspraakplanner' },
];

export const SITEMAP_PAGES = APPROVED_PAGE_ROUTES;
export const FOOTER_MENU = FOOTER_SITEMAP_LINKS;

