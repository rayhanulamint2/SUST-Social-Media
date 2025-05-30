import { FaHome, FaCalendarAlt, FaBell, FaUserCircle, FaSearch } from "react-icons/fa";

export default function Topbar({ onNav }: { onNav?: (nav: "home" | "events") => void }) {
  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-gray-900/80 backdrop-blur-xl border-b border-blue-400/10 shadow-lg">
      <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow">
            <span className="text-white text-xl font-bold font-mono select-none">SV</span>
          </div>
          <span className="text-white text-xl font-bold tracking-wide font-sans select-none">SUSTverse</span>
        </div>
        {/* Searchbar */}
        <div className="flex-1 mx-6 max-w-md">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
            <input
              type="text"
              placeholder="Search SUSTverse..."
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
          >
            <FaBell className="text-lg" />
            <span className="hidden sm:inline">Notices</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 hover:bg-blue-400/80 text-white font-semibold transition-colors"
            title="Profile"
          >
            <FaUserCircle className="text-lg" />
            <span className="hidden sm:inline">Profile</span>
          </button>
        </nav>
      </div>
    </header>
  );
}