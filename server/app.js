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
        console.log('Colección users creada:', collection);
    }
});

db.createCollection('screening', (err, collection) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Colección screening creada:', collection);
    }
});

setTimeout(function () {
    const screeningData = require('/docker-entrypoint-initdb.d/screening.json');
    db.screening.insertMany(screeningData);
    console.log("Datos cargados a screening");
}, 5000); // 5000 ms = 5 s

db.createCollection('preguntasNiveles', (err, collection) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Colección preguntasNiveles creada:', collection);
    }
});

setTimeout(function () {
    const preguntasNivelesData = require('/docker-entrypoint-initdb.d/preguntasNiveles.json');
    db.preguntasNiveles.insertMany(preguntasNivelesData);
    console.log("Datos cargados a preguntasNiveles");
}, 5000); // 5000 ms = 5 s
/*===============INICIALIZAR MONGODB====================*/

//routes prefix
app.use('/', require("./routes/routes"))

//start server
app.listen(port, () => console.log(`Server running at http://localhost:${port}`))
