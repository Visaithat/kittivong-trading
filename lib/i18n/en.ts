export const en = {
  nav: {
    home: "Home",
    catalog: "Shelf",
    contact: "Contact",
    open_now: "open now",
    lang_label: "Language",
  },

  hero: {
    locations: "Serving every province in Laos",
    sub:
      "A trusted pharmacy from Vientiane, delivering clean medicine to every province of Lao PDR.",
    cta_browse: "Browse the shelf",
    cta_contact: "Talk to a pharmacist",
    cursor_browse: "Open the shelf",
    cursor_contact: "Call us",
    scroll: "Scroll",
    tagline: "TRUSTED  /  CLEAN  /  PHARMACY-GRADE",
  },

  featured: {
    eyebrow: "Featured this month",
    title_part: "A bottle from",
    title_emph: "our shelf",
    body:
      "Spin it. Tilt it. This is one of the six formulas we stock and personally hand-check before it leaves the pharmacy.",
    swap_hint: "Drag or hover to rotate · tap to swap",
    spec_origin: "Origin",
    spec_origin_value: "Vientiane, Lao PDR",
    spec_form: "Form",
    forms: {
      apothecary: "Tincture · 30 ml",
      dropper: "Tincture · 30 ml dropper",
      balm: "Topical balm · 25 g",
      syrup: "Oral syrup · 100 ml",
    },
    tabs: {
      apothecary: "Tincture",
      dropper: "Dropper",
      balm: "Balm jar",
      syrup: "Syrup",
    },
    cta: "View the full shelf →",
  },

  brand: {
    eyebrow: "About our pharmacy",
    title_part_a: "Real medicine. From people you can",
    title_emph: "call",
    title_part_b: ".",
    beats: [
      {
        code: "01",
        label: "Our shelf",
        title: "From Vientiane, to your medicine cabinet.",
        body:
          "kittivong-trading started as a single pharmacy on a quiet street in Vientiane. We grew by saying yes only to the products our own family would use — and shipping them with care to friends in every province of Laos.",
        bullets: [
          "Sourced from licensed makers",
          "Hand-checked, batch by batch",
          "Cold-chain ready when needed",
        ],
      },
      {
        code: "02",
        label: "Our promise",
        title: "Trusted medicine, hand-checked by our team.",
        body:
          "Every product on the shelf has been reviewed by a real pharmacist. If a formula doesn't pass our triage — provenance, evidence, outcomes — it doesn't make the shelf.",
        bullets: [
          "Pharmacist-reviewed",
          "Independent batch testing",
          "Honest pricing, no markups",
        ],
      },
      {
        code: "03",
        label: "Our reach",
        title: "One pharmacy. Every province of Laos.",
        body:
          "From Vientiane to Phongsaly, from Luang Prabang to Attapeu, we deliver the same trusted medicine to all 17 provinces of Lao PDR — every shelf, every clinic, every village pharmacy that asks for us.",
        bullets: [
          "17 provinces covered",
          "Trackable shipments",
          "A pharmacist on call",
        ],
      },
    ],
  },

  products: {
    eyebrow: "Shelf // 2026 — Vol. 01",
    title_part: "Six trusted formulas, on our",
    title_emph: "pharmacy shelf",
    title_part_b: ".",
    sub:
      "Every product is sourced, checked and sent by kittivong-trading. Hover any bottle to see it up close.",
    in_stock: "in stock",
    dossier: "View dossier",
    cursor_browse: "Browse",
    cursor_talk: "Talk to us",
    featured_eyebrow: "Editor's pick",
    featured_title: "Helio Peptide Tincture",
    featured_body:
      "Our flagship dermatology line. A gentle, photo-stable peptide tincture that quietly does its job — pharmacy-grade, dermatologist-reviewed, delivered to every province in Laos.",
    featured_cta_browse: "Browse all six →",
    featured_cta_bulk: "Bulk quote",
    bulk_eyebrow: "Need volume?",
    bulk_title:
      "Bulk trade desk is open. We ship pallets, prescriptions, and care plans across Laos.",
    bulk_cta: "Open a channel →",
  },

  contact: {
    eyebrow: "Channel // Open",
    title_part: "Talk to a real",
    title_emph: "pharmacist",
    title_part_b: ".",
    form: {
      name: "Name",
      email: "Email",
      organization: "Organization",
      intent: "Intent",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      sent: "Message received",
      sent_body: "// Thanks. A pharmacist will reply within one business day.",
      error_body: "// Something went wrong. Please try again.",
      disclaimer: "// We reply within one business day, in your language.",
      cursor_send: "Send",
    },
    aside: {
      direct: "Direct",
      trade_desk: "Pharmacy email",
      voice: "Phone",
      hq: "Headquarters",
      hq_value: "Vientiane Capital, Lao PDR",
      note:
        "All messages are read by a real pharmacist on our team — usually within one business day.",
    },
    map: {
      eyebrow: "Coverage // Live",
      title: "Every province of Laos. One pharmacy.",
      sub:
        "We deliver to all 17 provinces from our Vientiane headquarters. Every pulse on the map is a shelf we serve.",
      legend_primary: "Headquarters",
      legend_desk: "Province served",
    },
  },

  loading: {
    chip: "Loading the pharmacy…",
  },

  notFound: {
    eyebrow: "404 — Not found",
    title: "404",
    body:
      "This shelf is empty — but the rest of our pharmacy is fully stocked.",
    cta_home: "Back to pharmacy",
    cta_contact: "Talk to a pharmacist",
  },

  footer: {
    tagline:
      "Clean, pharmacy-grade medicine from Vientiane, delivered to every province of Lao PDR. Trusted care, traded with intent.",
    hubs_label: "Provinces we serve",
    hubs_more: "+ {n} more",
    contact_label: "Get in touch",
    contact_cta: "Open a channel →",
    version: "v.026.05 — clean motion edition",
    rights: "All rights reserved",
  },
} as const;

// Widen all string literals → `string` so other locale dicts can satisfy the
// shape without having to repeat the exact English values as literal types.
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

export type Dict = Widen<typeof en>;
