const Users = require('../models/users.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET

exports.register = (req, res) => {
  const { firstName, lastName, email, password } = req.body

  //Validation
  if(!email || !password){
    return res.status(400).send({message: 'Enter required email and password'})
  }

  //Checking for existing user
  Users.findOne({  email })
    .then(user => {
      if(user) return res.status(400).send({message: 'User already exists'})
      const newUser = new Users({
        firstName,
        lastName,
        email,
        password,
      })
      //Create salt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err
          newUser.password = hash
          newUser.save()
            .then(user => {

              jwt.sign(
                { email: user.email },
                jwtSecret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email
                    }
                  })
                }
              )
            })
        })
      })
    })
}

exports.login = (req, res) => {
  const { firstName, lastName, email, password } = req.body
  Users.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ message: 'Wrong email or password'})

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({
            message: 'Wrong email or password'
          })

          jwt.sign(
            { email: user.email },
            jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err
              res.json({
                token,
                user: {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email
                }
              })
            }
          )
        })
    })

}

exports.editInfo = (req, res) => {
  res.send('It\'s edit info')
}