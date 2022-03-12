const router = require('express').Router()
let Event = require('../models/events.model')

router.route('/').get((req,res) =>{
    Event.find()///Mongoose method that returns promise
    .then(events => res.json(events))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req,res) =>{
    const eventName = req.body.eventName
    const eventDescription = req.body.eventDescription
    const eventDate = req.body.eventDate
    const eventTime = req.body.eventTime
    const eventSlot = req.body.eventSlot
    const eventImg = req.body.eventImg

    const newEvent = new Event({eventName, eventDescription, eventDate, eventTime, eventSlot, eventImg})

    newEvent.save()///Mongoose again
    .then(() => res.json('Event Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router