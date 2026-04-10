import { useState, useEffect, useMemo } from "react"
import { getFeed } from "../api/asteroids"
import type { NeoFeedResponse } from "../types/asteroid"

const useAsteroids = (startDate: string, endDate: string, onlyHazardous: boolean) => {
    const [data, setData] = useState<NeoFeedResponse | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!startDate || !endDate) return

        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = await getFeed(startDate, endDate)
                setData(result)
            } catch (err) {
                setError("Failed to fetch asteroids")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [startDate, endDate])

    const filteredData = useMemo(() => {
        if (!data || !onlyHazardous) return data

        const filtered: typeof data.near_earth_objects = {}
        for (const [date, asteroids] of Object.entries(data.near_earth_objects)) {
            const hazardous = asteroids.filter(a => a.is_potentially_hazardous_asteroid)
            if (hazardous.length > 0) filtered[date] = hazardous
        }

        return { ...data, near_earth_objects: filtered }
    }, [data, onlyHazardous])

    return { data: filteredData, loading, error }
}

export default useAsteroids