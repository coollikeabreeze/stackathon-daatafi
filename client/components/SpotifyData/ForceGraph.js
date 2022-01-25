import * as React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide } from "d3-force-3d";

// const ForceGraph = (props) => {
//   const relatedArtistData = props.relatedArtistData
//   const myData = relatedArtistData
//   return (
//     <div>
//       {nodes.map(item => <div> {item.id}</div>)}
//     </div>
//   )
// }

// export default ForceGraph


export const syncLoadAllImages = (imageQueue, callback) => {
  let numAll = imageQueue.length;
  let numProcessed = 0;
  let allImages = new Map();

  if (numAll === 0) {
    callback(allImages);
    return;
  }

  imageQueue.forEach(e => {
    const image = new Image();
    const id = e.id;

    // Handle the image loading and error with the same callback.
    image.addEventListener("load", () => {
      numProcessed++;
      allImages.set(id, image);
      if (numAll === numProcessed) {
        if (callback) {
          callback(allImages);
          return;
        }
      }
    });
    image.src = e.image;
  });
};

const paintNodes = (imageMap, node, ctx, globalScale) => {
  if ((!node.x && isNaN(node.x)) || (!node.y && isNaN(node.y))) {
    return;
  }
  const image = imageMap.get(node.id);
  if (image) {
    ctx.drawImage(
      image,
      node.x - IMAGE_SIZE / 2,
      node.y - IMAGE_SIZE / 2,
      IMAGE_SIZE,
      IMAGE_SIZE
    );
  }
};

const IMAGE_SIZE = 24;
//The size of a node, determines arrow positions
const NODE_RELSIZE = IMAGE_SIZE;
//The desired zoom level of the graph
const ZOOM = 1.7;
//The distance between nodes
const FORCE_LINK_DISTANCE = IMAGE_SIZE * 10;
//Determines the distance between the nodes. Negative -> More distance
const FORCE_MANYBODIES_STRENGTH = -(IMAGE_SIZE * 4);
//Nodes intersecting each others radius will move away from each other
const FORCE_COLLIDE_RADIUS = NODE_RELSIZE * 1.5;



function returnNodes(value) {
  let finalValue = { nodes: [], links: [] };
  finalValue.nodes = value.nodes.map(node => ({
    id: node.id,
    name: node.name,
    isCentralNode: node.centralNode ? true : null,
    image: node.iamge
  }));
  let centralNode = value.nodes.find(node => node.centralNode === true);
  console.log("CentralNode [returnNodes]", centralNode);
  finalValue.links = value.nodes
    .filter(item => item.centralNode !== true)
    .map(item => {
      return {
        source: centralNode.id,
        target: item.id
      };
    });
  console.log("finalValue [returnNodes]", finalValue);
  return finalValue;
}

const ForceGraph = (props) => {
  const relatedArtistData = props.relatedArtistData
  const myData = relatedArtistData
  const linkedNodes = returnNodes(myData);

  const graphRef = React.useRef(null);
  const [imageMap, setImageMap] = React.useState(null);

  if (!imageMap) {
    //Load images before rendering the canvas
    const images = myData.nodes.map(e => ({
      id: e.id,
      image: e.image
    }));
    syncLoadAllImages(images, loadedImages => {
      setImageMap(loadedImages);

      //Apply the forces AFTER the graph has rendered the graph data
      setTimeout(() => {
        //$FlowIssue
        graphRef.current
          .d3Force("link")
          .iterations(1)
          .distance(FORCE_LINK_DISTANCE);

        //$FlowIssue
        graphRef.current
          .d3Force("charge")
          .strength(FORCE_MANYBODIES_STRENGTH)
          .distanceMin(FORCE_MANYBODIES_STRENGTH / 2)
          .distanceMax(FORCE_MANYBODIES_STRENGTH);
        //$FlowIssue

        graphRef.current.d3Force(
          "collide",
          forceCollide(IMAGE_SIZE)
            .strength(0.2)
            .iterations(1)
        );

        //graphRef.current.d3Force("center", null);
        graphRef.current.zoom(ZOOM, 0);
        graphRef.current.refresh();
      }, 0);
    });
  }

  if (!imageMap) {
    return null;
  }

    return (
      <div>
        <ForceGraph2D
          graphData={linkedNodes}
          nodeCanvasObject={(node, ctx, globalScale) =>
            paintNodes(imageMap, node, ctx, globalScale)
          }
        />
      </div>
    );
}

export default ForceGraph
