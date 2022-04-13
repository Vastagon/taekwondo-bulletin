const router = require('express').Router()
let BlogPost = require('../models/blogposts.model')

router.route('/').get((req,res) =>{
    BlogPost.find()///Mongoose method that returns promise
    .then(blogPosts => res.json(blogPosts))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

///When getting a post request at /add, it's expecting all 4 pieces of data
router.route('/add').post((req,res) =>{
    const postContent = req.body.postContent
    const postUserEmail = req.body.postUserEmail
    const postUsername = req.body.postUsername

    const newBlogpost = new BlogPost({
        postContent,
        postUserEmail,
        postUsername
    })

    newBlogpost.save()///Mongoose again
    .then(() => res.json('Post Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router