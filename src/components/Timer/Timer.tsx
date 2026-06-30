import { useState, useEffect, useCallback } from "react";
import useTimer from "../../hooks/useTimer";
import useTimerModes from "../../hooks/useTimerModes";
import useTimerPersistence from "../../hooks/useTimerPersistence";
import useTimerHotkey from "../../hooks/useTimerHotkey";
import formatTime from "../../utils/formatTime";
import playAlarm from "../../utils/playAlarm";
import setSavedData from "../../utils/setSavedData";
import getSavedData from "../../utils/getSavedData";
import Counter from "../Counter/Counter";
import ControlButtons from "../ControlButtons/ControlButtons";
import TaskList from "../TaskList/TaskList";
import { getTimerSettingsKey } from "../../constants";
import type {
  TimerMode,
  Task,
  TimerSettings as TimerSettingsValue,
} from "../../types";
import "./Timer.css";

type TimerProps = {
  mode: TimerMode;
  settings: TimerSettingsValue;
};

function Timer({ mode, settings }: TimerProps) {
  const [tasks, setTasks] = useState<Task[]>(() =>
    getSavedData<Task[]>("pomodoro-tasks", []),
  );
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

  const onDelete = useCallback((id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const onToggle = useCallback((id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }, []);

  const onSave = useCallback(
    (id: number, newText: string) => {
      if (newText.trim() === "") {
        onDelete(id);
      } else {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? { ...task, text: newText, isInitialEditing: false }
              : task,
          ),
        );
      }
    },
    [onDelete],
  );

  const addTask = useCallback((text: string) => {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false,
      isInitialEditing: true,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const clearTasks = useCallback(() => {
    setTasks([]);
  }, []);

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

  useEffect(() => {
    setSavedData<Task[]>("pomodoro-tasks", tasks);
  }, [tasks]);

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
      {mode === "pomodoro" && (
        <TaskList
          tasks={tasks}
          addTask={() => addTask("")}
          onDelete={onDelete}
          onToggle={onToggle}
          onSave={onSave}
          clearTasks={clearTasks}
        />
      )}
    </div>
  );
}

export default Timer;
