"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Explore Crafts", href: "/explore" },
    { label: "Add Craft", href: "/items/add" },
    { label: "Manage Store", href: "/items/manage" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/assest/logo.png"
              alt="Karushala Logo"
              width={52}
              height={52}
              className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
            <span className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-[#4A4FCF] to-[#887ad1] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(74,79,207,0.35)]">
              Karushala
            </span>
          </Link>
        </div>

        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-sm font-medium text-zinc-300 hover:text-[#887ad1] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

       
        <div className="flex items-center gap-4">
          
          
          <div className="hidden md:flex items-center gap-3">
          
            
            <Link
              href="/auth/auth_page"
              className="bg-linear-to-r from-[#4A4FCF] to-[#887ad1] hover:opacity-90 text-zinc-950 font-bold text-sm rounded-lg px-4 py-2 shadow-[0_4px_20px_rgba(74,79,207,0.25)] transition-all active:scale-95 whitespace-nowrap"
            >
              Get Started
            </Link>
          </div>

          
          <button
            onClick={() => setOpen(!open)}
            className="relative flex flex-col items-center justify-center size-9 md:hidden text-zinc-400 hover:text-[#887ad1] rounded-md hover:bg-zinc-900 transition-all focus:outline-none"
          >
            <div className="relative size-5 flex flex-col justify-center items-center">
              <span
                className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-1.5"
                }`}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>

      
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 p-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-6 h-full overflow-y-auto pb-10">
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-xl font-medium text-zinc-200 hover:text-[#887ad1] transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            
            <div className="flex flex-col gap-3 mt-4 border-t border-zinc-800 pt-6">
              
              <Link
                href="/auth/auth_page"
                className="w-full text-center bg-linear-to-r from-[#4A4FCF] to-[#887ad1] text-zinc-950 font-bold text-base rounded-lg py-2.5 shadow-[0_4px_20px_rgba(74,79,207,0.25)] transition-all active:scale-95"
                onClick={() => setOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}