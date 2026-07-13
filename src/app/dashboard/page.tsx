// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "@/hooks/useAuth";
import DashboardStats from "@/components/DashboardStats";
import SalesChart from "@/components/SalesChart";
import RecentCrafts from "@/components/RecentCrafts";
import QuickActions from "@/components/QuickActions";
import ReviewsOverview from "@/components/ReviewsOverview";

interface Craft {
  _id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  district: string;
  images: string[];
  createdAt: string;
  rating?: number;
}

interface DashboardData {
  totalCrafts: number;
  totalSales: number;
  totalReviews: number;
  averageRating: number;
  recentCrafts: Craft[];
  salesData: { month: string; sales: number }[];
  reviewsData: { name: string; comment: string; rating: number; craftTitle: string }[];
}

const ArtisanDashboard = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Proxy middleware দিয়ে protect করা আছে, তবুও চেক রাখা ভালো
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/auth_page"); // ← ঠিক করা হলো
      return;
    }

    const fetchDashboardData = async () => {
      if (isAuthenticated && user?.email) {
        try {
          setLoading(true);
          
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/dashboard?email=${user.email}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              router.push("/auth/auth_page");
              return;
            }
            throw new Error("Failed to fetch dashboard data");
          }

          const data = await response.json();
          setDashboardData(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, [user, isAuthenticated, isLoading, router]);

  // Loading state
  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A4FCF]"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[#4A4FCF] text-white rounded-lg hover:bg-[#3a3fbf]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Not authenticated - proxy middleware handle করবে, তবুও check
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="relative">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-white">
                Welcome back, {user?.name || "Artisan"}! 👋
              </h1>
              <p className="text-zinc-400 mt-1">
                Here's what's happening with your crafts
              </p>
            </div>
            <Link
              href="/add-craft"
              className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_4px_20px_rgba(74,79,207,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(74,79,207,0.4)]"
            >
              <PlusCircleIcon className="h-5 w-5" />
              Add New Craft
            </Link>
          </div>

          {dashboardData && (
            <>
              <DashboardStats
                totalCrafts={dashboardData.totalCrafts}
                totalSales={dashboardData.totalSales}
                totalReviews={dashboardData.totalReviews}
                averageRating={dashboardData.averageRating}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 space-y-6">
                  {dashboardData?.salesData && (
                    <SalesChart data={dashboardData.salesData} />
                  )}
                  {dashboardData?.recentCrafts && (
                    <RecentCrafts crafts={dashboardData.recentCrafts} />
                  )}
                </div>

                <div className="space-y-6">
                  <QuickActions />
                  {dashboardData?.reviewsData && (
                    <ReviewsOverview reviews={dashboardData.reviewsData} />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;