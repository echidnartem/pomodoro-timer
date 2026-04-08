import { useEffect, useState, useRef } from "react"

function useTimer(initialTime, onTimerEnd) {
  const [remainded, setRemainded] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  const deadlineRef = useRef(null);

  useEffect(() => {
    if (isActive && remainded > 0) {
      if (!deadlineRef.current) {
        deadlineRef.current = Date.now() + remainded * 1000;
      }

      const interval = setInterval(() => {
        const nowTime = Date.now();
        const differenceTime = Math.floor((deadlineRef.current - nowTime) / 1000);

        if (differenceTime <= 0) {
          deadlineRef.current = null;
          onTimerEnd();
        } else {
          setRemainded(differenceTime);
        }
      }, 500);

      return () => clearInterval(interval);
    } else {
      deadlineRef.current = null;
    }
      
  }, [isActive, onTimerEnd]);

  return { remainded, setRemainded, isActive, setIsActive }
}

export default useTimer;