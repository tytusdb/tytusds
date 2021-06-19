function ordBurburja(arreglo) {
    for (var i = (arreglo.length); i > 0; i--) {
        for (var j = 0; j < i; j++) {
            if(arreglo[j]> arreglo[j+1]){
                var temp = arreglo[j];
                arreglo[j] = arreglo[j+1]
                arreglo[j+1] = temp;
            }
        }
    }
    return arreglo;
}

function seleccion(array){
    let pMax,aux
    for (let i = 0; i < array.length; i++) {
        pMax=i
        for (let j = i+1; j < array.length; j++) {
            if (array[pMax]>array[j]) {
                pMax=j
            }
        }
        aux=array[pMax]
        array[pMax]=array[i]
        array[i]=aux    
    }
    return array
}

function insercion(array){
    let aux
    for (let x=0;x<array.length;x++){
        aux=array[x]
        for (let y=x; y>0; y--){
            if(array[y]<array[y-1]){
                aux=array[y]
                array[y]=array[y-1]
                array[y-1]= aux
            }
        }
    }
    return array
}

function quicksort(array,inicio,fin){
    let indice
    if(inicio<fin){
        indice=partir(array,inicio,fin)
        quicksort(array,inicio,indice-1)
        quicksort(array,indice+1,fin)
    }
    return array
}

function partir(array,inicio,fin){
    let pivote=array[fin], i=inicio,temp,indicePivote
    for(let j=inicio; j<fin;j++){
        if(array[j]<pivote){
            temp=array[i]
            array[i]=array[j]
            array[j]=temp
            i++
        }
    }
    indicePivote= i
    temp=array[indicePivote]
    array[indicePivote]=array[fin]
    array[fin]=temp
    return indicePivote
}

function ordRapido(array){
    return quicksort(array,0,array.length-1)
}
