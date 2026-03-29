import "./ControlButtons.css";

function ControlButtons({ isActive, workState, onPlayPause, onResetOrSkip }) {
  return (
    <div className="control-buttons__block">
      <button className="control-button" onClick={onPlayPause}>
        {isActive ? "Пауза" : "Запустить"}
      </button>
      <button className="control-button" onClick={onResetOrSkip}>
        {workState ? "Сбросить" : "Пропустить"}
      </button>
    </div>
  );
}

export default ControlButtons;
