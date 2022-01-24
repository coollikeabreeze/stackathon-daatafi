import React from "react";
import { useState } from "react";

const EachSong = (props) => {

  const lyrics = props.lyrics

  const uniqueWordsCount = (str) => {
    let wordsObj = {};

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

 console.log(uniqueWordsCount(lyrics))

  return (
    <div className="text-center" style={{ whiteSpace: 'pre' }}>
    {lyrics}
    </div>
  )
}

export default EachSong
