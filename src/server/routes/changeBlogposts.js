let BlogPost = require('../models/blogposts.model')
const router = require('express').Router()



router.route('/change').post((req,res) =>{
    // async function test1(){
    //     ///const filter = {postContent: req.body.postContent}
    //     ///const update = {postReplies: req.body.postReplies}
    //     console.log(req)

    //     // let doc = await BlogPost.findOneAndUpdate(filter, update)
    //     // doc.postContent
    //     // doc.postReplies

    //     // doc = await BlogPost.findOne(filter)
    //     // doc.postReplies    
    // }
    // console.log(req.body)
    console.log("here")
    // test1()    
})