const express = require('express')
const router = express.Router()

const todosController = require('../controllers/todo.controller')

// View todos
router.get('/', todosController.viewAll)

router.post('/create', (req, res) => {
	res.json(req.body)
})

module.exports = router