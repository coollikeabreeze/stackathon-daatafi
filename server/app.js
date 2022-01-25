const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

require("dotenv").config()
const SpotifyWebApi = require('spotify-web-api-node')
const lyricsFinder = require("lyrics-finder")

module.exports = app

//if I am not in my production environment, I want to access the secrets.js file inside of my local machine (each dev should have one!)
//other environments aside from production include development, test, etc.
if (process.env.NODE_ENV !== 'production') require("../.env")
//console.log('log my environment variables', process.env)

// const STRIPE_API_KEY = process.env.STRIPE_API_KEY

// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended:true }))

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
//app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.static(path.join(__dirname, '..', 'public')))
   .use(cors())
   .use(cookieParser());

app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  })

  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  }).catch((err)=> {
    console.log(err)
  res.sendStatus(400)
})
})

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken
  })

  spotifyApi.refreshAccessToken()
  .then(
    (data) => {
      console.log('The access token has been refreshed');
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    }).catch(() => {
      res.sendStatus(400)
    })
})

app.get("/lyrics", async (req, res) => {
  const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No lyrics found"
  res.json({ lyrics })
})

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
