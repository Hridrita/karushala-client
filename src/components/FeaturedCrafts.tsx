"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Star, ArrowRight, ShoppingBag, Heart, Eye, MapPin } from "lucide-react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

interface Craft {
  _id: string;
  title: string;
  price: number | string;
  rating?: number;
  images?: string[];
  district?: string;
  stock?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeaturedCrafts() {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);

    const fetchFeaturedCrafts = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        const res = await fetch(`${serverUrl}/api/crafts`);
        if (res.ok) {
          const data = await res.json();
          setCrafts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch featured crafts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCrafts();
  }, []);

  // ✅ Hydration fix: client-side rendering না হওয়া পর্যন্ত loading দেখান
  if (!isClient) {
    return (
      <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-4 space-y-4"
              >
                <div className="relative h-56 w-full rounded-xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/40" />
                <div className="space-y-2">
                  <div className="h-3 w-1/3 rounded-full bg-zinc-800/60" />
                  <div className="h-5 w-3/4 rounded-full bg-zinc-800/60" />
                  <div className="h-4 w-1/2 rounded-full bg-zinc-800/60" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 rounded-full bg-zinc-800/60" />
                  <div className="h-10 w-10 rounded-xl bg-zinc-800/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A4FCF]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-zinc-800/60 pb-10 md:flex-row md:items-end">
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="rounded-full border border-zinc-800/80 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA] backdrop-blur-sm">
                 Handpicked Masterpieces
              </span>
            </div>
            <h2
              style={{ fontFamily: "var(--font-fraunces)" }}
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-[#4A4FCF] via-[#887ad1] to-[#B8AEEA] bg-clip-text text-transparent italic">
                Craft Collections
              </span>
            </h2>
            <p className="max-w-md text-sm text-zinc-400 leading-relaxed">
              Explore the top-rated creations loved by art enthusiasts all over the country.
            </p>
          </div>

          <Link href="/all-craft">
            <motion.button
              whileHover={{ x: 4 }}
              className="group flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-[#B8AEEA] backdrop-blur-sm transition-all hover:border-[#4A4FCF]/50 hover:bg-[#4A4FCF]/10 hover:text-white"
            >
              View All Crafts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-4 space-y-4"
              >
                <div className="relative h-56 w-full rounded-xl bg-gradient-to-br from-zinc-800/60 to-zinc-900/40" />
                <div className="space-y-2">
                  <div className="h-3 w-1/3 rounded-full bg-zinc-800/60" />
                  <div className="h-5 w-3/4 rounded-full bg-zinc-800/60" />
                  <div className="h-4 w-1/2 rounded-full bg-zinc-800/60" />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-20 rounded-full bg-zinc-800/60" />
                  <div className="h-10 w-10 rounded-xl bg-zinc-800/60" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Real Data Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {crafts.map((craft, index) => {
              const displayRating = craft.rating ? Number(craft.rating).toFixed(1) : "5.0";
              const craftImage = craft.images?.[0] || "/placeholder.png";
              // ✅ Math.random() বাদ দিন - index ব্যবহার করুন
              const delay = (index % 4) * 0.08;

              return (
                <motion.div
                  key={craft._id}
                  variants={cardVariants}
                  transition={{ delay }}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-b from-zinc-900/40 to-zinc-950/40 p-0 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-[#4A4FCF]/40 hover:shadow-[0_12px_40px_rgba(74,79,207,0.15)] hover:from-zinc-900/60 hover:to-zinc-950/60"
                >
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-zinc-950/50">
                    <Image
                      src={craftImage}
                      alt={craft.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                      {craft.district && (
                        <div className="flex items-center gap-1 rounded-full bg-zinc-950/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-zinc-300 border border-zinc-800/50">
                          <MapPin className="h-3 w-3 text-[#B8AEEA]" />
                          {craft.district}
                        </div>
                      )}

                      <div className="flex items-center gap-1 rounded-full bg-zinc-950/70 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-zinc-300 border border-zinc-800/50">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{displayRating}</span>
                      </div>
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-3 right-12 rounded-full bg-zinc-950/60 backdrop-blur-sm p-1.5 opacity-0 transition-all duration-300 hover:bg-[#4A4FCF]/30 group-hover:opacity-100">
                      <Heart className="h-4 w-4 text-zinc-300 hover:text-rose-400 transition-colors" />
                    </button>

                    {/* Quick View Button */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:pb-4">
                      <Link href={`/all-craft/${craft._id}`}>
                        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-5 py-2 text-xs font-bold text-zinc-950 shadow-[0_4px_20px_rgba(74,79,207,0.3)] transition-all hover:scale-105">
                          <Eye className="h-3.5 w-3.5" />
                          Quick View
                        </button>
                      </Link>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4 pt-3">
                    <div className="flex-1">
                      <h3
                        style={{ fontFamily: "var(--font-fraunces)" }}
                        className="line-clamp-1 text-base font-semibold text-white group-hover:text-[#B8AEEA] transition-colors duration-300"
                      >
                        {craft.title}
                      </h3>

                      <div className="mt-1.5 flex items-center gap-2 text-xs text-zinc-500">
                        {craft.stock && craft.stock > 0 ? (
                          <>
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-medium">In Stock</span>
                          </>
                        ) : (
                          <span className="text-zinc-500">Handmade</span>
                        )}
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-zinc-800/50">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium">Price</span>
                        <p
                          style={{ fontFamily: "var(--font-fraunces)" }}
                          className="text-xl font-semibold text-white leading-tight"
                        >
                          ৳{craft.price}
                        </p>
                      </div>

                      <Link href={`/all-craft/${craft._id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-zinc-300 transition-all duration-300 hover:from-[#4A4FCF] hover:to-[#887ad1] hover:text-zinc-950 shadow-lg hover:shadow-[0_4px_20px_rgba(74,79,207,0.3)] overflow-hidden group/btn"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                          <ShoppingBag className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-[#4A4FCF]/20 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && crafts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-12">
              <div className="text-5xl mb-4">🎨</div>
              <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="text-xl font-semibold text-white">
                No crafts available yet
              </h3>
              <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                Be the first to showcase your masterpiece. Start crafting today!
              </p>
              <Link href="/add-craft">
                <button className="mt-4 rounded-full bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-all hover:scale-105">
                  Add Your Craft
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}