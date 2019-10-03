const express = require('express')
const router = express.Router()

const todosController = require('../controllers/todo.controller')

// Todos
router.get('/', todosController.viewAll)
router.post('/add', todosController.add)
router.delete('/delete/:id', todosController.deleteOne)
router.delete('/delete/all', todosController.deleteAll)

module.exports = router