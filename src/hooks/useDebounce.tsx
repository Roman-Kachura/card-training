import {useEffect, useRef} from "react";

export const useDebounce = (func: any, delay: number, cleanUp: boolean = false) => {


    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>();

    function clearTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = undefined;
        }
    }

    useEffect(() => (cleanUp ? clearTimer : undefined),[cleanUp]);

    return (...args: any) => {
        clearTimer();

        timerRef.current = setTimeout(() => func(...args), delay);
    }
};