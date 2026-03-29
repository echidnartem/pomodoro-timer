import { useEffect, useState } from "react"

function useTimer(initialTime, onTimerEnd) {
  const [remainded, setRemainded] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && remainded > 0) {
      const startTime = Date.now();
      const initialRemainded = remainded;

      interval = setInterval(() => {
        const nowTime = Date.now();
        const differenceTime = Math.floor((nowTime - startTime) / 1000);

        const nextTime = initialRemainded - differenceTime;

        if (nextTime <= 0) {
          onTimerEnd();
        } else {
          setRemainded(nextTime);
        }
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isActive, onTimerEnd]);

  return { remainded, setRemainded, isActive, setIsActive }
}

export default useTimer;