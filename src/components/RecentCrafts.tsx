"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteModal";
import Toast from "./Toast";

interface Craft {
  _id: string;
  title: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  createdAt: string;
  rating?: number;
}

interface RecentCraftsProps {
  crafts: Craft[];
  onCraftDeleted?: (deletedId: string) => void; 
}

const RecentCrafts = ({ crafts, onCraftDeleted }: RecentCraftsProps) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<Craft | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [craftsList, setCraftsList] = useState(crafts);

  useEffect(() => {
    setCraftsList(crafts);
  }, [crafts]);

  const handleDeleteClick = (craft: Craft) => {
    setSelectedCraft(craft);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCraft) return;

    setIsDeleting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts/${selectedCraft._id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete craft");
      }

      
      setCraftsList((prev) => prev.filter((c) => c._id !== selectedCraft._id));
      
      
      if (onCraftDeleted) {
        onCraftDeleted(selectedCraft._id);
      }

      setToast({
        message: `"${selectedCraft.title}" has been deleted successfully!`,
        type: "success",
      });

      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Delete error:", error);
      setToast({
        message: "Failed to delete craft. Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
      setSelectedCraft(null);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setDeleteModalOpen(false);
      setSelectedCraft(null);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Recent Crafts</h2>
          <Link
            href="/manage-crafts"
            className="text-sm text-[#B8AEEA] hover:text-[#887ad1] transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-4">
          {craftsList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-400">No crafts added yet</p>
              <Link
                href="/add-craft"
                className="inline-block mt-2 text-[#B8AEEA] hover:text-[#887ad1]"
              >
                Add your first craft →
              </Link>
            </div>
          ) : (
            craftsList.map((craft) => (
              <div
                key={craft._id}
                className="flex items-center gap-4 rounded-xl border border-zinc-800/60 bg-zinc-900/30 p-3 transition-all hover:border-zinc-700/80"
              >
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={craft.images?.[0] || "/placeholder.png"}
                    alt={craft.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    {craft.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <span className="font-semibold text-[#B8AEEA]">
                      ৳{craft.price}
                    </span>
                    <span>•</span>
                    <span>{craft.category}</span>
                    <span>•</span>
                    <span>Stock: {craft.stock}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/all-craft/${craft._id}`}
                    className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </Link>

                  <button
                    onClick={() => handleDeleteClick(craft)}
                    className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={selectedCraft?.title || ""}
        isLoading={isDeleting}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default RecentCrafts;