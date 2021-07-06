//Recorrido y busquedas de grafos VISJS
import React from 'react'
import VisNetwork from 'vis-network-react'

const options = {
    autoResize: true,
    edges:{
        color: "010101",
        arrows:{
            to:{ enabled:true },
            from:{ enabled: false, },
        },
        shadow: true,
        length: 400
    },
    nodes:{
        widthConstraint:100,
        shape: 'box',
        shadow: true,
        color: "#B5EAD7",
        border: 2
    },
    interaction: {
        dragNodes :true
    },
    physics: {
        enabled: true,
    }
};

function busquedaG(info){
    return (
        <div style={{ height: "750px", width: "1200 px", border: "1px" }}>
            <VisNetwork data= {info} options = {options} />
        </div>
    );
}

export default busquedaG;