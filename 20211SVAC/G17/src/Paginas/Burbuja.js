import React from "react";

var arreglo =[23,4,6,7,10,11,4545,20,80,90]

function burbuja(arr){
    for(let j=0; j<arr.length; j++){
        for (let i =0; i< arr.length; i++){
            if(arr[i]<arr[i+1]){
                var temp = arr[i];
                arr[i]= arr[i+1];
                arr[i+1] =temp;
            }
        }
    }
    return arr;
}


const Burbuja = () =>{
    return (
        <div>
            <h1>Aquí va el ordenamiento de burbuja</h1>
            <h2>23,4,6,7,10,11,4545,20,80,90</h2>
            <h3>{burbuja(arreglo)}</h3>

        </div>
    );
}

export default Burbuja;