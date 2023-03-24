const express = require("express")
const router = express.Router()
const {
  createUserKey,
  getUserKeys,
  deleteUserKey,
  updateUserKey,
} = require("../controller/key.controller")
const { isAuth } = require("../middleware/is.auth")

router.post("/keys", isAuth, createUserKey)
router.get("/keys", isAuth, getUserKeys)
router.patch("/key/:id", isAuth, updateUserKey)
router.delete("/key/:id", isAuth, deleteUserKey)

module.exports = router
