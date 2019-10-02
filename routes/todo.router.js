const express = require('express')
const router = express.Router()

// View todos
router.get('/', (req, res) => {
	res.send('Todos will be here')
})

router.post('/create', (req, res) => {
	const body = req.body
	res.send(body)
})

module.exports = router