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

export default function GraficarTablaHash(props) {
    console.log(props.estructura.graficar())
    let elements = props.estructura.graficar()

    if(props.valorBusqueda != ""){
         elements = props.estructura.graficar(props.valorBusqueda)
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
