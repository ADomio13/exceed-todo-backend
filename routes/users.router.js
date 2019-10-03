const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users.controller')

//Users
router.post('/register', usersController.register)
router.post('/login', usersController.login)
router.post('/profile/edit', usersController.editInfo)

module.exports = router