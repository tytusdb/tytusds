class Nodo{
    constructor(valor){        
        this.valor = valor;
        this.siguiente = null;
        this.id = null;
    }
}

class Pila{
    constructor(){
        this.cabeza = cabeza;  
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
        inicio = this.cabeza;
        this.cabeza = this.cabeza.siguiente
        return inicio;
    }

    actualizar(id, valor){
        let temporal = this.cabeza;
        if (this.cabeza == null){
            console.log("No hay nada en la lista")
            
        }else{
            while(temporal != null){
                if (temporal.id == id){
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
        
        arreglo.array.forEach(elemento => {
            this.agregar(elemento);
        });
    }
	
   	
 }

 export default Pila;