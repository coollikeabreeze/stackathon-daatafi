const Sequelize = require('sequelize')
const db = require('../db')
const axios = require('axios');

const Artist = db.define ('artist', {
  artistName: {
    type: Sequelize.STRING
  },
  spotifyArtistId: {
    type: Sequelize.STRING
  },
  topSongLyrics: {
    type: Sequelize.TEXT
  }
})

module.exports = Artist
