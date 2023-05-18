import axios from 'axios'
const url = "/login"

export default class LOGIN {
    // to get all the users from the server
    static async getAllUsers() {
        const res = await axios.get(url)
        return res.data
    }

    // to get single user by id
    static async getUserById(id) {
        const res = await axios.get(`${url}/${id}`)
        return res.data
    }

    // to insert user into db
    static async addUser(user) {
        const res = await axios.post(url, user)
        return res.data
    }

    static async setLevel(id, level) {
        const res = await axios.post(`${url}/${id}`, level)
        return res.data
    }

    // to delete user into db
    static async deleteUser(id) {
        const res = await axios.delete(`${url}/${id}`)
        return res.data
    }
}