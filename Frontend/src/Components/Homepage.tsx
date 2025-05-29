import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Chatbot from "./Chatbot";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pl-0 lg:pl-[20rem] pr-0 lg:pr-[24rem]">
      <Topbar />
      <Sidebar />
      <Chatbot />
      <div className="pt-16 max-w-6xl mx-auto px-4">
        {/* Your homepage content goes here */}
      </div>
    </div>
  );
}