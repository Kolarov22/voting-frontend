"use client";

import { useEffect, useRef } from "react";
import { useTimerContext } from "@/context/TimerContext";

const Timer = ({
  duration,
  address,
  id,
}: {
  duration?: number;
  address?: string;
  id?: string;
  onComplete?: () => void;
}) => {
  const { timers, syncWithElection } = useTimerContext();
  const hasInitialized = useRef(false);
  const initialRequestMadeRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (duration === undefined) {
    duration = 60;
  }

  useEffect(() => {
    if (!address || !id) return;

    const initTimer = async () => {
      if (!initialRequestMadeRef.current) {
        initialRequestMadeRef.current = true;
        await syncWithElection(address);
        hasInitialized.current = true;
      }
    };

    initTimer();

    // Only create interval if it doesn't exist yet
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (timers[id] > 0) {
          syncWithElection(address);
        }
      }, 60000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timeRemaining = timers[id!] || 0;
  const isFinished = timeRemaining <= 0;

  return (
    <div>
      {isFinished ? (
        <div>Election ended</div>
      ) : (
        <div>Time remaining: {formatTime(timeRemaining)}</div>
      )}
    </div>
  );
};

export default Timer;
