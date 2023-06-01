const mongojs = require('mongojs')

/*dockerizado*/
//const db = mongojs('mongodb://mongo:27017/hads_app_vue', ['preguntasNiveles'])

/*dev*/
const db = mongojs('mongodb://127.0.0.1:27017/hads_app_vue', ['preguntasNiveles'])

module.exports = class QUESTIONS {
    // fetch all questions
    static fetchAllQuestion(req, res) {
        db.preguntasNiveles.findOne({"titulo": req.body.titulo}, (err, docs) => {
            if (err) {
                res.send(err)
            } else {
                res.status(200).json(docs)
            }
        })
    }
}