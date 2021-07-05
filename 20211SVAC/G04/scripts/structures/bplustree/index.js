"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var NodoBplus = (function () {
    function NodoBplus(grado, esHoja) {
        this.grado = grado;
        this.valores = [];
        this.hijos = [];
        this.padre = null;
        this.siguiente = null;
        this.esHoja = esHoja;
    }
    NodoBplus.prototype.agregarValor = function (valor) {
        if (this.valores.length == 0) {
            this.valores.splice(0, 0, valor);
        }
        else {
            if (valor < this.valores[0]) {
                this.valores.splice(0, 0, valor);
            }
            else {
                var i = this.buscarPos(valor);
                this.valores.splice(i, 0, valor);
            }
        }
    };
    NodoBplus.prototype.agregarHijo = function (hijo, valor) {
        if (this.hijos.length == 0) {
            this.hijos.splice(0, 0, hijo);
        }
        else {
            if (valor < this.valores[0]) {
                this.hijos.splice(0, 0, valor);
            }
            else {
                var i = this.buscarPos(valor);
                this.hijos.splice(i, 0, hijo);
            }
        }
    };
    NodoBplus.prototype.buscarHijo = function (valor) {
        if (this.hijos.length != 0) {
            if (valor < this.valores[0]) {
                return 0;
            }
            else {
                var i = this.buscarPos(valor);
                return i;
            }
        }
        return -1;
    };
    NodoBplus.prototype.eliminarElemento = function (arreglo, valor) {
        return arreglo.filter(function (e) {
            return e !== valor;
        });
    };
    NodoBplus.prototype.eliminarHijo = function (valor) {
        this.hijos = this.eliminarElemento(this.hijos, valor);
    };
    NodoBplus.prototype.eliminarValor = function (valor) {
        this.valores = this.eliminarElemento(this.valores, valor);
    };
    NodoBplus.prototype.estaLleno = function () {
        if (this.valores.length >= this.grado)
            return true;
        return false;
    };
    NodoBplus.prototype.contiene = function (valor) {
        for (var _i = 0, _a = this.valores; _i < _a.length; _i++) {
            var n = _a[_i];
            if (valor == n) {
                return true;
            }
        }
        return false;
    };
    NodoBplus.prototype.buscarPos = function (valor) {
        var i = 0;
        while (valor >= this.valores[i]) {
            if (i > this.valores.length)
                break;
            i++;
        }
        return i;
    };
    NodoBplus.prototype.minValores = function () {
        if (this.valores.length >= Math.round(this.grado - 1) / 2) {
            return true;
        }
        return false;
    };
    return NodoBplus;
}());
var ArbolBplus = (function () {
    function ArbolBplus(grado) {
        this.raiz = null;
        this.grado = grado;
    }
    ArbolBplus.prototype.actualizar = function (valor, nuevo) {
        this.eliminar(valor);
        this.insertar(nuevo);
    };
    ArbolBplus.prototype.insertar = function (valor) {
        this.raiz = this.insertarNodo(valor, this.raiz);
    };
    ArbolBplus.prototype.obtener = function (valor) {
        var searchNode = null;
        if (this.raiz !== null) {
            var stack_1 = [this.raiz];
            while (stack_1.length > 0) {
                var node = stack_1.shift();
                if (node.valores.map(function (value) { return value.toString(); }).includes(valor)) {
                    searchNode = node;
                }
                else {
                    node.hijos.forEach(function (hijo) { return stack_1.push(hijo); });
                }
            }
        }
        return searchNode;
    };
    ArbolBplus.prototype.toArray = function () {
        if (this.raiz !== null) {
            var stack = [this.raiz];
            var stackCopy = __spreadArray([], this.raiz.valores);
            while (stack.length > 0) {
                var node = stack.shift();
                if (node.valores)
                    stackCopy = __spreadArray(__spreadArray([], stackCopy), node.valores);
                if (node.hijos)
                    stack = __spreadArray(__spreadArray([], stack), node.hijos);
            }
            return stackCopy;
        }
        else
            return [];
    };
    ArbolBplus.prototype.insertarNodo = function (valor, raiz) {
        if (raiz == null) {
            raiz = new NodoBplus(this.grado, true);
            raiz.agregarValor(valor);
        }
        else {
            if (raiz.esHoja) {
                raiz.agregarValor(valor);
            }
            else {
                var i = raiz.buscarHijo(valor);
                raiz.hijos[i] = this.insertarNodo(valor, raiz.hijos[i]);
            }
            if (raiz.estaLleno()) {
                raiz = this.separar(raiz);
            }
        }
        return raiz;
    };
    ArbolBplus.prototype.separar = function (raiz) {
        var nodo = new NodoBplus(this.grado, false);
        if (raiz.esHoja) {
            nodo.esHoja = true;
        }
        var m = raiz.valores.slice(raiz.valores.length / 2, raiz.valores.length / 2 + 1);
        if (raiz.esHoja) {
            nodo.valores = raiz.valores.slice(raiz.valores.length / 2, raiz.valores.length);
        }
        else {
            nodo.valores = raiz.valores.slice(raiz.valores.length / 2 + 1, raiz.valores.length);
            nodo.hijos = raiz.hijos.slice(raiz.hijos.length / 2 + 1, raiz.hijos.length);
        }
        for (var n in nodo.hijos) {
            nodo.hijos[n].padre = nodo;
        }
        raiz.valores = raiz.valores.slice(0, raiz.valores.length / 2);
        raiz.hijos = raiz.hijos.slice(0, raiz.hijos.length / 2 + 1);
        if (raiz.padre == null) {
            var padre = new NodoBplus(this.grado, false);
            padre.agregarValor(m[0]);
            padre.agregarHijo(raiz, raiz.valores[raiz.valores.length - 1]);
            padre.agregarHijo(nodo, nodo.valores[nodo.valores.length - 1]);
            raiz.padre = nodo.padre = padre;
            if (raiz.esHoja)
                raiz.siguiente = nodo;
            return padre;
        }
        else {
            raiz.padre.agregarValor(m[0]);
            nodo.padre = raiz.padre;
            raiz.padre.agregarHijo(nodo, nodo.valores[nodo.valores.length - 1]);
            if (raiz.esHoja)
                raiz.siguiente = nodo;
        }
        return raiz;
    };
    ArbolBplus.prototype.actualizarSig = function (raiz) {
        for (var i in raiz.padre.hijos) {
            raiz.padre.hijos[i].siguiente = raiz.padre.hijos[i + 1];
        }
        return raiz;
    };
    ArbolBplus.prototype.eliminar = function (valor) {
        if (this.raiz != null) {
            this.raiz = this.delete(valor, this.raiz, -1, false);
        }
        if (this.raiz.valores.length == 0) {
            this.raiz.padre = null;
            this.raiz = this.raiz.hijos[0];
        }
    };
    ArbolBplus.prototype.delete = function (valor, raiz, pos, repetido) {
        if (raiz != null) {
            if (raiz.esHoja) {
                if (raiz.contiene(valor)) {
                    raiz = this.deleteEnHoja(valor, raiz, pos, repetido);
                }
            }
            else {
                var i = raiz.buscarHijo(valor);
                if (raiz.contiene(valor)) {
                    repetido = true;
                }
                raiz.hijos[i] = this.delete(valor, raiz.hijos[i], i, repetido);
            }
        }
        if (!raiz.minValores() && pos != -1) {
            raiz = this.merge(raiz, pos);
        }
        return raiz;
    };
    ArbolBplus.prototype.deleteEnHoja = function (valor, raiz, pos, repetido) {
        raiz.eliminarValor(valor);
        if (repetido) {
            raiz.padre = this.deleteRepetido(valor, raiz.valores[0], raiz.padre);
        }
        if (!raiz.minValores() && pos != -1) {
            raiz = this.prestarHoja(raiz, pos);
        }
        return raiz;
    };
    ArbolBplus.prototype.deleteRepetido = function (valor, nuevo, raiz) {
        if (raiz.contiene(valor)) {
            raiz.eliminarValor(valor);
            raiz.agregarValor(nuevo);
            return raiz;
        }
        else {
            raiz.padre = this.deleteRepetido(valor, nuevo, raiz.padre);
        }
        return raiz;
    };
    ArbolBplus.prototype.prestarHoja = function (raiz, pos) {
        if (pos != -1) {
            var lado = this.getLadoPrestamo(raiz, pos - 1, pos + 1);
            if (lado != -1) {
                if (lado < pos) {
                    raiz = this.prestarIzquierdo(raiz, lado);
                }
                else {
                    raiz = this.prestarDerecho(raiz, lado);
                }
            }
            else {
                raiz = this.merge(raiz, pos);
            }
        }
        return raiz;
    };
    ArbolBplus.prototype.prestarIzquierdo = function (raiz, izq) {
        raiz.padre.agregarValor(raiz.padre.hijos[izq].valores[raiz.padre.hijos[izq].valores.length - 1]);
        raiz.padre.eliminarValor(raiz.valores[0]);
        raiz.agregarValor(raiz.padre.hijos[izq].valores.pop());
        return raiz;
    };
    ArbolBplus.prototype.prestarDerecho = function (raiz, der) {
        raiz.agregarValor(raiz.padre.hijos[der].valores[0]);
        raiz.padre.eliminarValor(raiz.padre.hijos[der].valores.shift());
        raiz.padre.agregarValor(raiz.padre.hijos[der].valores[0]);
        return raiz;
    };
    ArbolBplus.prototype.getLadoPrestamo = function (raiz, izq, der) {
        if (izq > -1) {
            if (raiz.padre.hijos[izq].valores.length > (this.grado - 1) / 2) {
                return izq;
            }
        }
        if (der < raiz.padre.hijos.length) {
            if (raiz.padre.hijos[der].valores.length > (this.grado - 1) / 2) {
                return der;
            }
        }
        return -1;
    };
    ArbolBplus.prototype.merge = function (raiz, pos) {
        if (pos == 0) {
            raiz = this.mergeDerecho(raiz, pos);
        }
        else {
            raiz = this.mergeIzquierdo(raiz, pos);
        }
        return raiz;
    };
    ArbolBplus.prototype.mergeIzquierdo = function (raiz, pos) {
        var valores = raiz.padre.hijos[pos - 1].valores;
        if (!raiz.esHoja)
            valores = valores.concat(raiz.padre.valores[pos - 1]);
        var hijos = raiz.padre.hijos[pos - 1].hijos;
        raiz.padre.eliminarHijo(raiz.padre.hijos[pos - 1]);
        raiz.padre.eliminarValor(raiz.padre.valores[pos - 1]);
        for (var _i = 0, valores_1 = valores; _i < valores_1.length; _i++) {
            var n = valores_1[_i];
            raiz.agregarValor(n);
        }
        for (var _a = 0, hijos_1 = hijos; _a < hijos_1.length; _a++) {
            var n = hijos_1[_a];
            n.padre = raiz;
            raiz.agregarHijo(n, n.valores[n.valores.length - 1]);
        }
        this.actualizarSig(raiz);
        return raiz;
    };
    ArbolBplus.prototype.mergeDerecho = function (raiz, pos) {
        var valores = raiz.padre.hijos[pos + 1].valores;
        if (!raiz.esHoja)
            valores = valores.concat(raiz.padre.valores[pos + 1]);
        var hijos = raiz.padre.hijos[pos + 1].hijos;
        raiz.padre.eliminarHijo(raiz.padre.hijos[pos + 1]);
        raiz.padre.eliminarValor(raiz.padre.valores[pos]);
        for (var _i = 0, valores_2 = valores; _i < valores_2.length; _i++) {
            var n = valores_2[_i];
            raiz.agregarValor(n);
        }
        for (var _a = 0, hijos_2 = hijos; _a < hijos_2.length; _a++) {
            var n = hijos_2[_a];
            n.padre = raiz;
            raiz.agregarHijo(n, n.valores[n.valores.length - 1]);
        }
        this.actualizarSig(raiz);
        return raiz;
    };
    ArbolBplus.prototype.print = function () {
        if (this.raiz != null) {
            this.printNodo(this.raiz, 0);
        }
    };
    ArbolBplus.prototype.printNodo = function (raiz, valor) {
        if (raiz != null) {
            console.log();
            if (raiz.padre != null) {
                console.log('Padre: ' + raiz.padre.valores);
            }
            console.log(raiz.valores);
            if (raiz.siguiente != null) {
                console.log('Siguiente: ' + raiz.siguiente.valores);
            }
            else {
                console.log('Siguiente: ' + 'null');
            }
            for (var i in raiz.hijos) {
                this.printNodo(raiz.hijos[i], valor + 1);
            }
        }
    };
    return ArbolBplus;
}());
