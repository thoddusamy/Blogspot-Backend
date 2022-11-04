const User = require('../Schemas/UserSchema')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const SECRET = process.env.SECRET_CODE

const Register = async (req, res) => {
    try {
        const checkUserExist = await User.findOne({ email: req.body.email })
        const checkUserNameExist = await User.findOne({ username: req.body.username })
        if (checkUserExist) {
            res.status(400).json({ message: "Email id Already exist" })
        } else if (checkUserNameExist) {
            res.status(400).json({ message: "Username Already used. Please try another one" })
        } else {
            const salt = await bcryptjs.genSalt(10)
            const hash = await bcryptjs.hash(req.body.password, salt)
            req.body.password = hash
            const createUser = await User.create(req.body)
            if (createUser) {
                res.status(200).json({ message: "User Created" })
            } else {
                res.status(400).json({ message: "User Created Failed" })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

const Login = async (req, res) => {
    try {
        let { username, password } = req.body
        const checkUser = await User.findOne({ username })

        if (checkUser) {
            const verifyPassword = await bcryptjs.compare(password, checkUser.password)

            if (verifyPassword) {
                const generateToken = jwt.sign({ _id: checkUser._id }, SECRET)
                let { password, ...others } = checkUser._doc // send user details except password
                res.status(200).json({ message: 'LoggedIn successful', token: generateToken, user: others })
            } else {
                res.status(400).json({ message: "Incorrect password" })
            }
        } else {
            res.status(404).json({ message: "User not found" })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { Register, Login }