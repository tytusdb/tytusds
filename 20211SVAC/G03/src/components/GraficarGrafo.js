import React from 'react'
import Graph from "react-graph-vis";

export default function GraficarGrafo(props) {

    var nodes = props.estructura.graficarNodos()
    if(props.valorBusqueda != ""){
        nodes = props.estructura.graficarNodos(props.valorBusqueda)
    }
    // create some edges
    var edges = props.estructura.graficarEnlaces()

    const graph = {
        nodes: nodes,
        edges: edges
      };

      const options = {
        physics: {
            forceAtlas2Based: {
              gravitationalConstant: -26,
              centralGravity: 0.005,
              springLength: 230,
              springConstant: 0.18,
            },
            maxVelocity: 146,
            solver: "forceAtlas2Based",
            timestep: 0.35,
            stabilization: { iterations: 150 },
          },
        edges: {
            color: "white",
            width: 2,
            shadow: true
          },
          nodes:{
            shape: "dot",
            size: 16,
            color: "red",
            font: {
              color: "#ffffff",
            }
        },
        interaction: {
          navigationButtons: true,
          keyboard: true,
        }
        ,
        height: "500px"
      };
     
      const events = {
        select: function(event) {
          var { nodes, edges } = event;
        }
      };
      return (
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      );
}
