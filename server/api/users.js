const router = require('express').Router()
const { models: { User }} = require('../db')
const { requireToken, isAdmin } = require("./gatekeepingMiddleware")
module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    //if we manage to make it past required token, we can guarantee we have a user

    const users = await User.findAll({
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
