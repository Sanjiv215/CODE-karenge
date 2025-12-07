import React from "react";
import Navbar from "../components/Navbar"; // using your existing navbar
import "../styles/projects.css"; // external CSS file

const Projects = () => {
  return (
    <>
      <Navbar />

      <h1 className="page-title">Your Projects</h1>

      <div className="project-container">

        <div className="project-box">
          <h3>Portfolio Website</h3>
          <p>A clean personal website built with HTML, CSS, and basic JS.</p>
        </div>

        <div className="project-box">
          <h3>Calculator App</h3>
          <p>A simple calculator demonstrating DOM manipulation and logic.</p>
        </div>

        <div className="project-box">
          <h3>Todo Application</h3>
          <p>A task manager with add/delete operations and stored data.</p>
        </div>

        <div className="project-box">
          <h3>Weather App</h3>
          <p>Fetches real-time weather using API and shows it beautifully.</p>
        </div>

      </div>
    </>
  );
};

export default Projects;
