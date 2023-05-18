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
        db.screening.find((err, docs) => {
            if(err){
                res.send(err)
            }else{
                let preguntas = docs
                let respuestas = req.body.respuestas
                let valoracionFinal = 0
                preguntas.forEach(element => {
                    let respuestaCorrecta = element.respuestaCorrecta
                    let valoracion = element.valoracion
                    for (const e of respuestas) {
                        if (e.includes(respuestaCorrecta)) {
                            valoracionFinal += valoracion
                        }
                        break
                    }
                });
                console.log(valoracionFinal)
                if (valoracionFinal <= 10) {
                    res.status(200).json({'level':'Principiante'})
                } else {
                    res.status(200).json({'level':'Intermedio'})
                }
            }
        })
        
        
    }
}