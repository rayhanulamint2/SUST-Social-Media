import React, { useState, useRef, useEffect } from "react";
import {
  FaHome,
  FaCalendarAlt,
  FaBell,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jsx } from "react/jsx-runtime";

type TopbarProps = {
  onNav?: (nav: "home" | "events") => void;
  onNotices?: () => void;
  onProfile?: () => void;
};

export default function Topbar({ onNav, onNotices }: TopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Retrieve user info
  const mainUser = JSON.parse(localStorage.getItem("user") || "[]");
  const avatar = mainUser?.[0]?.avatar || "https://randomuser.me/api/portraits/men/32.jpg";
  const userId = mainUser?.[0]?._id;

  // Handle click outside dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProfileNavigate = () => {
    setDropdownOpen(false);
    if (userId) {
      navigate("/user");
    } else {
      navigate("/user");
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUserId");
    setShowLogoutModal(false);
    navigate("/login");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-gray-900/80 backdrop-blur-xl border-b border-blue-400/10 shadow-lg">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
            <span className="text-white text-xl font-bold font-mono select-none">
              SV
            </span>
          </div>
          <span className="text-white text-xl font-bold tracking-wide font-sans select-none">
            SUSTverse
          </span>
        </div>
        {/* Searchbar */}
        <div className="flex-1 mx-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
            <input
              type="text"
              placeholder="Search in SUSTverse..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none text-sm shadow"
            />
          </div>
        </div>
        {/* Buttons */}
        <nav className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 hover:bg-blue-500/80 text-white font-semibold transition-colors"
            title="Home"
            onClick={() => onNav && onNav("home")}
          >
            <FaHome className="text-lg" />
            <span className="hidden sm:inline">Home</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 hover:bg-indigo-500/80 text-white font-semibold transition-colors"
            title="Events"
            onClick={() => onNav && onNav("events")}
          >
            <FaCalendarAlt className="text-lg" />
            <span className="hidden sm:inline">Events</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 hover:bg-purple-500/80 text-white font-semibold transition-colors"
            title="Notices"
            onClick={() => onNotices && onNotices()}
          >
            <FaBell className="text-lg" />
            <span className="hidden sm:inline">Notices</span>
          </button>
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 hover:bg-green-500/80 text-white font-semibold transition-colors relative"
              title="Profile"
              onClick={handleProfileClick}
            >
              <img
                src={avatar}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
              />
              <span className="hidden sm:inline">Profile</span>
              <FaChevronDown className="text-xs" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-gray-900/95 text-white rounded-lg shadow-lg z-40 border border-blue-400/10 overflow-hidden font-semibold animate-fadeIn">
                <button
                  className="flex w-full items-center gap-2 px-4 py-3 hover:bg-blue-500/80 transition text-left"
                  onClick={handleProfileNavigate}
                >
                  <span>Profile</span>
                </button>
                <button
                  className="flex w-full items-center gap-2 px-4 py-3 hover:bg-red-500/80 text-red-400 hover:text-white transition text-left"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="my-auto flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 border border-blue-400/20 rounded-xl p-7 w-80 shadow-2xl flex flex-col items-center animate-fadeIn">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828479.png"
              alt="Logout Icon"
              className="w-12 h-12 mb-3"
            />
            <h3 className="text-xl font-bold mb-2 text-white">Log out of SUSTverse?</h3>
            <p className="text-gray-300 mb-5 text-center text-sm">
              Are you sure you want to log out?<br />You’ll need to enter your credentials to log in again.
            </p>
            <div className="flex gap-2 w-full">
              <button
                className="flex-1 py-2 rounded bg-gray-700 text-gray-200 font-semibold hover:bg-gray-800 transition"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-2 rounded bg-red-500 text-white font-bold hover:bg-red-600 transition"
                onClick={confirmLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}