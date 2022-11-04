const jwt = require("jsonwebtoken")
require("dotenv").config()

const Authentication = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization
            let verify = jwt.verify(token, process.env.SECRET_CODE)
            if (verify) {
                req.userId = verify._id
                next()
            } else {
                res.status(401).json({ message: "Unauthorized" })
            }
        } else {
            res.status(401).json({ message: "Unauthorized" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = { Authentication }