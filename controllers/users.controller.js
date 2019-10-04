const Users = require('../models/users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  //Validate
  const candidate = await Users.findOne({email})
  if(candidate){
    return res.status(400).json({message: 'user already exist'})
  }
  //Create a user
  const salt = bcrypt.genSaltSync(10)
  const user = new Users({
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, salt)
  })
  return await user.save()
    .then((user) => res.status(201).json({message: 'Created', user}))
    .catch(err => res.status(500).json({message: err}))
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  //Validate
  const candidate = await Users.findOne({email})
  if(!candidate){
    return res.status(404).json({message: 'User doesn\'t exist'})
  }

  const comparePasswords = bcrypt.compareSync(password, candidate.password)
  if(comparePasswords) {
    const {email, firstName, lastName, _id} = candidate
    const token = jwt.sign({
      email,
      firstName,
      lastName,
      id: _id
    }, jwtSecret, {expiresIn: 3600})
    res.json({token: `Bearer ${token}`})
  } else {
    res.status(400).json({message: 'Password is incorrect'})
  }

}

exports.editInfo = (req, res) => {
  res.send('It\'s edit info')
}