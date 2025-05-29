import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";
import PostCreationSection from "./PostCreationSection";
import PostFeed from "./PostFeed";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pl-0 lg:pl-[20rem] pr-0 lg:pr-[24rem]">
      <Topbar />
      <Sidebar />
      <Chatbot />
      <div className="pt-10 max-w-8xl mx-auto px-4">
        <PostCreationSection />
        <PostFeed />
        {/* You can add more homepage content here */}
      </div>
    </div>
  );
}
