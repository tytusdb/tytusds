import React from 'react'
import VisNetwork from 'vis-network-react'

const options = {
    autoResize: false,
    edges:{
        color: "010101",
        arrows:{
            to:{ enabled:true },
            from:{ enabled: true, },
        },
        shadow: true
    },
    nodes:{
        widthConstraint:100,
        shape: 'box',
        shadow: true,
        color: "#B5EAD7",
        border: 2
    },
    interaction: {
        dragNodes :false
    },
    physics: {
        enabled: false,
    },
    layout: {
        hierarchical: {
            levelSeparation: 80,
            nodeSpacing: 180,
            parentCentralization: false,
            direction: 'DU',        // UD, DU, LR, RL
            sortMethod: 'hubsize',  // hubsize, directed
            shakeTowards: 'roots'  // roots, leaves                        
        },
    }
};

function hash(info){
    return (
        <div style={{ height: "750px", width: "1200 px", border: "1px" }}>
            <VisNetwork data= {info} options = {options} />
        </div>
    );
}

export default hash;