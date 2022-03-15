const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
        eventName: {type: String, required:true},
        eventDescription: {type: String, required:true},
        eventTime: {type: String, required:true},
        eventSlots: {type: Number},
        eventImg: {type: String},
        eventDate: {type: Date}
}, {
    timestamps: true,
})

const BlogPosts = mongoose.model('Event', BlogPostSchema)

module.exports = BlogPosts

///        eventDate: {type: Date},
