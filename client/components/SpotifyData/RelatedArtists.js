import { useEffect, useState } from "react";
import React from "react";
import ForceGraph from "./ForceGraph";
import ForceGraphCopy from "./ForceGraphCopy";

const RelatedArtists = (props) => {
  const relatedArtists = props.relatedArtists;
  const artist = props.artist;
  const playingTrack = props.playingTrack;

  const relatedArtistNodes = relatedArtists.map((thisArtist) => ({
    id: thisArtist.artistId,
    name: thisArtist.name,
    image: thisArtist.imageUrl,
  }));

  const relatedArtistLinks = relatedArtists.map((thisArtist) => ({
    // source: thisArtist.name,
    // target: artist.artistId,
    from: thisArtist.name,
    to: artist.artistId,
  }));

  const relatedArtistData = {
    nodes: relatedArtistNodes.concat({
      id: artist.artistId,
      centralNode: true,
      name: artist.name,
      image: artist.imageUrl,
    }),
    links: relatedArtistLinks,
  };

  return (
    // <div>
    //   {relatedArtists.map((artist) => (
    //     <div key={artist.artistId}>{artist.name}</div>
    //   ))}

      //  <ForceGraph relatedArtistData={relatedArtistData}/>
    // </div>

    // <div>

    <table className = "bg-gray-900 mb-16">
      <tbody>
      {relatedArtists.map((artist) => (
        <tr key = {artist.id} >
          <td className="border-t border-gray-600">
            <a href={artist.uri}>
            <div className="w-16">
            <img className="object-scale-down" src={artist.imageUrl}/>
            </div>
            </a>

          </td>
          <td className="w-96 border-t border-gray-600 -mt-2"><a href={artist.uri}>{artist.name}</a></td>

        </tr>
      ))}
      </tbody>
    </table>

  );
};

export default RelatedArtists;
