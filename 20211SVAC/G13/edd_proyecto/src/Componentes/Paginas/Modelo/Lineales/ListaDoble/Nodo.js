class Nodo{

    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }

    get_dato(){ return this.dato; }
    set_dato(dato){ this.dato = dato; }

    get_siguiente(){ return this.siguiente; }
    set_siguiente(siguiente){ this.siguiente = siguiente; }
    
    get_anterior(){ return this.anterior; }
    set_anterior(anterior){ this.anterior = anterior; }
}

module.exports = Nodo;