const express = require("express")
const port = 3000
const app = express()
app.use(express.json())

const users = []


app.get("/users", (request, response) =>{
    return response.json(users)
})