import { useState } from "react";
import { motion } from "framer-motion";
import { FaUserCircle, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import http from "../http";

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState("");

  // Handles admin signup using backend's /admin/signup endpoint
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await http.post("admin/signup", payload);
      setData(response.data);
      alert("Admin account created successfully! Please login.");
      navigate("/adminlogin");
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/10 via-blue-500/5 to-indigo-500/5 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-4xl rounded-3xl shadow-2xl border border-blue-400/10 p-0 overflow-hidden"
        style={{
          background: "rgba(30, 41, 59, 0.85)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        {/* Blurred background image */}
        <div className="absolute inset-0">
          <img
            src="src/assets/sust_gate.jpg"
            alt="SUST Gate"
            className="w-full h-full object-cover object-center blur-[4px] scale-105"
            style={{ filter: "blur(6px) brightness(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full px-10 py-12 md:px-16 md:py-16">
          {/* Topbar */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-lg font-semibold text-white tracking-wide">
              SUSTverse
            </span>
            <nav className="ml-auto flex gap-8 text-gray-300 text-sm">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="hover:text-blue-400 transition-colors bg-transparent border-none outline-none cursor-pointer"
                style={{ background: "none", padding: 0 }}
              >
                Home
              </button>
              <a
                href="/adminlogin"
                className="hover:text-blue-400 transition-colors"
              >
                Admin Login
              </a>
            </nav>
          </div>
          {/* ADMIN SIGNUP INDICATOR */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs tracking-widest shadow uppercase mb-2">
              Admin Signup Page
            </span>
          </div>
          {/* Title */}
          <div className="mb-10">
            <p className="uppercase text-xs tracking-widest text-gray-400 mb-2 font-semibold">
              Admin registration
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Create <span className="text-blue-400">Admin Account</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Already have an admin account?{" "}
              <button
                type="button"
                className="text-blue-400 hover:underline font-medium bg-transparent border-none outline-none cursor-pointer"
                onClick={() => navigate("/adminlogin")}
              >
                Login here
              </button>
            </p>
          </div>
          {/* Form */}
          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-gray-400 mb-2"
              >
                Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                  placeholder="Admin Name"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-400 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
                <input
                  type="email"
                  id="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none"
                  placeholder="admin@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-gray-400 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base" />
                <input
                  type="password"
                  id="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 outline-none"
                  placeholder="Create a password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 text-base"
            >
              Sign Up
            </button>
          </form>
          {/* Divider and copyright */}
          <div className="mt-10 flex items-center justify-between text-xs text-gray-500">
            <span>&copy; {new Date().getFullYear()} SUSTverse</span>
            <span className="font-mono text-white text-lg font-bold tracking-widest">
              .SV
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
