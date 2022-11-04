const Post = require('../Schemas/PostsSchema')

// create a new post
const CreateNewPost = async (req, res) => {
    try {
        let { title } = req.body
        const checkTitleExist = await Post.findOne({ title })
        if (checkTitleExist) {
            res.status(500).json({ message: "Title duplicated. Try unique title" })
        } else {
            req.body.userId = req.userId
            const createNewPost = await Post.create(req.body)
            if (createNewPost) {
                let findPost = await Post.findById({ _id: createNewPost._id, userId: req.userId })
                res.status(200).json({ message: "Post created!", post: findPost })
            } else {
                res.status(500).json({ message: "CreateNewPost Failed" })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

// get post by postid
const GetPostById = async (req, res) => {
    try {
        const { id } = req.params
        const findPost = await Post.findById({ _id: id })
        if (findPost) {
            res.status(200).json(findPost)
        } else {
            res.status(400).json({ message: "Post not found" })
        }
    } catch (error) {
        console.log(error);
    }
}

// get all post
const GetAllPosts = async (req, res) => {
    try {
        const username = req.query.user
        const category = req.query.category

        let posts

        if (username) {
            posts = await Post.find({ username }).sort({ createdAt: -1 })
        } else if (category) {
            posts = await Post.find({ category: { $in: [category] } }).sort({ createdAt: -1 })
        } else {
            posts = await Post.find().sort({ createdAt: -1 })
        }
        res.status(200).json(posts)

    } catch (error) {
        console.log(error);
    }
}

//update a existing user post
const UpdatePostById = async (req, res) => {
    try {
        const { id, username } = req.params
        const { title, desc } = req.body
        const checkPostExist = await Post.findById({ _id: id, userId: req.userId })

        if (checkPostExist) {
            if (username === checkPostExist.username) {
                await Post.findByIdAndUpdate({ _id: id }, { $set: { title, desc } })
                res.status(200).json({ message: "Post updated" })
            } else {
                res.status(401).json({ message: "You can update your post only!" })
            }
        } else {
            res.status(400).json({ message: "Post not found" })
        }

    } catch (error) {
        console.log(error);
    }
}

// delete a existing user post
const DeletePostById = async (req, res) => {
    try {
        const { id, username } = req.params
        const checkPostExist = await Post.findById({ _id: id, userId: req.userId })

        if (checkPostExist) {
            if (username === checkPostExist.username) {
                await Post.findByIdAndDelete({ _id: id, userId: req.userId })
                res.status(200).json({ message: "Post deleted" })
            } else {
                res.status(401).json({ message: "You can delete your post only!" })
            }
        } else {
            res.status(400).json({ message: "Post not found" })
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { CreateNewPost, GetPostById, GetAllPosts, UpdatePostById, DeletePostById }