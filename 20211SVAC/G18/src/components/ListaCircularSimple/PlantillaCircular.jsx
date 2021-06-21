import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import StyledNode from './StyledNode'
import { Flowpoint, Flowspace } from 'flowpoints';




function PlantillaCircular({texto}) {


    return (

        <Flowspace>
            <Flowpoint
                key="point_a"
                theme="indigo"
                variant="outlined"
                outputs={{
                    "point_b": {
                        output: "right",
                        input: "left",
                        outputColor: "#0c00ff",
                        inputColor: "#ff0022",
                        markerStart: false,
                        markerEnd: true,
                        onClick: (key_a, key_b, e) => {
                            console.log('Click connection ' + key_a + ' -> ' + key_b)
                        }
                    }
                }}
                style={{ backgroundColor: 'lightblue' }}
                startPosition={{ x: 250, y: 100 }}
                selected={false}
                snap={{ x: 10, y: 10 }}
                dragX={true}
                dragY={true}
                minX={50}
                minY={50}
                width={100}
                height={40}
                onClick={(e) => { console.log('Click!') }}
                onDrag={(position) => { console.log('Drag', position) }}
                onHover={(isHovering) => { console.log(isHovering ? 'Hovering' : 'Not hovering') }}>
                {texto}
            </Flowpoint>

            <Flowpoint
                key="point_b"
                theme="indigo"
                variant="outlined"
                outputs={{
                    "point_c": {
                        output: "right",
                        input: "left",
                        outputColor: "#0c00ff",
                        inputColor: "#ff0022",
                        markerStart: false,
                        markerEnd: true,
                        onClick: (key_a, key_b, e) => {
                            console.log('Click connection ' + key_a + ' -> ' + key_b)
                        }
                    }
                }}
                style={{ backgroundColor: 'lightblue' }}
                startPosition={{ x: 450, y: 100 }}
                selected={false}
                snap={{ x: 10, y: 10 }}
                dragX={true}
                dragY={true}
                minX={50}
                minY={50}
                width={100}
                height={40}
                onClick={(e) => { console.log('Click!') }}
                onDrag={(position) => { console.log('Drag', position) }}
                onHover={(isHovering) => { console.log(isHovering ? 'Hovering' : 'Not hovering') }}>
                HUECO{texto}
            </Flowpoint>

        </Flowspace >


    )
}

export default PlantillaCircular