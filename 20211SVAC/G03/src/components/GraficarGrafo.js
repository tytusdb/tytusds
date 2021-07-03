import React from 'react'
import Graph from "react-graph-vis";

export default function GraficarGrafo(props) {

    /* let nodosAfuera = props.edd.Recorrido()
    if(props.buscar != ""){
      nodosAfuera = props.edd.Recorrido(props.buscar)
    }
    let uniones = edgeF()


    function edgeF(){
      let edgefuera = []
      for (let i = 0; i < nodosAfuera.length-1; i++) {
        let edge = {from:i, to:i+1}
        edgefuera[i] = edge
        
      }

      if(props.nombre == "Lista doblemente enlazada"){
          let contador = nodosAfuera.length-1
          for (let i = 0; i < nodosAfuera.length-1; i++) {
              let edge = {from:i+1, to:i}
              edgefuera[contador] = edge
              contador++
          }
          
      }

      return edgefuera
    }

    console.log(nodosAfuera)
    console.log(uniones) */

     var nodes = props.estructura.graficarNodos()
    
      // create some edges
      var edges = props.estructura.graficarEnlaces()

    const graph = {
        nodes: nodes,
        edges: edges
      };
     



      const diseño = {
          direction: 'LR'
      }

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
            color: "white"
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
