export type Theme = "light" | "dark";

export type TimerMode = "pomodoro" | "meditation";

export type TimerSettings = {
  WORK_TIME: number;
  BREAK_TIME: number;
  MEDITATION_TIME: number;
};

export type TimerData = {
  remainded: number;
  workState: boolean;
  date: string;
  completedCount: number;
};

export type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
  isInitialEditing: boolean;
};
