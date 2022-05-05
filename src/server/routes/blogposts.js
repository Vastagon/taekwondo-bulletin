const router = require('express').Router()
let BlogPost = require('../models/blogposts.model')

router.route('/').get((req,res) =>{
    BlogPost.find()
    .then(blogPosts => res.json(blogPosts))
    .catch(err => res.status(400).json(`Error: ${err}`))
})


router.route('/add').post((req,res) =>{
    const postContent = req.body.postContent
    const postReplies = []
    const postUserEmail = req.body.postUserEmail
    const postUsername = req.body.postUsername

    const newBlogpost = new BlogPost({
        postContent,
        postUserEmail,
        postUsername,
        postReplies
    })

    newBlogpost.save()
    .then(() => res.json('Post Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})


router.route('/change').post((req,res) =>{
    async function test1(){
        const filter = {postContent: req.body.postContent}
        const update = {postReplies: req.body.postReplies}

        let doc = await BlogPost.findOneAndUpdate(filter, update)

        
        doc = await BlogPost.findOne(filter)

    }
    console.log(req.body)
    test1()    
})




module.exports = router