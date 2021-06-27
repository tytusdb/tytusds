class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ABB {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        this.raiz = this.add(valor, this.raiz);
    }

    add(valor, nodo) {
        if (nodo == null) {
            return new Nodo(valor);
        } else {
            if (valor > nodo.valor) {
                nodo.derecho = this.add(valor, nodo.derecho);
            } else {
                nodo.izquierdo = this.add(valor, nodo.izquierdo);
            }
        }
        return nodo;
    }

    preOrden() {
        this.pre_orden(this.raiz);
    }

    pre_orden(nodo) {
        if (nodo != null) {
            console.log("Valor:", nodo.valor);
            this.pre_orden(nodo.izquierdo);
            this.pre_orden(nodo.derecho);
        }
    }

    inOrden() {
        console.log("Recorrido inOrden: ");
        this.in_orden(this.raiz);
    }

    in_orden(nodo) {
        if (nodo != null) {
            this.in_orden(nodo.izquierdo);
            console.log("Valor:", nodo.valor);
            this.in_orden(nodo.derecho);
        }
    }


    seek(valor) {
        let raiz = this.raiz;
        raiz = this.existe(raiz, valor);
        if (raiz == true) {
            console.log("Valor encontrado: " + valor);
            return valor
        } else {
            console.log("Valor no existe: " + valor);
            return null
        }
    }

    existe(nodo, valor) {
        if (nodo == null) {
            return false
        }
        else if (valor === nodo.valor) {
            return true
        }
        else if (valor < nodo.valor) {
            return this.existe(nodo.izquierdo, valor)
        }
        else if (valor > nodo.valor) {
            return this.existe(nodo.derecho, valor)
        }
    }


    delete(valorEliminar) {
        let aux = this.raiz;
        let padre = this.raiz;
        let eshijoIzq = true;
        while (aux.valor != valorEliminar) {
            padre = aux;
            if (valorEliminar < aux.valor) {
                eshijoIzq = true;
                aux = aux.izquierdo;
            } else {
                eshijoIzq = false;
                aux = aux.derecho;
            }
            if (aux == null) {
                return false
            }
        } //salimos de la busqueda del elemento
        if (aux.izquierdo == null && aux.derecho == null) {
            if (aux == this.raiz) {
                this.raiz = null;
            } else if (eshijoIzq) {
                padre.izquierdo = null;
            } else {
                padre.derecho = null;
            }
        } else if (aux.derecho == null) {
            if (aux == this.raiz) {
                this.raiz = aux.izquierdo;
            } else if (eshijoIzq) {
                padre.izquierdo = aux.izquierdo;
            } else {
                padre.derecho = aux.izquierdo;
            }
        } else if (aux.izquierdo == null) {
            if (aux == this.raiz) {
                this.raiz = aux.derecho;
            } else if (eshijoIzq) {
                padre.izquierdo = aux.derecho;
            } else {
                padre.derecho = aux.derecho;
            }
        } else {
            let reemplazo = this.obtenerReemplazo(aux);
            if (aux == this.raiz) {
                this.raiz = reemplazo;
            } else if (eshijoIzq) {
                padre.izquierdo = reemplazo;
            } else {
                padre.derecho = reemplazo;
            }
            reemplazo.izquierdo = aux.izquierdo;
        }
        console.log("Nodo: " + valorEliminar + " eliminado correctamente");
        return true
    }

    obtenerReemplazo(nodoReemplazo) {
        let reemplazarPadre = nodoReemplazo;
        let reemplazo = nodoReemplazo;
        let aux = nodoReemplazo.derecho;
        while (aux != null) {
            reemplazarPadre = reemplazo;
            reemplazo = aux;
            aux = aux.izquierdo;
        }
        if (reemplazo != nodoReemplazo.derecho) {
            reemplazarPadre.izquierdo = reemplazo.derecho;
            reemplazo.derecho = nodoReemplazo.derecho;
        }
        return reemplazo
    }



    update(valor, nvalor) {
        if (this.delete(valor) == true) {
            this.insertar(nvalor);
            console.log("Nodo: " + valor + " , modificado por: " + nvalor);
        } else {
            console.log("No existe el nodo a modificar");
        }
    }


    postOrden() {
        this.post_orden(this.raiz);
    }
    post_orden(nodo) {
        if (nodo != null) {
            this.post_orden(nodo.izquierdo);
            this.post_orden(nodo.derecho);
            console.log("Valor:", nodo.valor);
        }
    }
}

let abb = new ABB();

abb.insertar(1);
abb.insertar(8);
abb.insertar(5);
abb.insertar(3);
abb.insertar(10);
abb.insertar(11);
abb.insertar(9);
abb.inOrden();
console.log("");
abb.delete(5);
abb.inOrden();
console.log("");
abb.update(8,40);
abb.inOrden();
console.log("");

export default ABB;
