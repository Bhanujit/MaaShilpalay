const express = require("express")
const {registerUser, loginUser, logout, forgotPassword, resetPassword} = require("../Controller/userControler")
const router = express.Router()

router.route("/Register").post(registerUser)
router.route("/Login").post(loginUser)
router.route("Password/forgot").post(forgotPassword)
router.route("Password/forgot/:token").put(resetPassword)
router.route("/Logout").get(logout)

module.exports=router