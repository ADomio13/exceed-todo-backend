const Todos = require('../models/todos.model')

exports.viewAll = (req, res) => {
  Todos.find()
    .then(todos => {
      res.send(todos)
    })
    .catch(err => {
      res.status(500).send({
        message: err || 'Something went wrong'
      })
    })
}

exports.add = (req, res) => {
  //Validate request
  if(!req.body){
    res.status(400).end('Empty request')
  }
  const todo = new Todos({
    name: req.body.name,
    isActive: true,
    createdAt: Date.now()
  })
  todo.save()
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err || 'Something went wrong :('
      })
  })
}

exports.deleteOne = (req, res) => {
  Todos.findByIdAndRemove(req.params.id)
    .then(todo => {
      if(!todo) {
        res.status(404).send({
          message: `Todo with ID ${req.params.id} not found, try another ID`
        })
      }
      res.status(200).send({
        message: `Todo with ID ${req.params.id} deleted successfully!`
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err
      })
    })
}

exports.deleteCompleted = (req, res) => {
  const {ids} = req.params
  const idsArr = ids.split(',')
  Todos.deleteMany({
    _id: {
      $in: idsArr
    }
  }, (err, response) => {
    if(err){
      res.status(500).json({
        message: err.message
      })
    }else {
      res.json({
        result: response
      })
    }

  })
}