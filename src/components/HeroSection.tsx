"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Fraunces } from "next/font/google";
import { isDemoUser } from "@/lib/demo-user";
import { toast } from "sonner";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const craftImages = [
  {
    src: "/assest/hero/Nakshi Kantha with women.jpg",
    alt: "Nakshi Kantha embroidery",
  },
  { src: "/assest/hero/pot.jpg", alt: "Handmade pottery" },
  { src: "/assest/hero/matir pots.jpg", alt: "Handmade pottery" },
  { src: "/assest/hero/jwellery.png", alt: "Handmade jewelry" },
];

const container:Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp:Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants:Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const isDemo = isDemoUser(session?.user?.email);

  const handleBecomeArtisan = () => {
    if (isDemo) {
      toast.error(
        "Demo users cannot add crafts. Please create your own account.",
        {
          duration: 4000,
          style: {
            background: "linear-gradient(135deg, #1a1a1a, #2d1b1b)",
            color: "#ffd700",
            border: "1px solid rgba(255, 215, 0, 0.3)",
            boxShadow:
              "0 8px 32px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 215, 0, 0.1)",
            borderRadius: "12px",
            padding: "14px 20px",
            fontSize: "14px",
            fontWeight: "500",
          },
        },
      );
      return;
    }

    if (session?.user) {
      router.push("/add-craft");
    } else {
      router.push("/auth/auth_page?callbackUrl=/add-craft");
    }
  };

  return (
    <section
      className={`${fraunces.variable} relative overflow-hidden bg-zinc-950 min-h-screen flex items-center`}
    >
      {/* ambient glow blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8">
        {/* Left: copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="w-fit rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]"
          >
            Village artisans, city markets
          </motion.span>

          <motion.h1
            variants={fadeUp}
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Handmade craft,{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent italic">
              real hands.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            From nakshi kantha to bamboo craft, pottery to jewelry — handmade by
            local artisans across Bangladesh, now just a click away.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
            <Link href={"/all-craft"}>
              <button className="rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_4px_20px_rgba(74,79,207,0.3)] transition-all hover:opacity-90 active:scale-95">
                Explore Crafts
              </button>
            </Link>
            <button
              onClick={handleBecomeArtisan}
              className="rounded-lg border border-zinc-700 bg-zinc-900/40 px-6 py-3 text-sm font-bold text-zinc-200 transition-all hover:border-[#887ad1]/50 hover:text-[#B8AEEA] active:scale-95"
            >
              Become an Artisan
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-8 pt-4">
            <div>
              <p
                style={{ fontFamily: "var(--font-fraunces)" }}
                className="text-2xl font-semibold text-white"
              >
                500+
              </p>
              <p className="text-xs text-zinc-500">Artisans</p>
            </div>
            <div>
              <p
                style={{ fontFamily: "var(--font-fraunces)" }}
                className="text-2xl font-semibold text-white"
              >
                2,000+
              </p>
              <p className="text-xs text-zinc-500">Handmade Products</p>
            </div>
            <div>
              <p
                style={{ fontFamily: "var(--font-fraunces)" }}
                className="text-2xl font-semibold text-white"
              >
                64
              </p>
              <p className="text-xs text-zinc-500">Districts Covered</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: floating craft image grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative grid grid-cols-2 gap-5"
        >
          {craftImages.map((img, i) => (
            <motion.div
              key={img.src}
              variants={cardVariants}
              className={i === 0 || i === 3 ? "mt-8" : ""}
            >
              <motion.div
                animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={280}
                  height={280}
                  className="h-48 w-full object-cover sm:h-56"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          ))}

          {/* glow ring behind grid */}
          <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#4A4FCF]/10 blur-[80px]" />
        </motion.div>
      </div>
    </section>
  );
}
