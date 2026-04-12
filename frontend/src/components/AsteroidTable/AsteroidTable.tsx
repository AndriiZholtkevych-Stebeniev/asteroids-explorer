import { useState } from "react"
import type { Asteroid } from "../../types/asteroid"

interface AsteroidTableProps {
    data: Record<string, Asteroid[]> | null
    onSelect: (asteroid: Asteroid) => void
}

type SortKey = "name" | "date" | "distance" | "velocity"
type SortDir = "asc" | "desc"

const AsteroidTable = ({ data, onSelect }: AsteroidTableProps) => {
    const [search, setSearch] = useState("")
    const [sortKey, setSortKey] = useState<SortKey>("date")
    const [sortDir, setSortDir] = useState<SortDir>("asc")

    if (!data) return null

    const allAsteroids = Object.values(data).flat()

    const filtered = allAsteroids.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase())
    )

    const sorted = [...filtered].sort((a, b) => {
        let valA: number | string
        let valB: number | string

        if (sortKey === "name") {
            valA = a.name
            valB = b.name
        } else if (sortKey === "date") {
            valA = a.close_approach_data[0].close_approach_date
            valB = b.close_approach_data[0].close_approach_date
        } else if (sortKey === "distance") {
            valA = parseFloat(a.close_approach_data[0].miss_distance.kilometers)
            valB = parseFloat(b.close_approach_data[0].miss_distance.kilometers)
        } else {
            valA = parseFloat(a.close_approach_data[0].relative_velocity.kilometers_per_hour)
            valB = parseFloat(b.close_approach_data[0].relative_velocity.kilometers_per_hour)
        }

        if (valA < valB) return sortDir === "asc" ? -1 : 1
        if (valA > valB) return sortDir === "asc" ? 1 : -1
        return 0
    })

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(prev => prev === "asc" ? "desc" : "asc")
        } else {
            setSortKey(key)
            setSortDir("asc")
        }
    }

    const SortIcon = ({ col }: { col: SortKey }) => {
        if (sortKey !== col) return <span className="text-gray-600 ml-1">↕</span>
        return <span className="text-blue-400 ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
    }

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:max-w-sm bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                />
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-800">
                <table className="w-full text-white min-w-[560px]">
                    <thead>
                        <tr className="bg-gray-900 text-gray-400 text-left text-sm">
                            <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort("name")}>
                                Name <SortIcon col="name" />
                            </th>
                            <th className="p-3 cursor-pointer hover:text-white" onClick={() => handleSort("date")}>
                                Date <SortIcon col="date" />
                            </th>
                            <th className="p-3 cursor-pointer hover:text-white whitespace-nowrap" onClick={() => handleSort("distance")}>
                                Distance (km) <SortIcon col="distance" />
                            </th>
                            <th className="p-3 cursor-pointer hover:text-white whitespace-nowrap" onClick={() => handleSort("velocity")}>
                                Velocity (km/h) <SortIcon col="velocity" />
                            </th>
                            <th className="p-3">Hazardous</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map(asteroid => (
                            <tr
                                key={asteroid.id}
                                onClick={() => onSelect(asteroid)}
                                className="border-t border-gray-800 hover:bg-gray-900 cursor-pointer transition-colors"
                            >
                                <td className="p-3 font-medium">{asteroid.name}</td>
                                <td className="p-3 text-gray-400 whitespace-nowrap">{asteroid.close_approach_data[0].close_approach_date}</td>
                                <td className="p-3 text-gray-400 whitespace-nowrap">{parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers).toLocaleString()}</td>
                                <td className="p-3 text-gray-400 whitespace-nowrap">{parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()}</td>
                                <td className="p-3">
                                    {asteroid.is_potentially_hazardous_asteroid
                                        ? <span className="bg-red-950 text-red-400 px-2 py-0.5 rounded-full text-xs font-medium">Hazardous</span>
                                        : <span className="bg-green-950 text-green-400 px-2 py-0.5 rounded-full text-xs font-medium">Safe</span>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AsteroidTable