const router = require('express').Router()
let User = require('../models/users.model')

router.route('/').get((req,res) =>{
    User.find()///Mongoose method that returns promise
    .then(users => res.json(users))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.route('/add').post((req,res) =>{
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email


    const newUser = new User({username, password, email})

    newUser.save()///Mongoose again
    .then(() => res.json('User Added'))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

module.exports = router