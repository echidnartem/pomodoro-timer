import TaskList from "../components/TaskList/TaskList";
import Timer from "../components/Timer/Timer";
import getTimerSettingsKey from "../utils/getTimerSettingsKey";
import type { TimerSettings } from "../types";

export default function PomodoroPage({ settings }: { settings: TimerSettings }) {
  return (
    <>
      <Timer key={getTimerSettingsKey(settings)} mode="pomodoro" settings={settings} />
      <TaskList />
    </>
  );
}
