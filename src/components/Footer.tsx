import Link from "next/link";
import Image from "next/image";
import { Envelope, Handset, MapPin, ArrowRight } from "@gravity-ui/icons";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

type SocialLink = {
  icon: IconType;
  href: string;
};

type FooterLink = {
  label: string;
  href: string;
};

export default function Footer(): React.JSX.Element {
  const year: number = new Date().getFullYear();

  const socials: SocialLink[] = [
    { icon: FaFacebook, href: "https://facebook.com" },
    { icon: FaInstagram, href: "https://instagram.com" },
    { icon: FaSquareXTwitter, href: "https://twitter.com" },
  ];

  const quickLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Explore Crafts", href: "/explore" },
    { label: "Add Craft", href: "/items/add" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const companyLinks: FooterLink[] = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy / Terms", href: "/privacy" },
  ];

  return (
    <footer className="relative w-full bg-zinc-950">
      {/* top gradient hairline */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-[#4A4FCF] to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 mb-12 border-b border-zinc-800/80">
          <div>
            <h3 className="text-lg font-bold text-zinc-100">Stay in the loop</h3>
            <p className="text-sm text-zinc-400 mt-1">
              Get the latest craft and artisan stories first.
            </p>
          </div>
          <form className="flex w-full md:w-auto items-center gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full md:w-64 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#887ad1] transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-linear-to-r from-[#4A4FCF] to-[#887ad1] text-zinc-950 font-bold text-sm rounded-lg px-4 py-2.5 shadow-[0_4px_20px_rgba(74,79,207,0.25)] hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
            >
              Subscribe <ArrowRight width={14} height={14} />
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <Image
                src="/assest/logo.png"
                alt="Karushala Logo"
                width={44}
                height={44}
                className="h-10 w-auto object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-[#4A4FCF] to-[#887ad1] bg-clip-text text-transparent">
                Karushala
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Products handcrafted by village artisans are now within your reach.
              Nakshi Kantha, bamboo crafts, pottery, jewelry — all in one place.
            </p>
            <div className="flex items-center gap-3 mt-1">
              {socials.map(({ icon: Icon, href }: SocialLink, i: number) => (
                <Link
                  key={i}
                  href={href}
                  target="_blank"
                  className="group p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#887ad1] hover:border-[#4A4FCF]/50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-100 mb-5 uppercase tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((item: FooterLink) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-[#887ad1] hover:pl-1 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-100 mb-5 uppercase tracking-wider">Company</h3>
            <ul className="flex flex-col gap-3.5">
              {companyLinks.map((item: FooterLink) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-zinc-400 hover:text-[#887ad1] hover:pl-1 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-100 mb-5 uppercase tracking-wider">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-zinc-400">
                <span className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 shrink-0">
                  <MapPin width={14} height={14} className="text-[#887ad1]" />
                </span>
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 shrink-0">
                  <Envelope width={14} height={14} className="text-[#887ad1]" />
                </span>
                <a href="mailto:support@karushala.com" className="hover:text-[#887ad1] transition-colors">
                  support@karushala.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <span className="p-1.5 rounded-md bg-zinc-900 border border-zinc-800 shrink-0">
                  <Handset width={14} height={14} className="text-[#887ad1]" />
                </span>
                <a href="tel:+8801XXXXXXXXX" className="hover:text-[#887ad1] transition-colors">
                  +880 1XXX-XXXXXX
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            &copy; {year} Karushala. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Made with ❤️ for local artisans of Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
}