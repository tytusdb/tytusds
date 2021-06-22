var fs = require('fs')
class Nodo {
    constructor(valor){
        this.valor = valor;
        this.siguiente = null;        
    }
   
}
class ListaSimple{  

    constructor(){
       this.primero = null;             
    }  

    

    agregar(elemento) {
        //crear un nodo para agregar a la lista
        let nodo = new Nodo(elemento)        
        if (this.primero == null) {
            this.primero = nodo;

        }
        else {
            // Busca el final del arreglo e ingresa el nodo ahi
            let temporal = this.primero;
            while (temporal.siguiente != null) {
                temporal = temporal.siguiente;
            }            
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
                            let siguienteT = temporal.siguiente;
                            temporal.siguiente = siguienteT.siguiente;
                            siguienteT.siguiente = null;
                            return;
                        }
                    }
                }
                temporal = temporal.siguiente;
            }
        }
    }


    actualizar(id, valor) {
        if (this.primero == null) {
            console.log("No hay nada en las lista")
        }
        else {
            let temporal = this.primero;
            while (temporal != null) {
                if (temporal.valor == id) {
                    temporal.valor = valor;
                }
                temporal = temporal.siguiente;
            }
        }
    }



    buscar(valor) {
        if (this.primero == null  ) {
            console.log("no hay elementos en la lista");           

        }
        else {
            let temporal = this.primero;
            while(temporal != null){ 
                if(temporal.valor == valor){
                    return temporal;  
                }
                temporal = temporal.siguiente;
            }
        }
    }


    cargar(arreglo) {        
        arreglo.map(elemento => {
            this.agregar(elemento);
        });
        

    }
    guardar() {
        
        let contadorListas
        contadorListas ++;
        let archivojs;
        let temporal = this.primero;
        while (temporal != null){
            archivojs[temporal.id] = temporal.valor;
            temporal = temporal.siguiente;
            
        }
        let json = JSON.stringify(archivojs)
        let nombre = "ListaSimple";
        fs.writeFile(nombre, json)
        
    }

    Recorrido(datoBuscar){

        let arreglo = []
        let contador = 0;
        let temporal = this.primero;
            while(temporal != null){ 
                let dato = {id: contador, label: temporal.valor.toString(),}
                arreglo[contador] = dato

                if(temporal.valor == datoBuscar){
                    
                    let dato = {id: contador, label: temporal.valor.toString(),  color: "lime"}
                    arreglo[contador] = dato
                }
                temporal = temporal.siguiente;
                contador++;
            }

            return arreglo;

    }
  
}
export default ListaSimple;
