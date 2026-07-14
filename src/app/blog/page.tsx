export default function BlogPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100">Blog</h1>
        <p className="mt-6 text-zinc-400 leading-relaxed">
          Artisan stories, craft-making tips, and crucial updates—you'll find it all here.
        </p>
        <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
          No posts yet. Stay tuned!
        </div>
      </div>
    </main>
  );
}