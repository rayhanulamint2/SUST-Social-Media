import { useRef, useState } from "react";
import {
  FaEllipsisV,
  FaPaperPlane,
  FaPlus,
  FaPaperclip,
  FaTimes,
  FaCamera,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

// Dummy data for demonstration
const GROUPS = [
  {
    id: "g1",
    name: "CSE 18 Batch",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      { from: "You", text: "Hi everyone!", time: "10:00" },
      { from: "Ayesha", text: "Hello!", time: "10:01" },
    ],
  },
  {
    id: "g2",
    name: "SUSTverse Devs",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    messages: [
      { from: "You", text: "Code review at 5pm?", time: "09:00" },
      { from: "Tanvir", text: "Sure!", time: "09:05" },
    ],
  },
];

const DIRECTS = [
  {
    id: "d1",
    name: "Ayesha Rahman",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    messages: [
      { from: "You", text: "Hey, how are you?", time: "08:00" },
      { from: "Ayesha", text: "I'm good, you?", time: "08:01" },
    ],
  },
  {
    id: "d2",
    name: "Tanvir Ahmed",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    messages: [
      { from: "You", text: "Ready for the meeting?", time: "07:00" },
      { from: "Tanvir", text: "Yes!", time: "07:01" },
    ],
  },
];

export default function Chat() {
  // State for selected chat (group or direct)
  const [selected, setSelected] = useState<{
    type: "group" | "direct";
    id: string;
  } | null>(GROUPS.length > 0 ? { type: "group", id: GROUPS[0].id } : null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [showGroupMenu, setShowGroupMenu] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditNamePopup, setShowEditNamePopup] = useState(false);
  const [showEditPhotoPopup, setShowEditPhotoPopup] = useState(false);
  const [editGroupName, setEditGroupName] = useState("");
  const [editGroupPhoto, setEditGroupPhoto] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dummy people list for search
  const PEOPLE = [
    { id: "p1", name: "Ayesha Rahman" },
    { id: "p2", name: "Tanvir Ahmed" },
    { id: "p3", name: "Rafiul Islam" },
    { id: "p4", name: "Sadia Noor" },
  ];

  // Find selected chat data
  const chatData =
    selected?.type === "group"
      ? GROUPS.find((g) => g.id === selected.id)
      : DIRECTS.find((d) => d.id === selected?.id);

  // Handle sending message (dummy)
  const handleSend = () => {
    if (!message.trim() && !file) return;
    // Here you would send the message/file to backend
    setMessage("");
    setFile(null);
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Filtered people for add popup
  const filteredPeople = PEOPLE.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dummy leave group handler
  const handleLeaveGroup = () => {
    setShowGroupMenu(false);
    alert("You have left the group.");
    // Here you would remove the group from GROUPS and update selected
  };

  // Dummy edit group name handler
  const handleEditGroupName = () => {
    setShowGroupMenu(false);
    setEditGroupName(chatData?.name || "");
    setShowEditNamePopup(true);
  };
  const handleEditGroupNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditNamePopup(false);
    alert(`Group name changed to: ${editGroupName}`);
    // Here you would update the group name in your backend/data
  };

  // Dummy edit group photo handler
  const handleEditGroupPhoto = () => {
    setShowGroupMenu(false);
    setShowEditPhotoPopup(true);
  };
  const handleEditGroupPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditPhotoPopup(false);
    alert("Group photo updated!");
    // Here you would update the group photo in your backend/data
  };

  return (
    <div className="flex w-full h-[92vh] py-5 my-5 min-w-fit bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-2xl shadow-lg">
      {/* Left Sidebar */}
      <aside className="w-[320px] min-w-[220px] max-w-xs border-r border-blue-900/30 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex flex-col">
        <div className="px-6 py-4 border-b border-blue-900/30 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-200 tracking-wide">
            CHAT
          </span>
        </div>
        {/* Groups */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-4 pb-2 flex items-center justify-between">
            <span className="text-blue-400 font-semibold text-base">
              Groups
            </span>
            <button
              className="text-blue-400 hover:text-blue-300 p-1 rounded-full"
              title="Add group"
            >
              <FaPlus />
            </button>
          </div>
          <ul className="mb-4">
            {GROUPS.map((group) => (
              <li
                key={group.id}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-blue-900/20 transition rounded-lg ${
                  selected?.type === "group" && selected.id === group.id
                    ? "bg-blue-900/30"
                    : ""
                }`}
                onClick={() => setSelected({ type: "group", id: group.id })}
              >
                <img
                  src={group.avatar}
                  alt={group.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                />
                <span className="text-blue-100 font-medium">{group.name}</span>
              </li>
            ))}
          </ul>
          {/* Direct Messages */}
          <div className="px-6 pt-2 pb-2 flex items-center justify-between border-t border-blue-900/30">
            <span className="text-blue-400 font-semibold text-base">
              Direct Msg
            </span>
          </div>
          <ul>
            {DIRECTS.map((person) => (
              <li
                key={person.id}
                className={`flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-blue-900/20 transition rounded-lg ${
                  selected?.type === "direct" && selected.id === person.id
                    ? "bg-blue-900/30"
                    : ""
                }`}
                onClick={() => setSelected({ type: "direct", id: person.id })}
              >
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-400"
                />
                <span className="text-blue-100 font-medium">{person.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
        {/* Topbar for selected chat */}
        {chatData ? (
          <div className="flex items-center px-8 py-4 border-b border-blue-900/30 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 relative">
            <img
              src={chatData.avatar}
              alt={chatData.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
            />
            <span className="ml-4 text-xl font-bold text-blue-100">
              {chatData.name}
            </span>
            {/* Show three dot only for group chat */}
            {selected?.type === "group" && (
              <button
                className="ml-auto text-blue-300 hover:text-blue-400 text-xl p-2 rounded-full"
                title="More options"
                onClick={() => setShowGroupMenu((v) => !v)}
              >
                <FaEllipsisV />
              </button>
            )}
            {/* Group Menu Popup */}
            {showGroupMenu && selected?.type === "group" && (
              <div className="absolute right-8 top-16 z-50 bg-gray-900 border border-blue-900/40 rounded-xl shadow-xl w-56 flex flex-col">
                <button
                  className="px-5 py-3 text-left hover:bg-blue-900/30 text-blue-200 flex items-center gap-2"
                  onClick={handleLeaveGroup}
                >
                  <FaSignOutAlt /> Leave Group
                </button>
                <button
                  className="px-5 py-3 text-left hover:bg-blue-900/30 text-blue-200 flex items-center gap-2"
                  onClick={() => {
                    setShowGroupMenu(false);
                    setShowAddPopup(true);
                  }}
                >
                  <FaPlus /> Add People
                </button>
                <button
                  className="px-5 py-3 text-left hover:bg-blue-900/30 text-blue-200 flex items-center gap-2"
                  onClick={handleEditGroupName}
                >
                  <FaEdit /> Edit Group Name
                </button>
                <button
                  className="px-5 py-3 text-left hover:bg-blue-900/30 text-blue-200 flex items-center gap-2"
                  onClick={handleEditGroupPhoto}
                >
                  <FaCamera />{" "}
                  {chatData.avatar ? "Edit Group Photo" : "Add Group Photo"}
                </button>
              </div>
            )}
            {/* Add People Popup */}
            {showAddPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                  <button
                    className="absolute top-3 right-3 text-blue-300 hover:text-red-400 text-lg"
                    onClick={() => setShowAddPopup(false)}
                    title="Close"
                    aria-label="Close"
                  >
                    <FaTimes />
                  </button>
                  <h3 className="text-xl font-bold text-blue-200 mb-4">
                    Add People to Group
                  </h3>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by profile name..."
                    className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-blue-900/30 text-blue-100 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <ul className="max-h-48 overflow-y-auto">
                    {filteredPeople.length === 0 && (
                      <li className="text-blue-300 px-2 py-2">
                        No people found.
                      </li>
                    )}
                    {filteredPeople.map((person) => (
                      <li
                        key={person.id}
                        className="flex items-center justify-between px-2 py-2 hover:bg-blue-900/20 rounded-lg"
                      >
                        <span className="text-blue-100">{person.name}</span>
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
                          onClick={() => {
                            // handle add person to group
                          }}
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {/* Edit Group Name Popup */}
            {showEditNamePopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <form
                  className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
                  onSubmit={handleEditGroupNameSubmit}
                >
                  <button
                    className="absolute top-3 right-3 text-blue-300 hover:text-red-400 text-lg"
                    onClick={() => setShowEditNamePopup(false)}
                    type="button"
                    title="Close"
                  >
                    <FaTimes />
                  </button>
                  <h3 className="text-xl font-bold text-blue-200 mb-4">
                    Edit Group Name
                  </h3>
                  <input
                    type="text"
                    value={editGroupName}
                    onChange={(e) => setEditGroupName(e.target.value)}
                    className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800 border border-blue-900/30 text-blue-100 focus:ring-2 focus:ring-blue-500 outline-none"
                    title="Edit group name"
                    placeholder="Enter new group name"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Save
                  </button>
                </form>
              </div>
            )}
            {/* Edit Group Photo Popup */}
            {showEditPhotoPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <form
                  className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 relative flex flex-col items-center"
                  onSubmit={handleEditGroupPhotoSubmit}
                >
                  <button
                    className="absolute top-3 right-3 text-blue-300 hover:text-red-400 text-lg"
                    onClick={() => setShowEditPhotoPopup(false)}
                    type="button"
                    title="Close"
                  >
                    <FaTimes />
                  </button>
                  <h3 className="text-xl font-bold text-blue-200 mb-4">
                    {chatData.avatar ? "Edit Group Photo" : "Add Group Photo"}
                  </h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setEditGroupPhoto(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    className="mb-4"
                    title="Upload group photo"
                  />
                  {editGroupPhoto && (
                    <img
                      src={URL.createObjectURL(editGroupPhoto)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full border-2 border-blue-400 mb-4"
                    />
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Save
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-blue-300 text-lg">
            Select a group or person to start chatting.
          </div>
        )}
        {/* Messages */}
        <div className="flex-1 px-8 py-6 flex flex-col gap-4 overflow-y-auto">
          {chatData &&
            chatData.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "You" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-lg ${
                    msg.from === "You"
                      ? "bg-blue-700 text-white"
                      : "bg-gray-800 text-blue-100"
                  }`}
                >
                  <span className="block">{msg.text}</span>
                  <span className="block text-xs text-blue-200 mt-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
          {/* Show uploaded file preview */}
          {file && (
            <div className="flex justify-end">
              <div className="px-4 py-2 rounded-2xl bg-blue-700 text-white max-w-lg">
                <span className="block">{file.name}</span>
              </div>
            </div>
          )}
        </div>
        {/* Message Box */}
        {chatData && (
          <form
            className="flex items-end gap-3 px-8 py-5 border-t border-blue-900/30 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            {/* Upload Button */}
            <button
              type="button"
              className="text-blue-400 hover:text-blue-300 p-2 rounded-full"
              onClick={() => fileInputRef.current?.click()}
              title="Upload file"
            >
              <FaPaperclip className="text-xl" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              title="Upload file"
            />
            {/* Message Input */}
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-5 py-3 rounded-2xl bg-gray-800/80 border border-blue-900/30 text-blue-100 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {/* Send Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow hover:from-blue-700 hover:to-indigo-700 transition-all"
              title="Send message"
            >
              <FaPaperPlane className="text-lg" />
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
