const router = require('express').Router()
let Exercise = require('../models/exercise.model')

router.route('/').get((req,res) =>{
    Exercise.find()///Mongoose method that returns promise
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

///When getting a post request at /add, it's expecting all 4 pieces of data
router.route('/add').post((req,res) =>{
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    newExercise.save()///Mongoose again
    .then(() => res.json('Exercise Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})


///Gets the route plus id can can do things like delete or update
router.route('/:id').get((req,res) =>{
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.route('/:id').delete((req,res) =>{
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Deleted Exercise"))
        .catch(err => res.status(400).json(`Error: ${err}`))
})
router.route('/update/:id').post((req,res) =>{
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date = Date.parse(req.body.date)

            exercise.save()///Mongoose again
            .then(() => res.json('Exercise Updated'))
            .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router