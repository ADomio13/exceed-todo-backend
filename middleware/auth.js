const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWTSECRET

function auth (req, res, next) {
  const token = req.header('x-auth-token')

  //Checking token
  if(!token) {
    return res.status(401).json({ message: 'No token, auth failed' })
  }

  try {
    //Verify token
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded
    next()
  }catch (e) {
    return  res.status(400).json({ message: e })
  }
}

module.exports = auth