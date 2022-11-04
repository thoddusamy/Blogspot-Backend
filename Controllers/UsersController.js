const User = require("../Schemas/UserSchema")
const Post = require("../Schemas/PostsSchema")
const bcryptjs = require('bcryptjs')

const GetUserInfo = async (req, res) => {
    try {
        const userExist = await User.findById({ _id: req.userId })
        if (userExist) {
            const { password, ...others } = userExist._doc // get users all details except password
            res.status(200).json(others)
        }
    } catch (error) {
        console.log(error);
    }
}

const UpdateProfile = async (req, res) => {
    try {
        let { username, email, password, profile_pic } = req.body
        const checkUsername = await User.findOne({ username })

        if (checkUsername) {
            res.status(400).json({ message: "Username Already used. Try Another One" })
        } else {
            const findUser = await User.findOne({ userId: req.userId })
            const salt = await bcryptjs.genSalt(10)
            const hash = await bcryptjs.hash(password, salt)
            password = hash
            const updateUserProfile = await User.findByIdAndUpdate({ _id: req.userId }, {
                $set: {
                    username,
                    email,
                    password,
                    profile_pic: profile_pic === '' ? findUser.profile_pic : profile_pic
                }
            })
            await Post.updateMany({ userId: req.userId }, { $set: { username: req.body.username } })
            if (updateUserProfile) {
                res.status(200).json({ message: "Profile Updated" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}


module.exports = { GetUserInfo, UpdateProfile }