class Nodo{

    constructor(dato){
        this.dato = dato;
        this.siguiente = null;
    }

    get_dato(){ return this.dato; }
    set_dato(dato){ this.dato = dato; }

    get_siguiente(){ return this.siguiente; }
    set_siguiente(siguiente){ this.siguiente = siguiente; }
}

module.exports = Nodo;