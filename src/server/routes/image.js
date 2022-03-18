const router = require('express').Router()
let Image = require('../models/image.model')


router.route('/').get((req,res) =>{
    Image.find()///Mongoose method that returns promise
    .then(image => res.json(image))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req,res) =>{
    const image = req.body.image

    const newImage = new Image([])

    newImage.save(image)///Mongoose again
    .then(() => res.json('Event Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router