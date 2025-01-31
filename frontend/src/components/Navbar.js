import React from "react";
import { Link } from "react-router-dom";
import { HiUser, HiLogin, HiLogout, HiUserAdd } from "react-icons/hi";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <HiUser className="text-2xl" />
          SocialApp
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <HiUser className="text-lg" />
                Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="flex items-center gap-1 text-gray-600 hover:text-red-600"
              >
                <HiLogout className="text-lg" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <HiLogin className="text-lg" />
                Login
              </Link>
              <Link to="/register" className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
                <HiUserAdd className="text-lg" />
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;