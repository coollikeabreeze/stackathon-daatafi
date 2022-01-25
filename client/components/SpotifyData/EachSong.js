import React from "react";
import { useState, useEffect } from "react";
import RelatedArtists from "./RelatedArtists";
import WordCloud from "./WordCloud";
import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const EachSong = (props) => {
  const accessToken = props.accessToken;
  const lyrics = props.lyrics;
  const playingTrack = props.playingTrack;

  const [artist, setArtist] = useState({});
  const [relatedArtists, setRelatedArtists] = useState([]);

  console.log(artist);
  console.log(relatedArtists);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    spotifyApi.getArtist(playingTrack.artistId).then(
      (data) => {
        console.log('Artist information', data.body);
        setArtist({
          artistId: data.body.id,
          name: data.body.name,
          popularity: data.body.popularity,
          genres: data.body.genres,
          imageUrl: data.body.images[2].url,
          uri: data.body.uri,
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }, [playingTrack]);

  useEffect(() => {
    spotifyApi.getArtistRelatedArtists(playingTrack.artistId).then(
      (data) => {
        const getTop10 = (array) => {
          let top10 = []
          for (let i = 0; i < 10; i++) {
            top10.push(array[i])
          }
          return top10
        }

        const top10Related = getTop10(data.body.artists)

        setRelatedArtists(
          top10Related.map((artist) => {
            // const smallestArtistImage = artist.images.reduce(
            //   (smallest, image) => {
            //     if (image.height < smallest.height) return image;
            //     return smallest;
            //   },
            //   artist.images[0]
            // );

            return {
              name: artist.name,
              artistId: artist.id,
              uri: artist.uri,
              imageUrl: artist.images[1].url,
              popularity: artist.popularity,
              genres: artist.genres,
            };
          })
        );
      },
      (err) => {
        console.error(err);
      }
    );
  }, [playingTrack]);

  const uniqueWordsArray = (str) => {
    return str
      .toLowerCase()
      .replace(/\b(the|to|in|on|a|an)\b/gi, "")
      .replace(/[^A-Za-z0-9\s]/g, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");
  };

  const uniqueWordsCount = (str) => {
    let wordsArr = uniqueWordsArray(str);
    let count = 0;
    let currentWords = [];
    for (let i = 0; i < wordsArr.length; i++) {
      if (!currentWords.includes(wordsArr[i])) {
        currentWords.push(wordsArr[i]);
        count++;
      }
    }
    return count;
  };

  const uniqueWordsObj = (str) => {
    let wordsObj = {};
    //remove words "the", "to", "in", "on", "a", "an"
    //remove punctuation
    //remove extra spaces
    let words = str
      .toLowerCase()
      .replace(/\b(the|to|in|on|a|an|is)\b/gi, "")
      .replace(/[^A-Za-z0-9\s]/g, "")
      .replace(/\s{2,}/g, " ")
      .split(" ");

    words.forEach((word) => {
      wordsObj[word]= word;
    });

    for (let j = 0; j < words.length; j++) {
      if (words[j] === wordsObj[words[j]]) {
        wordsObj[words[j]] = 0;
      }
      wordsObj[words[j]]++;
    }
    console.log(wordsObj);
    return wordsObj;
  };

  let lyricsCountObj = uniqueWordsObj(lyrics);
  console.log(lyricsCountObj)

  let text = Object.keys(lyricsCountObj)
  let values = Object.values(lyricsCountObj)

  const createWordCloudData = (text, values) => {
    let newArr = [];
    for (let i = 0; i < text.length; i++) {
      newArr.push({
        text: text[i],
        value: values[i]
      })
    }

    return newArr
  }

  const wordCloudData = createWordCloudData(text, values)
  console.log(wordCloudData)


  return (
    <div className="container flex justify-evenly text-center mt-4" style={{ whiteSpace: "pre" }}>

      <div className="flex-col">
      <div className="m-auto w-36 mt-16">
        <img className="object-scale-down" src={playingTrack.largestAlbumUrl} />
      </div>
      <div className="mb-8">
        <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400  to-indigo-500">{playingTrack.title}</div>
        <a href={artist.uri}>
        <div>By: {playingTrack.artist}</div>
        </a>
      </div>
      <div className="bg-gray-800 rounded-md w-48 m-auto border-neutral-500">
        {lyrics === "No lyrics found" ? (
          <div>No lyrics found</div>
        ) : (
          <div className = "text-xl bg-gradient-to-r from-pink-500  to-indigo-500 rounded-md p-2">
            {/* {" "} */}
            Unique Words: {uniqueWordsCount(lyrics)} <br></br>
          </div>
        )}
      </div>

      <div className="-m-5">
        <WordCloud wordCloudData={wordCloudData}/>
      </div>


      </div>

      <div className="flex justify-center">
      <div className="-mt-1">
        {/* <div>{playingTrack.artist}</div> */}
        <div className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400  to-indigo-500">
        Related Artists:</div>
        <div id="my_dataviz">
          <RelatedArtists artist={artist} relatedArtists={relatedArtists} playingTrack={playingTrack}/>
        </div>
      </div>
      </div>


    </div>
  );
};

export default EachSong;
