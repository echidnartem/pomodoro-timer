import { CUSTOM_TIMER_SETTINGS_ID } from "../../constants";
import type {
  TimerSettings as TimerSettingsValue,
  CustomTimerSettings,
} from "../../types";
import "./Timer.css";

type TimerSettingsProps = {
  settings: TimerSettingsValue;
  presets: TimerSettingsValue[];
  selectedPresetId: string;
  onSelectPreset: (presetId: string) => void;
  onChangeCustomSettings: (settings: CustomTimerSettings) => void;
};

const SETTING_FIELDS: Array<{
  key: keyof CustomTimerSettings;
  label: string;
}> = [
  { key: "workTime", label: "Работа" },
  { key: "breakTime", label: "Отдых" },
  { key: "meditationTime", label: "Медитация" },
];

function toMinutes(seconds: number): number {
  return Math.round(seconds / 60);
}

function toSeconds(minutes: number): number {
  return Math.max(1, Math.round(minutes)) * 60;
}

function getPresetLabel(settings: TimerSettingsValue): string {
  return `${toMinutes(settings.workTime)} / ${toMinutes(settings.breakTime)}`;
}

function TimerSettings({
  settings,
  presets,
  selectedPresetId,
  onSelectPreset,
  onChangeCustomSettings,
}: TimerSettingsProps) {
  const changeCustomSetting = (
    settingKey: keyof CustomTimerSettings,
    value: string,
  ) => {
    const minutes = Number(value);

    if (!Number.isFinite(minutes)) return;

    onChangeCustomSettings({
      workTime: settings.workTime,
      breakTime: settings.breakTime,
      meditationTime: settings.meditationTime,
      [settingKey]: toSeconds(minutes),
    });
  };

  return (
    <section className="timer-settings">
      <div className="timer-settings__presets">
        {presets.map((preset) => (
          <button
            key={preset.id}
            className="timer-settings__preset"
            type="button"
            onClick={() => onSelectPreset(preset.id)}
            data-selected={selectedPresetId === preset.id}
          >
            {getPresetLabel(preset)}
          </button>
        ))}
      </div>
      <div
        className="timer-settings__custom"
        data-active={selectedPresetId === CUSTOM_TIMER_SETTINGS_ID}
      >
        {SETTING_FIELDS.map((field) => (
          <label className="timer-settings__field" key={field.key}>
            <span>{field.label}</span>
            <input
              className="timer-settings__input"
              type="number"
              min="1"
              step="1"
              value={toMinutes(settings[field.key])}
              onChange={(event) =>
                changeCustomSetting(field.key, event.currentTarget.value)
              }
            />
          </label>
        ))}
      </div>
    </section>
  );
}

export default TimerSettings;
