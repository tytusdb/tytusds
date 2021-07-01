"use strict";
var NodoDob = (function () {
    function NodoDob(valor) {
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
    return NodoDob;
}());
var listacirculardob = (function () {
    function listacirculardob() {
        this.raiz = null;
        this.ultimo = null;
        this.tamaño = 0;
        this.nodoActual = null;
    }
    listacirculardob.prototype.vacia = function () {
        if (this.raiz == null) {
            return true;
        }
    };
    listacirculardob.prototype.insertarInicio = function (valor) {
        var nuevo = new NodoDob(valor);
        if (this.vacia() == true) {
            this.raiz = this.ultimo = nuevo;
            this.tamaño++;
        }
        else {
            var aux = new NodoDob(valor);
            aux.siguiente = this.raiz;
            this.raiz.anterior = aux;
            this.raiz = aux;
            this.tamaño++;
        }
    };
    listacirculardob.prototype.insertarFinal = function (valor) {
        if (this.vacia() == true) {
            this.raiz = this.ultimo = new NodoDob(valor);
            this.tamaño++;
        }
        else {
            var aux = this.ultimo;
            this.ultimo = aux.siguiente = new NodoDob(valor);
            this.ultimo.anterior = aux;
            this.tamaño++;
        }
    };
    listacirculardob.prototype.setActualRaiz = function () {
        this.nodoActual = this.raiz;
    };
    listacirculardob.prototype.pasarSiguiente = function () {
        this.nodoActual = this.nodoActual.siguiente;
    };
    listacirculardob.prototype.getNodoActual = function () {
        return this.nodoActual.valor;
    };
    listacirculardob.prototype.eliminar = function (valor) {
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
    listacirculardob.prototype.buscar = function (valor) {
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
    listacirculardob.prototype.obtener = function (index) {
        var nodo = this.raiz;
        for (var i = 0; i < this.tamaño; i++) {
            if (i === index)
                break;
            nodo = nodo.siguiente;
        }
        return nodo;
    };
    listacirculardob.prototype.obtenerIndice = function (valor) {
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
    listacirculardob.prototype.actualizar = function (valor, nuevo) {
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
    listacirculardob.prototype.getTamaño = function () {
        return this.tamaño;
    };
    listacirculardob.prototype.push = function (valor) {
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
    listacirculardob.prototype.pop = function () {
        if (this.raiz != null) {
            var valor = this.raiz.valor;
            this.raiz = this.raiz.siguiente;
            this.tamaño--;
            return valor;
        }
        return null;
    };
    listacirculardob.prototype.descolar = function () {
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
    listacirculardob.prototype.print = function () {
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
    return listacirculardob;
}());
