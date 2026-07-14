"use client";

import { motion } from "framer-motion";
import { Fraunces } from "next/font/google";
import { Sprout, Hammer, Stamp, Sparkles } from "lucide-react";


const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});


const steps = [
  {
    id: 1,
    phase: "PHASE 01",
    title: "Ethical Sourcing",
    subtitle: "Pure materials, gathered by hand",
    desc: "We travel into the deepest artisan roots of Bangladesh to source organic clays, pure generational brass alloys, and hand-spun natural threads without any chemical synthesis.",
    icon: Sprout,
    accent: "#4A4FCF",
  },
  {
    id: 2,
    phase: "PHASE 02",
    title: "Patient Handcrafting",
    subtitle: "Time, not machinery, shapes each piece",
    desc: "Zero mass-machinery. Every texture is hand-carved, every thread is hand-woven, and every metal is fire-forged over hundreds of hours by master generational artisans.",
    icon: Hammer,
    accent: "#B8AEEA",
  },
  {
    id: 3,
    phase: "PHASE 03",
    title: "The Authentic Seal",
    subtitle: "Karunshala's mark of recognition",
    desc: "Before leaving the workshop, each masterpiece passes a rigorous heritage-grade check and is embedded with the hallmark signature seal of Karunshala authenticity.",
    icon: Stamp,
    accent: "#D4A84B",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function TheKarunshalaWay() {
  return (
    <section className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8`}>
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[45rem] w-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4A4FCF]/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]">
            <Sparkles className="h-3.5 w-3.5" /> The Craft Chronicle // Our Process
          </div>
          <h2
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            The{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent italic">
              Karushala
            </span>{" "}
            Way
          </h2>
          <p className="mx-auto max-w-xl text-sm sm:text-base text-zinc-400">
            From raw elements to timeless heritage art pieces. We don&apos;t just manufacture; we preserve the sacred timeline of traditional craft.
          </p>
        </div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6"
        >
          {/* Hand-stitched connecting thread — a nod to Nakshi Kantha embroidery,
              instead of a generic gradient line */}
          <svg
            className="hidden lg:block absolute top-[4.5rem] left-12 right-12 w-[calc(100%-6rem)] h-[2px] z-0"
            preserveAspectRatio="none"
            viewBox="0 0 100 2"
          >
            <line
              x1="0"
              y1="1"
              x2="100"
              y2="1"
              stroke="url(#threadGradient)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <defs>
              <linearGradient id="threadGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4A4FCF" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#B8AEEA" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D4A84B" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((step) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={step.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className="group relative z-10 flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6 sm:p-8 backdrop-blur-md transition-all duration-300"
                style={{ borderColor: "rgba(39,39,42,1)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${step.accent}4D`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(39,39,42,1)")}
              >
                <div>
                  {/* Top bar: phase label + icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono tracking-widest text-zinc-500 transition-colors"
                      style={{ color: undefined }}
                    >
                      <span className="group-hover:hidden">{step.phase}</span>
                      <span className="hidden group-hover:inline" style={{ color: step.accent }}>
                        {step.phase}
                      </span>
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-950 text-zinc-400 transition-all duration-300 group-hover:text-white"
                      style={{ boxShadow: "none" }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${step.accent}1A`)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#09090b")}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Titles */}
                  <div className="mt-6 space-y-1.5">
                    <span className="text-[11px] font-mono text-zinc-600 uppercase tracking-wider block">
                      Step 0{step.id}
                    </span>
                    <h3
                      style={{ fontFamily: "var(--font-fraunces)" }}
                      className="text-xl font-semibold text-white tracking-wide transition-colors"
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{ fontFamily: "var(--font-fraunces)", color: step.accent }}
                      className="text-xs italic font-medium tracking-wide"
                    >
                      {step.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom light panel on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0 transition-all duration-500 ease-out group-hover:w-full"
                  style={{ background: `linear-gradient(to right, ${step.accent}, #B8AEEA)` }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
