import { useState } from "react";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import React from "react";
import http from "../http";

// Dummy complaints data
const complaintsList = [
    {
        _id: "1",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        department: "CSE",
        date: "2025-06-01",
        content: "Lab computers are not working properly.",
        solved: false,
    },
    {
        _id: "2",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        department: "EEE",
        date: "2025-06-03",
        content: "Frequent power outages in the EEE building.",
        solved: false,
    },
    {
        _id: "3",
        image: "https://randomuser.me/api/portraits/men/70.jpg",
        department: "Administration",
        date: "2025-06-05",
        content: "Delay in processing scholarship documents.",
        solved: false,
    },
    {
        _id: "4",
        image: "https://randomuser.me/api/portraits/women/55.jpg",
        department: "Shahporan Hall",
        date: "2025-06-07",
        content: "Water supply issue in Hall 2.",
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
type Complaint = {
    _id: string;
    image: string;
    department: string;
    date: string;
    content: string;
    solved: boolean;
};


export default function AdminComplaint() {
    const [selectedDept, setSelectedDept] = useState("Not Specified");
    const [complaints, setComplaints] = useState<Complaint[]>(complaintsList);


    // Filter logic
    const filtered = complaints.filter((c) => {
        if (selectedDept === "Not Specified") return true;
        return c.department === selectedDept;
    });

    const fetchComplaints = async () => {
        try {
            const response = await http.get("/complaint");
            const fetched = response.data.complain;
            setComplaints(fetched);
            console.log("Complaint fetched and mapped successfully:", fetched);
        } catch (error) {
            console.error("Error fetching complaints:", error);
        }
    };

    React.useEffect(() => {
        fetchComplaints();
    }, []);


    // Handle solved
    const handleSolved = async(id: string) => {
        setComplaints((prev) => prev.filter((c) => c._id !== id));
        const payload = {
            id: id
        }
        await http.post("/complaint/update",payload);
        
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
                        key={c._id}
                        className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 rounded-2xl shadow-lg p-6"
                    >
                        <img
                            src={c.image || "https://randomuser.me/api/portraits/men/32.jpg"}
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
                            <div className="text-blue-300 text-base">{c.content}</div>
                            <button
                                className={`mt-4 px-6 py-2 rounded-full font-semibold flex items-center gap-2 shadow transition-all
                  ${c.solved
                                        ? "bg-gradient-to-r from-green-500 to-blue-500 text-white"
                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                                    }`}
                                onClick={() => handleSolved(c._id)}
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