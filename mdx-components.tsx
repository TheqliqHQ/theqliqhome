// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import NextImage, { ImageProps } from "next/image";
import Link from "next/link";

// Simple brand blocks you can use in MDX
export function Callout(props: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/70 p-5 backdrop-blur-sm">
      {props.title && <div className="mb-2 text-sm font-semibold">{props.title}</div>}
      <div className="text-[15px] leading-6 text-slate-800">{props.children}</div>
    </div>
  );
}

export function TwoCol(props: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>{props.left}</div>
      <div>{props.right}</div>
    </div>
  );
}

export function FAQItem(props: { q: string; a: React.ReactNode }) {
  return (
    <details className="rounded-xl border border-black/10 p-4 bg-white/70">
      <summary className="cursor-pointer font-medium">{props.q}</summary>
      <div className="mt-2 text-[15px] leading-6 text-slate-800">{props.a}</div>
    </details>
  );
}

// Map markdown -> styled elements + Next.js features
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Markdown images use Next/Image automatically
    img: (props) => (
      <NextImage
        {...(props as ImageProps)}
        alt={(props as any).alt || ""}
        width={(props as any).width || 1600}
        height={(props as any).height || 900}
        className="rounded-xl border border-black/10"
      />
    ),
    a: (props) => {
      const href = (props as any).href || "#";
      const isInternal = href.startsWith("/");
      if (isInternal) {
        return <Link href={href} className="underline underline-offset-4">{props.children}</Link>;
      }
      return (
        <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
          {props.children}
        </a>
      );
    },
    h1: (p) => <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4" {...p} />,
    h2: (p) => <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-8 mb-3" {...p} />,
    h3: (p) => <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-2" {...p} />,
    p:  (p) => <p className="text-[15px] leading-7 text-slate-800" {...p} />,
    ul: (p) => <ul className="list-disc pl-6 space-y-2" {...p} />,
    ol: (p) => <ol className="list-decimal pl-6 space-y-2" {...p} />,
    blockquote: (p) => (
      <blockquote className="border-l-4 border-black/20 pl-4 italic text-slate-700" {...p} />
    ),

    // expose custom blocks to MDX
    Callout,
    TwoCol,
    FAQItem,

    ...components,
  };
}
