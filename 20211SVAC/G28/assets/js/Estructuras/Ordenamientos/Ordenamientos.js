function Burbuja(lista){
        numeros = lista;
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

function Seleccion(lista){
        numeros = lista;
        for (i = 0; i<numeros.length-1; i++){
            menor = 0;
            for (j = i+1; j<numeros.length; j++){
                if(numeros[menor]>numeros[j]){
                    menor = j;
                }
            }
            temporal = numeros[i];
            numeros[i] = numeros[menor];
            numeros[menor] = temporal;
        }
        return numeros;
    }

function Insercion(lista){
        numeros = lista;
        for(i=0; i<numeros.length; i++){
            auxiliar = numeros[i];
            j = i;
            while(j>0 && numeros[j-1]>auxiliar){
                numeros[j] = numeros[j-1];
                j--;
            }
            numeros[j] = auxiliar;
        }
        return numeros;
    }

function Quicksort(a){
        primero = 0;
        ultimo = a.length-1;
        central = (primero+ultimo)/2;
        pivote = a[central];
        i = primero, j = ultimo;
        do{
            while(a[i]<pivote){ i++}
            while(a[j]>pivote){ i++}
            if(i<=j){
                aux = a[i];
                a[i] = a[j];
                a[j] = auxiliar;
                i++;
                j++;
            }
        }while (i<=j);
        if(primero<j){
            this,Quicksort(a, primero, j);
        }
        if(i<ultimo){
            this.Quicksort(a, i, ultimo);
        }
        return a;
    }
    

module.exports = Burbuja;