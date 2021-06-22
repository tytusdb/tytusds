function Burbuja(lista){
    numeros = lista;
    for (i = 0; i<numeros.length-1; i++){
        console.log("ITERACION: "+i);
        console.log(numeros);
        for (j = i+1; j<numeros.length; j++){
            if(numeros[i]>numeros[j]){
            const auxiliar = numeros[i];
            numeros[i] = numeros[j];
            numeros[j] = auxiliar;
            console.log(numeros);
            }
        }
    }
    return numeros;
}

function Seleccion(lista){
    var numeros = lista;
    for (let i = 0; i<numeros.length-1; i++){
        console.log("ITERACION: "+i);
        console.log(numeros);
        var menor = i;
        for (let j = i+1; j<numeros.length; j++){
            if(numeros[menor]>numeros[j]){
                menor = j;
            }
        }
        const temporal = numeros[i];
        numeros[i] = numeros[menor];
        numeros[menor] = temporal;
        console.log(numeros);
    }
    return numeros;
}

function Insercion(lista){
    numeros = lista;
    for(i=0; i<numeros.length; i++){
        console.log("ITERACION: "+i);
        console.log(numeros);
        auxiliar = numeros[i];
        j = i;
        while(j>0 && numeros[j-1]>auxiliar){
            numeros[j] = numeros[j-1];
            j--;
        }
        numeros[j] = auxiliar;
        console.log(numeros);
    }
    return numeros;
}

function QuickSort(n){
    var izquierda = 0;
    var derecha = n.length-1;
    var pivote = n[izquierda];
    var i = izquierda;
    var d = derecha;
    while (i < d) {
        while (n[i] <= pivote && i < d) {
            i++;
        }
        while (n[d] > pivote) {
            d--;
        }
        if (i < d) {
            var aux = n[i];
            n[i] = n[d];
            n[d] = aux;
        }
    }
    n[izquierda] = n[d];
        n[d] = pivote;

        if (izquierda < d - 1) {
            QuickSort(n, izquierda, d - 1);
        }
        if (d + 1 < derecha) {
            QuickSort(n, d + 1, derecha);
        }
}

//var arreglo = [17, 10, 12, 7 ,11];

//console.log(QuickSort(arreglo));
//se manda  allamar cualquier ordenamiento, con un array de parametro
// y devuelve el arreglo ordenaod
//se imprimen en consola todas las iteraciones para ver como se ordena la lista