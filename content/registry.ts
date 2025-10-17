// content/registry.ts
import dynamic from "next/dynamic";

/** Helper to always resolve to a component function */
function pickDefault<T = any>(p: Promise<any>) {
  return p.then((m) => m.default ?? m.Hero ?? m.Page);
}

/** Hero components (top band) */
export const heroBySlug: Record<string, any> = {
  problem:        dynamic(() => pickDefault(import("./hero/problem")), { ssr: false }),
  "meet-theqliq": dynamic(() => pickDefault(import("./hero/meet-theqliq")), { ssr: false }),
  portfolio:      dynamic(() => pickDefault(import("./hero/portfolio")), { ssr: false }),
  "contact-faq":  dynamic(() => pickDefault(import("./hero/contact-faq")), { ssr: false }),
  careers:        dynamic(() => pickDefault(import("./hero/careers")), { ssr: false }),
  blog:           dynamic(() => pickDefault(import("./hero/blog")), { ssr: false }),
};

/** Rising content components (main page card) */
export const pageBySlug: Record<string, any> = {
  problem:        dynamic(() => pickDefault(import("./pages/problem")), { ssr: false }),
  "meet-theqliq": dynamic(() => pickDefault(import("./pages/meet-theqliq")), { ssr: false }),
  portfolio:      dynamic(() => pickDefault(import("./pages/portfolio")), { ssr: false }),
  "contact-faq":  dynamic(() => pickDefault(import("./pages/contact-faq")), { ssr: false }),
  careers:        dynamic(() => pickDefault(import("./pages/careers")), { ssr: false }),
  blog:           dynamic(() => pickDefault(import("./pages/blog")), { ssr: false }),
};
