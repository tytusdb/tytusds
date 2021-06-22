import * as Chart from "chart.js";
import * as $ from "jquery";
export class Burbuja{
     
     public arregloBurbuja: any

    ordenamiento_burbuja(arregloEnviado) {
       
       this.arregloBurbuja = arregloEnviado.slice();
   
       for (var i =0; i<(this.arregloBurbuja.length - 1); i++) {
           for (var j = 0; j < (this.arregloBurbuja.length - i); j++) {
               if(this.arregloBurbuja[j]> this.arregloBurbuja[j+1]){
                   var aux = this.arregloBurbuja[j];
                   this.arregloBurbuja[j] = this.arregloBurbuja[j+1]
                   this.arregloBurbuja[j+1] = aux;
                   console.log(aux)
                   
               }
           }
       }
       
      // console.log(this.arregloBurbuja)

       return this.arregloBurbuja;
   }



   generarJSON() {
    
    let data = {
        categoria: "Estructura Lineal",
        nombre: "ordenamiento",
        valores: []
    }
    
    for (let index = 0; index < this.arregloBurbuja.length; index++) {
        data.valores.push(this.arregloBurbuja[index])
        
    }



    return JSON.stringify(data)
}
   
   
}
