"use client";

import { motion,Variants } from "framer-motion";
import { Users, ShieldCheck, Map, HeartHandshake, Sparkles } from "lucide-react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

// ইমপ্যাক্ট ডেটা স্ট্রাকচার
const impactStats = [
  {
    id: 1,
    number: "12K+",
    title: "Happy Customers",
    desc: "Delivering smiles and premium quality craftwork nationwide.",
    icon: Users,
    color: "from-blue-500/20 to-[#4A4FCF]/20",
    borderColor: "border-blue-500/20",
    glowColor: "bg-blue-500/10",
  },
  {
    id: 2,
    number: "450+",
    title: "Artisans Empowered",
    desc: "Supporting rural families and keeping heritage alive.",
    icon: HeartHandshake,
    color: "from-[#4A4FCF]/20 to-[#B8AEEA]/20",
    borderColor: "border-[#4A4FCF]/20",
    glowColor: "bg-[#4A4FCF]/10",
  },
  {
    id: 3,
    number: "64",
    title: "Districts Reached",
    desc: "Connecting deep-rooted local heritage from every corner.",
    icon: Map,
    color: "from-[#B8AEEA]/20 to-purple-500/20",
    borderColor: "border-purple-500/20",
    glowColor: "bg-purple-500/10",
  },
  {
    id: 4,
    number: "99.2%",
    title: "Satisfaction Rate",
    desc: "Top-tier reliability and praised customer experience.",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-[#4A4FCF]/20",
    borderColor: "border-emerald-500/20",
    glowColor: "bg-emerald-500/10",
  },
];

// Staggered Animation Configurations
const containerVariants:Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function OurImpact() {
  return (
    <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
      {/* ===== ENHANCED BACKGROUND EFFECTS ===== */}

      {/* Main Ambient Glow - Top Left */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-[#4A4FCF]/15 blur-[180px] animate-pulse" />

      {/* Main Ambient Glow - Bottom Right */}
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[35rem] w-[35rem] rounded-full bg-[#B8AEEA]/10 blur-[160px] animate-pulse [animation-delay:2s]" />

      {/* Accent Glow - Top Right */}
      <div className="pointer-events-none absolute -top-20 right-1/4 h-[20rem] w-[20rem] rounded-full bg-purple-500/8 blur-[120px]" />

      {/* Accent Glow - Bottom Left */}
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-[20rem] w-[20rem] rounded-full bg-emerald-500/6 blur-[120px]" />

      {/* Floating Particles/Sparkles Effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-[#4A4FCF]/30 blur-[2px] animate-ping [animation-duration:3s]" />
        <div className="absolute top-1/3 right-1/3 h-1.5 w-1.5 rounded-full bg-[#B8AEEA]/25 blur-[2px] animate-ping [animation-duration:4s] [animation-delay:1s]" />
        <div className="absolute bottom-1/4 left-1/3 h-1 w-1 rounded-full bg-purple-500/20 blur-[2px] animate-ping [animation-duration:3.5s] [animation-delay:0.5s]" />
        <div className="absolute top-2/3 right-1/4 h-1.5 w-1.5 rounded-full bg-emerald-500/20 blur-[2px] animate-ping [animation-duration:4.5s] [animation-delay:1.5s]" />
        <div className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-[#4A4FCF]/10 blur-[3px] animate-pulse [animation-duration:5s]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Title - Enhanced with decorative elements */}
        <div className="mx-auto max-w-3xl text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-block rounded-full border border-zinc-800/80 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA] backdrop-blur-sm">
               Real Numbers, Real Trust
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-medium text-amber-400">
              <Sparkles className="h-3 w-3" />
              Growing
            </span>
          </div>
          <h2
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Making an{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] via-[#887ad1] to-[#B8AEEA] bg-clip-text text-transparent italic">
              Impact That Matters
            </span>
          </h2>
          <div className="relative">
            <p className="mx-auto max-w-xl text-base text-zinc-400 leading-relaxed">
              We bridge the gap between traditional craftsmanship and modern elegance, driving sustainable growth for local communities.
            </p>
            {/* Decorative underline */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-20 bg-gradient-to-r from-transparent via-[#4A4FCF]/30 to-transparent rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {impactStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl border ${stat.borderColor} bg-gradient-to-br from-zinc-900/30 to-zinc-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4A4FCF]/40 hover:bg-zinc-900/50 hover:shadow-[0_8px_40px_rgba(74,79,207,0.08)]`}
              >
                {/* Decorative Background Glow per card */}
                <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full ${stat.glowColor} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100`} />

                {/* Card Top Border Gradient (animated) */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] transition-all duration-700 group-hover:w-full" />

                {/* Card Icon Container - Enhanced */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 text-[#B8AEEA] transition-all duration-300 group-hover:border-[#4A4FCF]/40 group-hover:text-white group-hover:from-[#4A4FCF]/20 group-hover:to-[#B8AEEA]/10 shadow-lg">
                  <IconComponent className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                  {/* Icon Background Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4A4FCF]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Stats Text */}
                <div className="mt-6 space-y-2 relative">
                  <h3
                    style={{ fontFamily: "var(--font-fraunces)" }}
                    className="text-4xl font-semibold tracking-tight text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#B8AEEA]"
                  >
                    {stat.number}
                    {stat.id === 4 && <span className="text-lg text-emerald-400 ml-1">★</span>}
                  </h3>
                  <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">
                    {stat.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    {stat.desc}
                  </p>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] transition-all duration-500 group-hover:w-full" />

                {/* Card Number Badge (subtle) */}
                <div className="absolute top-3 right-3 text-[8px] font-bold text-zinc-700/50 group-hover:text-zinc-600/50 transition-colors">
                  #{String(stat.id).padStart(2, '0')}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Decorative Element */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-700/50" />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A4FCF]/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#B8AEEA]/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A4FCF]/20" />
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-700/50" />
          </div>
        </div>
      </div>
    </section>
  );
}