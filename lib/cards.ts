// /lib/cards.ts
import fs from "node:fs/promises";
import path from "node:path";
import cards from "@/content/cards.json";

export type Card = {
  id: number;
  slug: string;
  chip?: string;
  title?: string;
  illustration?: string;
  contentPath?: string;
};

export function getAllCards(): Card[] {
  return cards as unknown as Card[];
}

export function getCardBySlug(slug: string): Card | undefined {
  return getAllCards().find(c => c.slug === slug);
}

export async function getCardMdxSource(card: Card): Promise<string> {
  const mdxFile = card.contentPath || `${card.slug}.mdx`;
  const filePath = path.join(process.cwd(), "content", mdxFile);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return `# Coming Soon\n\nWe’re still writing this story. Check back later!`;
  }
}
