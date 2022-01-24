import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";

import DropDowns from "./DropDowns";
import Playlist from "./Playlist";
import SearchResults from "./SearchResults";
import Player from "./Player";
import EachSong from "./EachSong";
import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const SpotifyData = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  function chooseTrack(track) {
    console.log(track);
    setPlayingTrack(track);
    setSearchResults([]);
    setLyrics("");
  }

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("http://localhost:8080/lyrics", {
        params: {
          track: playingTrack.track,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          console.log(track);
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            artistId: track.artists[0].id,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
            popularity: track.popularity,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <div>
      <div>
        <input
          type="search"
          className="form-control fixed flex-auto w-min-50 block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mx-6 -my-14"
          placeholder="Search an artist or song"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>

      <div className="w-full fixed bottom-0">
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>

      <div className="mt-48">
        <table className="table-fixed rounded-sm border-collapse bg-gray-900 w-full">
          {/* <thead>
          <tr className="px-8 py-1 bg-gray-500">
            <td className="w-40  px-8 py-2">Track</td>
            <td className="px-8 py-2"></td>
            <td className="px-8">Popularity</td>
            </tr>
          </thead> */}
          <tbody className=" items-center justify-between overflow-y-scroll">
            {searchResults.map((track) => (
              <SearchResults
                track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
              />
            ))}
          </tbody>
        </table>

        {!playingTrack ? (
          <div />
        ) : (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            <EachSong lyrics={lyrics} playingTrack={playingTrack} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyData;
