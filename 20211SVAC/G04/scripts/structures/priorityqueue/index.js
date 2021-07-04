"use strict";
var NodoSimpleQ = (function () {
    function NodoSimpleQ(valor, priority) {
        this.priority = priority;
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
    return NodoSimpleQ;
}());
var PriorityQueue = (function () {
    function PriorityQueue() {
        this.raiz = null;
        this.tamaño = 0;
        this.nodoActual = null;
    }
    PriorityQueue.prototype.getTamaño = function () {
        return this.tamaño;
    };
    PriorityQueue.prototype.vacia = function () {
        if (this.raiz == null) {
            return true;
        }
    };
    PriorityQueue.prototype.eliminar = function (valor) {
        valor = valor.toString();
        if (this.raiz != null) {
            if (this.raiz.valor.toString() == valor) {
                this.raiz = this.raiz.siguiente;
                this.tamaño--;
            }
            else {
                var aux = this.raiz;
                while (aux.siguiente != null) {
                    if (aux.siguiente.valor.toString() == valor) {
                        aux.siguiente = aux.siguiente.siguiente;
                        this.tamaño--;
                        break;
                    }
                    aux = aux.siguiente;
                }
            }
        }
    };
    PriorityQueue.prototype.pop = function () {
        if (this.raiz != null) {
            var valor = this.raiz.valor;
            this.raiz = this.raiz.siguiente;
            this.tamaño--;
            return valor;
        }
        return null;
    };
    PriorityQueue.prototype.buscar = function (valor) {
        if (this.raiz != null) {
            var aux = this.raiz;
            while (aux != null) {
                if (aux.valor == valor) {
                    return valor;
                }
                aux = aux.siguiente;
            }
        }
        return null;
    };
    PriorityQueue.prototype.obtener = function (index) {
        var nodo = this.raiz;
        for (var i = 0; i < this.tamaño; i++) {
            if (i === index)
                break;
            nodo = nodo === null || nodo === void 0 ? void 0 : nodo.siguiente;
        }
        return nodo;
    };
    PriorityQueue.prototype.obtenerIndice = function (valor) {
        var nodo = this.raiz;
        var indice = 0;
        for (var i = 0; i < this.tamaño; i++) {
            if (nodo.valor.toString() === valor.toString()) {
                indice = i;
                break;
            }
            nodo = nodo.siguiente;
        }
        return indice;
    };
    PriorityQueue.prototype.actualizar = function (valor, nuevo) {
        if (this.raiz != null) {
            if (this.raiz.valor == valor) {
                this.raiz.valor = nuevo;
            }
            else {
                var aux = this.raiz;
                while (aux != null) {
                    if (aux.valor == valor) {
                        aux.valor = nuevo;
                        break;
                    }
                    aux = aux.siguiente;
                }
            }
        }
    };
    PriorityQueue.prototype.insertar = function (valor, priority) {
        var aux = new NodoSimpleQ(valor, priority);
        if (this.raiz === null) {
            this.raiz = aux;
            this.tamaño++;
        }
        else {
            if (this.raiz.priority > priority) {
                aux.siguiente = this.raiz;
                this.raiz = aux;
                this.tamaño++;
            }
            else {
                while (this.raiz.siguiente != null &&
                    this.raiz.siguiente.priority < priority) {
                    this.raiz = this.raiz.siguiente;
                }
                aux.siguiente = this.raiz.siguiente;
                this.raiz.siguiente = aux;
                this.tamaño++;
            }
        }
        return this.raiz;
    };
    return PriorityQueue;
}());
