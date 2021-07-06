import React from "react";

let arreglo = [100,15,10,5,20,12,85]
function partition(arr, start, end){
    // Agarramos el último elemento como pivote
    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivotValue) {
            // Cambiamos los elementos si el número es menor
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Nos movemos al siguiente número
            pivotIndex++;
        }
    }
    // Colocamos el pivote en el centro
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
    return pivotIndex;
};
function quickSortIterative(arr) {
    //Cramos un array
    let stack = [];
    // Agregamos el array como un array desordenado
    stack.push(0);
    stack.push(arr.length - 1);

    //repetimos hasta que tengamos todos los sub arrays desordenados
    while(stack[stack.length - 1] >= 0){
    // Extraemos el top subarray desordenado
       let end = stack.pop();
        let start = stack.pop();

        let pivotIndex = partition(arr, start, end);
        console.log(pivotIndex)
        // Si hay elementos que no están ordenados a la izquierda del pivote
        // agregamos ese subarreglo a la pila para ordenarlo después
        if (pivotIndex - 1 > start){
            stack.push(start);
            stack.push(pivotIndex - 1);
        }

        // Si hay elementos que no están ordenados a la derecha del pivote
        // agregamos ese subarreglo a la pila para ordenarlo después
        if (pivotIndex + 1 < end){
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
    }
}


quickSortIterative(arreglo, 0, arreglo.length - 1)


const Rapido = () =>{
    return (
        <div>
            <h3>Aquí va el ordenamiento Rapido</h3>
            <center><h4>{arreglo.toString()}</h4></center>
        </div>
    );
}

export default Rapido;