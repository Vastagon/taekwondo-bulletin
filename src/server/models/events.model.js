const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostSchema = new Schema({
        eventName: {type: String, required:true},
        eventDescription: {type: String, required:true},
        eventImg: {type: String},
        eventOrganizer: {type: String, required:true},
        eventCity:{type: String, required:true},
        eventState:{type: String, required:true},
        eventZip:{type: String, required:true},
        eventStreet:{type: String, required:true},
        eventRegEndDate:{type: Date, required:true},
        eventRegStartDate:{type: Date, required:true},
        eventEndDate:{type: Date, required:true},
        eventStartDate:{type: Date, required:true},
        pdf: {type: Schema.Types.Mixed}
}, {
    timestamps: true,
})

const BlogPosts = mongoose.model('Event', BlogPostSchema)

module.exports = BlogPosts
