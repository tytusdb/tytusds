
function burbuja(arreglo){
    for(i=0;i<(arreglo.length-1);i++)
        for(j=0;j<(arreglo.length-i);j++){
            if(arreglo[j]>arreglo[j+1]){
             aux=arreglo[j];
             arreglo[j]=arreglo[j+1];
             arreglo[j+1]=aux;
        }
    }
    return arreglo
}

var arregloAOrdenar=[1000,9,111,8,1,5,4,2,99,2,3];
arregloAOrdenar=burbuja(arregloAOrdenar);
export default burbuja;
