import type { TimerMode } from "../types";

export const STORAGE_KEYS = {
  theme: "theme",
  mode: "mode",
  tasks: "pomodoro-tasks",
  timerSettings: "timer-settings",
} as const;

export function getTimerSessionStorageKey(mode: TimerMode): string {
  return `${mode}-data`;
}
