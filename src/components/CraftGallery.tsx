"use client";

import { useState } from "react";
import Image from "next/image";

const CraftGallery = ({ images, title }: { images: string[]; title: string }) => {
  const [activeImg, setActiveImg] = useState(images?.[0] || "/placeholder.png");

  return (
    <div>
      <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-zinc-800/80 sm:h-[420px]">
        <Image
          src={activeImg}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
      </div>
      {images?.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveImg(img)}
              className={`relative h-20 w-full overflow-hidden rounded-lg border transition-colors ${
                activeImg === img
                  ? "border-[#887ad1]"
                  : "border-zinc-800/80"
              }`}
            >
              <Image
                src={img}
                alt={`${title}-${i}`}
                fill
                sizes="150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CraftGallery;