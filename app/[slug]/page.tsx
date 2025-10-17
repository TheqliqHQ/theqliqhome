// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllCards, getCardBySlug, getCardMdxSource } from "@/lib/cards";

export async function generateStaticParams() {
  return getAllCards().map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) return {};
  return {
    title: card.title ?? "Theqliq",
    description: card.chip ?? "Theqliq",
  };
}

export default async function CardPage({ params }: { params: { slug: string } }) {
  const card = getCardBySlug(params.slug);
  if (!card) return notFound();

  const mdxSource = await getCardMdxSource(card);

  return (
    <main className="min-h-screen bg-[var(--stage-bg)] text-[var(--stage-fg)]">
      <section
        className="mx-auto bg-white text-slate-900 overflow-hidden"
        style={{
          borderRadius: 60,
          marginTop: 130,
          marginBottom: 40,
          marginLeft: 120,
          marginRight: 120,
          maxWidth: "calc(100% - 240px)",
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.10)",
        }}
      >
        {/* Header with chip + title + image */}
        <div className="px-10 pt-6 pb-6 border-b border-black/10">
          <div className="flex items-start">
            {card.chip && (
              <span
                className="inline-block rounded-full px-4 py-1 text-[13px] font-semibold tracking-wide"
                style={{
                  backgroundColor: "var(--stage-bg, #2E6CE6)",
                  color: "var(--stage-fg, #ffffff)",
                }}
              >
                {card.chip}
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <h1 className="text-[40px] leading-tight md:text-[52px] font-extrabold">
              {card.title}
            </h1>

            <div className="relative rounded-[40px] bg-black/5 min-h-[250px] md:min-h-[300px] overflow-hidden">
              {card.illustration ? (
                <Image
                  src={card.illustration}
                  alt={card.title || "page visual"}
                  fill
                  priority
                  draggable={false}
                  className="object-contain select-none"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Render MDX content */}
        <article className="prose prose-lg max-w-none px-10 py-10">
          <MDXRemote source={mdxSource} />
        </article>
      </section>
    </main>
  );
}
