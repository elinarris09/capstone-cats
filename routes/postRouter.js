const express = require('express')
const Post = require('../models/post')
const postRouter = express.Router()

//add post
postRouter.post('/', async(req, res, next) => {
    try {
        req.body.username = req.auth.username
        req.body.userId = req.auth._id
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        return res.status(201).send(savedPost)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//get all
postRouter.get('/', async(req, res, next) => {
    try {
        const foundPosts = await Post.find()
        return res.status(200).send(foundPosts)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//get all posts by one user
postRouter.get('/user', async(req, res, next) => {
    try {
        const foundPosts = await Post.find({userId: req.auth._id})
        return res.status(200).send(foundPosts)
    } catch (error) {
        res.status(500)
        return next(error)
    }
})

//delete
postRouter.delete('/:postId', async(req, res, next) => {
    try {
        const foundPost = await Post.findByIdAndDelete(req.params.postId)
        return res.status(201).send(`You deleted the post successfully!`)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//update single post
postRouter.put('/:postId', async(req, res, next) => {
    try {
        const postId = req.params.postId
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            req.body,
            {new: true}
        )
        return res.status(201).send(updatedPost)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//upvotes
postRouter.put('/upvotes/:postId', async(req, res, next) =>{
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $addToSet: {upvotes: req.auth._id},
                $pull: {downvotes: req.auth._id}
            },
            {new: true}
        )
        return res.status(201).send(updatedPost)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//downvotes
postRouter.put('/downvotes/:postId', async(req, res, next) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $addToSet: {downvotes: req.auth._id},
                $pull: {upvotes: req.auth._id}
            },
            {new: true}
        )
        return res.status(201).send(updatedPost)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = postRouter