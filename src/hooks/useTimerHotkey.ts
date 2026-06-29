import { useEffect } from "react";

function isEditableText(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLElement && target.isContentEditable)
  );
}

function useTimerHotkey(onToggle: () => void): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;
      if (isEditableText(event.target)) return;

      if (event.key === "MediaPlayPause" || event.code === "MediaPlayPause") {
        event.preventDefault();
        onToggle();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onToggle]);
}

export default useTimerHotkey;
