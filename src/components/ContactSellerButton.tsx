// src/components/ContactSellerButton.tsx
"use client";

import { useState } from "react";
import { 
  EnvelopeIcon, 
  PhoneIcon,
  XMarkIcon,
  UserIcon,
  MapPinIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { toast } from "sonner";

interface ContactSellerButtonProps {
  sellerPhone?: string;
  sellerEmail?: string;
  sellerName: string;
  craftTitle: string;
  craftId: string;
  sellerAddress?: string;
  sellerDistrict?: string;
  sellerWebsite?: string;
}

const ContactSellerButton = ({ 
  sellerPhone, 
  sellerEmail, 
  sellerName, 
  craftTitle,
  craftId,
  sellerAddress,
  sellerDistrict,
  sellerWebsite,
}: ContactSellerButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // WhatsApp contact
  const handleWhatsApp = () => {
    if (!sellerPhone) {
      toast.error("Seller's phone number not available");
      return;
    }
    const phone = sellerPhone.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=Hi%20${encodeURIComponent(sellerName)}%2C%20I'm%20interested%20in%20your%20product%20%22${encodeURIComponent(craftTitle)}%22.%20Can%20you%20tell%20me%20more%3F`;
    window.open(url, '_blank');
  };

  // Email contact
  const handleEmail = () => {
    if (!sellerEmail) {
      toast.error("Seller's email not available");
      return;
    }
    const subject = encodeURIComponent(`Inquiry about ${craftTitle}`);
    const body = encodeURIComponent(`Hi ${sellerName},\n\nI'm interested in your product "${craftTitle}". Could you please provide more information?\n\nThanks!`);
    window.location.href = `mailto:${sellerEmail}?subject=${subject}&body=${body}`;
  };

  // Phone call
  const handleCall = () => {
    if (!sellerPhone) {
      toast.error("Phone number not available");
      return;
    }
    window.location.href = `tel:${sellerPhone}`;
  };

  // Copy phone number
  const copyPhone = () => {
    if (!sellerPhone) return;
    navigator.clipboard.writeText(sellerPhone);
    toast.success("Phone number copied!");
  };

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 w-full rounded-lg bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] px-6 py-3 text-sm font-bold text-zinc-950 shadow-[0_4px_20px_rgba(74,79,207,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_6px_30px_rgba(74,79,207,0.4)] sm:w-auto sm:px-10 flex items-center justify-center gap-2"
      >
        <PhoneIcon className="h-5 w-5" />
        Contact Seller
      </button>

      {/* Contact Info Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/95 p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#4A4FCF] to-[#887ad1] flex items-center justify-center text-lg font-bold text-white">
                  {sellerName?.charAt(0)?.toUpperCase() || "S"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{sellerName}</h3>
                  <p className="text-sm text-zinc-400">{craftTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Seller Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                Contact Information
              </h4>

              {/* Phone */}
              {sellerPhone && (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-800/30 p-3">
                  <div className="rounded-full bg-green-500/20 p-2">
                    <DevicePhoneMobileIcon className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500">Phone</p>
                    <p className="font-medium text-white">{sellerPhone}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCall}
                      className="rounded-lg bg-green-500/20 px-3 py-1.5 text-sm font-medium text-green-400 hover:bg-green-500/30 transition-colors"
                    >
                      Call
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="rounded-lg bg-green-500/20 px-3 py-1.5 text-sm font-medium text-green-400 hover:bg-green-500/30 transition-colors"
                    >
                      WhatsApp
                    </button>
                    <button
                      onClick={copyPhone}
                      className="rounded-lg bg-zinc-700/50 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              {/* Email */}
              {sellerEmail && (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-800/30 p-3">
                  <div className="rounded-full bg-blue-500/20 p-2">
                    <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500">Email</p>
                    <p className="font-medium text-white truncate">{sellerEmail}</p>
                  </div>
                  <button
                    onClick={handleEmail}
                    className="rounded-lg bg-blue-500/20 px-3 py-1.5 text-sm font-medium text-blue-400 hover:bg-blue-500/30 transition-colors"
                  >
                    Email
                  </button>
                </div>
              )}

              {/* Address */}
              {(sellerAddress || sellerDistrict) && (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-800/30 p-3">
                  <div className="rounded-full bg-purple-500/20 p-2">
                    <MapPinIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500">Location</p>
                    <p className="font-medium text-white">
                      {sellerAddress && sellerAddress}
                      {sellerAddress && sellerDistrict && ", "}
                      {sellerDistrict && sellerDistrict}
                    </p>
                  </div>
                </div>
              )}

              {/* Website */}
              {sellerWebsite && (
                <div className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-800/30 p-3">
                  <div className="rounded-full bg-orange-500/20 p-2">
                    <GlobeAltIcon className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-500">Website</p>
                    <a 
                      href={sellerWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-[#B8AEEA] hover:text-[#887ad1] transition-colors truncate block"
                    >
                      {sellerWebsite.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              )}

              {/* Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-zinc-800/60">
                {sellerPhone && (
                  <>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 border border-green-500/30 px-4 py-2.5 text-sm font-medium text-green-400 hover:bg-green-500/20 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={handleCall}
                      className="flex items-center justify-center gap-2 rounded-lg bg-purple-500/10 border border-purple-500/30 px-4 py-2.5 text-sm font-medium text-purple-400 hover:bg-purple-500/20 transition-colors"
                    >
                      <PhoneIcon className="h-5 w-5" />
                      Call Now
                    </button>
                  </>
                )}
                {sellerEmail && (
                  <button
                    onClick={handleEmail}
                    className="col-span-2 flex items-center justify-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/30 px-4 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-colors"
                  >
                    <EnvelopeIcon className="h-5 w-5" />
                    Send Email
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactSellerButton;