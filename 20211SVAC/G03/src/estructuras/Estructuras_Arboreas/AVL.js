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

    _agregar(valor, temporal) {
        if (temporal == null) {
            return new Nodo(valor);
        }
        else {
            /*cuando el valor sea menor al valor del nodo temporal, recursivamente
 hasta que sea nulo se desplaza hacia la izquierda, en caso contrario,
 si es mayor, se desplaza hacia la derecha*/
            if (valor < temporal.valor) {
                temporal.izquierda = this._agregar(valor, temporal.izquierda);
                if ((this.altura(temporal.izquierda) - this.altura(temporal.derecha)) == 2) {
                    if (valor < temporal.izquierda.valor) {
                        temporal = this.r_izquierda(temporal);
                    } else {
                        temporal = this.r_dobleizquierda(temporal);
                    }
                }
            } else if (valor > temporal.valor) {
                temporal.derecha = this._agregar(valor, temporal.derecha);
                if ((this.altura(temporal.derecha) - this.altura(temporal.izquierda)) == 2) {
                    if (valor > temporal.derecha.valor) {                        
                        temporal = this.r_derecha(temporal);
                    }else{
                        temporal = this.r_doblederecha(temporal);

                    }

                }
            }else{
                //si el valor a agregar ya existe
                nodo.valor = valor;
            }
        }
//altura del nodo a insertar
        let al_der = this.altura(temporal.derecha);
        let al_izq = this.altura(temporal.izquierda);
        temporal.altura = this.MAX(al_der,al_izq)+1
        return temporal;
 
    }


    r_izquierda(nodo) {
        let aux; 
        aux = nodo.izquierda;
        nodo.izquierda = aux.derecha;
        aux.derecha = nodo;
        nodo.altura = this.MAX(this.altura(nodo.derecha), this.altura(aux.izquierda)) +1;
        aux.altura = this.MAX(this.altura(aux.izquierda),nodo.altura) + 1;
        return aux;

    }


    r_derecha(nodo) {
        let aux;
        aux = nodo.derecha;
        nodo.derecha = aux.izquierda;
        aux.izquierda = nodo;
        nodo.altura = this.MAX(this.altura(nodo.derecha), this.altura(nodo.izquierda))+ 1;
        aux.altura = this.MAX(this.altura(aux.derecha), aux.altura) + 1;
        return aux;

    }


    r_dobleizquierda(nodo) {
        nodo.izquierda =  this.r_derecha(nodo.izquierda);
        return this.r_izquierda(nodo)

    }


    r_doblederecha(nodo) {
        nodo.derecha = this.r_izquierda(nodo.derecha);
        return this.r_derecha(nodo)
    }
    

    cargar(arreglo) {
        
        arreglo.map(e => {
            this.agregar(e)
        })
    }
    
}
module.exports.ArbolAVL = ArbolAVL;


