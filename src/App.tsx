import { useState, useEffect } from "react";
import { Moon, Sun, Eye, EyeOff, Settings } from "lucide-react";
import Timer from "./components/Timer/Timer";
import TimerSettings from "./components/Timer/TimerSettings";
import MainImage from "./assets/image.svg?react";
import useTimerSettings from "./hooks/useTimerSettings";
import getSavedData from "./utils/getSavedData";
import setSavedData from "./utils/setSavedData";
import type { Theme, TimerMode } from "./types";
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    settings,
    presets,
    selectedPresetId,
    selectPreset,
    updateCustomSettings,
  } = useTimerSettings();

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

  const toggleSettings = () => {
    setIsSettingsOpen((prev) => !prev);
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
        <div className="app__settings-control">
          <button
            className="button-toggle"
            onClick={toggleSettings}
          >
            <Settings className="button-icon" />
          </button>
          {isSettingsOpen && (
            <div className="app__settings-popover">
              <TimerSettings
                settings={settings}
                presets={presets}
                selectedPresetId={selectedPresetId}
                onSelectPreset={selectPreset}
                onChangeCustomSettings={updateCustomSettings}
              />
            </div>
          )}
        </div>
      </div>
      <MainImage className="app__image" viewBox="90 100 600 600" />
      <Timer mode={mode} settings={settings} />
    </div>
  );
}

export default App;
