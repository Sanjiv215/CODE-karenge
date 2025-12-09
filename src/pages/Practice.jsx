import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/practice.css";

const Practice = () => {
  // --- STATES ---
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [outputVisible, setOutputVisible] = useState(false);
  const [output, setOutput] = useState("// Output will appear here...");
  const [question, setQuestion] = useState("Loading question...");

  // Languages supported by backend currently
  const languages = ["Python", "JavaScript", "HTML", "CSS", "React"];

  // --- API CALL: Fetch Random Question ---
  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/question?subject=${language}`
      );
      setQuestion(res.data.question);
    } catch (err) {
      console.error(err.message);
      setQuestion("⚠ Failed to load question. Try again.");
    }
  };

  // Fetch question when language changes or page loads
  useEffect(() => {
    fetchQuestion();
  }, [language]);

  // --- API CALL: Execute Code ---
  const handleRun = async () => {
    setOutputVisible(true);
    setOutput("⏳ Running your code...");

    try {
      const res = await axios.post("http://localhost:8000/run", {
        language: language.toLowerCase(),
        code,
        stdin: "",
      });

      const result = res.data;
      let finalOutput = "";

      // Read execution output safely
      if (result.stdout) finalOutput += result.stdout;
      if (result.stderr) finalOutput += `\nError:\n${result.stderr}`;
      if (result.compile_output)
        finalOutput += `\nCompile Output:\n${result.compile_output}`;

      // No output case
      if (!finalOutput.trim()) finalOutput = "// No output";

      setOutput(finalOutput);
    } catch (err) {
      console.error(err);
      setOutput("❌ Backend Error: " + err.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="practice-page">
        {/* LEFT SIDE — LANGUAGE + QUESTION */}
        <div className="practice-left">
          <h2 className="practice-heading">Practice Question</h2>

          {/* Language Selector */}
          <div className="language-row">
            <span className="language-label">Select Language</span>
            <select
              className="language-select"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode(""); // Clear previous language code
                setOutputVisible(false); // Hide previous output
              }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Display Question */}
          <div className="question-text">
            <h3>Question:</h3>
            <p>{question}</p>
          </div>

          {/* Get New Question */}
          <button className="next-btn" onClick={fetchQuestion}>
            Next →
          </button>
        </div>

        {/* RIGHT SIDE — CODE EDITOR + OUTPUT */}
        <div className="practice-right">
          {/* Code Editor Card */}
          <div className="editor-card">
            <div className="editor-header">
              <span className="editor-lang-pill">
                {language.toUpperCase()}
              </span>

              <button className="run-btn" onClick={handleRun}>
                Run
              </button>
            </div>

            {/* Code Editor Box */}
            <textarea
              className="code-editor"
              spellCheck="false"
              placeholder="// Write your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* Sliding Output Panel */}
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
