// src/App.js
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  getData,
  updateDBData,
  resetDBData,
  exportDBData,
  importDBData,
} from "./services/dbServices";
import { saveAs } from "file-saver";
import Spinner from "react-bootstrap/Spinner";
import TopicCard from "./components/TopicCard/TopicCard";
import Topic from "./components/Topic/Topic";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import SheetSwitcher from "./components/SheetSwitcher/SheetSwitcher";
import "./App.css";

export const ThemeContext = createContext(null);

function App() {
  const [questionData, setQuestionData] = useState([]);
  const [dark, setDark] = useState(false);
  const [currentSheet, setCurrentSheet] = useState("sheet1");

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    if (!("isDark" in window.localStorage)) {
      window.localStorage.setItem("isDark", dark);
    } else {
      setDark(window.localStorage["isDark"] === "true");
    }
  }, []); // run once on mount

  // Load questions whenever sheet changes
  useEffect(() => {
    loadSheet(currentSheet);
  }, [currentSheet]);

  function loadSheet(sheetKey) {
    getData(sheetKey, (data) => setQuestionData(data));
  }

  function switchSheet(sheetKey) {
    setCurrentSheet(sheetKey);
  }

  function updateData(key, topicData, topicPosition) {
    let updated = questionData.map((topic, idx) => {
      if (idx === topicPosition) {
        updateDBData(currentSheet, key, topicData);
        return {
          topicName: topic.topicName,
          position: topic.position,
          ...topicData,
        };
      } else return topic;
    });
    setQuestionData(updated);
  }

  function resetData() {
    resetDBData(currentSheet, () => {
      setQuestionData([]);
      loadSheet(currentSheet);
    });
  }

  function exportData(callback) {
    exportDBData(currentSheet, (data) => {
      const blob = new Blob([JSON.stringify(data)], { type: "text/plain" });
      saveAs(blob, `${currentSheet}_progress.json`);
      callback();
    });
  }

  function importData(data, callback) {
    importDBData(currentSheet, data, (data) => {
      setQuestionData(data);
      callback();
    });
  }

  return (
    <Router>
      <div className={dark ? "App dark" : "App"}>
        {/* Top-right theme toggle button */}
        <button
          id="theme-toggle"
          className="theme-toggle-btn"
          onClick={() => {
            const newTheme = !dark;
            setDark(newTheme);
            window.localStorage.setItem("isDark", newTheme);
          }}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <h1 className="app-heading text-center mt-4">PrepSheets</h1>

        {/* Sheet Switcher */}
        <SheetSwitcher currentSheet={currentSheet} onSwitch={switchSheet} />

        {questionData.length === 0 ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="success" />
          </div>
        ) : (
          <ThemeContext.Provider value={dark}>
            <Route
              exact
              path="/"
              children={<TopicCard questionData={questionData} />}
            />
            <Route
              path="/about"
              children={
                <About
                  resetData={resetData}
                  exportData={exportData}
                  importData={importData}
                  setQuestionData={setQuestionData}
                />
              }
            />
            {questionData.map((topic, idx) => (
              <Route
                key={idx}
                path={`/${topic.topicName
                  .replace(/[^A-Z0-9]+/gi, "_")
                  .toLowerCase()}`}
                children={<Topic data={topic} updateData={updateData} />}
              />
            ))}
          </ThemeContext.Provider>
        )}
        <Footer dark={dark} setDark={setDark} />
      </div>
    </Router>
  );
}

export default App;
