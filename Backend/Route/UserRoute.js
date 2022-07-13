const express = require("express")
const {registerUser} = require("../Controller/userControler")
const router = express.Router()

router.route("/Register").post(registerUser)


module.exports=router