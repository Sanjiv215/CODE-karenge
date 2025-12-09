import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import "../styles/practice.css";

const Practice = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("// Output will appear here...");
  const [question, setQuestion] = useState("Loading question...");
  const [editorRef, setEditorRef] = useState(null);

  // Hide ResizeObserver warning spam
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (
        e.message ===
        "ResizeObserver loop completed with undelivered notifications."
      ) {
        e.stopImmediatePropagation();
      }
    });
  }, []);

  const languages = ["Python", "JavaScript"];

  const fetchQuestion = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/question?subject=${language}`
      );
      setQuestion(res.data.question);
      setOutput("// Output will appear here...");
    } catch (err) {
      setQuestion("⚠ Failed to load question.");
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, [language]);

  const handleRun = async () => {
    setOutput("⏳ Running code...");

    if (editorRef) editorRef.deltaDecorations([], []);

    try {
      const res = await axios.post("http://localhost:8000/run", {
        language: language.toLowerCase(),
        code,
        stdin: "",
      });

      const result = res.data;
      let finalOutput =
        result.stderr || result.stdout || "// No output received";

      setOutput(finalOutput);

      // Highlight runtime error line
      const match = finalOutput.match(/:(\d+):?/);
      if (match && editorRef) {
        const line = parseInt(match[1]);
        editorRef.deltaDecorations([], [
          {
            range: new monaco.Range(line, 1, line, 1),
            options: {
              isWholeLine: true,
              className: "errorHighlight",
            },
          },
        ]);
      }
    } catch (err) {
      setOutput("❌ Backend error! Check server.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="practice-page">

        {/* LEFT PANEL */}
        <div className="practice-left">
          <h2 className="practice-heading">Practice Question</h2>

          <div className="language-row">
            <span className="language-label">Select Language</span>
            <select
              className="language-select"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setCode("");
              }}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang.toLowerCase()}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="question-text">
            <h3>Question:</h3>
            <p>{question}</p>
          </div>

          <button className="next-btn" onClick={fetchQuestion}>
            Next →
          </button>
        </div>

        {/* RIGHT SPLIT SCREEN */}
        <div className="io-container">
          <div className="editor-section">
            <div className="editor-header">
              <span className="editor-lang-pill">
                {language.toUpperCase()}
              </span>
              <button className="run-btn" onClick={handleRun}>
                Run
              </button>
            </div>

            <Editor
              height="500px"
              theme="vs-dark"
              language={language === "javascript" ? "javascript" : "python"}
              value={code}
              onChange={(v) => setCode(v)}
              onMount={(editor) => setEditorRef(editor)}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                automaticLayout: true,
                tabSize: 4,
                insertSpaces: true,
                wordWrap: "on",
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="output-section">
            <h3>Output</h3>
            <pre>{output}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Practice;
