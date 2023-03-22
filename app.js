const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", '*')
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//     next()
// })

// const reactBuildPath = path.join(__dirname, 'build')
// app.use(express.static(reactBuildPath))

// app.get("*", (req, res) => {
//     res.sendFile(reactBuildPath)
// })

// Define Routes
const adminRoute = require('./app/routes/admin')
const userRoute = require('./app/routes/user')
app.use('/api', cors(), adminRoute)
app.use('/api', cors(), userRoute)

const port = 8000
app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})