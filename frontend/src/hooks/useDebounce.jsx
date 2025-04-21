import { useEffect, useState } from "react";

export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const [isDebouncing, setIsDebouncing] = useState(false);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setIsDebouncing(false);
        }, delay);

        return () => {
            clearTimeout(handler);
            setIsDebouncing(true);
        };
    }, [value, delay]);

    return { debouncedValue, isDebouncing };
}
