import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SearchResults = (props) => {

  const searchResults = props.searchResults
  const chooseTrack = props.chooseTrack

  const handlePlay = () => {
    chooseTrack(track)
  }

  return (

      <div className="container m-6 ">
      <h1>Search Results</h1>
        <table className="table-fixed rounded-sm border-collapse bg-gray-900">
          <thead>
            <tr className="px-8 py-1 bg-gray-500">
              <td className=" px-8 py-2">Track</td>
              <td className="w-80 px-8 py-2"></td>
              <td className="px-8">Popularity</td>
            </tr>
          </thead>
          <tbody className=" items-center justify-between overflow-y-scroll">
          {searchResults.map((track,idx) => (
          <tr key={idx} className=" items-center justify-between overflow-y-scroll" style={{cursor:"pointer"}}onClick={handlePlay}>
            <td className="px-8 py-2 border-t border-gray-600 p-8">
              <img src={track.albumUrl}/></td>
            <td className="px-8 py-2 border-t border-gray-600 p-8">
              <div>{track.title}</div>
              <div className="text-gray-400">{track.artist}</div>
            </td>
            <td className="px-8 py-2 border-t border-gray-600 p-8">{track.popularity}</td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
  );
};

export default SearchResults;
