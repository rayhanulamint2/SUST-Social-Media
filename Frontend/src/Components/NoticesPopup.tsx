import { useState } from "react";
import { FaCalendarAlt, FaFileAlt, FaExpand, FaTimes } from "react-icons/fa";
import busRoutineImg from "../assets/sust bus routine.jpeg";

const universityNotices = [
  {
    headline: "Semester Final Exam Routine Published",
    start: "2025-06-10",
    end: "2025-06-25",
    attachment: "https://sust.edu/notice/semester-final-exam-routine.pdf",
  },
  {
    headline: "University Closed for Eid-ul-Adha",
    start: "2025-06-15",
    end: "2025-06-20",
    attachment: "https://sust.edu/notice/university-closed-eid-ul-adha.pdf",
  },
];

const departmentNotices = [
  {
    headline: "CSE Project Submission Deadline",
    start: "2025-06-12",
    end: "2025-06-18",
    attachment: "https://sust.edu/notice/cse-project-submission.pdf",
  },
  {
    headline: "Departmental Seminar on AI",
    start: "2025-06-22",
    end: "2025-06-22",
    attachment: "https://sust.edu/notice/cse-ai-seminar.pdf",
  },
];

export default function NoticesPopup({
  open,
  onClose,
  userDepartment = "CSE",
}: {
  open: boolean;
  onClose: () => void;
  userDepartment?: string;
}) {
  const [tab, setTab] = useState<"university" | "department" | "bus">(
    "university"
  );
  const [enlargeBus, setEnlargeBus] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* Bus Enlarge Modal */}
      {enlargeBus && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90">
          <button
            className="absolute top-8 right-8 text-white text-3xl hover:text-red-400"
            onClick={() => setEnlargeBus(false)}
            title="Close"
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <img
            src={busRoutineImg}
            alt="SUST Bus Routine"
            className="rounded-xl border-4 border-green-400 shadow-2xl max-h-[90vh] w-auto"
          />
        </div>
      )}

      <div className="relative w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-0">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-xl"
          onClick={onClose}
          title="Close"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        {/* Tabs */}
        <div className="flex gap-2 p-6 pb-2 border-b border-blue-400/10">
          <button
            className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${
              tab === "university"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-800/80 text-blue-300 hover:bg-blue-900/40"
            }`}
            onClick={() => setTab("university")}
            title="University Notices"
          >
            University Notices
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${
              tab === "department"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-800/80 text-indigo-300 hover:bg-indigo-900/40"
            }`}
            onClick={() => setTab("department")}
            title="Department Notices"
          >
            {userDepartment} Notices
          </button>
          <button
            className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${
              tab === "bus"
                ? "bg-green-600 text-white shadow"
                : "bg-gray-800/80 text-green-300 hover:bg-green-900/40"
            }`}
            onClick={() => setTab("bus")}
            title="Bus Schedule"
          >
            Bus Schedule
          </button>
        </div>
        {/* Content */}
        <div className="p-6 pt-4 min-h-[350px] max-h-[70vh]">
          {tab === "university" && (
            <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2">
              {universityNotices.map((notice, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-gradient-to-br from-blue-900/70 to-blue-800/60 border border-blue-400/20 shadow flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <FaFileAlt className="text-blue-300 text-xl" />
                    <span className="text-lg font-semibold text-blue-100">
                      {notice.headline}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-blue-200">
                    <FaCalendarAlt className="text-blue-400" />
                    {notice.start === notice.end
                      ? `Date: ${notice.start}`
                      : `From: ${notice.start} To: ${notice.end}`}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                      onClick={() => window.open(notice.attachment, "_blank")}
                      title="View Attachment"
                    >
                      <FaFileAlt className="mr-1" /> View Attachment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "department" && (
            <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-2">
              {departmentNotices.map((notice, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-gradient-to-br from-indigo-900/70 to-indigo-800/60 border border-indigo-400/20 shadow flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <FaFileAlt className="text-indigo-300 text-xl" />
                    <span className="text-lg font-semibold text-indigo-100">
                      {notice.headline}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-indigo-200">
                    <FaCalendarAlt className="text-indigo-400" />
                    {notice.start === notice.end
                      ? `Date: ${notice.start}`
                      : `From: ${notice.start} To: ${notice.end}`}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="mt-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      onClick={() => window.open(notice.attachment, "_blank")}
                      title="View Attachment"
                    >
                      <FaFileAlt className="mr-1" /> View Attachment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {tab === "bus" && (
            <div>
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <img
                  src={busRoutineImg}
                  alt="SUST Bus Routine"
                  className="rounded-xl border border-green-400 shadow max-h-[400px] w-auto"
                />
                <button
                  className="absolute bottom-2 right-2 px-3 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 shadow"
                  onClick={() => setEnlargeBus(true)}
                  title="Enlarge"
                >
                  <FaExpand className="mr-1" /> Enlarge
                </button>
              </div>
              <div className="mt-3 text-green-300 text-lg font-semibold">
                SUST Bus Schedule
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}