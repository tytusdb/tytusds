import React from 'react';
import ReactFlow, { Background, MiniMap, Handle,ReactFlowProvider } from 'react-flow-renderer';

const customNodeStyles = {
    background: 'green',
    color: '#FFF',
    padding: 10,
  };
  
  const CustomNodeComponent = ({ data }) => {
    return (
      <div style={customNodeStyles}>
        <Handle type="target" position="left" style={{ borderRadius: 0 }} />
        <Handle type="source" position="right" style={{ borderRadius: 0 }} />
        <div>{data.text}</div>
      </div>
    );
  };
  
  const nodeTypes = {
    special: CustomNodeComponent,
  };

export default function GraficaLinealizado(props) {
    let elements = props.estructura.graficarMatriz()
    
    if(props.estructura.vector != null){
        elements = props.estructura.graficarVector()
        if(props.valorBusqueda != ""){
            let splitarr = props.valorBusqueda.split(",")
            let i = splitarr[0]
            let j = splitarr[1]
            elements = props.estructura.graficarVector(i,j,props.nombre)
        }
    }
    return (
        <div style={{ height: 500 }}>
          < ReactFlowProvider >
                <ReactFlow elements={elements} nodeTypes={nodeTypes}>
                <Background
                variant="dots"
                gap={12}
                size={1}
                />

            <MiniMap
                    nodeStrokeColor={(n) => {
                    if (n.type === 'input') return '#0041d0';
                    if (n.type === 'selectorNode') return "red";
                    if (n.type === 'default') return "gray";
                    if (n.type === 'output') return '#ff0072';
                    if (n.type === 'special') return 'green';
                    }}
                    nodeColor={(n) => {
                    if (n.type === 'selectorNode') return "gray";
                    return '#fff';
                    }}
                />
                </ReactFlow>
            </ ReactFlowProvider >
        </div>
    )
}
