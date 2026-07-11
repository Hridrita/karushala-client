"use client";

import { useState } from "react";
import { ChevronDown } from "@gravity-ui/icons";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How do I buy a handmade product from Karushala?",
    answer:
      "Browse categories or search for a craft, add it to your cart, and checkout securely. Once the artisan confirms your order, it'll be shipped directly to your address.",
  },
  {
    question: "How can I become a seller/artisan on Karushala?",
    answer:
      "Click 'Get Started' and sign up as a seller. You'll need to add your shop details and craft listings before your store goes live.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "We support bKash, Nagad, and major debit/credit cards for a smooth and secure checkout experience.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most handmade orders are delivered within 3-7 business days depending on your location and the artisan's processing time.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, most products are eligible for return within 3 days of delivery if damaged or not as described. Check each product page for specific policies.",
  },
  {
    question: "Are the products genuinely handmade?",
    answer:
      "Every seller is verified and each listing is reviewed to ensure it's an authentic, handmade product crafted by local artisans.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-zinc-950 py-20 px-4 sm:px-6 lg:px-8">
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B8AEEA]/10 blur-[120px]" />

      {/* subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#887ad1]">
            Support
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl mx-auto">
            Everything you need to know about buying and selling on Karushala
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#4A4FCF]/50 bg-zinc-900/60"
                    : "border-zinc-800 bg-zinc-900/30"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span
                    className={`text-base font-semibold transition-colors ${
                      isOpen ? "text-[#B8AEEA]" : "text-zinc-200"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#887ad1]" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}