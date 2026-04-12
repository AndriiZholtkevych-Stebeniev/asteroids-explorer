import { describe, it, expect, vi, beforeEach } from "vitest"
import axios from "axios"
import { fetchFeed, fetchById } from "../../src/services/asteroids.js"

vi.mock("axios")

const FEED_RESPONSE = {
    element_count: 2,
    near_earth_objects: {
        "2024-01-01": [
            { id: "1", name: "(2024 AA)", is_potentially_hazardous_asteroid: false }
        ]
    }
}

const ASTEROID_RESPONSE = {
    id: "3542519",
    name: "(2010 PK9)",
    is_potentially_hazardous_asteroid: true
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("fetchFeed", () => {
    it("calls NASA API with correct params and returns data", async () => {
        axios.get.mockResolvedValue({ data: FEED_RESPONSE })

        const result = await fetchFeed("2024-01-01", "2024-01-07")

        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining("/feed"),
            expect.objectContaining({
                params: expect.objectContaining({
                    start_date: "2024-01-01",
                    end_date: "2024-01-07"
                })
            })
        )
        expect(result).toEqual(FEED_RESPONSE)
    })

    it("propagates axios error", async () => {
        axios.get.mockRejectedValue(new Error("Network error"))

        await expect(fetchFeed("2024-01-01", "2024-01-07")).rejects.toThrow("Network error")
    })
})

describe("fetchById", () => {
    it("calls NASA API with asteroid id and returns data", async () => {
        axios.get.mockResolvedValue({ data: ASTEROID_RESPONSE })

        const result = await fetchById("3542519")

        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining("/3542519"),
            expect.objectContaining({
                params: expect.objectContaining({ api_key: expect.anything() })
            })
        )
        expect(result).toEqual(ASTEROID_RESPONSE)
    })

    it("propagates axios error", async () => {
        axios.get.mockRejectedValue(new Error("Not found"))

        await expect(fetchById("unknown")).rejects.toThrow("Not found")
    })
})
