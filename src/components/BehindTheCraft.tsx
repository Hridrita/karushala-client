"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Hammer, Award, MapPin, Sparkles, Clock, Users, Star } from "lucide-react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const artisans = [
  {
    id: 1,
    name: "Monindra Chandra Pal",
    role: "Master Ceramist & Potter",
    experience: "35+ Years Experience",
    district: "Rajshahi",
    bio: "Specializes in terracotta revival and high-glaze traditional earthware casting passed down through generations.",
    image: "https://i.ibb.co.com/xSchW3JN/image.png",
    stat: "Heritage Legend",
    color: "from-amber-500/20 to-[#4A4FCF]/20",
    collectors: 38,
  },
  {
    id: 2,
    name: "Gouranga Chandra Dhar",
    role: "Heritage Stone Sculptor",
    experience: "28+ Years Experience",
    district: "Sylhet",
    bio: "Preserving ancient rock-carving techniques to design premium bespoke stone crafts and architectural tiles.",
    image: "https://i.ibb.co.com/Y4yDNWHt/image.png",
    stat: "Master Carver",
    color: "from-[#4A4FCF]/20 to-purple-500/20",
    collectors: 42,
  },
  {
    id: 3,
    name: "Alimuddin Mia",
    role: "Master Loom Weaver",
    experience: "42+ Years Experience",
    district: "Tangail",
    bio: "Weaving deep cultural narratives into premium threads of pure organic jamdani and traditional handloom patterns.",
    image: "https://i.ibb.co.com/WpzvckNz/image.png",
    stat: "National Awardee",
    color: "from-purple-500/20 to-[#B8AEEA]/20",
    collectors: 56,
  },
  {
    id: 4,
    name: "Kshitish Chandra Das",
    role: "Bamboo & Wood Artisan",
    experience: "30+ Years Experience",
    district: "Chittagong",
    bio: "Crafting sustainable luxury out of seasoned bamboo stalks and reclaimed premium teak wood elements.",
    image: "https://i.ibb.co.com/VWYb4kp3/image.png",
    stat: "Eco-Craft Pioneer",
    color: "from-[#B8AEEA]/20 to-emerald-500/20",
    collectors: 31,
  },
  {
    id: 5,
    name: "Noni Gopal Karmakar",
    role: "Brass & Metal Smith",
    experience: "38+ Years Experience",
    district: "Dhamrai",
    bio: "Forging pure brass and bronze into exquisite metal sculptures and high-end antique home decor pieces.",
    image: "https://i.ibb.co.com/0RgkmPpb/image.png",
    stat: "Metal Alchemist",
    color: "from-emerald-500/20 to-amber-500/20",
    collectors: 45,
  },
  {
    id: 6,
    name: "Basanti Bala Pal",
    role: "Nakshi Kantha & Textile Artist",
    experience: "25+ Years Experience",
    district: "Jessore",
    bio: "Stitching vibrant folklore tales and intricate heritage patterns onto fine handcrafted premium tapestries.",
    image: "https://i.ibb.co.com/zVnmB1GV/image.png",
    stat: "Folklore Queen",
    color: "from-amber-500/20 to-[#4A4FCF]/20",
    collectors: 29,
  },
];

