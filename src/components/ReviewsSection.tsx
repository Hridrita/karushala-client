"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  name: string;
  comment: string;
  rating: number;
}

interface Props {
  craftId: string;
  initialReviews: Review[];
}

const ReviewsSection = ({ craftId, initialReviews }: Props) => {
  const { data: session } = authClient.useSession();
  const [reviews, setReviews] = useState<Review[]>(initialReviews || []);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user) {
      toast.error("Log in to leave a review.");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts/${craftId}/reviews`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: session.user.name,
            email: session.user.email,
            comment,
            rating,
          }),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Couldn't submit the review.");
        return;
      }

      toast.success("Review added");
      setReviews(data.reviews);
      setComment("");
      setRating(5);
    } catch {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Reviews & Ratings</h2>
        {avgRating && (
          <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1">
            <Star className="h-3.5 w-3.5 fill-[#B8AEEA] text-[#B8AEEA]" />
            <span className="text-sm font-semibold text-zinc-200">
              {avgRating}
            </span>
            <span className="text-xs text-zinc-500">
              ({reviews.length})
            </span>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className="mt-6 space-y-3">
          {reviews.map((rev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-4 transition-colors hover:border-zinc-700"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#4A4FCF] to-[#887ad1] text-sm font-bold text-zinc-950">
                    {rev.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <p className="text-sm font-semibold text-zinc-200">
                    {rev.name}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3.5 w-3.5 ${
                        idx < rev.rating
                          ? "fill-[#B8AEEA] text-[#B8AEEA]"
                          : "text-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 pl-12 text-sm leading-relaxed text-zinc-400">
                {rev.comment}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-zinc-500">
          No reviews yet for this craft.
        </p>
      )}

      <div className="mt-8 border-t border-zinc-800/80 pt-6">
        <h3 className="text-sm font-semibold text-zinc-200">
          Leave your review
        </h3>
        {!session?.user && (
          <p className="mt-1 text-xs text-red-400">
            You must log in to leave a review.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => {
              const value = idx + 1;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= rating
                        ? "fill-[#B8AEEA] text-[#B8AEEA]"
                        : "text-zinc-700"
                    }`}
                  />
                </button>
              );
            })}
            <span className="ml-2 text-xs text-zinc-500">{rating}/5</span>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            rows={3}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 p-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#887ad1]/60 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-5 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsSection;