import { useState, useEffect, useCallback } from "react";
import useTimer from "../../hooks/useTimer";
import useTimerModes from "../../hooks/useTimerModes";
import useTimerPersistence from "../../hooks/useTimerPersistence";
import formatTime from "../../utils/formatTime";
import playAlarm from "../../utils/playAlarm";
import setSavedData from "../../utils/setSavedData";
import getSavedData from "../../utils/getSavedData";
import getMskDate from "../../utils/getMskDate";
import Counter from "../Counter/Counter";
import ControlButtons from "../ControlButtons/ControlButtons";
import TaskList from "../TaskList/TaskList";
import "./Timer.css";

const SETTINGS = {
  WORK_TIME: 25 * 60,
  BREAK_TIME: 5 * 60,
  MEDITATION_TIME: 10 * 60,
};

function Timer({ mode }) {
  const onDelete = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }, []);

  const onSave = useCallback(
    (id, newText) => {
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

  const addTask = useCallback((text) => {
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

  const [tasks, setTasks] = useState(() => getSavedData("pomodoro-tasks", []));
  const [workState, setWorkState] = useState(true);
  const [completedCount, setCompletedCount] = useState(0);

  const breakHandler = useCallback(() => {
    playAlarm();
    setIsActive(false);

    if (workState) {
      setCompletedCount((prev) => prev + 1);
    }

    setWorkState((previousState) => {
      const nextState = !previousState;
      setRemainded(nextState ? SETTINGS.WORK_TIME : SETTINGS.BREAK_TIME);
      return nextState;
    });
  }, [workState]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setRemainded(
      mode === "pomodoro" ? SETTINGS.WORK_TIME : SETTINGS.MEDITATION_TIME,
    );
    setWorkState(true);
  }, [mode]);

  const { remainded, setRemainded, isActive, setIsActive } = useTimer(
    0,
    breakHandler,
  );

  useTimerModes(
    mode,
    setRemainded,
    setWorkState,
    setCompletedCount,
    setIsActive,
    SETTINGS,
  );

  useTimerPersistence(remainded, workState, isActive, completedCount, mode);

  useEffect(() => {
    setSavedData("pomodoro-tasks", tasks);
  }, [tasks]);

  return (
    <div className="timer">
      <div className="timer__block">
        {formatTime(remainded)}
        <p className="timer__work-state">
          {mode === "pomodoro" ? (workState ? "работа" : "отдых") : "медитация"}
        </p>
      </div>
      <ControlButtons
        isActive={isActive}
        workState={workState}
        onPlayPause={() => setIsActive(!isActive)}
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
