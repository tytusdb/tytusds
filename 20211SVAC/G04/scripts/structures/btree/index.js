"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var NodoB = (function () {
    function NodoB(grado, esHoja) {
        this.grado = grado;
        this.valores = [];
        this.hijos = [];
        this.padre = null;
        this.esHoja = esHoja;
    }
    NodoB.prototype.agregarValor = function (valor) {
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
    NodoB.prototype.agregarHijo = function (hijo, valor) {
        if (this.hijos.length == 0) {
            this.hijos.splice(0, 0, hijo);
        }
        else {
            if (valor < this.valores[0]) {
                this.hijos.splice(0, 0, hijo);
            }
            else {
                var i = this.buscarPos(valor);
                this.hijos.splice(i, 0, hijo);
            }
        }
    };
    NodoB.prototype.buscarHijo = function (valor) {
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
    NodoB.prototype.eliminarValor = function (valor) {
        this.valores = this.eliminarElemento(this.valores, valor);
    };
    NodoB.prototype.eliminarElemento = function (arreglo, valor) {
        return arreglo.filter(function (e) {
            return e !== valor;
        });
    };
    NodoB.prototype.eliminarHijo = function (valor) {
        this.hijos = this.eliminarElemento(this.hijos, valor);
    };
    NodoB.prototype.contiene = function (valor) {
        for (var _i = 0, _a = this.valores; _i < _a.length; _i++) {
            var n = _a[_i];
            if (valor == n) {
                return true;
            }
        }
        return false;
    };
    NodoB.prototype.estaLleno = function () {
        if (this.valores.length >= this.grado)
            return true;
        return false;
    };
    NodoB.prototype.minValores = function () {
        if (this.valores.length >= Math.round(this.grado - 1) / 2) {
            return true;
        }
        return false;
    };
    NodoB.prototype.buscarPos = function (valor) {
        var i = 0;
        while (valor > this.valores[i]) {
            if (i > this.valores.length)
                break;
            i++;
        }
        return i;
    };
    return NodoB;
}());
var ArbolB = (function () {
    function ArbolB(grado) {
        this.raiz = null;
        this.grado = grado;
    }
    ArbolB.prototype.actualizar = function (valor, nuevo) {
        this.eliminar(valor);
        this.insertar(nuevo);
    };
    ArbolB.prototype.insertar = function (valor) {
        this.raiz = this.insertarNodo(valor, this.raiz);
    };
    ArbolB.prototype.obtener = function (valor) {
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
    ArbolB.prototype.toArray = function () {
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
    ArbolB.prototype.insertarNodo = function (valor, raiz) {
        if (raiz == null) {
            raiz = new NodoB(this.grado, true);
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
    ArbolB.prototype.separar = function (raiz) {
        var nodo = new NodoB(this.grado, false);
        if (raiz.esHoja) {
            nodo.esHoja = true;
        }
        var m = raiz.valores.slice(raiz.valores.length / 2, raiz.valores.length / 2 + 1);
        nodo.valores = raiz.valores.slice(raiz.valores.length / 2 + 1, raiz.valores.length);
        nodo.hijos = raiz.hijos.slice(raiz.hijos.length / 2, raiz.hijos.length);
        for (var n in nodo.hijos) {
            nodo.hijos[n].padre = nodo;
        }
        raiz.valores = raiz.valores.slice(0, raiz.valores.length / 2);
        raiz.hijos = raiz.hijos.slice(0, raiz.hijos.length / 2);
        if (raiz.padre == null) {
            var padre = new NodoB(this.grado, false);
            padre.agregarValor(m[0]);
            padre.agregarHijo(raiz, raiz.valores[raiz.valores.length - 1]);
            padre.agregarHijo(nodo, nodo.valores[nodo.valores.length - 1]);
            raiz.padre = nodo.padre = padre;
            return padre;
        }
        else {
            raiz.padre.agregarValor(m[0]);
            nodo.padre = raiz.padre;
            raiz.padre.agregarHijo(nodo, nodo.valores[nodo.valores.length - 1]);
        }
        return raiz;
    };
    ArbolB.prototype.eliminar = function (valor) {
        if (this.raiz != null) {
            this.raiz = this.delete(valor, this.raiz, -1);
        }
        if (this.raiz.valores.length == 0) {
            this.raiz.padre = null;
            this.raiz = this.raiz.hijos[0];
        }
    };
    ArbolB.prototype.delete = function (valor, raiz, pos) {
        if (raiz.contiene(valor)) {
            if (raiz.esHoja) {
                raiz = this.deleteEnHoja(valor, raiz, pos);
            }
            else if (!raiz.esHoja) {
                raiz = this.deleteEnRama(valor, raiz);
            }
        }
        else {
            if (!raiz.esHoja) {
                var i = raiz.buscarHijo(valor);
                raiz.hijos[i] = this.delete(valor, raiz.hijos[i], i);
            }
        }
        if (!raiz.minValores() && pos != -1) {
            raiz = this.merge(raiz, pos);
        }
        return raiz;
    };
    ArbolB.prototype.deleteEnRama = function (valor, raiz) {
        raiz.eliminarValor(valor);
        var val = this.prestarRama(raiz.hijos[0]);
        raiz.agregarValor(val);
        raiz.hijos[0] = this.delete(val, raiz.hijos[0], 0);
        return raiz;
    };
    ArbolB.prototype.prestarRama = function (raiz) {
        if (raiz.esHoja) {
            return raiz.valores[raiz.valores.length - 1];
        }
        return this.prestarRama(raiz.hijos[raiz.valores.length]);
    };
    ArbolB.prototype.deleteEnHoja = function (valor, raiz, pos) {
        raiz.eliminarValor(valor);
        if (!raiz.minValores() && pos != -1) {
            raiz = this.prestarHoja(raiz, pos);
        }
        return raiz;
    };
    ArbolB.prototype.prestarHoja = function (raiz, pos) {
        if (pos != -1) {
            var lado = this.getLadoPrestamo(raiz, pos - 1, pos + 1);
            if (lado != -1) {
                if (lado < pos) {
                    raiz = this.prestarIzquierdo(raiz, lado);
                }
                else {
                    raiz = this.prestarDerecho(raiz, pos, lado);
                }
            }
            else {
                raiz = this.merge(raiz, pos);
            }
        }
        return raiz;
    };
    ArbolB.prototype.prestarIzquierdo = function (raiz, izq) {
        raiz.agregarValor(raiz.padre.valores[izq]);
        raiz.padre.eliminarValor(raiz.padre.valores[izq]);
        raiz.padre.agregarValor(raiz.padre.hijos[izq].valores.pop());
        return raiz;
    };
    ArbolB.prototype.prestarDerecho = function (raiz, pos, der) {
        raiz.agregarValor(raiz.padre.valores[pos]);
        raiz.padre.eliminarValor(raiz.padre.valores[pos]);
        raiz.padre.agregarValor(raiz.padre.hijos[der].valores.shift());
        return raiz;
    };
    ArbolB.prototype.getLadoPrestamo = function (raiz, izq, der) {
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
    ArbolB.prototype.merge = function (raiz, pos) {
        if (pos == 0) {
            raiz = this.mergeDerecho(raiz, pos);
        }
        else {
            raiz = this.mergeIzquierdo(raiz, pos);
        }
        return raiz;
    };
    ArbolB.prototype.mergeIzquierdo = function (raiz, pos) {
        var valores = raiz.padre.hijos[pos - 1].valores;
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
        return raiz;
    };
    ArbolB.prototype.mergeDerecho = function (raiz, pos) {
        var valores = raiz.padre.hijos[pos + 1].valores;
        valores = valores.concat(raiz.padre.valores[pos]);
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
        return raiz;
    };
    ArbolB.prototype.print = function () {
        if (this.raiz != null) {
            this.printNodo(this.raiz);
        }
    };
    ArbolB.prototype.printNodo = function (raiz) {
        if (raiz != null) {
            console.log();
            if (raiz.padre != null) {
                console.log('Padre: ' + raiz.padre.valores);
            }
            console.log(raiz.valores);
            for (var i in raiz.hijos) {
                this.printNodo(raiz.hijos[i]);
            }
        }
    };
    return ArbolB;
}());
