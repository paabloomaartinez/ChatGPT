// imports
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongojs = require('mongojs')
const db = mongojs('mongodb://mongo:27017/hads_app_vue')

const app = express()
const port = process.env.PORT || 500

//middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("uploads"))


/*===============INICIALIZAR MONGODB====================
db.createCollection('users', (err, collection) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Colección creada:', collection);
    }
});

setTimeout(function () {
    const usersData = require('/docker-entrypoint-initdb.d/users.json');
    db.users.insertMany(usersData);
}, 5000); // 5000 ms = 5 s


db.createCollection('screening', (err, collection) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Colección creada:', collection);
    }
});

setTimeout(function () {
    const screeningData = require('/docker-entrypoint-initdb.d/screening.json');
    db.screening.insertMany(screeningData);
}, 5000); // 5000 ms = 5 s
/*===============INICIALIZAR MONGODB====================*/

//routes prefix
app.use('/', require("./routes/routes"))

//start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
