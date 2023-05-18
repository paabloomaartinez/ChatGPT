import axios from 'axios'
const url = "/screening/"

export default class SCREENING {
    static async getAllQuestions() {
        const res = await axios.get(url)
        return res.data
    }

    static async calculateLevel(id, respuestas) {
        const level = await axios.get(`${url}/level`, respuestas)
        const res = await axios.post(`/login/${id}`, level.data)
    }
}