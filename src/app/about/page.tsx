"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { isDemoUser } from "@/lib/demo-user";
import { toast } from "sonner";

export default function AboutPage() {
  const { data: session } = authClient.useSession();
  const isDemo = isDemoUser(session?.user?.email);

  const handleBecomeArtisanClick = (e: React.MouseEvent) => {
    if (isDemo) {
      e.preventDefault();
      toast.error("Demo users cannot add craft. Please create your own account.", {
        duration: 4000,
        style: {
          background: "#18181b",
          color: "#fbbf24",
          border: "1px solid #fbbf24/30",
        },
      });
    }
    // not logged in -> href already points to auth page below
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <span className="inline-block rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]">
          Our Story
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight bg-linear-to-r from-[#4A4FCF] to-[#887ad1] bg-clip-text text-transparent">
          About Karushala
        </h1>
        <p className="mt-6 text-lg text-zinc-400 leading-relaxed">
          We bring handcrafted products directly from village artisans to
          customers—ranging from{" "}
          <span className="text-zinc-200 font-medium">Nakshi Kantha</span>{" "}
          (embroidered quilts) and bamboo crafts to pottery and jewelry. Our
          goal is to provide local artisans with fair market access and
          connect customers with authentic Bangladeshi craftsmanship.
        </p>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Artisans", val: "500+" },
            { label: "Products", val: "3,000+" },
            { label: "Districts Covered", val: "40+" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-zinc-900 border border-zinc-800 p-6 text-center"
            >
              <div className="text-2xl font-bold text-[#B8AEEA]">{s.val}</div>
              <div className="text-sm text-zinc-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-white">Where It Started</h2>
          <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
            <p>
              Bangladesh&apos;s villages hold generations of craft
              knowledge—embroidery passed from mother to daughter, pottery
              wheels spun by the same families for decades, bamboo work that
              takes years to master. But most of these artisans never reach a
              customer beyond their local market, and middlemen often take
              the largest share of the value they create.
            </p>
            <p>
              Karushala started as a simple idea: build a direct bridge
              between the hands that make these crafts and the people who
              want to own something real. No unnecessary layers, no
              disappearing margins—just artisans, their work, and the people
              who value it.
            </p>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-white">What We Stand For</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Fair Access",
                desc: "Artisans set their own prices and keep the majority of every sale. No hidden middleman cuts.",
              },
              {
                title: "Authenticity",
                desc: "Every product is verified handmade—no mass production, no factory shortcuts.",
              },
              {
                title: "Craft Preservation",
                desc: "By creating demand for traditional techniques, we help keep dying crafts alive for the next generation.",
              },
              {
                title: "Trust & Transparency",
                desc: "Real seller profiles, verified reviews, and clear sourcing—so buyers know exactly who made what.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="rounded-xl bg-zinc-900/60 border border-zinc-800 p-6 hover:border-[#4A4FCF]/50 transition-colors"
              >
                <h3 className="text-base font-semibold text-[#B8AEEA]">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-2xl font-bold text-white">How Karushala Works</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                step: "01",
                title: "Artisans List Their Work",
                desc: "Verified artisans upload their crafts with photos, pricing, and the story behind each piece.",
              },
              {
                step: "02",
                title: "Buyers Discover & Connect",
                desc: "Customers browse by category, district, or rating to find authentic pieces that mean something.",
              },
              {
                step: "03",
                title: "Direct Support, Real Impact",
                desc: "Every purchase goes straight to the artisan's livelihood—no middlemen, no inflated margins.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <div className="shrink-0 text-2xl font-extrabold text-[#4A4FCF]/60">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 rounded-2xl border border-zinc-800 bg-linear-to-br from-[#4A4FCF]/10 to-[#B8AEEA]/5 p-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Join the Movement
          </h2>
          <p className="mt-3 text-zinc-400 max-w-md mx-auto">
            Whether you&apos;re an artisan looking to reach new buyers, or a
            customer looking for something real—Karushala is built for you.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/all-craft"
              className="rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 hover:opacity-90 transition-opacity"
            >
              Explore Crafts
            </Link>
            <Link
              href={session?.user ? "/add-craft" : "/auth/auth_page"}
              onClick={handleBecomeArtisanClick}
              className={`rounded-lg border px-6 py-2.5 text-sm font-bold transition-colors ${
                isDemo
                  ? "border-zinc-800 text-zinc-600 cursor-not-allowed opacity-50"
                  : "border-zinc-700 text-zinc-200 hover:border-[#4A4FCF]"
              }`}
            >
              Become an Artisan
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}