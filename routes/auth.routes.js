const express = require("express")
const router = express.Router()

const authController = require("../controller/auth.controller")

router.post("/login", authController.postLogin)
router.put("/signup", authController.putSignUp)

module.exports = router
