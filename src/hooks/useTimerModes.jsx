import { useEffect } from "react";
import getSavedData from "../utils/getSavedData";
import getMskDate from "../utils/getMskDate";

function useTimerModes(
  mode,
  setRemainded,
  setWorkState,
  setCompletedCount,
  setIsActive,
  SETTINGS,
) {
  useEffect(() => {
    const saved = getSavedData(`${mode}-data`, null);
    const today = getMskDate();

    setIsActive(false);

    if (saved && saved.date === today) {
      setRemainded(saved.remainded);
      setWorkState(saved.workState);
      setCompletedCount(saved.completedCount || 0);
    } else {
      setRemainded(
        mode === "pomodoro" ? SETTINGS.WORK_TIME : SETTINGS.MEDITATION_TIME,
      );
      setWorkState(true);
      setCompletedCount(0);
    }
  }, [
    mode,
    setRemainded,
    setWorkState,
    setCompletedCount,
    setIsActive,
    SETTINGS,
  ]);
}

export default useTimerModes;
