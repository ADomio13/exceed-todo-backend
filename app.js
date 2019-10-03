require('dotenv').config()

const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const express = require('express')
const morgan = require('morgan')
const app = express()

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

//Routes
const todoRoutes = require('./routes/todos.router')
app.use('/todos', todoRoutes)
const usersRoutes = require('./routes/users.router')
app.use('/user', usersRoutes)


function start(){
  port = process.env.PORT || 3000
  mongoURI = process.env.MONGOURI

  app.listen(port, () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    mongoose.connection.on('connected', () => console.log('MongoDB connected'))
    console.log(`Server is running on port ${port}`)
  })
}

start()