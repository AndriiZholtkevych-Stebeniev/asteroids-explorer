import express from "express"
import { getFeed, getById } from "../controllers/asteroids.js"

const asteroidsRouter = express.Router();

asteroidsRouter.get("/feed", getFeed);

asteroidsRouter.get("/:id", getById)

export default asteroidsRouter