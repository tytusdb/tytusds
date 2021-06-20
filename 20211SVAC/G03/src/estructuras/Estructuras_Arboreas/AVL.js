class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.derecha = null;
        this.izquierda = null;
        this.altura = 0;
    }

}

class ArbolAVL {
    constructor() {
        this.raiz = null;

    }

    MAX(valor1, valor2) {
        if (valor1 > valor2) {
            return valor1;
        } else {
            return valor2;
        }
    }

    altura(nodo) {
        if (nodo == null) {
            return -1;
        }
        else {
            return nodo.altura;
        }

    }


    agregar(valor) {
        //inserta la raiz como un nodo temporan inicial
        this.raiz = this._agregar(valor, this.raiz)

    }

    
}
module.exports.ArbolAVL = ArbolAVL;


