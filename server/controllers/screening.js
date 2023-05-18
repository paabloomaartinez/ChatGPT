const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/hads_app_vue', ['screening'])

module.exports = class SCREENING {
    // fetch all questions
    static fetchAllQuestion(req, res) {
        db.screening.find((err, docs) => {
            if(err){
                res.send(err)
            }else{
                res.status(200).json(docs)
            }
        })
    }

    static async  calculateLevel(req, res) {
        let preguntas = await this.fetchAllQuestion()
        let respuestas = req.body
        let valoracionFinal = 0
        preguntas.forEach(element => {
            respuestas.forEach(e => {
                let respuestaCorrecta = element.respuestaCorrecta
                let valoracion = element.valoracion
                if (e.includes(respuestaCorrecta)) {
                    valoracionFinal += valoracion
                }
            })
        });
        res.status(200).json(valoracionFinal)
    }
}