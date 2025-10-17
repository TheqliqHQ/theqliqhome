import posts from "@/content/posts.json"
import { notFound } from "next/navigation"
export default function Post({ params }: { params: { slug: string } }){
  const post = posts.find(p => p.slug === params.slug)
  if(!post) return notFound()
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <a href="/blog" className="text-sm text-slate-500">← Back</a>
      <h1 className="text-3xl md:text-5xl font-extrabold mt-2">{post.title}</h1>
      <div className="text-xs uppercase tracking-wide text-slate-500 mt-2">{new Date(post.date).toLocaleDateString()}</div>
      <article className="prose max-w-none mt-6">
        <p>{post.excerpt}</p>
        <p>{post.body}</p>
      </article>
    </main>
  )
}
