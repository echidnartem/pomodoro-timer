import "./Counter.css";

function Counter({ number }) {
  return <div className="counter__block">{`Pomodoros: ${number}`}</div>;
}

export default Counter;
