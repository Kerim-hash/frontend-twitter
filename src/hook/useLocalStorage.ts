import { useState, useEffect } from "react"

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
    const JsonVal = localStorage.getItem(key)
    if(JsonVal ===null ) return JSON.parse(JsonVal)
    return initialValue
    })
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])
    return [value, setValue]
}