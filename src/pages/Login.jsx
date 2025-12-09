import React from "react";
import { Link } from "react-router-dom";
import "../styles/login_signup.css";


const Login = () => {
  return (
    <div className="container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your coding journey</p>

        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="example@mail.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" required />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>

        <p className="signup-text">
          Don’t have an account?  <Link to="/signup" >Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
