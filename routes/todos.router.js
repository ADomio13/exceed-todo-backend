const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const todosController = require('../controllers/todo.controller')

// Todos
router.get('/', todosController.viewAll)
router.post('/add', todosController.add)
router.patch('/edit/:id', todosController.edit)
router.delete('/delete/:id', todosController.deleteOne)
router.delete('/delete/few/:ids', todosController.deleteFew)

module.exports = router