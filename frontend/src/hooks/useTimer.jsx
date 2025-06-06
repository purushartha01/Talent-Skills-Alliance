
import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (maxTime = 300) => {
    const totalDurationRef = useRef(maxTime);
    const startTimeRef = useRef(null);
    const intervalRef = useRef(null);


    const [timeRemaining, setTimeRemaining] = useState(totalDurationRef.current);
    const [isTimerRunning, setIsTimerRunning] = useState(false);


    const tickSecond = useCallback(() => {
        const currentTimer = Date.now();
        const elapsedTime = Math.floor((currentTimer - startTimeRef.current) / 1000);
        const remainingTime = Math.max(0, totalDurationRef.current - elapsedTime);

        setTimeRemaining(remainingTime);

        if (remainingTime <= 0) {
            setIsTimerRunning(false);
            clearInterval(intervalRef.current);
            return;
        }

        if (remainingTime === 0) {
            clearInterval(intervalRef.current);
            setIsTimerRunning(false);
            return;
        }

    }, []);


    const startTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        setIsTimerRunning(true);

        startTimeRef.current = Date.now();

        setIsTimerRunning(true);
        setTimeRemaining(totalDurationRef.current);

        intervalRef.current = setInterval(tickSecond, 1000);

    }, [tickSecond]);



    const resetTimer = useCallback(() => {
        clearInterval(intervalRef.current);
        totalDurationRef.current = maxTime;
        setIsTimerRunning(false);
        setTimeRemaining(totalDurationRef.current);
    }, [maxTime]);



    const setTotalDurationManually = useCallback((newTime) => {
        const safeToHandleTime = Math.max(0, Math.floor(newTime));

        clearInterval(intervalRef.current);
        setIsTimerRunning(false);
        setTimeRemaining(safeToHandleTime);
        totalDurationRef.current = safeToHandleTime;
        console.log("Setting time left manually:", totalDurationRef.current);
    }, []);



    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, [])


    return {
        timeRemaining, isTimerRunning, startTimer, resetTimer, setTotalDurationManually
    }
};