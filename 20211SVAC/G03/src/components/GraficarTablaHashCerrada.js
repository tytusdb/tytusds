import React from 'react';
import ReactFlow, { Background, MiniMap, Handle,ReactFlowProvider } from 'react-flow-renderer';


const customNodeStyles = {
    background: "#EEBF1D",
    padding: 0,
    height: "40px"
  };
  
  const divnodo = {
  
  float:"left",
  border:"1px solid black",
  margin:"5px",
  padding: "5px"
  
  }
  
  const CustomNodeComponent = ({ data }) => {
    return (
      <div style={customNodeStyles}> 
      <Handle type="target" position="top" style={{ borderRadius: 0 }} />
      <Handle type="source" position="bottom" style={{ borderRadius: 0 }} />
    
        <div style={divnodo}>{data.text}</div>
        <div style={divnodo}>{data.nodo}</div>
      
      </div>
    );
  };
  
  const nodeTypes = {
    special: CustomNodeComponent,
  };

export default function GraficarTablaHashCerrada(props) {
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
