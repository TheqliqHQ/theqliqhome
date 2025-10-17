"use client";

import { useMemo, useState } from "react";

/** ———————————————————————
 *  Small helpers
 *  ——————————————————————— */
type Field = {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  colSpan?: "full" | "half";
};

const PROJECT_TYPES = [
  "Brand + Identity",
  "Website (design + build)",
  "Design only",
  "Development only",
  "Growth / ongoing",
  "Something else",
];

const BUDGETS = ["$5k – $10k", "$10k – $25k", "$25k – $50k", "$50k+", "Not sure yet"];

const FIELDS: Field[] = [
  { id: "name", label: "Full name", placeholder: "Jordan Doe", required: true, colSpan: "half" },
  { id: "company", label: "Company", placeholder: "XYZ Studio", colSpan: "half" },
  { id: "email", label: "Email", type: "email", placeholder: "jordan@gmail.com", required: true, colSpan: "full" },
  { id: "projectType", label: "Project type", type: "select", options: PROJECT_TYPES, colSpan: "full" },
  { id: "budget", label: "Budget", type: "select", options: BUDGETS, colSpan: "full" },
  {
    id: "message",
    label: "Why do you want to work with us?",
    type: "textarea",
    placeholder: "Tell us about yourself",
    required: true,
    colSpan: "full",
  },
];

const FAQ = [
  {
    q: "What type of companies do you work with?",
    a: "Startups, growth-stage, and established brands. We tailor scope to the stage you’re in.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects run 4–8 weeks from kickoff. Fast tracks are possible with focused scope.",
  },
  {
    q: "Can you join an existing product team?",
    a: "Yes. We often plug into an existing roadmap and ship alongside internal teams.",
  },
  {
    q: "Do you work remotely?",
    a: "We’re remote-first and async-friendly, with crisp communication and weekly milestones.",
  },
  {
    q: "What if I only need design, not development?",
    a: "No problem. We can deliver design-only, dev-only, or end-to-end.",
  },
];

/** ———————————————————————
 *  Contact + FAQ content card
 *  ——————————————————————— */
export default function ContactFaqContent({
  chip = "CONTACT",
  headline = "Let's talk about your next big move",
  subcopy = "Whether you have an idea, a question, or a challenge — we’re here to help.",
  email = "contact@theqliq.com",
}: {
  chip?: string;
  headline?: string;
  subcopy?: string;
  email?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);

  // simple controlled values
  const initialForm = useMemo(
    () =>
      FIELDS.reduce<Record<string, string>>((acc, f) => {
        acc[f.id] = "";
        return acc;
      }, {}),
    []
  );
  const [values, setValues] = useState<Record<string, string>>(initialForm);

  function onChange(id: string, v: string) {
    setValues((s) => ({ ...s, [id]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    // TODO: hook to /api/contact
    await new Promise((r) => setTimeout(r, 900));

    setSubmitting(false);
    alert("Thanks! We’ll be in touch shortly.");
    setValues(initialForm);
  }

  return (
    <div className="space-y-14 md:space-y-16">
      {/* —— Hero-like header of the content card —— */}
      <section
        className="
          rounded-[28px]
          bg-[#eaf2f5]
          p-6 md:p-8
        "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {/* Left: copy */}
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-wide text-slate-700 shadow-sm">
              {chip}
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              {headline}
            </h2>

            <p className="mt-5 text-slate-600 leading-relaxed max-w-prose">{subcopy}</p>

            <ul className="mt-6 space-y-3 text-slate-700">
              <li className="flex items-center gap-3">
                <MailIcon />
                <a href={`mailto:${email}`} className="underline decoration-slate-400 underline-offset-2 hover:text-slate-900">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <GlobeIcon />
                We’re globally distributed
              </li>
            </ul>

            <div className="mt-8 flex items-center gap-3">
              {["X", "IG", "in"].map((label) => (
                <button
                  key={label}
                  className="h-10 w-10 grid place-items-center rounded-xl bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  title={label}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            <form onSubmit={onSubmit} className="rounded-2xl bg-white p-5 md:p-6 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {FIELDS.map((f) => {
                  const col = f.colSpan === "half" ? "" : "md:col-span-2";
                  const common =
                    "mt-1 w-full rounded-lg border border-slate-200 px-3 outline-none focus:ring-2 focus:ring-blue-500";
                  return (
                    <label key={f.id} className={col}>
                      <span className="block text-sm font-medium text-slate-700">{f.label}</span>

                      {f.type === "textarea" ? (
                        <textarea
                          className={`${common} py-2 min-h-[120px]`}
                          placeholder={f.placeholder}
                          required={!!f.required}
                          value={values[f.id] || ""}
                          onChange={(e) => onChange(f.id, e.target.value)}
                        />
                      ) : f.type === "select" ? (
                        <div className="relative">
                          <select
                            className={`${common} h-11 appearance-none pr-9 bg-white`}
                            value={values[f.id] || ""}
                            onChange={(e) => onChange(f.id, e.target.value)}
                          >
                            <option value="">{`Select ${f.label.toLowerCase()}`}</option>
                            {(f.options || []).map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-50" />
                        </div>
                      ) : (
                        <input
                          type={f.type || "text"}
                          className={`${common} h-11`}
                          placeholder={f.placeholder}
                          required={!!f.required}
                          value={values[f.id] || ""}
                          onChange={(e) => onChange(f.id, e.target.value)}
                        />
                      )}
                    </label>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2 font-semibold hover:bg-slate-800 disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Apply"}
                </button>
                <span className="text-sm text-slate-500">We reply within 1–2 business days.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* —— FAQ —— */}
      <section className="text-center">
        <span className="inline-flex items-center rounded-full bg-[#eaf2f5] px-4 py-2 text-xs font-semibold tracking-wide text-slate-700">
          FAQS
        </span>

        <h3 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Answers to the questions
          <br className="hidden md:block" />
          you might have
        </h3>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 text-left">
          {FAQ.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  className="w-full px-4 py-4 flex items-center gap-3"
                  onClick={() => setOpenIndex(open ? null : i)}
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                    {open ? "–" : "+"}
                  </span>
                  <span className="font-medium text-slate-900">{item.q}</span>
                </button>
                {open && <div className="px-4 pb-4 text-slate-600 leading-relaxed">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/** ———————————————————————
 *  tiny inline icons
 *  ——————————————————————— */
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-700">
      <path
        fill="currentColor"
        d="M4 6h16a2 2 0 0 1 2 2v.34l-10 6.25L2 8.34V8a2 2 0 0 1 2-2Zm16 12H4a2 2 0 0 1-2-2V9.66l10 6.25l10-6.25V16a2 2 0 0 1-2 2Z"
      />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-slate-700">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 0 20a10 10 0 0 0 0-20Zm7.93 9h-3.11a15.7 15.7 0 0 0-1.2-5.03A8.02 8.02 0 0 1 19.93 11ZM12 4c.93 0 2.45 2.1 3.09 6H8.91C9.55 6.1 11.07 4 12 4ZM6.38 5.97A15.7 15.7 0 0 0 5.18 11H2.07a8.02 8.02 0 0 1 4.31-5.03ZM2.07 13h3.11c.23 1.8.74 3.52 1.2 5.03A8.02 8.02 0 0 1 2.07 13Zm6.84 0h6.18c-.64 3.9-2.16 6-3.09 6s-2.45-2.1-3.09-6Zm7.71 5.03c.46-1.51.97-3.23 1.2-5.03h3.11a8.02 8.02 0 0 1-4.31 5.03Z"
      />
    </svg>
  );
}
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M12 15L6 9h12z" />
    </svg>
  );
}
