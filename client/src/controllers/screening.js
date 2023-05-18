import axios from 'axios'
const url = "/screening/"

export default class SCREENING {
    static async getAllQuestions() {
        const res = await axios.get(url)
        return res.data
    }

    static async calculateLevel(respuestas) {
        console.log(respuestas)
        const res = await axios.post(url, respuestas)
        return res.data
    }
}