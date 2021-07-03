"use strict";
var NodoBinario = (function () {
    function NodoBinario(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
        this.altura = 0;
    }
    return NodoBinario;
}());
var ArbolBinario = (function () {
    function ArbolBinario() {
        this.raiz = null;
    }
    ArbolBinario.prototype.altura = function (raiz) {
        if (raiz == null) {
            return 0;
        }
        return raiz.altura;
    };
    ArbolBinario.prototype.alturaMax = function (izq, der) {
        if (this.altura(izq) > this.altura(der)) {
            return this.altura(izq);
        }
        return this.altura(der);
    };
    ArbolBinario.prototype.obtener = function (valor) {
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
    ArbolBinario.prototype.toArray = function () {
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
    ArbolBinario.prototype.insertar = function (valor) {
        this.raiz = this.insertarNodo(valor, this.raiz);
    };
    ArbolBinario.prototype.insertarNodo = function (valor, raiz) {
        if (raiz == null) {
            raiz = new NodoBinario(valor);
        }
        else {
            if (valor < raiz.valor) {
                raiz.izquierdo = this.insertarNodo(valor, raiz.izquierdo);
            }
            else if (valor >= raiz.valor) {
                raiz.derecho = this.insertarNodo(valor, raiz.derecho);
            }
        }
        raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1;
        return raiz;
    };
    ArbolBinario.prototype.eliminar = function (valor) {
        if (this.raiz != null) {
            this.raiz = this.delete(valor, this.raiz);
        }
    };
    ArbolBinario.prototype.delete = function (valor, raiz) {
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
        if (raiz != null) {
            raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1;
        }
        return raiz;
    };
    ArbolBinario.prototype.izqMayor = function (raiz) {
        while (raiz.derecho != null) {
            raiz = raiz.derecho;
        }
        return raiz.valor;
    };
    ArbolBinario.prototype.actualizar = function (valor, nuevo) {
        if (this.raiz != null) {
            this.eliminar(valor);
            this.insertar(nuevo);
        }
    };
    ArbolBinario.prototype.print = function () {
        console.log('\nARBOL BINARIO');
        if (this.raiz != null) {
            this.printNodo(this.raiz);
        }
        console.log('------------------------');
    };
    ArbolBinario.prototype.printNodo = function (raiz) {
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
    return ArbolBinario;
}());
