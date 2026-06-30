import { useEffect } from "react";
import formatTime from "../utils/formatTime";
import setSavedData from "../utils/setSavedData";
import getMskDate from "../utils/getMskDate";
import type { TimerMode, TimerData } from "../types";

function useTimerPersistence(
  remainded: number,
  workState: boolean,
  isActive: boolean,
  completedCount: number,
  mode: TimerMode,
  settingsKey: string,
) {
  useEffect(() => {
    if (remainded === 0) return;

    let status =
      mode === "pomodoro" ? (workState ? "Работа" : "Отдых") : "Медитация";
    if (!isActive) status = "Пауза";
    document.title = `${formatTime(remainded)} — ${status}`;
    const data = {
      remainded,
      workState,
      date: getMskDate(),
      completedCount,
      settingsKey,
    };
    setSavedData<TimerData>(`${mode}-data`, data);
  }, [remainded, workState, isActive, completedCount, mode, settingsKey]);
}

export default useTimerPersistence;
