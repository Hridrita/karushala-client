import { ShieldCheck, Lock, FileText, EnvelopeOpen } from "@gravity-ui/icons";

const sections = [
  {
    icon: Lock,
    title: "Data We Collect",
    body: "Name, email, phone, shipping address, order history — collect kori just service provide korte. Payment info direct amra store kori na, gateway (bKash/Nagad/Card) handle kore.",
  },
  {
    icon: ShieldCheck,
    title: "How We Use It",
    body: "Order process, delivery update, customer support, r platform improve korte data use hoy. Marketing email off korte pare je kono somoy.",
  },
  {
    icon: FileText,
    title: "Data Sharing",
    body: "Kono third party r kache sell kori na. Shudhu delivery partner r payment gateway k proyojonio info share kori order fulfill korte.",
  },
  {
    icon: EnvelopeOpen,
    title: "Your Rights",
    body: "Nijer data dekhte, update korte, ba delete request korte paro je kono somoy support@karushala.com e mail kore.",
  },
];

const terms = [
  "You must provide accurate information when creating an account. Creating an account with false information is prohibited.",
  "Fraud, misleading information, or copyright violations in product listings are strictly prohibited.",
  "Sellers must maintain product quality and delivery timelines.",
  "Crucial may update the terms from time to time; you will be notified via email in the event of major changes.",
  "Violating the rules may result in your account being suspended or banned.",
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-[#887ad1] bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5">
            Legal
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-zinc-100">
            Privacy &amp;{" "}
            <span className="bg-linear-to-r from-[#4A4FCF] to-[#887ad1] bg-clip-text text-transparent">
              Terms
            </span>
          </h1>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            How your data is used and the rules for using the platform—everything is clearly explained here.
          </p>
        </div>

        {/* Privacy Policy */}
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-linear-to-b from-[#4A4FCF] to-[#887ad1]" />
            Privacy Policy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sections.map(({ icon: Icon, title, body }, i) => (
              <div
                key={i}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-[#4A4FCF]/50 transition-colors"
              >
                <span className="inline-flex p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[#887ad1] mb-4">
                  <Icon width={18} height={18} />
                </span>
                <h3 className="font-bold text-zinc-100">{title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terms of Service */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-linear-to-b from-[#4A4FCF] to-[#887ad1]" />
            Terms of Service
          </h2>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8">
            <ol className="flex flex-col gap-4">
              {terms.map((t, i) => (
                <li key={i} className="flex gap-4 text-sm text-zinc-400 leading-relaxed">
                  <span className="shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-linear-to-r from-[#4A4FCF] to-[#887ad1] text-zinc-950 text-xs font-bold">
                    {i + 1}
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-14 text-center text-xs text-zinc-500">
          Last updated: July 2026 • If you have any questions{" "}
          <a href="mailto:support@karushala.com" className="text-[#887ad1] hover:underline">
            support@karushala.com
          </a>{" "}
          Email here.
        </p>
      </div>
    </main>
  );
}