import type { NeoFeedResponse } from "../../types/asteroid"

interface SummaryCardsProps {
    data: NeoFeedResponse | null
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
    if (!data) return null

    const allAsteroids = Object.values(data.near_earth_objects).flat()
    const hazardousCount = allAsteroids.filter(a => a.is_potentially_hazardous_asteroid).length
    const closest = allAsteroids.reduce((prev, curr) => {
        const prevDist = parseFloat(prev.close_approach_data[0].miss_distance.kilometers)
        const currDist = parseFloat(curr.close_approach_data[0].miss_distance.kilometers)
        return currDist < prevDist ? curr : prev
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
            <div className="bg-gray-800 text-white p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Asteroids</p>
                <p className="text-3xl font-bold">{data.element_count}</p>
            </div>
            <div className="bg-red-900 text-white p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Potentially Hazardous</p>
                <p className="text-3xl font-bold">{hazardousCount}</p>
            </div>
            <div className="bg-gray-800 text-white p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Closest to Earth</p>
                <p className="text-xl font-bold break-words">{closest.name}</p>
            </div>
        </div>
    )
}

export default SummaryCards