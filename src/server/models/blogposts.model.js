const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
    postContent: {type: String},
    postTitle: {type: String},
    username: {type: String}
}, {
    timestamps: true,
})

const BlogPosts = mongoose.model('BlogPosts', BlogPostSchema)

module.exports = BlogPosts