import { useState, useEffect, useCallback } from "react";
import useTimer from "../hooks/useTimer";
import formatTime from "../utils/formatTime";
import playAlarm from "../utils/playAlarm";
import getSavedData from "../utils/getSavedData"
import setSavedData from "../utils/setSavedData";
import getMskDate from "../utils/getMskDate";
import Counter from "./Counter";
import "./Timer.css";

const SETTINGS = {
  WORK_TIME: 1500,
  BREAK_TIME: 300,
}

function Timer() {
  const getInitialTimerData = () => {
    const saved = getSavedData("pomodoro-data", null);
    const today = getMskDate();
    
    if (saved && saved.date === today) {
      return saved;
    }

    return { remainded: SETTINGS.WORK_TIME, workState: true, completedCount: 0 };
  };

  const breakHandler = useCallback(() => {
    playAlarm();
    setIsActive(false);

    if (workState) {
      setCompletedCount(prev => prev + 1);
    }

    setWorkState((previousState) => {
      const nextState = !previousState;
      setRemainded(nextState ? SETTINGS.WORK_TIME : SETTINGS.BREAK_TIME);
      return nextState;
    });
  })

  function resetTimer() {
    setIsActive(false);
    setRemainded(SETTINGS.WORK_TIME);
    setWorkState(true);
  }

  const [initialData] = useState(() => getInitialTimerData());

  const [workState, setWorkState] = useState(initialData.workState);
  const [completedCount, setCompletedCount] = useState(initialData.completedCount);

  const { remainded, setRemainded, isActive, setIsActive } = useTimer(initialData.remainded, breakHandler);

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

  return (
    <div>
      <div className="timer__block">
        {formatTime(remainded)}
        <p className="timer__work-state">{workState ? "работа" : "отдых"}</p>
      </div>
      <div className="control-buttons__block">
        <button
          className="control-button"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? "Пауза" : "Запустить"}
        </button>
        <button
          className="control-button"
          onClick={() => {
            resetTimer();
          }}
        >
          {workState ? "Сбросить" : "Пропустить"}
        </button>
      </div>
      <Counter number={`Pomodoros: ${completedCount}`}></Counter>
    </div>
  );
}

export default Timer;
