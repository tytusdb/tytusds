"use strict";
var NodoAvl = (function () {
    function NodoAvl(valor) {
        this.valor = valor;
        this.altura = 0;
        this.izquierdo = this.derecho = null;
    }
    return NodoAvl;
}());
var ArbolAvl = (function () {
    function ArbolAvl() {
        this.raiz = null;
    }
    ArbolAvl.prototype.altura = function (raiz) {
        if (raiz == null) {
            return 0;
        }
        return raiz.altura;
    };
    ArbolAvl.prototype.alturaMax = function (izq, der) {
        if (this.altura(izq) > this.altura(der)) {
            return this.altura(izq);
        }
        return this.altura(der);
    };
    ArbolAvl.prototype.factor = function (raiz) {
        return this.altura(raiz.derecho) - this.altura(raiz.izquierdo);
    };
    ArbolAvl.prototype.insertar = function (valor) {
        this.raiz = this.insertarNodo(valor, this.raiz);
    };
    ArbolAvl.prototype.obtener = function (valor) {
        var searchNode = null;
        if (this.raiz !== null) {
            var stack = [this.raiz];
            while (stack.length > 0) {
                var node = stack.shift();
                if (node.valor.toString() === valor) {
                    searchNode = node;
                }
                else {
                    if (node.izquierdo)
                        stack.push(node.izquierdo);
                    if (node.derecho)
                        stack.push(node.derecho);
                }
            }
        }
        return searchNode;
    };
    ArbolAvl.prototype.toArray = function () {
        if (this.raiz !== null) {
            var stack = [this.raiz];
            var stackCopy = [this.raiz.valor];
            while (stack.length > 0) {
                var node = stack.shift();
                if (node.izquierdo) {
                    stackCopy.push(node.izquierdo.valor);
                    stack.push(node.izquierdo);
                }
                if (node.derecho) {
                    stackCopy.push(node.derecho.valor);
                    stack.push(node.derecho);
                }
            }
            return stackCopy;
        }
        else
            return [];
    };
    ArbolAvl.prototype.insertarNodo = function (valor, raiz) {
        if (raiz == null) {
            raiz = new NodoAvl(valor);
        }
        else {
            if (valor < raiz.valor) {
                raiz.izquierdo = this.insertarNodo(valor, raiz.izquierdo);
                raiz.izquierdo = this.equilibrar(raiz.izquierdo);
            }
            else if (valor >= raiz.valor) {
                raiz.derecho = this.insertarNodo(valor, raiz.derecho);
                raiz.derecho = this.equilibrar(raiz.derecho);
            }
        }
        raiz = this.equilibrar(raiz);
        raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1;
        return raiz;
    };
    ArbolAvl.prototype.eliminar = function (valor) {
        if (this.raiz != null) {
            this.raiz = this.delete(valor, this.raiz);
        }
    };
    ArbolAvl.prototype.delete = function (valor, raiz) {
        if (valor < raiz.valor) {
            raiz.izquierdo = this.delete(valor, raiz.izquierdo);
        }
        else if (valor > raiz.valor) {
            raiz.derecho = this.delete(valor, raiz.derecho);
        }
        else if (valor == raiz.valor) {
            if (raiz.izquierdo == null && raiz.derecho == null) {
                return null;
            }
            else if (raiz.izquierdo != null && raiz.derecho == null) {
                raiz = raiz.izquierdo;
            }
            else if (raiz.derecho != null && raiz.izquierdo == null) {
                raiz = raiz.derecho;
            }
            else {
                var v = this.izqMayor(raiz.izquierdo);
                raiz = this.delete(v, raiz);
                raiz.valor = v;
            }
        }
        raiz = this.equilibrar(raiz);
        raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1;
        return raiz;
    };
    ArbolAvl.prototype.izqMayor = function (raiz) {
        while (raiz.derecho != null) {
            raiz = raiz.derecho;
        }
        return raiz.valor;
    };
    ArbolAvl.prototype.actualizar = function (valor, nuevo) {
        if (this.raiz != null) {
            this.eliminar(valor);
            this.insertar(nuevo);
        }
    };
    ArbolAvl.prototype.equilibrar = function (raiz) {
        if (this.factor(raiz) == -2) {
            if (this.factor(raiz.izquierdo) == 1) {
                raiz = this.dobleDer(raiz);
            }
            else {
                raiz = this.simpleDer(raiz);
            }
        }
        else if (this.factor(raiz) == 2) {
            if (this.factor(raiz.derecho) == -1) {
                raiz = this.dobleIzq(raiz);
            }
            else {
                raiz = this.simpleIzq(raiz);
            }
        }
        return raiz;
    };
    ArbolAvl.prototype.simpleIzq = function (raiz) {
        var aux = raiz.derecho;
        raiz.derecho = aux.izquierdo;
        aux.izquierdo = raiz;
        raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1;
        aux.altura = this.alturaMax(aux.izquierdo, raiz) + 1;
        return aux;
    };
    ArbolAvl.prototype.simpleDer = function (raiz) {
        var aux = raiz.izquierdo;
        raiz.izquierdo = aux.derecho;
        aux.derecho = raiz;
        raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1;
        aux.altura = this.alturaMax(aux.izquierdo, raiz) + 1;
        return aux;
    };
    ArbolAvl.prototype.dobleIzq = function (raiz) {
        raiz.derecho = this.simpleDer(raiz.derecho);
        return this.simpleIzq(raiz);
    };
    ArbolAvl.prototype.dobleDer = function (raiz) {
        raiz.izquierdo = this.simpleIzq(raiz.izquierdo);
        return this.simpleDer(raiz);
    };
    ArbolAvl.prototype.print = function () {
        console.log('\nARBOL AVL');
        if (this.raiz != null) {
            this.printNodo(this.raiz);
        }
    };
    ArbolAvl.prototype.printNodo = function (raiz) {
        console.log('Raiz: ' + raiz.valor);
        if (raiz.izquierdo != null) {
            console.log('Izquierdo: ' + raiz.izquierdo.valor);
        }
        if (raiz.derecho != null) {
            console.log('Derecho: ' + raiz.derecho.valor);
        }
        console.log('\n');
        if (raiz.izquierdo != null) {
            this.printNodo(raiz.izquierdo);
        }
        if (raiz.derecho != null) {
            this.printNodo(raiz.derecho);
        }
    };
    return ArbolAvl;
}());
