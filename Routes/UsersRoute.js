const express = require("express")
const { GetUserInfo, UpdateProfile } = require("../Controllers/UsersController")
const { Authentication } = require("../Middlewares/Authentication")
const router = express.Router()

router.get('/getuserbyid', Authentication, GetUserInfo)
router.put('/updateprofile', Authentication, UpdateProfile)

module.exports = router