const containerVariants : Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants : Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 10 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BehindTheCraft() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ Client-side rendering না হওয়া পর্যন্ত কিছু Render করবেন না
  if (!isClient) {
    return (
      <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-900/30 h-[500px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
      {/* ===== UNIQUE BACKGROUND EFFECTS ===== */}
      <div className="pointer-events-none absolute -top-40 -left-20 h-[35rem] w-[35rem] rounded-full bg-[#4A4FCF]/10 blur-[160px] animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-[#B8AEEA]/8 blur-[150px] animate-pulse [animation-delay:2s]" />

      {/* Diagonal Lines Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,#4A4FCF_40%,#4A4FCF_42%,transparent_42%,transparent_58%,#B8AEEA_58%,#B8AEEA_60%,transparent_60%)] bg-[size:60px_60px]" />
      </div>

      {/* Floating Orbs */}
      <div className="pointer-events-none absolute top-1/4 left-1/3 h-2 w-2 rounded-full bg-[#4A4FCF]/40 blur-[1px] animate-ping [animation-duration:4s]" />
      <div className="pointer-events-none absolute bottom-1/3 right-1/4 h-3 w-3 rounded-full bg-[#B8AEEA]/30 blur-[1px] animate-ping [animation-duration:5s] [animation-delay:1s]" />
      <div className="pointer-events-none absolute top-2/3 left-1/4 h-1.5 w-1.5 rounded-full bg-purple-500/25 blur-[1px] animate-ping [animation-duration:4.5s] [animation-delay:0.5s]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ===== SECTION HEADER ===== */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-5 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA] backdrop-blur-sm">
            <Hammer className="h-3.5 w-3.5" />
            The Soul of Our Heritage
            <Sparkles className="h-3 w-3 ml-1 text-amber-400/60" />
          </div>

          <h2
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Behind The{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] via-[#887ad1] to-[#B8AEEA] bg-clip-text text-transparent italic">
              Masterpieces
            </span>
          </h2>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
            Meet the visionary minds and seasoned hands breathing life into every raw stone, clay, and thread.
          </p>

          {/* Decorative Divider */}
          <div className="flex justify-center gap-1 pt-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`h-1 w-1 rounded-full ${i % 2 === 0 ? "bg-[#4A4FCF]/40" : "bg-[#B8AEEA]/40"} ${i === 2 ? "w-4" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* ===== ARTISANS GRID ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {artisans.map((artisan) => (
            <motion.div
              key={artisan.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.01 }}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/60 bg-gradient-to-br ${artisan.color} p-0 backdrop-blur-sm transition-all duration-500 hover:border-[#4A4FCF]/50 hover:shadow-[0_20px_60px_rgba(74,79,207,0.08)]`}
            >
              {/* ===== TOP HERO IMAGE ===== */}
              <div className="relative h-72 w-full overflow-hidden bg-zinc-950/50">
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    // ✅ Image load fail হলে placeholder দেখান
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder-artisan.jpg";
                  }}
                />

                {/* Layered Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#4A4FCF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ===== TOP BADGES ===== */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-950/80 backdrop-blur-sm px-3 py-1 text-[10px] font-semibold text-[#B8AEEA] border border-zinc-800/60">
                    <Award className="h-3 w-3 text-amber-400" />
                    {artisan.stat}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-zinc-950/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-zinc-400 border border-zinc-800/60">
                    <Clock className="h-3 w-3 text-[#4A4FCF]" />
                    {artisan.experience.split(" ")[0]}
                  </span>
                </div>

                {/* ===== BOTTOM OVERLAY STATS ===== */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-gradient-to-br from-[#4A4FCF] to-[#B8AEEA] flex items-center justify-center text-[8px] font-bold text-white"
                        >
                          <Users className="h-3 w-3" />
                        </div>
                      ))}
                    </div>
                    {/* ✅ Math.random() বাদ - fixed number ব্যবহার করুন */}
                    <span className="text-[10px] text-zinc-400">+{artisan.collectors} collectors</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-amber-400">
                    <Star className="h-3 w-3 fill-amber-400" />
                    <span>4.9</span>
                  </div>
                </div>
              </div>

              {/* ===== CONTENT ===== */}
              <div className="flex flex-col flex-1 p-5 pt-4">
                {/* Location & Experience */}
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span className="flex items-center gap-1 text-[#B8AEEA]/70">
                    <MapPin className="h-3.5 w-3.5" /> {artisan.district}, BD
                  </span>
                  <span className="text-zinc-600">{artisan.experience}</span>
                </div>

                {/* Name & Role */}
                <h3
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  className="mt-2 text-xl font-semibold text-white group-hover:text-[#B8AEEA] transition-colors duration-300"
                >
                  {artisan.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#4A4FCF] group-hover:text-[#887ad1] transition-colors">
                  {artisan.role}
                </p>

                {/* Bio */}
                <p className="mt-3 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors line-clamp-3">
                  {artisan.bio}
                </p>

                {/* ===== BOTTOM ACTION ===== */}
                <div className="mt-4 pt-3 border-t border-zinc-800/40 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500 transition-colors">
                    ✦ Master Artisan
                  </span>
                  <button className="group/btn relative flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/50 bg-zinc-800/30 text-zinc-500 transition-all duration-300 hover:border-[#4A4FCF]/40 hover:bg-[#4A4FCF]/20 hover:text-[#B8AEEA] overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-[#4A4FCF]/20 to-[#B8AEEA]/20 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
                    <svg className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h13M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* ===== DECORATIVE CORNER LINES ===== */}
                <div className="absolute bottom-0 right-0 h-12 w-12 rounded-tl-2xl border-t-2 border-r-2 border-transparent transition-all duration-500 group-hover:border-[#4A4FCF]/30" />
                <div className="absolute top-0 left-0 h-12 w-12 rounded-br-2xl border-b-2 border-l-2 border-transparent transition-all duration-500 group-hover:border-[#B8AEEA]/30" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}