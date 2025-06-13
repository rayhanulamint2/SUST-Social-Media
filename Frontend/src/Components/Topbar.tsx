import {
  FaHome,
  FaCalendarAlt,
  FaBell,
  FaSearch,
} from "react-icons/fa";
import { jsx } from "react/jsx-runtime";

type TopbarProps = {
  onNav?: (nav: "home" | "events") => void;
  onNotices?: () => void;
  onProfile?: () => void; // <-- add
};

export default function Topbar({ onNav, onNotices, onProfile }: TopbarProps) {
  const handleProfileClick = () => {
    handleProfile();

    if (onProfile) {
      onProfile();
    }
  };

  const mainUser = JSON.parse(localStorage.getItem("user") || "[]");
  const avatar = mainUser[0].avatar;


  const handleProfile = ()=>{
    const userstring = localStorage.getItem("user")
    let currentUserId = null;

    if (userstring) {
      const mainUser = JSON.parse(userstring);
      console.log("mainuser:",mainUser)
    if (Array.isArray(mainUser) && mainUser.length > 0) {
        currentUserId = mainUser[0]._id;
        console.log("currentUserId",currentUserId)
        localStorage.setItem("currentUserId",currentUserId)
      }
    }
  }
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
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 hover:bg-green-500/80 text-white font-semibold transition-colors"
            title="Profile"
            onClick={handleProfileClick}
            // onClick={onProfile} // <-- call onProfile
          >
            {/* Replace with user's avatar if available */}
            <img
              src={avatar||"https://randomuser.me/api/portraits/men/32.jpg"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
            />
            <span className="hidden sm:inline">Profile</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
