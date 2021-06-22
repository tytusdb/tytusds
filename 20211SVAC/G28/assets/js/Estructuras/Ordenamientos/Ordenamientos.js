class Ordenamientos {

    Burbuja(numeros){
        for (i = 0; i<numeros.length-1; i++){
            for (j = i+1; j<numeros.length; j++){
                if(numeros[i]>numeros[j]){
                auxiliar = numeros[i];
                numeros[i] = numeros[j];
                numeros[j] = auxiliar;
                }
            }
        }
        return numeros;
    }

    

}