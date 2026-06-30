export type Theme = "light" | "dark";

export type TimerMode = "pomodoro" | "meditation";

export type TimerSettings = {
  id: string;
  workTime: number;
  breakTime: number;
  meditationTime: number;
};

export type CustomTimerSettings = Omit<TimerSettings, "id">;

export type TimerData = {
  remainded: number;
  workState: boolean;
  date: string;
  completedCount: number;
  settingsKey: string;
};

export type Task = {
  id: number;
  text: string;
  isCompleted: boolean;
  isInitialEditing: boolean;
};
