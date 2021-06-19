export class Burbuja{

    ordenamiento_burbuja(arregloEnviado) {
       
       var arregloBurbuja = arregloEnviado.slice();
   
       for (var i = (arregloBurbuja.length - 1); i >= 0; i--) {
           for (var j = 0; j < i; j++) {
               if(arregloBurbuja[j]> arregloBurbuja[j+1]){
                   var aux = arregloBurbuja[j];
                   arregloBurbuja[j] = arregloBurbuja[j+1]
                   arregloBurbuja[j+1] = aux;
                   
               }
           }
       }
       
       
       return arregloBurbuja;
   }
   
   
}
