const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'dist/assets')))

const indexPath = __dirname + '/views/';

app.use(express.static(indexPath))

// Run GST Frontend
app.get('/user', function (req,res) {
    res.sendFile(indexPath + "index.html");
});

// Run GST Admin Panel
app.get("/login", (_req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
})

// Define Routes
const adminRoute = require('./app/routes/admin')
const userRoute = require('./app/routes/user')
app.use('/api', cors(), adminRoute)
app.use('/api', cors(), userRoute)

const port = 8000
app.listen(port, () => {
    console.log(`App is running at port ${port}`)
})