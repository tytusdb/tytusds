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

export default function GraficarAdayacencia(props) {
    let elements = props.estructura.graficarMatriz()
    let linealizado = props.estructura.graficarLista(); 
    return (
       

      <div style={{ height: 250 }}>
      <h1 style={{ color: 'white' }}>Matriz</h1>
      < ReactFlowProvider >
          <ReactFlow elements={elements} nodeTypes={nodeTypes}>
          <Background
          variant="dots"
          gap={12}
          size={1}
          />
          </ReactFlow>

      </ ReactFlowProvider >
      < ReactFlowProvider >
      <h1>Vector</h1>
          <ReactFlow elements={linealizado} nodeTypes={nodeTypes}>
          <Background
          variant="dots"
          gap={12}
          size={1}
          />
          </ReactFlow>
      </ ReactFlowProvider >
      </div>
    )
}
