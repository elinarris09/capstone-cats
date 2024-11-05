const express = require('express')
const Comment = require('../models/comment')
const Post = require('../models/post')
const commentRouter = express.Router()

//get all comments
commentRouter.get('/', async(req, res, next) => {
    try {
        const foundComments = await Comment.find()
        return res.status(200).send(foundComments)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// post a comment
commentRouter.post('/:postId', async(req, res, next) => {
    try {
        req.body.user = req.auth._id
        req.body.post = req.params.postId
        req.body.username = req.auth.username

        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        const foundPost = await Post.findById({_id: req.params.postId})
        return res.status(201).send(savedComment)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//delete comment
commentRouter.delete('/:commentId', async(req, res, next) => {
    try {
        const foundComment = await Comment.findByIdAndDelete(req.params.commentId)
        return res.status(201).send(`You deleted comment successfully!`)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//update/edit comment
commentRouter.put('/:commentId', async(req, res, next) => {
    try {
        const commentId = req.params.commentId
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            req.body,
            {new: true}
        )
        return res.status(201).send('Update Successful!')
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = commentRouter