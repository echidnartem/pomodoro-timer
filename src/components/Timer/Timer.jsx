import { useState, useEffect, useCallback } from "react";
import useTimer from "../../hooks/useTimer";
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
  WORK_TIME: 1500,
  BREAK_TIME: 300,
};

function Timer() {
  const getInitialTimerData = () => {
    const saved = getSavedData("pomodoro-data", null);
    const today = getMskDate();

    if (saved && saved.date === today) {
      return saved;
    }

    return {
      remainded: SETTINGS.WORK_TIME,
      workState: true,
      completedCount: 0,
    };
  };

  const onDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const onToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  };

  const onSave = (id, newText) => {
    if (newText.trim() === "") {
      onDelete(id);
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText, isInitialEditing: false } : task,
        ),
      );
    }
  };

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text: text,
      isCompleted: false,
      isInitialEditing: true,
    };
    setTasks([...tasks, newTask]);
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const [initialData] = useState(() => getInitialTimerData());

  const [tasks, setTasks] = useState(() => getSavedData("pomodoro-tasks", []));
  const [workState, setWorkState] = useState(initialData.workState);
  const [completedCount, setCompletedCount] = useState(
    initialData.completedCount,
  );

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
  });

  function resetTimer() {
    setIsActive(false);
    setRemainded(SETTINGS.WORK_TIME);
    setWorkState(true);
  }

  const { remainded, setRemainded, isActive, setIsActive } = useTimer(
    initialData.remainded,
    breakHandler,
  );

  useTimerPersistence(remainded, workState, isActive, completedCount);

  useEffect(() => {
    setSavedData("pomodoro-tasks", tasks);
  }, [tasks]);

  return (
    <div className="timer">
      <div className="timer__block">
        {formatTime(remainded)}
        <p className="timer__work-state">{workState ? "работа" : "отдых"}</p>
      </div>
      <ControlButtons
        isActive={isActive}
        workState={workState}
        onPlayPause={() => setIsActive(!isActive)}
        onResetOrSkip={resetTimer}
      />
      <Counter number={completedCount}></Counter>
      <TaskList 
        tasks={tasks}
        addTask={() => addTask("")}
        onDelete={onDelete}
        onToggle={onToggle}
        onSave={onSave}
        clearTasks={clearTasks}
      />
    </div>
  );
}

export default Timer;
