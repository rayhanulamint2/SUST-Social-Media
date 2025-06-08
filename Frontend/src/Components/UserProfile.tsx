import { useState } from "react";
import {
  FaArrowLeft,
  FaUserCircle,
  FaEdit,
  FaBook,
  FaBookmark,
  FaTrophy,
  FaBriefcase,
  FaLink,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import PostCreationSection from "./PostCreationSection";
import Chatbot from "./Chatbot";

// Dummy user data (replace with real user/context)
const user = {
  name: "Khalid",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  department: "CSE",
  role: "Student",
  about:
    "Passionate about AI and software engineering. Loves to travel and explore new technologies.",
  achievements: [
    {
      title: "ICPC Regional Finalist",
      description: "Qualified for the ICPC Dhaka Regional 2024.",
      link: "https://icpc.global/",
      image: "",
    },
  ],
  workplaces: [
    {
      name: "SUST Research Lab",
      designation: "Research Assistant",
      start: "2023-01-01",
      end: "2024-01-01",
    },
  ],
  researchWorks: [
    {
      title: "Deep Learning for Bengali OCR",
      description: "Published in IEEE Xplore.",
      link: "https://ieeexplore.ieee.org/",
      date: "2024-03-01",
    },
  ],
  socialLinks: [
    {
      platform: "Facebook",
      link: "https://facebook.com/khalid",
      username: "khalid",
      description: "Personal profile",
    },
  ],
  posts: [
    {
      id: 1,
      text: "Excited to announce a new workshop on AI and Machine Learning! Join us this Friday.",
      time: "2 hours ago",
      tags: ["Workshop", "Career"],
      photo:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      upvotes: 12,
      downvotes: 1,
      saved: false,
      comments: [
        {
          id: 1,
          user: {
            name: "Ayesha",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          text: "Looking forward to it!",
          time: "1 hour ago",
        },
        {
          id: 2,
          user: {
            name: "Rahim",
            avatar: "https://randomuser.me/api/portraits/men/45.jpg",
          },
          text: "Will there be a recording?",
          time: "45 minutes ago",
        },
      ],
    },
  ],
  saved: [
    {
      id: 2,
      text: "Internship opportunity at a leading tech company for CSE students. Check your email for details.",
      time: "5 minutes ago",
      tags: ["Career", "Internship"],
      photo:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80",
      upvotes: 13,
      downvotes: 1,
      saved: true,
      comments: [
        {
          id: 1,
          user: {
            name: "Sadia",
            avatar: "https://randomuser.me/api/portraits/women/46.jpg",
          },
          text: "Thanks for sharing!",
          time: "Just now",
        },
      ],
    },
  ],
};

const leftMenu = [
  { key: "posts", label: "Posts", icon: <FaBook /> },
  { key: "about", label: "About", icon: <FaUserCircle /> },
  { key: "saved", label: "Saved", icon: <FaBookmark /> },
  { key: "achievements", label: "Achievements", icon: <FaTrophy /> },
  { key: "work", label: "Workplace/Research Works", icon: <FaBriefcase /> },
  { key: "social", label: "Social Links", icon: <FaLink /> },
];

export default function UserProfile({ onBack }: { onBack?: () => void }) {
  const [section, setSection] = useState<
    "posts" | "about" | "saved" | "achievements" | "work" | "social"
  >("about");
  const [showAddAchievement, setShowAddAchievement] = useState(false);
  const [showAddWork, setShowAddWork] = useState(false);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPostCreation, setShowPostCreation] = useState(false);
  const [achievements, setAchievements] = useState(user.achievements);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [socialLinks, setSocialLinks] = useState(user.socialLinks);
  const [newSocial, setNewSocial] = useState({
    username: "",
    platform: "",
    link: "",
  });
  const [editSocialIdx, setEditSocialIdx] = useState<number | null>(null);
  const [editSocial, setEditSocial] = useState({
    username: "",
    platform: "",
    link: "",
  });
  const [editAchievementIdx, setEditAchievementIdx] = useState<number | null>(
    null
  );
  const [editAchievement, setEditAchievement] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
  });
  const [workplaces, setWorkplaces] = useState(user.workplaces);
  const [newWorkplace, setNewWorkplace] = useState({
    name: "",
    designation: "",
    start: "",
    end: "",
  });
  const [researchWorks, setResearchWorks] = useState(user.researchWorks);
  const [showAddResearch, setShowAddResearch] = useState(false);
  const [newResearch, setNewResearch] = useState({
    title: "",
    description: "",
    date: "",
    link: "",
  });
  const [editWorkIdx, setEditWorkIdx] = useState<number | null>(null);
  const [editWork, setEditWork] = useState({
    name: "",
    designation: "",
    start: "",
    end: "",
  });
  const [editResearchIdx, setEditResearchIdx] = useState<number | null>(null);
  const [editResearch, setEditResearch] = useState({
    title: "",
    description: "",
    date: "",
    link: "",
  });

  const isMe = true;

  // --- Edit Profile Popup ---
  const EditProfilePopup = () =>
    showEditProfile && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative border border-blue-700/30">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
            onClick={() => setShowEditProfile(false)}
            title="Close"
          >
            <FaArrowLeft />
          </button>
          <h3 className="text-2xl font-bold text-blue-200 mb-6 text-center">
            Edit Profile
          </h3>
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              defaultValue={user.name}
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Department"
              defaultValue={user.department}
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Role"
              defaultValue={user.role}
            />
            <textarea
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="About"
              defaultValue={user.about}
              rows={3}
            />
            <button
              className="mt-2 w-full py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              onClick={() => setShowEditProfile(false)}
              type="button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );

  // --- Popup forms for add/edit (simplified for brevity) ---
  const AddAchievementPopup = () =>
    showAddAchievement && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-blue-700/30">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
            onClick={() => setShowAddAchievement(false)}
            title="Close"
          >
            <FaArrowLeft />
          </button>
          <h3 className="text-xl font-bold text-blue-200 mb-4">
            Add Achievement
          </h3>
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
              value={newAchievement.title}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, title: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
              value={newAchievement.description}
              onChange={(e) =>
                setNewAchievement({
                  ...newAchievement,
                  description: e.target.value,
                })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Link"
              value={newAchievement.link}
              onChange={(e) =>
                setNewAchievement({ ...newAchievement, link: e.target.value })
              }
            />
            <button
              className="mt-2 w-full py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              onClick={() => {
                if (
                  newAchievement.title.trim() &&
                  newAchievement.description.trim()
                ) {
                  setAchievements([
                    ...achievements,
                    {
                      title: newAchievement.title,
                      description: newAchievement.description,
                      link: newAchievement.link,
                      image: "",
                    },
                  ]);
                  setNewAchievement({ title: "", description: "", link: "" });
                  setShowAddAchievement(false);
                }
              }}
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );

  const AddWorkPopup = () =>
    showAddWork && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-blue-700/30">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
            onClick={() => setShowAddWork(false)}
            title="Close"
          >
            <FaArrowLeft />
          </button>
          <h3 className="text-xl font-bold text-blue-200 mb-4">
            Add Workplace/Research
          </h3>
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Workplace"
              value={newWorkplace.name}
              onChange={(e) =>
                setNewWorkplace({ ...newWorkplace, name: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Position"
              value={newWorkplace.designation}
              onChange={(e) =>
                setNewWorkplace({
                  ...newWorkplace,
                  designation: e.target.value,
                })
              }
            />
            <div className="flex gap-2">
              <input
                className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 flex-1"
                placeholder="From (YYYY-MM-DD)"
                value={newWorkplace.start}
                onChange={(e) =>
                  setNewWorkplace({ ...newWorkplace, start: e.target.value })
                }
              />
              <input
                className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 flex-1"
                placeholder="To (YYYY-MM-DD or Present)"
                value={newWorkplace.end}
                onChange={(e) =>
                  setNewWorkplace({ ...newWorkplace, end: e.target.value })
                }
              />
            </div>
            <button
              className="mt-2 w-full py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              onClick={() => {
                if (
                  newWorkplace.name.trim() &&
                  newWorkplace.designation.trim() &&
                  newWorkplace.start.trim() &&
                  newWorkplace.end.trim()
                ) {
                  setWorkplaces([
                    ...workplaces,
                    {
                      name: newWorkplace.name,
                      designation: newWorkplace.designation,
                      start: newWorkplace.start,
                      end: newWorkplace.end,
                    },
                  ]);
                  setNewWorkplace({
                    name: "",
                    designation: "",
                    start: "",
                    end: "",
                  });
                  setShowAddWork(false);
                }
              }}
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );

  const AddSocialPopup = () =>
    showAddSocial && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-blue-700/30">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
            onClick={() => setShowAddSocial(false)}
            title="Close"
          >
            <FaArrowLeft />
          </button>
          <h3 className="text-xl font-bold text-blue-200 mb-4">
            Add Social Link
          </h3>
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={newSocial.username}
              onChange={(e) =>
                setNewSocial({ ...newSocial, username: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Platform"
              value={newSocial.platform}
              onChange={(e) =>
                setNewSocial({ ...newSocial, platform: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Link"
              value={newSocial.link}
              onChange={(e) =>
                setNewSocial({ ...newSocial, link: e.target.value })
              }
            />
            <button
              className="mt-2 w-full py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              onClick={() => {
                if (
                  newSocial.username.trim() &&
                  newSocial.platform.trim() &&
                  newSocial.link.trim()
                ) {
                  setSocialLinks([
                    ...socialLinks,
                    {
                      username: newSocial.username,
                      platform: newSocial.platform,
                      link: newSocial.link,
                      description: "",
                    },
                  ]);
                  setNewSocial({ username: "", platform: "", link: "" });
                  setShowAddSocial(false);
                }
              }}
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );

  const AddResearchPopup = () =>
    showAddResearch && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-blue-700/30">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
            onClick={() => setShowAddResearch(false)}
            title="Close"
          >
            <FaArrowLeft />
          </button>
          <h3 className="text-xl font-bold text-blue-200 mb-4">
            Add Research Work
          </h3>
          <div className="flex flex-col gap-4">
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
              value={newResearch.title}
              onChange={(e) =>
                setNewResearch({ ...newResearch, title: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Publication Platform"
              value={newResearch.description}
              onChange={(e) =>
                setNewResearch({ ...newResearch, description: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Published Date (YYYY-MM-DD)"
              value={newResearch.date}
              onChange={(e) =>
                setNewResearch({ ...newResearch, date: e.target.value })
              }
            />
            <input
              className="bg-gray-800 text-blue-100 px-4 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
              placeholder="Paper Link"
              value={newResearch.link}
              onChange={(e) =>
                setNewResearch({ ...newResearch, link: e.target.value })
              }
            />
            <button
              className="mt-2 w-full py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
              onClick={() => {
                if (
                  newResearch.title.trim() &&
                  newResearch.description.trim() &&
                  newResearch.date.trim()
                ) {
                  setResearchWorks([
                    ...researchWorks,
                    {
                      title: newResearch.title,
                      description: newResearch.description,
                      date: newResearch.date,
                      link: newResearch.link,
                    },
                  ]);
                  setNewResearch({
                    title: "",
                    description: "",
                    date: "",
                    link: "",
                  });
                  setShowAddResearch(false);
                }
              }}
              type="button"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );

  // --- Section renderers ---
  function renderSection() {
    switch (section) {
      case "about":
        return (
          <div className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow"
              />
              <div>
                <div className="text-2xl font-bold text-white">{user.name}</div>
                <div className="text-blue-300 text-base">
                  {user.department} • {user.role}
                </div>
              </div>
              {isMe && (
                <button
                  className="ml-4 px-4 py-2 rounded-full bg-blue-700 text-white text-sm flex items-center gap-1 hover:bg-blue-800 transition-colors shadow"
                  onClick={() => setShowEditProfile(true)}
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>
            <div className="text-gray-200 text-lg whitespace-pre-line">
              {user.about}
            </div>
          </div>
        );
      case "posts":
        return (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {user.posts.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                No posts yet.
              </div>
            ) : (
              user.posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                      <div className="text-white font-semibold text-base">
                        {user.name}
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
                  <div className="text-gray-200 text-base">{post.text}</div>
                  {post.photo && (
                    <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
                      <img
                        src={post.photo}
                        alt="Post"
                        className="w-full object-cover max-h-72"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-1 text-blue-300">
                      <svg
                        className="w-5 h-5 fill-blue-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955l6.561.955l-4.756 4.635l1.122 6.545z" />
                      </svg>
                      <span>{post.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-300">
                      <svg className="w-5 h-5 fill-red-400" viewBox="0 0 20 20">
                        <path d="M10 5l5.878-3.09l-1.122 6.545L19.512 13.09l-6.561.955L10 20l-2.951-5.955l-6.561-.955l4.756-4.635L10 5z" />
                      </svg>
                      <span>{post.downvotes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2" />
                        <polyline points="12 15 12 3"></polyline>
                        <polyline points="8 7 12 3 16 7"></polyline>
                      </svg>
                      <span>Comments</span>
                    </div>
                  </div>
                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3"
                        >
                          <img
                            src={comment.user.avatar}
                            alt={comment.user.name}
                            className="w-8 h-8 rounded-full object-cover border border-blue-400"
                          />
                          <div>
                            <div className="text-blue-200 font-semibold text-sm">
                              {comment.user.name}
                              <span className="ml-2 text-xs text-gray-400">
                                {comment.time}
                              </span>
                            </div>
                            <div className="text-gray-300 text-sm">
                              {comment.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        );
      case "saved":
        return (
          <div className="space-y-6 max-h-[70vh] overflow-y-auto">
            {user.saved.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                No saved posts or events.
              </div>
            ) : (
              user.saved.map((post) => (
                <div
                  key={post.id}
                  className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                    />
                    <div>
                      <div className="text-white font-semibold text-base">
                        {user.name}
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
                  <div className="text-gray-200 text-base">{post.text}</div>
                  {post.photo && (
                    <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
                      <img
                        src={post.photo}
                        alt="Saved"
                        className="w-full object-cover max-h-72"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-6 mt-2">
                    <div className="flex items-center gap-1 text-blue-300">
                      <svg
                        className="w-5 h-5 fill-blue-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955l6.561.955l-4.756 4.635l1.122 6.545z" />
                      </svg>
                      <span>{post.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-300">
                      <svg className="w-5 h-5 fill-red-400" viewBox="0 0 20 20">
                        <path d="M10 5l5.878-3.09l-1.122 6.545L19.512 13.09l-6.561.955L10 20l-2.951-5.955l-6.561-.955l4.756-4.635L10 5z" />
                      </svg>
                      <span>{post.downvotes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17 8h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h2" />
                        <polyline points="12 15 12 3"></polyline>
                        <polyline points="8 7 12 3 16 7"></polyline>
                      </svg>
                      <span>Comments</span>
                    </div>
                  </div>
                  {/* Comments Section */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3"
                        >
                          <img
                            src={comment.user.avatar}
                            alt={comment.user.name}
                            className="w-8 h-8 rounded-full object-cover border border-blue-400"
                          />
                          <div>
                            <div className="text-blue-200 font-semibold text-sm">
                              {comment.user.name}
                              <span className="ml-2 text-xs text-gray-400">
                                {comment.time}
                              </span>
                            </div>
                            <div className="text-gray-300 text-sm">
                              {comment.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        );
      case "achievements":
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold text-white">Achievements</div>
              {isMe && (
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors shadow"
                  onClick={() => setShowAddAchievement(true)}
                >
                  <FaPlus /> Add
                </button>
              )}
            </div>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {achievements.length === 0 ? (
                <div className="text-gray-400 text-center py-10">
                  No achievements yet.
                </div>
              ) : (
                achievements.map((ach, idx) =>
                  editAchievementIdx === idx ? (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                    >
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={editAchievement.title}
                        onChange={(e) =>
                          setEditAchievement({
                            ...editAchievement,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                        value={editAchievement.description}
                        onChange={(e) =>
                          setEditAchievement({
                            ...editAchievement,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Link"
                        value={editAchievement.link}
                        onChange={(e) =>
                          setEditAchievement({
                            ...editAchievement,
                            link: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="flex-1 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                          onClick={() => {
                            const updated = [...achievements];
                            updated[idx] = {
                              ...editAchievement,
                              image: achievements[idx].image || "",
                            };
                            setAchievements(updated);
                            setEditAchievementIdx(null);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="flex-1 py-2 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition-colors"
                          onClick={() => setEditAchievementIdx(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <FaTrophy className="text-yellow-400" />
                        <span className="text-lg font-semibold text-blue-100">
                          {ach.title}
                        </span>
                      </div>
                      <div className="text-gray-200">{ach.description}</div>
                      {ach.link && (
                        <a
                          href={ach.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline text-sm"
                        >
                          View Details
                        </a>
                      )}
                      {ach.image && (
                        <img
                          src={ach.image}
                          alt={ach.title}
                          className="w-32 h-32 object-cover rounded-xl border border-blue-400 mt-2"
                        />
                      )}
                      {isMe && (
                        <div className="flex gap-3 mt-2">
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
                            onClick={() => {
                              setEditAchievementIdx(idx);
                              setEditAchievement({
                                title: ach.title,
                                description: ach.description,
                                link: ach.link,
                                image: ach.image || "",
                              });
                            }}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors"
                            onClick={() => {
                              setAchievements(
                                achievements.filter((_, i) => i !== idx)
                              );
                            }}
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )
              )}
            </div>
            <AddAchievementPopup />
          </div>
        );
      case "work":
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                {isMe && (
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors shadow"
                      onClick={() => setShowAddWork(true)}
                    >
                      <FaPlus /> Add Workplace
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition-colors shadow"
                      onClick={() => setShowAddResearch(true)}
                    >
                      <FaPlus /> Add Research
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  !showResearch
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-gray-800/80 text-blue-300 hover:bg-blue-900/40"
                }`}
                onClick={() => setShowResearch(false)}
              >
                Workplace
              </button>
              <button
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                  showResearch
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-gray-800/80 text-blue-300 hover:bg-blue-900/40"
                }`}
                onClick={() => setShowResearch(true)}
              >
                Research Works
              </button>
            </div>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {!showResearch ? (
                workplaces.length === 0 ? (
                  <div className="text-gray-400 text-center py-10">N/A</div>
                ) : (
                  workplaces.map((work, idx) =>
                    editWorkIdx === idx ? (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                      >
                        <input
                          className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                          placeholder="Workplace"
                          value={editWork.name}
                          onChange={(e) =>
                            setEditWork({ ...editWork, name: e.target.value })
                          }
                        />
                        <input
                          className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                          placeholder="Position"
                          value={editWork.designation}
                          onChange={(e) =>
                            setEditWork({
                              ...editWork,
                              designation: e.target.value,
                            })
                          }
                        />
                        <div className="flex gap-2">
                          <input
                            className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 flex-1"
                            placeholder="From (YYYY-MM-DD)"
                            value={editWork.start}
                            onChange={(e) =>
                              setEditWork({
                                ...editWork,
                                start: e.target.value,
                              })
                            }
                          />
                          <input
                            className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 flex-1"
                            placeholder="To (YYYY-MM-DD or Present)"
                            value={editWork.end}
                            onChange={(e) =>
                              setEditWork({ ...editWork, end: e.target.value })
                            }
                          />
                        </div>
                        <div className="flex gap-2 mt-2">
                          <button
                            className="flex-1 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                            onClick={() => {
                              const updated = [...workplaces];
                              updated[idx] = { ...editWork };
                              setWorkplaces(updated);
                              setEditWorkIdx(null);
                            }}
                          >
                            Save
                          </button>
                          <button
                            className="flex-1 py-2 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition-colors"
                            onClick={() => setEditWorkIdx(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                      >
                        <div className="text-lg font-semibold text-blue-100">
                          {work.name}
                        </div>
                        <div className="text-blue-300 text-sm">
                          {work.designation}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {work.start} - {work.end}
                        </div>
                        {isMe && (
                          <div className="flex gap-3 mt-2">
                            <button
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
                              onClick={() => {
                                setEditWorkIdx(idx);
                                setEditWork({
                                  name: work.name,
                                  designation: work.designation,
                                  start: work.start,
                                  end: work.end,
                                });
                              }}
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors"
                              onClick={() => {
                                setWorkplaces(
                                  workplaces.filter((_, i) => i !== idx)
                                );
                              }}
                            >
                              <FaTrash /> Remove
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  )
                )
              ) : researchWorks.length === 0 ? (
                <div className="text-gray-400 text-center py-10">N/A</div>
              ) : (
                researchWorks.map((rw, idx) =>
                  editResearchIdx === idx ? (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                    >
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Title"
                        value={editResearch.title}
                        onChange={(e) =>
                          setEditResearch({
                            ...editResearch,
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Publication Platform"
                        value={editResearch.description}
                        onChange={(e) =>
                          setEditResearch({
                            ...editResearch,
                            description: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Published Date (YYYY-MM-DD)"
                        value={editResearch.date}
                        onChange={(e) =>
                          setEditResearch({
                            ...editResearch,
                            date: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Paper Link"
                        value={editResearch.link}
                        onChange={(e) =>
                          setEditResearch({
                            ...editResearch,
                            link: e.target.value,
                          })
                        }
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="flex-1 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                          onClick={() => {
                            const updated = [...researchWorks];
                            updated[idx] = { ...editResearch };
                            setResearchWorks(updated);
                            setEditResearchIdx(null);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="flex-1 py-2 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition-colors"
                          onClick={() => setEditResearchIdx(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                    >
                      <div className="text-lg font-semibold text-blue-100">
                        {rw.title}
                      </div>
                      <div className="text-gray-200">{rw.description}</div>
                      <div className="text-gray-400 text-xs">{rw.date}</div>
                      {rw.link && (
                        <a
                          href={rw.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline text-sm"
                        >
                          View Paper
                        </a>
                      )}
                      {isMe && (
                        <div className="flex gap-3 mt-2">
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
                            onClick={() => {
                              setEditResearchIdx(idx);
                              setEditResearch({
                                title: rw.title,
                                description: rw.description,
                                date: rw.date,
                                link: rw.link,
                              });
                            }}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors"
                            onClick={() => {
                              setResearchWorks(
                                researchWorks.filter((_, i) => i !== idx)
                              );
                            }}
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )
              )}
            </div>
            <AddWorkPopup />
            {AddResearchPopup()}
          </div>
        );
      case "social":
        return (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold text-white">Social Links</div>
              {isMe && (
                <button
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors shadow"
                  onClick={() => setShowAddSocial(true)}
                >
                  <FaPlus /> Add
                </button>
              )}
            </div>
            <div className="space-y-6 max-h-[60vh] overflow-y-auto">
              {socialLinks.length === 0 ? (
                <div className="text-gray-400 text-center py-10">
                  No social links added yet. Click "Add" to add your social
                  links.
                </div>
              ) : (
                socialLinks.map((sl, idx) =>
                  editSocialIdx === idx ? (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                    >
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Platform"
                        value={editSocial.platform}
                        onChange={(e) =>
                          setEditSocial({
                            ...editSocial,
                            platform: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Username"
                        value={editSocial.username}
                        onChange={(e) =>
                          setEditSocial({
                            ...editSocial,
                            username: e.target.value,
                          })
                        }
                      />
                      <input
                        className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500"
                        placeholder="Link"
                        value={editSocial.link}
                        onChange={(e) =>
                          setEditSocial({ ...editSocial, link: e.target.value })
                        }
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          className="flex-1 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                          onClick={() => {
                            const updated = [...socialLinks];
                            updated[idx] = { ...editSocial, description: "" };
                            setSocialLinks(updated);
                            setEditSocialIdx(null);
                          }}
                        >
                          Save
                        </button>
                        <button
                          className="flex-1 py-2 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition-colors"
                          onClick={() => setEditSocialIdx(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-5 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <FaLink className="text-blue-400" />
                        <span className="text-lg font-semibold text-blue-100">
                          {sl.platform}
                        </span>
                      </div>
                      <div className="text-gray-200">{sl.username}</div>
                      <a
                        href={sl.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        {sl.link}
                      </a>
                      {isMe && (
                        <div className="flex gap-3 mt-2">
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
                            onClick={() => {
                              setEditSocialIdx(idx);
                              setEditSocial({
                                username: sl.username,
                                platform: sl.platform,
                                link: sl.link,
                              });
                            }}
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors"
                            onClick={() => {
                              setSocialLinks(
                                socialLinks.filter((_, i) => i !== idx)
                              );
                            }}
                          >
                            <FaTrash /> Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )
                )
              )}
            </div>
            <AddSocialPopup />
          </div>
        );
      default:
        return null;
    }
  }

  // --- Main layout ---
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex">
      {/* Left Sidebar (30%) */}
      <aside className="w-[30vw] min-w-[260px] max-w-[400px] h-screen flex flex-col bg-gradient-to-b from-blue-950 via-gray-900 to-blue-900 shadow-2xl border-r border-blue-900/40 fixed left-0 top-0 z-30">
        {/* Stylish Back Button - Icon Only */}
        <button
          className="mt-6 ml-6 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 text-white shadow-xl border-2 border-blue-400 hover:from-blue-800 hover:to-indigo-900 hover:scale-110 hover:border-indigo-400 transition-all duration-200 group"
          onClick={onBack}
          title="Back to Home"
        >
          <FaArrowLeft className="text-2xl group-hover:-translate-x-1 transition-transform duration-200 drop-shadow-lg" />
        </button>
        {/* Profile Info */}
        <div className="flex flex-col items-center mt-4 mb-6 px-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-lg bg-gray-900"
            style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
          />
          <div className="mt-3 text-xl font-bold text-white text-center">
            {user.name}
          </div>
          <div className="text-blue-300 text-base font-medium text-center">
            {user.department}
          </div>
          <div className="text-blue-200 text-sm font-semibold text-center">
            {user.role}
          </div>
          <div className="flex flex-row gap-3 mt-4 w-full justify-center">
            {isMe && (
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-sm flex items-center gap-2 hover:from-blue-800 hover:to-indigo-800 transition-colors shadow-lg font-semibold"
                onClick={() => setShowEditProfile(true)}
              >
                <FaEdit /> Edit Profile
              </button>
            )}
            <button
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg font-semibold"
              onClick={() => setShowPostCreation(true)}
            >
              <FaPlus /> Add New Post
            </button>
          </div>
        </div>
        {/* Navigation Buttons */}
        <nav className="flex flex-col gap-4 flex-1 justify-start items-stretch px-8">
          {leftMenu.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm border
                ${
                  section === item.key
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 scale-105 shadow-lg"
                    : "bg-gray-800/80 text-blue-300 border-transparent hover:bg-blue-900/40 hover:text-white"
                }
              `}
              onClick={() =>
                setSection(
                  item.key as
                    | "posts"
                    | "about"
                    | "saved"
                    | "achievements"
                    | "work"
                    | "social"
                )
              }
              title={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="h-8" />
      </aside>
      {/* Middle Content (40%) */}
      <div className="ml-[30vw] w-[40vw] max-w-[740px] min-w-[340px] flex flex-col min-h-screen border-r border-blue-900/40 bg-gradient-to-br from-gray-950/60 via-gray-900/60 to-gray-950/60">
        {/* Post Creation Section at the top */}
        <div className="w-full flex justify-center items-center px-4 pt-1 pb-4 bg-gradient-to-r from-blue-900/70 via-blue-950/70 to-gray-900/70 shadow-lg border-b border-blue-900/30">
          <div className="w-full max-w-2xl">
            <PostCreationSection />
          </div>
        </div>
        {/* Section Content */}
        <main className="flex-1 p-4 md:p-10 w-full">
          <div className="max-w-3xl mx-auto">{renderSection()}</div>
        </main>
      </div>
      {/* Right Side Chatbot (30%) */}
      <div className="w-[30vw] min-w-[260px] max-w-[385px] h-screen flex flex-col bg-gradient-to-b from-blue-950 via-gray-900 to-blue-900 shadow-2xl fixed right-0 top-0 z-20 border-l border-blue-900/40">
        <Chatbot />
      </div>
      {/* Popups */}
      {showPostCreation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative border border-blue-700/30">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 text-xl"
              onClick={() => setShowPostCreation(false)}
              title="Close"
            >
              <FaArrowLeft />
            </button>
            <PostCreationSection />
          </div>
        </div>
      )}
      {EditProfilePopup()}
      {AddAchievementPopup()}
      {AddWorkPopup()}
      {AddSocialPopup()}
      {AddResearchPopup()}
    </div>
  );
}
