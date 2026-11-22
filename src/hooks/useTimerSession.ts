import { useCallback, useState } from "react";
import { getTimerSettingsKey } from "../constants";
import type { TimerData, TimerMode, TimerSettings } from "../types";
import getMskDate from "../utils/getMskDate";
import getSavedData from "../utils/getSavedData";
import playAlarm from "../utils/playAlarm";
import useTimer from "./useTimer";
import useTimerHotkey from "./useTimerHotkey";
import useTimerPersistence from "./useTimerPersistence";

function restoreSession(mode: TimerMode, settingsKey: string, focusTime: number) {
  const saved = getSavedData<TimerData | null>(`${mode}-data`, null);
  const today = saved?.date === getMskDate() ? saved : null;
  const matchingSession = today?.settingsKey === settingsKey ? today : null;

  return {
    remainingSeconds: matchingSession?.remainded ?? focusTime,
    workState: matchingSession?.workState ?? true,
    completedCount: today?.completedCount ?? 0,
  };
}

export default function useTimerSession(mode: TimerMode, settings: TimerSettings) {
  const focusTime = mode === "pomodoro" ? settings.workTime : settings.meditationTime;
  const settingsKey = getTimerSettingsKey(settings);
  const [initial] = useState(() => restoreSession(mode, settingsKey, focusTime));
  const [workState, setWorkState] = useState(initial.workState);
  const [completedCount, setCompletedCount] = useState(initial.completedCount);

  const finishPhase = useCallback(() => {
    playAlarm();
    if (workState) {
      setCompletedCount((count) => count + 1);
    }
    setWorkState(!workState);
    return workState ? settings.breakTime : focusTime;
  }, [workState, settings.breakTime, focusTime]);

  const { remainded: remainingSeconds, setRemainded, isActive, setIsActive } =
    useTimer(initial.remainingSeconds, finishPhase);

  const toggleTimer = useCallback(() => {
    setIsActive((active) => !active);
  }, [setIsActive]);

  function resetTimer() {
    setIsActive(false);
    setRemainded(focusTime);
    setWorkState(true);
  }

  useTimerPersistence(remainingSeconds, workState, isActive, completedCount, mode, settingsKey);
  useTimerHotkey(toggleTimer);

  return { remainingSeconds, isActive, workState, completedCount, toggleTimer, resetTimer };
}
