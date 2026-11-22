import { useEffect, useState } from "react";
import type { Task } from "../types";
import getSavedData from "../utils/getSavedData";
import setSavedData from "../utils/setSavedData";

const TASKS_STORAGE_KEY = "pomodoro-tasks";

export default function useTasks() {
  const [tasks, setTasks] = useState(() => getSavedData<Task[]>(TASKS_STORAGE_KEY, []));

  useEffect(() => {
    setSavedData(TASKS_STORAGE_KEY, tasks);
  }, [tasks]);

  function addTask() {
    const task: Task = {
      id: Date.now(),
      text: "",
      isCompleted: false,
      isInitialEditing: true,
    };
    setTasks((previous) => [...previous, task]);
  }

  function deleteTask(id: number) {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  }

  function saveTask(id: number, text: string) {
    if (text.trim() === "") {
      deleteTask(id);
      return;
    }

    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, text, isInitialEditing: false } : task,
      ),
    );
  }

  function toggleTask(id: number) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  function clearTasks() {
    setTasks([]);
  }

  return { tasks, addTask, saveTask, toggleTask, deleteTask, clearTasks };
}
