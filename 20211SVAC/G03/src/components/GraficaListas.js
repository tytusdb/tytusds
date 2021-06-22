import React from 'react'
import Graph from "react-graph-vis";

export default function GraficaListas(props) {

    let nodosAfuera = props.edd.Recorrido()
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
    console.log(uniones)

    const graph = {
        nodes: nodosAfuera.map((node, index, arr) => {
          const angle = 2 * (index / arr.length +0.75 );
          node.x = 9000 * angle;
          node.y = 10 * angle;
          if (index % 2 === 0) {
            node.value = index + 1;
          }
          return node;
        }),

        edges: uniones
      };
     



      const diseño = {
          direction: 'LR'
      }

      const options = {
        physics: false,
        edges: {
            color: "white",
            width: 2,
            shadow: true
          },
          nodes:{
            shape:"box",
            color: "red",
            font: {
              size: 32,
              color: "#ffffff",
            },
            borderWidth: 2,
            shadow: true
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
