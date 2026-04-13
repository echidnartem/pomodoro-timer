import { useState, useEffect } from "react";
import Timer from "./components/Timer/Timer";
import getSavedData from "./utils/getSavedData.js";
import setSavedData from "./utils/setSavedData.js";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(() => {
    return (
      getSavedData("theme", null) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    const favicon = document.getElementById("favicon");

    if (favicon) {
      favicon.href =
        theme === "dark" ? "/favicon-light.svg" : "/favicon-dark.svg";
    }
    document.documentElement.setAttribute("data-theme", theme);
    setSavedData("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="app">
      <button
        className="button__theme-toggle"
        onClick={toggleTheme}
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
      <Timer />
    </div>
  );
}

export default App;
