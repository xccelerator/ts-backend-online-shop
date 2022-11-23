import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { Socket } from "./utils/socketEvents"
import { routes } from "./routes/indexRoutes"
import { AppDataSource } from "./database/dbConnectios"
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 5000

const server = createServer(app)

new Socket(new Server(server)).socketEvents()

AppDataSource.initialize().then(async () => {
    console.log("Database successfully connected!")

    server.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`)
    })
})

