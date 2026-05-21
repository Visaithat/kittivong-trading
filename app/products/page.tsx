"use client";

import { motion } from "framer-motion";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BottlePhoto } from "@/components/products/BottlePhoto";
import { useT } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

const FEATURED_PHOTO = "/products/helio-peptide-tincture.png";

export default function ProductsPage() {
  const t = useT();
  return (
    <section className="relative isolate min-h-screen pb-20 pt-28 sm:pb-28 sm:pt-32 md:pb-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dotgrid bg-dotgrid-fade opacity-50" />
        <div className="absolute left-1/3 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-mint/40 blur-[120px]" />
        <div className="absolute right-0 top-1/4 h-[40vh] w-[40vh] rounded-full bg-green/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
                {t.products.eyebrow}
              </p>
            </div>
            <h1 className="mt-5 max-w-3xl font-display text-[1.75rem] font-semibold leading-[1.05] tracking-tight text-ink xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              {t.products.title_part}{" "}
              <span className="text-green-deep">{t.products.title_emph}</span>
              {t.products.title_part_b}
            </h1>
          </div>
          <p className="max-w-sm text-balance text-base text-ink-soft">
            {t.products.sub}
          </p>
        </motion.div>

        {/* Featured centerpiece */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="card-soft-lg relative mb-20 overflow-hidden rounded-3xl bg-card"
        >
          <div className="grid grid-cols-1 items-center md:grid-cols-2">
            <div className="relative h-[360px] sm:h-[420px] md:h-[520px]">
              <BottlePhoto
                src={FEATURED_PHOTO}
                alt={t.products.featured_title}
                shape="apothecary"
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="relative p-5 sm:p-7 md:p-10 lg:p-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
                // {t.products.featured_eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-ink xs:text-3xl md:text-4xl lg:text-5xl">
                {t.products.featured_title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                {t.products.featured_body}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white shadow-[var(--shadow-green)]"
                  data-magnetic
                  data-cursor={t.products.cursor_browse}
                >
                  {t.products.featured_cta_browse}
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-ink hover:border-green/50 hover:text-green-deep"
                  data-magnetic
                  data-cursor={t.products.cursor_talk}
                >
                  {t.products.featured_cta_bulk}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <div id="catalog" />
        <ProductGrid />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="card-soft mt-16 flex flex-col items-start justify-between gap-5 rounded-3xl p-6 sm:mt-20 sm:p-8 md:mt-24 md:flex-row md:items-center"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
              // {t.products.bulk_eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
              {t.products.bulk_title}
            </h2>
          </div>
          <a
            href="/contact"
            data-magnetic
            data-cursor={t.products.cursor_talk}
            className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white shadow-[var(--shadow-green)]"
          >
            {t.products.bulk_cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
