"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

const categories = [
  "Nakshi Kantha",
  "Pottery",
  "Jewelry",
  "Bamboo Craft",
  "Wood Craft",
  "Jute Craft",
  "Others",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const craftSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => Number(v) > 0, "Price must be greater than 0"),
  stock: z
    .string()
    .min(1, "Stock is required")
    .refine((v) => Number(v) >= 0, "Stock cannot be negative"),
  category: z.string().min(1, "Select a category"),
  district: z.string().min(2, "District is required"),
});

type CraftFormValues = z.infer<typeof craftSchema>;


async function uploadToImgbb(imageFile: File): Promise<string> {
  if(!imageFile){
    throw new Error("No image file provided")
  }

  if(imageFile.size > 5 * 1024 * 1024){
    throw new Error("Image must be less than 5MB")
  }

  const formData = new FormData()
  formData.append("image", imageFile);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if(!data.success){
        throw new Error(data.error?.message || "Image upload failed")
    }

  return data.data.url as string;
}

const AddCraftPage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CraftFormValues>({
    resolver: zodResolver(craftSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      district: "",
    },
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  if (files.length === 0) return;

  setImageError("");
  setImageFiles((prev) => [...prev, ...files]);

  Promise.all(
    files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    )
  ).then((results) => {
    setPreviews((prev) => [...prev, ...results]);
  });
};

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: CraftFormValues) => {
    setError("");

    if (imageFiles.length === 0) {
      setImageError("Upload at least one image");
      return;
    }
    setImageError("");

    setLoading(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of imageFiles) {
        const url = await uploadToImgbb(file);
        if (url) uploadedUrls.push(url);
      }

      const payload = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        images: uploadedUrls,
        sellerEmail: session?.user?.email
      };

      console.log("payload data:",payload);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/crafts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const resData = await res.json();
        console.log(resData.message);
        toast.error("Failed to add craft");
      }
      toast.success("New craft added successfully!")

      reset(); 
      setImageFiles([]); 
      setPreviews([]);
    //   router.push("/all-craft");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-zinc-950 py-20">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUp} className="mb-10 text-center">
          <span className="w-fit rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#B8AEEA]">
            Share your craft
          </span>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Add a{" "}
            <span className="bg-gradient-to-r from-[#4A4FCF] to-[#B8AEEA] bg-clip-text text-transparent">
              New Craft
            </span>
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            List your handmade product for buyers across Bangladesh
          </p>
        </motion.div>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8"
        >
          {error && (
            <div className="mb-6 rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Craft Title
              </label>
              <input
                {...register("title")}
                placeholder="e.g. Handwoven Nakshi Kantha"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#887ad1]/60 focus:outline-none focus:ring-1 focus:ring-[#887ad1]/40"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe the craft, materials used, story behind it..."
                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#887ad1]/60 focus:outline-none focus:ring-1 focus:ring-[#887ad1]/40"
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Price (BDT)
              </label>
              <input
                {...register("price")}
                type="number"
                placeholder="1200"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#887ad1]/60 focus:outline-none focus:ring-1 focus:ring-[#887ad1]/40"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-400">{errors.price.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Stock Quantity
              </label>
              <input
                {...register("stock")}
                type="number"
                placeholder="10"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#887ad1]/60 focus:outline-none focus:ring-1 focus:ring-[#887ad1]/40"
              />
              {errors.stock && (
                <p className="mt-1 text-xs text-red-400">{errors.stock.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 focus:border-[#887ad1]/60 focus:outline-none focus:ring-1 focus:ring-[#887ad1]/40"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                District
              </label>
              <input
                {...register("district")}
                placeholder="e.g. Rangpur"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-[#887ad1]/60 focus:outline-none focus:ring-1 focus:ring-[#887ad1]/40"
              />
              {errors.district && (
                <p className="mt-1 text-xs text-red-400">{errors.district.message}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Craft Images
              </label>
              <label
                htmlFor="craft-images"
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-zinc-950/40 px-4 py-8 text-center transition-colors hover:border-[#887ad1]/50"
              >
                <span className="text-sm font-semibold text-[#B8AEEA]">
                  Click to upload images
                </span>
                <span className="mt-1 text-xs text-zinc-500">
                  PNG, JPG up to a few MB each
                </span>
                <input
                  id="craft-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {imageError && (
                <p className="mt-1 text-xs text-red-400">{imageError}</p>
              )}

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {previews.map((src, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-lg border border-zinc-800"
                    >
                      <Image
                        src={src}
                        alt={`preview-${i}`}
                        width={120}
                        height={120}
                        className="h-24 w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute right-1 top-1 rounded-full bg-zinc-950/80 px-1.5 py-0.5 text-xs text-zinc-300 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_4px_20px_rgba(74,79,207,0.3)] transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Craft"}
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default AddCraftPage;