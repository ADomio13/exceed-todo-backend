require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express()

//Routes
const todoRoutes = require('./routes/todo.router')
app.use('/todos', todoRoutes)

function start(){
  port = process.env.PORT
  mongoURI = process.env.MONGOURI

  app.listen(port, () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    mongoose.connection.on('connected', () => console.log('MongoDB connected'))
    console.log(`Server is running on port ${port}`)
  })
}

start()