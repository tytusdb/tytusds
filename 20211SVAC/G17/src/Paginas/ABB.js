import React from "react";

class TreeNode {
    constructor(valor) {
        this.valor = valor
        this.izquierda = null
        this.derecha = null
    }
}

const {
    defaultCompare,
    Compare
} = require ('./function')

class ABB {
    constructor(comparar = defaultCompare) {
        this.raiz = null
        this.comparar = comparar
    }

    insertar(valor) {
        if (valor == null) {
            return false
        }
        if (this.raiz == null) {
            this.raiz = new TreeNode(valor)
        } else {
            this.insertarNodo(valor, this.raiz)
        }
        return true
    }

    insertarNodo(valor, nodo) {
        if (this.comparar(valor, nodo.valor) == Compare.LESS_THAN) {
            if (nodo.izquierda == null) {
                nodo.izquierda = new TreeNode(valor)
            } else {
                this.insertarNodo(valor, nodo.izquierda)
            }
        } else if (this.comparar(valor, nodo.valor) == Compare.BIGGER_THAN) {
            if (nodo.derecha == null) {
                nodo.derecha = new TreeNode(valor)
            } else {
                this.insertarNodo(valor, nodo.derecha)
            }
        }
    }

    recorridoInOrder(retorno) {
        this.recorridoInOrderNodo(this.raiz, retorno)
    }

    recorridoInOrderNodo(nodo, retorno) {
        if (nodo != null) {
            this.recorridoInOrderNodo(nodo.izquierda, retorno)
            retorno(nodo.valor)
            this.recorridoInOrderNodo(nodo.derecha, retorno)
        }
    }

    recorridoPostOrder(retorno) {
        this.recorridoPostOrderNodo(this.raiz, retorno)
    }

    recorridoPostOrderNodo(nodo, retorno) {
        if (nodo != null) {
            this.recorridoPostOrderNodo(nodo.izquierda, retorno)
            this.recorridoPostOrderNodo(nodo.derecha, retorno)
            retorno(nodo.valor)
        }
    }

    recorridoPreOrder(retorno) {
        this.recorridoPreOrderNodo(this.raiz, retorno)
    }

    recorridoPreOrderNodo(nodo, retorno) {
        if (nodo != null) {
            retorno(nodo.valor)
            this.recorridoPreOrderNodo(nodo.izquierda, retorno)
            this.recorridoPreOrderNodo(nodo.derecha, retorno)
        }
    }

    minimo() {
        return this.minimoNodo(this.raiz)
    }

    minimoNodo(nodo) {
        let actual = nodo
        while (actual != null && actual.derecha != null) {
            actual = nodo.izquierda
        }
        return actual
    }

    maximo() {
        return this.maximoNodo(this.raiz)
    }

    maximoNodo(nodo) {
        let actual = nodo
        while (actual != null && actual.derecha != null) {
            actual = nodo.derecha
        }
        return actual
    }

    buscar(valor) {
        return this.buscarNodo(this.raiz, valor)
    }

    buscarNodo(nodo, valor) {
        if (nodo == null) {
            return false
        }
        if (this.comparar(valor, nodo.valor) == Compare.LESS_THAN) {
            return this.buscarNodo(nodo.izquierda, valor)
        } else if (this.comparar(valor, nodo.valor) == Compare.BIGGER_THAN) {
            return this.buscarNodo(nodo.derecha, valor)
        } else {
            return true
        }
    }

    eliminar(valor) {
        this.raiz = this.eliminarNodo(this.raiz, valor)
    }

    eliminarNodo(nodo, valor) {
        if (nodo == null) {
            return false
        }

        if (this.comparar(valor, nodo.valor) == Compare.LESS_THAN) {
            nodo.izquierda = this.eliminarNodo(nodo.izquierda, valor)
            return nodo
        } else if (this.comparar(valor, nodo.valor) == Compare.BIGGER_THAN) {
            nodo.derecha = this.eliminarNodo(nodo.derecha, valor)
            return nodo
        } else {
            if (nodo.izquierda == null && nodo.derecha == null) {
                nodo = null
                return nodo
            }

            if (nodo.izquierda == null) {
                nodo = nodo.derecha
                return nodo
            } else if (nodo.derecha == null) {
                nodo = nodo.izquierda
                return nodo
            }

            const auxiliar = this.minimoNodo(nodo.derecha)
            nodo.valor = auxiliar.valor
            nodo.derecha = this.eliminarNodo(nodo.derecha, auxiliar.valor)
            return nodo
        }
    }
}

const abb = () =>{
    return (
        <div>
            <h3>Aquí va el ABB</h3>
        </div>
    );
}

export default abb;
