"use strict";
var NodoSimp = (function () {
    function NodoSimp(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
    return NodoSimp;
}());
var listacircularsimpenl = (function () {
    function listacircularsimpenl() {
        this.raiz = null;
        this.ultimo = null;
        this.tamaño = 0;
        this.nodoActual = null;
    }
    listacircularsimpenl.prototype.setActualRaiz = function () {
        this.nodoActual = this.raiz;
    };
    listacircularsimpenl.prototype.pasarSiguiente = function () {
        this.nodoActual = this.nodoActual.siguiente;
    };
    listacircularsimpenl.prototype.getNodoActual = function () {
        return this.nodoActual.valor;
    };
    listacircularsimpenl.prototype.vacia = function () {
        if (this.raiz == null) {
            return true;
        }
    };
    listacircularsimpenl.prototype.insertarInicio = function (valor) {
        var nuevo = new NodoSimp(valor);
        if (this.vacia() == true) {
            this.raiz = this.ultimo = nuevo;
            this.ultimo.siguiente = this.raiz;
            this.tamaño++;
        }
        else {
            var aux = new NodoSimp(valor);
            aux.siguiente = this.raiz;
            this.raiz = aux;
            this.ultimo.siguiente = this.raiz;
        }
    };
    listacircularsimpenl.prototype.insertarFinal = function (valor) {
        var nuevo = new NodoSimp(valor);
        if (this.vacia() == true) {
            this.raiz = this.ultimo = nuevo;
            this.ultimo.siguiente = this.raiz;
            this.tamaño++;
        }
        else {
            var aux = this.ultimo;
            this.ultimo = aux.siguiente = new NodoSimp(valor);
            this.ultimo.siguiente = this.raiz;
            this.tamaño++;
        }
    };
    listacircularsimpenl.prototype.eliminar = function (valor) {
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
    listacircularsimpenl.prototype.buscar = function (valor) {
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
    listacircularsimpenl.prototype.obtener = function (index) {
        var nodo = this.raiz;
        for (var i = 0; i < this.tamaño; i++) {
            if (i === index)
                break;
            nodo = nodo.siguiente;
        }
        return nodo;
    };
    listacircularsimpenl.prototype.obtenerIndice = function (valor) {
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
    listacircularsimpenl.prototype.actualizar = function (valor, nuevo) {
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
    listacircularsimpenl.prototype.getTamaño = function () {
        return this.tamaño;
    };
    listacircularsimpenl.prototype.push = function (valor) {
        if (this.raiz == null) {
            this.raiz = new NodoSimple(valor);
            this.tamaño++;
        }
        else {
            var aux = new NodoSimple(valor);
            aux.siguiente = this.raiz;
            this.raiz = aux;
            this.tamaño++;
        }
    };
    listacircularsimpenl.prototype.pop = function () {
        if (this.raiz != null) {
            var valor = this.raiz.valor;
            this.raiz = this.raiz.siguiente;
            this.tamaño--;
            return valor;
        }
        return null;
    };
    listacircularsimpenl.prototype.descolar = function () {
        if (this.raiz != null) {
            if (this.raiz.siguiente == null) {
                var valor = this.raiz.valor;
                this.raiz = null;
                this.tamaño--;
                return valor;
            }
            else {
                var aux = this.raiz;
                while (aux.siguiente.siguiente != null) {
                    aux = aux.siguiente;
                }
                var valor = aux.siguiente.valor;
                aux.siguiente = null;
                return valor;
            }
        }
        return null;
    };
    listacircularsimpenl.prototype.print = function () {
        console.log('Lista Contenido:');
        if (this.raiz != null) {
            var aux = this.raiz;
            var salida = '';
            while (aux != null) {
                salida += aux.valor + ' -> ';
                aux = aux.siguiente;
            }
            console.log(salida);
        }
    };
    return listacircularsimpenl;
}());
