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

    agregarNodo(nodo) {
        if (this.indice == null) {
            this.indice = nodo;
            this.contador++;
        } else {
            let temporal = this.indice;
            do {
                if (nodo.valor <= temporal.valor) {
                    this.contador++;
                    if (temporal == this.indice) {
                        temporal.anterior = nodo;
                        nodo.siguiente = temporal;
                        temporal.rama_Izq = nodo.rama_Der;
                        this.indice = nodo;
                        break;
                    } else {//en caso de que no sea el indice se inserta en medio de los valores respectivos
                        nodo.anterior = temporal.anterior;
                        nodo.siguiente = temporal;
                        temporal.anterior.siguiente = nodo;
                        temporal.anterior = nodo;

                        temporal.anterior.rama_Der = nodo.rama_Izq;
                        temporal.rama_Izq = nodo.rama_Der;
                        break;

                    }
                }// insertar al final
                else if (temporal.siguiente == null) {
                    this.contador++;
                    temporal.siguiente = nodo;
                    temporal.rama_Der = nodo.rama_Izq;
                    nodo.anterior = temporal;
                    break;
                }
                temporal = temporal.siguiente;
            } while (temporal != null);
        }
    }
}

class ArbolBplus {
    constructor(orden) {
        this.orden = orden;
        this.NodoAux = null;
        this.raiz = null;

    }

/*-----------------------------------------------
-------------Inicio bloque Agregar --------------
-----------------------------------------------*/

    agregar(valor) {
        let nodo = new Nodo(valor);

        this._agregar(nodo, this.raiz)

    }
    _agregar(nodo, ramaAux) {
        if (this.raiz == null) {
            this.raiz = new Rama();
            this.raiz.agregarNodo(nodo);

        } else if (ramaAux.hoja) {
            ramaAux.agregarNodo(nodo);
            if (ramaAux.contador == this.orden) {
                this.dividirRama(ramaAux);
            }
        } else if (ramaAux.hoja == false) {
            this.buscarInsercion(nodo, ramaAux);
        }
    }
    

}
module.exports.ArbolBplus = ArbolBplus;