"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  // Lock scroll + set a body flag while open
  useEffect(() => {
    if (!open) return;
    document.body.dataset.modal = "open";
    return () => {
      delete document.body.dataset.modal;
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000]">
      {/* Dim/blur overlay */}
      <button
        aria-label="Close contact"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px] cursor-default"
      />

      {/* Responsive sheet like the reference */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(96vw,1100px)] max-h-[88vh]">
        <div
          className="
            relative rounded-[36px] bg-white text-slate-900 shadow-2xl ring-1 ring-black/10 overflow-hidden
          "
        >
          {/* Close button, top-right inside the card */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="
              absolute right-4 top-4 z-10 h-10 w-10 rounded-full grid place-items-center
              bg-black/90 text-white hover:bg-black transition
            "
          >
            ✕
          </button>

          {/* Scrollable content area, keeps the card height stable */}
          <div className="max-h-[88vh] overflow-auto">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: intro/cta */}
              <div className="px-7 py-8 md:px-10 md:py-12">
                <span className="inline-block text-[11px] font-semibold tracking-wide px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  CONTACT
                </span>

                <h2 className="mt-4 text-[28px] md:text-[40px] leading-[1.1] font-semibold">
                  Let’s talk about your
                  <br /> next big move
                </h2>

                <p className="mt-4 text-slate-600 text-[15px] md:text-base">
                  Whether you have an idea, a question, or a challenge — we’re here to help.
                </p>

                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span>✉️</span>
                    <a href="mailto:hello@theqliq.com" className="underline">
                      hello@theqliq.com
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>We’re globally distributed</span>
                  </li>
                </ul>
              </div>

              {/* Right: form */}
              <form
                className="px-7 py-8 md:px-10 md:py-12 bg-slate-50/70"
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: wire up to your endpoint or service
                  onClose();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Full name">
                    <input
                      className="input"
                      placeholder="Jordan Doe"
                      required
                    />
                  </Field>
                  <Field label="Company">
                    <input className="input" placeholder="XYZ Studio" />
                  </Field>

                  <Field label="Email" span2>
                    <input type="email" className="input" placeholder="you@email.com" required />
                  </Field>

                  <Field label="Project type" span2>
                    <select className="input">
                      <option>Select our service</option>
                      <option>Brand & Website</option>
                      <option>Landing Experience</option>
                      <option>Web App / Product</option>
                      <option>Consulting</option>
                    </select>
                  </Field>

                  <Field label="Budget" span2>
                    <select className="input">
                      <option>Select your budget range</option>
                      <option>$5k – $15k</option>
                      <option>$15k – $40k</option>
                      <option>$40k – $100k</option>
                      <option>$100k+</option>
                    </select>
                  </Field>

                  <Field label="Why do you want to work with us?" span2>
                    <textarea
                      className="input min-h-[120px] py-2 resize-y"
                      placeholder="Tell us about yourself"
                    />
                  </Field>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center h-11 px-5 rounded-full bg-slate-900 text-white hover:bg-black transition"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-11 px-4 text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small helper so labels/inputs are consistent */
function Field({
  label,
  children,
  span2,
}: {
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "md:col-span-2" : ""}>
      <label className="text-[11px] font-medium text-slate-600 mb-1 block">
        {label}
      </label>
      {children}
    </div>
  );
}
