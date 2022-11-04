const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, default: '' },
    username: { type: String, required: true },
    category: { type: Array },
    userId: { type: mongoose.Types.ObjectId, required: true },
},
    { timestamps: true }
)

module.exports = mongoose.model("Post", PostsSchema)