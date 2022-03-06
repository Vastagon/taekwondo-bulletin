const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config({ path: 'ENV_FILENAME' });

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://Vastagon:Vastagon1@taekwondobulletincluste.7nvk4.mongodb.net/TaekwondoBulletinCluster?retryWrites=true&w=majority"
// const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', () =>{///once connection is open
    console.log("Mongo Connected")
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')
const blogpostsRouter = require("./routes/blogposts")

app.use("/exercises", exercisesRouter)///when going to exercises, it loads exercises router
app.use('/users', usersRouter)
app.use("/blogposts", blogpostsRouter)

app.listen(port, () =>{
    console.log("The server is running properly")
})