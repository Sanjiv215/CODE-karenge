import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

const Navbar = () => {
  return (
    <header>
      <div className="logo">Sochenge</div>
      <nav>
        <Link className="nav_links" to="/">Home</Link>
        <Link className="nav_links"  to="/practice">Practice</Link>

        <Link className="nav_links" to="/ai-tutor">AI Tutor</Link>
        <Link  className="nav_links" to="/projects">Projects</Link>


        <Link to="/signup" className="signup">Sign Up</Link>
        <Link to="/login" className="login">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;
