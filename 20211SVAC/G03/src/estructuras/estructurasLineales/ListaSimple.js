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

    eliminar(elemento) {
        if (this.primero == null) {
            console.log("No hay nada en las lista")
        }
        else {
            let temporal = this.primero;
            while (temporal != null) {
                if (temporal.valor == elemento) {
                    temporal = temporal.siguiente;
                }
                else {
                    if (temporal.siguiente != null) {
                        if (temporal.siguiente.valor == elemento) {
                            siguienteT = temporal.siguiente;
                            temporal.siguiente = siguienteT      .siguiente;
                            siguiente.siguiente = null;
                            return;
                        }
                    }
                }
                temporal = temporal.siguiente;
            }
        }
    }



 
  
}
module.export = ListaSimple;
