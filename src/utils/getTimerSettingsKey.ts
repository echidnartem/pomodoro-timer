import type { TimerSettings } from "../types";

export default function getTimerSettingsKey(settings: TimerSettings): string {
  return `${settings.id}:${settings.workTime}:${settings.breakTime}:${settings.meditationTime}`;
}
