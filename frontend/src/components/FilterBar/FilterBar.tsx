import { useState } from "react"

interface FilterBarProps {
    onSearch: (startDate: string, endDate: string, onlyHazardous: boolean) => void
}

const FilterBar = ({ onSearch }: FilterBarProps) => {
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [onlyHazardous, setOnlyHazardous] = useState(false)

    const handleSubmit = () => {
        if (!startDate || !endDate) return
        onSearch(startDate, endDate, onlyHazardous)
    }

    const handleToggle = (checked: boolean) => {
        setOnlyHazardous(checked)
        if (startDate && endDate) {
            onSearch(startDate, endDate, checked)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full px-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end w-full sm:w-auto">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-xs uppercase tracking-widest">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 [color-scheme:dark] w-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-gray-400 text-xs uppercase tracking-widest">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 [color-scheme:dark] w-full"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="sm:mt-5 bg-blue-600 hover:bg-blue-500 transition-all duration-200 text-white font-semibold px-8 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/20"
                >
                    Search
                </button>
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={onlyHazardous}
                        onChange={(e) => handleToggle(e.target.checked)}
                        className="sr-only"
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors duration-200 ${onlyHazardous ? 'bg-red-600' : 'bg-gray-700'}`}></div>
                    <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${onlyHazardous ? 'translate-x-5' : ''}`}></div>
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                    Show only potentially hazardous
                </span>
            </label>
        </div>
    )
}

export default FilterBar