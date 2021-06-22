import React from 'react'
import { Graphviz } from 'graphviz-react';



export default function GraficarArboles(props) {
    let dot = props.estructura.graficar();

    if(props.valorBusqueda != ""){
        dot =  props.estructura.graficar(props.valorBusqueda);
      }

    return (
        <div>
            <Graphviz dot={dot} options={{zoom:true,height: 500,width: 500}} />
        </div>
    )
}



