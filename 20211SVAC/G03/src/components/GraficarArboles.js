import React from 'react'
import { Graphviz } from 'graphviz-react';

export default function GraficarArboles(props) {
    const dot = props.estructura.graficar();
    return (
        <div>
            <Graphviz dot={dot} />
        </div>
    )
}
