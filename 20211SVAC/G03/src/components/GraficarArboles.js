import React from 'react'
import { Graphviz } from 'graphviz-react';

export default function GraficarArboles(props) {
    const dot = props.estructura.graficar();
    return (
        <div>
            <Graphviz dot={dot} options={{zoom:true,height: 500,width: 500}} />
        </div>
    )
}
