var fs = require('fs')
class Nodo{
    constructor(valor){        
        this.valor = valor;
        this.siguiente = null;
        this.id = null;
    }
}

class Pila{
    constructor(){
        this.cabeza = null;  
        this.contador = 0;   
        this.contadorPilas = 0;    
    }
    agregar(elemento){
        this.contador ++;
        let nodonuevo = new Nodo(elemento);
        nodonuevo.id = this.contador;
        if (this.cabeza == null){
            this.cabeza = nodonuevo;
            

        }else{
            nodonuevo.siguiente = this.cabeza;
            this.cabeza = nodonuevo
        }

    }


    eliminar(){
        let inicio = this.cabeza;
        this.cabeza = this.cabeza.siguiente
        return inicio;
    }

    actualizar(valoranterior, valor){
        let temporal = this.cabeza;
        if (this.cabeza == null){
            console.log("No hay nada en la lista")
            
        }else{
            while(temporal != null){
                if (temporal.valor == valoranterior){
                    temporal.valor = valor;
                }
                temporal = temporal.siguiente;                

            }
        }
    }
    

    buscar(valor){
        let temporal = this.cabeza;
        if (this.cabeza == null){
            console.log("No hay nada en la lista")
            
        }else{
            while(temporal != null){
                if (temporal.valor == valor){
                    return temporal;
                }
                temporal = temporal.siguiente;                

            }
        }

    }

    cargar(arreglo) {
        
        arreglo.map(e => {
            this.agregar(e)
        })
    }

    guardar(){
        let archivojs=[];
        let temporal = this.cabeza;
        while (temporal != null){
            archivojs[temporal.id] = temporal.valor;
            temporal = temporal.siguiente;
            
        }
       return archivojs
    }	

    Recorrido(datoBuscar){
        let arreglo = []
        let temporal = this.cabeza;
        let contador = 0
        if (this.cabeza == null){
            console.log("No hay nada en la lista")
            
        }else{
            while(temporal != null){
                let dato = {id: contador, label: temporal.valor.toString(),}
                arreglo[contador] = dato

                if (temporal.valor == datoBuscar){
                    let dato = {id: contador, label: temporal.valor.toString(),  color: "lime"}
                    arreglo[contador] = dato
                }
                temporal = temporal.siguiente;   
                contador++              

            }
        }
        return arreglo
    }

    
   	
 }

 export default Pila;