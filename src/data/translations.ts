// Multilingual Content Store (NL default, EN, FR)
// Stored database translations, editable via Admin CMS, never generated on page load.

export type SupportedLanguage = 'nl' | 'en' | 'fr';

export interface ContentTranslation {
  id: string;
  nl: {
    title: string;
    subtitle?: string;
    shortDesc?: string;
    longDesc?: string;
    seoTitle: string;
    seoDesc: string;
    slug: string;
  };
  en: {
    title: string;
    subtitle?: string;
    shortDesc?: string;
    longDesc?: string;
    seoTitle: string;
    seoDesc: string;
    slug: string;
  };
  fr: {
    title: string;
    subtitle?: string;
    shortDesc?: string;
    longDesc?: string;
    seoTitle: string;
    seoDesc: string;
    slug: string;
  };
  status: 'published' | 'draft';
}

export const CONTENT_TRANSLATIONS: Record<string, ContentTranslation> = {
  home: {
    id: 'home',
    status: 'published',
    nl: {
      title: 'Ambachtelijke Koffiebranderij · Oudegem (Dendermonde)',
      subtitle: 'Maison Milau Artisanale koffiebranderij .',
      shortDesc: 'Ambachtelijk gebrande specialty koffies voor elke gelegenheid.',
      longDesc: 'Ambachtelijk gebrande specialty koffies voor elke gelegenheid. Bij jou thuis, voor op kantoor, in je horecazaak of exclusieve koffiecatering vour jouw tuinfeest.',
      seoTitle: 'Maison Milau · Ambachtelijke Koffiebranderij Oudegem (Dendermonde)',
      seoDesc: 'Artisanale micro-roastery in Oudegem (Dendermonde). Met zorg en passie gebrande specialty koffies, kantoor- en horeca-oplossingen en machine-verhuur voor evenementen.',
      slug: '',
    },
    en: {
      title: 'Artisanal Coffee Roastery · Oudegem (Dendermonde)',
      subtitle: 'Maison Milau Artisanal Coffee Roastery.',
      shortDesc: 'Handcrafted specialty coffees for every occasion.',
      longDesc: 'Craft roasted specialty coffees for every occasion. At your home, for your office, in your hospitality venue, or exclusive coffee catering for your garden party.',
      seoTitle: 'Maison Milau · Artisanal Coffee Roastery Oudegem (Dendermonde)',
      seoDesc: 'Artisanal micro-roastery in Oudegem (Dendermonde). Specialty coffees roasted with care and passion, office and hospitality solutions, and machine rentals.',
      slug: 'en',
    },
    fr: {
      title: 'Brûlerie Artisanale de Café · Oudegem (Termonde)',
      subtitle: 'Maison Milau Brûlerie artisanale de café.',
      shortDesc: 'Cafés de spécialité torréfiés artisanalement pour chaque occasion.',
      longDesc: 'Cafés de spécialité torréfiés avec soin pour chaque occasion. À la maison, au bureau, dans votre établissement horeca ou service traiteur café exclusif pour votre fête de jardin.',
      seoTitle: 'Maison Milau · Brûlerie Artisanale Oudegem (Termonde)',
      seoDesc: 'Micro-brûlerie artisanale à Oudegem (Termonde). Cafés de spécialité torréfiés avec passion, solutions pour bureaux et horeca, location de machines pour événements.',
      slug: 'fr',
    },
  },
  webshop: {
    id: 'webshop',
    status: 'published',
    nl: {
      title: 'Onze Koffies · Webshop',
      subtitle: 'Maison Milau Collecties',
      shortDesc: 'Ontdek onze ambachtelijke blends, barrel aged en single origins.',
      longDesc: 'Van de budgetvriendelijke dagelijkse boon tot zeldzame Gesha microlots en vaten-gerijpte specialiteiten.',
      seoTitle: 'Webshop Specialty Koffiebonen · Maison Milau',
      seoDesc: 'Bestel vers gebrande specialty koffiebonen uit Oudegem. Levering binnen 2 weken na branding.',
      slug: 'webshop',
    },
    en: {
      title: 'Our Coffees · Webshop',
      subtitle: 'Maison Milau Collections',
      shortDesc: 'Discover our artisan blends, barrel aged, and single origins.',
      longDesc: 'From accessible daily beans to rare Gesha microlots and oak barrel aged specialties.',
      seoTitle: 'Webshop Specialty Coffee Beans · Maison Milau',
      seoDesc: 'Order freshly roasted specialty coffee beans from Oudegem. Shipped within 2 weeks of roasting.',
      slug: 'en/webshop',
    },
    fr: {
      title: 'Nos Cafés · Boutique en Ligne',
      subtitle: 'Collections Maison Milau',
      shortDesc: 'Découvrez nos mélanges artisanaux, vieillis en fûts et origines pures.',
      longDesc: 'Des cafés accessibles du quotidien aux microlots rares de Gesha et spécialités vieillies en fûts de chêne.',
      seoTitle: 'Boutique en Ligne Café de Spécialité · Maison Milau',
      seoDesc: 'Commandez des grains de café de spécialité fraîchement torréfiés à Oudegem.',
      slug: 'fr/webshop',
    },
  },
  kantoor: {
    id: 'kantoor',
    status: 'published',
    nl: {
      title: 'Kantoor en Horeca',
      subtitle: 'Formules & Tarieven op Maat',
      shortDesc: 'B2B Oplossingen, volumekortingen en custom roasting.',
      longDesc: 'Koffieformules voor Thuis & Onderneming. Flexibele maandabonnementen, aantrekkelijke volumetarieven en unieke custom roasting & white label branding.',
      seoTitle: 'Kantoor & Horeca Specialty Koffie · Maison Milau',
      seoDesc: 'B2B koffieoplossingen, volumekortingen, kantoorcalculators en espressomachine-formules.',
      slug: 'kantoor-en-horeca',
    },
    en: {
      title: 'Office & Hospitality',
      subtitle: 'Tailored Formulas & Rates',
      shortDesc: 'B2B solutions, volume discounts and custom roasting.',
      longDesc: 'Coffee formulas for home and enterprise. Flexible monthly subscriptions, attractive tiered pricing and custom white-label roasting.',
      seoTitle: 'Office & Hospitality Specialty Coffee · Maison Milau',
      seoDesc: 'B2B coffee solutions, tiered volume pricing, interactive office calculators and equipment leasing.',
      slug: 'en/kantoor-en-horeca',
    },
    fr: {
      title: 'Bureaux et Horeca',
      subtitle: 'Formules et Tarifs sur Mesure',
      shortDesc: 'Solutions B2B, remises sur volume et torréfaction personnalisée.',
      longDesc: 'Formules café pour la maison et les entreprises. Abonnements mensuels flexibles, tarifs dégressifs et torréfaction en marque blanche.',
      seoTitle: 'Café de Spécialité Bureaux & Horeca · Maison Milau',
      seoDesc: 'Solutions café B2B, remises sur volume, calculateur de bureau et formules machines.',
      slug: 'fr/kantoor-en-horeca',
    },
  },
  events: {
    id: 'events',
    status: 'published',
    nl: {
      title: 'Events & Verhuur',
      subtitle: 'Koffiecatering & Apparatuur',
      shortDesc: 'Bestel koffiebonen met/zonder machine voor je event.',
      longDesc: 'Geef uw gasten een onvergetelijke koffie-ervaring. Van compacte espressomachines voor een intiem tuinfeest of trouwfeest tot complete mobiele barista-bars voor grote beurzen en congressen.',
      seoTitle: 'Events & Verhuur Koffiecatering · Maison Milau',
      seoDesc: 'Koffiecatering, mobiele barista bars en machineverhuur voor feesten, bruiloften en beurzen.',
      slug: 'events',
    },
    en: {
      title: 'Events & Rentals',
      subtitle: 'Coffee Catering & Equipment',
      shortDesc: 'Order coffee beans with or without machines for your event.',
      longDesc: 'Give your guests an unforgettable coffee experience. From compact machines for intimate garden parties to complete mobile barista bars.',
      seoTitle: 'Events & Coffee Catering Rentals · Maison Milau',
      seoDesc: 'Coffee catering, mobile barista bars, and equipment rentals for weddings, private parties, and corporate events.',
      slug: 'en/events',
    },
    fr: {
      title: 'Événements et Location',
      subtitle: 'Service Traiteur Café et Équipements',
      shortDesc: 'Commandez des grains de café avec ou sans machine pour vos événements.',
      longDesc: 'Offrez à vos invités une expérience café inoubliable. Des machines compactes pour fêtes de jardin aux bars à barista mobiles complets.',
      seoTitle: 'Service Traiteur Café & Location · Maison Milau',
      seoDesc: 'Traiteur café, bars mobiles avec barista SCA et location de machines pour mariages et réceptions.',
      slug: 'fr/events',
    },
  },
  overons: {
    id: 'overons',
    status: 'published',
    nl: {
      title: 'Over Ons',
      subtitle: 'Branderij en Ambacht',
      shortDesc: 'Micro-roastery in Oudegem (Dendermonde).',
      longDesc: 'Ambachtelijk Roasten in kleine batches met constante curvecontrole. Maximale zoetheid en terroir-expressie in elk kopje.',
      seoTitle: 'Over Maison Milau · Branderij & Verhaal',
      seoDesc: 'Ontdek het verhaal achter Maison Milau, onze wekelijkse markten en ons ambachtelijk atelier in Oudegem.',
      slug: 'over-ons',
    },
    en: {
      title: 'About Us',
      subtitle: 'Roastery and Craftsmanship',
      shortDesc: 'Micro-roastery in Oudegem (Dendermonde).',
      longDesc: 'Artisanal roasting in small batches with strict roast curve control. Maximum sweetness and origin expression in every cup.',
      seoTitle: 'About Maison Milau · Roastery & Heritage',
      seoDesc: 'Discover the story behind Maison Milau, our weekly local markets, and our micro-roastery in Oudegem.',
      slug: 'en/over-ons',
    },
    fr: {
      title: 'À Propos de Nous',
      subtitle: 'Brûlerie et Savoir-Faire Artisanal',
      shortDesc: 'Micro-brûlerie à Oudegem (Termonde).',
      longDesc: 'Torréfaction artisanale en petits lots avec contrôle minutieux des profils de torréfaction. Douceur et expression du terroir optimales.',
      seoTitle: 'À Propos de Maison Milau · Brûlerie & Histoire',
      seoDesc: 'Découvrez l\'histoire de Maison Milau, nos marchés hebdomadaires et notre atelier artisanal à Oudegem.',
      slug: 'fr/over-ons',
    },
  },
  faq: {
    id: 'faq',
    status: 'published',
    nl: {
      title: 'Klantenservice & Veelgestelde Vragen',
      subtitle: 'Hoe kunnen we je helpen?',
      shortDesc: 'Vind snel antwoord op al je vragen over brandplanning, leveringen en B2B.',
      longDesc: 'Vind snel antwoord op al je vragen over onze brandplanning, leveringen, apparatuur-lease en private labeling.',
      seoTitle: 'FAQ & Klantenservice · Maison Milau',
      seoDesc: 'Vragen over leveringstermijnen, maalgraden, B2B-formules, event-verhuur en retouren.',
      slug: 'faq',
    },
    en: {
      title: 'Customer Service & FAQ',
      subtitle: 'How can we help you?',
      shortDesc: 'Quick answers regarding roast schedules, shipping, and B2B services.',
      longDesc: 'Find fast answers to questions about our roast schedule, deliveries, equipment leases, and private label services.',
      seoTitle: 'FAQ & Customer Support · Maison Milau',
      seoDesc: 'Frequently asked questions about shipping lead times, grind settings, B2B services, and rentals.',
      slug: 'en/faq',
    },
    fr: {
      title: 'Service Client & FAQ',
      subtitle: 'Comment pouvons-nous vous aider ?',
      shortDesc: 'Trouvez rapidement des réponses sur notre planning de torréfaction et nos livraisons.',
      longDesc: 'Trouvez rapidement des réponses à toutes vos questions sur notre planning de torréfaction, nos livraisons et nos formules B2B.',
      seoTitle: 'FAQ & Service Client · Maison Milau',
      seoDesc: 'Questions fréquentes sur les délais de livraison, les moutures, les formules B2B et la location.',
      slug: 'fr/faq',
    },
  },
};
