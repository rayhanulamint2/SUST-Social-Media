import { motion } from "framer-motion";
import {
  FaUsers,
  FaCalendarAlt,
  FaRobot,
  FaShieldAlt,
  FaGraduationCap,
  FaUniversity,
  FaComments,
  FaReact,
  FaNodeJs,
  FaBrain,
} from "react-icons/fa";
import { SiMongodb, SiJet, SiAmazon, SiGooglecloud } from "react-icons/si";

const features = [
  {
    title: "Campus Social Hub",
    desc: "Connect with peers, join academic discussions, and stay updated with campus life through an intuitive social feed.",
    icon: <FaUsers className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Academic Resources",
    desc: "Access course materials, academic notices, and department updates in one centralized platform.",
    icon: <FaUniversity className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Event Management",
    desc: "Discover and participate in campus events, workshops, and cultural programs with seamless registration.",
    icon: <FaCalendarAlt className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "AI Assistant",
    desc: "Get instant answers about university policies, academic schedules, and campus facilities.",
    icon: <FaRobot className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Anonymous Feedback",
    desc: "Share concerns and suggestions confidentially to improve campus life and academic experience.",
    icon: <FaShieldAlt className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Alumni Network",
    desc: "Connect with successful graduates, seek mentorship, and explore career opportunities.",
    icon: <FaGraduationCap className="w-12 h-12 text-blue-500" />,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-x-hidden font-sans">
      {/* Soft blurred background glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-gradient-to-tr from-purple-500/20 via-blue-500/10 to-indigo-500/10 rounded-full blur-[100px] translate-y-[-50%]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      {/* Glassy Navigation Bar */}
      <nav className="fixed left-1/2 top-8 z-20 -translate-x-1/2 w-[90vw] max-w-5xl rounded-full bg-gray-900/80 backdrop-blur-xl border border-blue-400/10 shadow-lg flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-500" />
          <span className="text-xl font-bold text-white tracking-wide">
            SUSTverse
          </span>
        </div>
        <div className="hidden md:flex space-x-8 text-base font-medium">
          <a
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#audience"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Community
          </a>
          <a
            href="#tech"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Technology
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href="/login"
            className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 rounded-xl shadow hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold"
          >
            Login
          </a>
          <a
            href="/signup"
            className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2 rounded-xl shadow hover:from-blue-600 hover:to-indigo-700 transition-all font-semibold"
          >
            Join
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-6xl mx-auto mt-32 mb-16 rounded-[2.5rem] shadow-2xl border border-blue-400/10 overflow-hidden bg-gray-900/80 backdrop-blur-2xl"
        style={{
          background:
            "linear-gradient(120deg,rgba(30,41,59,0.93) 80%,rgba(60,60,80,0.7) 100%)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
        }}
      >
        {/* Blurred background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="src/assets/sust_gate.jpg"
            alt="SUST Gate"
            className="w-full h-full object-cover object-center blur-[8px] scale-105 opacity-80"
            style={{ filter: "blur(12px) brightness(0.7)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-gray-950/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-16 py-24 flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Left: Large Title and CTA */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <span className="uppercase tracking-widest text-xs md:text-sm text-blue-400 font-semibold mb-3">
              Welcome to SUSTVerse
            </span>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-white/90 drop-shadow-xl tracking-tight">
              <span className="text-white/90">Your Gateway</span>
              <span className="text-gray-400/80"> to Campus Life</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Connect, collaborate, and thrive in a unified digital experience
              for SUST students, alumni, and faculty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full max-w-md justify-center md:justify-start">
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98]"
              >
                Explore Platform
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-blue-600 border-2 border-blue-500 rounded-xl hover:bg-blue-50 transition-all"
              >
                Join Community
              </a>
            </div>
          </div>
          {/* Right: Glassy Feature Preview */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.slice(0, 4).map((feature) => (
                <div
                  key={feature.title}
                  className="group bg-gray-800/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300 shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-700/70 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-xs">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right w-full">
              <a
                href="#features"
                className="text-blue-400 hover:underline text-sm font-medium"
              >
                See all features &rarr;
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section
        id="features"
        className="py-32 bg-transparent relative overflow-hidden w-full"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.10),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.10),transparent_50%)]"></div>
        </div>
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 w-full px-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-300">
              A comprehensive platform designed to enhance your university
              experience
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300 shadow-lg"
              >
                <div className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-700/70 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section
        id="audience"
        className="py-32 bg-gray-900 relative overflow-hidden w-full"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_30%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 w-full px-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-300">
              A platform designed for every member of the SUST family
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full px-8">
            {[
              {
                label: "Students",
                title: "Current Students",
                desc: "Access academic resources, connect with peers, and stay updated with campus life.",
                icon: <FaUsers className="w-8 h-8 text-blue-400" />,
              },
              {
                label: "Alumni",
                title: "Graduates",
                desc: "Network with fellow graduates, mentor students, and share industry insights.",
                icon: <FaGraduationCap className="w-8 h-8 text-purple-400" />,
              },
              {
                label: "Faculty",
                title: "Administrators",
                desc: "Manage academic content, communicate with students, and monitor platform activities.",
                icon: <FaUniversity className="w-8 h-8 text-emerald-400" />,
              },
              {
                label: "Clubs",
                title: "Organizations",
                desc: "Promote events, manage members, and engage with the university community.",
                icon: <FaComments className="w-8 h-8 text-pink-400" />,
              },
            ].map((aud, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
              >
                <div className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-700/70 transition-colors">
                    {aud.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {aud.title}
                  </h3>
                  <p className="text-gray-300">{aud.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section
        id="tech"
        className="py-32 bg-gray-900 relative overflow-hidden w-full"
      >
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        </div>
        <div className="relative w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 w-full px-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-300">
              Leveraging cutting-edge technologies for a seamless experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8">
            {[
              {
                title: "Frontend: React.js",
                desc: "Modern, responsive interface built with React.js and Material-UI components.",
                icon: <FaReact className="w-8 h-8 text-blue-400" />,
              },
              {
                title: "Backend: Node.js",
                desc: "Robust server architecture using Node.js and Express.js for optimal performance.",
                icon: <FaNodeJs className="w-8 h-8 text-green-400" />,
              },
              {
                title: "Database: MongoDB",
                desc: "Efficient data management with MySQL and MongoDB for different use cases.",
                icon: (
                  <div className="flex gap-2">
                    {/* <SiMysql className="w-8 h-8 text-blue-400" /> */}
                    <SiMongodb className="w-8 h-8 text-green-400" />
                  </div>
                ),
              },
              {
                title: "Authentication: JWT",
                desc: "Secure user authentication and authorization with JSON Web Tokens.",
                icon: <SiJet className="w-8 h-8 text-purple-400" />,
              },
              {
                title: "Cloud: AWS/Google Cloud",
                desc: "Scalable cloud infrastructure ensuring high availability and performance.",
                icon: (
                  <div className="flex gap-2">
                    <SiAmazon className="w-8 h-8 text-orange-400" />
                    <SiGooglecloud className="w-8 h-8 text-blue-400" />
                  </div>
                ),
              },
              {
                title: "AI Integration",
                desc: "Smart features powered by custom AI models for enhanced user experience.",
                icon: <FaBrain className="w-8 h-8 text-pink-400" />,
              },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300"
              >
                <div className="relative text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gray-700/50 flex items-center justify-center group-hover:bg-gray-700/70 transition-colors">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {tech.title}
                  </h3>
                  <p className="text-gray-300">{tech.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        </div>
        <div className="py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Ready to Join SUSTVerse?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Be part of a platform that's transforming how SUST students
              connect, learn, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98]"
              >
                Get Started
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-32 bg-gray-900 relative overflow-hidden w-full"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">
          Let's Build Something Amazing Together!
        </h2>
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        </div>

        <div className="py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start w-full px-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/50 transition-colors duration-300">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-10 h-10 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Email Us
                    </h4>
                    <a
                      href="mailto:contact@sustverse.org"
                      className="text-blue-400 hover:text-blue-300 text-lg transition-colors block mb-1"
                    >
                      contact@sustverse.org
                    </a>
                    <p className="text-gray-400">
                      We'll respond as soon as possible
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors duration-300">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-10 h-10 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Call Us
                    </h4>
                    <a
                      href="tel:+8801234567890"
                      className="text-purple-400 hover:text-purple-300 text-lg transition-colors block mb-1"
                    >
                      +880-123-456-7890
                    </a>
                    <p className="text-gray-400">Mon-Fri from 8am to 6pm</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-10 h-10 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      Visit Us
                    </h4>
                    <p className="text-emerald-400 text-lg block mb-1">
                      Shahjalal University of Science and Technology
                    </p>
                    <p className="text-gray-400">Sylhet, Bangladesh</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
            >
              <p className="text-gray-300 mb-12">
                Whether you're a student, faculty member, or alumni, we're here
                to help you make the most of SUSTVerse. Drop us a message and
                let's start the conversation!
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      placeholder="yourname@gmail.com"
                    />
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="group">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-blue-400 transition-colors"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 font-medium transform hover:scale-[1.02] focus:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 w-full">
        <div className="py-16 w-full text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full px-8">
            {/* Brand Section */}
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold text-white">SUSTverse</h2>
              <p className="text-gray-400 max-w-md mx-auto my-5">
                The digital campus of Shahjalal University of Science and
                Technology, connecting students, alumni, and faculty.
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#audience"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#tech"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
