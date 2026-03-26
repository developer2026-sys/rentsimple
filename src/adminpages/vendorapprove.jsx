import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react'
import { BASE_URL } from "../baseUrl";
export default function VendorApproval() {
  const [status, setStatus] = useState("idle");
  const [vendor, setVendor] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [vendorId, setVendorId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) setVendorId(id);
    else {
      setStatus("error");
      setErrorMsg("No vendor ID found in the URL.");
    }
  }, []);

  const handleApprove = async () => {
    if (!vendorId) return;
    setStatus("loading");
    try {
      const response = await axios.put(`${BASE_URL}/update-vendor/${vendorId}`, {
        status: "active",
      });
      setVendor(response.data.vendor);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7f6] flex flex-col items-center justify-center p-6 relative overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(2,74,71,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(2,74,71,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-lg border border-[#024a47]/10 relative z-10">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-[#024a47]" />
          <span className="text-[#024a47] text-lg font-semibold tracking-wide">RentSimple</span>
        </div>

        {/* IDLE */}
        {status === "idle" && vendorId && (
          <>
            <div className="mb-5">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="23" stroke="#024a47" strokeWidth="2" />
                <path d="M14 24l7 7 13-14" stroke="#024a47" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#0f1c1c] mb-3 leading-tight">
              Vendor Approval
            </h1>
            <p className="text-[#4b6b6a] text-sm leading-relaxed mb-7">
              You're about to activate a vendor account. Once approved, the vendor
              will be able to list products and accept rental requests on the platform.
            </p>

            {/* ID Badge */}
            <div className="bg-[#f0f7f6] border border-[#c2dedd] rounded-xl px-4 py-3 mb-7 flex flex-col gap-1">
              <span className="text-[10px] font-semibold tracking-widest text-[#5a8a88] uppercase">
                Vendor ID
              </span>
              <span className="text-sm font-semibold text-[#024a47] font-mono break-all">
                {vendorId}
              </span>
            </div>

            <button
              onClick={handleApprove}
              className="w-full bg-[#024a47] hover:bg-[#036560] text-white rounded-xl py-4 px-6 text-base font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 cursor-pointer"
            >
              <span>Approve Vendor</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>

            <p className="mt-4 text-xs text-[#8a6c2a] bg-[#fef9ec] border border-[#f0d98a] rounded-lg px-3 py-2.5 text-center">
              ⚠️ Please verify vendor details before approving.
            </p>
          </>
        )}

        {/* LOADING */}
        {status === "loading" && (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-12 h-12 border-4 border-[#d4e9e8] border-t-[#024a47] rounded-full animate-spin mb-5" />
            <p className="text-[#4b6b6a] text-sm">Approving vendor account...</p>
          </div>
        )}

        {/* SUCCESS */}
        {status === "success" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-green-600/30">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0f1c1c] mb-2">Vendor Approved!</h2>
            <p className="text-[#4b6b6a] text-sm mb-6">
              The vendor account has been successfully activated.
            </p>

            {vendor && (
              <div className="w-full bg-[#f0f7f6] border border-[#c2dedd] rounded-xl overflow-hidden text-left">
                {vendor.name && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-[#d8eeec]">
                    <span className="text-xs text-[#5a8a88] font-medium">Name</span>
                    <span className="text-sm font-semibold text-[#0f1c1c]">{vendor.name}</span>
                  </div>
                )}
                {vendor.email && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-[#d8eeec]">
                    <span className="text-xs text-[#5a8a88] font-medium">Email</span>
                    <span className="text-sm font-semibold text-[#0f1c1c]">{vendor.email}</span>
                  </div>
                )}
                {vendor.businessName && (
                  <div className="flex justify-between items-center px-4 py-3 border-b border-[#d8eeec]">
                    <span className="text-xs text-[#5a8a88] font-medium">Business</span>
                    <span className="text-sm font-semibold text-[#0f1c1c]">{vendor.businessName}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-xs text-[#5a8a88] font-medium">Status</span>
                  <span className="text-sm font-bold text-green-600">Active ✓</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-red-600/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#0f1c1c] mb-2">Approval Failed</h2>
            <p className="text-red-600 text-sm mb-6 max-w-xs">{errorMsg}</p>
            <button
              onClick={() => setStatus("idle")}
              className="border-2 border-[#024a47] text-[#024a47] rounded-xl px-8 py-3 text-sm font-semibold hover:bg-[#024a47] hover:text-white transition-all duration-200 cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs text-[#8aadac] relative z-10">
        © 2025 RentSimple · Admin Panel
      </p>
    </div>
  );
}