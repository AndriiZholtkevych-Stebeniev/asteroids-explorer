import type { Asteroid } from "../../types/asteroid"

interface AsteroidModalProps {
    asteroid: Asteroid | null
    onClose: () => void
}

const AsteroidModal = ({ asteroid, onClose }: AsteroidModalProps) => {
    if (!asteroid) return null

    const approach = asteroid.close_approach_data[0]
    const diameter = asteroid.estimated_diameter.kilometers

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 text-white p-5 sm:p-6 rounded-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-4">{asteroid.name}</h2>
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-gray-400 text-sm">Close Approach Date</p>
                        <p>{approach.close_approach_date_full}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Miss Distance</p>
                        <p>{parseFloat(approach.miss_distance.kilometers).toLocaleString()} km</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Velocity</p>
                        <p>{parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString()} km/h</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Estimated Diameter</p>
                        <p>{diameter.estimated_diameter_min.toFixed(2)} — {diameter.estimated_diameter_max.toFixed(2)} km</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Potentially Hazardous</p>
                        <p className={asteroid.is_potentially_hazardous_asteroid ? "text-red-500" : "text-green-500"}>
                            {asteroid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                        </p>
                    </div>
                    <a
                        href={asteroid.nasa_jpl_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline mt-2"
                    >
                        View on NASA →
                    </a>
                </div>
            </div>
        </div>
    )
}

export default AsteroidModal