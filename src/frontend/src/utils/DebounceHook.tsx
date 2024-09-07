import { useEffect, useState } from "react";

export function useDebounce(value: any, timeout: any, callback: any) {
    const [timer, setTimer] = useState(null)

    const clearTimer = () => {
        if (timer)
            clearTimeout(timer)
    }


    useEffect(() => {
        clearTimer()
        // if (timer){
        //     clearTimeout(timer)
        // }
        if (value && callback) {
            const newTimer: any = setTimeout(callback, timeout)
            setTimer(newTimer)
        }

    }, [value])
}