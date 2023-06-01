import axios from 'axios'
const url = "/questions/"

export default class SCREENING {
    static async getQuestions(titulo) {
        const res = await axios.post(url, titulo)
        return res.data
    }
}