class quicksort{
    quicksort(arreglo,i,j){
        var index;

        if(arreglo.length >1){
            index = this.particion(arreglo,i,j);
            if(i<index - 1){
                quicksort(arreglo,i, index - 1);
            }
            if(index<j){
                quicksort(arreglo,index, j);
            }
        }
        return arreglo;
    }

    intercambiar(arreglo, i, j){
        var temp = arreglo[i];
        arreglo[i]=arreglo[j];
        arreglo[j]=temp;
    }

    particion(arreglo, i ,j){

        var pivot = arreglo[Math.floor((j + i)/2)]

        while(i<=j){
            while(arreglo[i]<pivot){
                i++;
            }
            while(arreglo[j]>pivot){
                j--;
            }
            if (i>=j)   return j;
            this.intercambiar(arreglo,i,j)
            i++;
            j--;
        }
        return i;
    }
}

export default quicksort;
