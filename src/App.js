import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Practice from "./pages/Practice";
import AiTutor from "./pages/AiTutor";
import Projects from "./pages/Projects";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/ai-tutor" element={<AiTutor />} />
       <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
