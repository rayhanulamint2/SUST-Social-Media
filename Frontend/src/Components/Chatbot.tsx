import { useRef, useState, useEffect } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";
import axios from "axios";


export default function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const [answer, setAnswer] = useState("");
  const http = axios.create({
    baseURL: "https://9865-34-53-3-62.ngrok-free.app", // Adjust the base URL as needed
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Use token from localStorage
    },
  });
  


  const handleSend = async(e?: React.FormEvent) => {

    if (e) e.preventDefault();
    if (!input.trim()) return;
    const fetchAnswer = async (input: string) => {
      const question = {
        "question": input,
      }
      console.log("message sent:", input.trim());
      console.log("question object:", question);
      try {
      const response = await http.post("/ask", question); // Adjust endpoint if necessary
        console.log("message get successfully:", response.data);
        setAnswer(response.data.answer);
        console.log("answer:", response.data.answer);
        return response.data.answer;
      } catch (error) {
        console.error("message fetching failed:", error);
        alert("Failed to get the answer Please check your inputs.");
      }
    }
    const answer1 = await fetchAnswer(input.trim());
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input.trim() },
      // Simulate bot reply
      {
        sender: "bot",
        text: answer1 || "I'm an AI assistant. (This is a demo response.)",
      },
    ]);
    setInput("");
  };

  return (
    <aside className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full max-w-sm z-20 hidden lg:flex flex-col bg-gray-900/90 border-l border-blue-400/10 shadow-2xl backdrop-blur-xl rounded-l-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-400/10 bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-tl-3xl">
        <FaRobot className="text-blue-400 text-2xl" />
        <span className="text-lg font-bold text-white tracking-wide">SUSTverse AI</span>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-transparent">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow
                ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-gray-800/80 text-blue-200 rounded-bl-sm"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 px-4 py-3 border-t border-blue-400/10 bg-gray-900/80 rounded-bl-3xl"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          // onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) handleSend(); }}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full bg-gray-800/80 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
        <button
          type="submit"
          title="Send message"
          className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow transition-colors"
        >
          <FaPaperPlane />
        </button>
      </form>
    </aside>
  );
}