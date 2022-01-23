import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import DropDowns from "./DropDowns";
import Playlist from "./Playlist";

const SpotifyData = () => {
  const [token, setToken] = useState("");
  // const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromApi: []})

  //Create "playlist" state; object with playlist info
  const [playlist, setPlaylist] = useState({
    playlistName: "",
    playlistImage: "",
    playlistDescription: "",
    playlistUrl: "",
  });

  //create playList songs state; array with song objects
  const [playlistSongs, setPlaylistSongs] = useState([]);

  console.log(playlist);

  useEffect(() => {
    //GET TOKEN
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    })
      //SAVE TOKEN TO STATE
      .then((tokenResponse) => {
        setToken(tokenResponse.data.access_token);

        //axios request for
        axios("https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }).then((playlistResponse) => {
          console.log(playlistResponse);
          setPlaylist({
            playlistName: playlistResponse.data.name,
            playlistImage: playlistResponse.data.images[0].url,
            playlistDescription: playlistResponse.data.description,
            playlistUrl: playlistResponse.data.external_urls.spotify,
          });
        });
      });
  }, []);

  //     //AXIOS REQUEST TO SPOTIFY w/ TOKEN IN HEADER - GENRES
  //     axios("https://api.spotify.com/v1/browse/categories", {
  //       method: 'GET',
  //       headers: { "Authorization" : "Bearer " + tokenResponse.data.access_token}
  //     })
  //     .then (genreResponse => {
  //       setGenres({
  //         selectedGenre: genres.selectedGenre,
  //         listOfGenresFromApi: genreResponse.data.categories.items
  //       })
  //     });

  //   });

  // },[]);

  //Select Handler
  // const genreChanged = (value) => {
  //   setGenres({
  //     selectedGenre: value,
  //     listOfGenresFromApi: genres.listOfGenresFromApi
  //   });
  // }

  return (
    <div>
      <div className="m-6 flex-row">
        <div className="flex-auto">
        <p>A little data about the Global Top 50 Songs on Spotify this week.</p>
        </div>
        <div className="flex-auto">
        Powered by the
          <img width="100px" src="/img/Spotify_Logo_CMYK_Green.png"></img>
        API
        </div>
        <Playlist playlist={playlist} />
      </div>
    </div>
  );
};

export default SpotifyData;
