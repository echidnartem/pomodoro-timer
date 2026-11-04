import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CUSTOM_TIMER_SETTINGS_ID,
  DEFAULT_TIMER_SETTINGS,
  MAX_TIMER_MINUTES,
  TIMER_PRESETS,
} from "../constants";
import getSavedData from "../utils/getSavedData";
import setSavedData from "../utils/setSavedData";
import type { TimerSettings, CustomTimerSettings } from "../types";

const TIMER_SETTINGS_STORAGE_KEY = "timer-settings";
const MIN_TIMER_SECONDS = 60;
const MAX_TIMER_SECONDS = MAX_TIMER_MINUTES * 60;

function clampSettings(settings: TimerSettings): TimerSettings {
  const clampDuration = (seconds: number) =>
    Math.min(MAX_TIMER_SECONDS, Math.max(MIN_TIMER_SECONDS, seconds));

  return {
    ...settings,
    workTime: clampDuration(settings.workTime),
    breakTime: clampDuration(settings.breakTime),
    meditationTime: clampDuration(settings.meditationTime),
  };
}

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
  const [settings, setSettings] = useState<TimerSettings>(() => {
    const savedSettings = getSavedData<TimerSettings>(
      TIMER_SETTINGS_STORAGE_KEY,
      DEFAULT_TIMER_SETTINGS,
    );
    return clampSettings(savedSettings);
  });

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
      setSettings(
        clampSettings({
          id: CUSTOM_TIMER_SETTINGS_ID,
          ...customSettings,
        }),
      );
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
