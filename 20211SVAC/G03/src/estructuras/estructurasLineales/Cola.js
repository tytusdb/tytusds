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

}

export default Cola;