import type { TimerMode } from "../../types";
import "./Counter.css";

type CounterProps = {
  mode: TimerMode;
  number: number;
};

function Counter({ mode, number }: CounterProps) {
  return (
    <div className="counter__block">
      {mode === "pomodoro" ? `Pomodoros: ${number}` : "Meditation"}
    </div>
  );
}

export default Counter;
