const CraftDetailsLoading = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 py-16">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="aspect-square w-full rounded-2xl bg-zinc-900/60" />
          <div className="space-y-4">
            <div className="h-6 w-24 rounded-full bg-zinc-900/60" />
            <div className="h-8 w-2/3 rounded-lg bg-zinc-900/60" />
            <div className="h-4 w-1/3 rounded-lg bg-zinc-900/60" />
            <div className="h-24 w-full rounded-lg bg-zinc-900/60" />
            <div className="h-12 w-40 rounded-lg bg-zinc-900/60" />
          </div>
        </div>
        <div className="mt-16 h-32 w-full rounded-2xl bg-zinc-900/40" />
        <div className="mt-10 h-64 w-full rounded-2xl bg-zinc-900/40" />
      </div>
    </section>
  );
};

export default CraftDetailsLoading;