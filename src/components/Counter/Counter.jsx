import "./Counter.css";

function Counter({ mode, number }) {
  return (
    <div className="counter__block">
      {mode === "pomodoro" ? `Pomodoros: ${number}` : "Meditation"}
    </div>
  );
}

export default Counter;
