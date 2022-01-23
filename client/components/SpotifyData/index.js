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
    playlistTracks: []
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
        console.log(tokenResponse.data.access_token)
        setToken(tokenResponse.data.access_token);

        //axios request for
        axios("https://api.spotify.com/v1/playlists/37i9dQZEVXbNG2KDcFcKOF", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }).then((playlistResponse) => {
          console.log(playlistResponse);
          console.log(playlistResponse.data.tracks.items)

          let songsArr = []
          let trackInfo = playlistResponse.data.tracks.items
          for (let i = 0; i < 10; i++) {
            const trackNumber = trackInfo[i].track.track_number
            const trackName = trackInfo[i].track.name
            const trackPopularity = trackInfo[i].track.popularity

            const artistInfo = []

            for (let j = 0; j < trackInfo[i].track.artists.length; j++ ) {
              artistInfo.push({
                artistName: trackInfo[i].track.artists[j].name,
                artistId: trackInfo[i].track.artists[j].id,
                artistUrl: trackInfo[i].track.artists[j].external_urls.spotify,
              })
            }

            songsArr.push({
              trackNumber: trackNumber,
              trackName: trackName,
              artists: artistInfo,
              trackPopularity: trackPopularity
            })
          }

          setPlaylist({
            playlistName: playlistResponse.data.name,
            playlistImage: playlistResponse.data.images[0].url,
            playlistDescription: playlistResponse.data.description,
            playlistUrl: playlistResponse.data.external_urls.spotify,
            playlistTracks: songsArr
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
        </div>
        <Playlist playlist={playlist} />
      </div>

      <div className=" m-6">
        Powered by the
          <img width="100px" src="/img/Spotify_Logo_CMYK_Green.png"></img>
        API
        </div>
    </div>
  );
};

export default SpotifyData;
