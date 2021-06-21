class Nodo{

    constructor(dato) {
        this.siguiente = null;
        this.dato = dato;
        
    }

    get_siguiente(){

        return this.siguiente;
    }

    set_siguiente(siguiente){
        this.siguiente = siguiente;
    }

    get_dato(){
        return this.dato;
    }

    set_dato(dato){
        this.dato = dato;
    }
}


module.exports = Nodo;