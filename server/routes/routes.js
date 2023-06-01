const express = require('express')
const router = express.Router()
const LOGIN = require("../controllers/login")
const SCREENING = require("../controllers/screening")
const OpenAIChat = require("../controllers/OpenAIChat")
const QUESTIONS = require("../controllers/preguntasNiveles")

// RUTAS PARA LOGIN
router.get("/login/", LOGIN.fetchAllUser)
router.get("/login/:id", LOGIN.fetchUserByID)
router.post("/login/", LOGIN.createUser)
router.post("/login/:id", LOGIN.setLevel)
router.delete("/login/:id", LOGIN.deleteUser)

router.get("/screening/", SCREENING.fetchAllQuestion)
router.post("/screening/", SCREENING.calculateLevel)

router.post("/ask/", OpenAIChat.askChatGPT)

router.post("/questions/", QUESTIONS.fetchAllQuestion)

module.exports = router