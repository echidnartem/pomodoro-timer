import { useEffect } from "react";
import getSavedData from "../utils/getSavedData";
import getMskDate from "../utils/getMskDate";
import { TimerMode, TimerSettings, TimerData } from "../types"
import type { Dispatch, SetStateAction } from "react";

function useTimerModes(
  mode: TimerMode,
  setRemainded: Dispatch<SetStateAction<number>>,
  setWorkState: Dispatch<SetStateAction<boolean>>,
  setCompletedCount: Dispatch<SetStateAction<number>>,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  SETTINGS: TimerSettings,
) {
  useEffect(() => {
    const saved = getSavedData<TimerData | null>(`${mode}-data`, null);
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
