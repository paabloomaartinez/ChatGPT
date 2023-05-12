const Pregunta = require("../models/screening")

module.exports = class SCREENING {
    // fetch all questions
    static async fetchAllQuestion(req, res) {
        try {
            const preguntas = await Pregunta.find()
            console.log(preguntas)
            res.status(200).json(preguntas)
        }catch (err) {
            res.status(404).json({ message: err.message })
        }
    }
}