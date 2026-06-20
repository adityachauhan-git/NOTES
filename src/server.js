import express from "express"
import "dotenv/config"
import cors from "cors"

import route from "./modules/notes/routes.js"

const PORT = process.env.PORT||8080

const app = express()

app.use(express.json())
app.use(cors())
app.use(route)

app.listen(PORT , ()=>{
    console.log("Server Started")
})
console.log(process.env.DATABASE_URL);