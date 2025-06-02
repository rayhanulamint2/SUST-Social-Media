import {
  FaUserCircle,
  FaLeaf,
  FaGlobe,
  FaSuitcase,
  FaChalkboardTeacher,
  FaFileAlt,
  FaUsers,
  FaExclamationCircle,
  FaComments,
  FaQuestionCircle,
  FaMountain,
} from "react-icons/fa";

const topics = [
  { name: "Adventure", icon: <FaMountain className="text-blue-400" /> },
  { name: "Nature", icon: <FaLeaf className="text-green-400" /> },
  { name: "Travel", icon: <FaGlobe className="text-indigo-400" /> },
  { name: "Career", icon: <FaSuitcase className="text-yellow-400" /> },
  {
    name: "Workshop",
    icon: <FaChalkboardTeacher className="text-purple-400" />,
  },
  { name: "Paper Publication", icon: <FaFileAlt className="text-pink-400" /> },
];

export default function Sidebar({
  onComplaintBox,
}: {
  onComplaintBox?: () => void;
}) {
  // Dummy user data
  const user = {
    name: "Khalid",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-full max-w-xs z-20 hidden lg:flex flex-col justify-between bg-gray-900/90 border-r border-blue-400/10 shadow-2xl backdrop-blur-xl rounded-r-3xl">
      <div>
        {/* Topics Section */}
        <div className="px-4 py-4 border-b border-blue-400/10">
          <div className="text-gray-400 font-semibold text-xs mb-2 pl-2">
            Tags
          </div>
          <div className="max-h-60 overflow-y-auto pr-1 custom-scrollbar">
            {topics.map((topic) => (
              <button
                key={topic.name}
                className="flex items-center gap-3 w-full px-3 py-2 mb-1 rounded-xl bg-gray-800/70 hover:bg-blue-500/20 text-white text-sm font-medium transition-colors"
              >
                {topic.icon}
                <span>{topic.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Alumni Button */}
        <button className="flex items-center gap-3 px-6 py-4 border-b border-blue-400/10 hover:bg-blue-500/10 transition-colors text-white text-base font-medium w-full text-left">
          <FaUsers className="text-emerald-400" />
          Alumni
        </button>

        {/* Complaint Box */}
        <button
          onClick={onComplaintBox}
          className="flex items-center gap-3 px-6 py-4 border-b border-blue-400/10 hover:bg-red-500/10 transition-colors text-white text-base font-medium w-full text-left"
        >
          <FaExclamationCircle className="text-red-400" />
          Complaint Box
        </button>

        {/* Chat */}
        <button className="flex items-center gap-3 px-6 py-4 border-b border-blue-400/10 hover:bg-indigo-500/10 transition-colors text-white text-base font-medium w-full text-left">
          <FaComments className="text-indigo-400" />
          Chat
        </button>

        {/* Need Help */}
        <button className="flex items-center gap-3 px-6 py-4 hover:bg-blue-400/10 transition-colors text-white text-base font-medium w-full text-left">
          <FaQuestionCircle className="text-blue-400" />
          Need Help?
        </button>
      </div>

      {/* Profile Section at Bottom */}
      <div>
        <button className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-br-3xl hover:bg-blue-900/20 transition-colors w-full">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-blue-500 object-cover"
          />
          <div className="flex flex-col items-start">
            <span className="text-white font-semibold text-lg">
              {user.name}
            </span>
            <span className="text-blue-400 text-xs flex items-center gap-1">
              <FaUserCircle /> Profile
            </span>
          </div>
        </button>
      </div>
    </aside>
  );
}
