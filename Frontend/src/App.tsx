// import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";
import Homepage from "./Components/Homepage";
import AdminLogin from "./Components/AdminLogin";
import AdminSignup from "./Components/AdminSignup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/adminsignup" element={<AdminSignup />} />
      {/* other routes */}
    </Routes>
  );
}

export default App;
