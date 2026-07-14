"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";


interface ProfileData {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  bio?: string;
  avatar?: string;
  role: string;
  joinDate: string;
  totalCrafts: number;
  totalSales: number;
  totalReviews: number;
  averageRating: number;
}

const ProfilePage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/auth_page");
      return;
    }

    const fetchProfile = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile?email=${user.email}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch profile");
          }

          const data = await response.json();
          setProfile(data);
          setEditForm({
            name: data.name || "",
            phone: data.phone || "",
            address: data.address || "",
            city: data.city || "",
            district: data.district || "",
            bio: data.bio || "",
          });
        } catch (error) {
          console.error("Profile fetch error:", error);
          toast.error("Failed to load profile");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user, isAuthenticated, isLoading, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      let avatarUrl = profile?.avatar;

      // Upload avatar if changed
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        formData.append("email", user?.email || "");

        const uploadResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile/avatar`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (uploadResponse.ok) {
          const data = await uploadResponse.json();
          avatarUrl = data.avatarUrl;
        }
      }

      // Update profile
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            ...editForm,
            avatar: avatarUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A4FCF]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="relative">
        {/* Background Glow Effects */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-[#4A4FCF]/50 bg-zinc-800">
                  {avatarPreview || profile?.avatar ? (
                    <Image
                      src={avatarPreview || profile?.avatar || "/default-avatar.png"}
                      alt={profile?.name || "User"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#4A4FCF] to-[#887ad1]">
                      <span className="text-3xl font-bold text-white">
                        {profile?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-[#4A4FCF] p-2 transition-colors hover:bg-[#3a3fbf]">
                    <CameraIcon className="h-5 w-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xl font-bold text-white focus:border-[#4A4FCF] focus:outline-none"
                    placeholder="Your Name"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-white">
                    {profile?.name || "Artisan"}
                  </h1>
                )}
                <p className="text-sm text-zinc-400 flex items-center justify-center md:justify-start gap-2">
                  <EnvelopeIcon className="h-4 w-4" />
                  {profile?.email}
                </p>
                <span className="inline-block mt-2 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300">
                  {profile?.role || "Artisan"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setAvatarFile(null);
                        setAvatarPreview(null);
                      }}
                      className="flex items-center gap-1 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="flex items-center gap-1 rounded-lg bg-linear-to-r from-[#4A4FCF] to-[#887ad1] px-4 py-2 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/30 border-t-zinc-950" />
                      ) : (
                        <>
                          <CheckIcon className="h-4 w-4" />
                          Save
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors"
                  >
                    <PencilSquareIcon className="h-4 w-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Bio */}
            {isEditing ? (
              <textarea
                value={editForm.bio}
                onChange={(e) =>
                  setEditForm({ ...editForm, bio: e.target.value })
                }
                className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            ) : (
              profile?.bio && (
                <p className="mt-4 text-sm text-zinc-400">{profile.bio}</p>
              )
            )}
          </div>

          {/* Stats Grid */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Crafts", value: profile?.totalCrafts || 0 },
              { label: "Total Sales", value: `৳${(profile?.totalSales || 0).toLocaleString()}` },
              { label: "Total Reviews", value: profile?.totalReviews || 0 },
              { label: "Avg Rating", value: `${(profile?.averageRating || 0).toFixed(1)} ★` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-center"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Profile Details */}
          <div className="mt-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label className="text-xs text-zinc-500">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
                    placeholder="Your phone number"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-300">
                    {profile?.phone || "Not provided"}
                  </p>
                )}
              </div>

              {/* District */}
              <div>
                <label className="text-xs text-zinc-500">District</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.district}
                    onChange={(e) =>
                      setEditForm({ ...editForm, district: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
                    placeholder="Your district"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-300">
                    {profile?.district || "Not provided"}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="text-xs text-zinc-500">City</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) =>
                      setEditForm({ ...editForm, city: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
                    placeholder="Your city"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-300">
                    {profile?.city || "Not provided"}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-xs text-zinc-500">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) =>
                      setEditForm({ ...editForm, address: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-sm text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
                    placeholder="Your address"
                  />
                ) : (
                  <p className="mt-1 text-sm text-zinc-300">
                    {profile?.address || "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Join Date */}
            <div className="mt-4 border-t border-zinc-800/60 pt-4">
              <p className="text-xs text-zinc-500">Member Since</p>
              <p className="text-sm text-zinc-300">
                {profile?.joinDate
                  ? new Date(profile.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;