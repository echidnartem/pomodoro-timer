import Timer from "../components/Timer/Timer";
import { getTimerSettingsKey } from "../constants";
import type { TimerSettings } from "../types";

export default function MeditationPage({ settings }: { settings: TimerSettings }) {
  return <Timer key={getTimerSettingsKey(settings)} mode="meditation" settings={settings} />;
}
