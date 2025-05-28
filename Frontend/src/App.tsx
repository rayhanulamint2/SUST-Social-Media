// import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Signup from './Components/Signup';

function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* other routes */}
    </Routes>
  );
}

export default App;
