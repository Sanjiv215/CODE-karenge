import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/practice.css";

const Practice = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [output, setOutput] = useState("// Output will appear here...");
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    "Write a function to calculate and return the factorial of a number.",
    "Write a program to reverse a string without using built-in functions.",
    "Write a program to find largest number in an array.",
    "Write a program to check if a number is prime.",
    "Write a program to count vowels in a string.",
  ];

  const languages = ["Python", "JavaScript", "HTML", "CSS", "React"];

  const handleNext = () => {
    setQuestionIndex((prev) =>
      prev === questions.length - 1 ? 0 : prev + 1
    );
  };

  const handleRun = () => {
    setOutputVisible(true);
    setOutput(
      `▶ Running ${language.toUpperCase()} code...\n\n${code || "// (no code yet)"}
      
// (Real compilation will be added soon!)`
    );
  };

  return (
    <>
      <Navbar />
   

      <div className="practice-page">
        
        {/* LEFT: QUESTION PANEL */}
        <div className="practice-left">
          <h2 className="practice-heading">Practice Question</h2>

          <div className="language-row">
            <span className="language-label">Select Language</span>
            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="question-text">
            <h3>Question {questionIndex + 1}:</h3>
            <p>{questions[questionIndex]}</p>
          </div>

          <button className="next-btn" onClick={handleNext}>
            Next →
          </button>
        </div>

        {/* RIGHT: EDITOR + OUTPUT */}
        <div className="practice-right">
          <div className="editor-card">
            <div className="editor-header">
              <span className="editor-lang-pill">
                {language.toUpperCase()}
              </span>
              <button className="run-btn" onClick={handleRun}>
                Run
              </button>
            </div>

            <textarea
              className="code-editor"
              spellCheck="false"
              placeholder="// Write your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* SLIDING OUTPUT */}
          <div className={`output-panel ${outputVisible ? "open" : ""}`}>
            <div className="output-header">Output</div>
            <pre className="output-body">{output}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Practice;
