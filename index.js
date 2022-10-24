require('dotenv').config()
const express = require('express')
const db = require('./models')
const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(express.json())


PORT = process.env.PORT || 8080

app.post('/', (req, res) => {
    res.send("Hello World!")
})

app.use(authRoutes)

db.sequelize.sync().then((req) => {
    console.log("Connected to the MySql server!")
    app.listen(PORT, () => {
        console.log(`listening on: http://localhost:${PORT}`)
    })
})