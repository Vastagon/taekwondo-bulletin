const router = require('express').Router()
let BlogPost = require('../models/blogposts.model')

router.route('/').get((req,res) =>{
    BlogPost.find()
    .then(blogPosts => res.json(blogPosts))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

///Runs when adding a blog post
router.route('/add').post((req,res) =>{
    const postContent = req.body.postContent
    const postReplies = []
    const postUserEmail = req.body.postUserEmail
    let postUsername = req.body.postUsername
    if(postUsername === ""){
        postUsername="Anonymous"
    }

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

///Runs when adding a reply
router.route('/change').post((req,res) =>{
    async function test1(){
        console.log(req.body.originalPoster)
        const filter = {postContent: req.body.postContent, postUsername: req.body.originalPoster}
        const update = {postReplies: req.body.postReplies, postUsername: req.body.postUsername}

        ///Updates replies
        let doc = await BlogPost.findOneAndUpdate(filter, update)
        
        // doc = await BlogPost.findOne(filter)

    }

    test1()    
})




module.exports = router