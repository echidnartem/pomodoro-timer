import TaskItem from "./TaskItem/TaskItem";
import { Plus, Trash2 } from "lucide-react";
import useTasks from "../../hooks/useTasks";
import "./TaskList.css";

function TaskList() {
  const { tasks, addTask, saveTask, toggleTask, deleteTask, clearTasks } = useTasks();

  return (
    <section className="task-section">
      <div className="task-section__header">
        <h2 className="task-section__title">Задачи</h2>
        <div className="task-list__controls">
          {tasks.length !== 0 && (
            <button
              className="task-list__button"
              onClick={clearTasks}
              title="Очистить задачи"
            >
              <Trash2 />
            </button>
          )}
          <button
            className="task-list__button"
            onClick={addTask}
            title="Добавить задачу"
          >
            <Plus />
          </button>
        </div>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            text={task.text}
            isCompleted={task.isCompleted}
            isInitialEditing={task.isInitialEditing}
            onToggle={() => toggleTask(task.id)}
            onDelete={() => deleteTask(task.id)}
            onSave={(newText) => saveTask(task.id, newText)}
          />
        ))}
        {tasks.length === 0 && (
          <p className="task-list__empty">Список задач пуст</p>
        )}
      </div>
    </section>
  );
}

export default TaskList;
