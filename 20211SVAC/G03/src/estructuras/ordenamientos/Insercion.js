export default function Insercion(arr){
    let derecha, aux
    for (let x = 0; x < arr.length; x++) {
        derecha = x
        aux = arr[x]
        while((derecha>0) && (arr[derecha-1].ASCII > aux.ASCII)){
            arr[derecha] = arr[derecha-1]
            derecha--
        }

        arr[derecha] = aux
    }

    return arr
}