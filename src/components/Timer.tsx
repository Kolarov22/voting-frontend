"use client";

import { useEffect } from "react";
import { useTimerContext } from "@/context/TimerContext";

const Timer = ({
  duration,
  id = "default",
  onComplete,
}: {
  duration?: number;
  id?: string;
  onComplete?: () => void;
}) => {
  const { timers, startTimer } = useTimerContext();

  if (duration === undefined) {
    duration = 60;
  }

  const timeLeft = timers[id] !== undefined ? timers[id] : duration;

  useEffect(() => {
    startTimer(id, duration);
  }, [id, duration, startTimer]);

  useEffect(() => {
    if (timeLeft === 0 && onComplete) {
      onComplete();
    }
  }, [timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <div>
      <p>Remaining time: {formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
