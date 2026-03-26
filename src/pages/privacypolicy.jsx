
import React from "react";

const sections = [
    {
      id: "s1",
      num: "01",
      title: "Introduction",
      content: (
        <>
          <p className="mb-2">
            Welcome to RentSimple ("Company," "we," "our," or "us").
          </p>
          <p className="mb-2">
            We respect your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website,
            use our platform, or engage with our services.
          </p>
          <p>By using RentSimple, you agree to the terms of this Privacy Policy.</p>
        </>
      ),
    },
    {
      id: "s2",
      num: "02",
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-4">
            We collect information to provide and improve our services.
          </p>
  
          <p className="text-sm font-semibold text-gray-900 mb-2">A. Personal Information</p>
          <p className="mb-2">
            When you register, transact, or interact with our platform, we may collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-5">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and payment information</li>
            <li>Address and delivery details</li>
            <li>Government-issued ID (for verification, if required)</li>
          </ul>
  
          <p className="text-sm font-semibold text-gray-900 mb-2">B. Account & Transaction Data</p>
          <ul className="list-disc pl-5 space-y-1 mb-5">
            <li>Rental history</li>
            <li>Orders and service activity</li>
            <li>Vendor listings and product details</li>
            <li>Communication records between users</li>
          </ul>
  
          <p className="text-sm font-semibold text-gray-900 mb-2">C. Device & Usage Data</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Pages visited and interaction data</li>
            <li>Cookies and tracking technologies</li>
          </ul>
        </>
      ),
    },
    {
      id: "s3",
      num: "03",
      title: "How We Use Your Information",
      content: (
        <>
          <p className="mb-2">
            We use your information to operate and grow the platform:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Facilitate rentals, payments, and transactions</li>
            <li>Verify users and prevent fraud</li>
            <li>Communicate updates, confirmations, and support</li>
            <li>Improve platform performance and user experience</li>
            <li>Enforce terms, policies, and agreements</li>
            <li>Comply with legal obligations</li>
          </ul>
        </>
      ),
    },
    {
      id: "s4",
      num: "04",
      title: "Payments & Financial Data",
      critical: true,
      criticalLabel: "Payment Security",
      content: (
        <>
          <p className="mb-3">
            RentSimple uses third-party payment processors, including Stripe, to
            securely process transactions.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not store full payment card details</li>
            <li>Payment data is handled in compliance with PCI-DSS standards</li>
            <li>Vendors receive payouts through secure payment integrations</li>
          </ul>
        </>
      ),
    },
    {
      id: "s5",
      num: "05",
      title: "How We Share Information",
      highlight: true,
      highlightText: "We do not sell your personal data.",
      content: (
        <>
          <p className="mb-2">We may share information with:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Service providers (payment processors, hosting providers)</li>
            <li>Vendors and renters (as necessary to complete transactions)</li>
            <li>Legal authorities when required by law</li>
            <li>
              Business partners for operational purposes (under strict
              confidentiality)
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "s6",
      num: "06",
      title: "Cookies & Tracking Technologies",
      content: (
        <>
          <p className="mb-2">We use cookies to:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Improve site performance</li>
            <li>Analyze user behavior</li>
            <li>Personalize user experience</li>
          </ul>
          <p>
            You can disable cookies in your browser settings, though some features
            may not function properly.
          </p>
        </>
      ),
    },
    {
      id: "s7",
      num: "07",
      title: "Data Security",
      content: (
        <>
          <p className="mb-2">We implement industry-standard safeguards:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Encryption in transit (SSL/TLS)</li>
            <li>Secure servers and access controls</li>
            <li>Monitoring for unauthorized activity</li>
          </ul>
          <p className="text-gray-500 text-sm italic">
            However, no system is 100% secure. Use the platform at your discretion.
          </p>
        </>
      ),
    },
    {
      id: "s8",
      num: "08",
      title: "Data Retention",
      content: (
        <>
          <p className="mb-2">
            We retain your information only as long as necessary to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce agreements</li>
          </ul>
        </>
      ),
    },
    {
      id: "s9",
      num: "09",
      title: "Your Rights",
      content: (
        <>
          <p className="mb-2">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Access your personal data</li>
            <li>Request correction or deletion</li>
            <li>Object to processing</li>
            <li>Request data portability</li>
          </ul>
          <p>
            To exercise your rights, contact us at the information below.
          </p>
        </>
      ),
    },
    {
      id: "s10",
      num: "10",
      title: "Third-Party Services",
      content: (
        <p>
          Our platform may contain links or integrations with third-party
          services. We are not responsible for their privacy practices.
        </p>
      ),
    },
    {
      id: "s11",
      num: "11",
      title: "Children's Privacy",
      content: (
        <p>
          RentSimple is not intended for individuals under 18. We do not
          knowingly collect data from minors.
        </p>
      ),
    },
    {
      id: "s12",
      num: "12",
      title: "Changes to This Policy",
      content: (
        <p>
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page with a revised effective date.
        </p>
      ),
    },
  ];
  
  const PrivacyPolicy = () => {
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
            <p className="text-sm text-gray-500 mb-4">Privacy Policy</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-md px-3 py-1">
                Effective: March 1, 2026
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
            <div className="grid  grid-cols-1 sm:grid-cols-2 gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className="flex cursor-pointer items-center gap-2 text-left text-sm text-[#024a47] hover:underline py-1 px-1 rounded transition-colors hover:bg-[#024a47]/5"
                >
                  <span className="text-xs text-gray-400 font-mono w-5 shrink-0">
                    {s.num}
                  </span>
                  {s.title}
                </button>
              ))}
            </div>
          </div>
  
          {/* Sections */}
          <div className="space-y-0">
            {sections.map((s, i) => (
              <div key={s.id}>
                <div id={s.id} className="scroll-mt-6 py-8">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-[#024a47] bg-[#e1f5ee] rounded px-2 py-0.5 font-mono">
                      {s.num}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {s.title}
                    </h2>
                  </div>
  
                  {/* Highlight badge (e.g. "We do not sell your data") */}
                  {s.highlight && (
                    <div className="flex items-center gap-2 bg-[#024a47] text-white text-sm font-medium rounded-lg px-4 py-2.5 mb-4 w-fit">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {s.highlightText}
                    </div>
                  )}
  
                  {/* Critical Card */}
                  {s.critical ? (
                    <div className="bg-[#e1f5ee] border border-[#5dcaa5] rounded-xl p-4">
                      <p className="text-xs font-semibold text-[#0f6e56] uppercase tracking-wider mb-3">
                        {s.criticalLabel}
                      </p>
                      <div className="text-sm text-[#085041] leading-relaxed">
                        {s.content}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-600 leading-relaxed">
                      {s.content}
                    </div>
                  )}
                </div>
  
                {i < sections.length - 1 && (
                  <hr className="border-gray-200" />
                )}
              </div>
            ))}
          </div>
  
          {/* Contact Section */}
          <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-[#024a47] bg-[#e1f5ee] rounded px-2 py-0.5 font-mono">
                13
              </span>
              <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If you have questions or concerns regarding this Privacy Policy,
              please contact:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e1f5ee] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#024a47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a
                  href="mailto:support@rentsimpledeals.com"
                  className="text-sm text-[#024a47] hover:underline"
                >
                  support@rentsimpledeals.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e1f5ee] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#024a47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a
                  href="tel:3177218177"
                  className="text-sm text-[#024a47] hover:underline"
                >
                  317-721-8177
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e1f5ee] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#024a47]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <a
                  href="https://www.rentsimpledeals.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#024a47] hover:underline"
                >
                  www.rentsimpledeals.com
                </a>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div className="text-center pt-10 mt-6 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              <span className="text-[#024a47] font-medium">RentSimple</span>
              &nbsp;·&nbsp; Effective March 1, 2026 &nbsp;·&nbsp; Last updated March 25, 2026
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Questions?{" "}
              <a
                href="mailto:support@rentsimpledeals.com"
                className="text-[#024a47] hover:underline"
              >
                support@rentsimpledeals.com
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;