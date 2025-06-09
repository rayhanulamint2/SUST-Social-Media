import { useState } from "react";
import AdminTopbar from "./AdminTopbar";
import AdminSidebar from "./AdminSidebar";
import AdminVerification from "./AdminVerification";
import AdminCreateNotice from "./AdminCreateNotice";
import AdminNotices from "./AdminNotices";
import AdminComplaint from "./AdminComplaint";

export default function AdminHomepage() {
  const [section, setSection] = useState<
    "verification" | "createNotice" | "notices" | "complaints"
  >("verification");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <AdminTopbar />
      <div className="flex pt-16 min-h-[calc(100vh-4rem)]">
        {/* Sidebar - 40% */}
        <aside className="w-[40vw] min-w-[220px] max-w-lg">
          <AdminSidebar
            onVerification={() => setSection("verification")}
            onCreateNotice={() => setSection("createNotice")}
            onNotices={() => setSection("notices")}
            onComplaints={() => setSection("complaints")}
          />
        </aside>
        {/* Main Content - fill remaining space, centered */}
        <main className="flex-1 flex justify-center items-start overflow-y-auto">
          <div className="w-full">
            {section === "verification" && <AdminVerification />}
            {section === "createNotice" && <AdminCreateNotice />}
            {section === "notices" && <AdminNotices />}
            {section === "complaints" && <AdminComplaint />}
          </div>
        </main>
      </div>
    </div>
  );
}
