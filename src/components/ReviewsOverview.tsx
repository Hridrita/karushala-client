"use client";

import { StarIcon } from "@heroicons/react/24/solid";

interface Review {
  name: string;
  comment: string;
  rating: number;
  craftTitle: string;
}

interface ReviewsOverviewProps {
  reviews: Review[];
}

const ReviewsOverview = ({ reviews }: ReviewsOverviewProps) => {
  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
      <h2 className="text-lg font-bold text-white mb-4">Recent Reviews</h2>

      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-zinc-400">No reviews yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.slice(0, 5).map((review, index) => (
            <div key={index} className="border-b border-zinc-800/60 pb-4 last:border-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-linear-to-br from-[#4A4FCF] to-[#887ad1] flex items-center justify-center text-sm font-bold text-white">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-xs text-zinc-400">{review.craftTitle}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-400" : "text-zinc-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsOverview;