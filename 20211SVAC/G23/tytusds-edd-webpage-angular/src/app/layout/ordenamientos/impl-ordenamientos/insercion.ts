/*export function num(arr){
    const l = arr.length;
    let j, temp;

    for ( let i = 1; i < l; i++ ) {
        j = i;
        temp = arr[ i ];
        while ( j > 0 && arr[ j - 1 ] > temp ) {
            arr[ j ] = arr[ j - 1 ];
            j--;
        }
        arr[ j ] = temp;
    }

    return arr;
}*/
export function insercion(arreglo,n){
    let i,j,aux
    for(i = 1; i < n; i++){
        aux = arreglo[i]
        j = i-1
        while(j >= 0 && arreglo[j] > aux){
            arreglo[j+1] = arreglo[j]
            j = j-1
        }
        arreglo[j+1] = aux
    }
    console.log("ARREGLO ORDENADO POR INSERCION")
}
var vector = []
