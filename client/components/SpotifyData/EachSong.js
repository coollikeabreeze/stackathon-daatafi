import React from "react";
import { useState } from "react";

const EachSong = (props) => {

  const lyrics = props.lyrics
  const playingTrack = props.playingTrack

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
    Unique Words: {uniqueWordsCount(lyrics)}
    This artist {playingTrack.artistId}
    </div>
  )
}

export default EachSong
