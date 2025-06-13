import React, { useState } from "react";
import http from "../http"; // Adjust the import path as necessary
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from "react-router-dom";
import {
  FaArrowUp,
  FaArrowDown,
  FaRegCommentDots,
  FaRegBookmark,
  FaBookmark,
  FaPaperPlane,
} from "react-icons/fa";

const dummyComments: Comment[] = [
  {
    userId: {
      _id: "664a1f5e23a9ef2b1a9ef223",
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    commentText: "This is awesome! Looking forward to it.",
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
  },
  {
    userId: {
      _id: "664a1f5e23a9ef2b1a9ef456",
      name: "Bob Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    commentText: "Congrats to the team!",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
  },
];

const dummyPosts: Post[] = [
  {
    _id: "6650f6debc11f0a2f8b12345",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef111",
      name: "Dr. A. I. Mentor",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Excited to announce a new workshop on AI and Machine Learning! Join us this Friday.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    upVotes: 12,
    downVotes: 1,
    comment: dummyComments,
    tags: ["Workshop", "Career"],
    feedType: "university",
  },
  {
    _id: "6650f6debc11f0a2f8b12346",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef112",
      name: "Emily Trekker",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Throwback to our last campus hiking trip. Who's joining next time?",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    upVotes: 8,
    downVotes: 0,
    comment: [],
    tags: ["Adventure", "Travel"],
    feedType: "university",
  },
  {
    _id: "6650f6debc11f0a2f8b12347",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef113",
      name: "Liam Walker",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Captured this beautiful sunset at the campus lake yesterday. Nature is truly mesmerizing!",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    upVotes: 15,
    downVotes: 0,
    comment: [],
    tags: ["Nature", "Photography"],
    feedType: "university",
  },
  {
    _id: "6650f6debc11f0a2f8b12348",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef114",
      name: "Sophie Alumni",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Alumni meet-up scheduled for next month! Register now to reconnect with your batchmates.",
    image: "",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    upVotes: 25,
    downVotes: 2,
    comment: [],
    tags: ["Alumni", "Career"],
    feedType: "university",
  },
  {
    _id: "6650f6debc11f0a2f8b12349",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef115",
      name: "Dr. R. Search",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Our department just published a new research paper in Nature! Congratulations to the team.",
    image: "",
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    upVotes: 20,
    downVotes: 0,
    comment: dummyComments,
    tags: ["Paper Publication"],
    feedType: "department",
    department: "CSE",
  },
  {
    _id: "6650f6debc11f0a2f8b12350",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef116",
      name: "Prof. Data",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Reminder: The Data Science workshop starts at 3 PM in Room 204. Don't miss it!",
    image: "",
    createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
    upVotes: 7,
    downVotes: 0,
    comment: [],
    tags: ["Workshop"],
    feedType: "department",
    department: "CSE",
  },
  {
    _id: "6650f6debc11f0a2f8b12351",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef117",
      name: "Intern Bot",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Internship opportunity at a leading tech company for CSE students. Check your email for details.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    upVotes: 13,
    downVotes: 1,
    comment: [],
    tags: ["Career", "Internship"],
    feedType: "department",
    department: "CSE",
  },
  {
    _id: "6650f6debc11f0a2f8b12352",
    creator: {
      _id: "664a1f5e23a9ef2b1a9ef118",
      name: "Bootcamp Coach",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    content: "Join our coding bootcamp this weekend! Beginners are welcome.",
    image: "",
    createdAt: new Date().toISOString(),
    upVotes: 10,
    downVotes: 0,
    comment: [],
    tags: ["Workshop", "Club"],
    feedType: "department",
    department: "CSE",
  },
];



type Creator = {
  _id: string;
  name: string;
  avatar: string;
};

type CommentUser = {
  _id: string;
  name: string;
  avatar: string;
};

type Comment = {
  userId: CommentUser; // or you can define a PopulatedUser type if userId gets populated too
  commentText: string;
  createdAt: string; // ISO string
};

type Post = {
  _id: string;
  creator: Creator; // handles both populated and unpopulated states
  content: string;
  image: string;
  createdAt: string;
  upVotes: number;
  downVotes: number;
  comment: Comment[];
  tags: string[];
  feedType: 'university' | 'department';
  department?: string;
};



type PostCardProps = {
  post: Post;
  onToggleSave: () => void;
};

function PostCard({ post, onToggleSave }: PostCardProps) {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(dummyComments);
  const [commentInput, setCommentInput] = useState("");
  const [saved, setSaved] = useState(false);
  const [upVote, setUpVote] = useState(post.upVotes);
  const [downVote, setDownVote] = useState(post.downVotes);
  const mainUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = mainUser[0]._id;

  const handleSendComment = async(e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      postId: post._id,
      comment:{
        userId: userId,
        commentText: commentInput
      }
    }
    const newPost = await http.put("/post/addComment",payload);
    console.log("newPost = ", newPost);
    setCommentInput("");
  };

  const changeUpVote = async()=>{
    const vote = upVote+1;
    setUpVote(vote);
    const payload = {
      postId: post._id,
      upVote: vote,
      downVote: downVote
    }
    const newPost = await http.put("/post/changeVote",payload);
    console.log("newPost from changeVote", newPost);
  }
  const changeDownVote = async()=>{
    const vote = downVote+1;
    setDownVote(vote);
    const payload = {
      postId: post._id,
      upVote: upVote,
      downVote: vote
    }
    const newPost = await http.put("/post/changeVote",payload);
    console.log("newPost from changeVote", newPost);
  }

  console.log("post in postFeed", post);

  return (
    <div className="bg-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 mb-6 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <img
          src={post.creator?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
          alt={post.creator?.name || "Anonymous"}
          className="w-11 h-11 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <button
            className="text-white font-semibold text-base hover:underline focus:outline-none"
            onClick={() => {
              // Add desired click handler logic here
              console.log("Creator clicked:", post.creator);
              localStorage.setItem('currentUserId',post.creator._id)
              navigate('/user');
            }}
          >
            {post.creator?.name || "Anonymous"}
          </button>
          <div className="text-xs text-gray-400">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
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
      <div className="text-gray-200 text-base">{post.content}</div>
      {/* Photo */}
      {post.image && (
        <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
          <img
            src={post.image}
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
            onClick={changeUpVote}
          >
            <FaArrowUp />
          </button>
          <span className="text-gray-300 text-sm">{upVote}</span>
          <button
            className="p-2 rounded-full hover:bg-red-600/30 transition-colors text-red-400"
            title="Downvote"
            onClick={changeDownVote}
          >
            <FaArrowDown />
          </button>
          <span className="text-gray-300 text-sm">{downVote}</span>
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
          title={saved ? "Unsave" : "Save"}
        >
          {saved ? (
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
            {post.comment.map((c, idx) => (
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
  const [saved, setSaved] = useState<string[]>([]);
  const fetchPosts = async () => {
    try {
      const response = await http.get("/post");
      setPosts(response.data.posts);
      console.log("Posts fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  React.useEffect(() => {
    fetchPosts();
  }, []);
  // console.log(" djflksjdfj", Array.isArray(posts)); // should return true
  console.log("possts", posts);
  const mainUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userInfo = {
    id: mainUser[0]?._id || "6849bb136e4b901e5e7102cb",
    name: mainUser[0]?.name || "Khalid",
    avatar:
      mainUser[0]?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
    department: mainUser[0]?.department || "CSE",
  };
  console.log("user = ", userInfo);

  const filteredPosts = posts.filter((p) => {
    if (feedType === "department") {
      return p.feedType === "department" && p.department === userInfo.department;
    }
    return p.feedType === feedType;
  });


  const handleToggleSave = (id: string): void => {
    setPosts((prev: Post[]) =>
      prev.map((post: Post) =>
        post._id === id ? { ...post, saved: !saved } : post
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
            ${feedType === "university"
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
            ${feedType === "department"
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
              key={post._id}
              post={post}
              onToggleSave={() => handleToggleSave(post._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
