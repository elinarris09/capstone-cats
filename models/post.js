const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    imgUrl: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    username: {
        type: String,
        required: true
    },
    upvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    downvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
})

module.exports = mongoose.model("Post", postSchema)