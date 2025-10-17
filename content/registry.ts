// content/registry.ts
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Make dynamic() happy: turn a dynamic import into a ComponentType.
 * Works with both default and named exports.
 */
function load(modPromise: Promise<any>): Promise<ComponentType<any>> {
  return modPromise.then((m) => (m?.default ?? m) as ComponentType<any>);
}

export const heroBySlug: Record<string, ComponentType<any>> = {
  problem:        dynamic(() => load(import("./hero/problem")),        { ssr: false }),
  "meet-theqliq": dynamic(() => load(import("./hero/meet-theqliq")),   { ssr: false }),
  portfolio:      dynamic(() => load(import("./hero/portfolio")),      { ssr: false }),
  "contact-faq":  dynamic(() => load(import("./hero/contact-faq")),    { ssr: false }),
  careers:        dynamic(() => load(import("./hero/careers")),        { ssr: false }),
  blog:           dynamic(() => load(import("./hero/blog")),           { ssr: false }),
};
