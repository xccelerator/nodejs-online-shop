require('dotenv').config()
const express = require('express')
const db = require('./models')
const router = require('./routes/index')


const app = express()
app.use(express.json())
app.use(router)

PORT = process.env.PORT || 8080


db.sequelize.sync().then((req) => {
    console.log("Connected to the MySql server!")
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`)
    })
})