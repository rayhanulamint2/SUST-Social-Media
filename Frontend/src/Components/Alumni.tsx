import { useState } from "react";
import { FaUserGraduate, FaUsers, FaSort, FaUserPlus } from "react-icons/fa";

// Dummy alumni data
const alumniList = [
  {
    id: 1,
    name: "Ayesha Rahman",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    department: "CSE",
    session: "2017-18",
    isFollowed: false,
  },
  {
    id: 2,
    name: "Tanvir Ahmed",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    department: "EEE",
    session: "2016-17",
    isFollowed: false,
  },
  {
    id: 3,
    name: "Mitu Sultana",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    department: "CSE",
    session: "2018-19",
    isFollowed: false,
  },
  {
    id: 4,
    name: "Shuvo Hasan",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    department: "CSE",
    session: "2015-16",
    isFollowed: false,
  },
  {
    id: 5,
    name: "Rafiul Islam",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    department: "EEE",
    session: "2017-18",
    isFollowed: false,
  },
  // ...add more alumni as needed
];

const sortOptions = [
  { key: "name", label: "Name (A-Z)" },
  { key: "session", label: "Session (Newest)" },
  { key: "department", label: "Department" },
];

export default function Alumni({ userDept = "CSE" }: { userDept?: string }) {
  const [view, setView] = useState<"university" | "department">("university");
  const [sortBy, setSortBy] = useState("name");
  const [showSort, setShowSort] = useState(false);
  const [followed, setFollowed] = useState<{ [id: number]: boolean }>({});

  // Filter and sort alumni
  let filtered = alumniList.filter(
    (a) => view === "university" || a.department === userDept
  );
  if (sortBy === "name") {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "session") {
    filtered = [...filtered].sort((a, b) => b.session.localeCompare(a.session));
  } else if (sortBy === "department") {
    filtered = [...filtered].sort((a, b) =>
      a.department.localeCompare(b.department)
    );
  }

  const handleFollow = (id: number) => {
    setFollowed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full min-h-[60vh] bg-gradient-to-br from-[#232526]/60 via-[#414345]/60 to-[#232526]/60 rounded-2xl shadow-xl p-6">
      {/* Top Controls */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-2">
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-base shadow transition-all
              ${
                view === "university"
                  ? "bg-gradient-to-r from-pink-500 to-indigo-500 text-white scale-105"
                  : "bg-gray-800/80 text-blue-200 hover:bg-blue-900/40"
              }`}
            onClick={() => setView("university")}
          >
            <FaUsers className="text-pink-400" />
            University Alumni
          </button>
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-base shadow transition-all
              ${
                view === "department"
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white scale-105"
                  : "bg-gray-800/80 text-blue-200 hover:bg-blue-900/40"
              }`}
            onClick={() => setView("department")}
          >
            <FaUserGraduate className="text-green-400" />
            Department Alumni
          </button>
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold shadow hover:from-yellow-500 hover:to-pink-500 transition-all"
            onClick={() => setShowSort((s) => !s)}
            title="Sort"
          >
            <FaSort className="text-white" />
            Sort
          </button>
          {showSort && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-900 border border-blue-700 rounded-xl shadow-lg flex flex-col z-20">
              {sortOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`px-4 py-2 text-blue-200 hover:bg-blue-800/60 rounded-xl text-left ${
                    sortBy === opt.key ? "bg-blue-900/60 font-bold" : ""
                  }`}
                  onClick={() => {
                    setSortBy(opt.key);
                    setShowSort(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Alumni Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((alum) => (
          <div
            key={alum.id}
            className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col items-center gap-3"
          >
            <img
              src={alum.avatar}
              alt={alum.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow"
            />
            <div className="text-lg font-bold text-white text-center">
              {alum.name}
            </div>
            <div className="text-blue-300 text-base">{alum.department}</div>
            <div className="text-blue-200 text-sm">{alum.session}</div>
            <button
              className={`mt-2 px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow transition-all
                ${
                  followed[alum.id]
                    ? "bg-gradient-to-r from-green-400 to-blue-500 text-white"
                    : "bg-gradient-to-r from-pink-500 to-indigo-500 text-white hover:from-pink-600 hover:to-indigo-600"
                }`}
              onClick={() => handleFollow(alum.id)}
            >
              <FaUserPlus />
              {followed[alum.id] ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
