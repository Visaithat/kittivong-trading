import type { Locale } from "@/lib/i18n";

export type LocalizedString = Record<Locale, string>;

/**
 * Bottle shape hint used by the SVG skeleton fallback (when the remote photo
 * can't load). Pick the silhouette that most resembles the product photo.
 */
export type BottleShape = "apothecary" | "dropper" | "balm" | "syrup";

export type Product = {
  id: string;
  name: LocalizedString;
  category: LocalizedString;
  blurb: LocalizedString;
  /** Used by the BottleSkeleton if the photo fails to load. */
  shape: BottleShape;
  /**
   * Remote image URL. Unsplash by default — swap any URL freely.
   * If a URL 404s, the UI falls back to a clean SVG silhouette.
   */
  imageUrl: string;
  label: string;
  serial: string;
};

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=900&q=85&fit=crop&auto=format`;

export const products: Product[] = [
  {
    id: "kv-001",
    name: { en: "Helio Tincture", lo: "ຢານ້ຳ ເຮລິໂອ" },
    category: { en: "Skin care", lo: "ດູແລຜິວ" },
    blurb: {
      en: "A photo-stable peptide tincture for gentle skin barrier repair.",
      lo: "ຢານ້ຳເປບໄທ້ ໝັ້ນຄົງຕໍ່ແສງ ສຳລັບປົກປ້ອງເກາະປ້ອງກັນຜິວ.",
    },
    shape: "apothecary",
    imageUrl: "/products/helio-peptide-tincture.png",
    label: "HE-01",
    serial: "01 // he-2026.01",
  },
  {
    id: "kv-002",
    name: { en: "Quantum Multivitamin", lo: "ວິຕາມິນ ຄວັນຕັມ" },
    category: { en: "Daily wellness", lo: "ສຸຂະພາບປະຈຳວັນ" },
    blurb: {
      en: "A balanced multivitamin formulated for steady daily wellness.",
      lo: "ວິຕາມິນລວມ ສຳລັບການເບິ່ງແຍງສຸຂະພາບປະຈຳວັນ.",
    },
    shape: "syrup",
    imageUrl: UNSPLASH("1584308666744-24d5c474f2ae"),
    label: "QV-02",
    serial: "02 // qv-2026.02",
  },
  {
    id: "kv-003",
    name: { en: "Aurora Sleep Drops", lo: "ຢາຫຍອດ ອໍໂຣຣາ" },
    category: { en: "Sleep & calm", lo: "ນອນຫຼັບສະບາຍ" },
    blurb: {
      en: "Gentle herbal drops tuned to wind down the evening.",
      lo: "ຢາຫຍອດສະໝຸນໄພອ່ອນໂຍນ ສຳລັບຍາມຄ່ຳ.",
    },
    shape: "dropper",
    imageUrl: "/products/aurora-sleep-drops.png",
    label: "AS-03",
    serial: "03 // as-2026.03",
  },
  {
    id: "kv-004",
    name: { en: "Vital Flow Balm", lo: "ຢາທາ ໄວທໍ ໂຟລ" },
    category: { en: "Topical relief", lo: "ບັນເທົາທີ່ຜິວ" },
    blurb: {
      en: "Warming herbal balm for sore muscles and tired shoulders.",
      lo: "ຢາທາສະໝຸນໄພອຸ່ນໆ ສຳລັບກ້າມເນື້ອເມື່ອຍລ້າ.",
    },
    shape: "balm",
    imageUrl: "/products/vital-flow-balm.png",
    label: "VF-04",
    serial: "04 // vf-2026.04",
  },
  {
    id: "kv-005",
    name: { en: "Lumen Immune Syrup", lo: "ຢານ້ຳເຊື່ອມ ລູເມັນ" },
    category: { en: "Immune support", lo: "ເສີມສ້າງພູມຄຸ້ມກັນ" },
    blurb: {
      en: "A warming oral syrup to support seasonal immunity.",
      lo: "ຢານ້ຳເຊື່ອມຮ້ອນໆ ສຳລັບເສີມພູມຕາມລະດູ.",
    },
    shape: "syrup",
    imageUrl: UNSPLASH("1607619056574-7b8d3ee536b2"),
    label: "LI-05",
    serial: "05 // li-2026.05",
  },
  {
    id: "kv-006",
    name: { en: "Atlas Focus Drops", lo: "ຢາຫຍອດ ອັດລາສ" },
    category: { en: "Focus & study", lo: "ສຳລັບສະມາທິ" },
    blurb: {
      en: "A clean herbal focus formula for long study and work days.",
      lo: "ສູດສະໝຸນໄພສຳລັບເພີ່ມສະມາທິ ໃນວັນເຮັດວຽກຍາວ.",
    },
    shape: "dropper",
    imageUrl: UNSPLASH("1631549916768-4119b2e5f926"),
    label: "AC-06",
    serial: "06 // ac-2026.06",
  },
];
