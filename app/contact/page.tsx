"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/ContactForm";
import { TradingMap } from "@/components/contact/TradingMap";
import { useLocale } from "@/lib/i18n";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ContactPage() {
  const { lang, t } = useLocale();
  return (
    <section className="relative isolate min-h-screen px-5 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32 md:pb-32 md:pt-40 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-dotgrid bg-dotgrid-fade opacity-50" />
        <div className="absolute -top-20 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-mint/40 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-mint/60 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
              {t.contact.eyebrow}
            </p>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-[1.75rem] font-semibold leading-[1.05] tracking-tight text-ink xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
            {t.contact.title_part}{" "}
            <span className="text-green-deep">{t.contact.title_emph}</span>
            {t.contact.title_part_b}
          </h1>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="card-soft rounded-3xl p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
                // {t.contact.aside.direct}
              </p>
              <ul className="mt-6 space-y-5 text-lg">
                <li>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                    {t.contact.aside.trade_desk}
                  </p>
                  <a
                    href="mailto:trade@kittivong.trading"
                    className="text-ink hover:text-green-deep"
                    data-magnetic
                  >
                    trade@kittivong.trading
                  </a>
                </li>
                <li>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                    {t.contact.aside.voice}
                  </p>
                  <a
                    href="tel:+85621000000"
                    className="text-ink hover:text-green-deep"
                    data-magnetic
                  >
                    +856 21 000 000
                  </a>
                </li>
                <li>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                    {t.contact.aside.hq}
                  </p>
                  <span className="text-ink">{t.contact.aside.hq_value}</span>
                </li>
              </ul>
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-mint/50 px-4 py-3">
                <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-green-deep" fill="none">
                  <path
                    d="M12 2l2 4 4 .6-3 3 .8 4.4L12 12l-3.8 2L9 9.6 6 6.6 10 6z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-xs leading-relaxed text-ink">
                  {t.contact.aside.note}
                </p>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-16 grid grid-cols-1 gap-12 sm:mt-20 md:mt-24 lg:grid-cols-12 lg:gap-16"
        >
          {/* Map column — smaller, portrait, matches Laos shape */}
          <div className="lg:col-span-5">
            <div className="mx-auto aspect-[3/4] w-full max-w-[360px] sm:max-w-[420px]">
              <TradingMap />
            </div>
          </div>

          {/* Coverage text column */}
          <div className="lg:col-span-7 lg:pl-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-green-deep">
              // {t.contact.map.eyebrow}
            </p>
            <h2 className="mt-2 max-w-md font-display text-2xl font-semibold text-ink md:text-3xl lg:text-5xl">
              {t.contact.map.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
              {t.contact.map.sub}
            </p>

            <dl className="mt-10 grid max-w-md grid-cols-2 gap-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
                  {lang === "lo" ? "ແຂວງທີ່ໃຫ້ບໍລິການ" : "Provinces served"}
                </dt>
                <dd className="mt-2 font-display text-3xl font-semibold text-green-deep">
                  17 / 17
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
                  {lang === "lo" ? "ສຳນັກງານໃຫຍ່" : "Headquarters"}
                </dt>
                <dd className="mt-2 font-display text-lg font-medium text-ink">
                  {t.contact.aside.hq_value}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
                  {lang === "lo" ? "ເວລາສົ່ງ" : "Delivery time"}
                </dt>
                <dd className="mt-2 font-display text-lg font-medium text-ink">
                  {lang === "lo" ? "1–3 ມື້" : "1–3 days"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
                  {lang === "lo" ? "ເພສັດຊະກອນ" : "Pharmacist"}
                </dt>
                <dd className="mt-2 font-display text-lg font-medium text-ink">
                  {lang === "lo" ? "ພ້ອມຮັບສາຍ" : "On call"}
                </dd>
              </div>
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
