import express from "express"
import cors from "cors"
import asteroidsRouter from "./routes/asteroids.js"

const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use("/api/asteroids", asteroidsRouter)

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

export default app
