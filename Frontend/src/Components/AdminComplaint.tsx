import { useState } from "react";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";

// Dummy complaints data
const complaintsList = [
  {
    id: 1,
    docPic: "https://randomuser.me/api/portraits/men/32.jpg",
    department: "CSE",
    date: "2025-06-01",
    description: "Lab computers are not working properly.",
    solved: false,
  },
  {
    id: 2,
    docPic: "https://randomuser.me/api/portraits/women/44.jpg",
    department: "EEE",
    date: "2025-06-03",
    description: "Frequent power outages in the EEE building.",
    solved: false,
  },
  {
    id: 3,
    docPic: "https://randomuser.me/api/portraits/men/70.jpg",
    department: "Administration",
    date: "2025-06-05",
    description: "Delay in processing scholarship documents.",
    solved: false,
  },
  {
    id: 4,
    docPic: "https://randomuser.me/api/portraits/women/55.jpg",
    department: "Shahporan Hall",
    date: "2025-06-07",
    description: "Water supply issue in Hall 2.",
    solved: false,
  },
];

const departments = [
  "Not Specified",
  "FES",
  "ARC",
  "CEP",
  "CEE",
  "CSE",
  "EEE",
  "FET",
  "IPE",
  "MEE",
  "PME",
  "SWE",
  "BMB",
  "GEB",
  "Business Administration",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Statistics",
  "GEE",
  "OCG",
  "ANP",
  "BNG",
  "ECO",
  "ENG",
  "PSS",
  "PAD",
  "SCW",
  "SOC",
  "Academic Building A",
  "Academic Building B",
  "Academic Building C",
  "Academic Building D",
  "Academic Building E",
  "D Building Extension",
  "SUST IICT",
  "SUST Library",
  "SUST Central Mosque",
  "SUST Central Cafeteria",
  "Administration Building",
  "Controller Building",
  "Post Office",
  "SUST Bank",
  "Foodcourt",
  "SUST Medical Center",
  "SUST Central Field",
  "SUST Handball Field",
  "SUST Basketball Court",
  "SUST Shaheed Minar",
  "SUST Golchottor",
  "SUST Central Auditorium",
  "SUST Mini Auditorium",
  "Shahporan Hall",
  "Second Hall",
  "Syed Mujtaba Ali Hall",
  "First ladies hall",
  "Begum Sirajunnesa Chowdhury hall",
  "Begum Fajilatunnesa mujib hall",
];

export default function AdminComplaint() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [complaints, setComplaints] = useState(complaintsList);

  // Filter logic
  const filtered = complaints.filter((c) => {
    if (selectedDept === "All") return true;
    return c.department === selectedDept;
  });

  // Handle solved
  const handleSolved = (id: number) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, solved: true } : c))
    );
    // Optionally, send solved status to backend here
  };

  return (
    <div className="ml-[1vw] mt-2 px-8 py-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-[calc(100vh-4rem)]">
      {/* Department Dropdown */}
      <div className="mb-8">
        <label
          className="block text-blue-300 font-semibold mb-2"
          htmlFor="department-select"
        >
          Filter by Department/Administration/Hall:
        </label>
        <select
          id="department-select"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full max-w-xs px-4 py-2 rounded-lg bg-gray-800 text-blue-100 border border-blue-700 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      {/* Complaints List */}
      <div className="flex flex-col gap-8 max-w-3xl">
        {filtered.length === 0 && (
          <div className="text-blue-300 text-lg text-center py-12">
            No complaints for this department.
          </div>
        )}
        {filtered.map((c) => (
          <div
            key={c.id}
            className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 rounded-2xl shadow-lg p-6"
          >
            <img
              src={c.docPic}
              alt="Document"
              className="w-28 h-28 rounded-xl object-cover border-4 border-blue-400 shadow"
            />
            <div className="flex-1 flex flex-col gap-2">
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <FaFileAlt className="text-blue-400" />
                {c.department}
              </div>
              <div className="text-blue-200 text-base">
                Date: <span className="font-semibold">{c.date}</span>
              </div>
              <div className="text-blue-300 text-base">{c.description}</div>
              <button
                className={`mt-4 px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow transition-all
                  ${
                    c.solved
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                  }`}
                onClick={() => handleSolved(c.id)}
                disabled={c.solved}
              >
                <FaCheckCircle />
                {c.solved ? "Solved" : "Mark as Solved"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
