// src/components/Navbar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { House, FolderPlus, Wallet, LayoutDashboard, SquareLibrary } from "lucide-react";
import { isDemoUser } from "@/lib/demo-user";
import { toast } from "sonner";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAction?: boolean; // true মানে demo user করতে পারবে না
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0];
  const isDemo = isDemoUser(session?.user?.email);

  const handleRestrictedClick = (action: string) => {
    toast.error(`Demo users cannot ${action}. Please create your own account.`, {
      duration: 4000,
      style: {
        background: "#18181b",
        color: "#fbbf24",
        border: "1px solid #fbbf24/30",
      },
    });
  };

  const navLinks: NavItem[] = [
    { label: "Home", href: "/", icon: House },
    { label: "All Craft", href: "/all-craft", icon: Wallet },
    ...(session?.user
      ? [
          { label: "Add Craft", href: "/add-craft", icon: FolderPlus, requiresAction: true },
          { label: "Manage Store", href: "/manage-crafts", icon: SquareLibrary, requiresAction: true },
          { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, requiresAction: true },
        ]
      : []),
  ];

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/auth_page");
          router.refresh();
        },
      },
    });
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
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

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-15">
          {navLinks.map((item, index) => {
            const Icon = item.icon;
            const isRestricted = isDemo && item.requiresAction;

            if (isRestricted) {
              // Demo user - Show disabled icon with tooltip
              return (
                <button
                  key={index}
                  onClick={() => handleRestrictedClick(item.label.toLowerCase())}
                  className="relative group/nav flex items-center justify-center text-zinc-600 cursor-not-allowed opacity-50"
                  disabled
                >
                  <Icon className="size-6" />
                  <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-red-900/80 px-3 py-1.5 text-xs font-medium text-red-200 opacity-0 scale-95 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-150 shadow-lg border border-red-800/50">
                     {item.label} (Demo Restricted)
                  </span>
                </button>
              );
            }

            // Normal user or non-restricted link
            return (
              <Link
                key={index}
                href={item.href}
                className="relative group/nav flex items-center justify-center text-zinc-300 hover:text-[#887ad1] transition-colors"
              >
                <Icon className="size-6" />
                <span className="pointer-events-none absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-xs font-medium text-zinc-200 opacity-0 scale-95 group-hover/nav:opacity-100 group-hover/nav:scale-100 transition-all duration-150 shadow-lg border border-zinc-700">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <>
                <div className="flex items-center gap-3 bg-zinc-900/40 border border-zinc-800/80 rounded-full pl-2 pr-3 py-1.5 backdrop-blur-xs">
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#4A4FCF] to-[#887ad1] text-xs font-bold text-white shadow-[0_0_10px_rgba(74,79,207,0.4)]">
                    {firstName?.[0]?.toUpperCase()}
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-pulse" />
                  </div>

                  {/* Demo Badge */}
                  {isDemo && (
                    <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/30">
                      DEMO
                    </span>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 ml-2 border border-zinc-700/60 bg-zinc-800/50 text-zinc-300 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 font-semibold text-xs rounded-full px-3 py-1.5 transition-all active:scale-95 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0 2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/auth/auth_page"
                className="bg-linear-to-r from-[#4A4FCF] to-[#887ad1] hover:opacity-90 text-zinc-950 font-bold text-sm rounded-lg px-4 py-2 shadow-[0_4px_20px_rgba(74,79,207,0.25)] transition-all active:scale-95 whitespace-nowrap"
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="relative flex flex-col items-center justify-center size-9 md:hidden text-zinc-400 hover:text-[#887ad1] rounded-md hover:bg-zinc-900 transition-all focus:outline-none"
          >
            <div className="relative size-5 flex flex-col justify-center items-center">
              <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full h-[calc(100vh-4rem)] bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-800 p-6 shadow-2xl transition-all animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-6 h-full overflow-y-auto pb-10">
            {navLinks.map((item, index) => {
              const Icon = item.icon;
              const isRestricted = isDemo && item.requiresAction;

              if (isRestricted) {
                return (
                  <button
                    key={index}
                    onClick={() => handleRestrictedClick(item.label.toLowerCase())}
                    className="flex items-center gap-3 text-xl font-medium text-zinc-600 cursor-not-allowed opacity-50"
                    disabled
                  >
                    <Icon className="size-5" />
                    {item.label}
                    <span className="text-xs text-yellow-500/70">🔒 Demo</span>
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 text-xl font-medium text-zinc-200 hover:text-[#887ad1] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}

            <div className="flex flex-col gap-3 mt-4 border-t border-zinc-800 pt-6">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-3 bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] text-sm font-bold text-white">
                      {firstName?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <span className="text-base font-semibold text-zinc-200">{firstName}</span>
                      {isDemo && (
                        <p className="text-xs text-yellow-400">🔒 Demo Account - Limited Access</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-base rounded-lg py-2.5 transition-all active:scale-95"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/auth_page"
                  className="w-full text-center bg-linear-to-r from-[#4A4FCF] to-[#887ad1] text-zinc-950 font-bold text-base rounded-lg py-2.5 shadow-[0_4px_20px_rgba(74,79,207,0.25)] transition-all active:scale-95"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}