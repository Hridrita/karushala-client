import Image from "next/image";
import Link from "next/link";

interface Craft {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  district: string;
  images: string[];
  createdAt?: string;
  rating?: number;
}

const AllCraftsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts`);
  const data: Craft[] = await res.json();

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 py-16">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]">
            Explore
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            All{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent">
              Crafts
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.map((craft) => (
            <div
              key={craft._id}
              className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-transform hover:-translate-y-1"
            >
              <div className="relative h-48 w-full shrink-0">
                <Image
                  src={craft.images?.[0] || "/placeholder.png"}
                  alt={craft.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-1 text-sm font-bold text-white">
                  {craft.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  {craft.rating ? `★ ${craft.rating.toFixed(1)}` : "No ratings yet"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="font-semibold text-[#B8AEEA]">
                    Tk {craft.price}
                  </span>
                  <span>•</span>
                  <span>{craft.district}</span>
                  {/* {craft.rating && (
                    <>
                      <span>•</span>
                      <span>★ {craft.rating}</span>
                    </>
                  )} */}
                  {craft.createdAt && (
                    <>
                      <span>•</span>
                      <span>
                        {new Date(craft.createdAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>

                <Link
                  href={`/all-craft/${craft._id}`}
                  className="mt-4 w-full rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-4 py-2 text-center text-xs font-bold text-zinc-950 transition-opacity hover:opacity-90"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCraftsPage;