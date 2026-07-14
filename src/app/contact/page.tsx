export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-100">Contact Us</h1>
        <p className="mt-4 text-zinc-400">Let us know if you have any questions.</p>

        <form className="mt-10 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#887ad1]"
          />
          <input
            type="email"
            placeholder="you@email.com"
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#887ad1]"
          />
          <textarea
            placeholder="Your message"
            rows={5}
            className="rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#887ad1] resize-none"
          />
          <button
            type="submit"
            className="bg-linear-to-r from-[#4A4FCF] to-[#887ad1] text-zinc-950 font-bold text-sm rounded-lg px-4 py-2.5 hover:opacity-90 active:scale-95 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}