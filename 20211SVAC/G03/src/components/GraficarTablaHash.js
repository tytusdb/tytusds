import React from 'react';
import ReactFlow, { Background, MiniMap } from 'react-flow-renderer';

const elements = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 100, y: 25 },
    connectable: false,
  },
  // default node
  {
    id: '2',
    type: 'default',
    targetPosition: 'left',
    sourcePosition: 'right',
    data: { label: 'hola' },
    connectable: false,
    position: { x: 300, y: 25 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 500, y: 25 },
  },
  {
    id: '4',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 100, y: 100 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-3', source: '1', target: '4' },
];

export default () => (
  <div style={{ height: 500 }}>
    <ReactFlow elements={elements} >
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
        }}
        nodeColor={(n) => {
          if (n.type === 'selectorNode') return "gray";
          return '#fff';
        }}
      />
    </ReactFlow>
  </div>
);