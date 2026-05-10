import { useState, useEffect } from "react";
import { Moon, Sun, Eye, EyeOff } from "lucide-react";
import Timer from "./components/Timer/Timer";
import MainImage from "./assets/image.svg?react";
import getSavedData from "./utils/getSavedData";
import setSavedData from "./utils/setSavedData";
import type { Theme, TimerMode} from "./types"
import "./App.css";

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (
      getSavedData<Theme | null>("theme", null) ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const [mode, setMode] = useState<TimerMode>(() => {
    return getSavedData<TimerMode | null>("mode", null) || "pomodoro";
  });

  useEffect(() => {
    const favicon = document.getElementById("favicon");

    if (favicon instanceof HTMLLinkElement) {
      favicon.href =
        theme === "dark" ? "favicon-light.svg" : "favicon-dark.svg";
    }
    document.documentElement.setAttribute("data-theme", theme);
    setSavedData<Theme>("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-mode", mode);
    setSavedData<TimerMode>("mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "pomodoro" ? "meditation" : "pomodoro"));
  };

  return (
    <div className="app">
      <div className="app__buttons">
        <button className="button-toggle" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="button-icon" />
          ) : (
            <Sun className="button-icon" />
          )}
        </button>
        <button className="button-toggle" onClick={toggleMode}>
          {mode === "pomodoro" ? (
            <EyeOff className="button-icon" />
          ) : (
            <Eye className="button-icon" />
          )}
        </button>
      </div>
      <MainImage className="app__image" viewBox="90 100 600 600" />
      <Timer mode={mode} />
    </div>
  );
}

export default App;
