import React, { useState } from "react";
import http from "../http"; // Adjust the import path as necessary
import { formatDistanceToNow } from 'date-fns';
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

const dummyEvents: Event[] = [
  {
    _id: "event1",
    creator: {
      _id: "user1",
      name: "SUST CSE Club",
      avatar: "https://randomuser.me/api/portraits/men/70.jpg"
    },
    title: "SUST Tech Fest 2025",
    content: "Join the biggest tech festival of the year! Workshops, hackathons, and more.",
    comment: [
      {
        userId: {
          _id: "commenter1",
          name: "Ayesha Siddiqua",
          avatar: "https://randomuser.me/api/portraits/women/72.jpg"
        },
        commentText: "This event sounds amazing!",
        createdAt: new Date().toISOString()
      },
      {
        userId: {
          _id: "commenter2",
          name: "Tanvir Ahmed",
          avatar: "https://randomuser.me/api/portraits/men/77.jpg"
        },
        commentText: "Can't wait to join!",
        createdAt: new Date().toISOString()
      }
    ],
    startDate: "2025-06-20T10:00:00Z",
    endDate: "2025-06-20T18:00:00Z",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    createdAt: "2025-06-01T08:00:00Z",
    tags: ["Tech", "Workshop", "Hackathon"],
    feedType: "university",
    place: "CSE Department Hall",
    participationLink: "https://example.com/alumni-meetup",
  },
  {
    _id: "event2",
    creator: {
      _id: "user2",
      name: "Physics Department",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg"
    },
    title: "Physics Seminar: Quantum Computing",
    content: "A seminar on the basics and future of quantum computing.",
    comment: [],
    startDate: "2025-06-25T14:00:00Z",
    endDate: "2025-06-25T16:00:00Z",
    image: "",
    createdAt: "2025-06-05T09:30:00Z",
    tags: ["Seminar", "Quantum", "Physics"],
    feedType: "university",
    department: "Physics",
    place: "CSE Department Hall",
    participationLink: "https://example.com/alumni-meetup",
  },
  {
    _id: "event3",
    creator: {
      _id: "user3",
      name: "SUST Nature Club",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    title: "Nature Photography Walk",
    content: "Capture the beauty of SUST campus with fellow nature lovers.",
    comment: [],
    startDate: "2025-07-02T08:00:00Z",
    endDate: "2025-07-02T12:00:00Z",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    createdAt: "2025-06-08T11:45:00Z",
    tags: ["Photography", "Nature", "Walk"],
    feedType: "university",
    place: "CSE Department Hall",
    participationLink: "https://example.com/alumni-meetup",
  },
  {
    _id: "event4",
    creator: {
      _id: "user4",
      name: "CSE Alumni Association",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    title: "CSE Alumni Meetup",
    content: "Reconnect with CSE alumni and current students. Networking and fun!",
    comment: [],
    startDate: "2025-07-10T16:00:00Z",
    endDate: "2025-07-10T20:00:00Z",
    image: "",
    createdAt: "2025-06-09T13:00:00Z",
    tags: ["Alumni", "Networking"],
    feedType: "department",
    department: "CSE",
    place: "CSE Department Hall",
    participationLink: "https://example.com/alumni-meetup",
  }
];
const dummyComments: EventComment[] = [
  {
    userId: {
      _id: "commenter1",
      name: "Ayesha Siddiqua",
      avatar: "https://randomuser.me/api/portraits/women/72.jpg"
    },
    commentText: "This event sounds amazing!",
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString() // 2 minutes ago
  },
  {
    userId: {
      _id: "commenter2",
      name: "Tanvir Ahmed",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg"
    },
    commentText: "Can't wait to join!",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 minutes ago
  },
  {
    userId: {
      _id: "commenter3",
      name: "Fatema Noor",
      avatar: "https://randomuser.me/api/portraits/women/61.jpg"
    },
    commentText: "Where can I find the schedule?",
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() // 10 minutes ago
  },
  {
    userId: {
      _id: "commenter4",
      name: "Md. Rafiul Islam",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    commentText: "Perfect opportunity to network!",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 minutes ago
  }
];


type EventCreator = {
  _id: string;
  name: string;
  avatar: string;
};

type EventCommentUser = {
  _id: string;
  name: string;
  avatar: string;
};

type EventComment = {
  userId: EventCommentUser;
  commentText: string;
  createdAt: string; // ISO date string
};

type Event = {
  _id: string;
  creator: EventCreator;
  title: string;
  content: string;
  comment: EventComment[];
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  image: string;
  createdAt: string; // ISO date string
  tags: string[];
  feedType: 'university' | 'department';
  department?: string;
  place?: string; // Optional place for the event
  participationLink?: string; // Optional link for event participation\
  interested?: number; // Number of interested users
};


function EventCard({
  event,
  onToggleSave,
}: {
  event: Event;
  onToggleSave: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(dummyComments);
  const [commentInput, setCommentInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const shareLink = `https://example.com/event/${event._id}`;
  const [interested, setInterested] = useState(event.interested);

  const mainUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = mainUser[0]._id;

  const handleSendComment = async(e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      eventId: event._id,
      comment:{
        userId: userId,
        commentText: commentInput
      }
    }
    const newEvent = await http.put("/event/addComment",payload);
    console.log("event = ", newEvent);
    setCommentInput("");
  };

  const handleToggleInterested = async() =>{
    const payload = {
      eventId: event._id
    }
    const newEvent = await http.put("/event/interested",payload);
    const a = interested+1;
    setInterested(a);
    console.log("event = ", newEvent);
  }


  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const daySuffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const time = date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `Date: ${day}${daySuffix} ${month}, ${year} Time: ${time}`;
  }

  return (
    <div className="bg-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 mb-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={event.creator?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt={event.creator?.name || "Anonymous"}
          className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <div className="text-white font-semibold text-base">
            {event?.creator?.name || "Anonymous"}
          </div>
          <div className="text-xs text-gray-400">Created this event</div>
        </div>
        <div className="flex-1" />
        <button
          className="p-2 rounded-full hover:bg-yellow-500/30 transition-colors text-yellow-400"
          onClick={onToggleSave}
          title={saved ? "Unsave" : "Save"}
          aria-label={saved ? "Unsave event" : "Save event"}
        >
          {saved ? (
            <FaBookmark className="text-yellow-400" />
          ) : (
            <FaRegBookmark />
          )}
        </button>
      </div>
      {/* Event Name */}
      <div className="text-xl font-bold text-blue-300">{event.title}</div>
      {/* Description */}
      <div className="text-gray-200 text-base">{event.content}</div>
      {/* Date & Place */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
        <span className="flex items-center gap-1">
          <FaCalendarAlt className="text-blue-400" /> {formatEventDate(event.startDate)}
        </span>
        {/* <span className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-pink-400" /> {event.place}
        </span> */}
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
              isInterested
                ? "bg-green-600 text-white"
                : "bg-gray-800/80 text-green-400 hover:bg-green-700/40"
            }`}
          onClick={handleToggleInterested}
        >
          <FaUserPlus />
          {isInterested ? "Interested" : "I'm Interested"}
          <span className="ml-2 text-xs font-normal">{interested}</span>
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
          onClick={() => window.open(shareLink, "_blank")}
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
            {event.comment.map((c, idx) => (
              <div key={idx} className="flex items-start gap-3 mb-3">
                <img
                  src={c.userId.avatar ? c.userId.avatar : "https://randomuser.me/api/portraits/men/32.jpg"}
                  alt={c.userId.name}
                  className="w-8 h-8 rounded-full object-cover border border-blue-400"
                />
                <div>
                  <div className="text-sm text-white font-semibold">
                    {c.userId.name}{" "}
                    <span className="text-xs text-gray-400 font-normal ml-2">
                      {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="text-gray-200 text-sm">{c.commentText}</div>
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
  const [feedType, setFeedType] = useState<"university" | "department">("university");
  const [events, setEvents] = useState(dummyEvents);
  const [saved, setSaved] = useState(false);
  const fetchEvent = async () => {
      try {
        const response = await http.get("/event");
        setEvents(response.data.events);
        console.log("Events fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    React.useEffect(() => {
      fetchEvent();
    }, []);

  const filteredEvents = events.filter((e) => e.feedType === feedType);

  const handleToggleSave = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event._id === id ? { ...event, saved: !saved } : event
      )
    );
  };

  // const handleToggleInterested = (id: string) => {
    // setEvents((prev) =>
    //   prev.map((event) =>
    //     event.id === id
    //       ? {
    //           ...event,
    //           isInterested: !event.isInterested,
    //           interested: event.isInterested
    //             ? event.interested - 1
    //             : event.interested + 1,
    //         }
    //       : event
    //   )
    // );
  // };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      {/* Feed Switcher */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setFeedType("university")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-base transition-all duration-200 shadow-sm border
            ${
              feedType === "university"
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
              key={event._id}
              event={event}
              onToggleSave={() => handleToggleSave(event._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
