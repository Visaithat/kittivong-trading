import type { Locale } from "@/lib/i18n";

export type Hub = {
  id: string;
  /** ISO 3166-2 subdivision code — matches `shapeISO` in laos-admin1.geojson. */
  iso: string;
  name: Record<Locale, string>;
  primary?: boolean;
};

/**
 * The 17 provinces of Lao PDR plus Vientiane Capital prefecture, mapped to
 * the `shapeISO` codes in `public/geo/laos-admin1.geojson` so the map can
 * derive every marker position from the real polygon centroid.
 */
export const hubs: Hub[] = [
  { id: "pho", iso: "LA-PH", name: { en: "Phongsaly", lo: "ຜົ້ງສາລີ" } },
  { id: "lnt", iso: "LA-LM", name: { en: "Luang Namtha", lo: "ຫຼວງນ້ຳທາ" } },
  { id: "bok", iso: "LA-BK", name: { en: "Bokeo", lo: "ບໍ່ແກ້ວ" } },
  { id: "odx", iso: "LA-OU", name: { en: "Oudomxay", lo: "ອຸດົມໄຊ" } },
  { id: "hou", iso: "LA-HO", name: { en: "Houaphan", lo: "ຫົວພັນ" } },
  { id: "lpb", iso: "LA-LP", name: { en: "Luang Prabang", lo: "ຫຼວງພະບາງ" } },
  { id: "xyb", iso: "LA-XA", name: { en: "Xayaboury", lo: "ໄຊຍະບູລີ" } },
  { id: "xkh", iso: "LA-XI", name: { en: "Xiengkhouang", lo: "ຊຽງຂວາງ" } },
  { id: "xns", iso: "LA-XN", name: { en: "Xaisomboun", lo: "ໄຊສົມບູນ" } },
  { id: "vtn", iso: "LA-VI", name: { en: "Vientiane Province", lo: "ວຽງຈັນ" } },
  {
    id: "vct",
    iso: "LA-VT",
    name: { en: "Vientiane Capital", lo: "ນະຄອນຫຼວງວຽງຈັນ" },
    primary: true,
  },
  { id: "blk", iso: "LA-BL", name: { en: "Borikhamxay", lo: "ບໍລິຄຳໄຊ" } },
  { id: "khm", iso: "LA-KH", name: { en: "Khammouane", lo: "ຄຳມ່ວນ" } },
  { id: "svk", iso: "LA-SV", name: { en: "Savannakhet", lo: "ສະຫວັນນະເຂດ" } },
  { id: "slv", iso: "LA-SL", name: { en: "Salavan", lo: "ສາລະວັນ" } },
  { id: "sek", iso: "LA-XE", name: { en: "Sekong", lo: "ເຊກອງ" } },
  { id: "cps", iso: "LA-CH", name: { en: "Champasack", lo: "ຈຳປາສັກ" } },
  { id: "att", iso: "LA-AT", name: { en: "Attapeu", lo: "ອັດຕະປື" } },
];
