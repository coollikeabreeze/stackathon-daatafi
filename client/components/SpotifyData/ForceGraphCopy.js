import * as React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide } from "d3-force-3d";

const ForceGraphCopy = (props) => {
  const relatedArtistData = props.relatedArtistData

  const nodes = relatedArtistData.nodes
  const edges = relatedArtistData.links


    const visJsRef = React.useRef(null);
    React.useEffect(() => {
      const network =
        visJsRef.current &&
        new Network(visJsRef.current, { nodes, edges });
      // Use `network` here to configure events, etc
    }, [visJsRef, nodes, edges]);

    return <div ref={visJsRef} />;
  };

export default ForceGraphCopy
