import React from 'react'
import VisNetwork from 'vis-network-react'

const options = {
    autoResize: true,
    edges:{
        color: "010101",
        arrows:{
            to:{
                enabled:true
            }           
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
        dragNodes :true
    },
    physics: {
        enabled: true
    }
};

function circular(info){
    return (
        <div style={{ height: "750px", width: "1200 px", border: "1px" }}>
            <VisNetwork data= {info} options = {options} />
        </div>
    );
}

export default circular;