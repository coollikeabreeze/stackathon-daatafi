import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SearchResults = (props) => {

  const track = props.track
  const chooseTrack = props.chooseTrack

  const handlePlay = () => {
    chooseTrack(track)
  }

  return (
    <tr
    style={{ cursor:"pointer"}}
    onClick={handlePlay}>
      <td className="px-8 py-2 border-t border-gray-600 p-8">
        <img src={track.albumUrl}/></td>
      <td className="px-8 py-2 border-t border-gray-600 p-8">
        <div>{track.title}</div>
        <div className="text-gray-400">{track.artist}</div>
      </td>
      <td className="px-8 py-2 border-t border-gray-600 p-8">{track.popularity}</td>
      </tr>


    // <div
    // style={{ cursor:"pointer"}}
    // onClick={handlePlay}>
    //   <div className="px-8 py-2 border-t border-gray-600 p-8">
    //     <img src={track.albumUrl}/></div>
    //   <div className="px-8 py-2 border-t border-gray-600 p-8">
    //     <div>{track.title}</div>
    //     <div className="text-gray-400">{track.artist}</div>
    //   </div>
    //   <div className="px-8 py-2 border-t border-gray-600 p-8">{track.popularity}</div>
    //   </div>

  );
};

export default SearchResults;
