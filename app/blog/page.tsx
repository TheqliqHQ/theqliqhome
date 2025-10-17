import posts from "@/content/posts.json"
export default function BlogPage(){
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-3xl md:text-5xl font-extrabold">Theqliq Journal</h1>
      <p className="text-slate-600 mt-2">Skeleton posts — swap with real content later.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {posts.map(p => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="block rounded-card border border-slate-200 hover:border-slate-300 p-5 shadow-soft bg-white">
            <div className="text-xs uppercase tracking-wide text-slate-500">{new Date(p.date).toLocaleDateString()}</div>
            <h3 className="text-xl font-semibold mt-1">{p.title}</h3>
            <p className="text-slate-600 text-sm mt-2 line-clamp-3">{p.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  )
}
