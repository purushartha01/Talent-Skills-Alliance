import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { Progress } from "../ui/progress";

const Timer = forwardRef(({ maxTime = 60 }, ref) => {
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [isActive, setIsActive] = useState(false);

  const progress = (timeLeft / maxTime) * 100;

  // Start interval when active
  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Expose functions to parent
  useImperativeHandle(ref, () => ({
    startTimer: () => {
      setTimeLeft(maxTime);
      setIsActive(true);
    },
    resetTimer: () => {
      setTimeLeft(maxTime);
      setIsActive(false);
    },
    stopTimer: () => {
      setIsActive(false);
    },
    isRunning: () => isActive,
    getTime: () => timeLeft,
  }));

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Progress value={progress} className="w-3/4" />
      <div className="text-sm font-semibold">
        {isActive || timeLeft > 0 ? (
          `${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`
        ) : (
          "Expired"
        )}
      </div>
    </div>
  );
});

Timer.displayName = "Timer";

export default Timer;
