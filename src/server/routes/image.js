const router = require('express').Router()
let Image = require('../models/image.model')
// const cloudinary = require('cloudinary').v2

// cloudinary.config({ 
//     cloud_name: 'dg9s57jo8', 
//     api_key: '336683864383724', 
//     api_secret: '8MbNKmImBmB1XfLn5v0PFnmYR6M' 
//   });

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

// router.route('/add').post((req,res) =>{
//     const {image} = req.body
//     cloudinary.uploader.upload(image)

// })


module.exports = router