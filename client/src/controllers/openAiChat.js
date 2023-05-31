import axios from 'axios'
const url = "/ask/"

export default class CHAT {
    static async getQuestions(tema) {
        const res = await axios.post(url, tema)
        return res.data
    }
}