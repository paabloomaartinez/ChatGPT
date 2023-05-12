import axios from 'axios'
const url = "/screening/"

export default class SCREENING {
    static async getAllQuestions() {
        const res = await axios.get(url)
        return res.data
    }
}