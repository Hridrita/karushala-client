"use client";

import { useEffect, useMemo, useState } from "react";
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

const AllCraftsPage = () => {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchCrafts = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts`);
      const data: Craft[] = await res.json();
      setCrafts(data);
      setLoading(false);
    };
    fetchCrafts();
  }, []);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(crafts.map((c) => c.category).filter(Boolean)))],
    [crafts],
  );

  const districts = useMemo(
    () => ["all", ...Array.from(new Set(crafts.map((c) => c.district).filter(Boolean)))],
    [crafts],
  );

  const filteredCrafts = useMemo(() => {
    let result = [...crafts];

    // search filter (title + description)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q),
      );
    }

    // category filter
    if (category !== "all") {
      result = result.filter((c) => c.category === category);
    }

    // district filter
    if (district !== "all") {
      result = result.filter((c) => c.district === district);
    }

    // sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime(),
        );
        break;
      case "newest":
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        );
        break;
    }

    return result;
  }, [crafts, search, category, district, sortBy]);

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

        {/* Search + Filter + Sort bar */}
        <div className="mb-10 flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crafts..."
            className="flex-1 min-w-[180px] rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-[#4A4FCF] focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-[#4A4FCF] focus:outline-none"
          >
            {districts.map((d) => (
              <option key={d} value={d}>
                {d === "all" ? "All Districts" : d}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:border-[#4A4FCF] focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-zinc-400">Loading...</p>
        ) : filteredCrafts.length === 0 ? (
          <p className="text-center text-zinc-400">No crafts found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCrafts.map((craft) => (
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
        )}
      </div>
    </section>
  );
};

export default AllCraftsPage;