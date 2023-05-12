const express = require('express')
const router = express.Router()
const LOGIN = require("../controllers/login")
const SCREENING = require("../controllers/screening")
const OpenAIChat = require("../controllers/OpenAIChat")

// RUTAS PARA LOGIN
router.get("/login/", LOGIN.fetchAllUser)
router.get("/login/:id", LOGIN.fetchUserByID)
router.post("/login/", LOGIN.createUser)
router.patch("/login/:id", LOGIN.updateUser)
router.delete("/login/:id", LOGIN.deleteUser)

router.get("/screening/", SCREENING.fetchAllQuestion)

// router.get("/ask/", OpenAIChat.askChatGPT)

module.exports = router