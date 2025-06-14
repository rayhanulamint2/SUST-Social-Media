import { use, useState } from "react";
import { motion } from "framer-motion";
import http from "../http";
import {
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaIdCard,
  FaFileUpload,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const departments = [
  "FES",
  "ARC",
  "CEP",
  "CEE",
  "CSE",
  "EEE",
  "FET",
  "IPE",
  "MEE",
  "PME",
  "SWE",
  "BMB",
  "GEB",
  "Business Administration",
  "Chemistry",
  "Mathematics",
  "Physics",
  "Statistics",
  "GEE",
  "OCG",
  "ANP",
  "BNG",
  "ECO",
  "ENG",
  "PSS",
  "PAD",
  "SCW",
  "SOC",
];

const sessions = [
  "1990-91",
  "1991-92",
  "1992-93",
  "1993-94",
  "1994-95",
  "1995-96",
  "1996-97",
  "1997-98",
  "1998-99",
  "1999-00",
  "2000-01",
  "2001-02",
  "2002-03",
  "2003-04",
  "2004-05",
  "2005-06",
  "2006-07",
  "2007-08",
  "2008-09",
  "2009-10",
  "2010-11",
  "2011-12",
  "2012-13",
  "2013-14",
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25"
];


export default function Signup() {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [department, setDepartment] = useState("");
  const [session, setSession] = useState("");
  const [roles, setRoles] = useState<string[]>(["student"]);
  const navigate = useNavigate();

  const [data, setData] = useState("");
  

  // Role selection logic
  const handleRoleChange = (role: string) => {
    let updatedRoles = [...roles];
    if (updatedRoles.includes(role)) {
      updatedRoles = updatedRoles.filter((r) => r !== role);
    } else {
      // Prevent teacher+employee
      if (
        (role === "teacher" && updatedRoles.includes("employee")) ||
        (role === "employee" && updatedRoles.includes("teacher"))
      ) {
        updatedRoles = updatedRoles.filter((r) => r === "student");
      }
      updatedRoles.push(role);
    }
    // Always keep at least one role
    if (updatedRoles.length === 0) updatedRoles = ["student"];
    setRoles(updatedRoles);
  };

  // Hide reg no if teacher or employee only (not student)
  const showRegNo = roles.includes("student");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("Register button clicked");

  const payload = {
    name: name,
    regNo: regNo,
    email: email,
    password: password,
    department: department,
    session: session,
    roles: roles
  };
  console.log("Payload:", payload);

  try {
    const response = await http.post("userVerification/createVerification", payload);
    console.log("Registration successful:", response.data);
    setData(response.data);
    navigate("/login"); // Navigate to home or login page after successful registration
  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please try again.");
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
        className="relative z-10 w-full max-w-xl rounded-2xl shadow-2xl border border-blue-400/10 p-0 overflow-hidden"
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
        <div className="relative z-10 flex flex-col h-full px-6 py-8 md:px-10 md:py-10">
          {/* Topbar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-lg font-semibold text-white tracking-wide">
              SUSTverse
            </span>
            <nav className="ml-auto flex gap-6 text-gray-300 text-sm">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="hover:text-blue-400 transition-colors bg-transparent border-none outline-none cursor-pointer"
                style={{ background: "none", padding: 0 }}
              >
                Home
              </button>
              <a
                href="/login"
                className="hover:text-blue-400 transition-colors"
              >
                Login
              </a>
            </nav>
          </div>
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Create <span className="text-blue-400">new account</span>
            </h2>
            <p className="text-gray-400 text-xs">
              Already a member?{" "}
              <a
                href="/login"
                className="text-blue-400 hover:underline font-medium"
              >
                Log In
              </a>
            </p>
          </div>
          {/* Form */}
          <form className="space-y-3" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                  htmlFor="name"
                >
                  Name
                </label>
                <div className="relative">
                  <FaUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none text-sm"
                    placeholder="Your name"
                  />
                </div>
              </div>
              {showRegNo && (
                <div>
                  <label
                    className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                    htmlFor="regNo"
                  >
                    Registration Number
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base" />
                    <input
                      type="text"
                      id="regNo"
                      required={showRegNo}
                      value={regNo}
                      onChange={(e) => setRegNo(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 outline-none text-sm"
                      placeholder="Registration No"
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 text-base" />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 text-base" />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 outline-none text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label
                  className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                  htmlFor="department"
                >
                  Department
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base" />
                  <select
                    id="department"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 outline-none text-sm"
                  >
                    <option value="">Select department</option>
                    {departments.map((dep) => (
                      <option key={dep} value={dep}>
                        {dep}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                  htmlFor="session"
                >
                  Session
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300 text-base" />
                  <select
                    id="session"
                    required
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 outline-none text-sm"
                  >
                    <option value="">Select session</option>
                    {sessions.map((ses) => (
                      <option key={ses} value={ses}>
                        {ses}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-semibold text-gray-400 mb-1 pl-3"
                htmlFor="document"
              >
                Attach Document
              </label>
              <div className="relative flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-blue-400 hover:text-blue-300">
                  <FaFileUpload />
                  <span className="underline">Choose file</span>
                  <input
                    type="file"
                    id="document"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {document && (
                  <span className="text-xs text-gray-300">{document.name}</span>
                )}
              </div>
            </div>
            {/* Roles */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1 pl-3">
                Role(s)
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.includes("student")}
                    onChange={() => handleRoleChange("student")}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-200 text-sm">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.includes("teacher")}
                    onChange={() => handleRoleChange("teacher")}
                    disabled={roles.includes("employee")}
                    className="accent-blue-500"
                  />
                  <span
                    className={`text-gray-200 text-sm ${
                      roles.includes("employee") ? "opacity-50" : ""
                    }`}
                  >
                    Teacher
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles.includes("employee")}
                    onChange={() => handleRoleChange("employee")}
                    disabled={roles.includes("teacher")}
                    className="accent-blue-500"
                  />
                  <span
                    className={`text-gray-200 text-sm ${
                      roles.includes("teacher") ? "opacity-50" : ""
                    }`}
                  >
                    Employee
                  </span>
                </label>
              </div>
              <div className="text-xs text-gray-400 mt-1"></div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-xl font-semibold shadow-lg hover:from-blue-400 hover:to-indigo-500 transition-all duration-300 text-base mt-2"
            >
              Create Account
            </button>
          </form>
          {/* Divider and copyright */}
          <div className="mt-6 flex items-center justify-between text-xs text-gray-500">
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
