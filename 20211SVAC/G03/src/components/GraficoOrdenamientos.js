import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
  } from "recharts";

import './GraficoOrdenamiento.css'



  let data;


let duration = 10000; 


export default function GraficoOrdenamientos(props) {
    
  data = props.arreglo

    return (
        <div className="grafico">
        
        <BarChart
          width={1000}
          height={600}
          data={data} 
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          
        >
         
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={Number} fill="#8884d8" animationDuration={duration}/>
        </BarChart>
    
        
        </div>
      );
}
