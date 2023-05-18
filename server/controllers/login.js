const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/hads_app_vue', ['users'])

module.exports = class API {
    // fetch all users
    static fetchAllUser(req, res) {
        try {
            const users = db.users.find((err, docs) => {
                res.status(200).json(docs)
            })
            console.log(users)
            res.status(200).json(users)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }

    // fetch user by ID
    static fetchUserByID(req, res) {
        try {
            const user = db.users.find({ 'username': req.params.id }, (err, docs) => {
                if (err) {
                    res.send(err)
                } else {
                    res.status(200).json(docs)
                }
            })
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    }

    // create a user
    static createUser(req, res) {
        const user = req.body
        try {
            db.users.insertOne(user)
            res.status(201).json({ message: 'User created successfully!' })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    }

    static setLevel(req, res) {
        db.users.findAndModify({
            query: {_id: mongojs.ObjectId(req.params.id)},
            update: {$set: {'level':0}}
        }, (err, docs) => {
            if(err){
                res.send(err)
            }else{
                res.status(200).json(docs)
            }
        })
    }

    // delete a user
    static deleteUser(req, res) {
        res.send("Delete")
    }
}