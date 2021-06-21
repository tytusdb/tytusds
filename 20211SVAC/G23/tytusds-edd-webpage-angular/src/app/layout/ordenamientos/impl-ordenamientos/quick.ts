function quick(arreglo,primero,ultimo){
    let i,j,pivote,aux
    i = primero
    j = ultimo
    pivote = arreglo[(primero+ultimo)/2]
    do{
        while(arreglo[i] < pivote){
            i++
        }
        while(arreglo[j] > pivote){
            j--
        }
        if(i <= j){
            aux = arreglo[i]
            arreglo[i] = arreglo[j]
            arreglo[j] = aux
            i++
            j--
        }
    }while(i <= j)
    if (primero < j){
        quick(arreglo,primero,j)
    }
    if (i < ultimo){
        quick(arreglo,i,ultimo)
    }
}
var x = [15,2,65,35,15,8,66,22,11]
quick(x,0,x.length-1)
console.log(x)