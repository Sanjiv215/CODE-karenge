import React from "react";
import "../styles/login_signup.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


const Signup = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Create Account</h2>
        <p className="subtitle">Join the coding revolution 🚀</p>

        <form>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Password" required />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <p className="signup-text">
          Already have an account? <Link to="/login" >Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
