import { describe, it, expect, vi, beforeEach } from "vitest"
import request from "supertest"
import app from "../../src/server.js"

vi.mock("../../src/services/asteroids.js", () => ({
    fetchFeed: vi.fn(),
    fetchById: vi.fn()
}))

import { fetchFeed, fetchById } from "../../src/services/asteroids.js"

const FEED_DATA = {
    element_count: 3,
    near_earth_objects: {
        "2024-01-01": [
            {
                id: "1",
                name: "(2024 AA)",
                is_potentially_hazardous_asteroid: false,
                close_approach_data: []
            }
        ]
    }
}

const ASTEROID_DATA = {
    id: "3542519",
    name: "(2010 PK9)",
    is_potentially_hazardous_asteroid: true
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("GET /api/asteroids/feed", () => {
    it("returns 400 when query params are missing", async () => {
        const res = await request(app).get("/api/asteroids/feed")

        expect(res.status).toBe(400)
        expect(res.body).toEqual({ error: "start_date and end_date are required" })
    })

    it("returns 400 when only start_date is provided", async () => {
        const res = await request(app)
            .get("/api/asteroids/feed")
            .query({ start_date: "2024-01-01" })

        expect(res.status).toBe(400)
        expect(res.body.error).toBeDefined()
    })

    it("returns 400 when only end_date is provided", async () => {
        const res = await request(app)
            .get("/api/asteroids/feed")
            .query({ end_date: "2024-01-07" })

        expect(res.status).toBe(400)
        expect(res.body.error).toBeDefined()
    })

    it("returns 200 with data when both dates are provided", async () => {
        fetchFeed.mockResolvedValue(FEED_DATA)

        const res = await request(app)
            .get("/api/asteroids/feed")
            .query({ start_date: "2024-01-01", end_date: "2024-01-07" })

        expect(res.status).toBe(200)
        expect(res.body).toEqual(FEED_DATA)
        expect(fetchFeed).toHaveBeenCalledWith("2024-01-01", "2024-01-07")
    })

    it("returns 500 when service throws", async () => {
        fetchFeed.mockRejectedValue(new Error("Upstream failure"))

        const res = await request(app)
            .get("/api/asteroids/feed")
            .query({ start_date: "2024-01-01", end_date: "2024-01-07" })

        expect(res.status).toBe(500)
        expect(res.body).toEqual({ error: "Upstream failure" })
    })

    it("responds with JSON content-type", async () => {
        fetchFeed.mockResolvedValue(FEED_DATA)

        const res = await request(app)
            .get("/api/asteroids/feed")
            .query({ start_date: "2024-01-01", end_date: "2024-01-07" })

        expect(res.headers["content-type"]).toMatch(/application\/json/)
    })
})

describe("GET /api/asteroids/:id", () => {
    it("returns asteroid data by id", async () => {
        fetchById.mockResolvedValue(ASTEROID_DATA)

        const res = await request(app).get("/api/asteroids/3542519")

        expect(res.status).toBe(200)
        expect(res.body).toEqual(ASTEROID_DATA)
        expect(fetchById).toHaveBeenCalledWith("3542519")
    })

    it("returns 500 when service throws", async () => {
        fetchById.mockRejectedValue(new Error("Not found"))

        const res = await request(app).get("/api/asteroids/invalid-id")

        expect(res.status).toBe(500)
        expect(res.body).toEqual({ error: "Not found" })
    })

    it("passes the exact id from the URL to the service", async () => {
        fetchById.mockResolvedValue(ASTEROID_DATA)

        await request(app).get("/api/asteroids/9999999")

        expect(fetchById).toHaveBeenCalledWith("9999999")
    })
})
