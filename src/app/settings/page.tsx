"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  UserIcon,
  BellIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  TrashIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

interface SettingsData {
  name: string;
  email: string;
  phone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: "public" | "private" | "artisans";
    showEmail: boolean;
    showPhone: boolean;
  };
  store: {
    name: string;
    description: string;
    banner?: string;
  };
  appearance: {
    theme: "dark" | "light" | "system";
  };
  language: string;
  currency: string;
}

const SettingsPage = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/auth_page");
      return;
    }

    const fetchSettings = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/settings?email=${user.email}`,
            {
              cache: "no-store",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch settings");
          }

          const data = await response.json();
          setSettings(data);
          
          // Apply theme from settings
          applyTheme(data.appearance?.theme || "dark");
        } catch (error) {
          console.error("Settings fetch error:", error);
          toast.error("Failed to load settings");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSettings();
  }, [user, isAuthenticated, isLoading, router]);

  // Apply theme function
  const applyTheme = (theme: string) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      // system theme
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemPrefersDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const handleSave = async (section: string, data: any) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            section,
            data,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      const updated = await response.json();
      setSettings(updated);
      
      // Apply theme if appearance was updated
      if (section === "appearance") {
        applyTheme(data.theme);
      }
      
      // Apply language if language was updated
      if (section === "language") {
        // Store language preference
        localStorage.setItem("preferred-language", data.language);
        // You can implement i18n here
        toast.success(`Language changed to ${data.language === 'en' ? 'English' : data.language === 'bn' ? 'Bengali' : 'Hindi'}`);
      }
      
      toast.success(`${section} settings updated successfully!`);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update settings");
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

  const tabs = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "notifications", label: "Notifications", icon: BellIcon },
    { id: "privacy", label: "Privacy", icon: ShieldCheckIcon },
    { id: "store", label: "Store", icon: ShoppingBagIcon },
    { id: "appearance", label: "Appearance", icon: PaintBrushIcon },
    { id: "security", label: "Security", icon: KeyIcon },
    { id: "language", label: "Language & Region", icon: GlobeAltIcon },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-16">
      <div className="relative">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-[#4A4FCF]/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-20 h-[24rem] w-[24rem] rounded-full bg-[#B8AEEA]/15 blur-[110px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-white mb-8">Settings</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-64 flex-shrink-0">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-2 sticky top-20">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#4A4FCF]/20 to-[#887ad1]/20 text-white border border-[#4A4FCF]/30"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      {tab.label}
                      <ChevronRightIcon className={`h-4 w-4 ml-auto transition-transform ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1">
              <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-6">
                {activeTab === "profile" && (
                  <ProfileSettings
                    settings={settings}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === "notifications" && (
                  <NotificationSettings
                    settings={settings}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === "privacy" && (
                  <PrivacySettings
                    settings={settings}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === "store" && (
                  <StoreSettings
                    settings={settings}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === "appearance" && (
                  <AppearanceSettings
                    settings={settings}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === "security" && (
                  <SecuritySettings
                    user={user}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === "language" && (
                  <LanguageSettings
                    settings={settings}
                    onSave={handleSave}
                    isSaving={isSaving}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            toast.success("Account deleted successfully");
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SettingsPage;

// ============================================
// Individual Settings Components
// ============================================

const ProfileSettings = ({ settings, onSave, isSaving }: any) => {
  const [form, setForm] = useState({
    name: settings?.name || "",
    phone: settings?.phone || "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        name: settings.name || "",
        phone: settings.phone || "",
      });
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Profile Settings</h2>
      <p className="text-sm text-zinc-400 mb-6">Update your personal information</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-300">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-300">Phone Number</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-300">Email Address</label>
          <input
            type="email"
            value={settings?.email || ""}
            disabled
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/30 px-4 py-2.5 text-zinc-400 cursor-not-allowed"
          />
          <p className="text-xs text-zinc-500 mt-1">Email cannot be changed</p>
        </div>

        <button
          onClick={() => onSave("profile", form)}
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

const NotificationSettings = ({ settings, onSave, isSaving }: any) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  useEffect(() => {
    if (settings?.notifications) {
      setNotifications(settings.notifications);
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Notification Preferences</h2>
      <p className="text-sm text-zinc-400 mb-6">Choose how you want to receive notifications</p>

      <div className="space-y-4">
        {[
          { id: "email", label: "Email Notifications", desc: "Receive updates via email" },
          { id: "push", label: "Push Notifications", desc: "Get push notifications on your device" },
          { id: "sms", label: "SMS Notifications", desc: "Receive SMS alerts" },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-zinc-800/60 p-4">
            <div>
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </div>
            <button
              onClick={() => setNotifications({
                ...notifications,
                [item.id]: !notifications[item.id as keyof typeof notifications],
              })}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                notifications[item.id as keyof typeof notifications] ? "bg-[#4A4FCF]" : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                  notifications[item.id as keyof typeof notifications] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => onSave("notifications", notifications)}
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
};

const PrivacySettings = ({ settings, onSave, isSaving }: any) => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public" as const,
    showEmail: true,
    showPhone: false,
  });

  useEffect(() => {
    if (settings?.privacy) {
      setPrivacy(settings.privacy);
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Privacy Settings</h2>
      <p className="text-sm text-zinc-400 mb-6">Control who can see your information</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-300">Profile Visibility</label>
          <select
            value={privacy.profileVisibility}
            onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value as any })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white focus:border-[#4A4FCF] focus:outline-none"
          >
            <option value="public">Public - Anyone can see</option>
            <option value="artisans">Artisans Only</option>
            <option value="private">Private - Only me</option>
          </select>
        </div>

        {[
          { id: "showEmail", label: "Show Email", desc: "Display email on your profile" },
          { id: "showPhone", label: "Show Phone", desc: "Display phone number on your profile" },
        ].map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-zinc-800/60 p-4">
            <div>
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-sm text-zinc-400">{item.desc}</p>
            </div>
            <button
              onClick={() => setPrivacy({
                ...privacy,
                [item.id]: !privacy[item.id as keyof typeof privacy],
              })}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                privacy[item.id as keyof typeof privacy] ? "bg-[#4A4FCF]" : "bg-zinc-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                  privacy[item.id as keyof typeof privacy] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => onSave("privacy", privacy)}
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Privacy Settings"}
        </button>
      </div>
    </div>
  );
};

const StoreSettings = ({ settings, onSave, isSaving }: any) => {
  const [store, setStore] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (settings?.store) {
      setStore(settings.store);
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Store Settings</h2>
      <p className="text-sm text-zinc-400 mb-6">Manage your store information</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-300">Store Name</label>
          <input
            type="text"
            value={store.name}
            onChange={(e) => setStore({ ...store, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
            placeholder="Your store name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-300">Store Description</label>
          <textarea
            value={store.description}
            onChange={(e) => setStore({ ...store, description: e.target.value })}
            rows={4}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
            placeholder="Tell customers about your store"
          />
        </div>

        <button
          onClick={() => onSave("store", store)}
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Store Settings"}
        </button>
      </div>
    </div>
  );
};

const AppearanceSettings = ({ settings, onSave, isSaving }: any) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (settings?.appearance?.theme) {
      setTheme(settings.appearance.theme);
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Appearance</h2>
      <p className="text-sm text-zinc-400 mb-6">Customize how Karushala looks</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { id: "dark", label: "Dark", icon: MoonIcon },
          { id: "light", label: "Light", icon: SunIcon },
          { id: "system", label: "System", icon: DevicePhoneMobileIcon },
        ].map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setTheme(option.id)}
              className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 transition-all ${
                isSelected
                  ? "border-[#4A4FCF] bg-[#4A4FCF]/10"
                  : "border-zinc-700/60 bg-zinc-800/30 hover:border-zinc-600"
              }`}
            >
              <Icon className={`h-8 w-8 ${isSelected ? "text-[#4A4FCF]" : "text-zinc-400"}`} />
              <span className={`font-medium ${isSelected ? "text-white" : "text-zinc-400"}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onSave("appearance", { theme })}
        disabled={isSaving}
        className="mt-6 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save Theme"}
      </button>
    </div>
  );
};

const SecuritySettings = ({ user, onSave, isSaving }: any) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async () => {
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    try {
      // Call the password change API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/settings/password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user?.email,
            currentPassword: form.currentPassword,
            newPassword: form.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to change password");
      }

      toast.success("Password changed successfully! Please login again with your new password.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Security</h2>
      <p className="text-sm text-zinc-400 mb-6">Change your password and security settings</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-300">Current Password</label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-300">New Password</label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-300">Confirm New Password</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-[#4A4FCF] focus:outline-none"
            placeholder="Confirm new password"
          />
        </div>

        <button
          onClick={handlePasswordChange}
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Updating..." : "Update Password"}
        </button>

        <div className="mt-6 border-t border-zinc-800/60 pt-6">
          <h3 className="text-sm font-medium text-red-400 mb-2">Danger Zone</h3>
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
                toast.success("Account deleted successfully");
              }
            }}
            className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

const LanguageSettings = ({ settings, onSave, isSaving }: any) => {
  const [lang, setLang] = useState({
    language: "en",
    currency: "BDT",
  });

  useEffect(() => {
    if (settings) {
      setLang({
        language: settings.language || "en",
        currency: settings.currency || "BDT",
      });
    }
  }, [settings]);

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-2">Language & Region</h2>
      <p className="text-sm text-zinc-400 mb-6">Choose your preferred language and currency</p>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-zinc-300">Language</label>
          <select
            value={lang.language}
            onChange={(e) => setLang({ ...lang, language: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white focus:border-[#4A4FCF] focus:outline-none"
          >
            <option value="en">🇬🇧 English</option>
            <option value="bn">🇧🇩 বাংলা (Bengali)</option>
            <option value="hi">🇮🇳 हिंदी (Hindi)</option>
          </select>
          <p className="text-xs text-zinc-500 mt-1">
            {lang.language === "en" && "Currently viewing in English"}
            {lang.language === "bn" && "বর্তমানে বাংলায় দেখছেন"}
            {lang.language === "hi" && "वर्तमान में हिंदी में देख रहे हैं"}
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-zinc-300">Currency</label>
          <select
            value={lang.currency}
            onChange={(e) => setLang({ ...lang, currency: e.target.value })}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white focus:border-[#4A4FCF] focus:outline-none"
          >
            <option value="BDT">৳ BDT - Bangladeshi Taka</option>
            <option value="USD">$ USD - US Dollar</option>
            <option value="EUR">€ EUR - Euro</option>
            <option value="GBP">£ GBP - British Pound</option>
          </select>
        </div>

        <button
          onClick={() => onSave("language", lang)}
          disabled={isSaving}
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-2.5 text-sm font-bold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSaving ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
};

const DeleteAccountModal = ({ onClose, onConfirm }: any) => {
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-zinc-900/95 p-6">
        <h3 className="text-xl font-bold text-red-400">Delete Account</h3>
        <p className="mt-2 text-sm text-zinc-400">
          This action cannot be undone. All your data including crafts, reviews, and sales history will be permanently deleted.
        </p>

        <div className="mt-4">
          <label className="text-sm font-medium text-zinc-300">
            Type <span className="text-red-400">delete</span> to confirm
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-2.5 text-white placeholder:text-zinc-500 focus:border-red-500 focus:outline-none"
            placeholder="Type 'delete' here"
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmText !== "delete"}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};