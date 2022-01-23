import React from "react";
import { useState } from "react";

const DropDowns = (props) => {
  const { playlistName, playlistImage, playlistDescription, playlistUrl } =
    props.playlist;

  return (
    <div>
      <div className="container flex flex-row m-6">
        <img className="object-cover h-20 flex-" src={playlistImage} />
        <div className="container flex-col">
          <h1 className="text-3xl">{playlistName}</h1>
          <p>{playlistDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default DropDowns;
