import React from "react";

const sections = [
    {
      id: "s1",
      num: "01",
      title: "Vendor Role",
      content: (
        <p>
          Vendor agrees to list products/services for rental on the Platform and
          fulfill rental orders in accordance with this Agreement.
        </p>
      ),
    },
    {
      id: "s2",
      num: "02",
      title: "Vendor Responsibilities",
      content: (
        <>
          <p className="mb-2">Vendor is solely responsible for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accuracy of listings</li>
            <li>Product safety and condition</li>
            <li>Delivery, setup, and pickup (if applicable)</li>
            <li>Compliance with all laws and regulations</li>
          </ul>
        </>
      ),
    },
    {
      id: "s3",
      num: "03",
      title: "Product Standards",
      content: (
        <>
          <p className="mb-2">Vendor agrees that all items must be:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Clean, functional, and safe</li>
            <li>As described in listings</li>
            <li>Maintained in good working condition</li>
          </ul>
        </>
      ),
    },
    {
      id: "s4",
      num: "04",
      title: "Order Fulfillment",
      content: (
        <>
          <p className="mb-2">Vendor must:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Accept or decline requests promptly</li>
            <li>Deliver items on time</li>
            <li>Provide required confirmations (photos, serials if applicable)</li>
            <li>Complete service as agreed</li>
          </ul>
          <p className="text-sm italic text-gray-500">
            Failure may result in penalties or suspension.
          </p>
        </>
      ),
    },
    {
      id: "s5",
      num: "05",
      title: "Pricing & Fees",
      content: (
        <>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Vendor sets pricing</li>
            <li>
              RentSimple may charge:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Platform fees</li>
                <li>Transaction fees</li>
              </ul>
            </li>
            <li>Fees will be deducted before payout</li>
          </ul>
        </>
      ),
    },
    {
      id: "s6",
      num: "06",
      title: "Payments",
      critical: true,
      criticalLabel: "Payment Processing",
      content: (
        <>
          <p className="mb-3">Payments are processed via Stripe.</p>
          <p className="mb-2 font-medium text-[#085041]">Payouts issued after:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Order completion</li>
            <li>Confirmation from renter</li>
            <li>RentSimple may hold funds in case of disputes</li>
          </ul>
        </>
      ),
    },
    {
      id: "s7",
      num: "07",
      title: "Cancellations & Refunds",
      content: (
        <>
          <p className="mb-2">Vendor agrees to:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Honor cancellation policies</li>
            <li>Respond to disputes promptly</li>
          </ul>
          <p>
            RentSimple reserves the right to issue refunds to protect platform
            integrity.
          </p>
        </>
      ),
    },
    {
      id: "s8",
      num: "08",
      title: "Insurance & Liability",
      important: true,
      content: (
        <>
          <p className="mb-2">Vendor is solely responsible for:</p>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            <li>Insurance coverage</li>
            <li>Damage or injury caused by products</li>
            <li>Compliance with safety standards</li>
          </ul>
          <p>RentSimple assumes no liability for vendor products or services.</p>
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
            Vendor agrees to indemnify and hold RentSimple harmless from:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Claims related to product defects</li>
            <li>Personal injury or property damage</li>
            <li>Regulatory violations</li>
          </ul>
        </>
      ),
    },
    {
      id: "s10",
      num: "10",
      title: "Account Standing",
      content: (
        <>
          <p className="mb-2">
            RentSimple may suspend or terminate Vendor for:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Poor performance</li>
            <li>Policy violations</li>
            <li>Customer complaints</li>
            <li>Fraud or risk behavior</li>
          </ul>
        </>
      ),
    },
    {
      id: "s11",
      num: "11",
      title: "Independent Contractor",
      content: (
        <p>
          Vendor is an independent contractor, not an employee, partner, or agent
          of RentSimple.
        </p>
      ),
    },
    {
      id: "s12",
      num: "12",
      title: "Data & Platform Use",
      content: (
        <>
          <p className="mb-2">Vendor agrees not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use platform data outside RentSimple</li>
            <li>Solicit users off-platform</li>
            <li>Circumvent fees</li>
          </ul>
        </>
      ),
    },
    {
      id: "s13",
      num: "13",
      title: "Governing Law",
      content: (
        <p>This Agreement is governed by the laws of Indiana.</p>
      ),
    },
  ];
  
  const VendorAgreement = () => {
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
            <p className="text-sm text-gray-500 mb-1">Vendor Agreement</p>
            <p className="text-xs text-gray-400 mb-4">
              This Agreement is entered into between RentSimple ("Platform") and the Vendor ("Vendor").
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-md px-3 py-1">
                Effective: Upon Acceptance
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
                  <span className="text-xs text-gray-400 font-mono w-5 shrink-0">
                    {s.num}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {s.title}
                    {s.important && (
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 rounded px-1.5 py-0.5 leading-none">
                        Important
                      </span>
                    )}
                  </span>
                </button>
              ))}
              <button
                onClick={() => scrollTo("s14")}
                className="flex items-center gap-2 text-left text-sm text-[#024a47] hover:underline py-1 px-1 rounded transition-colors hover:bg-[#024a47]/5"
              >
                <span className="text-xs text-gray-400 font-mono w-5 shrink-0">14</span>
                Contact
              </button>
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
                    {s.important && (
                      <span className="text-xs font-semibold text-amber-700 bg-amber-100 rounded-full px-2.5 py-0.5">
                        Very Important
                      </span>
                    )}
                  </div>
  
                  {/* Important warning card */}
                  {s.important ? (
                    <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                          Vendor Liability Notice
                        </p>
                      </div>
                      <div className="text-sm text-amber-900 leading-relaxed">
                        {s.content}
                      </div>
                    </div>
                  ) : s.critical ? (
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
          <hr className="border-gray-200 mt-0" />
          <div id="s14" className="scroll-mt-6 py-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-[#024a47] bg-[#e1f5ee] rounded px-2 py-0.5 font-mono">
                14
              </span>
              <h2 className="text-lg font-semibold text-gray-900">Contact</h2>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-3">
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
            </div>
          </div>
  
          {/* Footer */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              <span className="text-[#024a47] font-medium">RentSimple</span>
              &nbsp;·&nbsp; Vendor Agreement &nbsp;·&nbsp; Governed by the laws of Indiana
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
  
  export default VendorAgreement;