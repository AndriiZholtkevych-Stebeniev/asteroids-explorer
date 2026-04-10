import axios from "axios"
import type { NeoFeedResponse, Asteroid } from "../types/asteroid"

const BASE_URL = "http://localhost:3000/api/asteroids"

export const getFeed = async (start_date: string, end_date: string): Promise<NeoFeedResponse> => {
    const response = await axios.get(`${BASE_URL}/feed`, {
        params: { start_date, end_date }
    })
    return response.data
}

export const getById = async (id: string): Promise<Asteroid> => {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
}