import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";
import PostCreationSection from "./PostCreationSection";
import PostFeed from "./PostFeed";
import EventFeed from "./EventFeed";

export default function Homepage() {
  // "home" for post feed, "events" for event feed
  const [mainFeed, setMainFeed] = useState<"home" | "events">("home");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pl-0 lg:pl-[20rem] pr-0 lg:pr-[24rem]">
      <Topbar onNav={(nav) => setMainFeed(nav)} />
      <Sidebar />
      <Chatbot />
      <div className="pt-10 max-w-8xl mx-auto px-4">
        <PostCreationSection />
        {mainFeed === "home" ? <PostFeed /> : <EventFeed />}
      </div>
    </div>
  );
}