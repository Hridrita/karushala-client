import CraftGallery from "@/components/CraftGallery";
import ReviewsSection from "@/components/ReviewsSection";
import Image from "next/image";
import Link from "next/link";

interface Craft {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  district: string;
  images: string[];
  createdAt?: string;
  rating?: number;
  reviews?: { name: string; comment: string; rating: number }[];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

const CraftDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts/${id}`,
    { cache: "no-store" }
  );
  const craft: Craft = await res.json();

  let related: Craft[] = [];
  if (craft?.category) {
    const relRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts?category=${craft.category}`,
      { cache: "no-store" }
    );
    const relData: Craft[] = await relRes.json();
    related = relData.filter((c) => c._id !== id).slice(0, 4);
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 py-16">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Image gallery */}
          <CraftGallery images={craft.images} title={craft.title} />

          {/* Overview */}
          <div>
            <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]">
              {craft.category}
            </span>
            <h1 className="mt-4 text-3xl font-extrabold text-white">
              {craft.title}
            </h1>

            <div className="mt-3 flex items-center gap-3 text-sm text-zinc-400">
              <span className="text-xl font-bold text-[#B8AEEA]">
                ৳{craft.price}
              </span>
              {craft.rating && <span>★ {craft.rating}</span>}
              <span>•</span>
              <span>{craft.district}</span>
            </div>

            <p className="mt-6 leading-relaxed text-zinc-400">
              {craft.description}
            </p>

            <button className="mt-8 w-full rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_4px_20px_rgba(74,79,207,0.3)] transition-opacity hover:opacity-90 sm:w-auto sm:px-10">
              Contact Seller
            </button>
          </div>
        </div>

        {/* Key info / specs */}
        <div className="mt-16 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white">Key Information</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
            <div>
              <p className="text-xs text-zinc-500">Category</p>
              <p className="mt-1 font-semibold text-zinc-200">
                {craft.category}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">District</p>
              <p className="mt-1 font-semibold text-zinc-200">
                {craft.district}
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Stock</p>
              <p className="mt-1 font-semibold text-zinc-200">
                {craft.stock} available
              </p>
            </div>
            {craft.createdAt && (
              <div>
                <p className="text-xs text-zinc-500">Listed On</p>
                <p className="mt-1 font-semibold text-zinc-200">
                  {new Date(craft.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <ReviewsSection craftId={id} initialReviews={craft.reviews || []}></ReviewsSection>

        {/* Related items */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-white">Related Crafts</h2>
            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r._id}
                  href={`/all-craft/${r._id}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 transition-transform hover:-translate-y-1"
                >
                  <div className="relative h-40 w-full">
                    <Image
                      src={r.images?.[0] || "/placeholder.png"}
                      alt={r.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-1 text-sm font-bold text-white">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#B8AEEA]">
                      ৳{r.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CraftDetailsPage;