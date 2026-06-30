import { useEffect } from "react";
import getSavedData from "../utils/getSavedData";
import getMskDate from "../utils/getMskDate";
import type { Dispatch, SetStateAction } from "react";
import type { TimerMode, TimerSettings, TimerData } from "../types";

function useTimerModes(
  mode: TimerMode,
  setRemainded: Dispatch<SetStateAction<number>>,
  setWorkState: Dispatch<SetStateAction<boolean>>,
  setCompletedCount: Dispatch<SetStateAction<number>>,
  setIsActive: Dispatch<SetStateAction<boolean>>,
  settings: TimerSettings,
  settingsKey: string,
) {
  useEffect(() => {
    const saved = getSavedData<TimerData | null>(`${mode}-data`, null);
    const today = getMskDate();
    const hasSavedToday = saved?.date === today;

    setIsActive(false);

    if (hasSavedToday && saved.settingsKey === settingsKey) {
      setRemainded(saved.remainded);
      setWorkState(saved.workState);
      setCompletedCount(saved.completedCount || 0);
    } else {
      setRemainded(
        mode === "pomodoro" ? settings.workTime : settings.meditationTime,
      );
      setWorkState(true);
      setCompletedCount(hasSavedToday ? saved.completedCount || 0 : 0);
    }
  }, [
    mode,
    setRemainded,
    setWorkState,
    setCompletedCount,
    setIsActive,
    settings,
    settingsKey,
  ]);
}

export default useTimerModes;
