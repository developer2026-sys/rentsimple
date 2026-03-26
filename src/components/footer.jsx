import { Outlet, useNavigate,useLocation } from "react-router-dom";
import React, { useEffect } from "react";
const Footer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      {/* All child routes render here */}
      <Outlet />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

          {/* Top row */}
          <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">

            {/* Brand */}
            <div className="flex flex-col gap-2">
              <span className="text-xl font-bold text-gray-900">
                Rent<span className="text-[#024a47]">Simple</span>
              </span>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                A technology platform connecting renters and vendors. All transactions
                are solely between renter and vendor.
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-8">

              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  Legal
                </p>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate("/privacy-policy")}
                      className="text-sm cursor-pointer text-gray-600 hover:text-[#024a47] transition-colors"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/terms-of-service")}
                      className="text-sm cursor-pointer text-gray-600 hover:text-[#024a47] transition-colors"
                    >
                      Terms of Service
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/vendor-agreement")}
                      className="text-sm cursor-pointer text-gray-600 hover:text-[#024a47] transition-colors"
                    >
                      Vendor Agreement
                    </button>
                  </li>
                </ul>
              </div>



            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} RentSimple. All rights reserved.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/privacy-policy")}
                className="text-xs cursor-pointer text-gray-400 hover:text-[#024a47] transition-colors"
              >
                Privacy
              </button>
              <span className="text-gray-300 text-xs">·</span>
              <button
                onClick={() => navigate("/terms-of-service")}
                className="text-xs cursor-pointer text-gray-400 hover:text-[#024a47] transition-colors"
              >
                Terms
              </button>
              <span className="text-gray-300 text-xs">·</span>
              <button
                onClick={() => navigate("/vendor-agreement")}
                className="text-xs cursor-pointer text-gray-400 hover:text-[#024a47] transition-colors"
              >
                Vendor Agreement
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default Footer;