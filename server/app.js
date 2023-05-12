// imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 500

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))

//routes prefix
app.use('/', require("./routes/routes"))

//start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
