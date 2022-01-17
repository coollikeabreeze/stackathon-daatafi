// store middleware functions to act as middleware between our request and response

const User = require("../db/models/User")

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    req.user = user
    next()

  } catch (error) {
    next (error)
  }
}

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    res.status(403).send("You are not authorized!")
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
