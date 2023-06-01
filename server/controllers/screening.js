const mongojs = require('mongojs')

/*dockerizado*/
//const db = mongojs('mongodb://mongo:27017/hads_app_vue', ['screening'])

/*dev*/
const db = mongojs('mongodb://127.0.0.1:27017/hads_app_vue', ['screening'])

module.exports = class SCREENING {
    // fetch all questions
    static fetchAllQuestion(req, res) {
        db.screening.find((err, docs) => {
            if (err) {
                res.send(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }

    static async calculateLevel(req, res) {
        db.screening.find((err, docs) => {
            if (err) {
                res.send(err)
            } else {
                let preguntas = docs
                let respuestas = req.body.respuestas
                let valoracionFinal = 0
                for (let i = 0; i <= preguntas.length - 1; i++) {
                    let respuestaCorrecta = preguntas[i].respuestaCorrecta
                    let valoracion = preguntas[i].valoracion
                    if (respuestas[i].includes(respuestaCorrecta)) {
                        valoracionFinal += valoracion
                    }
                }
                if (valoracionFinal <= 10) {
                    res.status(200).json({ 'level': 'Principiante' })
                } else {
                    res.status(200).json({ 'level': 'Intermedio' })
                }
            }
        })


    }
}