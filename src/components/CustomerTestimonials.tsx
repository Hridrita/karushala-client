"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Star, Quote, Sparkles, ArrowRight, Award, Heart } from "lucide-react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

interface Review {
  _id?: string;
  name: string;
  comment: string;
  rating: number;
  craftTitle?: string;
}

const containerVariants:Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function CustomerTestimonials() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reviews/public`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const fetchedReviews = Array.isArray(data) ? data : data.reviewsData || [];
        setReviews(fetchedReviews.slice(0, 6));
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to load reviews");
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
      {/* ===== ENHANCED BACKGROUND EFFECTS ===== */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[#4A4FCF]/15 blur-[180px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[35rem] w-[35rem] rounded-full bg-[#B8AEEA]/10 blur-[160px] animate-pulse [animation-delay:2s]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A4FCF]/5 blur-[130px]" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-[#4A4FCF]/30 blur-[2px] animate-ping [animation-duration:3s]" />
        <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-[#B8AEEA]/25 blur-[2px] animate-ping [animation-duration:4s] [animation-delay:1s]" />
        <div className="absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full bg-purple-500/20 blur-[2px] animate-ping [animation-duration:3.5s] [animation-delay:0.5s]" />
        <div className="absolute top-2/3 right-1/4 h-1.5 w-1.5 rounded-full bg-emerald-500/20 blur-[2px] animate-ping [animation-duration:4.5s] [animation-delay:1.5s]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ===== ENHANCED SECTION HEADER ===== */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-block rounded-full border border-zinc-800/80 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA] backdrop-blur-sm">
              Words From Our Collectors
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-medium text-amber-400">
              <Sparkles className="h-3 w-3" />
              Authentic
            </span>
          </div>

          <h2
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            What Our{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] via-[#887ad1] to-[#B8AEEA] bg-clip-text text-transparent italic">
              Customers Say
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-base text-zinc-400 leading-relaxed">
            Discover how art lovers around the country feel about their unique heritage pieces and artisanal experience.
          </p>

          {/* Decorative Line */}
          <div className="flex justify-center gap-2 pt-2">
            <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-transparent to-[#4A4FCF]/40" />
            <span className="h-0.5 w-12 rounded-full bg-gradient-to-r from-[#4A4FCF]/40 to-[#B8AEEA]/40" />
            <span className="h-0.5 w-8 rounded-full bg-gradient-to-r from-[#B8AEEA]/40 to-transparent" />
          </div>
        </div>

        {/* ===== LOADING SKELETON ===== */}
        {isLoading ? (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-6 space-y-4 h-56" />
            ))}
          </div>
        ) : error ? (
          <div className="mt-16 text-center text-red-400 text-sm">{error}</div>
        ) : reviews.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="inline-block rounded-2xl border border-zinc-800/60 bg-zinc-900/30 p-8">
              <div className="text-5xl mb-4">💬</div>
              <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="text-lg font-semibold text-white">
                No Reviews Yet
              </h3>
              <p className="text-sm text-zinc-400 mt-1 max-w-md mx-auto">
                Be the first to share your experience with our artisans
              </p>
            </div>
          </div>
        ) : (
          /* ===== ENHANCED TESTIMONIALS GRID ===== */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {reviews.map((review, idx) => {
              const initials = review.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
              const colors = [
                "from-blue-500/20 to-[#4A4FCF]/20",
                "from-[#4A4FCF]/20 to-purple-500/20",
                "from-purple-500/20 to-[#B8AEEA]/20",
                "from-[#B8AEEA]/20 to-emerald-500/20",
                "from-emerald-500/20 to-[#4A4FCF]/20",
                "from-[#4A4FCF]/20 to-blue-500/20",
              ];
              const colorIndex = idx % colors.length;

              return (
                <motion.div
                  key={review._id || idx}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-br ${colors[colorIndex]} p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4A4FCF]/40 hover:shadow-[0_12px_40px_rgba(74,79,207,0.08)]`}
                >
                  {/* Top Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4A4FCF]/60 via-[#B8AEEA]/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Decorative Quote Icon */}
                  <Quote className="absolute -right-2 -top-2 h-16 w-16 text-zinc-800/30 transition-all duration-300 group-hover:text-[#4A4FCF]/10 group-hover:scale-110 pointer-events-none" />

                  {/* Rating Badge */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(review.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-zinc-700"
                          } transition-all duration-300 group-hover:scale-110`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-zinc-500 ml-1">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Review Text */}
                  <div className="flex-1 mt-3">
                    <p className="text-sm leading-relaxed text-zinc-300 group-hover:text-zinc-200 transition-colors line-clamp-4">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="mt-5 pt-4 border-t border-zinc-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4A4FCF] to-[#887ad1] text-xs font-bold text-white shadow-[0_2px_10px_rgba(74,79,207,0.3)] transition-transform duration-300 group-hover:scale-110">
                        {initials}
                        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500/90 border-2 border-zinc-950 flex items-center justify-center">
                          <Award className="h-2 w-2 text-white" />
                        </span>
                      </div>

                      <div>
                        <h4
                          style={{ fontFamily: "var(--font-fraunces)" }}
                          className="text-sm font-semibold text-white group-hover:text-[#B8AEEA] transition-colors"
                        >
                          {review.name}
                        </h4>
                        {review.craftTitle && (
                          <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
                            <span className="text-emerald-400">●</span> {review.craftTitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* View Button */}
                    <button className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800/30 text-zinc-500 transition-all duration-300 group-hover:border-[#4A4FCF]/40 group-hover:bg-[#4A4FCF]/20 group-hover:text-[#B8AEEA] group-hover:scale-110">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4A4FCF]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* ===== BOTTOM CTA ===== */}
        {!isLoading && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <button className="group flex items-center gap-2 rounded-full border border-zinc-800/60 bg-zinc-900/40 px-6 py-2.5 text-sm font-medium text-zinc-400 backdrop-blur-sm transition-all hover:border-[#4A4FCF]/40 hover:bg-[#4A4FCF]/10 hover:text-white">
              <Heart className="h-4 w-4 text-[#4A4FCF]/60 group-hover:text-[#4A4FCF]" />
              Join Our Community
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}