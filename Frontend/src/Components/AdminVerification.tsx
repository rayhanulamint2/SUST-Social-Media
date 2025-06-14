import { useState } from "react";

import http from "../http";
import React from "react";

// Dummy data for demonstration
const verificationList = [
    {
        id: 1,
        name: "Ayesha Rahman",
        regNo: "2018331001",
        department: "CSE",
        session: "2018-19",
        designation: "",
        docPic: "https://randomuser.me/api/portraits/women/44.jpg",
        type: "Student",
        verified: false,
    },
    {
        id: 2,
        name: "Tanvir Ahmed",
        regNo: "2017332002",
        department: "EEE",
        session: "2017-18",
        designation: "",
        docPic: "https://randomuser.me/api/portraits/men/50.jpg",
        type: "Student",
        verified: false,
    },
    {
        id: 3,
        name: "Mitu Sultana",
        regNo: "EMP-1001",
        department: "",
        session: "",
        designation: "Office Assistant",
        docPic: "https://randomuser.me/api/portraits/women/55.jpg",
        type: "Employee",
        verified: false,
    },
    {
        id: 4,
        name: "Shuvo Hasan",
        regNo: "2015331003",
        department: "CSE",
        session: "2015-16",
        designation: "",
        docPic: "https://randomuser.me/api/portraits/men/60.jpg",
        type: "Student",
        verified: false,
    },
    {
        id: 5,
        name: "Rafiul Islam",
        regNo: "EMP-1002",
        department: "",
        session: "",
        designation: "Admin Officer",
        docPic: "https://randomuser.me/api/portraits/men/70.jpg",
        type: "Employee",
        verified: false,
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
    "SUST Medical Center",
    "SUST Central Auditorium",
    "SUST Mini Auditorium",
    "Shahporan Hall",
    "Second Hall",
    "Syed Mujtaba Ali Hall",
    "First ladies hall",
    "Begum Sirajunnesa Chowdhury hall",
    "Begum Fajilatunnesa mujib hall",
];

export default function AdminVerification() {
    const [selectedDept, setSelectedDept] = useState("Not Specified");
    const [verifications, setVerifications] = useState(
        verificationList.map((v) => ({
            ...v,
            id: String(v.id), // Ensure all IDs are strings
            status: v.verified ? "Verified" : "Unverified",
        }))
    );


    const fetchUserInfo = async () => {
        try {
            const response = await http.get("/userVerification");

            const fetchedUsers = response.data.users;
            console.log("fetchedUsers ", fetchedUsers);

            const transformed = fetchedUsers.map((user) => ({
                id: user._id,
                name: user.name,
                regNo: user.regNo,
                department: user.department || "",
                session: user.session || "",
                docPic: user.fillPath && user.fillPath.trim() !== ""
                    ? user.fillPath
                    : "https://unsplash.com/photos/stack-of-paper-files-and-pen-business-equipment-on-office-table-qGTymDfxq6A",
                verified: user.verified ?? false,
            }));

            setVerifications(transformed);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    React.useEffect(() => {
        fetchUserInfo();
    }, []);

    // Filter logic
    const filtered = verifications.filter((v) => {
        if (selectedDept === "Not Specified") return true;
        return v.department === selectedDept;
    });

    // Handle radio change
    const handleRadio = (id: string, status: "Verified" | "Unverified") => {
        setVerifications((prev) =>
            prev.map((v) => (v.id === id ? { ...v, status } : v))
        );
    };


    // Handle confirm
    const handleConfirm = async(id: string) => {
        setVerifications((prev) =>
            prev.filter((v) => v.id !== id)
        );
        const current = verifications.find((v) => v.id === id);
        if (!current) return;

        const payload = {
            id: id,
            verified: current.status === "Verified",
        };

        console.log("payload from notice ", payload);

        // send verification status to backend here

        const changedUser =  await http.put('/userVerification/verify', payload);
        console.log(changedUser);
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
            {/* Cards List */}
            <div className="flex flex-col gap-8 max-w-3xl">
                {filtered.length === 0 && (
                    <div className="text-blue-300 text-lg text-center py-12">
                        No pending verifications for this department.
                    </div>
                )}
                {filtered.map((v) => (
                    <div
                        key={v.id}
                        className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 rounded-2xl shadow-lg p-6"
                    >
                        <img
                            src={v.docPic}
                            alt="Document"
                            className="w-28 h-28 rounded-xl object-cover border-4 border-blue-400 shadow"
                        />
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="text-xl font-bold text-white">{v.name}</div>
                            <div className="text-blue-200 text-base">
                                Reg. No.: <span className="font-semibold">{v.regNo}</span>
                            </div>
                            {v.type !== "Employee" && (
                                <div className="text-blue-200 text-base">
                                    Department:{" "}
                                    <span className="font-semibold">{v.department}</span>
                                </div>
                            )}
                            {v.type === "Employee" && (
                                <div className="text-blue-200 text-base">
                                    Designation:{" "}
                                    <span className="font-semibold">{v.designation}</span>
                                </div>
                            )}
                            {v.session && (
                                <div className="text-blue-300 text-base">
                                    Session: <span className="font-semibold">{v.session}</span>
                                </div>
                            )}
                            {/* Radio Buttons */}
                            <div className="flex gap-6 mt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`verify-${v.id}`}
                                        checked={v.status === "Verified"}
                                        onChange={() => handleRadio(v.id, "Verified")}
                                        className="accent-blue-500"
                                    />
                                    <span className="text-blue-200">Verified</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`verify-${v.id}`}
                                        checked={v.status === "Unverified"}
                                        onChange={() => handleRadio(v.id, "Unverified")}
                                        className="accent-blue-500"
                                    />
                                    <span className="text-blue-200">Unverified</span>
                                </label>
                            </div>
                            {/* Confirm Button */}
                            <button
                                className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-all w-max"
                                onClick={() => handleConfirm(v.id)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}