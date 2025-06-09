import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";
import PostCreationSection from "./PostCreationSection";
import PostFeed from "./PostFeed";
import EventFeed from "./EventFeed";
import NoticesPopup from "./NoticesPopup";
import ComplaintBox from "./ComplaintBox";
import UserProfile from "./UserProfile";
import Alumni from "./Alumni"; // <-- import Alumni

export default function Homepage() {
  const [mainFeed, setMainFeed] = useState<"home" | "events" | "alumni">(
    "home"
  );
  const [showNotices, setShowNotices] = useState(false);
  const [showComplaintBox, setShowComplaintBox] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // If profile page is open, show only that
  if (showProfile) {
    return <UserProfile onBack={() => setShowProfile(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pl-0 lg:pl-[20rem] pr-0 lg:pr-[24rem]">
      <Topbar
        onNav={(nav) => setMainFeed(nav)}
        onNotices={() => setShowNotices(true)}
        onProfile={() => setShowProfile(true)}
      />
      <Sidebar
        onComplaintBox={() => setShowComplaintBox(true)}
        onProfile={() => setShowProfile(true)}
        onAlumni={() => setMainFeed("alumni")} // <-- add this line
      />
      <Chatbot />
      <div className="pt-10 max-w-8xl mx-auto px-4">
        <PostCreationSection />
        {mainFeed === "alumni" ? (
          <Alumni userDept="CSE" />
        ) : mainFeed === "home" ? (
          <PostFeed />
        ) : (
          <EventFeed />
        )}
      </div>
      <NoticesPopup
        open={showNotices}
        onClose={() => setShowNotices(false)}
        userDepartment="CSE"
      />
      <ComplaintBox
        open={showComplaintBox}
        onClose={() => setShowComplaintBox(false)}
      />
    </div>
  );
}
