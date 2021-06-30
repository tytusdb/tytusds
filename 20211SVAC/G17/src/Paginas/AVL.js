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
} = require('./function')


const factorBalance = {
    BALANCEADO_DERECHA: 1,
    LIGERAMENTE_BALANCEADO_DERECHA: 2,
    BALANCEADO: 3,
    LIGERAMENTE_BALANCEADO_IZQUIERDA: 4,
    BALANCEADO_IZQUIERDA: 5
}

class AVL extends abb {
    constructor(comparar = defaultCompare) {
        super(comparar);
    }

    obtenerAlturaNodo(nodo) {
        if (nodo == null) {
            return -1
        }
        return Math.max(this.obtenerAlturaNodo(nodo.izquierda), this.obtenerAlturaNodo(nodo.derecha)) + 1
    }

    obtenerFactorBalance(nodo) {
        const diferenciaAltura = this.obtenerAlturaNodo(nodo.izquierda) - this.obtenerAlturaNodo(nodo.derecha)
        if (diferenciaAltura === -2) {
            return factorBalance.BALANCEADO_DERECHA;
        } else if (diferenciaAltura === -1) {
            return factorBalance.LIGERAMENTE_BALANCEADO_DERECHA
        } else if (diferenciaAltura === 1) {
            return factorBalance.LIGERAMENTE_BALANCEADO_IZQUIERDA
        } else if (diferenciaAltura === 2) {
            return factorBalance.BALANCEADO_IZQUIERDA
        } else {
            return factorBalance.BALANCEADO
        }
    }

    rotacionLL(nodo) {
        const temporal = nodo.izquierda
        nodo.izquierda = temporal.derecha
        temporal.derecha = nodo
        return temporal
    }

    rotacionRR(nodo) {
        const temporal = nodo.derecha
        nodo.derecha = temporal.izquierda
        temporal.izquierda = nodo
        return temporal
    }

    rotacionRL(nodo) {
        nodo.derecha = this.rotacionLL(nodo.derecha)
        return this.rotacionRR(nodo)
    }

    rotacionLR(nodo) {
        nodo.izquierda = this.rotacionRR(nodo.izquierda)
        return this.rotacionLL(nodo)
    }

    insertar(llave) {
        this.raiz = this.insertarNodo(this.raiz, llave)
    }

    insertarNodo(nodo, llave) {
        if (nodo == null) {
            return new TreeNode(llave)
        } else if (this.comparar(llave, nodo.valor) == Compare.LESS_THAN) {
            nodo.izquierda = this.insertarNodo(nodo.izquierda, llave)
        } else if (this.comparar(llave, nodo.valor) == Compare.BIGGER_THAN) {
            nodo.derecha = this.insertarNodo(nodo.derecha, llave)
        } else {
            return nodo
        }

        const factorDeBalance = this.obtenerFactorBalance(nodo)
        if (factorDeBalance == factorBalance.BALANCEADO_IZQUIERDA) {
            if (this.comparar(llave, nodo.izquierda.valor) == Compare.LESS_THAN) {
                nodo = this.rotacionLL(nodo)
            } else {
                return this.rotacionLR(nodo)
            }
        } else if (factorDeBalance == factorBalance.BALANCEADO_DERECHA) {
            if (this.comparar(llave, nodo.izquierda.valor) == Compare.BIGGER_THAN) {
                nodo = this.rotacionRR(nodo)
            } else {
                return this.rotacionRL(nodo)
            }
        }
    }

    eliminarNodo(nodo, valor) {
        nodo = super.eliminarNodo(nodo, valor)
        if (nodo == null) {
            return null
        }

        const factorDeBalance = this.obtenerFactorBalance(nodo)
        if (factorDeBalance == factorBalance.BALANCEADO_IZQUIERDA) {
            const factorBalanceIzquierda = this.obtenerFactorBalance(nodo.izquierda)
            if (factorBalanceIzquierda == factorBalance.BALANCEADO || factorBalance.LIGERAMENTE_BALANCEADO_IZQUIERDA) {
                nodo = this.rotacionLL(nodo)
            }
            if (factorBalanceIzquierda == factorBalance.LIGERAMENTE_BALANCEADO_DERECHA) {
                return this.rotacionLR(nodo)
            }
        } else if (factorDeBalance == factorBalance.BALANCEADO_DERECHA) {
            const factorBalanceDerecha = this.obtenerFactorBalance(nodo.derecha)
            if (factorBalanceDerecha == factorBalance.BALANCEADO || factorBalance.LIGERAMENTE_BALANCEADO_DERECHA) {
                nodo = this.rotacionRR(nodo)
            }
            if (factorBalanceDerecha == factorBalance.LIGERAMENTE_BALANCEADO_IZQUIERDA) {
                return this.rotacionRL(nodo)
            }
        }
    }
}

const avl = () =>{
    return (
        <div>
            <h3>Aquí va el AVL</h3>
        </div>
    );
}

export default avl;
