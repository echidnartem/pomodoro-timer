import { useEffect } from "react"
import formatTime from "../utils/formatTime";
import setSavedData from "../utils/setSavedData";
import getMskDate from "../utils/getMskDate";

function useTimerPersistence(remainded, workState, isActive, completedCount) {
  useEffect(() => {
    let status = workState ? "Работа" : "Отдых";
    if (!isActive) status = "Пауза";
    document.title = `${formatTime(remainded)} — ${status}`;
    const data = {
      remainded,
      workState,
      date: getMskDate(),
      completedCount,
    };
    setSavedData("pomodoro-data", data);
  }, [remainded, workState, isActive]);
}

export default useTimerPersistence;