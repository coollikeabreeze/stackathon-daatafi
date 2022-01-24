import React from "react";
import { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const EachSong = (props) => {
  const accessToken = props.accessToken
  const lyrics = props.lyrics
  const playingTrack = props.playingTrack

  const [artist, setArtist] = useState({})
  const [relatedArtists, setRelatedArtists] = useState([])

  console.log(artist)
  console.log(relatedArtists)

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getArtist(playingTrack.artistId)
    .then(data =>  {
    // console.log('Artist information', data.body);
    setArtist({
      name: data.body.name,
      popularity: data.body.popularity,
      genres: data.body.genres
    })
  }, err => {
    console.error(err);
  });

  }, [playingTrack]);

  useEffect(() => {
    spotifyApi.getArtistRelatedArtists(playingTrack.artistId)
    .then(data =>  {
    setRelatedArtists(
        data.body.artists.map((artist) => {
          const smallestArtistImage = artist.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            artist.images[0]
          );

          return {
            artist: artist.name,
            artistId: artist.id,
            title: artist.name,
            uri: artist.uri,
            artistImageUrl: smallestArtistImage.url,
            popularity: artist.popularity,
            genres: artist.genres
          };
        })
    )
  }, err => {
    console.error(err);
  });
  }, [playingTrack]);

  const uniqueWordsArray = (str) => {
    return str.toLowerCase().replace(/\b(the|to|in|on|a|an)\b/gi, '').replace(/[^A-Za-z0-9\s]/g,"").replace(/\s{2,}/g, " ").split(' ');
  }

  const uniqueWordsCount = (str) => {
    let wordsArr = uniqueWordsArray(str)
    let count = 0
    let currentWords = []
    for (let i = 0; i < wordsArr.length; i++) {
      if (!currentWords.includes(wordsArr[i])) {
        currentWords.push(wordsArr[i])
        count ++
      }
    }
    return count
  }


  const uniqueWordsObj = (str) => {
    let wordsObj = {};
    //remove words "the", "to", "in", "on", "a", "an"
    //remove punctuation
    //remove extra spaces
    let words = str.toLowerCase().replace(/\b(the|to|in|on|a|an)\b/gi, '').replace(/[^A-Za-z0-9\s]/g,"").replace(/\s{2,}/g, " ").split(' ');

    words.forEach((word) => {
     wordsObj[word] = word;
   });

   for (let j = 0; j < words.length; j++) {
     if (words[j] === wordsObj[words[j]]) {
       wordsObj[words[j]] = 0;
     }
     wordsObj[words[j]]++
   }
   console.log(wordsObj);
   return wordsObj
 };

  return (
    <div className="text-center" style={{ whiteSpace: 'pre' }}>
    {(lyrics === 'No lyrics found') ? (<div>No lyrics found</div>):
    (<div> Unique Words: {uniqueWordsCount(lyrics)} <br></br></div>)
    }



    This song: {playingTrack.title}<br></br>
    This artist {playingTrack.artist} & ID {playingTrack.artistId}
    </div>
  )
}

export default EachSong
