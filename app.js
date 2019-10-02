require('dotenv').config()

const express = require('express')
const app = express()

function start(){
  port = process.env.PORT
  app.listen(port, () => console.log(`Backend started on port ${port}`))
}

start()