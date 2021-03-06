const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const multer = require('multer')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000


app.use(cors({origin: "*"}))
app.use(express.json())

///Connecting to mongo
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true})
const connection = mongoose.connection
connection.once('open', () =>{///once connection is open
    console.log("Mongo Connected")
})

// const exercisesRouter = require('./routes/exercises')
// const usersRouter = require('./routes/users')
const blogpostsRouter = require("./routes/blogposts")
const eventsRouter = require('./routes/events')
const imageRouter = require("./routes/image")
const blogpostsChangeRouter = require("./routes/changeBlogposts")

// app.use("/exercises", exercisesRouter)///
app.use("/blogposts", blogpostsRouter)//when going to blogposts, it loads exercises router
// app.use("/users", usersRouter)
app.use("/eventsinfo", eventsRouter)
app.use("/addimage", imageRouter)



///production build
if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../", "../", "build")));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, "../", "../", "build","index.html"));
    });
}



app.listen(port, () =>{
    console.log(`The server is running on port ${port}`)
})