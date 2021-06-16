import React from "react";


let array2 = [5,2,4,6,1,3];
function selectionSort(array){
    let n = array.length;

    for (let i = 0; i< n; i++){ //Aquí vamos a buscar el número mínimo en el array que no está ordenado
        let min = i;
        for (let j = i+1;j < n ; j++){
            if(array [j] < array[min]){
                min = j;
            }
        }
        if(min != i){
            let tmp = array[i];
            array[i]= array[min];
            array[min] = tmp;
        }
    }
    return array;

}


const Seleccion = () =>{
    return (
        <div>
            <h1>Aquí va el ordenamiento de Seleccion</h1>
            <h2>5,2,4,6,1,3</h2>
            <h3>{selectionSort(array2)}</h3>

        </div>
    );
}

export default Seleccion;