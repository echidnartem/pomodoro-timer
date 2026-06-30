import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CUSTOM_TIMER_SETTINGS_ID,
  DEFAULT_TIMER_SETTINGS,
  TIMER_PRESETS,
} from "../constants";
import getSavedData from "../utils/getSavedData";
import setSavedData from "../utils/setSavedData";
import type { TimerSettings, CustomTimerSettings } from "../types";

const TIMER_SETTINGS_STORAGE_KEY = "timer-settings";

type UseTimerSettingsResult = {
  settings: TimerSettings;
  presets: TimerSettings[];
  selectedPresetId: string;
  selectPreset: (presetId: string) => void;
  updateCustomSettings: (settings: CustomTimerSettings) => void;
};

function areTimerSettingsEqual(
  firstSettings: TimerSettings,
  secondSettings: TimerSettings,
): boolean {
  return (
    firstSettings.workTime === secondSettings.workTime &&
    firstSettings.breakTime === secondSettings.breakTime &&
    firstSettings.meditationTime === secondSettings.meditationTime
  );
}

function useTimerSettings(): UseTimerSettingsResult {
  const [settings, setSettings] = useState<TimerSettings>(() =>
    getSavedData<TimerSettings>(
      TIMER_SETTINGS_STORAGE_KEY,
      DEFAULT_TIMER_SETTINGS,
    ),
  );

  const selectedPresetId = useMemo(() => {
    const selectedPreset = TIMER_PRESETS.find((preset) =>
      areTimerSettingsEqual(preset, settings),
    );

    return selectedPreset?.id ?? CUSTOM_TIMER_SETTINGS_ID;
  }, [settings]);

  const selectPreset = useCallback((presetId: string) => {
    const selectedPreset = TIMER_PRESETS.find(
      (preset) => preset.id === presetId,
    );

    if (selectedPreset) {
      setSettings(selectedPreset);
    }
  }, []);

  const updateCustomSettings = useCallback(
    (customSettings: CustomTimerSettings) => {
      setSettings({
        id: CUSTOM_TIMER_SETTINGS_ID,
        ...customSettings,
      });
    },
    [],
  );

  useEffect(() => {
    setSavedData<TimerSettings>(TIMER_SETTINGS_STORAGE_KEY, settings);
  }, [settings]);

  return {
    settings,
    presets: TIMER_PRESETS,
    selectedPresetId,
    selectPreset,
    updateCustomSettings,
  };
}

export default useTimerSettings;
