import React from "react";
import "../styles/style.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">

          <div className="hero-text">
            <h1>
              Master Coding with AI.<br />
              Built for BTech Students.
            </h1>

            <div className="buttons">
              <Link to="/practice">
                <button className="primary-btn">Start Practicing</button>
              </Link>
              <Link to="/ai-tutor">
              <button className="secondary-btn">Try AI Tutor</button>
              </Link>
            </div>
          </div>

          <div className="code-card">
            <pre>
              {`1  def factorial(n):
2     fact = 1
3     for i in range(1, n + 1):
4         fact *= i
5         print(fact)
6     return 
7
8  factorial(5)
9`}
            </pre>
          </div>

        </div>
      </section>

      {/* TRACKS SECTION */}
      <section className="tracks">
        <h2>Progress...</h2>

        <div className="track-grid">

          <div className="track-card">
            <img className="track-logo"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
              alt="Python" />
            <p className="title">Python Basics</p>
            <div className="progress"><span style={{ width: "76%" }}></span></div>
            <p className="percent">76% complete</p>
          </div>

          <div className="track-card">
            <img className="track-logo"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
              alt="JavaScript" />
            <p className="title">JavaScript</p>
            <div className="progress"><span style={{ width: "34%" }}></span></div>
            <p className="percent">34% complete</p>
          </div>

          <div className="track-card">
            <img className="track-logo"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"
              alt="HTML" />
            <p className="title">HTML</p>
            <div className="progress"><span style={{ width: "70%" }}></span></div>
            <p className="percent">70% complete</p>
          </div>

          <div className="track-card">
            <img className="track-logo"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
              alt="CSS" />
            <p className="title">CSS</p>
            <div className="progress"><span style={{ width: "60%" }}></span></div>
            <p className="percent">60% complete</p>
          </div>

          <div className="track-card">
            <img className="track-logo"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
              alt="React" />
            <p className="title">React</p>
            <div className="progress"><span style={{ width: "5%" }}></span></div>
            <p className="percent">5% complete</p>
          </div>

        </div>
      </section>
    </>
  );
};

export default Home;
