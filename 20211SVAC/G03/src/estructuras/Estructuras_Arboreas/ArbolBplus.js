class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.anterior = null;
        this.siguiente = null;
        this.rama_Izq = null;
        this.rama_Der = null;
    }
}

class Rama {
    constructor() {
        this.hoja = true;
        this.indice = null;
        this.ramaContinua = null;
        this.contador = 0;
        this.ramaPadre = null;
    }

    
}

class ArbolBplus {
    constructor(orden) {
        this.orden = orden;
        this.NodoAux = null;
        this.raiz = null;

    }
    

}
module.exports.ArbolBplus = ArbolBplus;