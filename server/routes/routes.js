const express = require('express')
const router = express.Router()
const LOGIN = require("../controllers/login")

// RUTAS PARA LOGIN
router.get("/login/", LOGIN.fetchAllUser)
router.get("/login/:id", LOGIN.fetchUserByID)
router.post("/login/", LOGIN.createUser)
router.patch("/login/:id", LOGIN.updateUser)
router.delete("/login/:id", LOGIN.deleteUser)

module.exports = router