import { useState, useRef, useEffect } from "react";
import http from "../http";
import { formatDistanceToNow } from "date-fns";
import type { User, Post, Comment, Achievement, ResearchWork, SocialLink, Workplace } from './types';
import React from "react";
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
import type { image } from "framer-motion/client";

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

// Dummy user data (replace with real user/context)
const users = {
  name: "Khalid",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  department: "CSE",
  roles: "Student",
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
  ],
  saved: [
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
    }
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
  const [user, setUser] = useState<User>(users);
  const currentUserId = localStorage.getItem("currentUserId")||"6849bb136e4b901e5e7102cb";
  console.log("currentUserId ", currentUserId);

  const mainUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userInfo = {
    id: mainUser[0]?._id || "6849bb136e4b901e5e7102cb",
    name: mainUser[0]?.name || "Khalid",
    avatar:
      mainUser[0]?.avatar || "https://randomuser.me/api/portraits/men/32.jpg",
    department: mainUser[0]?.department || "CSE",
  };
  console.log("user = ", userInfo);

  const fetchUserInfo = async () => {
    try {
      const response = await http.get(`/user/${currentUserId}`);
      const userMain = response.data.user;
      console.log('Fetched user data:', userMain);
      // Optionally set this to state
      setUser(userMain);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };
  React.useEffect(() => {
    fetchUserInfo();
  }, []);

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
  const [postMenuIdx, setPostMenuIdx] = useState<number | null>(null);
  const [editPostIdx, setEditPostIdx] = useState<number | null>(null);
  const [editPost, setEditPost] = useState({
    content: "",
    tags: [] as string[],
    image: "",
  });
  const [savedMenuIdx, setSavedMenuIdx] = useState<number | null>(null);
  const [editSavedIdx, setEditSavedIdx] = useState<number | null>(null);
  const [editSaved, setEditSaved] = useState({
    content: "",
    tags: [] as string[],
    image: "",
  });
  const postMenuRef = useRef<HTMLDivElement>(null);
  const savedMenuRef = useRef<HTMLDivElement>(null);

  const isMe = userInfo.id == currentUserId ? true : false;

  
  console.log("user roles", user.roles)
  console.log("user roles type", typeof(user.roles))



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
              defaultValue={user.roles}
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
                src={user.avatar ? user.avatar : "https://randomuser.me/api/portraits/men/32.jpg"}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow"
              />
              <div>
                <div className="text-2xl font-bold text-white">{user.name}</div>
                <div className="text-blue-300 text-base">
                  {user.department} • {user.roles[0]}{user.roles[1] ? `, ${user.roles[1]}` : ""}
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
          <div className="flex flex-col gap-6 h-full">
            {user.posts.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                No posts yet.
              </div>
            ) : (
              user.posts.map((post: Post, idx: number) =>
                editPostIdx === idx ? (
                  <div
                    key={post._id}
                    className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                  >
                    <textarea
                      className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 mb-2"
                      value={editPost.content}
                      onChange={(e) =>
                        setEditPost({ ...editPost, content: e.target.value })
                      }
                      placeholder="Edit your post"
                      title="Edit post text"
                    />
                    <input
                      className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 mb-2"
                      value={editPost.image}
                      onChange={(e) =>
                        setEditPost({ ...editPost, image: e.target.value })
                      }
                      placeholder="Photo URL"
                    />
                    <input
                      className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 mb-2"
                      value={editPost.tags.join(",")}
                      onChange={(e) =>
                        setEditPost({
                          ...editPost,
                          tags: e.target.value.split(",").map((t) => t.trim()),
                        })
                      }
                      placeholder="Tags (comma separated)"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex-1 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                        onClick={() => {
                          // const updated = [...user.posts];
                          // updated[idx:number] = {
                          //   ...updated[idx],
                          //   content: editPost.content,
                          //   image: editPost.image,
                          //   tags: editPost.tags,
                          // };
                          // user.posts = updated;
                          // setEditPostIdx(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="flex-1 py-2 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setEditPostIdx(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={post._id}
                    className="relative bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                  >
                    {/* Three Dots Menu */}
                    {isMe && (
                      <div className="absolute top-4 right-4 z-10">
                        <button
                          className="p-2 rounded-full hover:bg-blue-900/40 transition"
                          onClick={() =>
                            setPostMenuIdx(postMenuIdx === idx ? null : idx)
                          }
                          title="Options"
                        >
                          <svg
                            className="w-6 h-6 text-blue-200"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <circle cx="4" cy="10" r="2" />
                            <circle cx="10" cy="10" r="2" />
                            <circle cx="16" cy="10" r="2" />
                          </svg>
                        </button>

                        {postMenuIdx === idx && (
                          <div
                            ref={postMenuRef}
                            className="absolute right-0 mt-2 w-32 bg-gray-900 border border-blue-700 rounded-xl shadow-lg flex flex-col z-20"
                          >
                            <button
                              className="px-4 py-2 text-blue-200 hover:bg-blue-800/60 rounded-t-xl flex items-center gap-2"
                              onClick={() => {
                                setEditPostIdx(idx);
                                setEditPost({
                                  content: post.content,
                                  tags: post.tags,
                                  image: post.image || "",
                                });
                                setPostMenuIdx(null);
                              }}
                            >
                              <FaEdit /> Edit
                            </button>
                            <button
                              className="px-4 py-2 text-red-300 hover:bg-red-800/60 rounded-b-xl flex items-center gap-2"
                              onClick={() => {
                                user.posts.splice(idx, 1);
                                setPostMenuIdx(null);
                                // Optionally update post state here if necessary
                              }}
                            >
                              <FaTrash /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Post Content */}
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar ? user.avatar : "https://randomuser.me/api/portraits/men/32.jpg"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                      <div>
                        <div className="text-white font-semibold text-base">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                      </div>
                      <div className="flex-1" />
                    </div>
                    <div className="text-gray-200 text-base">{post.content}</div>
                    {/* TAGS BELOW CAPTION */}
                    <div className="flex gap-1 flex-wrap mb-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-800/60 text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {post.image && (
                      <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
                        <img
                          src={post.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"}
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
                        <span>{post.upVotes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-300">
                        <svg
                          className="w-5 h-5 fill-red-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 5l5.878-3.09l-1.122 6.545L19.512 13.09l-6.561.955L10 20l-2.951-5.955l-6.561-.955l4.756-4.635L10 5z" />
                        </svg>
                        <span>{post.downVotes}</span>
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
                    {post.comment && post.comment.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {post.comment.map((comment) => (
                          <div
                            className="flex items-start gap-3"
                          >
                            <img
                              src={comment.userId.avatar || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"}
                              alt={comment.userId.name}
                              className="w-8 h-8 rounded-full object-cover border border-blue-400"
                            />
                            <div>
                              <div className="text-blue-200 font-semibold text-sm">
                                {comment.userId.name}
                                <span className="ml-2 text-xs text-gray-400">
                                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <div className="text-gray-300 text-sm">
                                {comment.commentText}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )
            )}
          </div>
        );
      case "saved":
        return (
          <div className="flex flex-col gap-6 h-full">
            {user.saved.length === 0 ? (
              <div className="text-gray-400 text-center py-10">
                No saved posts or events.
              </div>
            ) : (
              user.saved.map((post: Post, idx: number) =>
                editSavedIdx === idx ? (
                  <div
                    key={post._id}
                    className="bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                  >
                    <textarea
                      className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 mb-2"
                      value={editSaved.content}
                      onChange={(e) =>
                        setEditSaved({ ...editSaved, content: e.target.value })
                      }
                      placeholder="Edit your post"
                      title="Edit post text"
                    />
                    <input
                      className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 mb-2"
                      value={editSaved.image}
                      onChange={(e) =>
                        setEditSaved({ ...editSaved, image: e.target.value })
                      }
                      placeholder="Photo URL"
                    />
                    <input
                      className="bg-gray-800 text-blue-100 px-3 py-2 rounded-lg border border-blue-400/20 focus:ring-2 focus:ring-blue-500 mb-2"
                      value={editSaved.tags.join(",")}
                      onChange={(e) =>
                        setEditSaved({
                          ...editSaved,
                          tags: e.target.value.split(",").map((t) => t.trim()),
                        })
                      }
                      placeholder="Tags (comma separated)"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex-1 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-colors"
                        onClick={() => {
                          // const updated = [...user.saved];
                          // updated[idx] = {
                          //   ...updated[idx],
                          //   content: editSaved.content,
                          //   image: editSaved.image,
                          //   tags: editSaved.tags,
                          // };
                          // user.saved = updated;
                          // setEditSavedIdx(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="flex-1 py-2 rounded-full bg-gray-700 text-white font-bold shadow-lg hover:bg-gray-800 transition-colors"
                        onClick={() => setEditSavedIdx(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={post._id}
                    className="relative bg-gradient-to-br from-blue-950/60 to-gray-900/80 border border-blue-400/10 rounded-2xl shadow-lg p-6 flex flex-col gap-3"
                  >
                    {/* Three Dots Menu */}
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        className="p-2 rounded-full hover:bg-blue-900/40 transition"
                        onClick={() =>
                          setSavedMenuIdx(savedMenuIdx === idx ? null : idx)
                        }
                        title="Options"
                      >
                        <svg
                          className="w-6 h-6 text-blue-200"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <circle cx="4" cy="10" r="2" />
                          <circle cx="10" cy="10" r="2" />
                          <circle cx="16" cy="10" r="2" />
                        </svg>
                      </button>
                      {savedMenuIdx === idx && (
                        <div
                          ref={savedMenuRef}
                          className="absolute right-0 mt-2 w-32 bg-gray-900 border border-blue-700 rounded-xl shadow-lg flex flex-col z-20"
                        >
                          <button
                            className="px-4 py-2 text-red-300 hover:bg-red-800/60 rounded-xl flex items-center gap-2"
                            onClick={() => {
                              // // Remove from saved
                              // const updated = user.saved.filter(
                              //   (_, i) => i !== idx
                              // );
                              // user.saved = updated;
                              // setSavedMenuIdx(null);
                              // // If using state for saved, call setSaved(updated) instead
                            }}
                          >
                            <FaTrash /> Unsave
                          </button>
                        </div>
                      )}
                    </div>
                    {/* Post Content */}
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                      <div>
                        <div className="text-white font-semibold text-base">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</div>
                      </div>
                      <div className="flex-1" />
                    </div>
                    <div className="text-gray-200 text-base">{post.content}</div>
                    {/* TAGS BELOW CAPTION */}
                    <div className="flex gap-1 flex-wrap mb-1">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-800/60 text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    {post.image && (
                      <div className="w-full rounded-xl overflow-hidden border border-gray-800 mt-1">
                        <img
                          src={post.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"}
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
                        <span>{post.upVotes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-red-300">
                        <svg
                          className="w-5 h-5 fill-red-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 5l5.878-3.09l-1.122 6.545L19.512 13.09l-6.561.955L10 20l-2.951-5.955l-6.561-.955l4.756-4.635L10 5z" />
                        </svg>
                        <span>{post.downVotes}</span>
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
                    {post.comment && post.comment.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {post.comment.map((comment) => (
                          <div
                            className="flex items-start gap-3"
                          >
                            <img
                              src={comment.userId.avatar || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"}
                              alt={comment.userId.name}
                              className="w-8 h-8 rounded-full object-cover border border-blue-400"
                            />
                            <div>
                              <div className="text-blue-200 font-semibold text-sm">
                                {comment.userId.name}
                                <span className="ml-2 text-xs text-gray-400">
                                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                </span>
                              </div>
                              <div className="text-gray-300 text-sm">
                                {comment.commentText}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )
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
              {user.achievements.length === 0 ? (
                <div className="text-gray-400 text-center py-10">
                  No achievements yet.
                </div>
              ) : (
                user.achievements.map((ach: Achievement, idx: number) =>
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
                            // const updated = [...achievements];
                            // updated[idx] = {
                            //   ...editAchievement,
                            //   image: achievements[idx].image || "",
                            // };
                            // setAchievements(updated);
                            // setEditAchievementIdx(null);
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
                          src={ach.image || "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"}
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
                              // setAchievements(
                              //   achievements.filter((_, i) => i !== idx)
                              // );
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
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${!showResearch
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-gray-800/80 text-blue-300 hover:bg-blue-900/40"
                  }`}
                onClick={() => setShowResearch(false)}
              >
                Workplace
              </button>
              <button
                className={`px-4 py-2 rounded-full font-semibold transition-colors ${showResearch
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
                user.workplaces.length === 0 ? (
                  <div className="text-gray-400 text-center py-10">N/A</div>
                ) : (
                  user.workplaces.map((work: Workplace, idx: number) =>
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
                              // const updated = [...workplaces];
                              // updated[idx] = { ...editWork };
                              // setWorkplaces(updated);
                              // setEditWorkIdx(null);
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
                                // setWorkplaces(
                                //   workplaces.filter((_, i) => i !== idx)
                                // );
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
              ) : user.researchWorks.length === 0 ? (
                <div className="text-gray-400 text-center py-10">N/A</div>
              ) : (
                user.researchWorks.map((rw: ResearchWork, idx: number) =>
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
                            // const updated = [...researchWorks];
                            // updated[idx] = { ...editResearch };
                            // setResearchWorks(updated);
                            // setEditResearchIdx(null);
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
                              // setResearchWorks(
                              //   researchWorks.filter((_, i) => i !== idx)
                              // );
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
              {user.socialLinks.length === 0 ? (
                <div className="text-gray-400 text-center py-10">
                  No social links added yet. Click "Add" to add your social
                  links.
                </div>
              ) : (
                user.socialLinks.map((sl: SocialLink, idx: number) =>
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
                            // const updated = [...socialLinks];
                            // updated[idx] = { ...editSocial, description: "" };
                            // setSocialLinks(updated);
                            // setEditSocialIdx(null);
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
                              // setSocialLinks(
                              //   socialLinks.filter((_, i) => i !== idx)
                              // );
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
            src={user.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
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
          {user.roles[0]}{user.roles[1] ? `, ${user.roles[1]}` : ""}
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
            {isMe && (
              <button
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-colors shadow-lg font-semibold"
                onClick={() => setShowPostCreation(true)}
              >
                <FaPlus /> Add New Post
              </button>
            )}
          </div>
        </div>
        {/* Navigation Buttons */}
        <nav className="flex flex-col gap-4 flex-1 justify-start items-stretch px-8">
          {leftMenu.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-sm border
                ${section === item.key
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
        {/* Section Content - Make scrollable and fill all available height */}
        <main className="flex-1 w-full h-0 min-h-0 overflow-y-auto px-0 md:px-6 py-4">
          <div className="max-w-3xl mx-auto h-full flex flex-col">
            {renderSection()}
          </div>
        </main>
      </div>
      {/* Right Side Chatbot */}
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
