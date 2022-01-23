import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Playlist = (props) => {

  const { playlistName, playlistImage, playlistDescription, playlistUrl , playlistTracks} =
    props.playlist;

  console.log(playlistTracks)

  const [lyrics, setLyrics] = useState([])
  const [token, setToken] = useState("");

//  const getLyrics = (songTitle) => {
//   axios(`https://api.genius.com?q=${songTitle}`, {
//     method: "GET",
//     headers: {
//       Authorization: "Bearer " + process.env.geniusClientAccessToken,
//     },
//   })

//     .then((lyricsResponse) => {
//       console.log(lyricsResponse);
//       // setLyrics({
//       // });
//     });
//  }

  useEffect(() => {
      axios.get(
        `https://api.genius.com/oauth/authorize?client_id=${process.env.geniusClientId}&redirect_uri=${process.env.REDIRECT_URI}&scope=GET&response_type=code`
      )

        .then((lyricsResponse) => {
          console.log(lyricsResponse);
          // setLyrics({
          // });
        });

        // setLyrics({
        //   playlistName: playlistResponse.data.name,
        //   playlistImage: playlistResponse.data.images[0].url,
        //   playlistDescription: playlistResponse.data.description,
        //   playlistUrl: playlistResponse.data.external_urls.spotify,
        //   playlistTracks: songsArr
        // });
  }, [])

  return (
    <div>
      <div className="container flex flex-row m-6">
        <img className="object-cover flex h-28" src={playlistImage} />
        <div className="container flex-col m-3">
          <h1 className="text-3xl">{playlistName}</h1>
          <p>{playlistDescription}</p>
        </div>
      </div>

      <div className="container m-6 ">
        <table className="table-fixed rounded-sm border-collapse bg-gray-900">
          <thead>
            <tr className="px-8 py-4">
              <td className="w-16 px-8 py-2">Number</td>
              <td className="p-6">Track</td>
              <td className="p-6">Popularity</td>
            </tr>
          </thead>
          <tbody className=" items-center justify-between overflow-y-scroll">
          {playlistTracks.map((track,idx) => (
          <tr key={idx} className=" items-center justify-between overflow-y-scroll">
            <td className="px-8 py-2 border-t border-gray-600 p-8">{idx+1}</td>
            <td className="px-8 py-2 border-t border-gray-600 p-8">{track.trackName}</td>
            <td className="px-8 py-2 border-t border-gray-600 p-8">{track.trackPopularity}</td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>

    </div>
  );
};

export default Playlist;

