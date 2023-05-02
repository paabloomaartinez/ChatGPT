const User = require("../models/users")

module.exports = class API {
    // fetch all users
    static async fetchAllUser(req, res) {
        try {
            const users = await User.find()
            res.status(200).json(users)
        }catch (err) {
            res.status(404).json({ message: err.message })
        }
    }

    // fetch user by ID
    static async fetchUserByID(req, res) {
        res.send("Fetch user by id")
    }

    // create a user
    static async createUser(req, res) {
        const user = req.body
        try {
            await User.create(user)
            res.status(201).json({message: 'User created successfully!'})
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }

    // update a user
    static async updateUser(req, res) {
        res.send("Update")
    }

    // delete a user
    static async deleteUser(req, res) {
        res.send("Delete")
    }
}