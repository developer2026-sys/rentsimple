import React from "react";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const DashboardHeader = ({ renter, vendor }) => {
  const navigate = useNavigate();

  const clientByline = () => {
    if (renter) {
      return `Welcome, ${renter?.name || 'Renter'}`;
    } else if (vendor) {
      return vendor?.businessName || 'Vendor Dashboard';
    } else {
      return 'Welcome';
    }
  }

  const headerButton = () => (
    <button
      onClick={() => {
        if (renter) {
          navigate('/appliance');
        }
      }}
      className={`flex items-center space-x-3 ${renter ? 'cursor-pointer' : ''}`}
    >
      <div className="w-10 h-10 bg-[#024a47] rounded-lg flex items-center justify-center">
        <Home className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-[#024a47]">RentSimple</h1>
        <p className="text-sm text-gray-600">
          {clientByline()}
        </p>
      </div>
    </button>
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {headerButton()}
          <div className="flex items-center space-x-4">
            {vendor?.isVerified ? (
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                Verified
              </span>
            ) : null}
            <LogoutButton renter={renter} vendor={vendor} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;