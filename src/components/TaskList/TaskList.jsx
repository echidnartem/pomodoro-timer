import TaskItem from "./TaskItem/TaskItem"
import "./TaskList.css"

function TaskList({ tasks, addTask, clearTasks, onToggle, onDelete, onSave }) {
  return (
    <div>
      <div className="task-list__controls">
        <button className="task-list__button" onClick={addTask}>+</button>
        {tasks.length !== 0 && (<button className="task-list__button" onClick={clearTasks}>-</button>)}
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            isInitialEditing={task.isInitialEditing}
            onToggle={() => onToggle(task.id)}
            onDelete={() => onDelete(task.id)}
            onSave={(newText) => onSave(task.id, newText)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="task-list__empty">Список задач пуст</p>
        )}
      </div>
    </div>
  );
}

export default TaskList;