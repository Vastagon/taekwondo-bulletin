const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

require('dotenv').config({ path: 'ENV_FILENAME' });

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(__dirname, "client", "build")))


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


const publicPath = path.join(__dirname, "Code", "taekwondo-bulletin", "public")
app.use(express.static(publicPath))
// console.log(__dirname, "Code", "taekwondo-bulletin", "public")

app.get("*", (req, res) => {
    res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () =>{
    console.log(`The server is running on port ${port}`)
})