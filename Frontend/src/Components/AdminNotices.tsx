import { useState } from "react";
import React from "react";
import { FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";
import http from "../http";
export interface Notice {
    _id: string;
    createdAt: string; // ISO date string
    department: string;
    description: string;
    endDate: string; // ISO date string
    filePath: string;
    isDepartmentPost: boolean;
    startDate: string; // ISO date string
    __v: number;
}

// Dummy data for demonstration
const dummyNotices: Notice[] = [
    {
        _id: "1",
        description: "Orientation for new students. Join on time.",
        department: "CSE",
        isDepartmentPost: true,
        startDate: "2025-06-15T10:00:00.000Z",
        endDate: "2025-06-15T13:00:00.000Z",
        filePath: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        createdAt: "2025-06-10T08:00:00.000Z",
        __v: 0,
    },
    {
        _id: "2",
        description: "The semester final exam schedule has been published.",
        department: "EEE",
        isDepartmentPost: true,
        startDate: "2025-07-01T09:00:00.000Z",
        endDate: "2025-07-10T17:00:00.000Z",
        filePath: "https://www.orimi.com/pdf-test.pdf",
        createdAt: "2025-06-12T12:00:00.000Z",
        __v: 0,
    },
];



export default function AdminNotices() {
    const [notices, setNotices] = useState(dummyNotices);

    const fetchNotices = async () => {
        try {
            const response = await http.get("/notice");
            console.log("Posts fetched successfully:", response.data.notices);
            setNotices(response.data.notices)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };
    React.useEffect(() => {
        fetchNotices();
    }, []);
    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
        const formattedTime = date.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        return { formattedDate, formattedTime };
    }
    const handleDelete = async (id: string) => {
        try {
            // Optional: call API to delete from backend
            await http.delete(`/notice/${id}`);

            // Update local state to remove the notice
            setNotices((prev) => prev.filter((notice) => notice._id !== id));
        } catch (error) {
            console.error("Error deleting notice:", error);
        }
    };


    return (
        <div className="ml-[1vw] mt-2 px-24 py-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-[calc(100vh-4rem)]">
            <div className="max-w-3xl mx-auto flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-blue-200 mb-2">Notices</h2>
                {notices?.length === 0 && (
                    <div className="text-blue-300 text-lg text-center py-12">
                        No notices available.
                    </div>
                )}
                {notices?.map((notice) => (
                    <div
                        key={notice._id}
                        className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-xl font-bold text-white">
                                <FaFileAlt className="text-blue-400" />
                                {notice.description}
                            </div>
                            <div className="text-blue-200 text-base">
                                Start:{" "}
                                <span className="font-semibold">
                                    {(() => {
                                        const { formattedDate, formattedTime } = formatDateTime(notice.startDate);
                                        return `${formattedDate} ${formattedTime}`;
                                    })()}
                                </span>
                            </div>
                            <div className="text-blue-200 text-base">
                                End:{" "}
                                <span className="font-semibold">
                                    {(() => {
                                        const { formattedDate, formattedTime } = formatDateTime(notice.endDate);
                                        return `${formattedDate} ${formattedTime}`;
                                    })()}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <a
                                href={notice.filePath}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-all"
                            >
                                <FaExternalLinkAlt />
                                View Attachment
                            </a>
                            <button
                                onClick={() => handleDelete(notice._id)}
                                className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-all"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}