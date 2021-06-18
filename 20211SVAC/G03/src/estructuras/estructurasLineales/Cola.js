var fs = require('fs')
class Nodo {
    constructor(dato){
        this.dato = dato
        this.siguiente = null
    }
}

class Cola {
    constructor(){
        this.primero = null
        this.ultimo = null
        this.longitud = 0 
    }
	
	estaVacia() {
        if (this.primero == null){
            return true
        }

        return false
    }

    Agregar(dato){
        let nuevoNodo = new Nodo(dato)

        if(this.estaVacia()){
            this.primero = nuevoNodo
            this.ultimo = nuevoNodo
        }else{
            nuevoNodo.siguiente = this.primero
            this.primero = nuevoNodo
        }

        this.longitud++
    }

}

export default Cola;