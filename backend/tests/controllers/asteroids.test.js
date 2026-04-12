import { describe, it, expect, vi, beforeEach } from "vitest"
import { getFeed, getById } from "../../src/controllers/asteroids.js"

vi.mock("../../src/services/asteroids.js", () => ({
    fetchFeed: vi.fn(),
    fetchById: vi.fn()
}))

import { fetchFeed, fetchById } from "../../src/services/asteroids.js"

const mockRes = () => {
    const res = {}
    res.status = vi.fn().mockReturnValue(res)
    res.json = vi.fn().mockReturnValue(res)
    return res
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("getFeed", () => {
    it("returns 400 when start_date is missing", async () => {
        const req = { query: { end_date: "2024-01-07" } }
        const res = mockRes()

        await getFeed(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "start_date and end_date are required" })
    })

    it("returns 400 when end_date is missing", async () => {
        const req = { query: { start_date: "2024-01-01" } }
        const res = mockRes()

        await getFeed(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({ error: "start_date and end_date are required" })
    })

    it("returns 400 when both dates are missing", async () => {
        const req = { query: {} }
        const res = mockRes()

        await getFeed(req, res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(fetchFeed).not.toHaveBeenCalled()
    })

    it("returns data from service on success", async () => {
        const fakeData = { element_count: 5, near_earth_objects: {} }
        fetchFeed.mockResolvedValue(fakeData)

        const req = { query: { start_date: "2024-01-01", end_date: "2024-01-07" } }
        const res = mockRes()

        await getFeed(req, res)

        expect(fetchFeed).toHaveBeenCalledWith("2024-01-01", "2024-01-07")
        expect(res.json).toHaveBeenCalledWith(fakeData)
        expect(res.status).not.toHaveBeenCalled()
    })

    it("returns 500 when service throws", async () => {
        fetchFeed.mockRejectedValue(new Error("NASA API down"))

        const req = { query: { start_date: "2024-01-01", end_date: "2024-01-07" } }
        const res = mockRes()

        await getFeed(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "NASA API down" })
    })
})

describe("getById", () => {
    it("returns asteroid data from service", async () => {
        const fakeAsteroid = { id: "3542519", name: "(2010 PK9)" }
        fetchById.mockResolvedValue(fakeAsteroid)

        const req = { params: { id: "3542519" } }
        const res = mockRes()

        await getById(req, res)

        expect(fetchById).toHaveBeenCalledWith("3542519")
        expect(res.json).toHaveBeenCalledWith(fakeAsteroid)
    })

    it("returns 500 when service throws", async () => {
        fetchById.mockRejectedValue(new Error("Asteroid not found"))

        const req = { params: { id: "invalid" } }
        const res = mockRes()

        await getById(req, res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({ error: "Asteroid not found" })
    })
})
