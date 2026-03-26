import { useState } from "react";
import React from "react";
const sections = [
  {
    id: "s1",
    num: "01",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing or using RentSimple ("Platform"), you agree to be bound by
        these Terms of Service ("Terms"). If you do not agree, you may not use
        the Platform.
      </p>
    ),
  },
  {
    id: "s2",
    num: "02",
    title: "Platform Role",
    critical: true,
    criticalLabel: "Critical Protection Clause",
    content: (
      <>
        <p className="mb-2">
          RentSimple is a technology platform that connects renters and vendors.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>RentSimple does not own, control, or guarantee any listed items</li>
          <li>RentSimple is not a party to rental agreements between users</li>
          <li>All transactions are solely between renter and vendor</li>
        </ul>
      </>
    ),
  },
  {
    id: "s3",
    num: "03",
    title: "User Accounts",
    content: (
      <>
        <p className="mb-2">Users agree to:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Provide accurate information</li>
          <li>Maintain account security</li>
          <li>Be responsible for all activity under their account</li>
        </ul>
        <p>RentSimple may suspend or terminate accounts at its discretion.</p>
      </>
    ),
  },
  {
    id: "s4",
    num: "04",
    title: "Rentals & Transactions",
    content: (
      <>
        <p className="mb-3">All rental agreements are between vendor and renter.</p>
        <p className="text-sm font-medium text-gray-900 mb-1">Vendors are responsible for:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Product accuracy</li>
          <li>Delivery and condition</li>
        </ul>
        <p className="text-sm font-medium text-gray-900 mb-1">Renters are responsible for:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Proper use</li>
          <li>Timely return</li>
          <li>Payment obligations</li>
        </ul>
        <p>RentSimple is not liable for disputes, damages, or losses arising from transactions.</p>
      </>
    ),
  },
  {
    id: "s5",
    num: "05",
    title: "Payments",
    content: (
      <>
        <p className="mb-2">Payments are processed via Stripe or similar providers.</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>RentSimple may collect service fees</li>
          <li>Vendors receive payouts per platform terms</li>
          <li>Refunds are subject to vendor policies unless otherwise required by law</li>
        </ul>
      </>
    ),
  },
  {
    id: "s6",
    num: "06",
    title: "Prohibited Conduct",
    content: (
      <>
        <p className="mb-2">Users may not:</p>
        <ul className="list-disc pl-5 space-y-1 mb-3">
          <li>Provide false or misleading information</li>
          <li>Engage in fraud or illegal activity</li>
          <li>Circumvent the platform to avoid fees</li>
          <li>Abuse, harass, or harm other users</li>
        </ul>
        <p>Violation may result in immediate termination.</p>
      </>
    ),
  },
  {
    id: "s7",
    num: "07",
    title: "Disclaimers",
    content: (
      <>
        <p className="mb-2">
          The platform is provided "as is." RentSimple makes no guarantees regarding:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Availability of listings</li>
          <li>Accuracy of vendor information</li>
          <li>Quality or safety of rented items</li>
        </ul>
      </>
    ),
  },
  {
    id: "s8",
    num: "08",
    title: "Limitation of Liability",
    content: (
      <>
        <p className="mb-2">To the fullest extent permitted by law:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>RentSimple shall not be liable for indirect, incidental, or consequential damages</li>
          <li>Total liability shall not exceed amounts paid to RentSimple in the prior 12 months</li>
        </ul>
      </>
    ),
  },
  {
    id: "s9",
    num: "09",
    title: "Indemnification",
    content: (
      <>
        <p className="mb-2">
          Users agree to indemnify and hold harmless RentSimple from any claims arising out of:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use of the platform</li>
          <li>Violations of these Terms</li>
          <li>Transactions between users</li>
        </ul>
      </>
    ),
  },
  {
    id: "s10",
    num: "10",
    title: "Termination",
    content: (
      <>
        <p className="mb-2">
          RentSimple may suspend or terminate access at any time for:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Violations of Terms</li>
          <li>Risk to platform integrity</li>
          <li>Legal or compliance reasons</li>
        </ul>
      </>
    ),
  },
  {
    id: "s11",
    num: "11",
    title: "Governing Law",
    content: (
      <p>
        These Terms shall be governed by the laws of the State of Indiana.
      </p>
    ),
  },
];

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">

        {/* Header */}
        <div className="text-center pb-8 border-b border-gray-200 mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Rent<span className="text-[#024a47]">Simple</span>
          </h1>
          <p className="text-sm text-gray-500 mb-4">Terms of Service</p>
          <div className="flex justify-center gap-3 flex-wrap">
            <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-md px-3 py-1">
              Effective: March 2, 2026
            </span>
            <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-md px-3 py-1">
              Last updated: March 25, 2026
            </span>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-10">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Table of Contents
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="flex cursor-pointer items-center gap-2 text-left text-sm text-[#024a47] hover:underline py-1 px-1 rounded transition-colors hover:bg-[#024a47]/5"
              >
                <span className="text-xs text-gray-400 font-mono w-5 shrink-0">{s.num}</span>
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-0">
          {sections.map((s, i) => (
            <div key={s.id}>
              <div
                id={s.id}
                className="scroll-mt-6 py-8"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold text-[#024a47] bg-[#e1f5ee] rounded px-2 py-0.5 font-mono">
                    {s.num}
                  </span>
                  <h2 className="text-lg font-semibold text-gray-900">{s.title}</h2>
                </div>

                {/* Critical Card or Normal Content */}
                {s.critical ? (
                  <div className="bg-[#e1f5ee] border border-[#5dcaa5] rounded-xl p-4">
                    <p className="text-xs font-semibold text-[#0f6e56] uppercase tracking-wider mb-3">
                      {s.criticalLabel}
                    </p>
                    <div className="text-sm text-[#085041] leading-relaxed space-y-1">
                      {s.content}
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {s.content}
                  </div>
                )}
              </div>

              {/* Divider (not after last) */}
              {i < sections.length - 1 && (
                <hr className="border-gray-200" />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center pt-10 mt-10 border-t border-gray-200">
          <p className="text-sm text-gray-400">
            <span className="text-[#024a47] font-medium">RentSimple</span>
            &nbsp;·&nbsp; Effective March 2, 2026 &nbsp;·&nbsp; Last updated March 25, 2026
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Questions? Contact us at{" "}
            <a
              href="mailto:support@rentsimple.com"
              className="text-[#024a47] hover:underline"
            >
              support@rentsimple.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;