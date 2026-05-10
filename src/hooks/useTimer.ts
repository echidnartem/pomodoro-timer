import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type UseTimerResult = {
  remainded: number;
  setRemainded: Dispatch<SetStateAction<number>>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

function useTimer(initialTime: number): UseTimerResult {
  const [remainded, setRemainded] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || remainded <= 0) {
      deadlineRef.current = null;
      return;
    }

    if (deadlineRef.current === null) {
      deadlineRef.current = Date.now() + remainded * 1000;
    }

    const interval = window.setInterval(() => {
      if (deadlineRef.current === null) return;

      const nowTime = Date.now();
      const differenceTime = Math.floor(
        (deadlineRef.current - nowTime) / 1000,
      );

      setRemainded(Math.max(differenceTime, 0));
    }, 500);

    return () => window.clearInterval(interval);
  }, [isActive]);

  return { remainded, setRemainded, isActive, setIsActive };
}

export default useTimer;