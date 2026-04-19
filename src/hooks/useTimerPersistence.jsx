import { useEffect } from "react";
import formatTime from "../utils/formatTime";
import setSavedData from "../utils/setSavedData";
import getMskDate from "../utils/getMskDate";

function useTimerPersistence(
  remainded,
  workState,
  isActive,
  completedCount,
  mode,
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
    };
    setSavedData(`${mode}-data`, data);
  }, [remainded, workState, isActive]);
}

export default useTimerPersistence;
