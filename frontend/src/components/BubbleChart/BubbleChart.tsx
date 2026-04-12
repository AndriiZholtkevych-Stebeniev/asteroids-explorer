import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { Asteroid } from "../../types/asteroid"

interface BubbleChartProps {
    data: Record<string, Asteroid[]> | null
}

interface ChartPoint {
    name: string
    date: string
    velocity: number
    diameter: number
    hazardous: boolean
}

const BubbleChart = ({ data }: BubbleChartProps) => {
    if (!data) return null

    const points: ChartPoint[] = Object.values(data).flat().map(asteroid => ({
        name: asteroid.name,
        date: asteroid.close_approach_data[0].close_approach_date,
        velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour),
        diameter: asteroid.estimated_diameter.kilometers.estimated_diameter_max * 1000,
        hazardous: asteroid.is_potentially_hazardous_asteroid
    }))

    return (
        <div className="p-4">
            <h2 className="text-white text-xl font-bold mb-4">Asteroid Velocity vs Date</h2>
            <div className="h-[260px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                    <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis dataKey="velocity" stroke="#9ca3af" name="Velocity (km/h)" />
                    <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ payload }) => {
                            if (!payload?.length) return null
                            const d = payload[0].payload as ChartPoint
                            return (
                                <div className="bg-gray-800 text-white p-2 rounded text-sm">
                                    <p>{d.name}</p>
                                    <p>Velocity: {d.velocity.toLocaleString()} km/h</p>
                                    <p>Date: {d.date}</p>
                                </div>
                            )
                        }}
                    />
                    <Scatter data={points} >
                        {points.map((point, index) => (
                            <Cell
                                key={index}
                                fill={point.hazardous ? "#ef4444" : "#3b82f6"}
                            />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
            </div>
        </div>
    )
}

export default BubbleChart