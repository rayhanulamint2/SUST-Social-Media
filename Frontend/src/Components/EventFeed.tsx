import React, { useState } from "react";
import {
  FaRegCommentDots,
  FaRegBookmark,
  FaBookmark,
  FaPaperPlane,
  FaShareAlt,
  FaUserPlus,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaLink,
} from "react-icons/fa";

const dummyEvents = [
  {
    id: 1,
    type: "overall",
    name: "SUST Tech Fest 2025",
    createdBy: {
      name: "SUST CSE Club",
      avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    },
    description:
      "Join the biggest tech festival of the year! Workshops, hackathons, and more.",
    date: "June 20, 2025",
    place: "SUST Auditorium",
    tags: ["Tech", "Workshop", "Hackathon"],
    interested: 120,
    participationLink: "https://susttechfest.com/register",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    saved: false,
    isInterested: false,
    shareLink: "https://sustverse.com/events/1",
  },
  {
    id: 2,
    type: "department",
    name: "Physics Seminar: Quantum Computing",
    createdBy: {
      name: "Physics Department",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    description: "A seminar on the basics and future of quantum computing.",
    date: "June 25, 2025",
    place: "Room 204, Physics Dept.",
    tags: ["Seminar", "Quantum", "Physics"],
    interested: 45,
    participationLink: "https://sustverse.com/events/physics-quantum",
    image: "",
    saved: true,
    isInterested: true,
    shareLink: "https://sustverse.com/events/2",
  },
  {
    id: 3,
    type: "overall",
    name: "Nature Photography Walk",
    createdBy: {
      name: "SUST Nature Club",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    description: "Capture the beauty of SUST campus with fellow nature lovers.",
    date: "July 2, 2025",
    place: "SUST Lake",
    tags: ["Photography", "Nature", "Walk"],
    interested: 60,
    participationLink: "https://sustnatureclub.com/events/walk",
    image:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    saved: false,
    isInterested: false,
    shareLink: "https://sustverse.com/events/3",
  },
  {
    id: 4,
    type: "department",
    name: "CSE Alumni Meetup",
    createdBy: {
      name: "CSE Alumni Association",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    description:
      "Reconnect with CSE alumni and current students. Networking and fun!",
    date: "July 10, 2025",
    place: "CSE Seminar Room",
    tags: ["Alumni", "Networking"],
    interested: 80,
    participationLink: "https://sustcsealumni.com/meetup",
    image: "",
    saved: false,
    isInterested: false,
    shareLink: "https://sustverse.com/events/4",
  },
];

const dummyComments = [
  {
    user: {
      name: "Ayesha Siddiqua",
      avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    text: "This event sounds amazing!",
    time: "2m ago",
  },
  {
    user: {
      name: "Tanvir Ahmed",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    text: "Can't wait to join!",
    time: "5m ago",
  },
];

type Event = (typeof dummyEvents)[0];

function EventCard({
  event,
  onToggleSave,
  onToggleInterested,
}: {
  event: Event;
  onToggleSave: () => void;
  onToggleInterested: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(dummyComments);
  const [commentInput, setCommentInput] = useState("");

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      {
        user: {
          name: "You",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        text: commentInput,
        time: "Just now",
      },
    ]);
    setCommentInput("");
  };

  return (
    <div className="bg-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 mb-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={event.createdBy.avatar}
          alt={event.createdBy.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <div className="text-white font-semibold text-base">
            {event.createdBy.name}
          </div>
          <div className="text-xs text-gray-400">Created this event</div>
        </div>
        <div className="flex-1" />
        <button
          className="p-2 rounded-full hover:bg-yellow-500/30 transition-colors text-yellow-400"
          onClick={onToggleSave}
          title={event.saved ? "Unsave" : "Save"}
          aria-label={event.saved ? "Unsave event" : "Save event"}
        >
          {event.saved ? (
            <FaBookmark className="text-yellow-400" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
      {/* Event Name */}
      <div className="text-xl font-bold text-blue-300">{event.name}</div>
      {/* Description */}
      <div className="text-gray-200 text-base">{event.description}</div>
      {/* Date & Place */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="text-blue-400" /> {event.date}
        </span>
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-pink-400" /> {event.place}
        </span>
      </div>
      {/* Tags */}
      <div className="flex gap-2 flex-wrap mt-1">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-800/60 text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
      {/* Image */}
      {event.image && (
        <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
          <img
            src={event.image}
            alt="Event"
            className="w-full object-cover max-h-72"
          />
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center gap-4 mt-2 flex-wrap">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors shadow-sm
            ${
              event.isInterested
                ? "bg-green-600 text-white"
                : "bg-gray-800/80 text-green-400 hover:bg-green-700/40"
            }`}
          onClick={onToggleInterested}
        >
          <FaUserPlus />
          {event.isInterested ? "Interested" : "I'm Interested"}
          <span className="ml-2 text-xs font-normal">{event.interested}</span>
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/80 text-indigo-400 hover:bg-indigo-700/40 transition-colors"
          onClick={() => setShowComments((v) => !v)}
          title="Comment"
        >
          <FaRegCommentDots />
          Comment
        </button>
        <a
          href={event.participationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <FaLink />
          Event Link
        </a>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
          onClick={() => window.open(event.shareLink, "_blank")}
          title="Share Event"
        >
          <FaShareAlt />
          Share
        </button>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 bg-gray-800/70 rounded-xl px-4 py-3">
          <div className="mb-3">
            {comments.map((c, idx) => (
              <div key={idx} className="flex items-start gap-3 mb-3">
                <img
                  src={c.user.avatar}
                  alt={c.user.name}
                  className="w-8 h-8 rounded-full object-cover border border-blue-400"
                />
                <div>
                  <div className="text-sm text-white font-semibold">
                    {c.user.name}{" "}
                    <span className="text-xs text-gray-400 font-normal ml-2">
                      {c.time}
                    </span>
                  </div>
                  <div className="text-gray-200 text-sm">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendComment}
            className="flex items-center gap-2 mt-2"
          >
            <input
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 rounded-full bg-gray-900/80 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
            />
            <button
              type="submit"
              className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow transition-colors"
              title="Send Comment"
              aria-label="Send Comment"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function EventFeed() {
  const [feedType, setFeedType] = useState<"overall" | "department">("overall");
  const [events, setEvents] = useState(dummyEvents);

  const filteredEvents = events.filter((e) => e.type === feedType);

  const handleToggleSave = (id: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, saved: !event.saved } : event
      )
    );
  };

  const handleToggleInterested = (id: number) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              isInterested: !event.isInterested,
              interested: event.isInterested
                ? event.interested - 1
                : event.interested + 1,
            }
          : event
      )
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {/* Feed Switcher */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setFeedType("overall")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm border
            ${
              feedType === "overall"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 scale-105 shadow-lg"
                : "bg-gray-800/80 text-blue-300 border-transparent hover:bg-blue-900/40 hover:text-white"
            }
          `}
        >
          Overall Events
        </button>
        <button
          onClick={() => setFeedType("department")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm border
            ${
              feedType === "department"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-pink-500 scale-105 shadow-lg"
                : "bg-gray-800/80 text-pink-300 border-transparent hover:bg-pink-900/40 hover:text-white"
            }
          `}
        >
          Department Based Events
        </button>
      </div>
      {/* Events */}
      <div>
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No events to show.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onToggleSave={() => handleToggleSave(event.id)}
              onToggleInterested={() => handleToggleInterested(event.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
