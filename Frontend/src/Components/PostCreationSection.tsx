import React, { useRef, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

const TAGS = [
  "Adventure",
  "Nature",
  "Travel",
  "Career",
  "Workshop",
  "Paper Publication",
];

export default function PostCreationSection() {
  const mainUser = JSON.parse(localStorage.getItem("user") || "{}");
  // Dummy user data
  const user = {
    name: mainUser[0]?.name || "Khalid",
    avatar: mainUser[0]?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
    department: mainUser[0]?.department || "CSE",
  };

  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState<"post" | "event">("post");

  // Post states
  const [postText, setPostText] = useState("");
  const [postTags, setPostTags] = useState<string[]>([]);
  const [postImage, setPostImage] = useState<string | null>(null);

  // Event states
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLink, setEventLink] = useState("");
  const [eventTags, setEventTags] = useState<string[]>([]);
  const [eventImage, setEventImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const eventFileInputRef = useRef<HTMLInputElement>(null);

  // Tag selection logic
  const handleTagToggle = (tag: string, isEvent = false) => {
    if (isEvent) {
      setEventTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    } else {
      setPostTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  // Image upload logic
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isEvent = false
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (isEvent) setEventImage(ev.target?.result as string);
        else setPostImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset all fields when closing popup
  const handleClose = () => {
    setShowPopup(false);
    setMode("post");
    setPostText("");
    setPostTags([]);
    setPostImage(null);
    setEventName("");
    setEventDesc("");
    setEventDate("");
    setEventTime("");
    setEventLink("");
    setEventTags([]);
    setEventImage(null);
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mt-8">
        <div
          className="flex items-center gap-4 bg-gray-900/80 border border-blue-400/10 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-xl cursor-pointer"
          onClick={() => setShowPopup(true)}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
          />
          <input
            type="text"
            placeholder={`Let's catch up with the community, ${user.name}!`}
            className="flex-1 bg-gray-800/80 text-gray-200 placeholder-gray-400 px-5 py-3 rounded-full outline-none border-none text-base font-normal shadow-inner cursor-pointer"
            readOnly
          />
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-400 text-xl"
              onClick={handleClose}
              title="Close"
            >
              <FaTimes />
            </button>
            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${
                  mode === "post"
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-800/80 text-blue-300 hover:bg-blue-900/40"
                }`}
                onClick={() => setMode("post")}
              >
                New Post
              </button>
              <button
                className={`flex-1 py-2 rounded-full font-semibold text-base transition-all ${
                  mode === "event"
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-gray-800/80 text-indigo-300 hover:bg-indigo-900/40"
                }`}
                onClick={() => setMode("event")}
              >
                New Event
              </button>
            </div>

            {/* Post Form */}
            {mode === "post" && (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle post submit here
                  handleClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <div className="text-white font-semibold">{user.name}</div>
                    <div className="text-xs text-blue-300">
                      {user.department}
                    </div>
                  </div>
                </div>
                <textarea
                  className="w-full bg-gray-800/80 text-gray-200 placeholder-gray-400 px-4 py-3 rounded-xl outline-none border-none text-base font-normal shadow-inner resize-none"
                  rows={3}
                  placeholder="Share your thoughts, ideas, or updates..."
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  required
                />
                {/* Tags */}
                <div>
                  <div className="text-xs text-gray-400 mb-1">Add tags</div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          postTags.includes(tag)
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-800 text-blue-300 border-blue-400"
                        }`}
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Image Upload */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 text-blue-300 hover:bg-blue-900/40 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    title="Add Image"
                  >
                    <FaImage />
                    Add Image
                  </button>
                  <label htmlFor="post-image-upload" className="sr-only">
                    Upload Image
                  </label>
                  <input
                    id="post-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    title="Upload Image"
                    placeholder="Choose an image"
                  />
                  {postImage && (
                    <img
                      src={postImage}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-blue-400"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors mt-2"
                >
                  Post
                </button>
              </form>
            )}

            {/* Event Form */}
            {mode === "event" && (
              <form
                className="flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  // handle event submit here
                  handleClose();
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                  <div>
                    <div className="text-white font-semibold">{user.name}</div>
                    <div className="text-xs text-blue-300">
                      {user.department}
                    </div>
                  </div>
                </div>
                <input
                  className="w-full bg-gray-800/80 text-gray-200 placeholder-gray-400 px-4 py-3 rounded-xl outline-none border-none text-base font-normal shadow-inner"
                  placeholder="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
                <textarea
                  className="w-full bg-gray-800/80 text-gray-200 placeholder-gray-400 px-4 py-3 rounded-xl outline-none border-none text-base font-normal shadow-inner resize-none"
                  rows={3}
                  placeholder="Event Description"
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 bg-gray-800/80 text-gray-200 px-4 py-2 rounded-xl outline-none border-none text-base shadow-inner"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    required
                    placeholder="Event Date"
                    title="Event Date"
                  />
                  <input
                    type="time"
                    className="flex-1 bg-gray-800/80 text-gray-200 px-4 py-2 rounded-xl outline-none border-none text-base shadow-inner"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    required
                    placeholder="Event Time"
                    title="Event Time"
                  />
                </div>
                <input
                  className="w-full bg-gray-800/80 text-gray-200 placeholder-gray-400 px-4 py-3 rounded-xl outline-none border-none text-base font-normal shadow-inner"
                  placeholder="Event Website or Form Link (optional)"
                  value={eventLink}
                  onChange={(e) => setEventLink(e.target.value)}
                />
                {/* Tags */}
                <div>
                  <div className="text-xs text-gray-400 mb-1">Add tags</div>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          eventTags.includes(tag)
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-gray-800 text-indigo-300 border-indigo-400"
                        }`}
                        onClick={() => handleTagToggle(tag, true)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Image Upload */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 text-indigo-300 hover:bg-indigo-900/40 transition-colors"
                    onClick={() => eventFileInputRef.current?.click()}
                  >
                    <FaImage />
                    Add Image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={eventFileInputRef}
                    onChange={(e) => handleImageChange(e, true)}
                    title="Upload Event Image"
                    placeholder="Choose an event image"
                  />
                  {eventImage && (
                    <img
                      src={eventImage}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-xl border border-indigo-400"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors mt-2"
                >
                  Post the Event
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
