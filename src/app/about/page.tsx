export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-[#4A4FCF] to-[#887ad1] bg-clip-text text-transparent">
          About Karushala
        </h1>
        <p className="mt-6 text-zinc-400 leading-relaxed">
          We bring handcrafted products directly from village artisans to customers—ranging from *Nakshi Kantha* (embroidered quilts) and bamboo crafts to pottery and jewelry. Our goal is to provide local artisans with fair market access and connect customers with authentic Bangladeshi craftsmanship.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Artisans", val: "500+" },
            { label: "Products", val: "3,000+" },
            { label: "Districts Covered", val: "40+" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center"
            >
              <div className="text-2xl font-bold text-[#B8AEEA]">{s.val}</div>
              <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}