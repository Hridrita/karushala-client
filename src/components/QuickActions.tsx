"use client";

import Link from "next/link";
import { PlusCircleIcon, ClipboardDocumentListIcon, UserCircleIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

const QuickActions = () => {
  const actions = [
    {
      label: "Add New Craft",
      href: "/add-craft",
      icon: PlusCircleIcon,
      color: "from-[#4A4FCF] to-[#887ad1]",
    },
    {
      label: "My Crafts",
      href: "/manage-crafts",
      icon: ClipboardDocumentListIcon,
      color: "from-green-500 to-green-400",
    },
    {
      label: "Profile",
      href: "/profile",
      icon: UserCircleIcon,
      color: "from-purple-500 to-purple-400",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Cog6ToothIcon,
      color: "from-orange-500 to-orange-400",
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-4 transition-all hover:scale-[1.02] hover:border-zinc-700/80"
            >
              <div className={`rounded-xl bg-linear-to-br ${action.color} p-2.5`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white text-center">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;