import React from 'react'
import Graph from "react-graph-vis";

export default function GraficaListaCircular(props) {

    let nodosAfuera = props.edd.Recorrido()
    if(props.buscar != ""){
      nodosAfuera = props.edd.Recorrido(props.buscar)
    }
    let edgefuera =[]

    for (let i = 0; i < nodosAfuera.length-1; i++) {
        let edge = {from:i, to:i+1}
        edgefuera[i] = edge

        if(i == nodosAfuera.length-2){
            let edge = {from:nodosAfuera.length-1, to:0}
            edgefuera[nodosAfuera.length-1] = edge
        }
        
    }

    if(props.nombre == "Lista circular doblemente enlazada"){
        let contador = nodosAfuera.length
        for (let i = 0; i < nodosAfuera.length-1; i++) {
            let edge = {from:i+1, to:i}
            edgefuera[contador] = edge
            contador++
            if(i == nodosAfuera.length-2){
                let edge = {from:0, to:nodosAfuera.length-1}
                edgefuera[contador] = edge
            }
        }
    }
    console.log(edgefuera)

    const graph = {
        nodes: nodosAfuera.map((node, index, arr) => {
            const angle = 2 * Math.PI * (index / arr.length + 0.75);
            node.x = 1000 * Math.cos(angle);
            node.y = 1000 * Math.sin(angle);
            if (index % 2 === 0) {
              node.value = index + 1;
            }
            return node;
        }),

        edges: edgefuera
      };
     


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
