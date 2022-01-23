//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Artist = require("./models/Artist")

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Artist
  },
}
