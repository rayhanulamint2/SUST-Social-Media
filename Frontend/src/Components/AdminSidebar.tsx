import {
  FaCheckCircle,
  FaBullhorn,
  FaStickyNote,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function AdminSidebar({
  onVerification,
  onCreateNotice,
  onNotices,
  onComplaints,
}: {
  onVerification?: () => void;
  onCreateNotice?: () => void;
  onNotices?: () => void;
  onComplaints?: () => void;
}) {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[40vw] min-w-[260px] max-w-lg z-20 flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border-r border-blue-400/10 shadow-2xl rounded-r-3xl pt-8">
      <div className="flex flex-col gap-6 px-8 mt-8">
        <button
          className="flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-lg bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 text-white transition-all"
          onClick={onVerification}
        >
          <FaCheckCircle className="text-green-400 text-2xl" />
          Verification
        </button>
        <button
          className="flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-lg bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 text-white transition-all"
          onClick={onCreateNotice}
        >
          <FaBullhorn className="text-yellow-300 text-2xl" />
          Create Notice
        </button>
        <button
          className="flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-lg bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 text-white transition-all"
          onClick={onNotices}
        >
          <FaStickyNote className="text-blue-200 text-2xl" />
          Notices
        </button>
        <button
          className="flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-lg bg-gradient-to-br from-blue-950/80 to-gray-900/80 border border-blue-900/30 text-white transition-all"
          onClick={onComplaints}
        >
          <FaExclamationTriangle className="text-yellow-300 text-2xl" />
          Complaints
        </button>
      </div>
    </aside>
  );
}
