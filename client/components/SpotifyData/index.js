import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios'

import DropDowns from "./DropDowns";

const SpotifyData = () => {

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() =>{

  axios('https://accounts.spotify.com/api/token', {
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded',
      "Authorization": "Basic " + btoa(process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET)
    },
    data: 'grant_type=client_credentials',
    method: "POST"
  })

  .then(tokenResponse => {
    console.log(tokenResponse.data.access_token);
    setToken(tokenResponse.data.access_token);

    axios("https://api.spotify.com/v1/browse/categories", {
      method: 'GET',
      headers: { "Authorization" : "Bearer " + tokenResponse.data.access_token}
    })
    .then (genreResponse => {
      setGenres(genreResponse.data.categories.items)
    });
  });

  },[]);

  return (
    <div>
      <DropDowns genres={genres}/>
    </div>
  )
}

export default SpotifyData
