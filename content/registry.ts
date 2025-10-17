// content/registry.ts
import dynamic from "next/dynamic";

// tiny helper so both `export default` and named export work
const pickDefault = <T,>(p: any): Promise<T> =>
  Promise.resolve(p).then((m: any) => m?.default ?? m);

export const heroBySlug: Record<string, any> = {
  problem:        dynamic(() => pickDefault(import("./hero/problem")), { ssr: false }),
  "meet-theqliq": dynamic(() => pickDefault(import("./hero/meet-theqliq")), { ssr: false }),
  portfolio:      dynamic(() => pickDefault(import("./hero/portfolio")), { ssr: false }),
  "contact-faq":  dynamic(() => pickDefault(import("./hero/contact-faq")), { ssr: false }),
  careers:        dynamic(() => pickDefault(import("./hero/careers")), { ssr: false }),
  blog:           dynamic(() => pickDefault(import("./hero/blog")), { ssr: false }),
};


/** Rising content components (main page card) 
export const pageBySlug: Record<string, any> = {
  problem:        dynamic(() => pickDefault(import("./pages/problem")), { ssr: false }),
  "meet-theqliq": dynamic(() => pickDefault(import("./pages/meet-theqliq")), { ssr: false }),
  portfolio:      dynamic(() => pickDefault(import("./pages/portfolio")), { ssr: false }),
  "contact-faq":  dynamic(() => pickDefault(import("./pages/contact-faq")), { ssr: false }),
  careers:        dynamic(() => pickDefault(import("./pages/careers")), { ssr: false }),
  blog:           dynamic(() => pickDefault(import("./pages/blog")), { ssr: false }),
};

*/
