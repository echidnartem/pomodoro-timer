import "./Counter.css";

function Counter({ number }) {
  return (
    <div className="counter__block">
      {number}
    </div>
  )
}

export default Counter;