import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

import DropDowns from "./DropDowns";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults"
import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID
})

const SpotifyData = ({code}) => {

  const accessToken = useAuth(code)
  const [search,setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])


  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  },[accessToken])

  useEffect(() => {
    if(!search) return setSearchResults([])
    if(!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(res.body.tracks.items.map(track=> {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])

        return{
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url,
          popularity: track.popularity
        }
      }))
    })

    return () => cancel = true
  }, [search, accessToken])

  return (
    <div>
     <input type="search" className="form-control relative flex-auto w-min-50 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
     placeholder="Search an artist or song"
     value={search}
     onChange={(e)=> setSearch(e.target.value)}></input>

    <SearchResults searchResults={searchResults}/>


    </div>
  )
};

export default SpotifyData;
