import "./ControlButtons.css";

type ControlButtonsProps = {
  isActive: boolean;
  workState: boolean;
  onPlayPause: () => void;
  onResetOrSkip: () => void;
};

function ControlButtons({ isActive, workState, onPlayPause, onResetOrSkip }: ControlButtonsProps) {
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
