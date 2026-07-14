"use client";

import { useAuth } from "@/hooks/useAuth";
import { isDemoUser } from "@/lib/demo-user";
import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import Categories from "@/components/Categories";
import FAQ from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  const { user } = useAuth();
  const isDemo = isDemoUser(user?.email);
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div>
      
      {isDemo && showBanner && (
        <div className="relative z-10 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-yellow-500/5 to-transparent">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20 flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-yellow-400">
                    Demo Mode Active
                  </p>
                  <p className="text-xs text-yellow-300/70">
                    You&apos;re viewing a demo. Some features like adding crafts, editing profile, and managing crafts are restricted.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/auth/auth_page"
                  className="whitespace-nowrap rounded-lg bg-yellow-500/20 px-4 py-1.5 text-sm font-medium text-yellow-400 hover:bg-yellow-500/30 transition-colors border border-yellow-500/30"
                  onClick={() => {
                    localStorage.removeItem("karushala_credentials");
                  }}
                >
                  Create Your Account →
                </a>
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-yellow-400/50 hover:text-yellow-400 transition-colors p-1"
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      
      <HeroSection />
      <Categories />
      <FAQ />
    </div>
  );
}