class Nodo {
    constructor(dato, prioridad){
        this.dato = dato
        this.prioridad = prioridad
        this.siguiente = null
    }
}

class ColaPrioridad {
    constructor(){
        this.primero = null
        this.ultimo = null
        this.longitud = 0 
    }
}


export default ColaPrioridad;