import React, { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaRegCommentDots,
  FaRegBookmark,
  FaBookmark,
  FaPaperPlane,
} from "react-icons/fa";

const dummyPosts = [
  // University Feed
  {
    id: 1,
    type: "university",
    user: {
      name: "Khalid",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    time: "2 hours ago",
    tags: ["Workshop", "Career"],
    text: "Excited to announce a new workshop on AI and Machine Learning! Join us this Friday.",
    photo:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    upvotes: 12,
    downvotes: 1,
    saved: false,
  },
  {
    id: 2,
    type: "university",
    user: {
      name: "Rafiq Hasan",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    time: "30 minutes ago",
    tags: ["Adventure", "Travel"],
    text: "Throwback to our last campus hiking trip. Who's joining next time?",
    photo:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    upvotes: 8,
    downvotes: 0,
    saved: false,
  },
  {
    id: 3,
    type: "university",
    user: {
      name: "Maliha Rahman",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    time: "10 minutes ago",
    tags: ["Nature", "Photography"],
    text: "Captured this beautiful sunset at the campus lake yesterday. Nature is truly mesmerizing!",
    photo:
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    upvotes: 15,
    downvotes: 0,
    saved: false,
  },
  {
    id: 4,
    type: "university",
    user: {
      name: "SUST Alumni Association",
      avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    time: "3 hours ago",
    tags: ["Alumni", "Career"],
    text: "Alumni meet-up scheduled for next month! Register now to reconnect with your batchmates.",
    photo: "",
    upvotes: 25,
    downvotes: 2,
    saved: true,
  },
  // Department Feed
  {
    id: 5,
    type: "department",
    user: {
      name: "Sarah Alam",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    time: "1 hour ago",
    tags: ["Paper Publication"],
    text: "Our department just published a new research paper in Nature! Congratulations to the team.",
    photo: "",
    upvotes: 20,
    downvotes: 0,
    saved: true,
  },
  {
    id: 6,
    type: "department",
    user: {
      name: "Dr. Mahmudul Hasan",
      avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    },
    time: "20 minutes ago",
    tags: ["Workshop"],
    text: "Reminder: The Data Science workshop starts at 3 PM in Room 204. Don't miss it!",
    photo: "",
    upvotes: 7,
    downvotes: 0,
    saved: false,
  },
  {
    id: 7,
    type: "department",
    user: {
      name: "Farzana Sultana",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    time: "5 minutes ago",
    tags: ["Career", "Internship"],
    text: "Internship opportunity at a leading tech company for CSE students. Check your email for details.",
    photo:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
    upvotes: 13,
    downvotes: 1,
    saved: false,
  },
  {
    id: 8,
    type: "department",
    user: {
      name: "CSE Club",
      avatar: "https://randomuser.me/api/portraits/men/70.jpg",
    },
    time: "just now",
    tags: ["Workshop", "Club"],
    text: "Join our coding bootcamp this weekend! Beginners are welcome.",
    photo: "",
    upvotes: 10,
    downvotes: 0,
    saved: false,
  },
];

const dummyComments = [
  {
    user: {
      name: "Ayesha Siddiqua",
      avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    },
    text: "This is awesome! Looking forward to it.",
    time: "2m ago",
  },
  {
    user: {
      name: "Tanvir Ahmed",
      avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    },
    text: "Congrats to the team!",
    time: "5m ago",
  },
];

type Post = {
  id: number;
  type: string;
  user: {
    name: string;
    avatar: string;
  };
  time: string;
  tags: string[];
  text: string;
  photo: string;
  upvotes: number;
  downvotes: number;
  saved: boolean;
};

type PostCardProps = {
  post: Post;
  onToggleSave: () => void;
};

function PostCard({ post, onToggleSave }: PostCardProps) {
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
          src={post.user.avatar}
          alt={post.user.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <div className="text-white font-semibold text-base">
            {post.user.name}
          </div>
          <div className="text-xs text-gray-400">{post.time}</div>
        </div>
        <div className="flex-1" />
        <div className="flex gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-800/60 text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full ml-1"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {/* Text */}
      <div className="text-gray-200 text-base">{post.text}</div>
      {/* Photo */}
      {post.photo && (
        <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
          <img
            src={post.photo}
            alt="Post"
            className="w-full object-cover max-h-72"
          />
        </div>
      )}
      {/* Actions */}
      <div className="flex items-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-full hover:bg-green-600/30 transition-colors text-green-400"
            title="Upvote"
          >
            <FaArrowUp />
          </button>
          <span className="text-gray-300 text-sm">{post.upvotes}</span>
          <button
            className="p-2 rounded-full hover:bg-red-600/30 transition-colors text-red-400"
            title="Downvote"
          >
            <FaArrowDown />
          </button>
        </div>
        <button
          className="flex items-center gap-2 p-2 rounded-full hover:bg-indigo-600/30 transition-colors text-indigo-400"
          onClick={() => setShowComments((v) => !v)}
        >
          <FaRegCommentDots />
          <span className="text-sm text-gray-300">Comment</span>
        </button>
        <button
          className="ml-auto p-2 rounded-full hover:bg-yellow-500/30 transition-colors text-yellow-400"
          onClick={onToggleSave}
          title={post.saved ? "Unsave" : "Save"}
        >
          {post.saved ? (
            <FaBookmark className="text-yellow-400" />
          ) : (
            <FaRegBookmark />
          )}
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
              title="Send"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function PostFeed() {
  const [feedType, setFeedType] = useState("university");
  const [posts, setPosts] = useState(dummyPosts);

  const filteredPosts = posts.filter((p) => p.type === feedType);

  const handleToggleSave = (id: number): void => {
    setPosts((prev: Post[]) =>
      prev.map((post: Post) =>
        post.id === id ? { ...post, saved: !post.saved } : post
      )
    );
  };

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
          style={{ transition: "all 0.18s cubic-bezier(.4,0,.2,1)" }}
        >
          University Feed
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
          style={{ transition: "all 0.18s cubic-bezier(.4,0,.2,1)" }}
        >
          Department Feed
        </button>
      </div>
      {/* Posts */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No posts to show.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleSave={() => handleToggleSave(post.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
