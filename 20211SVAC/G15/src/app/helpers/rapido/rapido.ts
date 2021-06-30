import { InjectSetupWrapper } from "@angular/core/testing";

export class rapido {


    private rapido: any
 

    partition(items, low, high) {
        var pivot = items[high]
            let i = (low - 1);
            for (let j = low; j <= high-1; j++)
            {
                if (items[j] < pivot)
                {
                    i++;   
                    let temp = items[i]; 
                    items[i] = items[j]; 
                    items[j] = temp;
              
                }
            }
        let temp = items[i+1]; 
        items[i+1] = items[high]; 
        items[high] = temp; 
        return i+1;
    }

    quickSort(items, left, right) {
        var index;
        if(left < right){
            let pi =this.partition(items, left, right);
            this.quickSort(items, left, pi-1); 
            this.quickSort(items, pi+1, right); 
        }

    }

   generarJSON(array) {
    let data = {
        categoria: "Estructura Lineal",
        nombre: "Ordenamiento",
        valores: array
    }
    return JSON.stringify(data)
}
}