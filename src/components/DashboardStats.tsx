"use client";

import { ChartBarIcon, ShoppingBagIcon, StarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

interface DashboardStatsProps {
  totalCrafts: number;
  totalSales: number;
  totalReviews: number;
  averageRating: number;
}

const DashboardStats = ({
  totalCrafts,
  totalSales,
  totalReviews,
  averageRating,
}: DashboardStatsProps) => {
  const stats = [
    {
      label: "Total Crafts",
      value: totalCrafts,
      icon: ShoppingBagIcon,
      color: "from-blue-500 to-blue-400",
    },
    {
      label: "Total Sales",
      value: `৳${totalSales.toLocaleString()}`,
      icon: ChartBarIcon,
      color: "from-green-500 to-green-400",
    },
    {
      label: "Total Reviews",
      value: totalReviews,
      icon: UserGroupIcon,
      color: "from-purple-500 to-purple-400",
    },
    {
      label: "Average Rating",
      value: averageRating.toFixed(1),
      icon: StarIcon,
      color: "from-yellow-500 to-yellow-400",
      suffix: "★",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-zinc-700/80"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-white">
                  {stat.value}
                </p>
                {stat.suffix && (
                  <p className="text-sm text-yellow-400">{stat.suffix}</p>
                )}
              </div>
              <div className={`rounded-xl bg-linear-to-br ${stat.color} p-3`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;