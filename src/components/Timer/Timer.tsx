import useTimerSession from "../../hooks/useTimerSession";
import formatTime from "../../utils/formatTime";
import Counter from "../Counter/Counter";
import ControlButtons from "../ControlButtons/ControlButtons";
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
  const { remainingSeconds, isActive, workState, completedCount, toggleTimer, resetTimer } =
    useTimerSession(mode, settings);

  return (
    <div>
      <div className="timer__block">
        {formatTime(remainingSeconds)}
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
