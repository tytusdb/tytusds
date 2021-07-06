import React from 'react'
import VisNetwork from 'vis-network-react'

const options = {
    autoResize: false,
    edges:{
        color: "#411811",
        shadow: true
    },
    nodes:{
       widthConstraint:50,
        shape: 'box',
        shadow: true,
        color: "#B5EAD7",
        border: 2
    },
    interaction: {
        dragNodes :false
    },
    physics: {
        enabled: false
    },
    layout: {
        hierarchical: {
            levelSeparation: 100,
            nodeSpacing: 100,
            parentCentralization: true,
            direction: 'DU',        // UD, DU, LR, RL
            sortMethod: 'directed',  // hubsize, directed
            shakeTowards: 'roots'  // roots, leaves                        
        },
    }
};

function gHuffman(info){
    return (
        <div style={{ height: "675px", width: "1200 px", border: "1px" }}>
            <VisNetwork data= {info} options = {options} />
        </div>
    );
}

export default gHuffman;