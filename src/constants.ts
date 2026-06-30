import type { TimerSettings } from "./types";

export const CUSTOM_TIMER_SETTINGS_ID = "custom";

export const TIMER_PRESETS: TimerSettings[] = [
  {
    id: "classic",
    workTime: 25 * 60,
    breakTime: 5 * 60,
    meditationTime: 10 * 60,
  },
  {
    id: "long",
    workTime: 45 * 60,
    breakTime: 10 * 60,
    meditationTime: 10 * 60,
  },
  {
    id: "flow",
    workTime: 52 * 60,
    breakTime: 17 * 60,
    meditationTime: 10 * 60,
  },
];

export const DEFAULT_TIMER_SETTINGS = TIMER_PRESETS[0];

export function getTimerSettingsKey(settings: TimerSettings): string {
  return `${settings.id}:${settings.workTime}:${settings.breakTime}:${settings.meditationTime}`;
}
