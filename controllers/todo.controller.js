const Todos = require('../models/todos.model')

exports.viewAll = (req, res) => {
  Todos.find()
    .then(todos => {
      res.status(200).json(todos)
    })
    .catch(err => {
      res.status(500).json({ message: err || 'Something went wrong' })
    })
}

exports.add = (req, res) => {
  //Validate request
  if(!req.body){
    res.status(400).json({ message: 'Empty request' })
  }
  const todo = new Todos({
    createdBy: req.body.createdBy,
    name: req.body.name,
    isActive: true,
  })
  todo.save()
    .then(data => {
      return res.status(201).json(data)
    })
    .catch(err => {
      return  res.status(500).json({ message: err || 'Something went wrong :(' })
  })
}

exports.edit = (req, res) => {
  Todos.findByIdAndUpdate(req.params.id, req.body)
    .then( todo => {
      if (!todo) {
        return res.status(404).json({message: `Todo with ID ${req.params.id} not found, try another ID`})
      }
      return res.status(200).json({message: `Todo with ID ${req.params.id} edited successfully!`, body: req.body})
    })
    .catch(err => {
      res.status(500).json({ message: err || 'Something went wrong :(' })
    })
}

exports.deleteOne = (req, res) => {
  Todos.findByIdAndRemove(req.params.id)
    .then(todo => {
      if(!todo) {
        return res.status(404).json({ message: `Todo with ID ${req.params.id} not found, try another ID` })
      }
      return res.status(200).json({ message: `Todo with ID ${req.params.id} deleted successfully!` })
    })
    .catch(err => {
      res.status(500).json({ message: err || 'Something went wrong :(' })
    })
}

exports.deleteFew = (req, res) => {
  const {ids} = req.params
  const idsArr = ids.split(',')
  Todos.deleteMany({
    _id: {
      $in: idsArr
    }
  },
    (err, response) => {
    if(err){
      res.status(500).json({ message: err.message || 'Something went wrong :(' })
    }else {
      res.status(200).json({ result: response })
    }
  })
}