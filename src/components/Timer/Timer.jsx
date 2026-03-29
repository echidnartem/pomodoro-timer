import { useState, useEffect, useCallback } from "react";
import useTimer from "../../hooks/useTimer";
import useTimerPersistence from "../../hooks/useTimerPersistence";
import formatTime from "../../utils/formatTime";
import playAlarm from "../../utils/playAlarm";
import getSavedData from "../../utils/getSavedData";
import getMskDate from "../../utils/getMskDate";
import Counter from "../Counter/Counter";
import ControlButtons from "../ControlButtons/ControlButtons";
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

  const [initialData] = useState(() => getInitialTimerData());

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

  return (
    <div>
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
      <Counter number={`Pomodoros: ${completedCount}`}></Counter>
    </div>
  );
}

export default Timer;
