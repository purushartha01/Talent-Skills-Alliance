
// import { useCallback, useEffect, useRef, useState } from "react";

// export const useTimer = (maxTime = 300) => {
//     const [timeLeft, setTimeLeft] = useState(maxTime);
//     const [duration, setDuration] = useState(maxTime);
//     const [isTimerActive, setIsTimerActive] = useState(false);
//     const timerRef = useRef(null);

//     const tick = useCallback(() => {
//         const elapsedTime = Math.floor((Date.now() - timerRef.current) / 1000);
//         clearInterval(timerRef.current);
//         const remainingTime = duration - elapsedTime;

//         if (remainingTime <= 0) {
//             setTimeLeft(0);
//             setIsTimerActive(false);
//             clearInterval();
//             return;
//         }

//         setTimeLeft(remainingTime);
//         timerRef.current = setInterval(tick, 1000);

//     }, [duration]);



//     const startTimer = useCallback(() => {
//         if (!isTimerActive) return;

//         setIsTimerActive(true);
//         setDuration(maxTime);
//         tick();


//     }, [isTimerActive, maxTime, tick]);


//     const stopTimer = useCallback(() => {
//         clearInterval(timerRef.current);
//         setIsTimerActive(false);
//         setTimeLeft(maxTime);
//     }, [maxTime])

//     const resetTimer = useCallback(() => {
//         clearInterval(timerRef.current);
//         setTimeLeft(maxTime);
//         setIsTimerActive(false);
//     }, [maxTime]);


//     useEffect(() => {
//         return () => {
//             clearInterval(timerRef.current);
//         };
//     }, []);

//     return { timeLeft, startTimer, stopTimer, isTimerActive: isTimerActive.current, setTimeLeft, resetTimer };

// }



import { useCallback, useEffect, useRef, useState } from "react";

export const useTimer = (maxTime = 300) => {
    const [timeLeft, setTimeLeft] = useState(maxTime);
    const [duration, setDuration] = useState(maxTime);
    const [isTimerActive, setIsTimerActive] = useState(false);

    const intervalRef = useRef(null);
    const startTimeRef = useRef(null);

    const clear = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    };



    const tick = useCallback(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const remaining = duration - elapsed;

        if (remaining <= 0) {
            setTimeLeft(0);
            setIsTimerActive(false);
            clear();
            return;
        }

        setTimeLeft(remaining);
    }, [duration]);




    const startTimer = useCallback(() => {
        if (isTimerActive) return;

        clear();

        // console.log("Starting timer with duration:", duration);

        setIsTimerActive(true);

        startTimeRef.current = Date.now();
        tick();
        intervalRef.current = setInterval(tick, 1000);
    }, [isTimerActive, tick]);




    const stopTimer = useCallback(() => {
        clear();
        setIsTimerActive(false);
        setTimeLeft(maxTime);
    }, [maxTime]);

    const resetTimer = useCallback(() => {
        clear();
        setTimeLeft(duration);
        setIsTimerActive(false);
    }, [duration]);



    const setTimeLeftManually = useCallback((newTime) => {
        const safeTime = Math.max(0, Math.floor(newTime));
        clear();
        // console.log("Setting time left manually:", safeTime);
        setTimeLeft(safeTime);
        setDuration(safeTime);

        if (isTimerActive) {
            startTimeRef.current = Date.now();
            tick();
            intervalRef.current = setInterval(() => tick(), 1000);
        }
    }, [isTimerActive, tick]);


    useEffect(() => {
        if (isTimerActive) {
            startTimeRef.current = Date.now();
            tick();
            intervalRef.current = setInterval(() => tick(), 1000);
        }
    }, [duration, isTimerActive, tick]);

    useEffect(() => {
        return () => clear();
    }, []);

    return {
        timeLeft,
        isTimerActive,
        startTimer,
        stopTimer,
        resetTimer,
        setTimeLeft: setTimeLeftManually,
    };
};
