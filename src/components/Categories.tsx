import Image from "next/image";

type Category = {
  name: string;
  image: string;
  href: string;
};

const categories: Category[] = [
  { name: "Art & Paintings", image: "/assest/categories/art-1.jpeg", href: "/assest/categories/art-1" },
  { name: "Pottery & Ceramics", image: "/assest/categories/pot-1.jpeg", href: "/assest/categories/pot-1" },
  { name: "Home Decor", image: "/assest/categories/decor-1.jpeg", href: "/assest/categories/decor-1" },
  { name: "Jewelry", image: "/assest/categories/jwel-1.jpg", href: "/assest/categories/jwel-1" },
  { name: "Textiles & Fabric", image: "/assest/categories/textile-1.jpg", href: "/assest/categories/textile-1" },
  { name: "Bags & Accessories", image: "/assest/categories/bag-1.jpg", href: "/assest/categories/bag-1" },
  
  { name: "Art & Paintings", image: "/assest/categories/art-2.jpeg", href: "/assest/categories/art-2" },
  { name: "Home Decor", image: "/assest/categories/decor-2.jpeg", href: "/assest/categories/decor-2" },
  { name: "Pottery & Ceramics", image: "/assest/categories/pot-2.jpeg", href: "/assest/categories/pot-2" },
  { name: "Textiles & Fabric", image: "/assest/categories/textile-2.jpeg", href: "/assest/categories/textile-2" },
  { name: "Bags & Accessories", image: "/assest/categories/bag-2.jpg", href: "/assest/categories/bag-2" },
  
  { name: "Jewelry", image: "/assest/categories/jwel-2.jpg", href: "/assest/categories/jwel-2" },
  { name: "Home Decor", image: "/assest/categories/decor-3.jpeg", href: "/assest/categories/decor-3" },
  { name: "Art & Paintings", image: "/assest/categories/art-3.jpeg", href: "/assest/categories/art-3" },
  { name: "Pottery & Ceramics", image: "/assest/categories/pot-3.jpeg", href: "/assest/categories/pot-3" },
  { name: "Bags & Accessories", image: "/assest/categories/bag-3.jpg", href: "/assest/categories/bag-3" },
  
  { name: "Textiles & Fabric", image: "/assest/categories/textile-3.jpeg", href: "/assest/categories/textile-3" },
  { name: "Art & Paintings", image: "/assest/categories/art-4.jpeg", href: "/assest/categories/art-4" },
  { name: "Home Decor", image: "/assest/categories/decor-5.jpeg", href: "/assest/categories/decor-5" },
];

// duplicate for seamless loop
const marqueeCategories = [...categories, ...categories];

export default function Categories() {
  return (
    <section className="w-full bg-zinc-950 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#887ad1]">
            Explore
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight bg-linear-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="mt-3 text-zinc-400 max-w-xl mx-auto">
            Discover handmade treasures crafted by local artisans across Bangladesh
          </p>
        </div>
      </div>

      <div className="relative w-full">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-zinc-950 to-transparent" />

        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {marqueeCategories.map((cat, index) => (
            <a
              key={index}
              href={cat.href}
              className="group relative w-64 shrink-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40"
            >
              <div className="relative h-72 w-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-lg font-bold text-zinc-100 group-hover:text-[#B8AEEA] transition-colors">
                  {cat.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}