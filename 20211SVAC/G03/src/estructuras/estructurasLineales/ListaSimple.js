class Nodo {
    constructor(valor){
        this.valor = valor;
        this.siguiente = null;
        this.anterior =  null;
    }
   
}
class ListaSimple{
   

    constructor(){
       this.primero = null;               
       this.contador = 0; 
       var contadorListas;
       const fs = require("fs");       
    }   


    agregar(elemento) {
        //crear un nodo para agregar a la lista
        let nodo = new Nodo(elemento)
        this.contador++;
        if (this.primero == null) {
            this.primero = nodo;

        }
        else {
            // Busca el final del arreglo e ingresa el nodo ahi
            let temporal = this.primero;
            while (temportal.siguiente != null) {
                temporal = temporal.siguiente;

            }
            nodo.id = contador;
            temporal.siguiente = nodo;
        }

    }
 
  
}
module.export = ListaSimple;
