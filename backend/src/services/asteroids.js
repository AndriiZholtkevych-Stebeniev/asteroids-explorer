import axios from "axios"
import dotenv from "dotenv"

dotenv.config()

const NASA_API_KEY = process.env.NASA_API_KEY
const BASE_URL = "https://api.nasa.gov/neo/rest/v1"

export const fetchFeed = async (start_date, end_date) => {
    const response = await axios.get(`${BASE_URL}/feed`, {
        params: {
            start_date,
            end_date,
            api_key: NASA_API_KEY
        }
    })
    return response.data
}

export const fetchById = async (id) => {
    const response = await axios.get(`${BASE_URL}/neo/${id}`, {
        params: {
            api_key: NASA_API_KEY
        }
    })
    return response.data
}