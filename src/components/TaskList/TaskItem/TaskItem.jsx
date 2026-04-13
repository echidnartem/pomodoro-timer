import { useState } from "react";
import "./TaskItem.css"

function TaskItem({
  isCompleted,
  isInitialEditing,
  text,
  onToggle,
  onDelete,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(isInitialEditing || false);
  const [editText, setEditText] = useState(text);

  return (
    <div className="task">
      {isEditing ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            className="task__input"
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.target.blur();
            }}
            onBlur={() => {
              if (!editText) {
                onDelete();
              } else {
                onSave(editText);
                setIsEditing(false);
              }
            }}
          ></input>
        </form>
      ) : (
        <div className="task-static">
          <button
            onClick={onToggle}
            className={`task-static__status-button ${isCompleted ? "task-static__status-button--completed" : ""}`}
          >
            {isCompleted && "✓"}
          </button>
          <span className="task-static__text">{text}</span>
          <div className="task-static__controls">
            <button className="task-static__button" onClick={onDelete}>🗑️</button>
            <button className="task-static__button" onClick={() => setIsEditing(true)}>✏️</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;