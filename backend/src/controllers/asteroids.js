import { fetchFeed, fetchById } from "../services/asteroids.js"

export const getFeed = async (req, res) => {
    try {
        const { start_date, end_date } = req.query

        if (!start_date || !end_date) {
            return res.status(400).json({error: "start_date and end_date are required"})
        }

        const data = await fetchFeed(start_date, end_date)
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

export const getById = async (req, res) => {
    try {
        const { id } = req.params

        const data = await fetchById(id)
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: error.message})
    }
}