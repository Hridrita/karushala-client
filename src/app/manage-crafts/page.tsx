"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface Craft {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  district: string;
  images: string[];
}

const ManageCrafts = () => {
  const { data: session } = authClient.useSession();
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [targetCraft, setTargetCraft] = useState<Craft | null>(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchCrafts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts/my-crafts?email=${session.user.email}`
      );
      const data = await res.json();
      setCrafts(data);
      setLoading(false);
    };

    fetchCrafts();
  }, [session]);

  const confirmDelete = async () => {
    if (!targetCraft) return;
    const id = targetCraft._id;

    setDeletingId(id);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts/${id}`, {
        method: "DELETE",
      });
      setCrafts((prev) => prev.filter((c) => c._id !== id));
    } finally {
      setDeletingId(null);
      setTargetCraft(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 py-16">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]">
            Dashboard
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Manage{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent">
              Your Crafts
            </span>
          </h1>
        </div>

        {crafts.length === 0 ? (
          <p className="text-center text-sm text-zinc-500">
            No crafts added yet.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
            {/* Desktop table */}
            <table className="hidden w-full text-left text-sm sm:table">
              <thead className="border-b border-zinc-800 text-xs uppercase text-zinc-500">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {crafts.map((craft) => (
                  <tr
                    key={craft._id}
                    className="border-b border-zinc-800/60 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <Image
                          src={craft.images?.[0] || "/placeholder.png"}
                          alt={craft.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-200">{craft.title}</td>
                    <td className="px-4 py-3 text-zinc-400">
                      {craft.category}
                    </td>
                    <td className="px-4 py-3 text-[#B8AEEA]">
                      Tk.{craft.price}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {craft.district}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/all-craft/${craft._id}`}
                          className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:border-[#887ad1]/60 hover:text-[#B8AEEA]"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => setTargetCraft(craft)}
                          disabled={deletingId === craft._id}
                          className="rounded-lg border border-red-900/50 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-950/30 disabled:opacity-50"
                        >
                          {deletingId === craft._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile cards */}
            <div className="divide-y divide-zinc-800/60 sm:hidden">
              {crafts.map((craft) => (
                <div key={craft._id} className="flex gap-3 p-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={craft.images?.[0] || "/placeholder.png"}
                      alt={craft.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white">
                      {craft.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-zinc-400">
                      {craft.category} • ৳{craft.price}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Link
                        href={`/all-craft/${craft._id}`}
                        className="rounded-lg border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-300"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => setTargetCraft(craft)}
                        disabled={deletingId === craft._id}
                        className="rounded-lg border border-red-900/50 px-3 py-1 text-xs font-semibold text-red-400 disabled:opacity-50"
                      >
                        {deletingId === craft._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {targetCraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
            <h3 className="text-lg font-bold text-white">Delete Craft?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-zinc-200">
                {targetCraft.title}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setTargetCraft(null)}
                disabled={deletingId === targetCraft._id}
                className="rounded-lg border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-300 hover:border-zinc-500 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletingId === targetCraft._id}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === targetCraft._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ManageCrafts;