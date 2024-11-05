const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const {expressjwt} = require('express-jwt')
const authRouter = require('./routes/authRouter')
// const path = require('path')

//middleware
app.use(express.json())
app.use(morgan('dev'))
// app.use(express.static(path.join(__dirname, "client", "dist")))

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('connected to db :)')
    } catch (err) {
        console.log(err)
    }
}

connectToDb() //mongoose connection

app.use('/api/auth/', authRouter) //auth route in Postman
app.use('/api/main/', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']})) //general
app.use('/api/main/posts/', require("./routes/postRouter")) //post route connection in Postman
app.use('/api/main/comments/', require('./routes/commentRouter')) //commentRouter

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({errMsg: err.message})
})

// app.get("*", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
// })

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
}) //port connection