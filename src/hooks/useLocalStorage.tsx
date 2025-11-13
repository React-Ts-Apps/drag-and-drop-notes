import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialState: T) {
    const [state, setState] = useState<T>(() => {
        const saved = localStorage.getItem(key)
        const parsed = saved ? JSON.parse(saved) : []
        return parsed.length ? parsed : initialState
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState] as const
}