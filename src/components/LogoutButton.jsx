import React from "react";
import { LogOut } from "lucide-react";

const LogoutButton = ({ renter, vendor }) => {
  const handleLogout = () => {
    if (vendor) {
      localStorage.removeItem('vendorToken');
    } else if (renter) {
      localStorage.removeItem('token');
    }
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-600 hover:text-[#024a47] cursor-pointer"
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutButton;