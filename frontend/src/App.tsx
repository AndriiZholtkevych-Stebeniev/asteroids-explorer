import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import useAsteroids from "./hooks/useAsteroids"
import FilterBar from "./components/FilterBar/FilterBar"
import SummaryCards from "./components/SummaryCards/SummaryCards"
import BubbleChart from "./components/BubbleChart/BubbleChart"
import AsteroidTable from "./components/AsteroidTable/AsteroidTable"
import AsteroidModal from "./components/AsteroidModal/AsteroidModal"
import type { Asteroid } from "./types/asteroid"

function App() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null)

    const startDate = searchParams.get("start") || ""
    const endDate = searchParams.get("end") || ""
    const onlyHazardous = searchParams.get("hazardous") === "true"

    const { data, loading, error } = useAsteroids(startDate, endDate, onlyHazardous)

    const handleSearch = (start: string, end: string, hazardous: boolean) => {
        setSearchParams({ start, end, hazardous: String(hazardous) })
    }

    return (
        <div className="min-h-screen text-white flex flex-col" style={{
            backgroundImage: `radial-gradient(ellipse at top, #0f172a 0%, #020617 100%)`,
            backgroundAttachment: "fixed"
        }}>
            <div className="max-w-7xl mx-auto px-4 w-full flex flex-col flex-1">
                <div className={`flex flex-col items-center justify-center ${data ? 'py-8 sm:py-12' : 'min-h-screen'}`}>
                    <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2">NASA NeoWs API</p>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 text-center px-4">Asteroid Tracker</h1>
                    <p className="text-gray-400 mt-3 text-base sm:text-lg mb-8 text-center px-4">Track near-Earth objects and potential hazards</p>
                    <FilterBar onSearch={handleSearch} />
                    {loading && (
                        <div className="text-center mt-8">
                            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-400 mt-4">Fetching asteroid data...</p>
                        </div>
                    )}
                    {error && (
                        <div className="max-w-md mt-8 bg-red-950 border border-red-800 text-red-400 px-6 py-4 rounded-lg text-center">
                            {error}
                        </div>
                    )}
                </div>
                {data && (
                    <>
                        <SummaryCards data={data} />
                        <BubbleChart data={data.near_earth_objects} />
                        <AsteroidTable
                            data={data.near_earth_objects}
                            onSelect={setSelectedAsteroid}
                        />
                    </>
                )}
                <AsteroidModal
                    asteroid={selectedAsteroid}
                    onClose={() => setSelectedAsteroid(null)}
                />
            </div>
        </div>
    )
}

export default App