import { useState } from "react";
import { FaFileAlt, FaExternalLinkAlt } from "react-icons/fa";

// Dummy data for demonstration
const dummyNotices = [
    {
        id: 1,
        name: "Orientation Program",
        startDate: "2025-06-15",
        startTime: "10:00",
        endDate: "2025-06-15",
        endTime: "13:00",
        documentUrl:
            "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
    {
        id: 2,
        name: "Semester Final Exam",
        startDate: "2025-07-01",
        startTime: "09:00",
        endDate: "2025-07-10",
        endTime: "17:00",
        documentUrl: "https://www.orimi.com/pdf-test.pdf",
    },
];

export default function AdminNotices() {
    const [notices] = useState(dummyNotices);

    return (
        <div className="ml-[1vw] mt-2 px-24 py-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-[calc(100vh-4rem)]">
            <div className="max-w-3xl mx-auto flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-blue-200 mb-2">Notices</h2>
                {notices.length === 0 && (
                    <div className="text-blue-300 text-lg text-center py-12">
                        No notices available.
                    </div>
                )}
                {notices.map((notice) => (
                    <div
                        key={notice.id}
                        className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 rounded-2xl shadow-lg p-6"
                    >
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-xl font-bold text-white">
                                <FaFileAlt className="text-blue-400" />
                                {notice.name}
                            </div>
                            <div className="text-blue-200 text-base">
                                Start:{" "}
                                <span className="font-semibold">
                                    {notice.startDate} {notice.startTime}
                                </span>
                            </div>
                            <div className="text-blue-200 text-base">
                                End:{" "}
                                <span className="font-semibold">
                                    {notice.endDate} {notice.endTime}
                                </span>
                            </div>
                        </div>
                        <div>
                            <a
                                href={notice.documentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition-all"
                            >
                                <FaExternalLinkAlt />
                                View Attachment
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}