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
    const eventImg = req.body.eventImg
    const eventStartDate = req.body.eventStartDate
    const eventEndDate = req.body.eventEndDate
    const eventRegStartDate = req.body.eventRegStartDate
    const eventRegEndDate = req.body.eventRegEndDate
    const eventStreet = req.body.eventStreet
    const eventZip = req.body.eventZip
    const eventState = req.body.eventState
    const eventCity = req.body.eventCity
    const pdf = req.body.pdf
    const eventOrganizer = req.body.eventOrganizer

    const newEvent = new Event({eventOrganizer, pdf, eventCity, eventState, eventZip, eventStreet, eventRegEndDate, eventRegStartDate, 
    eventEndDate, eventName, eventDescription, eventStartDate, eventImg})

    newEvent.save()///Mongoose again
    .then(() => res.json('Event Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router