import { useState, useCallback } from "react";
import useTimer from "../../hooks/useTimer";
import useTimerModes from "../../hooks/useTimerModes";
import useTimerPersistence from "../../hooks/useTimerPersistence";
import useTimerHotkey from "../../hooks/useTimerHotkey";
import formatTime from "../../utils/formatTime";
import playAlarm from "../../utils/playAlarm";
import Counter from "../Counter/Counter";
import ControlButtons from "../ControlButtons/ControlButtons";
import { getTimerSettingsKey } from "../../constants";
import type {
  TimerMode,
  TimerSettings as TimerSettingsValue,
} from "../../types";
import "./Timer.css";

type TimerProps = {
  mode: TimerMode;
  settings: TimerSettingsValue;
};

function Timer({ mode, settings }: TimerProps) {
  const [workState, setWorkState] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);
  const settingsKey = getTimerSettingsKey(settings);

  const handleTimerEnd = useCallback(() => {
    playAlarm();

    if (workState) {
      setCompletedCount((prev) => prev + 1);
    }

    const nextWorkState = !workState;
    setWorkState(nextWorkState);

    return nextWorkState
      ? mode === "pomodoro"
        ? settings.workTime
        : settings.meditationTime
      : settings.breakTime;
  }, [mode, settings, workState]);

  const { remainded, setRemainded, isActive, setIsActive } = useTimer(
    0,
    handleTimerEnd,
  );

  const toggleTimer = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [setIsActive]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setRemainded(
      mode === "pomodoro" ? settings.workTime : settings.meditationTime,
    );
    setWorkState(true);
  }, [mode, setIsActive, setRemainded, settings]);

  useTimerModes(
    mode,
    setRemainded,
    setWorkState,
    setCompletedCount,
    setIsActive,
    settings,
    settingsKey,
  );

  useTimerPersistence(
    remainded,
    workState,
    isActive,
    completedCount,
    mode,
    settingsKey,
  );

  useTimerHotkey(toggleTimer);

  return (
    <div>
      <div className="timer__block">
        {formatTime(remainded)}
        <p className="timer__work-state">
          {mode === "pomodoro" ? (workState ? "работа" : "отдых") : "медитация"}
        </p>
      </div>
      <ControlButtons
        isActive={isActive}
        workState={workState}
        onPlayPause={toggleTimer}
        onResetOrSkip={resetTimer}
      />
      <Counter mode={mode} number={completedCount}></Counter>
    </div>
  );
}

export default Timer;
