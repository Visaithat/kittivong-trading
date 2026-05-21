"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/lib/i18n";

type FieldKey = "name" | "email" | "organization" | "intent" | "message";

const EASE = [0.16, 1, 0.3, 1] as const;

function FocusBorder({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <motion.rect
        x="1"
        y="1"
        width="calc(100% - 2px)"
        height="calc(100% - 2px)"
        rx="14"
        fill="none"
        stroke="#16a34a"
        strokeWidth="1.6"
        pathLength={1}
        strokeDasharray={1}
        animate={{
          strokeDashoffset: active ? 0 : 1,
          opacity: active ? 1 : 0,
        }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{ filter: "drop-shadow(0 6px 14px rgba(22,163,74,0.25))" }}
      />
    </svg>
  );
}

export function ContactForm() {
  const t = useT();
  const [values, setValues] = useState<Record<FieldKey, string>>({
    name: "",
    email: "",
    organization: "",
    intent: "",
    message: "",
  });
  const [focus, setFocus] = useState<FieldKey | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const fields: { name: FieldKey; label: string; type?: "text" | "email"; multiline?: boolean }[] = [
    { name: "name", label: t.contact.form.name },
    { name: "email", label: t.contact.form.email, type: "email" },
    { name: "organization", label: t.contact.form.organization },
    { name: "intent", label: t.contact.form.intent },
    { name: "message", label: t.contact.form.message, multiline: true },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("bad");
      setStatus("sent");
      setValues({
        name: "",
        email: "",
        organization: "",
        intent: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {fields.map((f) => {
        const isFilled = Boolean(values[f.name]);
        const isFocused = focus === f.name;
        const isFloating = isFilled || isFocused;
        return (
          <label
            key={f.name}
            className={
              "relative block rounded-2xl bg-card border border-line shadow-[var(--shadow-soft)] " +
              (f.multiline ? "sm:col-span-2" : "")
            }
          >
            <FocusBorder active={isFocused} />
            <span
              className={
                "pointer-events-none absolute left-5 transition-all duration-300 font-mono uppercase tracking-[0.28em] " +
                (isFloating
                  ? "top-3 text-[10px] text-green-deep"
                  : "top-1/2 -translate-y-1/2 text-[11px] text-ink-mute")
              }
              style={{
                transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {f.label}
            </span>

            {f.multiline ? (
              <textarea
                rows={5}
                value={values[f.name]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
                onFocus={() => setFocus(f.name)}
                onBlur={() => setFocus(null)}
                className="block w-full resize-none rounded-2xl bg-transparent px-5 pb-5 pt-9 text-base text-ink outline-none"
              />
            ) : (
              <input
                type={f.type ?? "text"}
                value={values[f.name]}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [f.name]: e.target.value }))
                }
                onFocus={() => setFocus(f.name)}
                onBlur={() => setFocus(null)}
                className="block w-full rounded-2xl bg-transparent px-5 pb-3 pt-7 text-base text-ink outline-none"
                autoComplete="off"
              />
            )}
          </label>
        );
      })}

      <div className="sm:col-span-2 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
          {t.contact.form.disclaimer}
        </p>
        <motion.button
          type="submit"
          data-magnetic
          data-cursor={t.contact.form.cursor_send}
          disabled={status === "sending"}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-green px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white shadow-[var(--shadow-green)] transition-transform hover:scale-[1.02] disabled:opacity-60 sm:gap-3 sm:px-8 sm:py-4 sm:text-[11px] sm:tracking-[0.28em]"
        >
          <span className="relative z-10">
            {status === "sending"
              ? t.contact.form.sending
              : status === "sent"
                ? t.contact.form.sent
                : t.contact.form.send}
          </span>
          <span aria-hidden className="relative z-10">→</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {status === "sent" ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="sm:col-span-2 rounded-2xl border border-green/40 bg-mint/40 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-green-deep"
          >
            {t.contact.form.sent_body}
          </motion.p>
        ) : null}
        {status === "error" ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="sm:col-span-2 rounded-2xl border border-red-300 bg-red-50 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.28em] text-red-600"
          >
            {t.contact.form.error_body}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}
