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

    // to update user into db
    static async updateUser(id, user) {
        const res = await axios.patch(`${url}/${id}`, user)
        return res.data
    }

    // to delete user into db
    static async deleteUser(id) {
        const res = await axios.delete(`${url}/${id}`)
        return res.data
    }
}