// import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import LandingPage from "./Components/LandingPage";
import Signup from "./Components/Signup";
import Homepage from "./Components/Homepage";
import UserProfile from "./Components/UserProfile"
import AdminHomepage from './Components/AdminHomepage';
import AdminLogin from './Components/AdminLogin';
import AdminSignup from './Components/AdminSignup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="/admin" element={<AdminHomepage />} />
      <Route path="/adminLogin" element={<AdminLogin />} />
      <Route path="/adminSignup" element={<AdminSignup />} />
    </Routes>
  );
}

export default App;
